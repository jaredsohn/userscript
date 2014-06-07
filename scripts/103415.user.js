// ==UserScript==
// @name           Rangefinderforum non-evil roomifier
// @namespace      http://userscripts.org/users/lorriman
// @description    makes more space in the forums without removing ads.
// @include        http://www.rangefinderforum.com/forums/showthread*
// @version .2
// ==/UserScript==

//utility functions

var ENABLE_ad_column_relocate=false;


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getById(id){
	return document.getElementById(id);
}

function ifId(id,func){
	if(element=getById(id)){
		return func(element);
	}else{
		return null;
	}	
}

function displayNone(item){
	item.style.display='none';
}

//actual modification code

if(document.location!='http://www.bbc.co.uk/news/'){
	ifId('header',displayNone); 
}

ifId('hdr',displayNone);
//ifId('nav_back',displayNone);
ifId('nav_btm',displayNone);
ifId('nav_shadow',displayNone);
//ifId('collapseobj_vbpblock_81',displayNone);

page_class_top=document.getElementsByClassName('page')[0];
page_class_middle=document.getElementsByClassName('page')[1];
top_panel_div=page_class_top.getElementsByTagName('div')[0];
left_panel_td=page_class_middle.getElementsByTagName('div')[0].parentNode;


tbody=left_panel_td.parentNode.parentNode.parentNode;
tbody.appendChild(tr=document.createElement('tr'));
//next line is causing a problem since RFF seem to have suddenly got rid of their ad column
if(ENABLE_ad_column_relocate){
	tr.appendChild(left_panel_td);
}
parent_div=left_panel_td.getElementsByTagName('div')[0];
parent_div.style.width='100%';




for(i=0;i<parent_div.childNodes.length;i++){
	child=parent_div.childNodes[i];
	if(child.tagName=='DIV'){
		
		att=child.getAttribute('style');
		
		child.setAttribute('style',att+';float:left');
		if(i==2){
			child.style.overflow='auto';
			child.style.height='300px';
		}
	}

}

forms=parent_div.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('FORM');
for(i=0;i<forms.length;i++){

	forms[i].style.display='none';
}

//someToBeParentNode.appendChild(left_panel_td);

top_panel_div.style.display='none';
//left_panel_td.style.display='none';

document.getElementById('collapseobj_forumrules').parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
brs=document.getElementById('collapseobj_forumrules').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('BR');
for(i=0;i<brs.length;i++){
	brs[i].style.display='none';
}

