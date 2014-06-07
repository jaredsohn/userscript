// ==UserScript==
// @name           BGM topic tweak
// @description    the newer one reply is, the darker it's dateline will be
// @author         McFog wxyuan90#gmail.com
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// @version        1.0.0201
// ==/UserScript==

(function(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
})(function() {	
	var $infos = $('#comment_list .re_info');
	var fn_focus = function(hash) {
		$('.reply_highlight').removeClass("reply_highlight");
		$(hash).addClass("reply_highlight");
		setTimeout(function() {
			$('body').scrollTop($('body').scrollTop()-30);
		});
	}
	
	var list = [];
	$infos.each(function() {
		var $t = $(this);
		var id = $t.parent().attr('id');
		if(id.substr(0, 5)!='post_') return;
		var pid = parseInt(id.substr(5));
		$t[0].pid = pid;
		list.push($t);
		
		$t.one('click', function() {
			var hash = "#post_"+pid;
			var link = location.origin+location.pathname+hash;
			$(this).before(
				$('<a></a>').text(link).attr('href', link).css({
					position:'absolute',
					right:0,top:32,
					padding:'2px'
				}).click(function() {
					fn_focus(hash);
				})
			);
			$(this).parent().css('position', 'relative');
		}).css('cursor', 'pointer').attr('title', '点击查看此楼链接');
	});
	list = list.sort(function($a, $b) {return $b[0].pid - $a[0].pid});

	var o = $('#comment_list').offset();
	var hash = "#post_"+list[0][0].pid;
	if(location.hash != hash) {
		var $tip = $('<div></div>').css({
			position:'fixed',
			top:30, left:o.left+800,
			padding:'5px',
			border:"1px solid gray",
			background:"white"
		}).append($('<a>最新回复</a>').attr('href', hash).click(function() {
			fn_focus(hash);
			$tip.remove();
		})).append($('<a href="javascript:;">[x]</a>').click(function() {
			$tip.remove();
		}));
	
		$('body').append($tip);
	}
	
	//fix
	$('#sliderContainer').css('z-index', 10);


	if($infos.size()<10) return;
	var step = 255 / list.length;
	for(var k in list) {
		var $t = list[k];
		var now = Math.floor(k * step);
		var color = now.toString('16').toUpperCase();
		var sofa = ["#F66", "#F96", "#FF6"];
		if(color.length==1) color = "0"+color;
		color = "#"+color+color+color;
		if(now < 180) {//dark
			$t.css({background:color, color:sofa[k]?sofa[k]:"#EEE"});
			if(k==0) $t.css('font-weight', 'bold');
		} else {//light
			$t.css({background:color, color:"#111"});
		}
	}	
});