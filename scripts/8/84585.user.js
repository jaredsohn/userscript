//
// ==UserScript==
// @name          DoH Reset Relogger
// @version       1.0.1
// @author        Ryan/Athy
// @namespace     http://www.domainofheroes.com/
// @description   Auto login to DoH and auto fight and change menus
// @include       http://domainofheroes.com/*
// @include       http://*.domainofheroes.com/*
// ==/UserScript==
//
// UID:
//

var aEmail = 			"login@email.com";
var aPass = 			"login_password";
var aCharacter = 	"full_toon_name";
var attackSkill = 	"javascript:SetBattleActionPvE(62);";  	//jsmackdown = 90; holysmyte 58; suckerpunch = 39; holy strike 21; attack 156; heavenly smite 58; ninja stars 53; power chord 163
var attackLoc = 		"javascript:MapGoTo('LOC95');"				//106 = GT 39 = BJ  95=FP NI=157

function CheckNewVersion(){
  var servStatus = document.getElementById('serverStatus').childNodes[1].nodeValue;
  if ( servStatus != null && servStatus.match(/Server status: up/i) ) { location.href = "http://www.domainofheroes.com/Login.aspx"; }
  else { setTimeout( CheckNewVersion, 2000 ); }
}

function CheckLogin() {
    var emailInput = document.getElementById('ctl00_Column2_PlayerLogin1_txtUsername');    emailInput.value = aEmail;
    var passInput = document.getElementById('ctl00_Column2_PlayerLogin1_txtPassword');    passInput.value = aPass;
    var submitButton = document.getElementById('ctl00_Column2_PlayerLogin1_Button1');    submitButton.click();
}

function CheckCharSelect(){
  var charSelectDiv = document.getElementById('ctl00_Column2_pnlSelect');
  var TbodyLoc = charSelectDiv.childNodes[3].childNodes[0];
  for ( var j = 0; j <= TbodyLoc.childNodes.length - 1; j = j + 1 )  {
    var CharCheck = TbodyLoc.childNodes[j].childNodes[0].childNodes[0];
    if ( CharCheck.innerHTML.match( RegExp(">" +  aCharacter + "<", "i" ) ) )    {  location.href = CharCheck.href;   break;   }
  }
}

function GotoNewVersion() {  location.href = "http://www.domainofheroes.com/NewVersion.aspx";  }

function SelSkil()	{ location.href = attackSkill; }
function FightEm()	{ location.href = "javascript:JoinBattlePvE();";	setTimeout( SelSkil,  5000 ); }
function GoGrind()	{ location.href = attackLoc;								setTimeout( FightEm, 6000 ); }

function FailSafe()	{ if ( !(location.href.match(/Game/i) ) &&  !(location.href.match(/forums/i) ) ) { location.href = "http://www.domainofheroes.com/Default.aspx";  }  }
if ( location.href.match(/NewVersion/i) )	{ setTimeout( CheckNewVersion, 2000 ); setTimeout( GotoNewVersion, 5*60000);}
if ( location.href.match(/Login/i) )			{ setTimeout( CheckLogin, 5000 ); }
if ( location.href.match(/Choose/i) )			{ setTimeout( CheckCharSelect, 5000 ); }
if ( location.href.match(/Game/i) )			{ setTimeout( GoGrind, 40000 ); }
if ( location.href.match(/Default/i) )			{ location.href = "http://www.domainofheroes.com/Login.aspx"; }
if ( location.href.match(/Error/i) )			{ setTimeout( GotoNewVersion, 3000);}