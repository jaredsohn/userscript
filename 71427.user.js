// ==UserScript==
// @name           HabrTree
// @namespace      dotneter
// @grant none
// @include http://habrahabr.ru/post/*
// @include http://habrahabr.ru/company/*/blog/*
// ==/UserScript==

var scoreLeftSide = false;
var autoSort = false;
var green = "#339900";
var red = "#CC0000";
var neutral = "#339900";
var hightlight = "LightGreen";

function letsJQuery() {
	(function($){


		$(function(){
			$("b.spoiler_title").addClass("clickable");
			if(scoreLeftSide){
				var comments = $("#comments");
				comments.css({overflow:'visible'});
				$("#comments .mark").css({position:"absolute", left:-40});
			}





			function tag(name, attrs){
				return $("<" + name + ">", attrs);
			}

			function getIntFromText(text){
				if(!text) return 0;
				var number = /([+-]?\d+)/.exec(text.replace("–","-"))[1];
				return parseInt(number,10);
			}

			function getIntRating(span){
				var rating = span.html();
				return getIntFromText(rating);
			}

			function desc(a,b) { return b - a; }

			function hightlightRating(i){
				$("a.open-comment").remove();
				$("div.comment_item").each(function(){
					var comment = $(this);
					var message = $('div.message:first',comment);
					message.css("border-top", "");
					var rating = getIntRating($(scoreSelector+':first',comment));
					if(rating >= i){
						message.show();
						var color = hightlight;
						message.css("border-top", "5px solid " + color);
						message.parents("div.comment_item.comment-close").each(function(){
							showMessage($(this));
						});
					}else{
						comment.addClass("comment-close");
						message.hide();
						$("div.reply_comments:first",comment).hide();
						addOpenLink(comment);

					}
				});
			}

			function showMessage(comment){
				comment.removeClass("comment-close");
				$("a.open-comment:first", comment).remove();
				$("div.message:first", comment).show();
				$("div.reply_comments:first", comment).show();
			}

			function addOpenLink(comment){
				var div = $("div.reply:first", comment);
				var open = tag("a", {"class": "reply open-comment", href:"#", text:"раскрыть"});
				open.click(function(){
					showMessage(comment);
					return false;
				});
				div.append(open);
			}

			function wilsonScore(up, down) {
					if (!up) return 0;
					var n = up + down;
					var z = 1.64485; //1.0 = 85%, 1.6 = 95%
					var phat = up / n;
					return (phat+z*z/(2*n)-z*Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n);
			}


			var scoreSelector = "span.score";

			var allRatings = {};

			(function initRatings(){
				$("#comments div[id^='voting_']").each(function(){
					var id = getIntFromText($(this).attr("id")); 
					var scoreSpan = $(scoreSelector,$(this));
					var habrRating = getIntRating(scoreSpan);
					var upDown = scoreSpan.attr('title').split(':')[1].split('и');
					var up = getIntFromText(upDown[0]);
					var down = getIntFromText(upDown[1]);
					var wilsonRating = parseInt(wilsonScore(up,down)*100,10);
					scoreSpan.append(tag("span",{'style':"color:yellow;",'text':" " + wilsonRating}));
					allRatings[id] = [habrRating,wilsonRating];
				});
			})();

			function appendRatings(ratings){

				var ratingsDiv = tag('div');
				var ratingsSorted = $.map(ratings, function(i,k){return parseInt(k,10);}).sort(desc);
				if(!ratingsSorted.length)
					return;
				$.each(ratingsSorted, function(k,i){
					var anchor = tag('a', {'class': 'rating-link', href:"#", text:i}).css("color", getRatingColor(i));
					anchor.click(function(){
						hightlightRating(parseInt(anchor.html(),10));
						return false;
					});
					ratingsDiv.append(anchor);
					if(ratings[i] > 1) ratingsDiv.append("(" + ratings[i] + ") ");
					else  ratingsDiv.append(" ");
				});

				$("#comments").prepend(ratingsDiv);
			}

			function showRatings(){
				var habrRatings = $.map(allRatings, function(x){return x[0];});
				var wilsonRatings = $.map(allRatings, function(x){return x[1];});
				function groupByRating(list){
					var ratings = {};
					$(list).each(function(i,v){
						var intRating = v;
						if(!ratings[intRating]) ratings[intRating] = 0;
						ratings[intRating] = ratings[intRating] + 1;		
					});
					return ratings;
				}
				appendRatings(groupByRating(wilsonRatings));
				appendRatings(groupByRating(habrRatings));

			}

			showRatings();

			function getRatingColor(rating){
				if(rating < 0)
					return red;
				if(rating === 0)
					return neutral;
				return green;
			}
			$.fn.sortElements = (function(){

				var sort = [].sort;

				return function(comparator, getSortable) {

					getSortable = getSortable || function(){return this;};

					var placements = this.map(function(){

						var sortElement = getSortable.call(this),
						parentNode = sortElement.parentNode,

						nextSibling = parentNode.insertBefore(
							document.createTextNode(''),
							sortElement.nextSibling);

							return function() {

								if (parentNode === this) {
									throw new Error(
										"You can't sort elements if any one is a descendant of another.");
								}

								parentNode.insertBefore(this, nextSibling);
								parentNode.removeChild(nextSibling);

							};

					});

					return sort.call(this, comparator).each(function(i){
						placements[i].call(getSortable.call(this));
					});

				};

			})();


			if(autoSort){
				(function sortComments(){
					var mylist = $('#comments>div.comment_item');
					mylist.sortElements(function(a, b){
						var ratingA = getIntRating($(scoreSelector, a).first());
						var ratingB = getIntRating($(scoreSelector, b).first());
						return ratingB - ratingA;
					});
				})();
			}


			(function showWordCount(){
				var count = $("div.content").text().split(/\s+/).length;
				$("h1.title").append(" [" + count + "]");
			})();

		});

	})(jQuery);





}
letsJQuery();






















