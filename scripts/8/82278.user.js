// ==UserScript==
// @name           Favourites-Horizontal
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*
// @version		   1.1
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
	var right = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1F%00%00%000%08%06%00%00%00%E9T%A1%DA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%07%19%10%0E%15%0F8%3B%F9%00%00%00%9CIDATX%C3%ED%D7%C1%0D%80%20%0C%05%D0%E2%CD%15%5C%C05t%16fp%0A%87%821%24%E1%EC%08p%AC3%D06%A9%D1%DF%7B%F3~%1Ah%2003%93SM%E4X%C0%81%03%07%FEn%3C%97%EE%83%E7%D2i%3Foq%00%93%B1%8B%03%B0%B2%D2%D5%98be%8A%95%D3%D5%86z%D5%B8%26%80%09.%0D%60%86K%02%98%E2%A3%01%CC%F1%91%00%AE%1B%EE%3Bcw%3BpnW%CDm%C9%B8%ADW%0Dlv%D5%D2%B1%D0%B6%CE%C3%7DA%FBW%CB%A5%8B%60%13%1C%0FH%E0%C0%81%03%07%0E%1C%F8%3F%F1%07rP%B4%C7%9A9%8BK%00%00%00%00IEND%AEB%60%82';
	var left  = 'data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1F%00%00%000%08%02%00%00%00f66%8D%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%DA%07%19%10%0E%23%C0%82%AE%60%00%00%00%93IDATX%C3%ED%D6%BD%11%80%20%0C%05%E0H%E7%0A.%E0%1A%3A%0B38%85C%E1%18zg%ED%08P%C6%D6%C2%3F%84%A7%85%EF%0D%F0%E5%08%24G%A1%AA%02%8B%11d%A8S%A7%FE%81%3EL%01%A5%0FSh%FB%25%B6%80%B9O%3Fi%8D%5E%C5%8D%5E%EC%2Cvv%A3%D7%C8%08%8E%BE%D0%13%E93%3D%9D%3E%D4%B3%D0%FBz.ZU%B1%B3%FAzg%E0%B7%0A%7F%91%F0i%82o%82%C4%02%B7%5EdS%97%AE%AB%20%3Br%7B%82%D8%CE%14%FC%A5R%A7N%9D%3A%F5_%E9%2B%0F%CB%95d%D3f%97%E0%00%00%00%00IEND%AEB%60%82';
	var key = '941c445a24846dfc2afd5cf5989fba23';
	var photo_id = $("input[name=photo]").attr('value');
	var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&nojsoncallback=1&per_page=11<&page=1&format=json&api_key='+key+'&photo_id='+photo_id;
	$.getJSON(url, function(data) {
			//$("<div>").attr("id","favourites_container").prependTo("#sidebar-contexts");
			//$("<h4>").attr("class","primary-context-label").attr("id","#blaha").html("These people faved this photo").appendTo('#favourites_container');z			
			var num = 0;
			$("<div>").attr("id","outer_container").css("width","640px").appendTo("#meta");
			$("<div>").attr("id","favourites_container").css("margin","auto").css("width","97%").css("border-top","1px solid lightgrey").css("padding-top","4px").appendTo("#outer_container");
			$("<div>").attr("id","page_count").css("width","15%").css("margin","auto").appendTo("#outer_container");
			if (parseInt(data.photo.total) < 12) {
				while ((num < data.photo.person.length) && (num < 12)) {
					var dt = new Date();
					dt.setTime(data.photo.person[num].favedate*1000);
					$("<a>").attr("href",'http://www.flickr.com/photos/'+data.photo.person[num].nsid).appendTo("#favourites_container").append($("<img/>").attr('title',data.photo.person[num].username+" added this as a favourite on "+dt.toLocaleString()).attr("src", 'http://www.flickr.com/buddyicons/'+data.photo.person[num].nsid+'.jpg').css('margin-right','1px'));
					num++;
				}	
			}
			else {
				$("#favourites_container").attr("name",1);
				$("#favourites_container").css("padding-left","31px");
				while ((num < data.photo.person.length) && (num < 12)) {
					var dt = new Date();
					dt.setTime(data.photo.person[num].favedate*1000);
					$("<a>").attr("href",'http://www.flickr.com/photos/'+data.photo.person[num].nsid).appendTo("#favourites_container").append($("<img/>").attr('title',data.photo.person[num].username+" added this as a favourite on "+dt.toLocaleString()).attr("src", 'http://www.flickr.com/buddyicons/'+data.photo.person[num].nsid+'.jpg').css('margin-right','1px'));
					num++;
				}
				$("<img>").attr("src",right).attr("id","img_right").attr('name',1).appendTo("#favourites_container").click(pext);
				$("#page_count").html("1/"+data.photo.pages);
			};
				//$("<div>").attr("id","page_count").css("width","15%").css("margin","auto").html("1/"+data.photo.pages).appendTo("#outer_container");			};
			
			function pext () {
				var movement = parseInt($(this).attr('name'));
				var newp = parseInt($("#favourites_container").attr("name"))+movement;
				var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&nojsoncallback=1&per_page=11&page='+newp+'&format=json&api_key='+key+'&photo_id='+photo_id;
				$.getJSON(url, function(data2) {
					var num = 0
					$("#favourites_container a").remove();
					$("#favourites_container img").remove();
					$("#favourites_container div").remove();
					//$("#page_count").remove();
					if (newp > 1) {
						$("#favourites_container").css("padding-left","0px");
						$("<img>").attr("src",left).attr("id","#img_left").attr('name',-1).appendTo("#favourites_container").click(pext);
					}
					else {
						$("#favourites_container").css("padding-left","31px");
					}
					while(num < data2.photo.person.length) {
						var dt = new Date();
						dt.setTime(data.photo.person[num].favedate*1000);
						$("<a>").attr("href",'http://www.flickr.com/photos/'+data2.photo.person[num].nsid).appendTo("#favourites_container").append($("<img/>").attr('title',data2.photo.person[num].username+" added this as a favourite on "+dt.toLocaleString()).attr("src", 'http://www.flickr.com/buddyicons/'+data2.photo.person[num].nsid+'.jpg').css('margin-right','1px'));
						num++;
					}
					if (data2.photo.pages>newp) {
						//$("#favourites_container").css("padding-left","0px");
						$("<img>").attr("src",right).attr("id","img_right").attr('name',1).appendTo("#favourites_container").click(pext);
					}
					else {
						$("#favourites_container").css("padding-left","31px");
					}
					//$("<div>").attr("id","page_count").css("width","15%").css("margin","auto").html(newp+"/"+data2.photo.pages).appendTo("#outer_container");
					$("#page_count").html(newp+"/"+data2.photo.pages);
				});
				$("#favourites_container").attr("name",newp)
			}
	});
}
// load jQuery and execute the main function
addJQuery(main);
