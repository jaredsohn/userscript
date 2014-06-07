// ==UserScript==
// @name           Cricinfo - Improve usability and hide ads
// @namespace      http://userscripts.org/scripts/review/66416
// @description    Hide Cricinfo ads and enhance user experience
// @include        http://content.espncricinfo.com*
// @include        http://www.espncricinfo.com*
// @include        http://stats.espncricinfo.com*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js'; //can use Google CDN hosted jQuery
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        
		var strCSS = '	html, body { background-position: center -100px !important; }\
						.topFrameLogo { height:5px !important } \
						#ciHomeLeaderboard, .topFrameBanner { visibility: hidden !important; height: 5px !important; } \
						.seriesSpncr, .topFrameStripRHS, .topFrameStripLHS, .rhFrameModule1, .topFrameBanner { visibility: hidden !important; display: none !important; } \
						#ciHomeContentrhs div.pnl320B, #ciHomeContentrhs div.pnl320M, #ciHomeContentrhs div#ciHomeSkybannerHolder,\
						div#RHS2Adslot, #aw0 { display: none !important; } \
						#ciHomeContentrhs div.pnl320T { visibility: hidden !important; } \
						div#lvScrCnt div:first-child { padding: 0 !important; } \
						div#lvScrCnt iframe { display: none !important; } \
						.teamText { font-family:"arial" !important; color:#2263BF !important } \
						a.liveRefreshLink { color:#fff !important; padding:5px !important; float:left; background:#2263BF; \
											border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; text-transform:uppercase; margin-bottom:10px !important } \
						.liveRefreshCell { background:#fff !important; border:0 !important } \
						.liveRefreshCell a { float:left; #2263BF !important; color:#fff !important; padding:5px !important; \
											border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; position:absolute; right:20px; top:110px  }  \
						.headLeftDiv { display:block !important; background:#DEECF7; padding:5px; \
										border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px; float:left !important; width:60% !important; } \
						.headRightDiv { float:left; width:30% !important } \
						.statusText { background:#75BBEE; padding:3px !important; display:block; color:#fff !important; text-align:center; \
										border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px; } \
						.mainScoresTable td { white-space:nowrap !important } \
						.mainScoresTable td {visibility:hidden !important;} \
						.mainScoresTable tr td:nth-child(1) { display:none !important; } \
						.mainScoresTable tr:nth-child(2) td:nth-child(1) {display:block !important;} \
						.mainScoresTable tr:nth-child(2) table {height:1px !important;} \
						.mainScoresTable tr:nth-child(2) td:nth-child(2) {display:block !important; width:200px !important; float:right; padding-bottom:0 !important} \
						.mainScoresTable td:nth-child(-n+8) { visibility:visible !important; } \
						.mainScoresTable tr:nth-child(n+3) td:nth-child(9) { width:100px !important }\
						.mainScoresTable tr:nth-child(n+3) td { padding:3px 6px !important } \
						.mainScoresTable tr:nth-child(2) td:nth-child(3) { display:none !important; }\
						.mainScoresTable tr[align=center] td { display:none !important; }\
						.mainScoresTable tr[bgcolor="#d9effd"] { border-top:15px solid #fff !important; }\
						.commsText { font:11px verdana !important; line-height:14px !important; margin:5px 0 !important; padding:0 2px !important } \
						.commsText b { font:normal 11px verdana !important; color:#fff !important; padding:3px !important; background:#75BBEE; \
										border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px; } \
						.commsImportant { background:#2263BF !important; color:#fff !important; padding:3px !important; \
										border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px; font:bold 11px verdana !important;} \
						.commsImportant.OUT {background:red !important;} \
						.commsImportant.FOUR {background:#579256 !important;} \
						tt {font:bold 13px courier new !important} \
						tt span{font:bold 13px verdana !important; padding:1px 4px; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px;} \
						tt .wicket { background:red; color:#fff; } \
						tt .four { background:#579256; color:#fff } \
						tt .six { background:#2263BF; color:#fff; }'
		
		$('head').append('<style type="text/css">' + strCSS + '</style>'); 

		$('.commsImportant').each(function(i){
			$(this).addClass(  '' + $(this).text() + '' );
		})
		
		
		var strRecentOvers = $('.liveDetailsText tt').html();
		strRecentOvers = strRecentOvers.replace(/W/g, '<span class=wicket>W</span>');
		strRecentOvers = strRecentOvers.replace(/4/g, '<span class=four>4</span>');
		strRecentOvers = strRecentOvers.replace(/6/g, '<span class=six>6</span>');
		$('.liveDetailsText tt').html(strRecentOvers);
		
    }