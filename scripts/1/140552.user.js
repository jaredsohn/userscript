// ==UserScript==
// @name        KG - create pot
// @namespace   KG
// @include     http*://*karagarga.net/details.php?*
// @include     http*://forum.karagarga.net/index.php?app=forums&module=post&section=post&do=new_post*
// @grant	GM_addStyle
// @version     0.4
// ==/UserScript==

// set desired translation language here
var translateTo = "English";
// end of settings


var postURL = "https://forum.karagarga.net/index.php?app=forums&module=post&section=post&do=new_post&f="

// don't run in iFrames
if (!window.frameElement) {

        if (window.location.href.indexOf('&potscript=true') != -1) {  
        	potForum();
        } else if (window.location.href.indexOf('/details.php') != -1) {
        	potButton();
        }

} // end iframe check


function potButton() {
        
        var headings = document.querySelectorAll(".heading");
        
        // get language and some references
        for (i=0; i < headings.length; i++) {
              if (headings[i].textContent.indexOf('Language') == 0) {
                      var lang = headings[i].parentNode.getElementsByTagName('td')[1].textContent.toLowerCase();
                      var langOrig = headings[i].parentNode.getElementsByTagName('td')[1].textContent;
              }
              if (headings[i].textContent.indexOf('Subtitles') == 0) {
              		var subs = headings[i].parentNode.getElementsByTagName('td')[1];
              }
        }	
	
	if (!lang) return;
	
	// choose which subforum ref
	if        (lang.indexOf('czech') == 0) {    //  other spellings?
		ref = "110";
	} else if (lang.indexOf('french') == 0) {
		ref = "90";		
	} else if (lang.indexOf('german') == 0) {
		ref = "92";				
	} else if (lang.indexOf('italian') == 0) {
		ref = "93";				
	} else if (lang.indexOf('japanese') == 0) {
		ref = "91";				
	} else if (lang.indexOf('russian') == 0) {
		ref = "96";				
	} else if (lang.indexOf('spanish') == 0 || lang.indexOf('portuguese') == 0) {
		ref = "97";				
	} else if (lang.indexOf('english') == 0) {
		ref = "95";				
	} else {
		ref = "94"; // all other languages;
	}
		
// console.log(lang + " : " + ref);

	// get data for passing into link
	var potAnnounce = "&potannounce=" + encodeURIComponent(window.location.href);
	var potLang = "&potlang=" + encodeURIComponent(langOrig);
	var title = trimString(document.querySelector('h1').textContent);
	var potTitle = "&pottitle=" + encodeURIComponent(title);
	for (i=0; i < document.links.length; i++) {
		if (document.links[i].href.indexOf('userdetails.php?id=') != -1) {
			var potUserURL = "&potuserurl=" + encodeURIComponent(document.links[i].href);
			break;
		}
	}
	
	// create link
	var url = postURL + ref + "&potscript=true" + potAnnounce + potLang + potTitle + potUserURL;
	  
        var potForm = document.createElement('div');
        potForm.id = "potForm";
        potForm.innerHTML = ' <form id="makePot"> <input name="bonusgigs" size="5" value="5" style="text-align: right">  <label>GB</label> '
        		+ ' <input type="button" value="Make Pot" onclick="window.open(\' ' + url + '&potgigs=\' + document.forms.makePot.bonusgigs.value);">  </form> ';
        
        subs.insertBefore(potForm, subs.nextSibling);
        
        GM_addStyle("#potForm { margin-bottom: 5px; margin-top: 5px; border-top: dashed 1px #444; padding: 1em; border-bottom: solid 1px #000; }");
}


function potForum() {
	// reference elements
	var post = document.getElementById('ed-0_textarea');
	var postTitle = document.getElementById('topic_title');
	var postDesc = document.getElementById('topic_desc');
	
	// get data
	var potAnnounce = getParameterByName("potannounce");
	var potLang = getParameterByName("potlang");
	var potTitle = getParameterByName("pottitle");
	var userURL = getParameterByName("potuserurl");
	var bonusGigs = getParameterByName("potgigs");
	
	// build post text
	var text = potTitle + "\n\n"
		+ "torrentpage: " + potAnnounce + "\n\n"
		+ "Film language: " + potLang + " \n\n"
		+ "Requested language: " + translateTo + "\n\n"
		+ "Bonus offered: + " + bonusGigs + " GB from me \n\n"
		+ "----------- \n\n"
		+ "total: " + bonusGigs + " GB \n\n"
		+ "My user page: " + userURL;
	
	postTitle.value = potTitle;
	postDesc.value = potLang + " --> " + translateTo;
	post.value = text;

}




function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function trimString(str) {
	return str.replace(/^\s+|\s+$/g, '');
}
