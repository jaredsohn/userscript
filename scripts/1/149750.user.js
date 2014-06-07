// ==UserScript==
// @name        VID EDS Bērziņš scraper
// @namespace   *.vid.gov.lv/*
// @description Gets info from VID EDS
// @include     *.vid.gov.lv/*
// @version     9
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       none
// ==/UserScript==
/*
 * 
 * 
 * Author: Janis Jansons (janis.jansons@janhouse.lv)
 * 
 * 
 *
*/

var appid="opendata-mvdbs";
var appver=9;

/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
)
{
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}



function initTask() {
    console.log("We are at the correct domain. Starting...");
    
    if(window.location.pathname =="/VID_PDB/VAD"){
    console.log("We are at the correct page. Keep on rollin' baby.");
        if($('#frmQuery').length > 0){
            console.log("Form found. Time to try some crazy things.");

            var form=$('#frmQuery');

            if(form.children('#Name').length == 0){
                console.log("Could not find the name field, aborting.");
                return 0;
            }

            form.children('#Name').attr('value', 'Andris');
            
            if(form.children('#Surname').length == 0){
                console.log("Could not find the surname field, aborting.");
                return 0;
            }

            form.children('#Surname').attr('value', 'Bērziņš');
            
            if($('input[type=submit]').length == 0){
                console.log("Could not find the submit button, aborting.");
                return 0;
            }
            
            $('input[type=submit]').click();
        }
    }
}


// Posting data to opendata server.
function postData(data, id, that) {

    $.ajax({
        type: 'POST',
        url: "http://vadd.opendata.lv/push/",
        data: {'appid': appid, 'appversion': appver, 'data': data, 'list': document.getElementsByTagName('html')[0].innerHTML, 'id': id},
        success: function(data) {
            console.log("Request done.");
            $('#'+that).children(".preload").remove();
            if(data.length == 0) {
                console.log("fajuuul?");
                return false;
            }
            if(data == "OK"){
               console.log("Success!!! The Matrix has you.");
               showMessge("Thank you, you are awesome! :)", "ok");
               $('#'+that).css("background-color", "green");
               return true;
            }else if(data == "IN"){
               console.log("Already have it!!! Awwww...");
               showMessge("We already have this entry.", "warning");
               $('#'+that).css("background-color", "yellow");
               return true;
            }else{
                console.log("Epic fail!!! "+ data);
                showMessge("Failure: "+data, "error");
                $('#'+that).css("background-color", "red");
            }
            
        },
    });
}

function newHrefVad(item, isOld, that, captcha) {
    
    console.log("Setting new cookie, requesting details page.");
    console.log(that);
    unsafeWindow.setCookie("VADData", item, false, "/", false, false);

    var preload=$(document.createElement('div'));
    preload.attr("id", "p"+that);
    preload.addClass("preload");
    $("#"+that).append(preload);

    var url = (isOld == "2") ? '/VID_PDB/VAD/VADData'
        : '/VID_PDB/VAD/VAD2002Data';

    $.ajax({
        url: url,
        
        success: function(data) {
            //preload.remove();
            console.log("Request done.");
            var foundin = $('*:contains("<img id=\"cap_pic")');
            preload.css("opacity", 0.4);
            if (/id="cap_pic"/i.test(data)){
                console.log("Found captcha. Request user to fill it");
                $("#scid").attr('value', item); $("#scold").attr('value', isOld);
                $("#scthat").attr("value", that);
                solveCaptcha(data);
                showMessge("Captcha required!", "error");
                $('#'+that).css("background-color", "red");
                preload.remove();
                return false;
                //newHrefVad(item, isOld);
            }
            if(captcha==0){
                postData(data, item, that);
            }

            return false;
        }
    });

    return false;
}



function solveCaptcha(data){
    console.log("Solving captcha");
    
    var n=data.match(/<img id="cap_pic" alt="" src="\/VID_PDB\/CaptchaImage\?.*?" onload="CaptchaImageLoad\(\);"\/>/gi);
    //$('html').append('<div id="h123" style="display:none">'+data.children("#frmQuery")+'</div>');
    console.log(n[0]);
    
    $("#ccode").html(n[0]);
    $("#csolve").fadeIn("fast");
    $("#tadcode").focus();
    //<img id="cap_pic" alt="" src="/VID_PDB/CaptchaImage?83415c67-f14c-4fd7-9c34-95a6a27576d0" onload="CaptchaImageLoad();"/>
    
}

function takeSolveCaptcha(){
    
    //<form action="/VID_PDB/VAD/VADDataDeclaration" id="frmQuery" method="post">
    
    
    
$.ajax({
  type: 'POST',
  url: "/VID_PDB/VAD/VADDataDeclaration",
  data: {'CaptchaCode': $("#tadcode").attr('value'), 'search': "Labi"},
  success: function(data) { console.log("Request done.") 
      
  
              if (/check_code/i.test(data)){
                console.log("Wrong code. :( Try again...");
                newHrefVad($("#scid").attr('value'), $("#scold").attr('value'), $("#scthat").attr('value'), 0)
                return 0;
                //newHrefVad(item, isOld);
                
            }
            
            
  postData(data, $("#scid").attr('value'), $("#scthat").attr('value'), 1);
      
      
  },

});
    
    $("#csolve").fadeOut();
    $("#tadcode").attr('value', '');

    
}

function hijackFunction(first) {
    
    console.log("Got the element we need, hijacking the function...");
     
    //HrefVad = window.HrefVad;
    unsafeWindow.HrefVad = newHrefVad;
    
    console.log(window.HrefVad);
    
    //////////////
    $('td a').each(function(index) {
        //alert(index + ': ' + $(this).text());
        
        var pattern = /'\) ;/g;
        var tt=$(this).attr("onclick").replace(pattern, "', this.id, 0);");
        //console.log("Final: "+tt);
        $(this).attr("onclick", tt);
        $(this).attr("id", 'itq'+index);
         //$(this).attr("onclick", "console.log('wololo')");
         //return HrefVad('5daa12fb-53ed-4cd7-af2c-341846411664', '2') ;
    });
    

}

function showMessge(message, type){
    
    var zumzum=$(document.createElement('div'));
    zumzum.css("display", "none");
    zumzum.html(message);
    console.log("Printing status");
    
    
    if(type=="error"){
        zumzum.addClass("error-o");
        //zumzum.css("background-image", "-webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(162, 5, 5, 0.75)), to(rgba(128, 31, 31, 0.88)))");
        //zumzum.css("background-image", " -moz-linear-gradient(top, rgba(162, 5, 5, 0.75) 33%, rgba(128, 31, 31, 0.88) 100%);");
    }else if(type=="ok"){
        zumzum.addClass("ok-o");
        //zumzum.css("background-image", "-webkit-gradient( linear, left top, left bottom, color-stop(0.33, rgba(42, 190, 54, 0.83)), color-stop(1.0, rgba(18, 102, 3, 0.67)) )");
        //zumzum.css("background-image", "-webkit-gradient( linear, left top, left bottom, color-stop(0.33, rgba(42, 190, 54, 0.83)), color-stop(1.0, rgba(18, 102, 3, 0.67)) )");
    }else if(type=="warning"){
        zumzum.addClass("warning-o");
        //zumzum.css("background-image", "-webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(190, 178, 42, 0.831373)), to(rgba(175, 126, 0, 0.670588)))");
        //zumzum.css("background-image", "-webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(190, 178, 42, 0.831373)), to(rgba(175, 126, 0, 0.670588)))");
    }else {
        //zumzum.css("background-color", "rgba(142,152,159,0.8)");
    }
    
    $("#csstatus").prepend(zumzum);
    
    
    zumzum.fadeIn();
    
   setTimeout(function () {  zumzum.fadeOut("fast", function(){ zumzum.remove();});  }, 5000);
    
}


$(document).ready(function(){

    console.log("Found myself at the VID page.");
 
    //setTimeout(function () {  initTask();  }, 3000);

    waitForKeyElements (".itemcount", hijackFunction);

     $('html').append('<div id="csolve" style="text-align:center;display: none;z-index:10; position: fixed; top:0px; left:0px; width: 100%; height: 100%;">'+
     '<p id="ttlr" style="margin-top:60px">Hello there friend! '+
     'Seems like VID is trying to prove that you are not a human. Prove them that they are wrong!</p><div id="ccode"></div>'+
     '<br /><input type="text" id="tadcode" name="CaptchaCode" autocomplete="off" value="" /><br />'+
     '<input type="hidden" value="" name="scthat" id="scthat" />'+
     '<input type="hidden" value="" name="scid" id="scid" /><input type="hidden" value="" name="scold" id="scold" /><input type="button" value="Take that!" name="search" id="scin" /></div>');


    $('html').append('<style type="text/css">#cap_pic{ width:200px; } #csstatus div { '+
    'box-shadow:0 0 11px -1px rgba(0, 0, 0, 0.86), 0 0 4px 1px rgba(255, 255, 255, 0.73) inset; '+
    'padding: 10px; border-radius: 10px; margin-bottom: 10px;'+
    'font-family: "Segoe UI Light","Segoe UI", "Myriad Pro Light", Geneva, Verdana, sans-serif; '+
    '}'+
    ''+
    ' td a { position: relative; }'+
    '.error-o{'+
    'background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(162, 5, 5, 0.75)), to(rgba(128, 31, 31, 0.88)));'+
    'background-image: -moz-linear-gradient(top, rgba(162, 5, 5, 0.75) 33%, rgba(128, 31, 31, 0.88) 100%);'+
    '}'+
    
    '.ok-o{'+
    'background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(30, 162, 5, 0.75)), to(rgba(18, 102, 3, 0.67)));'+
    'background-image: -moz-linear-gradient(top, rgba(30, 162, 5, 0.75) 33%,  rgba(18, 102, 3, 0.67) 100%);'+
    '}'+

    '.warning-o{'+
    'background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(190, 178, 42, 0.831373)), to(rgba(175, 126, 0, 0.670588)));'+
    'background-image: -moz-linear-gradient(top,rgba(190, 178, 42, 0.831373) 33%, rgba(175, 126, 0, 0.670588) 100%);'+
    '}'+

    '#csolve{'+
    'background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, color-stop(0.33, rgba(201, 201, 201, 0.91)), to(rgba(255, 255, 255, 0.88)));'+
    'background-image: -moz-linear-gradient(top, rgba(201, 201, 201, 0.91) 33%, rgba(255, 255, 255, 0.88) 100%);'+
    '}'+
    '#ccode img{'+
    'box-shadow: inset 2px 2px 5px -2px black, 0px 0px 6px -2px white;'+
    'background-color: white;'+
    '}'+
    '#ttlr{'+
    'font-family: "Segoe UI Light","Segoe UI", "Myriad Pro Light", Geneva, Verdana, sans-serif; '+
    'font-size: 21px; '+
    '}'+

    ' .preload {left: -16px;position: absolute; top: 0; width: 16px;; width: 16px; height: 16px;display: block; background-image: url("http://www6.vid.gov.lv/VID_PDB/Content/Images/spinner.gif"); }'+
    '</style>');

    $('html').append('<div id="csstatus" style="background: none;z-index:20;position: fixed; top: 10px; right: 10px"></div>');



    $("#scin").click(function(){
        takeSolveCaptcha();
    });
    
    $("#tadcode").keyup(function(event){
    if(event.keyCode == 13){
        $("#scin").click();
    }
});


});
