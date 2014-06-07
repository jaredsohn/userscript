// ==UserScript==
// @name             Google-ScrollShortcuts-JP
// @namespace        http://www.tadafumisato.com
// @version          1.0
// @description      Add Keyboard ShortKuts for Scroll to google.co.jp
// @include          http://www.google.*/search?*
// ==/UserScript==

(function(){

   //ShortcutsKey
   var next_key = 'j';
   var prev_key = 'k';
   var open_link_key = 'v';

   //SelectBackgroundColor
   var bg_color = '#FFF8D7';

   //SelectTopMargin
   var scroll_top_margin = 200;

   var ele_xpath_exp = '//li[@class="g w0" or @class="g"]';
   var ele_link_xpath_exp = '//li[@class="g w0" or @class="g"]/h3/a';
   var base_url_reg_exp = /(http:\/\/www.google.*?)\//;

   var pres_ele_num;
   var pres_ele_node;

   function next(num){
     var now_ele_node = getElement(
       document,
       ele_xpath_exp,
       pres_ele_num
     );
     var next_ele_node = getElement(
       document,
       ele_xpath_exp,
       pres_ele_num + num
     );

     if(!!next_ele_node){}else{return;}

     pres_ele_num = pres_ele_num + num;
     pres_ele_node = next_ele_node;

     now_ele_node.style.backgroundColor = "";
     next_ele_node.style.backgroundColor = bg_color;

     window.scrollTo(0,
       next_ele_node.offsetTop - scroll_top_margin
     );
   }

   function openLinkNewTab(){
     var ele_link_node = getElement(
       document,
       ele_link_xpath_exp,
       pres_ele_num
     );

     var base_url = location.href.match(base_url_reg_exp);
     var href = ele_link_node.getAttribute("href");

     if(!href.search(/^\/url\?/)){
       href = base_url[1] + href;
     }
     GM_openInTab(href);
   }

   function getElement(doc, xpath, num){
     var result = document.evaluate(
       xpath,
       doc,
       null,
       7,
       null
     );
     return result.snapshotItem(num);
   }

   function keyPress(e){
     e.stopPropagation();
     var reg_exp = /input|isindex|textarea/i;
     if(e.target.toString().search(reg_exp) != -1){
       return;
     }
     var key = String.fromCharCode(e.charCode);
     if(key == next_key){
       if(pres_ele_num == null){
	 pres_ele_num = 0;
	 next(0);
       }else{
	 next(1);
       }
     }else if(key == prev_key){
       next(-1);
     }else if(key == open_link_key){
       openLinkNewTab();
     }
   }

   document.addEventListener('keypress', keyPress, false);

})();
