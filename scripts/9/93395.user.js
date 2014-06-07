// ==UserScript==
// @name           AnonSphere DivX Downloader
// @namespace      AnonSphere
// @version        V110219
// @include        http://duckload.com/play/*
// @include        http://www.duckload.com/play/*
// @include        http://filebase.to/files/*
// @include        http://www.filebase.to/files/*
// @include        http://tubeload.to/file-*
// @include        http://www.tubeload.to/file-*
// @include        http://fullshare.net/*
// @include        http://www.fullshare.net/*
// @include        http://sharehoster.com/*
// @include        http://www.sharehoster.com/*
// @include        http://speedload.to/FILE*
// @include        http://www.speedload.to/FILE*
// @include        http://archiv.to/view/*
// @include        http://www.archiv.to/view/*
// @include        http://dataup.to/*
// @include        http://www.dataup.to/*
// @include        http://quickload.to/*
// @include        http://www.quickload.to/*
// @include        http://freeload.to/*
// @include        http://www.freeload.to/*
// @include        http://loaded.it/show/*
// @include        http://www.loaded.it/show/*
// @include        http://mystream.to/*
// @include        http://www.mystream.to/*
// @include        http://skyload.net/*
// @include        http://www.skyload.net/*
// @include        http://filestage.to/*
// @include        http://www.filestage.to/*
// @include        http://videostage.net/video/*
// @include        http://www.videostage.net/video/*
// @include        http://xstream4u.com/video/*
// @include        http://www.xstream4u.com/video/*
// @include        http://embed.movshare.net/*
// @include        http://xvidstage.com/*
// @include        http://www.xvidstage.com/*
// @include        http://sharefiles4u.com/*
// @include        http://www.sharefiles4u.com/*
// @include        http://videostream4u.net/*
// @include        http://www.videostream4u.net/*
// @include        http://bitload.com/*
// @include        http://www.bitload.com/*
// @include        http://rapidvideo.com/*
// @include        http://www.rapidvideo.com/*
// @include        http://ebase.to/*
// @include        http://www.ebase.to/*
// @include        http://megapornstream.eu/*
// @include        http://www.megapornstream.eu/*
// ==/UserScript==
var as_download		= true; // Direct download, switch to false or comment out to add a link
var as_use_iframe	= false; // Not recommended so far

/*----- Do not edit below this line -----*/
var as_iframe		= false;
var as_show_iframe	= false;
var as_interval		= false;
var window		= unsafeWindow || window; // GM/Chrome/Opera

processAnonSphereLink=function(url)
{
	if(as_interval!=false) window.clearInterval(as_interval);

	if(typeof as_download == "undefined" || as_download == false)
	{
		var mdiv=document.createElement('a');
		mdiv.setAttribute('href',url);
		mdiv.setAttribute('id','AnonSphere_Link');
		mdiv.setAttribute('style','background:#000;color:#fff;font-family:Georgia,serif;font-size:15px;text-align:center;width:100%;height:22px;line-height:22px;position:fixed;bottom:0;margin:0;letter-spacing:1px;left:0;z-index:99999999;display:block;opacity:.8;text-decoration:none;font-weight:bold;');
		var mtext=document.createTextNode("Click here to download the movie | Klick hier, um den Film herunter zu laden");
		mdiv.appendChild(mtext);

		document.body.appendChild(mdiv);
	}
	else
		window.location.href=url;


}

showAnonSphereMessage=function(timeout)
{
	var mdiv=document.createElement('div');
	mdiv.setAttribute('id','AnonSphere_Assistant');
	mdiv.setAttribute('style','background:#000;color:#fff;font-size:36px;text-align:center;width:450px;height:100px;line-height:50px;border-radius:20px;-moz-border-radius:20px;-webkit-border-radius:20px;position:fixed;top:50%;margin:-50px 0 0 -225px;left:50%;z-index:99999999;background-clip: border-box;opacity:.5;-moz-opacity:.5');
	var mtext=document.createTextNode("AnonSphere Downloader Please wait!");
	mdiv.appendChild(mtext);

	document.body.appendChild(mdiv);

	if(typeof timeout!="undefined")
	{
		window.setTimeout(function(){
			document.body.removeChild(document.getElementById("AnonSphere_Assistant"));
		},timeout*1000);
	}
}

showAnonSphereIframe=function(url)
{
	if(as_iframe==false)
	{
		as_iframe=document.createElement('iframe');
		as_iframe.setAttribute('id','as_iframe');
		as_iframe.setAttribute('style','width:100%;height:400px;');
		if(as_show_iframe==false)
			as_iframe.setAttribute('style','position:absolute;top:-1000px;');
		document.body.appendChild(as_iframe);
	}
	as_iframe.setAttribute('src',url);
	return false;
}

switch(document.domain.replace(/www\./,''))
{
	case "duckload.com":
		as_interval=window.setInterval(function(){
			if(document.getElementsByClassName('slowbutton').length>0)
			{
				showAnonSphereMessage();
				var button = document.getElementsByClassName('slowbutton')[0];
				var hidden=document.createElement('input');
				hidden.setAttribute('type','hidden');
				hidden.setAttribute('name',button.name);
				hidden.setAttribute('value','Kostenloser Stream');

				button.parentNode.insertBefore(hidden,button.nextSibling);
				document.getElementsByTagName('form')[1].submit();
			}
			else if(document.getElementsByTagName('embed')[0]!=null)
			{
				processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
			}
		},1000);
		break;
	case "filebase.to":
		if(document.getElementsByTagName('form')[0]!=null)
			document.getElementsByTagName('form')[0].submit();
		else if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		break;
	case "fullshare.net":
		if(window.location.href!=window.location.href.replace("show", "deliver"))
			window.location.href=window.location.href.replace("show", "deliver");
		else if(document.getElementsByTagName('a')[4].href!=null)
			processAnonSphereLink(document.getElementsByTagName('a')[4].href);
		break;
	case "loaded.it":
		if(document.getElementById('wait')!=null)
			document.getElementsByTagName('form')[0].submit();
		else if(document.getElementsByTagName('input')[3]!=null)
			processAnonSphereLink("http://"+document.getElementsByTagName('input')[2].value+"/get/"+document.getElementsByTagName('input')[1].value+"/"+document.getElementsByTagName('input')[3].value);
		else
		{
			as_interval=window.setInterval(function(){
				if(document.getElementsByTagName('param')[5]!=null)
					processAnonSphereLink(document.getElementsByTagName('param')[5].value.split('url')[2].split('"')[2])
			}, 1000);
		}
		break;
	case "sharehoster.com":
		if(document.getElementById("prepare")!=null)
			document.getElementById("prepare").submit();
		else
		{
			as_interval=window.setInterval(function(){
				if(document.getElementsByTagName('param')[0]!=null)
				{
					xmlhttp = new XMLHttpRequest();
					xmlhttp.open("GET", document.getElementsByTagName('param')[0].value.substr(7),true);
					xmlhttp.onreadystatechange=function() {
						if (xmlhttp.readyState==4)
							processAnonSphereLink(xmlhttp.responseText.split('Stream: ')[1].split("\n")[0]);
					}
					xmlhttp.send();


				}
				else if(document.getElementsByTagName('input')[7]!=null)
					processAnonSphereLink(document.getElementsByTagName('input')[7].value);
			}, 1000);
		}
		break;
	case "dataup.to":
		if(document.getElementById('submitter')!=null)
		{
			var form=document.getElementsByTagName('form')[0];
			var hidden=document.createElement('input');
			hidden.setAttribute('type','hidden');
			hidden.setAttribute('name','submitter');
			hidden.setAttribute('value','1');

			form.appendChild(hidden);
			form.submit();
		}
		else if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		break;
	case "speedload.to":
	case "quickload.to":
	case "freeload.to":
		if(document.getElementsByTagName('embed')[0]!=null && typeof unescape(document.getElementsByTagName('embed')[0].src).split("file=")[1] != "undefined")
			processAnonSphereLink(window.location.href=unescape(document.getElementsByTagName('embed')[0].src).split("file=")[1].split("&plugins=")[0]);
		else if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		break;
	case "archiv.to":
		if(document.getElementsByTagName('embed')[1]!=null && document.getElementsByTagName('embed')[1].getAttribute("flashvars") != null)
			alert(document.getElementsByTagName('embed')[1].getAttribute("flashvars").split("file=")[1].split("&provider=")[0]);
		else if(document.getElementsByTagName('embed')[1]!=null)
			processAnonSphereLink(document.getElementsByTagName('embed')[1].src);
		break;
	case "tubeload.to":
		as_interval=window.setInterval(function(){
			if(document.getElementById("divx_np")!=null)
				processAnonSphereLink(document.getElementById("divx_np").src);
			else if(document.getElementsByTagName('embed')[0]!=null)
				processAnonSphereLink(document.getElementsByTagName('embed')[0].getAttribute("flashvars").substr(5));
		}, 1000);
		break;
	case "sharefiles4u.com":
	case "xvidstage.com":
	case "embed.movshare.net":
	case "sharefiles4u.com":
	case "loombo.com":
	case "ebase.to":
		as_interval=window.setInterval(function(){
			if(document.getElementsByTagName('embed')[0]!=null)
				processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		}, 1000);
		break;
	case "skyload.net":
		if(typeof window.targetURL != "undefined")
			window.location.href=window.targetURL;

		as_interval=window.setInterval(function(){
			if(document.getElementsByTagName('embed')[0]!=null && document.getElementsByTagName('embed')[0].getAttribute("flashvars")!=null)
				processAnonSphereLink(document.getElementsByTagName('embed')[0].getAttribute("flashvars").substr(5));
			else if(document.getElementsByTagName('embed')[0]!=null)
				processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		}, 1000);
		break;
	case "filestage.to":
		as_interval=window.setInterval(function(){
			if(document.getElementsByTagName('embed')[0]!=null)
			{
				if(document.getElementsByTagName('embed')[0].getAttribute("flashvars").split("&")[2].substr(5,17)!="http://localhost/")
					processAnonSphereLink(document.getElementsByTagName('embed')[0].getAttribute("flashvars").split("&")[2].substr(5));
			}
		}, 1000);
		break;
	case "videostage.net":
		if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink("http://videostage.net/flvideo/"+window.location.href.split('/')[4]+".flv");
		break;
	case "rapidvideo.com":
		if(document.getElementsByTagName('iframe')[0]!=null)
			window.location.href='http://rapidvideo.com/system/f_embed.php?code='+window.location.href.split('/')[4];
		else if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink(document.getElementsByTagName('embed')[0].src);
		break;
	case "xstream4u.com":
	case "videostream4u.net":
		if(document.getElementsByTagName('embed')[0]!=null)
			processAnonSphereLink("http://"+document.domain+"/media/videos/flv/"+window.location.href.split('/')[4]+".flv");
		break;
	case "megapornstream.eu":
		if(document.getElementsByTagName('form')[0]!=null && document.getElementsByTagName('input')[0].value == 'download1')
		{
			showAnonSphereMessage();
			var form = document.getElementsByTagName('form')[0];
			var hidden=document.createElement('input');
			hidden.setAttribute('type','hidden');
			hidden.setAttribute('name','method_free');
			hidden.setAttribute('value','Kostenloser Download');

			form.appendChild(hidden);
			form.submit();
		}
		else
		{
			as_interval=window.setInterval(function(){
				if(document.getElementById("np_vid")!=null)
					processAnonSphereLink(document.getElementById("np_vid").src);
			}, 1000);
		}
		break;
	default:
		if(as_use_iframe == true)
		{
			window.setInterval(function(){
				var as=document.getElementsByTagName('a');
				for(i=0;i<as.length;i++)
				{
					if(
						as[i].href.substr(0,24)=="http://speedload.to/FILE" ||
						as[i].href.substr(0,36)=="http://freeload.to/divx.php?file_id=" ||
						as[i].href.substr(0,25)=="http://archiv.to/GET/FILE" ||
						as[i].href.substr(0,30)=="http://www.filestage.to/watch/" ||
						as[i].href.substr(0,31)=="http://www.sharehoster.com/vid/" ||
						as[i].href.substr(0,17)=="http://dataup.to/" ||
						as[i].href.substr(0,24)=="http://skyload.net/File/" ||
						as[i].href.substr(0,28)=="http://www.speedload.to/FILE" ||
						as[i].href.substr(0,40)=="http://www.freeload.to/divx.php?file_id=" ||
						as[i].href.substr(0,29)=="http://www.archiv.to/GET/FILE" ||
						as[i].href.substr(0,26)=="http://filestage.to/watch/" ||
						as[i].href.substr(0,27)=="http://sharehoster.com/vid/" ||
						as[i].href.substr(0,21)=="http://www.dataup.to/" ||
						as[i].href.substr(0,28)=="http://www.skyload.net/File/" ||
						as[i].href.substr(0,28)=="http://videostage.net/video/" ||
						as[i].href.substr(0,32)=="http://www.videostage.net/video/"
					)
					{
						url=as[i].href;
						as[i].addEventListener("click",function(e){
							showAnonSphereMessage(20);
							showAnonSphereIframe(url);
							e.preventDefault();
						}, false);
					}

				}
				var as=document.getElementsByTagName('area');
				for(i=0;i<as.length;i++)
				{
					if(
						as[i].href.substr(0,24)=="http://speedload.to/FILE" ||
						as[i].href.substr(0,36)=="http://freeload.to/divx.php?file_id=" ||
						as[i].href.substr(0,25)=="http://archiv.to/GET/FILE" ||
						as[i].href.substr(0,30)=="http://www.filestage.to/watch/" ||
						as[i].href.substr(0,31)=="http://www.sharehoster.com/vid/" ||
						as[i].href.substr(0,17)=="http://dataup.to/" ||
						as[i].href.substr(0,24)=="http://skyload.net/File/" ||
						as[i].href.substr(0,28)=="http://www.speedload.to/FILE" ||
						as[i].href.substr(0,40)=="http://www.freeload.to/divx.php?file_id=" ||
						as[i].href.substr(0,29)=="http://www.archiv.to/GET/FILE" ||
						as[i].href.substr(0,26)=="http://filestage.to/watch/" ||
						as[i].href.substr(0,27)=="http://sharehoster.com/vid/" ||
						as[i].href.substr(0,21)=="http://www.dataup.to/" ||
						as[i].href.substr(0,28)=="http://www.skyload.net/File/" ||
						as[i].href.substr(0,28)=="http://videostage.net/video/" ||
						as[i].href.substr(0,32)=="http://www.videostage.net/video/"
					)
					{
						url=as[i].href;
						as[i].addEventListener("click",function(e){
							showAnonSphereMessage(20);
							showAnonSphereIframe(url);
							e.preventDefault();
						}, false);
					}

				}
			},1000);
		}
		break;
	case "bitload.com":
		if(document.getElementById('c')!=null)
			window.location.href=window.location.href+'?c=free';
		else
		{
			as_interval=window.setInterval(function(){
				if(document.getElementById("divx_np")!=null)
					processAnonSphereLink(document.getElementById("divx_np").src);
			}, 1000);
		}
		break;
}