// ==UserScript==
// @name           Wer kennt wen? GalleryEnhancer
// @namespace      http://felix-kloft.invalid/werkenntwengalleryenhancer
// @description    Vereinfacht Taggen in "Wer kennt wen?"-Gallerien
// @include        http://www.wer-kennt-wen.de/gallery.php?*
// ==/UserScript==

with(unsafeWindow)
{
	oldTagging = newTagging;
	newTagging = function(a, b)
	{
		oldTagging(a, b);
		with(document.getElementById("taggingName"))
		{
			focus();
			select();
		}
	}
}

