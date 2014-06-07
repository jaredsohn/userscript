// ==UserScript==
// @name           驱动之家评论“举报”确认
// @namespace      mydrivers
// @include        http://comment.drivers.com.cn/review/*
// ==/UserScript==

unsafeWindow.GetReview = function (ID,Tid,PostDate,Floor,Content,VoteContent,Revert,IPAdd,IP,UserName,Pic,myUserName)
{
	var review = "<table width=\"98%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"1\" bgcolor=\"#DCDCDC\">" +
		"<tr><td id = \"con_"+ID+"\" height=\"28\" colspan=\"2\" align=\"left\" bgcolor=\"#F2F2F2\">" +
		"<table width=\"98%\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\"><tr>" +
		"<td width=\"70%\"><span class=\"f12_black\"><strong>["+Floor+"<a href='"+unsafeWindow.myurl+"op.aspx?Tid="+Tid+"&id="+ID+"&username="+myUserName+"' target=\"_blank\">楼</a>]</strong></span> <span class=\"f12\">"+UserName+"</span> <span class=\"f12_black\">"+PostDate+"</span></td>" +
		"<td width=\"30%\" class=\"f12_black\">来自："+IPAdd+"</td></tr></table></td></tr><tr>" +
		"<td width=\"70\" align=\"center\" valign=\"top\" bgcolor=\"#FFFFFF\"><table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" +
		"<tr><td align=\"center\">&nbsp;</td></tr><tr><td align=\"center\">"+Pic+"</td></tr><tr><td align=\"center\">&nbsp;</td></tr></table></td>" +
		"<td width=\"535\" align=\"center\" bgcolor=\"#FFFFFF\">" +
		"<div style=\"height:9px;font-size:0px;\"></div><table width=\"98%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">" +
		"<tr><td height=\"30\"><div style=\"word-break:break-all;overflow:hidden;width:530px;\" class=\"f12\">"+Content+"</div></td>" +
		"</tr><tr><td align=\"center\"><div style=\"height:4px;font-size:0px;\"></div>" +
		""+Revert+"<div style=\"height:5px;font-size:0px;\"></div></td></tr>" +
		"<tr><td><table width=\"360\" border=\"0\" align=\"right\" cellpadding=\"0\" cellspacing=\"0\"><tr>" +
		"<td width=\"86\" height=\"21\" align=\"right\"> <a class=\"report\" href=\"javascript:void(0)\" onclick=\"if (confirm('确实要举报吗？')) { userReport("+ID+"); }\" id=\"report_"+ID+"\">举 报</a></td>" +
		"<td width=\"125\" height=\"21\" align=\"right\"  class=\"f12_red1\"> <span class=\"f12\" id = \"unit_"+ID+"\">"+VoteContent+"</span></td>" +
		"<td align=\"center\"><table width=\"86\" height=\"21\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>" +
		"<td width=\"86\" height=\"21\" align=\"center\" valign=\"bottom\" background=\"/images/86-21-bg.gif\" bgcolor=\"#F4F4F4\" class=\"f12_red1\"><table width=\"98%\" height=\"18\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" +
		"<tr><td align=\"center\" class=\"f12_red1\"><span onmouseover=\"this.style.cursor='pointer'\"; onmouseout=\"this.style.cursor='default'\" onclick=\"ShowReply("+ID+")\" class=\"f12_black\">回 复 <img src=\"/images/888sj.gif\" width=\"7\" height=\"5\"></span></td>" +
		"</tr></table></td></tr></table></td></tr></table></td></tr></table>" +
		"<div style=\"height:2px;font-size:0px;\"></div><div id='Reply"+ID+"'></div><div style=\"height:2px;font-size:0px;\"></div><div class=\"AjaxTipdelay\" id='ReplyTip"+ID+"'></div></td>" +
		"</tr></table><div style=\"height:5px;\"></div>";
	return review;
}
