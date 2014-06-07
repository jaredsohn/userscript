// Based on the original script by miss.mika (http://chrispy-cookies.blogspot.com/) 
// Modified by  (http://notsosecretive.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           smilies smillies
// @namespace      http://www.notsosecretive.blogspot.com/
// @description    You can use emoticons in Blogger. by notsosecretive.blogspot.com
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
buttons += emoticonButton(":1:",  "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hihi.png");
buttons += emoticonButton(":2:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hehe.png");
buttons += emoticonButton(":3:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hehe-1.png");
buttons += emoticonButton(":4:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/handphone.png");
buttons += emoticonButton(":5:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hand.png");
buttons += emoticonButton(":6:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/gurl.png");
buttons += emoticonButton(":7:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/grr.png");
buttons += emoticonButton(":8:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/9.png");
buttons += emoticonButton(":9:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/frog.png");
buttons += emoticonButton(":10:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/flower.png");
buttons += emoticonButton(":11:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/eat.png");
buttons += emoticonButton(":12:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cry-1.png");
buttons += emoticonButton(":13:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cryoutloud.png");
buttons += emoticonButton(":14:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/crown.png");
buttons += emoticonButton(":15:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cancel.png");
buttons += emoticonButton(":16:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cake.png");
buttons += emoticonButton(":18:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/butterfly.png");
buttons += emoticonButton(":17:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/boy.png");
buttons += emoticonButton(":18:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/blur.png");
buttons += emoticonButton(":19:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bleh.png");
buttons += emoticonButton(":20:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bleauk.png");
buttons += emoticonButton(":21:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/bee.png");
buttons += emoticonButton(":22:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/angry.png");
buttons += emoticonButton(":23:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/8.png");
buttons += emoticonButton(":24:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/7.png");
buttons += emoticonButton(":25:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/72.png");
buttons += emoticonButton(":26:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/6.png");
buttons += emoticonButton(":27:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/5.png");
buttons += emoticonButton(":28:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/4.png");
buttons += emoticonButton(":29:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/43-Copy.png");
buttons += emoticonButton(":30:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/3.png");
buttons += emoticonBbutton(":31:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/2.png");
buttons += emoticonButton(":32:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/22-Copy-Copy.png");
buttons += emoticonButton(":33:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/15.png");
buttons += emoticonButton(":34:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/14.png");
buttons += emoticonButton(":35:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/13.png");
buttons += emoticonButton(":36:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/12.png");
buttons += emoticonButton(":37:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/11.png");
buttons += emoticonButton(":38:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/dbb584dc.jpg");
buttons += emoticonButton(":39:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/girl.png");
buttons += emoticonButton("40:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/what.png");
buttons += emoticonButton(":41:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/water.png");
buttons += emoticonButton(":42:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/wa.png");
buttons += emoticonButton(":43:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/uh.png");
buttons += emoticonButton(":44:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/this.png");
buttons += emoticonButton(":45:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/tata.png");
buttons += emoticonButton(":46:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/sweat.png");
buttons += emoticonButton(":47:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/star.png");
buttons += emoticonButton(":48:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/speechless-1.png");
buttons += emoticonButton(":49:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/snap.png");
buttons += emoticonButton(":50:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/smile-1.png");
buttons += emoticonButton(":51:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/shock.png");
buttons += emoticonButton(":52:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/shit.png");
buttons += emoticonButton(":53:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/pff.png");
buttons += emoticonButton(":54:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/sad-1.png");
buttons += emoticonButton(":55:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/paw.png");
buttons += emoticonButton(":oi:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/oi.png");
buttons += emoticonButton(":ohno:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/ohno.png");
buttons += emoticonButton(":noway:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/noway.png");
buttons += emoticonButton(":mad:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/mad.png");
buttons += emoticonButton(":love:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/love.png");
buttons += emoticonButton(":lol-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/lol-1.png");
buttons += emoticonButton(":lalala:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/lalala.png");
buttons += emoticonButton(":inlove:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/inlove.png");
buttons += emoticonButton(":hungry:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hungry.png");
buttons += emoticonButton(":hot:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/hot.png");
buttons += emoticonButton(":untitledpicture:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/Untitledpicture.png");
buttons += emoticonButton(":untitledpicture2:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/Untitledpicture2.png");
buttons += emoticonButton(":IDK:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/IDK.png");
buttons += emoticonButton(":zzz:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/zzz.png");
buttons += emoticonButton(":wrong:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/wrong.png");
buttons += emoticonButton(":write:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/write.png");
buttons += emoticonButton(":why:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/why.png");
buttons += emoticonButton(":number004:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/004.gif");
buttons += emoticonButton(":number133:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/133.gif");
buttons += emoticonButton(":number086:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/086.gif");
buttons += emoticonButton(":number131:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/131.gif");
buttons += emoticonButton(":number053:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/053.gif");
buttons += emoticonButton(":angry-2:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/angry-2.png");
buttons += emoticonButton(":love-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/love-1.png");
buttons += emoticonButton(":happy:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/happy.png");
buttons += emoticonButton(":happy-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/happy1.png");
buttons += emoticonButton(":singing:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/singing.png");
buttons += emoticonButton(":beadyeyed:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/beadyeyed.png");
buttons += emoticonButton(":laughing-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/laughing1.png");
buttons += emoticonButton(":cry-1-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/cry-1-1.png");
buttons += emoticonButton(":emoticon058:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/058.gif");
buttons += emoticonButton(":emoticon135:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/135.gif");
buttons += emoticonButton(":emoticon023:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/023.gif");
buttons += emoticonButton(":emoticon025:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/025.gif");
buttons += emoticonButton(":emoticon026:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/026.gif");
buttons += emoticonButton(":emoticon033:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/033.gif");
buttons += emoticonButton(":emoticon128:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/128.gif");
buttons += emoticonButton(":emoticon021:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/021.gif");
buttons += emoticonButton(":emoticon034-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/034-1.gif");
buttons += emoticonButton(":emoticon035:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/035.gif");
buttons += emoticonButton(":emoticon036:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/036.gif");
buttons += emoticonButton(":emoticon037:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/037.gif");
buttons += emoticonButton(":emoticon041:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/041.gif");
buttons += emoticonButton(":emoticon043:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/043.gif");
buttons += emoticonButton(":emoticon046:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/046.gif");
buttons += emoticonButton(":emoticon053-1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/053-1.gif");
buttons += emoticonButton(":emoticon054:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/054.gif");
buttons += emoticonButton(":emoticon055:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/055.gif");
buttons += emoticonButton(":emoticon056:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/056.gif");
buttons += emoticonButton(":emoticon057:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/057.gif");
buttons += emoticonButton(":emoticon061:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/061.gif");
buttons += emoticonButton(":emoticon064:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/064.gif");
buttons += emoticonButton(":emoticon071:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/071.gif");
buttons += emoticonButton(":emoticon072:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/072.gif");
buttons += emoticonButton(":emoticon074:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/074.gif");
buttons += emoticonButton(":emoticon075:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/075.gif");
buttons += emoticonButton(":emoticon076:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/076.gif");
buttons += emoticonButton(":emoticon085:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/085.gif");
buttons += emoticonButton(":emoticon088:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/088.gif");
buttons += emoticonButton(":emoticon089:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/089.gif");
buttons += emoticonButton(":emoticon091:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/091.gif");
buttons += emoticonButton(":emoticon092:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/092.gif");
buttons += emoticonButton(":emoticon097:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/097.gif");
buttons += emoticonButton(":emoticon099:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/099.gif");
buttons += emoticonButton(":emoticon101:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/101.gif");
buttons += emoticonButton(":emoticon102:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/102.gif");
buttons += emoticonButton(":emoticon108:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/108.gif");
buttons += emoticonButton(":emoticon111:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/111.gif");
buttons += emoticonButton(":emoticon114:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/114.gif");
buttons += emoticonButton(":emoticon115:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/115.gif");
buttons += emoticonButton(":emoticon118:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/118.gif");
buttons += emoticonButton(":emoticon120:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/120.gif");
buttons += emoticonButton(":emoticon1:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon1.png");
buttons += emoticonButton(":emoticon16:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon16.png");
buttons += emoticonButton(":emoticon18:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon18.png");
buttons += emoticonButton(":emoticon20:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon20.png");
buttons += emoticonButton(":emoticon24:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon24.png");
buttons += emoticonButton(":emoticon25:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon25.png");
buttons += emoticonButton(":emoticon26:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon26.png");
buttons += emoticonButton(":emoticon27:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon27.png");
buttons += emoticonButton(":emoticon28:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon28.png");
buttons += emoticonButton(":emoticon29:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon29.png");
buttons += emoticonButton(":emoticon32:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon32.png");
buttons += emoticonButton(":emoticon004-1:","http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/004-1.gif");
buttons += emoticonButton(":emoticon2:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon2.png");
buttons += emoticonButton(":emoticon4:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon4.png");
buttons += emoticonButton(":emoticon6:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon6.png");
buttons += emoticonButton(":emoticon8:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon8.png");
buttons += emoticonButton(":emoticon9:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon9.png");
buttons += emoticonButton(":emoticon10:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon10.png");
buttons += emoticonButton(":emoticon12:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon12.png");
buttons += emoticonButton(":emoticon13:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon13.png");
buttons += emoticonButton(":emoticon14:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon14.png");
buttons += emoticonButton(":emoticon15:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon15.png");
buttons += emoticonButton(":emoticon17:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon17.png");
buttons += emoticonButton(":emoticon19:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon19.png");
buttons += emoticonButton(":emoticon21:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon21.png");
buttons += emoticonButton(":emoticon22:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon22.png");
buttons += emoticonButton(":emoticon23:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon23.png");
buttons += emoticonButton(":emoticon30:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon30.png");
buttons += emoticonButton(":emoticon33:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon33.png");
buttons += emoticonButton(":emoticon34:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon34.png");
buttons += emoticonButton(":emoticon35:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon35.png");
buttons += emoticonButton(":emoticon36:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon36.png");
buttons += emoticonButton(":emoticon37:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon37.png");
buttons += emoticonButton(":emoticon38:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon38.png");
buttons += emoticonButton(":emoticon39:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon39.png");
buttons += emoticonButton(":emoticon41:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon41.png");
buttons += emoticonButton(":emoticon018:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/018.gif");
buttons += emoticonButton(":emoticon122:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/122.gif");
buttons += emoticonButton(":emoticon134:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/134.gif");
buttons += emoticonButton(":emoticon42:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon42.png");
buttons += emoticonButton(":emoticon5:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/emoticon5.png");
buttons += emoticonButton(":6ea2a854:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/6ea2a854.png");
buttons += emoticonButton(":3f98bd83:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/3f98bd83.png";)
buttons += emoticonButton(":20f5d818:", "http://i710.photobucket.com/albums/ww105/susann_starrysky/Emoticons/20f5d818.png");

	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);