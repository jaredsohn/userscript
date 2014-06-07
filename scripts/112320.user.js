// ==UserScript==
// @name           Invisible Bread
// @namespace      http://invisiblebread.com
// @include        http://*invisiblebread.com/*/*/*/
// ==/UserScript==

(function() {
    var extraPanel = function(breadURL) {
        
        var comic = document.getElementById('comic');
        var comicWrap = document.getElementById('comic-wrap');
        
        var breadPanel = document.createElement('div');
        comicWrap.appendChild(breadPanel);
        breadPanel.id = 'otasyn-breadPanel';
        breadPanel.style.margin = '0 auto';
        breadPanel.style.background = 'none repeat scroll 0 0 #ffffff';
        breadPanel.style.border = '4px solid #000000';
        breadPanel.style.MozBorderRadius = '10px';
        breadPanel.style.borderRadius = '10px';
        breadPanel.style.padding = '5px';
        breadPanel.style.textAlign = 'center';
        breadPanel.style.display = 'none';
        
        var breadImg = document.createElement('img');
        breadPanel.appendChild(breadImg);
        breadImg.src = breadURL;
        
        breadImg.addEventListener('load',function() {
            breadPanel.style.width = breadImg.naturalWidth + 'px';
            breadPanel.style.display = '';
        },false);
        
    };
    
    var extrapanelbutton = document.getElementById('extrapanelbutton');
    if (!extrapanelbutton) {
        console.log('no extra button panel');
        return false;
    }
    var breadLink = extrapanelbutton.getElementsByTagName('a')[0];
    if (!breadLink) {
        console.log('no button');
        return false;
    }
    
    GM_xmlhttpRequest({
        url: breadLink.href,
        method: 'GET',
        onerror: function(response) {
            console.log('GM_xmlhttpRequest error: ', response);
        },
        onload: function(response) {
            var searchBeginStr = '<img class="extrapanelimage" src="';
            var searchEndStr = '"';
            
            var beginIndex = response.responseText.indexOf(searchBeginStr) + searchBeginStr.length;
            var endIndex = response.responseText.indexOf(searchEndStr, beginIndex);
            
            var url = response.responseText.substr(beginIndex, endIndex-beginIndex);
            
            console.log('url: ', url);
            extraPanel(url);
        }
    });
    
})();