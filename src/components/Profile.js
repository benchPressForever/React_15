import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AddAdvanceAction } from "../store/SingUpR";
import React from "react";

export function Profile(){
    const dispatch = useDispatch()
    const {Name,email,password,Advance,LastGames} = useSelector(state => state.SingUpR)

    return(
       <>
        <div className="avatarContainer">
            <div className="avatar">
                <img src = "img/avatar.png" width={300}/>   

            </div> 
            <div className="info">
                <h1 className="op-6">{Name}</h1> <hr/>
                <h2>Личные данные</h2>  
                 <p>Адрес электронной почты: <b className="op-6"> {email}</b></p>
                 <p>Пароль:<b className="op-6">{password}</b></p>
            </div>  
        </div>
        <div className="element center">
            <h3>Последние игры:</h3>
            {LastGames.length > 0 ?
                LastGames.map((obj)=> 
                    <p>
                        <b>Поле:<span className="op-6">{obj.field}x{obj.field}</span></b>  <b>Время:<span className="op-6">{obj.time}</span></b>  <b>Кол-во ходов: <span className="op-6">{obj.steps}</span></b>
                    </p>
                )
                :
                <div className="center">
                <p>{"Последних игр нет : ("}</p>
                <Link to = "/">
                    <button className="greenButton" style={{width:"150px"}}>
                        Играть
                    </button>
                </Link>
                </div>
            }
        </div>
        </>
    );
}