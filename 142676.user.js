// ==UserScript==
// @name        Gooder Helper
// @namespace   saadin
// @description This script helps you in gooder, to put links and tags in comments.
// @include     *gooder.us*
// @include     *174.142.15.1*
// @version     2.1
// @grant GM_registerMenuCommand
// ==/UserScript==
GM_registerMenuCommand("Link",link,"l");
GM_registerMenuCommand("User",user,"u");
GM_registerMenuCommand("Post",post,"p");
GM_registerMenuCommand("Tag",tag,"t");
GM_registerMenuCommand("IMG",img,"i");
GM_registerMenuCommand("HTML Code",htmlcode,"h");
GM_registerMenuCommand("Replace Spaces",replacespaces,"r");




//-----------------------link----------------------//
function link()
{
	var txtarea = document.activeElement;
	//if(txtarea.className!=="comment")throw 'not in comments';
	var text;
	var lnk = "";
	var ttl = "";
	if(txtarea.selectionStart ===txtarea.selectionEnd)
	{
		lnk = prompt("Link Address:","");
		ttl = prompt("Link Title:","");
	}
	else
	{
		temp = (txtarea.value).substring(txtarea.selectionStart ,txtarea.selectionEnd).trim();
		if(isLink(temp))
		{
			lnk = temp;
			ttl = prompt("Link Title:","");
		}
		else
		{
			ttl=temp;
			lnk = prompt("Link Address:","");
		}
	}
	lnk = lnk.trim();
	ttl = ttl.trim();
	if(ttl==="")throw 'Error: Empty title.';
	if(!isLink(lnk))throw 'Error: Invalid Link';


	text = '[url=' + lnk+']'+ttl+'[/url]';
	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 

	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;


	function isLink(lnk)
	{
		if(lnk.search("((http[s]?://)|(www\\.))(.)*")===0)return true;
		return false;
	}
}

//-----------------------user----------------------//
function user()
{
	var txtarea = document.activeElement;
	//if(txtarea.className!=="comment")throw 'not in comments';
	var text = '#!user/';
	var temp;
	if(txtarea.selectionStart ===txtarea.selectionEnd)
	{
		var temp = prompt("User Number:","");
	}
	else
	{
		temp = (txtarea.value).substring(txtarea.selectionStart ,txtarea.selectionEnd);
	}

	temp = parseInt(temp,10);
	if(!isNaN(temp))
	{
		text+=temp;
	}
	else
		throw 'Error: selection or input is not a number';


	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 


	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;
}

//-----------------------post----------------------//
function post()
{
	var txtarea = document.activeElement;
	//if(txtarea.className!=="comment")throw 'not in comments';
	var text = "#!post/";
	var temp;
	if(txtarea.selectionStart ===txtarea.selectionEnd)
	{
		var temp = prompt("Post Number:","");
	}
	else
	{
		temp = (txtarea.value).substring(txtarea.selectionStart ,txtarea.selectionEnd);
	}

	temp = parseInt(temp,10);
	if(!isNaN(temp))
	{
		text+=temp;
	}
	else
		throw 'Error: selection or input is not a number';


	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 


	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;
}

//-----------------------tag----------------------//
function tag()
{
	var txtarea = document.activeElement;
	//if(txtarea.className!=="comment")throw 'not in comments';
	var text = '#!tag/';
	var temp = "";
	if(txtarea.selectionStart ===txtarea.selectionEnd)
	{
		var temp = prompt("Tag Value:","");
	}
	else
	{
		temp = (txtarea.value).substring(txtarea.selectionStart ,txtarea.selectionEnd);
	}


	temp = temp.trim();
	if(temp==="")throw 'Error: Empty string or all spaces.'

	temp = temp.split(" ");
	for(i=1; i < temp.length ; i++)
	{
		if(temp[i]!=="")
			temp[0]+="_" +temp[i];
	}

	text+=temp[0];

	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 


	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;

}

//---------------IMG---------------------//
function img()
{
	var txtarea = document.activeElement
	var text1 = "[img]";
	var text2 = "[/img]"
	var temp;
	if(txtarea.selectionStart ===txtarea.selectionEnd)
	{
		var temp = prompt("Link to Image:","");
	}
	else
	{
		temp = (txtarea.value).substring(txtarea.selectionStart ,txtarea.selectionEnd).trim();
	}
	if(!isLink(temp))throw 'Error: Invalid Link';
	var text = text1+temp+text2;

	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 


	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;

	function isLink(lnk)
	{
		if(lnk.search("((http[s]?://)|(www\\.))(.)*")===0)return true;
		return false;
	}
}
//---------------------HTML Code---------------//
function htmlcode()
{
	var txtarea = document.activeElement;
	var text = String.fromCharCode(1430);


	for(var i = txtarea.selectionStart ; i < txtarea.selectionEnd ; i++)
	{
		var code = fixedCharCodeAt(txtarea.value,i);
		if(!code)continue;
		if(code==32) {
			text+="&nbsp;";
		}
		else if(code>32){
			text += "&#"+code+";";
		}
		else text+=String.fromCharCode(code);	

	}

	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 

	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;

}

function replacespaces()
{
	var txtarea = document.activeElement;
	var text = "";


	for(var i = txtarea.selectionStart ; i < txtarea.selectionEnd ; i++)
	{
		var c = (txtarea.value).charCodeAt(i);
		if(c==32) {
			text+="&nbsp;";
		}
		else text+=String.fromCharCode(c);	
	}


	var nextpos = parseInt(txtarea.selectionStart,10) + text.length;
	strPos = txtarea.selectionStart;
	var front = (txtarea.value).substring(0,strPos);  
	var end = (txtarea.value).substring(txtarea.selectionEnd,txtarea.value.length); 

	txtarea.value = front+text+end;
	txtarea.selectionStart = nextpos;
	txtarea.selectionEnd = nextpos;


}


//function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
function fixedCharCodeAt (str, idx) {
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // 65536
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration
        return false;
        /*hi = str.charCodeAt(idx-1);
        low = code;
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
} 