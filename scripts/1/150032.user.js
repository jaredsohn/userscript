// ==UserScript==
// @name           JS Forms Library B
// @description    Encapulates and extends many HTML forms elements.
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @include        file:///C:/Users/Charlie/Desktop/*
// @version        0.0.0.12
// @copyright      Charlie Ewing except where noted
// ==/UserScript==

//this script requires some functions in the WM Common Library
//this script needs access to a pre-defined JSON object

(function() {
	var sandbox=this;
		
	//element helper functions
	sandbox.elementOuterWidth=function(e){
		return parseInt(e.offsetWidth||0);
	};
	sandbox.elementOuterHeight=function(e){
		return parseInt(e.offsetHeight||0);
	};
	sandbox.elementInnerWidth=function(e){
		var curWidth = e.style.width;
		e.style.width="0";
		var difference = elementOuterWidth(e);
		e.style.width=curWidth;
		return elementOuterWidth(e)-difference;
	};	
	sandbox.elementInnerHeight=function(e){
		var curHeight = e.style.height;
		e.style.height="0";
		var difference = elementOuterHeight(e);
		e.style.height=curHeight;
		return elementOuterHeight(e)-difference;
	};		

	//forms library B
	sandbox.jsForms = {
	
		colorData:{
			webSafe:[],
			system:["ActiveBorder","ActiveCaption","ActiveCaptionText","AppWorkspace","ButtonFace","ButtonHighlight","ButtonShadow","Control","ControlDark","ControlDarkDark","ControlLight","ControlLightLight","ControlText","Desktop","GradientActiveCaption","GradientInactiveCaption","GrayText","Highlight","HighlightText","HotTrack","InactiveBorder","InactiveCaption","InactiveCaptionText","Info","InfoText","Menu","MenuBar","MenuHighlight","MenuText","ScrollBar","Transparent","Window","WindowFrame","WindowText"],
			colorWords:["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenrod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","Firebrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","Goldenrod","Gray","Green","GreenYellow","Honeydew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenrodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquamarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenrod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"],
			custom:[
				{name:"Attribute",value:"rgba(255, 0, 0, 0.75)"},
				{name:"BlueWindow",value:"rgba(156, 246, 255, 0.75)"},
				{name:"Bookmark",value:"rgba(191, 210, 249, 0.75)"},
				{name:"BookmarkText",value:"rgba(128, 128, 128, 0.75)"},
				{name:"Breakpoint",value:"rgba(150, 58, 70, 0.75)"},
				{name:"BreakpointText",value:"rgba(255, 219, 163, 0.75)"},
				{name:"BrownText",value:"rgba(88, 60, 31, 0.75)"},
				{name:"Buy",value:"rgba(83, 196, 251, 0.75)"},
				{name:"Caret",value:"rgba(128, 0, 255, 0.75)"},
				{name:"CDATA",value:"rgba(255, 128, 0, 0.75)"},
				{name:"Close",value:"rgba(195, 70, 58, 0.75)"},
				{name:"Comment",value:"rgba(0, 100, 0, 0.75)"},
				{name:"CurrentLine",value:"rgba(232, 232, 232, 0.75)"},
				{name:"Experimental",value:"rgba(156, 244, 156, 0.75)"},
				{name:"GoTo",value:"rgba(102, 204, 51, 0.75)"},
				{name:"GreenWindow",value:"rgba(207, 255, 180, 0.75)"},
				{name:"Hint",value:"rgba(174, 129, 235, 0.75)"},
				{name:"ID",value:"rgba(0, 128, 255, 0.75)"},
				{name:"InactiveSelected",value:"rgba(191, 205, 219, 0.75)"},
				{name:"InactiveSelectedText",value:"rgba(67, 78, 84, 0.75)"},
				{name:"ItemDone",value:"#91FF91"}, 
				{name:"ItemFailed",value:"#FF7171"}, 
				{name:"ItemProcessing",value:"#FFFF7D"}, 
				{name:"Keyword",value:"rgba(0, 0, 255, 0.75)"},
				{name:"LineNumber",value:"rgba(43, 145, 175, 0.75)"},
				{name:"Number",value:"rgba(255, 0, 0, 0.75)"},
				{name:"PRE",value:"rgba(246, 246, 242, 0.75)"},
				{name:"QuoteText",value:"rgba(85, 85, 85, 0.75)"},
				{name:"Regex",value:"rgba(128, 0, 255, 0.75)"},
				{name:"SelectedText",value:"rgba(192, 192, 192, 0.75)"},
				{name:"SmartHightlighting",value:"rgba(0, 255, 0, 0.75)"},
				{name:"String",value:"rgba(163, 21, 21, 0.75)"},
				{name:"Tag",value:"rgba(0, 0, 255, 0.75)"},
				{name:"TanWindow",value:"rgba(255, 233, 180, 0.75)"},
				{name:"TrackChange",value:"rgba(108, 226, 108, 0.75)"},
				{name:"Unsaved",value:"rgba(255, 238, 98, 0.75)"},
				{name:"Value",value:"rgba(0, 0, 0, 0.75)"}
				
			]
		},
	
		globalStyle:function(){
			//control element styles
			return ".jsfButton {"+
				//"display: block;"+
				"width: 17px;"+
				"border: 1px solid buttonshadow;"+
				"border-radius: 15%;"+
				"padding: 0px;"+
				"line-height: 0;"+
				"font-size: 16px;"+
				"box-shadow: 0 5px 10px buttonhighlight inset, 0 3px 10px buttonhighlight inset,0 -5px 10px buttonshadow inset, 1px 1px 0 buttonhighlight inset, -1px -1px 0 buttonhighlight inset;"+
				"vertical-align: middle;"+
				"background-color: buttonface;"+
				"position:relative;"+
				"}\n"+
			".jsfButton:hover {"+
				"border: 1px solid highlight;"+
				"box-shadow: 0 5px 10px buttonhighlight inset, 0 3px 10px buttonhighlight inset,0 -3px 10px highlight inset, 1px 1px 0 buttonhighlight inset, -1px -1px 0 buttonhighlight inset;"+
				"}\n"+
			".jsfButton>span {position:absolute;}\n"+
			
			//tab styles
			".jsfTabControl>.tabs {display:block;}\n"+
			".jsfTabControl>.pages {overflow:auto; display:block; padding:3px; border-radius: 0 5px 5px 5px; border: 1px solid; z-index:1; position:relative; top:-1px; background-color:buttonface; padding:5px;}\n"+
			".jsfTabControl>.pages>div {display:block; height:100%;}\n"+
			".jsfTab {z-index:0; top:2px; background-color:buttonshadow; display:inline-block;border:1px solid; border-bottom:none; border-radius:5px 5px 0 0; padding: 4px 8px; position:relative;}\n"+
			".jsfTab.selected {z-index:999; top:0; background-color:buttonface;}\n"+
			".jsfTab>img {vertical-align:middle; width:16px; height:16px; padding-right:4px; display:inline-block;}\n"+
			".jsfTab>div {vertical-align:middle; display:inline-block;}\n"+
			
				//left side tabs variant
				".jsfTabControl.alignLeft>.tabs {display:inline-block; vertical-align:top;}\n"+
				".jsfTabControl.alignLeft>.pages {display:inline-block; vertical-align:top; left:-1px; top:0;}\n"+
				".jsfTabControl.alignLeft>.tabs>.jsfTab {border-radius:5px 0 0 5px; border:1px solid; border-right:none; display:block; left:2px; top:0;}\n"+
				".jsfTabControl.alignLeft>.tabs>.jsfTab.selected {left:0;}\n"+
				".jsfTabControl.alignLeft>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.alignLeft>.tabs>.jsfTab>div {}\n"+
		
				//right side tabs variant
				".jsfTabControl.alignRight>.tabs {display:inline-block; vertical-align:top;}\n"+
				".jsfTabControl.alignRight>.pages {display:inline-block; vertical-align:top; right:-1px; top:0; border-radius:5px 0 5px 5px;}\n"+
				".jsfTabControl.alignRight>.tabs>.jsfTab {border-radius:0 5px 5px 0; border:1px solid; border-left:none; display:block; right:2px; top:0;}\n"+
				".jsfTabControl.alignRight>.tabs>.jsfTab.selected {right:0;}\n"+
				".jsfTabControl.alignRight>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.alignRight>.tabs>.jsfTab>div {}\n"+

				//bottom tabs variant
				".jsfTabControl.alignBottom>.tabs {}\n"+
				".jsfTabControl.alignBottom>.pages {border-radius:5px 5px 5px 0; top:1px;}\n"+
				".jsfTabControl.alignBottom>.tabs>.jsfTab {border:1px solid; border-top:none; border-radius:0 0 5px 5px; top:-2px;}\n"+
				".jsfTabControl.alignBottom>.tabs>.jsfTab.selected {top:0;}\n"+
				".jsfTabControl.alignBottom>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.alignBottom>.tabs>.jsfTab>div {}\n"+

				//coolbar top variant
				".jsfTabControl.coolBar>.tabs {background-color:window;}\n"+
				".jsfTabControl.coolBar>.pages {top:0; border-radius:0; border:none; border-top:solid 1px windowframe; box-shadow:inset 0 1px buttonhighlight; padding: 15px 11px;}\n"+
				".jsfTabControl.coolBar>.tabs>.jsfTab {margin-left:2px; top:0px; background-color:transparent; border-radius:0; border:none; text-align:center;}\n"+
				".jsfTabControl.coolBar>.tabs>.jsfTab:first-child {margin-left:11px;}\n"+
				".jsfTabControl.coolBar>.tabs>.jsfTab.selected {background-color:activecaption;}\n"+
				".jsfTabControl.coolBar.hotTrack>.tabs>.jsfTab.selected:hover {background-color:activecaption;}\n"+
				".jsfTabControl.coolBar>.tabs>.jsfTab>img {width:32px; height:32px; padding-right:0px;}\n"+
				".jsfTabControl.coolBar>.tabs>.jsfTab>div {display:block; padding-top:5px;}\n"+

				//coolbar left variant
				".jsfTabControl.coolBar.alignLeft>.tabs {}\n"+
				".jsfTabControl.coolBar.alignLeft>.pages {left:0; border:none; border-left:solid 1px windowframe; box-shadow:inset 1px 0 buttonhighlight;}\n"+
				".jsfTabControl.coolBar.alignLeft>.tabs>.jsfTab {left:0px; margin-left:0px; margin-top:2px;}\n"+
				".jsfTabControl.coolBar.alignLeft>.tabs>.jsfTab:first-child {margin-left:0px; margin-top:11px;}\n"+
				".jsfTabControl.coolBar.alignLeft>.tabs>.jsfTab.selected {}\n"+
				".jsfTabControl.coolBar.alignLeft>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.coolBar.alignLeft>.tabs>.jsfTab>div {}\n"+

				//coolbar right variant
				".jsfTabControl.coolBar.alignRight>.tabs {}\n"+
				".jsfTabControl.coolBar.alignRight>.pages {left:0; border:none; border-right:solid 1px windowframe; box-shadow:inset -1px 0 buttonhighlight;}\n"+
				".jsfTabControl.coolBar.alignRight>.tabs>.jsfTab {left:0px; margin-left:0px; margin-top:2px;}\n"+
				".jsfTabControl.coolBar.alignRight>.tabs>.jsfTab:first-child {margin-left:0px; margin-top:11px;}\n"+
				".jsfTabControl.coolBar.alignRight>.tabs>.jsfTab.selected {}\n"+
				".jsfTabControl.coolBar.alignRight>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.coolBar.alignRight>.tabs>.jsfTab>div {}\n"+

				//coolbar bottom variant
				".jsfTabControl.coolBar.alignBottom>.tabs {}\n"+
				".jsfTabControl.coolBar.alignBottom>.pages {border:none; border-bottom:solid 1px windowframe; box-shadow:inset 0 -1px buttonhighlight;}\n"+
				".jsfTabControl.coolBar.alignBottom>.tabs>.jsfTab {}\n"+
				".jsfTabControl.coolBar.alignBottom>.tabs>.jsfTab:first-child {}\n"+
				".jsfTabControl.coolBar.alignBottom>.tabs>.jsfTab.selected {}\n"+
				".jsfTabControl.coolBar.alignBottom>.tabs>.jsfTab>img {}\n"+
				".jsfTabControl.coolBar.alignBottom>.tabs>.jsfTab>div {}\n"+
				
				//hottracking variant
				".hotTrack>.tabs>.jsfTab:hover {background-color:inactivecaption;}\n"+
				".hotTrack>.tabs>.jsfTab.selected:hover {background-color:buttonface;}\n"+
				
			//draw styles
			".jsfblock {display:block !important;}\n"+
			".jsftableRow {display:table-row !important;}\n"+
			".jsftableCell {display:table-cell !important;}\n"+
			".jsfinlineBlock {display:inline-block !important;}\n"+
			".jsfinline {display:inline !important;}\n"+
			".jsftable {display:table !important;}\n"+		
			".jsfhidden {display:none !important;}\n"+
			
			".jsfBlock {display:block !important;}\n"+
			".jsfTableRow {display:table-row !important;}\n"+
			".jsfTableCell {display:table-cell !important;}\n"+
			".jsfInlineBlock {display:inline-block !important;}\n"+
			".jsfInline {display:inline !important;}\n"+
			".jsfTable {display:table !important;}\n"+		
			".jsfHidden {display:none !important;}\n"+
			
		
			//form docking
			".jsfDockTop {position:absolute !important; top:0px !important;}\n"+
			".jsfDockBottom {position:absolute !important; bottom:0px !important;}\n"+
			".jsfDockRight {position:absolute !important; right:0px !important;}\n"+
			".jsfDockLeft {position:absolute !important; left:0px !important;}\n"+

			""//leave here
		},
	
		//basic constructor
		createElement:function(type,params){try{
			if (type=="createElement") {
				log("jsForms.createElement: Whoa! That would create an infinite loop.");
				return null;
			} else if (exists(jsForms[type])) {
				return new jsForms[type](params);
			}
		}catch(e){log("jsForms.createElement: "+e);}},		
	
		//basic parts for every element
		basicElement:function(params){try{
			var self=this;
			params=params||{};
			
			//defaults
			this._enabled=true;
			this.parent=null; //container element
			this.tag=null;
			this.causesValidation=true;
			
			//events
			this.onCreated=null;
			
			//set the accessibility of the element			
			this.__defineGetter__("enabled", function(){
				return this._enabled;
			});		   
			this.__defineSetter__("enabled", function(v){
				this._enabled = cBool(v);
				if (this.node) this.node.enabled=this.enabled;
			});
			
			//enable/disable commands
			this.enable=function(){this.enabled=true;};
			this.disable=function(){this.enabled=false;};

			//init
			for (var p in params) this[p]=params[p];
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.basicElement.init: "+e);}},
	
		//basic parts for visual elements
		visualElement:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basics
			self=extend(self,new jsForms.basicElement() );
			
			//defaults
			this._backColor="";
			this._foreColor="";
			this._font="";//"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif
			this._cursor="";
			this._visible=true;
			this._position={top:"",left:"",right:"",bottom:""};
			this._size={height:"",width:""};
			this._maximumSize={height:"",width:""};
			this._minimumSize={height:"",width:""};
			this._margin={top:"",left:"",right:"",bottom:""};
			this._padding={top:"",left:"",right:"",bottom:""};
			this._node=null;
			this.backgroundNode=null;
			this.borderNode=null;
			//_backgroundImage: url
			//_backgroundImageLayout: "", time, stretch, center, zoom
			this._borderStyle="None"; //[None, FixedSingle, Fixed3D]
			this._drawStyle="inline-block";
			this._borderCSS="1px solid #646464";
			this._borderRadius={topLeft:"",topRight:"",bottomRight:"",bottomLeft:""};
			this._toolTipText="";
			this._dock="none";
			
			//events
			this.onClick=null;
			this.onFocus=null;
			this.onBlur=null;
			
			//add css className
			this.addClassName=function(s){try{
				if (!isArray(s)) s=[s];
				var css=this.node.className;
				for (var w=0,len=s.length;(w<len);w++) {
					var word=s[w];
					this.node.className=css.addWord("jsf"+word);
				}
			}catch(e){log("jsForms.visualElement.addClassName: "+e);}};

			//remove css className
			this.removeClassName=function(s){try{
				if (!isArray(s)) s=[s];
				var css=this.node.className;
				for (var w=0,len=s.length;(w<len);w++) {
					var word=s[w];
					this.node.className=css.removeWord("jsf"+word);
				}
			}catch(e){log("jsForms.visualElement.addClassName: "+e);}};
			
			//autoFit parent element
			this.__defineGetter__("dock", function(){
				return this._dock;
			});
			this.__defineSetter__("dock", function(v){try{
				this._dock = (v=v.toString());
				
				//clear classes
				this.removeClassName(["dockTop","dockBottom","dockFill","dockRight","dockLeft"]);
				
				//calculate display, height, width and position
				var d, w, h, p=this.node.parentNode||null;
				switch(v) {
					case "none":
						//use given heights and widths
						d=this._drawStyle;
						w=this.size.width||"";
						h=this.size.height||"";						
						break;
					case "fill":
						//fully dock with parent object
						if (!p) return;
						d="block";
						w="";
						h=elementInnerHeight(p)-(this.outerHeight-this.innerHeight)+"px";
						break;
					case "fillAndShare":
						//dock with parent object
						//using any space left by other children
						//this assumes all siblings are blocks
						if (!p) return;
						d="block";
						w="";
						//detect maximum possible height
						h=
							//parent inner height
							elementInnerHeight(p)
							//minus the outer requirements for this element
							-(this.outerHeight-this.innerHeight);
						//detect sibling elements' heights
						var sibH=0;
						for (var s in p.childNodes){
							sib=p.childNodes[s];
							if (sib!=this.node) {
								sibH+=elementOuterHeight(sib);
							}
						}
						h=(h-sibH)+"px";
						break;
					case "top":
						//dock to the top of the parent
						d="block";
						w="";
						h=this.size.height||"";
						this.addClassName("dockTop");
						break;
					case "bottom":
						//dock to the bottom of the parent
						d="block";
						w="";
						h=this.size.height||"";
						this.addClassName("dockBottom");
						break;
					case "right":
						//dock to the right of the parent
						d=this._drawStyle;
						w=this.size.width||"";
						h=elementInnerHeight(p)-(this.outerHeight-this.innerHeight)+"px";
						this.addClassName("dockRight");
						break;
					case "left":
						//dock to the right of the parent
						d=this._drawStyle;
						w=this.size.width||"";
						h=elementInnerHeight(p)-(this.outerHeight-this.innerHeight)+"px";
						this.addClassName("dockLeft");
						break;
				}
				
				//apply non-class changes
				this.node.style.display=d;
				this.node.style.width=w;
				this.node.style.height=h;
			}catch(e){log("jsForms.visualElement.autoFit: "+e);}});

			//set css background color
			this.__defineGetter__("backColor", function(){
				return this._backColor;
			});
			this.__defineSetter__("backColor", function(v){try{
				this._backColor = (v.toString());
				if (this.backgroundNode) this.backgroundNode.style.backgroundColor=this.backColor;
			}catch(e){log("jsForms.visualElement.backColor: "+e);}});
			
			//set draw style (display)
			this.__defineGetter__("drawStyle", function(){
				return this._drawStyle;
			});
			this.__defineSetter__("drawStyle", function(v){try{
				this._drawStyle = (v.toString());
				this.dock=this._dock;
			}catch(e){log("jsForms.visualElement.drawStyle: "+e);}});

			//set tooltiptext/title
			this.__defineGetter__("toolTipText", function(){
				return this._toolTipText;
			});
			this.__defineSetter__("toolTipText", function(v){try{
				this._toolTipText = (v.toString());
				if (this.node) this.node.title=this._toolTipText;
			}catch(e){log("jsForms.visualElement.toolTipText: "+e);}});

			//set css foreground color
			this.__defineGetter__("foreColor", function(){
				return this._foreColor;
			});		   
			this.__defineSetter__("foreColor", function(v){try{
				this._foreColor = (v.toString());
				if (this.node) this.node.style.color=this.foreColor;
			}catch(e){log("jsForms.visualElement.foreColor: "+e);}});
			
			//set the font used in both the box and the list
			this.__defineGetter__("font", function(){
				return this._font;
			});			   
			this.__defineSetter__("font", function(v){try{
				this._font = (v.toString());
				if (this.node) this.node.style.fontFamily=this.font;
			}catch(e){log("jsForms.visualElement.font: "+e);}});

			//set the node element css class
			this.__defineGetter__("className", function(){
				return this.node.className;
			});			   
			this.__defineSetter__("className", function(v){try{
				if (this.node) this.node.className=v;
			}catch(e){log("jsForms.visualElement.className: "+e);}});

			//set the cursor used in the element
			this.__defineGetter__("cursor", function(){
				return this._cursor;
			});
			this.__defineSetter__("cursor", function(v){try{
				this._cursor = (v.toString());
				if (this.node) this.node.style.cursor=this.cursor;
			}catch(e){log("jsForms.visualElement.cursor: "+e);}});

			//set if the dropdown is visible
			this.__defineGetter__("visible", function(){
				return this._visible;
			});			   
			this.__defineSetter__("visible", function(v){try{
				this._visible = cBool(v);
				//log(this._visible);
				if (this._visible) this.removeClassName("hidden"); 
				else this.addClassName("hidden");
			}catch(e){log("jsForms.visualElement.visible: "+e);}});

			//set the location based on the upper left of the container box
			//values are copied from the passed object so that a reference to the
			//passed object does not remain
			this.__defineGetter__("position", function(){
				return this._position;
			});			   
			this.__defineSetter__("position", function(v){try{
				if (isObject(v)) {
					this._position.top=v.top||"";
					this._position.left=v.left||"";
					this._position.right=v.right||"";
					this._position.bottom=v.bottom||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.position.set: input was not an object");
					this._position={top:"",left:"",right:"",bottom:""}
				}
				if (this.node) {
					this.node.style.top=this.position.top;
					this.node.style.left=this.position.left;
					this.node.style.right=this.position.right;
					this.node.style.bottom=this.position.bottom;
				}
			}catch(e){log("jsForms.visualElement.position: "+e);}});

			//set the height and width of the box
			this.__defineGetter__("size", function(){
				return this._size;
			});			   
			this.__defineSetter__("size", function(v){try{
				if (isObject(v)) {
					this._size.height=v.height||"";
					this._size.width=v.width||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.size.set: input was not an object");
					this._size={height:"",width:""}
				}
				//now use the dock function to finish sizing
				this.dock = this._dock;
			}catch(e){log("jsForms.visualElement.size: "+e);}});

			//set the max height and width of the box
			this.__defineGetter__("maximumSize", function(){
				return this._maximumSize;
			});			   
			this.__defineSetter__("maximumSize", function(v){try{
				if (isObject(v)) {
					this._maximumSize.height=v.height||"";
					this._maximumSize.width=v.width||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.maximumSize.set: input was not an object");
					this._maximumSize={height:"",width:""}
				}
				if (this.node) {
					this.node.style.maxHeight=this.maximumSize.height;
					this.node.style.maxWidth=this.maximumSize.width;
				}
			}catch(e){log("jsForms.visualElement.maximumSize: "+e);}});

			//set the min height and width of the box
			this.__defineGetter__("minimumSize", function(){
				return this._minimumSize;
			});			   
			this.__defineSetter__("minimumSize", function(v){try{
				if (isObject(v)) {
					this._minimumSize.height=v.height||"";
					this._minimumSize.width=v.width||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.minimumSize.set: input was not an object");
					this._minimumSize={height:"",width:""}
				}
				if (this.node) {
					this.node.style.minHeight=this.minimumSize.height;
					this.node.style.minWidth=this.minimumSize.width;
				}
			}catch(e){log("jsForms.visualElement.minimumSize: "+e);}});

			//set the margins of the object {top, left, right, bottom}
			this.__defineGetter__("margin", function(){
				return this._margin;
			});			   
			this.__defineSetter__("margin", function(v){try{
				if (isObject(v)) {
					this._margin.top=v.top||"";
					this._margin.left=v.left||"";
					this._margin.right=v.right||"";
					this._margin.bottom=v.bottom||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.margin.set: input was not an object");
					this._margin={top:"",left:"",right:"",bottom:""}
				}
				if (this.node) {
					this.node.style.margin=
						this.margin.top+" "+
						this.margin.right+" "+
						this.margin.bottom+" "+
						this.margin.left;
				}
			}catch(e){log("jsForms.visualElement.margin: "+e);}});

			//set the padding of the object {top, left, right, bottom}
			this.__defineGetter__("padding", function(){
				return this._padding;
			});			   
			this.__defineSetter__("padding", function(v){try{
				if (isObject(v)) {
					this._padding.top=v.top||"";
					this._padding.left=v.left||"";
					this._padding.right=v.right||"";
					this._padding.bottom=v.bottom||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.padding.set: input was not an object");
					this._padding={top:"",left:"",right:"",bottom:""}
				}
				if (this.node) {
					this.node.style.paddingTop=this.padding.top;
					this.node.style.paddingLeft=this.padding.left;
					this.node.style.paddingRight=this.padding.right;
					this.node.style.paddingBottom=this.padding.bottom;
				}
			}catch(e){log("jsForms.visualElement.padding: "+e);}});

			//set the border radius of the object 
			this.__defineGetter__("borderRadius", function(){
				return this._borderRadius;
			});			   
			this.__defineSetter__("borderRadius", function(v){try{
				if (isObject(v)) {
					this._borderRadius.topLeft=v.topLeft||"";
					this._borderRadius.bottomLeft=v.bottomLeft||"";
					this._borderRadius.topRight=v.topRight||"";
					this._borderRadius.bottomRight=v.bottomRight||"";
				} else {
					//value was not an object
					log("jsForms.visualElement.borderRadius.set: input was not an object");
					this._borderRadius={topLeft:"",bottomLeft:"",topRight:"",bottomRight:""}
				}
				if (this.borderNode) {
					this.borderNode.style.borderTopLeftRadius=this.borderRadius.topLeft;
					this.borderNode.style.borderTopRightRadius=this.borderRadius.topRight;
					this.borderNode.style.borderBottomLeftRadius=this.borderRadius.bottomLeft;
					this.borderNode.style.borderBottomRightRadius=this.borderRadius.bottomRight;
				}
			}catch(e){log("jsForms.visualElement.borderRadius: "+e);}});

			//set the border style of the element
			this.__defineGetter__("borderStyle", function(){
				return this._borderStyle;
			});
			this.__defineSetter__("borderStyle", function(v){try{
				this._borderStyle = (v.toString());
				if (this.borderNode){
					this.borderNode.style.border=(
						(this._borderStyle=="Fixed3D")?"2px inset buttonface":
						(this._borderStyle=="FixedSingle")?this._borderCSS:
						"none"
					);
				}
			}catch(e){log("jsForms.visualElement.borderStyle: "+e);}});

			//set default border css for borderStyle FixedSingle
			this.__defineGetter__("borderCSS", function(){
				return this._borderCSS;
			});			   
			this.__defineSetter__("borderCSS", function(v){try{
				this._borderCSS = (v.toString());
				this.borderStyle = this._borderStyle;
			}catch(e){log("jsForms.visualElement.borderCSS: "+e);}});

			//return the dom node
			this.__defineGetter__("node", function(){
				return this._node;
			});	

			//calculate inner and outer actual sizes
			this.__defineGetter__("outerWidth", function(){
				return elementOuterWidth(this._node);
			});	

			this.__defineGetter__("innerWidth", function(){
				return elementInnerWidth(this._node);
			});	

			this.__defineGetter__("outerHeight", function(){
				return elementOuterHeight(this._node);
			});	

			this.__defineGetter__("innerHeight", function(){
				return elementInnerHeight(this._node);
			});				

			//show/hide the visual element
			this.show=function(){
				this.visible=true;
			};
			this.hide=function(){
				this.visible=false;
			};

			//draw the housing
			this._node=createElement("div",{
				style:(
					"display:"+this._drawStyle+";"+
					"vertical-align:middle;"+
					""//leave here
				)
			});
			
			//set nodes for bordering and background
			this.borderNode=this._node;
			this.backgroundNode=this._node;
			
			//init
			for (var p in params) this[p]=params[p];
			//confirm(JSON.stringify(this));

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.visualElement.init: "+e);}},
	
		//icon specific parts
		icon:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );

			//defaults
			this._src=null;
			this._defaultImage=null;
			this._altImage=null;
			this.imageNode=null;
			this.node.style.overflow="hidden";
			this._selectedImage="_src";
						
			//set the image
			this.__defineGetter__("src", function(){
				return this._src;
			});
			this.__defineSetter__("_src", function(v){try{
				this._src = (v.toString());
				if (this._selectedImage=="_src") this.redraw();
			}catch(e){log("jsForms.icon.src: "+e);}});
			
			//set the default image
			this.__defineGetter__("defaultImage", function(){
				return this._defaultImage;
			});
			this.__defineSetter__("defaultImage", function(v){try{
				this._defaultImage = (v.toString());
				if (this._selectedImage=="_defaultImage") this.redraw();
			}catch(e){log("jsForms.icon.defaultImage: "+e);}});

			//set the alt image
			this.__defineGetter__("altImage", function(){
				return this._altImage;
			});
			this.__defineSetter__("altImage", function(v){try{
				this._altImage = (v.toString());
				if (this._selectedImage=="_altImage") this.redraw();
			}catch(e){log("jsForms.icon.altImage: "+e);}});
			
			//show different images
			this.showPrimary=function(){
				this._selectedImage="_src";
				this.redraw();
			};
			this.showDefault=function(){
				this._selectedImage="_defaultImage";
				this.redraw();
			};
			this.showAlt=function(){
				this._selectedImage="_altImage";
				this.redraw();
			};
			
			//redraw
			this.redraw=function(){try{
				if (this.imageNode) {
					this.imageNode.src=(this[this._selectedImage]||this._defaultImage);
				}
			}catch(e){log("jsForms.icon.src: "+e);}};
			
			//draw it
			if (this.node){
				this.node.appendChild(
					this.imageNode=createElement("img",{
						style:(
							"width:inherit;"+
							"height:inherit;"+
							""//leave here
						),
					})
				);
			}			

			//init
			for (var p in params) {try{
				//separate event functions
				if (p.startsWith("on")) {
					//apply event functions to intended objects
					if (["onCreated"].inArray(p)) {
						this[p]=params[p];
					} else this.imageNode[p.toLowerCase()]=params[p];
				} else this[p]=params[p];
			}catch(e){log("jsForms.icon.init (params): "+e);}};
			//confirm(JSON.stringify(this));

			/*/preload images
			new Image().src = this._altImage;
			new Image().src = this._defaultImage;
			new Image().src = this._src;
			*/

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.icon.init: "+e);}},
	
		//textbox specific parts
		textBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );

			//defaults
			this._text="";
			this._emptyText="";
			this._maxLength=32767;
			this.textNode=null;
			this.borderNode=null;
			this.backgroundNode=null;
			this._borderStyle="FixedSingle";
			//this._drawStyle="block";
			
			//events
			this.onChange=null;

			//set the text shown in the box
			this.__defineGetter__("text", function(){
				return this._text;
			});
			this.__defineSetter__("text", function(v){try{
				this._text = (v.toString());
				if (this.textNode) this.textNode.value=v;
				if (this.causesValidation && this.onChange) {var caller=this; doAction(function(){caller.onChange(caller);})};
			}catch(e){log("jsForms.textBox.text: "+e);}});

			//text to display when text=""
			this.__defineGetter__("emptyText", function(){
				return this._emptyText;
			});
			this.__defineSetter__("emptyText", function(v){try{
				this._emptyText = (v.toString());
				if (this.node) this.node.title=this.emptyText;
			}catch(e){log("jsForms.textBox.emptyText: "+e);}});

			//set the max number of characters that can be entered in the box
			this.__defineGetter__("maxLength", function(){
				return this._maxLength;
			});
			this.__defineSetter__("maxLength", function(v){try{
				this._maxLength = parseInt(v);
				if (this.node) this.node.maxLength=this.maxLength;
			}catch(e){log("jsForms.textBox.maxLength: "+e);}});

			//get the default value as text
			this.__defineGetter__("value", function(){
				return this._text;
			});
						
			//draw it
			this._node.appendChild(
				this.textNode=createElement("input",{
					maxLength:this._maxLength, 
					value:this._text, 
					title:this._emptyText, 
					enabled:this._enabled, 
					style:(
						"display:"+this._drawStyle+";"+
						"width:inherit;"+
						"height:inherit;"+
						"minWidth:inherit;"+
						"minHeight:inherit;"+
						"maxWidth:inherit;"+
						"maxHeight:inherit;"+
						"margin-top:inherit;"+
						"margin-left:inherit;"+
						"margin-right:inherit;"+
						"margin-bottom:inherit;"+
						"top:inherit;"+
						"left:inherit;"+
						"right:inherit;"+
						"bottom:inherit;"+
						"cursor:inherit;"+
						//"font-family:inherit;"+
						//"background-color:"+this._backColor+";"+
						"color:inherit;"+
						/*"border:"+(
							(this.borderStyle=="Fixed3D")?"":
							(this.borderStyle=="FixedSingle")?this.borderCSS:
							"none"
						)+";"+
						"border-top-left-radius:"+this.borderRadius.topLeft+";"+
						"border-top-right-radius:"+this.borderRadius.bottomLeft+";"+
						"border-bottom-left-radius:"+this.borderRadius.topRight+";"+
						"border-bottom-right-radius:"+this.borderRadius.bottomRight+";"+
						*/


						""//leave here					
					),
					onclick:self.onClick,
					ondblclick:self.onDoubleClick,
					onmousedown:self.onMouseDown,
					onmouseup:self.onMouseUp,
					onmousemove:self.onMouseMove,
					onmouseover:self.onMouseOver,
					onmouseout:self.onMouseOut,
					onkeydown:self.onKeyDown,
					onkeypress:self.onKeyPress,
					onkeyup:self.onKeyPress,
					onblur:self.onBlur,
					onfocus:self.onFocus,
					onselect:self.onSelect,
					onchange:function(){
						self.text=this.value;
					},
				})
			);
			
			//set nodes for bordering and background
			this.borderNode=this.textNode;
			this.backgroundNode=this.textNode;
			
			//init
			for (var p in params) this[p]=params[p];
			//confirm(JSON.stringify(this));

			//return it
			if (this.causesValidation && this.onCreated) doAction(function(){this.onCreated(this);});
			return this;
		}catch(e){log("jsForms.textBox.init: "+e);}},

		//numeric up/down specific parts
		spinBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.textBox() );

			//defaults
			//this._hexadecimal=false;
			//this._thousandsSeparator=false;
			this._upDownAlign="right";
			//this._decimalPlaces=0;
			this._increment=1;
			this._maximum=100;
			this._minimum=0;
			this._rollOver=false; //start at the other end if past boundary
			
			//set the max value
			this.__defineGetter__("maximum", function(){
				return this._maximum;
			});
			this.__defineSetter__("maximum", function(v){try{
				this._maximum = parseInt(v);
			}catch(e){log("jsForms.spinBox.maximum: "+e);}});

			//set the min value
			this.__defineGetter__("minimum", function(){
				return this._minimum;
			});
			this.__defineSetter__("minimum", function(v){try{
				this._minimum = parseInt(v);
			}catch(e){log("jsForms.spinBox.minimum: "+e);}});

			//set the increment value
			this.__defineGetter__("increment", function(){
				return this._increment;
			});
			this.__defineSetter__("increment", function(v){try{
				this._increment = parseInt(v);
			}catch(e){log("jsForms.spinBox.increment: "+e);}});

			//set the rollOver flag
			this.__defineGetter__("rollOver", function(){
				return this._rollOver;
			});
			this.__defineSetter__("rollOver", function(v){try{
				this._rollOver = cBool(v);
			}catch(e){log("jsForms.spinBox.rollOver: "+e);}});

			//up and down functions
			this.up=function(){
				this.change(this._increment);
			};
			this.down=function(){
				this.change(-(this._increment));
			};
			this.change=function(n){
				var v=parseInt(this.text),hasChanged=false;
				v=v+n;
				//validate boundaries
				if ((v<=this._maximum)&&(v>=this._minimum)){
					hasChanged=true;
				} else {
					if (this._rollOver) {
						//perform rollover
						if (v>this._maximum) v=this._minimum;
						else v=this._maximum;
						hasChanged=true;
					}
				}
				if (hasChanged){
					//format output
					//v=v.toString();
					//v=v.format("#,##0");
					//print it
					this.text=v;
				}
			};			
			
			//append buttons to the textbox portion
			this.node.style.position="relative";
			this.textNode.style.textAlign=(this._upDownAlign=="left")?"right":"left";
			this.textNode.style.verticalAlign="middle";
			this.node.appendChild(
				this.buttonNode=createElement("div",{
					style:(
						"vertical-align: middle;"+
						"position: relative;"+
						"display: inline-block;"+
						""//leave here
					),
				},[
					this.incrementNode=createElement("button",{
						className:"jsfButton jsfblock",
						title:"Up",
						onclick:function(){
							self.up();
						},
					},[
						createElement("span",{
							textContent:"\u25B4",
						})
					]),
					this.decrementNode=createElement("button",{
						className:"jsfButton jsfblock",
						title:"Down",
						onclick:function(){
							self.down();
						},
					},[
						createElement("span",{
							textContent:"\u25BE",
						})
					])
				])
			);
			
			//init
			for (var p in params) this[p]=params[p];

			//resize its buttons
			this.fixSizes=function(){
				var self=this;
				var btn=this.incrementNode;
				var h=elementOuterHeight(this.textNode);
				var i=elementOuterHeight(btn)-elementInnerHeight(btn);
				if (!isNaN(h) && !isNaN(i) && h>0){
					//resize buttons
					btn.style.height=(h/2)-i+"px";
					self.decrementNode.style.height=
						btn.style.height;
					//move child text to center
					var span=btn.childNodes[0];
					span.style.left=
						Math.floor((
							elementInnerWidth(btn)-elementOuterWidth(span))/2
						)+"px";
					span.style.bottom=
						Math.floor((
							elementInnerHeight(btn)-elementOuterHeight(span))/2
						)+"px";
						
					var span=self.decrementNode.childNodes[0];
					span.style.left=
						Math.floor(
							(elementInnerWidth(self.decrementNode)-elementOuterWidth(span))/2
						)+"px";
					span.style.bottom=
						Math.floor(
							(elementInnerHeight(self.decrementNode)-elementOuterHeight(span))/2
						)+"px";
				} else {
					setTimeout(function(){self.fixSizes();},100);
				}
			};
			this.fixSizes();

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;			
		}catch(e){log("jsForms.spinBox.init: "+e);}},	

		//checkbox specific parts
		checkBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );

			//defaults
			this._checked=false;
			this._text=""; 
			this._value="";
			//_threeState: see checkedState
			//_checkedState: [unchecked, checked, indeterminate]
			this._autoCheck=true; //check on label click
			this.checkNode=null;
			this.labelNode=null;
			this._highlightSelected=false;

			//this._image="";
			//this._textCheckRelation="After"; //[Above, Below, Before, After]
			//this._textImageRelation="After"; //[Above, Below, Before, After]
			
			//events
			this.onChecked=null;
			this.onUnchecked=null;
			
			//set visible text of the checkbox
			this.__defineGetter__("text", function(){
				return this._text;
			});
			this.__defineSetter__("text", function(v){try{
				this._text = (v.toString());
				if (this.labelNode) this.labelNode.textContent=this._text;
			}catch(e){log("jsForms.checkBox.text: "+e);}});

			//set underlying value of the checkbox
			this.__defineGetter__("value", function(){
				return this._value;
			});
			this.__defineSetter__("value", function(v){try{
				this._value =  v;
				if (this.checkNode) this.checkNode.value=this._value;
			}catch(e){log("jsForms.checkBox.value: "+e);}});

			this.doAutoCheck=function(){try{
				click(self.checkNode);
				if (self.onLabelClick) self.onLabelClick();
			}catch(e){log("jsForms.checkBox.doAutoCheck: "+e);}};
			
			//set autocheck on label click
			this.__defineGetter__("autoCheck", function(){
				return this._autoCheck;
			});
			this.__defineSetter__("autoCheck", function(v){try{
				this._autoCheck = cBool(v);
				this.labelNode.onclick=(!this._autoCheck)?this.onLabelClick:this.doAutoCheck;
			}catch(e){log("jsForms.checkBox.autoCheck: "+e);}});

			//set highlight on checked
			this.__defineGetter__("highlightSelected", function(){
				return this._highlightSelected;
			});
			this.__defineSetter__("highlightSelected", function(v){try{
				this._highlightSelected = cBool(v);
				if (this.node) {
					this.node.style.backgroundColor=(this._highlightSelected)?((this._checked)?"highlight":this.backColor):this.backColor;
					this.node.style.color=(this._highlightSelected)?((this._checked)?"highlighttext":this.foreColor):this.foreColor;
				}
			}catch(e){log("jsForms.checkBox.highlightSelected: "+e);}});

			//set checked state
			this.__defineGetter__("checked", function(){
				return this._checked;
			});
			this.__defineSetter__("checked", function(v){try{
				this._checked = cBool(v);
				if (this.checkNode) this.checkNode.checked=this._checked;
				if (this.node) {
					this.node.style.backgroundColor=(this._highlightSelected)?((this._checked)?"highlight":this.backColor):this.backColor;
					this.node.style.color=(this._highlightSelected)?((this._checked)?"highlighttext":this.foreColor):this.foreColor;
				}
				if (this.causesValidation){
					var caller=this;
					if (this.onChecked && this._checked) doAction(function(){caller.onChecked(caller);});
					if (this.onUnchecked && !this._checked) doAction(function(){caller.onChecked(caller);});
					if (this.onChange) doAction(function(){caller.onChange(caller);});
						/*confirm("-onchange");
						window.setTimeout(function(){
							confirm("-onchange delay");
							caller.onChange(caller);
						},1000);*/
					//}
				}
			}catch(e){log("jsForms.checkBox.checked: "+e);}});
			
			//register the initial params
			for (var p in params) this[p]=params[p];
			
			//draw it
			this.node.appendChild(
				this.checkNode=createElement("input",{
					type: "checkbox",
					value: this._value,
					checked: this._checked,
					style:(
						"margin-right: 4px;"+
						"vertical-align: middle;"+
						
						"" //leave here
					),
					onclick:self.onClick,
					ondblclick:self.onDoubleClick,
					onmousedown:self.onMouseDown,
					onmouseup:self.onMouseUp,
					onmousemove:self.onMouseMove,
					onmouseover:self.onMouseOver,
					onmouseout:self.onMouseOut,
					onkeydown:self.onKeyDown,
					onkeypress:self.onKeyPress,
					onkeyup:self.onKeyPress,
					onblur:self.onBlur,
					onfocus:self.onFocus,
					onchange:function(){
						self.checked=this.checked;
					},
				})
			);			
			
			this.node.appendChild(
				this.labelNode=createElement("label",{
					textContent:this._text,
					style:(
						"margin-right: 4px;"+
						"vertical-align: middle;"+
						"font-weight: normal;"+
						"color: inherit;"+
						
						"" //leave here
					),
					onclick:(this._autoCheck)?self.doAutoCheck:self.onLabelClick,
					ondblclick:self.onLabelDoubleClick,
					onmousedown:self.onMouseDown,
					onmouseup:self.onMouseUp,
					onmousemove:self.onMouseMove,
					onmouseover:self.onMouseOver,
					onmouseout:self.onMouseOut,
					onkeydown:self.onKeyDown,
					onkeypress:self.onKeyPress,
					onkeyup:self.onKeyPress,
					onblur:self.onBlur,
					onfocus:self.onFocus,
				})
			);
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.checkBox.init: "+e);}},
		
		//toolBox for containing tool icons
		toolBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.listBox({items:params.items}) );
			delete params.items;

			//defaults
			this.node.style.position="absolute";
			this.drawStyle="block";
			//this.node.style.overflow=""; //make it expand as needed
			this.position={top:"0px",right:"0px"};
			
			//init
			for (var p in params) this[p]=params[p];
			//confirm(JSON.stringify(this));

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;			
		}catch(e){log("jsForms.toolBox.init: "+e);}},		
		
		//listbox specific parts
		listBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self, new jsForms.visualElement() );

			//defaults
			this._maxItems=32767;
			this._maxSelectedItems=32767;
			this._sorted=false;
			this._sortBy=["text"];
			this._sortOrder="asc";
			this.listNode=this.node;
			this._items=[];
			this._firstItemSelectsAll=false;
			this._explicitClose=false;
			this._valueMember="value";
			this._highlightSelected=false;
			this.node.style.overflow="scroll";
			this._allowMoveChildren=false;
			
			//events
			this.onItemSelected=null;
			this.onItemChecked=null;
			this.onItemUnselected=null;
			this.onItemUnchecked=null;
			this.onMaxItemsSelected=null;
			
			//set the max number of items to show in the list
			this.__defineGetter__("maxItems", function(){
				return this._maxItems;
			});
			this.__defineSetter__("maxItems", function(v){try{
				this._maxItems = parseInt(v);
			}catch(e){log("jsForms.listBox.maxItems: "+e);}});

			//set the max number of items that can be selected
			this.__defineGetter__("maxSelectedItems", function(){
				return this._maxSelectedItems;
			});
			this.__defineSetter__("maxSelectedItems", function(v){try{
				this._maxSelectedItems = parseInt(v);
			}catch(e){log("jsForms.listBox.maxSelectedItems: "+e);}});

			//set if the list is to be sorted
			this.__defineGetter__("sorted", function(){
				return this._sorted;
			});
			this.__defineSetter__("sorted", function(v){try{
				this._sorted = cBool(v);
				if (this._sorted) this.sort();
			}catch(e){log("jsForms.listBox.sorted: "+e);}});
			
			//set if the list children can be moved around
			this.__defineGetter__("allowMoveChildren", function(){
				return this._allowMoveChildren;
			});
			this.__defineSetter__("allowMoveChilden", function(v){try{
				this._allowMoveChildren = cBool(v);
				//add||remove tools for each child
				for (var i=0,child;(child=this.items[i]);i++){
					if (this._allowMoveChildren) {
						//add item to toolbox
					} else {
						//remove item from toolbox
					}
				}				
			}catch(e){log("jsForms.listBox.allowMoveChildren: "+e);}});

			//set highlight if selected
			this.__defineGetter__("highlightSelected", function(){
				return this._highlightSelected;
			});
			this.__defineSetter__("highlightSelected", function(v){try{
				this._highlightSelected = cBool(v);
				for (var i=0,child;(child=this.items[i]);i++){
					child.highlightSelected=this._highlightSelected;
				}
			}catch(e){log("jsForms.listBox.highlightSelected: "+e);}});

			//set the parameters by which the list is to be sorted
			this.__defineGetter__("sortBy", function(){
				return this._sortBy;
			});
			this.__defineSetter__("sortBy", function(v){try{
				if (isArray(v) || isString(v)) {
					this._sortBy = v;
					if (this._sorted) this.sort();
				} else {
					log("jsForms.listBox.sortBy: Expected array or string, found "+typeof v);
				}
			}catch(e){log("jsForms.listBox.sortBy: "+e);}});
			
			//set the direction by which the sorting is done
			this.__defineGetter__("sortOrder", function(){
				return this._sortOrder;
			});
			this.__defineSetter__("sortOrder", function(v){try{
				this._sortOrder = v.toString();
				if (this._sorted) this.sort();
			}catch(e){log("jsForms.listBox.sortOrder: "+e);}});

			//get the items list of the list
			this.__defineGetter__("items", function(){
				return this._items;
			});
			this.__defineSetter__("items", function(v){try{
				this._items = v;
			}catch(e){log("jsForms.listBox.items: "+e);}});
			
			//alias for items list
			this.__defineGetter__("options", function(){
				return this._items;
			});

			//set the parameter of the sub item that is to be used as a value
			this.__defineGetter__("valueMember", function(){
				return this._valueMember;
			});
			this.__defineSetter__("valueMember", function(v){try{
				this._valueMember = (v.toString());
			}catch(e){log("jsForms.listBox.valueMember: "+e);}});

			//an object to display at the end of the
			//...list that can be clicked to close a dropdown
			this.__defineGetter__("explicitClose", function(){
				return this._explicitClose;
			});
			this.__defineSetter__("explicitClose", function(v){try{
				this._explicitClose = cBool(v);
			}catch(e){log("jsForms.listBox.explicitClose: "+e);}});
			
			//set if the special selectAll option appears
			this.__defineGetter__("firstItemSelectsAll", function(){
				return this._firstItemSelectsAll;
			});
			this.__defineSetter__("firstItemSelectsAll", function(v){try{
				this._firstItemSelectsAll = cBool(v);
			}catch(e){log("jsForms.listBox.firstItemSelectsAll: "+e);}});

			//get the default value as text
			this.__defineGetter__("value", function(){try{
				var ret=[];
				var sel=this.selectedItems;
				for (var i=0,child;(child=sel[i]);i++){
					ret.push(child[this._valueMember]);
				}
				return ret;
			}catch(e){log("jsForms.listBox.value: "+e);}});
			
			//get an array of selected options/checkboxes
			this.__defineGetter__("selectedItems", function(){try{
				var ret=[];
				for (var i=0,child;(child=this.items[i]);i++){
					if (exists(child.selected)) {
						//check for option types that are selected
						if (child.selected) ret.push(child);
					} else if (exists(child.checked)) {
						//check for checkbox types that are checked
						if (child.checked) ret.push(child);
					}
				}
				return ret;
			}catch(e){log("jsForms.listBox.selectedItems: "+e);}});

			//sort the list and redraw
			//p accepts {direction:string, by:array:string}
			//sorting is done using by[len-1] to by[0] so that
			//...sorting by ["lastName","firstName"] results in
			//...items being sorted by lastName first in the output
			this.sort=function(p){try{
				var params=p||{};
				params.by=params.by||this._sortBy||["text"];
				if (!isArray(params.by)) params.by=[].push(params.by);
				params.direction=params.direction||this._sortOrder||"asc";
				//var arrList=methodsToArray(this._items);
				var arrList=this._items;
				var dir=params.direction.toLowerCase();
				//for each passed sort by entry, sort the list
				for (var i=this.params.by.length,by;(by=this.params.by[i]);i--){
					arrList.sort(function(a,b){
						if (["ascending","asc"].inArray(dir)) return a[by]>=b[by];
						if (["descending","desc"].inArray(dir)) return a[by]<=b[by];
						return true;
					});
				};
				//this._items=arrayToMethods(arrList);
				this._items=arrList;
				this.redraw();
			}catch(e){log("jsForms.listBox.sort: "+e);}};
			
			//redraw the list of items
			this.redraw=function(){try{
				//clear all items
				for (var n in this.node){
					remove(n);
				}
				//append selectall button if needed
				if (this._firstItemSelectsAll) {
					this.node.appendChild(this._selectAllNode);
				}
				//redraw in current order
				for (var i=0,child;(child=this.items[i]);i++){
					this.node.appendChild(child.node||child);
				}
				//append explicitclose button if needed
				if (this._explicitClose){
					this.node.appendChild(this._explicitCloseNode);
				}
			}catch(e){log("jsForms.listBox.redraw: "+e);}};
			
			//generic close function, to be replaced by parent objects
			this.close=function(){
				this.visible=false;
			};
			//collapse the list down to a single element
			this.collapse=function(){try{
				this.node.style.height=this.items[0].node.offsetHeight;
				this.node.style.overflowX="hidden";
				this.node.style.overflowY="hidden";
			}catch(e){log("jsForms.listBox.collapse: "+e);}};
			//expand the list to the specified size
			this.expand=function(){try{
				this.node.style.height=this.size.height;
				this.node.style.overflowX="hidden";
				this.node.style.overflowY="scroll";
			}catch(e){log("jsForms.listBox.expand: "+e);}};

			//update visual details, such as border
			this.borderStyle="FixedSingle";

			//register the initial params
			for (var p in params) {try{
				this[p]=params[p];
			}catch(e){log("jsForms.listBox.init(params "+p+"): "+e);}};
									
			//modify children
			for (var i=0,child;(child=this.items[i]);i++){try{
				//append onchange value to every list item
				child.onChange=function(){
					if (self.causesValidation && self.onChange) {
						doAction(function(){self.onChange(self);});
					}
				};
				//change the drawstyle of each listitem
				(child.node||child).style.display="block";
				//set the highlightSelected attribute
				child.highlightSelected=this._highlightSelected;
			}catch(e){log("jsForms.listBox.init(modify children): "+e);}};
						
			//create the maybe-needed explicit close button
			this._explicitCloseNode=createElement("button",{
				textContent:"Close",
				style:(
					"float:right;"+
					""//leave here
				),
				onclick:function(){
					if (self.close) doAction(function(){self.close();});
				},
			});
			
			//create the maybe-needed select all node
			var o=new jsForms.checkBox({
				text:"Select All",
				onChange:function(){
					for (var i=0,child;(child=self._items[i]);i++){
						if (exists(child.selected)) child.selected=this.checked;
						if (exists(child.checked)) child.checked=this.checked;
					}
				},
			});
			this._selectAllNode=o.node;
			o.labelNode.style.fontWeight="bold";
			
			//draw it
			this.node.style.overflowX="hidden";
			this.node.style.overflowY="scroll";
			this.redraw();
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.listBox.init: "+e);}},

		//combobox, dropdown, select-multi
		comboBox:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.textBox() );
			
			//defaults
			this._dropDownStyle="dropDown";
			this._dropDownZIndex="999";
			this.node.style.position="relative";
			this.textNode.style.verticalAlign="middle";
			this.textNode.disabled=true; //prevent typing in the box
			
			//sub items
			try{
				this._dropDown=new jsForms.listBox({
					parent:this,
					items:params.items,
					onChange:function(){
						self.text=this.value;
						//confirm(this.value);
					},
					firstItemSelectsAll:params.firstItemSelectsAll,
					explicitClose:params.explicitClose,
					backColor:params.backColor||"window",
					//size:{width:"100%"},
					highlightSelected:params.highlightSelected,
					size:params.dropDownSize,
					drawStyle:"block",
				});
				//close the dropdown by default
				if (this._dropDownStyle!="simple") this._dropDown.hide();
				
				this._dropDown.node.style.zIndex=this._dropDownZIndex;
				this._dropDown.node.style.position="absolute";
				
				//set the text based on what was passed as selected
				this.text=this._dropDown.value;
			}catch(e){log("jsForms.comboBox.init(create list): "+e);};
			
			//scrap items we don't want appended to this object
			delete params.items;
			delete params.explicitClose;
			delete params.firstItemSelectsAll;
			delete params.highlightSelected;
			delete params.dropDownSize;

			//get the dropdown sub object
			this.__defineGetter__("dropDown", function(){
				return this._dropDown;
			});

			//set the dropdown visual style
			//simple: no dropdown, elements shown directly below all the time
			//dropdown: dropdown, elements in hidden list, allow typing in top box
			//dropdownList: same as dropdown minus typing in top box
			this.__defineGetter__("dropDownStyle", function(){
				return this._dropDownStyle;
			});
			this.__defineSetter__("dropDownStyle", function(v){try{
				this._dropDownStyle = (v.toString());
				this._dropDown.visible=((this._dropDownStyle=="simple")?true:false);
			}catch(e){log("jsForms.comboBox.dropDownStyle: "+e);}});

			//set the z-index of the dropdown portion when open
			this.__defineGetter__("dropDownZIndex", function(){
				return this._dropDownZIndex;
			});
			this.__defineSetter__("dropDownZIndex", function(v){try{
				this._dropDownZIndex = parseInt(v);
				this._dropDown.node.style.zIndex=this._dropDownZIndex;
			}catch(e){log("jsForms.comboBox.dropDownZIndex: "+e);}});
			
			//redefine value: get the dropdown value array
			this.__defineGetter__("value", function(){
				return this._dropDown.value;
			});
			
			//show/hide dropdown
			this.showDropDown=function(){
				this._dropDown.show();
				this.buttonTextNode.textContent="\u25B4";
			};
			this.hideDropDown=function(){
				this._dropDown.hide();
				this.buttonTextNode.textContent="\u25BE";
			};
			this.toggleDropDown=function(){
				var dd=this._dropDown;
				if (dd.visible) this.hideDropDown(); else this.showDropDown();
			};
			
			//register the initial params
			for (var p in params) this[p]=params[p];
			
			//append a button to the textbox portion
			this.node.appendChild(
				this.buttonNode=createElement("button",{					
					className:"jsfButton jsfinlineBlock",
					onclick:function(){
						self.toggleDropDown();
					},
				},[
					this.buttonTextNode=createElement("span",{
						textContent:"\u25BE",
					})
				])
			);
			
			//append the dropdown list
			this.node.appendChild(this._dropDown.node);
			
			//resize its parts
			this.fixSizes=function(){
				var self=this;
				//resize dropdown button
				var btn=this.buttonNode;
				var h=elementOuterHeight(this.textNode);
				var i=elementOuterHeight(btn)-elementInnerHeight(btn);
				if (!isNaN(h) && !isNaN(i) && h>0){
					btn.style.height=(h-i)+"px";
					var span=btn.childNodes[0];
					span.style.left=
						Math.floor((
							elementInnerWidth(btn)-elementOuterWidth(span))/2
						)+"px";
					span.style.bottom=
						Math.floor((
							elementInnerHeight(btn)-elementOuterHeight(span))/2
						)+"px";
					
				} else {
					setTimeout(function(){self.fixSizes();},100);
				}

				//resize dropdown
				this._dropDown.node.style.width=
					this.innerWidth-
					(this._dropDown.outerWidth-this._dropDown.innerWidth)+
					"px";
				
			};
			this.fixSizes();

			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.comboBox.init: "+e);}},

		//css color picker
		colorPicker:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.textBox() );
			
			//defaults
			this._dropDownStyle="dropDown";
			this._dropDownZIndex="999";
					
			//functions			
			var spanClick=function(){
				self.text=this.getAttribute("data-ft");
				self.hideDropDowns();
				self.colorBox.style.backgroundColor=self.text;				
			};
			
			var makeSpans=function(data,e){
				var ret=[];
				if (isArrayAndNotEmpty(data)) for (var i=0,d;(d=data[i]);i++){
					var value=(typeof d == "object")?d.value:d;
					var name=(typeof d == "object")?d.name:d;
			
					ret.push(createElement("span",{
						onclick:spanClick,
						style:(
							//"color: white !important;"+
							//"text-shadow: 0px 0px 1px black,0px 0px 1px black,0px 0px 1px black,0px 0px 1px black,0px 0px 1px black;"+
							//"font-weight:bold;"+
							"display:block;"+
							""//leave here
						),
						"data-ft":value,
					},[
						createElement("div",{
							style:(
								"background-color:"+value+" !important;"+
								"margin:0px 6px 0px 3px;"+
								"border:1px solid black;"+
								"width:20px; height:10px;"+
								"vertical-align:baseline;"+
								"display:inline-block;"+
								""//leave here
							),
						}),
						createElement("text",name)
					]));
				}
				return ret;
			};
					
			//sub items
			var shareStyle=(
				"background-color:"+(params.backColor||"window")+";"+
				"height:"+params.dropDownSize.height+";"+
				"z-index:"+this._dropDownZIndex+";"+
				"position:absolute;"+
				"display:none;"+
				"overflow-x:hidden;"+
				"overflow-y:auto;"+
				""//leave here
			);
			try{
				this._webSafe=createElement("div",{
						style:shareStyle,
					},
					makeSpans(jsForms.colorData.webSafe)
				);
			}catch(e){log("jsForms.colorPicker.init(webSafe): "+e);};
			try{
				this._colorWords=createElement("div",{
						style:shareStyle,
					},
					makeSpans(jsForms.colorData.colorWords)
				);
			}catch(e){log("jsForms.colorPicker.init(colorWords): "+e);};
			try{
				this._system=createElement("div",{
						style:shareStyle,
					},
					makeSpans(jsForms.colorData.system)
				);
			}catch(e){log("jsForms.colorPicker.init(system): "+e);};
			try{
				this._custom=createElement("div",{
						style:shareStyle,
					},
					makeSpans(jsForms.colorData.custom)
				);
			}catch(e){log("jsForms.colorPicker.init(custom): "+e);};
			delete params.dropDownSize;
			
			//set the z-index of the dropdown portion when open
			this.__defineGetter__("dropDownZIndex", function(){
				return this._dropDownZIndex;
			});
			this.__defineSetter__("dropDownZIndex", function(v){try{
				this._dropDownZIndex = parseInt(v);
				this._webSafe.style.zIndex=this._dropDownZIndex;
				this._system.style.zIndex=this._dropDownZIndex;
				this._colorNames.style.zIndex=this._dropDownZIndex;
				this._custom.style.zIndex=this._dropDownZIndex;
			}catch(e){log("jsForms.colorPicker.dropDownZIndex: "+e);}});
			
			//redefine value: get the dropdown value array
			this.__defineGetter__("value", function(){
				return this.textNode.value;
			});

			//resize the dropdown to fit our control
			this.resizeDropDown=function(e){
				var w=this.innerWidth-
					( elementOuterWidth(this[e])-elementInnerWidth(this[e]) )+
					"px";
				//confirm(w);
				this[e].style.width=w;
			};
			
			//show/hide dropdown
			this.showDropDown=function(e){
				this.hideDropDowns();
				this.resizeDropDown(e);
				this[e].style.display="block"
			};
			this.hideDropDowns=function(){
				this._webSafe.style.display="none";
				this._system.style.display="none";
				this._colorWords.style.display="none";
				this._custom.style.display="none";
			};
			this.toggleDropDown=function(e){
				var hidden=(this[e].style.display=="none");
				if (hidden) this.showDropDown(e); else this.hideDropDowns();
			};
			
			//init
			for (var p in params) this[p]=params[p];

			//append a button to the textbox portion
			this.node.style.position="relative";
			this.node.appendChild(
				createElement("button",{					
					style:(
						"position: relative;"+
						"font-size: 18px;"+
						"padding: 0px;"+
						"line-height: 0px;"+
						"border: 1px solid buttonshadow;"+
						"height:16px; width:17px;"+
						"background-color: buttonface;"+
						"box-shadow:1px 1px buttonhighlight inset, -1px -1px buttonhighlight inset;"+
						"vertical-align:middle;"+
						""//leave here
					),
					onclick:function(){
						self.toggleDropDown("_webSafe");
					},
				},[
					createElement("span",{
						textContent:"\u25BE",
						style:(
							"position: relative;"+
							"left:-3px;"+
							""//leave here
						)
					})
				])
			);
			this.node.appendChild(
				createElement("button",{					
					style:(
						"position: relative;"+
						"font-size: 18px;"+
						"padding: 0px;"+
						"line-height: 0px;"+
						"border: 1px solid buttonshadow;"+
						"height:16px; width:17px;"+
						"background-color: buttonface;"+
						"box-shadow:1px 1px buttonhighlight inset, -1px -1px buttonhighlight inset;"+
						"vertical-align:middle;"+
						""//leave here
					),
					onclick:function(){
						self.toggleDropDown("_colorWords");
					},
				},[
					createElement("span",{
						textContent:"\u25BE",
						style:(
							"position: relative;"+
							"left:-3px;"+
							""//leave here
						)
					})
				])
			);
			this.node.appendChild(
				createElement("button",{					
					style:(
						"position: relative;"+
						"font-size: 18px;"+
						"padding: 0px;"+
						"line-height: 0px;"+
						"border: 1px solid buttonshadow;"+
						"height:16px; width:17px;"+
						"background-color: buttonface;"+
						"box-shadow:1px 1px buttonhighlight inset, -1px -1px buttonhighlight inset;"+
						"vertical-align:middle;"+
						""//leave here
					),
					onclick:function(){
						self.toggleDropDown("_system");
					},
				},[
					createElement("span",{
						textContent:"\u25BE",
						style:(
							"position: relative;"+
							"left:-3px;"+
							""//leave here
						)
					})
				])
			);
			this.node.appendChild(
				createElement("button",{					
					style:(
						"position: relative;"+
						"font-size: 18px;"+
						"padding: 0px;"+
						"line-height: 0px;"+
						"border: 1px solid buttonshadow;"+
						"height:16px; width:17px;"+
						"background-color: buttonface;"+
						"box-shadow:1px 1px buttonhighlight inset, -1px -1px buttonhighlight inset;"+
						"vertical-align:middle;"+
						""//leave here
					),
					onclick:function(){
						self.toggleDropDown("_custom");
					},
				},[
					createElement("span",{
						textContent:"\u25BE",
						style:(
							"position: relative;"+
							"left:-3px;"+
							""//leave here
						)
					})
				])
			);	
			
			//append the dropdown list
			this.node.appendChild(this._webSafe);			
			this.node.appendChild(this._colorWords);			
			this.node.appendChild(this._system);			
			this.node.appendChild(this._custom);			
			
			//append the colorbox before the textbox
			this.colorBox=createElement("div",{
				style:(
					"background-color:"+this.text+";"+
					"margin:0px 6px 0px 3px;"+
					"border:1px solid black;"+
					"width:20px; height:10px;"+
					"vertical-align:middle;"+
					"display:inline-block;"+
					""//leave here
				),
			});
			this.node.insertBefore(this.colorBox,this.textNode);
			this.textNode.style.verticalAlign="middle";
			var oldOnChange=this.textNode.onchange||null;
			this.textNode.onchange=function(){				
				self.text=this.value;
				self.colorBox.style.backgroundColor=this.value;
			};
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.colorPicker.init: "+e);}},		
		
		//tabcontrol inner control
		tabPage:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );

			//make sure we know our parent
			this.parent=params.parent||null;
			delete params.parent;

			//defaults
			this._text="";
			this._image="";
			//this._autoScroll=true;
			this._showImage=true;
			this.buttonNode=null;
			this.imageNode=null;
			this.textNode=null;
			this.pageNode=null;
			this._drawStyle="block";
			
			//set the text shown in the tab button
			this.__defineGetter__("text", function(){
				return this._text;
			});
			this.__defineSetter__("text", function(v){try{
				this._text = (v.toString());
				if (this.textNode) this.textNode.textContent=this._text;
			}catch(e){log("jsForms.tabPage.text: "+e);}});

			//return if the parent knows we are selected
			this.__defineGetter__("selected", function(){
				return (this.parent._selectedTab===this);
			});

			//set the image shown in the tab button
			this.__defineGetter__("image", function(){
				return this._image;
			});
			this.__defineSetter__("image", function(v){try{
				this._image = ((v||"").toString());
				if (this.imageNode) {
					this.imageNode.src=this._image;
					this.imageNode.className=
						this.imageNode.className[((this._showImage && (this._image||this._imageClass))?"remove":"add")+"Word"]("jsfHidden");
				}
			}catch(e){log("jsForms.tabPage.image: "+e);}});

			//image className
			this.__defineGetter__("imageClass", function(){
				return this._imageClass;
			});
			this.__defineSetter__("imageClass", function(v){try{
				var oldClass=this._imageClass;
				this._imageClass = ((v||"").toString());
				if (this.imageNode) {
					this.imageNode.className=
						this.imageNode.className.removeWord(oldClass).addWord(this._imageClass);
				}
			}catch(e){log("jsForms.tabPage.imageClass: "+e);}});

			//show/hide the tab button image
			this.__defineGetter__("showImage", function(){
				return this._showImage;
			});
			this.__defineSetter__("showImage", function(v){try{
				this._showImage = cBool(v);
				if (this.imageNode) {
					this.imageNode.className=
						this.imageNode.className[((this._showImage && (this._image||this._imageClass))?"remove":"add")+"Word"]("jsfHidden");
				}
			}catch(e){log("jsForms.tabPage.showImage: "+e);}});

			//select tab
			this.select=function(){
				this.parent.selectTab(this);
			}
			
			//init
			var selected=params.selected||false;
			delete params.selected;
			var content=params.content||null;
			delete params.content;
			for (var p in params) this[p]=params[p];

			//draw it
			if (this.parent) {
				//add button to parent node
				this.parent.tabsNode.appendChild(
					this.buttonNode=createElement("div",{
						className:"jsfTab",
						style:(
							""//leave here
						),
						onclick:function(){self.select();},
					},[
						this.imageNode=createElement("img",{
							className:this._imageClass+((this._showImage && (this._image||this._imageClass))?"":" jsfHidden"),
							style:(
								""//leave here
							),
							src:this._image||"",
						}),
						this.textNode=createElement("div",{
							textContent:this._text.upperWords(),
							style:(
								""//leave here
							),
						}),
					])
				);
				
				//add page to parent node
				if (content) {
					if (!isArray(content)) content=[content];
					for (var i=0,contentNode;(contentNode=content[i]);i++){
						this.node.appendChild(contentNode);
					}
				}
				this.parent.pagesNode.appendChild(this.node);
				this.pageNode=this.node;
									
				//make selected if needed
				this.hide();
				this.dock=this._dock;
				if (selected) this.select();
			}
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.tabPage.init: "+e);}},

		//tabcontrol uppermost control
		tabControl:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );
			
			//defaults
			this._alignment="top"; //[top, left, right, bottom]
			//this._appearance="normal"; //[normal,buttons,flat buttons]
			this._hotTrack=true; //mouseover glow on buttons
			this._multiLine=false; //allow multiple lines of tabs
			//this._sizeMode="normal"; //[normal,fixed,filltoright]
			this._shareSinglePage=false; //all tabs use the same pageNode
			this.tabs=[];
			this.tabsNode=null;
			this.pagesNode=null;
			this._selectedTab=null;
			this.node.className=this.node.className.addWord("jsfTabControl hotTrack");
			this.sharedPageNode=null; //container for shared tabPage
			this.preventAutoSelectTab=false;

			//subStyle
			this.__defineGetter__("subStyle", function(){
				return this._subStyle;
			});
			this.__defineSetter__("subStyle", function(v){try{
				this.node.className=this.node.className.removeWord(this._subStyle);
				this._subStyle = (v.toString());
				this.node.className=this.node.className.addWord(this._subStyle);
			}catch(e){log("jsForms.tabControl.subStyle: "+e);}});

			//tabs alignment
			this.__defineGetter__("alignment", function(){
				return this._alignment;
			});
			this.__defineSetter__("alignment", function(v){try{
				this._alignment = (v.toString().toLowerCase().upperWords());
				//remove all alignment css words
				this.node.className=this.node.className.removeWord(["alignTop","alignLeft","alignBottom","alignRight"]);
				this.node.className=this.node.className.addWord("align"+this._alignment);
				this.redraw();
			}catch(e){log("jsForms.tabControl.alignment: "+e);}});

			//tab bar hot tracking
			this.__defineGetter__("hotTrack", function(){
				return this._hotTrack;
			});
			this.__defineSetter__("hotTrack", function(v){try{
				this._hotTrack = cBool(v);
				this.node.className=this.node.className[((this._hotTrack)?"add":"remove")+"Word"]("hotTrack");
			}catch(e){log("jsForms.tabControl.hotTrack: "+e);}});

			//use a single tabPage for all tabs
			this.__defineGetter__("shareSinglePage", function(){
				return this._shareSinglePage;
			});
			this.__defineSetter__("shareSinglePage", function(v){try{
				this._shareSinglePage = cBool(v);
			}catch(e){log("jsForms.tabControl.shareSinglePage: "+e);}});

			//select tab by index or by passed object
			this.selectTab=function(v){try{
				var lastSelected=this._selectedTab;
				switch(typeof v){
					case "object":
						this._selectedTab=v;
						break;
					case "number":
						this._selectedTab=this.tabs[v];
						break;
				}
				//move the selected tab forward, unselected backward
				if (lastSelected) {
					if (!this._shareSinglePage) lastSelected.hide();
					with (lastSelected.buttonNode) {
						className=className.removeWord("selected");
					}
				}
				if (!this._shareSinglePage) this._selectedTab.show();
				with (this._selectedTab.buttonNode) {
					className=className.addWord("selected");
				}
				
				//do onSelect event
				if (this._selectedTab.onSelect) {
					this._selectedTab.onSelect(this._selectedTab);
				}
			}catch(e){log("jsForms.tabControl.selectTab: "+e);}};
			
			//capture the sizes we need for this tabcontrol
			//and redraw its borders
			this.redraw=function(){try{
				//reset self first
				this.dock=this._dock;
			
				//pages fit this minus the tabs bar
				this.pagesNode.style.height=
					(this._alignment=="Top" || this._alignment=="Bottom")?(
						this.innerHeight
						- elementOuterHeight(this.tabsNode)
						- (
							elementOuterHeight(this.pagesNode)
							- elementInnerHeight(this.pagesNode)
						) + "px"
					):(
						this.innerHeight
						-(
							elementOuterHeight(this.pagesNode)
							- elementInnerHeight(this.pagesNode)							
						) + "px"
					);
				this.pagesNode.style.width=
					(this._alignment=="Left" || this._alignment=="Right")?(
						this.innerWidth
						- elementOuterWidth(this.tabsNode)
						- (
							elementOuterWidth(this.pagesNode)
							- elementInnerWidth(this.pagesNode)
						) + "px"
					):("");//automatic
					
				//order the tabs in relation to the pages based on alignment
				if (this._alignment=="Bottom" || this._alignment=="Right"){
					this.node.insertBefore(this.pagesNode,this.tabsNode);
				} else {
					this.node.insertBefore(this.tabsNode,this.pagesNode);
				}
			}catch(e){log("jsForms.tabControl.redraw: "+e);}};
			
			//addTab using tab construction params
			this.addTab=function(params){try{
				params.parent=this;
				var tab;
				this.tabs.push(tab=new jsForms.tabPage(params));
				return tab;
			}catch(e){log("jsForms.tabControl.addTab: "+e);}};

			//removeTab using tab object reference
			this.removeTab=function(tab){try{
				this.tabs.removeByValue(tab);
				remove(tab.node);
			}catch(e){log("jsForms.tabControl.removeTab: "+e);}};
						
			//create tab button container
			this.node.appendChild(
				this.tabsNode=createElement("div",{
					className:"tabs",
					style:(
						((!this._multiLine)?"overflow: hidden;":"")+
						//(!this._multiLine)?"height:24px;":""+
						//"width:"+(parseInt(this.size.width)-5)+"px;"+
						""//leave here
					),
				})
			);
			
			//append tab page container
			this.node.appendChild(
				this.pagesNode=createElement("div",{
					className:"pages",
					style:(
						((this._autoFit)?"display:block;":"")+
						//(!this._multiLine && this.size.height)?"height:"+(parseInt(this.size.height)-32)+"px;":""+
						""//leave here
					),
				})
			);
			
			//append a shared tabPage if required
			this._shareSinglePage=params.shareSinglePage||false;
			if (this._shareSinglePage){
				var content=params.sharedContent;
				delete params.sharedContent;
				if (content) {
					if (!isArray(content)) content=[content];
				}
				this.pagesNode.appendChild(
					this.sharedPageNode=createElement("div",{},content)
				);
			}
			
			//init the tabs
			if (isArrayAndNotEmpty(params.tabs)) {
				for (var i=0,tab;(tab=params.tabs[i]);i++) {
					this.addTab(tab);
				}
				//select an initial tab if none already selected
				var autoTab=!(params.preventAutoSelectTab||false);
				if (autoTab && !this._selectedTab) this.selectTab(0);
			}
			delete params.tabs;
			
			//init the rest
			for (var p in params) this[p]=params[p];
			
			//draw
			this.alignment=this._alignment; //and it redraws here
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.tabControl.init: "+e);}},
		
		//coolBar version of tabcontrol
		coolBar:function(params){try{
			var self=this;
			params=params||{};
			params.hotTrack=true;
			params.subStyle="coolBar";
			
			//attach basic elements
			//this is basically the exact same thing as a tabcontrol
			self=extend(self,new jsForms.tabControl(params) );
						
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.coolBar.init: "+e);}},

		//treeview inner controls
		treeNode:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self,new jsForms.visualElement() );

			//defaults
			this._text="";
			this._checked=false;
			this._image="";
			this._selected=false;
			this.TreeView=null;
			
			//fullPath
			//getNodeCount //full count of child tree nodes
			//level //depth in the tree
			//remove
			//isEditing
			//toggle (expanded/collapsed)

			//edit label
			this.beginEdit=function(){
			};
			this.endEdit=function(){
			};
			
			//expand/collapse (with children)
			this.expand=function(ignoreChildren){
			};
			this.collapse=function(ignoreChildren){
			};
			
			//copy
			this.clone=function(){
			};
			
			//open parent nodes and scroll into view
			this.ensureVisible=function(){
			};
			
			//init
			for (var p in params) this[p]=params[p];
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.treeNode.init: "+e);}},

		//treeview uppermost control
		treeView:function(params){try{
			var self=this;
			params=params||{};
			
			//attach basic elements
			self=extend(self, new jsForms.visualElement() );

			//defaults
			this._checkBoxes=false; //show checkboxes at nodes
			this._fullRowSelect=false; //highlight the entire child
			this._hotTracking=true;
			this._indent="28px";
			this._labelEdit=false; //allow edit of labels on node
			this._nodes=[];
			this._pathSeparator="\\";
			this._scrollable=true;
			this._showLines=false; //show node lines
			this._showPlusMinus=true;
			this._showRootLines=true;
			this._sortBy="value";
			this._sortOrder="asc";
			
			//get the dropdown sub object
			this.__defineGetter__("hasChildren", function(){
				return (this._nodes.length>0);
			});
						
			//add remove nodes
			this.addRoot=function(node){
				//draw it
				
				//add it
				this._nodes.push(node);
			};
			
			//expand/collapse nodes
			this.collapseAll=function(){
				for (var i=0,child;(child=this._nodes[i]);i++) child.collapseAll();
			};
			this.expandAll=function(){
				for (var i=0,child;(child=this._nodes[i]);i++) child.expandAll();
			};
			
			//sort nodes
			this.sort=function(){
			};
			
			//init
			for (var p in params) this[p]=params[p];
			
			//return it
			if (self.causesValidation && self.onCreated) doAction(function(){self.onCreated(self);});
			return self;
		}catch(e){log("jsForms.treeView.init: "+e);}},

		
	};
	
	/*to do list
		dropDown: simplified comboBox with only one item selectable
		checkedListBox: uses listBox and assumes checks based on bound data or simple input		
		checkedDropDown: uses comboBox and assumes checks
		bindToData function
		checkbox: check-image-text ordering/layout
		checkbox: check hidden
	*/
	
	//JSON-ready testing page
	if (window.location.href.match(/^(http:\/\/www\.facebook\.com\/test)/) ||
		window.location.href.match(/^(file:\/\/\/C:\/Users\/Charlie\/Desktop)/) ) {
	
		var textBox = new jsForms.textBox({
			text:"hello world",
			backColor:"window",
			foreColor:"windowtext",
			font:'"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif',
			//borderStyle:"Fixed3D",
			borderRadius:{topLeft:"5px", bottomRight:"5px"},
			onChange:function(o){
				confirm(o.text);
			},
		});
		document.documentElement.appendChild(textBox.node,document.documentElement.childNodes[0]);
		
		var spinBox = new jsForms.spinBox({
			text:"3",
			backColor:"window",
			foreColor:"windowtext",
			minimum:0,
			maximum:10,
			rollOver:true,
			increment:1,
		});
		document.documentElement.appendChild(spinBox.node,document.documentElement.childNodes[0]);

		var checkBox = new jsForms.checkBox({
			text:"hello world",
			value:"1",
			checked:true,
			font:'"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif',
			onChange:function(o){
				confirm(o.checked);
			},
		});
		document.documentElement.appendChild(checkBox.node,document.documentElement.childNodes[0]);
		
		var listBox = new jsForms.listBox({
			font:'"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif',
			onChange:function(o){
				//confirm(o.value);
			},
			items:[
				new jsForms.checkBox({text:"hello world"}),
				new jsForms.checkBox({text:"hello moon"}),
				new jsForms.checkBox({text:"goodnight moon"}),
			],
			borderStyle:"Fixed3D",
			firstItemSelectsAll:true,
			explicitClose:true,
		});
		document.documentElement.appendChild(listBox.node,document.documentElement.childNodes[0]);
		
		var postParts = {
			//derived from post.testData
			//this stuff is created in the main.which call
			//so if that is not called yet, each will be undefined
			"title":"The title of a post contains the bold text, usually including the poster's name, at the top of the post.",
			"msg":"The msg of a post is the part the poster added as a comment.",
			"caption":"The caption of a post is one of two lines just below the title.",
			"desc":"The desc of a post is one of two lines just below the title.",
			"link":"The link of a post is just the ORIGINAL link text, not the url.",
			"url":"The url of a post is the address to which the post redirects the user when clicked.",
			"img":"The img of a post is the url of the icon that displays with the post.",
			"fromName":"The fromName is the name of the poster.",
			"fromID":"The fromID is the ID of the poster.",
			"targetName":"The targetName is a list of targets the poster intended the post to display to.",
			"targetID":"The targetID is a list of targets' IDs that the poster intended the post to display to.",
			"canvas":"The canvas of a post is location of the game code.",
			"likeName":"The likeName is a list of names of users who liked this post.",
			"likeID":"The likeID is a list of IDs of users who liked the post.",
			"comments":"The comments is a list of all comments made to the post, excluding the initial msg.",
			"commentorName":"The commentorName is a list of names of all commentors.",
			"commentorID":"The commentorID is a list of IDs of all commentors.",
			"body":"The body of a post is a compilation of the title, caption, and desc.",
			"either":"The either of a post is the compilation of the link and body.",
			"html":"The html of a post is the compilation of ALL visible FB attributes.",
			
			//right from the post object
			"which":"The which of a post is its identified codename. The codename starts with an appID and ends with something the sidekick developer uses to key the bonus type.",
			"idText":"The identified link text of a post.",
			"date":"The date of a post is its creation time on FB. This time is read as a unix date.", //read as unix time
			"status":"The status of a post is the return code created by the sidekick.",
			"priority":"The priority of a post is set by the prioritizer.",
			"appID":"The appID of the game for which this post belongs.",
			"appName":"The appName of the game for which this post belongs, as reported by the FB database.",
			"isStale":"Reports if a post is older than the user-set older limit.",
			"isScam":"Reports if a post is suspected of being a scam. Usually if the canvas and appName do not match.",
			"isCollect":"Reports if the post is set to be collected.",
			"isExcluded":"Reports if the post has been set as excluded.",
			"isFailed":"Reports if the post is set as having already failed.",
			"isAccepted":"Reports if the post is set as having already been successfully collected.",
			"isPaused":"Reports if the post's bonus type or app has been paused by the prioritizer. Paused objects to not process for collection.",
			"isPinned":"Reports if the post is marked as being pinned.",
			"isLiked":"Reports if the post has been identified as already being liked by the current user.",
			"isMyPost":"Reports if the post belongs to the current user.",
			"isUndefined":"Reports if the post does not match any id given by the sidekick.",
			"isWishlist":"Reports if the post is deemed a whichlist request.",
			"isTimeout":"Reports if the post has been marked as a timed out collection try.",
			"isW2W":"Reports if the post is a Wall-To-Wall post, meaning that it was posted to a specific user's wall.",
			"isForMe":"Reports if the W2W post targets the current user."
		};
		var search=["body"];

		var comboBox = new jsForms.comboBox({
			font:'"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif',
			onChange:function(o){
				GM_log("combo changed");
			},
			items:(function(){
				var ret=[];
				for (var i in postParts){
					ret.push(new jsForms.checkBox({
						text:i,
						value:i,
						toolTipText:postParts[i],
						checked:(search.inArray(i)),
						size:{width:"200%"},
					}));
				}
				return ret;
			})(),
			borderStyle:"Fixed3D",
			borderRadius:{topLeft:"1px", bottomRight:"1px",topRight:"1px",bottomLeft:"1px"},
			explicitClose:true,
			highlightSelected:true,
			dropDownSize:{height:"200px"},
			sorted:true,
		});
		document.documentElement.appendChild(comboBox.node,document.documentElement.childNodes[0]);

		//just a divider
		document.documentElement.appendChild(createElement("div"));
		var myConsole={};
		var tabControl = new jsForms.tabControl({
			//font:'"Bebas Neue","League Gothic",Haettenschweiler,"Arial Narrow",sans-serif',
			tabs:[
				{
					text:"Tabs",
					image:"file:///C:/Users/Charlie/Documents/From%20Disk%202/Wikia%20Frontwall/selLast.png",
					//selected:true,
					content:createElement("div",{},[
						createElement("label",{textContent:"Alignment: "}),
						createElement("select",{
							onchange:function(){
								tabControl.alignment=this.value;
							},
						},optionsFromArray([
							"Top","Right","Bottom","Left"
						])),
						createElement("br"),
						createElement("label",{textContent:"hotTrack: "}),
						createElement("select",{
							onchange:function(){
								tabControl.hotTrack=this.value;
							},
						},optionsFromArray([
							"false","true"
						])),
						createElement("br"),
						createElement("label",{textContent:"subStyle: "}),
						createElement("select",{
							onchange:function(){
								tabControl.subStyle=this.value;
							},
						},optionsFromArray([
							"normal","coolBar"
						])),
					])
				},
				{
					text:"red phone",
					image:"file:///C:/Users/Charlie/Documents/From%20Disk%202/Wikia%20Frontwall/red%20phone%20128.png",
				},
				{
					text:"firefox",
					image:"file:///C:/Users/Charlie/Documents/From%20Disk%202/Wikia%20Frontwall/firefox_icon.png",
				},
			],
			dock:"fill",
		});
		
		(myConsole.phoneTab=tabControl.tabs[1]).node.appendChild(
			new jsForms.textBox().node
		);
		(myConsole.ffTab=tabControl.tabs[2]).node.textContent="FireFox is the best!";
		
		document.documentElement.appendChild(
			createElement("div",{
				style:(
					"height:500px;"+
					""//leave here
				),
			},[
				tabControl.node
			])
		);
		tabControl.redraw();

		var colorPicker = new jsForms.colorPicker({
			borderStyle:"none",
			dropDownSize:{height:"200px"},
			sorted:true,
			text:"",
		});
		document.documentElement.appendChild(colorPicker.node,document.documentElement.childNodes[0]);
		

	};
	
	//add own css
	try{addGlobalStyle(jsForms.globalStyle(),"jsForms");}catch(e){log("jsForms.addGlobalStyle: "+e);};
	
})();