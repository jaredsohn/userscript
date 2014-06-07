
// Better VSD
// version 0.3
// 2009-03-18
// Last Updated 2009-03-26
// Copyright (c) 2009, WizarKID, http://xch.name/
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better VSD
// @description   Better VSD for netease work system.
// @include       https://work.ws.netease.com/*
// @exclude       https://work.ws.netease.com/login.jsp
// @exclude       https://work.ws.netease.com/*/*upload*
// @exclude       https://work.ws.netease.com/*all*
// @exclude       https://work.ws.netease.com/*/*all*
// @exclude       https://work.ws.netease.com/*user*
// @exclude       https://work.ws.netease.com/*/*comments*
// ==/UserScript==


// Function to add styles
if(!window.addGlobalStyle){
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}

// The actual styles
addGlobalStyle(
'.show {display:block; }' + 
'.hide {display:none; }' + 
'#vsdBox {background:#fff; width:100%; margin:0 auto; min-width:726px;  }' + 
'#vsdContent { overflow:hidden; padding:10px 15px 10px 0; position:relative; margin-bottom:30px; min-height:80px; font-family: Arial, Helvetica, sans-serif; }' +
'#vsdHeader { height: 22px; background: #EFEFF2; font-weight: bold; font-size: 14px; text-align: left; padding: 6px 0 0 20px; cursor: pointer; border-bottom:1px solid #ccc; font-family: Arial, Helvetica, sans-serif;}' +
'#vsdList {min-width:550px; padding:0 0 0 20px; }' +
'#vsdList li{padding-left:20px; list-style:none; line-height:25px;}' +
'#vsdList li.ok{ background:url(https://work.ws.netease.com/img/ok.gif) left no-repeat;}' +
'#vsdList li:hover,#vsdList li.ok:hover{background-color:#f6fbfd;}' +
'#inputarea {position:absolute; top:0; right:0; border-left:2px solid #EAEAEA; padding:10px 0 0 10px; width:170px; height:100%; background:#fafafa; font-size:11.4px; font-family: Arial, Helvetica, sans-serif;}' +
'#inputarea #vsdNewId { font-size:10px; font-family: Arial, Helvetica, sans-serif; color:#bbb; width:120px;}' +
'#inputarea .add { background:url(http://img1.cache.netease.com/cnews/img/bettervsd0401/add.png) no-repeat 0 center; width:16px; height:16px; text-indent:-9999px; display:inline-block;}' +
'#inputarea .okState {position:absolute; bottom:10px; font-size:10px;}' +
'#inputarea .okState a{ padding:0; color:#666; font-weight:bold;}' +
'#inputarea .okState a:hover{color:#f30;}' +
'#inputarea .okState a b, #inputarea .okState a:hover b{ font-weight:normal; color:#666;}' +
'#vsdList li a.remove{background: url(http://img1.cache.netease.com/cnews/img/bettervsd0401/close1.png) no-repeat 0 center; width:12px; height:25px; text-indent:-9999px; display:inline-block; } ' +
'#vsdList li a.remove:hover{background-image:url(http://img1.cache.netease.com/cnews/img/bettervsd0401/close2.png)}'
);



// If the list does not exist make it with value 0
if(!GM_getValue("vsdList")){
	GM_setValue("vsdList", "0");
}
if(!GM_getValue("vsdOkHidden")){
	GM_setValue("vsdOkHidden", "0");
}
if(!GM_getValue("vsdListHidden")){
	GM_setValue("vsdListHidden", "0");
}

var vsdList = GM_getValue("vsdList");
var vsdListHidden = GM_getValue("vsdListHidden");
// Add New Task ID
unsafeWindow.vsdAddId = function(){
	
	var vsdNewId = document.getElementById("vsdNewId");	
	
	if(vsdNewId.value == "" || vsdNewId.value == vsdNewId.defaultValue ){
		return alert("Please Enter a ID Name");
	}
	
	var tds=document.getElementsByTagName('td');
	var legalValue=false;
	for (var i=0;i<tds.length;i++){
	
		if (tds[i].childNodes[0] && tds[i].childNodes[0].nodeValue && tds[i].childNodes[0].nodeValue.replace(/[\s]/g,'') ==vsdNewId.value) {	
		legalValue=true;	
		break;	
		}
	}
	
	if (!legalValue) return alert("ID Name Not Found ");
	
	if (!repeatId(vsdNewId.value)){
	
	var vsdNewIdContent = '';
	
	if(vsdList == "0"){
		vsdNewIdContent = vsdNewId.value +  ';';
	}
	else{
		vsdNewIdContent = vsdList + vsdNewId.value +  ';';
	}
	
	window.setTimeout(GM_setValue, 0, "vsdList", vsdNewIdContent);
	
	return window.location.reload();
	
	}
	return;
};

// Delete Task ID
unsafeWindow.vsdDeleteId = function(IdName){
	
	var vsdConfirm = confirm("Are You Sure You Want to Delete the ID " + IdName + "?");
	
	if(vsdConfirm == 1){
	
		var vsdNewIdContent = '';
		
		vsdFiler = IdName + ';';
		vsdNewIdContent = vsdList.replace(vsdFiler, '');
		
		if(vsdList == ""){
			vsdList = "0";
		}
		
		window.setTimeout(GM_setValue, 0, "vsdList", vsdNewIdContent);
		
		return window.location.reload();
	
	}

	return;
};	
	
// Check repeat IDs
function repeatId(idName){
var CurrentVsdList = "";
	CurrentVsdList = vsdList.slice(0, -1);	
	CurrentVsdList = CurrentVsdList.split(';');
	for (var i=0;i<CurrentVsdList.length;i++){
	   if(CurrentVsdList[i]==idName) {alert('ID ' + idName + ' is Already in the Hidden List!'); return true;}
	}
	return false;
}
// Hide the ID blocks in the list
function hideIdBlocks(idArray){
	
var tds=document.getElementsByTagName('td');
for (var i=0;i<tds.length;i++){
for(var j=0;j<idArray.length;j++){
var vsdNewId =idArray[j] + ' ';
if (tds[i].childNodes[0] && tds[i].childNodes[0].nodeValue==vsdNewId){
tds[i].parentNode.style.display="none";

}}}
}
// if it is OK ID
function isOkId(idName){

var completeImg='https://work.ws.netease.com/img/ok.gif';
var imgs=document.getElementsByTagName('img');
var idName=idName+' ';
for (var i=0;i<imgs.length;i++){
if (imgs[i].src && imgs[i].src==completeImg){
if (!imgs[i].parentNode.parentNode.lastChild.previousSibling.childNodes[1]){
if (imgs[i].parentNode.parentNode.childNodes[1].childNodes[0].nodeValue==idName) return true;
}}
}
return false;
}

// find the txt value
var finded=false, txtValue='';
function findText(node){
if(!finded){
	for ( var i=0; i<node.childNodes.length; i++){	
	if(node.childNodes[i].nodeType==3){	
	var clear= node.childNodes[i].nodeValue.replace(/[\s]/g,'');	
	if ( clear.length>0 ) {txtValue=clear; finded=true;}
	}
	else findText(node.childNodes[i]);
	}
}
}


//Toggle the Hidden List

unsafeWindow.vsdToggleHiddenList = function(){
if (vsdListHidden == "1") {
window.setTimeout(GM_setValue, 0, "vsdListHidden", "0");
return window.location.reload();
}else {
window.setTimeout(GM_setValue, 0, "vsdListHidden", "1");
return window.location.reload();
}
}


// hide the OK IDs
unsafeWindow.vsdHideOkIds = function(){
var completeImg='https://work.ws.netease.com/img/ok.gif';
var imgs=document.getElementsByTagName('img');
var vsdNewIdContent='';	
if(vsdList == "0"){
		vsdNewIdContent = '';		
}else{
		vsdNewIdContent = vsdList;
}
for (var i=0;i<imgs.length;i++){
if (imgs[i].src && imgs[i].src==completeImg){
if(!imgs[i].parentNode.parentNode.lastChild.previousSibling.childNodes[1]){
vsdOkId = imgs[i].parentNode.parentNode.childNodes[1].childNodes[0].nodeValue;
vsdOkId = vsdOkId.slice(0, -1);
if(!repeatId(vsdOkId)) vsdNewIdContent = vsdNewIdContent + vsdOkId + ';';	
}}
}
window.setTimeout(GM_setValue, 0, "vsdList", vsdNewIdContent);
window.setTimeout(GM_setValue, 0, "vsdOkHidden", "1");
return window.location.reload();
};

//display the OK IDs
unsafeWindow.vsdShowOkIds= function(){

	var CurrentVsdList = '';
	var okIdList = new Array();
	CurrentVsdList = vsdList.slice(0, -1);	
	CurrentVsdList = CurrentVsdList.split(';');		

for(var j=0;j<CurrentVsdList.length;j++){
if ( isOkId(CurrentVsdList[j]) ) {okIdList.push(CurrentVsdList[j]);}
}

var vsdFiler, vsdNewIdContent=vsdList;
for(var j=0;j<okIdList.length;j++){
	vsdFiler= okIdList[j] + ';';
	vsdNewIdContent = vsdNewIdContent.replace(vsdFiler, '');
}		
		if(vsdList == ""){
			vsdList = "0";
		}
	
		window.setTimeout(GM_setValue, 0, "vsdList", vsdNewIdContent);
		window.setTimeout(GM_setValue, 0, "vsdOkHidden", "0");
		return window.location.reload();


};

// hide the last two tables
var allTables, thisTable;
allTables = document.evaluate(
	"//table[@width='750']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allTables.snapshotLength; i++) {
	thisTable = allTables.snapshotItem(i);
	thisTable.style.display="none";
}
allTables = document.evaluate(
	"//table[@style]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allTables.snapshotLength; i++) {
	thisTable = allTables.snapshotItem(i);
	thisTable.style.border="none";
}

// build the VSDlist in HTML
var vsdHTML = '';
if(vsdList == "0"){
	
	vsdHTML += '<center>No Hidden Tasks.</center>';

}
else{
	var CurrentVsdList = '', link;
	var titleList =new Array()
	var linkList=new Array();
	CurrentVsdList = vsdList.slice(0, -1);	
	CurrentVsdList = CurrentVsdList.split(';');	
	CurrentVsdList.sort();
	var tds=document.getElementsByTagName('td');
for (var i=0;i<tds.length;i++){
for(var j=0;j<CurrentVsdList.length;j++){
var vsdNewId =CurrentVsdList[j] + ' ';
if (tds[i].childNodes[0] && tds[i].childNodes[0].nodeValue==vsdNewId){
link=tds[i].parentNode.childNodes[3].childNodes[1].href;
linkList.unshift(link);
finded=false;
findText(tds[i].parentNode.childNodes[3]);
titleList.unshift(txtValue);
}}}
	
	hideIdBlocks(CurrentVsdList);	
	
	// Build HTML
	var vsdId = '', okClass = '';	
	vsdHTML += '<ul id="vsdList">';
	
	for(i=0;i<CurrentVsdList.length;i++){
		
		vsdId = CurrentVsdList[i];			
		if ( isOkId(vsdId) ) okClass = ' class="ok" ';
		else okClass='';
		vsdHTML += '<li' + okClass+ '><span>[' + vsdId + ']</span> ' + '<a href="' + linkList[i] + '">'+titleList[i]+'</a>'+ ' <a class="remove" title="Remove" href="javascript:vsdDeleteId(\'' + vsdId + '\');">Remove</a></li>';
		
	}
	
	vsdHTML += '</ul>';
}

// Add the HTML for the adding IDs part
var vsdOkHidden = GM_getValue("vsdOkHidden");
var okHiddenButton="";
if(vsdOkHidden==0) okHiddenButton='<p class="okState"><a title="Click Here to Hide the Completed Tasks" href="javascript:void(0);" onclick="javascript:vsdHideOkIds();" class="button"><b>Completed Tasks State:</b> Showed</a></p>'
else okHiddenButton='<p class="okState"><a title="Click Here to Show the Completed Tasks" href="javascript:void(0);" onclick="javascript:vsdShowOkIds();" class="button"><b>Completed Tasks State:</b> Hidden</a></p>'

vsdHTML += '<div id="inputarea"><p><input type="text" name="vsdNewId" id="vsdNewId" value="Input ID Name" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /> <a title="Add New ID" href="javascript:void(0);" onclick="javascript:vsdAddId();" class="add button">Add</a></p>' + okHiddenButton + '</div>';

// place it in the position
var body, newElement;
body = document.getElementsByTagName("body")[0];
if (body) {
    newElement = document.createElement('div');
	newElement.setAttribute('id', 'vsdBox');
    body.appendChild(newElement);
}

// finally put layout + HTML in it all together, we're done :)
var classname;
if (vsdListHidden == "1") classname='hide'; else classname='show';
document.getElementById("vsdBox").innerHTML = '<div id="vsdButtonArea"><div id="vsdHeader" onclick="javascript:vsdToggleHiddenList()" >Hidden Tasks List</div></div><div id="vsdContent" class="' + classname + '">' + vsdHTML + '</div>';





