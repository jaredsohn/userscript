// ==UserScript==
// @name All of humanity
// @namespace http://www.bungie.net
// @description 
// @include http://*bungie.net/Forums/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

var $MessageUsers = $("ul.author_header_block li a:contains('message user')");
var $RightLists = $("ul.rightside");
var $QuickMsg = null;
var MsgHref = null;
$RightLists.each(function(Index, Item)
{
    var $Item = $(Item); // wrap it
    $Item.append("<li><a class='quickmsg' href='javascript:;'>quick message</a></li>"); // append the link
    $QuickMsg = $Item.children(":last").children(); // now that we appended the link, look for it
    MsgHref = $MessageUsers.eq(Index).attr("href"); // get the href of the original "message user" link
	$QuickMsg.attr("id", MsgHref);// set the id of the link we created to the href we got
	
	});
    $('.quickmsg').click(function() 
    {
		$('.signature').css("height", "auto");
		var hmm = $('#__BNETSTATE').attr('value');
		var derp = $.get($QuickMsg.attr("id"), function(data){
		var herp = $(data).children().children();
		var harp = $(herp);
		//alert("Data Loaded: " + harp.html());
		var index = $(".quickmsg").index(this);

		alert(index);
		var $div1 = '<div class="formgroup1"><p><strong>Subject:<span style="color: rgb(204, 0, 0); font-weight: bold; visibility: hidden;" class="RequiredText" id="ctl00_mainContent_messageForm_skin_createMessageSubjectValidator">* Please enter a subject.</span>&nbsp;</strong></p><input type="text" style="font-family: Arial,Helvetica,sans-serif; width: 510px;" class="textInput" id="ctl00_mainContent_messageForm_skin_subject" name="ctl00$mainContent$messageForm$skin$subject"><br></div>';
		var $div2 = '<div class="formgroup2"><p><strong>Body:</strong></p><span id="bodyCharacterCountDisplay">10000 characters remaining</span></span><span style="color: rgb(204, 0, 0); font-weight: bold; display: none;" class="RequiredText" id="ctl00_mainContent_messageForm_skin_createMessageBodyValidator">* Please enter body text.</span><span style="color: rgb(204, 0, 0); font-weight: bold; display: none;" class="RequiredText" id="ctl00_mainContent_messageForm_skin_BodyLengthValidator">* The body of your message is too long, try entering less text, Sir Typesalot!</span><textarea style="width: 510px;" class="textInput" id="ctl00_mainContent_messageForm_skin_body" cols="20" rows="11" name="ctl00$mainContent$messageForm$skin$body"></textarea><br><div height="100"></div></div>';
		var $div3 = '<div class="formgroup3"><div class="create-post-actions"><ul><li><a href="javascript:__doPostBack(\'ctl00$mainContent$messageForm$skin$cancelButton\',\'\')" class="forum_post_cancel_button" id="ctl00_mainContent_messageForm_skin_cancelButton">cancel</a><a onclick="if (!confirm(\'Are you sure you wish to clear your post and let all your wonderful and hard work go to waste??\')) return false; document.getElementsByTagName(\'textarea\')[0].value=\'\';"style="cursor: pointer;">clear post</a><a href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$mainContent$messageForm$skin$previewButton&quot;, &quot;&quot;, true, &quot;messageform&quot;, &quot;&quot;, false, true))" class="forum_post_preview_button" id="ctl00_mainContent_messageForm_skin_previewButton">preview</a><a href="javascript:WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(&quot;ctl00$mainContent$messageForm$skin$submitButton&quot;, &quot;&quot;, true, &quot;messageform&quot;, &quot;&quot;, false, true))" class="forum_post_submit_button" id="ctl00_mainContent_messageForm_skin_submitButton"/>submit</a></li></ul><br /></div></div>';
		$('.signature').append($div1);
		$('.signature').append($div2);
		$('.signature').append($div3);
		});
	});
		
	
	/*
	if ('#MSGiFrame'){
	var arrow = $(".expanded_arrows_collapsed");
	arrow.click(function () {
	$('#MSGiFrame').remove();
	$(".signature").css("height", "150px")
	})};
	});*/
/*$QuickMsg.click(function(){ 
$(".signature").css("height", "auto");
$(".signature").append('<iframe id="MSGiFrame" src =' + MsgHref + ' width="100%" height="500"></iframe>').('.content_matte')});
$PlaceToMessage.click(function(){
$(".signature").css("height", "150px");
$("#MSGiFrame").remove()});
*/
