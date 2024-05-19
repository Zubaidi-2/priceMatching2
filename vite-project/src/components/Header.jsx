import DetroitAxle from "../assets/DetroitAxle-removebg-preview.png";
import "./Header.css";
export default function Header() {
  return (
    <div className="header-container">
      <a target="_blank" href="https://www.detroitaxle.com/">
        <img
          alt="Detroit Axle  Logo "
          className="detroitLogo"
          src={DetroitAxle}
        ></img>
      </a>
      <h1 className="detroitTitle">Price Matching</h1>
    </div>
  );
}
