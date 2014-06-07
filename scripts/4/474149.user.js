// ==UserScript==
// @name forum_links
// @author FireSwarm
// @version 2.0.1-beta
// @description Forum links
// @unwrap
// @run-at document-end
// @include http://www.heroeswm.ru/*
// @match http://www.heroeswm.ru/*
// @include http://qrator.heroeswm.ru/*
// @match http://qrator.heroeswm.ru/*
// @include http://178.248.235.15/*
// @match http://178.248.235.15/*
// @include http://www.lordswm.com/*
// @match http://www.lordswm.com/*
// @grant       none
// ==/UserScript==

(function(){

    if (location.hostname !== "www.heroeswm.ru"
        && location.hostname !== "qrator.heroeswm.ru"
        && location.hostname !== "178.248.235.15"
		&& location.hostname !== "www.lordswm.com")
        return;
    
    
    
    if (window.location.toString().indexOf("forum_messages.php") > 0 || window.location.toString().indexOf("forum_thread.php") > 0) {
       
        var messages = document.querySelectorAll("tr[class='message_footer']");
		if (window.location.toString().indexOf("forum_messages.php") > 0) {
			for (var num in messages) {
            
				var cur_mes = messages[num].nextSibling.firstChild;
				cur_mes.innerHTML = set_link(cur_mes.innerHTML);
				cur_mes.innerHTML = set_smile(cur_mes.innerHTML);

				if (num == messages.length - 1) {
					break;
				}
			}
		}
        
        messages = document.querySelectorAll("a[href^='pl_info']");
        for (var num in messages) {
            messages[num].target="_blank";
            /*if (messages[num].innerHTML.indexOf('font color') !== -1)
                continue;
            
            var char_id = messages[num].href;
            char_id = char_id.substring(char_id.indexOf('=') + 1);

            inf_button = document.createElement('a');
            inf_button.innerHTML = '&nbsp;<a style="none;text-decoration: none;" target="_blank" href = "pl_info.php?id=' + char_id + '">[i]<a/>';
            messages[num].parentNode.appendChild(inf_button);*/
        }

    }
    
    if (window.location.toString().indexOf("pl_info.php?id=") > 0) {
       
        var messages = document.querySelectorAll("td");
        messages[messages.length - 2].innerHTML = set_link(messages[messages.length - 2].innerHTML);

    }
    
    function set_smile(post) {
        
        if (post.indexOf(':)') !== -1) {
		   post = post.replace(new RegExp("\\:\\)", "g"), '<img src=http://arcanumclub.ru/smiles/smile1.gif>');
	    }
        
        if (post.indexOf(':(') !== -1) {
		   post = post.replace(new RegExp("\\:\\(", "g"), '<img src=http://arcanumclub.ru/smiles/smile4.gif>');
	    }
        
        if (post.indexOf(';)') !== -1) {
		   post = post.replace(new RegExp("\\;\\)", "g"), '<img src=http://arcanumclub.ru/smiles/smile38.gif>');
	    }
        
        return post;
    }
    
    function set_link(post) {

        var links = [];
		var links_buf = [];
        
        links_buf = getLinksWithPrefix(post, "http://");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
		
		links_buf = getLinksWithPrefix(post, "https://");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
			
		links_buf = getLinksWithPrefix(post, "хттп://");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
		
		links_buf = getLinksWithPrefix(post, "хттпс://");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
			
		links_buf = getLinksWithPrefix(post, "www.");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
			
		links_buf = getLinksWithPrefix(post, "ввв.");
		for (var i in links_buf)
			if(!findIn(links, links_buf[i]))
				links.push(links_buf[i]);
                     
        for (var i in links) {
           var address = links[i];
		   var address2 = links[i];
		   if (address.indexOf("www.") == 0)
			address2 = "http://" + address2;
			
		   if (address.indexOf("ввв.") == 0)
			address2 = "хттп://" + address2;
		   
		   if (address.indexOf("хттп") == 0)
			address2 = translateLink(address);
		   var addr = window.location.toString();
           if (address.indexOf("battlechat.php") == -1
				&& address.indexOf("war.php") == -1
				&& address.indexOf("battle.php") == -1
                && address.indexOf("pl_info.php") == -1
				&& address.indexOf("battle") == -1){
				address = address.replace(/\?/, "\\?");
				var link = '<a href="' + address2 + '" target="_blank">' + address2 + '</a>';
				post = post.replace(new RegExp(address, "g"), link);
				continue;
           } else if (window.location.toString().indexOf('pl_info.php') !== -1) {
               address = address.replace(/\?/, "\\?");
				var link = '<a href="' + address2 + '" target="_blank">' + address2 + '</a>';
				post = post.replace(new RegExp(address, "g"), link);
				continue;
           }

        }
       return post;
    }

	function getLinksWithPrefix(post, prefix) {

        var t = 300;
        
        var links = [];
        
        if (post.indexOf('<img ') < 5)
            post = post.substring(post.indexOf('avatars'));
                     
        while (post.indexOf(prefix) !== -1 && t > 0) {
            t = t-1;

            post = post.substring(post.indexOf(prefix));
            var s = post;
       
            s = s.substring(s.indexOf(prefix));

            if (s.indexOf("<") !== -1)
               s = s.substring(0, s.indexOf("<"));
                     
            if (s.indexOf(" ") !== -1)
               s = s.substring(0, s.indexOf(" "));
   
            if (s.indexOf("&nbsp") !== -1)
               s = s.substring(0, s.indexOf("&nbsp"));
			
			if (s.indexOf("|") !== -1)
               s = s.substring(0, s.indexOf("|"));

            if(!findIn(links, s))
               links.push(s);

            post = post.substring(5);
        }
	
		return links;
	}
	
	function findIn(L, word) {
	
		for (var i in L)
			if (L[i].indexOf(word) !== -1)
				return true;
	
		return false;
	}
	
	function translateLink(link) {
	
		var L = [
			'А','A','а','a','Б','B','б','b','В','V','в','w','Г','G','г','g',
			'Д','D','д','d','Е','E','е','e','Ё','Yo','ё','yo','Ж','Zh','ж','zh',
			'З','Z','з','z','И','I','и','i','Й','Y','й','y','К','K','к','k',
			'Л','L','л','l','М','M','м','m','Н','N','н','n','О','O','о','o',
			'П','P','п','p','Р','R','р','r','С','S','с','s','Т','T','т','t',
			'У','U','у','u','Ф','F','ф','f','Х','h','х','h','Ц','Ts','ц','ts',
			'Ч','Ch','ч','ch','Ш','Sh','ш','sh','Щ','Sch','щ','sch','Ъ','"','ъ','"',
			'Ы','Y','ы','y','Ь',"'",'ь',"'",'Э','E','э','e','Ю','Yu','ю','yu',
			'Я','Ya','я','ya'
        ];

		for (var i = 0; i < L.length; i += 2) {
			link = link.replace(new RegExp(L[i], "g"), L[i + 1]);
		}
	
		return link;
	}

}

)();