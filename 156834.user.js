// ==UserScript==

// @name          April FlipText

// @namespace     http://www.sovas.lv

// @description   Script that will flip text in every page , on witch it can find jQuery

// @include      http://*

// ==/UserScript==

(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery , unsafeWindow); });
  }
  GM_wait();

  function letsJQuery($ , usw)
  {
  
	$.fn.fliptext = function(){
 
		  var charset ={a:"\u0250",b:"q",c:"\u0254",d:"p",e:"\u01DD",f:"\u025F",g:"\u0183",h:"\u0265",i:"\u0131",j:"\u027E",k:"\u029E",l:"l",m:"\u026F",n:"u",o:"o",p:"d",q:"b",r:"\u0279",s:"s",t:"\u0287",u:"n",v:"\u028C",w:"\u028D",y:"\u028E",z:"z",1:"\u21C2",2:"\u1105",3:"\u1110",4:"\u3123",5:"\u078E"   /* or u03DB */ ,6:"9",7:"\u3125",8:"8",9:"6",0:"0",".":"\u02D9",",":"'","'":",",'"':",,","Ć?Ā“":",","`":",",";":"\u061B","!":"\u00A1","\u00A1":"!","?":"\u00BF","\u00BF":"?","[":"]","]":"[","(":")",")":"(","{":"}","}":"{","<":">",">":"<",_:"\u203E","\r":"\n"};
		  

		  $.expr[':'].nochildren = function(elem){
		   return !elem.innerHTML.match(/\<\w/);
		  };

		  function flipStr(str) {
			var result = "";
			for (var x = str.length - 1; x >= 0; --x){
				var c = str.charAt(x);
				var r = charset[c];
				result += r != undefined ? r : c;
			}
		  
			return result;
		  };

		  // we check all nodes to see if they have children by looking for < in their innerHTML
		  // for a more pure DOM approach looking for textNodes only, see http://pastie.org/435207.txt
			this.find('*').andSelf().filter(':nochildren').each(function(){
					var flipped = flipStr((this.innerText || this.textContent).toLowerCase());
					if (this.innerText) {
						this.innerText = flipped;
					} else {
						this.textContent = flipped;
					}
			
		  });  
		  
		  return this;  
		  
		};
  
  

	$('html').fliptext();

  }
})();





