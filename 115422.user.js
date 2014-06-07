// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.ThumbnailsRelinker
// @name           Thumbnails Relinker
// @description    Repairs links to images that are hosted on ImageVenue, TurboImageHost, ImageTwist, ImgChili and others
// @version        2013.9.15
// @author         kuehlschrank
// @include        http*
// @updateURL      https://userscripts.org/scripts/source/115422.meta.js
// @downloadURL    https://userscripts.org/scripts/source/115422.user.js
// ==/UserScript==

(function() {

	var hosts = [
		{
			reg: /([a-z0-9]+\.imagevenue\.com)\/(loc[0-9]+)\/th_(.+)/,
			url: 'http://$1/img.php?loc=$2&image=$3'
		},{
			reg: /[a-z0-9]+\.turboimagehost\.com\/[a-z0-9]+\/([0-9]+)_(.+)/,
			url: 'http://www.turboimagehost.com/p/$1/$2.html'
		},{
			reg: /([a-z0-9]+\.imagehaven\.net)\/img\/thumbs\/(.+)/,
			url: 'http://$1/img.php?id=$2'
		},{
			reg: /[a-z0-9]+\.pixhost\.org\/thumbs\/([0-9]+\/.+)/,
			url: 'http://www.pixhost.org/show/$1'
		},{
			reg: /fap\.to\/images\/thumb\/[0-9]+\/[0-9]+\/([0-9]+)\./,
			url: 'http://www.imagefap.com/image.php?id=$1'
		},{
			reg: /imagetwist\.com\/th\/[0-9]+\/([a-z0-9]+)/,
			url: 'http://imagetwist.com/$1'
		},{
			reg: /[a-z0-9]+\.imgchili\.(com|net)\/(.+)/,
			url: 'http://imgchili.$1/show/$2'
		},{
			reg: /([a-z0-9]+\.(imageporter\.com|tuspics\.net)\/(img\/)?i\/.+)_t\.jpg/,
			url: 'http://$1.jpg'
		},{
			reg: /thumbs[0-9]+\.imagearn\.com\/[0-9]+\/([0-9]+)\.jpg/,
			url: 'http://imagearn.com/image.php?id=$1'
		},{
			reg: /hotimg\.com\/ts\/(.*)\.jpg/i,
			url: 'http://www.hotimg.com/image/$1'
		},{
			reg: /sharenxs\.com\/thumbnails\/sf\/(.+)\/nxs-(.+)$/i,
			url: 'http://cache.sharenxs.com/images/wz/$1/$2'
		},{
			reg: /imgbox\.com\/([a-z0-9]+)\.jpg/i,
			url: 'http://imgbox.com/$1'
		},{
			reg: /[a-z0-9]+\.imagebam\.com\/[a-z0-9]+\/([a-z0-9]+).jpg/i,
			url: 'http://www.imagebam.com/image/$1'
		},{
			reg: /imagezilla\.net\/thumbs2?\/(.+?)_tn\.jpg/i,
			url: 'http://imagezilla.net/show/$1.jpg'
		},{
			reg: /([a-z0-9]+\.radikal\.ru\/.+)[a-z]\.jpg/,
			url: 'http://$1.jpg'
		},{
			reg: /([a-z0-9]+\.fastpic\.ru)\/thumb\/(.+)\.jpe?g/,
			url: 'http://$1/big/$2.jpg'
		},{
			reg: /(pixroute|imgbabes)\.com\/i\/[0-9]+\/([a-z0-9]+)_t\.jpg/,
			url: 'http://www.$1.com/$2/.html'
		},{
			reg: /(imgdino|imgtiger)\.com\/images\/([0-9]+)_thumb.jpg/,
			url: 'http://$1.com/viewer.php?file=$2.jpg'
		},{
			reg: /stillpics\.net\/.+\/(.+).jpg/,
			url: 'http://i.stillpics.net/image/$1.html'
		}
	];

	var imgs = document.body.querySelectorAll('a > img');

	for(var i = imgs.length, img; i-- && (img = imgs[i]);) {
		for(var j = hosts.length, host, m; j-- && (host = hosts[j]);) {
			if(!(m = host.reg.exec(img.src))) continue;
			var url = host.url;
			for(var k = m.length; k--;) {
				url = url.replace('$'+k, m[k]);
			}
			img.parentNode.href = url;
			break;
		}
	}

})();
