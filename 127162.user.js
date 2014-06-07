// ==UserScript==
// @name          HWM arts hard
// @description   arts hard
// @version       0.9.2
// @include       http://*.heroeswm.*/home.php
// @include       http://178.248.235.15/home.php
// @include       http://209.200.152.144/home.php
// @include       http://173.231.37.114/home.php
// @include       http://*freebsd-help.org/home.php
// @include       http://*heroes-wm.*/home.php
// @include       http://*hommkingdoms.info/home.php
// @include       http://*hmmkingdoms.com/home.php
// @include       http://*герои.рф/home.php
// @include       http://*понаехалитут.рф/home.php
// @include       http://*lordswm.*/home.php
// @include       http://*heroeswm.*/pl_info.php?*
// @include       http://178.248.235.15/pl_info.php?*
// @include       http://209.200.152.144/pl_info.php?*
// @include       http://173.231.37.114/pl_info.php?*
// @include       http://*freebsd-help.org/pl_info.php?*
// @include       http://*heroes-wm.*/pl_info.php?*
// @include       http://*hommkingdoms.info/pl_info.php?*
// @include       http://*hmmkingdoms.com/pl_info.php?*
// @include       http://*герои.рф/pl_info.php?*
// @include       http://*понаехалитут.рф/pl_info.php?*
// @include       http://*lordswm.*/pl_info.php?*
// @include       http://*heroeswm.*/inventory.php
// @include       http://178.248.235.15/inventory.php
// @include       http://209.200.152.144/inventory.php
// @include       http://173.231.37.114/inventory.php
// @include       http://*freebsd-help.org/inventory.php
// @include       http://*heroes-wm.*/inventory.php
// @include       http://*hommkingdoms.info/inventory.php
// @include       http://*hmmkingdoms.com/inventory.php
// @include       http://*герои.рф/inventory.php
// @include       http://*понаехалитут.рф/inventory.php
// @include       http://*lordswm.*/inventory.php
// @include       http://*heroeswm.*/inventory.php#
// @include       http://178.248.235.15/inventory.php#
// @include       http://209.200.152.144/inventory.php#
// @include       http://173.231.37.114/inventory.php#
// @include       http://*freebsd-help.org/inventory.php#
// @include       http://*heroes-wm.*/inventory.php#
// @include       http://*hommkingdoms.info/inventory.php#
// @include       http://*hmmkingdoms.com/inventory.php#
// @include       http://*герои.рф/inventory.php#
// @include       http://*понаехалитут.рф/inventory.php#
// @include       http://*lordswm.*/inventory.php#
// @include       http://*.heroeswm.*/sklad_info.php?*
// @include       http://178.248.235.15/sklad_info.php?*
// @include       http://209.200.152.144/sklad_info.php?*
// @include       http://173.231.37.114/sklad_info.php?*
// @include       http://*freebsd-help.org/sklad_info.php?*
// @include       http://*heroes-wm.*/sklad_info.php?*
// @include       http://*hommkingdoms.info/sklad_info.php?*
// @include       http://*hmmkingdoms.com/sklad_info.php?*
// @include       http://*герои.рф/sklad_info.php?*
// @include       http://*понаехалитут.рф/sklad_info.php?*
// @include       http://*lordswm.*/sklad_info.php?*

// ==/UserScript==

var url = location.href ;
var item_hard_regexp = /: (\d+)\/(\d+)/;
var item_name_regexp = /uid=(\d+)/
var text_new_begin = '<div style="font-size: 9px; padding: 1px; border-color: #eecd59; border-width: 0px; border-style: solid; margin-top: 2px; margin-left: 4px; background-color: #ffffff; position: absolute">';
var text_new_begin5 = '<div style="color: #FF0033; font-size: 9px; padding: 1px; border-color: #eecd59; border-width: 0px; border-style: solid; margin-top: 2px; margin-left: 4px; background-color: #FFF; position: absolute">';
//var text_new_begin5 = '<div style="font-size: 9px; padding: 1px; border-color: #eecd59; border-width: 0px; border-style: solid; margin-top: 2px; margin-left: 4px; background-color: #FF9080; position: absolute">';
var text_new_end = '</div>';

if(url.indexOf('/pl_info.php') >= 0)
	HardBySlot();

if(url.indexOf('/home.php') >= 0)
	HardByInfo();

if(url.indexOf('/sklad_info.php') >= 0)
	HardByInfo();

if(url.indexOf('/inventory.php') >= 0) {
	if((typeof arts_c) != 'undefined') {
		// FF4+, Opera
		HardBySlot();
		HardByJS();
	}
	else {
		// FF3-, Chrome
		// HardByDocument();
		document.body.setAttribute('onload',
				' function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}; '+
				' var text_new_begin = \'<div style="font-size: 9px; padding: 1px; border-color: \#eecd59; border-width: 0px; border-style: solid; margin-top: 2px; margin-left: 4px; background-color: \#FFF; position: absolute">\'; '+
				' var text_new_end = \'</div>\'; '+
				' var item_hard_regexp = /: (\\d+)\\/(\\d+)/; '+
				' var dreses = getI( "//div[contains(@id, \'slot\')]" ); '+
				' for( var i = 0; i < dreses.snapshotLength; i++ ) { '+
				'		var dress = dreses.snapshotItem(i); '+
				'		var hard = item_hard_regexp.exec(dress.innerHTML); '+
				'		if(hard) '+
				'			dress.innerHTML = text_new_begin + String(hard[1]) + text_new_end + dress.innerHTML; '+
				'	} '+
				'	for(var i = 0; i < arts_c; i++) { '+
				'		if(arts_fd_none[i]) { '+
				'			hard = item_hard_regexp.exec(arts_fd_none[i]); '+
				'			if(hard){ '+
				'				if(arts_fud[i]) { '+
				'					arts_fud[i] = text_new_begin + String(hard[1]) + text_new_end + arts_fud[i]; '+
				'				} '+
				'				if(arts_fd_ok[i]) { '+
				'					arts_fd_ok[i] = text_new_begin + String(hard[1]) + text_new_end + arts_fd_ok[i]; '+
				'				} '+
				'				if(arts_fd_none[i]) { '+
				'					arts_fd_none[i] = text_new_begin + String(hard[1]) + text_new_end + arts_fd_none[i]; '+
				'				} '+
				'			} '+
				'		}	'+
				'	} '+
				'	show_c(); '+
				' ');
	}
}

function HardBySlot() {
	var dreses = getI( "//div[contains(@id, 'slot')]" );
	for( var i = 0; i < dreses.snapshotLength; i++ ) {
		var dress =  dreses.snapshotItem(i);
		hard = item_hard_regexp.exec(dress.innerHTML);
		if(hard)
			dress.innerHTML = hardHTML(hard[1]) + dress.innerHTML;
	}
}

function HardByInfo() {
	var dreses = getI( "//a[contains(@href, 'art_info.php?id=')]" );
	var elo = '' ;
	for( var i = 0; i < dreses.snapshotLength; i++ ) {
		var dress =  dreses.snapshotItem(i);

		an = item_name_regexp.exec( dress.href ) ;
		if( an )
		{
			if( elo == an[1] )
				continue
			else
				elo = an[1]
		}
		hard = item_hard_regexp.exec(dress.parentNode.innerHTML);
		if(hard)
			dress.parentNode.innerHTML = hardHTML(hard[1]) + dress.parentNode.innerHTML;

/*		if((dress.innerHTML.indexOf('/i/artifacts/') >= 0)
) {
			hard = item_hard_regexp.exec(dress.innerHTML);
			if(hard)
				dress.parentNode.innerHTML = text_new_begin + String(hard[1]) + text_new_end + dress.parentNode.innerHTML;
		}

		else if (dress.innerHTML.indexOf('width="50"') >= 0) { // у крафта 3 раза дублируется Прочность в title, поэтому ловим 1-й
			hard = item_hard_regexp.exec(dress.innerHTML);
			if(hard)
				dress.parentNode.innerHTML = text_new_begin + String(hard[1]) + text_new_end + dress.parentNode.innerHTML;
		}
		else {
			if(dress.innerHTML.length == 0) { // похоже такого уже не бывает.
				hard = item_hard_regexp.exec(dress.parentNode.innerHTML);
				if(hard)
					dress.parentNode.innerHTML = text_new_begin + String(hard[1]) + text_new_end + dress.parentNode.innerHTML;
			}
		} */
	}
}

function HardByJS() {
	for(var i = 0; i < arts_c; i++) {
		if(arts_fd_none[i]) {
			hard = item_hard_regexp.exec(arts_fd_none[i]);
			if(hard){
				if(arts_fud[i]) {
					arts_fud[i] = hardHTML(hard[1]) + arts_fud[i];
				}
				if(arts_fd_ok[i]) {
					arts_fd_ok[i] = hardHTML(hard[1]) + arts_fd_ok[i];
				}
				if(arts_fd_none[i]) {
					arts_fd_none[i] = hardHTML(hard[1]) + arts_fd_none[i];
				}
			}
		}	
	}
	show_c();
}

function HardByDocument() {
	var text = String(document.documentElement.innerHTML);
	alert(text);
	var pos = 0;
	var pos_id = 0;
	var pos_begin = 0;
	var pos_end = 0;
	while(true) {
		pos_id = text.indexOf('/i/artifacts/', pos);
		if(pos_id < 0)
			break;
		if(text.charAt(pos_id - 1) == 'c') { 
			/*<img border="0" title="............" src=""http://....*/
			pos_begin = text.lastIndexOf('<img', pos_id );
			pos_end = pos_id;
		}
		else {
			/*<table border="0" cellpadding="0" cellspacing="0" background=....*/
			pos_begin = text.lastIndexOf('<table', pos_id );
			pos_end = text.indexOf('</a>', pos_id );
		}
		hard = item_hard_regexp.exec(text.substring(pos_begin, pos_end));
		if(hard) {
			text = text.substring(0, pos_begin) + hardHTML(hard[1]) + text.substring(pos_begin);
		}
		pos = pos_end + text_new_begin.length + text_new_end.length + 5;
	}
	document.documentElement.innerHTML = text;
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

function hardHTML(hard1){
	if ( hard1 > 5 ) { return text_new_begin + String(hard1) + text_new_end; } else { return text_new_begin5 + String(hard1) + text_new_end; }
}