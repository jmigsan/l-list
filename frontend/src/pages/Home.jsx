import CreateL from "../components/Home/CreateL"
import LList from "../components/Home/LList"
import LListSortToggle from "../components/Home/LListSortToggle"

const Home = () => {
  return (
    <div className='center'>
      <CreateL />
      <LListSortToggle />
      <LList />
    </div>
  )
}
export default Home