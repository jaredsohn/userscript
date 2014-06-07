// ==UserScript==
// @name           eSA Bulletin
// @namespace      www.erepublik.com
// @description    eSouth Africa Bulletin for public announcements on the Latest News page of eRepublik.
// @version        1.2
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.majester.co.za/erepublik.htm',

	onload:function(response){
            //Retrieve and truncate string
            var order_string = response.responseText.match('class="orders".*?#');
            order_string = order_string.join(""); //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

            var tags = order_string.split('|');
			var article = tags[0];
			var article_link = tags[1];
			var content = tags[2];
			var region = tags[3];
			var region_link = tags[4];
			var published = tags[5];
			var poster = tags[6];
			var poster_link = tags[7];
			var image = tags[8];
			var title = tags[9];
			
			latest = document.getElementById('latestnews');
			
			title_el = document.createElement('h1');
			title_el.setAttribute('display','block');
			title_el.textContent = title;

			poster_el = document.createElement('a');
			poster_el.setAttribute('href',poster_link);
			poster_el.setAttribute('class','smalldotted');
			poster_el.innerHTML = poster;
			
			updated_el = document.createElement('p');
			updated_el.setAttribute('class','small');
			updated_el.textContent = published + ' by ';

			br_el = document.createElement('br');

			h3_el = document.createElement('h3');
			h3_el.textContent = ' ';

			article_el = document.createElement('a');
			article_el.setAttribute('href',article_link);
			article_el.setAttribute('class','dotted');
			article_el.setAttribute('style','border-top:solid #E5E5E5 1px');
			article_el.innerHTML = article;

			p_el = document.createElement('p');
			p_el.setAttribute('class','holder');
			
			content_el = document.createElement('span');
			content_el.setAttribute('style','');
			content_el.textContent = content;
			
			image_el = document.createElement('img');
			image_el.setAttribute('class','test');
			image_el.setAttribute('src',image);
			image_el.setAttribute('style','float:right; padding-left:10px; max-width:300px; max-height:150px;');
			
			item_link_el = document.createElement('div');
			item_link_el.setAttribute('class','item elem');

			region_link_el = document.createElement('a'); 
			region_link_el.setAttribute('href',region_link);
			region_link_el.setAttribute('class','smalldotted latest_events_link');
			region_link_el.innerHTML = region;
						
			//Insert elements on page
			if(order_string.length) { //Only insert if string is uncommented
			latest.parentNode.insertBefore(title_el, latest);
			latest.parentNode.insertBefore(updated_el, latest);
			updated_el.appendChild(poster_el);
			latest.parentNode.insertBefore(br_el, latest);
			latest.parentNode.insertBefore(br_el, latest);			
			latest.parentNode.insertBefore(article_el, latest);
			latest.parentNode.insertBefore(p_el, latest);
			p_el.appendChild(image_el);
			p_el.appendChild(content_el);
			latest.parentNode.insertBefore(item_link_el, latest);
			item_link_el.appendChild(region_link_el);
			latest.parentNode.insertBefore(h3_el, latest);
			}
		}
	}
);