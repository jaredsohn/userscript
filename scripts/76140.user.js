// ==UserScript==
// @name           Ecezch Informations
// @namespace      http://www.erepublik.com/en/referrer/palas+the+great
// @description    Ecezch Informations by palas the great
// @include        http://ww*.erepublik.com/*
// @exclude        http://ww*.erepublik.com/*/*
// ==/UserScript==




GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://seshanbeh.com/czech.txt',

		onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var parancs = tags[0];
			var regio = tags[1];
			var link = tags[2]
			var ido = tags[3]
			var logo = tags[4]

			latest=document.getElementById('latestnews')

			parancs_el = document.createElement("h4")
			parancs_el.textContent=parancs + '         ' + regio 

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			ido_el=document.createElement("h4")
			ido_el.textContent ='Last Updated: ' + ido

			logo_el = document.createElement("img"); 
			logo_el.setAttribute('src',logo)
			logo_el.innerHTML = logo
			
			latest.parentNode.insertBefore(logo_el, latest)
			latest.parentNode.insertBefore(parancs_el, latest)
			latest.parentNode.insertBefore(ido_el, latest)	
			latest.parentNode.insertBefore(link_el, latest)


	}
	
}


);

	htmlSettings += '<div title="' + STRINGS[28] + '" id="feature_off_' + p.pos + '" style="cursor: pointer; float: left; height: 25px; width: 25px; background:url(http://www.persianweblog.ir/sympathy/images/election4.gif) 0 0 no-repeat"></div>';
