// ==UserScript==	
// @name           Faster Buff-Com
// @namespace      buff-com-faster
// @description    Faster Buff-Com
// @version        0.1.3
// @include        /^https?://www\.buff-community\.de/.*$/
// @exclude        /^https?://www\.buff-community\.de/users/chat.*$/
// ==/UserScript==

// ----------------------------------------------------------------
// | Configuration
// ----------------------------------------------------------------

var buffImg = "http://www.buff-community.de/img/";
var labelTrue = "<img src='"+buffImg+"accept.png'>";
var labelFalse = "<img src='"+buffImg+"delete.png'>";

var $ = jQuery = unsafeWindow.jQuery;
$('#footer').prepend('<a href="http://userscripts.org/scripts/show/127935" target="blank">Faster Buff-Com v0.1.2</a> | ');
var buffs = new Array();
var topNav = 0;
var topSec = 0;

// ----------------------------------------------------------------
// | Menu
// ----------------------------------------------------------------

GM_registerMenuCommand("Konfiguration einblenden", menuShowTrue);
GM_registerMenuCommand("Konfiguration ausblenden", menuShowFalse);

GM_registerMenuCommand("Produktauswahl einblenden", menuProductHideFalse);
GM_registerMenuCommand("Produktauswahl ausblenden", menuProductHideTrue);

GM_registerMenuCommand("Sektorspalte vorn", menuSectorRowFirst);
GM_registerMenuCommand("Sektorspalte hinten", menuSectorRowLast);

GM_registerMenuCommand("Zeilenhöhe minimieren", menuRowMin);
GM_registerMenuCommand("Zeilenhöhe maximieren", menuRowMax);

GM_registerMenuCommand("Chat einblenden", hideChatFalse);
GM_registerMenuCommand("Chat ausblenden", hideChatTrue);

GM_registerMenuCommand("Sektorweise auswählen ein", acceptSecTrue);
GM_registerMenuCommand("Sektorweise auswählen aus", acceptSecFalse);

GM_registerMenuCommand("Gebäudeweise auswählen ein", acceptBuildTrue);
GM_registerMenuCommand("Gebäudeweise auswählen aus", acceptBuildFalse);

// ----------------------------------------------------------------
// | Menu functions
// ----------------------------------------------------------------

function menuSectorRowFirst() {
	GM_setValue('sectorRow', true);
	window.location.reload();
}

function menuSectorRowLast() {
	GM_setValue('sectorRow', false);
	window.location.reload();
}

function menuProductHideTrue() {
	GM_setValue('productHide', true);
}

function menuProductHideFalse() {
	GM_setValue('productHide', false);
}

function menuRowMin() {
	GM_setValue('rowMin', true);
	window.location.reload()
}

function menuRowMax() {
	GM_setValue('rowMin', false);
	window.location.reload()
}

function menuShowTrue() {
	GM_setValue('menuShow', true);
}

function menuShowFalse() {
	GM_setValue('menuShow', false);
	window.location.reload()
}

function hideChatTrue() {
	GM_setValue('hideChat', true);
}

function hideChatFalse() {
	GM_setValue('hideChat', false);
}

function acceptSecTrue() {
	GM_setValue('acceptSec', true);
}

function acceptSecFalse() {
	GM_setValue('acceptSec', false);
}

function acceptBuildTrue() {
	GM_setValue('acceptBuild', true);
}

function acceptBuildFalse() {
	GM_setValue('acceptBuild', false);
}

var toggleConfigSec = function() {
	if (GM_getValue('sectorRow', true)) {
		menuSectorRowLast();
	} else {
		menuSectorRowFirst();
	}
}

var toggleConfigProd = function() {
	if (GM_getValue('productHide', true)) {
		menuProductHideFalse();
	} else {
		menuProductHideTrue();
	}
}

var toggleConfigRow = function() {
	if (GM_getValue('rowMin', true)) {
		menuRowMax();
	} else {
		menuRowMin();
	}
}

var toggleConfigChat = function() {
	if (GM_getValue('hideChat', false)) {
		hideChatFalse();
	} else {
		hideChatTrue();
	}
}

var toggleConfigAcceptSec = function() {
	if (GM_getValue('acceptSec', true)) {
		acceptSecFalse();
	} else {
		acceptSecTrue();
	}
}

var toggleConfigAcceptBuild = function() {
	if (GM_getValue('acceptBuild', true)) {
		acceptBuildFalse();
	} else {
		acceptBuildTrue();
	}
}

// ----------------------------------------------------------------
// | Main function
// ----------------------------------------------------------------

var main = function() {
	buffs = document.getElementsByName("buffid");
	if (GM_getValue('menuShow', true)) {
		activateUserInfo();
	}
	if ($('#accepted-buffs-data div').eq(0).width() > 225) {
		topNav=1;
	} else {
		topNav=0;
	}
	if (GM_getValue('sectorRow', true)) {
		activateSectorRow();
		topSec=1;
	} else {
		topSec=0;
	}
	activateSingle();
	activateMulti();
	if (GM_getValue('hideChat', false)) {
		$('#chat_area').hide();
	} else {
		$('#chat_area').show();
	}
	if (GM_getValue('acceptSec', true)) {
		activateAcceptSec();
	} else {
		$('#fasterBuffAcceptSec').hide();
	}
	if (GM_getValue('acceptBuild', true)) {
		activateAcceptBuild();
	}
}

// ----------------------------------------------------------------
// | Feature functions
// ----------------------------------------------------------------

var activateUserInfo = function() {
	if (document.getElementById("fasterBuffConfig") == null) {
		$('#friend-area').append('<br><h3>Faster-Buff Konfiguration</h3><ul id="fasterBuffConfig" class="friendlist"></ul>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigSec" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Sektor vorn: </div></li>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigProd" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Produkt ausblenden: </div></li>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigRow" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Zeile minimieren: </div></li>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigChat" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Chat ausblenden: </div></li>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigAcc" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Sektorweise auswählen: </div></li>');
		$('#fasterBuffConfig').append('<li><div id="fasterBuffConfigAccBuild" title="Faster-Buff Konfiguration" style="font-weight:bold; cursor:pointer;">Gebäudew. auswählen: </div></li>');
		document.getElementById('fasterBuffConfigSec').addEventListener("click", toggleConfigSec, false);
		document.getElementById('fasterBuffConfigProd').addEventListener("click", toggleConfigProd, false);
		document.getElementById('fasterBuffConfigRow').addEventListener("click", toggleConfigRow, false);
		document.getElementById('fasterBuffConfigChat').addEventListener("click", toggleConfigChat, false);
		document.getElementById('fasterBuffConfigAcc').addEventListener("click", toggleConfigAcceptSec, false);
		document.getElementById('fasterBuffConfigAccBuild').addEventListener("click", toggleConfigAcceptBuild, false);
	}
	$('#fasterBuffConfigSec').html("Sektor vorn: <div style='float: right; width: 20px'>" + (GM_getValue('sectorRow', true) ? labelTrue : labelFalse) + "</div>");
	$('#fasterBuffConfigProd').html("Produkt ausblenden: <div style='float: right; width: 20px'>" + (GM_getValue('productHide', true) ? labelTrue : labelFalse) + "</div>");
	$('#fasterBuffConfigRow').html("Zeile minimieren: <div style='float: right; width: 20px'>" + (GM_getValue('rowMin', true) ? labelTrue : labelFalse) + "</div>");
	$('#fasterBuffConfigChat').html("Chat ausblenden: <div style='float: right; width: 20px'>" + (GM_getValue('hideChat', false) ? labelTrue : labelFalse) + "</div>");
	$('#fasterBuffConfigAcc').html("Sektorweise auswählen: <div style='float: right; width: 20px'>" + (GM_getValue('acceptSec', true) ? labelTrue : labelFalse) + "</div>");
	$('#fasterBuffConfigAccBuild').html("Gebäudew. auswählen: <div style='float: right; width: 20px'>" + (GM_getValue('acceptBuild', true) ? labelTrue : labelFalse) + "</div>");
}

var activateSectorRow = function() {
	if ($('#accepted-buffs-data div').eq(0+topNav).width() > 80) {
		$('#accepted-buffs-data div').eq(5+topNav).insertBefore($('#accepted-buffs-data div').eq(0+topNav));
		$('#accepted-buffs-data div').eq(0+topNav).css('marginLeft', '30px');
		$('#accepted-buffs-data div').eq(2+topNav).css('marginLeft', '0px');
	}
	for (var i = 0; i < buffs.length; i++) {
		if ($('#accepted-buffno-'+buffs[i].value+' div').eq(1).width() > 80) {
			$('#accepted-buffno-'+buffs[i].value+' div').eq(6).insertBefore($('#accepted-buffno-'+buffs[i].value+' div').eq(1));
		}
	}
}

var activateSingle = function() {
	if (GM_getValue('rowMin', true)) {
		if (document.getElementById("buffFinish-label") == null) {
			$('#accepted-buffs-data div').eq(2+topNav+topSec*2).hide();
			$('#accepted-buffs-data div').eq(3+topNav+topSec*2).hide();
			$('#accepted-buffs-data div').eq(4+topNav+topSec*2).hide();
			var divFinishBuff = document.createElement('div');
			divFinishBuff.id = "buffFinish-label";
			divFinishBuff.style.width = "150px";
			divFinishBuff.className = "title-column";
			divFinishBuff.innerHTML = "Abschließen";
			$(divFinishBuff).insertBefore($('#accepted-buffs-data div').eq(5+topNav+topSec*2));
		}
	}
	for (var i = 0; i < buffs.length; i++) {
		if (document.getElementById("buffIcon-buff-"+buffs[i].value) == null) {
			var acceptedBuff = document.getElementById("buff-product-"+buffs[i].value);
			if (GM_getValue('rowMin', true)) {
				var buffIcon = document.createElement('div');
				buffIcon.style.width = "150px";
				buffIcon.className = "row-column";
			} else {
				var buffIcon = document.createElement('span');
			}
			buffIcon.id = "buffIcon-buff-"+buffs[i].value;
			for (var j = 0; j < acceptedBuff.options.length; j++) {
				if (acceptedBuff.options[j].value != "xx") {
					buffIcon.innerHTML += "<a style=\"cursor:pointer;\" onClick=\"document.getElementById('buff-product-"+buffs[i].value+"').selectedIndex="+j+";finishBuff('http://www.buff-community.de/', "+buffs[i].value+");\"><img src=\""+buffImg+"product-"+acceptedBuff.options[j].value+".png\"></a> &nbsp; ";
				}
			}
			if (GM_getValue('rowMin', true)) {
				$('#accepted-buffno-'+buffs[i].value+' div').eq(3+topSec).hide();
				$('#accepted-buffno-'+buffs[i].value+' div').eq(4+topSec).hide();
				$('#accepted-buffno-'+buffs[i].value+' div').eq(5+topSec).hide();
				$(buffIcon).insertBefore($('#accepted-buffno-'+buffs[i].value+' div').eq(3+topSec));
			} else {
				$(buffIcon).insertBefore($('#buff-product-'+buffs[i].value));
			}
		}

		if (GM_getValue('productHide', true)) {
			if (GM_getValue('rowMin', true)) {
				$('#buff-finish-'+buffs[i].value).hide();
			} else {
				$('#buff-finish-'+buffs[i].value).show();
			}
			$('#buff-product-'+buffs[i].value).hide();
			$('#sbm-finish-'+buffs[i].value).hide();
		} else {
			$('#buff-finish-'+buffs[i].value).show();
			$('#buff-product-'+buffs[i].value).show();
			$('#sbm-finish-'+buffs[i].value).show();
		}
	}
}

var activateMulti = function() {
	if (document.getElementById('buffIcon-1') == null) {	
		$('#accepted-buffs').append("<br>Auswahl abschließen: ");
		
		$('#accepted-buffs').append("<img id=\"buffIcon-1\" style=\"cursor:pointer;\" src=\""+buffImg+"product-1.png\"> &nbsp; ");
		document.getElementById('buffIcon-1').addEventListener("click", multiBuff1, false);
		
		$('#accepted-buffs').append("<img id=\"buffIcon-2\" style=\"cursor:pointer;\" src=\""+buffImg+"product-2.png\"> &nbsp; ");
		document.getElementById('buffIcon-2').addEventListener("click", multiBuff2, false);
		
		$('#accepted-buffs').append("<img id=\"buffIcon-3\" style=\"cursor:pointer;\" src=\""+buffImg+"product-3.png\"> &nbsp; ");
		document.getElementById('buffIcon-3').addEventListener("click", multiBuff3, false);
	}
}

var multiBuff = function(product) {
	buffs = document.getElementsByName("buffid");
	for (var i = 0; i < buffs.length; i++) {
		if (document.getElementById('ac_multi_'+buffs[i].value).checked == true) {
			var acceptedBuff = document.getElementById("buff-product-"+buffs[i].value);
			var selected = false;
			for (var j = 0; j < acceptedBuff.options.length; j++) {
				if (acceptedBuff.options[j].value == product) {
					acceptedBuff.selectedIndex=j;
					selected = true;
					
				}
			}
			if (selected) {
				document.getElementById("sbm-finish-"+buffs[i].value).click();
			}
		}
	}
}

var multiBuff1 = function() {
	multiBuff(1);
}

var multiBuff2 = function() {
	multiBuff(2);
}

var multiBuff3 = function() {
	multiBuff(3);
}

var activateAcceptSec = function() {
	if (document.getElementById('fasterBuffAcceptSec') == null && document.getElementById('multiaccept') != null) {
		$('#multiaccept').html($('#multiaccept').html().replace(/Aktion für Auswahl/g, "- <span name=\"fasterBuffAcceptSec\" id=\"fasterBuffAcceptSec\"><a onclick=\"return false;\" href=\"#\">sektorweise</a></span> Aktion für Auswahl"));
		var links = document.getElementsByName("fasterBuffAcceptSec");
		for (var i = 0; i < links.length; i++) {
			links[i].addEventListener("click", acceptSec, false);
		}
	} else {
		$('#fasterBuffAcceptSec').show();
	}
}

var acceptSec = function() {
	var buffs2 = document.getElementsByName("obmulti[]");
	var k = 0;
	for (var i = 0; i < buffs2.length; i++) {
		$('#ob_multi_'+buffs2[i].value).attr('checked', false);
	}
	for (var j = 0; j<10; j++) {	
		for (var i = 0; i < buffs2.length; i++) {
			var sec = $('#ob_multi_'+buffs2[i].value).parent().parent().find("td").eq(5).html().trim();
			if (sec == j) {
				$('#ob_multi_'+buffs2[i].value).attr('checked', true);
				k++;
			}
			if (k > 19) {
				break;
			}
		}
		if (k > 19) {
			break;
		}
	}
}

var activateAcceptBuild = function() {
	if (document.getElementById('fasterBuffAcceptBuild') == null) {
		var buildings = $('table.bufflist tr').slice(1).find("td:eq(1)").filter(":not([colspan]),[colspan='1']");
		$(buildings).css("cursor", "pointer");
		for (var i=0; i<buildings.length; i++) {
			buildings[i].addEventListener("click", acceptBuild, false);
		}
		$('#multiaccept').append("<input type=\"hidden\" id=\"fasterBuffAcceptBuild\" value=\"true\">");
	}
}

var acceptBuild = function(event) {
	var buildClicked = event.currentTarget.innerHTML;
	var buffs2 = document.getElementsByName("obmulti[]");
	for (var j = 1; j<10; j++) {	
		for (var i = 0; i < buffs2.length; i++) {
			var build = $('#ob_multi_'+buffs2[i].value).parent().parent().find("td").eq(1).html();
			if (build == buildClicked) {
				$('#ob_multi_'+buffs2[i].value).attr('checked', true);
			}
		}
	}
}

// ----------------------------------------------------------------
// | Start
// ----------------------------------------------------------------

var start = function() {
	main();
	setInterval(main, 2000);
}

start();