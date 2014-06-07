// ==UserScript==
// @name Experts Exchange Deobfuscator
// @author Terr 
// @namespace http://deltanin.blogspot.com/ 
// @version 1.0.0
// @description  Makes content in experts-exchange visible.
// @include http://www.experts-exchange.com/*
// @include http://experts-exchange.com/*
// ==/UserScript==

/*
	Merged from two scripts
	http://userscripts.org/scripts/show/10747
	http://personal.inet.fi/cool/jjlammi/rot13.html
	
	Improved with better text conversion by using the DOM to find text nodes
	instead of changing innerHTML.
*/

var code = function () {	
	function rot13init(){
		var map = new Array();
		var s   = "abcdefghijklmnopqrstuvwxyz";
		
		for (var i=0; i<s.length; i++)
		map[s.charAt(i)]			= s.charAt((i+13)%26);
		for (var i=0; i<s.length; i++)
		map[s.charAt(i).toUpperCase()]	= s.charAt((i+13)%26).toUpperCase();
		return map;
	}
	function rot13(rot13map,a){			
		var s = "";
		for (var i=0; i<a.length; i++)
		{
			var b = a.charAt(i);			
			s+= (b>='A' && b<='Z' || b>='a' && b<='z' ? rot13map[b] : b);
		}
		return s;
	}	
	var elems = document.getElementsByTagName("div");
	var todo = [];
	for(var i =0; i< elems.length; i++){		
		var elem = elems[i];
		if( elem.className == "answerBody quoted"){
			if( elem.getAttribute("id") == "intelliTxt"){
				todo.push(elem);					
			}			
		}else if( elem.className == "blur"){
			elem.className = "seethru";
		}else if(elem.className == "hasMouseOver"){
			// Bizarro no-message script death in here...
			elem.className = 'noMoreMouseOver';			
			try{
				elem.setAttribute('onmouseover','');
				elem.onmouseover = '';				
			}catch(err){}
			try{
				elem.setAttribute('onmouseout','');
				elem.onmouseout = '';
			}catch(err){}			
		}
	}	
	var rot13map = rot13init();	
	for(var i =0; i < todo.length; i++){
		/* We're inside a comment, but they can have BR tags as well as text. Only work on text.*/
		
		var elem = todo[i];
		for(var j =0; j < elem.childNodes.length; j++){
			var subnode = elem.childNodes[j];				
			if(subnode.nodeType == 3){
				var newnode = document.createTextNode(rot13(rot13map,subnode.nodeValue));
				elem.replaceChild(newnode,subnode);
			}				
		}						
	}
	
};

var retval = document.addEventListener('load',code,false);
if(retval ==null){
	// Huh? Just run it then.
	(code)();	
}

