// ==UserScript==
// @name           ERepublik - Company / Employee ratio
// @namespace      arvid.jakobsson@gmail.com
// @description    Displays the company / employee ratio on the "post cv" page.
// @include        http://www.erepublik.com/post_cv.html
// ==/UserScript==

(function () {
	$x("//form[starts-with(@onsubmit, 'hire')]//tr/td[3]/p").forEach(function (v, i, a) {
		
		var match = v.textContent.match(/(\d+)\s+companies,\s+(\d+)\s+employees/);
		var employees = parseInt(match[2], 10);
		var companies = parseInt(match[1], 10);
		var ratio = 0;
		
		if (companies == 0)
			ratio = "inf.";
		else
			ratio = employees / companies;
			
		console.log("c: " + companies + ", e: " + employees + ", r: " + ratio);
		
		v.innerHTML = "(<strong>" + companies + "</strong> companies, <strong>" + employees + "</strong> employees, ratio: <strong>" + (Math.round(ratio*10)/10) + "</strong>)";
	});
})();

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}