// ==UserScript==
// @name           Give-a-fuck-o-meter
// @namespace      leprosorium
// @require        http://userscripts.org/scripts/source/44063.user.js
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==

(function() {

const BODY = $(document);
const MIN_HEIGHT = 15;
const WIDTH = 3;
const BUTTON_HEIGHT = 18;
const HEIGHT = BODY.getSize().y - BUTTON_HEIGHT * 2;
const RATINGS = loadRatingsPosition();
const MARK_COMMENTS = RATINGS.length < 50;

function getScrollerSize() {
	result = Math.pow(BODY.getSize().y, 2) / BODY.getScrollSize().y;
	return (result < MIN_HEIGHT) ? MIN_HEIGHT : result;
}
function loadRatingsPosition() {
	ratings = [];
	$$('.rating em').each(function(el) {
		ratings.push({
			top: el.getTop(),
			value: el.innerHTML
		});
	});
	return ratings;
}

function getScaledOffset(realPosition) {
	return realPosition * HEIGHT / BODY.getScrollSize().y;
}

function maxRating() {
	return loadRatingsPosition().map(function(a){return a.value}).reduce(function(a,b){return Math.max(a,b)});
}

function getColor(rating, maxRating) {
	if (maxRating == 0) return "rgba(0,0,0,0)";
	rating = (rating < 0) ? 0 : rating;
	return "rgba(0,0,0," + (rating / maxRating).toFixed(2) + ")";
}

function addCanvas() {
	canvas = new Element('canvas', {
		styles: {
			position: 'fixed',
			right: 0,
			top: BUTTON_HEIGHT + "px"
		}
	});
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.inject($$('body')[0]);

	return canvas.getContext('2d');
}

function addMap() {
	canvas = addCanvas();
	last = 0;
	maxRate = maxRating();
	loadRatingsPosition().each(function(rating){

		if (MARK_COMMENTS) {
			marker_width = 2;
			canvas.fillStyle = "rgba(0,0,0,.3)";
			canvas.fillRect(WIDTH-marker_width, last, marker_width, 1);
		}

		canvas.fillStyle = getColor(rating.value, maxRate);
		scaled = Math.round(getScaledOffset(rating.top));
		canvas.fillRect(0, last, WIDTH, scaled-last);
		last = scaled;
	});
}

window.addEventListener ("load", addMap, false);

})();