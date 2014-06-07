// ==UserScript==
// @name           Sind Union Online [GW]
// @namespace      VSOPGW
// @include        *ganjawars.ru/syndicate.php*
// ==/UserScript==

(function() {

	function REQ(url, method, param, async, onsuccess, onfailure) 
	{
		if(typeof request == 'undefined')
			request = new XMLHttpRequest();
    request.open(method, url, async);
    request.send(param);
    if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') 
			onsuccess(request);
    else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') 
			onfailure(request);
	}
	

	var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
	
	if (root.location.href.indexOf('page=online') >= 0) 
	{
		var id = /id=([0-9]*)\&page=online/.exec(root.location.href);
		id = id[1];
		REQ('http://www.ganjawars.ru/syndicate.php?id=' + id + '&page=politics', 'GET', null, false, function (req) 
			{
				
				var unionid = /Союзный синдикат:<\/b> <a href=\/syndicate\.php\?id=([0-9]*)>/.exec(req.responseText);
				if(unionid == null)
					return;
				
				unionid = unionid[1];
				REQ('http://www.ganjawars.ru/syndicate.php?id=' + unionid + '&page=online', 'GET', null, false, function (req) 
				{
					var div = root.document.createElement('div');
					div.innerHTML = req.responseText;
					var tlist = div.getElementsByTagName('table');
					var uniontable = tlist[8];
			    
					var tlist = root.document.getElementsByTagName('table');
					var ourtable = tlist[8];
						// alert(uniontable.rows.length);
					try
					{
					
					for (var i = 0, l = uniontable.rows.length; i < l; i++) 
					{
						var row = uniontable.rows[i];
						row = row.cloneNode(true);
						ourtable.appendChild(row);
					}
					}
					catch(err)
					{
						alert(i);
					}

				});
				
			});
	}

})();