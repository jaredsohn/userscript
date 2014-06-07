// ==UserScript==
// @name           SpringNote Plus
// @version        1.1.2
// @namespace      RJ
// @include        http://*.springnote.com/*
// ==/UserScript==
// Written by Rafael Jafferali

// Debug information
// Adresse de la fenêtre de l'éditeur: w = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentWindow
// Adresse du document de l'éditeur : d = document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("iframe")[0].contentDocument


function findPosY(obj)
  {
    var curtop = 0;
    if(obj.offsetParent)
        while(1)
        {
          curtop += obj.offsetTop;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.y)
        curtop += obj.y;
    return curtop;
  }


function formatDate(d) {
	var s;
	s = d.getDate() + " ";
	switch (d.getMonth()) {
	case 0:
		s += "janvier ";
		break;
	case 1:
		s += "f&eacute;vrier ";
		break;
	case 2:
		s += "mars ";
		break;
	case 3:
		s += "avril ";
		break;
	case 4:
		s += "mai ";
		break;
	case 5:
		s += "juin ";
		break;
	case 6:
		s += "juillet ";
		break;
	case 7:
		s += "ao&ucirc;t ";
		break;
	case 8:
		s += "septembre ";
		break;
	case 9:
		s += "octobre ";
		break;
	case 10:
		s += "novembre ";
		break;
	case 11:
		s += "d&eacute;cembre ";
		break;
	}
	s += (1900 + d.getYear());
	return s;
}


function HotKey(e) {

	if ((e.which == 67) && e.shiftKey && e.ctrlKey) { // Ctrl + Shift + C
		if (document.baseURI.match("rafjaf") || document.baseURI.match("mln")) { // Fonction réservée à un site privé
			PasteCass();
		}
	}
	else if ((e.which == 107) && e.ctrlKey && (e.altKey || e.shiftKey)) { // Ctrl + Alt + K
		SmallCaps();
	}
	else {
		return;
	}
}

function PasteCass() {
	
	var s = window.getSelection().getRangeAt(0);
	if (!s)
		return;
	
	var url = prompt("Quelle est l'adresse de l'arret de cassation ?");
	
	var dummyDate = new Date(0);
        dummyDate.setYear(url.slice(56, 60));
        dummyDate.setMonth(url.slice(60, 62) - 1);
        dummyDate.setDate(url.slice(62, 64));
        var d = formatDate(dummyDate);
	
	var n = document.createElement("span");
	n.innerHTML = "Cass., <a href='" + url + "'>" + d + "</a>, <i>Pas.</i>, " + (dummyDate.getYear() + 1900) + ", " + ((dummyDate.getYear() < 100) ? "I, " : "") + "n\u00B0";
	s.insertNode(n);
	
}

function SmallCaps() {

	var s = window.getSelection();
	if (s == "") {
		return;
	}
	
	var r = s.getRangeAt(0);
	var selContent = r.extractContents();
	var sp = document.createElement("span");
	sp.style.fontVariant = "small-caps";
	sp.appendChild(selContent);
	r.insertNode(sp);

}

function ProcessRead() {
	
	var contentMaxWidth = window.innerWidth - parseInt(window.getComputedStyle(document.getElementById("sub"), null).width) - 75 + "px";
	var myCss = '#container {width: auto ! important;} #main {width: ' + contentMaxWidth + '! important; margin-left: 10px ! important;} #contentContainer {width: auto ! important;}' ;

	var toc = document.getElementById("toc");
	if (toc) {
		var pageNavH = window.innerHeight - findPosY(document.getElementById("page-navigation")) - 10 + "px";
		var containerH = window.innerHeight - findPosY(document.getElementById("contentContainer")) + 24 + "px";
		toc.style.display = "none";
		var toc2 = toc.cloneNode(true);
		toc2.setAttribute("id", "toc2");
		toc2.removeChild(toc2.firstChild); toc2.removeChild(toc2.firstChild);
		toc2.removeChild(toc2.firstChild); toc2.removeChild(toc2.firstChild);
		toc2.setAttribute("style", "float: left; height: " + containerH + "; width: 250px; overflow: auto; background-color: rgb(255, 255, 250); border: 1px solid tan;");
		document.getElementsByClassName("content-wrapper")[0].insertBefore(toc2, document.getElementById("contentContainer"));
		document.getElementById("contentContainer").firstChild.nextSibling.style.marginLeft = "5px";
		var q = document.querySelectorAll("a.anchor");
		for (var i = 0; i < q.length; i++) 
			if (q[i].style.visibility != "hidden") 
				q[i].style.visibility = "hidden"; 
		myCss += '.sibling-page {display: none ! important;} #sub #page-navigation #titles h2 {width: 70px ! important;} #sub #page-navigation #titles h2.on {width: 70px ! important} #page-navigation {overflow-x: hidden ! important; overflow-y: auto ! important; height: ' + pageNavH + ' ! important ;} #container {margin: 27px 20px 0px 20px ! important} #contentContainer {overflow: auto ! important; height: ' + containerH +' ! important; margin: 0 27px 0 ! important;} .external {color: #568942 !important; text-decoration: underline;}' ;
		myCss += "#toc2 ol {padding-left: 20px;} #toc2 ol ol ol ol {list-style-type: upper-roman;} #toc2 ol ol ol ol ol {list-style-type: upper-latin;} #toc2 ol ol ol ol ol ol {list-style-type: decimal;} #toc2 ol ol li {color: blue} #toc2 ol ol ol li {color: red}  #toc2 ol ol ol ol li {color: black}";
	}

	myCss += '#contentContainer h2 {margin-left: 0.5cm ! important;} #contentContainer h3 {margin-left: 1cm ! important;}  #contentContainer h4 {margin-left: 1.5cm ! important;}  #contentContainer h5 {margin-left: 2cm ! important;}  #contentContainer h6 {margin-left: 2.5cm ! important;} #contentContainer h1 {counter-increment: ch1; counter-reset: ch2;} #contentContainer h2 {counter-increment: ch2; counter-reset: ch3;} #contentContainer h3 {counter-increment: ch3; counter-reset: ch4;} #contentContainer h4 {counter-increment: ch4; counter-reset: ch5;} #contentContainer h5 {counter-increment: ch5; counter-reset: ch6;} #contentContainer h6 {counter-increment: ch6;} #contentContainer h1:before {content: counter(ch1)". ";} #contentContainer h2:before {content: counter(ch1)"."counter(ch2)" ";} #contentContainer h3:before {content: counter(ch1)"."counter(ch2)"."counter(ch3)" ";} #contentContainer h4:before {content: counter(ch4, upper-roman)". ";} #contentContainer h5:before {content: counter(ch5, upper-latin)". ";} #contentContainer h6:before {content: counter(ch6)")";}';
	GM_addStyle(myCss);
}

function ProcessEdit() {

	
	// Test required because of the treatment of tabs loaded in the background in Firefox 5
	if (document.body.innerHTML == "<br>") {
		top.top.window.setTimeout(ProcessEdit, 1000);
		return;
	}
	
	var myCss = 'h2 {margin-left: 0.5cm ! important;} h3 {margin-left: 1cm ! important;}  h4 {margin-left: 1.5cm ! important;}  h5 {margin-left: 2cm ! important;}  h6 {margin-left: 2.5cm ! important;} h1 {counter-increment: ch1; counter-reset: ch2;} h2 {counter-increment: ch2; counter-reset: ch3;} h3 {counter-increment: ch3; counter-reset: ch4;} h4 {counter-increment: ch4; counter-reset: ch5;} h5 {counter-increment: ch5; counter-reset: ch6;} h6 {counter-increment: ch6;} h1:before {content: counter(ch1)". ";} h2:before {content: counter(ch1)"."counter(ch2)" ";} h3:before {content: counter(ch1)"."counter(ch2)"."counter(ch3)" ";} h4:before {content: counter(ch4, upper-roman)". ";} h5:before {content: counter(ch5, upper-latin)". ";} h6:before {content: counter(ch6)") ";}';

	if (document.getElementById("toc")) {
		myCss += "body {margin-left: 270px ! important;} #toc {height: " + window.innerHeight + "px ! important; overflow: auto ! important; position: fixed ! important; left: 12px ! important; width: 250px ! important;}";
		myCss += "a.anchor {visibility: hidden ! important;}";
		myCss += "#toc ol {padding-left: 15px;} #toc ol ol ol ol {list-style-type: upper-roman;} #toc ol ol ol ol ol {list-style-type: upper-latin;} #toc ol ol ol ol ol ol {list-style-type: decimal;}";
		myCss += "#toc ol ol li {color: blue} #toc ol ol ol li {color: red}  #toc ol ol ol ol li {color: black}"
	} 
	
	// Efface les traces laissées pour les iframes de GreaseMonkey Shell
	var q = document.querySelectorAll("img.xqlayer");
	for (var i = 0; i < q.length; i++) 
		q[i].parentNode.parentNode.removeChild(q[i].parentNode);

	// Surveille le clavier
	document.addEventListener("keypress", HotKey, false);
	
	// Corrige un bug de Firefox 5.0 (sinon, les liens de la TOC reloadent la page)
	if ((navigator.appCodeName == "Mozilla") && (navigator.appVersion.match("5.0"))) {
		document.getElementsByTagName('base')[0].href = top.top.location;
	}
	
	GM_addStyle(myCss);
}


//MAIN

if (document.getElementById("xhtmlEditorContainer") && (!document.title))
	ProcessEdit();
else if (document.getElementsByClassName('write-button').length)
	ProcessRead();
