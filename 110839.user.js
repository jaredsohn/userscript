// ==UserScript==
// @name           eIRAN Orders (eRep)
// @namespace      www.eRepublik.ir
// @description    eIRAN Battle Orders (eRep)
// @version        0.5
// @include        http://www.erepublik.com/en
// ==/UserScript==

function fetchDisplayOrders ()
{
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://eranorders.persiangig.com/orders.php.xml',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            }, 
            onload:function(response)
            {
				var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText, "application/xml");
				var entries = dom.getElementsByTagName('order');
                var displayEl = document.createElement("div");
                var html = '' + entries[0].textContent;
                displayEl.setAttribute('class', 'core');
                displayEl.setAttribute('style', 'padding-bottom:3px;text-align:left;');
                displayEl.innerHTML = '<embed width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=eIran Public Orders&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"/><br />' + html;
                latest=document.getElementById('content');
                latest.parentNode.insertBefore(displayEl, latest);
            },
            onerror:function(response)
            {
                var displayEl = document.createElement("div");
                displayEl.setAttribute('class', 'core');
                displayEl.setAttribute('style', 'padding-bottom:10px;');
                displayEl.innerHTML = "Error fetching orders...";
                var latest=document.getElementById('latestnews');
                latest.parentNode.insertBefore(displayEl, latest);
            }
        }
    );
}

function updateOrders ()
{
    fetchDisplayOrders();
}

//function Main(e) {
   updateOrders();
//}

//window.addEventListener('load', Main, false);