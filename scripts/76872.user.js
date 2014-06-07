// ==UserScript==
// @name           eTatanga Grubu Haberlesme
// @namespace      Tatanga Haberler
// @description    eRepublik Oyunu Tatanga grubu haberleşme ağı
// @version        1.
// @include        http://ww*.erepublik.com/tr
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.serkanay.0fees.net/orders.htm',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var news1 = tags[0];
			var news2 = tags[1];
			var news3 = tags[2];
			var msborder = tags[3];
			var battletime = tags[4];
			var battlelink = tags[5]
			var update = tags[6]

			latest=document.getElementById('latestnews')

			header = document.createElement("h1");
			header.textContent = 'eTATANGA iletisim ';

			empty1 = document.createElement("h2");
			empty1.textContent = ' ';
			
			empty2 = document.createElement("h2");
			empty2.textContent = '                               ';

			news_t = document.createElement("h3");
			news_t.textContent = 'Haberler: ';

			orders_t = document.createElement("h3");
			orders_t.textContent = 'Savas Talimatlari: ';

			news1_t = document.createElement("h2");
			news1_t.textContent = '-' + news1;
			
			news2_t = document.createElement("h2");
			news2_t.textContent = '-' + news2;

			news3_t = document.createElement("h2");
			news3_t.textContent = '-' + news3;

			msb_t = document.createElement("h2");
			msb_t.textContent = 'MSB Emirleri : ';

			msborder_t = document.createElement("a");
			msborder_t.setAttribute('href',msborder)
			msborder_t.innerHTML = msborder;

			battletime_t = document.createElement("h2");
			battletime_t.textContent = 'Toplu Vurus Saati - ' + battletime;

			battlelink_t = document.createElement("a");
			battlelink_t.setAttribute('href',battlelink)
			battlelink_t.innerHTML = battlelink;

			update_t = document.createElement("small");
			update_t.textContent = 'Güncelleme:' + update;


			latest.parentNode.insertBefore(header, latest);
			latest.parentNode.insertBefore(update_t, latest);
			latest.parentNode.insertBefore(empty1, latest);
			latest.parentNode.insertBefore(news_t, latest);
			latest.parentNode.insertBefore(news1_t, latest);
			latest.parentNode.insertBefore(news2_t, latest);
			latest.parentNode.insertBefore(news3_t, latest);
			latest.parentNode.insertBefore(orders_t, latest);
			latest.parentNode.insertBefore(msb_t, latest);
			latest.parentNode.insertBefore(msborder_t, latest);
			latest.parentNode.insertBefore(battletime_t, latest);
			latest.parentNode.insertBefore(battlelink_t, latest);



	}	
}

);