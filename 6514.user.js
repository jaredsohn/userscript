// Wright State Authentication
// version 1.0
// By Josh Cope - http://www.blazingwolf.com/greasemonkey/
// computerwolf8@gmail.com
// Last Updated: 2006-11-27

//Requires Greasemonkey 0.3 or higher
//May have errors due to slight bugs

// ==UserScript==
// @name          Wright State Authentication GV
// @description   Quick Wright State Authentication using Greasemonkey variables
// @include       https://fw1-167.wright.edu:8081/
// @include       http://access.wright.edu/
// ==/UserScript==
(function(){

function resetAll()
{
	var username = '';
	var password = '';
	username = prompt("Reset Wright State Username");
	GM_setValue('username', username);


	password = prompt("Reset Wright State Password");
	GM_setValue('password', password);
}

function resetUser()
{
	var username = '';
	username = prompt("Reset Wright State Username");
	GM_setValue('username', username);
}

function resetPass()
{
	var password = '';
	password = prompt("Reset Wright State Password");
	GM_setValue('password', password);
}

if (!GM_setValue) {
    alert('Please upgrade at least version 0.3 of Greasemonkey.');
}
else
{

var href = window.location.href;
var reset = 'false';

if (reset != 'true')
{
if (href == "http://access.wright.edu/")
{
window.location.href = "https://fw1-167.wright.edu:8081/";
}
else
{

form = document.forms[0];

a = form.length;

for(s=0;s<a;s++){

if(form.elements[s].value == 'Relogin' )
{
	resetPass();
window.location.href = "https://fw1-167.wright.edu:8081/";
}
}

textareas = document.getElementsByName('DATA');

if(textareas.length == 2)
{

var username = '';
var password = '';

if (!GM_getValue('username')) {
	username = prompt("Wright State Username");
	GM_setValue('username', username);
} else {
	username = GM_getValue('username');
}

if (!GM_getValue('password')) {
	password = prompt("Wright State Password");
	GM_setValue('password', password);
} else {
	password = GM_getValue('password');
}


boxes = document.getElementsByName('DATA');

  var username2 = boxes[0];
  var password2 = boxes[1];

  username2.value = username;
  password2.value = password;


form.submit();
}

if(textareas.length == 3)
{
form.submit();
}

if(textareas.length == 1)
{
resetPass();
window.location.href = "https://fw1-167.wright.edu:8081/";
}

}

}
else
{
resetAll();

}

}

})();