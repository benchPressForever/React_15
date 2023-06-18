import { Link } from "react-router-dom";

export function Header(){
    return(
        <header>
            <div>
                <Link to = "/">
                <h1>Пятнашки</h1>
                </Link>
                <p>Лучшая головоломка во всей вселенной </p>
            </div>

            <div className="link">
                <div>
                    <Link to = "/history">
                        <img src = "img/history.png" width={34}/>
                    </Link>
                </div>
                <div>
                    <Link to = "/singup">
                        <img src = "img/user.png" width={30}/>
                    </Link>
                </div>
            </div>
        </header>
    );
}