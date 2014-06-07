// ==UserScript==
// @name           view video in WebQQ
// @namespace      www.currygu.com
// @description    为消息中的视频地址添加可直接观看的视频
// @include        http://web.qq.com/*
// ==/UserScript==

function createVideos(url,type){
	var code = '<embed src="_URL_" type="application/x-shockwave-flash" id="movie_player" name="movie_player"	bgcolor="#FFFFFF" quality="high" allowfullscreen="true" flashvars="isShowRelatedVideo=false&showAd=0&show_pre=1&show_next=1 &isAutoPlay=false&isDebug=false&UserID=&winType=interior&playMovie=true&MMControl=false&MMout=false&RecordCode=1001,1002,1003,1004,1005,1006,2001,3001,3002,3003,3004,3005,3007,3008,9999"	pluginspage="http://www.macromedia.com/go/getflashplayer" width="480" height="400"></embed>';
	
	switch(type)	{
		case 'youku':
			url ='http://player.youku.com/player.php/sid/' + url.replace(/(http:\/\/)?v.youku.com\/v_show\/id_/i,'').replace(/\.html/,'') + '/v.swf';
		break;
		case 'tudou':
			url = 'http://www.tudou.com/v/' +  url.replace(/(http:\/\/)?www\.tudou\.com\/programs\/view\//i,'');
		break;
		case 'ku6':
			url = 'http://player.ku6.com/refer/' + url.replace(/(http:\/\/)?v\.ku6\.com\/show\//i,'').replace(/\.html/,'') + '/v.swf';
		break;
		case '56':
			url = url.match(/[\w]*(?=\.html)/i)[0];
			url = url.indexOf('_') == -1 ? ( 'v_' + url ) : url;
			url = 'http://player.56.com/' + url + '.swf';
		break;
	}
	return code.replace('_URL_',url);
}


	var webSites =[
		['youku',new RegExp(/(http:\/\/)?v.youku.com\/v_show\/id_([^\.]*)\.html/ig)],		
		['tudou',new RegExp(/(http:\/\/)?www\.tudou\.com\/programs\/view\/([\w-]*)/ig)],
		['ku6',new RegExp(/(http:\/\/)?v\.ku6\.com\/show\/([^\.]*)\.html/ig)],
		['56',new RegExp(/(http:\/\/)?www\.56\.com\/.*\/([^\.]*)\.html/ig)]
	];

function addVideos(element){	
	var contents = element.getElementsByClassName('content');
	for(var i = 0, len = contents.length; i < len ; i++)	{
		for(var j=0; j<webSites.length;j++)		{
			var urls = contents[i].innerHTML.match(webSites[j][1]);		
			if(urls){
				for(var k = 0;k < urls.length;k++){
					var newElement = document.createElement('div');
					newElement.innerHTML = createVideos(urls[k],webSites[j][0]);
					contents[i].appendChild(newElement);
				}
			}
		}
	
	}	
}


addVideos(document);
function onScroll(e){
	if((e.target.scrollHeight-e.target.getAttribute('scrollTop'))> 1.5* e.target.clientHeight)
		e.target.scrollTop = Math.min(e.target.getAttribute('scrollTop') ,e.target.scrollHeight-e.target.clientHeight);
}
function onMouseScroll(e){
	var chatBoxId = document.getElementsByClassName('activeWithDisableMagnet')[0].getAttribute('id').replace('_tf','');
	var chatBox = document.getElementById(chatBoxId + '_history');
	chatBox.setAttribute('scrollTop' ,chatBox.scrollTop + 35*e.detail);
}
document.body.addEventListener('click', function(evt) {
		if(elem = document.getElementById('Taskbar_taskbar_chat_session')){			
			if(elem.getElementsByClassName('activeWithDisableMagnet')){
				var chatBoxId = elem.getElementsByClassName('activeWithDisableMagnet')[0].getAttribute('id').replace('_tf','');
				var chatBox = document.getElementById(chatBoxId + '_history');
				chatBox.addEventListener ('scroll',onScroll, false);	
				chatBox.addEventListener('DOMMouseScroll',onMouseScroll,false);
			}
		}

	},false);
document.body.addEventListener('DOMNodeInserted', function(evt) {
		addVideos(evt.target);
		if(elem = document.getElementById('Taskbar_taskbar_chat_session')){			
			if(elem.getElementsByClassName('activeWithDisableMagnet')){
				var chatBoxId = elem.getElementsByClassName('activeWithDisableMagnet')[0].getAttribute('id').replace('_tf','');
				var parent = evt.target.parentNode;
				if(parent.getAttribute('id') == chatBoxId + '_history'){
					parent.setAttribute('scrollTop' , parent.scrollTop);
				}
			}
		}
	}, false);

