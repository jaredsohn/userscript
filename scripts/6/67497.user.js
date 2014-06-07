// ==UserScript==
// @name           Import Changelog & Todo in Userscript description metadata field
// @namespace      userscripts.org
// @include        http://userscripts.org/scripts/edit/*
// @description		This script extracts the changelog from the source code of the script. And adds it on request to the description field when editing metadata
// @copyright	      2009+, Futuros
// @license 	      Creative Commons Attribution-Share Alike 3.0 Netherlands License; http://creativecommons.org/licenses/by-nc-sa/3.0/nl/
// @version         1.1.0
// @date	      2010-05-11
// ==/UserScript==

/* Changelog:
1.1.0 (2010.05.11)
	- Added functionality to load todo list.
1.0.0 (2010.01.29)
	- First public release
*/
/* Todo:
Add undo function
*/
/*
	Got some ideas? Leave a comment!!
*/
l = function(t){console.log(t);}
GM_addStyle('/* Inserted By Greasemonkey userscript (Import Changelog & Todo in Userscript description metadata field): */'
	+'.pbox {background-color:#FC9822; position:absolute; height:30px;text-align:center;}'
	+'.pbox_hidden {display:none; height: 0px;}'
	+'.pbox .text {width:100%;height:15px;margin:0;padding:0;}'
	+'.pbox span {margin-top:-5px;color:white;padding:0;width:50%;float:left;display:block;}'
);
var promptBox;
var txtArea;
init = function(){
	txtArea = document.getElementById('script_description_extended');
	promptBox = document.createElement('div');
	promptBox.className = 'pbox_hidden';
	pos = findPos(txtArea);
	promptBox.style.left = (pos[0]+1)+'px';
	promptBox.style.top = (pos[1]+1)+'px';
	promptBox.style.width = (txtArea.offsetWidth-3)+'px';
	document.body.appendChild(promptBox);
	text = document.createElement('div');
	text.innerHTML = 'Mouseover this bar to load the text from the source code';
	promptBox.appendChild(text);
	cl = document.createElement('span');
	cl.innerHTML = '[changelog]';
	promptBox.appendChild(cl);
	td = document.createElement('span');
	td.innerHTML = '[todo]';
	promptBox.appendChild(td);
	txtArea.addEventListener('select', selectionHandler, false);
	txtArea.addEventListener('click', selectionHandler, false);
	txtArea.addEventListener('keypress', selectionHandler, false);
};

selectionHandler = function(ev){
	if(txtArea.selectionStart<txtArea.selectionEnd){
		promptBox.className = 'pbox';
		promptBox.addEventListener('mouseover', requestText, false);
	} else {
		promptBox.className = 'hidden_pbox';
		promptBox.removeEventListener('mouseover', requestText, false);	
	}
}

findPos = function(obj){
	if(!obj)return [0,0];
	pObj = findPos(obj.offsetParent);
	return [obj.offsetLeft+pObj[0],obj.offsetTop+pObj[1]];
}

insertAtCaret = function(text) {
	var scrollPos = txtArea.scrollTop;
	var selStart = txtArea.selectionStart;
	var selEnd = txtArea.selectionEnd;
	var front = (txtArea.value).substring(0,selStart);
	var back = (txtArea.value).substring(selEnd,txtArea.value.length);
	txtArea.value=front+text+back;
	txtArea.selectionStart = selStart;
	txtArea.selectionEnd = selStart+text.length;
	txtArea.focus();
	txtArea.scrollTop = scrollPos; 
} 

requestText = function(event){
	type = (event.target.innerHTML.indexOf('todo')!=-1)?'todo':'changelog';
	
	scriptId = window.location.href.match(/edit\/(\d+)$/i)[1];
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
		headers: {'Cache-Control': 'no-cache'},
		onload: function(resp)
		{
			switch(type){
				case 'todo': 
					text = formatTodo(resp.responseText.match(/\/\*\s*Todo\:\s*\n([\s\S]*?)\n\s*\*\//i)[1]); //get Todo comment
				break;
				default:
					text = formatChangelog(resp.responseText.match(/\/\*\s*Changelog\:\s*\n([\s\S]*?)\n\s*\*\//i)[1]); //get changelog comment
			}
			promptBox.className = 'pbox_hidden';
			insertAtCaret(text);
		}
	});
}

formatChangelog = function(string){
	text = "";
	open = false;
	console.log(string);
	console.log(string);
	lines = string.split("\n"); //split lines
	for each(line in lines){
		line = line.replace(/\n|\r|\t/gi,"");
		if((m=line.match(/^\s*-(.*)$/i))){
			text += "\n\t<li>"+m[1]+"</li>";
		} else {
			if(open)text += "</ul>\n";
			text += "<b>"+line.replace(/\s\(/i,"</b> (")+"<ul>";
			open=true;
		}
	}
	return text+"</ul>\n";
}
//implement tab counter
formatTodo = function(string){
	text = "";
	open = false;
	lines = string.split("\n"); //split lines
	for each(line in lines){
		line = line.replace(/\n|\r|\t/gi,""); //tab counter needed
		if((m=line.match(/^-(.*)$/i))){ // if start with -
			text += "\n\t<li>"+m[1]+"</li>";
		} else {
			if(open)text += "</ul>\n";
			text += "<b>"+line+"</b><ul>";
			open=true;
		}
	}
	return text+"</ul>\n";
}

init();