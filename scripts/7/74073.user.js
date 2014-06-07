// ==UserScript==
// @name		UD Map Links (DSS)
// @description		Creates links next to the suburb's name to wiki's and DSS's maps.
// @namespace		http://aichon.com
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Map Links (DSS Version)
 * v1.3d
 * 
 * Adapted from work of below authors; all credit to them.
 * Copyright (C) 2010 Bradley Sattem -- bradkun@gmail.com
 * Copyright (C) 2008 Ville Jokela -- midianian@mbnet.fi
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.3d:
 *     * Replaced CDF map with DSSRZS map (http://dssrzs.org/map/).
 *
 *   1.3:
 *     * Modified to use CDF's map instead of RedRum's (credit to Lucy Daniels for the fix)
 *     * GM4IE, Opera and Greasemetal compatible
 *
 *   1.2:
 *     * Some two-part suburb names had the latter part in lowercase, which caused problems
 *
 *   1.1:
 *     * Standardized and cleaned up the code. Works now on FF 3.0.
 */

function str_replace(search, replace, subject, count) {  
     // [url]http://kevin.vanzonneveld.net[/url]  
     var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,  
             f = [].concat(search),  
             r = [].concat(replace),  
             s = subject,  
             ra = r instanceof Array, sa = s instanceof Array;  
     s = [].concat(s);  
     if (count) {  
         this.window[count] = 0;  
     }  
    
     for (i=0, sl=s.length; i < sl; i++) {  
         if (s[i] === '') {  
             continue;  
         }  
         for (j=0, fl=f.length; j < fl; j++) {  
             temp = s[i]+'';  
             repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];  
             s[i] = (temp).split(f[j]).join(repl);  
             if (count && s[i] !== temp) {  
                 this.window[count] += (temp.length-s[i].length)/f[j].length;}  
         }  
     }  
     return sa ? s : s[0];  
 }  
 
function insertMaps() {
	tdList = document.evaluate('//td[@class="sb"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	subName = tdList.snapshotItem(0);
	bracketPos = subName.textContent.indexOf("[");
	if(bracketPos > 0)
		suburb = str_replace(" ", "_", subName.textContent.substr(0,bracketPos-1));
	else
		suburb = str_replace(" ", "_", subName.textContent);
	subName.textContent += ' ';
	
	mapLinks = document.createElement('small');
	mapLinks.textContent += '(';

	maps = document.createElement('span');
	maps.textContent = '';

	wikiMapLink = document.createElement('a');
	wikiMapLink.textContent = 'wiki';
	wikiMapLink.href = 'http://wiki.urbandead.com/index.php/' + suburb + '#Suburb_Map';
	wikiMapLink.style.color = '#faa';
	wikiMapLink.target = 'blank';

	rrMapLink = document.createElement('a');
	rrMapLink.textContent = 'DSS';
	rrMapLink.href = 'http://dssrzs.org/map/' + suburb
	rrMapLink.style.color = '#faa';
	rrMapLink.target = 'blank';

	mapLinks.appendChild(maps);
	mapLinks.appendChild(wikiMapLink);
	if (rrMapLink != null) {
		mapLinks.appendChild(document.createTextNode(', '));
		mapLinks.appendChild(rrMapLink);
	}
	mapLinks.appendChild(document.createTextNode(')'));
	subName.appendChild(mapLinks);
}

insertMaps();
