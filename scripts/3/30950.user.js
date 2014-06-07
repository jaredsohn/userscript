// ==UserScript==
// @name           Orkut  Fonts Style
// @description    Writes text with different Font Styles,Visit Vevin.com  for details on How to Use This Scripts To Change Orkut Fonts
// @namespace      http://www.vevin.com
// @include        http://www.orkut.com/CommMsgPost*
// @include        http://www.orkut.com/Scrapbook*
// @include        http://www.orkut.co.in/CommMsgPost*
// @include        http://www.orkut.co.in/Scrapbook*
// @include        http://www.orkut.com.br/CommMsgPost*
// @include        http://www.orkut.com.br/Scrapbook*
// @author         Mr. Vevin.com
// ==/UserScript==

function font(){
var txt=document.getElementsByTagName("textarea").item(0);
var obj2 = document.getElementById("google0");
var pto = obj2.options[obj2.selectedIndex].value;

if (pto==1){
txt.value=txt.value.replace(/A/gi,"Ã…");
txt.value=txt.value.replace(/B/gi,"ÃŸ");
txt.value=txt.value.replace(/C/gi,"Â©");
txt.value=txt.value.replace(/D/gi,"Ã");
txt.value=txt.value.replace(/E/gi,"Ã‹");
txt.value=txt.value.replace(/F/gi,"Æ’");
txt.value=txt.value.replace(/i/gi,"Ã®");
txt.value=txt.value.replace(/s/gi,"Â§");
txt.value=txt.value.replace(/o/gi,"Ã¸");
txt.value=txt.value.replace(/u/gi,"Âµ");
txt.value=txt.value.replace(/r/gi,"Â®");
}
if (pto==2){
txt.value=txt.value.replace(/a/gi,"à¸„");
txt.value=txt.value.replace(/b/gi,"ÃŸ");
txt.value=txt.value.replace(/N/gi,"Ð¸");
txt.value=txt.value.replace(/t/gi,"Ñ‚");
txt.value=txt.value.replace(/E/gi,"Ñ”");
txt.value=txt.value.replace(/f/gi,"Æ’");
txt.value=txt.value.replace(/p/gi,"Ã¾");
txt.value=txt.value.replace(/s/gi,"à¸£");
txt.value=txt.value.replace(/o/gi,"Ïƒ");
txt.value=txt.value.replace(/m/gi,"Ð¼");
txt.value=txt.value.replace(/r/gi,"Ñ");
}

if (pto==3){
txt.value=txt.value.replace(/a/gi,"áº©");
txt.value=txt.value.replace(/b/gi,"Î²");
txt.value=txt.value.replace(/N/gi,"Ð¹");
txt.value=txt.value.replace(/t/gi,"Ñ‚");
txt.value=txt.value.replace(/E/gi,"Ä“");
txt.value=txt.value.replace(/f/gi,"Æ’");
txt.value=txt.value.replace(/p/gi,"Ãž");
txt.value=txt.value.replace(/s/gi,"ÅŸ");
txt.value=txt.value.replace(/o/gi,"â—Š");
txt.value=txt.value.replace(/m/gi,"Ð¼");
txt.value=txt.value.replace(/r/gi,"Å™");
}
if (pto==4){
txt.value=txt.value.replace(/a/gi,"Î±");
txt.value=txt.value.replace(/b/gi,"Ð²");
txt.value=txt.value.replace(/c/gi,"c");
txt.value=txt.value.replace(/d/gi,"âˆ‚");
txt.value=txt.value.replace(/E/gi,"Îµ");
txt.value=txt.value.replace(/f/gi,"Æ’");
txt.value=txt.value.replace(/h/gi,"Ð½");
txt.value=txt.value.replace(/m/gi,"Ð¼");
txt.value=txt.value.replace(/N/gi,"Ï€");
txt.value=txt.value.replace(/o/gi,"Î˜");
txt.value=txt.value.replace(/s/gi,"Å¡");
txt.value=txt.value.replace(/t/gi,"Ï„");
txt.value=txt.value.replace(/u/gi,"Î¼");
txt.value=txt.value.replace(/w/gi,"Ñˆ");
}
if (pto==5){
cor=new Array('aqua','blue','fuchsia','gold','gray','green','lime','maroon','navy','olive','orange','pink','purple','red','silver','teal','violet', 'yellow' );
var z=0;
txt.value=txt.value.replace(/(.)/gi,"Ã‚Â§$1");
txt.value=txt.value.replace(/\Ã‚Â§ /gi," ");
for(y=0;y<txt.value.length;y++){
txt.value=txt.value.replace(/\Ã‚Â§/,'['+cor[z]+']');
z++;
if(z==cor.length){
z=0
}
}
}
if (pto==6){
cor=new Array('u','b','i','u');
var z=1;
txt.value=txt.value.replace(/(.)/gi,"Â§$1");
txt.value=txt.value.replace(/\Â§ /gi," ");
for(y=0;y<txt.value.length;y++)
{
txt.value=txt.value.replace(/\Â§/,'[/'+cor[z-1]+']'+'['+cor[z]+']');
z++;
if(z==cor.length){
z=1;
}
}
}
if (pto==7){
txt.value=txt.value.replace(/a/gi,"Î±");
txt.value=txt.value.replace(/p/gi,"Ï");
txt.value=txt.value.replace(/N/gi,"Ð¸");
txt.value=txt.value.replace(/t/gi,"Å§");
txt.value=txt.value.replace(/E/gi,"Ñ”");
txt.value=txt.value.replace(/u/gi,"Ï‹");
txt.value=txt.value.replace(/h/gi,"Ä¦");
txt.value=txt.value.replace(/s/gi,"Â§");
txt.value=txt.value.replace(/x/gi,"âœ—");
txt.value=txt.value.replace(/g/gi,"ÄŸ");
txt.value=txt.value.replace(/c/gi,"Â¢");
txt.value=txt.value.replace(/f/gi,"Æ’");
txt.value=txt.value.replace(/b/gi,"Î²");
txt.value=txt.value.replace(/w/gi,"ÏŽ");
txt.value=txt.value.replace(/d/gi,"Ä");
txt.value=txt.value.replace(/L/gi,"Å");
txt.value=txt.value.replace(/y/gi,"Ò±");
txt.value=txt.value.replace(/k/gi,"Ò");
txt.value=txt.value.replace(/j/gi,"Äµ");
txt.value=txt.value.replace(/z/gi,"Å¼");
txt.value=txt.value.replace(/o/gi,"Ã¸");
txt.value=txt.value.replace(/m/gi,"Ð¼");
txt.value=txt.value.replace(/r/gi,"Ñ");}}

var a=document.body.innerHTML.match(/return false;">scrap tips<\/a>/);
if (a=="return false;\">scrap tips</a>")
{
document.body.innerHTML=document.body.innerHTML.replace(/scrap tips<\/a>/gi," </a> "+"<span class=\"grabtn\">"+"<a href=\"javascript:void(0);\" class=\"btn\" id=\"submit\">change font</a>"+"</span>"+"<span class=\"btnboxr\">"+"<img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\">"+"</span>"+"&nbsp;<select id=\"google0\" style=\"background-color:ffffff; height:15pt; width:150pt; font-family:Trebuchet MS; font-weight:bold;font-size:9pt\">"+"<option>Select a Font......</option>" + "<option value=\"1\">WÂ®Ã®tÃ‹ LÃ®kÃ‹ ThÃ®Â§</option>" + "<option value=\"2\">WÑiÑ‚Ñ” LikÑ” Ñ‚hià¸£</option>" + "<option value=\"7\">ÏŽÅ™itÑ” ÅiÒÑ” TÄ¦is</option>" + "<option value=\"4\">ÑˆÐ³Î¹Ï„Îµ lÎ¹kÎµ Ï„Ð½Î¹Å¡</option>" + "<option value=\"3\">WÅ™iÑ‚Ä“ LikÄ“ Ñ‚hiÅŸ</option>" + "<option value=\"5\" >(Colour Font)</option>"+ "<option value=\"6\" >(Bold, Italic, Underline...Font)</option>"+"</select>");
}else {
document.getElementsByTagName('div').item(34).innerHTML+="&nbsp;&nbsp;<select id=\"google0\" style=\"background-color:ffffff; height:14pt; font-family:Trebuchet MS; font-weight:bold;font-size:8pt\">"+"<option>Select a Font......</option>" + "<option value=\"1\">WÂ®Ã®tÃ‹ LÃ®kÃ‹ ThÃ®Â§</option>" + "<option value=\"2\">WÑiÑ‚Ñ” LikÑ” Ñ‚hià¸£</option>" + "<option value=\"7\">ÏŽÅ™itÑ” ÅiÒÑ” TÄ¦is</option>" + "<option value=\"4\">ÑˆÐ³Î¹Ï„Îµ lÎ¹kÎµ Ï„Ð½Î¹Å¡</option>" + "<option value=\"3\">WÅ™iÑ‚Ä“ LikÄ“ Ñ‚hiÅŸ</option>" + "<option value=\"5\" >(Colour Font)</option>"+ "<option value=\"6\" >(Bold, Italic,..Font)</option>"+"</select>"+"&nbsp;&nbsp;<span class=\"grabtn\">"+"<a href=\"javascript:void(0);\" class=\"btn\" id=\"submit\">&nbsp;change font&nbsp;</a>"+"</span>"+"<span class=\"btnboxr\">"+"<img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\">"+"</span>";
}
document.getElementById('submit').addEventListener("click", font, true);