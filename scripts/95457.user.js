// ==UserScript==
// @name           Facebook New Account Creator
// @namespace      http://www.facebook.com
// @description    Helps you create Facebook accounts
// @include        *facebook.com/r.php*
// ==/UserScript==

// Parameters
var myPassword = "";

// Useful functions
function randomNumber(max) {
	return Math.floor(Math.random()*max);
}
function getRandomFirstName() {
	var FNarray = ["Ethan", "Dylan", "Lucas", "Ryan", "Ian", "Alex", "Ben", "Joel", "Justin", "Thomas", "Joshua", "Daniel", "James", "Samuel", "Joseph", "Benjamin", "Ethan", "Jacob", "Luke", "Matthew", "Adam", "Isaac", "Nathan", "Michael", "Aaron", "Noah", "David", "Reuben", "Brandon", "William"];
	return FNarray[randomNumber(FNarray.length)];
}
function getRandomLastName() {
	var LNarray = ["Ho", "Sng", "Soh", "Chua", "Phua", "Yee", "Sim", "Tan", "Lim", "Lee", "Ng", "Ong", "Wong", "Goh", "Chua", "Chan", "Koh", "Teo", "Ang", "Yeo", "Tay", "Ho", "Low", "Toh", "Sim", "Chong", "Chia", "Wu", "Chen", "Lin", "Li", "Shen", "See", "Wee", "Yu"];
	return LNarray[randomNumber(LNarray.length)];
}
	
document.getElementById('firstname').value=getRandomFirstName();
document.getElementById('lastname').value=getRandomLastName();
document.getElementById('reg_passwd__').value=myPassword;
document.getElementById('sex').value='2';

document.getElementById('birthday_day').value='1';
document.getElementById('birthday_month').value='1';
document.getElementById('birthday_year').value='1994';