// ==UserScript==

// @name          Infospace

// @namespace     http://userscripts.org/scripts

// @description   Defaults to Find a Person radio button

// @include       http://*infospace.com/*

// @exclude       

// ==/UserScript==



/*



  Author: Ashok Mollin 



  Created for http://infospace.com website

  

  This script defaults to Find a Person radio button when you visit Infospace website. 

  Original page defaults to Find a Business by Type. It is annoying to keep selecting 

  Find a Person every time you come to this page. Hence, wrote this simple script. 

  

  This is also my first test with GM script. Hope it is useful.

  

*/

var i = 1;

(function () {

 var el = document.forms[0].elements;

 for(var i = 0 ; i < el.length ; ++i) {

 if (el[i].type == "radio") {

 	el[i].checked = true;

 }

 if(el[i].name == "qhqn") {

 	el[i].value="Lastname*, Firstname";

 }

 }

return true;

})();



