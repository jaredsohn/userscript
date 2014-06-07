// ==UserScript==
// @name           LagTV Page Title Fix
// @namespace      http://userscripts.org/scripts/show/152348
// @description    lag.tv improvement
// @include        http*://www.lag.tv/*
// @version        2012.11.14b
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @grant          GM_openInTab
// @run-at         document-end
// ==/UserScript==

/*
	Settings are modified by clicking the "Settings" link at the left end of the navbar on most pages.  
	You do not need to modify the script itself. 
	Thanks to Mango for introducing this style of scripting settings changes, as well as the helper functions used. 
*/

var showError, recursion, login, pass_hash, loginID, content;
initialize();
loadTweaks();

function loadTweaks()
{
	//Returns an array with just the "value" properties from an array of arguments for a tweak
	function defaultArgs( tweak )
	{
		var defArgs = [];
		for( var i = 0; i < tweak.args.length; i++ )
			defArgs.push( tweak.args[i].value );
		return defArgs;
	}
	
	//Validates the regex properties of an array of objects
	function validRegexInArray(regexName){ return function(elem, args, argI){
			var temp = args[argI], json = validJSON(elem, args, argI);
			if( json !== false && (json instanceof Array) ) try {
				for( var i = 0; i < json.length; i++ )
					(new RegExp( "("+json[i][regexName]+")" )).test("blah");
				
				return (args[argI] = json);
			}
			catch(err) { }
			elem.style.color = "red";
			args[argI] = temp;
			return false;
	}}
		
	//Validates regex argument
	function validRegex(elem, args, argI)
	{
		try{
			var ex = new RegExp("("+elem.value+")");
			ex.test("blah");
			args[argI] = elem.value;
			elem.style.removeProperty('color');
			return elem.value;
		}catch(err){
			elem.style.color = 'red';
			return false;
		}
	}
	
	//Validates number argument
	function validNumber(a,b,x)
	{
		var temp = function(elem, args, argI)
		{
			var num = Number( elem.value );
			if( isNaN(num) || ( a !== undefined && num < a ) )
				args[argI] = a;
			else if( b > a && num > b )
				args[argI] = b;
			else
			{
				args[argI] = num;
				elem.style.removeProperty('color');
				return num;
			}
			elem.style.color = 'red';
			return false;
		}
		
		if( x === undefined )
			return temp;//Called with < 3 parameters.  We just want the function
		
		//Three params.  We're setting a value without a range.
		temp = validNumber();
		return temp(a,b,x);
	};
	
	//Validates JSON argument
	function validJSON(elem, args, argI)
	{
		try{
			var value = MS_parseJSON( elem.value );
			args[argI] = value;
			elem.style.removeProperty("color");
			return value;
		}catch(err){}
		elem.style.color = "red";
		return false;
	}
	
	function validSHA1(elem, args, argI)
	{
		if( /^[a-f0-9]{40}$/i.test( elem.value ) )
		{
			args[argI] = elem.value;
			elem.style.removeProperty("color");
			return elem.value;
		}
		
		elem.style.color = "red";
		return false;
	}
	
	//Creates the input element for an element and sets up the appropriate settings/listeners
	function setupArg( oldSettings, tweak, argI, elem )
	{
		//Let the starting value be the custom setting, or default if nothing set
		var currentValue = oldSettings[ tweak.name ].args ? oldSettings[ tweak.name ].args[argI] : tweak.args[argI].value;
		if( typeof( tweak.args[argI].value ) == "boolean" )
		{
			//Checkbox
			elem = elem.appendChild( createElementX({ tag:"input", type:"checkbox", title:tweak.args[argI].desc }) );
			elem.checked = currentValue;
			tweak.args[argI].set = function(reset)
			{
				var settings = MS_getValue( "settings" );
				if( !settings[ tweak.name ].args )
				{
					//Populate custom settings with the default arguments
					settings[ tweak.name ].args = defaultArgs( tweak );
				}
				
				if( reset === true )
				{
					//Set to default value and delete the custom settings
					elem.checked = tweak.args[argI].value;
					settings[ tweak.name ] = { enable:tweak.enable, version:tweak.version };
				}
				else settings[ tweak.name ].args[argI] = elem.checked;
				MS_setValue( "settings", settings, -1 );
			};
			elem.addEventListener( "click", tweak.args[argI].set, false );
		}
		else if( typeof( tweak.args[argI].value ) == "number" )
		{
			if( !tweak.args[argI].setValid )
				tweak.args[argI].setValid = validNumber;
			
			elem = elem.appendChild( createElementX({ tag:"input", type:"text", title:tweak.args[argI].desc }) );
			elem.value = currentValue;
			
			tweak.args[argI].set = function(reset)
			{
				var value, settings = MS_getValue( "settings" );
				
				if( !settings[ tweak.name ].args )
					settings[ tweak.name ].args = defaultArgs( tweak );
				if( reset === true )
				{
					settings[ tweak.name ] = { enable:tweak.enable, version:tweak.version };
					elem.value = tweak.args[argI].value;
					elem.style.removeProperty("color");//Assume default arguments are valid
				}
				else tweak.args[argI].setValid( elem, settings[ tweak.name ].args, argI );
				
				MS_setValue( "settings", settings, -1 );
			};
			elem.addEventListener( "input", tweak.args[argI].set, false );
		}
		else if( typeof( tweak.args[argI].value ) == "string" )
		{
			if( tweak.args[argI].elem == "input" )
			{
				elem = elem.appendChild( createElementX({ tag:"input", type:"text", title:tweak.args[argI].desc }) );
				
				//Size element to fit the contents
				elem.addEventListener( "input", function() { elem.setAttribute("size", elem.value.length + 5); }, false );
				elem.setAttribute("size", currentValue.length + 5);
			}
			else
			{
				//Size to fit, with a timeout since hidden elements don't have a height
				elem = elem.appendChild( createElementX({ tag:"textarea", type:"text", style:"display: inline-block; width:95%; height:20px", title:tweak.args[argI].desc }) );
				setTimeout( function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight, 20 ) + "px"; }, 0 );
				elem.addEventListener( "input", function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight ) + "px"; }, false );
			}
			elem.value = currentValue;
			
			tweak.args[argI].set = function(reset)
			{
				var settings = MS_getValue( "settings" );
				
				if( !settings[ tweak.name ].args )
					settings[ tweak.name ].args = defaultArgs( tweak );
				if( reset === true )
				{
					settings[ tweak.name ] = { enable:tweak.enable, version:tweak.version };
					elem.value = tweak.args[argI].value;
					elem.style.removeProperty("color");
				}
				else if( tweak.args[argI].setValid )
					tweak.args[argI].setValid( elem, settings[ tweak.name ].args, argI );
				else
					settings[ tweak.name ].args[argI] = elem.value;//No validation function, assume valid
					
				MS_setValue( "settings", settings, -1 );
			}
			elem.addEventListener( "input", tweak.args[argI].set, false );
		}
		else if( typeof( tweak.args[argI].value ) == "object" )
		{
			if( !tweak.args[argI].setValid )
				tweak.args[argI].setValid = validJSON;
			
			elem = elem.appendChild( createElementX({ tag:"textarea", type:"text", style:"display: inline-block; width:95%; height:20px", title:tweak.args[argI].desc }) );
			setTimeout( function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight, 20 ) + "px"; }, 0 );
			
			//Insert spaces to help with linebreaking
			elem.value = JSON.stringify( currentValue, null, 1 ).replace(/\s+/g,' ');
			
			tweak.args[argI].set = function(reset)
			{
				var settings = MS_getValue( "settings" );
				if( !settings[ tweak.name ].args )
					settings[ tweak.name ].args = defaultArgs( tweak );
				if( reset === true )
				{
					settings[ tweak.name ] = { enable:tweak.enable, version:tweak.version };
					elem.value = JSON.stringify( tweak.args[argI].value, null, 1 ).replace(/\s+/g,' ');
					elem.style.removeProperty("color");
				}
				else tweak.args[argI].setValid( elem, settings[ tweak.name ].args, argI );
				
				elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight) + "px";
				MS_setValue( "settings", settings, -1 );
			}
			elem.addEventListener( "input", tweak.args[argI].set, false );
		}
		else tweak.args[argI].set = function(){ GM_log("No setter for type "+typeof( tweak.args[argI].value )+" ("+tweak.name+")"); }
	}
	
	var tweaks =
	[
		{ name:"Metasettings", enable:false, desc:"Settings affecting the script's operation as a whole.", func:metaSettings, version:0, args:[{ desc:"Check for script updates once a day (requires GM_xmlhttpRequest)", value:true }, { desc:"Display alerts if tweaks fail", value:false } ] },
		{ name:"Add Style", enable:false, desc:"Adds CSS styles to all pages.", func:MS_addStyle, version:0, args:[{ desc:"Styles to add", value:"a:link, a:visited { color:#00688B; }\na:hover { color:#53bddb }\na.blue_pill { color:#FFFFFF ! important }" }] },
		{ name:"Fix Page Titles", enable:false, desc:"Fixes the page titles to display content relevant to the actual page contents, instead of simply \"Life's a Glitch TV\".", func:fixPageTitles, version:0, args:[{ desc:"Remove \"LAGTV - \" from the titles", value:false }, { desc:"Verbose Titles", value:false }, { desc:"Display Page Number", value:true } ]},
//		{ name:"Multiquote", enable:false, desc:"Enables the multiquote function on forums.", func:multiquote, version:0, args:[{ desc:"Insert \"<Username> said:\" above each quote", value:false }, { desc:"Timestamps", value:false } ]},
		{ name:"Quick Reply", enable:false, desc:"Adds a quick reply box to the bottom of every forum page. (Firefox only)", func:quickReply, version:0, args:[{ desc:"Show by default", value:true } ]},
	];
	
	var i, settings = MS_getValue( "settings", {} ), changed = false;
	
	for( i = 0; i < tweaks.length; i++ )
	{
		if( !settings[ tweaks[i].name ] || settings[ tweaks[i].name ].version != tweaks[i].version )
		{
			settings[ tweaks[i].name ] = { enable:tweaks[i].enable, version:tweaks[i].version };
			changed = true;
		}
		
		try{
			if( settings[ tweaks[i].name ].args )
			{
				//Custom settings exist.  Run tweak if enabled
				if( settings[ tweaks[i].name ].enable )
					tweaks[i].func.apply( this, settings[ tweaks[i].name ].args );
			}
			else if( tweaks[i].enable )
			{
				//No custom settings, run with default arguments if enabled by default
				tweaks[i].func.apply( this, defaultArgs( tweaks[i] ) );
			}
		}
		catch(e) { if( showError ) MS_alert("Error ("+tweaks[i].name+"): "+e); }
	}
	
	if( changed )
		MS_setValue( "settings", settings, -1 );
	
	var navbar = !recursion && document.getElementsByClassName("nav pull-left")[0];
	var content = navbar && document.getElementsByClassName("container content")[0];
		if( content )
		{
		var settingsLink = navbar.appendChild( createElementX({ tag: "li" }) ).appendChild( createElementX({ tag: "a", text: "Settings" }) );
		var settingsDiv = content.parentNode.insertBefore( createElementX({ tag:"div", style:"display:none; padding:50px 20px 30px 20px; width:940px; margin-left:auto;  margin-right:auto;", id:"tweaks_settings" }), content );
		
		settingsLink.addEventListener( "mousedown", function()
		{
			if( content.style.display == "none" )
			{
				//Closing settings.  Destroy the contents and unhide the original content.
				settingsDiv.textContent = "";
				content.style.display = "block";
				settingsDiv.style.display = "none";
			}
			else
			{
				//Opening settings.  Hide the current content and reconstruct the GUI from scratch.
				var settings = MS_getValue( "settings", {} );
				
				settingsDiv.appendChild( createElementX({ tag:"h4" }) ).appendChild( createElementX({ tag:"a", href:"http://userscripts.org/scripts/show/152348", text:"LagTV Tweaks", style:"color:black;" }, " settings") );
				settingsDiv.appendChild( createElementX( { tag:"hr" }, "Script UI taken from ", { tag:"a", href:"http://userscripts.org/scripts/show/152348", text:"Mango"}, "'s ", { tag:"a", href:"https://userscripts.org/scripts/show/27776", text:"Danbooru Miscellaneous Tweaks"}, " Script.", { tag:"br" }, "Have suggestions for new tweaks or code to contribute? Leave some feedback at ", { tag:"a", href:"http://userscripts.org/scripts/show/152348", text:"http://userscripts.org/scripts/show/152348" }, "!", { tag:"hr" }) );
				
				var table = settingsDiv.appendChild( createElementX({ tag:"table", class:"highlightable", width:"100%" }) );
				
				var resetAll = false;
				var resetButtons = [];
				
				//Clear old unused settings
				for( sName in settings )
				{
					for( var i = 0; i < tweaks.length && sName != tweaks[i].name; i++ );
					if( i == tweaks.length )
					{
						GM_log("Deleting old setting: "+sName);
						delete settings[sName];
						MS_setValue( "settings", settings, -1 );
					}
				}
				
				for( var i = 0; i < tweaks.length; i++ )
				{
					var reset, check, title, body, tr = table.appendChild( createElementX({ tag:"tr" }) );
					
					//Button to reset to default settings
					reset = tr.appendChild( createElementX({ tag:"td", width:"1%" }) ).appendChild( createElementX({ tag:"button", title:"Reset to default settings for this tweak.", text:"Reset" }) );
					resetButtons.push( reset );
					
					//Checkbox to toggle tweak
					check = tr.appendChild( createElementX({ tag:"td", width:"1%" }) ).appendChild( createElementX({ tag:"input", type:"checkbox", title:"Toggle this tweak." }) );
					check.checked = ( settings[ tweaks[i].name ].args ? !!settings[ tweaks[i].name ].enable : !!tweaks[i].enable );
					
					//Tweak description and arguments
					body = tr.appendChild( createElementX({ tag:"td" }) );
					title = body.appendChild( createElementX({ tag:"b", text:tweaks[i].name }) );
					title.style.setProperty( "text-decoration", check.checked ? "none" : "line-through" );
					
					body.appendChild( createElementX(": "+tweaks[i].desc) );
					
					//When the Reset button is clicked, delete any custom settings for it and fall back on defaults.
					reset.addEventListener( "click", (function(tweak,check){ return function()
					{
						if( !resetAll && !confirm("Reset this tweak?") )
							return;
						if( !!check.checked != !!tweak.enable )
							check.click();
						for( var i = 0; i < tweak.args.length; i++ )
							tweak.args[i].set(true);
					}; })( tweaks[i], check ), false );
					
					//When checkbox is clicked, toggle the title strikethrough and save settings
					check.addEventListener( "click", (function(tweak,title){ return function()
					{
						var settings = MS_getValue( "settings" );
						
						title.style.setProperty( "text-decoration", (settings[ tweak.name ].enable = this.checked) ? "none" : "line-through" );
						if( !settings[tweak.name].args )
							settings[tweak.name].args = defaultArgs( tweak );
						MS_setValue( "settings", settings, -1 );
					}; })(tweaks[i],title), false );
					
					//If the tweak takes arguments, create the appropriate input elements and listeners.
					if( tweaks[i].args.length )
					{
						var list = body.appendChild( createElementX({ tag:"ul" }) );
						for( var j = 0; j < tweaks[i].args.length; j++ )
							setupArg( settings, tweaks[i], j, list.appendChild( createElementX({ tag:"li", text:tweaks[i].args[j].desc+": " }) ) );
					}
				}
				settingsDiv.appendChild( createElementX({ tag:"hr" }) );
				
				//"Export" button
				settingsDiv.appendChild( createElementX({ tag:"input", type:"button", value:"Export", title:"Save settings to file.  There is no import option." }) ).addEventListener( "click", function()
				{
					try{ window.location ="data:application/octet-stream,"+escape( JSON.stringify( MS_getValue( "settings" ), null, 1 ).replace(/\s+/g,' ') ); }
					catch(err){}
				}, false );
				
				//"Reset All Tweaks" button
				var resetAllButton = settingsDiv.appendChild( createElementX({ tag:"input", type:"button", value:"Reset All Tweaks", title:"Reset all settings." }) ).addEventListener( "click", function()
				{
					if( confirm("Reset all tweaks?") )
					{
						resetAll = true;
						for( var i = 0; i < resetButtons.length; i++ )
							resetButtons[i].click();
						resetAll = false;
					}
				}, false );
				
				//"Delete All Variables" button
				var resetAllButton = settingsDiv.appendChild( createElementX({ tag:"input", type:"button", value:"Delete All Variables", title:"Reset all settings." }) ).addEventListener( "click", function()
				{
					if( confirm("WARNING: This will delete all variables associated with this script.") && confirm("...Really?") )
					{
						var varList = GM_listValues();
						while( varList.length > 0 )
							GM_deleteValue( varList.pop() );
						settingsLink.click();
					}
				}, false );
				
				content.style.display = "none";
				settingsDiv.style.display = "block";
			}
		}, false );
	}
}

function initialize()
{
	if( typeof(unsafeWindow) == "undefined" )
		var unsafeWindow=window;
	if( typeof(GM_getValue) == "undefined" || GM_getValue('a', 'b') == undefined )
	{
		GM_log = console.log || function() { };
		
		//http://userscripts.org/topics/41177
		GM_deleteValue = function(a){ localStorage.removeItem("lagtv_miscellaneous."+a); }
		GM_openInTab = function(a){ return window.open(a,a); }
		GM_getValue = function(name, defaultValue)
		{
			var value = localStorage.getItem("lagtv_miscellaneous."+name);
			if( !value )
				return defaultValue;
			
			var type = value[0];
			value = value.substring(1);
			
			if( type == 'b' )
				return value == 'true';
			else if( type == 'n' )
				return Number(value);
			return value;
		}
		GM_setValue = function(name, value)
		{
			value = (typeof value)[0] + value;
			localStorage.setItem("lagtv_miscellaneous."+name, value);
		}
		GM_listValues = function()
		{
			var i, j = 0, list = new Array(localStorage.length);
			for( i = 0; i < localStorage.length; i++ )
				if( /^lagtv_miscellaneous/.test( localStorage.key(i) ) )
					list[j++] = localStorage.key(i).replace(/^lagtv_miscellaneous./,'');
			return list;
		}
		GM_xmlhttpRequest = function(obj)
		{
			//Unlike the Greasemonkey function, XMLHttpRequest can't access sites outside LagTV
			if( !/^http:..[^.]+.lag.tv\//.test(obj.url) )
				return;
			
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if( obj.onreadystatechange )
					obj.onreadystatechange( request );
				if( request.readyState == 4 && obj.onload )
					obj.onload( request );
			}
			request.onerror = function()
			{
				if( obj.onerror )
					obj.onerror( request );
			}
			try {
				request.open( obj.method, obj.url, true );
			} catch(e) {
				if( obj.onerror )
					obj.onerror( { readyState:4, responseHeaders:'', responseText:'', responseXML:'', status:403, statusText:'Forbidden'} ); 
				return;
			}
			if( obj.headers )
				for( name in obj.headers )
					request.setRequestHeader( name, obj.headers[name] );
			
			request.send( obj.data );
			return request;
		}
	}
	
	showError = false;
 	recursion = (window != window.top);
	loginID = MS_getValue("loginID");
	login = document.cookie.search("login=(.+?)(;|$)") < 0 ? null : document.cookie.match("login=(.+?)(;|$)")[1];
	pass_hash = document.cookie.search("pass_hash=(.+?)(;|$)") < 0 ? null : document.cookie.match("pass_hash=(.+?)(;|$)")[1];
	content = document.getElementById("content");
	
	if( typeof(custom) != "undefined" )
		custom();
}

function metaSettings(aUpdateCheck, aShowError)
{
	if( aUpdateCheck )
		updateCheck();

	showError = aShowError;
}




/**
	Checks for script updates.
 */
function updateCheck()
{
	var scriptNum = 152348;
	
	//Only check for update if using Greasemonkey and no check has been made in the last day.
	if( !MS_getValue('checked_update') )
	{
		MS_setValue( 'checked_update', true, 24*3600 );
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+scriptNum+'.meta.js?'+new Date().getTime(),
			headers: { 'Cache-Control': 'no-cache' },
			onload: function(response)
			{
				var localVersion = parseInt( GM_getValue( 'local_version', 0 ) );
				var remoteVersion = parseInt( /@uso:version\s*([0-9]+?)\s*$/m.exec(response.responseText)[1] );
				
				if( !localVersion || remoteVersion <= localVersion )
					GM_setValue( 'local_version', remoteVersion );
				else if( confirm( 'There is an update available for the Greasemonkey script "'+/@name\s*(.*?)\s*$/m.exec(response.responseText)[1]+'".\nWould you like to go to the install page now?' ) )
				{
					GM_openInTab( 'http://userscripts.org/scripts/show/'+scriptNum );
					GM_setValue( 'local_version', remoteVersion );
				}
			},
		});
	}
}

//=====================================================================================
//=============================== HELPER FUNCTIONS ====================================
//=====================================================================================


function nbsp(count)
{
	var result = "";
	while( count-- > 0 )
		result += "\u00a0";
	return result;
}

function createElementX(obj)
{
	if( arguments.length > 1 || (arguments = obj) instanceof Array )
	{
		var fragment = document.createDocumentFragment();
		for( var i = 0; i < arguments.length; i++ )
			fragment.appendChild( createElementX( arguments[i] ) );
		return fragment;
	}
	
	if( obj instanceof Element )
		return obj;
	else if( typeof(obj) == "string" )
		return document.createTextNode(obj);
	else if( !obj.tag )
	{
		if( elem in obj )
			return document.createTextNode(""+obj);
		return document.createDocumentFragment();// {}
	}
	
	var elem = document.createElement(obj.tag);
	for( var key in obj )
	{
		if( key == "text" )
			elem.textContent = obj[key];
		else if( key != "tag" )
			elem.setAttribute(key, obj[key]);
	}
	return elem;
}

function MS_setValue( key, value, expires, memObj )
{
	//If 0 or less, value never expires
	if( expires > 0 )
		expires = Math.floor( new Date().getTime()/1000 + expires );
	else
		expires = 0;
	
	var i, keyList = [];
	
	if( !memObj )
	{
		GM_setValue( key, JSON.stringify({ "value": value, "expires": expires }) );
		try{ keyList = MS_parseJSON( GM_getValue( "Miscellaneous.keyList" ) ) || []; }
		catch(err){ keyList = []; }
	}
	else
	{
		keyList = memObj.keyList = MS_parseJSON( memObj.keyList ) || [];
		memObj[key] = { "value": value, "expires": expires };
		MS_setMemObj( memObj, "MS_setValue" );
	}
	
	if( !(keyList instanceof Array) )
		throw "MS_setValue(): Invalid keyList ("+typeof(keyList)+"): "+keyList;
	
	//Find insertion point, deleting duplicates along the way
	for( i = 0; i < keyList.length && keyList[i].expires <= expires; i++ )
		if( keyList[i].key == key )
			keyList.splice( i--, 1 );
	keyList.splice( i, 0, { "key":key, "expires":expires });
	
	if( !memObj )
		GM_setValue( "Miscellaneous.keyList", JSON.stringify(keyList) );
}

function MS_getValue( key, defaultValue, memObj )
{
	if( !memObj && typeof(defaultValue) == "object" && defaultValue.saveName )
	{
		memObj = defaultValue;
		defaultValue = null;
	}
	if( memObj )
	{
		if( !memObj[key] || ( memObj[key].expires > 0 && memObj[key].expires < new Date().getTime()/1000 ) )
			return defaultValue;
		return memObj[key].value;
	}
	
	var value = GM_getValue( key );
	
	if( !value )
		return defaultValue;
	
	try{ value = MS_parseJSON( value ); }
	catch(e) { return defaultValue; }
	
	if( value.expires > 0 && value.expires < new Date().getTime()/1000 )
		return defaultValue;
	
	return value["value"];
}

function MS_deleteValue( key, memObj )
{
	var keyList;
	if( memObj )
		keyList = memObj.keyList = MS_parseJSON( memObj.keyList ) || [];
	else
	{
		try{ keyList = MS_parseJSON( GM_getValue( "Miscellaneous.keyList" ) ) || []; }
		catch(err){ keyList = []; }
	}
	
	if( !(keyList instanceof Array) )
		throw "MS_deleteValue(): Invalid keyList ("+typeof(keyList)+"): "+keyList;
	
	var now = new Date().getTime()/1000;
	
	for( var i = keyList.length - 1; i >= 0; i-- )
		if( keyList[i].key == key )
		{
			keyList.splice(i,1);
			
			if( !memObj )
			{
				GM_deleteValue( key );
				GM_setValue( "Miscellaneous.keyList", JSON.stringify(keyList) );
			}
			else
			{
				delete memObj[key];
				MS_setMemObj( memObj, "MS_deleteValue" );
			}
		}
}

function MS_clearValues(num, memObj)
{
	if( num <= 0 )
		return;
	
	var keyList;
	if( memObj )
		keyList = memObj.keyList = MS_parseJSON( memObj.keyList ) || [];
	else
	{
		try{ keyList = MS_parseJSON( GM_getValue( "Miscellaneous.keyList" ) ) || []; }
		catch(err){ keyList = []; }
	}
	var now = new Date().getTime()/1000;
	var oldLen = keyList.length;
	
	for( var i = 0; num > 0 && i < keyList.length && keyList[i].expires < now; i++ )
		if( keyList[i].expires > 0 )
		{
			num--;
			GM_deleteValue( keyList.splice( i--, 1 )[0].key );
		}
	
	if( oldLen != keyList.length && !memObj )
		GM_setValue( "Miscellaneous.keyList", JSON.stringify(keyList) );
} MS_clearValues(1);

function MS_setMemObj(obj,func)
{
	if( obj._timer != null )
		clearTimeout( obj._timer );
	obj._timer = setTimeout( function()
	{
		delete obj._timer;
		MS_clearValues( 20, obj );
		MS_setValue( obj.saveName, obj, obj.expires );
	}, 1500 );
}

function MS_parseJSON(text)
{
	if( text instanceof Array )
	{
		//Parse all elements in arrays of strings
		for( var i = 0; i < text.length && typeof(text[i]) == "string"; i++ )
			try{ text[i] = MS_parseJSON( text[i] ); }
			catch(err){ throw "Bad JSON in text["+i+"]: "+text[i]; }
		return text;
	}
	else if( typeof(text) == "string" ) return JSON.parse(text, function(key,val)
	{
		//Recursively parse strings that look like objects
		if( typeof(val) == "string" )
		{
			try{ return MS_parseJSON(val); }
			catch(err){}
		}
		return val;
	});
	//Not a string or array, so return unchanged
	return text;
}

function MS_addStyle(text)
{
	if( text instanceof Array )
	{
		for( var i = 0; i < text.length; i++ )
			MS_addStyle( text[i].style ? text[i].style : text[i] );
	}
	else if( typeof(text) == "string" )
	{
		var style = createElementX({ tag:'style', type:'text/css' });
		style.innerHTML = text;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	else throw "MS_addStyle(): Invalid type: "+text;
}
 
function MS_alert( messageP )
{
	//Creates a large "alert" box that collects multiple alerts and doesn't pause the script
	var showAlerts = true;
	var dialog = document.body.appendChild( createElementX({ tag:"div", style:"position:fixed; left:10%; top:10%; z-index:10;	background-color:white;	display:none; width:20em; height:20em; border:2px solid black; padding:20px 20px 20px 20px; overflow:auto" }) );
	
	var header = dialog.appendChild( createElementX({ tag:"h4", text: "Miscellaneous Tweaks " }) );
	dialog.appendChild( createElementX({ tag:"hr" }) );
	var text = dialog.appendChild( createElementX({ tag:"div" }) );
	
	header.appendChild( createElementX({ tag:"input", type:"button", value:"Clear", title:"Clear all warnings and hide this alert." }) ).addEventListener( "click", function(){ dialog.style.display = "none"; text.innerHTML = ""; } );
	header.appendChild( createElementX(" ") );
	header.appendChild( createElementX({ tag:"input", type:"button", value:"Hide", title:"Hide this alert without clearing its contents." }) ).addEventListener( "click", function(){ dialog.style.display = "none"; } );
	header.appendChild( createElementX(" ") );
	header.appendChild( createElementX({ tag:"input", type:"button", value:"Stop", title:"Stop additional alerts from being triggered." }) ).addEventListener( "click", function(){ showAlerts = false; } );
	
	MS_alert = function(message)
	{
		if( showAlerts )
		{
			text.appendChild( createElementX( ""+message, { tag:"hr" }) );
			dialog.style.display = "block";
			dialog.style.width = "80%";
			dialog.style.height = "60%";
		}
	}
	MS_alert(messageP);
}

function MS_observeInserts(funcP)
{
	if( !content || recursion )
		return funcP;
	
	//Listen to node insertions only under id=content node
	var funcList = [ ];
	function mutateManager(e)
	{
		for( var i = 0; i < funcList.length; i++ )
		{
			try{ funcList[i](e); }
			catch(err){ GM_log("Tweaks - Insertion error - "+funcList[i].toString().replace(/\(.*/,'()')+": "+err); }
		}
	}
	
	var MutObj = window.MutationObserver || window.WebKitMutationObserver;//Firefix and Chrome but not Opera
	if( MutObj )
	{
		var monitor = new MutObj( function(mutationSet){
			mutationSet.forEach( function(mutation){
				for( var i = 0; i < mutation.addedNodes.length; i++ )
					if( mutation.addedNodes[i].nodeType == 1 )
						mutateManager({ "target":mutation.addedNodes[i] });
			});
		});
		monitor.observe( content, { childList:true, subtree:true } );
	}
	else content.addEventListener( "DOMNodeInserted", mutateManager, false );
	
	MS_observeInserts = function(func)
	{
		if( !content || recursion )
			return function(){};
		funcList.push( func );
		return func;
	};
	return MS_observeInserts(funcP);
}

/**
	Fixes the page titles on lag.tv to display something other than "Life's a Glitch TV". 
 */
function fixPageTitles( aNoLAGTV, aVerbose, aPaginator )
{
    var leader = '';
    var tempString = '';
	var pageNumber = '';
	if ( !aNoLAGTV )
	{
		if ( aVerbose )
		{ 
			leader = 'Life\'s a Glitch TV \u00BB ';
		}
		else
		{
			leader = 'LAGTV \u00BB ';
		}
	}
	tempString = document.getElementsByTagName("h2")[0].innerHTML.trim().replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
	if ( document.getElementsByTagName("h1")[0] != null )
	{
	tempString = document.getElementsByTagName("h1")[0].innerHTML.trim().replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
	} 
	else if ( document.getElementById("info") != null )
	{
	tempString = 'Profile for ' + document.getElementById("info").getElementsByTagName("h2")[0].innerHTML.trim().replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
	}
	if ( document.getElementsByClassName("active")[0] != null && aPaginator )
	{
	pageNumber = ' \u00BB Page ' + document.getElementsByClassName("active")[0].innerHTML.trim().replace(/<\/?[a-z][a-z0-9]*[^<>]*>/ig, "");
	} 
	if ( !aVerbose ) 
	{
	tempString = tempString.split("\u00BB").pop();
	}
	document.title = leader + tempString + pageNumber;
}

/**
	Adds a multiquote button to every post. Not yet implemented.
 */
/* function multiquote( aUserName, aTimestamp )
{
	if ( document.getElementsByClassName("locked")[0] == null )
	{
		var buttons = document.getElementsByClassName("actions"); 
		
		for( i = 0; i < buttons.length; i++ )
		{
			var quoteButton = buttons[i].appendChild( createElementX({ tag: "li" }) ).appendChild( createElementX({ tag: "a", text: "MultiQuote" }) );
			quoteButton.addEventListener( "mousedown", function()
			{
			}, false );
		}

	}
}
*/

/**
	Adds a quick reply button and form to the bottom of every page. 
 */
function quickReply( aShowByDefault )
{
	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	
	// Chrome does not execute scripts in the same order as Greasemonkey, making Quick Reply broken in Chrome. 
	if ( is_chrome ) 
		return;
		
	var bottomControls = document.getElementsByClassName("bottom_controls")[0];
	if ( bottomControls != null )
	{
			unsafeWindow.console.log("Fired");

		var quickReplyButton = bottomControls.appendChild( createElementX({ tag: "a", class:"btn", text: "Quick Reply" }) );
		var quickReplyDiv = bottomControls.parentNode.appendChild( createElementX({ tag:"div", style:"display:none;", id:"quick_reply_box" }) );
		quickReplyDiv.textContent = "";		
		quickReplyDiv.innerHTML = 	'<form accept-charset="UTF-8" action="/forums/topics/' + window.location.href.split('/topics/')[1].split('?')[0] + '/posts" class="simple_form new_post" id="new_post" method="post" novalidate="novalidate"><div style="margin:0;padding:0;display:inline"><input name="utf8" value="?" type="hidden"><input name="authenticity_token" value="' + getAuthToken() + '" type="hidden"></div>' + 
									'  <div class="row">' + 
									'  <div class="span9">' +
									'  <div class="control-group text required success"><textarea rows="20" name="post[text]" id="post_text" cols="40" class="text required" style="display: none;"></textarea></div>' +
									'  </div>' +
									'  <div class="span3">' + 
									'    <div class="emoji_help">' + 
									'      <h3>Emoji</h3>' + 
									'      <p><a href="http://www.emoji-cheat-sheet.com/" target="_blank">Full list here</a>.</p>' + 
									'    </div>' + 
									'  </div>' + 
									'</div>' + 
									'  <input class="btn btn btn-primary" name="commit" value="Post Reply" type="submit">' + 
									'</form>';
									
		if ( aShowByDefault ) 
		{
			quickReplyDiv.style.display = "block";
		}
			
		quickReplyButton.addEventListener( "mousedown", function()
		{
			if( quickReplyDiv.style.display == "none" )
			{
					quickReplyDiv.style.display = "block";
			}
			else
			{
					quickReplyDiv.style.display = "none";
			}
		}, false );
	}
}

function getAuthToken() { 
   var token = document.getElementsByName('csrf-token')[0].getAttribute("content"); 
   return token;
} 
