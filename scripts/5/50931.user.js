// ==UserScript==
// @name          xDwn wrzuta.pl, youtube.com etc.
// @author        xadi
// @description   This is greasemonkey script which will add a link to downloading files stored on youtube or wrzuta.pl. This is very simple and fast in use. It also lets copying links for sharing with friends. There is not redirecting to other sites so this is the fastest method for downloading which is possible.
// @include       http://*
// @include       https://*
// @source        http://userscripts.org/scripts/show/50931
// @author        http://userscripts.org/users/91308
// ==/UserScript==
source=/https?:\/\/(www\.)?(.*\.)*([a-z]+)\.[a-z]+/.exec(document.location)[3];
var script='';
d=new Date();
try
{
	var oldfor=d.getTime()-GM_getValue('_xDwnlastupdate',d.getTime());
	oldfor=oldfor/1000;
	if (oldfor>24*60*60 || oldfor==0) /*if script is older than 1day, update it*/
			GM_xmlhttpRequest(
				{
				method: 'get',
				headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Referer':location.href},
				url: 'http://tnij.org/djjh',
					onload:	
						function(a) 
						{
						GM_setValue('_xDwnlastupdate',d.getTime().toString());
						GM_setValue('_xDwn',script=a.responseText);
						eval(script);
						}
				}
			);
	else eval(GM_getValue('_xDwn',''));
}
catch (e)
{
	var source=/https?:\/\/(www\.)?(.*\.)*([a-z]+)\.[a-z]+/.exec(document.location)[3];
	var link=function(url) {
		var cont;
		if (!document.getElementById('xDwn'))
		{
			cont=document.createElement('div');
			cont.id='xDwn';
			cont.style.display = 'block';
			cont.style.position = 'fixed';
			cont.style.width='67px';
			cont.style.left = '10px';
			cont.style.top = '10px';
			cont.style.opacity=0.6;
			document.body.appendChild(cont);
			var updatelink = document.createElement('a');
			updatelink.href='http://tnij.org/xdwn';
			updatelink.innerHTML='Script is not working? click here';
			cont.appendChild(updatelink);
			cont.appendChild(document.createElement('br'));
		} else {cont=document.getElementById('xDwn');}

		var element = document.createElement('a');
		element.href = url;
		element.innerHTML = '<textarea onmouseover=this.select() style=color:white;background:url(http://www.iconspedia.com/dload.php?up_id=11538);width:60px;height:60px;overflow-x:hidden;overflow-y:hidden>'+url+'</textarea>';
		
		cont.appendChild(element);
		cont.appendChild(document.createElement('br'));
	};
	var youtube=function() {
			var getval=function(obj,val)
				{var a=new RegExp('(^|[&?])'+val+'=(.+?)&|$','i');
					a=a.exec(obj.getAttribute('flashvars'));
					return a[2];};
				var video_id=getval(document.getElementById('movie_player'),'video_id');
				video_id=document.getElementById('movie_player').getAttribute('flashvars').match(/rec_v=(.+?)&|$/i)[1];
				
				var t=getval(document.getElementById('movie_player'),'t');
				new link('http://youtube.com/get_video?video_id='+video_id+'&t='+t+'&el=detailpage&ps=&fmt=34');
	};
	var wrzuta=function() {
				var txt=document.getElementById('wrzuta_plik').lastChild.value;
				/*alert(txt);*/
				login=txt.match(/login=(.+?)&|$/i)[1];
				domain=txt.match(/site=(.+?)&|$/i)[1];
				key=txt.match(/key=(.+?)&|$/i)[1];
				new link('http://'+login+'.'+domain+'/sr/f/'+key);
	};
	eval('var obj=new '+source+'()');
};
