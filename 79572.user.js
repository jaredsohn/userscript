// ==UserScript==
// @author DnsIs
// @name Just Watch
// @namespace http://userscripts.org/scripts/show/79572
// @description The script adds 2 buttons under each photo for easier viewing (in the current window or a new).
// @include http://ru-foto.com/i*
// @include http://www.ru-foto.com/i*
// @include http://ru-foto.net/i*
// @version 1.01 14.02.2012
// ==/UserScript==

(function () {
	function graf (e) {
		image = document.images;
		var i, im = [],
			j = 0;
		for (i=0; i<image.length; i++) {
			if (image[i].src.match('gal')) {
				im[j] = image[i];
				j++;
			}
		}
		for(i=0; i<im.length; i++) {
			menu = document.createElement("div");
			menu.setAttribute("style","position:relative;height:16px;padding:2;margin:0;font-size:14px;");
			menu.style.visibility = "visible";
			r = im[i].parentNode.href.match(/prew.htm\?gal=(\d+);(\w+);(\d+);\d+/);
			menu.innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABuwAAAbsBOuzj4gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE5SURBVDiN3ZExS0JRFMd/53UXsZKGqKnB8U2BvL0+h7Pk4BQF0hdoLqeGejg5RKCfwIagIQgKXEsanjr5Hogl6TsNT8EeKa/GfvAf7uGc3z3ci6qSJFxRsG/sdv4u/2Ff221ciqpKsmGXotN0JuVWWVVVT1pldW6dCZccGBExQA5Y4zs+8KiqIZ8cdd+71v1rA+xT2p0GIQOLkGMAx/O8oN/v63w8zwuAnKrCOUP9ASoMLSCdSqXWY7czrUVbbdExVcGpCgCFhpCrC2ziWfHBGNsisssbtckqobcSFZ+Bp5CQARcGQESix5pjNBrh+35tdnZ7LpVehXQ9zfZGlrOdQ6uULT0IsBcEQXPRCnHxDBEhk8nsGwDLspY2LsMkaVom/i8CYwzj8fhXAmNMJAKy0/yFF1n0fUn5Ah2kyuKaODS2AAAAAElFTkSuQmCC' style='cursor:pointer' onclick='NewTab(\""+r[1]+"\",\""+r[2]+"\",\""+r[3]+"\")' alt='Open all photos in new tab'>";
			menu.innerHTML += "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAnlJREFUeNqMk01oE1EQx2ffy+aj6yaNoaVau/0whLa0irGUUr/wAzwIQTx7E8GD4EUtBcG79NZcFKwgtCBU8NBLobZQbEsotES0abQYkCYKbb5Mss1usrvOi42sSw4O/Hjv7f5n3uzMLBcKhYBSyvByHHcaAI4jAlJCUoZhRDVNyyJgtnQ6DfF4HGyH5+6mI57Lw1dDfWeCQ/72Fk+boiiZSCQSX5h721PIZ5ZQkzAH8Pl8MDo6CjQQCHgFd/ONW3ceXjwZ6B2QWt0tlHA2O8+LnV1dnW09g2Isuk6UspzAbMoImCHVajU4fCXUL3p9nV7BwRMOuPotbC+dOOY/f/3mINOxz7BiU1W1IzBwVmIOqayspLKggMX6Tw11z76a7IAGZqtUKh6ny3VU043ag752t9uiMZKZA57pGgbADGS9ohSA2j3oLDYScZpaYLpG7whWeze2sfqDEkIrVV23CnTd4D5trCaZDgErpFQqrU+/nNzRS+m0qhn/OLNuyIWsOj31PIFz8tXhcIDT6QSXywWCIIAoikBxI6eSyfzS/Fyzz9vM9Qb8QpPLKVbVcmF+7t23+/fufhwbe/RkbW1tF2MmcdjyCPxFkiTI5XIgy3IrCi4hfoQV8heyg3zGS27PzLwZn5h49vTgQJ4lhGwhwKAsVewx6ykb3S3kA/L+cGXnPezA98XFBS0cfjEejW4WZblUROddlgFlhUABFutP/ayTxp6jMIMZ7q+sLEM4PPUgHo/Jmcw+j/Iv8L9Wu43SayMj515vb/80gsHgYzeODBtbBmFFZ3OB8KaVN51rYJALdrtdQpbz+fxmPUA9iBlqWYlJV/9fir8FGABcRTW/lyW8lQAAAABJRU5ErkJggg==' style='cursor:pointer' onclick='insertDiv(\""+r[1]+"\",\""+r[2]+"\",\""+r[3]+"\")'> ";
			menu.innerHTML += " "+r[3]+" photos";
			im[i].parentNode.parentNode.align = 'left';
			im[i].parentNode.parentNode.insertBefore(menu, im[i].parentNode);
		}
	}
	headPage = document.getElementsByTagName('head')[0];
	var elem = document.createElement("script");
	elem.setAttribute("type", "text/javascript");
	elem.text = "function NewTab(gal,name,summ){wnd=window.open();wnd.focus();wnd.document.open();wnd.document.write('<html><head><title>Фото '+name+'</title></head><body><center>');";
	elem.text += "for (j=1;j<=summ;j++){if ((summ>9)&&(j<10)) {suf='0'} else {suf=''};";
	elem.text += "wnd.document.write(\"<img src='http://ru-foto.com/gal\"+gal+\"/\"+name+suf+j+\".jpg'>\")};";
	elem.text += "wnd.document.write('</center></body></html>');wnd.document.close();}";
	elem.text += "function insertDiv (gal,name,summ) {";
	elem.text += "y = mk(document.body, 'div', 'position: fixed; top:10px; left: 10px; height:95%; width: 97%; z-index: 9999; font-size: 10pt; border: 1px solid black; padding: 10px; font-family: sans-serif; background-color: white; opacity: 1.00; filter:alpha(opacity=99);');";
	elem.text += "z = mk(y,'button','', 'Close'); z.addEventListener('click', function() {document.body.removeChild(y)}, true);";
	elem.text += "ct='<center>';for(j=1;j<=summ;j++){if ((summ>9)&&(j<10)) {suf='0'} else {suf=''};";
	elem.text += "ct+=\"<img src='http://ru-foto.com/gal\"+gal+\"/\"+name+suf+j+\".jpg'>\"};ct+='<\/center>';";
	elem.text += "mk(y,'div','position: fixed; top:40px; left: 10px; height:90%; width: 97%; overflow: auto;',ct)}";
	elem.text += "function mk(p,t,s,i){var e = document.createElement(t);e.style.cssText=s;p.appendChild(e);if(i)e.innerHTML=i;return e}";
	headPage.appendChild(elem);
	graf();
})();
