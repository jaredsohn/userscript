// ==UserScript==
// @name           Simple SmartyPants
// @namespace      http://www.aditya-mukherjee.com
// @description    Derives base idea from SmartyPants, but is much simpler in implementation I'm guessing.
// @include        *.blogger.com/post-*
// ==/UserScript==

/*

Licensed to Aditya Mukherjee under Creative Commons 2.5 Works
     <http://creativecommons.org/licenses/by-nc-nd/2.5/>

*/

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

function smartyPants(){

	function smarty(text){

		text = text.replace(/'(?=\d)/g, '&#8216;'); //left curly before any digit
		text = text.replace(/\B'(?=\w)/g, '&#8216;'); //left curly before any letter when preceded by a space
		text = text.replace(/(\S)'(?=\w)*/g, '$1&#8217;'); //right curly when followed by alphanumeric, space or new line
		text = text.replace(/^"(?=\w)/g, '&#8220;'); //1 for double
		text	 = text.replace(/"$|(\S)"/g, '$1&#8221;'); //2 for double
		text = text.replace(/\.\.\./g, '&#0133;'); //ellipses
		text = text.replace(/-{1,2}/g, '&#8211;'); //en dash
		text = text.replace(/-{3}/g, '&#8212;'); //em dash
	
	return text;
	}//nested function to keep alive

	ta = $('textarea').value;
	GM_log(ta);
	ta = ta.replace(/(<([^>]+)>)/ig,"");
	words = ta.split(' ');
	
	for(i=0;i<words.length;i++){
		GM_log(words[i]+' -- '+smarty(words[i]));
		$('textarea').value = $('textarea').value.replace(words[i], smarty(words[i]));
	}

}

smarty = document.createElement('span');
smarty.setAttribute('style','color:black;border-bottom:1px solid #BDB76b');
smarty.id = 'htmlbar_Smarty';
smarty.innerHTML = 'Smarty';
smarty.addEventListener('click', function(){smartyPants();}, true);


window.addEventListener('load',function(){$('htmlbar').insertBefore(smarty, $('htmlbar_PreviewAction'));}, true);