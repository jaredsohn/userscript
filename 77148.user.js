// ==UserScript==
// @name           Script de Ordenes eRep [MEX]
// @namespace      www.erepublik.com
// @author         mcardielo
// @version        0.2.1
// @include        http://www.erepublik.com/es
// @include        http://www.erepublik.com/en
// ==/UserScript==

(function(undefined)
{
    var VERSION = '0.2.1';

    var url = 'http://erepublik.com.mx/viewtopic.php?f=70&t=3219';
    var updateUrl = 'http://userscripts.org/scripts/show/77148';
    var updateUrlIE = ''; //'http://iescripts.org/view-scripts-754p1.htm';

    /* ---------------------------------- */
    // Magic, do not touch! ;)
    var imEr = "/images/parts/icon_political_reject_default.gif";
    var imOK = "http://3.bp.blogspot.com/_v-GiCrH6rNM/SND7XfMzQDI/AAAAAAAABS0/V12v557usr4/s400/mexico.jpg";

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
    
    var ORDERS = {
        "{1}": "Si esta es tu última conexión, pelear en:",
        "{2}": "Pelea Kamikase en la batalla:",
        "{3}": "Ignorar todas las otras ordenes y pelear en:",
        "{4}": "Pelear en:",
    };

    function parseData(s)
    {
        function splitLinks(s)
        {
            var slinks = '';
            var c = s.split('#');
            for(var i=0; i<c.length; ++i)
            {
                vv = c[i].split('|');
                slinks += '<span style="font-size: 14px; font-weight: bold;"><a href="'+vv[1]+'">'+vv[0]+'</a></span>&nbsp;&nbsp;&nbsp;';
                if(i%2 == 1)
                    slinks += '<br/>';
            }
            return slinks;
        }

        try
        {
            s = s.replace(/\r\n/g, "").replace(/\n/g, "");
            var doc = s.match(/<code>(.*)<\/code>/m)[1];
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
                
                displayErrFrame("La versión de su Script no esta actualizada. (Instalada: "+VERSION+", Actual: "+ver+")", splitLinks("Actualización|"+uurl));
                return;
            }
            
            var date   = d.match(/Date:\s*(.+?)##/)[1];
            var mon    = d.match(/Newspaper:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)##/)[1];
            var orders = d.match(/Orders:\s*(.+?)##/)[1];
            orders = orders.replace(/{([1-5])}/g, function(wholematch, firstmatch){
                return ORDERS[('{'+firstmatch+'}')];}
            );

            mon = '<p><a href="'+mon+'">La Resistencia</a></p>';
            
            var slinks = splitLinks(links);
            
            adds = '';
            for(var i=1; i<=5; ++i)
            {
                var alinks  = (new RegExp('Links\\('+i+'\\):\s*(.+?)##')).exec(d);
                var aorders = (new RegExp('Orders\\('+i+'\\):\s*(.+?)##')).exec(d);
                if(alinks == null || aorders == null)
                    break;
                    
                adds += '<p style="color: #000000; border-top: 1px solid gray;"><br />';
                adds += aorders[1] + '<br/>';
                adds += splitLinks(alinks[1]);
                adds += '</p>';
            }

            displayFrame(orders, slinks, adds, date, mon);
        }
        catch(e)
        {
            displayErrFrame("Error al leer las ordenes, intentelo de nuevo mas tarde, si el error persiste por favor reportarlo por IRC.");
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
        <div class="title"><h2 style="font-size: x-large;" id="RozkazyMON">LA RESISTENCIA</h2></div>\
        <div class="latest_events box">\
            <div class="item elem">\
                <div class="iconholder"><img class="test" src="'+im+'" width="48" height="38" alt=""/></div>\
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
        
        latestNews = document.getElementById('latestnews');
        latestNews.parentNode.insertBefore(ordersDiv, latestNews);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#RozkazyMON", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
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
                displayErrFrame("(GM) Error "+response.status+" ("+response.statusText+").");
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
                    displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+").");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Fallo!.");
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
        else if(isOp)
        {
            if(typeof(opera.XMLHttpRequest)=='undefined')
            {
                displayErrFrame("Por favor vuelva a instalar el Script.");
                return;
            }
            loadURL_XHR(url, new opera.XMLHttpRequest());
        }
        else if(isIE)
        {
            loadURL_XHR(url, PRO_xmlhttpRequest());
        }
        else
        {
            loadURL_XHR(url);
        }
    }
    catch(e)
    {
        displayErrFrame("Violación de Acceso.");
        throw e;
    }
})();