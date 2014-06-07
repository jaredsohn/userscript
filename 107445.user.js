// ==UserScript==
// @id             google_hover_zoom
// @name           Google+ Hover Zoom (beta)
// @description    Enlarge Thumbnails On Mouse Hover.
// @version        0.0.1
// @include        https://plus.google.com/*
// ==/UserScript==

// CSS
GM_addStyle(
'#hoverzoom {position: fixed; padding: 5px; box-shadow: 1px 1px 5px #999; z-index: 10002; height: auto; width: auto; top: 15px; display: none; min-width: 40px; min-height: 40px; background: #fff no-repeat center center url(https://lh6.googleusercontent.com/-jsVBH41t1_I/ThrqDM0Lq6I/AAAAAAAAAlo/rMdhmf-QV9E/ajax-loader.gif);}'+
'#hoverzoom small {display: block; text-align: center; line-height: 1; margin: 3px 0 2px;}'+
'#picbefore {position: fixed; width: 45px; height: 45px; box-shadow: 0 0 5px #666; right: 0; top: 40%; display: none; background: #2d2d2d no-repeat url(https://lh5.googleusercontent.com/-nq3Nv6EYb0M/ThylQUyr8PI/AAAAAAAAAmc/CFCkL7RXYTk/s800/document_image_down_32.png); background-position: 7px 7px; -moz-transition: width 0.2s; border-radius: 10px 0 0 10px; outline: none;}'+
'#picbefore:hover {width: 50px; -moz-transition: width 0.2s;}'+
'#hz_set_back {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; opacity: 0.75; z-index: 10000; display: none;}'+
'#hz_set_page {position: fixed; width: 450px; height: auto; top: 50%; left: 50%; margin-left: -235px; margin-top: -140px; background: #fff; border:1px solid #acacac; border-bottom: 1px solid #999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); z-index: 10001; padding: 10px; display: none;}'+
'#hz_set_page input[type="text"] {border: 1px solid #d9d9d9; padding: 2px 5px; margin-right: 5px; width: 50px;}'+
'#hz_set_page input[type="checkbox"] {margin: 0 5px 0 0;}'+
'#hz_set_page label {line-height: 2; margin-right: 5px; display: inline-block; min-width: 70px;}'+
'#hz_set_save, #hz_set_cancel, #hz_his_clear, #hz_his_max_out {float: right; margin: 0 0 0 10px;}'+
'#hz_history {display: block; height: 320px;}'+
'#hz_history_out {display: block; overflow-x: hidden; overflow-y: auto; margin-bottom: 10px;}'+
'#hz_history img {width: 150px;}'+
'.clearfix:after {content: "."; display: block; height: 0; clear: both; visibility: hidden;}'+
'.clearfix {display: inline-block;}'+
'* html .clearfix {height: 1%;}'+
'.clearfix {display: block;}'+
'.img-in-post {max-width: 100%; height: auto; margin: 3px 0; display: block;}'
);

function main(){
	// jQuery atteeeeention
	$.fn.atteeeeention=function(a){return this.each(function(){var k=$.extend({margin:12,hideLastRow:false},a),l=$(this),f=l.find("img"),e=k.margin,c=f.length,g=0,m=l.innerWidth(),n,h=[],d=0,b=1000,o=0,i=0,j=function(){var s=m-(d-n)+e,q=Math.floor(s/o),t=s-(q*o),r=0;$.each(h,function(w,x){var v=$(f[i]),u=v.parent();r=x+q;u.height(b);if(o===(w+1)){u.css("margin-right",0);v.width(r+t);}else{v.width(r);}i++;});},p=function(){var r=0,q=o;if(k.hideLastRow===true){for(;r<q;r++){$(f[i]).parent().hide();i++;}}else{for(;r<q;r++){$(f[i]).parent().height(b);i++;}}};l.addClass("clearfix");f.css({border:0,margin:0,padding:0}).parent().css({"float":"left",display:"inline","margin-top":0,"margin-right":e,"margin-bottom":e,"margin-left":0,overflow:"hidden","vertical-align":"top"});f.each(function(){var q=$(this),r=q.attr("src");q.attr("src","").load(function(){g++;if(g===c){f.each(function(u){var t=$(this),s=t.width(),v=t.height();n=s+e;d=d+n;if(v<b){b=v;}if(d>m){j();d=n;b=v;h=[s];o=1;}else{h.push(s);o++;}if((c-1)===u){p();}});}}).attr("src",r);});});};

	var $window = $(window);
		wWidth = $window.width(),
		wHeight = $window.height();
	
	$('#content').append('<div id="hoverzoom"></div>');
	var $zoom = $('#hoverzoom');
	var url, timer1, timer2, timer3, index = [];
	
	// Localization
	var locale = navigator.language,
		locale_db_1 = 'ජායාරූපය ලබාගන්න',
		locale_menu_1 = 'විශාලනය විම අක්‍රීය කරන්න',
		locale_menu_2 = 'විශාලනය විම සක්‍රීය කරන්න',
		locale_set_title = 'විශාලනය කිරිමේ සැකසිම්',
		locale_set_save = 'සැකසිම් සුරකින්න',
		locale_set_history = 'අතීතය',
		locale_set_clear = 'මකන්න',
		locale_set_close = 'වහන්න',
		locale_set_1_1 = 'පරක්කුව:',
  locale_set_1_2 = 'ms',
		locale_set_2 = 'විනිවිද පෙනිම:',
  locale_set_3_1 = 'උපරිම පළල:',
  locale_set_3_2 = 'px (0: Unlimited)',
  locale_set_4 = 'බාගත කරගැනිමේ පහසුකම සක්‍රීය කරන්න',
  locale_set_5 = 'අතීතය බලාගැනිමේ පහසුකම සක්‍රීය කරන්න',
		locale_set_6_1 = 'උපරිම දත්ත:',
  locale_set_6_2 = '(0: Unlimited)',
  locale_set_7_1 = 'ක්‍රියාරම්භකය:',
  locale_set_7_2 = 'කිසිවක් නැත',
  locale_set_8 = 'Display Picture Links in Comments Directly, ',
  locale_set_9 = 'Display Resolution';
	
	
	// Load settings
	var hz_delay = parseInt(localStorage['hz_delay']) || 500,
		hz_opacity = parseInt(localStorage['hz_opacity']) || 100,
		hz_maxwidth = parseInt(localStorage['hz_maxwidth']) || 0,
		hz_download = localStorage['hz_download'] || true,
		hz_his = localStorage['hz_his'] || true,
		hz_his_max = parseInt(localStorage['hz_his_max']) || 100,
		hz_trigger = parseInt(localStorage['hz_trigger']) || 0,
		hz_direct = localStorage['hz_direct'] || true,
		hz_direct_max = parseInt(localStorage['hz_direct_max']) || 0,
		hz_resolution = localStorage['hz_resolution'] || true;
	
	// Bind function
	enable();
	if ( hz_direct === 'true' )
		directPic();	
	
	$zoom.css('opacity', hz_opacity / 100);
	
	if ( hz_download === 'true' )
		$('#content').append('<a id="picbefore" title="'+locale_db_1+'"></a>');
	
	function showImg(){
		url = $(this).attr('src');
		
		url = ( url.match(/\?sz|\/proxy/) ) ? $(this).attr('src').replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : $(this).attr('src').replace(/\/\w\d+(-\w\d*)*\/([^\/]+)$/,'/s0/$2');
		
		if ( url.match(/ytimg/) == null )
			trigger($(this));
	}
	
	function showLink(){
		url = $(this).attr('href');
		
		if ( url.match(/jpg|png|tiff|gif|jpeg|bmp/i) )
			trigger($(this));
	}
	
	function trigger(object){
		if ( hz_trigger > 0 ) {
			$(document).keydown(function(e){
				var code = e.keyCode || e.which;
				if ( code == hz_trigger )
					main(object);
			});
			
		} else {
			main(object);
		}
	}
	
	function main(object){
		clearTimeout(timer1);
		timer1 = setTimeout(function(){
			$zoom.empty().append('<img src="'+url+'" />');
			object.mousemove(function(e){
				resize(e);
			});
			$('#picbefore').attr('href', url).show();
			$zoom.show();
			var img = document.getElementById('hoverzoom').firstChild;
			img.addEventListener('load', function(){
				var nWidth = img.naturalWidth,
					nHeight = img.naturalHeight;
				
				if ( hz_resolution === 'true' )
					$zoom.append('<small>'+nWidth+' x '+nHeight+'</small>');
				
				if ( nWidth != 0 || nHeight != 0) {
					if ( hz_his === 'true' && url != $('#hz_history').children().eq(0).attr('href') ) {
						var time = new Date(),
							month = time.getMonth() + 1,
							day = time.getDate(),
							hour = time.getHours(),
							minute = time.getMinutes(),
							second = time.getSeconds();
							if ( minute < 10 ) minute = '0' + minute;
							if ( second < 10 ) second = '0' + second;
						$('#hz_history').prepend('<a href="'+url+'" target="_blank" title="'+month+'/'+day+' '+hour+':'+minute+':'+second+'"><img src="'+url+'" /></a>');
						if ( $('#hz_history').children().length > hz_his_max && hz_his_max > 0 )
							$('#hz_history').children().eq(hz_his_max).remove();
					}
				}
			}, false);
		}, hz_delay);
	}
	
	function hidePic(){
		clearTimeout(timer2);
		timer2 = setTimeout(function(){
			$zoom.hide();
		}, 100);
	}
	
	function resize(e){
		$zoom.offset({'top': e.pageY + 20, 'left': e.pageX + 20});
		
		var picWidth = wWidth - e.pageX - 40;
		
		if ( hz_maxwidth > 0 && picWidth > hz_maxwidth )
			picWidth = hz_maxwidth;
		
		$zoom.children('img').css('maxWidth', picWidth);
		( hz_resolution === 'true' ) ? $zoom.children('img').css('maxHeight', wHeight - 50) : $zoom.children('img').css('maxHeight', wHeight - 35);
		
		if ( e.pageY + $zoom.height() + 20 > $(document).scrollTop() + wHeight - 20)
			( $zoom.offset().top - $zoom.height() < $(document).scrollTop() + 20) ?	$zoom.offset({'top': $(document).scrollTop() + 10}) : $zoom.offset({'top': e.pageY - $zoom.height() - 20});
	}
	
	// Resize
	$(window).resize(function(){
		wWidth = $window.width(),
		wHeight = $window.height();
	});
	
	// Settings
	$('#gbd5 ol.gbmcc').append('<li class="gbmtc"><div class="gbmt gbmh"></div></li><li class="gbkp gbmtc"><a id="disable_hz" class="gbmt" href="javascript:void(0)">'+locale_menu_1+'</a></li><li class="gbkp gbmtc"><a id="hz_set_open" class="gbmt" href="javascript:void(0)">'+locale_set_title+'</a></li>');
	
	$('#content').append('<div id="hz_set_back"></div><div id="hz_set_page"><h3>'+locale_set_title+'</h3><div id="hz_set_close" class="om" title="'+locale_set_close+'"></div></div>');
	
	$('#hz_set_page').append(
	'<label for="hz_delay">'+locale_set_1_1+'</label><input id="hz_delay" type="text" maxlength="4" placeholder="500"/><label for="hz_delay">'+locale_set_1_2+'</label><br />'+
	'<label for="hz_opacity">'+locale_set_2+'</label><input id="hz_opacity" type="text" maxlength="3" placeholder="100"/><label for="hz_opacity">%</label><br />'+
	'<label for="hz_maxwidth">'+locale_set_3_1+'</label><input id="hz_maxwidth" type="text" maxlength="4" placeholder="0"/><label for="hz_maxwidth">'+locale_set_3_2+'</label><br />'+
	'<label for="hz_trigger">'+locale_set_7_1+'</label><select id="hz_trigger"><option value="0">'+locale_set_7_2+'</option><option value="16">Shift</option><option value="17">Control</option></select><br />'+
	'<input id="hz_download" type="checkbox"/><label for="hz_download">'+locale_set_4+'</label><br />'+
	'<input id="hz_direct" type="checkbox"/><label for="hz_direct">'+locale_set_8+'</label><label for="hz_direct_max">'+locale_set_3_1+'</label><input id="hz_direct_max" type="text" maxlength="4" placeholder="0"/><label for="hz_direct_max">'+locale_set_3_2+'</label><br />'+
	'<input id="hz_resolution" type="checkbox"/><label for="hz_resolution">'+locale_set_9+'</label><br />'+
	'<input id="hz_his" type="checkbox"/><label for="hz_his">'+locale_set_5+'</label><br />'+
	'<div id="hz_set_save" class="tk3N6e-e-qc tk3N6e-e" title="'+locale_set_save+'">'+locale_set_save+'</div>'
	);
	
	if (navigator.appVersion.indexOf('Macintosh') > -1) {
		$('#hz_trigger').append('<option value="91">Command</option>');
	}
	
	for ( var i=65; i<91; i++ ) {
		$('#hz_trigger').append('<option value="'+i+'">&#'+i+';</option>');
	}
	
	if ( hz_his === 'true' )
		$('#hz_set_page').append(
		'<br /><br /><h3>'+locale_set_history+'</h3><div id="hz_history_out"><div id="hz_history"></div></div>'+
		'<div id="hz_his_clear" class="tk3N6e-e-vj tk3N6e-e" title="'+locale_set_clear+'">'+locale_set_clear+'</div>'+
		'<div id="hz_his_max_out"><label for="hz_his_max">'+locale_set_6_1+'</label><input id="hz_his_max" type="text" placeholder="100"/><label for="hz_his_max">'+locale_set_6_2+'</label></div>'
		);
	
	$('#disable_hz').toggle(function(){
		disable();
		$(this).text(locale_menu_2);
	}, function(){
		enable();
		$(this).text(locale_menu_1);
	});
	
	$('#hz_set_open').click(function(){
		$('#hz_set_back, #hz_set_page').fadeIn(300);
		
		if ( hz_his === 'true' ) {
			$('#hz_set_page').css({'width': wWidth - 200, 'height': wHeight - 200, 'marginLeft': -(wWidth / 2 - 100), 'marginTop': -(wHeight / 2 - 100)});
	
			$('#hz_history').css({'height': wHeight - 525, 'width': wWidth - 210});
			$('#hz_history_out').css({'height': wHeight - 525, 'width': wWidth - 190});	
			$('#hz_history').atteeeeention();
		}
		
		$('#hz_set_page').find(':text').each(function(){
			$(this).val(localStorage[$(this).attr('id')]);
		});
		
		$('#hz_set_page').find('select').each(function(){
			$(this).children('option[value="'+localStorage[$(this).attr('id')]+'"]').prop('selected', true);
		});
		
		$('#hz_set_page').find(':checkbox').each(function(){
			if ( localStorage[$(this).attr('id')] === 'true' )
				$(this).prop('checked', true);
		});
	});
	
	$('#hz_set_save').click(function(){
		$('#hz_set_page').find(':text').each(function(){
			localStorage[$(this).attr('id')] = $(this).val();
		});
		
		$('#hz_set_page').find('select').each(function(){
			localStorage[$(this).attr('id')] = $(this).find(':selected').val();
		});
		
		$('#hz_set_page').find(':checkbox').each(function(){
			localStorage[$(this).attr('id')] = $(this).prop('checked').toString();
		});
		
		location.reload();
	});
	
	$('#hz_his_clear').click(function(){
		$('#hz_history').empty();
	});
	
	$('#hz_set_close, #hz_set_back').click(function(){
		$('#hz_set_back, #hz_set_page').fadeOut(300);
	});
	
	function disable(){
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom').die('mouseenter', showImg);
		$('.ot-anchor').die('mouseenter', showLink);
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom, .ot-anchor').die('mouseout', hidePic);
		$('#picbefore').hide();
	}
	
	function enable(){
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom').live('mouseenter', showImg);
		$('.ot-anchor').live('mouseenter', showLink);
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom, .ot-anchor').live('mouseout', hidePic);
	}
	
	function directPic(){
		clearInterval(timer3);
		timer3 = setInterval(function(){
			$('.a-f-i-W-r .ot-anchor').each(function(I){
				url = $(this).attr('href');
				if ( url.match(/jpg|png|tiff|gif|jpeg|bmp/i) && $(this).parent().parent().parent().parent().parent().attr('id') != index[I] ) {
					this.innerHTML = '<img class="img-in-post" src="'+url+'"/>';
					if ( hz_direct_max > 0 ) {
						$(this).children().css('maxWidth', hz_direct_max);
						$(this).next().remove();
					}
					index[I] = $(this).parent().parent().parent().parent().parent().attr('id');
				}
			});
		}, 2500);
	}
}

function addJQ(callback){
	var script = document.createElement('script');
	script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
	script.addEventListener('load', function(){
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQ(main);