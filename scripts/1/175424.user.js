// ==UserScript==
// @name            Customize Discuz! Space's CSS
// @namespace       http://i.pcbeta.com/space-uid-93460.html
// @description     自定义 Discuz! 论坛的个人空间 CSS
// @author          小影
// @include         http://*/home.php?mod=space*&diy=yes*
// @grant           none
// @version         0.3
// ==/UserScript==

(function (li, textarea, controlnav, controlcontent) {

	textarea.style.cssText = "width:100%;height:100%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box";
	textarea.value = document.getElementById("diy_style").textContent;
	textarea.onchange = function () {
		spaceDiy.getSpacecssStr = function () {
			return textarea.value;
		};
	};

	li.innerHTML = "<a href='javascript:;'>自定义 CSS</a>";
	li.onclick = function () {
		controlnav.querySelector(".current").className = "";
		li.className = "current";
		controlcontent.innerHTML = "";
		controlcontent.appendChild(textarea);
	};

	controlnav.appendChild(li);

})(document.createElement("li"), document.createElement("textarea"), document.getElementById("controlnav"), document.getElementById("controlcontent"));