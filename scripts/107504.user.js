// ==UserScript==
// @name           Old free GOG game boxes
// @namespace      http://userscripts.org/users/274735
// @description    Removes the "free" banner from the box images of free games in your GOG shelf
// @include        https://www.gog.com/en/myaccount/shelf/
// @include        https://www.gog.com/en/myaccount/shelf
// @include        https://www.gog.com/en/myaccount/
// @include        https://www.gog.com/en/myaccount
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$(function() {
	var boxmap = {
		/*beneath a steel sky*/
		"/upload/images/2011/07/6c63f3409e7c58a9394c4d24ba6abd4c6b2209dc_bbC_20.jpg":
		"/upload/images/2008/12/9e0ecf4e538ceffad124110452ad1b5870296d02_bbC_20.jpg",

		/*lure of the temptress*/
		"/upload/images/2011/07/a8352d39fe76732ecb09bc89166a36db65033a15_bbC_20.jpg":
		"/upload/images/2008/11/d6f02c135191c6524cfeb3794ef9157ef4b8126e_bbC_20.jpg",

		/*teen agent*/
		"/upload/images/2011/07/333b924adb56a2e5cc0edb5dd3c005287b4fa51b_bbC_20.jpg":
		"/upload/images/2009/03/d1a6515ee86ebcae629db73ff1677b1a6680f28a_bbC_20.jpg",

		/*tyrian 2000*/
		"/upload/images/2011/07/ca8d777deecf242e069379605ce62f07ead617de_bbC_20.jpg":
		"/upload/images/2010/12/c129a5fd30fa5060b2fad11cda4fdb70fd64161e_bbC_20.jpg",

		/*dragonsphere*/
		"/upload/images/2011/07/1132629235aff798a140b8cee096359bc6647c0b_bbC_20.jpg":
		"/upload/images/2011/04/622bec2f2040347998ce464927de9c1922a01482_bbC_20.jpg",
	};

	$(".shelf_box img").each(function() {
		var src = this.getAttribute('src');
		var original_src = boxmap[src];
		if (original_src) {
			this.setAttribute('src', original_src);
		}
	});
});