// ==UserScript==
// @name          Dailies
// @description   obtiene dailies de siguientes dias
// @include       http://www.lockerz.com/dailies
// @include       http://www.lockerz.com/dailies
// ==/UserScript==

<title>Lockerz: Dailies</title>
<link rel="shortcut icon" href="http://static.lockerz.com/img/favion.png"/> 
<body bgcolor="#1a0028" text="#FFFFFF" font size="10" link="#006060" vlink="#006060">

<script>
function get0igres() {
	time();
}
</script>
<?php

$fechas1 = date('Ymd',time());
$fechas2 = date('Ymd',time()+(24*60*60));
$fechas3 = date('Ymd',time()+(2*24*60*60));
$fechas4 = date('Ymd',time()+(3*24*60*60));

$fecha11 = date('Y-m-d',time());
$fecha22 = date('Y-m-d',time()+(24*60*60));
$fecha33 = date('Y-m-d',time()+(2*24*60*60));
$fecha44 = date('Y-m-d',time()+(3*24*60*60));

$dailies = "http://static.lockerz.com/img/dailies/$fechas1-bannerImage.jpg";
$dailies1 = "http://static.lockerz.com/img/dailies/$fechas2-bannerImage.jpg";
$dailies2 = "http://static.lockerz.com/img/dailies/$fechas3-bannerImage.jpg";
$dailies3 = "http://static.lockerz.com/img/dailies/$fechas4-bannerImage.jpg";

  
echo "<center>$fecha11<center><p><center><img src=$dailies alt=Dailie de Hoy border=0></center>
<p><center>$fecha22<center><p><img src=$dailies1 alt=Dailie de Mañana border=0> 
<p><center>$fecha33<center><br><img src=$dailies2 alt=Dailie de Pasado Mañana border=0> 
<p><center>$fecha44<center><br><img src=$dailies3 alt=Dailie de Pasado Pasado Mañana xD border=0> ";



?>

<!-- By S3RGI0 ChuKaMiKo Team -->