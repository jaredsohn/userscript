// ==UserScript==
// @name          Wykop, brakujace szybkie zakopy
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Dodaje opcje szybkiego zakopu dla znalezisk nie posiadających jej (wykopy sponsorowane itp.)
// @include        http://*.wykop.pl/*
// @include        http://wykop.pl/*
// @include        https://*.wykop.pl/*
// @include        https://wykop.pl/*
// ==/UserScript==

	$ = unsafeWindow.jQuery; 
	letsJQuery();
	
	www_base = unsafeWindow.www_base;
	hash = unsafeWindow.hash;
	
	function letsJQuery() {

		var options_panel = $('ul.options:not(:has(li.digin)):has(a.jvote)');
		
		if(options_panel.length > 0 ) {
			
			options_panel.each( function() {
				
				var id = $(this).find('a.jvote').metadata().id;
				var znalezisko_url = $(this).find('li.comments a').attr('href');
				
				var op_panel = $(this);

				$('<div></div>').load(znalezisko_url+' ul.tabs li:nth-child(4) strong', function() {
					
					var zakopy = $(this).html();
					
					var a_zakop_label = $('<a title="#" href="#"><span><em>zakop (<strong>'+zakopy+'</strong>)</em></span></a>');
					
					var ul_zakop_reason = $('<ul class={id:"'+id+'"}></ul>');
					ul_zakop_reason.append('<li class="{reason:1}"><a href="http://www.wykop.pl/link/bury/-1//idReason,1,log_ref_0,upcoming,log_ref_m_0,index"><span>duplikat</span></a></li>');
					ul_zakop_reason.append('<li class="{reason:2}"><a href="http://www.wykop.pl/link/bury/-1//idReason,2,log_ref_0,upcoming,log_ref_m_0,index"><span>spam</span></a></li>');
					ul_zakop_reason.append('<li class="{reason:3}"><a href="http://www.wykop.pl/link/bury/-1//idReason,3,log_ref_0,upcoming,log_ref_m_0,index"><span>informacja nieprawdziwa</span></a></li>');
					ul_zakop_reason.append('<li class="{reason:4}"><a href="http://www.wykop.pl/link/bury/-1//idReason,4,log_ref_0,upcoming,log_ref_m_0,index"><span>treść nieodpowiednia</span></a></li>');
					ul_zakop_reason.append('<li class="{reason:5}"><a href="http://www.wykop.pl/link/bury/-1//idReason,5,log_ref_0,upcoming,log_ref_m_0,index"><span>nie nadaje się</span></a></li>');
					
					var li_container = $('<li></li>');
					li_container.append(a_zakop_label).append(ul_zakop_reason);
					
					var ul_slide_list = $('<ul class="slide-list jbury"></ul>');
					ul_slide_list.append(li_container);
					var li_digin = $('<li class="digin"></li>');
					li_digin.append('<span class="slash">|</span>').append(ul_slide_list);
					
					a_zakop_label.toggle(function () {
						$(this).next().show();
						return false
					}, function () {
						$(this).next().hide();
						return false
					});
					
					$(op_panel.find('li')[0]).after(li_digin);
					
					ul_zakop_reason.find('li').click(function () {
						var c = www_base + "ajax/link/bury/type," + $(this).metadata().reason + ",link," + $(this).parent().metadata().id + ",hash," + hash;
						var d = $(this);
						$.getJSON(c, {}, function (e) {
							if (e.error) {
								alert(e.error);
								return
							}
							d.parent().parent().fadeOut(150).html('<a href="#" title="#"><span><em>zakopane</em></span></a>').fadeIn(150).css("background", "")
						});
						return false
					});


				});
		
				
			} );
		
		}

		
	}