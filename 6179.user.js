// ==UserScript==
// @name Statistics Detector
// @namespace http://www.joostdevalk.nl/blog/free-competitor-statistics/
// @description Statistics Package detector, which links to the statistics if openly available
// @include *
// ==/UserScript==

function printBox(id, message, url) {
	div = document.createElement("div");
	div.id = id;
	div.innerHTML = '<div style="position: absolute; right: 0px; top: '+ topdist +'px;' +
	'text-align: center; width: 200px; margin-bottom: 5px; z-index: 100; background-color: #000; padding: 2px;">' +
	'<p style="margin: 2px 0; background-color: inherit;"> ' +
	'<a target="_blank" style="border-bottom: 1px solid #000; background-color: inherit; ' +
	'font: bold 10px Verdana; color: #fff; font-weight: bold;" href="'+url+'">'+message+'</a>' +
	'</p></div>';
	
	topdist = topdist + 20;
	document.body.insertBefore( div, document.body.firstChild );
	window.setTimeout(
		function() {
			var div = document.getElementById( id );
			if ( div ) {
				div.parentNode.removeChild( div );
			}
		}
	, 7500 );
}

var topdist = 0;

var belStat = false;
var webStats4u = false;
var realTracker = false;
var xt = false;
var nedStat = false;

// Walk through the anchors
var anchors = document.getElementsByTagName( "a" );
for ( var i = 0; i < anchors.length; ++i ) {
	var anchor = anchors[ i ];
	var ref = anchor.href;
	
	if ( ref != null ) {
		if (!belStat) {
			var belStatUrl = ref.match(/http:\/\/www.belstat.nl\/viewstat.asp\?UserID=.*&lang=nl/);
			belStat = (belStatUrl) ? 1 : 0;
		}

		if (!nedStat) {
			var nedStatUrl = ref.match(/http:\/\/.*\.nedstatbasic\.net\/stats?.*/);
			nedStat = (nedStatUrl) ? 1 : 0;
		}
		
		if ( !xt ) {
			var xtUrl = ref.match(/http:\/\/extremetracking\.com\/open\?login=.*/);
			xt = (xtUrl) ? 1 : 0;
			if ( !xt ) {
				xtUrl = ref.match(/http:\/\/.*\.extreme-dm\.com\/\?login=.*/);
				xt = (xtUrl) ? 1 : 0;			
			}
		}
		if (!realTracker) {
			var realTrackerUrl = ref.match(/http:\/\/www.nethit-free.nl\/netpoll\/stat.asp\?id=.*/);
			realTracker = (realTrackerUrl) ? 1 : 0;
		}
		
		if (!webStats4u) {
			var webStats4uUrl = ref.match(/http:\/\/www.webstats4u.com\/stats\?.*/);
			webStats4u = (webStats4uUrl) ? 1 : 0;
		}
	}
}

// Walk through the script
var Mint = false;
var phpMyVisits = false;
var HitTail = false;
var HeadLight = false;
var SiteStat = false;
var Omniture = false;
var OneStat = false;
var StatLynx = false;
var StatLynxConversion = false;
var StatLynxFinalConversion = false;
var GoogleAnalytics = false;
var MoniForce = false;
var myStats = false;
var Stats4u = false;
var AWStats = false;
var CheckItSearchEngineTracking = false;
var WebSideStory = false;

var scripts = document.getElementsByTagName("script");

for ( var i = 0; i < scripts.length; ++i ) {
	var script = scripts[ i ];
	var src = script.src;
	var inner = script.innerHTML;
	
	if ( inner != null ) {
		if ( !StatLynx ) {
			StatLynx = ( inner.search( "stl.p.a1.traceworks.com" ) != -1 );
			// if the above returns true, do an extra check
			if ( StatLynx ) {
				StatLynx = ( inner.search( "var stl_strprotocol" ) != -1 );
			}
		}

		if ( !myStats ) {
			myRe = /mystats\(\d,(\d+),.*,.*\)/;
			matches = myRe.exec(inner);
			if (matches) {
				var myStatsUrl = "http://mystats.nl/stats/"+matches[1]+".html";
			}
			myStats = (myStatsUrl) ? 1 : 0;	
		}
		
		if ( !HeadLight ) {
			HeadLight = ( inner.search( "var _hlaccount =" ) != -1 );
		}
		if ( !SiteStat ) {
			SiteStat = ( inner.search( "sitestat" ) != -1 );
		}
		if ( !Omniture ) {
			Omniture = ( inner.search( "var s_code" ) != -1 );
		}
		if ( !OneStat ) {
			OneStat = ( inner.search( "OneStat_Pageview" ) != -1 );
		}
		if ( !WebSideStory ) {
			WebSideStory = ( inner.search( "var hbx" ) != -1 );
		}
	}
	
	if ( src != null ) {
		if ( !GoogleAnalytics ) {
			GoogleAnalytics = ( src.search( "http://www.google-analytics.com/urchin.js" ) != -1 );
		}
		if ( !StatLynxConversion ) {
			StatLynxConversion = ( src.search( "http://stl.p.a1.traceworks.com/prod_active/creg_chain.asp" ) != -1 );
		}
		if ( !StatLynxFinalConversion ) {
			StatLynxFinalConversion = ( src.search( "http://stl.p.a1.traceworks.com/prod/conv_scripts/" ) != -1 );
		}
		if ( !Mint ) {
			myRe = /(.*)\?js$/;
			matches = myRe.exec(src);
			if (matches) {
				mintUrl = matches[1];
				Mint = (mintUrl) ? 1 : 0;
			}
		}
		if ( !phpMyVisits ) {
			myRe = /(.*)phpmyvisites\.js/;
			matches = myRe.exec(src);
			if (matches) {
				phpMyVisitsUrl = matches[1];
				phpMyVisits = (phpMyVisitsUrl) ? 1 : 0;
			}
		}
		if ( !MoniForce ) {
			MoniForce = (src.match(/http:\/\/tag.moniforce.com\/moni\//)) ? 1 : 0;
		}
		if ( !HitTail ) {
			HitTail = ( src.search( ".hittail.com/mlt.js" ) != -1 );
		}
		if ( !Stats4u ) {
			Stats4u = ( src.search( "stats4u.js" ) != -1 );
		}
		if ( !Stats4u ) {
			Stats4u = ( src.search( "t4umeetscript.js" ) != -1 );	
		}
		if ( !AWStats ) {
			AWStats = ( src.search( "awstats_misc_tracker.js" ) != -1 );	
		}
		if ( !CheckItSearchEngineTracking ) {
			CheckItSearchEngineTracking = ( src.search( "searchenginetracking.js" ) != -1 );	
		}
	}
}

var onloadvalue = document.body.getAttribute("onload");
if ( !OneStat && onloadvalue ) {
	OneStat = ( onloadvalue.search( "OneStat_Pageview" ) != -1 );
}

// Walk throught the results and print boxes for each found Open Statistics program
if ( nedStat ) {
	printBox("nedstat","Nedstat Basic enabled",nedStatUrl);
}

if ( belStat ) {
	printBox("belstat","Belstat enabled",belStatUrl);
}

if ( xt ) {
	printBox("xtstat","Extreme Tracking enabled",xtUrl);
}

if ( myStats ) {
	printBox("mystats","MyStats enabled",myStatsUrl);
}

if ( realTracker ) {
	printBox("realtracker","Real Tracker enabled",realTrackerUrl);
}

if ( webStats4u ) {
	printBox("webstats4u","WebStats4U enabled",webStats4uUrl);
}

if ( Mint ) {
	printBox("mint","Mint enabled",mintUrl);
}

if ( phpMyVisits ) {
	printBox("mint","phpMyVisits enabled",phpMyVisitsUrl);
}

// Walk throught the results and print boxes for each found Statistics program
if ( GoogleAnalytics ) {
	printBox("googleanalytics","Google Analytics enabled","http://www.google.com/analytics");
}

if ( StatLynx ) {
	printBox("statlynx","Stat Lynx enabled","http://www.traceworks.com");
}

if ( StatLynxConversion ) {
	printBox("statlynx","Stat Lynx conversion step found","http://www.traceworks.com");
}

if ( StatLynxFinalConversion ) {
	printBox("statlynx","Stat Lynx final conversion step found","http://www.traceworks.com");
}

if ( HeadLight ) {
	printBox("headlight","HeadLight enabled","http://www.traceworks.com");
}

if ( MoniForce ) {
	printBox("moniforce","MoniForce enabled","http://www.moniforce.com");
}

if ( Omniture ) {
	printBox("omniture","Omniture SiteCatalyst enabled","http://www.omniture.com");
}

if ( SiteStat || OneStat ) {
	printBox("sitestat","OneStat / SiteStat enabled","http://www.sitestat.nl");
}

if ( HitTail ) {
	printBox("hittail","HitTail enabled","http://www.hittail.com");
}

if ( Stats4u ) {
	printBox("stats4u","Stats4u enabled","http://www.traffic4u.nl");
}

if ( AWStats ) {
	printBox("awstats","AWStats enabled","http://www.awstats.org");
}

if ( CheckItSearchEngineTracking ) {
	printBox("checkit","Checkit SE tracking enabled","http://www.checkit.nl");
}

if ( WebSideStory ) {
	printBox("websidestory","WebSideStory enabled","http://www.websidestory.com/");
}
