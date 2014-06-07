// ==UserScript==
// @name            test
// @namespace       Helios (Modified by HuRRR)
// @description     Allows you to send PMs in an easy and fast way. Also Included Multi-PM for upgraded Members
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *discussionzone.net/*
// @version         1.0
// ==/UserScript==

var color = "gold"; //Change color to your liking // Some nice colors: "lime", "lightgreen", "#00c8ff"

var popUpPM_body = '<div class="thead" stylde="-moz-border-radius:7px;-webkit-border-radius:7px;-khtml-border-radius:7px;border-radius:7px;"><strong>Compose a Private Message</strong></div>';
popUpPM_body += '<form id="PM_form" onsubmit="return false;"><input type="hidden" name="my_post_key" id="PM_postkey" value=""><textarea name="bcc" id="bcc" rows="2" cols="38" tabindex="1" style="display:none;"></textarea><table style="miargin-top:5px;" class="tborder"><tbody><tr><td valign="top" class="trow1">Recipients:</td><td class="trow1"><textarea id="PM_rec" name="to" rows="2" cols="29" tabindex="1" autocomplete="off"></textarea></td></tr><tr><td valign="top" class="trow1">Subject:</td><td class="trow1"><input type="text" name="subject" class="textbox" id="PM_sub" size="32" maxlength="85" style="height:18px;width:222px;" value="" tabindex="3"></td></tr>';
popUpPM_body += '<tr><td valign="top" class="trow2">Message:</td><td valign="top" class="trow2"><textarea id="PM_mess" name="message" rows="8" cols="29" tabindex="4"></textarea></td></tr>';
popUpPM_body += '<tr><td valign="top" class="trow2">Options:</td><td valign="top" class="trow2" style="text-align:left;"><label><input type="checkbox" class="checkbox" name="options[signature]" value="1" tabindex="5" checked="checked">Include signature.</label><br> <label><input type="checkbox" class="checkbox" name="options[disablesmilies]" value="1" tabindex="6">Disable Smilies</label><br> <label><input type="checkbox" class="checkbox" name="options[savecopy]" value="1" tabindex="7" checked="checked">Save a Copy</label><br> <label><input type="checkbox" class="checkbox" name="options[readreceipt]" value="1" tabindex="8">Request Read Receipt</label><br> </span></td></tr></tbody></table></tbody></table><input type="hidden" name="action" value="do_send" /> <input type="hidden" name="pmid" value="" /> <input type="hidden" name="do" value="" /> </form>';
popUpPM_body += '<div style="text-align:center;padding-top:13px;"><input type="submit" class="button" id="PM_submit" value="Send Message" tabindex="9" accesskey="s"> or <a style="cursor:pointer" id="PM_cancel">[Cancel]</a></div>';
var popUpPM_style = "position:absolute;width:320px;height:395px;display:none;background:#333333;box-shadow: 2px 2px 20px 0px black;-moz-border-radius:7px;-webkit-border-radius:7px;-khtml-border-radius:7px;border-radius:7px;";
var popUpPM = '<div id="popUpPM" style="' + popUpPM_style + '">' + popUpPM_body + '</div>';

var multiPM = '<div id="multiPM" class="thead" style="-moz-border-radius:7px;-webkit-border-radius:7px;-khtml-border-radius:7px;border-radius:7px;padding:5px;position:fixed;bottom:-52px;right:10px;font-size:12px;"><button id="multiPM_click" style="cursor:pointer;">Multi PM</button><br><a id="multiPM_cancel" style="cursor:pointer;">[cancel]</a></div>';


$(document.body).append(popUpPM + multiPM);

if(jQuery.browser.mozilla){
    $("#PM_rec").attr("rows", 1);
    $("#popUpPM").css("width", 325);
    $("#PM_sub").css("height", 18);
	$("#PM_sub").css("width", 233);
}

$('div[class*="author smalltext"]').append(' <a class="PM_script" style="cursor:pointer;color:' + color + ';">[PM]</a>');
$('span[class*="largetext"]').after(' <a class="PM_script" style="cursor:pointer;color:' + color + ';font-size:12px;">[PM]</a>');
$('span[class*="largetext"]').each( function(index){
    var c = index++;
    var auth = $('span[class*="largetext"]:eq(' + c + ')').text();
    var ht = '<a author="' + auth + '" class="bitButton MultiPM" style="cursor:pointer;" title="Multi PM">Multi PM</a>';
    $('div[class*="author_buttons float_left"]:eq(' + c + ')').append(ht);
});

$(".PM_script").click( function(e){
    var user = $(this).prev().text();
    $("#PM_rec").val(user);
    $("#PM_sub").val("");
    $("#PM_mess").val("");
    $("#popUpPM").hide();
    $("#popUpPM").css({
        "top" : e.pageY,
        "left" : e.pageX
    });
    $("#popUpPM").show("fast");
});

$("#PM_submit").click( function(){
    $("#PM_submit").val("Sending...");
    $.get("/private.php?action=send", function(data){
        var subid = $(data).find('input[type*="hidden"]').attr("value");
        if(subid.length > 30){
            $("#PM_postkey").val(subid);
            $.post("/private.php", $("#PM_form").serialize()).done(function(data){
                if($(data).find('div[class*="error"]').html())
                    alert($(data).find('div[class*="error"]').text());
                else
                    $("#popUpPM").hide("fast");
                $("#PM_submit").val("Send Message");
            });
        }
    });
});

$("#PM_cancel").click( function(){
    $("#popUpPM").hide("fast");
});

$(".MultiPM").click( function(){
    if($(this).attr("style").indexOf("gray") == -1)
        $(this).css("background","gray");
    else
        $(this).css("background","#531F3E");
    
    
    var count = 0; //Fix for firefox
    $('a[class*="bitButton MultiPM"][style*="background-color: gray;"]').each( function(){
        count++;
    });
    if(count > 1)
        $("#multiPM").animate({"bottom" : "0px"}, "slow");
    else
        $("#multiPM").animate({"bottom" : "-52px"}, "slow");
});

$("#multiPM_click").click(function(e){
    $('a[class*="bitButton MultiPM"][style*="background-color: gray;"]').each(function(index){
        if(index == 0)
            $("#PM_rec").val($(this).attr("author"));
        else
            $("#PM_rec").val($("#PM_rec").val() + "," + $(this).attr("author"));
        $("#popUpPM").css({
            "top" : e.pageY - 395,
            "left" : e.pageX - 320
        });
        $("#popUpPM").show("fast");
    });
});

$("#multiPM_cancel").click(function(){
    $("#multiPM").animate({"bottom" : "-52px"}, "slow");
    $('a[class*="bitButton MultiPM"][style*="background-color: gray;"]').each(function(){
        $(this).css("background","#531F3E");
    });
});