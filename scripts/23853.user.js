// ==UserScript==
// @name           ERepublik - Link countrynames to countries
// @namespace      arvid.jakobsson@gmail.com
// @description    Links names (such as USA) to their details page in the forums, profile description and in comments
// @include        http://www.erepublik.com/*
// ==/UserScript==

var textNodesPerPage = [
	{
		urlRegexp: /press_release-\d+\.html/,
		textNodeXP: ["//div[@class='article-content']",
			"//div[@class='comment']//div[@class='post']/p"]
	},
	{
		urlRegexp:/article-\d+\.html/,
		textNodeXP: ["//div[@class='article-content']/p[1]",
			"//div[@class='comment']//div[@class='post']/p"]
	},
	{
		urlRegexp:/profile-\d+\.html/,
		textNodeXP: ["//div[@class='upinfo1']/div[starts-with(@id, 'about_me')]"]
	},
	{
		urlRegexp:/forum-topic-\d+\.html$/,
		textNodeXP: ["//td[@class='forum_text']"]
	}
];

var countryRegexpToLink = [
	{ name: 'Argentina', l: 'http://www.erepublik.com/country-27.html'},
	{ name: 'Australia', l: 'http://www.erepublik.com/country-50.html'},
	{ name: 'Austria', l: 'http://www.erepublik.com/country-33.html'},
	{ name: 'Belgium', l: 'http://www.erepublik.com/country-32.html'},
	{ name: 'Brazil', l: 'http://www.erepublik.com/country-9.html'},
	{ name: 'Bulgaria', l: 'http://www.erepublik.com/country-42.html'},
	{ name: 'Canada', l: 'http://www.erepublik.com/country-23.html'},
	{ name: 'China', l: 'http://www.erepublik.com/country-14.html'},
	{ name: 'Czech Republic', l: 'http://www.erepublik.com/country-34.html'},
	{ name: 'Denmark', l: 'http://www.erepublik.com/country-55.html'},
	{ name: 'Finland', l: 'http://www.erepublik.com/country-39.html'},
	{ name: 'France', l: 'http://www.erepublik.com/country-11.html'},
	{ name: 'Germany', l: 'http://www.erepublik.com/country-12.html'},
	{ name: 'Greece', l: 'http://www.erepublik.com/country-44.html'},
	{ name: 'Hungary', l: 'http://www.erepublik.com/country-13.html'},
	{ name: 'India', l: 'http://www.erepublik.com/country-48.html'},
	{ name: 'Indonesia', l: 'http://www.erepublik.com/country-49.html'},
	{ name: 'Iran', l: 'http://www.erepublik.com/country-56.html'},
	{ name: 'Ireland', l: 'http://www.erepublik.com/country-54.html'},
	{ name: 'Israel', l: 'http://www.erepublik.com/country-58.html'},
	{ name: 'Italy', l: 'http://www.erepublik.com/country-10.html'},
	{ name: 'Japan', l: 'http://www.erepublik.com/country-45.html'},
	{ name: 'Mexico', l: 'http://www.erepublik.com/country-26.html'},
	{ name: 'Moldova', l: 'http://www.erepublik.com/country-52.html'},
	{ name: 'Netherlands', l: 'http://www.erepublik.com/country-31.html'},
	{ name: 'Norway', l: 'http://www.erepublik.com/country-37.html'},
	{ name: 'Pakistan', l: 'http://www.erepublik.com/country-57.html'},
	{ name: 'Poland', l: 'http://www.erepublik.com/country-35.html'},
	{ name: 'Portugal', l: 'http://www.erepublik.com/country-53.html'},
	{ name: 'Romania', l: 'http://www.erepublik.com/country-1.html'},
	{ name: 'Russia', l: 'http://www.erepublik.com/country-41.html'},
	{ name: 'Slovakia', l: 'http://www.erepublik.com/country-36.html'},
	{ name: 'South Africa', l: 'http://www.erepublik.com/country-51.html'},
	{ name: 'South Korea', l: 'http://www.erepublik.com/country-47.html'},
	{ name: 'Spain', l: 'http://www.erepublik.com/country-15.html'},
	{ name: 'Sweden', l: 'http://www.erepublik.com/country-38.html'},
	{ name: 'Switzerland', l: 'http://www.erepublik.com/country-30.html'},
	{ name: 'Thailand', l: 'http://www.erepublik.com/country-59.html'},
	{ name: 'Turkey', l: 'http://www.erepublik.com/country-43.html'},
	{ name: 'Ukraine', l: 'http://www.erepublik.com/country-40.html'},
	{ name: 'United Kingdom', l: 'http://www.erepublik.com/country-29.html'},
	{ name: 'USA', l: 'http://www.erepublik.com/country-24.html'},
	{ name: 'Venezuela', l: 'http://www.erepublik.com/country-28.html'}
].map(function (v) { 
	v.nameRegExp = new RegExp('(\\s+|^)(e?' + v.name.replace(/\s+/, '\\s+') + ')(\\s+|[.,!?]|$)', 'i');
	return v; 
});

(function() {
	textNodesPerPage.forEach(function (v) {
		if (location.pathname.match(v.urlRegexp)) {
			$x(v.textNodeXP.join(" | ")).forEach(function (vv) {
				countryRegexpToLink.forEach(function (vvv) {
					if ($x("./ancestor-or-self::a", vv).length == 0)
						vv.innerHTML = vv.innerHTML.replace(vvv.nameRegExp, '$1<a href="' + vvv.l + '">$2</a>$3');
				});
			});
		}
	});
})();

/* std functions */
function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	return $x(xpath, root)[0];
}
