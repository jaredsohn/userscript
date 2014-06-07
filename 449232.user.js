// ==UserScript==
// @author         afreto
// @name           Nemexia bulgaria script
// @namespace      Nemexia bulgaria script
// @version        14.4.1
// @description    Nemexia bulgaria script
// @include        http://*.game.nemexia*
// @require        http://*nemexia*/js/jquery-1.3.2.min.js
// @downloadURL	   http://userscripts.org/scripts/source/449214.user.js
// @updateURL	   http://userscripts.org/scripts/source/449214.user.js
// ==/UserScript==



var GM_JQ = document.createElement('script'); 
GM_JQ.src = 'http://game.nemexia.bg/js/laboratory.js?ver=1024';
GM_JQ.type = 'text/javascript'; 
document.getElementsByTagName('head')[0].appendChild(GM_JQ); 

$('#hotLinksMenu > ul').append(
    
    
    '<br>'+
    '<li style="text-align:center;">Бонус Меню</li>'+
    '<br>'+
    '<li><a href="ship_market.php" style="text-decoration:none;">Пазар Кораби</a></li>'+
    '<li><a href="trade_center.php" style="text-decoration:none;">Пазар</a></li>'+
    '<li><a href="ships.php" style="text-decoration:none;">Кораби</a></li>'+
    '<li><a href="laboratory.php" style="text-decoration:none;">Науки</a></li>'+
    '<li><a href="factory.php" style="text-decoration:none;">Роботи</a></li>'+
    '<li><a href="ship_upgrade.php" style="text-decoration:none;">Ъпгрейди</a></li>'
    
);

$('#boxResMetal').append('<div; style=" color:yellow;">+' + $('dl.list:first > dd')[0].textContent.split(':')[1]+'</div>');
$('#boxResCrystal').append('<div; style=" color:yellow;">+' + $('dl.list:first > dd')[1].textContent.split(':')[1]+'</div>');
$('#boxResGas').append('<div; style=" color:yellow;">+' + $('dl.list:first > dd')[2].textContent.split(':')[1]+'</div>');

