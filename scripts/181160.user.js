// ==UserScript==
// @name       FlashFullScreen
// @match      *://*/*
// ==/UserScript==
(function () {
    /*
    function getOffset(e) {
        var offset;
        if (e.offsetParent) {
            offset = getOffset(e.offsetParent);
        } else {
            offset = {
                left: 0,
                top: 0
            };
        }
        return {
            left: e.offsetLeft + offset.left,
            top: e.offsetTop + offset.top
        };
    }
    */
    var FlashFullScreen = {
        div: null,
        flash: null,
        old: null,
        debug: false,
        addSwitch: function (e) {
            var FlashFullScreen = this;
            if (FlashFullScreen.div || FlashFullScreen.old)
                return;
            if (e.nodeName.toLowerCase() !== 'embed' && e.nodeName.toLowerCase() !== 'object')
                return;
            FlashFullScreen.flash = e;
            FlashFullScreen.div = document.createElement('div');
            FlashFullScreen.div.style.position = 'absolute';
            FlashFullScreen.div.style.top = e.offsetTop - 20 + 'px';
            FlashFullScreen.div.style.left = e.offsetLeft + 'px';
            FlashFullScreen.div.style.zIndex = '20000';
            FlashFullScreen.div.style.background = 'red';
            FlashFullScreen.div.style.height = '20px';
            FlashFullScreen.div.style.width = '20px';
            FlashFullScreen.div.style.margin = 0;
            FlashFullScreen.div.style.padding = 0;
            FlashFullScreen.div.className = 'FullScreen';
            FlashFullScreen.div.onclick = FlashFullScreen.switchFullScreen;
            (e.parentNode ? e.parentNode : document.body).appendChild(FlashFullScreen.div);
            var p = e.offsetParent;
            while (p && p.offsetTop === 0) p = p.offsetParent;
            if (p) {
                p.style.overflow = 'visible';
            }
            if (FlashFullScreen.debug) console.log('add switch', e, FlashFullScreen.div);
        },
        removeSwitch: function () {
            var FlashFullScreen = this;
            if (FlashFullScreen.div && !FlashFullScreen.old) {
                FlashFullScreen.div.parentNode.removeChild(FlashFullScreen.div);
                delete FlashFullScreen.div;
                delete FlashFullScreen.old;
                FlashFullScreen.div = null;
            }
            FlashFullScreen.flash = null;
            if (FlashFullScreen.debug) console.log('remove switch');
        },
        getFlashParent: function () {
            if (FlashFullScreen.flash) {
                if (FlashFullScreen.flash.parentNode) {
                    if (FlashFullScreen.flash.parentNode.nodeName.toLowerCase() == 'object')
                        return FlashFullScreen.flash.parentNode.parentNode;
                    else
                        return FlashFullScreen.flash.parentNode;
                } else
                    return document.body;
            } else
                return null;
        },
        exitFullScreen: function () {
            if (FlashFullScreen.old) {
                FlashFullScreen.old.flash.style.width = FlashFullScreen.old.width;
                FlashFullScreen.old.flash.style.height = FlashFullScreen.old.height;
                var p = FlashFullScreen.old.p;
                if (p) {
                    p.style.width = FlashFullScreen.old.pwidth;
                    p.style.height = FlashFullScreen.old.pheight;
                    p.style.position = FlashFullScreen.old.pposition;
                    p.style.overflow = FlashFullScreen.old.poverflow;
                    p.style.margin = FlashFullScreen.old.pmargin;
                    p.style.padding = FlashFullScreen.old.ppadding;
                    p.style.top = FlashFullScreen.old.ptop;
                    p.style.left = FlashFullScreen.old.pleft;
                    p.style.lineHeight = FlashFullScreen.old.plineHeight;
                    p.style.zIndex = FlashFullScreen.old.pzIndex;
                }

                for (var i = 0; i < FlashFullScreen.old.iframes.length; i++) {
                    FlashFullScreen.old.iframes[i].iframe.style.display =
                            FlashFullScreen.old.iframes[i].display;
                }

                delete FlashFullScreen.old;
                if (FlashFullScreen.debug) console.log('exit fullscreen');
            }
        },
        switchFullScreen: function () {
            var p = FlashFullScreen.getFlashParent();
            if (p) {
                FlashFullScreen.old = new Object();
                FlashFullScreen.old.flash = FlashFullScreen.flash;
                FlashFullScreen.old.width = FlashFullScreen.flash.style.width;
                FlashFullScreen.old.height = FlashFullScreen.flash.style.height;
                FlashFullScreen.flash.style.width = '100%';
                FlashFullScreen.flash.style.height = '100%';
                if (p) {
                    FlashFullScreen.old.p = p;
                    FlashFullScreen.old.pwidth = p.style.width;
                    FlashFullScreen.old.pheight = p.style.height;
                    FlashFullScreen.old.pposition = p.style.position;
                    FlashFullScreen.old.poverflow = p.style.overflow;
                    FlashFullScreen.old.pmargin = p.style.margin;
                    FlashFullScreen.old.ppadding = p.style.padding;
                    FlashFullScreen.old.ptop = p.style.top;
                    FlashFullScreen.old.pleft = p.style.left;
                    FlashFullScreen.old.plineHeight = p.style.lineHeight;
                    FlashFullScreen.old.pzIndex = p.style.zIndex;
                    p.style.width = '100%';
                    p.style.height = '100%';
                    p.style.position = 'fixed';
                    p.style.overflow = 'hidden';
                    p.style.margin = '0px';
                    p.style.padding = '0px';
                    p.style.top = '0px';
                    p.style.left = '0px';
                    p.style.lineHeight = '0px';
                    p.style.zIndex = 9999
                }
                //隐藏页面上的iframe 因为其会遮挡flash  附加flash隐藏
                FlashFullScreen.old.iframes = Array();
                var iframes = Array.prototype.slice.call(document.getElementsByTagName('iframe'), 0);
                var embeds = Array.prototype.slice.call(document.getElementsByTagName('embed'), 0);
                var objects = Array.prototype.slice.call(document.getElementsByTagName('object'), 0);
                iframes = iframes.concat(embeds, objects);
                for (var i = 0; i < iframes.length; i++) {
                    if (iframes[i].style.display == 'none')
                        continue;
                    if (iframes[i] == FlashFullScreen.flash || iframes[i] == FlashFullScreen.flash.parentElement)
                        continue;
                    FlashFullScreen.old.iframes.push({
                        display: iframes[i].style.display.slice(0),
                        iframe: iframes[i]
                    });
                    iframes[i].style.display = 'none';
                }
                if (FlashFullScreen.debug) console.log('enter fullscreen');
               	FlashFullScreen.div.style.display = 'none';
            }
        },
        init: function () {
            var FlashFullScreen = this;
            window.addEventListener('keyup', function (e) {
                if (e.which === 27) {//esc
                    if (FlashFullScreen.debug) console.log('esc pressed');
                    FlashFullScreen.exitFullScreen();
                }
            }, false);
            window.addEventListener('mouseover', function (e) {
                if (FlashFullScreen.div) {
                    if (e.target !== FlashFullScreen.div && e.target !== FlashFullScreen.flash) {
                        FlashFullScreen.removeSwitch();
                    }
                } else {
                    FlashFullScreen.addSwitch(e.target);
                    if (FlashFullScreen.debug) console.log(e.target);
                }
            }, false);
        }
    };
    FlashFullScreen.init();
})();