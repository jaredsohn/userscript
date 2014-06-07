// ==UserScript==
// @name Ideone Privacy
// @version    1.0
// @description   Sets privacy for Ideone submissions to private by default, and alerts if user is making a public/secret paste.
// @include http://ideone.com/
// @include http://ideone.com/fork/*
// @include https://ideone.com/
// @include https://ideone.com/fork/*
// @grant none
// ==/UserScript==



/*
 * Author : Amrendra Kumar
 * For chrome at chrome web store: https://chrome.google.com/webstore/detail/private-codes/jnbfjcagnimdookcncakomikecgapoij
 * 
 * Git Hub repository including similar script for chrome at
 * Url: https://github.com/thecodegame/ideone-privacy
 *
 * Privacy Settings at Ideone:
 *	Public  : Submissions are available to everyone, even shown in recent codes on Ideone.
 *  	Secret  : Submissions are available to anyone who has the link to it, these submission can come up in google searches.
 *  	Private : Submissions are available only to the user who created it.
 *
 */


//for debugging purpose
//if debugging is set to true, then a debugging log would be shown 
//in a div at bottom right
var DEBUG = false;

var BODY = document.getElementsByTagName("body")[0];

//create a div for debugging purpose
var trace = document.createElement("div");
//set style for the debugging div trace
trace.style.position = "fixed";
trace.style.bottom = "0px";
trace.style.right = "0px";
trace.style.width = "500px";
trace.style.border = "1px";
trace.style.backgroundColor = "#FFF";
trace.style.borderColor = "#000";
trace.style.overflow = "scroll";

//add debugging div to body
if(DEBUG){
	trace.innerHTML="--------------LOG--------------<br />";
	BODY.appendChild(trace);
}

function LOG(msg){
	if(DEBUG){
		trace.innerHTML += ""+msg+"<br />";
	}
}

//lets assume user is not logged in
var LOGGED_IN = false;
//status of the paste, lets assume it to be public
var STATUS = 1;// 1:public 0:secret -1: private



//this function is triggered when Run/Ideone it button is pressed
function check(event){
	LOG("Log in: "+LOGGED_IN+" Status: "+STATUS);
	//PRIVATE_BTN.click();
	switch(STATUS){
		case -1://user is making a hidden submission
		return true;
		case 0://user is making a secret submission, solution is still available for ppl with links
		if(!window.confirm("You are making secret paste, it would be still available to people with the link to the paste. Are you sure?"))
     		return event.preventDefault();
		return true;
		case 1://user is making a public solution
		if(!window.confirm("You are making public paste, it would be available to everyone, also it would be shown in recent codes. Are you sure?"))
     		return event.preventDefault();
		return true;
		break;
		default://never gonna happen
		return true;
	}
	
}


//check if user is logged in or not
//if menu bar present on top right has a link to account, that means user is logged in
var container = document.getElementsByClassName('container')[0];
var links = container.getElementsByTagName('a');
for(var i=0;i<links.length;i++){
	var l = links[i].href;
	if(l.trim()=="http://ideone.com/account"){
		LOGGED_IN=true;
		break;
	}
}



//get the footer area, when Run button is present, and add a status button
var footer = document.getElementsByClassName('footer')[0];
var RUN_DIV = footer.getElementsByClassName('pull-right')[0];
var RUN_BTN = RUN_DIV.getElementsByTagName('button')[0];
//add the onclick listener to Run/Ideone It button
RUN_BTN.addEventListener("click",  check); 


//add the status button before run/Ideone it button
var tag = document.createElement('span');
tag.className = "btn";//for button css
tag.className += " btn-warning";//yellow color
tag.className += " footer-item";//footer sync
tag.innerHTML = "checking..";
tag.style.marginLeft = "10px";
//add the status button just before the Run/Ideone it button
footer.insertBefore(tag, RUN_DIV);


//updating the status button to public
function makePublic(){
	LOG("making public");
	if(STATUS==-1){
		if(tag.classList.contains('btn-success')){
			tag.classList.remove('btn-success');
			tag.classList.add('btn-warning');
		}
	}
	STATUS = 1;
	tag.innerHTML = "Public Paste";
	if(LOGGED_IN){
		tag.title = 'NOT RECOMMENDED! Public pastes are available to everyone.';
	}else{
		tag.title = 'NOT RECOMMENDED! Public pastes are available to everyone. Log in for a private paste';
	}
}

//updating the status button to secret
function makeSecret(){
	LOG("making secret");
	if(STATUS==-1){
		if(tag.classList.contains('btn-success')){
			tag.classList.remove('btn-success');
			tag.classList.add('btn-warning');
		}
	}
	STATUS = 0;
	tag.innerHTML = "Secret Paste";
	if(LOGGED_IN){
		tag.title = 'NOT RECOMMENDED! Secret pastes are available to anyone with the link.';
	}else{
		tag.title = 'NOT RECOMMENDED! Secret pastes are available to anyone with the link. Log in for a private paste';
	}
}

//updating the status button to private
function makePrivate(){
	if(LOGGED_IN){
		LOG("making private");
		STATUS = -1;
		tag.innerHTML = "Private Paste";
		tag.title = 'RECOMMENDED! \r\n Private pastes are available to you only';
		if(tag.classList.contains('btn-warning')){
			tag.classList.remove('btn-warning');
			tag.classList.add('btn-success');
		}
	}else{
		LOG("cannot make private");
	}
}
//Ideone has updated its UI
function update(){
	tag.innerHTML = "UPDATE";
	tag.title = 'Ideone UI changed, update Ideone Hidden Submission extension';
}

//get the buttons for privacy
var BTN_GROUP = document.getElementById('btn-group-visibility');
var BTNS = BTN_GROUP.getElementsByTagName("button");
//get the invidual buttons for privacy
var PUBLIC_BTN = BTNS[0];
var SECRET_BTN = BTNS[1];
var PRIVATE_BTN = BTNS[2];

//adding onclick listeners to the public,secret and private button 
PUBLIC_BTN.addEventListener("click",  makePublic,false);
SECRET_BTN.addEventListener("click",  makeSecret,false);
PRIVATE_BTN.addEventListener("click", makePrivate,false);


//returns what privacy is set 
function getButton(){
	if(PUBLIC_BTN.classList.contains('active')){return 1;}
	if(SECRET_BTN.classList.contains('active')){return 0;}
	if(PRIVATE_BTN.classList.contains('active')){return -1;}
	return 2;//errror
}


//sets the status button
function setStatus(x){
	switch(x){
		case 1:makePublic();break;
		case 0:makeSecret();break;
		case -1:makePrivate();break;
		default:update();break;
	}
}

//set the status
if(LOGGED_IN==false){
	LOG("user not logged in");
	//user is not logged in, cannot make private submissions, just set the status
	setStatus(getButton());
}else{
    setStatus(getButton());

	//user is logged in,lets try and make private default value
	var x = getButton();
	if(x==1){//button is set to public by default
		LOG("from public to private default");
		//window.onload = PRIVATE_BTN.click();
		window.onload = onLoad;
	}else if(x==0){//button is set to secret by default
		LOG("from secret to private");
		//window.onload = PRIVATE_BTN.click();
		window.onload = onLoad;
	}else{
	
	}
	//makePrivate();
}

function onLoad(){
    LOG("trying to change");
    PRIVATE_BTN.click();
}