// ==UserScript==
// @name           iGoogle - Change Theme Image
// @namespace      GoogleCycleThroughThemes
// @description    Change between theme images
// @include        http://www.google.com/ig?hl=en*
// ==/UserScript==



var oldheader = document.getElementById("guser").innerHTML;
document.getElementById("guser").innerHTML = "Current Theme:&nbsp;<span id='currentTheme'></span>&nbsp;&nbsp;<a href='javascript:changeCSS(0);'>Previous Theme</a>&nbsp|&nbsp<a href='javascript:changeCSS(1);'>Next Theme</a>&nbsp|&nbsp" + oldheader ;


var currentcss = document.getElementById("ext_css").href
var positionoflastslash = 0
positionoflastslash = (currentcss.lastIndexOf("/"));
var positionofunderscore = 0
positionofunderscore = (currentcss.lastIndexOf("_"));
var skinname = currentcss.substring(positionoflastslash + 1, positionofunderscore);
var skinname = skinname.replace("_", "");
var timeref = currentcss.substr(positionofunderscore + 1 ,(currentcss.length));


document.getElementById('currentTheme').innerHTML="<b>" + skinname.toUpperCase()   + "&nbsp;" + timeref.substring(0, timeref.lastIndexOf(".")) + "</b>";







unsafeWindow.changeCSS = function (direction){
	
	var currentcss = document.getElementById("ext_css").href
	var positionoflastslash = 0
	positionoflastslash = (currentcss.lastIndexOf("/"));
	var positionofunderscore = 0
	positionofunderscore = (currentcss.lastIndexOf("_"));
	var skinname = currentcss.substring(positionoflastslash + 1, positionofunderscore);
	var skinname = skinname.replace("_", "");
	var timeref = currentcss.substr(positionofunderscore + 1 ,(currentcss.length));
	//alert(skinname );


	//alert(timeref);
	if (timeref == "10am.css"){
		prev_timeref = "8am.css";
		next_timeref = "noon.css";	
	}else if (timeref == "noon.css"){
		prev_timeref = "10am.css";
		next_timeref = "2pm.css";	
	}else if (timeref == "2pm.css"){
		prev_timeref = "noon.css";
		next_timeref = "4pm.css";
	}else if (timeref == "4pm.css"){
		prev_timeref = "2pm.css";
		next_timeref = "6pm.css";	
	}else if (timeref == "6pm.css"){
		prev_timeref = "4pm.css";
		next_timeref = "8pm.css";	
	}else if (timeref == "8pm.css"){
		prev_timeref = "6pm.css";
		next_timeref = "10pm.css";	
	}else if (timeref == "10pm.css"){
		prev_timeref = "8pm.css";
		next_timeref = "midnight.css";	
	}else if (timeref == "midnight.css"){
		prev_timeref = "10pm.css";
		next_timeref = "2am.css";
	}else if (timeref == "2am.css"){
		prev_timeref = "midnight.css";
		next_timeref = "3.14am.css";
	}else if (timeref == "3.14am.css"){
		prev_timeref = "2am.css";
		next_timeref = "4am.css";
	}else if (timeref == "4am.css"){
		prev_timeref = "3.14am.css";
		next_timeref = "6am.css";
	}else if (timeref == "6am.css"){
		prev_timeref = "4am.css";
		next_timeref = "8am.css";	
	}else if (timeref == "8am.css"){
		prev_timeref = "6am.css";
		next_timeref = "10am.css";
	}
	

	prev_Link = "/ig/skins/" + skinname + "/" + skinname + "_" + prev_timeref ;
	next_Link = "/ig/skins/" + skinname + "/" + skinname + "_" + next_timeref ;
	
	
		
	if (direction == 0){
		//alert(prev_Link);
		document.getElementById("ext_css").href=""+prev_Link +"";
		document.getElementById('currentTheme').innerHTML="<b>" + skinname.toUpperCase()   + "&nbsp;" + prev_timeref.substring(0, prev_timeref.lastIndexOf(".")) + "</b>";
	}else if (direction == 1){
		//alert(next_Link);
		document.getElementById('ext_css').href="" + next_Link + "";
		document.getElementById('currentTheme').innerHTML="<b>" + skinname.toUpperCase()   + "&nbsp;" + next_timeref.substring(0, next_timeref.lastIndexOf(".")) + "</b>";

	}
	
	
}
