// ==UserScript==
// @name           OWA-Beautify
// @namespace      http://www.ganinchinni.info
// @description    Try and get OWA to display pages as it does in IE
// @include        */exchange/*
// @include		   */exchange*
// Version 0.4
// ==/UserScript

function OWAGM_newwin(e) {
	var el=e.target;
	while ( el.nodeName != "TR" ) {
		el = el.parentNode;
	}
	if ( !el ) return;
	href=el.getAttribute("oldhref");
	var newwin=window.open(href,"OWAGM_READWINDOW","scrollbars=yes,menu=no,resizeable=yes,location=no,height=600,width=700");
	e.preventBubble();
}

function OWAGM_closeWindow(e) {
	window.close();
}

function OWAGM_navbarCollapseFolders(e) {
	var el=e.target;
	var fDiv=document.getElementById("OWAGM_NB_FOLDERS");
	if ( fDiv ) {
		if ( fDiv.style.display == "none" ) {
			fDiv.style.display = "block";
			el.src="/exchweb/img/collapse.gif";
		} else {
			fDiv.style.display = "none";
			el.src="/exchweb/img/expand.gif";
		}
	}
}

function OWAGM_nbButtonTR(Img, Link, lnkText) {
	tbltr = document.createElement("TR");
	tbltd = document.createElement("TD");
	tbltd.setAttribute("class","nbButton");
	tbltd.setAttribute("width","20%");
	tblImg = document.createElement("IMG");
	tblImg.src=Img;
	tbltd.appendChild(tblImg);
	cellLink=document.createElement("LINK");
	cellLink.href=Link;
	cellLink.setAttribute("style","text-decoration:none");
	cellFont = document.createElement("FONT");
	cellFont.setAttribute("style","font-size:0.6em; font-family: tahoma,verdana; font-weight:700; color: black;");
	cellFont.innerHTML="&nbsp;&nbsp;&nbsp;"+lnkText;
	cellLink.appendChild(cellFont);
	cellLink.target="viewer";
	tbltd.appendChild(cellLink);
	tbltr.appendChild(tbltd);
	return tbltr;
}

function OWAGM_iconTD(Img, Link, altText) {
	tbltd = document.createElement("TD");
	tbltd.setAttribute("background","/exchweb/themes/0/nb-bkgd.gif");
	tbltd.setAttribute("align","CENTER");
	tblImg = document.createElement("IMG");
	tblImg.src=Img;
	tblImg.setAttribute("border",0);
	tbltd.appendChild(tblImg);
	cellLink=document.createElement("LINK");
	cellLink.href=Link;
	cellLink.setAttribute("style","text-decoration:none");
	cellLink.appendChild(tblImg);
	cellLink.target="viewer";
	tbltd.appendChild(cellLink);
	tbltd.setAttribute("COLORIT","TRUE");
	tbltd.addEventListener("mouseover",OWAGM_toolButtonColorit,true);
	tbltd.addEventListener("mouseout",OWAGM_toolButtonDeColorit,true);
	return tbltd;
}

function OWAGM_originalMenuWrapper() {
	var reBar, tbl, divItem, direction;
	var divItem=document.createElement("DIV");
	divItem.setAttribute("style","position: fixed; left: 0; right: 0; bottom: 0; top: auto");	
	divItem.setAttribute("ID","ORIGINAL_MENU");
	direction = GM_getValue("LEFTMENU_LASTSTATE");
	if ( direction == "DOWN" ) {
		reBar = OWAGM_navbarOriginalMenuResizebar("UP");
		tbl = OWAGM_originalMenu_Col();
	} else {
		reBar = OWAGM_navbarOriginalMenuResizebar("DOWN");
		tbl = OWAGM_originalMenu_Exp();
	}
	divItem.appendChild(reBar);
	divItem.appendChild(tbl);
	return divItem;
}

function OWAGM_originalMenu_Resize(e) {
	var oMenu;
	direction=GM_getValue("LEFTMENU_LASTSTATE");
	oMenu=document.getElementById("ORIGINAL_MENU");
	if ( direction == "DOWN" ) {
		GM_setValue("LEFTMENU_LASTSTATE", "UP");
	} else {
		GM_setValue("LEFTMENU_LASTSTATE", "DOWN");
	}
	tmpDiv = OWAGM_originalMenuWrapper();
	oMenu.parentNode.insertBefore(tmpDiv, oMenu);
	oMenu.parentNode.removeChild(oMenu);
	OWAGM_resizeLeftNavbar();
}

function OWAGM_navbarOriginalMenuResizebar(resizeDirection) {
	var tbl = document.createElement("TABLE");
	tbl.setAttribute("width","100%");
	tbl.setAttribute("cellspacing", 0);
	tbl.setAttribute("cellpadding", 0);
	tbl.setAttribute("class","tblFolderBar");
	tbl.setAttribute("height","9px");
	var tblBody = document.createElement("TBODY");
	var tbltr = document.createElement("TR");
	var tbltd = document.createElement("TD");
	tbltr.setAttribute("direction",resizeDirection);
	tbltd.setAttribute("width","100%");
	tbltd.setAttribute("align","center");
	tbltd.setAttribute("height","9px");
	var tblImg = document.createElement("IMG");
	tblImg.setAttribute("height","7px");
	if ( resizeDirection == "UP" ) {
		tblImg.src="/exchweb/themes/0/nb-hide-ql.gif";
	} else {
		tblImg.src="/exchweb/themes/0/nb-show-ql.gif";
	}
	tblImg.setAttribute("border",0);
	tbltd.appendChild(tblImg);
	tbltr.appendChild(tbltd);
	tbltr.addEventListener("click",OWAGM_originalMenu_Resize,true);
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	return tbl;
}

function OWAGM_originalMenu_Col() {
	var tbl, tblBody, tbltr, tbltd;
	tbl = document.createElement("TABLE");
	tbl.setAttribute("class","nbBg");
	tbl.setAttribute("cellspacing", "1");
	tbl.setAttribute("cellpadding", "0");
	tbl.setAttribute("width","100%");
	tblBody = document.createElement("TBODY");
	tbltr = document.createElement("TR");
	tbltd = OWAGM_iconTD("/exchweb/img/email.gif","./Inbox/?Cmd=contents","Inbox");
	tbltr.appendChild(tbltd);
	tbltd = OWAGM_iconTD("/exchweb/img/calendar-lg.gif","./Calendar/?Cmd=contents","Calendar");
	tbltr.appendChild(tbltd);
	tbltd = OWAGM_iconTD("/exchweb/img/contacts-lg.gif","./Contacts/?Cmd=contents","Contacts");
	tbltr.appendChild(tbltd);
	tbltd = OWAGM_iconTD("/exchweb/img/task-lg.gif","./Tasks/?Cmd=contents","Tasks");
	tbltr.appendChild(tbltd);
	tbltd = OWAGM_iconTD("/exchweb/img/public-fld.gif",".?Cmd=contents","Public Folders");
	tbltr.appendChild(tbltd);
	tbltd = OWAGM_iconTD("/exchweb/img/options-lg.gif",".?Cmd=options","Options");
	tbltr.appendChild(tbltd);
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	return tbl;
}

function OWAGM_originalMenu_Exp() {
	var tbl, tblBody, tbltr;
	tbl = document.createElement("TABLE");
	tbl.setAttribute("class","nbBg");
	tbl.setAttribute("width","100%");
	tblBody = document.createElement("TBODY");
	tbltr= OWAGM_nbButtonTR("/exchweb/img/email.gif","./Inbox/?Cmd=contents","Inbox");
	tblBody.appendChild(tbltr);
	tbltr= OWAGM_nbButtonTR("/exchweb/img/calendar-lg.gif","./Calendar/?Cmd=contents","Calendar");
	tblBody.appendChild(tbltr);
	tbltr= OWAGM_nbButtonTR("/exchweb/img/contacts-lg.gif","./Contacts/?Cmd=contents","Contacts");
	tblBody.appendChild(tbltr);
	tbltr= OWAGM_nbButtonTR("/exchweb/img/task-lg.gif","./Tasks/?Cmd=contents","Tasks");
	tblBody.appendChild(tbltr);
	tbltr= OWAGM_nbButtonTR("/exchweb/img/public-fld.gif",".?Cmd=contents","Public Folders");
	tblBody.appendChild(tbltr);
	tbltr= OWAGM_nbButtonTR("/exchweb/img/options-lg.gif",".?Cmd=options","Options");
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	return tbl;
}

function OWAGM_resizeLeftNavbar(e) {
	var oMenu, navBar, Wdg, Hgt;
	oMenu=document.getElementById("ORIGINAL_MENU").wrappedJSObject;
	navBar=document.getElementById("OWAGM_NB_FOLDERS").wrappedJSObject;
	Hgt = document.body.clientHeight;
	Hgt -= oMenu.clientHeight;
	Hgt -= navBar.offsetTop;
	Hgt -= 4;
	Wdg = document.body.clientWidth;
	navBar.setAttribute("style","border: 1px solid #D6E7FF; overflow: auto; height: " + Hgt + "px; width:" + Wdg + "px;");
	Wdg = document.body.clientWidth;
	Wdg -= 4;
	navBar.setAttribute("style","border: 1px solid #D6E7FF; overflow: auto; height: " + Hgt + "px; width:" + Wdg + "px;");
}

function OWAGM_resizeMessagePane(e) {
	var Wdg, Hgt, msgPane;
	msgPane=document.getElementById("OWAGM_MESSAGEPANE").wrappedJSObject;
	Hgt = document.body.clientHeight;
	Hgt -= msgPane.offsetTop;
	Wdg = document.body.clientWidth;
	msgPane.setAttribute("style","margin: 0px; left:0; right:0; top: auto; position:fixed; overflow: auto; height: " + Hgt + "px; width:" + Wdg + "px;");
}

function OWAGM_navbarRefresh(e) {
	var el=e.target;
	el.setAttribute("src","/exchweb/img/hourglass.gif");
	window.location.href=window.location.href;
	e.preventBubble();
}

function OWAGM_toolButtonDeColorit(e) {
	var el=e.target;
	while ( el.getAttribute("COLORIT") != "TRUE" ) {
		el = el.parentNode;
	}
	if ( ! el ) return;
	if ( el.getAttribute("TOOLBUTTON") == "TRUE" ) {
		el.setAttribute("background","/exchweb/themes/0/tool-bkgd.gif");
	} else {
		el.setAttribute("bgcolor",el.getAttribute("OLDBGCOLOR"));
	}
}

function OWAGM_toolButtonColorit(e) {
	var el=e.target;
	while ( el.getAttribute("COLORIT") != "TRUE" ) {
		el = el.parentNode;
	}
	if ( ! el ) return;
	if ( el.getAttribute("TOOLBUTTON") == "TRUE" ) {
		el.setAttribute("background","/exchweb/themes/0/nb-sel-bkgd.gif");
	} else {
		el.setAttribute("OLDBGCOLOR",el.getAttribute("BGCOLOR"));
		el.setAttribute("bgcolor","#D6E7FF");
	}
}

function OWAGM_colorit(e) {
	var el=e.target;
	while ( el.parentNode != "TR" ) {
		el = el.parentNode;
	}
	if ( ! el ) return;
	el.setAttribute("bgcolor","#E9E9E8");
	e.preventBubble();
}

function OWAGM_decolorit(e) {
	var el=e.target;
	while ( el.nodeName != "TR" ) {
		el = el.parentNode;
	}
	if ( ! el ) return;
	el.setAttribute("bgcolor","white");
	e.preventBubble();
}

function OWAGM_genFolderbar() {
	var tblFont, tblText, tblBody, tbltr, tbltd, tblImg;
	tblBody = document.createElement("TBODY");
	tbltr = document.createElement("TR");
	tbltd = document.createElement("TD");
	tbltd.setAttribute("ALIGN","CENTER");
	tbltd.setAttribute("VALIGN","MIDDLE");
	tbltd.setAttribute("style","width: 5%;");
	tblImg = document.createElement("IMG");
	tblImg.src="/exchweb/img/folder-lg.gif";
	tbltd.appendChild(tblImg);
	tbltr.appendChild(tbltd);
	tbltd = document.createElement("TD");
	tbltd.setAttribute("ALIGN","LEFT");
	tbltd.setAttribute("VALIGN","MIDDLE");
	tbltd.setAttribute("style","width: 95%");
	tblFont = document.createElement("FONT");
	tblFont.setAttribute("style","color:white; font-family: Tahoma; font-weight: bold; font-size:12pt;");
	tblText = document.createTextNode(OWAGM_getCurrentFolderName());
	tblFont.appendChild(tblText);
	tbltd.appendChild(tblFont);
	tbltr.appendChild(tbltd);
	tblBody.appendChild(tbltr);
	return tblBody;
	
}

function OWAGM_logoTable() {
	var tbl, tblBody, tbltr, tbltd;
	tbl = document.createElement("TABLE");
	tblBody = document.createElement("TBODY");
	tbl.setAttribute("border",0);
	tbl.setAttribute("width","100%");
	tbl.setAttribute("class","tblFolderBar");
	tbltr = document.createElement("TR");
	tbltd = document.createElement("TD");
	tbltd.setAttribute("width","100%");
	tbltd.setAttribute("align","center");
	tblimg = document.createElement("IMG");
	tblimg.src="/exchweb/themes/0/logo2.gif";
	tbltd.appendChild(tblimg);
	tbltr.appendChild(tbltd);
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	return tbl;
}

function OWAGM_navFolderbar() {
	var tbl, tblBody, tbltr, tbltd, tblImg, tblText;
	tbl = document.createElement("TABLE");
	tbl.setAttribute("background","/exchweb/themes/0/tool-bkgd.gif");
	tbl.setAttribute("width","100%");
	tblBody = document.createElement("TBODY");
	tbltr = document.createElement("TR");
	tbltd = document.createElement("TD");
	tblimg = document.createElement("IMG");
	tblimg.src="/exchweb/img/folder-lg.gif";
	tbltd.appendChild(tblimg);
	tbltd.width="2%";
	tbltr.appendChild(tbltd);
	tbltd = document.createElement("TD");
	fnt = document.createElement("FONT");
	fnt.setAttribute("face","Tahoma");
	fnt.setAttribute("size","2px");
	tblText = document.createTextNode("Folders");
	fnt.appendChild(tblText);
	tbltd.appendChild(fnt);
	tbltr.appendChild(tbltd);
	tbltd = document.createElement("TD");
	tblImg = document.createElement("IMG");
	tblImg.setAttribute("border",0);
	tblImg.src = "/exchweb/img/refresh.gif";
	tblImg.addEventListener("click",OWAGM_navbarRefresh,true);
	tbltd.setAttribute("align","right");
	tbltd.appendChild(tblImg);
	tbltr.appendChild(tbltd);
	tbltd = document.createElement("TD");
	tblImg = document.createElement("IMG");
	tblImg.setAttribute("border",0);
	tblImg.src = "/exchweb/img/collapse.gif";
	tblImg.addEventListener("click",OWAGM_navbarCollapseFolders,true);
	tbltd.setAttribute("align","right");
	tbltd.appendChild(tblImg);
	tbltr.appendChild(tbltd);
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	return tbl;
}

function OWAGM_getToolbarGif(fldrName) {
	var retText = "";
	if ( fldrName.toLowerCase() == "note" ) { retText = "tool-newmail"; }
	if ( fldrName.toLowerCase() == "contact" ) { retText = "tool-newcntc"; }
	if ( fldrName.toLowerCase() == "cdl" ) { retText = "tool-newcdl"; }
	if ( fldrName.toLowerCase() == "appointment" ) { retText = "tool-newappt"; }
	if ( fldrName.toLowerCase() == "task" ) { retText = "tool-newtask"; }
	if ( fldrName.toLowerCase() == "post" ) { retText = "tool-post"; }
	if ( fldrName.toLowerCase() == "folder" ) { retText = "tool-newfolder"; }
	if ( retText == "" ) { retText = "tool-newitem"; }
	return retText;
}

function OWAGM_getFolderGif(fldrName) {
	var retText = "";
	if ( fldrName.toLowerCase() == "calendar" ) { retText = "appointment"; }
	if ( fldrName.toLowerCase() == "contacts" ) { retText = "contact"; }
	if ( fldrName.toLowerCase() == "deleted items" ) { retText = "deleted"; }
	if ( fldrName.toLowerCase() == "drafts" ) { retText = "drafts"; }
	if ( fldrName.toLowerCase() == "inbox" ) { retText = "inbox"; }
	if ( fldrName.toLowerCase() == "journal" ) { retText = "journal"; }
	if ( fldrName.toLowerCase() == "notes" ) { retText = "stickynote"; }
	if ( fldrName.toLowerCase() == "outbox" ) { retText = "outbox"; }
	if ( fldrName.toLowerCase() == "sent items" ) { retText = "sent_itm"; }
	if ( fldrName.toLowerCase() == "tasks" ) { retText = "task"; }
	if ( retText == "" ) { retText = "mailbox"; }
	return retText;
}


function OWAGM_folderList(divHTML) {
	var numMsgs, divFList, divItem, tbl, tblBody, tbltr, tbltd, tblimg, ttblTxt, fnt, uName, tblHierarchy, i;
	
	divFList = document.createElement("DIV");
	tblHierarchy=document.createElement("TABLE");
	tbl = document.createElement("TABLE");
	tblBody = document.createElement("TBODY");
	tbl.setAttribute("border",0);
	tbl.setAttribute("width","100%");
	
	var allLinks=document.evaluate('//A[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var numLinks=allLinks.snapshotLength;
    for ( i=0; i<numLinks; i++ ) {
		var lnkItem = allLinks.snapshotItem(i);
		var lnkHref = lnkItem.href;
		var lnkText = lnkItem.textContent;
		
		var nP = lnkItem;
		while ( nP.nodeName != "TABLE" ) {
			nP = nP.parentNode;
		}
		if ( nP.getAttribute("CLASS") == "tblHierarchy" ) {
			tbltr = document.createElement("TR");
			tbltd = document.createElement("TD");
			tbltd.setAttribute("VALIGN","MIDDLE");
			tbltd.setAttribute("NOWRAP","");
			jnkID=lnkText.replace(" ","");
			jnkID=jnkID.toUpperCase();
			tbltr.setAttribute("ID",jnkID);
			if ( lnkItem.nextSibling ) {
				numMsgs = lnkItem.nextSibling.textContent;
			} else {
				numMsgs = "";
			}
			var imgSrc='/exchweb/img/tree-' + OWAGM_getFolderGif(lnkText) + '.gif';
			cellLink=document.createElement("LINK");
			cellLink.setAttribute("target","viewer");
			cellLink.setAttribute("href",lnkHref);
			if ( numMsgs == "" ) {
				cellLink.setAttribute("style","text-decoration: none; color: black; font-family:verdana; font-size: 8pt");
			} else {
				cellLink.setAttribute("style","text-decoration: none; color: black; font-family:verdana; font-size: 8pt; font-weight:bold");
			}
			tblImg=document.createElement("IMG");
			tblImg.src="/exchweb/img/tree-clear16.gif";
			tblImg.setAttribute("border","0px");
			tbltd.appendChild(tblImg);
			tblImg=document.createElement("IMG");
			tblImg.src=imgSrc;
			tblImg.setAttribute("border","0px");
			tbltd.appendChild(tblImg);
			tbltr.appendChild(tbltd);
			tbltd = document.createElement("TD");
			tbltd.setAttribute("VALIGN","MIDDLE");
			tbltd.setAttribute("NOWRAP","");
			jnk=document.createTextNode(lnkText + numMsgs);
			cellLink.appendChild(jnk);
			tbltd.appendChild(cellLink);
			tbltr.appendChild(tbltd);
			tblBody.appendChild(tbltr);
		}
	}
	tblHierarchy.appendChild(tblBody);
	divFList.appendChild(tblHierarchy);
	
	divItem = document.createElement("DIV");
	divItem.setAttribute("ID","OWAGM_NB_FOLDERS");
	divItem.setAttribute("style","border: 2px solid; overflow:auto");
	tbl = document.createElement("TABLE");
	tblBody = document.createElement("TBODY");
	tbl.setAttribute("border",0);
	tbl.setAttribute("width","100%");
	tbltr = document.createElement("TR");
	tbltd = document.createElement("TD");
	tbltd.setAttribute("width","2%");
	tblimg = document.createElement("IMG");
	tblimg.src="/exchweb/img/minus.gif";
	tbltd.appendChild(tblimg);
	tbltr.appendChild(tbltd);
	tbltd = document.createElement("TD");
	tbltd.setAttribute("width","98%");
	uName = USERNAME;
	uName = uName.replace("."," ");
	tblText = document.createTextNode(uName);
	fnt = document.createElement("FONT");
	fnt.setAttribute("style","color: black; font-family:verdana; font-size: 8pt");
	fnt.appendChild(tblText);
	tbltd.appendChild(fnt);
	tbltr.appendChild(tbltd);
	tblBody.appendChild(tbltr);
	tbl.appendChild(tblBody);
	divItem.appendChild(tbl);
	divItem.appendChild(divFList);
	
	return divItem;
}

function OWAGM_newButtonHandler(e) {
	var el = e.target;
	if ( !el ) return;
	while (el.getAttribute("CLICKVAL") == null) {
		el=el.parentNode;
	}
	var sOption = el.getAttribute("CLICKVAL");
	href = "about:blank";
	if ( sOption == "Note" ) {	href = "Drafts/?Cmd=new";	}
	if ( sOption == "Contact" ) { href = "Contacts/?Cmd=new"; }
	if ( sOption == "Appointment" ) { href = "Calendar/?Cmd=new"; }
	if ( sOption == "Task" ) { href = "Tasks/?Cmd=new"; }
	if ( sOption == "CDL" ) { href = "Contacts/?Cmd=newcdl"; }
	if ( sOption == "Folder" ) { href = FOLDER + "/?Cmd=createfolder"; }
	if ( sOption == "Post" ) { href = FOLDER + "/?Cmd=newpost"; }
	var newwin=window.open(href,"OWAGM_COMPOSEWINDOW","scrollbars=yes,menu=no,resizeable=yes,location=no,height=600,width=700");
	e.preventBubble();
}

function OWAGM_viewTypeHandler(e) {
	var el = e.target;
	if ( !el ) return;
	while (el.getAttribute("CLICKVAL") == null) {
		el=el.parentNode;
	}
	var sOption = el.getAttribute("CLICKVAL");
	var uri = framehref.split("?")[0] + "?Cmd=contents&showFolders=1&View=" +sOption;
	window.location.href=uri;
	e.preventBubble();
}

function OWAGM_replaceAllFonts() {
	var allFonts=document.evaluate('//FONT',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numFonts=allFonts.snapshotLength;
	for ( i=0; i<numFonts; i++ ) {
			var fontItem = allFonts.snapshotItem(i);
			if ( fontItem.getAttribute("size") == "2" ) {
					fontItem.setAttribute("size","0.5em");
					fontItem.setAttribute("face","verdana");
			} else {
					fontItem.setAttribute("face","verdana");
			}
	}
}

function OWAGM_changeItemLinks() {
	var allLinks=document.evaluate('//A',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numLinks=allLinks.snapshotLength;
	for ( i=0; i<numLinks; i++ ) {
			var lnkItem = allLinks.snapshotItem(i);
			var href=lnkItem.href;
			if ( href.indexOf('Cmd=open') > 0 ) {
				lnkItem.href="JavaScript:OpenMailinNewWindow()";
				var trItem=lnkItem;
				var tdItem=lnkItem;
				while (tdItem.nodeName != "TD") {
					tdItem = tdItem.parentNode;
				}
				while (trItem.nodeName != "TR") {
					trItem = trItem.parentNode;
				}
				lnkItem.setAttribute("style","cursor:default");
				if ( trItem.getAttribute("oldhref") != "") {
					trItem.setAttribute("oldhref",href);
					trItem.setAttribute("COLORIT","TRUE");
					trItem.addEventListener("click",OWAGM_newwin,true);
					trItem.addEventListener("mouseover",OWAGM_toolButtonColorit,true);
					trItem.addEventListener("mouseout",OWAGM_toolButtonDeColorit,true);
				}
				
			}
	}
}

function OWAGM_changeCloseLinks() {
	if ( TARGET == "OWAGM_READWINDOW" || TARGET == "OWAGM_COMPOSEWINDOW" ) {
		var allLinks=document.evaluate('//A',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var numLinks=allLinks.snapshotLength;
		for ( i=0; i<numLinks; i++ ) {
				var lnkItem = allLinks.snapshotItem(i);
				var lnkhref = lnkItem.href;
				if ( lnkhref.indexOf('Cmd=contents&View=Messages') > 0 ) {
					lnkItem.href='Javascript:closeExtraWindow()';
					lnkItem.addEventListener("click",OWAGM_closeWindow,true);
				}
		}
	}
}

function OWAGM_changeOnNewLinks() {
	var javascriptLinks=document.evaluate('//A',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numJLinks=javascriptLinks.snapshotLength;
	for ( ij=0; ij<numJLinks; ij++ ) {
		var lnkJItem = javascriptLinks.snapshotItem(ij);
		if ( lnkJItem.href.indexOf('javascript:OnNewForm') == 0 ) {
			var nP = lnkJItem.parentNode;
			while ( nP.nodeName != "TD" ) {
				nP = nP.parentNode;
			}
			nP.parentNode.removeChild(nP);
		}
	}
}

function OWAGM_getCurrentFolderName() {
	var hrefParts=framehref.split("?")[0].split("/");
	return unescape(hrefParts[hrefParts.length-2]);
}

function OWAGM_getCurrentUserName(){
	var hrefParts=framehref.split("?")[0].split("/");
	return hrefParts[4];
}

function OWAGM_replaceLeftFrame(){
	var allFrames=document.evaluate('//FRAME[@SRC]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numFrames=allFrames.snapshotLength;
	for ( ij=0; ij<numFrames; ij++ ) {
		var frmItem = allFrames.snapshotItem(ij);
		var frmSrc = frmItem.getAttribute("src");
		if ( frmSrc.indexOf("Cmd=navbar") > 0 ) {
			frmSrc = frmSrc.replace('Cmd=navbar','Cmd=contents&showFolders=1');
			frmItem.setAttribute("SRC",frmSrc);
		}
	}

}

function OWAGM_removeItem(itmType, itmChar, parentItem){
	var query = itmType;
	if ( itmChar != "" ) {
		query += '[' + itmChar + ']';
	}
	var allItems=document.evaluate(query,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numItems=allItems.snapshotLength;
	for ( ij=0; ij<numItems; ij++ ) {
		var Item = allItems.snapshotItem(ij);
		if ( parentItem != "" ) {
			var pt;
			pt = Item;
			while ( pt.nodeName != parentItem ) {
				pt = pt.parentNode;
			}
			pt.parentNode.removeChild(pt);
		} else {
			Item.parentNode.removeChild(Item);
		}
	}
}

function OWAGM_menuDrop(e) {
	var el=e.target.wrappedJSObject;
	var oT=el.clientHeight + 52;
	var elParent = el;
	while (! elParent.hasAttribute("DROPDIV")) {
		elParent = elParent.parentNode;
	}
	fDiv = document.getElementById(elParent.getAttribute("DROPDIV"));
	if ( fDiv.getAttribute("state") == "SHOWN" ) {
		fDiv.setAttribute("style","border: 1px solid black; z-Index:100; left: " + elParent.offsetLeft + "px; top:" + oT + "px;visibility:hidden; position:fixed; background-color:#D6E7FF");
		fDiv.setAttribute("state","HIDDEN");
	} else {
		fDiv.setAttribute("style","border: 1px solid black; z-Index:100; left: " + elParent.offsetLeft + "px; top:" + oT + "px;visibility:block; position:fixed; background-color:#D6E7FF");
		fDiv.setAttribute("state","SHOWN");
	}
	e.preventBubble();
}

function OWAGM_generateDropDown(type, img, nOpt, selOpt, fText, divName, funcName1, funcName2){
	if ( type == "BUTTON" ) {
		var tFont, td, tr, tbl, tbody, tImg, tText;
		tbl = document.createElement("TABLE");
		tbl.setAttribute("cellspacing","2px");
		tbl.setAttribute("cellpadding","0px");
		tbody = document.createElement("TBODY");
		tr = document.createElement("TR");
		if ( img != "" ) {
			tImg=document.createElement("IMG");
			tImg.setAttribute("border","0px");
			tImg.setAttribute("src",img);
			td=document.createElement("TD");
			td.setAttribute("CLICKVAL",selOpt);
			td.setAttribute("VALIGN","MIDDLE");
			td.setAttribute("ALIGN","CENTER");
			td.appendChild(tImg);
			tr.appendChild(td);
			if ( funcName1 != null ) {
				td.addEventListener("click",funcName1,true);
			}
		}
		tFont=document.createElement("FONT");
		tFont.setAttribute("style","cursor: default; color:black; font-family: verdana; font-size:8pt;");
		if ( fText != "" ) {
			tFont.innerHTML=fText;
		} else {
			tFont.innerHTML=selOpt;
		}
		td=document.createElement("TD");
		td.appendChild(tFont);
		td.setAttribute("CLICKVAL",selOpt);
		td.setAttribute("VALIGN","MIDDLE");
		td.setAttribute("ALIGN","CENTER");
		tr.appendChild(td);
		if ( funcName1 != null ) {
			td.addEventListener("click",funcName1,true);
		}
		tbody.appendChild(tr);
		tbl.appendChild(tbody);
		tbl.setAttribute("COLORIT","TRUE");
		tbl.setAttribute("TOOLBUTTON","TRUE");
		
		var retTd=document.createElement("TD");
		retTd.appendChild(tbl);
		retTd.setAttribute("VALIGN","MIDDLE");
		retTd.setAttribute("ALIGN","CENTER");
		if ( funcName1 != null ) {
			retTd.addEventListener("click",funcName1,false);
			retTd.addEventListener("mouseover",OWAGM_toolButtonColorit,false);
			retTd.addEventListener("mouseout",OWAGM_toolButtonDeColorit, false);
		}
		return retTd;
	}
	if ( type == "DROP" ) {
		tImg=document.createElement("IMG");
		tImg.setAttribute("border","0px");
		tImg.setAttribute("src","/exchweb/img/down-b.gif");
		td=document.createElement("TD");
		td.setAttribute("DROPDIV", divName);
		td.setAttribute("TOOLBUTTON","TRUE");
		td.setAttribute("COLORIT","TRUE");
		td.setAttribute("VALIGN","MIDDLE");
		td.setAttribute("ALIGN","CENTER");
		td.addEventListener("click",OWAGM_menuDrop,true);
		td.addEventListener("mouseover",OWAGM_toolButtonColorit,false);
		td.addEventListener("mouseout",OWAGM_toolButtonDeColorit, false);
		td.appendChild(tImg);
		return td;
	}
	if ( type == "MENU" ) {
		var nTmp=nOpt.split("|");
		var nCtr=nTmp.length;
		
		var fDiv=document.createElement("DIV");
		var tFont, td, tr, tbl, tbody, tImg, tText;
		fDiv.setAttribute("ID",divName);
		fDiv.setAttribute("style","border: 1px solid black; z-Index:100; visibility:hidden; position:fixed; background-color:#D6E7FF");
		fDiv.setAttribute("state","HIDDEN");
	
		tbl = document.createElement("TABLE");
			tbl.setAttribute("bgcolor","gray");

		tbl.setAttribute("cellspacing","2px");
		tbl.setAttribute("cellpadding","0px");
		tbody = document.createElement("TBODY");
		for (i=0; i<nCtr-1; i++ ) {
			var opt=nTmp[i];
			var optText;
			var optValue;
			if ( opt.split(':').length > 1 ) {
				optValue = opt.split(':')[0];
				optText = opt.split(':')[1];
			} else {
				optText=opt;
				optValue=opt;
			}
			tr = document.createElement("TR");
			td = document.createElement("TD");
			tFont = document.createElement("FONT");
			td.setAttribute("COLORIT","TRUE");
			tFont.setAttribute("style","cursor: default; color:black; font-family: verdana; font-size:8pt;");
			tFont.innerHTML=unescape("&nbsp;"+optText+"&nbsp;");
			td.appendChild(tFont);
			td.setAttribute("CLICKVAL",optValue);
			td.setAttribute("DROPDIV", divName);
			td.addEventListener("click",OWAGM_menuDrop,true);
			if ( funcName2 != null ) {
				td.addEventListener("click", funcName2, true);
			}
			td.addEventListener("mouseover",OWAGM_toolButtonColorit, false);
			td.addEventListener("mouseout",OWAGM_toolButtonDeColorit, false);
			tr.appendChild(td);
			tbody.appendChild(tr);
		}
		tbl.appendChild(tbody);
		fDiv.appendChild(tbl);
		return fDiv;
	}
}


framehref=window.location.href;

var TARGET=window.name;
if ( window.name == "navbar" ) {
	TARGET="NAVBAR";
}
if ( window.name == "viewer" ) {
	TARGET="VIEWER";
}
var FOLDER=OWAGM_getCurrentFolderName();
var USERNAME=OWAGM_getCurrentUserName();

// Make sure New Windows close after compose Action
if ( TARGET == "OWAGM_COMPOSEWINDOW" ) {
	if ( framehref.indexOf("Cmd=contents") != -1 ) {
		window.close();
	}
}

//Replace the URL for the left frame
OWAGM_replaceLeftFrame();

//Replace all Fonts irrespective
OWAGM_replaceAllFonts();
OWAGM_changeCloseLinks();

// Main Area
// Messages View
if ( TARGET == "VIEWER") {
//if ( href.indexOf('mainpage.html') > 0 ) {
	OWAGM_changeItemLinks();
	OWAGM_changeOnNewLinks();
	
	var allTables=document.evaluate('//TABLE',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numTables=allTables.snapshotLength;
	var tblCalendar, tblView, tblFolderbar, tblToolbar, tblMessages;
	for ( i=0; i<numTables; i++ ) {
			var tblItem = allTables.snapshotItem(i);
			var tblClass = tblItem.getAttribute("class");
			if ( tblClass == "trToolbar"  ) {
				tblToolbar=tblItem;
			}
			if ( tblClass == "tblFolderBar" ) {
				tblFolderbar = tblItem;
			}
			if ( tblClass == "tblView" ) {
				tblView = tblItem;
			}
			if ( tblClass == "tblHierarchy" ) {
				tblHierarcy = tblItem
			}
			if ( tblClass == null ) {
				tblMessages = tblItem;
			}
			if ( tblClass == "calVwTbl" ) {
				tblCalendar = tblItem;
			}
	}
	var vOpt="";
	var vSelOpt="";
	// Toolbar Changes
	if ( tblToolbar ) {
	
		//OWAGM_removeItem('contains("//IMG[@src]", div.gif)',"","TD");
		tblToolbar.setAttribute("class","");
		tblToolbar.setAttribute("ID","OWAGM_TBLTOOLBAR");
		tblToolbar.setAttribute("background","/exchweb/themes/0/tool-bkgd.gif");
		
		var tdParent = null;
		var nOpt="";
		var selOpt="";
		var allOptions, numOptions;
		allOptions = document.evaluate('//OPTION',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        numOptions=allOptions.snapshotLength;
		for ( i=0; i<numOptions; i++ ) {
            var optItem = allOptions.snapshotItem(i);
			if (optItem.parentNode.getAttribute("NAME") == "FormType") {
				if ( tdParent == null ) {
					tdParent=optItem.parentNode;
					while ( tdParent.nodeName != "TD" ) {
						tdParent = tdParent.parentNode;
					}
				}
				nOpt += optItem.getAttribute("VALUE") + ":" + optItem.innerHTML + "|";
				if ( optItem.hasAttribute("SELECTED") ) {
					selOpt=optItem.getAttribute("VALUE");
				}
			}
			var vOptParent=null;
			if ( optItem.parentNode.getAttribute("NAME") == "ViewName") {
				vOpt += optItem.getAttribute("VALUE") + ":" + optItem.innerHTML + "|";
				if ( optItem.hasAttribute("SELECTED") ) {
					vSelOpt=optItem.getAttribute("SELECTED");
				}
				if ( vOptParent==null ) {
					vOptParent=optItem;
					while (vOptParent.nodeName != "TD") {
						vOptParent = vOptParent.parentNode;
					}
				}
			}
		}
		if ( vOptParent != null ) {
			OWAGM_removeItem('//LABEL','@for="ViewName"','TD');
			newTD = OWAGM_generateDropDown("BUTTON", "", vOpt, vSelOpt, "View", "OWAGM_VIEWMENU", null, OWAGM_viewTypeHandler);
			vOptParent.parentNode.insertBefore(newTD,vOptParent);
			newTD = OWAGM_generateDropDown("DROP", "", vOpt, vSelOpt, "View", "OWAGM_VIEWMENU", null, OWAGM_viewTypeHandler);
			vOptParent.parentNode.insertBefore(newTD,vOptParent);
			newTD = OWAGM_generateDropDown("MENU", "", vOpt, vSelOpt, "View", "OWAGM_VIEWMENU", null, OWAGM_viewTypeHandler);
			vOptParent.parentNode.insertBefore(newTD,vOptParent);
			
			vOptParent.parentNode.removeChild(vOptParent);
		}
		
		if ( nOpt != "" ) {
			newTD = OWAGM_generateDropDown("BUTTON", "/exchweb/img/tool-newmail.gif", nOpt, selOpt, "New", "OWAGM_COMPOSEMENU", OWAGM_newButtonHandler, OWAGM_newButtonHandler);
			tdParent.parentNode.insertBefore(newTD,tdParent);
			newTD = OWAGM_generateDropDown("DROP", "/exchweb/img/tool-newmail.gif", nOpt, selOpt, "New", "OWAGM_COMPOSEMENU", OWAGM_newButtonHandler, OWAGM_newButtonHandler);
			tdParent.parentNode.insertBefore(newTD,tdParent);
			newTD = OWAGM_generateDropDown("MENU", "/exchweb/img/tool-newmail.gif", nOpt, selOpt, "New", "OWAGM_COMPOSEMENU", OWAGM_newButtonHandler, OWAGM_newButtonHandler);
			tdParent.parentNode.insertBefore(newTD,tdParent);
			tdParent.parentNode.removeChild(newTD.nextSibling);
		}
		
	}
	
	// Folderbar Changes
	if ( tblFolderbar ) {
		var tblBody;
		tblFolderbar.setAttribute("height","42px");
		tblFolderbar.setAttribute("ID","OWAGM_TBLFOLDERBAR");
		tblFolderbar.innerHTML="";
		tblBody = OWAGM_genFolderbar();
		tblFolderbar.appendChild(tblBody);
		tblFolderbar.parentNode.insertBefore(tblFolderbar,tblToolbar);
	}
	
	// Wrapper DIV
	msgDiv = document.createElement("DIV");
	msgDiv.setAttribute("ID","OWAGM_MESSAGEPANE");
	if ( tblCalendar ) {
		msgDiv.appendChild(tblCalendar);
		tblToolbar.parentNode.insertBefore(msgDiv,tblToolbar.nextSibling);
	} else {
		msgDiv.appendChild(tblMessages);
		tblView.parentNode.insertBefore(msgDiv,tblView.nextSibling);
	}
	OWAGM_resizeMessagePane(null);
	window.addEventListener("load", OWAGM_resizeMessagePane, true);
	window.addEventListener("resize", OWAGM_resizeMessagePane, true);
}

// The Left Navigation Stuff

if ( TARGET == "NAVBAR" ) {
	var allTables=document.evaluate('//TABLE',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var numTables=allTables.snapshotLength;
	for ( i=0; i<numTables; i++ ) {
			var tblItem = allTables.snapshotItem(i);
			var tblClass = tblItem.getAttribute("class");
			if ( tblClass == "trToolbar"  || tblClass == null || tblClass == "tblFolderBar") {
				tblItem.parentNode.removeChild(tblItem);
			}
			if ( tblClass == "tblHierarchy" ) {
				logoTable = OWAGM_logoTable();
				tblItem.parentNode.insertBefore(logoTable,tblItem);
				folderBar = OWAGM_navFolderbar();
				tblItem.parentNode.insertBefore(folderBar,tblItem);
				folderList = OWAGM_folderList(tblItem.innerHTML);
				tblItem.parentNode.insertBefore(folderList,tblItem);
				oMenu = OWAGM_originalMenuWrapper();
				tblItem.parentNode.insertBefore(oMenu, tblItem);
				tblItem.parentNode.removeChild(tblItem);
			}
	}
	window.addEventListener("resize",OWAGM_resizeLeftNavbar,true);
	window.addEventListener("load",OWAGM_resizeLeftNavbar,true);
}
