// ==UserScript==
// @name        SF-Layout
// @namespace   *
// @include     http://schoener-fernsehen.com/*
// @version     1
// @grant       none
// ==/UserScript==
var $ = unsafeWindow.jQuery;

$(window).load(function () {
	unsafeWindow.resizePlayer = function(_width, _height, _left, _top) {
		if (pagemodus == 'fullscreen') {
            _width = _width - 1;
            _left = parseInt(_left + 1);
        } 
        $('#playerholder').css({
            'width': _width + 'px',
            'height': _height + 'px',
            'left': _left + 'px',
            'top': _top + 'px'
        });
        $('#playerdiv').css({
            'width': _width + 'px',
            'height': _height + 'px'
        });
        if (document.getElementById('player_playerdiv')) {
            document.getElementById('player_playerdiv').width = _width;
            document.getElementById('player_playerdiv').height = _height;
        }		
	}

	var setdims = function() {
		document.getElementById("center").style.width = "1850px";
		document.getElementById("viewsite").style.width = "1370px";
		$("#ascrail2001").css("left","auto");
		$("#ascrail2001").css("right","28px");
		$("#ascrail2000").css("left","675px");
		$("#playerholder").css("left","77px");
		document.getElementById("playerholder").style.width = "1300px";
		document.getElementById("playerholder").style.height = "770px";
		document.getElementById("playerdiv").style.width = "1310px";
		document.getElementById("playerdiv").style.height = "770px";
		document.getElementById("videoplayer").style.height = "770px";
		document.getElementById("videoplayer").style.width = "1280px";
		document.getElementById("viewsite").style.height = "750px";
		document.getElementById("previewtxt").style.height = "65px";
		document.getElementById("previewtxt").style.marginBottom = "20px";
		document.getElementById("player").style.height = "730px";
		document.getElementById("bedienung").style.marginLeft = "-4px";
		document.getElementById("bedienung").style.width = "1270px";
	}
	
	var removeads = function() {
		$("span").each(function() {
			if($(this).html() == "Werbung entfernen!") {
				var pi = $(this).parent().attr("id");
				$(this).parent().remove();				
				pi = pi.replace("div","img");
				$("#"+pi).remove();				
				var pif = pi.replace("img","frame");
				$("#"+pif).remove();
			}
		});
	}
	
	var setall = function() {
		if($("#full").css("display") == "none") {
			setdims();
			resizePlayer(1290, 730, 77, 110);
		}
		removeads();
	}
	
	setInterval(setall, 500);
});