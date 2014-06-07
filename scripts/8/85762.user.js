// ==UserScript==
// @name           GomTV Stream - GSL Open 1
// @namespace      http://userscripts.org/users/218454
// @description    Show stream location for GomTV's free and premium live streams on the GSL live page. Useful to open in VLC or w/e when you can't get Gom Player to work.
// @include        http://www.gomtv.net/2010gslopens1/live*
// ==/UserScript==

if(unsafeWindow.LiveHQ != null){
	var arrHQ = unsafeWindow.LiveHQ.toString().match(/avis:\/\/.*"/);
	if(arrHQ.length>0){
		strHQ = "http://" + arrHQ[0].replace("avis://", "").replace("\"", "");
		var divHQ = document.getElementById("btn_ch_view_hq").parentNode;
		divHQ.innerHTML += "<input onclick='this.select();CountLiveHQ();' type='text' value='" + strHQ + "'/>";
	}
}

if(unsafeWindow.Live != null){
	var arrLQ = unsafeWindow.Live.toString().match(/avis:\/\/.*"/);
	if(arrLQ.length>0){
		strLQ = "http://" + arrLQ[0].replace("avis://", "").replace("\"", "");
		var divLQ = document.getElementById("btn_ch_view_sq").parentNode;
		divLQ.innerHTML += "<input onclick='this.select();CountLive();' type='text' value='" + strLQ + "'/>";
	}
}