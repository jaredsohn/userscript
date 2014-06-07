// --------------------------------------------------------------------
// 
// This is a Greasemonkey user script. 
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Westlaw Client Manager", and click Uninstall.
// *************************Changed "Hello World" to "Westlaw Client Manager"
// *************************Revised to sort by client name.  To see in sorted order
// *************************after adding, refresh the screen.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Westlaw Client ID Manager Sorted
// @description   Manage Client IDs in Westlaw (with Sort)
// @include       http://westlaw.com/*
// @include       https://westlaw.com/*
// @include       http://web2.westlaw.com/*
// @include       https://web2.westlaw.com/*

// ==/UserScript==

if (document.getElementById('myclientid')) {
	unsafeWindow.clientbox = document.getElementById('myclientid');
}
else if (document.getElementById('clientid')) {
	unsafeWindow.clientbox = document.getElementById('clientid');
};




unsafeWindow.clientbox.addEventListener('click', function() {document.getElementById('list').style.visibility='visible'}, true);
var t=document.createElement('table');
//document.appendChild(t, 10);


unsafeWindow.clientbox.parentNode.appendChild(t);
t.id='list';
with (t.style) {
	position='absolute';
	marginTop='0px';
	marginLeft='0px';
	padding='10px';
	backgroundColor='white';
	//borderWidth='1px';
	//borderColor='lightgray';
	//borderStyle='solid';
	//MozBorderRadius='20';
	fontFamily='Tahoma';
	fontSize='11px';
	borderColor='rgb(224,223,227)';
	borderStyle='inset';
	borderWidth='1px';
}
//appendAttribute("style","position:absolute;top:200;left:400;background-color:white;border:1px blue solid;");

unsafeWindow.addLine = function(tag, code) {
	var r=document.getElementById('list').insertRow(document.getElementById('list').rows.length-1);
	script = 'setClient(\''+code+'\');return false;';
	var c=r.insertCell(0);
	c.innerHTML=<a href="about:blank" onClick={script}>{tag}</a>.toXMLString();
	var c=r.insertCell(1);
	c.innerHTML=<a href="about:blank" onClick={script}>{code}</a>.toXMLString();
	var c=r.insertCell(2);
	c.innerHTML=<a href="about:blank" onClick={'removeClient(\''+code+'\',this);return false;'}>[x]</a>.toXMLString();
}
unsafeWindow.setstring=GM_setValue;

unsafeWindow.setClient = function(code) {
	unsafeWindow.clientbox.value=code;
	unsafeWindow.setstring('lastclientid',code);
}

unsafeWindow.clientbox.value=GM_getValue('lastclientid','');

unsafeWindow.addClient = function() {
	tag=document.getElementById('insert1').value;
	code=document.getElementById('insert2').value;
	if (tag.length > 0 && code.length > 0 && unsafeWindow.clients..client.(@code==code).length()==0) {
		unsafeWindow.addLine(tag, code);
		unsafeWindow.clients.appendChild(<client tag={tag} code={code}/>);
		unsafeWindow.setstring('clientlist', unsafeWindow.clients.toXMLString());
		document.getElementById('insert1').value='';
		document.getElementById('insert2').value='';
		unsafeWindow.setClient(code);
		return false;
	}
}

//**************This function is new.  Not strictly necessary but would allow for 
//easy addition of Sort by Client Code

unsafeWindow.SortByName = function  (aaa, bbb) {
var xxx = aaa.@tag.toString().toLowerCase(); // for case-sensitive sort, delete ".toLowerCase()" from both lines
    var yyy = bbb.@tag.toString().toLowerCase();
   return ((xxx < yyy) ? -1 : ((xxx > yyy) ? 1 : 0));

 }






unsafeWindow.removeClient = function(code,obj) {
	if (unsafeWindow.clients.client.(@code==code).length()>0) {
		document.getElementById('insert1').value=unsafeWindow.clients.client.(@code==code)[0].@tag;
		document.getElementById('insert2').value=unsafeWindow.clients.client.(@code==code)[0].@code;
		unsafeWindow.clients.client.(@code==code)[0]=new XML();
		unsafeWindow.setstring('clientlist', unsafeWindow.clients.toXMLString());
		obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);
	}
	return false;
}

unsafeWindow.clients = new XML(GM_getValue('clientlist', '<clients/>'));

var r=t.insertRow(0);
var c=r.insertCell(0);
c.innerHTML=<input type="text" id="insert1" style="font-family:'Tahoma';font-size:11px;width:100%;"/>.toXMLString();
var c=r.insertCell(1);
c.innerHTML=<input type="text" id="insert2" style="font-family:'Tahoma';font-size:11px;width:100%;"/>.toXMLString();
var c=r.insertCell(2);
c.innerHTML=<a href="about:blank" id="add" onClick="return false;">add</a>.toXMLString();
//*****************array is new, to allow for sorting
var a=new Array();

for each (c in unsafeWindow.clients..client) {
	a.push (c);
}

a.sort(unsafeWindow.SortByName);

//********previously the next line read "for each (c in unsafeWindow.clients..client) {"
for each (c in a) {
	unsafeWindow.addLine(c.@tag.toString(),c.@code.toString());
}
//end of changes
var r=t.insertRow(0);
var c=r.insertCell(0);
c.innerHTML="<b>Name</b>"
var c=r.insertCell(1);
c.innerHTML="<b>ID</b>"
var c=r.insertCell(2);
c.innerHTML=<a href="about:blank" id="hide" onClick="document.getElementById('list').style.visibility='hidden';return false;">[hide]</a>.toXMLString();


document.getElementById('add').addEventListener("click", unsafeWindow.addClient, false);
