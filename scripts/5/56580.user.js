// ==UserScript==
// @name	Mousehunt Jerry
// ==/UserScript==

function newcountdown(ttime)
{

if (ttime == null)
        {
        ttime = prompt("I'm gonna sound the horn in ___ minutes.",default_min);
        if (ttime == null)
                return;
        }
minutes = ttime;
seconds=0;

//seconds=5, minutes=0; //FOR DEBUGGING

n_run++;
countdown(n_run);
}
function resize_mousehunt()
{
//scrolling=yes
//str = window.screen.availHeight + " " + window.screen.height;
//document.getElementById("mh_frame").style.width = document.body.clientWidth-120;
//document.getElementById("mh_frame").style.height = document.body.clientHeight;
//document.body.clientWidth-120;
}
function countdown(x)
{
if (x<n_run)
        return;
if (seconds==0)
        {
        if (minutes==0)
                {

                var is_auto_restart, is_confirm, is_sound;
                is_auto_restart = document.getElementById("form_auto_restart").checked;
                is_confirm = document.getElementById("form_confirm").checked;
                is_sound = document.getElementById("form_sound").checked;

                

                if (is_sound)
                        DHTMLSound("mousehunt_horn_timer_sound1.wav");

                var tmp=true;
                if (is_confirm)
                        tmp = confirm("It's time to sound the horn!\nDo you want to sound it now?");
                if (tmp)
                        document.getElementById("mh_frame").src = "http://apps.facebook.com/mousehunt/soundthehorn.php";
                
                if (is_auto_restart)
                        {
                        minutes=default_min;
                        seconds=5;
                        }
                else
                        return;
                }       
        else
                {
                minutes--;
                seconds=59;
                }
        }
else seconds--;

document.getElementById("minutes").innerHTML=minutes;
document.getElementById("seconds").innerHTML=(seconds<=9)? "0"+seconds:seconds;

setTimeout("countdown("+x+")",1000);
        
} 
function reduce_min() {
if (minutes<=0)
        return;
minutes--;
document.getElementById("minutes").innerHTML=minutes;
}
function add_min() {
minutes++;
document.getElementById("minutes").innerHTML=minutes;
}
function reload_frame()
{

//document.frames["mh_frame"].location.href=document.frames["mh_frame"].location.href; 

/*
var tmp=document.getElementById('mh_frame');
alert(tmp.src);
tmp.contentWindow.location.reload(true);*/

alert(document.getElementById('mh_frame').location.href);

}

function validate_input(){
	
	
	}

</script>
<style type="text/css">
html, body, table, input {
  overflow-y: none;
  margin: 0;
  padding: 0;
  font-family: Arial;
  font-size:8pt;
}
a:hover {color:red}
a:visited {color:blue}
label:hover {color:red}
.nou
{
text-decoration:none;
font-weight:bold;
font-size:20pt;
font-family:Courier;
line-height:10pt;
}
.pootopic
{color:brown;font-size:12pt;font-weight:bold;width:100%;background:#AAAACC;
text-align:center;}
</style>
<link rel="shortcut icon" href="http://furoma.com/favicon.ico">
</head>
<body bgcolor="#DDFFFF" scroll="no">
<table cellpadding="0" cellspacing="0" border="0" width="100%" height="100%">

<tr>
<td width="120" valign="top" style="text-align:center" height="250">
<center>
<table cellpadding="0" cellspacing="0" border="0">
<tr>
<td rowspan="2"><a target="_self" href="javascript:newcountdown(default_min);" style="font-size:40px;text-decoration:none">
<span id="minutes">15</span>:<span id="seconds">00</span></a></td>
<td style="text-align:right" valign="center"><a target="_self" href="javascript:add_min();" class="nou">+</a></td>
</tr>
<tr>
<td style="text-align:right" valign="top"><a target="_self" href="javascript:reduce_min();" class="nou">-</a></td>
</tr>

</table>
</center>

<div class="pootopic"><a target="_self" href="javascript:newcountdown(minutes);" style="text-decoration:none;">Count Down</a></div>
[<a target="_self" href="javascript:newcountdown(15);"><b>15min</b></a> | <a target="_self" href="javascript:newcountdown();"><b>specify</b></a>]<br>

<!--<FONT color=#888833>Default: <SPAN id=text_default_min>15</SPAN> min</FONT>-->

<div class="pootopic">Settings <a style="text-decoration:none;"href="mousehunt_horn_timer_sidebar_home.html#settings" target="mh_frame">[?]</a></div>

<input type="checkbox" id="form_auto_restart"> <label for="form_auto_restart">Auto restart</label><br>

<input type="checkbox" id="form_sound"> <label for="form_sound">Alarm sound</label>

<div class="pootopic">Links</div>

<a target="mh_frame" href="http://furoma.com/">Pooflinger's Home</a><br>

<a target="mh_frame" href="http://furoma.com/mousehunt_log_summarizer.html">Log Summarizer</a><br>
<a target="mh_frame" href="http://furoma.com/mousehunt_tariff_calculator.html">Tariff Calculator</a><br>
<a target="mh_frame" href="http://furoma.com/mousehunt_travel_planner.html">Travel Planner</a><br>
<a target="mh_frame" href="http://userscripts.org/scripts/show/37906">FB Enhancer</a><br>
<a target="mh_frame" href="http://www.facebook.com/pooflinger">Become a Fan</a><br>
<br>

<a rel="nofollow" href="http://apps.facebook.com/mousehunt" target="mh_frame">MouseHunt App</a>
<br /><br />

<div class="pootopic">Greetings</div>

<font color="darkred">New design!</font><br>
<i><font color="#456324">(Thanks to<br>Nikola Marchev.)</font></i><br>
<font color="darkred">And New features!</font><br>
What do you think? 
<a rel="nofollow" target="mh_frame" href="http://www.facebook.com/topic.php?uid=57594747552&amp;topic=6574">Feedback here</a><br>
<br>
Best viewed in 
<a rel=nofollow target=mh_frame href=http://www.mozilla.com/firefox?from=sfx&uid=252824&t=323>Firefox</a>

<td rowspan=3><iframe src="http://furoma.com/game_zone.html" width="100%" height="100%" id="mh_frame" name="mh_frame" height=0 frameborder=0></iframe

<!--http://www.google.com/webhp?client=pub-3162168876889894-->


<TR><TD width=120 height=50 valign=bottom style=text-align:center>

<!--
<FORM style="margin:0; padding:0" action="http://www.google.com/search" method=get target="mh_frame">
<INPUT type=text name=q style=font-size:10pt;font-family:Arial;width:100;> 
<INPUT type=hidden name=client value=pub-3162168876889894>
<INPUT type=submit value="Google Search" style=font-size:10pt;font-family:Arial;width:100>
</FORM>
</A>


<INPUT type=button onclick=reload_frame() value=Reload>
-->

</TABLE>






<script type="text/javascript">
/*
var i, str="";
for (i in document.getElementById("sound1"))
str += i + " ";
alert(str);
*/

function DHTMLSound(surl) {



document.getElementById("dummyspan").innerHTML=
	"<embed src='"+surl+"' hidden=true autostart=true />";

//setTimeout("DHTMLSound('"+surl+"',"+(loop-1)+")", 2000);
}
</script>

<span id=dummyspan><embed src=mousehunt_horn_timer_sound1.wav
hidden=true autostart=false /></span>

<!-- cache the sound file -->

<!--http://www.phon.ucl.ac.uk/home/mark/audio/play.htm-->


<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
try {
var pageTracker = _gat._getTracker("UA-7265951-2");
pageTracker._trackPageview();
} catch(err) {}
</script>
</body></html>