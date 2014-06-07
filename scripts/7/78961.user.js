// ==UserScript==
// @name           No comments
// @namespace      http://userscripts.org/users/kevinnn
// @description    Hides comments on various sites
// @version        1.007
// ==/UserScript==

var comments1 = document.getElementById('comments'); //spitsnieuws, dumpert, geenstijl
if(comments1)
	comments1.style.display = 'none';

var reacties1= document.getElementById('reacties'); //tweakers.net
if(reacties1)
	reacties1.style.display = 'none';
	
var reacties2= document.getElementByClassName('reacties'); //telegraaf.nl
if(reacties2)
	reacties2.style.display = 'none';