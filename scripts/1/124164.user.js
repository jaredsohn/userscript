// ==UserScript==
// @name           Fetlife fixed header
// @namespace      http://localhost
// @description    Fixes the top navigation bar in place at the top of the screen
// @include        https://fetlife.com/*

// ==/UserScript==
//
// Author: Sam aka pixie_unbound

// Version 1.4

// This work by pixie_unbound is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// http://creativecommons.org/licenses/by-nc-sa/3.0

//Add chrome support
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

var lockname;
var lockico = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACHSURBVHjaNIs9DgFRGADn230/IrbRbIHQbaNdbqCSuIHEQUWpUSpEOIADWNn37H6KF5NMNyMHFCRp8PwJJt5UVLq2x1WmOQNky/H3OjcCkNebVzm1BoBhfTkttn2WXnv/PFqXssmo8kXhU7YudxA1U4Bo38fnIDcKIC6E6FT2jdKvZl0Uy28A3KQqMHqLXxQAAAAASUVORK5CYII=';
var newSS, styles='#navigation_bar, #header_v2 {background-color:rgba(0,0,0,0.8); position:fixed; width:100%; top:0px; z-index:99} body {padding-top:63px}';
if(typeof GM_getValue("navfix") == "undefined"){GM_setValue('navfix', "1")};
if ( GM_getValue('navfix') == "1"){lockname = "Unlock Navbar"} else {lockname = "Lock Navbar"};

function switchnav() {
navitems[1].parentNode.style.display = 'none';
cswitch = document.getElementById('nav_dropdown').getElementsByTagName('a');
cswitch[0].removeAttribute('class');
cswitch[0].setAttribute('class','small rcts pulldown-trigger');
					if ( GM_getValue('navfix') == "1"){
						if (document.createStyleSheet) { document.createStyleSheet("javascript:'"+styles+"'"); } else { newSS=document.createElement('link'); 	newSS.rel='stylesheet'; newSS.href='data:text/css,'+escape(styles); document.getElementsByTagName("head")[0].appendChild(newSS); } 
						document.getElementById('navbut').innerHTML = "<img style=\"margin:0; padding:0\" src=\""+lockico+"\" />&ensp;&nbsp;Unlock Navbar</a>";
						window.scrollBy(0,-30); // Comment out if you don't want the page to jump up slightly.
						}
					 else { document.getElementsByTagName("head")[0].removeChild(newSS);
					 document.getElementById('navbut').innerHTML = "<img style=\"margin:0; padding:0\" src=\""+lockico+"\" />&ensp;&nbsp;Lock Navbar</a>";
					}
					
		};

// Add toggle switch to menu
var locknav = document.createElement('li');
locknav.setAttribute('id','navswitch');

locknav.innerHTML = "<a id=\"navbut\" href=\"javascript:void(0)\"><img style=\"margin:0; padding:0\" src=\""+lockico+"\" />&ensp;&nbsp;"+lockname+"</a>";
var navitems = document.getElementById('nav_dropdown').getElementsByTagName('li');
navitems[1].parentNode.insertBefore(locknav,navitems[9]);
/////////////////////

	document.getElementById('navbut').addEventListener('click', function(){if ( GM_getValue('navfix') == "1"){GM_setValue('navfix', "0")} else {GM_setValue('navfix', "1")}; switchnav()}, true);



switchnav();
