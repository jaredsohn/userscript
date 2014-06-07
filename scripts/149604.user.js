// ==UserScript==
// @name           Forms2 Test
// @description    For testing only
// @include        http://www.facebook.com/pages/FB-Wall-Manager/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0
// @copyright      Charlie Ewing except where noted
// @require        http://userscripts.org/scripts/source/29910.user.js
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @require        http://userscripts.org/scripts/source/129006.user.js
// @require        http://userscripts.org/scripts/source/130453.user.js
// @require        http://userscripts.org/scripts/source/130454.user.js
// ==/UserScript==

// Based on script built by Joe Simmons in Farmville Wall Manager

(function() {


	var wmForms = {
	
		//basic parts for every element
		basicElement=function(params){try{
			var self=this;
			params=params||{};
			
			//defaults
			self._enabled=true;
			self._tag="";
			self._causesValidation=true;
			self.parent=null; //container element
			
			//events
			self.onCreated=null;
			
			//set the accessibility of the element			
			self.__defineGetter__("enabled", function(){
				return self._enabled;
			});		   
			self.__defineSetter__("enabled", function(val){
				self._enabled = cBool(val);
			});

			//set the tag of the element
			self.__defineGetter__("tag", function(){
				return self._tag;
			});		   
			self.__defineSetter__("tag", function(val){
				self._tag = (val as string);
			});

			//set if events can be raised
			self.__defineGetter__("causesValidation", function(){
				return self._causesValidation;
			});		   
			self.__defineSetter__("causesValidation", function(val){
				self._causesValidation = cBool(val);
			});

			//init
			for (var p in params) self[p]=params[p];
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log(""+e);}},
	
		//basic parts for visual elements
		visualElement=function(params){try{
			var self=this;
			params=params||{};
			
			//defaults
			self._backColor="";
			self._foreColor="";
			self._font="";
			self._cursor="";
			self._visible=true;
			self._position={top:"",left:"",right:"",bottom:""};
			self._size={height:"",width:""};
			self._maximumSize={height:"",width:""};
			self._minimumSize={height:"",width:""};
			self._margin={top:"",left:"",right:"",bottom:""};
			self._padding={top:"",left:"",right:"",bottom:""};
			self._node=null;
			//_backgroundImage: url
			//_backgroundImageLayout: "", time, stretch, center, zoom
			self._borderStyle="None"; //[None, FixedSingle, Fixed3D]
			
			//events
			self.onClick=null;
			self.onFocus=null;
			self.onBlur=null;

			//set css background color
			self.__defineGetter__("backColor", function(){
				return self._backColor;
			});
			self.__defineSetter__("backColor", function(val){
				self._backColor = (val as string);
			});
			
			//set css foreground color
			self.__defineGetter__("foreColor", function(){
				return self._foreColor;
			});		   
			self.__defineSetter__("foreColor", function(val){
				self._foreColor = (val as string);
			});
			
			//set the font used in both the box and the list
			self.__defineGetter__("font", function(){
				return self._font;
			});			   
			self.__defineSetter__("font", function(val){
				self._font = (val as string);
			});

			//set the cursor used in the element
			self.__defineGetter__("cursor", function(){
				return self._cursor;
			});			   
			self.__defineSetter__("cursor", function(val){
				self._cursor = (val as string);
			});

			//set if the dropdown is visible
			self.__defineGetter__("visible", function(){
				return self._visible;
			});			   
			self.__defineSetter__("visible", function(val){
				self._visible = cBool(val);
			});

			//set the location based on the upper left of the container box
			//values are copied from the passed object so that a reference to the
			//passed object does not remain
			self.__defineGetter__("position", function(){
				return self._position;
			});			   
			self.__defineSetter__("position", function(val){
				if (isObject(val)) {
					self._position.top=val.top||"";
					self._position.left=val.left||"";
					self._position.right=val.right||"";
					self._position.bottom=val.bottom||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.position.set: input was not an object");
					self._position={top:"",left:"",right:"",bottom:""}
				}
			});

			//set the height and width of the box
			self.__defineGetter__("size", function(){
				return self._size;
			});			   
			self.__defineSetter__("size", function(val){
				if (isObject(val)) {
					self._size.height=val.height||"";
					self._size.width=val.width||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.size.set: input was not an object");
					self._size={height:"",width:""}
				}
			});

			//set the max height and width of the box
			self.__defineGetter__("maximumSize", function(){
				return self._maximumSize;
			});			   
			self.__defineSetter__("maximumSize", function(val){
				if (isObject(val)) {
					self._maximumSize.height=val.height||"";
					self._maximumSize.width=val.width||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.maximumSize.set: input was not an object");
					self._maximumSize={height:"",width:""}
				}
			});

			//set the min height and width of the box
			self.__defineGetter__("minimumSize", function(){
				return self._minimumSize;
			});			   
			self.__defineSetter__("minimumSize", function(val){
				if (isObject(val)) {
					self._minimumSize.height=val.height||"";
					self._minimumSize.width=val.width||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.minimumSize.set: input was not an object");
					self._minimumSize={height:"",width:""}
				}
			});

			//set the margins of the object {top, left, right, bottom}
			self.__defineGetter__("margin", function(){
				return self._margin;
			});			   
			self.__defineSetter__("margin", function(val){
				if (isObject(val)) {
					self._margin.top=val.top||"";
					self._margin.left=val.left||"";
					self._margin.right=val.right||"";
					self._margin.bottom=val.bottom||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.margin.set: input was not an object");
					self._margin={top:"",left:"",right:"",bottom:""}
				}
			});

			//set the padding of the object {top, left, right, bottom}
			self.__defineGetter__("padding", function(){
				return self._padding;
			});			   
			self.__defineSetter__("padding", function(val){
				if (isObject(val)) {
					self._padding.top=val.top||"";
					self._padding.left=val.left||"";
					self._padding.right=val.right||"";
					self._padding.bottom=val.bottom||"";
				} else {
					//value was not an object
					log("wmForms.visualElement.padding.set: input was not an object");
					self._padding={top:"",left:"",right:"",bottom:""}
				}
			});

			//set the border style of the element
			self.__defineGetter__("borderStyle", function(){
				return self._borderStyle;
			});
			self.__defineSetter__("borderStyle", function(val){
				self._borderStyle = (val as string);
			});

			//init
			for (var p in params) self[p]=params[p];
			
			//draw the housing
			self._node=createElement("div",{
				style:(
					"display:"+(self._visible?"inline-block":"none")+";"
				)
			});

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("wmForms.visualElement.init: "+e);}},
	
		//textbox specific parts
		textBox=function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new wmForms.basicElement() );
			self=extend(self,new wmForms.visualElement() );

			//defaults
			self._text="";
			self._emptyText="";
			self._maxLength=32767;
			self._textNode=null;
			
			//adjust existing data
			self._borderStyle="FixedSingle";
			
			//events
			self.onChange=null;

			//set the text shown in the box
			self.__defineGetter__("text", function(){
				return self._text;
			});
			self.__defineSetter__("text", function(val){
				self._text = (val as string);
				if (self.onChange) doAction(function(){self.onChange(self);});
			});

			//text to display when text=""
			self.__defineGetter__("emptyText", function(){
				return self._emptyText;
			});
			self.__defineSetter__("emptyText", function(val){
				self._emptyText = (val as string);
			});

			//set the max number of characters that can be entered in the box
			self.__defineGetter__("maxLength", function(){
				return self._maxLength;
			});
			self.__defineSetter__("maxLength", function(val){
				self._maxLength = (val as integer);
			});

			//get the default value as text
			self.value=get function(){
				return self._text;
			}

			//init
			for (var p in params) self[p]=params[p];
						
			//draw the 
			self._textNode=self._node.appendChild(createElement("input",{
				maxLength:self._maxLength, 
				value:self._text, 
				title:self._emptyText, 
				enabled:self._enabled, 
				style:(
					"display:block;"+
					"width:"+self._size.width+";"+
					"height:"+self._size.height+";"+
					"minWidth:"+self._minimumSize.width+";"+
					"minHeight:"+self._minimumSize.height+";"+
					"maxWidth:"+self._maximumSize.width+";"+
					"maxHeight:"+self._maximumSize.height+";"+
					"margin-top:"+self._margin.top+";"+
					"margin-left:"+self._margin.left+";"+
					"margin-right:"+self._margin.right+";"+
					"margin-bottom:"+self._margin.bottom+";"+
					"top:"+self._position.top+";"+
					"left:"+self._position.left+";"+
					"right:"+self._position.right+";"+
					"bottom:"+self._position.bottom+";"+
					"font-family:"+self._font+";"+
					"background-color:"+self._backColor+";"+
					"color:"+self._foreColor+";"+
				),
			}));
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("wmForms.textBox.init: "+e);}},

		//checkbox specific parts
		checkBox=function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new wmForms.basicElement() );
			self=extend(self,new wmForms.visualElement() );

			//defaults
			var self._checked=false;
			var self._text="";
			var self._value="";
			//_threeState: see checkedState
			//_checkedState: [unchecked, checked, indeterminate]
			//_image
			//_imageAlign: top-center-bottom, left-center-right
			//_textAlign: in relation to checkbox
			//_textImageRelation: [Overlay,ImageAboveText,TextAboveImage,TextBeforeImage,ImageBeforeText]
			//_autoCheck: checks onClick instead of onCheck
			
			//events
			self.onChecked=null;
			self.onUnchecked=null;
			
			//set text
			self.__defineGetter__("text", function(){
				return self._text;
			});
			self.__defineSetter__("text", function(val){
				self._text = (val as string);
			});

			//set value
			self.__defineGetter__("value", function(){
				return self._value;
			});
			self.__defineSetter__("value", function(val){
				self._value = (val as string);
			});

			//set checked state
			self.__defineGetter__("checked", function(){
				return self._checked;
			});
			self.__defineSetter__("checked", function(val){
				self._checked = cBool(val);
			});
			
			//register the initial params
			for (var p in params) self[p]=params[p];
			
			//draw it
			self._checkNode=self._node.appendChild(createElement("input",{
				type:"checkbox",
				textContent:self._text,
				id: self._value,
				checked: self._checked,
			}));
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("wmForms.checkBox.init: "+e);}},
		
		//listbox specific parts
		listBox=function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new wmForms.basicElement() );
			self=extend(self,new wmForms.visualElement() );

			//defaults
			var self._maxItems=32767;
			var self._maxSelectedItems=32767;
			var self._zIndex="999";
			var self._sorted=false;
			var self._listNode=null;
			
			//events
			self.onItemSelected=null;
			self.onItemChecked=null;
			self.onItemUnselected=null;
			self.onItemUnchecked=null;
			self.onMaxItemsSelected=null;
			
			//set the max number of items to show in the list
			self.__defineGetter__("maxItems", function(){
				return self._maxItems;
			});
			self.__defineSetter__("maxItems", function(val){
				self._maxItems = (val as integer);
			});

			//set the max number of items that can be selected
			self.__defineGetter__("maxSelectedItems", function(){
				return self._maxSelectedItems;
			});
			self.__defineSetter__("maxSelectedItems", function(val){
				self._maxSelectedItems = (val as integer);
			});

			//set if the list is to be sorted
			self.__defineGetter__("sorted", function(){
				return self._sorted;
			});
			self.__defineSetter__("sorted", function(val){
				self._sorted = cBool(val);
			});

			//set the z-index of the dropdown portion when open
			self.__defineGetter__("zIndex", function(){
				return self._zIndex;
			});
			self.__defineSetter__("zIndex", function(val){
				self._zIndex = (val as string);
			});

			//register the initial params
			for (var p in params) self[p]=params[p];
			
			//draw it
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("wmForms.listBox.init: "+e);}},

		//combobox, dropdown, select-multi
		comboBox=function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new wmForms.textBox() );
			
			//defaults
			var self._dropDownStyle="dropDown";
			var self._valueMember="value";
			var self._explicitClose=null;
			var self._firstItemSelectsAll=false;
			var self._itemHeight="";
						
			//sub items
			var self._dropDown=new wmForms.listBox({
				visible:((self._dropdownStyle=="simple")?true:false),
				size:{height:self._itemHeight},
				items:{},
				parent:self,
			});

			//events

			//get the dropdown sub object
			self.__defineGetter__("dropDown", function(){
				return self._dropDown;
			});

			//set the dropdown visual style
			//simple: no dropdown, elements shown directly below all the time
			//dropdown: dropdown, elements in hidden list, allow typing in top box
			//dropdownList: same as dropdown minus typing in top box
			self.__defineGetter__("dropDownStyle", function(){
				return self._dropDownStyle;
			});
			self.__defineSetter__("dropDownStyle", function(val){
				var oldStyle=_dropDownStyle;
				self._dropDownStyle = (val as string);
				//change the sub element
				if (self._dropDownStyle!=oldStyle){
					self._dropDown.visible=((self._dropdownStyle=="simple")?true:false);
				}
				
			});

			//set the parameter of the sub item that is to be used as a value
			self.__defineGetter__("valueMember", function(){
				return self._valueMember;
			});
			self.__defineSetter__("valueMember", function(val){
				self._valueMember = (val as string);
			});

			//an option to display at the end of the
			//list that can be clicked to close the dropdown
			self.__defineGetter__("explicitClose", function(){
				return self._explicitClose;
			});
			self.__defineSetter__("explicitClose", function(val){
				self._explicitClose = val;
			});

			//set if the special selectAll option appears
			self.__defineGetter__("firstItemSelectsAll", function(){
				return self._firstItemSelectsAll;
			});
			self.__defineSetter__("firstItemSelectsAll", function(val){
				self._firstItemSelectsAll = cBool(val);
			});

			//get the default value as text
			self.value=function(){
				var ret=[];
				var sel=self.selectedItems();
				for (var i=0; i<sel.length; i++){
					//skip the first element if its a select all button
					if (self._firstItemSelectsAll && i==0) continue;
					ret.push(sel[i][self._valueMember]);
				}
				return ret;
			}
			
			//get an array of selected options/checkboxes
			self.selectedItems=function(){
				var ret=[];
				for (var i in self._dropDown.items){
					if (exists(self._dropDown.items[i].selected)) {
						//check for option types that are selected
						if (self._dropDown.items[i].selected) ret.push(self._dropDown.items[i]);
					} else if (exists(self._dropDown.items[i].checked)) {
						//check for checkbox types that are checked
						if (self._dropDown.items[i].checked) ret.push(self._dropDown.items[i]);
					}
				}
				return ret;
			}

			//register the initial params
			for (var p in params) self[p]=params[p];

			//draw it
			//text portion is already drawn @ _textNode
			//list portion is already drawn @ _dropDown._listNode
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("wmForms.comboBox.init: "+e);}},
	}
})();