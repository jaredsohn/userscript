// ==UserScript==
// @name           RabbitFixer
// @namespaces     Sliverz
// @include        http://sukebei.nyaa.eu/*
// @version        0.0.1
// ==/UserScript==

var imgs = document.getElementsByTagName("a");
    for (var i = 0; i < imgs.length; i++) {
		try {
			imgs[i].href = imgs[i].href.replace("http://imagerabbit.com/viewer.php?file=","http://imagerabbit.com/images/");
		} catch(err) {

		}
    }
	