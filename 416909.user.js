// ==UserScript==
// @id             Subeta - Crystals Fragmentization
// @name           Subeta - Crystals Fragmentization
// @version        1.6
// @namespace      
// @author         Subeta Bots
// @description    
// @include        http://*subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page*
// @include        http://subeta.net/ushop.php?act=dosearch&itemname=*&type=shops&src=cf*
// @include        http://subeta.net/explore/fragmentizer.php?act*
// @include        http://subeta.net/ushop.php?shopid=*&act=buy
// @include        http://subeta.net/myshop.php?shopid=*&act=quickstock&src=cf
// @include        http://subeta.net/myshop.php?shopid=294543&act=quickstock
// @include        http://subeta.net/ushop.php?shopid=*
// @include        http://subeta.net/inventory.php?act=crystals
// @run-at         document-end
// ==/UserScript==

/* localStorage Naming Convention
 * ============================================
 * Current SubetaLodge Page:	sbl_cf_cPage
 * Current SubetaLodge Item #:	sbl_cf_cItem
 * ============================================ */

var QSURL = 'http://subeta.net/myshop.php?shopid=*&act=quickstock';
var MODE = 'TURNIN';

if (document.URL.indexOf('subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/') > -1) // @ SubetaLodge for item crawling
{
    var indexExists = false;
    
    if (document.URL.indexOf('?citem=') > -1)
    {
        indexExists = true;
        localStorage.setItem('sbl_cf_cPage', parseInt(document.URL.substring(document.URL.indexOf('userprice-asc/page/') + 19, document.URL.indexOf('?citem='))));
        localStorage.setItem('sbl_cf_cItem', parseInt(document.URL.substring(document.URL.indexOf('?citem=') + 7)));
        if (document.URL.indexOf('?completed=n') == -1)
        	up_sb1cf_cItem();
    }
    
    if (localStorage.getItem('sbl_cf_cPage') == null || localStorage.getItem('sbl_cf_cPage') == 'null')
    {
    	localStorage.setItem('sbl_cf_cPage', 1);
        localStorage.setItem('sbl_cf_cItem', 0);
        window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/1';
    }
    else if (indexExists == false && document.URL.substring(document.URL.indexOf('userprice-asc/page/') + 19) != localStorage.getItem('sbl_cf_cPage').toString())
    {
        window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + localStorage.getItem('sbl_cf_cPage').toString();
    }
    else if (indexExists == true && document.URL.substring(document.URL.indexOf('userprice-asc/page/') + 19, document.URL.indexOf('?citem=')) != localStorage.getItem('sbl_cf_cPage').toString())
    {
        window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + localStorage.getItem('sbl_cf_cPage').toString();
    }
    else
    {        
        /* Obtain all item names on subetalodge page */
        var arrListName = document.getElementById('left').getElementsByClassName('listname');
        var arrItems = new Array();
        for (var i = 0; i < arrListName.length; i++)
        {
            arrItems.push(arrListName[i].innerHTML);
        }
        
        window.location.href = 'http://subeta.net/ushop.php?act=dosearch&itemname=' + encodeURIComponent(arrItems[parseInt(localStorage.getItem('sbl_cf_cItem'))]) + '&type=shops&src=cf&cpage=' + localStorage.getItem('sbl_cf_cPage') + '&citem=' + localStorage.getItem('sbl_cf_cItem');
    }
}
else if (document.URL.indexOf('http://subeta.net/ushop.php?act=dosearch') > -1 && document.URL.indexOf('src=cf') > -1)
{
    var cpage = document.URL.substring(document.URL.indexOf('&cpage=') + 7, document.URL.indexOf('&citem='));
    var citem = document.URL.substring(document.URL.indexOf('&citem=') + 7);
    
    if (document.documentElement.innerHTML.indexOf('There are none of that item in the shops!') > -1)
    {
        window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + cpage.toString() + '?citem=' + citem;
    }
    else
    {
        var itemName = document.URL.substring(document.URL.indexOf('&itemname=') + 10, document.URL.indexOf('&type=shops'));
        itemName = decodeURIComponent(itemName);
        
        var htmltd = document.getElementsByTagName('td');
        var arrPrices = new Array();
        for (var i = 0; i < htmltd.length; i++)
        {
            if (htmltd[i].innerHTML.indexOf(' sP') > -1 && htmltd[i].innerHTML.indexOf('<input') == -1)
            {
                arrPrices.push(convertPriceToInt(htmltd[i].innerHTML.substring(0, htmltd[i].innerHTML.indexOf(' sP'))));
            }
        }
        
        var ptBreak = -1;
        for (var i = 0; i < arrPrices.length; i++)
        {
            if (arrPrices[i] <= 2000)
                ptBreak += 1;
        }
        
        if (ptBreak == -1) // No items below 2k
        {
            window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + cpage.toString() + '?citem=' + citem;
        }
        else if (ptBreak == 0 && checkOwnShopItemID() == 0)
        {
            window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + cpage.toString() + '?citem=' + citem;
        }
        else
        {
            buyItem(ptBreak);
        }
    }
}
else if (document.URL.indexOf('http://subeta.net/ushop.php?shopid=') > -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('Oops, you have too many items in') > -1)
{
    //window.open('http://subeta.net/explore/fragmentizer.php?act=#', '_blank');
    window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/' + localStorage.getItem('sbl_cf_cPage').toString();
}
else if (document.URL.indexOf('http://subeta.net/ushop.php?shopid=') > -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('The price on this item has changed, the purchase has been cancelled.') > -1)
{
    window.history.back();
}
else if (document.URL.indexOf('http://subeta.net/ushop.php?shopid=') > -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('Purchase failed.') > -1)
{
    var date = new Date();
    var d  = date.getDate();
    var day = (d < 10) ? '0' + d : d;
    var m = date.getMonth() + 1;
    var month = (m < 10) ? '0' + m : m;
    var yy = date.getYear();
    var year = (yy < 1000) ? yy + 1900 : yy;
    var hr = date.getHours();
    var min = date.getMinutes();
    var secs = date.getSeconds();

    alert('No more sP. Script Stopped at ' + day + '/' + month + '/' + year + ' ' + hr + ':' + min + ':' + secs);
}
else if (document.URL.indexOf('http://subeta.net/explore/fragmentizer.php?act=bank') > -1)
{
    if (document.getElementsByTagName('body')[0].innerHTML.indexOf('Wait... nope! You don\'t have any crystals :(!') > -1)
    {
        window.location.href = 'http://subeta.net/inventory.php?act=crystals';
    }
    else if (document.getElementsByTagName('body')[0].innerHTML.indexOf('Invalid ItemID') > -1 || document.getElementsByTagName('body')[0].innerHTML.indexOf('Did not take items') > -1)
    {
        setTimeout('window.location.href = "http://subeta.net/inventory.php?act=crystals";', 2000);
    }
    else
    {
        var arrInputs = document.getElementsByTagName('input');
        for (var i = 0; i < arrInputs.length; i++)
        {
            if (arrInputs[i].value == 'Turn In Crystals!')
                arrInputs[i].click();
        }
    }
}
else if (document.URL.indexOf('http://subeta.net/explore/fragmentizer.php?act') > -1)
{
    if (document.getElementsByTagName('body')[0].innerHTML.indexOf('No Items!') > -1 || document.getElementsByTagName('body')[0].innerHTML.indexOf('Invalid Items!') > -1 || document.getElementsByTagName('body')[0].innerHTML.indexOf('The fragmentizer makes strange noises, and here is the result:') > -1)
    {
        if (MODE == 'TURNIN')
        	window.location.href = 'http://subeta.net/explore/fragmentizer.php?act=bank';
        else if (MODE == 'STOCK')
            window.location.href = QSURL + '&src=cf';
    }
    else if (document.getElementsByTagName('body')[0].innerHTML.indexOf('Invalid ItemID') > -1 || document.getElementsByTagName('body')[0].innerHTML.indexOf('Did not take items') > -1)
    {
        setTimeout('window.location.href = "http://subeta.net/inventory.php?act=crystals";', 2000);
    }
    else
    {
        document.getElementById('select-all').click();
        var arrInputs = document.getElementsByTagName('input');
        var index = -1;
        for (var i = 0; i < arrInputs.length; i++)
        {
            if (arrInputs[i].value == 'Fragmentize!')
                index = i;
        }
        
        arrInputs[index].click();
    }
}
else if (document.URL.indexOf(QSURL + '&src=cf') > -1)
{
    var arrItem129432 = document.getElementsByClassName('item-129432 item-row item');
    var arrActionIDs = new Array();
    for (var i = 0; i < arrItem129432.length; i++)
    {
        var currID = arrItem129432[i].innerHTML.substring(arrItem129432[i].innerHTML.indexOf('<input type="radio" name="action[') + 33);
        currID = currID.substring(0, currID.indexOf(']" value="shop" id="shop">'));
        arrActionIDs.push(currID);
    }
    
    var btnStock;
    for (var i = 0; i < document.getElementsByTagName('input').length; i++)
    {
        if (document.getElementsByTagName('input')[i].value == 'shop' && document.getElementsByTagName('input')[i].name.indexOf('action[') > -1)
        for (var j = 0; j < arrActionIDs.length; j++)
        {
            if (document.getElementsByTagName('input')[i].name == 'action[' + arrActionIDs[j] + ']')
                document.getElementsByTagName('input')[i].checked = true;
        }
        else if (document.getElementsByTagName('input')[i].value == 'Stock')
            btnStock = document.getElementsByTagName('input')[i];
    }
    
    btnStock.click();
}
else if (document.URL == QSURL)
{
    window.location.href = 'http://www.subetalodge.org/list_all/rhigh/99/rlow/66/sort/userprice-asc/page/1';
}
else if (document.URL.indexOf('http://subeta.net/ushop.php?shopid=') > -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('You purchased a') > -1 && document.getElementsByTagName('body')[0].innerHTML.indexOf('Back to Search') > -1)
{
    window.history.back();
}
else if (document.URL == 'http://subeta.net/inventory.php?act=crystals')
{
    var segment = document.getElementsByClassName('container-fluid')[0].innerHTML;
    var itemsOnHand = segment.substring(segment.indexOf('You have <b>') + 12, segment.indexOf('</b> items on hand.'));
    var totalCapacity = segment.substring(segment.indexOf('We will only display <b>') + 24, segment.indexOf('</b> at a time.'));
    
    if (parseInt(itemsOnHand) > parseInt(totalCapacity) - 30)
    {
        window.location.href = 'http://subeta.net/explore/fragmentizer.php?act=';
    }
    else
    {
        setTimeout('window.location.href="http://subeta.net/inventory.php?act=crystals";', 30000);
    }
}

/*===========*
 * Functions *
 *===========*/

function convertPriceToInt(priceStr)
{
    var cleanedStr = '';
    for (var i = 0; i < priceStr.length; i++)
    {
        if (priceStr[i] == '0' || priceStr[i] == '1' || priceStr[i] == '2' || priceStr[i] == '3' || priceStr[i] == '4' || priceStr[i] == '5' || priceStr[i] == '6' || priceStr[i] == '7' || priceStr[i] == '8' || priceStr[i] == '9')
            cleanedStr = cleanedStr.concat(priceStr[i]);
    }
    return(parseInt(cleanedStr));
}

function checkOwnShopItemID()
{
    var myShopURL = document.getElementsByTagName('body')[0].innerHTML.substring(document.getElementsByTagName('body')[0].innerHTML.indexOf('<li class="bottom"><a href="/myshop.php?shopid=') + 47);
	myShopURL = myShopURL.substring(0, myShopURL.indexOf('" role="menuitem"'));
    
    var formsArr = document.getElementsByTagName('form');
    var arrBuyShopIDs = new Array();
    for (var i = 0; i < formsArr.length; i++)
    {
        if (formsArr[i].action.toString().indexOf('/ushop.php?shopid=') > -1)
        {
            var s = formsArr[i].action.toString();
            arrBuyShopIDs.push(s.substring(s.indexOf('/ushop.php?shopid=') + 18, s.indexOf('&act=buy')));
        }
    }
    var itemIdFromOwnShop = -1;
    for (var i = 0; i < arrBuyShopIDs.length; i++)
    {
        if (arrBuyShopIDs[i] == myShopURL)
        {
            itemIdFromOwnShop = i;
        }
    }
    
    return itemIdFromOwnShop;
}

function up_sb1cf_cItem()
{
    if (parseInt(localStorage.getItem('sbl_cf_cItem')) == 24)
    {
        if (parseInt(localStorage.getItem('sbl_cf_cPage')) + 1 >= 246)
        {
            localStorage.setItem('sbl_cf_cPage', 1);
            localStorage.setItem('sbl_cf_cItem', 0);
        }
        else
        {
            localStorage.setItem('sbl_cf_cPage', parseInt(localStorage.getItem('sbl_cf_cPage')) + 1);
            localStorage.setItem('sbl_cf_cItem', 0);
        }
    }
    else
        localStorage.setItem('sbl_cf_cItem', parseInt(localStorage.getItem('sbl_cf_cItem')) + 1);
}

function buyItem(num)
{
    var myShopURL = document.getElementsByTagName('body')[0].innerHTML.substring(document.getElementsByTagName('body')[0].innerHTML.indexOf('<li class="bottom"><a href="/myshop.php?shopid=') + 47);
	myShopURL = myShopURL.substring(0, myShopURL.indexOf('" role="menuitem"'));
    
    var formsArr = document.getElementsByTagName('form');
    var arrBuyShopIDs = new Array();
    for (var i = 0; i < formsArr.length; i++)
    {
        if (formsArr[i].action.toString().indexOf('/ushop.php?shopid=') > -1)
        {
            var s = formsArr[i].action.toString();
            arrBuyShopIDs.push(s.substring(s.indexOf('/ushop.php?shopid=') + 18, s.indexOf('&act=buy')));
        }
    }
    var itemIdFromOwnShop = -1;
    for (var i = 0; i < arrBuyShopIDs.length; i++)
    {
        if (arrBuyShopIDs[i] == myShopURL)
        {
            itemIdFromOwnShop = i;
        }
    }
    
    var inputsArr = document.getElementsByTagName('input');
    var buybtnArr = new Array();
    for (var i = 0; i < inputsArr.length; i++)
    {
        if (inputsArr[i].value == 'Buy')
        {
            buybtnArr.push(inputsArr[i]);
        }
    }
    
    var counter = 0;
    
    var buyInterval = self.setInterval(function(){counter = buyStuff(buyInterval, buybtnArr, counter, num, itemIdFromOwnShop)}, 150);
    function buyStuff(intv, arrB, c, num, iidfromownshop)
    {        
        if (c <= num)
        {
            if (c != iidfromownshop)
            	arrB[c].click();
            return c + 1;
        }
        else
        {
            intv = window.clearInterval(intv);
    		window.location.href = window.location.href;
        }
    }
}