// ==UserScript==
// @name           Amazon - toggle "Customer Reviews"
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Enable to toggle "Customer Reviews" on amazon.
// @include        http://www.amazon.co.jp/*
// @include        http://www.amazon.com/*
// @include        http://www.amazon.co.uk/*
// @include        http://www.amazon.ca/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.fr/*
// @version        0.3
// ==/UserScript==

(function(){
	var Reviews = document.evaluate('//div[@id="customerReviews"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < Reviews.snapshotLength; i++) {
		var ReviewsSwitchButton = document.createElement("a");

		ReviewsSwitchButton.style.color = "blue";
		ReviewsSwitchButton.style.fontSize = "small";
		ReviewsSwitchButton.style.fontWeight = "bolder";
		ReviewsSwitchButton.style.textDecoration = "none";
		ReviewsSwitchButton.style.verticalAlign = "middle";

		ReviewsSwitchButton.addEventListener("click", function() {
			var thisBody = this.parentNode.parentNode.getElementsByTagName("div")[0];

			var hide = (thisBody.style.display == "none");
			thisBody.style.display = hide ? "block" : "none";
			this.innerHTML = hide ? " CLOSE" : " OPEN";
		}, false);

		var ReviewsBody = Reviews.snapshotItem(i).getElementsByTagName("div")[0];
		var ReviewsTitle = Reviews.snapshotItem(i).getElementsByTagName("h2")[0];

		ReviewsTitle.appendChild(ReviewsSwitchButton);
		ReviewsBody.style.display = "none";
		ReviewsSwitchButton.innerHTML = " OPEN";
	}

})();