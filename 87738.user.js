<?php
// ==UserScript==
// @name           RandomImage
// @author         feme
// @version        1.0
// ==/UserScript==

// File that include the urls of the images. This file needs stay in the same folder that the script.
// FORMAT of this file: URL | MIME TYPE (It can only GIF, JPEG or PNG)
// Ex: www.url.com/image.png | PNG
// For show an image just write for forums: [img]http://www.url.com/randimage.php[/img]
// For html: <img src="http://www.url.com/randimage.php"/>.

$imagesfile='images.txt';
$fp=@file_get_contents($imagesfile);
if(!$fp)
{
	echo '<p>Error al intentar abrir <b>'.$imagesfile.'</b></p>';
}
else
{
	$line=explode(chr(10),$fp);
	for($x=0;$x<count($line);$x++)
	{
		$line2[$x]=explode(' | ',$line[$x]);
	}
	$amount=count($line2);
	$x=mt_rand(0,$amount-1);
	$url=trim($line2[$x][0]);
	$type=trim(strtolower($line2[$x][1]));
	if($type=='jpg')
	{
		$type='jpeg';
		
	}
	switch($type)
	{
		case 'jpeg':
			header('Content-Type: image/jpeg');
			$image=@imagecreatefromjpeg($url);
			$color=imagecolorallocate($image,250,250,250);
			imagejpeg($image);
			break;
		case 'gif':
			header('Content-Type: image/gif');
			$image=@imagecreatefromgif($url);
			imagegif($image);
			break;
		default:
			header('Content-Type: image/png');
			$image=@imagecreatefrompng($url);
			imagepng($image);
	}
	imagedestroy($image);
}
?>