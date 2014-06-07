// ==UserScript==
// @name            Тест Скрипта за Chaos Order
// @namespace       www.erepublik.com
// @author          Tetoec, Updated by Tetoec
// @include         http://www.erepublik.com/*
// @version         0.01
// ==/UserScript==

(function(undefined)
{
    var VERSION = '0.01';
    var url = 'https://docs.google.com/document/d/1LRz3aPSeQF5Foo-pej20fVHYJ5C8eJUg6iXut9jhmqw/edit?hl=en&pli=1#';
    var updateUrl = 'http://userscripts.org/scripts/show/96883';
    
    /* ---------------------------------- */
    var images = ["images/parts/icon_military_42.gif", "/images/parts/icon_military_134.gif", "/images/parts/icon_military_93.gif", "/images/parts/info-ico.gif", "/images/parts/invalid-round.gif"];

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;


    function parseData(s)
    {
        try
        {
            s = s.replace(/\r\n/g, "").replace(/\n/g, "");
            var doc = s.match(/"mutations"(.*)"document"/m)[1];
            doc=s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#0*39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
            var ver = '0.01';
            try
            {
                ver = doc.match(/Verzija:\s*(.+?)##/)[1];
            }
            catch(ev)
            {
                ver = '0.01';
            }
            if(ver != VERSION)
            {
                displayErrFrame("Твојата тренутна верзија на скриптата е застарена. Ве молиме да ја симнете најновата. (Trenutna: "+VERSION+" | aktualna: "+ver+")", updateUrl);
                return;
            }
            var slika = doc.match(/Slika:\s*(.+?)##/)[1];
            var orders = doc.match(/Наредба:\s*(.+?)##/)[1];
            var link  = doc.match(/Блог Линк:\s*(.+?)##/)[1];
            var date  = doc.match(/Датум:\s*(.+?)##/)[1];
            var mon   = doc.match(/Форум:\s*(.+?)##/)[1];      

            displayFrame(images[slika-1],orders,link,mon,date);
        }
        catch(e)
        {
            displayErrFrame("Дојдено е до грешка при бирање на команди. Ве молиме да пријавите на IRC каналот #visionmkd.","https://02.chat.mibbit.com/");
            throw e;
        }
    }
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function displayFrame(img,orders,link,mon,date)
    {
        var news;

        if(img == undefined){
           img = images[0];
        }
        if(orders == undefined)orders="";
        if(link == undefined)
        {
            link = "";
        }
        else{
          link = link.replace(/\\/g,"");
        }
        if(date == undefined) date = "";
        if(mon == undefined){
            mon = "";
        }
        else {
            mon = mon.replace(/\\/g,"");
            mon='<p><a href="'+mon+'">Chaos Order Форум</a></p>';
        }
        try{
            news = document.getElementById('news');
        }
        catch(e){
            displayErrFrame("Дојдено е до грешка во запишувањето.");
        }

        if(news){
            var ordersDiv = document.createElement('div');
            ordersDiv.className = 'box';
            ordersDiv.innerHTML = '\
            <div class="title"><h2 style="font-size: x-large;" id="Наредба на Единицата">Наредба</h2></div>\
            <div class="latest_events box">\
                <div class="item elem">\
                    <div class="iconholder"><img class="test" src="'+img+'" alt=""/></div>\
                    <div class="holder">\
                        <p style="color: #000000;"><a class="dotted" href="'+link+'">'+orders+'</a></p>\
                        <p style="border-top: 1px solid gray;">'+date+'</p>'
                        +mon+
                    '</div>\
                </div>\
            </div>';
            news.parentNode.insertBefore(ordersDiv, news);
        }
        function genFlash()
        {
            if(typeof(sIFR) == 'function')
            {
                sIFR.replaceElement(named({sSelector:"#visionmkd", sFlashSrc:"/flash/delicious.swf", sColor:"#4c4c4c", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:0, nPaddingBottom:0, sFlashVars:"", sWmode:"transparent"}));
            }
        }

        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + genFlash + ')();'

        document.body.appendChild(script);
        document.body.removeChild(script);
    }


    function displayErrFrame(orders, link, mon, date)
    {
        displayFrame(images[4],orders, link, mon, date )
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
                displayErrFrame("(GM) Дојдено е до грешка "+response.status+" ("+response.statusText+") во бирањето на командите.");
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
                    displayErrFrame("Дојдено е до грешка "+xhr.status+" ("+xhr.statusText+") во бирањето на командите.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Страницата за команди е Недостапна.");
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
                displayErrFrame("Неуспешна инсталација на скриптата. Ве молиме повторно да ја инсталирате истата.");
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
        displayErrFrame("Недостапен пристап!");
        throw e;
    }


})();