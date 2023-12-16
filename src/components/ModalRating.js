import { Link } from "react-router-dom";
import { ChangeRatinOpengAction } from "../store/RatingR";
import { useDispatch } from "react-redux";

function ModalRating({arr,Field}){
    const dispatch = useDispatch();
    return(
    <div className="overlay">
        <div className="modalRating">
        <h2>Рейтинг</h2>
        <h3>{Field}</h3>
        <table id = "R">
            <tr>
                <td></td>
                <td>Имя</td>
                <td>Время</td>
                <td>кол-во ходов</td>
            </tr>
            {arr.map((obj,i) => 
                <tr>
                    <td>{i+1}</td>
                    <td>{obj.name}</td>
                    <td>{obj.time}</td>
                    <td>{obj.steps}</td>
                </tr>
            )}
        </table>

        <Link to = "/">
        <button  className="greenButton" onClick={() => dispatch(ChangeRatinOpengAction())}>
             Играть
        </button>
        </Link>

        </div>

    </div>
    );
}

export default ModalRating;
