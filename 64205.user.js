// ==UserScript==
// @name           Zend
// @namespace      zend
// @description    Makes zend documentation more space efficient
// @include        http://framework.zend.com/manual/*
// ==/UserScript==


var body = document.getElementsByTagName('body')[0];

var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';

var stylesString = '' +
'body{background:white;}' +
'.content, .left-side {width:100% !important;margin:0;}' + 
'.content-in{padding:0 !important;}' + 
'.sub-nav, .sub-page-main-header-programmers-reference-guide, .dotted-line, #top, .navheader, #footer, .comment-form, .comment-form *, #manual-container>table{display:none}' + 
'.right-nav{float:none;height:0;width:0}' + 
'.right-nav .block {display:none;margin:0;}' + 
'.right-nav .block-in {padding:2px;}' +
'.right-nav .block:nth-child(3){display:block;}' + 
'.right-nav .block:nth-child(3) {height:100%;position:fixed;top:0;left:0;width:210px;z-index:300;margin:0;overflow:auto;}' + 
'.right-nav .block:nth-child(3) .block-in {padding:0;height:100%;}' + 
'.right-nav .block:nth-child(3)  h2 {display:none;}' + 
'.right-nav .block:nth-child(3)  li {display:inline-block;text-indent:-40px; overflow:hidden;margin:0 3px 0 0;width:30%;padding:0;}' + 
'.right-nav .block:nth-child(3)  li:hover {overflow:show;background:white;position:relative;z-index:1000;}' + 
'.right-nav .block:nth-child(3)  li  a:visited {color: black}' + 
 ' #manual-container {margin:10px 10px 0 400px;}' + 
 '#manual-container .info strong {display:none;}' +
 '.backButton {display:block;position:fixed;top:20px;left:230px;width:auto;z-index:200;padding:4px;margin:0;background:pink;-moz-border-radius:10px;}' + 
 '#manual-container  h2{font-size:1.3em;clear:right;}' + 
 '#manual-container  h3 {padding-top:6px;clear:right;font-size:1.1em;}' + 
 'pre.programlisting {padding:5px;font-size:1.1em;line-height:1.1em;}' + 
'pre.programlisting  code {margin:0;padding:0;}' +
'';

var styles = document.createTextNode(stylesString);
cssNode.appendChild(styles);
document.getElementsByTagName("head")[0].appendChild(cssNode);


var moduleList = document.createElement('ul');
var moduleSelect = document.getElementsByClassName('manual-component-sctr')[0];
var moduleDIV = moduleSelect.parentNode;
var modules = moduleSelect.childNodes;
modules = removeTextNodes(modules);
var moduleLI, moduleA;
for(var i=0, il=modules.length;i<il;i++) {
	
	moduleLI = document.createElement('li');
	moduleA = document.createElement('a');
	moduleA.setAttribute('href', modules[i].getAttribute('value'));
	moduleA.innerHTML = modules[i].innerHTML;
	moduleLI.appendChild(moduleA);
	moduleList.appendChild(moduleLI);
}
moduleDIV.removeChild(moduleSelect);
moduleDIV.appendChild(moduleList);

var backButton = document.createElement('A');
backButton.innerHTML = 'Back to contents page';
backButton.setAttribute('class','backButton');
backButton.setAttribute('href','javascript:history.go(-1)');
body.appendChild(backButton);


function removeTextNodes(list) {
list = Array.prototype.slice.apply(list);
for(var i=0, il=list.length;i<il;i++)
{
if(list[i].nodeType == 3)
{
list.splice(i,1);
i--;
il--;
}
}
return list;
}