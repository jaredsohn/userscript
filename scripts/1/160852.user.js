// ==UserScript==
// @name           DANBORU - Miscellaneous Tweaks
// @namespace      http://userscripts.org/scripts/show/27776
// @description    Adds a variety of useful tweaks to Danbooru, each of which can be easily disabled.
// @include        http://danbooru.donmai.us/*
// @include        http://hijiribe.donmai.us/*
// @include        http://sonohara.donmai.us/*
// @include        http://www.donmai.us/*
// @include        http://donmai.us/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// @grant          GM_openInTab
// @version        2013.03.03
// ==/UserScript==

/*
	Settings are modified by clicking the "Tweaks" link at the right end of the navbar on most pages.  You do not
	need to modify the script itself.
*/

var showError, recursion, login, pass_hash, loginID, content, navbar, subnavbar;
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
	
	//Validates query array of a single tag subscription
	function validTagSub(elem, args, argI)
	{
		/* Value: [ { search:!="", pages:1..1000 }, ... ] } */
		try{
			var i, json = MS_parseJSON( elem.value );
			if( json[0].search.indexOf(".json") < 0 )
			{
				for( i = 0; i < json.length && json[i].search.length > 0 && json[i].pages >= 0 && json[i].pages <= 1000; i++ );
				if( i == json.length )
				{
					args[argI] = json;
					elem.style.removeProperty("color");
					return json;
				}
			}
		}
		catch(err){}
		
		elem.style.color = "red";
		return false;
	}
	
	function validTagSubArray(elem, args, argI)
	{
		/* Value: [ { title:>"", refresh:>0, thumbs:>=0, queries:[ { search:!="", pages:1..1000 }, ... ] }, ...] */
		try{
			var i, call, json = MS_parseJSON( elem.value );
			
			for( call = 0; call < json.length && json[call].title && json[call].refresh > 0 && json[call].thumbs >= 0 && json[call].queries[0].search.indexOf(".json") < 0; call++ )
			{
				for( i = 0; i < json[call].queries.length && json[call].queries[i].search.length > 0 && json[call].queries[i].pages >= 0 && json[call].queries[i].pages <= 1000; i++ );
				if( i != json[call].queries.length )
					break;
			}
			if( call && call == json.length )
			{
				args[argI] = json;
				elem.style.removeProperty("color");
				return json;
			}
		}
		catch(err){}
		
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
			
			if( tweak.args[argI].desc.length )
				elem.appendChild( createElementX({tag:"br"}) );
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
	
	var defaultAddStyle =
		'/* Hide the Danbooru header */\n'+
		'header h1 { display: none }\n'+
		'\n'+
		'/* Hide footers */\n'+
		'footer { display: none }\n'+
		'\n'+
		'/* Hide the post search Go button */\n'+
		'*#search-box form input[type="submit"] { display: none }\n'+
		'\n'+
		'/* Increase the space above the navbar */\n'+
		'menu.main { margin-top: 15px }\n'+
		'\n'+
		'/* Reduce height between thumbnail blocks on profile pages */\n'+
		'div#c-users div#a-show div.box { margin-bottom: 0em; }\n'+
		'\n'+
		'/* Make font size more uniform */\n'+
		'body { font-size: 80% }\n'+
		'textarea { font-size: 1.2em }\n'+
		'\n'+
		'/* Increase the space around thumbnails */\n'+
		'.post-preview { min-height: 170px; min-width: 160px; }\n'+
		'\n'+
		'/* Reduce padding around post status notices */\n'+
		'div#c-posts div#a-show #pool-nav, div#c-posts div#a-show #search-seq-nav, div#c-posts div#a-show #nav-help { margin: 0px 0px 0.5em 0px; }\n'+
		'div#c-posts div.nav-notice { padding: 0.5em; }\n'+
		'div#c-posts div.notice { padding: 0.5em; margin-bottom: 0.5em; }\n'+
		'\n'+
		'/* Allow content to fill up the entire screen */\n'+
		'div.dtext-preview { width: 100% }\n'+
		'div.list-of-forum-posts article div.author { width: 15%; word-wrap: break-word }\n'+
		'div.list-of-forum-posts article div.content { width: 80% }\n'+
		'div.comments-for-post { width: 80% }\n'+
		'div.comments-for-post div.list-of-comments article.comment div.author { word-wrap: break-word; width: 20% }\n'+
		'div.comments-for-post div.list-of-comments article.comment div.content { width: 75% }\n'+
		'div.prose { max-width: 100% }\n'+
		'form.simple_form div.input textarea { width: 100% }\n'+
		'form.simple_form div.input input[type="text"] { width: 80% }\n'+
		'div#c-artists div#a-show { max-width: 100% }\n'+
		'div#c-posts section#content { width: 80%; padding-left: 1em  }\n'+
		'div#c-posts div#a-index div#posts { max-width: 100% }\n'+
		'div#c-pools p { width: auto }\n'+
		'div#c-pools section#content { width: 100%; padding-left: 0 }\n';
	
	var tweaks =
	[
		{ name:"Metasettings", enable:false, desc:"Settings affecting the script's operation as a whole.", func:metaSettings, version:1, args:[{ desc:"Check for script updates once a day (requires GM_xmlhttpRequest)", value:true }, { desc:"Password hash (SHA-1 of \"choujin-steiner--yourpassword--\")", value:pass_hash, elem:"input", setValid:validSHA1 }, { desc:"Display alerts if tweaks fail", value:false } ] },
				
		{ name:"Arrow Key Navigation", enable:false, desc:"Enables navigation to previous/next pages using the left/right keys.  No page change occurs if Alt/Ctrl/Shift is also being held down or if an input/textarea has focus.", func:arrowKeyNavigation, version:1, args:[{ desc:"Enable on 'Popular By' pages", value:true }, { desc:"Enable on pages with paginators", value:true }, { desc:"Enable for pools (nothing will happen if the last pool used doesn't continue in the requested direction but more than one other pool does)", value:true }] },
		
		{ name:"Change +/- Links", enable:false, desc:"Adds +/- tag links when the taglist doesn't have them.", func:changePlusMinusLinks, version:1, args:[{ desc:"Make links add/remove tags from search box instead of launching new searches", value:true }] },
		
		{ name:"Custom Taglist", enable:false, desc:"Adds a new taglist section below tag lists, complete with +/- links.  Tag types are supported.", func:customTaglist, version:0, args:[{ desc:"Title of list", value:"Custom Tags", elem:"input" }, { desc:"Tags", value:[ 'art:bomber_grape', 'char:maribel_hearn', 'copy:hidamari_sketch', 'harlem_shake', 'order:score', 'rating:e', 'rating:q', 'rating:s', 'status:deleted', 'status:any', 'fav:'+login, 'user:'+login, 'source:*.pixiv.*', 'arttags:0', 'chartags:1', 'copytags:1', 'gentags:1' ] }] },
		
		{ name:"Hide User Statistics", enable:false, desc:"", func:hideUserStatistics, version:0, args:[{ desc:"Stats to remove from your profile", value:[ "Statistics", "Inviter", "Approvals" ] }, { desc:"Stats to remove from others' profiles", value:[ "Inviter" ] }] },
		
		{ name:"Navbar Links", enable:false, desc:"Adds links to the left side of the navbar.", func:navbarLinks, version:0, args:[{ desc:"", value:[{ text:"Upload", href:"/uploads/new" }, { text:"IQDB", href:"http://danbooru.iqdb.org/" }] }] },
		
		{ name:"Navbar Tag Search", enable:false, desc:"Adds/moves the post search box to the navbar.", func:navbarTagSearch, version:1, args:[{ desc:"Move the post search box when it exists", value:true }, { desc:"Add to subnavbar instead of navbar", value:true }] },
		
		{ name:"Pool Bars", enable:false, desc:"Merge and relocate the search/pool bars on post pages.", func:poolBars, version:0, args:[{ desc:"Move the pool bar above the image", value:true }] },
		
		{ name:"Score Thumbnails", enable:false, desc:"Displays scores and favorite counts below thumbnails.", func:scoreThumbnails, version:0, args:[ { desc:"Show score", value:true }, { desc:"Minutes to keep favcount in cache (0 = no favcount)", value:0, setValid:validNumber(0) } ] },
		
		{ name:"Show Parent/Child Thumbnails", enable:false, desc:"Displays the thumbnails of child/parent posts in their status bar.", func:showParentChildThumbs, version:0, args:[{ desc:"Max number of thumbnails to display", value:10 }, { desc:"Move the parent/child bar below the image", value:true }] },
		
		{ name:"Style User Levels", enable:false, desc:"Applies styles to links to user pages depending on their level.", func:styleUserLevels, version:1, args:[ { desc:"Days to cache each user level", value:5, setValid:validNumber(1,90) }, { desc:"Styles", value:{ Admin: 'color:red', Mod: 'color:orange', Janitor: 'color:green', Contributor: 'color:purple', Builder: 'color:#6633FF', Platinum: 'color:#0000FF', Gold: 'color:#0000FF', Member: '', Blocked: 'color:black', Unknown:"color:gray"} } ] },
		
		{ name:"Add Style", enable:false, desc:"Adds CSS styles to all pages.  The 'important' flag is added automatically.  NOTE: This tweak is the most likely to reset after script updates, so backup any changes you make.", func:MS_addStyle, version:2, args:[{ desc:"", value:defaultAddStyle }] }
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
	
	content = !recursion && navbar && document.getElementById("page");
	if( content )
	{
		var settingsLink = navbar.appendChild( createElementX({ tag: "li" }) ).appendChild( createElementX({ tag: "a", text: "Tweaks" }) );
		var settingsDiv = content.parentNode.insertBefore( createElementX({ tag:"div", style:"display:none; padding:0 20px 30px 20px;", id:"tweaks_settings" }), content );
		
		settingsLink.addEventListener( "mousedown", function()
		{
			if( content.style.display == "none" )
			{
				//Closing settings.  Destroy the contents and unhide the original content.
				settingsDiv.style.display = "none";
				content.style.display = "block";
				settingsDiv.textContent = "";
			}
			else
			{
				//Opening settings.  Hide the current content and reconstruct the GUI from scratch.
				var settings = MS_getValue( "settings", {} );
				
				settingsDiv.appendChild( createElementX({ tag:"h4" }) ).appendChild( createElementX({ tag:"a", href:"http://userscripts.org/scripts/show/27776", text:"Miscellaneous Tweaks", style:"color:black;" }, " settings") );
				settingsDiv.appendChild( createElementX( { tag:"hr" }, "Most of this script's original tweaks had to be scrapped because of Danbooru 2's changes.  As Danbooru is undergoing frequent changes, these tweaks may be unstable.", { tag:"br" },{ tag:"br" }, "Questions?  Comments?   Problems?  Leave some feedback at ", { tag:"a", href:"http://userscripts.org/scripts/discuss/27776", text:"http://userscripts.org/scripts/discuss/27776" }, "!", { tag:"hr" }) );
				var table = settingsDiv.appendChild( createElementX({ tag:"table", width:"100%", style:"margin-bottom: 2em; vertical-align:top;" }) );
				
				var resetAll = false, resetButtons = [];
				
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
					var reset, body, check, title, tr = table.appendChild( createElementX({ tag:"tr", style:"vertical-align:top;" }) );
					var border = i != tweaks.length - 1 ? "border-bottom:4px solid #EEE; " : "";
					
					//Button to reset to default settings
					reset = tr.appendChild( createElementX({ tag:"td", style:border+"padding:1px 4px 1em 4px; width:1%" }) ).appendChild( createElementX({ tag:"button", title:"Reset to default settings for this tweak.", text:"Reset" }) );
					resetButtons.push( reset );//pad 1 4
					
					//Checkbox to toggle tweak
					check = tr.appendChild( createElementX({ tag:"td", style:border+"padding:0.3em 4px 1em 4px; text-align:center" }) ).appendChild( createElementX({ tag:"input", type:"checkbox", title:"Toggle this tweak." }) );//pad 6 4
					check.checked = ( settings[ tweaks[i].name ].args ? !!settings[ tweaks[i].name ].enable : !!tweaks[i].enable );
					
					//Tweak description and arguments
					body = tr.appendChild( createElementX({ tag:"td", style:border+"padding:1px 4px 1em 4px; " }) );//pad 1 4 10 4
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
						var list = body.appendChild( createElementX({ tag:"ul", style:"margin:0 0 0 2em;  list-style:disc" }) );
						for( var j = 0; j < tweaks[i].args.length; j++ )
							setupArg( settings, tweaks[i], j, list.appendChild( createElementX({ tag:"li", text:tweaks[i].args[j].desc+(tweaks[i].args[j].desc.length ? ": " : ""), style:"margin-top:4px" }) ) );
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
		GM_deleteValue = function(a){ localStorage.removeItem("danbooru_miscellaneous."+a); }
		GM_openInTab = function(a){ return window.open(a,a); }
		GM_getValue = function(name, defaultValue)
		{
			var value = localStorage.getItem("danbooru_miscellaneous."+name);
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
			localStorage.setItem("danbooru_miscellaneous."+name, value);
		}
		GM_listValues = function()
		{
			var i, j = 0, list = new Array(localStorage.length);
			for( i = 0; i < localStorage.length; i++ )
				if( /^danbooru_miscellaneous/.test( localStorage.key(i) ) )
					list[j++] = localStorage.key(i).replace(/^danbooru_miscellaneous./,'');
			return list;
		}
		GM_xmlhttpRequest = function(obj)
		{
			//Unlike the Greasemonkey function, XMLHttpRequest can't access sites outside Danbooru
			if( !/^http:..[^.]+.donmai.us\//.test(obj.url) )
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
	
	loginID = document.getElementsByName("current-user-id");
	if( loginID.length == 0 )
	{
		login = "";
		loginID = 0;
	}
	else
	{
		login = document.getElementsByName("current-user-name")[0].content;
		loginID = parseInt(loginID[0].content);
	}
	
	pass_hash = document.cookie.search("cookie_password_hash=(.+?)(;|$)") < 0 ? "" : document.cookie.match("cookie_password_hash=(.+?)(;|$)")[1];
	
	navbar = document.getElementById("site-map-link");
	if( navbar )
	{
		content = !recursion && document.getElementById("page");
		navbar = navbar.parentNode.parentNode;
		for( subnavbar = navbar.nextSibling; subnavbar && !subnavbar.tagName; subnavbar = subnavbar.nextSibling );
		if( !subnavbar || subnavbar.tagName != "MENU" )
		{
			//Insert subnavbar if it doesn't exist but the navbar does.
			subnavbar = navbar.parentNode.insertBefore( createElementX({tag:"menu"}), navbar.nextSibling );
			
			//Add a dummy link element so the subnavbar is the right height.
			subnavbar.appendChild( createElementX({tag:"li"}) ).appendChild( createElementX({tag:"a", href:"#"}) );
		}
	}
	
	if( typeof(custom) != "undefined" )
		custom();
}


function metaSettings(aUpdateCheck, aPassHash, aShowError)
{
	if( aUpdateCheck )
		updateCheck();
	if( aPassHash )
		pass_hash = aPassHash;

	showError = aShowError;
}


/**
	Checks for script updates.
 */
function updateCheck()
{
	var scriptNum = 27776;
	
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


/**
	Adds/moves the post search box to the navbar.
 */
function navbarTagSearch(moveBox,useSubnavbar)
{
	if( recursion || ( useSubnavbar ? !subnavbar : !navbar ) )
		return;
	
	var searchBox = document.getElementById("search-box"), value = "";
	if( searchBox )
	{
		if( !moveBox )
			return;
		
		if( (value = document.getElementById("tags")) != null )
			value = value.value.replace(/"/g,'');
		
		//To keep a consistent location for the search box, remove the original one wherever it appears.
		searchBox.parentNode.removeChild(searchBox);
	}
	
	//Add search box to the navbar.  The "float:left" style prevents the box from creating a small gap between the navbar and the subnavbar and makes the box first in the navbar even if "Navbar Links" executes after this.
	searchBox = createElementX({ tag:"li", id:"search-box", style:"float:left; position:relative; bottom:2px; margin:0 0 0 10px"});
	searchBox.innerHTML = '<form accept-charset="UTF-8" action="/posts" method="get" style="display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input id="tags" name="tags" size="20" type="text" value="'+value+'" /><input name="commit" type="submit" value="Go" style="display:none" /></form>';
	( useSubnavbar ? subnavbar : navbar ).appendChild(searchBox);
}


/**
	Causes the +/- links next to tags in the taglist (which appear for normal tags for Privileged+ users)
	to add/remove/negate tags from the tag search box. Tags cannot be added or negated more than once.
 */
function changePlusMinusLinks(addListeners)
{
	if( recursion || !document.getElementById("tags") )
		return;

	setTimeout( function() //0-timeout to let the custom tags get added
	{
		var boxValue = document.getElementById("tags").value;
		if( boxValue.length > 0 )
			boxValue = '+'+boxValue;
		
		var tagList = document.evaluate( "//section/ul/li/a[@class='wiki-link' and text() = '?']/..", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
				
		for( var i = 0; i < tagList.snapshotLength; i++ )
		{
			var links = tagList.snapshotItem(i).getElementsByTagName("a");
			if( links.length < 4 )
			{
				var urlTag = links[0].href.replace( /.*title=/i, '' );
				tagList.snapshotItem(i).insertBefore( createElementX(
					" ", { tag:'a', text:'+', class:"search-inc-tag", href:"/posts?tags=" +urlTag+boxValue },
					" ", { tag:'a', text:'-', class:"search-exl-tag", href:"/posts?tags=-"+urlTag+boxValue }), links[0].nextSibling );
				
				links = tagList.snapshotItem(i).getElementsByTagName("a");				
				links[2].innerHTML="&ndash;";
			}
			
			if( addListeners )
			{
				var tag = links[3].textContent.replace( /\s+/g, '_' );
				
				//Plus
				links[1].setAttribute("onclick","return false;");
				links[1].addEventListener( "click", searchBoxChange(" "+tag+" ", " -"+tag+" "), false );
				
				//Minus
				links[2].setAttribute("onclick","return false;");
				links[2].addEventListener( "click", searchBoxChange(" -"+tag+" ", " "+tag+" "), false );
			}
		}
	}, 0 );
	
	function searchBoxChange(add, remove) { return function()
	{
		var searchBox = document.getElementById("tags");
		var value = " "+searchBox.value+" ";
		if( value.indexOf(remove) >= 0 )
			value = value.replace(remove," ");
		else if( value.indexOf(add) < 0 )
			value = add + value;
		
		//Trim excess whitespace from search box and give it focus
		searchBox.value = value.replace(/(^ +| +$)/g,'').replace(/  +/,' ');
		searchBox.focus();
	}}
}


/**
	Adds a new section to the taglist, complete with +/- links.
 */
function customTaglist(title, newTags)
{
	var tagList = !recursion && document.evaluate( "//section/ul/li/a[@class='wiki-link' and text() = '?']/../../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if( !tagList )
		return;
	if( !newTags || !(newTags instanceof Array ) || !newTags.length )
		throw "Parameter must be a non-empty array."
	
	var fragment = createElementX([{ tag:"h1", text:title }]);
	var newList = fragment.appendChild( createElementX({tag:"ul"}) );
	var tagsValue = document.getElementById("tags").value;
	if( tagsValue.length > 0 )
		tagsValue = '+'+tagsValue;
	
	for( var i = 0; i < newTags.length; i++ )
	{
		var newListItem = createElementX({ tag: "li", class:"category-0"/* general tag by default */ });
		var thisTag = newTags[i];//Make copy to avoid removing tag type from original settings
		
		if( thisTag.indexOf("art:") == 0 )
			newListItem.className = "category-1";
		else if( thisTag.indexOf("char:") == 0 )
			newListItem.className = "category-4";
		else if( thisTag.indexOf("copy:") == 0 )
			newListItem.className = "category-3";
		
		thisTag = thisTag.replace(/^(art|char|copy|gen):/,'');
		
		if( thisTag.indexOf(":") > 0 )
			newListItem.innerHTML = '<a class="wiki-link" href="/wiki_pages?title=help:cheatsheet">?</a>';
		else
			newListItem.innerHTML = '<a class="wiki-link" href="/wiki_pages?title='+thisTag.replace(/ /g,'_')+'">?</a>';
		
		newListItem.innerHTML += ' <a href="/posts?tags='+thisTag.replace(/ /g,'_')+tagsValue+'" class="search-inc-tag">+</a> <a href="/posts?tags=-'+thisTag.replace(/ /g,'_')+tagsValue+'" class="search-exl-tag">&ndash;</a>'+' <a href="/posts?tags='+thisTag.replace(/ /g,'_')+'" class="search-tag">'+thisTag.replace(/_/g,' ')+'</a>';
		newList.appendChild(newListItem);
	}
	
	tagList.appendChild(fragment);
}


/**
	Adds links to the navbar.
 */
function navbarLinks(links)
{
	if( !navbar || recursion || !links || !links.length )
		return;
	
	var fragment = createElementX([]);
	
	for( var i = 0; i < links.length; i++ )
		if( links[i].text && links[i].href )
			fragment.appendChild( createElementX({ tag: "li" }) )
				.appendChild( createElementX({ tag:"a", href:links[i].href, text:links[i].text }) );
	navbar.insertBefore( fragment, navbar.firstChild );
}


/**
	Removes the specified statistics from user profiles.
 */
function hideUserStatistics(deleteMe, deleteThem)
{
	var deleteArray, statBlock = !recursion && document.getElementsByClassName("user-statistics")[0];
	if( !statBlock )
		return;
	
	if( statBlock.parentNode.parentNode.getElementsByTagName("h1")[0].textContent == login )
		deleteArray = ( deleteMe   instanceof Array ) ? deleteMe   : [];//Your profile
	else
		deleteArray = ( deleteThem instanceof Array ) ? deleteThem : [];//Someone else's profile
	
	if( deleteArray.indexOf("Statistics") >= 0 )
		statBlock.parentNode.getElementsByTagName("h2")[0].style.display = "none";
	
	var statLabels = statBlock.getElementsByTagName("th");
	
	for( var i = 0; i < statLabels.length; i++ )
		if( deleteArray.indexOf( statLabels[i].textContent ) >= 0 )
			statLabels[i].parentNode.style.display = "none";
}


/**
	Applies style attributes to links to user pages depending on the type of user.

	refreshDays: Number of days to cache a specific user's level
	styleObj:    Collection of styles applied to the different user levels
	
	User level info @ danbooru/app/models/user.rb
 */
function styleUserLevels( refreshDays, styleObj )
{
	if( recursion )
		return;
	
	var userCache, loadAgain = true;
	
	MS_observeInserts( subStyle )();	
	
	function subStyle(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;

		var userLinks = new XPathEvaluator().evaluate('descendant-or-self::a[contains(@href,"/users/")]', (e ? e.target : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( userLinks.snapshotLength > 0 ) setTimeout( function()
		{
			var missing = {};
			if( loadAgain )
			{
				loadAgain = false;
				setTimeout( function(){ loadAgain = true; }, 2000 );
				
				userCache = MS_getValue( "styleUserLevels.userCache" ) || { saveName: "styleUserLevels.userCache", expires: refreshDays*24*3600 };
			}
			
			for( var i = 0; i < userLinks.snapshotLength; i++ )
			{
				var link = userLinks.snapshotItem(i);
				if( /^http:..[^\.]+.donmai.us.users.\d+/.test( link.href ) )
				{
					var index = link.href.replace( /.*users\//, 'id=' );
					var level = MS_getValue( index, userCache );
					if( typeof(level) === 'number' )
						setUserStyle( link, level );
					else if( !missing[index] )
						missing[index] = [ link ];
					else
						missing[index].push( link );
				}
			}
			for( elem in missing )
				getLevel( elem, missing[elem] );
		}, 1 );
	}
	
	function getLevel( index, linkArray )
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
			url: 'http://'+location.host+'/user/index.json?'+index,
			onload: function(responseDetails)
			{
				var result;
				
				try{ result = MS_parseJSON(responseDetails.responseText); }
				catch(e) { getLevel( index, linkArray ); return; }
				
				for( var i = 0; i < result.length; i++ )
					MS_setValue( 'id='+result[i].id, result[i].level, refreshDays*24*3600, userCache );
								
				var level = MS_getValue( index, userCache );
				if( !level )
					MS_setValue( index, (level = 20), refreshDays*24*3600, userCache );//default level is Member
				
				for( var i = 0; i < linkArray.length; i++ )
					setUserStyle( linkArray[i], level );
			},
			onerror: function(responseDetails) { getLevel( index, linkArray ); }
		});
	}

	function setUserStyle( link, level )
	{
		var style;

		switch( level )
		{
			case 50: style = styleObj.Admin;       break;
			case 40: style = styleObj.Mod;         break;
			case 35: style = styleObj.Janitor;     break;
			//case 34: style = styleObj.TestJanitor; break;//"TestJanitor": "color:#4CC417",
			case 33: style = styleObj.Contributor; break;
			case 32: style = styleObj.Builder;     break;
			case 31: style = styleObj.Platinum;    break;
			case 30: style = styleObj.Gold;        break;
			case 20: style = styleObj.Member;      break;
			case 10: style = styleObj.Blocked;     break;
			default: style = styleObj.Unknown;     break;//unknown power level
		}
		link.setAttribute( "level", level );
		
		if( style && style.length > 0 )
		{
			if( /^color:[^;]+$/.test(style) )
				link.style.color = style.replace('color:','');
			else
				link.setAttribute( "style", link.getAttribute("style", "")+"; "+style );
		}
	}
}


/**
	Allows navigation between pages using the left/right arrow keys.
	
	There are three types of navigation to account for: popular, paginator, and pool
 */
function arrowKeyNavigation(onPop, onPage, onPool)
{
	if( recursion )
		return;
	
	//Listen for left/right arrow key presses
	window.addEventListener( "keydown", function(key)
	{
		//Don't navigate if Alt/Ctrl/Shift are also being pressed, or if a text field has focus.
		if( key.altKey || key.ctrlKey || key.shiftKey || key.metaKey || /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) || ( key.keyCode != 37 && key.keyCode != 39 ) )
				return;
		
		//Is this a "Popular By" page?
		var i, popularBar = onPop && document.getElementById("c-explore-posts");
		if( popularBar )
		{
			if( location.search.indexOf("scale=month") >= 0 )
				i = 2;//Index of <li> element
			else if( location.search.indexOf("scale=week") >= 0 )
				i = 1;
			else
				i = 0;//Use "Day" by default
			
			//There are 3 links per <li>: <<, >>, and [scale]
			popularBar.getElementsByTagName("a")[ 3 * i + ( key.keyCode == 37 ? 0 : 1 ) ].click();
			return;
		}
		
		//Is there a paginator?
		var paginator = onPage && ( document.getElementById("paginator") || document.getElementsByClassName("paginator")[0] );
		if( paginator )
		{
			var link = paginator.getElementsByTagName("li");
			link = link[ key.keyCode == 37 ? 0 : link.length - 1 ].firstChild;
			
			//link will be a <span> element if there are no more pages in the requested direction, in which case we do nothing.
			if( link.href )
				link.click();
			return;
		}

		//The only remaining possibility is pool navigation.  If we're in the middle of navigating a pool, there's a "pool_id"
		//parameter in the current URL and that pool is the first in the pool list.  Otherwise, only follow the first link if
		//it's the *only* link in that direction.
		var poolLinks = document.evaluate( "//node()[@id='pool-nav']//a[contains(text(),'"+( key.keyCode == 37 ? "prev" : "next" )+"')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		if( poolLinks.snapshotLength == 1 || location.search.indexOf("pool_id=") >= 0 )
		{
			poolLinks.snapshotItem(0).click();
			return;
		}
	}, false );
}


/**
	Appends images' scores and/or favorite counts below their thumbnails.
	
	appendScore: If true, append the score.
	appendFavcount: If nonzero, append the favcount.  This specifies the minutes to keep favcount in cache.
 */
function scoreThumbnails( appendScore, appendFavcount )
{
	if( recursion || !content )
		return;
	
	if( appendFavcount > 0 )
		appendFavcount *= 60;
	else
		appendFavcount = 0;
	
	setTimeout( function() { MS_observeInserts( giveSomething )(); }, 0 );
	
	var favcountCache;
	
	function giveSomething(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;
		
		var thumbList = new XPathEvaluator().evaluate("descendant-or-self::node()[contains(@class,'post-preview')]", (e ? e.target : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var favIDs = "", divList = [];
		
		if( !thumbList.snapshotLength )
			return;
		
		if( appendFavcount )
		{
			favcountCache = MS_getValue( "giveThumbnailsScores.favCount" ) || { saveName: "giveThumbnailsScores.favCount", expires: appendFavcount*2 };
		}
		
		for( var i = 0; i < thumbList.snapshotLength; i++ )
		{
			if( thumbList.snapshotItem(i).getElementsByClassName("misc_thumb_scores")[0]  )
				continue;
			
			/* Comment index has a different structure than thumbs elsewhere. */
			var imageBox = thumbList.snapshotItem(i).getElementsByTagName("img")[0].parentNode;
			var postID = thumbList.snapshotItem(i).getAttribute("data-id") || imageBox.href.replace(/.*\//,'');
			imageBox = imageBox.parentNode;
			
			/* The default height for thumbnails will cause most scores to be hidden, so
			   try to override the height here in case the user hasn't already done so. */
			imageBox.style.minHeight = "170px";
			
			var newDiv = imageBox.appendChild( createElementX({ tag: "div", class: "misc_thumb_scores", style:"text-align:center" }) );
			
			if( appendScore )
			{
				var score = thumbList.snapshotItem(i).getAttribute("data-score",0);
				newDiv.appendChild( createElementX("Score: "+score) );
				if( score < 0 )
					newDiv.style.color = "red";
			}
			if( appendFavcount )
			{
				var favcount = thumbList.snapshotItem(i).getAttribute("data-favcount");//Attribute added by this script.
				if( favcount != null )
					MS_setValue( thumbList.snapshotItem(i).id, favcount, appendFavcount, favcountCache );
				else
					favcount = MS_getValue( thumbList.snapshotItem(i).id, favcountCache );
				
				if( favcount != null )
					newDiv.appendChild( createElementX( " ("+favcount+" fav"+( favcount == 1 ? ")" : "s)" ) ) );
				else
				{
					divList.push({ "id":postID, "div":newDiv });
					favIDs += ( favIDs.length > 0 ? "," : "" ) + postID;
				}
			}
		}/* loop over thumbs */
		
		MS_requestAPI( "/posts.json?tags=status:any+id:"+favIDs, function(responseDetails)
		{
			var result;
			try{ result = MS_parseJSON(responseDetails.responseText); }
			catch(e){ return; }
			
			for( var i = 0; i < result.length; i++ )
			{
				MS_setValue( "post_"+result[i].id, result[i].fav_count, appendFavcount, favcountCache );
				for( var j = 0; j < divList.length; j++ )
					if( divList[j].id == result[i].id )
						divList[j].div.appendChild( createElementX( " ("+result[i].fav_count+" fav"+( result[i].fav_count == 1 ? ")" : "s)" ) ) );
			}
		});
	}
}


/**
	Merge and relocate the search/pool bars on post pages.
 */
function poolBars(moveTop)
{
	var postContent = !recursion && document.getElementById("content");
	var searchNav = postContent && document.getElementById("search-seq-nav");
	var poolNav = postContent && document.getElementById("pool-nav");
	
	if( poolNav && searchNav )
	{
		//Remove the search bar
		searchNav.parentNode.removeChild(searchNav);
		searchNav = searchNav.getElementsByTagName("li")[0];
		
		//Unset the "active" flag on the first pool's links
		var firstPool = poolNav.getElementsByTagName("li")[0];
		var activeLinks = firstPool.getElementsByClassName("active");
		for( var i = activeLinks.length - 1; i >= 0; i-- )
			activeLinks[i].className = activeLinks[i].className.replace(/(^|\s)active(\s|$)/,' ' );
		
		//Add the search bar item as the first "pool" in the pool bar
		searchNav.style.margin = "0px";
		searchNav.setAttribute("id", "search-seq-nav" );
		firstPool.parentNode.insertBefore( searchNav, firstPool );
	}
	else if( searchNav && moveTop )
	{
		//No pool bar, only search bar.
		searchNav.id = "pool-nav";
		poolNav = searchNav;
	}
	
	if( poolNav && moveTop )
	{
		poolNav.style.marginTop = "0px";
		postContent.insertBefore( poolNav, postContent.firstChild );
	}
}


/**
	Displays the thumbnails of child/parent posts in their status bar.
 */
function showParentChildThumbs(limit, sendBelow)
{
	if( recursion )
		return;
	
	var sizeLink = null, link = document.evaluate("//div[contains(@class,'notice')]/a[contains(@href,'post_relationships')]/../a[contains(@href,'/posts')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	
	var pendingNotice = document.getElementById("pending-approval-notice");
	var sizeNotice = document.getElementById("image-resize-notice");
	
	if( pendingNotice && sizeNotice )
	{
		//Merge the pending and resized notices.  Not really related to parent/child thumbs, but whatever.
		sizeNotice.removeChild( sizeNotice.lastChild );
		sizeNotice.appendChild( createElementX(").  This post is pending approval.", {tag:"span"}) );
		pendingNotice.style.display = "none";
	}
	
	if( link )
	{
		var postSection = sendBelow && document.getElementById("post-sections");
		if( postSection )
		{
			postSection.parentNode.insertBefore( link.parentNode, postSection );
			link.parentNode.style.marginTop = "10px";
		}
		
		var childSearch = link.href.indexOf("/posts/") < 0;

		if( sendBelow && sizeNotice )
		{
			sizeLink = link.cloneNode();
			sizeNotice.removeChild( sizeNotice.lastChild );
			sizeNotice.appendChild( createElementX(").  This post "+(childSearch ? "has " : "belongs to a "), sizeLink, ".") );
		}
		
		MS_requestAPI( "/posts.json?tags="+(childSearch ? link.href.replace(/.*tags=/,'') : "status:any+id:"+link.href.replace(/.*\/posts\//,'') ), function(responseDetails)
		{
			var result;
			try{ result = MS_parseJSON(responseDetails.responseText); }
			catch(e){ return; }
			
			for( var i = 0; childSearch && i < result.length; i++ )
				if( result[i]["has_children"] )
				{
					//Exclude the parent node from searches for child posts
					result.splice( i, 1 );
					break;
				}
			
			if( childSearch )
			{
				if( result.length == 1 )
					link.textContent = "1 child post";
				else
					link.textContent = result.length+" children";
				if( sizeLink )
					sizeLink.textContent = link.textContent;
			}
			
			//Remove the "learn more" link.
			while( link.nextSibling )
				link.parentNode.removeChild( link.nextSibling );
			
			if( result.length )
			{
				var fragment = buildThumbs(result, limit);
				fragment.insertBefore( createElementX( ".", {tag:"br"}), fragment.firstChild );
				
				//Thumbnails float left, so insert an empty "clear" div to make the notice stretch as needed to include them.
				fragment.appendChild( createElementX({tag:"div", style:"clear:both" }) );
				
				link.parentNode.appendChild(fragment);
			}
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
		style.innerHTML = text.replace(/;/g,'!important;')
							  .replace(/(!\s*important\s*)+\}/gi,'}')//Remove existing instances of "!important" to avoid duplicates
							  .replace(/\}/gi,'!important}');//Add "!important" to everything
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

/** Makes request to API link, e.g. "/posts.json".  Adds login info and (if "limit=" isn't included) limit=100 at the end. */
function MS_requestAPI( link, loadFun, errFun )
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url:"http://"+location.host+link+( link.indexOf("?") > 0 ? "&" : "?" )+"login="+login+"&password_hash="+pass_hash+( link.indexOf("limit=") < 0 ? "&limit=100" : "" ),
		onload:loadFun,
		onerror:( errFun ? errFun : function(err){ MS_requestAPI( link, loadFun ); } )
	});
}

/** Helper method to construct a document fragment of thumbnails from post API results */
function buildThumbs(json, limit)
{
	if( limit <= 0 )
		limit = 100;
	
	var i, result = document.createDocumentFragment();
	
	if( typeof(json) == "string" )
		try{ json = MS_parseJSON(json); } catch(e){ return result; }
	
	for( i = 0; limit-- > 0 && i < json.length; i++ )
	{
		var status = "", flag = "";
		if( json[i].is_deleted )
		{
			status = " post-status-deleted";
			flag = "deleted";
		}
		else if( json[i].is_flagged )
		{
			status = " post-status-flagged";
			flag = "flagged";
		}
		else if( json[i].is_pending )
		{
			status = " post-status-pending";
			flag = "pending";
		}
		else if( json[i].has_children )
		{
			status = " post-status-has-children";
		}
		else if( json[i].parent_id )
		{
			status = " post-status-has-parent";
		}
		
		var article = createElementX({ "tag":"article",
				"class":"post-preview"+status,
				"id":"post_"+json[i].id,
				"data-id":json[i].id,
				"data-tags":json[i].tag_string,
				"data-uploader":json[i].uploader_name,
				"data-rating":json[i].rating,
				"data-width":json[i].image_width,
				"data-height":json[i].image_height,
				"data-flags":flag,
				"data-parent-id":( json[i].parent_id || "" ),
				"data-has-children":json[i].has_children,
				"data-score":json[i].score,
				"data-favcount":json[i].fav_count });
		article.appendChild( createElementX({ tag:"a", href:"/posts/"+json[i].id }) ).appendChild( createElementX({ tag:"img", src:"/ssd/data/preview/"+json[i].md5+".jpg", alt:json[i].tag_string, title:json[i].tag_string+" user:"+json[i].uploader_id+" rating:"+json[i].rating+" score:"+json[i].score }) );
		result.appendChild(article);
	}
	return result;
}
