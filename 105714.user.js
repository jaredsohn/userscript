// ==UserScript==
// @name           CyclicAutoReloader
// @namespace      http://d.hatena.ne.jp/k2jp/
// @id             CyclicAutoReloader@k2jp
// @description    Reload specific pages cyclically.
// @version        0.4.10
// @author         k2jp
// @require        https://gist.github.com/azu/434406/raw/3cd10875724c2d0fd4c3567a18c6087cc7161f8a/wedata.js
// @contributer    azu <https://gist.github.com/434406>
// @description    Reload pages cyclically
// @match          *://*/*
// @exclude        about:blank
// @grant          GM_log
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue 
// @grant          GM_xmlhttpRequest
// @homepage       http://userscripts.org/scripts/show/105714
// @icon           http://www.st-hatena.com/users/k2/k2jp/profile.gif
// ==/UserScript==
// ChangeLog
//              0.4.10: Fixed missing PATH for match in the Metadata block 
//              0.4.9: Use match metadata instead of include for better scheme support.
//              0.4.8: Better line break for Automatic Semicolon Insertion(ASI).
//              0.4.7: Use quoted string for json-like data.
//              0.4.6: Use double-quote instead of single one.
//              0.4.5: Eliminated comments inside SITEINFO.
//              0.4.4: Use var instead of const.
//                     Use document instead of window.
//                     Use reload(true) instead of reload().
//              0.4.3: Updated URL in "require" Metadata block.
//              0.4.2: Added @grant metadata.
//              0.4.1: Changed anonymous function into callback in the first setTimeout arguments.
//              0.4  : Switched "new Date().getTime()" to "Date.now()".
//              0.3  : Added missing semicolon.
//              0.2  : if-condition adjustment.
//              0.1  : Initial Release.
//                     (Successor of "Page Reloader with Presets": http://userscripts.org/scripts/show/103760).
(function(){
  // Not shared private rules
  var SITEINFO = [  {
                      "url":        "^http://finance\.example\.com/$",
                      "nextMinute": "10",
                      "nextHour":   "0",
                      "exampleUrl": "http://finance.example.com/"
                    },{
                      "url":        "^http://www\.example\.com/",
                      "nextMinute": "30",
                      "nextHour":   "0",
                      "exampleUrl": "http://www.example.com/path"
                    }
  ];

  var database = new Wedata.Database('http://wedata.net/databases/CyclicAutoReloader/items.json');
  if(!database){
    GM_log('[ERROR]new Wedata.Database failed!');
    return;
  }
  
  // clear cache
  GM_registerMenuCommand( 'CyclicAutoReloader - clear cache', function() {database.clearCache();} );

  var CyclicAutoReload = function(confData){
//GM_log('[DEBUG]'+confData.exampleUrl);
//GM_log('[DEBUG]'+confData.url+location.href+new RegExp(confData.url.trim()).test(location.href));
    var targetMinute, targetHour, targetTime;
    if( confData &&
        ('url' in confData) &&
        new RegExp(confData.url.trim()).test(location.href) &&
        ('nextMinute' in confData) &&
        (0 <= (targetMinute = parseInt(confData.nextMinute.trim(), 10))) &&
        ('nextHour' in confData) &&
        (0 <= (targetHour = parseInt(confData.nextHour.trim(), 10))) &&
        !((targetMinute === 0) &&
        (targetHour === 0)) ){

      // Calculate difference
      targetTime = new Date();
      if(targetMinute === 0){
        targetTime.setMinutes(targetHour*60, 0, 0);
      }else{
        targetTime.setMinutes( targetTime.getMinutes() + targetMinute - (targetTime.getMinutes()%targetMinute) + (targetHour*60), 0, 0 );
      }
//GM_log('[DEBUG]'+targetTime.getTime() - Date.now());
      setTimeout( function(){document.location.reload(true);}, targetTime.getTime() - Date.now() );
    }
  };

  // for shared SITEINFO
  database.get(function(items) {
//GM_log('[DEBUG]HIT!');
    items.forEach( function(item){CyclicAutoReload(item.data);} );
  });

  // for local private SITEINFO
//GM_log('[DEBUG]'+SITEINFO.length);
  SITEINFO && (SITEINFO.length > 0) && SITEINFO.forEach(CyclicAutoReload);

}) ();