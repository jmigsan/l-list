const asyncHandler = require("express-async-handler");
const pool = require("../../db");
const { v4: uuidv4 } = require("uuid");

const AWS = require("aws-sdk");

const { uploadFile, getFileStream, deleteFile } = require('./b2')

const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

// @desc get Llist
// @route GET /api/llist
// @access Public
const getLlist = asyncHandler(async (req, res) => {
  try {
    const entireLlist = await pool.query("SELECT * FROM llist");
    res.status(200).json(entireLlist.rows);
  } 
  
  catch (err) {
    throw new Error(err);
  }

});

// @desc create Llist
// @route POST /api/llist
// @access Private
const createL = asyncHandler(async (req, res) => {
  if (!req.body.l_text) {
    res.status(400);
    throw new Error("you have to spit some bars before posting");
  }

  try {
    let l_text = req.body.l_text;
    let l_content = req.body.l_content;
    let l_id = uuidv4();

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    let l_date = nowUTC.toISOString();

    const new_l = await pool.query(
      "INSERT INTO llist (l_id, l_text, l_content, l_date, l_uid) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [l_id, l_text, l_content, l_date, req.user]
    );

    res.status(200).json({
      l_id: new_l.rows[0].l_id,
      l_text: new_l.rows[0].l_text,
      l_content: new_l.rows[0].l_content,
      l_date: new_l.rows[0].l_date,
      l_uid: new_l.rows[0].l_uid,
    }
    );
  }
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

// @desc update Llist
// @route PUT /api/llist/:id
// @access Private
const updateL = asyncHandler(async (req, res) => {

  let now = new Date();
  let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
  let l_date = nowUTC.toISOString();
  
  try {
    if (!req.params.id) {
      res.status(400);
      throw new Error("what id am i editing?");
    }

    if (!req.body.l_text && !req.body.l_content) {
      res.status(400);
      throw new Error("i got nothing to work with");
    }

    const LUserID = await pool.query(
      "SELECT l_uid FROM llist WHERE l_id = $1", [req.params.id]
    );
    
    if (req.user != LUserID.rows[0].l_uid) {
      res.status(400);
      throw new Error("you can't edit someone else's L");
    }

    if (req.body.l_text && req.body.l_content) {
      const updated_l = await pool.query("UPDATE llist SET l_text = $1, l_content = $2, l_date = $3 WHERE l_id = $4 RETURNING *", [req.body.l_text, req.body.l_content, l_date, req.params.id]);
      res.status(200).json({
        l_id: updated_l.rows[0].l_id,
        l_text: updated_l.rows[0].l_text,
        l_content: updated_l.rows[0].l_content,
        l_date: updated_l.rows[0].l_date,
        l_uid: updated_l.rows[0].l_uid,
      });
    }

    if (req.body.l_text && !req.body.l_content) {
      const updated_l = await pool.query("UPDATE llist SET l_text = $1, l_content = '', l_date = $2 WHERE l_id = $3 RETURNING *", [req.body.l_text, l_date, req.params.id]);
      res.status(200).json({
        l_id: updated_l.rows[0].l_id,
        l_text: updated_l.rows[0].l_text,
        l_content: updated_l.rows[0].l_content,
        l_date: updated_l.rows[0].l_date,
        l_uid: updated_l.rows[0].l_uid,
      });
    }

    if (!req.body.l_text && req.body.l_content) {
      const updated_l = await pool.query("UPDATE llist SET l_content = $1, l_date = $2 WHERE l_id = $3 RETURNING *", [req.body.l_content, l_date, req.params.id]);
      res.status(200).json({
        l_id: updated_l.rows[0].l_id,
        l_text: updated_l.rows[0].l_text,
        l_content: updated_l.rows[0].l_content,
        l_date: updated_l.rows[0].l_date,
        l_uid: updated_l.rows[0].l_uid,
      });
    }
  }
  
  catch (err) {
    res.status(400);
    throw new Error(err);
  }

});

// @desc delete Llist
// @route DELETE /api/llist/:id
// @access Private
const deleteL = asyncHandler(async (req, res) => {
  try {

    const LUserID = await pool.query(
      "SELECT l_uid, l_content FROM llist WHERE l_id = $1", [req.params.id]
    );

    if (req.user != LUserID.rows[0].l_uid) {
      res.status(400);
      throw new Error("you can't delete someone else's L");
    }

    const l_id = req.params.id;
    const deleted_l = await pool.query(
      "DELETE FROM llist WHERE l_id = $1",
      [l_id]
    );

    const result = await deleteFile(LUserID.rows[0].l_uid);

    res.status(200).json({ id: l_id });
  }

  catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

// @desc upload content of L to B2
// @route POST /api/llist/upload
// @access Private
const uploadContentL = asyncHandler(async (req, res) => {
  try {
    const file = req.file;
    const result = await uploadFile(file)

    await unlinkFile(file.path);

    res.status(200).send(result.Key);
  }

  catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

const getContentLKey = (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  }

  catch (err) {
    res.status(400);
    throw new Error(err);
  }
}

module.exports = {
  getLlist,
  createL,
  updateL,
  deleteL,
  uploadContentL,
  getContentLKey,
};