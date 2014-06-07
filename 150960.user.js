// ==UserScript==
// @name       ImdbToTottrentz
// @namespace  http://google.com
// @version    0.1
// @description  enter something useful
// @match      http://www.imdb.com/title/*
// @copyright  2012+, OW
// ==/UserScript==



var dlIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAACYVBMVEUAAAAAAABMizxMizwAAAAAAAAdNRcAAAAAAAAAAAAAAAADBgMAAAAHDAVMizxMizwrTyIqTSFNjTtOjTtDejRNjTtCeTNNjTtNjTtCeTNBdzJOjjtNjTpPjzpPjzpKhjZKhjZMizpUkUNWk0R4rl5SkEByqFh2rVtMizpNjTxSkEJxp1mLvG2Nu26RwHKUxHRUkUNWkkRZlEdZlUdalUhalkhnmFdvplhxqFlypWFzwiVzxiF0pmN0qlx1ySJ2yCN3rV94p2h5qWl6qWt6xS57xjB7yS98xTN8yyx9xzWAyTmAzTSBzjSBzjaDyT6DzjiEzzqFzUCGzECHykWIzEOIzUSM0keNv26Nz0yOzU+OzlGP0k2QwXCQw3CR0FOR1E6S1VCTxHKT1FOT1VKT1VOU1VOU1VaV01mZ1Vua2F2bvJGc2GGd2WKfrpmfwpWf2WWgv5ig2meiwJmi22uk222l3G6m2Hanw5+n0Iin0Yeo1Iap1Yep2HqqxaKq23qs14ms3nqt2Iut23+u1Y2u1o6u332v33+v34Cv4ICwtayw4IG0z6214om24oq65JG75JG83Z6835284Ju93p++36C+456+5pe/36HA4Z/A5J/A5KDB46HB5KHC5KLD56DE46fE5aLE5qTF5KjF5qXF6KHG6aTH6aXJ6arR6rfR7bXT67vU7rrY4dTY78DZ8MLa49fa7cba8MXc8sjd5drf8szi89Lj9NLk9NPl9dbr99/t7ert7evt+OPu7uzu7u3v7+3v7+7v8O3v+eXv+ebw8O7w8O/x8e/x+en1++/3/PL///+5JOgQAAAAMHRSTlMAAgMEBgcICg0QFhYZIiotOkh9f4CAjo6QmKDLzc3O0NX19fX19vb29/f3+P39/v6zdD/wAAABQElEQVQoz2NgoCroRAMIiVMoAFli1+69e/fu37//ABCgSOwGCR84cAQEUCTA4kfWZNkYGljm5SJL7Nt/4GC5aWz9wsWNicbCTAgJoLijw8y2nMzs4q65KtLMMAmgObW2S1LjGw4d7y/MmacuCpc4st5kakJYzrpTp3Z05GfMVuaHShw4UhDT6ptcsv3UqT29pUl1+hIwiaNO1SkBy3q2nTq1c9rqtPQWOajEkaMmc/z7Tp3ceerU4ROnlocs0kRIzPJfCguTFX7zERLOVakeKyHiG4Mim2VhEseKwtvtfNaCxLeEupbpicN1bDaaFG3vvenUqa2BLsGTlfgQwd5tsSDC2m3VBi+r4BlqQsgRZWY+sSnO0z2qZoK2DBtSNLJzi6jqVE6ZXqGrJcbLxYokw8IpICmvqKEgJcjDwYgnIQAAHQu+galt2X0AAAAASUVORK5CYII=";


var shows = document.evaluate("//h1[@class='header']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = shows.snapshotLength - 1; i >= 0; i--) {
		var elm = shows.snapshotItem(i);
        var link = document.createElement('a');
        var btn  = document.createElement('img');
        btn.src = dlIcon;
        btn.width=24;
        btn.height=24;
        link.appendChild(btn);
        var showName = elm.textContent;
        showName.replace(" ", "+");
    link.href = "http://torrentz.eu/search?f=" + showName;
		elm.insertBefore(link);
	}
