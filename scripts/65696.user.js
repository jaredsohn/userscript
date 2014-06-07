// ==UserScript==
// @name           FSC linker
// @namespace      pardus.at
// @description    Searches for FSC ship designs in chat and creates a link to the design. 
// @include        http://chat.pardus.at/chattext.php*
// @version        0.2
// @author         John Wu
// ==/UserScript==

var fsc = "http://killermist.com/pardus/fsc/";
var pattr1 = "^FSCv4.1\|[A-Za-z0-9\s]+[\|0-9]{65}";
function convert() {
var i = 1;
var chat_lines = document.getElementsByTagName('div');
var num_of_lines = chat_lines.length;
while(i < num_of_lines){
        var line = chat_lines[i];
	var estring = line.innerHTML.match(pattr1);
	if (estring) {
	  var div = document.createElement('div');
	  div.innerHTML = '<a href="' + fsc + '?' + 'FSCv4.1\|' + escape(estring) + '" target="_blank">--------------------------------------------Open in FSC---------------------------------------------------</a>';
	  line.parentNode.insertBefore(div, line);
	  i++;
          }
        i++;	
        }
}
convert();

