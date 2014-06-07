// ==UserScript==
// @name           Photocase Shadowbox
// @namespace      micjan.shadowbox
// @description    Erweiterte Fotosichtung. Stellt nur ein Foto auf schwarzem Hintergrund dar. Navigation über Tastatur.
// @include        http://www.photocase.*/photobrowser.asp*
// @include        http://www.photocase.*/collection.asp*
// ==/UserScript==

// --------------------- Konstruktorfunktionen ---------------------

// Kümmert sich um alles was mit URL und Seitenaufrufen zu tun hat.
function URLHandler() {
	
	// --- Attribute
	
	var currentUrl = window.location.href;
	var parameter = new Array();
	var maxSite = 1;
	var imLoading = 0;
	
	// --- Initialisierungen
	
	if (currentUrl.indexOf("?") > -1) {
		var parameterString = currentUrl.split("?")[1].substr(0);
		if (parameterString.lastIndexOf("#") == parameterString.length-1) {
			parameterString = parameterString.substr(0,parameterString.length-1);
		}
		parameter = parameterString.split("&");
	}
	
	this.setMaxSite = function (initMaxSite) {
		maxSite = initMaxSite;
	}
	
	// --- Funktionen
	
	this.getCurrentDocument = function () {
		var temp = currentUrl.split("/");
		for (var i = 0;i < temp.length;i++) {
			if (temp[i].indexOf(".asp") > -1) {
				return temp[i].split(".asp")[0];
			}
		}
	}
	
	this.getURLParam = function (strParamName) {
		for (var i = 0;i < parameter.length;i++) {
			if (parameter[i].indexOf(strParamName) == 0) {
				return parameter[i].split("=")[1];
			}
		}
		return -1;
	}
	
	this.setSBAction = function (sbaction) {
		var rewritten = 0;
		for (var i = 0;i < parameter.length;i++) {
			if (parameter[i].indexOf("sbaction") == 0) {
				parameter[i] = "sbaction=" + sbaction;
				rewritten = 1;
			}
		}
		if (rewritten == 0) {
			parameter.push("sbaction=" + sbaction);
		}
	}
	
	this.resetSBAction = function () {
		for (var i = 0;i < parameter.length;i++) {
			if (parameter[i].indexOf("sbaction") == 0) {
				var newParameter = new Array();
				for (var myKey in parameter) {
				   if(myKey != i) {
				      newParameter.push(parameter[myKey]);
				   }
				}
				parameter = newParameter;
			}
		}
	}
	
	this.getParameterURL = function () {
		var hasQuestionmark = 0;
		var newUrl = currentUrl.split("?")[0];
		for (var i = 0;i < parameter.length;i++) {
			if (parameter[i] != "") {
				if (hasQuestionmark == 0) {
					var linker = "?";
					var hasQuestionmark = 1;
				} else {
					var linker = "&";
				}
				var newUrl = newUrl + linker + parameter[i];
			}
		}
		return newUrl;
	}
	
	this.addToPageParameter = function (addition) {
		var rewritten = 0;
		for (var i = 0;i < parameter.length;i++) {
			if (parameter[i].indexOf("p") == 0) {
				var newpage = parseInt(parameter[i].split("=")[1]) + parseInt(addition);
				//alert("Alt: " + parseInt(parameter[i].split("=")[1]) + " Neu: " + newpage);
				parameter[i] = "p=" + newpage;
				rewritten = 1;
			}
		}
		if (rewritten == 0) {
			parameter.push("p=2");
		}
	}
	
	this.getNextPage = function () {
		if (parseInt(this.getURLParam("p")) < maxSite & maxSite > 1) {
			this.setSBAction("next");
			this.addToPageParameter(1);
			return this.getParameterURL();
		} else {
			return "";
		}
	}
	
	this.getPrevPage = function () {
		if (parseInt(this.getURLParam("p")) > 1) {
			this.setSBAction("prev");
			this.addToPageParameter(-1);
			return this.getParameterURL();
		} else {
			return "";
		}
	}
	
	this.getCurrentPage = function () {
		// this.resetSBAction(); // führt im Opera zu fehler
		this.setSBAction("");
		return this.getParameterURL()+"#sbphoto"+thumbContainer.getCurrentId();
	}
	
	this.openNextPage = function () {
		var newURL = this.getNextPage();
		if (newURL != "" & imLoading == 0) {
			imLoading = 1;
			window.location = newURL;
		}
	}
	
	this.openPrevPage = function () {
		var newURL = this.getPrevPage();
		if (newURL != "" & imLoading == 0) {
			imLoading = 1;
			window.location = newURL;
		}
	}
	
	this.openCurrentPage = function () {
		var newURL = this.getCurrentPage();
		if (newURL != "") {
			window.location = newURL;
		}
	}
	
	this.gotoUser = function (param) {
		if (param == "foreground") {
			window.open(thumbContainer.getCurrentUserURL(), "imageWindow");
		} else if (param == "background") {
			var oldWin = window;
			window.open(thumbContainer.getCurrentUserURL(), "imageWindow");
			oldWin.focus();
		}
	}
	
	this.gotoPhoto = function (param) {
		if (param == "foreground") {
			window.open(thumbContainer.getCurrentImageURL(), "imageWindow");
		} else if (param == "background") {
			var oldWin = window;
			window.open(thumbContainer.getCurrentImageURL(), "imageWindow");
			oldWin.focus();
		}
	}
	
} // ENDE: URLHandler

// Kümmert sich um alles was mit dem DOM zu tun hat
function DOMHandler() {
	
	// --- Attribute
	
	// Alle HTML Tags holen
	var allHTMLTags = new Array();
	var allHTMLTags = document.getElementsByTagName("*");
	
	// Datencontainer bereitstellen
	var allThumbnails = new Array();
	var allCurrentPages = new Array();
	
	// --- Initialisierung
	
	// Alle HTML Tags durchlaufen und jeweils in Datenkontainer reinpacken
	var anchorcounter = 0;
	for (i=0; i<allHTMLTags.length; i++) {
		// Alle mediumThumbnail-Elemente filtern
		if (allHTMLTags[i].className.indexOf("mediumThumbnail") > -1) {
			allHTMLTags[i].childNodes[1].setAttribute('name', 'sbphoto'+anchorcounter);
			allThumbnails.push(allHTMLTags[i]);
			anchorcounter += 1;
		}
		// All currentPage-Elemente filtern
		if (allHTMLTags[i].className == "currentPage") {
			allCurrentPages.push(allHTMLTags[i]);
		}
		// All VoteForms-Elemente filtern
		if (allHTMLTags[i].className == "currentPage") {
			allCurrentPages.push(allHTMLTags[i]);
		}
	}
	
	// --- Funktionen
	
	this.getAllThumbnails = function () {
		return allThumbnails;
	}
	
	this.getMaxSiteInPhotoBrowser = function () {
		if (allCurrentPages.length > 0) {
			var tempArray = allCurrentPages[0].innerHTML.split(" ");
			return tempArray[tempArray.length-1];
		} else {
			return 1;
		}
	}
	
	this.getMaxSiteInCollection = function () {
		return 1;
	}
	
	this.displayImage = function (title,username,userpath,userlinkclass,imagepath,imageurl) {
		document.getElementById("shadowbox_user").childNodes[1].innerHTML = username;
		document.getElementById("shadowbox_user").childNodes[1].href = userpath;
		document.getElementById("shadowbox_user").childNodes[1].className = userlinkclass;
		document.getElementById("shadowbox_image").src = imageurl;
		document.getElementById("shadowbox_title").innerHTML = title;
	}
	
	this.turnSBOn = function () {
		document.getElementById("shadowbox_container").style.display = "block";
	}
	
	this.turnSBOff = function () {
		document.getElementById("shadowbox_container").style.display = "none";
	}
	
	this.turnSBOffCleanUrl = function () {
		urlhandler.openCurrentPage();
	}
	
	// I Like Funktionen
	
	this.clickLikeButton = function () {
		var likeButton = document.getElementById("shadowboxLikeFrame").contentDocument.getElementById("boxMiddleColumn").childNodes[7].childNodes[5].childNodes[1].childNodes[5];
		if (likeButton.name == "submit1") {
			// Wird noch nicht gemocht
			likeButton.click();
		} else {
			// Wird gemocht
			// Infostatus ändern
			document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "OK. Foto wird gemocht.";
			document.getElementById("shadowbox_infopanel").style.display = "inline";
			document.getElementById("shadowbox_container").removeChild(document.getElementById("shadowboxLikeFrame"));
		}
	}
	
	this.createLikeFrame = function () {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('style','position:absolute;left: -100px; top: -100px; width: 10px; height: 10px;');
		iframe.setAttribute('id' , 'shadowboxLikeFrame');
		iframe.addEventListener("load", domhandler.clickLikeButton, true);
		document.getElementById("shadowbox_container").appendChild(iframe);
		iframe.src = thumbContainer.getCurrentImageURL() + "?sbaction=like";
	}
	
	this.iLikeThisImage = function () {
		// Infostatus ändern
		document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "Wird geherzt. Bitte warten.";
		document.getElementById("shadowbox_infopanel").style.display = "inline";
		this.createLikeFrame();
	}
	
	// --- Funktionen: DOM-Erzeugung
	
	/* // eventHandler kann nicht zugefügt werden. funktionsaufruf funktioniert hier nicht. darum is dieser teil ausgelagert. ganz unten.
	this.drawShadowboxLink = function () {
		var listitem = document.createElement('li');					// li-Element erzeugen
		var link = document.createElement('a');							// a-Element erzeugen
		link.setAttribute('style','cursor:hand;');						// a-Element Attribute geben
		link.addEventListener("click", this.turnSBOn, true);				// Eventhandler draufsetzen
		var linktext = document.createTextNode("Shadowbox starten");	// Linktext erzeugen
		link.appendChild(linktext);										// Linktext zu a-Element zufügen
		listitem.appendChild(link);										// a-Element zu li-Element zufügen
		document.getElementById("boxLeftColumn").childNodes[3].appendChild(listitem);	// li-Element zur ersten ul zufügen
	}
	*/
	
	this.drawShadowbox = function () {
		var sbmarkup = "";
		sbmarkup += "<div style='display: none;position: fixed;z-index: 1000;top: 0px;left: 0px;width: 100%;height: 100%;background-image: url(http://pc.aeroat.de/blacktranspixel.png);' id='shadowbox_container'>";
		sbmarkup += "	<div style='position: absolute;width: 100%;left: 0px;top: 50%;margin: -170px 0px 0px 0px;text-align: center;'>";
		// Action-Container überm Foto
		sbmarkup += "		<div style='position: absolute;left: 0px;top: -30px;width: 100%;text-align: center;'>";
		sbmarkup += "			<div style='display: none;background-color: #FFF;padding: 5px;' id='shadowbox_infopanel'>";
		sbmarkup += "				<div style='display: inline;color: #58514E;padding: 0px 3px 0px 3px;'>";
		sbmarkup += "					Info";
		sbmarkup += "				</div>";
		sbmarkup += "			</div>";
		sbmarkup += "		</div>";
		sbmarkup += "		<img src='' style='border: 5px solid #FFF;' id='shadowbox_image' onclick='return false;' oncontextmenu='return false;' onselectstart='return false;' ondragstart='return false;' onmousedown='return false;' />";
		// Title und User-Container unterm Foto
		sbmarkup += "		<div style='position: absolute;left: 0px;bottom: -30px;width: 100%;text-align: center;'>";
		sbmarkup += "			<div style='display: inline;background-color: #FFF;padding: 5px;'>";
		sbmarkup += "				<div style='display: inline;padding: 0px 8px 0px 3px;' id='shadowbox_user'>";
		sbmarkup += "					<a href='#' style='color: #2e9cc0;text-decoration: none;' class=''>";
		sbmarkup += "						User";
		sbmarkup += "					</a>";
		sbmarkup += "				</div>";
		sbmarkup += "				<div style='display: inline;color: #58514E;padding: 0px 3px 0px 0px;' id='shadowbox_title'>";
		sbmarkup += "					Titel";
		sbmarkup += "				</div>";
		sbmarkup += "			</div>";
		sbmarkup += "		</div>";
		sbmarkup += "	</div>";
		// Instrucktion-Liste
		sbmarkup += "	<ul style='position: absolute;right: 20px;bottom: 20px;margin: 0px;padding: 0px;list-style: none;text-align: right;'>";
		sbmarkup += "		<li style='color: #FFF;margin: 0px;padding: 0px;line-height: 18px;background: none;'>";
		sbmarkup += "			<span style='color: #949494;padding-right:10px;'>Älteres Foto:</span>Pfeiltaste Rechts oder N</li>";
		sbmarkup += "		<li style='color: #FFF;margin: 0px;padding: 0px;line-height: 18px;background: none;'>";
		sbmarkup += "			<span style='color: #949494;padding-right:10px;'>Neueres Foto:</span>Pfeiltaste Links oder P</li>";
		sbmarkup += "		<li style='color: #FFF;margin: 0px;padding: 0px;line-height: 18px;background: none;'>";
		sbmarkup += "			<span style='color: #949494;padding-right:10px;'>Fotodetails in neuem Tab öffnen:</span>Leertaste</li>";
		sbmarkup += "		<li style='color: #FFF;margin: 0px;padding: 0px;line-height: 18px;background: none;'>";
		sbmarkup += "			<span style='color: #949494;padding-right:10px;'>Fotografenprofil in neuem Tab öffnen:</span>F</li>";
		sbmarkup += "		<li style='color: #FFF;margin: 0px;padding: 0px;line-height: 18px;background: none;'>";
		sbmarkup += "			<span style='color: #949494;padding-right:10px;'>Shadowbox schließen:</span>X</li>";
		sbmarkup += "	</ul>";
		sbmarkup += "</div>";
		document.body.innerHTML += (sbmarkup);
	}
	
} // ENDE: DOMHandler

// beinhaltet und hadelt alles zu einem Foto
function Thumbnail(mediumThumbnailDiv) {
	
	// --- Attribute
	
	var element = mediumThumbnailDiv;
	
	// --- Funktionen
	
	this.getTitle = function () {
		return element.childNodes[5].innerHTML;
	}
	this.getUserName = function () {
		return element.childNodes[1].innerHTML;
	}
	this.getUserURL = function () {
		return element.childNodes[1].href;
	}
	this.getUserLinkClass = function () {
		return element.childNodes[1].className;
	}
	this.getImageURL = function () {
		return element.childNodes[3].childNodes[0].href;
	}
	this.getMediumImagePath = function () {
		return element.childNodes[3].childNodes[0].childNodes[0].src;
	}
	this.getBigImagePath = function () {
		return str_replace("2.j","3.j",this.getMediumImagePath());
	}
	this.getSmallImagePath = function () {
		return str_replace("2.j","1.j",this.getMediumImagePath());
	}
	
} // ENDE: Thumbnail

// Handelt alle Fotos auf einer Seite
function ThumbContainer(allMediumThumbnailDivs) {
	
	// --- Attribute
	
	var thumbnails = new Array;
	var numberOfImages = allMediumThumbnailDivs.length;
	var current = 0;
	
	// --- Initialisierung
	
	for (i=0; i<allMediumThumbnailDivs.length; i++) {
		thumbnails.push(new Thumbnail(allMediumThumbnailDivs[i]));
		
		// allMediumThumbnailDivs[i].childNodes[1].innerHTML += " "+i;
	}
	
	// --- Funktionen
	
	this.beginWithLast = function () {
		current = numberOfImages-1;
	}
	this.beginWithFirst = function () {
		current = 0;
	}
	this.beginWith = function (start) {
		current = start;
	}
	this.getCurrent = function () {
		return current;
	}
	this.showCurrentImage = function () {
		this.sendInfosToDomObject();
	}
	this.showNextImage = function () {
		current = current + 1;
		if (current <= numberOfImages-1) {
			this.sendInfosToDomObject();
		} else {
			current = numberOfImages-1;
			urlhandler.openNextPage();
		}
	}
	this.showPrevImage = function () {
		current = current - 1;
		if (current >= 0) {
			this.sendInfosToDomObject();
		} else {
			current = 0;
			urlhandler.openPrevPage();
		}
	}
	this.sendInfosToDomObject = function () {
		domhandler.displayImage(thumbnails[current].getTitle(),thumbnails[current].getUserName(),thumbnails[current].getUserURL(),thumbnails[current].getUserLinkClass(),thumbnails[current].getImageURL(),thumbnails[current].getBigImagePath());
	}
	this.getCurrentUserURL = function () {
		return thumbnails[current].getUserURL()
	}
	this.getCurrentImageURL = function () {
		return thumbnails[current].getImageURL();
	}
	this.getCurrentId = function () {
		return current;
	}
	
	
} // ENDE: ThumbContainer

function InputHandler() {
	
	var keyLogger = new Array();
	var maxArrayLength = 20;
	var isActive = true;
	
	this.turnOn = function () {
		isActive = true;
	}
	
	this.turnOff = function () {
		isActive = false;
	}
	
	// Handelt Tastatureingaben
	this.keyPress = function (e) {
		
		if (isActive) {
			e=!e?event:e;
			tastenCode=e.keyCode?e.keyCode:e.which;
		
				
			keyLogger.unshift(tastenCode);
			if (keyLogger.length > maxArrayLength) {
				keyLogger.pop();
			}
			
			if (keyLogger.length >= 1 & keyLogger[0] == 72) { // H
				document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "<span style='color: #2e9cc0;font-weight: bold;'>H</span> E R Z";
				document.getElementById("shadowbox_infopanel").style.display = "inline";
			}
			else if (keyLogger.length >= 2 & keyLogger[0] == 69 & keyLogger[1] == 72) { // E H
				document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "<span style='color: #2e9cc0;font-weight: bold;'>H E</span> R Z";
				document.getElementById("shadowbox_infopanel").style.display = "inline";
			}
			else if (keyLogger.length >= 3 & keyLogger[0] == 82 & keyLogger[1] == 69 & keyLogger[2] == 72) { // R E H
				document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "<span style='color: #2e9cc0;font-weight: bold;'>H E R</span> Z";
				document.getElementById("shadowbox_infopanel").style.display = "inline";
			}
			else if (keyLogger.length >= 4 & keyLogger[0] == 90 & keyLogger[1] == 82 & keyLogger[2] == 69 & keyLogger[3] == 72) { // Z R E H
				document.getElementById("shadowbox_infopanel").childNodes[1].innerHTML = "<span style='color: #2e9cc0;font-weight: bold;'>H E R Z</span>";
				document.getElementById("shadowbox_infopanel").style.display = "inline";
				// Es wurde herz eingetippt
				domhandler.iLikeThisImage();
			}
			else {
				document.getElementById("shadowbox_infopanel").style.display = "none";
			}
			
			if (tastenCode==37) { thumbContainer.showPrevImage(); } // 37 = LinksTaste
			else if (tastenCode==112) { thumbContainer.showPrevImage(); } // 112 = p
			else if (tastenCode==80) { thumbContainer.showPrevImage(); } // 80 = Shift + p
			
			else if (tastenCode==39) { thumbContainer.showNextImage(); } // 39 = RechtsTaste
			else if (tastenCode==110) { thumbContainer.showNextImage(); } // 110 = n
			else if (tastenCode==78) { thumbContainer.showNextImage(); } // 78 = Shift + n
			
			else if (tastenCode==120) { domhandler.turnSBOffCleanUrl(); } // 120 = x
			else if (tastenCode==88) { domhandler.turnSBOffCleanUrl(); } // 88 = Shift + x
			else if (tastenCode==27) { domhandler.turnSBOffCleanUrl(); } // 27 = Escape
			
			else if (tastenCode==102) { urlhandler.gotoUser("foreground"); } // 102 = f
			else if (tastenCode==70) { urlhandler.gotoUser("foreground"); } // 70 = Shift + F
			
			else if (tastenCode==32) { urlhandler.gotoPhoto("foreground"); } // 32 = Space
			// else if (tastenCode==98) { urlhandler.gotoPhoto("background"); } // 98 = b
			// else if (tastenCode==66) { urlhandler.gotoPhoto("background"); } // 66 = Shift + b
			
			// alert("Taste mit Dezimalwert " + tastenCode + " gedrückt");
		}
		
	}
	
	// Handelt Mausklicks
	this.mouseClick = function (e) {
		
		if (isActive) {
			// alert("irgendeinklick");
			e=!e?window.event:e;
			// Wenn rechte Maustaste gedrückt wird
			if ((e.type && e.type == "contextmenu") || (e.button && e.button == 2) || (e.which && e.which == 3)) {
				// alert("rechtsklick");
				return false;
			}
		}
		
	}
	
} // ENDE: InputHandler

// --------------------- Hilfsfunktionen ---------------------

// Ersetzt String durch anderen String in String
function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}

// --------------------- Objectbuilder und initialisierung ---------------------

var domhandler = new DOMHandler();
var urlhandler = new URLHandler();
var inputhandler = new InputHandler();

function turnSBOnExt() {
	domhandler.turnSBOn();
	inputhandler.turnOn();
}

function turnSBOffExt() {
	domhandler.turnSBOff();
	inputhandler.turnOff();
}

if (urlhandler.getCurrentDocument() == "photobrowser") {
	urlhandler.setMaxSite(domhandler.getMaxSiteInPhotoBrowser());
} else if (urlhandler.getCurrentDocument() == "collection") {
	urlhandler.setMaxSite(domhandler.getMaxSiteInCollection());
}

if (urlhandler.getCurrentDocument() == "photobrowser" | urlhandler.getCurrentDocument() == "collection") {
	var thumbContainer = new ThumbContainer(domhandler.getAllThumbnails());
	//domhandler.drawShadowboxLink();
	domhandler.drawShadowbox();
	if (urlhandler.getURLParam("sbaction") == "next") {
		thumbContainer.beginWithFirst();
		thumbContainer.showCurrentImage();
		turnSBOnExt();
	}
	else if (urlhandler.getURLParam("sbaction") == "prev") {
		thumbContainer.beginWithLast();
		thumbContainer.showCurrentImage();
		turnSBOnExt();
	}
	else {
		thumbContainer.beginWithFirst();
		thumbContainer.showCurrentImage();
		turnSBOffExt();
	}
}

// --------------------- DOM-Editing ---------------------

// Erstellen und Anhängen von Link zum starten der Shadowbox

var listitem = document.createElement('li');					// li-Element erzeugen
var link = document.createElement('a');							// a-Element erzeugen
link.setAttribute('style','cursor:hand;');						// a-Element Attribute geben
link.addEventListener("click", turnSBOnExt, true);				// Eventhandler draufsetzen
var linktext = document.createTextNode("Shadowbox starten");	// Linktext erzeugen
link.appendChild(linktext);										// Linktext zu a-Element zufügen
listitem.appendChild(link);										// a-Element zu li-Element zufügen
document.getElementById("boxLeftColumn").childNodes[3].appendChild(listitem);	// li-Element zur letzten ul zufügen

// --------------------- TEST ---------------------


// --------------------- Tastatur abfangen ---------------------

// Eventhandler hinzufügen um Tastatureingaben abzufragen
window.addEventListener("keydown", inputhandler.keyPress, false);

// ENDE
