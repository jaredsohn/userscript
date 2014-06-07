// ==UserScript==
// @name          Sky city cinemas NZ showtimes
// @namespace     RainbowWarrior
// @include       http://www.skycitycinemas.co.nz/
// @version       0.2.0
// @description	  Adds rotten tomatoes rating and link to www.skycitycinemas.co.nz
// @description	  Some rotten tomatoes links not working due to duplicate film titles. RT link for now which will return a search on rotten tomatoes. In the future I might fix
// @description	  Clicking on movies links now open in blank window / tab
// @description	  Borrowed code from "Google Showtimes" - http://userscripts.org/scripts/review/38575 - props to sizzlemctwizzle
// @description	  post a message for bug fixes
// ==/UserScript==

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


function showRating(percent, i, movie, url, accuracy) {
    // rename the url if we dont have a valid url
    if (url == 'void') {
      url = 'http://www.rottentomatoes.com/m/' + movie;
    }
    
    if (accuracy == 1) {
      color = "color:orange"
    } else if (accuracy == 2) {
      color = "color:grey"
    } else {
      color = "color:black"
    }
    
    if (percent == 0) {
    $('rating_'+i).innerHTML = '<a target="_blank" style="' + color + '" href="' + url + '/">RT</a>';
  } else if (+percent < 60) {
    $('rating_'+i).innerHTML = '<a target="_blank" style="' + color + '" href="' + url + '" class="icon"><img src="http://images.rottentomatoes.com/images/icons/splat_sm.gif" alt="ROTTEN" title="ROTTEN" style="border:none;"> '+percent+'%</a>';
  } else if (+percent >= 60) {
    $('rating_'+i).innerHTML = '<a target="_blank" style="' + color + '" href="' + url + '" class="icon"><img src="http://images.rottentomatoes.com/images/icons/tomato_sm.gif" alt="FRESH" title="FRESH" style="border:none;"> '+percent+'%</a>';
  }
  window.cacheRatings[movie] = percent;
  createCookie('rottenRatings', encodeURIComponent(uneval(window.cacheRatings)));
  window.cacheUrls[movie] = url;
  createCookie('rottenUrls', encodeURIComponent(uneval(window.cacheUrls)));
  window.cacheAccuracy[movie] = accuracy;
  createCookie('rottenAccuracy', encodeURIComponent(uneval(window.cacheAccuracy)));
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
	showRating(percent[1], i, movie, responseDetails.finalUrl, 2);
      } else {
        showRating(0, i, movie, 'void', 3);
      }
    }
  });
}


function requestRatings(movies, i) {
GM_xmlhttpRequest({
	method: 'GET',
	    url: 'http://www.rottentomatoes.com/m/' + movies[i] + '/',
	    headers: {
	    'User-agent':window.navigator.userAgent,
	      'Accept': 'application/atom+xml,application/xml,text/xml',
	      },
	    onload: function(responseDetails) {
	    //movieReg = new RegExp('<a href="(/m/.*-'+movies[i]+'/)">.*<\/a>');
	    //movieReg = new RegExp('<a href="(/m/.*'+movies[i]+'.*/)">.*<\/a>');
	    movieReg = new RegExp('<a href="(/m/.*'+movies[i]+'.*/)">.*<\/a>');

	    if ( (responseDetails.status == 200) && (percent=responseDetails.responseText.match(/<span[^>]+class="percent"[^>]*>(.*)<\/span>/i)) ) {
	         showRating(percent[1], i, movies[i], responseDetails.finalUrl, 1);
	    } else if(url=responseDetails.responseText.match(movieReg)) {
	         url=responseDetails.responseText.match(movieReg)
	         aggressiveGet('http://www.rottentomatoes.com' + url[1], i, movies[i]);	
	    } else {
	         // that didnt work - now we are desperate - use the first movie found
	         movieReg = new RegExp('<a href="(/m/.*/)">.*<\/a>');
	         url=responseDetails.responseText.match(movieReg)
	         aggressiveGet('http://www.rottentomatoes.com' + url[1], i, movies[i]);	
	         //showRating(0, i, movies[i], 'void', 3);
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
  if (readCookie('rottenAccuracy')) {
      window.cacheAccuracy = eval(decodeURIComponent(readCookie('rottenAccuracy')));
    } else {
      window.cacheAccuracy = {};
    }
  for (var i = 0; i < movies.length; i++) {
    if (window.cacheRatings[movies[i]] == 'fail') {
      $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/search/full_search.php?search=' + movies[i].replace(/_/g, '+') + '">Failed</a>';
    } else if (window.cacheRatings[movies[i]] == 'none') {
      $('rating_'+i).innerHTML = '<a href="http://www.rottentomatoes.com/m/' + movies[i] + '/">No Rating</a>';
    } else if ( (window.cacheRatings[movies[i]]) && (window.cacheAccuracy[movies[i]]) ){
      showRating(window.cacheRatings[movies[i]], i, movies[i], window.cacheUrls[movies[i]], window.cacheAccuracy[movies[i]]);
    } else {
      requestRatings(movies, i);
      $('rating_'+i).innerHTML = "Loading...";
    }
  }
}


var titles = document.evaluate(
			      "//div[@class='summary']//h3//a",
			      document,
			      null,
			      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var movies = new Array();
var els = new Array();
j=0;



for (var i = 0; i < titles.snapshotLength; i ++) {
/*	title = titles.snapshotItem(i).innerHTML.replace(/The /, '').toLowerCase().replace(/ /g,'_').replace(/:/g,'').replace(/'/g,'').replace(/-/g,'').replace(/_\(m\)/,'')
									  .replace(/_\(g\)/,'').replace(/_\(pg\)/,'').replace(/_\(r16\)/,'').replace(/_\(r18\)/,'')
*/									  
	title = titles.snapshotItem(i).innerHTML.replace(/ /g,'_').replace(/:/g,'').replace(/'/g,'').replace(/-/g,'').replace(/_\(m\)/,'')
									  .replace(/_\(g\)/,'').replace(/_\(pg\)/,'').replace(/_\(r16\)/,'').replace(/_\(r18\)/,'')

	movies.push(title);
	var newElement = document.createElement('b');
	newElement.id = "rating_"+j;
	//titles.snapshotItem(i).parentNode.appendChild(newElement);
	titles.snapshotItem(i).parentNode.parentNode.appendChild(newElement);
	//titles.snapshotItem(i).appendChild(newElement);
	titles.snapshotItem(i).target="_blank";
	//titles.snapshotItem(i).style.color="orange";
	j++;
}

getRatings(movies);

// Auto Update
CheckScriptForUpdate = {
 id: '38677',
 days: 0,
/*
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
*/
 name: 'Sky city cinemas NZ showtimes',
 version: '0.2.0',
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