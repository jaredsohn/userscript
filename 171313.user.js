// ==UserScript==
// @name         ZTravian Messages and Reports Tool
// @namespace    ZTravian
// @author	 czerowars (original Serj_LV)
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version 	 1.0
// @description	 Add filter messages and reports
// @source       http://userscripts.org/scripts/show/171313
// @identifier   http://userscripts.org/scripts/show/171313.user.js
// @copyright	 © czerowars © Serj_LV
// @include      http://*ztravian.*/s*/msg.*
// @include      http://*ztravian.*/s*/report.*
// ==/UserScript==

/********************* messages & reports ***************************/

function deleteButtonAddT4() {
	if(($g("sAll"))) return;

	function removeBTX () {
		$g('sAll').checked = false;
	}

	var patt = [["administration","class","checkAll","delmsg"],
				["footer","id","markAll","del"]];
	var tt = /nachrichten.php/.test(crtPath) ? 0: 1;
	var mtable = $xf('.//form/div[@class="'+patt[tt][0]+'"]','f',cont);
	if( ! (mtable) ) return;
	var cbDiv = $e('DIV',[[patt[tt][1],patt[tt][2]]]);
	cbDiv.innerHTML = '<input class="check" type="checkbox" id="sAll" name="sAll" onclick="$(this).up(\'form\').getElements(\'input[type=checkbox]\').each(function(element){element.checked=this.checked;},this);"/>';
	mtable.insertBefore(cbDiv, mtable.firstChild);

	var btn_del = $g(patt[tt][3]);
	if( btn_del ) {
		btn_del.addEventListener('click', removeBTX, true);
	}
}

function deleteButtonAdd() {
	if( ver4FL ) { deleteButtonAddT4(); return; }

	function removeBTX () {
		var rm = $g('s10');
		if( rm ) rm.parentNode.removeChild(rm);
		var rm = $g(btnID);
		if( rm ) rm.parentNode.removeChild(rm);
	}

	var mtable = $xf("//table[@id='overview']/tfoot/tr/th", "r");
	var btn_add = false;
	var plusFL = false;
	if ( mtable.snapshotLength == 3 ) {
		if( ! /checkbox/i.test(mtable.snapshotItem(0).innerHTML) ) {
			mtable.snapshotItem(0).innerHTML = '<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';
			btn_add = true;
			plusFL = true;
		}
	}
	var tm = $g('textmenu');
	var tm_l = $gt('A',tm).length;
	var btnType = 'archive';
	var btnID = 'btn_archiv';
	if( /nachrichten.php/.test(crtPath) ) {
		if( /\?t=3/.test(crtPath) ) {
			btnType = 'start';
			btnID = 'btn_back';
		}
		if( /\?t=2/.test(crtPath) ) btn_add = false;
		if( tm_l < 4 ) tm.innerHTML += ' | <a href="nachrichten.php?t=3">'+gtext("archive")+'</a>';
	} else {
		if( /\?t=5/.test(crtPath) ) {
			btnType = 'start';
			btnID = 'btn_back';
		}
		if( tm_l < 6 ) tm.innerHTML += ' | <a href="berichte.php?t=5">'+gtext("archive")+'</a>';
	}
	if( btn_add )
		mtable.snapshotItem(1).innerHTML += '&nbsp;<input id="'+btnID+'" class="dynamic_img" type="image" src="img/x.gif" alt="'+btnType+'" name="'+btnType+'" value="'+btnType+'"/></input>';

	var mtable = $gn('msg')[0];
	if( mtable ) {
		var i = crtPath.split("?")[1];
		if( i ) {
			i = i.replace(/t=\d&?/g,"");
			if( i ) mtable.action += '?' + i;
		}
	}

	if( plusFL ) {
		var btn_del = $g('btn_delete');
		if( btn_del ) {
			btn_del.addEventListener('click', removeBTX, true);
		}
	}
}

function convertCoordsInMessagesToLinks() {
	var cM = $xf("//div[@*='message']");
	if( cM ) {
		var arXY = [];
		var iHTML = cM.innerHTML;
		var iHTML2 = iHTML;
		var j = 0;
		var villageLink = [];
		var Rej = /<a.+?\/a>/gi; // new Travian IGM extended tags
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[0];
			villageLink[j] = "<span>" + mLink + "</span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /(https?:\/\/[\S]+)(<.*>|$| )+?/gi; // URLs
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[1].match(/(.*?)(?:\.|,|<|\))?$/)[1];
			villageLink[j] = "<span><a target='_blank' href='" + mLink + "'>" + mLink + "</a></span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /[\/:]?(-?\d+)(?:<.+?>)?\s*?([\|\/\\ ])?(?:<.+?>)?\s*?(-?\d+)(?![\$\/%\d:])/g;
		while ((arXY = Rej.exec(iHTML)) != null) {
			if( /^[\/:]/.test(arXY[0]) ) continue;
			if( ! ( arXY[2] != undefined || arXY[3] < 0 )) continue;
			if( Math.abs(arXY[1]) > 400 || Math.abs(arXY[3]) > 400 ) continue;
			villageLink[j] = "<span><a href='karte.php?"+ (ver4FL?"x="+arXY[1]+"&y="+arXY[3]:"z="+xy2id(arXY[1], arXY[3])) +"'>"+ arXY[0] +"</a></span>";
			iHTML2 = iHTML2.replace(arXY[0], "<#!" + (j++) + "/>");
		}
		for( var i = 0; i < j ; i++ ) {
			iHTML2 = iHTML2.replace("<#!" + i + "/>", villageLink[i]);
		}
		villageLink.length = 0;
		cM.innerHTML = iHTML2;
		var mLinks = $xf('.//span/a','l',cM);
		for( var i = 0; i < mLinks.snapshotLength; i++ ) {
			distanceTooltip(mLinks.snapshotItem(i),0);
			sendResTropAdd(mLinks.snapshotItem(i), 1);
			linkHint(mLinks.snapshotItem(i));
		}
	}
}