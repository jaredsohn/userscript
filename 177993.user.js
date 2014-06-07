// ==UserScript==
// @name           CSManager Tiago Plugin
// @author         Tiago Oliveira
// @version        17/09/2013
// @namespace      http://www.google.com/
// @description    CSManager Tiago Plugin
// @include        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @match          http://www.cs-manager.com/*
// @copyright 	   2013+, Tiago
// ==/UserScript==

/******************************************/
/**********START GLOBAL FUNCTIONS**********/
/******************************************/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function checkUrlVar(field) {
    var url = window.location.href;
    if(url.search(field) != -1)
        return true;
    else
        return false;
}
/****************************************/
/**********END GLOBAL FUNCTIONS**********/
/****************************************/

//Check if we are in login page
if($("#login-form").length == 1)
{
    //If you don't come from logout, let's check if we can do login
    if(!checkUrlVar('loggedout'))
    {
        if(checkUrlVar('status'))
        {
            //If any error occurred while trying to login, let's remove login data and reload de page
            var status = getUrlVars()['status'];
            if(status == "bad_login")
            {
                localStorage.removeItem("tiUsername");
                localStorage.removeItem("tiPassword");
                
                window.location.href = "http://www.cs-manager.com/"
            }
            else if(status == "javascript")
            {
                localStorage.removeItem("tiUsername");
                localStorage.removeItem("tiPassword");
                
                window.location.href = "http://www.cs-manager.com/"
            }
        }
        else
        {
            var username = localStorage.tiUsername;
            var password = localStorage.tiPassword;
            
            //If we have login data, let's fill the form and trigger the button login click
            if(username !== undefined && password !== undefined)
            {
                $("#login_username").val(username);
                $("#login_password").val(password);

                $("#login-form").find("div#login-buttons").find("button:first-child").trigger("click");
            }
            else
            {
                //We don't have any login data, so let's listen on what user fills manually and save it on localStorage
                $("#login_username").on("blur",function() {
                    localStorage.tiUsername = $("#login_username").val();
                });
                $("#login_username").keypress(function(e) {
                    if(e.which == 13) {
                        localStorage.tiPassword = $("#login_username").val();
                    }
                });
                
                
                $("#login_password").on("blur",function() {
                    localStorage.tiPassword = $("#login_password").val();
                });
                $("#login_password").keypress(function(e) {
                    if(e.which == 13) {
                        localStorage.tiPassword = $("#login_password").val();
                    }
                });
            }
        }
    }
}
else
{
    var url = window.location.pathname;
    if(url.indexOf("/live/2d/play/") >= 0)
    {
    	//2D CSM window
        $('body').css('background-color','#555555');
        $("div.container").css('margin-top','20px');
        
        $("#controls").insertAfter('div.match-view');
        
        $("div.match-view").css('float','left');
        $("#viewPort").insertBefore("#viewPortLayer").parent('div.viewPortContainer').css('padding','0px').css('height',$("#viewPort").height());
        
        if($("#viewPort").width() == 614)
            $("div.match-view").css('margin-left','100px');
        
        //put taticName in TOP
        $("#tacticName").insertBefore($("#viewPort").parent('div.viewPortContainer'));
        $("#tacticName").css('position','relative').css('top','-2px').find('span').css('min-height','25px').css('width',$("#viewPort").width()).css('display','block');
        
        $('<div id="TIplug2D"></div>').insertAfter("div.match-view")
        		.css('border','1px solid #777777')
        		.css('min-height',$("#viewPort").height() + 25)
        		.css('float','right').css('width','265px')
        		.css('position','relative');
        
        $("div.match-score").css('background-color','#555555');
 
        $("div.home-clan.col-md-5").prependTo('#TIplug2D').css('float','right').css('width','250px');
        $("#players-home-clan").insertAfter("div.home-clan.col-md-5").css('float','right').css('width','250px').css('font-size','10px');
        $("div.home-clan.col-md-5").find('div.home-clan-name').css('text-align','left');
        
        $("div.away-clan.col-md-5").insertAfter('#players-home-clan').css('float','right').css('width','250px');
        $("#players-away-clan").insertAfter("div.away-clan.col-md-5").css('float','right').css('width','250px').css('font-size','10px');
        $("div.away-clan.col-md-5").find("div.away-clan-name").insertBefore($("div.away-clan.col-md-5").find("div.away-score"));
        
        $("#controls").find('div.btn-group > a.btn').css('font-size','15px').css('padding','5px');
        $("#control-playback-round > a.btn").css('font-size','15px').css('padding','5px');
        $("#controls").prependTo("#TIplug2D").css('margin','0px');//.css('position','absolute').css('bottom','20px');
        
        $("#controls").css('margin-bottom','16px');
        $("#players-home-clan").css('margin-bottom','10px');
        $("#players-away-clan").css('margin-bottom','0px');
        
        $("div.col-md-2.home-score").insertAfter("#controls").css('float','left').css('text-align','left').css('width','88px').css('color','#dd9545');
        $("#round-timer").insertAfter("div.col-md-2.home-score").css('width','87px').css('float','left').css('text-align','center');
        $("div.col-md-2.away-score").insertAfter("#round-timer").css('width','88px').css('text-align','right').css('color','#4b94dd').css('margin-bottom','10px');
        
        $("#viewPortLayer").remove();
        
        $("#control-playback-speed-fast").trigger("click");
    }
    else
    {
     	//Normal CSM window   
        $("a[href='/?action=logout']").on("click", function() {
            localStorage.removeItem("tiUsername");
            localStorage.removeItem("tiPassword");
        });
        
        CSM.live.open2D = function(gameId, type, publicGame, windowName) {
            // Build target URL
            var target = '/live/2d/info/' + type + '/' + gameId;
            if (publicGame > 0) target += '/' + publicGame;
            
            var popup = window.open(target, windowName);
            if (!popup) {
                alert('Please deactivate your popup blocker for http://www.cs-manager.com in order to watch your game!');
            }
        };
    }
}