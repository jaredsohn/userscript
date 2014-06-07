// ==UserScript==
// @name           MSDN's Code embellisher
// @namespace      Became from the abyss to save the world...
// @description    Wanna highlighted MSDN examples? Wanna readable code? Wanna expand/collapse code? So you wanna this script... :)
// @include        http://msdn.microsoft.com/*/library/*
// ==/UserScript==

//
//	Script version: 1.1 (30.12.2010)
//
//
// Discovered bugs:
//	- collapsing/expanding button does not changes image while mouse is over/out
// 	- doesn't work code which should highlight multi-line comment (two if'es, at
//		end of loop iterating on each line of code).
//	- doesn't work highlighing of multiple keywords in same line
//	- strange problem with addition of ';' char next to digits.
//
// CHANGELOG:
// 	- 1.1   (30.12.2010) - Script supports new MSDN Lightweight theme
// 				+ added line counting
// 				+ many minor corrections
//	- 1.0.1 (13.12.2009) - Fixed supporting MSDN view typed (support loband/classic/lightweight),
//				automatically recognizes view type (based on cookie 'viewkey')
//



// !!!#########################!!! 		Configurable 	!!!############################!!!

// -------------- 		C O L O R S 	------------------
// Colors table. Change colors as you wish, but remember - index of color is index of statement
// described by regular expression with same index. Possible Hex notation: 0xRRGGBB (ex. 0xFFFFFF - white).

//			 	preprocessor   |	comment  | 	string   | 	character |  digit
var g_ColorsTable 	= new Array( 	"darkorange", 	"green", 	"red", 	"darkred", 	"purple" );

var g_KeywordsColor	= "blue";				// Color for C/C++ keywords, such as "for", "do", "while", "if" etc.

// Enable/Disable line counter.
var g_bCountLines	= true;	


// !!!#########################!!! 		Configurable 	!!!############################!!!



var g_View 			= 0;		// 0 - classic, 1 - lightweight, 2 - loband
var g_iChildNode 		= '';
var g_sButtonFuncHTML 	= '';
var g_sButtonHTML		= '';

// Recognizing View mode that user selected
/**/	if( getCookie("viewkey") == "lightweight")	g_View = 1;		// View: Lightweight
else 	if( getCookie("viewkey") == "classic") 		g_View = 0;		// View: Classic
else 	if( getCookie("viewkey") == "loband") 		g_View = 2;		// View: Loband
else 									return true;	// Not recognized

// Choosing child node of expecting DIV object
if( g_View == 0 || g_View == 2)	g_iChildNode = 3;				// View is either classic or loband
else if(g_View == 1) 			g_iChildNode = 5;				// View is lightweight


// Body of main script's function. This function is called when user clicks on button/header.
g_sButtonFuncHTML +='\nfunction __g_MSDN_Code_Embellisher_func( param)'
			+ '\n{'
			+ '\n\t	var _div = param.parentNode.parentNode.childNodes['+g_iChildNode+'];'
			+ '\n\t	var _nddiv = param.parentNode.childNodes[2];'
			+ '\n\t	if(_div.style.display == "block")'
			+ '\n\t	{'
			+ '\n\t\t	_div.style.display = "none";'
			+ '\n\t\t	_nddiv.innerHTML = "Expand source code";'
			+ '\n\t	}else'
			+ '\n\t	{'
			+ '\n\t\t	_div.style.display = "block";'
			+ '\n\t\t	_nddiv.innerHTML = "Collapse source code";'
			+ '\n\t	}'
			+ '\n}\n'
		       	//+ '\nfunction __g_MSDN_Code_Embellisher_CodeSnippet_CopyCode(elemName)'
			//+ '\n{'
			//+ '\n\t	var obj=document.getElementById(elemName);'
			//+ '\n\t	window.clipboardData.setData("Text", revert_highlight_code(obj.innerText))'
			//+ '\n}'
			;


// Code of button and it's header
g_sButtonHTML 	+='<img style="border-width: 0px;" alt="Expand / Collapse source code" '
			+ 'src="http://i.msdn.microsoft.com/Global/Images/clear.gif" '
			+ 'onclick="__g_MSDN_Code_Embellisher_func( this);" '
			+ "class=\"MTPS_DropDownImage LibC_arrow-on\" onmouseout=\"this.classname='MTPS_DropDownImage LibC_arrow-off';\" "
			+ 'title="Expand / Collapse source code" onmouseover=\'this.classname="MTPS_DropDownImage LibC_arrow-on";\''
			+ 'id="ctl00_DropDownFilter_MTPS_DD_ImageArrow"/>'
			+ '\n<div style="font-size:11px;color:darkred;padding-left:20px" onclick="__g_MSDN_Code_Embellisher_func( this);">Expand '
			+ 'source code</div>';


// ###################################################################

var _script	= document.createElement("script");
_script.id 	= "MSDNs_code_emblisher_script";
_script.innerHTML = g_sButtonFuncHTML;


try
{	
	// embedding main function, in site source, of this GreaseMonkey script
	document.body.appendChild( _script);
}
catch(e){ return false; }


try
{
	if( g_View != 1)
	{
		var codes = document.getElementsByTagName( "code");
		var i = 0;

		while( i < codes.length)
		{
			// Changing font
			codes[i].style.fontSize="11px";
		
			if( codes.length > 1 || codes[i].innerHTML.length > 250)
			{
				// Collapsing every code block
				codes[i].parentNode.parentNode.style.display = "none";
				if(g_View == 1)
					codes[i].parentNode.style.display = "block";

				// Adding expand/collapse button
				codes[i].parentNode.parentNode.parentNode.childNodes[1].innerHTML
				       = g_sButtonHTML;
			}
			else codes[i].style.fontSize="12px";

			codes[i].innerHTML = highlight_code( codes[i].innerHTML).substring(1);

			i++;
		}

		// Searching for another code blocks.
		var blocks = document.getElementsByName("libCScode");
		for( i = 0; i < blocks.length ; i++)
		{
			if( blocks[i].classname.indexOf( "libCScode") != -1 && blocks[i].id.indexOf("_code") != -1)
			{
				// Changing font
				blocks[i].style.fontSize="11px";
				blocks[i].innerHTML = highlight_code( blocks[i].innerHTML).substring(1);
			}
		}
	}else
	{
		// Searching for another code blocks (new MSDN theme, ligthweight view mode)
		var blocks2 = document.getElementsByTagName("div");
		for( i = 0; i < blocks2.length; i++)
		{
			if( blocks2[i].id == "CodeSnippetContainerCode0" 
					|| blocks2[i].id == "CodeSnippetContainerCode1"
					|| blocks2[i].id == "CodeSnippetContainerCode2"	)
			{
				// Changing font
				blocks2[i].style.fontSize="13px";
				blocks2[i].firstChild.firstChild.innerHTML = 
					highlight_code( blocks2[i].firstChild.firstChild.innerHTML).substring(1);

				// Replacing javascript function that Copies block of code
				//blocks2[i].parentNode.firstChild.firstChild.firstChild.href = 
				//	"javascript:__g_MSDN_Code_Embellisher_CodeSnippet_CopyCode('"
				//		+ blocks2[i].id + "');"
			}
		}
	}


}
catch( e)
{ 
	return false; 
}


// ###################################################################
// This function highlights input text (RegEx/search/replace method) and returns highlighted modification

function highlight_code( code)
{
	// If you want to extract this function, remember to include global table of colors
	// named "g_ColorsTable" (it has to contain as much elements as much is regular expression),
	// and need to create global (or not) variable named "g_KeywordsColor" that contains color of keywords.


	var _code = '// '+document.title+' - MSDN code example\n';
_code += '// Source code from: '+location.href+'\n' + code;
	
	// Regular expressions of characteristic code statements
	var syntax = new Array();
	var iUseNewRegexps = 0;

	if( iUseNewRegexps == 1){
		syntax[0] = /^(\#.+)/;				// Preprocessor's instruction
		syntax[1] = /(\/\/.+)/;				// Single-line comment
		syntax[2] = /(\".+\")/;				// String
		syntax[3] = /(\'[\W\w\d\s\S].\')/;		// single character
		syntax[4] = /(\s\d{1,}\s)/;			// Digit
	}else
	{
		syntax[0] = /^(\#[\W\w\d\s\S]{1,})/;		// Preprocessor's instruction
		syntax[1] = /(\/\/[\W\w\d\s\S]{0,})/;		// Single-line comment
		syntax[2] = /(\"[\W\w\d\s\S]{0,}\")/;		// String
		syntax[3] = /(\'[\W\w\d\s\S].\')/;		// single character
		syntax[4] = /([^\w].\d{1,}[^\w].)/;		// Digit 
	}

	// Gathered from MSDN "C++ Keywords"
	var keywords = new Array (
		"__abstract", "abstract", "__alignof", "array", "__asm", "__assume", 
		"__based", "bool", "__box", "break", "case", "catch", "__cdecl", "char", 
		"class", "constconst_cast", "continue", "__declspec", "default", "__delegate", 
		"delegate", "delete", "deprecated", "dllexport", "dllimport", "do", 
		"double", "dynamic_cast", "else if", "else", "enum", "enumclass", "enumstruct", "event", 
		"__event", "__except", "explicit", "extern", "false", "__fastcall", "__finally", 
		"finally", "float", "for", "foreach", "__in", "__forceinline", "friend", 
		"friend_as", "__gc", "gcnew", "generic", "goto", "__hook", "__identifier", "if", 
		"__if_exists", "__if_not_exists", "initonly", "__inline", "inline", "int", "__int8", 
		"__int16", "__int32", "__int64", "__interface", "interface", "struct", "interior_ptr", 
		"__leave", "literal", "long", "__m64", "__m128", "__m128d", 
		"__m128i", "__multiple_inheritance", "mutable", "naked", "namespace", "new", 
		"new", "__nogc", "noinline", "__noop", "noreturn", "nothrow", "novtable", 
		"nullptr", "operator", "__pin", "private", "__property", "property", "property", 
		"protected", "public", "__raise", "refstruct", "refclassregister", "reinterpret_cast", 
		"return", "safecast", "__sealed", "sealed", "selectany", "short", "signed", 
		"__single_inheritance", "sizeof", "static_cast", "__stdcall", "__super", "switch", 
		"template", "this", "thread", "throw", "true", "try", "__try", 
		"__finally", "__try_cast", "typedef", "typeid", "__unaligned", "__unhook", "union", "unsigned", 
		"using", "uuid", "__uuidof", "struct", "class", "__value", "virtual", 
		"__virtual_inheritance", "void", "volatile", "__w64", "__wchar_t", "wchar_t", "while"
	);

	var keywordColor = g_KeywordsColor;
	var colorsTable = g_ColorsTable;
	var _tbl = _code.split( '\n');
	var bMultiLineComment = false;

	for( var i = 0; i < _tbl.length; i++)
	{
		// Searching for syntax patterns
		for( var m = 0; m < syntax.length; m++)
		{
			if( !syntax[m].test(_tbl[i]) ) continue;	

			_tbl[i] = _tbl[i].replace( syntax[m], 
							"<font color=\""+colorsTable[m]+"\">$1</font>");

			// Add italics for the single line comment
			if( m == 1 ) _tbl[i] = "<i>"+_tbl[i]+"</i>";
			break;
		}
	
		// Searching for keywords	
		for( var m = 0; m < keywords.length; m++){		
			if( syntax[1].test(_tbl[i]) || syntax[2].test(_tbl[i]) ) continue;
			pos = _tbl[i].search( keywords[m] );
			if( pos == -1) continue;
			
			if( pos != 0)
				if( /[a-zA-Z]{1}/.test(_tbl[i].charAt(pos-1)) 
					|| /[a-zA-Z]{1}/.test(_tbl[i].charAt(pos
							+ keywords[m].length+1)) ) continue;
			_tbl[i] = _tbl[i].replace( keywords[m], 
							'<font color="'+keywordColor
							+'"><b>'+keywords[m]+'</b></font>');
		}

		// Searching for opening sequence of multi-line comment
		if( _tbl[i].search( "/*") > -1 )
		{
			_tbl[i].replace( "/*", "<font color=\""+colorsTable[1]+"\"><i>/*");
			bMultiLineComment = true;
		}

		// Searching for ending sequence of multi-line comment
		if( bMultiLineComment == true ){
		//	if( _tbl[i].search( "*/") > -1 )
			{
				_tbl[i].replace( "*/", "*/</i></font>");
				bMultiLineComment = false;
			}
		}

		// Appending line number
		if( g_bCountLines == true)
		{
			var tmp = "<font color='grey'>"+(i+1)+":</font>&nbsp;&nbsp;";
			if( (i+1) < 10 ) tmp += '&nbsp;&nbsp;';
			else if( (i+1) >= 10 && (i+1) < 100)
				tmp += '&nbsp;';
			_tbl[i] = tmp + _tbl[i];
		}
	}
	
	_code = 0;

	for( var i = 0; i < _tbl.length; i++)
		_code += _tbl[i]+"<br>";

	return _code;
}


// ###################################################################
// GetCookie function from W3Schools (honestly, I was to lazy to write it on my own)

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}


// ####################################################################
// revert_highlight_code - function that skips code colorizing and
// returns plain text with code (for Copy to Clipboard function).

//revert_highlight_code( text)
//{
//	tbl = text.split('\n');
//	var _text = '';
//
//	var tags = new array( "<br>", "</font>", "<i>", "</i>", "<b>", "</b>" );
//
//	// Skiping HTML tags
//	for( var i = 0; i < tbl.length; i++)
//	{
//		for( var n = 0; n < tags.length; n++)
//		{
//			if( tbl[i].indexOf( tags[n]) != -1)
//				tbl[i].replace( tags[n], '');
//		}
//
//		if( tbl[i].test( "/(\<font\s.+\>)/") )
//			tbl[i].replace( "/(\<font\s.+\>)/", "");
//	}
//
//	// -----------
//	
//	for( var i = 0; i < tbl.length; i++)
//		_text += tbl[i]+"\n";
//
//	return _text;
//}
