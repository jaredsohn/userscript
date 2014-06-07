// ==UserScript==
// @name          botomatorek
// @version       v10.07
// @description	  bitomat.pl tools
// @description	  table sorting thanks to great sorting jQuery script:
// @description	  from Christian Bach and Maky
// @description	  http://tablesorter.com/docs/
// @description	  
// @description	  any donations in BTC (see http://bitcoin.org/)
// @description	  1FUQ4oDeGzazaJhvtkK2u4eVPh1f1vfmiG
// @description	  
// @author        Incroy
// @include       https://bitomat.pl/Trade*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require       http://maky.and.pl/jquery.tablesorter.min.js
// ==/UserScript==



//----------------------------------------------------------------------------
// deklaracja zmiennych globalnych
//

var bitomatBuyStep    =  0.01;
var bitomatBuyAmount  = 0.1;
var bitomatSellStep   =   0.1;
var bitomatSellAmount = 0.01;

var bitomatMarketPrice;
var bitomatMarketMaxBuy;
var bitomatMarketMinSell;

var bitomatBTCAmount;
var bitomatPLNAmount;
var bitomatPriceToBuy;
var bitomatPriceToSell;

var bitomatBuySpread  = 0.02;
var bitomatSellSpread = 0.02;

var bitomatBuyOffersMaximum  = 1;
var bitomatSellOffersMaximum = 10000;

var bitomatStepsAmount  = 30;

var bitomatBTCLock =   0;
var bitomatPLNLock =   0;

var bitomatDelay      = 9000;
var bitomatShortDelay = 900;
var bitomatMultiplier = 1;

var bitomatTest = false;

var bitomatDonateSecurity = 0;

//----------------------------------------------------------------------------
// skok kupna/sprzedazy
//

    $('#AmountToBuy').val(toComaNumber(bitomatBuyAmount));
    $('#AmountToSell').val(toComaNumber(bitomatSellAmount));


//----------------------------------------------------------------------------
// kolory pol kupna/sprzedazy
//

    $('#PriceToBuy').css('background-color', 'yellow');
    $('#PriceToSell').css('background-color', 'pink');


//----------------------------------------------------------------------------
// budowa ramki na komunikaty
//

    $('div#main').prepend('<div id="infobox" class="actionmessage"></div>');
    infobox('DATA: ');


//----------------------------------------------------------------------------
// zciesniamy
//

    $('div#main br').remove();


//----------------------------------------------------------------------------
// budowa ramki na wybory (decyzje)
//

    $('div#main').prepend('<div id="choicebox" class="actionmessage"></div>');
    $('#choicebox').append('<a href=""> X </a>');


//----------------------------------------------------------------------------
// ustalenie ceny rynkowej bitomatMarketPrice, ilosci PLN i BTC do zakupow
//

    bitomatMarketMaxBuy = toPointNumber($('body').find('table').eq(1).find('tr.best').find('td:eq(0)').text());
    bitomatMarketMinSell = toPointNumber($('body').find('table').eq(0).find('tr.best').find('td:eq(0)').text());


var    bitomatMarketMaxBuyAmount = toPointNumber($('body').find('table').eq(1).find('tr.best').find('td:eq(1)').text().split(' ')[0]);
var    bitomatMarketMinSellAmount = toPointNumber($('body').find('table').eq(0).find('tr.best').find('td:eq(1)').text().split(' ')[0]);


//alert('x');


    bitomatMarketPrice = roundNumber(((bitomatMarketMinSell + bitomatMarketMaxBuy)/2), 2);

    infobox('; MarketMinSell: ' + bitomatMarketMinSell + '; MarketPrice: ' + bitomatMarketPrice + '; MarketMaxBuy: ' + bitomatMarketMaxBuy);

    bitomatPLNAmount = toPointNumber($('#logindisplay').children('span').eq(0).text());
    bitomatBTCAmount = toPointNumber($('#logindisplay').children('span').eq(1).text());


//---------------------------------------------------------------------------
// obsluga tabelki
//

$('body').find('table').eq(2).attr('id', 'myTable');


$('#myTable td').eq(0).replaceWith('<th>Typ</th>');
$('#myTable td').eq(0).replaceWith('<th>Ile (BTC)</th>');
$('#myTable td').eq(0).replaceWith('<th>Po ile (PLN)</th>');
$('#myTable td').eq(0).replaceWith('<th>Zrealizowano (%)</th>');
$('#myTable td').eq(0).replaceWith('<th>Total (PLN)</th>');
$('#myTable td').eq(0).replaceWith('<th>Kiedy</th>');


$('#myTable tr td').attr('align', 'right');


$('#myTable tbody tr').find('td:eq(1)').each(function() {
  $(this).text($(this).text().split(' ')[0].replace(',', '.'));
}); 


$('#myTable tbody tr').find('td:eq(2)').each(function() {
  $(this).text($(this).text().split(' ')[0].replace(',', '.'));
});


$('#myTable tbody tr').find('td:eq(3)').each(function() {
  $(this).text($(this).text().split('%')[0]);
}); 


$('#myTable tbody tr').find('td:eq(4)').each(function() {
  $(this).text($(this).text().split(' ')[0].replace(',', '.'));
}); 


//---------------------------------------------------------------------------
// dodajemy stopke do tabeli
//

    $('#myTable').append('<tfoot></tfoot>');
    $('#myTable tfoot').append('<tr><th align="right" colspan="7"><a id="del" href="">Anuluj wszystkie zlecenia!</a></th></tr>');
    $('#myTable tfoot').append('<tr><th align="left" colspan="7"> Table powered by maky. <a href="http://userscripts.org/scripts/show/105949">Script homepage</a><br>Click to donate 0,03 BTC: <a id="donate" href="http://maky.and.pl/">151Ec3oHn4ssmbSq62AdUWTM4E3SXSMK5t</a></th></tr>');


//---------------------------------------------------------------------------
// jesli w tabeli nic nie ma to nie sortujemy
//

    if ($('#myTable tbody tr').length > 1) { $('#myTable').tablesorter({sortList: [[2,0]]}); };



//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
// szukamy w tabeli MaxBuy i MinSell + sprawdzamy jak sie ma do MarketPrice
//


var bitomatMinBuy = bitomatMarketPrice;
var bitomatMaxBuy = 0.0;
var bitomatMinSell = 1000000000.0;
var bitomatMaxSell = 0.0;

$('#myTable tbody tr').each(function() {
    if ($(this).find('td:eq(0)').text() == 'skup') {

        bitomatBuyOffersMaximum = bitomatBuyOffersMaximum - 1;

        var bitomatBuy = parseFloat($(this).find('td:eq(2)').text());

        if (bitomatBuy > bitomatMaxBuy) { bitomatMaxBuy = bitomatBuy; };
        if (bitomatBuy < bitomatMinBuy) { bitomatMinBuy = bitomatBuy; };


  } else if ($(this).find('td:eq(0)').text() == 'sprzedaz') {

        bitomatSellOffersMaximum = bitomatSellOffersMaximum - 1;

        var bitomatSell = parseFloat($(this).find('td:eq(2)').text());

        if (bitomatSell > bitomatMaxSell) { bitomatMaxSell = bitomatSell; };
        if (bitomatSell < bitomatMinSell) { bitomatMinSell = bitomatSell; };

  }; //else { alert('jakis blad'); }
});


//alert(bitomatSellOffersMaximum);

var bitomatMinSellOffer = bitomatMinSell;
var bitomatMaxBuyOffer = bitomatMaxBuy;


//---------------------------------------------------------------------------
// korekta blednych MaxBuy i MinSell
 
    if (bitomatMinSell == 1000000000.0) { bitomatMinSell = roundNumber((roundNumber(((bitomatMarketPrice + bitomatSellSpread) / bitomatSellStep), 0) + 1) * bitomatSellStep, 2); };

    if (bitomatMaxSell < bitomatMinSell) { bitomatMaxSell = bitomatMinSell; };

    if (bitomatMaxBuy == 0) { bitomatMaxBuy = roundNumber((roundNumber(((bitomatMarketPrice - bitomatBuySpread) / bitomatBuyStep), 0) - 1) * bitomatBuyStep, 2); };

    if (bitomatMinBuy > bitomatMaxBuy) { bitomatMinBuy = bitomatMaxBuy; };

    infobox('; MaxSell=' + bitomatMaxSell + '; MinSell=' + bitomatMinSell + '; MaxBuy=' + bitomatMaxBuy + '; MinBuy=' + bitomatMinBuy);


//---------------------------------------------------------------------------
// kupujemy
//

    bitomatMaxBuy = roundNumber(bitomatMaxBuy + bitomatBuyStep, 2);
    bitomatMinBuy = roundNumber(bitomatMinBuy - (bitomatBuyStep * bitomatMultiplier), 2);

    if (bitomatMinBuy < 0) { bitomatMinBuy = 0; };
    if (bitomatMaxBuy + bitomatBuySpread >= bitomatMarketPrice) {
        bitomatPriceToBuy = bitomatMinBuy;
        bitomatBuyAmount = roundNumber((bitomatBuyAmount * bitomatMultiplier), 2);
//        bitomatPLNLock = bitomatPLNLock + (5 * bitomatBuyStep);
        if (bitomatBuyOffersMaximum <= 0) { bitomatPLNAmount = 0; };
    } else {
        bitomatPriceToBuy = bitomatMaxBuy;

//alert (bitomatMarketMaxBuy + '==' + bitomatMaxBuyOffer);

        if ((bitomatMarketMaxBuy == bitomatMaxBuyOffer) && (bitomatMarketMaxBuyAmount <= bitomatBuyAmount)) {
//            bitomatPLNAmount = 0;
            bitomatPriceToBuy = bitomatMinBuy;
            if (bitomatBuyOffersMaximum <= 0) { bitomatPLNAmount = 0; };
        };
    };
    $('#PriceToBuy').val(toComaNumber(bitomatPriceToBuy));


//---------------------------------------------------------------------------
// sprzedajemy
//

    bitomatMaxSell = roundNumber(bitomatMaxSell + (bitomatSellStep * bitomatMultiplier), 2);
    bitomatMinSell = roundNumber(bitomatMinSell - bitomatSellStep, 2);

    if (bitomatMinSell - bitomatSellSpread <= bitomatMarketPrice) {
        bitomatPriceToSell = bitomatMaxSell;
        bitomatSellAmount = roundNumber((bitomatSellAmount * bitomatMultiplier), 2);
//        bitomatBTCLock = bitomatBTCLock + (5 * bitomatSellStep);
        if (bitomatSellOffersMaximum <= 0) { bitomatBTCAmount = 0; };
    } else {
        bitomatPriceToSell = bitomatMinSell;

//alert (bitomatMarketMinSell + '==' + bitomatMinSellOffer);

        if ((bitomatMarketMinSell == bitomatMinSellOffer) && (bitomatMarketMinSellAmount <= bitomatSellAmount)) {
//            bitomatBTCAmount = 0;
            bitomatPriceToSell = bitomatMaxSell;
            if (bitomatSellOffersMaximum <= 0) { bitomatBTCAmount = 0; };
        };
    };
    $('#PriceToSell').val(toComaNumber(bitomatPriceToSell));


//---------------------------------------------------------------------------



//alert("\nbitomatMinBuy = " + bitomatMinBuy + "\nbitomatMaxBuy = " + bitomatMaxBuy + "\nbitomatMarketPrice = " + bitomatMarketPrice + "\nbitomatMinSell = " + bitomatMinSell + "\nbitomatMaxSell = " + bitomatMaxSell);



//---------------------------------------------------------------------------
// sprawdzenie czy sa srodki do zakupu/sprzedazy i zakup lub sprzedaz
//
//alert(bitomatBTCAmount);
    if ((bitomatPriceToBuy * bitomatBuyAmount) > bitomatPLNAmount - bitomatPLNLock) {
        $('#AmountToBuy').val('0,00');
    } else {
        bitomatBTCBuy(bitomatBuyAmount, bitomatPriceToBuy, bitomatSellAmount, bitomatPriceToSell);
        bitomatDelay = bitomatShortDelay;
    }
    if (bitomatSellAmount > (bitomatBTCAmount - bitomatBTCLock)) {
        $('#AmountToSell').val('0,00');
    } else {
        bitomatBTCSell(bitomatBuyAmount, bitomatPriceToBuy, bitomatSellAmount, bitomatPriceToSell);
        bitomatDelay = bitomatShortDelay;
    };
    setTimeout("location.reload(true);", bitomatDelay);


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
// szybkie anulowanie zlecen
//

$('#myTable tr td a').click(function(event) {
    event.preventDefault();
    var z1 = $('input[name="__RequestVerificationToken"]').val();
    $('#footer').load($(this).attr('href'), { __RequestVerificationToken: z1, Cancel: 'Tak, chcę anulować to zlecenie' });
    $(this).parent().parent().remove();
});


//---------------------------------------------------------------------------
// szybkie anulowanie wszystkich zlecen
//

$('#myTable tr th a#del').click(function(event) {
    event.preventDefault();
    var z3;
    $('#myTable tbody tr td a').each(function() {
        z3 = z3 + 1000;
        var z2 = $(this).attr('href');
        setTimeout(function() {
            var z1 = $('input[name="__RequestVerificationToken"]').val();
            $('#footer').load(z2, { __RequestVerificationToken: z1, Cancel: 'Tak, chcę anulować to zlecenie' });
            $(this).parent().parent().remove();
        }, z3);
        $(this).parent().parent().remove();
    });
});


//---------------------------------------------------------------------------
// przekazanie dotacji
//

$('#donate').click(function(event) {
    event.preventDefault();
    if (bitomatDonateSecurity == 0) {
        alert('You are about to donate 0.03 BTC to script\'s author! Are You sure? If yes, try again.');
    } else if (bitomatDonateSecurity == 1) {
        alert('Are You realy, realy sure?? Try again if You still want to donate 0.03 BTC to script\'s author.');
    } else if (bitomatDonateSecurity > 1) {
       var z1 = $('input[name="__RequestVerificationToken"]').val();
       $('#footer').load('/Account/WithdrawBtc?Length=11', { __RequestVerificationToken: z1, BtcAddress: '1FUQ4oDeGzazaJhvtkK2u4eVPh1f1vfmiG', AmountBTC: '0,03' });
       alert(' Thank You for Your donation! ');
    };
    bitomatDonateSecurity = bitomatDonateSecurity + 1;
});


//---------------------------------------------------------------------------
// obliczenie mozliwosci zakupu
//

$('#PriceToBuy').keyup(function() {
    var x = toPointNumber($('#logindisplay').children('span').eq(0).text());
    var y = toPointNumber($('#PriceToBuy').val());
    var z = roundNumber(x/y, 2);
    $('#AmountToBuy').val(toComaNumber(z));
});


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
// funkcje
//

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
};


function toComaNumber(num) {
	var result = num.toString().replace('.', ',');
	return result;
};


function toPointNumber(str) {
        var result = parseFloat(str.replace(',', '.'));
        return result;
};


function infobox(str) {
        $('#infobox').text($('#infobox').text() + ' ' + str);
};


function bitomatBTCBuy(z2, z3, z4, z5) {
    var z1 = $('input[name="__RequestVerificationToken"]').val();
    z2 = toComaNumber(z2);
    z3 = toComaNumber(z3);
    z4 = toComaNumber(z4);
    z5 = toComaNumber(z5);

//    alert(z2 + ' BTC bought for ' + z3 + ' PLN');

    if (!(bitomatTest)) { $('#footer').load('/Trade',{ __RequestVerificationToken: z1, AmountToBuy: z2, PriceToBuy: z3, AmountToSell: z4, PriceToSell: z5, buy: 'Kup Bitcoiny' }); };
};


function bitomatBTCSell(z2, z3, z4, z5) {
    var z1 = $('input[name="__RequestVerificationToken"]').val();
    z2 = toComaNumber(z2);
    z3 = toComaNumber(z3);
    z4 = toComaNumber(z4);
    z5 = toComaNumber(z5);

//    alert(z4 + ' BTC sold for ' + z5 + ' PLN');

    if (!(bitomatTest)) { $('#footer').load('/Trade',{ __RequestVerificationToken: z1, AmountToBuy: z2, PriceToBuy: z3, AmountToSell: z4, PriceToSell: z5, sell: 'Sprzedaj Bitcoiny' }); };
};