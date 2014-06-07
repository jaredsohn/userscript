// ==UserScript== 
// @name        The likes of Brother Cream Cat / 尖東忌廉哥　讚！
// @namespace   http://www.siusoon.com 
// @description The likes of Brother Cream Cat explores the network as a co-joined experience of humans and nonhumans through the figure of a popular Facebook cat "Brother Cream" (a cat that lives in a 24-hour convenience store with the shop owner in Tsim Sha Tsui, Hong Kong). 
// @author      Winnie Soon & Helen Pritchard / Contact:soon@siusoon.com
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @resource	customCSS	http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @icon        http://www.siusoon.com/home/me/creamcat/creamcat_icon.png
// @include 	*.facebook.com/*
// @version     1.0
// ==/UserScript== 
/*
//////////////////////////////////////////////Log///////////////////////////////////
// Tested version:
- Mac OS X 10.5.8, with Firefox v.16.0.2 and Greasemonkey v.1.10; facebook version as of 19 Aug, 2013
- Mac OS X 10.8.4, with Firefox v.23.0.1; facebook version as of 29 Aug, 2013

// log:
31 Aug 2013: ver 1.0 official released

// Acknowledgement:
1/ API jquery: http://api.query.com
2/ Background pattern: http://www.patternify.com/
3/ ASCII text: http://patorjk.com/software/taag/#p=display&v=0&f=Big%20Money-ne&t=%3F%0A & http://www.network-science.de/ascii/
4/ bg stretch: http://css-tricks.com/perfect-full-page-background-image/
5/ Bolei and Bowtie in providing the audio

//Basic logic:
- Check URL function to divert to creamcat fb and non-creamcat fb pages with different functions
- In creamcat fb: Implement all the images with different overlay texts + mouseover effect (consistent text)
- In creamcat fb: Click 'like' or 'dislike' to play an audio, fade out the like/dislike button and add text/ASCII next to the button
- In non-creamcat, the images will be replaced by cream cat latest image stream 
- In non-creamcat, the background image will be replaced by cream cat latest image stream
# external storage: 1/ script icon 2/12x audio files

//adjustable items: 
- overlay messages, variable: (myArray)
- when click on like messages, variable: (likeMessage) / (unlikeMessage)

// some notes
  div id  --> #xxx ; div class --> .xxx
  
//////////////////////////////////////////////End of Log///////////////////////////////////
*/

// check URL 

var url = window.location.href;
var check = "117969648299869";  //Brother Cream fans page's id
CheckUrl(url);

// customize and add new CSS on the overlay text

var imglink;  //creamcat post image
	// customize the overlay css
	GM_addStyle('.image { position: relative; width:100%;}');
	GM_addStyle('.tricks { position: absolute; top: 200px; left:0; width: 100%; color: #FFFF00; font: normal 18px/25px monospace; letter-spacing: 2px; background: rgb(0,0,0); background: rgba(100,100,100,0.6); background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAANklEQVQIW2NkwAT/gUKM6MLoAjBFGIqRFaJLovBhCrFaB7QeLg5SiEsRzJlgeQxHY/EcSOg/AMNqCgYYNYhKAAAAAElFTkSuQmCC) repeat; padding:10px; }');
	GM_addStyle('pre { font: bold 14px/11px monospace; clear: left; }');
		
	var newCSS = GM_getResourceText ("customCSS");
	GM_addStyle (newCSS);

// Overlay Message list
	var myArray = [];
	myArray[0] = 'Why not LIKE me?!';
	myArray[1] = '平淡中輕撫你面　仍覺最好不過';
	myArray[2] = '人生色彩無比精采　全賴當天你飄來';
	myArray[3] = '喜歡妳是你疼你最多';
	myArray[4] = 'The likes make me alive!';
	myArray[5] = 'LIKE me before you sleep';
	myArray[6] = 'To give is to LIKE';
	myArray[7] = 'May you like me?';
	myArray[8] = "Don't think, just LIKE!";
	myArray[9] = '喜歡你是你永不會找到多一個';
	
// define like message

   var unlikeMessage = 
   ["<pre>", 
   "  (✖╭╮✖)     (✖╭╮✖)     (✖╭╮✖)",
   "$P\"\"\"\"\"\"\`$$ $$P\"\"\"\"\"Y$$ $P\"\"\"\"\"\"\`$$ ",
   "$  $$$$$..$ $\' .$$$. \`$ $  $$$$$..$ ",
   "$.      \`Y$ $  $$$$$  $ $.      \`Y$ ",
   "$$$$$$$.  $ $  $$$$$  $ $$$$$$$.  $ ",
   "$. .$$$\'  $ $. \`$$$\' .$ $. .$$$\'  $ ",
   "$b.     .d$ $$b     d$$ $b.     .d$ ",
   "$$$$$$$$$$$ $$$$$$$$$$$ $$$$$$$$$$$ ",
   "</pre>"
   ].join('\n');
   var likeMessage = "<b>~(=^‥^)ノ 多謝 謝謝 Manythx Merci ありがとう Mange tak</b>";
 
// define the stretch image 
var htmlimg = "https://www.facebook.com/pages/%E5%B0%96%E6%9D%B1%E5%BF%8C%E5%BB%89%E5%93%A5/117969648299869?sk=photos_stream";
var bgimglink = "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-frc3/p206x206/1238040_500486740048156_1409627677_n.jpg";
var creamcat = "";   //is on creamcam fb page?
ggetDoc(); //get the cream cat photo stream image

// define audio part
var low = 1;
var high = 6;
var audiopath= "http://siusoon.com/home/me/creamcat/";

// check URL with the right page

function CheckUrl(url) {
  if ( url.indexOf(check) > -1 ) {
	//run program
	creamcat = "true";
	clearInterval(no);
	var yes = setInterval(running,1000);
	
	
  } else { //other facebook page  (only run if max with 2 /, not more than that)
    creamcat = "false";
    clearInterval(yes);
    ggetDoc();
    var no = setInterval(running_others,1000);   
    
  }
}

// non-creamcat fb pages 
function running_others() {	
  if (window.location.href!= url) {
  location.reload();
  } // end of check url location
   if(creamcat = 'false') {
    //replace all images with creamcat
		$("img").attr("src", function() {
  		 return bgimglink;
    	});
    	//add bg creamcat image
   		fixedBackground();
    }

}

//creamcat fb pages
function running() {   //the fb page with live feed auto update, therefore the script needs to keep updating all the time
  /* 
	//change the spotlight image to timestamp
	//var title = $("abbr.livetimestamp").attr("title");
	//change timestamp not working
	$('div.uiScaledImageContainer').on('click', function(){  
		var title = $this.find("abbr").attr("title");
		$('<h1>' + title + '</h1>').replaceWith('.spotlight');
   }); //end of like click
  */
  if (window.location.href!= url) {
  location.reload();
  } // end of check url location
  if (creamcat = 'true') {
	$('div.uiScaledImageContainer').each(function() {
  		imglink = $(this).find("img").attr("src");
  		var index = imglink.substr(-7,1); 
  		//check the source last 7th character, and get the index so as to determine which text msgs to show
  		//$(this).html("<div class ='image'><img src='" + imglink + "'><span class ='tricks'>Why not LIKE me?!</span></div>");
 		$(this).html("<div class ='image'><img src='" + imglink + "'><span class ='tricks'>" + myArray[index] + "</span></div>");
	});

	$('div.uiScaledImageContainer').mouseover(function() {
		$(this).find("span").text("cool try");
	});

	$('a.UFILikeLink').on('click', function(){  

   		var content = $(this).attr("title");  //can filter with Unlike or Like 
   		
   		if (content.indexOf("Like") === 0) {
   			   $(this).after(likeMessage).fadeIn(30).fadeOut(1500);
   		} else {
   			   $(this).after(unlikeMessage).fadeIn(30).fadeOut(1500);
   		}
   		playsound();
   		event.stopPropagation()  //such that it happen once

	}); //end of like click
  } //end of check creamcat page status
  
} //end of running function	
	
// play wave sound automatically once!
function playsound() {
     
    if (window.HTMLAudioElement) {
      var snd = new Audio('');
      var audioplay = Math.floor(low + (Math.random() * (high - low + 1))); //get the file from a random number      
      /*
      if(snd.canPlayType('audio/mpeg')) {
         snd.src = audiopath + audioplay + ".mp3";
      } else if (snd.canPlayType('audio/wav')) {
      	snd.src = audiopath + audioplay + ".wav";
      } 
      */
      if (snd.canPlayType('audio/wav')) {
      	snd.src = audiopath + audioplay + ".wav";
      } 
      snd.play();
    }
    else {
      alert('HTML5 Audio is not supported by your browser!');
    }
}


function fixedBackground()  {
 $('body').css({

 "background": "url(" + bgimglink + ") no-repeat center center fixed",
 '-webkit-background-size': 'cover',
 '-moz-background-size': 'cover',
 '-o-background-size': 'cover',
 'background-size': 'cover'

  });
}

// Get latest fb cream cat image
function ggetDoc() {

  getDOC(htmlimg, function(doc) {
// this works!
 /*  
 //bigger image
 path = doc.evaluate("//div[contains(@class, 'fbPhotoCurationControlWrapper')]/@data-starred-src", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
  var pathx = path.iterateNext();
  bgimglink = pathx.textContent;
  //alert(pathx.textContent);   
 */
 //smaller image
  path = doc.evaluate("//div[@class='tagWrapper']/i/@style", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
  var pathx = path.iterateNext();
  var pathxx = pathx.textContent;
  pathxx = pathxx.slice(pathxx.indexOf('(')+1, pathxx.indexOf(')'));
  bgimglink = pathxx;  
   
 });
}

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
             doc = document.implementation.createDocument('', '', dt),
             html = doc.createElement('html');
		
		  //make fb hidden code visible
		  var T1 = responseDetails.responseText; 
		  T1 = T1.replace(/<!--/g," ");
		  T1 = T1.replace(/-->/g," ");
          html.innerHTML = T1;
          doc.appendChild(html);
          callback(doc);
        }
    });
}
