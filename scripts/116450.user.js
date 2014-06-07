// ==UserScript==
// @name           FVWM 10-2011 01.user.js
// @namespace      http://userscripts.org/users/414800
// @description    Manages Wall Posts for Various FB Games
// @include        http*://www.facebook.com/*
// @exclude        http*://www.facebook.com/editaccount*
// @exclude        http*://www.facebook.com/friends/*
// @exclude        http*://www.facebook.com/messages*
// @exclude        http*://www.facebook.com/settings*
// @exclude        http*://www.facebook.com/help/*
// @exclude        http*://www.facebook.com/logout*
// @exclude        http*://www.facebook.com/login*
// @exclude        http*://www.facebook.com/ajax/*
// @exclude        http*://www.facebook.com/groups/*
// @exclude        http*://www.facebook.com/reqs*
// @exclude        http*://www.facebook.com/campaign/*
// @exclude        http*://www.facebook.com/notifications*
// @exclude        http*://www.facebook.com/editprofile*
// @exclude        http*://www.facebook.com/posted*
// @exclude        http*://www.facebook.com/plugins*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.5.47
// @copyright      Joe Simmons and Charlie Ewing
// @require        http://userscripts.org/scripts/source/29910.user.js 
// @require        http://sizzlemctwizzle.com/updater.php?id=86674&days=1
// ==/UserScript== 

// Based on script built by Joe Simmons in Farmville Wall Manager

(function() {
	var version = "1.5.47";

	//returns true if value is in array
	Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};

	//returns the position of value in array
	Array.prototype.inArrayWhere = function(value) {for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) return i;}return false;};

	Array.prototype.last = function() {return this[this.length - 1];};

	//returns true if string contains s
	String.prototype.find = function(s,start) {start=start||0; return (this.indexOf(s,start) != -1);};

	//returns true if string contains s
	String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};

	//returns true if string starts with s
	String.prototype.startsWith = function(s) {return (this.substring(0, s.length) == s);};

	//removes white space in a string
	String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};

	//removes white space in a string
	String.prototype.noLineBreaks = function(s) {return (this.replace(/(\r\n|\n|\r)/gm," "));};

	//returns the value of named param given http://www.site.com/page.ext?params=values#hashes=values
	String.prototype.getUrlParam = function(s) {
		try{
			var params = this.split("?")[1].split("#")[0].split("&");
			//cycle through params and get one that starts with var s
			for(p=0;p<params.length;p++){if(params[p].startsWith(s+"=")) return params[p].split("=")[1];}
		}catch(e){return "";}
	};

	//returns the value of named param given http://www.site.com/page.ext?params=values#hashes=values
	String.prototype.getHashParam = function(s) {
		try{
			var params = this.split("#")[1];
			//cycle through params and get one that starts with var s
			for(p=0;p<params.length;p++){if(params[p].startsWith(s+"=")) return params[p].split("=")[1];}
		}catch(e){return "";}
	};

	//removes any leading and trailing "
	String.prototype.unQuote = function() {return this.replace(/^"|"$/g, '');};

	//removes any leading and trailing [ ]
	String.prototype.unBracket = function() {return this.replace(/^\[|\]$/g, '');};

	// dont run in frames, prevents detection and misuse of unsafewindow
	try {
		var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
		if(unsafeWindow.frameElement != null) return;
	} catch(e) {}


	// setup images array
	var imgs = {
		//bg : "http://oi40.tinypic.com/34s0aba.jpg",
		logo : "http://i55.tinypic.com/9bdqht.png",
		icon : "http://i56.tinypic.com/s46edh.jpg",
		fb : "http://i1212.photobucket.com/albums/cc445/gmbha1/facebook.gif",
		plugin : "http://i52.tinypic.com/jkfxmw.png",
		pluginwm : "http://i52.tinypic.com/28vsw01.png",
		filter : "http://i632.photobucket.com/albums/uu45/kirkshulman/main-icon-filter-normal.png"
	};

	function JSONmerge() {
		var a = arguments, b = [], i, f, g, c = {};
		for (i in (new Array(a.length+1)).join(1).split("")) b.push(a[i]);
		for (f in b) for (g in b[f]) c[g] = b[f][g];
		return c;	
	};

	// Get is Greasemonkey running
	var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');

	// Get element by id shortform with parent node option
	function $(ID,root) {return (root||document).getElementById(ID);}

	// Add GM_addStyle if we're not in FireFox
	var GM_addStyle = function(css) {
        	var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        	if(head) {
        		style.type = 'text/css';
        		try {style.innerHTML = css} catch(x) {style.innerText = css}
        		head.appendChild(style);
		}
    	};

	// Get an option from registry without using gm_config
	function getOpt(opt){
		return JSON.parse(GM_getValue(opt, '{}'));		
	}

	// set an option in registry without using gm_config
	function setOpt(opt,value){
		GM_setValue(opt,JSON.stringify(value));
	}

	// Fade by JoeSimmons. Fade in/out by id and choose speed: slow, medium, or fast
	// Syntax: fade('idhere', 'out', 'medium');
	function fade(e, dir, s) {
		if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
		dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
		var node = (typeof e=='string') ? $(e) : e, speed = {slow : 400, medium : 200, fast : 50};
		if(!s) var s='medium'; // Make speed medium if not specified
		if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
		if(dir=='in') node.style.opacity = '0';
		else if(dir=='out') node.style.opacity = '1';
		node.style.display='';
		var intv = setInterval(function(){
			if(dir=='out') {
				if(parseFloat(node.style.opacity)>0) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
				else {
					clearInterval(intv);
					node.style.display='none';
				}
			}
			else if(dir=='in') {
				if(parseFloat(node.style.opacity)<1) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
				else {
					clearInterval(intv);
				}
			}
		}, speed[s]);
	};

	//encapsulates element e within element c, returning element c
	//element c is built at the location of element e
	function contain(e,c) {
		e.parentNode.insertBefore(e,c);
		c.appendChild(e);
		return c;
	};

	//slides element e toward the specified destination offset
	//specify [t, l, r, b] top, left, right, and bottom as the final offset
	//specify s as the number of MS the move should loop on
	function slide(e,t,l,r,b,s,p) {
		s=s||50;p=p||10;

		var top= e.style.top; top=parseInt(top); top=(isNaN(top))?0:top;
		var bottom = e.style.bottom; bottom=parseInt(bottom); bottom=(isNaN(bottom))?0:bottom;
		var left= e.style.left; left=parseInt(left); left=(isNaN(left))?0:left;
		var right = e.style.right; right=parseInt(right); right=(isNaN(right))?0:right;

		p1=(p>Math.abs(t))?Math.abs(t):p;
		if(t>0) {e.style.top = (top+p1)+"px";t-=p1;}
		else if (t<0) {e.style.top = (top-p1)+"px";t+=p1;}

		p1=(p>Math.abs(l))?Math.abs(l):p;
		if(l>0) {e.style.left = (left+p1)+"px";l-=p1;}
		else if (l<0) {e.style.left = (left-p1)+"px";l+=p1;}

		p1=(p>Math.abs(r))?Math.abs(r):p;
		if(r>0) {e.style.right = (right+p1)+"px";r-=p1;}
		else if (r<0) {e.style.right = (right-p1)+"px";r+=p1;}

		p1=(p>Math.abs(b))?Math.abs(b):p;
		if(b>0) {e.style.bottom = (bottom+p1)+"px";b-=p1;}
		else if (b<0) {e.style.bottom = (bottom-p1)+"px";b+=p1;}

		if (t!=0||l!=0||r!=0||b!=0) window.setTimeout(function(){slide(e,t,l,r,b,s,p);},s);
	};

	function getIsFF4() {
		return (navigator.userAgent.find('Firefox/4.'));
	}

	//click a node object
	function click(e) {
		if(!e && typeof e=='string') e=document.getElementById(e);
		if(!e) return;
		var evObj = e.ownerDocument.createEvent('MouseEvents');
		evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
		e.dispatchEvent(evObj);
		evObj=null;
	}

	//short form for evaluate
	function selectNodes(xPath,params){
		params=(params||{});
		return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);
	}

	//short form for evaluate with single node return
	function selectSingleNode(xPath,params){
		params=params||{}; params['type']=9;
		return selectNodes(xPath,params).singleNodeValue;
	}

	//short form for evaluate with single node return
	function countNodes(xPath,params){
		params=params||{}; params['type']=1;
		return selectNodes(xPath,params).numberValue;
	}

	//deletes all snapshots or iterations in an xpathResult object
	function deleteNodes(xPath,params) {
		params=params||{};
		var o=selectNodes(xPath,params); if (o){
			if(o.snapshotItem) for(var i=o.snapshotLength-1; (item=o.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else for(var i=o.length-1; i>=0; i--) if(o[i]) o[i].parentNode.removeChild(o[i]);
		}
		o=null;
	};

	//hides all snapshots or iterations in an xpathResult object
	function hideNodes(xPath,params) {
		params=params||{};
		var o=selectNodes(xPath,params); if (o){
			if(o.snapshotItem) for(var i=o.snapshotLength-1; (item=o.snapshotItem(i)); i--) item.style.display="none";
		}
		o=null;
	};

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	function createElement(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	}

	//Returns the value of property p from element e
	//e must be an element object
	function getPropertyFromElement(e, p) {
		if(e==null) return "error: element is null";
		//main.debug(e.innerHTML + ", " + p);
		return e.innerHTML.split(p+"=\"")[1].split("\"")[0];
	}

	function getTranslation(s,lang) {
		google.language.translate(s, 'en', lang, function(result) {
			var translated = document.getElementById("translation");
			if (result.translation) translated.innerHTML = result.translation;
		});
	}

	//short text versions for GM_config menu options
	function checkBox(l,d,c,n){
		if(c) return ({type:"checkbox",label:l,"default":(d||false),kids:c,newitem:n});
		else return ({type:"checkbox",label:l,"default":(d||false),newitem:n});
	}
	
	function hidden(l,d,c){
		if(c) return ({type:"hidden",label:l,"default":(d||false),kids:c});
		else return ({type:"hidden",label:l,"default":(d||false)});
	}

	function optionBlock(l,c,hideSelectAll){
		if (hideSelectAll==null) hideSelectAll = false;
		if(c) return ({type:"optionblock",label:l,kids:c,hideSelectAll:hideSelectAll});
		else return ({type:"optionblock",label:l,hideSelectAll:hideSelectAll});
	}

	function separator(l,s,c,hideSelectAll){
		if(c){
			if(s) return ({type:"separator",label:l,section:s,kids:c});
			else return ({type:"separator",label:l,kids:c});
		}
		else {
			if(s) return ({type:"separator",label:l,section:s});
			else return ({type:"separator",label:l});
		}
	}
	
	function section(l,c){
		return ({type:"section",label:l,kids:c});
	}

	function inputBox(l,d){
		return ({type:"float",label:l,"default":(d||0)});
	}
	
	function button(l,s){
		return ({type:"button",label:l,script:s});
	}

	function anchor(l,u,t){
		return ({type:"link",label:l,href:u,title:(t||'')});
	}

	//returns the number value of the current time
	function timeStamp(){
		return (new Date()).getTime();
	}



	//container for custom error console
	var doDebug = true; //always true until told otherwise after gmconfig loads
	var debugLevel = 0; //always max until told otherwise
	var debug = {
		initialized: false,
		windowNode: null, //container for created debug window
		messageNode: null,

		init: function(params){
			params=params||{};

			if (!($("WM_debugWindow"))) {
				GM_addStyle(""+
					"#WM_debugWindow {height:249px; position:fixed; right: 2px; bottom: 2px; z-index: 9999; min-width: 50%;}\n"+
					"#WM_debugWindow a {color:white;}\n"+
					".errConsoleLine {padding-top: 3px; padding-bottom: 3px; border-bottom:solid #760202 2px;}\n"+
					".errConsoleScript {}\n"+
					".errConsoleFunction {}\n"+
					".errConsoleMessages {height:220px;overflow: scroll;color: #FFCA5E; background-color: #CA0704; background-image: -moz-linear-gradient(top, #CA0704, #9C0505); font-weight: bold; font-size: 12px; border-radius: 0px 5px 5px 5px; border:solid #760202 3px;padding-left: 6px; padding-right: 6px;}\n"+
					".errConsoleLineNum {}\n"+
					".errConsoleErrNum {}\n"+
					".errConsoleMessage {}\n"+
					".errConsoleComment {}\n"+
					".errConsoleButtonBorder {border-radius: 5px 5px 0px 0px; border:solid #760202 2px; border-bottom:0px;}\n"+
					".errConsoleCloseButton {background-color: #FFDDBA; background-image: -moz-linear-gradient(top, #FFDDBA, #9F0A0C);font-size: 12px; font-weight: bold; color: white; border-radius: 5px 5px 0px 0px; border:solid #BE1A11 2px;border-bottom:0px;padding: 6px;display:inline-block;}\n"+
					""
				);
				document.body.appendChild(
					debug.windowNode = createElement("div",{id:"WM_debugWindow",style:"display:none;"},[
						//createElement("div",{className:"errConsoleButtonBorder"},[]),
						createElement("a",{href:"javascript:void(0)",className:"errConsoleCloseButton",textContent:"Debug",onclick:debug.toggle}),
						debug.messageNode=createElement("div",{href:"javascript:void(0)",className:"errConsoleMessages"})

					])
				);
			}
			debug.initialized = true;
		},
	
		print: function(msg, params){
			if (!doDebug) return;
			params=params||{};

			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			var level=params["level"]||1; //default to warning status
			if (level<debugLevel) return; //dont show unwanted level warnings and errors

			var line=params["lineNumber"]||"";
			var script=params["scriptName"]||"";
			var func=params["functionName"]||"";
			var errnum=params["errorNumber"]||"";
			var comment=params["comment"]||"";
			var type=params["type"]||"";
			
			if (debug.messageNode) {
				debug.messageNode.appendChild(
					createElement("div",{className:"errConsoleLine "+type},[
						createElement("span",{className:"errConsoleScript",textContent:script}),
						createElement("span",{className:"errConsoleFunction",textContent:func}),
						createElement("span",{className:"errConsoleLineNum",textContent:line}),
						createElement("span",{className:"errConsoleErrNum",textContent:errnum}),
						createElement("span",{className:"errConsoleMessage",innerHTML:msg}),
						createElement("span",{className:"errConsoleComment",textContent:comment}),
					])
				);
			}

			//debug.show();
		},

		show: function(){
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) debug.windowNode.style.display="";
		},

		hide: function(){
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) debug.windowNode.style.display="none";
		},

		toggle: function(){
			if (!debug.initialized) debug.init();
			if (!debug.initialized) return;

			if (debug.windowNode) {
				var isClosed = parseInt(debug.windowNode.style.bottom)<0;
				slide(debug.windowNode,0,0,0,(isClosed)?220:-220,1);
			}
		},
	};
	debug.init();
	if (debug.initialized) debug.print("Debug Console Initialized");


	// GM_config by JoeSimmons/sizzlemctwizzle/izzysoft/CharlieEwing
	var GM_config = {
 		storage: 'GM_config', // This needs to be changed to something unique for localStorage

		initTree: function(settings,i,stored) {
			GM_config.doSettingValue(settings, stored, i, settings, true);
			if(settings[i].kids) for(var kid in settings[i].kids) {
				GM_config.initTree(settings[i]["kids"],kid,stored);
			}
		},

 		init: function() {
        		// loop through GM_config.init() arguements
			for(var i=0,l=arguments.length,arg; i<l; ++i) {
				arg=arguments[i];
				switch(typeof arg) {
            				case 'object': 
						for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
								case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
								case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
								case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
								default: var settings = arg;
							}
						} break;
            				case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        		// could be custom CSS or the title string
					case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
						else GM_config.title = arg;
						break;
				}
			}
			if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
			var stored = GM_config.read(); // read the stored settings
			GM_config.passed_values = {};
			for (var i in settings) {
				GM_config.initTree(settings,i,stored);
			}
			GM_config.values = GM_config.passed_values;
			GM_config.settings = settings;
			if (css) GM_config.css.stylish = css;
 		},

		append: function(newset) {
			GM_config.settings = JSONmerge(GM_config.settings, newset);
			//you should call updateSettingsvalues after each use of this function
		},

		updateSettingsValues:function(){
			var stored = GM_config.read(); // read the stored settings
			var settings = GM_config.settings;
			GM_config.passed_values = {};

			for (var i in settings) {
				GM_config.initTree(settings,i,stored);
			}

			GM_config.values = GM_config.passed_values;
			GM_config.settings = settings;			
		},

 		open: function() {
 			if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
			// Create frame
			document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none !important; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        		GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
			GM_config.frame.addEventListener('load', function(){


				var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
				obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

				// Add header and title
				frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

				// Append elements
				for (var i in settings) {
					frameBody.appendChild(obj.addToFrame(settings[i], i, false));
				}

				// Add save and close buttons
				frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
					obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
					obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
					obj.create('div', {className:'reset_holder block', kids:new Array(
						obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
				)}))}));

				obj.center(); // Show and center it
				window.addEventListener('resize', obj.center, false); // Center it on resize
				if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
				// Close frame on window close
				window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);


			}, false);
		 },

		doSaveTree: function(f,fields) {
			var type, typewhite=/radio|text|hidden|checkbox/;
			
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if (field){
				if(typewhite.test(field.type)) type=field.type;
				else type=field.tagName.toLowerCase();
				GM_config.doSave(f, field, type, fields);
			}		
			if(kids) for(var kid in kids) {
				GM_config.doSaveTree(kid,kids);
			}
		},

 		close: function(save) {
			if(save) {
				var fields = GM_config.settings;
				for(f in fields) {
					GM_config.doSaveTree(f,fields);
				}
                		if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                		GM_config.save();
			}
			if(GM_config.frame) GM_config.remove(GM_config.frame);
			delete GM_config.frame;
        		if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 		},

 		set: function(name,val) {GM_config.values[name] = val;},

		get: function(name) {return GM_config.values[name];},

 		isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',

 		log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),

 		getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },

 		setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },

 		save: function(store, obj) {
    			try {
      				var val = JSON.stringify(obj||GM_config.values);
      				GM_config.setValue((store||GM_config.storage),val);
    			} catch(e) {
      				GM_config.log("GM_config failed to save settings!");
    			}
 		},

 		read: function(store) {
    			try {
      				var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    			} catch(e) {
      				GM_config.log("GM_config failed to read saved settings!");
      				rval = {};
    			}
    			return rval;
 		},

 		reset: function(e) {
			e.preventDefault();
			var type, obj = GM_config, fields = obj.settings;
			for(f in fields) {
				var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
				if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
				else type=field.tagName.toLowerCase();
				GM_config.doReset(field, type, null, f, null, false);
				if(kids) for(var kid in kids) {
					var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
					if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
					else type=field.tagName.toLowerCase();
					GM_config.doReset(field, type, f, kid, true);
				}
			}
 		},

		selectBlock: function(e) {
			var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:$(e,$("GM_config").contentDocument).parentNode,doc:$("GM_config").contentDocument});
			for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=true;
			//http://i55.tinypic.com/6ih93q.png
		},

		deselectBlock: function(e) {
			var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:$(e,$("GM_config").contentDocument).parentNode,doc:$("GM_config").contentDocument});
			for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=false;
			//http://i55.tinypic.com/2lk2xyw.png
		},

		//highlights option menu elements in an array, first clearing any elements provided in clearFirst array
		highlightElements: function(options,clearFirst) {
			if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("GM_config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","");
			if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("GM_config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","")+" highlight";
		},

		//selects option menu elements in an array, first clearing any elements provided in clearFirst array
		selectElements: function(options,clearFirst) {
			if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("GM_config").contentDocument)) box.checked=true;
			if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("GM_config").contentDocument)) box.checked=true;
		},

		//selects option menu elements with a certain prefix, first clearing any elements starting with text appearing in clearFirst
		//this button only selects elements at the level the button appears or deeper in the option menu tree
		selectElementsByPrefix: function(prefix,clearFirst) {

			if (clearFirst){
				var boxes = selectNodes(".//input[(@type='checkbox') and starts-with(@id, 'field_"+clearFirst+"')]",{type:6,node:$("header",$("GM_config").contentDocument),doc:$("GM_config").contentDocument});
				for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=true;
			};

			if (prefix){
				var boxes = selectNodes(".//input[(@type='checkbox') and starts-with(@id, 'field_"+prefix+"')]",{type:6,node:$("header",$("GM_config").contentDocument),doc:$("GM_config").contentDocument});
				for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=true;
			};

		},

 		addToFrame : function(field, i, k, prevSibling) {
			var elem, nextElem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
			switch(field.type) {
				case 'section': 	
					elem = create('div', {kids:new Array(
				  		create('a', {className:'section_header center text_border_sec', href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggle(i,true);}}),
				  		create('div', {id:'field_'+i, className:'section_kids', style:value?"display: none;":""})
				  	), className: 'section_header_holder'+(field.newitem?' newopt':'')});
					nextElem = elem.getElementsByTagName('div')[0];
					break;
				case 'separator':	
					elem = create("div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i+'_all',className:'field_label block_select_all',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){GM_config.selectBlock('field_'+i);},style:'float:right;'}),
						create('input', {id:'field_'+i+'_none',className:'field_label block_select_none',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){GM_config.deselectBlock('field_'+i);},style:'float:right;'}),
				  		create('a', {className:'separator_label text_border_sep', href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggle(i,true);}}),
						create('div', {id:'field_'+i, className:'section_kids', style:value?"display: none;":""})
					), className: 'separator section_header_holder'+(field.newitem?' newopt':'')});
					nextElem = elem.getElementsByTagName('div')[0];
					break;
				case 'optionblock':
					elem = create("div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'optionblock_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'hidden', value:''}),
						create('input', {id:'field_'+i+'_all',className:'field_label block_select_all',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){GM_config.selectBlock('field_'+i);}}),
						create('input', {id:'field_'+i+'_none',className:'field_label block_select_none',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){GM_config.deselectBlock('field_'+i);}})
					), className: 'config_var underline'+(field.newitem?' newopt':'')});
					break;
				case 'textarea':
					elem = create("span", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'+(field.newitem?' newopt':'')});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create("span", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var '+(field.format||'block')+(field.newitem?' newopt':'')});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'+(field.newitem?' newopt':'')});
					break;
				case 'button':
					var tmp;
					elem = create("span", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var '+(field.format||'inline')+(field.newitem?' newopt':'')});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'button_highlight':
					var tmp;
					elem = create("span", {kids:new Array(
						create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.highlightElements(field.options,field.clearfirst);}})
					), className: 'config_var '+(field.format||'inline')+(field.newitem?' newopt':'')});
					break;
				case 'button_selectmulti':
					var tmp;
					elem = create("span", {kids:new Array(
						create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.selectElements(field.options,field.clearFirst);}})
					), className: 'config_var '+(field.format||'inline')+(field.newitem?' newopt':'')});
					break;
				case 'button_selectprefix':
					var tmp;
					elem = create("span", {kids:new Array(
						create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.selectElementsByPrefix(field.prefix,field.clearFirst);}})
					), className: 'config_var '+(field.format||'inline')+(field.newitem?' newopt':'')});
					break;
				case 'hidden':
					elem = create("span", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				case 'link':
					elem = create("span", {title:field.title||'', kids:new Array(
						create('a', {id:'field_'+i, href:field.href, title:field.title||'', textContent:field.label, target:'_blank', className:'field_label link_label'+(field.newitem?' newopt':'')})
					), className: (field.format||'block')+(field.newitem?' newopt':'')});
					break;
				case 'tabcontrol':
					elem = create("div",{title:field.title||'', className: 'tab_container'+(field.newitem?' newopt':'')});
					break;
				case 'tabelement':
					var value2 = obj.values[field.key];
					elem = create("span",{title:field.title||'', kids:new Array(
				  		create('a', {id:'tab_'+field.key,className:'tab_header'+((value2=='block')?" tab_selected":""),href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggleTab(field.key);}})
					),className:'tab_element '+(field.newitem?" newopt":"")});
					break;
				case 'tabbody':
					//main.log('loading tabbody '+i+' '+value);
					elem = create("div",{id:'field_'+i,title:field.title||'',style:("display:"+value+";"),
					className:'tab_body'+(field.newitem?' newopt':'')});
					break;

				case 'tab': //tab shortform
					//check for tab_control in previous sibling
					var tabHeader, parent;
					if (prevSibling) if (prevSibling.className.contains('tab_container')) parent = prevSibling;

					//create tab container if needed
					if (!parent){
						elem = create("div",{className:'tab_container',kids:new Array(
							(tabHeader=create("div",{className:'tab_header_container'}) ) 
						)});
						parent=elem;
					} else elem=parent;

					//create tab header if needed
					if (!tabHeader){
						tabHeader = parent.firstChild; //assume no header
						if (!tabHeader.className.contains('tab_header_container')) {
							parent.appendChild(tabHeader=create("div",{className:'tab_header_container'}) );
						}
					}

					//create tab element
					tabHeader.appendChild(
						create("span",{kids:new Array(
					  		create('a', {id:'tab_'+i,className:'tab_header'+((value=='block')?" tab_selected":"")+(field.newitem?" newopt":""),href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggleTab(i);}})
						),className:'tab_element '})
					);
						
					//create tab body
					parent.appendChild(
						(nextElem=create("div",{id:'field_'+i,title:field.title||'',style:("display:"+value+";"),
						className:'tab_body'+(field.newitem?' newopt':'')}) )
					);

					//cleanup
					tabHeader=null; parent=null;
					break;

				case 'text':
				case 'float':
				case 'long':
				case 'int':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'+(field.newitem?' newopt':'')});
					break;

				default:
				case 'checkbox':
					elem = create("span", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var '+(field.format||'block')+(field.newitem?' newopt':'')});
			}
			if(field.kids) {
				var kids=field.kids,prev;
				for(var kid in kids) (nextElem||elem).appendChild(prev=GM_config.addToFrame(kids[kid], kid, true, prev));
			}
			return elem;
		},

 		doSave : function(f, field, type, set) {
 			var isNum=/^[\d\.]+$/;
 			switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
				case 'div':
					//main.log('saving div '+f+' '+field.style.display);
					GM_config.values[f] = field.style.display;										
					break;
			}
 		},

		exportSettings : function(){
			var val = JSON.stringify(GM_config.values)
			prompt("Copy and save these settings with a text editor such as notepad.",val);
		},

		importSettings : function(){
			var val = prompt("Paste saved settings below.",null);
			if (val!=null && val!=""){
				val=JSON.parse(val);
				if (val) {
					GM_config.values = val;
					GM_config.save();
					alert("Please refresh your browser to use the new settings.");
				} else {
					alert("Could not import settings!");
				}
			}
		},

 		doSettingValue : function(settings, stored, i, oldi, k) {
			var set = k!=null && k==true && oldi!=null ? oldi[i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            			// The code below translates to:
            			// if a setting was passed to init but wasn't stored then 
            			//      if a default value wasn't passed through init() then use null
            			//      else use the default value passed through init()
            			// 		else use the stored value
            			try {
            				var value = (stored[i]==null || typeof stored[i]=="undefined") ? ((set["default"]==null || typeof set["default"]=="undefined") ? null : (set["default"])) : stored[i];
				} catch(e) {
					var value = stored[i]=="undefined" ? (set["default"]=="undefined" ? null : set["default"]) : stored[i];
				}
            
            			// If the value isn't stored and no default was passed through init()
            			// try to predict a default value based on the type
            			if (value === null) {
                			switch(set["type"]) {
                    				case 'radio': case 'select':
                        				value = set.options[0]; break;
                    				case 'checkbox':
                        				value = false; break;
                    				case 'int': case 'float':
                        				value = 0; break;
                    				default:
							value = (typeof stored[i]=="function") ? stored[i] : "";
                			}
				}
			
			}
			GM_config.passed_values[i] = value;
 		},

 		doReset : function(field, type, oldf, f, k) {
 			var isKid = k!=null && k==true, obj=GM_config,
	 			set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 			switch(type) {
				case 'text':
					field.value = set['default'] || '';
					break;
				case 'hidden':
					field.value = set['default'] || '';
					break;
				case 'textarea':
					field.value = set['default'] || '';
					break;
				case 'checkbox':
					field.checked = set['default'] || false;
					break;
				case 'select':
					if(set['default']) {
						for(var i=field.options.length-1; i>=0; i--)
							if(field.options[i].value==set['default']) field.selectedIndex=i;
					}
					else field.selectedIndex=0;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].value==set['default']) radios[i].checked=true;
					}
					break;
			}
 		},

		values: {},

		settings: {},

 		css: {
 			basic: 'body {background:#FFFFFF;}\n' +
 			'.indent40 {margin-left:40%;}\n' +
 			'* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 			'.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 			'.block {display:block;}\n' +
 			'.saveclose_buttons {\n' +
 			'margin:16px 10px 10px 10px;\n' +
 			'padding:2px 12px 2px 12px;\n' +
 			'}\n' +
 			'.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 			'.config_header {font-size:20pt; margin:0;}\n' +
 			'.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 			'.center {text-align:center;}\n' +
 			'.config_var {margin:0 0 4px 0; display:block;}\n' +
 			'.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
 			'.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 			'input[type="radio"] {margin-right:8px;}',
 			stylish: ''
		},

 		create: function(a,b) {
			var ret=window.document.createElement(a);
			if(b) for(var prop in b) {
				if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
				else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
				else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
				else ret[prop]=b[prop];
			}
			return ret;
 		},
 
		center: function() {
			var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
			if(style.display=='none') style.opacity='0';
			style.display = '';
			style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
			style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
			style.opacity = '1';
 		},

 		run: function() {
    			var script=GM_config.getAttribute('script');
    			if(script && typeof script=='string' && script!='') {
      				func = new Function(script);
      				window.setTimeout(func, 0);
    			}
 		},

 		addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 
		remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 
		toggle : function(e,newMode) {
			var node=GM_config.frame.contentDocument.getElementById((newMode)?'field_'+e:e);
			node.style.display=(node.style.display!='none')?'none':'';
			if (node.style.display!='none') node.parentNode.scrollIntoView(true);
			//GM_config.setValue(e, node.style.display);
 		},

		toggleTab : function(e) {
			var tabBodyNode=GM_config.frame.contentDocument.getElementById('field_'+e);
			var tabHeaderNode=GM_config.frame.contentDocument.getElementById('tab_'+e);

			//unselect selected tabs
			var tabCtrl = tabBodyNode.parentNode;
			var tabs=selectNodes("./span[contains(@class,'tab_element')]/a[contains(@class,'tab_selected')] | ./div[contains(@class,'tab_header_container')]/span[contains(@class,'tab_element')]/a[contains(@class,'tab_selected')]",{node:tabCtrl,doc:$("GM_config").contentDocument});
			if (tabs) for (var i=0,tab;(tab=tabs.snapshotItem(i));i++) {
				var id=tab.id.substring(4);
				tab.className = tab.className.replace(' tab_selected','');
				$('field_'+id,$("GM_config").contentDocument).style.display='none';
				tab=null;
			}

			//select the tab
			tabHeaderNode.className += " tab_selected";
			tabBodyNode.style.display='block';

			//bring into view
			tabHeaderNode.scrollIntoView(true);

			//cleanup
			tabBodyNode = null;tabHeaderNode=null;tabCtrl=null;tabs=null;
 		}


	};

	debug.print("Script: GM_config initialized",{level:0});


	//container for facebook specific functions
	var fb = {
		authToken:"", //placeholder for auth code
		authRequestOut:false, //prevent asking for auto token twice

		get appsNav(){ return $("pagelet_navigation") || selectSingleNode(".//ul[contains(@class,'uiSideNav')]"); }, //left nav bar
		get acctNav(){ return $("navAccount").getElementsByTagName("ul")[0]; }, //account navigator dropdown
		get newsFeed(){ return $("home_stream") || $("app_stories") || $("pagelet_wall"); }, //news feed node
		get streamPager(){ return $("pagelet_stream_pager") || $("app_stories_more"); }, //show more node
		get menuBar(){ return $("pagelet_composer")||$("pagelet_group_composer"); }, //menu bar containing facebook tools
		get contentArea(){ return $("contentArea");}, //main content area that contains all pagelets

		get isFutureStyle(){return !fb.appsNav.parentNode.className.contains('pagelet_main_nav');},

		expandSimilar: function(){
			try{
				var posts = selectNodes(".//div[contains(@id,'stream_story_') and contains(@id,'_collapsed')]/a[contains(@ajaxify,'expand_story') or contains(@ajaxify,'dont_collapse=1')]", {node:fb.newsFeed});
				if (posts.snapshotItem) for(i=0;i<posts.snapshotLength;i++) click(posts.snapshotItem(i));
				posts=null;
			}catch(e){main.message('cannot expand similar');}
			return;
		},

		expandOlder: function(){
			try{
				var more = selectSingleNode(".//a[contains(@class,'uiMorePagerPrimary')]",{node:fb.streamPager});
				if (more) click(more);
				else return false;
			}catch(e){
				main.message('cannot show more posts');
			}
			return true;
		},

		getUserId: function(){
			return selectSingleNode(".//*[@id='navAccountName'] | .//a[@class='headerTinymanName']").href.split('/').last().replace('profile.php?id=','');
		},

		getUserAlias: function(){
			return selectSingleNode(".//*[@id='pageNav']/a").href.split('/').last().replace('profile.php?id=','');
		},

		addAppsNavItem: function(appName,appIcon,appCaption,appFunc,redirect){
			var nav=$('WM_navigation'),node;
			if (!nav) {
				//main.log("addAppsNavItem: nav node does not exist");
				node=fb.appsNav;
				node.insertBefore(nav=createElement("ul",{id:"WM_navigation",style:"border-bottom: 1px solid #EEEEEE;padding-bottom:8px;"}), node.firstChild);
			}
			//else main.log("addAppsNavItem: nav node exists");

			nav.appendChild(createElement("li",{id:"navItem_"+appName},new Array(
				createElement("a",{className:"item",href:(redirect||"javascript:void(0);"),onclick:(appFunc?appFunc:null),style:"line-height:13px;padding:0px 8px 4px 12px;display:block;color:#333333;text-decoration:none;"},new Array(
					createElement("span",{style:"position:relative;left:-6px;text-align:center;top:4px;width:18px;"},new Array(
						createElement("img",{src:appIcon,style:"width:16px;height:16px;"})
					)),
					createElement("span",{textContent:appCaption})
				))
			)));

			node=null;nav=null;
			return;
		},
		
		addAcctNavItem: function(appName,appIcon,appCaption,appFunc){
			return fb.acctNav.appendChild(
				createElement("li",{id:"acctItem_"+appName},new Array(
					createElement("a",{href:"javascript:void(0);",onclick:appFunc,textContent:appCaption},new Array(
						/*createElement("span",{className:"imgWrap"},new Array(
							createElement("img",{src:appIcon})
						)),
						createElement("span",{textContent:appCaption})*/
					))
				))
			);
		},

		addPluginItem: function(appID,appCaption,appFunc){
			var nav=$('WM_plugins'),node;
			if (!nav) {
				node=fb.appsNav;
				node.insertBefore(nav=createElement("ul",{id:"WM_plugins",style:"border-bottom: 1px solid #EEEEEE;padding-bottom:8px;"},[
					createElement("li",{style:"display:inline-block;"},[
						createElement("img",{src:imgs.pluginwm,style:"width:32px;height:32px;margin-left:-10px;margin-bottom:-13px;",title:"Wall Manager"})
					])
				]), $('WM_navigation'));
			}
			nav.appendChild(createElement("li",{id:"navPlugin_"+appID,style:"display:inline-block;"},[
				createElement("img",{src:imgs.plugin,style:"width:32px;height:32px;margin-left:-10px;margin-bottom:-13px;",title:appCaption})
			]));

			node=null;nav=null;
			return;
		},

		getStoryData: function(storyNode){
			return JSON.parse(storyNode.getAttribute('data-ft'));
		},

		getStoryId: function(storyNode){
			//return storyNode.id.replace("stream_story_","");
			var node=selectSingleNode(".//span[@class='uiStreamSource']/a[@href]",{node:storyNode});
			if (node) {
				var storyID = node.href.getUrlParam("story_fbid") || node.href.split("/").last();
				return storyID;
			} else {
				return "";
			}
		},

		getStoryAppIdFromActionLinks: function(storyNode){
			var ret = selectSingleNode(".//span[contains(@data-ft,'{\"type\":26}') or contains(@data-ft,'{\"type\":\"26\"}')]/a[contains(@href,'apps/application.php?id=')]",{node:storyNode});
			if (ret) ret = ret.href.getUrlParam("id");
			return ret;
		},

		getStoryAppId: function(storyNode){
			var ret = fb.getStoryData(storyNode)['app_id'];
			if (!ret) ret = fb.getStoryAppIdFromActionLinks(storyNode);
			return ret;
		},

		getStoryActorsNode: function(storyNode){
			return selectSingleNode(".//*[contains(@class,'actorName')]",{node:storyNode});
		},

		getStoryActorId: function(storyNode){
			return fb.getStoryActorsNode(storyNode).getElementsByTagName("a")[0].getAttribute("data-hovercard").getUrlParam("id");
		},

		getStoryActorAlias: function(storyNode){
			return fb.getStoryActorsNode(storyNode).getElementsByTagName("a")[0].href.split('/').last().replace('profile.php?id=','');
		},

		getStoryActorName: function(storyNode){
			return fb.getStoryActorsNode(storyNode).getElementsByTagName("a")[0].textContent;
		},

		getStoryUniqueKey: function(storyNode){
			return fb.getStoryActorId(storyNode) + "_" + fb.getStoryId(storyNode);
		},

		getStoryTargetActorId: function(storyNode){
			try {
				return fb.getStoryActorsNode(storyNode).getElementsByTagName("a")[1].getAttribute("data-hovercard").getUrlParam("id");
			} catch (e) {
				return "";
			}
		},

		getStoryIsMyPost: function(storyNode){
			var storyOwner = fb.getStoryActorId(storyNode);
			var actorAlias = fb.getStoryActorAlias(storyNode);
			var thisUser = fb.getUserId();

			return (storyOwner.find(thisUser) || actorAlias.find(thisUser));
		},

		getStoryIsW2W: function(storyNode){
			return (selectSingleNode(".//span[@class='actorName']",{node:storyNode})!=null);
		},

		getStoryTargetsMe: function(storyNode) {
			//first return true if the story only targets the parent actor because that means it targets everybody
			if (fb.getStoryTargetActorId(storyNode) === fb.getStoryActorId(storyNode)) return true;
			return fb.getStoryTargetActorId(storyNode).find(fb.getUserId);
		},

		getStoryPubTime: function(storyNode) {
			return fb.getStoryData(storyNode)['pub_time'];
		},

		getStoryIsStale: function(storyNode) {
			var now = timeStamp();
			var pubTime = fb.getStoryPubTime(storyNode)+"000";
			var aDay = (1000 * 60 * 60 * 24);
			return (now-pubTime)>aDay;
		},

		likeStory: function(storyNode) {//like button aka type:22
			var like = selectSingleNode(".//button[contains(@data-ft,'\"type\":22') or contains(@data-ft,'\"type\":\"22\"') or (@name='like')]",{node:storyNode});
			if (like) click(like);
			like=null;
		},

		getStoryActionLink: function(storyNode) {//20="action"
			return selectSingleNode(".//span[contains(@data-ft,'\"type\":\"20\"') or contains(@data-ft,'\"type\":20')]/a",{node:storyNode});
		},
		
		getStoryBodyText: function(storyNode) {//10="attach"
			return selectSingleNode(".//div[contains(@data-ft,'\"type\":10') or contains(@data-ft,'\"type\":\"10\"')]",{node:storyNode}).textContent.replace(/(\r\n|\n|\r)/gm,"");
		},

		getStoryActionLinkText: function(storyNode) {
			return fb.getStoryActionLink(storyNode).textContent;
		},

		getStoryImage: function(storyNode){//41="media"
			return selectSingleNode(".//*[contains(@data-ft,'\"type\":41') or contains(@data-ft,'\"type\":\"41\"')]/img[@class='img']",{node:storyNode});
		},

		getStoriesByAppId: function(appId,omitTitleProcessed) {
			return selectNodes(".//*[contains(@data-ft,'\"type\":26') or contains(@data-ft,'\"type\":\"26\"')]/a[contains(@href,'application.php?id="+appId+"')]//ancestor::*[starts-with(@id,'stream_story_')"+(omitTitleProcessed?" and (not(@title='processed')) and (not(@title='working'))":"")+"]",{type:7,node:fb.newsFeed});
			//return selectNodes(".//li[contains(@data-ft,'\"app_id\":\""+appId+"\"') or contains(@data-ft,'\"app_id\":"+appId+"')"+(omitTitleProcessed?" and (not(@title='processed'))":"")+"]",{type:7,node:fb.newsFeed});
		},

		getStoriesByIdContent: function(idContent) {
			return selectNodes(".//li[contains(@id,'"+idContent+"')]",{type:7,node:fb.newsFeed});
		},

		getLinkByKey: function(key) {
			return selectSingleNode(".//a[contains(@id,'"+key+"') and not(contains(@id,'c_section_kids_'))]",{node:fb.newsFeed});
		},

		getStoryShowSimilarButton: function(storyNode) {
			return selectSingleNode(".//div[contains(@id,'stream_story_') and contains(@id,'_collapsed')]/a",{node:storyNode});		
		},

		getStoryCloseButton: function(storyNode) {
			return selectSingleNode(".//a[contains(@href,'/ajax/feed/filter_action.php?action=uninteresting')]",{node:storyNode});			
		},

		getStoryParentOf: function(storyNode) {
			return selectSingleNode(".//ancestor::*[starts-with(@id,'stream_story_')]", {node:storyNode});
		},

		getRequestsByAppId: function(appId) {
			//return selectNodes(".//ul[contains(@class,'requests')]/li[@class]",{type:6,node:$("confirm_"+appId)});
		},

		getRequestLink: function(requestNode) {
			return selectSingleNode(".//label[contains(@class,'uiButtonConfirm')]/input[@name]",{node:requestNode}).getAttribute('name').replace('actions[','[').unBracket;			
		},

		getRequestCloseButton: function(requestNode) {
			return selectSingleNode(".//i[contains(@class,'closeButton') and contains(@title,'Hide')]/input[@name]",{node:requestNode});						
		},

		get SK(){ return window.location.href.getUrlParam('sk')||"";}, // get the sk parameter of the location

		requestAuthCode: function(){
			if (fb.authRequestOut) return; //dont ask again while asking
			fb.authRequestOut = true;
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://developers.facebook.com/docs/reference/api/",
				onload: function(response) {
					var test=response.responseText;
					var searchString='<a href="https://graph.facebook.com/me/home?access_token=';
					var auth = test.indexOf(searchString),authEnd;
					if (auth!=-1) {
						authEnd = test.indexOf('">',auth);
						var authCode = (test.substring(auth+(searchString.length), authEnd));
						fb.authToken = authCode;
					} else {
						debug.print("fb.requestAuthCode: responseText does not contain searchString",{level:3});						
					}
					fb.authRequestOut=false;
				}, 
				onerror: function(response) {
					fb.authToken="";
					fb.authRequestOut=false;
					debug.print("fb.requestAuthCode: error requesting authorization",{level:3});
				}
			});
		},

		fetchPosts: function(params){
			params=params || {};
			if (!fb.authToken) {
				fb.requestAuthCode();
				window.setTimeout(function(){fb.fetchPosts();},1000);
				return;
			}
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://graph.facebook.com/me/home?date_format=U&access_token="+fb.authToken,
				onload: function(response) {
					WM.displayPosts(response.responseText,params);
				}, 
				onerror: function(response) {
					debug.print("fb.fetchPosts: error fetching posts",{level:3});
				}
			});
		},

	};

	debug.print("Script: fb initialized",{level:0});


	var WM = {
		addNavTools: function() {
			var nav=$("navItem_wallmanager");
			var acct=$("acctItem_wallmanager");
			var acctDebug=$("acctItem_navDebug");

			var navReqs=$("navItem_navReqs");
			var navGames=$("navItem_navGamesFeed");
			//var navLatest=$("navItem_navLatestFeed");
			var pageletIcons=$("pagelet_WMIcons");
			var navDebug=$("navItem_navDebug");

			if(fb.appsNav && !nav) fb.addAppsNavItem("wallmanager",imgs.icon,"WallManager "+version+" Options",main.config);
			if(fb.appsNav && !navDebug) fb.addAppsNavItem("navDebug",imgs.icon,"Debug Window",debug.show);
			//if(fb.appsNav && !navReqs) fb.addAppsNavItem("navReqs",imgs.fb,"Requests",function(e){main.toPage('http://www.facebook.com/reqs.php');},'http://www.facebook.com/reqs.php');
			if(fb.appsNav && !navGames) fb.addAppsNavItem("navGamesFeed",imgs.fb,"Games Feed",function(e){main.toPage('http://www.facebook.com/?sk=cg');},'http://www.facebook.com/?sk=cg');
			//if(fb.appsNav && !navLatest) fb.addAppsNavItem("navLatestFeed",imgs.fb,"Latest Feed",function(e){main.toPage('http://www.facebook.com/?sk=lf');},'http://www.facebook.com/?sk=lf');

			if(fb.acctNav && !acct) fb.addAcctNavItem("wallmanager",imgs.icon,"WallManager "+version+" Options",main.config);
			if(fb.acctNav && !navDebug) fb.addAcctNavItem("navDebug",imgs.icon,"Debug Window",debug.show);

			if(fb.contentArea && !pageletIcons) WM.addPagelet("WMIcons");
		},

		addPagelet: function(pageletID){
			var feed=fb.newsFeed;
			try{return (feed.parentNode).insertBefore(
				createElement("div",{className:'clearfix',id:"pagelet_"+pageletID})
			,feed);}catch(e){}
		},

		addIconToPanel: function(pageletID,params){
			var paramsString=JSON.stringify(params);
			try{return $("WM_"+params['key']) || $("pagelet_"+pageletID).appendChild(
				createElement("div",{id:"WM_"+params['key'], title:params['status'], "data-ft":paramsString, style:'height:49px;width:49px;float:left;position:relative;z-index:0;'},new Array(
					createElement("a",{id:"WM_link_"+params['key'],href:params['href']},new Array(
						createElement("img",{id:"WM_img_"+params['key'],src:params['img'], style:'height:49px;width:49px;position:relative;'})
					)),
					createElement("div",{id:"WM_status_"+params['key'],style:'opacity:0.5;width:0%;height:49px;background-color:#008800;position:absolute;top:0px;z-index:1;'})
				))
			);}catch(e){}
		},

		selectPost: function(key){
			try{return $('WM_'+key);}catch(e){}
		},

		getData: function(postOrKey){
			if(typeof postOrKey=='string'){ //assume key was passed instead of post
				postOrKey=WM.selectPost(postOrKey);
			}
			try{return JSON.parse(postOrKey.getAttribute('data-ft'));}catch(e){}
			return null;
		},

		getKey: function(post){
			if (post) try{return WM.getData(post)['key'];}catch(e){} else return null;
		},

		setStatus: function(postOrKey,params){
			if(typeof postOrKey!='string'){ //assume post was passed instead of key
				postOrKey=WM.getKey(postorKey);
			}
			if(params['prog']) try{$('WM_status_'+postOrKey).style.width=params['prog']+"%";}catch(e){}
			if(params['color']) try{$('WM_status_'+postOrKey).style.backgroundColor=params['color'];}catch(e){}
			if(params['status']) try{
				$('WM_'+postOrKey).setAttribute('title',params['status']);
			}catch(e){}
		},


		addDebug: function(postOrKey,params){
			if(typeof postOrKey!='string'){ //assume post was passed instead of key
				postOrKey=WM.getKey(postorKey);
			}
			if (!postOrKey) return;

			return $("WM_debug_"+postOrKey) || $("WM_"+postOrKey).appendChild(
				createElement("div",{id:"WM_debug_"+postOrKey, style:'position:relative;display:block;'},new Array(
					//Top Left
					createElement("div",{style:'background-color:#003300;position:absolute;width:80px;height:16px;',textContent:params['status']}),
					//Top Right
					createElement("div",{style:'background-color:#330000;position:absolute;left:80px;height:16px;',textContent:params['statusText']}),
					createElement("div",{style:'background-color:#003300;position:absolute;left:80px;top:16px;height:16px;',textContent:params['which']}),
					//Bottom Left
					createElement("img",{src:$('WM_img_'+postOrKey).src, style:'height:80px;width:80px;position:absolute;top:32px;'}),
					//Bottom Right
					createElement("div",{style:'background-color:#330000;position:absolute;left:80px;top:16px;'},new Array(
						createElement("a",{href:$('WM_link_'+postOrKey).href,textContent:$('WM_link_'+postOrKey).href})
					))
				))
			);			
		},

		selectLink: function(postOrKey){
			if(typeof postOrKey!='string'){ //assume post was passed instead of key
				postOrKey=WM.getKey(post);
			}
			try{return selectSingleNode(".//a[contains(@id,'WM_link_"+postOrKey+"')]",$('pagelet_WMIcons'));}catch(e){}
		},

		likeStory: function(key){
			try{fb.likeStory(fb.getStoryParentOf(fb.getLinkByKey(key)));}catch(e){}
		},

		hideStory: function(key){
			try{fb.getStoryParentOf(fb.getLinkByKey(key)).style.setProperty("display", "none", "important");}catch(e){}
		},

		//restructure menu to append appID before every object						
		fixMenu: function(menu,app){
			var ret={};
			//for each object in menu
			for (var o in menu){
				//main.message(o);
				ret[app+o]=menu[o];

				//fix button arrays
				var t=menu[o]["type"];
				switch(t){
					case "button_hightlight":
					case "button_selectmulti":

						//fix elements in the clearfirst array
						if (menu[o]["clearfirst"]){
							for (var i=0,len=ret[app+o]["clearfirst"].length;i<len;i++){
								ret[app+o]["clearfirst"][i] = app+ret[app+o]["clearfirst"][i];
							}
						}
						//fix elements in the options array
						if (menu[o]["options"]){
							for (var i=0,len=ret[app+o]["options"].length;i<len;i++){
								ret[app+o]["options"][i] = app+ret[app+o]["options"][i];
							}
						}
				}

				//fix kids
				if (menu[o]["kids"]){
					//rebuild kids object
					ret[app+o]["kids"]=WM.fixMenu(menu[o]["kids"],app);
				}
			}
			return ret;
		},	

		//restructure tests to append appID before every object's return
		fixTests: function(arr,app){
			//for each test in array
			for (var t=0,len=arr.length;t<len;t++) {
				var ret=arr[t]["ret"], kids=arr[t]["kids"];
				//replace return value
				if (ret) {
					if (ret!="exclude" && ret!="none") {
						arr[t]["ret"]=app+ret;
					}
				}
				//process subtests
				if (kids){
					//rebuild kids array
					arr[t]["kids"]=WM.fixTests(kids,app);
				}
			}
			return arr;
		},		
	
		answerDockingDoor: function(){
			var newNotes=selectNodes(".//div[@id='wmDock']/div[(@data-ft) and not(@data-ft='')]");
			if(newNotes.snapshotLength && newNotes.snapshotItem) for(var i=0;i<newNotes.snapshotLength;i++){
				var newNote = newNotes.snapshotItem(i);
				if (newNote){
					var val = newNote.getAttribute('data-ft');
					if (val) {
						var newset = JSON.parse(val);
						var appID=newset["appID"];
						var synID=newset["synAppID"];
						//main.message(appID);

						//restructure accText, menu and tests to avoid cross app issues in the menu
						newset["menu"]=WM.fixMenu(newset["menu"],appID);
						newset["tests"]=WM.fixTests(newset["tests"],appID);

						var newAccText={};
						for (var s in newset["accText"]) {
							newAccText[appID+s]=newset["accText"][s];
						}
						newset["accText"]=newAccText;

						//add menu items
						GM_config.append(newset["menu"]);
						//add a filter option to the feed filters section
						GM_config.settings["section_filters"]["kids"]["hidespecificgames"]["kids"]["filterHide"+appID]=checkBox(newset["name"]);
						GM_config.settings["section_filters"]["kids"]["createfilters"]["kids"]["createfilter"+appID]=checkBox(newset["name"],true);

						//add FB sidebar filter options for "addFilters" items
						if (newset["addFilters"]) for (var f=0,fLen=newset["addFilters"].length;f<fLen;f++) {
							var thisFilter = newset["addFilters"][f];

							GM_config.settings["section_filters"]["kids"]["createfilters"]["kids"]["createfilter"+thisFilter["appID"]]=checkBox(thisFilter["name"],true);
						}

						//add a master option for this game
						GM_config.settings["section_masterswitches"]["kids"]["masterSwitchBlock"]["kids"]["master"+appID]=checkBox(newset["name"],true);
						//add floater css for this game
						GM_config.settings["section_filters"]["kids"]["floaterSwitchBlock"]["kids"]["floatRight"+appID]=checkBox(newset["name"],true);

						//update settings
						GM_config.updateSettingsValues();
						main.updateSettingsValues();

						//detach the menu from the newset to reduce duplication
						newset["menu"]=null;

						//save the data into a gamedata entry
						main.gameData[appID]=newset;

						//erase the door note so we dont add it again later
						newNote.setAttribute('data-ft','');

						//add this game to the game list to process
						if (main.games == null) main.games = new Array();
						main.games.push(appID);

						//add synonym appID's for side games
						if (synID) for (var s=0;s<synID.length;s++) {
							main.games.push(synID[s]);
							main.synGames[synID[s]]=appID;
						}

						//save the list of games to the FB registry
						setOpt('games',main.games);
						setOpt('synGames',main.synGames);

						//add FB sidebar items
						if (main.opts["createfilter"+appID]){
							var navGame=$("navItem_nav"+appID);
							if(fb.appsNav && !navGame) fb.addAppsNavItem("nav"+appID,imgs.filter,"Filter "+newset["name"],function(e){main.toPage(this.href);},'http://www.facebook.com/?sk=app_'+appID);						
						}

						//add FB sidebar filters for "addFilters" items
						if (newset["addFilters"]) for (var f=0,fLen=newset["addFilters"].length;f<fLen;f++) {
							var thisFilter = newset["addFilters"][f];
	
							if (main.opts["createfilter"+thisFilter["appID"]]){
								var navGame=$("navItem_nav"+thisFilter["name"]);
								if(fb.appsNav && !navGame) fb.addAppsNavItem("nav"+thisFilter["appID"],imgs.filter,"Filter "+thisFilter["name"],function(e){main.toPage(this.href);},'http://www.facebook.com/?sk=app_'+thisFilter["appID"]);
							}
						}
			
						//add plugin icon
							var navPlugin=$("navPlugin_"+appID);
							if(fb.appsNav && !navPlugin) fb.addPluginItem(appID,newset["name"]);						

						//cleanup
						newset=null;newNote=null;val=null;appID=null;

						return;
					}
					//note value is invalid, will not transmute to JSON object
				}
				//note node does not exist
			}
			//no notes to process
		},


		addDevMode: function(post,key,w,appID,whoPosted,whoName,status){
			var bodyBlock = selectSingleNode(".//div[contains(@data-ft,'\"type\":11') or contains(@class,'UIImageBlock clearfix')]",{node:post});
			bodyBlock.style.width="66%";
			bodyBlock.parentNode.insertBefore(
				createElement('div',{id:'wmDev_'+key,style:'width:34%;float:right;font-size:10px;',innerHTML:'w: '+w+'<br/>status: '+status+'<br/>appID: '+appID+'<br/>whoPosted: '+whoPosted+'<br/>whoName: '+whoName+'<br/>key: '+key})
			,bodyBlock);
			var story = selectSingleNode(".//div[@class='storyContent']",{node:post});
			post.appendChild(createElement('div',{className:'section_header_holder',id:'section_'+key},new Array(
				createElement('a',{style:'width:100%;',className:'section_header center',id:'c_section_kids_'+key,href:'javascript:void(0)',onclick:function(){
					var node=$('section_kids_'+key);
					node.style.display=(node.style.display!='none')?'none':'';
				},textContent:'Recognized Post'}),
				createElement('div',{className:'section_kids',id:'section_kids_'+key})
			)));
			$('section_kids_'+key).appendChild(story);
		},

		setDebugStatus: function(key,status){
			$('wmDev_'+key).innerHTML=$('wmDev_'+key).innerHTML.replace('status: undefined','status: '+status);
		},

		//displays feed data fetched by the FB Graph API
		displayPosts: function(data, params){
			params=params || {};

			jsonData = JSON.parse(data);
			if (jsonData["data"]){
				//for each post in the data stream
				for (var i=0,len=jsonData.data.length, post; i<len && (post=jsonData.data[i]); i++) {
					//check that the post is from an application
					if (post.application && post.type=="link"){
						//check that the application id is in the main.games array
						var appID = post.application.id;
						if (main.games.inArray(appID)) {
							appID = main.synGames[appID] || appID;
							var time = post.created_time;
							var whoPosted = post.from.id;
							var whoName = post.from.name;
							var href = post.link;
							var img = post.picture;
							var key = post.id;
							var isW2W = post.to;
							var target = (isW2W)?post.to.data[0].id:"me";

							//identification stuff
							var title = post.name; //the post title
							var body = post.description; //the post body
							var action = post.actions.last().name; //the link text
							
							var w = "justDoIt"; //default
							WM.addIconToPanel("WMIcons",{key:key,href:href,img:(img?img:''),which:w,appID:appID,whoPosted:whoPosted,whoName:whoName,status:'working',gameMode:appID});
						}
					}
				}
			}
			if (jsonData["paging"]){
				//get paging information
				var next = jsonData.paging.next;
				var prev = jsonData.paging.previous
			}
		},
	};

	debug.print("Script: WM initialized",{level:0});


	var main = {
		paused : false,
		pauseClick : false,
		boxFull : false,
		pauseCount : 0,
		pauseRefresh : false,
		openCount : 0,
		requestsOpen : 0,
		reqTO : 30000,
		maxrequests : 1,
		profile : "",

		acceptStage : 1,

		streamID : "contentArea",
		//stream : ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea") || $("pagelet_tab_content") || $("pagelet_wall")),

		navID : "navItem",
		navIDnf : "navItem_nf",

		gameIDFrV : "201278444497", // frontierville
		gameIDTI: "234860566661", // treasureisle
		gameIDRwF: "120563477996213", //ravenwood fair
		gameIDCV : "291549705119", // cityville
		gameIDFV : "102452128776", // farmville
		gameIDZR : "176611639027113", //rewardville
		gameIDCW : "101539264719", //cafeworld
		gameIDEA : "164285363593426", //empires and allies
		gameIDPT : "266989143414", //pioneer trail

		games: null,
		synGames: {},

		whitelistWhenPaused : ",null", // categories separated by commas to be accepted even if gift box is full

		gameAcronym : "WallManager",
		scriptHomeURL : "http://userscripts.org/scripts/show/86674",

		oTab : null, //this is where the window handle for the work window goes
		oTabID : "", //this is the unique key found in the last tab so we know its not loading the same page still
		oTabLifeSpan : 0,

		oXML : null, //this is where the new openShort function stores the loaded XML document

		intvOpen : null, //store the interval timer for the open function here so we can cancel it in other functions later

		specialAlternator : 0,
		special24HourBit : 0,

		FrVfriendListHolder : null,
		TIfriendListHolder : null,
		RwFfriendListHolder : null,
		CVfriendListHolder : null,
		WSfriendListHolder : null,


		// empty options object for later modification
		opts : {},

		ampRegex : /&amp;/g,
		spaceRegex : /\s+/g,
		nRegex : /\n+/g,
		phpRegex : /#\/.*\.php/,
		numberRegex : /\d+/,
		profileRegex : /facebook\.com\/([^?]+)/i,
		postStatusRegex : / (itemdone|itemneutral|itemprocessing|itemfailed|itemoverlimit)/,
		accTextRegex : /(here's a reward|here is a reward|you've received a gift|would you like to accept|your friend needs help|thanks for coming to ravenwood fair|you just sent|you just got|reward limit for|present sent to)/,
		failTextRegex : /(oh no|sorry pardner|only your friends can send you|no longer working|you've already claimed|can't claim your own)/,
		boxFullRegex : /(you have exceeded your limit|gift box is full|exceeded)/,
		emptyRegex : /\s*/g,
		gameUrlPHPPage : /index\.php/,

		accDefaultText : "Got this!",
		failText : "Oh no! Sorry pardner!",
		overLimitText : "Limit reached!",

		gameData: {
			//contains data in the following layout
			//"app_id_here"={
			//	"appID":"app_id_here",
			//	"alias":"FrV",
			//	"hrefKey":"sendKey",
			//	"thumbsSource",
			//	"flags":{},
			//	"accText":{},
			//	"tests":[],
			//	"menu":{}
			//}
		},

		gameID : {
			"201278444497":"FrV",
			"234860566661":"TI",
			"120563477996213":"RwF",
			"291549705119":"CV",
			"102452128776":"FV",
			"176611639027113":"ZR",
			"101539264719":"CW",
			"164285363593426":"EA",
		},

		statusText : {
			"2":"Responseless Collection",
			"1":"Accepted",
			"0":"Unknown",
			"-1":"Failed",
			"-2":"None Left",
			"-3":"Over Limit",
			"-4":"Over Limit, Sent One Anyway",
			"-5":"Server Error",
			"-6":"Already Got",
			"-7":"Server Down For Repairs",
			"-8":"Problem Getting Passback Link",
			"-9":"Final Request Returned Null Page",
			"-10":"Final Request Failure",
			"-11":"Expired",
			"-12":"Not a Neighbor",
			"-13":"Requirements not met",
			"-14":"Timeout",
			
		},

		// Created by avg, modified by JoeSimmons. shortcut to create an element
		create : function(a,b,c) {
			if(a=="text") {return document.createTextNode(b);}
			var ret=document.createElement(a.toLowerCase());
			if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
			else if(",style,accesskey,id,name,src,href,which,rel,action,method,value".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
			else ret[prop]=b[prop];
			if(c) c.forEach(function(e) { ret.appendChild(e); });
			return ret;
		},

		// cross-browser log function
		log: ((isGM) ? GM_log : ((window.opera) ? opera.postError : console.log)),

		// remove something from the page
		remove : function(e) {
			var node = (typeof e=='string') ? $(e) : e;
			if(node) node.parentNode.removeChild(node);
			node=null;
		},

		keyDownFunc : function(e) {
			if(",9,18,33,34,35,36,37,38,39,40,116".find(","+e.keyCode) || (main.paused && main.pauseClick)) return;
			main.paused=true;
			main.pauseClick=false;
			main.pauseCount = main.opts["inputtimeout"] || 15;
			main.status();
		},

		// all regexps are stored here
		excludesRegex : /()/,

		doWhichTestTree : function(post, tests) {
			debug.print("doWhichTreeTest()",{level:0});
			var linkText=fb.getStoryActionLinkText(post).toLowerCase(), 
				bodyText=fb.getStoryBodyText(post).toLowerCase(),
				linkHref=fb.getStoryActionLink(post).href.toLowerCase();

			//shorten the function texts
			function bText(t){if(t!=null) return bodyText.find(t.toLowerCase()); else return false;}
			function lText(t){if(t!=null) return linkText.find(t.toLowerCase()); else return false;}
			function lHref(t){if(t!=null) return linkHref.find(t.toLowerCase()); else return false;}
			function bCode(t){if(t!=null) return post.innerHTML.toLowerCase().find(t.toLowerCase()); else return false;}

			var w=null;

			for (var i=0,test;((test=tests[i]) && (w===null));i++) { 

				//detect test type
				var testType=(test["url"])?"url":
				  (test["body"])?"body":
				  (test["html"])?"html":
				  (test["link"])?"link":
				  //(test["either"])?"either":
				"";

				var subTests=test["subTests"], kids=test["kids"], allowNone=false, subNumRange=test["subNumRange"];			

				//see if test has subtest data (an array search)
				if (subTests) {
					//subtests exist, process each
					for (var i2=0,subTest,found=false;((subTest=subTests[i2]) && (!found));i2++) {
						var testX = test[testType].replace('{%1}',subTest.toLowerCase());

						//do a standard test with the replaced search string
						found=(test["url"])?(lHref(testX)?true:false):
				  		  (test["body"])?(bText(testX)?true:false):
				  		  (test["html"])?(bCode(testX)?true:false):
				  		  (test["link"])?(lText(testX)?true:false):
						  //(test["either"])?(lText(testX)?true:(bText(testX)?true:false)):
						false;

						//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
						w=(found)?test["ret"].replace('{%1}',subTest.noSpaces().toLowerCase()):w;

						//allow deeper checking if null was purposely returned from upper node
						
						testX=null;
					}

				} else if (subNumRange){
					//process a number array
					var start=parseInt(subNumRange.split(",")[0]), end=parseInt(subNumRange.split(",")[1]);
					for (var i2=start,found=false;((!found) && i2<=end);i2++)  {
						var testX = test[testType].replace('{%1}',i2);

						//do a standard test with the replaced search string
						found=(test["url"])?(lHref(testX)?true:false):
				  		  (test["body"])?(bText(testX)?true:false):
				  		  (test["html"])?(bCode(testX)?true:false):
				  		  (test["link"])?(lText(testX)?true:false):
						  //(test["either"])?(lText(testX)?true:(bText(testX)?true:false)):
						false;

						//return a found value, replacing %1 with a lowercase no-space text equal to the subtest string
						w=(found)?test["ret"].replace('{%1}',i2):w;

						//allow deeper checking if null was purposely returned from upper node
						
						testX=null;
					}

				} else if (typeof(test[testType])==="object") {
					//assume an array instead of single test, process similar to subtests
					for (var i2=0,subTest,found=false;((subTest=test[testType][i2]) && (!found));i2++) {

						var testX = subTest.toLowerCase();

						found=(test["url"])?(lHref(testX)?true:false):
				  		  (test["body"])?(bText(testX)?true:false):
				  		  (test["html"])?(bCode(testX)?true:false):
				  		  (test["link"])?(lText(testX)?true:false):
						  //(test["either"])?(lText(testX)?true:bText(testX)?true:false):
						false;

						w=(found)?test["ret"]:w;

						testX=null;
					}
					

				} else {
					//no subtest array, run normally
					w=(test["url"])?(lHref(test["url"])?test["ret"]:w):
					  (test["body"])?(bText(test["body"])?test["ret"]:w):
					  (test["html"])?(bCode(test["html"])?test["ret"]:w):
					  (test["link"])?(lText(test["link"])?test["ret"]:w):
					  //(test["both"])?(lText(test["link"])?test["ret"]:(bText(test["body"])?test["ret"]:w)):
					w;	
		
				}

				//see if test has type 2 subtests (child node tests based on parent test)
				w = ((kids && w)?main.doWhichTestTree(post, kids):w) || w; //if kids return null, default to key found above

				//if this test tree returned "none", start over with next tree by replacing "none" with null
				//true "none" is handled in the which() function below
				if (w==="none") w=null;

				testType=null; subTests=null; kids=null;
			}

			bText=null;lText=null;lHref=null;bCode=null;linkText=null;bodyText=null;linkHref=null;
			return w;
		},

		// get what type of item it is
		which : function(post,appID) {
			debug.print("which()",{level:0});
			//check if already identified
			var w=fb.getStoryActionLink(post).parentNode.getAttribute('id'), tests;
			if (w) return w; //w was already determined

			//get post variables
			if (!appID) appID=fb.getStoryAppId(post);

			if (!appID) return "none"; //no appid

			
			appID = main.synGames[appID] || appID; //convert if needed for subgames

			var data=main.gameData[appID];
			if (!data) return "none"; //no data			
			if (data=="undefined") {
				debug.print("which: data is undefined",{level:2});
				return "";
			}

			//process this game's dynamically added tests
			w=((tests=data["tests"])?main.doWhichTestTree(post,tests):"none") || "none";


			//switch to undefined collection if enabled
			//var alias = data["alias"];
			w=(w==="none" && main.opts[appID+"doUnknown"])?appID+"doUnknown":w;

			return w;
		},

		failedItem : function(d, t) {
			return main.failTextRegex.test(t.toLowerCase());
		},

		gotItem : function(d, t) {
			return main.accTextRegex.test(t.toLowerCase());
		},

		// function to debug stuff. displays in a big white textarea box
		debug : function(s) {
			var d=$("debugT");
			if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
			else d.innerHTML+="\n\n\n\n"+s;
			if(d.style.display=="none") d.style.display="";
			d=null;
		},

		storeTypes : /^(true|false|\d+)$/,

		getValue : (isGM ? GM_getValue : (function(name, def) {
			var s=localStorage.getItem(name), val = ((s=="undefined" || s=="null") ? def : s);
			if(typeof val == "string" && main.storeTypes.test(val)) val = ((new Function("return "+val+";"))());
			s=null;
			return val;
		})),

		setValue : (isGM ? GM_setValue : (function(name, value) {return localStorage.setItem(name, value)})),

		deleteValue : (isGM ? GM_deleteValue : (function(name, def) {return localStorage.setItem(name, def)})),

		// get the accepted items' times they were accepted
		getAcceptedTime : function() {
			return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})"))+";"))();
		},

		// save the accepted items' times they were accepted
		setAcceptedTime : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile;
			main.setValue(store, val);
			val=null;
		},

		// get the accepted items' times they were accepted
		getFailedTime : function() {
			return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})"))+";"))();
		},

		// save the accepted items' times they were accepted
		setFailedTime : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile;
			main.setValue(store,val);
			val=null;
		},

		// reset the accepted items
		resetAccepted : function() {
			if(confirm("Really reset accepted items?")) window.setTimeout(function(){
				var reset=main.deleteValue;
				reset(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})");
				reset(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})");
				reset(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "({})");
				reset(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})");
				reset(main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile, "({})");
				reset=null;
			}, 0);
		},

		// get the accepted items
		getAccepted : function() {
			return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})"))+";"))();
		},

		// save the accepted items
		setAccepted : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_"+main.profile;
			main.setValue(store,val);
			val=null;
		},

		// get the accepted items
		getFailed : function() {
			return (new Function("return "+main.getValue(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "({})")+";"))();
		},

		// save the accepted items
		setFailed : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_"+main.profile;
			main.setValue(store,val);
			val=null;
		},

		// get number of current requests
		get curReqs() {
			return main.requestsOpen;
		},

		toHomepage : function() { 
			var filter = (main.realURL.find("&filter="))?main.realURL.split("&filter=")[1].split("&")[0]:"";
			var onGames = main.realURL.find("games?ap=1");
			var SK = 
				(onGames)?"":
				(fb.SK)?"&sk="+fb.SK:
				(main.realURL.find("ref=home"))?"&sk=nf":
				(main.realURL=="http://www.facebook.com")?"&sk=nf":
				"";
			window.location.replace("http://www.facebook.com/"+(onGames?"games?ap=1&":"?")+SK+(filter?"&filter="+filter:"")); 
		},

		toPage : function(s) { 
			window.location.replace(s); 
		},

		colorCode : function(link, type) {
			try {
				switch(main.opts["colorcode"]) {
					case true:
						var div = fb.getStoryParentOf(link);
						if(div) div.className = div.getAttribute("class").replace(main.postStatusRegex, "") + " item"+(type || "neutral");
						div=null;
						break;
				}
			} catch(e) {alert(e);}
		},

		// generate a refresh time
		get refTime() {
			var t=2;
			switch(GM_config.get("arinterval")) {
				case "tenth": t = 0.1; break; // 6 seconds
				case "sixth": t = 0.1666667; break; // 10 seconds
				case "third": t = 0.3333333; break; // 20 seconds
				case "half": t = 0.5; break; // 30 seconds
				case "one": t = 1; break; // 1 minute
				case "two": t = 2; break; // 2 minutes
				case "three": t = 3; break; // 3 minutes
				case "four": t = 4; break; // 4 minutes
				case "five": t = 5; break; // 5 minutes
				case "ten": t = 10; break; // 10 minutes
				case "30s2m": t = (Math.random() * 1.5) + 0.5; break; // random between 30s and 2m
				case "2m5m": t = (Math.random() * 3) + 2; break; // random between 2m and 5m
				case "5m10m": t = (Math.random() * 5) + 5; break; // random between 5m and 10m
			}
			return Math.round((t*60000)+(Math.random()*(t*250)));
		},

		// get the real url of the page
		get realURL() {
			//joe's hash checker
			var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;
			if(hash!="" && main.phpRegex.test(hash)) u=protocol+host+hash.split("#")[1];
			else if(hash!="" && hash.find("#")) u=u.split("#")[0];
			//prevent unnamed hash at the end when we click older posts at the same time page refreshes
			if (u.substr(-1) === "#") u=u.split("#")[0];
			return u;
		},

		// show config screen
		config : function() {
			GM_config.open(); // open the options menu
			try{ $(main.gameAcronym.toLowerCase()+"_msgbox").style.display = "none"; }catch(e){} // hide msg box
		},	

		olderPosts : function() {
			debug.print("olderPosts()",{level:0});
			// Auto click "older posts" or "show older"
			try{if(main.requestsOpen<main.maxrequests){
				var posts=countNodes("count(.//li[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed')) and contains(@title,'working')])", {node:fb.newsFeed});
				var max = main.opts["olderlimit"];
				//main.message('count='+posts+' max='+max);
				var olderExists=true;
				if (max=="off" || (posts<parseInt(max)) ) olderExists=fb.expandOlder();
				if (!olderExists) main.disable24HourProcessor();
				posts=null;max=null;
			}}catch(e){debug.print("olderPosts: failed: "+e,{level:1});}
			return;
		},
	
		getSettingsTree : function(s,settings,tempopts) {			
			var g=GM_config.get(s), kids=settings[s].kids;
			switch(typeof g) {
				case "boolean": tempopts[s] = g; break;
				case "number": tempopts[s] = g || 0; break;
				case "text": tempopts[s] = g || ""; break;
				default: tempopts[s] = g;
			}

			if(kids && typeof kids=="object") for(var kid in kids) { 
				tempopts=main.getSettingsTree(kid,kids,tempopts);
			}

			g=null; k = null; kids=null;
			return tempopts;
		},

		updateSettingsValues : function() {
			// method to speed up script considerably
			var tempopts={}, settings=GM_config.settings;
			for(var s in settings) { 
				tempopts=main.getSettingsTree(s,settings,tempopts);
			}
			main.reqTO = Math.round(tempopts["reqtimeout"]*1000);
			main.opts = tempopts; tempopts=null; settings=null;
		},

		// refresh function. be sure to only do it if the config isn't up, it isn't paused, and requests are finished
		// also prevent refresh if window open
		refresh : function() {
			//check for page shift before refresh timeout
			//if (main==null || $ == null) return;

			if(main.curReqs==0 && !$("GM_config") && !main.paused && !main.opts["olderdepth"] && !main.pauseRefresh) {
				//check if need to print a friends list for sharing
				if (main.special24HourBit==1) {
					if (main.opts["FrVfriendlist"] || main.opts["TIfriendlist"] || main.opts["RwFfriendlist"] || main.opts["CVfriendlist"]){
						//pause and print the lists
						main.paused = true;
						main.printShareableFriendList();
						return; //prevents refresh timer from starting up again						
					}
				}

				//do refresh
				var i=0, refint=window.setInterval(function() {
					if(i >= 12 && main.curReqs==0 && !$("GM_config") && !main.paused && !main.opts["olderdepth"] && !main.pauseRefresh) {
						if (main.oTab) main.oTab.close();
						if (refto)window.clearTimeout(refto);
						if (refint)window.clearInterval(refint);
						main.toPage(location.href);
					}
					else if(i < 12 && main.curReqs==0 && !$("GM_config") && !main.paused && !main.opts["olderdepth"]) i++;
					else i=0;
				}, 250);

			} else window.setTimeout(main.refresh, (main.curReqs == 0 ? 1 : main.curReqs)*1000);
		},

		dropItem : function(key) {			
			//main.message('dropItem');
			//stop working on a certain wall story
			if(main.opts['displaymode']=="1") try{WM.setStatus(key,{prog:100,color:'#D7D700',status:'error'})}catch(e){}
			if(main.opts['displaymode']=="2") try{WM.setDebugStatus(key,'Error')}catch(e){}
			var link = fb.getLinkByKey(key);
			var post= fb.getStoryParentOf(link);
			if(link && post) {
				//if the item was in the processing state, remove that state and color
				link.setAttribute("id", "item_skip_"+key);
				post.setAttribute("title", "processed");
				main.colorCode(link, "neutral");
				main.remove(key);
			}
			if (main.requestsOpen>0) main.requestsOpen--;
			link=null;post=null;
		},

		// update debug status box
		status : function() {
			switch(main.pauseCount) {case 0: if(!main.pauseClick) main.paused=false; break;}
			var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.curReqs+" requests currently ("+main.openCount+" done)":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
			switch(document.title != statusText) {case true: document.title=statusText; break;}
			switch($("status_WM").textContent != statusText) {case true: $("status_WM").textContent = statusText; break;}
			if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
			statusText=null;
		},

		// display a message in the middle of the screen
		message : function(t) {
			if(!GM_config.get("newuserhints")) return;
			var box = $(main.gameAcronym.toLowerCase()+"_msgbox");
			if(box=="null" || box==null || box.nodeType !== 1) $("contentArea").insertBefore(box=main.create("div", {id:main.gameAcronym.toLowerCase()+"_msgbox",style:"background:#CAEEFF; border:2px solid #4AC5FF; z-index:998; padding:20px; -moz-border-radius:6px; -moz-appearance:none; display:none;"}, new Array(
				main.create("div", {style:"width:100%; text-align:right;"}, new Array(
					main.create("a", {textContent:"Close", style:"font-size:9pt; font-family:myriad pro,tahoma,arial,verdana; color:#000000;", href:"javascript:void(0);", onclick:function(e){ e.target.parentNode.parentNode.style.display = "none"; }})
				)),
				main.create("br"),
				main.create("span", {innerHTML:t, style:"color:#002537; font-size:16pt; font-family:myriad pro,tahoma,arial,verdana;"})
				)), $("contentArea").firstChild);
			else box.getElementsByTagName("span")[0].innerHTML = t;
			if(box.style.display=="none") fade(box.id, "in", "fast");
			box=null;
		},

		setAsAccepted : function(key,w,comment,status) {
			debug.print("setAsAccepted()",{level:0});
			main.accTime=main.getAcceptedTime(); main.acc=main.getAccepted();

			var link=fb.getLinkByKey(key);
			if (!link) {debug.print("setAsAccepted: link is null",{level:5}); return;}
			var post = fb.getStoryParentOf(link);
			if (!post) {debug.print("setAsAccepted: post is null",{level:5}); return;}

			var appID=(post)?fb.getStoryAppId(post):null;
			if (!appID) debug.print("setAsAccepted: appID is null",{level:2});
			appID=main.synGames[appID] || appID;

			var text=(((w.find("send")?"Sent ":w.find("wishlist")?"":"Got ") + main.gameData[appID]["accText"][w]) || main.accDefaultText);

			switch(main.opts['displaymode']){ //short mode
				case "1":
					WM.setStatus(key,{prog:100,status:(comment||status+': '+main.statusText[status]||main.accDefaultText)});
					break;
				case "2":
					WM.setDebugStatus(key,comment||status+': '+main.statusText[status]||main.accDefaultText);
					break;
			}

			if (link && post){
				link.setAttribute("id", "item_done_"+key);
				link.textContent=text;
				main.colorCode(link, "done");
				post.setAttribute("title","processed");
				//try autolike
				try{
					if (main.opts["autolike"]) if ( (main.opts["likeonlysend"] && w.find('send')) || !main.opts["likeonlysend"]) fb.likeStory(post);					
				}catch(e){debug.print("setAsAccepted: autolike failed: "+e,{level:1});}
			}

			main.openCount++;
			main.accTime[w][key] = new Date().getTime();
			main.setAcceptedTime(main.accTime);
			main.acc[w].push(key);
			main.setAccepted(main.acc);
			main.remove(key);
			//clean memory
			link=null;text=null;post=null;appID=null;
		},

		setAsFailed : function(key,w,comment,status){
			debug.print("setAsFailed()",{level:0});
			main.failed=main.getFailed(); main.failedTime=main.getFailedTime();

			var link=fb.getLinkByKey(key);
			if (!link) {debug.print("setAsAccepted: link is null",{level:5}); return;}
			var post = fb.getStoryParentOf(link);
			if (!post) {debug.print("setAsAccepted: post is null",{level:5}); return;}
			
			switch(main.opts['displaymode']){ //short mode
				case "1":
					WM.setStatus(key,{prog:100,color:'#D70000',status:(comment||status+': '+main.statusText[status]||main.failText)});
					break;
				case "2":
					WM.setDebugStatus(key,comment||status+': '+main.statusText[status]||main.failText);
					break;
			}

			if (link){
				link.setAttribute("id", "item_done_"+key);
				link.textContent = comment;
				main.colorCode(link, "failed");
				link.setAttribute("id", "item_failed_"+key);		
				post.setAttribute("title","processed");
			} else debug.print("setAsFailed: link is null",{level:2});

			if (main.opts["countfailed"]) main.openCount++;
			main.failedTime[w][key] = new Date().getTime();
			main.setFailedTime(main.failedTime);
			main.failed[w].push(key);
			main.setFailed(main.failed);
			main.remove(key);
			link=null;post=null;
		},

		onFrameLoad : function(key,timeout,appID,short){
			debug.print("onFrameLoad()",{level:0});

			var httpsTrouble=main.gameData[appID]["flags"]["httpsTrouble"];
			var responseLess=main.gameData[appID]["flags"]["skipResponse"];
			var shortMode=(main.opts['displaymode']=="1");
			if (shortMode){
				var prog = (timeout-timeStamp())/(main.reqTO*2);
				prog=(prog>0)?50+((1-prog)*50):100;
				WM.setStatus(key,{prog:prog});
				prog=null;
			}
			if (timeStamp() > timeout) {
				//timer ran out, stop trying this post
				debug.print("onFrameLoad: timer ran out",{level:1});
				var link=(shortMode)?WM.selectLink(key):fb.getLinkByKey(key);
				var post=(shortMode)?WM.selectPost(key):fb.getStoryParentOf(link);
				var w=(shortMode)?WM.getData(key)['which']:main.which(post,appID);
				if (main.opts["failontimeout"]) setAsFailed(key,w,null,-14); else main.dropItem(key);
				return;
			}

			//dont load too early or we get apps.facebook.com != facebook.com cross-domain error
			//try {var lastResponse = main.(short?oXML.documentElement:oTab.document.documentElement).innerHTML;
			if (!httpsTrouble) try {
				var lastResponse = main.oTab.document.documentElement.innerHTML;
			}catch(e){
				debug.print("onFrameLoad: error: "+e,{level:1});
				window.setTimeout(function(e){main.onFrameLoad(key,timeout,appID,short);}, 1000);
				return;
			}

			//check to see if data section was erased due to page change without reload
			var data;
			try {data=WM.getData(key);} catch(e) {debug.print("onFrameLoad: error: "+e,{level:1});}
			if (!data && main.opts['displaymode']==1){
				//data is missing, stop trying this post
				debug.print("onFrameLoad: expected data missing",{level:2});
				main.dropItem(key);
				main.refresh();
				return;
			}


			var link=(shortMode)?WM.selectLink(key):fb.getLinkByKey(key);
			var post=(shortMode)?WM.selectPost(key):fb.getStoryParentOf(link);
			var w=(shortMode)?WM.getData(key)['which']:main.which(post,appID);

			var failedItem=false, gotItem=false, nopopLink;

			// error checking
			if (!httpsTrouble) if (!lastResponse || !link) {
				//tracking data and html missing
				debug.print("onFrameLoad: link or lastResponse is null",{level:2});
				main.dropItem(key); 
				return;
			}

			//get sidekick return value
			var hashMsg="",hashStatus=0;
			try{
				//hashMsg = main.(short?oXML:oTab).location.hash;
				hashMsg = main.oTab.location.hash || main.oTab.location.href.split("#")[1];
				hashStatus=(responseLess)?2:parseInt(hashMsg.split('status=')[1].split("&")[0]);
				gotItem=((hashStatus>0) || (hashStatus==-6) || (hashStatus==-4) || (hashStatus==-3) || responseLess);
				failedItem=(hashStatus<0);

			} catch(e){
				var errText=""+e;
				if (errText.contains("hashMsg is undefined")) {
					//this known issue occurs when a page is not yet fully loaded and the 
					//WM script tries to read the page content
					debug.print("onFrameLoad: error getting hash message: "+errText, {level:1});
					window.setTimeout(function(e){main.onFrameLoad(key,timeout,appID,short);}, 500);
					return;
				}
				else if (errText.contains("Permission denied to access property")) {
					//we've reached some known cross domain issue
					if (responseLess) {
						//if the sidekick creator has chosen to use responseless collection
						//simply assume the page has loaded and mark the item as collected

						gotItem=true;failedItem=false;hashStatus=2;
					} else {
						debug.print("onFrameLoad: permission denied error: "+e,{level:2});
					}
				}
				else {
					debug.print("onFrameLoad: error: "+e,{level:3});
					window.setTimeout(function(e){main.onFrameLoad(key,timeout,appID,short);}, 500);
					return;
				}
			}				

			//if gotItem then we have been offered the item so far
			if (gotItem){
				//build debug block
		    		switch(hashStatus){
					case -3:
						//this bonus says we are over limit and its a bonus that does not send anything to friends
						//we specified we wanted over limit messages marked as failed attempts
						main.setAsFailed(key, w, null,hashStatus);
						main.oTab.location.href="about:blank";
						if (main.requestsOpen>0) main.requestsOpen--;
						break;
					
					case -6: case -4: case 1:
						// this bonus is available or we still have the ability to send something for no return
						if (main.gameData[appID]["flags"]["requiresTwo"]){
							try{
								nopopLink=hashMsg.split("&link=[")[1].split("]")[0];
							}catch(e){											
								main.setAsAccepted(key, w, null,hashStatus);
								main.oTab.location.href="about:blank";
								if (main.requestsOpen>0) main.requestsOpen--;									
							}

						} else{
							main.setAsAccepted(key, w, null,hashStatus);
							main.oTab.location.href="about:blank";
							if (main.requestsOpen>0) main.requestsOpen--;
						}
						break;
					case 2:
						main.setAsAccepted(key, w, null, hashStatus);
						main.oTab.location.href="about:blank";
						if (main.requestsOpen>0) main.requestsOpen--;
						break;

					default:
						//should not have come here for any reason, but if we did assume its a status code I didnt script for
						main.setAsFailed(key, w,null,hashStatus);
						main.oTab.location.href="about:blank";
						if (main.requestsOpen>0) main.requestsOpen--;
						debug.print("onFrameLoad: unexpected status code: "+hashStatus,{level:2});
						break;
		    		}
			} else {
				main.setAsFailed(key,w,null,hashStatus);
				main.oTab.location.href="about:blank";
				if (main.requestsOpen>0) main.requestsOpen--;
			}

			// click "yes" to accept it, if we got this far we actually found an accept button
			if(main.gameData[appID]["flags"]["requiresTwo"]) {
				if (nopopLink) {
					var intvFinish = window.setTimeout(function(e){debug.print("onFrameLoad: finishing stage: timer ran out",{level:1});main.dropItem(key);}, main.reqTO);
					GM_xmlhttpRequest({
						method: "GET",
						url: nopopLink,
						onload: function(response) {
							//search for error messages
							var test=response.responseText;
							if (test==""){
								//no text was found at requested href
								debug.print("onFrameLoad: final stage: null response",{level:2});
								main.setAsFailed(key, w, null,-9);
							} else {
								//if no errors then we got it
								main.setAsAccepted(key, w,null,hashStatus);
							}
							main.oTab.location.href="about:blank";
							if (main.requestsOpen>0 && intvFinish) main.requestsOpen--;
							if (intvFinish) window.clearTimeout(intvFinish);
							intvFinish=null;test=null;								
							return;
						}, 
						onerror: function(response) {
							debug.print("onFrameLoad: final stage: error returned",{level:2});
							//if final request fails, drop the request for now
							main.setAsFailed(key, w, null,-10);
							main.oTab.location.href="about:blank";
							if (main.requestsOpen>0) main.requestsOpen--;
							if (intvFinish) window.clearTimeout(intvFinish);
							intvFinish=null;
							return;
						
						}
						//dont process further if returned too late, but this may cause some good posts to be marked failed.
					});
				} else debug.print("onFrameLoad: nopopLink is null",{level:2});
			} 
		},

		open2 : function(key,timeout,appID,expectedHref){
			debug.print("open2()",{level:0});

			//first check that the timer has not run out
			if (main.opts['displaymode']=="1"){
				var prog = (timeout-timeStamp())/main.reqTO;
				prog=(prog>0)?(1-prog)*100:100;
				WM.setStatus(key,{prog:prog});
			}
			if (timeStamp() > timeout) {
				//timer ran out, stop trying this post
				debug.print("open2: timer ran out",{level:1});
				var link=(shortMode)?WM.selectLink(key):fb.getLinkByKey(key);
				var post=(shortMode)?WM.selectPost(key):fb.getStoryParentOf(link);
				var w=(shortMode)?WM.getData(key)['which']:main.which(post,appID);
				if (main.opts["failontimeout"]) setAsFailed(key,w,null,-14); else main.dropItem(key);
				return;
			}

			//try to process the post
			try {
				var link=(main.opts['displaymode']=="1")?WM.selectLink(key):fb.getLinkByKey(key);
				//if error encountered, reload the page
				if (main.oTab.document.title==="Problem loading page"){
					debug.print("open2: problem loading page",{level:1});
					main.oTab.location.replace(link.href);
					window.setTimeout(function(e){main.open2(key,timeout,appID);},500);
					return;
				}

				//make sure we are looking at the new document, not the old document
				
				var test="";
				//if (!main.gameData[appID]["flags"]["httpsTrouble"]){

					if (main.oTab.document.location.href.find(main.oTabID) && main.oTabID){
						//last page loaded still running
						debug.print("open2: page not yet loaded",{level:0});
						window.setTimeout(function(e){main.open2(key,timeout,appID);},500);
						return;
					}
	
					//get the unique signature of the opening tab document
					test=main.oTab.document.documentElement.innerHTML.split("</noscript>")[0].split("<noscript>")[1];
				
					//check if unique signature is different from the previous stored signature
					//if its the same then this is not the page we are supposed to be on
					if (test===main.oTabID){
						//wait some more time to see if the page is just slow
						debug.print("open2: page signature not unique",{level:0});
						window.setTimeout(function(e){main.open2(key,timeout,appID);},500); 
						return;
					}


				//}//end check if not has https trouble
									
				//open the workhorse function and add another 30 seconds to the timer
				window.setTimeout(function(e){main.onFrameLoad(key,timeStamp()+main.reqTO,appID);},500);

				//stop checking for load, mark the request as finished and save the new signature
				main.oTabID=test;				
				return;							
			} catch(e) {
				debug.print("open2: error: "+e,{level:3});
				window.setTimeout(function(e){main.open2(key,timeout,appID);},500);
			}
		},

		// load an item url
		open : function(key){
			debug.print("open()",{level:0});
			// break if paused or requests are already out
			//if (!key) debug.print("open: key is null",{level:2});
			if (main.paused || main.curReqs >= main.maxrequests || !key) {debug.print("open: paused",{level:0});return;}
			
			//check to see if data section was erased due to page change without reload
			var data;
			try {data=WM.getData(key)} catch(e) {debug.print("open: error: "+e,{level:0});}
			if (!data && main.opts['displaymode']=="1"){
				//data is missing, stop trying this post
				debug.print("open: expected data missing",{level:2});
				main.dropItem(key);
				main.refresh();
				return;
			}

			//begin processing
			var link,appID,targetHref;
			if (main.opts['displaymode']=="1"){
				link=WM.selectLink(key);
				appID=WM.getData(key)['appID'];
				appID=main.synGames[appID] || appID;

			} else {
				link=fb.getLinkByKey(key);
				if (link){
					appID=fb.getStoryAppId(fb.getStoryParentOf(link));
					appID=main.synGames[appID] || appID;
					link.setAttribute("id", "item_processing_"+key);
					main.colorCode(link, "processing");
				} else debug.print("open: link is null",{level:0});
			}
			main.requestsOpen++;

			targetHref = link.href;

			//fix the link based on sidekick alterlink information
			if (main.gameData[appID]["flags"]["alterLink"]) {
				//alterlink is true so get the data to alter
				var alterLink = main.gameData[appID]["alterLink"];
				if (alterLink){
					var alFind = alterLink["find"];
					var alReplace = alterLink["replace"];

					//note that only find and replace functionality is available right now, no wildcards or array inserts will work

					targetHref = targetHref.replace(alFind,alReplace);				
				} else debug.print("post: alterLink is null",{level:1});
			}
			
			//fix the link, removing https and switching to http only
			targetHref = targetHref.replace('https://','http://');

			//fix the link removing any double / before tracks.php
			targetHref = targetHref.replace('//tracks','/tracks');

			debug.print("open: "+ (targetHref===link.href)?"target same as link":"target different than link",{level:0});

			//open the bonus page in a new tab or the previously opened tab object to save memory
			(!main.oTab)?main.oTab=window.open(targetHref,'_blank'):main.oTab.location.href=targetHref;

			if (!main.oTab) debug.print("open: cannot access main.oTab object",{level:2});

			//with tab now existing, create the event listener for onload events				
			//continue if work does not progress after set amount of time
			var intvOpen = timeStamp()+main.reqTO;
			//move to sub opener
			var href=targetHref;
			window.setTimeout(function(e){main.open2(key,intvOpen,appID,href);},1000);						
		},


		getIsOnNewsFeed : function(){
			if (main.realURL.find("games?ap=1")) return false; //redundant but prevents games page without an sk from returning NF
			if (main.realURL.find("ref=home")) return true;
			else if (fb.SK=="nf") return true;
			else if (fb.SK=="h") return true;
			else if (main.realURL==="http://www.facebook.com/") return true;
			else if (main.realURL==="https://www.facebook.com/") return true;
			else return false;		
		},

		getIsOnProfile : function(){
			if (main.realURL.find("profile.php?id=")) return true; //other profile, no alias
			else if (fb.SK=="wall") return true; //other profile, no alias
			else if ($("profile_minifeed")) return true; //other profile, with alias
			else if (main.realURL.split("/").last()==fb.getUserAlias) return true; //my own profile with no sk
			else return false;
		},

		getIsOnList : function(){
			if (fb.SK.startsWith("fl_")) return true; //old style friend's list
			else if (main.realURL.startsWith("http://www.facebook.com/lists/")) return true; //new style as directory
			else if (main.realURL.startsWith("https://www.facebook.com/lists/")) return true; //new style as directory
			else return false;
		},

		doPreOpFilters : function(){
			debug.print("doPreOpFilters",{level:0});

			//expand similar post links
			fb.expandSimilar();
			//block requests pagelets if on games.php
			if (location.href.find('games.php') || location.href.find("games?")){
				// remove the requests pagelet on games.php
				if (main.opts["hidepgltrequests"]||main.opts["olderdepth"]) $('pagelet_requests').style.display='none';
				// remove the friends' games pagelet on games.php
				if (main.opts["hidepgltfriends"]||main.opts["olderdepth"]) $('pagelet_friends').style.display='none';
				// remove the your games pagelet on games.php
				if (main.opts["hidepgltuser"]||main.opts["olderdepth"]) $('pagelet_user').style.display='none';
			}

			// remove user posts from the feed
			//if (main.opts["hidemyposts"]||main.opts["olderdepth"]) deleteNodes(".//*[starts-with(@id,'stream_story_') and contains(@data-ft,'\"actrs\":\""+fb.getUserId()+"\"')]", {node:fb.newsFeed});

			// remove profile image thumbs if selected
			if(main.opts["dropprofimages"]){
				deleteNodes(".//img[contains(@class, 'uiProfilePhoto')]",{node:fb.newsFeed});	
			}

			// open more posts if needed
			if (main.opts["olderdepth"]) main.olderPosts();
		},
		
		doPostOpFilters: function(){
			debug.print("doPostOpFilters()",{level:0});

			// remove skipped supported feeds
			if (main.opts["filterSkipped"]||main.opts["olderdepth"]) deleteNodes(".//a[starts-with(@id,'item_skip_')]/ancestor::*[starts-with(@id,'stream_story_')]", {node:fb.newsFeed});

			// remove unsupported feeds
			if (main.opts["filterUnsupported"]||main.opts["olderdepth"]) deleteNodes(".//*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed')) and not(contains(@title,'working') or contains(@title,'processed'))]", {node:fb.newsFeed});
			
			// remove supported feeds we decided to hide
			if (main.games) for (var i=0, appID, synID;i<main.games.length;i++){
				appID = main.games[i]; synID = main.synGames[appID];
				if (main.opts["filterHide"+appID] || main.opts["filterHide"+synID]) deleteNodes(".//*[starts-with(@id,'stream_story_') and (contains(@data-ft,'\"app_id\":\""+appID+"\"') or contains(@data-ft,'\"app_id\":"+appID+"'))]", {node:fb.newsFeed});
			}

			// remove finished feeds
			if (main.opts["removedone"]||main.opts["olderdepth"]) deleteNodes(".//a[starts-with(@id,'item_done_') or starts-with(@id,'item_overlimit_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_')]/ancestor::*[starts-with(@id,'stream_story_')]", {node:fb.newsFeed})

			// hide feed body, 10=attach (cannot delete, required for recognition)
			if (main.opts["removeBody"]||main.opts["olderdepth"]) hideNodes(".//div[contains(@data-ft, '{\"type\":10}')]",{node:fb.newsFeed});

			// delete feed comments, 30=ufi
			if (main.opts["filterComments"]||main.opts["olderdepth"]) deleteNodes(".//ul[contains(@data-ft, '{\"type\":30}')]",{node:fb.newsFeed});

			// remove feed image if selected
			if(main.games && main.opts["dropfeedimages"] && main.opts["displaymode"]==0) {
				//for each game
				for (var i=0,appID;(appID=main.games[i]);i++){
					//reference the correct games entry
					appID=main.synGames[appID] || appID;
					//sanity check
					if (appID){
						var data=main.gameData[appID];
						//sanity check
						if (data){
							var thumbsSource=data["thumbsSource"];
							//determine array or single entry, and convert to array
							if (typeof(thumbsSource)=='string') thumbsSource = [].push(thumbsSource);
							//if any entry exists, start deleting images
							if (thumbsSource) for (var src=0,len=thumbsSource.length; src<len;src++){
								deleteNodes(".//img[contains(@src, '"+thumbsSource[src]+"') and not(starts-with(@id,'WM_'))]",{node:fb.newsFeed});	
							} else debug.print("no thumb sources found")
						}
					} else debug.print("no appID");
				}
			}

			// remove wish lists unless told not to
			if (!main.opts["filterWishlists"]||main.opts["olderdepth"]) deleteNodes(".//a[starts-with(@id,'item_wishlist_')]/ancestor::*[starts-with(@id,'stream_story_')]", {node:fb.newsFeed});


		},

		shareFriend : function(id, gameMode){
			var friendListHolder = eval("main."+gameMode+"friendListHolder");
			if(friendListHolder==null) friendListHolder=new Array();
			if(!friendListHolder.inArray(id)) friendListHolder.push(id);
		},

		disable24HourProcessor : function(){
			main.toggle("olderdepth");
		},

		toggle : function(opt){
			if (main.opts[opt]){
				GM_config.set(opt, false);
				main.opts[opt] = false;
			} else {
				GM_config.set(opt, true);
				main.opts[opt] = true;
			}
                	GM_config.save();
		},


		showGameSettingsPanel : function(appID,imgSrc){
			if (!appID) return;

			var appPanel=$('wmPanel_app'+appID);
			if (appPanel) return;

			var hub=$('wmSettingsLinks');
			if (!hub) return;

			var ver;
			switch(appID.toString()){
				case main.gameIDPT:
					ver = imgSrc.split('production%2F')[1].split('%2Fassets')[0];
					hub.appendChild(
						createElement('div',{id:'wmPanel_app'+appID},new Array(
							createElement('text','FrontierVille'),
							createElement('br'),
							createElement('input',{type:'button',value:'Game Settings',onclick:function(){
								window.open('http://assets.frontierville.zynga.com/production/'+ver+'/xml/globalSettings.xmlgz','_blank');
							}}),
							createElement('br'),
							createElement('input',{type:'button',value:'Feeds Config',onclick:function(){
								window.open('http://assets.frontierville.zynga.com/production/'+ver+'/xml/feedsConfig.xmlgz','_blank');
							}}),
							createElement('br'),
							createElement('input',{type:'button',value:'Dialog Text',onclick:function(){
								window.open('http://assets.frontierville.zynga.com/production/'+ver+'/xml/flashLocaleXml.xmlgz','_blank');
							}}),
							createElement('br'),
							createElement('input',{type:'button',value:'Quest Settings',onclick:function(){
								window.open('http://assets.frontierville.zynga.com/production/'+ver+'/xml/questSettings.xmlgz','_blank');
							}}),
							createElement('br'),
							createElement('input',{type:'button',value:'Frontier Explorer',onclick:function(){
								window.open('http://www.facebook.com/frvexplorer?ver='+ver,'_blank');
							}})
						))
					);
					break;
			}
		},

		//temporary storage area for run subsections data
		acc : null,
		accTime : null,
		failed : null,
		failedTime : null,
		masterBreak : false,

		initBonusTypeStorage : function(w){
			//setup history storage for this bonus type
			try {
				if(!main.acc[w]) {main.acc[w] = new Array();main.setAccepted(main.acc);}
				if(!main.accTime[w]) {main.accTime[w] = {};main.setAcceptedTime(main.accTime);}
				if(!main.failed[w]) {main.failed[w] = new Array();main.setFailed(main.failed);}
				if(!main.failedTime[w]) {main.failedTime[w] = {};main.setFailedTime(main.failedTime);}
			} catch(e) {
				if(main.acc[w] == "undefined") {main.acc[w] = new Array();main.setAccepted(main.acc);}
				if(main.accTime[w] == "undefined") {main.accTime[w] = {};main.setAcceptedTime(main.accTime);}
				if(main.failed[w] == "undefined") {main.failed[w] = new Array();main.setFailed(main.failed);}
				if(main.failedTime[w] == "undefined") {main.failedTime[w] = {};main.setFailedTime(main.failedTime);}
			}
		},

		identifyPost : function(post,appID){
			var debugThis=false;
			if(debugThis) debug.print("identifyPost("+post.id+","+appID+")",{level:0});

			//avoid posts already processed or currently being run
			if (post.title.find("processed") || post.title.find("working")) {debug.print("identifyPost: post already identified",{level:0});return;}

			//avoid posts without an action link section
			var link=fb.getStoryActionLink(post);
			if (!link) {debug.print("identifyPost: link is null",{level:2});return;}

			//stylize links
			if (main.opts["floatRight"+appID] && (!link.className.contains(' float_right'))) link.className = link.className + " float_right";

			//get post data
			//var gameAlias = main.gameData[appID]["alias"];
			var whoPosted = fb.getStoryActorId(post);
			if(debugThis) debug.print("whoposted:"+whoPosted);
			var postID = fb.getStoryId(post);
			if(debugThis) debug.print("postid:"+postID);
			var whoName = fb.getStoryActorName(post);
			if(debugThis) debug.print("whoname:"+whoName);
			var isPostForMe = fb.getStoryTargetsMe(post);
			if(debugThis) debug.print("ispostforme:"+isPostForMe);
			var isW2W = fb.getStoryIsW2W(post);
			if(debugThis) debug.print("isw2w:"+isW2W);
			var key = fb.getStoryUniqueKey(post);
			if(debugThis) debug.print("key:"+key);

			//avoid posts by self
			var isMyPost = fb.getStoryIsMyPost(post);
			if(debugThis) debug.print("ismypost:"+isMyPost);
			if (isMyPost) {link.setAttribute("id", "item_skip_"+key);link.className+=" excluded";post.setAttribute("title","processed");debug.print("identifyPost: post created by user",{level:0});if (main.opts["hidemyposts"]) main.remove(post);return;}

			//avoid posts older than 24 hours
			var isStale = fb.getStoryIsStale(post);
			if(debugThis) debug.print("isstale:"+isStale);
			//if (isStale) {link.setAttribute("id", "item_skip_"+key);link.className+=" excluded";post.setAttribute("title","processed");main.disable24HourProcessor();debug.print("identifyPost: post is stale",{level:0});return;}
			//show settings links
			if (main.opts['showgamesettings']){
				var oImg = fb.getStoryImage(post);
				if (oImg) {
					var imgSrc = oImg.src;
					main.showGameSettingsPanel(appID,imgSrc);
				}
			}

			//remove hidden text "..." separator
			deleteNodes(".//span[@class='text_exposed_hide']",{node:post});
			var hiddenNode = selectSingleNode(".//span[@class='text_exposed_show']",{node:post});
			if (hiddenNode) {hiddenNode.className="";hiddenNode.style.display="block";hiddenNode=null;}
				
			//get bonus type
			var w=link.parentNode.getAttribute("id"),alreadyRead=false;
			if (w==null || w==="") {w=main.which(post,appID);} else {alreadyRead=true;}
			link.parentNode.setAttribute("id", w);

			//collect current properties of this item if its not totally indeterminate
			if (w=="none" || w=="exclude") {post.setAttribute("title","processed");link.setAttribute("id", "item_skip_"+key);if(w=="exclude")link.className+=" excluded";debug.print("identifyPost: post returned 'none' or 'exclude'",{level:0});return;}


			//create bonus type storage for type W
			main.initBonusTypeStorage(w);

			//flag the post so we can keep track of it
			if (!alreadyRead){
				link.setAttribute("id", "item_"+key);
				link.setAttribute("title", link.textContent);
				link.className+=" identified";
			}
				
			//debug recognition
			if (main.opts["debugrecog"]) link.textContent = (w.find("send")?"Send ":w.find("wishlist")?"":"Get ") + main.gameData[appID]["accText"][w];

			//dev mode stuff
			switch(main.opts['displaymode']){
				case "2": //mode dev
					WM.addDevMode(post,key,w,appID,whoPosted,whoName);
					break;
			}
		
			//special stuff about stealing W2W posts
			if (isW2W && !isPostForMe && main.opts[appID+"dontsteal"]) {link.className+=" excluded";link.setAttribute("id", "item_skip_"+key);post.setAttribute("title","processed");debug.print("identifyPost: post protected by dontSteal flag",{level:0});return;}

			//begin process of this post
			if(debugThis) debug.print("begin checking history");

			var isDone=true;
			main.colorCode(link, "neutral");
			if (!main.acc[w].inArray(key)) {
				//post has not given us a bonus yet
				if(main.failed[w].inArray(key)) {
					//post previously failed
					main.colorCode(link, "failed");
					link.textContent = main.failText;
					link.setAttribute("id", "item_failed_"+key);
				} else if(!$(key)) {
					if (main.opts[w] || (w.startsWith(appID+"send") && main.opts[appID+"sendall"]) ) {
						//bonus type is wanted
						isDone=false;

						//WM 1.5 display mode stuff
						switch (main.opts['displaymode']){
							case "1": //mode short
								var img=fb.getStoryImage(post);
								WM.addIconToPanel("WMIcons",{key:key,href:link.href,img:(img?img.src:''),which:w,appID:appID,whoPosted:whoPosted,whoName:whoName,status:'working',gameMode:appID});
								WM.hideStory(key);
								break;
						}
					} else {
						//bonus type is unwanted
						if (w.find("wishlist"))	link.setAttribute("id", "item_wishlist_"+key);
						else link.setAttribute("id", "item_skip_"+key); 
					}
				}
			} else {
				//post previously processed
				main.colorCode(link, "done");
				link.textContent = (((w.find("send")?"Sent ":w.find("wishlist")?"":"Got ") + main.gameData[appID]["accText"][w]) || main.accDefaultText); 
   				link.setAttribute("id", "item_done_"+key);
			}

			if(debugThis) debug.print("end checking history");

			//mark as ready to process by processPosts()
			post.setAttribute("title",(isDone)?"processed":"working");
		},

		// process first available already identified post
		processPosts : function(){ //return;
			debug.print("processPosts()",{level:0});
			//begin processing posts
			if (main.opts['displaymode']=="1") {
				window.setTimeout(function(e){
					var post=selectSingleNode(".//div[starts-with(@id,'WM_') and contains(@title,'working')]",{node:$('WMIcons')});
					if (post) {
						var key=WM.getKey(post);
						if (key) main.open(key);
						else debug.print("processPosts: key is null",{level:3});
					} else debug.print("processPosts: post is null",{level:3});
				},500);
			}
			else {
				window.setTimeout(function(e){
					var post=selectSingleNode(".//li[contains(@title,'working')]",{node:fb.newsFeed});
					if (post) {
						var key=fb.getStoryUniqueKey(post);
						if (key) main.open(key);
						else debug.print("processPosts: key is null",{level:3});
					} else debug.print("processPosts: post is null",{level:3});

				},500);
			}
		},

		// core function. this loops through posts and loads them
		run : function() {
			if (main.masterBreak) {debug.print("run(): Masterbreak is on",{level:0});return;}
			debug.print("run()",{level:0});
			//prevent scewing up the game requests page by getting what SK parameter we are using
			var SK = (main.realURL.find("games?ap"))?"":fb.SK;
			debug.print("run(): sk="+SK,{level:0});

			//Then only run on acceptable news feed pages
			if (!(main.realURL.find("games?ap") || main.getIsOnList() || SK.startsWith("app_") || SK=="cg" || SK=="lf" || main.getIsOnProfile() || main.getIsOnNewsFeed() ) ){debug.print("run(): pauseRefresh on",{level:0}); main.pauseRefresh=true; return;}

			//break if this sk param or this page is blocked in the options menu
			//also pausing auto-refresh if we are not on one of the accepted pages
			if ( (main.opts["ignorefriendslist"] && main.getIsOnList() )
	    			|| (main.opts["ignorecg"] && SK=="cg")
	    			|| (main.opts["ignoreprofile"] && main.getIsOnProfile() )
	    			|| (main.opts["ignoregames"] && main.realURL.find("games?ap") )
		    		|| (main.opts["ignoreapps"] && SK.startsWith("app_") )
		    		|| (main.opts["ignorehome"] && main.getIsOnNewsFeed() ) 
			    	|| (main.opts["ignorelatest"] && SK=="lf") 
			){main.pauseRefresh=true; debug.print("run(): pauseRefresh on",{level:0});return;}

			//restore auto-pause if we have moved to an accepted page
			main.pauseRefresh=false;

			//break if fb or newsfeed object is not initialized, meaning that the DOM does not contain proper feed info
			if(!fb.newsFeed) {debug.print("run(): fb.newsFeed is null",{level:2});return;}

			//set a variable so if 24 hour processor is running we remember to do special stuff related to it
			if(main.opts["olderdepth"]) main.special24HourBit = 1; 

			//filter graphics and self posts
			main.doPreOpFilters();

			//run only if sidekicks exist
			if (main.games) {
				//run for each sidekick installed
				for (g=0;g<main.games.length;g++) {
			
					//get app data or break if none found
					var appID = main.games[g];

					//check that this is not a game synonym
					var synID = main.synGames[appID];

					if (!appID) {debug.print("run(): main.games["+g+"] is null",{level:2});return;} //no app id in there
					if (!main.gameData[(synID||appID)]) {debug.print("run(): main.gameData["+appID+"] is null",{level:2});return;} //no data for this app
	
					//run only for games switched on and not hidden
					if (main.opts['master'+(synID||appID)] && !main.opts['filterHide'+(synID||appID)]) {
						//get game posts for this game
						var wallposts = fb.getStoriesByAppId(appID,true);
						if (!wallposts||!wallposts.snapshotLength) {
							//debug.print("run(): wallposts is null or empty for appID="+appID,{level:0});
						} else {

							//get stored history
							main.acc=main.getAccepted(); main.accTime=main.getAcceptedTime();
							main.failed=main.getFailed(); main.failedTime=main.getFailedTime();
					
							// loop through each post if any exist
							var i=0, len=wallposts.snapshotLength;
							if(len > 0) do {
								var post=wallposts.snapshotItem(i);
								if (post) main.identifyPost(post,(synID||appID));
								else debug.print("run(): post is null",{level:2});
							} while (++i < len);
						}
					} 
				} 
			} else {debug.print("run(): main.games is null",{level:1});} //sidekicks not available (yet)

			//run filters and clean up memory useage
			main.doPostOpFilters();

			//dont run if menu is open or if requests are still out
			if($("GM_config") || (main.opts["removedone"]===false && main.curReqs >= main.maxrequests)) {debug.print("run(): menu open or post being processed",{level:0});return;}

			//Begin processing identified posts
			main.processPosts();
		}

	}; //end of main


	// run script if on acceptable page type
	if(document.title=="Problem loading page") main.refresh();

	var refto,runint;

	if($(main.navIDnf) || $("pagelet_navigation") || $("sideNav")) { 

		// pre-load the config
		GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
			section_main:section("Wall Manager Info",{
				MainMessageCenter:separator("Documentation - Messages - Help",null,{
					Mainupdate:anchor("Update Script","http://userscripts.org/scripts/source/86674.user.js"),
					Mainhomepage:anchor("Script Home Page","http://userscripts.org/scripts/show/86674"),
					Mainwikipage:anchor("Wiki Support Page","http://fbwm.wikia.com"),
					Mainsetupinfo:anchor("Firefox Setup Info","http://userscripts.org/topics/63194"),
					Maindiscuss:anchor("Known Bugs","http://fbwm.wikia.com/wiki/Known_Issues"),
					Mainmanual:anchor("Options Manual","http://fbwm.wikia.com/wiki/Options_Menu"),
					Mainrevisionlog:anchor("Revision Log","http://fbwm.wikia.com/wiki/Revisions"),
					MainFBAP:anchor("Install Facebook Auto Publish","http://userscripts.org/scripts/source/99905.user.js"),
				},true),
			}),

			section_masterswitches:section("Master Switches",{
				masterSwitchBlock:optionBlock("Known Games",{},true)
			}),

			section_filters:section("Feed Filter Options",{			
				ignorefeeds:optionBlock("Don't Process On",{			
					ignorehome:checkBox("Top News/Home Feed (sk=h, sk=nf or ref=home)", true),
					ignorelatest:checkBox("Most Recent Feed (sk=lf)", true),
					ignorecg:checkBox("Games Feed (sk=cg)"),
					//ignoregames:checkBox("Games Page (games.php)"),
					ignorefriendslist:checkBox("Friends Lists (sk=fl)"),
					ignoreapps:checkBox("App filters (sk=app)"),
					ignoreprofile:checkBox("Other's Profiles (sk=wall or profile.php)"),
					//ignorenosk:checkBox("No SK value (unknown locations)"),
				},true),

				/*hidegamespagecontent:optionBlock("Hide Pagelets on Games.php",{
					hidepgltrequests:checkBox("Requests"),
					hidepgltuser:checkBox("Your Games"),
					hidepgltfriends:checkBox("Friends' Games"),
				}),*/
	
				hidefeedimages:optionBlock("Remove Feed Parts",{
					dropfeedimages:checkBox("Bonus Images"),
					dropprofimages:checkBox("User Thumbs"),
					removeBody:checkBox("Feed Body"),
					filterComments:checkBox("Comments"),
				},true),
	
				hidemyposts:checkBox("Hide My Posts From Feeds"),

				filterSkipped:checkBox("Hide Unwanted Bonuses (works with 'dont hide wishlists' below)"),
				removedone:checkBox("Hide finished items from feed?",false,{ 
					filterWishlists:checkBox("Don't Hide Wish Lists"),
				}),

				filterUnsupported:checkBox("Hide Unsupported Entries"),
				hidespecificgames:optionBlock("Hide Specific Games",{},true),
				createfilters:optionBlock("Add Filters to FB Navbar",{},true),
				//now added dynamically as "filterHide"+appID
				floaterSwitchBlock:optionBlock("Float Actionlinks to Right",{},false),

				blockads:checkBox("Block Ads?"),
			}),

			section_basicopts:section("Basic Tech Options",{						
				arinterval:{
					label:"Auto Refresh",
					type:"select",
					options:{
						off:"Off",
						tenth:"6 seconds",
						sixth:"10 seconds",
						third:"20 seconds",
						half:"30 seconds",
						one:"1 minute",
						two:"2 minutes",
						three:"3 minutes",
						four:"4 minutes",
						five:"5 minutes",
						ten:"10 minutes",
						"30s2m":"30sec-2min random",
						"2m5m":"2min-5min random",
						"5m10m":"5min-10min random"
					},
					"default":"30s2m"
				},
	
				displaymode:{
					label:"Display Mode",
					type:"select",
					options:{
						"0":"plain",
						"1":"short",
						"2":"dev",
					},
					"default":"1"
				},

				showgamesettings:checkBox("Show FrV game settings links?",false),
				colorcode:checkBox("Color Code Item Posts?",true),
				autolike:checkBox("Auto \"like\" accepted posts?",false,{
					likeonlysend:checkBox("\"like\" only \"send\" posts"),
				}),
				olderpostsbottom:checkBox("Float the older posts bar to bottom?"),

				inputtimeoutenable:checkBox("Enable Typing Auto-pause",false,{
					inputtimeout:{label:"Timeout (length of pause)", type:"float", "default":30},
				}),

				reqtimeout:inputBox("Item Acceptance Page Timeout (seconds)",30),
				failontimeout:checkBox("Mark posts that timeout as failed (by default post will retry indefinitely)"),
				itemage:inputBox("How long to keep tried items in memory (days)",2),			
				//failonlimit:checkBox("Mark entries as 'failed' when limit reached",true),
				//countfailed:checkBox("Count failed entries as processed"),

				newuserhints:checkBox("Enable message window?",true),
				status:checkBox("Enable status bar?",true),
				debug:checkBox("Enable debugging?"),
				debugLevel:{
					label:"Debug Sensitivity Level",
					title:"Sets the level of errors and warnings to report. 0 is all, 5 shows only the worst.",
					type:"select",
					options:{
						0:"Function Calls",
						1:"Known errors and warnings",
						2:"Known serious errors",
						3:"Serious unexpected errors",
						4:"Known fatal errors",
						5:"Unexpected fatal errors",
					},
					"default":2
				},

				debugrecog:checkBox("Enable recognition debugging?",true),
	
				reset:button("Reset Accepted Items",main.resetAccepted),

				import:button("Import Settings",GM_config.importSettings),
				export:button("Export Settings",GM_config.exportSettings),
			}),
			
			section_olderopts:section("24 Hour Processor",{			
				olderdepth:checkBox("Enabled"),
			
				olderlimit:{
					label:"Maximum number of posts to load while processing",
					title:"Sets the number of posts to load using the Older Posts link at any one time. When more posts are shown, the older posts link will not be clicked yet.",
					type:"select",
					options:{
						off:"Unlimited",
						5:"5 (Suggested)",
						10:"10",
						20:"20",
						30:"30",
						40:"40",
						50:"50",
						100:"100"
					},
					"default":5
				}
			}),
		},

		// Custom styling for the options interface

		"body {color: #D5D4D4 !important; margin:0 !important; background:-moz-linear-gradient(center top , #434343 0%, #141414 100%) repeat scroll 0 0 transparent !important;}\n"+
			".section_header {border:1px solid #000000; border-radius: 5px 5px 5px 5px; color:#D5D4D4 !important;background:#3A3939 !important; display:block; font-size: 15px !important; font-weight: 700 !important; line-height:23px !important;text-decoration:none !important;}\n"+
			".separator_label {border:1px solid #007195; border-radius: 5px 5px 5px 5px; font-size: 15px !important; line-height:19px !important; font-weight: 700 !important; color:#FEFEFE !important; text-decoration:none !important; margin:0 !important; padding:1px 0 1px 6px !important; display:block !important; background:#53C4FB !important;}\n"+
			".section_header_holder {border-radius: 5px 5px 5px 5px;padding:0 6px 0 6px !important; margin-bottom:6px !important; }\n"+
			".section_kids {background:#424141 !important;border-radius: 0 0 5px 5px;border: 1px solid #000000 !important;border-top:0 !important;padding: 0 6px 6px !important;margin: 0 6px 0 6px !important;}\n"+
			"#header {font-size:18px !important;}\n"+
			"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
			"div.config_var {margin:0 !important; padding: 2px 0 2px 0 !important;}\n"+
			".optionblock_label {display:block; font-size:11px !important;}\n"+
			".block_select_all {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/6ih93q.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".block_select_none {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/2lk2xyw.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".field_label {font-size:11px !important;}\n"+
			".newopt {background:#027B09 !important;}\n"+
			".link_label {line-height:19px; position:relative;z-index:0;padding:2px 6px 2px 6px; border-radius: 0px 25px 0px 25px / 0px 100px 0px 100px; margin-left:6px !important; text-decoration:none;border: 1px solid black; color:black !important; background:#EFF2F7 !important;}\n"+
			".link_label:hover, .link_label:active {z-index:1; background:#D8DFEA !important;}\n"+
			"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}\n"+
			"span > label.field_label {margin-right:0 !important;}\n"+
			"#resetLink {color: #D5D4D4 !important; margin-right:6px !important;}\n"+
			"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
			"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
			"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
			"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+

			".tab_element {display:inline !important;}\n"+
			".tab_header {background:#141414 !important;color:#D5D4D4 !important; padding:2px 6px;border:1px solid #000000; border-radius: 5px 5px 0 0; margin:0 !important; font-size: 13px !important; line-height:19px !important; font-weight: 700 !important; text-decoration:none !important;position:relative;z-index:0;}\n"+
			".tab_body {padding: 0 6px 0 6px !important;margin: 0 !important; background:#424141 !important;border-radius: 0 5px 5px 5px;border: 1px solid #000000 !important;display:none;position:relative;z-index:1;top:-1px;}\n"+
			".tab_selected {background:#424141 !important;border-bottom:0 !important;color:white !important; z-index:2;}\n"+

			".inline {display:inline-block;}\n"+
			".block {display:block;}\n"+
			".underline {border-bottom:1px solid #70BAFF;}\n"+
			".hidden {display:none;}\n"+
			".highlight {background:#94BC41 !important; color:#000000;}\n"+

			".text_border_sep {font-family:tahoma; text-shadow: -1px -1px 1px #007195, 1px 1px 1px #007195, 1px -1px 1px #007195, -1px 1px 1px #007195;text-transform:uppercase; font-weight:900 !important;}\n"+
			".text_border_sec {font-family:tahoma; text-shadow: -1px -1px 1px #000000, 1px 1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000;text-transform:uppercase; font-weight:900 !important;}\n"+
			""
		);

		doDebug = GM_config.get("debug");
		debugLevel = GM_config.get("debugLevel");
		

		// add options shortcut to user script commands
		try {GM_registerMenuCommand("Wall Manager "+version+" Options", main.config);}catch(e){main.log(e.description)}

		// Method to work on multiple accounts
		main.profile = fb.getUserId();


		// add stylesheets
		GM_addStyle(""+
			"#"+main.streamID+" a[id^=\"item_done_\"] {font-weight: bold; font-size: 12px; color: #008800;}\n"+
			"#"+main.streamID+" a[id^=\"item_\"]:not([id^=\"item_done_\"]):not([id^=\"item_failed_\"]):not([id^=\"item_processing_\"]) {font-weight: normal; font-size: 10px; color: #6E6E6E;}\n"+
			"#"+main.streamID+" a[id^=\"item_processing_\"] {color: #DFDF00 !important;}\n"+
			"#"+main.streamID+" a[id^=\"item_failed_\"] {font-weight: bold; font-size: 12px; color: #D70000;}\n"+

			(GM_config.get("colorcode")===true ? "\n"+
 			".section_header_holder {margin-top:0px;}\n" +
			".section_header {font-size:13pt; background:#414141; color:#FFFFFF; margin:0;}\n" +
			".center {text-align:center;}\n" +

			"*[id^=\"stream_story_\"], .itemneutral , .itemneutral div[id$=\"_collapsed\"] {background-color: #E8E8E8;}\n"+
			".itemdone, .itemdone div[id$=\"_collapsed\"] {background-color: #91FF91 !important;}\n"+
			".itemcity, .itemcity div[id$=\"_collapsed\"] {background-color: #6464CC !important;}\n"+
			".itemprocessing, .itemprocessing div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+
			".itemoverlimit, .itemoverlimit div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+		
			".itemfailed, .itemfailed div[id$=\"_collapsed\"] {background-color: #FF7171 !important;}\n"+
			"#"+main.streamID+" a[id^=\"item_\"] {color: #000000 !important;}\n" : "")+

			"#WM_navigation li .item:hover, .item:focus, .item:active {background-color: #EFF2F7;}\n"+
			"#status_WM {text-align: center;color: white; background-color: #91FF91; background-image: -moz-linear-gradient(top,#91FF91,#04CA04); font-weight: bold; font-size: 12px; border-radius: 5px; border:solid #027602 3px;padding:6px;}\n"+
			".float_right { float:right !important;}\n"+
			".identified:after { content: url('http://i53.tinypic.com/2n0j6ds.png'); padding-left:6px; margin-top:2px;}\n"+
			".excluded:after {content: url('http://i51.tinypic.com/fu2stw.png'); padding-left:6px; margin-top:2px;}\n"+

			(GM_config.get("removedone")===true ? "\n"+
			".itemdone, .itemfailed {display: none !important;}" : "")+


			""

		);

		main.updateSettingsValues();

		// another method to speed up - keep about:config clean
		var acc=main.getAccepted(), accTime=main.getAcceptedTime(), timeNow=new Date().getTime(), ageHours=parseInt(main.opts["itemage"]) * 24;
		for(var w in accTime) {
			var accTimew=accTime[w], accw=acc[w];
			for(var k in accTimew) { // loop through the accepted items' times
				if(((timeNow-accTimew[k])/3600000) > ageHours && accw.inArray(k)) {
					accw.splice(accw.inArrayWhere(k), 1); // remove from accepted items array
					delete accTimew[k]; // remove from time object
				}
			}
		}
		var failed=main.getFailed(), failedTime=main.getFailedTime();
		for(var w in failedTime) {
			var failedTimew=failedTime[w], failedw=failed[w];
			for(var k in failedTimew) { // loop through the failed items' times
				if(((timeNow - failedTimew[k])/3600000) > ageHours && failedw.inArray(k)) {
					failedw.splice(failedw.inArrayWhere(k), 1); // remove from failed items array
					delete failedTimew[k]; // remove from time object
				}
			}
		}
		main.setAccepted(acc);
		main.setAcceptedTime(accTime);
		main.setFailed(failed);
		main.setFailedTime(failedTime);
		acc=null; accTime=null; timeNow=null; ageHours=null; failed=null; failedTime=null;

		// add debug status bar to page
		fb.newsFeed.parentNode.insertBefore(main.create("div", {id:"status_WM",textContent:"WallManager 0 requests currently (0 done)", onclick:function(e){
			if(main.boxFull) return;
			main.paused = !main.paused;
			main.pauseClick = true;
			main.pauseCount = main.opts["inputtimeout"] || 15;
			main.status();
		}}),fb.newsFeed);

		//show wiki debug stuff for frontierville
		if (main.opts['showgamesettings']){// add a panel for gamesettings.xml links
			document.body.appendChild(main.create("div", {id:"wmSettingsLinks",style:"position: fixed; bottom: 75px; width: 192px; left: 4px; padding:2px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; border-radius: 5px 5px 5px 5px; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99997; text-align: center;"}));
		}

		//add an entrypoint for sidekicks
		document.body.appendChild(createElement('div',{id:'wmDock',style:'display:none;',onclick:WM.answerDockingDoor}));
			
		//add icons for last known sidekicks
		main.oldGames=getOpt('games');
		main.oldSynGames=getOpt('synGames');

		// listen for key presses to autopause, if enabled
		if(GM_config.get("inputtimeoutenable")) window.addEventListener("keydown", main.keyDownFunc, false);

		// make script run every second, update status bar, and click similar posts links
		runint = window.setInterval(function(e){
			try{
			switch(main.opts['status']) {case true: main.status(); break;}
			window.setTimeout(function(){try{main.run();}catch(e){}},0);
			}catch(e){}
		},1000);

		// add autorefresh if enabled

		if(main.opts["arinterval"] != "off") refto=window.setTimeout(main.refresh, main.refTime);

		// add another shortcut to the config, this time as a link on the page
		var opInt = window.setInterval(WM.addNavTools, 500);

		// pre-load images
		for(var img in imgs) try{new Image().src = imgs[img];}catch(e){}

		//window.setTimeout(fb.fetchPosts,5000);
	}

	debug.print("Script: main initialized",{level:0});
	

	// section for reclaiming memory and stopping memory leaks
	window.addEventListener("beforeunload", function(e) {
		if (runint)window.clearInterval(runint);
		if (refto)window.clearTimeout(refto);
		window.removeEventListener("keydown", main.keyDownFunc, false);
		//close the child tab we made
		if (main.oTab) main.oTab.close();
		if (main.oXML) main.oXML=null; //just to make sure

		//clean up memory
		main=null; GM_config=null; iOp=null; opInt=null; runint=null; GM_addStyle=null; $=null; imgs=null; unsafeWindow=null; version=null; isGM=null; debugFrameSho
		fb=null; selectNodes=null; selectSingleNode=null; deleteNodes=null; countNodes=null;WM=null; retTo=null;
		getIsFF4=null;createElement=null;getPropertyFromElement=null;getTranslation=null;checkBox=null;optionBlock=null;hidden=null;separator=null;inputBox=null;button=null;anchor=null;timeStamp=null;
	}, false);

	debug.print("Script: beforeunload event listener created",{level:0});

	if (main.realURL.startsWith("https://")) debug.print("Warning: You are using FB in secure mode (https). Please read <a href='http://fbwm.wikia.com/wiki/HTTPS' target='_blank'>this</a>.",{level:5});

	// new user recognition
	var newuser = main.getValue(main.gameAcronym+"_newuser", true);
	if(newuser != false) {
		main.message("Welcome to Wall Manager.<br><br>"+
			"<a href=\""+main.scriptHomeURL+"\" target=\"_blank\">Click here</a> to learn proper use of this script.<br><br>"+
		 	"Thank you for choosing "+main.gameAcronym+".<br><br>"+
		 	"The config screen will popup in 30 seconds...");
		window.setTimeout(main.config, 30000);
		main.setValue(main.gameAcronym+"_newuser", false);
	}

	if(GM_config.get("blockads") === true) GM_addStyle("#pymk_hp_box, div[id*=\"_no_ad_ctr\"], .UIStandardFrame_SidebarAds, #sidebar_ads, iframe:not([src*=\"/facebook\"]):not([src*=\"slashkey\"]):not([src*=\"facebook.com\"]):not([src*=\"zynga.com\"]):not([src*=\"myofferpal.com\"]):not([id=\"GM_config\"]):not([src*=\"farmville.com\"]):not([src*=\"yoville.com\"]):not([id=\"upload_iframe\"]), #home_sponsor_nile, div[class*=\"ad_capsule\"], div[class*=\"social_ad\"], div[class*=\"sponsor\"], div[id*=\"sponsor\"], .welcome_banner, #FFN_imBox_Container {display:none !important;}");

	if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePagerAnchor, #contentArea div.uiMorePager {-moz-border-radius: 4px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important;z-index: 9999 !important;}");

	if(main.opts["dropfeedimages"] && !main.opts["displaymode"]==0){
		main.message("Wall Manager<br/>Just a warning: You can no longer 'hide feed images' except in 'display mode: plain'.<br/>Disable messages like this by turning off 'Enable message window' under 'Basic Tech Options'");
	}

	debug.print("Script: Totally initialized",{level:0});


})(); // anonymous function wrapper end


//graph location --- https://graph.facebook.com/me/home?date_format=U
//auth code location --- http://developers.facebook.com/docs/reference/api/
//whole thing together

//https://graph.facebook.com/me/home?date_format=U&access_token=

