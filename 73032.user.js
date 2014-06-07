// ==UserScript==
// @name			IMDB - share vote on Facebook, Twitter, Tumblr
// @namespace		http://userscripts.org/users/6623/scripts
// @description		Adds links to IMDB title pages that let you share your vote details on Facebook and/or Twitter
// @grant			none
// @version			2.0.3
// @include			http://*.imdb.com/title/*/*
// @include			http://*.imdb.com/title/*/#*
// @include			http://*.imdb.com/title/*/combined*
// @include			http://*.imdb.com/title/*/maindetails*
// @include			http://imdb.com/title/*/*
// @include			http://imdb.com/title/*/#*
// @include			http://imdb.com/title/*/combined*
// @include			http://imdb.com/title/*/maindetails*
// ==/UserScript==
findPattern = "//td[@id='overview-top']//span[@class='rating-rating rating-your']/span[@class='value']";
voteResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

// only put it in if they've voted
if (voteResults.snapshotItem(0) != null && voteResults.snapshotItem(0).innerHTML != "") {

	var shareFacebookUrl;
	var twitterImage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16%00%00%00%16%08%06%00%00%00%C4%B4l%3B%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%16tEXtCreation%20Time%0011%2F14%2F09%BF%DE%EA%09%00%00%00%1CtEXtSoftware%00Adobe%20Fireworks%20CS4%06%B2%D3%A0%00%00%02sIDAT8%8D%A5%94%BFN%1BA%10%87%BF%D9%BD%BF6%96%12%D9%08R%40%104%E9%E9x%00%FA%BC%01%E9%C2%03Di%A1%23R%DA%94(y%03%5E%C4M%9AH)%EC%10P%04%C11I%04g%CE%DE%BD%DB%14%86%C3%F6%19%C7%12%23%ADno%B4%F3%CDoggW%00%9A%CD%E6%0E%B0%07%3C%E7q%F6%1D%D8%DB%DC%DC%FC%24%CDfs%A7%5E%AF%7F%5C%5C%5C%A4Z%AD%3E%8A%9A%24%09%9DN%87n%B7%FBJ%01%FB%8DF%83J%A5%82s%EEQ%A3R%A9%D0h4%00%F6%3D%605%8Ec%F2%3C%2F2%3B%E7%E8%D9%9C%CC%099%A0%C8%09%04BO%23%223U%C7q%0C%B0%EA%01%D3%A1%A2%0B_%8E%22u%90%0D%0C%D1%1Cp%00%0F%20%CB%B2%C2a%8C%C1*%0F%11x%DD%F2h%A7%C2%CBz%CE%EEr%C6%C0d%B8%3CGk%8D%C2%A1f%24()6%C6%20q%04%40%3B%1D%06%B6n%BF%12%84X%C0%DE-%CE%2C%81%CB%D1%AA%9C%A0%04%B6%D6%A2'%16%5Dg%F09%19%0F%5E%0E%60%C9%F7%E8%5BC%60-J%A9%D9%60%E7%5C)%7B%3B%15%DE%1C%7Bc%BE%AA%86%A3%17%06%B4%C7%A0%D7%23%08%82%D9%E0%D1%F9%2CKn%8FED0%D6%E2y%E3%89%E7%02W5lD%F7%3BYP%8E%ED%A7%C3%FF%C1M%0F%97%E7%A5%B8%B9%C0%1B%91%E3%FD%9A-%F9%AD1%5Cu%3B%2CT%2B%A58u%07%1B%1D%93%D6J%A5%E8%8C1U%BEO%18W%0AA%A3%F1S%15%5B3%C0%F3%03%96%7C%C7O%23%24%19%EC%B6%EEkX%D5%B0%FDd%D8%DB%E1B%0D%7B%FD%F7%FF%8A%9Ds%A4%BD%1E%00%BB%CF%A6%1Fd%92%C1Qw%D8%5E~%18a%AD-).%81E%84%AB%EE%05%D6%0C%D8%AA%E5%EC%ADf%2C%F9%E5%16%5C%BF%3D%CCAz3%15%5C*%85%88%A0%95%E2%EC%B8%CD%F2%DA%3A%5B%B5%80%AD%DA%C3-%98%26%09%CE%B9%E9%A5%C8%B2%AC%18%CE9%7C%DFG%0B%9C%7C%FD%C2%9F_%1D%06%FD~%09x%D3K%B8%BC8%E7%F7%C5%19%93%8C%A9%8A%EFT%87a%08%C0%E5%F9%0F%CEO%BE%15%F5%2Fv%A55a%18%12%C71%222%B5%8FO%AD%B5%2B%93w%5DD%08%82%00%AD5Q%14%95%AE%BAR%0A%AD5Z%EB%E2%A1%1F%11y%EA%01%07%FD~%FF%83%EF%FB%A5%87%04(%82%1F%B2I%A81%06%E0%C0%03%0E%8D1b%8Cy%2B%22%2B%0F%12%E60%E7%DC)%F0%0E8%FC%07%D1%F9%B9%E7%E4%1EXf%00%00%00%00IEND%AEB%60%82";
	var facebookImage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%3C%00%00%00%12%08%02%00%00%00%888*c%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%03%1F%109%1DA%0F%EA%E3%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%EBIDATH%C7%D5W1h%DB%40%14%7D.N%20%A5p%A4%93%05%96E(%0Dd%B9%E1V%E1%A5dR)h%F4%A0M%5B%84%A7%22%BA%04O%EE%10D%E8%20%04%5D4%144h4%98xN%10Z%1AP%40%D9RJQ.%20O%A6%82N%E9%D2%C1%B1%EC%D8%10%D5I%13Wo%12%DC%FF%BA%C7%7B%EF%9Ft%95%9D%DD%0E%CA%86*%80%BA(-%D5%F3%FB%FA%D7%DA%FA%8BU1%BE%E2I%15%C0%F3%8D%F5%A5%DA%B2%EB%A5%5B%FE-%9E%A1%84%A8%DE%BD%BCU%DF%EC%EC%BD%D9%24%1B%00%3E~%3E%3E%3D%BF%FA%1FH%17(%9D3%BE%0FX%B3%E7h%26%7Br%A5%C7%8C%3F%7D%09O%BE%FE(%7C%97%ACO)%F2A%BF%9D%AE(%1E7%03%3B%CC%0Ak%C4%B7%EFL%86%D0%F5%AC%08%10%E8c%08%5CL%BA%E7h%F9%F3%E1%07%A50%D3%8D%1A%01%20%2B%D4%8Fb%9E%C6%D6%11%C0n%E4%97u%00%99%DF%ED%FBB%B3%A7O%8E%D74nwc%0E%C9t%9Ar%14%B4%87%D4V~ZF%80%A9%5D%89e%04%E1%A3%9E%1E%E1%20%E6%00%04j%3B%DAl%94C%D7S%DD%04%202%23%88%02%D5%F0T%C3S%DD%04%02m%B1i%FAm%85L%EC%CA%FC%AE%A7%1AA%08%C9%D4%A5%E5%94V%0D%2F%D7%FB%FD%C1%E0%FB%E5%A8%80u%1A%B7%8Dx%BC%B1%AD%10Y%A1%FE%60%A1F%A0%F6%3E%15%17%7B%A3%40u%93%B1-%00Z%FBZ%EB%E1%99%FE%1B%C8z%13n%10%02%3CJ%B8B%C54%E3%20%F35%0A%15%C7%A6%B3%99%9C%CC%E0r%98%01%F0%BB%7D%3F%7D%12%D2%80d%3A%92%99%AB%EE%26%60%8D%F9%08%9D%25%26%9B)%5B%00%3F%EA%5B5%CD%CC%95%9E80%87%CA%CEng%7B%FB%F5%DD%E38%17%8F%2C%1B%11%F2rU_%96%8B%8BoU%00%AF%1A%05%0C%EA%B5%5BFG%E7%23%AC%14%A5%FC%F7(%25%E9J%19%2F%01%7F%00%60%01%B7%01k%B6%83%26%00%00%00%00IEND%AEB%60%82";
	var tumblrImage = "data:image/gif;base64,R0lGODlhEAAQAOZuAD9cdyA3TT5bdkBdeCA3Tj1adTZSbCI6VEFeeUtphDhVb0VjfiM7UjdTbiE4T0dlgEhmgjxYc0lnglZfajRQazlVcENgezpWcbrAxzxZdDtYcyM6UT5adSQ7UkRhfDNPaUhlgUJgezlWcDdUbsDJ1FBpgSI5UCE5UL3EzlZtgz1ZdOHh5UFfepadpt/i6Ofo7cDI0is8TVljbjtXcj9JVi8/UTZSbbS6w3CHnTdTbThUbkVifTpXckdlgUlmgkdkgEpngzZTbSs6Sr/I0TpXcV9wgkZkf2V6j0JfejRJXjNMYzhPZUBbdDtYckFbc46hsuHm7D1YcWZ/lkRifUZkgCI6UUpogzVJXrvEzkhmgThUb4WZrOHl7EVifqu0v72/xba9xipDYENhfEZjf0lngyg0QkpohDRQajVRax82TUtphd/f4+vu8yg/WP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAG4ALAAAAAAQABAAAAfYgG5tg4SFhYIHZooJao2OjWEdbT4SZJZQbE6KZoxqkg8PPSBbbGxllZZAVgxtCwtjT1ylMjhSIFkQEKxiHh6lv2wwTEZUPxttCCxIQy6lGBgtNVM7XccAAANRKKVlSVdLIRYWVW0FBRwCJGwvZdgDAwgIJm1NGhERWCtrZecC/gAn2lQQceECmDVrJmg4UiJDBhUO2jQYoUOLF4QYixDhMSOigY82UtzA+IWGAgUVCLQ5QwGNSyUxJpQpIyRIjgYqD3z4cKZnz5Yu0Rwg4CaN0aNIAygN4CYQADs=";
	var voteValue = parseInt(voteResults.snapshotItem(0).innerHTML);
	var movieName = getMovieName();
	var imdbUrl = "http://www.imdb.com/title/tt"+getIMDBid();

	var shareFacebookUrl = 'http://www.facebook.com/dialog/feed?app_id=216735281691205&link='+imdbUrl+'&caption=I gave the film "'+movieName.replace(/&/, '%26')+'" a rating of %3Cb%3E'+voteValue+'/10%3C/b%3E on IMDb.&redirect_uri='+imdbUrl+getMovieImageUrl();
	var shareTumblrUrl = 'http://www.tumblr.com/share?v=3&amp;u=' +escape(imdbUrl)+ '&t=&s=I%20gave%20the%20film%20' +movieName.replace(/&/, '%26')+ '%20a%20rating%20of%20' +voteValue+ '/10%20on%20IMDb.';
	var shareTwitterUrl = 'http://twitter.com/intent/tweet?url='+escape(imdbUrl)+'&text=gave the film %22'+movieName.replace(/&/, '%26')+'%22 a rating of '+voteValue+'/10 on %23IMDb';

	addedDivFBLink = document.createElement('div');
	addedDivFBLink.innerHTML = '<span><strong>Share</strong> your vote:</span><a title="Share on Facebook" target="_blank" href=\''+shareFacebookUrl+'\'><img src="'+facebookImage+'" alt="Share on Facebook"></a> <a target="_blank" id="GM_twitter_link" title="Share on Twitter" href=\''+shareTwitterUrl+'\'><img src="'+twitterImage+'" alt="Share on Twitter"></a> <a target="_blank" title="Share on Tumblr" href=\''+shareTumblrUrl+'\'><img src="'+tumblrImage+'" alt="Share on Tumblr"></a>';
	addedDivFBLink.setAttribute('id','GM_ShareVoteOnFacebook');

	findPattern = "//div[@class='social']";
	placementResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	placementResults.snapshotItem(0).parentNode.insertBefore(addedDivFBLink, placementResults.snapshotItem(0));
}

function getIMDBid() {
	var regexImdbNum = /\/title\/tt(\d{7})\//;
	id = regexImdbNum.exec(document.location);
	return id[1];
}

function getMovieName() {
	const $xpath = '//h1/span[@itemprop="name"]/text()';
	var $nodes = document.evaluate($xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return encodeURI($nodes.singleNodeValue.data.replace(/^\s\s*/, '').replace(/\s\s*$/, '')).replace(/'/, '%27');
}

function getMovieImageUrl() {
	findPattern = '//td[@id="img_primary"]/div[@class="image"]/a/img[@itemprop="image"]';
	imageResults = document.evaluate( findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	if (imageResults.snapshotItem(0) != null) {
		return '&picture=' + encodeURI(imageResults.snapshotItem(0).src); // debug!
	}
	else {
		return '';
	}
}