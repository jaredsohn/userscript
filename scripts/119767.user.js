// ==UserScript==
// @name           Téléramagic
// @namespace      http://www.dweez.com/userscripts/teleramagic
// @description    Transformez le programme TV de Télérama en télécommande (Arduino + IR Lib + Python Flask + GreaseMonkey) 
// @include        http://television.telerama.fr/tele/grille.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var mine;

jQuery.noConflict()(function(){
    function generateChannel(){
        str = "[";
        $jq(".chaine").each(function(index){
            chaine = "{";
            chaine += "\"prog\": \"" + $jq(this).attr('title') + "\", ";
            chaine += "\"lab\": \"" + $jq(this).parent().attr('id').replace("item_", '') + "\", ";
            chaine += "\"canal\": \"\", ";
            chaine += "\"nom\": \"\", ";
            chaine += "},\n";
            str += chaine;
        });
        str += "]";
        console.log(str);
    }
    
    i = 0;
    function mine(){
        t = setTimeout(function(){
            i++;
            if(jQuery("#contenu_pied_de_page_fixe").css('visibility') == "hidden"){
                console.log('...');
                mine();
            }else{
                clearTimeout(t);
                console.log('OK');
                
                jQuery("#contenu_pied_de_page_fixe").append('<a id="vol-down" href="javascript://">Moins</a> - '
                                                            + '<a id="vol-up" href="javascript://">Plus</a>');
                
                jQuery("#vol-down").click(function(){
                     var url = 'http://192.168.0.10:5000/zap/'+jQuery(this).attr('id');
                     jQuery.get(url);
                });
                
                jQuery("#vol-up").click(function(){
                     var url = 'http://192.168.0.10:5000/zap/'+jQuery(this).attr('id');
                     jQuery.get(url);
                });
                
                jQuery(".logochaine").attr('href','javascript://');
                jQuery(".logo").click(function(){
                     var url = 'http://192.168.0.10:5000/zap/'+jQuery(this).attr('title');
                     jQuery.get(url);
                });
                
            }
        },i*1000);
    }
    mine();
}); 
