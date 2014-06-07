// ==UserScript==
// @name           FB Filters
// @namespace      *.facebook.com
// @include        http://*facebook.com/*
// @description    Adds Filters For Your Applications on Facebook
// ==/UserScript==

var filtersHolder = document.createElement('div');
if(document.getElementById('navigation_item_ff')) {document.getElementById('navigation_item_ff').appendChild(filtersHolder);}
else if(document.getElementById('navigation_item_nf')) {document.getElementById('navigation_item_nf').appendChild(filtersHolder);}

filtersHolder.id='gm_filtersHolder';

refreshFilters();

function refreshFilters() {
document.getElementById('gm_filtersHolder').innerHTML="<div class=\"clearfix uiHeader uiHeaderNav online_header uiHeaderTopBorder\"><div class=\"lfloat\"><h4>Filters<\/h4><a href='#' id='addFilter'><h4 style='position:absolute; top:36px; right:5px;'>+</h4></a><a href='#' id='removeFilter'><h4 style='position:absolute; top:36px; right:18px;'>-</h4></a><\/div>";

var numFilters = GM_getValue('numFilters');
if(!numFilters) { numFilters = 4;  GM_setValue('numFilters', '4');}

var editFilter = 'false';
var eventListeners=new Array();
for(i=1; i<=numFilters; i++) {
var filterId = GM_getValue('filterId_'+i);
var filterName = GM_getValue('filterName_'+i);
if(!filterName) {filterName = "No Filter";};
var icon = GM_getValue('icon'+i);
if(!icon) {var icon = 'http://radicalpi.net/hosted/scripts/missing_icon.png'; }
document.getElementById('gm_filtersHolder').innerHTML+="<a id='filterLink"+i+"' class=\"item\" \"><span class=\"imgWrap\"><img id='filters_icon_"+i+"' class=\"img\" src=\""+icon+"\" \/><\/span><span id='testSpan"+i+"'>"+filterName+"<span id='filterImg"+i+"' style='position:absolute; right:5px; width:12px; height:12px; background-image:url(null); background-repeat:no-repeat;'></span></span></a>";
eventListeners[i] = i;
}

for (var i = 1; i < eventListeners.length; i++) {
    let item = eventListeners[i];
	let filterId = GM_getValue('filterId_'+item);
	
	//document.getElementById(item).addEventListener('mouseover', function(){alert(item);}, true);

	document.getElementById('filterLink'+item).addEventListener('mouseover', function(){showEdit(filterName, 'filterImg'+item);}, false);
	document.getElementById('filterLink'+item).addEventListener('mouseout', function(){hideEdit(filterName, 'filterImg'+item);}, false);
	document.getElementById('filterLink'+item).addEventListener('click', function(){if(editFilter!='true') {location.href='http://facebook.com/?sk=app_'+filterId;} editFilter='false';}, false);

	document.getElementById('filterImg'+item).addEventListener('mouseover', function(){editFilter='true';}, false);
	document.getElementById('filterImg'+item).addEventListener('click', function(){setFilter(item);}, false);
}


document.getElementById('addFilter').addEventListener('click', function(){if(numFilters < 20) {numFilters++; GM_setValue('numFilters', numFilters); refreshFilters();}else{ alertalert('A Maximum of 20 Filters is Allowed');}}, false);
document.getElementById('removeFilter').addEventListener('click', function(){if(numFilters > 1) {numFilters--; GM_setValue('numFilters', numFilters); refreshFilters();}else{ alert('A Minimum of 1 Filter is Required');}}, false);
}


function setFilter(i) {
filter = prompt('Enter URL for Filter #'+i, document.location);

if(filter.indexOf('apps.facebook.com') != -1) {
document.getElementById('filters_icon_'+i).src = "http://b.static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif";

getIcon(filter, i);

} else {
alert('Only apps.facebook.com links are supported at this time.');
filter="";
setFilter(i);
}

}

function getIcon(target, i) {

GM_xmlhttpRequest({
    method: 'GET',
    url: target,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
		value = responseDetails.responseText;
		title = value.split("<title>");
		if(value.indexOf('Page Not Found') != -1) {
		showPopup("Error Adding Filter", "The App Cannot Be Found", 0);
		var img = 'http://radicalpi.net/hosted/scripts/missing_icon.png';
		target="#";

		} else if(value.indexOf('Log in to') != -1) {
		showPopup("Error Adding Filter", "Allow Access Before Adding Filter", 0);
		var img = 'http://radicalpi.net/hosted/scripts/missing_icon.png';
		target="#";
		
		} else if(value.indexOf('Login |') != -1) {
		showPopup("Error Adding Filter", "Please login to Facebook", 0);
		var img = 'http://radicalpi.net/hosted/scripts/missing_icon.png';
		target="#";

		} else {
			title = title[1].split("on Facebook");
			value1 = value.split("<link rel=\"shortcut icon\" href=\"");
			imgSrc = value1[1].split("\" /></head>");
			value2 = value.split("<div id=\"app_content_");
			filterId = value2[1].split("\"");
			document.getElementById('filters_icon_'+i).src = imgSrc[0];
			showPopup("New Filter Added", "<img src='"+imgSrc[0]+"'>&nbsp;"+title[0], 0);
			var img = imgSrc[0];
			}
		
		GM_setValue('filterName_'+i, title[0]);
		GM_setValue('filterId_'+i, filterId[0]);
		GM_setValue('icon'+i, img);
		setTimeout(function() {refreshFilters();}, 0);
		}
});

}



function showPopup(title, message, value) {

if(value == 0) {
document.getElementById('gm_popupHolder').innerHTML="<div id='gm_popup' style='position:fixed; left:10px; bottom:30px; width:180px; height:40px; background-color:#D8DFEA; border:1px solid #526EA6; -moz-border-radius:5px; padding:4px;'><b>"+title+"</b></div>"
document.getElementById('gm_popup').innerHTML+="<a href='#' id='closePopup'><div style='position:absolute; top:0px; right:4px; color:#526EA6'>X</div></a>";
document.getElementById('gm_popup').innerHTML+="<div style='height:6px;'></div>&nbsp;&nbsp;&nbsp;&nbsp;"+message+"</div>";
}

if(value < 1.1 && value > .1) {
document.getElementById('gm_popupHolder').style.opacity=value;
value+=.1;
setTimeout(function() {showPopup('null', 'null', value);}, 50);
} else {
document.getElementById('closePopup').removeEventListener('click', function() {closePopup(0.9);}, false );
document.getElementById('closePopup').addEventListener('click', function() {closePopup(0.9);}, false );
closeTimeout = setTimeout(function() {closePopup(0.9);}, 5000);
}

}

function closePopup(value) {
clearTimeout(closeTimeout);

if(value > -.1) {
document.getElementById('gm_popupHolder').style.opacity=value;
value-=.1;
setTimeout(function() {closePopup(value);}, 75);
} else {
document.getElementById('closePopup').removeEventListener('click', function() {closePopup(0.9);}, false );
document.getElementById('gm_popupHolder').innerHTML="";
}
}

function showEdit(title, target) {
document.getElementById(target).style.backgroundImage="url(http://radicalpi.net/hosted/scripts/config_icon.png)";

}

function hideEdit(title, target) {

document.getElementById(target).style.backgroundImage="url(null)";

}

