// ==UserScript==
// @name          Google Reader Filter Per Feed/Folder
// @namespace     http://pyroprints.com
// @include       http*://*.google.*/reader*
// @grant       	GM_getValue
// @grant       	GM_setValue
// @require       //ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

/*
Done:
optimized filtering
fixed body/author regex filtering
mark filtered as read


Todo:
//Hello, Here i have some suggestions for your filter, Can i filter "All items" and "Home" by tags?For example, i filter "One Piece" in "Manga" tags, So When i read RSS in Manga Tags all feeds related to One Pece won't show, but when i view "Home" or "All items", it doesn't work, but i don't want to add filter words in "All items" because i just want filter One Piece feed only tagged with Manga, not other tags.
//add reverse filter to sub-menu
//add shortcuts
//extract starred items to Firefox Bookmark File
//mark filtered as read across multiple feeds

http://blog.martindoms.com/2009/08/15/using-the-google-reader-api-part-1/

*/
		
		//uncomment and refresh once to reset all the filters
		//GM_deleteValue("filterJSON_stringified");
		
		// a function that loads jQuery and calls a callback function when jQuery has finished loading
		function addJQuery(callback) {
		  var script = document.createElement("script");
		  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
		  script.addEventListener('load', function() {
		    var script = document.createElement("script");
		    script.textContent = "(" + callback.toString() + ")();";
		    document.body.appendChild(script);
		  }, false);
		  document.body.appendChild(script);
		}
		
		var $jq = null;
		
		// load jQuery and execute the main function
		addJQuery(content);
		
		String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g,"");}
    String.prototype.alphaOnly = function() {return this.replace(/[^A-Za-z]/g, "");}
    String.prototype.digitOnly = function() {return this.replace(/[^\d]/g, "")}
		
		
		//createCSSClass(".pyroButton .goog-button-base-inner-box","background-color:#D4EEFC;");
    createCSSClass(".qf", "display:inline; font-size:.8em; color:#C3D6F4; border:1px solid #C3D6F4; margin-left:5px; padding-top: 3px; cursor:pointer");
		createCSSClass(".word", "font-size:140%; color:#black !important; border:1px solid #E3E7F1; margin-right:5px; cursor:pointer");
		createCSSClass(".selectedWord", "background-color: yellow;");
		createCSSClass("td.export", "color: #AAA;");
		createCSSClass(".hideBySource", "display: none;");
		createCSSClass("#show-all-star", "padding-left:37px;");
		createCSSClass(".starFilterControl", "cursor: pointer;");
		createCSSClass(".starFilterWrapper", "padding-left:20px; ");
		createCSSClass(".starFilterWrapper.selected", "border-left: 3px solid #DD4B39;");
		createCSSClass(".clickable", "color:#4A8DFB; cursor: pointer; text-decoration:underline;");
		createCSSClass(".starFilterToggle", "display:inline; margin-left:5px; ");
		createCSSClass("#lhn-selectors .selector a", "display:inline !important;");
		createCSSClass("#id_filterToggle", "margin-left: 0 !important;");
		createCSSClass(".smallButton", "padding-left: 7px !important; padding-right: 7px !important; min-width:0 !important; margin-left: 0 !important; border-bottom-left-radius:0; border-top-left-radius:0;");
		createCSSClass(".starFavIcon", "height:16px; width:16px; display:inline-block; opacity:1; margin-right:2px");
		createCSSClass(".suppresedFilterItem", "border-left: 1px solid red !important;");
		createCSSClass(".reverseFilterFalse","color: green;");
		createCSSClass(".reverseFilterTrue","color: red;");
				
		function createCSSClass(selector, style)
		{
		 // using information found at: http://www.quirksmode.org/dom/w3c_css.html
		 // doesn't work in older versions of Opera (< 9) due to lack of styleSheets support
		 if(!document.styleSheets) return;
		 if(document.getElementsByTagName("head").length == 0) return;
		 var stylesheet;
		 var mediaType;
		 if(document.styleSheets.length > 0)
		 {
		  for(i = 0; i<document.styleSheets.length; i++)
		  {
		   if(document.styleSheets[i].disabled) continue;
		   var media = document.styleSheets[i].media;
		   mediaType = typeof media;
		   // IE
		   if(mediaType == "string")
		   {
		    if(media == "" || media.indexOf("screen") != -1)
		    {
		     styleSheet = document.styleSheets[i];
		    }
		   }
		   else if(mediaType == "object")
		   {
		    if(media.mediaText == "" || media.mediaText.indexOf("screen") != -1)
		    {
		     styleSheet = document.styleSheets[i];
		    }
		   }
		   // stylesheet found, so break out of loop
		   if(typeof styleSheet != "undefined") break;
		  }
		 }
		 // if no style sheet is found
		 if(typeof styleSheet == "undefined")
		 {
		  // create a new style sheet
		  var styleSheetElement = document.createElement("style");
		  styleSheetElement.type = "text/css";
		  // add to <head>
		  document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
		  // select it
		  for(i = 0; i<document.styleSheets.length; i++)
		  {
		   if(document.styleSheets[i].disabled) continue;
		   styleSheet = document.styleSheets[i];
		  }
		  // get media type
		  var media = styleSheet.media;
		  mediaType = typeof media;
		 }
		 // IE
		 if(mediaType == "string")
		 {
		  for(i = 0;i<styleSheet.rules.length;i++)
		  {
		   // if there is an existing rule set up, replace it
		   if(styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase())
		   {
		    styleSheet.rules[i].style.cssText = style;
		    return;
		   }
		  }
		  // or add a new rule
		  styleSheet.addRule(selector,style);
		 }
		 else if(mediaType == "object")
		 {
		  for(i = 0;i<styleSheet.cssRules.length;i++)
		  {
		   	// if there is an existing rule set up, replace it
	      var sel = styleSheet.cssRules[i].selectorText;
			  if(sel==null)
			    sel = "";
		   if(sel.toLowerCase() == selector.toLowerCase())
		   {
		    styleSheet.cssRules[i].style.cssText = style;
		    return;
		   }
		  }
		  // or insert new rule
		  styleSheet.insertRule(selector + "{" + style + "}", styleSheet.cssRules.length);
		 }
		}
    
    function content()
		{
			
			$jq = jQuery.noConflict(true);
			if(typeof $jq == "undefined")
				return;
			
			letsJQuery();
			
			// All your GM code must be inside this function
	    function letsJQuery() 
	    {
	    	//replace GM_set/getValue with local storage options; fixes the issues in FF4 and chrome;
				//courtesy of: http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
	    	//browser sniffing, ugh, i wish i didn't have to do this =c/
	    	var isFirefox = navigator.userAgent.indexOf("Firefox");	
	    	var isUnder4 = $jq.browser.version.substr(0,3)=="1.9";

	    	var useLocal = !(isFirefox && isUnder4);
	    	if (useLocal) {
				
			    GM_getValue=function (key,def) {
			        return localStorage[key] || def;
			    };
			
			    GM_setValue=function (key,value) {
			        return localStorage[key]=value;
			    };
				}

				$jq.expr[':'].textEquals = function(a, i, m) {
					
					var txt = $jq(a).text().replace(/[()\?]/g,"");
					searchTxt = m[3];
					var match = txt.match("^" + searchTxt + "$");
					
					//debug("---")
					//debug(txt);
					//debug(m[3]);
					
					return !!match;
				};

				if(GM_getValue("pinned_pause")==null) GM_setValue("pinned_pause","true");
				if(GM_getValue("pinned_sort")==null) GM_setValue("pinned_sort","false");
				if(GM_getValue("pinned_reverse")==null) GM_setValue("pinned_reverse","false");
				if(GM_getValue("pinned_markRead")==null) GM_setValue("pinned_markRead","false");
				
	    	$jq("#sub-tree-item-0-main ul > li").click(clearFilter);
	    	
	    	//clear star filter if refreshing or changing list view (by keys or button)
	    	
	    	$jq("#chrome-view-links, .jk-button[title='Refresh']").click(clearStarFilter);
	    	$jq("body").keydown(function(e){var k=e.keyCode; if(k==49 || k==50 || k==82) clearStarFilter()});
	    	

				var filterJSON = getStoredJSON("filterJSON_stringified");
				var filterJSON_reverseFlag = getStoredJSON("filterJSON_reverseFlag");
				var filterToggleStatus = getStoredJSON("filterJSON_toggleStatus");
				
				//star filter
				var starTxt = {"false":"&#9733; filter off","true":"&#9733; filter on"};
				var starFilterEnabled = getStarFilter();
				var starFilterControl = $jq("<div class='starFilterToggle clickable'>"+starTxt[starFilterEnabled+""]+"</div>")
																	.click(toggleStar)
																	.data("starTxt",starTxt)
																	.data("starFilterEnabled",starFilterEnabled);
																	
				$jq("#star-selector").append(starFilterControl);
				////
					
				window.filterJSON=filterJSON;
				window.filterJSON_reverseFlag=filterJSON_reverseFlag;
				window.filterToggleStatus=filterToggleStatus;

				window.setInterval(checkFilter,250);
			}
			
			function getStoredJSON(key)
			{
				var filterJSON = GM_getValue(key);
				
				if(filterJSON==null)
				{
					filterJSON = new Object();
					gm_save(key,JSON.stringify(filterJSON));
				}
				else
					filterJSON = JSON.parse(filterJSON);
				
				return filterJSON;	
			}
			
			function getStarFilter()
			{
				var val = GM_getValue("starFilterEnabled");	
				return val=="true";
			}
			
			function toggleStar()
			{
				var $this = $jq(this);
				var starFilterEnabled = $this.data("starFilterEnabled");
				var starTxt = $this.data("starTxt");
				starFilterEnabled = !starFilterEnabled;
				
				GM_setValue("starFilterEnabled", starFilterEnabled);
				$this.html(starTxt[starFilterEnabled+""]).data("starFilterEnabled",starFilterEnabled);
				
				if(starFilterEnabled)
					$jq("#star-filter").show();
				else	
					$jq("#star-filter").hide();
			}
			
			function clearStarFilter()
			{
				$jq("#star-filter").empty();
			};
						
			function clearFilter()
			{
				var $this = $jq("#chrome-title").removeClass("filterApplied");
				$jq("#id_allFilterDiv, #quickSourceFilterDiv").remove();			
			}
			
			function resetFilter()
			{
				$jq("#id_filterControl, #id_filterToggle, #id_pauseButton, #id_sortEntries, .loadAllItems, .removeOnReload").remove();
			}
			
			
			function checkFilter()
			{
				/*
				try
				{
					var $this = $jq("#chrome-title");
					if(!$this.hasClass("filterApplied"))
						activateFilter();
				}catch(err){}
				*/
				
				var $this = $jq("#chrome-title");
				if($this.hasClass("filterApplied"))
				{
					var buttonName=$jq("#id_filterToggle").attr("name");
					if(getGroupName() != buttonName)
						clearFilter();	
				}
				else
					activateFilter();
				
				var starFilterEnabled = getStarFilter();
				var isStar = $jq("#chrome-title").html()=="Your starred items";
				if(isStar && starFilterEnabled)
				{
					addQuickSourceFilter();
					var currentStarFilter = $jq(".starFilterWrapper.selected .starFilterControl");
					hideBySource(null,currentStarFilter);
				}
				
				if(!isStar)
					$jq("#star-filter").empty().show();
				
			}
			/*
			function processSpace(e)
			{
					var $this = $jq("#chrome-title");
					if($this.hasClass("filterApplied"))
					{
						if(getGroupName() == $jq("#id_filterToggle").data("name"))
							window.setTimeout(processSpace,250);
						else
							clearFilter();	
					}
			}
			*/
			function activateFilter() //set up a filter for a specific feed or folder
			{
				try
				{
					resetFilter();
		
					if($jq("#no-entries-msg").length >= 1 || $jq(".entry").length==0)
						return;
		    	
		    	var moreOptions = $jq('<div id="moreToggleFilterOptionsDropDownControl" class="removeOnReload pyroButton goog-button goog-inline-block goog-flat-menu-button goog-flat-menu-button-collapse-left goog-button-float-left" title="More Actions" role="button" style="-moz-user-select: none;" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-activedescendant=""><div class="goog-inline-block goog-flat-menu-button-caption"></div><div class="goog-inline-block goog-flat-menu-button-dropdown">&nbsp;</div></div>');
		    	var moreOptions_list = $jq('<div id="toggleFilter_submenu" class="removeOnReload goog-menu goog-menu-vertical" style="-moz-user-select: none; visibility: visible; display:none;" role="menu" aria-haspopup="true" aria-activedescendant=""></div>').appendTo("body");
		    	
		    	$jq("body").click(function(e)
		    	{
		    		if(e.type=="click" && moreOptions_list.is(":visible"))
		    			moreOptions_list.hide();
		    	});
		    	
		    	moreOptions
		    	.click(function(){
		    		var dropControl = $jq("#id_pauseButton");
						var offset = dropControl.offset();
						offset.top += dropControl.height()+2;
						
						moreOptions_list.toggle().offset(offset);
						return false;
		    		});
		    	
		    	/***************add controls***********************/
		    	var smallButton = $jq("<span></span>");
		    	
		    	////////PAUSE
					var title = "Items that would be hidden, are shown.";
					var pauseFunc = function(){$jq("#id_pauseButtonOriginal").click();};
					var pauseButton =  getSmallButton("id_pauseButton","||").click(pauseFunc).appendTo(smallButton).attr("title",title);
					var pinPause = getPin("pause",pauseButton);
		    	var pauseFilter = $jq(getMenuItem("id_pauseFilterMenu", "<span class='txt'>Pause Filter</span> (<span id='hiddenCounter'></span>)", title,pinPause))
		    											.addClass("removeOnReload")
															.click(pauseFunc)
															.appendTo(moreOptions_list);
		    	
		    	///////SORT
		    	title = "Sort on-screen entries (works best in list view, j/k navigation is disrupted)";
		    	var sortButton = getSmallButton("id_sortButton","A-Z <span class='arr'>&darr;</span>").data("desc",true).click(sortEntries).appendTo(smallButton).attr("title",title);
		    	var pinSort = getPin("sort",sortButton);
		    	var sortMenu = $jq(getMenuItem("id_sortEntries", "Sort A-Z <span class='arr'>&darr;</span>", title,pinSort))
		    											.addClass("removeOnReload")
															.data("desc",true)
															.click(sortEntries)
															.appendTo(moreOptions_list);
		    	
		    	///////MARK READ
		    	var title = "Mark Filtered Items as Read. Uses GoogleReaderAPI as opposed to the visual item, as such this may cause slight inconsistencies.";
		    	var markReadButton = getSmallButton("id_markReadButton","MFR &empty;").click(markFilteredAsRead).appendTo(smallButton).attr("title",title);
		    	var pinMarkRead = getPin("markRead",markReadButton);
		    	var markReadMenu = $jq(getMenuItem("id_markReadEntries", "Mark Filtered as Read", title,pinMarkRead))
		    											.addClass("removeOnReload")
															.click(markFilteredAsRead)
															.appendTo(moreOptions_list);
		    	
		    	
		    	//////REVERSE
		    	title = "Items that would be hidden, are shown, and vice versa.";
		    	var reverseFunc = function(){$jq("#id_reverseFilterOriginal").click();};
		    	var reverseButton = getSmallButton("id_reverseButton","Rev <span class='state'>&ne;</span>").click(reverseFunc).appendTo(smallButton).attr("title",title);
		    	var pinReverse = getPin("reverse",reverseButton);
		    	var reverseFilter = $jq(getMenuItem("id_reverseFilterMenu", "Reverse Filter <span class='state'>&ne;</span>", title,pinReverse))
		    											.addClass("removeOnReload")
															.click(reverseFunc)
															.appendTo(moreOptions_list);
					
					
		    	
		    	//////////////////////////////////////////////////////////////////////////////////
		    	
		    	
		    	addLoadAllItemControls(moreOptions_list);
		    	
		    	var gName = getGroupName();
		    	var filterControls = getFilterControls();
					var vh = $jq("#viewer-header-container").append(filterControls);	
		
					var toggleFilter = $jq(getButton("id_filterToggle", "Toggle Filter", gName))
															.addClass("goog-flat-menu-button-collapse-right goog-flat-menu-button-collapse-left removeOnReload")
															.removeClass("goog-button")
															.attr("name",gName)
															.click(toggleFilterFunc);
					
					toggleFilter = smallButton.add(toggleFilter).add(moreOptions);
					
					var hoverIn = function(){$jq(this).addClass("goog-flat-menu-button-hover")};
					var hoverOut = function(){$jq(this).removeClass("goog-flat-menu-button-hover")};
					pauseButton.hover(hoverIn,hoverOut);
					moreOptions.hover(hoverIn,hoverOut);
					
					$jq("#viewer-top-controls").append(toggleFilter);
					
					var starFilter = $jq("#star-filter");
					if(starFilter.length==0)
						$jq("<div id='star-filter'></div>").insertAfter($jq("#star-selector"));
					
					runFiltering();
					
				}catch(err){}
			}
			
			function getSmallButton(id,html)
			{
				return $jq('<div class="smallButton removeOnReload pyroButton goog-inline-block goog-flat-menu-button goog-flat-menu-button-collapse-right goog-flat-menu-button-collapse-left goog-button-float-left" role="button" style="-moz-user-select: none;" tabindex="0" aria-haspopup="true" aria-activedescendant=""><div class="goog-inline-block goog-flat-menu-button-caption"></div><div class="goog-inline-block txt">'+html+'</div></div>')
				.attr("id",id);	
			}
			
			var grnPin = "//maps.google.com/mapfiles/ms/micons/grn-pushpin.png";
			var redPin = "//maps.google.com/mapfiles/ms/micons/red-pushpin.png";
			function getPin(code, button)
			{
				var pinned = GM_getValue("pinned_"+code) == "true";
				debug(code, pinned);
				button.toggle(pinned);
				var pin = pinned?grnPin:redPin;
				
				return $jq("<img src='"+pin+"'>").css("margin-right","3px").width("15px").data("button",button).data("code",code).click(pinSmallButton);
			}
			
			function pinSmallButton()
			{
				var $this = $jq(this);
				var button = $this.data("button",button);
				var code =  $this.data("code");
				var pinned = !(GM_getValue("pinned_"+code) == "true");
				var pin = pinned?grnPin:redPin;
				
				debug("pinned",pinned);
				button.toggle(pinned);
				$this.attr("src",pin);
				gm_save("pinned_"+code,pinned+"");
				
				debug("pinned_"+code,GM_getValue("pinned_"+code));
				
				return false;	
			}
			
			
			function markFilteredAsRead()
			{
				var filterStrings = isNull($jq("#id_filterControl").val(),"").split("\n");
				var filterStringsObject = prepFilterStrings(filterStrings);
				var reverseFilterFlag = $jq("#id_reverseFilterOriginal").prop("checked");	
				
				var markReadCallback = function(data, textStatus, jqXHR)
				{
					var useAsHTMLParser = $jq("<div></div>");
					for(var keyVar=0; keyVar<data.items.length; keyVar++)
					{
						var thisItem = data.items[keyVar];
						
						var itemPayload = {};
						itemPayload.entryTitleContent = useAsHTMLParser.html(isNull(thisItem.title,"")).text();
						itemPayload.entryAuthor = useAsHTMLParser.html(isNull(thisItem.author,"")).text();
						if(thisItem.summary)
							itemPayload.itemBody = useAsHTMLParser.html(isNull(thisItem.summary.content,"")).text();
						else
							itemPayload.itemBody = "";
						
					
						var found = checkItemAgainstFilter(itemPayload,filterStringsObject);
						
						if(reverseFilterFlag)
							found = !found;
					
						if(found)
						{
							debug("marking as read: "+itemPayload.entryTitleContent);
							markAsRead(thisItem);
						}
					}
					
					setTimeout(simulateRefresh,500);
				}
				
				var href = $jq("li.tree-selected a").attr("href");
				var feedPrefix = "/reader/view/";
				if(href.indexOf(feedPrefix)==0)
				    var href = href.substring(feedPrefix.length);
				
				addMessage("Marking Filtered as Read...");
				$jq.ajax({
						"url":"//www.google.com/reader/api/0/stream/contents/"+href,
						"data":{
						    "ot":(new Date("January 1, 2000 00:00:00")).getTime()/1000,
						    "r":"n",
						    "xt":"user/"+_USER_ID+"/state/com.google/read",
						    "n":5000,
						    "ck":(new Date()).getTime(),
						    "client":"googleReaderFilter"
						},
						"type": "GET",
						"success":markReadCallback,
						"dataType":"json"
					});
			}
			
			function markAsRead(item)
			{
				var d = {
			    "a":"user/"+_USER_ID+"/state/com.google/read",
			    "async":"true",
			    "s":item.origin.streamId, //"feed/http://feeds.feedburner.com/AskMetafilter/",
			    "i":item.id,
			    "T":_COMMAND_TOKEN
				};
			
				$jq.ajax({
					"url":"http://www.google.com/reader/api/0/edit-tag?client=googleReaderFilter",
					"data":d,
					"type": "POST",
					"success":function(data, textStatus, jqXHR){debug(data.items);},
					"dataType":"json"
				});
			}
			
			function addMessage(txt)
			{
				$jq("#loading-area-container").removeClass("hidden");				
				$jq("#loading-area").html(txt);
			}
			
			function hideMessage()
			{
				$jq("#loading-area-container").addClass("hidden");
			}
			
			//window.refreshVar = setTimeout(simulateRefresh,500);
		 function triggerMouseEvent (node, eventType) 
		 {
			    var clickEvent = document.createEvent('MouseEvents');
			    clickEvent.initEvent (eventType, true, true);
			    node.dispatchEvent (clickEvent);
			}
			

			//http://stackoverflow.com/questions/12761785/triggering-google-readers-refresh-in-chrome-works-in-firefox
			//Big Thanks To Brock Admas @ stackoverflow for this code. 
			//http://stackoverflow.com/users/331508/brock-adams
			function simulateRefresh()
			{
				debug("Refreshing...");
				var refreshBtn = $jq('#viewer-refresh').get(0);

				//--- Click by itself does not work!
				triggerMouseEvent (refreshBtn, 'mouseover');
				triggerMouseEvent (refreshBtn, 'mousedown');
				triggerMouseEvent (refreshBtn, 'mouseup');
				$jq("#sub-tree-header").click();
				$jq(document.activeElement).blur();
			}
			
			var currentStarFilter = "";
			function hideBySource(e,optObject)//runs continuously hiding by source
			{
				//console.count("x");
				var $this = $jq(optObject || this);
				
				$jq(".starFilterWrapper.selected").removeClass("selected selector");
				$this.parent(".starFilterWrapper").addClass("selected selector");
				var len = $this.length;
				var clear = $this.data("clear");
				var current = $this.data("current");
				
				if(len==0)
					return;
				
				if(!current)
				{
					$jq(".counter").html("0");
					simulateRefresh();
					$this.data("current",true);
				}
				
				if(clear)
					return;
				
				var sourceTitle = $this.attr("title");
				var expandedView = $jq(".jfk-button[title='Expanded view']").attr("aria-pressed")=="true";
				
				//debug(sourceTitle);
				//debug("div.entry:not(.hideBySource) .entry-source-title:not(:textEquals('"+sourceTitle.replace(/[()\?]/g,"")+"'))");
				
				var hid = $jq("div.entry:not(.hideBySource) .entry-source-title:not(:textEquals('"+sourceTitle.replace(/[()\?]/g,"")+"'))").parents("div.entry").remove();//;.addClass("hideBySource");
				
				//if(hid.length>0)
					//debug(hid.length+":"+sourceTitle);
			}
			
			var scrollingInterval = 0;
			var loadAll = function()
			{
				if($jq("#id_spacerForScrolling").length==0)
				{
					var paddingObj = $jq("<table width='100%' id='id_spacerForScrolling'><tr><td valign='bottom' align='center' class='clickable'>Loading More Items (click to cancel) ...<tr><td id='cancelScrolling' height='1px' valign='bottom' align='center'></table>")
																.show().height("1000px").click(function(){$jq("#id_loadAllItems_cancel").click()});
					$jq("#scroll-filler").after(paddingObj);
				}
				
				if($jq("#scroll-filler:visible").length==1)
				{
					$jq("#id_spacerForScrolling").remove();
					return;
				}
				
				$jq("#viewer-entries-container").animate({ scrollTop: 1000000 }, 100);	
			}

			function addLoadAllItemControls(moreOptions_list)
			{	
				var paddingObj = $jq("#id_spacerForScrolling");
				if($jq("#id_loadAllItems").length==0)
				{
					var loadAllFunc = function(){
								scrollingInterval = setInterval(loadAll,1000);
								paddingObj.show(); 
								cancelLoad.show();
								loadAllItems.hide();
						};

					var cancelLoadingFunc = function(){
							clearInterval(scrollingInterval);
							$jq("#id_spacerForScrolling").hide();
							$jq('#viewer-entries-container').scrollTop(0);
							loadAllItems.show();
							cancelLoad.hide();
						};
					
					var loadAllItems = $jq(getMenuItem("id_loadAllItems", "Load All Items ...", "Load all items if possible.")).click(loadAllFunc).addClass("loadAllItems");
					var cancelLoad = $jq(getMenuItem("id_loadAllItems_cancel", "Cancel Scrolling ...", "Cancel Scrolling.")).click(cancelLoadingFunc).hide().addClass("loadAllItems");
					
					moreOptions_list.append(loadAllItems).append(cancelLoad);
					
				}
			}
			
			var quickSourceFilterStorage={};
			function addQuickSourceFilter()
			{
				var expandedView = $jq(".jfk-button[title='Expanded view']").attr("aria-pressed")=="true";
				var starSelector = $jq("#star-filter");
				var sources = $jq((expandedView? "a" : "span")+".entry-source-title:not('.sourceFilterProcessed')");	
				sources.addClass("sourceFilterProcessed");
				var len = sources.length;
				
				if(len>0)
				{
					debug(sources);
					
					if($jq("#show-all-star").length==0)
						$jq("<DIV id='show-all-star'>Show All</DIV>").addClass("starFilterControl").click(hideBySource).data("current",false).data("clear",true).appendTo(starSelector).wrap("<div></div>");
					
					var nameCache = {};
					
					sources.each(function(){
							var item = $jq(this);
							var name = item.html();
							if(nameCache[name])
								nameCache[name].count++;
							else
								
								nameCache[name]	= {"count":1,"href":item.prev("a").attr("href")};
						});
						
						
					for(var keyVar in nameCache)
					{
						var title = prepTitle(keyVar);
						var thisControl = $jq(".starFilterControl[title='"+title.replace(/\'/g,"\\'")+"']");
						
						//debug(keyVar+":"+title);
						
						if(thisControl.length==0)
						{
							thisControl = $jq("<span> </span>")
																.text(title)
																.append( " (<span class='counter'>0</span>)")
																.data("current",false)
																.click(hideBySource)
																.attr("title",title)
																.addClass("starFilterControl")
																.appendTo(starSelector)
																.wrap("<div class='starFilterWrapper'></div>");
							var domain = nameCache[keyVar].href.replace("http:\/\/","").replace("https:\/\/","");
							domain = domain.substring(0,domain.indexOf("/"));
							
							var favIcon = '<div class="icon favicon starFavIcon" style="background-image: url(//s2.googleusercontent.com/s2/favicons?domain='+domain+'&amp;alt=feed);"></div>';
							thisControl.before(favIcon);
						}
						
						var counter = thisControl.find("span.counter");
						var currentCount = parseInt(counter.html(),10);
						debug(title,currentCount,nameCache[keyVar].count);
						counter.html(currentCount+nameCache[keyVar].count);
					}
					//debug(nameCache)
				}
				
				
				//$jq("#quickSourceDropdown").html(getSourceDropdown());
			}
			
			function prepTitle(str)
			{
				return str
					//.replace(/\?/g,"&#63;")
					//.replace(/'/g,"&apos;");
					.replace(/&amp;/g,"&");
					//.replace(/\(/g,"&#40;")
					//.replace(/\)/g,"&#41;");	
			}
	
			function getButton(id, value,title)
			{
				return '<div id="'+id+'" title="'+title+'" class="pyroButton goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" tabindex="0" role="wairole:button"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-content"><div class="goog-button-body">'+value+'</div><div class="goog-menu-button-dropdown"></div></div></div></div></div></div>';
			}
			
			function getMenuItem(id, value,title,pin)
			{
				var item = $jq('<div id="'+id+'" title="'+title+'" class="goog-menuitem" role="menuitem" style="-moz-user-select: none;"><div class="goog-menuitem-content">'+value+'</div></div>');
				item.find(".goog-menuitem-content").prepend(pin);
				return item;
			}
		
			function toggleReverseFlag()
			{
				var filterToggleStatus = window.filterJSON_reverseFlag;
				var groupName = getGroupName();
				var reverseFilterFlag = $jq("#id_reverseFilterOriginal").prop("checked");	
				filterToggleStatus[groupName] = reverseFilterFlag;
				
				gm_save("filterJSON_reverseFlag", JSON.stringify(filterToggleStatus));
				
				var entryList = $jq("#entries");
				var uncheckedEntries = $jq(".entry",entryList).removeClass("checked");
				
					
		    var reverseFilterMenu = $jq("#id_reverseFilterMenu,#id_reverseButton");
				reverseFilterMenu.find(".state").toggleClass("reverseFilterTrue",reverseFilterFlag).toggleClass("reverseFilterFalse",!reverseFilterFlag);
				
			}
			
			function toggleFilterFunc()
			{
				var filter = $jq("#id_allFilterDiv").toggle();
				
				var filterToggleStatus = window.filterToggleStatus;//$jq(window).data("filterToggleStatus");
				var groupName = getGroupName();
				filterToggleStatus[groupName] = filter.is(":visible");
				
				$jq(".quickestFilterP").toggle(filterToggleStatus[groupName]);
				
				gm_save("filterJSON_toggleStatus", JSON.stringify(filterToggleStatus));
			}
			
			function supressFilterFunc()
			{
				var filterControl = $jq("#id_filterControl").toggleClass("supress");
				var supress = filterControl.hasClass("supress");
				
				$jq(this).add($jq("#id_pauseFilterMenu")).find(".txt").html(supress?"Resume Filtering":"Temporarily Stop Filtering");
				
				
				var entryList = $jq("#entries");
				var uncheckedEntries = $jq(".entry",entryList).removeClass("checked suppresedFilterItem");
				$jq(".quickFilterControl, .quickestFilterP").remove();
				
				//other buttons
				
				$jq("#id_pauseButton").find(".txt").html(supress? "&#x25BA;" : "||" );
				
			}
			
			
			function runFiltering()
			{
				//console.count("runFiltering");
				var gName=getGroupName();
				var filterName = $jq("#id_filterControl").attr("groupName");
				if(filterName!=gName)//if the filter didn't load yet
					return;
				
				var entryList = $jq("#entries");
				var uncheckedEntries=$jq([]);
			
				var starFilterEnabled = getStarFilter();
				if($jq("#chrome-title").html()=="Your starred items" && starFilterEnabled)
						addQuickSourceFilter();

				/*
				addQuickSourceFilterValues();
				
				var quickSourceFilter = $jq("#quickSourceFilter").val();
				
				if(quickSourceFilter!=null && quickSourceFilter!="--" && !quickSourceFilter=="")
				{
					uncheckedEntries = $jq(".entry:not(.sourceChecked)",entryList);
					
					uncheckedEntries.each(function(e){
							//console.count("filter source");
							var $this = $jq(this);
							var thisSource = $this.find(".entry-source-title:visible");
							
							if(thisSource.text()!=quickSourceFilter)
								$this.addClass("hideBySource");
							
							$this.addClass("sourceChecked");	
					});
				}
				*/
				uncheckedEntries = $jq(".entry:not(.checked)",entryList);
				var filterStrings = new Array();
				
				if(uncheckedEntries.length>0)
					filterStrings = isNull($jq("#id_filterControl").val(),"").split("\n");
				
				var filterStringsObject = prepFilterStrings(filterStrings);
				
				var supressed = $jq("#id_filterControl").is(".supress");
				var reverseFilterFlag = $jq("#id_reverseFilterOriginal").prop("checked");	
				
				var listView = $jq("#stream-view-options-container .jfk-button-checked img").attr("src").indexOf("view_options_list.png")>-1;
				var showQuickestFilter = $jq("#id_filterControl:visible").length>0;
				
				var selectWord = function(){$jq(this).toggleClass("selectedWord"); return false;}
				
				uncheckedEntries.each(function(e){
						
						var $this = $jq(this);
						
						$this.find(".quickFilterControl").remove();
						
						var quickFilter = $jq("<div class='quickFilterControl'>QF</div>").addClass("qf").click(quickFilterFunc);
						var quickestFilter = $jq("<div class='quickFilterControl'>Q²F</div>").addClass("qf").click(quickestFilterFunc);
						
						var entryTitleLink = $this.find(".entry-title-link");
						var entryTitle = $this.find(".entry-title");
						var entryAuthor = $this.find(".entry-author");
						var entryBody = $this.find(".entry-body");
						
						var itemBody = "";
						if(entryBody.length>0)
							itemBody = $this.find(".item-body").text();
						else	
							itemBody = $this.find(".snippet").text();
							
						var entryTitleContent = "";
						if(entryTitle.length==0 || entryTitleLink.length==0)
							entryTitleContent = entryTitle.text();
						else	
							entryTitleContent = (entryTitleLink.clone()).find("*").remove().end().text();
						
						if(entryTitleContent.length==0)
							return;
						//console.debug(entryTitleContent,$this);
						
						var OK = $jq("<input type='button' value='Apply Quick Filter'>").click(addQuickestFilter);
						var q2Divs = $jq("<p/>").addClass("quickestFilterP").dblclick(addQuickestFilter); 
						if(!showQuickestFilter)
							q2Divs.hide();
						
						var words = entryTitleContent.split(" ");
						for(var keyVar in words)
							if(words[keyVar].length>0)
								$jq("<span/>").addClass("word").click(selectWord).append(words[keyVar]).appendTo(q2Divs);

						q2Divs.append("<br>Select words you want to filter by and then click ",OK);


						OK.data("words",q2Divs);
						q2Divs.data("words",q2Divs);
						entryBody.before(q2Divs);
							
						entryTitle
							.append(quickFilter.attr("entryTitleContent",entryTitleContent))
							.append(listView?"":quickestFilter);
						
						quickestFilter.data("q2Divs",q2Divs);

						
						var itemPayload = {};
						itemPayload.entryTitleContent = entryTitleContent;
						itemPayload.itemBody = itemBody;
						itemPayload.entryAuthor = entryAuthor.text();
						
						var found = checkItemAgainstFilter(itemPayload,filterStringsObject);
						
						if(reverseFilterFlag)// && !supressed)
							found = !found;
						
						if(found)
						{
							if(supressed)
								$jq(this).addClass("suppresedFilterItem").show();
							else	
								$jq(this).hide();
						}
						else
							$jq(this).not(".hideBySource").show().removeClass("suppresedFilterItem");
						
						$this.addClass("checked");
					});
				if(uncheckedEntries.length>0)
					$jq("#hiddenCounter,#hiddenCounterMenu").html( $jq(".entry.checked:not(:visible)").length+"/"+$jq(".entry.checked").length );
				

				window.setTimeout(runFiltering,750);
			}
			
			function prepFilterStrings(filterStrings)
			{
				var filterStringsObject = {};
				for(var keyVar in filterStrings)
				{
					var thisString = filterStrings[keyVar];
					var thisObject = filterStringsObject[keyVar] = {};
					thisObject.originalString = thisString;
					thisObject.actualString = thisString;
					
					thisObject.textToSearch = "entryTitleContent";
					
					var isBody = thisString.indexOf("body(")==0 && thisString[thisString.length-1]==")";
					var isAuthor = thisString.indexOf("author(")==0 && thisString[thisString.length-1]==")";
					
					if(isBody)
					{
						thisObject.actualString = thisString.substr(5,thisString.length-6);
						thisObject.textToSearch = "itemBody";
					}
					
					if(isAuthor)
					{
						thisObject.actualString = thisString.substr(7,thisString.length-8);
						thisObject.textToSearch = "entryAuthor";
					}
				
					var len = thisObject.actualString.length;
					thisObject.isRegex = thisObject.actualString[0]=="/" && (thisObject.actualString[len-1]=="/"  || thisObject.actualString[len-2]+thisObject.actualString[len-1]=="/i");
					
					if(!thisObject.isRegex)
						thisObject.actualString = thisObject.actualString.toLowerCase().trim();
				}
				
				return filterStringsObject;
			}
			
			function checkItemAgainstFilter(itemPayload,filterStringsObject)
			{
				for(var keyVar in filterStringsObject)
				{
					var thisObject = filterStringsObject[keyVar];
					var thisString = thisObject.actualString;
					var textToSearch = itemPayload[thisObject.textToSearch];
					
					if(thisString.length==0)
						continue;
					
					if(thisObject.isRegex)
					{
						if(eval("textToSearch.search("+thisString+")") > -1)
						{
							debug("regex match", textToSearch,"|",thisString);
							return true;
						}
					}
					else
					{
						if(textToSearch.toLowerCase().indexOf(thisString) > -1)
						{
							debug("standard match", textToSearch,"|",thisString);
							return true;
						}
					}
				}//for	
				
				return false;
			}
			
			
			function quickFilterFunc()
			{
				var $this=$jq(this);
				var content = $this.attr("entryTitleContent");
				
				var newFilter = prompt("Quick Filter Add",content);
				
				if(newFilter==null)
					return false;
				
				var filterControl = $jq("#id_filterControl")
				filterControl.val(filterControl.val()+"\n"+newFilter).trigger("change");
					
				return false;
			}
			
			function quickestFilterFunc()
			{
				$jq(this).data("q2Divs").toggle();
			}
			
			function addQuickestFilter()
			{
				var newFilter = "";
				var $this=$jq(this);
				var words = $this.data("words");
				words.find(".selectedWord").each(function(){newFilter+=$jq(this).text()+" ";});
				
				if(newFilter.length>0)
				{
					var filterControl = $jq("#id_filterControl")
					filterControl.val(filterControl.val()+"\n"+newFilter).trigger("change");
				}	
				
				return false;
			}
			
			function getFilterControls()
			{
					$jq("#chrome-title").addClass("filterApplied");
					var gName = getGroupName();
				
					var allControls = $jq("<div id='id_allFilterDiv'></div>").hide();
					var c = $jq("<textarea id='id_filterControl' rows=5 style='width:98%;background-color:#FFC;'></textarea>")
										.attr("groupName", gName)
										.change(saveData)
										.dblclick(saveData)
										.appendTo(allControls);
	
					var filterJSON = window.filterJSON;
					var filterToggleStatus = window.filterToggleStatus;
					var filterReverseStatus = window.filterJSON_reverseFlag;
					
					var savedValues = "";
					if(filterJSON)
						savedValues = filterJSON[gName];
					
					var toggled = isNull(filterToggleStatus[gName],false);
					var reversed = isNull(filterReverseStatus[gName],false);
					
					
					var supressFilter = $jq(getButton("id_pauseButtonOriginal", "<span class='txt'>Temporarily Stop Filtering</span> (<span id='hiddenCounter'></span>)","Disable the current filter until you re-enabled it or switch feeds/folders.")).click(supressFilterFunc);
					
					var backupFunc = function(){
											var allItems = GM_getValue("filterJSON_stringified");
											//alert(allItems);
											
											var backupWindow = window.open();
											backupWindow.document.write(allItems);
											backupWindow.document.close();
										};
				
					var restoreFunc = function(){
											var allItems = prompt("Enter the JSON-formatted backup data, click OK, and then refresh. Caution: this will RESET all your data to this backup!");
											if(allItems!=null)
											{
												try
												{
													var parsedBackup = JSON.parse(allItems);
													var restoreStatus = "";
													
													for(var keyVar in parsedBackup)
													{
														var thisItem = parsedBackup[keyVar];
														if(thisItem!=null)
															restoreStatus += keyVar+": "+thisItem.split("\n").length+" items\n";
													}
												}
												catch(err)
												{
													alert("Improper data! Aborting restore!");
													return;
												}
												
												if(confirm("Does this look correct? Click OK to restore, cancel to abort.\n"+restoreStatus))
													GM_setValue("filterJSON_stringified",allItems);
											}
										};					
					
					var exportControl = $jq("<u><span class='link'>Backup Filter JSON</span></u>").click(backupFunc);
					var importControl = $jq("<u><span class='link'>Restore Filter JSON</span></u>").click(restoreFunc);
					//var importExportInput = $jq("<div id='importExportInput'></div>").hide(); 

					var tip = $jq("<span id='id_tip' style='color: #aaa;'></span>")
											.append("<p style='margin:0'>Tip: You can filter the body of the item by using <b>body(filter text)</b>, as well as only the author line by using <b>author(filter text)</b>. You can also use Regular Expressions if you use the <b>/regex filter/</b> format or <b>/case insensitive filter/i</b> format; this works with body()/author() as well. <a href='https://developer.mozilla.org/en/core_javascript_1.5_guide/regular_expressions' style='color:#aaa' target='_blank'>Learn More about Regular Expressions</a>");
											
					var options = $jq("<table><tr><td valign='top' class='supressFilter'>"+
																					"<td valign='top' class='tip'>"+
																					 "<tr><td class='export' colspan='2'>"+
																					 "<tr><td class='exportTextarea' colspan='2'>"+
																					 "</table>");
					allControls.append(options);
					var reverseFilter = $jq("<div><input type='checkbox' id='id_reverseFilterOriginal'/><label for='id_reverseFilterOriginal'>Reverse Filter</label></div>");
					reverseFilter.find("input").change(toggleReverseFlag).prop("checked",reversed);
					
					var reverseFilterMenu = $jq("#id_reverseFilterMenu,#id_reverseButton");
					reverseFilterMenu.find(".state").toggleClass("reverseFilterTrue",reversed).toggleClass("reverseFilterFalse",!reversed);
					
					options.find(".supressFilter").append(supressFilter,reverseFilter);
					options.find(".tip").append(tip);
					//TODO: finish backup code
					options.find(".export").append("Advanced users can also: ",exportControl," and ",importControl,". Please refresh after restore. Use with extreme caution!");
					//options.find(".exportTextarea").append(importExportInput);

					if(savedValues)
						c.val(savedValues);
						
					allControls.toggle(toggled);
					
					return allControls;
			}
			
			function saveData()
			{
				//debug("save data");
				var $this = $jq(this);
				var val = $this.val();
				
				var filterJSON = window.filterJSON;//$jq(window).data("filterJSON");
				
				var groupName1 = getGroupName();
				var groupName2 = $this.attr("groupName");
				
				if(groupName1!=groupName2)
				{
					//debug("didn't match, clearing filters");
					clearFilter();
					return;
				}
				
				filterJSON[groupName2] = val;
				
				gm_save("filterJSON_stringified", JSON.stringify(filterJSON));
				
				var entryList = $jq("#entries");
				var uncheckedEntries = $jq(".entry",entryList).removeClass("checked");
				$jq(".quickFilterControl, .quickestFilterP").remove();
			}
	
			function gm_save(key,val)
			{
				window.setTimeout(function() {GM_setValue(key,val);}, 10);	
			}
			
			function getGroupName()
			{
				var directLink = $jq("#chrome-title a").clone().find("*").remove().end().text().trim();	
				var multiFolder = $jq("#chrome-title").text().trim();	
				
				if(multiFolder.length>0)
					return multiFolder;
				else	
					return directLink;
			}
			
			function isNull(thisObject, defaultValue)
			{
				try
				{
					if(thisObject!=null)
						return thisObject;
				}catch(doesnExist){}
					
				return defaultValue;	
			}
			
			function debug()
			{
				try
				{
					if(console && console.debug)
						console.debug.apply(window, arguments);
				}catch(err){}
			}
			
			
			function sortBySortKey(a, b) {
			    var k1 = a["sortKey"], k2 = b["sortKey"];
			    return (k1 > k2) ? 1 : ( (k2 > k1) ? -1 : 0 );
			}
			
			function sortBySortKey_desc(a, b) {
			    var k1 = a["sortKey"], k2 = b["sortKey"];
			    return (k1 < k2) ? 1 : ( (k2 < k1) ? -1 : 0 );
			}

			function sortEntries()
			{
				var $this = $jq("#id_sortEntries, #id_sortButton");
				var desc = $this.data("desc");
				$this.data("desc",!desc).find(".arr").html(desc?"&uarr;":"&darr;");
				
				var sort = [];
				$jq("div.entry").each(
					function()
					{
					    var $this = $jq(this);
					    sort.push( {"sortKey":$this.find(".entry-title").text().toLowerCase(),"item":$this} );
					}
				);
				
				sort.sort(desc?sortBySortKey:sortBySortKey_desc)
				var entries = $jq("#entries");
				for(var keyVar in sort)
				    entries.append(sort[keyVar].item);
				
				entries.append($jq("#scroll-filler"));
			}
			
		}