// ==UserScript==
// @name           Reddit Automator
// @namespace      http://userscripts.org/users/98196
// @description    Reddit Automator: A Reddit Userscript based on "Reddit Filter Plus with Comment Filter" - bugs fixed, down/upvote support, etc.  Work in progress.
// @include        http://www.reddit.com/prefs/
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/user/*
// @exclude        http://www.reddit.com/info/*
// ==/UserScript==

var DEBUGGING = false;
var hidden_headlines = [];
var $;
var rows;
var downvotes = 0;
var upvotes = 0;
var highlighted = 0;
var filtered = 0;
$ = unsafeWindow.jQuery;

function rf_GetElementByClassName(classname, node) {

	var re = new RegExp('\\b' + classname + '\\b');
	var allChildren = node.getElementsByTagName("*");

	for(var i=0,j=allChildren.length; i<j; i++)
		if(re.test(allChildren[i].className)) return allChildren[i];

	return null;
}


if (typeof GM_log === "undefined") {
  GM_log = function (msg) {};
}

if (typeof GM_setValue === "undefined") {
  GM_setValue = function (name, value) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 64800000000);//~2 years
    var expires = "; expires=" + expdate.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
  }
}

if (typeof GM_getValue === "undefined") {
  GM_getValue = function (name) {
    var regex = new RegExp(';?\s*'+escape(name)+'=([^;]+)');
    return document.cookie.match(regex);
  }
}

rf_foreach=function(seq, callback){
  for(var i=0;i<seq.length;++i){
    callback(seq[i]);
  }
}

rf_loadFilters = function() {
  var json = GM_getValue('rf_filters');
  if ( DEBUGGING ) GM_log('Loading filters: ' + json);
  
  var filters = eval('(' + json + ')');
  return filters ? filters : [];
}

rf_saveFilters = function(filters) {
  var json = '[';// convert to JSON
  for (var i = 0; i < filters.length; ++i) {
    var filter = filters[i];
    
    if (i > 0) {
      json += ', ';
    }
    json +=
        '{ ' +
          "'titles' : '" + filter.titles + "', " +
          "'urls' : '" + filter.urls + "'," +
          "'users' : '" + filter.users + "'," +
          "'subreddits' : '" + filter.subreddits + "', " +
          "'highlight' : " + filter.highlight + ", " +
		  "'upvote' : " + filter.upvote + ", " +
		  "'downvote' : " + filter.downvote + ", " +
          "'color' : '" + filter.color + "'" +
        ' }';
  }
  json += ']';
  
  if ( DEBUGGING ) GM_log('Saving filters: ' + json);
  GM_setValue('rf_filters', json);
}

rf_buildPatterns = function(filters) {
  var patternTable = [];
  
  for (var i = 0; i < filters.length; ++i) {
    var filter = filters[i];
    
    var filterPatterns = { 'user' : [], 'subreddit' : [], 'url' : [], 'title' : [], 'highlight' : false, 'upvote' : false, 'downvote' : false, 'color' : 'yellow' };
    
    if (filter.titles) {
      // add title matches
      rf_foreach(filter.titles.split(/\s*,\s*/),function(pattern){
        filterPatterns.title.push(new RegExp(pattern, 'i'));
      });
    }
    
    if (filter.urls) {
      // add url matches
      rf_foreach(filter.urls.split(/\s*,\s*/),function(pattern){
        filterPatterns.url.push(new RegExp(pattern, 'i'));
      });
    }
    
    if (filter.users) {
      // add user patterns
      rf_foreach(filter.users.split(/\s*,\s*/),function(pattern){
        filterPatterns.user.push(new RegExp(pattern, 'i'));
      });
    }
    
    if (filter.subreddits) {
      // add subreddit patterns
      rf_foreach(filter.subreddits.split(/\s*,\s*/),function(pattern){
        filterPatterns.subreddit.push('http://www.reddit.com/r/' + pattern.toLowerCase() + '/');
      });
    }
    
	filterPatterns.upvote = filter.upvote;
	filterPatterns.downvote = filter.downvote;
    filterPatterns.highlight = filter.highlight;
    filterPatterns.color = filter.color;
    
    patternTable.push(filterPatterns);
  }

  return patternTable;
}

rf_highlight = function(elem, color)
{
  elem.style.backgroundColor = color;
}

rf_hide = function(elem)
{
  elem.style.display = 'none';
  hidden_headlines.push(elem);
}

function rf_downvote(myrow,mystoryid) {
	$(rf_GetElementByClassName("arrow down", myrow)).vote(mystoryid);
}

function rf_upvote(myrow,mystoryid) {
	$(rf_GetElementByClassName("arrow up", myrow)).vote(mystoryid);
}

rf_doFilter = function()
{
   var filters = rf_buildPatterns(rf_loadFilters());
   rows = document.evaluate("//*[starts-with(@class, ' thing id-t3')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < rows.snapshotLength; ++i) {
    var row = rows.snapshotItem(i);
	
	if (row.getAttribute("style") == "display: none;") continue;
	
	var rowHTML = row.innerHTML;
	var regStoryID;
	var storyID;
	
	try {
		regStoryID = /\.vote\('([^']+)/i;
		storyID = regStoryID.exec(rowHTML)[1];
	}
	catch (err) {
		if ( DEBUGGING ) GM_log("ERROR: " + i + "\) " + row.className + " STORYID ERROR: " + rowHTML);
		storyID = null;
		continue;
	}

	if( DEBUGGING ) GM_log("Testing DivID: " + storyID);
	
	var rowTitle = rf_GetElementByClassName("title", row).firstChild.innerHTML;
	var rowEntry = rf_GetElementByClassName("entry", row);
	var rowDomain = rf_GetElementByClassName("domain", row).textContent.replace(/[()]/gi, "");
	var rowHTMLAdd = "";
	var rowSubreddit;
	var rowSubmitter;
	var match = false;
	
	try {
		rowSubreddit = getElementByClassName("subreddit", row).innerHTML;
    }
    catch (err) {
      rowSubreddit = null;
    }
	
	try {
		rowSubmitter = rf_GetElementByClassName("author", row).innerHTML;
	}
	catch (err) {
	  rowSubmitter = null;
	}
	
	for (var j = 0; j < filters.length; ++j) {
		 var filter = filters[j];
		 
		 for (var k = 0; !match && k < filter.title.length; ++k) {
			var pattern = filter.title[k];
			
			if( DEBUGGING ) GM_log("Testing title: " + rowTitle);
			
			if (pattern.test(rowTitle)) {
				match = true;
				rowHTMLAdd += '<p><i>Submission filtered due to title. (Matched: ' + pattern + ')</i></p> ';
			}
		}
		
		for (var k = 0; !match && k < filter.url.length; ++k) {
			var pattern = filter.url[k];
			
			if( DEBUGGING ) GM_log("Testing domain: " + rowDomain);
			
			if (pattern.test(rowDomain)) {
				match = true;
				rowHTMLAdd += '<p><i>Submission filtered due to domain. (Matched: ' + pattern + ')</i></p> ';
			}
		}

		if ( rowSubmitter )
			for (var k = 0; !match && k < filter.user.length; ++k) {
				var pattern = filter.user[k];
				
				if( DEBUGGING ) GM_log("Testing submitter: " + rowSubmitter.toLowerCase() + " against " + pattern);
				
				if (pattern.test(rowSubmitter)) {
					match = true;
					rowHTMLAdd += '<p><i>Submission filtered due to submitter. (Matched: ' + pattern + ')</i></p> ';
				}
			}				
	}
  
    if (match) {
		  if (filter.highlight) {
            if (filter.color) {		  
			   rf_highlight(row, filter.color);
			   highlighted++;
			}
		  } else {
            if (filter.color) {		  
			   rf_highlight(row, filter.color);
		    }
            rf_hide(row);
			filtered++;
          }
		  
		  if (filter.upvote) {
			rf_upvote(row,storyID);
			upvotes++;
		  }
		  else if (filter.downvote) {
		    rf_downvote(row,storyID);
			downvotes++;
			
		  }
		  rowEntry.innerHTML += rowHTMLAdd;
        }
    }

    rf_report(hidden_headlines.length, highlighted, upvotes, downvotes);
}

rf_doCommentFilter = function()
{
  var filters = rf_buildPatterns(rf_loadFilters());
  rows = document.evaluate("//*[starts-with(@class, ' thing id-t1')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < rows.snapshotLength; ++i) {
    var row = rows.snapshotItem(i);
	
	if (row.getAttribute("style") == "display: none;") continue;
	
	var rowHTML = row.innerHTML;
	var regStoryID;
	var storyID;
	
	try {
		regStoryID = /\.vote\('([^']+)/i;
		storyID = regStoryID.exec(rowHTML)[1];
	}
	catch (err) {
		if ( DEBUGGING ) GM_log("ERROR: " + i + "\) " + row.className + " STORYID ERROR: " + rowHTML);
		storyID = null;
		continue;
	}

	var rowHTMLAdd;
	var rowSubreddit;
	var rowSubmitter;
	var match = false;
	
	try {
	  rowSubreddit = getElementByClassName("subreddit", row).innerHTML;
    }
    catch (err) {
      rowSubreddit = null;
    }
	
	try {
		rowSubmitter = rf_GetElementByClassName("author", row).innerHTML;
	}
	catch (err) {
	    rowSubmitter = null;
	}
	
	for (var j = 0; j < filters.length; ++j) {	     
		 var filter = filters[j];
		 
		for (var k = 0; !match && k < filter.user.length; ++k) {
			var pattern = filter.user[k];
			
			if( DEBUGGING ) GM_log("Testing submitter: " + rowSubmitter.toLowerCase() + " against " + pattern);
			
			if (pattern.test(rowSubmitter)) {
				match = true;
				rowHTMLAdd += '<p><i>Submission filtered due to submitter. (Matched: ' + pattern + ')</i></p> ';
			}
		}				
	}
  
    if (match) {
		  if (filter.highlight) {
            if (filter.color) {		  
			   rf_highlight(row, filter.color);
			   highlighted++;
			}
		  } else {
            rf_hide(row);
            if (filter.color) {		  
			   rf_highlight(row, filter.color);
		    }			
			filtered++;
          }
		  
		  if (filter.upvote) {
			rf_upvote(row,storyID);
			upvotes++;
		  }
		  else if (filter.downvote) {
		    rf_downvote(row,storyID);
			downvotes++;
			
		  }
		  rowEntry.innerHTML += rowHTMLAdd;
        }
    }

  rf_report(hidden_headlines.length, highlighted, upvotes, downvotes);
}

rf_reSerialize = function() {
  var filters = [];
  var container = document.getElementById('rf_filters');
  
  for (var i = 0; i < container.childNodes.length; ++i) {
    var node = container.childNodes[i];
    var filter = {'titles' : '', 'urls' : '', 'users' : '', 'subreddits' : '', 'highlight' : false, 'upvote' : false, 'downvote' : false, 'color' : 'yellow'};
    
    var subnodes = node.getElementsByTagName('input');
    for (var j = 0; j < subnodes.length; ++j) {
      var input = subnodes[j];
      
      if (input.type == 'text' && input.value) {
        if (input.className == 'rf_titles') {
          filter.titles = input.value;
        } else if (input.className == 'rf_urls') {
          filter.urls = input.value;
        } else if (input.className == 'rf_users') {
          filter.users = input.value;
        } else if (input.className == 'rf_subreddits') {
          filter.subreddits = input.value;
        } else if (input.className == 'rf_color') {
          filter.color = input.value;
        }
      } else if (input.type == 'checkbox') {
		if (input.className == 'rf_highlight') {
		  filter.highlight = input.checked;
		} else if (input.className == 'rf_upvote') {
		  filter.upvote = input.checked;
		} else if (input.className == 'rf_downvote') {
		  filter.downvote = input.checked;
		}
		
      }
    }
    filters.push(filter);
    
  }
  
  return filters;
}

rf_deSerialize = function(filters) {
  for (var i = 0; i < filters.length; ++i) {
    var filter = filters[i];
    
    rf_prefsAddFilter(filter.titles, filter.urls, filter.users, filter.subreddits, filter.highlight, filter.upvote, filter.downvote, filter.color);
  }
}

rf_doPrefs = function() {
  var newForm = document.createElement('form');
  newForm.className = 'pretty-form';
  newForm.innerHTML = '<hr><h1>Reddit Automator Filter Configuration</h1><p>Use Javascript regular expressions, separated by a comma.  For example: user filter: user1, user2, user(3|4|5), ...</p><div id="rf_filters"></div><hr><input id="rf_addfilter" type="button" class="btn" value="add filter" /><input id="rf_savefilters" type="button" class="btn" value="save filters" /><span id="rf_savestatus" style="display: none">saved</span><br><a href="http://www.reddit.com/">return to main</a>';

  // append the filter preferences in an appropriate spot
  var forms = document.getElementsByTagName('form');
  for (var i = 0; i < forms.length; ++i) {
    var form = forms[i];
    
    if (form.className == 'pretty-form short-text') {
      form.parentNode.insertBefore(newForm, form.nextSibling);
    }
  }

  document.getElementById('rf_addfilter').addEventListener('click', function() {rf_prefsAddFilter('', '', '', '', true, 'yellow');}, false);
  document.getElementById('rf_savefilters').addEventListener('click', function() {
      rf_saveFilters(rf_reSerialize());
      window.setTimeout(function() {
        document.getElementById('rf_savestatus').style.display = 'none';
      }, 4000);
      document.getElementById('rf_savestatus').style.display = '';
    document.getElementById('rf_savestatus').innerHTML = 'saved';}, false);

  rf_deSerialize(rf_loadFilters());
}

rf_prefsAddFilter = function(titles, urls, users, subreddits, highlight, upvote, downvote, color) {
  var container = document.getElementById('rf_filters');
  var newFilter = document.createElement('div');
  var removeButton = document.createElement('input');

  newFilter.style.border = '1px solid black';
  newFilter.innerHTML = '<table class="content preftable">' +
      '<tr><th>title filters</th><td class="prefright"><input class="rf_titles" type="text" value="' + (titles ? titles : '') + '" /></td></tr>' +
      '<tr><th>url filters</th><td class="prefright"><input class="rf_urls" type="text" value="' + (urls ? urls : '') + '" /></td></tr>' +
      '<tr><th>user filters</th><td class="prefright"><input class="rf_users" type="text" value="' + (users ? users : '') + '" /></td></tr>' +
      '<tr><th>subreddit filters</th><td class="prefright"><input class="rf_subreddits" type="text" value="' + (subreddits ? subreddits : '') + '" /></td></tr>' +
	  '<tr><th>upvote submission</th><td class="prefright"><input type="checkbox" "class="rf_upvote" ' + (upvote ? 'checked ' : '' ) +' /> (if checked, anything matching this filter will be upvoted)</td></tr>' +
	  '<tr><th>downvote submission</th><td class="prefright"><input type="checkbox" "class="rf_downvote" ' + (downvote ? 'checked ' : '' ) +' /> (see above: upvotes take priority)</td></tr>' +
      '<tr><th>highlight</th><td class="prefright"><input type="checkbox" "class="rf_highlight" ' + (highlight ? 'checked ' : '' ) +' /> (if unchecked, anything matching this filter will be hidden)</td></tr>' +
      '<tr><th>highlight color</th><td class="prefright"><input class="rf_color" type="text" value="' + (color ? color : '') + '" /></td></tr>' +
      '</table>';
  
  removeButton.type = 'button';
  removeButton.class = 'btn';
  removeButton.value = 'remove this filter';
  removeButton.addEventListener('click', function() {container.removeChild(newFilter);}, false);
  
  newFilter.appendChild(removeButton);
  container.appendChild(newFilter);
}

rf_unhide = function() {
  for (var i = 0; i < hidden_headlines.length; ++i) {
    hidden_headlines[i].style.display = '';
  }
  document.getElementById('rf_report').style.display = 'none';
}

rf_report = function(xfilt, xhigh, xup, xdown) {
  var msg = "(Reddit Automator: ";
  var prev = 0;
  if ( xfilt > 0 )
  {
	 if ( prev )
	 {
		 msg += ", ";
     }
	 msg += xfilt + " submissions filtered";
	 prev++;
  }
  if ( xhigh > 0 )
  {
	 if ( prev )
	 {
		 msg += ", ";
     }
	 msg += xhigh + " submissions highlighted";
	 prev++;
  }
  if ( xup > 0 )
  {
	 if ( prev )
	 {
		 msg += ", ";
     }
	 msg += xup + " submissions automatically upvoted";
	 prev++;
  }
  if ( xdown > 0 )
  {
	 if ( prev )
	 {
		 msg += ", ";
     }
	 msg += xdown + " submissions automatically downvoted";
	 prev++;
  }
  msg += ")";
  
  if ( DEBUGGING ) GM_log(msg);

  if (xfilt || xhigh || xup || xdown) {
    var div = document.createElement('div');
    div.innerHTML = '<p id="rf_report"><i>' + msg + ': <a id="rf_unhide" onClick="rf_unhide()">[unhide]</a><i></p>';
    
    var siteTable = document.getElementById('header-bottom-right');
    if (siteTable == null) siteTable = document.getElementById('siteTable');
    siteTable.parentNode.insertBefore(div, siteTable.nextSibling);
    document.getElementById('rf_unhide').addEventListener('click', rf_unhide, false);
  }
}

if (/\/prefs\//.test(window.location.href)) {
  rf_doPrefs();
} else if (/\/comments\//.test(window.location.href)) {
  rf_doCommentFilter();
} else {
  rf_doFilter();
}
