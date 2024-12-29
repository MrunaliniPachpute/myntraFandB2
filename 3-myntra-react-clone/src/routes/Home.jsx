import { useSelector } from "react-redux";
import Homeitem from "../components/Homeitem"

const Home = () => {
  const items = useSelector(store =>store.items);

  return (
    <>
      <main>
        <div className="items-container">
          {items.map((item) => (<Homeitem  key={item.id} item={item} />) )}
        </div>
      </main>
    </>
  );
};
export default Home;
