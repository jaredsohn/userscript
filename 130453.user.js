// ==UserScript==
// @name           wm config
// @version        1.0.4
// ==/UserScript==

(function(){

	// GM_config by JoeSimmons/sizzlemctwizzle/izzysoft/CharlieEwing
	// originally from FVWM by Joe Simmons modified by Charlie Ewing to allow for a tree structure and to save space in the about:config area
	this.GM_config = {
 		storage: 'settings', // This needs to be changed to something unique for localStorage

 		init: function() {try{
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
			
			GM_config.settings = settings;
			if (css) GM_config.css.stylish = css;

			//get values
			GM_config.values=GM_config.read();

			//determine option values from either saved or defaults
			GM_config.updateSettingsValues();
 		}catch(e){log("GM_config.init: "+e);}},

		append: function(newset) {try{
			GM_config.settings = mergeJSON(GM_config.settings,newset);
			GM_config.updateSettingsValues();
		}catch(e){log("GM_config.append: "+e);}},

		updateSettingsValues:function(show){try{
			var output={};
			//get a flat version of the menu tree
			GM_config.fields=mergeJSON(getBranchValues(GM_config.settings,"."));

			//create a default value list for every item
			GM_config.defaults=getBranchValues(GM_config.settings,"default"); 

			//place values over updated defaults
			GM_config.values=mergeJSON(GM_config.defaults,GM_config.values); 

			//set up the initial values for empty fields
			for (var f in GM_config.fields) if (!exists(GM_config.values[f])) {
				var field=GM_config.fields[f];
				switch(field.type) {
					case 'text': case 'float': case 'int': case 'long': case 'hidden': case 'textarea':
						GM_config.values[f] = "";
						break;
					case 'select':
						GM_config.values[f] = "";
						break;
					case 'section': case 'separator': case 'tab':
						GM_config.values[f] = "";										
						break;
					default: case 'checkbox':
						GM_config.values[f] = false;
				}
			}

			
			if (show){
				//output.fields=GM_config.fields;
				output.defaults=GM_config.defaults;
				output.values=GM_config.values;
				prompt("data",JSON.stringify(output));
			}
		}catch(e){log("GM_config.updateSettingsValues: "+e);}},

 		open: function() {try{
 			if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
			// Create frame
			document.body.appendChild((GM_config.frame=createElement('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none !important; z-index:9998; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        		GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
			GM_config.frame.addEventListener('load', function(){

				var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], settings=obj.settings;
				obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(createElement('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

				// Add header and title
				frameBody.appendChild(createElement('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

				// Append elements
				var prevSetting=null; //<-this part allows tabs at the top level
				for (var i in settings) {
					prevSetting=frameBody.appendChild(obj.addToFrame(settings[i], i, true, prevSetting));
				}

				// Add save and close buttons
				frameBody.appendChild(
					createElement('div', {id:'buttons_holder'}, [
						createElement('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
						createElement('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
						createElement('div', {className:'reset_holder block'}, [
							createElement('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
						])
					])
				);

				obj.center(); // Show and center it
				window.addEventListener('resize', obj.center, false); // Center it on resize
				if (obj.onOpen) setTimeout(obj.onOpen,0); // Call the open() callback function
		
				// Close frame on window close
				window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
			}, false);
		}catch(e){log("GM_config.open: "+e);}},

 		close: function(save) {try{
			if(save) {
				var obj=GM_config, fields = obj.fields;
				for(f in fields) {
					var set=fields[f], field=obj.frame.contentDocument.getElementById('field_'+f);
					switch(set.type) {
						case 'text': case 'float': case 'int': case 'long': case 'hidden': case 'textarea':
							GM_config.values[f] = field.value;
							break;
						case 'select':
							GM_config.values[f] = field[field.selectedIndex].value;
							break;
						case 'section': case 'separator': case 'tab':
							GM_config.values[f] = field.style.display;										
							break;
						default: case 'checkbox':
							GM_config.values[f] = field.checked;
					}
				}
                		GM_config.save();
                		if(GM_config.onSave) setTimeout(GM_config.onSave,0); // Call the save() callback function
			}
			if(GM_config.frame) GM_config.remove(GM_config.frame);
			delete GM_config.frame;
        		if(GM_config.onClose) setTimeout(GM_config.onClose,0); //  Call the close() callback function
 		}catch(e){log("GM_config.close: "+e);}},

 		set: function(name,val) {try{GM_config.values[name] = val;}catch(e){log("GM_config.set: "+e);}},

		get: function(name) {try{return GM_config.values[name];}catch(e){log("GM_config.get: "+e);}},

 		isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',

 		log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),

 		getValue : function(name, def) {try{ return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); }catch(e){log("GM_config.getValue: "+e);}},

 		setValue : function(name, value) {try{ return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); }catch(e){log("GM_config.setValue: "+e);}},

 		save: function(store, obj) {try{
			var values=(obj||GM_config.values), defaults=GM_config.defaults, shrunk={}, fields=GM_config.fields;
			for (var v in values) {
				if (exists(defaults[v])){
					//do not store values that match the default value
					if (defaults[v]!=values[v]) shrunk[v]=values[v];
				} else {
					//do not store empty values or checkboxes that are false
					if (!(values[v]=='' || ( (values[v]==false) && (fields[v].type=="checkbox") ) )) shrunk[v]=values[v];
				}
			}
			setOptJSON((store||GM_config.storage),shrunk);
 		}catch(e){log("GM_config.save: "+e);}},

 		read: function(store) {try{
			var ret;
    			ret=getOptJSON((store||GM_config.storage))||{};
    			return ret||{};
 		}catch(e){log("GM_config.read: "+e);}},

 		reset: function(e) {try{
			e.preventDefault();
			var obj = GM_config, fields=obj.fields, values=obj.defaults;
			for(f in fields) {
				var field = obj.frame.contentDocument.getElementById('field_'+f), set=fields[f];

	 			switch(set.type) {
					case 'text': case 'float': case 'int': case 'long': case 'hidden': case 'textarea':
						field.value = (values[f]||'');
						break;
					case 'select':
						if(exists(defaults[f])) {
							for(var i=field.options.length-1; i>=0; i--) if(field.options[i].value==values[f]) field.selectedIndex=i;
						} else field.selectedIndex=0;
						break;
					case 'section': case 'separator': case 'tab':
						field.style.display=(values[f]||'');								
						break;
					default:case 'checkbox':
						field.checked = (values[f]||false);
				}
			}
 		}catch(e){log("GM_config.reset: "+e);}},

		selectBlock: function(e) {try{
			var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:e.parentNode||$(e,$("GM_config").contentDocument).parentNode,doc:$("GM_config").contentDocument});
			for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=true;
			//http://i55.tinypic.com/6ih93q.png
		}catch(e){log("GM_config.selectBlock: "+e);}},

		deselectBlock: function(e) {try{
			var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:e.parentNode||$(e,$("GM_config").contentDocument).parentNode,doc:$("GM_config").contentDocument});
			for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=false;
			//http://i55.tinypic.com/2lk2xyw.png
		}catch(e){log("GM_config.deselectBlock: "+e);}},

		//highlights option menu elements in an array, first clearing any elements provided in clearFirst array
		highlightElements: function(options,clearFirst) {try{
			if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("GM_config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","");
			if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("GM_config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","")+" highlight";
		}catch(e){log("GM_config.highlightElements: "+e);}},

		//selects option menu elements in an array, first clearing any elements provided in clearFirst array
		selectElements: function(options,clearFirst) {try{
			if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("GM_config").contentDocument)) box.checked=true;
			if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("GM_config").contentDocument)) box.checked=true;
		}catch(e){log("GM_config.selectElements: "+e);}},

		//selects option menu elements with a certain prefix, first clearing any elements starting with text appearing in clearFirst
		//this button only selects elements at the level the button appears or deeper in the option menu tree
		selectElementsByPrefix: function(prefix,clearPrefix) {try{
			if (clearPrefix){
				forNodes(".//*[starts-with(@id, 'field_"+clearPrefix+"')]",{doc:$("GM_config").contentDocument}, function(box){box.checked=false;});
			};

			if (prefix){
				alert("prefix:"+prefix);
				forNodes(".//*[starts-with(@id, 'field_"+prefix+"')]",{doc:$("GM_config").contentDocument}, function(box){alert("checking"); box.checked=true;});
			};
		}catch(e){log("GM_config.selectElementsByPrefix: "+e);}},

 		addToFrame : function(field, i, k, prevSibling) {try{
			var elem, elemObj, nextElem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, isKid = k!=null && k===true;
			//check that it is switched on by time
			if (field.startDate) if (((new Date).getTime()-Date.parse(field.startDate))<0) return; //not started yet
			//check that it has not been switched off
			if (field.endDate) if (((new Date).getTime()-Date.parse(field.endDate))>0) return; //already ended

			//draw it
			var styleItems=[];
			switch(field.type) {
				case 'section':
					elem = createElement('div', {className: 'section_header_holder'},[
				  		createElement('a', {className:'section_header center text_border_sec', href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggle(i,true);}}),
				  		createElement('div', {id:'field_'+i, className:'section_kids', style:value?"display: none;":""})
				  	]);
					nextElem = elem.getElementsByTagName('div')[0];
					styleItems[0]=elem;
					break;
				case 'separator':	
					elem = createElement("div", {title:field.title||'', className: 'separator section_header_holder'},[
						createElement('input', {id:'field_'+i+'_all',className:'field_label block_select_all',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){GM_config.selectBlock(this);},style:'float:right;'}),
						createElement('input', {id:'field_'+i+'_none',className:'field_label block_select_none',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){GM_config.deselectBlock(this);},style:'float:right;'}),
				  		styleItems[0]=createElement('a', {className:'separator_label text_border_sep', href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggle(i,true);}}),
						styleItems[1]=(nextElem=createElement('div', {id:'field_'+i, className:'section_kids', style:value?"display: none;":""}))
					]);
					break;
				case 'optionblock':
					elem = createElement("div", {title:field.title||'', className: 'config_var underline'},[
						createElement('label', {textContent:label, className:'optionblock_label', "for":'field_'+i}),
						createElement('input', {id:'field_'+i, type:'hidden', value:''}),
						createElement('input', {id:'field_'+i+'_all',className:'field_label block_select_all',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){GM_config.selectBlock(this);}}),
						createElement('input', {id:'field_'+i+'_none',className:'field_label block_select_none',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){GM_config.deselectBlock(this);}})
					]);
					styleItems[0]=elem;
					break;
				case 'textarea':
					elem = createElement("span", {title:field.title||'', className: 'config_var'},[
						createElement('span', {textContent:label, className:'field_label'}),
						createElement('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					]);
					styleItems[0]=elem;
					break;
				case 'radio':
					var boxes = [];
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(createElement('span', {textContent:Options[j]}));
						boxes.push(createElement('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = createElement("span", {title:field.title||'', className: 'config_var '+(field.format||'block')},[
						createElement('span', {textContent:label, className:'field_label'}),
						createElement('span', {id:'field_'+iboxes},boxes)
					]);
					styleItems[0]=elem;
					break;
				case 'select':
					var options = [];
					if(!Options.inArray) for(var j in Options) options.push(createElement('option',{textContent:Options[j],value:j,selected:(j==value)}));
					else options.push(createElement("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));

					elem = createElement(isKid ? "span" : "div", {title:field.title||'', className: 'config_var'},[
						createElement('span', {textContent:label, className:'field_label'}),
						createElement('select',{id:'field_'+i},options)
					]);
					styleItems[0]=elem;
					break;
				case 'button':
					var tmp;
					elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
						(tmp=createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					]);
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					styleItems[0]=elem;
					break;
				case 'button_highlight':
					var tmp;
					elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
						createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.highlightElements(field.options,field.clearfirst);}})
					]);
					styleItems[0]=elem;
					break;
				case 'button_selectmulti':
					var tmp;
					elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
						createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.selectElements(field.options,field.clearFirst);}})
					]);
					styleItems[0]=elem;
					break;
				case 'button_selectprefix':
					var tmp;
					elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
						createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||'',onclick:function(){GM_config.selectElementsByPrefix(field.prefix,field.clearPrefix);}})
					]);
					styleItems[0]=elem;
					break;
				case 'hidden':
					elem = createElement("span", {title:field.title||'', className: 'config_var'},[
						createElement('input', {id:'field_'+i, type:'hidden', value:value})
					]);
					styleItems[0]=elem;
					break;
				case 'link':
					elem = createElement("span", {title:field.title||'', className: (field.format||'block')},[
						createElement('a', {id:'field_'+i, href:field.href, title:field.title||'', textContent:field.label, target:'_blank', className:'field_label link_label'+(field.newitem?' newopt':'')})
					]);
					styleItems[0]=elem;
					break;
				case 'tabcontrol':
					elem = createElement("div",{title:field.title||'', className: 'tab_container'});
					styleItems[0]=elem;
					break;
				case 'tabelement':
					var value2 = obj.values[field.key];
					elem = createElement("span",{title:field.title||'',className:'tab_element'},[
				  		createElement('a', {id:'tab_'+field.key,className:'tab_header'+((value2=='block')?" tab_selected":""),href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggleTab(field.key);}})
					]);
					styleItems[0]=elem;
					break;
				case 'tabbody':
					elem = createElement("div",{id:'field_'+i,title:field.title||'',style:("display:"+value+";"),className:'tab_body'});
					styleItems[0]=elem;
					break;

				case 'tab': //tab shortform
					//check for tab_control in previous sibling
					var tabHeader, tabParent;
					if (prevSibling!=null) if (prevSibling.className.contains('tab_container')) tabParent = prevSibling;

					//create tab container if needed
					if (!tabParent){
						elem = createElement("div",{className:'tab_container'},[
							tabHeader=createElement("div",{className:'tab_header_container'}) 
						]);
						tabParent=elem;
					} else elem=tabParent;

					//create tab header if needed
					if (!tabHeader){
						tabHeader = tabParent.firstChild; //assume no header
						if (!tabHeader.className.contains('tab_header_container')) {
							tabParent.appendChild(tabHeader=createElement("div",{className:'tab_header_container'}) );
						}
					}

					//create tab element
					tabHeader.appendChild(
						styleItems[0]=createElement("span",{className:'tab_element '},[
					  		createElement('a', {id:'tab_'+i,className:'tab_header'+((value=='block')?" tab_selected":""),href:"javascript:void(0);", textContent:label, onclick:function(){GM_config.toggleTab(i);}})
						])
					);
						
					//create tab body
					tabParent.appendChild(
						styleItems[1]=(nextElem=createElement("div",{id:'field_'+i,title:field.title||'',style:("display:"+value+";"),className:'tab_body'}) )
					);

					//cleanup
					tabHeader=null; tabParent=null;
					break;

				case 'text':
				case 'float':
				case 'long':
				case 'int':
					elem = createElement(isKid ? "span" : "div", {title:field.title||'', className: 'config_var'},[
						createElement('span', {textContent:label, className:'field_label'}),
						createElement('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					]);
					styleItems[0]=elem;
					break;

				default:
				case 'checkbox':
					elem = createElement("span", {title:field.title||'', className: 'config_var '+(field.format||'block')},[
						createElement('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						createElement('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					]);
					styleItems[0]=elem;
			}

			//add special classes and styles
			if (styleItems.length) for (si=0,silen=styleItems.length;si<silen;si++){
				styleItems[si].className+=(field.newitem?' newopt'+((field.newitem===true)?"":field.newitem):'')+" "+(field.css||"");
				if(field.backgroundColor) styleItems[si].style.backgroundColor=field.backgroundColor;
				if(field.fontColor) styleItems[si].style.color=field.fontColor;
			}

			//add its kids
			if (field.kids) {
				var kids=field.kids,prev;
				for(var kid in kids) (nextElem||elem).appendChild(prev=GM_config.addToFrame(kids[kid], kid, true, prev));
			}

			return elem;
		}catch(e){log("GM_config.addToFrame: "+e);}},

		exportSettings : function(){try{
			var val = JSON.stringify(GM_config.values)
			prompt("Copy and save these settings with a text editor such as notepad.",val);
		}catch(e){log("GM_config.exportSettings: "+e);}},

		importSettings : function(){try{
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
		}catch(e){log("GM_config.importSettings: "+e);}},

		values: {}, //just the values in a flat object

		settings: {}, //menu tree structure

		fields: {}, //all the branches put in a flat object

		defaults: {}, //just the defaults in a flat object

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
 			'input[type="radio"] {margin-right:8px;}\n'+


		"body {color: #D5D4D4 !important; margin:0 !important; background:#434343 !important;}\n"+
			".logo {width:128px; height:74px;}\n"+

			".section_header {border:1px solid #000000; border-radius: 5px 5px 5px 5px; color:#D5D4D4 !important;background:#3A3939 !important; display:block; font-size: 15px !important; font-weight: 700 !important; line-height:23px !important;text-decoration:none !important;}\n"+
			".separator_label {border:1px solid #007195; border-radius: 5px 5px 5px 5px; font-size: 15px !important; line-height:19px !important; font-weight: 700 !important; color:#FEFEFE !important; text-decoration:none !important; margin:0 !important; padding:1px 0 1px 6px !important; display:block !important; background:#53C4FB !important;}\n"+
			".section_header_holder {border-radius: 5px 5px 5px 5px;padding:0 6px 0 6px !important; margin-bottom:6px !important; }\n"+
			".section_kids {background:#424141 !important;border-radius: 0 0 5px 5px;border: 1px solid #000000 !important;border-top:0 !important;padding: 0 6px 6px !important;margin: 0 6px 0 6px !important;}\n"+
			"#header {font-size:18px !important;}\n"+
			"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
			"div.config_var {margin:0 !important; padding: 2px 0 2px 0 !important;}\n"+
			".optionblock_label {display:block; font-size:16px !important; font-weight:bold; padding-top:10px; color:white;}\n"+
			".block_select_all {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/6ih93q.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".block_select_none {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/2lk2xyw.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
			".field_label {font-size:11px !important;}\n"+
			".link_label {line-height:19px; position:relative;z-index:0;padding:2px 6px 2px 6px; border-radius: 0px 25px 0px 25px / 0px 100px 0px 100px; margin-left:6px !important; text-decoration:none;border: 1px solid black; color:black !important; background:#EFF2F7 !important;}\n"+
			".link_label:hover, .link_label:active {z-index:1; background:#D8DFEA !important;}\n"+
			"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}\n"+
			"span > label.field_label {margin-right:0 !important;}\n"+
			"#resetLink {color: #D5D4D4 !important; margin-right:6px !important;}\n"+
			"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
			"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
			"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
			"input[type=\"text\"] {text-align: center !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+

			".tab_element {display:inline !important;}\n"+
			".tab_header {background:#141414 !important;color:#D5D4D4 !important; padding:2px 6px;border:1px solid #000000; border-radius: 5px 5px 0 0; margin:0 !important; font-size: 13px !important; line-height:19px !important; font-weight: 700 !important; text-decoration:none !important;position:relative;z-index:0;}\n"+
			".tab_body {padding: 6px 6px 0 6px !important;margin: 0 !important; background:#424141 !important;border-radius: 0 5px 5px 5px;border: 1px solid #000000 !important;display:none;position:relative;z-index:1;top:0px;}\n"+
			".tab_selected {background:#424141 !important;border-bottom:0 !important;color:white !important; z-index:2;}\n"+

			".inline {display:inline-block;}\n"+
			".block {display:block;}\n"+

			".underline {border-bottom:1px solid #70BAFF;}\n"+
			".overline {border-bottom:1px solid #70BAFF;}\n"+
			".hidden {display:none;}\n"+
			".unreleased, .ghost, .ended {opacity:0.25;}\n"+
			".highlight {background:#94BC41 !important; color:black;}\n"+
			".green {background:green !important;color:black;}\n"+
			".red {background:darkred !important;color:black;}\n"+
			".blue {background:royalblue !important;color:black;}\n"+
			".orange {background:darkorange !important;color:black;}\n"+
			".yellow {background:gold !important;color:black;}\n"+
			".silver {background:silver !important;color:black;}\n"+
			".gray {background:gray !important;color:black;}\n"+
			".white {background:white !important;color:black;}\n"+
			".black {background:black !important;color:white;}\n"+
			".box {border:1px solid silver;}\n"+
			".newopt {background:#027B09 !important;}\n"+
			".newopt1 {background:green !important;}\n"+
			".newopt2 {background:darkred !important;}\n"+
			".newopt3 {background:royalblue !important;}\n"+

			".text_border_sep {font-family:tahoma; text-shadow: -1px -1px 1px #007195, 1px 1px 1px #007195, 1px -1px 1px #007195, -1px 1px 1px #007195;text-transform:uppercase; font-weight:900 !important;}\n"+
			".text_border_sec {font-family:tahoma; text-shadow: -1px -1px 1px #000000, 1px 1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000;text-transform:uppercase; font-weight:900 !important;}\n"+
			"",
 			stylish: ''
		},
 
		center: function() {try{
			var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
			if(style.display=='none') style.opacity='0';
			style.display = '';
			style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
			style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
			style.opacity = '1';
 		}catch(e){log("GM_config.center: "+e);}},

 		run: function() {try{
    			var script=GM_config.getAttribute('script');
    			if(script && typeof script=='string' && script!='') {
      				func = new Function(script);
      				setTimeout(func, 0);
    			}
 		}catch(e){log("GM_config.run: "+e);}},

 		addEvent: function(el,ev,scr) {try{ el.addEventListener(ev, function() { typeof scr == 'function' ? setTimeout(scr, 0) : eval(scr) }, false); }catch(e){log("GM_config.addEvent: "+e);}},
 
		remove: function(el) {try{ if(el && el.parentNode) el.parentNode.removeChild(el); }catch(e){log("GM_config.remove: "+e);}},
 
		toggle : function(e,newMode) {try{
			var node=GM_config.frame.contentDocument.getElementById((newMode)?'field_'+e:e);
			node.style.display=(node.style.display!='none')?'none':'';
			if (node.style.display!='none') node.parentNode.scrollIntoView(true);
			//GM_config.setValue(e, node.style.display);
 		}catch(e){log("GM_config.toggle: "+e);}},

		toggleTab : function(e) {try{
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
 		}catch(e){log("GM_config.toggleTab: "+e);}}


	};

	log("GM_config initialized");
})();