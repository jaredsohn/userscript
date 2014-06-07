//
// ==UserScript==
// @name          hwmArtsArenda
// @homepage      http://userscripts.org/scripts/show/87812
// @version       1.5
// @description   Uporoschaet list artov on long-term storage
// @include       http://www.heroeswm.ru/arts_arenda.php
// ==/UserScript==


browserInit();
var interval = GM_getValue("hwmArtsArendaTime");
if(!interval) {    interval = 1.1;}
var art = getI("//a[contains(@href, 'arts_arenda.php?art_return=')]");
var is = false;
for(var count=0; count<art.snapshotLength; count++) {
    var main = art.snapshotItem(count).parentNode.parentNode;

    var time = getItem('td[2]/font/b', main).innerHTML;
    var d = substr(time, 0, 2);
    var m = substr(time, 3, 2);
    var y = substr(time, 6, 2);
    var h = substr(time, 9, 2);
    var s = substr(time, 12, 2);
    var item = (new Date(20+y, m-1, d, h, s)).valueOf();
    var date = (new Date()).valueOf();
    item = (date-item)/(24*3600*1000);
    if(item>interval) {
        var item1 = getItem('td[1]', main);
        var img = item1.innerHTML;
        item1.innerHTML = (count+1) +'&nbsp;<a name="'+ count +'" style="cursor:pointer;">+</a>&nbsp;';
        getItem('a', item1).addEventListener("click", isVisible, false);
        item1.style.verticalAlign = 'top';

        var item2 = getItem('td[2]', main);
        item2.id = 'arenda2'+ count;
        item2.setAttribute("arenda", '<div style="display:table-cell; vertical-align:middle; padding:5px;">'+ img +'</div>'
                                     +'<div style="display:table-cell; vertical-align:middle; padding:5px;">'+ item2.innerHTML +'</div>');
        if(item2.childNodes[0] && item2.childNodes[0].textContent) {            item2.innerHTML = item2.childNodes[0].textContent;        }

        var item3 = getItem('td[3]', main);
        item3.id = 'arenda3'+ count;
        item3.setAttribute("arenda", item3.innerHTML);
        item3.innerHTML = '<font color="red"><b>'+ time +'</b></font>';

    }
        if(!is) {            var table = main.parentNode.parentNode;
            var td = table.parentNode;

            if(td.childNodes[3]) {
                deleteItem(td.childNodes[3]);
            }

            var div = document.createElement('div');
            var text1 = '\u043d\u0435 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043d\u0430 \u0445\u0440\u0430\u043d\u0435\u043d\u0438\u0438 \u0430\u0440\u0442\u044b \u0431\u043e\u043b\u0435\u0435';
            var text2 = '\u0434\u043d\u0435\u0439';
            var text3 = '\u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c';
            div.innerHTML = '<div style="display:table-cell; vertical-align:middle; padding:10px;">'+ text1 +'</div>'
                            +'<div style="display:table-cell; vertical-align:middle; ;padding:10px;" align="center">'
                                +'<a style="cursor:pointer;" onclick="document.location.href=document.location.href">'+ text3 +'</a>'
                                +'<br /><input type="text" value="'+ interval +'" size="3">'
                            +'</div>'
                            +'<div style="display:table-cell; vertical-align:middle; padding:10px;">'+ text2 +'</div>';
            getItem('div[2]/input', div).addEventListener("blur", updateTime, false);
            td.insertBefore(div, table);
            is = true;

            var link = document.createElement('tr');
            main.parentNode.appendChild(link);
            link.innerHTML = '<td colspan="3" style="text-align:right; padding:10px;">'
                                 +'<a href="javascript:void(0);"><b>\u0412\u0435\u0440\u043d\u0443\u0442\u044c \u0412\u0441\u0435</b><a>'
                             +'</td>';
            getItem('td/a', link).addEventListener("click", function() {                returnAll(false);            }, false);        }
}


function returnAll(reload) {    var link = getItem("//a[contains(@href, 'arts_arenda.php?art_return=')]");
    if(link) {
        link.parentNode.innerHTML = img;
        GM_xmlhttpRequest({ method:"GET",
                            url: link.href,
                            onload:function() {
                                returnAll(true) ;
                            }});
    } else
    if(reload) {        document.location.href = document.location.href;    }}


function updateTime() {    this.value = parseFloat(this.value);
    GM_setValue("hwmArtsArendaTime", this.value);}

function isVisible() {
    if(this.innerHTML=='+') {
        this.innerHTML = '-';    } else {        this.innerHTML = '+';    }

    var item2 = document.getElementById('arenda2'+ this.name);
    var tmp = item2.innerHTML;
    item2.innerHTML = item2.getAttribute("arenda");
    item2.setAttribute("arenda", tmp);

    var item3 = document.getElementById('arenda3'+ this.name);
    var tmp = item3.innerHTML;
    item3.innerHTML = item3.getAttribute("arenda");
    item3.setAttribute("arenda", tmp);
}


function deleteItem(item) {
    item.parentNode.removeChild(item);
}
function substr(f_string, f_start, f_length) {
    if(f_start < 0) {
        f_start += f_string.length;
    }
    if(f_length == undefined) {
        f_length = f_string.length;
    } else if(f_length < 0){
        f_length += f_string.length;
    } else {
        f_length += f_start;
    }
    if(f_length < f_start) {
        f_length = f_start;
    }
    return f_string.substring(f_start, f_length);
}
function pre() {
    if(unsafeWindow && unsafeWindow.console && unsafeWindow.console.log) {
        unsafeWindow.console.log(arguments);
    }
}
function getI(xpath,elem){
    return document.evaluate(xpath, (!elem?document:elem), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getItem(xpath,elem){
    return document.evaluate(xpath, (!elem?document:elem),null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}
function getId(id) {
    return document.getElementById(id);
}
function browserInit() {
    var ua = navigator.userAgent.toLowerCase();

    var match = /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version)?[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    !/compatible/.test( ua ) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec( ua ) ||
    	[];

    if(match[1]!='mozilla') {
        GM_setValue = function(name, value) {
            var cookie_string = name + "=" + escape (value);
            var expires = new Date ( 2050, 0, 0);
            cookie_string += "; expires=" + expires.toGMTString();
            document.cookie = cookie_string;
        }

        GM_getValue = function(name) {
            var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
            if ( results )
            return ( unescape ( results[2] ) );
            else
            return null;
        }

        GM_xmlhttpRequest = function (details) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                var responseState = {
                    responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
                    responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
                    readyState:xmlhttp.readyState,
                    responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
                    status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
                    statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
                }
                if (details["onreadystatechange"]) {
                    details["onreadystatechange"](responseState);
                }
                if (xmlhttp.readyState==4) {
                    if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
                        details["onload"](responseState);
                    }
                    if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
                        details["onerror"](responseState);
                    }
                }
            }
            try {
              //cannot do cross domain
              xmlhttp.open(details.method, details.url);
            } catch(e) {
              if( details["onerror"] ) {
                //simulate a real error
                details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
              }
              return;
            }
            if (details.headers) {
                for (var prop in details.headers) {
                    xmlhttp.setRequestHeader(prop, details.headers[prop]);
                }
            }
            xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
        }
    }
}
var img = '<img border="0" src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'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'+
'fySDhGYQdDWGQyUhADs=">';