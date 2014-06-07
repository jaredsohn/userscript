// ==UserScript==
// @name           Latest News DP
// @namespace      www.erepublik.com
// @description    Ultimas Noticias Democracia-Plural
// @date           2010-09-21
// @version	   1.0
// @Author	   ispencer
// @include        http://www.erepublik.com/*
// By Isidro L. Spencer
// Under LGPL License
// No modification/copy without author's con-sentiment
// ==/UserScript==


(function(undefined)
{
    var VERSION = '1';

	var botProfileName = document.getElementById('miniprofile').getElementsByTagName('a')[1].innerHTML;
	var botName = '';
	botName = botProfileName;
	
	var url = 'http://democracia-plural.foroes.net/milicia-democracia-plural-f16/test-dp-news-t133.htm#938';
    var updateUrl = 'http://userscripts.org/scripts/show/86523';
    var images = ["http://forum.erepublik.com/images/statusicon/thread_new-30.png", "/images/parts/icon_military_134.gif", "/images/parts/icon_military_93.gif", "/images/parts/info-ico.gif", "/images/parts/invalid-round.gif"];
    var toplogo = 'data:image/jpg;base64,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';

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
            var d=s;
            var date   = d.match(/Date:\s*(.+?)##/)[1];
            var mon    = d.match(/Newspaper:\s*(.+?)##/)[1];
            var links  = d.match(/Links:\s*(.+?)#/)[1];
            var party_news = d.match(/News:\s*(.+?##)/)[1];
			var img = party_news.match(/\{([1-5])\}:\s*(.+?)##/)[1];

			party_news = party_news.match(/\{([1-5])\}:\s*(.+?)##/)[2];

            mon = '<a href="'+mon+'" target="_blank">Boletin Oficial Democracia-Plural</a>';

            var slinks = splitLinks(links);
			
            adds = '';
            for(var i=1; i<=5; ++i)
            {
                var alinks  = (new RegExp('Links\\('+i+'\\):\s*(.+?)##')).exec(d);
                var aparty_news = (new RegExp('News\\('+i+'\\):\s*(.+?)##')).exec(d);
                if(alinks == null || aparty_news == null)
                    break;

                adds += '<p style="color: #000000; border-top: 1px solid gray;">';
                adds += aparty_news[1] + '<br/>';
                adds += splitLinks(alinks[1]);
                adds += '</p>';
            }

            displayFrame(party_news, slinks, adds, date, mon, images[img-1]);
        }
        catch(e)
        {
            displayErrFrame("Ha ocurrido un error contacta al admin del Script en el Foro de Democracia-Plural");

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
		<h2 style="font-size: x-large;" id="PartyLN">Ultimas Noticias del Partido</h2></div>\
        <div class="shouts box">\
            <div class="item elem">\
                <div class="iconholder"><img class="test" src="'+im+'" alt=""/></div>\
                <div class="holder">\
            <p style="color: #000000; "><b>Estimado '+botName+', <br/>'+party_news+'</b><br/>'
                    +links+
					'</p>'
                    +additional+
                    '<p style="border-top: 1px solid gray;"><a href="http://www.erepublik.com/en/newspaper/boletin-democracia-plural-230680/1" target="_blank">Boletin Oficial Democracia-Plural</a></p>'
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
        url+="&sid="+Math.random();
        if(xhr == undefined)
            xhr = GM_xmlhttpRequest;

        xhr({
            method: "GET",
            url: url,
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