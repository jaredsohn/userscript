// ==UserScript==
// @name           GrosseBilderVZ
// @include        http://www.meinvz.net/Photos/EditPhotos/*
// @include        http://www.studivz.net/Photos/EditPhotos/*
// @include        http://www.schuelervz.net/Photos/EditPhotos/*
// @description    Vergrößert die Bilder im Bearbeiten Dialog von StudiVZ, MeinVZ und SchülerVZ
// ==/UserScript==



(function() {
unsafeWindow.$("div.editPhotoBox").width(185).height(220);
unsafeWindow.$("img.rotateRight,img.rotateLeft").css("top",200);
unsafeWindow.$("a.captionLink").css("line-height","120px");
unsafeWindow.$("div.editPhotoBox").each(
	function(i){
		var b=unsafeWindow.$(this).css("background-image");
		b=b.replace(/-s./,"-m.");
		unsafeWindow.$(this).css("background-image",b);
	}
);
}());