// # Author: Xiao.L ( http://twitter.com/xiaoliulx )

// ==UserScript==
// @name        feedafever shrotcut helper
// @namespace   http://fluidapp.com
// @description This little Userscript Snippet adds a list of shortcut info overlay on your page if you setup your Fever° as a Fluid WebApp. 
//              Press "?" to call out the shortcut list.
// @include     *
// @author      Xiao Liu
// @version     0.1 (22-May-2010)
// ==/UserScript==

(function () {
    if (window.fluid) {
		var ShortCut_HTML='<table style=\"margin:0 12%;padding:0;width:90%;line-height:125%;\">\
		<tr style=\"color:rgb(200,17,0);font-size:120%;\"><th style=\"padding:1em 0 0.5em 0;font-weight:550;\">Shortcut</th><th style=\"padding:1em 0 0.5em 12%;font-weight:550\">Command</th></tr>\
		<tr><td>Z</td><td style=\"padding:0 12%;\">Unread the most recently read items</td></tr>\
		<tr><td>A</td><td style=\"padding:0 12%;\">Mark current group or feed as read</td></tr>\
		<tr><td>⇧A</td><td style=\"padding:0 12%;\">Mark all as read</td></tr>\
		<tr><td>R</td><td style=\"padding:0 12%;\">Refresh all feeds</td></tr>\
		<tr><td>S</td><td style=\"padding:0 12%;\">Save or unsave the current item</td></tr>\
		<tr><td>N</td><td style=\"padding:0 12%;\">Add a new feed</td></tr>\
		<tr><td>⇧N</td><td style=\"padding:0 12%;\">Create a new group</td></tr>\
		<tr><td>U</td><td style=\"padding:0 12%;\">Show or hide read items</td></tr>\
		<tr><td>F</td><td style=\"padding:0 12%;\">Show or hide list of feeds</td></tr>\
		<tr><td>P</td><td style=\"padding:0 12%;\">Display Fever preferences</td></tr>\
		<tr><td>Spacebar</td><td style=\"padding:0 12%;\">Scroll to next item or link or page down</td></tr>\
		<tr><td>⇧Spacebar</td><td style=\"padding:0 12%;\">Scroll to previous item or link or page up</td></tr>\
		<tr><td>K</td><td style=\"padding:0 12%;\">Scroll to previous item or link</td></tr>\
		<tr><td>J</td><td style=\"padding:0 12%;\">Scroll to next item or link</td></tr>\
		<tr><td>0 <em>or</em> ↵</td><td style=\"padding:0 12%;\">Toggle current item excerpt or full content</td></tr>\
		<tr><td>B</td><td style=\"padding:0 12%;\">Add current link to blacklist</td></tr>\
		<tr><td>⇧B</td><td style=\"padding:0 12%;\">Display blacklist</td></tr>\
		<tr><td>O <em>or</em> <span class="symbols">&rarr;</span></td><td style=\"padding:0 12%;\">Open current item or link</td></tr>\
		<tr><td>V</td><td style=\"padding:0 12%;\">Visit site of active item</td></tr>\
		<tr><td>⇧V</td><td style=\"padding:0 12%;\">Visit site and mark its items as read</td></tr>\
		<tr><td>I</td><td style=\"padding:0 12%;\">Edit the current group or feed</td></tr>\
		<tr><td>esc</td><td style=\"padding:0 12%;\">Clear search or dismiss dialog</td></tr>\
		<tr><td>/</td><td style=\"padding:0 12%;\">Focus search input</td></tr>\
		<tr><td class="symbols">&larr; &rarr;</td><td style=\"padding:0 12%;\">Navigate from group list to feed list to items</td></tr>\
		<tr><td class="symbols">&uarr; &darr;</td><td style=\"padding:0 12%;\">Navigate to previous or next group or feed</td></tr>\
		<tr><td class="symbols">⇧&uarr;&nbsp;⇧&darr;</td><td style=\"padding:0 12%;\">Previous or next contributing item to current link</td></tr>\
		<!--<tr><td>&nbsp;</td><td>&nbsp;</td></tr>-->\
		<tr style=\"color:rgb(200,17,0);font-size:120%;\"><th style=\"padding:0.7em 0 0.5em 0;font-weight:550;\">Shortcut</th><th style=\"padding:0.7em 0 0.5em 12%;font-weight:550;\">Send to</th></tr>\
		<tr><td>E</td><td style=\"padding:0 12%;\">Email</td></tr>\
		<tr><td>D</td><td style=\"padding:0 12%;\">Delicious</td></tr>\
		<tr><td>I</td><td style=\"padding:0 12%;\">Instapaper</td></tr>\
		<tr><td style=\"padding:0 0 1em 0;\">T</td><td style=\"padding:0 0 1em 12%;\">Twitter</td></tr>\
		</table>\
		<div style=\"padding:0.8em 0;text-align:center;font-size:120%;\"><a style=\"font-weight:750;color:rgb(200,17,0);text-decoration:underline;\"onclick=\"document.getElementById(\'ShortCut_UserScript\').style.display=\'none\';\">Close</a></div>';
		
		function ShortCut_addStyleSheet(css) {
			var stylesheet=document.createElement('style');
			stylesheet.type='text/css';
			stylesheet.innerHTML=css;
			document.getElementsByTagName("head")[0].appendChild(stylesheet);
		}
		
		function ShortCut_addElement(){
			var newEle=document.createElement('div');
			newEle.id='ShortCut_UserScript';
			newEle.style.display='';
			newEle.style.left='5%';
			newEle.style.top='3%';
			newEle.style.width='85%';
			newEle.style.zIndex='501';
			newEle.style.background='none repeat scroll 0 0 #000';
			newEle.style.color='white';
			newEle.style['text-shadow']='rgb(0, 0, 0) 1px 1px 7px';
			newEle.style.fontSize='145%';
			//newEle.style.borderRadius='55px';
			newEle.style['-webkit-border-top-right-radius']='5px 5px'
			newEle.style['-webkit-border-top-left-radius']='5px 5px'
			newEle.style['-webkit-border-bottom-right-radius']='5px 5px'
			newEle.style['-webkit-border-bottom-left-radius']='5px 5px';
			newEle.style.position='relative';
			//newEle.style.overflow='auto';
			newEle.style.opacity='0.8';
			newEle.innerHTML=ShortCut_HTML;
			document.getElementById('fixed').firstElementChild.appendChild(newEle);
			//document.body.insertBefore(newEle,document.getElementById('fixed').nextSibling);
		}
		
		function toggleDisplay(ele){
			if(ele.style.display=='none'){
				ele.style.display='';
			}
			else{
				ele.style.display='none';
			}
		}
		function VMH_keyHandler(e) {
            if (String.fromCharCode(e.charCode) == '?') {
				var shortcuts=document.getElementById('ShortCut_UserScript');
				if(shortcuts){
					toggleDisplay(shortcuts);
				}else{
					ShortCut_addElement();
				}
            }
        }

    document.addEventListener('keypress', VMH_keyHandler, false);
    }
})();