// ==UserScript==
// @name                Stickam Caption Updater
// @author              Bret McDanel http://www.0xdecafbad.com
// @version             20101209.03
// @description         Updates the caption info to the tuned frequency on a radio
// @include             http://www.stickam.com/member/goLive.do
// @contributors        Bret McDanel
// ==/UserScript==

(function(){
	// === Standard Toolbox functions ===
	function isDefined(x) { return (typeof x != 'undefined' && x != null && x !== null); }

	function updateCaption() {
		var cf = document.getElementById("captioniframe");
		alert(cf.contentWindow.document.body.innerHTML);
		setTimeout(updateCaption,1000);
	}


	function addDownloadLinks() {
		var p = document.createElement("div");
		p.setAttribute("style","float: left;");

		var iframe = document.createElement("iframe");
		//		iframe.setAttribute("style","width: 100%;");
		iframe.setAttribute("src","http://localhost/ft897/getfreq.php"); 
		iframe.setAttribute("id","captioniframe");
		p.appendChild(iframe);
		//		p.appendChild(document.createTextNode(" "));

		var arr = document.getElementsByTagName("body");
		arr[0].innerHTML=p.innerHTML + arr[0].innerHTML;
	}

	
	// === The Program ===
	addDownloadLinks();

	setTimeout(updateCaption,1000);


 })();
/* For Emacs:
 * Local Variables:
 * mode:c
 * indent-tabs-mode:t
 * tab-width:4
 * c-basic-offset:4
 * End:
 * For VIM:
 * vim:set softtabstop=4 shiftwidth=4 tabstop=4:
 */
