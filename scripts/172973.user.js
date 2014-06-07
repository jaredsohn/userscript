// ==UserScript==
// @name       Składki ZUS
// @namespace  http://use.i.E.your.homepage/
// @version    1.0
// @description  enter something useful
// @match      https://online.mbank.pl/*
// @copyright  2013+, Roman Linde
// ==/UserScript==


var uzupelnijPole = function(pole, kwota) {   
    var input = $('[id*='+pole+']');
    input.focus();
    input.val(kwota);    
    input.blur();
};

var zaznaczPole = function(pole, zaznaczony) {        
    var input = $('[id*='+pole+']');
    input.focus();
    input.prop('checked', zaznaczony);
    input.blur();    
};


var uzupelnijKwoty = function(event) {
    event.preventDefault();
    var year = $('[id*=declaration_year]').val();
    if (year==2013) {                            
        zaznaczPole('selectZus_social_checkbox', true);  
        uzupelnijPole('selectZus_social_content', "710,67");
        zaznaczPole('selectZus_health_checkbox', true);
        uzupelnijPole('selectZus_health_content', "261,73");
        zaznaczPole('selectZus_fgsp_checkbox', true);
        uzupelnijPole('selectZus_fgsp_content', "54,58");
    }
    else
    if (year==2014) {                            
        zaznaczPole('selectZus_social_checkbox', true);  
        uzupelnijPole('selectZus_social_content', "716,99");
        zaznaczPole('selectZus_health_checkbox', true);
        uzupelnijPole('selectZus_health_content', "270,40");
        zaznaczPole('selectZus_fgsp_checkbox', true);
        uzupelnijPole('selectZus_fgsp_content', "55,07");
    }
    else 
        alert('Składki dla roku '+year+' nie zostały zdefiniowane.');
    
    return false;
};

var intervalInfo = setInterval(function() {
    if (document.getElementsByClassName('form-transfer-zus').length==0) { return; }
    if ($('#uzupelnijKwoty').length==0) {
        $('.row-selectZus .header').append('<div>&nbsp;</div><div><button class="btn-red-gradient" id="uzupelnijKwoty">Uzupełnij kwoty</button></div>');    
        $('#uzupelnijKwoty').mousedown(uzupelnijKwoty).click(function(e){ e.preventDefault(); });
    }    
}, 100);
