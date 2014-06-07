// ==UserScript==
// @name       IMDb ratings for Viaplay
// @namespace  http://viaplay.se/
// @version    0.1
// @description  enter something useful
// @match      http://viaplay.se/*
// @copyright  Bernhard Hettman
// @require "http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js";
// ==/UserScript==

var debug = false;
console.log("Viaplay IMDB script started");
var server = "http://ec2-54-228-67-56.eu-west-1.compute.amazonaws.com";

function update(medalist) {
	/* hyrbutik fix */
    $('.price_in_thumb').css('left', '50px');
    
    $(medalist).each(function(index) {
		var $item = $(this);
		var title = $(this).find(".media-tooltip h3 a").attr("title");
		var year  = $(this).find(".meta .date").text();
		var id    = $(this).attr("data-product-id");
    
		if(!titles[title] && title != undefined) {
			$.get(server + "/rating/?title=" + title + "&year=" + year + "&id=" + id, function(data) {
				if(data) {
					titles[title] = data;
				} else {
					if(debug) console.log("no match for " + title + " (" + year + ") [" + id + "]");
					titles[title] = id;
				}
			});
		} else if(titles[title] > 0 && $item.find(".imdb-rating").length == 0) {
			var rating = titles[title];
			if(rating.length > 3) { rating = "<a href='#'></a>"; }
			$item.find('.meta .rating').html("");
            $item.find(".meta .date").html(year + "<span class='rating imdb-rating' style='color: #eee'>" + rating + "</span>");
		}
	});
}

var titles = [];
var items = 0;

window.setInterval(
	function() {
		updated = $(".media-list li").length;
		if(updated > items) {
			update(".media-list li");
		}
	},
	250
);

/* New IMDb tab */
$(".section-sorting").append("<li class='' data-sorting='imdb'><a class='imdb-category' href='#'>IMDb</a></li>");
$('.imdb-category').click(function(e) {
    e.preventDefault();
    
    $(".section-sorting li").removeClass("active");
    $(this).parents("li").addClass("active");
    
    var mylist = $('.media-list').first();
    $('.media-list').first().html("Loading ...");
    $('.media-list').first().next().hide();
    
    $('.filterDescription p').text('Top 250 mest populära filmerna sorterat på IMDb-rating');
    
    $.get("http://viaplay.se/ahah/block?id=250&title=Film&categoryLevels=1&cacheLifetime=3600&weight=2&contentType=movies&page=1&sorting=highest_ratings&type=featured&perpage=250&filterYearFrom=1960", function(reply) {
        var listitems = $(reply).children('li').get();
        update(listitems);
        
        var iterations = 0;
       	var tmp = window.setInterval(function() {
            if(iterations < 7) {
                iterations++;
                listitems.sort(function(a, b) {
                     var a = $(a).find('.imdb-rating').text() + $(a).attr('data-product-id');
                     var b = $(b).find('.imdb-rating').text() + $(b).attr('data-product-id');
                     return b.localeCompare(a);
                });
                
                $('.media-list').first().html(listitems);
                $('.media-list li .imdb-rating > a').parents('li').hide();
            }
        },
           	250
        );
    });
    
    $('body').append("<div class='media-list-wrapper'></div>"); /* disable infinite scroll */
});    

/* Article page */
$article = $(".article-rating-holder");
if($article) {
	var id = $("#productSelect").attr("data-product-id");
	var rating = "";
	$.get(server+"/rating/?id=" + id, function(data) {
		rating = data;
		if(rating) {
			$article.prepend("<h4>IMDb rating</h4><div><img style='margin-bottom: 16px' src='http://www.garagefilm.se/Garagefilm_International/COCKPIT_files/300px-IMDb_logo.svg.png'><div style='margin-top: 8px; margin-left: 8px;' class='left'><h2 style='margin: 0px'>" + rating + "</h2></div></div>");
		}
	});
}