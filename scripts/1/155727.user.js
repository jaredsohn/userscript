// ==UserScript==
// @name       POJ Bootstrap
// @namespace  http://wa.vg/
// @version    2013.01.06
// @description  POJ Bootstrap
// @match      http://*.poj.org/*
// @match      http://poj.org/*
// @copyright  2013 Jebwiz Oscar
// ==/UserScript==
    
    var allT, thisT, ID;
    allT = document.getElementsByTagName('b');
    ID = allT[0].innerHTML;
    var navbar, newElement;
	allT = document.getElementsByTagName('table');
    navbar = allT[0];
    if (navbar) {
        newElement = document.createElement('div');
        i='<div id="wrapper"><link rel=stylesheet href="http://wetta.in/template/classic/hoj.css" type="text/css"><link href="http://wetta.in/bootstrap/assets/css/bootstrap.css" rel="stylesheet"><link href="http://wetta.in/bootstrap/assets/css/bootstrap-responsive.css" rel="stylesheet"><link href="http://wetta.in/template/classic/style.css" rel="stylesheet" type="text/css" /><div id="leftnav" tabindex="-1"><nav><div class="profile"> <div class="profile_wrap"> <span class="username" id="REPME">= =</span> <span class="tagline"></span> <div class="avatar"> <img src=http://www.gravatar.com/avatar/9c96c3a4c822cc9e4e7af77661ad395d?s=80&d=mm&r=g width="45" height="45"> <span class="avatar_mask"></span> </div> </div></div><ul class="nav nav-list"> <li class="nav-header"> Online Judge </li> <li> <a href="./"> <i class="icon-home icon-white"></i> &#39318;&#39029; </a> </li> <li> <a href="./problemlist"> <i class="icon-question-sign icon-white"></i> &#38382;&#39064; </a> </li> <li> <a href="pastcontests"> <i class="icon-fire icon-white"></i> &#27604;&#36187; </a> </li> <li> <a href="status"> <i class="icon-th-large icon-white"></i> &#29366;&#24577; </a> </li> <li> <a href="bbs"> <i class="icon-comment icon-white"></i> &#35752;&#35770; </a> </li> <li> <a href="userlist"> <i class="icon-list icon-white"></i> &#25490;&#21517; </a> </li> <li> <a href=http://www.wetta.in:9090/?&channels=chat&uio=d4 target="_blank"> <i class="icon-comment icon-white"></i> 在线 IRC </a> </li><li> <a href="./submit" target="_blank"> <i class="icon-edit icon-white"></i> 提交问题</a> </li><li> <a href="./archive" target="_blank"> <i class="icon-refresh icon-white"></i> 打包代码</a> </li> </ul><div class="sep"></div><div class="copyright"> &copy; 2013 <a href="http://wetta.in">Wetta OJ Style</a><br />Made by <a href="http://wa.vg">Jebwiz J. Oscar</a><script type="text/javascript"> var _gaq = _gaq || []; _gaq.push(["_setAccount", "UA-20909424-1"]); _gaq.push(["_setDomainName", "none"]); _gaq.push(["_setAllowLinker", true]); _gaq.push(["_trackPageview"]); (function() { var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true; ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s); })();</script></nav></div><div class="navbar navbar-inverse" style="position: static;"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".subnav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a> <a class="brand" href="#">Wetta OJ</a> <div class="nav-collapse subnav-collapse"> <ul class="nav"> <li class="active"><a href="index">Home</a></li> <li><a href="problemset?page=1">ProblemSet</a></li> <li><a href="ranklist">Ranking</a></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">More...<b class="caret"></b></a> <ul class="dropdown-menu"> <li class="nav-header">SETTINGS</li> <li><a href="modifypage">Profile</a></li> <li><a href="preferences">Preferences</a></li> </ul> </li> </ul> <form class="navbar-search pull-left" action="problemset"> <input type="text" action="problemset" name="search" class="search-query span2" id="Searchbar" placeholder="Search"> </form> <ul class="nav pull-right"> <li><div class="btn-group"><a class="btn btn-primary" id="REP01" href="#"><i class="icon-user icon-white"></i><span id="REP02">= =</span></a></div></li> </ul> </div><!-- /.nav-collapse --> </div> </div><!-- /navbar-inner --> </div><!-- /navbar --> </div> <script src="http://wetta.in/bootstrap/assets/js/bootstrap.min.js"></script> <script src="http://wetta.in/bootstrap/assets/js/jquery.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-transition.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-alert.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-modal.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-dropdown.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-scrollspy.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-tab.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-tooltip.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-popover.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-button.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-collapse.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-carousel.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-typeahead.js"></script>  <script src="http://wetta.in/bootstrap/assets/js/bootstrap-affix.js"></script>';
        newElement.innerHTML=i;
        navbar.parentNode.insertBefore(newElement, navbar);
    }
	allT = document.getElementsByTagName('table');
	thisT=allT[1];
    thisT.parentNode.removeChild(allT[1]);
	thisT=allT[0];
    thisT.parentNode.removeChild(allT[0]);
	var theImage, altText;
    theImage = document.getElementById('REPME');
    theImage.innerHTML=ID;
    theImage = document.getElementById('REP02');
    theImage.innerHTML=ID;
    var a = document.getElementById('REP01');
        a.href = './userstatus?user_id='+ID;