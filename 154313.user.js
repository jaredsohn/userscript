// ==UserScript==
// @name        movie2k Pr0n
// @namespace   m2k
// @description displays all pages on one single page (searchable) and shows localized movies from m2k pr0n list. 
// @match     	http://www.movie2k.to/xxx*
// @version     1
// @grant       none
// ==/UserScript==


$(function() {
	$('#maincontent4 div#boxgrey,#maincontent4 div#boxwhite,br').remove();

	//the number of pages to scrape for each letter of the alphabet (depends on the line speed)
	//save the html after scraping!! (File->Save Webpage), so you do not produce so much traffic each time for m2k. Thats not worth it...
	var limit = 5;

	//your preferred country (lowercase!!)
	var country = 'italy';
	
	var flagicon;
	if (country == 'germany') { flagicon = 'us_ger_small' } else { flagicon = 'flag_'+country; }
	
	var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60];

	$(alphabet).each(function(index,letter) {
		$(numbers).each(function(index,number) {
			if (number > limit) return;
			$('#maincontent4')
					.append($('<table id="tablemoviesindex" style="clear: both;"/>')
					.load(
						'http://www.movie2k.to/xxx-all-'+letter+'-'+number+'.html tr[id*=coverPreview]', 
						function(response,status,xhr) { 
							if (status=='error') return false;
							$('td[align=right] img:not([src*='+flagicon+'])').parent().parent().remove(); 
			}));
		})
	})
	

	
})


