// ==UserScript==
// @name          Damge Forooshi Ashkan va shoraka :D
// @namespace      Damge Forooshi Ashkan va shoraka Orders
// @description     اسکریپت دمیج فروشی اشکان و شرکا!
// @version        1.0
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

function fetchDisplayOrders ()
{
    var userLink = $("#large_sidebar .user_section .user_avatar");
    var profileUrl = userLink.attr("href");
    var ID = profileUrl.substr(profileUrl.lastIndexOf("/") + 1);
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://dsw.erep.ir/store/order.php?ID=' + ID,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                'Accept': 'application/atom+xml,application/xml,text/xml',
            }, 
            onload:function(response)
            {
                var displayEl = document.createElement("div");
                var html = response.responseText;
                displayEl.setAttribute('class', 'column');
                displayEl.setAttribute('style', 'padding-bottom:3px;text-align:right;');
                displayEl.innerHTML = html;
                latest=document.getElementById('orderContainer');
                latest.parentNode.insertBefore(displayEl, latest);
            },
            onerror:function(response)
            {
                var displayEl = document.createElement("div");
                displayEl.setAttribute('class', 'column');
                displayEl.setAttribute('style', 'padding-bottom:3px;text-align:center;');
                displayEl.innerHTML = "خطا در دریافت اطلاعات اردر";
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