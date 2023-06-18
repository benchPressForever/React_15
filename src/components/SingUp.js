import React from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { AddDataAction, ChangeLoginSuccessful } from "../store/SingUpR";

export function SingUp(){
    const dispatch = useDispatch();
    const {Users} = useSelector(state => state.SingUpR)

    const [email,setEmail] = React.useState("")
    const [password,setPassword] = React.useState("")
    const [Name,setName] = React.useState('')

    const [LoginEmail,setLoginEmail] = React.useState("")
    const [LoginPassword,setLoginPassword] = React.useState("")

    const [emailDirty,setEmailDirty] = React.useState(false)
    const [passwordDirty,setPasswordDirty] = React.useState(false)
    const [nameDirty,setNameDirty] = React.useState(false)

    const [LoginEmailDirty,setLoginEmailDirty] = React.useState(false)
    const [LoginPasswordDirty,setLoginPasswordDirty] = React.useState(false)

    const [emailError,setEmailError] = React.useState('Емейл не может быть пустым')
    const [passwordError,setPasswordError] = React.useState('Пароль не может быть пустым')
    const [nameError,setNameError]  = React.useState('Имя не может быть пустым')

    const [LoginEmailError,setLoginEmailError] = React.useState('Емейл не может быть пустым')
    const [LoginPasswordError,setLoginPasswordError] = React.useState('Пароль не может быть пустым')

    const [FormValid,setFormValid] = React.useState(false);
    const [LoginFormValid,setLoginFormValid] = React.useState(true);
    

    React.useEffect(()=>{
        if(emailError || passwordError || nameError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }

        if(LoginEmailError || LoginPasswordError){
            setLoginFormValid(false);
        }
        else{
            setLoginFormValid(true);
        }
    },[emailError,passwordError,LoginEmailError,LoginPasswordError,nameError]);

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post("https://6488dbfb0e2469c038fe741d.mockapi.io/People",{
            email:e.target.email.value,
            name:e.target.name.value,
            password:e.target.pswd.value
        });
        dispatch(AddDataAction({
            email:e.target.email.value,
            name:e.target.name.value,
            password:e.target.pswd.value
        }))
        dispatch(ChangeLoginSuccessful());
        e.target.email.value = "";
        e.target.name.value = "";
        e.target.pswd.value = "";
        alert("Регистрация прошла успешно!")
    }

    const entranceHandler = (e) => {
        e.preventDefault();
        let flag = 0;
        for(let i = 0;i < Users.length;i++){
            if(Users[i].email == e.target.email.value && Users[i].password == e.target.pswd.value){
                dispatch(ChangeLoginSuccessful());
                dispatch(AddDataAction({
                    email:e.target.email.value,
                    name:Users[i].name,
                    password:e.target.pswd.value
                }))
                alert("Вход прошёл успешно!");
                flag = 1;
            }
        }
        if(!flag) {alert("Введены неправильные данные")}
    }


    const emailHandler = (e,i) => {
        {i == 1 && setEmail(e.target.value);}
        {i == 2 && setLoginEmail(e.target.value)}
        let res = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        if(!res.test(String(e.target.value).toLowerCase())){
            {i == 1 && setEmailError("Некорректный емейл")}
            {i == 2 && setLoginEmailError("Некорректный емейл")}
        }
        else{
            {i == 1 && setEmailError('');}
            {i == 2 && setLoginEmailError('');}
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        let flag = 0;
        for(let i = 0;i < Users.length;i++){
            if(Users[i].name == e.target.value){
                setNameError('Это имя уже занято')
                flag = 1;
            }
        }
        if(!flag){
            setNameError('');
        }
    }

    const passwordHandler = (e,i) => {
        {i == 1 && setPassword(e.target.value);}
        {i == 2 && setLoginPassword(e.target.value);}
        if(e.target.value.length < 3 || e.target.value.length > 8){
            {i == 1 && setPasswordError("Пароль должен быть больше 3 символов и меньше 8")}
            {i == 2 && setLoginPasswordError("Пароль должен быть больше 3 символов и меньше 8")}
            if(!e.target.value){
                {i == 1 && setPasswordError('Пароль не может быть пустым')}
                {i == 2 && setLoginPasswordError('Пароль не может быть пустым')}
            }
        }
        else{
            {i == 1 && setPasswordError('');}
            {i == 2 && setLoginPasswordError('');}
        }
    }

    const blureHandler = (e,i) => {
        switch(e.target.name){
            case "email":
                {i == 1 && setEmailDirty(true);}
                {i == 2 && setLoginEmailDirty(true);}
                break;
            case "pswd":
                {i == 1 && setPasswordDirty(true);}
                {i == 2 && setLoginPasswordDirty(true);}
            case "name":
                setNameDirty(true);
                break;
            default:
                break;
        }
    }



    return(
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="signup">
				<form onSubmit={submitHandler}>
					<label for="chk" aria-hidden="true">Регистрация</label>
                    {(nameError&&nameDirty )&& <div style={{color:'red'}}>{nameError}</div>}
					<input onChange={e => nameHandler(e,1)} value={Name} onBlur={e => blureHandler(e,0)} type="text" name="name" placeholder="Твоё имя" required=""/>
                    {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
					<input onChange={e => emailHandler(e,1)} value = {email} onBlur={e => blureHandler(e,1)} type="email" name="email" placeholder="Email" required=""/>
                    {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
					<input onChange={e => passwordHandler(e,1)} value = {password} onBlur={e => blureHandler(e,1)} type="password" name="pswd" placeholder="Пароль" required=""/>
					<button type = "submit" disabled = {!FormValid} >Регистрация</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={entranceHandler}>
					<label for="chk" aria-hidden="true">Вход</label>
                    {(LoginEmailDirty && LoginEmailError) && <div style={{color:'red'}}>{LoginEmailError}</div>}
					<input onChange={e => emailHandler(e,2)} value = {LoginEmail} onBlur={e => blureHandler(e,2)} type="email" name="email" placeholder="Email" required=""/>
                    {(LoginPasswordDirty && LoginPasswordError) && <div style={{color:'red'}}>{LoginPasswordError}</div>}
					<input onChange={e => passwordHandler(e,2)} value = {LoginPassword} onBlur={e => blureHandler(e,2)} type="password" name="pswd" placeholder="Пароль" required=""/>
					<button type = "submit" disabled = {!LoginFormValid} >Вход</button>
				</form>
			</div>
	    </div>
    );
}