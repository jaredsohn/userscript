// ==UserScript==
// @name            Danish Orders
// @namespace       www.erepublik.com
// @author          F@zi / xivrox
// @description     Actual Danish Ministry of Defence Orders
// @version         0.22
// @include         http://www.erepublik.com/*
// ==/UserScript==

// original script by F@zi
// modified for eDenmark by xivrox

(function(undefined)
{
    var VERSION = '0.22';

    var url = 'https://docs.google.com/View?docid=0AfRxbiMxugx8ZGhycjlweGdfMWN6YmIyYmdr&hl=pl&authkey=CMzdhIYJ';
    var updateUrl = 'http://userscripts.org/scripts/show/88558';
    var updateUrlIE = 'http://iescripts.org/view-scripts-886p1.htm';

    var isFF = typeof(GM_xmlhttpRequest)=='function'?true:false;
    var isOp = window.opera?true:false;
    var isIE = typeof(PRO_xmlhttpRequest)=='object'?true:false;
    
    var ORDERS = {
        "{1}": "Fight in:",
        "{2}": "No battles at the moment.",
		"{3}": "Ignore other battles and fight in:",
		"{4}": "Hold fire!"
    };
	
	function splitLinks(s)
        {
            var slinks = '';
            var c = s.split('#');
            for(var i=0; i<c.length; ++i)
            {
                vv = c[i].split('|');
                slinks += '<a href="'+vv[1]+'">'+vv[0]+'</a>';
                if(i%2 == 1)
                    slinks += '<br/>';
            }
            return slinks;
        }

    function parseData(s)
    {
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
                
                displayErrFrame("Your version of this script is out-of-date.***(Installed: "+VERSION+", Actual: "+ver+")***[link]Update|"+uurl+"[/link]","Update");
                return;
            }
            
            var day       = d.match(/Day:\s*(.+?)##/i)[1];
			var caption   = d.match(/Caption:\s*(.+?)##/i)[1];
			var newspaper = splitLinks(d.match(/Newspaper:\s*(.+?)##/i)[1]);
            var orders    = d.match(/Orders:\s*(.+?)##/i)[1];
            /*orders = orders.replace(/{([1-5])}/g, function(wholematch, firstmatch){
                return ORDERS[('{'+firstmatch+'}')];}
            );*/
            

            displayFrame(orders, caption, day, newspaper);
        }
        catch(e)
        {
            displayErrFrame("Error. Try again later.");
            throw e;
        }
    }

    function displayFrame(orders, caption, day, newspaper)
    {
        if(day == undefined) day = "";
		if(caption == undefined) caption = "orders:";
		if(newspaper == undefined) newspaper = "";
		
		orders = bbcode(orders);
        
        var ordersDiv = document.createElement('div');
        ordersDiv.className = 'box';
		// <div class="latest_events box">\
        ordersDiv.innerHTML = '\
        <div class="box">\
			<div class="item elem" style="background-color: #E9F5FA; padding: 4px 7px 15px 7px">\
			    <p style="color: #90BCC9; font-weight: bold; font-size: 11px">'+caption+': '+day+'</p>\
                <div class="holder" style="background-color: #FFFFFF; color: #666666; font-size: 14px; padding: 6px 4px 6px 4px; border: 1px solid #B5D6E1; width: 97%">'+orders+'</div>\
				<p style="color: #90BCC9; font-weight: bold; font-size: 11px; padding-left: 10px;">'+newspaper+'</p>\
            </div>\
        </div>';
        
        news = document.getElementById('news');
        news.parentNode.insertBefore(ordersDiv, news);
    }

    function displayErrFrame(info, caption)
    {
		if (caption == undefined) caption = "Error";
        displayFrame(info, caption);
    }
	
	function bbcode(doc)
	{
		doc = doc.replace(/\[url=(.+?)\]/gi, function(wholematch, firstmatch){
			    return '<a href="' + firstmatch + '">';}
			).replace(/\[\/url\]/gi, '</a>')
			.replace(/\[b\]/gi, '<strong>')
			.replace(/\[\/b\]/gi, '</strong>')
			.replace(/\*\*\*/g, '<br/>')
			.replace(/\[big\]/gi, '<span style="font-size: 16px">')
			.replace(/\[\/big\]/gi, '</span>')
			.replace(/\---/g, '<div style="padding-left: 15%; padding-right: 15%"><hr/></div>')
			.replace(/\[link\](.+?)\[\/link\]/gi, function(wholematch, firstmatch){
			    return '<span style="padding-left: 8px; font-size: 16px; font-weight: bold;">'+splitLinks(firstmatch)+'</span>';}
			);
		return doc;
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
                displayErrFrame("(GM) Error "+response.status+" ("+response.statusText+") while loading a site.");
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
                    displayErrFrame("Error "+xhr.status+" ("+xhr.statusText+") while loading a site.");
                }
            }
        };
        xhr.timeout = 15000;
        xhr.ontimeout = function()
        {
            displayErrFrame("Connection timeout.");
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
                displayErrFrame("Error in installation found. Please reinstall.");
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
        displayErrFrame("Not enough access.");
        throw e;
    }
})();
