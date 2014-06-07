// ==UserScript==
// @name       Tweakers.net layout fixer
// @namespace  http://www.tweakers.net/
// @version    0.4
// @description  Fixes tweakers.net layout
// @match      http://*tweakers.net*/*
// @copyright  2013, Phoenix_the_II
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
layout = document.getElementById('layout');
layout.style.backgroundColor = "#F5F6F6";





fp_tabs_container = document.getElementById('navMenu');

if (typeof fp_tabs_container != "undefined")
{    
    
    
    	fp_tabs_container.style.width = '650px';
        nu = document.getElementById('menubar')
        nu.style.top = '10px';
        nu.style.borderRadius = '5px';
        
    	
        sb = document.getElementById('searchbar')
        sb.style.display = 'none';
        
        
        search = document.getElementById('search')
        search.style.paddingTop = '0px';
        search.style.height = '27px';
    	search.style.width = '145px';
    
    	keywordSearch = document.getElementsByClassName('keywordSearch').item(0);
    	keywordSearch.style.width = '145px';
    
    	last = document.getElementsByClassName('last').item(0);
    	
    
    
    	a = search.getElementsByTagName('a').item(0);
    	a.parentNode.removeChild(a);
    
          
        /*mainSearch = document.getElementById('mainSearch');
        mainSearch.style.border = '0px';
        mainSearch.style.width = '200px';*/
       
        inputText = mainSearch.getElementsByTagName('input').item(0);
        inputText.style.width = '145px';
        //mainSearch.parentNode.removeChild(mainSearch);
        li = document.createElement('li');
        //li.style.cssFloat = 'right';
        li.appendChild(search);
        
        //alert('hey'); 
    	fp_tabs_container.appendChild(li);
    	fp_tabs_container.appendChild(last);
        
        //search.appendChild();
        
        /*pageTabsUl = document.getElementsById('navMenu').getElementsByTagName('ul').item(0);
        
        pageTabsLis = pageTabsUl.getElementsByTagName('li');
        for (i = 0; i<pageTabsLis.length; i++)
        {
            liTab = pageTabsLis.item(i);    
            if (liTab.className == 'active')
            {
                
            }
            liTab.style.backgroundColor = "#F5F6F6";
        }
            
        
        pageTabsUl.appendChild(li);*/
    
}


fpaItems = document.getElementsByClassName('fpaItems')[0];
if (typeof fpaItems != "undefined")
{    
    fpaItem = document.getElementsByClassName('fpaItem');    
    if (fpaItem.length == 3) //There be only 4 on frontpage...
    {   
        document.getElementsByClassName('fpaItemsWrapper')[0].parentNode.removeChild(document.getElementsByClassName('fpaItemsWrapper')[0]);
        document.getElementById('contentArea').style.width = '1080px';
        secondColumn = document.getElementsByClassName('secondColumn').item(0);
        secondColumn.style.width = '400px';
        div = document.createElement('div');
        div.style.border = '1px solid #DDDEDE';
        div.style.backgroundImage = '-webkit-linear-gradient(#F5F6F6, #EDEEEE)';
        div.style.padding = '15px 15px 17px';
        div.className = 'fpItem';
        div.innerHTML = '<h2>Spotlight</h2>';
        
        
        div2 = document.createElement('div');
        div.appendChild(div2);
        div2.appendChild(fpaItems);
        secondColumn.insertBefore(div, secondColumn.firstChild);
        
        for (i = 0; i<fpaItem.length; i++)
        {    
            fpaItem.item(i).style.padding = '25px';
        }
        for (i = 1; i<fpaItem.length; i++)
        {
            fpaItem.item(i).style.display = 'none';    
        }
        rotate = 0;
        setInterval(function()
                    {                
                        fpaItem = document.getElementsByClassName('fpaItem');
                        fpaItem.item(rotate).style.display = 'none';
                        rotate++;
                        if (rotate == fpaItem.length)
                        {
                            rotate = 0;
                        }
                        fpaItem.item(rotate).style.display = 'block';
                        
                    }, 5000);
    }
}
             
    
categoryBar = document.getElementById('categoryBar');
if (typeof categoryBar != "undefined")
{
    categoryBar.style.display = "none";
}
       
 
jQueryFixes = function()
{
       
    var simulate = function(element, eventName)
    {
        var options = extend(defaultOptions, arguments[2] || {});
        var oEvent, eventType = null;
    
        for (var name in eventMatchers)
        {
            if (eventMatchers[name].test(eventName)) { eventType = name; break; }
        }
    
        if (!eventType)
            throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
    
        if (document.createEvent)
        {
            oEvent = document.createEvent(eventType);
            if (eventType == 'HTMLEvents')
            {
                oEvent.initEvent(eventName, options.bubbles, options.cancelable);
            }
            else
            {
                oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
          options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
          options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
            }
            element.dispatchEvent(oEvent);
        }
        else
        {
            options.clientX = options.pointerX;
            options.clientY = options.pointerY;
            var evt = document.createEventObject();
            oEvent = extend(evt, options);
            element.fireEvent('on' + eventName, oEvent);
        }
        return element;
    }
    
    var extend = function(destination, source) {
        for (var property in source)
          destination[property] = source[property];
        return destination;
    }
    
    var eventMatchers = {
        'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
        'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    }
    var defaultOptions = {
        pointerX: 0,
        pointerY: 0,
        button: 0,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        bubbles: true,
        cancelable: true
    }   

    trackerFixateLink = $('#trackerFixateLink').get(0);
    
    if (typeof trackerFixateLink == "undefined")
    {            
        trackerPopupButton = $('#trackerPopupButton').get(0);
        simulate(trackerPopupButton, "mouseover");
        simulate(trackerPopupButton, "mousedown");
        simulate(trackerPopupButton, "click");
        simulate(trackerPopupButton, "mouseup");
        //element = $('#trackerFixateLink').get(0);
        setTimeout(function()
                   {
                        trackerFixateLink = $('#trackerFixateLink').get(0).firstChild;
                        simulate(trackerFixateLink, "mouseover");
                        simulate(trackerFixateLink, "mousedown");
                        simulate(trackerFixateLink, "click");
                        simulate(trackerFixateLink, "mouseup");
                        trackerFixateLink = $('#trackerFixateLink').get(0).firstChild;
                        simulate(trackerFixateLink, "mouseover");
                        simulate(trackerFixateLink, "mousedown");
                        simulate(trackerFixateLink, "click");
                        simulate(trackerFixateLink, "mouseup");
                   }, 250);
    }
    
    
                
             
}
addJQuery(jQueryFixes);
