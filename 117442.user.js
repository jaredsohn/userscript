// ==UserScript==
// @name vkontakte-prison
// @version 0.92
// @author Alex Mryasov (id:1831888)
// @namespace AM_vk_prison
// @include http://vk.com/*
// @include http://vkontakte.ru/*
// ==/UserScript==


//GM_setValue('user','');
//GM_setValue('auth_key','');

var user=GM_getValue('user');
var auth_key=GM_getValue('auth_key');


var link = document.createElement('link'); document.getElementsByTagName('head')[0].appendChild(link); link.setAttribute('type','text/css'); link.setAttribute('rel','stylesheet'); link.setAttribute('href','/css/al/profile.css');



function utf8_decode(utftext) {
	utftext=unescape(utftext);
	var string = "";
	var i = 0;
	var c = c1 = c2 = 0;
	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12)
					| ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}

var hint={
	t:null,
	a:null,
	keep:false,
	list:new Array(),
	// создание действий в списке друзей
	setActFromFrendList:function(){
		if(!document.getElementById('friends_list')) return false;
		if(document.getElementById('page_body')) document.getElementById('page_body').style.overflow='visible';
		document.getElementById('friends_list').style.position='relative';
		var a=document.getElementById('friends_list').getElementsByTagName('a');
		for(var i=0;i<a.length;i++){
			var div=a[i].parentNode;
			if(
				div.className=='user_block user_block_first common request clear_fix'
				|| div.className=='user_block common request clear_fix'
				|| div.className=='labeled'
				|| div.className=='common_friends'
				|| div.className=='user_block user_block_first clear_fix'
				|| div.className=='user_block clear_fix'
			){
				hint.setAact(a[i]);
			}
		}
	},
	// создание действий в списке диалогов
	setActFromDialogList:function(){
		if(!document.getElementById('im_rows')) return false;
		if(document.getElementById('im_dialogs')) document.getElementById('im_dialogs').style.position='relative';
		var a=document.getElementById('im_rows').getElementsByTagName('a');
		for(var i=0;i<a.length;i++){
			var div=a[i].parentNode;
			if(div.className=='dialogs_photo' || div.className=='dialogs_user wrapped'){
				hint.setAact(a[i]);
			}
		}
	},
	// установка действий ссылкам
	setAact:function(a){
		if(a.className.indexOf('am_vk_prison_event_created')!=-1) return false;
		a.className+=' am_vk_prison_event_created';
		a.addEventListener('mouseover',function(){
			if(hint.t) window.clearTimeout(hint.t);
			hint.a=this;
			var time=500;
			if(hint.list[this.getAttribute('href')]) time=1;
			if(!document.getElementById('am_vk_prison_hint')) hint.t=window.setTimeout(function(){hint.create()},time);
			hint.keep=true;
		});
		a.addEventListener('mouseout',function(){
			hint.a=null;
			if(hint.t) window.clearTimeout(hint.t);
			hint.keep=false;
			hint.remove();
		});
	},
	// создание всплывающего окна
	create:function(){
		var a=hint.a;
		if(!a) return false;
		if(!a.getAttribute('href')) return false;
		var left=a.offsetLeft+Math.round(a.clientWidth/2); var top=a.offsetTop+Math.round(a.clientHeight/2);
			var div=document.createElement('div');
				div.id='am_vk_prison_hint';
				div.style.position='absolute';
				div.innerHTML='asdfasdf';
				div.style.width='450px';
				div.style.left=left+'px';
				div.style.zIndex='500';
				div.style.top=top+'px';
				div.style.border='1px solid #999';
				div.style.backgroundColor='#fff';
				div.addEventListener('mouseover',function(){hint.keep=true;});
				div.addEventListener('mouseout',function(){hint.keep=false; hint.remove();});
				div.innerHTML='<div id="am_vk_prison_info" class="profile_info" style="padding:10px"><div style="text-align:center"><img id="am_prison_loader" src="/images/progress7.gif" /></div></div>';
		if(document.getElementById('friends_list')) document.getElementById('friends_list').appendChild(div);
		//if(document.getElementById('im_dialogs')) document.getElementById('im_dialogs').appendChild(div);
		hint.getUserInfo(a.getAttribute('href'));
	},
	// удаление всплывающего окна
	remove:function(){
		window.setTimeout(function(){hint._remove()},1);
	},
	_remove:function(){
		if(hint.keep) return false;
		var e_hint=document.getElementById('am_vk_prison_hint');
		if(e_hint) e_hint.parentNode.removeChild(e_hint);
		var strut=document.getElementById('am_vk_prison_footer_strut');
		if(strut) strut.parentNode.removeChild(strut);
	},
	
	//получение информации о пользователе (возможно из массива)
	getUserInfo:function(href){
		if(!href) href=hint.a.getAttribute('href');
		if(hint.list[href]){
			setContent(hint.list[href]);
			hint.checkDocHeight();
			document.getElementById('am_prison_talent_detail_link').addEventListener('click',showHideTalentDetail,false);
			return false;
		}
		if(href.match(/\/id\d+/)){
			var uid=parseInt(href.match(/\/id(\d+)/)[1]);
			if(uid) getUserInfo(false,uid,href);
		} else {
			log('Загружаем страницу пользователя (<a href="http://'+document.domain+''+href+'">http://'+document.domain+''+href+'</a>) для определения ID');
			GM_xmlhttpRequest({
				method:'GET',
				url:href,
				onload:function(response){
					getUserInfo(false,response.responseText,href);
				},
				onerror:function(response){
					log('Не могу загрузить страницу (HTTP_STATUS='+response.status+') ['+response.statusText+']');
					hideLoader();
				}
			});
		}
	},
	// проверка на высоту документа - если хинт уплывает на больше вниз - меняем высоту документа
	checkDocHeight:function(){
		var docHeight=document.body.offsetHeight;
		var top=parseInt(document.getElementById('am_vk_prison_hint').style.top);
		var height=document.getElementById('am_vk_prison_hint').clientHeight;
		
		var scrollTop=self.pageYOffset;
		var wHeight=window.innerHeight;
		
		if(top+160+height>scrollTop+wHeight && height<wHeight){
			var newTop=scrollTop+wHeight-height-170;
			document.getElementById('am_vk_prison_hint').style.top=newTop+'px';
		} else {
			if(docHeight<top+180+height){
				var iHeight=top+180+height-docHeight;
			} else return false;
			document.getElementById('footer_wrap').innerHTML+='<div id="am_vk_prison_footer_strut" style="height:'+iHeight+'px;width:10px"></div>';
		}
	}
};

// интервал на проверку (для страницы списка друзей)
window.setInterval(function(){hint.setActFromFrendList()}, 500);
//window.setInterval(function(){hint.setActFromDialogList()}, 500);

	

// проверка, если находимся на странице с профилем и нет инфы - выводим ее
window.checkUserInfo=function(){
	var profile=document.getElementById('profile_short');
	if(!profile) return false; //нет профиля
	var am_vk_prison_info=document.getElementById('am_vk_prison_info');
	if(am_vk_prison_info) return false; //инфо уже есть
	create_AM_info();
	getUserInfo(true);
}

// интервал на проверку (для страницы пользователя)
window.setInterval(function(){checkUserInfo()}, 500);


var profile=document.getElementById('profile_short');
if(!profile) return false;

// создание контейнера с инофрмацией
function create_AM_info(){
	var profile=document.getElementById('profile_short');
	profile.innerHTML=profile.innerHTML+'<br /><h2 style="text-align:center">Тюряга</h2><div id="am_vk_prison_info" class="profile_info"><div style="text-align:center"><img id="am_prison_loader" src="/images/progress7.gif" /></div></div><br />';	
}
create_AM_info();



if(user=='' || user==undefined || auth_key=='' || auth_key==undefined){
	getOwnerUserInfo();
} else {
	getUserInfo();
}

// установка контента
function setContent(html){
	document.getElementById('am_vk_prison_info').innerHTML=html;
}

// установка контента (ошибка)
function setErrorContent(html){
	setContent('<strong>Ошибка:</strong> '+html);
}

// log
function log(html){
	document.getElementById('am_vk_prison_info').innerHTML+='<div>'+html+'</div>';
}

// скрыть лоадер
function hideLoader(){
	document.getElementById('am_prison_loader').style.display='none';
}


// получение информации о юзере-хозяине
function getOwnerUserInfo(isHint){
	if(document.body.innerHTML.match(/\"id\":(\d+),/)){
		user=parseInt(document.body.innerHTML.match(/\"id\":(\d+),/)[1]);
	} else {
		return false;
	}
	
	
	log('запрос auth_key');
	GM_xmlhttpRequest({
		method:'GET',
		url:'/app1979194',
		onload:function(response){
			if(response.status==200){
				if(response.responseText.match(/\"auth_key\":\"(.+?)\"/)){
					auth_key=response.responseText.match(/\"auth_key\":\"(.+?)\"/)[1];
					GM_setValue('user', user);
					GM_setValue('auth_key', auth_key);
					log('auth_key получен');
					if(isHint) hint.getUserInfo(); else getUserInfo();
				} else {
					log('<b>Ошибка:</b> Не могу определить <strong>auth_key</strong>');
					hideLoader();
					return false;
				}
			} else {
				log('<b>Ошибка при загрузке тюряги:</b> HTTP_STATUS='+response.status+' ['+response.statusText+']');
				hideLoader();
				return false;
			}
		},
		onerror:function(response){
			log('Не могу загрузить тюрягу (HTTP_STATUS='+response.status+') ['+response.statusText+']');
			hideLoader();
			return false;
		}
	});

}

// получение информации о юзере, к которому зашли.
function getUserInfo(isPhoto,text,href){
	var frend_id=0;
	
	if(typeof(text)!='number'){
		if(!text) text=document.body.innerHTML;
		
		log('ищем ID пользователя');
			if(isPhoto){
				//определение ID по фото
				var photo_link=document.getElementById('profile_photo_link');
					if(!photo_link){
						log('<b>Ошибка:</b> не могу определить ID пользователя, нажмите <b>F5</b>');
						return false;
					}
					var photo_href=photo_link.href;
					var start=photo_href.indexOf('/photo')+6;
				var frend_id=photo_href.substr(start,photo_href.indexOf('_')-start);
			} else {
				if(text.match(/\"user_id\":(\d+)/)){
					frend_id=text.match(/\"user_id\":(\d+)/)[1];
				} else {
					if(text.match(/\"user_id\":\"(\d+)\"/)){
						frend_id=text.match(/\"user_id\":\"(\d+)\"/)[1];
					} else {
						log('ошибка определения ID пользователя');
						hideLoader();
						return false;
					}
				}
			}
		
		log('ID найден ('+frend_id+'). Получаем информацию о пользователе');
	} else {
		frend_id=text;
		log('Получаем информацию о пользователе (ID:'+frend_id+')');
	}
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://109.234.155.198/prison/universal.php?getFriendModels&method=getFriendModels&user='+user+'&key='+auth_key+'&friend_uid='+frend_id,
		onload:function(response){
			responseHandler(response,href);
		},
		onerror:function(response){
			responseHandler(response);
		}
	});
	
}

// обработчик событий, единый для всех
function responseHandler(response,href){
	if(response.status==200){
		// вероятно, не тот auth_key
		if(response.responseText=='<result>0</result>'){
			GM_setValue('user','');
			GM_setValue('auth_key','');
			log('неверный auth_key');
			isHint=true; if(!href) isHint=false;
			getOwnerUserInfo(isHint);
			return false;
		}
		//ошибка
		if(response.responseText.match(/<error>/i)){
			var error_msg='Неизвестная ошибка';
			if(response.responseText.match(/<msg>(.+?)<\/msg>/i)){
				var error_msg=response.responseText.match(/<msg>(.+?)<\/msg>/i)[1];
			}
			log('<b>Ошибка:</b> '+error_msg);
			hideLoader();
			return false;
		}
		setUserInfo(response.responseText,href);
	} else {
		hideLoader();
		log('<b>Ошибка при загрузке информации:</b> HTTP_STATUS='+response.status+' ['+response.statusText+']');
		return false;
	}
}


// установка информации о юзере
function setUserInfo(text,href){
	
	text=text.replace(/\n/g,'');
	text=text.replace(/\t/g,'');
	text=text.replace(/\amc/g,'');
	text=text.slice(text.indexOf('>')+1);
	
	var xtext=text.replace(/</g,'&lt;');
	xtext=xtext.replace(/>/g,'&gt;');
	//document.getElementById('am_vk_prison_info').innerHTML=xtext;
	
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(text, "text/xml");	
	var nsResolver=xmlDoc.createNSResolver(xmlDoc.ownerDocument == null ? xmlDoc.documentElement:xmlDoc.ownerDocument.documentElement);
	
	var html='';
	var name=utf8_decode(xmlDoc.evaluate('//name',xmlDoc,nsResolver,XPathResult.ANY_TYPE,null).iterateNext().textContent);
		html+=printRow('Кличка:',name);
	
	var rating=xmlDoc.evaluate('//rating', xmlDoc, nsResolver,XPathResult.ANY_TYPE,null).iterateNext().textContent;
		html+=printRow('Уровень:',printLevel(parseInt(rating)));
		html+=printRow('Авторитет:',rating);
	var cell=xmlDoc.evaluate('//background',xmlDoc,nsResolver,XPathResult.ANY_TYPE,null).iterateNext().textContent;
	var cellName=getCellName(cell);
		html+=printRow('Камера:',cellName);
	var bread=xmlDoc.evaluate('//beard',xmlDoc,nsResolver,XPathResult.ANY_TYPE,null).iterateNext().textContent;
	var breadName=getBreadName(bread);
		html+=printRow('Борода:',breadName);
	
	html+=printTitle('Победы'); html+='<br />';
	var bossNames=['Кирпич','Сизый','Махно','Лютый','Шайба','Палыч','Циклоп','Бес','Паленый','Борзов','Хирург']; var boss_id;
	var bosses=xmlDoc.evaluate('//boss',xmlDoc, nsResolver,XPathResult.ANY_TYPE,null);
	var boss=bosses.iterateNext(); var medal='';
		var aBoss=new Array(); var b_id;
	while(boss){
		b_id=parseInt(boss.getAttribute('id'));
		if(b_id==11) b_id=5.5; // сортировка Хирурга
		aBoss[aBoss.length]={id:b_id,cnt:parseInt(boss.textContent),real_id:parseInt(boss.getAttribute('id'))}
		boss=bosses.iterateNext();
	}
		aBoss.sort(sIncrease); var isGroupB1=false; var isGroupB2=false;
		for(var i=0;i<aBoss.length;i++){
			if(aBoss[i].real_id>=1 && aBoss[i].real_id<=5 && !isGroupB1){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Беспредельщики</b></div>'; isGroupB1=true;
			}
			if(aBoss[i].real_id>=6 && aBoss[i].real_id<=10 && !isGroupB2){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Вертухаи</b></div>'; isGroupB2=true;
			}
			medal=printMedal(aBoss[i].cnt);
			html+=printRow(bossNames[aBoss[i].real_id-1],medal+''+aBoss[i].cnt);
		}
	
	html+=printTitle('Таланты','<a href="javascript:void(0)" id="am_prison_talent_detail_link" class="fl_r" style="color:#A3B0BC;font-size:10px;padding:0 2px 0 6px;background:#fff">Показать подробности</a>'); html+='<br />';
	var playerTalents = xmlDoc.evaluate('//talent',xmlDoc,nsResolver,XPathResult.ANY_TYPE, null);
	var talent=playerTalents.iterateNext();
	sumtalents=0; var talent_id; var talent_detail=[];
	while(talent){
		cnt=parseInt(talent.textContent);
		talent_id=parseInt(talent.getAttribute('id'));
		sumtalents+=cnt;
			talent_detail[talent_detail.length]={id:talent_id,value:cnt}
		talent=playerTalents.iterateNext();
	}
	html+=printRow('<b>Всего вложено:</b>','<b>'+sumtalents+'</b>');
	html+='<div id="am_prison_talent_detail" style="display:none">';
		talent_detail.sort(sIncrease);
			var isGroup1=false; var isGroup2=false; var isGroup3=false; var isGroup4=false;
		for(var i=0;i<talent_detail.length;i++){
			if(talent_detail[i].id>=1 && talent_detail[i].id<=7 && !isGroup1){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Специализация в оружии</b></div>'; isGroup1=true;
			}
			if(talent_detail[i].id>=8 && talent_detail[i].id<=13 && !isGroup2){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Специализация в рукопашном бою</b></div>'; isGroup2=true;
			}
			if(talent_detail[i].id>=14 && talent_detail[i].id<=17 && !isGroup3){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Новый удар</b></div>'; isGroup3=true;
			}
			if(talent_detail[i].id>=18 && talent_detail[i].id<=19 && !isGroup4){
				html+='<div class="clear_fix" style="text-align:center"><b style="color:#777;font-size:10px">Супер таланты</b></div>'; isGroup4=true;
			}
			html+=getTalentDecs(talent_detail[i].id,talent_detail[i].value);
		}
	html+'</div>';
	
	
	setContent(html);
	if(href){
		hint.list[href]=html;
		hint.checkDocHeight();
	}
	document.getElementById('am_prison_talent_detail_link').addEventListener('click',showHideTalentDetail,false); 
}

// медали
function printMedal(cnt){
	var img=''; var title='';
	if(cnt>=10){title='Бронза'; img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEklEQVQ4jX2TMWtUQRDHf3v33uUusdBUB0ICmkLUJoVBJR8ghWCR2kpL0dYIWiRFPoKFwcbG1lJUsAgpIqQQQkCtkuYEEzxzefd2d3bG4iXh4p0uLLO77O+/f2ZmnZlxMtKjh8bV68j795gIlhIaI3oc84UF7MMnJj6+cydMxsAYhGwAVJFqL4KFOIj8JRAFE0G9R0UqIZHTdTZCoHZGIETMe5ieJnmPek/ynlSWuJkZtOhjIfzHQYjLbn/n+diNHq1bDcjqx+cOKUrC521SiMv/FGjc2d1Dar147d4535gipRomJU4K8v4uzdqbnrud9gYZd1IFe31zDtzbMPu07cMYWvxCyiMslpgEcHXGmo7xry86RLubP97ePJuDJEty5X7bS4tUdEmhAi0GtCyQ7k+Kgy7l1GJbD9PSUBJNZT5OXEL7hxUoASSi0WMS0NhHfu/Tl3HwaX44B2qTanUslqgELEVUKjiFYxFfkrygyU2OKKNVTSTx1PrpTMdRApY8piP6wNQOXOyBprPWxVd5iB5QEA+Rg2EHKa5n3R1clqMpnLFevZyo5S2a/gcSWB920NfVbOtVJ3cFtbwJqliq/gRm1FsTjE3kZF82Oqa11aE+AAgrMw8QVsLsYrtsXCSJYr6AWNA42iXb2uiouGfnX35bGykAUD65PKc9WSLqvJqbJIGZO1BhXRv56oW175uD9/8AUiGus3Sh3uoAAAAASUVORK5CYII=';}
	if(cnt>=50){title='Серебро'; img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB+klEQVQ4jX2SvW8aQRDF3wHRAWcaZAkkF25cRWloTEORIoW7NEmRPhJNlB4pTuEUdPQg/gNoUkZOlBBRWSglnSs3CBIKPu52dnZnU9h3OgzJSquZleb9ZvZpPOcc4mPfv3N4+gzm+hrOGDhrIcyQh/jk4gLu6w8E3754sSaH1EmLXEooxty/jYHTnJY8ArCBMwZCBDHmHmRMkucOADI7AM1wRMDpKSwRhAiWCFYpeGdnkDCC0/o/E2i+Ukp9XL56jU3pCCqbBTND1mvkf/9B5ftPlDRf/RNwe/nhzoXhpnxycpQHICKITVZK4Vc2uwlfPL97k9J4ccF0Oj03xnyuVCrV9XqNKIogIhARZDIZ+L4P3/cxGo1mRPSy2Wze7HjAzK3j4+PqarVCGIaw1sJaCxEBM2Oz2SAMQ9RqtapSqrVnIjM3nHOIogjGmKS7iCSw7XaLIAhARI09D7TWZRFJxEh5kH4/+FE+BEiK0/Fx7pwDEe3vAREtY0Pjv8fjx7nneTDGgIiWhwDjKIrg+37SNX2dcygUCpjP59Baj/cASqn2ZDKZ5fN5FIvFHQ88z0MQBMjlchgOhzOtdXtvDwCg3++/JaJP9Xq9WiqVACCZZrFYYDAYzJj5stvt9g8CAKDT6ZwTUUtr3dBal7XWYOYlM4+Zud3r9W7S9X8BtmDBraMOt34AAAAASUVORK5CYII=';}
	if(cnt>=100){title='Золото'; img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMklEQVQ4jX2SPWhTURTHf/e9l7RJm9c8KajRVvADKfhBbUVa6qIgCKIOjk6CUHBwcBCE1s1JB8EtWuju4OCqFY2iUAmopdQYHLS1MbVN0jSxL+/d45C2vNeqB85wOff/O+f871Uiwnq8uaiWtE9SNGAAaq0ggAZlgGFSGnwizrrGIhDaJzl04zFoD2YmwTSbBd+Hg/1gWGTuXUoGNSGACMjCV9xPr6i9z6DMZll8j3jhM9FDJwkMvBWgDKjns3i1MpWGRml/DaAxa2X8fBZl/AfgCws/pl922jGHcqWOUmptMiG+vEjxZx5fWAg1DZp4rkudunmUZ3uP7Seyz8GINttpV9PIl8i9zXF3mtNPv8nzwN6ykYA1m+5fqkwMi1QzIjLTzOprWZ4Yltn08TJgBTWhFYrjAyPRVE8yMXCZUvYBfq0EehUrsZOOwWtoz7WL49YIcHtdE7JEe96o3Xee6lSaiN1DrPssrV1nQBmsTD3C7ruA9rzRoCbsqQjEWwAwWx0UdQz5jWWBbvyCthY2v2NohSakitkawzAaiKwiUsSMmpgRG/TKluthgDKgWiDSnkDcLygURBWQQEXiUJ1n80cInXIF92Fl8gWWswervRMzbmPGElhtDpbTTWVyglzBHQv1DP4DpVRqNn3iY9vu1LaO3l6Ix5qFWp1yNsvK97nFXVffHRaRuX8BAI5k7vReP7A9emXDMKXIFdyxoVvZ+8CHkOYvAIAUsGOTX/PAHEBQ8wf++AMozgkH4AAAAABJRU5ErkJggg==';}
	if(img==''){
		return '';
	} else {
		return '<div style="float:left;width:1px;height:18px"></div><div style="position:absolute;left:-18px;top:1px;width:16px;height:18px;background:url('+img+') 0 0 no-repeat" title="'+title+'"></div>';
	}
}

// расчет уровня из авторитета
function printLevel(raiting){
	var level=1; isLevel=false; var start=39; var i=18; var k=0; var total=0;
	if(raiting>=start){
		k=start; total=k;
		while(!isLevel){
			if(total<=raiting){
				level++;
				k+=i;
				total+=k;
			} else {
				isLevel=true;
			}
		}
	}
	return level;
}

// показать/скрыть таланты
function showHideTalentDetail(){
	var obj=document.getElementById('am_prison_talent_detail');
	if(obj.style.display=='none'){
		obj.style.display='block';
		document.getElementById('am_prison_talent_detail_link').innerHTML='Скрыть подробности';
	} else {
		obj.style.display='none';
		document.getElementById('am_prison_talent_detail_link').innerHTML='Показать подробности';
	}
}

// сортировка массива
function sIncrease(i,ii){
	if(i.id>ii.id) return 1;
	else if(i.id<ii.id) return -1;
	else return 0;
}


// одна строка
function printRow(title,value){
	var html='<div class="clear_fix"><div class="label fl_l">'+title+'</div><div class="labeled fl_l" style="position:relative;overflow:visible">'+value+'</div></div>';
	return html;
}

// заголовок
function printTitle(text,a){
	if(!a) a='';
	var html='<h4 style="height:4px;padding-top:10px">'+a+'<b style="padding-right:6px;font-size:11px;background-color:white">'+text+'</b></h4>';
	return html;
}

// Расширенный список талантов
function getTalentDecs(id,cnt){
	var name='хз о_О'; var max='?'; var descr='';
	switch(id){
		case 1: name='Тихий убийца'; max=10; descr='Увеличивает урон атаки "Пырнуть финкой" на '+cnt; break;
		case 2: name='Хладнокровие'; max=10; descr='Дает '+cnt+'% шанс нанести дополнительные повреждения при атаке "Пырнуть финкой"'; break;
		case 3: name='Стрелок'; max=20; descr='Увеличивает урон атаки "Шмальнуть из самопала" на '+cnt; break;
		case 4: name='Меткий глаз'; max=10; descr='Дает '+cnt+'% шанс нанести дополнительные повреждения при атаке "Шмальнуть из самопала"'; break;
		case 5: name='Химик'; max=10; descr='Увеличивает урон атаки "Подкинуть яда" на '+cnt*10; break;
		case 6: name='Хладнокровие'; max=10; descr='Дает '+cnt+'% шанс нанести дополнительные повреждения при атаке "Подкинуть яда"'; break;
		case 7: name='Качок'; max=150; descr='Увеличивает показатель бицухи на '+cnt*50; break;
		case 8: name='Уличный боец'; max=2; descr='Увеличивает урон атаки "Пальцем в глаз" на '+cnt; break;
		case 9: name='Палец Кунг-фу'; max=10; descr='Уменьшает время перезарядки атаки "Пальцем в глаз" на '+cnt+' мин.'; break;
		case 10: name='Кик-боксер'; max=6; descr='Увеличивает урон атаки "Коленом в ухо" на '+cnt; break;
		case 11: name='Хорошая дыхалка'; max=10; descr='Уменьшает время перезарядки атаки "Коленом в ухо" на '+cnt+' мин.'; break;
		case 12: name='Футболист'; max=4; descr='Увеличивает урон атаки "Пыром в солнышко" на '+cnt; break;
		case 13: name='Быстрая нога'; max=10; descr='Уменьшает время перезарядки атаки "Пыром в солнышко" на '+printHour(cnt*10); break;
		case 14: name='Удар в пах'; max=1; descr='Наносит 30 урона'; break;
		case 15: name='Безбашенный'; max=5; descr='Увеличивает урон атаки "Удар в пах" на '+cnt; break;
		case 16: name='Ликвидатор'; max=15; descr='Дает '+cnt+'% шанс нанести дополнительные повреждения при атаке "Удар в пах"'; break;
		case 17: name='Лишающий радости'; max=20; descr='Уменьшает время перезарядки атаки "Удар в пах" на '+printHour(cnt*10); break;
		case 18: name='Вечный бой'; max=30; descr='Увеличивает время боя с боссом на '+printHour(cnt*2); break;
		case 19: name='Адреналин'; max=25; descr='Увеличивает максимальную энергию игрока на '+cnt; break;
	}
	
	return printRow(name,'<div style="float:left">'+cnt+'/'+max+'</div> <div style="font-size:9px;color:#999;margin-left:45px">'+descr+'</div>');
}

// время час/мин
function printHour(minute){
	var hour=Math.floor(minute/60);
	minute=minute-hour*60;
	if(hour>0){
		if(minute>0){
			return hour+' час. '+minute+' мин.';
		} else {
			return hour+' час.';
		}
	} else return minute+' мин.';
}

// название камеры
function getCellName(number){
	switch(number){
		case '0': return 'Обычная'; break;
		case '1': return 'Кирпича'; break;
		case '2': return 'Махно'; break;
		case '3': return 'Лютого'; break;
		case '4': return 'Шайбы'; break;
		case '5': return 'Палёного'; break;
		case '6': return 'Борзова'; break;
		case '7': return 'Хирурга'; break;
		case '8': return 'Борзова (авторитетная)'; break;
		default: return 'ХЗ о_О ('+number+')'; break;
	}
}

// длина бороды
function getBreadName(number){
	switch(number){
		case '0': return 'Побрит (0)'; break;
		case '1': return 'Щетина (1)'; break;
		case '2': return 'Бородка (2)'; break;
		case '3': return 'Средняя (3)'; break;
		case '4': return 'Зарос (4)'; break;
		case '5': return 'Чушкарь (5)'; break;
		default: return 'ХЗ о_О ('+number+')'; break;
	}
}

























function getText(){

}