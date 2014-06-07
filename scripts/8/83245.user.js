// ==UserScript==
// @name        ePerBulik
// @version     1
// @description eRepublik MOD
// @author      Brenca
// @namespace   Brenca

// @include     http://*.erepublik.com/en
// @include     http://erepublik.com/en
// @include     http://*.erepublik.com/hu
// @include     http://erepublik.com/hu
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==

var thehtml;

GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://economy.erepublik.com/en/time-management',
			onload:function(responseDetails){

/* responseDetails.responseText.substring(responseDetails.responseText.search("var tooltip_data"),responseDetails.responseText.search("var ERPK_MAIN_HOST")); */

var wellness;
var wee;
var atm,atm2;
var dataz=responseDetails.responseText.substring(responseDetails.responseText.search("var tooltip_data"),responseDetails.responseText.search("var ERPK_MAIN_HOST"));

var indic=new Array();

wee=responseDetails.responseText.substring(responseDetails.responseText.search('<li class="nomargin" id="wellnessBar">'),responseDetails.responseText.search('<li id="happiness_indicator">'));

wellness=parseFloat(wee.substring(wee.search('<span>')+6,wee.search('</span>')));

thehtml='<div style="background-image:url(\'http://bence.heilig.hu/erepbg.jpg\'); background-repeat: repeat; width: 100%; height: 42px; border: 1px solid #1B6A85; padding-top: 5px;" id="easier"><div style="margin-left: 20px;"><div style="width: 60px; margin-top: 5px; float: left;"><a href="http://economy.erepublik.com/en/work"><img src="http://www.erepublik.com/images/modules/timemanagement/company_link.png" style="height: 25px; width: 45px;">';
if(responseDetails.responseText.match("work results")){
	thehtml=thehtml+'<img src="http://www.erepublik.com/images/modules/_icons/green_check_small.png" style="position: relative; left: 25px; top: -20px;">';

atm=dataz.substring(dataz.search("w_"),dataz.search("w_")+80);
atm2=parseInt(atm.substring(atm.search("timeSpent")+11,dataz.search("skillName")-2));
indic["work"]=atm2;

}else{
indic["work"]=0;
}
thehtml=thehtml+'</a></div><div style="width: 60px; margin-top: 5px; float: left;"><a href="http://economy.erepublik.com/en/train"><img src="http://www.erepublik.com/images/modules/timemanagement/training_grounds_link.png" style="height: 25px; width: 45px;">';
if(responseDetails.responseText.match("train results")){
	thehtml=thehtml+'<img src="http://www.erepublik.com/images/modules/_icons/green_check_small.png" style="position: relative; left: 25px; top: -20px;">';

atm=dataz.substring(dataz.search("t_"),dataz.search("t_")+80);
atm2=parseInt(atm.substring(atm.search("timeSpent")+11,dataz.search("skillName")-2));
indic["train"]=atm2;

}else{
indic["train"]=0;
}
thehtml=thehtml+'</a></div><div style="width: 60px; margin-top: 5px; float: left;"><a href="http://economy.erepublik.com/en/study"><img src="http://www.erepublik.com/images/modules/timemanagement/library_link.png" style="height: 25px; width: 45px;">';
if(responseDetails.responseText.match("study results")){
	thehtml=thehtml+'<img src="http://www.erepublik.com/images/modules/_icons/green_check_small.png" style="position: relative; left: 25px; top: -20px;">';

atm=dataz.substring(dataz.search("s_"),dataz.search("s_")+80);
atm2=parseInt(atm.substring(atm.search("timeSpent")+11,dataz.search("skillName")-2));
indic["study"]=atm2;

}else{
indic["study"]=0;
}
thehtml=thehtml+'</a></div><div style="width: 60px; margin-top: 5px; float: left;"><a href="http://economy.erepublik.com/en/entertain"><img src="http://www.erepublik.com/images/modules/timemanagement/entertaiment_link.png" style="height: 25px; width: 45px;">';
if(responseDetails.responseText.match("leisure results")){
	thehtml=thehtml+'<img src="http://www.erepublik.com/images/modules/_icons/green_check_small.png" style="position: relative; left: 25px; top: -20px;">';

atm=dataz.substring(dataz.search("l_"),dataz.search("l_")+80);
atm2=parseInt(atm.substring(atm.search("timeSpent")+12,dataz.search("happi")-3));
indic["pihi"]=atm2;

}else{
indic["pihi"]=0;
}
thehtml=thehtml+'</a></div>';
if(wellness>=40){
thehtml=thehtml+'<div style="width: 60px; float: left;"><a href="/en/battles/mybattlelist"><img src="http://bence.heilig.hu/battleground_button.png" style="height: 35px;"></a></div>';
}else{
thehtml=thehtml+'<div style="width: 60px; float: left;"><img src="http://bence.heilig.hu/battleground_button_exhausted.png" style="height: 35px;"></div>';
}
thehtml=thehtml+'<div style="clear: both; margin-left: -21px; margin-right: 1px; position: relative; top: -20px;"><div style="background-color: #589EB7; border: 1px solid #1B6A85; width: 100%; height: 14px; padding-top: 3px; padding-bottom: 3px;"><div style="width: 264px; margin: auto; height: 14px; padding: 0px; padding-right: 1px; background-color: grey; border-top: 1px solid grey; border-bottom: 1px solid grey;">';

for(i=1;i<=indic["work"];i++){
thehtml=thehtml+'<div style="width: 10px; height: 13px; border-left: 1px solid grey; border-rigth: 1px solid grey; background-color: blue; float: left;"></div>';
}
for(i=1;i<=indic["train"];i++){
thehtml=thehtml+'<div style="width: 10px; height: 13px; border-left: 1px solid grey; border-rigth: 1px solid grey; background-color: green; float: left;"></div>';
}
for(i=1;i<=indic["study"];i++){
thehtml=thehtml+'<div style="width: 10px; height: 13px; border-left: 1px solid grey; border-rigth: 1px solid grey; background-color: orange; float: left;"></div>';
}
for(i=1;i<=indic["pihi"];i++){
thehtml=thehtml+'<div style="width: 10px; height: 13px; border-left: 1px solid grey; border-rigth: 1px solid grey; background-color: purple; float: left;"></div>';
}

var marad=24-indic["pihi"]-indic["train"]-indic["study"]-indic["work"];

for(i=1;i<=marad;i++){
thehtml=thehtml+'<div style="width: 10px; height: 13px; border-left: 1px solid grey; border-rigth: 1px solid grey; background-color: white; float: left;"></div>';
}

thehtml=thehtml+'<div style="clear: both"></div></div></div></div></div></div>';


var newP = document.createElement("span");
newP.innerHTML= thehtml;
var p2 = document.getElementById('latestnews');
p2.parentNode.insertBefore(newP,p2);


			}
});