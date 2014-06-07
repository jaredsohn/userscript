   1. ?/*
   2. *  http://userscripts.org/scripts/show/6453
   3. *
   4. *  This script is free software; you can redistribute it and/or
   5. *  modify it under the terms of the GNU General Public
   6. *  License as published by the Free Software Foundation; either
   7. *  version 2 of the License, or (at your option) any later version.
   8. *
   9. *  This script is distributed in the hope that it will be useful,
  10. *  but WITHOUT ANY WARRANTY; without even the implied warranty of
  11. *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
  12. *  General Public License for more details.
  13. *  http://www.gnu.org/copyleft/gpl.html
  14. */
  15.
  16. // ==UserScript==
  17. // @name            oGame Galaxy Return 2
  18. // @author            aNTRaX
  19. // @description            Recorre la galaxia automáticamente exportando los datos al Galaxy Tool. Mejorada la versión de YeIk0s
  20. // @include            http://ogame*.de/game/galaxy.php?session=*
  21. // ==/UserScript==
  22.
  23. var Time = 3000;
  24.
  25.         function Galaxy()
  26. {
  27.    
  28. var galaxia=document.getElementsByName('galaxy')[0];
  29. var sistema=document.getElementsByName('system')[0];
  30. if(galaxia.value==9 && sistema.value==499)
  31. {
  32.     alert('Universo procesado');
  33.     clearInterval(id);
  34.     return;
  35. }
  36. else if(sistema.value<499)
  37. {
  38. document.getElementById('auto').name = 'systemRight';
  39. }
  40. else
  41. {
  42.     //    alert('Galaxia '+galaxia.value+' procesada. Continuando con la siguiente.');
  43. sistema.value=1;
  44. document.getElementById('auto').name = 'galaxyRight';
  45. }
  46.
  47. document.getElementById('galaxy_form').submit();
  48.
  49.     setTimeout(Galaxy,Time);
  50. }
  51.
  52.     var id = setInterval(Galaxy,Time);