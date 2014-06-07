// ==UserScript==
// @name        47Demon	
// @namespace   Nganu Fighter
// @description Auto Fight
// @include     htt*://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     htt*://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     htt*://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     htt*://apps.facebook.com/inthemafia/*
// @include     htt*://apps.new.facebook.com/inthemafia/*
// @exclude     htt*://mwfb.zynga.com/mwfb/*#*
// @exclude     htt*://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     htt*://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    htt*://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @icon        http://bit.ly/Mapinem
// @version     x.x.0
// ==/UserScript==

function injectScript(source) {
    var isFunction = function(arg) {
        return(Object.prototype.toString.call(arg) == "[object Function]");
    };
    var jsEscape = function(str) {
        if( ! str || ! str.length)return str;
        var r = /['"<>\/]/g,
            result="",
			l=0,
			c;
        do {
            c = r.exec(str);
            result += (c ? (str.substring(l, r.lastIndex - 1) + "\\x" + c[0].charCodeAt(0).toString(16)) : (str.substring(l)));
        } while(c && ((l = r.lastIndex) > 0))
            return(result.length ? result : str);
    };
    var bFunction = isFunction(source);
    var elem = document.createElement("script");
    var script, ret, id = "";
    if(bFunction) {
        var args = [];
        for(var i = 1; i < arguments.length; i ++ ) {
            var raw = arguments[i];
            var arg;
            if(isFunction(raw))
                arg = "eval(\""+ jsEscape("("+ raw.toString()+")")+"\")";
            else if(Object.prototype.toString.call(raw) == '[object Date]')
                arg = "(new Date(" + raw.getTime().toString() + "))";
            else if(Object.prototype.toString.call(raw) == '[object RegExp]')
                arg = "(new RegExp(" + raw.toString() + "))";
            else if(typeof raw === 'string' || typeof raw === 'object')
                arg = "JSON.parse(\""+ jsEscape(JSON.stringify(raw))+"\")";
            else arg = raw.toString();
            args.push(arg);
        }
        while(id.length < 16)id += String.fromCharCode((( ! id.length || Math.random() > 0.5) ? 0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
        script = "(function(){var value={callResult: null, throwValue: false};try{value.callResult=((" + source.toString() + ")(" + args.join() + "));}catch(e){value.throwValue=true;value.callResult=e;};" + "document.getElementById('"+ id+"').innerText=JSON.stringify(value);})();";
        elem.id = id;
    } else
    {
        script = source;
    }
    elem.type = "text/javascript";
    elem.innerHTML = script;
    document.head.appendChild(elem);
    if(bFunction) {
        ret = JSON.parse(elem.innerText);
        elem.parentNode.removeChild(elem);
        delete(elem);
        if(ret.throwValue)throw(ret.callResult);
        else return(ret.callResult);
    } else
        return(elem);
}

var myscript = function(){
    if(document.getElementById('pagelet_ticker')){
        var ticker = document.getElementById('pagelet_ticker');
        var ego_pane = document.getElementById('pagelet_ego_pane');
        ticker.parentNode.removeChild(ticker);
        ego_pane.parentNode.removeChild(ego_pane);
        return;
    }
    
    if(/dialog\/feed/.test(window.location.href)){
        if(document.evaluate('//input[@type="submit" and @name="publish"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength > 0) {
            var pub = document.evaluate('//input[@type="submit" and @name="publish"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if(/Get a Boost/.test(document.body.innerHTML)){
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                pub.snapshotItem(0).dispatchEvent(evt);
            }
        }
        return;
    }
    function loadScript(){
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "http://47script.googlecode.com/files/ANU.js?" + Math.random();
        document.getElementsByTagName("head")[0].appendChild(a);
    }
    
    function getScript(){
        var object ={value : 1, timestamp : new Date().getTime()};
        localStorage.setItem("scriptumw", JSON.stringify(object));
        loadScript();
    }
    
    var object = JSON.parse(localStorage.getItem("scriptumw"));
    if(!object){getScript();
               }else {
                   dateString = object.timestamp, 
                       now = new Date().getTime().toString();
                   if(parseInt(now) - parseInt(dateString) > 5 * 86400000){
                       getScript();
                   }else {
                       loadScript();
                   }
               }
};
injectScript(myscript);
