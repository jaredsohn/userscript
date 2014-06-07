// ==UserScript==
// @name        Facebook Guardian
// @author      Sumit Patel.
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