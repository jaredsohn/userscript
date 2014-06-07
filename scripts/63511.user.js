// ==UserScript==
// @name           Ikariam map view
// @include	http://s*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*
// ==/UserScript==


function applyLayout() {
	GM_addStyle('#friends li .name	{left:74px;}');
	GM_addStyle('#friends li .clan	{left:74px;}');
	GM_addStyle('#friends .sendmsg {left:54px; top:2px;}');
	GM_addStyle('#friends .delmsg {left:54px; top:20px}');
	GM_addStyle('#friends li {left:-11px;} !important');
	GM_addStyle('#friends li {max-width:180px;} !important');
};

function layoutRight() {
	GM_setValue("layout","right");
};
function layoutLeft() {
	GM_setValue("layout","left");
};

function exportURLs() {
	var str = getImageURL('slot0');
	for( var i=1; i<12; i++) {
		str += ',' + getImageURL('slot'+i);
	};
	alert(str);
};

function importURLs() {
	var str = prompt('friends urls');
	var url = str.split(",");
	for( var i=0; i<url.length && i<12; i++) {
		if (url[i].length>0) { setImageURL('slot'+(i), url[i]) };
	};
	main();
};

function getImageURL(slot) {
	var url = GM_getValue(document.domain + slot,"");
	return url;
};

function setImageURL(slot, url) {
	GM_setValue(document.domain + slot, url);
};

function addButtonTo(node) {
	var div = node.getElementsByTagName('div');
	if (div.length>2) {
		var slotNum = parseInt( div[1].innerHTML )-1;
		var slot = 'slot' + slotNum;
		var url = getImageURL(slot);
		if (!url == "") { div[0].innerHTML='<img width="34px" height="34px" src="'+url+'">' };
		div[0].addEventListener('click', function () {imageFor(div[2].innerHTML, slot, url, div[0])}, false );
	}
};

function imageFor(username, slot, urlOld, div) {
	var url = prompt(username, urlOld);
	setImageURL(slot, url);
	if (url == "") { div.innerHTML='' }
	else { div.innerHTML='<img width="34px" height="34px" src="'+url+'">'};
};

function main() {
	//layoutLeft();
        GM_registerMenuCommand("import friends", importURLs);
	GM_registerMenuCommand("export friends", exportURLs);
	if (GM_getValue("layout","right")=="right") {
		applyLayout();
		GM_registerMenuCommand("layout friends inside", layoutLeft);
	} else {
		GM_registerMenuCommand("layout friends outside", layoutRight);
	};
	var li = document.getElementById("friends").getElementsByTagName('li');
	for (var i=0; i<li.length; i++) {
		addButtonTo(li[i]);
	};
};

GM_registerMenuCommand("import friends", importURLs);
GM_registerMenuCommand("export friends", exportURLs);
main();
//------
function option(titre, message, nom) {
    actuel = "Activer";
    if (GM_getValue(nom)) {
        actuel = "Desactiver";
    }
    GM_registerMenuCommand(actuel + " " + titre, fonction);

    function fonction() {
        if (confirm("Voulez vous vraiment " + actuel + " " + message)) {
            if (GM_getValue(nom)) {
                GM_setValue(nom, false);
            } else {
                GM_setValue(nom, true);
            }

        }

        location.reload();

    }
    document.getElementById('friends').style.left="-30px";
    document.getElementById('friends').style.top="150px";
    document.getElementById('navigation').style.zIndex = 0;
    document.getElementById('cityNav').style.zIndex = 2;
    document.getElementById('cityResources').style.zIndex = 1;
}
option("for b_p", "wanna a big map?", "defaut");

nodediv = document.createElement("div");
nodediv.setAttribute('id', 'bigmap');



document.body.appendChild(nodediv);
if (GM_getValue("defaut")) {
    document.getElementById("scrollcover").style.overflow = "visible";
    document.getElementById("map1").style.cursor = "default";
    document.getElementById("dragHandlerOverlay").style.border = "5px solid black";
    document.getElementById("dragHandlerOverlay").style.opacity = "0.1";
    document.getElementById('bigmap').innerHTML = "<div id='bigmap1' style='display:none;position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"breadcrumbs\").style.display=\"none\";document.getElementById(\"friends\").style.display=\"none\";document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"breadcrumbs\").style.display=\"block\"document.getElementById(\"friends\").style.display=\"block\";document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
} else {
    document.getElementById('bigmap').innerHTML = "<div id='bigmap1' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;' onclick='document.getElementById(\"breadcrumbs\").style.display=\"none\";document.getElementById(\"friends\").style.display=\"none\";document.getElementById(\"bigmap1\").style.display=\"none\";document.getElementById(\"bigmap2\").style.display=\"block\";document.getElementById(\"scrollcover\").style.overflow=\"visible\";document.getElementById(\"map1\").style.cursor=\"default\";document.getElementById(\"dragHandlerOverlay\").style.border=\"5px solid black\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"0.1\";'><img src='http://img38.imageshack.us/img38/2343/redhatstarthere.png'></div><div id='bigmap2' style='position:absolute;top:0px;left:0px;z-index:9999;cursor:pointer;display:none;' onclick='document.getElementById(\"breadcrumbs\").style.display=\"block\";document.getElementById(\"friends\").style.display=\"block\";document.getElementById(\"bigmap1\").style.display=\"block\";document.getElementById(\"bigmap2\").style.display=\"none\";document.getElementById(\"scrollcover\").style.overflow=\"hidden\";document.getElementById(\"map1\").style.cursor=\"move\";document.getElementById(\"dragHandlerOverlay\").style.border=\"none\";document.getElementById(\"dragHandlerOverlay\").style.opacity=\"1\";'><img src='http://img513.imageshack.us/img513/3854/redhatstarthere2.png'></div>";
}