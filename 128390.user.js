// ==UserScript==//
// @name           Brewing Company Site Auto Age Gate
// @namespace      https://gist.github.com/2045030
// @description    Automatically bypass brewing company website age gates
// @include        http://*newbelgium.com*
// @include        http://*stonebrew.com*
// @include        http://*boulevard.com*
// @include        http://*sierranevada.com*
// @include        http://*samueladams.com*
// @include        http://*lagunitas.com*
// @include        http://*deschutesbrewery.com/age
// @include        http://*jollypumpkin.com/artisanales*
// @include        http://*schlafly.com*
// @include        http://*southerntierbrewing.com*
// @include        http://*3floyds.com*
// @include        http://*bellsbeer.com*
// @include        http://*foundersbrewing.com*
// @include        http://*gooseisland.com*
// @include        http://*lefthandbrewing.com/verify-age*
// @include        http://*dogfish.com*
// @include        http://*troegs.com*
// @include        http://*terrapinbeer.com*
// @include        http://*bearrepublic.com*
// @include        http://*fortcollinsbrewery.com*
// @include        http://*hillfarmstead.com*
// @include        http://*avbc.com/main/wp-content/plugins/age-verification*
// @include        http://*odellbrewing.com*
// @include        http://*summitbrewing.com*
// @include        http://*hereticbrewing.com*
// @include        http://*uintabrewing.com*
// @include        http://*wychwood.co.uk*
// @include        http://*firestonebeer.com*
// @include        http://*magichat.net*
// @include        http://*ballastpoint.com*
// @include        http://*brooklynbrewery.com/verify
// @include        http://*aleasylum.com*
// @include        http://*skabrewing.com*
// @include        http://*thebruery.com*
// @include        http://*oskarblues.com*
// @include        http://*saranac.com/age-check*
// @include        http://*coors.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// ==/UserScript==

var $jq = $.noConflict();

$jq(document).ready(function(){
	var url = document.URL;
	
	// New Belgium
	if (url.match(/newbelgium.com/)) {
		if ($jq('#textInputMonth, #textInputDay, #textInputYear').size() == 3) {
			$jq('#textInputMonth, #textInputDay').val(1);
			$jq('#textInputYear').val(1900);
			$jq('[id$=ButtonConfirm]').click();
		}
	}
	// Stone
	else if (url.match(/stonebrew.com/)) {
		var $homelink = $jq('.button21[href="home.asp"]');
		
		if ($homelink.size() == 1) {
			window.location.href = $homelink.attr('href');
		}
	}
	// Boulevard
	else if (url.match(/boulevard.com/)) {
		if ($jq('#txtMonth, #txtDay, #txtYear').size() == 3) {
			$jq('#txtMonth, #txtDay').val(1);
			$jq('#txtYear').val(1900);
			$jq('#btnEnter').click();
		}
	}
	// Sam Adams
	else if (url.match(/samueladams.com/)) {
		if ($jq('[id$=month], [id$=day], [id$=year]').size() == 3) {
			$jq('[id$=month], [id$=day]').val(1);
			$jq('[id$=year]').val(1900);
			$jq('[id$=btnEnter]').click();
		}
	}
	// Lagunitas
	else if (url.match(/lagunitas.com/)) {
		var $img = $jq('img[src="images/verify_21.gif"]');
		if ($img.size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Deschutes
	else if (url.match(/deschutesbrewery.com/)) {
		if ($jq('#edit-month, #edit-day, #edit-year').size() == 3) {
			$jq('#edit-month, #edit-day').val('01');
			$jq('#edit-year').val(1900);
			$jq('#edit-agree-age').click();
		}
	}
	// Jolly Pumpkin
	else if (url.match(/jollypumpkin.com/)) {
		var $area = $jq('map[name="Map2"] area');
		if ($area.size() == 1) {
			window.location.href = $area.attr('href');
		}
	}
	// Schlafly
	else if (url.match(/schlafly.com/)) {
		if ($jq('#month, #day, #year').size() == 3) {
			$jq('#month, #day').val(1);
			$jq('#year').val(1900);
			$jq('#submit_age').click();
		}
	}
	// Southern Tier
	else if (url.match(/southerntierbrewing.com/)) {
		if (window.location.href.match(/index1.html/)) {
			window.location.href = 'index2.html';
		}
	}
	// 3 Floyds
	else if (url.match(/3floyds.com/)) {
		if ($jq('#legal').size() == 1) {
			window.location.href = 'agree.php';
		}
	}
	// Bell's
	else if (url.match(/bellsbeer.com/)) {
		var $a = $jq('#agePrompt a:first');
		if ($a.size() == 1) {
			$a.click();
		}
	}
	// Founders
	else if (url.match(/foundersbrewing.com/)) {
		var $a = $jq('#verify-yes');
		if ($a.size() == 1) {
			$jq('#verify_wrap').fadeOut();
			$jq('#verify_bg').fadeOut(); 
			$jq.cookie('founders-age', 'of-age', { path: '/' });
		}
	}
	// Goose Island
	else if (url.match(/gooseisland.com/)) {
		var $img = $jq('img[src="filebin/images/yes_btn.gif"]');
		if ($img.size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Left Hand
	else if (url.match(/lefthandbrewing.com/)) {
		if ($jq('#form-month, #form-day, #form-year').size() == 3) {
			$jq('#form-month, #form-day').val(1);
			$jq('#form-year').val(82);
			$jq('form[action="/verify-age"]').submit();
		}
	}
	// Dogfish Head
	else if (url.match(/dogfish.com/)) {
		var agegate = $jq.cookie('dogfish_agegate');
		if (agegate != 1) {
			$jq.cookie('dogfish_agegate', 1, { page: '/' });
		}
		
		setTimeout(dogfish, 1000);
	}
	// Troegs
	else if (url.match(/troegs.com/)) {
		var over21 = $jq.cookie('over21');
		
		if (over21 == null) {
			$jq.cookie('over21', '', { page: '/' });
			$jq('#is21overlay, #Tonecheck').remove(); // NOTE: this breaks some of troeg's JS but screw them for not handling missing elements properly
		}
	}
	// Terrapin
	else if (url.match(/terrapinbeer.com/)) {
		var over21 = $jq.cookie('legal-age');
		
		if (over21 == null) {
			$jq.cookie('legal-age', 'yes', { page: '/' });
		}
	}
	// Bear Republic
	else if (url.match(/bearrepublic.com/)) {
		var $img = $jq('img[src="images/yes.gif"]');
		
		if ($img.size() == 1 && $jq('font:contains("21 or older")').size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Fort Collins
	else if (url.match(/fortcollinsbrewery.com\/?$/)) {
		var $img = $jq('img[src="images/yes.jpg"]');
		
		if ($img.size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Hill Farmstead
	else if (url.match(/hillfarmstead.com/)) {
		var $a = $jq('a:contains("YES")');
		
		if ($a.size() ==1 && $jq('h1:contains("ARE YOU 21 YEARS OF AGE OR OLDER?")').size() == 1) {
			window.location.href = $a.attr('href');
		}
	}
	// Anderson Valley
	else if (url.match(/avbc.com/)) {
		var cname = 'cws_age_verification_dob';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, '1900-01-01', { path: '/main/'});
			window.location.href = '/';
		}
	}
	// Odell
	else if (url.match(/odellbrewing.com/)) {
		var $img = $jq('img[src="/images/entrance/over_21.jpg"]');
		
		if ($img.size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Summit
	else if (url.match(/summitbrewing.com/)) {
		$jq('#age_verify_link').remove(); // short-circuits the age verification popup
	}
	// Heretic
	else if (url.match(/hereticbrewing.com\/?$/)) {
		if ($jq('td:contains("legal drinking age")').size() >= 1) {
			window.location.href = $jq('.link-home a').attr('href');
		}
	}
	// Uinta
	else if (url.match(/uintabrewing.com/)) {
		var cname = 'State';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, 'hide', { path: '/'});
			window.location.reload();
		}
	}
	// Wychwood
	else if (url.match(/wychwood.co.uk/)) {
		if ($jq('#date_dd, #date_mm, #date_yy').size() == 3) {
			$jq('#date_dd, #date_mm').val(1);
			$jq('#date_yy').val(1900);
			$jq('form[action="http://www.wychwood.co.uk/enter"]').submit();
		}
	}
	// Firestone Walker
	else if (url.match(/firestonebeer.com/)) {
		var $a = $jq('#enter_button');
		if ($a.size() == 1) {
			window.location.href = $a.attr('href');
		}
	}
	// Magic Hat
	else if (url.match(/magichat.net/)) {
		var cname = 'dob';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, '1980-07-04', { path: '/'});
			window.location.reload();
		}
	}
	// Ballast Point
	else if (url.match(/ballastpoint.com/)) {
		var cname = 'ageVerification';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, 'Verified', { path: '/'});
			$jq('#TB_overlay, #TB_window').remove();
		}
	}
	// Brooklyn Brewery
	else if (url.match(/brooklynbrewery.com/)) {
		var cname = 'of_age';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, 'true', { path: '/'});
			window.location.href = '/';
		}
	}
	// Ale Asylum
	else if (url.match(/aleasylum.com/)) {
		var cname = 'splash';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, '1', { path: '/', domain: 'aleasylum.com' });
			$jq.cookie(cname, '1', { path: '/', domain: 'www.aleasylum.com' });
			
			window.location.reload();
		}
	}
	// Ska Brewing
	else if (url.match(/skabrewing.com/)) {
		var $img = $jq('img[src="images/age.gif"]');
		if ($img.size() == 1) {
			window.location.href = $img.parent('a').attr('href');
		}
	}
	// Bruery Rugbrod
	else if (url.match(/thebruery.com\/?$/)) {
		window.location.href = 'index2.html';
	}
	// Oskar Blues
	else if (url.match(/oskarblues.com/)) {
		var $div = $jq('#age_verifier');
		if ($div.size() == 1) {
			$div.click();
		}
	}
	// Saranac
	else if (url.match(/saranac.com/)) {
		var $month = $jq('input[name=month]');
		var $day = $jq('input[name=day]');
		var $year = $jq('input[name=year]');
		
		if ($month && $day && $year) {
			$month.val(1);
			$day.val(1);
			$year.val(1900);
			$jq('input:submit').click();
		}
	}
	// Coors
	else if (url.match(/coors.com/)) {
		var cname = 'mcacdob';
		var c = $jq.cookie(cname);
		
		if (c == null) {
			$jq.cookie(cname, '01011900', { path: '/' });
			$jq.cookie('mcacstate', 'AL', { path: '/' });
			window.location.href = '/';
		}
	}
});

function dogfish() {
	$jq('[id*=agegate]').remove();
}