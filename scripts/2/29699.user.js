// ==UserScript==
// @name           MCollegeHumor
// @namespace      jack.un@gmail.com
// @include        http://www.collegehumor.com/video:*
// ==/UserScript==

var width = 480;
var height = 360;
var vid = window.location.href.match(/video:(\d+)/);
var player = document.getElementById('flash_player');

if(vid && player){

    for( var i=0; i<player.childNodes.length; i++){
    	
        if(player.childNodes[i].tagName.toLowerCase()=="div" && player.childNodes[i].style.background.match(/flashblock/))
        {
            width = player.childNodes[i].style.width.replace('px','');
            height = parseInt(player.childNodes[i].style.height.replace('px','')) +15;
            
        }    
        if(player.childNodes[i].tagName.toLowerCase()=="embed")
        {
            width = player.childNodes[i].getAttribute('width');
            height = parseInt(player.childNodes[i].getAttribute('height')) +15;
        }
    }
    
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'http://www.collegehumor.com/moogaloop/video:'+vid[1],
    		headers: {
        		'User-agent': 'Mozilla/5.0 (compatible) Firefox/3.0',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: function(responseDetails) {
    		    
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

            var entries = dom.getElementsByTagName('file');
        
            player.innerHTML = 
            '<embed src="' + entries[0].textContent + '" width="' + width + '" height="' +
            height + '" autoplay="true" ' + 'loop="true" ' +
            'type="application/x-quicktimeplayer"></embed>';
            }
	});
}
