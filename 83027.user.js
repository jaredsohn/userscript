// ==UserScript==
// @name           Autofill Sveta
// @namespace      Autofill Sveta
// @description    Autofill Sveta
// @author         msbhkjasd
// @copyright      xxxxxx, 2010
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
// @include        http://lockerztalk.lv/ptzplace/*
// @include        http://www.redeemquick.com/*
// @include        http://www.lockerztest.com/*
// @include        http://sev7en.us/ptzplace/*
// @include        http://www.sev7en.us/ptzplace/*
// @include        http://ptzplace.lockierz.com/*
// @include        http://www.lockerz-forum.eu/symulator/*
// @include        http://lockerz.miguelmeza.net/SimuladorLockerz/*
// @include        http://brand-cars.ru/*
// ==/UserScript==


var choose="electronics";
var product=[
"New iPad - 16 GB WiFi",
"HP-mini Netbook with INTEL Atom Black",
"New iPod Touch 32 GB",
"New iPod Touch 8 GB",
"New iPod 16 GB Nano - Green",
"Flip Video Ultra HD"
];


my_country="Moldova";
my_country_code="MD";
my_name_1="Cara";
my_name_2="Iurii";
my_adress_1="Ucrainscai 7 ";
my_adress_2="";
my_city="Taraclia";
my_index="7401";
my_phone="37378276267";
login="iuran043@gmail.com";
password="499181";


function checkEnter(e){
var characterCode;
if(e && e.which){characterCode = e.which;}else{e = event;characterCode = e.keyCode;}
if(characterCode == 13){
try{document.forms[0].submit();}catch(err){}
return false;}
} 

try{document.addEventListener('keydown', function(e){checkEnter(e);}, false);}catch(err){}


try{if(document.forms[0].elements[0].value.toLowerCase()=="email" || document.forms[0].elements[0].value.toLowerCase()=="e-mail"){login_ptzplace(login, password);}}catch(err){}

function login_ptzplace(login, password){
try{document.forms[0].elements[0].value=login;}catch(err){}
try{document.forms[0].elements[1].type="password";}catch(err){}
try{document.forms[0].elements[1].value=password;}catch(err){}
}


try{var elements=document.getElementsByTagName("a");}catch(err){}
try{var inputs=document.getElementsByTagName("input");}catch(err){}
try{for (i=0; i<elements.length; i++){
try{if (elements[i].className=="btnRedeem" && elements[i].href!=(window.location + "#") && inputs.length<=0){
window.location.href=elements[i].href;}}catch(err){}
}}catch(err){}


try{choose_category1=0;}catch(err){}
try{var element = document.getElementsByTagName("*");}catch(err){}
try{for (var a = 0; a < element.length; a++) {
try{var status = element[a].getAttribute("class");}catch(err){}
try{if(status == "boutiqueTitle"){choose_category1++;}}catch(err){}
}}catch(err){}


choose_item1=0;
var a_tags=document.getElementsByTagName("a");
for (i=0; i < a_tags.length; i++){
var tag_inner=a_tags[i].innerHTML;
try{var status = a_tags[i].getAttribute("class");}catch(err){}
try{if(tag_inner.search(/productInfo/i)>0){choose_item1++;}}catch(err){}
}

try{if(choose_category1>0){choose_category(choose);}}catch(err){}
try{if(choose_item1>0){choose_item(product);}}catch(err){}

function choose_category(choose){

var element_nuber=find_element_nuber(choose);

function find_element_nuber(choose){
var element = document.getElementsByTagName("*");
choose=choose.toLowerCase();
a_elem=0;
for (var a = 0; a < element.length; a++) {

var status = element[a].getAttribute("class");   

if(element[a].tagName=="A"){a_elem++;}

if(status == "boutiqueTitle" && element[a].innerHTML.toLowerCase()==choose){return element[a];}
}}

var a_elements = document.getElementsByTagName("a");

a_elem--;

for (var i = 0; i < a_elements.length; i++) {
if(a_elements[i].getAttribute("class")=="boutiqueFrame bfs" && i==a_elem){return window.location.href=a_elements[i].href;}
}
}


function choose_item(product){

try{function search_function(){if(tag_inner.search(product[t])>=0){return true;}return false;}}catch(err){}

try{var a_tags=document.getElementsByTagName("a");}catch(err){}

try{for(t=0; t < product.length; t++){
try{for (i=0; i < a_tags.length; i++){

try{var tag_inner=a_tags[i].innerHTML;}catch(err){}
try{var status = a_tags[i].getAttribute("class");}catch(err){}

try{if(tag_inner.search(/productInfo/i)>0 && status!="productFrame pfs freshout" && search_function()){return window.location.href=a_tags[i].href;}}catch(err){}

}}catch(err){}
}}catch(err){}
}


fill_form(my_country, my_country_code, my_name_1, my_name_2, my_adress_1, my_adress_2, my_city, my_index, my_phone);
function fill_form(my_country, my_country_code, my_name_1, my_name_2, my_adress_1, my_adress_2, my_city, my_index, my_phone){

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

my_phone_one=my_phone.substr(0,3);
my_phone_two=my_phone.substr(3,3);
my_phone_three=my_phone.substr(6,4);

try{var element = document.getElementsByTagName("input");}catch(err){}

try{function getThisName(number){return element[number].getAttribute("name");}}catch(err){}
try{function getThisStyle(number){return element[number].getAttribute("style");}}catch(err){}
try{function str_replace(search, replace, subject){return subject.split(search).join(replace);}}catch(err){}

for(i=0; i < element.length; i++){

try{if(str_replace(" ","",getThisStyle(i))=="top:179px;left:73px;width:222px;"){document.getElementsByName(getThisName(i))[0].value=my_name_1;}}catch(err){}
try{if(str_replace(" ","",getThisStyle(i))=="top:179px;left:348px;width:222px;"){document.getElementsByName(getThisName(i))[0].value=my_name_2;}}catch(err){}
try{if(str_replace(" ","",getThisStyle(i))=="top:247px;left:73px;width:222px;"){document.getElementsByName(getThisName(i))[0].value=my_adress_1;}}catch(err){}
try{if(str_replace(" ","",getThisStyle(i))=="top:247px;left:348px;width:222px;"){document.getElementsByName(getThisName(i))[0].value=my_adress_2;}}catch(err){}
try{if(str_replace(" ","",getThisStyle(i))=="top:318px;left:73px;width:222px;"){document.getElementsByName(getThisName(i))[0].value=my_city;}}catch(err){}
try{if(str_replace(" ","",getThisStyle(i))=="top:318px;left:460px;width:110px;"){document.getElementsByName(getThisName(i))[0].value=my_index;}}catch(err){}

}


if(my_country=="United States of America (USA)" || my_country=="Canada"){
try{document.getElementById(getElementByRegexId("(phone[-_]?One|One[-_]?phone|phone[-_]?one)")).value=my_phone_one;}catch(err){}
try{document.getElementById(getElementByRegexId("(phone[-_]?Two|Two[-_]?phone|phone[-_]?two)")).value=my_phone_two;}catch(err){}
try{document.getElementById(getElementByRegexId("(phone[-_]?Three|Three[-_]?phone|phone[-_]?three)")).value=my_phone_three;}catch(err){}
}else{
try{document.getElementById(getElementByRegexId("(phone[-_]?Whole|Whole[-_]?phone|phone[-_]?whole)")).value=my_phone;}catch(err){}
}


if(my_country!="United States of America (USA)" && my_country!="Canada"){
var new_script = document.createElement("script");
new_script.innerHTML="cc.getElementsByTagName(\"SPAN\")[0].innerHTML='" + my_country +"';manipulateForm('" + my_country_code +"');countryField.value='" + my_country_code +"';countryDetails.value='" + my_country +"';";
document.body.appendChild(new_script);
}


var new_script_2 = document.createElement("script");
new_script_2.innerHTML="selectState('" + my_country_code +"', 1);";
document.body.appendChild(new_script_2);


try{document.getElementById("recaptcha_response_field").focus();}catch(err){}
try{document.getElementById("recaptcha_response_field").style.borderColor = "red";}catch(err){}
try{document.getElementById("recaptcha_response_field").style.borderWidth = "4px";}catch(err){}
}
