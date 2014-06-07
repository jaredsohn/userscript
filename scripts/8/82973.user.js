// ==UserScript==
// @name           A nuke -by- demonofsarila
// @namespace      URI
// @description    nukes the A bucket junk on dA -by- demonofsarila
// @include        *.deviantart.com/*
// @exclude        http://groups.deviantart.com/*
// ==/UserScript==

//	<thanks to="electricjonny">
	/* ---------- jQuery ---------- */
$ = unsafeWindow.jQuery;

/* ---------- Change deviation URL's to not be retarded ---------- */
$('.shadow a').each(function () {
     this.href = $(this).attr('href').replace(/\?q\=.*/, '#');
});
//	</thanks>

	var elmDeleted = document.getElementById('gmi-PreviewStreamControls');
	elmDeleted.parentNode.removeChild(elmDeleted);
	
	var changeSpace = document.getElementById('gmi-ResViewSizer_linkzone');
	changeSpace.setAttribute("style", "min-height: 0px !important;");