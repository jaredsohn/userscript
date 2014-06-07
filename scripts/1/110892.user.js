// ==UserScript==
// @id             sigpreview
// @name           Signature Preview
// @version        2.0
// @namespace      Product of Studio TAKUMI
// @author         J. "TAKUMI" Burton
// @description    Allows you to preview your signature on the user preferences page as well as forum posts before you submit them.
// @include        http://valenth.com/user.php?act=signature
// @include        http://www.valenth.com/user.php?act=signature
// @include        http://valenth.com/forums/read/*
// @include        http://www.valenth.com/forums/read/*
// @include        http://valenth.com/forums/act/edit/*
// @include        http://www.valenth.com/forums/act/edit/*
// @run-at         document-end
// ==/UserScript==


GM_addStyle('em.fineprint { font-size: 8pt; }');

regforums = /forums\/(read|act\/edit)/;
OnForum = regforums.test(document.URL);
SigDrawn = false;


if (OnForum == false) {
	GM_addStyle('body { overflow-x: hidden; }');
	
	SandboxArea = document.createElement('div');
	SandboxArea.id = 'sandboxarea';
	
	with (SandboxArea.style) {
		border = '1px dashed sienna';
		width = '66%';
		maxHeight = '150';
		marginTop = '10px';
		padding = '10px';
		overflow = 'hidden';
		textAlign = 'left';
	}
	
	defaultspiel = '<center>I\'m a little signature, short and stout...<br /><em class="fineprint">(And limited to 450 characters)</em></center>';
	SandboxArea.innerHTML = defaultspiel;
	
	
	if (OnForum == false) {
		LaSeccion = document.getElementById('user_content');
		TArea = LaSeccion.childNodes[0].childNodes[LaSeccion.childNodes[0].childNodes.length - 1].childNodes[0];
	}
	
	else {
		LaSeccion = document.getElementById('post_reply');
		TArea = LaSeccion.childNodes[1].childNodes[1];
	}
	
	
	if (OnForum == false) {
		Subby = document.createElement('button');
		Subby.className = 'large awesome';
		Subby.innerHTML = 'Preview Signature';
		Subby.type = 'button';
	}
	
	else {
		Subby = document.createElement('input');
		Subby.className = 'large awesome';
		Subby.innerHTML = 'Preview Post';
		Subby.type = 'button';
	}
	
	Subby.id = 'subby';
	Subby.addEventListener('click', drawSig, false);
	
	Prevheader = document.createElement('h2');
	Prevheader.innerHTML = 'Preview:';
	
	TArea.parentNode.insertBefore(Subby, TArea.nextSibling.nextSibling);
	TArea.parentNode.parentNode.insertBefore(SandboxArea, TArea.parentNode.nextSibling);
	SandboxArea.parentNode.insertBefore(Prevheader, SandboxArea);
	SandboxArea.parentNode.insertBefore(document.createElement('br'), SandboxArea.previousSibling);
	
	hypotheticalDiv = document.createElement('div');
	
	with (hypotheticalDiv.style) {
		width = '66%';
		minHeight = '10px';
		visibility = 'hidden';
		position = 'absolute';
	}
	
	body = document.getElementsByTagName('body')[0];
	body.appendChild(hypotheticalDiv);
	
	drawSig();
}

else {
	GM_addStyle('input[type="submit"], input[type="button"] { float: left; width: 40%; }');
	GM_addStyle('h2 { clear: both; }');
	
	if (/edit/.test(document.URL)) {
		GM_addStyle('input[type="button"] { margin-left: 9%; }');
	}
	
	Logout = document.getElementById('logout');
	
	if (Logout != null) {
		Leup = Logout.childNodes[1].childNodes[1].src;
		UserPage = Logout.childNodes[1].childNodes[2].href;
		Name = Logout.childNodes[1].childNodes[2].innerHTML;
		FoundPost = false;
		
		Sandbox = document.createElement('div');
		Sandbox.id = 'sandbox';
		
		with (Sandbox.style) {
			marginTop = '10px';
			overflow = 'hidden';
			textAlign = 'left';
		}
		
		defaultspiel = SpewCannedMessage();
		
		Sandbox.innerHTML = '<div id="forum_container"><table class="forums_post"><tbody><tr><td colspan="2" class="forum_post_options">' + LookAtTheTime() + ' | <a href="javascript:function x() {alert(\'Nice try, but you can\'t quote something you haven\'t said yet.\');} x();">Quote</a> - <a href="javascript:function y() {alert(\'You\'re already editing your post.\');} x();">Edit</a> - <a href="javascript:function z() {alert(\'Whoa, wait up! You can\'t delete a post before you post it!\');} x();">Delete</a></td></tr><tr><td class="forum_post_text" valign="top"><div id="sandboxarea"></div><hr /></td><td class="forum_post_user" valign="top"><a href="' + UserPage + '"><b><img src="' + Leup + '" align="top"></b></a><b><a href="' + UserPage + '">' + Name + '</a></b><br><br><img src="" id="avatardesu"><br>Posts: 100<br></td></tr></tbody></table></div>';
		
		// You don't need to use a sword to kill a chicken.
		
		Signhere = document.createElement('div');
		Signhere.id = 'sign';
		Signhere.style.visibility = 'hidden';
		
		
		if (/edit/.test(document.URL) == false) { 
			Posts = document.getElementsByClassName('forums_post');
			
			for (i = 0; i < Posts.length; i++) {
				if (Posts[i].childNodes[0].childNodes[1].childNodes[1]) { // if it's not an advert...
					if (Posts[i].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].innerHTML == Name) { // and it has your name on it...
						Sandbox.innerHTML = Sandbox.innerHTML.replace('src=""', 'src="' + Posts[i].childNodes[0].childNodes[1].childNodes[1].childNodes[4].src + '"');
						
						PostCount = Posts[i].childNodes[0].childNodes[1].childNodes[1].childNodes[6].textContent.replace('Posts: ', '');
						PostCount = PostCount * 1 + 1;
						
						Sandbox.innerHTML = Sandbox.innerHTML.replace('Posts: 100', 'Posts: ' + PostCount + '');
						Signhere.innerHTML = Posts[i].childNodes[0].childNodes[1].childNodes[0].innerHTML.replace(/([.\n]|.)+<hr>(\s)?/, '');
						
						Signhere.style.visibility = 'visible';
						FoundPost = true;
						SigDrawn = true;
					}
				}
			}
		}
		
		if (FoundPost == false) {
			fetchData('avatar');
			fetchData('signature');
		}
		
		
		LaSeccion = document.getElementById('post_reply');
		
		if (LaSeccion != null) {
			TArea = LaSeccion.childNodes[1].childNodes[1];
		}
		
		else {
			TArea = document.getElementsByTagName('textarea')[0];
		}
		
		Subby = document.createElement('input');
		Subby.value = 'Preview';
		Subby.type = 'button';
		Subby.id = 'subby';
		Subby.addEventListener('click', drawSig, false);
		
		Prevheader = document.createElement('h2');
		Prevheader.innerHTML = 'Post Preview:';
		
		TArea.parentNode.insertBefore(Subby, TArea.nextSibling.nextSibling);
		TArea.parentNode.parentNode.insertBefore(Sandbox, TArea.parentNode.nextSibling);
		Sandbox.parentNode.insertBefore(document.createElement('br'), Sandbox);
		Sandbox.parentNode.insertBefore(document.createElement('br'), Sandbox);
		Sandbox.parentNode.insertBefore(Prevheader, Sandbox);
		
		if (/edit/.test(document.URL)) {
			Sandbox.parentNode.insertBefore(document.createElement('br'), Prevheader);
		}
		
		Sandbox.parentNode.insertBefore(document.createElement('br'), Sandbox.previousSibling);
		
		SandboxArea = document.getElementById('sandboxarea');
		SandboxArea.innerHTML = defaultspiel;
		
		SandboxArea.parentNode.insertBefore(Signhere, SandboxArea.nextSibling.nextSibling);
	}
}


function drawSig() {
	Sig = TArea.value; // this is actually the post when OnForum.
	Length = TArea.value.length;
	
	if (OnForum == true && SigDrawn == false) { // So, if OnForum, the REAL sig goes in here. Confused? XD
		RealSig = Signhere.innerHTML;
	}
	
	if (Length > 450 && OnForum == false) {
		S = (((Length - 450) > 1) ? 's' : '');
		Sig = '<center>ERROR! Your signature is ' + Length + ' characters long, ' + (Length - 450) + ' character' + S + ' over the limit. Try to be a bit more concise.<br /><em class="fineprint">(Hint: if you have long URLs, try using TinyURL and/or TinyPic.)</em></center>';
	}
	
	else {
		if (Sig == '') {
			Sig = defaultspiel;
		}
		
		else {
			Sig = ParseBBCode(Sig);
			
			if (OnForum == false) {
				hypotheticalDiv.innerHTML = Sig;
				SiegHeight = document.defaultView.getComputedStyle(hypotheticalDiv, "").getPropertyValue("height").replace('px','');
				
				if (SiegHeight > 150) {
					Sig = Sig + '<br /><br /><center><span style="font-weight: bold;">^ Warning! Your signature is too tall (' + (SiegHeight - 150) + ' pixels over the limit).</span><br /><em class="fineprint">(You should probably hack a little of it off.)</em></center>';
				}
			}
		}
		
		if (OnForum == true && SigDrawn == false) {
			RealSig = ParseBBCode(RealSig, 'sig');
		}
			
	}
	
	SandboxArea.innerHTML = Sig;
	
	if (OnForum == true && SigDrawn == false) {
		Signhere.innerHTML = RealSig;
		Signhere.style.visibility = 'visible';
		SigDrawn = true; 
	}
}
	

function ParseBBCode(Sig, type) {
	if (type == undefined) {
		type = 'default';
	}
	
	if (OnForum == true && type == 'default') {
		Sig = Sig.replace(/\n/g, '<br>');
	}
	
	else if (OnForum == true && type != 'default' || OnForum == false) {
		Sig = Sig.replace(/(\n)+/g, ' ');
	}

	Sig = Sig.replace(/@([A-Za-z]+)_([A-Za-z]+)/g, '@'); // Note: this is what the forums display, but it's still the valid way to ping users with spaces.
	Sig = Sig.replace(/@([A-Za-z]+)/g, '<span class="forum_user_shoutout">@<a href="/user/$1">$1</a></span>');
	
	Sig = Sig.replace(/\[quote=([A-Za-z\s]+)\]/g,'<b>Quote By $1:</b><blockquote style="padding:5px; line-height:15px; background-color:																#FAFFFF; border: 1px solid #000000; font-family: georgia; font-size:																				10;">');
	Sig = Sig.replace(/\[quote\]/g,'<b>Quote:</b><blockquote style="padding:5px; line-height:15px; background-color:																	#FAFFFF; border: 1px solid #000000; font-family: georgia; font-size:																				10;">');
	Sig = Sig.replace(/\[\/quote\]/g,'</blockquote>');
	
	Sig = Sig.replace(/\[br\]/g,'<br />');
	Sig = Sig.replace(/\[br clear=all\]/g,'<br clear="all" />');
	Sig = Sig.replace(/\[hr\]/g,'<hr />');
	Sig = Sig.replace(/\[p\]/g,'<p />');
	Sig = Sig.replace(/\[(heart|<3)\]/g,'&hearts;');
	Sig = Sig.replace(/\[nbsp\]/g,'&nbsp;');
	Sig = Sig.replace(/\[edit\]/g,'<div style="border-top:1px solid #999999; padding: 3px; background-color:#DEDEDE; color:#111111;"><b>Edit:</b></div>');
	Sig = Sig.replace(/\[(\/)?(h1|header)\]/g,'<$1h1>');
	
	Sig = Sig.replace(/\[(\/)?center\]/g,'<$1center>');
	Sig = Sig.replace(/\[(\/)?b\]/g,'<$1strong>');
	Sig = Sig.replace(/\[(\/)?i\]/g,'<$1i>');
	Sig = Sig.replace(/\[(\/)?u\]/g,'<$1u>');
	Sig = Sig.replace(/\[(\/)?big\]/g,'<$1big>');
	Sig = Sig.replace(/\[(\/)?small\]/g,'<$1small>');
	Sig = Sig.replace(/\[(\/)?s\]/g,'<$1s>');
	Sig = Sig.replace(/\[(\/)?sup\]/g,'<$1sup>');
	Sig = Sig.replace(/\[(\/)?sub\]/g,'<$1sub>');
	Sig = Sig.replace(/\[(\/)?code\]/g,'');
	
	Sig = Sig.replace(/\[align=([a-z]+)\]/g,'<p align="$1">');
	Sig = Sig.replace(/\[\/align\]/g,'</p>');
	Sig = Sig.replace(/\[color=([A-Za-z0-9#]+)\]/g,'<span style="color: $1;">');
	Sig = Sig.replace(/\[bgcolor=([A-Za-z0-9#]+)\]/g,'<span style="background-color: $1;">');
	Sig = Sig.replace(/\[size=([A-Za-z0-9]+)\]/g,'<span style="font-size: $1;">');
	Sig = Sig.replace(/\[font=([A-Za-z0-9\s]+)\]/g,'<span style="font-family: $1;">');
	Sig = Sig.replace(/\[\/(size|font|(bg)?color)\]/g,'</span>');
	
	Sig = Sig.replace(/\[img\]/g,'<img src="');
	Sig = Sig.replace(/\[\/img\]/g,'" />');
	
	Sig = Sig.replace(/\[user=[A-Za-z0-9\s-]+\]/g,''); // bug; goes away in real parser too
	
	Sig = Sig.replace(/\[\/url\]/g,'</a>');
	Sig = Sig.replace(/\[url="?/g,'<a href="');
	Sig = Sig.replace(/"?\]/g,'">');
	
	var reggie = /\[(random|avatar)=/;
		
	if (reggie.test(Sig)) {
		Sig = '<center>SQL Error #'+ Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 1000) +'! Stack overflow! Rift in the time-space continuum!<br /><em class="fineprint">(Maybe you shouldn\'t use that particular BBCode.)</em></center>'; 
		// this is a joke for functions that cause a SQL error in actual parser
	}
	
	return Sig;
}


function SpewCannedMessage() {
	var CannedMessages = new Array('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor eros at justo suscipit lacinia. Vestibulum mauris ligula, malesuada id congue a, auctor at nisi.', 'Integer risus dolor, consequat id euismod quis, varius ac arcu. Nunc pharetra, ligula at pellentesque eleifend, lorem felis ultricies dui, et tempor lectus sapien sed turpis.', 'Praesent at sem neque. Morbi quis lorem quis leo vestibulum euismod. Donec nec lacinia velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.', 'Pellentesque sodales metus tempus dui interdum molestie. Vivamus imperdiet, dolor non condimentum malesuada, risus quam suscipit arcu, vitae eleifend lorem mauris ac tortor.', 'Curabitur a mauris sem. Vestibulum eu mi quis sapien commodo condimentum ut fermentum diam.', 'Ante massa tempus purus, non laoreet justo leo non nibh.', 'O Forum Post, O Forum Post, how lovely is your sig line...', 'Turning and turning in the widening gyre, the forum cannot hear the forum post...', 'The eye of man hath not heard, the ear of man hath not seen, the wonder of this forum post.', 'Is this a form now which I see before me, the button toward my mouse? Come, let me post thee.');
	
	var Message = CannedMessages[Math.floor(Math.random() * CannedMessages.length)];
	
	return Message;
}


function LookAtTheTime() {
	var Time = new Date(), Month = Time.getUTCMonth(), Day = Time.getUTCDate(), Year = Time.getUTCFullYear(), Hours = Time.getUTCHours(), Minutes = Time.getUTCMinutes();
	
	Hours -= 5; // convert UTC to Valenth
	
	if (Hours < 0) {
		Hours += 24;
		Day -= 1;
	}
	
	if (Day < 0) {
		Month -= 1;
		GregoryBeConfounded = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		Day += GregoryBeConfounded[(Month < 0 ? Month + 12 : Month)];
	}
	
	if (Month < 0) {
		Month += 12;
		Year -= 1;
	}
		
	var Meridian = (Hours < 12 ? 'AM' : 'PM');
	
	if (Meridian == 'PM') {
		Hours -= 12;
	}
	
	if (Minutes < 10) {
		Minutes = '0' + Minutes;
	}
	
	Year = Year + '';
	Year = Year.replace(/^[12][09]/, '');
	
	return (Month + 1) + '/' + Day + '/' + Year + ' ' + Hours + ':' + Minutes + ' ' + Meridian;
}


function fetchData(what) {
	if (what == 'avatar') {
		link = 'http://www.valenth.com/user.php?act=avatar';
	}
	
	else if (what == 'signature') {
		link = 'http://www.valenth.com/user.php?act=signature';
	}
	
	if (what == 'avatar' || what == 'signature') {
		GM_xmlhttpRequest({
			method: "GET",
			url: link,
			headers: {
				"User-Agent": "Mozilla/4.0 (compatible) Greasemonkey"
			},
			
			onreadystatechange: function (responseDetails) {
				if (responseDetails.status == 200) {										
					myHTML = responseDetails.responseText.replace(/(<(\/)?html>)|<head(.|\s)*?\/head>|<(\/)?body(.*)>|<script(.|\s)*?\/script>|<\!DOCTYPE html>|(<(\/)?body>)/g, '');
					tempDiv = document.createElement('div');
					tempDiv.innerHTML = myHTML;								
				
					// Now the entire body of the page is inside an imaginary div. Is that weird? ^_^
					
					if (what == 'avatar') {
						Av = document.getElementById('avatardesu');
						
						if (regforums.test(Av.src)) {
							GrandList = tempDiv.getElementsByTagName('form')[0];
							imgsrc = '';
							
							//GrandList.childNodes.length
							for (i = 0; i < 10; i++) {
								if (GrandList.childNodes[i].childNodes[3].childNodes[0].checked == true) {
									Av.src = GrandList.childNodes[i].childNodes[2].src;
								}
							}
							
							if (imgsrc == '') {
								imgs = tempDiv.getElementsByTagName('img');
								
								if (imgs[imgs.length - 1] != undefined) {
									Av.src = imgs[imgs.length - 1].src;
								}
							}
							
							else if (imgsrc == '') {
								Av.src = 'http://valenth.com/lab/10765488.png';
								// Then put in a nice little leupak named "Avatar Error"
							}
						}
					}
					
					else if (what == 'signature') {
						Sigarea = tempDiv.getElementsByTagName('textarea')[0];
						Result = Sigarea.innerHTML;
						//Sigline = document.getElementById('sign');
						
						if (Signhere.innerHTML == '') {
							Signhere.innerHTML = Result;
							drawSig();
						}
					}
					
					tempDiv.innerHTML = '';
				}
			}
		});
	}
}
