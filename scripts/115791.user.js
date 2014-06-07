// ==UserScript==
// @name           PeopleSoft Component Selector
// @namespace      http://userscripts.org/scripts/115791
// @description    Displays a quick jump menu to open any Peoplesoft Component in new window.
// @include        /^https?://.*/ps[cp]/[^\/]*/[^\/]*/[^\/]*/c/[^\/\.]*\.[^\/\.]*\.[^\?]*.*/
// @include        /^https?://.*/ps[cp]/[^\/]*/[^\/]*/[^\/]*/h/\?tab\=[^\/\.]*/
// @require        http://code.jquery.com/jquery-1.6.4.min.js
// @require        https://raw.github.com/danjenkins/Sticky/master/sticky.js
// @resource       sticky.css https://raw.github.com/danjenkins/Sticky/master/sticky.css
// @resource       close.png  https://raw.github.com/danjenkins/Sticky/master/close.png
// @version        1.0
// ==/UserScript==

// Array of Menu/Component/Markets/Descriptions of Peoplesoft "menuItem" objects
var menuItems = [];
menuItems.add = function(menu, component, market, descr) {
  var self = this;
  self.push({
    menu: menu,
    component: component,
    market: market,
    descr: descr,
    speedKey: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ".charCodeAt(self.length)
  });
  return self;
}

//        .../ps[c|p] /site     /portal   /node     /c /menuname   .component  .market
var urlRe = /(.*)\/(ps[cp])\/([^\/]*)\/([^\/]*)\/([^\/]*)\/c\/([^\/\.]*)\.([^\/\.]*)\.([^\?]*).*/gi;
var urlResult = urlRe.exec(window.location.href);

// if not component URL, check for homepage URL
if (!urlResult) {
  //        .../ps[c|p] /site     /portal   /node     /h /?tab=TABNAME
  urlRe = /(.*)\/(ps[cp])\/([^\/]*)\/([^\/]*)\/([^\/]*)\/h\/\?tab\=([^\/\.]*)/gi;
  urlResult = urlRe.exec(window.location.href);
}

// if url format recognised
if (urlResult) {
  // get url parts
  var baseURL = urlResult[1];
  var servlet = urlResult[2];
  var site = urlResult[3].replace(/\_\d+/ig,'');
  var portal = urlResult[4];
  var node = urlResult[5];

  // Set activation key. 223 = "`" (backquote).
  var activationKey = {
    'altKey'   : false,
    'ctrlKey'  : false,
    'shiftKey' : false,
    'which'    : 223
  };

  // Add Menu/Component/Markets/Description menuItems...
  menuItems
    .add('UTILITIES'                    , 'MESSAGE_CATALOG1'             , 'GBL', 'Message Catalogue'             )
    .add('MAINTAIN_SECURITY'            , 'ACCESS_CNTRL_LISTX'           , 'GBL', 'Permission Lists'              )
    .add('PROCESS_SCHEDULER'            , 'PRCSDEFN'                     , 'GBL', 'Process Definitions'           )
    .add('PROCESSMONITOR'               , 'PROCESSMONITOR'               , 'GBL', 'Process Monitor'               )
    .add('MAINTAIN_SECURITY'            , 'PSTREEMGRACC'                 , 'GBL', 'Query Access Manager'          )
    .add('QUERY_MANAGER'                , 'QUERY_MANAGER'                , 'GBL', 'Query Manager'                 )
    .add('REPORT_MANAGER'               , 'CONTENT_LIST'                 , 'GBL', 'Report Manager'                )
    .add('MAINTAIN_SECURITY'            , 'ROLEMAINT'                    , 'GBL', 'Roles'                         )
    .add('PORTAL_ADMIN'                 , 'PORTAL_OBJ_LIST'              , 'GBL', 'Structure and Content (Portal)')
    .add('UTILITIES'                    , 'PEOPLECODE_TRACE'             , 'GBL', 'Trace PeopleCode'              )
    .add('UTILITIES'                    , 'TRACE_SQL'                    , 'GBL', 'Trace SQL'                     )
    .add('UTILITIES'                    , 'URL_TABLE'                    , 'GBL', 'URLs'                          )
    .add('MAINTAIN_SECURITY'            , 'USERMAINT'                    , 'GBL', 'User Profiles'                 )
    .add('WEB_PROFILE'                  , 'WEB_PROFILE'                  , 'GBL', 'Web Profiles'                  )
    .add('XMLPUBLISHER'                 , 'PSXPRPTDEFN'                  , 'GBL', 'XMLP Report Definition'        )
  ;

  // build up menu
  var ul = $('<ul class="pscs-ul">');

  for (var i = 0; i < menuItems.length; i++) {
    // reconstruct urls for defined compoents
    var url = baseURL;
    url += '/psp';                       // force portal servlet
    url += '/' + site + '_newwin';       // force new window
    url += '/' + portal;
    url += '/' + node;
    url += '/c';
    url += '/' + menuItems[i].menu;
    url += '.' + menuItems[i].component;
    url += '.' + menuItems[i].market;

    var li = $('<li class="pscs-li"><a target="_blank" href="' + url + '">' + String.fromCharCode(menuItems[i].speedKey) + ' : ' + menuItems[i].descr + '</a></li>');
    $(li).attr('speedKey', menuItems[i].speedKey);
    $(ul).append(li);
  }

  var sticky_div = $('<div>').append('<div class="pscs-title">Select Component</div>').append(ul);
  sticky_div.hide().appendTo('head');

  // add sticky style
  var cssText = GM_getResourceText("sticky.css");
  GM_addStyle(cssText);

  // get image data
  var imgData = GM_getResourceURL("close.png");

  // add misc style
  GM_addStyle((<><![CDATA[
    div.sticky-queue {
      width: 300px;
      z-index: 99999;
    }
    .pscs-title {
      font-family: Arial,Helvetica,sans-serif;
      font-size: 16px;
      color: #003C79;
      padding-left: 10px;
    }
    .pscs-ul {
      list-style: none;
      padding: 10px;
      margin: 0;
      white-space: nowrap;
    }
    .pscs-li {
    }
    .pscs-li a, .pscs-li a:visited {
      font-family: Arial,Helvetica,sans-serif;
      font-size: 14px;
      color: #003C79;
      text-decoration: none;
    }
    .pscs-li a:hover {
      color: #CC6600;
      text-decoration: underline;
    }
  ]]></>).toString());

  var sticky_options = {
    'speed'       : 300,    // animations: fast, slow, or integer
    'duplicates'  : false,  // true or false
    'autoclose'   : 10000,  // integer or false
    'imagePath'   : imgData // data encoded image URL (imagePath option provided by danjenkins/Sticky)
  };

  $(document).keydown(function(e) {
    var s = $('.sticky:visible');

    if ( activationKey.altKey == e.altKey && activationKey.ctrlKey == e.ctrlKey && activationKey.shiftKey == e.shiftKey && activationKey.which == e.which ) {
      e.preventDefault();
      e.stopImmediatePropagation();

      // hide if already visible
      if ( $(s).size() ) {
        $(s).hide();
      }
      else {
        $(sticky_div).sticky(false, sticky_options);
      }
    }
    else {
      if ( $(s).size() ) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var lnk = $(s).find('li[speedKey="'+e.which+'"] a');
        if ( lnk.size() ) {
          click(lnk[0]);
          $(s).hide();
        }
      }
    }
  });
}

/* ===== Click on an element (borrowed from Facebook Fixer, @namespace http://userscripts.org/people/14536) ===== */
function click(elm) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
  elm.dispatchEvent(evt);
}