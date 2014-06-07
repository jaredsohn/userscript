// ==UserScript==
// @name	LOL - IP Redeemer
// @version	2.4
// @namespace	http://leagueoflegends.com
// @description	Redeems 4-Win IP boost from LoL Referral page. GM script by: \'Hip2script\'. Original creator: \'Deathnetworks\' Update: Lustprinzip
// @include	http://*leagueoflegends.com/referrals/*
// @include	http://*leagueoflegends.com/*/referrals/*
// ==/UserScript==
var codetxt = "if (location.href.match('total'))
{var l = location;var t = parseInt(/total=(.*)\\&/.exec(l.href)[1]);var c = parseInt(/\\&cur=(.*)/.exec(l.href)[1]);
t==c?s=\"Done...\":s=\"Working...\";
if (t>=c){document.getElementsByTagName(\"body\")[0].innerHTML = \"<h3 style='color:blue;'>
League of Legends '4-Win IP Boost' Redeemer Script</h3><h4>\"+s+\"</h4>
<br />Redeemed <span style='color:red;'>#\"+c+\"</span> out of <span style='color:red;'>\"+t+\"</span>
\";if (t>c)l.href = \"http://\"+l.hostname+l.pathname+\"?total=\"+t+\"&cur=\"+(c+1);}}if($(location).attr(\"href\").toString().search(new RegExp(\"rewards\"))>0){$(\".item_name\").each(function(){if($(this).next(\"form\").html()){var a=$(this).next(\"form\").attr(\"action\");var b=$(location).attr(\"href\");function c(a){var b=((a||\"\")+\"\").match(/^http:\\/\\/[^/]+/);return b?b[0]:null}if($(this).html().toString().substring(0,14) ==\"4-Win IP Boost\"){$(this).next(\"form\").remove();var d=$(this).html().replace(\"4-Win IP Boost (\",\"\").replace(\")\",\"\");var e=$(this).parent();$('<div class=\"possible-reward-redeem\"><a class=\"redeem_submit\" href=\"javascript:void(0);\">Click to Redeem</a></div>').click(function(){$(this).replaceWith('<div class=\"redeem\">Done</div>');window.open(c(b)+a+\"?total=\"+d+\"&cur=1\")}).appendTo($ (this).parent())}else{$(this).next(\"form\").remove( );$('<div class=\"redeem\"><a class=\"redeem_submit\" href=\"javascript:void(0);\">Click to Redeem</a></div>').click(function(){$.get(c(b)+a,function(a){a =a});$(this).remove()}).appendTo($(this).parent())}}});$(\"div.tab_header div.pager\").html(\"<center><span style='color:red;'>'4-Win IP Boost Redeemer' script is Installed</span></center>\")}";var head1 = document.getElementsByTagName("head")[0];var asrpt = document.createElement('script');asrpt.type = 'text/javascript';asrpt.innerHTML = codetxt;head1.appendChild(asrpt);
