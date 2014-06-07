// ==UserScript==
// @name           Quote/Reply to comments in Blogger
// @namespace      
// @description    Adds a 'Reply' link to help quote comments in Blogger
// @include        *blogger.com/comment.g*
// @include        *blogger.com/comment.do
// ==/UserScript==

/**************************************************
	Licensed under Creative Commons 
	Attribution-Noncommercial-No Derivative 
	Works 2.5 License

	If you want to create a derivative work,
	please get in touch.

	     (www.aditya-mukherjee.com)

***************************************************/

function $(){
 return document.getElementById(arguments[0]);
}//faster getElementById

p = document.getElementsByTagName('p');

function quoteNstripBR(text){
	return '&ldquo;<i rel="cquote">'+text.replace(/<br>/g, '\n')+'</i>&rdquo;\n\n';
}//converts all BRs to newline characters

window.addEventListener('load', function(){
for(i=0;i<p.length;i++){
    if(p[i].getAttribute('class')=='comment-timestamp'){//append 'Reply' links only in p.comment-timestamp
    	var quote = document.createElement('a');
	    quote.innerHTML = 'Reply';
	    quote.href = '#cbody';							//link to comment form
		quote.addEventListener('click', function(){
				createReturnLink(this.parentNode.parentNode.previousSibling.previousSibling.id);//create link back to current comment
				$('returnLink').style.display = 'inline';
				
					/* check if comment author has link.
					    if link, point to innerHTML of link
					    else to innerHTML of containing DIV */
					elem = this.parentNode.parentNode.previousSibling.previousSibling; i=0; anchor = 0;
					while(i<elem.childNodes.length){/* made to change to detect author's name and add it */
						if(elem.childNodes[i].nodeName == 'A'){
							anchor = i;
							break;
						}
						i++;
					}
					if(anchor == 0)
						node = elem.innerHTML.replace("    said...     ",'');
					else
						node = elem.childNodes[anchor].innerHTML;
					
				$("comment-body").value += quoteNstripBR(node+': '+this.parentNode.parentNode.childNodes[0].innerHTML); //put quoted text into comment form
				}, true);
	p[i].appendChild(quote); //append 'Reply' link
    }//end of P.comment-timestamp IF
}//end of FOR
}, true);

function createReturnLink(returnID){//function to create return link to comment from form
var ret = document.createElement('a');
ret.href = '#'+returnID;
ret.id = 'returnLink';
ret.setAttribute('style','display:none');
ret.addEventListener('click',function(){ this.parentNode.removeChild(this) }, true);
ret.innerHTML = 'Return';

$('cbody').insertBefore(ret, $('html-usage-msg').nextSibling);
}