// Last Updated: 02-09-2012
// By SiNiquity (-Bane)
// 
// == VERSION HISTORY ==
// Version 1.2:
// - Images embedded in script (faster loading time, no external dependencies)

// Version 1.1:
// - Ignore button size is now based on forum skin
// - Removed Ignore thread list in User CP (it's now there by default for all users)
//
// Version 1.0:
// - First created!
// - Added Ignore Thread link to the Thread Tools
// - Added Ignore Thread List link to the User Control Panel
// - Added Ignore Thread link on thread list page
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select script and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Tribalwar Ignore Thread
// @namespace     SiNiquity
// @description   Ignore threads from either the Thread Tools drop-down or from the forum thread list.
// @version       1.2
// @include       http://*tribalwar.com/forums/*
// ==/UserScript==
//

// Part 1: Add Ignore Thread to Thread Tools
// Find Thread Tools drop-down

var adminForm = null;

if(document.getElementById("threadtools")) {
    var i;
    for(i = 0; i < document.forms.length; i++) {
	if(document.forms[i].name == "threadadminform") {
	    adminForm = document.forms[i];
	    break;
	}
    }
}

if(adminForm !== null) {
    // Get threadId
    var threadId = document.getElementById("qr_threadid").value;

    var table = adminForm.firstChild;
    while(table.nodeType != 1) {
	table = table.nextSibling;
    }

    var tbody = table.firstChild;
    while(tbody.nodeType != 1) {
	tbody = tbody.nextSibling;
    }

    // Forum skin detection
    var firstRow = tbody.firstChild;
    while(firstRow.nodeType != 1) {
	firstRow = firstRow.nextSibling;
    }

    var secondRow = firstRow.nextSibling;
    while(secondRow.nodeType != 1) {
	secondRow = secondRow.nextSibling;
    }
    
    var firstCell = secondRow.firstChild;
    while(firstCell.nodeType != 1) {
	firstCell = firstCell.nextSibling;
    }
    
    var firstImg = firstCell.firstChild;
    while(firstImg.nodeType != 1) {
	firstImg = firstImg.nextSibling;
    }
    
    var imgSrc = firstImg.getAttribute("src");
    
    // Default
    var ignoreThreadSrc;
    
    twSkinSubdir = "tw_images";
    tritonSkinSubdir = "triton_images";
    if(imgSrc.indexOf(twSkinSubdir) === 0) {
	// TW Skin
	ignoreThreadSrc = getIgnoreThreadImgTW();
    } else if(imgSrc.indexOf(tritonSkinSubdir) === 0) {
	// Triton Skin
	ignoreThreadSrc = getIgnoreThreadImgTriton();
    } else {
	// Default
	ignoreThreadSrc = getIgnoreThreadImgTriton();
    }
    
    var row = document.createElement("tr");
    tbody.appendChild(row);
    
    var cell = document.createElement("td");
    cell.setAttribute("class", "vbmenu_option vbmenu_option_alink");
    cell.style.cursor = "default";
    cell.addEventListener("mouseover", function(e) { 
	cell.setAttribute("class", "vbmenu_hilite vbmenu_hilite_alink");
	cell.style.cursor = "pointer";
    }, false);
    cell.addEventListener("mouseout", function(e) {
	cell.setAttribute("class", "vbmenu_option vbmenu_option_alink");
	cell.style.cursor = "default";
    }, false);
    row.appendChild(cell);

    var img = document.createElement("img");
    img.setAttribute("class", "inlineimg");
    img.setAttribute("alt", "Ignore");
    img.setAttribute("src", ignoreThreadSrc);
    img.setAttribute("title", "Ignore this Thread");
    cell.appendChild(img);

    cell.appendChild(document.createTextNode(" "));

    var link = document.createElement("a");
    link.setAttribute("rel", "nofollow");
    link.setAttribute("href", "profile.php?do=ignorethread&threadid=" + threadId);
    cell.appendChild(link);

    var linkText = document.createTextNode("Ignore this Thread");
    link.appendChild(linkText);

} 


// Get threadlist
var threadlist = document.getElementById("threadslist");
if(threadlist) {
    // Get headers
    var headers = threadlist.firstChild;
    while(headers.nodeType != 1) {
	headers = headers.nextSibling;
    }
    
    var headerRow = headers.firstChild;
    while(headerRow.nodeType != 1) {
	headerRow = headerRow.nextSibling;
    }

    var firstCell = headerRow.firstChild;
    while(firstCell.nodeType != 1) {
	firstCell = firstCell.nextSibling;
    }
    
    var cellClass = firstCell.getAttribute("class");

    var td = document.createElement("td");
    td.setAttribute("class", cellClass);
    headerRow.appendChild(td);

    var threads = headers.nextSibling;
    while(threads.nodeType != 1) {
	threads = threads.nextSibling;
    }

    var thread = threads.firstChild;
    while(thread) {
	if(thread.nodeType != 1) {
	    thread = thread.nextSibling;
	    continue;
	}
	// Get ThreadId
	var statusIcon = thread.firstChild;
	while(statusIcon.nodeType != 1) {
	    statusIcon = statusIcon.nextSibling;
	}

	var id = statusIcon.getAttribute("id");
	// id is of the form td_threadstatusicon_# where # is the threadId.
	var threadId = id.substring(20);

	var img = document.createElement("img");
	img.setAttribute("src", getIgnoreThreadImgMain());
	img.setAttribute("title", "Ignore this Thread");
	img.style.borderStyle = "none";

	var link = document.createElement("a");
	link.setAttribute("href", "profile.php?do=ignorethread&threadid=" + threadId);
	link.setAttribute("rel", "nofollow");
	link.appendChild(img);
	
	var td = document.createElement("td");
	td.setAttribute("class", "alt1");
	td.appendChild(link);
	
	thread.appendChild(td);
	thread = thread.nextSibling;
    }
}


function getIgnoreThreadImgTW() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAATCAYAAAB/TkaLAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEExIRHn4pojUAAAQoSURBVDjLrZRtTFtlFMf/z+1te9vblgGpHRbMymB042WdjLdRUETjzMxcTHzb/DaSfZsJOlyc0UH0w5o40bgYiMZtZosuMSE4HbhpeKuEl5ABcdAKdhGhDVBoSymlt73HDwSEjCXGeJLnw/M/z/nl5OT8H+A/RmZm5kNz/HZiKLQMg0HE8ROv78rL3feiyWR81WDQWyVJigUCgf5QKNx88WJjB4BATk4OXC7Xv2qEr6+vbxsbc1P9B5fpUNVVKij9ifaX3qKnDl+Rv77WJg8Pj9LJkzVvAUB19dNbitnmy549OXC7XUktLS1+Z69XcavrSUokwOJxgIgBjKDgAI4jyHKEGuqCbCnkGaqpqSksL7fD6ezZCiUiMMZw48Y389+1BlL7RwrAIY7aU5/AltcJQR2FLHNYCu9A89W30T+yHzKBao77mUrh7q2rO3NoncVttMwYamvfbOt2Tqc6B8yQJS+k2AwY5qAX58HzYahUIaSm/AmO+wPS6jQoMcuaLscpv8BWZrVay7dAi4uLMTrqgs2WX/XjbY5AXsSlWUgxL95psMFzH/h9ApiYAO6NKdH+8yoSkg/x2CyIAuxcvQunT7/Rvg5VAMD09DS6e7peIFKdGL6nZ3Lcj/DibSz6vkIsMoKUZEDJE2Ix4N3zOsz57mIpcAdEEjhOj0iU0PDeEdXQ0FDT1NRUWLFOLykpfX/Sg3z/QgyB2WuQJC/AlADj0T8gYMarQOsPIub8SgA8GFMhvurFauQ3KJTpsOUJSErSftnZ2TnPb5qpeTGwgqB/CFWVMaiUCRCARFxGJAp8/mkIPh/D4aM78Wx1dK2G4zD1FwfXxB1MTD4GSZKStiy/3++fghxHIsbj0sdz0GrXdJUKyD+YhpmZIH7p0OLY8xE0fhQECOA44Mp1Pc5/mAKz2Yj7nsXgloVNTzcfKS4uI/CFdP2KSMsLoMji2unrZgTsJqMpgyj6j04x0BOVGaTVHySn00kVFRWmDWBaWhra29tht5dHdYbH5dKyLCJSEkXVRKQmu91MSnUWcXwWnTubTBRVk7yiprv9WgIrpF27nyGHwxHc1psWi6V156PZxKnK6OyZdCIyUtMlIzF+L6k0VlJrrCSIVpqaTKXlhVTKzs4ltVgkNzZ+RtnZOUUP2NRqtWJ8fBwmk8m3HBFNkmxGdeUsOp0GyDIBoI0StUoGp+CxElXSsaMHWIZZ7HA4LlRt631BEBCNRjWCICwkZI2g1hYRGDGA1pjrr4kDINNrL+ey5B3Crw7HhfKSkhL09fU9CN1whELBiOhbUdS9pFAYkIAZMhkAyBA1q3TA9gjL3ZcJt9t16ubN75vt9kr09HRt/0ttgiKRSECj0aSLovY5nU73SlKSYa9Op1vVaLQDgqD5YnBwsNfn84UtFgs8Hg/+lzAajQ/N/Q14duYOPY/AyQAAAABJRU5ErkJgggAA";
}

function getIgnoreThreadImgTriton() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEExAKCs5BabwAAAUZSURBVEjHtZV9bJXlGcZ/z/tx3vO+Pedw2tNTxAH1FGzTj6AztohjBgYT0zgy2B8mLplf3YjZ1JiJrVG3ZIJuWXBEE6fDlRGJX6FS96XMhaa1ulA6M8BTGKilMWPnA9ranp5z3p7zvvf+qBBdNyZ/7P7jyZNcyXXlfq7nvm74HxWLxS6K19XVXRRXfKFStR0dHXc1NTVeH1mwIJpOpdPDw8N9+/e/9iyQa2tbydDQoUsXuOeee2/ZsGF9l2kaV2fOVZA9q5EvCJGwwcK4EI1MUCzMHvzls7u2v/nmGwdXr17N4ODgfxeor6/n5MmTBIOOuXXrDw9s3vyttU8/M8jQ0WsJWDEEUJ+eSmm4bpZvrB+VjjtXqu3btv2ou7v7sS/UwY4dOw5VVsbbntoVk5x7hXJdnUXxc1zVcpiQM006eznDR1oplRVK+VxWnZKf/ySqBgcHujs7t961fPmVfPDBqc+T1tTUANDZ2bl7377fyrIVvf6yqwYk0fKWbH/8OzJ6Avn7MeTEUeTk+8ipJPKDex+RpU0HpW5Fv9Q27vYHBgalvb39ls/yaucvmUyGxYsX17S01N/+6LZjUi6LKs+m8MoZ3j8eJ5eHQhGKLuQL4HkwfDSG76XwSmlQVeqJJ0/T1fXQS8Ci87z6Z9U2bdrcm0rrdX8bSShkEt/L43vTJEeKfOXad8nNCOPjMDUFfQNL+MOflqJrOiIlxM/zjzNFNrbHVSKxJNvf3//OvwtEbr3127sO9BVlOldWvpcjP/UXxlPduPkh/vqewarrZikWwffgscdhPPseuakBREroeiUoGBlJ0r6hPryvZ//zAMZ59ra261o8zyObnVEld5LcxFuUSmlQOkppjH0MD/84SoXtM1vWSGcMNH3uR+U/eQc3f4JQdA3JEQfXnW2d50FVVSx+7tw4MzNZchO/I2BO49gBHFvDCeooZbD1/hleemGK5XU+uq7j2DqOrWE7BgEjT26yD88r4Lr+Bd4LHbhukU+mJinkjrL4csXuX51BAQI4jnDTxjjNTR6hEKy5wSVoKx64b3puKhSA8NV1DaAO4cs1zBNIp85kamq+hGmCJwa1S3wsaw4zTXj4wSm6Ho2xbm2e57sX8OJvMly53J8bJgWnxxRIAIWP0ijPe6KR48ePTU6msYOGjE8EKZUNolGIRqGiAr57Z5FSyeRnT9bwtTVF1t9YvoBXVcGrPVVg6DQ31aIpGZonAOTGxsb+GAmXVbFo89MdcaxIAMuysCIWr/aEOJZ0MHSdV/bF6O0NYVkWgYDF7GyQl3sWYhpw95ZNfPjh6Gv/Mdxs265sbGyQikizj75SXtxTI+LG5FSyUqBJLLtBAnaDWHaD1CaWyWwuJlKKSccdS8V02uTqa74pe/fu9YD4PA8cxyGfz0+Mj08+F3b0LRCSLfcl1EenU7xxwCEYskDkQnid+afixpsNwmGNA3+OEgiI3HHbOrVnz55NQPaiYReJhPtLJblBGY1S9qJK10to2pyhn4YpAL5oeJ5GPGZw9/fWcvZs5pmdO3/x/UQiwejo6HyBYDBIsVhE13VDKdUjvmw0rUUYVjNKGYAg5+MahS8lvryiQjZ8vVUNDw/d//rrvTsvaeHour4xGLS67KC9KhCsRjfCmKZNRUWA6liIyxY6RCLh3x8fOfHEwNsD77a2tnL48OFLX5mapsWqq6tvj0ajq8LhcKVpmqlCodB35MiRXwPS3NxMMpnk/1LxePyi+L8AgnEVrtadDjAAAAAASUVORK5CYIIA"
}

function getIgnoreThreadImgMain() {
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kLHAA0J4raeO0AAAN0SURBVDjLtZRfaFt1FMe/9/e7yU1y09vbpF3TPzNdZ+PKBG07xf/iUCY+uYGWMHCTbhULPgyfDKPqwIGFUZxjD8vbNrYiA5e2qBMJ1I6ZNVVIW0uXrv+Sdl3SLmmTJunN/fPzoaxaN2UPeuC8fH+cD+ec3zkH+A+N+6eHZ559bnvHh+1t5eXyAZ6SBoMZiqoaQ+Pj0Qs+n+8yAO1RYFxXV9eJpqaW4z/fWMe1oIJs3gkOGqq2reI9by2cciIfCPS+5ff7B/4aSP8OOn36q6u8ecfRzi9l/B6tBeUFVDgzEMwUi0tuDIasuP5LxnTso+cPi6Jwa3g4PPbQzHw+3+d2ydN57qIbhBg4eKAHh9/1Q9UAjgM0jeLjz84iOtMAnmTR/YWIU6dONgaDwQkAIPdBu3c/WeFyVXf6z6sw9ARUZQHh4Rpkc0C+sOGZrBXR2yZoxQUoioIz5xbQ1nbkzANler3eY9Epund6ToChpaEpMUxGg7CaE8iu6YjPA1+ftWJycgWU2MGgIrnE8NrLUv3o6K8X0ul0ehP2wouvfnrjZq4+k81hJXkR2dVBaOoSUimCXI4gkeTR/70FanERuWwYajEGk1ANV6UNDTtLx0Kh0G+bZa5lM+5U6h4y967AMNZAOQrC8Zi/I+Do+wVUlHPgOLqhEwqteBery99iemYRbndd3ZaeZbKryOdGcci7gsjNBUTCSUTCSTTu0lBXB+xp1tDRnkcknMTIUAJDg/MgRIGSnwJjjAEAfx+2kk7PWszc43cSFrgq//zhg63r2PPSY3DIGgZ+XIQkbegTt0wwDDNqarZhZmZ6dktmy8tLQamEYuC6E7pOIcsEskwgihSKwiOVFsDzZFP/7loZOM6MJzw16O/v/2nLtDocDseuxkbdVtLCWlvrGVPL2N2YzGSHhwkWDzNbPOz1N7YzVixjEyMOJpU1s6db3mbd3d0/PDAahUKhQCk1KC3sHRuvxUiE4PwlO2bjNnCcCRwxIRYXMT1FcfxEFTTDio72fejtDbw5NzeXfuhuiqL4ja4L7xDzU+A4CnD6llVmBoXNZuCDI69g6vbE/p6ey1f/9WoQwn0iCNaTJqEajLmgQwSgo0TU0dxUhZ07nJl4PLYvEAiEHukEWSyWSrvdfkiS7PslqcRTWlq6LkmOIYBd6uvruwKA4f+0PwBsxWrdQ4q6lgAAAABJRU5ErkJgggAA"
}