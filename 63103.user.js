// ==UserScript==
// @name           AutoGo
// @namespace      dohgame
// @include        http://www.domainofheroes.com/Game.aspx
// ==/UserScript==
var imgAutoGo;
var txtSel; // text selected
function getId(id, parent){
	if(!parent){
		return document.getElementById(id);
	}
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent){
		return document.getElementsByTagName(name);
	}
	return parent.getElementsByTagName(name);
}
var body = getTag('body')[0];
function clickedInsideID(target, id) {
	if (target.getAttribute('id')==id) {
		return getId(id);
	}
	if (target.parentNode) {
		target = target.parentNode;
		try{
			if (target.getAttribute('id')==id){
				return getId(id);
			}
		}catch(e){
		
		}
	}
	return null;
}
function mousedownCleaning(evt){
	var divAutoGo = getId('divAutoGo');
	if(divAutoGo){
		if(!clickedInsideID(evt.target,'divAutoGo')){
			divAutoGo.parentNode.removeChild(divAutoGo);
		}
	}
}
function AutoGo(evt){
	var divAutoGo = getId('divAutoGo');
	var top = divAutoGo.style.top;
	var left = divAutoGo.style.left;
	//no text selected
	if(!txtSel || txtSel=="")
	{
		divAutoGo.parentNode.removeChild(divAutoGo);
		return;
	}	
	divAutoGo.parentNode.removeChild(divAutoGo);
	document.getElementById('txtChatMainInput').value = '/goto '+txtSel;
	unsafeWindow.ChatSend('Main');
}
function getSelection(){
	var txt = null;
	//get selected text
	if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	return txt;
}
function createElement(type, attrArray, evtListener, html){
	var node = document.createElement(type);

	for (var attr in attrArray) {
		if (attrArray.hasOwnProperty(attr)){
			node.setAttribute(attr, attrArray[attr]);
		}
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) {
		node.innerHTML = html;
	}
	
	return node;
}
function showAutoGoIcon(evt){
	
	var divAutoGo = getId('divAutoGo');
	txtSel = getSelection();
	
	//exit if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divAutoGo) {
			divAutoGo.parentNode.removeChild(divAutoGo);
		}
		return;
	}
	//possible cleanup
	if(divAutoGo)
	{
		if(!clickedInsideID(evt.target,'divAutoGo')) {
			divAutoGo.parentNode.removeChild(divAutoGo);
		}
		return;
	}
	//div container
	divAutoGo = createElement('div', {id:'divAutoGo', style:'background-color:#FFFF77; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:3px; z-index:10000; -moz-border-radius:3px;'});
	divAutoGo.appendChild(imgAutoGo.cloneNode(false));
	divAutoGo.addEventListener('click', AutoGo, false);
	body.appendChild(divAutoGo);	
}

function AutoGo(evt){
	var divAutoGo = getId('divAutoGo');
	var top = divAutoGo.style.top;
	var left = divAutoGo.style.left;
	//no text selected
	if(!txtSel || txtSel=="")
	{
		divAutoGo.parentNode.removeChild(divAutoGo);
		return;
	}	
	divAutoGo.parentNode.removeChild(divAutoGo);
	document.getElementById('txtChatMainInput').value = '/goto '+txtSel;
	unsafeWindow.ChatSend('Main');
}

function getSelection(){
	var txt = null;
	//get selected text
	if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	return txt;
}

function createElement(type, attrArray, evtListener, html){
	var node = document.createElement(type);

	for (var attr in attrArray) {
		if (attrArray.hasOwnProperty(attr)){
			node.setAttribute(attr, attrArray[attr]);
		}
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) {
		node.innerHTML = html;
	}
	
	return node;
}

/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */

var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;								//set to true when we do a drag
	
	
function moveHandler(e){
	if (e === null) {
		return;// { e = window.event }
	}
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;

	dragOK=false; //its been dragged now
	didDrag=true;
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e === null) {
		return;//{ e = window.event;}  // htype='move';}
	}
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV'){
		return;
	}
}

//end drag code


/*
 * Images
 */
function images()
{
	imgAutoGo = createElement('img',{border:0});
	imgAutoGo.src = 'data:image/gif;base64,R0lGODlhEgASAOZqAP/////nEf/VDP+qAP/LCf+8Bf+vAv/GCP/aDf/lEHWQOP/QC//hD/+zA//iEP+4BP/QCv/eD//BBv/iD//kEP+tAf/LCv/GB//dD//ZDuWtBf/eDv/mEeWpBIqbLv+sAP+sAf+3A/+wAf+wAv/ZDf/fD/+0Av+vAf/dDv+zAuWkBP/gD//aDv/BB+WlA9XWJ9XUJs7TLOWkA8/UK4qbL9/aI3WQN/TfEu/bE/+2BPnlFOfdHv/lEf/jEPDhGbbJOv+6BP/fDv/AB26INHeSOOjVE9DJHf/WDOWtBombL4inQf+uAeWhAnyYO/+tAHuYO4OWMP/VC6CfHLOtGfzmE5etNtHEFv+4A4mbLo2fL/+0A+WiAsjLKbDDOcjRL77NNYeoQGmAMv+uAIioQYyRIP++BuWhA/fkFeWqBP/kEf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGoALAAAAAASABIAAAf/gGpqXj4BhoeHZzOCgi8cFAmRPGmRCRQUHDCCXxwODBOeoKAMnxMUXGo7JREbGBsbERgYESixEUEBalQZGQgZLCQkvgjECMAJVQECywIAywDOzFECFFkBENgQ0AvaAAvf3z0eAQQWBOfQFhbQ5+YO4wcXB/MH0PHQ8hcMWAESEkItJEBDogGaBg0BV4wrwLAAtA4dHqJpWCJJgBAPMgKQoQKaCxUYrzwoQUNHjgYNtKRggtLMFpQpTJhYAaWGBAMGRuQUgVPECQM/QxQh8gOFiAofPoCosBTEBycVxByRAkZNDAZlRgzYynXAEiAIpoRh1MUIDkSHblghM4QRozFNCxTItSFXwRMljAIBADs=';
}
images();
document.getElementById('tabQuests').addEventListener('mouseup', showAutoGoIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);