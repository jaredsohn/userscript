// ==UserScript==
// @name	Reddit Filter Plus with Comment Filter
// @description	Hide or highlight links / comments by user, title, url or subreddit. Preferences are found on the regular reddit preferences page. Highlight colors may be entered as HTML colors (#123456) or with simple names.
// @include	http://www.reddit.com/prefs/
// @include	http://www.reddit.com/*
// @exclude	http://www.reddit.com/user/*
// @exclude	http://www.reddit.com/info/*
// ==/UserScript==

var hidden_headlines = [];

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
  GM_log('Loading filters: ' + json);
  
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
          "'color' : '" + filter.color + "'" +
        ' }';
  }
  json += ']';
  
  GM_log('Saving filters: ' + json);
  GM_setValue('rf_filters', json);
}

rf_buildPatterns = function(filters) {
  var patternTable = [];
  
  for (var i = 0; i < filters.length; ++i) {
    var filter = filters[i];
    
    var filterPatterns = { 'user' : [], 'subreddit' : [], 'url' : [], 'title' : [], 'highlight' : false, 'color' : 'yellow' };
    
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
        filterPatterns.user.push('http://www.reddit.com/user/' + pattern.toLowerCase() + '/');
      });
    }
    
    if (filter.subreddits) {
      // add subreddit patterns
      rf_foreach(filter.subreddits.split(/\s*,\s*/),function(pattern){
        filterPatterns.subreddit.push('http://www.reddit.com/r/' + pattern.toLowerCase() + '/');
      });
    }
    
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

rf_doFilter = function()
{
  var filters = rf_buildPatterns(rf_loadFilters());
  var divs = document.getElementsByTagName('div');

  for (var i = 0; i < divs.length; ++i) {
    var div = divs[i];

    if (!(/^thingrow_/.test(div.id))) continue;

    var match = false;
    var links = div.getElementsByTagName('a');
    for (var j = 0; !match && j < links.length; ++j) {
      var link = links[j];

      for (var k = 0; k < filters.length; ++k) {
        var filter = filters[k];
        
        if (/^title/.test(link.className)) {
          
          // title match
          for (var l = 0; !match && l < filter.title.length; ++l) {
            var pattern = filter.title[l];
            
            if (pattern.test(link.innerHTML)) {
              match = true;
              break;
            }
          }// [end]for each title
  
          // url match
          for (var l = 0; !match && l < filter.url.length; ++l) {
            var pattern = filter.url[l];
            
            if (pattern.test(link.href)) {
              match = true;
              break;
            }
          }// [end]for each url
        } else if (link.className == 'author') {
  
          // user match
          for (var l = 0; !match && l < filter.user.length; ++l) {
            var pattern = filter.user[l];
            
            if (pattern == link.href.toLowerCase()) {
              match = true;
              break;
            }
          }// [end]for each user
        } else if (link.className == 'hover') {
  
          // subreddit match
          for (var l = 0; !match && l < filter.subreddit.length; ++l) {
            var pattern = filter.subreddit[l];
            
            if (pattern == link.href.toLowerCase()) {
              match = true;
              break;
            }
          }// [end]for each subreddit
        }
        
        if (match) {
          rf_highlight(div, filter.color);
          if (!filter.highlight) {
            rf_hide(div);
          }
          break;
        }
      }// [end]for each filter

    }// [end]for each link
  }// [end]for each div

  rf_report(hidden_headlines.length);
}

rf_doCommentFilter = function()
{
  var filters = rf_buildPatterns(rf_loadFilters());
  var divs = document.getElementsByTagName('div');

  for (var i = 0; i < divs.length; ++i) {
    var div = divs[i];

    if (!(/^display_/.test(div.id))) continue;
    var match = false;
    /* hardcoded */
    var username = "";
    if ( div.childNodes && div.childNodes.length > 0) {
      var tagline = div.childNodes[0];
      if (tagline.childNodes && tagline.childNodes.length > 0) {
        username = tagline.childNodes[0].href.toLowerCase();
      }
    }

    for (var k = 0; !match && k < filters.length; ++k) {
      var filter = filters[k];
      // user match
      for (var l = 0; !match && l < filter.user.length; ++l) {
        var pattern = filter.user[l];

        if (pattern == username) {
          match = true;
          break;
        }
      }// [end]for each user
      if (match) {
        rf_highlight(div, filter.color);
        if (!filter.highlight) {
          rf_hide(div);
        }
        break;
      }
    }// [end]for each filter

  }// [end]for each div

  rf_report(hidden_headlines.length);
}

rf_reSerialize = function() {
  var filters = [];
  var container = document.getElementById('rf_filters');
  
  for (var i = 0; i < container.childNodes.length; ++i) {
    var node = container.childNodes[i];
    var filter = {'titles' : '', 'urls' : '', 'users' : '', 'subreddits' : '', 'highlight' : false, 'color' : 'yellow'};
    
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
        filter.highlight = input.checked;
      }
    }
    filters.push(filter);
    
  }
  
  return filters;
}

rf_deSerialize = function(filters) {
  for (var i = 0; i < filters.length; ++i) {
    var filter = filters[i];
    
    rf_prefsAddFilter(filter.titles, filter.urls, filter.users, filter.subreddits, filter.highlight, filter.color);
  }
}

rf_doPrefs = function() {
  var newForm = document.createElement('form');
  newForm.className = 'pretty-form';
  newForm.innerHTML = '<hr><h1>Reddit Filter Plus</h1><div id="rf_filters"></div><hr><input id="rf_addfilter" type="button" class="btn" value="add filter" /><input id="rf_savefilters" type="button" class="btn" value="save filters" /><span id="rf_savestatus" style="display: none">saved</span><br><a href="http://www.reddit.com/">return to main</a>';

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

rf_prefsAddFilter = function(titles, urls, users, subreddits, highlight, color) {
  var container = document.getElementById('rf_filters');
  var newFilter = document.createElement('div');
  var removeButton = document.createElement('input');

  newFilter.style.border = '1px solid black';
  newFilter.innerHTML = '<table class="content preftable">' +
      '<tr><th>title filters</th><td class="prefright"><input class="rf_titles" type="text" value="' + (titles ? titles : '') + '" /></td></tr>' +
      '<tr><th>url filters</th><td class="prefright"><input class="rf_urls" type="text" value="' + (urls ? urls : '') + '" /></td></tr>' +
      '<tr><th>user filters</th><td class="prefright"><input class="rf_users" type="text" value="' + (users ? users : '') + '" /></td></tr>' +
      '<tr><th>subreddit filters</th><td class="prefright"><input class="rf_subreddits" type="text" value="' + (subreddits ? subreddits : '') + '" /></td></tr>' +
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

rf_report = function(num) {
  var msg = num + ' headlines filtered';
  GM_log(msg);

  if (num > 0) {
    var div = document.createElement('div');
    div.innerHTML = '<p id="rf_report"><i>' + msg + ': <a id="rf_unhide" onClick="rf_unhide()">[unhide]</a><i></p>';
    
    var siteTable = document.getElementById('siteTable_organic');
    if (siteTable == null) siteTable = document.getElementById('siteTable');
    siteTable.parentNode.insertBefore(div, siteTable.nextSibling);
    document.getElementById('rf_unhide').addEventListener('click', rf_unhide, false);
  }
}

// do stuff
if (/\/prefs\//.test(window.location.href)) {
  rf_doPrefs();
} else if (/\/comments\//.test(window.location.href)) {
  rf_doCommentFilter();
} else {
  rf_doFilter();
}
