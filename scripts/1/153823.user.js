// ==UserScript==
// @name           Youtube Replay Loop 2.0 PT
// @namespace      http://userscripts.org/scripts/show/153823
// @version        2
// @description    Adiciona o botão repetição em vídeos do youtube, você vai encontrar um novo "+ R" ou "Repetição" do lado esquerdo do botão "Sobre".
// @include        http*://*.youtube.com/watch?v=*
// ==/UserScript==
function youtubeReplay(){

	if(/Opera|Chrome|Chromium/.test(navigator.userAgent)) {

		unsafeWindow = window;

		if(/Chrome|Chromium/.test(navigator.userAgent)){

			var div = document.createElement("div");

			div.setAttribute("onclick", "return window;");

			unsafeWindow = div.onclick();

		}

	}

	var s= unsafeWindow.document.createElement('script');

	s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';

	s.addEventListener("load", function(){

		function getSeconds(fullTimeInSeconds) {

			fullTimeInSeconds = Math.ceil(fullTimeInSeconds);

			var output = ((fullTimeInSeconds) % 60).toFixed();

			return (output < 10 ? '0' : '') + output;

		}

		function getMinutes(fullTimeInSeconds) {

			return Math.floor((fullTimeInSeconds) / 60);

		}

		unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict()

		jQuery = unsafeWindow.jQuery;

		jQuery('div#watch-actions-area').append('<div class="watch-actions-panel hid" id="watch-actions-replay" style="display:none;"><div style="overflow:hidden;pading:5px;" class="replay-panel"><span class="option-container"><label><input type="radio" name="replay" class="replay-type-loop" />&nbsp;Repetir:&nbsp;</label><button aria-pressed="false" role="button" class="yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=\'yTr.fromTime = yTr.player.getCurrentTime();	jQuery(this).html("De: " + yTr.getMinutes(yTr.fromTime) + ":" + yTr.getSeconds(yTr.fromTime));return false;\' id="watch-replay-from" type="button" title="Click to set current time" data-tooltip="Click to set current time" data-tooltip-title="Click to set current time" data-tooltip-timer="44"><span class="yt-uix-button-content">De: 00:00</span></button>&nbsp;-&nbsp;<button aria-pressed="false" role="button" class="yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=\'yTr.toTime = yTr.player.getCurrentTime();jQuery(this).html("Até: " + yTr.getMinutes(yTr.toTime) + ":" + yTr.getSeconds(yTr.toTime));return false;\' id="watch-replay-to" type="button" title="Click to set current time" data-tooltip="Click to set current time" data-tooltip-title="Click to set current time" data-tooltip-timer="44"><span class="yt-uix-button-content">Até: 00:00</span></button></span> <br /><br /><label class="option-container"><input type="radio" name="replay" checked="checked" class="replay-type-whole" />&nbsp;Repetindo video inteiro</label><br /><div class="yt-alert yt-alert-error yt-rounded  yt-alert-default comments-post-message"  id="ytReplayErrorContainer" style="display:none"><img alt="Alert icon" class="icon master-sprite" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"><div class="yt-alert-content" id="ytReplayError"></div></div><br /><div class="share-panel-buttons yt-uix-expander yt-uix-expander-collapsed"><span class="share-panel-main-buttons"><button aria-pressed="false" role="button" id="loopIt" onclick=\'if(jQuery("input.replay-type-whole").is(":checked")){yTr.loopType=0}else if(jQuery("input.replay-type-loop").is(":checked")){yTr.loopType=1}else{yTr.loopType=0}if(yTr.run==true){yTr.info(1,"Parando ação anterior !");yTr.run=false;setTimeout("yTr.run = true;yTr.replay();",2000)}else{yTr.run=true;yTr.replay()}return false;\' class="yt-uix-button yt-uix-button-default" type="button"><span class="yt-uix-button-content">Repetir!</span></button><button aria-pressed="false" role="button" id="stopIt" onclick=\'yTr.run=false;yTr.info(1,"Parado!!");return false;\' class="yt-uix-button yt-uix-button-default" type="button"><span class="yt-uix-button-content">Stop it!</span></button></span></div></div></div>');

		jQuery('div#watch-actions').append('<button aria-pressed="false" onmouseover=\'if(typeof yTr=="undefined"){yTr = new youtubeReplayObj();  jQuery("button#watch-replay-to").html("Até: "+yTr.getMinutes(yTr.player.getDuration())+":"+yTr.getSeconds(yTr.player.getDuration()));}\' role="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-replay" type="button" title="Replay Options for this video" data-tooltip="Replay Options for this video" data-tooltip-title="Replay Options for this video" data-tooltip-timer="44"><img alt="Replay Options for this video" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-addto"><span class="yt-uix-button-content"><span class="addto-label">&nbsp;R&nbsp;</span></span><img alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-arrow"></button>');

		/* new youtube layout button fix */
		jQuery('div#watch7-secondary-actions').prepend('<button role="button" id="new-watch-replay" onmouseover=\'if(typeof yTr=="undefined"){yTr = new youtubeReplayObj();  jQuery("button#watch-replay-to").html("Até: "+yTr.getMinutes(yTr.player.getDuration())+":"+yTr.getSeconds(yTr.player.getDuration()));}\' data-trigger-for="action-panel-replay" data-button-toggle="true" onclick=";return false;" class="action-panel-trigger yt-uix-button yt-uix-button-text" type="button"><span class="yt-uix-button-content">Repetição</span></button>');
		/* new youtube layout button fix end */
		
		/* new youtube layout main content start */
		jQuery('div#watch7-action-panels').append('<div class="action-panel-content hid" id="action-panel-replay"><div class="action-panel"><div style="overflow:hidden;pading:5px;" class="replay-panel"><span class="option-container"><label><input type="radio" name="replay" class="replay-type-loop" />&nbsp;Repetir&nbsp;</label><button aria-pressed="false" role="button" class="yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=\'yTr.fromTime = yTr.player.getCurrentTime();	jQuery(this).html("De: " + yTr.getMinutes(yTr.fromTime) + ":" + yTr.getSeconds(yTr.fromTime));return false;\' id="watch-replay-from" type="button" title="Click to set current time" data-tooltip="Click to set current time" data-tooltip-title="Click to set current time" data-tooltip-timer="44"><span class="yt-uix-button-content">De: 00:00</span></button>&nbsp;-&nbsp;<button aria-pressed="false" role="button" class="yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=\'yTr.toTime = yTr.player.getCurrentTime();jQuery(this).html("Até: " + yTr.getMinutes(yTr.toTime) + ":" + yTr.getSeconds(yTr.toTime));return false;\' id="watch-replay-to" type="button" title="Click to set current time" data-tooltip="Click to set current time" data-tooltip-title="Click to set current time" data-tooltip-timer="44"><span class="yt-uix-button-content">Até: 00:00</span></button></span> <br /><br /><label class="option-container"><input type="radio" name="replay" checked="checked" class="replay-type-whole" />&nbsp;Repetir video inteiro</label><br /><div class="yt-alert yt-alert-error yt-rounded  yt-alert-default comments-post-message"  id="ytReplayErrorContainer" style="display:none"><img alt="Alert icon" class="icon master-sprite" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"><div class="yt-alert-content" id="ytReplayError"></div></div><br /><div class="share-panel-buttons yt-uix-expander yt-uix-expander-collapsed"><span class="share-panel-main-buttons"><button aria-pressed="false" role="button" id="loopIt" onclick=\'if(jQuery("input.replay-type-whole").is(":checked")){yTr.loopType=0}else if(jQuery("input.replay-type-loop").is(":checked")){yTr.loopType=1}else{yTr.loopType=0}if(yTr.run==true){yTr.info(1,"Parando ação anterior !");yTr.run=false;setTimeout("yTr.run = true;yTr.replay();",2000)}else{yTr.run=true;yTr.replay()}return false;\' class="yt-uix-button yt-uix-button-default" type="button"><span class="yt-uix-button-content">Repetir!</span></button><button aria-pressed="false" role="button" id="stopIt" onclick=\'yTr.run=false;yTr.info(1,"Parado!!");return false;\' class="yt-uix-button yt-uix-button-default" type="button"><span class="yt-uix-button-content">Parar repetição!</span></button></span></div></div></div></div>');
		/* new youtube fix main content end */
		/* new youtube content load fix */
		jQuery('div#watch7-secondary-actions > button').click(function(){
			jQuery('div#watch7-action-panels > div#action-panel-replay').addClass('hid');
		});
		jQuery('button#new-watch-replay').click(function(){
			jQuery('div#watch7-action-panels > div.action-panel-content').addClass('hid');
			jQuery('div#watch7-action-panels > div#action-panel-replay').removeClass('hid').attr('style','');
		});
		/* new youtube content load fix end*/

		jQuery('button#watch-replay').click(function(){

			if(jQuery('div#watch-actions-area-container').css('display') != 'none'){ 

				if(jQuery('div#watch-actions-replay').css('display') != 'none'){

					jQuery('div.watch-actions-panel').each(function(){jQuery(this).hide('fast');if(jQuery(this).className != "hid"){jQuery(this).addClass('hid');}});jQuery('div#watch-actions-area-container').hide().addClass('hid');

				}

				else{

					jQuery('div.watch-actions-panel').each(function(){jQuery(this).hide('fast');if(jQuery(this).className != "hid"){jQuery(this).addClass('hid');}});jQuery('div#watch-actions-area-container').hide().addClass('hid');

					jQuery('div#watch-actions-replay, div#watch-actions-area-container').slideToggle('normal').removeClass('hid');

				}

			}

			else{

				jQuery('div#watch-actions-replay, div#watch-actions-area-container').slideToggle('normal').removeClass('hid');

			}

		});

		if(typeof unsafeWindow.youtubeReplayObj!='undefined' || typeof unsafeWindow.yTr!='undefined'){alert('Youtube Replay needs an update');}

		var myString = "function youtubeReplayObj(){this.player=jQuery('#movie_player')[0];if(jQuery('div#watch-video video').length>0){this.player=jQuery('div#watch-video video')[0];parent=this.player;this.player.getCurrentTime=function(){return parent.currentTime};this.player.getDuration=function(){return parent.duration};this.player.seekTo=function(fetchTime,NULL){parent.currentTime=fetchTime;return true};this.player.playVideo=function(){parent.currentTime=0;return true}}this.run=false;this.counter=0;this.loopType=0;this.info=function(task,text){if(task=0){jQuery('div#ytReplayErrorContainer').hide();jQuery('div#ytReplayError').html('')}else{jQuery('div#ytReplayErrorContainer').show();jQuery('div#ytReplayError').html(text)}return false};this.getSeconds=function(f){f=Math.ceil(f);var output=((f)%60).toFixed();return(output<10?'0':'')+output};this.getMinutes=function(f){return Math.floor((f)/60)};this.loop=function(){if(this.run){setTimeout('yTr.loop()',1000);if(this.toTime<this.fromTime){this.info(1,'To: time must be greater than From: time')}else{this.info(1,'Repetindo selecionado');if(this.player.getCurrentTime().toFixed()>=this.toTime){this.player.seekTo(this.fromTime,true)}}}return false};this.play=function(){if(this.run){setTimeout('yTr.play()',1000);this.info(1,'Repetindo video inteiro');if(this.player.getCurrentTime().toFixed()==this.player.getDuration().toFixed()){this.player.playVideo()}}return false};this.replay=function(){if(this.run){if(this.loopType==0){this.play()}else{this.loop()}}return false};this.fromTime=0;this.toTime=this.player.getDuration()}";

jQuery('body').append("<script>"+myString+"</scr"+"ipt>");
	},false);

	unsafeWindow.document.getElementsByTagName('head')[0].appendChild(s);

};

window.addEventListener ("load", youtubeReplay(), false);

