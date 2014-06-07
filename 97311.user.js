// ==UserScript== 
// @name           Uncensor GameFAQs: G*** Edition
// @namespace      TheAmazingOne_VR@gamefaqs.com 
// @description    Uncensors "g***" formatted swears on GameFAQs.
// @include        http://www.gamefaqs.com/boards/*
// @version        1.61

//-------------------------------------------------------------------
//
//    Uncensor GameFAQs
//
//    Author: The Amazing One (the_amazing_one3000@yahoo.com)
//            Vague Rant (minor shit, no support, go away)
//
//    Version 1.61 notes:
//    - Now implements some rudimentary all-caps guessing. It will
//      check the current word for capitals at either end of the
//      swear, e.g. ube[R]G*** will capitalize GRIS; otherwise it
//      will check the previous or next /two/ letters from adjacent
//      words, e.g. G*** [IT] or suc[K A] Gris. It's simpler than it
//      sounds. Just try it.
//    - Extremely inefficient! Really needs someone who actually
//      knows JavaScript and regex to take over!
//
//
//    Version 1.6 notes:
//    - G*** Edition means "Gris Edition". But "Gold" also fits. See,
//      it's clever. Bet you were all "Is that for 'Gris' or 'Gold'?"
//    - Updated to add support for new GameFAQs censorship rules
//      (first character no longer needs to be starred out). Covers a
//      few extra words over the old version, see the list below.
//    - I don't know either regex or JavaScript. This is a total hack
//      job. If anything doesn't work, it's because I hate you.
//
//
//    ----- About Uncensor GameFAQs -----
//      VR NOTE! RULES HAVE CHANGED SOME OF THIS IS WRONG BUT I'M
//      LAZY SO THE OLD DESCRIPTION IS STILL HERE. BRARUARBAURHAUH.
//
//      Uncensor GameFAQs is a script that finds series of asterisks
//      on the GameFAQs message boards, and tries to figure out what
//      bad word the person meant. It makes its best guess, and fills
//      that word in. For convenience, it also replaces the bad words
//      in your own post with asterisks. Note that the Uncensor GameFAQs
//      script will always censor your own post with asterisks,
//      never by first letter. Therefore it is in your best interest
//      not to post something like "F is for fuck" since this will
//      be censored as "F is for ****", and that's a censor bypass. The
//      exception to this rule is the word "nigger", which is always
//      censored as "n-word" or "the n-word" (rather than six asterisks).
//
//      Supported curse words:
//      - arsehole
//      - asshole
//      - bitch
//      - cunt
//      - fag
//      - fuck
//      - jizz
//      - nigger
//      - pussy
//      - pussies
//      - shit
//      - tits
//      - titties
//      - titty
//
//      VR NOTE! Some of these words are really shitty to use as
//      descriptors for things, people, etc. Don't be a douchebag.
//
//-------------------------------------------------------------------


// This script was initially adapted from IronicSans's "Uncensor the
// Internet" script found at:
//   http://userscripts.org/scripts/show/8891 

// ==/UserScript==

var badSp = [], goodSp = [];
var bad = [], good = [];
var badFlip = [], goodFlip = [];

var replacements = {
 
        "Da.\\*\\*\\*Wiz": "DaShizWiz",

        "A\\*\\*\\*\\*\\*\\*\\*(?!\\*)": "Arsehole",
        "a\\*\\*\\*\\*\\*\\*\\*(?!\\*)": "arsehole",
        "A\\*\\*\\*\\*\\*\\*(?!\\*)": "Asshole",
        "a\\*\\*\\*\\*\\*\\*(?!\\*)": "asshole",
        "B\\*\\*\\*\\*(?!\\*)": "Bitch",
        "b\\*\\*\\*\\*(?!\\*)": "bitch",
        "C\\*\\*\\*(?!\\*)": "Cunt",
        "c\\*\\*\\*(?!\\*)": "cunt",
        "F\\*\\*(?!\\*)": "Fag",
        "f\\*\\*(?!\\*)": "fag",
        "F\\*\\*\\*(?!\\*)": "Fuck",
        "f\\*\\*\\*(?!\\*)": "fuck",
        "J\\*\\*\\*(?!\\*)": "Jizz",
        "j\\*\\*\\*(?!\\*)": "jizz",
        "N\\*\\*\\*\\*\\*(?!\\*)": "Nigger",
        "n\\*\\*\\*\\*\\*(?!\\*)": "nigger",
        "P\\*\\*\\*\\*(?!\\*)": "Pussy",
        "p\\*\\*\\*\\*(?!\\*)": "pussy",
        "P\\*\\*\\*\\*\\*\\*(?!\\*)": "Pussies",
        "p\\*\\*\\*\\*\\*\\*(?!\\*)": "pussies",
        "S\\*\\*\\*(?!\\*)": "Shit",
        "s\\*\\*\\*(?!\\*)": "shit",
        "T\\*\\*\\*(?!\\*)": "Tits",
        "t\\*\\*\\*(?!\\*)": "tits",
        "T\\*\\*\\*\\*\\*\\*(?!\\*)": "Titties",
        "t\\*\\*\\*\\*\\*\\*(?!\\*)": "titties",
        "T\\*\\*\\*\\*(?!\\*)": "Titty",
        "t\\*\\*\\*\\*(?!\\*)": "titty",
		
		"([A-Z] ?[A-Z] |[A-Z])Arsehole": "$1ARSEHOLE",
		"Arsehole(?=(?:([A-Z]| [A-Z])))": "ARSEHOLE",
		"([A-Z] ?[A-Z] |[A-Z])Asshole": "$1ASSHOLE",
		"Asshole(?=(?:([A-Z]| [A-Z])))": "ASSHOLE",
		"([A-Z] ?[A-Z] |[A-Z])Bitch": "$1BITCH",
		"Bitch(?=(?:([A-Z]| [A-Z])))": "BITCH",
		"([A-Z] ?[A-Z] |[A-Z])Cunt": "$1CUNT",
		"Cunt(?=(?:([A-Z]| [A-Z])))": "CUNT",
		"([A-Z] ?[A-Z] |[A-Z])Fag": "$1FAG",
		"Fag(?=(?:([A-Z]| [A-Z])))": "FAG",
		"([A-Z] ?[A-Z] |[A-Z])Fuck": "$1FUCK",
		"Fuck(?=(?:([A-Z]| [A-Z] ?[A-Z])))": "FUCK",
		"([A-Z] ?[A-Z] |[A-Z])Jizz": "$1JIZZ",
		"Jizz(?=(?:([A-Z]| [A-Z])))": "JIZZ",
		"([A-Z] ?[A-Z] |[A-Z])Nigger": "$1NIGGER",
		"Nigger(?=(?:([A-Z]| [A-Z])))": "NIGGER",
		"([A-Z] ?[A-Z] |[A-Z])Pussy": "$1PUSSY",
		"Pussy(?=(?:([A-Z]| [A-Z])))": "PUSSY",
        "([A-Z] ?[A-Z] |[A-Z])Pussies": "$1PUSSIES",
		"Pussies(?=(?:([A-Z]| [A-Z])))": "PUSSIES",
		"([A-Z] ?[A-Z] |[A-Z])Shit": "$1SHIT",
		"Shit(?=(?:([A-Z]| [A-Z])))": "SHIT",
		"([A-Z] ?[A-Z] |[A-Z])Tits": "$1TITS",
		"Tits(?=(?:([A-Z]| [A-Z])))": "TITS",
		"([A-Z] ?[A-Z] |[A-Z])Titties": "$1TITTIES",
		"Titties(?=(?:([A-Z]| [A-Z])))": "TITTIES",
		"([A-Z] ?[A-Z] |[A-Z])Titty": "$1TITTY",
		"Titty(?=(?:([A-Z]| [A-Z])))": "TITTY",
		
		"\\*\\*\\*\\*(?=(?:ING|ER)\\b)": "FUCK",
		"(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(?:ing|er)\\b)": "$1Fuck",
		"([^\\*])\\*\\*\\*\\*(?=(?:ing|er)\\b)": "$1fuck",
		"THIS \\*\\*\\*\\*": "THIS SHIT",
		"This \\*\\*\\*\\*": "This shit",
		"this \\*\\*\\*\\*": "this shit",
		"(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=(?:TY|TING| NO)\\b)": "$1SHIT",
		"(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(?:ty|ting)\\b)": "$1Shit",
        "([^\\*])\\*\\*\\*\\*(?=(?:ty|ting)\\b)": "$1shit"

    };

var specialReplacements = {  
        "\\bthe n-word\\b": "\"nigger\"",
        "\\bn-word\\b": "nigger"
    };

var flipRules = {
        "fuck": "shit",
        "Fuck": "Shit",
        "FUCK": "SHIT",
        "shit": "fuck",
        "Shit": "Fuck",
        "SHIT": "FUCK",
        "bitch": "pussy",
        "Bitch": "Pussy",
        "BITCH": "PUSSY",
        "pussy": "bitch",
        "Pussy": "Bitch",
        "PUSSY": "BITCH"
    };

for (var key in specialReplacements) { 
  badSp.push(new RegExp(key, "g")); 
  goodSp.push(specialReplacements[key]); 
}
for (var key in replacements) { 
  bad.push(new RegExp(key, "g")); 
  good.push(replacements[key]); 
}
for (var key in flipRules) { 
  badFlip.push(new RegExp(key)); 
  goodFlip.push(flipRules[key]); 
} 

function doceval(q) {
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function uncensor(s,sp) { 
  if(sp)
    for(var i=0; i<badSp.length; i++)
      s = s.replace(badSp[i],goodSp[i]);
  for(var i=0; i<bad.length; i++)
    s = s.replace(bad[i],good[i]);
  return s;  
}

function sanitize(s) {
  var flips = [], doubles = [];
  if(!s) return s;
  if(s.charAt(0)==" " && s.charAt(1)!=" ") {
    flips.push(0);
    doubles.push(false);
  }
  for(var p = s.indexOf("  ");p!=-1;p=s.indexOf("  ",p+1)) {
    if(s.charAt(p+2)==" ") continue;
    if(p+2==s.length) break;
    flips.push(p);
    var isDouble = (p==0||s.charAt(p-1)==" ");
    doubles.push(isDouble);
    if(p!=0) s = removeAt(s,p,(isDouble?2:1));
  }
  s = uncensor(s,false);
  for(var i=0; i<flips.length; i++)
    s = flipAt(s,flips[i],doubles[i]);
  s = uncensor(s,true);
  return s;
}

function flipAt(s,i,dbl) {
  while(i<s.length && s.charAt(i)==" ")
    i++;
  if(i>=s.length) return s;
  var p = i;
  while(p<s.length && s.charAt(p)!=" ")
    p++;
  var sub = s.slice(i,p);
  sub = flipWord(sub);
  if(dbl) sub = flipWord(sub);
  s = removeAt(s,i,p-i);
  s = insertAt(s,sub,i);
  return s;
}

function flipWord(s) {
  for(var i=0; i<badFlip.length; i++)
    if(badFlip[i].test(s)) {
      s=s.replace(badFlip[i],goodFlip[i]);
      return s;
    }
  return s;
}

// replace in title 
if(document.title) {
  var gameFoxTitle = false;
  if(/^GameFAQs:M: /.test(document.title)) {
    gameFoxTitle = true;
    document.title = document.title.replace(/^GameFAQs:M: /,"");
  }
  document.title = sanitize(document.title);
  if(gameFoxTitle)
    document.title = "GameFAQs:M: "+document.title;
}
var h2s = doceval("//h2[@class='title']//text()"); 
for(var i = 0; i < h2s.snapshotLength; i++) { 
  node = h2s.snapshotItem(i); 
  node.data = sanitize(node.data); 
}
if(/post\.php/.test(window.location.href)) {
  var ttPreview = doceval("//div[@class='details']/p");
  if(ttPreview.snapshotLength>0) {
    node = ttPreview.snapshotItem(0);
    node.innerHTML = sanitize(node.innerHTML);
  }
  ttPreview = doceval("//div[@class='details']//a");
  if(ttPreview.snapshotLength>0) {
    node = ttPreview.snapshotItem(0);
    node.innerHTML = sanitize(node.innerHTML);
  }
}

// replace in body text
var gentopic = /\/boards\/[0-9]+-[^\/]*$|myposts|search/.test(window.location.href);
var textnodes;
if(gentopic)
  textnodes = doceval("//table[@class=\"board topics\"]//td//text()");
else
  textnodes = doceval("//table[@class=\"board message\"]//td//text()");
for (var i = 0; i < textnodes.snapshotLength; i++) { 
  node = textnodes.snapshotItem(i); 
  node.data = sanitize(node.data); 
}

function censor(text, sp) {
    if (sp) text =
        text.replace(/ARSEHOLE/g, "A*******").replace(/Arsehole/g, "A*******").replace(/arsehole/g, "a*******")
        .replace(/ASSHOLE/g, "A******").replace(/Asshole/g, "A******").replace(/asshole/g, "a******")
	    .replace(/BITCH/g, "B****").replace(/Bitch/g, "B****").replace(/bitch/g, "b****")
	    .replace(/CUNT/g, "C***").replace(/Cunt/g, "C***").replace(/cunt/g, "c***")
	    .replace(/FAG/g, "F**").replace(/Fag/g, "F**").replace(/fag/g, "f**")
        .replace(/FUCK/g, "F***").replace(/Fuck/g, "F***").replace(/fuck/g, "f***")
	    .replace(/JIZZ/g, "J***").replace(/Jizz/g, "J***").replace(/jizz/g, "j***")
	    .replace(/NIGGER/g, "N*****").replace(/Nigger/g, "N*****").replace(/nigger/g, "n*****")
	    .replace(/PUSSY/g, "P****").replace(/Pussy/g, "P****").replace(/pussy/g, "p****")
	    .replace(/PUSSIES/g, "P******").replace(/Pussies/g, "P******").replace(/pussies/g, "p******")
	    .replace(/SHIT/g, "S***").replace(/Shit/g, "S***").replace(/shit/g, "s***")
	    .replace(/SHIZ/g, "S***").replace(/Shiz/g, "S***").replace(/shiz/g, "s***")
	    .replace(/TITS/g, "T***").replace(/Tits/g, "T***").replace(/tits/g, "t***")
	    .replace(/TITTIES/g, "T******").replace(/Titties/g, "T******").replace(/titties/g, "t******")
	    .replace(/TITTY/g, "T****").replace(/Titty/g, "T****").replace(/titty/g, "t****");
    return text;
}

function insertAt(string,sub,index) {
  return string.slice(0,index)+sub+string.slice(index);
}
function removeAt(string,index,count) {
  return string.slice(0,index)+string.slice(index+count);
}

function prevWhitespace(string,index) {
  for(;index>0 && string.charAt(index-1)!="\n"
               && string.charAt(index-1)!="\t"
               && string.charAt(index-1)!=" "; index--);
  return index;
}

function cleanUp(text) {
  var text2=text.toLowerCase();
  var text3=uncensor(censor(text,false)).toLowerCase();
  for(var p = text3.indexOf("fuck"); p!=-1; p = text3.indexOf("fuck",p+3)) {
    var p2 = prevWhitespace(text,p);
    if(text2.substr(p,4)=="shit") {
      text=insertAt(text," ",p2);
      text2=insertAt(text2," ",p2);
      text3=insertAt(text3," ",p2);
    }
  }
  for(var p = text3.indexOf("shit"); p!=-1; p = text3.indexOf("shit",p+3)) {
    var p2 = prevWhitespace(text,p);
    if(text2.substr(p,4)=="fuck") {
      text=insertAt(text," ",p2);
      text2=insertAt(text2," ",p2);
      text3=insertAt(text3," ",p2);
    }
  }
  for(var p = text3.indexOf("bitch"); p!=-1; p = text3.indexOf("bitch",p+3)) {
    var p2 = prevWhitespace(text,p);
    if(text2.substr(p,5)=="pussy") {
      text=insertAt(text," ",p2);
      text2=insertAt(text2," ",p2);
      text3=insertAt(text3," ",p2);
    }
  }
  for(var p = text3.indexOf("pussy"); p!=-1; p = text3.indexOf("pussy",p+3)) {
    var p2 = prevWhitespace(text,p);
    if(text2.substr(p,5)=="bitch") {
      text=insertAt(text," ",p2);
      text2=insertAt(text2," ",p2);
      text3=insertAt(text3," ",p2);
    }
  }   
  return censor(text,true);
}

function initRecensor() {
  var textareas = doceval("//div[@id=\"content\"]//textarea");
  if(textareas && textareas.snapshotLength>0) {
    var postBox = textareas.snapshotItem(0);
    var timedValidate = function(event) {
      setTimeout(validateFunction,10);
    };
    var validateFunction = function() {
      var selStart = postBox.selectionStart;
      var newText1 = cleanUp(postBox.value.substring(0,selStart));
      var newText2 = cleanUp(postBox.value.substring(selStart));
      if(newText1+newText2!=postBox.value) {
        postBox.value=newText1+newText2;
        postBox.setSelectionRange(newText1.length,newText1.length);
      }
    };
    var validateFunction2 = function(event) {
      postBox.value = cleanUp(postBox.value);
    }
    postBox.addEventListener("focus",timedValidate,true);
    postBox.addEventListener("blur",validateFunction2,true);
    return 0;
  } else
    setTimeout(initRecensor,1000); // GameFOX hasn't added the quickpost box yet
}

function initRecensorTitle() {
  var topicTitle = doceval("//input[@name=\"topictitle\"]");
  if(topicTitle&&topicTitle.snapshotLength>0) {
    topicTitle = topicTitle.snapshotItem(0);
    var validateTitle = function(event) {
      topicTitle.value = cleanUp(topicTitle.value);
    }
    topicTitle.addEventListener("focus",validateTitle,true);
    topicTitle.addEventListener("blur",validateTitle,true);
  } else
    setTimeout(initRecensorTitle,1000);
}

initRecensor();
initRecensorTitle();


// --------------------------------------------------------------------------
// Check for updates
// 
// Much thanks to Jarett - http://userscripts.org/users/38602 - for the code
//---------------------------------------------------------------------------
var version_scriptNum = 97311; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1298091840552; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
