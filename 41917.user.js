// ==UserScript==
// @name            Blinded's Svz Foto-Downloader
// @description     Dieses Script erzeugt ein Link, mit dem du Fotos aus dem Album speichern kannst!
// @include         http://*schuelervz.net*
// @include          http://*studivz.net*
// @include          http://*meinvz.net*
// ==/UserScript==

var image, downIcon;

downIcon =
    "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%16" +
    "%00%00%00%16%08%06%00%00%00%C4%B4l%3B%00%00%00%04gAMA%00%00%A" +
    "F%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%" +
    "C9e%3C%00%00%04dIDATx%DAb%FC%FF%FF%3F%03-%00%40%0011%D0%08%00" +
    "%04%10%0B%8C%C1h4%13H%409%10O%14%88%F0st%8B%09%B03%FE%FE%0B%1" +
    "4%00%FB%8C%11%2C%C9%C2%CC%C8%F0%E1%EBo%86%E7o%BFO%06%0A%14%C2" +
    "M%03)%3B%9F%0Ef%02%04%10%DC%60%86%BF%FF%18%18~%FF%83%E9%05%B1" +
    "%1D3%93%0DY%B2%22t%18%FE%FD%FB%07%14%FE%0F%11g%04%A9aaX%BB%EF" +
    "%3ECn%C3A%2B%86%3F%40A%26F%88%1C%1B%22%00%00%02%08a0%0B3%03X%" +
    "D1%3F%A8%EB%FE%FD%FF%25%C8%CB%C6%20!%CC%C5p%FE%25%03%C3%8F%DF" +
    "%FF%19%FE%FE%F9%C3%F0%EF%EF_%06k%05V%061~v%A0%1A%86%DF%10%F5%" +
    "20%FD%40%C3%D9%98%E1%C6%01%04%10%C2%60%90%2CH%12l8%C4%D7%7F%F" +
    "F%FC%03%CBL%3D%CD%C0%F0%FC%C3_%86%3F%3F~2%FC%FD%F9%93aq%24%17" +
    "%D0%17%7F%A0a%08%C4%CC0%D7%22%12%02%40%00aF%1E3%13%2C%AC%E1%A" +
    "A%FE%FD%FE%CD%F0%E7'%C4%D0%BF%BF~1%FC%05%BA%9A%11%1E9%40%CC%C" +
    "A%8Ca%0C%40%00%A1%1A%FC%1F%EA-p%98%FD%FF%09%E1%02%83%E0%17%D4" +
    "%D0%9F%BF%C0%F4%7F%60d%FE%03%7B%E6%FF%2F%06%16%A8%11%FFP%93-%" +
    "40%00!R%05%23C%DE%FF%3F%FFl%18~%81%B40~e%F8%FC%DB%EE%D7%AF%BF" +
    "%0C%A0t%FE%EB%C7%2F%20%FE%09%09%0A%90%25%FF%80%C1%F2%E7%2F%03" +
    "%C3%D7%3F%DA%0C%1C%CCs%81%C1%C7%CD%C0%04%84l%CC%97%80F%B5%80%" +
    "CC%03%08%20%B8%C1%EC%CCL%1D1%11%3A%9Cb%82%1C%0C%3F~%FEc%F8%F3" +
    "%EB7%83%AD%91%18%C3O%A0%A1%BF%81%EC%DF%3F!%C1%F1%0FH%FF%FC%F1" +
    "%9BA%5BY%80!%3F%D3%40%EC%2F%23C%12%0B%13%13%C3%2F%60%AAZ%BA%E" +
    "D%5E%20%CC%60%80%00%82%1B%FC%FB%F3%AFs%CA%D2%FC%D6%15%C9%86%A" +
    "0%B4%C7%F0%1B%14%89%C0T%F0%E6%E3O%86_%3F!.%FE%0B%B4%E4%DF%EF_" +
    "%0C%1F%3E%FFdP%91%E0%60(M%D0%06%A7%14%09aN%86%A5%BB%1E3%CCYy%" +
    "E3%1E%CC%3C%80%00b%84eiF%FD%E9ZB%1C%AC%A7%0F.%0D%E4%D2R%E4g%E" +
    "8%DF%FF%95%E1%EE%EB_%40%C3%7F1%5Cz%F8%8D%E1%EB%D7%9F%0C%BF%BF" +
    "%FF%04%BBZY%84%09%E8%F2_%0C%3Cl%FF%19%9A%A2%15%18%98YY%18%DC3" +
    "%F6%FDy%F0%F2%B3%C7%FF%CBY%7BA%E6%01%04%10%22%F2%D8X%AE%BD%7B" +
    "%FF%BD%AB%B2%FF%04%C3%1F%600k%8A%FEg8t%F3%1B%C3%C1%1B_%19%BE%" +
    "7F%FB%054%10%18%24%40CAAs%E4%CA%3B%86%1D%C7%5E2%A8I%B21%C8K%F" +
    "20t.%BC%C6%F0%E0%C1%87%A5%0C%9C%2C%7Ba%C6%01%04%10%13J%8A%E0e" +
    "k%DC%B2%FB%DE%AD%99%ABo0x%E9s3%84%EB21%FC%00%BA%F2%F7%0F(%FE%" +
    "F9%0B%EC%E2o%9F%BF3x%9B%0B2%94%87%2B3l%3C%FA%82a%F1%FA%3B%AF%" +
    "19%B8Y2%90%921%03%40%00%A1%267FP%EEa%89o%98t%EA%E7%B9%AB%AF%1" +
    "9%F2%5C%F8%19%0C%25%18%18%DE%BC%FF%0E6%14%E4%E27%EF%BE1%A8%88" +
    "%B12%B4%C6)3%BC%F8%F8%9B%A1v%E2%B9%7F%BF%FF%FF%CF%00%A6%88%1F" +
    "%C8%06%03%04%10f%06%E1d9%F1%EE%FD%8F%9A%EC%D6%E3%FF%FF%03%EDi" +
    "%0A%10a%10%E3%FA%CF%F0%16h%F8%7B%20%E6b%F9%C7%D0%91%A0%CC%A0%" +
    "22%C7%C7P%DCw%9E%E1%EE%FD%F7%B3%81%82%EB%18%D0J_%80%00%C24%18" +
    "%14%24%3Cl%3D'N%3E%DDS%D0y%8AAK%81%97%A1'F%9AA%98%F3%3F%03%07" +
    "%E3_%86%9EDe%06o%2BI%86%C6%B9%D7%18%B6%ECzp%11%A86%8B%01K%91%" +
    "0E%10%40%2C8%0BT.V%BF%85%AB%AE_%10%E4cS%EF%C9%D7gX%94%AF%CE%F" +
    "0%19%18%89N%C6b%0C%9DKo1t%CF%BF%FC%1C%18%AEn%C0%9C%F7%0F%9Bv%" +
    "80%00%C2m0%13%E3%0F%60%B89OXpy%DF%D7o%BF%D5%F2%A3%D4%19%C4%84" +
    "%D9%19%AAf%5Da%980%FF%EA3%60%19%E1%C9%C0%CE%F4%8A%E1%1Fv%ED%0" +
    "0%01%84H%C7%26%B3P%0A%3A%06P%C9%06%CA%FF%8C%0C%7C%C0l%BEDN%9E" +
    "%D7%85%95%99%99%E9%EE%83%0F%A7%81%86%85%01%B3%EAs%A0%C1%0C%E8" +
    "%C1%F0%FFt%1A%98%06%08%20FZ%D5y%00%01D%B3%3A%0F%20%C0%00%DD%A" +
    "7%EC%E2%17%8Dw'%00%00%00%00IEND%AEB%60%82";

function getLink() {

	image = document.getElementById('PhotoContainer').getElementsByTagName('img')[0];
	//alert(image.src);

}

getLink();

if (image) {
    var link = '<p align=center><a href="' + image.src + '" >' +
        '<img src="' + downIcon + '" border="0" ' +
        'style="vertical-align:middle;" />' +
        '&nbsp;Bild speichern</a></p>';

    //alert(link);

    var dest = document.getElementById('PhotoContainer');
    
    //alert(dest);
    dest.innerHTML = link + dest.innerHTML;
}
