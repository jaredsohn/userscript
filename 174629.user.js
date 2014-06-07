// ==UserScript==
// @name           Irrational Protocols
// @version        1.1
// @author         SnoringFrog and Michcioperz
// @description    Replaces "xkcd://###" with a link to xkcd comic ###. Also, some other stuff.
// @include        */*
// @updateURL      https://github.com/allhailnoah/IrrationalProtocols/raw/master/IrrationalProtocols.user.js
// ==/UserScript==

(function() {
    //link variables
    var globalLink_pre = '<a class="url-ext" rel="url" target="_blank" href="';	
    var xkcdLink_pre = 'http://xkcd.com/';
    var steamStoreLink_pre = 'http://store.steampowered.com/app/';
    var steamCommunityLink_pre = 'http://steamcommunity.com/id/';
    var customLink_pre ='';    
    
    //regex variables
    var re_prefix = ":\\/\\/"; //the "://" that signals a shorthand link
    var re_num = "([0-9]+)"; //regex numeric mode
    var re_alphnum = "(\\w+)"; //regex alpha-numeric mode    
    var reg; //for creating/storing the regex

  	function process(parent) {
	    var list = parent.querySelectorAll('.js-tweet-text');
        var re_mode=''; //select numeric or alpha-numeric mode 
        var protocol = '';
	        
        for(var i = list.length; i--;){ 	
            if(list[i].innerHTML.indexOf("xkcd://") != -1){
                customLink_pre = globalLink_pre + xkcdLink_pre;
                protocol = "xkcd";
                re_mode = re_prefix + re_num;
                replaceLink(list[i], protocol + re_mode);
            }
            if(list[i].innerHTML.indexOf("steamapp://") != -1){
                customLink_pre = globalLink_pre + steamStoreLink_pre;
                protocol = "steamapp";
                re_mode = re_prefix + re_num;
                replaceLink(list[i], protocol + re_mode);
            }
            if(list[i].innerHTML.indexOf("steamuser://") != -1){
                customLink_pre = globalLink_pre + steamCommunityLink_pre;
                protocol = "steamuser";
                re_mode = re_prefix + re_alphnum;
                replaceLink(list[i], protocol + re_mode);
            }
		}
	}
    
    function replaceLink(tweet, re_settings){
        reg = new RegExp("(" + re_settings + ")" ,"g");
        tweet.innerHTML = tweet.innerHTML.replace(reg, customLink_pre + '$2">$1</a>');
    }

	function onMutations(muts) {        
		for(var i = muts.length, m; i-- && (m = muts[i]);) {
			for(var j = m.addedNodes.length, node; j-- && (node = m.addedNodes[j]);) {
				if(node.nodeType == 1) {
					process(node);
				}
			}
		}
	}
    
	process(document.body);
	var M = window.MutationObserver || window.WebKitMutationObserver;
	new M(onMutations).observe(document.body, {childList:true, subtree:true});

})();
