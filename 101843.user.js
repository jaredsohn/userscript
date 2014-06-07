// ==UserScript==
// @name          Farm Town Gift Exchange list Changer
// @namespace     http://freefarmtowngiftshop.com
// @author        FT Giftshop
// @description   Changes all the Exchange Gift list to useful items.
// @version       1.0
// ------------------------------------------------------------------
// @include       http://apps.facebook.com/farmtown/play/?type=*

// ==/UserScript==




var main, newElement;
main = document.getElementById('app56748925791_next_gift_selector');

if (main) {
    newElement = document.createElement('div');
    newElement.innerHTML = '<select id="app56748925791_next_gift_selector" onchange="fbjs_sandbox.instances.a56748925791.bootstrap();return fbjs_dom.eventHandler.call([fbjs_dom.get_instance(this,56748925791),function(a56748925791_event) &#123;a56748925791_next_gift_selected()&#125;,56748925791],new fbjs_event(event));" style="font-size: 10pt;" fbcontext="c41fe1277d11"> ' +
    '<option value="ZL">15  x Blueberry</option> ' +
    '<option value="))">100 X Carbonated Water</option> ' +
    '<option value="TC">20  x Chicken</option> ' +
    '<option value="Y0">50  x Chocolate Liquor</option> ' +
    '<option value="IC">20  x Cow Milk</option> ' +
    '<option value="X3">25  x Flour</option> ' +
    '<option value="Y$">200 x Freshwater Bait</option> ' +
    '<option value="O1">20  x Ham</option> ' +
    '<option value="IA">15  x Hen Eggs</option> ' +
    '<option value="KV">50  x Hotdog Sausage</option> ' +
    '<option value="H8">10  x Ketchup</option> ' +
    '<option value="TA">20  x Meat</option> ' +
    '<option value="O2">10  x Pepperoni</option> ' +
    '<option value="H7">15  x Pickles</option> ' +
    '<option value="ZJ">15  x Pineapples</option> ' +
    '<option value="(V">10  x Pork</option> ' +
    '<option value="XA">15  x Potatoes</option> ' +
    '<option value="X$">200 x Salt</option> ' +
    '<option value="_@">10  x Sausage Pack</option> ' +
    '<option value="Z!">200 x Seawater Bait</option> ' +
    '<option value="XS">25  x Strawberries</option> ' +
    '<option value="X4">25  x Sugar</option> ' +
    '<option value="XT">15  x Tomatoes</option> ' +
    '</select> ';

    main.parentNode.insertBefore(newElement, main);
    main.parentNode.removeChild(main);
}








