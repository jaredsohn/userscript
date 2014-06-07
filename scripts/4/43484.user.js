// ==UserScript==
// @name          Musashino City Library Lookup from Amazon book listings.
// @namespace     http://hikariworks.jp/musashino/
// @description   Musashino City Library Lookup from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

// Version 20090303

libsearch();

function libsearch() {
    if(document.contentType != 'text/html') return;

    var l_url = "https://www.library.musashino.tokyo.jp/cgi-bin/Sopcsken.sh";
    var l_api = "brws=ncdet&c_date=&c_key=&g_mode=0&itfg0=c&itfg1=c&itfg2=c&itfg3&citfg4=c&itfg9=c&key0=&key1=&key2=&key3=&key4=&kkey=&ktyp0=shk|ser&ktyp1=atk&ktyp2=spk&ktyp3=kek&ktyp4=shk|atk|spk|kek|kjk|ser&ktyp9=shk|atk|spk|kek|ser&lckns=01&lckns=02&lckns=03&list_cnt=20&mad_list_cnt=&p_mode=1&ron0=a&ron1=a&ron2=a&ron3=a&ryno=&ser_type=0&sgid=spno&skey=&srkbs=10&srkbs=20&srkbs=30|31&srkbs=40&srkbs=50&srkbs=61|62&srkbs=63|64|65&srsl1=1&srsl2=2&srsl3=3&stkb=&tgid=tyo:010A&tkey=";
    document.body.parentNode.innerHTML.match( /\s(4(\d{8}|-[\d-]{9}-)[\dX])/ );
    var isbn = '';
    if ( RegExp.$1!='' ) {
	isbn = RegExp.$1
    } else {
	document.body.parentNode.innerHTML.match( /\s(978\-4(\d{8}|-[\d-]{9}-)[\dX])/ );
	if ( RegExp.$1!='' ) {
	    isbn = RegExp.$1
	}
    }
    if (isbn == '') return;

    dspPanel(l_url, l_api, isbn);
}

function dspPanel(l_url, l_api, isbn) {
    var GM_infoPanel = document.createElement('div')

    with(GM_infoPanel.style) {
	bottom = 0;
	right = 0;
	padding = '2px';
	opacity = 0.8;
	fontsize = 'x-small';
	color = '#000000';
	backgroundColor = '#EEEEEE';
	border = '1px solid #C0C0C0';
	zIndex = 100;
	position = 'fixed';
    }

    GM_infoPanel.innerHTML = "武蔵野市立図書館 検索中..."; 

    GM_xmlhttpRequest({
	method : "GET",
	url    : 'https://www.library.musashino.tokyo.jp/cgi-bin/Sopcsken.sh',
	headers: {'User-Agent': 'Mozilla/4.0 (compatible)',
		  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'},
	onload : function(response){
	  GM_xmlhttpRequest({
	    method : "POST",
            url    : l_url,
	    data   : l_api + isbn,
	    headers: {'User-Agent': 'Mozilla/4.0 (compatible)',
		      'Content-type': 'application/x-www-form-urlencoded',
		      'Host': 'www.library.musashino.tokyo.jp'},
	    onload : function(response){
		var res_text = response.responseText;
		var result=res_text.match(/wsort10.gif/);
		if ( result ) {
		    GM_infoPanel.innerHTML += '<br><a href=' + l_url + '?' + l_api + isbn + '>蔵書が見つかりました。</a>';
		}
		else{
		    GM_infoPanel.innerHTML += '<br>蔵書が見つかりません';
		}
	    }
	  });
        }
    });

    document.body.appendChild(GM_infoPanel);
}