// ==UserScript==
// @name           TotalFark Classic
// @namespace      TotalFark Classic
// @description    For those who fear change for $5 a month.
// @include        *.fark.com*
// @include        *.totalfark.com*

// @include        *.foobies.com*
// @include        *.ultrafark.com*


// ==/UserScript==
//permission granted for the user to use this;copyright taken and released to the user without expectation of royalties or some junk
// GM_addStyle("#{ !important}"); Just a blank to be lazy with
GM_addStyle("body{background:#fff !important}");
GM_addStyle("#mainLogo{margin:0 50% 0 40% !important}");
GM_addStyle("#siteContainer{width:99%;padding:0 0 0 0;border-width:2pt !important}");
GM_addStyle("#bodyContainer,#bodyHeadlineContainer,#bodyTabContainer,#TFbodyTabContainer{width:100% !important}");
GM_addStyle("#bodyMainContainer,#TFbodyMainContainer{width:99%;padding:0 0 0 0;border-width:2pt !important}");
GM_addStyle("#topMenu ul li a{margin:0 15% 0 30% !important}");
//If you are having problems, you can kill the rest of this and have an ugly but functioning wide page
//Unrainbows to cure the desire for Skittles
GM_addStyle("#bodyTabNotNews,#bodyTabGeek,#bodyTabSports,#bodyTabPolitics,#bodyTabShowbiz,#bodyTabVideo,#bodyTabMusic,#bodyTabVoting,#bodyTabBusiness,#bodyTabFoobies,#bodyTabTF,#bodyTabTFDisc,#bodyTabTFAll,#bodyTabTFCom,#bodyTabTFVoting{position:absolute;top:1px;background:#669;font-weight:bold;border-bottom:0px; top:131px !important}");
GM_addStyle("#bodyHeadlineContainer,#TFbodyHeadlineContainer{background:#f9f9f9 url(http://img.fark.com/images/2007/site/bodyGradientNotNews.gif)top left repeat-x !important}");
GM_addStyle("#bodyFarkives{background:#669;width:100%;padding:5px !important}");
//  Shove the tabs out to the center for a classic look and annoy Drew's webdesign folk
GM_addStyle("#bodyTabNotNews{left:8% !important}");
GM_addStyle("#bodyTabGeek{left:21% !important}");
GM_addStyle("#bodyTabSports{left:28% !important}");
GM_addStyle("#bodyTabPolitics{left:35% !important}");
GM_addStyle("#bodyTabShowbiz{left:45% !important}");
GM_addStyle("#bodyTabVideo{left:55% !important}");
GM_addStyle("#bodyTabMusic{left:65% !important}");
GM_addStyle("#bodyTabVoting{left:75% !important}");
GM_addStyle("#bodyTabBusiness{left:85% !important}");

//TotalFark Classic Goodness. Based on Screenshots, not actual TF account. I'm a cheap basterd.
GM_addStyle("#bodyTabTF{left:20% !important}");
GM_addStyle("#bodyTabTFDisc{left:35% !important}");
GM_addStyle("#bodyTabTFAll{left:55% !important}");
GM_addStyle("#bodyTabTFCom{left:65% !important}");
GM_addStyle("#bodyTabTFVoting{left:80% !important}");
//more classic touches
GM_addStyle(".mainDate  {background: #FFC; padding: 2px 0 2px 0  !important}");
GM_addStyle("#commentsArea {background:#f9f9f9  !important}");
//equality of readability
GM_addStyle("#commentsArea .ctable, #commentsArea .ctableTF, #commentsArea .ctable a, #commentsArea .ctableTF a{background:#ccc; border:0px; color:#333333  !important}");
GM_addStyle("#topAd728x90 {top:20px;  left:500px; width:54px; height:1px; background-image: url(http://img.fark.com/images/2003/totalfark.gif);background-repeat: no-repeat; background-position:30% 1pt;width: 230; border:0px; color:#333333  !important}");
//run from the borders; unfaker image border removed. who fakes Fark Classic in a post (besides author?)
//disabled for now since cat threads and such may scramble Firefox's brainz
//GM_addStyle("#commentsArea .ctext img {border:0px !important  !important}");
//Pandora's Box:fark forums (on the fark right)
GM_addStyle("#topSearch{position:absolute;top:1px;left:1135px;width:145px;border:0 !important}");
GM_addStyle("#bodyRightSideContainer,#TFbodyRightSideContainer{position:absolute;top:75px;left:1135px;width:135px;background:#fff !important}");
GM_addStyle("#Classifieds,#rightAd300x250,#rightAd160x600,#rightSideRightMenubar{display:none !important}");
GM_addStyle(".rightLMItems{width:130px;height:340px !important}");
GM_addStyle("#rightSideLeftMenubar{color:#669;width:125px !important}");
//NO CARRIER (easter egg) --remove if you don't like externally loaded images from photobucket; Apparently, you don't read the comments section of Fark.
//This is where the really useless stuff goes; nuke the whole section if you are annoyed by this, or it melts your computer. Warning: may melt computers.

//A joke for someone who shouldn't be using this. Hi Mods. How'd you get HERE?
GM_addStyle("#narcArea{text-decoration:blink  !important}");

//when visiting ultrafark- login and password not included. email Drew or WIl for an account, I think. Or call Jeff. His number is.. 1-800-555-1212
function addGlobalStyle(css){var head, style;head = document.getElementsByTagName('address')[0];   if (!head){return;} style = document.createElement('style');style.type = 'text/css';style.innerHTML = css;head.appendChild(style);}
addGlobalStyle('address{font-size:0pt;position:absolute;top:200px;left:250px;width:435;height:96;background:url(http://img.photobucket.com/albums/v697/kayoteq/ultrafark/ultraf.gif) !important;}');
//didn't work, did it?
//random tag.. it's not a waste of time, it's.. a waste of time. With Walken goodness
//var imgrurl = new Array	("topics/amusing.gif","topics/farktography.gif","topics/followup.gif","topics/ironic.gif","topics/interesting.gif","topics/misc.gif","topics/obvious.gif","topics/sad.gif","topics/sappy.gif","topics/satire.gif","topics/sick.gif","topics/silly.gif","topics/spiffy.gif","topics/stupid.gif","topics/survey.gif","topics/videoedit.gif","2001/topics/asinine.gif","2001/topics/audio.gif","2001/topics/caption.gif","2001/topics/cool.gif","2001/topics/hero.gif","2001/topics/photoshop.gif","2001/topics/plug.gif","2001/topics/psa.gif","2001/topics/newsflash.gif","2001/topics/scary.gif","2001/topics/strange.gif","2001/topics/video.gif","2001/topics/weird.gif","2001/topics/wheaton.gif","2002/topics/advice.gif","2002/topics/boobies.gif","2002/topics/dumbasss.gif","2002/topics/florida.gif","2002/topics/unlikely.gif","2002/topics/weeners.gif","2003/topics/audioedit.gif","2003/totalfark.gif", "2001/topics/walken.gif","2002/links/new/farkman.gif");
//GM_addStyle("#topAd728x90 {border:0px; float:none; top:12px;  left:540px; width:77px; height:27px; background-image: url(http://img.fark.com/images/"+ imgrurl[Math.round(Math.random()*(imgrurl.length-1))]+");background-repeat: no-repeat; background-position:30% 1pt;width: 230; border:0px; color:#333333  !important}");
//Uncomment to 'enable' ultrafark. Congrats on actually reading the source.
//var logo = document.createElement('img');
//logo.src = 'data:image/gif,GIF89a6%00%0A%00%B3%00%00%8C%8B%9B%F6%F5%F6%AA%A9%B5xw%8B%F3%F2%F3gf%7C%E1%E0%E4%D8%D7%DC%B8%B7%C1%F8%F7%F7%9B%9A%A8%EE%ED%EF%F9%F8%F8%CF%CE%D4%5D%5CtQPi!%F9%04%00%00%00%00%00%2C%00%00%00%006%00%0A%00%00%04%E9%B0%B8I%AB%BD8k%2CU%7B%8F%F7%20%0A%884h3%9C(%00%3EM%19%A6%C83%A8%A0%87%0A%F6%07%23%03G%83%01%1A%3E%16%BE%C3%82%11X%00%16%C8Eb%F0%100%08%C5%04%F4%F080%B8%B0%40%C3%2BP%10%11%09%C0%C4%08%23%22_%0F%86%EFm.%19%96%AE%C6%02%DEL%14%F7q1%0C%08%0C%25kDmG%3E%20r%20PzX%05%0C%02%04%5C%0DZNV%03%93acSf%0C%09%05%0F%87En%8B%81%8EH%04X%84z%010%04%0A%0A%05%06b%01%06%9DR%03f%97%7B%13%84.%0B%B0%0B%06%B3T%8D%8A!nHC%02z%20%05%09%06%0D%06%0C%05%D0q%B3DV%08%13%05%04%0C%E25K%E2%1F%C9o%00%93%0C.%0F%04%D4%80h%D1%83%D9%09%82%8Ei%0E%20%00%B4p%FE%FF%00%03%0A%0C%E8%40%C2%86%83%08%13Z(%10%01%00%3B';
//document.body.insertBefore(logo, document.body.firstChild);
//End NO CARRIER (easter egg)
//Slashies!
