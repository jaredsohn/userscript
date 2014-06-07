// ==UserScript==
// @name           RTM Favicon Redesigned
// @namespace      http://tylersticka.com/
// @version        1.3
// @description    Replaces the Remember the Milk favicon with one designed by Tyler Sticka.
// @include        http://www.rememberthemilk.com/*
// @include        https://www.rememberthemilk.com/*
// ==/UserScript==

(function(d, h) {
	// Create this favicon
	var ss = d.createElement('link');
	ss.rel = 'shortcut icon';
	ss.type = 'image/x-icon';
	ss.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAACMuAAAjLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw9PDw8sjw8PP88PDz/PDw8/zw8PP88PDz/PDw8/zw8PLI8PDw9AAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw9PDw8soiIiP/l5eX/19fX/+Tk5P/o6Oj/19fX/+np6f+IiIj/PDw8sjw8PD0AAAAAAAAAAAAAAAAAAAAAPDw8sq+vr//r6+v/zs7O/2pqav/IyMj/yMjI/2pqav+7u7v/6+vr/6+vr/88PDyyAAAAAAAAAAAAAAAAAAAAADw8PP/m5ub/29vb/9vb2//b29v/5ubm/+bm5v/b29v/29vb/9vb2//m5ub/PDw8/wAAAAAAAAAAAAAAAAAAAAA8PDz/6+vr/+Li4v/r6+v/6+vr/+vr6//x8fH/6+vr/+vr6//i4uL/6+vr/zw8PP8AAAAAAAAAAAAAAAAAAAAAPDw8//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw//Dw8P/w8PD/8PDw//Dw8P88PDz/AAAAAAAAAAAAAAAAAAAAADw8PLKzs7P/8PDw//j4+P/4+Pj/+Pj4//j4+P/4+Pj/+Pj4//X19f+zs7P/PDw8sgAAAAAAAAAAAAAAAAAAAAA8PDw9PDw8svb29v/X19f/PDw8//b29v/29vb/PDw8/9fX1//29vb/PDw8sjw8PD0AAAAAAAAAAAAAAAAAAAAAAAAAADw8PP/7+/v/29vb/3Z2dv/7+/v/+/v7/3Z2dv/b29v/+/v7/zw8PP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDyy/////+/v7//o6Oj////////////o6Oj/7+/v//////88PDyyAAAAAAAAAAAAAAAAPDw8fDw8PP88PDz/PDw8/2VlZf+8vLz/lJSU/7y8vP+UlJT/vLy8/5SUlP+8vLz/PDw8/zw8PP88PDz/PDw8fDw8PLL/////oKCg/zw8PP88PDz/ZWVl/zw8PP9lZWX/PDw8/2VlZf88PDz/PDw8/zw8PP+goKD//////zw8PLI8PDw9PDw8/zw8PP88PDx8PDw8sjw8PP88PDz/PDw8/zw8PP88PDz/PDw8/zw8PLI8PDx8PDw8/zw8PP88PDw9AAAAAAAAAAAAAAAAAAAAADw8PP//////PDw8sgAAAAAAAAAAPDw8sv////88PDz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDz//////zw8PHwAAAAAAAAAADw8PHz/////PDw8/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDw8Kzw8PP88PDz/AAAAAAAAAAA8PDz/PDw8/zw8PCsAAAAAAAAAAAAAAAAAAAAA8A8AAOAHAADAAwAAwAMAAMADAADAAwAAwAMAAOAHAADgBwAA4AcAAIABAAAAAAAAkAkAAPGPAADzzwAA+Z8AAA==';
	// Remove any existing favicons
	var links = h.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].href == ss.href) return;
		if (links[i].rel == "shortcut icon" || links[i].rel=="icon")
			h.removeChild(links[i]);
	}
	// Add this favicon to the head
	h.appendChild(ss);
	// Force browser to acknowledge
	var shim = document.createElement('iframe');
	shim.width = shim.height = 0;
	document.body.appendChild(shim);
	shim.src = "icon";
	document.body.removeChild(shim);

})(document, document.getElementsByTagName('head')[0]);