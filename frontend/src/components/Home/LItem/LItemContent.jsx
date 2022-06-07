const LItemContent = (LData) => {

  let LDataContentLocal = LData.LData.l_content;

  if (LDataContentLocal === "") {
    return (
      <></>
    )
  }

  if (LDataContentLocal.includes('.mp4')) {
    return (
      <video className='l-content' src={`api/llist/upload/${LDataContentLocal}`} controls />
    )
  } else if (LDataContentLocal.includes('.png')) {
    return (
      <img className='l-content' src={`api/llist/upload/${LDataContentLocal}`} />
    )
  } else if (LDataContentLocal.includes('.jpg')) {
    return (
      <img className='l-content' src={`api/llist/upload/${LDataContentLocal}`} />
    )
  } else if (LDataContentLocal.includes('.gif')) {
    return (
      <img className='l-content' src={`api/llist/upload/${LDataContentLocal}`} />
    )
  }
}
export default LItemContent