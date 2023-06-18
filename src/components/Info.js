import { Link } from "react-router-dom";

function Info({Title,Paragraph,W,H,TextBut}){
    return(
    <div className="overlay">
    <div className="block">
    <div className="cartEmpty">
        <img  width= {`${W}px`} height= {`${H}px`} src="/img/image.png" alt="Empty" />
        <h2>{Paragraph}</h2>
        <p className="op-6">{Title}</p>
        <Link to = "/singup">
        <button  className="greenButton">
          <img src="/img/arrow.png" alt="Arrow" />
          {TextBut}
        </button>
        </Link>
    </div> 
    </div>
    </div>
    );
}

export default Info;