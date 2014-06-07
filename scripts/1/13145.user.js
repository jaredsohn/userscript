// ==UserScript==
// @name			Hackvertor
// @description		It's a useful conversion tool to help with conversions and pen testing server side XSS filters.
// @namespace		http://www.businessinfo.co.uk/labs/hackvertor/hackvertor.php
// @include		*
// ==/UserScript==

/** Legal bit:
    Do not remove this notice.
    Copyright 2007 by Gareth Heyes

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Hackvertor = function() {
	var input, prefixes,supportedConversions, options;			

	this.options = [];
	this.supportedConversions = ['dec','hex','uni','oct','enc','concat','javachar','charcode','eval','tag','randchars','dquote','squote'];
	
	this.setPrefixes = function(prefixes) {
		this.prefixes = prefixes.split(',');
	}
	this.setInput = function(input) {
		this.input = input;
	}
	this.execute = function() {
		return this.findMatches();
	}
	this.findMatches = function() {
		var conversions = this.supportedConversions;
		var output = this.input;
		for(var i=0;i<conversions.length;i++) {
			var re = new RegExp('{('+conversions[i]+')}(.*?){\/('+conversions[i]+')}','mg');
			var matches = '';					    
			regExpLoop:do {				
				r = re.exec(output);      			
				if(r == null) {
					break regExpLoop;
				}
				var type = r[1];		
				var code = r[2];
				matches = this.convert(code, type);
				output = output.replace(new RegExp('{('+type+')}(.*?){\/('+type+')}','mg'),matches);
				
			} while(r != null);
		
		}
		
		return output;
	}
	this.getRandom = function(from, to) {
		return Math.floor(Math.random() * to)+from;
	}
	this.getKey = function() {
		var html = '';
		for(var i=0;i<this.supportedConversions.length;i++) {
			html += '<span class="highlight" onmousedown="addTag(this)">'+this.supportedConversions[i]+'</span> ';
		}
		return html;
	}
	this.convert = function(code, type) {		
	
	var codes = this.getCharacterCodes(code);
	
		switch(type) {
			case "replace":
				return code;
			break;
			case "randchars":
				var numberOfChars = parseInt(code);
				if(isNaN(numberOfChars)) {
					numberOfChars = 1;
				}
				var randChars = '';
				for(var i=0;i<numberOfChars;i++) {
					randChars += String.fromCharCode(this.getRandom(0,127));
				}
				return randChars;
			break;
			case "squote":
				code = "'" + code + "'";
				return code;
			break;
			case "dquote":
				code = '"' + code + '"';
				return code;
			break;			
			case "javachar":
				code = [];
				for(var i=0;i<codes.length;i++) {
					code.push('java.lang.Character('+codes[i]+')');
				}
				return code.join('+');
			break;
			case "tag":
			
				var tagStart, tagEnd;
				var tags = [  '<body onload={q}s1{q}></body>','<body background={q}javascript:s1{q}></body>',
							   '<iframe onload={q}s1{q}></iframe>','<iframe src={q}javascript:s1{q}></iframe>',
							   '<meta http-equiv={q}refresh{q} content={q}0;url=javascript:{q}s1{q}>'
							];
				var tag = tags[this.getRandom(0, tags.length)];
				tag = tag.replace("s1", code);												
				tag = tag.replace(/{q}/g, this.getOption('quoteType'));
				if(this.getOption('incompleteTags') == 1) {
					tag = tag.replace(new RegExp('></(.+?)>','g'), '');
				}
				return tag;
			break;
			case "eval":
				var evalVectors = [ 'new Date() ', this.getRandom(0, 1000), '(' + this.getRandom(0, 1000) +')', '/123/' ]
				return evalVectors[this.getRandom(0, evalVectors.length)] + '[\'eval\'](\''+code+'\')';
			break;
			case "concat":
				var concatVectors = [	"(1&2!=0)?'s1':'0123AEF'+'ABCDEFG'","(2-1==1)?'s1':'abc'",
									  	"(1/2==1)?'ABC'+'XYZ':'s1'","(1^2==0)?'s1':'ABC'+'DEFG'",
										"(!1&2|1==4)?'ABCDEFG':'s1'","(0^0==0)?'s1':'ABCDEFG'",
										"0?'':'s1'","1==1&&'s1'","1==true&&'s1'",
										"x1=1&&'s1'","'s1'","1!=1?0:'s1'","false==false?'s1':'abc'",
										"!'' ? 's1' : 'abc'"  ];
				
				var variablePrefixes = this.getOption('variablePrefixes').split(',');
				var pos = this.getRandom(0, variablePrefixes.length-1);
				var varName = variablePrefixes[pos];
				var vector = concatVectors[this.getRandom(0, concatVectors.length)];
				var concatString = '';
				for(var i=0; i<code.length;i++) {
					concatString += (varName + i + '=') + vector.replace("s1", code.charAt(i)) + ';';					
				}
				concatString += '\n' + varName + (i++) + '=';
				for(var i=0; i<code.length;i++) {
					concatString += (varName + i);
					if(i + 1 < code.length) {
						concatString += '+';
					}
				}
				concatString += ';';
				return concatString;
			break;
			case "charcode":
				return 'String.fromCharCode(' + codes.join(',') + ')';
			break;
			case "enc":
				code = escape(code);
				if(this.getOption('encodePlus')) {
					code = code.replace(new RegExp('[+]','g'), '%2b');
				}
				return code;
			break;
			case "uni":				
				code = '';
				for(var i=0; i<codes.length;i++) {
					code += '\\u' + parseInt(codes[i].toString(16)).toFixed(2).split('.').reverse().join('');
				}
				return code;
			break;				
			case "oct":				
				code = '';
				for(var i=0; i<codes.length;i++) {
					code += '\\' + codes[i].toString(8);
				}
				return code;
			break;			
			case "dec":				
				code = '';
				for(var i=0; i<codes.length;i++) {
					code += (this.getOption('entityMode') == true ? '&#x' : '\\') + codes[i]  + (this.getOption('semiColons') ? ';' : '');
				}
				return code;
			break;
			case "hex":				
				code = '';
				for(var i=0; i<codes.length;i++) {
					code += (this.getOption('entityMode') == true ? '&#x' : '\\x') + (this.getOption('uppercase') ? codes[i].toString(16).toUpperCase() : codes[i].toString(16))  + (this.getOption('semiColons') ? ';' : '');
				}
				return code;
			break;			
		}
	}
	this.getCharacterCodes = function(str) {
		var codes = [];
		for(var i=0; i<str.length;i++) {
			codes.push(str.charCodeAt(i));
		}
		return codes;
	}
	this.setOption = function(option, value) {
		this.options[option] = value;
	}
	this.getOption = function(option) {
		return this.options[option];
	}
}

function getSelectedText() {    
	var txt = '';    
    if(window.getSelection) {
       txt = window.getSelection();
    } else if (document.getSelection) {
        txt = document.getSelection();
    } else if (document.selection) {
        txt = document.selection.createRange().text;
    } else {
        return;      
    }
    
    var input = document.getElementById('input');
    if(txt == '') {
      txt = (input.value).substring(input.selectionStart,input.selectionEnd);      
      return txt;
    } else { 
      return txt;
    }
}

hv = new Hackvertor;
hv.setPrefixes('$,_,#,s,x,y');
hv.setOption('semiColons',true);
hv.setOption('uppercase',true);
hv.setOption('variablePrefixes','$,_,#,s,x,y');
hv.setOption('quoteType','"');
hv.setOption('incompleteTags',true);
hv.setOption('encodePlus',true);	
hv.setOption('entityMode',true);	

function checkKey(e) {
	if(e.ctrlKey && e.shiftKey && e.keyCode == 72) { // CTRL+SHIFT+H
		var allElements, thisElement;
		allElements = document.getElementsByTagName('*');
		for (var i = 0; i < allElements.length; i++) {
			thisElement = allElements[i];
			hv.setInput(thisElement.value);			
			thisElement.value = hv.execute();							
		}		
	} else if(e.ctrlKey && e.shiftKey && e.keyCode == 84) { // CTRL+SHIFT+T
		alert('Supported tags:\n' + hv.supportedConversions.join('\n'));
	}
}
document.addEventListener("keydown",checkKey,0);