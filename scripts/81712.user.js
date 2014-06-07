// ==UserScript==
// @name           Country_And_Form
// @namespace      Country_And_Form
// @description    Заполняет всё что можно в форме рестока, выбирает страну)
// @author         http://lockerztalk.ru/member4128.html , добавьте репы, если понравилось!
// @copyright      s12307, 2010
// @version        2.1
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
// @include        http://lockerztalk.lv/ptzplace/*
// @include        http://www.redeemquick.com/*
// @include        http://www.lockerztest.com/*
// @include        http://sev7en.us/ptzplace/*
// @include        http://ptzplace.lockierz.com/*
// @include        http://www.lockerz-forum.eu/symulator/*
// @include        http://lockerz.miguelmeza.net/SimuladorLockerz/*
// ==/UserScript==


my_country="Unated States of America(USA)";	//Ваша страна
my_country_code="PA";	//Код Вашей страны
my_name_1="Ruslan";		//Ваше имя
my_name_2="Mazepa";		//Ваше имя
my_adress_1="8 Parck Ave";	//Ваш адрес №1
my_adress_2="";			//Ваш адрес №2
my_city="Bala Cynwyd";		//Ваш город
my_index="19004";		//Ваш индекс
my_phone="2156650591"; //Ваш телефон

function getElementByRegexId(re, TagName){

if(!TagName){TagName="input";}

var re = re.toLowerCase();
var inputs = document.getElementsByTagName(TagName);
var regex = new RegExp(re);

for(i = 0; i < inputs.length; i++){
var result = regex.test(inputs[i].id.toLowerCase());
if(result && typeof inputs[i].id != "undefined"){return inputs[i].id;}
}

}

document.getElementById(getElementByRegexId("(country[-_]?Details|Details[-_]country?|cd)", "*")).value=my_country;
document.getElementById(getElementByRegexId("(country[-_]?Clicker|Clicker[-_]country?|cc)", "*")).getElementsByTagName("SPAN")[0].innerHTML=my_country;

document.getElementById("lbState").innerHTML = "STATE / PROVINCE<span class='mandatory'>*</span>";
document.getElementById("lbZip").innerHTML = "POSTAL CODE<span class='mandatory'>*</span>";

document.getElementById(getElementByRegexId("(phone[-_]?One|One[-_]phone?|po)", "*")).style.display = "none";
document.getElementById(getElementByRegexId("(phone[-_]?Two|Two[-_]phone?|ptw)", "*")).style.display = "none";
document.getElementById(getElementByRegexId("(phone[-_]?Three|Three[-_]phone?|pth)", "*")).style.display = "none";
document.getElementById(getElementByRegexId("(phone[-_]?Whole|Whole[-_]phone?|pw)", "*")).style.display = "block";

document.getElementById(getElementByRegexId("(phone[-_]?Field|Field[-_]phone?|pf)", "*")).style.backgroundPosition = "0 -50px";

document.getElementById(getElementByRegexId("(state[-_]?Free|Free[-_]state?|sf)", "*")).style.display = "block";
document.getElementById(getElementByRegexId("(states[-_]?Clicker|Clicker[-_]states?|sc)", "*")).style.display = "none";
document.getElementById(getElementByRegexId("(notice[-_]?Lbl|Lbl[-_]notice?|nl)", "*")).style.display = "block";

try{country=document.getElementById("lbCountry").htmlFor;}catch(err){country=document.getElementById("country");}
document.getElementById(country).value=my_country_code;


var element = document.getElementsByTagName("input");

name_1_1=getElementByRegexId("(First[-_]?Name|Name[-_]first?|fn)");
name_1_2=document.getElementById("lbFirstName");
name_1_3=element[0].getAttribute("id");
name_1=name_1_1;
if(typeof name_1_1 == "undefined" && name_1_2 != null){name_1=name_1_2.htmlFor;}
if(typeof name_1_1 == "undefined" && name_1_2 == null){name_1=name_1_3;}
document.getElementById(name_1).value=my_name_1;


name_2_1=getElementByRegexId("(last[-_]?Name|Name[-_]?last|ln)");
name_2_2=document.getElementById("lbLastName");
name_2_3=element[1].getAttribute("id");
name_2=name_2_1;
if(typeof name_2_1 == "undefined" && name_2_2 != null){name_2=name_2_2.htmlFor;}
if(typeof name_2_1 == "undefined" && name_2_2 == null){name_2=name_2_3;}
document.getElementById(name_2).value=my_name_2;


adress_1_1=getElementByRegexId("(address1|a1)");
adress_1_2=document.getElementById("lbAddress1");
adress_1_3=element[2].getAttribute("id");
adress_1=adress_1_1;
if(typeof adress_1_1 == "undefined" && adress_1_2 != null){adress_1=adress_1_2.htmlFor;}
if(typeof adress_1_1 == "undefined" && adress_1_2 == null){adress_1=adress_1_3;}
document.getElementById(adress_1).value=my_adress_1;


adress_2_1=getElementByRegexId("(address2|a2)");
adress_2_2=document.getElementById("lbAddress2");
adress_2_3=element[3].getAttribute("id");
adress_2=adress_2_1;
if(typeof adress_2_1 == "undefined" && adress_2_2 != null){adress_2=adress_2_2.htmlFor;}
if(typeof adress_2_1 == "undefined" && adress_2_2 == null){adress_2=adress_2_3;}
document.getElementById(adress_2).value=my_adress_2;


city_1=getElementByRegexId("(city|cy)");
city_2=document.getElementById("lbCity");
city_3=element[4].getAttribute("id");
city=city_1;
if(typeof city_1 == "undefined" && city_2 != null){city=city_2.htmlFor;}
if(typeof city_1 == "undefined" && city_2 == null){city=city_3;}
document.getElementById(city).value=my_city;


country_code_2=document.getElementById("lbState");
country_code_3=element[5].getAttribute("id");
country_code=country_code_2.htmlFor;
if(country_code_2 == null){country_code=country_code_3;}
document.getElementById(country_code).value=my_country_code;
document.getElementById(country_code).value=my_country_code;
document.getElementById(country_code).style.visibility = "visible";


index_1=getElementByRegexId("(zip|postal[-_]?code|z)");
index_2=document.getElementById("lbZip");
index_3=element[6].getAttribute("id");
index=index_1;
if(typeof index_1 == "undefined" && index_2 != null){index=index_2.htmlFor;}
if(typeof index_1 == "undefined" && index_2 == null){index=index_3;}
document.getElementById(index).value=my_index;


phone_1=getElementByRegexId("(phone[-_]?Whole|Whole[-_]?phone|phone[-_]?number)");
phone_2=document.getElementById("lbPhone");
phone_3=element[10].getAttribute("id");
phone=phone_1;
if(typeof phone_1 == "undefined" && phone_2 != null){phone=phone_2.htmlFor;}
if(typeof phone_1 == "undefined" && phone_2 == null){phone=phone_3;}
document.getElementById(phone).value=my_phone;

document.getElementById("recaptcha_response_field").focus();