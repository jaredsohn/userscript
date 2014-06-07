// ==UserScript== 
// @name internet enhancer (not reccommended for children)
// @namespace Tony White
// @description enhances the Net 
// @include * 
// @version 1.0 BETA
// ==/UserScript==









//WARNING
// DO NOT SCROLL DOWN This script contains language that
// may be offensive.

















 

populate({


 "asshole": "butt portal",
 "ass hole": "butt portal",
 "ass-hole": "butt portal", 
 " ass ": " shit hole ",
 " anus ": " shit storage container",     
 " ass,": " butt portal,",
 "ballsack": "nad basket",
 "bastard": "bitch monkey",
 "son of a bitch": "pussy face",
 "bitchy": "titty flappy",
 "bitched": "titty flapped",
 "bitching" : "titty flapping",
 "bitches": "titty flappers",
 "bitch": "titty flap",
 "blowjob": "sucking dick",
 "bagslap/r": "google",
 "cocksucker" : "penis suckler",
 "cock sucker" : "boner pwner",
 "it": "my cunt",
 "goddamn": "facefuck",
 "god damn": "face fuck",
 "damn": "fuck",
 "douche": "pussy cleanser",
 "dinglebetty" : "nad basket",
 "dirty sanchez" : "shit-stache",
 "dickhead": "8====D", 
 "faggot": " bitch face",
 "motherfucker": "milf",
 "fucking": "dick flapping",
 "fucken": "dick flappin",
 "fucked": "dick flapped",
 "fucker": "dick flapper",
 "fuck": "dick flap",
 "wtf": "What the shiiiit!?!",
 "goatsemarathon/r": "google",
 "what the hell": "what the SHiitttt!?!?",
 "jackass": " pube eater",
 "jackoff" : " hand sex ",
 "jerkoff" : "hand sex",
 "jizz" : " baby gravy",
 "lmao": "THAT IS SOOO FUCKING FUNNY!!!",
 "lmfao": "THAT IS SOOO FUCKING FUNNY!!!",
 "lastmeasure/r": "google",
 "meatspin/r": "google",
 "muff diving" : "",
 "mudfall/r": "google",
 "motherman/r": "google",
 "men-in-pantyhose/r": "google",
 "niggaz": " gay partner", 
 "nigger": " HOMO person", 
 "nigga": " gay partner",
 "omg": "HOLY SHIT!!",
 "pussy cat": "vagina kitty",
 "pussycat": "vaginakitty",
 "pussy ": "pussy",
 "free porn" : "free pwn",
 "porn/r" : "",
 "penisbot": "",
 "pressurespot/r": "google",
 "pokehole/r": "google",
 "phreak/r": "google",
 "queef" : "vag fart",
 "anonymous sex" :"",
 "skin flute" : "skin flute",
 "shit": "SHIT",
 "swollentip/r": "google",
 "twat" : "cunt!",
 "thepounder/r": "google",
 "tubgirl/r": "google",
 "tubboy/r": "google",   
 "wanker" : "penishead",
"xxx/r":"",
 "youaresogay/r": "google"
}, "gi"); 




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




function sanitize(s, noContext, notredirect) { 
	
  for (var j = 0; j < bad.length; j++) { 
    if(noContext && modifiers[j].indexOf("c") != -1 || notredirect && modifiers[j].indexOf("r") !=-1 ) {  
     continue;
    } 
    s = s.replace(bad[j], good[j]);
  } 
  return s;  
} 

 
if(document.title) 
{
	var temp = sanitize(" "+document.title+" ", false , true);
	document.title = temp.substring(1,temp.length -1);
	
}


var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
  for (var i = 0; i < textnodes.snapshotLength; i++) { 
  node = textnodes.snapshotItem(i);
  node.data = sanitize(" "+node.data+" ", false, true);
  node.data = node.data.substring(1,node.data.length -1);
}

})();