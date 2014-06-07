// ==UserScript==
// @name          Google Images Info
// @namespace     http://we.blog.br/
// @description	  Show the size and domain info automatically
// @include       http://images.google.tld/images?*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)
(
function() {
	function removeActions(elem){
		document.getElementById(elem).removeAttribute('onmouseover');
		document.getElementById(elem).removeAttribute('onmouseout');
	}
	if(document.getElementById('lowerLimit').innerHTML && document.getElementById('upperLimit').innerHTML){
		var pos1 = document.getElementById('lowerLimit').innerHTML;
		var pos2 = document.getElementById('upperLimit').innerHTML;
		var total = (pos2*1)-(pos1*1);
		for(i=0;i<(total+1);i++){
			document.getElementById('div_image'+i).style.padding = '10px auto 3px !important';
			document.getElementById('div_image'+i).style.margin = '3px 3px 0 !important';
			document.getElementById('div_image'+i).style.background = 'none !important';
			document.getElementById('div_image'+i).style.border = 'none !important';
			document.getElementById('div_snippet'+i).style.margin = '0 3px !important';
			document.getElementById('div_hidden'+i).style.display = 'block';
			document.getElementById('div_hidden'+i).style.visibility = 'visible !important';
			document.getElementById('div_hidden'+i).style.position = 'static !important';
			document.getElementById('div_hidden'+i).style.width = 'auto !important';
			document.getElementById('div_hidden'+i).style.background = 'none !important';
			document.getElementById('div_hidden'+i).style.border = 'none !important';
			removeActions('div_image'+i);
			removeActions('div_hidden'+i);
			removeActions('div_snippet'+i);
		}
	}
}
)
();