// This is a modification of    http://userscripts.org/scripts/show/3982

// ==UserScript==
// @name          Download YouTube Video and Convert with Vixy
// @namespace     http://userscripts.org/users/31250
// @description   adds "Download This Video" link and icon to Youtube , on click you will be redirected to Vixy^, new: easier changing of the Link Text , the Tooltip or the Icon , simply 
// @include       http://*youtube.com/w*
// ==/UserScript==
var texttube="Video herunterladen "; //Link Text
var textvixy="Video herunterladen mit Vixy"; //Link Text
var textstream="Stream erzeugen";

var tooltipvixy="Download Video with Vixy";//Link Title
var tooltip="Download Video";
var iconvixy="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1F%00%00%00%1F%08%02%00%00%00%90%CC%81n%00%00%00%06tRNS%00%C0%00%C0%00%C0%8Dx%BB%BA%00%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%00%F8IDATx%9C%C5%96%5D%12%830%08%847%99%DEK%8E%8E'K%1F2Z%1A%08%10%ED%CF%8E%0F%1A%C8%C7%8A%23Z%98%19_%D3%C3%89%11Q%06%E1%F8%F3%E8%00%80%16%25%14'V%A3%CD%B7%14%D3%1BJS%06%CD%C5%2B%F4%3B%8A%E9%05%0D%80t%DA%CFK%FCH%FE%EE%FD%EBt%D9%9C%7C%5B%B2%F4%CB%CA%D2%A5%FD%A4q%E8w5%F9%F6%CF%B6%0CSa%F4~%84%DBq%84ze%EA%81ct%86%99%FD%E9a%A9%98%B3%CC%EE%BBY%A0%B7%DBj%BA%8D%9E%D2g%05%2CM%D1%1E%DD%2C%A0%8C%7B%E8%80n%16%C8%A3c%FA%BC%40%8CN%D1%AD%02)t%96%FE%5E%20%8B%5E%A0%9F%05%96%FE!%D6%B2WU%01lj%B6%C8%95%8Dh%B8%CC%9F%2FO%E0%9D%B9o%DE%88vq%DF%E6z%95%81%B3%F2%FE%A1v%5D%F9zt7%DA%81%5E%AF2%80%9C%F1%9E%A3%9F%96%D6%AF%BE%7C%B3%FB%1Dt%E6d%EC%3F%01%CC%D6%89%08%9C%B4%9D%7F%00%00%00%00IEND%AEB%60%82";
var icontube="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1F%00%00%00%1F%08%02%00%00%00%90%CC%81n%00%00%00%06tRNS%00%C0%00%C0%00%C0%8Dx%BB%BA%00%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%00%96IDATx%9C%ED%D6%D1%0A%800%08%05P%17%7D%98%9F%EE%9F%AD%A7%15-%BD%EA%C3%20a%D2%DB%EC%DC%B1%98%D4D%84%96%D5%B1%8E.%AE%9F%60%8D%99%23%04%F8rH'%22%A2%EE54%B0V%F9%DC%B7%BE%F5%7F%E9%F3%5D%0D%DE~%EB%95i*%CC%7B%1F%CB%7D%3Cn%3D%9D%DF%81%A3%9C%8C%88%E0%E9%A1USg%99~%EE%C9%00%9D6%F5L%80I%23%3D%16%80hG%F7%02%1C%DA%D7%ED%00%9F%0E%E9Z%40%88%8E%EA%EF%80(%9D%D0%EF%80%D4%DFU%AE%3B%5B%95gde%FD%026%1D%3F%8E~FFJ%00%00%00%00IEND%AEB%60%82"; //Link Icon Tube
var icon_width="22"; 
var icon_height="22";
var title='Download';


(function() {
	function findPlaceToAdd() {
		els = document.getElementsByTagName("div");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == 'wsWrapper') return el;
			}
		}

		el = document.getElementById("vidTitle");
		if (el != null) return el;
		return null;
	}
	
	function getFLAddress() {
		return document.getElementById("movie_player").src;
	}
	
	function getAddressVariable(address, variable) {
		return address.toString().split(variable+"=")[1].split("&")[0];
	}
	
		
	//Output	
	//pic tube
	var imgtube = document.createElement('img');
	imgtube.setAttribute('border','0');
	imgtube.setAttribute('width',icon_width);
	imgtube.setAttribute('height',icon_height);
	imgtube.setAttribute('src',icontube);
	
	var imgvixy = document.createElement('img');
	imgvixy.setAttribute('border','0');
	imgvixy.setAttribute('width',icon_width);
	imgvixy.setAttribute('height',icon_height);
	imgvixy.setAttribute('src',iconvixy);
	
	
	
	flAddress = getFLAddress();
	video_id = getAddressVariable(flAddress, "video_id");
	t = getAddressVariable(flAddress, "t");
	
	var flVideo = "get_video?video_id="+video_id+"&t="+t;
	var flVideovixy = 'http://vixy.net/?u=' + escape('http://youtube.com/watch?v=' + video_id);
	links = findPlaceToAdd();
	
		
	
	
	var br=document.createElement('br')
	var header=document.createElement('div');
	header.setAttribute('class' ,'wsHeading');
	header.innerHTML += title;
	
	var inner=document.createElement('div');
	inner.setAttribute('class','relatedInnerDiv');
	inner.setAttribute('style','padding-left: 7px');
	
	var tube = document.createElement('a');
	tube.setAttribute('class','noul');
	tube.setAttribute('target','_blank');
	tube.setAttribute('title',tooltip);
	tube.setAttribute('href',flVideo);
	tube.appendChild(imgtube);
	tube.innerHTML += ' <font size=1>'+ texttube +'</font>';
	
	var vixy = document.createElement('a');
	vixy.setAttribute('class','noul');
	vixy.setAttribute('target','_blank');
	vixy.setAttribute('title',tooltipvixy);
	vixy.setAttribute('href',flVideovixy);
	vixy.appendChild(imgvixy);
	vixy.innerHTML += ' <font size=1>'+ textvixy +'</font><br>';
	
	
	
	
	var td = document.createElement('div');
	td.setAttribute('class','wsBody');
	td.setAttribute('align','right');
	
	var add=document.createElement('div');
	add.setAttribute('class','wsWrapper');
	add.appendChild(br);
	add.appendChild(header);
	add.appendChild(inner);
	
	td.appendChild(tube);
	td.appendChild(br);
	td.appendChild(vixy);

	
	add.appendChild(td);
	
	links.appendChild(add);

})();
