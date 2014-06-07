// ==UserScript==
// @name       ithappensreader
// @namespace  http://userscripts.org/scripts/show/173820
// @version    0.1
// @description  full ithappens reader
// @match      http://ithappens.ru/
// @copyright  Sergeich0
// ==/UserScript==
(function (window, undefined) {  
    var w;
    if (typeof unsafeWindow !== undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    
    function getXmlHttp() {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
    var id = 1;
    var kd = 1;
    function load() {
        if (kd == id && kd <= 11200) {
            kd++;
            var xmlhttp2 = getXmlHttp(); 
            xmlhttp2.open('GET', 'http://ithappens.ru/story/'+id, true);
            xmlhttp2.send();
            xmlhttp2.onreadystatechange = function() {
                if (xmlhttp2.readyState == 4) { 
                    if(xmlhttp2.status == 200) {
                        var ddd='<h3>'+id+'</h3>'+/<p\sclass\="text"[\W\w]*(?=\n<p\sclass\="storytags">)/gi.exec(xmlhttp2.responseText)+'<hr>';
                        document.write(ddd);
                        id++;
                    }
                }
            };
        } 
        document.title=id;
    }
    setInterval(function(){
        load();
    },100);
})(window);
///<p\sclass\="text"[\W\w]*(?=\n<p\sclass\="storytags">)/gi.exec(document.body.innerHTML)