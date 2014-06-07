// ==UserScript==
// @name           Acvariu.ro - Enhancement Suite
// @namespace      @viulian
// @include        http://acvariu.ro/forum/*
// @include        http://www.acvariu.ro/forum/*
// @description    1. Shows a link "My Stats" (to the left of "My Profile") which links to your own "User View" page.\n2. If images are embedded into posts that are bigger than 1024px, it shrinks them to 1024px\n3. Avatar resize.\n4. Time Zone adjustments.\n5. Google Search limited to site:acvariu.ro/forum
// @author         viulian
// @version        1.0.8
// @downloadURL    https://userscripts.org/scripts/source/127021.user.js
// @updateURL      https://userscripts.org/scripts/source/127021.meta.js
// @license        GPL v2
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

// Regex to match the user id from the standard profile edit link.
// http://www.acvariu.ro/forum/user/edit/2822.page

var userIdRegex = /.*\/(\d+).page/g;

window.addEventListener ("load", Greasemonkey_main, false);

function Greasemonkey_main () {

addProfileStatsLink();
fixHugeImages();
fixTimezone();
addForumGoogleSearch();

}

/*
 * Fixes timezone. Uses Firefox preferences.
 */ 
function fixTimezone() { 

  var newTimeAdjust = "<span style='font-size: 11px;'> • Time adjust: ";
  newTimeAdjust += "<a id='timeid_0' href='#'>-2h</a> ";
  newTimeAdjust += "<a id='timeid_1' href='#'>-1h</a> ";
  newTimeAdjust += "<a id='timeid_2' href='#'>0</a> ";
  newTimeAdjust += "<a id='timeid_3' href='#'>+1h</a> ";
  newTimeAdjust += "<a id='timeid_4' href='#'>+2h</a></span>";

  // • Time adjust: </span><select><option value="0">0h</option></select>
  // • Time adjust: -2 -1 0 +1 +2
  unsafeWindow.console.log('tz');

  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i ++) {
    var span = spans[i];
    if (span.getAttribute("class") == 'boardtitle') {
      var newcontent = document.createElement('span');
      newcontent.innerHTML = newTimeAdjust;
      
      span.parentNode.appendChild(newcontent);
    }
  }
  
  // add event listeners
  for(var i = 0; i < 5; i++) {
    document.getElementById('timeid_' + i).onclick = (function() {
      var adjust = -2 + i;
      return function() {     
          // Do not call GM_setValue from unsafeWindow
          GM_setValue('TZA', adjust);
          window.location.reload();
      }
    })();
  }    

  // Retrieve preferences:
  var adjust = GM_getValue('TZA', '0');
  fixTimezone_Helper(adjust);
}

function fixTimezone_Helper(adjust) {
  findAndReplace(adjust, document.body);  
}

// Adaptation of: http://james.padolsey.com/demos/misc/findAndReplace/findreplace.js
function findAndReplace(adjust, searchNode) {
    
    var regex = /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/mg;

    var childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];

        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(adjust, currentNode);
        }

        var match = regex.exec(currentNode.data);     
        if (currentNode.nodeType !== 3 || !match ) {
            continue;
        }
        // found date
        var date = new Date(match[3], match[2] - 1, match[1], match[4], match[5], match[6], 0);
        // adjust
        var date = new Date(date.getTime() + 3600000 * adjust);
        // unsafeWindow.console.log(adjust + ' ' + date);
        var newVal = pad(date.getDate()) + '/' + pad(date.getMonth() + 1) + '/' + pad(1900 + date.getYear(), 4) + ' ';
        newVal += pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + ' ';
        // unsafeWindow.console.log(newVal);
        currentNode.data = currentNode.data.replace(regex, newVal);
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data, 
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}

/*
 * 6 -> "06"
 */ 
function pad(n, width) {
  if (!width) { width = 2}; 
  return ("0" + n).slice(-width);
}

/*
 * Fixes images that are too big and break navigation.
 */
function fixHugeImages() {
  withJQuery(function($) {
      // grab all IMG tags from the body and set their width to 1024
      $('.postbody img[alt="image"]').each(function(index) {
        // If image is too large (> 1024px) then make it 1024
        if ($(this).width() > 1024) {
          $(this).width("1024px");
        }
      });
      // grab all IMG avatar tags and set their maximum width to 120px
      $('img[alt="[Avatar]"]').each(function(index) {
        // If image is too large (> 120px) then make it 120
        if ($(this).width() > 120) {
          $(this).width("120px");
        }
      });
  });
}

/*
 * Helper method to run func with $ context of jQuery.
 */
function withJQuery(func) {
  if (!unsafeWindow.jQuery) {
    return;
  }
  
  func(unsafeWindow.jQuery);
}

/*
 * Adds "My Stats" link.
 */
function addProfileStatsLink() {
  // a href with profile edit link
  var myProfileA = document.getElementById('myprofile');
  
  // not logged in ?
  if (!myProfileA) {
    return;
  }

  var match = userIdRegex.exec(myProfileA.href);
  var userId = match[1];  // 2822
  
  if (!userId) {
    return;
  }
  
  // create My Stats link
  var myStatsA = document.createElement('a');
  myStatsA.setAttribute('href', 'http://www.acvariu.ro/forum/user/profile/' + userId + '.page');
  myStatsA.appendChild(document.createTextNode('My Stats'));
  
  // Add it to the left of "My Profile" link
  myProfileA.parentNode.insertBefore(myStatsA, myProfileA);
  myProfileA.parentNode.insertBefore(document.createTextNode(' / '), myProfileA);
}

function addForumGoogleSearch() {

  // UI to be added
  var guglSearch = '<span style="font-size: 11px;"> • Google Search: </span>';
  guglSearch += '<input id="guglSearchCrit" type="text" title="Limited to site:acvariu.ro/forum"/>';
  guglSearch += ' <input id="guglSearchAction" type="button" value="Search"/>';

  // insert UI somewhere
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i ++) {
    var span = spans[i];
    if (span.getAttribute("class") == 'boardtitle') {
      var newcontent = document.createElement('span');
      newcontent.innerHTML = guglSearch;
      
      span.parentNode.appendChild(newcontent);
    }
  }
  
  var guglSearchFunc = function() { 
      var query = 'site:acvariu.ro/forum ';
      query += document.getElementById('guglSearchCrit').value;
      query = encodeURIComponent(query);
      
      window.open('http://www.google.com/search?output=search#hl=ro&sclient=psy-ab&q=' + query + '&oq=' + query, '_blank', '');
  };
  
  // add events
  document.getElementById('guglSearchAction').onclick = (function() {
    // define vars here to be used if needed in the click handler below
    return guglSearchFunc;
  })();
  
  document.getElementById('guglSearchCrit').onkeypress = function(e) {
    if (e.keyCode == 13) {
      guglSearchFunc();
    }
  };
}