// ==UserScript==
// @name           s101.Bitefight.ru: UF (Useful function)
// @namespace	   Buy potions for bitefight.ru
// @description    Useful function for bitefight.ru v.3.0.9
// @version	   1.0
// @include        http://s101.bitefight.ru/*
// ==/UserScript==


(function() {
    var strHTML = document.getElementsByTagName("html")[0].innerHTML;
    var token = strHTML.match(/token=\S+\"/);
    var gold = document.getElementsByClassName("infobar_line_value")[0].innerHTML.replace(new RegExp(/\./), "");;
        if (!token) return;
        if (!gold) return;
            var href_buy_1_1 = '"http://s101.bitefight.ru/city/shop/potions/buy/1/1/&page=1?__'+token;
            var href_buy_19_1 = '"http://s101.bitefight.ru/city/shop/potions/buy/19/1/&page=1?__'+token;
            var href_buy_16_1 = '"http://s101.bitefight.ru/city/shop/potions/buy/16/1/&page=1?__'+token;
            var href_use_1_1 = '"http://s101.bitefight.ru/profile/useItem/2/1?__'+token;
            var href_use_19_1 = '"http://s101.bitefight.ru/profile/useItem/2/19?__'+token;
            var href_use_16_1 = '"http://s101.bitefight.ru/profile/useItem/2/16?__'+token;

    var buttons = document.getElementById('infobar');
        if (!buttons) return;
        var div = document.createElement('div');

        var strUploadDiv = '';
        strUploadDiv += '<center><table>';
        strUploadDiv += '  <tr><td>Покупка:</td>';
        strUploadDiv += '      <td><a href='+href_buy_1_1+'><img src="http://s101.bitefight.ru/img/items/2/1.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td><a href='+href_buy_19_1+'><img src="http://s101.bitefight.ru/img/items/2/19.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td><a href='+href_buy_16_1+'><img src="http://s101.bitefight.ru/img/items/2/16.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td colspan="5" style="text-align: center">Охота на людишек</td>';
        strUploadDiv += '      <td colspan="5" style="text-align: center">Первичные признаки</td>';
        strUploadDiv += '      <td style="text-align: center">Кладбище</center></td>';
        strUploadDiv += '      <td style="text-align: center">Пожертвовать</center></td>';
        strUploadDiv += '  </tr>';
        strUploadDiv += '  <tr><td>Активация:</td>';
        strUploadDiv += '      <td><a href='+href_use_1_1+'><img src="http://s101.bitefight.ru/img/items/2/1.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td><a href='+href_use_19_1+'><img src="http://s101.bitefight.ru/img/items/2/19.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td><a href='+href_use_16_1+'><img src="http://s101.bitefight.ru/img/items/2/16.jpg" width="20px" height="20px" alt="" /></a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/humanhunt/humanHunt/1">Ф</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/humanhunt/humanHunt/2">Д</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/humanhunt/humanHunt/3">М.Г</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/humanhunt/humanHunt/4">Г</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/humanhunt/humanHunt/5">М</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/profile/training/1?__'+token+'>С</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/profile/training/2?__'+token+'>З</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/profile/training/3?__'+token+'>Л</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/profile/training/4?__'+token+'>В</a></td>';
        strUploadDiv += '      <td style="text-align: center"><a href="http://s101.bitefight.ru/profile/training/5?__'+token+'>Х</a></td>';
        strUploadDiv += '      <td style="text-align: center"><form action="http://s101.bitefight.ru/city/graveyard/?__'+token+'  method="POST"><input type="submit" name="startWork" value="Нач. раб."></form></td>';
        strUploadDiv += '       <td style="text-align: center"><form action="http://s101.bitefight.ru/clan/donate?__'+token+' method="POST">';
        strUploadDiv += '       <input type="text" name="donation" value="'+gold+'" style="display:none">';
        strUploadDiv += '       <input type="submit" name="donate" value="Пож. золото"></form></td>';
        strUploadDiv += '  </tr>';
        strUploadDiv += '</table></center>';

        div.innerHTML = strUploadDiv;

buttons.appendChild(div);
})()