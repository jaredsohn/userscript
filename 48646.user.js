// ==UserScript==
// @name           Kufur
// @namespace      http://userscripts.org/users/83279
// @description    Kufursuz bir dunya icin..
// @include        *
// @copyright      Huseyin Mert
// @version        0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License

// ==/UserScript==
(function() { 
var bad = [], good = [], modifiers = [];


// START CONFIGURATION 

populate({  
// This list is case SENSITIVE, i.e. uppercase and lowcase are treated differently 

// Terms are listed as comma separated couples of words, in the form 
// "Bad word": "replacement"
// You can place an optional modifier after a slash ("/") at the end of the bad word. 
// The supported modifier "c", standing for "context",
// which means that the word could be "not evil", but you are just changing it to be on the safe side, 
// and thus it should not be replaced in domain names (i.e. it doesn't cause redirections) 

//The support modifier "r", standing for redirect 
//This means a word will not be changed except in domain names (i.e. the word will only cause redirects)


// The support modifier "n", stands for new
// it does not change how the word is handled by the script,
// rather it is just so the developer know what he/she has changed in the latest build
// incase something goes wrong 
 

// [Place custom word list below] 

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)

//A
 "yarrak": "dayak",
 "Nitwit": "Nitwit",
 "Jerk": "Jerk", 
 " Bottom ": " Bottom ",
 "NITWIT": "NITWIT",
 "NIMWIT": "NIMWIT",
 "JERK": "JERK",  
 " BOTTOM ": " BOTTOM ",
 " Bottom!": " Bottom!",
 " Bottom,": " Bottom,",
 

//B
 "Were the sun don't shine": "Were the sun don't shine",
 "Illegitimate child": "Illegitimate child",
 "Spoiled brat": "Spoiled brat",
 "Crabby": "Crabby",
 "Yelled": "Yelled",
 "Complaining" : "Complaining",
 "SPOILED BRAT": "SPOILED BRAT",
 "CRABBY": "CRABBY",
 "YELLED": "YELLED",
 "COMPLAINING" : "COMPLAINING",
 "ILLEGITIMATE CHILD": "ILLEGITIMATE CHILD",
 "WERE THE SUN DON'T SHINE": "WERE THE SUN DON'T SHINE",
 "Female dogs": "Female dogs",
 "Female dog": "Female dog",
 "FEMALE DOGS": "FEMALE DOGS",
 "FEMALE DOG": "FEMALE DOG",
 "bottleguy/r": "google",

//C
"circusgranny/r": "google",
"crackfile/r": "google",

//D
 "Dang": "Dang",
 "Dang": "Dang",
 "Dang it": "Dang it",
 "Jerk": "Jerk",
 "DANG": "DANG",
 "DANG": "DANG",
 "JERK": "JERK",
 "Dang": "Dang",
 "DANG": "DANG",

//E

//F
 "Bundle of sticks": "Bundle of sticks",
 "Flipping": "Flipping",
 "Flippen": "Flippen",
 "Flipped": "Flipped",
 "Loser": "Loser",
 "BUNDLE OF STICKS": "BUNDLE OF STICKS",
 "FLIPPING": "FLIPPING",
 "FLIPPEN": "FLIPPEN",
 "FLIPPED": "FLIPPED",
 "LOSER": "LOSER",
 "Jerk": "Jerk",
 "Flip": "Flip",
 "FLIP": "FLIP",

//G
"goatse/r": "google",

//H
 "What the!?": "What the!?",
 "WHAT THE!?": "WHAT THE!?",

//I

//J
 "Donkey/c": "Donkey",

//K

//L
 "Rofl": "Rofl",
 "Rofl": "Rofl",
 "ROFL": "ROFL",
 "ROFL": "ROFL",
 "lemonparty/r": "google",

//M

//N
 "Palz": "Palz", 
 "Person": "Person", 
 "Buddy": "Buddy",
 "PALZ": "PALZ", 
 "PERSON": "PERSON", 
 "BUDDY": "BUDDY",

//O

//P
 "Kitty cat/c": "Kitty cat",
 "Kitty cat/c": "Kitty cat",
//Q

//R

//S
 "Poo": "Poo",

//T

//U

//V

//W
"welikehorses/r": "google",

//X

//Y
"yellaface/r": "google",

//Z   

  
      

  
	 
  
// [End of custom word list]   
}, "g"); 

populate({
// This list is case INSENSITIVE, i.e. uppercase and lowcase are considered the same. 

// Terms are listed as comma separated couples of words, in the form 
// [Place custom word list below]

//safe replace (i.e. words which means that the word could be "not evil", but you are just  
//changing it to be on the safe side)

//A
 "nitwit": "nitwit",
 "nimwit": "nimwit",
 "Jerk": "Jerk", 
 " bottom ": " bottom ",
 " bottom!": " bottom!",     
 " bottom,": " bottom,",
 

//B
 "were the sun don't shine": "were the sun don't shine",
 "illegitimate child": "illegitimate child",
 "spoiled brat": "spoiled brat",
 "crabby": "crabby",
 "yelled": "yelled",
 "complaining" : "complaining",
 "female dogs": "female dogs",
 "female dog": "female dog",
 "": "",
 "bagslap/r": "google",

//C
 "" : "",
 "" : "",
 "": "",

//D
 "dang": "dang",
 "dang": "dang",
 "dang": "dang",
 "shower": "shower",
 "" : "",
 "mustache" : "mustache",
 "jerk": "jerk", 

//E

//F
 "bundle of sticks": "bundle of sticks",
 "jerk": "jerk",
 "flipping": "flipping",
 "flippen": "flippen",
 "flipped": "flipped",
 "loser": "loser",
 "flip": "flip",
 "What the!?": "What the!?",

//G
 "goatsemarathon/r": "google",

//H
 "what the!?": "what the!?",

//I

//J
 "donkey": "donkey",
 "" : "",
 "" : "",
 "" : "",

//K

//L
 "rofl": "rofl",
 "rofl": "rofl",
 "lastmeasure/r": "google",

//M
 "meatspin/r": "google",
 "" : "",
 "mudfall/r": "google",
 "motherman/r": "google",
 "men-in-pantyhose/r": "google",

//N
 "palz": "palz", 
 "person": "person", 
 "buddy": "buddy",

//O
 "Oh my gosh!": "Oh my gosh!",

//P
 "kitty cat": "kitty cat",
 "kitty cat": "kitty cat",
 "": "",
 "" : "",
 "porn/r" : "",
 "": "",
 "pressurespot/r": "google",
 "pokehole/r": "google",
 "phreak/r": "google",

//Q
 "" : "",

//R

//S
 "" :"",
 "" : "",
 "poo": "poo",
 "swollentip/r": "google",


//T
 "": "",  
 "": "",
 "": "",
 "": "",
 "": "",    
 "": "",
 "" : "",
 "thepounder/r": "google",
 "tubgirl/r": "google",
 "tubboy/r": "google",   

//U

//V

//W
 "" : "",
 

//X
"xxx/r":"",

//Y
 "youaresogay/r": "google",

//Z 
// [End of custom word list]
//test
"1t2e3s4t5test/r": "google",

}, "gi"); 



// END CONFIGURATION (don't touch anything below, unless you know what you're doing... 

function populate(replacements, flags) { 
  var word, modPos, mod; 
  for(var key in replacements) { 
    if((modPos = key.indexOf("/")) > -1) { 
      mod = key.substring(modPos + 1); 
      word = key.substring(0, modPos); 
    } else { 
      mod = ""; 
      word = key; 
    } 
    modifiers.push(mod); 
    bad.push(new RegExp(word, flags)); 
    good.push(replacements[key]); 
  } 
} 



// this function does the replacements 
function sanitize(s, noContext, notredirect) { 
	
  for (var j = 0; j < bad.length; j++) { 
    if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") !=-1 ) {  
     continue;
    } 
    s = s.replace(bad[j], good[j]);
  } 
  return s;  
} 

// this function redirects if we reached a "bad" address 
function redirectOnBadURL() { 
  var cleanHost = sanitize(document.defaultView.location.host, true, false); 
  if(cleanHost != document.defaultView.location.host) { 
    document.defaultView.location.href = "http://" + cleanHost; 
    return true; 
  } 
  
  return false; 
}

if(redirectOnBadURL()) return

// replace in title 
if(document.title) 
{
	document.title = sanitize(" "+document.title+" ", false , true);
	document.title = document.title.substring(1,document.title.length -1) 
	
}

// replace in body text 
var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
  node = textnodes.snapshotItem(i);
  node.data = sanitize(" "+node.data+" ", false, true);
  node.data = node.data.substring(1,node.data.length -1);
}

})();
// Auto-Update by sizzlemctwizzle
kufursuz={
i:'48646', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:/\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){kufursuz.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);kufursuz.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);kufursuz.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);kufursuz.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)kufursuz.ch();