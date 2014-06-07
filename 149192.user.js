// ==UserScript==
// @name        Login
// @namespace   http://printing.arc.losrios.edu/DSF/storefront*
// @description Log in 4,2,1
// @include     http://printing.arc.losrios.edu/DSF/storefront*
// @include        http://printing.arc.losrios.edu/DSF/storefront.aspx
// @include        http://printing.arc.losrios.edu/DSF/Login*
// @include        http://printing.arc.losrios.edu/DSF/Admin/AdminHome.aspx*
// @version     1
// ==/UserScript==

//	document.getElementById("ctl00_ctl00_C_W__loginWP__myLogin__userNameTB").focus();

(function() {
  document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if ( key == 115 ) { 
	document.getElementById('ctl00_ctl00_C_W__loginWP__myLogin__userNameTB') .value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
//	alert("Test 1");
	document.getElementById('ctl00_ctl00_C_W__loginWP__myLogin__passwordTB') .value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
//	alert("Test 2");
	document.getElementById('ctl00_ctl00_C_W__loginWP__myLogin_Login').click();
    }
    if ( key == 27 ) { //escape
	document.getElementById('ctl00_ctl00_TopMessage_logoutHL').click();
    }
    if ( key == 113 ) { //F2
		(function admin() {
		a=document.getElementsByTagName("a")[15];
		b = a.getAttribute("href");
			if (b =="Admin/AdminHome.aspx") {
			a.click();
			}
			if (b !=="Admin/AdminHome.aspx") {
			c=document.getElementsByTagName("a")[16];
			b = c.getAttribute("href");
				if (b =="Admin/AdminHome.aspx") {
				c.click();
				}
				else {
				alert("Can't Find Administration button!");
  				} 
			}
		})();
    }
    if ( key == 112 ) { //F1
	document.getElementById('ctl00_ctl00_C_M_HyperLinkOperatorView2').click();
    }
  }, true);

})();

