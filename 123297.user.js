// ==UserScript==
// @name           4chan thread browser
// @namespace      DrPastah
// @email          DrPastah@gmail.com
// @description    oh god what is this i am not good with computer
// @include        http://boards.4chan.org/*/
// @include        http://boards.4chan.org/*/*
// @exclude        http://boards.4chan.org/*/res/*
// @version        0.1
// ==/UserScript==

// Most of the source is thanks to 4chan De-Pager by Atrus' Homeboy, mprimegmr@gmail.com

(function () {
	
	//USER OPTIONS
	
    var g_loadCount = 20;
    //g_loadCount equals the maximum number of pages to load at once.
	
	
	
    //DO NOT TOUCH ANYTHING BELOW THIS LINE
	
////////////////////////////////////////////////////////////////////////////////////////////
	
	// Global variables
	var g_firstLoad = true;
	var g_OPshow = false;
	var pgFt = singleNode("//form/hr/following-sibling::center");
	var currPg = document.forms[1];
	var pgLnks = multiNode("//b/following-sibling::a[position()<=" + g_loadCount + "]");
	var htmlList = [],
		len = pgLnks.length;
	var bNode = document.createElement('div');
	var el = document.createElement('a');
	
	
	
	
	String.prototype.sliceThreads = function () {
		var string = this,
            threadsStart = string.indexOf('<span class="filesize">'),
            threadsEnd = string.lastIndexOf("<center><a");
        return string.slice(threadsStart, threadsEnd);
    };
	
	String.prototype.format = function () {
		var ret = [];
		var skipLineMarker = "<br clear=left><hr>";
        var string = this,
            threadStart = string.indexOf('<span class="filesize">'),
            threadEnd = string.indexOf("</blockquote>");
		if (threadStart != -1 || threadEnd != -1)
			ret.push( string.slice(threadStart, threadEnd) );
		for (var i=1;i<10;i++)
		{
			threadStart = string.indexOf('<br clear=left><hr>', threadStart+1);
            threadEnd = string.indexOf('</blockquote>', threadStart+1);
			if (threadStart != -1 || threadEnd != -1)
				ret.push( string.slice(threadStart+skipLineMarker.length, threadEnd) );
		}
        return ret;
    };
	
	function getPg(lnkToNxtPg) {
        var req = new XMLHttpRequest();
        req.open("GET", lnkToNxtPg, false);
        req.send(null);
        return req.responseText;
    }
	
	function singleNode(sXPath) {
        return document.evaluate(sXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
	
	function multiNode(xpath, root) {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document,
            next, got = doc.evaluate(xpath, root || doc, null, null, null),
            result = [];
        while (next = got.iterateNext()) { result.push(next); }
        return result;
    }
	
	function loadContent(arrItm) {
        var range = document.createRange();
		var frag = [], ret = [];
		frag = arrItm.sliceThreads();
		frag = frag.format();
		for (var i=0;i<frag.length;i++)
			ret.push( range.createContextualFragment(frag[i]) );
		return ret;
    }
	
	function breakLine() {
        var range = document.createRange();
		var frag = "<br clear=left><hr>";
        return range.createContextualFragment(frag);
    }
	
	function throbber(node) {
        var loadGeef = new Image();
        loadGeef.src = "data:image/gif;base64,R0lGODlhHwAfAPUAAP%2F%2F%2FwAzWOjs79La4bzJ0q6%2ByaK0wdzi57jG0JquvOTp7djf5aq6x6CywLC%2Fy8zW3fb3%2BKi5xdTc4ubq7jZeeyZRcFByjMTP2HCMoZKnt1Z3kPr6%2B2iGm0ZqhcbR2fj5%2BkhshzJaeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAHwAfAAAG%2F0CAcEgUDAgFA4BiwSQexKh0eEAkrldAZbvlOD5TqYKALWu5XIwnPFwwymY0GsRgAxrwuJwbCi8aAHlYZ3sVdwtRCm8JgVgODwoQAAIXGRpojQwKRGSDCRESYRsGHYZlBFR5AJt2a3kHQlZlERN2QxMRcAiTeaG2QxJ5RnAOv1EOcEdwUMZDD3BIcKzNq3BJcJLUABBwStrNBtjf3GUGBdLfCtadWMzUz6cDxN%2FIZQMCvdTBcAIAsli0jOHSJeSAqmlhNr0awo7RJ19TJORqdAXVEEVZyjyKtE3Bg3oZE2iK8oeiKkFZGiCaggelSTiA2LhxiZLBSjZjBL2siNBOFQ84LxHA%2BmYEiRJzBO7ZCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82YAIQxRCm14Ww4PChAAEAoPDlsAFRUgHkRiZAkREmoSEXiVlRgfQgeBaXRpo6MOQlZbERN0Qx4drRUcAAJmnrVDBrkVDwNjr8BDGxq5Z2MPyUQZuRgFY6rRABe5FgZjjdm8uRTh2d5b4NkQY0zX5QpjTc%2FlD2NOx%2BWSW0%2B%2B2RJmUGJhmZVsQqgtCE6lqpXGjBchmt50%2BhQKEAEiht5gUcTIESR9GhlgE9IH0BiTkxrMmWIHDkose9SwcQlHDsOIk9ygiVbl5JgMLuV4HUmypMkTOkEAACH5BAkKAAAALAAAAAAfAB8AAAb%2FQIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3%2FNmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw%2B%2FRA9jSGOkxgpjSWOMxkIQY0rT0wbR2LQV3t4UBcvcF9%2FeFpdYxdgZ5hUYA73YGxruCbVjt78G7hXFqlhY%2FfLQwR0HIQdGuUrTz5eQdIc0cfIEwByGD0MKvcGSaFGjR8GyeAPhIUofQGNQSgrB4IsdOCqx7FHDBiYcOQshYjKDxliVDpRjunCjdSTJkiZP6AQBACH5BAkKAAAALAAAAAAfAB8AAAb%2FQIBwSBQMCAUDwFAgDATEqHR4QCSuVwD2ijhMpwrCFqsdJwiK73DBMGfdCcZCDWjAE2V347vY3%2FNmdXNECm14Ww4PChAAEAoPDltlDGlDYmQJERJqEhGHWARUgZVqaWZeAFZbERN0QxOeWwgAAmabrkMSZkZjDrhRkVtHYw%2B%2FRA9jSGOkxgpjSWOMxkIQY0rT0wbR2I3WBcvczltNxNzIW0693MFYT7bTumNQqlisv7BjswAHo64egFdQAbj0RtOXDQY6VAAUakihN1gSLaJ1IYOGChgXXqEUpQ9ASRlDYhT0xQ4cACJDhqDD5mRKjCAYuArjBmVKDP9%2BVRljMyMHDwcfuBlBooSCBQwJiqkJAgAh%2BQQJCgAAACwAAAAAHwAfAAAG%2F0CAcEgUDAgFA8BQIAwExKh0eEAkrlcA9oo4TKcKwharHScIiu9wwTBn3QnGQg1owBNld%2BO72N%2FzZnVzRApteFsODwoQABAKDw5bZQxpQ2JkCRESahIRh1gEVIGVamlmXgBWWxETdEMTnlsIAAJmm65DEmZGYw64UZFbR2MPv0QPY0hjpMYKY0ljjMZCEGNK09MG0diN1gXL3M5bTcTcyFtOvdzBWE%2B207pjUKpYrL%2BwY7MAB4EerqZjUAG4lKVCBwMbvnT6dCXUkEIFK0jUkOECFEeQJF2hFKUPAIkgQwIaI%2BhLiJAoR27Zo4YBCJQgVW4cpMYDBpgVZKL59cEBhw%2BU%2BQROQ4bBAoUlTZ7QCQIAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfju9jf82Z1c0QKbXhbDg8KEAAQCg8OW2UMaUNiZAkREmoSEYdYBFSBlWppZl4AVlsRE3RDE55bCAACZpuuQxJmRmMOuFGRW0djD79ED2NIY6TGCmNJY4zGQhBjStPTFBXb21DY1VsGFtzbF9gAzlsFGOQVGefIW2LtGhvYwVgDD%2B0V17%2B6Y6BwaNfBwy9YY2YBcMAPnStTY1B9YMdNiyZOngCFGuIBxDZAiRY1eoTvE6UoDEIAGrNSUoNBUuzAaYlljxo2M%2BHIeXiJpRsRNMaq%2BJSFCpsRJEqYOPH2JQgAIfkECQoAAAAsAAAAAB8AHwAABv9AgHBIFAwIBQPAUCAMBMSodHhAJK5XAPaKOEynCsIWqx0nCIrvcMEwZ90JxkINaMATZXfjywjlzX9jdXNEHiAVFX8ODwoQABAKDw5bZQxpQh8YiIhaERJqEhF4WwRDDpubAJdqaWZeAByoFR0edEMTolsIAA%2ByFUq2QxJmAgmyGhvBRJNbA5qoGcpED2MEFrIX0kMKYwUUslDaj2PA4soGY47iEOQFY6vS3FtNYw%2Fm1KQDYw7mzFhPZj5JGzYGipUtESYowzVmF4ADgOCBCZTgFQAxZBJ4AiXqT6ltbUZhWdToUSR%2FIi1FWbDnDkUyDQhJsQPn5ZU9atjUhCPHVhgTNy%2FRSKsiqKFFbUaQKGHiJNyXIAAh%2BQQJCgAAACwAAAAAHwAfAAAG%2F0CAcEh8JDAWCsBQIAwExKhU%2BHFwKlgsIMHlIg7TqQeTLW%2B7XYIiPGSAymY0mrFgA0LwuLzbCC%2F6eVlnewkADXVECgxcAGUaGRdQEAoPDmhnDGtDBJcVHQYbYRIRhWgEQwd7AB52AGt7YAAIchETrUITpGgIAAJ7ErdDEnsCA3IOwUSWaAOcaA%2FJQ0amBXKa0QpyBQZyENFCEHIG39HcaN7f4WhM1uTZaE1y0N%2FTacZoyN%2FLXU%2B%2F0cNyoMxCUytYLjm8AKSS46rVKzmxADhjlCACMFGkBiU4NUQRxS4OHijwNqnSJS6ZovzRyJAQo0NhGrgs5bIPmwWLCLHsQsfhxBWTe9QkOzCwC8sv5Ho127akyRM7QQAAOwAAAAAAAAAAAA%3D%3D"; //"data:image/gif;base64,R0lGODlhgACAAKIAAP%2F%2F%2F93d3bu7u5mZmQAA%2FwAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFBQAEACwCAAIAfAB8AAAD%2F0i63P4wygYqmDjrzbtflvWNZGliYXiubKuloivPLlzReD7al%2B7%2FEh5wSFQIi8hHYBkwHUmD6CD5YTJLz49USuVYraRsZ7vtar7XnQ1Kjpoz6LRHvGlz35O4nEPP2O94EnpNc2sef1OBGIOFMId%2FinB6jSmPdpGScR19EoiYmZobnBCIiZ95k6KGGp6ni4wvqxilrqBfqo6skLW2YBmjDa28r6Eosp27w8Rov8ekycqoqUHODrTRvXsQwArC2NLF29UM19%2FLtxO5yJd4Au4CK7DUNxPebG4e7%2B8n8iv2WmQ66BtoYpo%2FdvfacBjIkITBE9DGlMvAsOIIZjIUAixliv9ixYZVtLUos5GjwI8gzc3iCGghypQqrbFsme8lwZgLZtIcYfNmTJ34WPTUZw5oRxdD9w0z6iOpO15MgTh1BTTJUKos39jE%2Bo%2FKS64IFVmsFfYT0aU7capdy7at27dw48qdS7eu3bt480I02vUbX2F%2FJxYNDImw4GiGE%2FP9qbhxVpWOI%2FeFKtlNZbWXuzlmG1mv58%2BgQ4seTbq06dOoU6vGQZJy0FNlMcV%2BczhQ7SQmYd8eMhPs5BxVdfcGEtV3buDBXQ%2BfURxx8oM6MT9P%2BFh6dOrH2zavc13u9JXVJb520Vp8dvC76wXMuN5Sepm%2F1WtkEZHDefnzR9Qvsd9%2B%2Fwi8%2Ben3X0ntYVcSdAE%2BUN4zs7ln24CaLagghIxBaGF8kFGoIYV%2BYbghh841GIyI5ICIFoklJsigihmimJOLEbLYIYwxSgigiZ%2B8l2KB%2BMl4oo%2Fw8dijjcrouCORKwIpnJIjMnkkksalNeR4fuBIm5UEYImhIlsGCeWNNJphpJdSTlkml1jWeOY6TnaRpppUctcmFW9mGSaZceYopH9zkjnjUe59iR5pdapWaGqHopboaYua1qije67GJ6CuJAAAIfkEBQUABAAsCgACAFcAMAAAA%2F9Iutz%2BML5Ag7w46z0r5WAoSp43nihXVmnrdusrv%2Bs332dt4Tyo9yOBUJD6oQBIQGs4RBlHySSKyczVTtHoidocPUNZaZAr9F5FYbGI3PWdQWn1mi36buLKFJvojsHjLnshdhl4L4IqbxqGh4gahBJ4eY1kiX6LgDN7fBmQEJI4jhieD4yhdJ2KkZk8oiSqEaatqBekDLKztBG2CqBACq4wJRi4PZu1sA2%2Bv8C6EJexrBAD1AOBzsLE0g%2FV1UvYR9sN3eR6lTLi4%2BTlY1wz6Qzr8u1t6FkY8vNzZTxaGfn6mAkEGFDgL4LrDDJDyE4hEIbdHB6ESE1iD4oVLfLAqPETIsOODwmCDJlv5MSGJklaS6khAQAh%2BQQFBQAEACwfAAIAVwAwAAAD%2F0i63P5LSAGrvTjrNuf%2BYKh1nWieIumhbFupkivPBEzR%2BGnnfLj3ooFwwPqdAshAazhEGUXJJIrJ1MGOUamJ2jQ9QVltkCv0XqFh5IncBX01afGYnDqD40u2z76JK%2FN0bnxweC5sRB9vF34zh4gjg4uMjXobihWTlJUZlw9%2BfzSHlpGYhTminKSepqebF50NmTyor6qxrLO0L7YLn0ALuhCwCrJAjrUqkrjGrsIkGMW%2FBMEPJcphLgDaABjUKNEh29vdgTLLIOLpF80s5xrp8ORVONgi8PcZ8zlRJvf40tL8%2FQPYQ%2BBAgjgMxkPIQ6E6hgkdjoNIQ%2BJEijMsasNY0RQix4gKP%2BYIKXKkwJIFF6JMudFEAgAh%2BQQFBQAEACw8AAIAQgBCAAAD%2Fkg0PPowykmrna3dzXvNmSeOFqiRaGoyaTuujitv8Gx%2F661HtSv8gt2jlwIChYtc0XjcEUnMpu4pikpv1I71astytkGh9wJGJk3QrXlcKa%2BVWjeSPZHP4Rtw%2BI2OW81DeBZ2fCB%2BUYCBfWRqiQp0CnqOj4J1jZOQkpOUIYx%2Fm4oxg5cuAaYBO4Qop6c6pKusrDevIrG2rkwptrupXB67vKAbwMHCFcTFxhLIt8oUzLHOE9Cy0hHUrdbX2KjaENzey9Dh08jkz8Tnx83q66bt8PHy8%2FT19vf4%2Bfr6AP3%2B%2FwADAjQmsKDBf6AOKjS4aaHDgZMeSgTQcKLDhBYPEswoA1BBAgAh%2BQQFBQAEACxOAAoAMABXAAAD7Ei6vPOjyUkrhdDqfXHm4OZ9YSmNpKmiqVqykbuysgvX5o2HcLxzup8oKLQQix0UcqhcVo5ORi%2BaHFEn02sDeuWqBGCBkbYLh5%2FNmnldxajX7LbPBK%2BPH7K6narfO%2Ft%2BSIBwfINmUYaHf4lghYyOhlqJWgqDlAuAlwyBmpVnnaChoqOkpaanqKmqKgGtrq%2BwsbA1srW2ry63urasu764Jr%2FCAb3Du7nGt7TJsqvOz9DR0tPU1TIA2ACl2dyi3N%2FaneDf4uPklObj6OngWuzt7u%2Fd8fLY9PXr9eFX%2Bvv8%2BPnYlUsXiqC3c6PmUUgAACH5BAUFAAQALE4AHwAwAFcAAAPpSLrc%2Fm7IAau9bU7MO9GgJ0ZgOI5leoqpumKt%2B1axPJO1dtO5vuM9yi8TlAyBvSMxqES2mo8cFFKb8kzWqzDL7Xq%2F4LB4TC6bz1yBes1uu9uzt3zOXtHv8xN%2BDx%2Fx%2FwJ6gHt2g3Rxhm9oi4yNjo%2BQkZKTCgGWAWaXmmOanZhgnp2goaJdpKGmp55cqqusrZuvsJays6mzn1m4uRAAvgAvuBW%2Fv8GwvcTFxqfIycA3zA%2FOytCl0tPPO7HD2GLYvt7dYd%2FZX99j5%2BPi6tPh6%2BbvXuTuzujxXens9fr7YPn%2B7egRI9PPHrgpCQAAIfkEBQUABAAsPAA8AEIAQgAAA%2FlIutz%2BUI1Jq7026h2x%2FxUncmD5jehjrlnqSmz8vrE8u7V5z%2Fm5%2F8CgcEgsGo%2FIpHLJbDqf0Kh0ShBYBdTXdZsdbb%2FYrgb8FUfIYLMDTVYz2G13FV6Wz%2BlX%2Bx0fdvPzdn9WeoJGAYcBN39EiIiKeEONjTt0kZKHQGyWl4mZdREAoQAcnJhBXBqioqSlT6qqG6WmTK%2Brsa1NtaGsuEu6o7yXubojsrTEIsa%2ByMm9SL8osp3PzM2cStDRykfZ2tfUtS%2FbRd3ewtzV5pLo4eLjQuUp70Hx8t9E9eqO5Oku5%2Fztdkxi90qPg3x2EMpR6IahGocPCxp8AGtigwQAIfkEBQUABAAsHwBOAFcAMAAAA%2F9Iutz%2BMMo36pg4682J%2FV0ojs1nXmSqSqe5vrDXunEdzq2ta3i%2B%2F5DeCUh0CGnF5BGULC4tTeUTFQVONYAs4CfoCkZPjFar83rBx8l4XDObSUL1Ott2d1U4yZwcs5%2FxSBB7dBMBhgEYfncrTBGDW4WHhomKUY%2BQEZKSE4qLRY8YmoeUfkmXoaKInJ2fgxmpqqulQKCvqRqsP7WooriVO7u8mhu5NacasMTFMMHCm8qzzM2RvdDRK9PUwxzLKdnaz9y%2FKt8SyR3dIuXmtyHpHMcd5%2BjvWK4i8%2FTXHff47SLjQvQLkU%2BfG29rUhQ06IkEG4X%2FRryp4mwUxSgLL%2F7IqFETB8eONT6ChCFy5ItqJomES6kgAQAh%2BQQFBQAEACwKAE4AVwAwAAAD%2F0i63A4QuEmrvTi3yLX%2F4MeNUmieITmibEuppCu3sDrfYG3jPKbHveDktxIaF8TOcZmMLI9NyBPanFKJp4A2IBx4B5lkdqvtfb8%2BHYpMxp3Pl1qLvXW%2FvWkli16%2F3dFxTi58ZRcChwIYf3hWBIRchoiHiotWj5AVkpIXi4xLjxiaiJR%2FT5ehoomcnZ%2BEGamqq6VGoK%2BpGqxCtaiiuJVBu7yaHrk4pxqwxMUzwcKbyrPMzZG90NGDrh%2FJH8t72dq3IN1jfCHb3L%2Fe5ebh4ukmxyDn6O8g08jt7tf26ybz%2Bm%2FW9GNXzUQ9fm1Q%2FAPoSWAhhfkMAmpEbRhFKwsvCsmosRIHx444PoKcIXKkjIImjTzjkQAAIfkEBQUABAAsAgA8AEIAQgAAA%2FVIBNz%2B8KlJq72Yxs1d%2FuDVjVxogmQqnaylvkArT7A63%2FV47%2Fm2%2F8CgcEgsGo%2FIpHLJbDqf0Kh0Sj0FroGqDMvVmrjgrDcTBo8v5fCZki6vCW33Oq4%2B0832O%2Fat3%2Bf7fICBdzsChgJGeoWHhkV0P4yMRG1BkYeOeECWl5hXQ5uNIAOjA1KgiKKko1CnqBmqqk%2BnIbCkTq20taVNs7m1vKAnurtLvb6wTMbHsUq4wrrFwSzDzcrLtknW16tI2tvERt6pv0fi48jh5h%2FU6Zs77EXSN%2FBE8jP09ZFA%2BPmhP%2FxvJgAMSGBgQINvEK5ReIZhQ3QEMTBLAAAh%2BQQFBQAEACwCAB8AMABXAAAD50i6DA4syklre87qTbHn4OaNYSmNqKmiqVqyrcvBsazRpH3jmC7yD98OCBF2iEXjBKmsAJsWHDQKmw571l8my%2B16v%2BCweEwum8%2BhgHrNbrvbtrd8znbR73MVfg838f8BeoB7doN0cYZvaIuMjY6PkJGSk2gClgJml5pjmp2YYJ6dX6GeXaShWaeoVqqlU62ir7CXqbOWrLafsrNctjIDwAMWvC7BwRWtNsbGFKc%2By8fNsTrQ0dK3QtXAYtrCYd3eYN3c49%2Fa5NVj5eLn5u3s6e7x8NDo9fbL%2BMzy9%2FT5%2BtvUzdN3Zp%2BGBAAh%2BQQJBQAEACwCAAIAfAB8AAAD%2F0i63P4wykmrvTjrzbv%2FYCiOZGmeaKqubOu%2BcCzPdArcQK2TOL7%2Fnl4PSMwIfcUk5YhUOh3M5nNKiOaoWCuWqt1Ou16l9RpOgsvEMdocXbOZ7nQ7DjzTaeq7zq6P5fszfIASAYUBIYKDDoaGIImKC4ySH3OQEJKYHZWWi5iZG0ecEZ6eHEOio6SfqCaqpaytrpOwJLKztCO2jLi1uoW8Ir6%2FwCHCxMG2x7muysukzb230M6H09bX2Nna29zd3t%2Fg4cAC5OXm5%2Bjn3Ons7eba7vHt2fL16tj2%2BQL0%2BvXw%2Fe7WAUwnrqDBgwgTKlzIsKHDh2gGSBwAccHEixAvaqTYcFCjRoYeNyoM6REhyZIHT4o0qPIjy5YTTcKUmHImx5cwE85cmJPnSYckK66sSAAj0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gwxZJAAA7";
        loadGeef.style.cssText = "top:50%; left: 50%; position:fixed;";
        node.appendChild(loadGeef);
    }
	
	
	
	
	function init(e, n)
	{
		var bufferPosts = loadContent( e );
		for (var j=0;j<10;j++)
		{
			n.appendChild(bufferPosts[j]);
			n.appendChild(breakLine());
		}
	}
		
	function firstLoad()
	{
		throbber(document.body);
		init( getPg(document.location), bNode);
		
		for (var i = len; i--;) { pgLnks[i] = pgLnks[i].pathname; }
		for (var j = len; j--;) { htmlList[htmlList.length] = getPg(pgLnks.shift()); }
		for (var s = 0; s < htmlList.length; s++)
			init(htmlList[s],bNode);
		throbber = document.body.lastChild;
		document.body.removeChild(throbber);
	}
	
	
	function buttonTrue()
	{
		el.innerHTML = '<br><font size="8" face="arial"><center><b>HIDE OPs</b></center></font><br>';
	}
	
	function buttonFalse()
	{
		el.innerHTML = '<br><font size="8" face="arial"><center><b>SHOW OPs</b></center></font><br>';
	}
	
	
	function buttonToggle()
	{
		if (g_firstLoad)
		{
			currPg.style.display = "none";
			firstLoad();
			g_OPshow = true;
			g_firstLoad = false;
			buttonTrue();
		}
		else if (g_OPshow == true)
		{
			bNode.setAttribute('style', 'display: none');
			currPg.style.display = "block";
			g_OPshow = false;
			buttonFalse();
		}
		else if (g_OPshow == false)
		{	
			bNode.setAttribute('style', 'display: ');
			currPg.style.display = "none";
			g_OPshow = true;
			buttonTrue();
		}
	}
	
	
	// Check if we're on the first page
	if ( singleNode('//b[./following-sibling::a[1]]').innerHTML == 0 )
	{
		currPg.style.display = "none";
		

		
		
		// Hide the first page content
		
		
		// Make a div wrapper for OPs
		bNode.setAttribute('id', 'OPs');
		bNode.setAttribute('style', 'display: ');
		
		// Have div wrapper ready for OPs
		currPg.parentNode.appendChild(bNode);
		
		// Create a toggle button to switch views between front page and board OPs
		
		el.innerHTML = '<br><font size="8" face="arial"><center><b>SHOW OPs</b></center></font><br>';
		el.addEventListener("click",function(){ buttonToggle(); }, false);
		// Add the button later to avoid missing some data initialization
		
		
		


		// Add the button last after data is initialized
		currPg.parentNode.insertBefore( el, currPg );
		
		currPg.style.display = "block";
	}
})();