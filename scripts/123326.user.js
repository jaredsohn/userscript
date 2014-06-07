// ==UserScript==
// @name           wigBotUtils
// @namespace      http://www.sofiawars.com/*
// @description    wigBotUtils
// @include        http://www.sofiawars.com/*
// ==/UserScript==

function Refresh(){
	document.location.href = top.location.href.substr(20);
}
function GoToAlley(){
	document.location.href='/alley/';
}	
function GoToMetro(){
	document.location.href='/metro/';
}
function GoToFactory(){
	document.location.href='/factory/';
}
function GoToShaurburgers(){
	document.location.href='/shaurburgers/';
}
function GoToThimble(){
	document.location.href='/thimble/start/';
}
function LeaveThimble(){
	document.location.href='/thimble/leave/';
}
function GoToThimbleNine(){
	document.location.href='/thimble/play/9/';
}
function StartMetroWork(){
	unsafeWindow.metroWork();
}
function StartMetroDig(){
	unsafeWindow.metroDig();
}
function FlatHeal(){
	document.location.href='/home/heal/';
}
function GoToThimbleGuess0(){
	document.location.href='/thimble/guess/0/';
}
function GoToThimbleGuess1(){
	document.location.href='/thimble/guess/1/';
}
function GoToThimbleGuess2(){
	document.location.href='/thimble/guess/2/';
}
function GoToThimbleGuess3(){
	document.location.href='/thimble/guess/3/';
}
function GoToThimbleGuess4(){
	document.location.href='/thimble/guess/4/';
}
function GoToThimbleGuess5(){
	document.location.href='/thimble/guess/5/';
}
function GoToThimbleGuess6(){
	document.location.href='/thimble/guess/6/';
}
function GoToThimbleGuess7(){
	document.location.href='/thimble/guess/7/';
}
function GoToThimbleGuess8(){
	document.location.href='/thimble/guess/8/';
}
function GoToWantedList(){
	document.location.href='/huntclub/wanted/level/my/';
}

function CompareDates(date1,date2){
	if (date1==date2) return 0;
	if (parseInt(date1.substr(6,4), 10)>parseInt(date2.substr(6,4), 10)) return 1;
	if (parseInt(date1.substr(6,4), 10)<parseInt(date2.substr(6,4), 10)) return -1;
	
	if (parseInt(date1.substr(3,2), 10)>parseInt(date2.substr(3,2), 10)) return 1;
	if (parseInt(date1.substr(3,2), 10)<parseInt(date2.substr(3,2), 10)) return -1;
	
	if (parseInt(date1.substr(0,2), 10)>parseInt(date2.substr(0,2), 10)) return 1;
	if (parseInt(date1.substr(0,2), 10)<parseInt(date2.substr(0,2), 10)) return -1;
	
	if (parseInt(date1.substr(11,2), 10)>parseInt(date2.substr(11,2), 10)) return 1;
	if (parseInt(date1.substr(11,2), 10)<parseInt(date2.substr(11,2), 10)) return -1;
	
	if (parseInt(date1.substr(14,2), 10)>parseInt(date2.substr(14,2), 10)) return 1;
	if (parseInt(date1.substr(14,2), 10)<parseInt(date2.substr(14,2), 10)) return -1;
	
	if (parseInt(date1.substr(17,2), 10)>parseInt(date2.substr(17,2), 10)) return 1;
	if (parseInt(date1.substr(17,2), 10)<parseInt(date2.substr(17,2), 10)) return -1;
	return 0;
}

function SetupTextByID(strID,strText){
	document.getElementById(strID).innerHTML=strText;
}

function MySubString(str,strSt,strFi,stIndex){
	if (stIndex==undefined) stIndex = 0;
	var index1 = str.indexOf(strSt,stIndex)+strSt.length;
	if (index1<strSt.length) return undefined;
	var index2 = str.indexOf(strFi,index1);
	if (index2<0) return undefined;
	return str.substr(index1,index2-index1);
}

		
function SetValue(value){
	var val = parseInt(value);
	if (val>9) return val;
	return ("0"+val);
}
function OutTime(Value){
  var result = SetValue(Value.getDate())+'.'+SetValue((Value.getMonth()+1))+'.'+SetValue(Value.getFullYear())+' ';
      result += SetValue(Value.getHours())+':'+SetValue(Value.getMinutes())+':'+SetValue(Value.getSeconds());
  return result;//alert(now+'\n'+then);
}

function OutOnlyTime(Value){
  var result = SetValue(Value.getHours())+':'+SetValue(Value.getMinutes())+':'+SetValue(Value.getSeconds());
  return result;//alert(now+'\n'+then);
}

function setRandTimeout(func,delay){
	var mRandVal=Math.floor(Math.random()*500)+500; 
	setTimeout(func,delay+mRandVal);
}

function SelectAgain(){
	document.location.href="/alley/search/again/";
}

function AddTextToDiv(strID,strText){
	var curText = document.getElementById(strID).innerHTML;
	document.getElementById(strID).innerHTML = curText+'<br />'+strText;
}

function TakeSubString(base,start,finish){
	var PosStart = base.indexOf(start)+start.length;
	var PosFinish = base.indexOf(finish,PosStart);
	return (base.substr(PosStart,PosFinish-PosStart));
}	

function SelectTarget(){
	$ = unsafeWindow.jQuery;
	$('#searchLevelForm input[name="minlevel"]').val(10);
	$('#searchLevelForm input[name="maxlevel"]').val(10);
	$('#searchLevelForm').trigger('submit');
}

function ShrauWork(){
	$ = unsafeWindow.jQuery;
	$('#workForm  select[name="time"]').val(12);
	if (parseInt($('#workForm  select[name="time"]').val())!=12){
		$('#workForm  select[name="time"]').val(8);
	}
	$('#workForm').trigger('submit');
}

function PetricksStart(){
	$ = unsafeWindow.jQuery;
	var frmPetric = $(".factory-nanoptric");
	frmPetric.submit();
}