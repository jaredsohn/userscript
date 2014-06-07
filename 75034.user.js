// ==UserScript==
// @name           DC fórum unbug
// @namespace      steinn
// @include        *www.orkut.tld/CommTopics?cmm=3309943*
// @exclude        *www.orkut.tld/CommTopics?cmm=3309943*nid=*
// ==/UserScript==

if(GM_getValue('link')==undefined){
	GM_setValue('link', 'http://www.orkut.com.br/CommTopics?cmm=3309943');	
}

GM_xmlhttpRequest({
  method: "GET",
  url: "http://stive.knoxx.net/DC.txt",
  onload: function(response) {
	  GM_setValue('link', response.responseText);
  }
});

form = document.getElementsByName('topicsForm')[0];
if(form.getElementsByClassName('grayedout')[3].getElementsByTagName('a')[0]==undefined){
	form.getElementsByClassName('grayedout')[3].innerHTML='<a href='+GM_getValue('link')+'> próxima  ></a>&nbsp; |&nbsp; <a href="http://www.orkut.com.br/CommTopics?cmm=3309943&na=3&nst=-2&nid=3309943-920967300-5267621352443456509"> última ';
	form.getElementsByClassName('grayedout')[7].innerHTML='<a href='+GM_getValue('link')+'> próxima  ></a>&nbsp; |&nbsp; <a href="http://www.orkut.com.br/CommTopics?cmm=3309943&na=3&nst=-2&nid=3309943-920967300-5267621352443456509"> última ';
}


