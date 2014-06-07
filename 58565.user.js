// ==UserScript==
// @name Stack Trace getter
// @author Joao Eiras
// @ujs:modified 2007-04-11
// ==/UserScript==

/*
	Copyright © 2007 by João Eiras

	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License
	as published by the Free Software Foundation; either version 2
	of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program; if not, write to the Free Software
	Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

(function(opera){

	if( !opera )
		return;

	//caching native functions - overriding these can make the script
	//break, which therefore can't be trusted for security
	var RegExp_test = RegExp.prototype.test;
	var RegExp_exec = RegExp.prototype.exec;
	var String_split = String.prototype.split;
	var String_replace = String.prototype.replace;
	var String_substring = String.prototype.substring;
	var Function_call = Function.prototype.call;

	function extend(object,fields_src){
		for(var prop in fields_src){
			try{
				object[prop] = fields_src[prop];
			}catch(ex){}
		}
		return object;
	};

	//types of places where scripts run
	var scriptTypes = {
		UNKNOWN : 0,
		INLINE : 1,
		LINKED : 2,
		USERJS : 3,
		EVAL : 4
	};

	function scriptTypeToString(t){
		switch(t){
			case scriptTypes.INLINE :return 'inline script';
			case scriptTypes.LINKED :return 'linked script';
			case scriptTypes.USERJS :return 'UserJS';
			case scriptTypes.EVAL   :return 'eval';
			case scriptTypes.UNKNOWN:return 'unknown';
		}
		return t;
	};

	function StackTrace(){
		extend(this,[]);//in case of prototype editing...Array.prototype can change though

		//using this.fname = function(){} is safer that prototype, because
		//this way methods in the prototype aren't overriden
		this.toString = function(){
			var s='';
			for(var k=0; k<this.length; k++)
				s += this[k].toString('\t')+',\n';
			return '[object StackTrace]{\n'+s.substring(0,s.length-2)+'\n}';
		};
		this.toSmallString = function(){
			var s='';
			for(var k=0; k<this.length; k++)
				s += this[k].toSmallString('\t')+',\n';
			return '{\n'+s.substring(0,s.length-2)+'\n}';
		};
		this.UserJsOnly = function(){
			//yes eval can be called from userjs, but it can too be called from a page script, and it's not detectable
			//and eval can easily be workarounded
			//the last element is skipped because it's always unknown when functions are called by the event dispatcher
			//a regular page can too set up a event listener, but it can't wrap the function call
			for(var k=0; k<this.length; k++){
				if( k == (this.length - 1) )//for timers, event listeners or address bar
					if( this[k].type == scriptTypes.UNKNOWN )
						return true;
				if( this[k].type != scriptTypes.USERJS )
					return false;
			}
			return true;
		};
	};
	//[] indexing operator can only be copied this way
	StackTrace.prototype = [];

	function StackTraceElement(line,type,src,expr){
		this.lineno = line||0;
		this.type = type||scriptTypes.UNKNOWN;
		this.src = src||'';
		this.expression = expr||'';

		this.typeToString=function(t){
			return scriptTypeToString(t||this.type);
		};
		this.toString = function(pad){
			if( typeof pad == 'undefined' )
				pad ='';
			return	pad+'[object StackTraceElement]{\n'+
					pad+'\tLine '+this.lineno+'\n'+
					pad+'\tType '+this.typeToString()+'\n'+
					pad+'\tUrl: '+(this.src||'unknown location')+'\n'+
					pad+'\tExpression: \n\t\t'+this.expression+'\n'+
					pad+'}';
		};
		this.toSmallString = function(){
				return this.type == scriptTypes.UNKNOWN?
					'"'+this.expression+'" at unknown location':
					'"'+this.expression+'" at line '+this.lineno+' of '+this.typeToString()+' at '+(this.src||'unknown location');
		};
		//make constants accessible inside a instance
		extend(this,scriptTypes);
	};
	//make constants public
	extend(StackTraceElement,scriptTypes);
	StackTraceElement.typeToString = scriptTypeToString;

	var addUnknown = false;
	function getStackTrace(exception,prevStackTrace){
		RegExp_exec.call = RegExp_test.call = String_split.call = String_replace.call = Function_call;

		function trim(s) { return s==null ? s : String_replace.call(String_replace.call(s, (/^\s+/),''), (/\s+$/),''); }
		function clean(s){ return s==null ? s : String_replace.call(s, (/\s+/g), ' '); }

		var skip = 0;
		if( arguments.length==0 )
			try{
				undefined()();
			}catch(ex){
				exception = ex;
				skip=2;
			}
		else if( !(exception instanceof Error) )
			return ['ERROR: wrong object type passed to opera.getStackTrace. Exception required'];

		var line_re = /\s*Line (\d+) of (User JS|inline#\d+|linked|eval|unknown) script( in)? (.*)?/;
		var unk_re = /At unknown location/;

		var parts = String_split.call(trim(exception.stacktrace || exception.message), '\n');
		var str = new StackTrace();
		for(var k=0;k<parts.length;k++){
			if( RegExp_test.call(unk_re, parts[k]) ){
				//push can't be used...
				if( addUnknown )
					str[str.length++] = new StackTraceElement(0,
						scriptTypes.UNKNOWN, '', String_replace.call(trim(parts[++k]), /^\[(.*)\]$/,'$1'));
				else k++;
				continue;
			}
			if( !RegExp_exec.call(line_re, parts[k]) )
				continue;

			if( skip ){ skip--; continue; }
			var lineno = parseInt(RegExp.$1);
			var stype = RegExp.$2;
			var url = RegExp.$4||RegExp.$3;

			var expression = '';

			for(var m=k+1;m<parts.length && !RegExp_test.call(line_re, parts[m]) && !RegExp_test.call(unk_re, parts[m]);m++){
				expression += parts[m];
			}
			expression = clean(expression);

			if( stype=='User JS' ) stype = scriptTypes.USERJS;
			else if( String_substring.call(stype,0,6)=='inline' ) stype = scriptTypes.INLINE;
			else if( stype=='linked' ) stype = scriptTypes.LINKED;
			else if( stype=='eval' ) stype = scriptTypes.EVAL;
			else if( stype=='unknown' ) stype = scriptTypes.UNKNOWN;
			else stype = scriptTypes.UNKNOWN;
			//alert(str.length+' '+str[str.length]);

			if( stype != scriptTypes.UNKNOWN || addUnknown ){
				str[str.length++] = new StackTraceElement(lineno,stype,url,expression);
			}
			//str.length++;
			k=m-1;
		}
		if(prevStackTrace && prevStackTrace instanceof StackTrace){
			for(var k=0;str[k];k++)
				prevStackTrace[prevStackTrace.length++] = str[k];
			return prevStackTrace;
		}
		return str;
	}

	opera.getStackTrace = getStackTrace;

})(window.opera);

