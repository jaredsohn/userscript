// ==UserScript==
// @author		vandalizmo gmail com
// @name		Wykop External Image Inline Importer
// @version		0.4.6
// @namespace	http://furorra.pl/scripts/gm/
// @description	Adds button to show external (hotlinked) images inline in comment.
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include		http://*.wykop.pl/*
// @include		http://wykop.pl/*
// ==/UserScript==

image_arrow_img		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAipJREFUeNqkk81rE1EUxc98JpnPJK22SdpgQ0mRCvFzJQVBF7oQUbGQLl2IbvwPCoVuxZXgyqIoQhe1S10oLsQiCCIIUkKwC1GC2JiY2MnMvJnxvhkoXSiU9sFjZi7zO3PueXeEKIqwnyVin0ueXVi4SNfiHvnvchAEpZXFxft7oa/Oz9+SA8aEkHKYuStAFABFIlu0PQbweKwM7TTVqNnKMDBdAFgIzB6PwFmZMSYG9GZtTIAqAzYBwzrQ+g1klOSZx9zZAo5Qo7USsOUBnOGszHw/Fijqb1EtTCCnF+MvT40AI2Yi5BBQGUqcuCwRjQWIjQVYGOLlhwdYS2s4f+wyzkyfjS1zR9y24wN5DfCDpKYpvI0wEfC5AKk1mg1k7SyWew/R7X3D+IEyCvlxHLRyyKj0aUFLYDVpbRBG8GMBzxMDUnO7JWz2Zfxpq3jW+YRMugld02HoBgzDgGmYsE0LraCME2NDqB/VwdltB5XCOaiqilQqBU3TYJoGbNtELmfRJtjWYVEI6+838XrDo3ykbQdSSA52rihOOIBD6X3pDzD4yiCKXTpmEQKd9bUrVSy/aMDPnzopd9ptVVIUrN6p/3NYbiw1CKhhnU6jx5La2k/g0OkqPn5uzgj65ORNUdPK/5u21FT9gmSVR3fWJq7PjW4sPW25zVcrNHugXJHl/8Vuxtece/w8btP5da+/evsRh2hM8GM3sHT4ElzHfUe3b5QIT3jtrwADAAEU2xDCcbipAAAAAElFTkSuQmCC';
image_minus_img		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfBJREFUeNqkU8tqFEEUPVXTj+mqfszkYTI9TiRD0EWEGBcuBEHQhSIBRQn4B/oRwUC24k50I7g1oP5AllEQJJtAAkM2s1CE4DBJNG2mq7u81Q1BCApmLlyauvQ5de7hFNNaY5jiGLKsxeXlBfrGp8R/tbIsa75dWXlxGvT9paXHVqYUy8mHa88YOAPsCsmiHijA2BN61FWa0bLtMWC2AagcWLysYbCWUopn9OfcWQbHAiICjEng2z7g2eXZ2Nw/BC7SonNN4HAAGIzBWipNC4JYfsD5xjTqMi5uvjABTAQlUUKA9mip5EiVpAUBYQsCledY23iFj1WBW/P3cH32RiHZKDKykxQYEUCalTNhmzXykiA1BMTW2emgFtXw5uA19g6+oDU+hcZIC2fCOjyHrmaiBDvlar9yjbQgGAx4RmxHe018/2HhZ8/Bu/4mvOoOpJDwpQ/f9xH4AaIgJOIY0+NNXDnnwmCPFbQbN+E4DlzXhRACQeAjigLU6yE1gSOJkEyQ0gZ3OZROjhVUclLwZ+nC4QwJucd5gvjlE1S720g5xz5jYIzjs5fjzu7uA6vf6zkV28b7pw//Gpj15x3cvXrpxHxrdbXF5MzMIy7E1L8St9Dt3p5MkskTOdb6E2UP5Ctq5l38Z5KVyRcb9jn/FmAA50DECJinQM4AAAAASUVORK5CYII=';
images_stack_img	= 'data:image/png;base64,data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfxJREFUeNqkk09oE0EUxr+dmW3LbjY0IqHW2gqV6MF6sT0JHoR6K2gPXj0Wz/UkhRDoXURK603Qs949WA9C0RZy8KCIUKxt/pjalMYl7s6fODNJJBGXFhx4vN1Z3vf73rwdp9Vq4X8Wu5PPw4g4jtPNc3p/9IT1Jdb75hACIcTZF8vLq8f5cnTMLy3d6xWY0xZG9Yfrr7a2sFe8n1icckPM330PwTlhieTpN4nkZ09nIXS7XYE+8qN1fTCkHVwCwRDgUuBcBjiTCbBwMwfmDkAoBR7HhAkp+8iz08k9P3+9aclcuOBaII5jyowNqTc/vMwmlLWlp25/xwCRllwpl22Oo4hYAaPqkBSGBpUeY6eUOqDau5ItKCEtWcqmJZfKvO0giigxfRi1xytj2HiXhed58H0fmZERjF2dQXZyEqlUYImf6srmizfyYIwhbDRcZvowap8/bqNWHUb9wMP4BMXlaxM4HVxB1KzqooYl/gylzQ/X1tYfFAobMgz3menDqC4u1rXxQ1BK7F9Z2/6CIP0W+98EfuxFmJpRuDDctGTF+eZhsbiiC+pGwDrY3VWdg5NWwDvgcHyB6leJ6o7CpX7yjptOl/jREZjtQ6veKtT+Ob7z3UvzF/nPnIJcboH6/vhJbo4h/6pUnhhy76AHdZzqPB+3DLnZu/FbgAEAu8EaA8OVhbsAAAAASUVORK5CYII=';
gear_img			= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoJJREFUeNqkU01oE1EQnk02iTFQE7QihUKRkKTF1iU9+FdQCoWYgAcPegkIeiiIWiHgwUvpQXs1Ggo99OYlFwUhWAhYhZJWUmhMxJbYYk1LFDcmJraSv911vjQbevPgg9kZ5vu+eW9n3hM0TaP/WSI+gUCADAYDmUwmEgSBUNRoNJ5jaKjNSyuKsqRjjUaDVFWlWCy2X0BfDJ5nd5r9KxZI0Wh0BuRgMHibcznGrrD/wD6hawwHxBdcLte12dnZGYfDcYOFhkJBpnL5F3Y0IAcMHHB1nYAj+Xw+xHeZ8FSWf1BPTw+trqY2JElyAkilUhsej8dZKhWpu/s4jY+P3+P0s/n5+f0TVCoVqlarL0Oh0KTZbCZZlmlgoN+pqgrBEO/u/iZg4IALTecX+BQX6/X69Xw+v8e7bYqiSMvLy+t+f2AGhhg5YOCAC43+7+T1eh+srCS1hYU32tJSQkun09rg4NA0TwLTIMTIAQMHXGigbU2hVqsZq9UaNZsKKYrKoxRZKDYwKizEyAEDB1xoOk3kzo6xP4PExMT9WyMjl/q2t7+npqYevkBucvLx1d7eE9Li4tutcPjJXEsoCO+z2WxcP0GcC3zmDt8ZHj7bVyyWyO32SLHYOwl4ufyTdna+ELCuriN2nlSEC2x1mshdRZGbkchcSJaLfCOtFI+//prLbRIMMXLAwAEXmk4T+ZLALo+Ojj1PJtc1t7s/bLfbHyUSGQ2GGDlg4IALTesd6Y8JY7JarX6bzTZtsVhOwq+tfdMymZx2MAcOuPrmrSYKaDHRUbZjbIcA8sM6xQ9sADFP4xNf54/t21tnk9kKrG3qBdCLw20T//GCFbY9tj+sVf8KMAACOoVxz9PPRwAAAABJRU5ErkJggg==';
loading_circle_ball	= 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

GM_addStyle(<><![CDATA[
	.weiii_img {
		display:		block;
	}
	
	.weiii_import_btn, .weiii_close_btn {
		border:			none;
		width:			16px;
		height:			16px;
		margin-left:	4px;
		cursor:			pointer;
		display:		inline;	
	}
	
	.weiii_close_btn {
		display:		none;
	}
]]></>.toString());

weiii_images_count	= 0;

hide_on_img_click		= true;
auto_show_all			= false;
auto_sort_comments		= true;
sort_ascending			= true;
ocena_watku_licz_podrzedne	= true;
ocena_watku_licz_ujemne		= true;

function getWykopEnhancerControlPanel() {
	if ($('#we_cp')[0]) {
		we_cp = $('#we_cp');
	} else {
		GM_addStyle(<><![CDATA[
			#we_cp {
				padding-left:	2px;
				text-align:		left;
				float:			left;
			}
			#we_cp > li {
				float: left;
				margin-right: 3px;
			}
			#we_cp > li:after { content: " | "; }
			#we_cp > li:last-child:after { content: ""; }
		]]></>.toString());

		we_cp = $('<ul />')
			.css({
			})
			.attr('id', 'we_cp');
			
		
		$('#pokaz_komentarze').parent()
			.prepend(we_cp);
	}
	
	return we_cp;
}

function show_img(id) {
	if ($('#weiii_img_'+id).length == 0) {
		show_loader(id);
		
		img_href = $('#weiii_imglink_'+id).attr('href');
		
		img = $('<img class="weiii_img" id="weiii_img_'+id+'" src="'+img_href+'" title="'+img_href+'"/>')
			.data('id', id)
			.css({
				display:	'none',
			})
			.load(function() {
				if ($(this).width() > $(this).parent().width()) {
					$(this).width('100%');
				}
				hide_loader(id);

				$(this).fadeIn('fast');
			});

		if (hide_on_img_click) {
			img
				.css({
					cursor:	'pointer',
				})
				.click(function() {
					hide_img($(this).data('id'));
				});
		}

		$('#weiii_close_btn_'+id).parent().height('auto');
		$('#weiii_close_btn_'+id).after(img);

		$('#weiii_import_btn_'+id).css('display', 'none');
		$('#weiii_close_btn_'+id).css('display', 'inline');
	}
}

function hide_img(id) {
	hide_loader(id);

	$('#weiii_img_'+id)
		.fadeOut('fast', function() {
			$('#weiii_close_btn_'+id).css('display', 'none');
			$('#weiii_import_btn_'+id).css('display', 'inline');
			$(this).remove();
		})
}

function show_loader(id) {
	loader = $('<img class="weiii_img_loader" id="weiii_img_loader_'+id+'" src="'+loading_circle_ball+'" />')
		.css({
			marginLeft:	'5px',
			display:	'none',
		});
		
	$('#weiii_import_btn_'+id).after(loader);
	
	loader.fadeIn('normal');
}

function hide_loader(id) {
	$('#weiii_img_loader_'+id).fadeOut('normal', function() { $(this).remove() });
}

function show_all_img() {
	for (var j = 0; j < weiii_images_count; j++) {
		show_img(j);
	}
}

function hide_all_img() {
	for (var j = 0; j < weiii_images_count; j++) {
		hide_img(j);
	}
}

(function() {
//	$('.comment-text, #details-table')
	$('#comments-list-entry')
		.find('a[href$=.jpg], a[href$=.jpeg], a[href$=.gif], a[href$=.png], a[href$=.JPG], a[href$=.JPEG], a[href$=.GIF], a[href$=.PNG], a[href$=.Jpg], a[href$=.Jpeg], a[href$=.Gif], a[href$=.Png]')
		.not('a[href*=wykop.pl/logout.php]')
		.each(function(i) {
			$(this)
			.attr('id', 'weiii_imglink_'+i)
			.data('id', i)
			
			import_btn = $('<img class="weiii_import_btn" id="weiii_import_btn_'+i+'" src="'+image_arrow_img+'" />')
				.data('img_href', $(this).attr('href'))
				.data('id', i)
				.click(function() {
					show_img($(this).data('id'), $(this).data('img_href'));
				
					return false;
				});
			
			close_btn = $('<img class="weiii_close_btn" id="weiii_close_btn_'+i+'" src="'+image_minus_img+'" />')
				.data('id', i)
				.click(function() {
					hide_img($(this).data('id'));
				});
			
			$(this).after(import_btn);
			$(this).after(close_btn);
			
			weiii_images_count++;
			
			if(auto_show_all) {
				show_img(i);
			}
		});

	var we_cp = getWykopEnhancerControlPanel();

	$('<li><a id="weiii_hide_all" href="#">ukryj obrazki</a></li>').appendTo(we_cp);
	$('<li><a id="weiii_show_all" href="#">pokaż obrazki</a></li>').appendTo(we_cp);
		
	$('#weiii_show_all').click(function() {
		show_all_img();
		return false;
	});
	
	$('#weiii_hide_all').click(function() {
		hide_all_img();
		return false;
	});
}());