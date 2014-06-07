// ==UserScript==
// @name           li_video_hack
// @version        0.1
// @namespace      li_video_hack
// @description    li_video_hack
// @include        *
// @author         Nexis
// ==/UserScript==

/**
*	Да в коментариях маты. А нехуй читать корявый джавасрипт-код)
*/



var xmlText;
var li_video = new Array();


var FlowPlayer = document.getElementById('FlowPlayer');


if(!FlowPlayer) return;

//Находим родительский бокс, в который будем заталкивать ссылки
if( FlowPlayer ){
	var FlowPlayer_box = FlowPlayer.parentNode;
	
}

//Особая флешовая магия для выдирания ссылки на плейлист из списков флеш-переменных
if( FlowPlayer ){
	var param_flash_variables = FlowPlayer.childNodes[11]; //находим тег <param> с именем flashvars
	var flash_variables = param_flash_variables.attributes.getNamedItem('value'); //выбираем что нужен нам оттуда только аттрибут value
	
	//alert(param_flash_variables[0].attributes.getNamedItem('value').value); //эта херня чисто отладки

	//есть чо? тогда выдираем оттуда ссылку на плейлист
	if (flash_variables) {
		var flash_values = flash_variables.value;
		if (flash_values) {
			var id_match = flash_values.match(/id=([^(\&|$)]*)/);
			if (id_match!=null) {
				id = id_match[1];
				//alert(id);
			}
      		}
    	}
}


if( id  ) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.liveinternet.ru' + '/playlist.php?a=get_v&v=6&id=' + id,
		headers: {
			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey Nexis',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function (responseDetails){
			if(responseDetails.status == 200) //если ответ от сервера положительный, то поехали вперед)
			{
				//Отпидарасим текст, как бе под стандартный XML-ответ, тем самым наебав парсер.
				xmlText = responseDetails.responseText;
				//alert(xmlText);

				//какая-то мало-понятная ботва, вызывающая стандартный xml-парсер.
				var parser=new DOMParser();
				var xmlDoc=parser.parseFromString(xmlText,"application/xml");

				//Тут мы обращаем внимание на каждую запись о композиции.
				var videofiles = xmlDoc.getElementsByTagName('videofile');
				
				//А есть чо? Ну если есть погнали раздербанивать атрибуты тегов на переменные.
				for(var i=0;i<videofiles.length;i++) {
					var videofile = videofiles[i];
					var FLVPath = videofile.getAttribute('FLVPath');
					var caption = uni2winEsc(videofile.getAttribute('caption'));
					var pubDate = videofile.getAttribute('pubDate');
					var DescPath = videofile.getAttribute('DescPath');

					//создаем подмассив
					li_video[i] = new Array();
					li_video[i]['FLVPath'] = FLVPath;
					li_video[i]['caption'] = caption;
					li_video[i]['pubDate'] = pubDate;
					li_video[i]['DescPath'] =DescPath;

//					alert('#: '+i+'\nFLV URL: '+FLVPath+'\nTitle: '+caption+'\nPublicated Date: '+pubDate+'\nDesc: '+DescPath);
				}

				FlowPlayer_box.innerHTML=FlowPlayer_box.innerHTML+'<br>'; //хуйнём полосочку, чтобы раздельно ссылке от плеера были.

				//а теперь сунем все найденные сылке внутрь ДИВа с плеером
				for(var i=0;i<videofiles.length;i++) {
					FlowPlayer_box.innerHTML = FlowPlayer_box.innerHTML +
					"<br>Direct Link:<br><table><tr style='vertical-align:middle;'><td><a style='padding:4px; align:left;' href='"+li_video[i]['FLVPath']+"' title='"+li_video[i]['pubDate']+"\n"+li_video[i]['caption']+"'>"+"<img height=32 width=32 src="+li_video[i]['DescPath']+"></a></td><td>"+"<a style='padding:4px; align:left;' href='"+li_video[i]['FLVPath']+"' title='"+li_video[i]['pubDate']+"\n"+li_video[i]['caption']+"'>"+"<b>(DOWNLOAD)</b></td>";
					//alert(FlowPlayer_box.innerHTML);
				}
				//Да, блеять, я знаю что можно было все через 1 цикл сделать. Но работает ведь?)
			}
			else
			{	
				alert('Error: \n'+responseDetails.status+'\n'+responseDetails.responseText); //если чо косяк, оно выдаст окошко с косяком.
			}
		}
	});
};



//парочка функций, которые обеспечивают перекодировкуу с UTF-8 в нормальтный человеческий win1251
function toWin(N)
{
/*код громоздкий, но шустрый */
if(N<=127)R=N;else if(1040<=N&&N<=1103)R=N-848;else if(1026<=N&&N<=1027)R=N-898;else if(N==8218)R=130;else if(N==1107)R=131;else if(N==8222)R=132;else if(N==8230)R=133;else if(8224<=N&&N<=8225)R=N-8090;else if(N==8364)R=136;else if(N==8240)R=137;else if(N==1033)R=138;else if(N==8249)R=139;else if(N==1034)R=140;else if(N==1036)R=141;else if(N==1035)R=142;else if(N==1039)R=143;else if(N==1106)R=144;else if(8216<=N&&N<=8217)R=N-8071;else if(8220<=N&&N<=8221)R=N-8073;else if(N==8226)R=149;else if(8211<=N&&N<=8212)R=N-8061;else if(N==0)R=152;else if(N==8482)R=153;else if(N==1113)R=154;else if(N==8250)R=155;else if(N==1114)R=156;else if(N==1116)R=157;else if(N==1115)R=158;else if(N==1119)R=159;else if(N==160)R=160;else if(N==1038)R=161;else if(N==1118)R=162;else if(N==1032)R=163;else if(N==164)R=164;else if(N==1168)R=165;else if(166<=N&&N<=167)R=N;else if(N==1025)R=168;else if(N==169)R=169;else if(N==1028)R=170;else if(171<=N&&N<=174)R=N;else if(N==1031)R=175;else if(176<=N&&N<=177)R=N;else if(N==1030)R=178;else if(N==1110)R=179;else if(N==1169)R=180;else if(181<=N&&N<=183)R=N;else if(N==1105)R=184;else if(N==8470)R=185;else if(N==1108)R=186;else if(N==187)R=187;else if(N==1112)R=188;else if(N==1029)R=189;else if(N==1109)R=190;else if(N==1111)R=191;
else R=63;//символ вопроса - '?'
return R;
}

function uni2winEsc(s)
{
var res='';
for(var i=0;i<s.length;i++)
res+="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.!~*'()#".indexOf( s.charAt(i) )>= 0 ? s.charAt(i) : "%"+toWin(s.charCodeAt(i)).toString(16).toUpperCase();
res=decodeURIComponent(res);
return res;
} 