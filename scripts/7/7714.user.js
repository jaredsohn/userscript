// ==UserScript==

// @name          Digg Comment Enhancer

// @namespace     http://james.co.nr

// @description   Test Digg comment enhancer

// @include       http://digg.com/*

// @include       http://www.digg.com/*

// @exclude       http://www.digg.com/search*

// @exclude       http://digg.com/search*

// @exclude       http://digg.com/submit

// @exclude       http://www.digg.com/submit

// @exclude       http://www.digg.com/register

// @exclude       http://digg.com/register



// ==/UserScript==

//By James Thewlis

//www.james.co.nr





//Generates duggmirror and google cache links

var duggmirror = location.href.replace(/^http\:\/\/(www\.)?digg.com/,'http://duggmirror.com');

var titlexpath  = "//div[@class='news-body']/h3/a[@href]";

var xpathresult = document.evaluate ( titlexpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

var storyurl = xpathresult.snapshotItem ( 0 );

var googlecache = "http://www.google.com/search?q=cache:" + storyurl;



//Checks for the comment form

var commentForm = document.getElementById('c-rply-form0');

if (commentForm) {

    var newElement = document.createElement('form');

	

//Change this to add your own stuff

    newElement.innerHTML = '<h2>Comment Enhancer</h2>' +

    '<select id="mySelect" size="15">' +

    '<optgroup label="Cliches">' +

    	'<Option>In Soviet Russia...' +

    	'<Option>Pics or it didn\'t happen' +

    	'<Option>WTF?' +

    	'<Option>But... Will it blend?' +

    	'<Option>Will YOU blend?' +

    	'<Option>Pwned' +

    	'<Option value="\n /sarcasm">/sarcasm' +

    	'<Option>!!!!!!11!1!one!!eleventy!!!!!' +

    	'<Option>I for one welcome our __ overlords' +

    	'<Option value="I\'m in ur __ __ing ur __">I\'m in ur...' +

    	'<Option>Made with Adobe&reg; Photoshop&reg; Software' +

    	'<Option value="\n \n' + ' &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9616;&#9612;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9616;&#9612;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9608;&#9608;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9618;&#9618;&#9608;&#9608;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9608;&#9608;&#9618;&#9618;&#9618;&#9608;&#9608;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9618;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n &#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;&#9617;\n">Moonite ASCII art' +

        '<Option>l337' +

        '<Option>09 F9 11 02 9D 74 E3 5B D8 41 56 C5 63 56 88 C0' +

        '<Option value=" 1)Collect underpants \n 2)?????? \n 3)Profit!!!">1)Collect Underpants 2)??????? 3)Profit!!' +

        '<Option>Digg me down!' +

        '<Option>There aren\'t any girls on teh internets' +

        '<Option>The internet is a series of tubes' +

        '<Option>My tubes are clogged!' +

        '<Option>Ninjas &gt; Pirates' +

        '<Option>Pirates &gt; Ninjas' +

        '<Option>Google it, noob' +

		'<Option>I\'d hit it' +

    '</optgroup>' +

	 '<optgroup label="Links">' +

    	'<Option value="' + duggmirror + '">Duggmirror' +

    	'<Option value="' + googlecache + '">Google Cache' +

    	'<Option value="http://www.goatse.cz">Goatse' +

    '</optgroup>' +

    '<optgroup label="Images">' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/orly.jpg">O RLY?' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/kittenkill.jpg">Every time you masturbate, God kills a kitten' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/ceilingcat.jpg">Ceiling Cat' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/pancakebunny.jpg">Pancake Bunny' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/eatedcookie.jpg">I made you a cookie but I eated it' +

    	'<Option value="http://personales.ya.com/casitasoler/james/diggimages/limecat.jpg">Limecat' +

    '</optgroup>' +

    '<optgroup label="Consoles/Gaming">' +

    	'<Option>The PS3 sux!!' +

    	'<Option>The Wii is for losers!' +

    	'<Option>The 360 sux!!' +

    	'<Option>The PS3 rulz!!' +

    	'<Option>The Wii rulz!!' +

    	'<Option>360 FTW!!' +

        '<Option>Wii60 FTW!!' +

		'<Option>The PS3 makes a good doorstopper' +

		'<Option>The 360 gets so hot I can fry my eggs on it' +

		'<Option>Would you like to touch my Wii?' +

    	'<Option>Gameplay &gt; Graphics' +

    	'<Option>NES FTW!!' +

		'<Option>SNES FTW!!' +

      '<Option value="There are plenty of games for linux...er...Tux Racer, Tux Paint...">Linux Games' +

      '<Option>Who needs consoles when you\'ve got emulators?' +

    '</optgroup>' +

    '<optgroup label="Remarks on story">' +

    	'<Option>Buried!' +

    	'<Option>DUPE!!' +

    	'<Option>Fake!' +

    	'<Option>Marked as lame' +

    	'<Option>Reported as inaccurate' +

    	'<Option>SPAM!!' +

    	'<Option>Dugg' +

    '</optgroup>' +

    '<optgroup label="Insults">' +

    	'<Option>Idiot' +

    	'<Option>Nincompoop' +

    	'<Option>Loser' +

    	'<Option>Gimboid' +

    	'<Option>Smeghead' +

    	'<Option>Die in a fire, spammer' +

    	'<Option>Yo momma\'s so fat...' +

    '</optgroup>' +

    '<optgroup label="Operating Systems\/Computers">' +

    	'<Option>Windoze sucks!' +

    	'<Option>But does it run linux?' +

    	'<Option>Ubuntu rules!' +

    	'<Option>Ubuntu is for n00bs!' +

		'<Option>Gentoo rules!' +

		'<Option>I installed Gentoo in under 5 days!' +

		'<Option>But there are no games for linux' +

		'<Option>Ever heard of WINE??' +

    	'<Option>MacOS FTW!' +

    	'<Option>It\'s not Linux, it\'s GNU/Linux' +

    	'<Option>BSD FTW!' +

    	'<Option>Solaris rulz!' +

        '<Option>MS DOS pwns u!!' +

        '<Option>Commodor 64 FTW!!' +

        '<Option>BSD is dying' +

        '<Option>Mac &gt; Windows' +

	    '<Option>Imagine a beowulf cluster of those' +

    '</optgroup>' +

    '<optgroup label="I love...">' +

    	'<Option value="I love Kevin Rose!">Kevin Rose' +

    	'<Option value="I love Alex Albrecht!">Alex Albrecht' +

    	'<Option value="I love Steve Jobs!">Steve Jobs' +

    	'<Option value="I love Linus Torvalds!">Linus Torvalds' +

    	'<Option value="I love Bill Gates!">Bill Gates' +

    	'<Option value="I love Stephen Colbert!">Stephen Colbert' +

    '<optgroup label="Companies">' +

    	'<Option>Micro$oft sux!' +

    	'<Option>Sony sucks' +

    	'<Option>Nintendo rules!' +

    	'<Option>The RIAA sucks!' +

    	'<Option>The MPAA sucks!' +

    	'<Option>FUCK the RIAA!' +

    	

    '</optgroup>' +

    '<optgroup label="Quotes">' +

    	'<Option value="I\'m going to become rich and famous after I invent a device that allows you to stab people in the face over the internet">device to stab people in the face' +

    	'<Option>I put on my robe and wizard hat' +

		'<Option>What is the average airspeed velocity of an unladen swallow?' +

    '</select>';

	

	//inserts newElement after comment form

    commentForm.parentNode.insertBefore(newElement, commentForm.nextSibling);

    var myComment = document.getElementById('c-rply-body0');

    var mySelect = document.getElementById('mySelect');

	

	//detects selct box change

    mySelect.addEventListener('change', function(event) { 

	 myComment.value += mySelect.value + ' ';

	 mySelect.selectedIndex=-1;

	 

	 }, true);

}

//You can comment out everything from here if you want to remove images



//Find the links

var allLinks = document.evaluate(

    "//a[@class='user']",

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);



//Checks if they are images/videos and replaces them

for (var i = 0; i < allLinks.snapshotLength; i++) {

    var myLink = allLinks.snapshotItem(i);

	 var myImageString=myLink.toString();

	 if (detectImage(myImageString)==true){

	 myLink.innerHTML = '<img src="' + myImageString + '"' + ' alt="' + myImageString + '"' + '" style="border:solid 2px #000; max-width:100%;" title="Comment Enhancer Image"/>';

	 }

	 else if(/http:\/\/(www\.)?youtube.com\/watch\?v=/i.test(myImageString)) {

	   var videocode = myImageString.split("v=")[1];

	   var video = document.createElement("object");

	   video.setAttribute("width", "420");

	   video.setAttribute("height", "350");

	   video.innerHTML = '<param name="movie" value="http://www.youtube.com/v/' + videocode + '"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/' + videocode + '" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed>';

	   myLink.parentNode.replaceChild(video, myLink);

	 }

	 	

    }



//My improvised and probably not very good image detection

//now it's better :)

function detectImage(str){

  var regex = /\.(jpe?g|png|gif|bmp)$/i;

  if(regex.test(str)) return true;

}