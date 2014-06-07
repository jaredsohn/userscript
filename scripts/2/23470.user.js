// ==UserScript==
// @name           InFullVolume
// @namespace      http://polog.org/
// @description    music visualizer for any website
// @include        http://*
// @include        https://*
// @require        http://gist.github.com/3242.txt
// @updated        2009-10-04 23:15:00
// ==/UserScript==
// using $X by os0x

var w = unsafeWindow;
const SWF_URL = "http://polog.org/lab/full-volume/test/mic.swf";
const SITE_INFO_URL = 'http://wedata.net/databases/InFullVolume/items.json';
var SITE_INFO = [
/*
    {
        pattern: '',
        elements: ''
    },
*/
];

var elementList = function(exp){
    this.objs = $X(exp);
    this.elements = [];
    for(var i = 0; i < this.objs.length; i+= 1){
        var obj = this.objs[i];
        this.elements.push(new elementSingle(obj));
        if(i != 0)
            this.elements[i - 1].setNextElement(this.elements[i]);
    }
    var self = this;
    if(self.elements[0])
        setInterval(function(){self.elements[0].triggerMove()}, 100);
}

var elementSingle = function(element){
    this.element = element;
    this.buf_level = this.level = 1.0;
    var self = this;
    this.dimensions = {
        width: this.element.offsetWidth,
        height: this.element.offsetHeight
    };
    this.element.style.overflow = "hidden";
    this.element.style.width = this.dimensions.width + "px";
    this.element.style.height = this.dimensions.height + "px";

    this.kicker = setInterval(function(){
        if(typeof(mic_activityLevel) == "object" &&
                !mic_activityLevel)
            return;
        this.effect = setInterval(function(){self.move()}, 50);
        clearInterval(self.kicker);
    }, 1000);
}
elementSingle.prototype.setNextElement = function(nextElement){
    this.nextElement = nextElement;
}
elementSingle.prototype.setLevel = function(level){
    var next = this.nextElement;
    if(next){
        var self = this;
        setTimeout(function(){next.setLevel(self.buf_level)}, 100);
    }
    this.buf_level = this.level = level;
}
elementSingle.prototype.move = function(){
    if(
        typeof(mic_activityLevel) == "object" &&
        !mic_activityLevel
      )
        return;

    this.element.style.width = Math.round(this.dimensions.width * this.level) + 'px';
    this.level = this.level * 0.8;
}
elementSingle.prototype.triggerMove = function(){
    var activityLevel = mic_activityLevel * 0.1;
    activityLevel = (activityLevel > 1.0) ? 1.0 : activityLevel;
    if(activityLevel > this.level)
        this.setLevel(activityLevel);
}

w.elementSingle = elementSingle;


var div = unsafeWindow.document.createElement("div");
var init_embed = function(){
    var embed = unsafeWindow.document.createElement("embed");
    embed.src = SWF_URL;
    embed.width = "300px";
    embed.height = "200px";
    embed.name = "mic";
    embed.id = "mic";
    embed.setAttribute("allowScriptAccess", "always");
    embed.setAttribute("wmode", "transparent");
    div.style.zIndex = "10000";
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.right = "0px";
    div.appendChild(embed);
    unsafeWindow.document.body.appendChild(div);
}

var mic_activityLevel = null;
unsafeWindow.mic_DoFSCommand = function(command, args) {
    if(!args.match(/^\d*$/))
        return;
    mic_activityLevel = eval(args);
    if(mic_activityLevel && div.style.top != "-9999px"){
        div.style.top = "-9999px";
        div.style.left = "-9999px";
    }
}

unsafeWindow.InFullVolume_getMicActivityLevel = function(){
    return mic_activityLevel;
}

// based on Autopagerize old script...
var SiteInfo = function() {
    this.entries = [];
};

SiteInfo.prototype.get = function(url, callback) {
    var self = this;
    var cacheInfo;
    if(cacheInfo = Cache.get('cacheInfo')) {
        self.entries = cacheInfo;
        callback(self.entries);
    } else {
        GM_xmlhttpRequest({
            method : "GET",
            url : url,
            onload : function(res) {
                self.entries = eval(res.responseText).map(function(e){return e.data});
                callback(self.entries);

                Cache.set('cacheInfo', self.entries, 24 * 60 * 60 * 1000) // 1 day
            }
        });
    }
};

SiteInfo.prototype.clearCache = function() {
    Cache.set('cacheInfo', null, 0);
};

var Cache = {};

Cache.set = function(key, value, expire) {
    var expire = new Date().getTime() + expire;
    GM_setValue(key, uneval({ value: value, expire: expire }));
}

Cache.get = function(key) {
    var cached = eval(GM_getValue(key));
    if(!cached) {
        return null;
    }

    if(cached.expire > new Date().getTime()) {
        return cached.value;
    }

    return null;
}

var elements;
var siteInfo = new SiteInfo();
unsafeWindow.addEventListener('load', function(){
    siteInfo.get(SITE_INFO_URL, function(entries) {
        entries = SITE_INFO.concat(entries);
        entries.some(function(entry) {
            if(location.href.match(entry.pattern) &&
               $X(entry.elements).length >= 0) {
                new elementList(entry.elements);
                init_embed();
                return true;
            }
            return false;
        });
    });
}, false);

GM_registerMenuCommand('InFullVolume - clear cache', siteInfo.clearCache)
