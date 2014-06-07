// ==UserScript==
// @name           Forum Smileys
// @namespace      srazzano
// @description    Adds Emoticons into forum textareas.
// @version        1.0.8
// @include        http://forum.userstyles.org*
// @include        http://choggi.org/vanilla*
// @include        http://custombuttons.sourceforge.net*
// @include        http://userscripts.org*
// @include        http://tmp.garyr.net*
// @include        http://forums.mozillazine.org*
// @include        http://forum.heraldtribune.com*
// @include        http://forum.blueridgenow.com*
// @include        http://blueridgedebate.com*
// @include        http://forum.pressdemocrat.com*
// @include        http://forum.tuscaloosanews.com*
// @include        http://floridaforum.freeforums.org*
// @include        http://gimpchat.com*
// @homepage       http://userscripts.org/scripts/show/147310
// @updateURL	   https://userscripts.org/scripts/source/147310.user.js
// ==/UserScript==

// ========== Viewer ==============================================================================
var viewer = true; // true or false

// ========== Sites Included ======================================================================
var url = window.location.href.toLowerCase();
var fuso = url.match("http://forum.userstyles.org");
var chog = url.match("http://choggi.org");
var cbsf = url.match("http://custombuttons.sourceforge.net");
var usso = url.match("http://userscripts.org");
var tmpg = url.match("http://tmp.garyr.net"); 
var fmzo = url.match("http://forums.mozillazine.org");
var fhto = url.match("http://forum.heraldtribune.com");
var fbrd = url.match("http://blueridgedebate.com");
var fbrn = url.match("http://forum.blueridgenow.com");
var fpdc = url.match("http://forum.pressdemocrat.com");
var ftnc = url.match("http://forum.tuscaloosanews.com");
var ffff = url.match("http://floridaforum.freeforums.org");
var gimp = url.match("http://gimpchat.com");

// ========== Initialize ==========================================================================
initGM();
function initGM() {
  const STORAGE_PREFIX = "fuso-", LOG_PREFIX = "Forum Smileys: ", LOG = true, DEBUG = false;
  isGM = typeof GM_getValue != "undefined" && typeof GM_getValue("a", "b") != "undefined";
  log = isGM ? function(msg) {if(LOG) GM_log(msg)} : window.opera ? function(msg) {if(LOG) opera.postError(LOG_PREFIX+msg)} : function(msg) {try {if(LOG) console.log(LOG_PREFIX+msg)} catch(e) {}}
  debug = function(msg) {if(LOG && DEBUG) log("** Debug: " + msg + " **")}
  addStyle = isGM ? GM_addStyle : function(css) {var head = $("head")[0]; if(!head) return; var style = $c("style", {type:"text/css",innerHTML:css}); head.appendChild(style)}
  setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case "string": localStorage.setItem(STORAGE_PREFIX+name,"S]" + value); break; case "number": if(value.toString().indexOf(".") < 0) {localStorage.setItem(STORAGE_PREFIX + name, "N]" + value)} break; case "boolean": localStorage.setItem(STORAGE_PREFIX+name, "B]" + value); break}}
  getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case "S]": return value.substr(2); case "N]": return parseInt(value.substr(2)); case "B]": return value.substr(2) == "true";}} return value}
  deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
}
  
// ========== Helper Functions ====================================================================
function $(q, root, single, context) {
  root = root || document;
  context = context || root;
  if(q[0] == "#") return root.getElementById(q.substr(1));
  if(q.match(/^[\/*]|^\.[\/\.]/)) {
    if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
    var arr = []; var xpr = root.evaluate(q, context, null, 7, null);
    for(var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
    return arr;
  }
  if(q[0] == ".") {
    if(single) return root.getElementsByClassName(q.substr(1))[0];
    return root.getElementsByClassName(q.substr(1));
  }
  if(single) return root.getElementsByTagName(q)[0];
  return root.getElementsByTagName(q);
}
function $c(type, props, evls) {
  var node = document.createElement(type);
  if(props && typeof props == "object") {
    for(prop in props) {
      if(typeof node[prop] == "undefined") node.setAttribute(prop, props[prop]);
      else node[prop] = props[prop];
  } }
  if(evls instanceof Array) {
    for(var i = 0; i < evls.length; i++) {
      var evl = evls[i];
      if(typeof evl.type == "string" && typeof evl.fn == "function")
        node.addEventListener(evl.type, evl.fn, false);
  } }
  return node;
}
  
// ========== userstyles.org Forum Extract ========================================================
if(fuso) {
  // ********** edit to suit your tastes (i = ignore case) **********
  var hideThese = [/facebook/i,/tumblr/i,/orkut/i,/jappy/i,/noritaro/i,/666threesixes666/i,/pueden/i,/BastelBaer/,/OneeChan/i,/4chan/i,/Twitch/i,/nicotest/,/genzi/,/azhuzz/,/maxoud/i,/Kerrad/,/Semidio/,/TToo/,/p0izn/,/baidu/i,/Candislp/,/francesfuentes/,/gordo/,/whippedyogurt/,/DeVille/i,/cirer/i,/TieBa/i,/luffycheung/,/shuchangleo/,/Mauri234/,/yuki kuran/,/eitslercarm/];
  var linkList = $(".ItemContent");
  for(var i = 0; i < linkList.length; i++) { 
    var link = linkList[i].textContent; 
    for(var j = 0; j < hideThese.length; j++) 
      if(link.match(hideThese[j]) != null) linkList[i].parentNode.style.display = "none"; 
} } 

// ========== Smileys Functions ===================================================================
function setEmoticons() {
  var editbar = document.body;
  if(editbar) {
    var bdiv = $c("div", {id:"srEmoticons"}, [{type:"mouseout",fn:function(){hideViewer()}}]);
    bdiv.setAttribute("style", "display:none");
    var btns = "<div id='emoContainer'>";
    btns += emoIcon("x", "PS", "http://www.squeaky.org.uk.nyud.net/smileys/ps.gif");
    btns += emoIcon("x", "Thankyou", "http://i.imgur.com/H2RJV.gif");
    btns += emoIcon("x", "Thankyou", "http://i.imgur.com/moJ8a.gif");
    btns += emoIcon("x", "Thankyou", "http://www.shotpix.com/images/16426691200580784039.gif");
    btns += emoIcon("x", "Thankyou", "http://i.imgur.com/L7h72.png");
    btns += emoIcon("x", "...", "http://i6.photobucket.com/albums/y236/demonferret/Emoticons/th_thninjav1.gif");
    btns += emoIcon("x", "Thankyou", "http://i.imgur.com/3coEa.gif");
    btns += emoIcon("x", "Thanks", "http://i.imgur.com/2ulnw.gif");
    btns += emoIcon("x", "kiss", "http://i.imgur.com/m6bgW.gif");
    btns += emoIcon("x", "smile", "http://www.ramanon.com/forum/images/smilies/happy.gif");
    btns += emoIcon("x", "wow", "http://i.imgur.com/xEZyj.gif");
    btns += emoIcon("x", "yesss", "http://gimpchat.com/images/smilies/yesssmileyf.gif");
    btns += emoIcon("x", "Thankyou!", "http://www.freesmileys.org/smileys/smiley-signs153.gif");
    btns += emoIcon("x", "ThreadNice", "http://www.smileyvault.com/albums/forum/smileyvault-nicethread.gif");
    btns += emoIcon("x", "ThreadHijacked", "http://www.smileyvault.com/albums/forum/smileyvault-hijacked.gif");
    btns += emoIcon("x", "GoodNight", "http://www.freesmileys.org/smileys/smiley-forum/goodnight.gif");
    btns += emoIcon("x", "GoogleFriend", "http://www.smilies.4-user.de/include/Schilder/google.gif");
    btns += emoIcon("x", "Pray", "http://www.picgifs.com/smileys/smileys-and-emoticons/praying/smileys-praying-623819.gif");
    btns += emoIcon("x", "Oops!", "http://smileys.on-my-web.com/repository/Confused/redface-oops-6.gif"); 
    btns += emoIcon("x", "SOS", "http://www.freesmileys.org/smileys/smiley-gen164.gif");
    btns += emoIcon("x", "Sigh", "http://i.minus.com/ib1eTjS56bzs8J.gif");
    btns += emoIcon("x", "Huh?", "http://www.mysmiley.net/imgs/smile/sign/sign0035.gif");
    btns += emoIcon("x", "Oops!", "http://www.mysmiley.net/imgs/smile/sign/sign0040.gif");
    btns += emoIcon("x", "wow", "http://i.imgur.com/xEZyj.gif");
    btns += emoIcon("x", "WOW!", "http://www.mysmiley.net/imgs/smile/sign/sign0046.gif");
    btns += emoIcon("x", "Cool", "http://www.mysmiley.net/imgs/smile/sign/sign0028.gif");
    btns += emoIcon("x", "smile", "http://www.ramanon.com/forum/images/smilies/happy.gif");
    btns += emoIcon("x", "Smile", "http://www.freesmileys.org/smileys/smiley-basic/smile.gif");
    btns += emoIcon("x", "Sad", "http://www.freesmileys.org/smileys/smiley-basic/sad.gif");
    btns += emoIcon("x", "Huh", "http://www.freesmileys.org/smileys/smiley-basic/huh.gif");
    btns += emoIcon("x", "Dry", "http://www.freesmileys.org/smileys/smiley-basic/dry.gif");
    btns += emoIcon("x", "Mellow", "http://www.freesmileys.org/smileys/smiley-basic/mellow.gif");
    btns += emoIcon("x", "Died", "http://www.freesmileys.org/smileys/smiley-violent004.gif");
    btns += emoIcon("x", "Cool", "http://www.freesmileys.org/smileys/smiley-basic/cool.gif");
    btns += emoIcon("x", "Whistle", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-029.gif");
    btns += emoIcon("x", "Huh?", "http://smileyjungle.com/smilies/doh28.gif");
    btns += emoIcon("x", "Confused", "http://www.smileyvault.com/albums/basic/smileyvault-chin.gif");
    btns += emoIcon("x", "What", "http://www.freesmileys.org/smileys/smiley-basic/what.gif");
    btns += emoIcon("x", "Dont look at me", "http://img191.imageshack.us/img191/988/itwashim3.gif");
    btns += emoIcon("x", "whao?", "http://www.freesmileys.org/smileys/smiley-basic/spock.gif");
    btns += emoIcon("x", "Wink", "http://www.freesmileys.org/smileys/smiley-basic/wink.gif");
    btns += emoIcon("x", "OhMy", "http://www.freesmileys.org/smileys/smiley-basic/ohmy.gif");
    btns += emoIcon("x", "Laugh", "http://www.freesmileys.org/smileys/smiley-basic/laugh.gif");
    btns += emoIcon("x", "Tongue", "http://www.freesmileys.org/smileys/smiley-basic/tongue.gif");
    btns += emoIcon("x", "Bleh", "http://www.freesmileys.org/smileys/smiley-fc/bleh.gif");
    btns += emoIcon("x", "Tongue", "http://smileys.on-my-web.com/repository/Tongue/mockery-035.gif");
    btns += emoIcon("x", "...", "http://smileyjungle.com/smilies/disdain21.gif");
    btns += emoIcon("x", "Angel", "http://www.freesmileys.org/smileys/smiley-basic/angel.gif");
    btns += emoIcon("x", "Nono", "http://smileyjungle.com/smilies/disdain25.gif");
    btns += emoIcon("x", "OhYes!", "http://www.freesmileys.org/smileys/smiley-basic/lol.gif");
    btns += emoIcon("x", "ROFL", "http://www.freesmileys.org/smileys/smiley-basic/rofl.gif");
    btns += emoIcon("x", "LOL", "http://www.freesmileys.org/smileys/smiley-laughing001.gif");
    btns += emoIcon("x", "Hehaha!", "http://www.freesmileys.org/smileys/smiley-laughing021.gif");
    btns += emoIcon("x", "Yeap!", "http://www.freesmileys.org/smileys/smiley-happy120.gif");
    btns += emoIcon("x", "Guru", "http://www.freesmileys.org/smileys/smiley-green/greensmilies-028.gif");
    btns += emoIcon("x", "RollEyes", "http://www.freesmileys.org/smileys/smiley-basic/rolleyes.gif");
    btns += emoIcon("x", "Unsure", "http://www.freesmileys.org/smileys/smiley-basic/unsure.gif");
    btns += emoIcon("x", "Tears", "http://www.freesmileys.org/smileys/smiley-basic/tears.gif");
    btns += emoIcon("x", "Sick", "http://www.freesmileys.org/smileys/smiley-basic/sick.gif");
    btns += emoIcon("x", "Sleep", "http://www.freesmileys.org/smileys/smiley-basic/sleep.gif");
    btns += emoIcon("x", "Shy", "http://www.freesmileys.org/smileys/smiley-basic/shy.gif");
    btns += emoIcon("x", "Censored", "http://www.freesmileys.org/smileys/smiley-forum/censored.gif");
    btns += emoIcon("x", "Stop", "http://www.freesmileys.org/smileys/smiley-forum/stop.gif");
    btns += emoIcon("x", "Ashamed", "http://www.freesmileys.org/smileys/smiley-ashamed005.gif");
    btns += emoIcon("x", "NoIdea", "http://www.freesmileys.org/smileys/smiley-confused005.gif");
    btns += emoIcon("x", "Beer", "http://www.freesmileys.org/smileys/smiley-eatdrink004.gif");
    btns += emoIcon("x", "Cigar", "http://www.smileyfaze.tk/thumbs/cigar.gif");
    btns += emoIcon("x", "Sweat", "http://www.freesmileys.org/smileys/smiley-gen113.gif");
    btns += emoIcon("x", "Ppew!...", "http://www.smiley-lol.com/smiley/ordinateurs/chatter.gif"); 
    btns += emoIcon("x", "LaOla2", "http://www.freesmileys.org/smileys/smiley-happy110.gif");
    btns += emoIcon("x", "Hiding", "http://www.freesmileys.org/smileys/smiley-scared003.gif");
    btns += emoIcon("x", "Peace!", "http://www.smileyvault.com/albums/userpics/10001/victory-smiley.gif"); 
    btns += emoIcon("x", "Censored", "http://www.freesmileys.org/smileys/smiley-forum/censored.gif"); 
    btns += emoIcon("x", "GoodLuck!", "http://www.smiley-lol.com/smiley/heureux/goodluck.gif"); 
    btns += emoIcon("x", "Thank you!", "http://www.smileyvault.com/albums/basic/smileyvault-flowers.gif");
    btns += emoIcon("x", "hey!", "http://foolstown.com/sm/yaya.gif");
    btns += emoIcon("x", "hey! II", "http://www.freesmileys.org/smileys/smiley-greet013.gif");
    btns += emoIcon("x", "Laugh", "http://www.freesmileys.org/smileys/smiley-basic/laugh.gif"); 
    btns += emoIcon("x", "I did not say that!", "http://www.freesmileys.org/smileys/smiley-shocked002.gif");
    btns += emoIcon("x", "Cool", "http://www.freesmileys.org/smileys/smiley-basic/cool.gif");
    btns += emoIcon("x", "Lifting", "http://www.sherv.net/cm/emo/funny/1/weight-lifting-emoticon.gif");
    btns += emoIcon("x", "wink", "http://foolstown.com/sm/wink.gif"); 
    btns += emoIcon("x", "Hehe", "http://img204.imageshack.us/img204/8863/wink2a.gif"); 
    btns += emoIcon("x", "whao?", "http://www.freesmileys.org/smileys/smiley-basic/spock.gif"); 
    btns += emoIcon("x", "...", "http://i6.photobucket.com/albums/y236/demonferret/Emoticons/th_thninjav1.gif"); 
    btns += emoIcon("x", "Angel", "http://www.freesmileys.org/smileys/smiley-basic/angel.gif"); 
    btns += emoIcon("x", "Yeap!", "http://www.smileyhut.com/yes_no/yes.gif"); 
    btns += emoIcon("x", "yeah... right!", "http://img205.imageshack.us/img205/143/acute.gif"); 
    btns += emoIcon("x", "whining", "http://www.freesmileys.org/smileys/smiley-sad045.gif"); 
    btns += emoIcon("x", "RollEyes", "http://www.freesmileys.org/smileys/smiley-basic/rolleyes.gif"); 
    btns += emoIcon("x", " ... thinking ...", "http://www.smileyfaze.tk/slides/imthinkin6.gif"); 
    btns += emoIcon("x", "Hmm...", "http://smileys.on-my-web.com/repository/Thinking/thinking-012.gif"); 
    btns += emoIcon("x", "Confused", "http://forums.mozillazine.org/images/smilies/eusa_think.gif");
    btns += emoIcon("x", "Hmmm...", "http://www.freesmileys.org/smileys/smiley-think005.gif"); 
    btns += emoIcon("x", "Doh", "http://forums.mozillazine.org/images/smilies/eusa_doh.gif"); 
    btns += emoIcon("x", "Doh", "http://smileyjungle.com/smilies/doh13.gif"); 
    btns += emoIcon("x", "Doh!..", "http://www.smileyvault.com/albums/basic/smileyvault-slaphead.gif");
    btns += emoIcon("x", "nobody home", "http://www.smileyfaze.tk/slides/knockanyonehome.gif"); 
    btns += emoIcon("x", "Oi!", "http://www.freesmileys.org/smileys/smiley-ashamed005.gif"); 
    btns += emoIcon("x", "palmface", "http://i.imgur.com/J5gci.gif"); 
    btns += emoIcon("x", "shame", "http://forum.userstyles.org/plugins/Emotify/design/images/109.gif");
    btns += emoIcon("x", "NoIdea", "http://www.freesmileys.org/smileys/smiley-confused005.gif"); 
    btns += emoIcon("x", "Thank you!", "http://www.smileyfaze.tk/slides/adoreen7.gif"); 
    btns += emoIcon("x", "Bow", "http://www.theabeforum.com/images/emoticons/New/bow.gif");  
    btns += emoIcon("x", "hatoff", "http://www.smileyfaze.tk/slides/hi.gif"); 
    btns += emoIcon("x", "welcome!", "http://www.smileyfaze.tk/slides/Im%20good01.gif"); 
    btns += emoIcon("x", "floored", "http://img301.imageshack.us/img301/6272/floored.gif"); 
    btns += emoIcon("x", "Nosepunch", "http://smileyjungle.com/smilies/fighting0.gif"); 
    btns += emoIcon("x", "ThumbsUp", "http://www.smiliesuche.de/smileys/grinsende/grinsende-smilies-0189.gif");
    btns += emoIcon("x", "?", "http://s4.postimage.org/wf7ys33ft/QUESTION_MARK_swivel_animated.gif"); 
    btns += emoIcon("x", "....", "http://www.dogforums.com/images/smilies/smilies/bored.gif"); 
    btns += emoIcon("x", "coffee break", "http://www.smileyvault.com/albums/userpics/10001/coffee-news.gif"); 
    btns += emoIcon("x", "huh?", "http://www.smileyfaze.tk/slides/peekaboo02.gif");
    btns += emoIcon("x", "Shucks!", "http://www.121s.com/images/emoticons/Kick_Can_emoticon.gif");
    btns += emoIcon("x", "Hahaha!...", "http://www.smiley-lol.com/smiley/heureux/totalmdr.gif"); 
    btns += emoIcon("x", "Hehe!...", "http://www.smiley-lol.com/smiley/heureux/lol/lulz.gif"); 
    btns += emoIcon("x", "LOL", "http://www.smiley-lol.com/smiley/heureux/lolfun.gif");
    btns += emoIcon("x", "Dive", "http://www.picgifs.com/smileys/smileys-and-emoticons/diving/smileys-diving-207114.gif");
    btns += emoIcon("x", "Dive2", "http://www.picgifs.com/smileys/smileys-and-emoticons/diving/smileys-diving-872829.gif");
    btns += emoIcon("x", "PM!", "http://www.shotpix.com/images/60275277421165062575.gif");
    btns += emoIcon("x", "Chocolate", "http://www.smileyvault.com/albums/userpics/10172/chocolate.gif");
    btns += emoIcon("x", "Useless Information", "http://i.imgur.com/4OAgS.gif");
    btns += emoIcon("x", "Yay!", "http://img204.imageshack.us/img204/6302/yayrn.gif");
    btns += emoIcon("x", "Excited", "http://www.freesmileys.org/smileys/smiley-basic/excited.gif");
    btns += emoIcon("x", "Excited I", "http://freesmileyface.net/smiley/respect/respect-040.gif");
    btns += emoIcon("x", "Excited II", "http://www.9thgencivic.com/forum/images/smilies/AnimatedOrangeSlice%5B1%5D.gif");
    btns += emoIcon("x", "wrong", "http://content.sweetim.com/sim/cpie/emoticons/00020179.gif");
    btns += emoIcon("x", "Need Help Please", "http://img855.imageshack.us/img855/7305/needhelppleasepurpleshi.gif");
    btns += emoIcon("x", "Thankyou sig", "http://img444.imageshack.us/img444/3672/thankyousignature.gif");
    btns += emoIcon("x", "Thankyou so much", "http://i.imgur.com/g2C4Z.gif");
    btns += emoIcon("x", "Just a quick note to say thankyou", "http://img42.imageshack.us/img42/9062/justaquicknotetosaythan.gif");
    btns += emoIcon("x", "Thankyou so much", "http://s4.postimage.org/yanp63xg/Thankyou_so_much_peach_fold_flower_trans_bg_an.gif");
    btns += emoIcon("x", "Thankyou so much", "http://i.imgur.com/isZLv.gif");
    btns += emoIcon("x", "Thankyou so much", "http://i.imgur.com/jSoCW.gif");
    btns += emoIcon("x", "Thankyou very much", "http://i.imgur.com/BFaqd.gif");
    btns += emoIcon("x", "Thanks a bunch", "http://www.shotpix.com/images/02652697015451647655.gif");
    btns += emoIcon("x", "Thankyou very much", "http://i.imgur.com/SnJ1v.gif");
    btns += emoIcon("x", "Thanks for the Thanks", "http://img201.imageshack.us/img201/3914/typewriterthanksforthet.gif");
    btns += emoIcon("x", "Thankyou", "http://s4.postimage.org/56tmgzlex/Thankyou_flower_writes_text_animated.gif");
    btns += emoIcon("x", "Thankyou", "http://s4.postimage.org/xm7gy4yu1/THANKYOU_red_text_with_red_rose_trans_bg_anima.gif");
    btns += emoIcon("x", "Thankyou", "http://s7.postimage.org/4kaoyln5z/Thankyou_written_with_featherpen_darkred_trans.gif");
    btns += emoIcon("x", "Flowers-Cat", "http://yoursmiles.org/tsmile/kitten/t09151.gif");
    btns += emoIcon("x", "Love ya!", "http://www.messhits.com/emoticons/love-emoticon10-(messhits.com).gif");
    btns += emoIcon("x", "Flowers", "http://www.smileyvault.com/albums/basic/smileyvault-flowers.gif");
    btns += emoIcon("x", "Flowers 2", "http://i827.photobucket.com/albums/zz192/denistephenson/smileys/smiley%20love/smilie_love_012.gif");
    btns += emoIcon("x", "Flowers 3", "http://www.picgifs.com/smileys/smileys-and-emoticons/flowers/smileys-flowers-326174.gif");
    btns += emoIcon("x", "Palm Tree", "http://image.fg-a.com/palm4.gif");
    btns += emoIcon("x", "Blush", "http://yoursmiles.org/tsmile/emb/t1831.gif");
    btns += emoIcon("x", "Blush II", "http://yoursmiles.org/tsmile/emb/t1813.gif");
    btns += emoIcon("x", "Mowing", "http://fc01.deviantart.net/images/large/icon/emoticons/Mowing_the_grass_emoticon.gif");
    btns += "</div>";
    bdiv.innerHTML += btns;
    editbar.appendChild(bdiv);
    var btnCon = $c("div",{id:"btnBox"});
    var Lbtn = $c("button", {id:"boxLeft",textContent:"Left"}, [{type:"click",fn:function(e){moveBox(e)}}]);
    var Ubtn = $c("button", {id:"boxTop",textContent:"Top"}, [{type:"click",fn:function(e){moveBox(e)}}]);
    var Dbtn = $c("button", {id:"boxBottom",textContent:"Bottom"}, [{type:"click",fn:function(e){moveBox(e)}}]);
    var Rbtn = $c("button", {id:"boxRight",textContent:"Right"}, [{type:"click",fn:function(e){moveBox(e)}}]);
    var Cbtn = $c("button", {id:"boxClose",textContent:"Close"}, [{type:"click",fn:function(){closeBox()}}]);
    btnCon.appendChild(Lbtn);
    btnCon.appendChild(Ubtn);
    btnCon.appendChild(Dbtn);
    btnCon.appendChild(Rbtn);
    btnCon.appendChild(Cbtn);
    bdiv.appendChild(btnCon);
} }
function emoIcon(x, name, url) { 
  if(tagtype == "html") return "<span id='srEmoticons_" + name + "' title='" + name + "' onmousedown='emoticonInsert(\"<img src=\\\"" + url + "\\\"/>\")' onmouseover='getIt(\"" + x + "\", \"" + url + "\")'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
  if(tagtype == "bbcode") return "<span id='srEmoticons_" + name + "' title='" + name + "' onmousedown='emoticonInsert(\"[img]" + url + "[/img]\");' onmouseover='getIt(\"" + x + "\", \"" + url + "\")'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}
function initEmoticons() {
  var editbar = document.body;
  if(editbar) {
    setEmoticons();
    return true;
  }
  return false;
}
function hideViewer() {
  $("#viewer").style.display = "none";
}
function showHide(e) {
  if(e.button == 1 && e.target.nodeName == "TEXTAREA") setBox();
  if(e.keyCode == 27) {
    closeBox();
    e.preventDefault();
} }
function moveBox(e) {
  setValue("smileyPosition", e.target.id);
  setBox();
}
// ========== Set Viewer Position In Reference To Container Position ==============================
function setBox(e) {
  $("#srEmoticons").style.display = "block";
  switch(getValue("smileyPosition")) {
    case "boxLeft":
      $("#srEmoticons").setAttribute("style", styleLeft); 
      addStyle('#viewer{bottom:auto; left:354px; right:auto; top:0}'); break; //viewer: left 354px, top 0 
    case "boxTop": 
      $("#srEmoticons").setAttribute("style", styleTop);
      addStyle('#viewer{bottom:auto; left:0; right:auto; top:254px}'); break; //viewer: left 0, top 254px
    case "boxBottom": 
      $("#srEmoticons").setAttribute("style", styleBottom);
      addStyle('#viewer{bottom:254px; left:0; right:auto; top:auto}'); break; //viewer: left 0, bottom 254px
    case "boxRight": 
      $("#srEmoticons").setAttribute("style", styleRight);
      addStyle('#viewer{bottom:auto; left:auto; right:354px; top:0}'); break; //viewer: right 354px, top 0
} }
// ========== Close Container And Remove Listener =================================================
function closeBox() {
  $("#srEmoticons").setAttribute("style", "display:none");
  document.removeEventListener("keypress", function(e) {showHide(e)}, false);
}

// ========== Sets Preference On First Run ========================================================
if(!getValue("smileyPosition")) setValue("smileyPosition", "boxRight");

// ========== Create Smiley Button ================================================================
var Sbtn = $c("button", {id:"smileyBtn", title:"Smileys"}, [{type:"click",fn:function(e){setBox(e); e.preventDefault()}}]);

// ========== Sets Listener For Middle Click In Textarea ==========================================
var textA = $("TEXTAREA");
for(var i = 0; i < textA.length; i++) textA[i].addEventListener("click", function(e) {showHide(e)}, false);

// ========== Header Tab For forums.userstyles.org and choggi.org Linking To userstyles.org site ==
if(chog || fuso) {
  if(!$("#styles-site")) {
    var ss1 = "Styles Site", ss2 = "Go to userstyles.org", ss3 = "http://userstyles.org";
    var menu = $("#Menu"), stylesSite = $c("li", {id:"StylesSite"});
    stylesSite.appendChild($c("a", {title:ss2, textContent:ss1, href:ss3}));
    menu.insertBefore(stylesSite, menu.lastElementChild);
} }

// ========== Sets Sites Tag Type =================================================================
if(chog || fuso) {
  var tagtype = "html";
  if($("#vanilla_discussion_index") || $("#vanilla_post_editdiscussion") || 
  $("#conversations_messages_index") || $("#vanilla_post_discussion") || $("#conversations_messages_add")) 
    initEmoticons();
  if($("#dashboard_activity_index") || $("#dashboard_profile_index") || $("#dashboard_profile_activity")) 
    initEmoticons();
}
if(cbsf || fmzo || fhto || fbrd || fbrn || fpdc || ftnc || gimp) {
  var tagtype = "bbcode";
  initEmoticons();
}
if(usso) {
  var tagtype = "html";
  initEmoticons();
}
if(tmpg || ffff) {
  var tagtype = "bbcode";
  ta = document.evaluate("//textarea[@name='message']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  ta.snapshotItem(ta.snapshotLength-1).id = "message";
  initEmoticons();
}

// ========== Smiley Insert Script ================================================================
var scriptElement = $c("script");
scriptElement.type = "text/javascript";
scriptElement.innerHTML = "function emoticonInsert(instext) {var doc = document.activeElement.id; var input = document.getElementById(doc); var start = input.selectionStart; var end = input.selectionEnd; input.value = input.value.substr(0, start) + instext + input.value.substr(end); var pos = start + instext.length; input.selectionStart = pos; input.selectionEnd = pos; input.focus()}";
document.getElementsByTagName("head")[0].appendChild(scriptElement);

// ========== Viewer Script =======================================================================
if(viewer) {
  var scriptElement2 = $c("script");
  scriptElement2.type = "text/javascript";
  scriptElement2.innerHTML = "function getIt(x, e){if(x){var box = document.getElementById('viewer'); box.innerHTML = '<img src=' + e + ' height=100% width=100%>'; box.setAttribute('style','display:block');}else{document.getElementById('viewer').style.display='none'}}";
  document.getElementsByTagName("head")[0].appendChild(scriptElement2);
  var popupdiv = $c("div", {id:"viewer"});
  document.body.appendChild(popupdiv);
  $('#viewer').style.display = "none";
}

// ========== Position Smiley Button By Site ======================================================
if(chog || fuso) {
  document.body.appendChild(Sbtn);
  addStyle("#smileyBtn{position: fixed; right: 6px; top: 10px;}");
}
if(chog) {
  setEmoticons();  // Fix for choggi.org
}
if(cbsf || fmzo) {
  var sb = document.getElementById('smiley-box');
  sb.insertBefore(Sbtn, sb.firstChild);
  addStyle("#smiley-box{text-align: center}#smileyBtn{margin: 0 auto}")
}
if(fbrd || fbrn || ffff || fhto || fpdc || ftnc || gimp || tmpg) {
  ta = document.evaluate("//table[@cellspacing='5']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  ta.snapshotItem(ta.snapshotLength-1).id = "smiley-box";
  var sb = document.getElementById('smiley-box');
  sb.insertBefore(Sbtn, sb.firstChild);
  addStyle("#smileyBtn{margin: 0 auto}")
}
if(usso) {
  var sb = document.getElementById('new_message');
  sb.insertBefore(Sbtn, sb.firstChild);
  addStyle("#smileyBtn{margin: 75px auto -75px auto}");
}

// ========== CSS Section =========================================================================
var styleTop = "\
  max-height: 250px;\
  right: 0;\
  top: 0;\
  overflow-x: hidden;\
  overflow-y: auto;\
  width: auto;\
";
var styleBottom = "\
  max-height: 250px;\
  right: 0;\
  bottom: 0;\
  overflow-x: hidden;\
  overflow-y: auto;\
  width: auto;\
";
var styleLeft = "\
  max-height: 100%;\
  left: 0;\
  overflow-x: hidden;\
  overflow-y: auto;\
  top: 0;\
  width: 350px;\
";
var styleRight = "\
  max-height: 100%;\
  overflow-x: hidden;\
  overflow-y: auto;\
  right: 0;\
  top: 0;\
  width: 350px;\
";
addStyle("\
  .EmotifyWrapper,.EmotifyDropdown {\
    display: none !important;\
  }\
  #srEmoticons {\
    border: none;\
    box-shadow: none;\
    display:block;\
    position:fixed;\
    z-index:1001;\
  }\
  #emoContainer {\
    background: rgba(250,250,250,.9);\
    border: 1px solid #FFF;\
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3) inset;\
    border-radius: 10px;\
    padding: 4px;\
  }\
  #srEmoticons img {\
    border: 1px solid transparent;\
    border-radius: 3px;\
    max-height: 60px;\
    max-width: 60px;\
    padding: 4px;\
    vertical-align: middle;\
  }\
  #srEmoticons img:hover {\
    background: #FFF;\
    border: 1px solid #FFF;\
    border-radius: 3px;\
    box-shadow: 0 1px 2px #000 inset, 2px 2px 2px #222;\
  }\
  #btnBox {\
    border: none;\
    padding: 2px;\
    text-align: center;\
  }\
  #btnBox button {\
    -moz-appearance: none;\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAB4CAYAAAD7VHJWAAABRElEQVR42u3Y0Q3CIBAA0GMCh/JHB9C4gBvov/+6gQsYHUB/HMoJ6mFaQ5DjgLNNlbuEaAq8FloOqwFhGAWGAxqqfQpgOy+xnEuArvOl/Z4FuJ3dYSQBfmfyJEbQuT9APAQKyZrEEJJ9G32k6EFyEZAAZCigQGXAV/YFGx9LOieh2Fj4SE5KgxBSmlTfiCStvxAKiM1TE6sMYSZ2rBIgFMkAGwooUAkgXkzjyAfDA+K0Lt5YUpDo1sYhSZsrhWRt7z4CUPADw0WC7ce/GhVQYFyAeDGRfwHkALZtUkLhtjM2pTXAXxn7vpAytOj7Qu8AOwTRJIYi6zZSgPhBCrb/ndWogAJVAzuACX6ssUzbQ3csRzz+YIG28wnLzKu6YVl1SAzY4MeeqN5i/YEDroGzv68C6+e9A+IhyCbRQcpuY2oo8BfAE1OQhG0b/KZpAAAAAElFTkSuQmCC) no-repeat, linear-gradient(#EEE, #AAA);\
    border: 1px solid #FFF;\
    border-radius: 3px;\
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3) inset, 2px 2px 2px #222;\
    height: 26px;\
    margin: 0 3px;\
    min-width: 32px;\
    padding: 0 4px;\
    text-indent: 12px;\
    text-align: left;\
  }\
  #btnBox button:hover {\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAB4CAYAAAD7VHJWAAAE0UlEQVR42u2YX0xbVRzHv6e9bWnLLQMkyBgdG38S2Z+48U9QcXEv24tvRhNj1AwTX7Zkcwb/ZDHGxLg4t8S9mMiixphofPNle5lBVDr+bZMxTAZsrIwhQWBQ2lJ625+/c9sCGZReIO5BepJfzmnv/X3uOb+e+z2/XwU22EQa8IgAvxzNItk/f35arBnw63F8uu/1A01dzdfWDpDOlY3PNjnsXWg9Bxw4HzQOkM41xxqabOY2iJCG/pYcBHwqAnPsEgE0TcGtgeDKAOm898jBpqyc34FQiA0gvwCF+PZ5fuocEA0puNm1wgxkwPYcqYtkF7SZzeEZEN8sAdKJQvExWzQI9CYDFNaF/e6aoCNDIYG4EwVjvW5xaG93khjokBqff0clORWQPu2JfgFNxjAsl0GIzgt4Byl5ECXEXeXTiirIbBEkOn8WcO3IhKK4QON+GRRYndrqP6OE5Jf4prfvItfFH+nei81wr3kjSUh2vu+fqTH1sXXtxARE9usGrNbSgDRgMwE29DIlJC6noiGj79tLZ547h3cNAxLS5q4jh0VVhW+8Gj0XLp9eCkkpae5qUiwOXoHCKmayscrXouOL1gVIUlGVUlb6NLksThLCzM5s0E3hA6YO3c2/6ZAVZV1KWFkt5TqyWdb5ycK0CIjB7Jj11UKelysCZD8RnB52bxVFO/cAuW6WbwZF+fbBq9m43xPksTV1EP/6WqUtZj/yi6N6DKIwofdKEZ48cXfBb1VA/3eFlDn/N/LdkRiA19LR5kb9+0PGALfObiHVPoP8bTx5S2wG7Z0MOGUU8LmFz7YoCgojehCjJis8V91o+GjAGGDoS0GjfQJOZ5T3gNwHVnTdzkPj9yPGAEZaGpAGbAZA8yuFVLVzHCI6zwb4/SYUVBCK3yJjL1Prh6VUt98LkwSwpoyOmOHXTCh/O2wM0PZxMdVWM4ClhMLA2D0TfEEXyk88MAj4pJhq6hlAPH+NAV4zZq2Po+xVg3pw/ex22v3UsD4DHTBkwoOIE0+84UsOSMi6iVP0rXvtKNk/xWMCMWDCK3D7BuC9T8O59qyipICqxn3IVNs5cEEQB0+WODKIciVyJoEpQf3tYkLmz0lLHr3YUj3srC0C2MJ+QQN/iJmxQTVLHvepiy4bzyQa0p8cDnCR0Sk0b5eqJHKFlGWfLL7UvE6EfT7yekRgpEN1Lk00DBWeFa8dOjnZ1zo34rE4H85S0vVCGpAGPErAhl+mhMxd+6bl9JrqhURrOWqnhuOshcGqhSw9KUAeZ+WldiiKpmfnjgyCQ/Wh7MAkyKYgFKlfvV64fspKu6pY1m0aKIO/4KRc2Dhbd3IYbPzZZsP05DMLlcsywJ8fgHZLgJ1VWHeQAMRgcsx9xOLC1Gh95MYFj3kZoOc9BlTGbkbcSXe0L47nNEHeDntAauQygOeYidwlAiYrT9nKly0ExU7ILSN9OfKPnzvdwp9Q52UAmWDP+2Wd44TIc0LTZjBzZxbVLxDCJGi4T0QMnwuJ9lMjvIdfEtvu3lw8kda8kZL9l5Q+F9KANGBzAPgdzuLuTbaD8a8us33FTtMpAXHnH9gOPXTpEtvLCchqgJPcfZbk8jvseCYV4OIKT1+YBTse/s8BG17CxoK4BLK+n9FoSwP+F4B/AWpfQpPICX+4AAAAAElFTkSuQmCC) no-repeat, linear-gradient(#AAA, #EEE);\
  }\
  #btnBox button#boxLeft {\
    background-position: 0 0;\
  }\
  #btnBox button#boxTop {\
    background-position: 0 -23px;\
  }\
  #btnBox button#boxBottom {\
    background-position: 0 -48px;\
  }\
  #btnBox button#boxRight {\
    background-position: 0 -72px;\
  }\
  #btnBox button#boxClose {\
    background-position: 0 -96px;\
  }\
  #smileyBtn {\
    -moz-appearance: none;\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAACZ0lEQVR42pWUS2gTURSG/yuTOKUTzSIbcZHWIkGENoIibYWQuBAVFcSpIkip7sRWKrrpwoWg4CoFW6gixYoIJiCoYFWEKNp0UdGmghBr7cNCFLoY25EMycB4H5N0kk4sHrjcx8z9OP/POZfAJQ62Kiqd1C3BFnV+NsvPgo0h5OYzSbpMjo7ryeo7xAWSoKdqpMXAgX0mQo3iPDsLvHwv4W1GBiwO66gJiu7ZbEVDeVzu2QBJkQBJEh9Mkw4Dpm7C1ICbD7xIT9chNfGbrAExSF/nMiKxengUv7hcAtmwoqFTGBtAKkXQ/2JTGUZKciJhQ73ULcMjK5UAFmzPwDSKuiZgS0D/Qy/GZ7xcJuHGEiSeDBk0k0AZEj2u4+k1Db5wA9+vTM7h6FU/UglZZKbp0KlvnYMK84yDVrNhkkpSa4EeK+WsjJ/AQEJkRc6eareunBhDU7N/VZYtY41E2zcO0jQub+oTMPy5HWT/3oD17NYSJL8NcgNUhROk/wDODAdsUJyBFCFtHYgTxKQxUNd9CmLSuo+MYecuBSMjf7C72UI42lCbQuVNvlvEhymCY/Tf7zPAnS9UWsnsni4T2WmgN+5fNyMW8V4NW+k8NGqbbfdV4tF1nVYzOKxvQMHz9Ior4FCbDzcu6BzCCvPcPe5rR0VBnlfNMoxlVucxKyD5osQzCfqEN7ffSPi4KIuCdLbI6dgyTkYsarxoUrdgECNHWyRDcHeiqkWcsLbteVw8XIDkqywp2quQc2I9+FpCeq7evWlLwZ8R+ha1NhUQ21HAtoA4X/gFvPpKu/7bRhBi/fsZccD++2H7C2kzLlqYRDEZAAAAAElFTkSuQmCC) no-repeat center;\
    display: none;\
    border: none;\
    height: 18px;\
    padding: 0;\
    visibility: collapse;\
    width: 18px;\
    z-index: 1000;\
  }\
  #viewer {\
    background: #FFF;\
    border: 1px solid #FFF;\
    border-radius: 10px;\
    box-shadow: 0 1px 2px #000 inset, 2px 2px 2px #222;\
    height: auto;\
    padding: 10px;\
    position: fixed;\
    z-index: 1001;\
  }\
");

// ========== Display Smiley Button and Set Esc Key ===============================================
if($("#Form_Body") || $("#Form_Comment") || $("#message") || $("#message_body")) {
  addStyle("#smileyBtn{display: block; visibility: visible;}");
  document.addEventListener("keypress", function(e) {showHide(e)}, false);
}