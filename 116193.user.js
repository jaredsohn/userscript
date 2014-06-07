// ==UserScript==
// @id             RedditStuff002
// @name           Reddit / Internet Thumbnail Viewer
// @version        1.0.0.2
// @namespace      
// @author         
// @description    This Script is a mixture of Three different reddit Scripts, namely, reddit inline images, Reddit Imgur Fix, Thumbnail Preview, I originally intended to create a script that shows me a thumbnail image, when I mouse-over a link, but as I have very very little programming skills, this is all I accomplished, this script shows small thumbnail images beside a direct image link in reddit r/funny and reddit comments in all subreddits i.e r/*, if the image is hosted at imgur but the link is not direct then the script converts it to a direct link and then displays the thumbnail. If you would like to increase or decrease the size of the thumbnail edit the values for, img.style.width and  img.width accordingly, keep these values same e.g. "500px" for img.style.width and 500 for  img.width, and if you want to view full size images, delete those two lines. If you want to use this script all over reddit, add  http://reddit.com/* and http://*.reddit.com/*, below,  in place of http://www.reddit.com/r/funny/ and http://www.reddit.com/r/*/comments/* , respectively. If you want to use this script, all over the internet i.e HTTP and HTTPS only, add http://* and https://*, below, in place of http://www.reddit.com/r/funny/ and http://www.reddit.com/r/*/comments/* , respectively.  Also, if you are in the know how of script creation, Please see if you could or/and would add mouse-over functionality to this script and post it in the review, or make another improved version of this script with mouse-over ability. If you do decide to help, please make sure that the mouse-over code does not require that javascript be allowed at target site, like the LinkThumb Script, FF NoScript plugin user here. This plugin was made for Scriptish (a Greasemonkey Fork) with Scriptish Scratchpad on Firefox 7.0.1, not sure if it will run with GreaseMonkey.
// @include        http://www.reddit.com/r/funny/*
// @include        http://www.reddit.com/r/*/comments/*
// @include        http://www.reddit.com/r/WTF/*
// @run-at         document-end
// ==/UserScript==

var a;
var links = document.getElementsByTagName('a'); 
for (var i = 0; i < links.length; i++) {
	a = links[i];
	if (a.host.indexOf("imgur.com")!=-1) {
		a.href = "http://i.imgur.com" + a.href.substr(a.href.lastIndexOf("/"),6) + ".jpg";
	}
}

var valid = new RegExp('.(jpe?g|gif|png|bmp)'); 
for(x in links){ 
                        var link = links[x];
                        var url = link.href; 
                        if(valid.test(url)){ 
                                                      var img = document.createElement('img');
                                                      img.src = url; 
                                                      img.style.display = 'block';
                                                      img.style.width = "190px";
                                                      img.width = 190;                                                      
                                                      img.style.verticalAlign = 'top';
                                                      link.parentNode.insertBefore(img, link.nextSibling);
                     
} } 

// JoeSimmons Script from http://userscripts.org/users/23652, adds ability to open full sized image in a newtab from thumbnail.

// OPTIONS /////////////////////////////////
var open_in_new_tab = true;
var use_middle_click = false;
////////////////////////////////////////////

function openImg(e) {
  var btnCode;
  if ('object' == typeof e){
    btnCode = e.button;
  }
// 0=normal click. 1=middle click. 2=right click
if(btnCode==1 && use_middle_click) {
if(open_in_new_tab) {GM_openInTab(e.target.src);}
else {top.location=e.target.src;}
}
else if(btnCode==0 && !use_middle_click) {
if(open_in_new_tab) {GM_openInTab(e.target.src);}
else {top.location=e.target.src;}
}
}

function aCheck(e) {
var p=e.parentNode, r=true;
while(p!=null && typeof p!='undefined') {
if(p.tagName && typeof p.tagName!='undefined' && p.tagName.toLowerCase()=='a') {r=false;}
p=p.parentNode;
}
return r;
}

if(typeof document.body=='undefined') return;

try {
var x, img, p1, p2, p3;
for(var i=document.images.length-1; i>=0; i--) {
img=document.images[i];
if(aCheck(img) && img.getAttribute('onClick')==null && img.parentNode.getAttribute('onClick')==null && !/(iPhorum\/editor\/)|(bbcode)|(\/reader\/ui)|(style_images\/)|(images\/smilies\/)|(\/editor)|(aw\/pics\/icons\/)/.test(img.src)) {
img.addEventListener('click', function(e){openImg(e);}, false);
}
}
} catch(e) {
alert('Error! Please report this to the creator!\n\nClicking OK will bring up a box in which you can copy the error and email it to TheTenfold@Gmail.com');
prompt('Here is the error:', e.description);
}
