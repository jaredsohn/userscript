// ==UserScript==
// @name          hatena review
// @namespace     http://www.petitnoir.net/
// @description   
// @include       http://www.amazon.co.jp/*
// ==/UserScript==

(function (){

asin =document.location.href.match(/(ASIN|dp|product)\/([0-9|a-z|A-Z]{10})/);
asin = RegExp.$2;
      GM_xmlhttpRequest({
          method:"GET",
          url: "http://k.hatena.ne.jp/asinblog/" + asin +"?mode=rss",
          onload:function(response) {
                    items = response.responseText.match(/<item rdf:about(\s|.)+?<\/item>/mg);
					var ul = document.createElement('ul');
					 for (i=0;i < items.length;i++){
						items[i].match(/<title>([^<]*)<\/title>\s*<link>([^<]+)<\/link>\s*<description>([^<]*)<\/description>\s*<dc:creator>([^<]+)<\/dc:creator>\s*<dc:date>([^<]*)<\/dc:date>/mg);
						var title = RegExp.$1;
						var link = RegExp.$2;
						var date = RegExp.$5;
						var user = RegExp.$4//link.replace("http://d.hatena.ne.jp/","").replace(/\/[0-9]+/,"");
						
						var favicon = document.createElement('img');
							favicon.src = "http://www.hatena.ne.jp/users/" + user.substr(0,2) + "/" + user + "/profile_s.gif";
								favicon.style.marginLeft = '10px';
						var span_u = document.createElement('span');
							span_u.textContent = user;
								span_u.style.marginLeft = '10px';
						var a = document.createElement('a');
							a.href = link;
							a.innerHTML = title;
								a.style.marginLeft = '10px';
						var span_d = document.createElement('span');
							span_d.textContent = date;
								span_d.style.marginLeft = '10px';
						var list = document.createElement('li');
						
						list.appendChild(span_d);
						list.appendChild(favicon);
						list.appendChild(span_u);
						list.appendChild(a);
						ul.appendChild(list);
					}
					var div = document.createElement('div');
						with (div.style){
							margin = '30px';
							padding = '10px';
							border = '1px solid #000';
							background = '#ffffee';
						}
					var div_h = document.createElement('h3');
						div_h.textContent = document.title + "を含むはてなダイアリー";
					var rss = document.createElement('a');
						rss.href ="http://d.hatena.ne.jp/asindiary/" + asin +"?mode=rss";
							rss.style.marginLeft = '10px';
					var rss_img = document.createElement('img');
						rss_img.src = "http://d.hatena.ne.jp/images/rss.gif";
							rss_img.style.border = 'none';
							
					rss.appendChild(rss_img);
					div_h.appendChild(rss);
					div.appendChild(div_h);
					div.appendChild(ul);
					document.body.appendChild(div);
				}
        });
})();