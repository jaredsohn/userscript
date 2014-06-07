// Last Updated: 09-02-2012
// By SiNiquity (-Bane)

// == VERSION HISTORY ==
// Version 1.2.2:
// - Fixed critical bug when using TW skin.
//
// Version 1.2.1:
// - Fixed failed parsing of [hulu] tags
// - Fixed updated youtube HTML format (uses IFRAME instead of OBJECT)
// - Fires text area change event when adding quote to quick reply
//   (enhances interaction with quick preview)
//
// Version 1.2:
// - Fixed issue with quotes without a post id

// Version 1.1:
// - Fixed issue with extra whitespace sometimes appearing
// - Added :jester: smilie
//
// Version 1.0:
// - First release version
// - Supports smilies, quotes
// - Successfully duplicates [code][php]blah[/php][/code] (which looks like shit)
//
// Version 0.1:
// - First created!
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tribalwar Quick Quote", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Tribalwar Quick Quote
// @namespace     SiNiquity
// @description   Clicking "quote" now quotes the user in quick-reply. Can turn pyramid quoting (quotes within quotes) on/off in User Script Commands.
// @version       1.2.2
// @include       *tribalwar.com/forums/showthread.php*
// ==/UserScript==

if(!String.prototype.trim) {
    String.prototype.trim = function() {
	return this.replace(/^\s*/, "").replace(/\s*$/, "");
	};
}

if(!String.prototype.trimWhitespace) {
    String.prototype.trimWhitespace = function() {
	return this.replace(/^[\n\t]*/, "").replace(/[\n\t]*$/, "");
    };
}

if(!String.prototype.trimNewlines) {
    String.prototype.trimNewlines = function() {
	return this.replace(/^\n*/, "").replace(/\n*$/, "");
    };
}
var pyramidQuote = GM_getValue("pyramidQuote");
if(!pyramidQuote) {
    GM_setValue("pyramidQuote","off");
    pyramidQuote = "off";
}

GM_registerMenuCommand("TW Quick Quote: Pyramid quotes (on)", function(event) {
	GM_setValue("pyramidQuote","on");
	pyramidQuote = "on";
    });

GM_registerMenuCommand("TW Quick Quote: Pyramid quotes (off)", function(event) {
	GM_setValue("pyramidQuote","off");
	pyramidQuote = "off";
    });


function getRealFirstChild(node) {
    var firstChild = node.firstChild;
	
    while(firstChild && ((firstChild.nodeType == 3 && !firstChild.nodeValue.trim()) || firstChild.nodeType == 8)) {
	firstChild = firstChild.nextSibling;
    }
    return firstChild;
}

// ASSUMPTION!
var twQuoteIconSrc = "tw_images/buttons/quote_small.gif";
var quoteIconSrc = "triton_images/buttons/quote_small.gif";
var multiQuoteIconSrc = "http://www.tribalwar.com/forums/triton_images/buttons/multiquote_off.gif";
var quickReply = document.getElementById("vB_Editor_QR_textarea");
var smileyToFile = new Array();
var fileToSmiley = new Array();

function init() {
    if(!quickReply) return;
    for(var i = 0; i < document.images.length; i++) {
	var img = document.images[i];
	var src = img.getAttribute("src");
	if(src == quoteIconSrc || src == multiQuoteIconSrc || src == twQuoteIconSrc) {
	    // All quote images are actually links; grab the link (parent)
	    var link = img.parentNode;
	    
	    // Get the post id from the href
	    var href = link.getAttribute("href");
	    var postId = href.match(/&p=(\d+)/);
	    if(postId.length > 1) {
		postId = postId[1];
	    } else {
		// No post id?
		continue;
	    }
	    
	    link.setAttribute("data-postId", postId);
	    link.setAttribute("href", "javascript:void(0)");
	    
	    // Override default link behavior (href)
	    if(src == quoteIconSrc || src == twQuoteIconSrc) {
		link.addEventListener("click", quoteHandler, true);
	    }// else if(src == multiQuoteIconSrc) {
	    //link.addEventListener("click", multiQuoteHandler, true);
	    //}
	}
    }
}

function createSmiley(imgSrc) {
    if(!imgSrc.match(/^images\/smilies/) && !imgSrc.match(/^\/forums\/images\/smilies\//) && !imgSrc.match(/^images\/icons\//)) {
	return false;
    }

    var fileName = imgSrc.match(/[A-Za-z0-9]+\.[A-Za-z]{3,4}$/);
    if(fileName) {
	fileName = fileName[0];
    }
	
    var smiley = ""

    switch(fileName) {
        case "redface.gif": smiley = ":o:"; break;
	case "jester.gif": smiley =":jester:"; break;
	case "eek.gif": smiley = ":eek:"; break;
	case "thinkerg.gif": smiley = ":idea:"; break;
	case "scared.gif": smiley = ":scared:"; break;
	case "pimp.gif": smiley = ":dapimp:"; break;
	case "bdaysmile.gif": smiley = ":birthday:"; break;
	case "boogie.gif": smiley = ":boogie:"; break;
	case "cheers.gif": smiley = ":cheers:"; break;
	case "doom.gif": smiley = ":doom:"; break;
	case "picard.gif": smiley = ":picard:"; break;
	case "phone.gif": smiley = ":phone:"; break;
	case "hitit.gif": smiley = ":hitit:"; break;
	case "couto.gif": smiley = ":stab:"; break;
	case "psyduck.gif": smiley = ":psyduck:"; break;
	case "fu.gif": smiley = ":fu:"; break;
	case "lolpicard2.gif": smiley = ":picard2:"; break;
	case "nag.gif": smiley = ":nag:"; break;
	case "classic.gif": smiley = ":classic:"; break;
	case "gayfight2.gif": smiley = ":gayfight:"; break;
	case "bandit.gif": smiley = ":bandit:"; break;
	case "ninja.gif": smiley = ":ninja:"; break;
	case "huh.gif": smiley = ":huh:"; break;
	case "browsmiley.gif": smiley = ":brows:"; break;
	case "ladysman.gif": smiley = ":ladysman:"; break;
	case "argue.gif": smiley = ":argue:"; break;
	case "jawdrop.gif": smiley = ":jawdrop:"; break;
	case "wave.gif": smiley = ":wave:"; break;
	case "jester.gif": smiley = ":jester:"; break;
	case "grammar.gif": smiley = ":grammar:"; break;
	case "outofcloset.gif": smiley = ":closet:"; break;
	case "fight.gif": smiley = ":fight:"; break;
	case "simmadown.gif": smiley = ":chill:"; break;
	case "boohoo.gif": smiley = ":boohoo:"; break;
	case "tinfoil.gif": smiley = ":tinfoil:"; break;
	case "confused3.gif": smiley = ":confused:"; break;
	case "old.gif": smiley = ":ofn:"; break;
	case "ctrlk.gif": smiley = ":ctrlk:"; break;
	case "drool.gif": smiley = ":drool:"; break;
	case "satan.gif": smiley = ":satan:"; break;
	case "angel.gif": smiley = ":angel:"; break;
	case "iamwithstupid.gif": smiley = ":withstupi"; break; // Correct!
	case "stfumember.gif": smiley = ":member:"; break;
	case "lol.gif": smiley = ":lol:"; break;
	case "mad.gif": smiley = ":mad:"; break;
	case "rolleyes.gif": smiley = ":rolleyes:"; break;
	case "pics-stfu.gif": smiley = ":Pstfu:"; break;
	case "bigthumb.gif": smiley = ":bigthumb:"; break;
	case "weird.gif": smiley = ":weird:"; break;
	case "heart.gif": smiley = ":heart:"; break;
	case "ugh.gif": smiley = ":ugh:"; break;
	case "hft.gif": smiley = ":happy:"; break;
	case "crbaby.gif": smiley = ":baby:"; break;
	case "hungry.gif": smiley = ":hungry:"; break;
	case "frown.gif": smiley = ":("; break;
	case "worried.gif": smiley = ":worried:"; break;
	case "no.gif": smiley = ":no:"; break;
	case "indifferent.gif": smiley = ":-|"; break;
	case "zzz.gif": smiley = ":zzz:"; break;
	case "clap.gif": smiley = ":clap:"; break;
	case "sick.gif": smiley = ":sick:"; break;
	case "bangin.gif": smiley = ":banging:"; break;
	case "google.gif": smiley = ":google:"; break;
	case "notsigned.gif": smiley = ":notsigned"; break; // Correct!
	case "icon7.gif": smiley = ":)"; break;
	case "bye.gif": smiley = ":bye:"; break;
	case "freak5.gif": smiley = ":ftard:"; break;
	case "thefinger.gif": smiley = ":finger:"; break;
	case "king.gif": smiley = ":king:"; break;
	case "nuts.gif": smiley = ":nuts:"; break;
	case "badrazz.gif": smiley = ":razz:"; break;
	case "attentionwhore.gif": smiley = ":attention"; break; //Correct!
	case "info-smilie.gif": smiley = ":lies:"; break;
	case "disgust.gif": smiley = ":disgust:"; break;
	case "sex.gif": smiley = ":sex:"; break;
	case "soapbox.gif": smiley = ":soapbox:"; break;
	case "rocker.gif": smiley = ":rocker:"; break;
	case "sunny.gif": smiley = ":sunny:"; break;
	case "shrug03.gif": smiley = ":shrug:"; break;
	case "domotwak.gif": smiley = ":domotwak:"; break;
	case "cool.gif": smiley = ":cool:"; break;
	case "cry.gif": smiley = ":cry:"; break;
	case "popblood.gif": smiley = ":popcorn:"; break;
	case "twak.gif": smiley = ":twak:"; break;
	case "alf.gif": smiley = ":ralf:"; break;
	case "ban1.gif": smiley = ":ban:"; break;
	case "flame.gif": smiley = ":flame:"; break;
	case "hurry.gif": smiley = ":hurry:"; break;
	case "shock.gif": smiley = ":shock:"; break;
	case "emo.gif": smiley = ":emo:"; break;
	case "rainbow.gif": smiley = ":rainbow:"; break;
	case "twist.gif": smiley = ":twist:"; break;
	case "colbert.gif": smiley = ":isee:"; break;
	case "pignored.gif": smiley = ":pignored:"; break;
	case "mercy.gif": smiley = ":mercy:"; break;
	case "redx.gif": smiley = ":redx:"; break;
	case "50pages.gif": smiley = ":50pages:"; break;
	case "lolwut.gif": smiley = ":lolwut:"; break;
	case "biggrin.gif": smiley = ":D"; break;
	case "tongue.gif": smiley = ":p:";  break; // Correct!
	case "slant.gif": smiley = ":hrm:"; break;
	case "ofn2.gif": smiley = ":ofn2:"; break;
	case "kiss.gif": smiley = ":kiss:"; break;
	case "grim.gif": smiley = ":reaper:"; break;
	case "nofu.gif": smiley = ":nofu:"; break;
	case "signed.gif": smiley = ":signed:"; break;
	case "wink.gif": smiley = ";)"; break;
	case "roller.gif": smiley = ":roller:"; break;
	case "rofl.gif": smiley = ":rofl:"; break;
	case "flag.gif": smiley = ":flag:"; break;
	case "deal.gif": smiley = ":deal:"; break;
	default: return false;
    }
    return smiley + " ";
}

function createImage(imgElement) {
    var imgSrc = imgElement.getAttribute("src");
    var smiley = createSmiley(imgSrc);
    if(!smiley) {
	return "[IMG]" + imgSrc + "[/IMG]";
    } else {
	return smiley;
    }
}

function createLink(linkElement) {
    var href = linkElement.getAttribute("href");
    return "[URL=\"" + href + "\"]" + createTags(linkElement) + "[/URL]";
}

function createQuoteTag(msg, name, id) {
    if(id) {
	// If there's an id, insert the separator which goes between the name and the id.
	id = ";" + id;
    } else {
	id = "";
    }
    if(name) {
	// If there's a name, add the separator between QUOTE and name
	name = "='" + name + id + "'";
    }
    return "[QUOTE" + name + "]\n" + createTags(msg) + "\n[/QUOTE]\n";
}

function createYoutube(iframeElement) {		
    var src = iframeElement.getAttribute("src");
    var videoId = /www\.youtube\.com\/embed\/([A-Za-z0-9_-]+)/.exec(src);
    if(videoId) {
	videoId = videoId[1];
	return "[YOUTUBE]" + videoId + "[/YOUTUBE]";
    }
    return "";
}

function createHulu(objectElement) {		
    for(var i = 0; i < objectElement.childNodes.length; i++) {
	var child = objectElement.childNodes[i];
	if(child.nodeType == 1 && child.nodeName == "EMBED") {
	    var src = child.getAttribute("src");
	    var videoId = /www\.hulu\.com\/embed\/([A-Za-z0-9_-]+)/.exec(src);
	    if(videoId) {
		videoId = videoId[1];
		return "[HULU]" + videoId + "[/HULU]";
	    }
	}
    }
    var src = iframeElement.getAttribute("src");

    return "";
}

function createFont(fontElement) {
    var size = fontElement.getAttribute("size");	
    if(size) {
	return "[SIZE=\"" + size + "\"]" + createTags(fontElement) + "[/SIZE]"; 
    }
	
    var color = fontElement.getAttribute("color");
    if(color) {
	return "[COLOR=\"" + color + "\"]" + createTags(fontElement) + "[/COLOR]";
    }
	
    var face = fontElement.getAttribute("face");
    if(face) {
	return "[FONT=\"" + face + "\"]" + createTags(fontElement) + "[/FONT]";
    }
}

function createTags(msg, preformatted, ignoreTxt) {
    if(typeof preformatted == "undefined") {
	preformatted = false;
    }
    if(typeof ignoreTxt == "undefined") {
	ignoreTxt = false;
    }

    var taggedMsg = "";
    var child = msg.firstChild || msg;
	
    while(child) {
	if(child.nodeType == 8) {
	    child = child.nextSibling;
	    continue;
	}
	
	if(child.nodeType == 3) {
	    // Text node
	    if(!child.nodeValue.trim() || ignoreTxt) {
		// Empty text node
		child = child.nextSibling;
		continue;
	    }
			
	    if(preformatted) {
		taggedMsg += child.nodeValue;
	    } else {
		// Removes any combination of new lines and tabs at the beginning or end of the text
		// The rationale for this is:
		// - Leaving the new-lines in inadvertantly creates <br> tags
		// - Leaving the tabs in needlessly pollutes the reply UI
		taggedMsg += child.nodeValue.trimWhitespace();
	    }
	}
		
	if(child.nodeType == 1) {
	    if(child.nodeName == "BR") {
		// Creates new lines
		taggedMsg += "\n";
	    }
			
	    if(child.nodeName == "IMG") {
		// Creates image tags
		taggedMsg += createImage(child);
	    }
			
	    if(child.nodeName == "A") {
		// Create link tags
		taggedMsg += createLink(child);
	    }
			
	    if(child.nodeName == "OBJECT") {
		// Create youtube tags (may need to adjust for Hulu tags)
		taggedMsg += createHulu(child);
	    }

	    if(child.nodeName == "IFRAME") {
		// Create youtube tags (may need to adjust for Hulu tags)
		taggedMsg += createYoutube(child);
	    }

	    if(child.nodeName == "FONT") {
		// Create font modifying tags (color, size)
		taggedMsg += createFont(child);
	    }
			
	    if(child.nodeName == "B") {
		// Create bold tags
		taggedMsg += "[B]" + createTags(child) + "[/B]";
	    }
			
	    if(child.nodeName == "I") {
		// Create italics tags
		taggedMsg += "[I]" + createTags(child) + "[/I]";
	    }
			
	    if(child.nodeName == "U") {
		// Create underline tags
		taggedMsg += "[U]" + createTags(child) + "[/U]";
	    }
			
	    if(child.nodeName == "STRIKE") {
		// Create strike-through tags
		taggedMsg += "[STRIKE]" + createTags(child) + "[/STRIKE]";
	    }
			
	    if(child.nodeName == "DIV") {
		if(child.className == "spoiler") {
		    // Create spoiler tags
		    taggedMsg += "[SPOILER]" + createTags(child) + "[/SPOILER]\n";
		} else if(child.className == "alt2") {
		    // Create PHP tags
		    taggedMsg += "[PHP]" + createTags(child, true) + "[/PHP]\n";
		} else if(child.className != "pre-spoiler") {
		    // Mmm, I think this is the "SPOILER" text inside
		    // the spoiler tag. 
		    taggedMsg += createTags(child, false, true);
		}
	    }
			
	    if(child.nodeName == "SPAN") {
		if(child.className == "cspoiler") {
		    taggedMsg += "[SPOILS]" + createTags(child) + "[/SPOILS]";
		} else {
		    taggedMsg += createTags(child, preformatted);
		}
	    }
			
	    if(child.nodeName == "BLOCKQUOTE") {
		taggedMsg += "[INDENT]\n" + createTags(child) + "\n[/INDENT]\n";
	    }
			
			
	    if(child.nodeName == "UL") {
		taggedMsg += "\n[LIST]\n" + createTags(child) + "[/LIST]";
	    }
			
	    if(child.nodeName == "LI") {
		taggedMsg += "[*]" + createTags(child) + "\n";
	    }
			
	    if(child.nodeName == "PRE") {
		if(child.className == "alt2") {
		    taggedMsg += "[CODE]" + createTags(child, true) + "[/CODE]";
		}
	    }
			
	    if(child.nodeName == "CODE") { // used in [PHP]
		taggedMsg += createTags(child, true);
	    }
			
	    if(child.nodeName == "TABLE" && pyramidQuote == "on") {
		var tbody = getRealFirstChild(child);
		var tr = getRealFirstChild(tbody);
		var td = getRealFirstChild(tr);
		var div = getRealFirstChild(td);
				
		var name = ""
		var postId = "";
		var quoteMsg = div;	// If div is not really a DIV, then it's the first part of the quote msg
				
		if(div.nodeName == "DIV") {
		    // div is truly a DIV, hence msg begins at nextSibling
		    quoteMsg = div.nextSibling;
				
		    // Get name
		    var strongNode = div.firstChild;
		    while(strongNode.nodeName != "STRONG") {
			strongNode = strongNode.nextSibling;
		    }

		    name = strongNode.firstChild;
		    while(name.nodeType != 3 || (name.nodeType == 3 && !name.nodeValue)) {
			name = name.nextSibling;
		    }
		    name = name.nodeValue;

		    // Get postId
		    var linkNode = strongNode;
		    while(linkNode && linkNode.nodeName != "A") {
			linkNode = linkNode.nextSibling;
		    }
					
		    if(linkNode) {
			// Get the post id from the href
			var href = linkNode.getAttribute("href");
			postId = href.match(/p=(\d+)/);
			if(postId.length > 1) {
			    postId = postId[1];
			}
		    }
		}
		taggedMsg += createQuoteTag(quoteMsg, name, postId);
	    }
	}		
		
	createdNewLine = false;
	child = child.nextSibling;
    }
	
    return taggedMsg;
}

function scrollToElement(theElement){
    var selectedPosX = 0;
    var selectedPosY = 0;
              
    while(theElement != null){
	selectedPosX += theElement.offsetLeft;
	selectedPosY += theElement.offsetTop;
	theElement = theElement.offsetParent;
    }
                        		      
    window.scrollTo(selectedPosX,selectedPosY);
}

function quoteHandler(e) {
    var result = multiQuoteHandler(e, true);

    // Fire changed event
    changeEvent = document.createEvent("HTMLEvents");
    changeEvent.initEvent("change", true,  true);
    quickReply.dispatchEvent(changeEvent);

    return result;

}

function multiQuoteHandler(e, scroll) {
    var link = e.target.parentNode; // target is img, we want link (parent)
    var postId = link.getAttribute("data-postId");
	
    // Get poster's name
    var nameContainer = document.getElementById("postmenu_" + postId);
	
    // NameContainer --> Link --> Bold --> Name
    // UGH -- Retarded Mozilla whitespace nodes, I swear...
    // this SHOULD be name = nameContainer.firstChild.firstChild.firstChild.nodeValue
    // but nooo, we have to make sure stupid nodes aren't first.
    var nameLink = getRealFirstChild(nameContainer);
    var nameBold = getRealFirstChild(nameLink);
    var nameNode = getRealFirstChild(nameBold);
    var name = nameNode.nodeValue;
	
    // Get actual message
    var msg = document.getElementById("post_message_" + postId);
		
    // Create quote (will recursively transform the msg as needed)
    var quote = createQuoteTag(msg, name, postId);
	
    // Add quote to quick reply (globally defined)
    quickReply.value += quote + "\n";
	
    // Scroll quick-reply scrollbar to the bottom
    quickReply.scrollTop = quickReply.scrollHeight;
	
    if(scroll) {
	// Focus on it
	quickReply.focus();
		
	// Scroll window to quick reply submit button
	var quickReplyForm = document.getElementById("qrform");
	scrollToElement(quickReplyForm);
    }
    return false;
}

init();
