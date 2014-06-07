// ==UserScript==
// @name       PBAudit Quick Damage
// @namespace  http://www.pacebutler.com
// @version    1.2
// @description  adds quick links to common damage types
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @match      http://earth/cellaudit/audit.cfm*
// @copyright  2012+, Roger
// ==/UserScript==

$(function(){
    var buttons =[['Water','Water Damage'],
                  ['LCD','LCD Damage'],
                  ['Glass','LCD Cracked Glass'],
                  ['Burn','LCD Burn Spots'],
                  ['Power','Wont power up'],
                  ['Keys','Keypad Bad'],
                  ['Housing','Housing Damage'],
                  ['Software','Software Corrupted'],
                  ['Charge','Charge Port Bad'],
                  ['Speaker','Speaker Bad'],
                  ['Touch','Touch Screen Bad'],
                  ['Crack Ho.','Cracked Housing']
                 ];
    var div = $('<div/>').css('float','none').css('width',413).css('overflow','auto');
    $.each(buttons,function(){
        var op = this[1];
        div.append($('<a href="#">'+this[0]+'</a>').css('padding',3).css('float','left').click(function(){
            $('#DamageReason').find('option:contains("'+op+'")').attr('selected','true');
            $('#btnSend').click();
            return false;
        }).attr('title',this[1]));
    });
    
    //div.find('a').css('border','1px solid black').css('border-radius','8px');
    $('#DamageReason').after(div);
});