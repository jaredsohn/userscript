// ==UserScript==
// @name           FlickrCommentedOn
// @namespace      vispillo
// @include        http://*.flickr.com/photos/*/*
// @version		   2
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var retrievingButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.08er%9C%E1%00%00%01%B8IDATHK%EDTK%ABAa%14u%7F%A2%01%C5%84%92%09e%A4%94%81W%5E)%8F%89%01I%14%26%1E%09%11%C9%CC%C8%1F0%95%BC%9F%13%A5%A4%E5%EE%5D%E4r%CEu%DC%9B%EE%BDuw%9D%3A%F5%ED%B3%D6%DAk%AF%EF%BC%E1%BDd%AF%2C%22xe%C9%5E%09%CE%EE%FC%13%3Cr%E0%E7%2C%DA%EDv%C8%E7%F3p8%1C%B0%D9l%A2O*%95%C2r%B9%14%1DDt%82l6%8Bv%BB%8D%C3%E1%F0%A9%0B%DDn%17%E1pX%B4O%90%60%BF%DF%C3n%B7%E3x%3C%82%26%D9n%B7%D8l6X%ADVX%2C%16%98%CDf%98L%26%FCP%C5b1%0C%87CA!%82%04%04%16%0C%06%F9%03z_%AF%D7w%E0%A3%D1%88A%03%81%00%9CN'%FA%FD%FE%D7%08%08%9C%3C%26%E5%D3%E9%14%E3%F1%18g%F0%C1%60%00%8F%C7%C3%13X%2C%16%E9%04%D7%16%91%3D%F3%F9%FC%02%EE%F7%FB%E1%F5z%E1v%BB%D9%C6h4%8AV%AB%85H%24%02%A3%D1xG%F2p%C9%B4%87%EB%22%C5%9DN%87%03%40%C0%CDf%13%B9%5C%0E%B5Z%0D%3E%9F%0FZ%AD%F6C%BF(%C19%A6%A4%F2%1C%D3j%B5%CA%B1%25%F0L%26%83t%3A%8Dd2%89x%3C%8ED%22%81R%A9%C4%E7%0A%85%E2B%F2%D4E%A38Z%ADVV%5D%AF%D7Yu%A5Ra%92b%B1%C8%13%A8%D5ji%13%DC%9A%D9h4P.%97a6%9Ba2%99%600%18%A0%D7%EBYq%A1P%E0%9D(%95J%E9%3B%B8%EE%A4%FC%87B!%F4z%BD%3B%00%8DF%03%97%CB%05%9DN'x%17%9E%B2H(%87*%95%0Ar%B9%FCr%E9n%7B%BEM%F0%7B%FF%A6%8F%94I%3D%FF%FB%16%9D%00%89%06%23%97%2Bi%AE%7F%00%00%00%00IEND%AEB%60%82";
	var commentedButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%02%00%00%00o%15%AA%AF%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%FFIDAT8Oc%FC%FF%FF%3F%03%05%E0%F7%FF%8F%0C%7F%18XY%D9%18%80%06Q%02%FE%FD%FF%F6%1F%84%FESj%10%DC%11%23%C8%A0%CF%DF~N%DAx1%BAsgD%FB%0EL%D4%BA%FC%F4%F3w_%B0F%0Ez%18%E5L%3D%F0%DFm%19.%04%94%CD%9F~%E8%F7%9F%BF%98f%A1%18%F4%FD%E7%EF%C8%8E%1D%FF%D3%B7%E11%ABz%C1%F1%DBO%DF%130%E8%F5%87o%F8%5D%04%B4%A0s%D5%D9%B3%B7_%D1%CB%20%A8%D7p%87%11%D0E%B5%8BN%DC%7CB%C8k%40%07w%AF%3E%0B%F4%DD%0D%86%02%CC%60%02%0AB%02%FB%E7%AF%3F%04%BC%06%94%86D%3F0%C8!q%3Fw%C7U%B8%89%40v%C9%EC%23%C4F%3F%9AUy%D3%0F%02%1D%024%22%B6k%D7%DA%23w%F0do%7Cy%0D%E8%91%99%DB%AE%C4%F7%EC%DEr%F2%3E%C1%12%02%A7A%2F%DE%7F%05%1A%B4%F7%FCc%82F%40%14%8C%A0%DCOd%88%10NG%C3%C8%20%00%86%F1%02%3D%CA%BE%AA%7D%00%00%00%00IEND%AEB%60%82";
	var notCommentedButtonImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%18%00%00%00%18%08%06%00%00%00%E0w%3D%F8%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.08er%9C%E1%00%00%01FIDATHK%EDT%3D%8B%83%40%14%CC%FDq%0DZ%C746bc%91T6%01%0B%1B%C1%CA%CA%3F%60%E9G%8C%9A%C4%0F%84%80%22a%EE%9E%A0%C8%9D%9E%26%10%8E%83%0C%2C%AC%B0%3B%F3f%DEs%3F%F0%85%D5%2BA%02%AF%C4%EA%95%E4m%3Ao%81%B9%04%FE.%A2%DB%ED%06UU%B1%5E%AF%C10%CC%E4R%14%05%D7%EBu%D2%C8%A4%83%FD~%0F%C30%D04%CD%AF)X%96%85%EDv%3BynT%A0%AA*%B0%2C%8B%FB%FD%0ErR%14%05%F2%3CG%9A%A6%B8%5C.H%92%04Q%14%B5%8B%20I%12%82%20%18-dT%80%C86%9BM%7B%81%F6Y%96%FD%20%0F%C3%B0'%DD%EDvp%1C%E79%01%22%A7%8C%A9%F28%8Eq%3A%9D%D0%91%7B%9E%D7%92%3E%2C0%8C%88%E29%9F%CF%3D%F9%F1x%84%EF%FBp%5D%17%9D%80%2C%CB%FD%FE%BB%8D%D9%26S%1F%86%207DN%C2%84%AE%C9u%5D%2F%8F%88NvcJ%CD%EE%C6T%D3%B4%9E%A4%2CK%D0%B7(%8A%CF%8D%E9X94%8E%E4%80%889%8E%83i%9As%3F%F2%F2%C7N%D7u%1C%0E%07%F0%3C%DF%C6%B2%14%8B%9E%0A%9A%7FA%10%60%DB%F6R%DE%FE%DC%22%81%87Y%07%17%DE%02%B3%E9%FD%FF%88%3E%01Y%AF%5CU%DDg(%08%00%00%00%00IEND%AEB%60%82";
	var photo_id = $("input[name=photo]").attr('value');
	var key = 'c493f3861b5354fb7a953e02fedf6a21';
	var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&format=json&nojsoncallback=1&api_key='+key+'&photo_id='+photo_id;
	var regex = /=([\d@N]+)&/;
	var results = $("#candy_nav_menu_search li:eq(3) a").attr("href").match(regex);	
	var nsid = results[1];
	$("#button-bar").css("width","308px");
	$("#nav-bar").css("width","308px");
	$("<img>").attr("src",retrievingButtonImg).attr('id','statusimg').insertAfter('#button-bar');
	var image = notCommentedButtonImg;
	$.getJSON(url, function(data) {
		if (!(data.comments.comment === undefined)) {
			$.each(data.comments.comment, 
				function (i,comment) {
					if (comment.author == nsid) { image = commentedButtonImg; }
				}
			);
		}
		$("#statusimg").attr("src",image);
	});
	
}
// load jQuery and execute the main function
addJQuery(main);