// ==UserScript==
// @name          Real 18 Dictionary Attack PHP 
// @version       alpha
// @namespace     dark89ninja
// @description	  Helps you complete Real 18
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://www.hellboundhackers.org/challenges/real18
// @include       https://*
// @include       http://*
// @include       /*
// @include       *

-------COPY THIS AND SAVE AS real18.php inside your SERVER PHP FOLDER-------

<?php
// /
$f= fopen("//YOUR WORDLIST FILE HERE",'r');
while(!feof($f))
{
   $a=preg_replace("/\\r\\n/","",fgets($f));
   //echo $a;

if(enc($a)=="ojlhgiq0")
{
$ans=$a;
break;
}
}
  echo $ans;   //*/
//  if(enc("data")=='q0f')
   function enc($string)
   {    $a = array('/a/', '/b/', '/c/', '/d/', '/e/', '/f/', '/g/', '/h/', '/i/', '/j/', '/k/', '/l/', '/m/', '/n/', '/o/', '/p/', '/q/', '/r/', '/s/', '/t/', '/u/', '/v/', '/w/', '/x/', '/y/', '/z/', '/A/', '/B/', '/C/', '/D/', '/E/', '/F/', '/G/', '/H/', '/I/', '/J/', '/K/', '/L/', '/M/', '/N/', '/O/', '/P/', '/Q/', '/R/', '/S/', '/T/', '/U/', '/W/', '/X/', '/Y/', '/Z/', '/&/', '/@/', '/%/');

$b = array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57');

$a2 = array('/10/', '/11/', '/12/', '/13/', '/14/', '/15/', '/16/', '/17/', '/18/', '/19/', '/20/', '/21/', '/22/', '/23/', '/24/', '/25/', '/26/', '/27/', '/28/', '/29/', '/30/', '/31/', '/32/', '/33/', '/34/', '/35/', '/36/', '/37/', '/38/', '/39/', '/40/', '/41/', '/42/', '/43/', '/44/', '/45/', '/46/', '/47/', '/48/', '/49/', '/50/', '/51/', '/52/', '/1/', '/2/', '/3/', '/4/', '/5/', '/6/', '/7/', '/8/', '/9/', '/E/');

$b2 = array('k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'ya', '9e');

$string2 = preg_replace($a, $b, $string);

$part2 = strlen($string);

$part3 = $string2 * $part2;

$string3 = preg_replace($a2, $b2, $part3);

$final = preg_replace('/[^a-z0-9]/', '', $string3);
return $final;
}
?>
// ==/UserScript==