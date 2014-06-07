// ==UserScript==
// @name          Battle Orders (eRep)
// @namespace      bulgarian orders
// @description     Battle Orders (eRep)
// @version        1.0
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

function fetchDisplayOrders ()
{
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://moviest.poseidon.icnhost.net/orders.php',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            }, 
            onload:function(response)
            {
                var displayEl = document.createElement("div");
                var html = response.responseText;
                displayEl.setAttribute('class', 'column');
                displayEl.setAttribute('style', 'padding-bottom:3px;text-align:left;');
                displayEl.innerHTML = html;
                latest=document.getElementById('orderContainer');
                latest.parentNode.insertBefore(displayEl, latest);
            },
            onerror:function(response)
            {
                var displayEl = document.createElement("div");
                displayEl.setAttribute('class', 'column');
                displayEl.setAttribute('style', 'padding-bottom:3px;text-align:center;');
                displayEl.innerHTML = "Error fetching orders...";
                var latest=document.getElementById('orderContainer');
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