// ==UserScript==
// @name        ROSNS Album Full Size Link
// @namespace   Momidi
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://sns.gungho.jp/ro/?m=pc&a=page_fh_album_image_show&target_c_album_image_id=*
// @include     https://sns.gungho.jp/ro/?m=pc&a=page_fh_album_image_show&target_c_album_image_id=*
// @version     1.0.0
// @grant       none
// ==/UserScript==
var img, imgcnt, str;
imgcnt = document.getElementsByTagName('img');
for (var i = 0; i < imgcnt.length; i++) {
    img = imgcnt[i];
    str = img.src
    if (str.substr(-17,12) == "&w=600&h=600") {
        str = str.replace("&w=600&h=600", "");
        $("img").wrap("<a href=\"" + str + "\"></a>");
    }
}
