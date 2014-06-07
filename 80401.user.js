// ==UserScript==
// @name           Country_And_Form
// @namespace      Country_And_Form
// @description    Заполняет всё что можно в форме рестока, выбирает страну)
// @author         http://lockerztalk.ru/member4128.html , добавьте репы, если понравилось!
// @copyright      s12307, 2010
// @version        1.1
// @include        http://overheat.cn/ptzplace/redeem
// @include        http://ptzplace.lockerz.com/*
// @include        http://ptzplace.lockerzclub.info/*
// ==/UserScript==


my_country="Belarus";    //Ваша страна
my_country_code="BY";   //Код Вашей страны
my_name_1="Liudmila";       //Ваше имя
my_name_2="Rakutska";     //Ваше имя
my_adress_1="Volgogradskaya, 43-b/62";  //Ваш адрес №1
my_adress_2="";  //Ваш адрес №2
my_city="Gomel";       //Ваш город
my_index="246023";      //Ваш индекс
my_phone="375444856211"; //Ваш телефон


try{
name_1=document.getElementById("lbFirstName").htmlFor;
name_2=document.getElementById("lbLastName").htmlFor;
adress_1=document.getElementById("lbAddress1").htmlFor;
adress_2=document.getElementById("lbAddress2").htmlFor;
city=document.getElementById("lbCity").htmlFor;
state=document.getElementById("lbState").htmlFor;
zip=document.getElementById("lbZip").htmlFor;
phone=document.getElementById("lbPhone").htmlFor;
country=document.getElementById("lbCountry").htmlFor;

document.getElementById(country).value=my_country_code;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML=my_country;
document.getElementById("lbState").innerHTML = "STATE / PROVINCE<span class='mandatory'>*</span>";
document.getElementById("lbZip").innerHTML = "POSTAL CODE<span class='mandatory'>*</span>";
document.getElementById("phoneField").style.backgroundPosition = "0 -50px";
document.getElementById("stateFree").style.display = "block";
document.getElementById(state).style.visibility = "visible";
document.getElementById("statesClicker").style.display = "none";
document.getElementById("noticeLbl").style.display = "block";

document.getElementById(name_1).value=my_name_1;
document.getElementById(name_2).value=my_name_2;
document.getElementById(adress_1).value=my_adress_1;
document.getElementById(adress_2).value=my_adress_2;
document.getElementById(city).value=my_city;
document.getElementById(state).value=my_country_code;
document.getElementById(zip).value=my_index;
document.getElementById(phone).value=my_phone;
document.getElementById("_phoneWhole").value=my_phone;

}catch(err){

document.getElementById("country").value=my_country_code;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML=my_country;
document.getElementById("lbState").innerHTML = "STATE / PROVINCE<span class='mandatory'>*</span>";
document.getElementById("lbZip").innerHTML = "POSTAL CODE<span class='mandatory'>*</span>";
document.getElementById("phoneField").style.backgroundPosition = "0 -50px";
document.getElementById("stateFree").style.display = "block";
document.getElementById("state").style.visibility = "visible";
document.getElementById("statesClicker").style.display = "none";
document.getElementById("noticeLbl").style.display = "block";

document.getElementById("firstName").value=my_name_1;
document.getElementById("lastName").value=my_name_2;
document.getElementById("address1").value=my_adress_1;
document.getElementById("address2").value=my_adress_2;
document.getElementById("city").value=my_city;
document.getElementById("state").value=my_country_code;
document.getElementById("zip").value=my_index;
document.getElementById("phoneWhole").value=my_phone;
}

try{
document.getElementById("_countryDetails").value=my_country;
document.getElementById("_phoneOne").style.display = "none";
document.getElementById("_phoneTwo").style.display = "none";
document.getElementById("_phoneThree").style.display = "none";
document.getElementById("_phoneWhole").style.display = "block";
}catch(err){
document.getElementById("countryDetails").value=my_country;
document.getElementById("phoneOne").style.display = "none";
document.getElementById("phoneTwo").style.display = "none";
document.getElementById("phoneThree").style.display = "none";
document.getElementById("phoneWhole").style.display = "block";
}