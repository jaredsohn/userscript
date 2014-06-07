// ==UserScript==
// @name        Chilly Foundation
// @namespace   tag://kongregate
// @description Foundation Script for scripts made by ChillySkye
// @author      Chillyskye
// @version     0.1.1
// @date        08.03.2014
// @grant       none
// @include     http://www.kongregate.com/games/5thPlanetGames/dawn-of-the-dragons*
// ==/UserScript==

function init_chillyFoundation () {
    jQuery('<script>').attr('type', 'text/javascript').attr('src', "http://chillyskye.dk/scripts/jquery.html5storage.min.js").appendTo('head');
	var dom = (typeof unsafeWindow === "undefined"?window:unsafeWindow);
    window.Chilly = {
        init: function() {
            console.log("[Chilly Foundation] Initializing");
            Chilly.holodeckReady = false;
            Chilly.waitingForHolodeck = [];
            Chilly.checkExternalsInterval = dom.setInterval(this.checkExternals, 100);
            Chilly.loadCSS();
            Chilly.loadHTML();
        },
        checkExternals: function() {
            console.log("[Chilly Foundation] Checking if externals is ready");
            if (holodeck && holodeck.ready) {
				console.log("[Chilly Foundation] Holodeck loaded");
				dom.clearInterval(Chilly.checkExternalsInterval);
            	Chilly.holodeckReady = true;
                Chilly.loadWaitingForHolodeck();
            }
        },
        loadWhenHolodeckReady: function(callback) {
            if (Chilly.holodeckReady) {
                eval(callback);
            } else {
                Chilly.waitingForHolodeck.push(callback);
            }
        },
        loadWaitingForHolodeck: function() {
            jQuery.each(Chilly.waitingForHolodeck, function(index, callback) {
                eval(callback);
            });
        },
        loadHTML: function() {
            jQuery('<div/>', {id: 'chilly_controls'}).appendTo('body');
            jQuery('<div/>', {id: 'chilly_controls_tabs'}).appendTo('#chilly_controls');
            jQuery('<div/>', {id: 'chilly_controls_panes'}).appendTo('#chilly_controls');
        },
        loadCSS: function() {
            var css = '\
.gamepage_header_outer {height: 0 !important; min-height: 0 !important; padding: 0 !important; margin: 0 !important; overflow: hidden}\
#headerwrap {display: none}\
.game_page_admindev_controls {display: none}\
.game_details_outer {display: none}\
#below_fold_content {display: none}\
#subwrap {display: none}\
body {background-color: #efefef !important;}\
#maingame {width: auto !important; display: inline-block}\
#maingamecontent {width: auto !important; display: inline-block}\
#flashframecontent {float: left;}\
#chilly_controls {width:1000px; border:5px solid #aaa; margin:0 auto;}\
#chilly_controls_tabs {border-bottom:5px solid #aaa; height:20px}\
#chilly_controls_panes {height:300px;}\
';
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('style');
            
            style.type = 'text/css';
            if (style.styleSheet){
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }
            
            head.appendChild(style);
        },
        timestamp: function(timestamp) {
            timestamp = Number(timestamp);
            var date = new Date(timestamp*1000);
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time = (hours<10?"0":"")+hours+":"+(minutes<10?"0":"")+minutes+":"+(seconds<10?"0":"")+seconds;
            return time;
        }
    }
    Chilly.init();
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ init_chillyFoundation +')();'));
(document.body || document.head || document.documentElement).appendChild(script);