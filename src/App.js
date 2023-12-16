import { useDispatch, useSelector } from "react-redux";
import { Field } from "./components/Field";
import { ChangeIndexNullAction, FieldMoveAction, SizeFieldAction } from "./store/FieldReducer";
import {Routes, Route} from "react-router-dom";
import { Header } from "./components/Header";
import { SingUp } from "./components/SingUp";
import { ratingFetch } from "./asyncFunc/RaitingFetch";
import { useEffect, useState } from "react";
import { usersFetch } from "./asyncFunc/UsersFetch";
import { ChangeStartGameAction, RemoveAction } from "./store/CountReducer";
import Info from "./components/Info";
import { Profile } from "./components/Profile";
import { ChangeRatinOpengAction } from "./store/RatingR";
import ModalRating from "./components/ModalRating";
import History from "./components/History";
import axios from "axios";



function App() {
  const dispatch = useDispatch()
  const Size = useSelector(state => state.FieldR.Size)
  const {loginSuccessful} = useSelector(state => state.SingUpR)
  const {ratingOpen} = useSelector(state => state.RatingR)
  const {R3,R4,R5,R6} = useSelector(state => state.RatingR)
  const [arr,setArr] = useState([])
  const [SizeField,setSizeField] = useState(4)
  
  
  function Change(size){
    dispatch(SizeFieldAction(size));
    dispatch(FieldMoveAction(Array(size*size).fill().map((e,i) => i != size*size-1 ? i+1 : "")));
    dispatch(ChangeIndexNullAction(size*size-1));
    dispatch(RemoveAction())
    dispatch(ChangeStartGameAction(false));
  }

  function Rating(Arr,SF){
    dispatch(ChangeRatinOpengAction())
    setArr(Arr);
    setSizeField(SF)
  }

  useEffect(() => {
    dispatch(ratingFetch());
    dispatch(usersFetch());
  },[]);

  
  return (
    
      <div className = "wrapper">
        <Header/>
        <div className="container">
        <Routes>
            <Route path = "/" element = {
              loginSuccessful ?
              <>
              <Field size = {Size}/>
              <div className="df">Размер поля: {Size}x{Size}</div>
              <div className="Size_Field">
                  <p>Поля:</p>
                  <button onClick={() => Change(3)}>3x3</button>
                  <button onClick={() => Change(4)}>4x4</button>
                  <button onClick={() => Change(5)}>5x5</button>
                  <button onClick={() => Change(6)}>6x6</button>
              </div>
              </>
              :
              <Info 
                Title = {"Иначе данные не сохраняться :("}
                Paragraph = {"Необходимо пройти регистрацию"}
                W ={70}
                H = {70}
                TextBut={"Перейти к регестрации"}
              />
              }/>
            <Route path = "/singup" element = {
              !loginSuccessful ? <SingUp/> 
              :
              <Profile/>
            }/>

            <Route path = "/history"
                element = {<History/>}
            />
        </Routes>
        </div>
            
        {ratingOpen ?
          <ModalRating arr = {arr} Field = {`${SizeField}x${SizeField}`}/>
        :
        <div className="Rating">
            <h2>Рейтинг:</h2>
            <button className="greenButton" onClick={() => Rating(R3,3)}>3x3</button>
            <button className="greenButton" onClick={() => Rating(R4,4)}>4x4</button>
            <button className="greenButton" onClick={() => Rating(R5,5)}>5x5</button>
            <button className="greenButton" onClick={() => Rating(R6,6)}>6x6</button>
        </div>
        }
      </div>
  );
}

export default App;
