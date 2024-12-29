import { useDispatch, useSelector } from "react-redux";
import { BagActions } from "../store/BagSlice";
import { IoBagAddSharp } from "react-icons/io5";
import { IoBagRemoveSharp } from "react-icons/io5";

const Homeitem = ({ item }) => {
  const dispatch = useDispatch();
  const BagItems = useSelector((store) => store.Bag);
  const elementFound = BagItems.indexOf(item.id) >= 0;

  const handleAddToBag = () => {
    dispatch(BagActions.addToBag(item.id));
  };
  const handleRemoveFromBag = () => {
    dispatch(BagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container">
      <img className="item-image" src={item.image} alt="item image" />
      <div className="rating">
        {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.item_name}</div>
      <div className="price">
        <span className="current-price">Rs {item.current_price}</span>
        <span className="original-price">Rs {item.original_price}</span>
        <span className="discount">({item.discount_percentage}% OFF)</span>
      </div>

      {elementFound ? (
        <button type="button" className="btn btn-danger btn-add-bag"
        onClick={handleRemoveFromBag}
        >
          <IoBagRemoveSharp /> | Remove from Bag
        </button>
      ) : (
        <button className="btn-add-bag" onClick={handleAddToBag}>
          <IoBagAddSharp /> | Add to Bag
        </button>
      )}
    </div>
  );
};
export default Homeitem;
