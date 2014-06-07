// ==UserScript==

// @name           Qunu Name Editor

// @namespace      http://mywebsite.com/myscripts

// @description    Changes the way qunu requests a chat and adds a prompt so that you can name yourself when asking a question

// @include        http://qunu.com/profile/*

// ==/UserScript==

function Mod_gQunu_requestChat() { 
 var newScript = 'OldSource = gQunu.requestChat.toSource();'+
 'OldSource = OldSource.replace(/^\\\(function \\\(\\\) \\\{/,"");' +
 'OldSource = OldSource.replace(/\\\}\\\)$/,"");' +
 'gQunu.requestChat = function(){' +
 'arguments[1]=prompt("What would you like your name to show up as in this chat?",arguments[1]);' +
 'eval(OldSource)' +
 '}';
 var jsEl = document.createElement('script'); 
 jsEl.type = 'text/javascript'; 
 jsEl.appendChild(document.createTextNode(newScript)); 
 document.body.appendChild(jsEl); 
}


window.addEventListener( 'load', function() { Mod_gQunu_requestChat() }, true);


