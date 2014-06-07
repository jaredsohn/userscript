// ==UserScript==
// @name           booklog + google book search
// @namespace      http://d.hatena.ne.jp/nyubachi/
// @include        http://detail.booklog.jp/asin/*
// ==/UserScript==
(function() {
	
	var pre_isbn = document.evaluate('/html/body/div/div/div', document, null, 7 , null);
	var isbn = pre_isbn.snapshotItem(0).textContent.match(/\w{10}/)[0];
	var url = 'http://books.google.com/books?bibkeys=ISBN:' + isbn + '&jscmd=viewapi'
		
	var opt = {
      method: 'get',
      url: url,
      onload: function(res){
			var gbs;
			var response = res.responseText;
			eval(response);

			for(var i in _GBSBookInfo){
				gbs = _GBSBookInfo[i];
			}
			
			var div = document.createElement('div');

			if(gbs){
				if(gbs.preview != 'noview'){
					var preview_btn = 'http://books.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif';
					html = '<p><a href="' + gbs.preview_url + '" target="_blank"><img style="border:none" src="' + preview_btn + '" /></a></p>';
				}else{
					html = '<p>No Preview in Google Book Search</p>';
				}
			}else {
				html = '<p>No Preview in Google Book Search</p>';
			}
			
			div.innerHTML = html;
			
			var xpath = document.evaluate('/html/body/div/div/div/table/tbody/tr/td/a[2]', document, null, 7 , null);
			var xpath2 = xpath.snapshotItem(0);
			xpath2.parentNode.appendChild(div);
      }
    }
		
GM_xmlhttpRequest(opt);

}) ();