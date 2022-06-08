import { Link } from 'react-router-dom';
import FirebaseAuth from './FirebaseAuth/FirebaseAuth';

const Header = () => {
  return (
    <div>
      <nav className='header'>
        <span className='logoText'><Link to={"/"}>L-List</Link></span>
        <span className='float-right'><FirebaseAuth /></span>   
      </nav>
    </div>
  )
}
export default Header