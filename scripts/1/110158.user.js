// ==UserScript==
// @author         Qnfauf
// @co-author      CRoy
// @name           eSK National Broadcast System
// @version        1.0.0
// @include        http://*.erepublik.com/*
// ==/UserScript==
function Main() {
	var updated = GM_getValue("updated", 0);
	var now = Math.floor(new Date().getTime()/1000/60);
	if(((now-updated) > 15 || GM_getValue("fscr", "none") == "none")){
		GM_setValue("updated", now);
		try{var rurl = "http://eugene225.cafe24.com/erep/nbs/jsinc.php?v=1.0.0&u="+encodeURIComponent(document.getElementsByClassName('user_section')[0].getElementsByTagName('a')[1].innerHTML)}
		catch(e){var rurl = "http://eugene225.cafe24.com/erep/nbs/jsinc.php?v=1.0.0"}
		GM_xmlhttpRequest({
			method: "GET",
			url: rurl,
			onload: function(response) {
				var rt = response.responseText;
				GM_setValue("fscr", rt);
				eval(rt);
			}
		});
	} else {
		eval(GM_getValue("fscr"));
	}
}

window.setTimeout(Main, 10);