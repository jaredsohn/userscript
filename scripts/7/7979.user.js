// ==UserScript==
// @name           VirtualNNM
// @version        1.0
// @namespace      http://crack-life-style.nnm.ru/
// @description    VirtualNNM - Enchance NNM.ru apperance and functionality. Author: Dmitry Kaflan. E-Mail: kaflan@mail.ru, ICQ: 195007021, MSN: kaflan@atis.ws, Skype: kaflan.
// @include        http://*.nnm.ru/*
// @include        http://nnm.ru/*
// ==/UserScript==

var userName = null;
var needaddFloatingPanel = GM_getValue('needaddFloatingPanel', true);
var needfixBanners = GM_getValue('needfixBanners', true);
var needfixCalendar = GM_getValue('needfixCalendar', true);
var needaddScriptMenu = GM_getValue('needaddScriptMenu', true);
var needfixPager = GM_getValue('needfixPager', true);
var needfixNewsImgLinks = GM_getValue('needfixNewsImgLinks', true);
var needfixSearch = GM_getValue('needfixSearch', true);
var needfixPrivateNewsSet = GM_getValue('needfixPrivateNewsSet', true);
var needfixBugReporting = GM_getValue('needfixBugReporting', true);
var needaddChat = GM_getValue('needaddChat', true);
var needshowourdock = GM_getValue('needshowourdock', false);
var needcleanBackground = GM_getValue('needcleanBackground', true);
var needuseEnglish = GM_getValue('needuseEnglish', window.opera);
var needautoUpdateChat = GM_getValue('needautoUpdateChat', true);
var needfixTimeoutBug = GM_getValue('needfixTimeoutBug', true);

/*
	Main code of script
*/
try
{
    if (location.hostname.indexOf('nnm.ru') != -1 && 
        location.href.indexOf('nnm.ru/bb/new') == -1 && // This needed by opera for escape iframe (f**k it) script attaching
        location.href.indexOf('.jpg') == -1)
    {
    	userName = getUserName();
        if (needcleanBackground)
            cleanBackground();
        if (needfixBanners)
	        fixBanners();
        if (needaddFloatingPanel)
            addFloatingPanel();
	    if (needfixCalendar)
	        fixCalendar();
	    if (needaddScriptMenu)
	        addScriptMenu();
	    if (needfixPager)
	        fixPager();
	    if (needfixNewsImgLinks)
	        fixNewsImgLinks();
	    if (needfixSearch)
	        fixSearch();
	    if (needfixPrivateNewsSet)
	        fixPrivateNewsSet();
	    if (needfixBugReporting)
	        fixBugReporting();
	    if (userName != null)
	        if (needaddChat)
	            addChat();
	    //if (needfixTimeoutBug)
	    //    fixTimeoutBug();
	    
        /*@cc_on
        /*@if (@_win32) 
        
            // ==Setup==
            // The script dialog will invoke this function.  It should get ignored by GM
            function ScriptSetup(appendTo)
            {
	            createOptionInput(appendTo, "Отображение календаря (не актуально, NNM его пофиксил, но если опять уберут можно влкючить здесь)", "needfixCalendar", true);
	            createOptionInput(appendTo, "Исправить поиск", "needfixSearch", true);
	            createOptionInput(appendTo, "Тематический чат", "needaddChat", true);
	            createOptionInput(appendTo, "Автоматически обновлять чат", "needautoUpdateChat", true);
	            createOptionInput(appendTo, "Отображать меню скрипта", "needaddScriptMenu", true);
	            createOptionInput(appendTo, "Отображение дока Crack - Life & Style в избранных доках", "needshowourdock", true);
	            createOptionInput(appendTo, "Обрезание рекламы", "needfixBanners", true);
	            createOptionInput(appendTo, "Закрепление главного меню nnm", "needaddFloatingPanel", true);
	            createOptionInput(appendTo, "Ассинхронный пейджинг в коментариях (без перегрузок страницы)", "needfixPager", true);
	            createOptionInput(appendTo, "Подавление JavaScript на фотографиях", "needfixNewsImgLinks", true);
	            createOptionInput(appendTo, "Исправление подборки (загружются все новости сразу, без тормозов)", "needfixPrivateNewsSet", true);
	            createOptionInput(appendTo, "Исправление (если требуется) отправки багов", "needfixBugReporting", true);
	            createOptionInput(appendTo, "Очищение фона", "needcleanBackground", true);
            }

            function createOptionInput(appendTo, labelText, bindVar, defaultVal)
            {
	            var wrapper = document.createElement("p");
	            wrapper.style.paddingLeft = "22px";
	            wrapper.style.textIndent = "-22px";

	            var label = document.createElement("label");
	            label.htmlFor = "reify-adBlocker-setupOption-" + bindVar;
	            label.appendChild(document.createTextNode(labelText));

	            var input = document.createElement("input");
	            input.id = "reify-adBlocker-setupOption-" + bindVar;
	            input.bindVar = bindVar;
	            input.type = "checkbox";
	            input.onclick = setBoundVar;

	            wrapper.appendChild(input);
	            wrapper.appendChild(label);
	            appendTo.appendChild(wrapper);

	            input.checked = GM_getValue(bindVar, defaultVal);
            }

            function setBoundVar()
            {
	            GM_setValue(this.bindVar, this.checked);
            }

            // ==/Setup==
        
        @else @*/	    
        
	        GM_registerMenuCommand(needuseEnglish ? 'Turn ON all options' : 'Включить все возможности скрипта VirtualNNM', 
	            function (e) 
	            {                
	                SetAll(true);
	                window.location.reload();
	            });
    	    
	        GM_registerMenuCommand(needuseEnglish ? 'Turn OFF all options' : 'Выключить все возможности скрипта VirtualNNM', 
	            function (e) 
	            {
	                SetAll(false);
	                window.location.reload();
	            });
    	        
    	        
	        GM_registerMenuCommand(needuseEnglish ? '== Added possiblities ==' : '== Добавленные возможности ==============================', 
	            function (e) 
	            {
	                return;
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needfixCalendar) + (needuseEnglish ? ' show calendar' : ' отображение календаря'), 
	            function (e) 
	            {
	                switchIt(needfixCalendar, 'needfixCalendar');
	            });
    	        	        
	        GM_registerMenuCommand(TurnOnOrOff(needfixSearch) + (needuseEnglish ? ' show search' : ' поиск'), 
	            function (e) 
	            {
	                switchIt(needfixSearch, 'needfixSearch');
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needaddChat) + (needuseEnglish ? ' show chat' : ' тематический чат'), 
	            function (e) 
	            {
	                switchIt(needaddChat, 'needaddChat');
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needautoUpdateChat) + (needuseEnglish ? ' automaticlly update chat content' : ' автоматически обновлять чат'), 
	            function (e) 
	            {
	                switchIt(needautoUpdateChat, 'needautoUpdateChat');
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needaddScriptMenu) + (needuseEnglish ? ' show script menu' : ' меню скрипта'), 
	            function (e) 
	            {
	                switchIt(needaddScriptMenu, 'needaddScriptMenu');
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needshowourdock) + (needuseEnglish ? ' show Crack - Life & Style dock' : ' отображение дока Crack - Life & Style в меню'), 
	            function (e) 
	            {
	                switchIt(needshowourdock, 'needshowourdock');
	            });    

	        GM_registerMenuCommand(needuseEnglish ? '== Fixed possibilities ==' : '== Исправленные возможности ==============================', 
	            function (e) 
	            {
	                return;
	            });

	        GM_registerMenuCommand(TurnOnOrOff(needfixBanners) + (needuseEnglish ? ' banners remover' : ' обрезание рекламы'), 
	            function (e) 
	            {
	                switchIt(needfixBanners, 'needfixBanners');
	            });	            

	        GM_registerMenuCommand(TurnOnOrOff(needaddFloatingPanel) + (needuseEnglish ? ' fixate main nnm menu' : ' закрепление главного меню nnm'), 
	            function (e) 
	            {
	                switchIt(needaddFloatingPanel, 'needaddFloatingPanel');
	            });
    	            
	        GM_registerMenuCommand(TurnOnOrOff(needfixPager) + (needuseEnglish ? ' smart paging in comments (witout page reloading)' : ' пейджер в коментариях без перегрузок страницы'), 
	            function (e) 
	            {
	                switchIt(needfixPager, 'needfixPager');
	            });
    	        	            
	        GM_registerMenuCommand(TurnOnOrOff(needfixNewsImgLinks) + (needuseEnglish ? ' JavaScript repression (on images)' : ' подавление JavaScript на фотографиях'), 
	            function (e) 
	            {
	                switchIt(needfixNewsImgLinks, 'needfixNewsImgLinks');
	            });
    	        	            
    	        
	        GM_registerMenuCommand(TurnOnOrOff(needfixPrivateNewsSet) +  (needuseEnglish ? ' fixing private set' : ' исправление подборки'), 
	            function (e) 
	            {
	                switchIt(needfixPrivateNewsSet, 'needfixPrivateNewsSet');
	            });
    	        
	        GM_registerMenuCommand(TurnOnOrOff(needfixBugReporting) +  (needuseEnglish ? ' fixing (if needed) bug report form' : ' исправление (если требуется) отправки багов'), 
	            function (e) 
	            {
	                switchIt(needfixBugReporting, 'needfixBugReporting');
	            });
    	        
    	        
	        GM_registerMenuCommand(TurnOnOrOff(needcleanBackground) +  (needuseEnglish ? ' cleaning background' : ' очищение фона'), 
	            function (e) 
	            {
	                switchIt(needcleanBackground, 'needcleanBackground');
	            }); 
    	        
            /*GM_registerMenuCommand(TurnOnOrOff(needfixTimeoutBug) +  (needfixTimeoutBug ? ' need fix "504 Gateway Time-out bug"' : ' автоперегрузка страницы при ошибке "504"'), // OMG what a strange compare !
                function (e) 
                {
                    switchIt(needfixTimeoutBug, 'needfixTimeoutBug');
                });*/
    	        
	        GM_registerMenuCommand(TurnOnOrOff(needuseEnglish) +  (needuseEnglish ? ' use English' : ' use English'), // OMG what a strange compare !
	            function (e) 
	            {
	                switchIt(needuseEnglish, 'needuseEnglish');
	            });
        /*@end
    @*/
    
        hideIt();
        if (userName)
            setTimeout(autoSubscribe, 10000);
    }
}
catch (e)
{
	GM_log("Something going wrong with VirtualNNM script (Greasemonkey).\r\n" +
		"May be nnm.ru developers team change this page, so script cant recognize it. Contact script developer for update.\r\n" +
		"E-mail: kaflan@mail.ru, ICQ: 195007021, Skype: kaflan, MSN: kaflan@atis.ws.\r\n Текст ошибки (error message): " + e.message   + '. Location: ' + location.href);
}

/*
	Utillitary functions
*/

function SetAll(value)
{
    GM_setValue('needaddFloatingPanel', value);
    GM_setValue('needfixBanners', value);
    GM_setValue('needfixCalendar', value);
    GM_setValue('needaddScriptMenu', value);
    GM_setValue('needfixPager', value);
    GM_setValue('needfixNewsImgLinks', value);
    GM_setValue('needfixSearch', value);
    GM_setValue('needfixPrivateNewsSet', value);
    GM_setValue('needfixBugReporting', value);
    GM_setValue('needaddChat', value);
    GM_setValue('needshowourdock', value);
    GM_setValue('needcleanBackground', value);
}

function TurnOnOrOff(f)
{
    if (f)
        return (needuseEnglish ? 'Turn OFF ' : 'Выключить ');
    else
        return (needuseEnglish ? 'Turn ON ' : 'Включить ');
}

function switchIt(arg, name)
{
    if (arg)
        GM_setValue(name, false);
    else
        GM_setValue(name, true);
    window.location.reload();
}

function getNodeByTagAndAttribute(tag, attrName, attrValue, nodeToSearch)
{
    /*@cc_on
        /*@if (@_win32)
            var start = document;
            if (nodeToSearch)
                start = nodeToSearch;
            if (attrName.toUpperCase() == "ID")
            {
                return start.getElementById(attrValue);
            }
            else
            {
                attrName = attrName.toUpperCase();
                attrValue = attrValue.toUpperCase();
                if (attrName == "CLASS")
                    attrName = "className";
                var nodes = start.getElementsByTagName(tag);
                for (i = 0; i < nodes.length; i++)
                    if (nodes[i].getAttribute(attrName).toUpperCase() == attrValue)
                        return nodes[i];
            }
          @else @*/
            var node = document.evaluate("//" + tag + "[@" + attrName + "='" + attrValue + "']", 
		        (!nodeToSearch ? document : nodeToSearch), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		    
		    return node.singleNodeValue;
        /*@end
    @*/
}

function getNodesIteratorByTagAndAttribute(tag, attrName, attrValue, nodeToSearch)
{
 /*@cc_on
    /*@if (@_win32)
        var arr = new Object();
        arr.snapshotLength = 0;
        arr.snapshotItems = [];
        arr.snapshotItem = function (k)
        {
            return this.snapshotItems[k];
        }
        var start = document;
        if (nodeToSearch)
            start = nodeToSearch;
        attrName = attrName.toUpperCase();
        attrValue = attrValue.toUpperCase();
        if (attrName == "CLASS")
            attrName = "className";
        var nodes = start.getElementsByTagName(tag);
        for (i = 0; i < nodes.length; i++)
            if (nodes[i].getAttribute(attrName).toUpperCase() == attrValue)
                arr.snapshotItems.push(nodes[i]);
        arr.snapshotLength = arr.snapshotItems.length;
        return arr;
    @else @*/
        var nodes = document.evaluate("//" + tag + "[@" + attrName + "='" + attrValue + "']", 
            (!nodeToSearch ? document : nodeToSearch), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        return nodes;
     /*@end
@*/
}

function getSubNode(currentNode, childName, childNumber)
{
    childName = childName.toUpperCase();
    for (n = 0; n < currentNode.childNodes.length; n++)
        if (currentNode.childNodes[n].tagName.toUpperCase() == childName)
            if (childNumber == 1)
                return currentNode.childNodes[n];
            else
                childNumber--;
    return null;
}

function getNodeByXPQuery(query, nodeToSearch)
{
/*@cc_on
    /*@if (@_win32)
        var currentNode = document;
        if (nodeToSearch)
            currentNode = nodeToSearch;
        var arr = query.split("/");
        var start = 0;
        if (arr[0].length == 0)
            start = 1;
        for (i = start; i < arr.length; i++)
        {
            tag = arr[i];
            if (tag.indexOf('[') != -1)
            {
                childName = tag.substring(0, tag.indexOf('['));
                childNumber = tag.substring(tag.indexOf('[') + 1, tag.indexOf(']'));
            }
            else
            {
                childName = tag;
                childNumber = 1;
            }
            currentNode = getSubNode(currentNode, childName, childNumber);
            if (!currentNode)
                return null;
        }
        return currentNode;
      @else @*/
	    var something = document.evaluate(query, 
		    (!nodeToSearch ? document : nodeToSearch), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	    return something.singleNodeValue;
	/*@end
@*/
}

function commentChangeClick(urlToChangeTo)
{
/*@cc_on
    /*@if (@_win32);
    GM_xmlhttpRequest(
	{
		method: 'POST',
		url: urlToChangeTo,
		headers: {},
		onload: function(responseDetails) 
		{
		    receiveComments(responseDetails);
	    }
	});
	 @else @*/
	
	xmlhttp = null
    if (window.XMLHttpRequest)
    {
        xmlhttp = new XMLHttpRequest()
    }
    if (xmlhttp != null)
    {
        xmlhttp.onreadystatechange = state_Change
        xmlhttp.open("GET", urlToChangeTo, true)
        xmlhttp.send(null)
    }

    function state_Change()
    {
        if (xmlhttp.readyState==4)
        {
            if (xmlhttp.status==200)
            {
		        receiveComments(xmlhttp);
            }
        }
    }
 	/*@end
@*/

    function receiveComments(responseDetails)
    {
        var page = responseDetails.responseText;
        if (currentLoader)
            currentLoader.parentNode.removeChild(currentLoader);

	    var comments = getNodeByTagAndAttribute('div', 'id', 'komments');
	    var from = page.indexOf('<div id="komments">');
	    from = from + '<div id="komments">'.length;
	    var to = page.indexOf('<script type="text/javascript">', from);
	    to = to - 6;
	    comments.innerHTML = page.substring(from, to);;
	    var cStr = getNodesIteratorByTagAndAttribute('div', 'class', 'listing');
    	
	    from = page.indexOf('<div class="listing">');
	    from =  from + '<div class="listing">'.length;
	    to =  page.indexOf('</div>', from);
	    var pager = page.substring(from, to);
	    for (k = 0; k < cStr.snapshotLength; k++)
	    {
		    var node = cStr.snapshotItem(k);
		    node.innerHTML = pager;
	    }
	    fixPager();
    }
}

function addSearchClick(node)
{
    if (!node)
        return;
     /*@cc_on
     /*@if (@_win32)
            node.style.color = '#333333';
            node.style.fontSize = '130%';
            node.style.paddingRight = '6px';
        	node.attachEvent('onclick', function (e) 
	        {
		        search(window.event.srcElement.getAttribute('oldHref'));
	        });
       @else @*/
        	node.addEventListener('click', function (e) 
            {
	            search(this.getAttribute('oldHref'));
            }, false);
     /*@end
       @*/
     return node;
}

var searchFinished = true;

function search(textTosearch)
{   
    if 	(!searchFinished)
        return;
    searchFinished = false;
    var sc = getNodeByTagAndAttribute('div', 'id', 'resultsHere');
    if (!sc)
    {
        var div = document.createElement("div");
        div.setAttribute('id', 'resultsHere');
        sc = document.getElementById('search');
        if (sc == null)
            return;
	    /*@cc_on
            /*@if (@_win32)
                var sf = sc.firstChild;
              @else @*/
                var sf = sc.firstChild.nextSibling;
            /*@end
        @*/
        while (sc.firstChild)
            sc.removeChild(sc.firstChild);
        sc.appendChild(sf);
        sc.appendChild(div);
        sc = div;
    }
    
    var query = '+site:nnm.ru&hl=ru&lr=&as_qdr=all&sa=N';
    var pos = location.href.indexOf('&dn');
    if (pos != -1)
    {
        var url = unescape(location.href.substring(pos + 4));
        /*@cc_on
            /*@if (@_win32)
                var cb = document.forms[2][3];
              @else @*/
                if (window.opera)
                    var cb = document.forms[2][3];
                else
                    var cb = document.forms[1][3];
            /*@end
        @*/
        if (cb && cb.checked)
            query = '+site:' + url + '&hl=ru&lr=&as_qdr=all&sa=N';
    }
    
    var currentLoader = document.createElement('div'); 
    currentLoader.className = 'text';
    currentLoader.innerHTML = '&nbsp;<B class="loading">' + (needuseEnglish? 'Loading...' : 'Загрузка...') + '</B>';
    var stopLoading = document.createElement('a');
    stopLoading.innerHTML = ' [Stop]';
    stopLoading.style.cursor = 'pointer';
     /*@cc_on
     /*@if (@_win32)
        stopLoading.attachEvent('onclick', function(e) 
        {
            var toRemove = window.event.srcElement.parentNode;
            toRemove.parentNode.removeChild(toRemove);
            searchFinished = true;
        });	 
      @else @*/
        stopLoading.addEventListener('click', function(e) 
        {
            var toRemove = this.parentNode;
            toRemove.parentNode.removeChild(toRemove);
            searchFinished = true;
        }, false);	    	        
    /*@end
    @*/
    currentLoader.appendChild(stopLoading);
	if (sc.firstChild)
	{
	     /*@cc_on
            /*@if (@_win32)
                sc.insertBefore(currentLoader, sc.childNodes[3]);
              @else @*/
              if (window.opera)
                sc.insertBefore(currentLoader, sc.childNodes[4]);
              else
                sc.insertBefore(currentLoader, sc.childNodes[10]);
            /*@end
         @*/
    }
	else
	    sc.insertBefore(currentLoader, sc.firstChild);
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: (textTosearch.indexOf('/search?q=') != -1 ? 'http://www.google.ru' + textTosearch : 
		    'http://www.google.ru/search?q=' + textTosearch + query), // check if search requested by our fixSearch or by google pager link
		headers: {},
		onload: function(responseDetails) 
		{
			var page = responseDetails.responseText;
			sc.innerHTML = page;
			var navBar = getNodeByTagAndAttribute('div', 'id', 'navbar');
			if (navBar)
			{
			    var nnmNavBar = document.createElement('LI');
			    nnmNavBar.className = 'center';
			    var nnmNavBar2 = document.createElement('LI');
			    nnmNavBar2.className = 'center';
				var nn = navBar.firstChild.firstChild.firstChild;
				for (i = 0; i < nn.childNodes.length; i++)
				{
					var curr = nn.childNodes[i].firstChild;
					if (curr.firstChild && curr.firstChild.id == 'np')
					    curr.innerHTML = '&lt;';
					if (curr.firstChild && curr.firstChild.id == 'nn')
					    curr.innerHTML = '&gt;';
					if (curr.id == 'nc')
					{
					    var c = curr.nextSibling;
					    c.style.fontSize = '130%';
                        c.style.paddingRight = '6px';
                        c.style.color = '#A90A08';
                        curr.parentNode.removeChild(curr);
                        var a = document.createElement('A');
                        a.className = 'active';
                        a.innerHTML = c.innerHTML;
                        a.style.fontSize = '100%';
                        nnmNavBar.appendChild(a);
                        nnmNavBar2.appendChild(a.cloneNode(true));
					}
					if (curr.href)
					{
						if (curr.parentNode.className == 'b')
							curr.parentNode.className = '';
						var from = curr.href.lastIndexOf('/search?');
						curr.setAttribute('oldHref', curr.href.substring(from));
						curr.href = "javascript:void(0);";
						curr = addSearchClick(curr);
						if (curr.childNodes.length > 1)
                            curr.removeChild(curr.firstChild);
                        curr2 = addSearchClick(curr.cloneNode(true));
                        curr.style.fontSize = '100%';
                        curr2.style.fontSize = '100%';
                        nnmNavBar.appendChild(curr);
                        nnmNavBar2.appendChild(curr2);
					}
					while (navBar.firstChild)
					    navBar.removeChild(navBar.firstChild);
					navBar.className = 'listing';
					navBar.appendChild(nnmNavBar);
				}
				
			}
		    
			// Make some third-party apperance goodies. But carefully. In the way of changing response (by google),
			// we need to try, keep basic search functionality (situated up), and carantinate this additional stuff.
			try
			{
			    // Removing ugly navbar text
			    node = getNodeByXPQuery('table/tbody/tr/td/font', navBar);
			    if (node)
			    {
				    node.parentNode.removeChild(node);
			    }
			        // Google pager going left
			        if (navBar && navBar.firstChild)
				        navBar.firstChild.align = 'left';
                    var tr = navBar.firstChild.firstChild.firstChild;
                    if (tr)
                    {
                        tr.removeChild(tr.firstChild);
                        tr.removeChild(tr.firstChild);
                    }
			    }
			    catch(e)
			    {
				    // ...
			    }
			    
			    // Removing google search bar
			    var nodes = sc.getElementsByTagName('table'); //var node = getNodeByXPQuery('//table', sc)
			    if (nodes && nodes.length > 0)
                {
				    nodes[0].parentNode.removeChild(nodes[0]);
                    
			        // Configuring google search stat panel
			        var pd = document.createElement('div');
			        pd.className = 'listing';
			        pd.appendChild(nnmNavBar2);
			        nodes[0].parentNode.insertBefore(pd, nodes[0].nextSibling);
				    nodes[0].className = "";
				    node = nodes[0].firstChild.firstChild.firstChild; //getNodeByXPQuery('//tbody/tr/td', sc);
				    if (node)
				    {
					    if (node.nextSibling)
						    node.nextSibling.removeAttribute('align');
					    node.parentNode.removeChild(node);
				    }
			    }
			    
			    // Removing google personal menu
			    var node = sc.getElementsByTagName('div')[0];  	//var node = getNodeByXPQuery('//div', sc); // /html/body/div[3]/div[2]/div[3]/div/div/div
			    if (node)
			    {
				    node.parentNode.removeChild(node);
			    }
			    
			    // Making links got to nnm styles
			    var links = getNodesIteratorByTagAndAttribute('a', 'class', 'l', sc); //document.evaluate("//a[@class='l'and@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			    for (i = 0; i < links.snapshotLength; i++) 
			    {
				    thisLink = links.snapshotItem(i);
				    thisLink.onmousedown = "";
				    thisLink.style.color = '#333333';
			    }

			    // Killing "chache and similar" links
			    var elems = document.getElementsByTagName('nobr');
			    for (i = 0; i < elems.length; i++)
			    {
				    prev = elems[i].previousSibling;
				    if (prev)
				    {
					    prev.className = '';
					    prev.style.color ='#999999';
					    prev.innerHTML = prev.innerHTML.substring(0, prev.innerHTML.length - 2);
				    }
				    if (elems[i].parentNode)
				    {
					    elems[i].parentNode.removeChild(elems[i]);
					    i--;
				    }
			    }
    			
			    // Removing bottom toolbars...
			    nodes = sc.getElementsByTagName('center'); //node = getNodeByXPQuery('/html/body/div[3]/div[2]/div[3]/div/div/center[2]')
			    if (nodes && nodes.length == 2)
			    {
				    nodes[0].parentNode.removeChild(nodes[0]);
				    nodes[0].parentNode.removeChild(nodes[0]);
			    }
			    searchFinished = true;
    		}
	});
	
}

/*
	Fix functions
*/

var currentLoader;

// Fixing paging
function fixPager()
{
    var check = getNodeByTagAndAttribute('div', 'id', 'komments');
    if (check == null)	// if its news or list of news
        return;
    var cStr = getNodesIteratorByTagAndAttribute('li', 'class', 'str');

    try 
    {
	    for (k = 0; k < cStr.snapshotLength; k++)
	    {
	        /*@cc_on
            /*@if (@_win32)
    	        var pages = cStr.snapshotItem(k).firstChild.firstChild;
              @else @*/
    	        var pages = cStr.snapshotItem(k).firstChild.nextSibling.firstChild.nextSibling;
	    	/*@end
            @*/
		    var children = pages.childNodes;

		    for(i = 0; i < children.length; i++)
		    {
  			    var node = children[i];
			    if (node.nodeType != 3)
			    {
				    node.setAttribute('oldHref', node.href);
				    node.setAttribute('href', 'javascript:void(0);');
				    /*@cc_on
                    /*@if (@_win32)
                        node.attachEvent('onclick', function(e) 
                        {
                            if (currentLoader && currentLoader.parentNode)
                                currentLoader.parentNode.removeChild(currentLoader);
                            currentLoader = document.createElement('div'); 
                            currentLoader.className = 'text';
                            currentLoader.innerHTML = '&nbsp;<U class="loading">' + (needuseEnglish? 'Loading...' : 'Загрузка...') + '</U>';
                            window.event.srcElement.parentNode.setAttribute('nowrap', '');
                            window.event.srcElement.parentNode.appendChild(currentLoader);
                            
                            commentChangeClick(window.event.srcElement.getAttribute('oldHref')); 
                        });	 
                      @else @*/
                        node.addEventListener('click', function(e) 
                        {
                            if (currentLoader && currentLoader.parentNode)
                                currentLoader.parentNode.removeChild(currentLoader);
                            
                            currentLoader = document.createElement('div');
                            currentLoader.className = 'text';
                            currentLoader.innerHTML = '<U class="loading">' + (needuseEnglish? 'Loading...' : 'Загрузка...') + '</U>';
                            this.parentNode.appendChild(currentLoader);
                            commentChangeClick(this.getAttribute('oldHref')); 
                        }, false);	    	        
                    /*@end
                    @*/
			    }
		    }
  	    }	
    }
    catch (e) 
    {
	    GM_log('There is an error with fix paging, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	          'Произошла ошибка пока мы пытались подчинить пейджинг на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	          'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function fixSearch()
{
    try
    {
        var sb;
        
        // Fixing nnm search
        var sc = document.getElementById('search');
        if (sc == null)
        {
            fixSearchInDock();
            return;
        }
        
        var text = document.getElementById('sform');
        sb = document.createElement('input');
        sb.type = 'button';
        sb.value = (needuseEnglish ? 'Search by VirtualNNM' : 'Поиск [VirtualNNM]');
        text.style.width = '420px';
        text.parentNode.insertBefore(sb, text.nextSibling.nextSibling);
        
        text.focus();
        
        var pos = location.href.indexOf('&dn');
        if (pos != -1)
        {
            /*@cc_on
            /*@if (@_win32)
                var cb = document.forms[2][3];
              @else @*/
                if (window.opera)
                    var cb = document.forms[2][3];
                else
                    var cb = document.forms[1][3];
            /*@end
            @*/
            if (cb && cb.checked)
            {
                var e = document.createElement('input');
                e.type = 'hidden';
                var url = unescape(location.href.substring(pos + 4));
                e.value = url;
                e.name = 'dn';
                text.parentNode.appendChild(e);
            }
        }
        
        if (sb)
        {
	        /*@cc_on
                /*@if (@_win32)
                     sb.attachEvent('onclick', function (e)
                     {
	                    search(text.value);
                     }); 
                  @else @*/
                     sb.addEventListener('click', function (e)
                     {
	                    search(text.value);
                     }, false); 
                /*@end
            @*/
        }
    }
    catch (e)
    {
  	    GM_log('There is an error with fix search, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	          'Произошла ошибка пока мы пытались подчинить поиск на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	          'Если вы юзаете щас Opera`у то в этой версии скрипта поиск под нее не работает, если интересно почему смотрите в топиках про этот скрипт. ' +
	          'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function fixSearchInDock()
{
    var cont = document.getElementById('content');
    if (!cont)
        return;
    /*@cc_on
        /*@if (@_win32)
             cont = cont.firstChild;
          @else @*/
             cont = cont.firstChild.nextSibling;
        /*@end
    @*/
    if (cont.className != 'docinfo')
        return;
    /*@cc_on
        /*@if (@_win32)
            cont = document.forms[2];
          @else @*/
            if (window.opera)
                cont = document.forms[2];
            else
                cont = document.forms[1];
        /*@end
    @*/
    if (!cont)
        return;
    var e = document.createElement('input');
    e.type = 'hidden';
    e.value = location.href;
    e.setAttribute('name', 'dn');
    cont.appendChild(e);
}

function fixBanners()
{
    try
    {
    	// Removing top-banner
	    rm = document.getElementById('top-banner'); //getNodeByTagAndAttribute('DIV', 'id', 'top-banner');
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
		    
	    // Removing right menu
	    var rm = document.getElementById('rightMenu'); //getNodeByTagAndAttribute('DIV', 'id', 'rightMenu');
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
		    
	    // Removing left-banner
	    rm = getNodeByTagAndAttribute('DIV', 'class', 'left-banner');
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
        
        // Removing strange hidden frame (probably banner)
        if (window.opera)
            rm = document.getElementsByTagName('iframe')[0];
        else
            rm = getNodeByTagAndAttribute('iframe', 'border', '0');
        if (rm != null)
	        rm.parentNode.removeChild(rm);

	    // Removing strange random banner
	    var leftMenu = document.getElementById('leftMenu'); //getNodeByTagAndAttribute('DIV', 'id', 'leftMenu');
	    rm = getNodeByTagAndAttribute('table', 'width', '128', leftMenu);
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
		    
		// Removing bottom-banner
	    rm = document.getElementById('bottom-banner'); //getNodeByTagAndAttribute('DIV', 'id', 'bottom-banner');
	    if (rm)
	    {
	        if (needaddChat && userName)
	        {
	            while (rm.firstChild)
	            {
	                rm.removeChild(rm.firstChild); 
	            }
	        }
	        
	        if (needaddChat && !userName)
	        {
	            rm.parentNode.removeChild(rm);
	        }
	        
	        if (!needaddChat)
	        {
	            rm.parentNode.removeChild(rm);
	        }
		}
		
		// Removing footer
	    rm = document.getElementById('footer'); //getNodeByTagAndAttribute('DIV', 'id', 'footer');
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
    
		// Removing random banners on main nnm page
	    var cStr = getNodesIteratorByTagAndAttribute('div', 'class', 'center-banner');

	    for (k = 0; k < cStr.snapshotLength; k++)
	    {
		    var banner = cStr.snapshotItem(k);
		    if (banner)
			    banner.parentNode.removeChild(banner);
	    }
	    
		// Removing nnm team call to invite private set
	    rm = getNodeByTagAndAttribute('span', 'class', 'podb');
	    if (rm != null)
		    rm.parentNode.removeChild(rm);
		    
    }
    catch (e)
    {
  	    GM_log('There is an error with fix banners, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	          'Произошла ошибка пока мы пытались убрать баннеры на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	          'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function fixPrivateNewsSet()
{
    try
    {
	    var nset = document.getElementById('podborka'); //getNodeByTagAndAttribute('div', 'id', 'podborka');
	    if (!nset)
		    return;
    		
	    for (i = 0; i < nset.childNodes.length; i++)
	    {
		    var node = nset.childNodes[i];
		    if (node.getAttribute && node.getAttribute('onclick'))
		    {
	            GetNewsNode(node);
		    }
	    }
	}
	catch (e)
    {
  	    GM_log('There is an error with fix private news set, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	          'Произошла ошибка пока мы пытались исправить подборку на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	          'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

/*
    ===========================================================
    Making autosubscription on our Crack - life & style dock,
    this needed to make user informed. (So news about script is
    going to private set, but user did`nt notice any records
    about his registration on our dock if he did`nt whant it).
    
    If you think thats that brake your rigths you can delete
    code in this section.
    ===========================================================
*/

function autoSubscribe()
{
    if (location.href.indexOf('crack-life-style.nnm.ru/delme') != -1)
    {
        GM_setValue('isSub', false);
    }
    
    var subscribed = GM_getValue('isSub', false);
    if (!subscribed)
    {
        GM_xmlhttpRequest(
        {
	        method: 'GET',
	        url: 'http://crack-life-style.nnm.ru/addme',
	        headers: { },
	        onload: function(responseDetails)
	        {
                GM_setValue('isSub', true);
	        }
        });
    }
}

function hideIt()
{
    try
    {
        if (location.href.indexOf('options') != -1)
        {
            var whatToHide = getNodeByTagAndAttribute('a', 'href', 
                'http://doci.nnm.ru/crack-life-style');
            if (whatToHide)
            {
                var toDelete = whatToHide.parentNode.parentNode;
                toDelete.parentNode.removeChild(toDelete);
            }
        }
        if (!needshowourdock && userName)
        {
            var whatToHide = getNodeByTagAndAttribute('a', 'href', 
                'http://crack-life-style.nnm.ru/');
            if (whatToHide)
            {
                var toDelete = whatToHide.parentNode;
                toDelete.parentNode.removeChild(toDelete);
            }
        }
    }
    catch (e)
    {
    }
}

/*
    ==========================================================
    End of auto subscription code.
    ==========================================================
*/
// Replaces all instances of the given substring.
String.prototype.replaceAll = function(strTarget, strSubString)
{
    var strText = this;
    var intIndexOfMatch = strText.indexOf( strTarget );
    while (intIndexOfMatch != -1)
    {
        strText = strText.replace( strTarget, strSubString )
        intIndexOfMatch = strText.indexOf( strTarget );
    }
    return( strText );
}
    
function GetNewsNode(node)
{

    /*@cc_on
    /*@if (@_win32)
        var newsId = node.getAttribute('onclick').toString();
        node.onmouseout = '';
        node.onmouseover = '';
        node.onclick = '';
      @else @*/
        var newsId = node.getAttribute('onclick');
        node.removeAttribute('onmouseout');
        node.removeAttribute('onmouseover');
        node.removeAttribute('onclick');
   /*@end
     @*/
    newsId = newsId.substring(newsId.lastIndexOf('(') + 1, newsId.lastIndexOf(')'));
    document.getElementById(newsId).style.display = 'block';
    document.getElementById(newsId).innerHTML = '<u class="loading">' + (needuseEnglish ? 'Loading...' : 'Загрузка...') + '</u>';
    if (window.opera)
    {
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://www.nnm.ru/php/ajax/gettext.php',
            headers: {'Content-Type'    : 'application/x-www-form-urlencoded',
                      'Content-length'  : '1',
                      'Connection'      : 'close'
                      },
            data: 'data[0]=' + newsId,
            onload: function(responseDetails)
            {
              receiveNewsNode(responseDetails);
            } 
        });
    }
    else
    {
        GM_xmlhttpRequest(
        {
            method: 'POST',
            url: 'http://www.nnm.ru/php/ajax/gettext.php',
            headers: {'Content-Type'    : 'application/x-www-form-urlencoded',
                      'Content-length'  : '1',
                      'Connection'      : 'close'
                      },
            data: 'data[0]=' + newsId,
            onload: function(responseDetails)
            {
              receiveNewsNode(responseDetails);
            } 
        });
    }
    
    function receiveNewsNode(responseDetails)
    {
        var page = responseDetails.responseText;
        var from = page.indexOf('<![CDATA[') + 9;
        var to = page.indexOf(']]>');
        var text = page.substring(from, to);
        text = text.replace(/\\"/g, '"');
        text = text.replace(/\\'/g, '"');
        from = page.indexOf('<newid>') + 7;
        to = page.indexOf('</newid>');
        var newid = page.substring(from, to);
        var contentDiv = document.getElementById(newid);
        contentDiv.style.textAlign = 'justify';
        text = text.replace(/onmousemove/g, 'oldonmm');
        text = text.replace(/onmouseout/g, 'oldonmo');
        text = text.replaceAll(', \"', ", '");
        text = text.replaceAll('");"', "');\"");
        contentDiv.innerHTML = text;
        /*@cc_on
        /*@if (@_win32)
            var realLink = contentDiv.parentNode.firstChild.firstChild.href;
            var links = new Object();
            links.snapshotLength = 0;
            links.snapshotItems = [];
            links.snapshotItem = function (k)
            {
                return this.snapshotItems[k];
            }
            var start = contentDiv;
            var nodes = start.getElementsByTagName('a');
            for (i = 0; i < nodes.length; i++)
                if (nodes[i].getAttribute('title'))
                    links.snapshotItems.push(nodes[i]);
            links.snapshotLength = links.snapshotItems.length;
        @else @*/
            var realLink = contentDiv.parentNode.firstChild.nextSibling.firstChild.href;
            var links = document.evaluate("a[@title]", contentDiv, null, 
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      /*@end
        @*/

        for (n = 0; n < links.snapshotLength; n++) 
        {
            var node = links.snapshotItem(n);
            if (node.firstChild.src)
            {
                node.removeAttribute('onclick');
                node.setAttribute('target', 'new');
                node.href = realLink;
            }
        }
    }
}

function fixBugReporting()
{
	try
	{
    	if (location.href.indexOf('bugz.nnm.ru/addnew') == -1)
            return;
	    var cont = document.getElementById('content');
	    if (!cont)
		    return;
	    if (cont.childNodes.length > 1)
		    return;
	    GM_xmlhttpRequest(
	    {
		    method: 'GET',
		    url: 'http://anketa.atis-online.ru/votinglink.aspx?fGUID=794&pre=1',
		    headers: {},
		    onload: function(responseDetails) 
		    {
			    cont.style.padding = "30px";
			    cont.style.width = "90%";
			    cont.innerHTML = responseDetails.responseText;
		    }
	    });
	}
	catch (e)
	{
		GM_log('There is an error with fix bugReporting, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	     	 'Произошла ошибка пока мы пытались подчинить обратную связь на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
	}
}

function fixCalendar()
{
    try
    {
        var isCalendarPresent = document.getElementById('m-calendar');
        if (isCalendarPresent)
            return;
        if (location.hostname == 'my.nnm.ru' || location.hostname == 'users.nnm.ru')
            return;
        // Asking my service to give us cached calndar from nnm
        GM_xmlhttpRequest(
        {
	        method: 'GET',
	        url: 'http://kaflan.inform-telecom.ru/calendar.ashx?link=' + location.href.replace('http://', '').replace('www.', ''),
	        headers: {},
	        onload: function(responseDetails) 
	        {
                var text = responseDetails.responseText;
                if (text == "error")
                    return;
		        var searchForm = document.getElementById("searchform");
		        if (searchForm)
		        {
		            var node = document.createElement("div");
		            node.innerHTML = text;
		            searchForm.parentNode.insertBefore(node, searchForm);
		        }
	        }
        });
    }
    catch (e)
    {
        GM_log('There is an error with fix calendar, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	     	 'Произошла ошибка пока мы пытались подчинить календарь на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function addChat()
{
    try
    {
        var chatPlace = document.getElementById("bottom-banner");
        // Have chat anywhere
        /*if (!chatPlace)
        {
            chatPlace = document.createElement('div');
            document.getElementsByTagName('body')[0].appendChild(chatPlace);
        }*/
        chatPlace.style.height = '200px';
        chatPlace.style.paddingTop = '0px';
        chatPlace.innerHTML = 
        "<table style=\"width: 100%; padding: 5px; padding-right: 10px;\" cellspacing=0 >" +
            "<tr>" +
                "<td align='left'>" +
                    "<b>" + (needuseEnglish ? ' Online conversation' : 'Online обсуждение') + "</b>" +
                "</td>" +
                "<td align='right'>" +
                    "<span id='info'>" +
                "</td>" +
            "</tr>" +
            "<tr>" +
                "<td colspan=2>" +
                    "<textarea id=\"chatText\" rows='10' cols='90' style=\"width: 100%; height: 140px\" readonly type=\"text\" ></textarea>" +
                "</td>" +
            "</tr>" +
            "<tr>" +
                "<td style=\"width: 70%; margin-top: 2px;\">" +
                    "<input id=\"answer\"  style=\"width: 100%; margin-top: 6px;\" type=\"text\" />" +
                "</td>" +
                "<td >" +
                    "<div class=\"kommbb\">" +
                        "<ul class=\"bbtag\">" +
                            "<li class=\"start\"/>" +
                                "<li class=\"addkomm\">" +
                                    "<a href='javascript:void(0);' id=\"send\">" + (needuseEnglish ? 'Send' : 'Отправить') + " [Enter]</a>" +
                                "</li>" +
                                "<li class=\"end\"/>" +
                        "</ul>" +
                    "</div>" + 
                    //"<input id=\"send\" style=\"width: 100%;\" type=\"button\" value=\"Отправить\" />" +
                "</td>" +
            "</tr>" +
        "</table>";
        var sendButton = document.getElementById("send");
        /*@cc_on
        /*@if (@_win32) 
             chatPlace.style.marginTop = '2px'; 
             chatPlace.style.textAlign = 'center';   
             chatPlace.firstChild.style.width = '98%';
             sendButton.attachEvent("onclick", sendMessage);
          @else @*/
            if (window.opera)
                sendButton.setAttribute("onclick", 'sendMessage()');
            else
                sendButton.addEventListener("click", sendMessage, true);
        /*@end
          @*/
        
        var answer = document.getElementById("answer");
        /*@cc_on
        /*@if (@_win32)
            answer.attachEvent('onkeydown', function(event) 
            {  
	            if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) 
	            {
		            sendMessage();
		            return false; 
		        } 
                else 
  		            return true;
            });        
          @else @*/
            answer.addEventListener('keydown', function(event) 
            {  
	            if ((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)) 
	            {
		            sendMessage();
		            return false; 
		        } 
                else 
  		            return true;
            }, false);        
        /*@end
          @*/
        if (needautoUpdateChat)
            setTimeout(function () { getMessages(); }, differentText);
        info = document.getElementById("info");
    }
    catch (e)
    {
         GM_log('There is an error with fix chat, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	     	 'Произошла ошибка пока мы пытались подчинить чат на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function getUserName()
{
    var c = document.cookie;
    if (c.indexOf('login') == -1)
        return null;
    else
    {
        var cutLogin = c.substring(c.indexOf('login=') + 6);
        var cutTo = cutLogin.indexOf(';');
        return (cutTo == -1 ? cutLogin : cutLogin.substring(0, cutTo));
    }
}

var info;
var differentText = 3000;
var oldValue;
var maxDelay = 10000;
var normalDelay = 5000;
var minDelay = 3000;
var incDelay = 1000;
var finishedGetMessages = true;

function getMessages()
{
    if (!finishedGetMessages)
        return;
    finishedGetMessages = false;
    showCustomText(needuseEnglish ? 'Receiving messages...' : 'Получаю сообщения...');
    var chatText = document.getElementById("chatText");
    GM_xmlhttpRequest(
    {
        /*@cc_on
        /*@if (@_win32) 
            method: 'POST',
          @else @*/
            method: 'GET',
        /*@end
          @*/
	    url: 'http://kaflan.inform-telecom.ru/chat.ashx?getMessages=' + location.href.replace('http://', '').replace('www.', ''),
	    headers: { },
	    onload: function(responseDetails) 
	    {
            var text = responseDetails.responseText;
            if (text == "no")
            {
                chatText.value =  needuseEnglish ? 'Nobody talks :( You can start conversation!' : "Все молчат... Завяжи разговор =)";
                differentText = maxDelay;
            }
            else
            {
                if (oldValue == text)
                {
                    differentText += incDelay;
                    if (differentText > maxDelay)
                        differentText = maxDelay;
                }
                else
                {
                    oldValue = text;
                    chatText.value = text;
                    differentText = normalDelay;
                }
            }
            chatText.scrollTop = chatText.scrollHeight;
            if (needautoUpdateChat)
            {
                showUpdateInfo();
                setTimeout(function () { getMessages(); }, differentText);
            }
            finishedGetMessages = true;
	    }
    });
}

function showUpdateInfo() 
{ 
    var sec = differentText / 1000;
    info.innerHTML =  (needuseEnglish ? 'Next update after ' + sec + ' s.' : 'Следующее обновление через ' + sec + ' с.'); 
}

function showCustomText(text)
{
    info.innerHTML = text;
}

var finishedSendMessage = true;

function sendMessage()
{
    if (!finishedSendMessage)
        return;
    finishedSendMessage = false;
    var answer = document.getElementById("answer");
    if (answer.value.length == 0)
    {
        answer.focus();
        return;
    }
    showCustomText(needuseEnglish ? 'Sending message...' : 'Посылаю сообщение...');
    var sendButton = document.getElementById("send");
    var chatText = document.getElementById("chatText");
    answer.disabled = true;
    sendButton.disabled = true;
    GM_xmlhttpRequest(
    {
	    /*@cc_on
        /*@if (@_win32) 
            method: 'POST',
          @else @*/
            method: 'GET',
        /*@end
          @*/
	    url: 'http://kaflan.inform-telecom.ru/chat.ashx?addMessage=' + 
	        userName + '> ' + escape(answer.value) + '&chatName=' + location.href.replace('http://', '').replace('www.', ''),
	    headers: { },
	    onload: function(responseDetails) 
	    {
            var text = responseDetails.responseText;
            if (text == "error")
                return;
            oldValue = text;
            if (window.opera)
            {
                chatText.value = crop(text, chatText);
            }
            else
            {
                chatText.value = text;
                chatText.scrollTop = chatText.scrollHeight;
            }
            differentText = minDelay;
            if (needautoUpdateChat)
                showUpdateInfo();
            else
                showCustomText(needuseEnglish ? 'Ok' : 'Ок');
            answer.value = '';
		    answer.disabled = false;
            sendButton.disabled = false;
            answer.focus();
            finishedSendMessage = true;
	    }
    });
}

function crop(txt, area) /* We can't scroll textarea in Opera, */
{ /* so let's at least make the text fit */

    while( countlines(txt, area) >= area.getAttribute('rows'))
    {
        txt = txt.slice(1); // remove 10 chars from front, try again
    };
    return txt
}

/* estimating the number of lines txt takes in textarea. */
function countlines(txt, area)
{
    var cols = area.getAttribute('cols');
    var count = 0;

    var ln = String(txt).split('\r\n');
    for(var i=0; i < ln.length; i++)
    {
        /* each logical line takes at least one physical line.
        * Every /cols/ chars is a physical line, and a tab is 8 chars.
        * tabs are common and we'd better arrive at more than less what
        * really is displayed. */
        count += Math.ceil( (ln[i].length + 8.0) / cols );
    }
    return count;
}

function fixNewsImgLinks()
{
    try
    {
        var cStr = getNodesIteratorByTagAndAttribute('img', 'class', 'new-image-center');
    	
	    for (k = 0; k < cStr.snapshotLength; k++)
	    {
		    var node = cStr.snapshotItem(k);
		    var link2fix = node.parentNode;
		    if (link2fix.getAttribute('href').indexOf('javascript') == -1)
		        continue;
		    link2fix.setAttribute('onclick', '');
		    link2fix.removeAttribute('onclick');
		    link2fix.removeAttribute('click');
		    link2fix.setAttribute('target', 'new');
		    var realLink = link2fix.parentNode.lastChild.previousSibling.getAttribute('href');
		    if (realLink)
		        link2fix.setAttribute('href', realLink);
		    else
		    {
		        link = node.src;
		        if (link.indexOf('_full') == -1)
		        {
		            var index = link.lastIndexOf('.');
		            var ext = link.substring(index);
		            link = link.substring(0, index) + '_full' + ext;
		        }
		        link2fix.setAttribute('href', link);
		    }
	    }
    }
    catch (e)
    {
         GM_log('There is an error with fix links, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
	     	 'Произошла ошибка пока мы пытались подчинить ссылки на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
	     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

function addScriptMenu()
{
    try
    {
        var leftMenu = document.getElementById('leftMenu');
        var elem = document.createElement('div');
        elem.innerHTML =
            "<ul class='ulMenu'>" +
                "<li class='title'>" +
                     (needuseEnglish ? 'script' : "скрипт") +
                "</li>" +
                "<li>" +
                    "<a href='http://crack-life-style.nnm.ru/'>" + (needuseEnglish ? 'News' : 'Новости') + "</a>" +
                "</li>" +
                "<li>" +
                    "<a href='javascript:void(0);' onclick=\"alert('" + 
                    /*@cc_on
                    /*@if (@_win32)      
                        (needuseEnglish ? 
                        'Settings are aviable via menu Reify->VirtualNNM...' : 
                        'Настройки доступны в меню Reify->VirtualNNM...') + "');\">" +  
                        (needuseEnglish ? 'Settings' : 'Настройки') + "</a>" +
                      @else @*/
                        (needuseEnglish ? 
                        'You can see your setting in Instruments->Greasemonkey->User Script Commands (for FireFox users).' : 
                        'Настройки доступны в меню Инструменты->Greasemonkey->User Script Commands...') + "');\">" +  
                        (needuseEnglish ? 'Settings' : 'Настройки') + "</a>" +
                    /*@end
                      @*/

                "</li>" +
                "<li>" +
                    "<a href='http://anketa.atis-online.ru/votinglink.aspx?fGUID=794&pre=1' target='new'>" +  
                    (needuseEnglish ? 'Speak to author' : 'Обратная связь') + "</a>" +
                "</li>" +
            "</ul>";
       if (!needfixBanners)
       {
            leftMenu.insertBefore(elem, leftMenu.lastChild.previousSibling);
       }
       else
       {
            leftMenu.appendChild(elem);
       }
    }
    catch (e)
    {
        GM_log('There is an error with adding script menu, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
     	 'Произошла ошибка пока мы пытались добавить меню для скрипта на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message  + '. Location: ' + location.href);
    }
}

function addFloatingPanel()
{
    try
    {
        /*@cc_on
        /*@if (@_jscript_version == 5.6)    // IE 6 detectign
            // Fixed box hack
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
            document.getElementsByTagName('body')[0].style.height = '100%';
            document.getElementsByTagName('body')[0].style.padding = '1em 1 em 1em 142px';
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            
            var leftMenu = document.getElementById('leftMenu');
            if (leftMenu)
            {                
                leftMenu.style.position = 'absolute';
                leftMenu.style.top = 0;
                leftMenu.style.left = 0;
            }
          @else @*/
            var leftMenu = document.getElementById('leftMenu');
            if (leftMenu)
                leftMenu.style.position = 'fixed';
            var page = document.getElementById('page');
            if (page)
            {
                page.style.position = 'absolute';
                page.style.left = '142px';
            }
            
            if (!needfixBanners)
            {
                var rm = document.getElementById('rightMenu');
	            if (rm)
	            {
	                rm.style.position = 'absolute';
	                rm.style.left = '810px';
	            }
        	    
	            var rm = document.getElementById('footer');
	            if (rm)
	                rm.parentNode.removeChild(rm);
	        }
        /*@end
          @*/
    }
    catch (e)
    {
         GM_log('There is an error with adding floating panel, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
     	 'Произошла ошибка пока мы пытались добавить плавающую панель на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }    
}

function subcleanBackground(bdy, color)
{
    bdy.style.backgroundColor = color;
    bdy.style.backgroundImage = 'none';
}

function cleanBackground()
{
    try
    {
        bdy = document.getElementsByTagName('body')[0];
        if (!bdy)
            return;
        var bId = bdy.getAttribute('Id');
        var bgColors = { 'bg-winter-1' : '#ADBDD4', 'bg-winter-2' : '#B1D3B8', 'bg-winter-3' : '#D3D7B4',
            'bg-winter-4' : '#DBC6AB', 'bg-winter-5' : '#B2B0D5', 'bg-winter-6' : '#BCB7CB', 
            'bg-winter-7' : '#BFC5C5', 'bg-vesna-0' : '#D7D4E1', 'bg-vesna-1' : '#E4D4C0', 'bg-vesna-2' : '#D8DAC1', 'bg-vesna-3' : '#C8E0CC',
            'bg-vesna-4' : '#CDD8E7', 'bg-vesna-5' : '#D2D8D8', 'bg-vesna-6' : '#C4DBF0', 'bg-vesna-7' : '#D7D4E1',
            'bg-vesna-8' : '#C6C1D4' };
        var color = bgColors[bId];
        if (color)
            subcleanBackground(bdy, color);
    }
    catch (e)
    {
        GM_log('There is an error with cleaning background, you need to contact author (trouth bugreport or by email/icq/msn/skype) and look for update.\r\n' +
     	 'Произошла ошибка пока мы пытались очистить фон на nnm`е рекомендую обратитсья к разработчику скрипта, посмотреть нет ли обновленной версии скрипта или щелкнуть по "Я обнаружил багу!"\r\n' +
     	 'E-mail: kaflan@mail.ru, MSN: kaflan@atis.ws, ICQ: 195007021, Skype: kaflan.\r\n Текст ошибки (error message): ' + e.message   + '. Location: ' + location.href);
    }
}

var contentDiv;
var tryNumber = 0;

function fixTimeoutBug()
{
    if (document.title != "504 Gateway Time-out")
        return;
    cont = document.getElementsByTagName('center')[0];
    if (!cont)
        return;
    contentDiv = document.createElement('div');
    tryNumber++;
    setContentText();
    cont.appendChild(contentDiv);
    reconnect();
}

function setContentText()
{
    if (!contentDiv)
        return;
    contentDiv.innerHTML = neeuseEnglish? 'VirtualNNM try to reconnect you automatically. Current try number: ' + tryNumber : 
        'VirtualNNM попытается сам достучаться до сервера. Текущая поптыка: ' + tryNumber;
}

function reconnect()
{
    GM_xmlhttpRequest(
    {
	    method: 'POST',
	    url: location.href,
	    headers: { },
	    onload: function(responseDetails) 
	    {
            var text = responseDetails.responseText;
            if (text.indexOf("<title>504 Gateway Time-out</title>") != -1)
            {
                tryNumber++;
                setContentText();
                reconnect();
            }
            else
            {
                documment.write(responseDetails.responseText);
            }
            
	    }
    });
}