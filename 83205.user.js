// ==UserScript==
// @name nCore GET Search
// @include http://ncore.*/letoltes.php*
// @author NPeete
// ==/UserScript==

window.addEventListener('load', function(){
 var myattr = document.createAttribute('method');
 myattr.value = "GET";
 document.getElementsByTagName('form')[0].attributes.setNamedItem(myattr);
},0);