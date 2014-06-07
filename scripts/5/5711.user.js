// Copyright by Andrin von Rechenberg 2006, All rights reserved

// ==UserScript==

// @name          Advanced Google Keys

// @namespace     andrinvr@gmail.com

// @description   Use keys to browse Search results and VIM like search field editing

// @include       http://www.google.tld/search*

// @include       http://google.tld/search*

// ==/UserScript==



var keysActive=true;

var results=new Array();

var activeResult=-1;

var searchField=-1;

var spellingCorrection=-1;

var replaceMode=false;

var lastReplace=0;

//var kh;

var help=-1;

//var storage=new advancedgooglekeys_ScriptStorage();

//var GM_getValue=advancedgooglekeys_gmCompiler.hitch(storage, "getValue");

var tabMode=GM_getValue("tabMode");





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



    allP=window.document.getElementsByTagName("li");

    n=0;

	color="#00c";

	if(tabMode) {

		color="#0c0";

	} 

    for(i=0;i<allP.length;i++) {

        if(allP[i].className=="g") {

            results[n]=allP[i];

            n++;

            cnr="&nbsp;";

            if(n<=10){cnr=(n)%10;}

            allP[i].innerHTML="<font size=1 color=#ffffff style='background:"+color+"'>"

            +"&nbsp;"+(cnr)+"&nbsp;</font> "+allP[i].innerHTML;

        } else {

		spelling=allP[i].getElementsByTagName("A");

		if(spelling.length>0&&spelling[0].className=="p") {

			spellingCorrection=spelling[0].href;

			allP[i].innerHTML="<font size=1 color=#ffffff style='background:#00c'>"

                	+"&nbsp;Enter&nbsp;</font> "+allP[i].innerHTML;

		}

	}

    }

   

   

//    kh=window.document.createElement("input");

//    kh.type="text";   

//    window.document.body.appendChild(kh)

//    kh.style.position="absolute";

//    kh.style.top= "0";

//    kh.style.left="-300";   

//    kh.focus();



    about=window.document.createElement("div");

    about.innerHTML="<center><font size=1 color=gray>&nbsp;Advanced Google Keys active. Press (h) for advanced features.</font></center>";

    window.document.body.appendChild(about);

    about.style.position="absolute";

    about.style.top= "0";

    about.style.left="0";

    about.style.width="100%"



   

}, false);



function browseToResult(nr) {

    allP=window.document.getElementsByTagName("P");

	if(!tabMode) {

	    window.document.location.href=results[nr].getElementsByTagName("A")[0].href;

	} else {

		GM_openInTab(results[nr].getElementsByTagName("A")[0].href);

	}

}



function activateResult() {



   

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



	if(replaceMode) {

		if(e.keyCode!=37&&e.keyCode!=39) {

			searchField.focus();

			replaceMode=false;

		} else if(e.keyCode==37) {

			lastReplace--;

			replaceSelect();

		} else if(e.keyCode==39) {

			lastReplace++;

			replaceSelect();

		}

		return;

	}



    if(!keysActive) {

        if(!(e.target.tagName=="INPUT" &&e.target.name=="q"))searchField.focus();

        return;

    }



    if(e.keyCode>=48&&e.keyCode<=57) {//numbers

        nr=e.keyCode-49;

        if(nr<0) {

            nr=9;

        }

		if(nr>=results.length) {

			return;

		}

		activeResult=nr;

		scrollTo(0, window.pageYOffset);

		activateResult();

        	browseToResult(nr);





    }

    if(e.keyCode==40||e.keyCode==74) {//down / j

      e.preventDefault()

      e.stopPropagation()



    	if(activeResult==-1) {

            activeResult=0;

        } else if (activeResult==results.length){

            return

        }else{

            activeResult++			

        }

        activateResult();

    }

    if(e.keyCode==38||e.keyCode==75) {//up / k

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



    if(e.keyCode==37 || e.keyCode==80) {//left / p

		allTD=window.document.getElementsByTagName("TD");

		button=-1;

		theA=-1;

		lastA=-1;

		for(i=0;i<allTD.length;i++) {

			if(allTD[i].className=="b") {

				allA=allTD[i].getElementsByTagName("A");

				if(allA.length>0) {

					lastA=theA;

					theA=allA[0].href;

				}

			}

		}

		if(lastA!=-1) {

			window.document.location.href=lastA;

		}

    }



    if(e.keyCode==39 || e.keyCode==78) {//right / n

		allTD=window.document.getElementsByTagName("TD");

		button=-1;

		theA=-1;

		for(i=0;i<allTD.length;i++) {

			if(allTD[i].className=="b") {

				allA=allTD[i].getElementsByTagName("A");

				if(allA.length>0) {

					theA=allA[0].href;

				}

			}

		}

		if(theA!=-1) {

			window.document.location.href=theA;

		}

    }



    if(e.keyCode==13) {//Enter

        if(activeResult!=-1) {

            browseToResult(activeResult);

		} else if (spellingCorrection!=-1) {

			window.document.location.href=spellingCorrection;

		}



    } 

	

	if(e.keyCode==32) {//Space

		scrollTo(0, window.pageYOffset+window.innerHeight/2);

	}



    if(searchField==-1) {

        return;

    }

    if(e.keyCode==69) {//e

		scrollTo(0, 0);

        searchField.selectionStart=0 ;

		searchField.selectionEnd=searchField.value.length;

		keysActive=false;

   

    }

    if(e.keyCode==65) {//a

		scrollTo(0, 0);

        searchField.value=searchField.value+"  ";

        searchField.selectionStart=searchField.value.length-1 ;

		searchField.selectionEnd=searchField.value.length;

		keysActive=false;

   

    }   



	if(e.keyCode==82) {//r

		scrollTo(0, 0);

		replaceMode=true;

		lastReplace=0;

		keysActive=false;

		replaceSelect();

	}



	if(e.keyCode==84) {//t

		tabMode=!tabMode;

		GM_setValue("tabMode", tabMode);

		top=window.pageYOffset;

		color="#00c";

		if(tabMode) {

			color="#0c0";

		} 

		for(i=0;i<results.length;i++) {

			results[i].innerHTML="<font size=1 color=#ffffff style='background:"+color+"'>"

			+results[i].innerHTML.substring(results[i].innerHTML.indexOf(">")+1);

		}

		scrollTo(0, top);

	}

	if(e.keyCode==85) {

		window.document.location.href="http://userscripts.org/scripts/source/5711.user.js";

	}

	if(help!=-1) {

		help.style.visibility="hidden";

	}



	if(e.keyCode==72) {//h

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

