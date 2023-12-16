import React from "react";
import axios from "axios";
import { useSelector ,useDispatch} from "react-redux";
import { ChangeIndexNullAction, FieldMoveAction } from "../store/FieldReducer";
import { AddR3Action, AddR4Action, AddR5Action, AddR6Action } from "../store/RatingR";
import { ChangeStartGameAction, ChangeStartTimeAction, ChangeTimeAction, PlusStepAction, RemoveAction } from "../store/CountReducer";
import { LastGamesAction } from "../store/SingUpR";

export function Field({size}){
    const dispatch = useDispatch();

    const {FieldArr,IndexNull} = useSelector(state => state.FieldR)
    const {Name,email,password} = useSelector(state => state.SingUpR)
    const {R3,R4,R5,R6} = useSelector(state => state.RatingR)
    const {Steps,Time,StartTime,StartGame} = useSelector(state => state.CountR)

    const win = Array(size*size).fill().map((e,i) => i != size*size-1 ? i+1 : "");

    React.useEffect( () => {
        if(StartTime){
        const interval = setInterval(function(){
                dispatch(ChangeTimeAction(`${String(Math.floor((new Date() - StartTime)/1000/60/60)).padStart(2,"0")}:${String(Math.floor((new Date() - StartTime)/1000/60)).padStart(2,"0")}:${String(Math.floor((new Date() - StartTime)/1000-(Math.floor((new Date() - StartTime)/1000/60)*60))).padStart(2,"0")}`))
        },1000);
        return () => {
            clearInterval(interval);
        }
        }
    },[StartTime]);

    function swap(Arr, a, b) {
        Arr[b] = Arr[a];
        Arr[a] = "";
        dispatch(FieldMoveAction(Arr));
    }


    async function AddRating(){
            R3?.length+R4?.length+R5?.length+R6?.length > 0 && await axios.delete("https://6488dbfb0e2469c038fe741d.mockapi.io/Rating/1");

            let Rating;
            if(size == 3 ) Rating = R3;
            else if(size == 4 ) Rating = R4;
            else if(size == 5 ) Rating = R5;
            else if(size == 6 ) Rating = R6;
            Rating.push({name:Name,field:size,time:Time,steps:Steps});
            console.log(Rating)
            for(let i = 0;i < Rating.length;i++){
                for(let j = 0;j < Rating.length;j++){
                        let a = Rating[i];
                        if(Rating[i].steps < Rating[j].steps){
                                Rating[i] = Rating[j];
                                Rating[j] = a;
                        }       
                }
            }
            if(size == 3) {dispatch(AddR3Action(Rating))}
            else if(size == 4) {dispatch(AddR4Action(Rating))}
            else if(size == 5) {dispatch(AddR5Action(Rating))}
            else if(size == 6) {dispatch(AddR6Action(Rating))}   
            dispatch(LastGamesAction({field:size,time:Time,steps:Steps}))

            axios.post("https://6488dbfb0e2469c038fe741d.mockapi.io/Rating",{r3:R3,r4:R4,r5:R5,r6:R6});
    }



    async function  winner(){
        if(FieldArr.toString() == win.toString()){
            AddRating();
            dispatch(RemoveAction())
            dispatch(ChangeStartGameAction(false));
            alert("Win!!!");
        }
    }

    async function Step(i){
        if(Math.abs(i-IndexNull) == size && StartGame || (i-IndexNull) == -1 && IndexNull % size !== 0 && StartGame || (i-IndexNull) == 1 && i % size !== 0 && StartGame ){
            swap(FieldArr,i,IndexNull)
            dispatch(ChangeIndexNullAction(i))
            dispatch(PlusStepAction())
            winner();
        }
    }

    function mix(){

        dispatch(RemoveAction());
        dispatch(ChangeStartGameAction(true));

        let array = FieldArr;
        let index = IndexNull;
        for(let i = 0;i < 150;i++){
            let r = Math.floor(Math.random() * (5 - 1)) + 1;
            if(r == 1 && index-size >= 0){
                array[index] = array[index-size];
                array[index-size] = '';
                index = index-size;
            }
            else if(r == 2 && index+size <= size*size-1){
                array[index] = array[index+size];
                array[index+size] = '';
                index = index+size;
            }
            else if(r == 3 && (index+1) % size !== 0){
                array[index] = array[index+1];
                array[index+1] = '';
                index = index+1;     
            }
            else if(r == 4 && index != 0 && index %size !== 0){
                array[index] = array[index-1];
                array[index-1] = '';
                index = index-1;      
            }
        }

        dispatch(FieldMoveAction(array));
        dispatch(ChangeIndexNullAction(index))
        dispatch(ChangeStartTimeAction(new Date()));
    }

  



    return(
        <>
        <button onClick={mix}>Перемешать и начать</button>
        <div>Время: {Time}</div>
        <div>Кол-во ходов: {Steps}</div>
        <table id = "field">
            <tbody>
                {FieldArr.map((e,i) =>
                        (i % size == 0 || i == 0) &&
                            <tr>
                            {[...Array(size)].fill().map((elem,index) => 
                                    <td onClick = {() => Step(i+index)}>{FieldArr[i+index]}</td>     
                            )}
                            </tr>
                )}
            </tbody>
        </table>
        </>
    );
}