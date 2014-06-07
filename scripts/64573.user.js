// ==UserScript==
// @name            SU V4 Discover Blogs
// @version	    	0.1
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://*.stumbleupon.com/discover/*
// @license         Who knows
// ==/UserScript==

var MAXDEPTH = 2;
var TARGETPOSTS = 10;
var MAXRECENTPOSTS = 1000;
var MAXRECENTVISITS = 30;
var subsArray = new Array ();
var subCount = 0, postCount = 0;
var recentVisits = GM_getValue ('recentVisits','').split (',');
var recentPosts = GM_getValue ('recentPosts','').split (',');
var postUL = document.getElementsByClassName ('listStumble')[0];
var blogsMsg, blogsCmd, blogsli, navdiv;
var today = new Date ();


function trimArray (array, size) {
	return array.slice (array.length - size);
}

function extractNames (page, array) {
	var stumblerul = page.match (/<ul class="gridUsers clearfix">[\s\S]*?<\/ul>/i)[0];
	var stumblermatch = stumblerul.match (/<li class="">[\s\S]*?<\/li>/gi);
	var i;
	
	if (stumblermatch != null) {
		for (i=0; i<stumblermatch.length; i++) {
			var stumblerid = /title="([^\s]*?)\s/.exec (stumblermatch[i])[1];
			array.push (stumblerid);
		}
		return stumblermatch.length;
	} else return 0;
}

function processPage (url, index, array, depth) {
	var xmlhttp=null;
	
	//GM_log ('Reading page: ' + url + index + '/');
	
	blogsMsg.textContent = 'Initializing...';
		
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			
			} else if (xmlhttp.readyState == 4) {
				var page = xmlhttp.responseText;
				var namecount = extractNames (page, array);
				if (namecount == 25 && depth < MAXDEPTH) {
					processPage (url, index + 25, array, depth+1);
				} else {
					// finished
					blogsMsg.textContent = '';
					blogsCmd.textContent = 'Blogs';
				}
			}
		};
		xmlhttp.open('GET',url + index + '/',true);
		xmlhttp.send(null);
	}
}

function searchArray (array, str) {
	var i;
	for (i=0;i<array.length;i++) {
		if (array[i] == str) {
			return i;
		}
	}
	return -1;
}

function updateSubs () {
	processPage ('http://www.stumbleupon.com/stumblers/subscriptions/', 0, subsArray, 0);
}

function parseDate (date) {
	var postdate;
	var dateresult = /([a-zA-Z]{3}\s[0-9]{2})(\s[0-9]{4})?/.exec (date);
	//GM_log ('Date result:'+dateresult);
	if (dateresult != null) {
		if (dateresult[1] != undefined) {
			var datestr;
			if (dateresult[2] == undefined) {
				datestr = dateresult[1] + ' ' + today.getFullYear();
			} else {
				datestr = dateresult[1] + dateresult[2];
			}
			postdate = Date.parse (datestr);
		} 
	} else {
		postdate = today.getTime();
	}
	//GM_log ('Date return:'+postdate);
	return postdate;
}

function processStumbler (stumbler) {
	var xmlhttp=null;
	var url = 'http://www.stumbleupon.com/stumbler/' + stumbler + '/reviews/';
	//GM_log ('Reading page: ' + url);
		
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			
			} else if (xmlhttp.readyState == 4) {
				var page = xmlhttp.responseText;
				var posts = page.match (/<li class="listLi blog[\s\S]*?<!-- end text -->[\s]*<\/li>/gi);
				if (posts != null) {
					var i;
					for (i=0; i<posts.length; i++) {
						var postid = /<var id="([^"]*)"/.exec (posts[i])[1];
						var date = /<span class="timestamp">[\s]*?<a [^>]*>([^<]*)<\/a>[\s]*?<\/span>/.exec (posts[i])[1];
						var imgpath = /\/mediumpics\/([^.]*.jpg)/.exec (page)[1];
						//GM_log (imgpath);
						var postdate = parseDate (date);
						//var postdate = today;
						//GM_log ('Post id:'+postid);
						if (searchArray (recentPosts, postid) == -1 && (today - postdate < 172800000)) {
							var stumblerli = '<li><div style="font-size:2em;"><a href="'+url+'"><img src="http://cdn.stumble-upon.com/superminipics/'+imgpath+'" style="margin: 5px 5px 0px 0px;" width="32px" />'+stumbler+'</a></div></li>';
							postUL.innerHTML += stumblerli;
							postUL.innerHTML += posts[i];
							recentPosts.push (postid);
							postCount++;
							//GM_log ('Post retrieved.');
							break;
						} else {
							//GM_log ('Post recently seen.');
						}
					}
				}
				tryNextSub();
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

function tryNextSub () {
	if (searchArray (recentVisits, subsArray[subCount]) == -1 && postCount < TARGETPOSTS) {
		recentVisits.push (subsArray[subCount]);
		subCount++;
		processStumbler (subsArray[subCount]);
	} else if (subCount < subsArray.length && postCount < TARGETPOSTS) {
		//GM_log (subsArray[subCount]+' recently visited.');
		subCount++;
		tryNextSub ();
	} else {
		//GM_log ('Finished!');
		recentVisits = trimArray(recentVisits,MAXRECENTVISITS);
		recentPosts = trimArray(recentPosts,MAXRECENTPOSTS)
		GM_setValue ('recentVisits', recentVisits.toString());
		GM_setValue ('recentPosts', recentPosts.toString());
		blogsMsg.textContent = '';
		blogsCmd.textContent = 'Blogs';
		blogsli.className = 'selected';
	}
}

function initPage () {
	var i;
	document.getElementsByClassName ('headerControls')[0].childNodes[3].childNodes[0].textContent = 'Blogs';
	document.getElementsByClassName ('module modulePagination clearfix')[0].innerHTML = '';
	var navli = navdiv.getElementsByTagName ('li');
	for (i=0;i<navli.length;i++) {
		if (navli[i].className != 'hasChild') {
			navli[i].className = '';
		}
	}
	postUL.innerHTML = '';
	blogsMsg.textContent = 'Getting posts...';
	blogsCmd.textContent = '';
	//blogsli.className = '';
	subCount = 0; 
	postCount = 0;
	tryNextSub();
}

function addControls () {
	navdiv = document.getElementById ('navSecondary');
	blogsli = document.createElement ('li');
	blogsCmd = document.createElement ('a');
	blogsMsg = document.createElement ('span');
	blogsMsg.style.textDecoration = 'blink';
	blogsCmd.href = 'javascript:void(0);';
	blogsCmd.addEventListener ('click', initPage, false);
	blogsli.appendChild (blogsCmd);
	blogsli.appendChild (blogsMsg);
	navdiv.childNodes[1].appendChild (blogsli);
}

addControls();
updateSubs();


