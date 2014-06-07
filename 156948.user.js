// ==UserScript==
// @name        Facebook block edited Dede Kuntoro
// @author      sg_06
// @namespace   http://dedekuntoro.wordpress.com
// @description blocks posts that contain unwanted words. (just add all the words you don't want to see in the "FACEBOOK BLOCK" option box on the left sidebar.)   Includes regex!
// @include        *facebook.* 
// @version     1.4
// ==/UserScript==



hardcodedlist="kanyut;;/bangsat/;;anjing;;brengsek;;babi;;tai;;asu;;bajingan;;jablay;;perek;;monyet;;ngesex";
/*default list of stuff, mostly as an example. 
if you really hate cookies, you can just change this variable and still use FBSavior.
just note that each entry is separated by two semicolons
*/
  

function hstrip(eme){
	eme = eme.replace(/\n/g,"\\n")
	eme = eme.replace(/<\/?.{1,12} ?.+?>/g,"");
	eme = eme.replace(/&quot;/g,'"');/*basic stuff that apparently caused problems.*/
	eme = eme.replace(/&amp;/g,'&');
	eme = eme.replace(/&lt;/g,'<');
	eme = eme.replace(/&gt;/g,'>');
	return eme
}

function ch(){
	for(q=0;q<badlist.length;q++){badlist[q]=badlist[q].toLowerCase();}
	/*the above loop is nice and contained and doesn't affect q from the this upcoming loop.*/
	a=document.getElementById("home_stream").getElementsByTagName("li");
	for(b in a){
		for(q=0;q<=badlist.length;q++){
			try{
				/*make an array of things 2 chek*/
				checkmelist = new Array();
				try{checkmelist.push(a[b].getElementsByTagName("span")[0].innerHTML.toLowerCase());}catch(e){}
				try{checkmelist.push(a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML.toLowerCase());}catch(e){}
				try{checkmelist.push(a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[1].innerHTML.toLowerCase());}catch(e){}
				try{checkmelist.push(a[b].getElementsByTagName("strong")[0].innerHTML.toLowerCase());}catch(e){}
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML.toLowerCase());}catch(e){} /* picture descriptions */  /*this also seems to be an alternate status catch thing. not entirely sure. */
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[2].innerHTML.toLowerCase());}catch(e){}/*facebook's topic-groupifyer, and anything like "___ added 2 new photos" or "___ shared a pic from _____________"    Not entirely sure if it works....*/
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].getElementsByTagName("div")[1].innerHTML.toLowerCase());}catch(e){}/*descriptions for uploaded images */
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].innerHTML.toLowerCase());}catch(e){}/*liked links. (dev note: keep this as last.) */
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML.toLowerCase());}catch(e){} /*video title*/
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[2].innerHTML.toLowerCase());}catch(e){}/*the description field for youtube videos.   */
				for(zxzx=0;zxzx<checkmelist.length;zxzx++){
				checkmelist[zxzx] = hstrip(checkmelist[zxzx]);
				}
				if(a[b].className.indexOf("Story")!=-1){
					hidepost=false;				
					if(badlist[q]!="" && badlist[q]!="undefined" && badlist[q]!=undefined ){
						for(z=0;z<=checkmelist.length;z++){
							slashfind = /\x2F/g
							if(slashfind.test(badlist[q])){
								if(badlist[q].match(/\x2F/g).length>=2){
									badregex = new RegExp(badlist[q].slice(1,-1),"gi");
									if(badregex.test(checkmelist[z])){
										stylecheck1 = false;
										stylecheck2 = false;
										try{stylecheck1 = (a[b].getElementsByTagName("h5")[1].style.display!="block") && (a[b].getElementsByTagName("h5")[1].style.display!="none");}catch(e){}
										try{stylecheck2 = (a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].style.display!="block") && (a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].style.display!="none") }catch(e){}
										if(stylecheck1 || stylecheck2){
											try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[1].style.display = "none";}catch(e){}
											if(z==checkmelist.length) { try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].style.display = "none"; }catch(e){}}
											try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[2].style.display = "none";}catch(e){}
											try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[3].style.display = "none";}catch(e){}
											try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("form")[0].style.display = "none";}catch(e){}
											addthird='';
											outdiv = '<div style="text-align:center;background-color: #EDEFF4;margin-top: 1px;padding: 5px 5px 4px;"><label style="float: left;background-image: url(http://static.ak.fbcdn.net/rsrc.php/v2/yy/r/WyhgWi6GeZ8.png);background-repeat: no-repeat;background-position: 0 -35px;display: block;height: 13px;width: 15px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);"></label>';
											outdiv+='This post triggered the following regex: /'+badlist[q].slice(1,-1)+'/  ';
											outdiv+='and has been blocked for your safety. <br><a href="#" onClick="try{parentNode.parentNode.childNodes[1].childNodes[0].style.display = \'block\';}catch(e){} try{parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].style.display=\'block\';}catch(e){} try{parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.display=\'block\';}catch(e){} try{parentNode.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].style.display = \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'h5\')[1].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[0].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[2].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[3].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'form\')[0].style.display= \'block\';}catch(e){} parentNode.style.display=\'none\';">click here to view it anyway</a>.</div>';
											a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML+=outdiv;
										}
									}
								}
							}else{
								if(checkmelist[z].indexOf(badlist[q])!=-1){
									/*omg I'm having the weirdest problem with this block of code.  I'm actually resorting to redundancy. a function call didn't even work   ;_;    what is this */
									stylecheck1 = false;
									stylecheck2 = false;
									try{stylecheck1 = (a[b].getElementsByTagName("h5")[1].style.display!="block") && (a[b].getElementsByTagName("h5")[1].style.display!="none");}catch(e){}
									try{stylecheck2 = (a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].style.display!="block") && (a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].style.display!="none") }catch(e){}
									if(stylecheck1 || stylecheck2){
										try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("h5")[1].style.display = "none";}catch(e){}
										if(z==checkmelist.length) { try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].style.display = "none"; }catch(e){}}
										try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[2].style.display = "none";}catch(e){}
										try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[3].style.display = "none";}catch(e){}
										try{a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("form")[0].style.display = "none";}catch(e){}
										addthird='';
										outdiv = '<div style="text-align:center;background-color: #EDEFF4;margin-top: 1px;padding: 5px 5px 4px;"><label style="float: left;background-image: url(http://static.ak.fbcdn.net/rsrc.php/v2/yy/r/WyhgWi6GeZ8.png);background-repeat: no-repeat;background-position: 0 -35px;display: block;height: 13px;width: 15px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);"></label>';
										outdiv+='This post contains the word "'+badlist[q]+'" ';
										outdiv+='and has been blocked for your safety. <br><a href="#" onClick="try{parentNode.parentNode.childNodes[1].childNodes[0].style.display = \'block\';}catch(e){} try{parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].style.display=\'block\';}catch(e){} try{parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.display=\'block\';}catch(e){} try{parentNode.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[1].style.display = \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'h5\')[1].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[0].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[2].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'div\')[3].style.display= \'block\';}catch(e){} try{parentNode.parentNode.getElementsByTagName(\'form\')[0].style.display= \'block\';}catch(e){} parentNode.style.display=\'none\';">click here to view it anyway</a>.</div>';
										a[b].getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML+=outdiv;
										
									}
								}
							}
						}
					}
				}
			}catch(e){}
		}
	}
}



function chcheck(){
	if(document.getElementById("home_stream").getElementsByTagName("li").length!=knownfeedlength){
		ch();
		knownfeedlength=document.getElementById("home_stream").getElementsByTagName("li").length;
	}
}

function getc(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return decodeURIComponent(unescape(y));
		}
	}
}

function confirmstart(){
	if((document.getElementById("pagelet_bookmark_nav").innerHTML.indexof("adder")==-1)&&(document.getElementById("pagelet_bookmark_nav").innerHTML.indexof("SAVIOR")==-1)){
		/*your page loaded slowly enough that facebook ate the facebook savior button. better load it again.*/
		clearInterval(chinterval);
		startsc();
	}
}




function diagcycle(){
	/*explanation*/
	alert("this will cycle through everything on this page that looks like a post, and present you with the contents of that post. \n\nIf the word you are trying to block is in that block of text, type in \"yes\" (or \"y\") and the script will try to lower it down further.");
	alert("there will be A LOT of weird, redundant-looking results. just answer consistantly.")
	
	/*cycle li*/
	lilist = document.getElementById("home_stream").getElementsByTagName("li");
	for(a=0;a<lilist.length;a++){
		if(hstrip(lilist[a].innerHTML)!=""){
			userin=prompt(hstrip(lilist[a].innerHTML)+"\n\n-----\n(if the word you're trying to block is in the above text, change the value of the box from \"no\" to \"yes\" (or \"y\"). Otherwise, press ok","no");
			if((userin=="yes")||(userin=="y")){ 
				break;
			}
		}
	}
	outputcode = lilist[a].innerHTML;
	loctrack = "";
	focustarget = lilist[a];
	
	/*cycle each node from there*/
	do{
		for(b=0;b<=focustarget.childNodes.length;b++){
			if(hstrip(focustarget.childNodes[b].innerHTML)!=""){
				userin=prompt(hstrip(focustarget.childNodes[b].innerHTML)+"\n\n-----\n"+loctrack+"\n-----\n(if the word you're trying to block is in the above text, change the value of the box from \"no\" to \"yes\". Otherwise, press ok","no");
				if((userin=="yes")||(userin=="y")){ 
					loctrack+=b+",";
					try{
					focustarget = focustarget.childNodes[b];
					}catch(e){}
					break;
				}
			}
		}
	}while(focustarget.childNodes[0].innerHTML!=undefined)
	
	/*output to a copy-paste-able format.*/
	alert("ok: your node location looks like this: "+loctrack+"\n\nI'm going to attempt to block out all names and avatars. doublecheck the output code if you'd like.");
	outputcode = outputcode.replace(/\n/g,"\\n");
	outputcode = outputcode.replace(/<a .+UFICommentActorName.+?<\/a>/g,"");
	outputcode = outputcode.replace(/<a .+?>/g,"");
	outputcode = outputcode.replace(/<\/a>/g,"");
	outputcode = outputcode.replace(/http.\/\/.+?\.jpg/g,"");
	outputcode = outputcode.replace(/{.+?}/g,"")
	outputcode = outputcode.replace(/<\/textarea>/g,"<\\/textarea>");
	alert("Ok, done! Everything has This has been added to a textbox on your left sidebar. (it's a lot of text!!!)\n\nSend the contents of that box to one of the addresses listed (preferably email)")
	cleveremail = "schamr6-,,;bg[be&[fd";/*I dont want my email being picked up by spambots, heh.*/
	for(clemail="";clemail.length<cleveremail.length;clemail += String.fromCharCode(cleveremail[clemail.length].charCodeAt()+Math.floor(clemail.length/2))){}

	
	document.getElementById("pagelet_bookmark_nav").innerHTML+="<textarea cols='32' rows='15'>output: "+loctrack+"\n\n"+outputcode+"\n\n----\n\nsend to one of the following:\nemail: "+clemail+"\ntumblr: http://scibot9000.tumblr.com/ask\nyoutube: http://www.youtube.com/scibot9000 \n\n\nplease include \"facebook savior\" in the subject line.</textarea>"
}





knownfeedlength=0;
function startsc(){
	cookiegrab = "";
	if(getc("thelist")==null){
		exdate=new Date();
		exdate.setDate(exdate.getDate()+909);
		c_value=" ; expires="+exdate.toUTCString();
		document.cookie="thelist" + "=" + c_value;
		cookiegrab = "";
	}else{
		cookiegrab = getc("thelist");
	}
	if(cookiegrab=="" && hardcodedlist!=""){
		cookiegrab = hardcodedlist;
	}

	badlist = cookiegrab.split(";;");
	inputlist = "";
	intop = '<li class="sideNavItem stat_elem"><div class="buttonWrap"></div><div><span class="imgWrap"></span><input type="text" size="19" value="';
	inbot = '"><a href="#" onClick="this.parentNode.parentNode.style.display=\'none\'"><b>X</b></a></div></li>';
	for(i=0;i<badlist.length;i++){
		inputlist+=intop+badlist[i]+inbot;
	}
	var script = document.createElement('script');
	script.appendChild(document.createTextNode( hstrip ));
	script.appendChild(document.createTextNode( diagcycle ));
	(document.body || document.head || document.documentElement).appendChild(script);
	
	
	document.getElementById("pagelet_bookmark_nav").innerHTML+='<div class="homeSideNav" role="navigation" id="pagesNav"><div class="navHeader">FACEBOOK SAVIOR</div><ul class="uiSideNav mts mbm nonDroppableNav" name="specificlist" id="specificlist"><li class="sideNavItem stat_elem"><div class="buttonWrap"></div><label class="uiButton uiButtonLarge uiButtonConfirm"><input type=\'button\'  onclick="this.value==\'[Show Options]\'?this.value=\'[Hide Options]\':this.value=\'[Show Options]\';this.parentNode.parentNode.nextSibling.style.display==\'none\'?this.parentNode.parentNode.nextSibling.style.display=\'block\':this.parentNode.parentNode.nextSibling.style.display=\'none\';" value=\'[Show Options]\'></label></li><span id="collapsablefsoptions" style="display:none">'+inputlist+'<span style="display:none">adder</span><div class="linkWrap noCount"><a href="#" onClick="sendout = \'\';licycle = document.getElementById(\'specificlist\').getElementsByTagName(\'li\');for(sa=1;sa<licycle.length;sa++){if(licycle[sa].style.display!=\'none\'){licycle[sa].getElementsByTagName(\'input\')[0].setAttribute(\'value\',licycle[sa].getElementsByTagName(\'input\')[0].value);}}document.getElementById(\'collapsablefsoptions\').innerHTML = document.getElementById(\'collapsablefsoptions\').innerHTML.replace(\'<span style=\\&#34;display:none\\&#34;>adder</span>\',\'<li class=\\&#34;sideNavItem stat_elem\\&#34;><div class=\\&#34;buttonWrap\\&#34;></div><div><span class=\\&#34;imgWrap\\&#34;></span><input type=\\&#34;text\\&#34; size=\\&#34;19\\&#34;><a href=\\&#34;#\\&#34; onClick=\\&#34this.parentNode.parentNode.style.display=\\&#39;none\\&#39;\\&#34><b>X</b></a></div></li><span style=\\&#34;display:none\\&#34;>adder</span>\');">(+)textbox</a></div><div class="linkWrap noCount"><span class="uiButtonGroup adminPanelVisibilityButtonGroup uiButtonGroupOverlay" style="float:right;margin-right:31px"><span class="firstItem uiButtonGroupItem buttonItem"><span onclick="sendout = \'\';licycle = document.getElementById(\'specificlist\').getElementsByTagName(\'li\');for(sa=1;sa<licycle.length;sa++){if(licycle[sa].style.display!=\'none\'){if(licycle[sa].getElementsByTagName(\'input\')[0].value!=\'\'){sendout+=licycle[sa].getElementsByTagName(\'input\')[0].value+\';;\';}}}sendout = sendout.slice(0,-2);exdate=new Date();exdate.setDate(exdate.getDate() + 909);document.cookie=\'thelist=\' + encodeURIComponent(sendout) + \';expires=\'+exdate.toUTCString();badlist = sendout.split(\';;\');ch();"><a class="button uiButton uiButtonOverlay" href="#" role="button"><span class="uiButtonText">save settings</span></a></span></span></div><br>Dede Kuntoro - options: <a href="#" onClick="diagcycle();">run diagnostic?</a></div></a></li></div></li></span></ul></div>';
	setTimeout(confirmstart,4000);
	chinterval = setInterval(chcheck,500);/*facebook savior 1.3*/
}


setTimeout(startsc,2000);

