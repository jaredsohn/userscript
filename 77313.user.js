// ==UserScript==
// @name           Ordenes Militares Guerreros Azteca
// @namespace      www.erepublik.com
// @description    Ordenes Militares para Guerreros Azteca
// @date           2010-05-21
// @version	   1.0
// @Author	   ispencer
// @include        http://www.erepublik.com/*
// By Isidro L. Spencer
// ==/UserScript==

(function(undefined)
{
    var VERSION = '1.0';

    //Documento de google y link de actualizacion de script
	var url = 'https://docs.google.com/document/pub?id=1VIAUbZn9vLasIptp7jmWypggEsWboUgto6wrKpRgGfA';
    var updateUrl = 'http://userscripts.org/scripts/show/77313';
	    
    // Declaracion de Imagenes a Utilizar
    var toplogo = 'http://img200.imageshack.us/img200/7633/guerrerosaztecatop.jpg';
	var imEr = "/images/parts/icon_political_reject_default.gif";
    var imOK = "images/parts/icon_warlist_active.gif";

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    
    var ORDERS = {
        "{1}": "Si este es tu ultimo login, pelea en:",
        "{2}": "Pelea en:",
    };

    //Funcion para jalar los datos del google doc
    function parseData(s)
    {
        function splitLinks(s)
        {
            var slinks = '';
            var c = s.split('#');
            for(var i=0; i<c.length; ++i)
            {
                vv = c[i].split('|');
                slinks += '<span style="font-size: 18px; font-weight: bold;"><a href="'+vv[1]+'">'+vv[0]+'</a></span>&nbsp;&nbsp;&nbsp;';
                if(i%2 == 1)
                    slinks += '<br/>';
            }
            return slinks;
        }

        try
        {
            s = s.replace(/\r\n/g, "").replace(/\n/g, "");
            var doc = s.match(/<div id="doc-contents">(.*)<br clear="all"/m)[1];
            doc = doc.replace(/<\/?.+?>/g, "").replace(/&#(\d+);/g, function(wholematch, firstmatch){
                return String.fromCharCode(+firstmatch);}
            );
            //doc = doc.replace(/«/, '<').replace(/»/, '>');
            var d = doc.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0*39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

            var ver = '0.00';
            try
            {
                ver = d.match(/Version:\s*(.+?)##/)[1];
            }
            catch(ev)
            {
                ver = '0.00';
            }
            
            if(ver != VERSION)
            {
                var uurl = typeof(PRO_xmlhttpRequest)=='object'?updateUrlIE:updateUrl;
                
                displayErrFrame("La version de tu Script es Obsoleta. (Tu Version: "+VERSION+", La mas Actual: "+ver+")", splitLinks("Actualizate|"+uurl));
                return;
            }
            
            var date   = d.match(/Fecha:\s*(.+?)##/)[1];
            var mon    = d.match(/Foro:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)##/)[1];
            var orders = d.match(/Ordenes:\s*(.+?)##/)[1];
            orders = orders.replace(/{([1-5])}/g, function(wholematch, firstmatch){
                return ORDERS[('{'+firstmatch+'}')];}
            );

            mon = '<p><a href="'+mon+'">Foro Guerreros Azteca</a></p>';
            
            var slinks = splitLinks(links);
            
            adds = '';
            for(var i=1; i<=5; ++i)
            {
                var alinks  = (new RegExp('Links\\('+i+'\\):\s*(.+?)##')).exec(d);
                var aorders = (new RegExp('Ordenes\\('+i+'\\):\s*(.+?)##')).exec(d);
                if(alinks == null || aorders == null)
                    break;
                    
                adds += '<p style="color: #000000; border-top: 1px solid gray;">';
                adds += aorders[1] + '<br/>';
                adds += splitLinks(alinks[1]);
                adds += '</p>';
            }

            displayFrame(orders, slinks, adds, date, mon);
        }
        catch(e)
        {
            mon = '<a href="'+mon+'">Foro</a>';
			displayErrFrame("Error leyendo instruccion, intentalo mas tarde. Si el error se repite - reportalo en el "+mon+" a tu Capitan.");
            throw e;
        }
    }

    function displayFrame(orders, links, additional, date, mon, im)
    {
        if(im == undefined)
            im = imOK;
            
        if(links == undefined) links = "";
        if(additional == undefined) additional = "";
        if(date == undefined) date = "";
        if(mon == undefined) mon = "";
        
		var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
        ordersDiv.innerHTML = '\
	    <div class="title" align="center"><img class="topimg" src="'+toplogo+'" alt=""/>\
			<h2 style="font-size: x-large;" id="OrdenesGA">Ordenes Guerreros Azteca</h2></div>\
        <div class="shouts box">\
            <div class="item elem">\
                <div class="iconholder"><img class="test" src="'+im+'" alt=""/></div>\
                <div class="holder">\
                    <p style="color: #000000;">'+orders+'<br/>'
                    +links+
                    '</p>'
                    +additional+
                    '<p style="border-top: 1px solid gray;">'+date+'</p>'
                    +mon+
                '</div>\
            </div>\
        </div>';
        
        latestNews = document.getElementById('shouts');
        latestNews.parentNode.insertBefore(ordersDiv, latestNews);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#OrdenesGA", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, nPaddingLeft:100, sFlashVars:"", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function displayErrFrame(orders, links, additional, date, mon)
    {
        displayFrame(orders, links, date, additional, mon, imEr)
    }

    function loadURL_GM(url, xhr)
    {
        if(xhr == undefined)
            xhr = GM_xmlhttpRequest;
    
        xhr({
            method: "GET",
            url: url,
            onload: function(response)
            {
                parseData(response.responseText);
            },
            onerror: function(response)
            {
                displayErrFrame("Error "+response.status+" ("+response.statusText+") al cargar la pagina.");
            }
        });
    }
    
    function loadURL_XHR(url, xhr)
    {
        if(xhr == undefined)
            xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    parseData(xhr.responseText);
                }
                else
                {
                    displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+") al cargar la pagina.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Error de Sesion.");
        };
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    try
    {
        if(isFF)
        {
            loadURL_GM(url);
        }
        else
        {
            loadURL_XHR(url);
        }
    }
    catch(e)
    {
        displayErrFrame("Violacion de Acceso.");
        throw e;
    }
})();