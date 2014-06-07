// ==UserScript==
// @name           Percent based width for Tumblr
// @author         doesntmatter
// @version        1.3
// @description    It will set a % width of tumblr for my liking.
// @lastchanges    fixes
// @namespace      tumblr.com
// @include     http*://www.tumblr.com/dashboard*
// @include     *.media.tumblr.com/*

// ==/UserScript==


GM_addStyle("body {margin-left:10px !important;margin-right:10px !important;background: #000 !important; color: #C8C8C8;}");

GM_addStyle("[id*='container'] {width:98% !important; max-width: 98% !important;background: transparent !important}");  // the overall width
GM_addStyle("[class*='container'] {width:98% !important; max-width: 98% !important;background: transparent !important}");  // the overall width

GM_addStyle("[id*='content'] {width:auto !important; height:auto; max-width: 100% !important;background: transparent !important}");
GM_addStyle("[class*='content'] {width:auto !important; height:auto; max-width: 100% !important;background: transparent !important}");

GM_addStyle("#left_column {width:85%;}");
GM_addStyle("#right_column {width:15%;}");

GM_addStyle("[id$='post'] {width:auto !important;height:auto;}"); //background: transparent !important;
GM_addStyle("[class$='post'] {width:auto !important;height:auto;}"); //background: transparent !important;

GM_addStyle(".post_full {background: transparent !important}");

GM_addStyle(".post_footer {background: transparent !important}");
GM_addStyle(".post_controls_inner {background: #3F227E !important;border-radius:4px;}");

GM_addStyle(".right_column::after {background: transparent !important}");

GM_addStyle("[class*='flipcard'] {width:100%;}");

GM_addStyle("img {width:auto !important;height:auto;max-width: 100% !important;}");


GM_addStyle("[id*='img'] {width:auto !important;height:auto;max-width: 100% !important;}");
GM_addStyle("[class*='img'] {width:auto !important;height:auto;max-width: 100% !important;}");


//GM_addStyle("[id*='photo'] {width:auto !important; max-width: 100% !important;height:auto;float:none;float:none !important;}");
GM_addStyle("[class*='photo'] {width:auto !important; max-width: 100% !important;height:auto;float:none;float:none !important;}");

GM_addStyle("[class*='photoset'] {height:auto !important}");

GM_addStyle("[id^='notes'] {width:auto !important;height:auto;float:none !important;position:relative !important;}");
GM_addStyle("[class^='notes'] {width:auto !important;height:auto;float:none !important;position:relative !important;}");


GM_addStyle("[id*='page'] {width:auto !important; height:auto; max-width: 100% !important;}");
GM_addStyle("[class*='page'] {width:auto !important; height:auto; max-width: 100% !important;}");


GM_addStyle("[id*='inner'] {width:auto !important; height:auto; max-width: 100% !important;}");
GM_addStyle("[class*='inner'] {width:auto !important; height:auto; max-width: 100% !important;}");


//GM_addStyle("[id*='wrap'] {width:auto !important; height:auto; max-width: 100% !important;}");
//GM_addStyle("[class*='wrap'] {width:auto !important; height:auto; max-width: 100% !important;}");


//GM_addStyle("[id*='iframe'] {width:auto !important; height:auto; max-width: 100% !important;}");
//GM_addStyle("[class*='iframe'] {width:auto !important; height:auto; max-width: 100% !important;}");


var elm, i;
function work() {	
	elm = document.getElementsByTagName("img");
                for (i=0; i<elm.length; i++) 
                {
		  elm[i].src = elm[i].src.replace(/_500/,"_1280");

                  elm[i].onerror = function() {
			this.src = this.src.replace(/_1280/,"_500");
                      
		  }
                }
}


	

if ( window.location.href.indexOf("tumblr.com") > -1 ) {

	// first iteration
	work();

	// repeat whenever page changes
	var counter = document.getElementsByTagName('div').length;

	function trigger() {
		//console.log("triggered...");
		if (document.getElementsByTagName('div').length != counter) {
			counter = document.getElementsByTagName('div').length;
			work();
                        
		}
	}

	setInterval(trigger,1000);
}

