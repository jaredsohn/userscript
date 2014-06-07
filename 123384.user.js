// ==UserScript==
// @name           	CIEFA
// @version			1.1b
// @namespace      	:)
// @copyright		Kevin BON
// @include        	http://alternance.igs-lyon.com/*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
jQuery(document).ready(function($){
var test_co=$(".documentFirstHeading:contains('Nous sommes désolés mais il semble qu\'il y ait une erreur')").text()
var test_co2=$("legend:contains('Veuillez vous connecter')").text()
if(test_co || test_co2){
force_connexion()}
function force_connexion(){
var session_login=lit_cook("login")
var session_mdp=lit_cook("mdp")
if(session_login=='' || session_mdp==''){
var session_login=prompt('Login:')
var session_mdp=prompt('Mdp:')
cre_cook("login",session_login,365)
cre_cook("mdp",session_mdp,365)}
$.ajax({
type: 'POST',
url: "login_form",
async: false,
data: "came_form=http://www.toncul.com&form.submitted=1&js_enabled=0&cookies_enabled=&login_name=&pw_empty=0&__ac_name="+session_login+"&__ac_password="+session_mdp+""
})
location.reload(true)}
function cre_cook(nom,contenu,jours){
var expireDate=new Date()
expireDate.setTime(expireDate.getTime()+jours*24*3600*1000)
document.cookie=nom+"="+escape(contenu)
+";expires="+expireDate.toGMTString()}
function lit_cook(nom){
var deb,fin
deb=document.cookie.indexOf(nom+"=")
if(deb>=0){
deb+=nom.length+1
fin=document.cookie.indexOf(";",deb)
if(fin<0)fin=document.cookie.length
return unescape(document.cookie.substring(deb,fin))}
return ""}
function tue_cook(nom){cre_cook(nom,"",-1)}
$(".timetable .event:contains('DROIT')").css({'background-color':'violet',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('MATHS')").css({'background-color':'blue',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('ARCHI MAT/LOG')").css({'background-color':'yellow',
'font-weight':'bold'})
$(".timetable .event:contains('GESTION')").css({'background-color':'green',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('LV1 ANGLAIS')").css({'background-color':'red',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('MANAGEMENT')").css({'background-color':'grey',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('ACTION PRO'),.timetable .event:contains('DEVELOPPEMENT')").css({'background-color':'orange',
'color':'white',
'font-weight':'bold'})
$(".timetable .event:contains('R&D')").css({'background-color':'white',
'border':'none'})
$(".timetable .event:contains('CULTURE')").css({'background-color':'pink',
'border':'none'})
var rcp_day=$('select[name=date_day]').val()
var rcp_month=$('select[name=date_month]').val()
var rcp_year=$('select[name=date_year]').val()
var myDate=new Date()
if(rcp_day==myDate.getDate()){
rcp_day=(rcp_day-myDate.getDay())+1}
show_me()
function show_me(){
$('form[action="emploi_du_temps"]').before('<div class="hackMore" id="hackMore" align="center">'+
'<form action="emploi_du_temps" method="get"name="emploiTps_edit">'+
'<table><tr><td><input type="Button" class="plus" value="+" onClick="javascript:document.getElementById(\'i_day\').setAttribute(\'value\',parseInt(document.getElementById(\'i_day\').getAttribute(\'value\'))+7);" /></td><td><input type="Button" class="plus" value="+" onClick="javascript:document.getElementById(\'i_mon\').setAttribute(\'value\',parseInt(document.getElementById(\'i_mon\').getAttribute(\'value\'))+1);" /></td></tr>'+
' <tr> '+
'	   <td> <input type="texte" id="i_day" name="date_day" 		value="'+rcp_day+'" 	maxlength="2" size="1"/> </td>'+
' 	   <td> <input type="texte" id="i_mon" name="date_month" 	value="'+rcp_month+'"	maxlength="2" size="1"/> </td> '+
' 	   <td> <input type="texte" 		   name="date_year" 	value="'+rcp_year+'" 	maxlength="4" size="3"/> </td> '+
'	   <td>  <td style="margin-left:10px"><input type="submit" id="doIt" value="HackMore"/> </td> </tr>'+
' <tr><td> <input type="Button" class="moins" value="-" onClick="javascript:document.getElementById(\'i_day\').setAttribute(\'value\',parseInt(document.getElementById(\'i_day\').getAttribute(\'value\'))-7);" /> </td><td><input type="Button" class="moins" value="-" onClick="javascript:document.getElementById(\'i_mon\').setAttribute(\'value\',parseInt(document.getElementById(\'i_mon\').getAttribute(\'value\'))-1);" /></tr>'+
'</table>'+
'</form>'+
'</div>')
$('.hackMore input[type="button"]').css({'background':'black','width':'23px','font-weight':'bolder'})
$('.plus').css({'color':'red'})
$('.moins').css({'color':'green'})
$('.hackmore input').css({'text-align':'center'});
$('.hackMore').css({'background-color':'black',
'color':'white',
'padding':'10px'})
$('#doIt').css({'color':'red','font-weight':'bolder'})}
})
