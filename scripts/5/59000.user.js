// ==UserScript==
// @name          YouTube HD Ultimate
// @description   The best of the hundreds of YouTube scripts, because we make it. Updated all the time, by me and you! Your favorite YouTube script is better than ever!
// @include       http://www.youtube.com/watch?*
// @namespace     #aVg
// @version       1.1.3
// ==/UserScript==
// Do not fiddle with the script for any reason! If you're having problems, use the various contact options!
var prev = new Image();
prev.src = "http://img.youtube.com/vi/"+unsafeWindow.pageVideoId+"/1.jpg";
prev.addEventListener("load", script, false);
function script() {
var opts  = {
	hideRate : new Array("Hide Warnings", false, "Choose this if you want to hide warnings about language, sex or violence."),
	usecolor : new Array("Enable colors", true, "Choose this option if you want to use colors at all."),
	useHD : new Array("Use HD", true, "Select this option to choose whether you want HD or not. It's a good idea to turn this off if your computer is slow. If you do have a slow computer, you can still download the \"hd mp4\" version, and play it from your computer's media player, which may be desirably faster."),
	autoplay : new Array("Autoplay", true, "By default, YouTube autoplays all of it's videos."),
	autobuffer : new Array("Autobuffer", false, "If you have a slow computer or a slow connection, turn this on to let the video download while it's paused, then you can hit the play button."),
	hidenotes : new Array("Hide annotations", true, "Annotations are those annoying notes some users leave that say \"visit my site!\" or \"make sure to watch in HD!!\". But we already know that, right? You can turn them off if you want."),
	c1 : new Array("Color 1", "000000", "The background color of the player bar. Must be in HEX format. (Six hex digits only)."),
	c2 : new Array("Color 2", "FFFFFF", "The foreground color of the player bar. Must be in HEX format. (Six hex digits only)."),
	bigMode : new Array("Big mode", true, "Have a nice monitor? Like seeing things big? Turn this on. Ensures proper aspect ratio, and maximum viewing in the comfort of your browser."),
	snapBack : new Array("Snap back", true, "Makes the video smaller if you turn off HD / HQ."),
	true720p : new Array("True 720p", false, "Leave this on for all HD videos to load as 720p videos-- in 720p. Yeah, it's a pretty lame option on most computers, I realize."),
	fit : new Array("Fit to window", true, "When viewing videos in HIGH QUALITY or HIGH DEFINITION, the player will size itself to the window."),
	jumpToPlayer : new Array("Jump to player", true, "Especially with big mode on, this is nice. It scrolls down to the video for you."),
	loop : new Array("Loop", false, "Are you a loopy fanatic? Turn this on! Goes well if you watch a lot of AMV's I hear."),
	autoCinema : new Array("Automatic Cinema", false, "Like YouTube \"Comfort in Black\", this darkens everything except for the video player."),
	utterBlack : new Array("Total Black", false, "This will make cinema mode opaque black, as opposed to trasparent black."),
	collapse : new Array("Collapse everything", true, "For those who prefer having a short scrollbar, this automatically hides every \"panel\" when you open a video."),
	useVol : new Array("Enabled Fixed Volume", false, "This will enabled the fixed volume feature (script sets volume to custom amount at the start of every video)."),
	vol : new Array("Volume", "50", "The volume, as an integer, from 0 to 100.")
};
function toggleWidePlayer(which)
{
	var A = $("baseDiv");
	if(which) {
		if(A.className.indexOf("watch-wide-mode")==-1)
			A.className += " watch-wide-mode";
	} else
		A.className = A.className.replace("watch-wide-mode", "");
}
function update(resp) {
	GM_xmlhttpRequest({
		url : "http://userscripts.org/scripts/source/31864.user.js?update",
		method : "GET",
		onload : function(a) {
			if(a.responseText.match(/\/\/ @version       (\S+)/) == null) return;
			if (RegExp.$1 != thisVer) {
				if(confirm("There is a new version of YouTube HD Ultimate.\n\nInstall it?"))
					location.href = "http://userscripts.org/scripts/source/31864.user.js";
			} else
				if(resp)
					alert("There is no new version at this time.");
		}
	});
}
var now=new Date().getTime();
if ((GM_getValue("lastCheck"), now) <= (now - 86400000)) {
	GM_setValue("lastCheck", now);
	update(false);
}
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0)
			A.addEventListener(b.substring(2), cur, false);
		else if(b=="style")
			A.setAttribute("style", B[b]);
		else
			A[b]=B[b];
	}
	if(C) for(var i=0; i<C.length; ++i) A.appendChild(C[i]);
	return A;
}
function fitToWindow() {
	player.style.marginLeft = (window.innerWidth >= 960 ? Math.floor((985 - window.innerWidth) / 2) : "0") + "px";
	player.style.width = (window.innerWidth - 20 ) + "px";
	player.style.height = (window.innerHeight - 53) + "px";
}
function fitBig() {
	var isWide = unsafeWindow.isHDAvailable || (prev.width < 130);
	fitToWindow();
	var w = Math.round((player.offsetHeight - 25) * (isWide ? 1.77 : 1.33));
	if (w > player.parentNode.offsetWidth) {
		w = player.parentNode.offsetWidth;
		player.style.height = (Math.round(w / (isWide ? 1.77 : 1.33))+25) + "px";
	}
	player.style.width = w + "px";
	player.style.marginLeft = Math.round(player.parentNode.offsetWidth / 2 - player.offsetWidth/2) + "px";
}
function $(A) {
	return document.getElementById(A);
}
document=unsafeWindow.document;
var player=$("movie_player"),
	optionBox,
	toggler,
	init=false,
	head=$("watch-vid-title"),
	thisVer="1.1.3";
unsafeWindow.player=player;
GM_addStyle("#vidtools span {\
	position : relative;\
	z-index : 90000;\
	float:right;\
}\
#light-switch {\
	width:17px;\
	height:25px;\
}\
.loop {\
	width: 28px;\
	height: 13px;\
}\
.loop.on {\
	background-image: url(data:image/gif,GIF89a%20%00%20%00%F5%00%00%FF%FF%FF%FF%00%00%FE%AA%AA%FE%84%84%FE%60%60%FELL%FE%3E%3E%FEHH%FEVV%FEpp%FE%8E%8E%FE%A0%A0%FEff%FE44%FE22%FE88%FEBB%FEtt%FE%A6%A6%FE%AE%AE%FEjj%FE00%FE%B0%B0%FE%2A%2A%FE%5C%5C%FE%94%94%FE%26%26%FE%22%22%FE%88%88%FE%98%98%FE%7E%7E%FERR%FEzz%FE%1E%1E%FE%20%20%FE%1C%1C%FE%9C%9C%FE%16%16%FE%BA%BA%FE%12%12%FE%B4%B4%FE%BE%BE%FE%CE%CE%FE%D2%D2%FE%D8%D8%FE%C8%C8%FE%C4%C4%FE%E2%E2%FE%EC%EC%FE%E6%E6%FE%F0%F0%FE%F6%F6%FE%FC%FC%FE%DC%DC%FE%04%04%FF%00%00%FE%0A%0A%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%FE%1ACreated%20with%20ajaxload.info%00%21%F9%04%00%07%00%00%00%21%FF%0BNETSCAPE2.0%03%01%00%00%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%0C%10%8EK%C9Al%3A%9F%80%05%22t%3A%95JV%A8%96%28%20lF%D7%F0%09%B2%DD.%0C%A1t%3A%7C-C3%97%8Dz%1D%3E%B8%9D%0B%C7F.Z%3F%08%11%0A%0AwE%10%1A%1B%1A%22%8A%06%19%84P%14%17%1A%92%87%11%8EP%0B%15%17%91%1A%17%03%96P%0C%15%99%9A%95%9FN%02%0D%15%0E%AA%1F%A6O%03%AB%0D%0E%0E%8D%AEM%04%B3%0D%0Dv%B6M%05%0F%C0%0F%09%BDM%06%C6%06%0F%1C%C4D%C7%06%10%1D%CBC%CD%10%B5%D1%07%10%07%D9%83%D1%00%08%D9%D9%1E%DC%00%09%DF%05%04%E2%0A%07%05%EA%08%0B%DC%02%05%F1%08%08%C3%DC%11%05%F3%18%04%DB%CB%12%F3%08%FA%08%B8%BBCc%CB%00%0C%FA%180H%40%C2%CD%8C%82Z%2C0H%B8%10%84%02%14P%60%C8xXF%02%81%8F%09%22%80%F0%A0%60%81%85%14%2AV%B0%60%F1%22%06%8C%19%1C%01%40%C4Ca%A1%C8%01%1C2t%90%60%C1D%0BD%15%2C5%C2%A4AT%8B%00%10%21A%0C%18%90%81%84I%13.%80%B6%84%F1r%86%1B%0B%19n%0A%EA%B0%40%00%8A%14%3FY%BA%84%E1%08%2BN%05%19%16%3C%8D%AA%F2%05%D9O%26%04%2Cp%BA%60%82%09%94%2C%CA%04%01%00%21%F9%04%00%07%00%01%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%0C0%8FJ%A9%D4x%20%40%C4%A8%94%B8%40hB%A1%A5%B6t%12M%BFB%01C%23%12%8D%B0%A1%91%D6%A6%00O%17%10%CDf%83%C6%AA%977%89%3B%DAyh%E4%1Bevw%25%1B%7BT%0F%17%17%7Fr%22%06%0C%11%0A%0A%11%04%07%87B%13%07%15%15%8A%8B%07%19%97%60%09%0E%9B%A4%15%11%A1%60%0B%0F%A4%0D%0E%0D%1C%A9%60%14%0D%B5%AEP%B2S%02%0F%BC%BC%08%B9_%1C%06%C3%06%0F%1D%C0S%0C%C4%06%BF%C8R%08%07%10%D2%A8%CEQ%07%D7%D7m%D5D%05%D8%07%C7%DBC%05%DD%07%05%E0%E1%00%08%DD%05%08%DA%E8%04%05%1F%08%08%03%E8B%11%F2%08%18%09%F6%00%19%FA%08%08%10X%60O%80%3E%0C%02%3D%F4%03%81%90%00%83%04%E7%B6I%10%C8%80B%82%08z%D0q%60%F00%02%88%01%19%B7Y%00q1%C2%80%01%0A%16%A4%F82%83%C6%25%01%11b%9ET%90a%81%05%17%2AX%BC%88%01cF%CBBP%12d%A2%EC%B0%60%82%09%9C%3Aa%C8%F8%19%CA%02%07%94%0A%88%1AE%BA%B3%27%D3K%28HH%22%2A%00E%8A%16%2Bj%F0%5C%DA%D2e%28%13%0B%B8Z8%9AS%AC%D2%19%CEL%A0%40%C1vE%D2%3DA%00%00%21%F9%04%00%07%00%02%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9Cp0%8FFH%F4x%20%06%13%A2t%3A%5C%60.%1B%D1%264%1A%95%BE%A7%11bA%A5%0A%28%95%8BF%93%E5%86%B8%DF%D2%E9D%28%13%17%87%B4z-%12%BD%DFq%277%24vB%1D%06%15%89%17%7B%1Bm%25%5E_6%08%85%00%0B%06%0E%15%0E%98%8B%10%14%20%0A%0A%11%04%17%91%94%13%05I%9A%9A%07%19e%0A%1A%03%94%11%0F%06%06M%0F%20%94%BA%0B%10%B5%BE%0A%BA%BA%09%BE%B5%B9%C1%85%02%07%10%CA%06u%C7%85%0A%07%D2%D2%1D%CF%85%09%D3%07%CE%D6e%04%05%05%07%05%1E%DCv%08%DF%05%08%AD%E4T%08%1F%08%EFd%EBS%EF%08%18%18%84%F2R%18%F5%18%04%EA%F9C%18%F4%23%C0%00%18%C0%21%20%08%10d%60%EC%20%80%0C%0B%13D%10%E0%10%C0%04%0A%09%24%7E%AA%08%40%81%C4%08%1E%06H%A88A%E3%80%01%0ALT%0C%15RA%86%0E%2A%0FZ8%C9AA%87%05%12L%A8%90%89%D2%E6%82D%09%26%5C%A8%A8%11%03%C6%8C%194hX%B3%90%21%03%89%05%16%82%AA%60%F1%02%86%0C%A4%E4L%2Cx%1AU%28U%ABX%C9%A5%B0%20%A1%EB%D4%AAW%95%CAsaB%2A%0B%A2F%91%AA%95%A7b%2A%DC%B4s%CB%04%01%00%21%F9%04%00%07%00%03%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%28%08%06%C3f%93%24%0C%26%C4%A8t%B8%204.X%8Df%19%1A%854%88%C5t%2AH%3C%2A%0EGv%2B%0A%B9G%A5%12A0%1EJ%3E%8Dt%BEr%D1nDmnq%25%0Fbc%1D%07%0F%06%0F%0Dyj%7DKm%5E%83%25%22%0AS%12%07II%8C%0E%07%09%20%0A%0A%20%0C%0D%23pq87%0FR%13%08%06%10%9B%06%08%1Dc%0A%06%83%27%04S%20%07%BE%B1%07%1EuC%09%277%0E%98%05%BE%CB%97%C3C%1E%08c%11%07%CA%BE%03%CE%D8%00%02%05%DC%DC%14%D9%D8%19%1F%DC%08a%E0%CE%20%E5%E5%DF%E7%C3%0C%18%18%08N%ED%C3%04%F6%F6%B5%F4c%F7%0C%0C%12%FA%FB%FA1H%F0%0F%A0%94%04%08%13D0d%90%08%08%84%11%40%E4k8D%81B%10%03%9AQ%14%B2%40%A1%87%8C%266%0A%B1%00%02%23%87%0C%0C7f%18%C0AA%06%12%21EZh%F9r%C1%84%16%22%01%2CP%D0a%81%04G%0B%26T%884A%82%84M%14%29Z%B0%88%B1%D1%84O%A0.T%B0x%01C%C6%0C%1A4%00%9A%98%00U%2AU%ABY%0D%BA0a%22%EA%D4%AAW%29%AApa%F6k%DA%8D%2CV%9C%05%8B5g%8C%180f%E8%AD%8B-%08%00%21%F9%04%00%07%00%04%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%28%18%07%C8%E5%021%108%13%A2t%3A%940%0C%0DGe%7B%D1xE%17%C4%82J%15D%0C%86%C7%A3%91%ADt%BD%1B%91hC%10%90%AB%98%26%3A%DD%5E%7EE%21%21%23%0Fcd%24%08%07I%7Bk%0E%0D%7Eq%80%21%25%25%1A%19T%12%88%89%07%06M%05%09%1E%19%19%20%0C%0F%1A%81%81%93%1A%85C%13%04%07%05%9A%07%18%1Dd%19%10%22%23%23%93%25%0FvC%03%05%B0%C2%03wC%09%22%BB%93%04U%08%08%1F%CF%08%96%C5%BF%BA%9366%12B%1E%18%18%CD%08%1C%D3R%09%25%277%06%AC%DC%DC%04%11%E1S%0E%1AR%19%04%F3%F3%AB%EDB%D9R%03%0C%04%0C%0C%EC%F7%A6E%60%40%81A%02i%01%EFDH%C00%82%BD%84S%12D%88%00%02D%14%88d%24%82%180%E0%22%C6%29%159B%F9H%85%03G%05%0A%7C%91%24%D2%81%83%82%0C%1D%F2%AD%AC%82%B2%03%09%09.f%0E1%01%F3%E6%04U%13%3A%AB%90X%20%00%85%09%15A%01%98X%20%C1%82%09%17%2Aj%24E1%01E%0A%A8%2Cb%04ua%14%EA%8A%1A1%60%CC%D0%D9%E2%A9%0A%16%2F%60%C8%98A%83%C6L%15-%CE%A6%5D%EBV%27%8B%BBag%B0M%0A%E0%C5%DC%BD%7C%C3%D2%AD%CB%17%80%5E%C0%01%83%00%00%21%F9%04%00%07%00%05%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%28%12%87%83%A3%91d%28%26%C4%A8t%28I%40%0C%D8%87%A3%C2%BD%5C%2A%98%C5t%3A%01%15%92Wl%A3%E1px5%9A%0BA0%A6%12%0E%E7C%DA%F0%60%BB%2Fp%1B%22%06bc%0B%08%05%89I%07Y%7Dmo%1A%22%22%21%17%19S%12%04%08%1F%8AI%08%11%03%19%19%1E%09%06%80%82%93%23%17%85C%13%14%08%18%08%9A%05%0C%1Dc%19%07%92%21%21%23%25%06PC%03%AF%B1%B1%1CuC%11%1B%BA%21%25%25%04v%04%D0%04%18%B5%C6%C0%1B%23%BB%CC%85%03%D1%D0%0A%D5Q%09%BC%CC%25%08%00%16%09%14%09%0C%0C%1E%E0R%10%E4%CC%12%24%09%F6%F6%12%EFQ%19%E4%27%27%11%1C%12D%88%00b%80%3E%29%0FJ%D8%B8a%83%C0%00%10%20%3C%80%20q0%0A%82%0D%04%F2%01%888%A0%23%9D%8Au%3A%0E%E0%A0%00%05%C8%3A%24%15%842qr%8C%02%05%1D%3A%2C%60%D9RJL%12%0B%24%D0%ACI%84%DE%02V%01%16v%F2%14%82B%02P%13%29X%0C%1D%E2BB%D0%14.T%2C%1Db%02iT%16%2F%A6%02Pa%E2j%8D%170%B4%AAP%B1%02%2B%0C%183%A6%B2P%815%06%DA%194h%2CeaV%06%5C%B9S_%B8%9D%01W%AB%90%B3%7C%F1%FA%05%10x0%11%C1%86%97%06%01%00%21%F9%04%00%07%00%06%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04d%12%88%82%C1P%28P%14%93%A2t%2AI%7C%0EX%C8%D2%F0p8%1E%84%C5t%3A%19%24%9B%D8%C3%B6%5BiW%28%82%F1PBA%20%3E%85%B4z%F9hx%2B%17%17%10bc%0B%0Cvvxi%7C%7D%5E%81%1A%1A%0E%19S%02%0C%04%04%18%88%08%04%20%03%1D%19%03%09%07%8E%90%1B%1B%17%84C%16%20%96%97%98%09%A9E%19%07%17%1A%A6%A6%06QC%0A%09%09%96%96%0ArC%11%B5%22%21%C7%04C%13%BD%CC%B0%C2D%1C%1B%22%22%23%23%1A%84%0A%11%DA%DA%1D%CFE%11%C6%21%D5%08%00%28%20%E7%1E%20%C1%DEE%07%C7%23%25%23%12%0B%03%F5%F5%16%EC%B2%25%C7%25%25%11%1D%0A8%28P0%29_%91%07%FD%FA%15%00%98%A1a%1C%83D%08%24%2C%D1%A0%83E%12%0BL%40%24%E2a%A2%08%12%18%25Hp%B1qW%C2%13%25DN%B0%60%A1EI%21%0AN%96X%89%C2D%0A%15%2F%A7%98%B0%E9%C2%C5%8AE%9CRz%BAP%A1%82%05%D0%22%2AZ%14eQ%23%C6%D1%21%2C%8A%D6x%11%03%C6S%A8%2C%5E%C0%80%21c%C6U%001%A8v%9D1%83%C6%D7%ADdi%A85%7B5-%DB%AF%00%D2%C2%25%A2v%AE%DD%BBx%F3%CA%09%02%00%21%F9%04%00%07%00%07%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04t%40%04%CC%E1%80A%24%14%93%A2t%2A%005%3F%85%EC%F2%60%E82%16%D3%A9e%90l%22%0A%DB%03%A4kh%3C%12%82%F0p%02b%10%92%88%3Cz%B9%EE6%2A%0E%07%60a%12%11%09%09vwf%7Bl%0F%7F%15%15%06%1Db%11%86%87%0Cv%09%03%0A%24%1D%1C%20%05%06%8E%8F%17%0F%83C%28%9F%95%96%20%A7E%1D%1F%0E%B2%17%17%1A%10QC%24%03%1E%03%03%20%11%93rB%20%7F%B5%1B%1A%0CC%26%0A%0A%BD%BDq%C2C%0A%15%C6%C7%83%0B%CC%D9%12%D1E%11%1A%1A%C7%1B%18%00%29%1D%E6%1D%19%AE%DCB%07%1B%22%21%22%1B%12%28%0B%F5%F5%29%EBE%19%22%EF%23%21%20%16%04%08%98%20%C0B%3E%29%10B%28%14%81%C0%82C%13%28%5C%1C%2C%C2%40a%88%11%06Lht%E1B%C5D%22%1EJ%28%2C%B1%21%05%C7%16%2AX%7C%94Vb%C4%88%12%25P%AAX%C1%E2%C5J%21%0A%60%EAL%C9%A2%C6%8BI%187%01%84%D4%29%82E%CD%180%60%04%25%A0%B3%C4%83%17%2F%92%C2%98%11%F4%03%8E%1B6N%7C%40%3Au%C6%0C%1AA%01L%60%A0%21%01%80%AE4%D2%86-%E2U%EDZ%B6_%DFN%89%2BW%0A%D8%BAx%F3%EA%DD%CB%B7%EF%DB%20%00%21%F9%04%00%07%00%08%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04t%3C%0C%02%A2%40%20D2%93%A2t%2A%18P%08%18%84vY8x%29%92%E9%D4%A2HP%AEM%ED%A7%EB%85%18%20%11%81xh%19%24%EE%89%A4%12%B1%F6%1E%DC%06%0F%05%0Bs%13%03%20%20%11w%14IY%1F%1F%7E%06%92%81%06%1DS%28%0A%03%87%89%8A%11%0A%19%24%1D%0A%20%08%07%93%0F%0D%0E%06%84E%A2%99%03%1E%20%03aS%1D%08%81%0F%0E%15%15%07QC%13%19%19%0A%C3%1C%ACs%00%1E%06%0D%15%BA%15%14C.%0B%24%A1%A2%16%C7D%0A%0F%BB%17%17%15%AC%26%12%E1%0B%0B%D6%D7D%11%15%DC%DC%04%00%2A%28%16%F0%02%E5%E6D%1F%17%1A%F8%1A%12-%26%FD%FD-%F4%8Ad%C8%B7a%83%07%15-%5C%28t%11P%8A%01%0D%22%0A%22PA%91%E2%8A%86E%18l%08%11%D1%00%8B%8F%1Fk%60%242%20D%88%11%21.%BCX%19%E3E%8C%91C%14%9C%1C1B%04%8C%9B8a%0A%91I%B3%A6%8CT%193d%C8%80%A1%13Y%09%9A%254%00%5D%3A%A3%28%81%12PK%3C%A0A%95jS%9D%0E%A2%96%28%40c%08%8D%AB%23%15%9C%80z%E2%04%08%22Tuj%281v%2C%AD%A2C%40%E0%B8Q%16%01%DC%29%09n%E00v%B7H%82%BE%80%03%0B%1EL%B8%B0%E1%80A%00%00%21%F9%04%00%07%00%09%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04%2C8%91%04%01Cax2%C5%A8%14%60Q%24%13M%02%01%C1-%7C%12%92i%D4D%1A%80%22W%86%96%8B%28%1C%0A%05%90%40%2C4e8%033%28%81%D5b%10%1F%1Fo%07%10%08aS%26%1D%0A%8B%03%1Eg%7Cj%7F%81%07%94%10%10%07%1DR%29%0B%24%19%19%0Ax%1E%03%19%1D%0B%0B%19%03%18%82%95%06%06%07%87D%16%12%12%9C%9F%19%13S%24%04%96%AD%AD%05%B8C%29%16%16%02%02%A6%C0t%03%07%BD%0F%0D%09C%2A%29%26%26%28%B2%26tD%0A%06%0F%CD%0E%0F%0BB%2A-..%D3.%D8E%1E%DC%0E%15%0E%0C%005%2B%2A%F3%E4%E8Q%08%EC%EC%0D%02%2F5%2C%FF%2AX%D8%2B%92%81%5D%85%0A%17%06%C4X%D8O%E0%C0%22%07%10%5E%B8%40%00%86%C5%851%1E%16aPA%83%C7%033f%C8%B0%08C%23%91%01%1A6%A4%AC%10%B2%A5%0C%93C%14l%10%B1%A1%26%8D%9B4B%C2%14%A2%40%84%CF%5D%9ACr%CE%D8%09%60%40%88%A3%22.%10%A1A%14%00%83%10%23F%840%D0%B4%C8%83%A3Q%11T%8DY%02jT%10%5B%85%3C%28%11%B5%84%08XM%13%9C%28%C1%F6%84%D6%AD%20J%ACe%5B%02%DCV%027%E6%9E%20%10V%C8%80%BC%27.%CC%E9%0B%00%EF%88L%84%FD%2AH%CC%B8%B1c%98A%00%00%21%F9%04%00%07%00%0A%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04L%3A%03O%22%01%02%0D%3A%C5%A8%14%60Zd%14%83%01%28%B2d%10%BE%20%C94%EA%B2%2C%3AWN%12%D4%FDb%10%08%CFd%2Cl%A1%04%92%05%29%AD%E5z%09o%1F%05%04bS%2A%26%26%16%16%02zi%1El%09%5Ep%08%05%05%08%24R%2C-..%88%8B%0B%0B%12%12%13%02%7B%09%80p%07%05%07%1F%85D%2B%2A%B1.%29%88.S%0B%09%08%1F%07%BC%07%18sC%2F%2C%C3%B0-%2AtB%1C%95%BD%06%11C01%2F%D2%C3%2C%C8C%19%BC%10%06%DB%0BB0%DF%DF11%D6D%03%07%DB%DB%14B2332%DF%E4E%04%E8%0F%06%02%ED%F8%ED%F1D%1D%DB%0F%0F%0E%06%CC%A0A%90%E0%BE%22%1F%00%3A%A8%40%C0%A0%10%1A%07%89%24h%E0%A0%E2%01%88%11%A5%0C%A8%B8%F0A%C6%29%19%2AT%B8%40%F2%A3%14%05%24%2Fh%B8%602%CA%00%95%1A48hY%84A%CC%0D%1A%0C%D0%24b%60%83%CFU%0D%08v%0A%C9%20%A2%E8%06%11%1E%84%028%10BD%D3%0D%AEZ%26%08A%95j%D0%9D%03F8%0D1BC7%9A%09J%94%18%C1u%04%01%9A%024%88%5D%5B%A2%81%80%9D%17p%B0%0D%01E%A8%8D%13b5%28P%BA%D4F%DB%AF%7C7%60x%CBWH%D4%C2c%82%00%00%21%F9%04%00%07%00%0B%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04%98%24%1D%05g%C0T%2C%8A%D0%28%A0u%5Ct2%0A%C5%C0%13Ix%07%02%29%94EEY%24V%EC%B6%9B%A0%10%18%83%89XXS%B5%5C%263%3A%B9%04u%19%04%04%08%14%12b%2F%2C%2B%2A%2Ax%26%02%12%24Y%03%7E%09%80%82%08%04OP01%2F5%88%8B%26%A1%A1%28H%03%94%81%08%A9%08%85E0%AE%9C%2C%8A%2AR%12%20%A8%08%1F%05%04rC3322%9B%2F%2FsB%0A%18%A9%05%05%07%20%BD%BE%BE%C10%C5C%1D%B8%07%CB%05%AC4%DB4%CF%D3D%0A%CB%07%E3%09B4C%DD%DFE%0C%E3%07%10%10aD%DB%EAD%1D%E3%10%06%06%03%F4%C5%08%F9%F9%0C%F8%CD%89%F0%CF%C0%07%81b8%3C0%F0%60%21B%29%19%1A%3Ep%D0%E0a%94%0C%0D%1A8%A8P%D1b%91%01%0EBVx%E0%B1H%02%91%15%0E%94%24r%E0%C2%85%0A%17%08%AC%14%92A%83%86%0B7%F7%CD%3C%A0a%83%CDT%0B%ACJF%10%21%A2%A7%06%99%2B%07l%20%2A%C2g%26%8F%09D%84%60%2A%02%A9E%05%06J%84%D8%BA%F5A%3C%84%08%1C%94%18%CBu%84%06%12%1E%0F%9C%18%5Bb%C4%D8%0B%19J2%B0%C1v%EC%83%A7%1Em%AC%5D%8B%E1kI%BD%21%3E%E0%5D%99%C1%83_%28A%00%00%21%F9%04%00%07%00%0C%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04%B4L%13%C9%22%C3%ECH%8A%D0%28%E0%B5r%B9L%16eF%C1%19x%40%0A%814%1A%AB%ADTW%94%60%D1Q%28%BC%91DBa%19%0Fa%B1%17k%D5%BAfI%5B%03%20q%09%14%11bR332xzhXZo%83r%14%0C%0C%0BR44%8Bx%2C%2A%2A%7D%7E%0B%0A%93%09%0C%04%A8OQ%9B3%8D%2FR%02%03%A6%A8%04%08%14%13%99%9CvB%19%A7%B5%08%08%03%B92%BBC%24%18%18%C0%C0%AAE%9B%C5D%0A%C0%1F%1F%05%11%CF%CF%09%D3%05%DB%88%D7c%24%D4%07%05%07%0A%DE%BB%04%07%E9%07%09%E6v%20%E9%10%10%08%EDc%0A%F0%10%07%F4R%1D%06%FD%FD%FAQ2%F8%FB%07%B0%08%87%07%03%0B%16I%F0%A0%E1%83%0F%0A%89%14h%E0%A0%22%81%88%BC%1CT%D0%E8%40%18%C6%02%1A%2BTh%D0%AD%60%84%0B%28E2%C08%E0%82%06%0D%291%29L%B0%A1%E6%CB%0B%14%14%0A%14%11%22%84MC%03%25%9F%B9I%40%A0B%89%9E%3DkV%20A%EFA%89%A7GC%8C%18%E1%F3B%06%7D%25N%40%95%3A5%84%01%99%F4%20h%85Zb%C4%06%02A%CD%9DX%CB6%04%02%B0%00%0D%9C%B8P%E1%C3%00%5Cc%82%00%00%21%F9%04%00%07%00%0D%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04%BCX%2AW%0Ae%11L%2C%C5%A8T%08%83%1DWI%93E%B2%C8%28%16%D0itF%86%C5%8E%D9mW%C1%19t%C2b%00m%3E%93YY%2B%97%095Yt%D8%03%20%03%13qC4e15%2B-%29%26%02%7E%0A%03%1E%20%11%11%12%85r%87U%89Hz%12%7F%92%20%09%09%11%02%98%873S%26%1D%A1%A3%14%11pRs%98%0B%94%A3%0C%04%03%98%BB%0B%B7%04%BF%97%BB%85%1D%14%BF%04%08%1E%C2%98%20%BF%08%08%18%A6%CAb%0B%18%18%CE%08%0A%D2q%14%D7%1F%11%DAb%03%1F%1F%05%05%04%E0S%0A%E4%07%05%1F%E8R%1D%05%07%EC%07%EFQ%1D%F3%F9%F6E%0A%F9%F3%FBD%22%18%800%10%01%C0%21%08%0C%284%40%E1%20%80%0E%0F%16%1A%E0%E0%10%C1%83%88%11%A3%ED%03%E1%A0c%83%06%0D%01rh%D0%B1%82%83%07%0B%00F%A8p%A1%82K%07%09%F6e8%A0%A1f%CB%0A%104%16B%40%20%82%02M%05%11%18%3C%10%B1%A1%A6%86%0B%17P%2A%7BP%A2i%D3%10%21D%88%D0PT%C3%83%0C%D2n8%1D%01%B5%EB%86%A2%10R%2A%5B%60ck%88%11h%89j%60%A0s%97%06%1C%27%9C%3E%1D%A1%01%81Xm%12%3E%B8%2Cq%A2%C2%03%04%83%E2%04%01%00%21%F9%04%00%07%00%0E%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%04%D0f3X%AC%C6R%B5%5C%C5%A8%B4xT%BE%9A.%93%C5%92%9Az%87U%D8U%95%9DH%16%12%D3WJ%AB%C6%C6eI%27%D3A%AD%89m%A4%B2%B6r%A5P%13%0B%1D%0A%84%02wCH2VM%7Fg%19%0A%1C%03%03%13%87_.%02%0B%8F%92%11%03%16%95_%16%90%03%20%11%09%0A%9F_%13%A3%A4%09%09%86%A8S%0B%AC%09%14%1C%B0%5E%1C%AD%14%0C%0C%94%B7Q%12%09%BC%04%04%19%BFR%11%C4%C4%20%C7Q%0A%CA%18%14%CDE%1D%08%D6%08%04%D3D%24%D7%D6%DAC%D5%08%05%1F%1F%DFB%0A%1F%05%05%07%E5%E6%20%07%EB%07%D9%E6%04%07%F6%07%09%E6%1D%10%07%FC%07%A7%DF0%180%00%81%DF%ABi%20%06%2A%CC%A7M%81%81%07%0A%0D%2C%D0%16%E1%81E%88%0F%22%AC%11p%01%60%94%0C%07%1CTp%E0%A0%C1%83%03%07%A7%D8%C0q%A2%01%01S%0A%2200%A0%E1%C2%85%91%23%25%AEQp%A2%84%CFC%12%23F%84%18%BAAC%CD%0AH%0Dt%B8s%E3%84S%A0A%85%86%28Z%F3%E6%81%89k%3A8%7D%0AU%A8%88%0DEo2H%F9e%C1%87%12%5C%83N%FDz%01%03VT%AA%10%94%0C1%C2%22%82I_%82%00%00%21%F9%04%00%07%00%0F%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%24%D2f3%18%ECU%2B%3A%9FO%DAQ%F9b%A9%AE%D0%AC%F3%28%5BZ%5D%A6%94K%AB%95%26cU%15%D82I%91%A3%C7sm%A5J%99%26%8B%05%EA%FD%9Cuc_%26%28%02%0B%1D%1D%26%7CZ%2Ck%12%85%0A%19%7B%89Y.%84%1D%19%0A%03%24%92Z%26%24%97%98%03%13%9BY%16%0A%1C%03%1E%20%0A%A3Y%1D%A8%20%11%09%16%ACO%16%03%B0%09%14%9A%B4N%1C%11%B1%09%1C%BCN%19%09%B9%09%20%C3E%24%09%0C%CE%0C%CAD%0B%0C%04%D5%04%D1C%0B%D6%18%D7%D8%00%1D%08%18%E1%DD%D8%03%08%E7%08%D0%DE%0C%1F%1F%E7%11%DE%24%05%F3%F3%AB%D8%04%07%05%F9%05%02%E5%07%FF%FF%E0%3D%B9%95H%01%04%08%00%0BHx%02%E2D%89%04o%3C%18%98x%10B2b6p%94%28%F1%20%03%94%0E%05%1EL%A4%F8%A1_%91%086ll%5Ci%80%81%AA%0C%20%12%1Cp%D0%E0%81%C8%89%07%16%3C%91%B0ae%89O%10%40E%08%D5%A0%E1B%85%0A%0Dh%8A%3C%D0%21%CB%82%06%0EK%8C%18%114%04%D1%A2G%2B%D0%2C%A0S%8B%00%0C%2B%A7%8E%D8%20b%03Q%A3G%1F%240%F9f%C1%87%0D%21%A8n%98%7B%F6%C2%03%02%5D7M0g3%C4%06%91%048%88%CA%12%04%00%21%F9%04%00%07%00%10%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%0Ei%B4%99q%C9d%22g0X%ACI%5D%3E%A5%AFZu%0BxBc%B5%95j%C5u%26%A1%B0%17K%E5r%B5%CA%CC%99LZ%5B%BBL%28%17%9C%99%B6%A7P%16%13%7BM%2Cm%26%16%12%0B%82%83K%2Ax%13%89%1D%26%8CK.%02%91%0A%0B%94K%02%0B%1D%0A%A0%28%9BE%26%19%A0%03%03%12%A3E%1D%1C%A8%03%0A%ABD%0B%03%1E%20%20%03%B2C%12%B7%11%BE%BAB%12%BE%09%C4%C0%00%12%C4%C9%C6%24%09%14%CE%09%C6%0A%0C%04%D4%11%C6%09%D4%D4%1EF%16%8C%0B%08%18%18%04%18%19E%17%0F%8C%09%08%EB%EB%02C%157%27%25%D0p%03%1F%08%F7%08%DBB%21%27%F2%F2%B9%B8d8P%A0%60%01%0C%AA%84%60%28%21%AFD%89%11%F4%A8%0C8%40%91%E0%81%7DB%26%5Ch8%22%C4%08%03%E5%96t%40%00%A1%22E%0C%8B%86t%08%E10%84%CB%10%1B%0CP%00%91%21%03%88%04%07%1E%180%60%B2%80%26U%23%0AD8%1C%D1Q%C4%06%0D%1A.8X%FA%40%E7N%08%10%0A%90h%B2%E0A%C7%8E0%8F%26%AD%C0t%E7N%04%09%9B%08%20%20%22%84%D1%0DG%2FT%E0Z%A1AS%03%09%DCq%F9%A6%01%26%D2%0Bj%B9%3A0%C0%20%2C%9C%09%030%EC%C4%5B%92%81%82%94K%82%00%00%21%F9%04%00%07%00%11%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8F%C8d%92%A6l6i3%A7%B4%08%95%C1%A6R%1A%14%16%8Ba%97%DA%995V%7B%7D%8F%E1%19%0C%F6b%B1%CEH5%BB%B6R%A9%E0%C79K%E5J%DD%F1Em%7C.%26%26%80F%7C%29%26%16%13.%87D%2B%8A%16%02%12%86%8FC%8B%02%0B%1D%12%97%98%12%9B%1D%1D%9EB%26%24%1D%19%0A%19%A4%00%26%A9%0A%1C%1C%AC%28%B0%03%B6%AC%12%B6%1E%BBC%1E%07%11%80%24%20%1E%20%11%B6%1A%276%25%0D%80%03%11%CF%09%0A%11%27%27%25%D6%0Ap%12%09%DB%DB%24%12%D6%E0%06p%20%0C%0C%14%14%09%16%00%1F%D5%E0%09_%0A%04%F2%F2%03B%0B%E0%21%23%1B%F5R%1D%18%F3%F2%3A%09%21%60-%84%C1%0D%C0%9Ap%40%C0%10%01%06%04%FC%84%08pPb%84%C1%10%22%0E%AC%3A%D2%81A%81%02%0D%110%98P%84%C4%85%11%16Cl%D0p%E1%40%02%0F%1928%FBp%A0%E6%81%02%1F%10%10%10X%24%C3%05O%8C%226%AC%BC%E0%C0A%83%07%0F%0C%18%B0%F9%11%24%89%24%0B%0C%04%5D%C9%B2%E8Q%A5%06%20%D4%2Cp%60g%13%01%044%88%BDp%A1%82Q%A4X%B7%82%20%29e%01%86%0Ad%2B%C8u%90T%29%84%04%3C%B1L%E0%40%A0f%D1%9B%14%14%B0E%12%04%00%21%F9%04%00%07%00%12%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%28%8D6%8B2%A7U%2BrJ%9D%C1%B4G%AC%17%16%03%17gh%18%EC%C56%13e%EAW%8D%C5r%13cr%96%AA%B5%B2%0Bc%2C%2B%7B.-%7EB%83.%26%29%86%00%2A%89%26%28%28%8C%2A%90%16%02%12%06%0F%0F%06%06f.%02%97%12%0B%25%27%27%25%25%19%60.%0B%AC%1D%1D%22%A7%A7%11%60%28%AE%19%B7%0E%B1%25%04%60%12%0A%BF%0A%19%05%A6%A7%0F%60%19%1C%03%03%1C%1D%11%A6%21%21%A8V%13%CA%1E%CA%0B%12%23%25%23%23%21%10V%1C%20%E2%E2%16%00%08%DC%DD%22%B3O%1D%09%11%EF%09%0AB%0B%1B%DC%D0%1B%1CN%0B%14%14%09%FE%09%13%86%10%80v%EF%C2%3A%25%0A%08%28d%E0O%DE%10%01%0F6H%DC%A0%E1%C2%81%0EHH%24%40%80A%21%01%06%11%CA%11%21qA%A2%86%8A%0E%1C%14%880%C0%D5%00%10%04%10%C8%E4%B8P%C2%91%0C%0EN%5E%B8P%C1A%03HM%9C%0E%08-%F0%E1%C3L%02%0B%92%2C%80%B0%B3B%CF%9F%9C%0C%08%1Dj%14%01%05%9BJ%040p%EA%D4%C1%26N%10%86%16%28%80%60%40%C0%26%0B%08%3CH%F9%D5%40%D8%A1%09%B0B%99%A0%80A%81%03%9C%C8%26%C8p%16I%10%00%21%F9%04%00%07%00%13%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJU%D2%AA%CB%2B%F6H%A3%CD%B6%C3kw%F6%05%03%BA%DE%19%0C%002%0C%B0%E4%99%0CF%2F%9Cl%A7%CB%7B%3A%87%C5b%2F%0E%25%83%25%04T%7E%80%2C%2C%22%84%25%7BR15%8A%2B%2A%8D%25%0AT5%94%2A%2A.%84%23%25%1CT%2C-.%A6%26%8C%23%21%25%20T%2A%29%29%26%B2%0F%25%AA%21%0CT.%16%28%16%BD%08%21%B6%06T%13%12%02%12%12%16%20%C0%21%22%22%19R%26%0B%D2%24%24%28%12%1B%22%CC%1B%07R%24%19%1D%19%DF%26%00%08%1B%1A%E7%1A%11P%12%0A%ED%ED%0BB%0B%1A%1B%E6%1A%15%A2M%12%1E%03%FC%1C%0A%28C%18%CC%3BW%C1A%AB%25%1D%22%80%F0%C0%D0%03%09%22%02%0Ch%B8p%C1%81%C5%0F%1D%90H%00%91%20A%84%8F%11%06%00%24B%A2%C1%85%0A%15%1A4x%F0%00%01%88%01%1D%3A%28%18%40%81%00%01%06%0C%3Az%14p%24%C3%03M%94%0EV%1A%18z%E0%40%01%04H%11%D8%24%40%C1%A3%84%24%0B%0E8H%F9%60%28%84%A2F%93bX%0A%82%A7%12%01%09%1E%085p%15%EBQ%04%18%94%0E%B0%E0d%01%83%A1%06%CC%16%28%F0%01mW%29%13%14%24%A8%5BTi%84%0C%13%94%04%01%00%21%F9%04%00%07%00%14%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%85R%AA%C9E%09%07%C2%1A%11%A7%93%ED4%F0%0A%25%A5Si%FD1%03%40%EAuI%E1%A5%D1%0A%F2R%83j%07%D8g%0F%25%23%23%25%04T3v433%1A%25%21%21%25%1E%87%8B%8B2%22%83%8FtS20%9D%9D%21%98%22%9AR01%A6%2F%2F%1A%A0%22%22%92S15%A8%2C%2C%06%1B%22%21%1B%0CT%2C%2B%BD%BD%08%1B%C1%1A%10T%2A-%C7-%2A%1E%C2%1A%17%19R%2A%26.%29%D4%2A%12%1A%D8%1A%15%05R%26%16%26%28%E1%2A%00%04%17%CD%15%0E%5DO%26%0B%12%02%13%13%26B%0B%15%17%E8%0E%0F%A3K%16%19%24%0B%FF%12%5C%0C%A1P%A1B%83%06%0F%0C%B8R%22A%81%82%0C%19%3At%98%40D%C0%01%07%E8%12%1A%40%D0%01%89%00%0E%1E%06%0Cp%A8%A0%83%3C%22%0B%0C8%40h%A0%E5%01%0C%23%FFeP%00%22A%04%10%21%07pP%80%E2H%07P%03%1A%0D%408p%A0%00%02%04%18%08%10%60%90%C0%E6M%10%03%28%22YP%40%23Q%A2F%91%2Ae%DA4%C2%00%0BK%04%24p%89%B5%C0%07%ADJ%9B%26P%00%B6%89%84%04W%0B%98E%9A%94%40%02%0E%02%A4L%C8%90%40%A9Q%06%0C%40th%8B%24%08%00%21%F9%04%00%07%00%15%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8F%C8%A4r%C9l%3A%9FL%85%06%DA%5ClpSjr%E2%28%95lY%AD%91%E0%F5%DE6%E2%E2%A2%EC%1D%29%D2DDi4%F2%26%E0C%C9%A6%14%0A%95%20xC%20%21%23%7D%25o%81%00%08%84%7D%06%89B%06%22%21%22%22%0C%8F%00%1A%1B%94%22%03%8F4%1B%A0%A0%19p44%00%A5%1A%99%A9%88Z33%A543%15%A9%1A%17%1Ei%AE%B93%10%B5%1A%15%14i0%C2%C3%04%17%C6%0E%07i%2F110%CC%03%17%15%15%0E%0E%1DZ%2F%2C%2C%2F%2F5%2F%02%0D%D2%0E%0D%08Z%2A%2A%2B%D9%DA%00%0C%0E%D3%0F%06%B7O-..-%E6%2BB%0B%0F%0E%EF%06%10%ACK%5CX0a%22E%0A%17%F8%84%24%E8g%C0%C0%81NKPH%90%60%C1%02%0A%14.%88%08%28%D0%0F%C2%81%03%04H%20%B1%40%22%03%89%05%13%05Xh%A1%E6%40C%8F%1F%3F0%18%90a%C1%02%12%1D%06%0C%E0%A0%20C%87X%93%122%1A%E9%E0%12%E6%81%0F%080%10%20%C0%20A%04%10%3Ayf0i%22%89%04%04%1F%0BhE%90%94%29%85%08O%3D%ECT%D0%A1%AA%12%01%20%B4n%ED%CA4%81%5B%10P%17%98e%22%21%C1%07%A4%5C%976u%1B%21%83%05-%132%80%60%C0%00%01%01%A7%1C%16%FCM%12%04%00%21%F9%04%00%07%00%16%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%2C%1A%8FH%E2%22%C9d%0A0%B8%A6%B4%B8x%9CN%A5%E94%B3%C1%9Ep%13-s%B1%29%99%CDQ%F1q%F20%8F%CE%06%F5%91%F0%0E%85%CC%09%B9%91%3C%1A%D9C%03zF%18%21%7E%85y%82D%12%1B%22%21%22%22%07%89E%1E%22%1A%8F%22%19%92D%08%1B%9D%1Aq%9AC%06%1A%9E%0C%A1C%0E%1A%AA%17%81%A7%00%17%B0%17%15%99%AE%B2%15%0E%15%0A%AE%00%0F%B7%0E%0E%AD%A7%07%15%C4%0D%88z4D4%04%BF%0D%0F%1F%894%D2%00%D2%03%0E%0D%06%D9%1Dz3%DD%D243%02%06%0F%D9%06%18z00%DD%DDB%14%E4%D9%07%C1S11%E9%E92B%0B%D9%10%07%FD%B4R%2CX%D4xA%AF%DE%90%08%06%FA%F5%2B%A0%AB%89%8A%16%2AV%08%AC%11%83%88%80%0F%0A%0F%14%40%90%60%C9%11%17%26L%B8p%A1%22%22%8B%3D%054jD%80%81%40%82%0C%24%04L%90%20a%C1%02%01%16B%8ETq%D2%08%89W%0F%05%0A%7C%40%80%80%00%03%0A%09%40x%18%A0%20C%87%05%12%2C%A00%91BE%12%09%046%B2%24%604A%04%10%03%98%C2%84%3A%C1%84U%26%13%40%10-%DA5%E9%D2%A6N%17%A0p%A1E%02%08%0C-%19%24%D8%0BV%AC%84%14z%2Ct%18%F0uo%D8%0E%02L0%09%02%00%21%F9%04%00%07%00%17%00%2C%00%00%00%00%20%00%20%00%00%06%FF%40%80pH%9C%0C%3C%C4%A4r%99%5C%7CJ%A7%1Bs%CA%14%10J%D8S%89%CA%1D.%1E%D8%B0%8D%D0%A5f.%D8Q%F8t%283%17%97%D1%28%14%0A7%10n%E5%C4%10%9A%F7K%06%19yK%0C%22%22%21%87%22%09%83K%0B%1A%1B%86%22%1B%03%8CK%04%8F%1B%90%11%95J%12%17%1A%8F%1Am%9CI%03%9F%A0%1A%82%A4D%18%17%AE%17%10%ABI%07%15%15%0E%0E%8B%B2C%0F%B6%B7%94%BAB%0D%B6%0D%0D%AA%C0%0D%0E%0D%0F%0F%0A%C0B%06%CB%D0%BF%C0%05%06%D6%06%9B%CE%0C%D7%06x%CE%03%06%10%10%07%07%1D%CE%02%E3%E4%07%0C%954K%09%EA%05%05%CDy34%EEI%12%05%07%F2%1F%08%E6ed%CC%B0%E7%EE%DE%10%10%FC%0A%20%40%40%80%1E%95%180%04%12%C4%27d%02%81%02%FE%18%12%00%21%81%09%0B%165%20%C2%188C%C9%82%85%0B%090%A0%90%80%C3%02%01%26L%A4p%91%A2%85%0A%16%2FD%8E%5CB%82%00%06U%0C%2A%19D%00%E1%81C%86%0E%12%2C%A0pa%13dN%18S%04P%00J%80%25%88%01%03%14tX%90%D4%84%0B%157Cr%B10%40e%82%04C%B3%1E%7D%89%C2%AB%8B%155%DC%08%18p6%C1U%A3%1DH%2C%98%B0tE%25%0B%0B%14%0C%E0%90u%AB%05%13%5C%82%00%00%3B%00%00%00%00%00%00%00%00%00);\
}\
.loop.off {\
	background-image: url(data:image/gif,GIF89a%20%00%20%00%85%00%00%FF%FF%FF%FF%00%00%FE%AA%AA%FE%84%84%FE%60%60%FELL%FE%3E%3E%FEHH%FEVV%FEpp%FE%8E%8E%FE%A0%A0%FEff%FE44%FE22%FE88%FEBB%FEtt%FE%A6%A6%FE%AE%AE%FEjj%FE00%FE%B0%B0%FE%2A%2A%FE%5C%5C%FE%94%94%FE%26%26%FE%22%22%FE%88%88%FE%98%98%FE%7E%7E%FERR%FEzz%FE%1E%1E%FE%20%20%FE%1C%1C%FE%9C%9C%FE%16%16%FE%BA%BA%FE%12%12%FE%B4%B4%FE%BE%BE%FE%CE%CE%FE%D2%D2%FE%D8%D8%FE%C8%C8%FE%C4%C4%FE%E2%E2%FE%EC%EC%FE%E6%E6%FE%F0%F0%FE%F6%F6%FE%FC%FC%FE%DC%DC%FE%04%04%FF%00%00%FE%0A%0A%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%FF%0BNETSCAPE2.0%03%01%00%00%00%21%FE%1ACreated%20with%20ajaxload.info%00%21%F9%04%00%07%00%00%00%2C%00%00%00%00%20%00%20%00%87%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%00%2B%00%00%2B3%00%2Bf%00%2B%99%00%2B%CC%00%2B%FF%00U%00%00U3%00Uf%00U%99%00U%CC%00U%FF%00%80%00%00%803%00%80f%00%80%99%00%80%CC%00%80%FF%00%AA%00%00%AA3%00%AAf%00%AA%99%00%AA%CC%00%AA%FF%00%D5%00%00%D53%00%D5f%00%D5%99%00%D5%CC%00%D5%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF3%2B%003%2B33%2Bf3%2B%993%2B%CC3%2B%FF3U%003U33Uf3U%993U%CC3U%FF3%80%003%8033%80f3%80%993%80%CC3%80%FF3%AA%003%AA33%AAf3%AA%993%AA%CC3%AA%FF3%D5%003%D533%D5f3%D5%993%D5%CC3%D5%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf%2B%00f%2B3f%2Bff%2B%99f%2B%CCf%2B%FFfU%00fU3fUffU%99fU%CCfU%FFf%80%00f%803f%80ff%80%99f%80%CCf%80%FFf%AA%00f%AA3f%AAff%AA%99f%AA%CCf%AA%FFf%D5%00f%D53f%D5ff%D5%99f%D5%CCf%D5%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%99%2B%00%99%2B3%99%2Bf%99%2B%99%99%2B%CC%99%2B%FF%99U%00%99U3%99Uf%99U%99%99U%CC%99U%FF%99%80%00%99%803%99%80f%99%80%99%99%80%CC%99%80%FF%99%AA%00%99%AA3%99%AAf%99%AA%99%99%AA%CC%99%AA%FF%99%D5%00%99%D53%99%D5f%99%D5%99%99%D5%CC%99%D5%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC%2B%00%CC%2B3%CC%2Bf%CC%2B%99%CC%2B%CC%CC%2B%FF%CCU%00%CCU3%CCUf%CCU%99%CCU%CC%CCU%FF%CC%80%00%CC%803%CC%80f%CC%80%99%CC%80%CC%CC%80%FF%CC%AA%00%CC%AA3%CC%AAf%CC%AA%99%CC%AA%CC%CC%AA%FF%CC%D5%00%CC%D53%CC%D5f%CC%D5%99%CC%D5%CC%CC%D5%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF%2B%00%FF%2B3%FF%2Bf%FF%2B%99%FF%2B%CC%FF%2B%FF%FFU%00%FFU3%FFUf%FFU%99%FFU%CC%FFU%FF%FF%80%00%FF%803%FF%80f%FF%80%99%FF%80%CC%FF%80%FF%FF%AA%00%FF%AA3%FF%AAf%FF%AA%99%FF%AA%CC%FF%AA%FF%FF%D5%00%FF%D53%FF%D5f%FF%D5%99%FF%D5%CC%FF%D5%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%08%FF%00%F7%09%1CH%D0%9D9p%D9%B2I%CBF%B0%A1%C3%87%FB%DA%81%93%86%8D%E24l%D3%20j%24%28Q%A1%C7%8B%D2%BEm%DC%D8.%216%8F%161%8E%84X%12%A5%C9%8B%D3D%AElXra%B6%93%D2B%823w%AE%DD%CC%82%09%13.%94%06%CE%E7%CF%87%08O%065w%94e%D0%93%D8%CE5%85%880h6pS%1F%B6%FBf%15kV%87%E7%12r%CDf%F4%2B%C1%AAb%CD%3A%E4%3A%96%A9Z%82%D9%D8f%93%FAv%E07ml%CB%D6%1D%8B%90n%DD%7Dw%BF%7D%03%E7%B7.8%AE%08%DD%FE%05w%B8%F1_%81%E7%06%C7-%FAX%E2%60%C6%5E%FF%9A%C3%0B%AE%16%E1%CA%8C%2FS%D6%CC%F8%E0A%BDf%DDa6%CD%13%F5%40z%3F%DB%95%2B%0D%AEW%EBv%EE%E8%E9%A6W%0F6%EC%95%12M%9Fk%DD%13%F7%EE%7D%BF%EB%01%3F%B7s%F8%B9%E2%B8s%EB%AE%A7%8F%FA%CCv%C1%7B%9E%1B%86%BB%DDn%DE%B0%95%FF%13t%D7%CEyq%F2%C4v%5B%9F%DA%1D%3Bvz%D2G%06%04%00%3B);\
}\
.light {\
	background-position:0 -592px\
}\
.light:hover {\
	background-position:-17px -592px!important;\
}\
.dark {\
	background-position:-34px -592px\
}\
.dark:hover {\
	background-position:-51px -592px!important;\
}\
.avgDL {\
	float: right;\
	padding-bottom: 3px;\
	padding-top: 3px;\
}\
#version {\
	float : right;\
	padding-left: 7px !important;\
	padding-right: 3px;\
	background : white;\
	color: black;\
	-moz-border-radius-bottomright : 5px;\
	-moz-border-radius-bottomleft : 3px;\
	border : solid grey 1px;\
}\
#opts {\
	background : black;\
	color : white;\
	position : absolute;\
	padding : 20px;\
	top : 54px;\
	left : 25%;\
	right : 25%;\
	-moz-border-radius : 12px;\
	border : 5px outset red;\
}\
#myLinks {\
	float : right;\
	margin-top : -435px;\
	margin-right: 17px;\
	font-size: 16px;\
}\
#myLinks a {\
	color : white;\
	text-decoration: underline;\
	display: block;\
	font-size: 12px;\
}\
#opts input {\
	margin-left: 3px;\
	padding-left: 4px;\
}\
#opts label {\
	display : block;\
	padding : 2px;\
}\
#opts label:hover {\
	text-shadow: 1px 2px 1px yellow !important;\
}\
#opts label.on {\
	font-style : italic;\
	text-shadow : 1px 0px 4px white;\
	color : white;\
}\
#opts h1 {\
	background : red;\
	-moz-border-radius: 6px;\
	padding : 4px;\
	text-shadow: 1px -1px 4px white;\
}\
.watch-wide-mode, #watch-this-vid, #watch-player-div {padding-left:0px!important}\
#opts p {\
	padding-left: 20px;\
	font-family : Calibri, Comic Sans MS;\
}");
optionBox = new Element("div", {
	innerHTML : "<h1>YouTube HD Ultimate Options</h1><span id=\"version\">v "+thisVer+"</span><p>Settings, if changed, will be applied on the next video. Roll over an option to find out more about it.</p>",
	style : "display : none",
	id : "opts"
});
for(var opt in opts) {
	var val = GM_getValue(opt);
	if (val == null)
		val = opts[opt][1];
	var chk = typeof val != "string";
	var a = new Element("input", {
		type : chk ? "checkbox" : "text",
		name : opt
	});
	if (chk) a.addEventListener("click", function() {this.parentNode.className = this.checked ? "on" : "";}, false);
	a[chk ? "checked" : "value"]=val;
	var s=document.createElement("label");
	if (chk && val)
		s.className = "on";
	if(chk) {
		s.appendChild(a);
		s.appendChild(document.createTextNode(opts[opt][0]));
	} else {
		s.appendChild(document.createTextNode(opts[opt][0]));
		s.appendChild(a);
	}
	s.title=opts[opt][2];
	optionBox.appendChild(s);
	opts[opt]=val;
}
optionBox.appendChild(new Element("a", {
	href : "#",
	className : "yt-button yt-button-primary",
	style : "float:right;margin-top:-25px;",
	onclick : function(E) {
		E.preventDefault();
		toggler.textContent="Show Ultimate Options";
		player.style.visibility = "";
		if(player.getPlayerState()==2) player.playVideo();
		var newOpts=optionBox.getElementsByTagName("input"), newOpt;
		for(var i=newOpts.length-1; i>=0; --i) {
			newOpt=newOpts[i];
			GM_setValue(newOpt.name, newOpt[newOpt.type=="text" ? "value" : "checked"]);
		}
		optionBox.style.display="none";
	}
	}, new Array(
		new Element("span", {
			textContent : "Save Options"
		})
	)
));
var linkbox;
optionBox.appendChild(linkbox=new Element("span",
	{
		id : "myLinks"
	}, new Array(
		document.createTextNode("Script links: ")
	)
));
var sLinks = {
	"homepage" : "http://userscripts.org/scripts/show/31864",
	"official" : "http://code.google.com/p/youtubehd/",
	"author" : "http://userscripts.org/users/avindra",
	"e-mail" : "mailto:aavindraa@gmail.com",
	"forums" : "http://userscripts.org/scripts/discuss/31864",
	"wiki / F1" : "http://code.google.com/p/youtubehd/wiki/mainPage",
	"open bugs and requests" : "http://code.google.com/p/youtubehd/issues/list",
	"all bugs and requests" : "http://code.google.com/p/youtubehd/issues/list?can=1",
	"new bug" : "http://code.google.com/p/youtubehd/issues/entry",
	"new request" : "http://code.google.com/p/youtubehd/issues/entry?template=Feature%20Request"
};
for(var link in sLinks) {
	linkbox.appendChild(new Element("a", {
		textContent : link,
		href : sLinks[link]
	}));
}
linkbox.appendChild(new Element("a", {
	href : "#",
	textContent : "check for update",
	onclick : function(e) {
		e.preventDefault();
		update(true);
	}
}));
linkbox.appendChild(new Element("a", {
	href : "#",
	textContent : "debugString",
	title : "This is for easing development. Don't worry about it unless Avindra tells you to use it.",
	onclick : function(e) {
		e.preventDefault();
		opts.swfArgs=swfArgs;
		prompt("Here is your debugString:", opts.toSource());
	}
}));
document.body.appendChild(optionBox);
$("masthead-nav-user").appendChild(
	toggler=new Element("a", {
		href : "#",
		style : "padding: 4px; background-color: blue; color: white; -moz-border-radius: 8px;",
		textContent : "Show Ultimate Options",
		onclick : function(E) {
			E.preventDefault();
			var p = player.getPlayerState();
			if(optionBox.style.display=="none") {
				if(p==1) player.pauseVideo();
				player.style.visibility = "hidden";
				this.textContent="Hide Ultimate Options";
				optionBox.style.display="inline";
			} else {
				if(p==2) player.playVideo();
				player.style.visibility = "";
				this.textContent="Show Ultimate Options";
				optionBox.style.display="none";
			}
		}
	})
);
if(!opts.bigMode && (opts.fit || opts.true720p))
	opts.bigMode = true;
if(opts.jumpToPlayer)
	head.scrollIntoView(true);
unsafeWindow.stateChanged=function(state) {
	if (state == 0) {
		if (unsafeWindow.watchIsPlayingAll) {
			unsafeWindow.gotoNext();
		} else if(opts.loop) {
			player.seekTo(0, true);
			player.playVideo();
		}
		return;
	}
	if (!init && state == 1) {
		init = true;
		if(opts.autobuffer)
			player.pauseVideo();
		if(opts.useVol && opts.vol.match(/(\d+)/))
			player.setVolume(RegExp.$1);
	}
};
unsafeWindow.onYouTubePlayerReady=function(A) {
	if (player.getAttribute("greased")!="true") return;
	if(!player.isMuted) {
		player.src += "";
		return;
	}
	player.addEventListener("onStateChange","stateChanged");
	unsafeWindow.g_YouTubePlayerIsReady = true;
	if(opts.snapBack) {
		unsafeWindow.newFmt=function(fmt) {
			var isBig = fmt == "large";
			toggleWidePlayer(isBig);
			if(isBig) {
				fitToWindow();
				if(opts.fit)
					unsafeWindow.onresize = fitToWindow;
				else if(opts.bigMode)
					fitBig();
			} else {
				player.style.marginLeft="0px";
				player.style.width = "640px";
				player.style.height = "385px";
				unsafeWindow.onresize = null;
			}
		};
		player.addEventListener("onPlaybackQualityChange","newFmt");
	}
	if(unsafeWindow.toggleLights && opts.autoCinema)
		unsafeWindow.toggleLights(true);
}
var downloads={"3gp":"17", mp4:"18"}, swfArgs=unsafeWindow.swfArgs;
if(/(?:^|,)34/.test(swfArgs.fmt_map))
	downloads["hq flv"]="34";
if(unsafeWindow.isHDAvailable || /(?:^|,)35/.test(swfArgs.fmt_map))
	downloads["super hq flv"]="35";
if(unsafeWindow.isHDAvailable)
	downloads["hd mp4"]="22";
var info=$("watch-ratings-views"), block=new Element("div", { className : "avgDL" });
block.appendChild(document.createTextNode("Download this video as: "));
var flv=new Element("a", {
	href : "/get_video?video_id="+unsafeWindow.pageVideoId+"&t="+swfArgs.t,
	innerHTML : "flv"
});
block.appendChild(flv);
for(var dl in downloads) {
	var temp=flv.cloneNode(false);
	temp.innerHTML=dl;
	temp.href+="&fmt="+downloads[dl];
	block.appendChild(document.createTextNode(" // "));
	block.appendChild(temp);
}
$("watch-this-vid-info").insertBefore(block,info);
if(opts.usecolor) {
	swfArgs.color1="0x"+opts.c1;
	swfArgs.color2="0x"+opts.c2;
}
if(opts.hidenotes)
	swfArgs.iv_load_policy="3";
if(unsafeWindow.watchIsPlayingAll)
	swfArgs.playnext = "1";
if(!opts.autoplay && !opts.autobuffer)
	swfArgs.autoplay="0";
else if(opts.autoplay)
	swfArgs.autoplay="1";
var ads=new Array("infringe","invideo", "ctb", "vq", "interstitial", "watermark");
if(opts.hideRate) {
	ads.push("ratings");
	ads.push("ratings_module");
}
if(location.hash.match(/t=(?:(\d+)m)?(?:(\d+)s)?/)) {
	var start=0;
	if(RegExp.$1)
		start += Number(RegExp.$1) * 60;
	if(RegExp.$2)
		start += Number(RegExp.$2);
	swfArgs.start = --start;
}
for(var i=ads.length-1;i>=0;i--)
	delete swfArgs[ads[i]];
if(unsafeWindow.isHDAvailable && !opts.useHD)
	swfArgs.fmt_map = unescape(swfArgs.fmt_map).replace(/^22[^,]+,/,"");
else {
	if(swfArgs.fmt_map.indexOf("18")==0 && /3[45]/.test(swfArgs.fmt_map))
		swfArgs.fmt_map=swfArgs.fmt_map.replace(/18.+?,/,"");
}
var vars="&enablejsapi=1&vq=2&jsapicallback=onYouTubePlayerReady";
for(var arg in swfArgs)
	if(!/^(?:ad|ctb|rec)_/i.test(arg))
		vars+="&"+arg+"="+swfArgs[arg];
player.setAttribute("flashvars",vars.substring(1));
toggleWidePlayer(opts.bigMode);
player.setAttribute("greased", "true");
player.src += "";
head = head.insertBefore(new Element("div", {id:"vidtools"}), head.firstChild);
if(opts.fit) {
	fitToWindow();
	unsafeWindow.onresize = fitToWindow;
}
document.addEventListener("keydown", function(e) {
	if("INPUTEXTAREA".indexOf(e.target.nodeName) >= 0) return;
	switch(e.keyCode) {
		case 80: player[(player.getPlayerState()==1 ? "pause" : "play") + "Video"](); return;
		case 77: player[player.isMuted() ? "unMute" : "mute"](); return;
		case 82: player.seekTo(0, true); return;
		case 69: player.seekTo(player.getDuration(), true); return;
	}
}, false);
var shade, tog;
function toggle() {
	if (document.body.className.indexOf("watch-lights-off") != -1) {
		tog.className=tog.className.replace("dark", "light");
		shade.style.display = "none";
		document.body.className = document.body.className.replace("watch-lights-off", "");
	} else {
		shade.style.height = (window.innerHeight + window.scrollMaxY) + "px";
		tog.className=tog.className.replace("light", "dark");
		shade.style.display = "inline";
		document.body.className += " watch-lights-off";
	}
}
if(!unsafeWindow.toggleLights) {
	if(opts.autoCinema)
		document.body.className += " watch-lights-off";
	document.body.appendChild(shade=new Element("div", {onclick : toggle, id : "watch-longform-shade", style : "height : "+document.body.offsetHeight + "px; display : " + (opts.autoCinema ? "" : "none")}));
	head.appendChild(tog=new Element("span", {
			id : "light-switch",
			className : "master-sprite " + (opts.autoCinema ? "dark" : "light"),
			onclick : toggle
	}));
}
head.appendChild(new Element("span", {
	className : "loop o" + (opts.loop ? "n" : "ff"),
	style : "padding-left:2px;padding-right:2px;",
	onclick : function() {
		GM_setValue("loop", opts.loop = !opts.loop);
		this.className = "loop o" + (opts.loop ? "n" : "ff");
	}
}));
$("watch-actions-area").childNodes[1].insertBefore(
	new Element("div", { className : "watch-tab" }, new Array(
		new Element("a", {
			onclick : function(E) {
				E.preventDefault();
				var time = "";
				if(confirm("Do you want to include the current time in the link?")) {
					time = player.getCurrentTime(), m = Math.floor( time / 60), s = Math.round(time - m * 60);
					time = "#t=";
					if(m > 0)
						time += m + "m";
					if(s > 0)
						time += s + "s";
				}
				prompt("Here is your custom made link for highest quality:", "http://www.youtube.com/watch" + location.search.replace(/[?&]fmt=\d*/,"") + "&fmt=" + (unsafeWindow.isHDAvailable ? "22" : "18") + time);
			},
			textContent : "Get Link",
			href : "#"
		})
	)),
	$("watch-tab-flag")
);
if(opts.utterBlack)
	GM_addStyle("#watch-longform-shade, .watch-lights-off {background : black !important;}");
if(opts.collapse) {
	var panels = document.evaluate("//div[contains(@class,'yt-uix-expander')]", document, null, 6, null), panel, i=panels.snapshotLength;
	while(panel=panels.snapshotItem(--i))
		panel.className+=" yt-uix-expander-collapsed";
}
if(opts.true720p && unsafeWindow.isHDAvailable) {
	player.style.width="1280px";
	player.style.height="745px";
	player.style.marginLeft="-160px";
}
if(!opts.fit && opts.bigMode) {
	fitToWindow();
	fitBig();
}
}