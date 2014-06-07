// ==UserScript==
// @name         Campfire join all rooms
// @description  Automatically joins all rooms in campfirenow's lobby
// @include      *.campfirenow.com/*
// @copyright    2012+, You
// ==/UserScript==

(function(){
    
    function getLinks(elementClass){
        var elements = document.getElementsByClassName(elementClass);
        var links = [];
        for(var i = 0; i < elements.length; ++i){
            var element = elements[i];
            if(elementClass == 'room'){
                element = element.getElementsByTagName('a')[0];
            }
            links.push(element.getAttribute('href'));
        }
        return links;
    }
    
    function tabs(){
        if(window.location.pathname == '/'){
            GM_setValue('allRooms', getLinks('room'));
        }
        
        var enteredRooms = getLinks('chat');
        var allRooms = GM_getValue('allRooms');
        var activeRequests = 0;
        
        if(enteredRooms.length < allRooms.length){
            for(var i = 0; i < allRooms.length; ++i){
                var url = allRooms[i];
                if(enteredRooms.indexOf(url) < 0){
                    ++activeRequests;
                    GM_xmlhttpRequest({
                        url: url,
                        method: 'get',
                        onload: function(){
                            if(--activeRequests == 0){
                                window.location.reload();
                            }
                        }
                    });
                }
            }
        }
    }
 
 tabs();

})();
