// ==UserScript==
// @name          Upside-down text
// @namespace     http://www.tobez.org/download/greasemonkey/
// @description   Upon pressing F8, turns text on the page upside-down using unicode characters
// @include       *
// ==/UserScript==

/**
 ** $Id: rot180.user.js,v 1.1 2006/03/29 19:33:00 tobez Exp $
 **
 ** rot180.user.js $Revision: 1.1 $
 **
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <tobez@tobez.org> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Anton Berezin
 ** ----------------------------------------------------------------------------
 **
 ** When the user presses F8, the ASCII text on the page is
 ** replaced with unicode characters that look like the characters
 ** in the original text, but upside-down.
 **
 ** The idea and the conversion table stolen from Acme::Rot180
 ** Perl module and its precursor, uniud script, by JohnPC:
 ** http://www.xs4all.nl/~johnpc/uniud/
 **
 ** This is a greasemonkey script, intended for use with the Firefox extension
 ** Greasemonkey.
 ** More info about Greasemonkey: http://greasemonkey.mozdev.org/
 **
 ** More info about my Greasemonkey scripts:
 **    http://www.tobez.org/download/greasemonkey/
 **
 **/

(function()
{
	var rot180 = {"S":"S","/":"/","K":"%u029e","7":"%u005f%u0338","d":"p",",":"%u2018","Y":"%u2144","E":"%u018e","y":"%u028e","\"":"%u201e","g":"%u0253","e":"%u01dd","J":"%u017f%u0332","|":"|","^":"%u203f","q":"b","b":"q","D":"p","z":"z","w":"%u028d","$":"$","\\":"\\","~":"%u223c","-":"-","Q":"%u053e","M":"%u019c","C":"%u0186","[":"]","L":"%u2142","!":"%u00a1"," ":" ","{":"}","X":"X","P":"d","%":"%","#":"#","_":"%u203e","+":"+",")":"(","'":"%u0375","}":"{","a":"%u0250","T":"%u22a5","=":"=","N":"N","2":"%u10f7","j":"%u017f%u0323","Z":"Z","u":"n","1":"%u002c%u20d3","k":"%u029e","<":">","t":"%u0287","W":"M","v":"%u028c",">":"<","s":"s","B":"%u03f4","?":"%u00bf","H":"H","c":"%u0254","&":"%u214b","I":"I","G":"%u2141","(":")","`":"%u0020%u0316","U":"%u144e","F":"%u2132","r":"%u0279",":":":","x":"x","*":"*","V":"%u039b","h":"%u0265","0":"0",".":"%u02d9","@":"@","f":"%u025f",";":"%u22c5%u0315","i":"%u0131%u0323","6":"9","A":"%u13cc","n":"u","O":"O","3":"%u03b5","]":"[","m":"%u026f","9":"6","l":"%u01ae","8":"8","p":"d","4":"%u21c1%u20d3","R":"%u0222","o":"o","5":"%u1515"};

	function get_subst(t)
	{
		if (t.match(/^\s*$/)) return t;
		var r = "";
		for (var i = 0; i < t.length; i++) {
			if (rot180[t[i]]) {
				if (rot180[t[i]].match(/^%u/)) {
					r = r + unescape(rot180[t[i]]);
				} else {
					r = r + rot180[t[i]];
				}
			} else {
				r = r + t[i];
			}
		}
		return r;
	}

	function replace_things(e)
	{
		var t = e.data;
		var r = get_subst(t);
		if (r != t)
			e.data = r;
	}

	function text_walk(e)
	{
		var children = e.childNodes;
		for(var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.nodeType == 3) {  /* Node.TEXT_NODE */
				replace_things(child);
			} else {
				text_walk(child);
			}
		}
	}

	function do_the_deed()
	{
        var bodies = document.getElementsByTagName("body");
		if (bodies && bodies.length)
			text_walk(bodies[0]);
		["input","select","textarea"].forEach(function (type) {
			var els = document.getElementsByTagName(type);
			for (var i = 0; i < els.length; i++) {
				els[i].value = get_subst(els[i].value);
			}
		});
	}

	function key_handler(e)
	{
		if (e.keyCode == 119) {
			do_the_deed();
		}
	}

	function attach()
	{
		document.addEventListener("keydown", key_handler, false);
	}

	attach();
})();
