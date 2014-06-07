// ==UserScript==
// @name     brolaf_justice
// @author   xyuTa
// @version  0.110
// @date     27.06.2013
// @include  http://brolaf.ru/*
// ==/UserScript==

function img_replacer(event)
{
	var imgs = document.getElementsByTagName("img");
	var previewBaseUrl = "http://brolaf.ru/pdata/t/";
	var originalBaseUrl = "http://brolaf.ru/pdata/t/l-";
	var image18 = "/nsfw";
	var imgpage = document.location.href.indexOf("/p/") != -1;

	if (imgpage)
	{
		var imgid = document.location.href.match(/\/(\d+)$/)[1];
		document.getElementById("content").className = "";
		// document.getElementById("post-control-bar").innerHTML = '<input id="imageLink" class="stumbleupon-btn" value="' + originalBaseUrl + imgid + '.jpg"/>' + document.getElementById("post-control-bar").innerHTML;
		// document.getElementsByClassName("img-wrap")[0].innerHTML = '<input id="imageLink" value="' + originalBaseUrl + imgid + '.jpg"/>' + document.getElementsByClassName("img-wrap")[0].innerHTML;
		// document.getElementById("imageLink").focus();
	}

	for (var i = 0; i < imgs.length; ++i)
	{
		if (imgs[i].src.indexOf(image18) != -1)
		{
			if (!imgpage)
			{
				var imgid = imgs[i].parentNode.href.match(/\/(\d+)$/)[1];
			}
			imgs[i].src = ((imgpage) ? originalBaseUrl : previewBaseUrl) + imgid + ".jpg";
			imgs[i].addEventListener("error", function()
			{
				imgid = (imgpage) ? document.location.href.match(/\/(\d+)$/)[1] : this.src.match(/\/(\d+)\./)[1];
				var formatList = [".jpg", ".png", ".gif"];
				var format = this.src.match(/(\.\w+)$/)[1]; // replace!
				this.src = ((imgpage) ? originalBaseUrl : previewBaseUrl) + imgid + formatList[formatList.indexOf(format) + 1];
			}, false);
		}
	}
}

document.addEventListener("DOMContentLoaded", img_replacer, false);


// document.getElementsByClassName("msg-box")[1].parentNode.removeChild(document.getElementsByClassName("msg-box")[1]);