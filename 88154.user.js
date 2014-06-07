// ==UserScript==
// @name           Add tab with links
// @namespace      http://userscripts.org/users/115736
// @description    Adds a tab on top of every page so that you could add links.
// @include        http://*.google.com/*
// @copyright      Seetherage
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==


var defaultLinks = {
"Google" : "http://www.google.com",
"Hotmail" : "http://www.hotmail.com",
"":""
};


  var newdiv = document.createElement('div');
  newdiv.setAttribute('id','topDiv');
  newdiv.setAttribute('left','0');
  newdiv.setAttribute('top','0');
  newdiv.setAttribute('width','100%');
  newdiv.setAttribute('height','20px');
  newdiv.setAttribute('align','center');
  newdiv.setAttribute('font-weight','normal'); 
  newdiv.setAttribute('font-family','verdana, tahoma, arial, sans-serif');
  newdiv.setAttribute('font-size', '11px');
  document.body.appendChild(newdiv);
  

var editDivC = "";

for(var u in defaultLinks) {
if(u!=""){
editDivC = editDivC + '<a href="' + defaultLinks[u] + '">' + u + "</a> ";
}
}

//this adds the edit link
//topDiv.appendChild(create("a", {href:"javascript:showEdit()", textContent:"Edit Links", style:"padding:14px 4px 8px 4px !important; color:#FFFFFF; font-weight:normal; font-family: verdana, tahoma, arial, sans-serif; font-size: 11px;", target:"_parent"}));

newdiv.innerHTML = editDivC + '<a href="javascript:showEdit()">Edit Links</a>';

function showEdit(){
var editDivC2 = '';
var newdiv2 = document.createElement('div');
  newdiv2.setAttribute('id','editDiv');
  newdiv2.setAttribute('left','50%');
  newdiv2.setAttribute('top','20px');
  newdiv2.setAttribute('width','200px');
  newdiv2.setAttribute('height','20px');
  newdiv2.setAttribute('align','center');
  document.body.appendChild(newdiv2);
  for(var u in defaultLinks) {
if(u!=""){
editDivC2 = editDivC2 + u + '<a href="javascript:removeLink(\'' + u + '\')"> Remove </a><br>';
}
newdiv2.innerHTML = editDivC2;
}

}

function removeLink(v){



}