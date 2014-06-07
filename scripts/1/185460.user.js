// ==UserScript==
// @name        GameFAQs-Avatars
// @namespace   Kraust
// @description Avatars for GameFAQs
// @include     *.gamefaqs.com/boards/*
// @version     2.5.0
// @grant       none
// ==/UserScript==

/****************************************************************************
 * Disclaimer: This product is given as is, and anyone who many want to use *
 * It is free to with my permission. If you need to contact me for any      *
 * reason please send me a message over on GameFAQs. I've tried to make it  *
 * so that in later versions of the script that people with a jQuery        *
 * background can understand what's going on here.                          *
 ****************************************************************************/


// cookie stuff
var cookie = getCookie("avatar"); 

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()); + "; domain=.gamefaqs.com/; path=/";
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}


//This goes on ever page and sends you to the avatar settings
$(".masthead_user").prepend("<a href='/boards/user.php?upload=1'>Avatar Settings <i class='icon icon-picture'></i></a> ");

// If we're on user.php we have to do a  bit of preparation.
if((decodeURIComponent((new RegExp('[?|&]' + "upload" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) == "1") && (location.pathname == "/boards/user.php")) {
    console.log("This worked");
    
    var user = $("html.js body.wf-active div.wrapper div#mantle_skin div#content.container div.main_content div.span8 div.body table.board tbody tr td").eq(0).text();
	
	// GameWeasel Fix
	if( user == "") {
		var user = $("#content > div > div > div.body > table > tbody > tr:nth-child(1) > td").text();
	}
    console.log(user);
    
    
    var upload_user = user + " ";

    $(".page-title").html("GameFAQs Avatars");
    $(".userinfo").css("border", "none");
    
    $("tbody").empty();    
        
        
    if( user ) {
        $("tbody").append("<div style='float:left;width:100px;height:100px;'><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + user + ".png' alt='' ></div>" );
        $("tbody").append("<div style='float:left;padding-left:10px'><h4>Global Avatar Settings</h4> <ul id=settings class=\"paginate user\" style=\"margin:0;padding:0;\"><li><a href=\"\" id=\"av_left\">Avatars to the Left</a></li><li><a href=\"\" id=\"av_right\">Avatars to the Right</a></li><li><a href=\"\" id=\"av_no\">No Avatars</a></li></ul> \
                <form id=submit method=POST enctype=multipart/form-data > \
				<input class=btn type=file name=file accept=\"image/*\" id=file> \
                <input class=\"btn btn_primary\" type=button id=submit_btn value=\"Upload\"> \
                <input style=\"display:none\" type=text name=dest value=\"GameFAQs-Avatars\"> \
                <input style=\"display:none\" type=text name=user value=\"" + upload_user + "\"> \
                <span id=server_message>Maximum File Size: 100KB</span> \
                </form></div>");
				
		$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'><h4>Version 2.5.0</h4>+ New Imagehost as Dropbox no longer works properly.</div>");

		$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'>GameFAQs Avatars created by <a href='http://www.gamefaqs.com/users/Judgmenl/boards'>Judgmenl</a> - 2014.</div>");
		$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'>A listing of Avatars can be located <a href='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/' target='_blank'>Here</a> (wip).</div>");

    }
    
    
    /* error checking when handling the upload */	

    $("#file").change(function() {
    
        var file = this.files[0];
        var size = file.size;
        var type = file.type;
        
        if( !type.match(/image.*/) ) {
            $("#submit_btn").css("display", "none");
            $("#server_message").html("Invalid File Type");
            return;		
        }
        
        if( size > 102400 ) {
            $("#submit_btn").css("display", "none");
            $("#server_message").html("Image is too big (" + size/1024 + "KB). 100KB maximum.");
            return;
        }
        
        if( !user ) {
            $("#submit_btn").css("display", "none");
            $("#server_message").html("Log in to upload avatars.");
        }
        
        $("#submit_btn").css("display", "inline");
        $("#server_message").html("OK");
    
        

    });
    
    /* ajax request to handle the upload */

    $("#submit_btn").click( function() {
    
	
	
        var formData = new FormData($('#submit')[0]);
    
        $("#server_message").html("Uploading...");
    
        $.ajax( {
            //url: "http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/upload.php",
			url: "http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/upload-v2.php",
            dataType: "html",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function( data ) {
            $("#server_message").html(data);
            if( data == 'Upload Successful! Refreshing to apply changes...') {
                location.reload(true);
            }
        });
        
    });
    
    
    /* Cookie setters */
    $("#av_left").click( function() {
        setCookie("avatar", "left", 90);
    });
    
    $("#av_right").click( function() {
        setCookie("avatar", "right", 90);
    });
    
    $("#av_no").click( function() {
        setCookie("avatar", "no", 90);
    });


} else {

	/* Edit Avatar Display on a board basis */
	$(".paginate, .user").eq(0).append("<li><a id=avatar_settings style=\"background-color:rgb(115,75,230);text-shadow:0 1px 0 rgba(0, 0, 0, 0.5);color:rgb(255, 255, 255); background-image:linear-gradient(rgb(115,75,230), rgba(115,75,30, 0)); box-shadow:0 0 0 1px rgb(115,75,230), 0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 2px 2px rgba(0, 0, 0, 0.25)\"><i class='icon icon-picture'></i> Avatar Display Settings</a></li>");
	$(".pod, .board_wrap").eq(0).append("<ul id=settings class=\"paginate user\" style=\"margin:0;padding:0;display:none\"><li><a href=\"\" id=\"av_left\">Avatars to the Left</a></li><li><a href=\"\" id=\"av_right\">Avatars to the Right</a></li><li><a href=\"\" id=\"av_no\">No Avatars</a></li></ul>");

	/* The toggle for the settings */
	$("#avatar_settings").toggle( function() {
		$("#settings").css("display", "block");
	}, function() {
		$("#settings").css("display", "none");
	});
	
	/* This part of the script tells the browser where to place the avatars */
	if( cookie == "left" ) {

		if($('span.author_data:nth-child(2)').length != 0) {
			for( var i = 0; i < 50; i++) {
				$('span.author_data:nth-child(2)').eq(i).after("<img src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + $(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' >" );
			}
		} else {
			/* Please note this is for users who have Message Poster Display "Above Message" */
			for( var i = 0; i < 50; i++) {
				$("td.msg").eq(i).prepend("<div style=\"position:absolute;\"><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + $(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' ></div>" );
				$(".msg_body").eq(i).css("padding-left", "110px");
				$(".msg_body").eq(i).css("min-height", "100px");
				
			$('img').error(function() {
				$(this).parent().next().css("padding-left", "0px");
				$(this).parent().next().css("min-height", "0px");		
				$(this).remove(); 
			});

			}
		}

		$('img').error(function() {
			$(this).remove(); 
		});	
		
	} else if (cookie == "right" ) {

		for( var i = 0; i < 50; i++) {
			$("table.board").eq(i).css("position", "relative");
			$("td.msg").eq(i).prepend("<div style=\"position:absolute; right:8px;\"><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + $(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' ></div>" );
			$(".msg_body").eq(i).css("padding-right", "110px");
			$(".msg_body").eq(i).css("min-height", "100px");

		}

		$('img').error(function() {
			$(this).parent().next().css("padding-right", "0px");
			$(this).parent().next().css("min-height", "0px");		
			$(this).remove(); 
		});

	} else if  ( cookie == "no" ) {

	} else {

	/* Comment this out if you want no avatars as your default */

		if($('span.author_data:nth-child(2)').length != 0) {
			for( var i = 0; i < 50; i++) {
				$('span.author_data:nth-child(2)').eq(i).after("<img src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + $(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' >" );
			}
		} else {

		for( var i = 0; i < 50; i++) {
			$("td.msg").eq(i).prepend("<div style=\"position:absolute; right:8px;\"><img class='avatar' src='http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/avatars/" + $(".name").eq(i).text().split(' ').join('%20') + ".png' alt='' ></div>" );
			$(".msg_body").eq(i).css("padding-right", "110px");
			$(".msg_body").eq(i).css("min-height", "100px");
			}
		}

		$('img').error(function() {
			$(this).remove(); 
		});
		
	/* Comment this out if you want no avatars as your default */

	}
	
	/* Cookie setters */
    $("#av_left").click( function() {
        setCookie("avatar", "left", 90);
    });
    
    $("#av_right").click( function() {
        setCookie("avatar", "right", 90);
    });
    
    $("#av_no").click( function() {
        setCookie("avatar", "no", 90);
    });

}