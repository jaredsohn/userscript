// ==UserScript==
// @name        miestu kovos
// @namespace   /main-page
// @include     http://www.miestukovos.lt/gym.php
// @version     0.0011
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// ==/UserScript==


/*
*       GLOBAL VARIABLES
* */

//logger
(function(){

    var logger = $('<div id="logger" style="font-size:12px;line-height:16px;background:black;color:white;border:2px solid green; position:fixed;bottom:0;padding:2px 5px 0 50px;left:1%;width:50%;height:110px;overflow:hidden"></div>');
    logger.appendTo($('body'));
    var lognr = 1;
    function cosole(msg) {
        $('#logger').html(lognr+' '+msg +'<br/><div style="opacity: 0.9">'+$('#logger').html( )+'</div>' );
        console.log('cosole',msg);
        lognr++
    }




var constant_drasa_min;
var constant_crime_id ;
var constant_energy_min = 90
var constant_budrumas = 80


if($('.progress, .stats_line').eq(4).find('span').length == 1)
{
    //kovos
      constant_crime_id = 55;
      constant_drasa_min = 1000;
}
else
{
    //karai
      constant_crime_id = 6;
      constant_drasa_min = 90
}



var time;
var btns =
[
    {el:$('input[name=type1]')},
    {el:$('input[name=type2]')},
    {el:$('input[name=type3]')}
]
var i = 0;

function app()
{
    cosole('-================-');
    if($('.progress, .stats_line').eq(4).find('span').length == 1)
    {
        var drasa = $('.progress, .stats_line').eq(4).find('span').text().replace('%','').trim()*1;
        var budrumas = $('.progress, .stats_line').eq(3).find('span').text().replace('%','').trim()*1;
        var energija = $('.progress, .stats_line').eq(2).find('span').text().replace('%','').trim()*1;
    }
    else
    {
        var drasa = $('.progress, .stats_line').eq(4).find('span').eq(1).text().replace('%','').trim()*1;
        var budrumas = $('.progress, .stats_line').eq(3).find('span').eq(1).text().replace('%','').trim()*1;
        var energija = $('.progress, .stats_line').eq(2).find('span').eq(1).text().replace('%','').trim()*1;
    }

    cosole('Drasa: '+drasa+'%   Budrumas: '+budrumas+'%, Energija: '+energija+'% '+' Ze COOKIE ID: '+$.cookie('the_cookie_id') );

    if($('.important-mess-text').text().indexOf('ligonin')>10)
    {
        cosole('OBLED GULIM LIGONINEJ NX, RELOADAS UZ 20sec ');
        setTimeout(function(){
            window.location = 'gym.php'
        },20000)
        return;
    }
    if(energija>25 && $.cookie('the_cookie_id').length<5)
    {
        cosole('Energija > 25% = Pyzdinam 539');
        setTimeout(function(){

           $.get('http://s4.miestukarai.lt/mug.php?mug='+$.cookie('the_cookie_id'), function (resp) {
          // $.get('gym.php', function (resp) {

               var indexL = (resp.lastIndexOf('gavai')>0 )?resp.lastIndexOf('gavai') : resp.lastIndexOf('tuo efektyviau');

                var sum = resp.substr(indexL+6,15).trim().replace('Lt','').replace(',','').replace(',','').trim();
                console.log(indexL, sum);
                if(sum*1>50000)
                {
                    cosole('JEEE NUPYZDINAI '+sum +'Lt  saibas dedam i banka kol ne velu 5 sec');
                    setTimeout(function(){
                        window.location = 'bank.php'
                    },5000)
                }
                else{




                    if( $.cookie('the_cookie_repeat')==1 )
                    {
                        cosole('NIEKO CIA NEISEINA -  SPORTUOK RAMUS, resfres 15 sec');

                        $.cookie('the_cookie_id', 'NIEKO NEPYZDINAM');
                        $.cookie('the_cookie_repeat', '0');
                        setTimeout(function(){
                            window.location = 'gym.php'
                        },15000)
                    }
                    else{
                        cosole('OJOJOJJ GAVAI I SNUKI - bandysim  dar karta uz 40sec' );

                        setTimeout(function(){
                            window.location = 'gym.php'
                        },40000)

                        $.cookie('the_cookie_repeat', '1');

                        return;
                    }


                }
            });
            /*
            $.get('gym.php',function(resp){

                console.log(resp.indexOf('Tu apvogei'))

            })**/
        },5000);
        return;
    }
    if(budrumas<constant_budrumas)
    {
        cosole('Budrumas nepilnas pause 10 sec.');
        setTimeout(function(){
            app();
        },10000);

        return;
    }
    if(drasa>constant_drasa_min)
    {
     //   cosole('GOTO Crime in 5 sec');
     ///   setTimeout(function(){
           // window.location = 'crime.php?id='+constant_crime_id
     //   },5000);
      //  return;
    }

    var now = new Date();
    var mins = now.getMinutes();
    var quarterHours = Math.round(mins/15);
    if (quarterHours == 4)
    {
        now.setHours(now.getHours()+1);
    }
    var rounded = (quarterHours*15)%60;
    now.setMinutes(rounded);
    var quarter = 0;
    var quarterPav = 'Pisam raumney ant JEGA';
    switch (now.getMinutes())
    {
        case 0:
            if($('.progress, .stats_line').eq(4).find('span').length == 1)
            {
                //kovos
                quarter = 2;
                quarterPav = 'Pisam raumney ant GREITIS';
            }
            else
            {
                //karai
                quarter = 0;
                quarterPav = 'Pisam raumney ant JEGA';
            }


            break;
        case 15:
            if($('.progress, .stats_line').eq(4).find('span').length == 1)
            {
                //kovos
                quarter = 2;
                quarterPav = 'Pisam raumney ant GREITIS';
            }
            else
            {
                //karai
                quarter = 1;
                quarterPav = 'Pisam raumney ant APSAUGA';
            }
            break;
        case 30:
            quarter = 2;
            quarterPav = 'Pisam raumney ant GREITIS';
            break;
        case 45:
            quarter = 2;
            quarterPav = 'Pisam raumney ant GREITIS';
            break;
    }


    if(  $('#javascript_countdown_time').text().indexOf('00') == -1)
    {
        cosole('Atsinaujino tashkai -  Reload page in 5sec');
        setTimeout(function(){
            window.location = 'gym.php'
        },5000);
        return;
    }


    cosole('Quarter: ' +quarter+',   '+quarterPav);
    if(energija>constant_energy_min)
    {
        cosole('Action - klikinam:'+ quarter+' in 5 sec');
        setTimeout(function(){
            btns[quarter].el.click();
        },5000);
    }

    setTimeout(function(){
        app();
    },5000);
}

setTimeout(function()
{
    cosole('Kachialka Ready!');
    app();
},5000);



})()