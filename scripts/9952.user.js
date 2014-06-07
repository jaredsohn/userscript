// ==UserScript==
// @name          fanfou click reply & player
// @description   click reply on fanfou & show mp3/youtube/tudou/youku player
// @include       http://*.fanfou.com/*
// @include       http://fanfou.com/*
// ==/UserScript==
    
window.setTimeout(function () {
	var stream = document.getElementsByTagName("ol")[0];
	var list = stream.getElementsByTagName("li");
	for(var i=0;i<list.length;i++){
		var item = list[i];
		if( item.getAttribute("class").indexOf("sys") == -1) {
			var title = item.getElementsByTagName("a")[0].title;
			if (title == ''){
				title = document.title.substring(5, document.title.length);
			}
			title = '@' + title + '&nbsp;';
			var d = document.createElement('span');
			var postname = 'post_'+i;
			d.innerHTML = ' <a href="#" onclick="var r_itm1 = document.getElementById(\''+postname+'\');if(r_itm1.style.display==\'none\'){r_itm1.style.display = \'block\';var r_itm2=r_itm1.childNodes[0].getElementsByTagName(\'textarea\');r_itm2=r_itm2[0];r_itm2.focus();}else{document.getElementById(\''+postname+'\').style.display = \'none\';}return false;" style="color:red;">reply</a>';
			item.appendChild(d);
			var p = document.createElement('div');
			p.id = postname;
			p.style.display = 'none';
			p.innerHTML = '<form action=\"' + location.href + '\" method="post"><textarea name="content" style="width:300px;height:60px;">'+title+'</textarea><br><input name="action" value="msg.post" type="hidden"><input class="formbutton" value="&#21457;&#36865;" type="submit"></form>';
			item.appendChild(p);
		}
	}
}, 100);

window.setTimeout(function convert() {
	var stream = document.getElementsByTagName("ol")[0];
	var spans = stream.getElementsByTagName("span");

	var player = new Array();
	player['mp3'] = new Array(/^(.*\/([^\/]+\.mp3))$/ig, '<object height="17" width="320"><embed src="http://img339.imageshack.us/img339/1182/xspfplayerslimni0.swf?&amp;song_url=$1&amp;song_title=$2" height="17" width="320"></embed></object>', 'music');
	player['youtube1'] = new Array(/^(http:\/\/www\.youtube\.com\/v\/.+)$/ig, '<object width="425" height="350"><param name="movie" value="$1"></param><param name="wmode" value="transparent"></param><embed src="$1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object>', 'youtube');
	player['youtube2'] = new Array(/^http:\/\/www\.youtube\.com\/watch\?v=([^&]+).*$/ig, '<object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/$1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/$1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object>', 'youtube');
	player['tudou1'] = new Array(/^(http:\/\/www\.tudou\.com\/v\/.+)$/ig, '<object width="400" height="300"><param name="movie" value="$1"></param><embed src="$1" type="application/x-shockwave-flash" width="400" height="300" allowFullScreen="true" wmode="opaque"></embed></object>', '&#22303;&#35910;');
	player['tudou2'] = new Array(/^http:\/\/www\.tudou\.com\/programs\/view\/([^\/]+).*$/ig, '<object width="425" height="350"><param name="movie" value="http://www.tudou.com/v/$1"></param><param name="wmode" value="transparent"></param><embed src="http://www.tudou.com/v/$1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object>', '&#22303;&#35910;');
	player['youku1'] = new Array(/^(http:\/\/player\.youku\.com\/player\.php\/sid\/[^\/]+\/v.swf)$/ig, '<embed src="$1" quality="high" width="450" height="372" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed>', '&#20248;&#37239;');
	player['youku2'] = new Array(/^http:\/\/www\.youku\.com\/v_show\/id_(.+)\.html$/ig, '<embed src="http://player.youku.com/player.php/sid/$1/v.swf" quality="high" width="450" height="372" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></embed>', '&#20248;&#37239;');

	for(var i=0;i<spans.length;i++){
		var span = spans[i];
		if( span.getAttribute("class") == "content") {
			var hrefs = span.getElementsByTagName("a");
			for(var j=0;j<hrefs.length;j++){
				var href= hrefs[j];
				if(href.href.indexOf(".gif")>0 || href.href.indexOf(".jpg")>0) {
					href.innerHTML = "<div id='img'><img src=\"" + href.href + "\" /></div>";
				}
				for(key in player){
					if(href.href.match(player[key][0])) {
						var playername = 'player_' + i + '_' + j;
						var itmbtn = document.createElement('span');
						itmbtn.className='player_btn';
						itmbtn.style.paddingLeft='10px';
						itmbtn.innerHTML = '<a href="#" onclick="document.getElementById(\''+playername+'\').style.display = document.getElementById(\''+playername+'\').style.display==\'none\' ? \'block\' : \'none\';return false;" style="color:red;">[show '+player[key][2]+' player]</a>';
						hrefs[j].parentNode.parentNode.appendChild(itmbtn);
						var itmplayer = document.createElement('div');
						itmplayer.className='player';
						itmplayer.id=playername;
						itmplayer.style.paddingTop='5px';
						itmplayer.style.display='none';
						itmplayer.innerHTML=href.href.replace(player[key][0], player[key][1]);
						hrefs[j].parentNode.parentNode.appendChild(itmplayer);
					}
				}
			}
		}
	}
}, 300);