// ==UserScript==
// @name           EskiEksi
// @description    Eski beta avcisi! Yeni antiğe giden kral yolu!
// @namespace      http://userscripts.org/users/burak
// @version        0.0.9
// @author         burakkurkcu
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://www.sourtimes.org/*
// @include        http://eksisozluk.com/*
// @include        http://www.eksisozluk.com/*
// ==/UserScript==

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

//
var s = window.top.location.toString();

if(s.search("--") > -1) {
    window.top.location = "http://antik.eksisozluk.com/show.asp?t="+s.substring(s.search(".com/")+5,s.search("--")).replace(/-/gi,"+")+"&ff=1";
}else if (s.search("entry") > -1) {
	if (s.search("\\?") > -1) {
	    window.top.location = "http://antik.eksisozluk.com/show.asp?id="+s.substring(s.search("entry/")+6,s.search("\\?"))+"&ff=1";
	}else {	
	    window.top.location = "http://antik.eksisozluk.com/show.asp?id="+s.substring(s.search("entry/")+6,s.length)+"&ff=1";
	}
}else{
	window.top.location = "http://antik.eksisozluk.com/";
}