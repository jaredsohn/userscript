// ==UserScript==
// @name       		Automatic FacebookNavBar Scroller
// @version    		1.2
// @include        	http://*.facebook.*
// @include        	https://*.facebook.*
// @copyright  		2012+, Christoper Koch
// ==/UserScript==

// Correct Searchbutton
if($button = document.getElementsByTagName('button')[0]){
    if($button != null)
		$button.style.backgroundPosition = "0 -22px";
}

// Movable Navbar
$scroll = true;
if($navbar = document.getElementById('leftCol')){
    $navbar.onmouseover = function() {
      $scroll = false;
    };
    $navbar.onmouseout = function() {
      $scroll = true;
    };
    window.addEventListener('scroll', function() { if($scroll){$navbar.style.marginTop = document.body.scrollTop + "px";} }, false);
    $navbar.style.setProperty("-webkit-transition", "margin 0.5s ease-in-out");
    $navbar.style.setProperty("-o-transition", "margin 0.5s ease-in-out");
    $navbar.style.setProperty("-moz-transition", "margin 0.5s ease-in-out");
}