// ==UserScript==
// @name           Google Advanced
// @version        0.2.0
// @description    Your own Google Search modes 
// @namespace      http://userscripts.org/users/piotryx/
// @include        /^https?:\/\/www\.google\.[^\/]+\/$/
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/webhp*
// @include        http*://www.google.*/images*
// @include        http*://www.google.*/imghp*
// @include        http*://www.google.*/#*q=*
// @grant          GM_getValue
// @grant          GM_setValue
// @downloadURL    http://userscripts.org/scripts/source/166497.user.js
// @updateURL      http://userscripts.org/scripts/source/166497.meta.js
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
   
// Global variables:   
// localStorage: IE >= 8, FF: dom.storage.enabled has to be enabled
var isStorageSupport = ! ((typeof(Storage)==="undefined") || (Storage === null));
var searcher_disp, list_activator, searchers_list;
var real_input, fake_input=null;
var search_form = document.getElementById("gbqf");   
var OGS_previous_query, OGS_previous_searcher_id;
var OGS_Searchers, default_searchers;

// Definitions:
// * OGS: OwnGoogleSearch - codename of the script
// * searcher: search mode allows add prefix to search query or add configuration URL parameters (eg. lang.)
// * Google engine type, Google search type: Type of Google search e.g: Images, Discussions, Videos, ...
// * multi-param - URL parameter (...&name=<value>&...) that can has multi vales (i.e. <value>="name1:value1,name2:value2...") - used sometimes by Google Search

/*
   Search mode structure:
     {
         id : "Text to identify your search mode by the script",
         disp_name: "Displaying name of your mode",
         q_prefix : "Text that will be inserted on the start of typed query to Google",
                    (shall be ended with space to separate with typed query)
         url_addon : List of URL GET parameters that has to be added to the Google URL
                     For example 
                        if it has to been added "...&hl=en&num=100..." to the URL (English language of interface and 100 results for page), 
                        then there has to been written:
                     [{name:"hl", value:"en"}, {name:"num", value:"100"}]
         apply_to: "On Which Google tab the search mode will be displayed"
                   Possible values:
                   "ALL", "SEARCH", "IMAGES", "NEWS", "PATENTS", "BLOGS", "VIDEOS", "BOOKS", "PLACES", "DISCUSSIONS", "APPLICATIONS, "SHOPPING", "RECIPES"
     }
 */

default_searchers = [
    {
        id : "OGS_DEFAULT",
        disp_name: "Google default",
        q_prefix : "",
        url_addon : [{name: "lr", value: ""}, {name: "hl", value: ""}],
        apply_to: "ALL"
    },
    {
        id : "google-english",
        disp_name: "Google EN",
        q_prefix : "",
        url_addon : [{name: "lr", value: "lang_en"}, {name: "hl", value: "en"}],
        apply_to: "ALL"
    }, 
    {
        id : "uso-show",
        disp_name: "Userscripts",
        q_prefix : "site:userscripts.org inurl:show ",
        url_addon : [],
        apply_to: "SEARCH"
    }, 
    {
        id : "uso-scripts",
        disp_name: "Userscripts sources",
        q_prefix : "site:userscripts.org inurl:review ",
        url_addon : [],
        apply_to: "SEARCH"
    },
    {
        id : "icons32",
        disp_name: "Icons 32x32",
        q_prefix : "filetype:png ",
        url_addon : [{name: "tbs", value: [{name:"isz", value:"ex"}, {name:"iszw", value:"32"}, {name:"iszh", value:"32"}]}],
        apply_to: "IMAGES"
    },
    {
        id : "icons64",
        disp_name: "Icons 64x64",
        q_prefix : "filetype:png ",
        url_addon : [{name: "tbs", value: [{name:"isz", value:"ex"}, {name:"iszw", value:"64"}, {name:"iszh", value:"64"}]}],
        apply_to: "IMAGES"
    }
];

// Known Issues:
// number      priority     issue         
//  1. *     wyższa stopka na homepage google (prawdopodobnie przez getcalcwidth) 
// -2. ****  klawiatura, sugestie modyfikują real_input a fake_input (ten widziany) zostaje taki sam (z firebugiem - odwrotnie)...
// -3. **    nie działa Down Key do przeniesienia się do sugestii (z firebugiem dzała, bez - nie)
// -4.       instantfox - ??
// -5. ****  czasem brak interfejsu, z firebugiem jest (???)
//  6.       przez to, że Google wszedzie odwołuje się do fake_input (zdarzenia) sugestie są nie do tekstu w real_input tylko w fake_input
//  7. *     klawiatura nie wyświetla sie (??)
//  8.       trzeba poczekac na pełne załądowanie strony (rozwiazanie 2. i 5.)
//  9. *     klawiatura jeśli sie wyświetli to nie działa
//  10.      po kliknieciu sugestii (nie "Enter") czasem trzeba enter do recznej aktualizacji wyników, bo aktualizuje złym zapytaniem - takim jaki jest przed kliknieciem

//=======================================================================//
//========================= GENERAL FUNCTIONS ===========================//
//=======================================================================//

// http://www.techtricky.com/how-to-get-url-parameters-using-javascript/
// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter/979997#979997
function getUrlParam(name, url)
{
    name = name.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
    var regexS = "([\\?&#])(" + name + ")=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results === null)
        return null;
    else
        return decodeURIComponent(results[3].replace(/\+/g, "%20"));
}

function getCalculatedWidth(_string, _style)
{
    var temp_elem = document.createElement("span");
    document.body.appendChild(temp_elem);
    if( !_style )
        temp_elem.style = _style;
    temp_elem.style.visibility = "hidden";
    temp_elem.style.position = "absolute";
    temp_elem.innerHTML = _string;
    var width = temp_elem.clientWidth;
    temp_elem.parentNode.removeChild(temp_elem);
    return width;
}

function getArrayElemById(id, array)
{
    for(var i=0, array_length=array.length ; i<array_length ; i++)
    {
        if(array[i].id === id)
            return array[i];
    }
    return null;
}

function appendAsFirstChild(_parent, _new_child)
{
    var first_child = _parent.firstChild;
    if(first_child !== null) 
        return _parent.insertBefore(_new_child,first_child);
    else 
        return _parent.appendChild(_new_child);
}

function setFormParam(_form, _name, _value) // only <input> are searched to change their value
{
    var inputs = _form.getElementsByTagName("INPUT");
    for(var i=0, inputs_length = inputs.length ; i<inputs_length ; i++)
    {
        if(inputs[i].name === _name)
        {
            inputs[i].value = _value;
            return;
        }
    }
    
    if(i == inputs.length)
    {
        var new_input = document.createElement("INPUT");
        _form.appendChild(new_input);
        new_input.type = "hidden";
        new_input.name = _name;
        new_input.value = _value;
        return;
    }
}

// http://stackoverflow.com/a/1848414/1794387
// Firefox - doesn't watch user-driven changes
function watchProperty(obj, name, handler)
{
    if ('watch' in obj) // Firefox
        obj.watch(name, handler);
    else if ('onpropertychange' in obj) // IE
    {
        name = name.toLowerCase();
        obj.onpropertychange = function () {
            if (window.event.propertyName.toLowerCase() === name)
                handler.call(obj);
        };
    }
    else // other browsers
    {
        var o = obj[name];
        setInterval(
            function () {
                var n = obj[name];
                if (o !== n)
                {
                    o = n;
                    handler.call(obj);
                }
            }, 
            200
        );
    }
}

// http://stackoverflow.com/a/596580/1794387
function simulateKeyDown(_target, _keyCode)
{
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

    keyboardEvent[initMethod](
        "keydown", // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        _keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    _target.dispatchEvent(keyboardEvent);
}

//=======================================================================//
//========================= SCRIPT FUNCTIONS ============================//
//=======================================================================//

function getGoogleSearchType()
{
    var result = null;
    var url = String(window.location.href);
    if (/^https?:\/\/www\.google\.[^\/]+\/$/.test(url))
        result = "SEARCH";
    else if(
        /^https?:\/\/www\.google\..*\/search.*$/.test(url) || 
        /^https?:\/\/www\.google\..*\/webhp.*$/.test(url) || 
        /^https?:\/\/www\.google\..*\/#.*q=.*$/.test(url)
    ) {
        var engine_type = (getUrlParam("tbm", url));
        if      (engine_type === "isch")    result = "IMAGES";
        else if (engine_type === "nws" )    result = "NEWS";
        else if (engine_type === "pts" )    result = "PATENTS";
        else if (engine_type === "blg" )    result = "BLOGS";
        else if (engine_type === "vid" )    result = "VIDEOS";
        else if (engine_type === "bks" )    result = "BOOKS";
        else if (engine_type === "plcs")    result = "PLACES";
        else if (engine_type === "dsc" )    result = "DISCUSSIONS";  
        else if (engine_type === "app" )    result = "APPLICATIONS";      
        else if (engine_type === "shop")    result = "SHOPPING"; 
        else if (engine_type === "rcp" )    result = "RECIPES";             
        else if (engine_type === null  )    result = "SEARCH";
    }
    else if(
        /^https?:\/\/www\.google\..*\/images.*$/.test(url) || 
        /^https?:\/\/www\.google\..*\/imghp.*$/.test(url)
    ) {
        result = "IMAGES";
    }
    return result;
}

function multiParam_arr2str(_value)
{
    var result = "";
    for (var i = 0; i < _value.length; i++)
    {
        result += "," + _value[i].name + ":" + _value[i].value;
    }
    return result.substr(1);
}

function multiParam_str2arr(_string)
{
    var params = _string.split(',');
    var result = [];
    for(var i=0 ; i<params.length ; i++)
    {
        var param = params[i].split(":");
        result.push({name:param[0], value:param[1]});        
    }
    return result;
}

function updateMultiParamArray(_old_value, _setted_value_name, _setted_value)
{
    var new_value = _old_value; // it isn't cloned !
    for(var i = 0 ; i < _old_value.length ; i++)
    {
        if(_old_value[i].name === _setted_value_name)
        {
            new_value[i].value = _setted_value;
            break;
        }
    }
    if(i === _old_value.length) // '_setted_value_name' not found in '_old_value'
    {
        new_value.push({name:_setted_value_name, value:_setted_value});
    }
    return new_value;
}

function getCurrOGSInfo()
{
    return (searcher_curr.id + ";" + fake_input.value);
}

function updateOGSInfo() // to remembering name of searcher and typed query by user in URL
{
    var OGS_info_now = getCurrOGSInfo();
    setFormParam(search_form, "oq", getCurrOGSInfo()); 
    if(isStorageSupport)
        sessionStorage.setItem("OGS_info", OGS_info_now);  
}

function updateRealInput()
{
    real_input.value = searcher_curr.q_prefix + fake_input.value;
}

function setSearcher(_searcher, _are_results_need_update) // might bring page reload
{
    searcher_curr = _searcher;  
    searcher_disp.innerHTML = (searcher_curr.id==='OGS_DEFAULT') ?'' :searcher_curr.disp_name;
    
    // Prepare URL parameters of chosen Searcher to apply them in search results
    for (var i = 0, searcher_curr_url_addon_length = searcher_curr.url_addon.length; i < searcher_curr_url_addon_length; i++)
    {
        var s_name = searcher_curr.url_addon[i].name;
        var s_value = searcher_curr.url_addon[i].value;
        var value_to_setted;
        if (typeof s_value === "object")
        {
            var curr_value = multiParam_str2arr(String(getUrlParam(s_name, window.location.href))); // multi-param in URL
            var multi_to_setted = curr_value;
            for (var j = 0; j < s_value.length; j++)
                multi_to_setted = updateMultiParamArray(multi_to_setted, s_value[j].name, s_value[j].value);

            value_to_setted = multiParam_arr2str(multi_to_setted);
        }
        else
        {
            value_to_setted = s_value;
        }
        setFormParam(search_form, s_name, value_to_setted);
    }
      
    updateRealInput();
    updateOGSInfo();    
        
    if(_are_results_need_update)
        search_form.submit(); 
}

function OGS_init() // Draw interface elements and start listen to their events
{
    // Make two inputs first visible (fake_input) and second hidden (real_input)
    // All changes to fake_input will be bring that real_input := prefix + fake_input
    
    // fake_input: visible input, Google script are reference to fake_input
    // real_input: invisible cloned input, has name=q (GET requests send real_input value)
    searcher_curr = getArrayElemById("OGS_DEFAULT", OGS_Searchers);
    var org_input = document.getElementById("gbqfq");
    fake_input = org_input;
    real_input = org_input.cloneNode();
    
    real_input.id = 'OGS_real_input';
    real_input.className = '';
    real_input.style.display = "none";
    fake_input.name = '';
    fake_input.style.position = "absolute";
    fake_input.style.left = "0px";
    fake_input.style.top = "0px";
    appendAsFirstChild(org_input.parentNode, real_input);
    var fake_input_updated = function() {
        // console.log((arguments.callee.caller !== null)? "caller is " + arguments.callee.caller.toString() :"unknown caller");
        updateRealInput();
        updateOGSInfo();
    };    
    fake_input.addEventListener("input", fake_input_updated);
    fake_input.addEventListener("keydown", fake_input_updated);
    watchProperty(fake_input, "value", fake_input_updated); // for input changes made by Google scripts (MutationObserver doesn't work for input.value, Watch.JS seems to doesn't work too)
        
    // Init display name of searcher
    searcher_disp = document.createElement("div");
    document.getElementById("gbq1").appendChild(searcher_disp);
    searcher_disp.style.fontWeight="bold";
    searcher_disp.style.position="absolute";
    searcher_disp.style.top="57%";
    searcher_disp.style.left="0px";
    
    // Init a Listbox to chosing Searcher
    searchers_list = document.createElement("select");
    searchers_list.size = OGS_Searchers.length;
    searchers_list.style.position = "absolute";
    searchers_list.style.top = "82%";
    searchers_list.style.left = "0px";
    searchers_list.style.width = "100%";
    searchers_list.style.display = "none";
    document.getElementById("gbq1").appendChild(searchers_list);
    var searcher_chosen = function() {
        setSearcher(getArrayElemById(searchers_list.value, OGS_Searchers), true);
        searchers_list.style.display = "none";
    };
    
    // When Enter is pressed or user clicked a searcher name - the searcher is chosen 
    searchers_list.addEventListener("click", searcher_chosen);
    searchers_list.addEventListener(
        "keypress", 
        function(event) {
            if (event.which == 13 || event.keyCode == 13) 
                searcher_chosen();
        }
    );
    
    searchers_list.addEventListener(
        "blur", 
        function(/*event*/) {
            searchers_list.style.display = "none";
        }
    );
    
    // Set width of Listbox to longest Listbox element
    var widest_length = 0;
    for (var i=0;i<OGS_Searchers.length;i++)
    {
        var elem_width = getCalculatedWidth(OGS_Searchers[i].disp_name,'');
        if( elem_width > widest_length )
            widest_length = elem_width;
    }
    searchers_list.style.width = (widest_length<250) ?((widest_length+30)+"px") :((250+30)+"px");
    
    // Draw the Listbox elements
    for (var k=0, searchers_length=OGS_Searchers.length ; k<searchers_length ; k++)
    {
        var searcher_option = document.createElement("option");
        searchers_list.appendChild(searcher_option);
        searcher_option.value = OGS_Searchers[k].id;
        searcher_option.innerHTML = OGS_Searchers[k].disp_name;
        if(OGS_Searchers[k].id === "OGS_DEFAULT")
            searcher_option.style.fontWeight="600";
    }
    
    // Draw and init listbox activator (i.e. clickable arrow)
    list_activator = document.createElement("a");
    document.getElementById("gbq1").appendChild(list_activator);
    list_activator.className = "mn-dwn-arw";
    list_activator.style.position="absolute";
    list_activator.style.top="43%";
    list_activator.style.right="5px";
    list_activator.style.cursor="pointer";
    list_activator.addEventListener(
        "click", 
        function() { 
            searchers_list.style.display = "";
            
            // select current searcher in Listbox
            searchers_elems = searchers_list.getElementsByTagName("OPTION");
            for (var i=0 ; i<searchers_elems.length ; i++)
            {
                if(searchers_elems[i].value === searcher_curr.id)
                {
                    searchers_elems[i].selected = true;
                    break;
                }
            }
            searchers_list.focus();
        }
    );
    list_activator.addEventListener(
        "mouseover", 
        function() { 
            list_activator.style.borderColor = "#222222 transparent";
        }
    );
    list_activator.addEventListener(
        "mouseout", 
        function() { 
            list_activator.style.borderColor = "#666666 transparent";
        }
    );
}

function getSearchers()
{
    var OGS_Searchers = JSON.parse(GM_getValue("search-engines",JSON.stringify(default_searchers)));

    // Filter searchers that matches current google search engine type
    var searchers_temp = [];
    var google_engine_type = getGoogleSearchType();
    for(var i=0 ; i<OGS_Searchers.length ; i++)
    {
        if( (OGS_Searchers[i].apply_to === 'ALL' || OGS_Searchers[i].apply_to === google_engine_type) )
            searchers_temp.push(OGS_Searchers[i]);
    }
    OGS_Searchers = searchers_temp;
    return OGS_Searchers;
}

function loadOGSInfo()
{
    var OGS_info;
    if(isStorageSupport && sessionStorage.getItem("OGS_info"))
        OGS_info = sessionStorage.getItem("OGS_info"); // when Google interior link clicked (e.g. "Images") then OGS_info is stored only in sessionStorage
    else
        OGS_info = getUrlParam('oq', window.location.href); // always (e.g. in other cases ex. reloading page) OGS_info is stored in URL parameter called 'oq'
    OGS_info = String(OGS_info).split(';');
    return OGS_info;
}

function main()
{
    OGS_init();
    if (
        OGS_previous_searcher_id && 
        !(/^https?:\/\/www\.google\.[^\/]+\/$/.test(window.location.href)) // don't change Searcher when home page
    ) {
        if(OGS_previous_query)
            fake_input.value = OGS_previous_query;
        var searcher = getArrayElemById(OGS_previous_searcher_id, OGS_Searchers);
        if(searcher !== null)
            setSearcher(searcher, false);
    }
}

//=======================================================================//
//========================= MAIN SCRIPT CODE ============================//
//=======================================================================//

OGS_info = loadOGSInfo();
OGS_previous_query = OGS_info[1]; 
OGS_previous_searcher_id = OGS_info[0];
OGS_Searchers = getSearchers();

// Fix for Issue 2. and 5. : Run main code when page loading is complete
if(document.readyState === 'complete') 
{
    main();
}
else
{
    document.addEventListener(
        'readystatechange', 
        function()
        {
            if(document.readyState === 'complete') // html is loaded and scripts have been parsed
            {
                main();
            }
        }
    );
}

