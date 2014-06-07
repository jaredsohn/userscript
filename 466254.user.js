// ==UserScript==
// @name             TDC Optimizer
// @namespace        http://*.thedatingchat.com
// @description      Optimize TheDatingChat with some Features (This script even does the laundry! :-P) ©imBig
// @include          http://thedatingchat.com/*
// @include          http://*.thedatingchat.com/*
// @icon             http://thedatingchat.com/images/logo.png
// @version          1.1
// @author	     imBig
// @copyright	     imBig
// @grant            none
// ==/UserScript==

var MyDiv = document.createElement('div');
MyDiv.id = 'MyTDC';
MyDiv.style = 'font-family: \'Ultra\',serif;';
// red?		
document.getElementsByTagName('div')[0].appendChild(MyDiv);
//"contenedor"
var MyTDCNextLink = document.createElement('a');
MyTDCNextLink.id = 'MyTDCNextLink';
MyTDCNextLink.href = '#';
MyTDCNextLink.style.marginLeft = '10px';
MyTDCNextLink.style.cssFloat = 'left';
MyTDCNextLink.style.color = 'orange';
// class
MyTDCNextLink.addEventListener('click', Next, false);
document.getElementById('MyTDC').appendChild(MyTDCNextLink);
var MyTDCTextNode = document.createTextNode("Next Show");
document.getElementById('MyTDCNextLink').appendChild(MyTDCTextNode);
// 3
var MyTDCCheckLink = document.createElement('a');
MyTDCCheckLink.id = 'MyTDCCheckLink';
MyTDCCheckLink.href = '#';
MyTDCCheckLink.style.marginLeft = '10px';
MyTDCCheckLink.style.cssFloat = 'left';
MyTDCCheckLink.style.color = 'orange';
MyTDCCheckLink.addEventListener('click', Id, false);
document.getElementById('MyTDC').appendChild(MyTDCCheckLink);
var MyTDCTextNode2 = document.createTextNode("Show ID");
document.getElementById('MyTDCCheckLink').appendChild(MyTDCTextNode2);
// Clear
var ClearCont = document.createElement('div');
ClearCont.id = 'ClearCont';
ClearCont.style.border = "thin solid blue";
ClearCont.style.width = '0px';
ClearCont.style.clear = 'both';
document.getElementById('MyTDC').appendChild(ClearCont);

function Id() {
	alert('ID:\n'+idpublisher);
}
