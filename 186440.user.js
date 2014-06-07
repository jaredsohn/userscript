// ==UserScript==
// @name           mark downloaded magnet links
// @namespace      it.eztv
// @include        https://eztv.it/*
// @include        http://eztv.it/*
// ==/UserScript==

var ezHL = function(ob){
    ob.style.backgroundColor = "#00ff00";
    ob.style.padding = "2px";  
}

var storedObject = JSON.parse( GM_getValue("lkvworvwbleunwkeuch", '{ "items": [] }') ); 


if(storedObject.items.length>0){
    var needles = new RegExp(storedObject.items.join("|"),"g");
	console.log(needles);
    var _anchors = unsafeWindow.document.getElementsByTagName('a');
    for(var _a in _anchors) {
        _anchor = _anchors[_a];
        if(!_anchor.hasOwnProperty('href')) continue;
        if(_anchor.href.toString().match(needles)){
            ezHL(_anchor);
        }
    }
}
if(!storedObject) {
    storedObject = { items: [] };
} else {    
    unsafeWindow.document.addEventListener("click", 
                                           function (event) {
                                               if(!(event.target.hasOwnProperty("href"))) return;
                                               var _t = event.target.href.match(/[0-9A-Z]{32}/);
                                               if(!_t) return;
                                               _t = _t[0];
                                               GM_log(_t); 
                                               if(storedObject.items.indexOf(_t)<0) storedObject.items.push(_t);
                                               ezHL(event.target);
                                               GM_setValue("lkvworvwbleunwkeuch", JSON.stringify(storedObject))
                                           }
                                          );
}
