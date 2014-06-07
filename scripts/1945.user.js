/**
 * LiveJournal Better User Popup, by RustyDragon
 * Adds a useful popup box when you mouse is over a username,
 * including different user-related links and userpic
 *
 * Original ideas and code - "Livejournal userpic adder" by unknown
 * and "LiveJournal Useful User Popup" by Ryan Freebern.
 *
 * version 1.1
 * 26 sept 2006
 *
 * Changelog:
 * 1.1
 *  - Uses new lj:user tag for getting user name
 *  - user icons now are hrefs to profiles
 * 1.0
 *  - Uses new URL system
 *  - Shows "Tags" link for LJ users & communities
 * 0.8
 *  - Fixed compatibility with Greasemonkey 0.6.4
 *  - Font size in menus increased
 * 0.7
 *  - Input verification in settings screen
 * 0.6
 *  - Fixed link to User pics
 *  - Holding down CTRL key prevents popup from showing.
 *    Handy if you just want to open LJ of a user in new tab
 *  - Settings screen
 *  - Old popup is hidden before new one appears
 *  - Less overhead at startup, should be faster on slow machines
 *  - Code optimization
 * 0.5
 *  - Fixed bug which prevented from opening correct userinfo links
 * 0.4
 *  - OpenID support, w/o userpics yet
 *  - Popup delay added
 *  - Code refactoring & optimization
 *  - Options for _advanced_ users - see the code
 * 0.3
 *  - Finally users with no userpics are handled corectly
 *  - For users & communities their name is a link to journal
 *  - Nice image is shown when script is downloading userpis information
 *  - Internal fixes and improvements
 * 0.2
 *  - Not dislplaying anymore wrong userpics on slow connections
 *  - Correct handling of users that have no userpic defined
 *  - Userpics for communities are working again
 * 0.1
 *  - Initial release
 */

// ==UserScript==
// @name      LiveJournal Better User Popup
// @namespace   darklaw.ru
// @description   v1.1 (09/26/06) Adds a useful popup box when you mouse is over a username
// @version   1.1
// @include     http://*.livejournal.com/*
// @exclude     http://pics.livejournal.com/*
// ==/UserScript==



// Account types
const ACCOUNT_USER = 1;
const ACCOUNT_COMMUNITY = 2;
const ACCOUNT_SYNDICATE = 3;
const ACCOUNT_OPENID = 4;

// Special constants for usepics. Ugly, I know, but I can't stand against it.
const NO_USERPIC = '?NO_USERPIC?';
// userpic is loading
const LOADING_USERPIC = '?LOADING?';

// Text that is shown when no userpic is defined
const NO_USERPIC_TEXT = '';

// Controls where srcipt holds cache for userpics data.
// Persistent cache is much-much faster, but pollutes FF config with lots of entries
var optionPersistentCache = GM_getValue('options.PersistentCache', false);

// Read the name 0-)
var optionPopupDelay = GM_getValue('options.PopupDelay', 500);

// Opacity for popup menu
var optionOpacity = GM_getValue('options.PopupOpacity', '1.0');

// Cache for session data
// Not used if persistent cache
var userdata_cache = new Array();

// Cache for session data
// Not used if persistent cache
//var usertitle_cache = new Array();

// For too fast connections, stores [username] => [text to show]
var textArray = new Array();

// Timer reference
var timer = null;


// Kinda slow, need to think about. Should  I add it only after popup is shown?
document.addEventListener('mousemove', checkPopup, false);


//Add listeners
//TODO: Handle all links?
var nodes = document.evaluate('//span[@class="ljuser"]', document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
for (var n = 0; n < nodes.snapshotLength; ++n) {
  var span = nodes.snapshotItem(n);
  span.addEventListener('mouseover', mouseover, false);
}

function mouseover(ev) {

  if (ev.ctrlKey) {
    return;
  }
  var pos = findPos(this);

  var userName = this.getAttribute("lj:user");
  var userID = userName;
  var userHomepage = '';
  // Used for OpenID only

  var account = 0;

  if (this.innerHTML.indexOf("userinfo.gif") > 0) {
    account = ACCOUNT_USER;
  } else if (this.innerHTML.indexOf("community.gif") > 0) {
    account = ACCOUNT_COMMUNITY;
  } else if (this.innerHTML.indexOf("syndicated.gif") > 0) {
    account = ACCOUNT_SYNDICATE;
  } else if (this.innerHTML.indexOf("openid-profile.gif") > 0) {
    account = ACCOUNT_OPENID;
    this.innerHTML.match(/bml\?userid=(\d*)&/);
    userID = RegExp.$1;

    this.innerHTML.match(/<\/a><a href="(.*?)" rel="nofollow"/);
    userHomepage = RegExp.$1;
  }

  if (account == 0) { //Unknown account type
    GM_log('Unknown account type: ' + this.innerHTML);
    return;
  }


  // We need this for speed and for avoiding auto-closing tags
  var popupText = '';
  // ID of userpic span
  var spanID = getUserPicSpanID(userID, account);

  textArray[spanID] = LOADING;

  // We show popup after delay
  timer = window.setTimeout(function() {
    var div = document.createElement('div');
    div.id = 'lj_userpopup';
    div.style.cssText = 'border: 1px black solid; padding: 10px; background: Cornsilk; color: Black; position: absolute; z-index: 2001; left: ' +
                        (pos[0] - 11) + 'px; top: ' + (pos[1] - 11) + 'px; text-align: left;-moz-opacity:' +
                        optionOpacity + ';';
    div.innerHTML = popupText;
    var oldPopup = document.getElementById('lj_userpopup');
    if (oldPopup) {
      oldPopup.parentNode.removeChild(oldPopup);
    }
    document.body.appendChild(div);

    // We need this because loadUserData might end before we got here
    //setTextTitleSpan(getUserTitleSpanID(userID, account), getUserTitle(userID));
    setTextImageSpan(spanID, textArray[spanID]);
    clearTimer();
  }, optionPopupDelay);

  // Async load userpic. Should be called ASAP
  loadUserData(userID, account);

  var mainPopupSpanHTML = '<span style="float:left" id="lj_userpopup_main">';
  var profileAHREF;
  if (account == ACCOUNT_USER) {
    profileAHREF = '<a href="http://' + userID + '.livejournal.com/profile?mode=full">';
    popupText = profileAHREF + '<img src="http://stat.livejournal.com/img/userinfo.gif" alt="[?]" style="border: 0pt none; vertical-align: bottom;" height="17" width="17"></a>';
    popupText += '<b><a href="http://' + userID + '.livejournal.com/">' + userName + '</a></b><br/>';
    popupText += mainPopupSpanHTML;
    popupText += '&raquo; ' + profileAHREF + 'User Info</a><br/>';
    popupText += '&raquo; <a href="http://www.livejournal.com/allpics.bml?user=' + userID + '">User Pics</a><br/>';
    popupText += '&raquo; <a href="http://' + userID + '.livejournal.com/calendar">Archive</a><br/>';
    popupText += '&raquo; <a href="http://' + userID + '.livejournal.com/friends">Friends</a><br/>';
    popupText += '&raquo; <a href="http://' + userID + '.livejournal.com/tag">Tags</a><br/>';
    popupText += '&raquo; <a href="http://www.livejournal.com/tools/memories.bml?user=' + userID + '">Memories</a>';
    popupText += '</span>';
    popupText += '<span id="' + getUserPicSpanID(userID, account) + '" style="margin-left:10px">' + LOADING + '</span>';
  } else if (account == ACCOUNT_COMMUNITY) {
    profileAHREF = '<a href="http://community.livejournal.com/' + userID + '/profile?mode=full">';
    popupText = profileAHREF + '<img src="http://stat.livejournal.com/img/community.gif" alt="[?]" style="border: none; vertical-align: bottom;" height="17" width="17"></a>';
    popupText += '<b><a href="http://community.livejournal.com/' + userID + '">' + userName + '</a></b><br/>';
    popupText += mainPopupSpanHTML;
    popupText += '&raquo;' + profileAHREF + 'User Info</a><br/>';
    popupText += '&raquo; <a href="http://www.livejournal.com/allpics.bml?user=' + userID + '">User Pics</a><br/>';
    popupText += '&raquo; <a href="http://community.livejournal.com/' + userID + '/calendar">Archive</a><br/>';
    popupText += '&raquo; <a href="http://community.livejournal.com/' + userID + '/friends">Friends</a><br/>';
    popupText += '&raquo; <a href="http://community.livejournal.com/' + userID + '/tag/">Tags</a><br/>';
    popupText += '&raquo; <a href="http://www.livejournal.com/tools/memories.bml?user=' + userID + '">Memories</a>';
    popupText += '</span>';
    popupText += '<span id="' + getUserPicSpanID(userID, account) + '" style="margin-left:10px">' + LOADING + '</span>';
  } else if (account == ACCOUNT_SYNDICATE) {
    profileAHREF = '<a href="http://syndicated.livejournal.com/' + userID + '/profile?mode=full">';
    popupText = profileAHREF + '<img src="http://stat.livejournal.com/img/syndicated.gif" alt="[?]" style="border: none; vertical-align: bottom;" height="17" width="17"></a>';
    popupText += '<b><a href="http://syndicated.livejournal.com/' + userID + '">' + userName + '</a></b><br/>';
    popupText += mainPopupSpanHTML;
    popupText += '&raquo; ' + profileAHREF + 'User Info</a><br/>';
    popupText += '</span>';
  } else if (account == ACCOUNT_OPENID) {
    popupText = '<img src="http://stat.livejournal.com/img/openid-profile.gif" alt="[?]" style="border: none; vertical-align: bottom;" height="16" width="16">';
    popupText += '<b><a href="' + userHomepage + '">' + userName + '</a></b><br/>';
    popupText += mainPopupSpanHTML;
    popupText += '&raquo; <a href="http://www.livejournal.com/userinfo.bml?userid=' + userID +
                 '&t=I">User Info</a><br/>';
    popupText += '</span>';
  }
}

function loadUserData(user, account) {
  spanID = getUserPicSpanID(user, account);
  if (account >= ACCOUNT_SYNDICATE) { // We do not load for these
    return;
  }
  // make the xmlhttprequest and create the object once it returns

  // url of the rss feed
  var rssUrl;
  if (account == ACCOUNT_USER) {
    rssUrl = 'http://www.livejournal.com/users/' + user + '/data/rss';
  } else if (account == ACCOUNT_COMMUNITY) {
    rssUrl = 'http://www.livejournal.com/community/' + user + '/data/rss';
  } else {
    return;
  }


  if (getUserPic(user) == undefined) {
    setUserPic(user, LOADING_USERPIC);
    // marks entry as being loaded
    GM_xmlhttpRequest({
      method: 'GET',
      url: rssUrl,
      headers: {'User-Agent': 'betteruserpopup greasemonkey script (rustydragon18@yahoo.com)'},
      onerror:function (res) {
        GM_log('onerror' + res);
      },
      onload: function (res) {
        var parser;
        if (typeof(XPCNativeWrapper) == "function") {
          var dp = new XPCNativeWrapper(window, "DOMParser()");
          parser = new dp.DOMParser();
        } else {
          return;
        }
        var dom = parser.parseFromString(res.responseText, "text/xml");

        var imageNode = xpath('//image', dom);
        if (imageNode.length == 0) { // No user picture
          setUserPic(user, NO_USERPIC)
          setTextImageSpan(spanID, NO_USERPIC_TEXT);
          return;
        }

/*        var titleNodes = xpath('//title/text()', dom);
        var title = titleNodes[0].nodeValue;
        setUserTitle(user, title);
        setTextTitleSpan(getUserTitleSpanID(user, account), title);
*/

        var nodes = xpath('//image/url/text()', dom);
        var imageLink = nodes[0].nodeValue;

        //Store only minimum
        imageLink.match(/userpic\/(.*)$/);
        var userPic = RegExp.$1;
        setUserPic(user, userPic);

        //var img = new Image();
        var tmp = new XPCNativeWrapper(window, "Image()");
        var img = new tmp.Image();
        img.onload = function() {
          setTextImageSpan(spanID, getUserpicHTML(imageLink));
        };
        img.src = imageLink;
        return;
        // found it, time to quit
      }
    });
  } else if (getUserPic(user) != LOADING_USERPIC) { // Load from cache, null indicates that load in the process
//    setTextTitleSpan(getUserTitleSpanID(user, account), getUserTitle(user));
    var cachedUserPic = getUserPic(user);
    if (cachedUserPic == NO_USERPIC) {
      setTextImageSpan(spanID, NO_USERPIC_TEXT);
      return;
    }
    var tmp = new XPCNativeWrapper(window, "Image()");
    var img = new tmp.Image();
    var imageLink = "http://www.livejournal.com/userpic/" + cachedUserPic;
    img.onload = function() {
      setTextImageSpan(spanID, getUserpicHTML(imageLink));
    };
    img.src = imageLink;
  } else { // Userpic is loading
  }
}


/*function setUserTitle(user, value) {
  if (optionPersistentCache) {
    GM_setValue('title.' + user, value);
  } else {
    usertitle_cache[user] = value;
  }
}

function getUserTitle(user) {
  var val;
  if (optionPersistentCache) {
    val = GM_getValue('title.' + user, undefined);
  } else {
    val = usertitle_cache[user];
  }
  if (val==undefined){
    return "&nbsp;";
  }else{
    return val;
  }

}
*/
function setUserPic(user, value) {
  if (optionPersistentCache) {
    GM_setValue('user.' + user, value);
  } else {
    userdata_cache[user] = value;
  }
}

function getUserPic(user) {
  if (optionPersistentCache) {
    return GM_getValue('user.' + user, undefined);
  } else {
    return userdata_cache[user];
  }
}

function setTextImageSpan(spanID, text) {
  // We need this since span might not be added to the document by the moment.
  textArray[spanID] = text;

  var spanImg = document.getElementById(spanID);
  if (spanImg) {
    spanImg.innerHTML = text;
  }
}

/*function setTextTitleSpan(spanID, text) {
  var spanTitle = document.getElementById(spanID);
  if (spanTitle && spanTitle != undefined) {
    spanTitle.innerHTML = "<i>"+text+"</i>";
  }
}
*/
function getUserpicHTML(imageURL) {
  return '<img src="' + imageURL + '" style="border: 1px gray solid;" alt="UserPic"/>';

}

function getUserPicSpanID(user, account) {
  return 'lj_userpopup_img_' + account + user;
}

/*function getUserTitleSpanID(user, account) {
  return 'lj_userpopup_title_' + account + user;
}
*/

function newLJUser(userID, userName, userHomepage, accountType) {
  var img = 'userinfo';
  if (accountType == ACCOUNT_COMMUNITY) {
    img = 'community';
  } else if (accountType == ACCOUNT_SYNDICATE) {
    img = 'syndicated';
  } else if (accountType == ACCOUNT_OPENID) {
    img = 'openid-profile';
  }

  var base = '<div style="display: inline;" id="' + userID + 'popup" userID="' + userID + '" userName="' + userName +
             '" userHomepage="' + userHomepage + '" account="' + accountType + '"><a href="#">';
  base += '<img src="http://stat.livejournal.com/img/' + img +
          '.gif" alt="[?]" style="border: none; vertical-align: bottom; text-decoration: none;" ';
  if (accountType == ACCOUNT_OPENID) {
    base += 'height="16" width="16">';
  } else {
    base += 'height="17" width="17">';
  }

  base += '</a><a href="#"><b>' + userName + '</b></a></div>';

  return base;
}


function checkPopup(ev) {
  // Think about caching this div - should improve speed
  var div = document.getElementById('lj_userpopup');
  if (div) {
    pos = findPos(div);
    var thisWidth = pos[0] + div.offsetWidth;
    var thisHeight = pos[1] + div.offsetHeight;
    if (((ev.pageX <= pos[0] + 1) || (ev.pageX >= thisWidth - 1)) ||
        ((ev.pageY <= pos[1] + 1) || (ev.pageY >= thisHeight - 1))) {
      clearTimer();
      div.parentNode.removeChild(div);
    }
  }
  return true;
}

function clearTimer()
{
  if (timer != null)
  {
    clearTimeout(timer);
    timer = null;
  }
}

function xpath(expr, doc) {
  if (!doc) {
    doc = document;
  }
  var nodes = doc.evaluate(expr, doc, null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);
  var ret = [];
  for (var n = 0; n < nodes.snapshotLength; ++n) {
    ret.push(nodes.snapshotItem(n));
  }
  return ret;
}


function findPos(obj) {
  var x = 0, y = 0;
  while (obj.offsetParent) {
    x += obj.offsetLeft;
    y += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return [x,y];
}

const LOADING = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t' +
                '3d3bu7u6qqqpmZmYiIiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR' +
                'AAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F' +
                'VFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGs' +
                'CjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAK' +
                'dgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAA' +
                'AAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBC' +
                'AoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAA' +
                'AAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+Fo' +
                'gNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAA' +
                'LAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMgg' +
                'NZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkE' +
                'BQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjF' +
                'SAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO' +
                '0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5l' +
                'UiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkE' +
                'BQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjA' +
                'CYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEA' +
                'IfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKO' +
                'DK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIh' +
                'ACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFM' +
                'ogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4Obwsi' +
                'dEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgY' +
                'ETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZ' +
                'MAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRk' +
                'IoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVM' +
                'IgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUK' +
                'jkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQH' +
                'fySDhGYQdDWGQyUhADs="> Loading...';

GM_registerMenuCommand(
        'LJ Better Popup - Settings',
        function () {
          var oldPopup = document.getElementById('lj_userpopup_settings');
          if (oldPopup) {
            return;
          }

          var div = document.createElement('div');
          div.id = 'lj_userpopup_settings';
          div.style.cssText = getSettingsFormCSS(10, 200);
          div.innerHTML = '<table border="0" cellpadding="1" cellspacing="2"><tr><th colspan=2 align=center>LJ Better Popup Settings</th></tr><tr>' +
                          '<td><label for="lj_popup_cache">Cache type (EXPERIMENTAL!):</label></td>' +
                          '<td valign="bottom"><select name="lj_popup_persistentcache" id="lj_popup_cache"><option value="0">Normal cache</option><option value="1">Persistent cache</option></select></td>' +
                          '</tr><tr>' +
                          '<td><label for="lj_popup_popupdelay">Delay before showing popup (In 1/1000 of second):</label></td>' +
                          '<td valign="bottom"><input type="text" name="lj_popup_popupdelay" id="lj_popup_popupdelay" value="' +
                          optionPopupDelay + '"/></td>' +
                          '</tr><tr>' +
                          '<td><label for="lj_popup_popupopacity">Opacity for popup (0.0 - 1.0):</label></td>' +
                          '<td valign="bottom"><input type="text" name="lj_popup_popupopacity" id="lj_popup_popupopacity" value="' +
                          optionOpacity + '"/><br/></td>' +
                          '</tr><tr>' +
                          '<td align="center"><button type="button" id="lj_popup_save">Save settings</button></td>' +
                          '<td align="center"><button type="button" id="lj_popup_cancel">Cancel</button></td></tr></table>';

          document.body.appendChild(div);


          div.style.cssText = getSettingsFormCSS(window.scrollX + Math.floor((window.innerWidth - div.clientWidth) / 2),
                  window.scrollY + Math.floor((window.innerHeight - div.clientHeight) / 3));

          var button = document.getElementById('lj_popup_save');
          button.addEventListener('click', settingsSave, false);

          button = document.getElementById('lj_popup_cancel');
          button.addEventListener('click', settingsCancel, false);
        }
        );

function getSettingsFormCSS(left, top) {
  return 'z-index: 99; border: thin dashed Navy; padding: 6px; background: #98FB98; color: Black; position: absolute; z-index: 2001; left: ' +
         left + 'px; top: ' + top + 'px; text-align: left;';
}

function settingsSave(ev) {
  optionPersistentCache = document.getElementById('lj_popup_cache').value == 1;
  GM_setValue('options.PersistentCache', optionPersistentCache);

  var tmp = parseInt(document.getElementById('lj_popup_popupdelay').value);
  if (!isNaN(tmp)) {
    optionPopupDelay = tmp;
    GM_setValue('options.PopupDelay', optionPopupDelay.toString());
  }
  tmp = parseFloat(document.getElementById('lj_popup_popupopacity').value);

  if (!isNaN(tmp)) {
    optionOpacity = tmp;
    GM_setValue('options.PopupOpacity', optionOpacity.toString());
  }

  closeSettings();
}

function settingsCancel(ev) {
  closeSettings();
}

function closeSettings() {
  var settingsDiv = document.getElementById('lj_userpopup_settings');
  if (settingsDiv) {
    settingsDiv.parentNode.removeChild(settingsDiv);
  }
}

