// ==UserScript==
// @name           Country
// @namespace      Country
// @description    Заполняет всё что можно в форме рестока, выбирает страну)
// @author         http://lockerztalk.ru/member4128.html , добавьте репы, если понравилось!
// @copyright      s12307, 2010
// @version        1.1
// @include        http://www.k0st4s.org/*
// @include        http://www.lockerz.com/redeem*
// @include        http://ptzplace.lockerz.com/*
// @include        http://lockerztalkform.0fees.net/redeem.php
// @include        http://premium.retkinia.net/*
// @include        http://overheat.cn/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://www.ptzplace.lockerzclub.info/*
// @include        http://lockerz.miguelmeza.net/*
// @include        http://nocaptcha.odnaklassniks.ru/*
// @include        http://ptzplace.odnaklassniks.ru/*
// ==/UserScript==


my_country_code="";	//Ваш штат
my_name_1="";		//Ваше имя
my_name_2="";	//Ваше имя
my_adress_1="";	//Ваш адрес №1
my_adress_2="";			//Ваш адрес №2
my_city="";		//Ваш город
my_index="";		//Ваш индекс
my_phone_1="171"; 		//Первые 3 цифры телефона
my_phone_2="800"; 		//Вторые 3 цифры телефона
my_phone_3="1284"; 		//Третьи 4 цифры телефона

try{
document.getElementById("_phoneOne").value=my_phone_1;
document.getElementById("_phoneTwo").value=my_phone_2;
document.getElementById("_phoneThree").value=my_phone_3;
}catch(err){
document.getElementById("phoneOne").value=my_phone_1;
document.getElementById("phoneTwo").value=my_phone_2;
document.getElementById("phoneThree").value=my_phone_3;
}

document.getElementById("recaptcha_response_field").focus();

try{
name_1=document.getElementById("lbFirstName").htmlFor;
name_2=document.getElementById("lbLastName").htmlFor;
adress_1=document.getElementById("lbAddress1").htmlFor;
adress_2=document.getElementById("lbAddress2").htmlFor;
city=document.getElementById("lbCity").htmlFor;
state=document.getElementById("lbState").htmlFor;
zip=document.getElementById("lbZip").htmlFor;
statesClicker=document.getElementById("statesClicker");

statesClicker.getElementsByTagName("SPAN")[0].innerHTML=my_country_code;

document.getElementById(name_1).value=my_name_1;
document.getElementById(name_2).value=my_name_2;
document.getElementById(adress_1).value=my_adress_1;
document.getElementById(adress_2).value=my_adress_2;
document.getElementById(city).value=my_city;
document.getElementById(zip).value=my_index;
document.getElementById(state).value=my_country_code;
document.getElementById("zip").value=my_index;

}catch(err){

document.getElementById("firstName").value=my_name_1;
document.getElementById("lastName").value=my_name_2;
document.getElementById("address1").value=my_adress_1;
document.getElementById("address2").value=my_adress_2;
document.getElementById("city").value=my_city;
document.getElementById("zip").value=my_index;
document.getElementById("state").value=my_country_code;
}