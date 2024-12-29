import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Header = () => {

  const Bag = useSelector(store=> store.Bag);

  return (
    <header>
      <div className="logo_container"> 
        <Link to="/">
          <img
            className="myntra_home"
            src="images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>
      <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>

        <Link to="/">Home & Living</Link>

        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
      </nav>
      <div className="search_bar">
        <IoSearch />
        <input
          className="search_input"
          placeholder="Search for products, brands and more"
        />
      </div>
      <div className="action_bar">
        <div className="action_container">
          <CgProfile />
          <span className="action_name">Profile</span>
        </div>

        <div className="action_container">
          <FaHeart />
          <span className="action_name">Wishlist</span>
        </div>

        <Link to="/bag" className="action_container">
          <FaShoppingBag />
          
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{Bag.length}</span>
        </Link>
      </div>
    </header>
  );
}; 
export default Header;
