// ==UserScript==
// @name           SDMB Avatars
// @namespace      SDMB_Avatars
// @description    SDMB Avatars
// @include        http://boards.straightdope.com/sdmb/*
// @grant          none
// ==/UserScript==
(function() 
 {

// A user script based avatar system for the SDMB. By Polerius, ntucker, and Crazyhorse
// Last update: March 11, 2014 - added option to use old board smileys

// ADDING YOUR AVATAR
// To add your own avatar so that you and other users of the script see it by your posts, edit your SDMB profile
// to include the line "SDMB Avatar: (URL to avatar)" in any area of your profile. example: "SDMB Avatar: www.images.com/myimage.jpg"
// After adding or changing an avatar URL in your profile it can take up to an hour for the new avatar to appear.

// SETTING THE DEFAULT DISPLAY SIZE
// The display size of avatars is set to 50x50 pixels by default. This size can be changed in the code 
// immediately below this comment. (ex. if you change "50" to "100", avatars will be displayed at 100x100)


var imgsize="80";


// Hovering the mouse over an avatar while the Alt key is held down will display the avatar at full size.


// CUSTOM-ASSIGNED AVATARS
// Optionally add SDMB usernames and URLs in the list below to assign custom avatars to any posters.
// This can be used to block a given avatar by overriding their avatar choice, or to assign
// avatars to individual posters for any reason.

// Use the format <'username' : 'URL'> as shown in the examples below to add to the list.



var CustomAvatars = 	{

				'SDMB Username' : 'http://link.to.image/image.jpg',

				'SdMb username 2' : 'http://another.image.link/image2.gif',
				
				'sdmb username 3' : 'http://another.link/image3.png' //<-- no comma after the final entry

				};


// DEFAULT AVATAR
// Optionally choose a default avatar to display for all posters without avatars. Enter the URL to an image between 
// the quotation marks in the line below this comment. Example: DefaultAvatar = "http://path.to.image/default_user.jpg";
// Set the URL to "" to disable this feature. 

var DefaultAvatar = "";  


// BANNED USER AVATAR
// Optionally choose a default avatar to display for any poster who has been banned. 
// Edit the line below this comment as with DefaultAvatar above, specifying a URL to an image for all banned users
// Example: BannedAvatar = "http://url.to.image/banned_user.jpg"   Set the URL to "" to disable this feature

var BannedAvatar = "";


//Use old SDMB Smileys
//If this is on the old (Pre March 2014 board upgrade) smileys will be displayed
//to you and other users of the script instead of the newer ones.

var UseOldSmileys = "on"; //set to "on" or "off"


// Happy Avataring





if (UseOldSmileys.toLowerCase() == "on")
{
window.addEventListener('load', function() { 
var images = document.getElementsByTagName('img'); 
for (var i = 0; i < images.length; i++) { 
images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/smile.gif', 'http://s23.postimg.org/vvjuuub13/smile.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/confused.gif', 'http://s23.postimg.org/il0lf29uf/confused.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/eek.gif', 'http://s23.postimg.org/fthbogbbr/eek.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/mad.gif', 'http://s23.postimg.org/rxwl5fo7r/mad.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/rolleyes.gif', 'http://s23.postimg.org/ogz4g7ejb/rolleyes.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/cool.gif', 'http://s23.postimg.org/uo5x2mkwn/cool.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/tongue.gif', 'http://s23.postimg.org/3lcu4yic7/tongue.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/wink.gif', 'http://s16.postimg.org/srxd0b05t/wink.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/biggrin.gif', 'http://s23.postimg.org/kob0mq9nb/biggrin.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/redface.gif', 'http://s23.postimg.org/l6662kz87/redface.gif');

images[i].src = images[i].src.replace('http://boards.straightdope.com/sdmb/images/smilies/frown.gif', 'http://s23.postimg.org/b2m1k67vb/frown.gif');
} }, false);

}

    function loadImage(header, imgurl) {
        var img = document.createElement('img');

        img.addEventListener('load', function(evt) {
            var img = evt.target;
            if(img.width > 1) {
                img.style.cssFloat = "left";
                img.style.marginRight = "5px";
                img.style.borderWidth = "0";
                img.style.maxWidth = imgsize+"px";
                img.style.maxHeight = imgsize+"px";

                function biggify(evt) {
                    if(!evt.altKey) return;

                    var img = evt.target;
                    img.style.maxWidth = null;
                    img.style.maxHeight = null;
                    img.addEventListener('mouseout', unbiggify);
                }
                function unbiggify(evt) {
                    var img = evt.target;
                    img.style.maxWidth = imgsize+"px";
                    img.style.maxHeight = imgsize+"px";
                    img.removeEventListener('mouseout', unbiggify);
                }
                img.addEventListener('mouseover', biggify);
                img.addEventListener('mousemove', biggify);
                header.insertBefore(img, header.firstChild);
            }
		else if (DefaultAvatar != ""){
			imageurl=DefaultAvatar;
			loadImage(header, imageurl);
		}
        });

        img.src = imgurl;
    }

    var allNameHeaders = document.getElementsByClassName('bigusername');

    for (var i = 0; i < allNameHeaders.length; i++)
    {
    
	var username = allNameHeaders[i].innerHTML;
	var userhref = allNameHeaders[i].href;
	var SplitID = userhref.split("u=");
	var userid1 = SplitID[1];
	var imageurl="http://splitter.august20th.com/sdmbav.rb?userid=" + userid1;
        if(username in CustomAvatars)
            imageurl = CustomAvatars[username];
	var hdr = allNameHeaders[i];
	var title = hdr.parentNode.nextSibling.nextSibling;
	if(title.innerHTML == "BANNED" && BannedAvatar != "") {
            imageurl = BannedAvatar;
      }
        
      loadImage(allNameHeaders[i], imageurl);
      }

 })();