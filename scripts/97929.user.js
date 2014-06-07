// ==UserScript==
// @name           Ikariam AT Fast KeyWord Search
// @namespace      A-thanatos
// @description    Quick search mark (ID or *NAME,IP,etc) and pres (a=agora,c=check IP,e=ereuna,i=id,l=lock,r=rename,h=history,s=search,f=find) to open a new window .*(Dieukrinisi ektos tou key "s" ola ta alla litourgoun mono gia to ID , me to "c"markarete mia IP kai tha sas anoiksei new window ston elegxo Proxy.)
// @include        http://*.gr.ikariam.*/*
// @include        http://ikariam.*/*
// @include        http://s*.gr.ikariam.com/admintool/admin/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// --------------------------------------------------------Fast keyword---------------------------------------------------------------------------
document.addEventListener("keypress", quickSearch, true)

function quickSearch(e) {
    if (isAQuickSearchToLaunch(e))
        GM_openInTab(internalMerge(window.getSelection().toString(), String.fromCharCode(e.which)))
    return true
}

function isAQuickSearchToLaunch(e) {
    return (isAQuickSearchKey(String.fromCharCode(e.which)) && window.getSelection().toString().length > 0 && !e.ctrlKey)
}

function isAQuickSearchKey(k) {
    return (k=="g" || k=="r" || k=="o" || k=="i" || k=="s" || k=="f" || k=="l" || k=="a" || k=="t" || k=="h" || k=="e" || k=="e" || k=="c" || k=="m" || k=='q')
}

function internalMerge(q, k) {
    switch (k) {
        case "g": return 'http://' + gameServer + '/admintool/admin/user_fleetlog.php?uid='+q
        case "r": return 'http://' + gameServer + '/admintool/admin/user_rename.php?uid='+q
        case "i": return 'http://' + gameServer + '/admintool/admin/user_overview.php?uid='+q
        case "s": return 'http://' + gameServer + '/admintool/admin/login_log.php?quickSearch='+q
        case "f": return 'http://' + gameServer+  ' /admintool/admin/search.php?session='+q
		case "l": return 'http://' + gameServer + '/admintool/admin/user_ban.php?uid='+q
		case "a": return 'http://' + gameServer + '/admintool/admin/islandboard.php?uid='+q
		case "t": return 'http://' + gameServer + '/admintool/admin/toplist.php?typ='+q
		case "h": return 'http://' + gameServer + '/admintool/admin/history_view.php?uid='+q
		case "e": return 'http://' + gameServer + '/admintool/admin/bad_content_search.php?session='+q
		case "m": return 'http://' + gameServer + '/admintool/admin/index.php?view=sendIKMessage&amp;receiverId='+q
		case "c": return "http://whatismyipaddress.com/ip/"+q
		case "n": return "http://www.editpad.org/"
	    case "q": return "spotify:search:" +q
    }
}