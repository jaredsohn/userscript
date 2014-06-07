// ==UserScript==
// @name           LUEbook
// @namespace      LUE_Book
// @author	   bluekirby
// @description    Keep notes of individual users on LueLinks.
// @include        *endoftheinter.net*
// ==/UserScript==

var tops = document.getElementsByClassName('message-top');
var userID;
var regEx = /\d+/i;

for(var i=0; i<tops.length; i++)
{
	var top = tops[i];
	var notebook = document.createElement('a');
	notebook.className='notebook';
	top.innerHTML+=" | ";
	var tempID = regEx.exec(top.getElementsByTagName('a')[0].href);
	var isNote="";
	if(GM_getValue(tempID)!=null&&GM_getValue(tempID)!="")
	{
		isNote="*";
	}
	notebook.innerHTML="<u>Notes</u>"+isNote;
	notebook.addEventListener('click', openNote, true);
	notebook.style.cursor="pointer";
	top.appendChild(notebook);
}

function openNote()
{
	userID = regEx.exec(this.parentNode.getElementsByTagName('a')[0].href);

	if(this.parentNode.getElementsByClassName("Page").length>0)
	{
		GM_setValue(userID,this.parentNode.lastChild.value);
		this.parentNode.removeChild(this.parentNode.lastChild);
		if(GM_getValue(userID)=="")
		{
			GM_deleteValue(userID);
		}
	} 
	else
	{
		var note = GM_getValue(userID,"");
		page = document.createElement('textarea');
		page.className='Page';
		page.value=note;
		page.style.width="100%";
		page.addEventListener('change', noteChange, true);
		this.parentNode.appendChild(page);
	}	
}

function noteChange()
{
	GM_setValue(userID,this.value);
}