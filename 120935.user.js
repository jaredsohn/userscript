// ==UserScript==
// @name                CppReference
// @namespace	        http://cppreference.com/cppreference/mobile/
// @description	        CppReference for mobile: show contentbody only.
// @include		http://*.cppreference.com/*
// @exclude		http://www.oreilly.com/*
// ==/UserScript==

try{
    var $ = document.getElementById;
    var wrap = document.createElement('div');
    var content = $('content');
    content.style.margin = '5px';
    content.style.padding = '8px';
    
    var snapResults = document.evaluate("//table[@class='vertical-navbox nowraplinks template-sidebar-body']", $('bodyContent'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    // has menu?
    if(snapResults.snapshotLength>0){
        var menu = snapResults.snapshotItem(0);
        var menuNode = document.createElement('div');
        menuNode.style.position = 'fixed';
        menuNode.style.height = '100%';
        menuNode.style.overflowY = 'auto';
        menuNode.style.overflowX = 'visible';
        menuNode.style.top = '0px';
        menuNode.style.right = '0px';
        menuNode.style.display = 'none';
    
        menuNode.appendChild(menu);
    
        var buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = '<span style="display:block;padding:2px 8px;float:right;background:blue;color:white;cursor:pointer;" href="#">&gt;Navigation&lt;</span>';
        buttonDiv.style.position = 'fixed';
        buttonDiv.style.top = '5px';
        buttonDiv.style.right = '5px';
        //buttonDiv.style.width = '300px';
        buttonDiv.style.background = 'white';
        
        var menuHandler = function(e){
            if(menuNode.style.display == 'none'){
                menuNode.style.display = 'block';
            }else{
                menuNode.style.display = 'none';
            }
            return false;
        };
        buttonDiv.addEventListener('click', menuHandler);
        
        wrap.appendChild(content);
        wrap.appendChild(menuNode);
        wrap.appendChild(buttonDiv);
    }else{
        wrap.appendChild(content);
    }
    document.body.innerHTML = '';
    document.body.appendChild(wrap);
    
}catch(e){
    GM_log(e);
}
