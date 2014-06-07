// ==UserScript==
// @name			Trac Changelog right
// @description		Use the full space of the trac ticket page: show the trac changelog on the right side next to the ticket form
// @author			Sven-Steffen Arndt
// @include			http://trac.*/ticket/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version			1.0
// ==/UserScript==

// put ticket content to the left
$("#content").css('margin-left','0px');
$("#content").css('float','left');
$("#content").css('width','53%');

// create a new section for the changelog on the right
$("#content").after('<div id="content-right"></div>');
$("#content-right").css('float','right');
$("#content-right").css('width','45%');
$("#content-right").append($("#changelog").parent());

// select newest comments first as default
//$("#trac-comments-oldest").prop("checked",false);
//$("#trac-comments-newest").prop("checked",true);
//$("input[name='trac-comments-order']:checked").removeAttr("checked");
//$("#trac-comments-newest").attr("checked","checked");
//$("#trac-comments-oldest").removeAttr("checked");
//$("#trac-comments-newest").click();
//$("#trac-comments-newest").prop("checked","checked");