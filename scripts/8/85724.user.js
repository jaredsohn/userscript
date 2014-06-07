// ==UserScript==
// @name           MegaFetch
// @namespace      vcnet
// @description    fetch from megaupload
// @include        http://www.megaupload.com/?d*
// @include        http://www.megaupload.com/?c=multifetch
// ==/UserScript==

//ORIGINAL SCRIPT INFO
// ==UserScript==
// @name           Uploader link Collect
// @author      ionbladez
// @version	2010-08-23
// @description    Grabs urls from multiple upload/filesharing sites and displays them in a neat box in the corner of your browser.
// @include        http://*
// ==/UserScript==
//ADAPTED FOR PERSONAL USE BY CWAL
//THANKS TO IONBLADEZ

	
	var promptMe = false;
	var boxFont = "font-family: Arial; font-size: 11px;";	 // css only, please
	var titleFont = "font-family: Tahoma; font-size: 13px;"; 	// same as above.
	var buttonStyle = 'color: black; background-color: white;';
	var boxStyle = 'padding: 1px; font-family: Arial; font-size: 11px;';
	var titleText = "";
	var doWhat;
	var linkList = '<input type="text" size="160" readonly="readonly" onClick=select() value="';
	var linkList2 = "";
	var boxstyle = 'position: fixed; bottom: 0px; left: 0px; border: none 1px black; background-color: white; color: black; width: 100% !important; opacity: 0.95; z-index: 100;';
	var divBox = document.createElement("div");
	var boxHeight = 175;

var slidF = document.createElement('div');
	slidF.innerHTML = unescape('%09%3Cscript%20type%3D%22text/javascript%22%3E%0A%09var%20cst%20%3D%20320%3B%0A%09var%20to%20%3D%20-20%3B%0A%09function%20slideDown%28%29%20%7B%0A%09if%20%28cst%21%3Dto%29%20var%20timerid%20%3D%20setTimeout%28%22doSlide%28%29%22%2C%20200%29%3B%0A%09%7D%0A%0A%09function%20doSlide%28%29%20%7B%0A%09cst--%3B%0A%09document.getElementById%28%22dllist%22%29.setAttribute%28%22style%22%2C%20%22bottom%3A%20%22%20+%20cst%20+%20%22px%3B%22%29%3B%0A%09slideDown%28%29%3B%0A%09%7D%0A%0A%09function%20tB%28%29%20%7B%0A%09var%20tl%20%3D%20document.getElementById%28%22linkbox%22%29%3B%0A%09var%20dl%20%3D%20document.getElementById%28%22dltext%22%29%3B%0A%09if%20%28tl.style.display%3D%3D%22none%22%29%20%7B%0A%09dl.style.display%20%3D%20%22none%22%3B%0A%09tl.style.display%20%3D%20%22%22%3B%0A%09%7D%20else%20%7B%0A%09tl.style.display%20%3D%20%22none%22%3B%0A%09dl.style.display%3D%22%22%3B%0A%09%7D%0A%09%7D%0A%09%3C/script%3E');

	
	document.body.appendChild(slidF);

	var howMany = collectLinks();
	if (howMany > 0 || linkList.length > 0) {
	if (promptMe==true) doWhat = prompter();
	if (doWhat == true) {
	showBox();
	}
	if (promptMe==false) {
	// continue to grab links if prompting is disabled.
	showBox();
	}
	} 

	function collectLinks() {
	var foundLinks = 0;
	var sp = "^http://[^/]*(megaupload)\.(com)/files/";
	for (var i2=0; i2 < document.getElementsByTagName("a").length; i2++) {
	var innertext = document.getElementsByTagName("a")[i2].href;
	var innerHTML = document.getElementsByTagName("a")[i2].innerHTML;
	if (innertext.search(sp)>-1) {
	foundLinks++;
	linkList += '' + '' + innertext + '"<p><a style="color: white; align: center;" href="multifetch"><img src="http://img517.imageshack.us/img517/5310/fetch2.gif"></a></p>' + "</td></tr>\r\n\n";

	linkList2 += '' + '' + innertext + "</td></tr>\r\n\n"; 
	}
	}
	return foundLinks;
	}


	function prompter() {
	var x = window.confirm("I have found some upload links, would you like to view them?");
	if (x) {
	return true;
	} else {
	return false;
	}
	}


	function showBox() {
	divBox.setAttribute("id", "dllist");
	divBox.setAttribute("name", "dllist");
	divBox.setAttribute("style", boxstyle);

	var innerHTML2 = '    <span style="' + titleFont + '" align="center"><font color="#ff0000"><strong>' + titleText + '</strong></font></span><span style="align: center; position: absolute; right: 2px; top: 2px;" align="center"> <small><a href="#"onclick="slideDown();">[x]</small></a></span><br>' + "\r\n";


	innerHTML2 += '	   <table width="100%" border=0 cellpadding=1 cellspacing=3 id="dltext" name="dltext" style="' + boxFont + ' text-align: center; width: 100%;">';
	innerHTML2 += linkList;
	innerHTML2 += '    </table></div>';
	divBox.innerHTML = innerHTML2;
	document.body.appendChild(divBox);
	}
content.document.getElementById('description').value = 'description';
content.document.getElementById('fetchurl').value = "";
document.getElementById('fetchurl').focus();