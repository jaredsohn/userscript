// ShrinkTweet v0.9
// By Dipesh Acharya (aka xtranophilist)
// Last updated: November 05, 2010
// 
// ==UserScript==
// @name           ShrinkTweet
// @namespace      http://motorscript.com/
// @author	   xtranophilist (Dipesh Acharya)
// @version	   v0.9
// @description    Shrinks your tweet using informal abbreviations!
// @include        http*://*twitter.com/*
//
// ==/UserScript==

function shrinkText(str) {//returns shortened informal slang words
        //author : xtranophilist
	var re = {};
	//Create a replacement array
	r = {   "at": "8",
                "photograph": "photo",
                "microphone": "mic",
                "medical": "medic",
                "memorandum": "memo",
                "brother": "bro",
                "sister": "sis",
                "welcome": "wlcm",
                "once": "1ce",
		"you": "u",
		"your": "ur",
		"before": "b4",
		"after": "af8r",
		"tomorrow": "2moro",
		"have": "ve",
		"don't": "dont",
		"friend": "fren",
		"friends": "frens",
		"better": "b8r",
		"oh": "o",
		"too": "2",
		"to": "2",
		"busy": "bg",
		"today": "2day",
		"together": "2gether",
		"do not": "dont",
		"have not": "vent",
		"yeah": "ya",
		"didn't": "didnt",
		"did not": "didnt",
		"hadn't": "hadnt",
		"wasn't": "wasnt",
		"haven't": "vent",
		"for": "4",
		"to you": "2u",
		"as a matter of fact": "AAMOF",
		"any day now": "ADN",
		"girl": "gal",
		"girls": "gals",
		"as far as i know": "AFAIK",
		"away from keyboard": "AFK",
		"also known as": "AKA",
		"as soon as possible": "ASAP",
		"boy friend": "bf",
		"boy fren": "bf",
		"girl friend": "gf",
		"girl fren": "gf",
		"be right back": "BRB",
		"be": "b",
		"by the way": "BTW",
		"the": "da",
		"see": "c",
		"see you": "CU",
		"fuck": "f*",
		"see ya": "CYa",
		"do not disturb": "DND",
		"don't disturb": "DND",
		"dont disturb": "DND",
		"for your information": "FYI",
		"great": "gr8",
		"have a nice day": "HAND",
		"hate": "h8",
		"love": "luv",
		"loves": "luvs",
		"i dont know": "IDK",
		"i don't know": "IDK",
		"i do not know": "IDK",
		"later": "l8r",
		"laughing my ass off": "LMAO",
		"laughing my fucking ass off": "LMFAO",
		"Microsoft": "MS",
		"laugh out lod": "LOL",
		"laughing out lod": "LOL",
		"mind your own business": "MYOB",
		"mate": "m8",
		"one": "1",
		"two": "2",
		"three": "3",
		"four": "4",
		"five": "5",
		"six": "6",
		"seven": "7",
		"eight": "8",
		"nine": "9",
		"ten": "10",
		"eleven": "11",
		"anyone": "NE1",
		"no problem": "NP",
		"no problems": "NP",
		"oh i see": "OIC",
		"oh, i see": "OIC",
		"oh, my god": "OMG",
		"oh my god": "OMG",
		"o, my god": "OMG",
		"o my god": "OMG",
		"operating system": "OS",
		"internet explorer": "IE",
		"on the phone": "OTP",
		"peer to peer": "P2P",
		"please": "pls",
		"point of view": "POV",
		"people": "ppl",
		"really": "rly",
		"rolling on the floor laughing": "ROFL",
		"rolling on floor laughing": "ROFL",
		"regarding your comment": "RYC",
		"thanks": "thx",
		"thanx": "thx",
		"thank you": "thnku",
		"take your time": "TYT",
		"with": "w/",
		"without": "w/",
		"what the fuck": "WTF",
		"what the heck": "WTH",
		"wait": "w8",
		"why": "y",
		"right": "rite",
		"dollar": "$",
		"dollars": "$",
		"about": "abt",
		"happy": ":)",
		"sad": ":-(",
		"smile": ":-)",
		"in my opinion": "IMO",
		"in my humble opinion": "IMHO",
		"some": "sum",
		"someone": "sum1",
		"noone": "no1",
		"birthday": "bday",
		"college": "clz",
		"information": "info",
		"technology": "tech",
		"forever": "4evr",
		"forget": "4get",
		"forgive": "4give",
		"forgot": "4got",
		"life": "lyf",
		"from": "4m",
		"forward": "4wad",
		"best friends forever": "BFF",
		"and": "&",
		"yes": "s",
		"for you": "4u",
		"sucker": "sckr",
		"will": "ll",
		"you will": "u'll",
		"they will": "they'll",
		"should": "shd",
		"should not": "shdnt",
		"shouldn't": "shdnt",
		"good": "gud",
		"wouldn't": "wudnt",
		"would not": "wudnt",
		"first": "1st",
		"second": "2nd",
		"third": "3rd",
		"fourth": "4th",
		"fifth": "5th",
		"sixth": "6th",
		"seventh": "7th",
		"eighth": "8th",
		"ninth": "9th",
		"tenth": "10th",
		"am": "m",
		"hello": "hlw",
		"he is": "he's",
		"she is": "c's",
		"he has": "he's",
		"she has": "c's",
		"doing": "doin",
		"okay": "OK",
		"i would": "i'd",
		"he would": "he'd",
		"she would": "c'd",
		"they would": "they'd",
		"we would": "we'd",
		"between": "btwn",
		"would": "wud",
		"around": "aroun",
		"tonight": "2nite",
		"night": "nite",
		"what": "wat",
		"are": "r",
		"she": "c",
                //abbreviations:
                "for example" : "eg",
                "e.g." : "eg",
                "that is" : "ie",
                "i.e." : "ie",
                "versus" : "vs",
                "please answer" : "RSVP",
                "not in my backyard" : "NIMBY",
                "camera" : "cam",
                //blends:
                "binary digit" : "bit",
                "camera recorder" : "camcorder",
                //clippings
                "examination" : "exam",
                "telephone" : "phone",
                "influenza" : "flu",
                "mobile" : "mob"
              	};
	//Add word boundary and create string to be used for regular expressions
	for (key in r) {
		re["\\b" + key + "\\b"] = r[key];
	}

	//Make the replacements based on re
	str = replaceExp(str, re);


	//replace *ing with in
	r = {
		"ing\\b": "in",
		"ings\\b": "ins"
	};

	//Make the replacements
	for (key in r) {
		rx = new RegExp(key, 'g');
		str = str.replace(rx, r[key]);
	}
	//return the new string
	return str;

}

function getElementsByClass(className,tagName, tree){
               tagName = typeof(tagName) != 'undefined' ? tagName : '*';
                var result=new Array();
                var c=0;
                var tags=tree.getElementsByTagName(tagName);
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].className == className)   {
                        result[c++]=tags[i];
                    }
                }
                return result;
}

function replaceExp(str, re) { //performs replacement on str based as described on re
	for (key in re) {
		//create new regular expression key, case insensitive one
		rx = new RegExp(key, 'i');
		//search for the regular expression in the string
		index = str.search(rx);
		//if the search finds something
		while (index != -1) {
			//Check if capital letter
			if (str.charAt(index) >= "A" && str.charAt(index) <= "Z") {
				//replace it with capitalized word
				str = str.replace(rx, capitalize(re[key]));
			}
			else {
				//perform the replacement
				str = str.replace(rx, re[key]);
			}
			//search for the next match
			index = str.search(rx);
		}
	}
	return str;
}

function capitalize(str){// Returns: a copy of str with the first letter capitalized
	return str.charAt(0).toUpperCase() + str.substring(1);
}

function init(){
var rows = getElementsByClass("tweet-row","div",document);
if (rows.length==0) setTimeout(init, 1000);
else kickOff();
}

function addButtonToRow(theRow){
    var tweetCounter = getElementsByClass("tweet-spinner","img",theRow);
    var shrinkButton = document.createElement('a');
    shrinkButton.href="#";
    shrinkButton.className="shrink-button button";
    shrinkButton.setAttribute("style","margin-right:10px;");
    shrinkButton.innerHTML="Shrink!";
    theRow.insertBefore(shrinkButton,tweetCounter[0]);
    return shrinkButton;
}

function processText(theEditor){
    theEditor.value=shrinkText(theEditor.value);
    theEditor.focus();
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", true, true );
    theEditor.dispatchEvent(evt);
    }

function kickOff(){
var theButton = addButtonToRow(getElementsByClass("tweet-button-container","div",document)[0]);
var theEditor = getElementsByClass("twitter-anywhere-tweet-box-editor","textarea",document)[0];
theButton.addEventListener("click", function(){processText(theEditor);}, false);
}

function checkInsertion(event){
    var theButton;
    if (event.target.className=="twitter-anywhere-tweet-box-editor") {//catching the text box insertion
        theButton = document.getElementById("shrink-button-dialog-"+c);
        theButton.addEventListener("click", function(){processText(event.target);}, false);
    }
    if (event.target.className=="tweet-box condensed") {//catching the tweet-box insertion
        theButton = addButtonToRow(getElementsByClass("tweet-button-container","div",event.target)[0]);
        theButton.id="shrink-button-dialog-"+(++c);
    }
    
}

var c=0;
document.addEventListener('DOMNodeInserted', checkInsertion, false);
init();