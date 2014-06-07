// ==UserScript==
// @name           Wikidashboard content in Wikipedia
// @namespace      http://paulirish.com/greasemonkey
// @description    Throwing WikiDashboard stats into wikipedia pages.
// @include        http://en.wikipedia.org/wiki/*
// @include        http://en.wikipedia.org/w/*
// @exclude        http://en.wikipedia.org/*action=edit*
// @exclude        http://en.wikipedia.org/*diff=*oldid=*

// ==/UserScript==



// mostly all this is coming straight from : http://wikidashboard.parc.com/tools/dashboard.js
// i stripped out prototype, simplified the UI, put in a toggle to turn it on, and generally made it work the way you'd want it to.
// looks like this only works for english wikipedia.. learn more here: http://wikidashboard.parc.com/

// gettin' pretty.
GM_addStyle("#dashboard{border-left:2px solid #B3C0CF;border-right:2px solid #B3C0CF;border-top:2px solid #B3C0CF;border-bottom:2px solid #B3C0CF;}.ajax_trying{font-style:italic;font-size:14px;margin:5px 0 5px 20px;}.dashboard_list_row{margin-left:2px;margin-right:5px;}.small_font_label{font-size:9px;}.margin_right{margin-right:20px;}.dashboard_list_row_column_one{float:left;font-size:11px;cursor:pointer;padding-left:2px;padding-top:1px;}.dashboard_list_row_column_two{font-size:11px;padding-top:1px;margin-right:3px;float:right;cursor:pointer;}.dashboard_list_row_column_three{padding-top:1px;float:right;}.dashboard_list_header{padding-left:2px;padding-right:5px;height:37px;background:#CEDFF2;}.dashboard_list_label{float:left;font-size:16px;width:200px;}.dashboard_footer{border-top:1px solid #88c;height:20px;position:relative;}.dashboard_footer_link{float:left;margin-left:2px;}.dashboard_footer_link_right{float:right;}.dashboard_preferences_link{float:right;margin:0 10px 0 40px;}.wd_hand{cursor:hand;}");

GM_addStyle("#toggleDash{padding-left: 7px; font-size:90%;} .wd_hand { cursor: pointer } ")


// original script from 
/*
// (c) Palo Alto Research Center, 2007, 2008
*/

//
// For WikiDashboard
// Using wgArticleId already embedded in every wikipedia page
//

var dashboardPath = 'http://wikidashboard.parc.com/dashboard'; // edited -pi
var localDashboardPath = 'http://wikidashboard.parc.com/localserver';  // i think this is for their dev enviros. -pi

/*
// fix the bug for search box ajax call (mwsuggest.js uses wgMWSuggestTemplate to make an ajax call)
if(wgMWSuggestTemplate) {
	wgMWSuggestTemplate = wgMWSuggestTemplate.replace(/^http:\/\/en.wikipedia.org/, "")
}
*/


// this could make the greasemonkey gods upset:
window = unsafeWindow;

// i need me some event attaching.
var addHandler = unsafeWindow.addHandler;


function wikidashboard(block, option) {
	if(!block) {
		return;
	}

//	if(true) {
//		local_wikidashboard(block, option);
//		return;
//	}
	
	if(!option) {
		option = '';
	}
	
	if(!window.wgTitle || !window.wgPageName) {
		return;
	}
	
	var isSubPage = /\//.test(window.wgTitle);
	 
	var params = parseParams(document.location.search);
	if(params['offset']) {
		option += '&offset=' + params['offset']; 
	}
	
	
  var toggleDash=document.createElement("a");
  toggleDash.href="javascript:"; // i'm bad, i know.
  toggleDash.id = "toggleDash";
  toggleDash.innerHTML = "[+] Expand WikiDashboard";
  block.appendChild(toggleDash);
	
	if(isSubPage) {
    	var url = dashboardPath + '/list.php?article=' + window.wgArticleId + option;
	} else if(window.wgNamespaceNumber == 2 || window.wgNamespaceNumber == 3) {
		var url = dashboardPath + '/list.php?user=' + window.wgTitle + option;
	} else if(window.wgArticleId) {
		var url = dashboardPath + '/list.php?article=' + window.wgArticleId + option;
	} else if(window.wgPageName == "Special:Contributions" && /Special:Contributions\/[^\/]+$/.test(document.location.pathname) ) {
		var regexp = /Special:Contributions\/[^\/]+$/;
		var result = regexp.exec(document.location.pathname);
		var user = document.location.pathname.substring(result.index + 22);
		user = user.replace(/_/g, " ");
		var url = dashboardPath + '/list.php?user=' + user + option;
	} else if(window.wgPageName == "Special:Contributions" && params['target'] != null) {
		var user = params['target'];
		var url = dashboardPath + '/list.php?user=' + user + option;
	} else {
		block.innerHTML = '<div class="ajax_trying">Error: WikiDashboard cannot obtain MediaWiki javascript variables.<div>';
		block.style.display = 'none';
		toggleDash.style.display = 'none';
		return;
	}
	
	addHandler(toggleDash,'click',function(){ initDash(block,url,option);	});

}


function initDash(block,url,option){
  
  
  // build dashboard
  removeChildrenFromNode(block);

	dashboard_content = document.createElement('div');
	dashboard_content.className = '';
	block.appendChild(dashboard_content);
	
	buildFooter(block);

	dashboard_content.innerHTML = '<div class="ajax_trying"><img src="http://upload.wikimedia.org/wikipedia/commons/d/d2/Spinning_wheel_throbber.gif"> Fetching... Trying for 30 seconds<div>'; // spinner location edited. -pi
	dashboard_content.style.display = '';

	var error_message = '<div class="ajax_trying">We\'re sorry. The server is busy.'
				+ ' Please <a href="#" onclick="refresh_wikidashboard(\''+ option +'\')">try again</a>'
				+ ' or <a href="#" onclick="load_local_wikidashboard(\''+ option +'\');">use our previous version</a>.</div>'; 
/*
	new Ajax.Request(url, {
		method: 'get',
		onSuccess: function(transport) {
			if(transport.responseText) {
				dashboard_content.innerHTML = transport.responseText;
			} else {
				dashboard_content.innerHTML = error_message;
			}
		},
		onException: function() {
			dashboard_content.innerHTML = error_message;
		},
		onFailure: function() {
			dashboard_content.innerHTML = error_message;
		}
	});
	*/
	
	GM_xmlhttpRequest({
	  url: url,
		method: 'GET',
		onload: function(transport) {
			if(transport.responseText) {
				dashboard_content.innerHTML = transport.responseText;
			} else {
				dashboard_content.innerHTML = error_message;
			}
		},
		onerror: function() {
			dashboard_content.innerHTML = error_message;
		}
	});
  
}
function load_local_wikidashboard(option) {
    var dashboard = $('dashboard');
    if(!dashboard) {
    	return;
    }
    // ajax loading 
	local_wikidashboard(dashboard, option);	
}

function refresh_wikidashboard(option) {
    var dashboard = $('dashboard');
    if(!dashboard) {
    	return;
    }
    // ajax loading 
	wikidashboard(dashboard, option);	
}

function local_wikidashboard(block, option) {
	if(!block) {
		return;
	}
	
	if(!option) {
		option = '';
	}
	
	var isSubPage = /\//.test(wgTitle);
	var params = parseParams(document.location.search);
	
	if(params['offset']) {
		option += '&offset=' + params['offset']; 
	}
	
	if(isSubPage) {
    	var url = localDashboardPath + '/list?page=' + window.wgArticleId + option;
	} else if(window.wgNamespaceNumber == 2 || window.wgNamespaceNumber == 3) {
		var url = localDashboardPath + '/list?user=' + window.wgTitle + option;
	} else if(window.wgArticleId) {
		var url = localDashboardPath + '/list?page=' + window.wgArticleId + option;
	} else if(window.wgPageName == "Special:Contributions" && /Special:Contributions\/[^\/]+$/.test(document.location.pathname) ) {
		var regexp = /Special:Contributions\/[^\/]+$/;
		var result = regexp.exec(document.location.pathname);
		var user = document.location.pathname.substring(result.index + 22);
		user = user.replace(/_/g, " ");
		var url = localDashboardPath + '/list?user=' + user + option;
	} else if(window.wgPageName == "Special:Contributions" && params['target'] != null) {
		var user = params['target'];
		var url = localDashboardPath + '/list?user=' + user + option;
	} else {
		block.innerHTML = '<div class="ajax_trying">Error: WikiDashboard cannot obtain MediaWiki javascript variables.<div>';
		block.style.display = 'none';
		return;
	}

    // build dashboard
    removeChildrenFromNode(block);

	dashboard_content = document.createElement('div');
	dashboard_content.className = '';
	block.appendChild(dashboard_content);
	
	buildFooter(block);

	dashboard_content.innerHTML = '<div class="ajax_trying">Fetching...<div>';
	dashboard_content.style.display = '';

/*
	new Ajax.Request(url, {
		method: 'get',
		onSuccess: function(transport) {
			dashboard_content.innerHTML = transport.responseText;
		},
		onFailure: function() {
			dashboard_content.innerHTML = '<div class="ajax_trying">We\'re sorry. The server is busy. Please try later.</div>';
		}
	});
	*/
	
	GM_xmlhttpRequest({
	  url: url,
		method: 'GET',
		onload: function(transport) {
			dashboard_content.innerHTML = transport.responseText;
		},
		onerror: function() {
			dashboard_content.innerHTML = '<div class="ajax_trying">We\'re sorry. The server is busy. Please try later.</div>';
		}
	});
}


function buildFooter(dashboard) {
 	var footer = document.createElement('div');
	footer.className = 'dashboard_footer small_font_label';
	dashboard.appendChild(footer);
	
	var reddit_submit_url = "http://reddit.com/r/WikiDashboard/submit?"
					+ "url=" + encodeURIComponent(location.href)
					+ "&title=" + encodeURIComponent(document.title);
					
	var reddit = document.createElement('div');
	reddit.className = 'dashboard_footer_link';
	reddit.innerHTML = '<a href="http://www.reddit.com/r/WikiDashboard">Reddit WikiDashboard</a>&nbsp;&nbsp;' 
		+ '<a href="'+ reddit_submit_url +'"><img alt="" src="/doc/img/blog_head.png"/>Submit this page</a>';
	//footer.appendChild(reddit);

	var homelink = document.createElement('div');
	homelink.className = 'dashboard_footer_link_right wd_hand';
	//homelink.href = 'http://wikidashboard.parc.com';
	homelink.innerHTML = '<a href="http://wikidashboard.parc.com">WikiDashboard, &copy;2008 PARC</a>';
	footer.appendChild(homelink);

	var toolserver = document.createElement('div');
	toolserver.className = 'dashboard_footer_link_right wd_hand small_font_label margin_right';
//	toolserver.href = 'http://meta.wikimedia.org/wiki/Toolserver';
	toolserver.innerHTML = '<a href="http://meta.wikimedia.org/wiki/Toolserver"><img src="/doc/img/toolserver-button-small.png"/></a>';
//	Powered by Wikimedia Toolserver';
	footer.appendChild(toolserver);

	var disclaimerlink = document.createElement('div');
	disclaimerlink.className = 'dashboard_footer_link_right wd_hand  margin_right';
	disclaimerlink.innerHTML = '<a href="http://wikidashboard.parc.com/doc/disclaimer.html">Disclaimer</a>';
	footer.appendChild(disclaimerlink);

	var originallink = document.createElement('div');
	originallink.className = 'dashboard_footer_link_right wd_hand small_font_label margin_right';
	originallink.innerHTML = '<a href="#" onclick="gotowikipedia()">Original Copy</a>';
	//footer.appendChild(originallink);  -pi

	var guidelink = document.createElement('div');
	guidelink.className = 'dashboard_footer_link_right wd_hand margin_right';
	guidelink.innerHTML = '<a href="http://wikidashboard.parc.com/doc/faq.html">Guide</a>';
	footer.appendChild(guidelink);

	var prefslink = document.createElement('div');
	prefslink.className = 'dashboard_footer_link_right wd_hand margin_right';
	prefslink.innerHTML = '<a href="#" onclick="javascript:toggle_preferences()">Preferences</a>';
	//footer.appendChild(prefslink);

	var prefs = document.createElement('div');
	prefs.id = 'wd_preferences';
	prefs.className = 'dashboard_footer';
	prefs.style.display = 'none';
	//dashboard.appendChild(prefs);

	var row_control = 'Show: <a href="#" onclick="javascript:controlNumRows(0)">None</a>&nbsp;&nbsp;';
	row_control += '<a href="#" onclick="javascript:controlNumRows(5)">5 rows</a>&nbsp;&nbsp;';
	row_control += '<a href="#" onclick="javascript:controlNumRows(10)">10 rows</a>&nbsp;&nbsp;';
	row_control += '<a href="#" onclick="javascript:controlNumRows(20)">20 rows</a>';
//	row_control += '<a href="#" onclick="javascript:controlNumRows(50)">50 rows</a>';
	
	var wdcookie_rows = document.createElement('span');
	wdcookie_rows.className = 'dashboard_preferences_link';
	wdcookie_rows.innerHTML = row_control
	prefs.appendChild(wdcookie_rows);

	var width_control = 'Bar Width: <a href="#" onclick="javascript:controlWidth(300)">300 pixel</a>&nbsp;&nbsp;&nbsp;';
	width_control += '<a href="#" onclick="javascript:controlWidth(500)">500 pixel</a>&nbsp;&nbsp;&nbsp;';
	width_control += '<a href="#" onclick="javascript:controlWidth(700)">700 pixel</a>';
	
	var wdcookie_width = document.createElement('span');
	wdcookie_width.className = 'dashboard_preferences_link';
	wdcookie_width.innerHTML = width_control;
	prefs.appendChild(wdcookie_width);
}


function removeChildrenFromNode(node) {
	if(node.hasChildNodes()) {
		while(node.childNodes.length >= 1 ) {
			node.removeChild(node.firstChild);
		}
	}
}

////////////////////////////////////////
// DOM LOAD STUFF!!! -pi
/////////////////////////////////////////


//document.observe("dom:loaded", function() {
    // put "dashboard" div into the page if the div is not there yet

    var dashboard = document.getElementById('dashboard');
    if(!dashboard) {
        //var anchor = document.getElementById('contentSub');
        var anchor = document.getElementById('jump-to-nav');
        if(!anchor) {
            // invalid MediaWiki structure
            return;
        }
        dashboard=document.createElement("div");
        dashboard.id = 'dashboard';
        anchor.parentNode.insertBefore(dashboard, anchor);
        

    }

  wikidashboard(dashboard);
    

//});

////////////////////////////////////////
// DOM LOAD STUFF!!! -pi
/////////////////////////////////////////

function toggle_preferences()
{
  var prefs = document.getElementById('wd_preferences');
  if (prefs.style.display == 'block')
    {prefs.style.display = 'none';}
  else
    {prefs.style.display = 'block';}
}


/*
function gotowikipedia() {
    if(!document.location) {
        return;
    }
    
    var wikipediaURL = 'http://en.wikipedia.org' 
        + document.location.pathname + document.location.search;
    
    document.location.href = wikipediaURL;    
}
*/
function controlNumRows(rows) {
	if(!rows) {
		rows = 0;
	}
    var dashboard = $('dashboard');
    wikidashboard(dashboard, '&rows='+rows);
}


function controlWidth(pixel) {
	if(!pixel) {
		return;
	}
    var dashboard = $('dashboard');
    wikidashboard(dashboard, '&width='+pixel);
}



//
// For bar clicking
//
function imageClicked(e) {
	var minBarTimeDiv = document.getElementById('minBarTime');
//    var minBarTimeDiv = $('minBarTime');
    if(!minBarTimeDiv) {
    	return;
    }
    var maxBarTimeDiv = document.getElementById('maxBarTime');
//    var maxBarTimeDiv = $('maxBarTime');
    if(!maxBarTimeDiv) {
    	return;
    }
    
    if(!window.wgTitle || !window.wgPageName) {
		return;
	}
    

	var minBarTime = minBarTimeDiv.innerHTML * 1.0;
	var maxBarTime = maxBarTimeDiv.innerHTML * 1.0;
	
	if(maxBarTime <= minBarTime) {
		return;
	}

    var event = e?e:window.event;
    var target = event.target?event.target:(event.srcElement?event.srcElement:null);
    if(!target) return;

	var x = event.clientX;
	var y = event.clientY;
	
	var loc = findPos(target);
	var scroll = getScroll();
		

	var localX = event.clientX - loc[0] + scroll[0];
	var localY = event.clientY - loc[1] + scroll[1];
	
	var clickedTime = Math.floor((maxBarTime - minBarTime) * localX / (target.width * 1.0) + minBarTime)*1000;
	
	var date = new Date(clickedTime);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var dateInMonth = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	
	var timeString = "" + year;
	
	if(month < 10) {
		timeString += "0" + month;
	} else {
		timeString += month;
	}

	if(dateInMonth < 10) {
		timeString += "0" + dateInMonth;
	} else {
		timeString += dateInMonth;
	}

	if(hour == 0) {
		timeString += "00"
	} else if(hour < 10) {
		timeString += "0" + hour;
	} else {
		timeString += hour;
	}

	if(minute == 0) {
		timeString += "00";
	} else if(minute < 10) {
		timeString += "0" + minute;
	} else {
		timeString += minute;
	}

	if(second == 0) {
		timeString += "00";
	} else if(second < 10) {
		timeString += "0" + second;
	} else {
		timeString += second;
	}
	
	
    var url = "http://" + document.location.host + "/w/index.php";
    
//    if(document.location.port) {
//    	url += ":" + document.location.port
//    }
    
    var isSubPage = /\//.test(window.wgTitle);
    
	var params = parseParams(document.location.search);
	 
	if(isSubPage) {
		url += "?title=" + window.wgPageName + "&action=history&offset=" + timeString;
	} else if(window.wgNamespaceNumber == 2 || window.wgNamespaceNumber == 3) {
		url += "?title=Special:Contributions&target=" + window.wgTitle + "&action=history&offset=" + timeString;
	} else if(window.wgArticleId) {
		url += "?title=" + window.wgPageName + "&action=history&offset=" + timeString;
	} else if(window.wgPageName == "Special:Contributions" && /Special:Contributions\/[^\/]+$/.test(document.location.pathname) ) {
		var regexp = /Special:Contributions\/[^\/]+$/;
		var result = regexp.exec(document.location.pathname);
		var user = document.location.pathname.substring(result.index + 22);
		var user = user.replace(/_/g, " ");

		url += "?title=Special:Contributions&target=" + user + "&action=history&offset=" + timeString;
	} else if(window.wgPageName == "Special:Contributions" && params['target'] != null) {
		var user = params['target'];
		
		url += "?title=Special:Contributions&target=" + user + "&action=history&offset=" + timeString;
    } else {
    	// cannot identify the type of the page
    	// clicking on the bar has no effect
    	return;
    }
    
    document.location.href = url;    	
}

unsafeWindow.imageClicked = imageClicked;

function parseParams(queryString) {
	var params = {};
	if(!queryString) {
		return params;
	}
	
	var	query = queryString.replace(/\+/g, ' ');
	var args = query.split('&');
	
	for (var i = 0; i < args.length; i++) {
		var pair = args[i].split('=');
		var name = decodeURIComponent(pair[0]);
		
		var value = (pair.length==2)
			? decodeURIComponent(pair[1])
			: name;
		params[name] = value;
	}
	
	return params;
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft, curtop];
}


function  getScroll() {
        var scrollX = 0;
        var scrollY = 0;
        
        if( document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            scrollX = document.documentElement.scrollLeft;
            scrollY = document.documentElement.scrollTop;
        }
        else if( document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            scrollX = document.body.scrollLeft;
            scrollY = document.body.scrollTop;
        }
        else if( window.pageXOffset || window.pageYOffset) {
            scrollX = window.pageXOffset;
            scrollY = window.pageYOffset;
        }
        else if( window.scrollX ) {
            scrollX = window.scrollX;
            scrollY = window.scrollY;
            
        }
	return [scrollX, scrollY];
}
