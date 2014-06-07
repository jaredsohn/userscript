// ==UserScript==
// @name Inventory
// @namespace SAL 0.3.4
// @date 14 September, 2012.
// @description Changes the view of your inventory. 
// @author Saloons
// @version 0.3.4
// @include http://*.the-west.*
// @include http://zz1w1.tw.innogames.net/game.php*
// ==/UserScript==

(function(window, undefined) {

 var w;
 if (typeof unsafeWindow != "undefined"){
     w = unsafeWindow 
 } else {
     w = window;  
 }
 if (w.self != w.top){
    return;
 }
 if (/http:\/\/.+\.the-west\..*\/game\.php.*/.test(w.location.href)) {
 var size = localStorage.getItem('inv_size') !== null ? parseInt(localStorage.getItem('inv_size')) : 5;
 switch (size) {
	 case 6: 
	 size = [32, 36];
	 break; 
	 case 5: 
	 size = [36, 42];
	 break; 
	 default:
	 size = [50, 55];
	 break;
 }
 var css = "#bag > .item.item_inventory > .tw_item.item_inventory_img { width: " + size[0] + "px; height: " + size[0] + "px; } #bag > .item.item_inventory { width: " + size[1] + "px !important; height: " + size[1] + "px !important; background-size: contain !important; } #bag { height: 300px !important; } #overlay_inv { display: block !important; }";
 var js = document.createElement("script");
 var head = document.getElementsByTagName("head")[0];
 var body = document.getElementsByTagName("body")[0];
 var style = document.createElement("style");
 style.type = "text/css";
 style.id = "wir_inventoryStyle";
 if (style.styleSheet) {
  style.styleSheet.cssText = css;
 } else {
  if (style.innerText == '') {
   style.innerText = css;
  } else {
   style.innerHTML = css;
  }
 }
 head.appendChild(style);
 var js = document.createElement("script");
 js.innerHTML = "Inventory.size=99999; jQuery(document).bind('inventory_loaded', function() { setTimeout(function() {jQuery('#bag').unbind('mousewheel'); jQuery('#overlay_inv').append('<a id=\\\"wir-edit\\\">Edit inventory</a>'); jQuery('#wir-edit').click(function() { var size2 = prompt('How many items you need in one line?\\nСколько предметов на строку Вам нужно?', 5); if(size2 == null) return; if(size2 > 6 || size2 < 4) return alert('Неверное значение! Не больше 6 и не меньше 4.\\nThe value is incorrect. It should be between 4 and 6.'); if(isNaN(parseInt(size2))) return alert('Неверное значение! Допустимы только цифры.\\nThe value is incorrect! It should be number.'); localStorage.inv_size = parseInt(size2); var confir = confirm('Для принятия изменений надо обновить страницу. Обновить?\\nTo accept the changes necessary to refresh the page. Update?'); if (confir) location.reload(true);})}, 200);});"
 body.appendChild(js);
} // if page is the west
})(window); // closure