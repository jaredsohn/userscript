// vim:noexpandtab
// ==UserScript==
// @name        Mahjong Tiles image replacement
// @namespace   http://dis.4chan.org/prog/
// @description replaces UTF-8 characters in the Mahjong Tiles block with images
// @include     http://boards.4chan.org/jp/*
// @include     http://archive.easymodo.net/cgi-board.pl/jp/*
// @resource	🀇	http://upload.wikimedia.org/wikipedia/commons/1/1f/MJm1plane.png
// @resource	🀈	http://upload.wikimedia.org/wikipedia/commons/6/6f/MJm2plane.png
// @resource	🀉	http://upload.wikimedia.org/wikipedia/commons/f/f6/MJm3plane.png
// @resource	🀊	http://upload.wikimedia.org/wikipedia/commons/d/de/MJm4plane.png
// @resource	🀋	http://upload.wikimedia.org/wikipedia/commons/3/33/MJm5plane.png
// @resource	🀌	http://upload.wikimedia.org/wikipedia/commons/2/2a/MJm6plane.png
// @resource	🀍	http://upload.wikimedia.org/wikipedia/commons/a/a8/MJm7plane.png
// @resource	🀎	http://upload.wikimedia.org/wikipedia/commons/a/ad/MJm8plane.png
// @resource	🀏	http://upload.wikimedia.org/wikipedia/commons/7/70/MJm9plane.png
// @resource	右🀇	http://upload.wikimedia.org/wikipedia/commons/3/35/MJm1yoko.png
// @resource	右🀈	http://upload.wikimedia.org/wikipedia/commons/9/93/MJm2yoko.png
// @resource	右🀉	http://upload.wikimedia.org/wikipedia/commons/7/71/MJm3yoko.png
// @resource	右🀊	http://upload.wikimedia.org/wikipedia/commons/6/61/MJm4yoko.png
// @resource	右🀋	http://upload.wikimedia.org/wikipedia/commons/2/25/MJm5yoko.png
// @resource	右🀌	http://upload.wikimedia.org/wikipedia/commons/f/f2/MJm6yoko.png
// @resource	右🀍	http://upload.wikimedia.org/wikipedia/commons/5/55/MJm7yoko.png
// @resource	右🀎	http://upload.wikimedia.org/wikipedia/commons/2/2f/MJm8yoko.png
// @resource	右🀏	http://upload.wikimedia.org/wikipedia/commons/5/58/MJm9yoko.png
// @resource	🀙	http://upload.wikimedia.org/wikipedia/commons/4/4e/MJp1plane.png
// @resource	🀚	http://upload.wikimedia.org/wikipedia/commons/4/4e/MJp2plane.png
// @resource	🀛	http://upload.wikimedia.org/wikipedia/commons/c/cc/MJp3plane.png
// @resource	🀜	http://upload.wikimedia.org/wikipedia/commons/c/c1/MJp4plane.png
// @resource	🀝	http://upload.wikimedia.org/wikipedia/commons/a/af/MJp5plane.png
// @resource	🀞	http://upload.wikimedia.org/wikipedia/commons/c/c6/MJp6plane.png
// @resource	🀟	http://upload.wikimedia.org/wikipedia/commons/6/6b/MJp7plane.png
// @resource	🀠	http://upload.wikimedia.org/wikipedia/commons/4/49/MJp8plane.png
// @resource	🀡	http://upload.wikimedia.org/wikipedia/commons/5/55/MJp9plane.png
// @resource	右🀙	http://upload.wikimedia.org/wikipedia/commons/7/7d/MJp1yoko.png
// @resource	右🀚	http://upload.wikimedia.org/wikipedia/commons/d/d6/MJp2yoko.png
// @resource	右🀛	http://upload.wikimedia.org/wikipedia/commons/7/77/MJp3yoko.png
// @resource	右🀜	http://upload.wikimedia.org/wikipedia/commons/8/82/MJp4yoko.png
// @resource	右🀝	http://upload.wikimedia.org/wikipedia/commons/c/c5/MJp5yoko.png
// @resource	右🀞	http://upload.wikimedia.org/wikipedia/commons/3/30/MJp6yoko.png
// @resource	右🀟	http://upload.wikimedia.org/wikipedia/commons/5/5a/MJp7yoko.png
// @resource	右🀠	http://upload.wikimedia.org/wikipedia/commons/2/27/MJp8yoko.png
// @resource	右🀡	http://upload.wikimedia.org/wikipedia/commons/9/93/MJp9yoko.png
// @resource	🀐	http://upload.wikimedia.org/wikipedia/commons/0/09/MJs1plane.png
// @resource	🀑	http://upload.wikimedia.org/wikipedia/commons/4/43/MJs2plane.png
// @resource	🀒	http://upload.wikimedia.org/wikipedia/commons/a/a4/MJs3plane.png
// @resource	🀓	http://upload.wikimedia.org/wikipedia/commons/5/57/MJs4plane.png
// @resource	🀔	http://upload.wikimedia.org/wikipedia/commons/9/90/MJs5plane.png
// @resource	🀕	http://upload.wikimedia.org/wikipedia/commons/d/dd/MJs6plane.png
// @resource	🀖	http://upload.wikimedia.org/wikipedia/commons/e/ee/MJs7plane.png
// @resource	🀗	http://upload.wikimedia.org/wikipedia/commons/9/96/MJs8plane.png
// @resource	🀘	http://upload.wikimedia.org/wikipedia/commons/e/e7/MJs9plane.png
// @resource	右🀐	http://upload.wikimedia.org/wikipedia/commons/c/c4/MJs1yoko.png
// @resource	右🀑	http://upload.wikimedia.org/wikipedia/commons/9/91/MJs2yoko.png
// @resource	右🀒	http://upload.wikimedia.org/wikipedia/commons/0/0f/MJs3yoko.png
// @resource	右🀓	http://upload.wikimedia.org/wikipedia/commons/4/42/MJs4yoko.png
// @resource	右🀔	http://upload.wikimedia.org/wikipedia/commons/9/96/MJs5yoko.png
// @resource	右🀕	http://upload.wikimedia.org/wikipedia/commons/c/cd/MJs6yoko.png
// @resource	右🀖	http://upload.wikimedia.org/wikipedia/commons/c/cc/MJs7yoko.png
// @resource	右🀗	http://upload.wikimedia.org/wikipedia/commons/7/7e/MJs8yoko.png
// @resource	右🀘	http://upload.wikimedia.org/wikipedia/commons/7/71/MJs9yoko.png
// @resource	🀀	http://upload.wikimedia.org/wikipedia/commons/6/61/MJf1plane.png
// @resource	🀁	http://upload.wikimedia.org/wikipedia/commons/2/2c/MJf2plane.png
// @resource	🀂	http://upload.wikimedia.org/wikipedia/commons/d/da/MJf3plane.png
// @resource	🀃	http://upload.wikimedia.org/wikipedia/commons/0/0b/MJf4plane.png
// @resource	🀆	http://upload.wikimedia.org/wikipedia/commons/d/db/MJd1plane.png
// @resource	🀅	http://upload.wikimedia.org/wikipedia/commons/9/99/MJd2plane.png
// @resource	🀄	http://upload.wikimedia.org/wikipedia/commons/4/48/MJd3plane.png
// @resource	赤🀋	http://upload.wikimedia.org/wikipedia/commons/9/91/MJm5planeRED.png
// @resource	赤🀝	http://upload.wikimedia.org/wikipedia/commons/a/a5/MJp5planeRED.png
// @resource	赤🀔	http://upload.wikimedia.org/wikipedia/commons/6/64/MJs5planeRED.png
// @resource	🀫	http://upload.wikimedia.org/wikipedia/commons/9/95/MJuraplane.png
// @resource	右🀀	http://upload.wikimedia.org/wikipedia/commons/3/31/MJf1yoko.png
// @resource	右🀁	http://upload.wikimedia.org/wikipedia/commons/3/31/MJf2yoko.png
// @resource	右🀂	http://upload.wikimedia.org/wikipedia/commons/2/26/MJf3yoko.png
// @resource	右🀃	http://upload.wikimedia.org/wikipedia/commons/6/68/MJf4yoko.png
// @resource	右🀆	http://upload.wikimedia.org/wikipedia/commons/d/dc/MJd1yoko.png
// @resource	右🀅	http://upload.wikimedia.org/wikipedia/commons/d/d5/MJd2yoko.png
// @resource	右🀄	http://upload.wikimedia.org/wikipedia/commons/6/6c/MJd3yoko.png
// @resource	右赤🀋	http://upload.wikimedia.org/wikipedia/commons/0/06/MJm5yokoRED.png
// @resource	右赤🀝	http://upload.wikimedia.org/wikipedia/commons/9/98/MJp5yokoRED.png
// @resource	右赤🀔	http://upload.wikimedia.org/wikipedia/commons/7/71/MJs5yokoRED.png
// @resource	右🀫	http://upload.wikimedia.org/wikipedia/commons/5/5a/MJurayoko.png
// @resource	不	http://upload.wikimedia.org/wikipedia/commons/6/6a/MJany.png
// ==/UserScript==

var nodes = document.evaluate('//blockquote', document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < nodes.snapshotLength; ++i) {
	var node = nodes.snapshotItem(i);
	var content = node.innerHTML;

	/* XXX: The mahjong characters are considered two characters each, a leading
	 *      escape character and a second character. */
	if (/🀇|🀈|🀉|🀊|🀋|🀌|🀍|🀎|🀏|🀙|🀚|🀛|🀜|🀝|🀞|🀟|🀠|🀡|🀐|🀑|🀒|🀓|🀔|🀕|🀖|🀗|🀘|🀀|🀁|🀂|🀃|🀆|🀅|🀄|🀫/.test(content)) {
		content = content.replace(
			/(右?)(赤?)(🀇|🀈|🀉|🀊|🀋|🀌|🀍|🀎|🀏|🀙|🀚|🀛|🀜|🀝|🀞|🀟|🀠|🀡|🀐|🀑|🀒|🀓|🀔|🀕|🀖|🀗|🀘|🀀|🀁|🀂|🀃|🀆|🀅|🀄|🀫)/g,
			function(s, side, red, tile) {
				try {
					return '<img src="' + GM_getResourceURL(side + red + tile) + '"/>';
				} catch (e) {
					GM_log("unrecognized tile description: " + side + red + tile);
					return '<img src="' + GM_getResourceURL('不') + '"/>';
				}
			});

		node.innerHTML = content;
	}
}
