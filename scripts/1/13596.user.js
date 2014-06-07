// ==UserScript==
// @name           iplay browse page nfo button
// @namespace      torrent.details
// @include        http://www.iplay.ro/browse.php*
// @include        http://www.iplay.ro/browseadult.php*
// ==/UserScript==

function $x(q, doc) {
    doc = doc || document;
    return document.evaluate(
        q,
        document, 
        null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
}
function TEXT(str){
    return document.createTextNode(str);
}
function EL(type,atr){
    el=document.createElement(type);
    for (var i=2; i<arguments.length; i++) {
        var child=arguments[i];
        if (child) { 
            if (typeof(child)=='string') {
                el.appendChild(TEXT(child));
            } else {
                el.appendChild(child);
            }
        }
    }
    for (var prop in atr) {
        if (atr[prop]) { 
            if (prop=='class') {
                el.className=atr[prop];
            } else if (prop.slice(0,3) == 'on_') {
                el.addEventListener(prop.slice(3), atr[prop], false);
            } else if (prop=='style'&&typeof(atr[prop])=='object') {
                for(var subprop in atr[prop]) {
                    el.style[subprop] = atr[prop][subprop];
                }
            } else 
                el.setAttribute(prop,atr[prop]);
        }
    }
    return el;
}

    
var anchors = $x("//a[starts-with(@href, 'download.php') and substring-after(@href, '.torrent')='']")
var pre_start = '<pre style="font-size:10pt; font-family: \'Courier New\', monospace;">';
var pre_end = '</pre>';

//~ imgLoader = new Image();// preload image
//~ imgLoader.src = tb_pathToImage;

function tb_show(caption) {
    if (typeof document.body.style.maxHeight === "undefined") {//if IE 6
        $("body","html").css({height: "100%", width: "100%"});
        $("html").css("overflow","hidden");
        if (document.getElementById("TB_HideSelect") === null) {//iframe to hide select elements in ie6
            $("body").append("<iframe id='TB_HideSelect'></iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
            $("#TB_overlay").click(tb_remove);
        }
    }else{//all others
        if(document.getElementById("TB_overlay") === null){
            $("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
            $("#TB_overlay").click(tb_remove);
        }
    }
    
    if(tb_detectMacXFF()){
        $("#TB_overlay").addClass("TB_overlayMacFFBGHack");//use png overlay so hide flash
    }else{
        $("#TB_overlay").addClass("TB_overlayBG");//use background and opacity
    }
    if(caption===null){caption="";}
    $("body").append("<div id='TB_load'></div>");//add loader to the page
    $('#TB_load').show();//show loader
    
    
    TB_WIDTH = 915;
    TB_HEIGHT = 440;
    ajaxContentW = TB_WIDTH - 30;
    ajaxContentH = TB_HEIGHT - 45;
            
            
    if($("#TB_window").css("display") != "block"){
        $("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>"+caption+"</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'>close</a> or Esc Key</div></div><div id='TB_ajaxContent' style='width:"+ajaxContentW+"px;height:"+ajaxContentH+"px'></div>");
    }else{//this means the window is already up, we are just loading new content via ajax
        $("#TB_ajaxContent")[0].style.width = ajaxContentW +"px";
        $("#TB_ajaxContent")[0].style.height = ajaxContentH +"px";
        $("#TB_ajaxContent")[0].scrollTop = 0;
        $("#TB_ajaxWindowTitle").html(caption);
    }
    
    $("#TB_closeWindowButton").click(tb_remove);
            
    document.addEventListener('keyup', function(e){ 	
        if (e == null) { // ie
            keycode = event.keyCode;
        } else { // mozilla
            keycode = e.which;
        }
        if(keycode == 27){ // close
            tb_remove();
        }	
    }, false);
    return function(content) {
        $("#TB_ajaxContent").append(content);
        tb_position();
        $("#TB_load").remove();
        $("#TB_window").css({display:"block"}); 
    }
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.2.1.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(GM_wait,100); 
    } else { 
        jQuery = $ = unsafeWindow.jQuery; run(); 
    }
}
GM_wait();

function run() {
    $('head').append('<style type="text/css" media="all">#TB_window { font: 12px Arial, Helvetica, sans-serif; color: #333333; }  #TB_secondLine { font: 10px Arial, Helvetica, sans-serif; color:#666666; }  #TB_window a:link {color: #666666;} #TB_window a:visited {color: #666666;} #TB_window a:hover {color: #000;} #TB_window a:active {color: #666666;} #TB_window a:focus{color: #666666;}  #TB_overlay { position: fixed; z-index:100; top: 0px; left: 0px; height:100%; width:100%; }  .TB_overlayMacFFBGHack {background: url(macFFBgHack.png) repeat;} .TB_overlayBG { background-color:#000; filter:alpha(opacity=75); -moz-opacity: 0.75; opacity: 0.75; }  * html #TB_overlay { /* ie6 hack */      position: absolute;      height: expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + \'px\'); }  #TB_window { position: fixed; background: #ffffff; z-index: 102; color:#000000; display:none; border: 4px solid #525252; text-align:left; top:50%; left:50%; }  * html #TB_window { /* ie6 hack */ position: absolute; margin-top: expression(0 - parseInt(this.offsetHeight / 2) + (TBWindowMargin = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop) + \'px\'); }  #TB_window img#TB_Image { display:block; margin: 15px 0 0 15px; border-right: 1px solid #ccc; border-bottom: 1px solid #ccc; border-top: 1px solid #666; border-left: 1px solid #666; }  #TB_caption{ height:25px; padding:7px 30px 10px 25px; float:left; }  #TB_closeWindow{ height:25px; padding:11px 25px 10px 0; float:right; }  #TB_closeAjaxWindow{ padding:7px 10px 5px 0; margin-bottom:1px; text-align:right; float:right; }  #TB_ajaxWindowTitle{ float:left; padding:7px 0 5px 10px; margin-bottom:1px; }  #TB_title{ background-color:#e8e8e8; height:27px; }  #TB_ajaxContent{ clear:both; padding:2px 15px 15px 15px; overflow:auto; text-align:left; }  #TB_ajaxContent.TB_modal{ padding:15px; }  #TB_ajaxContent p{ padding:5px 0px 5px 0px; }  #TB_load{ position: fixed; display:none; height:13px; width:208px; z-index:103; top: 50%; left: 50%; margin: -6px 0 0 -104px; /* -height/2 0 0 -width/2 */ }  * html #TB_load { /* ie6 hack */ position: absolute; margin-top: expression(0 - parseInt(this.offsetHeight / 2) + (TBWindowMargin = document.documentElement && document.documentElement.scrollTop || document.body.scrollTop) + \'px\'); }  #TB_HideSelect{ z-index:99; position:fixed; top: 0; left: 0; background-color:#fff; border:none; filter:alpha(opacity=0); -moz-opacity: 0; opacity: 0; height:100%; width:100%; }  * html #TB_HideSelect { /* ie6 hack */      position: absolute;      height: expression(document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + \'px\'); }  #TB_iframeContent{ clear:both; border:none; margin-bottom:-1px; margin-top:1px; _margin-bottom:1px; } #TB_load { background-image: url("data:image/gif;base64,R0lGODlh0AANAMQAAPv7+/f39/Pz8+/v7+rq6ubm5uLi4t7e3tra2tbW1tLS0s7OzsrKysXFxcHBwb29vbm5ubW1tbGxsampqf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAUACwAAAAA0AANAAAF/yDFQFJpnmiqrmzrvnAsz3RtvxAjNk7P/IwGBNIr9nKLpHJENB4ZymjT6UBGk0NqFXpdTJ3W69cYlmq3Xe+5rMxS2djxMy1/BoGNEcPBSCQQBwd3g1B5gYeBC3xLSYaIiYuMjo+KXEuTiIqMjQyPkFFcmIeVXVCeB5pJlqKfoAusqA6lsKSSnYEIfgcksgcGBQQEBg0KfsYJCgzBy8HDxcfIyszBBZbQ0tMG1sfYzNXP19PU28bdy9VKx8niBNXQ5eza6cbr4trg3Ozf7wvmwAglOhlglgSQwUAMDAhYyFBAQU8JGzJ8+CiiRIe6Kiq8SBGRRYkdD31sGBLhRpAZPf+eJLkAkMaLGBNAXDmx5UyYC0ooGMgQ1Sk/AYIKDWBgwc8EQ4UWPZo06FJPQJs+fRQ16VREVYdePZRVqVGoSKV+pRrW6lisZbWe5ZrWq84CA4I6PIWKIYC7AOaeYmAXr15PCwTg9bt2lODBeQsnOjz4LyXGhOnyRZyYbmDKjjNBvpvZ8MLGiut+vhtg7tu4AVJmKtA0tUzArJuqHkUz6OxEBlobA5xb9u0FsZPeRlXb9evVuo9nKj58QW/hykcFH6rrNFHFXe8WwN5WO/ek3pkODQ8WPIDtRymf564effnx69NTdk/WPH207b+eJnAL8ObEB3n0HwDYXYZYZwgNWOCHfwgKomCAIjEYmoGgQZggZhNKaCECFBLmkgQQBEIAMqc4J5FtCpT4HHXRmXRiainylpyKusVICXM2LjfjTDtq1KNKP4q0kXA25tAAAYJsqEBrWwWCDJPYLSmWklC6hFaVB1iZpZRmUTnle2b9xKVaXnYJJpkI6TDCDWy26eabcMYpZww5UBACACH5BAUKABQALAEAAQDOAAsAAAX/IEVNYrmcEFSKjgM1K4Wqa/vGc2zjee3yi5TOBVv1Sjue0HczBmlIohLKkjqXUaroWNVSJNrDgeLgNRgxMZnnQK/UZWc7PY6bKGf62pl/19luJXBmgSKDfIUUh3d9gn+IenZbeEUlYAkrBAQGlSUJCYmaBokUn6QEBTEiCQqhqKoLpqqopLIxm7C2mamqrKejvaC3r72twwWJsca3yDGfyysSCysC1SdpCAwGMdaYfgvb1ALXftrc49Pl4SXddObise7rIu3f8xTW6Y7v7Ojy5+T23asn8JYkfAJk0IknTuE3byUCBHDoCAFEehP1GTrwKYZEihsZ9gOp6IBIjCTF/5xEmPKARY8Z6XRsqLHkzJE1xbxsCFCVGDQJI47zeYCUNZ8IFgTtl1PlUnpDFz6lECBqualVm5qcehSb0qdd3yTlatVRTQoAyobEtwLAAJg3NzLgFTFA3JL8REi8OwYc3IslF9CFurLvwHGAf97bm1jGwImJTQ7GZ7ex3xWMF07OrK5n3QJNVwIAAHohYAGkm+5kF9PP3dGlXQP+2PR1apmAYdfOffthDN24f/c2O7s11axElXpUq2gsNeR+tnp+k0B5W7U6rTNNDhb6N7Jnf4JHql2E2/DS4XH/PUBjNQoKNP91t7nyv4bx7Z2Df581X8fcAMBfOZO9l19BmE10oEJcj/2XF0sL4rWYfSIQIEBs1NVEm2ncGLdRdecYEB4rAWL4YXEmGrLSeyMWJ6JMEbJIx2p6BZCiIiQmmKIYINIkQggAIfkEBQoAFAAsAQABAM4ACwAABf8gRUmQ5IjoskAQKp5Q41IqO8OyW7eu4/C61c0HTK2KFNxsN0TSjs0ls0eJSZ0wKbT3yxltvdJJ1LK6DofF2NhgzNBJqcN9PsSD7bd9LVLN9XdGf3WBfRR5hHxPiChwiiqMIo5ydI17UpEUk0E+KBAODYoEBAZeKAkJlSKjBqo0qK4UBAWxCQqxs64LsDOytL22rqy6wb25wKkzo78zxcrMLs4upLW3xtCnyZ4NDXYuAgIqbwgMBjPg4nUL5t/hC3rr5+565fK78Owo6An49vzq+UTs69cunaV6Bf8dDEhhIMAb79rRgKdQoICJ6io2vBjxzD2JHSWl0QgOo6WP+jj/6kElz6RIlBZdSoK5USYalt8C2BzZMuRMjaB6oeuFhkHJlD41HTBqjyiCBRcLEl0aFelUpi4ChHMKtSoFrUnRQG06bqxUeF43hn2adijaGRBIBsB5kiE4ui/tCsCrNF7WuRrFFvBHEGlgGnr52kGIIgDgwgIfP2ynOI1dyScHf1NU0qdYkiozzgAAoEBYvqRNUzwXQLXonK4toS7t+cDs2C9B76TZeTXs2nyPnlXXduvbrMbPsJ0BVs9y5DQPPBdBOlzgNMXXYm2c/GR2rmmbH+ceFnvLvxQU0NObHvJXneonN4bv/m78hczp12Hc0HF7+SI4Vplf+sx1X17y2OKeMn8H9pXYXwbUxltrEoIWoW8F4qZUcBRiGBNwDTqm4U0NgnPha/OdeAZfIlbYk4cbmRMCACH5BAUKABQALAEAAQDOAAsAAAX/ICVSkDSeDHmKDtSs1KKu7bvKEFzDS677t9mpxcP9bCcjzcXTUYg84FA6kumgQSrJNKQgR4eFo5lahcfB8ulMhrHTbnHbLIfT0UmHGlzP70VvSRR/FIFVenF4IymKg18iBAaPIgqEkZMLlTAUBoQUmjCdm6ArojCkIwQFnqgjpkmtIqujnq8nsaqstYQyjwsMBzACmxQIDAbCFAlxyCvDy3TNJ8/MwgvQa8fW2GDaztdu3tPg0cncgOIjAuTZ0ursfO4y5xQCYXH0AgZWa8rC+/j+8QPjb0UAgGYKTkO4Bp4IfQMBKVTHkGC+ioAcUjgYsdDEhxg9nvs1wNomBB3r9aVEOezbpgMMWo57uUDmu5cxTYbbtI6mzYcpw/xUebKmTjM5Xcax6aBBsG/0whTYVg1q1RMBPhZaMNWgVqlUy3mNusDdw69lzV1Vh7brNLRmIRACUKBjMHocA66ga1crX70L+160q9GeYBh/Ew52oxUi48WKYUB4OgJATxgsj57IrHQF55lLNfMZetlzUtB0SAc12nkz68qlG6o+eXoEPQAIFIQzWy/3WhEBfIudJrydsOLdeAtAjo43bt3DR2SFbtwg80LpHl6HqXx7Wq8GQwajTvGwM/Fa8yYkD5JwvntmrjteD0N9Q/YUEvfDb58g/vn3JRMCACH5BAUKABQALAEAAQDOAAsAAAX/ICWKECQ1o7gsJZQ6FISma/nCLl3nIz6PtZTI4ZAJg0IiD8haUnDHXTL2U7GSymgTa9Q5n0WtLfVlPM2pw+Gsa6BHajbTLYzDdI63yB7N19d3c3oUfG2DhYJ/T1F0aYCMh494kYs0MQopCguDBAQGVSIJCZyegxQJm0KdBaCno6oErFEKpAamFLSwBaaipLtCp6mqv8C5KZ22wKimsbfGI6u8C4GhDAZCAgIrdQjW2NoJfwvXKdnbjt7l2gt/6SPm7Ojk7+vt8yLm4Y7j3wv6cBTc4QNnr9+/PQHvUcjHjcGaUBT8YQsQUdzBhQIq1pFYjmI8OAc40tMIEsHFbCTh/5icmJLQAVEsP+4JeTKjzD0w1bVUI3Lgzpc1f+YM1Q2YOWBqTB1tZ1Qb0gNKnTLthxTBTYxXeTbNanVr1atL93kVtzAFAKlpuo5QMEqhAABDZyYoYPDP3G9xXd7tmJcnXXV9QyoMECDwgr/v4F5cc3iiYbeFF0d0S3AfZcOIYfSkAABAgZtq8nb+bBGbZ9AHVupErXok6s2jUYs+bfdi7Nox/7T2+do27X0H8zQgQJVs8bRg0aq8enZz6gUZR3SuDDJ51pDAmi9WK735U+vfx4o9Xh2Yg4fvIhfkK1kgBcIJMDnamz4wfZ/yAd7HiMvuYIr57WEVYvhxw08KhPUnDzhe2x1Yn2T7nZLbfDUZIFuFrGFoV4AYWbjhNx7WkVc2IYIUn2mkzcchibJxSFiKJq4oQIkz7SZCCAAh+QQFCgAUACwBAAEAzgALAAAF/yAFUSTpQFJTkssirtQJqWs7ws4JU/Zd5jNYDyeilYYr4M62UwoXEJ/p9YzidFVprJi9BmsM6+7pYMAOh22N0jCv0OpjzF2Cl9f3d9rxbJ/3ZHQkdn2CFIRrfnpxLGyGiHJ5dYB4j5Q/FClChgQEBoYUCQmcnoaiCqAEBaCiqas7Cagwna8wsamfsKM7qqa3vLUrCQukucKtwKyys8FHhggIDAYwAgItZ9HTK9ULCX/S1NYueuDb4t/aJdzjk+Xq5+TpJNzeegvyFPTo4d375v3x+NUrgWySKGoBePw5aE6hHobqErIbdADiPIk7DiAYOE+AwzcW83mceEgjx3wYH/+erPaRYkiWJNG8TGlw5ciFHNGQFLkTDagA1jIi2Mkt4wGiQb/tKKqUn1CSAAAktbd0arsdQHserdpzKFejE9MkKCDwzz2EIXWSNZf2KL5qbc9uCxB3bcS4b62d9JkXoEG7F/HCCEB3L4+3hf2FoqDgZNQCMSs6BgAZJ8LK2Gy2HLQx3GaZmiOHfCx6MuaaMEhnnPnZ5OXSx0AxfePVqdmvtwdbpbgz61OPK3zn/gcWN1Xbx4PvLtl7uc4VDFDljbUQMMq2Yz0rUEyCMPUz7jp+/4vWcPjrJxO41c79+nZ7099PkvtuPMXz1+a2finAQM8F8nXkn1A2DajSawsFKJIcgaiZw6BLJxF2mksKVvNgSZ05KFqFAUzIGUchAAAh+QQFCgAUACwBAAEAzgALAAAF/yDVUBJlUk4qjSe1LBDUouTswnYqz28867be7gTkwYamYkv4cyBNvZwziGs+b76W8sTUUq4LxnNBRTFmhwNtKTq30muuGa12GBnuE9zOduRNe3d/FIFsDYOFcod0cVBtjHyKiHVGfpA/VwlhMwQEBoMmCoOdn0GiNgQFoJqgqaubnKo2CactpIMLtK2yM7qopS0JrJyeuC67LMG1tgXJNm8IDAYzAgIvaNHTLdXXbxTS1NYJ2ODb4uTaJ9xk0OXq1ux62eHdet/pJtzj3u755/z4KOhDR2/fiQRP0uSiFsAFHWHhHL45ANGcRD0UDeZrGE9PRXUcH2oUKOCix5HVTP8Syhix48qP/lSmgUlSJkuLLtXYSAOK284DPa39DJqTpw2fdIj+dEmSqcKjQukwRTpxatSqUJ0esOoUgdQC4WiqWQDW3MKJCcq+E+tC7Ua2ZMOOVBgwQAC4AQXcnUshQd29XxninWF3sDm43mgCAFCgKAKUIdGiLOmUZsrKk21apixyxuLGnVt8LqqYMemRo3dajowR5oFoJc0uzTqbXm3ZUmnntr0bN1bev31jXBDbxOJ/w3UH7ztvG+CJ/QQ+b/2X1sO80wH1dStdLEXsYpuDZBtdL1zu5vkuqK6A4OG54vsqaI8z9DsDpOnfr6zfH377/p0Wzn+SDZiTfAYCSBISgW9YZw6DgLw2kl2goaGJCSEAACH5BAUKABQALAEAAQDOAAsAAAX/IEU5jiSeIyU1KLUsENSScvvWKGnaMC7qvN7M4RPdirRgbFh0wYZEJbR5ZEqtNsbux0ihXo0u6nDwnsDiE9lspIRbawfvPS7Lv+60KD7XU/h4Dn6AZ3lwdn2HbE50aoh4jXtlPgwJgigJmX4EBAZ+FAkKm52foZ8EBS2gmqqkqqwtqKqgC6MFLC2wKKilorGumKa/t6+1rcS5vrGeCycMCJ9lCwYtAgIvcNDUKNbYdQzbJ93N3+Ei3QmH09XX6XXr3O2H4OwL7o708fbq5hTj8/3+latHToQCCoMO7OMWwMWhTNUaFpQEMZ7DOhXFSTyE4N45ARcddYwYkqJHfyAn//45kPFjyZUtUb4kE9PaTJYnBWxEweDON1XdVJH5FFSdqgDXhB4gmnTe0abvgEJVg0AlSqsHqkrFqvApVz8AAEzdUxWkvlkJF6RiGJOMWnZtFa7VGBfeiQAB6s79uNCRXRF49UasGzDvSbd7/RlWl1hn3HziBLQtQmakRayWI9/MfC5AAZU0T4b9/FA0ANJ1OFMYDRpnC9alX59uHRP2O9OoHdWerSib1aJR6ym1ihTzArN3x648LtwoirDKszI/AZ3r9MjWZUfv2nxMApXVhSJ42A8vhYMDLaL32y/seYCDDyss33A9RfrvMRaOmyCgZPl/URAYgPjZt9x+AKKAADJLBuqUmySq4fXgcg0KYABtKllz4UMNekYbbh+2IGFrfQG2k24VbpjaSSOKl5OFtFEQAgAh+QQFCgAUACwBAAEAzgALAAAF/yAlUo00no7UnCJDQSzlwPEC0Sh+2ro417zYr/YS9kRB1pCVzAGPMmhztNzdjLUVK8FwEF2sw8LLpIBPYvLOHEt/2+N3OF4+j9x1uHq0YM/3SH5odGt2IniFbYYHB4B8MQQGWiwKhhSRli2QBZmCIwScNZWQBjEiozGSopkGmagnoKYUryehW7QjtpSWmCycCoqlLAIUfSwIDMInxAlwyiPExmjJMQIL0nfUwwvNYdrL18HV4d7PItbd0+YU0eLb6XcL68TAIwbIcPAiAWL5MQEGsB3iVi2gv2EGa+hjl5DJQoACKRygsFBAwzsU/10cWHGjxIwII07siC1BvxgIIt+yU3lym6mW4EylNGVNpsqacGiyXEDMZc5xL2+qnAn0p88RzUQyKPCvmLNxC8XMczpnqtJ1AUCqq0Z1K4usUeVBVcT03dOvWuPNI3hiUoyHHouRNMV2mUcxFQuI7ApNr6yIAvzOybuX8METAAQPmjs4RuKIUGBC26kzaGWjMTFPfpkJ55zLn4uGPnqCKOlDpjOXqfoPQT2vy1yfjf1aLdfah75Bk+2t7IkAvGHvxi1xaVPiUo+TrRbc9rBZbaJHhCiLMRq+5+6mzb6XuMW9gLUbDgM9ZHTvcetCi1ve7t4QACH5BAkKABQALAAAAADQAA0AAAX/ICWOZGmeaKqubOu+cCzPNMkwEFQ6lNSUi4Vu55CYgjnikIRcihwOp6ipPAqlUCmFSspak93oFysGXqtm8Cj7sy1OCQSFx6Q0GKXDYW6+5/d0I29+JHp8dYQjhoFTdniFgECOf4eCk5CVjYkiiyebFJ2Ij4qRoiUICRSjIwUHbSMJsasUBAQGs1OztbclsQq4BAWzsQnAvCSoxSW1wqcJv8vBuLLRxyOo0MvWsMrLzb3ZJNImCUHRB4witebIzwYlAgILqYUIDO8k8fOnqvgj+vRI3YMnL6AIOQPzFfyT8N9CSA1FAGToT+JDgRUpTISYcSNGgm+WCdjyZ59CkpBi/xFEScqkQ5acDri0CBPUAZUnQ5LC+VJnzJkaR/q0CTReTT08aQ5FajDo0ZtNjQ4tMIDAUj249JnAakIrw67ytsoEe3UsSLFZw5YkK3ZoULd63HqFJFctXRMA7LIakNQmgwIE++75G7jpngWAFQI93BGA4C2JHT5GXLhkZIuTMwYIIFjm5aCZS2ye/NmjiAQGDsyKGxVAgatAAbiG3VT26z99peZJVsL2VVQrr/b1jbv27JLGb6dsrXxncrcKVLdlu/ZsdcXTrd/V3pL6duzXR+RdbBY83ZHmu3NnpYpfRAqbKTRF2FHA4/fx+tJfabgff4qBKcBQaSMZphqB9yFoIERhCiW4koAuQNXbcctN2NxPUQlggHAZbogbhA55SFeHHMJDoSLYECSicyoKB6IIm11oE3AkxOhWDTjmqOOOPPboYwshAAA7")} </style>')
    for (var i = 0; i < anchors.snapshotLength; i++) {
        var a = anchors.snapshotItem(i);
        var m = /download\.php\/([0-9]*)\/(.*)\.torrent/.exec(a.href);
        var id = m[1];
        var name = unescape(m[2]);
        
        (function (id,name) { // closure
            var nfo = EL('a',{ style: {cursor:'pointer'}, on_click: function(ev) {
                var loader = tb_show(name);
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://www.iplay.ro/viewnfo.php?id='+id,
                    headers: {'Cookie': document.cookie},
                    onload: function(obj) {
                        var str = obj.responseText;
                        var a = str.indexOf(pre_start);
                        var b = str.indexOf(pre_end);
                        //~ alert(str.slice(a+pre_start.length, b+));
                        loader(str.slice(a, b+pre_end.length));
                    }
                });
                

            }},'[NFO]');
            //~ var detail = EL('a',{ href:'#'},'[Detail] ');
            a.parentNode.appendChild(EL('br'));
            a.parentNode.appendChild(nfo);
            //~ a.parentNode.appendChild(EL('br'));
            //~ a.parentNode.appendChild(detail);
        })(id,name);
}

}


//helper functions below
function tb_showIframe(){
    $("#TB_load").remove();
    $("#TB_window").css({display:"block"});
}

function tb_remove() {
    $("#TB_imageOff").unbind("click");
    $("#TB_closeWindowButton").unbind("click");
    $("#TB_window").animate({opacity: "hide"}, "fast", 'linear', function(){$('#TB_window,#TB_overlay,#TB_HideSelect').trigger("unload").unbind().remove();});
    $("#TB_load").remove();
    if (typeof document.body.style.maxHeight == "undefined") {//if IE 6
        $("body","html").css({height: "auto", width: "auto"});
        $("html").css("overflow","");
    }
    document.onkeydown = "";
    document.onkeyup = "";
    return false;
}

function tb_position() {
$("#TB_window").css({marginLeft: '-' + parseInt((TB_WIDTH / 2),10) + 'px', width: TB_WIDTH + 'px'});
    if ( !(jQuery.browser.msie && jQuery.browser.version < 7)) { // take away IE6
        $("#TB_window").css({marginTop: '-' + parseInt((TB_HEIGHT / 2),10) + 'px'});
    }
}

function tb_parseQuery ( query ) {
   var Params = {};
   if ( ! query ) {return Params;}// return empty object
   var Pairs = query.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) {continue;}
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;
}

function tb_getPageSize(){
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w,h];
    return arrayPageSize;
}

function tb_detectMacXFF() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox')!=-1) {
    return true;
  }
}


