// ==UserScript==
// @name        eHarmony Enhance
// @namespace   http://www.joshrosenbaum.org
// @author      Josh Rosenbaum
// @description Save custom answers for reuse. Highlight and link to keywords. Better handling of always on SSL/HTTPS. Disable extra scrolling of questions/answers. Add Makes/Breaks descriptions. Always expand cover page details.
// @match       http://www.eharmony.com/singles/servlet/user/comm*
// @match       https://www.eharmony.com/singles/servlet/user/comm*
// @match       http://www.eharmony.com/singles/servlet/user/comm/review*
// @match       https://www.eharmony.com/singles/servlet/user/comm/review*
// @version     2.0.0
// @updateURL   https://userscripts.org/scripts/source/162198.meta.js
// @downloadURL https://userscripts.org/scripts/source/162198.user.js
// @grant       none
// @copyright   2013, Josh Rosenbaum (http://www.joshrosenbaum.org)
// ==/UserScript==

/*
Free to use for all.

I wrote/tested this script with Greasemonkey/Firefox and Chrome. If you find a bug, let me know.

Version 2.x works on the current version of eHarmony as of 08/23/2013.
Versions below 2.x work on the previous version of the eHarmony website available before 07/22/2013.

If you are using Greasemonkey (not required), you must use version 0.9.8 or higher.
*/

function enhanceWrapper(){ // Needed, because on Chrome we have to inject the userscript into the page.

var easyBadKeywords = [
	"pet",
	"dog",
	"pooch",
	"cat",
	"animal",
	"veterinar(?:y|ian)",
	"pu[pg]",
	"(?:4|four)[ \\-]leg(?:ged)?",
	"golden\\sretriever",
	"creature",
	"(?:pupp?|dogg?|furr)(?:y|ie)",
	"kitt?(?:y|ie|en)"
];
var badKeywordsColor = "red"; // This can also be a hex color like: #ff0000

var scriptTitle = 'eHarmony Enhance';
var DODEBUG = false;
var mustHavesMapping = {};
var cantStandsMapping = {};
var communicationHistoryFromAJAX;
var alreadyInstalledHistoryAJAXHook = false;
var badKeywordsRegExp;

debugLog(scriptTitle + " script start.");

// If we're using https on the page, let's remove the session id from the links and change forms to use https as well.
// This is helpful when we're using the HTTPS Everywhere extension as it always uses https.
var usingSSLOnPage = window.location && window.location.protocol === 'https:' && window.location.hostname === 'www.eharmony.com';
var haveStorage;
var jQ;

(function(){
	// cleanup SSL on entire page. Content will be updated via AJAX, but we don't need to worry about it for now.
	cleanupSSL(document.body);

	if( document.forms['registrationForm'] || document.forms['loginForm']){
		// User was logged out, but we're still on an included userscript URL. Just exit.
		return;
	}

	haveStorage = typeof(localStorage) !== "undefined";
	if(!haveStorage){
		errorAlert("No local storage found. Cannot load/save custom answers.");
	}

	jQ = getGlobal("jQuery", "function");
	if(!jQ){
		errorAlert("Cannot access jQuery on page.");
		throw("Cannot access jQuery on page.");
	}

	setupKeywords();

	// Adds our div that will contain keywords as well as options/links for eHarmony Enhance.
	addMainEnhanceElement();

	// Add hook for communications pages.
	installCommunicationsHook();


	// Add hook for profile pages.
	if(window.EH && window.EH.Events){
		debugLog("setting up events monitoring");
		window.EH.Events.on("matchProfile:detailView:renderComplete", function(){
			debugLog("matchProfile:detailView:renderComplete event fired. Running handleProfile routine.");
			// Remove previous keywords in case a resize has been done and the profile re-rendered.
			document.getElementById('ee_keywords_span').innerHTML = "";
			handleProfile();
		});
	}else{
		setupHooks( jQ("DIV.profile-content").get(0), function(eventElement){
			return isCompletedProfilePage();
		}, handleProfile );
	}

})();

// END of main body and START of all functions


function setupKeywords(){
	if( !(haveStorage && getConfigOption("disableKeywords") ) ){
		badKeywordsRegExp = getKeywordsRegExp();
	}
}

function getKeywordsRegExp(customKeywordsList){
	var keywords;
	if(customKeywordsList){
		keywords = customKeywordsList;
	}else if(haveStorage){
		keywords = getConfigOption("customKeywords") || easyBadKeywords;
	}else{
		keywords = easyBadKeywords;
	}
	return new RegExp("\\b((?:" + keywords.join('|') + ")s?)\\b", "gi");
}

// Adds our div that will contain keywords as well as options for eHarmony Enhance.
function addMainEnhanceElement(){
	var eeOptionsElementStyle = {
		height: "16px",
		color: "#ffffff",
		position: "fixed",
		zIndex: 10000,
		left: "0px",
		top: "50px",
		overflow: "hidden",
		padding: "4px",
		background: "none repeat scroll 0 0 #3B3939",
		borderRadius: "8px 8px 8px 8px",
		boxShadow: "0 0 5px 0 #000000",
		fontSize: "14px"
	};
	var eeOptionsElement = document.createElement("DIV");
	Object.keys(eeOptionsElementStyle).forEach(function(key){
		eeOptionsElement.style[key] = eeOptionsElementStyle[key];
	});
	eeOptionsElement.innerHTML = "<span>" + scriptTitle + "</span><span id='ee_keywords_span'></span><hr>";

	var linkStyle = {
		color: "#55EEEE"
	};


	if(haveStorage){
		// Handle Backing Up Data
		var backupLink = document.createElement("A");
		backupLink.href = "javascript:void(0);";
		backupLink.style.color = linkStyle["color"];
		backupLink.innerHTML = "Backup " + scriptTitle + " Data";
		eeOptionsElement.appendChild(backupLink);
		jQ(backupLink).click(function(){
			var hiddenBackupLinkID = scriptTitle + "backuplink";
			if( document.getElementById(hiddenBackupLinkID) ) {
				document.body.removeChild( document.getElementById(hiddenBackupLinkID) );
			}
			var URL = window.URL || window.webkitURL;
			var a = document.createElement('A');
			var jsonBackup = getStorageJSON();
			if(!jsonBackup){
				errorAlert("Fixme: Could not create json backup for download.");
			}
			var blob = new Blob([ jsonBackup ], {type:'application\/json;charset=UTF-8'});
			a.href = window.URL.createObjectURL(blob);
			a.download = 'eharmonyEnhanceBackup.json';
			a.id = hiddenBackupLinkID;
			a.style.display = "none";
			document.body.appendChild(a);
			a.click();
		});

		// Spacer
		eeOptionsElement.insertAdjacentHTML("beforeend", "<br><br>");

		// Handle Restoring Backup Data.
		var restoreLink = document.createElement("A");
		restoreLink.href = "javascript:void(0);";
		restoreLink.style.color = linkStyle["color"];
		restoreLink.innerHTML = "Restore " + scriptTitle + " Data";
		eeOptionsElement.appendChild(restoreLink);
		jQ(restoreLink).click(function(){
			var hiddenBackupInputID = scriptTitle + "restoreinput";
			var input = document.getElementById(hiddenBackupInputID);
			if( !input ) { // reuse old input if it exists
				input = document.createElement('INPUT');
				input.type = "file";
				input.style.display = "none";
				input.id = hiddenBackupInputID;
				document.body.appendChild(input);

				jQ(input).on("change", function(event){
					var files = event.target.files;
					if(!files || files.length === 0){
						return;
					}
					if(files.length > 1){
						debugLog("Somehow more than one file was selected.");
						return;
					}
					var reader = new FileReader();
					reader.onload = function(event) {
						debugLog("Loaded file data: ");
						var backupData;
						try{
							backupData = JSON.parse(event.target.result);
						}catch(e){
							debugLog(e);
							errorAlert("Invalid backup data. Perhaps you have the wrong file?");
							return;
						}
						debugLog(backupData);
						restoreBackupData(backupData);
					};

					reader.readAsText(files[0]);
				});
			}

			input.click();
		});

		eeOptionsElement.insertAdjacentHTML("beforeend", "<br><br><a style='color:" + linkStyle["color"]  + ";' href='javascript:alert(\"You should backup your saved answers as browsers may remove your saved " + scriptTitle + " data. This can be done when simply doing things like clearing your cache or removing cookies. (Data is not stored as cookies or cache and is only stored locally.)\");'>Why backup?</a>");

		// Spacer
		eeOptionsElement.insertAdjacentHTML("beforeend", "<br><br>");

		// Handle Clearing Saved Data.
		var clearLink = document.createElement("A");
		clearLink.href = "javascript:void(0);";
		clearLink.style.color = linkStyle["color"];
		clearLink.innerHTML = "Clear " + scriptTitle + " Data";
		eeOptionsElement.appendChild(clearLink);
		jQ(clearLink).click(function(){
			if(confirm("Are you sure you want to remove your " + scriptTitle + " data?? It will be gone for good and all saved answers will be removed! Hit Cancel/No to stop!") ){
				if(confirm("WARNING! ALL " + scriptTitle + " DATA IS ABOUT TO BE DELETED! ARE YOU REALLY SURE YOU WANT TO DO THIS? IF YOU DO NOT KNOW WHAT THIS MEANS OR DO NOT WANT THIS THEN PRESS CANCEL/NO NOW!") ){
					var results = clearAllSavedData(true);
					var resultStrings = [];
					Object.keys(results).forEach(function(key){
						resultStrings.push( key + ": " + results[key] );
					});
					successAlert("Results of data clear:\n" + resultStrings.join("\n") );
				}
			}
		});

		// Spacer
		eeOptionsElement.insertAdjacentHTML("beforeend", "<hr>");

		// Handle disable/enable of keywords
		var keywordOptionLink = document.createElement("A");
		keywordOptionLink.href = "javascript:void(0);";
		keywordOptionLink.style.color = linkStyle["color"];
		var enableText = "Enable Keywords";
		var disableText = "Disable Keywords";
		keywordOptionLink.innerHTML = getConfigOption("disableKeywords") ? enableText : disableText;
		eeOptionsElement.appendChild(keywordOptionLink);
		jQ(keywordOptionLink).click(function(){
			if(this.textContent.search(new RegExp(enableText)) !== -1){
				this.innerHTML = disableText;
				removeConfigOption("disableKeywords");
				setupKeywords();
				if( isCompletedProfilePage() ){
					doKeywordReplace();
				}
				successAlert("Keyword usage has been enabled.");
			}else if(this.textContent.search(new RegExp(disableText)) !== -1){
				successAlert("Keyword usage has been disabled.");
				setConfigOption("disableKeywords", true);
				setupKeywords();
				this.innerHTML = enableText;
			}else{
				errorAlert("Fixme: Unknown enable/disable link text.");
			}

		});

		// Spacer
		eeOptionsElement.insertAdjacentHTML("beforeend", "<br><br>");


		// Handle modify of keywords
		var keywordModifyLink = document.createElement("A");
		keywordModifyLink.href = "javascript:void(0);";
		keywordModifyLink.style.color = linkStyle["color"];
		keywordModifyLink.innerHTML = "Change Keyword Detection";
		eeOptionsElement.appendChild(keywordModifyLink);

		jQ(keywordModifyLink).click(function(){
			var modalDivStyle = {
				zIndex: 16777271,
				background: "rgba(0,0,0,0.8)", // opacity this way only affects the background.
				//opacity: 0.7,
				position: "fixed",
				left: "0px",
				top: "0px",
				width: "100%",
				height: "100%",
				color: "#ffffff",
				fontSize: "14px"
			};
			var modalDiv = document.createElement("DIV");
			Object.keys(modalDivStyle).forEach(function(key){
				modalDiv.style[key] = modalDivStyle[key];
			});
			modalDiv.align = "center";
			modalDiv.innerHTML = "<div style='font-weight:bold;font-size:14px;text-align:center;margin:5px; auto;'>" + scriptTitle + " modify keyword detection<hr></div>";

			var contentDiv = document.createElement("DIV");
			contentDiv.align = "left";
			modalDiv.appendChild(contentDiv);
			contentDiv.style.margin = "0px auto";
			contentDiv.verticalAlign = "middle";
			contentDiv.style.overflow = 'auto';
			contentDiv.style.display = 'table-row';
			var instructions = [
				"Put each word to detect on a separate line.",
				"You should only use letters/numbers (no symbols) if you do not know what regular expressions are.",
				"You do not need to have different versions for capitalization.",
				"There is no need to add an ending 's', as we automatically check that. (You may need to add other plural forms.)"
			];
			var liList = "";
			instructions.forEach(function(text){
				liList += "<li>" + text + "</li>";
			});

			contentDiv.innerHTML = "<div style='display:table-cell;vertical-align:middle;width:350px;'><span style='font-size:14px;font-weight:bold;'>Instructions:</span><hr><ul style='list-style-image:none;list-style-position:outside;list-style-type:disc;margin-left:22px;'>" + liList + "</ul></div>";

			var textareaDiv = contentDiv.appendChild(document.createElement("DIV") );
			textareaDiv.style.display = 'table-cell';
			textareaDiv.style.paddingLeft = "10px";
			textareaDiv.style.verticalAlign = "middle";

			var textarea = document.createElement("textarea");
			textarea.style.width = '395px';
			textarea.style.height = '250px';
			textarea.value = (getConfigOption("customKeywords") || easyBadKeywords).join("\n");
			textarea.id = scriptTitle + "modifyKeywordsTextarea";
			textareaDiv.appendChild(textarea);

			textareaDiv.insertAdjacentHTML("beforeend", "<br>");

			var saveButton = document.createElement("INPUT");
			saveButton.type = "button";
			saveButton.value = "Save";
			textareaDiv.appendChild(saveButton);

			var cancelButton = document.createElement("INPUT");
			cancelButton.type = "button";
			cancelButton.value = "Cancel";
			textareaDiv.appendChild(cancelButton);


			var defaultButton = document.createElement("INPUT");
			defaultButton.type = "button";
			defaultButton.value = "Reset to Default";
			textareaDiv.appendChild(defaultButton);

			// Ok, add our modal div to page.
			document.body.appendChild(modalDiv);

			jQ(cancelButton).click(function(){
				document.body.removeChild(modalDiv);
			});

			jQ(saveButton).click(function(){
				var value = textarea.value.replace(/^\s+|\s+$/, "");
				if(value){
					var valueArray = value.split(/\s*[\r\n\f]+\s*/); // get rid of newlines and whitespace at the beginning/ending of lines
					if( valueArray.join("") === easyBadKeywords.join("") ){
						debugLog("Save of default values detected. Removing custom keywords config and using defaults.");
						removeConfigOption("customKeywords");
					}else{
						// ok let's test that the custom keywords the user input doesn't blow up the regular expression engine.
						try{
							var test = getKeywordsRegExp(valueArray);
						}catch(e){
							debugLog(e);
							errorAlert("Sorry, but your regular expression is invalid. Please modify your entry or cancel. Error was: " + e);
							return;
						}

						debugLog("Storing new custom keywords: " + valueArray.join("|") );
						setConfigOption("customKeywords", valueArray);
					}

					if( getConfigOption("disableKeywords") && confirm("You appear to have keywords disabled, but are saving a list. Would you like to re-enable keywords? Ok=Yes, Cancel=No.") ){
						debugLog("User had keywords disabled, but has opted to re-enable them, since they are saving new keywords.");
						removeConfigOption("disableKeywords");
					}
				}else{
					debugLog("No value being saved in textarea. Disabling keywords.");
					removeConfigOption("customKeywords");
					setConfigOption("disableKeywords", true);
				}
				keywordOptionLink.innerHTML = getConfigOption("disableKeywords") ? enableText : disableText;
				setupKeywords();
				if( isCompletedProfilePage() ){
					doKeywordReplace();
				}
				successAlert("Your changes have been made. Your page may need to be updated before you see the changes.");
				document.body.removeChild(modalDiv);
			});

			jQ(defaultButton).click(function(){
				if( confirm(scriptTitle + ": Are you sure you want to load the keyword defaults? Ok to proceed. Cancel/No to abort.") ){
					removeConfigOption("customKeywords");
					removeConfigOption("disableKeywords");
					keywordOptionLink.innerHTML = disableText;
					setupKeywords();
					successAlert("Your keyword defaults have been restored. You will see the changes when you change pages or refresh.");
					document.body.removeChild(modalDiv);
				}
			});


		}); // End Handle modify of keywords


	} //endif(haveStorage){


	document.body.appendChild(eeOptionsElement);

	var $eeOptionsElement = jQ(eeOptionsElement);
	$eeOptionsElement.hover(function(){
		this.style.height = "";
	}, function(){
		this.style.height = eeOptionsElementStyle["height"];
	});
}



function isCompletedProfilePage(){
	// Questions are last thing rendered when profile is updated via ajax. So use them as a trigger point.
	return document.getElementById('question-container-content'); // if we have a question container.
}


function installCommunicationsHook(){
	// Setup handling of communications page where user input is required.
	setupHooks( document.getElementById('comm-content'), function(eventElement){
		return eventElement.classList && (
			eventElement.classList.contains("comm-cont") ||
			eventElement.classList.contains("ehmail-send-wrapper")
		);
	}, handleCommunications );

	// Setup handling of communication history. (ie. Adding descriptions to Makes/Breaks.)
	setupHooks( document.getElementById('comm-history'), function(eventElement){
		// We're lucky here. eHarmony adds an entire document fragment at once, so we don't
		// have to worry about waiting for the last element to be added.
		return eventElement.classList && eventElement.classList.contains("history");
	}, 	handleHistory );


	if(!alreadyInstalledHistoryAJAXHook){
		alreadyInstalledHistoryAJAXHook = true;
		jQ(document).bind("ajaxSuccess", function(event, XMLHttpRequest, ajaxSettings){
			var ajaxType = getAJAXType(ajaxSettings);
			if( ajaxType.type === 'commhistory' ){
				debugLog("Processing a commhistory ajax request.");
				communicationHistoryFromAJAX = JSON.parse(XMLHttpRequest.responseText);
				parseMustHavesCantStandsFromMatchAJAX();
			}else if(ajaxType.type === 'makesList' || ajaxType.type === 'breaksList'){
				// We've received a complete mapping of Makes or Breaks. Store so we can use in the future.
				var parsedMakesBreaks = JSON.parse(XMLHttpRequest.responseText);
				if( parsedMakesBreaks && parsedMakesBreaks.status && parsedMakesBreaks.status === 'SUCCESS' && parsedMakesBreaks.fields ){
					var fieldName;
					var map;
					if(ajaxType.type === 'makesList' ){
						fieldName = 'must_haves';
						map = mustHavesMapping;
					}else{
						fieldName = 'cant_stands';
						map = cantStandsMapping;
					}
					parsedMakesBreaks.fields[fieldName].forEach(function(arrayElement){
						map[arrayElement.subject] = arrayElement.question;
					});
				}
			}
		});
	}
}


function getAJAXType(ajaxSettings){
	var returnMe = {};
	debugLog("Successful ajax request with url: " + ajaxSettings.url);

	if(ajaxSettings && ajaxSettings.url){
		if( ajaxSettings.url.search(/^\/singles\/communication\/v1\/messages\/users\/\d+\/matches\/\d+\?/) !== -1 ){
			returnMe.type = 'commhistory';
		}else if(ajaxSettings.url.search(/^\/singles\/servlet\/lists\/must_haves\?/) !== -1){
			returnMe.type = 'makesList';
		}else if(ajaxSettings.url.search(/^\/singles\/servlet\/lists\/cant_stands\?/) !== -1){
			returnMe.type = 'breaksList';
		}
	}else{
		returnMe.type = "";
	}

	return returnMe;
}



// Check the communications content that the AJAX updated.
function handleCommunications(){
	debugLog("In handleCommunications.");

	// Use a span to detect if we've already ran
	var alreadyRanSpanID = scriptTitle + '_comm_already_ran';
	if( document.getElementById(alreadyRanSpanID) ){
		debugLog("We have already ran handleCommunications on this content.");
		return;
	}
	var $spanParent = jQ("#comm-content DIV").filter(".comm-cont, .ehmail-send-wrapper");
	if( $spanParent.length === 0){
		errorAlert("Fixme: Missing location to store span that detects unnecessary calls.");
	}else{
		$spanParent.each(function(){
			var span = document.createElement("SPAN");
			span.id = alreadyRanSpanID;
			span.style.display = 'none';
			this.appendChild(span);
		});
	}

	/* Going to leave the hook always installed to handle all updates.
	// If we click a Next button, reinstall our hook to detect content changes.
	//.filter("[data-button='progress'],[data-button='next'],[data-button='edit'],[data-button='send']")
	jQ("DIV.btn").filter(function(){
		var b = this.getAttribute("data-button");
		return b && b.search(/^(?:progress|next|edit|send)$/) !== -1;
	}).on("click", function(){
		debugLog("In next button click handler: installing communication hook to detect questions content.");
		installCommunicationsHook();
	});
	*/

	// Handle user being sent 1st set of questions to answer from match.
	var questionDivs = jQ(".comm-row.comm-answer-format");
	if( questionDivs.length === 5  ){ // 5 questions
		handleQuickQuestions();
		return;
	}

	// Handle user being sent 1st set of answers from a match.
	var answerDivs = jQ(".comm-row.comm-read-answer-format");
	if( answerDivs.length === 5  ){ // 5 answers
		// Remove scrolling of Quick Question answers received.
		jQ("div.data-cont.fixed-height").removeClass('fixed-height');
		return;
	}

	// Add descriptions to Makes/Breaks in top communications pane.
	var $makes = jQ(".comm-content-makes-cont.first .row");
	if($makes && $makes.length > 0){
		$makes.each(function(){
			modifyIndividualMakeBreak(this, mustHavesMapping);
		});
		var $breaks = jQ(".comm-content-makes-cont:not(.first) .row");
		$breaks.each(function(){
			modifyIndividualMakeBreak(this, cantStandsMapping);
		});
		return;
	}


	// Add descriptions to Makes/Breaks when editing them.
	var $editMakes = jQ("div[data-pane='mustHave'] .makes-edit-cont .row .label");
	if($editMakes && $editMakes.length > 0){
		var makeBreakFunc = function(mapping){
			this.previousElementSibling.style.padding = this.style.padding = "5px 1px";
			this.style.width = "270px";
			this.style.verticalAlign = "middle";
			this.parentElement.style.height = "57px";
			modifyIndividualMakeBreak(this, mapping, true);
		};
		$editMakes.each(function(){
			makeBreakFunc(mustHavesMapping);
		});
		var $editBreaks = jQ("div[data-pane='cantStand'] .makes-edit-cont .row .label");
		$editBreaks.each(function(){
			makeBreakFunc(cantStandsMapping);
		});
		return;
	}

	// Handle receiving second set of questions.
	var secondQuestionDivs = jQ("DIV.comm-row");
	if( secondQuestionDivs.length === 3 ){
		handleSecondQuestions();
	}

}

// Get our Makes/Breaks description mappings from the JSON of an AJAX request eHarmony makes.
function parseMustHavesCantStandsFromMatchAJAX(){
	if( ! (communicationHistoryFromAJAX && communicationHistoryFromAJAX.messages) ){
		// Don't have descriptions. Just exit out.
		debugLog("communicationHistoryFromAJAX was not found or is invalid.");
		return;
	}

	var messages = communicationHistoryFromAJAX.messages;
	for(var i=0; i < messages.length; i++){
		var arrayElement = messages[i];
		if(arrayElement.category === "mhcs" && arrayElement.payload && arrayElement.payload.sections ){
			arrayElement.payload.sections.forEach(function(section){
				if(!section.items){
					return;
				}
				section.items.forEach(function(item){
					if(section.id === 'mustHaves'){
						mustHavesMapping[item.text] = item.desc;
					}else if(section.id === 'cantStands'){
						cantStandsMapping[item.text] = item.desc;
					}else{
						debugLog("Unknown section: " + section.id);
					}
				});
			});

		}
	}

}


// Handles when the history div is updated on the communications page.
function handleHistory(){
	debugLog("In handleHistory().");
	addMakesBreaksDescriptions();
}

function addMakesBreaksDescriptions(){
	var $makes = jQ(".make-cont .make-or-break .col1");
	debugLog("In addMakesBreaksDescriptions(). Makes length is: " + $makes.length);

	if($makes.length === 0){ // no makes/breaks in the history.
		return;
	}

	var $breaks = jQ(".make-cont .make-or-break .col2");

	// Get our Makes/Breaks description mappings from the JSON of an AJAX request.
	if( mustHavesMapping && Object.keys(mustHavesMapping).length > 0 ){
		debugLog("We have a mapping with length: " + Object.keys(mustHavesMapping).length);
	}else{ // Don't have descriptions. Just exit out.
		debugLog("No makes/breaks descriptions were found."); // This can happen if they were skipped.
		return;
	}

	// Ok, let's make sure the Makes/Breaks box takes up the entire width rather than half of it.
	// get first makes/breaks
	var $smallBoxParent = $makes.first().closest(".make-outer-cont");
	if($smallBoxParent.length === 0){
		errorAlert("Fixme: Could not access first Makes/Breaks element.");
	}
	$smallBoxParent.width("100%");
	$smallBoxParent.find(".make-cont").css("text-align", "left");

	// get second/last makes/breaks
	$smallBoxParent = $makes.last().closest(".make-outer-cont");
	if($smallBoxParent.length === 0){
		errorAlert("Fixme: Could not access second Makes/Breaks element.");
	}
	$smallBoxParent.width("100%");
	$smallBoxParent.find(".make-cont").css("text-align", "left");

	debugLog("Updating Makes: " + $makes.length);
	$makes.each(function(){
		modifyIndividualMakeBreak(this, mustHavesMapping);
	});
	debugLog("Updating breaks: " + $breaks.length);
	$breaks.each(function(){
		modifyIndividualMakeBreak(this, cantStandsMapping);
	});
}

function modifyIndividualMakeBreak(element, mappingObject, skipTruncate){
	var makeText = element.textContent;
	if( !mappingObject[makeText] ){
		return;
	}

	// Truncate our description text for normal display, so we don't take up more page height. No one likes scrolling.
	var normalizedDescription = mappingObject[makeText].replace(/^I\s+/i, "").replace(/^(?:must\s+have|can't\s+stand)\s+/i, "");
	var cutOffIndex = 48 - makeText.length;

	if(skipTruncate){
		element.innerHTML = makeText + ": <span style='font-size:10px;'>" + normalizedDescription + "</span>";
	}else{
		var truncatedText = normalizedDescription.length > cutOffIndex + 1 ? normalizedDescription.substring(0, cutOffIndex) + "..." : normalizedDescription;
		element.innerHTML = makeText + ": <span style='font-size:10px;' class='ee_makesbreaks_span'>" + truncatedText + "</span>";

		// Ok, now show longer description text when user hovers over the description.
		var $span = jQ(element).find('SPAN');
		$span.hover(function(){
			this.innerHTML = normalizedDescription;
		}, function(){
			this.innerHTML = truncatedText;
		} );
	}
	return;
}


function handleProfile(){
	debugLog("Handling profile update");

	// Always expand the box on the main profile page. (Showing religion and education level.)
	jQ("div.button.expand[data-tooltipcontent='Expand']").trigger("click");

	doKeywordReplace();
}

function doKeywordReplace(){
	var ee_span_id = "eharm_enhance_span901";

	if( document.getElementById(ee_span_id) ){ // we have already been run.
		debugLog("doKeywordReplace(): We've already been ran.");
		return;
	}

	debugLog("doKeywordReplace(): Running keyword replacement.");

	// Access the span in our menu div.
	var enhanceDivKeywordSpan = document.getElementById('ee_keywords_span');

	if(!badKeywordsRegExp){ // script user has selected no keywords to tag or has disabled them.
		debugLog("doKeywordReplace(): Keywords are disabled. Returning.");
		enhanceDivKeywordSpan.innerHTML = "<span style='color:#00aa00;font-size:10px;font-weight:bold;margin-left:4px; margin-right:4px;'>Keywords Disabled</span>";
		return;
	}

	// Add in our span that will hold all our keyword content.
	enhanceDivKeywordSpan.innerHTML = "<span style='color:red; font-size:12px;padding:4px;' id='" + ee_span_id + "'></span>";
	var ee_span_element = document.getElementById(ee_span_id);

	var addedInfo = [];
	var eventsToAdd = [];
	var referenceObject = {addedInfo: addedInfo,eventsToAdd: eventsToAdd };

	// Highlight/link keywords in all the various detail blocks. (Most Important... Most passionate...Most Influential)
	var $detailDivs = jQ("DIV.profile-content-item .body1");
	$detailDivs.each(function(index){
		var element = this;
		var parentElement = element.parentElement;
		handleHTMLReplace(referenceObject, element, (ee_span_id + "_det_" + index), parentElement.id.replace(/^profile-content-/, ''), function(){selectPage( jQ(element).closest("DIV.panel-base").get(0) );});
	});

	// Highlight/link keywords in occupation.
	var occupationDiv = jQ("#stats-item-occupation .subhead2").get(0);
	handleHTMLReplace(referenceObject, occupationDiv, (ee_span_id + "_occupation"), "Occupation", function(){selectPage( jQ("DIV.cover-panel").get(0) );} );

	// Highlight/link keywords in stand out content boxes.
	var $standOutDivs = jQ("DIV.stand-out-cont .body .body1");
	$standOutDivs.each(function(index){
		var element = this;
		var grandparentElement = this.parentElement.parentElement;
		handleHTMLReplace(referenceObject, element, (ee_span_id + "_stand_" + index), grandparentElement.id.replace(/^profile-content-/, ''), function(){selectPage( jQ(element).closest("DIV.panel-base").get(0) );});
	});

	// Highlight/link keywords used in profile image captions.
	var normalPhotoList = getGlobal("normalPhotoList");
	if(normalPhotoList){
		var additions = [];
		for(var i=0; i < normalPhotoList.length; i++){
			var obj = normalPhotoList[i];
			if(!obj || !obj.caption){
				continue;
			}

			var matches = obj.caption.match(badKeywordsRegExp);
			if(matches && matches.length){
				var id = ee_span_id + "_img_" + i;
				addedInfo.push( "<a style='text-decoration:underline;color:" + badKeywordsColor + ";' id='" + id + "' href='javascript:void(0)'>" +
					"Photo " + (i+1) +": </a>" + " " + matches.join(",") );
				eventsToAdd.push([id, openImage ]); // add event to open to image directly.
			}
		}

	}


	// Add the display of bad keywords or indicator that none exist.
	if(addedInfo && addedInfo.length > 0){
		ee_span_element.innerHTML = "Keywords: " + addedInfo.join(" | ");
	}else{
		ee_span_element.innerHTML = "<span style='color:#00aa00;font-size:10px;font-weight:bold;'>No keywords found</span>";
	}

	// Add all of our click handlers.
	eventsToAdd.forEach(function(event){
		var id = event[0];
		var func = event[1];
		jQ("#" + id).click( func );
	});

}

// Replace keyword with a highlighted form. Then add link to it in our keywords display.
// referenceObject: object that holds reference to vars in calling function.
function handleHTMLReplace(referenceObject, replaceElement, linkID, linkText, clickHandler){
	if(replaceElement && replaceElement.textContent.search(badKeywordsRegExp) !== -1){
		var matches = replaceElement.textContent.match(badKeywordsRegExp);
		replaceElement.innerHTML = replaceElement.innerHTML.replace(badKeywordsRegExp, "<span style='color:" + badKeywordsColor +";'>$1</span>");
		referenceObject['addedInfo'].push( "<a style='text-decoration:underline;color:" + badKeywordsColor + ";' href='javascript:void(0);' id='" + linkID + "'>" + linkText + "</a>"  + ": " + matches.join(",") );
		referenceObject['eventsToAdd'].push([linkID, clickHandler ]);
	}
}

// Click an image in the profile to open the gallery with a larger version of the image. (Along with caption.)
function openImage(){
	var imgIndex = this.id.replace(/^.+_img_(\d+)$/, "$1");
	var imgArrayElement = normalPhotoList[imgIndex];
	var idToSearch = "img[data-photoid='" + imgArrayElement.photoindex + "']";
	jQ(idToSearch).click();
}

// Selects a profile page.
function selectPage(pageNode){
	var left = pageNode.style.left.replace(/\D+$/, ""); // remove px or %;
	if(!left){
		return;
	}
	var pageMoves = 0; // In case something is wrong, make sure we do not go into an infinite loop.

	var $prev = jQ('#page-nav-previous .page-nav-button');
	var $next = jQ('#page-nav-next .page-nav-button');

	while(left && pageMoves < 10){
		if(left < 0){ // we need to page left to see our content.
			$prev.trigger("click");
		}else if(left > 0){ // we need to page right to see the content
			$next.trigger("click");
		}
		pageMoves++;
		left = pageNode.style.left.replace(/\D+$/, ""); // remove px or %
	}

	// we're already on the right page.
	return;
}


function getStoragePrefix(){
	return scriptTitle + " ";
}

function getFirstRoundKeyPrefix(){
	return getStoragePrefix() + "Q:";
}

function getFirstRoundQuestionStorageKey(questionID){
	if( !questionID.match(/^\d+$/) ){
		errorAlert("Fixme: Invalid question id passed: " + questionID);
		return;
	}
	return getFirstRoundKeyPrefix() + questionID;
}

function getFirstRoundQuestionIDFromStorageKey(storageKey){
	var idRegExp = new RegExp( "^" + getFirstRoundKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') + "(\\d+)$")
	return storageKey.replace(idRegExp, "$1");
}

function getStorageBackup(){
	if(!haveStorage){
		errorAlert("No storage to get a backup from");
		return;
	}

	var firstRoundPrefixRegExp = new RegExp("^" + getFirstRoundKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') );
	var configStoragePrefixRegExp = new RegExp("^" + getConfigKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') );

	var backupObject = {firstRoundAnswers: {}, config: {}, backupVersion: 1 };
	Object.keys(localStorage).forEach(function(key){
		if( key.search(firstRoundPrefixRegExp) !== -1){
			backupObject['firstRoundAnswers'][ getFirstRoundQuestionIDFromStorageKey(key) ] = JSON.parse(localStorage[key]);

		}else if( key.search(configStoragePrefixRegExp) !== -1){
			backupObject['config'][ getConfigBaseKeyFromFullKey(key) ] = JSON.parse( localStorage[key] );
		}
	});

	return backupObject;
}

function getStorageJSON(){
	var backupObject = getStorageBackup();
	if(!backupObject){
		return;
	}
	return JSON.stringify( backupObject );
}

function getConfigKeyPrefix(){
	return getStoragePrefix() + "C:";
}

function getConfigFullKey(baseKey){
	return getConfigKeyPrefix() + baseKey;
}

function getConfigBaseKeyFromFullKey(key){
	var removeRegExp = new RegExp("^" + getConfigKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') + "(.+)$");
	return key.replace(removeRegExp, "$1");
}

function getConfigOption(baseKey){
	if(!haveStorage){
		errorAlert("No storage to get config from");
		return;
	}
	var value = localStorage[ getConfigFullKey(baseKey) ];
	if(value){
		return JSON.parse(value);
	}
	return;
}
function setConfigOption(baseKey, value){
	if(!haveStorage){
		errorAlert("No storage to set config value");
		return;
	}

	localStorage[ getConfigFullKey(baseKey) ] = JSON.stringify(value);
	return;
}
function removeConfigOption(baseKey){
	if(!haveStorage){
		errorAlert("No storage to get a backup from");
		return;
	}
	localStorage.removeItem( getConfigFullKey(baseKey) );
}

function restoreBackupData(backupData){
	debugLog("In restoreBackupData");

	if(!backupData){
		errorAlert("No backup data loaded. Perhaps you loaded an invalid file?");
		return;
	}else if(!backupData['backupVersion'] ){
		errorAlert("No backup data loaded. Found data, but it does not appear to be one of our backups. Perhaps you loaded the wrong file?");
		return;
	}

	var results = {};

	var firstRound = backupData['firstRoundAnswers'];
	if(firstRound && Object.keys(firstRound).length > 0){
		debugLog("In restoreBackupData: Processing first round answers");
		results["First Round Added"] = 0;
		results["First Round Error"] = 0;
		results["First Round Already Exists"] = 0;
		results["First Round Unknown"] = 0;

		Object.keys(firstRound).forEach(function(key){
			firstRound[key].forEach(function(arrayElement){
				var result = setFirstRoundAnswer(getFirstRoundQuestionStorageKey(key), arrayElement);
				if(!result){
					results["First Round Error"]++;
				}else if(result['added']){
					results["First Round Added"]++;
				}else if(result['alreadyExists']){
					results["First Round Already Exists"]++;
				}else{
					results["First Round Unknown"]++;
					errorAlert("Fixme: Unknown result returned from setFirstRoundAnswer.");
				}
			});
		});
	}

	var config = backupData['config'];
	if(config && Object.keys(config).length > 0){
		debugLog("In restoreBackupData: Processing config");
		results['Config Values Set'] = 0;
		Object.keys(config).forEach(function(key){
			setConfigOption(key, config[key]);
			debugLog("Setting key: " + key);
			results['Config Values Set']++;
		});
	}


	var resultsArray = [];
	Object.keys(results).forEach(function(key){
		resultsArray.push(key + ": " + results[key]);
	});
	var resultsString = resultsArray.join(",\n");
	debugLog("Imported data with results:");
	debugLog(results);
	successAlert("Finished importing data. " + (results["First Round Error"] ? "There were errors! " : "")  + "Results: \n" + resultsString );
}

function clearAllSavedData(haveConfirmed){
	debugLog("In clearAllSavedData.");

	if(!haveConfirmed){
		// Make sure we prevent any accidental deletions by using a parameter
		errorAlert("Fixme: Have confirmed parameter was not passed to clearAllSavedData.");
		return;
	}

	if(!haveStorage){
		errorAlert("No storage found to clear.");
		return;
	}

	var storagePrefixRegExp = new RegExp("^" + getStoragePrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') );
	var firstRoundAnswersStoragePrefixRegExp = new RegExp("^" + getFirstRoundKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') );
	var configStoragePrefixRegExp = new RegExp("^" + getConfigKeyPrefix().replace(/([()[{*+.$^\\|?])/g, '\\$1') );

	var results = {'First Round Answers Removed': 0, 'Config Data Removed':0, 'Other Data Removed': 0 };
	Object.keys(localStorage).forEach(function(key){
		if( key.search(storagePrefixRegExp) !== -1){
			localStorage.removeItem(key);
			if( key.search(firstRoundAnswersStoragePrefixRegExp) !== -1){
				results['First Round Answers Removed']++;
			}else if(key.search(configStoragePrefixRegExp) !== -1){
				results['Config Data Removed']++;
			}else{
				results['Other Data Removed']
			}
		}
	});

	debugLog("All data deleted. Results: " + results.toSource() );
	return results;
}

function setFirstRoundAnswer(storageKey, value){
	if(!storageKey){
		errorAlert("Fixme: Invalid storage key passed: " + storageKey);
		return;
	}
	value = value.replace(/^\s+|\s+$/, ""); // get rid of front/back whitespace
	if(!value){ // nothing to store.
		return;
	}

	var answersToStore;
	var previouslyStoredData = localStorage[storageKey];
	if( previouslyStoredData ){
		// have existing data.
		answersToStore = JSON.parse( previouslyStoredData );

		for(var i=0; i < answersToStore.length; i++){
			if(answersToStore[i] === value){
				debugLog("Already stored. No need to store again. Returning. Value: " + value);
				return {alreadyExists: true};
			}
		}

		debugLog("Have existing data. Adding new custom value to the end of it.");
		answersToStore[answersToStore.length] = value;
		answersToStore.sort();

	}else{
		// no existing data. Just store value.
		debugLog("No existing data. Just storing single value: " + value);
		answersToStore = [ value ];
	}

	debugLog("Storing: " + JSON.stringify(answersToStore));
	localStorage[storageKey] = JSON.stringify(answersToStore);

	return {added:true};
}


function handleQuickQuestions(){
	debugLog("In handleQuickQuestions");

	if(haveStorage){
		// Handle loading/saving of custom answers.
		var $textAreas = jQ(".textarea");
		$textAreas.each(handleTextAreaAnswerStorage);
	}

	// Ok, let's remove scrolling from our question entry div now. It's a pain to have to scroll through to answer questions.
	// eHarmony basically only allows 2 questions before scrolling.
	jQ("div.data-cont.fixed-height").removeClass('fixed-height');
}

function handleSecondQuestions(){
	// Ok, let's remove scrolling from our question entry div now. It's a pain to have to scroll through to answer questions.
	// eHarmony basically only allows 2 questions before scrolling.
	jQ("div.data-cont.fixed-height").removeClass('fixed-height');
}


function handleTextAreaAnswerStorage(){
	debugLog("textarea found: " + this.name);

	if(!haveStorage){
		return;
	}

	var textArea = this;
	var selectAnItemText = "Select a previous custom reply";

	var labelDiv = textArea.parentElement.nextElementSibling;
	var l = jQ( labelDiv ).find('label').get(0);

	var storageKey = getFirstRoundQuestionStorageKey(textArea.name.replace(/^\D+(\d+)$/, "$1"));
	if(!storageKey){
		return;
	}

	// ok add select boxes with previous answers
	if( localStorage[storageKey] ){
		var previousAnswers = JSON.parse( localStorage[storageKey] );

		var selectE = document.createElement("select");
		selectE.style.width="90%";
		var opt = selectE.options;


		opt[0] = new Option(selectAnItemText, "0");
		for(var i=0; i < previousAnswers.length; i++){
			opt[opt.length] = new Option(previousAnswers[i], i );
		}

		textArea.parentElement.appendChild(selectE);

		var deleteButton = document.createElement('input');
		deleteButton.type = 'button';
		deleteButton.value = 'Remove';
		deleteButton.style.fontSize = '11px';
		deleteButton.style.padding = '0px';
		textArea.parentElement.appendChild(deleteButton);
		var $deleteButton = jQ(deleteButton);
		$deleteButton.on("click", function(){
			if(selectE.selectedIndex == 0){
				errorAlert("Cannot remove the Select label.");
				return;
			}

			var currentOption = selectE.options[selectE.selectedIndex].text;
			var previousAnswers = JSON.parse( localStorage[storageKey] );

			var removalIndex = -1;
			for(var i=0; i < previousAnswers.length; i++){
				if(previousAnswers[i] === currentOption){
					removalIndex = i;
					break;
				}
			}

			if( removalIndex !== -1){ // remove this answer.
				if(previousAnswers.length === 1){ // only one thing to remove. Just delete the entire key.
					debugLog("Only one item stored and it is being removed. Deleting key for question from local storage.");
					localStorage.removeItem(storageKey);
				}else{
					debugLog("Removing item " + i + ". Before data: " + JSON.stringify( previousAnswers ));
					previousAnswers.splice(i, 1);
					debugLog(" Removed item " + i + ". After data: " + JSON.stringify( previousAnswers ));
					localStorage[storageKey] = JSON.stringify( previousAnswers );
				}

				selectE.remove(selectE.selectedIndex);
			}else{
				errorAlert("Could not remove that item. Perhaps it has already been removed in a different tab. If you see it again after reloading the page, then something is broken.");
			}

		}); // end deleteButtonHandler



		var $textArea = jQ(textArea);
		var $selectE = jQ(selectE);

		$selectE.on("change", function(event){
			var selectedText = this.options[this.selectedIndex].text;
			if(selectedText === selectAnItemText){
				textArea.value = "";
			}else{
				textArea.value = selectedText;
			}

			$textArea.trigger("input");
			$textArea.trigger("keydown");
			$textArea.trigger("keyup");
		});
		l.click();

		if(previousAnswers.length === 1){ // let's autoselect the custom text if only one item. User can decide to remove.
			selectE.selectedIndex = 1;

			// Use setTimeout, because apparently some of the textarea event routines may not be setup yet.
			// (Otherwise, the textarea won't automatically resize to add extra rows.)
			// Should dig deeper and see if we can delay loading our question routine until this is all set, but this will work for now.
			setTimeout(function(){$selectE.trigger("change");}, 5);
		}

	}

	// Ok now add the hook to save all custom textareas when next button is clicked.
	// We ignore whether a non-custom answer is selected or not. The user can always remove something if they don't want it.

	// We could just do this once, but we're only creating 5 click handlers.
	jQ("div[data-button='next']").on("click", function(){
		debugLog("In Next button save custom answers click hook. TextArea: " + textArea.name);
		setFirstRoundAnswer(storageKey, textArea.value);
	});


}




// Fixes for when pages are in SSL. (Such as when using HTTPS Everywhere extension.)
function cleanupSSL(startTag){
	if(!usingSSLOnPage){
		return;
	}

	debugLog("Running cleanupSSL");

	// When using https we get ";jsessionid=..." added to our links.
	// Remove that so our includes work properly.
	var aTags = startTag.getElementsByTagName("A");
	for(var i=0; i < aTags.length; i++){
		var e = aTags[i];
		if(e.href){
			if(e.href.search(/;jsessionid/) !== -1){
				e.href = e.href.replace(/;jsessionid=\w+(\?.+)?/, '$1');
			}
			if(e.href.search(/http:\/\/www\.eharmony\.com\//i) !== -1 ){
				e.href = e.href.replace(/http:\/\/www\.eharmony\.com\//, 'https:\/\/www\.eharmony\.com\/');
			}
		}
		var nudgeAttribute = e.getAttribute('data-href');
		if( nudgeAttribute ){ // make sure we access photonudge url via ssl.
			e.setAttribute('data-href',
							nudgeAttribute.replace(/;jsessionid=\w+(\?.+)?/, '$1').replace(/https?:\/\/www\.eharmony\.com\//, '\/')
			);
		}
	}

	// When using https on pages change forms so they uses https as well.
	// This helps prevent warning popups. (HTTPS Everywhere will already redirect, so security is still enabled without this.)
	// Also, remove jsessionid= parts like we did for links.
	for(var i=0; i < document.forms.length; i++){
		var f = document.forms[i];
		if(f.action && f.action.search(/^http:\/\/www\.eharmony\.com\//i) !== -1 ){
			f.action = f.action.replace(/^http:/, 'https:').replace(/;jsessionid=\w+(\?.+)?$/, '$1');
		}
	}


}




function setupHooks(observeElement, isProperElementFunc, afterCompletionFunction){
	if(!observeElement){ // Element not found. It's on a different page or script is broken.
		return;
	}

	if( window.MutationObserver){
		try{
			debugLog("Creating MutationObserver");
			debugLog(observeElement);
			// create an observer instance
			var observer = new MutationObserver(function(mutations) {
			  mutations.every(function(mutation) {
				debugLog(mutation.type);
				if(mutation.type === 'childList'){
					var nodes = mutation.addedNodes;
					var len = nodes ? nodes.length : 0;
					debugLog(nodes);
					for(var i=0; i < len; i++){
						// check if classList is there, since it might be a text node
						if( isProperElementFunc(nodes[i]) ){
							// make sure main content has been updated.

							// Going to try and leave always on, rather than trying to re-add later to catch future updates.
							// This will handle when double updates are done and we don't get a chance to rehook.
							//observer.disconnect();

							debugLog("calling afterCompletionFunction()");
							afterCompletionFunction();
							return false; // don't process anymore.
						}
					}
				}
				return true;
			  });
			});

			// configuration of the observer:
			var config = { attributes: false, childList: true, characterData: false, subtree:false };

			debugLog(observer);

			// pass in the target node, as well as the observer options
			observer.observe(observeElement, config);
			debugLog("Creating MutationObserver: Done.");
			return;

		}catch(e){
			debugLog("MutationObserver failed. Trying backup method. Error was: " + e);
		}
	}

	// backup event observer
	debugLog("Creating DOMNodeInserted event listener");
	jQ(observeElement).on("DOMNodeInserted", handleDOMNodeInsertedEventListener(observeElement,isProperElementFunc), afterCompletionFunction );
}

function handleDOMNodeInsertedEventListener(observeElement, isProperElementFunc, afterCompletionFunction){
	return function(event){
		debugLog("Firing DOMNodeInserted event listener. Event:");
		if( isProperElementFunc(event.target) ){
			// Ok, main content is updated now.
			debugLog(event.target );

			// Going to try and leave always on, rather than trying to re-add later to catch future updates.
			// This will handle when double updates are done and we don't get a chance to rehook.
			//jQ(observeElement).off("DOMNodeInserted", handleDOMNodeInsertedEventListener);

			debugLog("calling afterCompletionFunction()");
			afterCompletionFunction();
		}
	};
}

function errorAlert(error){
	alert(scriptTitle + ": " + error);
	if(window.console){
		console.log(error);
	}
}

function successAlert(message){
	errorAlert(message);
}

function debugLog(message){
	if(!DODEBUG){
		return;
	}
	if(window.console){
		console.log(message);
	}
}

// Handle non-Greasemonkey/Firefox (ie. Chrome with plain userscript)
// Run code inside document and return values from the document that we normally don't have access to.
function runExternalFunction(string, getReturnValue){
	var el = document.createElement('a');
	el.style.display = "none";
	el.href="javascript:void(0);";
	var cmd = (getReturnValue ? 'return ' : '') + string + ";";
	el.setAttribute('onclick', cmd);
	debugLog(cmd);
	var x = document.body.appendChild(el);
	var val = x.onclick();
	document.body.removeChild(x);
	return val;
}

function getGlobal(variableName, type){
	if(!type){
		type = "object";
	}else{
		if( type.indexOf("'") !== -1){
			throw("Cannot have a single quote in type: " + type);
		}
	}

	if( typeof(window[variableName]) === type ){
		return window[variableName];
	}

	if( variableName.search(/\W/) !== -1){
		throw("Only word characters allowed in variable names: " + variableName);
	}

	var cmd2 = "(typeof(" + variableName + ") === '" + type + "' ? " + variableName + " : null )";
	var cmd = "(typeof(window['" + variableName + "']) === '" + type + "' ? window['" + variableName + "'] : " + cmd2 + " )";
	return runExternalFunction(cmd, true);
}


} // end function enhanceWrapper()


if(window.jQuery){ // Don't need to inject our script. Just run it directly. (Firefox+Greasemonkey)
	//if(window.console){console.log("jQuery found in window. Using Firefox direct method.");}
	enhanceWrapper();
}else{ // Chrome
	//if(window.console){console.log("jQuery not found in window. Using Chrome injection method.");}
	var script = document.createElement("script");
	script.textContent = "(" + enhanceWrapper.toString() + ")();";
	document.body.appendChild(script);
	document.body.removeChild(script);
}