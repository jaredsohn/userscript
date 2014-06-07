// ==UserScript==
// @name          LOR Tracker filter
// @description   Remove unwanted messages from tracker.
// @include       http://www.linux.org.ru/*tracker*
// @include       http://linux.org.ru/*tracker*
// ==/UserScript==
//
// License: GPL
// Author:  sdio ( http://www.linux.org.ru/whois.jsp?nick=sdio )
//
// Version: 0.9


// Blacklist users
var BlackList = new Array;
BlackList['wyldrodney' ] = 1;
BlackList['Ty3uK'      ] = 1;

//do not show the next categories
var TrackList = new Array;
TrackList['Games'          ] = 1;
TrackList['Скриншоты'      ] = 1;
TrackList['Документация'   ] = 1;
TrackList['Голосования'    ] = 1;
TrackList['Apple'          ] = 1;
TrackList['Игры'           ] = 1;
TrackList['Wiki'           ] = 1;

//TrackList['Talks'          ] = 1;
//TrackList['Linux в России' ] = 1;



// ------------------------------------------------------------------------

var jq;

if (typeof(GM_log) == 'function') {
	// For FF, Mozilla (with greasemonkey sandbox)
	jq = unsafeWindow.$;
} else {
	// For Epiphany, Opera
	jq = $;
}


//
//MAIN
//

jq('td.dateinterval').each(function(){
    this.textContent = this.textContent.replace(/.*, /, "");
    this.setAttribute('class', '');
});

jq('div.forum table.message-table tbody tr').each(function() {
    var nick = "";
	var td1 = jq("td:first", this);
	var td2 = td1.next();

	var forum = jq("a.secondary", td1).text().replace(/^\s+|\s+$|\n/g,"");

    //jq("td", this).get(1);
    var c = td2.contents();
    for (var i=0; i<c.length; i++) {
        if (c[i].nodeType == 3) {
            nick = c[i].textContent.replace(/[в( )\n]/g, '');
            if (nick != "") break;
        }
    }

//  GM_log('Debug ==> Nick: '+nick+'; Forum: '+forum + ';');

 	if (TrackList[forum] || BlackList[nick]) {
 		jq(this).hide();
//      GM_log('Hidden ==> Nick: '+nick+'; Forum: ' + forum + ';');
 	}
 
});

