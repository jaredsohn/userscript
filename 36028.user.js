// ==UserScript==
// @name           Integrated Gmail: Gmail w/ Collapsible & Minimalist Inbox plus Google Calendar, Reader, Notebook, etc... Seamless Integration
// @version        1.9.2
// @namespace      mail.google.com
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var USER_CONFIGURATION = 
{	
	//Place in order the pages you would like to load. Placing mail in the list will may it collapsible. Other choices are: reader, calendar, notebook, groups, maps, picasa, sites, news,  portfolio (must be lowercase.)  NO SPACES!
	//You can now use custom URLs also do so add customX where X refers to "position in the array+1" The array is at the bottom of USER_CONFIGURATION. 
	//You can now use gadget scripts also do so add customX where X refers to "position in the array+1" The array is at the bottom of USER_CONFIGURATION. 
	ELEMENTS: "mail,reader,notebook,calendar,",
	
	FIXED: true, //For themes with a footer (such as Tree, Ninja, etc...) it will be fixed to the bottom of the viewport. 
	
	MAIL:
	{
		BORDER_AROUND_THREADBOX: false, //Creates a white border around the inbox
		ALLOW_STARTING_COLLAPSED: true,
		ENABLE_MINIMALIST_THREADBOX: false, //Enable this if you keep a small and clean inbox
		ROUND: true, //Rounds the edges of nav list items (Inbox, Drafts, etc...) Doesn't work with the Shiny and Tree themes. 
	},
	
	CALENDAR:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: false, //May cause unviewable text in 2+ week and month views.
		HIDE_HEADERS: true
	},
	
	READER:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true
	},
	
	NOTEBOOK:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: false, //May cause a constant background loading until expanded. 
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true
	},
	
	GROUPS:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none
	},
	
	MAPS:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none
	},
	
	PICASA:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none	
	},
	
	SITES:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none
	},
	
	NEWS:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none
	},
	
	PORTFOLIO:
	{
		FRAME_HEIGHT: "500px", 
		ALLOW_STARTING_COLLAPSED: true,
		SHOW_WHEN_USING_GOOGLE_APPS: false,
		HIDE_HEADERS: true,
		NAV_BUTTONS: "right", // can be left, right, or none
	},
	
	CUSTOM: new Array(
		{
			NAME: "Example",
			URL_STD: "http://...", //Must include the http:// or https://
		
			FRAME_HEIGHT: "500px", 
			ALLOW_STARTING_COLLAPSED: true,
			SHOW_WHEN_USING_GOOGLE_APPS: false,
			NAV_BUTTONS: "right", // can be left, right, or none
		}
	),
	
	GADGETS: new Array(	
		{
			NAME: "Fist Tank",
			SCRIPT: scriptSrcExtractor('<script src="http://www.gmodules.com/ig/ifr?url=http://fishgadget.googlecode.com/svn/trunk/fish.xml&up_fishColor=none&up_fishName=Fish&up_backgroundColor=F0F7FF&up_backgroundImage=http%3A%2F%2F&up_numFish=5&up_fishColor1=000000&up_fishColor2=0E30B7&up_fishColor3=F45540&up_fishColor4=FEB859&up_fishColor5=97B6A6&up_fishColor6=F45540&up_fishColor7=F45540&up_fishColor8=F45540&up_fishColor9=F45540&up_fishColor10=F45540&up_foodColor=BFD1C1&up_userColor1=&up_userColor2=&up_userColor3=&up_userColor4=&up_userColor5=&synd=open&w=1000&h=500&title=__UP_fishName__&border=%23ffffff|3px%2C1px+solid+%23999999"></script>'),
		
			FRAME_HEIGHT: "500px", 
			ALLOW_STARTING_COLLAPSED: true,
			SHOW_WHEN_USING_GOOGLE_APPS: false,
			NAV_BUTTONS: "right", // can be left, right, or none
		}
	),
};

var GLOBAL_CONFIGURATION = //DO NOT EDIT
{
	MAIL: 
	{
		NAME: "Mail"
	},
	
	CALENDAR:
	{
		NAME: "Calendar",
		URL_STD: "https://www.google.com/calendar/render?tab=yc",
		URL_APP: "http://www.google.com/calendar/hosted/"	
	},
	
	READER:
	{
		NAME: "Reader",
		URL_STD: "https://www.google.com/reader/view/?tab=Ny",
		URL_APP: ""		
	},

	NOTEBOOK:
	{
		NAME: "Notebook",
		URL_STD: "https://www.google.com/notebook/?hl=en",
		URL_APP: ""		
	},
	
	GROUPS:
	{
		NAME: "Groups",
		URL_STD: "http://groups.google.com/grphp?tab=mg",
		URL_APP: ""		
	},

	MAPS:
	{
		NAME: "Maps",
		URL_STD: "http://maps.google.com/maps?hl=en&tab=wl",
		URL_APP: ""		
	},

	PICASA:
	{
		NAME: "Picasa",
		URL_STD: "http://picasaweb.google.com/home?hl=en&tab=wq",
		URL_APP: ""		
	},	
	
	SITES:
	{
		NAME: "Sites",
		URL_STD: "http://sites.google.com/?tab=m3&pli=1",
		URL_APP: ""		
	},

	NEWS:
	{
		NAME: "News",
		URL_STD: "http://news.google.com/nwshp?tab=mn",
		URL_APP: ""		
	},	
	
	PORTFOLIO:
	{
		NAME: "Portfolio",
		URL_STD: "http://finance.google.com/finance/portfolio?action=view&pid=1",
		URL_APP: ""		
	},	
	
	CUSTOM: new Array(),
	GADGETS: new Array(),
	
	ELEMENTS: new Array(),
};

function scriptSrcExtractor(scriptString)
{
	try
	{
		if(scriptString.search("http") != 0 && scriptString.search("<script") == -1) scriptString = "http://"+scriptString;
	
		if(scriptString.search("http") == 0 && scriptString.search("gmodules") == -1 && scriptString.search("xml") != -1) 
		{
			scriptString = "http://www.gmodules.com/ig/ifr?url="+scriptString;
		}
		else if(scriptString.search("<script") != -1)
		{
			var scriptString = scriptString.split('src="')[1];
			scriptString = scriptString.split('"')[0];
		}
		
		scriptString = scriptString.replace(/\&amp\;/g,"&");
		if(scriptString.search(/output\=js/g) != -1) scriptString = scriptString.replace(/output\=js/g,"output=html");
		else if(scriptString.search(/output/g) == -1) scriptString = scriptString + "&output=html";	
	}
	catch(err) {var scriptString = "";}

	return scriptString;
}

var ORDERING_PROCESSOR = 
{
	getNumberOfElements:function(ordering)
	{
		if(ordering.substring(ordering.length-1) == ",") ordering = ordering.substring(0,ordering.length-1);
		return ordering.split(",").length;
	},

	getElementAtPosition: function(ordering, position)
	{
		if(ordering.substring(ordering.length-1) == ",") ordering = ordering.substring(0,ordering.length-1);
	
		ordering = ordering.split(",");
	
		if(position < ordering.length) return ordering[position];
		else return "";
	},
	
	getWhichCustom: function(custom)
	{
		return parseInt(custom.toLowerCase().split("custom")[1])-1;
	},
	
	getWhichGadget: function(gadget)
	{
		return parseInt(gadget.toLowerCase().split("gadget")[1])-1;
	},
};

function onPageLoaded()
{
	if(unsafeWindow.gmonkey) unsafeWindow.gmonkey.load('1.0', function(gmail_api) {checkGMailAPILoaded(gmail_api)});
	else setTimeout(function(){onPageLoaded();},1000); 
}

function checkGMailAPILoaded(gmail_api)
{
	if(!unsafeWindow.gmonkey.isLoaded('1.0')) {setTimeout(function(){checkGMailAPILoaded(gmail_api);},1000); return;}
	try{typeof gmail_api.getFooterElement();} catch(err){setTimeout(function(){checkGMailAPILoaded(gmail_api);},1000); return;}

	try{USER_CONFIGURATION.THEME = parent.document.getElementsByTagName("body")[0].innerHTML.split('sx_skcs","')[1].split('"')[0];}catch(err){USER_CONFIGURATION.THEME="";}

	for(var i = ORDERING_PROCESSOR.getNumberOfElements(USER_CONFIGURATION.ELEMENTS)-1; i >= 0; i--)
		determineElement(gmail_api, ORDERING_PROCESSOR.getElementAtPosition(USER_CONFIGURATION.ELEMENTS,i), i);

	//orderElementBoxes(gmail_api);	

	COLLAPSIBLE_SIDEBOXES.setup(gmail_api);
	THEME_CLEANER.setup(gmail_api,USER_CONFIGURATION.THEME,USER_CONFIGURATION.FIXED,USER_CONFIGURATION.MAIL.ROUND,GLOBAL_CONFIGURATION.MAIL.NAME.toLowerCase()+"_div");
}

function determineElement(gmail_api, element_string, element_position)
{ 
	switch(element_string.toLowerCase())
	{
		case 'mail': GLOBAL_CONFIGURATION.MAIL.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.MAIL, GLOBAL_CONFIGURATION.MAIL); break;
		case 'calendar': GLOBAL_CONFIGURATION.CALENDAR.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.CALENDAR, GLOBAL_CONFIGURATION.CALENDAR); break;
		case 'reader': GLOBAL_CONFIGURATION.READER.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.READER, GLOBAL_CONFIGURATION.READER); break;
		case 'notebook': GLOBAL_CONFIGURATION.NOTEBOOK.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.NOTEBOOK, GLOBAL_CONFIGURATION.NOTEBOOK); break;
		case 'groups': GLOBAL_CONFIGURATION.GROUPS.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.GROUPS, GLOBAL_CONFIGURATION.GROUPS); break;		
		case 'maps': GLOBAL_CONFIGURATION.MAPS.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.MAPS, GLOBAL_CONFIGURATION.MAPS); break;				
		case 'picasa': GLOBAL_CONFIGURATION.PICASA.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.PICASA, GLOBAL_CONFIGURATION.PICASA); break;				
		case 'sites': GLOBAL_CONFIGURATION.SITES.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.SITES, GLOBAL_CONFIGURATION.SITES); break;						
		case 'news': GLOBAL_CONFIGURATION.NEWS.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.NEWS, GLOBAL_CONFIGURATION.NEWS); break;				
		case 'portfolio':  GLOBAL_CONFIGURATION.PORTFOLIO.POSITION = element_position; loadElement(gmail_api, USER_CONFIGURATION.PORTFOLIO, GLOBAL_CONFIGURATION.PORTFOLIO); break;								
	}
	
	if(element_string.toLowerCase().search("custom") != -1)
	{ 
		var user_configuration = USER_CONFIGURATION.CUSTOM[ORDERING_PROCESSOR.getWhichCustom(element_string)];
		
		var global_configuration = 
		{
			NAME: user_configuration.NAME,
			URL_STD: user_configuration.URL_STD,
			URL_APP: "",	
			POSITION: element_position
		};
		
		GLOBAL_CONFIGURATION.CUSTOM[GLOBAL_CONFIGURATION.CUSTOM.length] = global_configuration;

		loadElement(gmail_api, user_configuration, global_configuration);
	}
	else if(element_string.toLowerCase().search("gadget") != -1)
	{ 
		var user_configuration = USER_CONFIGURATION.GADGETS[ORDERING_PROCESSOR.getWhichGadget(element_string)];
		
		var global_configuration = 
		{
			NAME: user_configuration.NAME,
			SCRIPT: user_configuration.SCRIPT,	
			POSITION: element_position
		};
		
		GLOBAL_CONFIGURATION.GADGETS[GLOBAL_CONFIGURATION.GADGETS.length] = global_configuration;

		loadElement(gmail_api, user_configuration, global_configuration);
	}
}

function loadElement(gmail_api, user_configuration, global_configuration)
{
	var elementExists = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"Box");
	var elementLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"BoxLoaded");

	if(elementExists != null || elementLoaded != null) return;
	
	if(user_configuration.ALLOW_STARTING_COLLAPSED) GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION] = gmail_api.addNavModule('<span id="'+global_configuration.NAME.toLowerCase()+'Box">'+global_configuration.NAME+'</span>');
	else GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION] = gmail_api.addNavModule('<span id="'+global_configuration.NAME.toLowerCase()+'Box">'+global_configuration.NAME+'<span style="display:none;">'+(new Date()).getTime()+'</span></span>'); 		

	if(global_configuration.URL_STD != null || global_configuration.SCRIPT != null) GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION].setContent("<iframe id='"+global_configuration.NAME.toLowerCase()+"_iframe' style='border: medium none; display:block; width:100%;'></iframe>");	
	else GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION].setContent("<div id='"+global_configuration.NAME.toLowerCase()+"_div'><div id='placeHolder'></div></div>");	
	
	checkContentsLoaded(gmail_api, user_configuration, global_configuration);
}

function checkContentsLoaded(gmail_api, user_configuration, global_configuration)
{ 
	var elementLoaded = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"BoxLoaded"); 
	
	try {if(typeof gmail_api.getFooterElement() != 'undefined' && typeof GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION].getElement() != 'undefined' && elementLoaded == null) loadContents(gmail_api, user_configuration, global_configuration);} 
	catch(err) {setTimeout(function(){checkContentsLoaded(gmail_api, user_configuration, global_configuration);},200);}
}

function loadContents(gmail_api, user_configuration, global_configuration)
{
	gmail_api.getFooterElement().insertBefore(GLOBAL_CONFIGURATION.ELEMENTS[global_configuration.POSITION].getElement(), gmail_api.getFooterElement().childNodes[0]);

	var elementBoxDOM = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"Box");
	elementBoxDOM.id = global_configuration.NAME.toLowerCase()+"BoxLoaded";

	elementBoxDOM = elementBoxDOM.parentNode.parentNode;
	elementBoxDOM.style.textAlign = "left";

	for(var i = 0; i < 11; i++) elementBoxDOM = elementBoxDOM.parentNode;
	elementBoxDOM.style.width = "100%";

	if(global_configuration.URL_STD != null)
	{
		var detectedURL = detectURL(global_configuration, user_configuration);
		if(detectedURL == "HIDE") {elementBoxDOM.style.display = "none"; return;}
		
		if(detectedURL.search(/\?/) == -1) detectedURL = detectedURL + "?";
		
		if(user_configuration.HIDE_HEADERS == true) detectedURL = detectedURL+"&iframe";
		
		if(user_configuration.NAV_BUTTONS == "left") detectedURL = detectedURL+"&navbuttonsL";
		else if(user_configuration.NAV_BUTTONS == "right") detectedURL = detectedURL+"&navbuttonsR";
		
		var elementBoxIFrame = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"_iframe");
		elementBoxIFrame.src = 'null';	
		elementBoxIFrame.src = detectedURL;
		elementBoxIFrame.style.height = user_configuration.FRAME_HEIGHT;
	}
	else if(global_configuration.SCRIPT != null)
	{
		var elementBoxIFrame = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"_iframe");
		elementBoxIFrame.src = 'null';	
		elementBoxIFrame.src = global_configuration.SCRIPT;
		elementBoxIFrame.style.height = user_configuration.FRAME_HEIGHT;
	}
	else COLLAPSIBLE_THREADBOX.loadContent(gmail_api, user_configuration, global_configuration);
}

function detectURL(global_configuration, user_configuration)
{
	if(document.URL.search("mail.google.com/a") != -1) 
	{
		if(global_configuration.URL_APP == "")
		{ 
			if(!user_configuration.SHOW_WHEN_USING_GOOGLE_APPS) return "HIDE";
			else return global_configuration.URL_STD;
		}
		
		var domain = document.URL.substring(document.URL.search("mail.google.com/a/")+18);
		domain = domain.substring(0,domain.search("/"));
		return global_configuration.URL_APP+domain+"/?";
	}
	else return global_configuration.URL_STD;
}

function orderElementBoxes(gmail_api)
{ 
	try{gmail_api.getFooterElement();}
	catch(err) {setTimeout(function(){orderElementBoxes(gmail_api);},200); return;}

	for(var i = GLOBAL_CONFIGURATION.ELEMENTS.length; i >=0; i--) 
	{
		if(GLOBAL_CONFIGURATION.ELEMENTS[i] == null) continue;

		var place_before_id = "ATBOTTOM";

		for(var j = 1; i+j < GLOBAL_CONFIGURATION.ELEMENTS.length && place_before_id == "ATBOTTOM"; j++)
		{
			if(GLOBAL_CONFIGURATION.MAIL.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.MAIL.NAME.toLowerCase() + "BoxLoaded";	
			else if(GLOBAL_CONFIGURATION.CALENDAR.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.CALENDAR.NAME.toLowerCase() + "BoxLoaded";
			else if(GLOBAL_CONFIGURATION.READER.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.READER.NAME.toLowerCase() + "BoxLoaded";		
			else if(GLOBAL_CONFIGURATION.NOTEBOOK.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.NOTEBOOK.NAME.toLowerCase() + "BoxLoaded";	
			else if(GLOBAL_CONFIGURATION.GROUPS.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.GROUPS.NAME.toLowerCase() + "BoxLoaded";	
			else if(GLOBAL_CONFIGURATION.MAPS.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.MAPS.NAME.toLowerCase() + "BoxLoaded";				
			else if(GLOBAL_CONFIGURATION.PICASA.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.PICASA.NAME.toLowerCase() + "BoxLoaded";							
			else if(GLOBAL_CONFIGURATION.SITES.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.SITES.NAME.toLowerCase() + "BoxLoaded";										
			else if(GLOBAL_CONFIGURATION.NEWS.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.NEWS.NAME.toLowerCase() + "BoxLoaded";							
			else if(GLOBAL_CONFIGURATION.PORTFOLIO.POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.PORTFOLIO.NAME.toLowerCase() + "BoxLoaded";			
			else 
			{
				for(var k = 0; k < GLOBAL_CONFIGURATION.CUSTOM.length; k++)
					if(GLOBAL_CONFIGURATION.CUSTOM[k].POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.CUSTOM[k].NAME.toLowerCase() + "BoxLoaded";	

				for(var k = 0; k < GLOBAL_CONFIGURATION.GADGETS.length; k++)
					if(GLOBAL_CONFIGURATION.GADGETS[k].POSITION == i+j) place_before_id = GLOBAL_CONFIGURATION.GADGETS[k].NAME.toLowerCase() + "BoxLoaded";						
			}
		}
		
		if(place_before_id.search("ATBOTTOM") == -1)
		{
			var placeBeforeBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById(place_before_id); 
			if(placeBeforeBox  == null) {setTimeout(function(){orderElementBoxes(gmail_api);},200); return;}
	
			for(var k = 0; k < 13; k++) placeBeforeBox = placeBeforeBox.parentNode;
			gmail_api.getFooterElement().insertBefore(GLOBAL_CONFIGURATION.ELEMENTS[i].getElement(),placeBeforeBox); 
		}
		else gmail_api.getFooterElement().insertBefore(GLOBAL_CONFIGURATION.ELEMENTS[i].getElement(),gmail_api.getFooterElement().childNodes[gmail_api.getFooterElement().childNodes.length-1]);		
	}
}

function addIFrameStyle(css, iframeID) 
{
	var head = parent.document.getElementById(iframeID).contentDocument.getElementsByTagName('head')[0];
	if (!head) { return; }
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var COLLAPSIBLE_THREADBOX = 
{
	loadContent: function(gmail_api, user_configuration, global_configuration)
	{
		var threadBoxDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"_div"); 

		if(user_configuration.BORDER_AROUND_THREADBOX) threadBoxDiv.style.padding = "5px";
		else threadBoxDiv.style.padding = "-15px";

		COLLAPSIBLE_THREADBOX.fillContent(gmail_api, threadBoxDiv); 
		COLLAPSIBLE_THREADBOX.redrawNavList(gmail_api, user_configuration.ROUND);
		COLLAPSIBLE_THREADBOX.squareOffThreadBox(threadBoxDiv);
		
		if(user_configuration.ENABLE_MINIMALIST_THREADBOX) MINIMALIST_THREADBOX.makeMinimalist(gmail_api);
		
		setTimeout(function(){COLLAPSIBLE_THREADBOX.resizeConversation(gmail_api,global_configuration,false);},500);
		gmail_api.registerViewChangeCallback(function(){COLLAPSIBLE_THREADBOX.resizeConversation(gmail_api,global_configuration,false);});		
		window.parent.addEventListener('resize',function(){COLLAPSIBLE_THREADBOX.resizeConversation(gmail_api,global_configuration,true);},false);
	},

	fillContent: function(gmail_api, threadBoxDiv)
	{ 
		var placeHolder = parent.document.getElementById("canvas_frame").contentDocument.getElementById("placeHolder");
		
		var activeView = gmail_api.getActiveViewElement()
		for(var i = 0; i < 9; i++) activeView = activeView.parentNode;

		threadBoxDiv.insertBefore(activeView, placeHolder);
	},
	redrawNavList: function(gmail_api, round_edges)
	{
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[0],round_edges,0);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[2],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[3],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[4],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[5],round_edges,2);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[6],round_edges,0);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[7],round_edges,0);
		COLLAPSIBLE_THREADBOX.redrawListItem(gmail_api.getNavPaneElement().childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[2],round_edges,0);
	},

	redrawListItem: function(item, round_edges, parentDepth)
	{
		item.style.width = "90%";
		
		if(!round_edges) return;
		
		itemParent = item; for(var i = 0; i < parentDepth; i++) itemParent = itemParent.parentNode;
		item = item.childNodes[0].childNodes[0];

		item.childNodes[0].childNodes[1].style.background = COLLAPSIBLE_THREADBOX.getBackgroundStyle(itemParent.className.split(" ")[1], item.childNodes[0].childNodes[0].className.split(" ")[1]);
		if(item.childNodes[0].childNodes[1].style.background.search("terminal") == -1) item.childNodes[0].childNodes[1].style.backgroundPosition = "-4px 0px";

		item.childNodes[3].childNodes[1].style.background = COLLAPSIBLE_THREADBOX.getBackgroundStyle(itemParent.className.split(" ")[1], item.childNodes[3].childNodes[0].className.split(" ")[1]);		
		if(item.childNodes[0].childNodes[1].style.background.search("terminal") == -1) item.childNodes[3].childNodes[1].style.backgroundPosition = "-4px -4px";		
	},
	
	getBackgroundStyle: function(strClassNameOne, strClassNameTwo)
	{
      var iNumCSS=parent.document.styleSheets.length;      
      for (var i=0; i<iNumCSS; i++)
	  {      
		var oThisStyle=parent.document.styleSheets[i];
		var iNumRules=oThisStyle.cssRules.length;
		for (var j=0; j<iNumRules; j++)
		{
			try{
			  if(oThisStyle.cssRules[j].selectorText.search(strClassNameOne) != -1 && oThisStyle.cssRules[j].selectorText.search(strClassNameTwo) != -1 )
			  {
				return oThisStyle.cssRules[j].cssText.split("background: ")[1].split(";")[0];
			  }
			} catch(err) {continue;} 
		}
      }                        
	},	
	
	resizeConversation: function(gmail_api, global_configuration, windowResized)
	{  
		if(gmail_api.getActiveViewType() != 'cv') return; 
		
		var messageBox = parent.document.getElementById("canvas_frame").contentDocument.getElementById(global_configuration.NAME.toLowerCase()+"_div").getElementsByTagName("table"); 
			
		for(var i = 0; i < messageBox.length; i++) {if(messageBox[i].className.split(" ").length > 2) { messageBox = messageBox[i].childNodes[0].childNodes[0].childNodes[0]; break;}}

		if(messageBox.style.width.split("px").length <= 1 || (messageBox.id == "resizedMessageBox" && !windowResized)) {setTimeout(function(){COLLAPSIBLE_THREADBOX.resizeConversation(gmail_api,global_configuration,windowResized)},100); return;}
		
		messageBox.id = "resizedMessageBox";
		messageBox.style.width = (messageBox.style.width.split("px")[0]-50)+"px";
	},

	squareOffThreadBox: function(threadBoxDiv)
	{
		threadBoxDiv = threadBoxDiv.childNodes[0].childNodes[0].childNodes[0];

		threadBoxDiv.childNodes[0].childNodes[0].style.width = "0px";
		threadBoxDiv.childNodes[0].childNodes[1].style.width = "0px";
		threadBoxDiv.childNodes[3].childNodes[0].style.width = "0px";
		threadBoxDiv.childNodes[3].childNodes[1].style.width = "0px";	

	}
};

var MINIMALIST_THREADBOX = 
{
	makeMinimalist: function(gmail_api)
	{
		MINIMALIST_THREADBOX.hideNullMessages();
		MINIMALIST_THREADBOX.hideLowerMessageOptions(gmail_api);
		
		gmail_api.registerViewChangeCallback(function(){MINIMALIST_THREADBOX.hideLowerMessageOptions(gmail_api);});		
	},
	
	hideNullMessages: function()
	{
		addIFrameStyle(".lW3BFe {display: none; !important};","canvas_frame");
	},
	
	hideLowerMessageOptions: function(gmail_api)
	{
		if(gmail_api.getActiveViewType() != 'tl') return; 
		
		var spanList = parent.document.getElementById("canvas_frame").contentDocument.getElementsByTagName("span"); 
		
		for(var i = spanList.length-1; i >= 0; i--) {if(spanList[i].getAttribute("role") == "link" && spanList[i].innerHTML == "All") {var lowerMessageOptionsDiv = spanList[i]; break;}}
		lowerMessageOptionsDiv = lowerMessageOptionsDiv.parentNode.parentNode.parentNode.parentNode.parentNode;
		lowerMessageOptionsDiv.style.display = "none";			
	}
};

var COLLAPSIBLE_SIDEBOXES = 
{
	setup: function(gmail_api)
	{
		COLLAPSIBLE_SIDEBOXES.findElements(gmail_api);
		COLLAPSIBLE_SIDEBOXES.resizeCenterElement();
	},

	findElements: function(gmail_api)
	{
		COLLAPSIBLE_SIDEBOXES.left = gmail_api.getNavPaneElement();
		COLLAPSIBLE_SIDEBOXES.center = COLLAPSIBLE_SIDEBOXES.left.parentNode.childNodes[2];
		if(COLLAPSIBLE_SIDEBOXES.left.parentNode.childNodes.length >= 5) COLLAPSIBLE_SIDEBOXES.right = COLLAPSIBLE_SIDEBOXES.left.parentNode.childNodes[4];		
		else COLLAPSIBLE_SIDEBOXES.right = null;
		COLLAPSIBLE_SIDEBOXES.parent = COLLAPSIBLE_SIDEBOXES.left.parentNode.parentNode.parentNode.parentNode;
	},
	
	toggleElement: function(element)
	{
		COLLAPSIBLE_SIDEBOXES.toggleElementVisable(element);
		COLLAPSIBLE_SIDEBOXES.resizeCenterElement();
	},
	
	toggleElementVisable: function(element)
	{
		switch(element)
		{
			case "left": 
				if(COLLAPSIBLE_SIDEBOXES.left != null && COLLAPSIBLE_SIDEBOXES.left.style.display != "none") COLLAPSIBLE_SIDEBOXES.left.style.display = "none"; 
				else if(COLLAPSIBLE_SIDEBOXES.left != null && COLLAPSIBLE_SIDEBOXES.left.style.display == "none") COLLAPSIBLE_SIDEBOXES.left.style.display = "block"; 
				break;
			case "right": 
				if(COLLAPSIBLE_SIDEBOXES.right != null && COLLAPSIBLE_SIDEBOXES.right.style.display != "none") COLLAPSIBLE_SIDEBOXES.right.style.display = "none"; 
				else if(COLLAPSIBLE_SIDEBOXES.right != null && COLLAPSIBLE_SIDEBOXES.right.style.display == "none") COLLAPSIBLE_SIDEBOXES.right.style.display = "block"; 
				break;
		}
	},
	
	resizeCenterElement: function()
	{
		var width = parseInt(COLLAPSIBLE_SIDEBOXES.parent.style.width.split("px")[0]) - 18;

		if(COLLAPSIBLE_SIDEBOXES.left  != null && COLLAPSIBLE_SIDEBOXES.left.style.display  != "none") width -= parseInt(COLLAPSIBLE_SIDEBOXES.left.style.width.split("px")[0]);
		if(COLLAPSIBLE_SIDEBOXES.right != null && COLLAPSIBLE_SIDEBOXES.right.style.display != "none") width -= parseInt(COLLAPSIBLE_SIDEBOXES.right.style.width.split("px")[0]);
		
		COLLAPSIBLE_SIDEBOXES.center.style.width = width+"px";
	},
};

var THEME_CLEANER =
{
	setup: function(gmail_api, theme, fixed, round_edges, mail_div_name)
	{
                if(document.URL.search("mail.google.com/a") != -1) return;

		THEME_CLEANER.mail_div_name = mail_div_name;
		THEME_CLEANER.themeDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementsByTagName("div")[0].childNodes[0];
	
		if(fixed) THEME_CLEANER.makeThemeFixed();
	
		switch(theme.toLowerCase())
		{
			case "shiny":			
				THEME_CLEANER.fixShinyTheme();
				THEME_CLEANER.fixedRightBorder();
				break;
				
			case "desk":
				THEME_CLEANER.fixDeskTheme();
				THEME_CLEANER.fixedRightBorder();
				break;
			
			case "tree":
				if(fixed) THEME_CLEANER.correctBackgroundColor(); 
				if(fixed) gmail_api.registerViewChangeCallback(function(){THEME_CLEANER.correctBackgroundColor();});
				THEME_CLEANER.fixBottomBorder();
				break;		
			
			case "zoozimps":
				THEME_CLEANER.fixTopBorder();
				break;
				
			case "candy":
				THEME_CLEANER.fixCandyTheme();
				THEME_CLEANER.fixedRightBorder();
				THEME_CLEANER.fixBottomBorder();
				break;		

			case "busstop":
				if(fixed) THEME_CLEANER.correctBackgroundColor(); 
				if(fixed) gmail_api.registerViewChangeCallback(function(){THEME_CLEANER.correctBackgroundColor();});				
				THEME_CLEANER.fixBottomBorder();		
				break;
				
			case "ninja":
				THEME_CLEANER.fixNinjaTheme();
				break;				
		};
	},

	makeThemeFixed: function()
	{	
		THEME_CLEANER.themeDiv.childNodes[THEME_CLEANER.themeDiv.childNodes.length-1].style.position = "fixed";
		THEME_CLEANER.themeDiv.childNodes[THEME_CLEANER.themeDiv.childNodes.length-2].style.position = "fixed";
	},
	
	fixDeskTheme: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
		mailDiv = mailDiv.childNodes[0].childNodes[0];
		mailDiv.style.margin = "0px";
		
		var topBorder = mailDiv.childNodes[0].childNodes[0];
		topBorder.style.display = "none";	

		var bottomBorder = mailDiv.childNodes[0];
		bottomBorder = bottomBorder.childNodes[bottomBorder.childNodes.length-1];
		bottomBorder.style.display = "none";
	},
	
	fixCandyTheme: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
	
		var bottomBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0];
		bottomBorder = bottomBorder.childNodes[bottomBorder.childNodes.length-1];
		bottomBorder = bottomBorder.childNodes[0];		
		bottomBorder.style.height = "0px";	
				
		var leftBorder = mailDiv.parentNode.parentNode.parentNode.parentNode.parentNode;	
		leftBorder.style.marginLeft = "0px";
	},

	fixShinyTheme: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
		mailDiv.style.backgroundColor = "#FFFFFF";
	
		var topBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		topBorder = topBorder.childNodes[1];
		topBorder.style.display = "none";	
				
		var margins = mailDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
		margins.style.margin = "0px";
		margins.childNodes[0].style.margin = "0px";		
	},

	fixNinjaTheme: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
		
		var topBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		topBorder.style.display = "none";
	},
	
	fixBottomBorder: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
		
		var bottomBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0];
		bottomBorder = bottomBorder.childNodes[bottomBorder.childNodes.length-1];
		bottomBorder = bottomBorder.childNodes[bottomBorder.childNodes.length-1];		
		bottomBorder.style.height = "4px";
	},
	
	fixTopBorder: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
		
		var topBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[0];
		topBorder = topBorder.childNodes[topBorder.childNodes.length-1];
		topBorder.style.height = "4px";
		topBorder.style.top = "0px";
	},

	fixedRightBorder: function()
	{
		var mailDiv = parent.document.getElementById("canvas_frame").contentDocument.getElementById(THEME_CLEANER.mail_div_name); 
		if(mailDiv == null) return;
	
		var rightBorder = mailDiv.childNodes[0].childNodes[0].childNodes[0].childNodes[1];
		rightBorder = rightBorder.childNodes[0];
		rightBorder.style.margin = "0px";
		rightBorder.style.padding = "0px";
		rightBorder = rightBorder.childNodes[0];
		rightBorder.style.margin = "0px";
		rightBorder.style.padding = "0px";
	},
	
	correctBackgroundColor: function()
	{
		var body = parent.document.getElementById("canvas_frame").contentDocument.getElementsByTagName("body")[0];
		
		var body_color = THEME_CLEANER.getBackgroundColor(body.className);
		var theme_color = THEME_CLEANER.getBackgroundColor(THEME_CLEANER.themeDiv.childNodes[0].className);
		
		if(theme_color != body_color) body.style.backgroundColor = theme_color;
	},
	
	getBackgroundColor: function(strClassName)
	{
      var iNumCSS=parent.document.styleSheets.length;      
      for (var i=0; i<iNumCSS; i++)
	  {      
		var oThisStyle=parent.document.styleSheets[i];
		var iNumRules=oThisStyle.cssRules.length;
		for (var j=0; j<iNumRules; j++)
		{
			try{
			  if(oThisStyle.cssRules[j].selectorText.search(strClassName) != -1 && oThisStyle.cssRules[j].cssText.search("background:") != -1)
			  {
				return oThisStyle.cssRules[j].cssText.split("background: ")[1].split(";")[0];
			  }
			} catch(err) {continue;} 
		}
      }                        
	},
};

window.addEventListener('load', onPageLoaded, true);