// ==UserScript==
// @require       http://stmn.pl/jquery-1.3.2.min.js
// @name          Weewar Extras
// @description   Private messages, maps rating, maps ranking.
// @author        sTmN
// @version       1.2.4
// @namespace     weewarext
// @include       http://weewar.com/*
// ==/UserScript==

var frameless = false;
try {
  frameless = (window === window.top);
} catch(e) {}

/*****************************
 *       (everywhere)
 *    http://weewar.com/*  
 *                   
 *****************************/
var version = 124;
var scriptName='Weewar Extras';
var scriptId='73742';
var updateInterval=3600;

if(GM_getValue('option_wextras', 0)==0) GM_setValue('option_wextras', "ON");
if(GM_getValue('option_updates', 0)==0) GM_setValue('option_updates', "ON");
if(GM_getValue('option_messages', 0)==0) GM_setValue('option_messages', "ON");
if(GM_getValue('option_ranking', 0)==0) GM_setValue('option_ranking', "ON");
if(GM_getValue('option_rating', 0)==0) GM_setValue('option_rating', "ON");
if(GM_getValue('option_games', 0)==0) GM_setValue('option_games', "ON");
if(GM_getValue('option_apikey', 0)==0) GM_setValue('option_apikey', "Enter your API Key here!");

// Add token input
if(getCookie("weewar_token")==false){ addTokenInput(); }

var username = $("span.name").html();
var url = window.location+"";
var splittedurl = url.split("/");
var token = getCookie("weewar_token");

$("li.reg:last").after('<li class="reg" id="wwe_window"><a href="#extras" style="color: #CE90C9;">Extras</a></li>');
$("ul.grid_8:first").css('width',"490px"); $("ul.grid_8:last").css('width',"420px");

// open window
$("#wwe_window").click(function(){
      version = version.toString(); 
      ver = version[0]+"."+version[1]+"."+version[2];     

      var content = '<p style="text-align:right; background: #000; color: #fff; padding: 10px; opacity: 0.7;"><span style="float:left; font-weight:bold;">Weewar Extras</span><span style="cursor:pointer; font-weight:bold;" class="wwe_click_close">[close]</span></p>'
      +'<div style="padding: 10px;"><fieldset style="border:1px solid #ddd; padding: 10px;line-height: 25px;"><legend>Details</legend>'
      +'<p>Current version: <strong>'+ver+'</strong></p>'
      +'<p><a href="http://userscripts.org/scripts/show/'+scriptId+'" style="text-decoration: none;">Script Homepage</a></p>'
      +'<p><a href="#key" id="wwe_change_key" style="text-decoration: none;">Change API Key</a></p></fieldset>'
      +'<br /><fieldset style="border:1px solid #ddd; padding: 10px;line-height: 25px;"><legend>Configuration</legend>'

      +'<span class="wwe_option" id="option_wextras" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_wextras', 0)+'</span> - Weewar Extras<br />'
      +'<span class="wwe_option" id="option_updates" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_updates', 0)+'</span> - Update notifications<br />'
      +'<span class="wwe_option" id="option_messages" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_messages', 0)+'</span> - Private messages<br />'
      +'<span class="wwe_option" id="option_ranking" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_ranking', 0)+'</span> - Maps ranking<br />'
      +'<span class="wwe_option" id="option_rating" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_rating', 0)+'</span> - Maps rating<br />'
      +'<span class="wwe_option" id="option_games" style="padding: 2px 6px; border: 1px solid #ddd; cursor:pointer;">'+GM_getValue('option_games', 0)+'</span> - Show games in profile<br />'  
      /*+'Your API Key: <input type="text" value="'+GM_getValue('option_apikey', 0)+'" id="wwe_apikey" style="background:#F0F0F0;border:1px solid #E0E0E0; padding: 5px;" />'*/      
      +'</fieldset><br /><fieldset style="border:1px solid #ddd; padding: 10px;line-height: 15px;"><legend>Users:</legend>'
      
      +'<span id="wwe_users"></span>'
     
      +'</fieldset></div>';
       
      open_window(content);
      
      GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://stmn.pl/weewar-extras/extras_users.php?action=showusers',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            onload: function(r){ 
                  users=r.responseText;
                  $("#wwe_users").html(users);
                  }             
      }); 
      
      // change key, click event
      $("#wwe_change_key").live("click",function(){ 
            addTokenInput("change");
      });
});

// ON / OFF toggle
$('.wwe_option').live("click",function(){
            if($(this).html()=="ON"){
                  GM_setValue($(this).attr("id"), "OFF"); $(this).html("OFF");
            } else if($(this).html()=="OFF"){
                  GM_setValue($(this).attr("id"), "ON"); $(this).html("ON"); 
            }   
});

function open_window(content){
      if($("#wwe_content").length==0){              
            $("body").append('<div style="color: #444; opacity: 0.9; width: 500px; height: auto; position: fixed; top: 30%; left: 50%; margin: -80px -250px; background: #eee; border: 1px solid #595959;" id="wwe_content">'+content+'</div>');
      }
}

function close_window(){
      $("#wwe_content").remove();
}

// close window, click event
$(".wwe_click_close").live("click", function(){ 
      msgid = $("#msgid").html(); 
      if(msgid) markAsRead(msgid);  
      close_window();
});
 
function addTokenInput(x){ 
      if($("#your_token").length==0){
            if(x=="change") { token = getCookie("weewar_token"); } else { token = "Enter here your API Token"; }
            $("ul.grid_8:last").append('<li style="padding-top: 9px;"><input value="'+token+'" style="background: #eee; border:1px solid #aaa;font-size: 10px; padding: 3px; width:170px;" id="your_token" /><button id="set_Api">OK</button></li>');
      }
}

// after click on 'ok' button
$("#set_Api").live("click",function(){ 
            var newtoken = $("#your_token").val();
            document.cookie="weewar_token="+escape(newtoken)+"; expires=Thu Apr 01 2020 10:00:00 GMT+0200; domain=.weewar.com; path=/"; 
            token = getCookie("weewar_token");
            $(this).remove(); $("#your_token").remove();
            alert("Your token \""+token+"\" has been saved!");
});

// after click on input
$("#your_token").click(function(){ 
      var newtoken = $("#your_token").val();
      var splittedtoken = newtoken.split(" ");
      if(splittedtoken[0]=="Enter"){ $("#your_token").val(""); }
});

/* UNDER CONSTRUCTION
unsafeWindow.over=true;
//$("#ticker").attr("id","tickerr");

TickerEvents();
var over = false;
function TickerEvents()
{
	//$('#eventListInvisContainer > li').appendTo("#bucket");
	//if(!over)			
		//$('#bucket > li:eq(0)').hide().prependTo("#ticker").slideDown(150);
		alert(11);
	$('#ticker > li:eq(5)').slideUp(150);
	$('#ticker > li:eq(6)').remove();
	setTimeout("TickerEvents();", 500);	
}
*/
if(GM_getValue('option_wextras', 0)=="ON"){
      if(splittedurl[3]=="map"){
            if(GM_getValue('option_rating', 0)=="ON"){
            /***************************** 
             *
             *    http://weewar.com/map/*  
             *                   
             *****************************/
            var map_id = url.split("/"); 
            map_id = map_id[4].split("#");
            
            var wwe_map_buttons = '<a href="#rating" class="buttonstyle" id="rate"><span>Rate map</span></a>';
            var wwe_new_content = '<div class="rate" style="display:none; height: 100%; text-align: center; background: #F7F7F7; padding: 10px; margin-bottom: 20px; border: 1px solid #E3E3E3;">'
                  +'<h3 style="color: #666;">Rate:</h3>'
                  +'<img src="http://stmn.pl/weewar-extras/images/misc_57.png" class="rate_icon" id="rate_1" style="cursor: pointer;" />'
                  +'<img src="http://stmn.pl/weewar-extras/images/misc_57.png" class="rate_icon" id="rate_2" style="cursor: pointer;" />'
                  +'<img src="http://stmn.pl/weewar-extras/images/misc_57.png" class="rate_icon" id="rate_3" style="cursor: pointer;" />'
                  +'<img src="http://stmn.pl/weewar-extras/images/misc_57.png" class="rate_icon" id="rate_4" style="cursor: pointer;" />'
                  +'<img src="http://stmn.pl/weewar-extras/images/misc_57.png" class="rate_icon" id="rate_5" style="cursor: pointer;" />'
                  +'</div>';
      
            $("p.mapOptions").append(wwe_map_buttons);
            $("p.mapOptions").after(wwe_new_content);
            
            // Toggle
            $("a.buttonstyle").click(function(){
                  $("."+$(this).attr("id")).toggle();
            });
            
            // star icons mouseover effect
            $("img.rate_icon").mouseover(function(){
                  $(this).attr("src","http://stmn.pl/weewar-extras/images/misc_58.png");
                  var id = $(this).attr("id").split("_");
                  for(var x=1;x<=id[1];x++){
                        $("#rate_"+x).attr("src","http://stmn.pl/weewar-extras/images/misc_58.png");
                  }
            }).mouseout(function(){
                  $("img.rate_icon").each(function(){
                        $(this).attr("src","http://stmn.pl/weewar-extras/images/misc_57.png");
                  });
            });
             
            // add iframes with average and sum of votes
            $("p > span.last").removeClass("last");
            $("p:first").append('<span id="avg">Average: <iframe src="http://stmn.pl/weewar-extras/rating.php?action=average&map='+map_id[0]+'" style="width: 20px; height: 12px; padding:0;margin:0;"></iframe></span><span class=\"last\" id="votes">Votes: <iframe src="http://stmn.pl/weewar-extras/rating.php?action=votes&map='+map_id[0]+'" style="width: 20px; height: 12px; padding:0;margin:0;"></iframe></span>');
            
            // when somebody rate map 
            $("img.rate_icon").click(function(){
                  if(token = getCookie("weewar_token")){
                  var rate = $(this).attr("id").split("_"); // id_{number}
                  $(".rate").html('<iframe src="http://stmn.pl/weewar-extras/rating.php?token='+token+'&username='+username+'&map='+map_id[0]+'&action=rate&rate='+rate[1]+'" style="width: 500px; height: 30px;" frameborder="1" id="ramka"></iframe>');
                  setTimeout(function(){refresh_rate_votes();},2000);
                  }
            });
            
            // refresh iframes after vote      
            function refresh_rate_votes(){ 
                  $("span#avg").html('Average: <iframe src="http://stmn.pl/weewar-extras/rating.php?action=average&map='+map_id[0]+'" style="width: 20px; height: 12px; padding:0;margin:0;"></iframe>');
                  $("span#votes").html('Votes: <iframe src="http://stmn.pl/weewar-extras/rating.php?action=votes&map='+map_id[0]+'" style="width: 20px; height: 12px; padding:0;margin:0;"></iframe>');
            }
      }
} else if(splittedurl[3]=="maps"){
      if(GM_getValue('option_ranking', 0)=="ON"){
            /***************************** 
             *
             *    http://weewar.com/maps/*  
             *                   
             *****************************/
            $("span.tabs").append('<a href="#ranking" id="wwe_ranking">Ranking</a>'); //add button
            
            // click event
            $("a#wwe_ranking").click(function(){ 
                  $(".current").removeClass("current"); 
                  $(this).addClass("current");  
                  $(".grid_16:last").html('<iframe src="http://stmn.pl/weewar-extras/rating.php?action=ranking" style="width: 100%; height: 800px; padding:0;margin:0;"></iframe>');
            });
      }
} else if(splittedurl[3]=="user"){
      /***************************** 
       *
       *    http://weewar.com/user/*  
       *                   
       *****************************/
      var nickname = $("h1 > span").html();
      GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://stmn.pl/weewar-extras/extras_users2.php?action=isheusingit&username='+nickname,
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            onload: function(r){ 
                  result=r.responseText; 
                  if(result==1){
                        if(GM_getValue('option_messages', 0)=="ON"){
                        $("#preferredControls").before("<div id=\"points_block\" class='wwe_send_message' style='cursor:pointer;'><p style='text-align:center;'>Send message</p></div>");
                        }
                        isHeUser = "<span class='online' style='font-size: 9px;'>This player is using Weewar Extras script.</span>";
                  } else {
                        isHeUser = "<span class='offline' style='font-size: 9px;'>This player is not using Weewar Extras. Please tell him about Weewar Extras script!</span>";
                  }    
                  $("h1.user").append('<br />'+isHeUser);
            }
      }); 
      if(GM_getValue('option_games', 0)=="ON"){
            $("#giftButton").after('<ul class="unstyled_list" id="wwe_games"><li style="text-align:center;"><img src="http://stmn.pl/weewar-extras/images/loading.gif" style="width: 70px;" /></li></ul>');
            $(".unstyled_list").css("font-size","0.9em");
            
            GM_xmlhttpRequest({
                  method: 'GET',
                  url: 'http://stmn.pl/weewar-extras/extras_users.php?action=gethimgames&username='+nickname,
                  headers: {'Content-type': 'application/x-www-form-urlencoded'},
                  onload: function(r){ 
                        result=r.responseText; 
                        $("#wwe_games").html(result);
                        $(".unstyled_list > li a").css("text-decoration","none");
                             
                  }
            }); 
      }
      $("#points_block span").css("font-size","11px");
      $(".points_count:last").css("font-size","4.0em").css("text-align","center");
      $("#preferredControls").css("padding","8px").css("font-size","11px");
      $(".challengeLink").removeClass("challengeLink");
      $('.wwe_send_message').hover(function(){
            $(this).css('background','#eee');
      },
      function(){
           $(this).css('background','#E5F0FA');
      });

      // open message windows
      $(".wwe_send_message").live("click",function(){
            sender = false;
            var to = $(".user > span").html();
            var content = '<p style="text-align:right; background: #000; color: #fff; padding: 10px; opacity: 0.7;"><span style="float:left; font-weight:bold;">Message to '+to+':</span><span style="cursor:pointer; font-weight:bold;" class="wwe_click_close">[close]</span></p>'
            +'<div style="padding: 10px; text-align:center;">'
            +'<p><textarea id="wwe_message" style="width: 90%; height: 200px; border:1px solid #595959;"></textarea></p>'
            +'<p><button id="wwe_send_button">Send message</button></p>'
            +'</div>'; 
            open_window(content);
      });



} else if(splittedurl[3]=="headquarters" && splittedurl[4]=="games" &&splittedurl[5]=="open"){
      /***************************** 
       *
       *    http://weewar.com/headquarters/games/open 
       *                   
       *****************************/
       /*
       $("table").before("<div style='margin-bottom: 15px;text-align:right;font-size:11px;'><span class='wwe_button' style='padding: 5px; border: 1px solid #ddd; background: #eee; cursor:pointer;'>ALL</span></div>");
       
       $('.wwe_button').hover(function(){
            $(this).css('text-decoration','underline');
      },function(){
           $(this).css('text-decoration','none');
      });
      
      $('.wwe_button').toggle(function(){
            $(this).css('text-decoration','underline');
      },function(){
           $(this).css('text-decoration','none');
      });*/
       
      /* UNDER CONSTRUCTION
      var img;
      $(".grid_4").remove();
      $(".grid_12").css("width","680px");      
      $("tr").each(function(){
      img = $(this).children("img:hidden").attr("src");
      
      $(this).prepend("<td>test</td>");
      });
      */  
}

if(GM_getValue('option_updates', 0)=="ON"){
/****************
 *
 *  Update Notif
 *
 ****************/ 

	// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime()/1000); // Unix time in seconds

	if(currentTime>(lastCheck + updateInterval)){ //86400 = 24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("version =")+13,text.indexOf("\n",text.indexOf("version ="))-5);
		    		
		    		if(onSiteVersion > version && onSiteVersion > lastVersion) {
            		    	// add dots
                              onSiteVersion = onSiteVersion.toString(); 
                              onSiteVersion = onSiteVersion[0]+"."+onSiteVersion[1]+"."+onSiteVersion[2];
                              version = version.toString(); 
                              ver = version[0]+"."+version[1]+"."+version[2];
  
                              var content = '<p style="text-align:right; background: #000; color: #fff; padding: 10px; opacity: 0.7;"><span style="float:left; font-weight:bold;">Weewar Extras - <blink>New version is available!</blink></span><span style="cursor:pointer; font-weight:bold;" class="wwe_click_close">[close]</span></p>'
                                    +'<div style="padding: 10px;line-height:25px;">'
                                    +'There is an update available for <b>Weewar Extras</b>.<br>'
            			      +'You are currently running version <b>'+ver+'</b> The newest version is <b>'+onSiteVersion+'</b>.'
            			      +'<p style="text-align:center;margin-top: 10px;">'
            			      +'<span id="gm_update_alert_button_upgrade">'
                                    +'<a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js" style="font-size: 1.2em; text-decoration:none; font-weight:bold;" class="wwe_click_close">Install</a>'
                                    +'</span>'
                                    +'</p>'
                                    +'</div>';
      			    	open_window(content);
			    	}
	    		}
		});
	} 
}
/****************
*
*  Message notifier
*
****************/ 
if(frameless){
      function checkForMessages(){
      //console.log("111");  
            if(GM_getValue('option_messages', 0)=="ON"){
                  if(splittedurl[3]!="forum"){
                              if($("#wwe_content").length==0){  
                              //console.log("222");              	
                              		GM_xmlhttpRequest({
                              			method: 'GET',
                              			url: 'http://stmn.pl/weewar-extras/messages.php?token='+token+'&username='+username+'&action=check',
                              			headers: {'Content-type': 'application/x-www-form-urlencoded'},
                              			onload: function(responseDetails) {
                                                //console.log("333"); 
                              				var text = responseDetails.responseText;
                                    			if(text!="logout" && text!="wrong token" && text!=""){ 
                                                            //console.log("444"); 
                                    			      // new message window [heredoc style]
                                    			      text = text.split(";");
                                                            var content = (<![CDATA[
                                                            <p style="text-align:right; background: #000; color: #fff; padding: 10px; opacity: 0.7;"><span style="float:left; font-weight:bold;">Message from <a href="http://weewar.com/user/]]>+text[0]+<![CDATA[" id="wwe_msg_author" style="text-decoration:none;color:#fff;">]]>+text[1]+<![CDATA[</a>:</span><span style="cursor:pointer; font-weight:bold;" class="wwe_click_close">[close]</span></p>
                                                            <div style="padding: 10px;line-height:25px;">
                                                            ]]>+text[2]+<![CDATA[   
                                                            <a id="msgid" style="display:none;">]]>+text[3]+<![CDATA[</a>                     
                                                            <p style="text-align:center;margin-top: 10px;">
                                          			<span id="gm_update_alert_button_upgrade">
                                                            <a href="#reply" style="font-size: 1.2em; text-decoration:none; font-weight:bold;" id="wwe_msg_reply">Reply</a>
                                                            </span>
                                                            </p>
                                                                    			
                                                            </div>
                                                            ]]>).toString();
                                                            
                                    			    	open_window(content);
                                                             	
                                    			} setTimeout(function(){checkForMessages();},15000);  
                              	    		}
                              		});
                              	
                              } else { //console.log("555"); 
                                    setTimeout(function(){checkForMessages();},15000);   }
                              
                          
                  } 
            }
      }

}

if($("#wwe_content").length==0){ //console.log("000"); 
checkForMessages(); }

function markAsRead(id){
      GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://stmn.pl/weewar-extras/messages.php',
            data: 'action=mark&token='+token+'&username='+username+'&id='+id,
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            onload: function(){}
      }); 	
}

$("#wwe_send_button").live("click",function(){
var message = $("#wwe_message").val();
if(message.length>4){
      if(sender==false){
            var to = $(".user > span").html();
      } else {
            var to = sender;
      }
      GM_xmlhttpRequest({
      			method: 'POST',
      			url: 'http://stmn.pl/weewar-extras/messages.php',
      			data: 'action=send&token='+token+'&from='+username+'&to='+to+'&message='+message,
      			headers: {'Content-type': 'application/x-www-form-urlencoded'},
      			onload: function(){alert("Message delivered successfully.");}
      		});
      close_window();
} else {
      alert("Minimum 5 letters needed!");
}
});

// reply
var sender=false;
$("#wwe_msg_reply").live("click",function(){
            sender = $("#wwe_msg_author").html();
            msgid = $("#msgid").html(); 
            if(msgid) markAsRead(msgid);  
            $("#wwe_content").remove();
            close_window();
            // [heredoc style]
            var content = (<![CDATA[
            <p style="text-align:right; background: #000; color: #fff; padding: 10px; opacity: 0.7;"><span style="float:left; font-weight:bold;">Message to ]]>+sender+<![CDATA[:</span><span style="cursor:pointer; font-weight:bold;" class="wwe_window_close">[close]</span></p>
            <div style="padding: 10px; text-align:center;">
            <p><textarea id="wwe_message" style='width: 90%; height: 200px; border:1px solid #595959;'></textarea></p>
            <p><button id="wwe_send_button">Send message</button></p>
            </div>]]>).toString(); 
            open_window(content);
});

// save my users
if(frameless){
      var lastCheckImusingit = GM_getValue('lastCheckImusingit', 0);
      var d = new Date();
      var currentTime = Math.round(d.getTime() / 1000);
      if(currentTime>(lastCheckImusingit+86400)){
            GM_xmlhttpRequest({
            			method: 'GET',
            			url: 'http://stmn.pl/weewar-extras/extras_users.php',
            			data: 'token='+token+'&username='+username+'&action=imusingit',
            			headers: {'Content-type': 'application/x-www-form-urlencoded'},
            			onload: function(){}
            });
      }
}    

}

// Get cookie
function getCookie(name) { 
	if (document.cookie!="") { 
	var toCookie=document.cookie.split("; ");  
		for(i=0; i<toCookie.length; i++){ 
			var nameCookie=toCookie[i].split("=")[0];
			var valueCookie=toCookie[i].split("=")[1];
			if (nameCookie==name) return unescape(valueCookie);
		}
	}
	return false; // if not find
}