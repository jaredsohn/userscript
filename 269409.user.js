// ==UserScript==
// @name 54xr.plug - 54闲人吧
// @version 1.1.3
// @description 54闲人吧增强插件
// @downloadURL http://userscripts.org/scripts/source/269409.user.js
// @updateURL http://userscripts.org/scripts/source/269409.meta.js
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright 2014 rose1988.c@gmail.com
// @author rose1988.c@gmail.com
// @include http://*54xr*
// @include http://*xrb*
// @grant  GM_addStyle
// ==/UserScript==

;(function (){
        
        var CONSTANTS = {
                'localurl' : window.location.href,
                'localhost' : window.location.host,
                'regularCat' : /hash/gi,
                'regularXr' : /54xr\.com|xrba\.net/gi,
        };
        
        var PLANETWORK = {
                isPlanetHasWater : function () {
                    return CONSTANTS.regularXr.test(CONSTANTS.localurl);
                },
                Mercury : function () {
                    $('center').remove();
                    $('.gen-1').remove();
                    $(".textwidget").remove();
                    $("#aa").remove();
                    $("#post-5620").remove();
                    
                    //h3 sider
                    var h3 = $("h3");
                    h3[0].remove();
                    h3[1].remove();

                    //box ad
                    for (var i = 10; i >= 0; i--) {
                        var temp = $("#box-" + i);
                        if (temp.length){
                            temp.remove();
                        }
                    };
                },
                Venus : function () {
                },
                Earth : function () {
                },
                Mars : function () {},
                Jupiter : function () {},
                Saturn : function () {},
                Uranus : function () {},
                Neptune : function () {},
                Pluto : function () {},
                Solar : function () {
                        var isPlanetHasWater = this.isPlanetHasWater();
                        if (isPlanetHasWater) {
                            this.Mercury();
                        }
                }
        };

        //helper
        if (!Array.prototype.forEach) {  
            Array.prototype.forEach = function(callback, thisArg) {  
                var T, k;  
                if (this == null) {  
                    throw new TypeError(" this is null or not defined");  
                }  
                var O = Object(this);  
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32  
                if ({}.toString.call(callback) != "[object Function]") {  
                    throw new TypeError(callback + " is not a function");  
                }  
                if (thisArg) {  
                    T = thisArg;  
                }  
                k = 0;  
                while (k < len) {  
                    var kValue;  
                    if (k in O) {  
                        kValue = O[k];  
                        callback.call(T, kValue, k, O);  
                    }  
                    k++;  
                }  
            };  
        }  
    
    
        // GM_addStyle function is not existed in chrome 27
        var GM_addStyle = GM_addStyle || function(css) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.appendChild(document.createTextNode(css));
            document.getElementsByTagName("head")[0].appendChild(style);
        };

        // 增加自定义样式
        GM_addStyle("\
			#aa #post-5620 {\
				display:none;\
			}\
		");
        
        //太阳系行星工作
    $(document).ready(function(){
        PLANETWORK.Solar();
    });
        
})();