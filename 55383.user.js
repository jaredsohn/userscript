// ==UserScript==
// @name      	Forum Post Signature
// @namespace	goallineblitz.com
// @include	http://goallineblitz.com/game/forum_thread.pl*
// @include http://goallineblitz.com/game/forum_thread_list.pl?*
// @author	garrettfoster modded by DDCunderground
// @version	2009.07.15
// ==/UserScript==


window.setTimeout(
function(){

var post = getElementsByType('image', document)
var item = post.length -1;
post[item].addEventListener('click', attachSig, false);		



function getElementsByType(typename, par){


	// function to retrieve objects via class name
   var a=[];  
   var re = new RegExp('\\b' + typename + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].type)){
         a.push(els[m]);
      }
   }
   return a;


}


function attachSig(){
	
	//------------ start signature ----------- //
	
	var sig = "[i][b]GLB Addict - Proud member of the Congo Gorillas - GWW - Proud Owner of the Sun Valley Hell Hounds[/i][/b]"; //<<<< edit between the "" marks
	
	//------------ end signature ---------//

    var txtarea = document.getElementsByTagName('textarea');

	var text = txtarea[0].value;	
	text += "\n" + "\n" + sig;
	txtarea[0].value = text;
}

},3000);