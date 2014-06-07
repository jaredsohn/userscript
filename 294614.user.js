// ==UserScript==
// @name        Kvartplata.ru info minimizer, ЖКХНСО.РФ компоновщик оплаты
// @namespace   Kvartplata
// @description Уменьшает размер выводимой при оплате информации, увеличивая тем самым её количество на экране
// @include     https://www.kvartplata.ru/room/pk/payFormPopup.action*
// @include     https://www.kvartplata.ru/room/pk/css/style.css
// @version     0.1
// @grant       none
// @author      Mikhail Karagpoltsev aka iMiKE, E-Mail: M-I-B@yandex.ru, ICQ: 374747495, Skype: imike_mib
// ==/UserScript==

console.log("KVPLT is loading...");
var allDivs = document.getElementsByTagName('div');
for(var i = 0, div; div = allDivs[i]; i++)
{
   if(div.className == 'form_row m-panel')
    {
        div.style.padding = '0px';
        div.style.border = '0px';
        div.style.borderRadius = '0px';
        }
}
