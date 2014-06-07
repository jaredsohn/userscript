// ==UserScript==
// @name        EPMood
// @namespace   http://userscripts.org/users/486783
// @description Allows EP users to change their mood to anything they want
// @include     http://www.experienceproject.com/
// @version     1
// @grant       none
// ==/UserScript==


var sessionkey = document.getElementsByName('_csrf')[0].getAttribute('value');
var old = document.getElementById('member-home-sidebar-status-module');
var sidebar = old.parentNode;
old.parentNode.removeChild(old);

var form = document.createElement('form');
form.setAttribute('action', 'http://www.experienceproject.com/ajax/member/post-status.php');
form.setAttribute('method', 'post');
form.setAttribute('target', '_blank');

var status = document.createElement('input');
status.setAttribute('name', 'status');
status.setAttribute('size', '15');
status.setAttribute('type', 'text');

var mood = document.createElement('input');
mood.setAttribute('name', 'mood');
mood.setAttribute('size', '15');
mood.setAttribute('type', 'text');

var session = document.createElement('input');
session.setAttribute('name', '_csrf');
session.setAttribute('value', sessionkey);
session.setAttribute('type', 'hidden');

var submit = document.createElement('input');
submit.setAttribute('value', 'Update Status');
submit.setAttribute('type', 'submit');

form.appendChild(document.createElement('br'));
form.appendChild(document.createTextNode('Status'));
form.appendChild(status);
form.appendChild(document.createElement('br'));
form.appendChild(document.createTextNode('I\'m feeling '));
form.appendChild(mood);
form.appendChild(session)
form.appendChild(document.createElement('br'));
form.appendChild(submit);

var node = document.createElement('div');
node.setAttribute('class', 'member-home-sidebar-module');
node.appendChild(form);

sidebar.appendChild(node);