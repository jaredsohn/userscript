// ==UserScript==
// @name           texxas
// @description    duh
// @include        http*://*.texxas.de/*
// @include        http*://texxas.de/*
// @include        http*://*.tvtv.de/*
// @include        http*://tvtv.de/*
// ==/UserScript==

function addlinktoimdb () {

  if( location.hostname.indexOf('tvtv') != -1 ) {
    if ( location.href.indexOf('programdetails') != -1 ) {
			mytitle = document.getElementsByClassName("fb-b15")[0].innerHTML;
		}

	}

  if( location.hostname.indexOf('texxas') != -1 ) {
    if ( location.href.indexOf('sendung') != -1 ) {
			mytitle = document.getElementsByTagName('h5')[0].innerHTML;
			}
	}

mytitle=strip(mytitle);

linktobeaddedtoimdb = '<a href="http://www.imdb.com/find?q='+ mytitle.replace(" ","%20").replace('"','').replace("'","") + '" target="somenewwindow"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAQCAYAAACYwhZnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH3QEMEy8Hh9qDvgAABOhJREFUSMdtlV2IXVcVx39rnX3POffO3Du5dzKTzLRpgk1tqmkJLfgBglaiqC00FoqCWPoQ9MVnRSgtiA2hVRAURVCo7aMERaWIVDEQgsYWE+l3M60lNpm0yWQ+cj/OOXvv5cO5uZlpuuCwzzp7nbX+67/W2lu+fv/HvnHv3eXTrRxn4kwTB5qIqENUEUkQVdB6FU0QSQxVREQAQAAzMwMLYjFw/YlYqLDosRCwGIwYxCxgEc6cdc/ILx/bW37zS6PGsEpNk1y00TRxuajLkaSBagNxDklcDSBpIJqYaAKigigYAIYFLHqxUGKhIoYSfEnwI6IviH6I+cKiL8WCt0Q8595LxE3l1hiM1IqYidgUrdYcnflFSKfpXxmRd7uQNsA5qtUh2nBotwMoRPDrfVxvpmYjejBPWLnMxvo63ZkcUqC/xvvL5zEvxMqIVcSCiYVos52Ii4aJqEiS0Z7pceatFke+e5KqqvjJ0a/xi6dOcH55lcGg5PFHH6S/MeJHP/0drWbGwkKXbx3+Aj84/Cwiglmk25vmoQcO8MX7D/DkD5/jr8dfY/++OY5+7y7WV94BM4iRCJhF8cHjAEEVIaU51WV5JfDc868AsNJvcOyPp7lwcRWAT356P6IJf37+JQBmt2/j0Fc/x7E/vMBm+dXTx/nXiaP8++VL/OXvr7P0zio/PvIA2cgzjIpEEPpIDBADiggiimgDtEkjzSfOkgTa09f1l185x+Urg4neaee4RCf6z3/2HW65eRaAf75wlm0zTQC63Ra4ed6+1GG6uweXzaBJExEHIri6uQVUkaRRN/pEZIt++j9vUxTllqwRRaRmeffuedrtOnBZBaLVHXt26SLTO79NfzDingO3cuK3B1l7v0C0j6CM09AayGS9FqD2niTKTYs9lt66yMl/vM5texfG21vty8ITol3fG8vi4iyHH7kXgBdPL7E+yGsm1IGACoIICLIVwCZxTrnj9kXMjMsrV/nUJz5aQ1eBTcGk9rKVSWDHjg4HP//xyVeTDNFs/K+gN4aUG95DMD6ye540rat3296d42w/EFbkA3nUrHgfGQzLTWbJGIBeq8M1+zie8/AhTgKLiz06nbreC4tzm8/JiXW73cL7eEMSqkI2TgDALNRxrLZ1hmFmGBGzkhiqTcZQVTWo+Z3baTRSsjQhy6cnzWcxcA3H9x/9NW+cvQBAq5URx/1x4cIqfzv+6vWpk/o0NQuAjZmwCLEkVhskGkDqsVSJdDrTQMKe3T127uhyx75b6M6kAMzMtEgSyLOUVivn1Kk3yLKMu+7cw6Gv7B8TqVSl59jvTwHw5YN30s43sDAA85gZ8uyRvXbfZ8yK2BaXb6OwOXtvLReSjF03d7l0paL0kV03bePSaoGqo9dr2v+Wr5LnDZmbbfPu8lVADDPEvOxaaNNuBpb+u8rGRslcbwqzyGtvnufufblRvCvVcIVQrGJ+iPzmiVvt0GeDXS1baNKUtNm21nRHtDHFqDSyZhPnHEUVSPMMUUflg+WtJkSkLANpMwfDsIhFL+VwSDEakaVCokpVBix6Uq3YWL9i5WBNoh9gfmDRl+LOvOmeuef28PD2XkWMSlXAui9Rt4YkDl+Nb091VIXWt6kofqST8SyHUjexRSxGYvQQPMMijPWABU8/lJgviX4EscCilz+dTM/9H7MKUUg1LPPsAAAAAElFTkSuQmCC" /></a><br />' + mytitle;

  if( location.hostname.indexOf('tvtv') != -1 ) {
    if ( location.href.indexOf('programdetails') != -1 ) {
			document.getElementsByClassName("fb-b15")[0].innerHTML = linktobeaddedtoimdb;
		}

	}

  if( location.hostname.indexOf('texxas') != -1 ) {
    if ( location.href.indexOf('sendung') != -1 ) {
			document.getElementsByTagName('h5')[0].innerHTML = linktobeaddedtoimdb;
			}
	}

}

function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

window.addEventListener('DOMContentLoaded', addlinktoimdb, false);