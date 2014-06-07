// ==UserScript==
// @name        Youtube HTML5 Player
// @namespace   Synvie
// @description Youtube html5 Player
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @version     Alpha 0.01
// ==/UserScript==

function removeFlash(){
    try{
        if(!navigator.plugins['Shockwave Flash']){
            window.ytspf = window.spf || {};
            Object.defineProperties(window.ytspf,{
                'enabled':{value:false}
            });
        }
        window.ytplayer = window.ytplayer || {};
        Object.defineProperties(window.ytplayer,{
            '__protos__':{
                writable: true,
                configurable: true
            },
            'config':{
                configurable: true,
                enumerable: true,
                set: function(p){
                    this.__protos__=p;
                },
                get: function(){
                    this.__protos__.html5=true;
                    this.__protos__.args.autohide=1;
                    delete this.__protos__.args.ad3_module;
                    return this.__protos__;
                }
            }
        });
    }catch(e){}
}

window.addEventListener('beforescriptexecute',removeFlash,true);