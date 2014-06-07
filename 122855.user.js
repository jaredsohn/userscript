scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           SeekingArrangement Magic
// @description    Enhances www.seekingarrangement.com in the following ways:  It adds a "preview mail" button to the mail inbox results.  It adds a "Preview Profile" button to virtually all pages where profiles are listed, allowing you to read the profile without having to open the full profile page.  It adds a "get mail history" button to the profile page. It fixes skewing and distortion issues with images in search results and in the profile image tool.  When viewing profiles, it displays all pictures automatically.  When participating in the blog, it adds useful profile preview functions, a profile lookup tool, a button to check for new comments, and support for the blockquote tag.
// @version        1.11
// @namespace      http://www.seekingarrangement.com
// @include        http://www.seekingarrangement.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
]]></>.toString(); // Make sure to copy this line right below

//fix distorted pictures in search results and inbox
//if (window.location.href.indexOf("result.php") != -1) {    --you could use this syntax to filter for specific pages
//must wait for all images to finish loading
$(window).load(function () {
    $("div.img_holder img").each(fixdistortedimage);
});
//}

//mail inbox customization
if (window.location.href.indexOf("inbox.php") != -1 || window.location.href.indexOf("outbox.php") != -1) {
    appendCSS();

    //add "preview profile" button under profile link
    $('table.mailbox-item .mailbox-item-body div.img_holder a[href^="detail.php?id="]').each(function () {
        var href = $(this).attr("href");
        var iLen = href.length;
        var profileid = href.substring(iLen, href.indexOf("detail.php?id=") + 14);
        var $targetcell = $(this).closest("tr").children().eq(2);
        $targetcell.append("<hr/><a class='previewprofilebutton' style='color:green' pid='" + profileid + "' href='javascript: void(0);'>profile</a>");
        $(".previewprofilebutton", $targetcell).click(function () {
            $("#profilepreview, #mailpreview, #msgprof, #mailhistoryparent").remove();
            var profileid = $(this).attr("pid");
            showprofile(profileid);
        })
    });

    //add the following preview buttons under the link to read the message:
    //  *preview message
    //  *preview message and profile (side by side)
    //  *mail history
    $('table.mailbox-item .mailbox-item-body .mailbox-subject a[href*="readmessage.php?id="]').each(function () {
        var href = $(this).attr("href");
        var str="<hr/><a class='btnpreviewmessage' style='color:green' url='" + href + "' href='javascript: void(0);'>message</a>";
        
        var profilehref = $('div.img_holder a[href^="detail.php?id="]',$(this).closest("tr")).attr("href");
        if (profilehref){
            var iLen = profilehref.length;
            var profileid = profilehref.substring(iLen, profilehref.indexOf("detail.php?id=") + 14);
            str += "<br/><a class='btnpreviewmsgprof' style='color:green' url='" + href + "' profileid='" + profileid + "' href='javascript: void(0);'>message and profile</a><br/><a class='btnmailhistory' style='color:green' profileid='" + profileid + "' href='javascript: void(0);'>message history</a>"
        }
        $(this).after(str);
    });

    //add click events for buttons
    $("a.btnpreviewmessage").click(function () {
        $("#profilepreview, #mailpreview, #msgprof, #mailhistoryparent").remove();
        var url = $(this).attr("url");
        if ($("#mailpreview").length == 0) {
            $("body").append("<div id='mailpreview' style='display:none; z-index:10000; position:fixed; top:20px; bottom:20px; left:20%; right:20%; border-color:black; border-width:2px; border-style:solid; border-radius:10px; padding:10px; background-color:white; text-align:left; overflow:auto;'/>")
//            $("#mailpreview").click(function () { $(this).fadeOut(); })
        }
        var $msgpanel = $("#mailpreview");
            $msgpanel.html("<em>loading message...</em>");
            $msgpanel.slideDown(function(){
            $msgpanel.load(url + " .detail", 
                function(){
                    formatmsgpanel($msgpanel);
                });
        });
    });

    $("a.btnpreviewmsgprof").click(function () {
        var url = $(this).attr("url");
        var profileid=$(this).attr("profileid");
        $("#msgprof, #profilepreview, #mailpreview, #mailhistoryparent").remove();
        if ($("#msgprof").length == 0) {
            $("body").append("<div id='msgprof' style='display:none; position:fixed;left:20px; right:20px; top:10px; bottom:10px;   border-color:black; border-width:2px; border-style:solid; border-radius:10px; background-color:white; text-align:left; z-index:10000; '><div id='profilepreview' style='position:absolute; width:50%; margin:5px; overflow:auto; top:5px; bottom:5px; border-right:black solid 1px'><div id='profilepreviewcontent' /></div><div id='mailpreview' style='position:absolute;margin:5px; top:5px; right:5px; bottom:5px; left:55%; border-style-left:dotted; border-color-left:black; border-width-left:2px; overflow:auto; font-weight:normal; font-size:12px'/></div>")
            $("#msgprof").click(function () { $(this).fadeOut(); });
        }
        var $profpanel=$("#profilepreviewcontent");
        $profpanel.html("<em>loading profile #" + profileid + "</em>");
        var $msgpanel = $("#mailpreview");
        $msgpanel.html("<em>loading message...</em>");
        $("#msgprof").slideDown(function(){
            $msgpanel.load(url + " .detail", 
                function(){
                    formatmsgpanel($msgpanel);
                });
            showprofile(profileid);
        });
    });
    $("a.btnmailhistory").click(function () {
        $("#profilepreview, #mailpreview, #msgprof, #mailhistoryparent").remove();
        showmailhistory($(this).attr("profileid"));
    });
}

//customize mail message page
if (window.location.href.indexOf("readmessage.php") != -1) {
    appendCSS();
    //add view profile button next to profile link
    $('a[href^="detail.php?id="]').each(function () {
        var href = $(this).attr("href");
        var iLen = href.length;
        var profileid = href.substring(iLen, href.indexOf("detail.php?id=") + 14);
        var $targetcell = $(this).parent();
        $targetcell.append(" | <a class='previewprofilebutton' style='color:green' pid='" + profileid + "' href='javascript: void(0);'>view profile</a>");
        $(".previewprofilebutton", $targetcell).click(function () {
            var profileid = $(this).attr("pid");
            showprofile(profileid);
        })
    });
}
//customize search results pages
if (window.location.href.indexOf("result.php") != -1 ||
    window.location.href.indexOf("addedme.php") != -1 ||
    window.location.href.indexOf("viewedme.php") != -1 ||
    window.location.href.indexOf("favorites.php") != -1) {
    appendCSS();
    //add preview profile button next to profile link
    $('ul.result-list .result-name a[href^="detail.php?id="]').each(function () {
        var href = $(this).attr("href");
        var iLen = href.length;
        var profileid = href.substring(iLen, href.indexOf("detail.php?id=") + 14);
        $(this).before("<a class='previewprofilebutton' style='color:green' pid='" + profileid + "' href='javascript: void(0);'>view</a>&nbsp;");

    });
    $("a.previewprofilebutton").click(function () {
            var profileid = $(this).attr("pid");
            showprofile(profileid);
        });
}


//customize profile page
if (window.location.href.indexOf("detail.php") != -1) {
    appendCSS();
    //show all pictures
    //first picture displays above profile, all others display below profile
    $(".darkbox:first").each(
        function(){
            $(".section").prepend('<img src="' +
            $(this).attr("href") + '"/>');
        });
    $(".darkbox:gt(0)").each(function () {
        $(".section").append('<img src="' +
        $(this).attr("href") + '"/>');
    });
    //fix distorted images in darkbox
    $(".darkbox img").each(fixdistortedimage)

    //add mail history button
    var profileid = getParameterByName("id");
    $("div.section h3:first").after("<a href='javascript: void(0);' id='btnmailhistory' style='color:green; font-weight:bold'>view mail history</a><br/>");
    $("#btnmailhistory").click(function () {showmailhistory(profileid)});
}


//modifications to the blog
if (window.location.pathname.indexOf("blog") != -1) {
    //add a "check for new comments" button
    appendCSS();
    var $ol = $("#comments ol.commentlist");
//    $("li:last", $ol).remove();  //removes last comment, useful for testing
    $ol.append("<li ><div style='float:right; border-style:dotted; border-width:1px; width:270px; text-align:center' ><span style='color: #CE0709; font-weight:700'>Profile Number:</span> <input type='text' id='txtprofilelookupid' style='border-color:navy; border-style:inset; margin-top:2px'/><br/><input type='button' id='btnprofilelookupsearch' value='Search for Profile' class='input-submit' /><br/>Works for both SBs and SDs!</div><input id='btnRefreshComments' type='button' value='check for new comments' class='input-submit'><div id='checkrecentcomments' style='width:50%; border-style:dotted; border-color:black; border-width:1px; padding:2px; background-color:#ffffee'></div></li>");
    $("#btnprofilelookupsearch").click(function () { showprofile($("#txtprofilelookupid").val()); })
    $("body").append("<div id='hiddendivforcomments' style='display:none' />");
    var $checkrecentcomments=$("#checkrecentcomments");
    var $btnRefreshComments = $("body").find("#btnRefreshComments");
     loadrecentcommentsallblogs($("li.recentcomments"), $checkrecentcomments);
    $btnRefreshComments.click(function () {
        $btnRefreshComments.attr("value", "checking...");
        var $hiddendiv=$("#hiddendivforcomments");
        $hiddendiv.load(document.URL + " div.website-container",
            function () {
                var $newcommentlist=$("#comments ol.commentlist", $hiddendiv);
                var currentcommentlength = $ol.children().length - 1;
                var newcommentlength = $newcommentlist.children().length
                var newcomments = newcommentlength - currentcommentlength;
                if (newcomments > 0) {
                    $("li:last", $ol).before($("li", $newcommentlist).slice(-newcomments));
                    $("div.author-name", $ol).slice(-newcomments).each(formatvcard);
                }
                loadrecentcommentsallblogs($("li.recentcomments", $hiddendiv), $checkrecentcomments);
                $btnRefreshComments.attr("value", "check for new comments");
            });
    });
    $("#comments div.author-name").each(formatvcard);
}

function loadrecentcommentsallblogs($licollection, $checkrecentcomments){
                $checkrecentcomments.html("<div style='background-color:black; color:white; font-weight:bold; text-align:center; padding:2px'>Most recent comments across all blogs</div>");
                $licollection.each(
                    function(){
                        $checkrecentcomments.append('<div style="border-bottom: dotted black 1px; padding:4px; font-size:10px; font-style:italic">' + $(this).html() + '</div>');
                    })
}

function formatvcard() {
    var profileid = 0;
    if ($("a", this).length > 0) {

        var href = $("a", this).attr("href");
        if (href.indexOf("seekingarrangement.com") != -1 && href.indexOf("detail.php?id=") != -1) {
            var iLen = href.length;
            profileid = href.substring(iLen, href.indexOf("detail.php?id=") + 14);
            $(this).attr("pid", profileid);
            $(this).append(" &nbsp;").append("<a style='color:blue' pid='" + profileid + "' href='javascript: void(0);'>#" + profileid + "</a>")
            .click(function () {
                var profileid = $(this).attr("pid");
                showprofile(profileid);
            }
            );

        }
        else {
            $(this).append("&nbsp;<a style='color:blue' href='" + href + "'>" + String(href).replace("http://", "").replace("https://", "") + "</a>")
        }
    }

    //fixes the following scenario:
    //if the person accidentally misses the "/" in their </blockquote> tag, creating a new nested blockquote instead of closing the original
    $("blockquote blockquote", $(this).parent().parent()).each(function () {
        $(this).closest("div.comment-body").append($(this).html());
        $(this).html("");
    })

    //add citation as footer
    $("blockquote[cite]", $(this).parent().parent()).each(function () {
        $("p:last", this).append("<span class='quoteauthor'> ~ " + $(this).attr("cite") + "</span>");
    })
}

//functions used on multiple pages
function appendCSS() {
    $("head").append("<style type='text/css'>#profilepreview .orange {background-color:#FF9933} #profilepreview .blue {background-color: #CEEBF7} #profilepreview  .diamond {background-color: #828282} #profilepreview .aside.left{width:100%; float:none} #profilepreview  .section {font-weight: normal; line-height: 1.3em; background-color:white; text-align:left}   #profilepreview .module:after {clear: both; display: block; height: 0; visibility: hidden;} #profilepreview .detail .module { margin: 0 0 10px; } #profilepreview .unit {float: left; position: relative;} #profilepreview .size1of3 {width: 33.3333%;} #profilepreview .unit-last {float: none; overflow: hidden; width: auto;} #profilepreview .size2of3 {width: 66.6667%;} #profilepreview h3 {color: #990000; font: 700 14px Arial,Helvetica,sans-serif; padding: 5px 0;} #comments div.comment-body > blockquote {  font-style:italic; font-size:12px;  padding: 0px;  background-color: #eeffee;  border-top: 1px dotted black;  border-bottom: 1px dotted black;  margin: 0px; margin-left:12px; padding-left:10px; quotes: '\\201C' '\\201D';} #comments div.comment-body > blockquote:before { content: open-quote; display: block; height: 0; margin-left: -.95em; font: italic 400%/1 Cochin,Georgia,'Times New Roman',serif; color: #999;} #comments div.comment-body > blockquote span.quoteauthor, #comments div.comment-body > blockquote cite{font-style:italic;  padding-left:5px; font-weight:bold; color:#333333} #comments div.comment-body > blockquote > p {margin:0px} #mailpreview .section {font-weight: normal; line-height: 1.3em;} #checkrecentcomments a{color:blue} #profilepreview .ph_container{width:408px; margin-left:auto; margin-right:auto}</style>");
}


function fixdistortedimage() {
    var origheight = $(this).height();
    var origwidth = $(this).width();
    var targetaspectratio = origheight / origwidth;
    $(this).removeAttr("width");
    $(this).removeAttr("height");
    var imgWidth = $(this).width();
    var imgHeight = $(this).height();
    var actualaspectratio = imgHeight / imgWidth;
    if (actualaspectratio >= targetaspectratio) {
        //image is too tall
        $(this).attr("height", origheight);
    }
    else {
        //image is too wide
        $(this).attr("width", origwidth);
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function showprofile(profileid) {
    if ($("#profilepreview").length == 0) {
        $("body").append("<div id='profilepreview' style='z-index:10000; position:fixed; left:20%; right:20%; top:10px; bottom:10px; max-width:800px;  overflow:auto; background: none repeat scroll 0 0 #FEFEFE; border: 2px solid black;border-radius: 10px 10px 10px 10px; padding:10px; display:none '><input id='profilepreviewclose' type='button' value='close profile' style='width:100%'/><div id='profilepreviewstatus'>Loading profile: " + profileid + "</div><div id='profilepreviewcontent' style='display:none'/></div>");
    }
        var $profilepreview = $("#profilepreview");
    $("#profilepreviewclose").click(
        function () {
            $profilepreviewcontent.html(""); 
            $profilepreview.fadeOut();
        });
    var $profilepreviewcontent = $("#profilepreviewcontent");
    var $profilepreviewstatus = $("#profilepreviewstatus");
    $profilepreviewcontent.hide().html("");
    $profilepreviewstatus.html("Loading profile #" + profileid + "...");
    $profilepreview.slideDown(
        function(){
            $profilepreviewcontent.load("http://www.seekingarrangement.com/member/detail.php?id=" + profileid + " div.all_contained", function () {
 
                if ($profilepreviewcontent.text().indexOf("Login Failed") != -1) { 
                    $profilepreviewcontent.html("<h3>You are not logged into your account</h3><hr/>You must be logged into your SeekingArrangement.com account in order to preview profiles.<br/><br/>Please log in using <a href='./login.php' target='_blank'>this link</a>, and try again."); 
                }
                else if ($profilepreviewcontent.text().indexOf("Profile Not Available") != -1) {
                    $profilepreviewcontent.load("http://www.seekingarrangement.com/member/samedetail.php?id=" + profileid + " div.all_contained", function () {
                        formatprofilepreviewpane($profilepreview, profileid);
                    });
                }
                else {
                    //initial load was good
                    formatprofilepreviewpane($profilepreview, profileid);
                }
            });
        });

}
function formatprofilepreviewpane($profilepreview, profileid){

        var $profilepreviewcontent=$("#profilepreviewcontent");
        $profilepreviewcontent.html($("div.all_contained", $profilepreviewcontent).html());
        $profilepreviewcontent.prepend("<div id='profilepreviewtop' style='width:100%'><div id='profilepreviewtopimage' style='width:100%; text-align:center;'/><div id='profilepreviewbuttonrow' style='width:100%; text-align:right'/></div>");
        var $profilepreviewtop=$("#profilepreviewtop",$profilepreviewcontent);
        $("div.detail .aside.left", $profilepreviewcontent).hide();
        var $section=$(".section", $profilepreviewcontent)
        $section.css("overflow","visible");

        var $divdetail=$("div.detail", $profilepreviewcontent);
        $divdetail.removeClass("detail");
        var color = $divdetail.attr("class");
        $profilepreviewtop.addClass(color);

        //process buttons
        var $buttons=$('div.right form, div.right a', $profilepreviewcontent);
        var buttoncount=$buttons.length;
        $profilepreview.css("min-width",(buttoncount*50)+20);

        $('div.right form', $profilepreviewcontent).css("float","left");
        $("img, input",$buttons).height(50).width(50);

        $buttons.appendTo($("#profilepreviewbuttonrow"));
        $('#profilepreviewbuttonrow a > img[src*="close"]').unwrap().click(
            function(){ 
                $profilepreviewcontent.html("");
                $profilepreview.fadeOut();
            });
         $("div.right", $profilepreviewcontent).hide();
        //process images
        $(".darkbox:first > img", $profilepreviewcontent).each(
            function(){
            
                var imghref = $(this).parent().attr("href");
                var photoid;
                if (imghref.indexOf("watermark.php") != -1) {
                    photoid = imghref.substring(imghref.length, imghref.indexOf("?id=") + 4);
                }
                else if (imghref.indexOf("photos/thumbs/") != -1) {
                    photoid = imghref.substring(imghref.length, imghref.indexOf("/thumbs/") + 8).replace(".jpg", "");
                }
                var newhref = "http://www.seekingarrangement.com/member/watermark.php?id=" + photoid;
                $(this).attr("src", newhref);
                $(this).attr("width", "");
                $(this).attr("height", "");
                $(this).appendTo("#profilepreviewtopimage");
            });
        if($("#profilepreview .ph_container")){
            $("#profilepreview .ph_container").appendTo("#profilepreviewtopimage");
        }
        var $remainingimages=$(".darkbox img", $profilepreviewcontent);
        if($remainingimages.length>0){
            //add the "there are more images below" label
            $("#profilepreviewtopimage").append("<div style='background-color:white; padding:3px; margin:5px; margin-top:1px; border-color:black; border-width:1px; border-style:dotted;'>" + $remainingimages.length + " more image" + (($remainingimages.length>1)?'s':'') + " below...</div>");
            $remainingimages.each(
                function () {
                    var imghref = $(this).parent().attr("href");
                    var photoid;
                    if (imghref.indexOf("watermark.php") != -1) {
                        photoid = imghref.substring(imghref.length, imghref.indexOf("?id=") + 4);
                    }
                    else if (imghref.indexOf("photos/thumbs/") != -1) {
                        photoid = imghref.substring(imghref.length, imghref.indexOf("/thumbs/") + 8).replace(".jpg", "");
                    }
                
                    var newhref = "http://www.seekingarrangement.com/member/watermark.php?id=" + photoid;
                    $section.append('<img src="' + newhref + '"/>');
                    $(this).hide();
                });
            }
//        });
        //add mail history button
        $("h3:first", $section).after("<a href='javascript: void(0);' id='btnmailhistory' style='color:green; float:left; font-weight:bold'>view mail history</a><br/>");
        $("#btnmailhistory").click(function () {showmailhistory(profileid)});
        $("#profilepreviewstatus").hide();
        $("#profilepreviewcontent").show();
}


function formatmsgpanel($msgpanel){
    $(".aside.left",$msgpanel).hide();
    $(".detail",$msgpanel).removeClass("detail");
    $(".aside.right",$msgpanel).width(50);
    $(".aside.right img, .aside.right input",$msgpanel).width(50).height(50);
            $('a > img[src*="close"]',$msgpanel).unwrap().click(
        function(){ 
            $msgpanel.fadeOut();
            $msgpanel.html("");
        });
}

function showmailhistory (profileid){
    $("#mailhistoryparent, #mailpreview").remove();
	$("body").append("<div id='mailhistory_mailboxes'><div id='hiddenmaildivinbox' style='display:none'/><div id='hiddenmaildivsent' style='display:none'/></div><div id='mailhistoryparent' style='display:none; position:fixed;left:10%; right:10%; top:10px; bottom:10px;  max-width:1000px; border-color:black; border-width:2px; border-style:solid; border-radius:10px; background-color:white; text-align:left; z-index:10000; '><input type='button' id='btnclosemailpreview' style='left:5px;width:45%;' value='close window'/><div style='position:absolute; top:30px; left:5px; bottom:5px; width:45%; overflow:auto'><table id='tblmailhistory' cellpadding='2' border='1' style='width:99%; '><thead><tr><th style='background-color:black; color:white'>type</th><th style='background-color:black; color:white'>date</th><th style='background-color:black; color:white'>subject</th></thead><tbody></tbody></table></div><div id='mailpreview' style='position:absolute; top:5px; right:5px; bottom:5px; left:48%; border-style-left:dotted; border-color-left:black; border-width-left:2px; overflow:auto; font-weight:normal; font-size:12px'/></div>");
	$("#btnclosemailpreview").click(function () {
		$("#mailhistoryparent").hide();
	});
	$("#mailhistoryparent").slideDown(function(){
	    if ($("#tblmailhistory > tbody > tr").length == 0) {
	        $("#mailpreview").html("");
            loadmailbox("newinbox","#eeffee", "received", profileid, "http://www.seekingarrangement.com/member/newinbox.php?folder=new&new_profiles_per_page=5000&id=1&profileid=" + profileid);
            loadmailbox("newoutbox","#eeeeee", "sent", profileid, "http://www.seekingarrangement.com/member/newoutbox.php?folder=new&new_profiles_per_page=5000&id=1&profileid=" + profileid);
            loadmailbox("savedinbox","#eeeeff", "saved", profileid, "http://www.seekingarrangement.com/member/savedinbox.php?folder=new&new_profiles_per_page=5000&id=1&profileid=" + profileid);
            loadmailbox("deletedinbox","#ffeeff", "deleted", profileid, "http://www.seekingarrangement.com/member/deletedinbox.php?folder=deleted&deleted_profiles_per_page=5000&id=1&profileid=" + profileid);
        }
    });
}
function loadmailbox(mailbox, flagcolor, labeltext, profileid, url)
{
    $("#hiddenmaildiv" + mailbox).remove();
    $("body").append("<div id='hiddenmaildiv" + mailbox + "' style='display:none'/>")
    $("#mailpreview").append("<div id='mailstatus" + mailbox + "'><em>scanning for " + labeltext + " messages...</em></div><hr/>");
    var $mailstatus=$("#mailstatus" + mailbox);
    $("#hiddenmaildiv" + mailbox).load(url + " table.mailbox-item", 
         function (responseText, textStatus) {

            //loop through matching mail rows and add them to table in UI

		    //var $mailrows=$('#hiddenmaildiv' + mailbox + ' .mailbox-item-body div.img_holder a[href$="detail.php?id=' + profileid + '"]').closest("tr");
            //this selector is superior because of the possibility that the account has been deleted
            var $mailrows=$('#hiddenmaildiv' + mailbox + ' tbody.mailbox-item-body > tr > td:nth-child(2) a[href$="detail.php?id=' + profileid + '"]').closest("tr");
            $mailstatus.html(labeltext + ": processing " + $mailrows.length + " messages");
		    $mailrows.each(function(){processmailrow(labeltext, $(this), flagcolor)});
		    $mailstatus.html('<img height="16" width="16" alt="" src="/_assets/i/home-check.gif"> ' + labeltext + ': ' + $mailrows.length  + " messages retrieved");

            //attach hover and click events to table rows in UI
            $("#tblmailhistory > tbody > tr").hover(
	            function () {
		            $(this).css("background", "yellow");
	            },
	            function () {
		            $(this).css("background", "");
	            });
	        $("#tblmailhistory > tbody > tr").click(function () {
		        $("#mailpreview").html("<em>loading message</em>");
		        var url = $(this).attr("url");
		        $("#mailpreview").load(url + ' div.detail',
                    function(){
                        formatmsgpanel($("#mailpreview"));
                    });
                });
            $("#hiddenmaildiv" + mailbox).remove();
	    });
}

  function  processmailrow (labeltext, $mailrow, flagcolor) {
			var maildate = $.trim($("td.mailbox-date", $mailrow).text());
			//parse string and get javascript date object
			var maildateobj = new Date(getDateFromFormat(maildate, "MM/dd/yy hh:mma"))
            
			var maildatetext = formatDate(maildateobj, "NNN d, yyyy h:mm a");
			var $maillink = $("td.mailbox-subject a", $mailrow);
			var mailsubject = $maillink.text();
			var mailurl = $maillink.attr("href");
            var rowhtml="<tr url='" + mailurl + "'><td style='background-color:" + flagcolor + "'>" + labeltext + "</td><td>" + maildatetext + "</td><td>" + mailsubject + "</td></tr>";

            //we have to figure out where in the new table to insert the row
            //so that results are sorted by date
			var $tablerows = $("#tblmailhistory > tbody > tr");
			if ($tablerows.length == 0) {
				$("#tblmailhistory > tbody").append(rowhtml);
			}
			else {
				var lastrowdate = new Date("1/1/2199");
                var bdisplayed=false;
				$tablerows.each(function () {
					var rowdate = new Date($(this).children().eq(1).text());
					if (maildateobj < lastrowdate && maildateobj > rowdate) {
						$(this).before(rowhtml);
						lastrowdate = new Date("1/1/1901");
                        bdisplayed=true;
					}
					else {
						lastrowdate = rowdate;
					}
				});
                if (!bdisplayed){$("#tblmailhistory > tbody").append(rowhtml);}
			}
	        
			}

var isCtrl = false;
var isShift=false;
$(document).ready(function(){
$(document).keyup(function (e) {
if(e.which == 17) isCtrl=false;
if(e.which == 16) isShift=false;
}).keydown(function (e) {
    if(e.which == 17) isCtrl=true;
    if(e.which == 16) isShift=true;
    if(e.which == 8 && isCtrl == true && isShift == true) {
        showEmailBlast();
 	return false;
 }
});}
 );

 function showEmailBlast(){
     if ($("#emailblast").length == 0) {
        $("body").append("<div id='emailblast' style='z-index:10000; position:fixed; left:20%; right:20%; top:10px; bottom:10px; max-width:800px;  overflow:auto; background: none repeat scroll 0 0 #FEFEFE; border: 2px solid black;border-radius: 10px 10px 10px 10px; padding:10px; display:none '><input id='emailblastclose' type='button' value='close email blast' style='width:100%;'/><div style='position:absolute;top:40px; left:2px; bottom:2px; width:200px; border-right-width:1px; border-right-style:solid; border-right-color:black;overflow:auto'>Paste profile list here<textarea id='emailblastprofilelistinput' style='border-color:blue'></textarea><input type='button' id='emailblastprocesslistinput' value='process list' style='width:100%;'/><ul id='emailblastprofilelist' style='margin-left:5px'></ul></div><div id='emailblastmessagepane' style='display:none; position:absolute;top:40px; right:2px; bottom:2px; left:205px; text-align:left '>Subject:<br/><input type='textbox' id='emailblastsubject' style='width:95%; border-color:blue'/><br/>Message:<br/><textarea id='emailblastmessage' style='width:95%; border-color:blue'/><input type='button' id='emailblastsendmessages' value='send messages' style='width:95%;'/><div id='emailblaststatus'></div></div></div>");
    }
        var $emailblast = $("#emailblast");
    $("#emailblastclose").click(
        function () {
            $emailblast.html(""); 
            $emailblast.fadeOut();
        });
    var $emailblastmessagepane = $("#emailblastmessagepane");
    var $emailblaststatus = $("#emailblaststatus");
    var $emailblastprofilelistinput=$("#emailblastprofilelistinput");
    var $emailblastprofilelist=$("#emailblastprofilelist");
    $("#emailblastprocesslistinput").click(function(){
        $emailblastprofilelist.html('');
        var lines = $emailblastprofilelistinput.val().split(/\r?\n/);
        var regexp = /^\s*\d+\s*$/;

        for (var i = 0; i < lines.length; i++) {

            if (lines[i].match(regexp)) {

                // The regex matches lines[i]
                    $emailblastprofilelist.append('<li style="color:green; text-decoration:underline; cursor:pointer; text-align:left" pid="' + lines[i] + '">' + lines[i] + ' ready</li>');

            } else {

                // The regex does not match lines[i]
                if (lines[i]!='') $emailblastprofilelist.prepend('<li style="color:red; text-decoration:underline; cursor:auto; text-align:left">' + lines[i] + ' error</li>');

            }

        }
        $("li[pid]",$emailblastprofilelist).click(function () {
                $("#profilepreview, #mailpreview, #msgprof, #mailhistoryparent").remove();
                var profileid = $(this).attr("pid");
                showprofile(profileid);
            });
        $emailblastmessagepane.fadeIn(
            function(){$("#emailblastsubject").focus();}
            );
        });
    $("#emailblastsendmessages").click(function(){
        var confirmation= confirm("Do you really want to send this message to all of these recipients??");
        if(confirmation==true){
            $("#emailblastsendmessages").hide();
            $emailblaststatus.html("sending");
            var subject=$("#emailblastsubject").val();
            var message=$("#emailblastmessage").val();
            $("li[pid]",$emailblastprofilelist).each(function()
                {
                var profileid=$(this).attr("pid");
                $(this).text(profileid + ' sending');
                $.post("http://www.seekingarrangement.com/member/sendmessage.php",{profileid: profileid, message: message, subject:subject},
                    function(data){
                        if(data.indexOf("writeto-spamnotice.gif") != -1){
                            $("li[pid='" + profileid + "']",$emailblastprofilelist).html('<span style="color:red">' + profileid + ' SPAM BLOCKED</span>');
                            $emailblaststatus.append("<br/>" + profileid + ' SPAM BLOCKED');}
                        else {
                            $("li[pid='" + profileid + "']",$emailblastprofilelist).html(profileid + ' sent');
                            $emailblaststatus.append("<br/>" + profileid + ' sent');}
                    }
                 );
            });
        }
        if(confirmation==false){
            $("#emailblastsendmessages").show();
            $emailblaststatus.html("cancelled");}
        });
//    $emailblastcontent.hide().html("");
    $emailblaststatus.html("");
    $emailblast.slideDown(
            function(){$("#emailblastprofilelistinput").focus();});
 }
//date parsing code, obtained from http://www.mattkruse.com/javascript/date/index.html
var MONTH_NAMES = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'); var DAY_NAMES = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
function LZ(x) { return (x < 0 || x > 9 ? "" : "0") + x }
function isDate(val, format) { var date = getDateFromFormat(val, format); if (date == 0) { return false; } return true; }
function compareDates(date1, dateformat1, date2, dateformat2) { var d1 = getDateFromFormat(date1, dateformat1); var d2 = getDateFromFormat(date2, dateformat2); if (d1 == 0 || d2 == 0) { return -1; } else if (d1 > d2) { return 1; } return 0; }
function formatDate(date, format) { format = format + ""; var result = ""; var i_format = 0; var c = ""; var token = ""; var y = date.getYear() + ""; var M = date.getMonth() + 1; var d = date.getDate(); var E = date.getDay(); var H = date.getHours(); var m = date.getMinutes(); var s = date.getSeconds(); var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k; var value = new Object(); if (y.length < 4) { y = "" + (y - 0 + 1900); } value["y"] = "" + y; value["yyyy"] = y; value["yy"] = y.substring(2, 4); value["M"] = M; value["MM"] = LZ(M); value["MMM"] = MONTH_NAMES[M - 1]; value["NNN"] = MONTH_NAMES[M + 11]; value["d"] = d; value["dd"] = LZ(d); value["E"] = DAY_NAMES[E + 7]; value["EE"] = DAY_NAMES[E]; value["H"] = H; value["HH"] = LZ(H); if (H == 0) { value["h"] = 12; } else if (H > 12) { value["h"] = H - 12; } else { value["h"] = H; } value["hh"] = LZ(value["h"]); if (H > 11) { value["K"] = H - 12; } else { value["K"] = H; } value["k"] = H + 1; value["KK"] = LZ(value["K"]); value["kk"] = LZ(value["k"]); if (H > 11) { value["a"] = "PM"; } else { value["a"] = "AM"; } value["m"] = m; value["mm"] = LZ(m); value["s"] = s; value["ss"] = LZ(s); while (i_format < format.length) { c = format.charAt(i_format); token = ""; while ((format.charAt(i_format) == c) && (i_format < format.length)) { token += format.charAt(i_format++); } if (value[token] != null) { result = result + value[token]; } else { result = result + token; } } return result; }
function _isInteger(val) { var digits = "1234567890"; for (var i = 0; i < val.length; i++) { if (digits.indexOf(val.charAt(i)) == -1) { return false; } } return true; }
function _getInt(str, i, minlength, maxlength) { for (var x = maxlength; x >= minlength; x--) { var token = str.substring(i, i + x); if (token.length < minlength) { return null; } if (_isInteger(token)) { return token; } } return null; }
function getDateFromFormat(val, format) { val = val + ""; format = format + ""; var i_val = 0; var i_format = 0; var c = ""; var token = ""; var token2 = ""; var x, y; var now = new Date(); var year = now.getYear(); var month = now.getMonth() + 1; var date = 1; var hh = now.getHours(); var mm = now.getMinutes(); var ss = now.getSeconds(); var ampm = ""; while (i_format < format.length) { c = format.charAt(i_format); token = ""; while ((format.charAt(i_format) == c) && (i_format < format.length)) { token += format.charAt(i_format++); } if (token == "yyyy" || token == "yy" || token == "y") { if (token == "yyyy") { x = 4; y = 4; } if (token == "yy") { x = 2; y = 2; } if (token == "y") { x = 2; y = 4; } year = _getInt(val, i_val, x, y); if (year == null) { return 0; } i_val += year.length; if (year.length == 2) { if (year > 70) { year = 1900 + (year - 0); } else { year = 2000 + (year - 0); } } } else if (token == "MMM" || token == "NNN") { month = 0; for (var i = 0; i < MONTH_NAMES.length; i++) { var month_name = MONTH_NAMES[i]; if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) { if (token == "MMM" || (token == "NNN" && i > 11)) { month = i + 1; if (month > 12) { month -= 12; } i_val += month_name.length; break; } } } if ((month < 1) || (month > 12)) { return 0; } } else if (token == "EE" || token == "E") { for (var i = 0; i < DAY_NAMES.length; i++) { var day_name = DAY_NAMES[i]; if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) { i_val += day_name.length; break; } } } else if (token == "MM" || token == "M") { month = _getInt(val, i_val, token.length, 2); if (month == null || (month < 1) || (month > 12)) { return 0; } i_val += month.length; } else if (token == "dd" || token == "d") { date = _getInt(val, i_val, token.length, 2); if (date == null || (date < 1) || (date > 31)) { return 0; } i_val += date.length; } else if (token == "hh" || token == "h") { hh = _getInt(val, i_val, token.length, 2); if (hh == null || (hh < 1) || (hh > 12)) { return 0; } i_val += hh.length; } else if (token == "HH" || token == "H") { hh = _getInt(val, i_val, token.length, 2); if (hh == null || (hh < 0) || (hh > 23)) { return 0; } i_val += hh.length; } else if (token == "KK" || token == "K") { hh = _getInt(val, i_val, token.length, 2); if (hh == null || (hh < 0) || (hh > 11)) { return 0; } i_val += hh.length; } else if (token == "kk" || token == "k") { hh = _getInt(val, i_val, token.length, 2); if (hh == null || (hh < 1) || (hh > 24)) { return 0; } i_val += hh.length; hh--; } else if (token == "mm" || token == "m") { mm = _getInt(val, i_val, token.length, 2); if (mm == null || (mm < 0) || (mm > 59)) { return 0; } i_val += mm.length; } else if (token == "ss" || token == "s") { ss = _getInt(val, i_val, token.length, 2); if (ss == null || (ss < 0) || (ss > 59)) { return 0; } i_val += ss.length; } else if (token == "a") { if (val.substring(i_val, i_val + 2).toLowerCase() == "am") { ampm = "AM"; } else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") { ampm = "PM"; } else { return 0; } i_val += 2; } else { if (val.substring(i_val, i_val + token.length) != token) { return 0; } else { i_val += token.length; } } } if (i_val != val.length) { return 0; } if (month == 2) { if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { if (date > 29) { return 0; } } else { if (date > 28) { return 0; } } } if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) { if (date > 30) { return 0; } } if (hh < 12 && ampm == "PM") { hh = hh - 0 + 12; } else if (hh > 11 && ampm == "AM") { hh -= 12; } var newdate = new Date(year, month - 1, date, hh, mm, ss); return newdate.getTime(); }
function parseDate(val) { var preferEuro = (arguments.length == 2) ? arguments[1] : false; generalFormats = new Array('y-M-d', 'MMM d, y', 'MMM d,y', 'y-MMM-d', 'd-MMM-y', 'MMM d'); monthFirst = new Array('M/d/y', 'M-d-y', 'M.d.y', 'MMM-d', 'M/d', 'M-d'); dateFirst = new Array('d/M/y', 'd-M-y', 'd.M.y', 'd-MMM', 'd/M', 'd-M'); var checkList = new Array('generalFormats', preferEuro ? 'dateFirst' : 'monthFirst', preferEuro ? 'monthFirst' : 'dateFirst'); var d = null; for (var i = 0; i < checkList.length; i++) { var l = window[checkList[i]]; for (var j = 0; j < l.length; j++) { d = getDateFromFormat(val, l[j]); if (d != 0) { return new Date(d); } } } return null; }


//all code below this point is used for the autoupdater with userscripts.org
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '122855', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
// ==/UserScript==