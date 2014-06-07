// ==UserScript==
// @name           Black and White Homepage
// @description    Creates a new myspace homepage. Made by the grim_reaper, myspace.com/grim_reaper007
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';



s= "tr{color:grey!important; background-color:#fddddf!important;border:0px!important;}\n";
s+= "#home_profileinfo{color:grey!important;
 background-color:#fddddf!important;border:0px!important;}\n";
s+= "a{color:#8d656c!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#8d656c!important;font-weight:bold!important;border-bottom:1px dashed #BB9599!important;}\n";
s+= "h4.heading{ font-size:10pt!important; line-height:10px!important; letter-spacing:-1px; color:black!important;}\n";

//Change the part before title
html = document.body.innerHTML.replace(/Hello,/, "eek it's "); 
document.body.innerHTML = html;

//change Friends title
html = document.body.innerHTML.replace(/My Friend Space/, "my loves"); 
document.body.innerHTML = html;

//change school title
html = document.body.innerHTML.replace(/Visit My School Home Page/, "SCHOOL! :("); 
document.body.innerHTML = html;

//change bulletins title
html = document.body.innerHTML.replace(/My Bulletin Space/, "whats new?"); 
document.body.innerHTML = html;

//change mail title
html = document.body.innerHTML.replace(/My Mail/, "mailtime!"); 
document.body.innerHTML = html;


GM_addStyle(s);

if (document.forms.length > 0) {

	var pattern = "//div[@class=\"section\"]//div//center//a";
	var vl = document.evaluate( pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var pl = vl.snapshotItem(0);
	if (pl)	{
		var friendID = pl.href.split("friendid=");

		var cmnts = document.createElement('a');
		cmnts.href = "http://comments.myspace.com/index.cfm?fuseaction=user.homeComments&friendID="+friendID[1];
		cmnts.innerHTML = 'Cmnts';

		var bar = document.createElement('span');
		bar.innerHTML = ' | ';

		var bloglink = document.getElementById('ctl00_Main_ctl00_Welcome1_ViewMyBlogHyperLink');
		bloglink.parentNode.insertBefore(cmnts, bloglink);
		bloglink.parentNode.insertBefore(bar, bloglink);

		var signout = document.createElement('a');
		signout.href = "http://collect.myspace.com/index.cfm?fuseaction=signout";
		signout.innerHTML = 'Sign Out';

		var rank = document.getElementById('ctl00_Main_ctl00_InfoBar1_EditCommentsHyperLink');
		rank.parentNode.insertBefore(signout, rank);
		
		var space = document.createElement('br');
		rank.parentNode.insertBefore(space, rank);
	}
}


