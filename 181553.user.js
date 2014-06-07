// ==UserScript==
// @name            MyGCC
// @version         1.0.2
// @author          AwM4J
// @description     Converts MyGCC into something useable.
// @domain          my.gcc.edu
// @domain          www.my.gcc.edu
// @domain          my.gcc.edu
// @include         http://my.gcc.edu/ICS*
// @include         https://my.gcc.edu/ICS*
// @include         http://my.gcc.edu/ics*
// @include         https://my.gcc.edu/ics*
// @run-at          document-start
// @priority        9001
// @require 		http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//Allows the user to add style sheets to to site
function addStyleSheet(url){var inj = document.getElementsByTagName('head')[0];var newCsss = document.createElement('link');newCsss.rel = "stylesheet";newCsss.href = url;inj.appendChild(newCsss);}
//addStyleSheet("//netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css"); //Adds Bootstrap

//Allows the user to define css to add from the script
function addCss(cssString){var inj = document.getElementsByTagName('head')[0];var newCsss = document.createElement('style');newCsss.type = "text/css";newCsss.innerHTML = cssString;inj.appendChild(newCsss);}

addCss ( 
    '#errorMessage{\
    	margin:0px !important;\
    }#TargetedMessage{\
    	margin:0px !important;\
		background-color: #fff;\
		background-image: url("http://www.gcc.edu/_layouts/GCC/Images/logo.gif") !important;\
		background-position: 10px center !important;\
		background-repeat: no-repeat;\
		height: inherit !important;\
		text-align: right !important;\
    }#TargetedMessage img{\
    	margin:0px !important; \
    	border: 0px !important; \
    	////width:100% !important;\
		padding-bottom: 5px;\
		border-radius:10px;\
	}#userLogin{\
		width:inherit !important;\
    }body{\
    	background:transparent !important;\
		margin: 0px;\
		padding:0px;\
    }#DivStaffQuickSearch{\
    	top:0 !important; \
		right:0px !important;\
		left: inherit !important; \
		position: absolute !important;\
		background-color: #4e0202;\
        border-bottom-left-radius: 15px;\
		margin: 0px !important;\
		height: 33px !important;\
    }#masthead{\
    	height:40px !important;\
		margin:0 !important;\
    }#masthead h1{\
    	height: inherit !important;\
    	////background: #555 url("http://3.bp.blogspot.com/-c8nwn7cf9hY/UQ3imtcHtWI/AAAAAAAAAGM/80WY_b5bJaE/s1600/IMG_0847.JPG") center no-repeat !important; \
    	////background-position-y: 20px !important; \
		////background-color: #555 !important;\
    	////background-position-x: 0px !important;\
		////background-size: 100% !important;\
		background-image: url("") !important;\
		background-position: left center !important;\
		margin:0 !important;\
		padding-bottom:5px !important;\
	}#masthead h1 a{\
		height: inherit !important;\
		width: inherit !important;\
		margin:0 !important;\
	}#form1{\
		padding: 8px !important;\
	}#welcomeBackBar{\
        color: #fff;\
        background: #4e0202;\
        height: inherit !important;\
        position: absolute;\
        top: 0;\
        left: 0;\
        border-bottom-right-radius: 15px;\
        margin: 0px !important;\
        padding: 10px;\
	}#thisContext{\
		background-image: url("") !important;\
		padding: 0px !important;\
    }#thisContext h2{\
		display: none !important;\
	}.contexts{\
    	padding:0 !important;\
    	margin:0 !important;\
    }#subContexts{\
    	padding:0 !important;\
    	margin:0 !important;\
    }#pageTitle{\
		display: none !important;\
	}#headerTabs{\
		top: inherit !important;\
	}'
);
function open(){
var snapClosed = document.evaluate("//*[@class='closed']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapClosed.snapshotLength - 1; i >= 0; i--) {
		var elm = snapClosed.snapshotItem(i);
		elm.setAttribute("class","open");
}}
window.setTimeout(open, 3000);
function replaceTimeCardLink(){
var snapClosed = document.evaluate("//*[@href='./Timecard_Entry/']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapClosed.snapshotLength - 1; i >= 0; i--) {
		var elm = snapClosed.snapshotItem(i);
		elm.setAttribute("href","Timecard_Entry/Default_Page.jnz?portlet=Timecard");
}}
window.setTimeout(replaceTimeCardLink, 2500);