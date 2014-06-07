// ==UserScript==
// @name         Integrated Gmail - Header Removal and Navbar Creator for IFrame Content
// @version 1.13
// @author	      Michael A. Balazs
// @namespace      http://www.google.com/
// @include       *
// @exclude http://mail.google.com/*
// @exclude https://mail.google.com/*
// ==/UserScript==

/*****************************************/
/*
sessvars ver 1.01
- JavaScript based session object
copyright 2008 Thomas Frank

This EULA grants you the following rights:

Installation and Use. You may install and use an unlimited number of copies of the SOFTWARE PRODUCT.

Reproduction and Distribution. You may reproduce and distribute an unlimited number of copies of the SOFTWARE PRODUCT either in whole or in part; each copy should include all copyright and trademark notices, and shall be accompanied by a copy of this EULA. Copies of the SOFTWARE PRODUCT may be distributed as a standalone product or included with your own product.

Commercial Use. You may sell for profit and freely distribute scripts and/or compiled scripts that were created with the SOFTWARE PRODUCT.

v 1.0 --> 1.01
sanitizer added to toObject-method & includeFunctions flag now defaults to false

*/

try{if(top.location.href.search("mail.google.com") == -1) return;} catch(err) {};

sessionvars=function(){
	var x={};
	
	x.$={
		prefs:{
			memLimit:2000,
			autoFlush:true,
			crossDomain:true,
			includeProtos:false,
			includeFunctions:false
		},
		parent:x,
		clearMem:function(){
			for(var i in this.parent){if(i!="$"){this.parent[i]=undefined}};
			this.flush();
		},
		usedMem:function(){
			x={};
			return Math.round(this.flush(x)/1024);
		},
		usedMemPercent:function(){
			return Math.round(this.usedMem()/this.prefs.memLimit);
		},
		flush:function(x){
			var y,o={},j=this.$$;
			x=x||self;
			for(var i in this.parent){o[i]=this.parent[i]};
			o.$=this.prefs;
			j.includeProtos=this.prefs.includeProtos;
			j.includeFunctions=this.prefs.includeFunctions;
			y=this.$$.make(o);
			if(x!=self){return y.length};
			if(y.length/1024>this.prefs.memLimit){return false}
			x.name=y;
			return true;
		},
		getDomain:function(){
				var l=location.href
				l=l.split("///").join("//");
				l=l.substring(l.indexOf("://")+3).split("/")[0];
				while(l.split(".").length>2){l=l.substring(l.indexOf(".")+1)};
				return l
		},
		debug:function(t){
			var t=t||this,a=arguments.callee;
			if(!document.body){setTimeout(function(){a(t)},200);return};
			t.flush();
			var d=document.getElementById("sessionvarsDebugDiv");
			if(!d){d=document.createElement("div");document.body.insertBefore(d,document.body.firstChild)};
			d.id="sessionvarsDebugDiv";
			d.innerHTML='<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;'+
						'z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px">'+
						'<b style="font-family:Trebuchet MS;font-size:20px">sessionvars.js - debug info:</b><br/><br/>'+
						'Memory usage: '+t.usedMem()+' Kb ('+t.usedMemPercent()+'%)&nbsp;&nbsp;&nbsp;'+
						'<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>'+
						self.name.split('\n').join('<br/>')+'</div>';
			d.getElementsByTagName('span')[0].onclick=function(){t.clearMem();location.reload()}
		},
		init:function(){
			var o={}, t=this;
			try {o=this.$$.toObject(self.name)} catch(e){o={}};
			this.prefs=o.$||t.prefs;
			if(this.prefs.crossDomain || this.prefs.currentDomain==this.getDomain()){
				for(var i in o){this.parent[i]=o[i]};
			}
			else {
				this.prefs.currentDomain=this.getDomain();
			};
			this.parent.$=t;
			t.flush();
			var f=function(){if(t.prefs.autoFlush){t.flush()}};
			if(window["addEventListener"]){addEventListener("unload",f,false)}
			else if(window["attachEvent"]){window.attachEvent("onunload",f)}
			else {this.prefs.autoFlush=false};
		}
	};
	
	x.$.$$={
		compactOutput:false, 		
		includeProtos:false, 	
		includeFunctions: false,
		detectCirculars:true,
		restoreCirculars:true,
		make:function(arg,restore) {
			this.restore=restore;
			this.mem=[];this.pathMem=[];
			return this.toJsonStringArray(arg).join('');

		},
		toObject:function(x){
			if(!this.cleaner){
				try{this.cleaner=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
				catch(a){this.cleaner=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
			};
			if(!this.cleaner.test(x)){return {}};
			eval("this.iframe="+x);
			if(!this.restoreCirculars || !alert){return this.iframe};
			if(this.includeFunctions){
				var x=this.iframe;
				for(var i in x){if(typeof x[i]=="string" && !x[i].indexOf("JSONincludedFunc:")){
					x[i]=x[i].substring(17);
					eval("x[i]="+x[i])
				}}
			};
			this.restoreCode=[];
			this.make(this.iframe,true);
			var r=this.restoreCode.join(";")+";";
			eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
			eval(r);
			return this.iframe
		},
		toJsonStringArray:function(arg, out) {
			if(!out){this.path=[]};
			out = out || [];
			var u; // undefined
			switch (typeof arg) {
			case 'object':
				this.lastObj=arg;
				if(this.detectCirculars){
					var m=this.mem; var n=this.pathMem;
					for(var i=0;i<m.length;i++){
						if(arg===m[i]){
							out.push('"JSONcircRef:'+n[i]+'"');return out
						}
					};
					m.push(arg); n.push(this.path.join("."));
				};
				if (arg) {
					if (arg.constructor == Array) {
						out.push('[');
						for (var i = 0; i < arg.length; ++i) {
							this.path.push(i);
							if (i > 0)
								out.push(',\n');
							this.toJsonStringArray(arg[i], out);
							this.path.pop();
						}
						out.push(']');
						return out;
					} else if (typeof arg.toString != 'undefined') {
						out.push('{');
						var first = true;
						for (var i in arg) {
							if(!this.includeProtos && arg[i]===arg.constructor.prototype[i]){continue};
							this.path.push(i);
							var curr = out.length; 
							if (!first)
								out.push(this.compactOutput?',':',\n');
							this.toJsonStringArray(i, out);
							out.push(':');                    
							this.toJsonStringArray(arg[i], out);
							if (out[out.length - 1] == u)
								out.splice(curr, out.length - curr);
							else
								first = false;
							this.path.pop();
						}
						out.push('}');
						return out;
					}
					return out;
				}
				out.push('null');
				return out;
			case 'unknown':
			case 'undefined':
			case 'function':
				if(!this.includeFunctions){out.push(u);return out};
				arg="JSONincludedFunc:"+arg;
				out.push('"');
				var a=['\n','\\n','\r','\\r','"','\\"'];
				arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
				out.push(arg);
				out.push('"');
				return out;
			case 'string':
				if(this.restore && arg.indexOf("JSONcircRef:")==0){
					this.restoreCode.push('this.iframe.'+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.iframe."));
				};
				out.push('"');
				var a=['\n','\\n','\r','\\r','"','\\"'];
				arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
				out.push(arg);
				out.push('"');
				return out;
			default:
				out.push(String(arg));
				return out;
			}
		}
	};
	
	x.$.init();
	return x;
}()

var HEADER_REMOVAL = 
{
	checkHeaderRemoval: function()
	{
		if(document.location.href.search("iframe") != -1) 
		{
			if(sessionvars.iframe == null) sessionvars.iframe = {};
			sessionvars.iframe.headers = "false"; 
		}
	
		try{return (sessionvars.iframe.headers == "false");} catch(err) {return false;}
	},
	
	removeHeaders: function()
	{
		if(!HEADER_REMOVAL.checkHeaderRemoval()) return; 
		
		HEADER_REMOVAL.removeHeaders_general();
		if(document.location.href.search("sites") != -1) HEADER_REMOVAL.removeHeaders_sites();
		else if(document.location.href.search("reader") != -1) HEADER_REMOVAL.removeHeaders_reader();
		else if(document.location.href.search("calendar") != -1) HEADER_REMOVAL.removeHeaders_calendar();
	},
	
	removeHeaders_general: function()
	{
		if(document.getElementById("gbar") != null) document.getElementById("gbar").style.display = 'none';
		if(document.getElementById("guser") != null) document.getElementById("guser").style.display = 'none';	
		
		var header_lines = HEADER_REMOVAL.getElementsByClassName("gbh",document);
		for(var i=0; i < header_lines.length; i++) header_lines[i].style.display = 'none';
	},
	
	removeHeaders_sites: function()
	{
		var header_lines = HEADER_REMOVAL.getElementsByClassName("goog-ws-top goog-ws-clear",document);
		for(var i=0; i < header_lines.length; i++) header_lines[i].style.display = 'none';	
	},
	
	removeHeaders_reader: function()
	{
		if(document.getElementById("logo-container") != null) document.getElementById("logo-container").style.display = 'none';			
		if(document.getElementById("global-info") != null) document.getElementById("global-info").style.display = 'none';
		if(document.getElementById("search") != null) document.getElementById("search").style.display = 'none';
		if(document.getElementById("main") != null) document.getElementById("main").style.top = '0px';

		HEADER_REMOVAL.simulateOnMouseDown(document.getElementById("overview-selector"));
	},
	
	removeHeaders_calendar: function()
	{
		var body = document.getElementsByTagName("body");
		body = body[0];
		body.style.padding = "2px";
	
		if(document.getElementById("topBar") != null) document.getElementById("topBar").style.display = 'none';			
		if(document.getElementById("clst_my") != null) document.getElementById("clst_my").className = "calHeader normalText goog-zippy-collapsed";
		if(document.getElementById("lhscalinner_my") != null) document.getElementById("lhscalinner_my").style.display = 'none';		
		if(document.getElementById("clst_fav") != null) document.getElementById("clst_fav").className = "calHeader normalText goog-zippy-collapsed";
		if(document.getElementById("lhscalinner_fav") != null) document.getElementById("lhscalinner_fav").style.display = 'none';		

		if(HEADER_REMOVAL.getElementsByClassName("modelinkOn").length != 0) HEADER_REMOVAL.simulateOnMouseDown(HEADER_REMOVAL.getElementsByClassName("modelinkOn")[0].parentNode);
		window.addEventListener("resize",function()
		{
			if(HEADER_REMOVAL.getElementsByClassName("modelinkOn").length == 0 || document.getElementById("mode_link4") == null) return; 
			
			var currentView = HEADER_REMOVAL.getElementsByClassName("modelinkOn")[0].parentNode; 
			if(currentView.id == "mode_link3" || currentView.id == "mode_link4") 
			{
				HEADER_REMOVAL.simulateOnMouseDown(document.getElementById("mode_link4"));
				HEADER_REMOVAL.simulateOnMouseDown(currentView);
			}
		},false);			
	},

	getElementsByClassName: function(classname, node) 
	{
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++) if(re.test(els[i].className)) a.push(els[i]);
		return a;
	},

	simulateOnMouseDown: function(node)
	{
		var evObj = parent.frames[0].document.createEvent('MouseEvents');
		evObj.initEvent( 'mousedown', true, true );
		node.dispatchEvent(evObj);
	}	
};

var HISTORY_FUNCTIONS = 
{
	loadNavButtons: function()
	{
		if(!HISTORY_FUNCTIONS.checkNavButtonLoad()) return; 
		
		HISTORY_FUNCTIONS.add();
		HISTORY_FUNCTIONS.displayNavButtons();
	},

	checkNavButtonLoad: function()
	{
		if(document.location.href.search("ads") != -1) return false; 

		if(document.location.href.search("navbuttons") != -1) 
		{
			if(sessionvars.navigation == null) sessionvars.navigation = {};
			sessionvars.navigation.buttons = "true"; 
			
			if((document.location.href[document.location.href.search("navbuttons")+10]).toLowerCase() == "l") sessionvars.navigation.button_location = "left";
			else sessionvars.navigation.button_location = "right";
			
			sessionvars.navigation.home_location = document.location.href;
		}

		try{if(sessionvars.navigation.buttons == "true") return true;} catch(err) {return false;}
	},
	
	reset: function()
	{
		sessionvars.navigation.history = new Array();
		sessionvars.navigation.historyPosition = -1;
		sessionvars.navigation.historyLastOffset = 0;
	},
	
	add: function()
	{
		if(sessionvars.navigation.historyPosition == undefined) HISTORY_FUNCTIONS.reset();
		if(sessionvars.navigation.history[sessionvars.navigation.historyPosition] == document.location.href) return;
			
		sessionvars.navigation.historyPosition++;
		sessionvars.navigation.history[sessionvars.navigation.historyPosition] = document.location.href;
	
		if(sessionvars.navigation.historyLastOffset == -1) HISTORY_FUNCTIONS.clearAfter();
		
		sessionvars.navigation.historyLastOffset = 0;
	},
	
	clearAfter: function()
	{
		for(var i = sessionvars.navigation.historyPosition+1; i < sessionvars.navigation.history.length; i++) sessionvars.navigation.history[i] = "";
	},
	
	navigate: function(offset)
	{
		if(offset == "home") {document.location.replace(sessionvars.navigation.home_location); return;}
	
		if(sessionvars.navigation.history[sessionvars.navigation.historyPosition+offset] == undefined || sessionvars.navigation.history[sessionvars.navigation.historyPosition+offset] == "") return;
	
		sessionvars.navigation.historyPosition += offset;
		sessionvars.navigation.historyLastOffset = offset; 
		
		document.location.replace(sessionvars.navigation.history[sessionvars.navigation.historyPosition]);
	},
	
	getAddress: function(offset)
	{
		if(sessionvars.navigation.history[sessionvars.navigation.historyPosition+offset] != undefined) return sessionvars.navigation.history[sessionvars.navigation.historyPosition+offset];
		else return "";
	},
	
	displayNavButtons: function()
	{
		var body = document.getElementsByTagName("body");
		body = body[0]; 

		var navDiv = document.createElement("div");

		if(sessionvars.navigation.button_location == "left") navDiv.setAttribute("style","position:fixed; left:3px; top:3px; z-index:100");	
		else navDiv.setAttribute("style","position:fixed; right:3px; top:3px; z-index:100");	

		var backIMG = document.createElement("img");
		var reloadIMG = document.createElement("img");
		var homeIMG = document.createElement("img");
		var forwardIMG = document.createElement("img");

		if(HISTORY_FUNCTIONS.getAddress(-1).search("http") == -1) backIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwwXFIQrK30AAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAAL2SURBVDjL3ZTLSxxZFMa/+2pNdzYjWZjGWbgaikLGnQo2+IC2SsfNCAMjribLuMq/kF0YGAy4ym7GEOJK11lIyM7N2G5mGimoRnRGFFpt6Xr0rTqzSN2ijG2S9Vz4OFVw7u9859StC/wvV7VaXXBd9z3nXH4uT34t0LKsp67rvmi32w8YYxKAvi+XfwnGGOOTk5ObKysrL1ZXV8uMsfRLez7fhpSV+fn5nbm5uemZmZlBKb+usXuzyuVy1XGcvXq9Pjo2NqY8z4NlWWCMxWtra8Gn+VEUnW9vb1fTNNV9oUNDQ+Ou675bXFz8Znh4WDSbTQBAkiRYX19/wBgzo8n3bGxsDJlZ34GOjIz8sLCw8GZpaemhUgrNZhOMMQghcHBwAM45GGN5ZIzBtu3727dt+1mtVnu+vLxc7nQ68H0fQghwzkFEOdzAOOd5B0R0FzoxMfFyamrql3q9Xj49PcXFxQWEECCi3JUQ4haAMQYpJdI07Q+tVCpVIQQjIvR6PfR6PWj98SgqpaC1hhAidwoARIQgCPK8O9C9vb2fbm5ufut2u08cx6kMDg7C930opcA5R6lUglIqB5u2tda3XN6CElG6v7//rN1u/x2G4a+O45Qty0Kr1YKUEkqpHKyUAhFBa404jvMi5mcqfigFYODo6Ojt9fX1P1rr32dnZx/ats1arRY45xgfH88LGKhxm42kDKAnC45LmQbOzs4OdnZ2fgzD8I9arfbItm3p+z6ICJubm1EcxwN9Dv8lEXEAJQMVmaRRp9P5d3d39+dut/vy6urqu+np6VLmSm1tbTlJknQARJnCLAJAPgzZT0mSJJ7nvYuiaCQMw29HR0dlo9GgRqPxmohiAEkmXXw2UJYNuSgAYESUHB8ff7i8vIyDIPg+jmN5eHj4iogCAD0AcRaNYgNNAVAGL74bF/r8/PzPk5OTvyqVymPP895m0KigGEAAIGSfXp/mFGRRFubNMlGhoClqwBoFZ/2WyMYgCjJdpAVokhXJ13+lMWh9fY3qsAAAAABJRU5ErkJggg%3D%3D");
		else backIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwIhNDzHt8oAAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAAM+SURBVDjL3ZRNaB1VFMd/92PmmZek2CpKo8HmdVHRViO6CPTVahtN1PrRxtiUgEJ1Iy7EgivRjbgpiFhQUTfRolJBaKQrixV1k1bbKEbUUpH4LLE+274kTd57M3PvcZF5ydAkbdde+HNmhnt/55z/XA78L9fVa1TP+gHztdLYS+2zVwpcfYd+rmtHYW95qtSktLPiSZbbqy9LU+hCt37rvsHOvc/2vZTXyvrLHblkpSag+ebt5uCWrfcUezf2XxXY8Iq6WhYattC2Yaf56oHuxzruvGVjMHr6C7rWPIJSRF3P2+rF+5Ma5e/eSdrEkywJbb5OdW4YCA9vv39w5Q3Xt5uj44cAwXnHy7vfbtJKo1AoteDeK+89s0rpxC4JXVlQ2zr7Wj/p63myReeEo+Ofo5XB6IAvT36AVhatNEYbFBqlFMVC//Ltt92l96zvuebVx3ufyp+tjnOqdAKjA6wO8OLx3mG0RStD4jU6rdT5GEEWQwtb9b7bNrfvfmhLf/7k2WOcrvy2ABNHoDzeREQqwUkMApaQnGklkRiRJaBhK23KoARHnNSoJ7PEyiAIJgRI0AjaKJRWAIgXpAaz/vzS7f867J+oT5XemKnuf/rR7oHmfLiCsYlvsKHCGI3NaWxoMFahjUIAcYKLBa+iZS6/4P844vf8OHzuxU8PDc2uCtvp6niYIAgwgcaGmiCnCZsMuWZDLm8Imgw2p+eTNHjZHxUAuTM/+QPV8zMTUfLxhz2bt7Vs6tipjpeHER3xYOEFrLWYQCMi+ERwyVxkzpE8ENuMDWGq3NRf8sPoULQjqR7cf3fx3muLtw7a78ufIR5ef/e1elyPcxdfRVelIh4NhA2oSWUbqlXk79Eht6t24ci+ycnJdZuKu0JxChdLMPJm0usTpoF6qloaAYzJVLpI3uHKP8vhaTdx41R8pn3tTevs8bERKY0kH4knAlyqJPts5mfRnMlZzX0X3LlTfFupVKJ/3e+31+MZWxpx74unCsRAlMaGogbUA0LD7oX3RhXJ9ISMlv+88Eu4Qlb/MyYHEKqZ9uspvArU1KLpmd6CNNqM3yqVZBI2kjbACZnKlhynqQ0mo0YXPgN1aZL59R+Up1t9w0g38AAAAABJRU5ErkJggg%3D%3D");
		reloadIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwI6BLMoTPwAAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAATtSURBVDjLtVVrbBRVFP7u3Jmd2Z3tbst2S1/Qsm2hT7EtFUrBQKVBJUBARUgMUUMQjX98JkqCP3zF8IMESYCExIAQAgYj5aGJFpFHCuXRJ6H0IX3Qd7e77T5mZ2Znrj/YYlsw/PIkX3Jzzr3fPd+995wL/A9GnzaBEI4CjD1tnhjnziSE40xDU/iZQcmZPD+9ZP2nzvSCSk50pDBCBWKoQUMNDPt6Wy54O6/9FBhovcRMQ59cI1idsxes+bym9ezXlVCDY/zUnLJXbj+UmLN08/KSeZaCrBTeLovgOAJN050hRXd29Zd7bra8sGXEH6EDDWe+G2j6dQ8hhMtfv+uSEOf2TCoik5TZlTt+KFn24qa31pfZVN2APxhBnE2ETRRAOYBwBGAACEEwrKLmelvkenOPpgZ9/ZXLF3ma2/v1y4fez9VCYw94AJCTshbPLVj26ksVebZ9J+vMUb/CcRxgGiYzmRl1OwSlvDhbLs1LpYwBis5QtTRPWrzQI3X0eONWlWWShnt9UcaYCQA8AKQWVu1ISHDIh07fYpTyRBQQ6W+tre744/vXqSgnSI7knI6mNR+e85SuXb0s31oyP5n0eRXohomygjQi8BwMwwRg/ksan7Fwdc/ABHHZ6ZiIQFffmJYy0Hh2NwAYasgXGumsa/t972abK+PZ4Oi2g3WZOYVb15bZJKuEi83D2PJ8BkyTkclMuYdXxIvUCPWN/335YG9TzdHI+GBbVA37Zr6MsLe7obv2+GcBJUrjrAL6vApMAJLAwTBBMFW+rkXCgY6Le33dt8+EA/5RXa8+bOjKxExS66w5Rbkvf1z93qZy0Z1gQ0qijBWFSRAFCsNkj0gJABCO8oyZ5qTzSSbY4lPyN3x1U7A5U3gKjZkMjAEMDGAAI9RSf3j7LEML+wkAFG89MEIFyf4kMkNTAvfOf1ul+AdaOSpY/2tTjvKirgSGH1Xfom1H9La+cdY1FGBdQ0HWPRxk9x742Ss7f464cireeKx0OSpQi81JeYtodyYmp+ZWbCzeemB0Mj5ZUUSy8LjQPAQChqW5bvz4W5N648Kpfd72q0cfOwqrc3bWim37+fG2XyQ53s2nPfeOwThjOikhIATQoyY8yXYQAI0dw0x2zS2yyK45WsjbO60LWawOmzu7PCVjjj1M44smIsSl++5fm9alUks3frFlVR6RJR4jExFETeC1lbm8KbkyJxwl71JBclCLLZ4Kkl10JGZkVLy5z5mUnqUS2cMLglUW+Wj7lRNfhr1d9VPlgxCCsKIhP80JNWrg9n0fVpRm0iWF6ba6lryPege9kUFvkPhDpkwpwWyXHbnzkpAYL5Mjp69FvB1Xj02Tz3GEdA1O4JM95/2UI9ya5QssVUtyJF8oCoMBpQXp/DO5aXZCHlaLbjJEoyb8QRVHqmuDXZcPf2AaemSqfJpaumHXlfrO0K2TO9d1Xz+xp7H5bn9tp54VUJgsCDznkEVitwpgDDBME4Gwhht3eszqP1vU+1eP7x6+W3MsxsUAGASAVPz2D772c99sCg613wFgjUGS3fMWphav2+xMKyohgiDaBE5XNJMyBkz0NlzpvXlqf9jb0whAiSEMIEwAEOfc4g3jPfV/AZAAiFMgxEAJFQSLLX5WVA35DC3sA6ABUGNQAARiY0ae8GcJM8BPlRaDHoMGIBrzPbJ/ANXvKvf92Nf/AAAAAElFTkSuQmCC");
		homeIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwIfIGfYeMoAAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAAMwSURBVDjLpZVNbBtFFMd/M951YjfGm2wDdRE4HGjq+FIJhUbKhQMtEoraVFaUCIpyrlSf0FYIVC4cV0iFRHACivAhfFRaB/XEtYceuFSIcgBBhaIkIvVHS1y7sXeGw65XNo3bSB1ppNl58356+3/vzcABhgWZEugS6Cyc4GnHS/BKCfSu4+hdx9El0BZkHucjngT8CH6ed5y+fc91uQhH67C1n588CPDejRvRfnV9nXnHYRU2B0UsnwRs3brFiG332Q8CHqhh/dw5fX9hIdKyu3/n2DH99+TkQI3loAj15iYylUJOTOC5Lr/NvcnGW0t4rsvhs2fpaD0w4ihRs3D+Anwz7zjoWi0wjo7iuS6Nd95m5/gkzz17hJdrdTYuXWLecdgul4kLwdiZM33Ji6Al0POOA80m7O1BOo3nujx03uX+80fJ5fIkEwlarRbJrW3uLC8HYM8jLmUEPg/CADBhuAvXzSZibAzPddEfu0jb5kR2gmw2G9g17L3wIub166wVCiwVi2x7Xl9eDIAhSEZ6hMDYV1/QMUxmT85gWVbkoLUOusyysG/eZG1mhqVi8fEldeXaD/hXv6RtGExPv8rIyAi+7/fNdruN7/sM2Tanb99mbWWlt5tkpOmp0dHl5Vrt6sk/fuf9D957pNRWP/0MpRRXPllBixi600IYw2j/IR9evkw5leI72y6uVyqrUaQ/1WpflxcL2GNBoedyx5maypHPT5HPT+H7PkoptJDEJk4HUWVPgYyjtaa8WODHavXzfX+/q1k8Hsc0TQzDwDRNlFL4vo/Wms3KLgC//HkX31eRjw4X8v9J6x6QUiKlJC43MEQVpRRKKTrE+fWvCgD/1B7QEUORD0EVBSUFxIBDvVAhArkVGZqtAJjJZHhtdpo3EoeQ+givS5OdLXqhNrBlhF1lDILCEIkEKKUAuFe7i6hX+i+YarWvQ42eD9nV0rIs0uk0AknAFoyPj9NoNJibm3ukMpLJqMwbgBYhMAakFhYL1ad5Jb7/9poJdERPpEbQXAwDz4T6HAYSoc0Pz+6G6zZQB/4FdoAH3TNin6elK4UIrgVEj60L1uH0w6l7I/4P0AphB7lKAb0AAAAASUVORK5CYII%3D");
		if(HISTORY_FUNCTIONS.getAddress(1).search("http") == -1) forwardIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwwWMKEz/u0AAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAALrSURBVDjL1ZXBSxtBFMa/2dnd7JqsiFA8BA0Ue+gtF1EICIVeFGqhiFKECu0pCEU89dgeCv0fSqGE3gRFCpoEMWhS01BEigFJChVMxUgawdBsNpud3R46G1abqtBeOvB4b3bf/uZ7b2ZY4H8Z9KqEsbGxlGEY1VqtVvxn0Egk8nZ4ePjB2dmZXqlUPl4HKl4naWZmRgkEAi97enpub29vRx3HYX8NFUUR4+Pjand39yNN026tr6/fsyzrx5XQ6enpsqIofR1yDMaYcnBwgJGREZ+maRG/378bj8fv1Ov1b5dCFUXpW1hYOPfScRwAUBzHQaPRQLFYxODgoDQ5OXlTUZTPa2trd09PT3cvLd+2beTz+TbQcRzYtt32tm2jUCigv79fmJqa6lVVNZ1IJB6WSqX3HXc/HA4/HxoawvHxcRvAGGvHlmW1fbVahaqqCIfDMoD7uq43K5VK9o9Km80mTNOEZVm/VqUUoihCEAS3HQCAw8ND9Pb2YmJioktRlBeBQCCUy+We/gbVdR3lcrk9FwQBoii2TZIkEEJACAGlFIIguHnE7/cHOypljJ0DyrIMSZIgyzIopaCUtisKBoPQNA0rKyv6zs7Om1wuN3/lOXXVybIMn88HSZJAKQUhBMFgEK1WC4uLi/rW1tazQqHwutPuS+6D0dHRc1C3p/v7+1BVFQMDAzg6OnKWl5fryWTySblc3gTQxVlNAC2RT2TDMCqxWOzGRcWEEHNubk6WJAmhUAj5fJ4lEonq6urq41qt9gWACkBwjzYARgD4uCmd4tnZ2Q/RaBSMMWQyGTOTyXxNJpPzzWbzO1dmcO/GxrXuvmEYiMfjZjabzaTT6Ve2bdcvSbdFAIybxS8DBWACILwcLC0tmalU6s3e3t47ntviZvLvvMZEHoBDAMD2LCKenJx82tjYiJVKpU2+iO0BuOAWgAYv3yHePeGnwMe96FFOPMqdC9W5/bRwQV2nP4LggVJPFbYHytwWecdPg/9cgB54gywAAAAASUVORK5CYII%3D");
		else forwardIMG.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWCAYAAAAvg9c4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gLCwIhHX51L6YAAABIdEVYdENvbW1lbnQAKGMpIDIwMDYgSmFrdWIgU3RlaW5lcgoKY3JlYXRlZCB3aXRoIHRoZSBHSU1QIDo6IGh0dHA6Ly9naW1wLm9yZyP/WEAAAAMlSURBVDjL1ZRNbBVVFMd/986deR9avozWjxgSYsSPLjChJraJxkTRmKgRA9gYSBQTxYUhspCVgQ1xxVIXBkKqxlIJRmkoCo2pxS9soFC1QtNG6ZMC2lfpa9+br3uvi84z0/bxZMHGSf6ZOzPn/u45Z8458H+5nP8yaHrB+SoqM+FPcu66Qe96wtm3qvXutX9PFculC/b76wK9s0XueGvjblXOFx4u2fHlk6P2MGDr7ZHXdLLjsu7xV3JPr1+z6f71zjHH5cZ69qq6aH5dXXRzNC40Eb4xcXbgwjEeaX4ys7hhaeuhhs5Tg/v1o2GJQl2om6Nx12vtcz5aa7DYrLYx00GR/vPd3Lei1W1bu3mFl28/faYjeGzmsj11VShAbEL6RjoToMVi0EZjrMHYGG1iTpzv4p7Gh+Sm57Ys+yS3t2/gwFRbccQeumpOtYkJ4gpBXCHUPkHsE+mASPuEsU+ofcK4wsmxL5jS47z4zJYbHmy7peP21XJbHU8jKlGJSjRNpIPZtEgPV3kgBVZojIgxIuKXS8e5reESG556KZ/P7t85sPj35aM95o0F0JJf5LeJQWxSMUKC40ocI3BcB095SOUgjMAIjVUBRmiQCK9B3FHT08gEc4BuRqK8WUklkE4MxBhjWbmkhVu9e+ns2lce/nZiz2iP2VoTOqc2XYnjSlRG/guXSiCFpGnpGpzyIj46uLc81D29/eJp836tnLrVF+se2I4ApBKzYCVwlODL8d3kczlW3fQsl8eu2IOfts/8dMDffGXM9gL5hBUAkUoevLDCn+917Lp5QcsJEb756tte1lnE6mXPMzQ4pI8cOTpx5mP9sj9ph4FcqoosoFXS/07/u3ETkEmUra5btqlvjLY0L9lAb09f+F3fidGfO/XW2OcvwAMMoBPFgFLX0vt+xafr6Ofhya/PHh8+bN+xhpk65kbNO8VJFAKiOo06PvsgHOj+Y0/hB/thYhslCpN9aWmVLEggpMKJATVVMD/+2l9oL47Y3uQQkwJUwRFQAXzAivQ4Sqogk9xVynOR8tzOiy5IFDPPu1rDW6agTiqK9I/RtQb2P8eebM4jJrChAAAAAElFTkSuQmCC");

		backIMG.setAttribute("height","16px");
		reloadIMG .setAttribute("height","16px");
		homeIMG .setAttribute("height","16px");
		forwardIMG.setAttribute("height","16px");

		if(HISTORY_FUNCTIONS.getAddress(-1).search("http") == -1) backIMG.setAttribute("style","padding: 1px;");
		else backIMG.setAttribute("style","padding: 1px; cursor:pointer");
		reloadIMG .setAttribute("style","padding: 1px; cursor:pointer");
		homeIMG .setAttribute("style","padding: 1px; cursor:pointer");		
		if(HISTORY_FUNCTIONS.getAddress(1).search("http") == -1) forwardIMG.setAttribute("style","padding: 1px;");
		else forwardIMG.setAttribute("style","padding: 1px; cursor:pointer");
		
		backIMG.setAttribute("onClick","navigate(-1)");
		reloadIMG.setAttribute("onClick","navigate(0)");
		homeIMG.setAttribute("onClick","navigate('home')");		
		forwardIMG.setAttribute("onClick","navigate(1)");
		
		backIMG.setAttribute("alt",HISTORY_FUNCTIONS.getAddress(-1));
		reloadIMG.setAttribute("alt",HISTORY_FUNCTIONS.getAddress(0));
		homeIMG.setAttribute("alt",sessionvars.navigation.home_location);		
		forwardIMG.setAttribute("alt",HISTORY_FUNCTIONS.getAddress(1));

		navDiv.appendChild(backIMG);	
		navDiv.appendChild(reloadIMG);
		navDiv.appendChild(homeIMG);
		navDiv.appendChild(forwardIMG);
		
		body.appendChild(navDiv);	
	}	
}

unsafeWindow.navigate = function(offset){HISTORY_FUNCTIONS.navigate(offset)};

window.addEventListener("load", function(e) {HEADER_REMOVAL.removeHeaders(); HISTORY_FUNCTIONS.loadNavButtons();}, false);