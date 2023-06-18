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
            <tr>
                <td>1</td>
                <td>{arr[0].name}</td>
                <td>{arr[0].time}</td>
                <td>{arr[0].steps}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>{arr[1].name}</td>
                <td>{arr[1].time}</td>
                <td>{arr[1].steps}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>{arr[2].name}</td>
                <td>{arr[2].time}</td>
                <td>{arr[2].steps}</td>
            </tr>
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
