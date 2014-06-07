// ==UserScript==
// @name            Vukovi
// @namespace       www.erepublik.com
// @author          Gojko Bozic
// @description     Skripta servira aktuelne informacije o tome gde ratovati. 
// @version         0.1
// @include         http://www.erepublik.com/en
// @include         http://www.erepublik.com/sr
// ==/UserScript==

/* Sintaksa naredbi je sledeća: Naredba mora da sadrži "Orders:" praćeno "{x}:" i naredbom posle toga. U tom primeru, x je broj od 1 do 4, koji označava sliku koja ide uz komandu. Komanda se završava sa "##". 
   Posle komande ide deo za linkove koji počinje sa "Links:" iza toga se stavlja tekst koji se linkuje (dozvoljeni html tagovi radi stiliziranja) potom uspravna crta "|" i link koji se prikazuje. Deo se završava sa "#"
	 Posle dela za linkove treba napisati datum i vreme objavljivanja komande. Taj deo počinje sa "##Date:" iza čega ide datum u bilo kom formatu. Deo za datum se završava sa "##". 
	 Sledeći deo su novine ministarstva. Deo počinje sa "Newspaper:", potom ide link i završava se sa "##". Naposletku ide verzija skripte. Deo počinje sa "Version:", potom ide verzija i završava se sa ##
	 
	 Komanda se trenutno čuva u google dokumentu na adresi: http://docs.google.com/View?id=dcjc23p7_0csbcqdgk

*/
(function(undefined)
{
    var VERSION = '0.1';

    var url = 'https://docs.google.com/View?docID=dhqnvbmh_5gzwszcdq&revision=_latest&hgd=1';
    var updateUrl = 'http://userscripts.org/scripts/show/72727';

    /* ---------------------------------- */
    var images = ["images/parts/icon_military_42.gif", "/images/parts/icon_military_134.gif", "/images/parts/icon_military_93.gif", "/images/parts/info-ico.gif", "/images/parts/invalid-round.gif"];


    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
    

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
                
                displayErrFrame("Tvoja verzija skripte je zastarela. (Trenutna: "+VERSION+"| aktuelna: "+ver+")", splitLinks("Aktuelizuj|"+uurl));
                return;
            }
            
            var date   = d.match(/Date:\s*(.+?)##/)[1];
            var mon    = d.match(/Newspaper:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)##/)[1];
            var orders = d.match(/Orders:\s*(.+?##)/)[1];
						var img = orders.match(/\{([1-5])\}:\s*(.+?)##/)[1];
						orders = orders.match(/\{([1-5])\}:\s*(.+?)##/)[2];

            mon = '<p><a href="'+mon+'">Novine Vukova</a></p>';
            
            var slinks = splitLinks(links);
            
            adds = '';
            for(var i=1; i<=5; ++i)
            {
                var alinks  = (new RegExp('Links\\('+i+'\\):\s*(.+?)##')).exec(d);
                var aorders = (new RegExp('Orders\\('+i+'\\):\s*(.+?)##')).exec(d);
                if(alinks == null || aorders == null)
                    break;
                    
                adds += '<p style="color: #000000; border-top: 1px solid gray;">';
                adds += aorders[1] + '<br/>';
                adds += splitLinks(alinks[1]);
                adds += '</p>';
            }

            displayFrame(orders, slinks, adds, date, mon, images[img-1]);
        }
        catch(e)
        {
            displayErrFrame("Došlo je do greške prilikom učitavanja komande. Molim vas prijavite problem na IRC kanalu #vukovi.");
            throw e;
        }
    }

    function displayFrame(orders, links, additional, date, mon, im)
    {
        if(im == undefined)
            im = images[0];
            
        if(links == undefined) links = "";
        if(additional == undefined) additional = "";
        if(date == undefined) date = "";
        if(mon == undefined) mon = "";
        
        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
        ordersDiv.innerHTML = '\
        <div class="title"><h2 style="font-size: x-large;" id="NaredbaMO"></h2></div>\
        <div class="latest_events box">\
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
        
        latestNews = document.getElementById('latestnews');
        latestNews.parentNode.insertBefore(ordersDiv, latestNews);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#NaredbaMO", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
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
        displayFrame(orders, links, date, additional, mon, images[4])
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
                displayErrFrame("(GM) Došlo je do greške "+response.status+" ("+response.statusText+") prilikom učitavanja komande.");
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
                    displayErrFrame("Došlo je do greške "+xhr.status+" ("+xhr.statusText+") prilikom učitavanja komande.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Stranica sa komandom je nedostupna.");
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
                displayErrFrame("Pogrešna instalacija skripte. Ponovo instalirajte skriptu.");
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
        displayErrFrame("Neovlašćen pristup!");
        throw e;
    }
})();
