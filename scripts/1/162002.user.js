// ==UserScript==
// @name FFFF
// @description Hi
// include *https://www.facebook.com/?ref=logo*

@namespace url(http://www.w3.org/1999/xhtml);

@-moz-document domain("facebook.com") {

* {
    background-color: #000 !important;
    color: #fff !important;
    border-color: #112 !important;
}

.tagsWrapper *, #fbPhotoTheaterTags, .tagsWrapper, #fbPhotoTheaterStageActions, .fbQuestionsPollClickTarget, .fbPhotosPhotoTagboxes {background:transparent!important;}

}

// ==/UserScript==