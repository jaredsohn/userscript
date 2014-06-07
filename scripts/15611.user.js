// ==UserScript==
// @name		Download Megavideo videos 
// @author		Umakanthan Chandran
// @namespace	http://cumakt.googlepages.com
// @description	Download video's directly from Megavideo.com
// @include		http://*megavideo.com/*
// ==/UserScript==

(function() {
	function findPlaceToAdd() {
		els = document.getElementsByTagName("div");
		for (i = 0; i < els.length; i++) {
			var el = els[i];
			if (el.hasAttribute('class')) {
				if (el.getAttribute('class') == 'info-block options') return el;
			}
		}

		el = document.getElementById("commentnav");
		if (el != null) return el;
		return null;
	}
	
	function generic_find(word,start,startIndexWord,endIndexWord) {
    var searc = start;
    var matches = word.search(searc);
    if (matches == -1) {
           return "-1"; }
    var matchedString = word.substring(matches, word.length);
    var startIndex = matchedString.indexOf(startIndexWord) + startIndexWord.length;
    var endIndex = matchedString.indexOf(endIndexWord);
    var define = matchedString.substring(startIndex, endIndex);
    return define;
}

	
	
	var imgdownload = document.createElement('img');
	imgdownload.setAttribute('class','alignMid');
	imgdownload.setAttribute('border','0');
	imgdownload.setAttribute('width','16');
	imgdownload.setAttribute('height','16');
	imgdownload.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAADXUlEQVR4nG2TW2hcVRSG/32ZmXMmGc8cE2wySUqjLUqTom0tiS2jLaVJTQO2QiyIFHwQ30XwwRdRn1QQUcRSsAVRsdoHrQgxlAarVaswQSmaah4qxaR2krmcy97nsvf2YUYaw6zHxf+x9l7r/0mqU3QqLaVRCgBhjFpWRw3f2DBm9cLs2rcXCUi26AKI6zVm2W75QHFvGYSs15L1k/1fFm6cea8wvLW45yFu26alAFIhalcui5Xlwaeftbfd2wFufH/p5icf9h8+knXuZAAY04NDJEnY8t/aGAXE9bXli3ObHp9xxssthP43s7L80ZnS4eksZdmgwcMGYSRbGsgMDBqd8LCRDRpZxkoHDt08d1b+eW0dbMz1U2/3PDjGRZgJfBKGEBJJ0n5cFEMIEoSZwOdSuKOj198/eRtevTCby9mWAfcaNGxCBIhCFYnWAiEFpIAMaNDkXsMyhMeRt1Bpb3ttfs7pLzHPY5wkjPMMJ5xDyhYLKSDCNE2RJEwplup836ba/GzhgZ1US5muVlkYUL8WWTZ74kQy/nASSYSi9SMEvlRaH5omjx1PlIZXp0IEN/4ySnGjFNMEvkcZ0cPbqONkHSclVFR+ygIGCJW2JqYzpUGTpikI85tEGeKHWkoOQN5aEc1qV9FlVy7L0marvJ/ftz3fexcAMJY/OsOcolEq/OKz3NJvsYyiek1ECgAnjCkYuXg1zufvcF2cfsdXcff+Cd7b2/Imc4omTf1zH9tffspqq3GtFoSCje6klsWpZRVG7pdLi0IK+5aiXhNvvOLVG4WjMy0zmjStn3zLOn+WijCNEhnHsTLOrjHCGAXQMzklNEKtPaP9Y0/xl17jw3fDmPadVZob30defrNengyUFkYLoGdiqn0qd98j9u6xoPKjcZ2B4ydyfX3/c3/Oyu8eB6C6Citzn/sKxYNT3SM7bntbLP5+9ZknM169+8gxd89eSkDRjpAxUIA2qM6ej76bT/qGRk59YG3esiEY3/zx4vPZ6j8FDptQi1JKKABttNRaaN1QUP1D2989bd+ztUMkxbXFpddfFT9cyhFYFIwCQKIRa4QGxYOPbnnuhdbMDnA7YZWfq19/1fx1IanVAWTcorNrrHdyqmtkxwZlB7hVRiktJQBqWYSxjpp/AVMlvGns+1qgAAAAAElFTkSuQmCC";
	
	function parseUrl(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return -1;
  else
    return results[1];
}



function setSourceFlv(source){
var value = new Array();
var actString = new Array();
var resulturl = "";
  round1 = generic_find(source,"<ROW url=\"","<ROW url=\"","runtime=");
  roundRemovedURl = generic_find(source,"errortext=","errortext=\"","\">");
  if(round1 != "-1") { for ( i = 0 ; i < (round1.length)-2 ; i++ ) { value[i] = round1.charCodeAt(i); actString[i] = round1.charAt(i);}
   for ( i = 0 ; i < (round1.length)-2 ; i++ ){if (value[i]%4 <2) { if (value[i] < 16 && value[i] > 3) key = 61
   else if (value[i] < 96 && value[i] > 67) key = 189 
   else if (value[i] < 20 && value[i] > 6)  key = 65 } 
	else if (value[i]%4 >= 2) {
        if (value[i] < 16 && value[i] > 3) key = 65
        else if (value[i] < 96 && value[i] > 67) key = 193
        else if (value[i] < 20 && value[i] > 6)  key = 65 }
		output = String.fromCharCode(key - value[i])
        resulturl = resulturl + output; } } 
   return resulturl + "?OBT_fname=a.flv";
}
    urlKey = parseUrl("v");
	newUrl = "http://www.megavideo.com/xml/videolink.php?v=" + urlKey
    GM_xmlhttpRequest({
    method:"GET",
    url:newUrl,
    onload:function(details) {
      var match = details.responseText;
      if (match != null) {
	   finalLink = setSourceFlv(match);
	    links = findPlaceToAdd();
	 	var a = document.createElement('a');
		a.setAttribute('class','noul');
		if(round1 != "-1"){
		a.setAttribute('href',finalLink);
		a.appendChild(imgdownload);
		a.innerHTML += ' <span class="eLink"><font style="font-size: 8pt;" face="Tahoma">Download FLV</font></span>';
		}
	    links.appendChild(a);
      
      }}
  })
  
	

})();