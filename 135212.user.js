// ==UserScript==
// @name          vkontakte html5 music
// @description   From http://userscripts.org/scripts/show/135212
// @version       0.03
// @include       http://vk.com/*
// ==/UserScript==

function main(){
// start of main
var mydialog = '<div id="playerme" title="Player" style="display: none;"></div>';
$("body").append(mydialog);
var myhtml = '<div id="dialog_window" class="dialog_window" style="width: 420px;">\
		<div id="jquery_jplayer_1" class="jp-jplayer"></div>\
		<div id="jp_container_1" class="jp-audio">\
			<div class="jp-type-playlist">\
				<div class="jp-gui jp-interface">\
					<ul class="jp-controls">\
						<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li>\
						<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>\
						<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>\
						<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li>\
						<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>\
						<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>\
						<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>\
						<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>\
					</ul>\
					<div class="jp-progress">\
						<div class="jp-seek-bar">\
							<div class="jp-play-bar"></div>\
						</div>\
					</div>\
					<div class="jp-volume-bar">\
						<div class="jp-volume-bar-value"></div>\
					</div>\
					<div class="jp-time-holder">\
						<div class="jp-current-time"></div>\
						<div class="jp-duration"></div>\
					</div>\
					<ul class="jp-toggles">\
						<li><a href="javascript:;" class="jp-shuffle" tabindex="1" title="shuffle">shuffle</a></li>\
						<li><a href="javascript:;" class="jp-shuffle-off" tabindex="1" title="shuffle off">shuffle off</a></li>\
						<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>\
						<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>\
					</ul>\
				</div>\
				<div class="jp-playlist" style="background-color:#fff;">\
					<ul>\
						<li></li>\
					</ul>\
				</div>\
				<div class="jp-no-solution"><span>Update Required</span>\
				</div>\
				</div>\
			</div>\
		</div>\
</div>';

var playlist;
var visible_dialog = 0;
var initilized = 0;

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>/g, '');
};

function clickme(){
	var mp3s = [];
	$('.audio').each(function(i,elem) {
		var url = $(elem).find("#audio_info" + $(elem).attr("id").substring(5)).val();
		if (url != undefined){
			var alltitle = $(elem).find(".audio_title_wrap");
			if (alltitle.html() == null) alltitle = $(elem).find(".title_wrap");
			var name = alltitle.html().stripTags();
			url = url.substring(0, url.indexOf(","));
			mp3s.push({title:name,mp3:url});
		}
	});
    playlist.setPlaylist(mp3s);
    initilized = 1;
	return false;
}

function showmeclick(){
	if ($('#dialog_window').length == 0){
			$("#playerme").append(myhtml);
			visible_dialog = 0;
			initilized = 0;
			playlist = new jPlayerPlaylist({Player: "#jquery_jplayer_1", cssSelectorAncestor: "#jp_container_1"}, [], { supplied: "mp3", wmode: "window"});
			$("#jquery_jplayer_1").bind($.jPlayer.event.timeupdate, function(event) {
				// dirty hack, fix bug with stop at the end of song
				var mytime = (event.jPlayer.status.duration - event.jPlayer.status.currentTime);
				if (mytime < 1 && mytime != 0){
					$(".jp-next").click();
				}
			});
			
			$(".jp-playlist").css("height", "390px");
			$(".jp-playlist").css("overflow", "auto");
	}
	
	if(visible_dialog && $(".ui-dialog").css("display") != "none"){
		clickme();
		// update dialog
    }else if (($('#audios_list').length != 0) && ($('#audios_list').css("display") != "none")){
		clickme();
		$('#playerme').dialog('close');
        $('#dialog_window').appendTo("#main_panel");
        $("#audios_list").css("display", "none");
        $('#jp_container_1').css("margin", "15px");
        visible_dialog = 0;
    }else{
		// restore audios_list
		if (($('#audios_list').length != 0) && $('#audios_list').css("display") == "none")
			$("#audios_list").css("display", "");
			
		if (!initilized)
			clickme();

		// dialog up
		$('#jp_container_1').css("margin", "0");
		$('#jp_container_1').css("margin-left", "2px");
        $('#dialog_window').appendTo("#playerme");
        
        var playing = $('#jquery_jplayer_1').data().jPlayer.status.paused;
        $('#playerme').dialog({width:451,height:524,resizable:false,position:['right', 'top']});
        if (playing == false) 
			$(".jp-play").click();
        visible_dialog = 1;
    }
	return false;
}

$('.top_back_link_td').parent().append('<td id=mypleer><a class="top_nav_link" href="#" onclick="return showmeclick();">плеер</a></td>');
// end of main
}

function addLink(name) {
	var headID = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = name;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

function loadText(name){
    var script = document.createElement("script");
    // main strip definition
    var text = name.toString().substring(16);
    script.textContent = text.substring(0, text.length - 2);
    document.body.appendChild(script);
}

var scripts = [];
var script_block = 0;

function loadScript(url){
	scripts.push(url);
}

function loadScriptOk(){
	script_block = 0;
}

function loadScriptUrl(url){
   var script = document.createElement('script');
   script.setAttribute('type', 'text/javascript');
   script.setAttribute('src', url);
   script.onload = loadScriptOk;
   document.body.appendChild(script);
}

function doLoadMain(){
	if (script_block){
		setTimeout(doLoadMain, 100);
		return;
	}
	var url = scripts.pop();
	if (typeof url != "undefined"){
		script_block = 1;
		loadScriptUrl(url)
		setTimeout(doLoadMain, 50);
	}else{
		loadText(main);
	}
}

function loadMain(){
	scripts.reverse();
	doLoadMain();
}

addLink("http://www.jplayer.org/latest/skin/blue.monday/jplayer.blue.monday.css");
addLink("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/redmond/jquery-ui.css");

loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js");
loadScript("http://www.jplayer.org/latest/js/jquery.jplayer.min.js");
loadScript("http://www.jplayer.org/latest/js/jplayer.playlist.min.js");
loadMain();
