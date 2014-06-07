// ==UserScript==
// @name           MusicPreview4shared
// @namespace      MusicPreview4shared
// @autor          Edinaruto(ecv_edimilson@hotmail.com)
// @scripts        http://userscripts.org/scripts/show/88270
// @version        0.20
// @Date           20/09/2012
// @include        *4shared.com/*
// @include        *divshare.com/download/*
// ==/UserScript==

/*	Notas da versão
>0.20:
- Correção no codigo do link direto;
*/

d=document;
shared4="http://www.4shared.com/";
function tag(i){return d.getElementsByTagName(i)}
function id(i){return d.getElementById(i)}
urls4shared="account/|audio/|mp3/|music/|file/".split("|");
for(x=0;x<urls4shared.length;x++){
	if(location.href.substr(0,(shared4+urls4shared[x]).length)==(shared4+urls4shared[x])){
		var mp3link, mp4link, ogglink, LinksDownload='Download: ';
		for(y=0;tag("script").length>y;y++){
			if(tag("script")[y].innerHTML.match("mp3Link")!=null){
				if(mp3link=tag("script")[y].innerHTML.split("flvLink =")[1]){
					mp3link=(mp3link.split(";")[0]).replace(/\'/gi,"");
					if(mp3link.length>1)LinksDownload+=" | <a href='"+mp3link+"' title='"+mp3link+"'>MP3</a> | ";
				}
				if(mp4link=tag("script")[y].innerHTML.split("mp4Link =")[1]){
					mp4link=(mp4link.split(";")[0]).replace(/\'/gi,"");
					if(mp4link.length>1)LinksDownload+=" | <a href='"+mp4link+"' title='"+mp4link+"'>MP4</a> | ";
				}
				if(ogglink=tag("script")[y].innerHTML.split("oggLink =")[1]){
					ogglink=(ogglink.split(";")[0]).replace(/\'/gi,"");
					if(ogglink.length>1)LinksDownload+=" | <a href='"+ogglink+"' title='"+ogglink+"'>OGG</a> | ";
				}
				ld=d.createElement("span");
				ld.setAttribute("style","font-size:14pt!important;");
				ld.innerHTML=LinksDownload;
				id("btnLink").parentNode.insertBefore(ld,id("btnLink"));
				
				si=setInterval(function(){if(player=id("mp3player_wrapper"))
				{
					player.style.height="24px";
					player.innerHTML='<object width="100%" height="24px" type="application/x-shockwave-flash" data="http://static.4shared.com/flash/player/5.6/player.swf"><param name="flashvars" value="autostart=false&amp;file='+escape(mp3link)+'&skin=http%3A%2F%2Fstatic.4shared.com%2Fflash%2Fplayer%2Fskins%2Fwhotube%2Fwhotube.zip"></object>'
					clearInterval(si);
				}},2000);
				
				
				break;
			}
		}
		break;
	}
}
shared4="http://search.4shared.com/";
if(location.href.substring(0,shared4.length)==shared4){
mp4MostraPlayer=true;
	for(x=0;x<tag("td").length;x++){
		if(tag("td")[x].className=="simpleThumb"){
			mp4MostraPlayer=false;
			break;
		}
	}
function addplayer(url,obj,n){
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  onload: function(response) {
 	var vwmp=false, res=unescape(response.responseText), musica, duracao, player, bitrate, limit=false;
	
	var limitePT="O limite diário de visualização deste arquivo foi excedido.";
	var limiteEN="This file has exceeded its daily preview limit.";
	if(res.indexOf(limitePT)!=-1){limit=true;}else{
	if(res.indexOf(limiteEN)!=-1){limit=true;}}

	if(musica=res.split("var flvLink = '")[1]){
		musica=musica.split("';")[0];
	}else
	if(musica=res.split("var dl = '")[1]){
		musica=musica.split("'")[0];
	}

	if(bitrate=res.split('Bit Rate:</b>')[1]){
		bitrate=bitrate.split("|")[0];
	}else
	if(bitrate=res.split('Taxa de bits:</b>')[1]){
		bitrate=bitrate.split("|")[0];
	}else{bitrate="não reportado";}
	musica2=musica.split("?sId=")[0];
	
	if(musica2.substr(musica2.length-3,musica2.length)=="mp3" || musica2.substr(musica2.length-3,musica2.length)=="wma"){
		
		if(limit==false){			
			url=escape(url);musica=escape(musica2);
			if(escape(musica2).match(escape(".mp3"))!=null){
				player='<object width="470px" height="25px" type="application/x-shockwave-flash" data="http://static.4shared.com/flash/player/player.swf"><param name="allowfullscreen" value="false"><param name="allowscriptaccess" value="always"><param name="wmode" value="opaque"><param name="flashvars" value="netstreambasepath='+url+'&amp;id=mp3player&amp;autostart=false&amp;file='+musica+'&amp;image=/images/icons/misc/mp3_200x180.jpg&amp;skin=http%3A//static.4shared.com/flash/player/skins/whotube/whotube.zip&amp;wmode=opaque&amp;volume=100&amp;%2Cltas%2Crevolt-1&amp;controlbar.position=bottom"></object>';
			}else{
				player='<embed id="mp4_player'+n+'" width="1px" height="1px"></embed><input type="button" value="►" onclick="document.getElementById(\'mp4_player'+n+'\').src=\''+musica2+'\';"/><input type="button" value="■" onclick="document.getElementById(\'mp4_player'+n+'\').src=\'http://static.4shared.com/images/spacer.gif\';"/>';
			}
			if(mp4MostraPlayer==false){
				obj.innerHTML+='<br><a href="'+unescape(musica)+'">Baixar essa musica</a><br>Bit Rate: '+bitrate+'<br>';
			}else{
				obj.innerHTML+=(player+'<br><a href="'+unescape(musica)+'">Baixar essa musica</a><br>Bit Rate: '+bitrate+'<br>');
			}
			
		}else{
			obj.innerHTML+="<br>Limite de visualização diaria ultrapassada.<br>";
		}
	}
}
});

}

divs=tag("div");
for(x=0;x<divs.length;x++){
	if(divs[x].className=="fname"){
		spn=divs[x].getElementsByTagName("h1")[0];
		lnk=spn.getElementsByTagName("a")[0].href;
		addplayer(lnk,spn,x);
	}
}

}

//-------

//substitui o player do divshare, e adiciona um link de download direto;
if(location.href.match("http://www.divshare.com/download/")!=null){
	vars=location.href.split("download/")[1];
	var musica="http://storagestart2.divshare.com/launch.php?f="+vars.split("-")[0]+"&s="+vars.split("-")[1]+"&e=a";
	innerplayer=id("flash_embed").getElementsByTagName("object")[0].innerHTML.replace(/"/gi,'\\"');
	id("flash_embed").innerHTML=
	'<input style=\'height:28px;\' type=\'button\' value=\'■\' onclick=\'document.getElementById("flash_embed").getElementsByTagName("object")[0].innerHTML=\"'+innerplayer+'\";\'/>'+id("flash_embed").innerHTML
	+'<br><a href="'+musica+'">download direto da musica</a>';
}
