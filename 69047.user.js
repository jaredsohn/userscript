// ==UserScript==
// @name           Facebook '06
// @description   Facebook format in 2006.
// @version        1.0
// @author         Matt Besser

// ==/UserScript==
//
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" id="facebook">
<head>
<BASE HREF="http://www.facebook.com.wstub.archive.org/">

<title>Facebook | Welcome to Facebook!</title>
<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="http://web.archive.org/web/20060101042432/http://www.facebook.com/css/facebook.css" type="text/css" />
<link rel="stylesheet" href="http://web.archive.org/web/20060101042432/http://www.facebook.com/css/info.css" type="text/css" />
<link rel="stylesheet" href="http://web.archive.org/web/20060101042432/http://www.facebook.com/css/auxiliary.css" type="text/css" />
<!--[if IE]><style type="text/css" media="screen">/* <![CDATA[ */ @import url(http://www.facebook.com/css/ie.css); /* ]]> */</style><![endif]-->
<script type="text/javascript" src="http://web.archive.org/web/20060101042432js_/http://www.facebook.com/js/facebook.js"></script>
<link rel="shortcut icon" href="http://web.archive.org/web/20060101042432/http://www.facebook.com/favicon.ico" />
</head>
<body onload="runOnload();">

<div id="book">
<div id="pageheader">
<h1 id="homelink"><a href="/">Facebook</a></h1>
<ul id="gnav">
<li><a href='http://www.facebook.com/login.php'>login</a></li>
<li><a href="http://www.facebook.com/register.php">register</a></li><li><a href='http://www.facebook.com/about.php'>about</a></li>
<li><a href='http://www.facebook.com/help.php'>help</a></li>
</ul>
</div>

<div id="sidebar">
<div id="squicklogin">
  <form method="post" name="loginform" action="http://www.facebook.com/login.php">
    <label for="email">E-mail:</label>
    <input type="hidden" name="noerror" value="1" />
    <input class="inputtext" type="text" name="email" value="" id="email" size="20" />
    <label for="pass">Password:</label>
    <input class="inputtext" type="password" name="pass" id="pass" size="20" />
    <div class="buttons"><input type="submit" class="inputsubmit" value="Login" id="doquicklogin" name="doquicklogin"/>&nbsp;<input type="button" class="inputsubmit" value="Register" id="doquickregister" name="doquickregister" onclick="javascript:document.location='http://www.facebook.com/register.php';" /></div>
  </form>
</div>
<div id="ssponsor"></div></div>
<div id="pagebody">
<div id="header">
  <h1>Welcome to Facebook!</h1>
</div>
<div id="content">
<!-- 2365fa3194ecdc0cab15721ce967a9f8663937c7 -->
<script language="javascript" type="text/javascript">
  function runOnload() {
    var email = getElement("email");
    var pass = getElement("pass");
    var dologin = getElement("doquicklogin");
    if (email && pass) {
      if (email.value != "" && pass.value == "") {
        pass.focus();
      } else if (email.value == "") {
        email.focus();
      } else if (email.value != "" && pass.value != "") {
        dologin.focus();
      }
    }
  }
</script>

<div class="infocontent">

<p><strong>Facebook is an online directory that connects people through social networks at schools.</strong></p>
<p>Now there are two Facebooks: one for people in <strong>college</strong> and one for people in <strong>high school</strong>.

<p>The site is open to <a href='schools.php'>a lot of schools</a>, but not everywhere yet. We're working on it.</p>

<p>You can use Facebook to:</p>
<ul class="bulletpoints">
  <li><span>Look up people at your school.</span></li>
  <li><span>See how people know each other.</span></li>
  <li><span>Find people in your classes and groups.</span></li>
</ul>
<div class="center" style="width:150px;"><input type="button" id="login" name="login" onclick="loginform.submit()" class="inputbutton" value="Login" />&#8194;<input type="button" id="register" name="register" onclick="document.location='register.php'" class="inputbutton" value="Register" /></div></div>

</div>
<!-- content -->

<div id="pagefooter">
<ul id="fnav">
<li><a href="http://www.facebook.com/about.php">about</a></li>
<li><a href="http://www.facebook.com/jobs.php">jobs</a></li>
<li><a href="http://www.facebook.com/media.php">advertise</a></li>
<li><a href="http://www.facebook.com/terms.php">terms</a></li>
<li><a href="http://www.facebook.com/policy.php">privacy</a></li>
</ul>
  <p>a Mark Zuckerberg production</p>
  <p>Facebook <span title="3">&copy;</span> <span title="10.1.0.40">20</span><span title="354272">05</span></p>
</div>

</div>
<!-- book -->

<!-- ads -->
<div style="width: 760px; text-align: center; clear: both; margin: 10px auto 15px auto;">
</div>
<!-- ads -->

</body>

<!-- SOME SCRIPT SRC'S ON THIS PAGE HAVE BEEN REWRITTEN BY THE WAYBACK MACHINE
OF THE INTERNET ARCHIVE IN ORDER TO PRESERVE THE TEMPORAL INTEGRITY OF THE SESSION. -->


<!-- SOME LINK HREF'S ON THIS PAGE HAVE BEEN REWRITTEN BY THE WAYBACK MACHINE
OF THE INTERNET ARCHIVE IN ORDER TO PRESERVE THE TEMPORAL INTEGRITY OF THE SESSION. -->


<SCRIPT language="Javascript">
<!--

// FILE ARCHIVED ON 20060101042432 AND RETRIEVED FROM THE
// INTERNET ARCHIVE ON 20100215174530.
// JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.
// ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
// SECTION 108(a)(3)).

   var sWayBackCGI = "http://www.facebook.com/";

   function xResolveUrl(url) {
      var image = new Image();
      image.src = url;
      return image.src;
   }
   function xLateUrl(aCollection, sProp) {
      var i = 0;
      for(i = 0; i < aCollection.length; i++) {
         var url = aCollection[i][sProp];         if (typeof(url) == "string") { 
          if (url.indexOf("mailto:") == -1 &&
             url.indexOf("javascript:") == -1
             && url.length > 0) {
            if(url.indexOf("http") != 0) {
                url = xResolveUrl(url);
            }
            url = url.replace('.wstub.archive.org','');
            aCollection[i][sProp] = sWayBackCGI + url;
         }
         }
      }
   }

   xLateUrl(document.getElementsByTagName("IMG"),"src");
   xLateUrl(document.getElementsByTagName("A"),"href");
   xLateUrl(document.getElementsByTagName("AREA"),"href");
   xLateUrl(document.getElementsByTagName("OBJECT"),"codebase");
   xLateUrl(document.getElementsByTagName("OBJECT"),"data");
   xLateUrl(document.getElementsByTagName("APPLET"),"codebase");
   xLateUrl(document.getElementsByTagName("APPLET"),"archive");
   xLateUrl(document.getElementsByTagName("EMBED"),"src");
   xLateUrl(document.getElementsByTagName("BODY"),"background");
   xLateUrl(document.getElementsByTagName("TD"),"background");
   xLateUrl(document.getElementsByTagName("INPUT"),"src");
   var forms = document.getElementsByTagName("FORM");
   if (forms) {
       var j = 0;
       for (j = 0; j < forms.length; j++) {
              f = forms[j];
              if (typeof(f.action)  == "string") {
                 if(typeof(f.method)  == "string") {
                     if(typeof(f.method) != "post") {
                        f.action = sWayBackCGI + f.action;
                     }
                  }
              }
        }
    }


//-->
</SCRIPT>

</html>