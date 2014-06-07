// ==UserScript==
// @name           ek$itube
// @namespace      http://userscripts.org/users/134635/scripts
// @description    ek$isozluk'te verilen video linklerini yakalayıp sayfaya gömer.
// @author         dandikos
// @version        0.5
// @include        http://sozluk.sourtimes.org/show.asp?*
// @include        http://www.eksisozluk.com/*
// @include        http://antik.eksisozluk.com/show.asp?*
// ==/UserScript==


var videoServices = {
        youtube : {
			divWidth : 480,
			divHeight : 385,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAZCAYAAAAv3j5gAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAsSgAALEoBd3p0TQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNUmK/OAAAAOUSURBVEhLvZb5T1RXFMdN/MXf/AfcNTVBbVxrYlVEUUHELeJSqoDSKHGJwYWt6lPcUCsgbqNRoyJIRGgKxV2j/KIjIlojCCIpQRIZQBMMSMR8PGeeA8o8a4aiNzmZ++a+ez/nnvO9574uXb5nA7qL7RazqTU0NNiKnzyxNTc3O59Liott9fX1zr6HZsj73Vr38hEiP2arr6tjYP8B5ObkUPlvJX179qLw/v3WcQ87az4FqaeftXWRkayIiOCY7SgTvb2dY9UvXlBwr4Cmpibn87OyZ9TV1lJTU0N5efmX+MZ/gooePMDrh4HMCAjgwP4U7Hfv8uOgwSycNx9fHx9aWloInBbA6VOnZHw/c2bO6hhIZ/n6TKRfr95UVVWRtC+RsMUhOGoc9OnRk4rnzzsPFBMVhf+UqU5PE//Yx9LQMGolVAoqfVraeaDfY+MkdNM/BzlMUFlZ2bcB/ZmdzegRI9m5bTtDvAbR2NjIzOmBLAv/jUD/af8vRyqAi3l5rUn+OzeXQwcO8rSkxPlf/u3bpJ4+wz27ncuXLnkgBjk/pKTA2nWwYiWEhsIvwTB3Loj3+PnDVD/T/KUfOAOC5kHwrxC2BFathvUb4PAReP3aBW4n77dvQSU6bHjnmDrw7p3C2oHy801AcjJkZbfZxo3u4OgYSEj4ukMFBRagtDRz4smT8M9jc9t37sAuiwX13Vu3vg7KyrIA6U5cYVstsdamZ2jsOAgPh+EjQA4svpPBBQqW/AUFmfNEkSxbDkuWtq1jc1a2dqGL32YNCpHFtY0cBS9fwqZNJkiFU10Nb97AKBk7lwGvXpnPLqc1Gm6g2FjPQCJtpO6ZO5+CVFaIkTUU8uiRuVZ8vAUoOtozkOZo1uw2kMpZc1r0EPScKWjLVgvQZrmjrHL0pdBZgS5cgJ27IOqj0zt2WIAS5ILtMEhEo/mJXCvhE+lnClDXkuvDPUfHj1uDFi0yw3PiBHIJtYlBrg7S082xcaLMoiK4cRP0Jtb8KejsWQuQ1jTXjuYvgL9yYLw3jPkZrl2X8yQhSU01S01cHEjNIzMTXA7OngNXroDWPK34utZ1meemOvVQJdxZJein0eBwuIG2O0Mg1ZkJPjB0WMeBOneSL1y9aoZVyvOn3wzd5I81uk3Jg0FFhYHdbgjYICPD4Ogxg8Qkgz17DXbvMW2v9JOSDQmdwfnzBnl5BoWFBpWVBu/f62eWWoRYVwV9AMiMAGrI9L3fAAAAAElFTkSuQmCC",
            html :	'<a target="_blank" href="http://www.savetube.com/?url=http://www.youtube.com/watch?v=__EMBED-ID__" '+
						'onmousedown="md(this)" onmouseup="ov(this)" onmouseout="bn(this)" class="but" '+
						' >'+
						"&nbsp;&nbsp;Kaydet&nbsp;&nbsp;"+
					'</a><br><font style="line-height:70%; color:#666666" >.</font>'+
					'<object width="__EMBED-W__" height="__EMBED-H__">'+
                        '<param name="movie" value="http://www.youtube-nocookie.com/v/__EMBED-ID__?fs=1&amp;border=1"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.youtube-nocookie.com/v/__EMBED-ID__?fs=1&amp;border=1" '+
                               'type="application/x-shockwave-flash" allowscriptaccess="always" '+
                               'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>',
			url :	/youtube\.com\/watch\?v=([^#&]+)/
        },
		
		dailymotion : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,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",
            html :	'<object width="__EMBED-W__" height="__EMBED-H__">'+
                        '<param name="movie" value="http://www.dailymotion.com/swf/video/__EMBED-ID__?&autoPlay=0&hideInfos=0"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.dailymotion.com/swf/video/__EMBED-ID__?&autoPlay=0&hideInfos=0" '+
                               'type="application/x-shockwave-flash" allowscriptaccess="always" '+
                               'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>',
			url :	/dailymotion\.com\/video\/([^_]+)/
        },
		
		metacafe : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAADVUlEQVRIS7WSWU8TURiG5wd47YV/QK/caKGURYmaaDQxesGFXphgWMQWsLgUKYsiUFQEjQS3oBcqxAshmGiIiQpGjDEaokaUmAiudJk5Z6Z0odvrNwOMNECkBCd505nvzHmeb85X4ZN19YpR+7qmH1Uprp81BixHiCWPVaxv/1yyZqXww7Hxonx+E3wtOfC1LlOIpTRvxu8aY48gNmT4NPh/iOTMDAjMmQ1fMwmWGP9dCyY6Dsy7n5/NhsAas6Cc27zkhEeeI9h/fd79nJoXWH0mlLMkWEou70U86EPk1zCUpk1zGJyaF1gdCZy0uIT4H57HzKXcyJvD4PWq4HQGlAYSJBm5MQcxPq4LQkMPodRnJ3A4NS+wWhKcoYUk4++y63D1Jia76Zi2J3D4KVVQbYZymgadTE5lYfLd4wSB+jBxqzSBw2syIEiV6ZBrspIKd+5CPBzSBVGfpN2HhvogV2fqLOYwk+AkCaqomESCA3d0eGB4EHLftannWARy026dxSpVwQkT5MqMxad2C2LSb13AbpRBatkPxONazd9zTmcxezoJjpHATgI7zeK2AzHXV8Q8YwtH/KnDotwNsSkXvs5aBN73a4LwyCuNpTLZcRKI5WmQj5vBKeq997oNkVkdzpnkrIJ/sBsTj67SwJ9CumKhFfqKaBi8YY/GlI6aSHAkFfxouh5WbsJ41Q4Ev7yd2jB9RX0MvK8DrLdNj6duDyLfhxGfDMJbvQPs/oWptdY8jSfZ0khQSgIbCWbniAkem1l7eeZstc8nKXNsh9p51DWKqPsbDTY6NV/6arUW+jgIiRpUeVKZKrAawctM80Zd87ZZERH/DlWFeJ37oDy5O+f0Ah9ewO3YCVaapvGkklQSHCZBCQkWCLOmYvzYFgRH3ujA+GQA3rpcBD+/1msxvwzPiW3gVoJPsySLKig2gFuo+I+4LSaw7kvTwDjEBvpr0vGEvr6H8vKBVlfabQkcqdgIwVtkACtOW1Q8RSnwtBTR8XRBvlkN+fFtuKxmuAoNEDuq4H92jzipOks8pAoKU8LsEBUXGanICE8Bicq3ar8z+0Rq1F2xC9IsjlhoiAr0UicrJMGyxJjA8eanDAjjeetXifmGXlZgDFOwTIkR86n74Ia1fwDMHn/SBU0BgAAAAABJRU5ErkJggg==",
            html :	'<embed flashVars="playerVars=showStats=no|autoPlay=no|" '+
							'src="http://www.metacafe.com/fplayer/__EMBED-ID__.swf" width="__EMBED-W__" height="__EMBED-H__" '+
							'wmode="transparent" allowFullScreen="true" allowScriptAccess="always" '+
							'pluginspage="http://www.macromedia.com/go/getflashplayer" '+
							'type="application/x-shockwave-flash" >'+
					'</embed>',
			url :	/metacafe\.com\/watch\/(.*)\//
        },
		
		alkislarlayasiyorum : {
			divWidth : 400,
			divHeight : 331,
            width : 400,
            height : 331,
			icon :	"data:image/png;base64,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",
            html :	'<iframe style="border:0px; padding: 0px; margin: 0px;" width="__EMBED-W__" height="__EMBED-H__" scrolling="no"'+
						' src="http://alkislarlayasiyorum.com/video-goster/__EMBED-ID__">'+							
					'</iframe>',
			url :	/alkislarlayasiyorum\.com\/icerik\/([^\/]+)/
        },
		
		google : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,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",
            html :	'<embed id="VideoPlayback" src="http://video.google.com/googleplayer.swf?docid=__EMBED-ID__&fs=true"'+ 
							' style="width:__EMBED-W__px;height:__EMBED-H__px"'+
							' allowfullscreen="true" allowscriptaccess="always"'+
							' type="application/x-shockwave-flash">'+
					'</embed>',					
			url :	/video\.google\.com\/videoplay\?docid=([^#&]+)/
        },
		
		facebook : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,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",
            html :	'<object width="__EMBED-W__" height="__EMBED-H__">'+
                        '<param name="movie" value="http://www.facebook.com/v/__EMBED-ID__"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.facebook.com/v/__EMBED-ID__" '+
                               'type="application/x-shockwave-flash" allowscriptaccess="always" '+
                               'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>',
			url :	/facebook\.com\/(?:.)*(?:#!\/)*video\/video\.php\?v=([^#&]+)/
        },
		
		izlesene : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAEU0lEQVRIS6VVa2gcVRTOzO7szO5ktrtrbZImNAmElpptCYk7z32l2yV9kqQtFIIaLcQolpZgI/60iFpphYBCEKRSmli1YFVaUegPa1sMamvbgFgw+IIGKmp+KNHunjOevevMbOLWBF24sHPvme879/vOOVNT8z9+MJTloGdNG6TCg7YhjqMRuEHP6/4zZPHAjiCmogZaoUO2KZ1B3X/LVjnb1ryFRvCRZRPA9rY6TCq9aEovoiFesjXffCVYtf8Ue7wqQeFAjw+6V7WDJT+KeuA46sJNW+Px3wH5gm0ErtONTrpxRuDmAgK0ap+k7D6g7H5aMjvdP0cZngcz+AxYSh4GEtESGLz2HIeGcLv8Pm9DrmmlS0LmfFIdmLfJtBk0Q+/QGsF09HXYmwjClrYG3FTfAvlWD4TQ0BTfdXDQUvpcAsroeY/AN4OGdBTTkd1oyocxE9kJSeUYWpE8qP63ISFtpewnSJJJMOQRGHlQcoAgWTvqEpjBYx5BJrbTPTAC77svdPkHwAh123pgGjVhCvJNjVQ1s6T5N7BP94EhDWNCOIn5hn5IKQ+gqahuorpw2SWAvvVR0p+VGknyS+mgmFy9AnVxiqR5CjUe2FmpJMsaA8nxJduzghOQjfVDNrqvMJwTUfP9xvY135+4+z73djUEPO2wU6bxEgla0rVF3qBtit/aunDV1v13ygSUhBV6hW51ETKxIcL52MVJRzOeTEZgvEK/IUaQqh1z91T+B9RE3ZVPlVai5n/PS4Aqx4q0UjU+676ji097BMnwQ54P4glGkIn1OpJAOtq5uHmKcU4gqb4qyydMs3fSkW0Vfp71fNja3Oq0fKk0WW1vXxsjvQuk/ZQTWNTldkyvGHSeqeIOMQIz+ALzrm99hPxkntmGMAf97RyLxSfyHGXxIztQOcDNjQ2lfdL2Gnlx3pXGEF8mA+dhIM4MpDIeZgSb60wnhoCvuz5satjgyWRKpz0f5D2Ya1ToBr+SobcgofhLgYV8cwjuD692b2CKJ8j0Wcit4aE/rkDmnjzJ9kWFn495MlnyQU8/aYxM3e9moglH5k+N8ZU+QE/LOkhFJml6TtBNqbL+lqZysprihEfQvaqTsp1joLr/M+rkHTT0zpEnt8EKnaNBOIpJmeZW4DQBzlaOaSxL+/PCsvbNUx+9WXED5XFQQy+RqUirSA20l0w8Uh7T/O+LesL5BiANyxuQvfdVMGvPUkJvsOZMxywYTHmNxirAiuWpMz/HZPiju4At+LCUG02+Arn6cWq2r0ETJyFZx7yq+ivsitcT+xn6Yr21bAJTfhj04GhRVTruCuwcFNokHrTwNirXGSq172jKniLC/ZRhiiT645+k/B3Y0rJgZC9NsquD5n1z0+JAMvYC9cP3djZ8lS1TnCVvLiwJuJwAOHqQI28+xA6OzSjWgJ3cYVT91b+9ywGtjMGNQtbu4j7FDTW9LsFGbgi7uMvFZP3apfD+Aqlh+AjsdEqKAAAAAElFTkSuQmCC",
            html :	'<object width="__EMBED-W__" height="__EMBED-H__">'+
                        '<param name="movie" value="http://www.izlesene.com/embedplayer.swf?video=__EMBED-ID__"></param>'+
                        '<param name="allowFullScreen" value="true"></param>'+
                        '<param name="allowscriptaccess" value="always"></param>'+
                        '<embed src="http://www.izlesene.com/embedplayer.swf?video=__EMBED-ID__" '+
								'wmode="window" bgcolor="#000000" menu="false" scale="noScale" '+
								'type="application/x-shockwave-flash" allowscriptaccess="always" '+
								'allowfullscreen="true" width="__EMBED-W__" height="__EMBED-H__">'+
                        '</embed>'+
                    '</object>',
			url :	/izlesene\.com\/video\/(?:.)+\/([^\/]+)\/*/
        },
		
		vimeo : {
			divWidth : 480,
			divHeight : 360,
            width : 480,
            height : 360,
			icon :	"data:image/png;base64,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",
            html :	'<iframe width="__EMBED-W__" height="__EMBED-H__" scrolling="no"'+
						' src="http://player.vimeo.com/video/__EMBED-ID__" frameborder="0">'+							
					'</iframe>',
			url :	/vimeo\.com\/([^#&]+)/
        },
    };
	

function createDiv(id, innerHTML, width, height){
	vdiv = document.createElement("div");
	vdiv.setAttribute('align', 'right');
	vdiv.setAttribute('id', 'vdiv'+id);
	vdiv.style.marginTop = "0.5em";
	vdiv.style.marginBottom = "1em";
	vdiv.style.width = width + "px";
	vdiv.style.height = height + "px";
	vdiv.style.padding = "8px";
	vdiv.style.backgroundColor = "rgba(0,0,0,.5)";	
	vdiv.innerHTML = innerHTML;
	return vdiv;
}

function createIcon(key, href){
	na = document.createElement('a');
	na.setAttribute('href', href);
	nimg = document.createElement('img');
	nimg.setAttribute('src', videoServices[key].icon);
	na.appendChild(nimg);
	return na;
}

function embedVideo(link) {
	if (link.getAttribute("status") == "open") {
		link.parentNode.removeChild(link.nextSibling);
		link.setAttribute("status", "closed");
	} 
	else {		
		for(var key in videoServices){
			if(link.href.indexOf(key) != -1){
				videoId = (link.href.match(videoServices[key].url))[1];
				if(videoId){
					//console.log("service: " + key + ", videoID: " + videoId);
					embedHtml = videoServices[key].html.replace(/__EMBED-ID__/g, videoId);
					embedHtml = embedHtml.replace(/__EMBED-W__/g, videoServices[key].width);
					embedHtml = embedHtml.replace(/__EMBED-H__/g, videoServices[key].height);
							
					vdiv = createDiv(videoId, embedHtml, videoServices[key].divWidth, videoServices[key].divHeight);
					
					link.parentNode.insertBefore(vdiv, link.nextSibling);
					link.setAttribute("status","open");
					break;
				}
			}
		}
	}
}
	
function start() {
	var links = document.evaluate("//a[@class='url']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		
		for(var key in videoServices){
		
			if(link.href.match(videoServices[key].url)){								
				imgbtn = createIcon(key, link.href);
				imgbtn.setAttribute("status", "closed");
				
				imgbtn.addEventListener("click", (function(pLink) { return function(e){ 
					if (!e.ctrlKey) {
						embedVideo(pLink); 
						e.stopPropagation();
						e.preventDefault();
						return false; 
					}
				}; })(imgbtn), true);
				
				link.parentNode.insertBefore(imgbtn,link);
				break;
			}
			
		}
		
	}
}

start();