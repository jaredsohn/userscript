// ==UserScript==
// @name           TrueKadabra
// @namespace      http://diveintogreasemonkey.org/download/
// @include        http://autokadabra.ru/*
// @include        http://*.autokadabra.ru/*

// ==/UserScript==

//{"vote":{"mark":1,"is_voted":true,"is_voted_plus":true},"score":15,"is_positive":true,"messages":"ok"}


document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
	var userName;
	var currentClass = event.target.className;
	var action;
		
	if (event.target.text == '–' || event.target.text == '+')
	{
	    // do whatever you want here
	
	var voted = document.evaluate(
	    "..",
	    event.target,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    voted = voted.snapshotItem(0);
		voted = voted.className;
	if (voted.match('voted'))
	{
		return;
	}
	
	userName = document.evaluate(
			    "//li[@class='driver-inside']/*/*/em",
			    document,
			    null,
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			    null);
			for (var i = 0; i < userName.snapshotLength; i++) {
			    userName = userName.snapshotItem(i);
			}
	
	var author = document.evaluate(
	    "../../div[@class='meta']/span/a",
	    event.target,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    author = author.snapshotItem(0);
	    
	
	var commenturl = document.evaluate(
	    "../../div[@class='meta']/a[@class='bars']",
	    event.target,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    commenturl = commenturl.snapshotItem(0);
	
	var posturl = document.evaluate(
	    "../../../h3/a",
	    event.target,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	    posturl = posturl.snapshotItem(0);
	
	var type = (commenturl) ? 'комментарий' : 'пост';
	var url = (commenturl) ? commenturl.href : posturl.href;
	
	
	if (currentClass.match('up'))
	{
		action = 'плюсанул';
	}
	else
	if (currentClass.match('down'))
	{
		action = 'минусанул';
	}
	
	var Msg = '@' + userName.innerHTML + ' ' + action + ' ' + type +  ' @' + author.text + ' ' + url;
	
	// alert(XMLHttpRequest)
	// 	
	// 	GM_xmlhttpRequest(
	// 		{
	// 		    method: 'POST',
	// 			data: 'action=1&text='+Msg,
	// 		    url: 'http://autokadabra.ru/ajax/jam/add/',
	// 		    headers: {// 'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5',
	// 		    // 			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*',
	// 			// 'Cookie': document.cookie,
	// 			// 'Host': 'autokadabra.ru',
	// 			// 'Accept-Encoding': 'gzip,deflate',
	// 			// 'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
	// 			// 'X-Requested-With': 'XMLHttpRequest',
	// 			'Content-Type': 'application/x-www-form-urlencoded;',
	// 			'Referer': 'http://autokadabra.ru/'
	// 			// 			'Content-Length': Msg.length + 15
	// 			}
	// 		
	// 		});
	
	function createRequestObject()
	{
	    if (window.XMLHttpRequest)
		{
	        try
			{
	            return new XMLHttpRequest();
	        }
			catch (e) {}
	    } else if (window.ActiveXObject)
		{
	        try
			{
	            return new ActiveXObject('Msxml2.XMLHTTP');
	        }
			catch (e)
			{
	          try
				{
	              return new ActiveXObject('Microsoft.XMLHTTP');
	          	} catch (e) {}
	        }
	    }
	    return null;
	}
	
	var xmlhttp = createRequestObject();
	
	xmlhttp.open("POST", "http://autokadabra.ru/ajax/jam/add/?action=1&text=" + encodeURIComponent(Msg), true);
	xmlhttp.send('action=1&text=' + encodeURIComponent(Msg));
	
			
	}
    // if you want to prevent the default click action
    // (such as following a link), use these two commands:
	// event.stopPropagation();
	// event.preventDefault();
}, true);