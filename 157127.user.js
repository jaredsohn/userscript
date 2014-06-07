// ==UserScript==
// @name BBAW Chat
// @description A bettter chat addon!
// @namespace      http*://*.alliances.commandandconquer.com/*
// @include        http*://*.alliances.commandandconquer.com/*
// @version 0.2.1
// @author Sadoij
// @grant none
// ==/UserScript==
(function () {
    var injectFunction = function () {
        
        var setup = function(){
            
            var old_AddMsg = ClientLib.Data.Chat.prototype.AddMsg;
            
            ClientLib.Data.Chat.prototype.AddMsg = function(){
                
                arguments[0] = updateMessage(arguments[0]);
                
                return old_AddMsg.apply(this, arguments);
            };
        };
        
        function updateMessage(message){
            
            // shorthand for alliance
            message = message.replace(/\[a\]([a-z0-9_\-\s]+)\[\/a\]/gi, '[alliance]$1[/alliance]');
            // shorthand for player
            message = message.replace(/\[p\]([a-z0-9_\-\s]+)\[\/p\]/gi, '[player]$1[/player]');
            
            // shorthand for coordinates
            message = message.replace(/(\[c\]){1,1}([0-9]{3})[:|.]([0-9]{3})([:|.][\w\d\s]+)?(\[\/c\]){1,1}/gi, "[coords]\$2:\$3\$4[/coords]")
            
            message = message.replace(/(\[coords\]){0,1}([0-9]{3})[:|.]([0-9]{3})([:|.]([\d\w]+){1}([\d\w\s]+)?)?(\[\/coords\]){0,1}/gi, function(){
                var result = new Array();
                result.push('[coords]');
                result.push(arguments[2]);
                result.push(':');
                result.push(arguments[3]);
                if(arguments[5] !== undefined) {
                    result.push(arguments[4].replace('.',':'));
                }
                
                result.push('[/coords]');
                return result.join('');
            });
            
            // auto url
            message = message.replace(/(\[url\])*(https?:\/\/)?(.[\da-z-]+)(\.[a-z]{2,6})([\/\w\.\-\=\?\&#]*)*\/?(\[\/url\])*/gi, function(){
                var result = new Array();
                result.push(' [url]');
                result.push(arguments[2]); // http[s]://
                result.push(arguments[3]); // domain
                result.push(arguments[4]); // ext
                result.push(arguments[5]); // query string
                result.push('[/url]');
                return result.join('');
                
            });
            
            return message;
            
        }
        
        function log(){
            if (typeof console != 'undefined')
            { 
                console.log("Chat addon", arguments);
            }
        }
        
        function waitForGame() {
            try {
                if (typeof qx != 'undefined' && typeof qx.core != 'undfined' && typeof qx.core.Init != 'undefined') {
                    var app = qx.core.Init.getApplication();
                    if (app.initDone == true) {
                        try {
                            setup();
                        }
                        catch (e) {
                            log("BBAW Chat init error", e);
                        }
                    }
                    else {
                        window.setTimeout(waitForGame, 1000);
                    }
                }
                else {
                    window.setTimeout(waitForGame, 1000);
                }
            }
            catch (e) {
                log("BBAW Chat init error", e);
            }
        }
        
        window.setTimeout(waitForGame, 1000);
    };
    
    var script = document.createElement("script");
    var txt = injectFunction.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    
    document.getElementsByTagName("head")[0].appendChild(script);
})();