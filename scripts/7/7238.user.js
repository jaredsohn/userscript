// ==UserScript==
// @name           phpBB Advanced Quick Reply Quote Edit Umlaute
// @namespace      http://browseimages.mozdev.org
// @description    An advanced quick reply, quote and edit function that should
//                 work for all phpBB forums.
// @include        */viewtopic.php*
// ==/UserScript==
//
// phpBB Advanced Quick Reply Quote Edit user script
// version 1.0.1
// 26.01.2007
// Copyright (c) 2007, Jürgen
// Some Parts copyright (c) 2005-6, xamm
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "phpBB Advanced Quick Reply Quote Edit user script", and click
// Uninstall.
//
// --------------------------------------------------------------------
//
// Based on the phpBB Quick Reply and the phpBB Quick Edit user script of xamm
// http://userscripts.org/scripts/show/1667
// http://userscripts.org/scripts/show/3528
//
// --------------------------------------------------------------------
// If you have problems with the script or questions to it, feel free to contact
// me per email: juergenbinder@quantentunnel.de
// --------------------------------------------------------------------
//

/*** Begin code by xamm ***/
function encodeFormData(formData){
    
    formData = encodeURI(formData); /*** added by Jürgen ***/
	var encodedData = ''; 
	var t;
	for(i = 0; i < formData.length; i++){
		t = '' + formData.charCodeAt(i).toString(16).toUpperCase();
		if(t.length == 1)
			encodedData += "%0" + formData.charCodeAt(i).toString(16).toUpperCase(); 
		else
			encodedData += "%" + formData.charCodeAt(i).toString(16).toUpperCase();
	}
    encodedData = decodeURI(encodedData); /*** added by Jürgen ***/
    return encodedData;
} 

var submitPost = function(event){
	var replyHREF = event.target.getAttribute('replyHREF').split('?')[0];
	var formData = event.target.getAttribute('formData');
    var postContents = encodeFormData(event.target.previousSibling.previousSibling.value);
    event.target.setAttribute("disabled", "true"); /* added by Jürgen */
	event.target.value = 'Submitting...';
    GM_xmlhttpRequest({
		method: 'POST',
		url: replyHREF,
		data: formData + 'message=' + postContents,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {
			var gotoPost = document.createElement('div');
			gotoPost.innerHTML = responseDetails.responseText;
			var allAs = gotoPost.getElementsByTagName('a');
			for (var i = 0; i < allAs.length; i++)
				if (allAs[i].href.indexOf('viewtopic.php') > 0)
					location.location = allAs[i].href;
			window.location.reload(false);
		}
	});
};

var replyHREF = document.evaluate("//a[contains(@href, 'posting.php?mode=reply')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(replyHREF.snapshotLength != 0)
	replyHREF = replyHREF.snapshotItem(0);
//generally the last one is the proper one
var mainTable = document.evaluate('//table[@class="forumline"]/tbody', document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
if(mainTable.snapshotLength != 0)
	mainTable = mainTable.snapshotItem(mainTable.snapshotLength - 1);

//create the table row for everything to sit in
var qrTableRow = document.createElement('tr');
qrTableRow.align = 'center';

//create the cell for the quick reply stuff
var qrTableDivision = document.createElement('td');
qrTableDivision.className = 'catBottom';
qrTableDivision.style.backgroundImage = 'none!important';
qrTableDivision.style.width = '100%';
qrTableDivision.colSpan = '2';

//create the text area
var qrTextArea = document.createElement('textarea');
qrTextArea.style.width = '80%';
qrTextArea.style.height = '150px';
qrTextArea.style.border = '1px solid #FFFFFF';
qrTextArea.style.paddingLeft = '2px';
qrTextArea.style.paddingBottom = '2px';

/* Changed by Jürgen, begin */
//qrTextArea.style.backgroundColor = '#000000';
qrTextArea.style.backgroundColor = document.bgColor;
//qrTextArea.style.color = '#FFFFFF';
/* Changed by Jürgen, end */

//create a submit button
var qrSubmit = document.createElement('input');
qrSubmit.type = 'button';
qrSubmit.name = 'post';
qrSubmit.className = 'mainoption';
qrSubmit.value = 'Quick Reply';
qrSubmit.style.border = '1px solid #000000';
qrSubmit.addEventListener('click', submitPost, true);
qrSubmit.setAttribute('replyHREF', replyHREF);
qrSubmit.setAttribute('accesskey', 's'); /*** added by Jürgen ***/

var threadID = document.URL.match(/t=\d+/);
if(document.URL.match(/t=\d+/) != null) 
    threadID = threadID[0];
else {
    var i = 0;
    while(!/t=\d+/.test(document.links[i]) && i < document.links.length)
        i++;
    
    /*** added by Jürgen, begin ***/
    if(i == document.links.length) 
        return;
    /*** added by Jürgen, end ***/
    
    threadID = /t=\d+/.exec(document.links[i])[0];
}

qrSubmit.setAttribute("formData", "mode=reply&" + threadID + "&preview=Mensi&post=FlipFlap&attach_sig=on&sid=" + document.getElementsByName("sid")[0].getAttribute("value") + "&"); /*** added by Jürgen ***/ 

qrTableDivision.appendChild(qrTextArea, qrTableDivision);
qrTableDivision.appendChild(document.createElement('br'), qrTableDivision);
qrTableDivision.appendChild(qrSubmit, qrTableDivision);
qrTableRow.appendChild(qrTableDivision, qrTableRow);
mainTable.appendChild(qrTableRow, mainTable);
/*** End code by xamm ***/



/************* Quick Reply with Quote ***************/

/**** 99% Copied from Quick Edit Userscript from xamm, begin ****/
var quoteLinks = document.evaluate("//a[contains(@href, 'posting.php?mode=quote')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < quoteLinks.snapshotLength; i++){
    var qqLink = document.createElement('b');
    qqLink.setAttribute('title', "click to reply this post with quoting it");
    qqLink.style.fontSize = "7pt";
    qqLink.style.cursor = 'pointer';
    qqLink.addEventListener('click', addQuickQuote, true);
    qqLink.innerHTML = ' [ "QQ" ]'; /*** added by Jürgen ***/
    quoteLinks.snapshotItem(i).parentNode.insertBefore(qqLink, quoteLinks.snapshotItem(i).nextSibling);
}
/**** 99% Copied from Quick Edit Userscript from xamm, end ****/

/******* Jürgen's code begin *********/
function addQuickQuote(event) {
    var tbody = event.target.parentNode.parentNode.parentNode
    var bbcode = getBBCode(tbody);
    var td = tbody.parentNode.parentNode.previousSibling.previousSibling;
    var userName = td.getElementsByTagName("b")[0].firstChild.data;
    qrTextArea.value += "[quote=\"" + userName + "\"]" + bbcode + "[/quote]";
    window.scrollTo(0, 1000000);
}

function getBBCode(tbody) {
    var div = tbody.getElementsByTagName("div");
    var bbcode = "";
    
    if(div.length > 0 && div[0].style.overflow == "auto" && div[0].style.width == "100%" /*&& div[0].style.height == "101%"*/ && div[0].getAttribute("class") != null && div[0].getAttribute("class") == "postbody") {
        
        bbcode = convertHTMLtoBBCode("", div[0]);
    } else {
        bbcode = convertHTMLtoBBCode("", tbody.getElementsByTagName("span")[2]);
    }
    
    
    while(bbcode.charAt(bbcode.length - 1) == "\n")
        bbcode = bbcode.substring(0, bbcode.length - 1);
    return bbcode;
}

function isOnlyEmptySpace(string) {
    
    var i = 0;
    
    while(i < string.length && (string.charAt(i) == " " || string.charAt(i) == "\t" || string.charAt(i) == "\n")) {
        i++;
    }
    
    return (i == string.length);
}


function convertHTMLtoBBCode(bbcode, element) {
    
    var after = "";
    var dontCallFirstChild = false;
    
    switch(element.nodeName.toLowerCase()) {
        case "#text": 
                        if((element.parentNode.nodeName.toLowerCase() == "b" && element.parentNode.parentNode.nodeName.toLowerCase() == "span" && element.parentNode.parentNode.attributes != null && element.parentNode.parentNode.getAttribute("class") == "genmed") ||element.data == "Zitat:" ||
                         element.data.substr(element.data.length - 27) == " hat Folgendes geschrieben:" || element.data == "Code:" || ( element.data == "offtopic of the day:" && element.parentNode.nodeName.toLowerCase() == "u" && element.parentNode.parentNode.nodeName.toLowerCase() == "div" ) || element.data == "_________________") {
                            
                            return bbcode;
                         }
                      
                      if(isOnlyEmptySpace(element.data))
                          break;
                      
                      bbcode += element.data.toString().replace(/\n/g, "");
                      
                      break;
        case "a": 
            if(element.href == element.firstChild.data || ( element.href.substr(0, element.href.length - 1) == element.firstChild.data && element.href.charAt(element.href.length - 1) == "/" )) {
                    
                if(element.href == encodeURI(element.href)) {
                    bbcode += element.href;
                 } else {
                     bbcode += "[url]" + element.href + "[/url]";
                 }
                 dontCallFirstChild = true;
             } else {
                 bbcode += "[url=" + element.href + "]"; 
                 after = "[/url]";
             }
        break;
        case "br": 
                  
                  if(!(element.parentNode.nodeName.toLowerCase() == "div" && ( element.previousSibling != null && (element.previousSibling.nodeName.toLowerCase() == "u" || (element.previousSibling.nodeName.toLowerCase() == "br" && element.previousSibling.previousSibling != null && element.previousSibling.previousSibling.nodeName.toLowerCase() == "u" ))))) {
                      
                      bbcode += "\n";
                      
                  }
        break;
        case "img":
        if((element.src.indexOf("templates/dreadforum/images/offtopic_oben.gif") == -1 || !(element.parentNode.nodeName.toLowerCase() == "td" && element.parentNode.getAttribute("align") == "center")) && (element.src.indexOf("templates/dreadforum/images/offtopic_unten.gif")  == -1 || !(element.parentNode.nodeName.toLowerCase() == "td" && element.parentNode.getAttribute("align") == "center" && element.parentNode.getAttribute("valign") == "top"))) {
            
            var pos = document.URL.indexOf("viewtopic.php") - 1;
            
            if(document.URL.substring(0, pos + 1) == element.src.substring(0, pos + 1) && element.src.substr(pos, 15) == "/images/smiles/" && element.getAttribute("alt") != null)  {
              
              switch(element.src.substr(pos + 15)) {
                  
                  case "icon_biggrin.gif": bbcode += ":D"; break;
                  case "icon_smile.gif": bbcode += ":)"; break;
                  case "icon_sad.gif": bbcode += ":("; break;
                  case "totlach.gif": bbcode += ":totlach:"; break;
                  case "icon_eek.gif": bbcode += ":shock:"; break;
                  case "icon_confused.gif": bbcode += ":?"; break;
                  case "icon_cool.gif": bbcode += "8)"; break;
                  case "icon_lol.gif": bbcode += ":lol:"; break;
                  case "icon_mad.gif": bbcode += ":x"; break;
                  case "icon_razz.gif": bbcode += ":P"; break;
                  case "icon_redface.gif": bbcode += ":oops:"; break;
                  case "icon_cry.gif": bbcode += ":cry:"; break;
                  case "icon_evil.gif": bbcode += ":evil:"; break;
                  case "icon_twisted.gif": bbcode += ":twisted:"; break;
                  case "icon_rolleyes.gif": bbcode += ":roll:"; break;
                  case "icon_wink.gif": bbcode += ":wink:"; break;
                  case "icon_exclaim.gif": bbcode += ":!:"; break;
                  case "icon_question.gif": bbcode += ":?:"; break;
                  case "cheesy.gif": bbcode += ":cheesy:"; break;
                  case "kiss.gif": bbcode += ":kiss:"; break;
                  case "icon_neutral.gif": bbcode += ":|"; break;
                  case "icon_mrgreen.gif": bbcode += ":mrgreen:"; break;
                  case "woo.gif": bbcode += ":woo:"; break;
                  case "woo2.gif": bbcode += ":woo2:"; break;
                  case "001_arsch.gif": bbcode += ":arsch:"; break;
                  case "rockets.gif": bbcode += ":rockets:"; break;
                  case "holy.gif": bbcode += ":holy:"; break;
                  case "hammer.gif": bbcode += ":hammer:"; break;
                  case "chain.gif": bbcode += ":chain:"; break;
                  case "klo3.gif": bbcode += ":klo3:"; break;
                  case "blah.gif": bbcode += ":blah:"; break;
                  case "winke.gif": bbcode += ":winke:"; break;
                  case "bounce.gif": bbcode += ":bounce"; break;
                  case "spammer.gif": bbcode += ":spammer:"; break;
                  case "devil.gif": bbcode += ":devil:"; break;
                  case "sex.gif": bbcode += ":sex:"; break;
                  case "drink.gif": bbcode += ":drink:"; break;
                  case "sperm.gif": bbcode += ":sperm:"; break;
                  case "wow.gif": bbcode += ":wow:"; break;
                  case "goil.gif": bbcode += ":goil:"; break;
                  case "klo1.gif": bbcode += ":klo1:"; break;
                  case "bier.gif": bbcode += ":bier:"; break;
                  case "guitar.gif": bbcode += ":guitar:"; break;
                  case "kotz.gif": bbcode += ":kotz:"; break;
                  case "icon_idea.gif": bbcode += ":idea:"; break;
                  case "love.gif": bbcode += ":love:"; break;
                  case "klo2.gif": bbcode += ":klo2:"; break;
                  case "laughing.gif": bbcode += ":laughing:"; break;
                  case "nono.gif": bbcode += ":nono:"; break;
                  case "thumbup.gif": bbcode += ":up:"; break;
                  case "thumbdown.gif": bbcode += ":down:"; break;
                  case "heul.gif": bbcode += ":heul:"; break;
                  case "argue.gif": bbcode += ":argue:"; break;
                  case "bandit.gif": bbcode += ":bandit:"; break;
                  case "bawling.gif": bbcode += ":bawling:"; break;
                  case "bigthumbup.gif": bbcode += ":bigthumbup:"; break;
                  case "birthday.gif": bbcode += ":birthday:"; break;
                  case "boid.gif": bbcode += ":boid:"; break;
                  case "countdown.gif": bbcode += ":countdown:"; break;
                  case "death2.gif": bbcode += ":death2:"; break;
                  case "director.gif": bbcode += ":director:"; break;
                  case "pump.gif": bbcode += ":pump:"; break;
                  case "grazy.gif": bbcode += ":grazy:"; break;
                  case "ukliam.gif": bbcode += ":ukliam:"; break;
                  case "hjtwofinger.gif": bbcode += ":hjtwofinger:"; break;
                  case "wink1.gif": bbcode += ":wink1:"; break;
                  case "king.gif": bbcode += ":king:"; break;
                  case "love2.gif": bbcode += ":love2:"; break;
                  case "lsvader.gif": bbcode += ":lsvader:"; break;
                  case "party.gif": bbcode += ":party:"; break;
                  case "peace.gif": bbcode += ":peace:"; break;
                  case "headbang.gif": bbcode += ":headbang:"; break;
                  case "wink2.gif": bbcode += ":wink2:"; break;
                  case "rolling_eyes.gif": bbcode += ":rolling_eyes:"; break;
                  case "scream222.gif": bbcode += ":scream222:"; break;
                  case "uzi.gif": bbcode += ":uzi:"; break;
                  case "viking.gif": bbcode += ":viking:"; break;
                  case "vampire.gif": bbcode += ":vampire:"; break;
                  case "vuur.gif": bbcode += ":vuur:"; break;
                  case "baby.gif": bbcode += ":baby:"; break;
                  case "deal.gif": bbcode += ":deal:"; break;
                  case "eyes.gif": bbcode += ":eyes:"; break;
                  case "knuddel.gif": bbcode += ":knuddel:"; break;
                  case "luxhello.gif": bbcode += ":luxhello:"; break;
                  case "furz.gif": bbcode += ":furz:"; break;
                  case "nixweiss.gif": bbcode += ":nixweiss:"; break;
                  case "read.gif": bbcode += ":read:"; break;
                  case "remybussi.gif": bbcode += ":remybussi:"; break;
                  case "remykiss.gif": bbcode += ":remykiss:"; break;
                  case "scared.gif": bbcode += ":scared:"; break;
                  case "sleep.gif": bbcode += ":sleep:"; break;
                  case "talker.gif": bbcode += ":talker:"; break;
                  case "user.gif": bbcode += ":user:"; break;
                  case "icon_arrow.gif": bbcode += ":arrow:"; break;
                  case "lipsrsealed.gif": bbcode += ":lipsrsealed:"; break;
                  case "huh.gif": bbcode += ":huh:"; break;
                  case "motz.gif": bbcode += ":motz:"; break;
                  case "applaus.gif": bbcode += ":applaus:"; break;
                  case "icon_surprised.gif": bbcode += ":-o"; break;
                  
                  default: bbcode += "[img]" + element.src + "[/img]"; break;
              }
            
            } else {
                bbcode += "[img]" + element.src + "[/img]";
            }
        } else if(element.src.indexOf("templates/dreadforum/images/offtopic_unten.gif")  != -1) {
            bbcode += "[/offtopic]";
        }
        break;
        case "span":
            if(/*element.getAttribute("class") == "postbody" && (( element.nextSibling != null && element.nextSibling.attributes != null && element.nextSibling.getAttribute("class") == "gensmall") ||*/ (element.attributes.length > 0 && element.getAttribute("class") != null && element.getAttribute("class") == "gensmall") || (element.firstChild != null && element.firstChild.nodeName.toLowerCase() == "br" && element.firstChild.nextSibling != null && element.firstChild.nextSibling.data != null && element.firstChild.nextSibling.data == "_________________")) {
               
               return bbcode;
            
            }
            
            var elyl = element.getAttribute("style");
            
            switch(elyl) {
                case "font-weight: bold;": bbcode += "[b]"; after = "[/b]"; break;
                case "font-style: italic;": bbcode += "[i]"; after = "[/i]"; break;
                case "text-decoration: underline;": bbcode += "[u]"; after = "[/u]"; break;
                default:
                if(elyl != null && elyl.substr(0, 7) == "color: ") {
                    
                    bbcode += "[color=" + elyl.substring(7,elyl.length-1) + "]"; after = "[/color]";
                } else if(elyl != null && elyl.substr(0, 11) == "font-size: ") {
                    var size = elyl.substr(11, 2);
                    if(size.charAt(1) == "p")
                        size = size.charAt(0);
                    bbcode += "[size=" + size + "]"; after = "[/size]";
                }
                
                if(element.attributes != null && element.getAttribute("class") == "genmed") {
                    var quotator = element.firstChild.firstChild.data;
                    var qname = "";
                    var spaces = quotator.match(/ /g);
                    if(spaces != null && spaces.length > 0) {
                        if(quotator.substring(quotator.length - 27) == " hat Folgendes geschrieben:")
                            qname = quotator.substring(0, quotator.length - 27);
                        else if(quotator.substring(quotator.length - 7) == " wrote:")
                            qname = quotator.substring(0, quotator.length - 7);
                    } else if(quotator == "Code:") {
                        bbcode += "[code]";
                        break;
                    }
                    
                    var lala = "";
                    if(qname != "")
                        lala = "=\"" + qname + "\"";
                    
                    bbcode += "[quote" + lala + "]";
                    break;
                }
                
            }
            break;
            case "table":
            if(element.attributes != null && element.getAttribute("class") == "attachtable")
                return bbcode;
            
            if(element.firstChild != null && element.firstChild.firstChild != null && element.firstChild.firstChild.firstChild != null && element.firstChild.firstChild.firstChild.firstChild != null && element.firstChild.firstChild.firstChild.firstChild.src != null && element.firstChild.firstChild.firstChild.firstChild.src.indexOf("templates/dreadforum/images/offtopic_oben.gif") > -1) {
                bbcode += "[offtopic]"; break;
            } else  if(/*element.firstChild.firstChild.firstChild.nextSibling.firstChild.firstChild.firstChild.data*/
               element.getElementsByTagName("b").length > 0 && element.getElementsByTagName("b")[0].firstChild.data == "Code:") {
                after = "[/code]"; break;
            } else {
                after = "[/quote]"; break;
            }
            case "ul": bbcode += "[list]"; after = "[/list]"; break;
            case "li": bbcode += "[*]"; break;
        
        
    }
    
    if(element.firstChild != null && !dontCallFirstChild) {
        bbcode = convertHTMLtoBBCode(bbcode, element.firstChild);
        bbcode += after;
    } 
    
    if(element.nextSibling != null) { 
        bbcode = convertHTMLtoBBCode(bbcode, element.nextSibling);
    }
    
    return bbcode; 
}
/******* Jürgen's code end *********/


/************ Quick Edit, code by xamm ***********/
var addQuickEdit = function(event){
	var editHREF = event.target.previousSibling.href;
	var editHREFPart = editHREF.substring(editHREF.indexOf("posting.php"), editHREF.length);
	var postBody = document.evaluate("//a[@href='" + editHREFPart + "']/../../..//*[@class='postbody']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	postBody = postBody.snapshotItem(0);
    
	if(postBody.getElementsByTagName('textarea').length == 0){
        
        /* Jürgen's code begin */
        var bbcode = getBBCode(event.target.parentNode.parentNode.parentNode);
        /* Jürgen's code end */
        
		var allElements = postBody.getElementsByTagName('*');
		for(j = 0; j < allElements.length; j++)
			allElements[j].style.display = 'none';
		
        var qeDivision = document.createElement("div");
		var qeTextArea = document.createElement('textarea');
		var qeSubmit = document.createElement('input');
		//var qeIFrame = document.createElement("iframe");
		
		qeTextArea.style.width = '100%';
		qeTextArea.style.height = '200px';
		qeTextArea.style.border = '1px solid #000000';
        qeTextArea.style.paddingLeft = '2px';
		qeTextArea.style.paddingBottom = '2px';
        //qeTextArea.style.backgroundColor = '#000000';
        qeTextArea.style.background = document.bgColor; /* added by Jürgen */
        qeTextArea.value = bbcode; /* added by Jürgen */
		//qeTextArea.value = '\n\n\n\n\n\t\t\tGetting post contents...';
		
		qeSubmit.type = 'submit';
		qeSubmit.value = 'Quick Edit';
        qeSubmit.className = 'mainoption';
		qeSubmit.style.border = '1px solid #000000';
        //qeSubmit.style.border = "none";
		qeSubmit.style.position = 'relative';
        qeSubmit.addEventListener('click', editPost, true);
		qeSubmit.setAttribute('editHREF', editHREF);
        qeSubmit.setAttribute("accesskey", "s"); /*** added by Jürgen ***/
        qeSubmit.setAttribute("formData", "mode=editpost&" +    event.target.previousSibling.href.match(/p=\d+/)[0] + "&preview=Mensi&post=Flip_Flap&attach_sig=on&sid=" + document.getElementsByName("sid")[0].getAttribute("value") + "&"); /*** added by Jürgen ***/
        
        /* Jürgen's code begin */
        qeDivision.style.width = "100%";
        qeDivision.style.height = "222px";
        
        qeDivision.style.textAlign = "center";
        qeDivision.appendChild(qeTextArea);
        qeDivision.appendChild(document.createElement("br"));
        qeDivision.appendChild(qeSubmit);
        
        postBody.appendChild(qeDivision);
        /* Jürgen's code end */
        
	} else {
        
		var allElements = postBody.getElementsByTagName('*');
		for(i = 0; i < allElements.length; i++) {
            
			if(allElements[i].style.display == 'none')
				allElements[i].style.display = '';
			else
				allElements[i].style.display  = 'none';
        }
        if(postBody.getElementsByTagName("textarea")[0].style.display == "none")
            postBody.style.textAlign = "";
        else
            postBody.style.textAlign = "center";
	}
    
    
	event.preventDefault();
};

var editPost = function(event){
	var editHREF = event.target.getAttribute('editHREF').split('?')[0];
	var formData = event.target.getAttribute('formData');
	var postContents = encodeFormData(event.target.previousSibling.previousSibling.value);
    event.target.value = 'Submitting...'
    event.target.setAttribute("disabled", "true"); /* added by Jürgen */
	GM_xmlhttpRequest({
		method: 'POST',
		url: editHREF,
		data: formData + 'message=' + postContents,
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		onload: function(responseDetails) {
			window.location.reload(false);
		}
	});
};
var editLinks = document.evaluate("//a[contains(@href, 'posting.php?mode=editpost')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < editLinks.snapshotLength; i++){
	var qeLink = document.createElement('b');
	qeLink.setAttribute('title', "click to edit this post");
	qeLink.style.fontSize = "7pt";
	qeLink.style.cursor = 'pointer';
	qeLink.addEventListener('click', addQuickEdit, true);
	qeLink.innerHTML = ' [ QE ]';
	editLinks.snapshotItem(i).parentNode.insertBefore(qeLink, editLinks.snapshotItem(i).nextSibling);
}
/*** end quick edit, code by xamm ***/