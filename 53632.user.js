// ==UserScript==
// @name           get_gift
// @namespace      http://userscripts.org/andone
// @version        0.0.3
// @include        http://apps.facebook.com/inthemafia/index.php?xw_controller=interstitial&xw_action=accept_gift*
// ==/UserScript==

try{
  var userid = '1846786321';

  var url_tpl = 'http://apps.facebook.com/inthemafia/index.php?xw_controller=interstitial&xw_action=accept_gift&interstitial_gift_id=[[GIFTID]]&interstitial_gift_cat=1&from_user=[[USERID]]';

  var gifts = [18, 63, 64, 65, 68];

  var index = (parseInt(Math.random()*5)%5);

  var checkUrlReg = new RegExp(url_tpl.replace("?","\\?").replace(".","\\.").replace("[[GIFTID]]","(\\d+)").replace("[[USERID]]","(\\d+)"), "i");

  var matchArray = (window.location+"").match(checkUrlReg);
  if ( matchArray.length==3 ) {
    userid = matchArray[2];
    window.setTimeout(function(){
      window.location = url_tpl.replace("[[GIFTID]]", gifts[index]).replace("[[USERID]]",userid);
    },2000);
  }
}catch(e) {
  alert(e.message);
}