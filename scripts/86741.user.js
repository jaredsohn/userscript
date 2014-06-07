// ==UserScript==
// @name           FrontierVille and TreasureIsle Wall Manager(modificado la direccion )
// @description    Manages FrontierVille and TreasureIsle wall posts
// @include        http://www.facebook.com/?ref=home
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0.5
// @copyright      Joe Simmons and Charlie Ewing
// ==/UserScript==


// Based on script built by Joe Simmons in Farmville Wall Manager
// New TI and FrV related script by Charlie Ewing

(function() { 

	var version = "1.0.5"; 

	try {
		var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
		if(unsafeWindow.frameElement != null) return;
	} catch(e) {}

	var imgs = {
		bg : "http://i45.tinypic.com/raq4x3.png",
		logo : "http://i54.tinypic.com/3130mmg.png",
		icon : "http://i56.tinypic.com/s46edh.jpg"
	};

	// Get is Greasemonkey running
	var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');

	// Get ID
	function $(ID,root) {return (root||document).getElementById(ID);}

	Array.prototype.inArray = function(value) {
		for(var i=this.length-1; i>=0; i--) {
			if(this[i]==value) return true;
		}
		return false;
	};

	Array.prototype.inArrayWhere = function(value) {
		for(var i=0,l=this.length; i<l; i++) {
			if(this[i]==value) return i;
		}
		return false;
	};

	String.prototype.find = function(s) {
		return (this.indexOf(s) != -1);
	};

	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	// Add GM_addStyle if we're not in FireFox
	var GM_addStyle = function(css) {
        	var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        	if(head) {
        		style.type = 'text/css';
        		try {style.innerHTML = css} catch(x) {style.innerText = css}
        		head.appendChild(style);
		}
    	};

	// alignCenter by JoeSimmons
	// Instructions: Supply an id string or node element as a first argument
	function alignCenter(e) {
		var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
		if(!window || !node || !node.style) {return;}
		var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
		if(style.display=='none') style.opacity='0';
		if(style.display!='') style.display = '';
		style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
		style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
		style.display = beforeDisplay;
		style.opacity = beforeOpacity;
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
	}

	// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
	// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
	// See script page for syntax examples: http://userscripts.org/scripts/show/51532
	function $g(que, O) {
		if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
		var obj=O||({del:false,type:6,node:document}), r, t,
			idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
		if(idclass_re.test(que)) {
			var s=que.split(' '), r=new Array(), c;
			for(var n=0; n<s.length; n++) {
				switch(s[n].substring(0,1)) {
					case '#': r.push(document.getElementById(s[n].substring(1))); break;
					case '.': c=document.getElementsByClassName(s[n].substring(1));
		  				if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
				}
			}
			if(r.length==1) r=r[0];
		} else if(xp_re.test(que)) {
			r = (obj['doc']||document).evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
			if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
		}
		if(r && obj['del']===true) {
			if(r.nodeType==1) r.parentNode.removeChild(r);
			else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
			else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
		} return r;
	}

	// GM_config by JoeSimmons/sizzlemctwizzle/izzysoft
	var GM_config = {
 		storage: 'GM_config', // This needs to be changed to something unique for localStorage

 		init: function() {
        		// loop through GM_config.init() arguements
			for(var i=0,l=arguments.length,arg; i<l; ++i) {
				arg=arguments[i];
				switch(typeof arg) {
            				case 'object': for(var j in arg) { // could be a callback functions or settings object
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
					GM_config.doSettingValue(settings, stored, i, null, false);
					if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
				}
				GM_config.values = GM_config.passed_values;
				GM_config.settings = settings;
				if (css) GM_config.css.stylish = css;
 		},

 		open: function() {
 			if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
			// Create frame
			document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        		GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
			GM_config.frame.addEventListener('load', function(){
				var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
				obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

				// Add header and title
				frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

				// Append elements
				var anch = frameBody, secNo = 0; // anchor to append elements
				for (var i in settings) {
					var type, field = settings[i], value = obj.values[i];
					if (field.section) {
						anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  			create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  			create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "none")=="none"?"display: none;":""})
				  		)}));
						if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
						secNo++;
					}
					anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
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

 		close: function(save) {
			if(save) {
				var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
				for(f in fields) {
					var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
					if(!field.className.find("separator")) {
						if(typewhite.test(field.type)) type=field.type;
						else type=field.tagName.toLowerCase();
						GM_config.doSave(f, field, type);
						if(kids) for(var kid in kids) {
							var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
							if(typewhite.test(field.type)) type=field.type;
							else type=field.tagName.toLowerCase();
							GM_config.doSave(kid, field, type, f);
						}
					}
				}
                		if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                		GM_config.save();
			}
			if(GM_config.frame) GM_config.remove(GM_config.frame);
			delete GM_config.frame;
        		if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 		},

 		set: function(name,val) {
			GM_config.values[name] = val;
 		},

		get: function(name) {
			return GM_config.values[name];
 		},

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

 		addToFrame : function(field, i, k) {
			var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
			switch(field.type) {
				case 'separator': elem = create("span", {textContent:label, id:'field_'+i, className:'field_label separator'});
					break;
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
					var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
			if(field.kids) {
				var kids=field.kids;
				for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
			}
			return elem;
		},

 		doSave : function(f, field, type, oldf) {
 			var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
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
			}
 		},

 		doSettingValue : function(settings, stored, i, oldi, k) {
			var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
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
 			'.section_header_holder {margin-top:8px;}\n' +
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
 
		toggle : function(e) {
			var node=GM_config.frame.contentDocument.getElementById(e);
			node.style.display=(node.style.display!='none')?'none':'';
			GM_config.setValue(e, node.style.display);
 		},

	}; 

	var main = {
		paused : false,
		pauseClick : false,
		boxFull : false,
		pauseCount : 0,
		openCount : 0,
		reqTO : 30000,
		profile : "",
		acceptedText : "Got this!",
		failText : "Already taken or expired!",
		overLimitText : "Limit reached!",
		acceptStage : 1,

		// Changeable vars for adaptation to other games (ease of use)
		streamID : "contentArea",
		stream : ($("home_stream") || $("pagelet_intentional_stream") || $("contentArea")),
		navID : "navItem",
		navIDnf : "navItem_nf",
		gameID : "201278444497", //game id on facebook
		gameIDFrV : "201278444497", // frontierville
		gameIDTI: "234860566661", // treasure isle
		gameURLpart : "frontierville", // game url folder for apps.facebook.com/HERE/
		gameURLpartFrV : "frontierville",
		gameURLpartTI: "treasureisle",
		whitelistWhenPaused : ",null", // categories separated by commas to be accepted even if gift box is full
		gameMode : "FrV",
		gameName : "FrontierVille", //put game name here before run
		gameNameFrV : "FrontierVille",
		gameNameTI : "TreasureIsle",
		gameAcronym : "WallManager",
		scriptHomeURL : "http://www.facebook.com/",
		gameKeyUrlKeyword : "sendkey=", //put text here before run
		gameKeyUrlKeywordFrV : "sendkey=", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be
		gameKeyUrlKeywordTI : "key=",
		xpQueryTextExcludes : ["Send Thank You Gift", "Send Gift","Send items",  "Fertilize their", "Lend a Hand", "Send Materials", "is looking for something", "wants to send a big", "wants to share", "found some", "has found a", "found a", "found some fuel", "is trying to", "could really use some help", "new FarmVille puppy is hungry", "wants YOU to help", "just completed level", "was working in the stables", "finished growing", "has completed a", "finished a job", "is hosting a barn raising", "is working hard on", "on up to", "Send doggie treats", "Send puppy kibble", "Join their Co-op", "Play FarmVille Now", "Play FarmVille now", "Feed their chickens", "Send Ingredients", "Send Shovels", "Accept"],


		// empty options object for later modification
		opts : {},

		// all regexps are stored here
		whichRegex : /()/, // backup
		whichRegexFrV : /(send|sledge|coin|money|wood|food|brick|chick|goose|peter|loom|experience|xp|energy|hammer|poop|slate|tool|energy|batter|ribbon|cloth|batter|diary|slate|wells|spit|nail|chalk|trough|paint|drill|present|horse|mule|cow|cattle|sheep|goat|pig)/,
		whichRegexTI : /(send|fruit|gem|coin|xp|fragment|bonus|peacock|margay|panther|toucan|sloth|tarantula|seal|dolphin|elephant|unicorn|deer|chinchilla|porcupine|octopus|wrench)/,
		ampRegex : /&amp;/g,
		spaceRegex : /\s+/g,
		keyRegexFrV : null, // will be changed after main is defined - bug
		keyRegexTI : null,
		nRegex : /\n+/g,
		phpRegex : /#\/.*\.php/,
		numberRegex : /\d+/,
		profileRegex : /facebook\.com\/([^?]+)/i,
		postStatusRegex : / (itemdone|itemneutral|itemprocessing|itemfailed|itemoverlimit)/,
		accTextRegex : /(here's a reward|you've received a gift)/,
		failTextRegex : /(oh no|sorry|exceeded your limit|expired|whoa|woah|come back later|had enough help|someone already|only available for|try again|no room|select a free gift|slow down|thanks for trying to help)/,
		accURLRegex : /(give_home|not_owned)/,
		boxFullRegex : /(you have exceeded your limit|gift box is full|exceeded)/,
		emptyRegex : /\s*/g,
		gameUrlPHPPage : /index\.php/,

		// all texts for accepted items
		accText : {
			FrVxp : "Got this free XP!",
			FrVfood: "Got this food!",
			FrVsend: "Sent this item!",
			FrVwood: "Got this wood!",
			FrVcoin: "Got these coins!",
			FrVrep: "Got some love!",
			FrVtool: "Got some tools!",
			FrVenergy: "Got this meal!",

			FrVgoose: "Adopted this goose!",
			FrVchick: "Adopted this chick!",
			FrVcow: "Adopted this cow!",
			FrVox: "Adopted this ox!",
			FrVsheep: "Adopted this sheep!",
			FrVgoat: "Adopted this goat!",
			FrVpig: "Adopted this pig!",
			FrVmule: "Adopted this donkey!",
			FrVhorse: "Adopted this horse!",

			FrVhammer: "Got this hammer!",
			FrVnail: "Got this nail!",
			FrVdrill: "Got this drill!",
			FrVpaint: "Got this paint!",
			FrVbrick: "Got this brick!",

			FrVslate: "Got this slate!",
			FrVpens: "Got this ink pen!",
			FrVwells: "Got this ink well!",
			FrVchalk: "Got this chalk!",
			FrVspit: "Got this spitball!",

			FrVgroundhog : "Got this collectible!",
			FrVpoop: "Got this poop!", 
			FrVdiary: "Got this diary!",
			FrVrandomcol: "Got this collectible!",
			FrVapplepie: "Got some pie!",
			FrVribeye: "Got this ribeye!",
			FrVgoatmilk: "Got this goat milk!",

			FrVshovel : "Got this shovel!",
			FrVbarbwire : "Got this fence!",
			FrVtrough: "Got this trough!",
			FrVloom: "Got this loom!",
			FrVappletree: "Got this apple sapling!",
			FrVbucket: "Got this bucket!",
			FrVoaktree: "Got this sapling!",
			FrVpinetree: "Got this sapling!",
			FrVcherrytree: "Got this cherry sapling!",
			FrVsledge: "Got a sledge hammer!",

			FrVfeather: "Got these feathers!",
			FrVbatter: "Got this batter!",
			FrVribbon: "Got this ribbon!",	
			FrVcloth: "Got some cloth!",
			FrVpeter: "Got some saltpeter!",
			FrVpresent: "Got this present!",
		


			TIxp : "Got this free XP!",
			TIfruit: "Got this energy!",
			TIbonus: "Got mystery bonus!",
			TIcoin: "Got some free coins!",
			TIsend: "Sent this item!",

			TIgemred: "Got a red gem!",
			TIgemgreen: "Got a green gem!",
			TIgemorange: "Got an orange gem!",
			TIgemblue: "Got a blue gem!",
			TIgempurple: "Got a purple gem!",
			TIgemany: "Got a mystery gem!",

			TIpeacock: "Saved this peacock!",
			TIredpanda: "Saved this red panda!",
			TIpanther: "Saved this panther!",
			TItoucan: "Saved this toucan!",
			TImargay: "Saved this margay!",
			TIpanda: "Saved this panda!",
			TImonkey: "Saved this monkey!",
			TIiguana: "Saved this iguana!",
			TIsloth: "Saved this sloth!",
			TIseal: "Saved this seal!",
			TIdolphin: "Saved this dolphin!",
			TIelephant: "Saved this elephant!",
			TIunicorn: "Saved this unicorn!",
			TIdeer: "Saved this deer!",
			TIoctopus: "Saved this octopus!",
			TIporcupine: "Saved this porcupine!",
			TIgirraffe: "Saved this girraffe!",
			TIchinchilla: "Saved this chinchilla!",

			TIphoenixfeather: "Got this feather!",
			TIgoldticket: "Got this ticket!",
			TIwrench: "Got this monkey wrench!",
			TIfragment: "Got this map fragment!"
			
		},

		collstatusText : {
			Accepted : "Accepted ",
			Refused : "Refused ",
			Got : "Got "
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

		// click something
		click : function(e, type) {
			if(!e && typeof e=='string') e=document.getElementById(e);
			if(!e) return;
			var evObj = e.ownerDocument.createEvent('MouseEvents');
			evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);
			e.dispatchEvent(evObj);
		},

		// remove something from the page
		remove : function(e) {
			var node = (typeof e=='string') ? $(e) : e;
			if(node) node.parentNode.removeChild(node);
		},

		keyDownFunc : function(e) {
			if(",9,18,33,34,35,36,37,38,39,40,116".find(","+e.keyCode) || (main.paused && main.pauseClick)) return;
			main.paused=true;
			main.pauseClick=false;
			main.pauseCount = main.opts["inputtimeout"] || 15;
			main.status();
		},

		// get what type of item it is
		which : function(e) {
			var w, text=e.parentNode.parentNode.parentNode.textContent.replace(main.nRegex,""), lText = e.textContent.toLowerCase(),
				walltowall = $g(".//ancestor::*[contains(@id, 'stream_story_')]//a[contains(., 'Wall-to-Wall') and contains(@href, 'walltowall')]", {node:e, type:9});

			//get the game from which the bonus belongs
			var gameModeNow="";
			if(e.href.find("/treasureisle/")){
				gameModeNow="TI";
				w=e.textContent.toLowerCase().match(main.whichRegexTI);
			}
			else if(e.href.find("/frontierville/")){
				gameModeNow="FrV";
				w=e.textContent.toLowerCase().match(main.whichRegexFrV);			
			}

			w = (w!=null) ? w[1].replace(main.spaceRegex,"") : "none";

			// one means the other
			if (w==="experience") w="xp";
			if (w==="money") w="coin";
			if (w==="cattle") w="cow";

			switch(lText) {

				// FrontierVille Specific Text
				case "have some lunch": w="energy"; break;
				case "grab ribeye": w="ribeye"; break;
				case "downy feathers, please": w="feather"; break;
				case "get a free decoration": w="bucket"; break;
				case "get prairie pile": w="poop"; break;
				case "get that love": w="rep"; break;
				case "claim feast": w="food"; break;
				case "get a prairie pile": w="poop"; break;
				case "get some grub": w="food"; break;
				case "get a fruit tree": w="cherrytree"; break;
				case "get apple trees": w="appletree"; break;
				case "i'd like some pie": w="applepie"; break;
				case "gimme them piglets": w="pig"; break;
				case "i want a pine sapling": w="pinetree"; break;
				case "collect breakfast": w="energy"; break;
				case "give me some cattle": w="cow"; break;
				case "get barbed wire": w="barbwire"; break;
				case "gimme some groundhog bits": w="groundhog"; break;
				case "get collectible": w="randomcol"; break;
				case "get random item": w="randomcol"; break;
				case "flock me i want sheep": w="sheep"; break;
				case "get ink pen": w="pens"; break;
				case "get goat milk": w="goatmilk"; break;



				// TreasureIsle Specific Text
				case "gimme, gimme more": w="xp"; break;
				case "get free bananas": w="fruit"; break;
				case "get free mangoes": w="fruit"; break;
				case "grab some of that power": w="xp"; break;
				case "get free coconuts": w="fruit"; break;
				case "get free dragonfruit": w="fruit"; break;
				case "get free energy capsule": w="fruit"; break;
				case "help out": w="send"; break;
				case "get free pineapples": w="fruit"; break;
				case "get some love": w="xp"; break;
				case "collect phoenix feather": w="phoenixfeather"; break;
				case "save a peacock": w="peacock"; break;
				case "claim reward": w="bonus"; break;
				case " save the toucan": w="toucan"; break;
				case " save the red panda": w="redpanda"; break;
				case " save the panther": w="panther"; break;
				case "get your gems": w="gemany"; break;
				case "claim your treasure": w="bonus"; break;
				case "collect golden ticket": w="goldticket"; break;
				case "collect banana bunch": w="fruit"; break;
			}
			
				// TreasureIsle Gem Color ??
			if (w==="gem"){
				if(text.find("Blue Gem")) w="gemblue"; 
				else if (text.find("Red Gem")) w="gemred"; 
				else if (text.find("Orange Gem")) w="gemorange"; 
				else if (text.find("Purple Gem")) w="gempurple"; 
				else if (text.find("Green Gem")) w="gemgreen"; 
			} 

			return gameModeNow + w;
		},

		failedItem : function(d, t) {
			return main.failTextRegex.test(t.toLowerCase());
		},

		gotItem : function(d, t) {
			return (main.accTextRegex.test(t.toLowerCase()) || main.accURLRegex.test(d.URL.toLowerCase()));
		},

		checkCollectible : function(d, t, rx) {
    			var collmatch = t.toLowerCase().match(rx);
    			return ((collmatch != "null" && collmatch != null) ? "collectible" + collmatch[1].replace(main.spaceRegex,"") : "")
		},

		// function to debug stuff. displays in a big white textarea box
		debug : function(s) {
			var d=$("debugT");
			if(!d) document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
			else d.innerHTML+="\n\n\n\n"+s;
			if(d.style.display=="none") d.style.display="";
		},

		// get the key for the url
		getKey : function(b) {
			//if b is an href then look for game type
			if(b.find("/frontierville/")){
				return b.match(main.keyRegexFrV)[1];
			}
			else if(b.find("/treasureisle/")){
				return b.match(main.keyRegexTI)[1];
			}
		},

		storeTypes : /^(true|false|\d+)$/,

		getValue : (isGM ? GM_getValue : (function(name, def) {
			var s=localStorage.getItem(name), val = ((s=="undefined" || s=="null") ? def : s);
			if(typeof val == "string" && main.storeTypes.test(val)) val = ((new Function("return "+val+";"))());
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
		},

		// get the accepted items' times they were accepted
		getFailedTime : function() {
			return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile, "({})"))+";"))();
		},

		// save the accepted items' times they were accepted
		setFailedTime : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_time_"+main.profile;
			main.setValue(store,val);
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
		},

		// get the accepted items
		getFailed : function() {
			return (new Function("return "+main.getValue(main.gameAcronym.toLowerCase()+"_failed_"+main.profile, "({})")+";"))();
		},

		// save the accepted items
		setFailed : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_failed_"+main.profile;
			main.setValue(store,val);
		},

		// get the detail collectible 
		getDetlColl : function() {
			return (new Function("return "+(main.getValue(main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile, "({})"))+";"))();
		},

		// save the detail collectible
		setDetlColl : function(e) {
			var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_DetlColl_"+main.profile;
			main.setValue(store,val);
		},

		// get number of current requests
		get currReqs() {
			return $g("count(.//iframe)",{node:$("silent_req_holder"),type:1});
		},

		toHomepage : function() { window.location.replace(main.realURL); },

		toFilterpageFrV : function() { 
			window.location.replace("http://www.facebook.com/home.php?filter=app_"+main.gameIDFrV+"&show_hidden=true&ignore_self=true&sk=lf"); 
		},
		toFilterpageTI : function() { 
			window.location.replace("http://www.facebook.com/home.php?filter=app_"+main.gameIDTI+"&show_hidden=true&ignore_self=true&sk=lf"); 
		},

		colorCode : function(item, type) {
			try {
				switch(main.opts["colorcode"]) {
					case true:
						var div = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]", {type:9, node:item});
						if(div) div.className = div.getAttribute("class").replace(main.postStatusRegex, "") + " item"+(type || "neutral");
						break;
				}
			} catch(e) {alert(e);}
		},

		// generate a refresh time
		get refTime() {
			var t=2;
			switch(GM_config.get("arinterval")) {
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
			var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;
			if(hash!="" && main.phpRegex.test(hash)) u=protocol+host+hash.split("#")[1];
			else if(hash!="" && hash.find("#")) u=u.split("#")[0];
			return u;
		},

		// show config screen
		config : function() {
			if(main.currReqs == 0) { // if the # of requests are at 0
				GM_config.open(); // open the options menu
				try{ $(main.gameAcronym.toLowerCase()+"_msgbox").style.display = "none"; }catch(e){} // hide msg box
			}
			else {
				window.setTimeout(main.config, 1000); // check in 1 second
				main.message("Please wait... finishing requests..."); // show pls wait msg
			}
		},

		removeDone : function() {
			var done = $g(".//a[(contains(@href,'album.php?aid=') and contains(.,'FarmVille Photos')) or (contains(@href,'"+main.gameURLpart+"') and (starts-with(@id,'item_done_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_') or contains(.,'"+main.xpQueryTextExcludes.join("') or contains(.,'")+"'))) or (contains(@href,'zyn.ga/')) or (@class='actorName' and .='FrontierVille')]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id, '_collapsed'))]", {node:main.stream});
			for(var i=0,len=done.snapshotLength; i<len; i++) if(!$g(".//span[starts-with(@class,'UIActionLinks')]//a[starts-with(@id,'item_processing_')] | .//*[starts-with(@id,'stream_story_') and contains(@id,'_collapsed')]", {type:9, node:done.snapshotItem(i)})) main.remove(done.snapshotItem(i).id);
		},

		// auto click "like" buttons if enabled
		like : function(id) {
			var like=$g("//a[contains(@id,'_"+id+"')]/ancestor::span/button[@name='like' and @type='submit']", {type:9});
			if(like) like.click();
		},

		expand : function() {
			var posts=$g("count(.//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"')])", {node:main.stream, type:1}),
				more=$g("//a[contains(.,'Older Posts') and @class and @rel='async-post' and not(contains(@class,'async_saving'))]", {type:9}),
				min = main.opts["minposts"];
			switch(min != "off" && more != null) {
				case true: if(posts < parseInt(min)) main.click(more);
		   		else main.opts["minposts"] = "off"; break;
			}
		},

		similarPosts : function() {
			// Auto click "show x similar posts" links
			var sp = $g(".//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=') and not(starts-with(@id, 'similar_post_'))] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS') and not(starts-with(@id, 'similar_post_'))]", {node:main.stream, type:9}),
				posts = $g("count(.//*[starts-with(@id,'stream_story_') and contains(@class,'"+main.gameID+"') and not(contains(@id,'_collapsed'))])", {node:main.stream, type:1}),
				max = main.opts["maxposts"], maxC = parseInt(max) || 9999;
			if(sp && (max == "off" || (max != "off" && posts < maxC))) {
				if(max=="off" || ((parseInt(sp.textContent.match(main.numberRegex)[0]) + posts) < maxC)) {
					sp.setAttribute("id", "similar_post_"+sp.getAttribute("ajaxify").split("stream_story_")[1].split("&")[0]);
					main.click(sp);
					return;
				} else return;
			}
		},

		// refresh function. be sure to only do it if the config isn't up, it isn't paused, and requests are finished
		refresh : function() {
			if(main.currReqs==0 && !$("GM_config") && !main.paused) {
				var i=0, refint=window.setInterval(function() {
					if(i >= 12 && main.currReqs==0) {
						window.clearInterval(runint);
						window.clearInterval(refint);
						if (main.opts["filteronlyFrV"]) main.toFilterpageFrV(); // if filter only option is enabled
						else if (main.opts["filteronlyTI"]) main.toFilterpageTI(); // if filter only option is enabled
						else main.toHomepage(); // if filter only option is disabled or un-defined
					}
					else if(i < 12 && main.currReqs==0) i++;
					else i=0;
				}, 250);
			} else window.setTimeout(main.refresh, (main.currReqs == 0 ? 1 : main.currReqs)*1000);
		},

		dropItem : function(key) {
			main.remove(key);

			var item = $g(".//a[contains(@id,'"+key+"')]", {type:9, node:main.stream});
			if(item) {
				item.setAttribute("id", "item_skip_"+key);
				main.colorCode(item, "neutral");
			}
		},

		// update debug status box
		status : function() {
			switch(main.pauseCount) {case 0: if(!main.pauseClick) main.paused=false; break;}
			var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.currReqs+" requests currently ("+main.openCount+" done)":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
			switch(document.title != statusText) {case true: document.title=statusText; break;}
			switch($("status").textContent != statusText) {case true: $("status").textContent = statusText; break;}
			if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
		},

		// display a message in the middle of the screen
		message : function(t) {
			if(GM_config.get("newuserhints") === false) return;
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
		},

		goAccepted : function(w, item, SpecificCollectible, key) {
			var accTime=main.getAcceptedTime(),  acc=main.getAccepted(), DetlColl=main.getDetlColl(), DetlCollectible = "";

			item.setAttribute("id", "item_done_"+key);
			item.textContent = (DetlCollectible == "") ? (main.accText[w] || main.acceptedText) : (main.collstatusText[DetlCollectible.split(";")[0]] || main.collstatusText["Got"]) + (main.accText[DetlCollectible.split(";")[1]] || main.accText[w] || main.accText["GenericCollectible"]);
			main.colorCode(item, "done");
			main.openCount++;
			accTime[w][key] = new Date().getTime();
			main.setAcceptedTime(accTime);
			if (SpecificCollectible != "") {
				DetlColl[w][key] = SpecificCollectible;
				main.setDetlColl(DetlColl);
			}
			acc[w].push(key);
			main.setAccepted(acc);
		},

		onFrameLoad : function(e) {
			var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), failed=main.getFailed(), failedTime=main.getFailedTime(), DetlColl=main.getDetlColl(), item=$g("//a[contains(@id,'"+key+"')]", {type:9});
			var gameModeNow, text, sgameID, sgameSite, loadgame;
			if(item.href.find("/frontierville/")){
				gameModeNow="FrV";
				sgameID=main.gameIDFrV; 
				sgameSite="http://apps.facebook.com/frontierville/";
			}
			else if(item.href.find("/treasureisle")){
				gameModeNow="TI";
				sgameID=main.gameIDTI;
				sgameSite="http://apps.facebook.com/treasureisle/";
			}

			// get bare text section
			text=$("app_content_"+sgameID, doc);
			if(text) text=$g(".//div[@class='giftLimit'] | .//div[@class='main_giftConfirm_cont']/h3", {node:text,doc:doc,type:9}) || text || doc.body;
			try { text = text.textContent; } catch(e) {}
			if (!text) text="";
			if(!doc || !item || $("errorPageContainer", doc)) {
				main.dropItem(key); return;
			}

			var loadgame = (doc.URL.toLowerCase()===sgameSite);

			//start reading information
			var failedItem = main.failedItem(doc, text),
			gotItem = main.gotItem(doc, text);
			var DetlCollectible = "", SpecificCollectible = "", trytoget = false;

			var yes, frmNum, elemNum;
			switch(gameModeNow){
				case "FrV":
					//determine which form and which element is our yes button
					for(frm=0;frm<doc.forms.length;frm++){
						for(elem=0;elem<doc.forms[frm].elements.length;elem++){
							var objElem = doc.forms[frm].elements[elem];
							if (objElem.value==="Yes" && objElem.type==="submit"){
								yes=objElem;
								frmNum=frm; elemNum=elem;	
							}
						}
					}
					break;
				case "TI":
					gotItem=true;
					yes=$g("//a[contains(@href,'http://apps.facebook.com/treasureisle/reward.php?_c=reward')]", {doc:doc, node:doc, type:9});
					break;
			}

			// click "yes" to accept it
			var debugFail=false;
			if(gotItem==true && (yes)) {
				trytoget = true;
				$(key).removeEventListener("load", main.onFrameLoad, false);

				switch(gameModeNow){	
					case "FrV":
						var objWindow=window.open(doc.URL,key,'width=1,height=1');
						if (objWindow == null){
							main.debug("Can't find window object. Please make sure your browser is allowing pop-ups from this site.");
							debugFail=true;
							break;
						}

						var intv = window.setInterval(function() {
							//need to wait for the window to open

							yes=objWindow.document.forms[frmNum].elements[elemNum];
							if (yes){
								window.clearInterval(intv);
								yes.click();	
								var intv2 = window.setInterval(function(e) {
									//need to wait a few seconds for the bonus to accept
									var newURL=objWindow.document.URL;
									var newDocText=objWindow.document.body.innerHTML.toLowerCase();
									if (newURL==="http://apps.facebook.com/frontierville/"){
										objWindow.close();
										main.goAccepted(w,item,SpecificCollectible,key);
										main.remove(key);
										window.clearInterval(intv2);
									}
									else if (newDocText.find("sorry, pardner! you've collected all the")){
										//player still under restriction for collect/send @30/50
										//shut down now
										objWindow.close();
										item.setAttribute("id", "item_overlimit_"+key);		
										item.textContent = main.overLimitText;
										main.colorCode(item, "overlimit");main.remove(key);
										window.clearInterval(intv2);
									}
								}, 900);
							}
						}, 100);
						break;

					case "TI":
						gotItem=false; //not yet known, dont press like
						var objWindow=window.open(yes.href,key,'width=1,height=1');
						if (objWindow == null){
							main.debug("Can't find window object. Please make sure your browser is allowing pop-ups from this site.");
							debugFail=true;
							break;
						}

						var intv2 =window.setInterval(function(e) {
							//need to wait a few seconds for the bonus to accept
							//remember that TI did not tell us if an item was not available UNTIL this point

							var TIdocText=objWindow.document.body.innerHTML;
							var TIconfirm=TIdocText.find("giftConfirm_img");
							var TIfail=TIdocText.find("<h1>Oh no!</h1>");

							if(TIconfirm){
								objWindow.close();
								if(main.opts["autolike"]===true) main.like(key);
					
								main.goAccepted(w,item,SpecificCollectible,key);
								main.remove(key);
								window.clearInterval(intv2);
							}
							else if(TIfail){
								objWindow.close();
					
								item.setAttribute("id", "item_failed_"+key);
								item.textContent = main.failText;
								main.colorCode(item, "failed");
								main.openCount++;
								failedTime[w][key] = new Date().getTime();
								main.setFailedTime(failedTime);
								failed[w].push(key);
								main.setFailed(failed);

								window.clearInterval(intv2);
								main.remove(key);
							}
						}, 1000);
						break;
				}
			}

			// auto click "like" if enabled
			if(main.opts["autolike"]===true && (gotItem===true)) main.like(key);

			if(trytoget === false) {
				switch(loadgame===true || gotItem===true || doc.URL.find("gifts.php?giftRecipient=")) {
					case true:
		   				main.goAccepted(w, item, SpecificCollectible, key);
		   				main.colorCode(item, "done");
		   				break;
					case false:
						item.setAttribute("id", "item_failed_"+key);
						item.textContent = main.failText;
						main.colorCode(item, "failed");
						main.openCount++;
						failedTime[w][key] = new Date().getTime();
						main.setFailedTime(failedTime);
						failed[w].push(key);
						main.setFailed(failed);
						break;
				}
			}

			//remove iframe on failure
			switch(debugFail===true || loadgame===true || failedItem===true || (failedItem===false && gotItem===false && loadgame===false) || doc.URL.find("gifts.php?giftRecipient=")) {
				case true: main.remove(key); break;
			}


			if(main.opts["autostop"]===true && (doc.URL.find("max_gift") || main.boxFullRegex.test(text))) {
				// auto-pause when signal received of a full gift box
				main.boxFull =  true;
				main.pauseClick = true;
				main.paused = true;
				$("status").style.backgroundColor = "#FF0000";
				$g("//div[@id='silent_req_holder']/iframe", {del:true});
			}
		},

		// load an item url
		open : function(url, key, w) {
			// make sure to stay under the gift box limit but still get all items that don't go into the gift box
			if((main.paused===true && !(main.whitelistWhenPaused.find(","+w))) || main.currReqs >= main.opts["maxrequests"]) return;
			var item = $g(".//a[contains(@id,'"+key+"')]", {type:9, node:main.stream});
			item.setAttribute("id", "item_processing_"+key);
			main.colorCode(item, "processing");
			$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"height:100%; width:100%; z-index:9995; border:0;", onload:main.onFrameLoad}));
			window.setTimeout(main.dropItem, main.reqTO, key);
		},




		// core function. this loops through posts and loads them
		run : function(sMode) {
			
			if($("GM_config") || (main.opts["removedone"]===false && main.currReqs >= main.opts["maxrequests"])) return;
			var wallposts, accText=main.accText;
			wallposts=$g(".//span[starts-with(@class,'UIActionLinks')]/a[contains(@href,'"+main.gameURLpartFrV+"') and not(starts-with(@id,'item_done_')) and not(starts-with(@id,'item_failed_')) and not(starts-with(@id,'item_processing_')) and not(starts-with(@id,'item_skip_')) and contains(@href,'"+main.gameKeyUrlKeywordFrV+"') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))] | .//span[starts-with(@class,'UIActionLinks')]/a[contains(@href,'"+main.gameURLpartTI+"') and not(starts-with(@id,'item_done_')) and not(starts-with(@id,'item_failed_')) and not(starts-with(@id,'item_processing_')) and not(starts-with(@id,'item_skip_')) and contains(@href,'"+main.gameKeyUrlKeywordTI+"') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:main.stream});

			var opts=main.opts, open=main.open, getKey=main.getKey,
				which=main.which,
				DetlColl=main.getDetlColl(), collstatusText=main.collstatusText,
				acc=main.getAccepted(), accTime=main.getAcceptedTime(),
				failed=main.getFailed(), failedTime=main.getFailedTime(),
				profileRegex = main.profileRegex, profile=main.profile;
				
			// loop through and grab stuff
			var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
			if(len > 0) {
				do {
					var item=wallposts.snapshotItem(i), key = getKey(item.href), w = which(item), coll=w.startsWith("collectible");
					if(w != "none") {
						try {
							if(!acc[w]) {
								acc[w] = new Array();
								main.setAccepted(acc);
							}
							if(!accTime[w]) {
								accTime[w] = {};
								main.setAcceptedTime(accTime);
							}
							if(!DetlColl[w]) {
								DetlColl[w] = {};
								main.setDetlColl(DetlColl);
							}
							if(!failed[w]) {
								failed[w] = new Array();
								main.setFailed(failed);
							}
							if(!failedTime[w]) {
								failedTime[w] = {};
								main.setFailedTime(failedTime);
							}
						} catch(e) {
							if(acc[w] == "undefined") {
								acc[w] = new Array();
								main.setAccepted(acc);
							}
							if(accTime[w] == "undefined") {
								accTime[w] = {};
								main.setAcceptedTime(accTime);
							}
							if(DetlColl[w] == "undefined") {
								DetlColl[w] = {};
								main.setDetlColl(DetlColl);
							}
							if(failed[w] == "undefined") {
								failed[w] = new Array();
								main.setFailed(failed);
							}
							if(failedTime[w] == "undefined") {
								failedTime[w] = {};
								main.setFailedTime(failedTime);
							}
						}

						if(item.href.find("#58")){
							main.debug("what is this #58 all about?" + item.href);
							if(item.href.find("/frontierville/")){
								item.href = "http://apps.facebook.com/frontierville//tracks.php?" + item.href.split("tracks.php?")[1];
							}
							else if(item.href.find("/treasureisle/")){
								item.href = "http://apps.facebook.com/treasureisle/tracks.php?" + item.href.split("tracks.php?")[1];
							}
						} 
						item.setAttribute("id", "item_"+key);
						item.setAttribute("title", item.textContent);
						var own = $g(".//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//a[@class='actorName' and @href] | .//ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id,'_collapsed'))]//span[@class='actorName']/a[@href]", {type:9, node:item});
						if((own.href.find("id=") ? own.href.split("id=")[1].split("&")[0] : unescape(own.href).match(profileRegex)[1]) != profile) {
							main.colorCode(item, "neutral");
							switch(acc[w].inArray(key)) {
								case false: if(failed[w].inArray(key)) {
										main.colorCode(item, "failed");
										item.textContent = main.failText;
										item.setAttribute("id", "item_failed_"+key);
									} else if(!$(key)) {
										switch(w) {
											default: switch(opts[w] === true) {
												case true: 
													if(coll===false || (coll===true && opts["collectible"]===true)) open(item.href, key, w);
													else item.setAttribute("id", "item_skip_"+key); 
													break;
												case false: 
													item.setAttribute("id", "item_skip_"+key); 
													break;
											}
										}
									}
									break;
								case true: main.colorCode(item, "done");
		   							var DetlCollectible = (coll==true) ? (DetlColl[w][key] || "Got;" + w) : "";
									item.textContent = (DetlCollectible == "") ? (accText[w] || main.acceptedText) : ((collstatusText[DetlCollectible.split(";")[0]] || collstatusText["Got"]) + (accText[DetlCollectible.split(";")[1]] || accText[w] || accText["GenericCollectible"])); // change text
		   							item.setAttribute("id", "item_done_"+key); // add id so it can be styled if wanted
		   							break;
							} 
						} else item.setAttribute("id", "item_skip_"+key); // own profile
					} else item.setAttribute("id", "item_skip_"+key); // w != "none"
				} while (++i < len);
			} // if(len > 0)

			switch(main.opts["removedone"] == true) {case true: main.removeDone(); break;}
		}
	};



	main.keyRegexFrV = new RegExp("[&?](?:amp;)?"+main.gameKeyUrlKeywordFrV+"([0-9a-zA-Z]+)", "i");
	main.keyRegexTI = new RegExp("[&?](?:amp;)?"+main.gameKeyUrlKeywordTI+"([0-9a-zA-Z]+)", "i");


	if($(main.navIDnf) || $("pagelet_navigation")) { // run script if on homepage

	// pre-load the config
	GM_config.init("<img src='"+imgs.logo+"'> v"+version, {

		TIxp : {
			section : [
				"TreasureIsle Manager Options"
			],
			label : "Get free xp?",
			type: "checkbox",
			"default" : true,
			kids : {
				TIcoin: {
					label : "Coins",
					type : "checkbox",
					"default" : true
				},
				TIfruit: {
					label : "Fruit/Energy",
					type : "checkbox",
					"default" : true
				},
				TIbonus: {
					label : "Mystery Gifts",
					type : "checkbox",
					"default" : true
				}
			}
		},
		TIhelpseparator : {
			label : "Help Friends",
			type : "separator"
		},


		TIsend : {
			label : "Send ALL gifts on give item links?",
			type : "checkbox",
			"default" : true
		},
	
		TIkeyitemsseparator : {
			label : "Get Key Items",
			type : "separator"
		},


		TIphoenixfeather : {
			label : "Phoenix Feather",
			type : "checkbox",
			"default" : true,
			kids : {
				TIfragment: {
					label : "Map Fragment",
					type : "checkbox",
					"default" : false
				},
				TIgoldticket: {
					label : "Golden Ticket",
					type : "checkbox",
					"default" : true
				},
				TIwrench: {
					label : "Monkey Wrench",
					type : "checkbox",
					"default" : true
				}	
			}	
		},
		TIgemsseparator : {
			label : "Get Gems",
			type : "separator"
		},

		TIgemred : {
			label : "Red",
			type : "checkbox",
			"default" : true,
			kids : {
				TIgemblue: {
					label : "Blue",
					type : "checkbox",
					"default" : true
				},
				TIgemorange: {
					label : "Orange",
					type : "checkbox",
					"default" : true
				},
				TIgempurple: {
					label : "Purple",
					type : "checkbox",
					"default" : true
				},
				TIgemgreen: {
					label : "Green",
					type : "checkbox",
					"default" : true
				},	
				TIgemany: {
					label : "Random Gems",
					type : "checkbox",
					"default" : true
				}	
			}	
		},
		tiadoptseparator : {
			label : "Adopt Animals",
			type : "separator"
		},


		TIpeacock : {
			label : "Peacock",
			type : "checkbox",
			"default" : true,
			kids : {
				TItarantula: {
					label : "Tarantula",
					type : "checkbox",
					"default" : true
				},
				TIpanda: {
					label : "Panda",
					type : "checkbox",
					"default" : true
				},
				TIsloth: {
					label : "Sloth",
					type : "checkbox",
					"default" : true
				},
				TIiguana: {
					label : "Iguana",
					type : "checkbox",
					"default" : true
				},
				TImonkey: {
					label : "Monkey",
					type : "checkbox",
					"default" : true
				},
				TItoucan: {
					label : "Toucan",
					type : "checkbox",
					"default" : true
				},
				TIdolphin: {
					label : "Dolphin",
					type : "checkbox",
					"default" : true
				},
				TIseal: {
					label : "Seal",
					type : "checkbox",
					"default" : true
				},
				TIredpanda: {
					label : "Red Panda",
					type : "checkbox",
					"default" : true
				},
				TImargay: {
					label : "Margay",
					type : "checkbox",
					"default" : true
				},
				TIpanther: {
					label : "Panther",
					type : "checkbox",
					"default" : true
				},
				TIporcupine: {
					label : "Porcupine",
					type : "checkbox",
					"default" : true
				},
				TIgirraffe: {
					label : "Girraffe",
					type : "checkbox",
					"default" : true
				},
				TIdeer: {
					label : "Deer",
					type : "checkbox",
					"default" : true
				},
				TIunicorn: {
					label : "Unicorn",
					type : "checkbox",
					"default" : true
				},
				TIelephant: {
					label : "Elephant",
					type : "checkbox",
					"default" : true
				},
				TIchinchilla: {
					label : "Chinchilla",
					type : "checkbox",
					"default" : true
				},
				TIoctopus: {
					label : "Octopus",
					type : "checkbox",
					"default" : true
				}	
			}	
		},

		FrVxp : {
			section : ["Frontierville Manager Options"],
			label : "Get free xp?",
			type: "checkbox",
			"default" : true,
			kids : {
				FrVrep: {
					label : "Reputation",
					type : "checkbox",
					"default" : true
				},		
				FrVfood : {
					label : "Food",
					type : "checkbox",
					"default" : true
				},
				FrVenergy: {
					label : "Energy/Meals",
					type : "checkbox",
					"default" : true
				},
				FrVwood: {
					label : "Wood",
					type : "checkbox",
					"default" : true
				},
				FrVcoin: {
					label : "Coins",
					type : "checkbox",
					"default" : true
				},
				FrVtool: {
					label : "Tools",
					type : "checkbox",
					"default" : false
				}
			}
		},


		helpseparator : {
			label : "Help Friends",
			type : "separator"
		},


		FrVsend : {
			label : "Send ALL gifts on give item links?",
			type : "checkbox",
			"default" : true
		},

		animalseparator : {
			label : "Get Livestock",
			type : "separator"
		},
		FrVchick : {
			label : "Chickens",
			type: "checkbox",
			"default" : true,
			kids : {
				FrVgoose : {
					label : "Geese",
					type: "checkbox",
					"default" : true
				},
				FrVpig: {
					label : "Pigs",
					type: "checkbox",
					"default" : true
				},
				FrVcow: {
					label : "Cows",
					type: "checkbox",
					"default" : true
				},
				FrVox: {
					label : "Oxen",
					type: "checkbox",
					"default" : true
				},
				FrVsheep: {
					label : "Sheep",
					type: "checkbox",
					"default" : true
				},
				FrVgoat: {
					label : "Goats",
					type: "checkbox",
					"default" : true
				},
				FrVmule: {
					label : "Mules",
					type: "checkbox",
					"default" : true
				},
				FrVhorse: {
					label : "Horses",
					type: "checkbox",
					"default" : true
				}
			}
		},
		collectseparator : {
			label : "Get Collection Items",
			type : "separator"
		},
		FrVgroundhog : {
			label : "Groundhog",
			type : "checkbox",
			"default" : true,
			kids : {
				FrVpoop: {
					label : "Manure",
					type: "checkbox",
					"default" : true
				},
				FrVgoatmilk: {
					label : "Goat Milk",
					type: "checkbox",
					"default" : true
				},
				FrVribeye: {
					label : "Ribeye",
					type: "checkbox",
					"default" : true
				},
				FrVapplepie: {
					label : "Apple Pie",
					type: "checkbox",
					"default" : true
				},
				FrVdiary: {
					label : "Diary",
					type: "checkbox",
					"default" : true
				},
				FrVrandomcol: {
					label : "Random Collectibles",
					type: "checkbox",
					"default" : true
				}
			}
		},

		specialseparator : {
			label : "Get Craft Items",
			type : "separator"
		},
		FrVribbon : {
			label : "Ribbon",
			type: "checkbox",
			"default" : true,
			kids : {
				FrVfeather: {
					label : "Downy Feathers",
					type: "checkbox",
					"default" : false
				},
				FrVbatter: {
					label : "Batter",
					type: "checkbox",
					"default" : false
				},
				FrVpeter: {
					label : "Salt Peter",
					type: "checkbox",
					"default" : true
				},
				FrVpresent: {
					label : "Salt Peter",
					type: "checkbox",
					"default" : true
				},
				FrVcloth: {
					label : "Cloth",
					type: "checkbox",
					"default" : false
				}
			}
		},

		buildseparator : {
			label : "Get Building Materials",
			type : "separator"
		},
		FrVbrick : {
			label : "Bricks",
			type: "checkbox",
			"default" : true,
			kids : {
				FrVnail : {
					label : "Nails",
					type: "checkbox",
					"default" : true
				},
				FrVhammer : {
					label : "Hammers",
					type: "checkbox",
					"default" : true
				},
				FrVpaint: {
					label : "Paint",
					type: "checkbox",
					"default" : true
				},
				FrVdrill: {
					label : "Drills",
					type: "checkbox",
					"default" : true
				}
			}
		},
		schoolseparator : {
			label : "Get School supplies",
			type : "separator"
		},
		FrVchalk: {
			label : "Chalk",
			type: "checkbox",
			"default" : true,
			kids : {
				FrVspit: {
					label : "Spitballs",
					type: "checkbox",
					"default" : true
				},
				FrVslate: {
					label : "Slates",
					type: "checkbox",
					"default" : true
				},
				FrVpens: {
					label : "Ink Pens",
					type: "checkbox",
					"default" : true
				},
				FrVwells: {
					label : "Ink Wells",
					type: "checkbox",
					"default" : true
				}
			}
		},

		treeseparator : {
			label : "Get Trees",
			type : "separator"
		},
		FrVoaktree : {
			label : "Oak Sapling",
			type : "checkbox",
			"default" : false,
			kids : {
				FrVpinetree : {
					label : "Pine Sapling",
					type: "checkbox",
					"default" : false
				},
				FrVappletree: {
					label : "Apple Tree",
					type : "checkbox",
					"default" : false
				},
				FrVcherrytree: {
					label : "Cherry Tree",
					type : "checkbox",
					"default" : false
				}

			}
		},
		decorationseparator : {
			label : "Get Decoration Items",
			type : "separator"
		},
		FrVloom : {
			label : "Loom",
			type : "checkbox",
			"default" : false,
			kids : {
				FrVbarbwire : {
					label : "Barbwire Fence",
					type: "checkbox",
					"default" : false
				},
				FrVtrough : {
					label : "Feed Trough",
					type : "checkbox",
					"default" : false
				},
				FrVshovel: {
					label : "Shovel",
					type : "checkbox",
					"default" : false
				},
				FrVsledge: {
					label : "Sledge Hammer",
					type : "checkbox",
					"default" : false
				},
				FrVbucket: {
					label : "Bucket",
					type : "checkbox",
					"default" : false
				}


			}
		},

		arinterval : {
			section : [ "Basic Tech Options" ],
			label : "Auto Refresh",
			type : "select",
			options : {
				off : "Off",
				sixth : "10 seconds",
				third : "20 seconds",
				half : "30 seconds",
				one : "1 minute",
				two : "2 minutes",
				three : "3 minutes",
				four : "4 minutes",
				five : "5 minutes",
				ten : "10 minutes",
				"30s2m" : "30sec-2min random",
				"2m5m" : "2min-5min random",
				"5m10m" : "5min-10min random"
			},
			"default" : "30s2m"
		},
		newuserhints : {
			label : "Enable pop-up hints (for new users)?",
			type : "checkbox",
			"default" : true,
		},
		filteronlyOff : {
			label : "Run as per GreaseMonkey includes/excludes?",
			type : "checkbox",
			"default" : true,
			kids : {
				filteronlyFrV : {
					label : "Only on FrV filter page?",
					type : "checkbox",
					"default" : false
				},
				filteronlyTI : {
					label : "Only on TI filter page?",
					type : "checkbox",
					"default" : false
				}
			}
		},
		colorcode : {
			label : "Color Code Item Posts?",
			type : "checkbox",
			"default" : true
		},
		autolike : {
			label : "Auto \"like\" clicked posts?",
			type : "checkbox",
			"default" : false
		},
		similarposts : {
			label : "Autoclick \"Show Similar Posts\" links?",
			type : "checkbox",
			"default" : true
		},
		status : {
			label : "Show debug status bar?",
			type : "checkbox",
			"default" : true
		},
		olderpostsbottom : {
			label : "Force older posts bar to bottom?",
			type : "checkbox",
			"default" : false
		},
		blockads : {
			label : "Block Ads?",
			type : "checkbox",
			"default" : false
		},
		inputtimeoutenable : {
			label : "Enable Typing Auto-pause",
			type : "checkbox",
			"default" : false,
			kids : {
				inputtimeout : {
					label : "Timeout (length of pause)",
					type : "float",
					"default" : 30
				}
			}
		},
		minposts : {
			label : "Minimum number of posts to show",
			type : "select",
			options : {
				off : "Off",
				5 : "5",
				10 : "10",
				20 : "20",
				30 : "30",
				40 : "40",
				50 : "50"
			},
			"default" : "off"
		},
		maxposts : {
			label : "Maximum number of posts to process",
			type : "select",
			options : {
				off : "Unlimited",
				5 : "5",
				10 : "10",
				20 : "20",
				30 : "30",
				40 : "40",
				50 : "50",
				100 : "100"
			},
			"default" : "off"
		},
		removedone : {
			label : "Hide finished items from feed?",
			type : "checkbox",
			"default" : false,
			title : "Helps keep browser memory low. BUT, keep the minimum posts feature OFF."
		},
		maxrequests : {
			section : ["Advanced Tech Options"],
			label : "Max simultaneous requests",
			type : "float",
			"default" : 1,
			title : "WARNING: ONLY 3 IS RECOMMENDED UNLESS YOU WANT TO RISK BEING BANNED."
		},
		reqtimeout : {
			label : "Item Acceptance Page Timeout (seconds)",
			type : "float",
			"default" : 30
		},
		itemage : {
			label : "How long to keep tried items in memory (days)",
			type : "float",
			"default" : 2
		},
		autostop : {
			label : "Autostop script when gift box is full?",
			type : "checkbox",
			"default" : true
		},
		debug : {
			label : "Turn on debug developer mode?",
			type : "checkbox",
			"default" : false,
			title : "This will show the requests frame and other dev features."
		},
		reset : {
			label : "Reset Accepted Items",
			type : "button",
			script : main.resetAccepted
		}
	},

	// Custom styling for the options interface
	"body {color: #EEEEEE !important; margin:0 !important; background:#000000 url('"+imgs.bg+"') !important;}\n"+
		".section_header {background:#333333 !important; display:block; font-size: 11pt !important;}\n"+
		".section_header_holder {padding:0 6px 0 6px !important; margin-top:6px !important;}\n"+
		"#header {font-size:18px !important;}\n"+
		"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
		"div.config_var {border-top: 1px solid #1D6092; margin:0 !important; padding: 2px 0 2px 0 !important;}"+
		".field_label {font-size:11px !important;}\n"+
		"span.separator {font-size: 11px !important; font-color:#AED3EE !important; margin:0 !important; padding:1px 0 1px 2px !important; display:block !important; background:#1D6092 !important;}"+
		"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}"+
		"span > label.field_label {margin-right:0 !important;}\n"+
		"#resetLink {color: #EEEEEE !important; margin-right:6px !important;}"+
		"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
		"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
		"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
		"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"
	);

	if(GM_config.get("filteronlyFrV") && main.realURL.find("filter=app_"+main.gameIDFrV)) GM_addStyle("#contentArea *[id*=\"_story_\"]:not([class*=\"aid_"+main.gameIDFrV+"\"]):not([id*=\"_collapsed\"]) {display:none !important;}");

	// add options shortcut to user script commands
	try {GM_registerMenuCommand(main.gameName+" Wall Manager "+version+" Options", main.config);}catch(e){}

	var debug = GM_config.get("debug");
	if(debug === true) {
		GM_config.set("maxrequests", 1);
		GM_config.set("reqtimeout", 9999);
		GM_config.set("arinterval", "off");
		GM_config.set("removedone", false);
	}
	// add div that holds the iframes for requests
	if(!$("silent_req_holder")) document.body.appendChild(main.create("div", {id:"silent_req_holder", textContent:"Double-click HERE to hide this debug frame.", style:"position:fixed; top:0; left:0; z-index:9998; overflow: hidden;"+((debug === false || typeof debug != "boolean") ? " height:1px; width:1px; border:0; background:transparent;" : "height:80%; width:95%; border:5px ridge #00FF00; background: #FFFFFF;"), ondblclick:function(e){e.target.style.display="none";}}));

	// Method to work on multiple accounts
	var prof = $("navAccountName") || document.evaluate(".//a[.='Profile' or .='Profilo' or .='Profiel' or .='Profil' or .='Perfil']", ($("pageNav") || document.body), null, 9, null).singleNodeValue;
	main.profile = prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

	if(main.realURL.find("sk=h")) window.location.replace(main.realURL.replace("sk=h", "sk=lf"));

	// if on the homepage with the home feed showing
	if($("pagelet_navigation") && (GM_config.get("filteronlyFrV")?main.realURL.find("filter=app_"+main.gameIDFrV):true)) {

		// add stylesheets
		GM_addStyle(""+
			"#"+main.streamID+" a[id^=\"item_done_\"] {font-weight: bold; font-size: 12px; color: #008800;}\n"+
			"#"+main.streamID+" a[id^=\"item_\"]:not([id^=\"item_done_\"]):not([id^=\"item_failed_\"]):not([id^=\"item_processing_\"]) {font-weight: normal; font-size: 10px; color: #6E6E6E;}\n"+
			"#"+main.streamID+" a[id^=\"item_processing_\"] {color: #DFDF00 !important;}\n"+
			"#"+main.streamID+" a[id^=\"item_failed_\"] {font-weight: bold; font-size: 12px; color: #D70000;}"+

			(GM_config.get("colorcode")===true ? "\n\n"+
			"*[id^=\"stream_story_\"], .itemneutral , .itemneutral div[id$=\"_collapsed\"] {background-color: #E8E8E8;}"+
			".itemdone, .itemdone div[id$=\"_collapsed\"] {background-color: #91FF91 !important;}\n"+
			".itemprocessing, .itemprocessing div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+
			".itemoverlimit, .itemoverlimit div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+	
			".itemfailed, .itemfailed div[id$=\"_collapsed\"] {background-color: #FF7171 !important;}"+
			"#"+main.streamID+" a[id^=\"item_\"] {color: #000000 !important;}" : "")+

			(GM_config.get("removedone")===true ? "\n\n"+
			".itemdone, .itemfailed {display: none !important;}" : "")
		);

		// method to speed up script considerably
		var tempopts={}, settings=GM_config.settings;
		for(var thing in settings) { // go through the options making cached options copy
			var g=GM_config.get(thing), kids=settings[thing].kids;
			switch(typeof g) {
				case "boolean": tempopts[thing] = g; break;
				case "number": tempopts[thing] = g || 0; break;
				case "text": tempopts[thing] = g || ""; break;
				default: tempopts[thing] = g;
			}
			if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
				var k=GM_config.get(kid);
				switch(typeof k) {
					case "boolean": tempopts[kid] = k; break;
					case "number": tempopts[kid] = k || 0; break;
					case "text": tempopts[kid] = k || ""; break;
					default: tempopts[kid] = k;
				}
			}
		}
		main.reqTO = Math.round(tempopts["reqtimeout"]*1000);
		main.opts = tempopts; tempopts=null; k=null; g=null; settings=null;

		// another method to speed up - keep about:config clean
		var acc=main.getAccepted(), accTime=main.getAcceptedTime(), DetlColl=main.getDetlColl(), timeNow=new Date().getTime(), ageHours=parseInt(main.opts["itemage"]) * 24;
		for(var w in accTime) {
			var accTimew=accTime[w], accw=acc[w];
			for(var k in accTimew) { // loop through the accepted items' times
				if(((timeNow-accTimew[k])/3600000) > ageHours && accw.inArray(k)) {
					accw.splice(accw.inArrayWhere(k), 1); // remove from accepted items array
					delete accTimew[k]; // remove from time object
					try{ delete DetlColl[k]; }catch(e){} // this collection was failed and isn't in the detailed collectibles object
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
		main.setDetlColl(DetlColl);
		acc=null; accTime=null; DetlColl=null; timeNow=null; ageHours=null; failed=null; failedTime=null;

		// add debug status bar to page
		document.body.appendChild(main.create("div", {id:"status",style:"position: fixed; bottom: 4px; left: 4px; padding:2px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 192px; text-align: center;",textContent:"["+main.gameAcronym+"] 0 requests currently (0 done)", onclick:function(e){
			if(main.boxFull) return;
			main.paused = !main.paused;
			main.pauseClick = true;
			main.pauseCount = main.opts["inputtimeout"] || 15;
			main.status();
		}}));

		// listen for key presses to autopause, if enabled
		if(GM_config.get("inputtimeoutenable")) window.addEventListener("keydown", main.keyDownFunc, false);

		// prevent users from picking options that don't go together
		var opts = main.opts;
		if(opts["removedone"] == true && opts["minposts"] != "off") { // 'min posts' and 'hide finished items' are on
			GM_config.set("minposts", "off"); main.opts["minposts"] = "off";
			GM_config.save();
			alert("Error:\n\nThe 'minimum posts' option cannot be on while the 'hide finished items' option is on because it will cause an infinite loop of clicking the 'Older Posts' link.\n\nThe 'minimum posts' option has been turned off.");
		}
		if(opts["minposts"] != "off" && opts["maxposts"] != "off" && parseInt(opts["minposts"])>parseInt(opts["maxposts"])) { // 'min posts' is higher than 'max posts'
			GM_config.set("minposts", "off"); main.opts["minposts"] = "off";
			GM_config.set("maxposts", "off"); main.opts["maxposts"] = "off";
			GM_config.save();
			alert("Error:\n\nThe 'minimum posts' option is higher than the 'maximum posts' option.\n\nBoth the 'minimum posts' and 'maximum posts' options have been turned off.");
		}
		opts=null;

		// make script run every second, update debug bar, and click similar posts links
		var runint = window.setInterval(function(e){
			switch(main.opts["status"] == true) {case true: main.status(); break;}
			window.setTimeout(function(){main.run("FrV");},0);
			switch(main.opts["similarposts"] == true) {case true: main.similarPosts(); break;}
			switch(main.opts["minposts"] != "off") {case true: main.expand(); break;}
		},1000);

		// add autorefresh if enabled
		if(main.opts["arinterval"] != "off") window.setTimeout(main.refresh, main.refTime);
		} else if(document.title=="Problem loading page") main.refresh();

		// add another shortcut to the config, this time as a link on the page
		var iOp=0, opInt = window.setInterval(function() {
			var na = $("navAccount");
			var f = $(main.navIDnf),
			a = (na != null ? na.getElementsByTagName("ul")[0] : null),
			link1 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_1"}, new Array(
				main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
					main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
					main.create("span", {textContent:main.gameAcronym+" "+version+" Options"}))))),
			link2 = main.create("li", {id:main.navID+"_"+main.gameAcronym.toLowerCase()+"_2"}, new Array(
				main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
					main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
					main.create("span", {textContent:main.gameAcronym+" "+version+" Options"})))));
			if(f && !$("navItem_fvwm_1")) f.parentNode.appendChild(link1);
			if(a && !$("navItem_fvwm_2")) a.appendChild(link2);
			if((f && a) || iOp>=10) window.clearInterval(opInt);
			iOp++;
		}, 500);

		// pre-load images
		for(var img in imgs) new Image().src = imgs[img];
	}

	// section for reclaiming memory and stopping memory leaks
	window.addEventListener("beforeunload", function(e) {
		window.removeEventListener("keydown", main.keyDownFunc, false);
		main=null; GM_config=null; iOp=null; opInt=null; runInt=null; prof=null; GM_addStyle=null; $=null; imgs=null; unsafeWindow=null; version=null; isGM=null; $g=null; debugFrameShow=null;
	}, false);

	// new user recognition
	var newuser = main.getValue(main.gameAcronym+"_newuser", true);
	if(newuser != false) {
		main.message("Welcome to "+main.gameName+".<br><br>"+
			"<a href=\""+main.scriptHomeURL+"\" target=\"_blank\">Click here</a> to learn proper use of this script.<br><br>"+
		 	"Thank you for choosing "+main.gameAcronym+".<br><br>"+
		 	"The config screen will popup in 30 seconds...");
		window.setTimeout(main.config, 30000);
		main.setValue(main.gameAcronym+"_newuser", false);
	}

	if(GM_config.get("blockads") === true) GM_addStyle("#pymk_hp_box, div[id*=\"_no_ad_ctr\"], .UIStandardFrame_SidebarAds, #sidebar_ads, iframe:not([src*=\"/facebook\"]):not([src*=\"slashkey\"]):not([src*=\"facebook.com\"]):not([src*=\"zynga.com\"]):not([src*=\"myofferpal.com\"]):not([id=\"GM_config\"]):not([src*=\"farmville.com\"]):not([src*=\"yoville.com\"]):not([id=\"upload_iframe\"]), #home_sponsor_nile, div[class*=\"ad_capsule\"], div[class*=\"social_ad\"], div[class*=\"sponsor\"], div[id*=\"sponsor\"], .welcome_banner, #FFN_imBox_Container {display:none !important;}");

	if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePager {-moz-border-radius: 4px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important; background-color: #969696 !important; border-color: #000000 !important; z-index: 9999 !important;}\n#contentArea div.uiMorePager * {color: #FFFFFF !important;}\n.UIActionLinks.UIActionLinks_bottom.GenericStory_Info > a { float: right !important;}");

})(); // anonymous function wrapper end