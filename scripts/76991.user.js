// ==UserScript==
// @name            Ukazi za elito Karantanci
// @namespace       www.erepublik.com
// @author          Matevzs1
// @include         http://www.erepublik.com/*     
// @version         0.25b
// ==/UserScript==

(function(undefined)
{ 
    var VERSION = '0.25b';
    var url = 'http://docs.google.com/Doc?docid=0AbvJV_o18YAqZGhxcmdtem5fMHJ6anp3Z2Y5&revision=_latest&hgd=1';
    var updateUrl = 'http://userscripts.org/scripts/show/76991';

    /* ---------------------------------- */
    var images = ["http://www.shrani.si/f/F/U3/12Rhc6Nl/karantanec-mini.jpg", "http://www.shrani.si/f/F/U3/12Rhc6Nl/karantanec-mini.jpg", "http://www.shrani.si/f/F/U3/12Rhc6Nl/karantanec-mini.jpg", "http://www.shrani.si/f/F/U3/12Rhc6Nl/karantanec-mini.jpg", "http://www.shrani.si/f/F/U3/12Rhc6Nl/karantanec-mini.jpg"];

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
                
displayErrFrame("Tvoja verzija skripte je zastarela. (Trenutna: "+VERSION+" | aktualna: "+ver+")", splitLinks("Aktualiziraj!|"+uurl));
                return;
            }
            var date   = d.match(/Date:\s*(.+?)##/)[1];

            var mon    = d.match(/Newspaper:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)##/)[1];
            var orders = d.match(/Orders:\s*(.+?##)/)[1];
	    
            var img = orders.match(/\{([1-5])\}:\s*(.+?)##/)[1];
	    orders = orders.match(/\{([1-5])\}:\s*(.+?)##/)[2];
            mon = '<p><a href="'+mon+'">Vodstvo Profesionalne vojske Slovenije</a></p>';
            
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
            displayErrFrame("Prišlo je do napake! Vodstvo Profesionalne vojske Slovenije bomo skušali napako čimhitreje odpraviti! Prosimo vas tudi da nas kontaktirate!");
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
                sIFR.replaceElement(named({sSelector:"#NaredbaEK", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
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
                displayErrFrame("(GM) Prišlo je do napake! "+response.status+" ("+response.statusText+") Vodstvo Profesionalne vojske Slovenije bomo skušali napako čimhitreje odpraviti!");
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
                    displayErrFrame("Prišlo je do napake! "+xhr.status+" ("+xhr.statusText+") Vodstvo Profesionalne vojske Slovenije bomo skušali napako čimhitreje odpraviti!");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Stran za Profesionalno vojsko Slovenije je nedosegljiva.");
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
                displayErrFrame("Neuspešna instalacija skripte. Ponovno instalirajte skripto.");
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
        displayErrFrame("Nepooblašćen pristop!");
        throw e;
    }	
		
		
})();