// ==UserScript==
// @name            youtubr
// @description     If flickr photo description contains link to YouTube video, this script adds a button beneath flickr photo to toggle between flickr photo and YouTube video inside the same page.
// @author          Edward Grech
// @namespace       http://dwardu.info/
// @include         http://flickr.com/photos/*
// @include         http://www.flickr.com/photos/*
// @version         0.11
// ==/UserScript==

// For more info visit the youtubr group on flickr at http://flickr.com/groups/youtubr/

(function() {
	unsafeWindow.youtubr_setState = function(state) {
		f = document.getElementById('youtubrImage').style;
		y = document.getElementById('youtubr_youtubePlayerDiv').style;
		toggleButtonImage = document.getElementById('youtubr_toggleButtonImage');
		if(state == 'f') {
			f.visibility = 'visible';
			y.visibility = 'hidden';
			toggleButtonImage.title = 'Switch to YouTube video';
			toggleButtonImage.src = unsafeWindow.youtubr_youtubeLogo; 
			document.getElementById('photo_notes').style.display = 'inline';
		} else if(state == 'y') {
			f.visibility = 'hidden';
			y.visibility = 'visible';
			toggleButtonImage.title = 'Switch to flickr photo';
			toggleButtonImage.src = unsafeWindow.youtubr_flickrLogo; 
			document.getElementById('photo_notes').style.display = 'none';
		} else if(state == 't') {
			if(f.visibility == 'hidden') {
				unsafeWindow.youtubr_setState('f');
			} else {
				unsafeWindow.youtubr_setState('y');
			}
		}
	}

	// Set buttons' image data as globals so that they are accessible from youtubr_setState()
	unsafeWindow.youtubr_youtubeLogo = "data:image/gif,GIF89a%2C%00%10%00%F7%00%00%00%00%00%FF%FF%FF%FA%FF%FF%FC%FF%FF%F3%F5%F5%FA%FB%FB%C9%0F%0F%E9%13%13%F3%17%17%E0%16%16%CB%14%14%FA%1A%1A%FF%1B%1B%FF%1C%1C%CC%17%17%FC%1D%1D%CB%17%17%CC%19%19%CD%1A%1A%FC!!%E0%1D%1D%DF%1D%1D%D4%1C%1C%E9%1F%1F%F3%23%23%CD%1D%1D%FA%25%25%CD%1E%1E%CE%1F%1F%FF''%EA%24%24%FF((%D6%23%23%CE!!%FC**%FF%2B%2B%F5**%EA((%F3**%E1''%D6%25%25%FF..%FA--%D6''%F6..%FF00%F3..%FF22%FF33%FC33%D6%2B%2B%FF55%FB55%D7..%FF77%F455%EB44%E222%FD99%C7--%FA99%C8..%FE%3B%3B%FD%3B%3B%D722%C7..%F8%3D%3D%FE%3F%3F%FFAA%CA44%FFBB%FCBB%F7AA%F3%40%40%FFGG%FDHH%FBGG%D8%3D%3D%F5FF%FAJJ%FDMM%CD%3F%3F%FFOO%E8HH%FFPP%FDPP%FCOO%DCEE%FAPP%F9OO%F4NN%FESS%CECC%FFTT%FCSS%F4TT%FFZZ%FB%5D%5D%FF__%FD__%D0NN%EE%5B%5B%F9bb%D1RR%FFff%FFhh%FFkk%DC%5E%5E%D4%5B%5B%E6cc%FFoo%FBmm%FEqq%F6oo%FFvv%FFxx%FFzz%FF%7C%7C%FD%7B%7B%D8ii%F9%7B%7B%FF%7F%7F%F7%7B%7B%FD%81%81%FB%80%80%EFzz%FC%85%85%FF%88%88%FF%8A%8A%FD%8B%8B%FA%89%89%F0%84%84%FF%8D%8D%E1~~%F8%8D%8D%E1%82%82%FC%94%94%F1%8E%8E%FF%9B%9B%F6%95%95%FF%9F%9F%FF%A8%A8%E3%95%95%F2%A1%A1%FF%AE%AE%FF%B1%B1%F8%AE%AE%EC%A6%A6%FF%B7%B7%F3%AE%AE%EC%A9%A9%F5%B2%B2%FF%BD%BD%FC%BC%BC%FF%BF%BF%FF%C1%C1%FC%C0%C0%FF%C4%C4%F6%BE%BE%EE%BD%BD%FD%CA%CA%FF%CD%CD%FF%CE%CE%F0%C2%C2%FC%CD%CD%FD%CF%CF%F7%CB%CB%FF%D6%D6%F0%CE%CE%FB%DA%DA%F7%D8%D8%FF%E0%E0%F1%D6%D6%FF%E7%E7%FA%E3%E3%FD%EB%EB%FE%ED%ED%FE%EF%EF%FC%ED%ED%FD%EF%EF%FA%ED%ED%F1%E4%E4%FF%F3%F3%FF%F6%F6%FA%F2%F2%FF%F9%F9%FF%FA%FA%FD%F9%F9%FF%FC%FC%FD%FB%FB%F2%F1%F1%FE%FE%FE%FC%FC%FC%F9%F9%F9%F6%F6%F6%F2%F2%F2%F1%F1%F1%EE%EE%EE%EA%EA%EA%E5%E5%E5%E2%E2%E2%E1%E1%E1%DE%DE%DE%DD%DD%DD%DB%DB%DB%D7%D7%D7%CF%CF%CF%CC%CC%CC%C9%C9%C9%C3%C3%C3%BC%BC%BC%B6%B6%B6%B0%B0%B0%A7%A7%A7%A3%A3%A3%98%98%98%96%96%96%93%93%93%8C%8C%8C%89%89%89%87%87%87%84%84%84%82%82%82%7D%7D%7DyyyuuurrrmmmkkkhhhgggeeeTTTPPPKKKGGGEEEBBBAAA%3F%3F%3F%3D%3D%3D%3A%3A%3A222---***%25%25%25!!!%1D%1D%1D%1A%1A%1A%18%18%18%16%16%16%14%14%14%13%13%13%10%10%10%09%09%09%FF%FF%FF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%2C%00%10%00%00%08%FF%00%03%08%1CH%B0%20A%5B%8C%E0%A4%11%D3%85%8A%14%23D%22*%91%02F%8D%9B%3C%7F%08%11%C2d%B0%A3G%5Dj%18%3C%98%40rD%0B%18(%5B%88%18%D2%05%0D%1D%40%8A%1AE%AA%03%89%20%B5h%01%8CYK%E6Q%A0%A8%0Ee%0E%15*t%E8K%8A%94H%0A9yAd%0B%9A9%80%18E%92sk%E08w%01%AA%D9c%D63%00%A4%06%88x%09%E4%E5%E7%03%CA%11a%06%BC%F9%F0b%86%91%96t%10%A5i5P%1A%BDd%E1%D0%09%FC%E5QQ%07%1BKdu%B2A%83%04%0C%16%1A%D2%9A%C1%A0%02%C6%08%16I%A0%A8%11sj%E0%B0x%D8%D6e%03%D6m%1D7%60%CD%CE%19%BB%B6-%00%A0%0F)l%C8%D2%C4%20%CE(%1D%8F%16y%E9U%09U%A2%0EZF%B1%1AtDI(%82%E2%E4%CDcF%AD%1E%B7z%D3%9E%DDSV.%5D%80%3A%1FZ%F8%90%B5%89%01%A1%00%3ENu%B2%F2%8B%D2%A9W1L%AD%FF%8A4%00K%87N6%FB%B5%FB%05n%5D%00v%DE%9C%D9SFN%AF%9C%E8%3Efmj%10%88%97%8FR%98T1%00%18%7B%E4%B2%04%2C%88%081%00%1C%0DhB%103%F9%84%13%408%ED%00%D3%CE7%CE%2C%D7%5C%00rt%D0%82%0E%B1%EC%D7%DF%0F%00V%11%C0%18%7B%E8%B2%C4*%B3%B8%F2%1C%03%0E%0E%84L%3E%DA%04%20%CE%3B%C0%BC%F3%CD3%FA%2Cs%8E%3A%01%D8%A1%81%0A%3C%C4%A2%C9%02%82%E8%C2%03%80Y%04%10%06%1F%BA0%D1%0A(~%E0%F1%84%06%E8%0D%94%CC%3E%A5%8D%03O%00%F0%80%F3%0C%3F%C7%98%E3%9E%20%18%90p%C3%2C%9C%20%90%A4%0B%A4d%A2E%00_%E8%A1%8B%13%B0%18b%82%24_%60%40%0AA%CA%F8%E3M%00%DC%E8C%0D%3F%D7%40%E3%0F6%F4%B8%B7%C8%05%25%E0%40%8B'%07%0CR%40%1F%B8%5C2%85%00%89TB%0B%0E%AAx2%C8%00ex%90%0AA%C9%E4S%DA1%F1%F8%03O1%CB%E0%8D%13O%3CzUR%C1%099%B0bI%02m%F8%F2%09*%93LQ%CB(%C4XBA%1B%B5%10%60%09%AE%AF%10%F4K1%C2%08%14%8C2%05%08t%8C0%C1%10%13%80)%16%80%80%02%105x%DB%C4%0A2%D4%F0-%08M%C8%00%82%05%404%B1%EE%15%BAt%D5%D3.k%18%00%81%03%11l%B0%81%04%1C%F4%1B%C2%06!d%90%01%07%198%A0%80%02%10L%22oW%B88r%07%1Bgp%11E%14%3D%EC%10%C4%C5%3B%1411%19g%B0q%C7'%03%05%04%00%3B";
	unsafeWindow.youtubr_flickrLogo = "data:image/gif,GIF89a%2C%00%10%00%D5%00%00%00%00%00%FF%FF%FF%FF%FC%FD%FF%96%CC%FF%DE%EF%FF%ED%F6%FF%00%84%FF%18%90%FF%1B%91%FF'%97%FFE%A5%FFN%AA%FFf%B5%FF%8A%C7%FF%C0%E1%FF%EF%F8%F6%F9%FE%D2%E3%F9%E7%F0%FC%00c%DC%06g%DD%0Cj%DE%1Eu%E0*%7D%E20%80%E33%82%E3%3C%88%E4%3F%8A%E5K%91%E6N%93%E7T%96%E8c%A0%EAf%A1%EAi%A3%EAo%A7%EB%81%B2%EE%87%B6%EF%8A%B7%EF%93%BD%F0%96%BF%F1%99%C1%F1%9F%C4%F2%AB%CC%F3%C0%D8%F6%D5%E5%F9%ED%F4%FD%CF%E2%F8%DE%EB%FA%E1%ED%FB%F0%F6%FD%F3%F8%FD%FC%FC%FC%F9%F9%F9%F3%F3%F3%ED%ED%ED%EA%EA%EA%E6%E6%E6%E0%E0%E0%DA%DA%DA%D7%D7%D7%D4%D4%D4%D1%D1%D1%FF%FF%FF%00%00%00!%F9%04%01%00%00%3E%00%2C%00%00%00%00%2C%00%10%00%00%06%FF%C0%800U%99L%02%92LF%14%60%A1P%2C%A1t%FAQJ%A6%3B%1C%AD%17%E8%CDt%5E!%C9h%0C%C0%8C%9C%C0%C9x%9A%BA5F%98%B4%D6%B5%E1%02%B7%9C-%2F%24%BF%84g%13i*J*nSp%13rR%3B%3C%3B%016%90%91%91%01dR%81i%87%9A%89%8B%9An%16d%96%98jlR%A0%96%9C%01%1FF%1D%01%03%06%06%01%B0%09%0F%A7%A1fh%A4%13m%10%A1e%9C-F%14B%AF%06%08%B0%0A%02%7De%80%B9k%BB%01%14F%19%80%01%9C%96%C4%B0%06%0B%05%04R%D8%B8%82%BAm%E0B%89%18F.R%C5%07%87%E0%A3%CF%E4%CCR%89%89%86%D9%06%0D%EE%F3%F0%A5d1%88%E2%80%2B6%60%DF%91f%E2%E2%05%08A%C6%03%8A%0D%D6%E2%3C%AB%80%AF%A0%9Bw%CEJ%05%B8%E0%2B%A2%A2JFF%B8%82eq%0A%88%93RZ%9C4%11%60%C5%C9%15RdT%C9P%22%40%89%93-%02D8%09%22%80%03%11%06%0C%1Cx%1AJ%B4%A8%D1%A3H%93*%5DZ4%08%00%3B";

	// Steal photo id from global
	photoId = unsafeWindow.page_photo_id;

	hrefsInDescription = document.evaluate("//div[starts-with(@id, 'description_div')]//a/@href", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	// Matches http://www.youtube.com/watch?v=
	// Matches http://youtube.com/watch?v=
	// Matches http://www.flickr.com/groups/youtubr/#v= for compatibility with youtubr v0.0 (to depreciate)
	youtubeRegex = /^http:\/\/((www\.|)youtube.com\/watch\?|www\.flickr\.com\/groups\/youtubr\/#)v=/i
	
	var youtubeCode = null;
	for(var i = 0; i < hrefsInDescription.snapshotLength; i++) {
		hrefInDescription = hrefsInDescription.snapshotItem(i).value;
		if(hrefInDescription.search(youtubeRegex) != -1) {
			youtubeCode = hrefInDescription.substring(hrefInDescription.search(/v=/i) + 'v='.length);
			break;
		}
	}
	//GM_log('Found reference to YouTube video '+youtubeCode);
	
	if(!youtubeCode)
		return;
		
	photoImgDiv = document.evaluate("//div[starts-with(@id, 'photoImgDiv')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	photoImg = photoImgDiv.firstChild;
	photoImg.id='youtubrImage';
	H = photoImg.height;
	W = photoImg.width;
	
	youtubePlayerDiv = document.createElement('div');
	youtubePlayerDiv.id = 'youtubr_youtubePlayerDiv';
	youtubePlayerDiv.style.height = 0; // there might be a neater way to do this...
	youtubePlayerDiv.innerHTML = '\
		<div style="position: relative; top: '+(-H)+'px; background-color: #eeeeee;">\
			<object width="'+W+'" height="'+H+'" type="application/x-shockwave-flash" data="http://www.youtube.com/v/'+youtubeCode+'" />\
				<param name="movie" value="http://www.youtube.com/v/'+youtubeCode+'" />\
				<param name="wmode" value="transparent" />\
			</object>\
		</div>';

	photoImgDiv.appendChild(youtubePlayerDiv);
	
	
	youtubrControlDiv = document.createElement('div');
	youtubrControlDiv.style.width = W;
	youtubrControlDiv.style.textAlign = 'right'; // to align button to the right
	youtubrControlDiv.innerHTML='\
		<div id="youtubr_toggleButton">\
			<img id="youtubr_toggleButtonImage"\
				onclick="youtubr_setState(\'t\')"\
				width="44"\
				height="16"\
				style="cursor: pointer; padding-top: 2px;"\
				alt="flickr/YouTube"\
				title=""\
				src=""/>\
		</div>';
	photoImgDiv.parentNode.insertBefore(youtubrControlDiv, photoImgDiv.nextSibling);

	unsafeWindow.youtubr_setState('f');
})();