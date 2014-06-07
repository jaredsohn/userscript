// По вопросам и предложениям сюда: shaitan_mashine@mail.ru
//
// ==UserScript==
// @name          Подготавливает текст m3u плейлиста, необходимо создать файл с расширением .m3u и вставить туда текст
// @description   Этот скрипт позволит вам создать плейлисты
// @include       http://vkontakte.ru/*
// @include       http://vk.com/*
// ==/UserScript==

var PlayListControlTimer = setInterval('AddPlayListControl()',1000);
function AddPlayListControl(){
	
	if ((location.hostname.indexOf('vkontakte.ru') != -1)||(location.hostname.indexOf('vk.com') != -1))
	{
		var ol = document.getElementsByTagName('ol');
		if (ol.length>0){
			var li = document.createElement('li');
			var txt='';
			//txt += '<div class="more_div"></div>'
			txt+='<a href="javascript:void(0)" onclick="Background_Fill()">Создать плейлист <span></span></a>';
			li.innerHTML = txt;
			ol[0].appendChild(li);
			
			clearInterval(PlayListControlTimer);
		}
		else{
		}
	}
}

function Background_Fill(){
	var res='#EXTM3U';
	for (var i=0; i<document.getElementsByTagName('input').length;i++){
		var obj = document.getElementsByTagName('input')[i];
		if(obj.id.indexOf('audio')!=-1){
			res+=(res!="" ? String.fromCharCode(13,10) : "");
			res+='#EXTINF:-1,';
			var next=obj.parentNode.parentNode.getElementsByTagName('td')[1];
			if (next){
				var ars =next.getElementsByTagName('a');
				if (ars.length==1){
					res+=next.getElementsByTagName('span')[0].innerHTML+' - '+ars[0].innerHTML;};
					if (ars.length==2){
						res+=ars[0].innerHTML+' - '+ars[1].innerHTML;
					};
				}
				else{
					res+='ХЗ'
				};
				res+=String.fromCharCode(13,10)+obj.value.split(',')[0]
			}
	};
	//window.open('audio/x-mpegurl '+res,'_blank');
	//alert(res);
	//console.log(res);
	var iframe = document.createElement("iframe");
	iframe.left = iframe.top = "0px";
	iframe.height = iframe.width = "1px";
	iframe.visibility = "hidden";
	document.body.appendChild(iframe);
	iframe.src = "data:audio/x-mpegurl;"+encodeURI(res);
}
