// ==UserScript==
// @name                gambarphp
// @description         justtest
// @author              nahtaivel
// @include             http://m.kaskus.us/*
// @include             http://opera.kaskus.us/*
// ==/UserScript==








<?php
//Send a generated image to the browser
create_image();
exit();
function CenterImageString($image, $image_width, $string, $font_size, $y, $color) 
 { 
 $text_width = imagefontwidth($font_size)*strlen($string); 
 $center = ceil($image_width / 2); 
 $x = $center - (ceil($text_width/2)); 
 ImageString($image, $font_size, $x, $y, $string, $color); 
 } 
function create_image()
{

//write variable to image
$pass = $_GET["teks"];

//Set the image width and height
$width = 30;
$height = 20;

//Create the image resource
$image = ImageCreate($width, $height);

//We are making three colors, white, black and gray
$black = ImageColorAllocate($image, 0, 0, 0);
$white = ImageColorAllocate($image, 255, 255, 255);
$grey = ImageColorAllocate($image, 200, 200, 200);

//Make the background white
ImageFill($image, 0, 0, $white);

//Add string(s) in black to the image
//ImageString($image, 3, 2, 3, $pass, $black);
CenterImageString($image, $width, $pass, 3, 3, $black);

//Throw in some lines to make it a little bit harder for any bots to break
ImageRectangle($image,0,0,$width-1,$height-1,$grey);
//imageline($image, 0, $height/2, $width, $height/2, $grey);
//imageline($image, $width/2, 0, $width/2, $height, $grey);

//Tell the browser what kind of file is come in
header("Content-Type: image/jpeg");

//Output the newly created image in jpeg format
ImageJpeg($image);

//Free up resources
ImageDestroy($image);
}
