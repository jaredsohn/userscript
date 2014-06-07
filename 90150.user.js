// ==UserScript==
// @name           otrkeyfinder.com Ergebnis Filter
// @namespace      http://userscripts.org/users/99643
// @description    filtert die Ergebnisse von otrkeyfinder.com
// @include        http://www.otrkeyfinder.com
// @include        http://otrkeyfinder.com
// @include        http://www.otrkeyfinder.com/
// @include        http://otrkeyfinder.com/
// @include        http://www.otrkeyfinder.com/index.php?search=*
// @include        http://www.otrkeyfinder.com/?search=*
// @include        http://otrkeyfinder.com/index.php?search=*
// @include        http://otrkeyfinder.com/?search=*
// @version        0.1
// ==/UserScript==

//Settings
var filterType = new Array();
var tmp_always = getCookie("filter_always");
if(tmp_always == "true"){
	filterType["always"] = true;
}else{
	filterType["always"] = false;
}
var tmp_empty = getCookie("filter_empty");
if(tmp_empty == "true"){
	filterType["empty"] = true;
}else{
	filterType["empty"] = false;
}
var tmp_avi = getCookie("filter_avi");
if(tmp_avi == "true" ){
	filterType["avi"] = true;
}else{
	filterType["avi"] = false;
}
var tmp_mp4 = getCookie("filter_mp4");
if(tmp_mp4 == "true"){
	filterType["mp4"] = true;
}else{
	filterType["mp4"] = false;
}
var tmp_hq = getCookie("filter_hq");
if(tmp_hq == "true"){
	filterType["hq"] = true;
}else{
	filterType["hq"] = false;
}
var tmp_hd = getCookie("filter_hd");
if(tmp_hd == "true"){
	filterType["hd"] = true;
}else{
	filterType["hd"] = false;
}
var tmp_ac3 = getCookie("filter_ac3");
if(tmp_ac3 == "true"){
	filterType["ac3"] = true;
}else{
	filterType["ac3"] = false;
}
var tmp_mkv = getCookie("filter_mkv");
if(tmp_mkv == "true"){
	filterType["mkv"] = true;
}else{
	filterType["mkv"] = false;
}

var boxContent = document.getElementsByClassName("boxContent")[1];
boxContent.style.minHeight = "42px";
var header = boxContent.firstElementChild;
//header.innerHTML = header.innerHTML+' <a href="#" onClick="showFilterSettings()">Filter</a>';
var filter = document.createElement("a");
filter.href = "#";
filter.setAttribute("onclick","$('#filterPanel').slideToggle('slow');return false;");
filter.innerHTML = "Ergebnisse filtern";
filter.style.cssFloat = "right";
filter.style.paddingTop = "8px";
filter.style.paddingRight = "8px";
filter.style.fontSize = "12px";

var noFilter = document.createElement("a");
noFilter.href = "#";
noFilter.id = "noFilter";
noFilter.style.display = "none";
noFilter.setAttribute("onclick","noFilter();return false;");
noFilter.innerHTML = "X";
noFilter.title = "Filter entfernen";
noFilter.style.cssFloat = "right";
noFilter.style.paddingTop = "8px";
noFilter.style.paddingRight = "8px";
noFilter.style.paddingLeft = "8px";
noFilter.style.fontSize = "12px";

var filterCount = document.createElement("span");
filterCount.id = "filterCount";
filterCount.style.cssFloat = "left";
filterCount.style.paddingTop = "8px";
filterCount.style.paddingRight = "8px";
filterCount.style.paddingLeft = "8px";
filterCount.style.fontSize = "12px";

header.style.cssFloat = "left";

var filterPanel = document.createElement("div");
filterPanel.id = "filterPanel";
filterPanel.style.clear = "both";
filterPanel.style.paddingLeft = "15px";
filterPanel.style.paddingBottom = "15px";
filterPanel.innerHTML = '<table style="border:0px;padding:0px;"><tr><td colspan="3"><input id="filter_always" type="checkbox" '+((filterType["always"])?'checked="checked" ':'')+'/>Automatisch Filtern <br /></td></tr><tr><td colspan="3"><b>Folgende Dateien ausblenden:</b></td></tr><tr><td colspan="3"><input id="filter_empty" type="checkbox" '+((filterType["empty"])?'checked="checked" ':'')+'/>nicht mehr verfügbare Dateien <td></tr><tr><td style="width:60px;"><input id="filter_avi" type="checkbox" '+((filterType["avi"])?'checked="checked "':'')+'/><span class="avi">avi</span> <br/><input id="filter_mp4" type="checkbox" '+((filterType["mp4"])?'checked="checked" ':'')+'/><span class="mp4">mp4</span> <br/><input id="filter_hq" type="checkbox"  '+((filterType["hq"])?'checked="checked" ':'')+'/><span class="hq">HQ</span> </td><td><input id="filter_hd" type="checkbox" '+((filterType["hd"])?'checked="checked" ':'')+'/><span class="hd">HD</span> <br/><input id="filter_ac3" type="checkbox" '+((filterType["ac3"])?'checked="checked" ':'')+'/><span class="ac3">ac3</span> <br/><input id="filter_mkv" type="checkbox" '+((filterType["mkv"])?'checked="checked" ':'')+'/><span class="mkv">mkv</span></td><td style="vertical-align:bottom;" align="center"><input id="filterButton" type="submit" onclick="filter();" value="OK"/></td></tr></table> ';
filterPanel.style.display = "none";

header.parentNode.insertBefore(filterPanel,header.nextElementSibling);
header.parentNode.insertBefore(filterCount,filterPanel);
header.parentNode.insertBefore(noFilter,filterPanel);
header.parentNode.insertBefore(filter,filterPanel);

var pages = document.getElementsByClassName("pages");
if(pages.length > 0){
	var pagination = pages[0];
	pagination.style.clear = "both";
}

var script = 'function filter(){'+
'	var filterArray = new Array();\n'+
'	filterArray["always"] = document.getElementById("filter_always").checked;\n'+
'	filterArray["empty"] = document.getElementById("filter_empty").checked;\n'+
'	filterArray["avi"] = document.getElementById("filter_avi").checked;\n'+
'	filterArray["mp4"] = document.getElementById("filter_mp4").checked;\n'+
'	filterArray["hq"] = document.getElementById("filter_hq").checked;\n'+
'	filterArray["hd"] = document.getElementById("filter_hd").checked;\n'+
'	filterArray["ac3"] = document.getElementById("filter_ac3").checked;\n'+
'	filterArray["mkv"] = document.getElementById("filter_mkv").checked;\n'+
'	var results = document.getElementsByClassName("searchResult");\n'+
'	var count = 0;\n'+
'	for (var i = 0; i < results.length; i++) {\n'+
'		var result = results[i];\n'+
'		if(result.lastElementChild.firstElementChild.firstElementChild.innerHTML=="(0)"){\n'+
'			if(filterArray["empty"]){\n'+
'				result.style.display = "none";\n'+
'				result.nextElementSibling.style.display = "none";\n'+
'				count++;\n'+
'				continue;\n'+
'			}else{\n'+
'				result.style.display = "block";\n'+
'			}\n'+
'		}\n'+
'		var type = result.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.className;\n'+
'		if(filterArray[type]){\n'+
'			result.style.display = "none";\n'+
'			result.nextElementSibling.style.display = "none";\n'+
'			count++;\n'+
'		}else{\n'+
'			result.style.display = "block";\n'+
'		}\n'+
'	}\n'+
'	if(results.length==1){\n'+
'		result.nextElementSibling.style.display = result.style.display'+
'	}\n'+
'	$("#filterPanel").slideUp("slow");\n'+
'	document.getElementById("noFilter").style.display = "block";\n'+
'	document.getElementById("filterCount").innerHTML="("+count+" Datei"+((count>1||count==0)?"en":"")+" gefiltert)";\n'+
'	setCookie("filter_always", filterArray["always"], 365);\n'+
'	setCookie("filter_empty", filterArray["empty"], 365);\n'+
'	setCookie("filter_avi", filterArray["avi"], 365);\n'+
'	setCookie("filter_mp4", filterArray["mp4"], 365);\n'+
'	setCookie("filter_hq", filterArray["hq"], 365);\n'+
'	setCookie("filter_hd", filterArray["hd"], 365);\n'+
'	setCookie("filter_ac3", filterArray["ac3"], 365);\n'+
'	setCookie("filter_mkv", filterArray["mkv"], 365);\n'+
'}\n'+
'function noFilter(){\n'+
'	var results = document.getElementsByClassName("searchResult");\n'+
'	for (var i = 0; i < results.length; i++) {\n'+
'		var result = results[i];\n'+
'		result.style.display = "block";\n'+
'	}\n'+
'	if(results.length==1){\n'+
'		result.nextElementSibling.style.display = result.style.display'+
'	}\n'+
'	document.getElementById("noFilter").style.display = "none";\n'+
'	document.getElementById("filterCount").innerHTML="";\n'+
'	$("#filterPanel").slideUp("slow");\n'+
'}\n'+
'//allows to store the current value of the browsemode in a cookie\n'+
'function setCookie(c_name, value, expiredays) {\n'+
'	//code for this function taken from: www.w3schools.com/js/js_cookies.asp\n'+
'	var exdate = new Date();\n'+
'	exdate.setDate(exdate.getDate() + expiredays);\n'+
'	document.cookie = c_name\n'+
'			+ "="\n'+
'			+ escape(value)\n'+
'			+ ";path=/"\n'+
'			+ ((expiredays == null) ? "" : ";expires="\n'+
'					+ exdate.toUTCString());\n'+
'};\n';

//allows to read the current value of the browsemode in a cookie
function getCookie(c_name){
	//code for this function taken from: www.w3schools.com/js/js_cookies.asp
    if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
};

//add functions to header
var header = document.getElementsByTagName('head')[0];
var scriptelement = document.createElement('script');
scriptelement.type = 'text/javascript';
scriptelement.innerHTML = script;
header.appendChild(scriptelement);

if(filterType["always"]){
	     setTimeout(function(){document.getElementById('filterButton').click();},100);
}