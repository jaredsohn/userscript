// ==UserScript==
// @name           Tumblr Bad Image Hider
// @namespace      lovelyBirdCherry
// @description    Saves you from startling other people with nsfw pictures
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/show/*
// @include        http://www.tumblr.com/tagged/*
// ==/UserScript==


function finds_post_text(theStr){ //searches if the right div element
var whiteList = new Array('post_avatar'); //no hiding the avatar ! :D
  var blacklisted = false;
var whitelisted = false;
      var blackList = new Array('image'); //ok, now, with just one word it's kinda redundant. But it would probably break, if more words got added.

for(var i=0;i<=whiteList.length;i++) {
    var whiteWord = ''+whiteList[i];
    if(theStr.toLowerCase().indexOf(whiteWord.toLowerCase())>=0) {
      whitelisted = true;
    }
  }

 if (!whitelisted) {
for(var i=0;i<=blackList.length;i++) {
      var blackWord = ''+blackList[i];
      if(theStr.toLowerCase().indexOf(blackWord.toLowerCase())>=0) {
        blacklisted = true;
      }
}
}

  return blacklisted;
}

function needstobesaved(theStr){ //searches if the right post, containing the "bad" words
  var blackList = new Array('nsfw', 'porn');
  var whiteList = new Array('feminism');
  var blacklisted = false;
  var whitelisted = false;
  
  for(var i=0;i<=whiteList.length;i++) {
    var whiteWord = ''+whiteList[i];
    if(theStr.toLowerCase().indexOf(whiteWord.toLowerCase())>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      var blackWord = ''+blackList[i];
      if(theStr.toLowerCase().indexOf(blackWord.toLowerCase())>=0) {
        blacklisted = true;
      }
    }
  }
  return blacklisted;
}

var liPosts = document.getElementsByTagName('li'); //all posts are inside li
var last_check = 0;
  
function check_for_saving() {
	for (var i=last_check;i<liPosts.length;i++) {
		if (liPosts[i].id.substring(0,4)=='post' && liPosts[i].className.indexOf('not_mine') >= 0) { //the posts' id starts with "post" and has a name "not mine"
var foundsomething = false;

			var savedfrom = needstobesaved(liPosts[i].innerHTML); //calls the function
			if (savedfrom) {

				var div_filtered = document.createElement('div');
				//div_filtered.style.display = 'none'; //this would have hidden the whole post, but I want to remove only the post_content

//we are gonna add all the childNodes normally, except the image containing node, that will have a display:none
				while (liPosts[i].childNodes.length > 1) {	
					
					var consistsOf=liPosts[i].childNodes[0].innerHTML;

					if (consistsOf) { //if the element isn't blank

						
						var somebool = finds_post_text(consistsOf); //finds if bad post contains the word "image"
						if (somebool) { 
							var div_filtered_img = document.createElement('div');
							div_filtered_img.style.display = 'none';  //make the post content invisible :D
							div_filtered_img.appendChild(liPosts[i].childNodes[0]); foundsomething = true;
							div_filtered.appendChild(div_filtered_img);
						} else {
							div_filtered.appendChild(liPosts[i].childNodes[0]); //add childNode as it was back NON-BAD
							}						
					} else {
						div_filtered.appendChild(liPosts[i].childNodes[0]); //add childNode as it was back BLANK
					}
						
				}
if (foundsomething) { //always gonna be true, cause it's avatar picture
			var div_notice = document.createElement('div'); //here is the text of notification and clickability
			div_notice.className = 'post_info';
div_notice.innerHTML = 'Image hidden. <a onClick="if(this.parentNode.previousSibling.childNodes.length<1) {for(var i=0; i<this.parentNode.nextSibling.childNodes.length; i++) {if (this.parentNode.nextSibling.childNodes[i].style) this.parentNode.nextSibling.childNodes[i].style.display=\'\';}} else {for(var i=0; i<this.parentNode.previousSibling.childNodes.length; i++) {if (this.parentNode.previousSibling.childNodes[i].style) this.parentNode.previousSibling.childNodes[i].style.display=\'\';} }; this.parentNode.style.display=\'none\'; this.parentNode.nextSibling.style.display=\'\'; return false; " href="#"><i>View</i></a> if alone.';
//I have no idea why, but sometimes the Childs get flipped over and then this if function is needed. Wut. 
//this function displays the hidden child upon clicking. I failed to know how to save the number of the childNode, so now all childs must be walked through

			liPosts[i].appendChild(div_notice); }
			liPosts[i].appendChild(div_filtered);

			}
		}
	}

	last_check = liPosts.length;
}

function addGlobalStyle(css) {
  var elmHead, elmStyle;
  elmHead = document.getElementsByTagName('head')[0];
  elmStyle = document.createElement('style');
  elmStyle.type = 'text/css';
  elmHead.appendChild(elmStyle);
  elmStyle.innerHTML = css;
}

var better_rule = '.source_url {display:none !important;}';
try {
  document.styleSheets[0].insertRule(better_rule, 0);
} catch (e) {
  addGlobalStyle(better_rule);
}

setInterval(check_for_saving, 200);