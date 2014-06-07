// ==UserScript==
// @name           Leprosorium.ru My Things page navigation enhancement
// @namespace      ConstNT
// @description    Adds two buttons: Favs and Things instead of text links
// @include        http://www.leprosorium.ru/my/*
// @include        http://leprosorium.ru/my/*
// ==/UserScript==

var imgThingsDel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIwSURBVDjLhZHLaxNRGMUjaRDBjQtBxAdZFEQE/wEFUaurLm1FfEGzENwpturG6qIFrYUKXbUudOODNqIiTWqvFEwXKo1UUVRqS2NM0kmaZPKYPKbJ8XzTiUQxceDH3HvnO+e73xnH8X7fLjJInjbgEekiOwA4/sbBD0Ov5sIqY5SVXiO/Rpospw01HphXrOttZPBMxCkWJ3NltZItq3i2pOKZklrWi9Z5SMuKwf2GBtJVxJotiqWLKpIqqHCyYO3/Z/A8UyirBDtLcZTi6Y+RdxdHAsnTAy/NM0TerCuRlE2Y9El+YjCWoLBkViyxdL40OpNmLuBo0Gvk12AuYC5gLqB2XAw8A2NBFZzXVHm1YnHq1qQpYs4PjgbmAuYC5gLe0jrnWGLwzZqDi33ksSTunw3JvKZ0FbFmi5gLeDswF2v/h4Ftcm8yaIl9JMtcwFys4midOJQwEOX6ZyInBos18QYJk0yQVhJjLiiald/iTw+GMHN2N6YOuTB9YieCozfE4EvNYDO5Ttz2vn/Q+x5zC3EwEyw9GcaH7v0ovLiN6mcf8g8v4O35vRg+edTr+Ne/tU2OEV03SvB3uGFQjDvtQM8moM+N+M0D8B92LjQ0sE2+MhdMHXShOutF/ZO6toXnLdVm4o1yA1KYOLI+lrvbBVBU7HYgSZbOOeFvc4abGWwjXrLndefW3jeeVjPS44Z2xYXvnnVQ7S2rvjbn1aYj1BPo3H6ZHRfl2nz/ELGc/wJRo/MQHUFwBgAAAABJRU5ErkJggg==";
var imgFavsAdd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLrVNLaFNBFB0XWYiusnPhwp0bCy6kumkWRVQQFF24kdqKH1QQQcWqq67S1mpaa1sFqeALLmqlbWgLxpY0/5BoXmrSkJT8P9IkbRKbRSC/49whQVERQQcOl5k359xz733DALB/AfuvAsFgsI1DCgQCkt/vl9bW1mZ9Pt+s1+uVVldXJY/HI7nd7rZfBNbX1zs4MR6JRLC5uYmtrS2BfD4vYi6XE8hkMuCicLlccafT2SEEOLmTkxuFQgG5dAIf56dgmBzGXP89vOu7KaAb6IXh1Qg+LU7zO0lks1k4HI6G3W7vJNsykavVqrioOX3oj9AN9qJUKgkRq9UqM25ne3l5GY1GAzUuon8+AO2dCxg/34mRM4cFJrqO4s3dHvEtJDtRLBZFSWaz+SvTarWpjY0NlMtl1Go1ESuVigA5+x142QiHwzCZTGE2Ojo6heYia7z7IMFW4whkl87i8Th48wSZTworKyvDTKVSHWsJ0EU+NoRCIcRiMUSjUdBkKKO08AK3J7pw5ckpdA8ch3ryAQwGw26mVCqPtLITmUjJZBKJREJkpP3rhXH0ve3BvG8Mni96aD5cxznNAbTf2DPEFApFO88g1+t1YZcI6XQaqVRKgIR6Bk9gzstH638qnA4tXYZm6SoJlBlfO0lkZmbGT1ZlWRb1ElpCJx8exKLvJX5cus9jJND8HRnbwbHLaDRO89k2qG4aVesvVN3ah0f6i1DruwVZ/b77u4OfH4fNZttrsVhqfMbggtQo3H92DWeH9uOx/pLITJH2ogd/++r45X6ObbLdjP10/g1HrwhirOEKWgAAAABJRU5ErkJggg==";

var things = document.evaluate("//a[contains(@onmouseup, 'mythingsHandler')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var favs = document.evaluate("//a[contains(@onclick, 'favsHandler')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

if (things) {
	for (var i=0; i<things.snapshotLength; i++) {
		try {
			var img = new Image();
			img.src = imgThingsDel;
			img.style.cursor = 'pointer';
			img.title = things.snapshotItem(i).innerHTML;
			var parent = things.snapshotItem(i).parentNode;
			things.snapshotItem(i).innerHTML = "";
			things.snapshotItem(i).appendChild(img);
			var clone = things.snapshotItem(i).cloneNode(true);
			parent.innerHTML = "";
			parent.appendChild(clone);
		} catch (e) {
//			alert(e);
		}
	}
}

if (favs) {
	for (var i=0; i<favs.snapshotLength; i++) {
		try {
			var img = new Image();
			img.src = imgFavsAdd;
			img.style.cursor = 'pointer';
			img.title = favs.snapshotItem(i).innerHTML;
			favs.snapshotItem(i).innerHTML = "";
			favs.snapshotItem(i).appendChild(img);
		} catch (e) {
//			alert(e);
		}
	}
}

