// ==UserScript==
// @name			HackForums Moderation Pack
// @namespace		xerotic/hfmp
// @description		Moderation pack to help Mentors/Staff/Admins on HF.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include			*hackforums.net*
// @run-at 			document-end
// @version			1.0
// ==/UserScript==

String.prototype.contains = function (arg) {
	return (this.indexOf(arg) >= 0) ? true : false;
}

pageTitle = location.href;
if(pageTitle.contains("showthread.php")) {
	if(!$('#container').find('script[src*="inline_moderation"]').length) {
		$('div[style*="float: right"]').each(function() {
			$(this).children().children().prepend('<a href="#copyright">Down</a> - ');
		});
	} else {
		$('div[style*="float: right"]').each(function() {
			$(this).children().children().prepend('<a href="javascript:void(0);">Junk</a> - <a href="#copyright">Down</a> - ');
		});
		$('a:contains("Junk")').click(function(e) {
			var $ourCheck = $(e.target).parent().parent().find('input[name^="inlinemod_"]');
			if(!$ourCheck.is(':checked')) {
				$ourCheck.click();
			}
			$('input[name="go"]').click();
		});
		
		$('input[name^="inlinemod_"]').each(function() {
			$(this).css('cursor', 'pointer').prev().css('cursor', 'auto').parent().parent().prev().css('cursor', 'auto').parent().parent().css('cursor', 'pointer').click(function(e) {
				if(!$(e.target).is('a') && !$(e.target).is('input')) {
					$(e.target).find('input[name^="inlinemod_"]').click();
				}
			});
		});
		
		if($('a[title="Thread Closed"]').length) {
			var openclose = "Open";
		} else {
			var openclose = "Close";
		}
		
		$('.pagination').css('display', 'inline-block');
		
		$('.quick_keys').find('div[id^="success_rating_"]').before('<div style="display:inline-block;float:left;"><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="' + openclose + '" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Junk" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Thread Notes" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Move" /></div>');
		
		$('input[value="Clear"]').before('<div style="display:inline-block;float:left;"><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="' + openclose + '" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Junk" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Thread Notes" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Move" /></div>');
		
		$('.xeromod').click(function(e) {
			if($(e.target).val() == "Open" || $(e.target).val() == "Close") {
				$('#moderator_options > select[name="action"]').val('openclosethread');
				$('#moderator_options').submit();
			} else if($(e.target).val() == "Junk") {
				$('#moderator_options > select[name="action"]').val('1');
				$('#moderator_options').submit();
			} else if($(e.target).val() == "Thread Notes") {
				$('#moderator_options > select[name="action"]').val('threadnotes');
				$('#moderator_options').submit();
			} else if($(e.target).val() == "Move") {
				$('#moderator_options > select[name="action"]').val('move');
				$('#moderator_options').submit();
			}
		});
	}
} else if(pageTitle.contains("moderation.php") && $('.active:contains("Move or Copy Thread")').length) {
	var inputs = '<input type="button" class="bitButton xeromove" value="Lounge" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Movies, TV, and Videos" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Melody, Harmony, Rhythm, and MP3" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Member Contests" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Beginner Hacking" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Cryptography, Encryption, and Decryption" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Miscellaneous Computer Talk" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Free Graphic Requests" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Graphics Market" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Free Services and Giveaways" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Deal Disputes" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Partnerships, Hiring, and Personnel" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Currency Exchange" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Monetizing Techniques" />';

	$('select[name="moveto"]').css('height', '100%').after('<div style="display:inline-block;">' + inputs + '</div>');
	
	$('.xeromove').click(function(e) {
		var inputval = $(e.target).val();
		if(inputval == 'Movies, TV, and Videos') {
			$('select[name="moveto"]').val('32');
		} else if(inputval == 'Melody, Harmony, Rhythm, and MP3') {
			$('select[name="moveto"]').val('37');
		} else if(inputval == 'Member Contests') {
			$('select[name="moveto"]').val('155');
		} else if(inputval == 'Beginner Hacking') {
			$('select[name="moveto"]').val('4');
		} else if(inputval == 'Cryptography, Encryption, and Decryption') {
			$('select[name="moveto"]').val('126');
		} else if(inputval == 'Miscellaneous Computer Talk') {
			$('select[name="moveto"]').val('8');
		} else if(inputval == 'Free Graphic Requests') {
			$('select[name="moveto"]').val('158');
		} else if(inputval == 'Graphics Market') {
			$('select[name="moveto"]').val('219');
		} else if(inputval == 'Free Services and Giveaways') {
			$('select[name="moveto"]').val('186');
		} else if(inputval == 'Deal Disputes') {
			$('select[name="moveto"]').val('111');
		} else if(inputval == 'Partnerships, Hiring, and Personnel') {
			$('select[name="moveto"]').val('217');
		} else if(inputval == 'Currency Exchange') {
			$('select[name="moveto"]').val('182');
		} else if(inputval == 'Monetizing Techniques') {
			$('select[name="moveto"]').val('120');
		} else if(inputval == 'Lounge') {
			$('select[name="moveto"]').val('25');
		}
		
		$('input[name="submit"]').click();
	});
}