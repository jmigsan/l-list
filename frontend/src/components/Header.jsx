import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth/FirebaseAuth';

const Header = () => {
  return (
    <div>
      <nav className='header'>
        <span className='float-right'><FirebaseAuth /></span>
        <h1> <Link to={"/"}>L-List</Link> </h1>
      </nav>
    </div>
  )
}
export default Header