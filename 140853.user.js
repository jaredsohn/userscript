// ==UserScript==
// @name        Google Translate without bar
// @namespace   http://userscripts.org/users/piotryx
// @description A script that removes upper bar from translated sites by Google Translate (e.g. runned by Google search or translating bookmarklet) 
// @include     http*://translate.google.*/translate?*
// @include     http*://translate.googleusercontent.com/translate_c?*
// @version		2.0
// ==/UserScript==

//////////////////////////////////////////////////
// bugs/limitations:
// what is http*://translate.google.*/translate_p?* and why frame is really http*://translate.googleusercontent.com/translate_c?* and not http*://translate.google.*/translate_p?*
// zmienna bar_hidden działa poprawnie gdy jest tylko jedna karta otwarta z google translator, jeśli nie, karty współdzielą informację o ukrytym/pokazanym pasku i czasem trzeba 2x kliknąć 'h' żeby przęłączyć ukryty/pokazany pasek
// przeładowanie strony z pokazanym paskiem powoduje jego ukrycie (bo "// not hiding is only for one time" )



window.site_type = null;

if((/http.*\:\/\/translate\.google\..*\/translate\?.*/ ).test(window.location.href)) 
	window.site_type="translate";	

else if((/http.*\:\/\/translate\.googleusercontent.com\/translate_c\?.*/ ).test(window.location.href))
	window.site_type="googleusercontent/translate_c";	

 
if(window.site_type=="translate")
{
	if(GM_getValue("do_hide", true)==true)
	{
		bar_hide();
		GM_setValue("bar_hidden", true); //bar_hidden - nie może być globalna (należeć do aktualnego window - window.bar_hidden) , bo permission denied z ramki innej domeny niż window.top (np. z googleusercontent)
	}
	else // ..after reloading for unhide
	{
		GM_setValue("do_hide", true); // not hiding is only for one time
		GM_setValue("bar_hidden", false);
	}
	
	window.onkeypress=keypress_handler;
}
else if(window.site_type=="googleusercontent/translate_c")
{
	if(window.self == window.top) 
		GM_setValue("bar_hidden", true);
		
	window.onkeypress=keypress_handler; 	
}


 
function reload_gtranslator() //loads translate.google.* with translated   main frame of source site
{
	var win = get_max_top_parent(window);	
	
	var rurl = getUrlParam("rurl", win.location.href);
	load_url_in_this_tab(win.location.protocol + "//" + ((rurl!=''&&rurl!=null)?rurl:"translate.google.com") + "/translate" + win.location.search); 
} 
 
function bar_unhide() 
{
	GM_setValue("do_hide", false);
	reload_gtranslator();
}

function bar_hide()
{
	var win = get_max_top_parent(window);
	
	if(win.site_type=="translate")
	{
		win = window; 
		
		// // black bar and bar with the URL
		var to_delete_b = win.document.getElementById('gb');
		to_delete_b.parentNode.removeChild(to_delete_b);

		// // an invisible element
		// var elem = win.document.getElementById('gt-c');
		// elem.parentNode.removeChild(elem);

		// // bar with chosing language
		var to_delete_lang = win.document.getElementById('gt-appbar');
		to_delete_lang.parentNode.removeChild(to_delete_lang);
		 
		// changing style
		var new_style = win.document.createElement("style"); 
		new_style.textContent = "#contentframe{position:absolute;width:100%;bottom:0px;top:0px!important}";
		document.head.appendChild(new_style);
	}
	else
	{
		GM_setValue("do_hide", true);
		reload_gtranslator();
	}
}


function keypress_handler(e)
{
	var evt = e ? e: window.event;
	var chrCode = 0;
	if (evt.charCode!=null)     chrCode = evt.charCode;
	else if (evt.which!=null)   chrCode = evt.which;
	else if (evt.keyCode!=null) chrCode = evt.keyCode;
	
	switch(String.fromCharCode(chrCode))
	{
	case 'o':
		goto_orginal();
		break;
	case 'v':
		retranslate();
		break;
	case 'h':
		if(GM_getValue("bar_hidden", false)==true) 
			bar_unhide();
		else
		{
			bar_hide();			
			GM_setValue("bar_hidden", true);
		}
		break;
	}
	return true;
}


function retranslate() // works with http://translate.googleusercontent.com/translate_c? and http://translate.google.pl/translate?
{ 
	var win = get_max_top_parent(window);
	
	if(getUrlParam("anno", win.location.href)=="2")
	{ // anno 2 - source lang
		win.location = updateURL(win.location.href, 'anno', '');
	}
	else // anno is other value (?), "", no param - translated page
	{
		win.location = updateURL(win.location.href, 'anno', '2');
	}
}

function goto_orginal() // works with http://translate.googleusercontent.com/translate_c? and http://translate.google.pl/translate?
{ 
	var win = get_max_top_parent(window);	
	load_url_in_this_tab(decodeURIComponent(getUrlParam("u", win.location.href)));
}

///////////// GENERAL FUNCTIONS //////////////////////////

function load_url_in_this_tab(site_url)
{
	var win;
	try
	{
		window.top.location.href = site_url; //trick http://stackoverflow.com/a/2586258/1794387 (circumvent permission denied)
	}
	catch(ex) // if trick isn't work
	{
		var dialog_text="Copy/Drag the text to adress bar:\n\n";
		dialog_text+=site_url;
		alert(dialog_text);
	}
}

function get_max_top_parent(win) //max top parent that have the same domain as win
{ 
	var win_param = win;
	var stop = false;
	while(!stop)
	{
		try
		{	
			//when try access win.parent.location.domain if domain of parent window isn't the same there is permission denied ..
			if(win_param.location.domain != win.parent.location.domain || win.parent==win) //..or even if is the same then stop searching parent
				stop = true;
			else
			{			
				win = window.parent;
			}
		}
		catch(ex) 
		{	
			stop = true;
		}
	}
	return win;
}

// http://www.techtricky.com/how-to-get-url-parameters-using-javascript/
// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter/979997#979997
function getUrlParam(  name, url )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  if( results == null )
    return null; 
  else
    return results[1];
}

// http://stackoverflow.com/a/10997390
function updateURL(currUrl, param, paramVal)
{
    var url = currUrl
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var aditionalURL = tempArray[1]; 
    var temp = "";
    if(aditionalURL)
    {
        var tempArray = aditionalURL.split("&");
        for ( i=0; i<tempArray.length; i++ )
		{
            if( tempArray[i].split('=')[0] != param )
			{
                newAdditionalURL += temp+tempArray[i];
                temp = "&";
            }
        }
    }
    var rows_txt = temp+""+param+"="+paramVal;
    var finalURL = baseURL+"?"+newAdditionalURL+rows_txt;
    return finalURL;
}