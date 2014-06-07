// Wright State Authentication
// version 1.0
// By Josh Cope - http://www.blazingwolf.com/greasemonkey/
// computerwolf8@gmail.com
// Last Updated: 2006-11-27

//This version requires user to insert username and password below

// ==UserScript==
// @name          Wright State Authentication SV
// @description   Quick Wright State Authentication using script variables
// @include       https://fw1-167.wright.edu:8081/
// @include       http://access.wright.edu/
// ==/UserScript==
(function(){

//BE SURE TO SET YOUR USERNAME AND PASSWORD HERE

var username = ''; //TYPE USERNAME BETWEEN ''

var password = ''; //TYPE PASSWORD BETWEEN ''

var href = window.location.href;

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
alert('Change username or password in Greasemonkey file');
}
}

if ((username == '') || (password==''))
{

alert('Set username or password in Greasemonkey file');

}
else
{

textareas = document.getElementsByName('DATA');

if(textareas.length == 2)
{
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
}

if(textareas.length == 1)
{
alert('Change username or password in Greasemonkey file');
}

}

})();