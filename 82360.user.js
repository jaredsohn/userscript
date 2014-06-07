// ==UserScript==
// @name           Flickr Commented On
// @description    Shows whether or not you have commented on a photo
// @include        http://www.flickr.com/*
// @match	   http://www.flickr.com/*
// @version        2.29
// @author	   Brenton Cleeland (http://www.flickr.com/people/sesh00/)
// @date	   Jul 3, 2007
// @modified	   Jul 18, 2013
// @contributor	   Alesa Dam (http://www.flickr.com/people/alesadam/)
// @contributor	   Martin Heimburger (http://www.flickr.com/people/vispillo/)
// @contributor	   Bennie Hebbelynck (http://www.flickr.com/people/hebbervus/)
// @icon	   http://s3.amazonaws.com/uso_ss/icon/82360/large.png?1326790459
// @downloadURL	   https://userscripts.org/scripts/source/82360.user.js
// @updateURL	   https://userscripts.org/scripts/source/82360.meta.js
// @run-at	   document-end
// @grant	   GM_log
// @grant	   GM_addStyle
// @grant	   GM_xmlhttpRequest
// ==/UserScript==
//
// Icon based on a Webdesigner Depot (http://www.webdesignerdepot.com/) icon from the Primo set. Downloaded from http://www.iconfinder.com/icondetails/40747/128/chat_comments_references_talk_icon
//
//

(function () {
// shows the number of comments you left on the photo
SHOW_COMMENT_COUNT=true;

var retrievingButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.08er%9C%E1%00%00%01%B8IDATHK%EDTK%ABAa%14u%7F%A2%01%C5%84%92%09e%A4%94%81W%5E)%8F%89%01I%14%26%1E%09%11%C9%CC%C8%1F0%95%BC%9F%13%A5%A4%E5%EE%5D%E4r%CEu%DC%9B%EE%BDuw%9D%3A%F5%ED%B3%D6%DAk%AF%EF%BC%E1%BDd%AF%2C%22xe%C9%5E%09%CE%EE%FC%13%3Cr%E0%E7%2C%DA%EDv%C8%E7%F3p8%1C%B0%D9l%A2O*%95%C2r%B9%14%1DDt%82l6%8Bv%BB%8D%C3%E1%F0%A9%0B%DDn%17%E1pX%B4O%90%60%BF%DF%C3n%B7%E3x%3C%82%26%D9n%B7%D8l6X%ADVX%2C%16%98%CDf%98L%26%FCP%C5b1%0C%87CA!%82%04%04%16%0C%06%F9%03z_%AF%D7w%E0%A3%D1%88A%03%81%00%9CN'%FA%FD%FE%D7%08%08%9C%3C%26%E5%D3%E9%14%E3%F1%18g%F0%C1%60%00%8F%C7%C3%13X%2C%16%E9%04%D7%16%91%3D%F3%F9%FC%02%EE%F7%FB%E1%F5z%E1v%BB%D9%C6h4%8AV%AB%85H%24%02%A3%D1xG%F2p%C9%B4%87%EB%22%C5%9DN%87%03%40%C0%CDf%13%B9%5C%0E%B5Z%0D%3E%9F%0FZ%AD%F6C%BF(%C19%A6%A4%F2%1C%D3j%B5%CA%B1%25%F0L%26%83t%3A%8Dd2%89x%3C%8ED%22%81R%A9%C4%E7%0A%85%E2B%F2%D4E%A38Z%ADVV%5D%AF%D7Yu%A5Ra%92b%B1%C8%13%A8%D5ji%13%DC%9A%D9h4P.%97a6%9Ba2%99%600%18%A0%D7%EBYq%A1P%E0%9D(%95J%E9%3B%B8%EE%A4%FC%87B!%F4z%BD%3B%00%8DF%03%97%CB%05%9DN'x%17%9E%B2H(%87*%95%0Ar%B9%FCr%E9n%7B%BEM%F0%7B%FF%A6%8F%94I%3D%FF%FB%16%9D%00%89%06%23%97%2Bi%AE%7F%00%00%00%00IEND%AEB%60%82";
var retrievingButtonTransparentImg = "data:image/png;base64," +
	"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
	"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGBgg2JLgP+JQAAAHPSURBVEjH" +
	"7ZU/i+pAFMVPhgdio6AggjaKWNlaKIrY29hpp73fJIgW9gEhhX4AsRBstLSJCUo6KwMGCyHG/L1b" +
	"6Vv36a482Oa9PXCruZzf3LlzZzgiwneK4Zv1A/gPAL+eLZzPZ5pMJlAUBb7vPzVIp9Oo1WqIRqPc" +
	"wwQiehiiKNJsNiPHcegzLZdL6vV617w/fB5WYFkWqaqKRqOBy+UCwzBARPB9/y4AoFgsQpZlaJqG" +
	"ZDL52hGZpolQKATGGGzbvu3mI8D3ffA8D9M0YRjG3zX5vbHnefA87w7gOA7i8TgEQXi9ycFgEKfT" +
	"Cb7vgzEG13VvhsPh8M48FoshlUrBNE10Oh0aDAbcl4BAIMBls1maz+eoVqtg7HehnuehUCjcIEQE" +
	"XdeRyWRgmiba7TYJgnCDcM9e0+s1lWUZ15x8Po/VaoVSqQRN025H5rouGGOIRCKQJAmKomA8HnOf" +
	"Ah6p3+/T4XBApVK564Wu6wiHw1BVFev1GqIofl3BR02nU7IsC4vFArZtw3VdOI6DRCKBXC6H7XYL" +
	"SZIwGo24lyb5vY7HI202G5TLZfA8f2fQarWIMYbdbodut/v6JL8azWaT6vU67ff7h5PM/XyZ/z7g" +
	"DW0ytGWUWU3+AAAAAElFTkSuQmCC";
var commentedButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%02%00%00%00o%15%AA%AF%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%FFIDAT8Oc%FC%FF%FF%3F%03%05%E0%F7%FF%8F%0C%7F%18XY%D9%18%80%06Q%02%FE%FD%FF%F6%1F%84%FESj%10%DC%11%23%C8%A0%CF%DF~N%DAx1%BAsgD%FB%0EL%D4%BA%FC%F4%F3w_%B0F%0Ez%18%E5L%3D%F0%DFm%19.%04%94%CD%9F~%E8%F7%9F%BF%98f%A1%18%F4%FD%E7%EF%C8%8E%1D%FF%D3%B7%E11%ABz%C1%F1%DBO%DF%130%E8%F5%87o%F8%5D%04%B4%A0s%D5%D9%B3%B7_%D1%CB%20%A8%D7p%87%11%D0E%B5%8BN%DC%7CB%C8k%40%07w%AF%3E%0B%F4%DD%0D%86%02%CC%60%02%0AB%02%FB%E7%AF%3F%04%BC%06%94%86D%3F0%C8!q%3Fw%C7U%B8%89%40v%C9%EC%23%C4F%3F%9AUy%D3%0F%02%1D%024%22%B6k%D7%DA%23w%F0do%7Cy%0D%E8%91%99%DB%AE%C4%F7%EC%DEr%F2%3E%C1%12%02%A7A%2F%DE%7F%05%1A%B4%F7%FCc%82F%40%14%8C%A0%DCOd%88%10NG%C3%C8%20%00%86%F1%02%3D%CA%BE%AA%7D%00%00%00%00IEND%AEB%60%82";
var commentedButtonTransparentImg = "data:image/png;base64," +
	"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
	"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGBggwFb+LXygAAAFDSURBVEjH" +
	"Y/z//z8DLQETA43BqAUDbwELNsEv33/9n7/7BsPJGy8Y/v7Dncp0FYQZktw1GSQEuRlxqWHElkxz" +
	"px38P3njM4Kuy/WXYmBmYmLoSbVmYGFmYiQqiH78+vP/7ecfDAyKAgQtmLzxGQMPJyvDg5efiI+D" +
	"L99/MwjzcjAw3P9AVBjzcbExfPr2exClIh5OVoa3n38QbcCXH78ZeDhZibeAg42F0UhZlCHXX4rh" +
	"5q5TODXe3HWKIddfiuHT118MCmK8DCSlIlgyPX79OQNM2tVQliGp7yJczbwifYbrj98zFAcb4E2m" +
	"DP///ycK500/+P8GQ8H/uTuu/o/t2vV/7ZE7/4nRx0hMcZ077eB/XUURhmPXnjOE2qoweJspMFKU" +
	"k5HByw/f/jMwMDCoSPIzpHlqM5KaihhHK5xRCwa/BQCpjKvJw6UcSAAAAABJRU5ErkJggg==";
var notCommentedButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.08er%9C%E1%00%00%01FIDATHK%EDT%3D%8B%83%40%14%CC%FDq%0DZ%C746bc%91T6%01%0B%1B%C1%CA%CA%3F%60%E9G%8C%9A%C4%0F%84%80%22a%EE%9E%A0%C8%9D%9E%26%10%8E%83%0C%2C%AC%B0%3B%F3f%DEs%3F%F0%85%D5%2BA%02%AF%C4%EA%95%E4m%3Ao%81%B9%04%FE.%A2%DB%ED%06UU%B1%5E%AF%C10%CC%E4R%14%05%D7%EBu%D2%C8%A4%83%FD~%0F%C30%D04%CD%AF)X%96%85%EDv%3BynT%A0%AA*%B0%2C%8B%FB%FD%0ErR%14%05%F2%3CG%9A%A6%B8%5C.H%92%04Q%14%B5%8B%20I%12%82%20%18-dT%80%C86%9BM%7B%81%F6Y%96%FD%20%0F%C3%B0'%DD%EDvp%1C%E79%01%22%A7%8C%A9%F28%8Eq%3A%9D%D0%91%7B%9E%D7%92%3E%2C0%8C%88%E29%9F%CF%3D%F9%F1x%84%EF%FBp%5D%17%9D%80%2C%CB%FD%FE%BB%8D%D9%26S%1F%86%207DN%C2%84%AE%C9u%5D%2F%8F%88NvcJ%CD%EE%C6T%D3%B4%9E%A4%2CK%D0%B7(%8A%CF%8D%E9X94%8E%E4%80%889%8E%83i%9As%3F%F2%F2%C7N%D7u%1C%0E%07%F0%3C%DF%C6%B2%14%8B%9E%0A%9A%7FA%10%60%DB%F6R%DE%FE%DC%22%81%87Y%07%17%DE%02%B3%E9%FD%FF%88%3E%01Y%AF%5CU%DDg(%08%00%00%00%00IEND%AEB%60%82";
var notCommentedButtonTransparentImg = "data:image/png;base64," + 
	"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
	"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGBggUJWi6jiIAAAFtSURBVEjH" +
	"7VUxisJQEH3/syBBUMHGwsrCG9gELLQO2OY8XiCn8ASCWAjBQi9gRLCzs1ALTdQombdVXN2Nuwax" +
	"Wh8MDPz582bmz59RJPFKaLwYb4J/QPBx72C/37PX62E6nUJE7jqoVCqwLAvFYlElGpBMlE6nw8Fg" +
	"wPP5zN8wGo3oOE5s98NPYgZhGHI+n8O2bRyPRwRBAJIQkRsBANM04XkelsslyuXyYyU6HA7I5XLQ" +
	"WuN0Ol2i+U4Qk2SzWQRBkO4NrksoIiCJKIou+jVB6i4yDAPb7RYiAq01ROTiPNajKLrJ2DCMxzPI" +
	"ZDKqWq3SdV00Gg1o/RXHer2G7/soFArI5/MYj8fwfR+lUimRQN2bpnGbep6H2KZWq8GyLADAbrfD" +
	"cDjEYrGAbdvp2zRJHMfharVit9tlu92m67r86456dB/0+32GYYjJZIJmswnTNNVTP/kam82Gs9kM" +
	"9XodrVZLpRkV6r3R3gRP4xMAelzWTzapqAAAAABJRU5ErkJggg==";
var errorCommentedButtonImg = 'data:image/png;base64,' +
    'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCDgYMGJVmyfcAAAF7SURBVEjH7VWxSwJRHP5MQQ4ChyCMhhrCgmw6dXBsadKknE2aT1wraClwFzcJQ4lAUChxc/F/sEFyCKegjFIOXkfpr+kOT++Od4W0+G3vfe993+/3+H48BxERZogFzBhzg78Z5EURb6XSr3kAcJilKC+KiCWT2no5lZrid8Nhbb2Ry/EbTIoDAPt4R+F7CABYrdd14p/dLgDAX6vxPdFhOj0lDgDHLueU+DjOdrb4OlAUBXK5jGG/rzMAgK+XV91Ztfrbp0dkWm2+DhhjKPZ6cHo8OvFJjIsfVe7tp2gpkcDi2rpp9ar49sm5vZgKgoDBYIDRaIRqNmv5NJlWG4wxCILAb+B2u+Hz+XAVDGIvtm+Z84doFLIsw+v12p8DVdys+nEYRdS0A7viaifcBpNzoKLQbOAuFMJKPM49By6z9MiXF7rqC80GDq5vEAgEtL3nSkWXJqM5AFmgI0nUkSQ69W8a8r1ikVqRiClPRGRpQESWl3l4x/xP/neDH8cgWRmnYjhfAAAAAElFTkSuQmCC';
var errorCommentedButtonTransparentImg = "data:image/png;base64," +
	"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
	"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wGBgg7C6Zwu4AAAAGKSURBVEjH" +
	"7VWxSwJxGH2XghwEDkEYDTWEBdl0p4NjS5Mm5WzS0nLiWkFLgbu4SRhKBIFBiZuLf0BNNkgO4RSU" +
	"UcrBJaVfSyd3p3f8rpAWH9zw493vve/7eB8/jogwTkxhzJgY/M0gKwj0WijQb3kA4MxSlBUEisTj" +
	"g/NsIsEZ+fVgcHBeymQ4ZgOjOAAo72/IffUAAPPlMrTiH80mAMBXKnFMI9pOJofEAWDX6RgS1+Jw" +
	"bYWYOuh2u7fy5aXQa7d1BgDw+fyi+1et/uLxAalana0DRVGEfKsFh9utEzdCK75TvLGfoplYDNML" +
	"i6bVq+Kr+0f2Ysrz/F2n00G/38dVOm05mlStDkVRwPM8u4HL5RK9Xi9O/X5sRDYtF+k+HIYsy/B4" +
	"PHu290AVN6tei1ERNe3ArvhPJ8RsYNwDFblqBdeBAOaiUeY9cJqkh5NPjklbfa5awdbZOURRVEdB" +
	"T8WiLk2j9gBEZPo1JIkakkQHvmUaxbfyeaqFQqY8EVkbEBGsLrPw3ORN/neDb7T6O9tyiYNeAAAA" +
	"AElFTkSuQmCC";

if (typeof(GM_log) == "undefined") {
	var GM_log = function(message) {
		console.info('FCO: ' + message);
	}
}

function addButtonToMenu(photo_id)
{
    var stats = document.getElementById('stats_ul');
    if(stats) {
	var libut = document.createElement('li');
	libut.setAttribute('style','border-color:transparent;');
	libut.setAttribute('class', 'stat-item');
	var first = stats.getElementsByTagName('li')[0];
	stats.insertBefore(libut, first);
	var divbut = libut.appendChild(document.createElement('a'));
	divbut.setAttribute('style','height:24px;');
	var commentedButton = divbut.appendChild(document.createElement('img'));
	commentedButton.setAttribute('style','position:relative; top:0px;');
	commentedButton.id = 'FCO-image-' + photo_id;
	commentedButton.alt = 'retrieving';
	commentedButton.title = commentedButton.alt;
	commentedButton.src = retrievingButtonImg;
    }
    return libut;
}

function addButtonToImageCard(imgLinks,photo_id)
{
    if(imgLinks) {
	var libut = document.createElement('li');
	libut.setAttribute('style','border-color:transparent;');
	libut.setAttribute('class', 'counter0');
	var first = imgLinks.getElementsByTagName('li')[0];
	imgLinks.insertBefore(libut, first);
	var divbut = libut.appendChild(document.createElement('a'));
	divbut.setAttribute('style','height:24px;');
	var commentedButton = divbut.appendChild(document.createElement('img'));
	commentedButton.setAttribute('style','position:relative; top:0px;');
	commentedButton.id = 'FCO-image-' + photo_id;
	commentedButton.alt = 'retrieving';
	commentedButton.title = commentedButton.alt;
	commentedButton.src = retrievingButtonImg;
    }
    return libut;
}

function addButtonToThumbnail(thumbnail, photo_id, before) {
    if ( document.getElementById('FCO-image-' + photo_id) ) { // there already is one (set page, apps page, ..)
        return document.getElementById('FCO-image-' + photo_id);
    }
    if (!photo_id) {
	photo_id = document.evaluate('./a/img', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).
                singleNodeValue.src.match(/.*flickr.com\/\d+\/(\d+)_.*/)[1];
    }
    var libut = document.createElement('div');
        libut.setAttribute('style','display: inline-block; max-height: 16px; position: static;');
	libut.setAttribute('id', 'FCO-photo-' + photo_id);
    if (before) {
    	thumbnail.insertBefore(libut, before);
    } else {
    	thumbnail.appendChild(libut);
    }
    var divbut = libut.appendChild(document.createElement('a'));
    divbut.setAttribute('style', 'height:24px');
    divbut.href = "#";
    var commentedButton = divbut.appendChild(document.createElement('img'));
    commentedButton.setAttribute('style', 'height:24px;');
    commentedButton.id = 'FCO-image-' + photo_id;
    commentedButton.title = 'retrieving';
    commentedButton.src = retrievingButtonImg;
       
     var photoUrl = document.evaluate('.//a', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).
            singleNodeValue.href;
    getPhotoComments(photo_id, photoUrl);

    return libut;
}

function addButtonToPoolItem(thumbnail) {
	var photo_id = thumbnail.getAttribute('data-photo-id');
	var hover = document.evaluate('.//div[contains(@class,"hover-target")]', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var meta = document.evaluate('.//div[contains(@class,"meta")]', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	meta.setAttribute('style', 'display: inline-block; vertical-align: top;');
	addButtonToThumbnail(hover, photo_id, meta);
}

GM_addStyle(".FCO-gradient { " + 
	"background: -webkit-gradient(radial, center center, 0, center center, 24, from(#bbbbbb), to(#ffffff)); " +
	"background: -webkit-radial-gradient(#bbbbbb, #ffffff); " +
	"background: -moz-radial-gradient(circle, #bbbbbb, #ffffff); " +
	"}; ");

function addButtonToJustifiedPoolItem(thumbnail, photo_id) { // photo_id passed for stream items
	if (!photo_id) {
		photo_id = thumbnail.getAttribute('data-photo-id');
	}
    if ( document.getElementById('FCO-image-' + photo_id) ) { // there already is one (set page, apps page, ..)
        return;
    }
    var libut = thumbnail.appendChild(document.createElement('div'));
        libut.setAttribute('style','display: inline-block; height: 24px; position: absolute; left: 10px; top: 10px;');
	libut.setAttribute('id', 'FCO-photo-' + photo_id);
    var divbut = libut.appendChild(document.createElement('a'));
    	divbut.setAttribute('style', 'height:24px;');
    	divbut.href = "#";
    var commentedButton = divbut.appendChild(document.createElement('img'));
    	commentedButton.setAttribute('style', 'height:24px;');
	commentedButton.setAttribute('class', 'FCO-gradient');
    	commentedButton.id = 'FCO-image-' + photo_id;
    	commentedButton.title = 'retrieving';
    	commentedButton.src = retrievingButtonTransparentImg;

        var photoUrl = document.evaluate('.//span[contains(@class,"photo_container")]/a', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;
    getPhotoComments(photo_id, photoUrl);

    return libut;
}

function setCommented(commented, photo_id, href, comment_count)
{
    var commentedButton = document.getElementById('FCO-image-' + photo_id);
    if (!commentedButton) {
	return;
    }
    switch (commented) {
	    case 'yes':
    		commentedButton.src = commentedButton.className.match('FCO-gradient') ? commentedButtonTransparentImg : commentedButtonImg;
	    	commentedButton.alt = "Yay! You've commented on this photo!"
		if (SHOW_COMMENT_COUNT) {
		    var countId = 'FCO-image-count-' + photo_id;
		    if (!document.getElementById(countId)) {
	                    var count = document.createElement('span');
			    count.id = countId;
	                    count.setAttribute('style', "display:inline;z-index: 2; position: relative; left: -15px; top: -12px; font-size: 10px; color: white;padding: 0px;border-right:0;");
        	            count.innerHTML = comment_count;
                	    count.title = commentedButton.alt;
			    commentedButton.parentNode.appendChild(count);
		    }
                }
            break;
	    case 'no':
    		commentedButton.src = commentedButton.className.match('FCO-gradient') ? notCommentedButtonTransparentImg : notCommentedButtonImg;
	    	commentedButton.alt = "Go ahead! Make my day! (by commenting)";
	    break;
	    case 'error':
            	commentedButton.src = commentedButton.className.match('FCO-gradient') ? errorCommentedButtonTransparentImg : errorCommentedButtonImg;
            	commentedButton.alt = "Error: " + comment_count;
            break;
        default:
            commentedButton.src = commentedButton.className.match('FCO-gradient') ? errorCommentedButtonTransparentImg : errorCommentedButtonImg;
            commentedButton.alt = "Error: " + commented;
            break;
    }
    commentedButton.title = commentedButton.alt;
    if (href == "#reply-box") { // when clicked, go to the reply-box, and set focus
        commentedButton.style.cursor = 'pointer';
        commentedButton.addEventListener('click', function (e) {
            var textarea = document.getElementById('message');
            textarea.focus();
            textarea.setSelectionRange(0,0);
        }, false);
    } else {
        commentedButton.parentNode.href = href;
    }
}

function getUsername() {
	var buddyIcon = document.evaluate('.//a[contains(@class,"account")]/img[contains(@class,"gn-buddyicon")]', document, null,
			XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		
	if (!buddyIcon) return null;
	return buddyIcon.src.match(/flickr.com\/\d+\/buddyicons\/(\d+@\w\d{2})/)[1];
}

// thanks to Vispillo (http://www.flickr.com/photos/31747528@N05/):
var getJSVariable = function(regex) {
                // Thanks to Vispillo for this compact code
                var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; ++i) {
                        var html = scripts[i].innerHTML;
			try {
				return html.match(regex)[1];
			} catch(e) {
			}
                }
                return undefined;
        }
var api_key = getJSVariable(/[\"\']api_key[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
var auth_hash = getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);

function getPhotoComments(photo_id, commentHref)
{
	GM_xmlhttpRequest({
		    method:"GET",
            // use www.flickr.com to call the api (same servers :) ), to make it work in Chrome
    		url: "http://www.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key="+api_key+"&photo_id=" + photo_id + "&format=json&nojsoncallback=1&auth_hash="+auth_hash,
	    	onload:function(details) {
                try{ 
                    try {
                        var data = JSON.parse(details.responseText);
                    } catch (e) { // older versions of FF don't have JSON
			try {
                        	data = eval( '(' + details.responseText + ')');
			} catch (f) {
				GM_log("error parsing JSON data: " + e);
				GM_log("received from server for photo_id(" + photo_id + "): '" + details.responseText + "'");
				setCommented('error', photo_id, commentHref, e);
				return;
			}
                    }
                    if (data.stat == 'ok') {
                        var comments = data.comments.comment;
                        var commented = false;
			var comment_count = 0;
			var permalink = undefined;
                        if (comments) {
                            comments.forEach(function(comment, idx) {
                                if (commented && !SHOW_COMMENT_COUNT) return;
                                if (comment.authorname == user_name || comment.author == user_name) {
                                    commented = true;
				    ++comment_count;
                                    if (permalink == undefined) permalink = comment.permalink;
                                }
                            });
	    	            if (commented) {
		            	setCommented('yes', photo_id, permalink.replace('#comment', 'comment'), comment_count);
			    } else {
		    	       	setCommented('no', photo_id, commentHref, comment_count);
		            }
                        } else {
                            setCommented('no', photo_id, commentHref, comment_count);
                        }
                    } else {
                        setCommented(data.code + " - " + data.message, photo_id, commentHref, comment_count);
                    }
                } catch(e) {
                    GM_log("error parsing API result: " + e);
		    GM_log("response received: " + details.responseText);
		    setCommented('error', photo_id, commentHref, e + ' - ' + details.responseText);
                }
            },
            onerror: function(details) {
                GM_log("error: " + details.statusText);
		setCommented('error', photo_id, commentHref, details.statusText);
            }
	});
	
}
	
var user_name = getUsername();
if(!user_name) {
    GM_log("no user name found");
    return;
} else {
	GM_log("running for user " + user_name);
}

try {
if (document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/\d+/)) { // on photo page
    // add a 'reply' name anchor to jump to on button click
    var anchorInCommentForm = document.evaluate('//div[contains(@class,"add-comment-form")]//a', document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (anchorInCommentForm) { // no comment form: no permission to comment
    	anchorInCommentForm.setAttribute('name', 'reply-box');
    }
    var photo_id = document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/(\d+)/)[1];

    addButtonToMenu(photo_id);
    getPhotoComments(photo_id, "#reply-box");
} else if (document.location.href.match(/.*flickr.com\/groups\/[^\/]+\/?$/) ||             // group start pages
	   document.location.href.match(/.*flickr.com\/groups\/[^\/]+\/pool/) ||           // group pools
	   document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/favorites/) ||      // favorites pages
	   document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/archives/) ||       // archive pages
	   document.location.href.match(/.*flickr.com\/photos\/friends/)) {                // friends

    var poolPhotos = document.evaluate('//div[contains(@class,"pool-photo") or contains(@class,"fave") or contains(@class,"photo-display-item")]', 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (poolPhotos.snapshotLength <= 0) {
    	GM_log("no photos found, aborting");
	return;
    }
    var poolItemDecorator = addButtonToJustifiedPoolItem; // assume justified view
    var squarePhotos = document.evaluate('count(//span[contains(@class,"pc_s")])', document, null,
    		XPathResult.ANY_TYPE, null);
    if (squarePhotos.numberValue == poolPhotos.snapshotLength) {
    	// square thumbnails view
	poolItemDecorator = null; // not on squares!
	// except on set pages:
	//if (document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/sets/)) {
		poolPhotos = document.evaluate('//span[contains(@class,"photo_container")]', document, null,
        		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		poolItemDecorator = addButtonToThumbnail;
	//}
    } else {
    	var smallPhotos = document.evaluate('count(//span[contains(@class,"pc_t")])', document, null,
		XPathResult.ANY_TYPE, null);
	if (smallPhotos.numberValue == poolPhotos.snapshotLength) {
		// small thumbnails view
		poolItemDecorator = addButtonToPoolItem;
	} else {
		var mediumPhotos = document.evaluate('count(//span[contains(@class,"pc_m")])', document, null,
			XPathResult.ANY_TYPE, null);
		if (mediumPhotos.numberValue == poolPhotos.snapshotLength) {
			// medium view
			poolItemDecorator = addButtonToPoolItem;
		} else {
			var largePhotos = document.evaluate('count(//span[contains(@class,"pc_z")])', document, null,
				XPathResult.ANY_TYPE, null);
			if (largePhotos.numberValue == poolPhotos.snapshotLength) {
				// large view
				poolItemDecorator = addButtonToPoolItem;
			} else {
				//alert("justified view (" + poolPhotos.snapshotLength + ")");
			}
		}
	}
    }

    if (!poolItemDecorator) {
	return;
    }

    for (var i = 0, len = poolPhotos.snapshotLength; i < len; ++i) {
       	var thumbnail = poolPhotos.snapshotItem(i);
	poolItemDecorator(thumbnail);
    }
    document.getElementById('main').addEventListener('DOMNodeInserted', function(event) {
    	setTimeout(function() { // workaround: addEventListener callback gets called in unsafeWindow!
        	try {
            		var target = event.target;
            		if (target.nodeName == 'DIV' && (target.className.match('pool-photo') || target.className.match('fave') || target.className.match('photo-display-item'))) {
				poolItemDecorator(target);
            		}
        	} catch (e) {
            		GM_log("error on insert: " + e);
        	}
	}, 0);
    }, true);
} else if (document.location.href.match(/.*flickr.com\/photosof\/contacts/) ||     // contacts
           document.location.href.match(/.*flickr.com\/activity/)) {               // recent activity
    var poolThumbnails = document.evaluate('//span[contains(@class,"photo_container")]', document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, len = poolThumbnails.snapshotLength; i < len; ++i) {
        var thumbnail = poolThumbnails.snapshotItem(i);
        try {
            var photo_id = document.evaluate('./a/img', thumbnail, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).
                singleNodeValue.src.match(/.*flickr.com\/\d+\/(\d+)_.*/)[1];
        } catch (e) {
            continue;
        }
        var commentedOnButton = addButtonToThumbnail(thumbnail, photo_id);
        try {
            // move the balloon
            thumbnail.parentNode.insertBefore(commentedOnButton, thumbnail.nextSibling.nextSibling.nextSibling); // span - br
        } catch (e) {
            try {
                thumbnail.parentNode.insertBefore(commentedOnButton, thumbnail.nextSibling);
            } catch (e) {
                GM_log("error inserting: " + e);
            }
            GM_log("error moving: " + e);
            // ignore: let it be
        }
    }
} else if (document.location.href.match(/.*flickr.com\/photos\/[^\/]+(\/page\d+|\/with\/\d+.*)?\/?$/) || // stream pages
	   document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/sets/)) {                         // set pages
    document.getElementById('main').addEventListener('DOMNodeInsertedIntoDocument', function(evt) {
    	setTimeout(function() { // workaround: addEventListener callback gets called in unsafeWindow!
        	try {
            		var target = evt.target;
            		if (target.nodeName == 'SPAN' && target.className.match("attribution")) {
				//unsafeWindow.console.log("add attribution");
				var thumbnailDiv = document.evaluate('.//ancestor::div[contains(@class,"photo-display-item")]', target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var photo_id = thumbnailDiv.getAttribute('data-photo-id');
				var thumbnail = document.evaluate('.//div[contains(@class,"thumb")]', thumbnailDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				addButtonToJustifiedPoolItem(thumbnail, photo_id);
            		} else if (target.nodeName == 'DIV' && target.className.match("cover-photo-position")) { // page has been reloaded: re-run
				//unsafeWindow.console.log("add buttons");
				    var streamItems = document.evaluate('//div[contains(@class,"photo-display-item")]', document, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				    for (var i = 0, len = streamItems.snapshotLength; i < len; ++i) {
					var streamItem = streamItems.snapshotItem(i);
					var photo_id = streamItem.getAttribute('data-photo-id');
					var thumbnail = document.evaluate('.//div[contains(@class,"thumb")]', streamItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					addButtonToJustifiedPoolItem(thumbnail, photo_id);
				    }
			} else {
				//unsafeWindow.console.log("adding " + target.nodeName + "(class:" + target.className + ")");
			}
        	} catch (e) {
            		GM_log("error on insert: " + e);
        	}
	}, 0);
    }, true);
	    var streamItems = document.evaluate('//div[contains(@class,"photo-display-item")]', document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    for (var i = 0, len = streamItems.snapshotLength; i < len; ++i) {
		var streamItem = streamItems.snapshotItem(i);
		var photo_id = streamItem.getAttribute('data-photo-id');
		var thumbnail = document.evaluate('.//div[contains(@class,"thumb")]', streamItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		addButtonToJustifiedPoolItem(thumbnail, photo_id);
	    }
} else if (document.location.href.match(/.*flickr.com\/?$/)) {                        // flickr home page
	var imageItems = document.evaluate('//div[contains(@class,"imgWrapper")]', document, null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, len = imageItems.snapshotLength; i < len; ++i) {
	var imageItem = imageItems.snapshotItem(i);
	var photo_id = imageItem.getAttribute('data-photo-id');
	var imgLinks = document.evaluate('.//ul[contains(@class,"imgLinks")]', imageItem, null,
	    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	addButtonToImageCard(imgLinks, photo_id);
	var photoUrl = document.evaluate('.//a', imageItem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).
            singleNodeValue.href;
	getPhotoComments(photo_id, photoUrl);
    }
}

} catch (e) {
	alert("exception: " + e);
}

})();

