// ==UserScript== 
// @name Spellcheck FetLife
// @namespace http://userscripts.org/scripts/show/39044 
// @description Replace or delete misspelled and grammatically incorrect site text and text ads on FetLife.
// @include * 
// @version 0.01 BETA
// Last updated 2008-12-22. 

/* 
Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey" 
The Jmaxxz Vulgar Word Blocker can be found at: http://userscripts.org/scripts/show/2287
A Special thank you goes to rschultz2002 and Giorgio Maone for their help in the making of this script
*/ 

// ==/UserScript==
(function() { 
var bad = [], good = [], modifiers = [];


// START CONFIGURATION 

populate({  


// SITE TEXT

    "sign-up": "sign up",
    "You need to be logged in first before we show you that page\u2026 it is for your own protection.": "Please log in to view that page.",
	"Like condoms\u2026 annoying but necessary.": "",
    "Below is the list of people who have requested to be your friend.": "Accept or reject your friend requests here. Other users are only informed of accepted requests.",
	"If you do not know any of these people don't feel shy to reject them.": "",
	"When you click on the reject link we do not inform them you rejected them.": "",
	"For those who are your friend's what is taking so long, click accept.": "",
    "\&larr; perv": "\&larr; prev",
    "A list of your most recent writting.": " ",
    'Feel the need to share some of your erotica, write a journal entry or just want to share something random?  Then "Just Do It".': " ",
    "Write!": "Create a new post.",
	"You can not use HTML but here are some handing tricks you can use to format your writing.": "",
    ", where the nickname is the person whose comment you are responding to, this way any kinksters following the discussion will know to whom you are responding to.": ". Asterisks italicize. Double underscores bold. > indents. Start lines with asterisks to make lists. Use <BR> for line breaks. Make links with [text](URL).",
	"I hope mine aren't but then again I hope you have more interesting friends then I do.": "",
	"Yes\u2026 they are on your friends list.": "",
	"Maybe it is time to say hi and catch up.": "",
	"FetLife is free as in YouTube and Facebook free and we are going to stay that way.": "", 
	"But that does not mean we wouldn't appreciate your support.": "Help keep FetLife free.",
	"For support, read our ": "",
	"and if you can not find what you are looking for there come by the ": " | ",
	"the more popular the fetish the larger it appears": "",
    "If you need anything with respect to this group who are you going to call?": "",
	"The post you linked to was not be found.": "The page you were attempting to access was not found.",
	"The group leader might of removed it... that or the boogie monster.": "",

	
// ADS

	"The DE FACTO Home for Odd and Obscure Electrical & Medical goods": "",
	"BDSM Practitioners are ready to talk with you!": "", 
	"First call-: 3 free minutes": "",
	"Hottest source for hardcore": "",
	"gay bondage erotica!": "", 
	"Gay sex and real bondage.": "",
	"vibrating delights":"",
	" spine shuddering orgasm":"",
	" sale happening now": "",
	"A full line of Silicone Lubes and Massage oils. ": "",
	"Unscented and EO infused.": "",
	"The Original and Largest Medical Fetish Resource Medical Gear & More...": "",
	"The Ultimate Fetish Store! ": "",
	"Save 20% on all your Christmas Shopping": "",
	"get 10% off use ":"",
	"\u0022Fetlife\u0022":"",
	"Coupon Section":"",
	"at Checkout":"",
	"Gagged, bound & helpless":"",
	" they struggle against the":"",
	" ropes-begging for orgasms.": "",
	"www.churchofsinvention.com": "",
	" Premium Canadian Made Leather Bondage Gear": "",
	"Stimulate your mind and": "",
	" other parts by reading a": "",
	" book today. Buy yours now.": "",
	"Orgasm Torture, Tickling":"",
	"Predicament Bondage,": "",
	" Orgasm Denial, Real BDSM ": "",
	"Exotic & Traditional Blends": "",
	"Of Our Rope - Colored Or Knot!": "",
	"Quality Bondage Gear,": "", 
	"Fetish & Sex Toys,": "",
	" Leather & Latex": "",
	" Clothing": "",
	"www.vintagerope.com": "",
	"Bondage Fetish Store ": "",
	"AIS is Stepping It UP!":"",
	" Come out to Central Ohio's Premier BDSM":"",
	"Kink Event!": "",
	"Scott Paul Designs ":"",
	"Top quality BDSM equipment. ":"",
	"Style, durability and Ouch!":"",


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
