
// ==UserScript==
// @name           Solucion Independiente
// @namespace      Solucion Independiente
// @description    Bienvenidos a Solucion Independiente
// @include        http://www.erepublik.com/*
// ==/UserScript==


(function(undefined)
{
    var VERSION = '1';

	var botProfileName = document.getElementById('miniprofile').getElementsByTagName('a')[1].innerHTML;
	var botName = '';
	botName = botProfileName;
	
	var url = 'http://partido-si.foroes.net/';
    var updateUrl = 'http://userscripts.org/scripts/show/86523';
    var images = ["http://forum.erepublik.com/images/statusicon/thread_new-30.png", "/images/parts/icon_military_134.gif", "/images/parts/icon_military_93.gif", "/images/parts/info-ico.gif", "/images/parts/invalid-round.gif"];
    var toplogo = '';

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
                slinks += '<span style="font-size: 13px; font-weight: bold;"><a href="'+vv[1]+'" target="_blank">'+vv[0]+'</a></span>&nbsp;&nbsp;&nbsp;';
                if(i%2 == 1)
                    slinks += '<br/>';
            }
 	
            return slinks;
        }

        try
        {
//            var d=s;
//            var date   = d.match(/Date:\s*(.+?)##/);
//            var mon    = d.match(/Newspaper:\s*(.+?)##/);
//            var links  = d.match(/Links:\s*(.+?)#/);
//            var party_news = d.match(/News:\s*(.+?##)/);
//			var img = party_news.match(/\{([1-5])\}:\s*(.+?)##/);

//			party_news = party_news.match(/\{([1-5])\}:\s*(.+?)##/);

//            mon = '<a href="'+mon+'" target="_blank">Boletin Oficial Solución Independiente</a>';

//            var slinks = splitLinks(links);
			
//            adds = '';
//            for(var i=1; i<=5; ++i)
//            {
//                var alinks  = (new RegExp('Links\\('+i+'\\):\s*(.+?)##')).exec(d);
//                var aparty_news = (new RegExp('News\\('+i+'\\):\s*(.+?)##')).exec(d);
//                if(alinks == null || aparty_news == null)
//                    break;

//                adds += '<p style="color: #000000; border-top: 1px solid gray;">';
//                adds += aparty_news[1] + '<br/>';
//                adds += splitLinks(alinks[1]);
//                adds += '</p>';
//            }

//            displayFrame(party_news, slinks, adds, date, mon, images[img-1]);
			displayFrame(s);
        }
        catch(e)
        {
            displayErrFrame("Ha ocurrido un error contacta al admin del Script en el Foro de Solución independiente");

            throw e;
        }
    }

    function displayFrame(party_news, links, additional, date, mon, im)
    {
        if(im == undefined)
            im = images[0];

        if(links == undefined) links = "";
        if(additional == undefined) additional = "";
        if(date == undefined) date = "";
        if(mon == undefined) mon = "";
		
	

        var party_newsDiv = document.createElement('div');
        party_newsDiv.className = 'box';
        party_newsDiv.innerHTML = '\
        <div class="title" align="center"><img class="topimg" src="'+toplogo+'" alt=""/>\
		<h2 style="font-size: x-large;" id="PartyLN">Ultimas Noticias de Solución Independiente</h2></div>\
        <div class="shouts box">\
            <div class="item elem">\
                <div class="iconholder"><img class="test" src="'+im+'" alt=""/></div>\
                <div class="holder">\
            <p style="color: #000000; "><b>Hola '+botName+'!!, <br/>'+party_news+'</b><br/>'
                    +links+
					'</p>'
                    +additional+
                    '<p style="border-top: 1px solid gray;"><a href="http://www.erepublik.com/en/newspaper/boletin-del-si-206462/1" target="_blank">Boletin de Solución Independiente</a></p>'
					'Dia '+date+
               '</div>\
            </div>\
        </div>';

        latestNews = document.getElementById('shouts');
        latestNews.parentNode.insertBefore(party_newsDiv, latestNews);

        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#PartyLN", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"textalign=center", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }

    function displayErrFrame(party_news, links, additional, date, mon)
    {
        displayFrame(party_news, links, date, additional, mon, images[4])
    }

    function loadURL_GM(url, xhr)
    {
//        url+="&sid="+Math.random();
        if(xhr == undefined)
            xhr = GM_xmlhttpRequest;

        xhr({
            method: "GET",
            url: "http://solucionindependiente.eu5.org/Ordenes.txt",
            onload: function(response)
            {
		//alert(response.responseText);
                parseData(response.responseText);
            },
            onerror: function(response)
            {
                displayErrFrame("Error "+response.status+" ("+response.statusText+")");
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
                    displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+")");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Ha ocurrido un error");
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
                displayErrFrame("Ha ocurrido un error");
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
        displayErrFrame("Ha ocurrido un error");
        throw e;
    }
})();