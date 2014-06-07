   1. // TribalWars Navigation Toolbar v0.1
   2. // This is a Greasemonkey user script.
   3. //
   4. // To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
   5. // Then restart Firefox and revisit this script.
   6. // Under Tools, there will be a new menu item to "Install User Script".
   7. // Accept the default configuration and install.
   8. //
   9. // To uninstall, go to Tools/Manage User Scripts,
  10. // select "Hello World", and click Uninstall.
  11. //
  12. // --------------------------------------------------------------------
  13. //
  14. // ==UserScript==
  15. // @name          TribalWars Navigation Toolbar v0.1
  16. // @namespace     http://diveintogreasemonkey.org/download/
  17. // @description   Makes navigating TribalWars easier
  18. // @include       http://tw*.tribalwars.net/game.php*
  19. // @include       http://s*.tribalwars.es/game.php*
  20. // ==/UserScript==
  21.
  22. function getParam( name ) {
  23.   if (name == 'GETURL') {
  24.     var regexS = "(.*)/(.*)";
  25.     var regex = new RegExp( regexS );
  26.     var tmpURL = window.location.href;
  27.     var results = regex.exec( tmpURL );
  28.   } else {
  29.     var regexS = "[\\?&]"+name+"=([^&#]*)";
  30.     var regex = new RegExp( regexS );
  31.     var tmpURL = window.location.href;
  32.     var results = regex.exec( tmpURL );
  33.   }
  34.   if( results == null )
  35.     return "";
  36.   else
  37.     return results[1];
  38. }
  39.
  40.
  41.
  42. var baseURL = getParam('GETURL');
  43. var vID = getParam('village');
  44. var navbar = document.createElement("div");
  45. navbar.innerHTML = '<br><center><div style="position:relative;width:780px;padding: 6px; margin-left: 22px; margin-bottom: 5px;text-align: center;background-color:#F1EBDD;border:1px solid #000">'+
  46. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=main"><img src="'+baseURL+'/graphic/buildings/main.png" border="0">&nbsp;Hoofdgebouw</a>&nbsp;&nbsp;|&nbsp; '+
  47. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=barracks"><img src="'+baseURL+'/graphic/buildings/barracks.png" border="0">&nbsp;Kazerne</a>&nbsp;&nbsp;|&nbsp; '+
  48. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=stable"><img src="'+baseURL+'/graphic/buildings/stable.png" border="0">&nbsp;Stal</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
  49. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=garage"><img src="'+baseURL+'/graphic/buildings/garage.png" border="0">&nbsp;Werkplaats</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
  50. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=snob"><img src="'+baseURL+'/graphic/buildings/snob.png" border="0">&nbsp;Adelshoeve</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
  51. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=smith"><img src="'+baseURL+'/graphic/buildings/smith.png" border="0">&nbsp;Smederij</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
  52. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=place"><img src="'+baseURL+'/graphic/buildings/place.png" border="0">&nbsp;Verzamelplaats</a>&nbsp;&nbsp;|&nbsp;&nbsp; '+
  53. '<a href="'+baseURL+'/game.php?village='+vID+'&screen=market"><img src="'+baseURL+'/graphic/buildings/market.png" border="0">&nbsp;Marktplaats</a>&nbsp;&nbsp;&nbsp; '+
  54. '</div></center>';
  55. document.body.insertBefore(navbar, document.body.childNodes[4]);
  56.
  57.
  58.
  59.
  60. var navbar = document.createElement("div");
  61. navbar.innerHTML = '<center><div>'+
  62. '<a href="'+direccion[0]+'">Buscador aldeas</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
  63. '<a href="'+direccion[1]+'">Calculador de tropas</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
  64. '<a href="'+direccion[2]+'">Calculador de bot&iacute;n</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
  65 '<a href="'+direccion[3]+'">Calculador de recuperaci&oacute;n</a>&nbsp;&nbsp;|&nbsp;&nbsp;'+
  66. '<a href="'+direccion[4]+'">Compactador</a>'
  67. '</div></center><br>';
  68. document.body.insertBefore(navbar, document.body.childNodes[4]);