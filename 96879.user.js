// ==UserScript==
// @name            Rozkazy POG
// @namespace       www.erepublik.com
// @author          carllos
// @description     Aktualne rozkazy dla członków POG
// @version         0.1
// @include         http://www.erepublik.com/en
// @include         http://www.erepublik.com/pl
// ==/UserScript==

(function(undefined)
{
    var VERSION = '0.1';
    var url = 'http://carllos.com.pl/pog/rozkazy.php';
    var urlOpera = 'http://carllos.com.pl/pog/rozkazy.php';

    /* ---------------------------------- */
    // Magic, do not touch! ;)
    var imEr = "/images/parts/icon_political_reject_default.gif";
    var imOK = "/images/parts/icon_military_93.gif";

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
    
	var battlePriorities = {
		0: "green",
		1: "blue",
		2: "orange",
		3: "red",
	};

    function parseData(s)
    {
        function splitOrders(o)
        {
			var parts = o.split("||");
			var ord = new Array();
			for (i = 0; i < parts.length; i++)
			{
				var binfo = parts[i].split("**");
				var bdata = new Object();
				bdata.orders = binfo[0];
				bdata.bid = binfo[1];
				bdata.bplace = binfo[2];
				bdata.priority = binfo[3];
				ord[i] = bdata;
			}
			return ord;
        }

        try
        {
            s = s.replace(/\r\n/g, "").replace(/\n/g, "");
            var doc = s.match(/START==(.*)==END/m)[1];
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
                
                displayErrFrame("Twoja wersja skryptu jest nieaktualna. (Obecna: "+VERSION+", aktualna: "+ver+")", splitLinks("Aktualizuj|"+uurl));
                return;
            }
            
            var date   = d.match(/Date:\s*(.+?)##/)[1];
            var ordstring  = d.match(/Orders:\s*(.+?)##/)[1];
            
			var ordStruct = splitOrders(ordstring);
        
			var orders = "";
		
          for (i = 0; i < ordStruct.length; i++)
			{
				orders += "<p style='color: black'>" + ordStruct[i].orders + "</p><br />";
				orders += "<p align='center' style='padding-top: 4px; padding-bottom: 4px; text-decoration: blink; color: red; font-size: 16px; font-weight: bold'><a style='color: " + battlePriorities[ordStruct[i].priority] + "' target='_blank' href='http://www.erepublik.com/en/military/battlefield/" + 
					ordStruct[i].bid + "'>" + ordStruct[i].bplace + "</a></p><br />";

			}
			

            displayFrame(orders, date);
        }
        catch(e)
        {
            displayErrFrame("Błąd odczytu rozkazów, spróbuj później. Jeżeli błąd powtarza się - zgłoś błąd na IRC.");
            throw e;
        }
    }

    function displayFrame(orders, date, pog, im)
    {
        if(im == undefined)
            im = imOK;
            
        if(date == undefined) date = "";
        if(pog == undefined) pog = "";
        
        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
        ordersDiv.innerHTML = '\
          <div class="title"><h2 style="font-size: x-large;" id="RozkazyPOG">Rozkazy POG</h2></div>\
        <div class="latest_events box">\
            <div>\
                    <p>' + orders + 
            '</div>\
            <div>\
                <div>\
                    <p style="font-size: 10px;"><b>Dodał:</b> '+date+'</p>'
                    +pog+
                    '<p align="center"><a target="_blank" href="http://tnij.org/obronanarodowa"></a></p>' +
                '</div>\
            </div>\
        </div>';
        
        battle_listing = document.getElementById('battle_listing');
		if (battle_listing == null) return;
        battle_listing.parentNode.insertBefore(ordersDiv, battle_listing);
        
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#RozkazyPOG", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function displayErrFrame(orders)
    {
        displayFrame(orders, "", "", imEr)
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
                displayErrFrame("(GM) Błąd "+response.status+" ("+response.statusText+") podczas ładowania strony.");
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
                    displayErrFrame("Błąd "+xhr.status+" ("+xhr.statusText+") podczas ładowania strony.");
                }
            }
        };
		xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Przekroczenie czasu połączenia.");
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
                displayErrFrame("Niepoprawnie zainstalowany skrypt. Proszę przeinstalować zgodnie z instrukcjami.");
                return;
            }
            loadURL_XHR(urlOpera, new opera.XMLHttpRequest());
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
        displayErrFrame("Naruszenie zasad dostępu.");
        throw e;
    }
})();