// ==UserScript==
// @name           LambLongs: Sexual Identity Locator
// @author         A Spooky-Assed Ghost
// @description    Oh, there it is.
// @version        1.0.1
// @icon           http://www.zerge.com/images/portfolio/icon-radar.png
// @namespace      http://userscripts.org/users/171410
// @include        http://www.goatlings.com/search_for_pets.php*
// @include        http://www.goatlings.com/searching_for_pets.php*
// @include        http://www.goatlings.com/explore_1p.php*
// @include        http://www.goatlings.com/explore_1p_end.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
var oscPhase = GM_getValue('osc',true);
var urlFile = window.location.href.split('.com/')[1].split('?')[0];
var conditions = [$("a:contains('Click here to enter Misty Meadows')"),$("a:contains('from the Goatling')"),$("a:contains('Battle the Baddie')"),$("a:contains('here')")];
var truths = [];
var initial = true;
for (var j=0; j<conditions.length; j++){
    truths[j]=(conditions[j] && conditions[j].length);
}

function doMain(){
    if(initial){
        initial = false;
    }else{
        if(truths[0]){
            window.location.href = conditions[0][0].href;
        }else if(truths[1]){
            window.location.href = conditions[1][0].href;
        }else if(truths[2]){
            window.location.href = conditions[2][0].href;
        }else if(truths[3]){
            window.location.href = conditions[3][0].href;
        }else if(urlFile == 'explore_1p.php'){
            window.document.forms[1].elements.namedItem("use_attack").selectedIndex = 1;
            window.document.getElementsByTagName('form')[1].submit();
        }else{
            GM_setValue('osc',!oscPhase);
            if(oscPhase){
                window.location.href = "http://www.goatlings.com/searching_for_pets.pro.php?act=move&move=right&location1=Misty_Meadows";
            }else{
                window.location.href = "http://www.goatlings.com/searching_for_pets.pro.php?act=move&move=left&location1=Misty_Meadows";
            }
        }
    }
    setTimeout(doMain,1000);
}
doMain();