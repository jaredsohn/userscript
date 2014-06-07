// ==UserScript==

// @name		BlockFlash Plus 1.0.3
// @namespace		http://userscripts.org/scripts/show/12617
// @description		Hides Flash and Shockwave animations until you click on an icon to play them
// @run-at document-start
// @include http://*
// ==/UserScript==
//

(function(){


// Exclude list
	
var exclude = ['mail.google.com', 'blizzard.com', 'megaupload.com', 'files.mail.ru'];

var css = 'object[classid$=":D27CDB6E-AE6D-11cf-96B8-444553540000"],object[codebase*="swflash.cab"],object[data*=".swf"],embed[type="application/x-shockwave-flash"],embed[src*=".swf"],object[type="application/x-shockwave-flash"],object[src*=".swf"],object[codetype="application/x-shockwave-flash"],iframe[type="application/x-shockwave-flash"],object[classid$=":166B1BCA-3F9C-11CF-8075-444553540000"],object[codebase*="sw.cab"],object[data*=".dcr"],embed[type="application/x-director"],embed[src*=".dcr"],object[type="application/x-director"],object[src*=".dcr"],object[classid$=":15B782AF-55D8-11D1-B477-006097098764"],object[codebase*="awswaxf.cab"],object[data*=".aam"],embed[type="application/x-authorware-map"],embed[src*=".aam"],object[type="application/x-authorware-map"],object[src*=".aam"],object[classid*="32C73088-76AE-40F7-AC40-81F62CB2C1DA"],object[type="application/ag-plugin"],object[type="application/x-silverlight"],object[type="application/x-silverlight-2"],object[source*=".xaml"],object[sourceelement*="xaml"],embed[type="application/ag-plugin"],embed[source*=".xaml"]{display:none;}';


// Logos

var play = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEa0lEQVR4Xp1TfUxVZRx+zrnnnnu+7gf34pDEmmyu0qmVA0ql8gNRRBTBtIXoNEiQ/IDCYBc2S2OpSKVbW3NTY7WlBdNms+bHao5qWJBMXYRo2BXwClwu3Mu9595z3l7OH4SW1Xq2Z7+z/d73d57f8+zFg1D61vvs+tLdttXF1TPS15WmL6HMKaqekfNKpbWkupbFA8DgPmRtLDep0ejskVCkRFGkLKfTabfLIliGgW9oCH19vsH+Qf9JjmMPOu1Ky8nDezWMwz1/2lT+juTxDuyWJOXc0gWp6za8sMKevyoDq5elYXVmGvKylyEvN8u+PG1+vsvhON95q/fN7IJy8W8VZhdUiLfvDLw7a/qjhYvmJeGhOBcUkYcW0SCLFnAch+FgGP5ACD5/gNKPppaf0dzS9oHD7ig990ldCBQcJba4DzDNl69tmTX98cLMhXMxKS4GdlmCmTPhw8avEaPIWJueCs7EwsQwBnmzCempc8CA2fzdT20dZbsP1dW6S4ixcuet7oRHJk8qWzQvGQl0WIxVgdUqw07Z7x9GzdFGNJxrgollYLMKcNklTHDYMMFpR9qzKUxCfHzFpbZfEsY8jGraS7NnTps4OT4WNkmELIuwygJkSs5kwkhYxZ4jDThxtgk8z8GqSLRvgSKYER/rxJzkmbE0yHxj5ezCN8yCqCyeOuVhWEUegihAFCxgWRaapo2ZPBQMYV/9KcgCj6z5T0OWLEYCNG3MnJqIH35sW7CyoGIvC0CQBD7VaZMh8GbDG87EIDA8gmBQhabrYwkOBoLYdfgzHD/zLSLRKCy8mZKH026FIolP+QNBno11ulgLL3Iyb6GDOEORFtWhU0bCEeN7PHzDQRw9/Q26vQOADrAMY4THW8wOm1XmWDUSAQGgg4DoBGE1imAoTBVooL5QhRrGw0U3KVq5CE6b1VDPgAEhhFaqIaoR9s5dr6prameIDgZ0qFRVMDCCkBqGqqrQtD8V2hURO/NW4PmkJwxVMKSAnjU2aQ0MDYbZjNSU8HAwdNbb74dKL0d1jdYIrTpVQMY8tIoCtucuxcKUJ8EZwxiDtI/evgH0D/iaF89NVtlXX16rh0aC9deu/xYapEkyNBCGMQ5CpwQBRGp+2YuZNN1njCDGw0/vtF7pCBOif1SxbSNhQSFJfHNH542G9pu3oUY0cDRpE8dAZwkcNgkluUuw/LmUvwwbobZcvX4LV9rbP+fY6KV73vKa4sopLlfcp/PnJCU9lhgPSeSNl0GtgMDxEC08xiMUieLXrl40fnW+9U6PZ9WZjw/dwP3I27prWpH7vYv1Jy+Qqx1dxNNzl/T0eInntpd0eXqM6un2ko6bHnL8y4tkfVlNU0b+9un4J+SVVMXn79hz0H3gyNDpC83k5u+9pM/nJ/2Dw6Sr+y658P1lUkV7uUXugzmbXpuI/wL323Wmgtf3JOZvra4prNx3bGvV/si2qtpIYeX+Y2s2V9Zs2LErcfQM/g9ONH7BFpe5lVEebzjF4l/wB/Vo6XSBF64oAAAAAElFTkSuQmCC';

var logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEo0lEQVR4Xp2TC0xTVxyHf/fR3paWvuUxAR+4xaFMN50SndMRs+nMdOrQGTedqLEUtSKb66qAVSMKiw9qXAh7uJklioFNZpiGzUg0sBk1OgVFHiJYqyBgBfq6t/fslpDN7OHMvuQ7j+Sf38n/5Bz8G1s+LaazdzjVizLznnvj/Y2Tw6Zl5j1rtheqbLsO0nhaFlly6HmrbEmpS6zb5662X1yxqfCe1XGgO+zy7Hz3W+m2i6+8Y9k2c6l19OLMnCcH2wtKlCnzzRlpmY7ru4uP+Y6drAn9VHOVnPn1+oA/114jZadqQ3u+LPctztxaP/7N9DVm+24F/omMzYXcq2nr7Jbcos7SynOhcxdvkCv1zeRm8x3S3OwasLXtLjlTc4lsLzpEbLtLQusczs6X5660LbVu5zAILYksRxF1ub554ZjRo6yzpqcYExOi6RhDJAy6SGi1Kuj06gFLT1Rh9db9KD55HhWXGunUqZOME15I3nC9qfXt7B0HqD8CW9rd0cPj49bPSJlgjIvWU/pINTSRUpBGDa06AjqtGt+UV2JPaRVC2hioNBqMio9FtElHzZ6RYkqIG5r1W0NLFCRYSQQFYdbUsaOT4mNNjCZCCZVKiUi1EpxcBoqi0Njqwr7D30MVNQx66YDc5XOQlBADCoBKJmOmTByX9EPVmdkADtELzXbWoNenJg6Pi4hUyqFQKqBUcJAPhoUp+bYMIZUR/V4f1i94DeNGPIMBQEHFcXh+5DClyaCbvmDNZpaNMuo4EbKXDBoVrZDLIZexUHIs6MGwHk8vyk+fh5/TwdvnwU7n1/hMDGB/wSfQaTUIl+k1EYxGrUr2+rwy1mQwMp7+YIRKzlEsw4BhKNA0jUFwuroWLncnQnpAFAka/UEYGBoCIQDC0uBkMopTcDp1BMeygiAQACERhBCRUL29PjA0K7XMAoSg5KsjCGqGQM4LmCLdGxFCUHOAnGVAU5KgQECINApBXiDsjaaWYGxMbKuf50eCiJQoAF0PukFRIuoamnH26i1AG4V5k8egeKcVvv4ACAB/MIBBpDVP+IBww+2+E6BnTZvE93l9Zzu7H/G8SEAgSgLtUpv2XQfh1xgh8/YjY/l8dPQ8gsfvhzfADz4QCiFRREf3w2CPx3Ph9WmTBQoSaRlbXhyfnPzdzKnjE6J1aiovvwgnfqlDN09ACwRZ782B9YM0BHkeFCg8Tk+flxw/Xdt2+WrdvIovdl2hIWE0aOputtwqbWq77/PxAhrb7+OhX4SWYWGePxOZyxbC7w/+Lcwntd1wy+Wta7h5RKti6wH8WbHMunWoVm9ypk6ZOLurq0PhC4QwNjEBI4bFIuAXwDA0HsfPC6SpvSNQUVV96kGHy1JxaN9d/JVVH+Unrs11Hj1Wea5X+h2iy91F3O5O4rrbSdpc9wZml7Rvuu0Sy07V9K7cVHB0wepNiXgS6VmOIekf5tsc+w/X/1h9oe+2q4PvevhI7Pb0ie3uLr76/LW+bc7D9e+uy7MtybCZ8DQUOj9n1m4uiF+x0WG25Owp2JC390JYS87egqVrc9eYP94ZH67B/6G8opK2ZG9RhC07foLGf/A7Zh4O6EwwR4IAAAAASUVORK5CYII=';


// Check if site is excluded
var host = location.hostname.replace(/^www\./, '');
for(var i = 0; i < exclude.length; i++) {
if(host == exclude[i]) {
	return;
	}
}


// Block Flash using css

var addStyle = function() {
	var s = document.createElement('style');
	s.setAttribute('type', 'text/css');
	s.setAttribute('style', 'display: none !important;');
	s.appendChild(document.createTextNode(css));
	return (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
};


// Check if element is blocked

var isBlocked = function(ele) {
	return getComputedStyle(ele, null).display  == 'none';
};


// Block Flash by parsing properties (backup method) 

var checkforflash = function(elem){                    // checks the element passed to it for ele content
		if (elem.hasAttribute("flashvars") ) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.hasAttribute("type") && elem.getAttribute("type").match(/flash|shockwave|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.hasAttribute("src") && elem.getAttribute("src").match(/.swf|shockwave|flash|eyewonder|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		
		if (elem.innerHTML.match(/.swf|shockwave|flash|eyewonder|silverlight/)) {
				elem.style.display = 'none';
				return true;
		}
		return false;
};


// Make div to be put in place of Flash element

var add_play_flash_div = function(ele) {
		var embed = ele.getElementsByTagName('embed')[0];
		var placeholder = document.createElement("div");
		placeholder.setAttribute("class", "blockflash");
		placeholder.setAttribute('style', 'display:inline-block; overflow:hidden; z-index:999; border:1px dashed #dfdfdf; min-width:20px; min-height:20px; height:'+getComputedStyle(ele, null).height+'; width:'+getComputedStyle(ele, null).width+';background:url('+logo+')no-repeat center; cursor:pointer; -webkit-box-sizing:border-box;');
		placeholder.onmouseover = function() {
				placeholder.style.backgroundImage = 'url('+play+')';
		};
		placeholder.onmouseout = function() {
				placeholder.style.backgroundImage = 'url('+logo+')';
		};
		placeholder.onclick = function() {
				placeholder.parentNode.removeChild(placeholder);
				ele.style.display = 'inline-block';
				if(embed && isBlocked(embed)){
					embed.style.display = 'inline-block';
				}
		};
		ele.parentNode.insertBefore(placeholder, ele);
};


// Check for flash elements

var check = function() {
	var i, e, obj;
	obj = document.getElementsByTagName('object');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(isBlocked(e) || checkforflash(e)) {
				add_play_flash_div(e);
		}		
	}	
	obj = document.getElementsByTagName('embed');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(e.parentNode.nodeName != "OBJECT" && e.parentNode.style.display != "none") {
			if(isBlocked(e) || checkforflash(e)) {
					add_play_flash_div(e);
			}
		}
	}
	obj = document.getElementsByTagName('iframe');
	for(i = 0; i < obj.length; i++) {
		e = obj[i];
		if(e.getAttribute('type') == 'application/x-shockwave-flash' && isBlocked(e)) {
			add_play_flash_div(e);
		}
	}
};


// Excute main parts of script

setTimeout(function(){addStyle(css);}, 1);
window.addEventListener('load', check, false);


})();

// Based on the Flashblock and BlockFlash user scripts
//
// 1.0.3   - Fixed performance regressions
// 1.0.2.3 -  Minor changes
// 1.0.2.2 -  Minor changes
// 1.0.2.1 -  Optimizations
// 1.0.2   -  Optimizations, Removed partial Opera support
// 1.0.1   -  Fixed click to play functionaility and mouse-over effect
// 1.0     -  Initial Release