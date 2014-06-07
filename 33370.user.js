//
// ==UserScript==
// @name          Conquer Club Links
// @namespace     http://userscripts.org/
// @description   Script to add fast links to menu
// @include       http://www.conquerclub.com/*
// ==/UserScript==


var myLinks;

function Link(url,name) {
this._url = url;
this._name = name;
}

function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if (exact)
   {
    if(oElement.className==strClassName){
    arrReturnElements.push(oElement);
    }
   }
   else
   {
    if(oElement.className.has(strClassName)){
     arrReturnElements.push(oElement);
    }
   }
  }
  return (arrReturnElements)
}

function showLinks() {
  var mg = document.getElementById('message');
  var shtml = "<b>Link: </b><input size=40 id=newlink type=text><b>Name: </b><input size=40 id=newname type=text><button id=addlink>Add</button><br /><br />";
  shtml += "<table border=1><tr><td><b>Link</b></td><td><b>Name</b></td><td>&nbsp;</td></tr>";
  for(var s=0; s< myLinks.length; s++) {
    shtml += "<tr><td><span class=blue>" + myLinks[s]._url + "</span></td><td><span class=blue>" + myLinks[s]._name + "</span></td><td><button id=cutlink" + s + ">Delete</button></td></tr>";
  }
  shtml += "</table>";
  mg.innerHTML = shtml;
  for(var s=0; s< myLinks.length; s++) {
    document.getElementById('cutlink' + s).addEventListener("click", function() {
      var id = parseInt(this.id.split('cutlink')[1]);
      myLinks.splice(id,1);
      showLinks();
    }, false);
  }
}

function createlinkalert() {
  if(document.getElementById("linkalertDiv")) return;
  mObj = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
  mObj.id = "linkalertDiv";
	mObj.style.height = document.documentElement.scrollHeight + "px";
  linkalertObj = mObj.appendChild(document.createElement("div"));
  linkalertObj.id = "linkalertBox";
  linkalertObj.style.left = (document.documentElement.scrollWidth - linkalertObj.offsetWidth)/2 + "px";
  h1 = linkalertObj.appendChild(document.createElement("h1"));
  h1.appendChild(document.createTextNode("PERSONAL LINKS SETUP"));
  msg = linkalertObj.appendChild(document.createElement("p"));
  msg.id = "message";
  myLinks = eval(GM_getValue('links'));
  if(typeof(myLinks) == "undefined") {
    myLinks = new Array();
  }
  showLinks();
  btn = linkalertObj.appendChild(document.createElement("a"));
  btn.id = "applyBtn";
  btn.appendChild(document.createTextNode("APPLY"));
  btn.href = "javascript:void(0);";
  btn.addEventListener("click" , function () {
    GM_setValue("links", uneval(myLinks));
    removelinkalert();
    showMenu();
  }, true);
  btn = linkalertObj.appendChild(document.createElement("a"));
  btn.id = "cancelBtn";
  btn.appendChild(document.createTextNode("CANCEL"));
  btn.href = "javascript:void(0);";
  btn.addEventListener("click" , function () {
    myLinks = eval(GM_getValue('links'));
    if(typeof(myLinks) == "undefined") {
     myLinks = new Array();
    }
    removelinkalert();
  }, false);
  document.getElementById('addlink').addEventListener("click" , function () {
    newObj = new Link(document.getElementById('newlink').value, document.getElementById('newname').value);
    myLinks.push(newObj);
    showLinks();
  }, false);
}

function removelinkalert() {
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("linkalertDiv"));
}

function showMenu() {
var dv = document.getElementById('links');
var us = dv.getElementsByTagName('ul');
for(var u=1; u< us.length; u++) {
  dv.removeChild(us[u]);
}
for(var s=0; s< myLinks.length; s++) {
ul = document.createElement ('ul');
ul.style.borderWidth = "1px 1px 0px";
ul.style.width = "151px";
ul.innerHTML = "<li><a href=\"" + myLinks[s]._url + "\"><b>" + myLinks[s]._name + "</b></a></li>";
dv.appendChild(ul);
}
}

var leftBar = document.getElementById("leftColumn");
if(leftBar) {
var ul = leftBar.getElementsByTagName("ul");
if (ul[0]) {
GM_addStyle("#linkalertDiv {background-color:transparent;position:absolute;width:100%;height:100%;top:0px;left:0px;z-index:10000;}");
GM_addStyle("#linkalertBox {position:relative;min-width:800px;min-height:100px;margin-top:50px;border:2px solid #000;background-color:#F2F5F6;}");
GM_addStyle("#linkalertDiv > #linkalertBox {position:fixed;}");
GM_addStyle("#linkalertBox h1 {margin:0;font:bold 0.9em verdana,arial;background-color:#cdc;color:#000;border-bottom:1px solid #000;padding:2px 0 2px 5px;}");
GM_addStyle("#linkalertBox p {font:0.7em verdana,arial;padding-left:5px;margin-left:55px;}");
GM_addStyle("#linkalertBox a {display:inline;position:relative;border:1px solid #000;width:100px;font: verdana,arial;text-transform:uppercase;color:#000;background-color:#cdc;text-decoration:none;}");
GM_addStyle("#linkalertBox a:hover,#linkalertBox #applyBtn:hover,#linkalertBox #cancelBtn:hover {background-color:#889988;;color:#fff}");
GM_addStyle("#linkalertBox #applyBtn {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;}");
GM_addStyle("#linkalertBox #cancelBtn {display:block;position:relative;margin:5px auto;padding:3px;border:2px solid #000;width:70px;font:0.7em verdana,arial;text-transform:uppercase;text-align:center;color:#000;background-color:#cdc;text-decoration:none;}");
GM_addStyle(".blue {color:blue;font-weight:bold} #linkalertDiv input {cursor:text} #linkalertDiv table tr td{text-align:center}");
  var gmMenu = document.createElement('div');
  gmMenu.id="links";
  var html = "<h3><b>Personal Links</b></h3>";
  gmMenu.innerHTML = html;
  ul[0].parentNode.appendChild(gmMenu);
  myLinks = eval(GM_getValue('links'));
  if(typeof(myLinks) == "undefined") {
    myLinks = new Array();
  }
  ul = document.createElement ('ul');
  ul.style.borderWidth = "1px 1px 0px";
  ul.style.width = "151px";
  ul.innerHTML += "<li><a href=\"javascript:void(0);\" id=plink>Set Up</a></li>";
  gmMenu.appendChild(ul);
  document.getElementById('plink').addEventListener("click" , function () {
    createlinkalert();
  }, false);
  showMenu();
}
}

