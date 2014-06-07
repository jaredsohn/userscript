// ==UserScript==
// @name        miestukarai bankas
// @namespace   /main-page
// @include     http://s4.miestukarai.lt/bank.php
// @version     0.0011
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==



    console.log(1);
var logger = $('<div id="logger" style="font-size:12px;line-height:16px;background:black;color:white;border:2px solid green; position:fixed;bottom:0;padding:2px 5px 0 50px;left:1%;width:50%;height:110px;overflow:hidden"></div>');
    logger.appendTo($('body'));
    var lognr = 1;
    function cosole(msg) {
        $('#logger').html(lognr+' '+msg +'<br/><div style="opacity: 0.9">'+$('#logger').html( )+'</div>' );
        console.log('cosole',msg);
        lognr++
    }

    cosole('INIT')


    if($('.important-mess-text').text().indexOf('ligonin')>10)
    {
        cosole('OBLED GULIM LIGONINEJ NX, RELOADAS UZ 20sec ');
        setTimeout(function(){
            window.location = 'gym.php'
        },20000)
        return;
    }

    if($('.cont_box input[type=text]:eq(1)').val()>500)
    {
        cosole('DEDAM I BANKA 7 sec')
        setTimeout(function(){
            $('.cont_box form:eq(1) input[type="submit"]').click();
        },7000);


    }
    else{
        cosole('I BANKA PADETA');
        cosole('ATGAL NX I GYMA SPORTUOT 7 sec')
        setTimeout(function(){
              window.location = 'gym.php'
        },7000);
    }

