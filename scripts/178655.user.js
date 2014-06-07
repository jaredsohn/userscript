// ==UserScript==
// @name       DuyHT 2
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://www.google.com/calendar/render
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

var temp = 1;

setTimeout(function(){
    $('#calcontent #maincell #mainbody').addClass('htduy2621');
    
    $('#mainlogo').click(function(){
        if(temp == 1){
            temp = 0;
        	$('#calcontent #maincell #mainbody').removeClass('htduy2621');
       	 	$('#calcontent #maincell #mainbody').addClass('htduy2622');
        }
        else{
            temp = 1;
            $('#calcontent #maincell #mainbody').removeClass('htduy2622');
        $('#calcontent #maincell #mainbody').addClass('htduy2621');
        }
    });
    
    $('body').keypress(function(e) {
        if(e.keyCode == 96){
            $('#mainlogo').click();
        }
        else if(e.keyCode == 13){
            $('#allday-disclosewk').click();
        }
        
        //alert(e.keyCode);
    });    
}, 500);
