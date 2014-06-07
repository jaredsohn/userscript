// ==UserScript==
// @name        HTML5 for MoeFM
// @version     1.0.12
// @description 萌否电台 HTML5 脚本
// @match       http://moe.fm/listen*
// @include     http://moe.fm/listen*
// @author      864907600cc
// @icon        http://nyan.moefou.org/avatar_group/00/00/000074.jpg
// @grant       none
// @updateURL	https://userscripts.org/scripts/source/295938.meta.js
// @downloadURL	https://userscripts.org/scripts/source/295938.user.js
// ==/UserScript==

// HTML5 for MoeFM
// 萌否电台 HTML5 脚本
// 适用于有 Flash 强迫症或平台不支持 Flash 的萌否电台用户 o(*￣▽￣*)ブ
// 脚本在 Chrome 32、Firefox 25、IE 11 下测试通过
// 本脚本基于 GPLv3 协议开源 http://www.gnu.org/licenses/gpl.html‎
// (c) 86497600cc. Some Rights Reserved.

var audio_pretest=document.createElement('audio');
if(audio_pretest.canPlayType('audio/mpeg')==''){
	alert('很抱歉，看起来您的浏览器不支持 MPEG (MP3) 文件……\n支持 MPEG 编码的浏览器请参考 http://caniuse.com/#feat=mpeg4');
	throw 'It seems that the browser doesn\'t support MPEG media...';
}

var user,user_panel;
if(typeof is_login!='undefined'&&is_login==true){
	user=document.getElementsByClassName('navi-panel-button')[0].innerHTML;
	user_panel=document.getElementsByClassName('navi-panel-content')[0].innerHTML;
}

var stylesheet=document.createElement('style');
stylesheet.textContent='@font-face{font-family:moefm-html5-icomoon;src:url(data:font/ttf;base64,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)}html,body{width:100%;height:100%;margin:0;padding:0;overflow:hidden}html,.cover{background-size:cover;background-position:center center;background-repeat:no-repeat no-repeat}html{background-attachment:fixed;transition:background 0.5s linear}body{background:rgba(255,255,255,0.5);user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;font-family:"Hiragino Sans GB","Microsoft Yahei","WenQuanYi Micro Hei",Arial,Tahoma,sans-serif}::selection{background:rgba(0,0,0,0.5)}::-moz-selection{background:rgba(0,0,0,0.5)}section{width:600px;height:600px;position:absolute;left:0;right:0;top:0;bottom:0;font-size:16px;margin:auto;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;text-shadow:0 0 1px rgba(50,50,50,0.75)}.cover{width:400px;height:400px;background-color:rgba(50,50,50,.75);margin:10px auto;border:solid 2px #fff;box-shadow:0 0 5px #000;-webkit-transition:0.25s width linear,0.25s height linear;-o-transition:0.25s width linear,0.25s height linear;transition:0.25s width linear,0.25s height linear;margin:20px auto 10px}.cover_preload,.background_preload{position:absolute}.info ul{list-style:none;padding:0;margin:0;text-align:center}.info ul li{padding:5px 0;user-select:text;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;line-height:1em;overflow:hidden;height:1em;white-space:nowrap;text-overflow:ellipsis;transition:0.25s all linear}.title{font-size:2em}.control{font-size:3em;text-align:center;font-family:moefm-html5-icomoon;/*pointer-events:none*/}.control>span:not([hidden]){cursor:pointer;pointer-events:auto;display:inline-block;width:1.1em;height:1.1em;line-height:1.1em;text-align:left;overflow:hidden;white-space:nowrap;padding:0 5px;letter-spacing:0.1em;transition:0.25s all linear}.control>span:hover{text-shadow:0 0 2px #000}.control>span[meow]{color:#F00}.control>span.c_volume:hover{width:3.5em}.control>span.c_volume:hover .c_volume_range{width:100px;opacity:1}.control>span.c_volume_icon{display:inline-block;width:1.1em}.c_volume_range{height:20px;width:0px;margin:0;padding:0;opacity:0;-webkit-appearance:none;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;outline:none;position:absolute;margin-left:5px;margin-top:15px;background:none}.c_volume_range::-webkit-slider-container{-webkit-appearance:none;height:2em}.c_volume_range::-webkit-slider-runnable-track{-webkit-appearance:none;background:#000;box-shadow:0 0 1px #000}.c_volume_range::-webkit-slider-thumb{-webkit-appearance:none;background:#FFF;border:1px #000 solid;border-radius:0;width:10px;height:20px}.c_volume_range::-moz-range-track{background:#000;height:20px;box-shadow:0 0 1px #000}.c_volume_range::-moz-range-thumb{background:#FFF;border-radius:0;width:10px;height:20px}.c_volume_range::-ms-track{background:#000;height:20px;box-shadow:0 0 1px #000}.c_volume_range::-ms-thumb{background:#FFF;border-radius:0;width:10px;height:20px}.c_volume_range::-ms-fill-lower{background:#000}.c_volume_range[disabled]{opacity:0.75;pointer-events:none}.timeline{position:fixed;top:0;left:0;width:100%;height:20px;font-size:12px;line-height:20px;background:rgba(0,0,0,0.5);color:#fff;z-index:100;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;box-shadow:0 0 2px rgba(0,0,0,0.5)}.timeline_current_time,.timeline_duration_time{z-index:105;position:fixed;pointer-events:none;transition:0.25s all linear}.timeline_current_time{left:5px}.timeline_duration_time{right:5px}.timeline_current,.timeline_duration{left:0px;height:20px;position:fixed;top:0;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;pointer-events:none}.timeline_duration{background:rgba(255,255,255,0.5);z-index:101}.timeline_current{background:rgba(0,0,0,0.5);z-index:102}footer{background:rgba(0,0,0,0.5);position:fixed;bottom:0;left:0;width:100%;height:20px;font-size:12px;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;color:#FFF;/*pointer-events:none;*/text-shadow:0 0 2px #000;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;box-shadow:0 0 2px rgba(0,0,0,0.5)}footer a,footer span{display:inline-block;padding:0 5px;color:#FFF;text-decoration:none;cursor:pointer;pointer-events:auto;transition:0.25s all ease-out}footer a:hover,footer span:hover{background-color:rgba(255,255,255,0.5);color:#FFF;transition:0.25s all ease-out}.link_left{position:fixed;height:20px;line-height:20px;padding-left:10px;left:0;bottom:0;transition:0.25s all linear}.link_right{position:fixed;height:20px;line-height:20px;padding-right:10px;right:0;bottom:0;transition:0.25s all linear}.link_right_user{display:inline}.link_right_user_btn>div a{display:block;height:16.66667px;line-height:16.66667px}aside{width:200px;font-size:12px;position:fixed;height:100px;right:-180px;top:50%;margin-top:-50px;/*top:0;bottom:0;left:auto;margin:auto;*/background-color:rgba(0,0,0,0.5);-webkit-transition:0.25s all ease-in;-o-transition:0.25s all ease-in;transition:0.25s all ease-in;box-shadow:0 0 2px rgba(0,0,0,0.5)}aside:hover{right:0;-webkit-transition:0.25s all ease-out;-o-transition:0.25s all ease-out;transition:0.25s all ease-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}aside ul{margin:0;padding:0;opacity:0;;-webkit-transition:0.25s all ease-in;-o-transition:0.25s all ease-in;transition:0.25s all ease-in;pointer-events:none}aside:hover ul{opacity:1;-webkit-transition:0.25s all ease-out;-o-transition:0.25s all ease-out;transition:0.25s all ease-out;pointer-events:auto}aside li{height:25px;line-height:25px;list-style:none;padding-left:24px;color:#FFF;-webkit-transition:0.25s all ease-in;-o-transition:0.25s all ease-in;transition:0.25s all ease-in;cursor:pointer;background-repeat:no-repeat no-repeat;background-position:4px center;background-image:none;margin-left:200px}aside:hover li{margin-left:0px}aside li:hover{background-color:rgba(255,255,255,0.5);transition:0.25s all ease-out;-webkit-transition:0.25s all ease-out;-o-transition:0.25s all ease-out}aside .aside_album{background-image:url(http://moe.fm/public/images/fm/fav_music_gray.png)}aside .aside_song{background-image:url(http://moe.fm/public/images/fm/fav_love_gray.png)}aside .aside_radio{background-image:url(http://moe.fm/public/images/fm/fav_star_gray.png)}aside .aside_random{background-image:url(http://moe.fm/public/images/fm/fav_magnifier_gray.png)}.share_panel,.setting_background_panel{background:rgba(255,255,255,0.5);box-shadow:0 0 0 5000px rgba(0,0,0,0.5);border-radius:2px;padding:20px;width:200px;height:100px;position:absolute;top:0;bottom:0;left:0;right:0;z-index:201;margin:auto;text-align:center;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;max-width:90%;max-height:90%}.setting_background_panel{width:600px;height:400px}.share_panel button,.setting_background_panel button{margin:6px;font-size:14px}.setting_background_panel textarea{width:100%;height:350px;background-color:rgba(255,255,255,0.5)}.share_panel_background,.setting_background_panel_background{width:100%;height:100%;position:fixed;z-index:200}.share_buttons{display:block;margin:5px}.share_buttons .share-button{opacity:0.6;-webkit-transition:0.25s opacity ease-in;-o-transition:0.25s opacity ease-in;transition:0.25s opacity ease-in;display:inline-block}.share_buttons .share-button:hover{opacity:1;-webkit-transition:0.25s opacity ease-out;-o-transition:0.25s opacity ease-out;transition:0.25s opacity ease-out;}.error_notification{position:fixed;right:10px;padding:5px;bottom:0px;box-shadow:0 0 1px 5px rgba(0,0,0,0.5);background:rgba(0,0,0,0.5);font-size:12px;color:#fff;opacity:0;-webkit-transition:0.25s all linear;-o-transition:0.25s all linear;transition:0.25s all linear;pointer-events:none}.cover_loading_notification{width:100%;height:100%;background:rgba(0,0,0,0.5);color:#FFF;opacity:0;text-shadow:0 0 2px #FFF;pointer-events:none;transition:0.25s all linear}a{color:#000}@media all and (min-width:500px) and (max-width:600px),all and (min-height:450px) and (max-height:600px){section{width:500px;height:400px;font-size:14px}.cover{width:250px;height:250px;margin:5px auto}.info ul{margin:5px 0}.c_volume_range{max-width:80px;height:20px;margin-top:8px}}@media all and (min-width:500px) and (min-height:200px) and (max-height:450px),all and (max-width:500px) and (max-height:299px){section{width:500px;height:165px;font-size:14px}.cover{width:150px;height:150px;float:left;margin:5px}.info ul{margin:1em 0}.c_volume{max-width:3em}.c_volume_range{max-width:50px;height:14px;margin-top:10px}.c_volume_range::-webkit-slider-container,.c_volume_range::-webkit-slider-runnable-track,.c_volume_range::-webkit-slider-thumb{height:1em}.c_volume_range::-moz-range-track,.c_volume_range::-moz-range-thumb{height:1em}.control>span{font-size:32px}}@media all and (max-height:200px){section{width:400px;height:105px;font-size:12px}.cover{width:100px;height:100px;margin:0;float:left}.info ul{margin:0}.info ul li{padding:4px 2px}.c_volume{max-width:3em}.c_volume_range{max-width:40px;height:14px;margin-top:5px}.c_volume_range::-webkit-slider-container,.c_volume_range::-webkit-slider-runnable-track,.c_volume_range::-webkit-slider-thumb{height:1em}.c_volume_range::-moz-range-track,.c_volume_range::-moz-range-thumb{height:1em}.control>span{font-size:24px}}@media all and (max-height:150px){.timeline,.timeline>*{top:-20px!important}footer,footer>*{bottom:-20px!important}aside{right:-200px}aside,footer,.timeline{box-shadow:none}}@media all and (max-width:500px) and (min-height:300px){section{width:300px;height:330px;font-size:12px}.cover{width:200px;height:200px;margin:5px auto}.control>span{font-size:24px}.c_volume_range{max-width:50px;height:14px;margin-top:0px}.control{font-size:1em}.c_volume_range::-webkit-slider-container,.c_volume_range::-webkit-slider-runnable-track,.c_volume_range::-webkit-slider-thumb{height:1em}.c_volume_range::-moz-range-track,.c_volume_range::-moz-range-thumb{height:1em}.link_left{-webkit-transform:translateX(-300px);transform:translateX(-300px)}}@media all and (max-width:500px) and (max-height:380px) and (min-height:300px){section{height:270px}.cover{width:150px;height:150px}.info ul li{padding:4px}}@media all and (-ms-high-contrast: active), (-ms-high-contrast: none){.c_volume_range{margin-left:-10px;box-shadow:0 0 1px #000}}';
document.head.appendChild(stylesheet);
document.body.innerHTML='<section><audio autoplay="true" class="audio"></audio><div class="cover"><img class="cover_preload" width="0" height="0" alt=""><div class="cover_loading_notification"></div></div><div class="info"><ul><li class="title">Title</li><li class="artist">Artist</li><li class="album">Album</li></ul></div><div class="control"><span class="c_play" title="播放">1</span><span class="c_pause" title="暂停" hidden="hidden">2</span><span class="c_next" title="下一曲">3</span><span class="c_like" title="喜欢">4</span><span class="c_dislike" title="抛弃">5</span><span class="c_volume" title="音量"><span class="c_volume_icon">8</span><input class="c_volume_range" type="range"></span><span class="c_share" title="分享">0</span></div><div class="timeline"><div class="timeline_duration"></div><div class="timeline_current"></div><div class="timeline_duration_time"></div><div class="timeline_current_time"></div></div></section><aside><ul><li class="aside_album">我收藏的专辑</li><li class="aside_song">我喜欢的曲目</li><li class="aside_radio">我收藏的电台</li><li class="aside_random">魔力播放</li></ul></aside><footer><div class="link_left"><a href="http://moe.fm/" target="_blank">电台首页</a><a href="http://moe.fm/listen">开始聆听</a><a href="http://moe.fm/explore" target="_blank">发现音乐</a><a href="http://moe.fm/about/client" target="_blank">客户端</a><a href="http://moefou.org/group/moefm" target="_blank">电台小组</a></div><div class="link_right"><!--<span class="link_setting">设置</span>--><span class="link_setting_background">设置背景</span><div class="link_right_user"></div></div><img class="background_preload" width="0" height="0" alt=""></footer>';

var setting=JSON.parse(localStorage.getItem('moefm-html5-setting'))||{},
	audio=document.getElementsByClassName('audio')[0],
	cover=document.getElementsByClassName('cover')[0],
	cover_preload=document.getElementsByClassName('cover_preload')[0],
	cover_loading_notification=document.getElementsByClassName('cover_loading_notification')[0],
	title=document.getElementsByClassName('title')[0],
	artist=document.getElementsByClassName('artist')[0],
	album=document.getElementsByClassName('album')[0],
	c_play=document.getElementsByClassName('c_play')[0],
	c_pause=document.getElementsByClassName('c_pause')[0],
	c_next=document.getElementsByClassName('c_next')[0],
	c_like=document.getElementsByClassName('c_like')[0],
	c_dislike=document.getElementsByClassName('c_dislike')[0],
	c_volume=document.getElementsByClassName('c_volume')[0],
	c_volume_icon=document.getElementsByClassName('c_volume_icon')[0],
	c_volume_range=document.getElementsByClassName('c_volume_range')[0],
	c_share=document.getElementsByClassName('c_share')[0],
	timeline=document.getElementsByClassName('timeline')[0],
	timeline_duration=document.getElementsByClassName('timeline_duration')[0],
	timeline_current=document.getElementsByClassName('timeline_current')[0],
	timeline_duration_time=document.getElementsByClassName('timeline_duration_time')[0],
	timeline_current_time=document.getElementsByClassName('timeline_current_time')[0],
	link_right_user=document.getElementsByClassName('link_right_user')[0],
	aside_album=document.getElementsByClassName('aside_album')[0],
	aside_song=document.getElementsByClassName('aside_song')[0],
	aside_radio=document.getElementsByClassName('aside_radio')[0],
	aside_random=document.getElementsByClassName('aside_random')[0],
	background_preload=document.getElementsByClassName('background_preload')[0],
	link_setting_background=document.getElementsByClassName('link_setting_background')[0],
	playlist=[],
	playlist_fetching=0,
	count=-1,
	volume=setting.volume||80,
	next=0,
	url_data,
	cover_retry=0,
	p=0,
	background_list=setting.background||[],
	background_count_time,
	background_count_time_value=0;

function audio_play(){
	if(count<playlist.length-1){
		count++;
		audio.src=playlist[count].url;
		update_info();
	}
	else update_playlist();
}
function update_info(){
	cover_retry=0;
	if(cover_preload.src!=playlist[count].cover.large){
		cover_loading_notification.style.opacity=1;
	}
	cover_preload.src=playlist[count].cover.large;
	if(c_like.hasAttribute('meow'))c_like.removeAttribute('meow');
	if(c_dislike.hasAttribute('meow'))c_dislike.removeAttribute('meow');
	if(location.search.indexOf('music=')>=0?location.search.split('music=')[1].split('&')[0].indexOf(playlist[count].wiki_id)<0:
		(location.search.indexOf('song=')>=0?location.search.split('song=')[1].split('&')[0].indexOf(playlist[count].sub_id)<0:
		location.search.indexOf('radio=')<0)){
			window.history.replaceState(null,'','/listen?song='+playlist[count].sub_id);
	}
	if(playlist[count].sub_title){
		title.setAttribute('title',playlist[count].sub_title);
		title.innerHTML=playlist[count].sub_title;
		document.title=playlist[count].sub_title+' | 萌否电台';
	}
	else{
		title.innerHTML='';
		document.title='收听音乐 | 萌否电台';
	}
	if(playlist[count].artist){
		artist.innerHTML=playlist[count].artist;
		artist.setAttribute('title',playlist[count].artist);
	}
	else artist.innerHTML='';
	if(playlist[count].wiki_title){
		album.innerHTML=playlist[count].wiki_title;
		album.setAttribute('title',playlist[count].wiki_title);
	}
	else album.innerHTML='';
	if(playlist[count].fav_sub){
		if(playlist[count].fav_sub.fav_type==1)c_like.setAttribute('meow','1');
		else c_dislike.setAttribute('meow','1');
	}
	if(playlist[count].fav_wiki){
		if(playlist[count].fav_wiki.fav_type==1)album.innerHTML='(♥) '+playlist[count].wiki_title||'&nbsp;';
	}
}
function update_error(t,c){
	var div=document.createElement('div');
	div.className='error_notification';
	switch(t){
		case 'audio':
			context='播放音频时发生错误<br>'+c;
		case 'log':
			context='记录播放历史失败<br>'+c;
			break;
		case 'fav':
			context='添加收藏/抛弃记录失败<br>'+c;
			break;
		case 'playlist':
			context='获取播放列表失败<br>'+c;
			break;
		case 'cover':
			context='获取专辑图片失败<br>'+c;
			break;
		case 'background':
			context='获取背景图片失败<br>'+c;
			break;
		default:
			context=c;
	}
	div.innerHTML=context;
	document.body.appendChild(div);
	div.style.opacity=1;
	div.style.bottom='30px';
	setTimeout(function(){
		div.style.opacity=0;
		div.style.bottom='0px';
		setTimeout(function(){
			div.parentElement.removeChild(div);
		},1000);
	},5000);
}
function update_log(){
	if(typeof is_login!='undefined'&&is_login==true){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(JSON.parse(xhr.responseText).status==false){
						update_error('log',JSON.parse(xhr.responseText).msg);
					}
				}
				else if(xhr.responseText){
					update_error('log',JSON.parse(xhr.responseText).response.error.message);
				}
				else{
					update_error('log','XHR Ready State: '+xhr.readyState+'<br>XHR Status: '+xhr.statusText);
				}
			}
		}
		xhr.open('GET','http://moe.fm/ajax/log?log_obj_type=sub&log_type=listen&obj_type=song&obj_id='+playlist[count].sub_id+'&_='+new Date().getTime());
		xhr.send();
	}
	else update_error('log','您尚未登录，请先登录......');
}
function update_fav(t,d){
	if(typeof is_login!='undefined'&&is_login==true){
		var xhr=new XMLHttpRequest(),
			f=new FormData();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(JSON.parse(xhr.responseText).status==false){
						update_error('fav',JSON.parse(xhr.responseText).msg);
					}
					else{
						switch(t){
							case 1:
								switch (d){
									case 1:
										c_like.removeAttribute('meow');
										playlist[count].fav_sub=null;
										break;
									case 0:
										c_like.setAttribute('meow','1');
										playlist[count].fav_sub={};
										playlist[count].fav_sub.fav_type=1;
										break;
								}
								break;
							case 2:
								switch (d){
									case 1:
										c_dislike.removeAttribute('meow');
										playlist[count].fav_sub=null;
										break;
									case 0:
										c_dislike.setAttribute('meow','1');
										playlist[count].fav_sub={};
										playlist[count].fav_sub.fav_type=2;
										break;
								}
								break;
						}
					}
				}
				else if(xhr.responseText){
					update_error('fav',JSON.parse(xhr.responseText).response.error.message);
				}
				else{
					update_error('fav','XHR Ready State: '+xhr.readyState+'<br>XHR Status: '+xhr.statusText);
				}
			}
		}
		f.append('fav_data[fav_type]',t);
		f.append('fav_data[obj_id]',playlist[count].sub_id);
		f.append('fav_data[obj_type]','song');
		f.append('fav_data[delete]',d);
		xhr.open('POST','http://moe.fm/ajax/fav?_='+new Date().getTime());
		xhr.send(f);
	}
	else update_error('fav','您尚未登录，请先登录......');
}
function update_playlist(d){
	if(playlist_fetching==0){
		if(d!=null){
			url_data=d;
			if(/\d+/.test(d))p=1;
		}
		playlist_fetching=1;
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					if(JSON.parse(xhr.responseText).playlist){
						playlist_fetching=0;
						//count=-1;
						if(p!=0){
							playlist=/*playlist.concat(*/JSON.parse(xhr.responseText).playlist/*)*/;
							count++;
							if(JSON.parse(xhr.responseText).info.may_have_next==true)p++;
							else{
								p=0;
								url_data=null;
							}
						}
						else{
							playlist=JSON.parse(xhr.responseText).playlist;
							count=-1;
						}
						audio_play();
					}
					else if(JSON.parse(xhr.responseText).response.error){
						update_error('playlist',JSON.parse(xhr.responseText).response.error.message);
					}
				}
				else if(xhr.responseText){
					update_error('playlist',JSON.parse(xhr.responseText).response.error.message);
				}
				else{
					update_error('playlist','XHR Ready State: '+xhr.readyState+'<br>XHR Status: '+xhr.statusText);
				}
			}
		}
		if(url_data==null)xhr.open('GET','http://moe.fm/listen/playlist?share_buttons=1&perpage=30&_='+new Date().getTime());
		else xhr.open('GET','http://moe.fm/listen/playlist?share_buttons=1&perpage=30&page='+p+'&'+url_data+'&_='+new Date().getTime());
		xhr.send();
	}
}
function update_volume_icon(v){
	if(v>66)c_volume_icon.innerHTML='8';
	else if(v>33)c_volume_icon.innerHTML='7';
	else c_volume_icon.innerHTML='6';
}
function update_background(){
	if(background_list.length==0){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4){
				if(xhr.status==200){
					background_list=JSON.parse(xhr.responseText).background_list;
					update_background();
				}
				else{
					update_error('background','获取背景图片列表失败<br>XHR Ready State: '+xhr.readyState+'<br>XHR Status: '+xhr.statusText);
				}
			}
		}
		xhr.open('GET','http://ext.ccloli.com/moe-fm/html5/background/');
		xhr.send();
	}
	else{
		var num=parseInt(Math.random()*(background_list.length-1));
		background_preload.src=background_list[num];
		//setTimeout(function(){update_background()},60000);
	}
}
function update_background_count(v){
	if(v==1){
		background_count_time=setInterval(function(){
			if(background_count_time_value>=60){
				update_background();
				background_count_time_value=0;
			}
			else{
				background_count_time_value++;
			}
		},1000);
	}
	else clearInterval(background_count_time);
}
function share(){
	var div=document.createElement('div'),
		div2=document.createElement('div');
	div.className='share_panel';
	div2.className='share_panel_background';
	div2.title='点击黑色区域以退出';
	div.innerHTML='<button onclick="var p=prompt(\'请按下 Ctrl + C 以复制，点击确定可跳转至该页面，点击取消返回。\',\''+playlist[count].sub_url+'#'+playlist[count].sub_title+' | 萌否电台\');if(p!=null)window.open(\''+playlist[count].sub_url+'\',\'_blank\')">复制当前曲目地址</button><button onclick="var p=prompt(\'请按下 Ctrl + C 以复制，点击确定可跳转至该页面，点击取消返回。\',\''+playlist[count].wiki_url+'#'+playlist[count].wiki_title+' | 萌否电台\');if(p!=null)window.open(\''+playlist[count].wiki_url+'\',\'_blank\')">复制当前专辑地址</button><span class="share_buttons">'+playlist[count].share_buttons+'</span>';
	document.body.appendChild(div);
	document.body.appendChild(div2);
	div2.addEventListener('click',function(){
		div.parentElement.removeChild(div);
		div2.parentElement.removeChild(div2);
	})
}

audio.addEventListener('play',function(){
	c_play.setAttribute('hidden','hidden');
	c_pause.removeAttribute('hidden');
	update_info();
})
audio.addEventListener('pause',function(){
	c_pause.setAttribute('hidden','hidden');
	c_play.removeAttribute('hidden');
})
audio.addEventListener('timeupdate',function(){
	if(!isNaN(audio.duration)){
		timeline_current.style.width=(audio.currentTime/audio.duration)*100+'%';
		if(audio.buffered.length>0)timeline_duration.style.width=(audio.buffered.end(audio.buffered.length-1).toFixed(2))/(audio.duration.toFixed(2))*100+'%';
		timeline_current_time.innerHTML=parseInt(audio.currentTime/60)+':'+(parseInt(audio.currentTime)%60<10?'0'+parseInt(audio.currentTime)%60:parseInt(audio.currentTime)%60);
		timeline_duration_time.innerHTML=parseInt(audio.duration/60)+':'+(parseInt(audio.duration)%60<10?'0'+parseInt(audio.duration)%60:parseInt(audio.duration)%60);
	}
})
audio.addEventListener('error',function(){
	var context;
	switch (audio.error.code){
		case 1:
			context='MEDIA_ERR_ABORTED（文件在取回时被用户中止）';
			break;
		case 2:
			context='MEDIA_ERR_NETWORK（文件在下载时发生错误）';
			break;
		case 3:
			context='MEDIA_ERR_DECODE（文件在解码时发生错误）';
			break;
		case 4:
			context='MEDIA_ERR_SRC_NOT_SUPPORTED（不支持的音频格式）';
			break;
		default:
			context='MEDIA_ERR_UNKNOWN（未知错误，错误代码：'+audio.error.code+'）';
	}
	switch (audio.networkState){
		case 0:
			context+='<br>NETWORK_EMPTY（音频尚未初始化）';
			break;
		case 1:
			context+='<br>NETWORK_IDLE（音频已缓存）';
			break;
		case 2:
			context+='<br>NETWORK_LOADING（浏览器正在下载数据）';
			break;
		case 3:
			context+='<br>NETWORK_NO_SOURCE（未找到音频来源）';
			break;
		default:
			context+='<br>NETWORK_UNKNOWN（未知错误，错误代码：'+audio.error.code+'）';
	}
	update_error('audio',context);
	audio_play();
})
audio.addEventListener('ended',function(){
	if(next==0)update_log();
	else next=0;
	audio_play();
})
cover_preload.addEventListener('load',function(){
	cover.style.backgroundImage='url('+playlist[count].cover.large+')';
	cover_loading_notification.style.opacity=0;
})
cover_preload.addEventListener('error',function(){
	if(cover_retry<3){
		update_error('cover','正在重试加载......');
		cover_preload.src=playlist[count].cover.large;
		cover_retry++;
	}
	else{
		update_error('cover','超过最大重新加载次数限制');
		cover_retry=0;
	}
})
c_play.addEventListener('click',function(){audio.play();})
c_pause.addEventListener('click',function(){audio.pause();})
c_next.addEventListener('click',function(){
	next=1;
	audio_play();
})
c_like.addEventListener('click',function(){
	if(c_like.hasAttribute('meow')){
		update_fav(1,1);
	}
	else{
		update_fav(1,0);
	}
})
c_dislike.addEventListener('click',function(){
	if(c_dislike.hasAttribute('meow')){
		update_fav(2,1);
	}
	else{
		update_fav(2,0);
	}
})
c_volume_icon.addEventListener('click',function(){
	if(c_volume_range.hasAttribute('disabled')){
		c_volume_range.removeAttribute('disabled');
		c_volume_range.style.opacity=1;
		audio.volume=volume/100;
		update_volume_icon(volume);
	}
	else{
		volume=audio.volume*100;
		c_volume_icon.innerHTML='9';
		c_volume_range.setAttribute('disabled','disabled');
		c_volume_range.style.opacity=0.75;
		audio.volume=0;
	}
})
c_volume_range.addEventListener('change',function(){
	volume=c_volume_range.value;
	audio.volume=volume/100;
	update_volume_icon(volume);
	setting.volume=volume;
	localStorage.setItem('moefm-html5-setting',JSON.stringify(setting));
})
c_share.addEventListener('click',function(){share();})
timeline.addEventListener('mouseup',function(event){
	audio.currentTime=(event.clientX/document.body.clientWidth)*audio.duration;
})
aside_album.addEventListener('click',function(){p=0;update_playlist('fav=music');})
aside_song.addEventListener('click',function(){p=0;update_playlist('fav=song');})
aside_radio.addEventListener('click',function(){p=0;update_playlist('fav=radio');})
aside_random.addEventListener('click',function(){p=0;url_data=null;update_playlist();})
background_preload.addEventListener('load',function(){document.documentElement.style.backgroundImage='url('+background_preload.src+')';})
background_preload.addEventListener('error',function(){
	update_error('background','获取图片时发生错误');
	update_background();
})
link_setting_background.addEventListener('click',function(){
	var div=document.createElement('div'),
		div2=document.createElement('div'),
		t=document.createElement('textarea'),
		b=document.createElement('button');
	div.className='setting_background_panel';
	div2.className='setting_background_panel_background';
	div2.title='点击黑色区域以退出';
	b.innerHTML='确定';
	t.setAttribute('title','请在文本框内输入图片地址，以回车间隔，一行一个');
	t.setAttribute('autofocus','autofocus');
	div.appendChild(t);
	div.appendChild(b);
	if(background_list.length!=0)t.value=background_list.join('\n');
	document.body.appendChild(div);
	document.body.appendChild(div2);
	div2.addEventListener('click',function(){
		div.parentElement.removeChild(div);
		div2.parentElement.removeChild(div2);
	})
	b.addEventListener('click',function(){
		var l=t.value.split('\n'),
			r=[];
		for(var i=0;i<l.length;i++){
			if(l!='')r.push(l[i]);
		}
		background_list=r;
		div2.click();
		update_background();
		setting.background=r;
		localStorage.setItem('moefm-html5-setting',JSON.stringify(setting));
	})
})

if(location.search.indexOf('song')>=0)update_playlist(location.search.match(/song=[0-9,]*/)[0]);
else if(location.search.indexOf('music')>=0)update_playlist(location.search.match(/music=[0-9,]*/)[0]);
else if(location.search.indexOf('radio')>=0)update_playlist(location.search.match(/radio=[0-9,]*/)[0]);
else update_playlist();
c_volume_range.value=volume;
audio.volume=volume/100;
update_volume_icon(volume);
update_background();
update_background_count(1);
window.addEventListener('keydown',function(e){
	switch(e.keyCode){
		case 32:
			audio.paused==false?audio.pause():audio.play();
			break;
		case 39:
			next=1;
			audio_play();
			break;
		case 38:
			c_like.click();
			break;
		case 40:
			c_dislike.click();
			break;
	}
})
window.addEventListener('focus',function(){
	update_background_count(1);
})
window.addEventListener('blur',function(){
	update_background_count(0);
})

if(typeof is_login!='undefined'&&is_login==true){
	var user_btn=document.createElement('span');
	user_btn.innerHTML=user;
	user_btn.className='link_right_user_btn';
	link_right_user.appendChild(user_btn);
	var user_pan=document.createElement('div');
	user_pan.innerHTML=user_panel;
	user_pan.style.cssText='position:fixed;background:rgba(0,0,0,0.5);bottom:0px;right:10px;opacity:0';
	user_pan.setAttribute('hidden','hidden');
	user_btn.appendChild(user_pan);
	user_btn.addEventListener('mouseover',function(){
		user_pan.removeAttribute('hidden');
		user_pan.style.opacity=1;
		user_pan.style.bottom='20px';
	})
	user_btn.addEventListener('mouseout',function(){
		user_pan.setAttribute('hidden','hidden');
		user_pan.style.opacity=0;
		user_pan.style.bottom='0px';
	})
}
else{
	link_right_user.innerHTML='<a class="right" target="_blank" href="http://moefou.org/register?redirect=http%3A%2F%2Fmoe.fm%2Flogin">注册</a><a class="right" href="http://moe.fm/login">登入</a>';
	document.getElementsByTagName('aside')[0].setAttribute('hidden','hidden');
}