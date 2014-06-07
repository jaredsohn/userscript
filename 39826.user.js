// ==UserScript== 
// @name           Uncensor GameFAQs
// @namespace      TheAmazingOne@gamefaqs.com 
// @description    Uncensors the bad words on GameFAQs
// @include        http://www.gamefaqs.com/boards/*
// @version        1.5

//-------------------------------------------------------------------
//
//    Uncensor GameFAQs
//
//    Author: The Amazing One (the_amazing_one3000@yahoo.com)
//
//    Version 1.5 notes:
//    - In a long overdue release, I finally removed support for
//      words that used to be banned in topic titles but aren't
//      anymore (gay, whore, homo, and suck).
//    - There have been changes to GameFAQs, particularly in the
//      URL format, since the last version of this script was
//      released over a year ago. There have also been changes to
//      Greasemonkey. This update is my attempt to become compatible
//      with these changes. I probably didn't get it completely
//      right, so if people report problems, expect future updates.
//
//
//    ----- About Uncensor GameFAQs -----
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
//      - fuck
//      - shit
//      - bitch
//      - pussy
//      - nigger
//      - asshole
//      - jizz (but only when followed by "in my/your/his pants")
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
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*\\*\\*\\*(?!\\*)": "$1Asshole",
  "([^\\*])\\*\\*\\*\\*\\*\\*\\*(?!\\*)": "$1asshole",
 
  "(^|\\n|\\t|[ \"])e([- ])\\*\\*\\*\\*\\*(?!\\*)": "$1e$2pussy",
  "((?:(?:e|E)ats?|(?:a|A)te) (?:out )?(?:my|your|her) )\\*\\*\\*\\*\\*(?!\\*)": "$1pussy",
 
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*\\*(?![\\*a-zA-Z])": "$1Bitch",
  "([^\\*])\\*\\*\\*\\*\\*(?![\\*a-zA-Z])": "$1bitch",
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*\\*(?=ing|y|es|ed)": "$1Bitch",
  "([^\\*])\\*\\*\\*\\*\\*(?=ing|y|es|ed)": "$1bitch",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*\\*(?=ING|Y|ES|ED)": "$1BITCH",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(?:ed)? in (?:my|your|his|their|our) pants\\b)": "$1Jizz",
  "([^\\*])\\*\\*\\*\\*(?=(?:ed)? in (?:my|your|his|their|our) pants\\b)": "$1jizz",
  "([^\\*])\\*\\*\\*\\*(?=(?:ed)? In (?:My|Your|His|Their|Our) Pants\\b)": "$1Jizz",
  "([^\\*])\\*\\*\\*\\*(?=(?:ED)? IN (?:MY|YOUR|HIS|THEIR|OUR) PANTS\\b)": "$1JIZZ",
 
  "Da\\*\\*\\*\\*Wiz":"DaShizWiz",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(ed|er(?:s|y)?|ing?)\\b)": "$1Fuck",
  "([^\\*])\\*\\*\\*\\*(?=(ed|er(?:s|y)?|ing?)\\b)": "$1fuck",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=(ED|ERS?|ING?)\\b)": "$1FUCK",
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(?:ty|ting)\\b)": "$1Shit",
  "([^\\*])\\*\\*\\*\\*(?=(?:ty|ting)\\b)": "$1shit",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=(?:TY|TING)\\b)": "$1SHIT",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?= (?:my|your|his|her|their|our) pants\\b)": "$1Shit",
  "([^\\*])\\*\\*\\*\\*(?= (?:my|your|his|her|their|our) pants\\b)": "$1shit",
  "([^\\*])\\*\\*\\*\\*(?= (?:My|Your|His|Her|Their|Our) Pants\\b)": "$1Shit",
  "([^\\*])\\*\\*\\*\\*(?= (?:MY|YOUR|HIS|HER|THEIR|OUR) PANTS\\b)": "$1SHIT",

  "\\b((?:w|W)hat the |(?:w|W)here the |(?:w|W)ho the |(?:h|H)ow the |(?:w|W)hy the |(?:g|G)ives? a |(?:m|M)other|(?:m|M)otha|(?:t|T)o )\\*\\*\\*\\*(?!\\*)": "$1fuck",
  "\\b(WHAT THE |WHERE THE |WHO THE |HOW THE |WHY THE |GIVES? A |MOTHER|MOTHA|TO )\\*\\*\\*\\*(?!\\*)": "$1FUCK",

  "\\b(OH |THIS |THAT |OF |HOLY |BULL ?|T(?:AKES?|OOK) A |NO |FUCKING )\\*\\*\\*\\*(?!\\*)": "$1SHIT",
  "\\b((?:o|O)h |(?:t|T)his |(?:t|T)hat |(?:o|O)f |(?:h|H)oly |(?:b|B)ull ?|(?:T|t)(?:akes?|ook) a |(?:n|N)o |(?:f|F)ucking )\\*\\*\\*\\*(?!\\*)": "$1shit",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=( off| you| this| that| it| her| him| me| them| your| his| my| all| yeah?| ups?| around| with| buddy| yes| no| a| the)\\b)": "$1Fuck",
  "([^\\*])\\*\\*\\*\\*(?=( off| you| this| that| it| her| him| me| them| your| his| my| all| yeah?| ups?| around| with| buddy| yes| no| a| the)\\b)": "$1fuck",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=( Off| You| This| That| It| Her| Him| Me| Them| Your| His| My| All| Yeah?| Ups?| Around| With| Buddy| Yes| No| A| The)\\b)": "$1Fuck",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=( OFF| YOU| THIS| THAT| IT| HER| HIM| ME| THEM| YOUR| HIS| MY| ALL| YEAH?| UPS?| AROUND| WITH| BUDDY| YES| NO| A| THE)\\b)": "$1FUCK",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?=(?:ty|ting| ?loads?| ?faced| ?heads?| ?hole)\\b)": "$1Shit",
  "([^\\*])\\*\\*\\*\\*(?=(?:ty|ting|loads?|faced|heads?| ?hole)\\b)": "$1shit",
  "(^|\\n|\\t|[^\\*])\\*\\*\\*\\*(?=(?:TY|TING| ?LOADS?| ?FACED| ?HEADS?| ?HOLE)\\b)": "$1SHIT",
  "(f|F)or \\*\\*\\*\\*'s sake": "$1or fuck's sake",
  "FOR \\*\\*\\*\\*'S SAKE": "FOR FUCK'S SAKE",
  "(^|\\n|\\t|[\\.!\\?:] +)\\*\\*\\*\\*(?=[\\.!\\?,]|$)": "$1Shit",

  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?= was| is)": "$1Shit", 
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?= )": "$1Fuck",
  "([^\\*])\\*\\*\\*\\*(?= [A-Z])": "$1fuck",
  "([a-z])\\*\\*\\*\\*(?!\\*)": "$1fuck",
  "([A-Z])\\*\\*\\*\\*(?!\\*)": "$1FUCK",
  "(^|\\n|\\t|[\\.!\\?] +)\\*\\*\\*\\*(?!\\*)": "$1Shit",
  "([^\\*])\\*\\*\\*\\*(?!\\*)": "$1shit"
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

for(var key in specialReplacements) { 
  badSp.push(new RegExp(key, "g")); 
  goodSp.push(specialReplacements[key]); 
}
for(var key in replacements) { 
  bad.push(new RegExp(key, "g")); 
  good.push(replacements[key]); 
}
for(var key in flipRules) { 
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

function censor(text,sp) {
  if(sp)
    text = text.replace(/\"nigger\"/gi,"the n-word").replace(/nigger/gi,"n-word");
  text = text.replace(/fuck/gi,"****").replace(/shit/gi,"****")
    .replace(/asshole/gi,"*******").replace(/pussy(?!cat|foot)/gi,"*****")
    .replace(/jizz/gi,"****").replace(/shiz/gi,"****")
    .replace(/bitch/gi,"*****");
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
var version_scriptNum = 39826; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1273451269846; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/&#x000A;/g,"\n").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);
