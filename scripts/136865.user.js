// ==UserScript==
// @name        pRank
// @namespace   a
// @include     http://pokec.azet.sk/*?i9=*
// @include     http://pokec-sklo.azet.sk/miestnost/*
// @version     1.6.3
// @description This is simple script that Add ranking system to profiles on pokec.sk and u can easy like or dont like users :) working when u logged
// ==/UserScript==


{
    /*$("#roomUsers a.avatar, a.prezyvka").click(
        function(){
            setTimeout(function(){
                if ($(".oKomOCom h2").length > 0){
                    $(".oKomOCom h2").after(iframe);
                }
            }, 1000);
        });*/

    var s = document.createElement("script");
    var iframe =  "\"<iframe style=\'width:184px;height:52px;border:0;margin-top: 16px;\' src=\'http://217.16.176.14/pRank/index.php?t=\"+$(\".css_pruh h2, .oKomOCom h2\").text()+\"&u=\"+$(\"#nickBull\").text()+\"\'></iframe>\"";
   s.innerHTML ="if ($(\".css_pruh h2\").text().length > 0 && $(\"#nickBull\").text().length > 0){$(\".css_vlavo .css_info\").after(" + iframe + ");}\n"
            +"function nastavKlikanicu(){$('#roomUsers a.avatar, a.prezyvka').click(function(){setTimeout(function(){if ($('.oKomOCom h2').length > 0 && $('.oKomOCom iframe').length == 0){$('.oKomOCom h2').after("+iframe+");}},1000);});if($('.oKomOCom iframe').length > 0){setTimeout(nastavKlikanicu, 10000);}else{setTimeout(nastavKlikanicu, 2000);}}"
                +"setTimeout(nastavKlikanicu, 2000);"
        ;
    document.body.appendChild(s);

/*$(function(){
        if ($(".c_do8").text().length > 0 && $("#nickBull").text().length > 0){
            $(".c_do8").after("<iframe style='width:175px;height:52px;border:0'\
                src='http://217.16.176.14/pRank/index.php?t="
                +$(".c_do8").text()
                +"&u="+$("#nickBull").text()
                +"'></iframe>");
        }
    });    */
}