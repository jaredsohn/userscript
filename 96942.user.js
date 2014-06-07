// Copyright by Andrin von Rechenberg 2006, All rights reserved
// ==UserScript==
// @name          Advanced Google Keys mod by miz
// @namespace     http://d.hatena.ne.jp/miz999
// @description   Use keys to browse Search results and VIM like search field editing. fix mainly for google.co.jp . original code http://userscripts.org/scripts/show/5711
// @include       http*://www.google.co.jp/search*
// @include       http*://google.co.jp/search*
// ==/UserScript==

var keysActive=true;
var results=new Array();
var resultsForNumber=new Array();
var activeResult=-1;
var searchField=-1;
var spellingCorrection=-1;
var replaceMode=false;
var lastReplace=0;
var help=-1;
var tabMode=GM_getValue("tabMode");
// var imageBox;
// var videoBox;
// var newsBox;
var box = {};

window.addEventListener("load", function(e) {
    fields=window.document.getElementsByTagName("INPUT");
    for(i=0;i<fields.length;i++) {
        if(fields[i].type=="text") {
            if(searchField==-1) {
                searchField=fields[i];
            }
            fields[i].addEventListener("focus",function(f) {
                keysActive=false;
            } ,false);
        }
    }

    if (window.document.getElementById('rso')){
        tmp = window.document.getElementById('rso');
    } else if(window.document.getElementById('ires')){
        tmp = window.document.getElementById('ires').firstChild;
    }
//    GM_log(tmp.childNodes.length);

    for(i=0, j=0, k=0;k<tmp.childNodes.length;k++){
        rc = ""
        t = tmp.childNodes.item(k);
//        GM_log(t.innerHTML)
        if(t && (t.tagName == 'LI' || t.tagName == 'DIV')){
            results[i++] = t;
            c = t.className;
            id = t.id;

            if((c =="g w0" || c == "g" || c == "g w5" || c == "g videobox" || c == "srg") && id == ""){
                if(t.firstChild.nodeType == 8){
                    rc = t.firstChild.nextSibling;
                }
                
                //video
                if(c == "srg"){
//                    GM_log(t.childNodes.length);
                    for (i2 = 0 ; i2 < t.childNodes.length ; i2++){
                        resultsForNumber[j++] =  t.childNodes.item(i2);
                    }
                    continue;
                }

                f  = c.firstChild;
                if(f && f.className == "g"){
                    rc = f.firstChild;
                }
            }
                
            if(rc.className == "vsc" || rc.className == "r"  || rc.className == "rc" ){
                resultsForNumber[j++] = t;
            }
        }
    }
	color="#00c";
	if(tabMode) {
		color="#0c0";
	}

    boxType('imagebox', 'I');
    boxType('imagebox_bigimages', 'I');
    boxType('newsbox', 'N');
    boxType('productbox', 'P');
    boxType('videobox', 'V');

    n=0;
    for(i=0;i<resultsForNumber.length;i++){
        tmp = resultsForNumber[i].getElementsByTagName('h3');
//        tmp = resultsForNumber[i].getElementsByTagName('span');
        for(j=0;j<tmp.length;j++){
//            GM_log(tmp[j].className)
            if(tmp[j].className=="r") {
//            if(tmp[j].className=="tl") {
                n++;
                cnr="&nbsp;";
                if(n<=10){
                    cnr=(n)%10;
                }
                tmp[j].innerHTML="<font class='key_accs' color=#ffffff style='background:"+color+"'>"
                    +"&nbsp;"+(cnr)+"&nbsp;</font> "+tmp[j].innerHTML;
                break;
            } else {
	            spelling=tmp[j].getElementsByTagName("A");
                if (spelling.length > 0) {
				    GM_log("spelling" +  spelling[0].className);
                }
		        if(spelling.length>0&&spelling[0].className=="p") {
			        spellingCorrection=spelling[0].href;
			        tmp[j].innerHTML="<font size=1 color=#ffffff style='background:#00c'>"
                	    +"&nbsp;Enter&nbsp;</font> "+tmp[j].innerHTML;
                    break;

		        }
            }
	    }
    }

    about=window.document.createElement("div");
    about.innerHTML="<font size=1 color=gray>&nbsp;Advanced Google Keys active. Press (h) for advanced features.</font>";
    window.document.body.appendChild(about);
    about.style.position="absolute";
    about.style.top= "25";
    about.style.left="0";
    about.style.width="100%"
}, false);

function boxType(boxName, key){
    if(window.document.getElementById(boxName)){
        box[boxName] =window.document.getElementById(boxName).firstChild.firstChild;
        tmp = window.document.getElementById(boxName).firstChild;
        tmp.innerHTML="<font class='key_accs' color=#ffffff style='background:"+color+"'>"
                    +"&nbsp;"+ key +"&nbsp;</font> "+tmp.innerHTML;
    }
}

function browseToResult(nr, numKey) {

//    GM_log("length:" + results.length + " nr:" + nr + " link:" + results[nr].getElementsByTagName("A")[0].href);
	if(!tabMode) {
        if(numKey){
	        window.document.location.href=resultsForNumber[nr].getElementsByTagName("A")[0].href;
        } else {
	        window.document.location.href=results[nr].getElementsByTagName("A")[0].href;
        }
	} else {
        if(numKey){
		    GM_openInTab(resultsForNumber[nr].getElementsByTagName("A")[0].href);
        } else {
		    GM_openInTab(results[nr].getElementsByTagName("A")[0].href);
        }
	}
}
// function browseToResult(nr) {
//     allP=window.document.getElementsByTagName("P");
// 	if(!tabMode) {
// 	    window.document.location.href=results[nr].getElementsByTagName("A")[0].href;
// 	} else {
// 		GM_openInTab(results[nr].getElementsByTagName("A")[0].href);
// 	}
// }

function browseBox(boxLink) {

	if(!tabMode) {
	    window.document.location.href=box[boxLink];
	} else {
		GM_openInTab(box[boxLink]);
	}
}

function activateResult() {

    GM_log(activeResult);
    if(window.pageYOffset+100>results[activeResult].offsetTop
    || window.pageYOffset + window.innerHeight < results[activeResult].offsetTop+100) {
        window.scrollTo(0, results[activeResult].offsetTop-window.innerHeight/2);
    }
   
    for(i=0;i<results.length;i++) {
        results[i].style.backgroundColor="";
		results[i].style.border="";
    }
    results[activeResult].style.backgroundColor="#e7eaFF";
	results[activeResult].style.border="1px solid #36c";
}

function replaceSelect() {
	value=searchField.value;
	space=new Array();
	space[0]=0;
	cspace=1;
	for(i=0;i<value.length;i++) {
		if(value.charAt(i)==" ") {
			space[cspace++]=i;
		}
	}
	space[cspace]=value.length;
	if(lastReplace<0) { lastReplace=0; }
	if(lastReplace+2>space.length) { lastReplace=space.length-2; }
	start=space[lastReplace];
	end=space[lastReplace+1];
	while((value.charAt(start)==" " || value.charAt(start)=='"')&&start<end-2) {
		start++;
	}
	while((value.charAt(end-1)==" " || value.charAt(end-1)=='"')&&end>start+1) {
		end--;
	}
	searchField.selectionStart=start;
	searchField.selectionEnd=end;

}

function scrollTo(where) {
    //	kh.style.top=where;
    window.scrollTo(0,parseInt(where));
}

window.addEventListener("keydown",function(e) {
    
    var ctrl  = typeof e.modifiers == 'undefined' ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK; 
    var shift = typeof e.modifiers == 'undefined' ? e.shiftKey : e.modifiers & Event.SHIFT_MASK;
    var alt   = typeof e.modifiers == 'undefined' ? e.altKey : e.modifiers & Event.ALT_MASK;
    var meta  = typeof e.modifiers == 'undefined' ? e.metaKey : e.modifiers & Event.META_MASK;
    
//    GM_log(e.metaKey);
    
    if(ctrl || alt || meta){
	    return;
    }

    //used key abekhnprtu
    if(replaceMode) {
		if(e.keyCode!=37&&e.keyCode!=39) { //37=left, 39=right
			searchField.focus();			replaceMode=false;
		} else if(e.keyCode==37) {
			lastReplace--;
			replaceSelect();
		} else if(e.keyCode==39) {
			lastReplace++;			replaceSelect();
		}
		return;
	}
    
    if(!keysActive) {
        if(!(e.target.tagName=="INPUT" &&e.target.name=="q")){
            searchField.focus();
        }
        return;
    }

    if(e.keyCode>=48 && e.keyCode<=57) {//numbers
        // 0 is 48 but 9
        nr=e.keyCode-49;
        if(nr<0) {
             nr=9;
        }
GM_log(document.location.href + " " + ctrl + ":" + shift  + ":" + meta + ":" + e.keyCode);
//		if(nr>=results.length) {
//			return;
//		}
		activeResult=nr;
		scrollTo(0, window.pageYOffset);
		activateResult();
        browseToResult(nr, true);
    }
    
    if(e.keyCode==73 && shift) {//I
		scrollTo(0, window.pageYOffset);
        if (box['imagebox']){
            browseBox('imagebox');
        } else {
            browseBox('imagebox_bigimages');
        }
        return;
    }
    
    if(e.keyCode==78 && shift) {//N
		scrollTo(0, window.pageYOffset);
        browseBox('newsbox');
        return;
    }

    if(e.keyCode==86 && shift) {//V
		scrollTo(0, window.pageYOffset);
        browseBox('videobox');
        return;
    }

    if(e.keyCode==90 && shift) {//P
		scrollTo(0, window.pageYOffset);
        browseBox('productbox');
        return;
    }
    
    if(e.keyCode==40||e.keyCode==74) {//40=down, 74=j
        e.preventDefault()
        e.stopPropagation()

//    GM_log('activateResult:' + activeResult + ' restltsLength:' + results.length);
    	if(activeResult==-1) {
            activeResult=0;
        } else if ((activeResult+1)==results.length){
            return
        }else{
            activeResult++			
        }
        activateResult();
    }
    
//    if((e.keyCode==38||e.keyCode==75) && !ctrl) {//38=up, k=75
    if(e.keyCode==38||e.keyCode==75) {//38=up, k=75
        e.preventDefault()
        e.stopPropagation()

        if(activeResult==-1) {
            activeResult=results.length-1;
        } else {
            activeResult=activeResult-1;
			if(activeResult<0) {
				activeResult=0;
				scrollTo(0, 0);
			}
        }
        activateResult();
         
    }

    if(e.keyCode==37 || e.keyCode==80) {//37=left, p=80
		allTD=window.document.getElementById("pnprev");
		button=-1;
		theA=-1;
		theA=allTD.href;
//		allTD=window.document.getElementsByTagName("TD");
// 		button=-1;
// 		theA=-1;
// 		lastA=-1;
// 		for(i=0;i<allTD.length;i++) {
// 			if(allTD[i].className=="b") {
// 				allA=allTD[i].getElementsByTagName("A");
// 				if(allA.length>0) {
// 					lastA=theA;
// 					theA=allA[0].href;
// 				}
// 			}
// 		}
//		if(lastA!=-1) {
//			window.document.location.href=lastA;
		if(theA!=-1) {
			window.document.location.href=theA;
		}
    }

    if(e.keyCode==39 || e.keyCode==78) {//39=right,  n=78
		allTD=window.document.getElementById("pnnext");
		button=-1;
		theA=-1;
		theA=allTD.href;
//		allTD=window.document.getElementsByTagName("TD");
// 		for(i=0;i<allTD.length;i++) {
// 			if(allTD[i].className=="b navend") {
// //			if(allTD[i].className=="b") {
// 				allA=allTD[i].getElementsByTagName("A");
// 				if(allA.length>0) {
// 					theA=allA[0].href;
// 				}
// 			}
// 		}
		if(theA!=-1) {
			window.document.location.href=theA;
		}
    }

    if(e.keyCode==13) {//Enter
        if(activeResult!=-1) {
            browseToResult(activeResult, false);
		} else if (spellingCorrection!=-1) {
			window.document.location.href=spellingCorrection;
		}

    } 
//	if(e.keyCode==32) {//Space
//		scrollTo(0, window.pageYOffset+window.innerHeight/2);//	}
    if(searchField==-1) {
        return;
    }
    
    //replace search field
    if(e.keyCode==69) {//69=e
		scrollTo(0, 0);
        searchField.selectionStart=0 ;
		searchField.selectionEnd=searchField.value.length;
		keysActive=false;
    }

    //append search field
    if(e.keyCode==65) {//65=a
		scrollTo(0, 0);
        searchField.value=searchField.value+"  ";
        searchField.selectionStart=searchField.value.length-1 ;
		searchField.selectionEnd=searchField.value.length;
		keysActive=false;
    }   

	if(e.keyCode==82) {//82=r
		scrollTo(0, 0);
		replaceMode=true;
		lastReplace=0;
		keysActive=false;
		replaceSelect();
	}

	if(e.keyCode==84) {//84=t
		tabMode=!tabMode;
		GM_setValue("tabMode", tabMode);
		top=window.pageYOffset;
		color="#00c";
		if(tabMode) {
			color="#0c0";
		} 
		for(i=0;i<results.length;i++) {
            t = results[i];
            accs = t.getElementsByClassName("key_accs");
//            GM_log("t:" + t.innerHTML);
//            GM_log("accs:" + accs[0].innerHTML);
            accs[0].style.backgroundColor = color;
//			accs[0] = "<font size=1 color=#ffffff style='background:"+color+"'>"
//			results[i].innerHTML="<font size=1 color=#ffffff style='background:"+color+"'>"
//			+results[i].innerHTML.substring(results[i].innerHTML.indexOf(">")+1);
		}
		scrollTo(0, top);
	}
	if(e.keyCode==85) { //85==u
		window.document.location.href="http://userscripts.org/scripts/source/5711.user.js";
	}
	if(help!=-1) {
		help.style.visibility="hidden";
	}

	if(e.keyCode==72) {//72=h
//	    GM_log(help);
		if(help==-1) {
			help=window.document.createElement("div");
			help.innerHTML="<center>&nbsp;<br><b><font color=blue>Advanced Google Keys</font></b><br>"
			+"<table border=0 cellspacing=0 cellpadding=0><tr><td>"
			+"<table border=0><tr><td width=140><b><i>Keys</i></b></td><td width=190><b><i>Effect</i></b></td></tr>"
			+"<tr><td>Arrow Down / j</td><td>Go to next result</td></tr>"
			+"<tr><td>Arrow Up / k</td><td>Go to previous result</td></tr>"			
			+"<tr><td>Arrow Right / n</td><td>Go to next page</td></tr>"
			+"<tr><td>Arrow Left / p</td><td>Go to previous page</td></tr>"
			+"<tr><td>Enter</td><td>Go to selected result</td></tr>"
			+"</table></td><td width=170 bgcolor='#9999DC'><center><font color=white size=1>Feel free to donate something<br><br>"
			+'<form action="https://www.paypal.com/cgi-bin/webscr" method="post">'
			+'<input type="hidden" name="cmd" value="_s-xclick">'
			+'<input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but04.gif" border="0" name="submit" alt="Make payments with PayPal - it\'s fast, free and secure!">'
			+'<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">'
			+'<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">'
			+'</form>I\'m still a student ;)</font>'
			+"</td><td width=20>&nbsp;</td><tr><td colspan=3><table border=0>"
			+"<tr><td width=140>1,2...9,0</td><td width=380>Jump to result</td></tr>"
			+"<tr><td>&nbsp;t</td><td>Tab Mode. Opens results in new tabs</td></tr>"
			+"<tr><td>&nbsp;e</td><td>Edit / Erase the current search string</td></tr>"
			+"<tr><td>&nbsp;a</td><td>Append something to the current search string</td></tr>"
			+"<tr><td>&nbsp;r</td><td>Replace Mode. In Replace mode use the left/right<br>arrow key to select word</td></tr>"
			+"<tr><td>&nbsp;u</td><td>Update this Greasemonkey Script</td></tr>"
			+"<tr><td></td><td></td></tr>"
			+"</table></td></tr></table><br>"
			+"Send your fan mail to <a href=mailto:andrinvr@gmail.com>andrinvr@gmail.com</a><br><br>"
			+"Using GMail? Download <a href='http://userscripts.org/scripts/source/5722.user.js'>GMailTo</a>, to be able<br>to click on E-Mail links like the on above."
			+"<br><br>Click anywhere to close this dialog,<br>"
			+"NO, actually press any key to close this dialog - LOL<br>"
			+"<br><font size=1>Copyright by <a href='http://www.google.com/search?q=andrin%20von%20rechenberg'>Andrin von Rechenberg</a> 2006, all rights reserved"
			+"</font><br>&nbsp;";

			window.document.body.appendChild(help);
			help.style.position="absolute";

			help.style.width=540;
			help.style.left=window.document.body.clientWidth/2-help.offsetWidth/2;
		    help.style.backgroundColor="#e7eaFF";
			help.style.border="1px solid #36c";
		}

		scrollTo(0, window.pageYOffset);
		help.style.top=window.pageYOffset+window.innerHeight/2-help.offsetHeight/2;
//	    GM_log(help.style.visibility);
		help.style.visibility="";
	}
}, false);

window.addEventListener("click",function(e) {

    if(e.target.tagName!="INPUT" && e.target.tagName!="A") {
        keysActive=true;
	    replaceMode=false;

        scrollTo(0, window.pageYOffset);

        //kh.focus();
	    if(help!=-1) {
	        help.style.visibility="hidden";
	    }
    }
}, false);


/*
Exception: GM_getValue is not defined
@Scratchpad/2:19
*/