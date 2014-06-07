// ==UserScript==
// @name           IceyMod 4 Escaria
// @namespace      escaria
// @include        http://*.escaria.com/world/client*
// @description    Baut nuetzliche Features in Escaria ein
// @version        1.22
// ==/UserScript==
GL_HomeURL = 'http://ec.bechtelweb.de/IceyMod/';
GL_UpdateURL = 'http://ec.bechtelweb.de/checkversion.php';
GL_Version = "1.22";
GL_Initialized = false;
GL_Release = null;
GL_AddonName = "IceyMod";
GL_User = "";


GL_FirstTradeTabInit = false;
GL_Trade1_1 = "500000";
GL_Trade1_2 = "5000000";
GL_Trade2_1 = "1";
GL_Trade2_2 = "10000000";
GL_OldTradeSize = "";
GL_TradeSites = null;
GL_TradeHolz = 0;
GL_TradeNahrung = 0;
GL_TradeStein = 0;
GL_TradeEisen = 0;
GL_TradeMet = 0;
GL_TradeWein = 0;

GL_SpeedTime = null;
GL_SpeedTimerId = null;
GL_SpeedTimerButton = false;

function open_Speed_button(a)
{
    GL_SpeedTimerButton = true;
    open_Speed(a);
    GL_SpeedTimerButton = false;
}

function open_Speed(a)
{
    speedId = setInterval(function ()
    {
        clearInterval(speedId);
	
		var popup = null;
		if(Browser == 'chrome')
			popup = gid('gwt-uid-71Popup');
		else
			popup = gid('gwt-uid-95Popup');
			
        if (popup == null)
        {
            clearInterval(speedId);
            return;
        }
        var panel = popup.getElementsByClassName('remainingTimePanel')[0];
        var strTime = panel.firstChild.firstChild.children[1].firstChild.innerHTML;

        popup.addEventListener('click', open_Speed_button, false);
        if (strTime == "-")
        {
            gid('SpeedTimer').innerHTML = "";
            if (GL_SpeedTimerId != null) clearInterval(GL_SpeedTimerId);

            GL_SpeedTimerId = null;
            return;
        }
        if (gid('SpeedTimer').innerHTML != "" && GL_SpeedTimerButton == false)
        {
            return;
        }
        if (GL_SpeedTimerId != null) clearInterval(GL_SpeedTimerId);

        GL_SpeedTimerId = null;

        var h = strTime.indexOf(':');
        var hour = strTime.substr(0, h);
        var m = strTime.indexOf(':', h + 1);
        var min = strTime.substring(h + 1, m);

        var sec = strTime.substring(m + 1);

        GL_SpeedTime = new Date(0, 0, 0, hour, min, sec - 1);

        GL_SpeedTimerId = setInterval(function ()
        {
            if (GL_SpeedTime == null)
            {
                clearInterval(GL_SpeedTimerId);
                return;
            }
            if (GL_SpeedTime.getHours() == 0 && GL_SpeedTime.getMinutes() == 0 && GL_SpeedTime.getSeconds() == 0)
            {
                gid('SpeedTimer').innerHTML = "";
                clearInterval(GL_SpeedTimerId);
                return;
            }
            else
            {
                GL_SpeedTime.setSeconds(GL_SpeedTime.getSeconds() - 1);
                gid('SpeedTimer').innerHTML = "Speed: " + ((GL_SpeedTime.getHours() < 10) ? '0' + GL_SpeedTime.getHours() : GL_SpeedTime.getHours()) + ":" + ((GL_SpeedTime.getMinutes() < 10) ? '0' + GL_SpeedTime.getMinutes() : GL_SpeedTime.getMinutes()) + ":" + ((GL_SpeedTime.getSeconds() < 10) ? '0' + GL_SpeedTime.getSeconds() : GL_SpeedTime.getSeconds());
            }
        }, 1000);


    }, 500);
}

function speedTimerFunc()
{
    GL_SpeedTimerId = setInterval(function ()
    {
        if (GL_SpeedTime == null)
        {
            clearInterval(GL_SpeedTimerId);
            return;
        }
        if (GL_SpeedTime.getHours() == 0 && GL_SpeedTime.getMinutes() == 0 && GL_SpeedTime.getSeconds() == 0)
        {
            gid('SpeedTimer').innerHTML = "";
            clearInterval(GL_SpeedTimerId);
            return;
        }
        else
        {
            GL_SpeedTime.setSeconds(GL_SpeedTime.getSeconds() - 1);
            gid('SpeedTimer').innerHTML = "Speed: " + ((GL_SpeedTime.getHours() < 10) ? '0' + GL_SpeedTime.getHours() : GL_SpeedTime.getHours()) + ":" + ((GL_SpeedTime.getMinutes() < 10) ? '0' + GL_SpeedTime.getMinutes() : GL_SpeedTime.getMinutes()) + ":" + ((GL_SpeedTime.getSeconds() < 10) ? '0' + GL_SpeedTime.getSeconds() : GL_SpeedTime.getSeconds());
        }
    }, 1000);
}

/**********
 Seite
 **********/

function getEl(Wert)
{
    return document.evaluate(
    Wert, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getElIt(Wert)
{
    return document.evaluate(
    Wert, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}

function gid(Wert)
{
    return document.getElementById(Wert);
}

function hasClass(ele, cls)
{
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls)
{
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls)
{
    if (hasClass(ele, cls))
    {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}


function appendElement(El_child, El_parent, attr, El_style)
{
    var El = document.createElement(El_child);
    for (var i in attr)
    El[i] = attr[i];
    for (var i in El_style)
    El.style[i] = El_style[i];
    El_parent.appendChild(El);
    return El;
}

function insertElementBefore(El_child,pos, El_parent, attr, El_style)
{
	/*if(Browser == 'ff')
	{
		var El = document.createElement(El_child);
		for (var i in attr)
		El[i] = attr[i];
		for (var i in El_style)
		El.style[i] = El_style[i];
		document.insertBefore(El, EL_parent);
		return El;
	}
	else
	{
	*/
		var El = document.createElement(El_child);
		for (var i in attr)
		El[i] = attr[i];
		for (var i in El_style)
		El.style[i] = El_style[i];
		El_parent.insertBefore(El, El_parent.children[pos]);
		return El;
	//}
}



var oldSize = 0;
var sizePos = "";


function menuClick(a)
{
    gid('resourcePanel').firstChild.children[5].style.display = 'block';
    gid('resourcePanel').firstChild.children[6].style.display = 'block';

    gid('dialogPanel').style.width = GL_OldTradeSize;
}

var avgLevel = new Array();

function open_BuildingsMenu(a)
{
	var iter = getElIt("//div[@class='placeableImage']");
	
	var buildings = new Array();
	
	var result=iter.iterateNext();
	var text = "";
	while(result)
	{
		text = result.title;
		if(buildings[text] == null)
		{
			buildings[text] = 1;
		}
		else
		{
			buildings[text] += 1;
		}
		result=iter.iterateNext();
	}
	  
	for (var key in buildings) 
	{
		if(buildings[getBuildingName(key)] == null)
			getTotalNumberOfBuilding(key,buildings);
	}

	var div = gid('buildingList');
	div.innerHTML = "";
	var major = "";
	if(div != null)
	{
		
		var tuples = [];

		for (var key in buildings) 
			tuples.push([key, buildings[key]]);

		tuples.sort(function(a, b) 
		{
			//if(!isMajor(a) && !isMajor(b))
			//if(a.indexOf(b) != -1)
			//	return -1;
			//return (a < b) ? -1 : ((a > b) ? 1 : 0);
			var oString = new String(a[0]);
			return oString.localeCompare(b[0]);
		});

		div.innerHTML = '<a href="javascript:ddtreemenu.flatten(\'buildingMenu\', \'expand\')">Expand All</a> | <a href="javascript:ddtreemenu.flatten(\'buildingMenu\', \'contact\')">Collapse All</a>';
		var tempHTML = "";
		tempHTML += '<ul id="buildingMenu" class="treeview" style="padding-left:0px; width:100%;">';
		for (var i = 0; i < tuples.length; i++) 
		{
			
			var key = tuples[i][0];
			var value = tuples[i][1];

			if(isMajor(key))
			{
				if(major != "")
				{
					tempHTML += "</ul></li>";
					major = key;
				}
				else
				{
					major = key;
				}

				tempHTML += "<li><span style='min-width:30px; float:left; text-align:right;'>" + value + "</span>&nbsp;&nbsp;x " + key + "(&Oslash; lvl " + avgLevel[key].toFixed(2) + ")";
				tempHTML += "<ul>";
			}
			else
			{
				tempHTML += "<li ><a href=\"javascript:toggleHighlightOfBuilding('"+key+"')\"><span style='min-width:30px; float:left; text-align:right;'>" + value + "</span>&nbsp;&nbsp;x " + key + "</a></li>";
			}
			
		}
		tempHTML += "</ul></li></ul>";
		div.innerHTML += tempHTML;
		
		var s = appendElement('script', div, {'type':'text/javascript'});
		s.innerHTML = 'ddtreemenu.createTree("buildingMenu", true)';
		s.innerHTML += 'ddtreemenu.flatten(\'buildingMenu\', \'contact\')';

	}
	gid('buildingsListWrapper').style.display = 'block';

}

function isMajor(buildingName)
{
	return ((buildingName.indexOf('(') != -1)?  false :  true);
}
function getTotalNumberOfBuilding(buildingName, buildings)
{
	var name = getBuildingName(buildingName);
	var c = 0;
	var avg = 0;
	for (var key in buildings)
    {
        if (key.indexOf(name) != -1)
        {
            c += buildings[key];
			avg += getLevelOfBuilding(key) * buildings[key];
        }
    }
	avg = avg / c;
	avgLevel[name] = avg;
	buildings[name] = c;
}
function getLevelOfBuilding(building)
{
    var f = building.indexOf('(');
    var l = building.indexOf(')');
    return parseInt(building.substr(f + 1, l - f - 1));
}
function getBuildingName(building)
{
    var f = building.indexOf('(');
    return building.substr(0, f);
}
function disableAllHighlights()
{
if(Browser == 'ff')
{
		var nodes = getEl("//div[@class='placeableImage']");
	for (var i = 0; i < nodes.snapshotLength; i++) 
	{
	  var node = nodes.snapshotItem(i);
	  node.style.backgroundColor = "";

	}
}
else
{
	var iter = getElIt("//div[@class='placeableImage']");
	var result=iter.iterateNext();
	while(result)
	{
		result.style.backgroundColor = "";
		result=iter.iterateNext();
	}
}
}
function close_BuildingsMenu(a)
{
	gid('buildingsListWrapper').style.display = 'none';
	disableAllHighlights();
}

function modifyTradePage()
{
    var trade = gid('dialogPanel').firstChild.children[8].firstChild.children[2].firstChild.children[1].firstChild.firstChild.children[1].firstChild;
    var content = trade.getElementsByClassName('contentTable')[0].children[1];
    for (var i = 0; i < content.children.length - 1; i++)
    {

        content.children[i + 1].firstChild.style.textAlign = "right";
        content.children[i + 1].children[1].style.textAlign = "right";
        var offer = null;
		if(Browser == 'chrome')
			offer = content.children[i + 1].firstChild.innerText;
		else
			offer = content.children[i + 1].firstChild.textContent;
			
        var offerHtml = content.children[i + 1].firstChild.innerHTML;
        if (offer.indexOf('.') == -1)
        {
            var request = null;
			if(Browser == 'chrome')
				request = content.children[i + 1].children[1].innerText;
			else
				request = content.children[i + 1].children[1].textContent;

            if (offerHtml != '&nbsp;')
            {
                content.children[i + 1].firstChild.innerHTML = "&nbsp;" + itoad(offer.substr(offer.indexOf(' ') + 1)) + ": " + offer.substr(0, 1) + "&nbsp;";
                content.children[i + 1].children[1].innerHTML = "&nbsp;" + itoad(request.substr(request.indexOf(' ') + 1)) + ": " + request.substr(0, 1) + "&nbsp;";
            }
            else
            {
                content.children[i + 1].firstChild.innerHTML = "";
                content.children[i + 1].children[1].innerHTML = "";
            }
        }
    }
	if(Browser == 'chrome')
		sortTable(content, 0);

}

function newTradePage(a)
{
    var trade = gid('dialogPanel').firstChild.children[8].firstChild.children[2].firstChild.children[1].firstChild.firstChild.children[1].firstChild;

    var page = null;
	if(Browser == 'chrome')
		page = trade.getElementsByClassName('pageIndicatorLabel')[0].innerText;
	else
		page = trade.getElementsByClassName('pageIndicatorLabel')[0].textContent;
		
    page = page.substring(page.indexOf(' ') + 1, page.indexOf('/'));


    for (var i = 0; i < GL_TradeSites.length; ++i)
    {
        if (GL_TradeSites[i] == page)
        {
            modifyTradePage();
            return;
        }
    }

    var content = trade.getElementsByClassName('contentTable')[0].children[1];
    for (var i = 0; i < content.children.length - 1; i++)
    {
		if(Browser == 'chrome')
			content.children[i + 1].children[2].firstChild.addEventListener('click', deleteTradeSum, false);
		
		
        var offer = null;
		if(Browser == 'chrome')
			offer = content.children[i + 1].firstChild.innerText;
		else
			offer = content.children[i + 1].firstChild.textContent;

        var typ = offer.substr(0, offer.indexOf(':'));
        switch (typ)
        {
        case 'Holz':
            {
                GL_TradeHolz += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Nahrung':
            {
                GL_TradeNahrung += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Stein':
            {
                GL_TradeStein += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Eisen':
            {
                GL_TradeEisen += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Met':
            {
                GL_TradeMet += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Wein':
            {
                GL_TradeWein += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }

        }


    }
    modifyTradePage();
	printTradeSum();


    GL_TradeSites.push(page);

}

function printTradeSum()
{
    gid('tradeSum').innerHTML = "<table style='text-align: right;'><tr><td>Ressource</td><td>Gesamt</td></tr><tr><td>Holz: </td><td>" + itoad(GL_TradeHolz) + "</td></tr><tr><td>Nahrung: </td><td>" + itoad(GL_TradeNahrung) + "</td></tr><tr><td>Stein: </td><td>" + itoad(GL_TradeStein) + "</td></tr><tr><td>Eisen: </td><td>" + itoad(GL_TradeEisen) + "</td></tr><tr><td>Met: </td><td>" + itoad(GL_TradeMet) + "</td></tr><tr><td>Wein: </td><td>" + itoad(GL_TradeWein) + "</td></tr></table>";
}

function itoad(amount)
{
    var strAmount = "" + amount;
    var newAmount = "";
    var j = strAmount.length;
    for (var i = strAmount.length; i >= 3; i = i - 3)
    {
        if (i > 3) newAmount = "." + strAmount.substr(i - 3, 3) + newAmount;
        else
        {
            newAmount = strAmount.substr(i - 3, 3) + newAmount;
        }
        j = i - 3;
    }
    if (j > 0) newAmount = strAmount.substr(0, j) + newAmount;

    return newAmount;

}

function deleteTradeSum()
{

    GL_TradeSites = null;
    GL_TradeSites = Array();
    GL_TradeHolz = 0;
    GL_TradeNahrung = 0;
    GL_TradeStein = 0;
    GL_TradeEisen = 0;
    GL_TradeMet = 0;
    GL_TradeWein = 0;

    modifyTradePage();
	printTradeSum();
}

function insertTrade1(a)
{
    var kind = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[1].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.children[1].firstChild.firstChild.innerHTML;
    var max = GL_Trade1_1;
    var trade1 = GL_Trade1_1;
    switch (kind)
    {
    case 'Holz':
        {
            max = parseInt(gid('amount_wood').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Nahrung':
        {
            max = parseInt(gid('amount_food').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Stein':
        {
            max = parseInt(gid('amount_stone').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Eisen':
        {
            max = parseInt(gid('amount_iron').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Wein':
        {
            max = parseInt(gid('amount_wine').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Met':
        {
            max = parseInt(gid('amount_met').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    }
    if (max < parseInt(GL_Trade1_1)) trade1 = max;

    gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[2].firstChild.value = trade1;
    gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2].firstChild.value = GL_Trade1_2;
}
function insertTrade2(a)
{
    var kind = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[1].firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.firstChild.children[1].firstChild.firstChild.innerHTML;
    var max = GL_Trade2_1;
    var trade1 = GL_Trade2_1;
    switch (kind)
    {
    case 'Holz':
        {
            max = parseInt(gid('amount_wood').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Nahrung':
        {
            max = parseInt(gid('amount_food').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Stein':
        {
            max = parseInt(gid('amount_stone').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Eisen':
        {
            max = parseInt(gid('amount_iron').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Wein':
        {
            max = parseInt(gid('amount_wine').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    case 'Met':
        {
            max = parseInt(gid('amount_met').getElementsByClassName('gwt-Label')[0].innerHTML);
            break;
        }
    }
    if (max < parseInt(GL_Trade2_1)) trade1 = max;

    gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[2].firstChild.value = trade1;
    gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2].firstChild.value = GL_Trade2_2;
}

function openTrade(a)
{

    if (gid('tradeRestoreButton1') == null)
    {
		var tradeRestoreButton1 = null;
		var tradeRestoreButton2 = null;
		var tradeSaveButton1 = null;
		var tradeSaveButton2 = null;

		tradeRestoreButton2 = insertElementBefore('img',6, gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild, {
            'id': 'tradeRestoreButton2',
			'src': GL_HomeURL + 'restoretrade2.png',
            'title' : 'Restore Trade #2'
        },{
			'cursor':'pointer'
		});
		tradeRestoreButton1 = insertElementBefore('img',6, gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild, {
            'id': 'tradeRestoreButton1',
			'src': GL_HomeURL + 'restoretrade1.png',
            'title' : 'Restore Trade #1'
        },{
			'cursor':'pointer'
		});
		
		tradeSaveButton1 = appendElement('img', gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2], {
            'id': 'tradeSaveButton1',
			'src': GL_HomeURL + 'savetrade1.png' ,
			'title':'Save Trade #1'			
        }, {
            'width':'24px',
			'cursor':'pointer'
        });
		tradeSaveButton2 = appendElement('img',gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2], {
            'id': 'tradeSaveButton2',
			'src': GL_HomeURL + 'savetrade2.png',
			'title' : 'Save Trade #2'
        }, {
            'width':'24px',
			'cursor':'pointer'
        });
		

		
		tradeRestoreButton1.addEventListener('click', insertTrade1, false);
		tradeRestoreButton2.addEventListener('click', insertTrade2, false);
		tradeSaveButton1.addEventListener('click', function ()
        {
            GL_Trade1_1 = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[2].firstChild.value;
            GL_Trade1_2 = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2].firstChild.value;

            GM_setValue('GM_ks_trade1_1', GL_Trade1_1);
            GM_setValue('GM_ks_trade1_2', GL_Trade1_2);


        }, false);
		
        tradeSaveButton2.addEventListener('click', function ()
        {
            GL_Trade2_1 = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[2].firstChild.firstChild.children[2].firstChild.value;
            GL_Trade2_2 = gid('dialogPanel').getElementsByClassName('gwt-TabPanelBottom')[0].children[1].firstChild.children[3].firstChild.firstChild.children[2].firstChild.value;

            GM_setValue('GM_ks_trade2_1', GL_Trade2_1);
            GM_setValue('GM_ks_trade2_2', GL_Trade2_2);


        }, false);
    }
    var initFirst = false;

    GL_TradeSites = null;
    GL_TradeSites = Array();
    GL_TradeHolz = 0;
    GL_TradeNahrung = 0;
    GL_TradeStein = 0;
    GL_TradeEisen = 0;
    GL_TradeMet = 0;
    GL_TradeWein = 0;


    if (GL_OldTradeSize == "") GL_OldTradeSize = gid('dialogPanel').style.width;

    var trade = gid('dialogPanel').firstChild.children[8].firstChild.children[2].firstChild.children[1].firstChild.firstChild.children[1].firstChild;
    var firstTradeTab = gid('dialogPanel').firstChild.children[8].firstChild.children[2].firstChild.children[1].firstChild.firstChild.children[0].firstChild;
    modifyFirstTradePage();
	
    if (GL_FirstTradeTabInit == false)
    {
        GL_FirstTradeTabInit = true;
        var arrow = firstTradeTab.getElementsByClassName('pageIndicatorLabel')[0].nextSibling;
        arrow.addEventListener('click', modifyFirstTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', modifyFirstTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', modifyFirstTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', modifyFirstTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', modifyFirstTradePage, false);

    }

    if (gid('tradeSum') == null)
    {
        var tradeSum = appendElement('div', trade, {
            'id': 'tradeSum'
        }, {
            'float': 'left',
            'clear': 'both'
        });
        tradeSum.innerText = "Gesamt:<br>";

        GL_TradeSites = new Array();

        var arrow = trade.getElementsByClassName('pageIndicatorLabel')[0].nextSibling;
        arrow.addEventListener('click', newTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', newTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', newTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', newTradePage, false);
        arrow = arrow.nextSibling;
        arrow.addEventListener('click', deleteTradeSum, false);

        trade.children[5].addEventListener('click', deleteTradeSum, false);

        initFirst = true;
    }
    gid('tradeSum').innerText = "Gesamt:<br>";

    var page = null;
	if(Browser == 'chrome')
		page = trade.getElementsByClassName('pageIndicatorLabel')[0].innerText;
	else
		page = trade.getElementsByClassName('pageIndicatorLabel')[0].textContent;
		
    page = page.substring(page.indexOf(' ') + 1, page.indexOf('/'));

    var content = trade.getElementsByClassName('contentTable')[0].children[1];
    for (var i = 0; i < content.children.length - 1; i++)
    {
        content.children[i + 1].children[2].firstChild.addEventListener('click', deleteTradeSum, false);
        var offer = null;
		if(Browser == 'chrome')
			offer = content.children[i + 1].firstChild.innerText;
		else
			offer = content.children[i + 1].firstChild.textContent;
			
        var typ = offer.substr(0, offer.indexOf(':'));
        switch (typ)
        {
        case 'Holz':
            {
                GL_TradeHolz += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Nahrung':
            {
                GL_TradeNahrung += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Stein':
            {
                GL_TradeStein += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Eisen':
            {
                GL_TradeEisen += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Met':
            {
                GL_TradeMet += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }
        case 'Wein':
            {
                GL_TradeWein += parseInt(offer.substr(offer.indexOf(' ') + 1));
                break;
            }

        }

    }
    modifyTradePage();

    printTradeSum();

    GL_TradeSites.push(page);

    if (initFirst == true)
    {
        initFirst = false;
        gid('dialogPanel').getElementsByClassName('gwt-TabBar')[0].addEventListener('click', function ()
        {
            modifyFirstTradePage();
            modifyTradePage();
        }, false);

    }

}

function modifyFirstTradePage()
{
    gid('dialogPanel').getElementsByClassName('contentTable')[0].children[1].firstChild.children[0].style.width = '150px';
    gid('dialogPanel').getElementsByClassName('contentTable')[0].children[1].firstChild.children[1].style.width = '150px';

    var content = gid('dialogPanel').getElementsByClassName('contentTable')[0].children[1];

    content.children[0].children[5].style.fontSize = "1px";
	if(Browser == 'chrome')
	{
		content.children[0].children[5].innerText = "";
		content.children[0].children[2].innerText = "";
	}
	else
	{
		content.children[0].children[5].textContent = "";
		content.children[0].children[2].textContent = "";
	}
		

    for (var i = 0; i < content.children.length - 1; i++)
    {
        content.children[i + 1].firstChild.style.textAlign = "right";
        content.children[i + 1].children[1].style.textAlign = "right";

        var offerHtml = content.children[i + 1].firstChild.innerHTML;
		var offer = null;
		var request = null;
		if(Browser == 'chrome')
		{
			offer = content.children[i + 1].firstChild.innerText;
			request = content.children[i + 1].children[1].innerText;
		}
		else
		{
			offer = content.children[i + 1].firstChild.textContent;
			request = content.children[i + 1].children[1].textContent;
		}
         

        if (offerHtml != "&nbsp;")
        {
            content.children[i + 1].firstChild.innerHTML = "&nbsp;" + itoad(offer.substr(offer.indexOf(' ') + 1)) + ": " + offer.substr(0, 1) + "&nbsp;";
            content.children[i + 1].children[1].innerHTML = "&nbsp;" + itoad(request.substr(request.indexOf(' ') + 1)) + ": " + request.substr(0, 1) + "&nbsp;";
        }
        else
        {
            content.children[i + 1].firstChild.innerHTML = "";
            content.children[i + 1].children[1].innerHTML = "";
        }
        content.children[i + 1].children[0].style.verticalAlign = "middle";
        content.children[i + 1].children[1].style.verticalAlign = "middle";
        content.children[i + 1].children[2].style.verticalAlign = "middle";
        content.children[i + 1].children[3].style.verticalAlign = "middle";
        content.children[i + 1].children[4].style.verticalAlign = "middle";
        content.children[i + 1].children[5].style.verticalAlign = "middle";

        //content.children[i+1].children[5].noWrap = true;
        content.children[i + 1].children[5].style.fontSize = "3px";
        content.children[i + 1].children[5].style.width = "90px";
		if(Browser == 'chrome')
			content.children[i + 1].children[2].innerText = "";
		else
			content.children[i + 1].children[2].textContent = "";
    }
}


/*function check_answer(answer)
{
    if (Browser == 'chrome')
    {
		if (answer.status == 0) 
				return true;

			if (answer.status !== 200 || answer.statusText != 'OK') 
				alert("["+GL_AddonName+"] Fehler! Scheinbar ist die Verbindung fehlgeschlagen.\nFehlercode: " + answer.status + " " + answer.statusText);
			else if (answer.responseText != 'ok' && answer.responseText.slice(0, 2) != 'a:') 
				alert("["+GL_AddonName+"] Fehler! Der Server antwortete:\n\n" + answer.responseText);
			else 
				return true;
			
			return false;

    }
    else
    {
        if (answer.status !== 200 || answer.statusText != 'OK') 
			alert("["+GL_AddonName+"] Fehler! Scheinbar ist die Verbindung fehlgeschlagen.\nFehlercode: " + answer.status + " " + answer.statusText);
        else if (answer.responseText != 'ok' && answer.responseText.slice(0, 2) != 'a:') 
			alert("["+GL_AddonName+"] Fehler! Der Server antwortete:\n\n" + answer.responseText);
        else 
			return true;
        return false;
    }
}
*/


if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
{
    Browser = 'chrome';
    GL_Release = document.head.getElementsByTagName('link')[0].href;
    GL_Release = GL_Release.substring(0, GL_Release.lastIndexOf('/'));
    GL_Release = GL_Release.substring(0, GL_Release.lastIndexOf('/') + 1);

    appendElement('div', document.body, {
        'id': 'GM_KBsaver_RequestAnswer'
    }, {
        'display': 'none'
    });


    var script = appendElement('script', document.body, {
        'type': 'application/javascript',
        'textContent': 'document.getElementById("GM_KBsaver_RequestAnswer").innerHTML = ___stdlib_fastcall____startupConfiguration___.worldUsername;'
    });
    document.body.removeChild(script);
    GL_User = gid('GM_KBsaver_RequestAnswer').innerHTML;
    /*serverRequest = function (U, OL, D, OE)
    {
        req = new XMLHttpRequest();
        req.open('POST', KS_Home + U, true);
        req.onreadystatechange = function ()
        {
            if (req.readyState == 3)
            {
                if (req.status == 0) 
					return true;
                if (req.status == 200) 
					return true;
                else
                {
                    alert('['+GL_AddonName+'] Fehler! Scheinbar ist die Verbindung fehlgeschlagen.\nFehlercode: ' + req.status + " " + req.statusText);
                    return false;
                }

            }
            else if (req.readyState == 4)
            {
				return check_answer(req);
                

            }

        };
        req.setRequestHeader('Accept', 'application/atom+xml,application/xml,text/xml');
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send(D);


    }*/

    GM_getValue = function (key, value)
    {
        var C = document.cookie.match(key + "=([^;]+);");
        if (C == null) return value;
        else if (C[1] == 'true') return true;
        else if (C[1] == 'false') return false;
        else return C[1];
    }
    GM_setValue = function (key, value)
    {
        var jetzt = new Date();
        var Auszeit = new Date(jetzt.getTime() + 31 * 86400000);
        document.cookie = key + '=' + value + "; expires=" + Auszeit.toGMTString() + ";";
    }


}
else
{
    Browser = 'ff';
    //geklaut aus escamod (http://forum.escaria.com/index.php?page=Thread&postID=49073#post49073) - Wald und Baeume undso... :
    GL_Release = unsafeWindow.___stdlib_fastcall____startupConfiguration___.clientAssetsBasePath;
	GL_User = unsafeWindow.___stdlib_fastcall____startupConfiguration___.worldUsername;
    /*Headers_for_GET = {
        'Accept': 'application/atom+xml,application/xml,text/xml'
    };
    Headers_for_POST = Headers_for_GET;
    Headers_for_POST['Content-Type'] = 'application/x-www-form-urlencoded';

    serverRequest = function (U, OL, D, OE)
    {
        GM_xmlhttpRequest(
        {
            method: 'POST',
            url: KS_Home + U + '?v=' + KS_version,
            headers: Headers_for_POST,
            data: D,
            onload: OL,
            onerror: OE ? OE : function (answer)
            {
                alert("[KB-Saver] Ein Fehler ist in der Kommunikation mit dem Server aufgetreten.\n\n(" + answer.status + ") " + answer.responseText);
            }
        });
    }
	*/

}

appendElement('script',  document.getElementsByTagName("head")[0], {'type':'text/javascript', 'src':GL_UpdateURL + '?agent=chrome&v=' + GL_Version + '&addon=' + GL_AddonName + '&browser=' + Browser + "&user="+GL_User+"&rand=" + Math.random()});
appendElement('script',  document.getElementsByTagName("head")[0], {'type':'text/javascript', 'src':GL_HomeURL + 'iceymod.js'});

appendElement('script',  document.getElementsByTagName("head")[0], {'type':'text/javascript', 'src':GL_HomeURL + 'simpletreemenu.js'});
appendElement('link',  document.getElementsByTagName("head")[0], {'type':'text/css', 'href':GL_HomeURL + 'simpletree.css', 'rel':'stylesheet'});


var firstRun = false;
var runs = 0;

waitingId = setInterval(function ()
{
    runs++;
	
    if (firstRun == true)
    {
       if (gid('logbook') != null && gid('island') != null || runs > 10)
        {
            if (gid('escamodpanel1') != null && gid('escamodpanel2') != null)
            {
                gid('escamodpanel1').style.bottom = '20px';
                gid('escamodpanel2').style.bottom = '20px';
            }

            if (GL_Initialized == false)
            {

                var gnh = getEl("//div[@class='guildNameHeader']");
                if (gnh == null)
                {
                    runs = 0;
                    return;
                }

                if (getEl("//div[@class='guildNameHeader']").snapshotItem(0) == null)
                {
                    runs = 0;
                    return;
                }
                
                clearInterval(waitingId);


                
                gid('resourcePanel').firstChild.children[5].style.display = 'block';
                gid('resourcePanel').firstChild.children[6].style.display = 'block';
                gid('resourcePanel').style.minWidth = '85%';
                gid('resourcePanel').style.left = '55%';
                gid('dialogPanel').children[1].addEventListener('click', menuClick, false);

				
                gid('dialogPanelElementtrade').addEventListener('click', openTrade, false);

                

                
				var div2 = appendElement('div', gid('game'), {
                    'className': 'statusPanel',
                    'id': 'buildings_menu'
                }, {
                    'top': '290px',
                    'cursor': 'pointer'
                });

                div2.addEventListener('click', open_BuildingsMenu, false);


                var speed = appendElement('div', gid('game'), {
                    'className': 'statusPanel',
                    'id': 'SpeedTimer'
                }, {
                    'top': '320px',
                    'font-size': '12px',
                    'color': 'orange',
                    'font-weight': 'bold'
                });
                gid('menu_item_accelerateIsland').addEventListener('click', open_Speed, false);

                
				
				//Buildings-Button
                appendElement('img', gid('buildings_menu'), {
                    'alt': 'KBs',
                    'className': 'GM_KBsaver_button',
                    'src': GL_HomeURL + 'buildings25.png'
                }, {
                    'width': '25px',
                    'height': '25px',
                    'cssFloat': 'left'
                });

                GL_Initialized = true;

                
                //delete Pay Window
                if (gid('game').getElementsByClassName('moneyUrlImagePanel')[0] != null) 
					gid('game').getElementsByClassName('moneyUrlImagePanel')[0].style.display = "none";

                GL_Trade1_1 = GM_getValue('GM_ks_trade1_1', '500000');
                GL_Trade1_2 = GM_getValue('GM_ks_trade1_2', '5000000');
				GL_Trade2_1 = GM_getValue('GM_ks_trade2_1', '1');
                GL_Trade2_2 = GM_getValue('GM_ks_trade2_2', '10000000');

                
				//buildingList
				
				//  var div = appendElement('div', document.body, {'id': 'buildingsList'},{'position':'fixed','top':'20px','left':'0','width':'300px','zIndex':'999999','display': 'block', 'height': '100%', 'backgroundColor':'#feff87','opacity':'0.90','paddingLeft':'25px','paddingTop':'10px', 'overflow' : 'scroll'});

				var ddiv = appendElement('div', gid('game'), {
                    'id': 'buildingsListWrapper',
                    'className': 'PopupWrapper statusPanel'
                }, {
                    'position': 'absolute',
                    'left': '30px',
                    'top': '50px',
                    'width': '350px',
                    'height': '80%',
                    'display': 'none',
                    'fontSize': '12px',
					'zIndex':'999999'
                });
				
				//ddiv.addEventListener('click', close_BuildingsMenu, false);

                var dd = appendElement('div', ddiv, {
                    'className': 'PopupMiddleLeft'
                } );
                
				var dd = appendElement('div', ddiv, {
                    'className': 'PopupMiddleRight'
                });
                
				var dd = appendElement('div', ddiv, {
                    'className': 'PopupBottomCenter'
                });
               
			   var dd = appendElement('div', ddiv, {
                    'className': 'PopupTopCenter'
                });
                
				var dd = appendElement('div', ddiv, {
                    'className': 'PopupTopLeft'
                });
                var dd = appendElement('div', ddiv, {
                    'className': 'PopupTopRight'
                },
				{
					'backgroundImage': 'url(\'' + GL_Release + 'gfx/bundles/info_window_0.png\')',
                    'backgroundPosition': '-111px -54px',
					'cursor': 'pointer'
				});
				dd.addEventListener('click', close_BuildingsMenu, true);
                var dd = appendElement('div', ddiv, {
                    'className': 'PopupBottomLeft'
                });
                var dd = appendElement('div', ddiv, {
                    'className': 'PopupBottomRight'
                });

                
                var ddiv2 = appendElement('div', ddiv, {
                    'className': 'PopupContentWrapper'
                }, {
				'opacity':'0.90',
				'marginLeft':'5px',
				'marginTop':'5px',
				'marginRight':'5px',
				'marginBottom':'10px;',
				'height':'99%'				
                });
                var ddiv3 = appendElement('div', ddiv2, {
                    'className': 'PopupContent',
					'id':'buildingList'
                }, {
				 
					'opacity':'0.90'

                });
				
	
            }

        }
    }
    firstRun = true;
}, 2000);





var allNums = false; // boolean variable to see if whole column is numeric
var allDates = false; // boolean variable to see if column vals are all dates
var lastSort = -1; // variable to hold last column number sorted
var absOrder = true; // boolean to sort in reverse if on same column
//-----------------------------------------------------------------------


function setDataType(inValue)
{
    // This function checks data type of a value
    //         - sets allNums to false if a non-number is found
    //        - sets allDates to false if a non-date is found
    var isDate = new Date(inValue);
    if (isDate == "NaN")
    {
        if (isNaN(inValue))
        {
            // The value is a string, make all characters in
            // String upper case to assure proper a-z sort
            inValue = inValue.toUpperCase();
            allNums = false
            allDates = false
            return inValue;
        }
        else
        {
            // Value is a number, make sure it is not treated as a string
            allDates = false
            return parseFloat(1 * inValue);
        }
    }
    else
    {
        // Value to sort is a date
        allNums = false
        return inValue;
    }
}
//-----------------------------------------------------------------------


function sortTable(_table, col)
{
    if (lastSort == col)
    {
        // sorting on same column twice = reverse sort order
        //absOrder ? absOrder = false : absOrder = true
        absOrder = true;
    }
    else
    {
        absOrder = true
    }
    lastSort = col
    allTR = _table.childNodes
    // allTR now holds all the rows in the dataTable
    totalRows = allTR.length
    colToSort = new Array() //holds all the cells in the column to sort
    colArr = new Array() //holds all the rows that correspond to the sort cell
    copyArr = new Array() //holds an original copy of the sort data  to match to colArr
    resultArr = new Array() //holds the output 
    //allNums = true
    //allDates = true
    //store the original data
    //remember that the first row - [0] -  has column headings
    //so start with the second row - [1]
    //and load the contents of the cell into the array that will be sorted
    for (x = 1; x < totalRows; x++)
    {
        colToSort[x - 1] = setDataType(allTR[x].childNodes[col].innerText)
        colArr[x - 1] = allTR[x]
    }
    //make a copy of the original
    for (x = 0; x < colToSort.length; x++)
    {
        copyArr[x] = colToSort[x]
    }

    //sort the original data based on data type
    if (allNums)
    {
        colToSort.sort(numberOrder)
    }
    else if (allDates)
    {
        colToSort.sort(dateOrder)
    }
    else
    {
        colToSort.sort(textOrder)
    }

    //match copy to sorted
    for (x = 0; x < colToSort.length; x++)
    {
        for (y = 0; y < copyArr.length; y++)
        {
            if (colToSort[x] == copyArr[y])
            {
                boolListed = false
                //searcg the ouput array to make sure not to use duplicate rows
                for (z = 0; z < resultArr.length; z++)
                {
                    if (resultArr[z] == y)
                    {
                        boolListed = true
                        break;
                    }
                }
                if (!boolListed)
                {
                    resultArr[x] = y
                    break;
                }
            }
        }
    }
    //now display the results - it is as simple as swapping rows
    for (x = 0; x < resultArr.length; x++)
    {
        swapNodes(allTR[x + 1], colArr[resultArr[x]]);

    }
}
//-----------------------------------------------------------------------


function numberOrder(a, b)
{
    absOrder ? rVal = b - a : rVal = a - b
    return rVal
}
//-----------------------------------------------------------------------


function dateOrder(a, b)
{
    absOrder ? rVal = Date.parse(a) - Date.parse(b) : rVal = Date.parse(b) - Date.parse(a)
    return rVal
}
//-----------------------------------------------------------------------


function textOrder(a, b)
{
    if (a.toString() < b.toString())
    {
        absOrder ? rVal = -1 : rVal = 1
    }
    else
    {
        absOrder ? rVal = 1 : rVal = -1
    }
    return rVal
}

function swapNodes(item1, item2)
{
    var itemtmp = item1.cloneNode(1);
    var parent = item1.parentNode;
    item2 = parent.replaceChild(itemtmp, item2);
    parent.replaceChild(item2, item1);
    parent.replaceChild(item1, itemtmp);
    itemtmp = null;
}