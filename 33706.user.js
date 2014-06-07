// ==UserScript==
// @name          RS_LinkCheck
// @namespace     http://gmscripts.bigsleep.net
// @description   Rapidshare link checker / parser
// @version       2.3
// @timestamp     1205843190562
// @homepage      http://userscripts.org/scripts/show/13709
// @include       http://*
// @exclude       http://rapidshare.tld/*
// @exclude       http://*.rapidshare.tld/*
// @exclude       http://lix.in/*
// @exclude       http://www.rapidsafe.net/*
// ==/UserScript==

/* -- Pause message -
   When number of links on page exceed the limit
   The link check limit helps prevent being blocked
   - do not remove the <link_limit> or <check_key> place-holders
*/
var lc_pMessage = "Over <link_limit> links, Press '<check_key>' again";

/* -- Preferences --
    limit: Link check limit
    - A number between 50 - 150 should work
    delay: milliseconds
    - delay time between each link check - in milliseconds
    Activation Keys - upper case letter requires shift
    check: linkify and check links
    linky: linkify text URLs only (create links)
    select: open selected text URL in new tab
    accel: accelerator keys (true or false)
    - altKey, ctrlKey, metaKey, shiftKey (to force shift)
    debug: enable writing of debugging messages to the JavaScript Error Console
*/
var lc_Prefs = {
  limit: 100,
  delay: 100,
  check: "R",
  linky: "A",
  select: "S",
  accel: {
      altKey: false,
      ctrlKey: false,
      metaKey: false
    },
  // Link and Link Info Box Styles
  styles: [ "/* RS_LinkCheck styles */",
      "A.rs_linkcheck_good:after { content: '+';",
      "  color: green; background-color: white; }",
      "A.rs_linkcheck_bad:after { content: '?';",
      "  color: gray; background-color: ivory; }",
      "A.rs_linkcheck_dupe:after { content: '*';",
      "  color: blue; background-color: ivory; }",
      "/* For newly linked */",
      "SPAN.rs_linkcheck_linked A:after { background-color: beige; }",
      "/* The links, good, bad info box */",
      "#rs_linkcheck_info {",
      "  font-size: 8pt; min-width: 18em; text-align: center;",
      "  position: fixed; right: 1em; bottom: 1em; z-index: 90;",
      "  color: black; background-color: white; opacity: 0.7;",
      "  /*border: solid 1px gray;*/",
      " }",
    ], // end of styles
  debug: false,
}; // end of prefs

/* Nothing interesting down here */

// prepare for launch
lc_getPreferences(lc_Prefs);
lc_pMessage = lc_pMessage.replace("<link_limit>", lc_Prefs.limit);
// convert keys to char code, if not already
lc_charToCode(lc_Prefs);
lc_pMessage = lc_pMessage.replace("<check_key>", String.fromCharCode(lc_Prefs.check));
// Create the elements
var helplink = document.createElement('link');
helplink.rel = "RS_LinkCheck";
helplink.href = "http://userscripts.org/scripts/show/13709";
helplink.title = "RS_LinkCheck v2.3 - home page";
document.getElementsByTagName('head').item(0).appendChild(helplink);
var infolink = document.createElement('link');
infolink.rel = "RS_LinkCheck";
infolink.id = "rs_linkcheck_checked";
infolink.href = location.href;
var infobox = document.createElement('div');
infobox.id = "rs_linkcheck_info";
infobox.title = "RS_LinkCheck link checking status";
// Need these Globals for async functions
var rsURLs = new Array();
var goodURLs = new Array();
var badURLs = new Array();
var rsfURLs = new Array();
var lxURLs = new Array();
var lcMAX = lc_Prefs.limit;
var lcDelay = 0;

/* Key event handler stuff */

lc_StartChecks = {
  handleEvent: function(kyd){
      // wrong key(s)
      if(kyd.charCode == 0) return;
      // debug info to log
      logit("key event target node:"+kyd.target.nodeName);
      // ignore form inputs
      if(/^(textarea|input|button)$/i .test(kyd.target.nodeName)) return;
      // check modifier keys
      for(var meta in lc_Prefs.accel){
        if(lc_Prefs.accel[meta] != kyd[meta]) return;
      }
      logit("Key charCode: "+kyd.charCode);
      // Test key press
      switch(kyd.charCode){
        case lc_Prefs.select:
          kyd.stopPropagation();
          this.openSelectionInTab( window.getSelection() );
          return; // stop script
        case lc_Prefs.linky:
          kyd.stopPropagation();
          this.addStyle();
          lc_Linkify();
        default:
          return; // stop if linky or no match
        case lc_Prefs.check:
          kyd.stopPropagation();
          this.addStyle();
      }
      if(lcMAX == lc_Prefs.limit){
        // run all functions
        lc_Linkify();
        lc_GetRSafeLinks();
        lc_GetLixLinks();
      }else if(lcMAX < 1){
        // check again at 0
        lcMAX = lc_Prefs.limit;
        lcDelay = 0;
      }else{
        return; // dont check again
      }
      lc_CheckRSLinks();
    },
  // get selection and try to open in tab
  openSelectionInTab: function(Obj){
      if(Obj.isCollapsed) return;
      var sel = Obj.toString().replace(/\s+/g, "");
      if(GM_openInTab && sel != ""){
        GM_openInTab(sel);
      }
    },
  addStyle: function(){
      // So it does not add styles twice
      if(document.getElementById('rs_linkcheck_styles')) return;
      // Make it readable with line breaks
      US_addStyleTag("\n" + lc_Prefs.styles.join("\n") + "\n")
          .id = "rs_linkcheck_styles";
    }
}

// Capture activation key
document.addEventListener("keypress", lc_StartChecks, true);

/* Link checking */

function lc_CheckRSLinks(){
  var rslinks = document.evaluate(
      "//a[contains(translate(@href, 'RAPIDSHE', 'rapidshe'), 'rapidshare.')]",
      document, null, 6, null);
  if(rslinks.snapshotLength == 0) return;
  for(var i=0, alink; i < rslinks.snapshotLength; i++){
    alink = rslinks.snapshotItem(i);
    // reduce to base filename...
    alink.href = alink.href
        .replace(/(http:\/\/)\w+\.(rapidshare\.\w+\/files\/\d+\/)(\d+\/)?\b/i, "$1$2");
    // remove redirects
    alink.href = alink.href.replace(/.+\?(http:\/\/rapidshare\..+)/i, "$1");
    if( /^http:\/\/rapidshare\.(de|com)\/files\/.+/i .test(alink.href) ){
      if(lc_FindDupe(alink.href, rsURLs)){
        lc_SetClassDupe(alink);
        continue;
      }
      if(lcMAX < 1){
        break;
      }
      lcMAX--;
      rsURLs.push(alink.href);
      setTimeout(lc_head, lcDelay, alink.href, lc_CheckStatus, alink);
      lcDelay += lc_Prefs.delay;
    }
  }
  // add info elements
  infolink.title = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  infobox.textContent = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  if(!document.getElementById('rs_linkcheck_checked')){
    document.getElementsByTagName('head').item(0).appendChild(infolink);
    document.body.appendChild(infobox);
  }
  // if limit hit add message
  if(lcMAX < 1){
    infobox.insertBefore(document.createTextNode(lc_pMessage), infobox.lastChild);
    infobox.insertBefore(document.createElement('br'), infobox.lastChild);
  }
}

function lc_CheckStatus(response, url, node){
  if(response.readyState == 4){
    logit("URL: "+ url +", status: "+ response.status +" "+ response.statusText
        +", responseText length: "+ response.responseText.length);
    if(response.status < 400){
      if(/\bContent-Type:\s+text\/html/ .test(response.responseHeaders)){
        badURLs.push(url);
        if(node) lc_SetClassBad(node);
      }else if(/\bContent-Type:\s+\w+/ .test(response.responseHeaders)){
        logit("Content-Type is not html");
        var filesize = response.responseHeaders.match(/\sContent-Length:\s+(\d+)/)[1];
        filesize = filesize.replace(/(\d+)(\d\d\d\d\d\d)$/,"$1" + "," + "$2");
        goodURLs.push(url);
        if(node) lc_SetClassGood(node, filesize);
      }
    }
    return true;
  }
}

function lc_head(url, cb, node) {
  GM_xmlhttpRequest({
      method: "HEAD",
      url: url,
      headers: {
        'Referer': '',
        'Accept': 'text/html',
        'Range': 'bytes=0-1',
      },
      onreadystatechange: function(details) { cb(details, url, node); }
    });
}

function lc_get(url, cb, node) {
  GM_xmlhttpRequest({
      method: "GET",
      url: url,
      headers: { 'Referer': url }, // Referer is not sent, apparently
      onload: function(xhr) { cb(xhr.responseText, url, node); }
    });
}

function lc_post(url, data, cb, node) {
  GM_xmlhttpRequest({
      method: "POST",
      url: url,
      headers: { 'Referer': url,
          'Content-type': 'application/x-www-form-urlencoded' },
      data: encodeURI(data),
      onload: function(xhr) { cb(xhr.responseText, url, node); }
    });
}

function lc_FindDupe(loc, arr){
  for(var i=0; i<arr.length; i++){
    if(arr[i] == loc) return true;
  }
  return false;
}

function lc_SetClassGood(node){
  var filetitle = (arguments[1])
      ? "File size: " + arguments[1] : "Link checks good";
  if(node.hasAttribute("class")){
    // don't dupe class name
    if( /rs_linkcheck_/ .test(node.className) ) return;
    node.className = node.className + " rs_linkcheck_good";
  }else{
    node.className = "rs_linkcheck_good";
  }
  node.title = (node.hasAttribute("title"))
      ? filetitle + ", " + node.title : filetitle;
  infolink.title = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  infobox.textContent = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  if(lcMAX < 1){
    infobox.insertBefore(document.createTextNode(lc_pMessage), infobox.lastChild);
    infobox.insertBefore(document.createElement('br'), infobox.lastChild);
  }
}

function lc_SetClassBad(node){
  if(node.hasAttribute("class")){
    // don't dupe class name
    if( /rs_linkcheck_/ .test(node.className) ) return;
    node.className = node.className + " rs_linkcheck_bad";
  }else{
    node.className = "rs_linkcheck_bad";
  }
  node.title = (node.hasAttribute("title"))
      ? "Link status unknown, " + node.title : "Link status unknown";
  infolink.title = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  infobox.textContent = "RS links: " + rsURLs.length + ", OK: " +
      goodURLs.length + ", Bad: " + badURLs.length;
  if(lcMAX < 1){
    infobox.insertBefore(document.createTextNode(lc_pMessage), infobox.lastChild);
    infobox.insertBefore(document.createElement('br'), infobox.lastChild);
  }
}

function lc_SetClassDupe(node){
  if(node.hasAttribute("class")){
    // don't dupe class name
    if( /rs_linkcheck_/ .test(node.className) ) return;
    node.className = node.className + " rs_linkcheck_dupe";
  }else{
    node.className = "rs_linkcheck_dupe";
  }
  node.title = (node.hasAttribute("title"))
      ? "Link already checked, " + node.title : "Link already checked";
}

/* Link parsing */

// UserScript = Linkify http://youngpup.net/userscripts
// description = Turn plain-text URLs into hyperlinks
// based on code by Aaron Boodman
// from the book Greasemonkey Hacks By Mark Pilgrim
// And more than a few changes by ME
function lc_Linkify(){
  var urlRegex = /_?((h\S\Sp)?(:\/\/|rapidshare\.)[^\s+\"\<\>]+)/ig;
  var snapTextElements = document.evaluate("//text()["+
    "not(ancestor::a) and not(ancestor::script) and ("+
    "contains(translate(., 'RAPIDSHE', 'rapidshe'), 'rapidshare.')"+
    " or contains(translate(., 'RAPIDSFENT', 'rapidsfent'), 'rapidsafe.net/')"+
    " or contains(translate(., 'LIXN', 'lixn'), '://lix.in/')"+
    ")]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0; i < snapTextElements.snapshotLength; i++) {
    var elmText = snapTextElements.snapshotItem(i);
    if (urlRegex.test(elmText.nodeValue)) {
      var sURLText = elmText.nodeValue;
      var elmSpan = document.createElement("span");
      // add class name
      elmSpan.className = "rs_linkcheck_linked";
      elmText.parentNode.replaceChild(elmSpan, elmText);
      urlRegex.lastIndex = 0;
      for(var match = null, lastLastIndex = 0; (match = urlRegex.exec(sURLText)); ) {
        // skip truncated links
        if(match[0].indexOf("...") != -1) continue;
        // skip bare domains
        if(match[0].indexOf("/") == -1) continue;
        elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex, match.index)));
        lastLastIndex = urlRegex.lastIndex;
        var elmLink = document.createElement("a");
        // make sure there's an http:
        elmLink.href = match[1].replace(/^((h\S\Sp)?:\/\/)?rapidshare\./, "http://rapidshare.");
        var nextPart = "";
        // Check if there was a space
        if(/\brapidshare\.(com|de)\/files\/.*[^\.]{5}$/i .test(match[0]) &&
            /^\s.*\.\w/.test(sURLText.substring(urlRegex.lastIndex))){
          nextPart = sURLText.substring(urlRegex.lastIndex);
          nextPart = nextPart.match(/^\s[^\s+\"\<\>]*\.\w+(\.html)?/i)[0];
          lastLastIndex += nextPart.length;
          elmLink.href += nextPart.replace(/\s/, "");
        }
        // open in new window or tab
        elmLink.target = "_blank";
        // tool-tip to indicate Linkified
        elmLink.title = "[linked]";
        elmLink.appendChild(document.createTextNode(match[0] + nextPart));
        elmSpan.appendChild(elmLink);
      }
      elmSpan.appendChild(document.createTextNode(
        sURLText.substring(lastLastIndex)));
      elmSpan.normalize();
      // stop events on new links, like pop-ups and cookies
      elmSpan.addEventListener("click", function(e){ e.stopPropagation(); }, true);
    }
  }
}

/* -- Link demunging functions -- */

// lix.in
function lc_GetLixLinks(){
  var lxlinks = document.evaluate("//a[contains(@href, 'http://lix.in/')]",
      document, null, 6, null);
  for(var i=0, lxlink; i < lxlinks.snapshotLength; i++){
    // changed in 2.0 to match if a redirect
    if( lxlink = lxlinks.snapshotItem(i).href.match(/http:\/\/lix\.in\/(\w+)/i) ){
      if(lc_FindDupe(lxlink[0], lxURLs)){
        lc_SetClassDupe(lxlinks.snapshotItem(i));
        continue;
      }
      logit("lxlink[1] = "+lxlink[1]);
      lxURLs.push(lxlink[0]);
      lc_post(lxlink[0], "tiny="+lxlink[1]+"&submit=continue", lc_DeLixLink, lxlinks.snapshotItem(i));
    }
  }
}
function lc_DeLixLink(html, url, node){
  if(!html) return;
  var loc = html.match( /<iframe[^>]+src=.?(http:\/\/(?:\w+\.)?rapidshare\.(de|com)\/files\/[^\s"'>]+)/i ); //'"
  if(!loc) loc = html.match( /<form[^>]+action=.?(http:\/\/\w+\.rapidshare\.(de|com)\/files\/[^\s"'>]+)/i ); //'"
  if(loc){
    node.href = loc[1].replace(/^http:\/\/\w+\.r/i, "http://r");
    if(lc_FindDupe(loc[1], rsURLs)){
      lc_SetClassDupe(node);
      return;
    }
    if(lcMAX < 1){
      return;
    }
    lcMAX--;
    rsURLs.push(loc[1]);
    setTimeout(lc_head, lcDelay, loc[1], lc_CheckStatus, node);
    lcDelay += lc_Prefs.delay;
  }else{
    lc_SetClassBad(node);
  }
}

// http://www.rapidsafe.net/rc-ImMlNTNkVTM/filename
function lc_GetRSafeLinks(){
  var rsflinks = document.evaluate("//a[contains(@href, 'rapidsafe.net/rc-')]",
      document, null, 6, null);
  for(var i=0, rsflink; i < rsflinks.snapshotLength; i++){
    rsflink = rsflinks.snapshotItem(i).href;
    if(lc_FindDupe(rsflink, rsfURLs)){
      lc_SetClassDupe(rsflinks.snapshotItem(i));
      continue;
    }
    rsfURLs.push(rsflink);
    lc_get(rsflink, lc_DeSafLink, rsflinks.snapshotItem(i));
  }
}
function lc_DeSafLink(html, url, node){
  if(!html) return;
  var loc = html.match( /<form[^>]+action=(.)(http:\/\/(\w+\.)?rapidshare\.(de|com))(.+?)\1/i ); //'"
  if(loc){
    loc[6] = loc[5].replace(/\;/g, "");
    loc[6] = loc[6].replace(/&#x/g, "%");
    loc[6] = loc[2] + decodeURIComponent(loc[6]);
    node.href = loc[6];
    if(node.hasAttribute('onmousedown')) node.removeAttribute('onmousedown');
    if(lc_FindDupe(loc[6], rsURLs)){
      lc_SetClassDupe(node);
      return;
    }
    if(lcMAX < 1){
      return;
    }
    lcMAX--;
    rsURLs.push(loc[6]);
    setTimeout(lc_head, lcDelay, loc[6], lc_CheckStatus, node);
    lcDelay += lc_Prefs.delay;
  }else{
    lc_SetClassBad(node);
  }
}

/* -- Utility functions -- */

// Debug mode writes messages to log
function logit(msg){
  if(lc_Prefs.debug){
    if(logit.caller.name){
      msg = logit.caller.name + ": " + msg
    }
    GM_log(msg);
    // !if not GM_log write to console!
  }
}

// Convert key options to char code, if not already
function lc_charToCode(opts){
  for(var key in opts){
    if(typeof opts[key] == 'string'){
      // allow Unicode values
      if(/^\d\d+$/.test(opts[key])){
        opts[key] = parseInt(opts[key], 10);
        continue;
      }
      opts[key] = opts[key].charCodeAt(0);
    }
  }
}

// Add a style tag, add css and return element
function US_addStyleTag(css){
  var Style = document.createElement('style');
  Style.type = 'text/css';
  if(document.contentType == "application/xhtml+xml"){
    Style.appendChild( document.createCDATASection(css) );
  }else{
    Style.appendChild( document.createTextNode(css) );
  }
  // Return element so properties can be added
  // Note: Mozilla creates head if it doesnt exist
  return (document.getElementsByTagName('head').length)
      ? document.getElementsByTagName('head').item(0).appendChild(Style): null;
}

/* Check for update functions */

var lc_checkUpdate = {
  timestamp: 1205843190562,
  source: "http://userscripts.org/scripts/review/13709?format=txt",
  handleEvent: function(){
      var xhrheaders = {
          'User-Agent': navigator.userAgent + " Greasemonkey (checkUpdate)",
          'Referer': this.source,
          'Connection': 'close'
        };
      var updateEntity = {header: "Etag", value: undefined}
      if(GM_getValue){
        try{
          updateEntity.value = GM_getValue('updateEntity');
        }catch(e){
          logit("GM_getValue('updateEntity') thew an exception: " +
              e.name + "; " + e.message);
        }
        if(updateEntity.value){
          [, updateEntity.header, updateEntity.value] = updateEntity.value
              .match(/^(\S+?):\s+(\S.*)$/);
          switch(updateEntity.header){
            case "Etag":
              xhrheaders['If-None-Match'] = updateEntity.value;
              break;
            case "Last-Modified":
              xhrheaders['If-Modified-Since'] = updateEntity.value;
          }
        }
      }
      GM_xmlhttpRequest({
          method: "HEAD",
          url: this.source,
          headers: xhrheaders,
          onreadystatechange: function(details) {
              lc_checkUpdate.parseHeaders.call(lc_checkUpdate, details, updateEntity); },
        });
    },
  parseHeaders: function(response, header){
      if(response.readyState == 4){
        if(response.status >= 400){ alert("Error: File Not Found"); return; }
        if(header.value &&
            /\sStatus: 304 Not Modified\b/.test(response.responseHeaders)){
          alert(helplink.rel + " is up to date"); // use helplink object info
          return;
        }
        var re = new RegExp("^(" + header.header + ":\\s+.*?)\\s*$", "m");
        var matched = response.responseHeaders.match(re);
        header.value = (matched)? matched[1]: "";
        GM_xmlhttpRequest({
            method: "GET",
            url: this.source,
            headers: {
              'User-Agent': navigator.userAgent+ " Greasemonkey (checkUpdate)",
              'Referer': this.source,
              'Connection': 'close',
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache',
              'Range': 'bytes=0-511'
            },
            onload: function(xhr) {
              lc_checkUpdate.parseText(xhr.responseText, header.value);
            }
          });
      }
    },
  parseText: function(respText, header){
      var meta = {name: helplink.rel + " "}; // use helplink object info
      meta.time = respText.match(/^\/\/\s@timestamp\s+(\d+)\s*$/m);
      if(!meta.time){
        logit("@timestamp not found in: " + respText);
        alert("Error: timestamp not found");
        return;
      }
      meta.ver = respText.match(/^\/\/\s@version\s+(\S+)\s*$/m);
      if(meta.ver) meta.name = meta.name + " version " + meta.ver[1];
      if(meta.time[1] > this.timestamp){
        header = "";
        meta.loc = respText.match(/^\/\/\s@homepage\s+(\S+)\s*$/m);
        var updated = new Date(parseInt(meta.time[1], 10));
        var confirmText = "Script has been Updated\n" +
            meta.name + " - is available\n" +
            updated.toLocaleDateString() +", "+ updated.toLocaleTimeString();
        if(!meta.loc){ alert(confirmText) }
        else if( confirm(
            confirmText + "\nClick OK to open script homepage in new tab" ) )
        { GM_openInTab(meta.loc[1]) }
      }else if(meta.time[1] == this.timestamp){
        alert(meta.name + " - Not Updated");
      }else{
        logit("@timestamp: " + meta.time[1] + " is older: " + this.timestamp);
        alert("Error: timestamp incorrect");
        return;
      }
      if(GM_setValue){
        GM_setValue('updateEntity', header);
        logit("Header saved: " + header);
      }
    },
}

/* Preferences Manager */

// Check if preferences have been saved - lc_getPreferences(lc_Prefs)
function lc_getPreferences(prefs){
  if(!GM_getValue) return;
  // ! remove prefs inadvertantly added by v2.2 !
  if(GetPref("0", false)){
    GM_log("Removing bad prefs from v2.2");
    for(var i=0;i<16;i++){
      // no way to delete prefs
      if(GM_getValue(i)) GM_setValue(i, "");
    }
    if(confirm("Oops! RS_LinkCheck Version 2.2 added bad prefs.\n"+
        "You should uninstall the script removing associated preferences.\n"+
        "Sorry for my mistake, you get a free upgrade!\n"+
        "Click OK to open the script's page in a new tab.\n")){
      GM_openInTab("http://userscripts.org/scripts/show/13709");
    }
  }
  for(opt in prefs){
    // prefs we do not save
    if(/^(debug|styles)$/.test(opt)) continue;
    if(typeof prefs[opt] == 'object'){
      // loop through objects (as in lc_Prefs.accel.altKey)
      for(oopt in prefs[opt]){
        prefs[opt][oopt] = GetPref(oopt, prefs[opt][oopt]);
      }
    }else{
      prefs[opt] = GetPref(opt, prefs[opt]);
    }
  }
  function GetPref(P,V){
    try{
      var pref = GM_getValue(P);
    }catch(e){
      GM_log("lc_getPreferences: GetPref(\""+ P +"\") error... "+ e.message);
      // waiting for GM_deleteValue
      if(e.name === "NS_ERROR_UNEXPECTED")
          alert("RS_LinkCheck: Restart browser to clear empty preference");
    }
    // use default if not set
    if(pref === undefined) pref = V;
    // what the heck, check for empty string
    if(pref === "") pref = V;
    return pref;
  }
}

// Save User Preferences - lc_savePreferences(lc_Prefs);
function lc_savePreferences(prefs){
  if(!GM_setValue) return;
  for(opt in prefs){
    // prefs we do not save
    if(/^(debug|styles)$/.test(opt)) continue;
    if(typeof prefs[opt] == 'object'){
      // loop through objects (as in lc_Prefs.accel.altKey)
      for(oopt in prefs[opt]){
        GM_setValue(oopt, prefs[opt][oopt]);
      }
    }else{
      GM_setValue(opt, prefs[opt]);
    }
  }
}

// Function to add user preference form to page
function lc_createPreferencesForm(){
  if(document.getElementById("lc_preferencesBox")){
    lc_removePreferencesForm();
    return;
  }
  // disable the link checking keys
  document.removeEventListener("keypress", lc_StartChecks, true);
  var styles = [
      "/* Styles for RS_LinkCheck preferences form */",
      "#lc_preferencesBox {",
      "  text-align: center; background: rgb(221,221,221);",
      "  min-width: 380px; min-height: 260px; padding: 0.4em 0.8em;",
      "  position: fixed; left: auto; top: auto; right: 3%; bottom: 4%; z-index: 99;",
      "  border: 3px outset rgb(156,102,81); -moz-border-radius: 10px;",
      " }",
      "#lc_preferencesBox, #lc_preferencesBox p, #lc_preferencesBox label,",
      "  #lc_preferencesBox button { color: rgb(122,33,33); }",
      "#lc_preferencesBox p { padding: 0.25em; background: rgb(212,212,212); }",
      "#lc_preferencesBox button { margin-top: 1em }",
      "#lc_preferencesSubmit button { margin-left: 0.2em; margin-right: 0.2em; }",
      "#lc_preferencesBox button, .lc_preferencesInput { font-size: 0.8em }",
    ];
  US_addStyleTag("\n" + styles.join("\n") + "\n").id = "lc_pref_style";
  var preferencesBox = document.createElement('div');
  document.body.appendChild(preferencesBox);
  preferencesBox.id = "lc_preferencesBox";
  preferencesBox.appendChild(document.createElement('div'))
      .textContent = "Set RS_LinkCheck preferences here";
  var preferencesForm = document.createElement('form');
  with(preferencesForm){
    setAttribute("onsubmit", "return false;");
    id = "lc_preferencesForm";
    appendChild(document.createElement('p')).textContent = "- Link Checking Limits -";
    createFormInput(lc_Prefs.limit, "limit", "Maximun number of links to check ", 3);
    appendChild(document.createElement('br'));
    createFormInput(lc_Prefs.delay, "delay", "Delay between checks (milliseconds) ", 3);
    appendChild(document.createElement('p')).textContent = "- Activation Keys (use Shift for caps) -";
    createFormInput(String.fromCharCode(lc_Prefs["check"]), "check", "Linkify and check links key ", 2);
    appendChild(document.createElement('br'));
    createFormInput(String.fromCharCode(lc_Prefs["linky"]), "linky", "Linkify (create links only) key ", 2);
    appendChild(document.createElement('br'));
    createFormInput(String.fromCharCode(lc_Prefs["select"]), "select", "Open selected text URL key ", 2);
    appendChild(document.createElement('p')).textContent = "- Modifier Keys -";
    createFormInput(lc_Prefs.accel["altKey"], "altKey", "Alt : ");
    createFormInput(lc_Prefs.accel["ctrlKey"], "ctrlKey", " Ctrl : ");
    createFormInput(lc_Prefs.accel["metaKey"], "metaKey", " Meta : ");
    appendChild(document.createElement('br'));
    var applyButton = document.createElement('button');
    applyButton.type = "button";
    applyButton.textContent = "Apply";
    var cancelButton = document.createElement('button');
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    appendChild(document.createElement('div')).id = "lc_preferencesSubmit";
    lastChild.appendChild(applyButton);
    lastChild.appendChild(cancelButton);
    appendChild(document.createElement('p'))
        .appendChild(document.createElement('a'))
        .appendChild(document.createTextNode(helplink.title))
        .parentNode.href = helplink.href;
    lastChild.appendChild( document.createElement('br') );
    lastChild.appendChild( document.createTextNode("updated: " +
          (new Date(lc_checkUpdate.timestamp)).toLocaleDateString()) );
    createFormInput(lc_Prefs.debug, "debug", "enable debug mode : ");
    var updateButton = document.createElement('button');
    updateButton.type = "button";
    updateButton.textContent = "Check for Update";
    appendChild(document.createElement('div')).appendChild(updateButton);
  }
  preferencesBox.appendChild(document.createElement('div')).appendChild(preferencesForm);
  applyButton.addEventListener('click', lc_updatePreferences, true);
  cancelButton.addEventListener('click', lc_removePreferencesForm, true);
  updateButton.addEventListener('click', lc_checkUpdate, true);
  preferencesForm.elements[0].focus();
  preferencesForm.elements[0].select();
  // createFormInput(var, "var name", "label text", [size])
  function createFormInput(pref, prefName, text){
    var elm = document.createElement('input');
    elm.className = "lc_preferencesInput";
    elm.name = prefName;
    switch(typeof pref){
      case "string":
      case "number":
        elm.value = pref;
        if(arguments[3]) elm.size = arguments[3];
        break;
      case "boolean":
        elm.type = "checkbox";
        elm.checked = pref;
        break;
      case "object":
        elm.type = "radio"; // pref = ["pref value", true]
        elm.value = pref[0]; // preference value
        elm.checked = pref[1]; // true or false
    }
    preferencesForm.appendChild(document.createElement('label')).appendChild(elm);
    elm.parentNode.insertBefore(document.createTextNode(text), elm);
  }
}
// Remove the preferences form
function lc_removePreferencesForm(evt){
  if(evt){
    // if Cancel button is pressed
    lc_Prefs.debug = evt.target.form.elements.namedItem('debug').checked;
    evt.stopPropagation();
  }
  document.getElementsByTagName('head').item(0)
      .removeChild(document.getElementById("lc_pref_style"));
  document.body.removeChild(document.getElementById("lc_preferencesBox"));
  // enable the link checking keys
  document.addEventListener("keypress", lc_StartChecks, true);
}
// Update the new preferences
function lc_updatePreferences(evt){
  evt.stopPropagation();
  with(evt.target.form){
    var nl = parseInt(elements.namedItem('limit').value, 10);
    var nd = parseInt(elements.namedItem('delay').value, 10);
    if(isNaN(nl) || isNaN(nd)){
      elements.namedItem('limit').value = lc_Prefs.limit;
      elements.namedItem('delay').value = lc_Prefs.delay;
      return;
    }
    lc_Prefs.limit = nl, lcMAX = nl;
    lc_Prefs.delay = nd;
    lc_Prefs.check = elements.namedItem('check').value;
    lc_Prefs.linky = elements.namedItem('linky').value;
    lc_Prefs.select = elements.namedItem('select').value;
    lc_Prefs.accel.altKey = elements.namedItem('altKey').checked;
    lc_Prefs.accel.ctrlKey = elements.namedItem('ctrlKey').checked;
    lc_Prefs.accel.metaKey = elements.namedItem('metaKey').checked;
    lc_Prefs.debug = elements.namedItem('debug').checked;
  }
  lc_charToCode(lc_Prefs);
  lc_savePreferences(lc_Prefs);
  lc_removePreferencesForm();
}
// Tools -> Greasemonkey -> User Script Commands... -> RS_LinkCheck preferences
if(GM_registerMenuCommand){
  GM_registerMenuCommand( "RS_LinkCheck preferences", lc_createPreferencesForm );
}


/* == Descriptor == */
