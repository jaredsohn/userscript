// ==UserScript==
// @name           Forrst Favicon Redesigned
// @namespace      http://tylersticka.com/
// @version        1.1
// @description    Replaces the Forrst favicon (also designed by Tyler Sticka) with a wooden variation.
// @include        http://forrst.com/*
// @include        https://forrst.com/*
// ==/UserScript==

(function(d, h) {
	// Create this favicon
	var ss = d.createElement('link');
	ss.rel = 'shortcut icon';
	ss.type = 'image/x-icon';
	ss.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAWwAAANwAAADcAAAA3AAAANwAAADcK0tM8SpKTPEAAADcAAAA3AAAANwAAADcAAAA3AAAAFsAAAAAAAAAWw0iM+kkWYX/JFuF/yNZhf8jW4f/HVB2/0eIqf9Ii63/H1F3/yFWgv8iVID/JFuH/yRah/8NIjPpAAAAWwAAAJkpXoj/H1qG/0x4nP9ZgaP/WoKl/z9piP9Giav/RIqs/z5pif9ag6T/WYCg/098n/8gW4b/K2CL/wAAAJkAAACZM2eR/yZij/8jNkP/HCYs/xwmLP8cJiz/SYmr/0aIqP8dJi3/HSYs/xwmLP8iM0D/JFuG/zRplP8AAACZAAAAmTtsk/8pX4v/JU1u/xwmLP8dJy3/HSYs/0yNrf9Kiqz/HCYs/x0mLP8dJiz/Jk1r/ythjf86a5H/AAAAmQAAAJlCcJT/K2GL/ythjP8iMTv/HSYs/xwmLP9Njq3/T5Kz/x0mLP8dJi3/IS85/y1ij/8tY4z/QnCU/wAAAJkAAACZS3aa/zFnk/8xZY//Kkxo/xwmLP8dJy3/fqvD/3+sxP8dJiz/HCYs/ylKZP8xZpD/MmeT/0p2m/8AAACZAAAAmVSCpP81bJX/NmqV/zVpkf8hLjb/HSYs/x0mLP8cJiz/HSYs/yAtNf8zY4n/NmuU/zVrlv9Tf6L/AAAAmQAAAJlch6j/Om2T/zpwmf85bZT/LUpi/x0mLP8cJiz/HCYs/xwmLP8sSF//OGmR/zlulv85bZb/WoOn/wAAAJkAAACZYoqr/z5wmf8+dp3/PW2V/ztpjf8fKTD/HCYs/xwmLP8fKjH/OmiM/zxrk/8/cZr/PG+W/2KKq/8AAACZAAAAmWqSsf9Cdp7/Qnad/0FxmP9Acpn/L0lc/xwmLP8cJiz/L0da/0Fxmf9Ab5b/QXKZ/0J3n/9pka//AAAAmQAAAJlwlbP/RXab/0V1m/9Gdpz/RXSb/z5oi/8eJy3/Higu/z5pi/9Ec5r/Q3Sa/0V0mv9FdZv/b5Sz/wAAAJkAAACZdZq4/0d1nP9Jd5//SXef/0h3nf9JeJ//LkJS/y1AT/9IdZz/R3WZ/0h3nv9Jd53/SHeb/3SYtf8AAACZAAAAmXibuP9LeZ//S3uh/0l6oP9LeZ//SXqe/0Bph/8/ZoT/Snug/0p3m/9IeJ3/S36j/0p7n/94nLj/AAAAmQAAAFstQlO+eJq3/3meuv95nbj/ep+6/3mduP95nLf/eJ23/3iduP94mbb/eZ24/3qduv95nbf/LUBSvgAAAFsAAAAAAAAAWwAAAJkAAACZAAAAmQAAAJkAAACZAAAAmQAAAJkAAACZAAAAmQAAAJkAAACZAAAAmQAAAFsAAAAAwAMAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAwAMAAA==';
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