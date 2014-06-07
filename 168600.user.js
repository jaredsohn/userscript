// ==UserScript==
// @name    Profile Generator
// @description  Generate Profile infomation
// @author    Mr. Anderson
// @include  *hackforums.net/member.php*
// @include  *hackforums.net/member.php/*
// ==/UserScript==

var links = document.getElementsByClassName('largetext');
var name = links[0].innerHTML;
var tt = document.title;
if (name.indexOf("ffcc00") != -1)
{
    var user = name.replace('<strong><span style="color:#ffcc00">','');
    var user2 = user.replace('</span></strong>','');
    var code = '[url=' + document.location.href + '][color=#FFD700][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("0066FF") != -1)
{
    var user = name.replace('<strong><span style="color:#0066FF;">','');
    var user2 = user.replace('</span></strong>','');
    var code = '[url=' + document.location.href + '][color=#0066FF][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("4DD0FC") != -1)
{
    var user = name.replace('<strong><span style="color: #4DD0FC;"><strong>','');
    var user2 = user.replace('</strong></span></strong>','');
    var code = '[url=' + document.location.href + '][color=#4DD0FC][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("00FF00") != -1)
{
    var user = name.replace('<strong><span style="color: #00FF00;"><strong>','');
    var user2 = user.replace('</strong></span></strong>','');
    var code = '[url=' + document.location.href + '][color=#00FF00][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("color:#000") != -1)
{
    var user = name.replace('<strong><span style="color:#000">','');
    var user2 = user.replace('</span></strong>','');
    var code = '[url=' + document.location.href + '][color=black][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("383838") != -1)
{
    var user = name.replace('<strong><span style="color:#383838">','');
    var user2 = user.replace('</span></strong>','');
    var code = '[url=' + document.location.href + '][color=#383838][b]' + user2 + '[/b][/color][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else if(name.indexOf("style=") != -1)
{
    var user = tt.replace('Hack Forums - Profile of ','');
    var code = '[url=' + document.location.href + '][b]' + user + '[/b][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}
else
{
    var user = name.replace('<strong>','');
    var user2 = user.replace('</strong>','');
    var code = '[url=' + document.location.href + '][b]' + user2 + '[/b][/url]';
    var test = '<tr><td class="trow1"><strong>Profile Code:</strong></td><td class="trow1"><input type="text" name="lname" value = "' + code + '" /></td><tr>\n<td class="trow1"><strong>';
    document.body.innerHTML = document.body.innerHTML.replace('<tr>\n<td class="trow1"><strong>', test);

}