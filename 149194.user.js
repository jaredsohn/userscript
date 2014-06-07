// ==UserScript==
// @name        KoL Enhancer
// @namespace   andysouter.net/userscripts/kolenhancements
// @include     http://www.kingdomofloathing.com/*
// @include     http://kol.obeliks.de/buffbot/buff
// @include     http://kol.coldfront.net/thekolwiki/index.php/*
// @version     0.72
// @grant       none
// ==/UserScript==

document.kole = window.kole = {

 hintDelay: 140, // in milsec
 hintFadeTime: 220, // in milsec
 hintOpacity: 0.93,
 hintFontSize: "0.9em",
 frameBorderColour: "red",
 nightModeBorderColour: "blue",
 nightModeColour: 135,

 defaultSettings:{
  nightMode: false,
  hoverHint: true,
  wiki: true,
  nightShade: 1,
  twang: false,
  wossname: false,
  wossnameNum: 65,
  chatSound: "http://rpg.hamsterrepublic.com/wiki-images/0/04/TextboxBloop8-Bit.ogg",
  chatSoundPhrases: ""
 },
 warBattles: [
  // hippy
  /a War Hippy .+/,
  "Bailey's Beetle",
  "a Green Ops Soldier",
  "a Mobile Armored Sweat Lodge",
  "a Glass of Orange Juice",
  "Neil",
  /Slow Talkin' Elliot/,
  "Zim Merman",
  /C\.A\.R\.N\.I\.V\.O\.R\.E\. Operative/,
  // frat
  /a War Frat .+/,
  "a Beer Bongadier",
  "an Elite Beer Bongadier",
  "a Heavy Kegtank",
  "a Naughty Sorority Nurse",
  "a Panty Raider Frat Boy",
  "a Sorority Nurse",
  "a Sorority Operator",
  /Brutus, the toga-clad lout/,
  "Danglin' Chad",
  "Monty Basingstoke-Pratt, IV",
  "a Next-generation Frat Boy"
  // /giant/i, // <- for testing :)
 ],
 prepositions:[
   "about", "above", "across",
   "after", "against", "along",
   "among", "around", "at",
   "before", "behind", "below",
   "beneath", "beside", "between",
   "beyond", "by", "down",
   "during", "except", "for",
   "from", "in", "inside",
   "into", "like", "near",
   "of", "off", "on",
   "onto", "out", "outside",
   "over", "past", "through",
   "throughout", "to", "under",
   "up", "upon", "with",
   "within", "without"
 ],

 nightShades:[0.8, 0.6, 0.4, 0.2],
 userSettings: null,

 twang:function(s, test){
  if(s.length = '') return '';
  // return original if /command, except /me|/em
  if(s[0] == '/'){
    var spl = s.split(" ");
    if((spl[0] != '/me') && (spl[0] != '/em')) return s;
  }
  var i;
  var antiloop = 0;
  var nbsp = test ? "#" : "\xa0";
  for(i = 0; i < this.prepositions.length; i++){
    if(s == this.prepositions[i]) return s + nbsp;
    var rex = new RegExp("\\s("+this.prepositions[i]+"(\\W|\$))", 'gi');
    s = s.replace(rex, "\t$1");
    var rex = new RegExp("((^|\\W)"+this.prepositions[i]+")\\s", 'gi');
    s = s.replace(rex, "$1\t");
  }
  // quick /haiku fix
  s = s.replace(/\t\//g, " /"); s = s.replace(/\/\t/g, "/ "); 
  s = s.replace(/\t+/g, nbsp);
  return s;
 },

 isWarBattle: function(name){
  var comp;
  for(var i = 0; i < this.warBattles.length; i++){
    comp = this.warBattles[i];
    if(typeof comp == 'object'){
      if(comp.test(name)) return true;
    } else {
      if(comp == name) return true;
    }
  }
  return false;
 },

 init:function(){

  //twang test:
  //alert(this.twang("in out in out / in out in out / in out in out", true));

  if(!document.body){
    console.log("body was undefined. bizarre."); // yeah, it happened in chrome sometimes.
    setTimeout(kole.init, 150);
    return false;
  }

  document.body.style.backgroundColor = null;

  if(window.location.href == 'http://kol.obeliks.de/buffbot/buff') return kole.initBuffy();
  if(window.location.hostname == "kol.coldfront.net") return kole.initWiki();

  // load and parse stored user settings
  kole.reloadSettings();

  if(document.getElementsByTagName("frameset").length > 0) return kole.initTop();
  if(document.getElementById("InputForm")) kole.chatInit();

  // prevents popup blocking problems for wiki-linking:
  if(window.location.hash.substring(1,10) == "koleWiki:"){
    return kole.redirectWiki(window.location.hash.replace("#","").substring(9,255));
  }


  if(kole.isChrome()){
    kole.hintCache = {};
    //frame-local hintcache for chrome :(
  } else {
    kole.hintCache = top.hintCache;
  }

  // make expired familar names readable in night mode
  if(document.getElementsByClassName("expired").length > 0){
    kole.addStyle(".expired td", "color:rgba(0,0,0,0.6)");
  }

  // create and configure hint element
  var hint = kole.hintBox = document.createElement("div");
  hint.arrow = document.createElement("div");
  hint.appendChild(hint.arrow);
  hint.arrow.style.opacity = 0.5;
  kole.addStyle("#koleHint", "display:none; overflow:auto; position:fixed; border:1px rgba(0,0,0,0.6) solid; border-radius:6px; padding:12px 0px; background-color:inherit; box-shadow:inset -1px -1px 2px rgba(0,0,0,0.5); font-size:"+kole.hintFontSize);
  kole.addStyle(".hintArrowLeft", "position:absolute; width:1px;height:1px; border:5px solid; border-color:transparent #000000 transparent transparent; left:5px");
  kole.addStyle(".hintArrowRight", "position:absolute; width:0px;height:0px; border:5px solid; border-color:transparent transparent transparent #000000; left:263px");
  hint.onmouseover = kole.hintMouseOut;
  kole.setTransition(hint, kole.hintFadeTime + "ms opacity");
  hint.id = "koleHint";
  document.body.appendChild(hint);

  // add some css
  kole.addStyle("#nightBg", "position: fixed; top:0px; left:0px; right: 0px; bottom:0px; overflow:auto; background:rgba(255,0,0,0.2); z-index:10000; pointer-events:none; padding:12px; opacity:0;");
  kole.addStyle("body.nightMode #nightBg", "opacity:1");
  kole.addStyle("#tabs li", "background-color: inherit");
  kole.addStyle(".spacer, td.page", "background-color:transparent !important");
  kole.addStyle(".actionbar .blueback td img", "border:none");
  kole.addStyle(".actionbar .blueback td", "border:1px rgba(0,0,0,0.5) solid; box-shadow:1px 1px 2px rgba(0,0,0,0.4)");
  kole.addStyle(".actionbar .blueback td:hover", "border:1px rgba(0,0,0,0.8) solid; box-shadow:1px 1px 3px rgba(0,0,0,0.8); background:rgba(0,0,0,0.7)");
  kole.addStyle("#pop_query", "z-index: 10");
  kole.addStyle("a:link, a:visited, a:active", "color:#706060");
  kole.addStyle("a:link:hover, a:visited:hover", "color:#101010");
  kole.addStyle(".koleNote", "background:rgba(0,0,0,0.09);padding:12px;margin:12px;font-size:0.8em");
  kole.addStyle(".nightModeRadio", "position:relative;z-index:999999;display:inline-block; padding:6px 6px 6px 36px; margin-left:12px; vertical-align:right; border:3px solid #404040; border-radius:3px; box-shadow:inset rgba(0,0,0,0.3) -1px -1px 0px, inset rgba(255,255,255,0.45) 0px 0.55em 0px;cursor:pointer");
  kole.addStyle(".nightModeRadio:hover", "border-color:rgba(230,230,230,0.9)");
  kole.addStyle(".chatSoundPhrase", "background:rgba(255,255,0,0.34)");

  for (var i = 0; i < kole.nightShades.length; i++){
    var shade = 1-kole.nightShades[i];
    kole.addStyle("body.nightMode.nightShade" + i + " #nightBg", "background:rgba(0,0,0,"+shade+ ")");
  }

  // frame-specific init
  if(window.location.pathname.indexOf('topmenu.php') != -1){
    if(!kole.isChrome()){ // chrome doesn't like cross-frame interaction; no options sadly
      kole.insertKoleButton();
    }
    // apply a nice hover effect to the top icons
    kole.addStyle(".menuitem a", "opacity:0.3");
    kole.addStyle(".menuitem a:hover", "opacity:1");
  }
  if(window.name.indexOf('mainpane') != -1){
    kole.createOptions();
  }
  // apply hint mousein/out events and nightmode image darkeners
  kole.initElements();
  kole.setNightMode(kole.userSettings['nightMode']);




  var monNameEl = document.getElementById("monname");
  if(monNameEl && this.userSettings['wossname']){
    var monName = monNameEl.innerHTML;
    if(kole.isWarBattle(monName)){
      var battleCount = kole.getValue("wossnameCount");
      if(typeof battleCount == "undefined") battleCount = 0;
      var pattern = /You win the fight!/;
      if(pattern.test(document.body.innerHTML)){
        // won a fight.
        battleCount++;
        kole.setValue("wossnameCount", battleCount);
        var el = document.createElement("div");
        el.setAttribute("style", "position:fixed; bottom:0px; left:0px; padding:3px; background:rgba(0,0,0,0.1); color:#000000;");
        var remaining = this.userSettings["wossnameNum"] - battleCount;
        var pluralS = remaining == 1 ? "" : "s";
        el.innerHTML = remaining+ " battle" + pluralS + " remaining";
        document.body.appendChild(el);
        if(battleCount == this.userSettings["wossnameNum"]){
          kole.changeUserSetting("farm", false);
          el.style.fontSize = "2em";
          setTimeout(alert,200,"You have killed " + battleCount + " war enemies.");
          return;
        }
      } else {
        var el = document.createElement("div");
        el.setAttribute("style", "position:fixed; bottom:0px; left:0px; padding:3px; background:rgba(0,0,0,0.1); color:#000000;");
        var remaining = this.userSettings["wossnameNum"] - battleCount;
        var pluralS = remaining == 1 ? "" : "s";
        el.innerHTML = remaining+ " battle" + pluralS + " remaining";
        document.body.appendChild(el);
      }
    }
  }

  // below this line is ignored if wossname count reaches target



  if(this.userSettings['farm']){
    var anchors = document.getElementsByTagName("a");
    for(var i = 0; i < anchors.length; i++){
      if(anchors[i].innerHTML.substring(0, 17) == 'Adventure Again ('){
        this.farmTimer = setTimeout(function(a){
          a.click();
          if(window.kole.farmButton) window.kole.farmButton.style.opacity = 0.5;
        }, 5500, anchors[i]);
        this.addStopFarmButton(null, 5000);
      }
    }

    var btn12 = document.getElementById("button12");
    if(btn12 && (!this.farmTimer)){
      this.farmTimer = setTimeout(function(b){
        b.click();
        b.style.opacity = 0.5;
      }, 1200, btn12);
      this.addStopFarmButton(null, 1200);
    }
  }





 },

 isChrome:function(){
   return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
 },

 replaceUrlEncode: function(){
  if(window.URLEncode){
    window.URLEncode = function(s){
      return encodeURIComponent(s);
    };
  } else {
    setTimeout(kole.replaceUrlEncode, 200);
  }
 },

  addStopFarmButton: function(el, timeout){
    var btn = document.createElement("button");
    this.farmButton = btn;
    btn.innerHTML = "Cancel automation";
    btn.setAttribute("style", "box-shadow:inset 0px 0px 0px pink;background:#ffffff;border:2px #000 solid;display:block; margin:0px auto; width:400px; height:42px; line-height:42px")
    this.setTransition(btn, timeout + "ms all linear");
    setTimeout(function(btn){
      btn.style.boxShadow = "inset 400px 0px 0px pink";
    }, 10, btn);
    btn.onclick = function(){
      if(kole.farmTimer){
        kole.changeUserSetting("farm", false);
        clearTimeout(kole.farmTimer);
        this.style.display = "none";
      }
    };
    if(el){
      el.parentNode.insertBefore(btn, el);
    } else {
      btn.style.position = "fixed";
      btn.style.bottom = "0px";
      btn.style.right = "0px";
      btn.style.zIndex = 20;
      document.body.appendChild(btn);
    }
  },

 toggleOptions:function(){
  var mainframe = kole.findFrame('mainpane');
  if(!mainframe) return;
  var opts = mainframe.document.getElementById("koleOptions");
  if(opts.style.display == 'block'){
    opts.style.opacity = 0;
    setTimeout(function(){
      opts.style.display = 'none';
    },700);
  } else {
    var wossnameCount = kole.getValue("wossnameCount");
    if(typeof wossnameCount == "undefined") wossnameCount = 0;
    mainframe.document.getElementById("wossnameReset").innerHTML = "Reset counter (" + wossnameCount + ")";

    opts.style.display = "block";
    kole.setTransition(opts, "700ms opacity");
    opts.style.opacity = 1;
  }
 },

 grey:function(f){
  b = Math.round(f * 255);
  var hex = b.toString(16);
  while(hex.length < 2) hex = "0" + hex;
  return "#" + hex + hex + hex;
 },

 entity:function(s){
  if(s == null) return "";
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 },

 createOptions:function(){
  var opts = document.createElement("div");
  var wossnameCount = kole.getValue("wossnameCount");
  if(typeof wossnameCount == "undefined") wossnameCount = 0;
  kole.addStyle("#koleOptions", "position:fixed; top:0px; left:0px; right:0px; bottom:0px; display:none; opacity:0; background:inherit; padding:15px; overflow:auto");
  kole.addStyle("#koleOptions h1", "margin:0px; background:rgba(0,0,0,0.3); padding:8px; color:rgba(255,255,255,0.8); font-weight:normal");
  kole.addStyle("#koleOptions button", "padding:8px 32px; background:rgba(0,0,0,0.12); border:none; cursor:pointer; box-shadow:inset -1px -1px 1px rgba(0,0,0,0.6), inset 1px 1px 1px rgba(255,255,255,0.6)")
  kole.addStyle("#koleOptions button:hover", "background:rgba(0,0,0,0.2); box-shadow:1px 1px 3px rgba(0,0,0,0.22), inset -1px -1px 1px rgba(0,0,0,0.6), inset 1px 1px 1px rgba(255,255,255,0.6)")
  opts.id = "koleOptions";
  kole.setTransition(opts, "700ms opacity");
  var html = "<h1>KoL Enhancer Options</h1>"
  + "<p><input id='checkHoverHint' type='checkbox' " + (kole.userSettings['hoverHint'] ? " checked='1'" : "") + ">\n"
  + "<label for='checkHoverHint'>Show item/familiar/effect/skill descriptions on hover</label></p>"
  + "<p><input id='checkWiki' type='checkbox' " + (kole.userSettings['wiki'] ? " checked='1'" : "") + ">\n"
  + "<label for='checkWiki'>Open The KoL Wiki when I click an icon</label></p>"
  + "<p><input id='checkNightMode' type='checkbox' " + (kole.userSettings['nightMode'] ? " checked='1'" : "") + ">\n"
  + "<label for='checkNightMode'>Night Mode</label>";
  for(var i = 0; i < kole.nightShades.length; i++){
    var c = kole.grey(kole.nightShades[i]);
    var checked = (kole.userSettings['nightShade'] == i) ? "checked='1' " : "";
    html += "<label style='background:" + c + "' class='nightModeRadio' for='shade_" + i + "'><input type='radio' class='nightShade'" + checked + " name='nightShade' value='" + i + "' id='shade_" + i + "'></label>"
  }
  html += "</p>" 
  + "<p><input id='checkTwang' type='checkbox' " + (kole.userSettings['twang'] ? " checked='1'" : "") + ">\n"
  + "<label for='checkTwang'>Nullify the Sword Behind Inappropriate Prepositions chat effect</label></p>"

  + "<p><input id='checkFarmMode' type='checkbox' " + (kole.userSettings['farm'] ? " checked='1'" : "") + ">\n" 
  + "<label for='checkFarmMode' title='Automatically clicks \"Adventure again\" or the last button in the action bar'>Automatic Fighting</label></p>"
  + "<div class='koleNote'>"
  + "<p>Automatic Fighting is experimental and unpolished and exists as a temporary solution until an automation suite is added to KoLE. While enabled, it will click \"Adventure again\" when it appears, and the <i>last button in the combat action bar</i> otherwise.</p>"
  + "<p>The \"Stop Automatic Fighting\" button that appears will <b>turn off automatic fighting</b> until it is re-enabled in KoLE options.</p>"
  + "<p>The Combat Action Bar must be enabled in <a href='http://www.kingdomofloathing.com/account.php?tab=combat'>KoL Options &raquo; Combat</a> for Automatic Fighting to work.</p>"
  + "</div>"

  + "<p><input id='checkWossname' type='checkbox' " + (kole.userSettings['wossname'] ? " checked='1'" : "") + ">\n" 
  + "<label for='checkWossname'>Notify me after</label> <input id='inputWossnameNum' value='" + kole.userSettings['wossnameNum'] + "'> Frat/Hippy war kills <button id='wossnameReset'>Reset counter (" + wossnameCount + ")</button></p>"

  + "<div class='koleNote'>"
  + "<p>Automatic fighting will be disabled when the war counter reaches your target. Note that kills are counted per-browser, not per KoL account. Sidequest multiplier is <b>not</b> applied -- only <i>your</i> kills are counted.</p>"
  + "</div>"

  + "<p>Play a sound when any of <input id='inputChatSoundPhrases' value='" + kole.entity(kole.userSettings['chatSoundPhrases']) + "'> (comma-separated) is said in chat.</p>"
  + "Sound to play (URL): <input id='inputChatSound' value='" + kole.entity(kole.userSettings['chatSound']) + "'></p>"

  + "<center><button id='koleOptionsOk'>OK</button></center><br><br>"
  + "<p style='font-size:0.7em'>Comments? Questions? Requests? <a href='http://www.kingdomofloathing.com/sendmessage.php?toid=789720'>KMail fnoot</a>!</p>";
  opts.innerHTML = html;
  document.body.appendChild(opts);
  // add events outside of innerHTML, to help future chrome support (chrome seems to separate inline events from the userscript sandbox - "kole undefined")
  document.getElementById("checkHoverHint").onclick = kole.checkHoverHintClick;
  document.getElementById("checkNightMode").onclick = kole.checkNightModeClick;
  document.getElementById("checkWiki").onclick = kole.checkWikiClick;
  document.getElementById("checkTwang").onclick = kole.checkTwangClick;
  document.getElementById("checkFarmMode").onclick = kole.checkFarmClick;
  document.getElementById("koleOptionsOk").onclick = kole.toggleOptions;

  document.getElementById("checkWossname").onclick = kole.checkWossnameClick;
  document.getElementById("inputWossnameNum").onkeyup = kole.inputWossnameChange;
  document.getElementById("inputWossnameNum").onpaste = kole.inputWossnameChange;
  document.getElementById("inputWossnameNum").style.width = "80px";
  document.getElementById("wossnameReset").onclick = kole.wossnameResetClick;
  document.getElementById("inputChatSound").onkeyup = kole.inputChatSoundChange;
  document.getElementById("inputChatSound").onpaste = kole.inputChatSoundChange;
  document.getElementById("inputChatSoundPhrases").onkeyup = kole.inputChatSoundPhrasesChange;
  document.getElementById("inputChatSoundPhrases").onpaste = kole.inputChatSoundPhrasesChange;
  document.getElementById("inputChatSoundPhrases").style.width = "380px";
  document.getElementById("inputChatSound").style.width = "380px";

  var radios = document.getElementsByClassName("nightShade");
  for(var i = 0; i < radios.length; i++){
    radios[i].onclick = kole.radioNightModeClick;
  }
 },

 checkWossnameClick: function(ev){
  kole.changeUserSetting("wossname", ev.target.checked);
 },

 checkTwangClick: function(ev){
  kole.changeUserSetting("twang", ev.target.checked);
 },

 inputWossnameChange: function(ev){
  kole.changeUserSetting("wossnameNum", parseInt(this.value));
 },

 inputChatSoundChange: function(ev){
  kole.changeUserSetting("chatSound", this.value);
 },

 inputChatSoundPhrasesChange: function(ev){
  kole.changeUserSetting("chatSoundPhrases", this.value);
 },

 wossnameResetClick: function(ev){
  if(!confirm("Are you sure you want to reset your battlefield kill count?")) return;
  kole.setValue("wossnameCount", 0);
  ev.target.innerHTML = "Reset counter (" + kole.getValue("wossnameCount") + ")";
 },

 radioNightModeClick:function(ev){
  kole.changeUserSetting("nightShade", this.value);
  kole.applyGlobalNightMode(kole.userSettings['nightMode']);
 },

 checkWikiClick:function(ev){
  var checked = ev.target.checked;
  kole.changeUserSetting("wiki", checked);
 },

 checkFarmClick:function(ev){
  var checked = ev.target.checked;
  kole.changeUserSetting("farm", checked);
 },

 checkNightModeClick:function(ev){
  var checked = ev.target.checked;
  kole.changeUserSetting("nightMode", checked);
  kole.applyGlobalNightMode(checked);
 },

 checkHoverHintClick:function(ev){
  var checked = ev.target.checked;
  kole.changeUserSetting("hoverHint", checked);
  kole.findFrame('charpane').kole.userSettings = kole.userSettings;
 },

 applyGlobalNightMode:function(night){
  var shade = kole.userSettings['nightShade'];
  for(i=0;i<top.frames.length;i++){
    top.frames[i].document.body.className = night ? ("nightMode nightShade" + shade) : "";
  }
 },

 findFrame:function(name){
  for(i=0;i<top.frames.length;i++){
    if(top.frames[i].name == name) return top.frames[i];
  }
  return null;
 },

 insertKoleButton:function(){
  var icon = "http://images.kingdomofloathing.com/itemimages/guildapp.gif";
  var descEl = document.getElementById("description");
  if(!descEl) return;
  var tr = descEl.parentNode;
  var last = tr.childNodes[tr.childNodes.length-2]; // logout button
  var td = document.createElement("td");
  td.className='menuitem';
  td.width = 30; td.height = 30; td.valign='center';
  td.innerHTML = "<a href='#koleOptions' id='koleOptionsButton' return false'><img src='" + icon + "' width='30' height='30' title='KoLE Options' alt='KoLE Options'></a>";
  tr.insertBefore(td, last);
  document.getElementById("koleOptionsButton").onclick = kole.toggleOptions;
 },

 getValue: function(key, def){
  var val;
  // GM_getValue not available; fallback with localStorage
  if(localStorage){
    val = localStorage[key];
    if(typeof val == 'undefined'){
      return def;
    } else {
      return val;
    }
  }
 },

 setValue:function(key, val){

  if(localStorage){
    localStorage[key] = val;
  }
 },

 changeUserSetting:function(name, val){
  if(kole.userSettings instanceof Array){ kole.userSettings = {}; }
  kole.userSettings[name] = val;
  kole.setValue("userSettings", JSON.stringify(kole.userSettings));
  top.kole.framesReloadSettings();
 },

 initElements:function(once){
  kole.initNightBackground();
  kole.applyHintToTag("img");
  kole.applyHintToTag("a");
  if(!once) setTimeout(window.kole.initElements, 150);
 },

 initNightBackground:function(){
  var bg = document.getElementById("nightBg");
  if(!bg){
    var bg = document.createElement("div");
    kole.setTransition(bg, "600ms all");
    bg.id = "nightBg";
    document.body.appendChild(bg);
  }
  kole.nightBg = bg;
 },

 initNightImages:function(){
  alert("obsolete");
  var imgs = document.getElementsByTagName("img");
  for(i=0;i<imgs.length;i++){
    if(typeof imgs[i].night == 'undefined'){
      var img = imgs[i];
      img.style.backgroundColor = "#ffffff"; // fix gaps in options tabs
      var parent = img.parentNode;
      var cont = img.night = document.createElement("div");
      cont.className = "imageCont";
      cont.style.visibility = "hidden";
      parent.insertBefore(cont, img);
      parent.removeChild(img);
      cont.appendChild(img);
      cont.style.visibility = "visible";
    }
  }
 },

 setNightMode:function(night){
  shade = kole.userSettings['nightShade'];
  document.body.className = night ? ("nightMode nightShade" + shade) : "";
 },

 applyHintToTag: function(tag){
  var els = document.getElementsByTagName(tag);
  for(i=0;i<els.length;i++){
    if(!els[i].koleHintInited){
      kole.applyHoverHint(els[i]);
      els[i].koleHintInited = true;
    }
  }
 },

 wikiClick:function(ev){
  kole.hintMouseOut(ev);
  if(!kole.userSettings['wiki']){
    if(ev.target.originalOnclick) return ev.target.originalOnclick(ev);
  }
  var url = kole.getHintUrl(ev.target);
  if(!url) return;
  // my frankly genius workaround for popup blocking
  window.open("http://www.kingdomofloathing.com/blank.html#koleWiki:" + url.replace(/['"]/g, '', "_blank"));
 },

 getHintUrl:function(el){
  var onclick = el.getAttribute("onClick");
  if(!onclick) return null;

  // todo: regex this madness

  if(onclick.substr(0,27) == "javascript:poop(\"desc_skill"){
    var url = onclick.substring(43, onclick.indexOf('&'));
    return "desc_skill.php?whichskill=" + url;
  }
  if(onclick.substr(0,4) == "fam("){
    var url = onclick.substring(4, onclick.indexOf(')'));
    return "desc_familiar.php?which=" + url;
  }
  if(onclick.substr(0,5) == "eff(\""){
    var url = onclick.substring(5, onclick.indexOf("\")"));
    return "desc_effect.php?whicheffect=" + url;
  }
  if(onclick.substr(0,9) == 'descitem('){
    var url = onclick.substring(9, onclick.indexOf(')'));
    return "desc_item.php?whichitem=" + url;
  }
  if(onclick.substr(0,16) == 'javascript:item('){
    var url = onclick.substring(16, onclick.indexOf(')'));
    return "desc_item.php?whichitem=" + url;
  }
  if(onclick.substr(0,20) == 'javascript:descitem('){
    var url = onclick.substring(20, onclick.indexOf(')'));
    return "desc_item.php?whichitem=" + url;
  }
},

 applyHoverHint:function(el){
  el.hintUrl = kole.getHintUrl(el);
  if(el.hintUrl){
    el.onmouseout = kole.hintMouseOut;
    el.onmouseover = kole.hintMouseOver;
    el.title = '';
    if(!el.originalOnclickSet){
      el.originalOnclickSet = true;
      el.originalOnclick = el.onclick; // this will be called by wikiClick if wiki linking is disabled
    }
    el.onclick = kole.wikiClick;
    el.style.cursor = "help";
  }
 },

 // extract div#description from description page
 extractHint:function(s){
  var tempEl = document.createElement('div');
  tempEl.innerHTML = s;
  var divs = tempEl.getElementsByTagName("div");
  for(var i=0;i<divs.length;i++){
    if(divs[i].id == 'description'){
      return divs[0].innerHTML;
    }
  }
  return null;
 },

  // initiate a hint
 openHint: function(el){
  var url = el.hintUrl;
  if(!url) return;
  var hint = kole.hintBox;
  hint.style.display = "none";
  if(kole.hintCache[url]){
      kole.showHint(kole.hintCache[url]);
  } else {
    el.cancelHint = function(){ this.hintRequest.cancel = true; this.hintRequest = null; }
    var req = el.hintRequest = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if(this.readyState == 4){
        kole.hintCache[url] = kole.extractHint(this.responseText);
        if(!this.cancel) kole.showHint(kole.hintCache[url]);
        this.el.hintRequest = null;
        this.el.style.cursor = "help";
        this.onreadystatechange = null;
      }
    }
    req.open("GET",url.replace(/['"]/g, '', "_blank"),true);
    req.el = el;
    el.style.cursor = "progress";
    req.send();
  }
 },

 // physically positions and shows hint div
 showHint: function(s){
  var hint = kole.hintBox;
  hint.innerHTML = s;
  hint.appendChild(hint.arrow);
  if(kole.hintHideTimer) clearTimeout(kole.hintHideTimer);
  hint.style.left = hint.hintX + "px";
  hint.style.top = hint.hintY + "px";
  hint.style.bottom = null;

  if(document.body.clientWidth < 340){
    hint.style.width = "80%";
  } else {
    hint.style.width = "280px";
  }

  hint.style.visibility = "hidden";
  hint.style.display = "block";
  if((hint.clientHeight + kole.elTop(hint, false)) >= document.body.clientHeight){
    hint.style.top = null;
    hint.style.bottom = "12px";
    var arrowPos = (hint.hintY - kole.elTop(hint)) +9;
  } else {
    arrowPos = 9;
  }
  hint.arrow.style.top = arrowPos + "px";
  hint.style.visibility = "visible";
  hint.style.opacity = kole.hintOpacity;
 },

 hintMouseOver: function(ev){
  if(!kole.userSettings['hoverHint']){ return; }
  var x = (kole.elLeft(ev.target) + ev.target.clientWidth + 4);
  var x2 = (kole.elLeft(ev.target) - 282);
  kole.hintBox.arrow.className = "hintArrowLeft";
  if((x > (document.body.clientWidth / 2))
  &&(x2 > 0)){
    x = x2;
    kole.hintBox.arrow.className = "hintArrowRight";
  }
  kole.hintBox.hintX = x;
  kole.hintBox.hintY = kole.elTop(ev.target, true);
  if(kole.hintTimer) clearTimeout(kole.hintTimer);
  kole.hintTimer = setTimeout(function(el){
    if(el.hintRequest) return; // hint request already underway
    kole.openHint(el);
    kole.hintTimer = null;
  }, kole.hintDelay, ev.target);
 },

 hintMouseOut: function(ev){
  kole.hintBox.onload = null;
  kole.hintBox.style.opacity = 0;
  if(ev.target.hintRequest){
   ev.target.cancelHint();
   ev.target.style.cursor = "help";
  }
  kole.hintHideTimer = setTimeout(function(){
    kole.hintBox.style.display = "none";
    kole.hintHideTimer = null;
  }, kole.hintFadeTime);
  if(kole.hintTimer){
    clearTimeout(kole.hintTimer);
    kole.hintTimer = null;
  }
 },

 setTransition: function(el, transition){
  el.style.MozTransition = transition;
  el.style.setProperty("-webkit-transition", transition);
  el.style.setProperty("-o-transition", transition);
  el.style.setProperty("transition", transition);
 },

 elTop: function(el, fixed){
  var v = el.offsetTop;
  if(el.offsetParent) v += kole.elTop(el.offsetParent);
  if(fixed){
    v -= window.pageYOffset;
  }
  return v;
 },
 elLeft: function(el, fixed){
  var v = el.offsetLeft;
  if(el.offsetParent) v += kole.elLeft(el.offsetParent);
  return v;
 },

 addStyle:function(selector, css){
  if(!document.body) return;
  var style = document.createElement("style");
  style.innerHTML = selector + "{" + css + "}";
  document.body.appendChild(style);
  return style;
 },

 redirectWiki:function(descUrl){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.readyState == 4){
      var temp = document.createElement("div");
      temp.innerHTML = this.responseText;
      var bTags = temp.getElementsByTagName("b");
      var itemName = bTags[0].innerHTML;
      window.location = "http://kol.coldfront.net/thekolwiki/index.php/Special:Search?search=" + escape(itemName) + "&go=Go";
    }
  }
  req.open("GET",descUrl,true);
  req.send();
  document.body.innerHTML = "<br><br><br><p style='text-align:center; color:#c0c0c0'>LOADING</p>";
 },

 reloadSettings:function(){
  try{
    kole.userSettings = JSON.parse(kole.getValue("userSettings", null));
  } catch (ex) {
    kole.userSettings = null;
  }
  if(kole.userSettings == null) kole.userSettings = {};
  for(var key in kole.defaultSettings){
    if(typeof kole.userSettings[key] == "undefined") kole.userSettings[key] = kole.defaultSettings[key];
  }
 },

 nightModeBackground:function(){
  var i = kole.userSettings['nightShade'];
  return kole.grey(kole.nightShades[i]);
 },

 chatInit:function(){
  var form = document.getElementById("InputForm");
  var submit = form.getElementsByClassName("button")[0];
  var input = document.getElementById("graf");
  kole.scanChat();

  submit.onclick = function(ev){
    var inp = document.getElementById("graf");
    var cmd = document.getElementById("graf").value;
    var clearInput = function(){ document.getElementById("graf").value = ''; }
    if(cmd.substring(0,6) == '/wiki '){
      var term = cmd.substring(6,255);
      window.open("http://kol.coldfront.net/thekolwiki/index.php/Special:Search?search=" + escape(term) + "&go=Go");
      clearInput();
      return false;
    }
    if(kole.userSettings['twang']){
      inp.value = kole.twang(cmd);
    }
  }

  input.onkeydown = function(ev){
    if(ev.which == 9){
      var rev = function(s){
        var r = '';
        for(var i = 0; i < s.length; i++) r = s[i] + r;
        return r;
      };
      ev.preventDefault();
      var start = this.selectionStart;
      var partial = /\w+/.exec(rev(this.value.substring(this.value.length - start)));
      if(!partial) return;
      partial = rev(partial[0].toLowerCase());
      var playerEls = document.getElementsByClassName("player");
      for(var i = 0; i < playerEls.length; i++){
        var name = playerEls[i].innerHTML;
        if(name.toLowerCase().substring(0,partial.length) == partial){
          var before = this.value.substring(0,start - partial.length);
          var after = this.value.substring(start);
          this.value = before + name + after;
          this.selectionStart = this.before.length + partial.length;
          this.selectionEnd = this.selectionStart;
          return;
        }
      }
    }
  }
 },

 scanChat:function(){
  var messages = document.getElementsByClassName("guts");
  var soundPhrases = kole.userSettings['chatSoundPhrases'].split(/,\s*/);
  var rex = new RegExp("([^<\\w])("+soundPhrases.join("|")+")(\\W|$)", "gi");
  var playSound = false;
  if(kole.userSettings['chatSoundPhrases'] == "") return;
  for(var i = 0; i < messages.length; i++){
    if(!messages[i].koleScanned){
      messages[i].koleScanned = true;
      var msgText = messages[i].innerHTML;
      if(rex.test(msgText)){
        msgText = "<span class='chatSoundPhrase'>" + msgText + "</span>";
        messages[i].innerHTML = msgText;
        playSound = true;
      }
    }
  }
  if(playSound){
    var bleep = new Audio();
    bleep.src = kole.userSettings['chatSound'];
    bleep.play();
  }
  setTimeout(kole.scanChat, 150);
 },

 initTop:function(){
  window.hintCache = {};
  kole.framesReloadSettings = function(){
    for(i=0;i<frames.length;i++){
      if(typeof frames[i].document.kole != "undefined"){
        frames[i].document.kole.reloadSettings();
      }
    }
    kole.reloadSettings();
  }
  kole.loopFrameBg();
},

loopFrameBg:function(){
  var kframes = document.getElementsByTagName("frame");
  var kframes = frames;// document.getElementsByTagName("frame");
  for(i=0;i<kframes.length;i++){ var frame = kframes[i];
    if(frame.document && frame.document.body){
      if(frame.document.readyState != 'complete'){
        frame.document.body.style.backgroundColor = kole.userSettings['nightMode'] ? kole.nightModeBackground() : null;
      } else {
        frame.document.body.style.backgroundColor = null;
      }
      frame.document.body.style.visibility = (frame.document.readyState == "complete") ? "visible" : "hidden";
      frame.document.body.style.overflow = (frame.document.readyState == "complete") ? null: "hidden";
      frame.document.disabled = frame.document.readyState != "complete";
      frame.document.body.style.cursor = (frame.document.readyState == "complete") ? null : "wait";
    }
  }
  kole.nightTimer = setTimeout(kole.loopFrameBg, 120);
},

initBuffy:function(){
  var items = document.getElementsByClassName("skillName");
  for(var i=0; i<items.length; i++){
    items[i].onclick = function(ev){
      window.open("http://kol.coldfront.net/thekolwiki/index.php/" + ev.target.innerHTML.replace("The ", "") + "#koleBuff", "_blank");
    };
    items[i].style.cursor = "pointer";
  }
},

initWiki:function(){
  // checks for skill/effect disambiguation page when vieweing wiki from buffy link; goes to effect
  if(window.location.hash.replace("#","") == 'koleBuff'){
    var name = document.getElementsByClassName("firstHeading")[0].innerHTML;
    var anchors = document.getElementsByTagName("a");
    for(var i=0;i<anchors.length;i++){
      if(anchors[i].innerHTML == (name + " (effect)")){
       anchors[i].click();
       return;
     }
    }
  }
}

};
setTimeout(function(){
 kole.init();
},0);