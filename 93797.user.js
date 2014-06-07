// ==UserScript==
// @name            Austrian army orders
// @namespace       www.erepublik.com
// @author          Cira, Updated and Changed by Metallon
// @include         http://www.erepublik.com/*
// @version         0.05
// ==/UserScript==

(function(undefined)
{
    var VERSION = '0.05';
    var url = 'https://docs.google.com/document/d/1z9NkMSTw1vtPo59p5HdQFQbScqRK672tzHZBsTYNdIc/edit?hl=en&authkey=CNev-88M';
    var updateUrl = 'http://userscripts.org/scripts/show/93797';

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
            var ver = '0.00';
            try
            {
                ver = doc.match(/Version:\s*(.+?)##/)[1];
            }
            catch(ev)
            {
                ver = '0.00';
            }
            if(ver != VERSION)
            {
                displayErrFrame("Your script is outdated (Your version: "+VERSION+" | Current: "+ver+")", updateUrl);
                return;
            }
            var slika = doc.match(/Pic:\s*(.+?)##/)[1];
            var orders = doc.match(/Order:\s*(.+?)##/)[1];
            var link  = doc.match(/Link:\s*(.+?)##/)[1];
            var date   = doc.match(/Date:\s*(.+?)##/)[1];
            var mon    = doc.match(/Newspaper:\s*(.+?)##/)[1];
            
            displayFrame(images[slika-1],orders,link,mon,date);
        }
        catch(e)
        {
            displayErrFrame("Error, no orders found. Please join Rizon IRC #eAustria.","http://rizon.net/index.php?do=chat");
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
        var main;

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
        if(mon == undefined)
        {
            mon = "";
        }
        else{
          mon = mon.replace(/\\/g,"");
        }


        addGlobalStyle('.leftBoxs { float:left; margin-right:8px; }');
        
        main = document.getElementById('news');
        if (main) {
            var logo = document.createElement("div");
            logo.className = 'box';
            logo.innerHTML ='<div class="title"><h1>Ukazi</h1></div>'+
                '<div style="float: left;" class="core">'+
                    '<div class="item art_elem">'+
                        '<div class="leftBoxs">'+
                            '<img src="'+img+'" alt="icon" />'+
                        '</div>'+
                        '<div class="holder">'+
                            '<p><a class="dotted" href="'+link+'">'+orders+'</a></p>'+
                            '<p>'+date+'</p>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="item more" id="top_rated_more_link"><a class="dotted" href="'+mon+'">Austrian Army HQ</a></div>'
            main.parentNode.insertBefore(logo, main);
        }
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
                displayErrFrame("(GM) An error occurred "+response.status+" ("+response.statusText+") when reading the orders.");
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
                    displayErrFrame("An error occurred "+xhr.status+" ("+xhr.statusText+") when reading the orders.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("The site with orders is not available.");
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
                displayErrFrame("Installation failed, please try again.");
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