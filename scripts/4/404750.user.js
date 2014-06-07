// ==UserScript==
// @name       Mantis Plus
// @namespace  http://vevtjener-2.hist.no/oan/mantisplus/
// @version    1.0.19
// @description Small tweaks and shortcuts for mantis.
// ALT + J = Jump to ticket
// ALT + N = New ticket
// ALT + M = My view
// @match      https://mantis.hist.no/*
// @copyright  2014+, Øyvind Nilsen
// ==/UserScript==

GM_addStyle ( "                                     \
    body {                                   \
        background: url('http://vevtjener-2.hist.no/oan/mantisplus/dc.jpg') no-repeat center center fixed !important; \
        -webkit-background-size: cover !important;  \
        -moz-background-size: cover !important;     \
        -o-background-size: cover !important;       \
        background-size: cover !important;          \
    }  												\
    td {  											\
            opacity:0.9;  							\
			border:1px,solid,black;					\
    }  												\
    table {  										\
			border:1px,solid,black;					\
    }  												\
	a {												\
		text-decoration:none;						\
		font-weight:bold;							\
	}												\
    a:hover {										\
		color:red;									\
		font-weight:bold;							\
	}												\
	a.resolved {										\
			text-decoration: none;					\
             text-decoration: line-through;			\
             font-weight:bold;						\
    }												\
	.menu a {										\
		color:#000;									\
		padding:5px;								\
    }												\
	.menu a:hover {									\
		background-color:#fff;						\
		color:#000;									\
		padding:5px;								\
    }												\
.menu a:visited {									\
		color:#000;									\
		padding:5px;								\
    }												\
.tr {									\
		border:1px solid black;								\
    }												\
" );

var images = document.getElementsByTagName('img');
for (var n = images.length; n--> 0;) {
  var img = images[n];
    if(img.getAttribute("src") == "/images/mantis_logo.gif") {
  		img.setAttribute("src", "http://vevtjener-2.hist.no/oan/mantisplus/hl.png");
    } else if (img.getAttribute("src") == "/images/mantis_logo.png") {
        img.setAttribute("src", "http://vevtjener-2.hist.no/oan/mantisplus/hl.png");
    }
}

(function(){
document.addEventListener('keydown', function(e) {
   //alert(e.keyCode);
  // pressed alt+g
  if (e.keyCode == 78 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
   window.location.href = "bug_report_page.php";
  } else if (e.keyCode == 74 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      var saksnr = window.prompt("Saksnummer","");
      if(saksnr != "") {
      	window.location.href = "view.php?id=" + saksnr;
      }
  } else if (e.keyCode == 77 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      window.location.href = "my_view_page.php";
  } else if (e.keyCode == 73 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
      window.location.href = "view_all_bug_page.php"; 
  }
}, false);
})();

	var loginInfoMiddle = document.getElementsByClassName("login-info-middle");
    var mantisplusinfo = "<span style='background-color:#E5E5E5; font-size:smaller;'><strong>New Ticket:</strong> ALT+N&nbsp;<strong><br />Jump to ticket:</strong> ALT+J<br /><strong>Go to my view:</strong> ALT+M<br /><strong>View issues:</strong> ALT+I</span>";
    loginInfoMiddle[0].innerHTML = mantisplusinfo;
	
	var loginInfoLeft = document.getElementsByClassName("login-info-left");
	var mpLogo = "<img src='http://vevtjener-2.hist.no/oan/mantisplus/mp_logo.png' />";
	loginInfoLeft[0].innerHTML = mpLogo;