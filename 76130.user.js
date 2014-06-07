// ==UserScript==
// @name          BangBros HD Link
// @description   Adds download link for HD version
// @version       1.1
// @include       http://*.bangbros.com/intro.htm*
// ==/UserScript==

	var imgs,i;
	imgs=document.getElementsByTagName('img');
	for(i in imgs) {
		if(/b_wmv.gif/.test(imgs[i].src)) {
				var wmvdla = imgs[i].parentNode;
			}
		}
// Create cell for download link and fix spacing
	var hddltd = wmvdla.parentNode.parentNode.appendChild(document.createElement("td"));
	hddltd.setAttribute("style","padding: 0px 0px 15px 10px");
	hddltd.appendChild(document.createElement("a"));
// Create a for download link and add image
	var hddla = hddltd.firstChild;
	hddla.appendChild(document.createElement("img"));
	var hddlimg = hddla.firstChild;
	hddlimg.src = "http://x-images1.bangbros.com/bangbros/members/buttons/b_large.gif";
	hddlimg.border = "0";
// Modify wmv download link to create mp4 link
	var wmvlink = wmvdla.href;
	hddla.href = wmvlink.replace("500k.wmv","_3000.mp4");
	hddla.addEventListener("mouseover", function() { hddlimg.src = "http://x-images1.bangbros.com/bangbros/members/buttons/b_large_on.gif"; }, false);
	hddla.addEventListener("mouseout", function() { hddlimg.src = "http://x-images1.bangbros.com/bangbros/members/buttons/b_large.gif"; }, false);
