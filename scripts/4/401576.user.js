// ==UserScript==
// @name       Auto24.ee VAT corrector
// @namespace  http://about.me/sergoulpus
// @version    0.2
// @description  Changes all prices in auto24.ee listing to not include VAT

// @match      http://www.auto24.ee/kasutatud/nimekiri.php*
// @copyright  2014 Sergo Ulpus
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==




// @match      http://www.auto24.ee/kasutatud/nimekiri.php*

jQuery(document).ready(function(){
    $(".insearch-offers").hide();
    $(".price:contains('sis. KM')").not(":contains('Hind')").not(":contains('EUR')").not(":contains('€')").css("border","1px solid red");
    
    
    
    // Arvutame keskmise hinna (alghindadest)
    var sum = 0;
    var cnt = 0;
    
    $(".price").not(":contains('Hind')").not(":contains('EUR')").not(":contains('€')").each(function(i){
        avprice = $(this).html();
        console.log('a='+avprice);
        avprice = avprice.replace(/[^\d]/g,"");
        avprice = parseInt(avprice);
        console.log('a='+avprice);
    
        sum = sum + avprice;
        cnt ++;
    });
    
    avprice = Math.round(sum / cnt);
    
    $('.current-range').append('<span><br><strong>Average price (as is):'+ avprice +'</strong></span>');


    


/* Võta KM maha */    
    $(".price:contains('sis. KM')").not(":contains('Hind')").not(":contains('EUR')").not(":contains('€')").each(function(i){
        origprice = $(this).html();
        
        // price = $(this).html().replace('&nbsp;','');

        fullprice = origprice.replace(/[^\d\+]/g,"");
        //console.log(fullprice);
        
		price = Math.round(parseFloat(fullprice)/1.2);
        price = addSeparatorsNF(price, ",",",", "&nbsp;");
        console.log(price);
        $(this).replaceWith('<td class="price">'+price+'<small>+ KM</small></td>');
        
    });
    
    
    // Arvutame keskmise hinna  (ilma kmta(
    var sum = 0;
    var cnt = 0;
    
    $(".price").not(":contains('Hind')").not(":contains('EUR')").not(":contains('€')").each(function(i){
        avprice = $(this).html();
        console.log('a='+avprice);
        avprice = avprice.replace(/[^\d]/g,"");
        avprice = parseInt(avprice);
        console.log('a='+avprice);
    
        sum = sum + avprice;
        cnt ++;
    });
    
    avprice = Math.round(sum / cnt);
    
    $('.current-range').append('<span><br><strong>Average price w/o VAT:'+ avprice +'</strong></span>');
    


    
    /* Lisa KM juurde */    
/*    $(".price").not(":contains('sis. KM')").not(":contains('Hind')").not(":contains('EUR')").not(":contains('€')").each(function(i){
        origprice = $(this).html();
        price = $(this).html().replace('&nbsp;','');
        price = Math.round(parseFloat(price)*1.2);
        price = addSeparatorsNF(price, ",",",", "&nbsp;");
        $(this).replaceWith('<td class="price">'+price+'<small>'+origprice+'+KM</small></td>');
    });
*/
});


function addSeparatorsNF(nStr, inD, outD, sep)
{
	nStr += '';
	var dpos = nStr.indexOf(inD);
	var nStrEnd = '';
	if (dpos != -1) {
		nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
		nStr = nStr.substring(0, dpos);
	}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
	}
	return nStr + nStrEnd;
}