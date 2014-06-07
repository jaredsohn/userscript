// ==UserScript==
// @name       KANA Auto NA
// @namespace  http://FRKX201344/KANA/
// @version    0.1
// @description  Automatically fills in the required fields in the identify customer screen with NA######, where the digits are the current date in the format DDMMYY.
// @match      https://mel.kana.salmat.com.au/GTConnect/UnifiedAcceptor/SalmatDesktop.Main/tenant/ATO?avayaLocation=MEL
// @copyright  2013, Zeb Hicks
// ==/UserScript==

setInterval(function() {
    if (document.querySelector('div[class*=Error] > div') != null) {
        document.querySelector('div[class*=Error] > div').children[1].children[0].setAttribute('tabindex', 4.1);;
        document.querySelector('div[class*=Device] > div').children[1].children[0].setAttribute('tabindex', 4.2);;
        document.querySelector('div[class*=Browser] > div').children[1].children[0].setAttribute('tabindex', 4.3);;
        document.querySelector('div[class*=OperatingSystem] > div').children[1].children[0].setAttribute('tabindex', 4.4);;
        document.querySelector('div[class*=CustomerType] > div').children[1].children[0].setAttribute('tabindex', 4.5);;
    }
    if (document.getElementsByClassName('txtHouseFlatNo')[0] !== undefined && document.getElementsByClassName('txtHouseFlatNo')[0].value == '') {
        var d = new Date();
        var suffix = '';
        if (d.getDate() < 10) suffix += '0';
        suffix += d.getDate();
        if (d.getMonth() + 1 < 10) suffix += '0';
        suffix += d.getMonth() + 1;
        suffix += d.getFullYear().toString().substr(2);
        document.getElementsByClassName('txtHouseFlatNo')[0].value = 'NA' + suffix;
        document.getElementsByClassName('txtAddressLineOne')[0].value = 'NA' + suffix;
        document.getElementsByClassName('txtPostalCode')[0].value = 'NA' + suffix;
        GrahamTechnology.util.tryConfirm(null, document.getElementsByClassName('txtHouseFlatNo')[0].getAttribute('id'));
        jsField(document.getElementsByClassName('txtHouseFlatNo')[0].getAttribute('id')).setCurrentValue();
        GrahamTechnology.util.tryConfirm(null, document.getElementsByClassName('txtAddressLineOne')[0].getAttribute('id'));
        jsField(document.getElementsByClassName('txtAddressLineOne')[0].getAttribute('id')).setCurrentValue();
        GrahamTechnology.util.tryConfirm(null, document.getElementsByClassName('txtPostalCode')[0].getAttribute('id'));
        jsField(document.getElementsByClassName('txtPostalCode')[0].getAttribute('id')).setCurrentValue();
    }
}, 100);