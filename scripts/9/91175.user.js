// ==UserScript==
// @name           hotkeybloghighlightcode-wordpress
// @namespace      http://hi.baidu.com/freezesoul
// @description    By FreezeSoul
// @include        http://qd.taobaoxyz.com/wp-admin/post.php?post=*&action=edit
// @include        http://qd.taobaoxyz.com/wp-admin/post-new.ph*
// ==/UserScript==


// ============================================
// name        hotkeybloghighlightcode-wordpress
// author      FreezeSoul
// blog        http://hi.baidu.com/freezesoul
// ============================================

//////////////////////////////////////////////////////
//////////////////////Common Class////////////////////
//////////////////////////////////////////////////////

var Highlight = function(){
var ssssss=document.getElementsByTagName("iframe")[0];
if (typeof(ssssss) =="undefined"){
  sssssss=setTimeout(Highlight,200);
  console.log("a"+ssssss+sssssss);
  return;
}
if (typeof(sssssss)=="number"){clearTimeout(ssssss);}
console.log("a"+ssssss.contentWindow+"b"+sssssss);
//bgcolor
Highlight.className = "pre";
/*Highlight.outerStyle + = "display: block;";
Highlight.outerStyle += "background-color: #F8F8F8;";
Highlight.outerStyle += "color: #000000;";
Highlight.outerStyle += "font-size: 12px;";
Highlight.outerStyle += "line-height: 15px;";
Highlight.outerStyle += "margin: 10px;";
Highlight.outerStyle += "padding:8px;";
Highlight.outerStyle += "border-left:5px #6CE26C solid;";
Highlight.outerStyle += "overflow: auto;";*/

//key word color
Highlight._comment = "color:#008200;";
Highlight._string = "color:blue;";
Highlight._preprocessor = "color:gray;";
Highlight._keywords = "color:#069;";
Highlight._important = "color:red;";
Highlight._value = "color:#FF00FF;";

//target iframe' window,default parameter is 'window'.
//for baidu'bloger :"document.getElementById("spBlogText___Frame").contentWindow.document.getElementsByTagName("iframe")[0].contentWindow"
//for sohu'bloger  :"document.getElementsByTagName("iframe")[0].contentWindow"
Highlight.target = document.getElementsByTagName("iframe")[0].contentWindow;

//hot key,ctrl+alt+?
Highlight.NoneKey = 48; //ctrl+alt+0
Highlight.JsKey = 49; //ctrl+alt+1
Highlight.CSharpKey = 50; //ctrl+alt+2
Highlight.CSSKey = 51; //ctrl+alt+3
Highlight.JavaKey = 52; //ctrl+alt+4
Highlight.PhpKey = 53; //ctrl+alt+5
Highlight.SqlKey = 54; //ctrl+alt+6
Highlight.VbKey = 55; //ctrl+alt+7


Highlight.addEvent = function(){
	if (document.addEventListener) {
		Highlight.target.document.addEventListener("keydown",Highlight.fireEvent,false); 
	}
	else if (document.attachEvent) {
		Highlight.target.document.attachEvent("onkeydown",Highlight.fireEvent); 
	} 
};


Highlight.highlighter = {};


Highlight.codeHtml = function(){
	var s,r;
	if (document.all) {
		s = Highlight.target.document.selection.createRange().htmlText;
		r = Highlight.target.document.selection.createRange();
		if (arguments.length == 0){
			r.pasteHTML("<pre class=" + Highlight.className + ">" + Highlight.highlighter.HighlightAll(s) + "</pre>");
		}else{
			r.pasteHTML("<pre class=" + Highlight.className + ">" + s + "</pre>");
		}
	} else {
		s = Highlight.target.document.getSelection();
		r = Highlight.target.getSelection().getRangeAt(0);
		var cs = r.cloneContents();
		r.deleteContents();
		var newP = Highlight.target.document.createElement("pre");
		newP.setAttribute("class", Highlight.className);
		newP.appendChild(cs);
		if (arguments.length == 0){
			newP.innerHTML = Highlight.highlighter.HighlightAll(newP.innerHTML);
		}else{
			newP.appendChild(cs);
		}
		r.insertNode(newP);
	}
};

Highlight.isCtrl = false;
Highlight.isAlt = false;

Highlight.fireEvent = function(e) {
	
	e = e || window.event;
	if ((e.keyCode || e.which) == 17) Highlight.isCtrl = true;
	if ((e.keyCode || e.which) == 18) Highlight.isAlt = true;
	if ((e.keyCode || e.which) == Highlight.JsKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.JScript();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.CSharpKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.CSharp();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.CSSKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.CSS();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.JavaKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.Java();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.PhpKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.Php();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.SqlKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.Sql();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.VbKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.highlighter = new Highlighter.Vb();
		Highlight.codeHtml();
		Highlight.clearEvent();
	}
	if ((e.keyCode || e.which) == Highlight.NoneKey && Highlight.isCtrl == true && Highlight.isAlt == true) {
		Highlight.codeHtml("Nochrome");
		Highlight.clearEvent();
	}
};

Highlight.clearEvent = function(){
	Highlight.isCtrl = false;
	Highlight.isAlt = false;
};

//////////////////////////////////////////////////////
//////////////////////Event Registration//////////////
//////////////////////////////////////////////////////

Highlight.addEvent();

};



//////////////////////////////////////////////////////
///////////////////Highlighter////////////////////////
/////reference to the part of SyntaxHighlighter///////
//////////////////////////////////////////////////////

Highlighter = function(){

Highlighter.FixForBlogger = function(str)
{
	return str.replace(/<br\s*\/?>|&lt;br\s*\/?&gt;/gi, '\n');
}

Highlighter.RegexLib = {
	MultiLineCComments : new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'),
	SingleLineCComments : new RegExp('//.*$', 'gm'),
	SingleLinePerlComments : new RegExp('#.*$', 'gm'),
	DoubleQuotedString : new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"','g'),
	SingleQuotedString : new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g')
};

Highlighter.GetKeywords = function(str) 
{
	return '\\b' + str.replace(/ /g, '\\b|\\b') + '\\b';
};

Highlighter.Match = function(value, index, css){
	this.value = value;
	this.index = index;
	this.length = value.length;
	this.css = css;
};

Highlighter.prototype.ProcessRegexList = function(){
	for(var i = 0; i < this.regexList.length; i++)
		this.GetMatches(this.regexList[i].regex, this.regexList[i].css);
};

Highlighter.prototype.GetMatches = function(regex, css){
	var index = 0;
	var match = null;

	while((match = regex.exec(this.code)) != null)
		this.matches[this.matches.length] = new Highlighter.Match(match[0], match.index, css);
};

// static callback for the match sorting
Highlighter.SortCallback = function(m1, m2){
	// sort matches by index first
	if(m1.index < m2.index)
		return -1;
	else if(m1.index > m2.index)
		return 1;
	else
	{
		// if index is the same, sort by length
		if(m1.length < m2.length)
			return -1;
		else if(m1.length > m2.length)
			return 1;
	}
	return 0;
};

// This function returns a portions of the string from pos1 to pos2 inclusive
Highlighter.Copy = function(string, pos1, pos2){
		return string.substr(pos1, pos2 - pos1);
};

Highlighter.prototype.IsInside = function(match){
	if(match == null || match.length == 0)
		return false;
	
	for(var i = 0; i < this.matches.length; i++)
	{
		var c = this.matches[i];
		
		if(c == null)
			continue;

		if((match.index > c.index) && (match.index < c.index + c.length))
			return true;
	}
	
	return false;
};

Highlighter.prototype.HighlightAll = function(code){

	var pos = 0;

	this.code = Highlighter.FixForBlogger(code);

	this.newCode = "";

	this.matches = new Array();

	this.ProcessRegexList();	

	// sort the matches
	this.matches = this.matches.sort(Highlighter.SortCallback);

	// The following loop checks to see if any of the matches are inside
	// of other matches. This process would get rid of highligted strings
	// inside comments, keywords inside strings and so on.
	for(var i = 0; i < this.matches.length; i++)
		if(this.IsInside(this.matches[i]))
			this.matches[i] = null;


	// Finally, go through the final list of matches and pull the all
	// together adding everything in between that isn't a match.
	for(var i = 0; i < this.matches.length; i++)
	{
		var match = this.matches[i];

		if(match == null || match.length == 0)
			continue;
		
		this.AddStyle(Highlighter.Copy(this.code, pos, match.index), null);
		this.AddStyle(match.value, match.css);	
		pos = match.index + match.length;

	}
	this.AddStyle(this.code.substr(pos), null);

	return this.newCode.replace(/\n/gi,'<br/>' );
};

Highlighter.prototype.AddStyle = function (str, css){

	if(css != null)
	{		
		this.newCode = this.newCode + "<span style='" + css + "'>" + str + "</span>"

	}
	else
	{
		this.newCode = this.newCode + str;
	}	

};
};

//////////////////////////////////////////////////////
/////////////////Highlight Brushes////////////////////
/////reference to the part of SyntaxHighlighter///////
//////////////////////////////////////////////////////

Highlighter.JScript = function()
{
	var keywords =	'abstract boolean break byte case catch char class const continue debugger ' +
					'default delete do double else enum export extends false final finally float ' +
					'for function goto if implements import in instanceof int interface long native ' +
					'new null package private protected public return short static super switch ' +
					'synchronized this throw throws transient true try typeof var void volatile while with';

	this.regexList = [
		{ regex: Highlighter.RegexLib.SingleLineCComments,				css: Highlight._comment },			// one line comments
		{ regex: Highlighter.RegexLib.MultiLineCComments,					css: Highlight._comment },			// multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// double quoted strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,					css: Highlight._string },			// single quoted strings
		{ regex: new RegExp('^\\s*#.*', 'gm'),							css: Highlight._preprocessor },		// preprocessor tags like #region and #endregion
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gm'),			css: Highlight._keywords }			// keywords
		];

};

Highlighter.JScript.prototype	= new Highlighter();

//////////////////////////////////////////////////////

Highlighter.CSharp = function()
{
	var keywords =	'abstract as base bool break byte case catch char checked class const ' +
					'continue decimal default delegate do double else enum event explicit ' +
					'extern false finally fixed float for foreach get goto if implicit in int ' +
					'interface internal is lock long namespace new null object operator out ' +
					'override params private protected public readonly ref return sbyte sealed set ' +
					'short sizeof stackalloc static string struct switch this throw true try ' +
					'typeof uint ulong unchecked unsafe ushort using virtual void while';

	this.regexList = [
		{ regex: Highlighter.RegexLib.SingleLineCComments,				css: Highlight._comment },			// one line comments
		{ regex: Highlighter.RegexLib.MultiLineCComments,					css: Highlight._comment },			// multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,					css: Highlight._string },			// strings
		{ regex: new RegExp('^\\s*#.*', 'gm'),						css: Highlight._preprocessor },		// preprocessor tags like #region and #endregion
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gm'),		css: Highlight._keywords }			// c# keyword
		];

}

Highlighter.CSharp.prototype = new Highlighter();

//////////////////////////////////////////////////////

Highlighter.CSS = function()
{
	var keywords =	'ascent azimuth background-attachment background-color background-image background-position ' +
					'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top ' +
					'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color ' +
					'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width ' +
					'border-bottom-width border-left-width border-width border cap-height caption-side centerline clear clip color ' +
					'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display ' +
					'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font ' +
					'height letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top ' +
					'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans ' +
					'outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page ' +
					'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position ' +
					'quotes richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress ' +
					'table-layout text-align text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em ' +
					'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';

	var values =	'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder '+
					'both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed '+
					'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double '+
					'embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia '+
					'gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic '+
					'justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha '+
					'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower '+
					'navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset '+
					'outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side '+
					'rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow '+
					'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize '+
					'table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal '+
					'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin '+
					'upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';
	
	var fonts =		'[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif';
	var keywordsjs =	'abstract boolean break byte case catch char class const continue debugger ' +
					'default delete do double else enum export extends false final finally float ' +
					'for function goto if implements import in instanceof int interface long native ' +
					'new null package private protected public return short static super switch ' +
					'synchronized this throw throws transient true try typeof var void volatile while with';

	this.regexList = [
		{ regex: Highlighter.RegexLib.SingleLineCComments,				css: Highlight._comment },			// one line comments
		{ regex: Highlighter.RegexLib.MultiLineCComments,					css: Highlight._comment },			// multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// double quoted strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,					css: Highlight._string },			// single quoted strings
		{ regex: new RegExp('^\\s*#.*', 'gm'),							css: Highlight._preprocessor },		// preprocessor tags like #region and #endregion
		{ regex: new RegExp(Highlighter.GetKeywords(keywordsjs), 'gm'),			css: Highlight._keywords },			// keywords
		{ regex: new RegExp('\\#[a-zA-Z0-9]{3,6}', 'g'),				css: Highlight._value },		// html colors
		{ regex: new RegExp('(-?\\d+)(\.\\d+)?(px|em|pt|\:|\%|)', 'g'),	css: Highlight._value },		// sizes
		{ regex: new RegExp('!important', 'g'),							css: Highlight._important },	// !important
		{ regex: new RegExp(Highlighter.GetKeywordsCSS(keywords), 'gm'),		css: Highlight._keywords },	// keywords
		{ regex: new RegExp(Highlighter.GetValuesCSS(values), 'g'),			css: Highlight._value },		// values
		{ regex: new RegExp(Highlighter.GetValuesCSS(fonts), 'g'),				css: Highlight._value }		// fonts
		];
					;
}

Highlighter.GetKeywordsCSS = function(str)
{
	return '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
}

Highlighter.GetValuesCSS = function(str)
{
	return '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b';
}

Highlighter.CSS.prototype = new Highlighter();

//////////////////////////////////////////////////////

Highlighter.Java = function()
{
	var keywords =	'abstract assert boolean break byte case catch char class const ' +
			'continue default do double else enum extends ' +
			'false final finally float for goto if implements import ' +
			'instanceof int interface long native new null ' +
			'package private protected public return ' +
			'short static strictfp super switch synchronized this throw throws true ' +
			'transient try void volatile while';

	this.regexList = [
		{ regex: Highlighter.RegexLib.SingleLineCComments,							css: Highlight._comment },		// one line comments
		{ regex: Highlighter.RegexLib.MultiLineCComments,								css: Highlight._comment },		// multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,								css: Highlight._string },		// strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,								css: Highlight._string },		// strings
		{ regex: new RegExp('\\b([\\d]+(\\.[\\d]+)?|0x[a-f0-9]+)\\b', 'gi'),	css: '' },		// numbers
		{ regex: new RegExp('(?!\\@interface\\b)\\@[\\$\\w]+\\b', 'g'),			css: '' },	// annotation @anno
		{ regex: new RegExp('\\@interface\\b', 'g'),							css: Highlight._keywords },		// @interface keyword
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gm'),					css: Highlight._keywords }		// java keyword
		];
	
}

Highlighter.Java.prototype	= new Highlighter();

//////////////////////////////////////////////////////

Highlighter.Php = function()
{
	var funcs	=	'abs acos acosh addcslashes addslashes ' +
					'array_change_key_case array_chunk array_combine array_count_values array_diff '+
					'array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill '+
					'array_filter array_flip array_intersect array_intersect_assoc array_intersect_key '+
					'array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map '+
					'array_merge array_merge_recursive array_multisort array_pad array_pop array_product '+
					'array_push array_rand array_reduce array_reverse array_search array_shift '+
					'array_slice array_splice array_sum array_udiff array_udiff_assoc '+
					'array_udiff_uassoc array_uintersect array_uintersect_assoc '+
					'array_uintersect_uassoc array_unique array_unshift array_values array_walk '+
					'array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert '+
					'basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress '+
					'bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir '+
					'checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists '+
					'closedir closelog copy cos cosh count count_chars date decbin dechex decoct '+
					'deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log '+
					'error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded '+
					'feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents '+
					'fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype '+
					'floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf '+
					'fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname '+
					'gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt '+
					'getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext '+
					'gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set '+
					'interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double '+
					'is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long '+
					'is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault '+
					'is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br '+
					'parse_ini_file parse_str parse_url passthru pathinfo readlink realpath rewind rewinddir rmdir '+
					'round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split '+
					'str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes '+
					'stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk '+
					'strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime '+
					'strtoupper strtr strval substr substr_compare';

	var keywords =	'and or xor __FILE__ __LINE__ array as break case ' +
					'cfunction class const continue declare default die do else ' +
					'elseif empty enddeclare endfor endforeach endif endswitch endwhile ' +
					'extends for foreach function include include_once global if ' +
					'new old_function return static switch use require require_once ' +
					'var while __FUNCTION__ __CLASS__ ' +
					'__METHOD__ abstract interface public implements extends private protected throw';

	this.regexList = [
		{ regex: Highlighter.RegexLib.SingleLineCComments,				css: Highlight._comment },			// one line comments
		{ regex: Highlighter.RegexLib.MultiLineCComments,					css: Highlight._comment },			// multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// double quoted strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,					css: Highlight._string },			// single quoted strings
		{ regex: new RegExp('\\$\\w+', 'g'),						css: '' },				// variables
		{ regex: new RegExp(Highlighter.GetKeywords(funcs), 'gmi'),		css: '' },				// functions
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gm'),		css: Highlight._keywords }			// keyword
		];
}

Highlighter.Php.prototype	= new Highlighter();

//////////////////////////////////////////////////////

Highlighter.Sql = function()
{
	var funcs	=	'abs avg case cast coalesce convert count current_timestamp ' +
					'current_user day isnull left lower month nullif replace right ' +
					'session_user space substring sum system_user upper user year';

	var keywords =	'absolute action add after alter as asc at authorization begin bigint ' +
					'binary bit by cascade char character check checkpoint close collate ' +
					'column commit committed connect connection constraint contains continue ' +
					'create cube current current_date current_time cursor database date ' +
					'deallocate dec decimal declare default delete desc distinct double drop ' +
					'dynamic else end end-exec escape except exec execute false fetch first ' +
					'float for force foreign forward free from full function global goto grant ' +
					'group grouping having hour ignore index inner insensitive insert instead ' +
					'int integer intersect into is isolation key last level load local max min ' +
					'minute modify move name national nchar next no numeric of off on only ' +
					'open option order out output partial password precision prepare primary ' +
					'prior privileges procedure public read real references relative repeatable ' +
					'restrict return returns revoke rollback rollup rows rule schema scroll ' +
					'second section select sequence serializable set size smallint static ' +
					'statistics table temp temporary then time timestamp to top transaction ' +
					'translation trigger true truncate uncommitted union unique update values ' +
					'varchar varying view when where with work';

	var operators =	'all and any between cross in join like not null or outer some';

	this.regexList = [
		{ regex: new RegExp('--(.*)$', 'gm'),						css: Highlight._comment },			// one line and multiline comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// double quoted strings
		{ regex: Highlighter.RegexLib.SingleQuotedString,					css: Highlight._string },			// single quoted strings
		{ regex: new RegExp(Highlighter.GetKeywords(funcs), 'gmi'),		css: '' },				// functions
		{ regex: new RegExp(Highlighter.GetKeywords(operators), 'gmi'),	css: '' },				// operators and such
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gmi'),		css: Highlight._keywords }			// keyword
		];
}

Highlighter.Sql.prototype	= new Highlighter();

//////////////////////////////////////////////////////

Highlighter.Vb = function()
{
	var keywords =	'AddHandler AddressOf AndAlso Alias And Ansi As Assembly Auto ' +
					'Boolean ByRef Byte ByVal Call Case Catch CBool CByte CChar CDate ' +
					'CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType ' +
					'Date Decimal Declare Default Delegate Dim DirectCast Do Double Each ' +
					'Else ElseIf End Enum Erase Error Event Exit False Finally For Friend ' +
					'Function Get GetType GoSub GoTo Handles If Implements Imports In ' +
					'Inherits Integer Interface Is Let Lib Like Long Loop Me Mod Module ' +
					'MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing ' +
					'NotInheritable NotOverridable Object On Option Optional Or OrElse ' +
					'Overloads Overridable Overrides ParamArray Preserve Private Property ' +
					'Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume ' +
					'Return Select Set Shadows Shared Short Single Static Step Stop String ' +
					'Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until ' +
					'Variant When While With WithEvents WriteOnly Xor';

	this.regexList = [
		{ regex: new RegExp('\'.*$', 'gm'),							css: Highlight._comment },			// one line comments
		{ regex: Highlighter.RegexLib.DoubleQuotedString,					css: Highlight._string },			// strings
		{ regex: new RegExp('^\\s*#.*', 'gm'),						css: Highlight._preprocessor },		// preprocessor tags like #region and #endregion
		{ regex: new RegExp(Highlighter.GetKeywords(keywords), 'gm'),		css: Highlight._keywords }			// c# keyword
		];
}

Highlighter.Vb.prototype	= new Highlighter();


//////////////////////////////////////////////////////
//////////////////////Dom Is Ready??????//////////////
//////////////////////////////////////////////////////

if (window.addEventListener) {
	window.addEventListener("load",Highlight,false); 
}
else if (window.attachEvent) {
	window.attachEvent("onload",Highlight); 
}
else {window.onload=Highlight}; 