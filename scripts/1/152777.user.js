// ==UserScript==
// @name        Googlifix
// @author      om467
// @namespace   com.googlifix
// @include     http://www.google.tld/search*
// @include     https://www.google.tld/search*
// @include     http://www.google.tld/webhp*
// @include     https://www.google.tld/webhp*
// @include     http://google.tld/search*
// @include     https://google.tld/search*
// @include     http://google.tld/webhp*
// @include     https://google.tld/webhp*
// @include     http://www.google.tld/
// @include     https://www.google.tld/
// @include     http://google.tld/
// @include     https://google.tld/
// @include     http://www.google.tld/#*
// @include     https://www.google.tld/#*
// @include     http://google.tld/#*
// @include     https://google.tld/#*
// @include     http://www.google.tld/?*
// @include     https://www.google.tld/?*
// @include     http://google.tld/?*
// @include     https://google.tld/?*
// @include     https://encrypted.google.com/search*
// @include     https://encrypted.google.com/webhp*
// @include     https://encrypted.google.com/
// @include     https://encrypted.google.com/#*
// @version     29
// @updateURL   https://userscripts.org/scripts/source/152777.meta.js
// @downloadURL https://userscripts.org/scripts/source/152777.user.js
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

(function ()
{
	// Constants
	var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var SCRIPT_VERSION = 29;
	var UPDATE_CHECK_INTERVAL = 172800; // 2 days
	var UPDATE_CHECK_DELAY = 2000;

	// Styles
	GM_addStyle(" \
		/* left sidebar */ \
		#hdtbMenus {overflow:visible !important; display:block !important;} \
		#hdtbMenus > div > div {display:none;} \
		#hdtbMenus > div > ul {display:block !important; margin-top:15px; min-width:150px !important; width:180px; border:0px !important; box-shadow:none !important; left:10px !important; top:50px !important; position:relative !important;} \
		@media screen and (min-width: 1400px){ \
			#hdtbMenus > div > ul {width:250px;} \
		} \
		#sc-block {width:120px !important; white-space:normal !important; height:auto !important;} \
		#sc-block .sc {display:inline-block !important; float:none !important;} \
		.hdtbItm.hdtbSel, \
			#hdtb .hdtbItm a, \
			#hdtb_more_mn a, \
			#cdrlnk {text-overflow:ellipsis !important; overflow:hidden !important; padding-right:4px !important;} \
		\
		/* content */ \
		#main #cnt #center_col, \
			.ab_tnav_wrp, \
			.mw #center_col, \
			.mw #foot {margin-left:197px !important;} \
		@media screen and (min-width: 1400px){ \
			#main #cnt #center_col, \
				.ab_tnav_wrp, \
				.mw #center_col, \
				.mw #foot {margin-left:267px !important;} \
		} \
		.mw #rhscol {overflow:visible !important;} \
		html.com-googlifix #center_col {min-height:550px;} \
		html.com-googlifix.com-googlifix-domain #center_col, html.com-googlifix.com-googlifix-uilanguage #center_col {min-height:800px;} \
		html.com-googlifix.com-googlifix-domain.com-googlifix-uilanguage #center_col {min-height:1000px;} \
		\
		/* top bar with menu */ \
		#hdtb_msb > .hdtb_mitem:first-child, \
			#hdtb_msb > .hdtb_mitem.hdtb_msel:first-child {margin-left:210px !important;} \
		@media screen and (min-width: 1400px){ \
			#hdtb_msb > .hdtb_mitem:first-child, \
				#hdtb_msb > .hdtb_mitem.hdtb_msel:first-child {margin-left:280px !important;} \
		} \
		#hdtb_tls {display:none !important;} \
		#hdtb_more {display:none !important;} \
		#hdtb_more_mn {display:inline-block !important; top:0px; border:0px !important; box-shadow:none !important; background-color:transparent !important; height:54px; overflow:hidden; margin-right:15px; padding:0px; position:relative !important;} \
		#hdtb_more_mn div.hdtb_msb_hmi {display:inline-block;} \
		#hdtb_more_mn div.hdtb_mitem {float:left;} \
		#hdtb_more_mn > div.hdtb_mitem:last-child, \
			#hdtb_more_mn > div.hdtb_mitem:nth-last-child(2) {display:none !important;} \
		@media screen and (min-width: 1400px){ \
			#hdtb_more_mn > div.hdtb_mitem:last-child, \
				#hdtb_more_mn > div.hdtb_mitem:nth-last-child(2) {display:inline-block !important;} \
		} \
		#hdtb_more_mn div.hdtb_mitem > a {height:44px; line-height:44px; padding:0 8px !important; margin:0 8px; display:inline-block;} \
		#hdtb_more_mn div.hdtb_mitem > a.q.qs:hover {background-color:transparent; color:#222 !important;} \
		#hdtb_msb > div.hdtb_mitem, \
			#hdtb_more_mn {vertical-align:middle; height:44px; line-height:44px;} \
		li.hdtbItm input[type='text'] {max-width:60px;} \
		li.hdtbItm input[type='submit'] {max-width:60px;} \
		@media screen and (min-width: 1400px){ \
			li.hdtbItm input[type='text'] {max-width:initial;} \
			li.hdtbItm input[type='submit'] {max-width:initial;} \
		} \
		body.vasq #hdtb_msb > div.hdtb_mitem.hdtb_msel {height:44px;} \
		#hdtb #hdtbSum {height:49px; line-height:44px;} \
		#topabar {border-bottom:1px solid #EBEBEB !important;} \
		#tads {padding-right:0px !important;} \
		\
		/* right profile box */ \
		#rhs_block > div, \
			#rhs_block > li, \
			#rhs_block > ol {margin-left:65px !important;} \
		@media screen and (min-width: 1400px){ \
			#rhs_block > div, \
				#rhs_block > li, \
				#rhs_block > ol {margin-left:145px !important;} \
		} \
		\
		/* people also search */ \
		#botabar {margin-left:280px !important;} \
		\
		/* images search */ \
		#main #cnt {background-color:#fff;} \
		#isr_soa {width:99% !important;} \
		div.prcmg {border-color:transparent;} \
		div#ifbd {background-color:transparent;} \
		\
		/* images search detail */ \
		iframe.irc_ifr {width:100% !important;} \
		#irc_bg {left:213px !important;} \
		@media screen and (min-width: 1400px){ \
			#irc_bg {left:283px !important;} \
		} \
		div.irc_t {width:62% !important; overflow:hidden;} \
		div.irc_b {min-width:auto;} \
		div.irc_cpr {display:none;} \
		\
		/* search bar + logo + black bar */ \
		#gba {height:57px;} \
		#gb > div > #gbq1 {margin-left:80px !important; padding-right:0px;} \
		@media screen and (min-width: 1400px){ \
			#gb > div > #gbq1 {margin-left:150px !important;} \
		} \
		#gb.com-googlifix-blackbar-searchbar {top:30px;} \
		#com-googlifix-blackbar {background-color:#444; padding:0px; height:30px; width:auto;} \
		#com-googlifix-blackbar a { display:inline-block; height:30px; line-height:30px; cursor:pointer; margin:0px; padding:0px 10px; text-decoration:none; color:#fff; font-weight:bold;} \
		#com-googlifix-blackbar a:hover {background-color:#666;} \
		#gbwa {display:none;} \
		\
		/* settings button + account button */ \
		#ab_ctls {z-index:103 !important; padding-bottom:4px !important; padding-right:16px !important; right:0px !important; background-color:transparent !important;} \
		#gbu.gbu-low-res {left:890px !important; right:auto;} \
		\
		/* footer */ \
		#fbarcnt {max-height:40px;} \
		#fbarcnt > div {bottom:auto;} \
		div.fbar {min-width:300px; border-bottom:1px solid #E4E4E4;} \
		\
		/* update box */ \
		#com-googlifix-updatebox {z-index:10000; background-color:#FFFFFF; border:1px solid #C5C5C5; box-shadow:0px 4px 16px rgba(0, 0, 0, 0.2); padding:10px 20px; position:fixed; top:10px; right:100px; color:#dd4b39; font-size:14px; font-weight:bold; } \
	");
	
	// black bar
	var blackbarItems = document.querySelectorAll("#gbwa > :nth-child(2) > ul");
	if (blackbarItems.length > 0 && document.location.host != "encrypted.google.com")
	{
		// search bar
		document.querySelector("#gb").className += " com-googlifix-blackbar-searchbar";
		
		// blackbar wrapper
		var blackbarWrapper = document.createElement("div");
		blackbarWrapper.setAttribute("id", "com-googlifix-blackbar");
		document.querySelector("#mngb").insertBefore(blackbarWrapper, document.querySelector("#gb"));
		
		// service links
		var serviceLinks = document.querySelectorAll("#gbwa > :nth-child(2) li");
		for (var i = 0; i < serviceLinks.length; i++)
		{
			var link = serviceLinks[i];
			
			var blackbarLink = document.createElement("a");
			blackbarLink.innerHTML = link.querySelector("a > :nth-child(2)").innerHTML;
			blackbarLink.setAttribute("href", link.querySelector("a").getAttribute("href"));
			
			blackbarWrapper.appendChild(blackbarLink);
		}
		
		// more link
		var moreLink = document.querySelector("#gbwa > :nth-child(2) > a:nth-of-type(2)");
		moreLink.className = "";
		blackbarWrapper.appendChild(moreLink);
	}
	
	// Images - Results width fix
	if (document.location.search.indexOf("tbm=isch") != -1 || document.location.hash.indexOf("tbm=isch") != -1)
	{
		// content width
		var rgObserver = new MUTATION_OBSERVER(function(mutations)
		{
			// width
			mutations[0].target.style.width = parseInt(getComputedStyle(document.querySelector("#rso"), "").getPropertyValue("width")) + "px";

			// google recalculates everything on window resize, so we help him to know that there was a change by GM
			setTimeout(function()
			{
				var uiEvent = document.createEvent('UIEvents');
				uiEvent.initUIEvent('resize', true, false, window, 0);
				window.dispatchEvent(uiEvent);
			}, 1000);
			
			rgObserver.disconnect();
		});
		rgObserver.observe(document.querySelector("#rg"), { attributes: true, childList: false, attributeFilter: ["style"] });

		// image detail width
		var ircObserver = new MUTATION_OBSERVER(function(mutations)
		{
			for (var i = 0; i < mutations.length; i++)
			{
				if ((mutations[i].target.id || "") == "rcnt")
				{
					var ircc = document.querySelectorAll("div.irc_c");
					var rg = document.querySelector("#rg");
					if (ircc.length == 3 && rg != null)
					{
						var rgWidth = (parseInt(getComputedStyle(rg, null).getPropertyValue("width")) - 12) + "px";
						mutations[i].addedNodes[0].style.maxWidth = rgWidth;
						for (var k = 0; k < ircc.length; k++)
							ircc[k].style.maxWidth = rgWidth;
					}
					return;
				}
			}
		});
		ircObserver.observe(document.querySelector("#main"), { attributes: false, childList: true, subtree: true });
	}
	
	// Adds class to HTML element for compatibility reasons, so that other userscripts know about this userscript
	document.querySelector("html").className += " com-googlifix";
		
	// update check
	function openUpdateDialog()
	{
		var box = document.createElement("div");
		box.id = "com-googlifix-updatebox";
		box.innerHTML = "New version of Googlifix is available. <a href=\"http://userscripts.org/scripts/source/152777.user.js\" onclick=\"this.parentNode.style.display='none'\">Update now</a>.";
		document.querySelector("body").appendChild(box);
	}
	
	setTimeout(function()
	{
		var lastUpdateCheck = GM_getValue('lastCheck', 0);
		var lastCheckVersion = GM_getValue('lastCheckVersion', SCRIPT_VERSION);
		var now = Math.round(new Date().getTime() / 1000);
		
		if (now > (lastUpdateCheck + UPDATE_CHECK_INTERVAL))
		{
			GM_setValue('lastCheck', now);
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://userscripts.org/scripts/source/152777.meta.js",
				onload: function(xhr)
				{
					var siteVersion = parseInt(xhr.responseText.match(/\/\/\s*@version\s*([\d]+).*/)[1]);
					GM_setValue('lastCheckVersion', siteVersion);
					if (siteVersion > SCRIPT_VERSION)
						openUpdateDialog();
				}
			});
		}
		else if (SCRIPT_VERSION < lastCheckVersion)
			openUpdateDialog();
	}, UPDATE_CHECK_DELAY);
})();