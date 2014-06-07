// ==UserScript==
// @name           Danbooru - Miscellaneous Tweaks
// @namespace      http://userscripts.org/scripts/show/27776
// @description    Adds a variety of useful tweaks to Danbooru, each of which can be easily disabled.
// @include        http://danbooru.donmai.us/*
// @include        https://danbooru.donmai.us/*
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
// @version        2014.03.12
// ==/UserScript==

/*
	Settings are modified by clicking the "Tweaks" link at the right end of the navbar on most pages.
	You do not need to modify the script itself.
*/

var showError, recursion, login, loginID, content, navbar, subnavbar;

try{
	initialize();
	loadTweaks();
} catch(err) {
	MS_alert("Error loading tweaks: "+err);
}

function loadTweaks()
{
	var tweaks =
	[
		{ name:"Metasettings", desc:"Settings affecting the script's operation as a whole.", func:metaSettings, version:2, args:[{ desc:"Check for script updates once a day (requires GM_xmlhttpRequest)", value:true }, { desc:"Display alerts if tweaks fail", value:false } ] },
        
		{ name:"Add Tag Subscription", desc:"Adds pseudo tag subscriptions to your user page.<br>"+
			"<u>title</u>: Title of the subscription, linked to the first query.  The title must be unique.<br>"+
			"<u>timestamp</u>: Appends a timestamp of the last refresh to the title.<br>"+
			"<u>refresh</u>: Hours to wait before refreshing the subscription.<br>"+
			"<u>thumbs</u>: Number of thumbnails to display.<br>"+
			"<u>maxExpanded</u>: Number of thumbnails to display when the subscription is expanded.<br>"+
			"<u>intersect</u>: Return posts matching ALL queries (using the order of the last) rather than ANY (sorted by post ID).<br>"+
			"<u>queries</u>: List of objects representing post searches.<br>"+
			"<u>search</u>: Tags to search for; the usual limitations apply.<br>"+
			"<u>pages</u>: Number of pages to collect for this query, each page containing 100 posts.<br>"+
			"<u>filter</u>: Drop any posts from this query's results that don't also contain all of the tags in the filter.  Metatags are not supported.", func:addTagSubscription, version:2, args:[ { desc:"", value:[ { title:"Recently Translated", timestamp:false, refresh:1, thumbs:6, maxExpanded:100, intersect:true, queries:[ { search:"order:note user:"+login, pages:1, filter:[] } ] }, { title:"Recently Commented", timestamp:false, refresh:1, thumbs:6, maxExpanded:100, intersect:true, queries:[ { search:"order:comment user:"+login, pages:1, filter:[] } ] } ], getValue:getTagSubscriptions } ] },
		
		{ name:"Arrow Key Navigation", desc:"Allows navigation between pages using the arrow keys.", func:arrowKeyNavigation, version:0, args:[] },
		
		{ name:"Blacklist", desc:"Blacklist implementation that replaces images (full and thumbnail) with links labeled with the tags they matched in the blacklist.  Clicking the link/image alternates between the two.  Translation notes appear every other time the image is displayed.  User and rating metatags are supported.  Your own posts are exempt from the blacklist.", func:blacklistTags, version:0, args:[{ desc:"Input to regex constructor [/^(xxx)$/i]", value:"blockedTag1|blockedTag2|blockedTag3", getValue:getBlacklistString }] },
		
		{ name:"Change +/- Links", desc:"Adds +/- tag links when the taglist doesn't have them.", func:changePlusMinusLinks, version:1, args:[{ desc:"Make links add/remove tags from search box instead of launching new searches", value:true }] },
		
		{ name:"Custom Taglist", desc:"Adds a new taglist section below tag lists, complete with +/- links.  Tag types are supported.", func:customTaglist, version:0, args:[{ desc:"Title of list", value:"Custom Tags", elem:"input" }, { desc:"Tags", value:[ 'art:bomber_grape', 'char:maribel_hearn', 'copy:hidamari_sketch', 'order:score', 'order:comment', 'comm:'+login, 'rating:e', 'rating:q', 'rating:s', 'status:any', 'fav:'+login, 'user:'+login, 'source:pixiv/*', 'arttags:0', 'chartags:1', 'copytags:1', 'gentags:1' ], getValue:getStringArray }] },
		
		{ name:"DText Replace", desc:"Replaces text in DText-enabled textareas (to the 'Text' pattern) and the names of all links with DText or DText-like shorthand forms (to the 'Link' pattern).", func:dtextReplace, version:0, args:[ { desc:"", value:[
			{ regex:"(^|[^:])(http://seiga.nicovideo.jp/seiga/im(\\d+))$", text:"\"seiga #$3\":$2", link:"seiga #$3" },
			{ regex:"(^|[^:])http:..www.pixiv.net.member_illust.php.mode=(medium|big|manga)&illust_id=(\\d+)$", text:"$1pixiv #$3", link:"$1pixiv #$3" },
			{ regex:"(^|[^:])http:..www.pixiv.net.member_illust.php.mode=manga_big&illust_id=(\\d+)&page=(\\d+)$", text:"$1pixiv #$2/p$3", link:"$1pixiv #$2/p$3" },
			{ regex:"(^|[^:])https?:[^ \\.]+.donmai.us.(post|comment|pool|user|artist)s.(\\d+)((\\/|\\?)[^\\s]*)?$", text:"$1$2 #$3", link:"$1$2 #$3" },
			{ regex:"(^|[^:])https?:[^ \\.]+.donmai.us.forum_posts.(\\d+)$", text:"$1forum #$2", link:"$1forum #$2" },
			{ regex:"(^|[^:])https?:[^ \\.]+.donmai.us.forum_topics.(\\d+)$", text:"$1topic #$2", link:"$1topic #$2" },
			{ regex:"(^|[^:])https?:..github.com.r888888888.danbooru.issues.(\d+)$", text:"$1issue #$2", link:"$1issue #$2" }
		], getValue:getDTextArray } ] },
		
		{ name:"Hide User Statistics", desc:"", func:hideUserStatistics, version:0, args:[{ desc:"Stats to remove from your profile", value:[ "Statistics", "Inviter", "Approvals" ], getValue:getStringArray }, { desc:"Stats to remove from others' profiles", value:[ "Inviter" ], getValue:getStringArray }] },
		
		{ name:"Navbar Links", desc:"Adds links to the left side of the navbar.", func:navbarLinks, version:1, args:[{ desc:"", value:[{ text:"Upload", href:"/uploads/new" }, { text:"IQDB", href:"http://danbooru.iqdb.org/" }], getValue:getLinkArray }, { desc:"Links to remove from navbar or subnavbar", value:[ "Sign out" ], getValue:getStringArray } ] },
		
		{ name:"Navbar Tag Search", desc:"Adds/moves the post search box to the navbar.", func:navbarTagSearch, version:1, args:[{ desc:"Move the post search box when it exists", value:true }, { desc:"Add to subnavbar instead of navbar", value:true }] },
		
		{ name:"Precision Time", desc:"Sets all time fields to the 'X units ago' form.", func:precisionTime, version:0, args:[ { desc:"Precision", value:1, getValue:getNumber(0,6) } ] },

		{ name:"Score Comments", desc:"Displays comment scores next to the vote links.", func:scoreComments, version:1, args:[ { desc:"Minimum score", value:-9999 }, { desc:"Maximum score", value:-1 } ] },
		
		{ name:"Score Thumbnails", enable:false, desc:"Displays scores and favorite counts below thumbnails.", func:scoreThumbnails, version:0, args:[ { desc:"Show score", value:true }, { desc:"Show favcount", value:false } ] },

		{ name:"Source Stat Links", desc:"Running artist/source searches for posts without artist tags and displays the results under the source information in the sidebar.", func:sourceStatLinks, version:0, args:[{ desc:"Run \"Find Artist\" search", value:true }, { desc:"Run post search", value:false }] }
	];
	
	var i, settings = MS_getValue( "settings", {} );
	for( i = 0; i < tweaks.length; i++ )
	{
		//Add tweaks to settings object if they don't exist, and reset those with changed versions or number of arguments. 
		//Done in a separate loop since the function calls might modify the setting arguments.
		if( !settings[ tweaks[i].name ] || settings[ tweaks[i].name ].version != tweaks[i].version )
		{
			settings[ tweaks[i].name ] = { enable:!!tweaks[i].enable, version:tweaks[i].version };
			MS_setValue( "settings", settings, -1 );
		}
	}
	
	for( i = 0; i < tweaks.length; i++ )
	{
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
	settings = null;
	
	content = !recursion && navbar && document.getElementById("page");
	if( !content )
		return;
	
	var settingsLink = navbar.appendChild( createElementX({ tag: "li" }) ).appendChildX({ tag: "a", text: "Tweaks" });
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
			
			settingsDiv.appendChildX({ tag:"h4" }).appendChildX({ tag:"a", href:"http://userscripts.org/scripts/show/27776", text:"Miscellaneous Tweaks", style:"color:black" }, " settings");
			settingsDiv.appendChildX( { tag:"hr" }, "Questions?  Comments?   Problems?  Leave some feedback at ", { tag:"a", href:"http://userscripts.org/scripts/discuss/27776", text:"http://userscripts.org/scripts/discuss/27776" }, "!", { tag:"hr" });
			var table = settingsDiv.appendChildX({ tag:"table", width:"100%", style:"margin-bottom: 2em; vertical-align:top;" });
			
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
				var reset, body, check, title, tr = table.appendChildX({ tag:"tr", style:"vertical-align:top;" });
				var border = i != tweaks.length - 1 ? "border-bottom:4px solid #EEE; " : "";
				
				//Button to reset to default settings
				reset = tr.appendChildX({ tag:"td", style:border+"padding:1px 4px 1em 4px; width:1%" }).appendChildX({ tag:"button", title:"Reset to default settings for this tweak.", text:"Reset" });
				resetButtons.push( reset );//pad 1 4
				
				//Checkbox to toggle tweak
				check = tr.appendChildX({ tag:"td", style:border+"padding:0.3em 4px 1em 4px; text-align:center" }).appendChildX({ tag:"input", type:"checkbox", title:"Toggle this tweak." });
				check.checked = ( settings[ tweaks[i].name ].args ? !!settings[ tweaks[i].name ].enable : !!tweaks[i].enable );
				
				//Tweak description and arguments
				body = tr.appendChildX({ tag:"td", style:border+"padding:1px 4px 1em 4px; " });
				title = body.appendChildX({ tag:"b", text:tweaks[i].name });
				title.style.setProperty( "text-decoration", check.checked ? "none" : "line-through", null );
				
				body.appendChildX(": ");
				body.appendChildX({ tag:"span" }).innerHTML = tweaks[i].desc;
				
				//When the Reset button is clicked, delete any custom settings for it and fall back on defaults.
				reset.addEventListener( "click", (function(tweak,check){ return function()
				{
					if( !resetAll && !confirm("Reset this tweak?") )
						return;
					if( !!check.checked != !!tweak.enable )
						check.click();
					
					var settings = MS_getValue( "settings" );
					settings[ tweak.name ] = { enable:!!tweak.enable, version:tweak.version, args:defaultArgs( tweak ) };
					MS_setValue( "settings", settings, -1 );
					
					for( var i = 0; i < tweak.args.length; i++ )
						tweak.args[i].save(true);
				}; })( tweaks[i], check ), false );
				
				//When checkbox is clicked, toggle the title strikethrough and save settings
				check.addEventListener( "click", (function(tweak,title){ return function()
				{
					var settings = MS_getValue( "settings" );
					
					title.style.setProperty( "text-decoration", (settings[ tweak.name ].enable = this.checked) ? "none" : "line-through", null );
					if( !settings[tweak.name].args )
						settings[tweak.name].args = defaultArgs( tweak );
					MS_setValue( "settings", settings, -1 );
				}; })(tweaks[i],title), false );
				
				//If the tweak takes arguments, create the appropriate input elements and listeners.
				if( tweaks[i].args.length )
				{
					var list = body.appendChildX({ tag:"ul", style:"margin:0 0 0 2em;  list-style:disc" });
					for( var j = 0; j < tweaks[i].args.length; j++ )
						setupArg( settings, tweaks[i], j, list.appendChildX({ tag:"li", text:tweaks[i].args[j].desc+(tweaks[i].args[j].desc.length ? ": " : ""), style:"margin-top:4px" }) );
				}
			}
			settingsDiv.appendChildX({ tag:"hr" });
			
			//"Export" button
			settingsDiv.appendChildX({ tag:"input", type:"button", value:"Export", title:"Save settings to file.  There is no import option." }).addEventListener( "click", function()
			{
				try{ window.location ="data:application/octet-stream,"+escape( JSON.stringify( MS_getValue( "settings" ), null, 1 ).replace(/\s+/g,' ') ); }
				catch(err){}
			}, false );
			
			//"Reset All Tweaks" button
			var resetAllButton = settingsDiv.appendChildX({ tag:"input", type:"button", value:"Reset All Tweaks", title:"Reset all settings." }).addEventListener( "click", function()
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
			var resetAllButton = settingsDiv.appendChildX({ tag:"input", type:"button", value:"Delete All Variables", title:"Reset all settings." }).addEventListener( "click", function()
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
	
	//Returns an array with just the "value" properties from an array of arguments for a tweak
	function defaultArgs( tweak )
	{
		var defArgs = [];
		for( var i = 0; i < tweak.args.length; i++ )
			defArgs.push( tweak.args[i].value );
		return defArgs;
	}
		
	//Creates the input element for an element and sets up the appropriate settings/listeners
	function setupArg( oldSettings, tweak, argI, elem )
	{
		//Let the starting value be the custom setting, or default if nothing set
		var currentValue = tweak.args[argI].value, event = "input";
		if( oldSettings[ tweak.name ] && oldSettings[ tweak.name ].args && oldSettings[ tweak.name ].args[argI] != null )
			currentValue = oldSettings[ tweak.name ].args[argI];
		
		if( typeof( tweak.args[argI].value ) == "boolean" )
		{
			//Checkbox
			elem = elem.appendChildX({ tag:"input", type:"checkbox", title:tweak.args[argI].desc });
			
			if( !tweak.args[argI].getValue )
				tweak.args[argI].getValue = function(thing){ return thing.checked; };
			if( !tweak.args[argI].setValue )
				tweak.args[argI].setValue = function(thing,val){ thing.checked = val; }
			
			event = "click";
		}
		else if( typeof( tweak.args[argI].value ) == "number" )
		{
			elem = elem.appendChildX({ tag:"input", type:"text", title:tweak.args[argI].desc });
			
			if( !tweak.args[argI].getValue )
				tweak.args[argI].getValue = function(thing){ var val = Number( thing.value ); return isNaN(val) || thing.value.length == 0 ? null : val; };
			if( !tweak.args[argI].setValue )
				tweak.args[argI].setValue = function(thing,val){ thing.value = val; }
		}
		else if( typeof( tweak.args[argI].value ) == "string" )
		{
			if( tweak.args[argI].elem == "input" )
			{
				//Size element to fit the contents
				elem = elem.appendChildX({ tag:"input", type:"text", title:tweak.args[argI].desc });
				elem.addEventListener( "input", function() { elem.setAttribute("size", elem.value.length + 5); }, false );
				elem.setAttribute("size", currentValue.length + 5);
			}
			else
			{
				//Size to fit, with a timeout since hidden elements don't have a height
				elem = elem.appendChildX({ tag:"textarea", type:"text", style:"display: inline-block; width:95%; height:20px", title:tweak.args[argI].desc });
				setTimeout( function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight, 20 ) + "px"; }, 0 );
				elem.addEventListener( "input", function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight ) + "px"; }, false );
			}
			
			if( !tweak.args[argI].getValue )
				tweak.args[argI].getValue = function(thing){ return thing.value; }
			if( !tweak.args[argI].setValue )
				tweak.args[argI].setValue = function(thing,val){ thing.value = val; }
		}
		else if( typeof( tweak.args[argI].value ) == "object" )
		{
			if( tweak.args[argI].desc.length )
				elem.appendChildX({tag:"br"});
			
			elem = elem.appendChildX({ tag:"textarea", type:"text", style:"display: inline-block; width:95%; height:20px", title:tweak.args[argI].desc });
			setTimeout( function() { elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight, 20 ) + "px"; }, 0 );
			elem.addEventListener( "input", function(){ elem.style.height = Math.max( elem.scrollHeight, elem.clientHeight )+"px"; }, false );
			
			if( !tweak.args[argI].getValue )
				tweak.args[argI].getValue = function(thing){ try{ return MS_parseJSON( elem.value ); } catch(err){ return null; } };
			if( !tweak.args[argI].setValue )
				tweak.args[argI].setValue = function(thing,val){ thing.value = JSON.stringify( val, null, 1 ).replace(/\s+/g,' '); }
		}
		else
		{
			if( showError )
				MS_alert("Unknown argument type "+typeof( tweak.args[argI].value )+" ("+tweak.name+")");
			tweak.args[argI].getValue = function(){return null;}
			tweak.args[argI].setValue = function(){}
		}
		
		tweak.args[argI].setValue(elem, currentValue);
		tweak.args[argI].save = function(reset)
		{
			var settings = MS_getValue( "settings" );
			
			if( !settings[ tweak.name ].args )
				settings[ tweak.name ].args = defaultArgs( tweak );
			
			if( reset === true )
				tweak.args[argI].setValue( elem, tweak.args[argI].value );
			
			var value = tweak.args[argI].getValue( elem );
			if( value === null )
				elem.style.color = 'red';
			else
			{
				elem.style.removeProperty("color");
				settings[tweak.name].args[argI] = value;
				MS_setValue( "settings", settings, -1 );
			}
		}
		elem.addEventListener( event, tweak.args[argI].save, false );
	}
	
	function getNumber(a,b)
	{
		a = Number(a);
		b = Number(b);
		return function(elem)
		{
			var num = Number( elem.value );
			if( elem.value.length == 0 || isNaN(num) || num < a || num > b )
				return null;
			return num;
		}
	};
	
	function getDTextArray(elem)
	{
		try{
			var list = MS_parseJSON( elem.value );
			if( list.length == 0 )
				return null;
				
			for( var i = 0; i < list.length; i++ )
			{
				if( new RegExp( list[i].regex ).test("```````````") )
					return null;//Check for valid regex, reject those that match "everything"
				if( list[i].text && ( typeof(list[i].text) != "string" || list[i].text.length < 1 ) )
					return null;
				if( list[i].link && ( typeof(list[i].link) != "string" || list[i].link.length < 1 ) )
					return null;
				if( !list[i].text && !list[i].link )
					return null;
			}
			return list;
		} catch(err){}
		
		return null;
	}
	
	function getBlacklistString(elem)
	{
		try{
			if( !(new RegExp( "(^|.* )("+elem.value+")( .*|$)", "i" ).test("```````````")) )
				return elem.value;
		}catch(err){}
		
		return null;
	}
	
	function getLinkArray(elem)
	{
		try{
			var list = JSON.parse(elem.value);
			if( list.length == 0 )
				return null;
			
			for( var i = 0; i < list.length; i++ )
				if( typeof(list[i].text) != "string" || list[i].text.length == 0 || typeof(list[i].href) != "string" || list[i].href.length == 0 )
					return null;
			
			return list;
		}catch(err) {}
		
		return null;
	}
	
	function getTagSubscriptions(elem)
	{
		try{
			var json = MS_parseJSON( elem.value );
			if( json.length == 0 )
				return null;
			
			for( var call = 0; call < json.length; call++ )
			{
				//Add missing properties
				if( !json[call].maxExpanded )
					json[call].maxExpanded = 0;
				if( !json[call].intersect )
					json[call].intersect = false;
				if( !json[call].timestamp )
					json[call].timestamp = false
				
				if( json[call].title.length == 0 ||
					typeof(json[call].title) != "string" ||
					typeof(json[call].refresh) != "number" ||
					json[call].refresh <= 0 ||
					typeof(json[call].thumbs) != "number" ||
					json[call].thumbs < 0 ||
					typeof(json[call].maxExpanded) != "number" ||
					json[call].maxExpanded < 0 ||
					( !json[call].thumbs && !json[call].maxExpanded) ||
					json[call].queries.length == 0 )
				{
					return null;
				}
				
				//Titles must be unique
				for( subCall = 0; subCall < json[call].queries.length; subCall++ )
					if( call != subCall && json[subCall].title == json[call].title )
						return null;
				
				for( var query = 0; query < json[call].queries.length; query++ )
				{
					if( !json[call].queries[query].pages )
						json[call].queries[query].pages = 1;
					if( !json[call].queries[query].filter )
						json[call].queries[query].filter = [];
						
					if( json[call].queries[query].search.length == 0 ||
						typeof(json[call].queries[query].search) != "string" ||
						typeof(json[call].queries[query].pages) != "number" ||
						json[call].queries[query].pages < 0 ||
						json[call].queries[query].pages > 1000 ||
						!(json[call].queries[query].filter instanceof Array) )
					{
						return null;
					}
				}
			}
			return json;
		}
		catch(err){}
		
		return null;
	}
	
	function getStringArray(elem)
	{
		try{
			var list = JSON.parse( elem.value );
			
			if( !( list instanceof Array ) )
				return null;
			
			for( var i = 0; i < list.length; i++ )
				if( typeof(list[i]) != "string" )
					return null;
			
			return list;
		}catch(err){}
		
		return null;
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
			if( !/^https?:..[^.]+.donmai.us\//.test(obj.url) )
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
			subnavbar.appendChildX({tag:"li"}).appendChildX({tag:"a", href:"#"});
		}
	}
	
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
	var targetBar = useSubnavbar ? subnavbar : navbar;
	if( recursion || !targetBar )
		return;
	
	var searchBox = document.getElementById("search-box"), value = "";
	if( searchBox )
	{
		if( !moveBox )
			return;
		
		if( document.getElementById("tags") )
			value = document.getElementById("tags").value.replace(/"/g,'');
		
		//To keep a consistent location for the search box, remove the original one wherever it appears.
		searchBox.parentNode.removeChild(searchBox);
	}

	searchBox = createElementX({ tag:"li", id:"search-box"});
	searchBox.innerHTML = '<form accept-charset="UTF-8" action="/posts" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div><input id="tags" name="tags" size="30" type="text" ' + ( value ? 'value="'+value+'" ' : 'placeholder="Search posts" ' ) + '/><input name="commit" type="submit" value="Go" style="width:2.8em"/></form>';
	
	targetBar.insertBefore( searchBox, targetBar.firstChild );
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
	
	function searchBoxChange(add, remove) { return function(e)
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
	var tagList = !recursion && ( document.getElementById("tag-box") || document.getElementById("tag-list") );
	if( !tagList )
		return;
	
	var fragment = createElementX([{ tag:"h1", text:title }]);
	var newList = fragment.appendChildX( {tag:"ul"}) ;
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
	Adds links to the navbar, and removes links from the navbar or subnavbar.
 */
function navbarLinks(addLinks, removeLinks)
{
	if( !navbar || recursion )
		return;
	
	var fragment = createElementX([]);
	
	for( var i = 0; i < addLinks.length; i++ )
		if( addLinks[i].text && addLinks[i].href )
			fragment.appendChildX({ tag: "li" }).appendChildX({ tag:"a", href:addLinks[i].href, text:addLinks[i].text });
	
	navbar.insertBefore( fragment, navbar.firstChild );
	
	if( removeLinks.length )
	{
		var navLinks = Array.prototype.slice.call( navbar.getElementsByTagName("a") ).concat( Array.prototype.slice.call( subnavbar.getElementsByTagName("a") ) );
		for( var i = 0; i < navLinks.length; i++ )
			for( var j = 0; j < removeLinks.length; j++ )
				if( navLinks[i].textContent == removeLinks[j] )
					navLinks[i].parentNode.removeChild( navLinks[i] );
	}
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

	styleObj:    Collection of styles applied to the different user levels
	
	User level info @ danbooru/app/models/user.rb
 */
function styleUserLevels( styleObj )
{
	if( recursion )
		return;
	
    //The cached API queries are a fallback for DText-generated links etc...
	var userCache = MS_getValue( "styleUserLevels.cache" ) || { saveName: "styleUserLevels.cache", expires: refreshDays*24*3600 };
    var refreshDays = 3;
	
	MS_observeInserts( subStyle )();	
	
	function subStyle(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;

		var userLinks = new XPathEvaluator().evaluate('descendant-or-self::a[contains(@href,"/users/")]', (e ? e.target : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if( userLinks.snapshotLength > 0 ) setTimeout( function()
		{
			var missing = {};
			
			for( var i = 0; i < userLinks.snapshotLength; i++ )
			{
				var link = userLinks.snapshotItem(i);
				if( /^https?:..[^\.]+.donmai.us.users.\d+/.test( link.href ) )
				{
					var index = link.href.replace( /.*users\//, 'id=' );
					var info = 0;
					
					if( link.textContent.indexOf("user #") < 0 && link.className )
					{
						if( link.className.indexOf("user-banned") >= 0 )
							info = { level:10 };
						else if( link.className.indexOf("user-member") >= 0 )
							info = { level:20 };
						else if( link.className.indexOf("user-gold") >= 0 )
							info = { level:30 };
						else if( link.className.indexOf("user-platinum") >= 0 )
							info = { level:31 };
						else if( link.className.indexOf("user-builder") >= 0 )
							info = { level:32 };
						else if( link.className.indexOf("user-contributor") >= 0 )
							info = { level:33 };
						else if( link.className.indexOf("user-janitor") >= 0 )
							info = { level:35 };
						else if( link.className.indexOf("user-moderator") >= 0 )
							info = { level:40 };
						else if( link.className.indexOf("user-admin") >= 0 )
							info = { level:50 };
					}
					
					if( !info )
						info = MS_getValue( index, userCache );
					
					if( info )
						setUserStyle( link, info );
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
		MS_requestAPI( '/user/index.json?'+index, function(responseDetails)
		{
			var result;
			
			try{ result = MS_parseJSON(responseDetails.responseText); }
			catch(e) { getLevel( index, linkArray ); return; }
			
			for( var i = 0; i < result.length; i++ )
				MS_setValue( 'id='+result[i].id, { name:result[i].name, level:result[i].level }, refreshDays*24*3600, userCache );
							
			var info = MS_getValue( index, userCache ) || { level:20 };
			if( !info.name )
				MS_setValue( index, info, refreshDays*24*3600, userCache );//default level is Member
			
			for( var i = 0; i < linkArray.length; i++ )
				setUserStyle( linkArray[i], info );
		});
	}

	function setUserStyle( link, info )
	{
		var style, className = "";

		switch( info.level )
		{
			case 50: style = styleObj.Admin;       className = "user-admin";       break;
			case 40: style = styleObj.Mod;         className = "user-moderator";   break;
			case 35: style = styleObj.Janitor;     className = "user-janitor";     break;
			case 33: style = styleObj.Contributor; className = "user-contributor"; break;
			case 32: style = styleObj.Builder;     className = "user-builder";     break;
			case 31: style = styleObj.Platinum;    className = "user-platinum";    break;
			case 30: style = styleObj.Gold;        className = "user-gold";        break;
			case 20: style = styleObj.Member;      className = "user-member";      break;
			case 10: style = styleObj.Blocked;     className = "user-banned";      break;
			default: style = styleObj.Unknown; break;//unknown power level
		}
		
		if( style && style.length > 0 )
		{
			if( /^color:[^;]+$/.test(style) )
				link.style.color = style.replace('color:','');
			else
				link.setAttribute( "style", link.getAttribute("style", "")+"; "+style );
		}
		if( className && link.className.indexOf(className) < 0 )
			link.className += (link.className ? ' ' : '')+className;
		if( info.name && /^user #\d+$/.test(link.textContent) )
			link.textContent = info.name;
	}
}


/**
	Adds back navigation by arrow keys.
 */
function arrowKeyNavigation(useArrows)
{
	if( recursion )
		return;
	
	var leftLink = 0, rightLink = 0;
	
	var links = document.getElementById("popular-nav-links") ? document.getElementById("popular-nav-links").getElementsByTagName("a") : [];
	if( links.length == 9 )
	{
		//Popular
		if( location.search.indexOf("scale=month") >= 0 )
		{
			leftLink = links[6];
			rightLink = links[8];
		}
		else if( location.search.indexOf("scale=week") >= 0 )
		{
			leftLink = links[3];
			rightLink = links[5];
		}
		else
		{
			leftLink = links[0];
			rightLink = links[2];
		}
	}
	else if( (links = document.getElementsByClassName("paginator")[0]) != null && (links = links.getElementsByTagName("li")).length > 0 )
	{
		//Paginator.  Link will be a <span> element if there are no more pages in the requested direction.
		leftLink = links[0].firstChild;
		rightLink = links[links.length - 1].firstChild;
	}
	
	//Listen for left/right arrow key presses
	window.addEventListener( "keydown", function(key)
	{
		//Don't navigate if Alt/Ctrl/Shift are also being pressed, or if a text field has focus.
		if( key.altKey || key.ctrlKey || key.shiftKey || key.metaKey || /^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) )
			return;
		if( key.keyCode != 37 && key.keyCode != 39 )
			return;
		
		if( !leftLink && (links = document.getElementById("nav-links")) != null && (links = links.getElementsByTagName("li")[0]) != null )
		{
			//Pool/slideshow navigation.  Placed here in case they are dynamically added after page load
			leftLink = links.getElementsByClassName("prev")[0];
			rightLink = links.getElementsByClassName("next")[0];
		}
		
		if( key.keyCode == 37 && leftLink && leftLink.href )
			leftLink.click();
		else if( key.keyCode == 39 && rightLink && rightLink.href )
			rightLink.click();
	}, false );
}


/**
	Appends images' scores and/or favorite counts below their thumbnails.
	
	appendScore: If true, append the score.
	appendFavcount: If true, append the favcount.
 */
function scoreThumbnails( appendScore, appendFavcount )
{
	if( recursion )
		return;
	
	setTimeout( function() { MS_observeInserts( giveSomething )(); }, 0 );
	
	function giveSomething(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;
		
		var thumbList = new XPathEvaluator().evaluate("descendant-or-self::node()[contains(@class,'post-preview')]", (e ? e.target : document), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var favIDs = "", divList = [];
		
		if( !thumbList.snapshotLength )
			return;

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
				var score = thumbList.snapshotItem(i).getAttribute("data-score");
				newDiv.appendChildX("Score: "+score);
				if( score < 0 )
					newDiv.style.color = "red";
			}
			if( appendFavcount )
			{
				var favcount = thumbList.snapshotItem(i).getAttribute("data-fav-count");
				if( favcount != null )
					newDiv.appendChildX(" ("+favcount+" fav"+( favcount == 1 ? ")" : "s)" ));
			}
		}/* loop over thumbs */
	}
}


/**
	Blacklist implementation that replaces images (full and thumbnail) with links labeled with tags
	they matched in the blacklist.  Clicking the link/image alternates between the two.  Translation notes
	appear every other time the image is displayed.

	User and rating metatags are supported.  Your own uploads are exempt from the blacklist.
	
	blacklist: regex string containing the blacklisted tags
 */
function blacklistTags( blacklistStr )
{
	if( recursion )
		return;
	
	var blacklist = new RegExp( "(^|.* )("+blacklistStr+")( .*|$)", "i" );
	var imageContainer = document.getElementById("image-container");
	var noteContainer = imageContainer && document.getElementById("note-container");
	
	setTimeout( function()
	{
		if( imageContainer )
		{
			var user = document.evaluate("//section/ul/li[contains(text(),'Uploader')]/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent;
			
			var rating = document.evaluate("//section/ul/li[contains(text(),'Rating:')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.textContent;
			rating = rating.indexOf("Safe") > 0 ? 's' : ( rating.indexOf("Explicit") > 0 ? 'e' : 'q' );

			applyBlacklist( imageContainer, document.getElementsByName("tags")[0].content, user, rating );
		}
		
		MS_observeInserts( function(e)
		{
			var found = [];
			
			if( !e )
				found = document.getElementsByClassName("post-preview");
			else if( e.target.className && e.target.className.indexOf("post-preview") >= 0 )
				found = [ e.target ];
			else if( e.target.getElementsByClassName )
				found = e.target.getElementsByClassName("post-preview");
			
			for( var i = 0; i < found.length; i++ )
				applyBlacklist( found[i], found[i].getAttribute("data-tags"), found[i].getAttribute("data-uploader"), found[i].getAttribute("data-rating") );
		})();
	}, 10 );
	
	function applyBlacklist(elem, tags, user, rating)
	{
		if( !elem || !tags || user == login )
			return;
		
		tags += " user:"+user+" rating:"+rating;
		
		var badTags = [];//List of all of this post's tags that hit the blacklist
		while( blacklist.test(tags) )
		{
			badTags.push( tags.replace( blacklist, '$2' ) );
			tags = tags.replace( blacklist, '$1  $3' );
		}
		badTags.sort();
		
		var image = badTags.length && !elem.getAttribute("blacklisted") && elem.getElementsByTagName("img")[0];
		
		if( !image )
			return;
		
		elem.setAttribute("blacklisted","true");
		
		var blackLink = createElementX({ tag: "a", href:image.src, text:('hidden ('+badTags+')').replace(/,/g,', '), title:( image.title || "" ) });
		
		if( elem.className )
		{
			if( elem.className.indexOf("deleted") > 0 )
				blackLink.style.color = "#000";
			else if( elem.className.indexOf("pending") > 0 )
				blackLink.style.color = "#00F";
			else if( elem.className.indexOf("flagged") > 0 )
				blackLink.style.color = "#F00";
			else if( elem.className.indexOf("parent") > 0 )
				blackLink.style.color = "#CC0";
			else if( elem.className.indexOf("child") > 0 )
				blackLink.style.color = "#0F0";
		}
		
		if( image.parentNode.href )
		{
			//Thumbnails are surrounded by links.  Hide those instead of the images themselves.
			image = image.parentNode;
			blackLink.href = image.href;
			
			//Comments have div.post-preview/div.preview/a/img
			elem = image.parentNode;
			elem.style.textAlign = "center";
		}
		
		var showNotes = true;
		if( elem == imageContainer )
			noteContainer.style.display = "none";
		image.style.display = "none";
		
		elem.insertBefore( blackLink, elem.firstChild );
		
		blackLink.addEventListener( "click", function(e) { if( !e.ctrlKey ) e.preventDefault(); }, false );
		elem.addEventListener( "click", function(e)
		{
			if( e.ctrlKey ) return;
			e.preventDefault();

			//Swap styles
			var oldImageStyle = image.style.display || "none";
			image.style.display = blackLink.style.display || "block";
			blackLink.style.display = oldImageStyle;
			
			if( elem == imageContainer )
			{
				setTimeout( function(){ noteContainer.style.display = ( image.style.display == "none" || (showNotes = !showNotes) ? "none" : "block" ); }, 0 );
			}
		}, true );
	}
}


/**
	Sets all times to the "X units ago" form with custom precision.
 */
function precisionTime(precision)
{
	if( recursion )
		return;
	
	MS_observeInserts( function(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;
		
		var timeNodes = ( e ? e.target : document ).getElementsByTagName("time");
		for( var i = 0; i < timeNodes.length; i++ )
		{
			//<time datetime="2013-02-26T22:16-05:00" title="2013-02-26 22:16:25 -0500">2013-02-26 22:16</time>
			var unit = "", title = timeNodes[i].getAttribute("title").split(" ");
			var duration = ( Date.now() - new Date(title[0]+'T'+title[1]+title[2]) ) / 1000;
			//new Date(timeNodes[i].getAttribute("datetime")).getTime() - 1000*parseInt( (timeNodes[i].getAttribute("title") || "0 0:0:0").split(/[\s:]+/,4)[3], 10 );
			
			if( duration < 60 )
				unit = "second";
			else if( (duration /= 60) < 60 )
				unit = "minute";
			else if( (duration /= 60) < 24 )
				unit = "hour";
			else if( (duration /= 24) < 30.4375 )
				unit = "day";
			else if( (duration /= 30.4375) < 12 )
				unit = "month";
			else if( (duration /= 12) > 0 )
				unit = "year";
			else continue;//Parsing error
			
			if( precision > 0 && unit != "second" )
				timeNodes[i].textContent = duration.toFixed(precision)+" "+unit+"s ago";
			else
			{
				duration = ( duration <= 0 ? "0" : duration.toFixed(0) );
				timeNodes[i].textContent = duration+" "+unit+( duration == "1" ? " ago" : "s ago" );
			}
		}
	})();
}


/**
	Adds a pseudo-tag subscription to your profile.
	
	title:           Title of tag subscription; must be unique
	useTimestamp:    If true, append a timestamp to the title with each refresh
	refreshInterval: Hours to wait before refreshing the subscription
	maxThumbs:       Number of thumbnails to display
	maxExpanded:	 Number of thumbnails to display when the >> link is clicked
	isIntersect:     If true, find posts that contained in all the queries.  Otherwise, find posts in any query.
	queryList		 [ { search:"", pages#, filter:[""] }, ... ]
					 
					 The optional filter parameter finds the intersection of just that query and the tags in the filter.
					 Metatags and negated tags are not supported in the filter.
	
	If isIntersect is true, posts will be in the order of the final query.
	Otherwise, posts are sorted by descending ID.
	
	The subscription title points to a tag search using the tags passed to the first query.
    
	When the subscription refreshes, all queries will be rerun with every page load until all
	have completed on the same page.
 */
function addTagSubscription( title, useTimestamp, refreshInterval, maxThumbs, maxExpanded, isIntersect, queryList )
{
	//Validate arguments
	if( recursion || !login )
		return;
	if( title instanceof Array )
	{
		for( var i = 0; i < title.length; i++ )
			addTagSubscription( title[i].title, title[i].timestamp, title[i].refresh, title[i].thumbs, title[i].maxExpanded, title[i].intersect, title[i].queries );
		return;
	}
	
	var varPrefix = "addTagSubscription."+title;
	var loadingMessage = false, subDiv = false;
	var queryString = queryList[0].search.replace(/,/g, ',\u200B');
	for( var i = 1; i < queryList.length; i++ )
		queryString += '\n***'+( isIntersect ? 'AND' : 'OR' )+'***\n'+queryList[i].search.replace(/,/g, ',\u200B');
	
	//Add the DIV to contain the thumbs to your own user page and append the thumbs if they already exist
	var userContent = document.getElementsByClassName("user-statistics").length && document.getElementById("a-show");
	if( userContent && ( location.pathname == "/users/"+loginID || userContent.getElementsByTagName("h1")[0].textContent == login ) )
	{
		subDiv = createElementX({ tag: "div", class:"box", id: varPrefix+"_thumbList" });
		
		var thumbList = MS_getValue( varPrefix+"_thumbList" );
		if( thumbList )
		{
			subDiv.innerHTML = thumbList;
			addExpandLink(subDiv);
		}
		else
		{
			subDiv.appendChildX({ tag:"h2", title:JSON.stringify(queryList) }).appendChildX({ tag:"a", href:"/posts?tags="+queryList[0].search.replace(/ +/,'+'), text:title });
			if( MS_getValue( varPrefix+"_lock" ) )
				MS_setValue( varPrefix+"_lock", true, 30 );
		}
		
		userContent.appendChild(subDiv);
		
		var subStat = document.evaluate("//tr/th[text()='Subscriptions']/../td", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		
		var para = createElementX({tag:"p"});
		var allTags = [];
		para.appendChildX([ { "tag":"strong", "text":title, "title":queryString }, " - " ]);
		for( var i = 0; i < queryList.length; i++ )
		{
			var tags = queryList[i].search.split(" ");
			for( var j = 0; j < tags.length; j++ )
			{
				tags[j] = tags[j].replace( /^(-|~)/, '' );
				
				if( allTags.indexOf( tags[j] ) >= 0 )
					continue;
				allTags.push( tags[j] );
				
				if( i > 0 || j > 0 )
					para.appendChildX(", ");
				para.appendChildX({ tag:"a", href:"/posts?tags="+tags[j], text:tags[j].replace(/_+/g, ' ').replace(/,/g, ',\u200B') });
			}
		}
		if( subStat ) subStat.appendChild(para);
	}
	
	//MS_deleteValue( varPrefix+"_lock" );
	if( MS_getValue( varPrefix+"_lock" ) )
		return;
	if( subDiv )
		subDiv.getElementsByTagName("h2")[0].appendChild(document.createElement("span")).textContent = " [Loading...]";
	
	var postResults = [], currentResults = [];
	runQuery(0, 1);
	
	function runQuery( argIndex, page )
	{
		//Set 10 second lock every time a query runs, to prevent concurrent queries
		MS_setValue( varPrefix+"_lock", true, 10 );
		
		if( argIndex >= queryList.length )
			return subBuildThumbs();//No more arguments, start building
		
		if( page == 1 )
			currentResults = [];//First page, no results yet
		if( page > queryList[argIndex].pages )
		{
			//No more pages.

			if( argIndex == 0 || !isIntersect )
				postResults = postResults.concat( currentResults );
			else
			{
				//Find the intersection between the previous queries and this one, using the order of this one.
				var oldPostResults = postResults;
				postResults = [];
				
				for( var i = 0; i < currentResults.length; i++ )
				{
					for( var j = 0; j < oldPostResults.length; j++ )
						if( oldPostResults[j]["id"] == currentResults[i]["id"] )
						{
							postResults.push( oldPostResults[j] );
							break;
						}
				}
				if( postResults.length == 0 )
					argIndex = queryList.length;//Intersection with empty set :(
			}
			return runQuery( argIndex + 1, 1 );
		}

		//Fetch next page
		MS_requestAPI( "/posts.json?tags="+queryList[argIndex].search.replace(/ +/g,'+')+"&page="+page, function(responseDetails)
		{
			var result;
			try { result = MS_parseJSON(responseDetails.responseText); }
			catch(e) { return runQuery( argIndex, page ); }
			
			if( queryList[argIndex].filter.length == 0 )
				currentResults = currentResults.concat( result );
			else for( var i = 0; i < result.length; i++ )
			{
				//Only add posts that contain all of the tags in the filter
				var pTags = result[i]["tag_string"].toLowerCase().split(' '), lastIdx = 0;
				for( var j = 0; lastIdx >= 0 && queryList[argIndex].filter && j < queryList[argIndex].filter.length; j++ )
				{
					if( queryList[argIndex].filter[j].indexOf("user:") != 0 )
						lastIdx = pTags.indexOf( queryList[argIndex].filter[j] );
					else if( queryList[argIndex].filter[j].replace(/_/g,' ').toLowerCase() != "user:"+result[i]["uploader_name"].toLowerCase() )
						lastIdx = -1;
				}
				if( lastIdx >= 0 )
					currentResults.push( result[i] );
			}
			
			//Go to next page if less than the maximum amount was returned, or if we have enough thumbs already
			if( result.length < 100 || ( queryList.length == 1 && currentResults.length > maxThumbs && currentResults.length > maxExpanded ) )
				page = 9999;
			
			//Get next page
			runQuery( argIndex, page + 1 );
		});
	}
	
	function subBuildThumbs()
	{
		//Sort union subscriptions by decreasing post ID
		if( !isIntersect && queryList.length > 1 )
			postResults.sort( function(a,b) { return( b["id"] - a["id"] ); } );
		
		//Remove duplicates
		for( var i = 1; i < postResults.length; i++ )
		{
			for( var j = i - 1; j > 0; j-- )
				if( postResults[j]['id'] == postResults[i]['id'] )
				{
					//An earlier post already has this ID, so remove this post
					postResults.splice( i--, 1 );
					break;
				}
		}

		if( subDiv )
			subDiv.innerHTML = "";//Remove the old title that may have been added at the start
		else
			subDiv = createElementX({ tag:"div" });//Dummy DIV, only its contents are used
		
		function zeroIt(a) { return( a < 10 ? "0"+a : a ); }
		var tdate = new Date();
		var timestamp = " ("+(tdate.getMonth()+1)+"-"+zeroIt(tdate.getDate())+" "+zeroIt(tdate.getHours())+":"+zeroIt(tdate.getMinutes())+")";

		subDiv.appendChildX({ tag:"h2", title:timestamp+'\n\n'+queryString }).appendChildX([ { tag:"a", href:"/posts?tags="+queryList[0].search.replace(/ +/,'+'), text:title }, ( useTimestamp ? timestamp : "" ) ]);
		subDiv.appendChildX({ tag:"div", class:"box" }).appendChild( buildThumbs( postResults, maxThumbs ) );
		
		MS_setValue( varPrefix+"_thumbList", subDiv.innerHTML, 7*24*3600 );
		MS_setValue( varPrefix+"_lock", true, refreshInterval * 3600 );
		
		if( maxExpanded > maxThumbs )
		{
			postResults = postResults.slice( 0, maxExpanded );
			MS_setValue( varPrefix+"_JSON", postResults, 7*24*3600 );
		}
		
		addExpandLink(subDiv);
	}
	
	function addExpandLink(outerDiv)
	{
		var json = maxExpanded > 0 && MS_getValue( varPrefix+"_JSON" );
		var head = json && json.length > maxThumbs && outerDiv.getElementsByTagName("h2")[0];
		if( !head ) return;
		
		json.splice( 0, maxThumbs );
		
		var linkShow = head.appendChild( createElementX({ tag:"a", href:"#", onclick:"return false;", text:" »", style:"display:inline" }) );
		var linkHide = head.appendChild( createElementX({ tag:"a", href:"#", onclick:"return false;", text:" «", style:"display:none" }) );
		var spanMore = outerDiv.appendChild( createElementX({ tag:"span", style:"display:none" }) );
		
		linkShow.addEventListener( "click", function()
		{
			if( spanMore.innerHTML == "" )
				spanMore.appendChild( buildThumbs( json, maxExpanded ) );
			linkShow.style.display = "none";
			linkHide.style.display = "inline";
			spanMore.style.display = "inline";
		}, true );
		
		linkHide.addEventListener( "click", function()
		{
			linkShow.style.display = "inline";
			linkHide.style.display = "none";
			spanMore.style.display = "none";
		}, true );		
	}
}


/**
	Runs a truncated "Find artist" search on posts with URL sources but no artist tag and displays the results
	below the source, along with the number of other posts returned by a source search.
 */
function sourceStatLinks( findArtist, findSource )
{
	var source = !recursion && document.getElementById("post_source");
	var sourceStat = source && source.value.indexOf("http") == 0 && document.evaluate("//aside[@id='sidebar']/section/ul/li[contains(text(),'Source:')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if( !sourceStat )
		return; 
	
	source = source.value;

	var postSearch = "tags=status:any+source:"+source.replace( /[^\/]+$/, '' )+"*";
	var pixivArtist = 0, statLink = sourceStat.childNodes[1];
	if( statLink.href && /\.pixiv.net\/(img|img[0-9]+\/img)\/[^ \/]+\/[0-9]+/.test(source) )
	{
		pixivArtist = source.replace(/(.*\/img\/|\/.*)/g,'');
		postSearch = "tags=status:any+source:pixiv/"+pixivArtist+"/*";
		//statLink.href += '#'+pixivArtist;
	}

	var findArtistDiv, sourceSearchDiv;
	if( (findArtist || findSource) && !document.getElementById("tag-list").getElementsByClassName("category-1")[0] )
	{
		findArtistDiv   = createElementX({tag:"div", style:"margin-left:1.5em; word-wrap:break-word; display:none" });
		sourceSearchDiv = createElementX({tag:"div", style:"margin-left:1.5em; word-wrap:break-word; display:none" });
		sourceStat.parentNode.insertBefore( createElementX([ findArtistDiv, sourceSearchDiv ]), sourceStat.nextSibling );
		
		if( findArtist )
			artistSearch();
		if( findSource )
			sourceSearch();
	}
	
	function artistSearch()
	{
		MS_requestAPI( '/artists.json?search[name]='+source, function(responseDetails)
		{
			var result;
			try{ result = MS_parseJSON(responseDetails.responseText); }
			catch(e){ return artistSearch(); }
			
			if( result.length < 4 )
			{
				for( var i = 0; i < result.length; i++ )
				{
					findArtistDiv.innerHTML += '<li class="category-1"><a href="/artists/show_or_new?name='+result[i]["name"]+'" onclick="document.getElementById(\'post-edit-link\').click(); Danbooru.RelatedTag.toggle_tag({target:this,preventDefault:function(){}}); return false;">'+result[i]["name"]+'</a></li>';
				}
				findArtistDiv.style.display = "block";
			}
		});
	}
	
	//Source search, clipping off the filename
	function sourceSearch()
	{
		MS_requestAPI( "/posts.json?"+postSearch, function(responseDetails)
		{
			var result;
			try{ result = MS_parseJSON(responseDetails.responseText); }
			catch(e){ return sourceSearch(); }

			if( result.length == 100 )
				result = "At least 99 other posts";
			else if( result.length == 2 )
				result = "1 other post";
			else
				result = ( result.length ? result.length - 1 : 0 )+" other posts";
			
			sourceSearchDiv.innerHTML = '<a href="/posts?'+postSearch+'">'+result+'</a>';
			sourceSearchDiv.style.display = "block";
		});
	}
}


/**
	Replaces text in DText (http://danbooru.donmai.us/help/dtext) textareas as it is being input,
	as well as the names of all links.
	
	Only the first match will be used for a given input/link.
	
	replaceList: An array of objects with the following properties (regex and at least one of the others):
		regex: Regex to match against
		text: Replacement for textareas
		link: Replacement for link names
 */
function dtextReplace( replaceList )
{
	var list = content && !recursion && ( replaceList instanceof Array ) && replaceList;
	if( !list ) return;

	for( var i = 0; i < replaceList.length; i++ )
		replaceList[i].regex = new RegExp( replaceList[i].regex );
	
	MS_observeInserts( subReplace )();
	////////////////
	function subReplace(e)
	{
		if( e && !e.target.getElementsByTagName )
			return;
		
		var i, j, textList = ( e ? e.target : document ).getElementsByTagName("textarea");
		var linkList = ( e ? e.target : document ).getElementsByTagName("a");
		
		for( i = 0; i < textList.length; i++ )
			if( !/(artist_url_string|post_tag_string)/.test(textList[i].id) )
				textList[i].addEventListener( "input", function()
				{
					for( var i = 0; i < list.length; i++ )
					{
						if( list[i].text && list[i].regex.test(this.value) )
						{
							this.value = this.value.replace( list[i].regex, list[i].text );
							break;
						}
					}
				}, false );		
		for( i = 0; i < linkList.length; i++ )
			for( j = 0; j < list.length; j++ )
				if( list[j].link && list[j].regex.test(linkList[i].textContent) )
				{
					linkList[i].textContent = linkList[i].textContent.replace( list[j].regex, list[j].link );
					break;
				}	
	}
}


/**
	Show comment scores next to the vote links.
	
	[ minScore, maxScore ] specify the range of values to show for; a blank/invalid value equals no limit for that end of the range.
*/
function scoreComments(minScore,maxScore)
{
	if( recursion )
		return;
	
	MS_observeInserts(function(e)
	{
		var comments;
		if( !e )
			comments = document.getElementsByClassName("comment");
		else if( e.target.className && e.target.className.indexOf("comment") >= 0 )
			comments = [ e.target ];
		else if( e.target.getElementsByClassName )
			comments = e.target.getElementsByClassName("comment");
		
		for( var i = 0; i < comments.length; i++ )
		{
			var score = parseInt(comments[i].getAttribute("data-score"));
			if( score < minScore || score > maxScore )
				/* noop to also handle NaNs */;
			else
				comments[i].getElementsByTagName("menu")[0].appendChild( createElementX({ tag:"li", style:( score < 0 ? "color:red" : ""), text:"Score: "+score }) );
		}
	} )();
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
		var fragment = createElementX(document.createDocumentFragment());
		for( var i = 0; i < arguments.length; i++ )
			fragment.appendChildX( arguments[i] );
		return fragment;
	}
	
	if( obj instanceof Element || obj instanceof DocumentFragment )
	{
		obj.appendChildX = function() { return obj.appendChild( createElementX.apply(this,arguments) ); }
		return obj;
	}
	else if( typeof(obj) == "string" )
		return document.createTextNode(obj);
	else if( !obj.tag )
	{
		if( obj.childNodes )
			return obj;
		if( elem in obj )
			return document.createTextNode(""+obj);
		return createElementX([]);// {}
	}
	
	var elem = document.createElement(obj.tag);
	for( var key in obj )
	{
		if( key == "text" || key == "textContent" )
			elem.textContent = obj[key];
		else if( key == "innerHTML" )
			elem.innerHTML = obj[key];
		else if( key != "tag" )
			elem.setAttribute(key, obj[key]);
	}
	return createElementX(elem);
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
			if( isNaN( Number(text[i]) ) )
			{
				try{ text[i] = MS_parseJSON( text[i] ); }
				catch(err){ throw "Bad JSON in text["+i+"]: "+text[i]; }
			}
		return text;
	}
	else if( typeof(text) == "string" ) return JSON.parse(text, function(key,val)
	{
		//Recursively parse strings that look like objects
		if( typeof(val) == "string" && isNaN( Number(val) ) )
		{
			try{ return MS_parseJSON(val); }
			catch(err){}
		}
		return val;
	});
	//Not a string or array, so return unchanged
	return text;
}

function MS_alert( messageP )
{
	//Creates a large "alert" box that collects multiple alerts and doesn't pause the script
	var showAlerts = true;
	var dialog = document.body.appendChild( createElementX({ tag:"div", style:"position:fixed; left:10%; top:10%; z-index:10;	background-color:white;	display:none; width:20em; height:20em; border:2px solid black; padding:20px 20px 20px 20px; overflow:auto" }) );
	
	var header = dialog.appendChildX({ tag:"h4", text: "Miscellaneous Tweaks " });
	dialog.appendChildX({ tag:"hr" });
	var text = dialog.appendChildX({ tag:"div" });
	
	header.appendChildX({ tag:"input", type:"button", value:"Clear", title:"Clear all warnings and hide this alert." }).addEventListener( "click", function(){ dialog.style.display = "none"; text.innerHTML = ""; } );
	header.appendChildX(" ");
	header.appendChildX({ tag:"input", type:"button", value:"Hide", title:"Hide this alert without clearing its contents." }).addEventListener( "click", function(){ dialog.style.display = "none"; } );
	header.appendChildX(" ");
	header.appendChildX({ tag:"input", type:"button", value:"Stop", title:"Stop additional alerts from being triggered." }).addEventListener( "click", function(){ showAlerts = false; } );
	
	MS_alert = function(message)
	{
		if( showAlerts )
		{
			text.appendChildX(""+message, { tag:"hr" });
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

/** Makes request to API link, e.g. "/posts.json". If "limit=" isn't included, limit=100 is added to the end. */
function MS_requestAPI( link, loadFun, errFun )
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url:location.protocol+"//"+location.host+link+( link.indexOf("limit=") < 0 ? ( link.indexOf("?") > 0 ? "&limit=100" : "?limit=100" ) : "" ),
		onload:loadFun,
		onerror:( errFun ? errFun : function(err){ MS_requestAPI( link, loadFun ); } )
	});
}

/** Helper method to construct a document fragment of thumbnails from post API results */
function buildThumbs(json, limit)
{
	var i, result = document.createDocumentFragment();
	if( limit <= 0 )
		return result;
	
	if( typeof(json) == "string" )
		try{ json = MS_parseJSON(json); } catch(e){ return result; }
	
	for( i = 0; limit-- > 0 && i < json.length; i++ )
	{
		var borderColors = [], imgStyle = "", status = "post-preview", flag = "";

		if( json[i].has_children )
		{
			borderColors.push("#0F0");
			status += " post-status-has-children";
		}
		if( json[i].parent_id )
		{
			borderColors.push("#CC0");
			status += " post-status-has-parent";
		}
		
		if( json[i].is_deleted )
		{
			borderColors.push("#000");
			status += " post-status-deleted";
			flag = "deleted";
		}
		else if( json[i].is_pending )
		{
			borderColors.push("#00F");
			status += " post-status-pending";
			flag = "pending";
		}
		else if( json[i].is_flagged )
		{
			borderColors.push("#F00");
			status += " post-status-flagged";
			flag = "flagged";
		}
		
		if( borderColors.length > 1 )
		{
			//	app/assets/javascripts/posts.js 
			imgStyle = "border-color: "
			if( borderColors.length == 3 )
				imgStyle += borderColors[0]+" "+borderColors[2]+" "+borderColors[2]+" "+borderColors[1]; 
			else
				imgStyle += borderColors[0]+" "+borderColors[1]+" "+borderColors[1]+" "+borderColors[0];
			//$img.css("border", "2px solid");
		}
		
		var article = createElementX({ "tag":"article",
				"class":status,
				"id":"post_"+json[i].id,
				"data-id":json[i].id,
				"data-tags":json[i].tag_string,
				"data-uploader":json[i].uploader_name,
				"data-approver-id":( json[i].approver_id || "" ),
				"data-rating":json[i].rating,
				"data-width":json[i].image_width,
				"data-height":json[i].image_height,
				"data-flags":flag,
				"data-parent-id":( json[i].parent_id || "" ),
				"data-has-children":json[i].has_children,
				"data-score":json[i].score,
				"data-fav-count":json[i].fav_count });
		article.appendChild( createElementX({ tag:"a", href:"/posts/"+json[i].id }) ).appendChild( createElementX({ tag:"img", src:"/data/preview/"+json[i].md5+".jpg", alt:json[i].tag_string, title:json[i].tag_string+" user:"+json[i].uploader_name+" rating:"+json[i].rating+" score:"+json[i].score, style:imgStyle }) );
		result.appendChild(article);
	}
	return result;
} 
