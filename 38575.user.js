scr_meta=<><![CDATA[
// ==UserScript==
// @name          Google Showtimes
// @namespace     sizzlemctwizzle
// @include       http://*.google.com/*
// @include       http://*.google.com/*
// @version       1.0.7
// @description	  Adds convenient Rotten Tomatoes ratings to Google Showtimes listings. Now with very aggressive and accurate searching!
// ==/UserScript==
]]></>;

// Helper Functions
function $(element) { return document.getElementById(element); }

Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
	if (!returnArray) { returnArray = [] }
	returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
	if (!returnArray) { returnArray = [] }
	returnArray.push(i);
      }
    }
  }
  return returnArray;
}

function createCookie(name,value) {
  var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Add Showtimes link, no clue why this isn't already here
if ($('gbi')) {
  line = document.evaluate('//div[@class="gb2"][2]',
			   document, null, 9, null).singleNodeValue;
  link = document.createElement('a');
  link.href = "http://www.google.com/movies";
  link.innerHTML = "Showtimes";
  link.className = "gb2";
  $('gbi').insertBefore(link, line);
    }

// Add more days to the Showtimes bar so you can actually plan ahead more than 3 days!
if (/http:\/\/.*\.google\.com\/movies.*/.test(document.location.href)) {
var dev = document.evaluate(
			    '//form[@action="/movies"]/table/tbody/tr[@bgcolor="#e5ecf9"]/td/font/a | //form[@action="/movies"]/table/tbody/tr[@bgcolor="#e5ecf9"]/td/font/b', 
			    document, 
			    null, 
			    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  days = new Array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
  ref_day = +days.find(dev.snapshotItem(3).innerHTML);
  if (dev.snapshotItem(2).nodeName == "A") path = dev.snapshotItem(2).href; else path = dev.snapshotItem(3).href;
  if (ref_day < 4) today = ref_day + 4; else today = ref_day - 3;
  bar = dev.snapshotItem(0).parentNode;
  bar.innerHTML = "";
  for (var i = 0; i < 8; i++) {
    if (today > 6) today = 0;
    if ( (/date=(\d)/.exec(document.location.href)) && (/date=(\d)/.exec(document.location.href)[1] == i) ) { 
      link = document.createElement('b');
    } else if ( (!/date=(\d)/.exec(document.location.href)) && (i == 0) ) {
      link = document.createElement('b');
    } else { 
      link = document.createElement('a'); 
      link.href = path.split('date=')[0] + 'date=' + i; 
    }
    if (i == 0) {
      link.innerHTML = "Today";
    } else if (i == 1) {
      link.innerHTML = "Tomorrow";
    } else {
      link.innerHTML = days[today];
    }
    space = document.createTextNode(" - ");
    bar.appendChild(space);
    bar.appendChild(link);
    today++;
  }
 }

// Get Rotten Tomatoes Rating
// A big thanks to Google for the wonderful html (sarcasm btw, I can't believe this is the same company that made gmail)

function showRating(percent, i, movie, url) {
  if (+percent < 60) {
    $('rating_'+i).innerHTML = '<a href="' + url + '" class="icon"><img src="http://images.rottentomatoes.com/images/icons/splat_sm.gif" alt="ROTTEN" title="ROTTEN" style="border:none;"> '+percent+'%</a>';
  } else if (+percent >= 60) {
    $('rating_'+i).innerHTML = '<a href="' + url + '" class="icon"><img src="http://images.rottentomatoes.com/images/icons/tomato_sm.gif" alt="FRESH" title="FRESH" style="border:none;"> '+percent+'%</a>';
  }
  window.cacheRatings[movie] = percent;
  createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
  window.cacheUrls[movie] = url;
  createCookie('rottenUrls', encodeURIComponent(uneval(window.cacheUrls)));
}

function veryAggressive(i, movie, possible, url) {
  title = possible.textContent.replace(/\//, '').toLowerCase().replace(/ /g,'_').replace(/:/g,'').replace(/\'/g,'').replace(/-/g,'').replace(/:/g, '').replace(/\&amp;/, 'and').replace(/\./, '');
  tests = movie.split('_');
  confidence = 0;
  for(j = 0; j < tests.length; j++) {
    testReg = new RegExp(tests[j]);
    if (testReg.test(title)) {
	confidence++;
      }
  }
  confidence = Math.round((confidence/tests.length)*100);
  // GM_log('We are '+confidence+'% confident that '+movie+' is '+title);
  if (confidence >= 50) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: url,
	  headers: {
	  'User-agent':window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(responseDetails) {
	  if (percent=responseDetails.responseText.match(/<span[^>]+class="percent"[^>]*>(.*)<\/span>/i)) {
	    showRating(percent[1], i, movie, url);
	    // GM_log('found rating very aggressively - ' + url);
	  } else {
	    // GM_log('failed to find rating very aggressively - ' + url);
	    window.cacheRatings[movie] = 'none';
	    createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
	    $('rating_'+i).innerHTML = '<a href="' +url + '">No Rating</a>';
	  }
	}
      });
  } else {
    // GM_log('Did not display rating for '+movie+' since we are only '+confidence+'% confident it is '+title); 
    window.cacheRatings[movie] = 'fail';
    createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
    $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/search/full_search.php?search=' + movie.replace(/_/g, '+') + '">Failed</a>';
  }
}

function aggressiveGet(url, i, movie) {
GM_xmlhttpRequest({
  method: 'GET',
      url: url,
      headers: {
      'User-agent':window.navigator.userAgent,
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
      onload: function(responseDetails) {
      if (percent=responseDetails.responseText.match(/<span[^>]+class="percent"[^>]*>(.*)<\/span>/i)) {
	showRating(percent[1], i, movie, url);
	// GM_log('found rating aggressively - ' + url);
      } else {
	// GM_log('failed to find rating aggressively - ' + url);
	getPossible(i, movie);
      }
    }
  });
}

function getPossible(i, movie) {
  GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.rottentomatoes.com/search/full_search.php?search=' + movie.replace(/_/g, '+'),
	headers: {
	'User-agent':window.navigator.userAgent,
	  'Accept': 'application/atom+xml,application/xml,text/xml',
	  },
	onload: function(responseDetails) {
	var holder = document.createElement('div');
	holder.innerHTML = responseDetails.responseText.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1];
	var p = new DOMParser();
	var xs = new XMLSerializer();
	var doc = p.parseFromString(xs.serializeToString(holder), "text/xml");
	holder.innerHTML = "";
	title = doc.evaluate('//TABLE[@class="proViewTbl noCaption"]//TD[@width="85%"]//A', doc, null, 
			     XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (title) {
	  veryAggressive(i, movie, title, 'http://www.rottentomatoes.com' + title.getAttribute('href')); 
	} else {
	  // GM_log('Could not get link from '+'http://www.rottentomatoes.com/search/full_search.php?search=' + movie.replace(/_/g, '+'));
	  window.cacheRatings[movie] = 'fail';
	  createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
	  $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/search/full_search.php?search=' + movie.replace(/_/g, '+') + '">Failed</a>';
	}
      }
    });
}

function requestRatings(movie, i) {
GM_xmlhttpRequest({
  method: 'GET',
      url: 'http://www.rottentomatoes.com/alias?type=imdbid&s=' + imdb[i],
      headers: {
      'User-agent':window.navigator.userAgent,
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
      onload: function(responseDetails) {
      movieReg = new RegExp('<a href="(/m/.*-'+movie+'/)">.*<\/a>');
      if ( (responseDetails.status == 200) && (percent=responseDetails.responseText.match(/<span[^>]+class="percent"[^>]*>(.*)<\/span>/i)) ) {
	// GM_log('rating found - ' + 'http://www.rottentomatoes.com/m/' + movie);
	showRating(percent[1], i, movie, responseDetails.finalUrl);
      } else if (/http:\/\/www\.rottentomatoes\.com\/m\/.*\//.test(responseDetails.finalUrl)) {
	// GM_log('no rating found - ' + 'http://www.rottentomatoes.com/m/' + movie);
	window.cacheRatings[movie] = 'none';
	createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
	$('rating_'+i).innerHTML = '<a href="' + responseDetails.finalUrl + '">No Rating</a>';	
      } else {
	// GM_log('Could not get movie page with api - ' + 'http://www.rottentomatoes.com/m/' + movie);
	if (url=responseDetails.responseText.match(movieReg)) {
	  // GM_log('match found and started aggression - ' + 'http://www.rottentomatoes.com' + url[1]);
	  aggressiveGet('http://www.rottentomatoes.com' + url[1], i, movie);
	} else {
	  // GM_log('no match found, getting first search result - ' + 'http://www.rottentomatoes.com/m/' + movie);
	  getPossible(i, movie);
	}
      }
    }
  });
}

function getRatings(movies) {
  if (readCookie('rottenRatings')) {
    window.cacheRatings = eval(decodeURIComponent(readCookie('rottenRatings')));
  } else {
    window.cacheRatings = {};
  }
  if (readCookie('rottenUrls')) {
      window.cacheUrls = eval(decodeURIComponent(readCookie('rottenUrls')));
    } else {
      window.cacheUrls = {};
    }
  for (var i = 0; i < movies.length; i++) {
    if (window.cacheRatings[movies[i]] == 'fail') {
      $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/search/full_search.php?search=' + movies[i].replace(/_/g, '+') + '">Failed</a>';
    } else if (window.cacheRatings[movies[i]] == 'none') {
      $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/m/' + movies[i] + '/">No Rating</a>';
    } else if (window.cacheRatings[movies[i]]) {
      showRating(window.cacheRatings[movies[i]], i, movies[i], window.cacheUrls[movies[i]]);
    } else {
      requestRatings(movies[i], i);
      $('rating_'+i).innerHTML = "Loading";
    }
  }
}
/*
var titles = document.evaluate(
			      '//b[@dir="ltr"]', // wtf? lol
			      document, 
			      null, 
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var movies = new Array();
j=0;
for (var i = 0; i < titles.snapshotLength; i ++) {
title = titles.snapshotItem(i).innerHTML.replace(/\//, '').toLowerCase().replace(/ /g,'_').replace(/:/g,'').replace(/'/g,'').replace(/-/g,'').replace(/:/g, '').replace(/\&amp;/, 'and').replace(/\./, '');
if ( (titles.snapshotItem(i).parentNode.parentNode.nodeName == "FONT") && (titles.snapshotItem(i).parentNode.parentNode.parentNode.previousSibling) ) {
movies.push(title);
titles.snapshotItem(i).parentNode.parentNode.parentNode.previousSibling.firstChild.id = "rating_"+j;
$('rating_'+j).innerHTML = "";
j++;
}
}

var imdb = new Array();
imdb_ids = document.evaluate(
			      '//a[@class="fl"]/child::text()[contains(.,"IMDb")]',
			      document, 
			      null, 
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < imdb_ids.snapshotLength; i ++) {
  link = imdb_ids.snapshotItem(i).parentNode.getAttribute('href');
  imdb_id = link.split('/title/tt')[1].split('/')[0].replace('-', '');
  imdb.push(imdb_id);
 }

getRatings(movies);
*/

// Auto Update
CheckScriptForUpdate = {
 id: '38575',
 days: 2,
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();