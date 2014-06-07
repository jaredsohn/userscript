// ==UserScript==
// @name           	WM Common Library
// @description	A collection of useful functions and objects, some of which are specific to the Wall Manager family of scripts.
// @require		http://userscripts.org/scripts/source/123889.user.js
// @license		http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        	3.1.2
// @copyright       Charlie Ewing except where noted
// ==/UserScript==

(function(){
var sandbox=this;

//***************************************************************************************************************************************
//***** Greasemonkey and Browser Type Validation
//***************************************************************************************************************************************

// is Greasemonkey running
sandbox.isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');
sandbox.isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

//***************************************************************************************************************************************
//***** Global Enumerated Values
//***************************************************************************************************************************************

//enumerated string equal to script that does nothing
sandbox.jsVoid="javascript:void(0)";

//time enums
sandbox.second=1000;
sandbox.minute=second*60;
sandbox.hour=minute*60;
sandbox.day=hour*24;

//***************************************************************************************************************************************
//***** Data Type Verification
//***************************************************************************************************************************************

//return true if o is undefined
sandbox.isUndefined=function(o){try{return ((typeof o)=="undefined");}catch(e){log("wmLibrary.isUndefined: "+e);}};

//return true if o is a string
sandbox.isString=function(o){try{return ((typeof o)=="string");}catch(e){log("wmLibrary.isString: "+e);}};

//return true if o is not undefined
sandbox.exists=function(o){try{return (!isUndefined(o));}catch(e){log("wmLibrary.exists: "+e);}};

// Returns true if object o is an array
sandbox.isArray=function(o){try{return Object.prototype.toString.call(o)==="[object Array]";}catch(e){log("wmLibrary.isArray: "+e);}};

// Returns true if object o is an array and has a length > 0
sandbox.isArrayAndNotEmpty=function(o){try{return isArray(o) && o.length>0;}catch(e){log("wmLibrary.isArrayAndNotEmpty: "+e);}};

// Returns true if object o is an object but not an array
sandbox.isObject=function(o){try{return (((typeof o)=="object") && !isArray(o));}catch(e){log("wmLibrary.isObject: "+e);}};

//return true if o is undefined
//sandbox.isNaN=function(o){try{return (o.toString()==="NaN");}catch(e){log("wmLibrary.isNaN: "+e);}};

//return integer value of object
sandbox.val=function(o){try{return parseInt(o);}catch(e){log("wmLibrary.val: "+e);}};

sandbox.calcTime=function(timer) {try{

	if ((typeof timer)=="integer") return timer;
	
	if (timer.match(/^(\d)/)) return val(timer);

	//debug.print(timer);
	var t=2; //defaults to 2 minutes on error
	//check for U:# time format (u = millisecond count)
	if (timer.toLowerCase().startsWith("u:")) {
		t=parseInt(timer.toLowerCase().split("u:")[1]||"");
		return t;
	} 
	
	//check for s:# (s = second count)
	if (timer.toLowerCase().startsWith("s:")) {
		t=parseInt(timer.toLowerCase().split("s:")[1]||"")||0;
		return t*1000;
	} 
	
	//check for t:#D:#H:#M:#S time format
	if (timer.toLowerCase().startsWith("t:")){
		var fnNumberFromHMSDate = function(i,l) {
			var teststring = "(\\d)*?"+l;
			var test = new RegExp(teststring,"i");
			var testret = test.exec(i);
			//debug.print([i,teststring,testret]);
			return parseInt((testret||["0"])[0]);
		};
		t=timer.toLowerCase().split("t:")[1];
		//it should now be in "1d:2h:5m:30s" format
		var d = fnNumberFromHMSDate(t,"d");
		var h = fnNumberFromHMSDate(t,"h");
		var m = fnNumberFromHMSDate(t,"m");
		var s = fnNumberFromHMSDate(t,"s");
		//debug.print([d,h,m,s]);
		
		return ((s*second)+(m*minute)+(h*hour)+(d*day));
	}
	//do originally programmed time words
	
	switch(timer) {
		case "off": return 0; break; //off
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
		case "fifteen": t = 15; break; // 15 minutes
		case "thirty": t = 30; break; // 30 minutes
		case "hour": t = 60; break; // 1 hour
		case "2hour": t = 60*2; break; // 2 hours
		case "3hour": t = 60*3; break; // 3 hours
		case "4hour": t = 60*4; break; // 4 hours
		case "8hour": t = 60*8; break; // 8 hours
		case "12hour": t = 60*12; break; // 12 hours
		case "18hour": t = 60*18; break; // 18 hours
		case "24hour": t = 60*24; break; // 1 day
		case "36hour": t = 60*36; break; // 1.5 days
		case "48hour": t = 60*48; break; // 2 days
		case "30s2m": t = (Math.random() * 1.5) + 0.5; break; // random between 30s and 2m
		case "2m5m": t = (Math.random() * 3) + 2; break; // random between 2m and 5m
		case "5m10m": t = (Math.random() * 5) + 5; break; // random between 5m and 10m
	}
	return Math.round((t*60000)+(Math.random()*(t*100)));
	
}catch(e){log("wmLibrary.calcTime: "+e);}};

//comprehensive convert anything to a boolean value
sandbox.cBool = function(x){try{
	//log(x||"undefined");
	//capture undefined
	if (!exists(x)) return false;
	//capture nulls
	if (x==null) return false;
	//capture checkboxes
	if (exists(x.checked)) x=x.checked;
	//capture objects with value property
	if (exists(x.value)) x=x.value;
	//capture boolean values
	if ((typeof x)=="boolean") return x;
	//capture non-null objects
	if (isObject(x)) return true;
	//capture arrays
	if (isArray(x)) return true;
	//capture text
	if (typeof x=="string") {
		var trueVal=x;
		if (exists(x.toLowerCase)) trueVal=x.toLowerCase();
		switch(trueVal){
			case "1": case "true": case "yes": case "checked": return true; break;
			case "0": case "false": case "no": case "unchecked": return false; break;
		}
	}
	//default
	return Boolean(x);
}catch(e){log("wmLibrary.cBool: {x="+x+"}: "+e);}};

//***************************************************************************************************************************************
//***** Logging
//***************************************************************************************************************************************

// cross-browser log function, turns the log variable into a function
// originally from FVWM by Joe Simmons
// now also catches the WM debug window first
sandbox.log=function(){try{ 
	var fx, debug=this.debug;
	if (exists(debug)) fx=debug.print;
	else if (isGM) fx=GM_log;
	else if (window.opera) fx=opera.postError;
	else fx=console.log;
	if (fx) {var args=arguments, self=this; setTimeout(function(){fx.apply(self,args);},0); }
}catch(e){console.log("WmLibrary.log: "+e);}};

//***************************************************************************************************************************************
//***** Style Sheet Creation
//***************************************************************************************************************************************

//append css style to the header
//supply a name and this function will force that style sheet to have an id attribute equal to the name supplied
//supply a doc object and the stylesheet will be put in that document instead of this one
sandbox.addGlobalStyle=function(css,name,doc) {try{var head, style;head = (doc||document).getElementsByTagName('head')[0];if (!head) { return; };style = (doc||document).createElement('style');style.type = 'text/css';style.innerHTML = css;head.appendChild(style); if(name||null) style.setAttribute("id",name);}catch(e){log("wmLibrary.addGlobalStyle: "+e);}};

//***************************************************************************************************************************************
//***** Mouse Events
//***************************************************************************************************************************************

//click specified DOM element
sandbox.click=function(e) {try{if(!e && typeof e=='string') e=document.getElementById(e);if(!e) return;var evObj = e.ownerDocument.createEvent('MouseEvents');evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(evObj);}catch(e){log("wmLibrary.click: "+e);}};

//pretend to put the mouse over specified DOM element
sandbox.mouseover=function(e) {try{if(!e && typeof e=='string') e=document.getElementById(e);if(!e) return;var evObj = e.ownerDocument.createEvent('MouseEvents');evObj.initMouseEvent("mouseover",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(evObj);}catch(e){log("wmLibrary.mouseover: "+e);}};

//***************************************************************************************************************************************
//***** DOM Creation/Manipulation
//***************************************************************************************************************************************

//return a DOM element by ID with optional alternate root document
sandbox.$=function(ID,root) {try{return (root||document).getElementById(ID);}catch(e){log("wmLibrary.$: "+e);}};

//return new DOM element a, with parameters b, and children c
sandbox.createElement=function(a,b,c) {try{
	if(a=="text") {return document.createTextNode(b);};
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) {
		if(prop.indexOf("on")==0) {
			ret.addEventListener(prop.substring(2),b[prop],false);
		} else if ( 
			",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1
		) {
			ret.setAttribute(prop.toLowerCase(), b[prop]);
		/*} else if (
			!exists(ret[prop.toLowerCase()])
		} {
			ret.setAttribute(prop.toLowerCase(), b[prop]);*/
		} else {
			ret[prop]=b[prop];
		}
	}
	if(c) c.forEach(
		function(e) { 
			if (e) ret.appendChild(e); 
		}
	);
	return ret;
}catch(e){log("wmLibrary.createElement: "+e);}};

//return document.location.pathname
sandbox.getDocName=function() {try{return document.location.pathname;}catch(e){log("wmLibrary.getDocName: "+e);}};

//remove specified DOM element
sandbox.remove=function(e) {try{var node=(typeof e=='string')?$(e):e; if(node && node.parentNode) node.parentNode.removeChild(node); node=null;}catch(e){log("wmLibrary.remove: "+e);}};

//return selected nodes using xpath, with additional parameters
sandbox.selectNodes=function(xPath,params){try{params=(params||{});var doc = (params.doc||document), node = (params.node||doc); return doc.evaluate(xPath,node,null,(params['type']||6),null);}catch(e){log("wmLibrary.selectNodes: "+e);}};

//return single selected node using xpath, with additional parameters
sandbox.selectSingleNode=function(xPath,params){try{params=params||{}; params['type']=9;return selectNodes(xPath,params).singleNodeValue;}catch(e){log("wmLibrary.selectSingleNode: "+e);}};

//for the selected nodes using xpath and additional parameters, perform passed function
sandbox.forNodes=function(xPath,params,fx){try{if(!fx) return;var nodes = selectNodes(xPath,params);if (nodes.snapshotLength) {for (var i=0,node;(node=nodes.snapshotItem(i));i++) {fx(node);}}nodes=null;}catch(e){log("wmLibrary.forNodes: "+e);}};

//fetch the selected elements from an html select multi into an array
//this fetches the ELEMENT not its value
sandbox.getSelectedOptions=function(elem){try{
	var ret=[];
	for (var i=0; i<elem.options.length; i++) {
		if (elem.options[i].selected) ret.push(elem.options[i]);
	}
	return ret;
}catch(e){log("wmLibrary.getSelectedOptions: "+e);}};

//fetch the selected values from an html select multi into an array
//this fetches the VALUE not the element
sandbox.getSelectedOptionValues=function(elem){try{
	var ret=[];
	for (var i=0; i<elem.options.length; i++) {
		if (elem.options[i].selected) ret.push(elem.options[i].value);
	}
	return ret;
}catch(e){log("wmLibrary.getSelectedOptionValues: "+e);}};

//attach an array of elements to a node
sandbox.appendChildren = function(node,arr){try{for (var i=0,len=arr.length;i<len;i++){node.appendChild(arr[i]);};}catch(e){log("wmLibrary.appendChildren: "+e);}};

//create a set of options for a selection list based on an array
sandbox.optionsFromArray = function(arr){try{var ret=[];for (var i=0,len=arr.length;i<len;i++) {ret.push(createElement("option",{value:arr[i],textContent:arr[i]}));};return ret;}catch(e){log("wmLibrary.optionsFromArray: "+e);}};

//select an element from a dropdown box with a certain value
sandbox.selectDropDownElement = function(obj,value){try{var node = selectSingleNode(".//option[@value='"+value+"']",{node:obj});if (node) node.selected=true;}catch(e){log("wmLibrary.selectDropDownElement: "+e);}};

//return the value of a dropdown's selected inded
sandbox.valueOfSelect = function(obj){try{return obj.options[obj.selectedIndex].value;}catch(e){log("wmLibrary.valueOfSelect: "+e);}};

//hides all snapshots or iterations in an xpathResult object
sandbox.hideNodes=function(xPath,params) {try{forNodes(xPath,params,function(item){item.style.display="none";});}catch(e){log("wmLibrary.hideNodes: "+e);}};

//unhides all snapshots or iterations in an xpathResult object
sandbox.showNodes=function(xPath,params) {try{forNodes(xPath,params,function(item){item.style.display="";});}catch(e){log("wmLibrary.showNodes: "+e);}};

//move element up
sandbox.elementMoveUp=function(e){try{
	//if this element has a parent
	if (e.parentNode) {
		//and its not the first child
		if (e.parentNode.firstChild!=e){
			//move it to just before its previous sibling
			e.parentNode.insertBefore(e,e.previousSibling);
		}
	}
	return e;
}catch(e){log("wmLibrary.elementMoveUp: "+e);}};

//move element down
sandbox.elementMoveDown=function(e){try{
	//if this element has a parent
	if (e.parentNode) {
		//and its not the last child
		if (e.parentNode.lastChild!=e){
			//if the next sibling IS the last child
			if (e.parentNode.lastChild==e.nextSibling){
				//just move it to the bottom
				e.parentNode.appendChild(e);
			} else {
				//insert it between the next sibling and the next next sibling
				e.parentNode.insertBefore(e,e.nextSibling.nextSibling);
			}
		}
	}
	return e;
}catch(e){log("wmLibrary.elementMoveDown: "+e);}};

//move element up to top of container
sandbox.elementMoveTop=function(e){try{
	//if this element has a parent
	if (e.parentNode) {
		//and its not the first child
		if (e.parentNode.firstChild!=e){
			//move it to the top of the container
			e.parentNode.insertBefore(e,e.parentNode.firstChild);
		}
	}
	return e;
}catch(e){log("wmLibrary.elementMoveTop: "+e);}};

//move element up to top of container
sandbox.elementMoveBottom=function(e){try{
	//if this element has a parent
	if (e.parentNode) {
		//and its not the first child
		if (e.parentNode.lastChild!=e){
			//move it to the bottom of the container
			e.parentNode.appendChild(e);
		}
	}
	return e;
}catch(e){log("wmLibrary.elementMoveBottom: "+e);}};

//sort an element's children by an attribute
sandbox.elementSortChildren=function(e,by){try{
	by=by||"name";	
	if (e && e.childNodes) {
		//pack into an array
		var ret=[];
		for (var n=0;n<e.childNodes.length;n++) {
			ret.push(e.childNodes[n]);
		}
		//sort the array
		ret.sort(function(a,b){return a[by]>b[by]});
		//fix order of display
		for (var n=0;n<ret.length;n++) {
			e.appendChild(ret[n]);
		}
		//clean up
		ret=null;
	}
}catch(e){log("wmLibrary.elementSortChildren: "+e);}};

//remove all of a node's child nodes
sandbox.removeAllChildren=function(e){
	var node=e.childNodes[0];
	while (node) {
		remove(node);
		node=e.childNodes[0];
	}
};

//return the real url of a location
sandbox.realURL=function() {try{var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;if(hash!="" && (/#\/.*\.php/).test(hash)) u=protocol+host+hash.split("#")[1];else if(hash!="" && hash.find("#")) u=u.split("#")[0];if (u.substr(-1) === "#") u=u.split("#")[0];return u;}catch(e){log("wmLibrary.realURL: "+e);}};

// compile and return the true x,y scroll offset onscreen of an element in Firefox	
sandbox.trueScrollOffset = function(o){try{
	var offset={left:o.scrollLeft,top:o.scrollTop}, parentOffset=null;
	if (!(o==document.body) && !(0==document.documentElement) && o.parentNode) parentOffset=trueScrollOffset(o.parentNode);
	if (parentOffset) {
		offset.left+=parentOffset.left||0;
		offset.top+=parentOffset.top||0;
	}
	return offset;
}catch(e){log("wmLibrary.trueScrollOffset: "+e);}},

// compile and return the true x,y offset onscreen of an element in Firefox
sandbox.trueOffset = function(o){try{
	var offset={left:o.offsetLeft,top:o.offsetTop}, parentOffset=null;
	if (o.offsetParent) parentOffset=trueOffset(o.offsetParent);
	if (parentOffset) {
		offset.left+=parentOffset.left||0;
		offset.top+=parentOffset.top||0;
	}
	return offset;
}catch(e){log("wmLibrary.trueOffset: "+e);}},

//force a page to transition to new location s even if changing the document location does not work
sandbox.linkTo = function(s) {try{
	var link=document.body.appendChild(createElement("a",{href:s,target:"_top"}));
	click(link);
}catch(e){log("wmLibrary.linkTo: "+e);}};

//***************************************************************************************************************************************
//***** Date/Time
//***************************************************************************************************************************************

//return a unix timestamp
sandbox.timeStamp=function(){try{return (new Date()).getTime();}catch(e){log("wmLibrary.timeStamp: "+e);}};

//return a facebook timestamp without millisecond data
sandbox.timeStampNoMS=function(){try{var t=timeStamp().toString(); return t.substr(0,t.length-3);}catch(e){log("wmLibrary.timeStampNoMS: "+e);}};

//returns a guaranteed unique timestamp in base36 prefixed with an underscore
sandbox.unique=function(){try{var now=timeStamp();var newnow=now;while (newnow==now){newnow=timeStamp();} return "_"+(newnow.toString(36));}catch(e){log("wmLibrary.unique: "+e);}};

//***************************************************************************************************************************************
//***** String Prototype Additions
//***************************************************************************************************************************************

//return true if string starts with s
sandbox.String.prototype.startsWith = function(s) {try{if (this.length<s.length) return false; else return (this.substring(0,s.length)===s)}catch(e){log("wmLibrary.String.prototype.startsWith: "+e);}};

//return true if string ends with s
sandbox.String.prototype.endsWith = function(s) {try{if (this.length<s.length) return false; else return (this.substring(this.length-s.length,s.length)===s)}catch(e){log("wmLibrary.String.prototype.endsWith: "+e);}};

//return true if string contains s
sandbox.String.prototype.find = function(s) {try{
	return (this.indexOf(s) != -1);
}catch(e){log("wmLibrary.String.prototype.find: "+e);}};
sandbox.String.prototype.contains = function(s) {return this.find(s);};

//inserts string s into this string at position startIndex
sandbox.String.prototype.insert = function(s,startIndex) {try{
	return this.substr(0,startIndex)+s+this.substr(startIndex,this.length-startIndex);
}catch(e){log("wmLibrary.String.prototype.insert: "+e);}};

//pads the string with space or a specific character, on the left
//strings already longer than totalLength are not changed
sandbox.String.prototype.padLeft = function(totalLength,c) {try{
	c=(c||" ").charAt(0);
	if (totalLength>0){
		return (totalLength<=this.length)?this:
			c.repeat((totalLength-this.length))+this;
	}
}catch(e){log("wmLibrary.String.prototype.padLeft: "+e);}};

//pads the string with space or a specific character, on the left
//strings already longer than totalLength are not changed
sandbox.String.prototype.padRight = function(totalLength,c) {try{
	c=(c||" ").charAt(0);
	if (totalLength>0){
		return (totalLength<=this.length)?this:
			this+c.repeat((totalLength-this.length));
	}
}catch(e){log("wmLibrary.String.prototype.padright: "+e);}};

//return the string as an array of characters
sandbox.String.prototype.toCharArray = function() {try{
	return this.split(/(.|\n|\r)/g);
}catch(e){log("wmLibrary.String.prototype.toCharArray: "+e);}};

//return the passed string minus spaces
sandbox.String.prototype.noSpaces = function(s) {try{return (this.replace(/\s+/g,''));}catch(e){log("wmLibrary.String.prototype.noSpaces: "+e);}};

//return the passed string with word first letters capitalized
sandbox.String.prototype.upperWords = function(s) {try{return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});}catch(e){log("wmLibrary.String.prototype.upperWords: "+e);}};

//return the passed string repeated n times
sandbox.String.prototype.repeat = function(n) {try{return new Array(n+1).join(this);}catch(e){log("wmLibrary.String.prototype.repeat: "+e);}};

//return the passed string minus line breaks
sandbox.String.prototype.noLineBreaks = function(s) {try{return (this.replace(/(\r\n|\n|\r)/gm," "));}catch(e){log("wmLibrary.String.prototype.noLineBreaks: "+e);}};

//return the passed string without beginning or ending quotes
sandbox.String.prototype.unQuote = function() {try{return this.replace(/^"|"$/g, '');}catch(e){log("wmLibrary.String.prototype.unQuote: "+e);}};

//return the passed string without beginning or ending quotes
sandbox.String.prototype.quote = function() {try{return "\""+this+"\"";}catch(e){log("wmLibrary.String.prototype.quote: "+e);}};

//return the passed string without beginning or ending brackets
sandbox.String.prototype.unBracket = function() {try{return this.replace(/^\[|\]$/g, '');}catch(e){log("wmLibrary.String.prototype.unBracket: "+e);}};

//return the passed string without beginning spaces
sandbox.String.prototype.trimStart = function(){try{
	return this.replace(/^\s\s*/, '');
}catch(e){log("wmLibrary.String.prototype.trimStart: "+e);}};

//return the passed string without ending spaces
sandbox.String.prototype.trimEnd = function(){try{
	return this.replace(/\s\s*$/, '');
}catch(e){log("wmLibrary.String.prototype.trimEnd: "+e);}};

//return the passed string without beginning or ending spaces
sandbox.String.prototype.trim = function(){try{
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}catch(e){log("wmLibrary.String.prototype.trim: "+e);}};

//assuming passed string is a url parameter list, return named parameter's value or ""
//this works great for both search and hash parts
//do not pass a document.location without first splitting off search and hash parts
sandbox.String.prototype.getUrlParam = function(s) {try{
	var r=this.removePrefix("#").removePrefix("?").split("&");
	for (var p=0,param;(param=r[p]);p++){
		if ( param.startsWith(s+"=") || param==s ) {
			return (param.split("=")[1]||null);
		}
	}	
	return null;
}catch(e){log("wmLibrary.String.prototype.getUrlParam: "+e);}};

//return passed string with word added to end. words are separated by spaces
//alternately accepts an array of words to add
sandbox.String.prototype.addWord= function(word){try{
	if (!isArray(word)) word=[word];
	var words = this.split(" ");
	var ret=this;
	for (var w=0,len=word.length;w<len;w++){
		if (!words.inArray(word[w])) ret=ret+" "+word;
	}
	return ret;
}catch(e){log("wmLibrary.String.prototype.addWord: "+e);}};

//return passed string minus specified word
//alternately accepts an array of words to remove
sandbox.String.prototype.removeWord= function(word){try{
	if (!isArray(word)) word=[word]; 
	var words=this.split(" ");
	var ret;
	for (var w=0,len=word.length;w<len;w++){
		ret = words.removeByValue(word[w]); 
	}
	return ret.join(" ");
}catch(e){log("wmLibrary.String.prototype.removeWord: "+e);}};

//return true if passed string contains word
sandbox.String.prototype.containsWord= function(word){try{return this.split(" ").inArray(word);}catch(e){log("wmLibrary.String.prototype.containsWord: "+e);}};

//return passed string with word replaced with word2
sandbox.String.prototype.replaceWord= function(word,word2){try{return this.split(" ").replace(word,word2).join(" ");}catch(e){log("wmLibrary.String.prototype.replaceWord: "+e);}};

//return passed string with word toggled
sandbox.String.prototype.toggleWord= function(word){try{if (this.containsWord(word)) return this.removeWord(word); return this.addWord(word);}catch(e){log("wmLibrary.String.prototype.toggleWord: "+e);}};

//return passed string with word toggled based on a boolean input
sandbox.String.prototype.toggleWordB = function(bool,word){try{
	return this[(bool?"add":"remove")+"Word"](word);
}catch(e){log("wmLibrary.String.prototype.toggleWordB: "+e);}};

//return passed string with word swapped for another based on a boolean input
//if bool==true then we return string including word1 and excluding word2
//else we return string including word2 and excluding word1
sandbox.String.prototype.swapWordB = function(bool,word1,word2){try{
	return this.replaceWord((bool?word2:word1),(bool?word1:word2));
}catch(e){log("wmLibrary.String.prototype.swapWordB: "+e);}};

//return passed string minus prefix of s if it exists
sandbox.String.prototype.removePrefix = function(s){try{if (this.startsWith(s)) {return this.substring(s.length);} else return this;}catch(e){log("wmLibrary.String.prototype.removePrefix: "+e);}};

//return passed string minus suffix of s if it exists
sandbox.String.prototype.removeSuffix = function(s){try{if (this.endsWith(s)) {return this.substring(0,this.length-s.length);} else return this;}catch(e){log("wmLibrary.String.prototype.removeSuffix: "+e);}};

// visual basic alternate for string.toLowerCase()
sandbox.String.prototype.lcase = function() {try{return this.toLowercase();}catch(e){log("wmLibrary.String.prototype.lcase: "+e);}};

// visual basic alternate for string.toUpperCase()
sandbox.String.prototype.ucase = function() {try{return this.toUppercase();}catch(e){log("wmLibrary.String.prototype.ucase: "+e);}};
	
// copy the calling string to the clipboard (IE or GM)
sandbox.String.prototype.toClipboard = function() {try{
	if (window.clipboardData){  
		window.clipboardData.setData("Text", this);
	} else if (unsafeWindow) {  
		try{
			unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch(e){
			log("wmLibrary.String.prototype.toClipboard: Cannot enable privelege 'UniversalXPConnect'. Be sure that 'signed.applets.codebase_principal_support' is set to true in 'about:config'");
		}
		const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);  
		clipboardHelper.copyString(this);
	} else {
		log("wmLibrary.String.prototype.toClipboard: Cannot perform task");
	}
} catch(e){log("wmLibrary.String.prototype.toClipboard: "+e);}};

//replaces all instances of {x} with passed argument x
//or arguments[0][x] when the first argument is an array
sandbox.String.prototype.format = function() {try{
    var ret = this;
    var args=arguments; //use argument mode
    if (isArray(args[0])) args=args[0]; //switch to array mode
    for (var i = 0; i < args.length; i++) {
        var re = new RegExp('\\{'+i+'\\}', 'gi');
        ret = ret.replace(re, args[i]);
    }
    return ret;
}catch(e){log("wmLibrary.String.prototype.format: "+e);}};

//similar to String.format, except that instances of {%x} are replaced
//instead of instances of {x}
sandbox.String.prototype.format2 = function() {try{
    var ret = this;
    var args=arguments; //use argument mode
    if (isArray(args[0])) args=args[0]; //switch to array mode
    for (var i=0; i < args.length; i++) {
        var re = new RegExp('\\{%'+i+'\\}', 'gi');
        ret = ret.replace(re, args[i]);
    }
    return ret;
}catch(e){log("wmLibrary.String.prototype.format2: "+e);}};

//returns true if the string is zero-length
sandbox.String.prototype.isEmpty = function() {try{
	return this.length==0;
}catch(e){log("wmLibrary.String.prototype.isEmpty: "+e);}};

//format a JSON string with linebreaks and indents
//with optional indent number to set indent length in spaces
//default intent is a tab character
sandbox.String.prototype.formatJSON = function(indent) {try{
	indent=(indent)?(" ").repeat(indent):"\t";
	
	//first lets convert the supposed JSON string to an actual object
	//so we can validate that it is of good format
	var topObj=JSON.parse(this);
	//if we got this far, it is valid
	
	//make a function to spell our our branches
	var writeBranch=function(obj,name,level){
		var ret="";
			
		//start our output string
		ret+=(level)?indent.repeat(level):"";
		ret+=(name)?JSON.stringify(name)+": ":"";
		ret+=(isArray(obj))?
			"["+((!obj.isEmpty())?
				"\n":
				""
			):
			(isObject(obj))?
				"{"+((!methodsToArray(obj).isEmpty())?
					"\n":
					""
				):
			"";
			
		//draw the inside object(s)
		var c=0;
		if (isArray(obj)) for (var i=0,len=obj.length;i<len;i++){
			//write arrays out
			if (i>0) ret+=",\n";
			ret+=writeBranch(obj[i],null,level+1);
		} else if (isObject(obj)) for (var i in obj){
			if (c>0) ret+=",\n";
			//write objects out
			ret+=writeBranch(obj[i],i,level+1);
			c++;
		} else {
			//branch is not an object or array
			ret+=JSON.stringify(obj);
		}
			
		//end our output string
		ret+=(isArray(obj))?
			((!obj.isEmpty())?
				"\n"+((level)?
					indent.repeat(level):
					""
				):
				""
			)+"]":
			(isObject(obj))?
				((!methodsToArray(obj).isEmpty())?
					"\n"+((level)?
						indent.repeat(level):
						""
					):
					""
				)+"}":
			"";
			
		//back to previous branch
		return ret;
	}
	
	//start writing the branches
	return writeBranch(topObj,null,0);
}catch(e){log("wmLibrary.String.prototype.formatJSON: "+e);}};

//returns the longested quoted text within the calling string
sandbox.String.prototype.longestQuoteWithin = function() {try{
	var p=0, c=0, s="", a=0, b=0, l=0;
	while (p<this.length){
		a=this.indexOf('"', p);
		if (a!=-1) {
			p=a+1;
			b=this.indexOf('"',p);
			if (b!=-1) {
				p=b+1;
			        l=b-a;
				if (l>c) {
					c=l;
					s=this.substr(a+1,l-1);
				}
			} else {
				p=this.length;
			}
		} else {
			p=this.length;
		}
	}
	return s;
}catch(e){log("wmLibrary.String.prototype.longestQuoteWithin: "+e);}};

//***************************************************************************************************************************************
//***** Array Prototype Additions
//***************************************************************************************************************************************

//returns true if the array is zero-length
sandbox.Array.prototype.isEmpty = function() {try{
	return this.length==0;
}catch(e){log("wmLibrary.Array.prototype.isEmpty: "+e);}};

//return passed array with element x and element y swapped
sandbox.Array.prototype.swap = function (x,y) {try{
	var b = this[x];
	this[x] = this[y];
	this[y] = b;
	return this;
}catch(e){log("wmLibrary.Array.prototype.swap: "+e);}};

//return true if a value exists in the array
//with optional startIndex
//and optional count which specifies the number of elements to examine
sandbox.Array.prototype.inArray = function(value,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.inArray: Error: startIndex out of bounds");
		return false;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.inArray: Error: count is less than 1");
		return false;
	}
	var c=0;
	for(var i=this.length-1; (i>=startIndex && (!exists(count) || (exists(count) && c<count))); i--) {
		c++;
		if(this[i]==value) return true;
	} 
	return false;
}catch(e){log("wmLibrary.Array.prototype.inArray: "+e);}};

//alias for inArray
sandbox.Array.prototype.contains = function(value,startIndex,count) {return this.inArray(value,startIndex,count);};

//return the location of a value in an array
//with optional startIndex
//and optional count which specifies the number of elements to examine
sandbox.Array.prototype.inArrayWhere = function(value,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.inArrayWhere: Error: startIndex out of bounds");
		return -1;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.inArrayWhere: Error: count is less than 1");
		return -1;
	}
	var c=0;
	for(var i=startIndex,len=this.length; (i<len && (!exists(count) || (exists(count) && c<count))); i++) {
		c++;
		if(this[i]==value) return i;
	}
	return -1;
}catch(e){log("wmLibrary.Array.prototype.inArrayWhere: "+e);}};
//alias for inArrayWhere
sandbox.Array.prototype.indexOf = function(value,startIndex,count) {return this.inArrayWhere(value,startIndex,count);};

//return the location of the last occurence of value in an array
//with optional startIndex
//and optional count which specifies the number of elements to examine
sandbox.Array.prototype.lastIndexOf = function(value,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.lastIndexOf: Error: startIndex out of bounds");
		return -1;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.lastIndexOf: Error: count is less than 1");
		return -1;
	}
	var c=0;
	for(var i=this.length; (i>=startIndex && (!exists(count) || (exists(count) && c<count))); i++) {
		c++;
		if(this[i]==value) return i;
	}
	return -1;
}catch(e){log("wmLibrary.Array.prototype.lastIndexOf: "+e);}};

//return true if the location of value is 0
sandbox.Array.prototype.startsWith = function(value){return this.inArrayWhere(value)===0;}

//return the last value in an array
sandbox.Array.prototype.last = function() {try{return this[this.length - 1];}catch(e){log("wmLibrary.Array.prototype.last: "+e);}};

//return true if the content of the last index is equal to value
sandbox.Array.prototype.endsWith = function(value){return this.last()===value;}

//return the array will spaces removed from every element
sandbox.Array.prototype.noSpaces = function() {try{for(var i=0,l=this.length; i<l; i++) {this[i]=this[i].noSpaces();}; return this;}catch(e){log("wmLibrary.Array.prototype.noSpaces: "+e);}};

//remove the first instance of a value in an array
//now accepts an array of values to remove
//removes the first instance of every item in array passed
//returns the calling array
sandbox.Array.prototype.removeByValue = function(values) {try{
	if (!isArray(values)) values=[values];
	for (var i=0,len=values.length; i<len;i++) {
		var e=this.inArrayWhere(values[i]);
		if(e>=0)this.splice(e,1);
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.removeByValue: "+e);}};

//replace all instances of a value in an array
//returns the calling array
sandbox.Array.prototype.replaceAll = function(val, val2) {try{
	var i=this.inArrayWhere(val);
	while(i>=0) {
		this[i]=val2;
		i=this.inArrayWhere(val,i+1);
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.replaceAll: "+e);}};

//remove all instances of a value in an array
//now accepts an array of values to remove
//returns the calling array
sandbox.Array.prototype.removeAllByValue = function(values) {try{
	if (!isArray(values)) values=[values];
	for (var i=0,len=values.length; i<len;i++) {
		var e=this.inArrayWhere(values[i]);
		while (e>=0){
			if(e>=0)this.splice(e,1);
			e=this.inArrayWhere(values[i],e+1);
		}
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.removeAllByValue: "+e);}};

//replace the first instance of a value in an array
//returns the calling array
sandbox.Array.prototype.replace = function(val, val2) {try{var i=this.inArrayWhere(val);if(i>=0)this[i]=val2;return this;}catch(e){log("wmLibrary.Array.prototype.replace: "+e);}};


//remove element i of an array
//returns the calling array
sandbox.Array.prototype.remove = function(i) {try{this.splice(i,1); return this;}catch(e){log("wmLibrary.Array.prototype.remove: "+e);}};

//remove elements beyond specified new size
//or add elements to fill the new size equal to defaultValue
sandbox.Array.prototype.resize = function(newSize,defaultValue) {try{
	if (this.length>newSize) {
		this.splice(newSize,this.length-newSize); 
	} else {
		for (var i=this.length;i<newSize;i++){
			this[i]=defaultValue;
		}
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.resize: "+e);}};

//return a random element of an array
sandbox.Array.prototype.pickRandom = function () {try{var i=Math.floor(Math.random()*this.length); return this[i];}catch(e){log("wmLibrary.Array.prototype.pickRandom: "+e);}};

//sorts an array so that words which contain another word in the array are placed before that other word
//such as "pea" must come AFTER "peanut", and "great american race" must come BEFORE "american"
//the sort is case-insensitive
sandbox.Array.prototype.fixOrder = function(){
	var compareFunc = function(a,b){
		var s1=a.toLowerCase(), s2=b.toLowerCase();
		if (s1.contains(s2)) return -1; //when a contains b, a must come first
		else if (s2.contains(s1)) return 1 //when b contains a, b must come first
		else return 0; //no order change is required
	};
	this.sort(compareFunc);
	return this;
};	

//alias for the previous function	
sandbox.Array.prototype.optimize = sandbox.Array.prototype.fixOrder;

//returns a shallow copy of the calling array
sandbox.Array.prototype.clone = function(){try{
	return this.slice(0);
}catch(e){log("wmLibrary.Array.prototype.clone: "+e);}};

//reverses the elements of an array
//with optional startIndex
//and optional count which limits the reverse section
//if startIndex+count is greater than the length of the array 
//then only the available section is reversed
//returns the calling array
sandbox.Array.prototype.reverse = function(startIndex,count){try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.reverse: Error: startIndex out of bounds");
		return -1;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.reverse: Error: count is less than 1");
		return -1;
	}
	var endIndex=(exists(count))?startIndex+count:this.length-1;
	if (endIndex>this.length-1) endIndex=this.length-1;
	while (startIndex>endIndex){
		this.swap(startIndex,endIndex);
		startIndex++;
		endIndex--;
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.reverse: "+e);}};

//sets a range of elements in the array to the defaultValue
//returns the calling array
sandbox.Array.prototype.clear = function(startIndex,count,defaultValue){try{
	if (count>0 && this.length>startIndex) {
		for (var i=startIndex,len=this.length; (i<len && i<(startIndex+count)); i++){
			this[i]=defaultValue;
		}
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.clear: "+e);}};

//copies elements from this array to a destination destArray
//starting in this array at sourceIndex
//and pasting into the destArray at destIndex
//where length is the number of elements to copy
//pasting beyond the higher bounds of the destArray simply increases the array size
//returns the calling array
sandbox.Array.prototype.copy = function(sourceIndex,destArray,destIndex,length){try{
	if (!isArray(destArray)) {
		log("wmLibrary.Array.prototype.copy: Error: destArray is not an array");
		return this;
	}
	if (sourceIndex >= this.length) {
		//log("wmLibrary.Array.prototype.copy: Error: sourceIndex out of bounds");
		return this;
	}
	for (var i=0; i<length; i++){
		destArray[destIndex+i]=this[sourceIndex+i];
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.copy: "+e);}};

//copies all elements from this array to a destination destArray
//pasting into the destArray at destIndex
//pasting beyond the higher bounds of the destArray simply increases the array size
//returns the calling array
sandbox.Array.prototype.copyTo = function(destArray,destIndex){try{
	if (!isArray(destArray)) {
		log("wmLibrary.Array.prototype.copyTo: Error: destArray is not an array");
		return this;
	}
	for (var i=0, len=this.length; i<len; i++){
		destArray[destIndex+i]=this[i];
	}
	return this;
}catch(e){log("wmLibrary.Array.prototype.copyTo: "+e);}};

//returns an array containing elements from the current array where the element has parameter p equal to value v
sandbox.Array.prototype.selectByParam = function(p,v) {try{var ret=[]; for(i=0;i<this.length;i++) if(this[i][p]==v) ret.push(this[i]); return ret;}catch(e){log("wmLibrary.Array.prototype.selectByParam: "+e);}};

//returns the element matched by matchFunc, or null
//with optional start index
//and optional count to limit the number of searched elements
sandbox.Array.prototype.find = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.find: Error: startIndex out of bounds");
		return null;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.find: Error: count is less than 1");
		return null;
	}
	var c=0;
	for (var i=startIndex,len=this.length; (i<len && (!exists(count) || (exists(count) && c<count))); i++){
		c++;
		if (matchFunc(this[i])) {
			return this[i];
			break;
		}
	}
	return null;
}catch(e){log("wmLibrary.Array.prototype.find: "+e);}};

//returns the index of element matched by matchFunc, or -1
//with optional startIndex
//and optional count which specifies the number of elements to check
sandbox.Array.prototype.findIndex = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.findIndex: Error: startIndex out of bounds");
		return -1;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.findIndex: Error: count is less than 1");
		return -1;
	}
	var c=0;
	for (var i=startIndex,len=this.length; (i<len && (!exists(count) || (exists(count) && c<count))); i++){
		c++;
		if (matchFunc(this[i])) {
			return i;
			break;
		}
	}
	return -1;
}catch(e){log("wmLibrary.Array.prototype.findIndex: "+e);}};

//returns all elements matched by matchFunc, or null
//with optional start index
//and optional count to limit the number of elements searched
sandbox.Array.prototype.findAll = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	var ret=[];
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.findAll: Error: startIndex out of bounds");
		return null;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.findAll: Error: count is less than 1");
		return null;
	}
	var c=0;
	for (var i=startIndex,len=this.length; (i<len && (!exists(count) || (exists(count) && c<count))); i++){
		c++;
		if (matchFunc(this[i])) {
			ret.push(this[i]);
		}
	}
	return (isArrayAndNotEmpty(ret))?ret:null;
}catch(e){log("wmLibrary.Array.prototype.findAll: "+e);}};

//returns true if all elements in the array match the matchFunc
//with optional start index
//and optional count to limit the number of elements searched
sandbox.Array.prototype.trueForAll = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.trueForAll: Error: startIndex out of bounds");
		return false;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.trueForAll: Error: count is less than 1");
		return false;
	}
	var c=0;
	for (var i=startIndex,len=this.length; (i<len && (!exists(count) || (exists(count) && c<count))); i++){
		c++;
		if (!matchFunc(this[i])) {
			return false;
		}
	}
	return true;
}catch(e){log("wmLibrary.Array.prototype.trueForAll: "+e);}};

//returns true if array contains an element matched by the matchFunc
//with optional startIndex
//and optional count which specifies the number of elements to check
sandbox.Array.prototype.exists = function(matchFunc,startIndex,count) {try{
	return this.findIndex(matchFunc,startIndex,count)!=-1;
}catch(e){log("wmLibrary.Array.prototype.exists: "+e);}};

//returns the last element matched by matchFunc, or null
//with optional start index
//and optional count to limit the number of searched elements
sandbox.Array.prototype.findLast = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.findLast: Error: startIndex out of bounds");
		return null;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.findLast: Error: count is less than 1");
		return null;
	}
	var c=0;
	for (var i=this.length; (i>=startIndex && (!exists(count) || (exists(count) && c<count))); i--){
		c++;
		if (matchFunc(this[i])) {
			return this[i];
			break;
		}
	}
	return null;
}catch(e){log("wmLibrary.Array.prototype.findLast: "+e);}};

//returns the last element matched by matchFunc, or -1
//with optional start index
//and optional count which specifies the number of elements to check
sandbox.Array.prototype.findLastIndex = function(matchFunc,startIndex,count) {try{
	startIndex=startIndex||0;
	if (startIndex>=this.length) {
		//log("wmLibrary.Array.prototype.findLastIndex: Error: startIndex out of bounds");
		return -1;
	}
	if (exists(count) && count<1) {
		//log("wmLibrary.Array.prototype.findLastIndex: Error: count is less than 1");
		return -1;
	}
	var c=0;
	for (var i=this.length; (i>=startIndex && (!exists(count) || (exists(count) && c<count))); i--){
		c++;
		if (matchFunc(this[i])) {
			return i;
			break;
		}
	}
	return -1;
}catch(e){log("wmLibrary.Array.prototype.findLastIndex: "+e);}};

//***************************************************************************************************************************************
//***** JSON/OBJECT Construction and Matching
//***************************************************************************************************************************************

//returns the merge of any number of JSON objects passed as unnamed arguments
sandbox.mergeJSON_long = function(){try{
	var ret = {}; 
	//for each JSON object passed
	for (var a=0,len=arguments.length;a<len;a++) {
		//for each element in that object
		for (var v in arguments[a]) {
			if (!exists(ret[v])) {
				//simply copy the element to the return value
				ret[v] = arguments[a][v];
			} else {
				if ((typeof arguments[a][v])=="object") {
					//merge the two elements, preserving tree structure
					ret[v] = mergeJSON(ret[v], arguments[a][v]);
				} else {
					//overwrite simple variable
					ret[v] = arguments[a][v];
				}
			}
		}
	}
	//the problem here is that its way too recursive and jams firefox often
	return ret; 
}catch(e){log("wmLibrary.mergeJSON: "+e);}};

sandbox.mergeJSON = function(){try{
	var ret = {}; 
	//for each JSON object passed
	for (var a=0,len=arguments.length;a<len;a++) {
		var o=arguments[a];
		//for each element in that object
		for (var v in o) {
			//replace the initial element with that of the next
			ret[v] = o[v];
		}
		//the problem here is that only the top level branches are preserved
	}
	return ret; 
}catch(e){log("wmLibrary.mergeJSON: "+e);}};

//returns all members of an array that have a specified parameter with a specified value
//sandbox.matchByParam=function(arr,param,value){try{var ret=[];for (var i=0,e;(e=arr[i]);i++){if (e[param]==value) ret.push(e);};return ret;}catch(e){log("wmLibrary.matchByParam: "+e);}};
	
//returns all members of an array that have a specified parameter with a specified value
//now accepts input of array or object
//can now specify output of array or object
sandbox.matchByParam=function(o,param,value,outputType){try{
	if(!exists(outputType)) outputType="array";
	var inputType=(isArray(o))?"array":((typeof o) == "object")?"object":"unknown";
	
	var ret=(outputType=="object")?{}:[]; //default to array on error

	switch(inputType){
		case "array": for (var i=0,e;(e=o[i]);i++){
			switch(outputType){
				case "array": if (e[param]==value) ret.push(e); break;
				case "object": if (e[param]==value) ret[i]=e; break;
			}
		};break;

		case "object": for (var i in o){
			var e=o[i];
			switch(outputType){
				case "array": if (e[param]==value) ret.push(e); break;
				case "object": if (e[param]==value) ret[i]=e; break;
			}
		};break;
	}
	return ret;
}catch(e){log("wmLibrary.matchByParam: "+e);}};

//sorts the methods of an object by method 'id' or method 'value'
//beware this may mangle some objects
sandbox.sortCollection=function(o,by){
	var a=[];
	for (var i in o){
		a.push({id:i,value:o[i]});
	}
	a.sort(function(a,b){return a[by]>b[by];});
	var ret={};
	for (var i=0;i<a.length;i++){
		ret[a[i].id]=a[i].value;
	}
	return ret;
};

// Collect all the values from parameter p in object o, traversing kids nodes
sandbox.getBranchValues=function(o,p){try{
	var ret={};
	for(var i in o) {
		//get value p for object o's element i
		if (p=="id"){ //special case for fetching a list of ID's
			if (exists(o[i][p])) ret[i]=o[i][p];
			else ret[i]=i;
		} else if (p=="."){ //special case for fetching a list of all objects without a tree structure
			ret[i]=o[i];
		}

		else if (exists(o[i][p])) ret[i]=o[i][p];
		//if object o has kids, then get all the values p inside that kid k
		if (o[i].kids) ret=mergeJSON(ret,getBranchValues(o[i].kids,p));
	}
	return ret;
}catch(e){log("wmLibrary.getBranchValues: "+e);}};

//convert an object's methods to an array, storing the method's key on the object as an id
sandbox.methodsToArray = function(o) {try{var ret=[]; for (var i in o) {o[i].id=o[i].id||i; ret.push(o[i])}; return ret;}catch(e){log("wmLibrary.methodsToArray: "+e);}};

//convert an array of objects to methods of an object using either the object's ai or name as its key
sandbox.arrayToMethods = function(a) {try{var ret={}; for (var i=0;i<a.length;i++) ret[ a[i].id||a[i].name ]=a[i]; return ret;}catch(e){log("wmLibrary.arrayToMethods: "+e);}};

//convert an object's methods to an array of those method names
sandbox.methodNames = function(o) {try{var ret=[]; for (i in o) ret.push(i); return ret;}catch(e){log("wmLibrary.methodNames: "+e);}};

//copy parts from one object to another
//used for extending one object with parts from another
//by John Resig
sandbox.extend = function(a,b) {try{
	for ( var i in b ) {
		//collect setter/getter functions
		var g = b.__lookupGetter__(i), s = b.__lookupSetter__(i);
		//copy setter/getter functions
		if ( g || s ) {
			if ( g ) a.__defineGetter__(i, g);
			if ( s ) a.__defineSetter__(i, s);
		} else a[i] = b[i]; //copy vars
	}
	return a;
}catch(e){log("wmLibrary.extend: "+e);}};	

//***************************************************************************************************************************************
//***** WM Specific Functions
//***************************************************************************************************************************************

//returns an object suitable for accText data based on an array, and allowing an idPrefix and textSuffix
sandbox.createAccTextFromArray=function(arr,keyPrefix,textSuffix){
	var ret={};
	if (arr) {
		for (var i=0,len=arr.length;i<len;i++){
			o=arr[i];
			ret[(keyPrefix||'')+o.noSpaces().toLowerCase()]=o.upperWords()+(textSuffix||'');
		}
	}
	return ret;
};

	
//writes a message to the hash section of the document location, or redirects to a location that can accept a new hash section
sandbox.sendMessage=function(s,hwnd,flag){try{
	hwnd = (hwnd||window.top);
	if (exists(hwnd)) try {hwnd.location.hash = s;} catch(e){
		if (flag==1) hwnd.location.href = "http://apps.facebook.com/?#"+s;
		else hwnd.location.href = "http://www.facebook.com/reqs.php?#"+s;
	}
}catch(e){log("wmLibrary.sendMessage: "+e);}};

//flags for menu building function
sandbox.MENU_ID_ENFORCE_NAME=1; //causes menuFromData to return lowercase nospace names as the id instead of the calculated id

//inserts one or more menu option blocks based upon a data object
//marking all new items in the newitem list above as green so users can easily find your changes
sandbox.menuFromData=function(data,menuNode,newItemList,idPrefix,flags){try{
	flags=(flags||0); newItemList=(newItemList||[]);
	if (data) for (var m=0,len=data.length; m<len; m++) {
		var text = data[m]["name"].upperWords(), event = (data[m]["event"]||"Unsorted").upperWords();
		var outid = (flags==MENU_ID_ENFORCE_NAME)?data[m].name.noSpaces().toLowerCase():(data[m]["id"]||data[m]["name"]).noSpaces().toLowerCase();
		var thisMenu; if( !(thisMenu=(menuNode["optblock"+event]||null) ) ) {thisMenu=(menuNode["optblock"+event]={type:"optionblock",label:event,kids:{} });}
		thisMenu.kids[idPrefix+outid]={type:"checkbox",label:text,newitem:newItemList.inArray(idPrefix+outid)};
	}
}catch(e){log("wmLibrary.menuFromData: "+e);}};

//returns a list of search strings from a data object containing id's names and events, already optimized for searching
sandbox.searchFromData=function(data,idPrefix){try{
	idPrefix=(idPrefix||""); 
	var ret = []; 
	for (var m=0,mat;(mat=data[m]);m++){
		ret.push(idPrefix+(mat.id||mat.name));
	} 
	ret.optimize();
	return ret;
}catch(e){log("wmLibrary.searchFromData: "+e);}};

//returns a list of materials from a data object containing id's names and events, already optimized for searching
sandbox.matListFromData=function(data){try{
	var ret = []; 
	for (var m=0,mat;(mat=data[m]);m++){
		ret.push(mat.name);
	} ret.optimize(); 
	return ret;
}catch(e){log("wmLibrary.matListFromData: "+e);}};

//returns a valid accText object from a data object containing id's names and events
sandbox.accTextFromData=function(data,idPrefix,textSuffix,flags){try{idPrefix=(idPrefix||""); textSuffix=(textSuffix||"");var ret={}; for (var m=0,mat;(mat=data[m]);m++){ret[idPrefix+((flags==MENU_ID_ENFORCE_NAME)?mat.name:(mat.id||mat.name)).noSpaces().toLowerCase()]=(mat.name+textSuffix).upperWords();} return ret;}catch(e){log("wmLibrary.accTextFromData: "+e);}};

//***************************************************************************************************************************************
//***** Sidekick Object
//***************************************************************************************************************************************

//sidekick specific functions
sandbox.Sidekick={	
	//init
	tabID:null,
	status:0,
	nopopLink:"",

	//attempts to dock the sidekick script to the wm host script
	//params takes an object that contains the following parameters: 
	//appID(string), version(string), skType(integer),
	//name(string), thumbSource(string or array), 
	//flags(object), icon(string), desc(string), 
	//addFilters(object),
	//alterLink(object), accText(object), 
	//tests(array) and menu(object)
	dock: function(params){try{
		//find the dock node on this page
		var door=$('wmDock');
		if (!door) {
			//does not exist, wait and try again later
			window.setTimeout(function(){Sidekick.dock(params);}, 1000);
			return;
		} 
		//detect if a sidekick for this app is already docked
		var doorMark=$('wmDoor_app'+params.appID);
		if (doorMark && (params.skType==doorMark.getAttribute("value")) ) {
			//a sidekick of this level is already here, cancel docking
			return;
		}
		
		//setup defaults for a few of the expected parameters
		params.thumbsSource=(params.thumbsSource||"app_full_proxy.php?app"+params.appID);
		params.desc=(params.desc||params.name+" Sidekick (ver "+params.version+")");

		//create a block of data to attach to the dock
		var attString=JSON.stringify(params);
		door.appendChild(
			doorMark=createElement('div',{id:'wmDoor_app'+params.appID,'data-ft':attString,value:(params.skType||0)})
		);
		//doorMark.setAttribute("skType",(params.skType||0));
		//confirm(doorMark.getAttribute("skType"));
		
		//ring the buzzer so the host knows the package is ready
		window.setTimeout(function(){click(door);},1000);
	}catch(e){log("wmLibrary.Sidekick.dock: "+e);}},
	
	
	//receive and process messages
	//msg code 1 is a packet from the wm host containing data about the post we are processing
	//that packet must contain at least the tab/window ID with which the WM host can access that tab again
	//msg code 3 is a packet from this or a deeper iframe window about the return value for this post
	
	//because Chrome returns NULL at event.source on msg 1, we now have to rethink
	receiveMessage: function(event) {try{
		if (isObject(event.data)) {
			var data=event.data; //just shorten the typing
			if (data.channel=="WallManager"){
				log(JSON.stringify(data));
				
				switch (data.msg) {
					case 1: //get init data from wm host
						//if (!Sidekick.tabID) 
							Sidekick.tabID=data.tabID;
							log("Sidekick hears host...");
						//
						break;
					case 3: //get message from child
						if (Sidekick.tabID) {
							log("Sidekick hears iframe...");
							//send our status packet back to wm
							Sidekick.status=data.status;
							Sidekick.nopopLink=data.nopopLink||null;
							//update the stored data about this post
							var skChannel = getOptJSON("skChannel")||{};
							skChannel[Sidekick.tabID]={
								tabID:Sidekick.tabID,
								status:Sidekick.status,
								nopopLink:Sidekick.nopopLink,
							};
							log(JSON.stringify(skChannel));
							setOptJSON("skChannel",skChannel);
						} else {
							//have not yet recieved tabID package from wm, wait a sec
							setTimeout(function(){Sidekick.receiveMessage(event);},1000);
						}
						break;
				}
			}
		}
	}catch(e){log("wmLibrary.Sidekick.receiveMessage: "+e);}},

	//disable the listener started below
	unlisten: function(params){try{
		window.removeEventListener("message", Sidekick.receiveMessage, false);
	}catch(e){log("wmLibrary.Sidekick.unlisten: "+e);}},
	
	//turn on the listener which can receive messages from wm host (if this window = window.top) or from iframes
	listen: function(params){try{
		window.addEventListener("message", Sidekick.receiveMessage, false);
	}catch(e){log("wmLibrary.Sidekick.listen: "+e);}},

	//listen for changes to the skChannel variable and report those changes to WM whenever docked
	openChannel: function(){try{
		var dump=$("wmDataDump");
		if (dump) {
			var skData=getOpt("skChannel");
			setOpt("skChannel","");
			if (skData) dump.appendChild(createElement('div',{'data-ft':skData}));
		}
		setTimeout(Sidekick.openChannel,1000);
	}catch(e){log("wmLibrary.Sidekick.openChannel: "+e);}},

	//send a status code from the deepest iframe to the topmost frame so that it can be passed back with data the top window already has
	sendStatus: function(status,link){try{
		if (exists(window.top)) {
			window.top.postMessage({
				channel:"WallManager",
				msg:3,
				status:status,
				nopopLink:(link?link:''),
			},"*");
		} else {
			//window.top is hidden to us from this location
			contentEval('window.top.postMessage({"channel":"WallManager","msg":3,"status":'+status+',"link":"'+(link?link:'')+'"},"*");');
		}	
	}catch(e){log("wmLibrary.Sidekick.sendStatus: "+e);}},
};

//***************************************************************************************************************************************
//***** Visual Effects
//***************************************************************************************************************************************

//slides element e toward the specified destination offset
//specify [t, l, r, b] top, left, right, and bottom as the final offset
//specify s as the number of MS the move should loop on
//specify p as the number of pixels to move per interval
sandbox.slide=function(e,t,l,r,b,s,p) {try{
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
}catch(e){log("wmLibrary.slide: "+e);}};

//***************************************************************************************************************************************
//***** URL Encode/Decode
//***************************************************************************************************************************************

//url encode/decode functions nicely wrapped from webtoolkit
sandbox.Url = {
	// public method for url encoding
	encode : function (string) {try{return escape(this._utf8_encode(string));}catch(e){log("wmLibrary.Url.encode: "+e);}},
 
	// public method for url decoding
	decode : function (string) {try{return this._utf8_decode(unescape(string));}catch(e){log("wmLibrary.Url.decode: "+e);}},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			} 
		}
		return string;
	}
};

//***************************************************************************************************************************************
//***** GM Local Storage Commands
//***************************************************************************************************************************************

// set an option
sandbox.setOpt=function(opt,value){try{GM_setValue(opt,value);}catch(e){log("wmLibrary.setOpt: "+e);}}

// Get a stored option
sandbox.getOpt=function(opt){try{return GM_getValue(opt);}catch(e){log("wmLibrary.getOpt: "+e);}}

// set an option
sandbox.setOptJSON=function(opt,value){try{GM_setValue(opt,JSON.stringify(value));}catch(e){log("wmLibrary.setOptJSON: "+e);}}

// Get a stored option
sandbox.getOptJSON=function(opt){try{var v=GM_getValue(opt, '{}');return JSON.parse(v);}catch(e){log("wmLibrary.getOptJSON: "+e+" opt is:"+opt+", data is:"+v);}}


//***************************************************************************************************************************************
//***** 2D Math
//***************************************************************************************************************************************

// add two points or vectors
sandbox.addPoints = function(p0, p1){try{
	var p2=mergeJSON(p0); //copy p0
	for (var v in p1) p2[v]=(p2[v]||0)+(p1[v]||0);
	return p2;
}catch(e){log("wmLibrary.addPoints: "+e);}},

//***************************************************************************************************************************************
//***** Delays and Repeaters
//***************************************************************************************************************************************

// shortform for window.setTimeout(x,0)
sandbox.doAction = function(f) {try{setTimeout(f,0);}catch(e){log("doAction: "+e);}};

//repeat a function fn a number of times n with a delay of 1 second between calls
sandbox.signal = function(fn,n){try{
	if (n>0) {
		doAction(fn);
		setTimeout(function(){signal(fn,n-1);},1000);
	}
}catch(e){log("wmLibrary.signal: "+e);}};

//***************************************************************************************************************************************
//***** Enum Creation
//***************************************************************************************************************************************

// create an unprotected enumeration list
sandbox.Enum = function() {try{for (var i in arguments) {this[arguments[i]] = i;}}catch(e){log("Enum.init: "+e);}};

//create an unprotected enumeration list of binary flags
sandbox.EnumFlags = function() {try{for (var i in arguments) {this[arguments[i]] = Math.pow(2,i);}}catch(e){log("EnumFlags.init: "+e);}};

//***************************************************************************************************************************************
//***** Pop-ups
//***************************************************************************************************************************************

//create a centered iframe to display multiline text in a textarea
//with optional isJSON flag which will format JSON strings with indents and linebreaks
sandbox.promptText = function(s,isJSON){try{
	if (isJSON) s=s.formatJSON(4);
	var newFrame;
	document.body.appendChild((newFrame=createElement('iframe',{style:'position:fixed; top:0; left:0; display:none !important; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto; background-color:white;'})));
	newFrame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	newFrame.addEventListener('load', function(){
		var frameBody = this.contentDocument.getElementsByTagName('body')[0];
		
		var close=function(){try{
			remove(newFrame);
			delete newFrame;
		}catch(e){log("wmLibrary.promptText.close: "+e);}};
		
		// Add save and close buttons
		frameBody.appendChild(
			createElement("textArea",{textContent:s,style:"height:90%;width:100%;"})
		);
		frameBody.appendChild(
			createElement("div", {id:"buttons_holder"}, [
				createElement('button',{id:"closeBtn", textContent:"Close",title:"Close window",onclick:close}),
			])
		);
		
		var center=function(){try{
			var style=newFrame.style;
			var node=newFrame;
			style.display = '';
			style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
			style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
		}catch(e){log("wmLibrary.promptText.center: "+e);}};
		center();				
		window.addEventListener('resize', center, false); // Center it on resize

		// Close frame on window close
		window.addEventListener('beforeunload', function(){newFrame.remove(this);}, false);
		
	}, false);
}catch(e){log("wmLibrary.promptText: "+e);}};

//***************************************************************************************************************************************
//***** Text To Script
//***************************************************************************************************************************************

//force code to be run outside the GM sandbox
sandbox.contentEval = function(source) {try{
	// Check for function input.
	if ('function' == typeof source) {
	// Execute this function with no arguments, by adding parentheses.
	// One set around the function, required for valid syntax, and a
	// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}catch(e){log("wmLibrary.contentEval: "+e);}};

//***************************************************************************************************************************************
//***** RegExp Construction
//***************************************************************************************************************************************

//convert an array to a pipe delimited RegExp group
sandbox.arrayToRegExp = function(a) {try{
	var ret="";
	if (isArrayAndNotEmpty(a)) {
		ret="(";
		for (var i=0,len=a.length; i<len;i++){
			ret=ret+a[i];
			if (i<(len-1)) ret=ret+"|";
		}
		ret=ret+")";
	}
	return ret;
}catch(e){log("wmLibrary.arrayToRegExp: "+e);}};

//takes an integer range and converts it to a regular expression
//which can search for that number range in a string
sandbox.integerRangeToRegExp = function(params) {try{
	params=params||{};
	var min=params.min.toString(), max=params.max.toString();
	var ret="";

	//on the odd case that both min and max values were equal
	if (max==min) return max;
		
	//count shared digits we can omit from complex regexp
	var numSharedDigits=0;
	if (min.length==max.length) {
		for (var n=max.length;n>0;n--){
			if (max.substring(0,n) == min.substring(0,n)) {
				numSharedDigits=n;
				break;
			}
		}
	}
	var shared=max.substring(0,numSharedDigits);
		
	//crop the min and max values
	min=min.removePrefix(shared);
	max=max.removePrefix(shared);

	//move the shared stuff to the front of the test
	ret+=shared+"(";

	//count the digits
	var minDigits=min.length;
	var maxDigits=max.length;

	//set some flags
	var isSingleDigit=(minDigits==1 && maxDigits==1);
	var isVariableDigits=(minDigits != maxDigits);
	
	//using 1 to 4444 as a range
	//calculate maximum range tests
	//ie: 444x 44xx 4xxx
	if (maxDigits>1){
		ret+=max.substr(0,maxDigits-1)+"[0-"+max.substr(maxDigits-1,1)+"]";
		for (var n=(maxDigits-2); n>0; n--) {
			if (max.substr(n,1)!="0") {
				ret+="|"+max.substr(0,n)+"[0-"+(val(max.substr(n,1))-1)+"]"+("\\d").repeat((maxDigits-1)-n);
			}
		}
	}

	//calculate intermediate range tests
	//ie: 1xxx, 1xx, 1x
	for (var n=maxDigits;n>1;n--){
		//check if min and max both use this digit
		if (minDigits==n && maxDigits==n) {
			//as neither bound would be put out of range
			//and the bounds are not equal
			if ((min.substr(0,1)!="9") && (max.substr(0,1)!="1") && (val(max.substr(0,1))>(val(min.substr(0,1))+1))) {
				ret+="|["+(val(min.substr(0,1))+1)+"-"+(val(max.substr(0,1))-1)+"]"+("\\d").repeat(n-1);
			}
		//detect if min uses this digit
		} else if (minDigits==n) {
			//as long as it does not start with 9
			if (min.substr(0,1)!="9") {
				ret+="|["+(val(min.substr(0,1))+1)+"-9]"+("\\d").repeat(n-1);
			}
			break;
		//detect if max uses this digit
		} else if (maxDigits==n) {
			//as long as it does not start with 1
			if (max.substr(0,1)!="1") {
				ret+="|[1-"+(val(max.substr(0,1))-1)+"]"+("\\d").repeat(n-1);
			}
		} else {
			//they do not use this digit
			//is it BETWEEN their digit counts
			if (n > minDigits) {
				ret+="|[1-9]"+("\\d").repeat(n-1);
			}
		}
	}
			
	//calculate minimum range tests
	//ie: [1-9]
	if (minDigits>1){
		ret+="|"+min.substr(0,minDigits-1)+"["+min.substr(minDigits-1,1)+"-9]";
		for (var n=(minDigits-2); n>0; n--) {
			if (min.substr(n,1)!="9") {
				ret+="|"+min.substr(0,n)+"["+(val(min.substr(n,1))+1)+"-9]"+("[0-9]").repeat((minDigits-1)-n);
			}
		}
	} else {
		//single digit min
		if (maxDigits>minDigits) {
			ret+="|["+min+"-9]";
		} else {
			//both min and max are single digits
			ret+="|["+min+"-"+max+"]";
		}
	}
	
	//fix same start and end range issues
	for (var i=0;i<=9;i++){
		ret=ret.replace(new RegExp("\\["+i+"-"+i+"\\]","gi"),i);
	}
	ret=ret.replace(new RegExp("\\[0-9\\]","gi"),"\\d");
	
	return ret+")";
}catch(e){log("wmLibrary.integerRangeToRegExp: "+e);}};

//***************************************************************************************************************************************
//***** Typing Simulation
//***************************************************************************************************************************************

sandbox.simulateKeyEvent = function(character,byCode) {
  var evt = document.createEvent("KeyboardEvent");
  (evt.initKeyEvent || evt.initKeyboardEvent)("keypress", true, true, window,
                    0, 0, 0, 0,
                    0, ((byCode||null) || character.charCodeAt(0)) ) 
  var canceled = !body.dispatchEvent(evt);
  if(canceled) {
    // A handler called preventDefault
    alert("canceled");
  } else {
    // None of the handlers called preventDefault
    alert("not canceled");
  }
};

sandbox.typeText = function(s) {
	for (var i=0,len=s.length; i<len; i++){
		simulateKeyEvent(s.substr(i,1));
		log(s.substr(i,1));
	}
};

sandbox.typeEnter = function() {
	simulateKeyEvent(null,13);
};

/*formatting notes
format a number to x decimal places
number.toFixed(x);

convert to hexidecimal
number.toString(16);

//try something like this to get your own header details
define your own parseHeaders function
var fileMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name          My Script
// @namespace     http://www.example.com/gmscripts
// @description   Scripting is fun
// @copyright     2009+, John Doe (http://www.example.com/~jdoe)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.0.1
// @include       http://www.example.com/*
// @include       http://www.example.org/*
// @exclude       http://www.example.org/foo
// @require       foo.js
// @resource      resourceName1 resource1.png
// @resource      resourceName2 http://www.example.com/resource2.png
// @uso:script    scriptid
// ==/UserScript==
]]></>.toString());

//include jquery stuff
// ==UserScript==
// @name          jQuery Example
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
*/

//a custom collection wrapper
//this pretty much mimics collections in visual basic
//with a lot of collection methods added from other systems
var jsCollection=function(objOrArray){
	var self=this;
	this.items={};
	
	//return an item from this collection by index or key
	this.__defineGetter__("item",function(indexOrKey){try{
		return this.items[indexOrKey]||null;
	}catch(e){log("jsCollection.item: "+e);}});

	//return the count of items in this collection
	this.__defineGetter__("count",function(){try{
		var ret=0;
		for (var e in this.items) ret++;
		return ret;
	}catch(e){log("jsCollection.count: "+e);}});
	
	//return true if the count of items in this collection is 0
	this.__defineGetter__("isEmpty",function(){try{
		return this.count==0;
	}catch(e){log("jsCollection.isEmpty: "+e);}});

	//remove all items from this collection
	this.clear=function(){try{
		while(this.items[0]) delete this.items[0];
	}catch(e){log("jsCollection.clear: "+e);}};
	
	//return the index of the first occurence of obj
	this.indexOf=function(obj){try{
		var c=0;
		for (var i in this.items){
			if (this.items[i]===obj) {
				return c;
				break;
			}
			c++;
		}
		return -1;
	}catch(e){log("jsCollection.indexOf: "+e);}};

	//return the key of the first occurence of obj
	this.keyOf=function(obj){try{
		for (var i in this.items){
			if (this.items[i]===obj) {
				return i;
				break;
			}
		}
		return -1;
	}catch(e){log("jsCollection.keyOf: "+e);}};

	//returns true if obj occurs in this collection
	this.contains=function(obj){try{
		return this.indexOf(obj)!=-1;
	}catch(e){log("jsCollection.contains: "+e);}};
	
	//returns true if an item in this collection has key = key
	this.containsKey=function(key){try{
		return exists(this.items[key]);
	}catch(e){log("jsCollection.containsKey: "+e);}};

	//remove an item from the collection by index or key
	this.remove=function(indexOrKey){try{
		delete this.items[indexOrKey];
	}catch(e){log("jsCollection.remove: "+e);}};
	
	//add an item to the collection
	//with optional key which defaults to unique()
	//with optional before which is an object to match
	//with optional after which is an object to match
	this.add=function(item,key,before,after){try{
		key=key||unique();
		if (before && this.indexOf(before)!=-1) {
			var ret={};
			for (var i in this.items){
				if (this.items[i]===before) {
					ret[key]=item;
				}
				ret[i]=this.items[i];
			}
			this.items=ret;
		} else if (after && this.indexOf(after)!=-1) {
			var ret={};
			for (var i in this.items){
				ret[i]=this.items[i];
				if (this.items[i]===after) {
					ret[key]=item;	
				}
			}
			this.items=ret;
		} else {
			this.items[key]=item;
		}
	}catch(e){log("jsCollection.add: "+e);}};
	
	//shortform to add an item
	//after an item
	//with optional key
	this.insertAfter=function(item,after,key){try{
		this.add(item,key,null,after);
	}catch(e){log("jsCollection.insertAfter: "+e);}};		

	//shortform to add an item
	//before an item
	//with optional key
	this.insertBefore=function(item,before,key){try{
		this.add(item,key,before,null);
	}catch(e){log("jsCollection.insertBefore: "+e);}};		
	
	//shortform to add an item
	//with optional key
	this.append=function(item,key){try{
		this.add(item,key);
	}catch(e){log("jsCollection.append: "+e);}};			
	
	//shortform to add an item
	//to the beginning of the collection
	//with optional key
	this.prepend=function(item,key){try{
		this.add(item,key,(this.items[0]||null));
	}catch(e){log("jsCollection.prepend: "+e);}};		

	//add an array of items
	//with optional before and after
	this.addRange=function(itemArray,before,after){try{
		if (before && this.indexOf(before)!=-1) {
			var ret={};
			for (var i in this.items){
				if (this.items[i]===before) {
					for (var a=0,len=itemArrayLength;a<len;a++){
						ret[unique()]=itemArray[a];
					}
				}
				ret[i]=this.items[i];
			}
			this.items=ret;
		} else if (after && this.indexOf(after)!=-1) {
			var ret={};
			for (var i in this.items){
				ret[i]=this.items[i];
				if (this.items[i]===after) {
					for (var a=0,len=itemArrayLength;a<len;a++){
						ret[unique()]=itemArray[a];
					}
				}
			}
			this.items=ret;
		} else {
			for (var a=0,len=itemArrayLength;a<len;a++){
				this.items[unique()]=itemArray[a];
			}
		}
	}catch(e){log("jsCollection.addRange: "+e);}};		

	//shortform to add an array of items
	this.appendRange=function(itemArray){try{
		this.addRange(itemArray);
	}catch(e){log("jsCollection.appendRange: "+e);}};			
	
	//shortform to add an array of items
	//to the beginning of the collection
	this.prependRange=function(itemArray){try{
		this.addRange(itemArray,(this.items[0]||null));
	}catch(e){log("jsCollection.prependRange: "+e);}};	

	//add a copy of item 
	//with optional before or after
	this.addCopy=function(item,before,after){try{
		this.add(item,null,before,after);
	}catch(e){log("jsCollection.addCopy: "+e);}};		

	//add multiple copies of item
	//with optional before and after
	this.addCopies=function(item,count,before,after){try{
		var ret=[];
		for (var i=0;i<count;i++) ret.push(item);
		this.addRange(item,before,after);
	}catch(e){log("jsCollection.addCopies: "+e);}};		

	//return the collection converted to an array
	this.toArray=function(){try{
		return methodsToArray(this.items);
	}catch(e){log("jsCollection.toArray: "+e);}};

	//return the index of item with key=key
	this.indexOfKey=function(key){try{
		return this.indexOf(this.items[key]||null);
	}catch(e){log("jsCollection.indexOfKey: "+e);}};	
	
	//return the key of the item at index=index
	this.keyOfIndex=function(index){try{
		var c=0;
		for (var i in this.items){
			if (c==index) return i;
			c++;
		}
	}catch(e){log("jsCollection.keyOfIndex: "+e);}};	

	//use passed data on creation to create initial items
	if (objOrArray){
		if (isArrayAndNotEmpty(objOrArray)){
			for (var i=0,len=objOrArray.length;i<len;i++){
				this.add(objOrArray[i],i);
			}
		} else if (isObject(objOrArray)) {
			for (var i in objOrArray){
				this.items[i]=objOrArray[i];
			}
		}
	}
	
	//return self for external use
	return this;
};

})();