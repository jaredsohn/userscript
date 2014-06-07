// ==UserScript==
// @name           dict.cc enhanced
// @namespace      http://www.constantinmedia.com/
// @description	   Adds some new features to dict.cc to tweak the UI and enhance the set of functions, like quick acces to add inflections for an entry via the info menu.
// @version        1.9.6
// @creator        Constantin Groß
// @include        http://dict.cc/
// @include        http://*.dict.cc/
// @include        http://dict.cc/*
// @include        http://*.dict.cc/*
//

//  Changelog
//  2013-02-17 v1.9.6
//  - new feature: Alt+Click a search result to open more results for the clicked word/phrase instead of the result detail page (Strg+Alt+Click for a new tab/window)
//  - further inflection improvement
//  2013-02-15 v1.9.5
//  - fix: user name linking in audio history stopped working
//  2013-02-15 v1.9.4
//  - fix: user profile pic placeholder stopped working
//  2013-02-15 v1.9.3
//  - further inflection improvements
//  - fix: inflection didn't appear in the info menu
//  - fix: userscript settings stopped working
//  2011-05-28 v1.9.2 (hot fix release)
//  - fixed a bug with German inflection suggestions
//  - small improvement of German inflection suggestions
//  2011-05-27 v1.9.1
//  - improvement of Spanish and German inflections
//  - added inflection support for more complex noun entries (e.g. "campo {m} de fútbol")
//  - inflection form: fixed a bug related to the "jump to page" feature caused by a change in jQuery
//  - fix: inflection form: jump to latest entries or last search result page now works language-pair-wise
//  2011-05-25 v1.9
//  - further improvement of the German inflections
//  - Spanish inflections: added basic support for compound words (be prepared for many wrong suggestions! ;))
//  - fixed issue for inflection quick-add with unverified entries
//  - added confirmation dialogue for inflection quick-add with unverified entries
//  2011-01-06 v1.8
//  - Display an error message when the user is not logged in and tries to use the inflection quick-add
//  - Removed email linking feature until further notice because there were too many difficulties associated with it
//  2010-10-27 v1.7
//  - new feature: when adding an inflection, you can now choose which page to display after submission
//  - translation of some strings when UI language is German
//  - even more tweaking of the German plural suggestions
//  - removed redundant special characters from inflection form
//  - fix: make inflection suggestions work even after submitting the form resulted in an error
//  - optimisation for word type recognition needed for inflection quick-add (especially for language combinations with EN other than EN-DE)
//  2010-10-21 v1.6.1
//  - some more tweaking of the German plural suggestions
//  - fixed a bug that could make the inflection quick-add disappear from the info menu under specific circumstances
//  2010-10-13 v1.6
//  - some tweaking of the plural suggestions
//  - inflection comments: present links to duden.de or canoo.net searches in analogy to Google links in inflection comments (e.g. "duden.de/suche/index.php?suchwort=Thalamus" will become "Duden: Thalamus")
//  2010-09-21 v1.5
//  - rudimentary support for inflection suggestions (use with care: currently only English, German and Spanish singular nouns and most likely many wrong proposals!)
//  - option to enable/disable linking of usernames in audio voting history and comments (enhanced settings section; sorry, should have been there earlier!)
//  - fixed enhanced settings disappearing from the "My Account" page due to changes made by Paul
//  2010-08-28 v1.4.1
//  - tiny fix for some email-addresses that still didn't get linked
//  - some cosmetical stuff you probably won't even notice ;)
//	2010-08-28 v1.4
//  - do not add inflection option for unsupported word classes
//  - fixed a bug where email-addresses were not always linked
//  - add a default text to my user page when users come to it via the "contact author" or footer link
//  - introdocing a one-time message after installation or update of the script
//	2010-06-14 v1.3
//  - auto article recognition for Spanish, Portuguese, French and Italian noun inflections
//  - important bug fix: inflection quick-add for language pairs other than English and German would cause erroneous entries
//  - more frequent update check
//	2010-06-11 v1.2
//  - remove ® from entries when adding inflections
//  - quick-add bars at caret position on the inflection form
//  - link user names to user pages in audio voting comments/history box
//  2010-06-11 v1.1
//  - fixed html entities bug for inflections
//  - tries to add the right article to nouns on German inflections
//  2010-06-11 v1.0
//	- links email addresses on user pages
//  - adds common textblocks below the message field when contacting a user in reply to an entry
//	- adds a new function "Inflections" to the info menu for quick-jumping to the inflection form (tries to find the right word class automatically)
//	- adds a dummy picture to profile pages without a picture
//  - userscript settings section on the "My Account" page
// ==/UserScript==

// auto update check
var SUC_script_num = 78829;

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var $;
var UScriptName = "dict.cc enhanced";
var UScriptVersion = "1.9.6";
var ContactLink = "http://users.dict.cc/Connum/?ref=dcce";
var VersionNote = "Changes in this version:<ul><li>further inflection improvements</li><li>fix: inflection didn't appear in the info menu</li><li>fix: userscript settings stopped working</li><li>fix: user profile pic placeholder stopped working</li><li>fix: user name linking in audio history stopped working</li></ul>"; // displayed in dcceInfoBox

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }
	
// common functions and helpers
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function Settingsobject(){
  this.prefix="";
  this.default={};
}
Settingsobject.prototype.set=function(name, value){
  if(typeof value == "boolean")
    value = value ? "{b}1" : "{b}0";
  else if(typeof value == "string")
    value = "{s}" + value;
  else if(typeof value == "number")
    value = "{n}" + value;
  else
    value = "{o}" + value.toSource();
  GM_setValue(this.prefix+""+name, value);
}
Settingsobject.prototype.get=function(name){
  var value=GM_getValue(this.prefix+""+name, this.default[name] || "{b}0")
  if(!value.indexOf)
    return value;
  if(value.indexOf("{o}")==0){
    try{
      return eval("("+value.substr(3)+")");
    }catch(e){
      GM_log("Error while calling variable "+name+" while translating into an object: \n\n"+e+"\n\ncode:\n"+value.substr(3))
      return false;
    }
  }
  if(value.indexOf("{b}")==0)
    return !!parseInt(value.substr(3));
  if(value.indexOf("{n}")==0)
    return parseFloat(value.substr(3));
  if(value.indexOf("{s}")==0)
    return value.substr(3);
  return value;
}
Settingsobject.prototype.register=function(name, defaultvalue){
  this.default[name]=defaultvalue;
  return true;
}

// create settings object
var globalSettings=new Settingsobject();
function setSetting(sName, sValue) {
	window.setTimeout(function() { globalSettings.set(sName,sValue); }, 0);
}

// get language code needed for some functions
var langCode = unsafeWindow.lpp1+unsafeWindow.lpp2;

// default settings on first run
globalSettings.register("dcc.textblocks",{"guidelines": "guidelines", "see my comment": "see my comment", "disambiguation": "disambiguation"});
globalSettings.register("dcc.showDummy",true);
globalSettings.register("dcc.linkMail",true);
globalSettings.register("dcc.linkUsers",true);
globalSettings.register("dcc.inflMenu",true);
globalSettings.register("dcc.inflSuggestions",true);
globalSettings.register("dcc.jumpAfterInfForm",true);
globalSettings.register("dcc.gotoAfterInfForm-"+langCode,"history");

// own functions
function cleanEntry(input) {
	output = input.replace(/<a.*?>Unverified<\/a>/g,""); // remove "Unverified" label
	output = output.replace(/<(var|dfn|kbd|abbr|div).*?>.*?<\/(var|dfn|kbd|abbr|div)>/g,""); // remove gender, abbreviations etc.
	output = output.replace(/<\/?.*?>/g,""); // remove html tags
	output = output.replace(/[\s]+/g," "); // remove multiple spaces
	output = output.replace(/\&[A-Za-z0-9]+;/g,""); // remove entities
	output = output.replace(/®/g,""); // remove ®-sign
	output = output.replace(/[0-9]+/g,""); // remove numbers from the end
	//output = $('<input type="text" name="temprefwordvar"/>').html(output).text();
					
	return $.trim(output);
}

// inline graphics
var emptypicture = "data:image/jpeg;base64,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";
var inflIco = "data:image/gif;base64,R0lGODlhEAAQAJECAP///5nMAP///wAAACH5BAEAAAIALAAAAAAQABAAAAIolI+pi+EPo4gO0DCppTlueX1QBpRVZWLh1UHi0z6vE5/cel8sw/dJAQA7";
var transPix = "data:image/gif;base64,R0lGODlhAQABAPcAAMbGxv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAAALAAAAAABAAEAAAgEAAEEBAA7";

// get UI language
var UIlang = unsafeWindow.ui_lang;

// common texts depending on UI language ###
var infoTextInflectionSuggestions = (UIlang == "de" ? "Die Bildung von Pluralformen ist in vielen Sprachen sehr kompliziert, zumal es für jede Regel auch Ausnahmen geben kann. Benutze diese Funktion daher mit Bedacht und setze sie nicht für Inflektionsformen ein, die Dir nicht geläufig sind! Es ist eher dazu gedacht, bei regulären Formen Zeit beim Tippen zu sparen und wird wahrscheinlich nie zu 100% funktionieren - mach Dich also auf fehlerhafte Vorschläge gefasst!" : "The structure of plural forms is very complex in many languages and for every rule there are tons of exceptions. Use this feature with care and don\'t use it to enter inflection forms for words you don\'t know! It is rather thought to save you some typing for common word forms and it will probably never be working 100%, so be prepared to get incorrect suggestions!");
var langLabelSuggestion = (UIlang == "de" ? "Vorschlag" : "suggestion");
var langLabelDisplay = (UIlang == "de" ? "Darstellung" : "Display");
var langLabelEnhancedFunctions = (UIlang == "de" ? "Erweiterte Funktionen" : "Enhanced Functions");
var langLabelSaved = (UIlang == "de" ? "GESPEICHERT" : "SAVED");
var langLabelContact = (UIlang == "de" ? "Autor kontaktieren" : "contact author");
var langLabelVisitUSorg = (UIlang == "de" ? "userscripts.org besuchen" : "visit userscripts.org");
var langLabelRegarding = (UIlang == "de" ? "Bezüglich" : "Regarding");
var langLabelAddInflections = (UIlang == "de" ? "Inflektionen hinzufügen" : "Add inflections");
var langLabelMyPageButtonFallback = (UIlang == "de" ? "Meine Daten" : "My Page");
var langLabelLoginForInflections = (UIlang == "de" ? "Du musst eingeloggt sein, um Inflektionen hinzufügen zu können!" : "You must be logged in to enter inflections!");
var langLabelUnverifiedInflection = (UIlang == "de" ? "Dieser Eintrag ist noch nicht verifiziert. Inflektion dennoch hinzufügen?" : "This is an unverified entry. Do you realy want to add an inflection for it?");

var langLabelGotoAfterInfForm = (UIlang == "de" ? "Springe nach der Eintragung zu" : "After submission, go to");
var langLabelRadioHistory = (UIlang == "de" ? "Inflektions-History" : "Inflection history page");
var langLabelRadioLatest = (UIlang == "de" ? "Zuletzt geprüfte Übersetzungen" : "Last &quot;latest verifications&quot; page");
var langLabelRadioSearch = (UIlang == "de" ? "Letzte Suchergebnis-Seite" : "Last search result page");

var langLabelSettings = (UIlang == "de" ? "Einstellungen" : "Settings");
var langLabelSettingsPlaceholder = (UIlang == "de" ? "Platzhalter anzeigen, wenn kein Profilbild auf einer User-Seite existiert" : "Show dummy image on user pages without a profile picture");
var langLabelSettingsLinkMail = (UIlang == "de" ? "Email-Adressen auf den Profilseiten verlinken" : "Link email addresses on profile pages");
var langLabelSettingsLinkUsernames = (UIlang == "de" ? "Benutzernamen in Voting-History/Kommentaren von Sprachaufnahmen verlinken" : "Link Usernames in audio voting history and comments");
var langLabelSettingsAddInfl = (UIlang == "de" ? "Inflektionen-Schnellzugriff zum Infomenü hinzufügen" : "Add inflection quick-add to info menu");
var langLabelSettingsAddSuggestions = (UIlang == "de" ? "Inflektions-Vorschläge anzeigen sofern verfügbar" : "Show inflection suggestions if available");
var langLabelSettingsAddSuggLangs = (UIlang == "de" ? "zur Zeit EN, DE und ES" : "currently only for EN, DE and ES singular nouns");
var langLabelSettingsJump = (UIlang == "de" ? "Option &quot;"+langLabelGotoAfterInfForm+"&quot; unter dem Inflektions-Formular" : "Show option &quot;"+langLabelGotoAfterInfForm+"&quot; below inflection form");

// All your GM code must be inside this function
    function letsJQuery() {
		/**
		 * Insert content at caret position (converted to jquery function)
		 * @link http://alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript
		 */
		$.fn.insertAtCaret = function (myValue) {
		        return this.each(function(){
		                //IE support
		                if (document.selection) {
		                        this.focus();
		                        sel = document.selection.createRange();
		                        sel.text = myValue;
		                        this.focus();
		                }
		                //MOZILLA/NETSCAPE support
		                else if (this.selectionStart || this.selectionStart == '0') {
		                        var startPos = this.selectionStart;
		                        var endPos = this.selectionEnd;
		                        var scrollTop = this.scrollTop;
		                        this.value = this.value.substring(0, startPos)
		                              + myValue
		                              + this.value.substring(endPos, this.value.length);
		                        this.focus();
		                        this.selectionStart = startPos + myValue.length;
		                        this.selectionEnd = startPos + myValue.length;
		                        this.scrollTop = scrollTop;
		                } else {
		                        this.value += myValue;
		                        this.focus();
		                }
		        });

		};
		
		$.fn.outerHTML = function() {
		    return $('<div>').append( this.eq(0).clone() ).html();
		};
		
		addGlobalStyle(
			".tblock { display: block; float:left; border: 1px solid transparent; padding: 2px 4px; margin-bottom: 3px; margin-right: 3px; }\n"
			+ "a.tblock { display: block;float:left;background-color: rgb(221, 221, 221); border: 1px solid rgb(170, 170, 170); }\n"
			+ "a.tblock:hover { background-color: #ffcc66; border: solid darkorange 1px; }\n"
			+ "#dcceInfoBox { background-color: #ffff99; border: 2px solid #ffcc66; padding: 1em; position: relative; line-height: 133%; }\n"
			+ "#dcceInfoBox p { text-align: justify; }\n"
			+ "#dcceInfoBox ul { list-style: square; margin: 0; padding: 0; }\n"
			+ "#dcceInfoBox ul li { margin-left: 1.3em; padding: 0; }\n"
			+ ".dcceInfoToolTip { cursor: pointer; position: relative; color: #3366cc; font-family: serif; font-size: 133%; }\n"
			+ ".dcceInfoToolTip span { display: none; z-index: 999; }\n"
			+ ".dcceInfoToolTip:hover span { font-family: sans-serif; font-size: 12px; display: block; position: absolute; min-width: 369px; text-align: justify; background-color: #ffffdd; padding: 6px 8px 6px 8px; border: solid #333 1px; color: #333; font-weight: normal; }\n"
			+ ".dcceInfoToolTip.top.left span {  right: 3px; bottom: 22px;  }\n"
			+ ".dcceInfoToolTip.bottom.right span {  top: 25px; left: 0;  }\n"
		);

		// check if we should show the information message
		// for debugging:
		// globalSettings.set("dcc.currentVersion",false);
		Vnum = globalSettings.get("dcc.currentVersion");
		
		if(Vnum === false || Vnum < UScriptVersion) {
			
			myPageButton = $('#maincontent div.subnav div').clone();
			if(myPageButton.find('a').length == 1) myPageButtonLabel = myPageButton.find('a').css('text-decoration','none').end().html();
			else myPageButtonLabel = "&quot;"+langLabelMyPageButtonFallback+"&quot;";
			
			pContent = (
				Vnum === false ?
				// first run notes
				'<p>You will find a new section on the bottom of your '+myPageButtonLabel+' page, where you can set up the enhanced features. By default, all features are enabled, but you can easily disable or re-activate any feature if you wish.</p>'
				+ '<ul><li>If you encounter any bugs, you can <a href="'+ContactLink+'">contact me via my user page</a> at any time</li><li>Any Feedback, like feature suggestions, is always welcome as well</li><li>If you like the script, it would be nice if you left a review for the script at <a href="http://userscripts.org/scripts/show/78829">userscripts.org</a></li><li>There is an automatic update check built in, but it is always a good idea to check the <a href="http://userscripts.org/scripts/show/78829" target="_blank">script\'s page at userscripts.org</a> to find out about (new) features</li></ul>'
				+ '<p>And now have fun with '+UScriptName+' v'+UScriptVersion+'! :)</p>'
					:
				// version notes
				'<p>'+VersionNote+'</p>'
			)

			$('<div id="dcceInfoBox"><h1 style="margin-top: 0.3em">Thank you for '+(Vnum === false ? 'installing '+UScriptName : 'updating '+UScriptName+' from v'+Vnum+' to v'+UScriptVersion)+'!</h1><p style="color: #aaa;">This message will only pop up once after installing a new version of '+UScriptName+'.</p>'+pContent+'</div>')
			.hide().prependTo('#maincontent').fadeIn(1200);
			
			$('<span style="display: block; position: absolute; top: 0.3em; right: 0.6em; cursor: pointer; color: #aaa;">[close now]</span>').click(function() {
				$('#dcceInfoBox').slideUp(function() { $(this).remove(); });
			}).appendTo('#dcceInfoBox');
			
			// for testing: 
			// globalSettings.set("dcc.currentVersion","0");
			globalSettings.set("dcc.currentVersion",UScriptVersion);
		}
		
		$('div.aftertable').last().append('<br><strong>'+UScriptName+'</strong> v'+UScriptVersion+' for GreaseMonkey by <a href="'+ContactLink+'">Constantin Groß</a>.');
		
		c_textblocks = globalSettings.get("dcc.textblocks");
	
		wlh = window.location.href; // location
		up = wlh.match(/http:\/\/(.*).dict.cc\/(.*)/); // URL pattern
		sd = up[1]; // subdomain
		pg = up[2]; // page or query
		
		// START PAGE
		if(pg.match(/^$/)) {
			dccRegisterAltClick();
		}
		// ACCOUNT SETTINGS
		else if(pg.match(/^my-account\/$/)) {
			// some stuff to prevent redundance
			savedLabel = '<span style="color: #99cc00; font-weight: bold; display: none;" class="savedLabel"> '+langLabelSaved+'!</span>';
			
			$('table tr:has(.td3nl,.td4nl):last-child').after(
				// add settings headline
				'<tr><td class="td6" colspan="3"><b>'+UScriptName+' &ndash; '+langLabelSettings+'</b></td></tr>'
				
				// 'Version' section
				+ '<tr><td class="td3nl"><b>Version</b></td><td class="td3nl" colspan="2"><ul style="list-style-type: none; padding: 0; margin: 0;">'
				+ '<li><strong>v'+UScriptVersion+'</strong> [<a href="http://userscripts.org/scripts/show/78829" target="_blank">'+langLabelVisitUSorg+'</a>] | [<a href="'+ContactLink+'">'+langLabelContact+'</a>]</li>'
				+ '</ul></td></tr>'
				
				// 'Display' section
				+ '<tr><td class="td4nl"><b>'+langLabelDisplay+'</b></td><td class="td4nl" colspan="2"><ul style="list-style-type: none; padding: 0; margin: 0;">'
				+ '<li><label><input type="checkbox" name="dcc.showDummy"'+(globalSettings.get("dcc.showDummy") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsPlaceholder+savedLabel+'</label></li>'
				/*+ '<li><label><input type="checkbox" name="dcc.linkMail"'+(globalSettings.get("dcc.linkMail") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsLinkMail+savedLabel+'</label></li>'*/
				+ '<li><label><input type="checkbox" name="dcc.linkUsers"'+(globalSettings.get("dcc.linkUsers") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsLinkUsernames+savedLabel+'</label></li>'
				+ '</ul></td></tr>'
				
				// 'Enhanced Functions' section
				+ '<tr><td class="td3nl"><b>'+langLabelEnhancedFunctions+'</b></td><td class="td3nl" colspan="2"><ul style="list-style-type: none; padding: 0; margin: 0;">'
				+ '<li><label><input type="checkbox" name="dcc.inflMenu"'+(globalSettings.get("dcc.inflMenu") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsAddInfl+savedLabel+'</label></li>'
				+ '<li><label><input type="checkbox" name="dcc.inflSuggestions"'+(globalSettings.get("dcc.inflSuggestions") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsAddSuggestions+' <strong class="dcceInfoToolTip top left">[ i ] <span>'+infoTextInflectionSuggestions+'</span></strong> ('+langLabelSettingsAddSuggLangs+')'+savedLabel+'</label></li>'
				+ '<li><label><input type="checkbox" name="dcc.jumpAfterInfForm"'+(globalSettings.get("dcc.jumpAfterInfForm") === true ? ' checked="checked"' : '')+' /> '+langLabelSettingsJump+savedLabel+'</label></li>'
				+ '</ul></td></tr>'
				);
				
				$('input[name^=dcc\\.]').click(function() {
					$status = $(this).is(':checked');
					setSetting($(this).attr('name'),($status ? $status : 'no'));
					$(this).siblings("span.savedLabel").stop(true,true).css({'opacity': 1.0}).show().fadeOut(800);
				});
				
		}
		// USERPAGES
		else if(sd.match(/(^|\.)users/)) {
			nickname = $('#maincontent>h1').text();
			msgarea = $('textarea[name=usermessage]');
			
			// userpage exists
			if(nickname != "") {		
				if(msgarea.length == 1 && msgarea.val().match(/^Re:/m)) {
					sbutton = $('#maincontent .td4 input[type=submit]');
					if(sbutton.length == 1) {
						$('<div id="dcc-textblocks" style="width: 502px;"><strong class="tblock">textblocks:</strong></div><span style="display:block;clear:both;"></span>').insertBefore(sbutton);
						tbs = $('#dcc-textblocks');
						
						for(var label in c_textblocks) {
							var text = c_textblocks[label];
							$('<a href="javascript:;" class="tblock">'+label+'</a>').appendTo(tbs).bind("click",{text: text},function(e) {
								msgarea.val($.trim(e.data.text+"\n\n"+msgarea.val()));
							});
						}
						
					}
				}
				else if(msgarea.length == 1 && nickname == "Connum" && pg.match(/(\?|\&)ref=dcce(\&|$)/)) {
					contactText = langLabelRegarding+' '+UScriptName+' v'+UScriptVersion+':\n\n';
					msgarea.val(contactText);
					msgarea.focus();
				}
				
				if(globalSettings.get("dcc.linkMail") === true) {
					/*contactH3 = 'Contact information';
					contactTD = $('div.td4 h3:contains('+contactH3+')').parent();
					mailpattern = /<h3>.*<\/h3>(|[\s\S]*>[\s]|[\S\s]* )([A-Za-z0-9\.\-\_]*)(<span.*>[\s\S]*<script[\s\S]*\/script>@[\s\S]*<\/span>| at )([\S]*\.[a-z]{2,5})/g;
					markup = contactTD.html();
					if(markup !== null) {
						if(mp = markup.match(mailpattern)) {
							contactTD.html(markup.replace(mailpattern,'<h3>'+contactH3+'</h3>'+mp[1]+'<a href="mailto:'+mp[2]+'@'+mp[4]+'">'+mp[2]+'@'+mp[4]+'</a>'));
						}
					}*/
				}
				
				if(globalSettings.get("dcc.showDummy") === true && $('#maincontent img[src*=\'dict.cc/img/users/\']').length < 1) {
					$('#maincontent .td4 table').eq(0).before('<div style="float: left;"><div style="border-width: 0px 1px 1px; border-style: solid; border-color: rgb(187, 187, 187); padding-bottom: 1px; background-color: rgb(51, 51, 51); margin: 3px 6px;"><img width="150" height="200" style="background-color: white; border: 5px solid white;" alt="'+nickname+'" src="'+emptypicture+'"></div><br></div>');
				}
			}
		}
		// RESULT TABLE
		else if(pg.match(/^latest-verifications.php/)) {
			setSetting("dcc.tempLastLVpage-"+langCode,wlh);
			dccRegisterAltClick();
		}
		// RESULT TABLE
		else if(pg.match(/(\?|&)s=/)) {
			setSetting("dcc.tempLastSearch-"+langCode,wlh);
			dccRegisterAltClick();
			
			if(globalSettings.get("dcc.inflMenu") !== true) return false;
			$('.td7cml img:first-child, .td7cmr img:last-child').live("click",function() {
			$this = $(this);
			
			// patterns for class check
			npattern = /\{(noun|m|f|n|pl|m\.pl|f\.pl|sg|fk|м|ж|c|с|мн|u|de|het|mv)\}/;
			adjpattern = /\{adj\}/;
			pronpattern = /\{pron\}/;
			verbpattern = /\{verb\}/;
			unsupportedpattern = /\{(adv|prep|past-p)\}/;
			
			ltext = $this.closest("tr").find('td.td7nl').eq(0).text();
			rtext = $this.closest("tr").find('td.td7nl').eq(1).text();
			
			// for unsupported word classes, we do not add the inflection option and break
			if(wc = (ltext+" "+rtext).match(unsupportedpattern)) {
				// but first we check if there is not a combination like {adj} {past-p}
				if(!(
					(ltext+" "+rtext).match(npattern) ||
					(ltext+" "+rtext).match(adjpattern) ||
					(ltext+" "+rtext).match(pronpattern) ||
					(ltext+" "+rtext).match(verbpattern)
					)
				) return false;
			}
					
				$('<a href="javascript:;" id="dcceAddInfl" style="background-image: url('+inflIco+'); background-repeat: no-repeat; background-position: 3px 3px;">'+langLabelAddInflections+'</a>').click(function() {
					lr = $this.closest("td").hasClass('td7cmr') ? 1 : 0;
					//$this.closest("tr").find('td.td7nl').eq(lr).css('border','solid red 1px');
					
					infliframe = $('input[onclick^=infl_iframe]');
					if(infliframe.length < 1) {
						window.location.href="javascript:mousewithincm=false;cmclose()";
						alert(langLabelLoginForInflections);
						return false;
					}

					langid = infliframe.eq(lr).outerHTML().match(/infl_iframe\('ifl[12]',([0-9]+),/)[1];

					reftext = $this.closest("tr").find('td.td7nl').eq(lr).text();
					refword = $this.closest("tr").find('td.td7nl').eq(lr).html();
					
					if(refword.match(/<a.*>Unverified<\/a>/g)) {
						if(!confirm(langLabelUnverifiedInflection)) {
							window.location.href="javascript:mousewithincm=false;cmclose()";
							return false;
						}
					}
					
					// entry is a noun, but does not only consist of the noun itself, so add the rest as appendix!
					if(reftext.match(/{[mfn]}.+$/g)) {
						split = refword.split(/({[mfn]})/g);
						refword = split[0];
						appendix = cleanEntry(split[2]);
					}
					
					//clean up reference word
					refword = cleanEntry(refword);
					
					// check for nouns			
					if(ltext.match(npattern) || rtext.match(npattern)) {
						// auto article recognition:
						
						// German
						if((unsafeWindow.lpp1 == "DE" && lr+1 == 2) || (unsafeWindow.lpp2 == "DE" && lr+1 == 1)) {
							language = "DE";
							if(reftext.match(/\{m\}/)) { article = "der "; gender = "m"; }
							else if(reftext.match(/\{f\}/)) { article = "die "; gender = "f"; }
							else if(reftext.match(/\{pl\}/)) { article = "die "; gender = "pl"; }
							else if(reftext.match(/\{n\}/)) { article = "das "; gender = "n"; }
						}
						// Spanish
						if((unsafeWindow.lpp1 == "ES" && lr+1 == 2) || (unsafeWindow.lpp2 == "ES" && lr+1 == 1)) {
							language = "ES";
							if(reftext.match(/\{m\}/)) { article = "el "; gender = "m"; }
							else if(reftext.match(/\{f\}/)) { article = "la "; gender = "f"; }
							else if(reftext.match(/\{m\.pl\}/)) { article = "los "; gender = "mpl"; }
							else if(reftext.match(/\{f\.pl\}/)) { article = "las "; gender = "fpl"; }
						}
						// Portuguese
						if((unsafeWindow.lpp1 == "PT" && lr+1 == 2) || (unsafeWindow.lpp2 == "PT" && lr+1 == 1)) {
							if(reftext.match(/\{m\}/)) article = "o ";
							else if(reftext.match(/\{f\}/)) article = "a ";
							else if(reftext.match(/\{m\.pl\}/)) article = "os ";
							else if(reftext.match(/\{f\.pl\}/)) article = "as ";
						}
						// French
						if((unsafeWindow.lpp1 == "FR" && lr+1 == 2) || (unsafeWindow.lpp2 == "FR" && lr+1 == 1)) {
							if(reftext.match(/\{(m|f)\}/) && refword.match(/^[aeiou]/)) article = "l'";
							else if(reftext.match(/\{m\}/)) article = "le ";
							else if(reftext.match(/\{f\}/)) article = "la ";
							else if(reftext.match(/\{(f|m)\.pl\}/)) article = "les ";
						}
						// Italian
						if((unsafeWindow.lpp1 == "IT" && lr+1 == 2) || (unsafeWindow.lpp2 == "IT" && lr+1 == 1)) {
							if(reftext.match(/\{(m|f)\}/) && refword.match(/^[aeiou]/)) article = "l'";
							else if(reftext.match(/\{m\}/) && refword.match(/^(y|z|gn|ps|s[^aeiou])/)) article = "lo ";
							else if(reftext.match(/\{m\}/)) article = "il ";
							else if(reftext.match(/\{f\}/)) article = "la ";
							else if(reftext.match(/\{m\.pl\}/) && refword.match(/^[aeiou]/) || refword.match(/^(y|z|gn|ps|s[^aeiou])/)) article = "gli ";
							else if(reftext.match(/\{m\.pl\}/)) article = "i ";
							else if(reftext.match(/\{f\.pl\}/)) article = "le ";
						}
						
						// add language for English as well
						if((unsafeWindow.lpp1 == "EN" && lr+1 == 2) || (unsafeWindow.lpp2 == "EN" && lr+1 == 1)) language = "EN";
						
						window.location.href="http://"+sd+".contribute.dict.cc/inflections/edit.php?id=new&langid="+langid+"&inftype=NOUN&fullpage=1"+(typeof(article) != "undefined" ? "&art="+encodeURI(article) : "")+"&refword="+refword+(typeof(language) != "undefined" ? "&l="+language : "")+(typeof(gender) != "undefined" ? "&g="+gender : "")+(typeof(appendix) != "undefined" && $.trim(appendix) != "" ? "&appendix="+encodeURI(appendix) : "");
					}
					// check for adjectives
					else if(ltext.match(adjpattern) || rtext.match(adjpattern)) {
						window.location.href="http://"+sd+".contribute.dict.cc/inflections/edit.php?id=new&langid="+langid+"&inftype=ADJ&fullpage=1&refword="+refword;
					}
					// check for pronouns
					else if(ltext.match(pronpattern) || rtext.match(pronpattern)) {
						window.location.href="http://"+sd+".contribute.dict.cc/inflections/edit.php?id=new&langid="+langid+"&inftype=PRON&fullpage=1&refword="+refword;
					}
					// check for verbs (exception for english verbs)
					else if(ltext.match(verbpattern) || rtext.match(verbpattern) || ( sd.match(/(^en|en$|www)/) && (ltext.match(/^to /) || rtext.match(/^to /) ) ) ) {
						window.location.href="http://"+sd+".contribute.dict.cc/inflections/edit.php?id=new&langid="+langid+"&inftype=VERB&fullpage=1&refword="+refword;
					}
					// else go to the inflection overview
					else {
						window.location.href="http://"+sd+".contribute.dict.cc/?action=inflections-history&f=--PENDING&refword="+refword;
					}
				}).insertAfter($('#overDiv .cmenu a').eq(4));
			});
		}
		// INFLECTION OVERVIEW
		else if(rw = pg.match(/(\?|&)action=inflections-history($|\&)/)) {
			// if we came from the inflection form
			if(globalSettings.get("dcc.jumpAfterInfForm") === true && pg.match(/&tmp=/)) {
				switch(globalSettings.get("dcc.jumpAfterInfForm") === true && globalSettings.get("dcc.gotoAfterInfForm-"+langCode)) {
					case "latest":
						window.location.href=globalSettings.get('dcc.tempLastLVpage-'+langCode);
						break;
					case "search":
						window.location.href=globalSettings.get('dcc.tempLastSearch-'+langCode);
						break;
					case "history":
					default:
						break;
				}
			}
			
			/*$('script').each(function() {
				if(oldf = $(this).html().match(/function infl_new/)) {
					/#*unsafeWindow.infl_new = function(langid, inftype) {
						loc = oldf.match(/location.href = "(.*)"
						alert(langid+", "+inftype);
					}*#/
					return false;
				}
			});*/
		}
		// INFLECTION FORM
		else if(pg.match(/^inflections\/(edit|history)\.php/)) {	
			function dudenLink() {
				links = $('#overDiv font a');
				links.each(function() {
					link = $(this);
					if(parts = link.attr('href').match(/duden\.de\/.*[\&\?]suchwort=(.*?)($|\&)/)) {
						link.html("•&nbsp;Duden: "+decodeURI(parts[1]));
					}
					else if(parts = link.attr('href').match(/canoo\.net\/.*[\&\?]input=(.*?)($|\&)/)) {
						link.html("•&nbsp;Canoo: "+decodeURI(parts[1]));
					}
				});
			}
			
			$("td>b>span:contains('+C')").mouseenter(function(){dudenLink();}).click(function(){dudenLink();});
			
			// proceed only if we are on the form, not the history, to prevent unnecessary calculations
			if(!pg.match(/^inflections\/edit\.php/)) return false;
			
			// insert radio buttons for selection of the page that follows after submission
			// but only if we are entering a new inflection, not voting for an unverified one
			if(globalSettings.get("dcc.jumpAfterInfForm") === true && $('form[name=editform]').prev('table').length<1) {
				gaif = globalSettings.get("dcc.gotoAfterInfForm-"+langCode);
				radioHistory = $('<label><input type="radio" name="aftersub" value="history" '+(gaif == "history" ? 'checked="checked" ' : '')+'/> '+langLabelRadioHistory+'</label><br/>');
				radioLatest = $('<label><input type="radio" name="aftersub" value="latest" '+(gaif == "latest" ? 'checked="checked" ' : '')+(globalSettings.get('dcc.tempLastLVpage-'+langCode) === false ? 'disabled="disabled" ' : '')+'/> '+langLabelRadioLatest+'</label><br/>');
				radioSearch = $('<label><input type="radio" name="aftersub" value="search" '+(gaif == "search" ? 'checked="checked" ' : '')+(globalSettings.get('dcc.tempLastSearch-'+langCode) === false ? 'disabled="disabled" ' : '')+'/> '+langLabelRadioSearch+'</label>');
				//alert(globalSettings.get('dcc.tempLastSearch-'+langCode));
				$('input[type=radio][name=aftersub]').live("change",function() {
					if($(this).prop("checked") === true) {
						// set the "dcc.gotoAfterInfForm" setting
						setSetting("dcc.gotoAfterInfForm-"+langCode,$(this).attr("value"));
					}
				});
				
				$('form[name=editform]').nextAll('div').eq(0).append('<br/><br/><b>'+langLabelGotoAfterInfForm+':</b><br/>',radioHistory,radioLatest,radioSearch);
				$('label:has(input[type=radio]:disabled)').css('color','#aaaaaa');
			}
			
			// if the form has been submitted already, use the URL from before
			if(pg.match(/edit\.php$/) && globalSettings.get("dcc.tempOldPGstring") !== false) pg = globalSettings.get("dcc.tempOldPGstring");
			else setSetting("dcc.tempOldPGstring",pg);
			
			if(rw = pg.match(/(\?|\&)refword=(.*?)($|\&)/)) {
				if(article = pg.match(/(\?|\&)art=(.*?)($|\&)/)) article = decodeURI(article[2]);
				refword = decodeURI(rw[2])
				
				// check for appendix
				if(apx = pg.match(/(\?|\&)appendix=(.*?)($|\&)/)) {
					appendix = " "+decodeURI(apx[2]);
				}
				
				$('#inflinput').val((typeof(article) != "undefined" && article != null ? article : "")+refword+(typeof(appendix) != "undefined" && appendix != null ? appendix : ""));
				
				// start inflection suggestions if possible
				if(globalSettings.get("dcc.inflSuggestions") === true &&  (language = pg.match(/&l=(.*?)($|\&)/)) && ((gender = pg.match(/&g=(m|f|n|mpl|fpl)($|\&)/)) || pg.match(/&l=EN($|\&)/)) ) {
					language = language[1];
					if(gender !== null) gender = gender[1];
					
					// auto-suggestion for German
					if(language == "DE") {
						if(refword.match(/\s/)) return false; // no suggestions for phrases
						else if(gender == "n" && refword.match(/ium$/)) suggestion = refword.replace(/ium$/,"ien");
						else if(gender == "f" && refword.match(/(er|ie|el)$/)) suggestion = refword+"n";
						else if(gender == "n" && refword.match(/er$/)) suggestion = refword/*+"e"*/;
						else if(gender == "m" && refword.match(/[Mm]angel$/)) suggestion = refword.replace(/angel$/,"ängel");
						else if(refword.match(/[LlSs]atz$/)) suggestion = refword.replace(/atz$/,"ätze");
						else if(refword.match(/nis$/)) suggestion = refword+"se";
						else if(refword.match(/(eur|[^ouk][Tt]or|ff|tz|id|rk|eich|iel|ig|ert|lat|such|ment|ing|eil)$/)) suggestion = refword+"e";
						else if(refword.match(/amm$/)) {
							if(gender == "m") suggestion = refword.replace(/amm$/,"ämme");
							else if(gender == "n") suggestion = refword+"e";
						}
						else if(refword.match(/er$/)) suggestion = refword;
						else if(gender == "m" && refword.match(/[Cc]hor$/)) suggestion = refword.replace(/or$/,"öre");
						else if(gender == "m" && refword.match(/(or|nt)$/)) suggestion = refword+"en";
						else if((gender == "m" || gender == "n") && refword.match(/grade$/)) suggestion = refword+"s";
						else if(refword.match(/(tion|ung|et|tät|[Bb]ox|ur|keit|nt|[Uu]hr|ik|ist|iot)$/)) suggestion = refword+"en";
						else if(refword.match(/opf$/)) suggestion = refword.replace(/opf$/,"öpfe");
						else if(gender == "m" && refword.match(/verlag$/)) suggestion = refword+"e";
						else if(refword.match(/ag$/)) suggestion = refword.replace(/ag$/,"äge");
						else if(refword.match(/art$/)) suggestion = refword.replace(/art$/,"ärte");
						else if(refword.match(/adt$/)) suggestion = refword.replace(/adt$/,"ädte");
						else if(refword.match(/[Bb]latt$/)) suggestion = refword.replace(/att$/,"ätter");
						else if(refword.match(/[WwHht]and$/)) suggestion = refword.replace(/and$/,"ände");
						else if(refword.match(/ank$/)) suggestion = refword.replace(/ank$/,"änke");
						else if(refword.match(/[Ss]trauch$/)) suggestion = refword.replace(/auch$/,"äucher");
						else if(refword.match(/ug$/)) suggestion = refword.replace(/ug$/,"üge");
						else if(refword.match(/og$/)) suggestion = refword.replace(/og$/,"öge");
						else if(refword.match(/oß$/)) suggestion = refword.replace(/oß$/,"öße");
						else if(refword.match(/lohn$/)) suggestion = refword.replace(/lohn$/,"löhne");
						else if(refword.match(/aum$/)) suggestion = refword.replace(/aum$/,"äume");
						else if(refword.match(/arkt$/)) suggestion = refword.replace(/arkt$/,"ärkte");
						else if(refword.match(/arg$/)) suggestion = refword.replace(/arg$/,"ärge");
						else if(refword.match(/auf$/)) suggestion = refword.replace(/auf$/,"äufe");
						else if(refword.match(/nall$/)) suggestion = refword.replace(/nall$/,"nalle");
						else if(refword.match(/all$/)) suggestion = refword.replace(/all$/,"älle");
						else if(refword.match(/[Ll]och$/)) suggestion = refword.replace(/och$/,"öcher");
						else if(refword.match(/orn$/)) suggestion = refword.replace(/orn$/,"örner");
						else if(refword.match(/ock$/)) suggestion = refword.replace(/ock$/,"öcke");
						else if(refword.match(/hof$/)) suggestion = refword.replace(/hof$/,"höfe");
						else if(refword.match(/unst$/)) suggestion = refword.replace(/unst$/,"ünste");
						else if(refword.match(/[BbTt]uch$/)) suggestion = refword.replace(/uch$/,"ücher");
						else if(refword.match(/luch$/)) suggestion = refword.replace(/uch$/,"üche");
						else if(refword.match(/[Pp]lan$/)) suggestion = refword.replace(/an$/,"äne");
						else if(gender == "m" && refword.match(/[Nn]agel$/)) suggestion = refword.replace(/agel$/,"ägel");
						else if(gender == "m" && refword.match(/(a|[Tt]ee|[Cc]hef|[Ee]tat)$/)) suggestion = refword+"s";
						else if(gender == "m" && refword.match(/arm$/)) suggestion = refword.replace(/arm$/,"ärme");
						else if(gender == "m" && refword.match(/[Mm]ann$/)) suggestion = refword.replace(/ann$/,"änner");
						else if(gender == "m" && refword.match(/Arm$/)) suggestion = refword.replace(/Arm$/,"Ärme");
						else if(gender == "m" && refword.match(/ahn$/)) suggestion = refword.replace(/ahn$/,"ähne");
						else if(gender == "m" && refword.match(/als$/)) suggestion = refword.replace(/als$/,"älse");
						else if(gender == "m" && refword.match(/[Gg]arten$/)) suggestion = refword.replace(/arten$/,"ärten");
						else if(gender == "m" && refword.match(/[pBb]ruch$/)) suggestion = refword.replace(/uch$/,"üche");
						else if(gender == "m" && refword.match(/ang$/)) suggestion = refword.replace(/ang$/,"änge");
						else if(gender == "m" && refword.match(/ausch$/)) suggestion = refword.replace(/ausch$/,"äusche");
						else if(gender == "m" && refword.match(/(at)$/)) suggestion = refword+"en";
						else if(gender == "m" && refword.match(/([^Hh]oden)$/)) suggestion = refword.replace(/oden$/,"öden");
						else if(gender == "m" && refword.match(/([Gg]ott)$/)) suggestion = refword.replace(/ott$/,"ötter");
						else if(gender == "m" && refword.match(/(aden)$/)) suggestion = refword.replace(/aden$/,"äden");
						else if(gender == "m" && refword.match(/(lt|[^r]at|b|[^e]n|eg|[Oo]rt)$/)) suggestion = refword+"e";
						else if(gender == "m" && refword.match(/[Ss]tuhl$/)) suggestion = refword.replace(/uhl$/,"ühle");
						else if(gender == "m" && refword.match(/[Bb]ogen$/)) suggestion = refword.replace(/ogen$/,"ögen");
						else if(gender == "m" && refword.match(/rat$/)) suggestion = refword.replace(/at$/,"äte");
						else if(gender == "m" && refword.match(/kasten$/)) suggestion = refword.replace(/kasten$/,"kästen");
						else if(gender == "m" && refword.match(/[^Aa]al$/)) suggestion = refword.replace(/al$/,"äle");
						else if((gender == "m" || gender == "n") && refword.match(/([DdRrWw]icht)$/)) suggestion = refword+"e";
						else if((gender == "m" || gender == "n") && refword.match(/(en|el)$/)) suggestion = refword;
						else if(gender == "m" && refword.match(/[Bb]onus$/)) suggestion = refword.replace(/onus$/,"oni");
						else if(gender == "f" && refword.match(/ahn$/)) suggestion = refword.replace(/ahn$/,"ahnen");
						else if(gender == "f" && refword.match(/statt$/)) suggestion = refword.replace(/att$/,"ätten");
						else if(gender == "f" && refword.match(/aus$/)) suggestion = refword.replace(/aus$/,"äuse");
						else if(gender == "f" && refword.match(/(rin|tin|nin|fin|gin|phin)$/)) suggestion = refword + "nen";
						else if(gender == "f" && refword.match(/unft$/)) suggestion = refword.replace(/unft$/,"ünfte");
						else if(gender == "f" && refword.match(/(lt|at|ft|ion|form|ühr)$/)) suggestion = refword+"en";
						else if(gender == "f" && refword.match(/heit$/)) suggestion = null;
						else if(gender == "f" && refword.match(/[Ss]kala$/)) suggestion = refword.replace(/kala$/,"kalen");
						else if((gender == "n" || gender == "m") && refword.match(/Skonto$/)) suggestion = refword.replace(/o$/,"i");
						else if(gender == "n" && refword.match(/[Zz]entrum$/)) suggestion = refword.replace(/um$/,"en");
						else if(gender == "n" && refword.match(/[^S][Kk]onto$/)) suggestion = refword.replace(/o$/,"en");
						else if(gender == "n" && refword.match(/[Bb]ett$/)) suggestion = refword+"en";
						else if(gender == "n" && refword.match(/eum$/)) suggestion = refword.replace(/um$/,"en");
						else if(gender == "n" && refword.match(/aus$/)) suggestion = refword.replace(/aus$/,"äuser");
						else if(gender == "n" && refword.match(/[Gg][rl]as$/)) suggestion = refword.replace(/as$/,"äser");
						else if(gender == "n" && refword.match(/tum$/)) suggestion = refword.replace(/um$/,"ümer");
						else if(gender == "n" && refword.match(/ium$/)) suggestion = refword.replace(/ium$/,"ien");
						else if(gender == "n" && refword.match(/([Hh]otel|o|way|[Ll]eck)$/)) suggestion = refword+"s";
						else if(gender == "n" && refword.match(/(chen|[Ss]chreiben|el)$/)) suggestion = refword;
						else if(gender == "n" && refword.match(/[Hh]olz$/)) suggestion = refword.replace(/olz$/,"ölzer");
						else if(gender == "n" && refword.match(/rad$/)) suggestion = refword.replace(/ad$/,"äder");
						else if(gender == "n" && refword.match(/[BbRrWw]and$/)) suggestion = refword.replace(/and$/,"änder");
						else if(gender == "n" && refword.match(/[wW]ald$/)) suggestion = refword.replace(/ald$/,"älder");
						else if(gender == "n" && refword.match(/(rat|tt|ck|[^e]n|t|nk)$/)) suggestion = refword+"e";
						else if(gender == "n" && refword.match(/ium$/)) suggestion = refword.replace(/ium$/,"ien");
						else if(gender == "n" && refword.match(/ikum$/)) suggestion = refword.replace(/ikum$/,"ika");
						else if(gender == "n" && refword.match(/(ren|fleisch)$/)) suggestion = null;
						else if(gender == "n" && refword.match(/(ial)$/)) suggestion = refword+"ien";
						else if(gender == "n" && refword.match(/(al|el|il|em)$/)) suggestion = refword+"e";
						else if(refword.match(/(e|sche)$/)) suggestion = refword+"n";
						else if(refword.match(/(sch|om|nd|ls)$/)) suggestion = refword+"e";
						else if(gender == "m" && refword.match(/ld$/)) suggestion = refword+"er";
						else if(gender == "n" && refword.match(/(ld|ied)$/)) suggestion = refword+"er";
						
						// always add article "die" for German plural forms
						if(typeof(suggestion) != "undefined") suggestion = (suggestion == null ? "-" : "die "+suggestion);
					}
					else if(language == "EN") {
						article = (refword.match(/^[aeiou]/) ? "an " : "a ");
						// no article for proper nouns and entries beginning with "the "
						if(refword.match(/^([ABCDEFGHIJKLMNOPQRSTUVWXYZ]|the )/)) article = "";
						
						if(1==0) return false; // just to keep the form below...
						else if(refword.match(/(^| )(fish|deer|moose|sheep|bison|salmon|pike|trout|swine)$/)) suggestion = refword;
						else if(refword.match(/(^| )(child)$/)) suggestion = refword+"ren";
						else if(refword.match(/(^| )(ox)$/)) suggestion = refword+"en";
						else if(refword.match(/[lm]ouse$/)) suggestion = refword.replace(/(l|m)ouse$/,"$1ice");
						else if(refword.match(/man$/)) suggestion = refword.replace(/man$/,"men");
						else if(refword.match(/tooth$/)) suggestion = refword.replace(/tooth$/,"teeth");
						else if(refword.match(/goose$/)) suggestion = refword.replace(/goose$/,"geese");
						else if(refword.match(/([sxz]|ch|sh)$/) || (refword.match(/[^aeiou]o$/) && !refword.match(/(rto|rno|nto|iano)$/))) suggestion = refword+"es";
						else if(refword.match(/[^aeiou]y$/) && !refword.match(/[A-Z][a-z]*$/)) suggestion = refword.replace(/y$/,"ies"); // second condition is for exclusion of proper nouns
						else suggestion = refword+"s";
					}
					else if(language == "ES") {
						
						pluralArticle = (gender == "m" ? "los " : "las ")
						function proposal(input) {
							//alert("test");
							if(1==0) return false; // just to keep the form below...
							else if(gender == "f" && input.match(/[td]ad$/)) suggestion = input+"es";
							else if(input.match(/(és|[aeiou]l)$/)) suggestion = input+"es";
							else if(input.match(/ón$/)) suggestion = input.replace(/ón$/,"ones");
							else if(1==1) suggestion = input+"s";
							
							return suggestion;
						}
					
						// compound words
						if(
							(gender == "m" && refword.match(/(.*[oe])[\s](.*o)$/)) || 
							(gender == "f" && refword.match(/(.*a)[\s](.*a)$/)) ||
							(gender == "f" && refword.match(/(.*ad)[\s](.*a)$/)) ||
							(gender == "f" && refword.match(/(.*ón)[\s](.*o)$/)) 
						) {
							matches = refword.match(/(.*([aoe]|ón|ad))[\s](.*([ao]|ón|ad))$/);
							suggestion = pluralArticle+proposal(matches[1])+" "+proposal(matches[3]);
						}
						// single words
						else {
							suggestion = pluralArticle+proposal(refword);
						}
					}
				}

				if(typeof(suggestion) != "undefined") {
					$('<a href="javascript:;">'+(typeof(article) != "undefined" && article != null ? article : "")+refword+(typeof(appendix) != "undefined" && appendix != null ? appendix : "")+' | '+suggestion+(typeof(appendix) != "undefined" && appendix != null ? appendix : "")+'</a>').click(function() {
						$('#inflinput').val($(this).text());
					}).appendTo($('<strong>'+langLabelSuggestion+': </strong><br/><br/>').prependTo($('#maincontent div form').nextAll('div').eq(0).attr('id','dcceSubFormDiv'))).after(' <span class="dcceInfoToolTip bottom right">[ i ] <span>'+infoTextInflectionSuggestions+'</span></span>');
				}
			}
		}	
		// AUDIO HISTORY
		else if(globalSettings.get("dcc.linkUsers") === true && pg.match(/(\?|&)action=audio-history($|\&)/)) {
			$('tr:not(:first-child) td:nth-child(5)').click(function() {
				od = $('#overDiv font');
				aid = (od.html().match(/Rec\. \#([0-9]+)$/))[1];
				// link nicknames in audio voting history
				od.html(od.html().replace(/((\+|\–)[0-9]+ \&nbsp;)([A-Za-z0-9\-]{2,})<br>/g,'$1<a href="http://'+sd.replace(/contribute/,"users")+'.dict.cc/$3/?ref=ah'+aid+'" class="noline">$3</a><br>'));
				// link nicknames in audio comments
				od.html(od.html().replace(/<b>([A-Za-z0-9\-]{2,}):<\/b>/g,'<b><a href="http://'+sd.replace(/contribute/,"users")+'.dict.cc/$1/?ref=ah'+aid+'" class="noline">$1</a>:</b>'));
			});
			
			// link nicknames in audio comments in the "check audio recordings" box
			car = $('div.noline:has(#acv1)');
			aid = (car.find("a[href*='ref=ah']").attr("href").match(/\?ref\=ah([0-9]+)/))[1];
			
			car.find("i b").each(function() {
				$(this).html($(this).html().replace(/by ([A-Za-z0-9\-]{2,}):/, 'by <a href="http://'+sd.replace(/contribute/,"users")+'.dict.cc/$1/?ref=ah'+aid+'" style="color: inherit;" class="noline">$1</a>:'));
			});
		}
		
		function dccRegisterAltClick() {
			//console.log("register alt click");
			$('table .td4nl a, table .td3nl a, table .td7nl a, table .td7nl a').click(function(e){
				if(e.altKey) {
					e.preventDefault();
					var searchUrl = ('/?s='+$(this).attr('href').match(/\/([^\/]*)\.html$/)[1]);
					
					if(e.ctrlKey) window.open(searchUrl);
					else window.location.href=searchUrl;
				}
			});
		}
    }