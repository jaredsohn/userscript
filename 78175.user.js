// ==UserScript==
// @name           Yhoko Aktualisierer
// @description    Aktualisiert Yhoko
// @include        http://spirits.yhoko.com/main.php?dest=jobs
// ==/UserScript== 

window.setInterval("Aktualisier()", 1000);

function Aktualisier(){
 location.reload();
 }
