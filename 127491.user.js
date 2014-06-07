// ==UserScript== 
// @name           image code

// @description    auto image
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
// @include        https://irctc.co.in/cgi-bin/bv60.dll/irctc/booking/bookticket.do*
// ==/UserScript==
<?php 
session_start(); 
$text = rand(10000,99999); 
$_SESSION["vercode"] = $text; 
$height = 25; 
$width = 65; 
 
$image_p = imagecreate($width, $height); 
$black = imagecolorallocate($image_p, 0, 0, 0); 
$white = imagecolorallocate($image_p, 255, 255, 255); 
$font_size = 14; 
 
imagestring($image_p, $font_size, 5, 5, $text, $white); 
imagejpeg($image_p, null, 80); 
?>