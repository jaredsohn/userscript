// ==UserScript==
        // @name           VikingClan - Add Recent Friends To Viking Clan
        // @namespace      http://facebook.com
        // @description    adds a Viking Clan link for recently added friends page or any friends list
        // @version        1.0
        // @date           2009-04-25
        // @include        http://www.facebook.com/friends/*
        // ==/UserScript==
        
        
        function xpath(query) {
        	return document.evaluate(query, document, null, 
        
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        
        function log(message) {
        	// GM_log(message);
        }
        
        window.addEventListener( 'load', function( e ) {
        
        	var lobjFriendRows = xpath("//div[@class='fcontent']");
        	var lobjRegExResult;
        	
        	for (var i=0; i < lobjFriendRows.snapshotLength; i++ ) {
        		
        		log('row=' + i + ' -> ' + lobjFriendRows.snapshotItem(i).innerHTML);
        
        		lobjRegExResult = lobjFriendRows.snapshotItem(i).innerHTML.match(/id=([0-9]+)/);
        		if (lobjRegExResult) {
        
        			var lobjSpan = document.createElement('span');
        	lobjSpan.innerHTML = " [<a href='http://apps.facebook.com/vikingclan/status_invite.php?from=" +  
        
        lobjRegExResult[1] + "' target='_MafWars'>Add to Viking Clan</a>]";
        			log(lobjSpan.innerHTML );
        
        			lobjFriendRows.snapshotItem(i).appendChild(lobjSpan);
        
        		}
        
        	}
        },false);