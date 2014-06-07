// ==UserScript==
// @name           hatena big profile star
// @namespace      http://ss-o.net/
// @include        http://*
// @include        https://*
// @version        1.2.1
// ==/UserScript==
// @see            http://d.hatena.ne.jp/trashsuite/20081125/1227637917
// @see            http://d.hatena.ne.jp/os0x/20080730/1217393400

(function(global){
	if (!global && typeof unsafeWindow !== 'undefined'){
		var s = document.createElement('script');
		s.textContent = '(' + arguments.callee.toString() + ')(this);';
		s.addEventListener('load', function(){
			document.body.removeChild(s);
		},false);
		document.body.appendChild(s);
		return;
	} else if (document.readyState === 'loading' || document.readyState === 'interactive'){
		window.addEventListener('load', arguments.callee, false);
	}
	var COLORS = {green:1.5,red:2.5,blue:4}, DEFAULT_SIZE = 16;
	var count = 0, t = setInterval(function(){
		if(window.Hatena && Hatena.Star && Hatena.Star.Entry) {
			clearInterval(t);
			var stars = document.getElementsByClassName('hatena-star-star');
			var i = stars.length,image,color;
			while(i --> 0) {
				if(/^[a-zA-Z][-\w]{1,30}[a-zA-Z\d]$/.test((image=stars[i]).alt)) {
					if ((color = (/star-(\w+)\.gif/.exec(image.src)||[])[1])) {
						image.width = image.height = DEFAULT_SIZE * (COLORS[color]||1);
						image.src = Hatena.User.getProfileIcon(image.alt).src.replace(/_s\.gif$/,'.gif');
					} else {
						image.src = Hatena.User.getProfileIcon(image.alt).src;
					}
				}
			}
			var show_name = Hatena.Star.Star.prototype.showName;
			var pushStars = Hatena.Star.Entry.prototype.pushStars;
			Hatena.Star.Star.prototype.showName = function(e) {
				this.screen_name = this.name;
				show_name.call(this, e);
			};
			Hatena.Star.Entry.prototype.pushStars = function(stars, color) {
				stars = stars.map(function(star) {
					var image = Hatena.User.getProfileIcon(star.name);
					image.alt = star.name;
					if (color) {
						image.width = image.height = DEFAULT_SIZE * (COLORS[color]||1);
						image.src = image.src.replace(/_s\.gif$/,'.gif');
					}
					star.img  = image;
					return star;
				});
				pushStars.call(this, stars, color);
			};
		}
		if(++count == 5) clearInterval(t);
	}, 60);
})();
