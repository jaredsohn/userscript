// ==UserScript==
// @name        Redesign Facebook Layout
// @namespace   http://userscripts.org/users/529551
// @include     http*.facebook.com*
// @grant       none
// @run-at      document-end
// @author      Kei
// @version     1
// ==/UserScript==

function layoutReload() {
    var d = document;
    var shareRedesigns = d.getElementsByClassName('shareRedesign');
    var UFIContainers = d.getElementsByClassName('UFIContainer');
    var uiScrollableAreas = d.getElementsByClassName('uiScrollableArea');
    var uiScrollableAreaBodys = d.getElementsByClassName('uiScrollableAreaBody');
    
    for(var i=0; i<shareRedesigns.length; i++){
        shareRedesigns[i].style.width = 'auto';
    }
    
    for(var i=0; i<UFIContainers.length; i++){
        UFIContainers[i].style.width = 'auto';
    }
    
    for(var i=0; i<uiScrollableAreas.length; i++){
        uiScrollableAreas[i].style.width = 'auto';
    }
    
    for(var i=0; i<uiScrollableAreaBodys.length; i++){
        uiScrollableAreaBodys[i].style.width = 'auto';
    }
}

function relayout(){
	var d = document;
    var globalContainer = d.getElementById('globalContainer');
    var mainContainer = d.getElementById('mainContainer');
    var leftCol = d.getElementById('leftCol');
    var contentCol = d.getElementById('contentCol');
    var contentArea = d.getElementById('contentArea');
    var rightCol = d.getElementById('rightCol');
    var pageFooter = d.getElementById('pageFooter');
    var pagelet_web_messenger = d.getElementById('pagelet_web_messenger');
    
    /*Del some blocks*/
    rightCol.parentNode.removeChild(rightCol);
    pageFooter.parentNode.removeChild(pageFooter);
    
    mainContainer.style.borderRight = 'none';
    
    /*Left Col*/
    leftCol.style.padding = '20px 20px 0 0';
    leftCol.style.width = '200px';
    leftCol.style.boxSizing = 'border-box';
    
    /*Content Col*/
    contentCol.style.float = 'left';
    contentCol.style.width = '780px';
    contentCol.style.marginLeft = '0';
    contentCol.style.boxSizing = 'border-box';
    contentArea.style.width = 'auto';
    contentArea.style.padding = '0 20px';
    
    var wmMasterView = d.getElementsByClassName('wmMasterView')[0];
    var wmMain = wmMasterView.nextSibling;
    
    pagelet_web_messenger.style.width = '980px';
    wmMain.style.width = '668px';
    
    layoutReload();
}

window.onload = function() {
	relayout();
}

relayout();