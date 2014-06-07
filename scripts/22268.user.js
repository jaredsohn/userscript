// ==UserScript==
// @name           RS_LinkCheck
// @namespace      http://gmscripts.bigsleep.net
// @version        1.3
// @description    Rapidshare link checker
// @include        http://*
// @exclude        http://rapidshare.tld/*
// @exclude        http://*.rapidshare.tld/*
// @exclude        http://lix.in/*
// @exclude        http://www.rapidsafe.net/*
// ==/UserScript==

// Activation key - upper case letter requires shift
var lc_Key = "R";

// Link Styles
function addStyles(){
  var styles = [
      "A.rs_linkcheck_good:after { content: ':D'; color: white; background-color: green }",
      "A.rs_linkcheck_bad:after { content: ':-('; color: white; background-color: red }",
      "A.rs_linkcheck_dupe:after { content: ':-|'; color: white; background-color: red }",
      "/* for newly linked */",
      "SPAN.rs_linkcheck_linked A:after { background-color: blue }"
    ];
  GM_addStyle(styles.join("\n"));
}

// Menu command to check links
var enableMenuCheck = true;
// Tools -> Greasemonkey -> User Script Commands... -> Check RS Links Now
if(GM_registerMenuCommand && enableMenuCheck){
  GM_registerMenuCommand( "Check RS Links Now", lc_StartChecks );
}

// Globals
var rsURLs = new Array();
var goodURLs = new Array();
var badURLs = new Array();
var RSlinks;
var LXlinks;
var RSFlinks;

// Capture activation key
document.addEventListener("keypress", lc_StartChecks, false);
// Add styles !don't do this twice
if(GM_addStyle) addStyles();

var infolink = document.createElement('link');
var helplink = document.createElement('link');
helplink.rel = "RS_LinkChecker";
helplink.href = "http://userscripts.org/scripts/show/13709";
helplink.title = "Go to RS_LinkChecker help page";
document.getElementsByTagName('head').item(0).appendChild(helplink);
// Key press or menu activation
function lc_StartChecks(kyd){
  // check if keypress
  if(kyd){
    if(kyd.target.nodeName == ("textarea" || "input" )){ return true; }
    // kyd.altKey kyd.ctrlKey kyd.metaKey kyd.shiftKey
    if((kyd.charCode == 0) || kyd.altKey || kyd.ctrlKey || kyd.metaKey){
      return true; // wrong key(s)
    }
    var key = (/^\w/.test(lc_Key))? lc_Key.charCodeAt(0): lc_Key;
    //alert(kyd.charCode); // Unicode value of a character key
    //alert(kyd.keyCode); // Unicode value of a non-character key
    //alert(kyd.which); // Unicode value of any key
    if(kyd.charCode != key) return true;
    // key charCode matches
    kyd.stopPropagation();
  }else{
    // must be the buggy menu item click
    if(!enableMenuCheck) return true;
    enableMenuCheck = false;
  }
  // reset arrays
  rsURLs = [];
  goodURLs = [];
  badURLs = [];
  // Start script
  lc_Linkify();
  lc_GetRSafeLinks();
  lc_GetLixLinks();
  lc_CheckRSLinks();
}

function lc_CheckRSLinks(){
  RSlinks = document.evaluate("//a[contains(@href, 'rapidshare.')]",
      document, null, 6, null);
  for(var i=0, alink; i < RSlinks.snapshotLength; i++){
    alink = RSlinks.snapshotItem(i);
    // reduce to base filename...
    alink.href = alink.href
        .replace(/(http:\/\/)\w+\.(rapidshare\.\w+\/files\/\d+\/)\d+\/\b/i, "$1$2");
    // remove redirects
    alink.href = alink.href.replace(/.+\?(http:\/\/rapidshare\..+)/i, "$1");
    if( /^http:\/\/rapidshare\.(de|com)\/files\/.+/i .test(alink.href) ){
      if(lc_FindDupe(alink.href, rsURLs)){
        lc_SetClassDupe(alink);
        continue;
      }
      rsURLs.push(alink.href);
      lc_head(alink.href, lc_CheckStatus, alink);
    }
  }
  infolink.rel = "RS_LinkChecker";
  infolink.href = location.href;
  infolink.title = "RS Links Checked = " + rsURLs.length;
  document.getElementsByTagName('head').item(0).appendChild(infolink);
}

function lc_CheckLink(html, url, node){
  if( /<input[^>]+type="submit"[^>]+name="dl\.start"[^>]*>/ .test(html) ){
    goodURLs.push(url);
    lc_SetClassGood(node);
  }else{
    badURLs.push(url);
    lc_SetClassBad(node);
  }
}

function lc_CheckStatus(response, url, node){
  if(response.readyState == 4){
    if(response.status < 400){
      var content = response.responseHeaders.match(/\sContent-Type:\s+(\w+\/\w+)/)[1];
      if(content == "text/html"){
        badURLs.push(url);
        lc_SetClassBad(node);
        return false;
      }else{
        var filesize = response.responseHeaders.match(/\sContent-Length:\s+(\d+)/)[1];
        filesize = filesize.replace(/(\d+)(\d\d\d\d\d\d)$/,"$1" + "," + "$2");
        goodURLs.push(url);
        lc_SetClassGood(node, filesize);
        return true;
      }
    }
  }
  return false;
}

function lc_head(url, cb, node) {
  GM_xmlhttpRequest({
      method: "HEAD",
      url: url,
      headers: {
        'Referer': '',
        'Accept': 'text/html'
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
          'Content-type':'application/x-www-form-urlencoded' },
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
      ? "File found, File size: " + arguments[1] : "Link checks good";
  if(node.hasAttribute("class")){
    // don't dupe class name
    if( /rs_linkcheck_/ .test(node.className) ) return;
    node.className = node.className + " rs_linkcheck_good";
  }else{
    node.className = "rs_linkcheck_good";
  }
  node.title = (node.hasAttribute("title"))
      ? filetitle + ", " + node.title : filetitle;
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

// UserScript = Linkify http://youngpup.net/userscripts
// description = Turn plain-text URLs into hyperlinks
// based on code by Aaron Boodman
// from the book Greasemonkey Hacks By Mark Pilgrim
// A few changes by ME
function lc_Linkify(){
  var urlRegex = /\b_?(h\w\wp:\/\/[^\s+\"\<\>]+)/ig;
  var snapTextElements = document.evaluate("//text()[not(ancestor::a) " +
    "and not(ancestor::script) and " +
    "(contains(translate(., 'RAPIDSHE', 'rapidshe'), 'rapidshare.') or " +
    "contains(translate(., 'RAPIDSFENT', 'rapidsfent'), 'rapidsafe.net/') or " +
    "contains(translate(., 'LIXN', 'lixn'), '://lix.in/'))]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
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
        elmSpan.appendChild(document.createTextNode(sURLText.substring(lastLastIndex, match.index)));
        lastLastIndex = urlRegex.lastIndex;
        var elmLink = document.createElement("a");
        elmLink.href = match[1];
        var nextPart = "";
        // Check if there was a space
        if(/\brapidshare\.(com|de)\/files\/.*[^\.]{5}$/i .test(match[0])){
          nextPart = sURLText.substring(urlRegex.lastIndex);
          nextPart = nextPart.match(/^\s[^\s+\"\<\>]*\.\w+(\.html)?/i)[0];
          lastLastIndex += nextPart.length;
          elmLink.href += nextPart.replace(/\s/, "");
        }
        // replace hxxp
        elmLink.href = elmLink.href.replace(/^h\w\wp/i, "http");
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
      elmSpan.addEventListener("click", function(e){ e.stopPropagation(); }, false);
    }
  }
}

// lix.in
function lc_GetLixLinks(){
  LXlinks = document.evaluate("//a[contains(@href, 'http://lix.in/')]",
      document, null, 6, null);
  for(var i=0, lxlink; i < LXlinks.snapshotLength; i++){
    //lxlink = LXlinks.snapshotItem(i);
    if( lxlink = LXlinks.snapshotItem(i).href.match(/^http:\/\/lix\.in\/(\w+)/i) ){
      if(lc_FindDupe(lxlink[0], rsURLs)){
        lc_SetClassDupe(LXlinks.snapshotItem(i));
        continue;
      }
      //GM_log("lxlink[1] = "+lxlink[1]);
      rsURLs.push(lxlink[0]);
      lc_post(lxlink[0], "tiny="+lxlink[1]+"&submit=continue", lc_DeLixLink, LXlinks.snapshotItem(i));
    }
  }
}
function lc_DeLixLink(html, url, node){
  if(!html) return;
  //GM_log("Response = \n"+html);
  var loc = html.match( /<form[^>]+action=.?(http:\/\/\w+\.rapidshare\.(de|com)\/files\/[^\s"'>]+)/i ); //'"
  if(loc){
    node.href = loc[1].replace(/^http:\/\/\w+\./i, "http://");
    if(lc_FindDupe(loc[1], rsURLs)){
      lc_SetClassDupe(node);
      return;
    }
    rsURLs.push(loc[1]);
    lc_head(loc[1], lc_CheckStatus, node);
  }else{
    lc_SetClassBad(node);
  }
  infolink.title = "RS Links Checked = " + rsURLs.length;
}
// http://www.rapidsafe.net/rc-ImMlNTNkVTM/filename
function lc_GetRSafeLinks(){
  RSFlinks = document.evaluate("//a[contains(@href, 'rapidsafe.net/rc-')]",
      document, null, 6, null);
  for(var i=0, rsflink; i < RSFlinks.snapshotLength; i++){
    rsflink = RSFlinks.snapshotItem(i).href;
    if(lc_FindDupe(rsflink, rsURLs)){
      lc_SetClassDupe(RSFlinks.snapshotItem(i));
      continue;
    }
    //GM_log("rsflink = "+rsflink);
    rsURLs.push(rsflink);
    lc_get(rsflink, lc_DeSafLink, RSFlinks.snapshotItem(i));
  }
}
function lc_DeSafLink(html, url, node){
  if(!html) return;
  //GM_log("Response = \n"+html);
  var loc = html.match( /<form[^>]+action=(.)(http:\/\/(\w+\.)?rapidshare\.(de|com))(.+?)\1/i ); //'"
  if(loc){
    loc[6] = loc[5].replace(/\;/g, "");
    loc[6] = loc[6].replace(/&#x/g, "%");
    loc[6] = loc[2] + decodeURIComponent(loc[6]);
    //GM_log("RSF link = "+loc[6]);
    node.href = loc[6];
    if(lc_FindDupe(loc[6], rsURLs)){
      lc_SetClassDupe(node);
      return;
    }
    rsURLs.push(loc[6]);
    lc_head(loc[6], lc_CheckStatus, node);
  }else{
    lc_SetClassBad(node);
  }
  infolink.title = "RS Links Checked = " + rsURLs.length;
}