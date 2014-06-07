// ==UserScript==
// @name        Galactica_Allyance_ChatPortal
// @namespace   LordAdam
// @description Galactica SoA Allyance Chat and Portal
// @include	http*://*.galacticax.com/universe/*
// @version     13
// @grant       none
// ==/UserScript==

//--------------------------------Variables-config------------------------------//
//chat url http://adam.ultimatestudio.eu  -- /chat/index.php
var c_home ='http://adam.ultimatestudio.eu';
//portal url
var p_home = 'http://adam.ultimatestudio.eu/gal/galactica/login?id=';
//------------------------------------------------------------------------------//

//Iframe Auto Height
function ScrollPx() {
        var doc = document.documentElement,
                body = document.body,
                documentHeight = Math.max(body.scrollHeight, body.offsetHeight, doc.clientHeight, doc.scrollHeight, doc.offsetHeight);
        return documentHeight - (window.innerHeight + (doc && doc.scrollTop || body && body.scrollTop  || 0));
}
$( window ).scroll(function() {
    if(ScrollPx() <= 40 && $("#LA_ifrm".length)) $('#LA_ifrm').height($('#LA_ifrm').height()+240);
});
//gal6 session
var galId=window.btoa(unescape(encodeURIComponent($.cookie("GAL6SESSION"))));

//load script
var js = [];
js[0] = 'function portal(url){var ifrm = document.createElement("IFRAME");ifrm.id = "LA_ifrm";ifrm.setAttribute("name", "LA_ifrm");ifrm.setAttribute("src", url);ifrm.setAttribute("scrolling", "no");ifrm.setAttribute("frameborder", "0");ifrm.setAttribute("ALLOWTRANSPARENCY", "true");ifrm.style.width = "959px";ifrm.style.height = "1000px";var div = document.createElement("div");div.className = "panel";div.innerHTML = "<h2>Galactica Allyance Portal</h2>";div.appendChild(ifrm);$("#contents").html(div);ChatLoad();}';
js[1] = 'var status = 0;function ChatVisible(){var obj = document.getElementById ("cifrm");if(status == 0){obj.style.height="270px";status = 1;}else{obj.style.height="";status = 0;}}';
js[2] = 'function ChatStatus(){if($.cookie("ChatDiv")){$("#cchat").remove();$.cookie("ChatDiv", null);}else{$.cookie("ChatDiv","#contents");ChatLoad();}}';
js[3] = 'function ChatTo(){if($.cookie("ChatDiv") == "#top")$.cookie("ChatDiv", "#contents");else $.cookie("ChatDiv", "#top");ChatLoad();}';
js[4] = 'function ChatLoad(){if($.cookie("ChatDiv")){$("#cchat").remove();var chatDiv=document.createElement("div");chatDiv.setAttribute("style","position:relative;margin:0px;padding:0px;width:650px;");chatDiv.id="cchat";chatDiv.className = "panel";chatDiv.innerHTML = \'<h2><a title="Open chat window" href="'+c_home+'/chat/blab.php" rel="popup" onclick="window.open(this.href, \"glossarypopup\", \"width=600,height=300,scrollbars,resizable\"); return false;">Chat Window</a> || <a href="#" onclick="ChatTo()">Chat Position</a></h2>\';var chatFrame=document.createElement("IFRAME");chatFrame.id="cifrm";chatFrame.setAttribute("src","'+c_home+'/chat/blab.php?usrname='+galId+'");chatFrame.setAttribute("scrolling","no");chatFrame.setAttribute("frameborder","0");chatFrame.setAttribute("style","width:100%;height:0px;border:0px;");chatDiv.appendChild(chatFrame);if($.cookie("ChatDiv")=="#top"){$("#top").append(chatDiv);$("#cchat").hover(function(){$("#cifrm").css("height","270px");},function(){$("#cifrm").css("height","0px");});}else{chatDiv.setAttribute("style","margin-top:15px;width:959px;");chatFrame.style.height="260px";$("#contents").prepend(chatDiv);}}}';
for (key in js) {
    var link  = document.createElement('script');
    link.type = 'text/javascript';
    link.text = js[key];
    document.getElementsByTagName('head')[0].appendChild(link);
}
        
//Ally menu
//$( "#menu-main li ul" ).eq(4).prepend( '<li><a href="#" style="color:red" onclick="portal(\''+p_home + galId+'\');">Portal</a></li> <li><a href="#" style="color:red" onclick="ChatStatus()">Chat (On/Off)</a></li>' );
$('<div />', {
     style:       'position:absolute;top:127px;left:310px;',
     innerHTML:   '<a style="padding-right:6px;" class="button width45" onclick="portal(\''+p_home + galId+'&page=planlist\');" href="#"><span class="lft"></span><span class="txt">Planets</span><span class="rgt"></span></a>'+
                  '<a style="padding-right:6px;" class="button width45" onclick="portal(\''+p_home + galId+'&page=allapotmenu\');" href="#"><span class="lft"></span><span class="txt">Állapot</span><span class="rgt"></span></a>'+
                  '<a style="padding-right:6px;" class="button width100" onclick="ChatStatus();" href="#"><span class="lft"></span><span class="txt">Chat(on/off)</span><span class="rgt"></span></a>',
}).appendTo('#top');

//Chat
function ChatLoad() {
    if($.cookie("ChatDiv"))
    {
        $("#cchat").remove();
        var chatDiv = document.createElement("div");
        chatDiv.setAttribute("style", "position:relative;margin:0px;padding:0px;width:650px;");
        chatDiv.id="cchat";
        chatDiv.className = "panel";
        chatDiv.innerHTML = '<h2><a title="Open chat window" href="'+c_home+'/chat/blab.php" onclick="window.open(this.href, \'glossarypopup\', \'width=600,height=300,scrollbars,resizable\'); return false;">Chat Window</a> || <a href="#" onclick="ChatTo()">Chat Position</a></h2>';

        var chatFrame = document.createElement("IFRAME");
        chatFrame.id="cifrm";
        chatFrame.setAttribute("src", c_home+"/chat/blab.php?usrname="+galId);
        chatFrame.setAttribute("scrolling","no");
        chatFrame.setAttribute("frameborder","0");
		chatFrame.setAttribute("style","width:100%; height:0px; border:0px;");

        chatDiv.appendChild(chatFrame);
        
        if($.cookie("ChatDiv")=="#top")
        {
            $("#top").append(chatDiv);
            $("#cchat").hover(
                function(){$("#cifrm").css("height","270px");},
			    function(){$("#cifrm").css("height","0px");
            });
        }
        else
        {
            chatDiv.setAttribute("style","margin-top:15px;width:959px;");
            chatFrame.style.height="260px";
            $("#contents").prepend(chatDiv);
        }


    }
}
ChatLoad();

//Auto Fleet Update
if($.cookie("FleetChange")) {
    $('<iframe />', {
        name:     'FleetPortal',
        id:       'FleetPortal',
        src:       p_home + galId,
    }).appendTo('#container').hide();
    $.cookie("FleetChange", null);
}
$("#fleet_controll .button_small").click( function() { $.cookie("FleetChange", "true"); } );

//Auto Portal login
if(!$.cookie($.cookie("GAL6SESSION"))) {
    $('<iframe />', {
        name:     'FleetPortal',
        id:       'FleetPortal',
        src:       p_home + galId,
    }).appendTo('#container').hide();
    $.cookie($.cookie("GAL6SESSION"), "true");
}