// ==UserScript==
// @name           phpBB IP Check
// @namespace      None
// @description    IP Check PHP
// @include        http://*goalll.nl/forum/viewtopic.php*
// ==/UserScript==

<?php 
$ip_address = $_SERVER['REMOTE_ADDR']; 
$checkin_ip = mysql_query("SELECT ip_address FROM survey_2006_1a WHERE ip_address='$ip_address'"); 

$num_results = mysql_num_rows($checkin_ip); 

if($num_results==0) 
{ 
    echo "You haven't been here before! $ip_address"; 
} else { 
    echo "Go away! You have already been here before!!!!!"; 
}  
?>