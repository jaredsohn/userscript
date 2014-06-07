// ==UserScript==
// @name            Pozdravno sporočilo
// @namespace       www.erepublik.com
// @author          SlovenianChampion
// @include         http://www.erepublik.com/*
// @version         beta V1
// ==/UserScript==

<?php
?>
<html>
<body>
<?php
if(isset($_COOKIE[piskotek])){
    print "Dobrodošel/a nazaj!".$_COOKIE[piskotek];
}
else{
    print "Prvič si obiskal igro Erepublik. Registriraj se preko te povezave: http://www.erepublik.si/society-builder/referrer. Imamo še eno opozorilo! Nikar ne naredi več državljanov! Hvala.";
?>
</body>
</html>