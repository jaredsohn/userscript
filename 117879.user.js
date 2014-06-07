// ==UserScript==
// @name        Property H
// @namespace   Property H
// @description Property H
// @include http://apps.facebook.com/inthemafia/*
// @include http://facebook.mafiawars*/mwfb/remote/html_server.php*
// @include https://apps.facebook.com/inthemafia/*
// @include https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @version     Property H
// ==/UserScript==


 
function injectScript(source) {
    // Utilities
    var isFunction = function (arg) {
            return (Object.prototype.toString.call(arg) == "[object Function]");
        };
    var isFunction = function (arg) {
        return (Object.prototype.toString.call(arg) == "[object Function]");
    };
     
    var jsEscape = function (str) {
        // Replaces quotes with numerical escape sequences to
        // avoid single-quote-double-quote-hell, also helps by escaping HTML special chars.
        if (!str || !str.length) return str;
        // use \W in the square brackets if you have trouble with any values.
        var r = /['"<>\/]/g, result = "", l = 0, c;
        do{c = r.exec(str);
            result += (c ? (str.substring(l, r.lastIndex-1) + "\\x" +
                c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
        } while (c && ((l = r.lastIndex) > 0))
        return (result.length ? result : str);
    };
 
    var bFunction = isFunction(source);
    var elem = document.createElement("script");    // create the new script element.
    var script, ret, id = "";
 
    if (bFunction)
    {
        // We're dealing with a function, prepare the arguments.
        var args = [];
 
        for (var i = 1; i < arguments.length; i++)
        {
            var raw = arguments[i];
            var arg;
 
            if (isFunction(raw))    // argument is a function.
                arg = "eval(\"" + jsEscape("(" + raw.toString() + ")") + "\")";
            else if (Object.prototype.toString.call(raw) == '[object Date]') // Date
                arg = "(new Date(" + raw.getTime().toString() + "))";
            else if (Object.prototype.toString.call(raw) == '[object RegExp]') // RegExp
                arg = "(new RegExp(" + raw.toString() + "))";
            else if (typeof raw === 'string' || typeof raw === 'object') // String or another object
                arg = "JSON.parse(\"" + jsEscape(JSON.stringify(raw)) + "\")";
            else
                arg = raw.toString(); // Anything else number/boolean
 
            args.push(arg);    // push the new argument on the list
        }
 
        // generate a random id string for the script block
        while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
            0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9 )));
 
        // build the final script string, wrapping the original in a boot-strapper/proxy:
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=(("+
            source.toString()+")("+args.join()+"));}catch(e){value.throwValue=true;value.callResult=e;};"+
            "document.getElementById('"+id+"').innerText=JSON.stringify(value);})();";
 
        elem.id = id;
    }
    else // plain string, just copy it over.
    {
        script = source;
    }
 
    elem.type = "text/javascript";
    elem.innerHTML = script;
 
    // insert the element into the DOM (it starts to execute instantly)
    //document.head.appendChild(elem);
    document.getElementsByTagName('head')[0].appendChild(elem);
    //^^ for older browsers [modified by luke]
    if (bFunction)
    {
        // get the return value from our function:
        ret = JSON.parse(elem.innerText);
 
        // remove the now-useless clutter.
        elem.parentNode.removeChild(elem);
 
        // make sure the garbage collector picks it instantly. (and hope it does)
        delete (elem);
 
        // see if our returned value was thrown or not
        if (ret.throwValue)
            throw (ret.callResult);
        else
            return (ret.callResult);
    }
    else // plain text insertion, return the new script element.
        return (elem);
}

var LucifersMWASKFEED = function () {
    
var link;
ShowBoxTop = "180";
ShowBoxLeft = "200";
ShowBoxHeight = "140";
ShowBoxWidth = "360";
ShowBoxTitle = '<a href = ":*" target="_blank">Beba Property Hack</a>';

force_post_wall = function(){
FB.ui(
   {
 
 method: 'feed',
     name: property_ask_any.name,
     link: property_ask_any.link,
     picture: property_ask_any.picture,
     caption: '',
     description: (
     property_ask_any.description+
     'Please Send me more parts, I need your help'
     ),
     message: property_ask_any.message,
     actions: property_ask_any.actionLinks
   },
   function (response) {
     if (response && response.post_id) {
      // alert(response.post_id);
     } else {

     }
   }
 );
    
}

force_post_group = function(){
FB.ui(
   {
 
 method: 'send',
     name: property_ask_any.name,
     message: '"Please help me"',
     link: property_ask_any.link,
     picture: property_ask_any.picture,
     caption: 'New Parts  => ',
     description: (
     ''+
     property_ask_any.description+
     'Please Click My Parts Link =>'+link
     ),
     actions: property_ask_any.actionLinks
   },
   function (response) {
     if (response && response.post_id) {
      // alert(response.post_id);
     } else {

     }
   }
 );
    
}


mylinks = function(){
javascript:(function(){var a=document.createElement("script");a.type="text/javascript";a.src="http://mmfu-lucifer.hardiman.co.nz/bm/mylinks.js?"+Math.random();document.getElementsByTagName("head")[0].appendChild(a)})();
} 

//log(concatObject(property_ask_any));


function getTinyURL(url) {
//May work on something that checks the public json tiny url script
//Public "http://json-tinyurl.appspot.com/?url=$url");
$.getJSON('http://mmfu-lucifer.hardiman.co.nz/url-shortener.php/?&callback=?', 
//Till then more stable running payload of my server
                                        {url: url},
					function(data){
                                                document.getElementById('tinyurl').innerHTML = data.tinyurl;
                                                link = data.tinyurl;
					}

				);
 
}


function concatObject(obj) {
  str='';
  for(prop in obj)
  {
    str+=prop + " value :"+ obj[prop]+"\n";
  }
  return(str);
}





ShowBoxHtmlContent = 
'Cider House Part => <STRONG><span id="tinyurl">Loading</span></STRONG><br>'+
//'<br/><em>&nbsp; Zynga not releasing Botanical Garden till december</em><br/><br/>Try Lucifers&nbsp;<a href="#" onclick="mylinks();">MyLinks</a>&nbsp;<em>beta</em> While you wait';
//'<br><a onclick = "force_post();">[Force Post]</a>'+
'<br/><em>Script not working? Clear your cache & delete cookies</em><br/>'+
'<br/>&nbsp;&nbsp;<a class="sexy_button_new short white" id="force_post_group" onclick = "force_post_group();"><span><span>Post To Group</span></span></a>'+
'&nbsp;&nbsp;<a class="sexy_button_new short green" id="force_post_wall" onclick = "force_post_wall();"><span><span>Post To Wall</span></span></a>';



LucifersPopBox(ShowBoxTop,ShowBoxLeft,ShowBoxHeight,ShowBoxWidth,ShowBoxTitle, ShowBoxHtmlContent);
//MW.Feed(property_ask_any);
if (!window.property_ask_any) {
document.getElementById('msg').innerHTML =
'This didn\'t work '+
'TRY Again when the <STRONG>\'Ask\'</STRONG> button shows on the main home page';
		} else {
getTinyURL(window.property_ask_any.link);
window.property_ask_any.callback({post_id: 42});
                }


function LucifersPopBox(ShowBoxTop,ShowBoxLeft,ShowBoxHeight,ShowBoxWidth,ShowBoxTitle, ShowBoxHtmlContent) {
var popup = '<div id="LucifersPopBox" class="pop_box" style="display: block; top:'+ShowBoxTop+'px;left: '+ShowBoxLeft+'px; width:'+ShowBoxWidth+'px;height:' + ShowBoxHeight + 'px;z-index:999;">' + '<a id="LucifersPopBoxClose" href="#" onclick="$(\'#LucifersPopBox\').hide();$(\'#LucifersPopBox\').fadeOut(200);$(\'#content_row\').height(\'auto\');$(\'#LucifersPopBox .trigger_on_hide\').trigger(\'MW.hide\');return false;"' + 'class="pop_close"></a><div class="Lucifers_PopBox"><span style=" position:relative; left:50px; top:10px;font-weight:bold;">' + ShowBoxTitle + '</span></div><br><span style="text-align:center;">' + ShowBoxHtmlContent + '</span></div>';
document.getElementById('popup_fodder').innerHTML = popup;
}

function log(msg) {
//For us to debug out to browser java console
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}
injectScript(LucifersMWASKFEED);