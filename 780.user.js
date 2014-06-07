// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Myspace formatting shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Myspace formatting shortcuts
// By Jonatron - sjhu52i02@sneakemail.com - http://www.myspace.com/negatron
// Heavily based on Tim Babych's "Ctrl+Enter Submits" 0.3
// version 0.005
// 2005-11-30
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Instructions: http://userscripts.org/scripts/show/780
// 
// Summary: Type special things like **bold text** or <3 hearts,
// press Ctrl+Enter, and they will be converted into HTML and submitted.
//
// This a very hackish hack of another person's script, and I really
// don't know what I'm doing.  This is my first ever use of regular
// expressions.  If you know how to fix a bug, let me know.
//
// This could very easily be modified for other sites that allow HTML 
// input in comments and such (livejournal, fark).  Only a few of the tags 
// are really exclusive to myspace, though some of the bug fixing things 
// should be removed first.
//
// I am not a coder; I am just fed up with myspace's crappy functionality.
//
// You should copy your submission to the clipboard before you push
// Ctrl+Enter, because it modifies the text right there, and if you
// try to come back and edit it again before submission, you are stuck 
// with the post-conversion text.  This should be coded around but I 
// have no idea how.
// 
// Future:
//
// All of these can be more robust.
//
// It should be able to parse links with and without the http://, and
// add it when necessary.
//
// It should be able to do bulleted and ordered lists, a la Wikipedia:
// * Item
// * Second item
//
// or
//
// # Item
// # second item
//
// It would be nice if we could get around myspace's forbidden
// characters, like # or \, but I don't know how.
//
// Need to fix the thing in which tables create huge chunks of empty space above them
// in other words, the newlines between > and < in HTML tags need to be removed before submit
//
// ==UserScript==
// @name          Myspace formatting shortcuts
// @namespace     http://mysite.verizon.net/negatron/
// @description   Adds wiki-like formatting for myspace (and other sites that accept HTML) and Ctrl+Enter submitting in any textarea input
// @include       http://*.myspace.com/*
// ==/UserScript==

function myspacefmt(text) {

	s = text

	// Turn special characters back into HTML entities so they don't get stripped
	// List is from the tables at http://www.htmlhelp.com/reference/html40/entities/
	s = s.replace(/\uA0/g, '&nbsp;');
	s = s.replace(/\uA1/g, '&iexcl;');
	s = s.replace(/\uA2/g, '&cent;');
	s = s.replace(/\uA3/g, '&pound;');
	s = s.replace(/\uA4/g, '&curren;');
	s = s.replace(/\uA5/g, '&yen;');
	s = s.replace(/\uA6/g, '&brvbar;');
	s = s.replace(/\uA7/g, '&sect;');
	s = s.replace(/\uA8/g, '&uml;');
	s = s.replace(/\uA9/g, '&copy;');
	s = s.replace(/\uAA/g, '&ordf;');
	s = s.replace(/\uAB/g, '&laquo;');
	s = s.replace(/\uAC/g, '&not;');
	s = s.replace(/\uAD/g, '&shy;');
	s = s.replace(/\uAE/g, '&reg;');
	s = s.replace(/\uAF/g, '&macr;');
	s = s.replace(/\uB0/g, '&deg;');
	s = s.replace(/\uB1/g, '&plusmn;');
	s = s.replace(/\uB2/g, '&sup2;');
	s = s.replace(/\uB3/g, '&sup3;');
	s = s.replace(/\uB4/g, '&acute;');
	s = s.replace(/\uB5/g, '&micro;');
	s = s.replace(/\uB6/g, '&para;');
	s = s.replace(/\uB7/g, '&middot;');
	s = s.replace(/\uB8/g, '&cedil;');
	s = s.replace(/\uB9/g, '&sup1;');
	s = s.replace(/\uBA/g, '&ordm;');
	s = s.replace(/\uBB/g, '&raquo;');
	s = s.replace(/\uBC/g, '&frac14;');
	s = s.replace(/\uBD/g, '&frac12;');
	s = s.replace(/\uBE/g, '&frac34;');
	s = s.replace(/\uBF/g, '&iquest;');
	s = s.replace(/\uC0/g, '&Agrave;');
	s = s.replace(/\uC1/g, '&Aacute;');
	s = s.replace(/\uC2/g, '&Acirc;');
	s = s.replace(/\uC3/g, '&Atilde;');
	s = s.replace(/\uC4/g, '&Auml;');
	s = s.replace(/\uC5/g, '&Aring;');
	s = s.replace(/\uC6/g, '&AElig;');
	s = s.replace(/\uC7/g, '&Ccedil;');
	s = s.replace(/\uC8/g, '&Egrave;');
	s = s.replace(/\uC9/g, '&Eacute;');
	s = s.replace(/\uCA/g, '&Ecirc;');
	s = s.replace(/\uCB/g, '&Euml;');
	s = s.replace(/\uCC/g, '&Igrave;');
	s = s.replace(/\uCD/g, '&Iacute;');
	s = s.replace(/\uCE/g, '&Icirc;');
	s = s.replace(/\uCF/g, '&Iuml;');
	s = s.replace(/\uD0/g, '&ETH;');
	s = s.replace(/\uD1/g, '&Ntilde;');
	s = s.replace(/\uD2/g, '&Ograve;');
	s = s.replace(/\uD3/g, '&Oacute;');
	s = s.replace(/\uD4/g, '&Ocirc;');
	s = s.replace(/\uD5/g, '&Otilde;');
	s = s.replace(/\uD6/g, '&Ouml;');
	s = s.replace(/\uD7/g, '&times;');
	s = s.replace(/\uD8/g, '&Oslash;');
	s = s.replace(/\uD9/g, '&Ugrave;');
	s = s.replace(/\uDA/g, '&Uacute;');
	s = s.replace(/\uDB/g, '&Ucirc;');
	s = s.replace(/\uDC/g, '&Uuml;');
	s = s.replace(/\uDD/g, '&Yacute;');
	s = s.replace(/\uDE/g, '&THORN;');
	s = s.replace(/\uDF/g, '&szlig;');
	s = s.replace(/\uE0/g, '&agrave;');
	s = s.replace(/\uE1/g, '&aacute;');
	s = s.replace(/\uE2/g, '&acirc;');
	s = s.replace(/\uE3/g, '&atilde;');
	s = s.replace(/\uE4/g, '&auml;');
	s = s.replace(/\uE5/g, '&aring;');
	s = s.replace(/\uE6/g, '&aelig;');
	s = s.replace(/\uE7/g, '&ccedil;');
	s = s.replace(/\uE8/g, '&egrave;');
	s = s.replace(/\uE9/g, '&eacute;');
	s = s.replace(/\uEA/g, '&ecirc;');
	s = s.replace(/\uEB/g, '&euml;');
	s = s.replace(/\uEC/g, '&igrave;');
	s = s.replace(/\uED/g, '&iacute;');
	s = s.replace(/\uEE/g, '&icirc;');
	s = s.replace(/\uEF/g, '&iuml;');
	s = s.replace(/\uF0/g, '&eth;');
	s = s.replace(/\uF1/g, '&ntilde;');
	s = s.replace(/\uF2/g, '&ograve;');
	s = s.replace(/\uF3/g, '&oacute;');
	s = s.replace(/\uF4/g, '&ocirc;');
	s = s.replace(/\uF5/g, '&otilde;');
	s = s.replace(/\uF6/g, '&ouml;');
	s = s.replace(/\uF7/g, '&divide;');
	s = s.replace(/\uF8/g, '&oslash;');
	s = s.replace(/\uF9/g, '&ugrave;');
	s = s.replace(/\uFA/g, '&uacute;');
	s = s.replace(/\uFB/g, '&ucirc;');
	s = s.replace(/\uFC/g, '&uuml;');
	s = s.replace(/\uFD/g, '&yacute;');
	s = s.replace(/\uFE/g, '&thorn;');
	s = s.replace(/\uFF/g, '&yuml;');
	s = s.replace(/\u192/g, '&fnof;');
	s = s.replace(/\u391/g, '&Alpha;');
	s = s.replace(/\u392/g, '&Beta;');
	s = s.replace(/\u393/g, '&Gamma;');
	s = s.replace(/\u394/g, '&Delta;');
	s = s.replace(/\u395/g, '&Epsilon;');
	s = s.replace(/\u396/g, '&Zeta;');
	s = s.replace(/\u397/g, '&Eta;');
	s = s.replace(/\u398/g, '&Theta;');
	s = s.replace(/\u399/g, '&Iota;');
	s = s.replace(/\u39A/g, '&Kappa;');
	s = s.replace(/\u39B/g, '&Lambda;');
	s = s.replace(/\u39C/g, '&Mu;');
	s = s.replace(/\u39D/g, '&Nu;');
	s = s.replace(/\u39E/g, '&Xi;');
	s = s.replace(/\u39F/g, '&Omicron;');
	s = s.replace(/\u3A0/g, '&Pi;');
	s = s.replace(/\u3A1/g, '&Rho;');
	s = s.replace(/\u3A3/g, '&Sigma;');
	s = s.replace(/\u3A4/g, '&Tau;');
	s = s.replace(/\u3A5/g, '&Upsilon;');
	s = s.replace(/\u3A6/g, '&Phi;');
	s = s.replace(/\u3A7/g, '&Chi;');
	s = s.replace(/\u3A8/g, '&Psi;');
	s = s.replace(/\u3A9/g, '&Omega;');
	s = s.replace(/\u3B1/g, '&alpha;');
	s = s.replace(/\u3B2/g, '&beta;');
	s = s.replace(/\u3B3/g, '&gamma;');
	s = s.replace(/\u3B4/g, '&delta;');
	s = s.replace(/\u3B5/g, '&epsilon;');
	s = s.replace(/\u3B6/g, '&zeta;');
	s = s.replace(/\u3B7/g, '&eta;');
	s = s.replace(/\u3B8/g, '&theta;');
	s = s.replace(/\u3B9/g, '&iota;');
	s = s.replace(/\u3BA/g, '&kappa;');
	s = s.replace(/\u3BB/g, '&lambda;');
	s = s.replace(/\u3BC/g, '&mu;');
	s = s.replace(/\u3BD/g, '&nu;');
	s = s.replace(/\u3BE/g, '&xi;');
	s = s.replace(/\u3BF/g, '&omicron;');
	s = s.replace(/\u3C0/g, '&pi;');
	s = s.replace(/\u3C1/g, '&rho;');
	s = s.replace(/\u3C2/g, '&sigmaf;');
	s = s.replace(/\u3C3/g, '&sigma;');
	s = s.replace(/\u3C4/g, '&tau;');
	s = s.replace(/\u3C5/g, '&upsilon;');
	s = s.replace(/\u3C6/g, '&phi;');
	s = s.replace(/\u3C7/g, '&chi;');
	s = s.replace(/\u3C8/g, '&psi;');
	s = s.replace(/\u3C9/g, '&omega;');
	s = s.replace(/\u3D1/g, '&thetasym;');
	s = s.replace(/\u3D2/g, '&upsih;');
	s = s.replace(/\u3D6/g, '&piv;');
	s = s.replace(/\u2022/g, '&bull;');
	s = s.replace(/\u2026/g, '&hellip;');
	s = s.replace(/\u2032/g, '&prime;');
	s = s.replace(/\u2033/g, '&Prime;');
	s = s.replace(/\u203E/g, '&oline;');
	s = s.replace(/\u2044/g, '&frasl;');
	s = s.replace(/\u2118/g, '&weierp;');
	s = s.replace(/\u2111/g, '&image;');
	s = s.replace(/\u211C/g, '&real;');
	s = s.replace(/\u2122/g, '&trade;');
	s = s.replace(/\u2135/g, '&alefsym;');
	s = s.replace(/\u2190/g, '&larr;');
	s = s.replace(/\u2191/g, '&uarr;');
	s = s.replace(/\u2192/g, '&rarr;');
	s = s.replace(/\u2193/g, '&darr;');
	s = s.replace(/\u2194/g, '&harr;');
	s = s.replace(/\u21B5/g, '&crarr;');
	s = s.replace(/\u21D0/g, '&lArr;');
	s = s.replace(/\u21D1/g, '&uArr;');
	s = s.replace(/\u21D2/g, '&rArr;');
	s = s.replace(/\u21D3/g, '&dArr;');
	s = s.replace(/\u21D4/g, '&hArr;');
	s = s.replace(/\u2200/g, '&forall;');
	s = s.replace(/\u2202/g, '&part;');
	s = s.replace(/\u2203/g, '&exist;');
	s = s.replace(/\u2205/g, '&empty;');
	s = s.replace(/\u2207/g, '&nabla;');
	s = s.replace(/\u2208/g, '&isin;');
	s = s.replace(/\u2209/g, '&notin;');
	s = s.replace(/\u220B/g, '&ni;');
	s = s.replace(/\u220F/g, '&prod;');
	s = s.replace(/\u2211/g, '&sum;');
	s = s.replace(/\u2212/g, '&minus;');
	s = s.replace(/\u2217/g, '&lowast;');
	s = s.replace(/\u221A/g, '&radic;');
	s = s.replace(/\u221D/g, '&prop;');
	s = s.replace(/\u221E/g, '&infin;');
	s = s.replace(/\u2220/g, '&ang;');
	s = s.replace(/\u2227/g, '&and;');
	s = s.replace(/\u2228/g, '&or;');
	s = s.replace(/\u2229/g, '&cap;');
	s = s.replace(/\u222A/g, '&cup;');
	s = s.replace(/\u222B/g, '&int;');
	s = s.replace(/\u2234/g, '&there4;');
	s = s.replace(/\u223C/g, '&sim;');
	s = s.replace(/\u2245/g, '&cong;');
	s = s.replace(/\u2248/g, '&asymp;');
	s = s.replace(/\u2260/g, '&ne;');
	s = s.replace(/\u2261/g, '&equiv;');
	s = s.replace(/\u2264/g, '&le;');
	s = s.replace(/\u2265/g, '&ge;');
	s = s.replace(/\u2282/g, '&sub;');
	s = s.replace(/\u2283/g, '&sup;');
	s = s.replace(/\u2284/g, '&nsub;');
	s = s.replace(/\u2286/g, '&sube;');
	s = s.replace(/\u2287/g, '&supe;');
	s = s.replace(/\u2295/g, '&oplus;');
	s = s.replace(/\u2297/g, '&otimes;');
	s = s.replace(/\u22A5/g, '&perp;');
	s = s.replace(/\u22C5/g, '&sdot;');
	s = s.replace(/\u2308/g, '&lceil;');
	s = s.replace(/\u2309/g, '&rceil;');
	s = s.replace(/\u230A/g, '&lfloor;');
	s = s.replace(/\u230B/g, '&rfloor;');
	s = s.replace(/\u2329/g, '&lang;');
	s = s.replace(/\u232A/g, '&rang;');
	s = s.replace(/\u25CA/g, '&loz;');
	s = s.replace(/\u2660/g, '&spades;');
	s = s.replace(/\u2663/g, '&clubs;');
	s = s.replace(/\u2665/g, '&hearts;');
	s = s.replace(/\u2666/g, '&diams;');
	s = s.replace(/\u152/g, '&OElig;');
	s = s.replace(/\u153/g, '&oelig;');
	s = s.replace(/\u160/g, '&Scaron;');
	s = s.replace(/\u161/g, '&scaron;');
	s = s.replace(/\u178/g, '&Yuml;');
	s = s.replace(/\u2C6/g, '&circ;');
	s = s.replace(/\u2DC/g, '&tilde;');
	s = s.replace(/\u2002/g, '&ensp;');
	s = s.replace(/\u2003/g, '&emsp;');
	s = s.replace(/\u2009/g, '&thinsp;');
	// Blanking these four because they screw things up:
	s = s.replace(/\u200C/g, ' ');
	s = s.replace(/\u200D/g, ' ');
	s = s.replace(/\u200E/g, ' ');
	s = s.replace(/\u200F/g, ' ');
	s = s.replace(/\u2020/g, '&dagger;');
	s = s.replace(/\u2021/g, '&Dagger;');
	s = s.replace(/\u2030/g, '&permil;');
	s = s.replace(/\u2039/g, '&lsaquo;');
	s = s.replace(/\u203A/g, '&rsaquo;');
	s = s.replace(/\u20AC/g, '&euro;');
	

	replacements = [

//	[//g, ''], 

	// Cyrillic quotes
//	[/(\s+|^)"([^"]+?)"(\s+|$|\.|\,)/g, '$1\u00ab$2\u00bb$3'],

	// Latin quotes: "test" become smart quotes
	[/(\s+|^)"([^\"]+?)"(\s+|$|\.|\,)/g,  '$1&ldquo;$2&rdquo;$3'],
	[/(\s+|^)'([^\']+?)'(\s+|$|\.|\,)/g,  '$1&lsquo;$2&rsquo;$3'],

	// Trademark: (TM)
	[/\((tm|TM|\u0422\u041C|\u0442\u043C)\)/g, '&trade;'],

	// Copyright: (C)
	[/\([cC\u0421\u0441]\)/g, '&copy;'],

	// Registered: (R)
	[/\([rR\u0420\u0440]\)/g, '&reg;'],
	
	// Hearts, of course! <3
	[/(\s)(<3)(\s)/g, '$1\&hearts;$3'],
	
	// Section symbol, by request: {SS}
	[/\{SS\}/g, '&sect;'], 

	// Arrows ==>  <--  <==>  and so on
	[/([^<])-{2}>/g, '$1&rarr;'],
	[/<-{2}([^>])/g, '&larr;$1'],
	[/<-{1,2}>/g, '&harr;'],
	[/([^<])={2}>/g, '$1&rArr;'],
	[/<={2}([^>])/g, '&lArr;$1'],
	[/<={1,2}>/g, '&hArr;'],

	// Horizontal rules: ---- becomes <hr>
	[/\n----+\n/g, '<hr>'], 
	
	// Degree sign: degC becomes &deg;C  (K does not have a degree sign!)
	[/degC(\s)/g, '&deg;C$1'], 
	[/degF(\s)/g, '&deg;F$1'], 	
	
	// TeX subs and supers:  x squared: x^{2}  carbon dioxide: CO_{2}
	[/\^\{(.*?)\}/g, '<sup>$1</sup>'], 
	[/_\{(.*?)\}/g, '<sub>$1</sub>'], 
		
	// Scientific notation: 3.5E2 becomes 3.5&times;10<sup>2</sup>
	[/(\d)E(\d+)/g, '$1&times;10<sup>$2</sup>'], 
	
	// Plus or minus sign +-5 becomes &plusmn;5
	[/\+-(\d)/g, '&plusmn;$1'], 

	// Censorship is evil.
//	[/A(IM\s*)\:/gi, '&Acirc;$1:'],

	// These screw up your posts if you've got 'em (Myspace sucks).  It converts to something similar looking.  :-\  Best I can do...
//	[/\#/gi, '&Dagger;&Dagger;'],
	[/\\/gi, '&lfloor;'],

	// Em dash -- two minuses surrounded by spaces
	[/(\s+|^)--(\s+)/g, '$1\u2014$2'],

	// **bold**	
	[/\*{2}(.+?)\*{2}/g, '<b>$1</b>'],

	// '''Wikipedia strong emphasis''' (rendered as bold usually)
	[/\'{3}(.+?)\'{3}/g, '<strong>$1</strong>'],

	// //italic//
	[/([^\:]|^)\/{2}(.+?)\/{2}/g, '$1<i>$2</i>'],

	// ''Wikipedia emphasis'' (rendered as italics usually)
	[/\'{2}(.+?)\'{2}/g, '<em>$1</em>'],

	// --strikethrough--
	[/-{2}(.+?)-{2}/g, '<s>$1</s>'],

	// __underlined__
	[/_{2}(.+?)_{2}/g, '<u>$1</u>'],
	
	// A few colors?  [blue]text[/color] becomes <font color="0000BB">text</font> (will also accept [bl]text[/bl] or whatever)
	[/\[(bk|k|black)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,			'<font color="black">$2</font>'],
	[/\[(n|navy)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="navy">$2</font>'],	
	[/\[(gn|green)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="green">$2</font>'],
	[/\[(tl|teal)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="teal">$2</font>'],   // [t] would conflict with quote tags
	[/\[(s|silver)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="silver">$2</font>'],	
	[/\[(bl|be|bu|blue)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,			'<font color="blue">$2</font>'],	
	[/\[(l|lime)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="lime">$2</font>'],	
	[/\[(a|aq|aqua|c|cy|cyan)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,	'<font color="aqua">$2</font>'],	
	[/\[(m|maroon)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="maroon">$2</font>'],
	[/\[(p|purple|v|violet)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,		'<font color="purple">$2</font>'],	
	[/\[(o|olive)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,				'<font color="olive">$2</font>'],
	[/\[(gy|gray|grey)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,			'<font color="gray">$2</font>'],
	[/\[(r|red)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,					'<font color="red">$2</font>'],	
	[/\[(f|fuschia|magenta)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,		'<font color="fuschia">$2</font>'],	
	[/\[(y|yw|yellow)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,			'<font color="yellow">$2</font>'],	
	[/\[(w|wh|white)\]([\s\S]*?)\[\/(\1|c|color)?\]/gim,			'<font color="white">$2</font>'],	
	
	// En dash for number ranges: 1995-2005
	[/(\d+)-(\d+)/g, '$1\u2013$2'],

	// Ellipsis
//	[/\.\.\./g, '\u2026'],

	// [quote] tags [/quote] (or [q] or [Q] or [t] or whatever)
	// First replace the SomeoneWrote: bit with legend tags
	[/\[(quote|q|t)\](\s*\n?)([^\n]*)Wrote:(\s*\n)([\s\S]*?)\[\/(quote|q|t)\]/gim, '[$1]<legend>$3 wrote:</legend>$5[/$6]'],
	// Then replace the rest with fieldset tags 
	[/\[(quote|q|t)\]([\s\S]*?)\[\/(quote|q|t)\]/gim, '<fieldset style="border: 1px solid; border-color: aaaaaa; padding: 1em; margin: 1em 2em;">$2</fieldset>'],
	// (This way it can handle nested quotes and optional "Wrote:" sections.)

	// Old version of quotes based directly on Myspace's quote markup:	
//	[/\[(quote|q|t)\]([\s\S]*?)\[\/(quote|q|t)\]/gim, '<table align="center" bgcolor="cccccc" border="0" cellpadding="1" cellspacing="0" width="90%"><tbody><tr><td><table bgcolor="ffffff" border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr><td><p>$2</p></td></tr></tbody></table></td></tr></tbody></table>'],

	// Image shortcut IMG=http://www.url.com/image.png surrounded by whitespace.
	[/(\s)IMG=(\S*?)([\s\]])/gi, '$1<img src="$2">$3'],
	
	// Named URLs in wikipedia format [http://address linked text]
	[/\[http:([^ \t\v\f\n\r\]]*?)\s+(\S.*?)\]/gi, '<a href="http:$1">$2</a>'],
	
	// Myspace URLs [my:Firefox] or [myspace:Firefox] becomes http://www.myspace.com/Firefox
	[/\[(my|myspace):(\S.*?)\]/gi, '<a href="http://www.myspace.com/$2">Myspace: $2</a>'],
	
	// Myspace group URLs [gr:toolbar] or [group:toolbar] becomes http://groups.myspace.com/toolbar
	[/\[(gr|group):(\S.*?)\]/gi, '<a href="http://groups.myspace.com/$2">Myspace group: $2</a>'],

	// Auto-link naked URLs
	[/(\s)http(s)*:(\S*?)(\s)/gi, '$1<a href="http$2:$3">http$2:$3</a>$4'],
	
	// Links to wikipedia articles [[linked text]] (useful in fights)
	[/\[\[([\s\S]+?)\]\]/gi, '<a href="http://en.wikipedia.org/wiki/$1">$1</a>']

	];

	// Runs through itself over and over until nothing changes, to handle nested quote tags and the like.  
	// Uses "for" instead of "while" to prevent infinite loops from poorly written regexps. ;-)
	for( j=0; j<=100; j++) {
		olds = s;
		for( i=0; i < replacements.length; i++) {
			s = s.replace(replacements[i][0], replacements[i][1]);
		}
		if(olds == s) {break};
	}
	
	return s
}

function trigger_submit_on_ctrl_enter(e) {
	if ((e.keyCode==13) && (e.ctrlKey)) {
		p = this.parentNode
		i = 0
		if (this.nodeName == 'TEXTAREA')
			this.value = myspacefmt(this.value)
			
		while (p.nodeName != 'FORM' && i++ < 100) 
			p = p.parentNode

		if (p.nodeName == 'FORM') 
			p.submit()
	}
}

allInps = document.evaluate("//textarea | //select | //unput", document, null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allInps.snapshotLength; i++) {
	t = allInps.snapshotItem(i);
	t.addEventListener("keydown", trigger_submit_on_ctrl_enter, 0);
}