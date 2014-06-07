// ==UserScript==
// @author		vandalizmo gmail com
// @name		Wykop Sorter
// @version		0.1
// @namespace	http://furorra.pl/scripts/gm/
// @description	Sortuje komentarze do znaleziska
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @include		http://*.wykop.pl/*
// @include		http://wykop.pl/*
// ==/UserScript==

wes_config = {
	sortuj_automatycznie: true,
	ocena_watku_dodaj_wskaznik: true,
	ocena_watku_licz_podrzedne: true,
	ocena_watku_licz_ujemne: false
}

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

function wrap_l2comments() {
	var parent;
	$('#wykop-comments').children().each(function() {
		if ($(this).attr('class') == 'level-1') {
			parent = $('<ul class="we_l2comments" />');
			$(this).append(parent);
		} else {
			parent.append($(this).remove());
		}
	});
}

function unwrap_l2comments() {
	var parent;
	$('li.level-1', '#wykop-comments').each(function() {
		parent = $(this);
		$($(".we_l2comments li.level-2", this).get().reverse()).each(function() {
			parent.after($(this).remove());
		});
	});

	$('.we_l2comments', '#wykop-comments').remove();
}

function sort_comments(licz_podrzedne, licz_ujemne) {
	licz_podrzedne = licz_podrzedne || wes_config['ocena_watku_licz_podrzedne'];
	licz_ujemne = licz_ujemne || wes_config['ocena_watku_licz_ujemne'];

	wrap_l2comments();
	
	var com = Array();
	$('li.level-1', '#wykop-comments').each(function() {
		var ow_type = licz_podrzedne ? '.vc' : '.vc:first';
		var ow = 0;
		$(ow_type, this).each(function() {
			vc = parseInt($(this).text());
			ow += ( (vc > 0) || licz_ujemne) ? vc : 0;
		});
		
		if (wes_config['ocena_watku_dodaj_wskaznik']) {
			var cv = $(".comment-vote:first", this);
			var ow_wsk = $("<span />")
				.attr("class", "we_ocenawatku")
				.attr("title", "Ocena wątku")
				.text(ow > 0 ? '+'+ow : ow);

			cv.before(ow_wsk);
		}
		
		var id = $(this).attr('id');
		var c = new Object();
		c.id = id;
		c.vc = ow;
		com.push(c);
	});
	
	com.sort(function(a, b) {
		return (a.vc < b.vc);
	});
	
	for (var el in com) {
		$('#'+com[el].id).remove().appendTo('#wykop-comments');
	}
	
	unwrap_l2comments();
}

(function() {
	var we_cp = getWykopEnhancerControlPanel();
		
	if (!wes_config['sortuj_automatycznie']) {
		$('<li><a id="we_sort_comments" href="#">sortuj komenatrze</a></li>').appendTo(we_cp);
		
		$('#we_sort_comments').click(function() {
			sort_comments();
			return false;
		});
	}

	if (wes_config['sortuj_automatycznie']) sort_comments();
}());