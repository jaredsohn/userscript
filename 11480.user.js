// ==UserScript==
// @name           search this site
// @discription    add's a search box at the top of the page to search through the current site in google  (equivalent to site:currentsite searchwords)
// @namespace      *
// @include        *
// ==/UserScript==
v=document.body.firstChild;
v.parentNode.insertBefore(document.createElement('b'), v).innerHTML+='<form  onsubmit=window.open("http://google.com/search?q=site:"+window.content.document.location.hostname+String.fromCharCode(32)+name.value);> <input name="name" size="30" value="" type="text"> <input name="Submit" value="go" type="submit">   </form>'