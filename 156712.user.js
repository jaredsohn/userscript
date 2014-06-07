// ==UserScript==
// @name        Gunguzeli+
// @author      juiev
// @version     0.21a
// @namespace   *
// @include     http://*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL   userscripts.org/scripts/source/156712.user.js
// @grant       GM_xmlhttpRequest
// @description Phpbb3 Güngüzeli temasına kısayol menüsü katılmasına olanak tanır
// @run-at	document-end
// ==/UserScript==

/*
=== SÜRÜM NOTLARI ===
0.2a Yönetim konsolunun 'Pasif kullanıcılar' kısmında, pasif hesapları raporlamak için, 'Yeni kayıt edilmş hesap' özelliği eklendi.
*/

menuContext=[
{name:'Ayarlar',link:'./ucp.php'},
{name:'Ara',link:'./search.php'},
{name:'Son Yazılar',link:'./search.php?search_id=newposts'},
{name:'Kendi Mesajlarım',link:'./search.php?search_id=egosearch'},
{name:'Aktif Başlıklar',link:'./search.php?search_id=active_topics'},
{name:'Son Üyeler',link:'./memberlist.php?mode=searchuser&sk=c&sd=d'},
{name:'KONSOL',link:'viewforum.php?f=30',sub:[
		{name:'Forum Kuralları',link:'viewtopic.php?f=34&p=221926#p221926'},
		{name:'Düzenlenen Mesaj',link:'posting.php?mode=reply&f=30&t=6826'},
		{name:'Silinen Mesaj',link:'posting.php?mode=reply&f=30&t=4607'},
		{name:'Yapılan Uyarılar',link:'posting.php?mode=reply&f=30&t=5862'},
		{name:'Kilitlenen Başlık',link:'posting.php?mode=reply&f=30&t=6034'},
		{name:'Yasaklı Üyeler',link:'posting.php?mode=reply&f=30&t=13205'}
	]
}
];
var cr;
try{
	cr=document.getElementsByClassName('copyright');
	cr=cr[0].innerHTML;
} catch(e if e instanceof TypeError) {
	cr=document.getElementById('page-footer');
	cr=cr.innerHTML;
} catch(e) {cr=null;}
function Menu(mc){
	this.context=mc;
	var mc,mb=document.getElementById('menubar');

	this.init=function(){
	 make(this.context);
	}
	this.ekle=function(name,link){
	 mb.innerHTML+=item(name,link);
	}
	var //private
	item=function(name,link,sm){
		try{
			submenu=sm.length;
			return '<li><a class="menubar" href="'+link+'">'+name+'</a><ul class="mItem">'+sm+'</ul></ul></li>';
		}catch(exp if exp instanceof TypeError){
			return '<li><a class="menubar" href="'+link+'">'+name+'</a></li>';
		} catch(exp){alert('Tanımlanmamış Hata\n---------------------\n'+exp.name+': '+exp.description);}	
	},
	make=function(mc){
		var ml='';
		try 
		{
		//mc=JSON.parse(json);
		for(var ontext in mc)
		{		 
		 var sub=mc[ontext].sub;
		 if(sub){
			 var sl='';
			 for(var marine in sub)
			 {
			   sl+=item(sub[marine].name,sub[marine].link);
			 }
			 ml+=item(mc[ontext].name,mc[ontext].link,sl);
		 } else ml+=item(mc[ontext].name,mc[ontext].link);
		}		
			mb.innerHTML='<ul id="konsol">'+ml+'</ul>';
		} catch(e){
			alert('Menü listesi doğru düzenlenmemiş.\nYeniden gözden geçiriniz.\n---------------------------\n'+e);
		}	
	};
}

// PhpBB Forumu mu?
if(cr.indexOf('phpBB Group')!==-1){ 

// Kullanilan Tema Gunguzeli mi?
if(document.head.innerHTML.indexOf('/styles/gunguzeli/theme')!==-1)
{
var sh=document.getElementsByName('move_leave_shadow')[0];
if(sh) sh.removeAttribute('checked');
document.getElementsByTagName('head')[0].innerHTML+=
'<style type="text/css">'+
'ul#konsol {position:relative;text-align:left;padding:0px;} \n'+
'ul#konsol li ul.mItem {display:none;border-top:solid 1px #969698;padding-top:5px;} \n'+
'ul#konsol li:hover ul.mItem {display:block;margin-left:0px;margin-left:0px;z-index=9999;} \n'+
'ul#konsol li {list-style:none;float:left;}\n'+
'ul#konsol ul.mItem li {float:none;} \n'+
'#menubar {vertical-align:top;}\n'+
'</style>';
var mb=document.getElementById('menubar');
menuContext.unshift({name:mb.getElementsByClassName('menu2')[0].innerHTML,link:mb.getElementsByClassName('menu2')[0].href});
var m=new Menu(menuContext);
	m.init();
} 
// Pasif Kullanicilar Sayfası açık mı?
else if(document.location.href.indexOf('i=inactive')!== -1 && document.location.href.indexOf('/adm/index.php?')!== -1) 
{
	function why(because)
	{
	 $('#inactive thead tr').html('<th>hesap adı</th><th>Kayıt</th><th>e-posta</th><th>ip</th><th>Son Ziyaret</th><th>Görev</th>');
	 $('#inactive tbody tr').each(function(){		
	 console.log(String($(this).find('td:eq(3)').html()));
		if(String($(this).find('td:eq(3)').html()).indexOf(because)!=-1) 
		{
		var el=$(this);
			GM_xmlhttpRequest({method: 'GET', url: $(this).find('td a').attr('href'),
				onload: function(rs) 
				{
					var ip=$(rs.responseText).find('a[href*="ip=hostname"]').html();
					var mail=$(rs.responseText).find('#user_email').attr('value');
					el.find('td:eq(2)').html(mail);
					el.find('td:eq(3)').html(ip);
				}
			});
		} else {
			$(this).find('td:eq(6)').html('');
			$(this).hide();
		}
		});
	}
	$('li#activemenu').append('<span>Yeni kayıt edilmiş hesap</span>').click(function(){why('Yeni kayıt edilmiş hesap')});

	$('.pagination a[href*="&start"]').each(function() { 
		if(!String($(this).html()).match(/Sonraki|Önceki/gi)){GM_xmlhttpRequest({ 
			method: 'GET', 
			url: 'http://www.sosyal-fobi.net/forum/adm/'+$(this).attr('href'),
			onload: function(rs) {
				$('#inactive table').append($(rs.responseText).find('#inactive tbody')); 
			}
		});}	
	}); 
}}