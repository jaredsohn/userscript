// ==UserScript==
// @name           ex-player
// @namespace      http://www.ex.ua
// @description    player
// @include        http://www.ex.ua/view/190888*
// @resource	play	http://fs64.www.ex.ua/show/2508762/2508762.png
// @resource	pause	http://fs64.www.ex.ua/show/2508760/2508760.png
// @resource	back	http://fs64.www.ex.ua/show/2508758/2508758.png
// @resource	fwd		http://fs64.www.ex.ua/show/2508759/2508759.png
// ==/UserScript==

var player = {
onInit: function(){},
onClick: function(){},
onKeyUp: function(key){},
onFinished: function(){},
onUpdate: function(){},
play: function(){this.getPlayer().SetVariable("method:play", "");},
pause: function(){this.getPlayer().SetVariable("method:pause", "");},
stop: function(){this.getPlayer().SetVariable("method:stop", "");},
setVolume: function(){},
setMovie: function(mlink){this.getPlayer().SetVariable("method:setUrl", mlink);},
getPlayer: function(){return document.getElementById("pl4ex");}
}

var flv = document.getElementsByTagName('script');

for(var i=0; i<flv.length; i++){
    if(flv[i].text.indexOf('.flv') != -1){
        var txtfg = flv[i].innerHTML;
		var myRe = new RegExp("(https?://)?(www\.)?([a-zA-Z0-9_%]*)\.[a-z]{2,4}(\.[a-z]{2})?((/[a-zA-Z0-9_%]*)+)?(\.[a-z]*)?.flv", "g");
		var vlinks = txtfg.match(myRe);
		
		ctrl_play = document.createElement('img');
		ctrl_play.src = GM_getResourceURL("play");
		ctrl_back = document.createElement('img');
		ctrl_back.src = GM_getResourceURL('back');
		ctrl_fwd = document.createElement('img');
		ctrl_fwd.src = GM_getResourceURL('fwd');
		
	var newPlayer = '<div id="pw4ex" style="padding-top: 20px;"><object id="pl4ex" type="application/x-shockwave-flash" data="http://fs66.www.ex.ua/load/2490943/player_flv_js.swf" width="800" height="600">\
     <param name="movie" value="player_flv_js.swf" />\
	 <param name="bgcolor" value="#000000" />\
     <param name="FlashVars" value="flv='+vlinks[0]+'" />\
	 </object><div id="cntl4expls"><div  id="ctrl4ex_prev" style="width: 40px; height: 40px; float: left; margin: 10px 5px 10px 325px;"></div>\
	 <div id="ctrl4ex_play" style="width: 60px; height: 60px; float: left; margin: 10px 5px;"><img src="'+GM_getResourceURL('pause')+'"/></div>\
	 <div id="ctrl4ex_next" style="width: 40px; height: 40px; float: left; margin: 10px 5px;"></div></div></div>';
	var body = document.getElementsByTagName('body')[0];
	var wrapper = document.createElement('div');
	wrapper.setAttribute('id','ng4ex');
	wrapper.setAttribute('style','position: fixed; width: 800px; height: 700px; right: 16px; top: 32px; border: 1px solid #444; background-color: #3c3c3c; -moz-border-radius: 5px;padding: 0px 20px;');
	wrapper.addEventListener('mousedown',function(e){
		unsafeWindow.dragStart(e,'ng4ex');
	},false);
	body.appendChild(wrapper);
	wrapper.innerHTML = newPlayer;
	
}
}