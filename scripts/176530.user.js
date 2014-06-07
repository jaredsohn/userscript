// Google Old Favicon ['08-'09]
// 2013
// from FalkeXY 2013
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Old Favicon ['08-'09]
// @namespace     ---
// @description   Replaces Googles Favicon with the one from 2008 to 2009 - by FalkeXY
// @include       htt*://*.google.*/*
// @include       htt*://google.*/*
// @exclude	/^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.*.*/
// @exclude     /^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.co.*/
// @version       1.1_2
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', 

"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9gFHhEqGVx7NpEAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAjtJREFUOE+dk99LU2Ecxs8fUxd2E4EYdLMQrJsYGi5CwhKKiLwqXGA307ppgRYFEUu0C6MfoAs3IjJr20m0zcJNWI7Gmu6s/XS/d3Y6P57O990OiTOCHnjY3u8+z7P33d7DASD/r7i/hrNZwOuVsLKiYm1NxdzrClzun6jXpRbR1L4FgaCCm6Pr4PkopqZiOGoqoK//E9aDUTQajRbVVFtBTf+CgaEIfHwQsvILqqri9v0KDnWG8D2abFF/1FYQ3waOd4fgD4T1lcZmgqDhSNcG5uZ5VrhbbQWbURUdnVk4HKvQtCa8swMcPPAKHu/nfxfIsoorlzdxuOMr/P4caqKGu3YBtrFZFItFvbS5K0P7/oiiKOHJjAfXR3hYb2iwWuchSVJbmMTRcK8NxX7k0Nuv4bT5C+Jx/X/VtZfl6ExkRVEYIMsy3i1u4MHDGMbGwzjVu4QeUwbmEwICgW+MMTJkjgJkKhBFEXceBWCxePDs+RIikRgKhSJmphdxsqeIPouLMcQaOY7OZlwOL+/HyKiCxw4nazcgkn3Sg65jLmxtbbMZZchcvV5HrVZj0IJ7GeYzgM3mZOvdstvf4+zANDKZDNsFZchcpVJBqVRCtVpFOp3B4KAP3aY8rl5bxtNZH1685DF+6yPOX3DD51vVj1RAuVxmGTJHi6z+5ORyOfYBbXHinhMXL73BuaEPGB5+i4nJBYRCYcbl83nGGu/pHnA0EASBOZ1OswtDr4lEgs1SqRSSySSzwdEMAPcbfu6X54QoOqMAAAAASUVORK5CYII=");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 1.1_2	Initial release.