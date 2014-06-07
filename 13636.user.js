// ==UserScript==
// @name minibuffer_command_rgb
// @namespace http://b.hatena.ne.jp/tcns
// @include *
// ==/UserScript==

(function () {
if (window.Minibuffer) {
	window.Minibuffer.addCommand({
		'rgb': function () {
			if (this.args.length > 2) {
				var args = this.args;
				var r = args.shift();
				r = r > 0xff ? 0xff : r;
				var g = args.shift();
				g = g > 0xff ? 0xff : g;
				var b = args.shift();
				b = b > 0xff ? 0xff : b;
				return r < 0xf
					? '#0'+((Number(r) << 16) |
							(Number(g) << 8) |
							(Number(b))).toString(16)
					: '#' +((Number(r) << 16) |
							(Number(g) << 8) |
							(Number(b))).toString(16);
			}
		}
	});
}
})();
