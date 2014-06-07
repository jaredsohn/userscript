// ==UserScript==
// @name            MoinMoinKeyBindings
// @namespace       http://wuonm.com/
// @version         1.0
// @author          Julian Romero <julian.romero AT gmail DOT com>
// @include         *moinmo.in*
 
document.addEventListener( "keypress", function (e) { 
var key;
var ch="";
var target;

if (e == null) { // IE
	key = event.keyCode;
    if (event.ctrlLeft) {
        ch  += "ctrl-"
    } 
    target = event.target;
} 
else { // Mozilla
	key = e.which;
    if (e.ctrlKey) {
        ch  += "ctrl-"
    } 
    target = e.target;
}

// stop if we are on a editable element
target = e.target.tagName.toUpperCase();
if ( target == "INPUT" || target == "TEXTAREA" || target == "SELECT" ){
	return true;
}
ch += String.fromCharCode(key)

switch(ch){
	case 'l': 
	    document.getElementById("pagelocation").style.display = "block";
	    break;
	case 'u': 
	    document.getElementById("username").style.display = "block";
	    break;
	case 'n': 
	    document.getElementById("navibar").style.display = "block";
	    break;
	case 's':
	    document.getElementById("searchform").style.display = "block";
	    document.getElementById("searchinput").focus();
	    break;
	case 'i':
	    top.location.href = top.location.href.substr(0,top.location.href.indexOf("?")) + "?action=info";
	    break;
	case 'r':
	    top.location.href = top.location.href.substr(0,top.location.href.indexOf("?")) + "?action=raw";
	    break;
	case 'e':
	    top.location.href = top.location.href.substr(0,top.location.href.indexOf("?")) + "?action=edit";
	    break;
	case 't':
	    uls=document.getElementsByTagName("UL");
	    for(var i=0;i<uls.length;i++){
		    if ( uls[i].className == "editbar" ){
			    uls[i].style.display = "block";
		    }
	    }
	    break;
	default:
}
}, false);

