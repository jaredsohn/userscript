// ==UserScript==
// @name           Auto Favorite Score
// @namespace      madd.in
// @include        http://*.geocaching.com/seek/nearest.aspx*
// ==/UserScript==

(function(){
	var $ = unsafeWindow.$;
	var favorites = $('.favoriteTotal');

	
	$(favorites).each(function(){
		var _this = $(this);
		var id = _this.data("id");
		var count = $(_this.children().get(0)).html();
		

		if(count == 0){
			var content = $("<strong>0%</strong>");
			_this.append(content);
		} else {
			$.ajax({
				url: 'nearest.aspx/FavoriteScore',
				type: 'POST',
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({ dto: { data: id, ut: 2, p: count} }),
				dataType: 'json',
				success: function (result) {
					var score = 0; 

					if (result.d.score)
		                            score = result.d.score;

		                        if (score > 100)
		                            score = 100;
				
					//var content = $("<span class='FavoriteScorePopUp'><img src='/images/favorites/piecharts/" + score + ".png' width='20' height='20' /> <strong>" + score + "%</strong></span>");
					var content = $("<strong>" + score + "%</strong>");

					_this.append(content);

					//alert(result);
					//alert(result.d.score);
				}
			});
		}
	});
})();
