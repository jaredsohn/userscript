// ==UserScript==
// @name           Prodigy IPfinitum
// @namespace      Prodigy IPfinitum
// @description    Refresh IP
// @description    ::v5.9::
// @description    2Wire 2701HG-T
// @resource       rsc1 http://mpxd.6te.net/pi/ok.png
// @resource       rsc2 http://mpxd.6te.net/pi/nook.png
// @resource       rsc3 http://mpxd.6te.net/pi/refresh.jpg
// @require        http://mpxd.6te.net/jq.142min.js
// @include        http://home/
// @include        http://home/config;
// ==/UserScript==

var rsc1 = GM_getResourceURL('rsc1');
var rsc2 = GM_getResourceURL('rsc2');
var rsc3 = GM_getResourceURL('rsc3');

var Ips = new Array(0, 0), Refresing = false, INT = 1, MAX = 3;

if (location.href == 'http://home/config;') { 
    $(document.body).html('<center><h1>Pagina de Configuración</h1></center>');
    var Sys;
    while (Sys == null || Sys == '')Sys = prompt('Contraseña del Sistema Requerida');
    GM_setValue('Sys', Sys);
    GM_setValue('NEW', 0);
    location.href = 'http://home/';
} else if (!Number(GM_getValue('NEW', 1))) {
    $('body div:eq(0) table:eq(0) tr:eq(0) td:last').after("<td width='70' height='65' style='padding: 0px;'><a id='refresh' href='#'><img id='refreshimg' src="+ rsc3 +" width='100%' height='100%'></img></a></td>");
    $('#refresh').click(function() {
        if (Refresing)return false;
        Refresing = true;
        Ip();
        return false;
    });
} else {
    location.href = 'http://home/config;';
}

function Login() {
    document.title = 'Login... '+ INT;
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://home/xslt',
        data: 'PAGE=A02_POST&NEXTPAGE=A02_POST&PASSWORD='+ GM_getValue('Sys'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onload: function() {
            if (getCookie('WHPL')) {
                Refresh();
            } else {
                if (INT >= MAX) {
                    $('#refreshimg').attr('src', rsc2);
                    $('#refresh').show(200);
                    setTimeout(function() {
                        alert('La contraseña del Sistema talvez esté mal');
                        location.href = 'http://home/config;';
                    }, 2000);
                    return false;
                }
                INT++;
                Login();
            }
        }
    });
}
function Refresh() {
    document.title = 'Renovando Ip...';
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://home/xslt?PAGE=J21_ISP_RESET&RESET_PAGE=J21_ISP_RESET&THISPAGE=J21&NEXTPAGE=J21_ISP_RESET',
        onload: function() {
            setTimeout(function() {
                document.title = 'Cheking New Ip...';
                GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://home/xslt?PAGE=B01&THISPAGE=B04&NEXTPAGE=B01',
                onload: function(response) {
                    Ips[1] = response.responseText.match(/>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})</);
                    if (Ips[0] != Ips[1]) {
                        Ips[0] = Ips[1] = 0;
                        $('#refreshimg').attr('src', rsc1);
                        $('#refresh').show(200);
                        document.title = 'Ok...';
                        setTimeout(function() {document.title = 'Sistema: Resumen';$('#refreshimg').attr('src', rsc3);}, 5000);
                    } else {
                        $('#refreshimg').attr('src', rsc2);
                        $('#refresh').show(200);
                        setTimeout(Ip, 3000);
                    }
                    Refresing = false;
                }
                });
            }, 1000);
        }
    });
}
function Ip() {
    document.title = 'Cheking Ip...';
    $('#refresh').hide(1000);
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://home/xslt?PAGE=B01&THISPAGE=B04&NEXTPAGE=B01',
        onload: function(response) {
            Ips[0] = response.responseText.match(/>(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})</);
            if (getCookie('WHPL')) {
                Refresh();
            } else {
                Login();
            }
        }
    });
}
function getCookie(c_name) {if (document.cookie.length>0) {c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1){c_start=c_start + c_name.length+1;c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));
}}return false;}