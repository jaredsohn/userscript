// ==UserScript==
// @name           Password UnMasker
// @namespace      http://userscripts.org/users/8951
// @description    Provides a checkbox to UnMask password fields.
// @include        *
// ==/UserScript==

unsafeWindow.GM_ie_mask = function(oldObject, nType) { //Used in GM_toggleMask()
  var newObject = document.createElement('input');
  newObject.type = nType;
  if(oldObject.size) newObject.size = oldObject.size;
  if(oldObject.value) newObject.value = oldObject.value;
  if(oldObject.name) newObject.name = oldObject.name;
  if(oldObject.id) newObject.id = oldObject.id;
  if(oldObject.className) newObject.className = oldObject.className;
  oldObject.parentNode.replaceChild(newObject,oldObject);
  return newObject;
}
unsafeWindow.GM_toggleMask = function(chk, pass){
	var pBox = document.getElementById(pass);
	var pType = pBox.type;
	if (chk.checked){
		if (navigator.appName=="Microsoft Internet Explorer"){
			GM_ie_mask(pBox, "text");
		} else {
			pBox.type="text";
		}
	} else {
		if (navigator.appName=="Microsoft Internet Explorer"){
			GM_ie_mask(pBox, "password");
		} else {
			pBox.type="password";
		}
	}
}

function addCheckbox(par){
	var holster = document.createElement('div');
//	var holster.setAttribute("style", "display:inline-block;");
	var txt = document.createTextNode("Unmask");	
	var chk = document.createElement('input');
	chk.type = 'checkbox';
	chk.style.width = "auto";
	chk.style.height = "auto";
	chk.setAttribute('onclick', "GM_toggleMask(this, '"+par+"');");
	holster.appendChild(chk);
	holster.appendChild(txt);
	var sib = document.getElementById(par);
	sib.parentNode.insertBefore(holster,sib.nextSibling);
}

function genID(){
	var doh = true;
	var newID = "";
	var allTags = document.body.getElementsByTagName('*');
	var ids = [];
	for (var tg = 0; tg< allTags.length; tg++){
		var tag = allTags[tg];
		if (tag.id){ ids.push(tag.id); }
	}
	while (doh==true) {
		for (i=0;i<=6;i++){
			newID = newID + String.fromCharCode(64+Math.floor(Math.random()*27));
		}
		doh = false;
		for (var i in ids){
			if (newID==i){
				doh = true;
			}
		}
	}
	return newID;
}

function scanInputs(){
	for (var i in document.forms){
		for (var e in document.forms[i].elements) {
			if (document.forms[i].elements[e].type=="password"){
				if (document.forms[i].elements[e].id==""){
					document.forms[i].elements[e].id=genID();
				}
				addCheckbox(document.forms[i].elements[e].id);
			}
		}
	}
}

scanInputs();