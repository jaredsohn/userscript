// ==UserScript==
// @name          Funmobile ERP customization
// @namespace     mailto:novemliu@gmail.com
// @description   Remove flash submit button instead of pure html button
// @include        http://192.168.1.236/
// @include        http://192.168.1.236/login.do
// ==/UserScript==

init();
//--------------------------  Global configs  --------------------------
var showAuthor = true;

//--------------------------  Functions  --------------------------

function init(){
	if(document.title == 'Funmobile ERP System'){
		createSubmitBtn();
		createAuthorText();
	}
}

function createSubmitBtn(){
	btnSubmit = document.createElement("input");
    tds = document.getElementsByTagName("td");
    
    tds[tds.length-1].parentNode.removeChild(tds[tds.length-1]);
    tds[tds.length-1].innerHTML = "<br/><input type='submit' value='Login'>";
    tds[tds.length-2].parentNode.removeChild(tds[tds.length-2]);
    
}

function createAuthorText(){
	tables = document.getElementsByTagName('table');
	authorSpan = document.createElement('span');
	authorSpan.innerHTML = 'Enhanced by Man Liu @ funmobile.com';
	authorSpan.setAttribute('style', 'font-size: 11px; font-weight: bold; color: red;');
	
	authorTable = document.createElement('table');
	aTr = document.createElement('tr');
	aTd = document.createElement('td');
	aTd.appendChild(authorSpan);
	aTr.appendChild(aTd);
	authorTable.appendChild(aTr);
	authorTable.setAttribute('align', 'center');
	
	insertAfter(authorTable, tables[tables.length-2]);
}

function insertAfter(newElement, targetElement)
{
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement) 
    {
        parent.appendChild(newElement);
    } 
    else
    {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}