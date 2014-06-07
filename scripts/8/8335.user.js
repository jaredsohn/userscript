// ==UserScript==
// @name          Sign On manager
// @author        Parashuram
// @namespace     http://SignOnManager.parash.says.it
// @description   A script that automatically sign you on to web sites. 
// @include		  *
// @exclude		  http://n.parashuram.googlepages.com/SignOnManager.html*
// @exclude		  http://localhost/sample/GMScripts/SignOnManager/SignOnManager.html

// ==/UserScript==


/**
 * A generic Logger utility. Writes to a DIV that is created, 
 * or to GM_log / FireBug Console
 */
var Logger = 
{
	DEBUG : 3,
	INFO  : 2,
	ERROR : 1,
	NONE  : 0,

	logLevel : 3,
	logOnFirebug : true,
	loggerDiv : null,
	className : null,
	
	/**
	 * Used to initialise the Logger Dialog
	 */
	init : function(className)
	{
		if (typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.clear) != "undefined")
		{
			unsafeWindow.console.clear();
		}
		Logger.console = unsafeWindow.console;
		Logger.className = className;
	},
	
	/**
	 * Shows a message to the user.
	 */
	log : function(message,level)
	{
		if (typeof(level) == "undefined")
		{
			level = Logger.DEBUG;
		}

		message = "[" + Logger.className + "] " + level  + " : " + message;
		// write the debug message to the unsafeWindow.console
		if (Logger.logLevel >= level)
		{
			if (typeof(unsafeWindow.console) != "undefined" && Logger.logOnFirebug == true)
			{
				Logger.console.log(message)	
			}
			if (typeof(GM_log) != "undefined")
			{
				GM_log(message);
			}
		}
	}
}

/**
 * Provides a drag and drop utility
 */

var DragUtil = 
{
	elemTable : new Object(),
	/**
	 * Used by the external functions,
	 */
	setAsDraggable : function(elem, handle)
	{
		Logger.log("Setting " + elem + " as draggable with handle " + handle);		
		if (typeof(handle) == "undefined")
		{
			handle = elem;
		}
		elem = document.getElementById(elem);
		handle = document.getElementById(handle);

		handle = handle.wrappedJSObject || handle;
		elem   = elem.wrappedJSObject || elem;
		handle.addEventListener("mousedown", DragUtil.startDrag ,true);
		DragUtil.elemTable[handle] = elem;
		handle.style.cursor = "move";
	},

	/**
	 * Marks the starting of the dragging
	 */
	startDrag : function(e)
	{
		var elem = e.target;
		elem = elem.wrappedJSObject || elem;
		DragUtil.elementDragged = DragUtil.elemTable[elem];
		Logger.log("Starting drag of " + DragUtil.elementDragged);
		if (typeof(DragUtil.elementDragged) != "undefined")
		{
			window.addEventListener("mousemove",DragUtil.doDrag,false);
			window.addEventListener("mouseup",DragUtil.stopDrag,false);
			DragUtil.offsetLeft = e.clientX - parseInt("0" + DragUtil.elementDragged.style.left,10);
			DragUtil.offsetTop  = e.clientY - parseInt("0" + DragUtil.elementDragged.style.top,10);
		}
	},
	
	/**
	 * Marks the end of dragging
	 */
	stopDrag : function(e)
	{
		//Logger.log("Stopping drag of " + DragUtil.elementDragged);
		window.removeEventListener("mousemove",DragUtil.doDrag,false);
		window.removeEventListener("mouseup",DragUtil.stopDrag,false);
		DragUtil.elementDragged = null;
	},
	
	/**
	 * Actually moving the mouse
	 */
	doDrag : function(e)
	{
		//Logger.log("-----------------" + e.clientX + " - "  +  DragUtil.offsetTop);
		DragUtil.elementDragged.style.left = (e.clientX - DragUtil.offsetLeft)  + "px";
		DragUtil.elementDragged.style.top = (e.clientY - DragUtil.offsetTop) + "px";
	},
}

/**
 * Responsible for writing all the data to the persistant layer we have.
 * This is responsible for the GET and SET of associative arrays only
 * For now this is the GreaseMonkey Local Store. This may be an OpenID Attribute Server later
 */
var PersistanceManager = 
{
	MAP_SEPARATOR : ":",
	
	/**
	 * Gets a map from the persistant storrage
	 */
	getMap : function(mapName)
	{
		var result = GM_getValue(mapName);
		result = eval('(' + result + ')');
		return result;
	},
	
	/**
	 * Saves an entire Map to the persistance GM store
	 */
	persist : function (mapName, map)
	{ 
		var mapSerialized = "";
		mapSerialized = PersistanceManager.serializeObject(map);

		Logger.log("Saved "  + mapName + " = "+  mapSerialized);
		GM_setValue(mapName,mapSerialized);
	},

	/**
	 * Serialization of Object
	 */
	serializeObject : function(data)
	{
		var result = "{";
		for (key in data)
		{
			key += "";
			result += "'"+ key.replace("'","\\'","\g") + "'" + PersistanceManager.MAP_SEPARATOR;
			if (typeof(data[key]) == "object")
			{
				result += PersistanceManager.serializeObject(data[key]);
			}
			else 
			{
				data[key] += ""
				result += "'" + data[key].replace("'","\\'","\g") + "'";
			}
			result += ","
		}
		
		result += "}"
		return result;
	},
}


/**
 * The entire Data Object that holds the Data required for sign On process
 */
var DataObject = 
{
	mappedPages : null,
	savedForms : null,
	
	/**
	 * If this Object created is null, tries to populate this from the 
	 * Persistance Manager. If the persistance Manager returns a null,
	 * initialises it with the defaultObj or new Object by defaule
	 */
	setUp : function(data, defaultObj)
	{
		if (typeof(defaultObj) == "undefined")
		{
			defaultObj = new Object();	
		}
		if (DataObject[data] == null)
		{
			DataObject[data] = PersistanceManager.getMap(data);
		}
		if (DataObject[data] == null)
		{
			DataObject[data] = defaultObj;
			Logger.log("Initialising up DataObject." + data + " for the first time use");
		}
	},
	
	
	/**
	 * Saves the current Page in the MappedPages Object
	 */
	savePageAsMapped : function(page,state)
	{
		DataObject.setUp("mappedPages", new Array());
		// adding to the persistance Manager
		DataObject.mappedPages[page] = state;
		PersistanceManager.persist("mappedPages", DataObject.mappedPages);
	},
	
	/**
	 * Gets the list of Pages that have already been mapped
	 */
	getMappedPages : function()
	{
		DataObject.setUp("mappedPages", new Object());
		return DataObject.mappedPages;
	},
	
	/**
	 * While mapping, saves the values that are in the form
	 */
	saveFormValues : function(page, formFields)
	{
		DataObject.setUp(page);
		DataObject[page] = formFields;
		PersistanceManager.persist(page, DataObject[page]);
	},
	
	/**
	 * On trying to fill the form on the current Page
	 */
	 fetchFormValues : function(page)
	 {
		DataObject.setUp(page);
		var formObject = DataObject[page];
		return formObject;
	 }
}

/**
 * This is responsible for showing to the user, various information messages
 */
var DialogManager =
{
	dialogDIV : null,
	/**
	 * Displays a  dialog asking whether mapping is allowed
	 */
	canMapForm : function()
	{
		Logger.log("Looking as to when to map this form");
		DialogManager.createDialogDiv();
		var docPos = "";
		
		docPos +="<DIV style=  'padding : 3px ; font-family: verdana; font-size : 12'>" +
				"<DIV id = '_som_canMap_ID1' style = 'cursor:pointer; border : 1px SOLID #CFB997'>SignOn</DIV>" +
				 "<DIV id = '_som_canMap_ID2' style = 'cursor:pointer; border : 1px SOLID #CFB997'>Disable</DIV>" +
				 "<DIV id = '_som_canMap_ID3' style = 'cursor:pointer; border : 1px SOLID #CFB997'>&nbsp;&nbsp;Close </DIV>" +
				"<DIV>";
		DialogManager.dialogDIV.innerHTML += docPos;
		
		// setting the event handlers for the links
		document.getElementById("_som_canMap_ID1").addEventListener("click",DialogManager.mapFormCallBack,false);
		document.getElementById("_som_canMap_ID2").addEventListener("click",DialogManager.mapFormCallBack,false);
		document.getElementById("_som_canMap_ID3").addEventListener("click",DialogManager.mapFormCallBack,false);

		document.getElementById("_som_canMap_ID1").addEventListener("mouseover",DialogManager.handleMouseOver ,false);
		document.getElementById("_som_canMap_ID2").addEventListener("mouseover",DialogManager.handleMouseOver,false);
		document.getElementById("_som_canMap_ID3").addEventListener("mouseover",DialogManager.handleMouseOver,false);
		document.getElementById("_som_canMap_ID1").addEventListener("mouseout",DialogManager.handleMouseOut,false);
		document.getElementById("_som_canMap_ID2").addEventListener("mouseout",DialogManager.handleMouseOut,false);
		document.getElementById("_som_canMap_ID3").addEventListener("mouseout",DialogManager.handleMouseOut,false);


	},
	
	handleMouseOver : function(e)
	{
		e.target.style.backgroundColor = "#CFB997";
	},

	handleMouseOut : function(e)
	{
		e.target.style.backgroundColor = "#EFE8DD";
	},
	
	/**
	 * Callback when clicked on the links of the Map Form Dialog
	 */
	mapFormCallBack : function(event)
	{
		DialogManager.closeDialog();
		if (event.target.id == '_som_canMap_ID1')
		{
			DialogManager.displayMessage("Enter your username/password, and then press the Login Button / link");
			FormManager.mapForms();
		}
		else if (event.target.id == '_som_canMap_ID2')
		{
			DialogManager.displayMessage("Sign On Manager will be disabled for this page. To re-enable SignOn Manager, " +
					"please use <br>Tools > GreaseMonkey > User Script Commands > Re-enable Sign On Manager for this page");
			DataObject.savePageAsMapped(SignOnManager.getPageName(), SignOnManager.STATE_DISABLED);
		}
	},

	createDialogDiv : function()
	{
		if (DialogManager.dialogDIV == null)
		{
			var newDiv = document.createElement('div');
			newDiv.id = "_som_dialogDIV";
			newDiv.style.position = 'absolute';
			newDiv.style.backgroundColor = "#EFE8DD";
			newDiv.style.border = "SOLID #CFB997 3px";
			newDiv.style.top = "0px";
			newDiv.style.left = "0px";
			newDiv.style.padding = "5px";
			newDiv.style.zIndex = 999999;
			document.body.appendChild(newDiv);
			DialogManager.dialogDIV = document.getElementById("_som_dialogDIV");
			DragUtil.setAsDraggable("_som_dialogDIV");
		}
		DialogManager.dialogDIV.innerHTML = "";
		DialogManager.dialogDIV.style.display = "block";
	},
	
	/**
	 * Displays a simple message on the dialog Box
	 */
	displayMessage : function(msgText)
	{
		DialogManager.createDialogDiv();
		DialogManager.dialogDIV.innerHTML += "<span style=\"font-family: verdana; font-size : 12\">" + msgText + "</span>";
		window.setTimeout(DialogManager.closeDialog,5000);
	},
	
	/**
	 * Closes the dialog Manager
	 */
	closeDialog : function()
	{
		DialogManager.dialogDIV.style.display = "none";
	}
	
}


/**
 * The cConfiguration Dialog Class that 
 * allows various setup for this script
 */

var Configurator = 
{
	ID_COMBO	: "_som_config_config_",
	ID_TEXT		: "_som_config_text",
	ID_BUTTON	: "_som_config_button",
	
	configDiv : null,
	
	/**
	 * Adds the configuration menu to the GM Script
	 * 
	 */
	init : function()
	{
		GM_registerMenuCommand("Configure Sign On Manager",function(){Configurator.showConfigDialog()});
	},
	
	/**
	 * Closes the Dialog div
	 */
	closeDialogDiv : function()
	{
		Configurator.configDiv.style.display = "none";
	},

	/**
	 * Displays the Configuration cialog for 
	 * SIgn On Manager
	 */
	showConfigDialog : function()
	{
		Logger.log("Showing the Configuration Manager");
		if (Configurator.configDiv == null)
		{
			Configurator.createConfigDiv();
		}
		
		Configurator.configDiv.innerHTML = "<DIV style = '	font-size : 12px; padding : 6px; background-Color : #92B4DE; align : CENTER'> " +
				"<DIV style = 'display: table-cell; width : 100%'> Sign On Manager - Configuration </DIV>" +
				"<DIV style = 'display: table-cell;'> <BUTTON id = 'som_config_closeButton'>X</BUTTON> </DIV> "
				"</DIV>";
		Configurator.populateConfigDiv();
		Configurator.configDiv.style.display = "";		
		document.getElementById("som_config_closeButton").addEventListener("click", Configurator.closeDialogDiv, true);
	},
	
	/**
	 * Creates the configuration DIV
	 */
	createConfigDiv : function()
	{
		Logger.log("Creating a new config div");
		var newDiv = document.createElement("div");
		newDiv.id = "_som_configDIV";
		newDiv.style.position = "absolute";
		newDiv.style.backgroundColor = "#D4D0C8";
		newDiv.style.fontFamily = "verdana";
		newDiv.style.width = "460px"
		newDiv.style.left = screen.availWidth/2 - parseInt(newDiv.style.width)/2;
		newDiv.style.top = 20;

		newDiv.style.borderBottom = "SOLID 2px BLACK";
		newDiv.style.borderRight = "SOLID 2px BLACK";
		newDiv.style.borderTop = "SOLID 2px GREY";
		newDiv.style.borderLeft = "SOLID 2px GREY";

		document.body.appendChild(newDiv);
		Configurator.configDiv = document.getElementById(newDiv.id);
	},
	
	/**
	 * Populates the configuration div with the data, allowing changes to the data
	 */
	populateConfigDiv : function()
	{
		var configData = "<DIV style = 'padding : 6px; font-size : 12;'>";
		for (pageName in DataObject.getMappedPages())
		{
			Logger.log(pageName);
			configData += "<DIV style='vertical-align: middle;' >"
			configData += "<input size = '40' type = 'text' id = '"+ Configurator.ID_TEXT + escape(pageName) + "'  value = '" + pageName + "'> ";
			configData += "<SELECT id = '" + Configurator.ID_COMBO + escape(pageName)+ "'>" +
				"<OPTION>" + SignOnManager.STATE_ENABLED   + "</OPTION>" +
				"<OPTION>" + SignOnManager.STATE_DISABLED  +"</OPTION>" +
				"<OPTION>" + SignOnManager.STATE_NONE + "</OPTION>" +				
				"</SELECT>";
			configData += "&nbsp;&nbsp;<BUTTON id = '" + Configurator.ID_BUTTON + escape(pageName)+"'>Details</button>";
			configData += "</DIV>";
		}
		Configurator.configDiv.innerHTML += configData + "</DIV>";
		
		configDiv = "<DIV style = 'padding : 6px; font-size : 12; direction : rtl'>" +
				"		<BUTTON id = '_som_config_cancel'> Cancel </BUTTON>" +
				"		<BUTTON id = '_som_config_ok'> OK </BUTTON>" +
				"	</DIV>"
		Configurator.configDiv.innerHTML +=configDiv;
				
		// Now setting the event handlers and selectors for each page
		for (pageName in DataObject.mappedPages)
		{
			var button = document.getElementById(Configurator.ID_BUTTON + escape(pageName));
			if (button)
			{
				button.addEventListener("click", Configurator.showDetails, true);
			}	
			var comboBox = document.getElementById(Configurator.ID_COMBO + escape(pageName));
			if (comboBox)
			{
				comboBox.value = DataObject.mappedPages[pageName];
			}
		}
		document.getElementById("_som_config_cancel").addEventListener("click",Configurator.closeDialogDiv,true);
		document.getElementById("_som_config_ok").addEventListener("click",Configurator.saveConfig,true);
	},
	
	/**
	 * Shows the details of an element that is selected
	 */
	showDetails : function (e)	
	{
		var elem = e.target.wrappedJSObject || e.target;

		var pageName = unescape( elem.id.substr(Configurator.ID_COMBO.length));
		Logger.log("Showing values for Page " + pageName, Logger.INFO);

		var pageValues = DataObject.fetchFormValues(pageName);
		for (field in pageValues)
		{
			Logger.log(field);
		}
		alert("This feature is under development.\nFor now, please save the page again with new details");
	},
	
	saveConfig : function()
	{
		Logger.log("Saving the modified configuration", Logger.INFO);
		// parsing all the values
		var newMappedPages = new Object();
		
		for (pageName in DataObject.mappedPages)
		{
			var text = document.getElementById(Configurator.ID_TEXT + escape(pageName));
			var state = document.getElementById(Configurator.ID_COMBO + escape(pageName));
			if (!text || state.value == SignOnManager.STATE_NONE)
			{
				continue;
			}
			newMappedPages[text.value] = state.value;
		}
		DataObject.mappedPages = newMappedPages;
		PersistanceManager.persist("mappedPages", DataObject.mappedPages);
		Configurator.closeDialogDiv();
	}
}

Configurator.init();
var FormManager = 
{
	ELEM_CLICK : "Clicking caused a Javascript Call",
	FORM_SUBMIT : "Simple Form Submit",
	URL_CLICK  : "Clicked on a URL",
	
	/**
	 * This is a new form, so start mapping this form, so taht this can be filled in the future. 
	 */
	mapForms : function(pageUrl)
	{
		// Now trying to capture the link that triggers the SUBMIT of the form
		Logger.log("Please click on the button / link, that will do the submit of this page",Logger.INFO);

		/**
		 * Trying to indicate the clickable objects that will submit the form
		 */
		
		var mouseOverHandle = function(mouseEvent)
		{
			FormManager.resetObjectStyle();
			var elem = mouseEvent.target;
			elem = elem.wrappedJSObject || elem;
			if (FormManager.isSubmitElement(elem))
			{
				FormManager.oldHiliteObject = elem;
				FormManager.oldHiliteStyle =  elem.style.backgroundColor;
				elem.style.backgroundColor = "#FFAABB";	
			}// end of indicating the mappable elements
		}
		
		/**
		 * Trying to capture the object that has been clicked
		 */
		var mouseDownHandler = function(mouseEvent)
		{
			FormManager.resetObjectStyle();
			var elem = mouseEvent.target;
			elem = elem.wrappedJSObject || elem;
			if (FormManager.isSubmitElement(elem))
			{
				FormManager.oldHiliteObject = elem;
				FormManager.oldHiliteStyle = elem.style.backgroundColor;
				elem.style.backgroundColor = "RED";
			}
		}

		 document.addEventListener("click",FormManager.captureSubmission, true);
		 //document.addEventListener("mousedown", mouseDownHandler,true);
		 document.addEventListener("mouseover",mouseOverHandle,true);
		 FormManager.currentUrl = pageUrl;
	},

	/**
	 * This is the event that captures Submission of the form
	 * This saves all the data that is in the form, and the 
	 * action that is to be take when the form is submitted
	 */
	captureSubmission : function(mouseEvent)
	{
	 	var elem = mouseEvent.target;
		elem = elem.wrappedJSObject || elem;
			 	
		if (!FormManager.isSubmitElement(elem))
		{
			return;
		}
		
		// mapping this element to the actual element in the window
		
		Logger.log("Capturing Form Data for Target Element " + elem);
	 	var action = null;
	 	var actionType = null;
	 	var pageURL = SignOnManager.getPageName();
	 	
	 	if (typeof(elem.onclick) != "undefined")
	 	{
	 		actionType = FormManager.ELEM_CLICK;
	 		action = elem.onclick;
	 	}
	 	else if (elem.nodeName.toUpperCase() == "A")
	 	{
	 		// this is the case of clicking on a hyperlink
	 		action = elem.href;
	 		actionType = FormManager.URL_CLICK;
	 		if (action.indexOf("javascript:") == 0)
	 		{
		 		// if this is a Javascript function, we can directly call this function	
		 		// technically, we can place this as a URL also, but lemme put this in for now
		 		actionType = FormManager.ELEM_CLICK;
		 		action = action.substring(("javascript:").length);
	 		}
	 	}
	 	else if (elem.type && elem.type.toUpperCase() == "SUBMIT")
	 	{
	 		// this is the capture action for the FORM SUBMIT
	 		actionType = FormManager.FORM_SUBMIT;
	 		// trying to get the form that this element is associated with
	 		for (var i = 0; i < document.forms.length; i++)
	 		{
	 			if (document.forms[i] == elem.form)
	 			{
			 		action = "document.forms["+ i + "]";
			 		break;
	 			}
	 		}
	 	}
	 	
		var formFields = FormManager.getFormFields();
		formFields.submitAction = new Object();
		formFields.submitAction.actionType = actionType;
		formFields.submitAction.action = action;
		formFields.submitAction.page = pageURL;
		
		DataObject.saveFormValues(pageURL, formFields);	 	
		DataObject.savePageAsMapped(pageURL,SignOnManager.STATE_ENABLED);
		//Logger.log("You have confirmed that the form submission action is " + confirmation);
	},

	/**
	 * Resets the style of the object that change on MouseOver and Click
	 */
	resetObjectStyle : function()
	{				
		if (typeof(FormManager.oldHiliteObject) != "undefined")
		{
			FormManager.oldHiliteObject.style.backgroundColor = FormManager.oldHiliteStyle;
		}
	},

	/**
	 * returns if an element can act as a form SUBMIT or not
	 */
	isSubmitElement : function(elem)
	{
		var canMap = false;
		if (elem.type && elem.type.toUpperCase() == "SUBMIT")
		{
			// allow SUBMIT buttons
			canMap = true;
		}
		else if (elem.nodeName.toUpperCase() == "A")
		{
			// allow anchors
			canMap = true;
		}
		else if (typeof(elem.onclick) != "undefined")
		{
			// allow any HTMLElement that has an ONCLICK defined
			canMap = true;
		}
		return canMap;
	},

	/**
	 * Gets the form fields in an array.
	 * Return is in the format formFields an associative array
	 */
	getFormFields : function()
	{
		var formFields = new Object();
		formFields.fields = new Object();
		
		for (var i = 0; i < document.forms.length; i++)
		{
			for (var j = 0; j < document.forms[i].elements.length; j++)
			{
				var key = "document.forms[" + i + "].elements[" + j +"]";
				formFields.fields[key] = document.forms[i].elements[j].value;
			}
		}
		return formFields;
	},

	
	/**
	 * Starts the filling of the form
	 */
	fillForm : function(page)
	{
		Logger.log("Starting to fill the form");
		var formFields = DataObject.fetchFormValues(page);

		// now filling the values in the form
		for (inputElement in formFields.fields)
		{
			var elem = FormManager.getDOMElement(inputElement)
			if (typeof(elem) != "undefined")
			{
				elem.value = formFields.fields[inputElement];
			}
		}
		Logger.log("Form Filling Complete");
		
		// after the form is filled, now doing the submit operation
		Logger.log('Form Action ' + formFields.submitAction.actionType + " =>" + formFields.submitAction.action);
		if (formFields.submitAction.actionType == FormManager.ELEM_CLICK)
		{
			// calling the javascript;
			Logger.log("Calling the javascriot function " + formFields.submitAction.action + " in a second", Logger.INFO );
			window.setTimeout(formFields.submitAction.action, 1000);
		}
		else if (formFields.submitAction.actionType == FormManager.FORM_SUBMIT)
		{
			// in case of a simple form submit, just SUBMIT the form that is indicated
			var formElement = FormManager.getDOMElement(formFields.submitAction.action);
			var submitReturn = true;
			formElement = formElement.wrappedJSObject || formElement;
			if (typeof(formElement.onsubmit) == "function")
			{
				submitReturn = formElement.onsubmit.call(formElement);
				Logger.log("Called the submit function : " + submitReturn);
			}
			if (submitReturn != false && typeof(formElement.submit) == "function")
			{
				Logger.log("Submitting the form");
				formElement.submit();
			}
		}
		else if (formFields.submitAction.actionType == FormManager.URL_CLICK)
		{
			// in case of a simple form submit, just SUBMIT the form that is indicated
			window.location = formFields.submitAction.action;
		}
		DialogManager.displayMessage("Automatically submitting...")
	},
	
	/**
	 * Get the exact DOM element from the dotted value String
	 */
	getDOMElement : function(key)
	{
		// For now, i am doing an EVAL, which is potentially pretty dangerous, 
		// if the data is screwed up. Ideally, i should parse the value from the 
		// dataStore and then reconstruct this element. 
		return eval(key);
	},
}
/**
 * This is the main SignOnManager class. Detects and decides if a page is ok for signing on
 * If it already has the data for sign on etc. 
 */
var SignOnManager = 
{
	STATE_ENABLED  : "enabled",
	STATE_DISABLED : "disabled",
	STATE_NONE     : "delete",

	pageName 	   : null,
	isMenuAdded	   : false,
	
	/**
	 * Gets the WildCarded-URL of the currentPage
	 */
	 getPageName : function()
	 {
	 	if (SignOnManager.pageName == null)
	 	{
			SignOnManager.pageName = prompt("Please enter the URL of the page that SignOnManager will try to do the requested action\n" +
							"Note that you can specify wild card (*) in the same fashion as includes of Grease Monkey"
							, document.URL);
	 	}
	 	return SignOnManager.pageName;
	 },

	/**
	 * Fills the current form, or saves the data for future use.
	 */
	init : function()
	{
		Logger.log("Starting Sign On Manager", Logger.INFO);
		//checking if this is a form that is fillable
		var pageName = SignOnManager.getPage();
		var isFormMappable = SignOnManager.isMappable();
		if (pageName.state == SignOnManager.STATE_ENABLED && isFormMappable)
		{
			FormManager.fillForm(pageName.url);
		}
		else if (pageName.state == SignOnManager.STATE_DISABLED)
		{
			Logger.log("Sign On Manager is disabled for this page",Logger.INFO);
			// adding the enable Menu item
			GM_registerMenuCommand("Enable Sign On Manager", function(){SignOnManager.enableSignOn(SignOnManager.getPageName());});
			SignOnManager.isMenuAdded = true;
			DialogManager.displayMessage("Sign On Manager disabled for this page");
		}
		else
		{
			if (isFormMappable)
			{
				DialogManager.canMapForm();
			}
			else
			{
				Logger.log("Nothing do do with this form", Logger.INFO);
			}
		}
		if (!SignOnManager.isMenuAdded)
		{
			GM_registerMenuCommand("Start Sign On Manager", function(){SignOnManager.init();});
			SignOnManager.isMenuAdded = true;
		}
		
	},
	
	/**
	 * Re - enables the Sign On Manager 
	 */
	enableSignOn : function(url)
	{
		Logger.log("Re-enabling Sign On Manager for page " + url);
		DataObject.mappedPages = null;
		DataObject.savePageAsMapped(url, SignOnManager.STATE_ENABLED);
		SignOnManager.init();
	},
	
	
	/**
	 * Returns is this form is already saved in the forms that can be filled.
	 * We do a regex match on the current URL with the URL saved in the dataStores.
	 */
	getPage : function()
	{
		Logger.log("Checking if this form is saved already......");
		var currentForm = document.URL;
		var savedForms = DataObject.getMappedPages();
		var result = new Object();
		result.state = null;
		for (pageName in savedForms)
		{
			if (SignOnManager.pageCompare(pageName,currentForm))
			{
				result.state = savedForms[pageName];
				result.url   = pageName;
				break;
			}
		}
		Logger.log("Is " + currentForm + " saved : " + result.state);
		SignOnManager.pageName = result.url;
		return result;
	},

	/**
	 * Compares two pages based on the wildcards etc.
	 */
	pageCompare : function(gmVal, pageUrl)
	{
		var result = true;
		var pageUrlIndex = 0; var gmValIndex = 0;
		// in case there is no wild card
		if (gmVal.indexOf('*') == -1)
		{
			return (gmVal == pageUrl);
		}

		while (gmValIndex < gmVal.length && pageUrlIndex < pageUrl.length)
		{
			var param = gmVal.charAt(gmValIndex);
			if (param == "*")
			{
				gmValIndex++;param = gmVal.charAt(gmValIndex);
				while (pageUrl.charAt(pageUrlIndex) != param && pageUrlIndex < pageUrl.length)
				{
					pageUrlIndex++;
				}
			}
			else if (param != pageUrl.charAt(pageUrlIndex))
			{
				result = false;
				break;
			}
		gmValIndex++;
		pageUrlIndex++;
		}
		return result;
	},
	
	/**
	 * Returns if this is a new form and can be mapped
	 * Checks for now if this form has password fields.
	 */
	isMappable : function()
	{
		Logger.log("Starting to check if this form is mappable");
		var result = false;
		for (var i = 0; i < document.forms.length; i++)
		{
			var currentForm = document.forms[i];
			for (var j = 0; j < currentForm.length; j++)
			{
				if (currentForm[j].type && currentForm[j].type.toUpperCase() == "PASSWORD")
				{
					result = true;
					break;
				}
			}
		}
		Logger.log("Is form Mappable : " + result);
		return result;
	},
}

Logger.init("SignOnManager");
SignOnManager.init();
