// ==UserScript==
// @name           LiQ Kastennotizblock
// @namespace      Lycos iQ
// @description    Aendert die SuFu zu einem frei editierbaren Textfeld! by Lukas93
// @include        http://iq.lycos.de/*
// @include        http://www.iq.lycos.de/*
// @include        http://*cosmiq.de/*
// ==/UserScript==

function switchView(){
	document.getElementById('stickyNoteDiv').style.display="none";
	document.getElementById('stickyNoteEdit').style.display="none";
	document.getElementById('stickyNoteText').style.display="block";
	document.getElementById('stickyNoteSave').style.display="block";
}

function saveSticky(){
	if(!(document.getElementById('stickyNoteText').value) || document.getElementById('stickyNoteText').value==""){
		stickyNote="Keine Notizen";
	}else{
		stickyNote=encodeURIComponent(document.getElementById('stickyNoteText').value);
	}
	console.info(stickyNote);
	GM_setValue('sticky',stickyNote);
	init();
}

function init(){
	document.getElementById('searchBox').innerHTML=' <form><fieldset>	<div id="stickyNoteDiv" style="display:block;">'+decodeURIComponent(GM_getValue('sticky','Keine Notizen').replace(/%0A/g, "%3Cbr%20%2F%3E"))+'</div> 	<textarea id="stickyNoteText" style="min-width: 580px; display: none; margin-top: 5px; margin-left: 1px;" rows="7" >'+decodeURIComponent(GM_getValue('sticky'))+'</textarea><br /><input type="button" id="stickyNoteEdit" value="Editieren" style="display:block;" /> 	<input type="button" id="stickyNoteSave" value="Akzeptieren" style="display:none;" /> </fieldset></form>	';
	document.getElementById('stickyNoteEdit').addEventListener('click',switchView,false);
	document.getElementById('stickyNoteSave').addEventListener('click',saveSticky,false);
}

init();