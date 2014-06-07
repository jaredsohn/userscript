// ==UserScript==
// @name            Hack Forums Userbar Changer
// @namespace       Snorlax
// @description     Changes userbars
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.2
// ==/UserScript==

$('img[src="' +$.cookie("OldUserbar") + '"]').attr('src', $.cookie("NewUserbar"));

if (location.href == 'http://www.hackforums.net/usercp.php') {
    var str = document.body.innerHTML;
    var n = str.replace("Personal Notepad", "Available Userbars").replace("Update Notepad", "Reset Userbar");
    document.body.innerHTML = n;
    
	userbars = '<p>Select the usergroup</p>\
	<select id="usergroups">\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/guardians.jpg">Guardians</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/empirev3.gif">The Empire</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/143_group.gif">143</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/complexity.gif">Complexity</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/alliance.gif">The Alliance</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/innovation.gif">Innovation</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/legion.gif">Legion</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/graphic-masters.gif">Graphic Masters</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/red-lion.jpg">Red Lions</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/legacy.png">Legacy</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/infamous.gif">Infamous</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/illuminati.gif">illuminati</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/bdiamond.gif">Black Diamond</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/void.jpg">Void</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/hf_l33t.png">L33T</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/ub3r.png">UB3R</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/writers.png">Writ3rs</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/reviewer.png">Reviewer</option>\
    <option value="http://x.hackforums.net/images/blackreign/groupimages/english/hf-mrt.png">MRT</option>\
    <option value="blank">Blank (test)</option>\
    </select>\
    <p>If not, then enter the link for the userbar you want changed. If empty, then it will use the other one from above.</p>\
	<input type="text" id="userbarurl" value="" placeholder="Type userbar URL" /><br /><br />\
    <p>Now pick the userbar you want instead of the one you picked above</p>\
	<image class="userbar" src="http://s12.postimg.org/3unyk9u1l/userbar.png" />\
	<image class="userbar" src="http://s17.postimg.org/5583w8ip7/Userbar2.gif" />\
	<image class="userbar" src="http://s7.postimg.org/x3evv126f/blank_template34.gif" />\
	<image class="userbar" src="http://s7.postimg.org/q2lu54u2v/blank_template5.gif" />\
	<image class="userbar" src="http://s7.postimg.org/x3evv126f/blank_template34.gif" /><br />\
	<image class="userbar" src="http://i.imgur.com/wZ8otOv.png" />\
	<image class="userbar" src="http://i.imgur.com/B7VNYSB.png" />\
	<image class="userbar" src="http://i.imgur.com/ndjxsVM.png" />\
	<image class="userbar" src="http://i.imgur.com/3TVk7jI.png" />\
	<image class="userbar" src="http://puu.sh/2gRfx/2ed527fcfe" /><br />\
	<image class="userbar" src="http://speedcap.net/sharing/files/d0/cc/d0cc46f651521272349e2bf7001e72b6.png" />\
	<image class="userbar" src="http://i.imgur.com/57asHyR.png" />\
	<image class="userbar" src="http://i.imgur.com/n9TsPqR.png" />\
	<image class="userbar" src="http://i.imgur.com/b2WZ2vG.png" />\
	<image class="userbar" src="http://i.imgur.com/4Sapn36.png" /><br />\
	<image class="userbar" src="http://i.imgur.com/sqY0evX.png" />\
	<image class="userbar" src="http://i.imgur.com/6DNN2fF.png" />\
	<image class="userbar" src="http://i.imgur.com/aSbFeWs.png" />\
	<image class="userbar" src="http://i.imgur.com/8MKaynk.png" />\
	<image class="userbar" src="http://i.imgur.com/q53WygQ.png" /><br />\
	<image class="userbar" src="http://i.imgur.com/3vgMt5s.png" />\
	<image class="userbar" src="http://i.imgur.com/o2WT35Z.png" />\
	<image class="userbar" src="http://i.imgur.com/Rw8Ejk0.png" />\
	<image class="userbar" src="http://i.imgur.com/UeggdB5.png" />\
	<image class="userbar" src="http://i.imgur.com/ARKp4tH.png" /><br />\
	<image class="userbar" src="http://s13.postimg.org/rxistwkoz/Ar2_Snt_I.gif" /><br />\
	<p>Or you can make your own or find your own, and paste the URL here, then press the button</p>\
    <input type="text" id="newuserbar" value="" placeholder="URL for new userbar">\
	<button id="doStuff">New userbar</button>';
    
	$("body").on("click", ".userbar", function(){
        if($("#userbarurl").val() == "") {
        	$.cookie("OldUserbar", $('#usergroups :selected').val(), {expires: 9999999999});  
        } else {
        	$.cookie("OldUserbar", $("input:text").val(), {expires: 9999999999});
        }
    $.cookie("NewUserbar", $(this).attr('src'), {expires: 9999999999});
    alert('New userbar set');
	});
    
	$(".usercp_notepad").replaceWith(userbars);
    $('.userbar').css('cursor', 'pointer');
    
    $('.button').click(function(){
    	if( $(this).val() == 'Reset Userbar') {
            $.cookie("NewUserbar", null, {expires: -1});
            $.cookie("OldUserbar", null, {expires: -1});
            alert("Userbar set to default");return false;
    	}
    });
    
	$("body").on("click", "#doStuff", function(){
        $.cookie("OldUserbar", $('#usergroups :selected').val(), {expires: 9999999999}); 
		$.cookie("NewUserbar", $("#newuserbar").val(), {expires: 9999999999});
        alert("New userbar set");return false;
		});
}