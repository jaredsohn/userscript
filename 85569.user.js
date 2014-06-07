// ==UserScript==
// @name           haikyo_ja_nai_tokei
// @namespace      madin.jp
// @include        http://commons.wikimedia.org/wiki/Time_on_clocks_and_watches
// ==/UserScript==


var HaikyoJaNaiDisplay = function (iframe) {
    this.iframe = iframe;
    with (this.iframe.style) {
        position = 'absolute';
        left = 0;
        top = 0;
    }
    this.resize();
    this.img = document.createElement('IMG');
    this.infoDiv = document.createElement('DIV');
    document.body.appendChild(this.img);
    document.body.appendChild(this.infoDiv);
    
}
HaikyoJaNaiDisplay.prototype = {
    load: function (url) {
        this.iframe.src = url;
    
    },
    resize: function () {
        this.iframe.width = window.innerWidth + 'px';
        this.iframe.height = window.innerHeight + 'px';
    },
    onIframeLoad: function () {    }
};

var HaikyoJaNai = {
    getClocks: function () {
        var ps = document.getElementsByTagName('P');
        var LABEL_REGEXP = new RegExp('^[0-2][0-9]\:[0-5][0-9]$');
        var clocks = new Array();
        for (var i=0; i<ps.length; i++) {
            var label = ps[i].innerHTML;
            if (LABEL_REGEXP.test(label)) {
                var url;
                var as = ps[i].parentNode.parentNode.getElementsByTagName('A');
                if (as.length > 0) url = as[0].href;
                else continue;
                var parts = label.split(':');
                var min = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                if (!clocks[min]) clocks[min] = new Array();
                clocks[min].push (url);
            
            }
        }
        return clocks;
    
    }
};

(function (){    
    var iframe = document.createElement('IFRAME');
    //iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var display = new HaikyoJaNaiDisplay(iframe);
    var clocks = HaikyoJaNai.getClocks();
    var hour12 = -1;
    var min = -1;
    setInterval (function () {
        var _now = new Date();
        var _hour12 = _now.getHours() % 12;
        var _min = _now.getMinutes();
        if (_hour12 == hour12 && min == _min) return;
        hour12 = _hour12;
        min = _min;
        index = _hour12 * 60 + min;
        if (!clocks[index]) return;
        var ary = clocks[index];
        var url = ary[Math.floor(Math.random() * ary.length)];
        display.load(url);
    }, 1000);
    
})();