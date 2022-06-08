import CreateL from "../components/Home/CreateL"
import LList from "../components/Home/LList"
import LListSortToggle from "../components/Home/LListSortToggle"

const Home = () => {
  return (
    <div className='center'>
      <p>The place to find or post an <a href='https://www.urbandictionary.com/define.php?term=L' className="l-definition">L</a>.</p>
      <CreateL />
      <LListSortToggle />
      <LList />
    </div>
  )
}
export default Home