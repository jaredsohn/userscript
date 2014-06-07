// ==UserScript==
// @name           Futbolitis, opciones para comentarios
// @namespace      futbolitis
// @description    (spanish) Add-on para los comentarios de la web de Futbolitis.
// @include        http://comunidad.terra.es/blogs/futbolitis/archive/*
// ==/UserScript==

// ***********************************************************
// Panel de control
// ***********************************************************
CP = document.createElement("LI");
// CPPrint: Añade el panel de control al menú.
function CPPrint() {
	CP.innerHTML		= ""
	sidebar 			= document.getElementById("WeblogLinks");	
	CPTitle				= document.createElement("H3");
	CPTitle.innerHTML 	= "Comentarios";	
	sidebar.appendChild(CPTitle);
	
	CP.wrapper 			= document.createElement("UL");
	sidebar.appendChild(CP.wrapper);
	CP.wrapper.appendChild(CP);
	
	// Módulo QuoteComments
	//QCPrint();
	// Módulo QuoteComments
	//PVPrint();
	// Módulo ViewID
	VIPrint();
	// Módulo ReverseOrder	
	ROPrint();
	// Módulo BlackList
	BLPrint();

}
// ***********************************************************
// CProcess: Procesar comentarios
// ***********************************************************
function CProcess() {
	var comments = document.getElementById("comments").childNodes;
	for (var idx=0; idx < comments.length; idx++) {
		var current = comments[idx];
		if (current.tagName == "DIV") {
			//if(GM_getValue("mod_QC") == "true") QCProcess(current);
			//if(GM_getValue("mod_PV") == "true") QCProcess(current);
			if(GM_getValue("mod_VI") == "true") VIProcess(current);
			if(GM_getValue("mod_RO") == "true") ROProcess(current);
			if(GM_getValue("mod_BL") == "true") BLProcess(current);
		}
	}
}
/*
// ***********************************************************
// BL: Módulo QuoteComments 
// ***********************************************************
QC = document.createElement("DIV");
function QCPrint() {	
	QC.innerHTML = "";
	
	// Switcher del módulo.
	QC.switcher			= document.createElement("INPUT");
	QC.switcher.type	= "checkbox";	
	QC.switcher.addEventListener('change', function(evt) {return QCSwitch(evt)}, true); 
	if (GM_getValue("mod_QC") == "true") {
		QC.switcher.checked = true;
	} else {
		QC.switcher.checked = false;
	}
	QC.appendChild(QC.switcher);
	
	// Título del módulo.
	QC.header = document.createElement("SPAN");
	QC.header.appendChild(document.createTextNode("Citar comentarios"));	
	QC.appendChild(QC.header);		
	CP.appendChild(QC);
}
function QCSwitch() {
	if (QC.switcher.checked == true) {		
		GM_setValue("mod_QC","true");
	} else {
		GM_setValue("mod_QC","false");
	}	
}
function QCProcess(CNode) {
	quote = document.createElement("A");
	quote.innerHTML = "(Citar comentario)";
	quote.addEventListener('click', function() {
		textarea = document.getElementsByTagName("TEXTAREA")[0];
		textarea.value += "quote";
	}, true); 
	CNode.getElementsByTagName("DIV")[1].appendChild(quote);
}

// ***********************************************************
// PV: Módulo PreView.
// ***********************************************************
PV = document.createElement("DIV");
function PVPrint() {	
	PV.innerHTML = "";
	
	// Switcher del módulo.
	PV.switcher			= document.createElement("INPUT");
	PV.switcher.type	= "checkbox";	
	PV.switcher.addEventListener('change', function(evt) {return PVSwitch(evt)}, true); 
	if (GM_getValue("mod_PV") == "true") {
		PV.switcher.checked = true;
	} else {
		PV.switcher.checked = false;
	}
	PV.appendChild(PV.switcher);
	
	// Título del módulo.
	PV.header = document.createElement("SPAN");
	PV.header.appendChild(document.createTextNode("Previsualizar comentarios"));	
	PV.appendChild(PV.header);		
	CP.appendChild(PV);
}
function PVSwitch() {
	if (PV.switcher.checked == true) {		
		GM_setValue("mod_PV","true");
	} else {
		GM_setValue("mod_PV","false");
	}	
}
function PVProcess(CNode) {
	
}
*/
// ***********************************************************
// BL: Módulo ViewID
// ***********************************************************
VI = document.createElement("DIV");
function VIPrint() {	
	VI.innerHTML = "";
	
	// Switcher del módulo.
	VI.switcher			= document.createElement("INPUT");
	VI.switcher.type	= "checkbox";	
	VI.switcher.addEventListener('change', function(evt) {return VISwitch(evt)}, true); 
	if (GM_getValue("mod_VI") == "false") {
		VI.switcher.checked = false;
	} else {
		VI.switcher.checked = true;
	}
	VI.appendChild(VI.switcher);
	
	// Título del módulo.
	VI.header = document.createElement("SPAN");
	VI.header.appendChild(document.createTextNode("Mostrar número"));	
	VI.appendChild(VI.header);		
	CP.appendChild(VI);
}
function VISwitch() {
	if (VI.switcher.checked == true) {		
		GM_setValue("mod_VI","true");
	} else {
		GM_setValue("mod_VI","false");
	}	
}
function VIProcess(CNode) {
	commentID = CNode.getElementsByTagName("H4")[0].getElementsByTagName("A")[0].id;	
	commentID = commentID.split("Comments_ctl")[1];
	commentID = commentID.split("_Perma")[0];
	CNode.getElementsByTagName("H4")[0].innerHTML = commentID + " " + CNode.getElementsByTagName("H4")[0].innerHTML;
}

// ***********************************************************
// RO: Módulo ReverseOrdern
// ***********************************************************
RO = document.createElement("DIV");
function ROPrint() {	
	RO.innerHTML = "";
	
	// Switcher del módulo.
	RO.switcher			= document.createElement("INPUT");
	RO.switcher.type	= "checkbox";	
	RO.switcher.addEventListener('change', function(evt) {return ROSwitch(evt)}, true); 
	if (GM_getValue("mod_RO") == "false") {
		RO.switcher.checked = false;
	} else {
		RO.switcher.checked = true;
	}
	RO.appendChild(RO.switcher);
	
	// Título del módulo.
	RO.header = document.createElement("SPAN");
	RO.header.appendChild(document.createTextNode("Invertir orden"));	
	RO.appendChild(RO.header);		
	CP.appendChild(RO);
}
function ROSwitch() {
	if (RO.switcher.checked == true) {		
		GM_setValue("mod_RO","true");
	} else {
		GM_setValue("mod_RO","false");
	}	
}
function ROProcess(CNode) {
	CNode.parentNode.insertBefore(CNode,CNode.parentNode.firstChild);
}

// ***********************************************************
// BL: Módulo BlackList (lista negra)
// ***********************************************************
BL			= document.createElement("DIV");
BLNicks 	= new Array();
BLToSplit 	= "�;_¨·";

//BLRefresh: Actualiza la lista de nicks de la BlackList.
function BLRefresh() {
	BLNicks = GM_getValue("BLNicks").split(BLToSplit);
}
// BLPrint: Añade la configuración de la BlackList al panel de control.
function BLPrint() {	
	BL.innerHTML = "";
	
	// Switcher del módulo.
	BL.switcher			= document.createElement("INPUT");
	BL.switcher.type	= "checkbox";	
	BL.switcher.addEventListener('change', function(evt) {return BLSwitch(evt)}, true); 
	if (GM_getValue("mod_BL") == "false") {
		BL.switcher.checked = false;
	} else {
		BL.switcher.checked = true;
	}
	BL.appendChild(BL.switcher);
	
	// Título del módulo.
	BL.header 			= document.createElement("SPAN");
	BL.header.appendChild(document.createTextNode("Lista negra"));	
	BL.appendChild(BL.header);	
		
	// Añadir nick a la BlackList.
	BL.addNick				= document.createElement("A");
	BL.addNick.style.cursor	= "pointer";
	BL.addNick.innerHTML	= "Añadir nick";
	BL.addNick.addEventListener('click', function() {BLAdd()}, true); 
	BL.header.appendChild(document.createTextNode(" ("));
	BL.header.appendChild(BL.addNick);
	BL.header.appendChild(document.createTextNode(")"));

	// Lista de nicks.		
	BL.nickList			= document.createElement("UL");
	BLPrintNickList();
	BL.appendChild(BL.nickList);
	
	// Se añade el módulo 
	CP.appendChild(BL);
}
function BLPrintNickList() {
	BL.nickList.innerHTML 		= "";
	BL.nickList.style.display	= "none";
	if (GM_getValue("mod_BL") == "true") {
		BLRefresh();
		for (var idx = 0; idx < BLNicks.length; idx++) {
			BLNick 				= document.createElement("LI");
			BLNick.innerHTML 	= "<a>" + BLNicks[idx]; + "</a>";
			BLNick.style.cursor = "pointer";		
			BLNick.addEventListener('click', function(evt) {return BLDel(evt)}, true); 
			
			BL.nickList.appendChild(BLNick);
			BL.nickList.style.display	= "block";
		}		
		
	}
}
function BLSwitch() {
	if (BL.switcher.checked == true) {		
		GM_setValue("mod_BL","true");
	} else {
		GM_setValue("mod_BL","false");
	}	
	BLPrintNickList();
}
function BLAdd() {
	GM_setValue("BLNicks",GM_getValue("BLNicks") + BLToSplit + prompt("Nick a añadir:"));
	BLPrint();
}

function BLDel(evt) {
	BLNick = evt.target.innerHTML;
	BLRefresh();
	BLNickList = "";
	for (var idx = 0; idx < BLNicks.length; idx++) {
		if (BLNicks[idx] != BLNick) {
			BLNickList += BLNicks[idx] + BLToSplit;
		}
	}
	GM_setValue("BLNicks",BLNickList);
	BLPrint();
	return false;
}

function BLProcess(CNode) {
	var nickName = CNode.getElementsByTagName("A")[2].innerHTML;
	if (BLIsIn(nickName)) {
		CNode.style.display = "none";
	}
}

function BLIsIn(nickName) {
	BLRefresh();
	isIn = false;
	for (var idx = 0; idx < BLNicks.length && !isIn; idx++) {
		if (nickName == BLNicks[idx]) isIn = true;
	}
	return isIn;
}

unsafeWindow.onload = function(){
	CPPrint();
	CProcess();
};
