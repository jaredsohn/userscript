// ==UserScript==
// @author woodbaton <woodbaton@yandex.ru>
// @name HWM_Indicator_Of_The_Strength
// @include http://*.heroeswm.ru/home.php*
// @include http://hommkingdoms.info/home.php*
// @include http://*.heroeswm.ru/inventory.php*
// @include http://hommkingdoms.info/inventory.php*
// @description Скрипт добавляет индикатор прочности к инвентарю (19.02.2012)
// @version 1.0
// ==/UserScript==

(function () {
	var i, c;
	function write() {
		var el = document.getElementsByClassName('adiv');
		if (el.length > 0) {
			for (i = 0; i < el.length; i++) {
				el[i].parentNode.removeChild(el[i]);
			}
		}
		image = document.images;
		for (i = 0; i < image.length; i++) {
			if ((image[i].title.match('Прочность:')) && (image[i].width > '20') && (image[i].height != '30')) {
				p = image[i].title.match(/: (\d+)\/(\d+)/);
				p = (100 * p[1] / p[2]);
				menu = document.createElement("div");
				menu.setAttribute("class", "adiv");
				menu.setAttribute("style", "align:left; background:white; position:absolute; border:1px solid; width:48px; height:2px; padding:0; margin:0;");
				switch (true) {
					case p < 21: c = '#f00f00'; break;
					case p < 41: c = '#c03f00'; break;
					case p < 61: c = '#807f00'; break;
					case p < 81: c = '#40bf00'; break;
					case p < 101: c = '#00ff00'; break;
				}
				menudiv = document.createElement("div");
				menudiv.setAttribute("style", "align:left; background:" + c + "; height:2px; padding:0; margin:0; width:" + p + "%");
				menu.appendChild(menudiv);
				image[i].parentNode.parentNode.align = 'left';
				image[i].parentNode.parentNode.width = '50px';
				image[i].parentNode.align = 'left';
				image[i].parentNode.insertBefore(menu, image[i]);
			}
		}
		GM_addStyle('#breadcrumbs li.subnav:hover ul {z-index: 65000}');
	}
	document.addEventListener('click', function () {setTimeout(write, 1000);}, false);
	write();
})();