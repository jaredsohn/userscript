// ==UserScript==
// @name        email
// @namespace   email
// @description email
// @include     *
// @version     1
// ==/UserScript==
function findEmailAddresses(StrObj) {
	var separateEmailsBy = ", ";
	var email = "<none>"; // if no match, use this
	var emailsArray = StrObj.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	if (emailsArray) {
	email = "";
	for (var i = 0; i < emailsArray.length; i++) {
	if (i != 0) email += separateEmailsBy;
	email += emailsArray[i];
		  }
	   }
	return email;
}
function createDiv(text) 
{ 
	var _body = document.getElementsByTagName('body') [0];
	var _div = document.createElement('div');
	var _textarea = document.createElement('textarea')
	var _text = document.createTextNode(text)
	_textarea.appendChild(_text);
	_div.appendChild(_textarea);
	_body.appendChild(_div);
}
q=findEmailAddresses(document.body.innerHTML);
createDiv(q);