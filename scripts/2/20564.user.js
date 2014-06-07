// ==UserScript==
// @name           Better Netvibes
// @description    Some Netvibes enhancements
// @namespace      http://gueschla.com/
// @include        http://www.netvibes.com/*

// ==/UserScript==
// version 0.1
//----------------------
// 0.1 First Release / Mark All Feeds as Read / Refresh All Feeds

function betterNetvibes(){

    var bnReadAllContainer = new Element('span', {
        'id': 'bnReadAllContainer'
    }).injectBefore($('collapseExpand'));
    
    var bnReadAll = new Element('a', {
        'id': 'bnReadAll',
        'href': 'javascript:void(0);'
    }).setHTML('Mark All Feeds as Read').injectInside('bnReadAllContainer');
    ;
    
    bnReadAll.addEvent('click', function(){
        App.moduleList.each(function(m){
            if (typeof m.content.setAllAsReadOnMouseDown == 'function'
			&& m.elm_moduleContent.className=='moduleContent feedreader'
			&& m.elm_moduleHeader.textContent.test(/\([0-9]*\)/)) {
                m.content.setAllAsReadOnMouseDown();
            }
        });
    });
    
    bnReadAllContainer.appendText(' | ');
    
    // Refresh All Feeds
    
    var bnRefreshAllContainer = new Element('span', {
        'id': 'bnRefreshAllContainer'
    }).injectBefore($('collapseExpand'));
    
    var bnRefreshAll = new Element('a', {
        'id': 'bnRefreshAll',
        'href': 'javascript:void(0);'
    }).setHTML('Refresh All Feeds').injectInside('bnRefreshAllContainer');
    ;
    
    bnRefreshAll.addEvent('click', function(){
		del = 50;
        App.moduleList.each(function(m){
			var cf = function(m){
				if (m.elm_moduleContent.className == 'moduleContent feedreader') {
					m.refresh(true);
				}
			}
			
			cf.pass(m).delay(del);
			del+=50;
        });
    });
    
    bnRefreshAllContainer.appendText(' | ');
    
};

// We have to inject and execute the betterNetvibes function in a script tag in the page so it can acces the mootols lib'
document.body.appendChild(document.createElement('script')).innerHTML = betterNetvibes.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2')+'betterNetvibes();';
