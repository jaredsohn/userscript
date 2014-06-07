// ==UserScript==
// @name           Facebookify
// @namespace      http://userscripts.org/scripts/show/124608
// @description    Adds FB object from Facebook's all.js, useful when surfing with SRWare Iron browser because we receive undefined FB object error on various sites with it.
// @include        http://*
// @include        https://*
// ==/UserScript==

function addEvent( obj, type, fn ) {
    if (obj.addEventListener) {
        obj.addEventListener( type, fn, false );
        EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
        obj["e"+type+fn] = fn;
        obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
        obj.attachEvent( "on"+type, obj[type+fn] );
        EventCache.add(obj, type, fn);
    }
    else {
        obj["on"+type] = obj["e"+type+fn];
    }
}

var EventCache = function(){
    var listEvents = [];
    return {
        listEvents : listEvents,
        add : function(node, sEventName, fHandler){
            listEvents.push(arguments);
        },
        flush : function(){
            var i, item;
            for(i = listEvents.length - 1; i >= 0; i = i - 1){
                item = listEvents[i];
                if(item[0].removeEventListener){
                    item[0].removeEventListener(item[1], item[2], item[3]);
                };
                if(item[1].substring(0, 2) != "on"){
                    item[1] = "on" + item[1];
                };
                if(item[0].detachEvent){
                    item[0].detachEvent(item[1], item[2]);
                };
                item[0][item[1]] = null;
            };
        }
    };
}();

addEvent(window,'unload',EventCache.flush);
addEvent(window,'load', function(){

   if (typeof window.FB == 'object') return;

   var js = document.createElement('script');
   js.id = 'facebook-jssdk';
   js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";

   root_node = document.createElement('div');
   root_node.id = 'fb-root';

   document.getElementsByTagName('body')[0].appendChild(root_node);
   document.getElementsByTagName('head')[0].appendChild(js);

});
