// ==UserScript==
// @name           	WM Config Interface
// @description	Creates a configuration interface which allows users to set and get options easily.
// @require		http://userscripts.org/scripts/source/123889.user.js
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        	2.0.0.13
// @copyright      	Charlie Ewing
// ==/UserScript==

//this script is based on GM_config by JoeSimmons, sizzlemctwizzle, and izzysoft
//this script requires some functions in the WM Common Library

(function(){

//config element types
this.ConfigElementTypes = {
	checkbox:{defaultValue:false,valueMember:"checked"},
	text:{defaultValue:""},
	section:{defaultValue:"none",valueMember:"data-ft"}, //closed
	separator: {defaultValue:"none",valueMember:"data-ft"}, //closed
	optionblock: {doNotSave:true}, //not to be stored
	textarea: {defaultValue:""},
	radio: {defaultValue:false},
	select: {defaultValue:""}, //none selected
	button: {doNotSave:true}, //not to be stored
	"button_highlight": {doNotSave:true}, //not to be stored
	"button_selectmulti": {doNotSave:true}, //not to be stored
	"button_selectprefix": {doNotSave:true}, //not to be stored
	hidden: {defaultValue:false}, 
	link: {defaultValue:false}, //not to be stored
	tabcontrol: {doNotSave:true}, //not to be stored
	tabelement: {doNotSave:true}, //not to be stored
	tabbody: {defaultValue:"none",valueMember:"data-ft"}, //closed
	tab: {defaultValue:"none",valueMember:"data-ft"}, //closed
	"float": {defaultValue:0.0}, 
	"long": {defaultValue:0}, 
	"int": {defaultValue:0},
	colorbox: {defaultValue:"black"},
	"message": {doNotSave:true}, //not to be stored
	selecttime: {defaultValue:""},
};

//instanceable config system
this.Config = function(params){
	var self = this;

	//defaults
	this.storageName = "settings";
	this.css = "";
	this.logo = null;
	this.onOpen = null;
	this.onClose = null;
	this.onSave = null;
	this.settings = {};
	this.title = "Settings - Anonymous Script";
	this.fields = {}; //list of ConfigField objects
	this.values = {}; //saveable list of data
	this.sectionsAsTabs = false;
	this.separatorsAsTabs = false;
	this.useScrollIntoView = false;
	this.confirms = {save:true,cancel:true,"import":true, restore:true};

	//init
	this.init = function(params) {try{
		params=params||{};

		//get special params first
		if (exists(params.css)) {
			this.css.user = params.css;
			delete params.css;
		}
	
		//set params
		for (var p in params){
			this[p]=params[p];
		}

		//get values
		this.values=this.read();
		
		//configure values and fields table
		this.configure();
	}catch(e){log("Config.init: "+e);}};

	//read vars from local storage
	this.read = function(params) {try{
		params=params||{};
		return getOptJSON(params.storageName||this.storageName)||{};
	}catch(e){log("Config.read: "+e);}};
	
	//write vars to local storage
	this.write = function(params) {try{
		params=params||{};
		setOptJSON(params.storageName||this.storageName)||{};
	}catch(e){log("Config.write: "+e);}};
	
	//convert the tree structure to a 2D table of fields
	//get saved and default values as well as element types
	//pass destroy:true to clear the fields list and start over
	//pass reset:true to set all values to their defaults
	this.configure = function(params) {try{
		params=params||{};
		//destroy current config if requested
		if (params.destroy) this.fields={};
		
		//traverse the entire settings tree 
		//OR just the passed settings param
		var settings = params.settings || this.settings;
		for (var field in settings) {
		
			//copy branch to 2D table
			data = settings[field];
			this.fields[field] = data;
			
			//setup default values
			data["default"] = (exists(data["default"]))?data["default"]:ConfigElementTypes[data.type].defaultValue;
			
			//set value for saveable types only
			if (!(ConfigElementTypes[data.type].doNotSave||false)){
				if (params.reset||false) {
					//set the value to its default value
					data.value = data["default"];
					this.values[field]=data.value;				
				} else {
					if (exists(this.values[field])) {
						//a value exists, copy it to the field
						data.value = this.values[field];
					} else {
						//a value does not yet exist, create one
						data.value = data["default"];
						this.values[field]=data.value;
					}
				}
			}
			
			//traverse children if needed
			if (exists(data.kids)) {
				this.configure({
					settings:data.kids, //pass children
					parent:this.fields[field], //link parent
					reset:params.reset, //pass the reset command
				});
			}
		}
	}catch(e){log("Config.configure: "+e);}};
	
	//take additional settings data and append it to a specific field
	this.append = function(params) {try{
		params=params||{};
		//detect branch
		var branch = (exists(params.branch))?this.fields[params.branch].kids:this.settings;
		//copy data to specified branch
		for (var field in params.data) {
			branch[field]=params.data[field];
		}

		//reconfigure just the passed branch
		this.configure({
			settings: params.data, //pass the new children
			parent: params.branch||null, //link parent
		});
		
		//return the branch to which we were appended
		return branch;
	}catch(e){log("Config.append: "+e);}};
	
	//open the config menu in an iframe
	this.open = function(params) {try{
		//confirm(this.sectionsAsTabs);
		params=params||{};
		//check if already open
		if (document.evaluate("//iframe[@id='Config']",document,null,9,null).singleNodeValue) return;
		
		//create iframe
		document.body.appendChild(
			this.frame = createElement("iframe",{
				id:"Config", 
				style:(
					"position:fixed;"+
					"top:0; left:0;"+
					"opacity:0;"+
					"display:none !important;"+
					"z-index:9998;"+
					"width:75%; height:75%;"+
					"max-height:95%; max-width:95%;"+
					"border:1px solid #000000;"+
					"overflow:auto;"+
					""//leave here
				)
			})
		);
		
		//load a blank document into our frame
		this.frame.src = "about:blank";
		
		//when it loads add our config page
		var self=this;
		this.frame.addEventListener("load", function(){

			self.frameDoc=this.contentDocument;
			frameBody = this.contentDocument.getElementsByTagName("body")[0];
			
			//select display settings
			//use the passed field name as the top of our settings
			//or select the entire thing
			var settings=exists(params.field)?self.fields[params.field].kids:self.settings;
			
			//set up our frame's css
			self.frame.contentDocument.getElementsByTagName("head")[0].appendChild(
				createElement("style",{
					type: "text/css",
					textContent: self.css.basic + self.css.user
				})
			);

			//add header and title
			frameBody.appendChild(
				createElement("div",{
					id: "header",
					className: "config_header block center", 
					innerHTML: self.title
				})
			);

			//append elements
			var prevSibling=null; //<-this part allows tabs at the top level
			for (var i in settings) {
				var newElem = self.addToFrame(settings[i], i, true, prevSibling, null).elem;
				prevSibling=frameBody.appendChild(newElem);
			}

			//add config toolbar
			frameBody.appendChild(
				createElement('div', {id:'buttons_holder'}, [
					createElement('button',{
						//id:'saveBtn',
						textContent:'Save',
						title:'Save options and close window',
						//className:'saveclose_buttons',
						onclick:function(){self.close({doSave:true});}
					}),
					createElement('button',{
						//id:'cancelBtn', 
						textContent:'Cancel',
						title:'Close window',
						//className:'saveclose_buttons',
						onclick:function(){self.close({doSave:false});}
					}),
					createElement('button', {
						//id:'resetBtn', 
						textContent:'Restore to default',
						title:'Restore settings to default configuration',
						//className:'saveclose_buttons',
						onclick:function(){self.reset();}
					}),
					createElement('button', {
						//id:'resetBtn', 
						textContent:'Import Settings',
						title:'Import saved settings as text.',
						//className:'saveclose_buttons',
						onclick:function(){self.importSettings();}
					}),
					createElement('button', {
						//id:'resetBtn', 
						textContent:'Export Settings',
						title:'Export settings as text for storage elsewhere.',
						//className:'saveclose_buttons',
						onclick:function(){self.exportSettings();}
					})
				])
			);
			
			//add some whitespace to the bottom of the page
			frameBody.appendChild(
				createElement("span",{className:"bigSpacer"})
			);
			
			// Show and center it
			self.center(); 
			
			// Center it on resize			
			window.addEventListener('resize', function(){self.center();}, false); 
			
			//call the onOpen function if available
			if (!(params.noEvents||false)) if (self.onOpen) doAction(self.onOpen);
	
			// Close frame on window close
			window.addEventListener('beforeunload', function(){
				remove(this);
			}, false);
			
		}, false);
	}catch(e){log("Config.open: "+e);}};

	this.close = function(params) {try{
		params=params||{};
		//update the values list
		if (params.doSave||false) {
			var ask=this.confirms.save;
			if (params.noConfirm || !ask || (ask && confirm("Save options?"))) {
				var fields = this.fields, values = this.values;
				for (var f in fields) {
					var field=fields[f];
					var valueMember=ConfigElementTypes[field.type].valueMember||"value";
					var elem=this.frame.contentDocument.getElementById('field_'+f);
					if (elem) {
						//if (f.contains("interval")) debug.print(["before",values[f],field.value]);
						values[f]=(["value","checked"].inArray(valueMember))?elem[valueMember]:elem.getAttribute(valueMember);
						field.value=values[f];
						//if (f.contains("interval")) debug.print(["after",values[f],field.value]);
					} else {
						log("cannot find element: "+f);
					}
				}
				this.save();
				// Call the onSave function if available
				if (this.onSave) doAction(this.onSave); 
			}
		} else {
			//ask to cancel without save
			var ask=this.confirms.cancel;
			if (!(params.noConfirm || !ask || (ask && confirm("Close without saving?")))) return;
		}
		
		//destroy the iframe and forget it
		if (this.frame) remove(this.frame);
		delete this.frame;
		
		//call the onClose function if available
		if (!params.noEvents && this.onClose) doAction(this.onClose); 
	}catch(e){log("Config.close: "+e);}};
	
	this.reload=function(){
		this.close({noEvents:true, doSave:false, noConfirm:true})
		this.open({noEvents:true});
	};

	this.set = function(name,val) {try{
		this.values[name] = val;
		this.fields[name].value = val;
	}catch(e){log("Config.set: "+e);}};

	this.get = function(name) {try{
		return this.values[name];
	}catch(e){log("Config.get: "+e);}};

	/* unused functions
	getValue : function(name, def) {try{ return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); }catch(e){log("Config.getValue: "+e);}},

	setValue : function(name, value) {try{ return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); }catch(e){log("Config.setValue: "+e);}},
	*/
	
	this.save = function(storageName) {try{
		var shrunk={}, fields=this.fields;

		//clone the values data to preserve items we no longer have
		//fields for
		var shrunk=mergeJSON(this.values);
		
		//do not store values that match the default value
		for (var f in fields) {
			if ((ConfigElementTypes[fields[f].type].doNotSave||false) || (fields[f].value==fields[f]["default"])) {
				delete shrunk[f];
			}
		}
		
		setOptJSON((storageName||this.storageName),shrunk);
	}catch(e){log("Config.save: "+e);}};

	this.reset = function() {try{
		var ask=this.confirms.restore;
		if (!ask || (ask && confirm("Reset all values to defaults?"))) {
			this.configure({reset:true});
			this.save();
			this.reload();
		}
	}catch(e){log("Config.reset: "+e);}};

	this.selectBlock = function(e) {try{
		var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:e.parentNode||$(e,$("Config").contentDocument).parentNode,doc:$("Config").contentDocument});
		for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=true;
		//http://i55.tinypic.com/6ih93q.png
	}catch(e){log("Config.selectBlock: "+e);}};

	this.deselectBlock = function(e) {try{
		var boxes = selectNodes(".//input[@type='checkbox']",{type:6,node:e.parentNode||$(e,$("Config").contentDocument).parentNode,doc:$("Config").contentDocument});
		for (var i=0,box;(box=boxes.snapshotItem(i)); i++) box.checked=false;
		//http://i55.tinypic.com/2lk2xyw.png
	}catch(e){log("Config.deselectBlock: "+e);}};

	//highlights option menu elements in an array, first clearing any elements provided in clearFirst array
	this.highlightElements =function(options,clearFirst) {try{
		if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("Config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","");
		if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("Config").contentDocument) ) box.parentNode.className=box.className.replace(" highlight","")+" highlight";
	}catch(e){log("Config.highlightElements: "+e);}};

	//selects option menu elements in an array, first clearing any elements provided in clearFirst array
	this.selectElements = function(options,clearFirst) {try{
		if (clearFirst) for (var i=0;i<clearFirst.length; i++) if (box=$('field_'+clearFirst[i],$("Config").contentDocument)) box.checked=true;
		if (options) for (var i=0;i<options.length; i++) if (box=$('field_'+options[i],$("Config").contentDocument)) box.checked=true;
	}catch(e){log("Config.selectElements: "+e);}};

	//selects option menu elements with a certain prefix, first clearing any elements starting with text appearing in clearFirst
	//this button only selects elements at the level the button appears or deeper in the option menu tree
	this.selectElementsByPrefix =function(prefix,clearPrefix) {try{
		if (clearPrefix){
			forNodes(".//*[starts-with(@id, 'field_"+clearPrefix+"')]",{doc:$("Config").contentDocument}, function(box){box.checked=false;});
		};

		if (prefix){
			alert("prefix:"+prefix);
			forNodes(".//*[starts-with(@id, 'field_"+prefix+"')]",{doc:$("Config").contentDocument}, function(box){alert("checking"); box.checked=true;});
		};
	}catch(e){log("Config.selectElementsByPrefix: "+e);}};

	this.addToFrame = function(field, i, k, prevSibling, objReference) {try{
	
		var isForms2Ready = (exists(jsForms) && exists(jsForms.colorPicker));
	
		var elem, elemObj, nextElem;
		var anch = this.frame;
		var Options = field.options;
		var isKid = k!=null && k===true;
		var now = timeStamp();
		
		//prefetch some stuff
		var title = field.title||"", label = field.label||"", value = field.value;
		
		//check that it is switched on by time
		if (exists(field.startDate)) {
			if ((now-Date.parse(field.startDate))<0) return; //not started yet
		}
		
		//check that it has not been switched off
		if (exists(field.endDate)) {
			if ((now-Date.parse(field.endDate))>0) return; //already ended
		}

		var styleItems=[];
		
		//check if options change separators and sections to tabs
		var swapType=
			(this.sectionsAsTabs && field.type=="section")?"tab":
			(this.separatorsAsTabs && field.type=="separator")?"tab":
			field.type;
		
		//check if previous element was a tab 
		var tabHeader, tabParent;
		if (prevSibling!=null && prevSibling.className.contains('tab_container')) tabParent = prevSibling;

		/*if (swapType!="tab" && tabParent) {
			//detect if a tab is selected
			var tabSelected=selectSingleNode("./span/a[contains(@class,'tab_selected')]",{node:tabParent,doc:this.frameDoc});
			if (!tabSelected) {
				//detect the first tab element
				var firstTab=selectSingleNode("./span/a",{node:tabParent,doc:this.frameDoc});
				if (firstTab) {
					//toggle that tab
					//var e = firstTab.id.removePrefix("tab_");
					//this.toggleTab(e);
					click(firstTab);
					
				}
			}
		}*/
		
		//draw it
		var counterHolder=null;
		switch(swapType) {
			case 'section':
				elem = createElement('div', {title:title, className: 'section_header_holder'},[
					createElement('a', {className:'section_header center text_border_sec hottracking', href:"javascript:void(0);", onclick:function(){self.toggle(i,true);}},[
						createElement("span",{textContent:label}),
						counterHolder=createElement("span",{className:"counter"})
					]),
					nextElem = createElement('div', {id:'field_'+i, className:'section_kids',"data-ft":value, style:"display:"+((value=="none")?"none":"block")+";"})
				]);
				styleItems[0]=elem;
				break;
			case 'separator':
				elem = createElement("div", {title:title||'', className: 'separator section_header_holder'},[
					createElement('div', {id:'field_'+i+'_all',className:'field_label block_select_all littleButton oddBlue',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){self.selectBlock(this);},style:'float:right; margin-top:4px;'},[createElement("span",{className:"resourceIcon checkAll16"})]),
					createElement('div', {id:'field_'+i+'_none',className:'field_label block_select_none littleButton oddBlue',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){self.deselectBlock(this);},style:'float:right; margin-top:4px;'},[createElement("span",{className:"resourceIcon uncheckAll16"})]),
					styleItems[0]=createElement('a', {className:'separator_label text_border_sep hottracking', href:"javascript:void(0);", textContent:label, onclick:function(){self.toggle(i,true);}}),
					counterHolder=createElement("span",{className:"counter"}),
					styleItems[1]=(nextElem=createElement('div', {id:'field_'+i, className:'section_kids',"data-ft":value, style:"display:"+((value=="none")?"none":"block")+";"}))
				]);
				break;
			case 'optionblock':
				elem = createElement("div", {title:title||'', className: 'config_var underline'},[
					createElement('label', {textContent:label, className:'optionblock_label', "for":'field_'+i}),
					createElement('div', {id:'field_'+i+'_all',className:'field_label block_select_all littleButton oddBlue',type:((field.hideSelectAll)?'hidden':'button'),title:'Select All',onclick:function(){self.selectBlock(this);}},[createElement("span",{className:"resourceIcon checkAll16"})]),
					createElement('div', {id:'field_'+i+'_none',className:'field_label block_select_none littleButton oddBlue',type:((field.hideSelectAll)?'hidden':'button'),title:'Select None',onclick:function(){self.deselectBlock(this);}},[createElement("span",{className:"resourceIcon uncheckAll16"})]),
					createElement('br'),
					createElement('input', {id:'field_'+i, type:'hidden', value:''}),
				]);
				styleItems[0]=elem;
				break;
			case 'textarea':
				elem = createElement("span", {title:title||'', className: 'config_var'},[
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
				elem = createElement("span", {title:title||'', className: 'config_var '+(field.format||'block')},[
					createElement('span', {textContent:label, className:'field_label'}),
					createElement('span', {id:'field_'+iboxes},boxes)
				]);
				styleItems[0]=elem;
				break;
			case 'select':
				var options = [];
				if (isObject(Options)) for (var j in Options) options.push(createElement('option',{textContent:Options[j],value:j,selected:(j==value)}));
				else options.push(createElement("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));

				elem = createElement(isKid ? "span" : "div", {title:title||'', className: 'config_var'},[
					createElement('span', {textContent:label, className:'field_label'}),
					createElement('select',{id:'field_'+i},options)
				]);
				styleItems[0]=elem;
				break;
			case 'button':
				var tmp;
				elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
					(tmp=createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:title||''}))
				]);
				if (field.script) self.addEvent(tmp, 'click', field.script);
				styleItems[0]=elem;
				break;
			case 'button_highlight':
				var tmp;
				elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
					createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:title||'',onclick:function(){self.highlightElements(field.options,field.clearfirst);}})
				]);
				styleItems[0]=elem;
				break;
			case 'button_selectmulti':
				var tmp;
				elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
					createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:title||'',onclick:function(){self.selectElements(field.options,field.clearFirst);}})
				]);
				styleItems[0]=elem;
				break;
			case 'button_selectprefix':
				var tmp;
				elem = createElement("span", {className: 'config_var '+(field.format||'inline')},[
					createElement('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:title||'',onclick:function(){self.selectElementsByPrefix(field.prefix,field.clearPrefix);}})
				]);
				styleItems[0]=elem;
				break;
			case 'hidden':
				elem = createElement("span", {title:title||'', className: 'config_var'},[
					createElement('input', {id:'field_'+i, type:'hidden', value:value})
				]);
				styleItems[0]=elem;
				break;
			case 'link':
				elem = createElement("span", {title:title||'', className: (field.format||'block')},[
					createElement('a', {id:'field_'+i, href:field.href, title:title||'', textContent:field.label, target:'_blank', className:'field_label link_label'+(field.newitem?' newopt':'')})
				]);
				styleItems[0]=elem;
				break;

			case 'message':
				elem = createElement("span", {title:title||'', className: (field.format||'block')},[
					createElement('span', {id:'field_'+i, title:title||'', textContent:field.textContent, className:'field_label message_text'+(field.newitem?' newopt':'')})
				]);
				styleItems[0]=elem;
				break;
				
			case 'selecttime':
				//creates an interval from some text input
				var timevalue = calcTime(value);
				var timedays = parseInt(timevalue/day);
				var timehours = parseInt((timevalue-(timedays*day))/hour);
				var timeminutes = parseInt((timevalue-(timehours*hour)-(timedays*day))/minute);
				var timeseconds = parseInt((timevalue-(timeminutes*minute)-(timehours*hour)-(timedays*day))/second);
				
				var daynode, hournode, minutenode, secondnode, returnnode;
				var fnCalcTime = function(){
					returnnode.value = "t:"+daynode.value+"d:"+hournode.value+"h:"+minutenode.value+"m:"+secondnode.value+"s"
				};

				elem = createElement("span", {title:title||'', className: 'config_var'},[
					createElement('span', {textContent:label, className:'field_label'}),
					returnnode=createElement('input', {id:'field_'+i,value:value,type:"hidden"}),
					
					daynode=createElement('input', {value:timedays, type:"number", onchange:fnCalcTime,size:2}),
					createElement('span', {textContent:"d", className:'field_label'}),
					hournode=createElement('input', {value:timehours, type:"number", onchange:fnCalcTime,size:2}),
					createElement('span', {textContent:"h", className:'field_label'}),
					minutenode=createElement('input', {value:timeminutes, type:"number", onchange:fnCalcTime,size:2}),
					createElement('span', {textContent:"m", className:'field_label'}),
					secondnode=createElement('input', {value:timeseconds, type:"number", onchange:fnCalcTime,size:2}),
					createElement('span', {textContent:"s", className:'field_label'}),
				]);
				styleItems[0]=elem;
				break;
				
				
			//deprecated
			case 'tabcontrol':
				elem = createElement("div",{title:title||'', className: 'tab_container'});
				styleItems[0]=elem;
				break;
			case 'tabelement':
				var value2 = self.values[field.key];
				elem = createElement("span",{title:title||'',className:'tab_element'},[
					createElement('a', {id:'tab_'+field.key,className:'tab_header text_border_sec hottracking'+((value2=='block')?" tab_selected":""),href:"javascript:void(0);", textContent:label, onclick:function(){self.toggleTab(field.key);}})
				]);
				styleItems[0]=elem;
				break;
			case 'tabbody':
				elem = createElement("div",{id:'field_'+i,title:title||'',"data-ft":value,style:("display:"+value+";"),className:'tab_body'});
				styleItems[0]=elem;
				break;
			//end deprecated
				
				
			case 'tab': //tab shortform
				var objRef=null;
				if (null && isForms2Ready) {
					//build tabs using the jsForms library
				
					//objReference should be a jsForms.tabControl object
					if (objReference) {
						//we have a reference to a jsForms.tabControl object
						objRef=objReference;
					} else {
						//need to realize a tabControl for this tab
						objRef=new jsForms.tabControl({
							dock:"fill",
							preventAutoSelectTab:true,
						});
					}
					//add our tab as a jsForms.tabPage
					var thisTab = objRef.addTab({
						text:label,
					});
					//prepare for child elements to be added
					elem=objRef.node; //always return the tabControl
					nextElem=thisTab.pageNode;
					
					//set tab and tab page to be stylized
					styleItems[0]=thisTab.buttonNode;
					styleItems[1]=nextElem;
					
					
				} else {	
					//build tabs using this library
				
					//create tab container if needed
					if (!tabParent){
						tabParent = createElement("div",{className:'tab_container'},[
							tabHeader=createElement("div",{className:'tab_header_container'}) 
						]);
					}
					
					//ALWAYS return the tabContainer element so the next
					//element can join with it if needed
					elem=tabParent;

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
							createElement('a', {id:'tab_'+i,className:'tab_header text_border_sec hottracking'+((value=='block')?" tab_selected":""),href:"javascript:void(0);", onclick:function(){self.toggleTab(i);}},[
								createElement("span",{textContent:label}),
								counterHolder=createElement("span",{className:"counter"})
							])
						])
					);
						
					//create tab body
					tabParent.appendChild(
						styleItems[1]=(nextElem=createElement("div",{id:'field_'+i,title:title||'',"data-ft":value,style:("display:"+value+";"),className:'tab_body'}) )
					);
				}
				
				break;

			case 'text':
			case 'float':
			case 'long':
			case 'int':
			case 'colorbox':
				var box;
				if (isForms2Ready && field.type=="colorbox") {
					var o,l;
					elem = createElement(isKid ? "span" : "div", {title:title||'', className: 'config_var tablerow'},[
						createElement('span', {textContent:label, className:'field_label tablecell'}),
						box=(o=jsForms.createElement("colorPicker",{
							dropDownSize:{height:"200px"},
							text:value,
						})).node
					]);
					o.textNode.id="field_"+i;
					box.className="tablecell";
				} else {
					elem = createElement(isKid ? "span" : "div", {title:title||'', className: 'config_var'},[
						createElement('span', {textContent:label, className:'field_label'}),
						box=createElement('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					]);
				}
				styleItems[0]=elem;
				if (field.type=="colorbox" && !isForms2Ready){
					box.style.setProperty("background-color",value,"important");
					box.style.color="white";
					box.style.textShadow="-1px -1px 1px #000000, 1px 1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000";
					box.style.fontWeight="bold";
					box.onchange=function(){
						this.style.setProperty("background-color",this.value,"important");
					}
				}
				break;

			default:
			case 'checkbox':
				elem = createElement("span", {title:title||'', className: 'config_var '+(field.format||'block')},[
					createElement('label', {textContent:label, className:'field_label', "for":'field_'+i}),
					createElement('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
				]);
				styleItems[0]=elem;
		}
		
		//cleanup
		tabContainer=null; tabParent=null;

		//add special classes and styles
		if (styleItems.length) for (si=0,silen=styleItems.length;si<silen;si++){
			styleItems[si].className+=(field.newitem?' newopt'+((field.newitem===true)?"":field.newitem):'')+" "+(field.css||"");
			if(field.backgroundColor) styleItems[si].style.backgroundColor=field.backgroundColor;
			if(field.fontColor) styleItems[si].style.color=field.fontColor;
		}

		//add its kids
		var newCount=(field.newitem?1:0);
		if (field.kids) {
			var kids=field.kids,prev;
			for (var kid in kids) {
				var childRet = this.addToFrame(kids[kid], kid, true, prev, objRef);
				(nextElem||elem).appendChild(prev=childRet.elem);
				newCount=newCount+childRet.newCount
			}
		}
		
		//display the new item count for this branch
		if (newCount && (swapType=="tab" || swapType=="section" || swapType=="separator") && counterHolder){
			counterHolder.textContent=newCount;
			counterHolder.style.display="inline-block";
			counterHolder.title=newCount+" new items in this section.";
			counterHolder.className+=" newOpt"; //make it green
		}

		//return this branch and its new item count
		return {elem:elem, newCount:newCount};
	}catch(e){log("Config.addToFrame: "+e);}};

	this.exportSettings = function(){try{
		var v = JSON.stringify(this.values)
		prompt("Copy and save these settings with a text editor such as notepad.",v);
	}catch(e){log("Config.exportSettings: "+e);}};

	this.importSettings = function(){try{
		var ask=this.confirms.import
		if (!ask || (ask && confirm("This will overwrite your current settings. Are you sure?"))) {
			var v = prompt("Paste saved settings below.",null);
			if (v!=null && v!=""){
				v=JSON.parse(v);
				if (v) {
					this.values = v;
					this.configure();
					this.save();
					alert("Please refresh your browser to use the new settings.");
				} else {
					alert("Could not import settings!");
				}
			}
		}
	}catch(e){log("Config.importSettings: "+e);}};

	this.css = {
		basic: 'body {background:#FFFFFF;}\n' +
		'.indent40 {margin-left:40%;}\n' +
		'* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
		'.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
		'.block {display:block;}\n' +
		'.saveclose_buttons {margin:16px 10px 10px 10px;padding:2px 12px 2px 12px;}\n' +
		'.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
		'.config_header {font-size:20pt; margin:0;}\n' +
		'.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
		'.center {text-align:center;}\n' +
		'.config_var {margin:0 0 4px 0; display:block;}\n' +
		'input[type="radio"] {margin-right:8px;}\n'+


		"body {color: buttontext !important; margin:0 !important; background:buttonface !important;}\n"+
		".logo {width:128px; height:74px;}\n"+

		'.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
		".section_header {border:1px solid #000000; border-radius: 5px 5px 5px 5px; color:white !important;background:buttonshadow !important; display:block; font-size: 15px !important; font-weight: 700 !important; line-height:23px !important;text-decoration:none !important;}\n"+
		'.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
		".separator_label {border:1px solid #007195; border-radius: 5px 5px 5px 5px; font-size: 15px !important; line-height:19px !important; font-weight: 700 !important; color:white !important; text-decoration:none !important; margin:0 !important; padding:1px 0 1px 6px !important; display:block !important; background:buttonshadow !important;}\n"+
		".section_header_holder {border-radius: 5px 5px 5px 5px;padding:0 6px 0 6px !important; margin-bottom:6px !important; }\n"+
		".section_kids {background:buttonface !important;border-radius: 0 0 5px 5px;border: 1px solid #000000 !important;border-top:0 !important;padding: 0 6px 6px !important;margin: 0 6px 0 6px !important;}\n"+
		"#header {font-size:18px !important;}\n"+
		"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
		"div.config_var {margin:0 !important; padding: 2px 0 2px 0 !important;}\n"+
		".optionblock_label {display:inline-block; font-size:16px !important; font-weight:bold; padding-top:10px; color:buttontext;}\n"+
		//".block_select_all {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/6ih93q.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
		//".block_select_none {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/2lk2xyw.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
		".field_label {font-size:11px !important;}\n"+
		".link_label {line-height:19px; position:relative;z-index:0;padding:2px 6px 2px 6px; border-radius: 0px 25px 0px 25px / 0px 100px 0px 100px; margin-left:6px !important; text-decoration:none;border: 1px solid black; color:black !important; background:#EFF2F7 !important;}\n"+
		".link_label:hover, .link_label:active {z-index:1; background:#D8DFEA !important;}\n"+
		"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}\n"+
		"span > label.field_label {margin-right:0 !important;}\n"+
		"select, input[type=\"text\"], textarea {background-color:window !important; color:windowtext !important; border:none !important;}\n"+

		".tab_element {display:inline-block !important;}\n"+
		".tab_header {background:buttonshadow !important;color:buttonface !important; padding:2px 6px;border:1px solid #000000; border-radius: 5px 5px 0 0; margin:0 !important; font-size: 13px !important; line-height:19px !important; font-weight: 700 !important; text-decoration:none !important;position:relative;z-index:0;}\n"+
		".hottracking:hover {background:highlight !important;}\n"+
		".tab_body {padding: 10px !important;margin: 0 !important; background:buttonface !important;border-radius: 0 5px 5px 5px;border: 1px solid #000000 !important;display:none;position:relative;z-index:1;top:0px;}\n"+
		".tab_selected {background:buttonface !important;border-bottom:0 !important;color:black !important; z-index:2; text-shadow:none !important;}\n"+

		".inline {display:inline-block;}\n"+
		".block {display:block;}\n"+
		".tablerow {display:table-row;}\n"+
		".tablecell {display:table-cell;}\n"+
		".floatright {float:right;}\n"+
		".floatleft {float:left;}\n"+

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

		".text_border_sep {font-family:tahoma; text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;text-transform:uppercase; font-weight:900 !important;}\n"+
		".text_border_sec {font-family:tahoma; text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;text-transform:uppercase; font-weight:900 !important;}\n"+

		"#buttons_holder {bottom: 0; position: fixed; right: 0; z-index: 1;}\n"+
		".bigSpacer {height:50px; display:block;}\n"+

		//little button div
		".littleButton {background-color:threedshadow; border-radius:5px; margin:1px; display:inline-block; vertical-align:middle;}\n"+
		".littleButton:hover {background-color:highlight !important;}\n"+
		".littleButton>img {position:relative; display:block;}\n"+
		".littleButton.oddOrange {background-color:#FF9968;}\n"+
		".littleButton.oddBlack {background-color:#82976E;}\n"+
		".littleButton.oddBlue {background-color:#51D1EA;}\n"+
		".littleButton.oddGreen {background-color:#B7E54F;}\n"+
			
		".counter {margin-left: 5px; margin-right:-5px; font-size: .75em; padding: 2px; border: 1px solid black; border-radius: 4px; position: relative; top: -1em; display: none; line-height:1em; text-shadow:none; color:white;}\n"+
		
		"", //leave here
		
		user: ""
	};

	this.center = function() {try{
		var node = this.frame;
		if (!node) return;
		var style = node.style, beforeOpacity = style.opacity;
		if(style.display=='none') style.opacity='0';
		style.display = '';
		style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
		style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
		style.opacity = '1';
	}catch(e){log("Config.center: "+e);}};

	this.addEvent = function(el,ev,scr) {try{
		el.addEventListener(ev, function() { typeof scr == 'function' ? doAction(scr) : eval(scr) }, false); 
	}catch(e){log("Config.addEvent: "+e);}};

	this.toggle = function(e,newMode) {try{
		var node=this.frame.contentDocument.getElementById((newMode)?'field_'+e:e);
		node.style.display=(node.style.display!='none')?'none':'block';
		node.setAttribute("data-ft",node.style.display);
		if (this.useScrollIntoView && node.style.display!='none') node.parentNode.scrollIntoView(true);
		//Config.setValue(e, node.style.display);
	}catch(e){log("Config.toggle: "+e);}};

	this.toggleTab = function(e) {try{
		var tabBodyNode=this.frame.contentDocument.getElementById('field_'+e);
		var tabHeaderNode=this.frame.contentDocument.getElementById('tab_'+e);

		//unselect selected tabs
		var tabCtrl = tabBodyNode.parentNode;
		var tabs=selectNodes("./span[contains(@class,'tab_element')]/a[contains(@class,'tab_selected')] | ./div[contains(@class,'tab_header_container')]/span[contains(@class,'tab_element')]/a[contains(@class,'tab_selected')]",{node:tabCtrl,doc:$("Config").contentDocument});
		if (tabs) for (var i=0,tab;(tab=tabs.snapshotItem(i));i++) {
			var id=tab.id.substring(4);
			tab.className = tab.className.replace(' tab_selected','');
			var node=$('field_'+id,$("Config").contentDocument);
			node.style.display='none';
			node.setAttribute("data-ft","none");
			tab=null;
		}

		//select the tab
		tabHeaderNode.className += " tab_selected";
		tabBodyNode.style.display="block";
		tabBodyNode.setAttribute("data-ft","block");

		//bring into view
		if (this.useScrollIntoView) tabHeaderNode.scrollIntoView(true);

		//cleanup
		tabBodyNode = null;tabHeaderNode=null;tabCtrl=null;tabs=null;
	}catch(e){log("Config.toggleTab: "+e);}};

	//initialize
	if (exists(params)) {
		this.init(params);
	}
	
	log("Config initialized");
	return self;
};	
})();