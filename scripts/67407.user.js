// ==UserScript==
// @name            Japanese Imperial Army Orders
// @namespace       www.erepublik.com
// @author          F@zi - edited by Eustachy_Kapusta
// @description     Orders for JIF
// @version         0.04
// @include         http://www.erepublik.com/en
// ==/UserScript==

(function(undefined)
{
    var VERSION = '0.04';

    var url = 'http://docs.google.com/View?id=ddbt8twd_875g4nj8q';
    var updateUrl = 'http://userscripts.org/scripts/show/67407';

    /* ---------------------------------- */
    // Magic, do not touch! ;)
    var imEr = "/images/parts/icon_political_reject_default.gif";
    var imOK = "/images/parts/icon_military_93.gif";

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
    
    var ORDERS = {
        "{1}": "If it's your last login fight in:",
        "{2}": "Berserk in:",
        "{3}": "Ignore other RW and fight in:",
        "{4}": "Fight in:",
		"{5}": "Deployment:",
		"{6}": "Training War:",
		"{7}": "Unofficial:",
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
                
                displayErrFrame("Your script is outdated. (New: "+VERSION+", new: "+ver+")", splitLinks("Update|"+uurl));
                return;
            }
            
            var date   = d.match(/Date:\s*(.+?)##/)[1];
            var mon    = d.match(/Newspaper:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)##/)[1];
            var orders = d.match(/Orders:\s*(.+?)##/)[1];
			var irc	   = d.match(/IRC:\s*(.+?)##/)[1];
            orders = orders.replace(/{([1-5])}/g, function(wholematch, firstmatch){
                return ORDERS[('{'+firstmatch+'}')];}
            );

            mon = '<p><a href="'+mon+'">Imperial Army Reports</a></p>';
            irc = '<p><a href="'+irc+'" target="_blank">Our IRC channel</a></p>';
            
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

            displayFrame(orders, slinks, adds, date, mon, irc);
        }
        catch(e)
        {
            displayErrFrame("Error while reading orders, try again later. If the error repeats - report error on irc.");
            throw e;
        }
    }

    function displayFrame(orders, links, additional, date, mon, irc, im)
    {
        if(im == undefined)
            im = imOK;
            
        if(links == undefined) links = "";
        if(additional == undefined) additional = "";
        if(date == undefined) date = "";
        if(mon == undefined) mon = "";
        if(irc == undefined) irc = "";
		
        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
        ordersDiv.innerHTML = '\
        <div class="title"><h2 style="font-size: x-large;" id="JIFOrders">JIF Orders</h2></div>\
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
					irc+
                '</div>\
            </div>\
        </div>';
        
        latestNews = document.getElementById('latestnews');
        latestNews.parentNode.insertBefore(ordersDiv, latestNews);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#JIFOrders", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function displayErrFrame(orders, links, additional, date, mon, irc)
    {
        displayFrame(orders, links, date, additional, mon, irc, imEr)
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
                displayErrFrame("(GM) Error "+response.status+" ("+response.statusText+") while loading site.");
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
                    displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+") while loading site.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Timeout.");
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
                displayErrFrame("Incorrectly installed script. Please reinstall it.");
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
        displayErrFrame("Permission error.");
        throw e;
    }
})();