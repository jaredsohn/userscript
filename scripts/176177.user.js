// ==UserScript==
// @name       Zbiorki PAF
// @namespace  http://polish-armed-forces.pl
// @version    1.3.2
// @description  Skrypt do zbiórek PAF
// @include        http://www.erepublik.com/*
// @exclude        http://www.erepublik.com/*/*
// @copyright  2012+, Sebaci
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function createOrdersWindow(){
    jQtitle = jQ('<h1>Rozkazy</h1>');
    jQtitle.css('margin-bottom', '10px');
    jQchannel = '<a href="http://webchat.quakenet.org/?channels=paf" style="color: #04346C;" target=_blank>#paf</a>';
    
    jQdescr = jQ('<span><strong style="font-size: 150%;">Polish Armed Forces</strong><br /><strong>Odwiedź kanał: '+jQchannel+'</strong></span>');
    jQdescr.css('position', 'absolute');
    jQdescr.css('left', '15px');
    jQdescr.css('top', '25px');
    jQdescr.css('color', 'white');
    
    jQtop = jQ('<div></div>');
    jQtop.css('position', 'relative');
    jQtop.append(jQdescr);
    jQtop.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
    jQtop.css('background-position', '0 -241px');
    jQtop.css('height', '78px');
    
    jQcontent1 = jQ('<div></div>');
    jQcontent1.css('position', 'relative');
    jQcontent1.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
    jQcontent1.css('background-position', '0 -356px');
    jQcontent1.css('min-height', '30px');
    jQcontent1.css('padding-top', '12px');
    jQcontent1.css('padding-bottom', '12px');
    jQcontent1.css('width', '92%');
    jQcontent1.css('padding-left', '4%');
    jQcontent1.css('padding-right', '4%');
    
    jQcontent2 = jQ('<div></div>');
    jQcontent2.css('position', 'relative');
    jQcontent2.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
    jQcontent2.css('background-position', '0 -366px');
    jQcontent2.css('min-height', '30px');
    jQcontent2.css('padding-bottom', '12px');
    jQcontent2.css('width', '92%');
    jQcontent2.css('padding-left', '4%');
    jQcontent2.css('padding-right', '4%');
    
    jQbottom = jQ('<div></div>');
    jQbottom.css('position', 'relative');
    jQbottom.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
    jQbottom.css('background-position', '0 -607px');
    jQbottom.css('height', '10px');
    
    jQorderDiv = jQ('<div class="boxes rozkazy"></div>');
    jQorderDiv.append(jQtitle);
    jQorderDiv.append(jQtop);
    jQorderDiv.append(jQcontent1);
    jQorderDiv.append(jQcontent2);
    jQorderDiv.append(jQbottom);
    
    jQ('div.column').first().prepend(jQorderDiv);
    
    var snd = new Audio("http://polish-armed-forces.pl/sounds/alert.mp3");
    var snd_play = 'on';
    
    var cookie_str = document.cookie;
    if(cookie_str.length != 0){
        var snd_cookie = cookie_str.match(/(^|;)\s*snd_play=([^;]*)/);

        if(snd_cookie != null) snd_play = snd_cookie[2];
    }
    
    var orders = ['','','',''];
    
    var timerOn=false;
    var timerStarted=false;
    var secs;
    
    function refresh_orders(){
        timerOn = false;

        jQ.ajax({
            type: "GET",
            url: "http://polish-armed-forces.pl/zbiorka_",
            dataType: "html"
        }).done(function( msg ) {
            
            var parts = msg.split(/(?=<hr)/);
            jQcontent1.html(parts[0]);
            jQcontent2.html(parts[1]);
                        
            if(snd_play == 'on') jQ('input#snd_play').prop('checked', true);
            else jQ('input#snd_play').prop('checked', false);
            
            jQ('span#chkbox').css('display', 'inline');
            
            jQ('span#chkbox').delegate('input#snd_play', 'click', function(){
                if(jQ(this).is(':checked')) snd_play = 'on';
                else snd_play = 'off';
                
                document.cookie = 'snd_play='+snd_play;
    		});
            
            var beep = false;
            for(var i = 1; i <= 4; i++){
                newOrder = jQ('span#d'+i+'_ord').text();
                beep = beep || (orders[i-1] != newOrder && newOrder.length != 0);
                orders[i-1] = newOrder;
            }
            
            if(beep && snd_play == 'on') snd.play();

            if(orders.join('').length == 0) secs = 120;
            else secs = 30;
			timerOn = true;
        });
        
    }
    refresh_orders();

    jQ('div.rozkazy').on('click','#refresh_btn', function(){refresh_orders()});
    
    jQ(document).ajaxComplete(function(){
        if(timerStarted==false){
            timerStarted=true;
            count();
        }
    });
    
    function count(){
        jQ('#ref_counter').html(secs);
        if(timerOn) secs--;
        if(secs > 0){
            t=setTimeout(count, 1000);
        }
        else{
            timerStarted=false;
            refresh_orders();
        }
    }
}

addJQuery(createOrdersWindow);
