var MetaTags = <><![CDATA[
// ==UserScript==
// @name	Vbox7 Downloader
// @namespace   http://userscripts.org/scripts/show/52042
// @description Download videos directly from vbox7.com
// @include	http://*vbox7.com/play:*
// @version	1.2
// @copyright	F1r3Fl3x <f1r3fl3x@gmail.com>
// @author	F1r3fl3x a.k.a. Pockata
// @homepage 	http://pockata.no-ip.org
// ==/UserScript==
]]></>.toString();

	function translate(string){
	
		var charTable = {
		  'A': '\u0410',                       'a': '\u0430',
		  'B': '\u0411',                       'b': '\u0431',
		  'V': '\u0412',                       'v': '\u0432',
		  'G': '\u0413',                       'g': '\u0433',
		  'D': '\u0414',                       'd': '\u0434',
		  'E': '\u0415',                       'e': '\u0435',
		  'Yo': '\u0401',                      'yo': '\u0451',
		  'Zz': '\u0416',                      'zh': '\u0436',
		  'Z': '\u0417',                       'z': '\u0437',
		  'I': '\u0418',                       'i': '\u0438',
		  'J': '\u0419',                       'j': '\u0439',
		  'K': '\u041A',                       'k': '\u043A',
		  'L': '\u041B',                       'l': '\u043B',
		  'M': '\u041C',                       'm': '\u043C',
		  'N': '\u041D',                       'n': '\u043D',
		  'O': '\u041E',                       'o': '\u043E',
		  'P': '\u041F',                       'p': '\u043F',
		  'R': '\u0420',                       'r': '\u0440',
		  'S': '\u0421',                       's': '\u0441',
		  'T': '\u0422',                       't': '\u0442',
		  'U': '\u0423',                       'u': '\u0443',
		  'F': '\u0424',                       'f': '\u0444',
		  'X': '\u0425', 'H': '\u0425',        'x': '\u0445', 'h': '\u0445',
		  'C': '\u0426', 'Ts': '\u0426',       'c': '\u0446', 'ts': '\u0446',
		  'Ch': '\u0427',                      'ch': '\u0447',
		  'Sh': '\u0428',                      'sh': '\u0448',
		  'w': '\u0429',                       'w': '\u0449',
		  '""': '\u042A',                      "''": '\u044A',
		  'Y': '\u042B',                       'y': '\u044B',
		  '"': '\u042C',                       "'": '\u044C',
		  'Je': '\u042D',                      'je': '\u044D',
		  'Ju': '\u042E', 'Yu': '\u042E',      'ju': '\u044E', 'yu': '\u044E',
		  'Ja': '\u042F', 'Ya': '\u042F',      'ja': '\u044F', 'ya': '\u044F'
		};
		
		var newString = "";
		
		for(var i=0;i<string.length;i++){
			
			
			if(string[i] == " " || string[i] == "" || string[i] == null){
			
				newString += string[i];
			}else{
			
				var nextChar = (i == (string.length-1))?'':string[parseInt(i+1)].toLowerCase();
				var text = charTable[string[i]+nextChar];
				if(text){
				
					newString += text;
					i++;
				}else{
					
					text = charTable[string[i]];
					if(text){
					
						newString += text;
					}
					
				}
			}
		}
		
		return newString;
	}	

	function checkUpdate(){

		var time = new Date().getTime();
		if (GM_getValue('updated', 0) == 0){ 
			GM_setValue('updated', ""+time+"");
		}
		
		var lastUpdate = GM_getValue('updated', 0);
		var diff = (time-lastUpdate)/(1000*60*60);
		
		if(diff >= 24){
		
			GM_xmlhttpRequest({
				
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/52042.meta.js',
				headers: {},
				onload: function(responseDetails) {
					var latestVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(responseDetails.responseText)[1].replace(/\./g, '');
					var currentVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(MetaTags)[1].replace(/\./g, '');
					if(currentVersion < latestVersion){
						var updateBox = document.createElement('span');
						updateBox.id = 'vb7dl_updateBox';
						updateBox.innerHTML = '<span style="text-decoration:blink;color:red;">'+translate('Nova')+'</span> '+translate('versija na')+' Vbox7 Downloader! <a href="http://userscripts.org/scripts/show/52042" style="text-decoration:none;color:red;">'+translate('Svali ot tuk')+'</a><a style="position:fixed;right:0;margin-right:5px;text-decoration:none;color:black;" href="javascript:void(0);" onClick="javascript:document.getElementById(\'vb7dl_updateBox\').style.display=\'none\';">[X]</a>';
						updateBox.setAttribute('style', 'position:fixed;z-index:1100;bottom:0;right:0;background-color: #C8FFCA;border: 1px solid #349534;color: #008000;width:422px;height:19px;padding-top:3px;padding-left:8px;font-weight:bold;font-size: 11px;');
						document.body.appendChild(updateBox);
					}else{
					
						GM_setValue('updated', ""+time+"");
					}
				}
			});	
			
			
		}
	}

	function hideStatusBox(num){
	
		var sb = document.getElementById('vb7dl_statusBox');
		sb.style.bottom = -(parseInt(num))+'%';
		if(num >= 10){
			return;
		}
		window.setTimeout('hideStatusBox('+(parseInt(num)+1)+')',90);
	}
	
	var statusBox = document.createElement('span');
	statusBox.id = 'vb7dl_statusBox';
	statusBox.setAttribute('style', 'position:fixed;z-index:1100;bottom:0;background-color: #C8FFCA;border: 1px solid #349534;color: #008000;width:422px;height:19px;padding-top:3px;padding-left:8px;font-weight:bold;font-size: 11px;');
	statusBox.innerHTML = 'box :P <a href="javascript:hideStatusBox(0);">Hide</a>';
	document.body.appendChild(statusBox);
	//masiv sus survurite (survur 01 ne su6testvuva ve4e)
	var medias = new Array("", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17");
	//vzimame id na videoto ot url
	var videoId = /play:(.*)/i.exec(window.location);
	if(videoId[1].search(/&/) != -1){
		videoId[1] = videoId[1].split("&")[0];
	}

	//vzimame purvite dva simvola ot id-to na videoto
	var videoStart = videoId[1].substr(0,2);
	//suzdavame celiq link na videoto
	var videoUrl = "s/"+videoStart+"/"+videoId[1]+".flv";
	//izpolzvame reda na koito e zaglavieto na videoto za da pokajem butona za svalqne
	var videoTitle = document.getElementsByClassName("title titlenew")[0];
	//base64 kodiran buton za svalqne
	var DLImage = 'data:image/gif;base64,R0lGODlhMgAyAPf/AHCjSvX486HUgJnTdYvKY4qzbLzSsabJjavJm1SKK4a3ZGKmMnW0Stnm0pm8'
				+'iObv4ni8S6DXfbbjmk2CJJbGdkh/Hfb59Hy6WpXVbXmqVn25U2+vQsbZvYOpZX2eY7LMpXysWs7e'
				+'xb3ko1WUJmytPpzVeYm6b3OxVIjBYfn999Puw0lwJ+zz6X6yZKTZgnGuUoataYClY5nHe4GzXpW7'
				+'eJ/AjvD17cPnrNDgyHmcXH7CUi9TDaTDlPr8+d7p2HKyRl+VN2qsSX2gYXKlTXi3V9nuzeb13Hyi'
				+'XeHq253RfC1QCoDCVpPJb5rPd5bMc2apN6Xbg4LEWW6pULDfk5K4dv3+/WqwOmmrO3etWzxrFX2+'
				+'VrnRrejw5I2pdnebWZbScoy9cpDMbW6zS4bCXYXDY9vxzXm8U7TRpXGzQoqubm6yQI61cY7LZ0qB'
				+'H+rx5rDhkoSybnK2TXSZVq7Ol5TPbMDVtq7KoX22X/P67kBwGGygRtXjzWabP2CkL0ZtJV6jLfP3'
				+'8bfRquny4uPs3rPjl7LhlYPBX7XOqanFmn2wWZXPc+335+j24GesNm6TUE+FJq/fka3ej6fchZzR'
				+'e1eOLnu+VXS6RXGWU12iK////12iLLzoor7ppLrmn3m3Tld8N4C8V7jlnYS/XIzEZrPhl4/Haq7d'
				+'kKvbjKfYiKTWhGSnNPj69/z9/Pn7+Pb88/7+/v7//qvZjl6jLtfk0GqsPEd6Hs7hwF+kL+vz5Z/G'
				+'hu/07K/fkpKue5rAf7/QscnbwMzdw9bkz7XkmbflnI22eXqxXn+vXVyhK1mRMKPWgnaoUYnKYKfE'
				+'l6TKj7njn5TCfKDUftzn1ZC5fazSlq7XmM/fxn+7VXu/T5HCcO746P///pDLa5DPaMXYu8PdtIa4'
				+'bKjaiJnJf9Dsv8rcwXG2QrfinVGHKLnfo5POcKHZf4jCZ63ZksXgtcjgu8nrtHe5U5XQb8/rvXix'
				+'WnS5T5HTaOXt4JfZbpC2dOLu2oq7aIK+WX++XKjdhmyQTvz9+////yH5BAEAAP8ALAAAAAAyADIA'
				+'AAj/AP8JHChozoGDCBMqXMhw4RxBAyMSVGAsHzYZGDNq3Mixo0Zs+YwpwCdR4BxjFDipXMmypcuX'
				+'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';

	//suzdavame funkciq za otkrivane na survura na klip4eto
	function validateVboxVideoPath(mediaNum){	
		
		var sBox = document.getElementById('vb7dl_statusBox');
		sBox.innerHTML = translate('Testvame s\'rv\'r')+' media'+medias[mediaNum];
		//suzdavame celiq link kum videoto 
		var mediaUrl = 'http://media'+medias[mediaNum]+'.vbox7.com/'+videoUrl;
		//proverqvame dali e na tozi survur
		GM_xmlhttpRequest({
			
			method: 'GET',
			url: 'http://urlcheck.appspot.com/?url='+encodeURIComponent(mediaUrl),
			headers: {},
			onload: function(responseDetails) {
				
				eval('json='+responseDetails.responseText+';');
                var status = json.requests[json.requests.length-1].status;

				if(status == 200){
					sBox.innerHTML = translate('Namerih go')+'!';
					//celiq kod za butona za svalqne
					var showButton = "<a href='"+mediaUrl+"' target='_blank' style='text-decoration:none;color:#002183;'>"
					+"<img src='"+DLImage+"'" 
					+" width='25' height='25' border='0' alt='woo'></a>";
					
					//suzdavane na konteiner v koito 6te se namira butona
					var newElement = document.createElement('span');
					newElement.id = 'newElement';
					newElement.style.position = 'absolute';
					newElement.style.marginTop = '-4px';
					newElement.style.marginLeft = '10px';
					/*
					newElement.style.marginLeft = '890px';
					*/
					newElement.innerHTML = showButton;
					//postavqme konteinera za butona v kraq na reda na koito e zaglavieto na videoto
					videoTitle.parentNode.insertBefore(newElement, videoTitle.nextSibling);
					window.setTimeout("hideStatusBox(0)", 5000);
				}else{
					
					//ako ne e namereno klip4eto prodyljava sus sledva6tiqt survur
					var newNum = mediaNum+1;
					validateVboxVideoPath(newNum);
				}
			}
		});	
	}
	
	function embedFunction(s) {
	
		var script = document.createElement('script');
		script.innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
		document.body.appendChild(script);
	}

	//podkarvame funkciqta za otkrivame na survura na klip4eto
	validateVboxVideoPath(0);
	checkUpdate();
	embedFunction(hideStatusBox);
	//radvame se :D