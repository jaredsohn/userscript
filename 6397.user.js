// DO NOT REMOVE THE FOLLOWING TEXT
// ==UserScript==
// @name          iHOP Cloud Generator
// @namespace     http://biomoby.org/iHOP
// @description	  Generates a Tag Cloud based on info from iHOP
// @include       http://www.ihop-net.org/UniPub/iHOP/*
// @exclude		  http://www.ihop-net.org/UniPub/iHOP/pmquery.html*
// ==/UserScript==
// Notes:
//   if a certain page is excluded or included incorrectly, add 
//   an @include or @exclude as appropriate.
// END OF DO NOT REMOVE

// this script is only for firefox, so dont worry about cross browser compat
// Below is the name of the script, used for cookie generation - no spaces are allowed!
var _NAME_ = 'iHOP_TAG_GENERATOR';
var DEFAULT_FONT_SCALE = 0.75;
/*
 * Below are GLOBAL variables used by
 * this GreaseMonkey script
 * Declare all variables here
 */
 
////////////////////iHOP GLOBAL VARIABLES//////////////////////// 

// store identifiers for each tag - user can store ids, etc for use in creating links
var MESH_PMIDs = new Array();
var GENE_PMIDs = new Array();
var MESH_UNIPUBIDs = new Array();
var GENE_UNIPUBIDs = new Array();
var CURRENT_URL = '';
var WORKFLOW_URL = 'http://bioinfo.icapture.ubc.ca:8090/ihop/execute?gene=';
var GBROWSE_URL =  'http://mobycentral.icapture.ubc.ca/cgi-bin/gbrowse_moby?namespace=Global_Keyword&authority=bioinfo.icapture.ubc.ca&servicename=getUniprotIdentifiersByKeyword&id=';
var useWorkflow = false;
var useGbrowse = false;
var usePubmed = false;
var main_symbol = unsafeWindow['main_SYMBOL'];
var LAST_CLICKED_TAG = "";
////////////////////iHOP GLOBAL VARIABLES////////////////////////

////////////////////GLOBAL VARIABLES FOR Script/////////////////////////////////////////////////////
// These variables are for use by the script and should, in most cases, be left alone			  //
var IS_MOUSEOVER = false; 				// Is the slider in a mouse down state					  //
var savedDiv = null;					// place to store hidden cloud - a Div element			  //
var OUTPUT_FRAME_DIV = null;			// The preview window Div element						  //
var OPEN_IN_PREVIEW_FRAME = true;		// Boolean used to determine where to open tag links	  //
var TOGGLED_TAGS = null;				// When clouds are toggled, we store the hidden cloud here//
var IS_FIRST_CLOUD_SHOWING = true;		// Determine which cloud is showing						  //
var CLOUD_HAS_CONTENT = false;			// Boolean used to determine whether clouds have content  //
var FIRST_CLOUD_ARRAY = new Array();	// An associative array for cloud one key=tag, value=count//
var FIRST_CLOUD_DELETED = new Array();	// Holder of deleted tags in the first cloud			  //
var FIRST_CLOUD_MAX = 0;				// The highest frequency of a single tag in cloud one	  //
var FIRST_CLOUD_THRESHOLD = 0; 			// The threshold for visible tags in cloud one			  //
var FIRST_CLOUD_COLOR_THRESHOLD = new Array();  // Cloud one associative array of color values    //
var FIRST_CLOUD_COLOR_VALUES = -1; 		// Cloud ones highest color value					  	  //
var SECOND_CLOUD_ARRAY = new Array();	// An associative array for cloud two key=tag, value=count//
var SECOND_CLOUD_DELETED = new Array();	// Holder of deleted tags in the second cloud			  //
var SECOND_CLOUD_MAX = 0;				// The highest frequency of a single tag in cloud two	  //
var SECOND_CLOUD_THRESHOLD = 0; 		// The threshold for visible tags in cloud two			  //
var SECOND_CLOUD_COLOR_THRESHOLD = new Array(); // Cloud two associative array of color values    //
var SECOND_CLOUD_COLOR_VALUES = -1;		// Cloud twos highest color value					  	  //
// the location of the help file for the script													  //
var HELP_URL = 'http://bioinfo.icapture.ubc.ca/subversion/freaky/iHOP/CloudViewHelp/help.html';   //
//////////////////////// Edit these desc to name the clouds as you see fit	////////////////////////
var FIRST_CLOUD_TEXT = "MeSH Terms Shown Below (Click to Show Genes)";							  //
var SECOND_CLOUD_TEXT = "Genes Terms Shown Below (Click to Show MeSH Terms)";					  //
////////////////END GLOBAL VARIABLES FOR Script/////////////////////////////////////////////////////


/*
 * The following is called each and every time there is a 
 * mouse click anywhere on the page.
 * If you add elements to the DOM for the page, 
 * make sure to give them an id so that you can
 * add your own handler for the action that you
 * want to perform:
 * if (event.target.id == "your_element_id") {
 *		// your code to perform here
 *
 *		// code to prevent default action (if necessary)
 * 		event.stopPropagation();
 *	    event.preventDefault();
 *		return;
 * }
 */
document.addEventListener('click', function(event) {

	// action for toggling between MeSH and Gene
	if (event.target.id == "toggler") {
		var element = event.target;
		try {
			// dont  do anything if cloud isnt showing
			if (!document.getElementById('toggleTagP').checked) {
				event.stopPropagation();
			    event.preventDefault();
				return;
			}
		} catch (e) {}
		
		if ((IS_FIRST_CLOUD_SHOWING && element.getAttribute('cloud') == 'FIRST') || (!IS_FIRST_CLOUD_SHOWING && element.getAttribute('cloud') == 'SECOND')){
			event.stopPropagation();
		    event.preventDefault();
			return;	
		}
		
		if (IS_FIRST_CLOUD_SHOWING) {
			// user plans on viewing interactions - need to check whether we can view them here.
			if (!switchToGeneInteractions(event)) {
				event.stopPropagation();
		    	event.preventDefault();
				return;
			}
		}
		var cloud = document.getElementById("iTags");
		try {
			cloud.parentNode.insertBefore(toggleTags(IS_FIRST_CLOUD_SHOWING), cloud);
			cloud.parentNode.removeChild(cloud);
		} catch (e) {}
		// swap slider
		var oldSlider = document.getElementById("HIT_SLIDER");
		var sliderParent = oldSlider.parentNode;
		var newSlider = createSlidingElement(IS_FIRST_CLOUD_SHOWING);

		sliderParent.insertBefore(newSlider, oldSlider);
		sliderParent.removeChild(oldSlider);
		
		
		if (IS_FIRST_CLOUD_SHOWING) {
			// switch it to pub med
			var actionParent = document.getElementById('tag_action_toggler').parentNode;
			var children = actionParent.childNodes;
			for (var i= 0; i < children.length; i++) {
				var el = children[i];
				if (el.hasAttribute('action') && el.getAttribute('action') == 'pubmed') {
					el.checked = true;
				} 
				try {
						document.getElementById('workflowSpan').className = 'inactive';
				} catch (exc) {}
				try {
						document.getElementById('gbrowseSpan').className = 'inactive';
				} catch (exc) {}
				
			}
			return;
		} else {
			var actionParent = document.getElementById('tag_action_toggler').parentNode;
			var children = actionParent.childNodes;
			for (var i= 0; i < children.length; i++) {
				var el = children[i];
				if (el.hasAttribute('action')) {
					if (el.getAttribute('action') == 'workflow') {
						el.checked = useWorkflow;
						try {
							document.getElementById('workflowSpan').className = 'active';
						} catch (exc) {}
					}
					if (el.getAttribute('action') == 'gbrowse') {
						el.checked = useGbrowse;
						try {
							document.getElementById('gbrowseSpan').className = 'active';
						} catch (exc) {}
					}
					if (el.getAttribute('action') == 'pubmed') {
						el.checked = usePubmed;
						try {
							document.getElementById('pubmedSpan').className = 'active';
						} catch (exc) {}
					}
				}
			}
		}
		
		//event.stopPropagation();
	    //event.preventDefault();
		return;
	}

	// action for toggling tag action
	if (event.target.id == "tag_action_toggler") {	
		if (IS_FIRST_CLOUD_SHOWING && event.target.getAttribute('action') != 'pubmed') {
			// only pubmed should be checked here!
			event.stopPropagation();
		    event.preventDefault();
			return;
		}
		
		if (event.target.getAttribute('action') == 'pubmed') {
			// selected pubmed
			usePubmed = true;
			useWorkflow = false;
			useGbrowse = false;
			return;
		}
		if (event.target.getAttribute('action') == 'workflow') {
			// selected pubmed
			usePubmed = false;
			useWorkflow = true;
			useGbrowse = false;
			return;
		}
		if (event.target.getAttribute('action') == 'gbrowse') {
			// selected pubmed
			usePubmed = false;
			useWorkflow = false;
			useGbrowse = true;
			return;
		}
		return;
	}
	
	// action for toggling visibility of Preview window
	if (event.target.id == "toggleOutputFrame") {	
			var frame = document.getElementById('cloud_output');
			if (frame) {
				OUTPUT_FRAME_DIV = frame.cloneNode(true);
				frame.parentNode.removeChild(frame);
			} else {
				if (OUTPUT_FRAME_DIV != null && !event.target.checked) {
					document.getElementById('clouds').appendChild(OUTPUT_FRAME_DIV.cloneNode(true));
					OUTPUT_FRAME_DIV = null;
				} else {
					event.stopPropagation();
					event.preventDefault();
				}
			
			}
		return;
	}
	// action for toggling visibility of TAG cloud
	if (event.target.id == "toggleTagP") {
		if (savedDiv != null) {
			var sentencesElement = document.getElementById("sentences");
			if (sentencesElement == null) {
				sentencesElement = document.getElementsByTagName("MODULE_CONTENT_MAIN");
				if (sentencesElement != null) {
					sentencesElement = sentencesElement[0];
				}
			}
			var parentElement = sentencesElement.parentNode;
			parentElement.insertBefore(savedDiv, sentencesElement);
			savedDiv = null;
		} else {
			savedDiv = document.getElementById('clouds');
			if (savedDiv == null) {
				init();
				//event.stopPropagation();
			    //event.preventDefault();
				return;
			}
			savedDiv.parentNode.removeChild(savedDiv);
		}
		//event.stopPropagation();
	    //event.preventDefault();
		return;
	}
	
	// action for sorting CLOUD
	if (event.target.id == "SortCloud") {
		// modify sortTags() to customize your sort
		sortTags();
		event.stopPropagation();
	    event.preventDefault();
		return;
	}
	
	// action for toggling between popup window and preview pane
	if (event.target.id == "isPreview") {
		var caller = event.target.getAttribute('win');
		if (OPEN_IN_PREVIEW_FRAME && caller == 'preview') {
			event.stopPropagation();
	    	event.preventDefault();
			return;
		} else if (!OPEN_IN_PREVIEW_FRAME && caller == 'new') {
			event.stopPropagation();
	    	event.preventDefault();
			return;
		}
		OPEN_IN_PREVIEW_FRAME = !OPEN_IN_PREVIEW_FRAME;
		
		if (!OPEN_IN_PREVIEW_FRAME) {
			var frame = document.getElementById('cloud_output');
			if (frame) {
				OUTPUT_FRAME_DIV = frame.cloneNode(true);
				frame.parentNode.removeChild(frame);
			} 
			document.getElementById('toggleOutputFrame').checked = false;
			try {
				document.getElementById('toggleWindowSpan').className="inactive";
			}catch (exc){}
		} else {
			try {
				document.getElementById('toggleWindowSpan').className="active";
			}catch (exc){}
		}
		//event.stopPropagation();
	    //event.preventDefault();
		return;
	}
	
	// action that is performed upon clicking a TAG
	if (event.target.id == 'a_tag_link') {
		//event.target.href = 'http://biomoby.org';
		var uniID =	event.target.getAttribute('unipub_id');
			var geneName = "";
			var organism = "";
			if (IS_FIRST_CLOUD_SHOWING) {
			try {
				var phrases = unsafeWindow['phrase_array'];
				if(phrases[0]["GENE"]) {
					for (var i =0; i < phrases.length; i++) {
						if (phrases[i]["unipub_id"] == uniID) {
							for (var y in phrases[i]['GENE']) {
								uniID = y;
								break;
							}
							break;
						}
					}
				geneName = unsafeWindow['getItemsourceIdAttribute']("GENE",uniID,"symbol");
				organism = unsafeWindow['getItemsourceIdAttribute']("GENE",uniID,"org_id");
				
				} else {
					geneName = main_symbol;
					organism = "human";
				}
			} catch (Exception){
				
			}
			} else {
				geneName = event.target.text;
			}
		if (OPEN_IN_PREVIEW_FRAME) {
			if (!IS_FIRST_CLOUD_SHOWING) {
				if (useWorkflow) {
					organism = getOrganism(unsafeWindow['main_ORGANISM_ID']);
				try {
					LAST_CLICKED_TAG = geneName+'/'+organism;
					GM_xmlhttpRequest({
					method: 'GET',
					url: WORKFLOW_URL+geneName+"&organism="+organism,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'
					},
					onload: function(responseDetails) {
						if (responseDetails.status == 200 || responseDetails.status == 202) {
							var outputDiv = document.getElementById('waiting');
							if (!outputDiv)
								outputDiv = document.getElementById('cloud_output');
							if (!outputDiv) {
								outputDiv = document.createElement('div');
								outputDiv.setAttribute("align", "center");
								outputDiv.setAttribute("id", "cloud_output");
							}
							outputDiv.setAttribute("id", "cloud_output");
							if (LAST_CLICKED_TAG == geneName+'/'+organism) {
								var IMAGE = responseDetails.responseText;
								if (isImage(responseDetails.responseHeaders))
									outputDiv.innerHTML = '<pre>The gene that generated this pathway is: ' +geneName+' using organism: ' + organism+'</pre><br><img src="data:image/gif;base64,'+IMAGE+'"/>';
								else
									outputDiv.innerHTML = '<pre>I ran the workflow for the gene: '+ geneName+ ' using organism: '+organism+', but no image was found. Please try another gene.</pre>';
								document.getElementById('clouds').appendChild(outputDiv);
							}
						} else {
							var outputDiv = document.getElementById('waiting');
							if (!outputDiv)
								outputDiv = document.getElementById('cloud_output');
							if (!outputDiv) {
								outputDiv = document.createElement('div');
								outputDiv.setAttribute("align", "center");
								outputDiv.setAttribute("id", "cloud_output");
							}
							outputDiv.setAttribute("id", "cloud_output");
							if (LAST_CLICKED_TAG == geneName+'/'+organism) {
								outputDiv.innerHTML = '<span style="width:80%;" align="left"><strong>We apologize, the Taverna workflow service is currently being improved and hence is currently unavailable, please utilize one of the other potential actions above to continue your exploration or try clicking on another gene.</strong></span>';
								document.getElementById('clouds').appendChild(outputDiv);
							}
						}
					}, 
					onerror: function(responseDetails) {
						var outputDiv = document.getElementById('waiting');
						if (!outputDiv)
							outputDiv = document.getElementById('cloud_output');
						if (!outputDiv) {
							outputDiv = document.createElement('div');
							outputDiv.setAttribute("align", "center");
							outputDiv.setAttribute("id", "cloud_output");
						}
						outputDiv.setAttribute("id", "cloud_output");
						if (LAST_CLICKED_TAG == geneName+'/'+organism) {
							outputDiv.innerHTML = '<span style="width:80%;" align="left"><strong>We apologize, the Taverna workflow service is currently being improved and hence is currently unavailable, please utilize one of the other potential actions above to continue your exploration or try clicking on another gene.</strong></span>';
							document.getElementById('clouds').appendChild(outputDiv);
						}
					}, 
					onreadystatechange: function(responseDetails) {
						
							if (responseDetails.readyState < 4) {
								var outputDiv = document.getElementById('cloud_output');
								if (!outputDiv)
									outputDiv = document.getElementById('waiting');
								if (!outputDiv) {
									outputDiv = document.createElement('div');
									outputDiv.setAttribute("align", "center");
									outputDiv.setAttribute("id", "waiting");
								}
								outputDiv.setAttribute("id", "waiting");
								if (LAST_CLICKED_TAG == geneName+'/'+organism) {
									var today=new Date();
									var h=today.getHours();
									var m=today.getMinutes();
									var s=today.getSeconds();
									outputDiv.innerHTML = '<pre>Please wait while I process the link ('+(h < 10 ? '0' + h: h)+':'+(m < 10 ? '0'+m : m)+':'+(s < 10 ? '0'+s : s)+') ... </pre>';
									document.getElementById('clouds').appendChild(outputDiv);
								}
							}
						}
					});
				} catch (Exception) {}
				} else if (useGbrowse) {
				// start gbrowse
				try  {
					var outputDiv = document.getElementById('cloud_output');
					if (!outputDiv) {
						outputDiv = document.createElement('div');

						outputDiv.setAttribute("align", "center");
						outputDiv.setAttribute("id", "cloud_output");
					}
					outputDiv.innerHTML = '';
					var iFRAME = document.createElement('iframe');
					iFRAME.setAttribute('src',GBROWSE_URL+geneName);
					iFRAME.setAttribute('class','preview_iframe');
					outputDiv.appendChild(iFRAME);
					document.getElementById('clouds').appendChild(outputDiv);
				} catch (Exception) {}
				} else {
					try  {
					var outputDiv = document.getElementById('cloud_output');
					if (!outputDiv) {
						outputDiv = document.createElement('div');
						outputDiv.setAttribute("align", "center");
						outputDiv.setAttribute("id", "cloud_output");
					}
					outputDiv.innerHTML = '';
					var iFRAME = document.createElement('iframe');
					iFRAME.setAttribute('src',event.target.href);
					iFRAME.setAttribute('class','preview_iframe');
					outputDiv.appendChild(iFRAME);
					document.getElementById('clouds').appendChild(outputDiv);
				} catch (Exception) {}
				}
			} else {
				// open abstract viewer
				try  {
					var outputDiv = document.getElementById('cloud_output');
					if (!outputDiv) {
						outputDiv = document.createElement('div');
						outputDiv.setAttribute("align", "center");
						outputDiv.setAttribute("id", "cloud_output");
					}
					outputDiv.innerHTML = '';
					var iFRAME = document.createElement('iframe');
					iFRAME.setAttribute('src',event.target.href);
					iFRAME.setAttribute('class','preview_iframe');
					outputDiv.appendChild(iFRAME);
					document.getElementById('clouds').appendChild(outputDiv);
				} catch (Exception) {}
			}
		} else {
			// open in a new window
			if (!IS_FIRST_CLOUD_SHOWING) {
				if (useWorkflow) {
					organism = getOrganism(unsafeWindow['main_ORGANISM_ID']);
					openWindow(WORKFLOW_URL,geneName,organism);
				} else if (useGbrowse) {
					window.open(GBROWSE_URL+geneName, "newwin", "");
				} else {
					window.open(event.target.href, "newwin", "");
				}
			} else {
				window.open(event.target.href, "newwin", "");
			}
		}
		event.stopPropagation();
		event.preventDefault();
		return;
	}
	
	// action for modifying the TAG font size.
	if (event.target.id == "toggleSize") {
		var size = parseInt( event.target.getAttribute('size')) / 4;
		
		if (size && !isNaN(size)) {
			if (size > 0) {
				var _ccs_ = document.getElementById('biomonkeySS');
				if (_ccs_) {
					DEFAULT_FONT_SCALE = size;
					var css = writeStyleSheet();
					var parent = _ccs_.parentNode;
					parent.removeChild(_ccs_);
					parent.innerHTML+=css;
				} else
					alert ('Error modifying style sheet');
			}
		} else {
			event.stopPropagation();
		    event.preventDefault();
		}
		return;
	}
	
	// give all links that I want no actions for this id
	if (event.target.id == "label") {
		event.stopPropagation();
	    event.preventDefault();
		return;
	}
	
	// action to save preferences to cookies
	if (event.target.id == "savePreferences") {
		if (navigator.cookieEnabled == 0 ) {
			alert ('You must have cookies enabled to save your preferences.');
			event.stopPropagation();
	    	event.preventDefault();
			return;
		}
		var isVisible = document.getElementById('toggleTagP').checked ? 1 : 0;
		var now = new Date();
		fixDate(now);
		now.setTime(now.getTime() + 7 *24*60*60*1000); // expire in a week
		deleteCookie(_NAME_+'viewTags');
		setCookie(_NAME_+'viewTags', isVisible, now,"/", "ihop-net.org");
		deleteCookie(_NAME_+'font');
		setCookie(_NAME_+'font', DEFAULT_FONT_SCALE == null ? 1: DEFAULT_FONT_SCALE, now,"/", "ihop-net.org");
		deleteCookie(_NAME_+'useWorkflow');
		setCookie(_NAME_+'useWorkflow', useWorkflow ? 1 : 0, now,"/", "ihop-net.org");
		deleteCookie(_NAME_+'useGbrowse');
		setCookie(_NAME_+'useGbrowse', useGbrowse ? 1 : 0, now,"/", "ihop-net.org");
		deleteCookie(_NAME_+'usePubmed');
		setCookie(_NAME_+'usePubmed', usePubmed ? 1 : 0, now,"/", "ihop-net.org");
		deleteCookie(_NAME_+'enablePreview');
		setCookie(_NAME_+'enablePreview', OPEN_IN_PREVIEW_FRAME ? 1 : 0, now,"/", "ihop-net.org");
		alert ('Your preferences have been saved.');
		event.stopPropagation();
	    event.preventDefault();
		return;
	}
}, true);

/*
 * The following is called each and every time there is a 
 * mouse down event anywhere on the page.
 * If you add elements to the DOM for the page, 
 * make sure to give them an id so that you can
 * add your own handler for the action that you
 * want to perform:
 * if (event.target.id == "your_element_id") {
 *		// your code to perform here
 *
 *		return;
 * }
 */
document.addEventListener('mousedown', function(event) {

	// catch mouse down events for the slider
	if (event.target.id == "TAG_SLIDER" && document.getElementById('iTags')) {
		handle_slide(event);
	}
}, true);

/*
 * The following is called each and every time there is 
 * mouse movement anywhere on the page.
 * If you add elements to the DOM for the page, 
 * make sure to give them an id so that you can
 * add your own handler for the action that you
 * want to perform.
 */

document.addEventListener('mousemove', function(event) {
	handle_slider_movement(event);
}, true);

/*
 * The following is called each and every time there is a 
 * mouse up event anywhere on the page.
 * If you add elements to the DOM for the page, 
 * make sure to give them an id so that you can
 * add your own handler for the action that you
 * want to perform.
 */
document.addEventListener('mouseup', function(event) {
	handle_slider_mouse_up();
}, true);

/*
 * The following is called upon page loading.
 * This is the MAIN POINT OF ENTRY for the script.
 * 
 */
window.addEventListener('load',function () {
									CURRENT_URL = document.location;
									// The following reads any saved cookie preferences and loads their state for use by the script
									var isVisible = getCookie(_NAME_+'viewTags');
									isVisible = isVisible == 'null' || !isVisible ? true : isVisible;
								
									DEFAULT_FONT_SCALE = getCookie(_NAME_+'font');
									DEFAULT_FONT_SCALE = DEFAULT_FONT_SCALE == 'null' || !DEFAULT_FONT_SCALE? .75 : DEFAULT_FONT_SCALE;
									
									useWorkflow = getCookie(_NAME_+'useWorkflow');
									useWorkflow = (useWorkflow == 1) ? true : false;
									
									useGbrowse = getCookie(_NAME_+'useGbrowse');
									useGbrowse = (useGbrowse == 1 )? true : false;
									
									usePubmed = getCookie(_NAME_+'usePubmed');
									usePubmed = (usePubmed == 1 )? true : false;
									
									if (usePubmed == false && useGbrowse == false && useWorkflow == false && !isInteractionURL())
										usePubmed = true;
									else if (usePubmed == false && useGbrowse == false && useWorkflow == false && isInteractionURL())
										useWorkflow = true; // default to workflow
																		
									OPEN_IN_PREVIEW_FRAME = getCookie(_NAME_+'enablePreview');
									OPEN_IN_PREVIEW_FRAME = (OPEN_IN_PREVIEW_FRAME == 'null' || !OPEN_IN_PREVIEW_FRAME || OPEN_IN_PREVIEW_FRAME) == 1 ? true : false;
									
									// add the style sheet to the HEAD element.
									document.getElementsByTagName("head")[0].innerHTML += writeStyleSheet();
																	
									// ensure that we are supposed to show the cloud ...
									if (isVisible == null || isVisible == 1) {
										init();
										if (!document.getElementById('clouds'))
											return;
										var toggleTagP = document.createElement('p');
										/////////////ADD THE USER INTERFACE HERE//////////////////////
										toggleTagP.setAttribute("style","text-align:center");
										toggleTagP.innerHTML=  getUserTable(true);
										document.getElementById('clouds').parentNode.insertBefore(toggleTagP, document.getElementById('clouds'));
									} else {
										// we are not visible, so just insert the 'buttons'
										var sentencesElement = document.getElementById("sentences");
										if (sentencesElement == null) {
											sentencesElement = document.getElementsByTagName("MODULE_CONTENT_MAIN");
											if (sentencesElement != null) {
												sentencesElement = sentencesElement[0];
											}
										}
										var parentElement = sentencesElement.parentNode;
										var toggleTagP = document.createElement('p');
										toggleTagP.setAttribute("style","text-align:center");
										/////////////ADD THE USER INTERFACE HERE - PREFERENCE SAY NO CLOUDS //////////////////////
										toggleTagP.innerHTML=  getUserTable(false);
										parentElement.insertBefore(toggleTagP, sentencesElement);	
									}
								} , false);


/*
 * Here is a method that I call in the 'load' handler to perform processing of the page
 * It just initializes variables and doesnt return anything
 */
function init() {
	// ignore the symbol that we searched on
	var phrases = unsafeWindow["phrase_array"];
									for (var i = 0; i < phrases.length; i++) {
										var phrase = phrases[i];
										// an array
										var parsed = parsePhrase(phrase["ostr"]);
										for (x in parsed) {
											var temp = parsed[x];
											if (temp.length > 1) {
												var name = trim(temp[0]);
												if (name ==  main_symbol)
													continue;
												var id = trim(temp[1]);
												name = replaceSpaces(name);
													if (id == "MeSH"){
														if (FIRST_CLOUD_ARRAY[name]) {
															FIRST_CLOUD_ARRAY[name] = FIRST_CLOUD_ARRAY[name] + 1;
															FIRST_CLOUD_COLOR_THRESHOLD[name] = FIRST_CLOUD_COLOR_THRESHOLD[name] > phrase["nr"] ? FIRST_CLOUD_COLOR_THRESHOLD[name] : phrase["nr"];
															FIRST_CLOUD_COLOR_VALUES = FIRST_CLOUD_COLOR_VALUES < FIRST_CLOUD_COLOR_THRESHOLD[name] ? FIRST_CLOUD_COLOR_THRESHOLD[name] : FIRST_CLOUD_COLOR_VALUES;
															var temp = MESH_PMIDs[name];
															temp[temp.length] = phrase["pmid"];
															MESH_PMIDs[name] = temp;
															// unipub
															temp = MESH_UNIPUBIDs[name];
															temp[temp.length] = phrase["unipub_id"];
															MESH_UNIPUBIDs[name] = temp;
														 } else {
															CLOUD_HAS_CONTENT = true;
 															FIRST_CLOUD_ARRAY[name] = 1;
															FIRST_CLOUD_COLOR_THRESHOLD[name] = phrase["nr"];
															FIRST_CLOUD_COLOR_VALUES = FIRST_CLOUD_COLOR_VALUES < FIRST_CLOUD_COLOR_THRESHOLD[name] ? FIRST_CLOUD_COLOR_THRESHOLD[name] : FIRST_CLOUD_COLOR_VALUES;
															MESH_PMIDs[name] = [phrase["pmid"]];
															MESH_UNIPUBIDs[name] = [phrase["unipub_id"]];
														 }
														 if (FIRST_CLOUD_ARRAY[name] > FIRST_CLOUD_MAX) { FIRST_CLOUD_MAX=FIRST_CLOUD_ARRAY[name];}
												} else if (id == "GENE") {
														if (SECOND_CLOUD_ARRAY[name]) {
															SECOND_CLOUD_ARRAY[name] = SECOND_CLOUD_ARRAY[name] + 1;
															SECOND_CLOUD_COLOR_THRESHOLD[name] = SECOND_CLOUD_COLOR_THRESHOLD[name] > phrase["nr"] ? SECOND_CLOUD_COLOR_THRESHOLD[name] : phrase["nr"];
															SECOND_CLOUD_COLOR_VALUES = SECOND_CLOUD_COLOR_VALUES < SECOND_CLOUD_COLOR_THRESHOLD[name] ? SECOND_CLOUD_COLOR_THRESHOLD[name] : SECOND_CLOUD_COLOR_VALUES;
															var temp = GENE_PMIDs[name];
															temp[temp.length] = phrase["pmid"];
															GENE_PMIDs[name] = temp;
															// unipub
															temp = GENE_UNIPUBIDs[name];
															temp[temp.length] = phrase["unipub_id"];
															GENE_UNIPUBIDs[name] = temp;
														 } else {
															CLOUD_HAS_CONTENT = true;
 															SECOND_CLOUD_ARRAY[name] = 1;
															SECOND_CLOUD_COLOR_THRESHOLD[name] = phrase["nr"];
															SECOND_CLOUD_COLOR_VALUES = SECOND_CLOUD_COLOR_VALUES < SECOND_CLOUD_COLOR_THRESHOLD[name] ? SECOND_CLOUD_COLOR_THRESHOLD[name] : SECOND_CLOUD_COLOR_VALUES;
															GENE_PMIDs[name] = [phrase["pmid"]];
															GENE_UNIPUBIDs[name] = [phrase["unipub_id"]];
														 }
														 if (SECOND_CLOUD_ARRAY[name] > SECOND_CLOUD_MAX) { SECOND_CLOUD_MAX=SECOND_CLOUD_ARRAY[name];}
												}
											}
										}
									}
									FIRST_CLOUD_THRESHOLD = 0
									SECOND_CLOUD_THRESHOLD = 0;
									
									var cloudElement = document.createElement("div");
									cloudElement.setAttribute("id","clouds");
									var outDiv = document.createElement('div');
									outDiv.setAttribute("align", "center");
									outDiv.setAttribute("id", "cloud");
									
									var contentDiv = document.createElement('DIV');
									contentDiv.setAttribute("align", "center");
									contentDiv.setAttribute("id", "cloudContent");

									var tagsDiv = document.createElement('div');
									tagsDiv.setAttribute("id", "tags");
									contentDiv.setAttribute("title", "More frequent terms are bigger");
									
								
									if (!isInteractionURL()) {
										IS_FIRST_CLOUD_SHOWING = true;
										contentDiv.appendChild(createTags(FIRST_CLOUD_ARRAY, FIRST_CLOUD_MAX, true));
									}else {
										IS_FIRST_CLOUD_SHOWING = false;
										contentDiv.appendChild(createTags(SECOND_CLOUD_ARRAY, SECOND_CLOUD_MAX, false));
									}
									outDiv.appendChild(contentDiv);

									// toggle hit count
									//var slidingElement = createSlidingElement(IS_FIRST_CLOUD_SHOWING);
									//cloudElement.appendChild(slidingElement);
																	
									cloudElement.appendChild(outDiv);
									if (CLOUD_HAS_CONTENT && knownURL()) {
										var sentencesElement = document.getElementById("sentences");
										if (sentencesElement == null) {
											sentencesElement = document.getElementsByTagName("MODULE_CONTENT_MAIN");
											if (sentencesElement != null) {
												sentencesElement = sentencesElement[0];
											}

										}
										var parentElement = sentencesElement.parentNode;
										parentElement.insertBefore(cloudElement,sentencesElement);
										
									}
}

/* 
 * function just for iHOP GM script 
 * This function appends a special ending to the url and then switches to the url.
 * The script then checks the url for this ending and the clouds default behaviour is ignored.
 */
function switchToGeneInteractions(event) {
	var re = new RegExp('(gismo)');
	CURRENT_URL+="";
	if (CURRENT_URL.match(re)) {
		var agree=confirm("To see the interacting genes, we will load the page providing the interaction information for this gene - continue?");
		if (agree) {
			CURRENT_URL = CURRENT_URL.replace(re, "gs");
			event.stopPropagation();
	    	event.preventDefault();
			window.location = CURRENT_URL+'#INTERACTIONS';
			return false;
		} else {
			return false;
		}
	}
	return true;
}

/**
 * This function is called before displaying any cloud related content to ensure that the page
 * is one that provides the information necessary to produce a cloud. Some pages have sufficient
 * information that can produce a cloud, however, some of the key actions on the cloud cannot be 
 * invoked due to missing necessary information (like PubMed ids, etc). In the event that a page
 * doesnt provide *all* the information necessary to create a proper cloud, the cloud is not 
 * rendered.
 */
function knownURL() {
	var re = new RegExp('(\/gs\/)');
	CURRENT_URL+="";
	if (CURRENT_URL.match(re)) {
		return true;
	}
	re = new RegExp('(gismo)');
	if (CURRENT_URL.match(re)) {
		return true;
	}
	re = new RegExp('(\/to\?)');
	if (CURRENT_URL.match(re)) {
		return true;
	}
	return false;
}
function isInteractionURL() {
	var re = new RegExp('(#INTERACTIONS$)');
	CURRENT_URL+="";
	if (CURRENT_URL.match(re)) {
		return true;
	}
	return false;
}

function isImage(image) {
	var re = new RegExp('text\/html');
	image+="";
	if (image.match(re)) {
		return false;
	}
	return true;
}

/**
 * This method creates the control panel.
 * Feel free to edit as you see fit.
 * This is an HTML Table with 3 rows
 */
function getUserTable(bool) {
	return '<table  class="controls" align="center" border="1" cellspacing="1" cellpadding="1" bgcolor="#0099CC">'
		+'	<tr>'
		+'		<td colspan=5 align="center">'
		+'			<table border="0">'
		+'				<tr>'
		+'					<td  align="center" class="tdBig">iHOPerator Control Panel</td>'
		+'					<td align="right"  class="tdSmall" id="savePreferences">' +
								'<a  title="Save your Cloud preferences (Font Size, Visibility)" class="uiLink" id="savePreferences" href=""> Save Settings </a> ' +
						   '</td>'
		+'				</tr>'
		+'			</table>'
		+'		</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td>View Controls</td>'
		+'		<td class="controlText">' +
					'<div  class="checkbox">' +
						'<span title="What kind of cloud would you like to view?" >Show:<br></span>' +
						'<input type="radio" cloud="SECOND" id="toggler" name="toggle" ' + (isInteractionURL() ? ' checked="checked" ' : '') + ' title="Choose to view a Cloud of genes that interact with '+ main_symbol+ '" >' +
							'<span title="Choose to view a Cloud of genes that interact with '+ main_symbol+ '">Interacting Genes</span>' +
						'</input><br>' +
						'<input type="radio" id="toggler" ' + (isInteractionURL() ? '' : ' checked="checked" ') + 'cloud="FIRST" name="toggle" title="Choose to view MeSH terms related to '+main_symbol+'" >' +
							'<span title="Choose to view MeSH terms related to '+main_symbol+'">MeSH Terms</span>' +
						'</input>' +
					'</div>' +
				'</td>'
		+'		<td class="controlText">' +
					'<div  class="checkbox" title="Would you like to show the cloud?">' +
						'<span>Show Tag Cloud </span><input type="checkbox"  id="toggleTagP" href="" ' + (bool ? 'checked="checked"' : '') + '>' +
					'</div>' +
				'</td>'
		+'		<td class="controlText">' +
					'<div class="userlinks" title="Choose a font size for the Tags in the Cloud!">' +
						' <input type="radio" size="2" id="toggleSize" name="sizer" ' + (DEFAULT_FONT_SCALE == .5 ? 'checked="checked"' :'') + '>x-small</input>' +
						' <input type="radio" size="3" id="toggleSize" name="sizer" ' + (DEFAULT_FONT_SCALE == .75 ? 'checked="checked"' :'') + '>small</input><br>' +
						' <input type="radio" size="4" id="toggleSize" name="sizer" ' + (DEFAULT_FONT_SCALE == 1 ? 'checked="checked"' :'') + '>normal</input><br>' +
						' <input type="radio" size="6" id="toggleSize" name="sizer" ' + (DEFAULT_FONT_SCALE == 1.5 ? 'checked="checked"' :'') + '>large &nbsp;&nbsp;&nbsp;</input>' +
						' <input type="radio" size="8" id="toggleSize" name="sizer" ' + (DEFAULT_FONT_SCALE == 2 ? 'checked="checked"' :'') + '>x-large</input>' +
					'</div>' +
				'</td>'
		+'		<td class="controlText">' +
					'<div class="uiLink" title="Click to sort cloud alphabetically" >' +
						'<a class="uiLink" id="SortCloud" href=""> Re-Sort Cloud </a>' +
					'</div><br><span title="Filter tags by frequency">Modify Tag Threshold:</span>'+
					'<span title="Filter tags by frequency" id="HIT_SLIDER" align="left" style="width:200px;margin:0 auto;text-align:left;">' +
					createSlidingElement(IS_FIRST_CLOUD_SHOWING).innerHTML + 
				'</span></td>'
		+'	</tr>'
		+'	<tr>	'
		+'		<td>Action Controls</td>'
		+'		<td class="controlText" colspan=2>' +
					'<span title="What would you like to happen upon clicking a tag?">On Click:</span><br>' + 
					'<div  class="checkbox">' +
						'<input type="radio" title="Invoke a custom Taverna workflow on the interacting gene" action="workflow" id="tag_action_toggler" name="action" '+ (isInteractionURL() && (useWorkflow &&!useGbrowse && !usePubmed)? 'checked="checked"' : '') + ' >' +
							'<span id="workflowSpan" '+ (isInteractionURL() ? ' class="active" ': ' class="inactive" ') +' title="Invoke a custom Taverna workflow on the interacting gene">Retrieve KEGG Pathway Diagram</span>' +
						'</input><br>' +
						'<input type="radio" action="gbrowse" id="tag_action_toggler" name="action" title="Invoke a session of gBrowse_moby on the interacting genes" ' + (isInteractionURL() && (!useWorkflow &&useGbrowse && !usePubmed) ? 'checked="checked"' : '')+ '>' +
							'<span id="gbrowseSpan" '+ (isInteractionURL() ? ' class="active" ': ' class="inactive" ') +' title="Invoke a session of gBrowse_moby on the interacting genes">Use BioMOBY Services</span>' +
						'</input><br>' +
						'<input type="radio" action="pubmed" id="tag_action_toggler" name="action" title="Click on MeSH terms to view PubMed Abstracts" ' + ((!useWorkflow &&!useGbrowse && usePubmed) || !isInteractionURL() ? 'checked="checked"' : '' )+ '>' +
							'<span id="pubmedSpan" class="active" title="Click on MeSH terms to view PubMed Abstracts">Retrieve PubMed Abstracts</span>' +
						'</input>' +
					'</div>' +
				'</td>'
		+'		<td class="controlText">' +
					'<div  class="checkbox">' +
						'<span title="Would you like to open links in a new window or a \'preview\' window?">Open Links In:<br></span>' +
						'<input class="userLinks" type="radio" win="new" name="openInPreview" id="isPreview" ' + (OPEN_IN_PREVIEW_FRAME  ? '' : 'checked="checked"') + 'href=""> A New Window </input><br>' +
						'<input class="userLinks" type="radio"  win="preview" name="openInPreview" id="isPreview" ' + (OPEN_IN_PREVIEW_FRAME  ? 'checked="checked"' : '') + 'href=""> A Preview Window </input>' +
					'</div>' +
				'</td>'
		+'		<td class="controlText">' +
					'<div  class="checkbox" title="Would you like to remove the \'preview\' window?">' +
						'<span id="toggleWindowSpan" '+ (OPEN_IN_PREVIEW_FRAME ? ' class="active" ': ' class="inactive" ') +'>Remove Preview Window</span>' +
						'<input class="userLinks" type="checkbox" id="toggleOutputFrame" href=""></input>' +
					'</div>' +
				'</td>'
		+'	</tr>'
		+'	<tr>'
		+'		<td colspan=5 align="center">'
		+'			<table class="controls" align="left" border="0" cellspacing="1" bgcolor="#0099CC">'
		+'				<tr>'
		+'					<td align="left">' +
		 '						<span title="Legend" ><b>Key:</b><i> More frequent tags appear relatively larger </i> | <i> Tags associated with relatively high impact journals are redder</i>' +
		 '						</span>' +
		 '					</td>'
		+'					<td class="controlText" align="right">' +
		'						<a align="right" title="Need help?" class="uiLink" id="HELP" href="'+HELP_URL +'" target="_blank"> Help </a> ' +
			   '			</td>'
		+'				</tr>'
		+'			</table>'
		+'		</td>'
		+'	</tr>'
		+'</table>';
}

/*
 * Here is the method used to create the TAG cloud
 * The method creates a <ul> element and gives it an
 * id of 'ITAGS'.
 * The children of this element are a <li> element, followed
 * by a text node containing a newline character, i.e.
 * <ul>
 *   <li/>
 *   \n
 *	 <li/>
 *   \n
 *   ...
 * </ul>
 * The \n after each <li> element is important for proper rendering of the cloud.
 * The caller of this method would then add the ul element as a child to a DIV, 
 * whose parent is a Div and grandparent is a Div, for example:
 * <Div id='clouds'>
 *	 <Div id='cloud'>
 *		<Div id='cloudContent'>
 *			<ul id='iTAGS'>
 *				<!-- your li elements here -->
 *			</ul>
 *		</Div>
 *	 </Div>
 * </Div>
 *
 * The li elements themselves contain an A element and a span element.
 *    -> The A element should have a class of 's# i#', taken from the CSS. 
 *		 In addition, giving this element an id will allow you to later add mouse click handlers.
 *    -> The span element contains the frequency for the particular TAG and can be ommitted.
 * In addition, you might find it useful to include other metadata as attributes for the li element.
 * This script utilizes the attributes 'placement', to denote its sorted order, and 'count' to keep
 * track of the frequency.
 */
function createTags (array, max, isMeSH) {
	var ulElement = document.createElement("ul");
	ulElement.setAttribute("id", "iTags");
	var highImpact = -1;
	var impactArray = null;
		if (isMeSH) {
			highImpact = FIRST_CLOUD_COLOR_VALUES;
			impactArray = FIRST_CLOUD_COLOR_THRESHOLD;
		} else {
			highImpact = SECOND_CLOUD_COLOR_VALUES;
			impactArray = SECOND_CLOUD_COLOR_THRESHOLD;
		}
		
	var sorted_ = new Array();
	var frequencies = new Array();
	var i = 0;
	for(var t in array) {
 		sorted_[i] = [t, array[t]];
		frequencies[i] = array[t];
 		i ++;
	}
	sorted_ = sorted_.sort(function byName(a, b) {  
		var anew = (""+a).toLowerCase();
		var bnew = (""+b).toLowerCase(); 
		if (anew < bnew) 
			return -1;
		if (anew > bnew) 
			return 1; 
		return 0;
	});
	frequencies.sort(function numcompare(a,b) {return a-b;});
	// value of tMax < 1=> one big outlier
	var tMax = frequencies[frequencies.length-2]/(frequencies[frequencies.length-1] - frequencies[frequencies.length-2]);
	var median = frequencies[Math.floor(sorted_.length/2)];
	var exponent = .5
	for (var x =0; x < sorted_.length; x++) {
		var impact = 0;
		impact = 10 - 10*(1- (impactArray[sorted_[x][0]] / highImpact));
		var freq = sorted_[x][1]/ max;
		freq = 10 - 10*(1-freq);
		freq = Math.round(freq) ;
		var size = sorted_[x][1]/ max;
		size = Math.pow(size, exponent);
		size = 10 - 10*(1-size);
		size = Math.floor(size) ;
		
		var liElement = document.createElement('li');
		liElement.setAttribute("class","s"+size );
		liElement.setAttribute("id","s"+size );
		liElement.setAttribute("placement", x );
		liElement.setAttribute("count", sorted_[x][1] );
		
		var aElement = document.createElement('a');
		aElement.setAttribute("class","s"+size + " i"+Math.round(impact));
		aElement.setAttribute("href",getPmidLink(isMeSH, sorted_[x][0]));
		// set a unipub id - I know that there may be > 1, but i only need one.
		aElement.setAttribute("unipub_id", isMeSH ? MESH_UNIPUBIDs[sorted_[x][0]][0] : GENE_UNIPUBIDs[sorted_[x][0]][0]);
		aElement.setAttribute('id','a_tag_link');
		aElement.setAttribute("target","_blank");
		aElement.setAttribute('title',isMeSH ? 'Click to search PubMed' : 'Invoke BioMOBY services on or Search Pubmed for abstracts on ' + unReplaceSpaces(sorted_[x][0]));
		aElement.textContent = unReplaceSpaces(sorted_[x][0]);
		
		var spanElement = document.createElement('span');
		spanElement.setAttribute('title', unReplaceSpaces(sorted_[x][0]) + ' occured ' + sorted_[x][1] + ' times');
		spanElement.textContent = sorted_[x][1];
		
		liElement.appendChild(aElement);		
		liElement.appendChild(spanElement);
		ulElement.appendChild(liElement);
		ulElement.appendChild(document.createTextNode("\n"));
	}
	if (isMeSH) {
		MESH_TAGS = ulElement;
		IS_FIRST_CLOUD_SHOWING = true;
	} else {
		GENE_TAGS = ulElement;
		IS_FIRST_CLOUD_SHOWING = false;
	}
	return ulElement ;
}

/*
 * This function toggles between MeSH Tags and GENE Tags
 */
function toggleTags(isMESH) {
	var toggled;
	if (TOGGLED_TAGS == null) {
		// init the array in case
		TOGGLED_TAGS = createTags((IS_FIRST_CLOUD_SHOWING ? SECOND_CLOUD_ARRAY : FIRST_CLOUD_ARRAY),(IS_FIRST_CLOUD_SHOWING ? SECOND_CLOUD_MAX : FIRST_CLOUD_MAX),(IS_FIRST_CLOUD_SHOWING ? false : true));
	}
	toggled = TOGGLED_TAGS;
	TOGGLED_TAGS = document.getElementById("iTags").cloneNode(true);
	if (isMESH) {
		IS_FIRST_CLOUD_SHOWING = false;
	} else {
		IS_FIRST_CLOUD_SHOWING = true;
	}
	return toggled;
	
}

/*
 * This function performs the filtering of the Tag cloud.
 * count is the new frequency count.
 */
function updateTagCount (isMeSH, count) {

	var oldCount = isMeSH ? FIRST_CLOUD_THRESHOLD : SECOND_CLOUD_THRESHOLD;
	if (oldCount - count < 0 ) {
		// potential removal of tags pop off tags onto deleted array
		var iTAGS = document.getElementById('iTags');
		if (iTAGS.hasChildNodes()) {
			var children = iTAGS.childNodes;
			for (var i = 0; i < children.length;) {
				var li = children[i];
				if (li.hasAttribute('count') && parseInt (li.getAttribute('count')) <= count) {
					if (isMeSH) {FIRST_CLOUD_DELETED.push(li.cloneNode(true));} else {SECOND_CLOUD_DELETED.push(li.cloneNode(true));}
					iTAGS.removeChild(li.nextSibling);
					iTAGS.removeChild(li);
					// the list childNodes is LIVE and hence we restart at 0
					i = 0;
				} else {
					i = i+2;
				}
			}
 		}
	} else {
		// potential addition of tags
		// go through the deleted array
		var iTAGS = document.getElementById('iTags');
			if (iTAGS == null) {
				return;
			}
			
			if (isMeSH) {
				var newMESH_DELETED = new Array();
				for (var i = 0; i < FIRST_CLOUD_DELETED.length;i++) {
					var li = FIRST_CLOUD_DELETED[i];
					if (li.hasAttribute('count') && parseInt (li.getAttribute('count')) > count) {
						iTAGS.appendChild(li);
						iTAGS.appendChild(document.createTextNode("\n"))
					} else {
						newMESH_DELETED.push(li);
					}
				}
				FIRST_CLOUD_DELETED = newMESH_DELETED;
			}else {
				var newGENE_DELETED = new Array();
				for (var i = 0; i < SECOND_CLOUD_DELETED.length;i++) {
					var li = SECOND_CLOUD_DELETED[i];
					if (li.hasAttribute('count') && parseInt (li.getAttribute('count')) > count) {
						iTAGS.appendChild(li);
						iTAGS.appendChild(document.createTextNode("\n"))
					} else {
						newGENE_DELETED.push(li);
					}
				}
				SECOND_CLOUD_DELETED = newGENE_DELETED;
			}
	}
		if (isMeSH) {
			FIRST_CLOUD_THRESHOLD = count;
		} else {
			SECOND_CLOUD_THRESHOLD = count;
		}
}

/*
 *
 */
function sortTags() {
	var x = new Array();
	var count = 0 ;
	var tags = document.getElementById('iTags');
	if (tags == null)
		return;
	var sorted = new Array();
	while (tags.firstChild) {
		var array = new Array();
		var e = tags.firstChild.cloneNode(true);
		sorted[parseInt(e.getAttribute('placement'))] = e;
		tags.removeChild(tags.firstChild);
		tags.removeChild(tags.firstChild);
	}
	for (count = 0; count < sorted.length; count++){
		if (sorted[count] != null) {
			tags.appendChild(sorted[count]);
			tags.appendChild(document.createTextNode("\n"));
		}
	}
	
}

/*
 *
 */
function parsePhrase(s) {
 var parts=s.split("[)}");
 var ns= new Array();
 for(var i=0; i<parts.length; i++) {
  var p=parts[i];
  var idx=p.indexOf("[(}");
  if(idx>=0) {
   var com=p.substring(0, idx);
   var param=getParameters(com);
	ns[i]=param;
   //   
   p=p.substring(idx+3, p.length);
  }
 }
 return ns;
}

/*
 *
 */
function getParameters(str) {

 var rp=str.split(",");

 var p=new Array();
 var j=0;

 var np="";

 for(var i=0; i<rp.length; i++) {
  np+=rp[i];

  var tp=trim(np);

  var fc=tp.charAt(0);
  var lc=tp.charAt(tp.length-1);

  var ok=true;

  if((fc=="'" || fc=="\"") && fc!=lc) ok=false;

  if(ok) {

   np=trim(np);

   var nfc=np.charAt(0);

   if(nfc=="'" || nfc=="\"") {
    var ncontent=np.substring(1, np.length-1);

    np="\""+ncontent+"\"";
   }

   p[j]=eval(np);

   j++;

   np="";
  } else {

   np+=",";
  }
 }

 return p;
}

function trim(str) {
 var i=0;
 var j=str.length-1;

 for(; i<str.length; i++) {
  if(str.charAt(i)!=" ") break;
 }

 for(; j>=0; j--) {
  if(str.charAt(j)!=" ") break;
 }
 
 return str.substring(i, j+1);
}

function replaceSpaces(str) {
	for(var i=0; i<str.length; i++) {
  		if(str.charAt(i) == " ") {
			str = str.substring(0,i) + '|_|' + str.substring(i+1, str.length);
		}
	}
	return str;
}

/*
 *
 */
function unReplaceSpaces(str) {
	
	var y = str.indexOf('|_|',0);
	while ( y > -1) {
		str = str.substring(0, y) + " " + str.substring(y+3, str.length);
		y = str.indexOf('|_|',0);
	}
	return str;
}


function getOrganism(org) {
	
	switch (org) {
		case '1': {
			return 'human';
		}
		break;
		case '2': {
			return 'mouse';
		}
		break;
		case '6': {
			return 'yeast';
		}
		break;
		case '3': {
			return 'fruitfly';
		}
		case '4': {
			return 'C. elegans';
		}
		break;
	}
	return 'human';
}

/*
 *
 */
function getPmidLink(isMeSH, term) {
	var URL = "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=PureSearch&db=pubmed&details_term="
	var suffix = "%5BUID%5D%20"; // appended to each pmid in the url
	if (isMeSH) {
		var newURL = URL;
		newURL += MESH_PMIDs[term][0] + suffix;		
		for (var x = 1; x < MESH_PMIDs[term].length; x++) {
			newURL += "%20OR%20" + MESH_PMIDs[term][x] + suffix;
		}
		return newURL;
	} else {
		var newURL = URL;
		newURL += GENE_PMIDs[term][0] + suffix;		
		for (var x = 1; x < GENE_PMIDs[term].length; x++) {
			newURL += "%20OR%20" + GENE_PMIDs[term][x] + suffix;
		}
		return newURL;
	}
}

/*
 * the SLIDER is created here
 * You can cusomize the following attributes:
 *		-> END_VALUE  	: the maximum value for the slider
 *		-> TOTAL		: the number of increments in the slider
 *		-> value		: the current value for the slider
 * Currently, the slider has a 
 *		END_VALUE of [MESH | GENE]_MAX (the highest frequency for a [MESH | GENE])
 * 		TOTAL of [MESH | GENE]_MAX (the highest frequency for a [MESH | GENE])
 *		value of [MESH | GENE]_THRESHOLD
 */
function createSlidingElement(isMesh) {
	
	// Initialize the slider and set its style
	var slidingElement = document.createElement("span");
	slidingElement.setAttribute('title','Filter tags by frequency');
	slidingElement.setAttribute("id","HIT_SLIDER");
	//slidingElement.setAttribute("style","width:200px;margin-left:auto;margin-right:auto;");
	slidingElement.setAttribute("style","width:200px;margin:0 auto;text-align:left;");
	//slidingElement.appendChild(document.createElement('br'));
	var trackDiv = document.createElement("DIV");
	trackDiv.setAttribute("class","sliderTrack");
	var sliderDiv = document.createElement("DIV");
	sliderDiv.setAttribute("class","slider");
	sliderDiv.setAttribute("id","TAG_SLIDER");
	sliderDiv.setAttribute("display","tag_number_id");
	sliderDiv.setAttribute("align","left");
	
	// where is the slider now
	var _current_ = (IS_FIRST_CLOUD_SHOWING ? FIRST_CLOUD_THRESHOLD / FIRST_CLOUD_MAX: SECOND_CLOUD_THRESHOLD / SECOND_CLOUD_MAX);
	sliderDiv.setAttribute("style","left:"+parseInt(_current_*100)+"px;");
	var holderDiv = document.createElement("DIV");
	holderDiv.setAttribute("class","sliderTextHolder");
	var inputElement = document.createElement("input");
	inputElement.setAttribute("class","sliderText");
	inputElement.setAttribute("id","tag_number_id");
	inputElement.setAttribute("type","text");
	inputElement.setAttribute("END_VALUE",(isMesh ? FIRST_CLOUD_MAX : SECOND_CLOUD_MAX));
	inputElement.setAttribute("TOTAL",(isMesh ? FIRST_CLOUD_MAX : SECOND_CLOUD_MAX));
	inputElement.setAttribute("value",(isMesh ? FIRST_CLOUD_THRESHOLD : SECOND_CLOUD_THRESHOLD));
	inputElement.setAttribute("readonly","true");
	inputElement.setAttribute("style","right:0px;");
	holderDiv.appendChild(inputElement);
	trackDiv.appendChild(sliderDiv);
	slidingElement.appendChild(trackDiv);
	slidingElement.appendChild(holderDiv);
	
	/* the following creates a A element and adds text to it
	 * this element is used to describe what the slider does
 	 * also there is an id which is used to add actions 
	 * (or to suppress the default action) for the link
	 * using the click handler 
	 * document.addEventListener('click', function(event)
	 * declared above.
	 * Modify/Remove as you wish
	 */
	// START EDITABLE
	/*var textA = document.createElement('SPAN');
	//textA.setAttribute('class','userLinks');
	textA.setAttribute('href','');
	textA.setAttribute('id','label');
	textA.setAttribute('title','Filter tags by frequency');
	textA.textContent = 'Modify Tag Cloud Threshold';
	slidingElement.appendChild(textA);*/
	// END EDITABLE
	
	
	//slidingElement.appendChild(document.createElement('br'));
	//slidingElement.appendChild(document.createElement('br'));
	return slidingElement;
}

/*
 * function to set the left/top position of the slider
 */
function setPos(element, pos, isTOP) {
	if (!(element = document.getElementById(element))) 
			return 0;
	if (isTOP) {
		if (typeof(pos) == 'number') 
			element.style.top = pos + 'px';
		else {
			pos = parseInt(element.style.top);
			if (isNaN(pos))
				pos = 0;
		}
	} else {
		if (typeof(pos) == 'number') 
			element.style.left = pos + 'px';
		else {
			pos = parseInt(element.style.left);
			if (isNaN(pos))
				pos = 0;
		}
	}
	return pos;
}

function handle_slider_movement(event) {
	if (IS_MOUSEOVER) { 
		x = slider.startOffsetX + event.screenX;
		y = slider.startOffsetY + event.screenY;
		if (x > slider.X_MAX) 
			x = slider.X_MAX;
		if (x < 0)
			x = 0;
		if (y > slider.Y_MAX)
			y = slider.Y_MAX;
		if (y < 0)
			y = 0;
		setPos(slider.id, x,false);  
		setPos(slider.id, y, true); 
		sliderVal = x + y;
		sliderPos = (slider.distance / display.TOTAL) * 
			Math.round(display.TOTAL * sliderVal / slider.distance);
		v = Math.round((sliderPos * slider.scale));
		display.value = v;
		return false
	}
	return
}

function handle_slider_mouse_up() {
	if (IS_MOUSEOVER) {
		v = (display.value) ? display.value : 0;
		pos = v/slider.scale;
		if (slider.Y_MAX == 0) {
			pos = (pos > slider.X_MAX) ? slider.X_MAX : pos;
			pos = (pos < 0) ? 0 : pos;
			setPos(slider.id, pos,false);
		}
		if (slider.X_MAX == 0) {
			pos = (pos > slider.Y_MAX) ? slider.Y_MAX : pos;
			pos = (pos < 0) ? 0 : pos;
			setPos(slider.id, pos,true);
		}
		
		updateTagCount(IS_FIRST_CLOUD_SHOWING, v);
	}
	IS_MOUSEOVER = false 
}

function handle_slide(event) {
	slider = event.target;
	slider.distance = 100;
	displayId = slider.getAttribute('display');
	display = document.getElementById(displayId);
	display.sliderId = slider.id;
	val = parseInt(display.getAttribute('TOTAL'));
	display.TOTAL = val; 
	end_value = parseFloat(display.getAttribute('END_VALUE')); 
	slider.scale = end_value / slider.distance; 
	slider.X_MAX = slider.distance;
	slider.Y_MAX = 0;
	slider.startOffsetX = setPos(slider.id,null,false) - event.screenX;
	slider.startOffsetY = setPos(slider.id,null,true) - event.screenY; 
	IS_MOUSEOVER = true
	return false
}

// cookie management
// obtained from
// http://www.webreference.com/js/column8/functions.html
/*
   name - name of the cookie
   value - value of the cookie
   [expires] - expiration date of the cookie
     (defaults to end of current session)
   [path] - path for which the cookie is valid
     (defaults to path of calling document)
   [domain] - domain for which the cookie is valid
     (defaults to domain of calling document)
   [secure] - Boolean value indicating if the cookie transmission requires
     a secure transmission
   * an argument defaults when it is assigned null as a placeholder
   * a null placeholder is not required for trailing omitted arguments
*/

function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
	  
  document.cookie = curCookie;
}


/*
  name - name of the desired cookie
  return string containing value of specified cookie or null
  if cookie does not exist
*/

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
	
  return unescape(dc.substring(begin + prefix.length, end));
}


/*
   name - name of the cookie
   [path] - path of the cookie (must be same as path used to create cookie)
   [domain] - domain of the cookie (must be same as domain used to
     create cookie)
   path and domain default if assigned null or omitted if no explicit
     argument proceeds
*/

function deleteCookie(name, path, domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// date - any instance of the Date object
function fixDate(date) {
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}

/*
 * encodes a string so that xml, rdf, etc can be
 * displayed in the preview window.
 */
function encodeString(string) {
	string = string.replace(/\&/g,"&amp;");
	string = string.replace(/\</g,"&lt;");
	string = string.replace(/\>/g,"&gt;");
	return string;
}

function openWindow(url, gene, org) {
	OpenWindow=window.open(url+gene+"&organism="+org+"&base64=no", "newwin", "");
//	OpenWindow.document.write("<TITLE>Pathway describing "+gene+" using "+ org+"</TITLE>")
//	OpenWindow.document.write("<BODY>")
//	OpenWindow.document.write("<img src='"+url+gene+"&base64=no'/>")
//	OpenWindow.document.write("</BODY>")
//	OpenWindow.document.write("</HTML>")
	OpenWindow.document.close()
}

/*
 * The following function returns a string representing the CSS
 * Any changes here are reflected in the look and feel of the
 * script.
 */
function writeStyleSheet() {
	var str = "<STYLE TYPE=\"text/css\" id=\"biomonkeySS\"><!-- "
+"#iTags { border:2px solid black; background:#eee; padding:5px; margin:5px; text-align:center; overflow:auto;} "
+"#iTags li { list-style:none; display:inline; } "
+"#iTags .s0  { font-size:"+DEFAULT_FONT_SCALE * 100 +"% } "
+"#iTags .s1  { font-size:"+DEFAULT_FONT_SCALE * 110 +"% } "
+"#iTags .s2  { font-size:"+DEFAULT_FONT_SCALE* 121 +"% } "
+"#iTags .s3  { font-size:"+DEFAULT_FONT_SCALE* 134 +"% } "
+"#iTags .s4  { font-size:"+DEFAULT_FONT_SCALE* 147 +"% } "
+"#iTags .s5  { font-size:"+DEFAULT_FONT_SCALE* 162 +"% } "
+"#iTags .s6  { font-size:"+DEFAULT_FONT_SCALE* 179 +"% } "
+"#iTags .s7  { font-size:"+DEFAULT_FONT_SCALE* 200 +"% } "
+"#iTags .s8  { font-size:"+DEFAULT_FONT_SCALE* 220 +"% } "
+"#iTags .s9  { font-size:"+DEFAULT_FONT_SCALE* 235 +"% } "
+"#iTags .s10 { font-size:"+DEFAULT_FONT_SCALE* 250 +"% } "

+"#iTags .i0  { color:#5B7884 }" 
+"#iTags .i1  { color:#5B7884} "
+"#iTags .i2  { color:#5B7884 } "
+"#iTags .i3  { color:#94AAB5 } "
+"#iTags .i4  { color:#94AAB5 } "
+"#iTags .i5  { color:#C0B0C4 } "
+"#iTags .i6  { color:#C0B0C4 } "
+"#iTags .i7  { color:#C0B0C4 } "
+"#iTags .i8  { color:#FF8499} "
+"#iTags .i9  { color:#FF8499 } "
+"#iTags .i10 { color:#EA1A29 } "
+"#iTags li span { font-size:"+DEFAULT_FONT_SCALE*50+"%; color:#aaa; padding: 0 5px 0 0;text-decoration:none;} "

+"#cloud { padding:0; width:100%;}"

+"#cloudContent { width:100%; } "
+"#cloud_output { border:2px solid black; background:#eee; padding:5px; width:80%; height:400; overflow:auto; margin:5px; text-align:center; } "

+"#waiting { border:2px solid black; background:#eee; padding:5px; width:80%; height:400; overflow:auto; margin:5px; text-align:center; cursor:wait;} "

+ ".preview_iframe { text-align:center; width:99%; height:97%; border: 3px groove black; }"

+"#iTags li a:hover { color:#333399; text-decoration:none; } "
+"#iTags li a { color:#08f; text-align:justify; text-decoration:underline; padding:1px;}"

+"#userlinks a {float:left; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:100%; font-weight:bold; color:rgb(0,153,204); padding:0px 0px 0px 15px;} "
+"#userlinks a:hover {color:black; text-decoration:none;} "
+"#checkbox span { float:Left; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:100%; font-weight:bold; color:rgb(0,153,204); padding:0px;} "
+"#checkbox br { clear:both; } "
+"#checkbox input{ padding: 0px; margin: 0px; float:left; width:35px;} "

+"a.userLinks:hover { color:black;text-decoration:none; } "
+"#userLinks { text-align:Left; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:100%; font-weight:bold; color:rgb(0,153,204); padding:10px; }"
+"a.userLinks { text-align:Left; text-decoration:none; font-family:Arial,Helvetica,sans-serif; font-size:100%; font-weight:bold; color:rgb(0,153,204); padding:10px;}"

+ ".controls {   width:95%; }"
+ ".tdBig  {  font-family: Arial, Helvetica, sans-serif; font-size: 150%; font-weight: bold;color:black}"
+ ".tdSmall {  font-family: Arial, Helvetica, sans-serif; font-size: 90%; font-weight: bold; color:black;}"
+ "#tdSmall a {text-decoration:underline;}"
+ "#tdSmall a:hover {text-decoration:none;}"

+ ".uiLink {  text-decoration:underline; font-family: Arial, Helvetica, sans-serif; font-size: 90%; font-weight: bold; color:white;}"
+ "#uiLink a:hover {text-decoration:none;}"

+ ".inactive {  color: grey; }"
+ ".active {  color: white; }"

+ ".controlText {  font-family: Arial, Helvetica, sans-serif; font-size: 75%pt; font-weight: normal; color: #FFFFFF }"
+ "#controlText a {text-decoration:none;}"
+ "#controlText a:hover {text-decoration:underline;}"
+"*.sliderTrack { background-color: #bbb; color: #333; width: 120px; float: left; margin: 0; line-height: 0px; font-size: 0px; text-align: left; padding: 4px; border: 1px solid; border-color: #ddd #999 #999 #ddd; } "
+"*.sliderTrack *.slider { width: 16px; background-color: #666; color: #333; position: relative; margin: 0; height: 8px; z-index: 1; line-height: 0px; font-size: 0px; text-align: left; border: 2px solid; border-color: #999 #333 #333 #999; cursor: default; }"
+"*.sliderTextHolder { background-color: #bbb; color: #333; width: 34px; margin: 0; float: left; padding: 0 2px 0 0; height: 20px; text-align: right; border: 1px solid; border-color: #ddd #999 #999 #ddd; } "
+".sliderText { background-color: #bbb; color: #333; padding: 3px 1px 0 0; width: 30px; text-align: right; font-size: 11px;	line-height: 10px; font-family: verdana, arial, helvetica, sans-serif; font-weight: bold; border: 0; cursor: default; } "
+"--></STYLE> ";	
	return str;
}