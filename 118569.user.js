// ## Greasemonkey Metadata ###########################################
// ==UserScript==
// @name          Truth Fighter Broadcast
// @namespace     http://userscripts.org/users/frantoniio
// @description   Truth Fighter Forum
// ==/UserScript==
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<style type="text/css">
<!--
body {
	font: Verdana;
	margin: 0;
	padding:0;
	color:#000;
}
ul, ol, dl {
	padding: 0;
	margin: 0;
}
h1, h2, h3, h4, h5, h6, p {
	margin-top: 0;
	font:Arial;
	font-size:18px;
}
a img {
	border: none;
}
a:link {
	color: #42413C;
	text-decoration: underline;
}
a:visited {
	color: #6E6C64;
	text-decoration: underline;
}
a:hover, a:active, a:focus {
	text-decoration: none;
}
.container {
	width: 500px;
	margin:0px;
}
.content {
	margin:0px;
}
.clearfloat {
	clear:both;
	height:0;
	font-size: 1px;
	line-height: 0px;
}
.space {
	height: 35px;
}

-->
</style>

</head>
<body>
<div class="container">
  <div class="content">
    <h1>My Streaming App</h1>
    <!-- Replace this Ustream embed code with your own -->
    <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="450" height="278" id="utv577896">
      <param name="flashvars" value="autoplay=false&amp;brand=embed&amp;cid=7289379&amp;v3=1"/>
      <param name="allowfullscreen" value="true"/>
      <param name="allowscriptaccess" value="always"/>
      <param name="movie" value="http://www.ustream.tv/flash/viewer.swf"/>
      <embed flashvars="autoplay=false&amp;brand=embed&amp;cid=7289379&amp;v3=1" width="450" height="278" allowfullscreen="true" allowscriptaccess="always" id="utv577896" name="utv_n_442202" src="http://www.ustream.tv/flash/viewer.swf" type="application/x-shockwave-flash" />
    </object>
    <!-- /End Ustream embed code here -->
    
    <div class="space"></div>
    
    <!-- The follow code is the Facebook Social Plug-In - Live Stream -->
    <div id="fb-root"></div>
    <script src="http://connect.facebook.net/en_US/all.js#appId=203507236332003&amp;xfbml=1"></script>
    <fb:live-stream event_app_id="203507236332003" width="450" height="400" always_post_to_friends="true"></fb:live-stream>
    <!-- end Live Stream --> 
    
  </div>
</div>
<div id="fb-root"></div>
</body>
</html>