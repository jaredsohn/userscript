// ==UserScript==
// @name           GTranslate
// @namespace      http://www.alexminza.com
// @include        *
// @require        http://www.google.com/jsapi
// ==/UserScript==

//Alexander Minza http://www.alexminza.com

var targetLanguage = "en";

(function() {
    load_jsapi();
}) ();

function load_jsapi()
{
    //Google AJAX Language API loader
    var elem = document.createElement("script");
    elem.type = "text/javascript";
    elem.id = "google-jsapi";
    elem.src = "http://www.google.com/jsapi?callback=jsapi_loaded";
    document.getElementsByTagName('head')[0].appendChild(elem); //document.body.appendChild(elem);
}

unsafeWindow.jsapi_loaded = function()
{
    unsafeWindow.google.load("language", "1", { "callback": langapi_loaded });
}

function langapi_loaded()
{
	var autoTranslate = GM_getValue("autoTranslate", true);
	var prefix = autoTranslate ? "Ôťô " : "";
    GM_registerMenuCommand(prefix + "Translate", translateMenu);
}

function translateMenu()
{
	GM_setValue("autoTranslate", !GM_getValue("autoTranslate", true));
	window.document.location.reload();	
}

window.addEventListener("load", windowLoad, true);

function windowLoad()
{
	if(GM_getValue("autoTranslate", true))
	{
		translate();
	}
}

function translate()
{
    translate_title();
    translate_recurse(document.body);
    translate_inputs();
}

function translate_recurse(element)
{
    Array.forEach(element.childNodes, function(child)
    {
        if(child.nodeName == "#text")
        {
            translate_element(child);
        }
        else
        {
            translate_recurse(child);
        }
    });
}

function translate_title()
{
    if(document.title)
    {
        translate_content(document.title, function(result)
        {
            if(result)
            {
                document.title = result;
            }
        });
    }
}

function translate_inputs()
{
    var inputs = document.getElementsByTagName("input");
    
    Array.forEach(inputs, function(input)
    {
        if(input.type != "hidden")
        {
            if(input.value)
            {
                translate_content(input.value, function(result)
                {
                    if(result)
                    {
                        input.value = result;
                    }
                });
            }
        }
    });
}

function translate_iterate(elements)
{
    Array.forEach(elements, function(element)
    {
        translate_element(element);
    });
}

function translate_element(element)
{
    //GM_log("Element: " + element);
    
    if(element)
    {
        //GM_log(element.textContent);
        translate_content(element.textContent, function(result)
        {
            if(result)
            {
                element.textContent = result;
            }
        });
    }
}

function translate_content(text, callback)
{
    unsafeWindow.google.language.translate(text, "", targetLanguage, function(result)
    {
        //GM_log(result.translation);
        callback.call(this, result.translation);
    });
}

function trim(str)
{
    return str.replace(/^\s+|\s+$/g, "");
}

function stripTags(str)
{
    return str.replace(/<\/?[^>]+>/gi, "");
}

var unescapeDiv = document.createElement("div");

function unescapeHTML(str)
{
    unescapeDiv.innerHTML = str;
    return unescapeDiv.innerHTML.replace("&nbsp;", " ");
}