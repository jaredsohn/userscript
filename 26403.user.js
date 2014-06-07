// ==UserScript==
// @name           download link on imhonet.ru
// @description    Simply adds a lib.rus.ec (library) and torrents.ru (russian national torrent tracker) links on the imhonet.ru (collaborative filtration site)
// @namespace      http://userscripts.org/users/52226
// @include http://*.imhonet.ru/element/*/
// @include http://*.imhonet.ru/collection/*/
// @version        0.6
// @date           2008-12-02
// ==/UserScript==

(function()
{
    if(document.body == null)
    {
        if(window.addEventListener) { window.addEventListener('load',function(){ InsertLibRusEcSearch(1); }, false); }
        else window.attachEvent('onload', function(){ InsertLibRusEcSearch(1); });
    }
    else InsertLibRusEcSearch(1);
})();

function CleanupURIComponent1251(s)
{
var r = s.split(''), i = r.length;

while(i--)
{
var c = r[i].charCodeAt(0);

if((c >= 1040 && c <= 1103) || c == 32 || (c >= 48 && c <= 57)
|| (c >= 65 && c <= 90) || (c >= 97 && c <= 122)) continue;

if(c == 1025 || c == 1105) { r[i] = '\u0435'; continue; }

r[i] = ' ';
}

return r.join('');
}

function InsertLibRusEcSearch(ft)
{
    var lnk = document.createElement("div"), panel = null;

    if(lnk == null || document.title == null || document.title.split(' - ')[0] == null
        || document.title.split(' - ')[0].length == 0) return;
	
	var loc = location.href.split('/'); // do not modify!
	loc = (loc[2] || '').split('.')[0].toLowerCase();

	if(loc == 'books')
	{
    lnk.innerHTML = '<h2 style="text-align:center; width:100%;"><img src="data:image/png;base64,'
    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEUBAACenaWqqrKrq7MSEA4t'
    + 'KSi9vsB4dHJaLRxAPjvT1dtHMzBpZW34+fvEx8q6vsIiGxv19vfk5uhJQD+Dh5T18/M5NDJVV2E/'
    + 'Oj+ZlZxYFgwwCQWrp62Ih4xmWlqwrbRwbHRAEwlEEQcZDwmEKBJoYGLLZDa6RSFJQT+nlZA/KCMh'
    + 'EQuwn5x/enuZj4+rnZssJB9JRkpoZWcwEAi1QRx3JRM0Cwh/fYOxtbwtHRttXV6NjpB3b3BpXlxN'
    + 'OzOtqrOtrLSqqbGtrLOkpK2qqbCurbSEhIx2eIFwamucmaCpp7Cpp66ioKeRj5adm6KamaCfnaWY'
    + 'l55nZ218fIKQjpWGh491d4B0c3eUk5ucnKScmqGbmaCPio6oqbOZmqeWlqKgoayam6iio7Cnp7BO'
    + 'GAxkOyPIxMGVkZenpK2wrbOnpKqjpbGvrrWvrbSqqK+rqrOioKavrbWxsLZ6dHWTj5OloqhYUE6o'
    + 'pq2fnKOIho3y8/VJSUmpqalSUlKUQCuioqIFAgI3MzE1NTVyMxUpEwtmZWWHQR8KDQ6iXS+VTyd+'
    + 'U0YUDQeaXTU1Fg6xsbDGxsYnHx3ZgktjKBA4GQwoFAyNORvWfUnIcUCyUyqYVjgWEA41HhJ2RTGD'
    + 'g4NmZ2cNDw+4USRcGw94JxJhYWgxHReyRiNiKBkoIh+BgYEXFxcODg9aWlrX19dvJRX6+vobFxW4'
    + 'uLcpKCh1HxB9OhrJd0LJd0XBZDzag0jLazObNhbbf0qWmZ+4usDdhUySPBs2Ggs4IBU/Jh1cGAph'
    + 'Iw9GEwdNFQmCKQ5bIRE0Dwa6SSHk5unXfEXXeEMxEAaPgYCWhYBuW1V9a2UzGw5QMh1WPi7hjFLi'
    + 'j1PmmlxFMCtEHRRZHhGSPirfkE98LBNFGAo7GxCmTSfYhkq+YzOaNhffi1DfjE/YhUbdhk1POzV3'
    + 'ZF4iDw7FbDdfFQdIJBM5IhVSGAmlQByoSyWMOhv///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    + 'AAAAAAAAAAAAAAC4EchDAAAAAXRSTlMAQObYZgAAAJxJREFUeNpjXPSfmfn//9+//4PpZAbGTf/9'
    + 'GTYgxIIY1/4Paa1ugStrZaxjrm/4L/ofJlLK2AViBcIF/jPeADIQCv4zM776//8mEp+ZcQ+KPPN/'
    + 'xlMbNqIKqKIq+M+o8AbC+PH/P+s/RuH/jJLI0kDrGdOB9HcIl4sLZG0lmD+d4T9DLlDszRtGd7Ak'
    + 'VM0+Hy7GxZvBzBX+G/3ADACDWaWUyGu9CAAAAABJRU5ErkJggg==" width="16px" '
    + 'height="16px" onload="this.style.visibility=\'visible\'"'
    + 'style="vertical-align:-15%; visibility:hidden">&nbsp;'
    + '<a href="http://lib.rus.ec/booksearch?ask=' + encodeURIComponent(document.title.split(' - ')[0])
    + '">\u0418\u0441\u043A\u0430\u0442\u044C \u043A\u043D\u0438\u0433\u0443 \u043D\u0430 Lib.Rus.Ec</a></h2>';
	}

	if(loc == 'films' || loc == 'tv' || loc == 'music' || loc == 'games')
	{
	lnk.innerHTML = '<h3 style="text-align:center; width:100%;">'
	+ '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9T'
    + 'AAADAFBMVEUBAAAAAAD////V1dXp6enr6+u/v7/i4uLu7u7d3d31lKnvWHje3t7j4+Pg4ODt7e32'
    + '9vbrM1rpEkDrJ1F+fn7+/v7IyMjQXXb5ucdJSUqYmJhf1DfnIUz0iqG8vLzY2Nil54+V4nuA3WE/'
    + 'yxCmpqbQN1j0tcP2oLPf39+xsbHDw8OI32uZmZ49PT5kZWXS0tLh4eH8/PxBzBOi5oxsbGwMEVYc'
    + 'JJlTWr1scrvU1NSioqJo1kOh5oorLEYLFZMRHs0SIOGztuvPz8+kpKTx8fGurq7Z9c9paWkSIelX'
    + 'V1fMzM6goKCampqUlJSCgoLz8/MZJ+kqOOpcZ/Cbofbc3NyIiIhATe3d3/zb29tOTk5ycnJ8fHyK'
    + 'iorq6urLy8tD+QwAAAgAAGAAACgAACNBocAAAABBzjxD+NQ+FNRD+QwAAEgAAB9BosAAAABBzlxD'
    + '+NQ+FPhD+QxYRHhDO9gANBQAAAAAAABYRHhDO9gANABD/dxD+TRYRHhDO9gAM+xpZUgAdGhD+dhD'
    + '+dgAABRkaVcAACgAABcAAAAAAAZpZUgAADwAABcAAAAAAAdwYUMAAFAAABcAAAAAAAdwYUMAAGQA'
    + 'AB8AAAAAAAxjb0ZvQ3NvcnQAAIAAAB8AAAAAAAxjb0ZvQ3NvcnQAAJwAAB9BRkRD9yRDibxCZOoA'
    + 'AAAAALgAABdD+mRD/cAAAAAAAMwAABcAAAAAAAdTYmwAAOAAAT9CYpAAAAAAAAAAAAAAAAAAAAAA'
    + 'AAAAAAABAAgAAABDdcxD+qgAAAwAAEQAADIAAA0ACOoAAAABAQEAAAAAAwFD/WRD++QAAAAAAA9D'
    + '/Az0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAABEwGAAAAAAAAAA'
    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABD/DAAAAAAAAABMzfJAAAAAXRSTlMAQObYZgAAAM5J'
    + 'REFUeNpFzssLAVEUBvDv82q8htihRNmwkbKwUgpNWfgfLa1JEzbKwobdWCiPBWXhzSiUa2bwLc49'
    + '53fPrUtYsfNpnDRH5wsO8v4HN6kDHp5NkCkC7kNX3QC/RD4AF7m2nkQvXtuNnpdjJSD+WZ8nyVmK'
    + '1ASkpwmxI2lp4dftCcySRwTHORoZgvKlwM08EzShBzqLiwS75YNbglplGyyEPjejnSKqmu+DgbJa'
    + 'mbgyHYVNILayvu6raUtlF+bgC0Apsve3ovnGD+R6UzeaN6eVNRH2+I/hAAAAAElFTkSuQmCC" width="16px" '
    + 'height="16px" onload="this.style.visibility=\'visible\'"'
    + 'style="vertical-align:-15%; visibility:hidden">&nbsp;'
    + '<a href="http://torrents.ru/forum/tracker.php?nm=' + CleanupURIComponent1251(document.title.split(' - ')[0]) /*f[]=7&f[]=187&f[]=212&f[]=505&f[]=934&f[]=22&f[]=941&f[]=124&*/
    + '&s=2&o=11">\u0418\u0441\u043A\u0430\u0442\u044C \u0444\u0438\u043B\u044C\u043C / \u0441\u0435\u0440\u0438\u0430\u043B / \u043C\u0443\u0437\u044B\u043A\u0443 / \u0438\u0433\u0440\u0443 \u043D\u0430 torrents.ru</a></h3>';
	}
    var a = document.body.getElementsByTagName('div');

    for(var i = 0; i < a.length; i++)
    {
        if(a[i].className && a[i].className.split(' ')[0].toLowerCase() == 'desc')
            panel = a[i].parentNode;
    }

    if(panel == null) return;

    if(ft) panel.insertBefore(lnk, panel.firstChild);
    else panel.appendChild(lnk);
}