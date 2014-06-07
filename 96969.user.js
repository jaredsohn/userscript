// ==UserScript==
// @name           StatScript Uni2 Extreme
// @description    adds a new menu to the game containing an overview of your space empire.
// @version        1.2
// @include        http://uni2.playstarfleetextreme.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
// get the planets working!
// this is a wierd looking bit of code but it's necessary otherwise the damn thing breaks :S emoticons in code woot :P
if ($('.planet div.planet_coordinates:eq(0)').hasClass("planet_coordinates"))
{GM_setValue("coord0", $('.planet div.planet_coordinates a:eq(0)').html());}
if ($('.planet div.planet_coordinates:eq(1)').hasClass("planet_coordinates"))
{GM_setValue("coord1", $('.planet div.planet_coordinates a:eq(1)').html());}
if ($('.planet div.planet_coordinates:eq(2)').hasClass("planet_coordinates"))
{GM_setValue("coord2", $('.planet div.planet_coordinates a:eq(2)').html());}
if ($('.planet div.planet_coordinates:eq(3)').hasClass("planet_coordinates"))
{GM_setValue("coord3", $('.planet div.planet_coordinates a:eq(3)').html());}
if ($('.planet div.planet_coordinates:eq(4)').hasClass("planet_coordinates"))
{GM_setValue("coord4", $('.planet div.planet_coordinates a:eq(4)').html());}
if ($('.planet div.planet_coordinates:eq(5)').hasClass("planet_coordinates"))
{GM_setValue("coord5", $('.planet div.planet_coordinates a:eq(5)').html());}
if ($('.planet div.planet_coordinates:eq(6)').hasClass("planet_coordinates"))
{GM_setValue("coord6", $('.planet div.planet_coordinates a:eq(6)').html());}
if ($('.planet div.planet_coordinates:eq(7)').hasClass("planet_coordinates"))
{GM_setValue("coord7", $('.planet div.planet_coordinates a:eq(7)').html());}
if ($('.planet div.planet_coordinates:eq(8)').hasClass("planet_coordinates"))
{GM_setValue("coord8", $('.planet div.planet_coordinates a:eq(8)').html());}
// rankget
if (/^\/leaderboard/.test(location.pathname))
{
GM_setValue("type", $('.nav_link.selected .waiting').html());
GM_setValue("rank", $('.entity.current .rank').html());
GM_setValue("name", $('.entity.current .name').html());
GM_setValue("tag", $('.entity.current .tag a').html());
GM_setValue("points", $('.entity.current .points').html());
}
// miscellaneous
function Comma(number) {
number = '' + number;
if (number.length > 3) {
var mod = number.length % 3;
var output = (mod > 0 ? (number.substring(0,mod)) : '');
for (i=0 ; i < Math.floor(number.length / 3); i++) {
if ((mod == 0) && (i == 0))
output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
else
output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
}
return (output);
}
else return number;
}
//fixed for heph users
oretotal = Comma(eval(parseInt(GM_getValue("ore0", 0))+parseInt(GM_getValue("ore46", 0))+parseInt(GM_getValue("ore51", 0))+parseInt(GM_getValue("ore6", 0))+parseInt(GM_getValue("ore11", 0))+parseInt(GM_getValue("ore16", 0))+parseInt(GM_getValue("ore21", 0))+parseInt(GM_getValue("ore26", 0))+parseInt(GM_getValue("ore31", 0))+parseInt(GM_getValue("ore36", 0))+parseInt(GM_getValue("ore41", 0))));
crystaltotal = Comma(eval(parseInt(GM_getValue("crystal0", 0))+parseInt(GM_getValue("crystal46", 0))+parseInt(GM_getValue("crystal51", 0))+parseInt(GM_getValue("crystal6", 0))+parseInt(GM_getValue("crystal11", 0))+parseInt(GM_getValue("crystal16", 0))+parseInt(GM_getValue("crystal21", 0))+parseInt(GM_getValue("crystal26", 0))+parseInt(GM_getValue("crystal31", 0))+parseInt(GM_getValue("crystal36", 0))+parseInt(GM_getValue("crystal41", 0))));
hydrogentotal = Comma(eval(parseInt(GM_getValue("hydrogen0", 0))+parseInt(GM_getValue("hydrogen46", 0))+parseInt(GM_getValue("hydrogen51", 0))+parseInt(GM_getValue("hydrogen6", 0))+parseInt(GM_getValue("hydrogen11", 0))+parseInt(GM_getValue("hydrogen16", 0))+parseInt(GM_getValue("hydrogen21", 0))+parseInt(GM_getValue("hydrogen26", 0))+parseInt(GM_getValue("hydrogen31", 0))+parseInt(GM_getValue("hydrogen36", 0))+parseInt(GM_getValue("hydrogen41", 0))));
incometotal = Comma(eval(parseInt(GM_getValue("ore0", 0))+parseInt(GM_getValue("hydrogen46", 0))+parseInt(GM_getValue("hydrogen51", 0))+parseInt(GM_getValue("crystal46", 0))+parseInt(GM_getValue("crystal51", 0))+parseInt(GM_getValue("ore46", 0))+parseInt(GM_getValue("ore51", 0))+parseInt(GM_getValue("ore6", 0))+parseInt(GM_getValue("ore11", 0))+parseInt(GM_getValue("ore16", 0))+parseInt(GM_getValue("ore21", 0))+parseInt(GM_getValue("ore26", 0))+parseInt(GM_getValue("ore31", 0))+parseInt(GM_getValue("ore36", 0))+parseInt(GM_getValue("ore41", 0))+parseInt(GM_getValue("crystal0", 0))+parseInt(GM_getValue("crystal6", 0))+parseInt(GM_getValue("crystal11", 0))+parseInt(GM_getValue("crystal16", 0))+parseInt(GM_getValue("crystal21", 0))+parseInt(GM_getValue("crystal26", 0))+parseInt(GM_getValue("crystal31", 0))+parseInt(GM_getValue("crystal36", 0))+parseInt(GM_getValue("ore41", 0))+parseInt(GM_getValue("hydrogen0", 0))+parseInt(GM_getValue("hydrogen6", 0))+parseInt(GM_getValue("hydrogen11", 0))+parseInt(GM_getValue("hydrogen16", 0))+parseInt(GM_getValue("hydrogen21", 0))+parseInt(GM_getValue("hydrogen26", 0))+parseInt(GM_getValue("hydrogen31", 0))+parseInt(GM_getValue("hydrogen36", 0))+parseInt(GM_getValue("hydrogen41", 0)))*24);

// resource selectors (working with moons :D)
if (/^\/buildings/.test(location.pathname))
{
if ($("#user_planets div.home_planet").hasClass("selected"))
{
GM_setValue("ore0", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal0", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen0", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(0)").hasClass("selected"))
{
GM_setValue("ore6", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal6", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen6", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(1)").hasClass("selected"))
{
GM_setValue("ore11", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal11", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen11", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(2)").hasClass("selected"))
{
GM_setValue("ore16", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal16", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen16", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(3)").hasClass("selected"))
{
GM_setValue("ore21", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal21", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen21", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(4)").hasClass("selected"))
{
GM_setValue("ore26", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal26", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen26", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(5)").hasClass("selected"))
{
GM_setValue("ore31", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal31", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen31", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(6)").hasClass("selected"))
{
GM_setValue("ore36", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal36", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen36", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(7)").hasClass("selected"))
{
GM_setValue("ore41", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal41", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen41", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(8)").hasClass("selected"))
{
GM_setValue("ore46", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal46", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen46", $('.hydrogen .right').html().replace(/\,/g,""));
}
if ($("#user_planets div.colony:eq(9)").hasClass("selected"))
{
GM_setValue("ore51", $('.ore .right').html().replace(/\,/g,""));
GM_setValue("crystal51", $('.crystal .right').html().replace(/\,/g,""));
GM_setValue("hydrogen51", $('.hydrogen .right').html().replace(/\,/g,""));
}
}
//main code starts here
if (/^http:\/\/uni2.playstarfleetextreme.com\/statistics\//.test(window.location))
{
var favicon_link_html = document.createElement('link'); favicon_link_html.rel = 'icon'; favicon_link_html.href = '/favicon.gif'; favicon_link_html.type = 'image/gif'; try { document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); } catch(e) { }
document.title = "Starfleet Commander";
document.body.innerHTML = '<div class="logout"><div class="inner_logout"><span class="follow_us"></span><a href="/login/logout">Logout</a></div></div><div class="positioner"><div id="header">'+GM_getValue("statistics")+'</div>'
+'<div id="content" class="profile index"><div id="flash_messages"></div><div id="sticky_notices"></div><div class="title"><div class="text">'+GM_getValue("type")+' Statistics</div><div class="description">for '+GM_getValue("name")+'. A <span id="ach"></span> player.</div><div class="clear"></div></div>'
+'<div align="left" class="profile"><h4>Overview:</h4>'
+'Alliance: '+GM_getValue("tag")+'<BR>Rank: <span id="rankget">'+GM_getValue("rank", "500,000")+'</span>'
+'<BR>Points: <span id="pointsget">'+GM_getValue("points", 0)+'</span><BR>Hourly Ore: '+oretotal+'<BR>Hourly Crystal: '+crystaltotal+'<BR>Hourly Hydro: '+hydrogentotal+'<BR>Daily Ore: '+Comma(oretotal.replace(/\,/g,"")*24)+'<BR>Daily Crystal: '+Comma(crystaltotal.replace(/\,/g,"")*24)+'<BR>Daily Hydro: '+Comma(hydrogentotal.replace(/\,/g,"")*24)+'<BR><BR><BR><h4>How to use:</h4>1. Go to buildings menu.<br>2. Click through all your planets slowly.<br>3. Click leaderboard.<br>4. Click stats. All values should now be filled.</div>'
+'<h4><u>Planets</u></h4>'+GM_getValue("coord0", " ")+' '+GM_getValue("coord1", " ")+' '+GM_getValue("coord2", " ")+' '+GM_getValue("coord3", " ")+' '+GM_getValue("coord4", " ")+' '+GM_getValue("coord5", " ")+' '+GM_getValue("coord6", " ")+' '+GM_getValue("coord7", " ")+' '+GM_getValue("coord8", " ")+'<BR>'
+'<BR><h4><u>BBcode Signature</u></h4><textarea rows="4" cols="30" onClick=select() readonly>Rank: [b]'+GM_getValue("rank", "500,000")+'[/b] Points: [b]'+GM_getValue("points", 0)+'[/b] Daily Mining Income: [b]'+incometotal+''
+'[/b] Alliance: [b]'+GM_getValue("tag")+'[/b] on '+location.host+'</textarea></div>'
+'<div><form action=https://www.paypal.com/cgi-bin/webscr method=post><input type=hidden name=cmd value=_s-xclick><input type=hidden name=hosted_button_id value=D5FE5PK2TRPN2><input type=image src=https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif border=0 name=submit alt=PayPal><BR>If you like StatScript by SFCstats.com, consider donating!<img border=0 src=https://www.paypal.com/en_US/i/scr/pixel.gif width=1 height=1></form><BR></div><div class="footer"><a href="/help/contact?current_planet=1915517">Support</a> | <a href="/info/rules?current_planet=1915517">Rules</a> <a target="_blank" href="http://wiki.playstarfleet.com/">Wiki</a> <a target="_blank" href="http://forum.playstarfleet.com/">Message Board</a> | <a href="/info/faq?current_planet=1915517">FAQ</a> | <a href="/options?current_planet=1915517">Options</a></div><div class="legalese">Use of this site constitutes acceptance of our <a href="/info/terms?current_planet=1915517">Terms of Use</a> and <a href="/info/privacy?current_planet=1915517">Privacy Policy</a>. &copy; 2009 Blue Frog Gaming. All rights reserved.</div><div class="spacer"></div>';
var css_link_html = document.createElement('link'); css_link_html.rel = 'Stylesheet'; css_link_html.href = 'http://playstarfleet.com/stylesheets/starfleet.css'; css_link_html.type = 'text/css'; try { document.getElementsByTagName('head')[0].appendChild( css_link_html ); } catch(e) { }
}
// part 2
if (/^http:\/\/uni2.playstarfleetextreme.com\//.test(window.location))
{
GM_setValue("statistics", document.getElementById("header").innerHTML);
}
// fix the disappearing stats
setInterval(runningcheck, 0);
function runningcheck() {
if (/false/.test(/Stat/.test($('.stats').html())))
{
$('.primary').append('<a class="stats" href="/statistics/">Stat</a href>');
$('.primary .selected').addClass('removal');
$('.footer').append('| <a href="http://www.sfcstats.com>SFCstats.com</a href>');
}
if (/^http:\/\/uni2.playstarfleetextreme.com\/statistics\//.test(window.location))
{
$('.selected.removal').removeClass('selected');
$('.stats').addClass('selected');
}
}
// part 2 continued
if (/^http:\/\/playstarfleet.com\/statistics\//.test(window.location))
{
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<100000)
{
$('#ach').html("<b>top 100k</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<50000)
{
$('#ach').html("<b>top 50k</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<20000)
{
$('#ach').html("<b>top 20k</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<10000)
{
$('#ach').html("<b>top 10k</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<5000)
{
$('#ach').html("<b>top 5,000</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<2000)
{
$('#ach').html("<b>top 2,000</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<1000)
{
$('#ach').html("<b>top 1,000</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<500)
{
$('#ach').html("<b>top 500</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<200)
{
$('#ach').html("<b>top 200</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<100)
{
$('#ach').html("<b>top 100</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<50)
{
$('#ach').html("<b>top 50</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))<10)
{
$('#ach').html("<b>top 10</b>");
}
if (parseInt(((document.getElementById("rankget").innerHTML)).replace(/\,/g,""))==1)
{
$('#ach').html("<b>number 1</b>");
}
}
