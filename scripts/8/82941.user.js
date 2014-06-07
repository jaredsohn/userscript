// DeviantART Shortcuts
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// v - Toggle view mode
// s - Download deviation
// r - Removes from Messages or first deviation from list
// j - Next deviation
// k - Previous deviation
// f - Add/Removes from Favourites
// a - Opens artist profile
// Enter - Opens first deviation from list
//
// ==UserScript==
// @name			DA Shortcuts
// @namespace		http://aboettger.wordpress.com/
// @description		Shortcuts for deviantART
// @include			*deviantart.com/*
// @run-at			document-end
// @version			0.1.19
// ==/UserScript==


function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function () {

	$(document).keypress(function(e) {
		if(!e) {
			e = window.event;
		}

		//alert(e.which);
		//alert(e.target.nodeName)
		if (e.target.nodeName == "TEXTAREA") {
			return;
		}
		if (e.target.nodeName == "INPUT") {
			return;
		}

		switch (e.which) {
			/*
			 case 13:
				<a href="" onclick="return DWait.readyLink('jms/pages/gruzecontrol/gmframe_gruser.js', this, function () {GMI.gmiUp(this).configClick(this)})" id="" style="position:absolute; height: 24px; width:40px; background-repeat: no-repeat;  background: url(http://st.deviantart.net/minish/deviation/iconset-moreart.png); background-position: -40px 0px"></a>
				//$("#gmi-GMFrame_Gruser").find(".gr-body").css("border", "1px solid red");
				$("#gmi-GMFrame_Gruser").find(".gr-body").animate({
					height: '10px'
				}, 100, function() {
					// Animation complete.
				});
				break;
			*/
			case 13:
				$("#gmi-MessagePreviewStream").find("img:first").click();
				break;
			case 115:
			case 83:	// s - Download Deviation
				$("#download-button").click(function(e){
					window.open(this.href);
					e.preventDefault();
				});
				$("#download-button").click();
				$("#download-button").unbind("click");
				break;
			case 102:
			case 70:	// f - Add/Remove from Favourites
				$('#gmi-ResourceViewFaveButton').click();
				break;
			case 106:
			case 74:	// j - Next Deviation
				$("a[class~=ntlast]:first").mousedown();
				$("a[class~=ntlast]:first").click();
				break;
			case 107:
			case 75:	// k - Previous Deviation
				$("a[class~=ntfirst]:first").mousedown();
				$("a[class~=ntfirst]:first").click();
				break;
			case 114:
			case 82:	// r - Remove from Messages
				if ($("#gmi-ResourceViewMessageButton").find(".smbutton")) {
					$('#gmi-ResourceViewMessageButton > .smbutton').click();
				}
                /*else {
                        alert("#gmi-MessagePreviewStream");
					$("#gmi-MessagePreviewStream").find("span.mcx:first").click();
				}*/
				break;
			case 118:
			case 86:	// v - Toggle Viewmode
				if ($('#gmi-ResViewSizer_img').css("display") == "none") {
 					$("#gmi-ResViewSizer_fullimg").click()
 				}
 				else {
 					$("#gmi-ResViewSizer_img").click();
 				}
				break;
			case 97:	// a - Show artist on a new page
				$("div[class*='ch-boxtop']").find("a[class='u'][href$='.deviantart.com/']").click(function(e){
                    window.open(this.href);
					e.preventDefault();
				});
				$("div[class*='ch-boxtop']").find("a[class='u'][href$='.deviantart.com/']").click();
				$("div[class*='ch-boxtop']").find("a[class='u'][href$='.deviantart.com/']").unbind("click");
				break;
			default:
			break;
		}
	});
});