// ==UserScript==
// @name			HackForums Moderation Packs
// @namespace		xerotic/hfmpmp
// @description		Moderation pack to help Mentors/Staff/Admins on HF.
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include			*hackforums.net*
// @version			1.1
// @grant			none
// @run-at 			document-end
// ==/UserScript==

var $j = jQuery.noConflict();

String.prototype.contains = function (arg) {
	return (this.indexOf(arg) >= 0) ? true : false;
}

pageTitle = location.href;
if(pageTitle.contains("showthread.php")) {
	if(!$j('#container').find('script[src*="inline_moderation"]').length) {
		$j('div[style*="float: right"]').each(function() {
			$j(this).children().children().prepend('<a href="#copyright">Down</a> - ');
		});
	} else {
		$j('div[style*="float: right"]').each(function() {
			$j(this).children().children().prepend('<a href="javascript:void(0);">Junk</a> - <a href="#copyright">Down</a> - ');
		});
		$j('a:contains("Junk")').click(function(e) {
			var $jourCheck = $j(e.target).parent().parent().find('input[name^="inlinemod_"]');
			if(!$jourCheck.is(':checked')) {
				$jourCheck.click();
			}
			$j('input[name="go"]').click();
		});
		
		$j('input[name^="inlinemod_"]').each(function() {
			$j(this).css('cursor', 'pointer').prev().css('cursor', 'auto').parent().parent().prev().css('cursor', 'auto').parent().parent().css('cursor', 'pointer').not('input[td^="inlinemod_"]').click(function(e) {
				if(!$j(e.target).is('a') && !$j(e.target).is('input')) {
					$j(e.target).find('input[name^="inlinemod_"]').click();
				}
			});
		});
		
		if($j('a[title="Thread Closed"]').length) {
			var openclose = "Open";
		} else {
			var openclose = "Close";
		}
		
		$j('.pagination').css('display', 'inline-block');
		
		$j('.quick_keys').find('div[id^="success_rating_"]').before('<div style="display:inline-block;float:left;"><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="' + openclose + '" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Junk" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Thread Notes" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Move" /></div>');
		
		$j('input[value="Clear"]').before('<div style="display:inline-block;float:left;"><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="' + openclose + '" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Junk" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Thread Notes" /><input style="cursor:pointer;" type="button" class="bitButton xeromod" value="Move" /></div>');
		
		$j('.xeromod').click(function(e) {
			if($j(e.target).val() == "Open" || $j(e.target).val() == "Close") {
				$j('#moderator_options > select[name="action"]').val('openclosethread');
				$j('#moderator_options').submit();
			} else if($j(e.target).val() == "Junk") {
				$j('#moderator_options > select[name="action"]').val('1');
				$j('#moderator_options').submit();
			} else if($j(e.target).val() == "Thread Notes") {
				$j('#moderator_options > select[name="action"]').val('threadnotes');
				$j('#moderator_options').submit();
			} else if($j(e.target).val() == "Move") {
				$j('#moderator_options > select[name="action"]').val('move');
				$j('#moderator_options').submit();
			}
		});
	}
} else if(pageTitle.contains("moderation.php") && $j('.active:contains("Move or Copy Thread")').length) {
	var inputs = '<input type="button" class="bitButton xeromove" value="Lounge" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Remote Administration Tools" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Keyloggers" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Member Contests" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Beginner Hacking" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Cryptography, Encryption, and Decryption" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Miscellaneous Computer Talk" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Website and Forum Hacking" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="VPN, Proxies, and Socks" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Free Services and Giveaways" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Partnerships, Hiring, and Personnel" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Currency Exchange" /><br />';
	var inputs = inputs + '<input type="button" class="bitButton xeromove" value="Monetizing Techniques" />';
    var inputs = inputs + '<input type="button" class="bitButton xeromove" value="iOS and iDevices" />';

	$j('select[name="moveto"]').css('height', '100%').after('<div style="display:inline-block;">' + inputs + '</div>');
	
	$j('.xeromove').click(function(e) {
		var inputval = $j(e.target).val();
		if(inputval == 'Remote Administration Tools') {
			$j('select[name="moveto"]').val('114');
		} else if(inputval == 'Keyloggers') {
			$j('select[name="moveto"]').val('113');
		} else if(inputval == 'Member Contests') {
			$j('select[name="moveto"]').val('155');
		} else if(inputval == 'Beginner Hacking') {
			$j('select[name="moveto"]').val('4');
		} else if(inputval == 'Cryptography, Encryption, and Decryption') {
			$j('select[name="moveto"]').val('126');
		} else if(inputval == 'Miscellaneous Computer Talk') {
			$j('select[name="moveto"]').val('8');
		} else if(inputval == 'Website and Forum Hacking') {
			$j('select[name="moveto"]').val('43');
		} else if(inputval == 'VPN, Proxies, and Socks') {
			$j('select[name="moveto"]').val('91');
		} else if(inputval == 'Free Services and Giveaways') {
			$j('select[name="moveto"]').val('111');
		} else if(inputval == 'Partnerships, Hiring, and Personnel') {
			$j('select[name="moveto"]').val('217');
		} else if(inputval == 'Currency Exchange') {
			$j('select[name="moveto"]').val('182');
		} else if(inputval == 'Monetizing Techniques') {
			$j('select[name="moveto"]').val('120');
		} else if(inputval == 'Lounge') {
			$j('select[name="moveto"]').val('25');
		} else if(inputval == 'iOS and iDevices')      {
			$j('select[name="moveto"]').val('137');
		}
		
		$j('input[name="submit"]').click();
	});
}