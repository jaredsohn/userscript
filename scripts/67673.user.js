// ==UserScript==
// @name           eRep heal
// @namespace      ns
// @include        http://www.erepublik.com/*/region/*
// ==/UserScript==

function getToken_(){
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.erepublik.com",
  onload: function(response) {
	if (!response.responseXML)
    response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
	var re = /name="_token" value="(\w*)"/.exec(response.responseText);
	document.querySelector('div.indent td.hospital input[name=_token]').value=re[1];
  }
});
}

if (document.querySelector('input[name=_token]') == null){ 
	var str = {};
	str.l = /erepublik.com\/(\w\w)\//.exec(document.location.href)[1];
	var wikiL = document.querySelector('p.padded a.goleft').href;
	str.c = /wiki.erepublik.com\/index.php\/(\w*)/.exec(wikiL)[1];
	str.r = document.querySelector('h2.special').innerHTML;

	var d = document.querySelector('div.indent tr');
	var el = document.createElement('tr');
	d = d.parentNode.insertBefore(el, d.nextSibling);
	el = document.createElement('td');
	d.insertBefore(el, null);
	el.setAttribute('class','hospital');
	el.innerHTML='<a id="getTk">Get token</a><form id="heal_form" name="heal_form" method="post" action="http://www.erepublik.com/'+str.l+'/hospital/'+str.c+'">Токен: <input id="_token" name="_token" value="" /><br>Регион текстом: <input name="region" id="region" value="'+str.r+'" /><br><input type=submit id="submit_ajax_heal_id" value="Heal"></form>';

	var link = document.getElementById('getTk');
	link.style.cursor = 'pointer';
	link.style.textDecoration = 'underline';
	link.addEventListener("click", getToken_, true);

}

