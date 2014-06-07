// Google - Blue Google Skin
// version 1.9
// 22.04.2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          blue google skin
// @namespace      tag:theduck129243253544654556324515234132421421
// @description    blue google skin - Changes google.de skin in light blue with white fonts. Adds Wikipedia Button. Don't ask just try it.
// @include        http://www.google.*
// @include        http://www.google.*/*
// @include        http://www.google.*.*/*
// @include        http://images.google.*
// @include        http://video.google.*    
// @include        http://news.google.*
// @exclude        http://www.google.*/products*
// @exclude        http://www.google.*/reader/*
// @exclude        http://www.google.*/permissions*/*
// Version 1.0 - First Release, made new google Design
// Version 1.1 - Added Wikipedia Button, Fixed Color of Dokument Tags [PDF] from black to white
// Version 1.2 - Fixed Extended Search and Language Tools unreadable white to black Fonts
// Version 1.3 - Redirects Google.*/Firefox to Google URL, Optimized source code
// Version 1.4 - Fixed English Wikipedia Search, Changed too two Buttons - Local and English Wikipedia Button only for mentioned non english speakers tld's, modifys search string
// Version 1.5 - Fixed Unreadable Font in More Menu, now additionally supports Picture, Video and News Services 
// Version 1.6 - Added two Buttons - First Quote Search Field String, Second Clear Search Field
// Version 1.7 - Fixed Quote Searchfield Button Bug
// Version 1.8 - Added Limit search by Date, Remove Google Ad's
// Version 1.9 - Bugfix Release, Major JavaScript Error 
// Version 2.0 - Bugfix Release, Extended Search functions again
// ==/UserScript==


// ## Helper Functions ##
function TrimString(str, chars) 
{
    chars = chars || "\\s";
    str = str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function CompactBlankChars(str)
{
   str = str.replace(/\s+/gi, " ");
   return str;
}

function initButtonRedirect(id, name, url)
{
    i = document.createElement("input");
    i.type="button";
    i.name=id;
    i.value=name;
    i.addEventListener("click",function() 
    {
        window.location.href=url;
    },true);
    return i;
}

function initButtonJSAction(id, name, a, action)
{
    i = document.createElement("input");
    i.type="button";
    i.name=id;
    i.value=name;
    i.addEventListener("click",function() 
    {
        var tmpFunc = new Function("atr", action);
        tmpFunc(a);
        tmpFunc = null;
    },true);
    return i;
}

function limitByDate_Link(DateLimit)
{
	var b_fullurl = window.location.href;

	//Create Limited Date Links
	if (b_fullurl.indexOf("search?") != -1)
	{
		var b_split_url1 = b_fullurl.split("?");
		var b_split_url2 = b_split_url1[1].split("&");
		
 		for (var j=0; j<b_split_url2.length; j++)
		{
			if (b_split_url2[j].indexOf("as_qdr=") != -1)
			{
				b_split_url2[j] = "as_qdr=" + DateLimit;
			}
		}
		var tmp_url =  b_split_url2.join("&");
		var tmp_url =  b_split_url1[0] + "?" + tmp_url;
		return tmp_url;
	}
}

// ## Main Functions ##
function adaptSearchString() 
{
    var allInputs;
    var a;
    var str;
    var i = 0;
        
    allInputs = document.evaluate('//input[contains(@name, "q")]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    a = allInputs.snapshotItem(i);

    // Work with every Textfield with id = "q"
    while(a != null)
    {
      str = a.value;
      str = TrimString(str);
      str = CompactBlankChars(str);
      a.value = str;
      i++;
      a = allInputs.snapshotItem(i);
    }
}

function maskingGoogleAds()
{
    x = 'table.ra {display:none !important;}';
    x += 'div[id=tpa1] {display:none !important;}';
    x += 'div[id=tpa2] {display:none !important;}';
    x += 'div[id=tpa3] {display:none !important;}';
    x += 'div[id=tpa4] {display:none !important;}';
    x += 'div[id=tpa5] {display:none !important;}';
    x += 'div[id=tpa6] {display:none !important;}';
    x += 'div[id=tpa7] {display:none !important;}';
    x += 'div[id=tpa8] {display:none !important;}';
    x += 'div[id=tpa9] {display:none !important;}';
    x += 'div[id=tpa0] {display:none !important;}';

    GM_addStyle(x);
}


function replaceGoogleFirefox()
{
    var b_fullurl = window.location.href;
    var b_url = window.location.host;

    if (b_fullurl.indexOf("/firefox") != -1)
    {   
	      window.location.href = 'http://' + b_url;
    }
}

function limitByDate()
{
	//Create Equal Conditions
	var b_fullurl = window.location.href;
	if (b_fullurl.indexOf("www.google.") != -1 && b_fullurl.indexOf("search?") != -1 && b_fullurl.indexOf("_search?") == -1)
	{
		if (b_fullurl.indexOf("as_qdr=") == -1)
		{
			window.location.href += "&as_qdr=all";
		}
	
		var apElement = document.getElementById('ap').parentNode.parentNode.parentNode.parentNode;
		var spanElement = document.createElement('div');
		spanElement.innerHTML = "LimitByDate:&nbsp;";
		spanElement.className = "limitbydate";
	
		var LimitByDate_Element_URL_Part = new Array("all", "y3", "y2", "y1", "m6", "m3", "m1", "w", "d");
		var LimitByDate_Element_Title = new Array("all", "3 years", "2 years", "1 year", "6 months", "3 months", "1 month", "1 week", "today");

		var newElement;

		for (i=0; i<LimitByDate_Element_Title.length; i++)
		{
			newElement = document.createElement('a');
	      	newElement.innerHTML = LimitByDate_Element_Title[i];
			newElement.href = limitByDate_Link(LimitByDate_Element_URL_Part[i]);
			newElement.className = "limitbydate";
	
			spanElement.appendChild(newElement);
			if (i!=LimitByDate_Element_Title.length-1) {spanElement.innerHTML += '&nbsp;|&nbsp;'};
		}
		apElement.appendChild(spanElement); 

      	x = 'select[name=as_qdr] {display:none !important;}'; // Disable Drop-Down Box
		x += 'a.limitbydate, div.limitbydate {font-family:verdana !important; font-size:12px !important; color:white !important; text-decoration:none !important;}'; //Modify SortByDate Strings
	      GM_addStyle(x);
	}
}

function newGoogleDesign()
{
    var b_fullurl = window.location.href;
    x = 'body{background-color:#5081B8 !important; font-size:13pt !important; font-family:verdana !important; font-style:italic !important;}';

    //Change Google font color at Advanced Search or Language Tools
    if (b_fullurl.indexOf("advanced_search?") == -1 && b_fullurl.indexOf("language_tools?") == -1)
    {
        x += 'a{color:#FFFFFF !important;}';
        x += 'a:hover{color:#FFFFFF !important;}';
        x += 'td,.n a,.n a:visited{color:#FFFFFF !important;}';
    }
    else
    {
        x += 'a{color:#000000 !important;}';
        x += 'a:hover{color:#000000 !important;}';
    }

    x += 'div.std{color:#000000 !important; font-size:10pt}';
    x += 'a.fl{text-decoration:none !important;}'
    x += 'span.a{color:#FFF373 !important; text-decoration:none !important;}';
    x += 'span.a b{color:#FFF373 !important; text-decoration:none !important;}';

    x += '#modules .yui-b, #modules,.yui-gb, #gbar, #guser {background-color:red !important;}';
    x += '.w_ind, .tld {color:white !important;}';
    x += '#footer_promos {display: none !important;}';
    x += 'input,select {font-family:verdana !important; font-size:11px !important; border-style:groove !important; margin-top:6px !important; margin-left:10px !important; margin-left:10px !important;}';

    x += 'table.bt {background-color:#FFFFFF !important;}';
    x += 'table.bt * * {color:#000000 !important;}';
    x += 'div.nr + span, div[id=nn] + span, div[id=np] + span  {font-size:11pt !important; font-stretch:wider !important;}';
    x += 'span.w {color:#FFFFFF !important;}';
    x += ':link:hover, :visited:hover {color: black !important; background: yellow !important;}';
    
    x += 'span.gb2 a{color:#000000 !important;}'; //More Menu Point
    x += 'div.url,div.Details{color:yellow !important;}'; //Video Site
    x += 'div.menu-normalsb a{color:black !important;}'; //Video Site
    x += 'table.headline tr td{color:black !important;}'; //Video Site
    x += 'span.statusresult a{color:black !important;}'; //Video Site

    x += 'table.ra {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa1] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa2] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa3] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa4] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa5] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa6] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa7] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa8] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa9] {background-color:ADADAD !important;}'; //Recolor Google Ad's
    x += 'div[id=tpa0] {background-color:ADADAD !important;}'; //Recolor Google Ad's
 
    GM_addStyle(x);
}

function addWikipediaButton()
{
    var b_url = window.location.host;
    var b_split_url = b_url.split(".");
    var b_split_url_len = b_split_url.length;

    var add_only_english_wikipedia_button = false;
    var wikipedia_prefix = b_split_url[b_split_url_len-1];
    switch (wikipedia_prefix)
    {
        case "de": break;                           //German
        case "at": wikipedia_prefix = "de"; break;  //German
        case "ch": wikipedia_prefix = "de"; break;  //German
        case "fr": break;                           //French
        case "es": break;                           //Spanisch
        case "it": break;                           //Italian
        case "pt": break;                           //Portuguese
        case "tr": break;                           //Turkish
        case "gr": wikipedia_prefix = "el"; break;  //Greek
        case "nl": break;                           //Dutch
        case "se": wikipedia_prefix = "sv"; break;  //Swedish
        case "dk": wikipedia_prefix = "da"; break;  //Danish
        case "no": break;                           //Norwegian
        case "fi": break;                           //Finnish
        case "pl": break;                           //Polish
        case "cz": wikipedia_prefix = "cs"; break;  //Czech
        case "sk": wikipedia_prefix = "cs"; break;  //Czech
        case "ro": break                            //Romanian
        case "hu": break;                           //Hungarian
        case "ru": break;                           //Russian
        case "jp": wikipedia_prefix = "ja"; break;  //Japanese
        case "cn": wikipedia_prefix = "zh"; break;  //Chinese
        case "in": wikipedia_prefix = "hi"; break;  //Indian
        case "pk": wikipedia_prefix = "ur"; break;  //Pakistani
        default: wikipedia_prefix = "en"; add_only_english_wikipedia_button = true; 
    }

    allInputs = document.evaluate('//input[@name = "q"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    a = allInputs.snapshotItem(0);

    if(add_only_english_wikipedia_button == false)
    {

        //Add Local Wikipedia Button
        var i = initButtonRedirect("btnL", "Local Wikipedia", 'http://' + wikipedia_prefix + '.wikipedia.org/w/index.php?title=Special%3ASearch&search=' + a.value);
        a.parentNode.appendChild(i);
    }
    
    //Add English Wikipedia Button
    var i = initButtonRedirect("btnE", "English Wikipedia", 'http://' + 'en' + '.wikipedia.org/w/index.php?title=Special%3ASearch&search=' + a.value);
    a.parentNode.appendChild(i);
}


function addSearchbarButtons()
{
    var allInputs = document.evaluate('//input[@name = "q"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var a = allInputs.snapshotItem(0);
   
    var UpdateAllSearchFields = "var j = 0;"; 
    UpdateAllSearchFields +="var b = allInputs.snapshotItem(j);";
    UpdateAllSearchFields +="while(b != null){";
    UpdateAllSearchFields +="b.value = a.value;";
    UpdateAllSearchFields +="j++;";
    UpdateAllSearchFields +="b = allInputs.snapshotItem(j);}";
    
    //Clear Button
    var action =  "a.value=\"\";";  
    action += UpdateAllSearchFields;
    
    var i = initButtonJSAction("btnSearchbar", "_", a, action);
    a.parentNode.insertBefore(i, a.nextSibling);
    
    //Quote Button
    var action = "var a_tmp = a.value;";
    action += "a_tmp = a_tmp.replace(/\"/gi, \'\');";       //Remove Quotes
    action += "a_tmp = a_tmp.replace(/\\s+/gi, \' \');";    //Compact double Space
    action += "a_tmp = a_tmp.replace(/\\s$/gi, \'\');";     //Remove last Space in String
    action += "a_tmp = a_tmp.replace(/^\\s/gi, \'\');";     //Remove first Space in String
    action += "a_tmp = \'\"\' + a_tmp + \'\"\';";           //Add front and back Quotes
    action += "a.value = a_tmp;"; 
    action += UpdateAllSearchFields;
    
    var i = initButtonJSAction("btnSearchbar", "\"", a, action);
    a.parentNode.insertBefore(i, a.nextSibling);
    
    //SearchButtons Design Distance
    x = 'input[name=btnSearchbar] {margin-left:0px !important; position:relative !important;}'; 
    GM_addStyle(x);
}

// ## Main Program ##
replaceGoogleFirefox();
maskingGoogleAds();
limitByDate();
newGoogleDesign();
adaptSearchString();
addSearchbarButtons();
addWikipediaButton();