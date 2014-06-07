// ==UserScript==
// @name What ratio?
// @match http://what.cd/*
// @version 1.1
// ==/UserScript==

function onload() {
	var ratioIcon = "\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMISURB\
VDiNVZPfalxVFMa/vfeZzpxz2hkzwUzjTDPJaHrRmmhlmquoAUFQvIgEVAQlz5AXCH2BiNAHCA2U\
Vg0ELRYKpYMXraJWm7Rj1EwLCaaZOSHTic7e589ee3uRZGg++Fg3a/1YrMXHrLV4Xrdufz/KGJvl\
XExZa8YAgDG+ZgzVrLWL777z/t/P97MjwI2bK5wxNscYv9TX1+8yA5Y6cQK+58P1PYSRpCdPGhER\
zVtrFz54b9r0AMsr17kQ4odT/qlqofBSutPpoPPsGaSSsNbC83xUL1bhZlysPvxd7e4G94norZnp\
jw0HgCTRc27GrxaL5fTGxgYeP25g/999MMbAGMP+fgf1eh2GCBdeq7q5XP6NJNFzACCGK6VRzvn1\
V8+Pu6urD9Bu74ExBmstiAhaaxARZPc/jLxcgU4SnCmeSf351/rkr/d//prHcTxbKg65zZ0mtrf/\
QRRFUEpBSolutwspJZRSyOf7Ya1FrGMYSzh37nw6juNZh4yZ8jyPrf+xjjAMIYQA57y3/pGGymUY\
Y2CNQRiFyOf7BRkz5YRKjbkZD9tPt6GUAuf8GGCoXMbExARyuSyINMgQNGlkT76AUKkxJ4piqDCE\
UqoHYIyhMFDA5JuTKJaKsNYe3MIQiAgWFkQaURSDa63XdoMWMpkMpJSQUqIv34cPZ6ZROD2ARCfQ\
OoGmg0qkwRlHELSgtV7jstuttYKWzWZzPcDZs6PQpHvDyaE1aWit4QgHm5ubJLvdGldhuPio/lBl\
czn4vg8pJcrD5YOh5NBHW+gEnHPEcYI7tTuRCsNFce/uT3vffrcSh1H49sCLBafdbmPklWGc9H0Y\
Q4c2MMbAEQ4818fy8jcyCIL5L7+4fIMDgJJqobmz88vuXhBVKhU8elCHEE7vE0I4cDMudEJYWlqS\
jUbjNyXVwrEwffb5p1w4Yk5wcWlwcDBTKpX4+Ovj8DwPrWYTW1tb+t7dH2NNep40LSxduWqOAY70\
0Sczo5zz2XQ6PZUkyRgApFKptSiKasaYxa+uLR+L8//WKdHyJmYdPgAAAABJRU5ErkJggg==";

	jQuery.noConflict();
	jQuery(function($) {
		function colToInt(col) { return parseInt(col.text().replace(/[^0-9]/g, '')); }

		function toggleColumn() {
			var icon = $('.colhead .sign:first a img');
			var iconAttr = { src: icon.attr('src'), alt: icon.attr('alt'), title: icon.attr('title') }
			var newIconAttr = { src: icon.data('src'), alt: icon.data('alt'), title: icon.data('title') };
			icon.attr(newIconAttr);
			icon.data('src', iconAttr.src).data('alt', iconAttr.alt).data('title', iconAttr.title);

			$('.group_torrent, .group').each(function() {
				var columns = $(this).find('td'), size = columns.size();
				if(columns.size() > 1) {
					var snCol = columns.eq(size - 3);
					var html = snCol.html();
					
					snCol.html(snCol.data('html'));
					snCol.data('html', html);
				}
			});
		};

		$('.colhead .sign:first a').attr('href', '#');
		$('.colhead .sign:first a img').data({ src: 'data:image/gif;base64,' + ratioIcon, alt: 'Ratio', title: 'Leechers / Seeders ratio' });
		$('.group_torrent, .group').each(function() {
			var columns = $(this).find('td'), size = columns.size();
			if(columns.size() > 1) {
				var snCol = columns.eq(size - 3), seCol = columns.eq(size - 2), leCol = columns.eq(size - 1);
				var seeders = colToInt(seCol), leechers = colToInt(leCol);
				snCol.data('html', ((((leechers / seeders) * 10000) >>> 0) / 100) + "%");
			}
		});

		toggleColumn();

		$('.colhead .sign:first a').click(function() {
			toggleColumn();
			return false;
		});
	});
};

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
};

addJQuery(onload);
