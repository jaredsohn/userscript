// ==UserScript==
// @name           BILD-Links markieren
// @namespace      fgsfds
// @description    Zeigt das Logo dieses Käseblatts zu Links dahin an
// @include        http://forum.mods.de/bb/thread.php*
// @include        http://forum.counter-strike.de/bb/thread.php*
// @include        http://forum.cstrike.de/bb/thread.php*
// @include        http://82.149.226.138/bb/thread.php*
// @include        http://claire-and-wolfgang.info/bb/thread.php*
// @include        http://www.claire-and-wolfgang.info/bb/thread.php*
// @include        http://blowupyourshirt.de/bb/thread.php*
// @include        http://www.blowupyourshirt.de/bb/thread.php*
// ==/UserScript==

var links = document.querySelectorAll("a[href*='bild.de']");
for (var i in links) {
	links[i].innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAPAAAAEACuRh2NAAAB0UlEQVQoz32TvW4TURCFv7m762Vtrw2JEnkdJEsogj5RLCPlCQIN8TPwCsB7YBOggSolbZoU0EEkhARVOn4qTAFBa1t4d+9QrLO2lcSnuT+jc+bOmTtyGjWeAA9QVQAQEEAVRGbrOfKzAG9c4BYibfH9PGgtmmWI64K1YAyapsVePA+dTED1k9E0xWu1iA6ec/PwkOjZAeHeHlGvT7i/T+NpD//2HXQyIdjaIur18FotNE0xqGIqVYJ2G3NjhWB3F2dtjXQwwARlyp0O5nod8X3cZpOgcxdTrYIqpiglSRgeH6OjEVLycdfXkVIJtZbS5ibNV69ZffQYHCevG2bkXMHmirWQa9vbmFoNrMVtNAh2drDDGLIsN3WeLMbgbmzkziYpixB0PGb09l1u3tT8KVnB8wjv3QeU7OzPYnsKjcU7U/Q2SYiPjsBxcVZWi7qWYWaYtSQ/vkOaXp51GfmyZ12EXkEWwQTB1QLz8amGW8Q8j7DbRYyTf8V5WIupVAi73YXkLsYhG/zkd7+PlMvYv2eMT06wwyH/vnzGxjHjD++xcYyp19HxiOzXADEGOY0aL1F9iLWFqMxP03Q9HzoBMAZEXrjAV0Q+4ji6zC65ePz2H3T7rpwGFW1NAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEyLTA0LTI3VDEzOjA3OjU1KzAyOjAw5kyMlgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMi0wNC0yN1QxMzowNzo1NSswMjowMJcRNCoAAAAASUVORK5CYII=" />'+links[i].innerHTML;
};