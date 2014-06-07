// ==UserScript==
// @name        Quick Login for Salty Bet
// @namespace   http://lambdaweb.awardspace.com/
// @description Log in quicker faster than you can say "NEVER BET ON DBZ"
// @include     http://www.saltybet.*
// @version     1
// @grant       none
// ==/UserScript==


// vars for the container for the modal window and background transparency
var modalPage = document.createElement('div');
modalPage.setAttribute('class','modal-page');
//modalPage.setAttribute('style', 'visibility: hidden');
var modalContainer = document.createElement('div');
modalContainer.setAttribute('class', 'modal-container');

//vars for the form
var formSN = document.createElement('form');
formSN.setAttribute('id', 'signinform');
formSN.setAttribute('class', 'fancyform');
formSN.setAttribute('method', 'post');
formSN.setAttribute('action', '/authenticate?signin=1');
//vars for label for Email
var spanLabelE = document.createElement('span');
spanLabelE.setAttribute('class', 'field');
var spanLabelEText = document.createTextNode('Email:');
spanLabelE.appendChild(spanLabelEText);
//var for email input field
var inputEmail = document.createElement('input');
var tempNameArray = ['id', 'type', 'value', 'name'];
var tempValueArray = ['email', 'text', '', 'email'];
function loopThrough(a , b , c){
var j = b.length;
	for(var i  = 0; i < j; i++){
	a.setAttribute(b[i], c[i]);
	}
	
	return a;
}

function appendKids(a , b){
			var j = b.length;
		for(var i = 0; i < j; i++){
			a.appendChild(b[i]);
			}
	return a;
}

inputEmail = loopThrough(inputEmail, tempNameArray, tempValueArray);

// var for label for Password
var spanLabelP = document.createElement('span');
spanLabelP.setAttribute('class','field');
var spanLabelPText = document.createTextNode('Password:');
spanLabelP.appendChild(spanLabelPText);
// var for input field for password
var inputPassword = document.createElement('input');
tempValueArray = [];
tempValueArray = ['pword', 'password', '', 'pword'];

loopThrough(inputPassword, tempNameArray, tempValueArray);

// var for input hidden
var inputHiddenAuth = document.createElement('input');
tempNameArray = []; tempValueArray = [];
tempNameArray = ['type', 'value', 'name'];
tempValueArray = ['hidden', 'signin', 'authenticate'];

loopThrough(inputHiddenAuth, tempNameArray, tempValueArray);
// vars for submit button
var inputSubmit = document.createElement('input');
inputSubmit.setAttribute('type','submit');
inputSubmit.setAttribute('value', 'Sign In');
//add to form

tempValueArray = [];
tempValueArray = [spanLabelE, inputEmail, spanLabelP, inputPassword, inputHiddenAuth, inputSubmit];
appendKids(formSN, tempValueArray);
// add to modal window
modalContainer.appendChild(formSN);
//add Container to Page
modalPage.appendChild(modalContainer);

$(document).ready(function(){
if($('.graybutton').length = 0) {
	    
    }
else{
$('.graybutton').attr('href', '#');
$('.footercenter').after(modalPage);
$('.modal-page').attr('style', 'position: absolute; top: -380%; left: 80%; display: none;');

       $('.graybutton').click(function(){
	           //$('.modal-page').attr('visibility', 'visible');
		       $('.modal-page').toggle('drop', 1000);

	   });
}
});
