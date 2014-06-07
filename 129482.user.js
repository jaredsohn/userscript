// ==UserScript==
// @id			profil.gittigidiyor.com-1f8c1456-311e-4a21-a07a-dd9ccf7a2ab7@scriptish
// @name		Gitti Gidiyor Olumsuz Yorumlar
// @version		1.5
// @namespace	*
// @author		juiev
// @description
// @grant		GM_xmlhttpRequest
// @updateURL	http://userscripts.org/scripts/source/129482.user.js
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include		http://profil.gittigidiyor.com/*
// @run-at		document-end
// ==/UserScript==

/* 
#### CHANGELOG #####

1.1 GittiGidiyor yeni arayuzune uyduruldu
1.2 Calisma sirasinda Firefox kilitlenme sorunu icin onlem alindi
1.3 'Olumsuz Yorumlar' sekmesi 'Begenmeyenler' suzgeci ile degistirildi
1.4 Hem olumsuz hem cekimser yorumlar suzgece eklendi
1.5 Yorum siralamasi tarihe gore azalan olarak duzenlendi

####################
*/

var loc=$('.CommentList li.on a').attr('href').split('#')[0];
var yorumlar='#UCommentCon .Comments ul:first';

$('#CommentOp').after('<button id="GG_neg" style="font-family:Arial,sans serif;font-size:12px;">Beğenmeyenler</button>');

function sayfaGetir(syf){
GM_xmlhttpRequest({
method:'GET',url: loc+'?sf='+syf,
onprogress:function(){
$('#GG_neg')
.html('Yükleniyor...')
.attr('disabled','disabled');
},
onload: function(cevap) {
			$(cevap.responseText).find('.Comments .CStatus span:not(.pos)').closest('li')
			.each(function(){
				$(yorumlar).prepend($(this));
			});
}
});
}

$('#GG_neg').click(function(){
	var el=$('div.Paging ul.clearfix a');
	var syfSayisi=parseInt(el.eq(el.length-2).html());
	$(yorumlar).empty();

	var it=setInterval(function()
	{
		sayfaGetir(syfSayisi);
		if(syfSayisi--<=0)
		{
			clearInterval(it);
			$('#GG_neg').html('Beğenmeyenler').removeAttr('disabled');
		}
	},200);
	
});
