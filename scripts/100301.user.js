// ==UserScript==
// @name           Shack-chan2
// @namespace      http://troz.shackspace.com
// @version	2.63
// @description    Script to embed images in Shacknews Comments pages
// @include        http://*.shacknews.com/chatty*
// @include        http://shacknews.com/chatty*
// @include        http://*.shacknews.com/frame_laryn.x?*
// @include        http://shacknews.com/frame_laryn.x?*
// @include        http://shacknews.com/settings
// @include        http://*.shacknews.com/settings
// @match        http://*.shacknews.com/chatty*
// @match        http://shacknews.com/chatty*
// @match        http://*.shacknews.com/frame_laryn.x?*
// @match        http://shacknews.com/frame_laryn.x?*
// @match        http://shacknews.com/settings
// @match        http://*.shacknews.com/settings
// ==/UserScript==
/*
============
Author: TroZ
============

Thanks to Thomw for borrowed code and ideas.

Version 2 is completely re-written and now only uses one XPath request.
It has a settings window that is shown on the user's settings page.
Adding a new embed type should be relativle easy. Just write a method to embed the player, and then add a line to the below array to tell the type, it's default settings, how to recognize it and a function pointer to the embed method.

11/25/08  - Updated to support youtube widescrean and high quality videos
11/30/08 - Added 'Use Play Button for NWS' Option,. Added support for converting lines when using A / Z navigation buttons.  Added Apina.biz (jpg only) images and Wimp.com videos
12/13/08 - Fixed issue with settings of certain categories not being saved/loaded correctly
2/2/2010 - updated script to handle changes in sites (especially for problem causing Wimp.com videos linked to wipe out the comments page) - added TwitPic and Imgur
2/8/2010 - FunnyOrDie fix for videos grabbing the title after the ID as part of the ID
4/11/2010 - minor fixes
4/16/2010 - Chrome Support for real
4/30/2010 - fix for replies not getting converted in chrome, minor youtube fix
5/14/2010 - Fix for TwitPic change
2-23-2011 - new shack adjustments, Picars
3-3-2011 - proper limiting to shacknews.com
3-24-2011 - Steam Screenshot library support
4-4-2011 - ChattyPics support, and autoconverts Shackpics to Chattypics
*/


//chrome support
// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
		
	}
	GM_log = function(message) {
		console.log(message);
	}
	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}



//CONFIGURATION
//name, enabled, usebutton, contains, endswith, function, type
var embed = [
['Images (.jpg, .gif, .png)', true, false, null, ['.jpg','.JPG','.jpeg','.JPEG','.gif','.GIF','.png','.PNG'], embedImages, 'image'],
['Flickr', true, false, [false,'flickr.com/photos/','flickr.com/groups/'],null, embedFlickr, 'image'],
['ImageShack',true,false,'imageshack.us/my.php?image=',null,embedImageshack,'image'],
['PhotoBin/EasyScreens', true, false, [false,'easyscreens.info/?v=','easyscreens.info/index.php?v='],null, embedPhotobin, 'image'],
//['crap.fi:81 (images)', true, false, 'crap.fi:81/?i=',null, embedCrap, 'image'], - seems to be gone
['Pixdaus', true, false, 'pixdaus.com/single.php?id=',null, embedPixdaus, 'image'],
['Picasaweb.google.com', true, false, 'picasaweb.google.com',null, embedPicasa, 'image'],
['Apina.biz', true, false, 'apina.biz/',null, embedApina, 'image'],
['TwitPic', true, false, 'twitpic.com/',null, embedTwitpic, 'image'],
['Imgur', true, false, 'imgur.com/',null, embedImgur, 'image'],
['Pichars', true, false, 'pichars.org/',null, embedPichars, 'image'],
['Steam Screenshot',true,false,'cloud.steampowered.com/ugc/',null,embedImages,'image'],
//['ChattyPics',true,false,'chattypics.com/viewer.php?file=',null,embedChatty,'image'],  //handled by embedImages
//['ShackPics to Chatty',true,false,'shackpics.com/viewer.php?file=',null,embedChatty,'image'],		//handled by embedImages

['MP3', true, true, null, ['.mp3', '.MP3'], embedMp3, 'audio'],
['Wav', true, true, null, ['.wav', '.WAV'], embedWav, 'audio'],
['Wma', true, true, null, ['.wma', '.WMA'], embedWma, 'audio'],
['Ogg', true, true, null, ['.ogg', '.OGG'], embedOgg, 'audio'],
['Midi', true, true, null, ['.mid', '.MID', '.midi', '.MIDI'], embedMid, 'audio'],

['Flash (.swf files)', true, true, null, ['.swf', '.SWF'], embedFlash, 'animation'],
['Ytmnd.com', true, true, '.ytmnd.com', null, embedYtmnd, 'what?'],

['Quicktime', true, true, null, ['.mov', '.MOV'], embedQuicktime, 'video'],
['Avi', true, true, null, ['.avi', '.AVI'], embedAvi, 'video'],
['Wmv', true, true, null, ['.avi', '.AVI'], embedWmv, 'video'],
['Mpeg', true, true, null, ['.mpg', '.MPG', '.mpeg', '.MPEG'], embedMpeg, 'video'],
['Divx', true, false, null, ['.divx', '.DIVX'], embedDivx, 'video'],
['Mp4', true, true, null, ['.mp4','.MP4'], embedMp4, 'video'],
['Youtube', true, false, [false,'youtube.com/watch?','youtube.com/v/'], null, embedYoutube, 'video'],
//['Stage6', true, false, [true,'stage6.com/','/video/'], null, embedStagesix, 'video'],
['LiveLeak', true, false, 'liveleak.com/view?i=', null, embedLiveleak, 'video'],
['Video.Google.com', true, false, 'video.google.com/videoplay?docid=', null, embedVideoGoogle, 'video'],
['College Humor', true, false, 'collegehumor.com/video:', null, embedCollegehumor, 'video'],
['iFilm', true, false, 'ifilm.com/video/', null, embedIfilm, 'video'],
['MetaCafe', true, false, 'metacafe.com/watch/', null, embedMetacafe, 'video'],
['Revver.Com', true, false, [false,'revver.com/watch/','revver.com/video/'], null, embedOneRevver, 'video'],
['Clipstr', true, false, 'clipstr.com/videos/', null, embedClipstr, 'video'],
['Myspace Vids', true, false, [false,'vids.myspace.com/index.cfm?fuseaction=vids.individual&videoid=','vids.myspace.com/index.cfm?fuseaction=vids.individual&VideoID=','myspacetv.com'], null, embedMyspace, 'video'],
//['SuperDeluxe', true, false, 'superdeluxe.com/sd/contentDetail.do?id=', null, embedSuperdeluxe, 'video'], //now part of adult swim
['GameTrailers', true, false, 'gametrailers.com/player/', null, embedGametrailers, 'video'],
['GameSpot', true, false, 'gamespot.com/video/0/', null, embedGamespot, 'video'],
['GameVideos', true, false, 'gamevideos.com/video/id/', null, embedGamevideos, 'video'],
['AdultSwim', true, false, 'adultswim.com/video/?episodeID=', null, embedAdultswim, 'video'],
//['Video.MSN.com', true, false, 'video.msn.com/video.aspx?', null, embedVideoMsn, 'video'], // is now bing
['5min.com', true, false, [false,'5min.com/video/','5min.com/Video/'], null, embedFivemin, 'video'],
['Veoh.com', true, false, 'veoh.com/videos/', null, embedVeoh, 'video'],
['Vimeo.com', true, false, 'vimeo.com/', null, embedVimeo, 'video'],
['FunnyOrDie.com', true, false, 'funnyordie.com/videos/', null, embedFunnyordie, 'video'],
['WeGame.com', true, false, 'wegame.com/watch/' , null, embedWegame, 'video'],
['Break.com', true, false, [false,'break.com/index/','view.break.com/'] , null, embedBreak, 'video'],
['MegaVideo.com', true, false, 'megavideo.com/?v=' , null, embedMegavideo, 'video'], //completely change their site, code doesn't currently work, and isn't easy to fix.
['Wimp.com', true, false, 'wimp.com/' , null, embedWimp, 'video'],
['5 Second Films', true, false, '5secondfilms.com/' , null, embed5sf, 'video']
];
//explaination:
//name is the media type name, used for creating the config dialog and for the getValue name
//enabled is the default enabled setting, gets overwritten with value from GM_getValue
//useButton is the default useButton setting (user has to click a 'Play' button before the player is embedded in page), gets overwritten with value from GM_getValue
//contains is the text to look for in the href to see if the link is to this media type NOTE: if this is an array, if the first item is true, then all of the remaining items must be in the href, if false, then only one of the following must be in the href
//endswith is the 'or' array of texts the href should end with if the link is to this media type.  NOTE: currently only one of contains or endswith is used, contians is used if both are specified
//function is the name of the function that handles adding the player for embedding the media.  the function takes 3 parameters: the URL, the A element, and the useButton boolean value for that media
//type is the type, used for coloring on the config dialog


var  is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var useXPath = true; // !is_chrome;

var eventObj = null;

function isArray(testObject) {   
	//return testObject && !(testObject.propertyIsEnumerable('length')) && typeof testObject === 'object' && typeof testObject.length === 'number';
	return !!testObject && testObject.constructor == Array;
}
function escapeRegexp(s) {
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}
function escapeHtml(s){
	return s.split("&").join("&amp;").split("\"").join("&quot;").split("\'").join("&apos;").split("<").join("&lt;").split(">").join("&gt;")
}	

var useButtonNWS = true;


converthtmllinkstoimages = function() { 

GM_log('converthtmllinkstoimages '+document.location.href);


	var benchmarkTimer = null;
	var scriptStartTime = getTime();

	/* UTILITY FUNCTIONS
	*/
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	
	
	//if running in the hidden frame (first replay click, or refresh button), retarget to the main frame.
	//alert(" window ="+ window+"\n  top="+window.top+"\n   !="+(window != window.top)+"\n  td="+window.top.document);
	if (window != window.top && window.top != null && window.top != 'undefined' && window.top.document!= 'undefined'){
		document = window.top.document;
	}else{
		//alert('here');
	}
	
	if (GM_log)	{
		GM_log('ShackChan2 - Starting processing...');//  '+eventObj);
	}
	
	//GM_log("starting "+(window != window.top)+" - "+eventObj);
	
	//load settings
	for(i=0;i<embed.length;i++){
		//GM_log(toid(embed[i][0])+" was "+embed[i][1]);
		embed[i][1]=GM_getValue("shackchan_enable_"+toid(embed[i][0]),embed[i][1]);
		embed[i][2]=GM_getValue("shackchan_usebutton_"+toid(embed[i][0]),embed[i][2]);
		//GM_log(toid(embed[i][0])+" is "+embed[i][1]);
	}
	useButtonNWS = GM_getValue("shackchan_usebuttonNWS",useButtonNWS);

	//GM_log('ShackChan2 - Settings loaded...  '+useXPath);
	
	var elms = null;

	if(useXPath == true){
		// using 'contains' in XPath request because 'ends-with' is apparently XPath2 which firefox 2 doesn't support
		//write a big xpath of all enabled items
		var xpath = '//a[not(@convert) and (';
		if(eventObj==null){
			eventObj = document;
		
			var first = true;
			for(i=0;i<embed.length;i++){
				if(embed[i][1]==true){//if type is enabled
					if(first==true){
						first = false;
					}else{
						xpath += ' or '
					}
					//include xpath check
					if(embed[i][3]!=null){
						//ok, this is a contains xpath. 
						if(isArray(embed[i][3]) == true){
//GM_log(embed[i][0]+"=Array");
							//ok this check is a coumpound check, this means that it is either alternates (OR) or a combination of several checks (AND). The inital parameter determines if this is an AND (true) or a (OR) false
							var connect;
							if(embed[i][3][0]==true){
								//AND
								connect = ' and ';
							}else{
								//OR
								connect = ' or ';
							}
							xpath += '(';
							var j;
							var first2 = true;
							for(j=1;j<embed[i][3].length;j++){
								if(first2==true){
									first2 = false;
								}else{
									xpath += connect;
								}
								xpath += 'contains(@href,"'+embed[i][3][j]+'")';
							}
							xpath += ")";
						}else{//not an array, a single item to check for
//GM_log(embed[i][0]+"=Item");
							xpath += 'contains(@href,"'+embed[i][3]+'")';
						}
					} else if(embed[i][4]!=null){ //ends-with xpath check
						//the version of xpath available in firefox 1.5 doesn't seem to support ends-with.  There is a crazy way to do it using length and substirng, but for now, I'm just going to do contains and let the javascript filter out any bad finds
//GM_log(embed[i][0]+".length="+embed[i][4].length);
						//always an array if not null
						xpath += '(';
						var j;
						var first2 = true;
						for(j=0;j<embed[i][4].length;j++){
							if(first2==true){
								first2 = false;
							}else{
								xpath += ' or ';
							}
							xpath += 'contains(@href,"'+embed[i][4][j]+'")';
						}
						xpath += ")";
					}
				}
			}
		}else{
			//this is code is run when a reply is clicked the second+ time in the thread. As there will be very few links in the particular div that eventObj points to, it is faster just to get them all and let the javascript reject the bad ones than the do all the xpath filtering.
			xpath += '@href and not(contains(@href,"laryn.x")) and not(contains(@href,"profile.x")) and not(@href="http://www.fileshack.com/") and not(@href="#")';
		}
		xpath += ')]';
		
		//GM_log(xpath);
		//if (GM_log)	{
			//GM_log(" make query "+(getTime() - scriptStartTime) + 'ms  - running on '+eventObj+'  id='+eventObj.id+'  class='+eventObj.class);
		//}
		
		
		//run the query
		elms = document.evaluate(xpath, eventObj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		//if (GM_log)	{
			//GM_log(" query run "+(getTime() - scriptStartTime) + 'ms  - results='+elms.snapshotLength);
		//}
		
	}else{//useXPath is false
	
		if(eventObj==null)
			eventObj = document;
		elms = eventObj.getElementsByTagName('a');
		
		//if (GM_log)	{
		//	GM_log(" elements returned "+(getTime() - scriptStartTime) + 'ms  - results='+elms.length);
		//}
	
	}

	//GM_log("got elms");
	
	//ok, now match the results to the correct handler.
	var count = 0;
	if(useXPath == true){
	
		for(var k=0;k<elms.snapshotLength;k++){
			var elm = elms.snapshotItem(k);
			var url = elm.href;
			
			processLink(url,elm);
			count++;
		}
		
	}else{

		for(var k=0;k<elms.length;k++){
			var elm = elms[k];
			var url = elm.getAttribute('href');
			if((url == null) || (url.length<10) || (elm.getAttribute('convert')=='1') || (url.indexOf('profile.x')>-1) || (url.indexOf('laryn.x')>-1) || (url.indexOf('http://')!=0) ){
				continue;
			}
	
			processLink(url,elm);
			count++;
		}
		
	}
	
	// log execution time
	if (GM_log)	{
		GM_log(" end "+(getTime() - scriptStartTime) + 'ms  '+count+' media items.');//  '+eventObj);
	}
	//alert("done");
	
}

function processLink(url,elm){

//GM_log('ProcessLink("'+url+'" , "'+elm+'");');

	if(elm.getAttribute("convert") != null)
		return; //already processed

	url=url.replace("'","%27");	//most of the embedding code uses parameters surrounded by '', so we need to escape and single quote characters in the url.
		
//GM_log("ShackChan2 processing link: "+elm+"  -  "+url);
	var isnws = false;
	//GM_log("ShackChan2 useButtonNWS="+useButtonNWS);
	//GM_log("ShackChan2 elm="+elm);
	if(useButtonNWS == true){
		var parent = elm.parentNode; //should be postbody - but may not be if the image is inside some other style  (like small, or quote, or collored text)

//alert("parent = " +parent.tagName+" - "+parent.className);		
		while(parent!=null && parent.tagName!="div" && parent.className!="postbody"){
			parent = parent.parentNode;			//handle of parent isn't postbody - find postbody
		}
//alert("parent2 = " +parent.tagName+" - "+parent.className);		
		
		//GM_log("ShackChan2 parent="+parent);
		if(parent!=null){
			parent = parent.parentNode; //should be fullpost
			//GM_log("ShackChan2 parent="+parent);
			if(parent!=null){
			//GM_log("ShackChan2 className="+parent.className);
				var result = parent.className.match(/.*fpmod_nws.*/);
				if(result != null && result.length>0){
					isnws=true;
				}
			}
		}
	}
		
	//check what this matches
	var done = false;
	//GM_log(" d="+done+"  len="+embed.length);
	for(i=0;i<embed.length&&!done;i++){
		//GM_log(i+" - "+embed[i][0]);
		if(embed[i][1]==true){//if type is enabled
			//GM_log(embed[i][0]+' is enabled');
			//include check
			if(embed[i][3]!=null){
				//GM_log(embed[i][0]+' contains check');
				if(isArray(embed[i][3]) == true){
					//checking for multiple items, may be an AND or an OR check, 
					//GM_log(embed[i][0]+' is array');
					var ok = true;
					if(embed[i][3][0]==true){
						//AND check
						for(j=1;j<embed[i][3].length&&ok;j++){
//alert(ok+"  - "+embed[i][3][j]+" - "+url);					
							if(url.indexOf(embed[i][3][j])==-1){
								ok=false;
							}
						}
					}else{
						//OR check
						ok = false;
						for(j=1;j<embed[i][3].length&&!ok;j++){
							if(url.indexOf(embed[i][3][j])>-1){
								ok=true;
							}
						}
					}
					if(ok == true){
						embed[i][5](url,elm,embed[i][2] | isnws);
//alert("1 "+embed[i][0]);
						done=true;
					}						
				}else{//not an array, a single item to check for
					//GM_log(embed[i][0]+' not array');
					if(url.indexOf(embed[i][3])>0){
						embed[i][5](url,elm,embed[i][2] | isnws);
//alert("2 "+embed[i][0]);
						done=true;
					}
				}
			}else if(embed[i][4]!=null){//ends with check
				//GM_log(embed[i][0]+' ends with check');
				for(j=0;j<embed[i][4].length&&!done;j++){
//alert("endswith "+url+" - "+embed[i][4]+" = "+url.substr(url.length-embed[i][4].length));
					if(url.substr(url.length-embed[i][4][j].length)==embed[i][4][j]){//ends with 
						embed[i][5](url,elm,embed[i][2] | isnws);
//alert("3 "+embed[i][0]);
						done=true;
					}
				}
			}
		}	
	}
	elm.setAttribute("convert","1");//mark as processed, so it doesn't get processed again
	
	if(done==false){
		//GM_log("not done!");
	}
}
	

function embedImages(url, elm, useButton){
	//note: this should be the only method that ignores the useButton 
//alert("image");
	//handle various galery sites
	var fukung=false;
	var origurl;
	if(url.indexOf("shackpics.com/viewer.php?file=")>-1 ||
		url.indexOf("shackpics.com/viewer.x?file=")>-1){//shackpics .com
		url="http://chattypics.com/files/"+(url.split("="))[1];
	}else if(url.indexOf("chattypics.com/viewer.php?file=")>-1 ||
		url.indexOf("chattykpics.com/viewer.x?file=")>-1){//chattypics .com
		url="http://chattypics.com/files/"+(url.split("="))[1];
	}else if(url.indexOf("fukung.net/v/")>-1){
		origurl = url;
		url=url.replace("www.fukung.net/v/","media.fukung.net/images/");
		url=url.replace("fukung.net/v/","media.fukung.net/images/");
		fukung=true;
	}else if(embed[2][1] && url.indexOf("imageshack.us/my.php?image=")>-1){
		//GM_log(" image - Imageshack");
		embedImageshack(url, elm, useButton);
		return;
	}//TODO:add more galery type sites
		
	elm = makeImageLink(url,elm,useButton);
	
	if(fukung==true){
		addFukungTags(origurl,elm);
	}
}

function makeImageLink(url,elm,useButton){
	var href = elm.href.replace("'","%27");	
	var str = '<img src="'+url+'" alt="'+href+'" title="'+href+'" style=" max-width:640px;max-height:640px;">';
	if(useButton == true){
		elm = appendAfter(elm, str, useButton);
	}else{
		elm.innerHTML = str;
	}
	return elm;
}


function embedFlickr(url,elm,useButton){
	//GM_log("flicker = "+url);
	
	var origurl = url;
	//ok, process the url a little first, if this is a link to a sized version, remove the size info
	url=url.replace(/\/sizes\/.*/,'/');
	
	var count = 0;
	
	function parseFlickr(response){
		var source = response.responseText;
		//GM_log(response.responseText);
		/* The following seem to take VERY long - long enough to cause the long running script warning to come up
		//convert result text into a dom tree - not sure if this is the best way  -  apparently DOMParser isn't available in GreaseMonkey var parser = new DOMParser(); var dom = parser.parseFromString(theString, "text/xml"); if(dom.documentElement.nodeName != "parsererror") ...
		var doc = document.createElement('div');
		GM_log(source);
		source = source.replace(/\n/mg,'');
		var result = source.match(/.*<body[^>]*>(.*)<\/body>.* /m);//remove space between * and /
		if(result!=null && result.length>=2){
			doc.innerHTML = result[i];
			//find the main image tag
			var imgs = doc.getElementsByTagName("img");
			if(imgs!=null && imgs.length!=null){
				var i;
				for(i=0;i<imgs.length;i++){
					var img = imgs[i];
					if(img.getAttribute("class")=="reflect"){
						embedImages(img.getAttribute("src"),elm,useButton);
						return;
					}
				}
			}
		}else{
			GM_log("result is bad "+result+"  -  "+doc.innerHTML);
		}
		*/
		var result = source.match(/<img.*src="([^"]*)".*class="reflect".*>/);
		if(result != null && result.length>=2){ //single image page
			//GM_log("result0 ="+result[1]);
			makeImageLink(result[1],elm,useButton);
			return;
		}
		result = source.match(/<div id="setThumbs">[\s\S]*<div id="Feeds">/m);//<div id="setThumbs">[\s\S]*(?:(<img[^>]*>)[\s\S]*)*<br/m);
		//GM_log("result1 ="+result);
		if(result != null){ //image set page - show the thumbnails
			var result = result[0].match(/<a[^>]*><img[^>]*><\/a>/g);
			//GM_log("result2 ="+result);
			if(result != null){
				var str='';
				for(i=0;i<result.length;i++){
					str+=result[i];
				}
				str=str.replace(/href="\//g,'href="http://flickr.com/');//make the relative urls absolute
				str=str.replace(/<a /g,'<a convert=1');//so these links don't get converted upon an action in the thread
				appendAfter(elm, str, useButton);
				return;
			}
		}
		result = source.match(/<span class="photo_container pc_m">.*<\/span>/g);
		//GM_log("result3 ="+result);
		if(result != null){ //some other page with a list of images in a table - user's list of pictures page???
			var str='';
			for(i=0;i<result.length;i++){
				str+=result[i];
			}
			str=str.replace(/href="\//g,'href="http://flickr.com/');//make the relative urls absolute
			str=str.replace(/<a /g,'<a convert=1');//so these links don't get converted upon an action in the thread
			appendAfter(elm, str, useButton);
			return;
		}
		result = source.match(/Download the [\s\S]*size<\/a>([\s\S]*)<div class="ThinBucket">/m);//sized single image page
		//GM_log("result4 ="+result);
		if(result != null && result.length>1){ //image set page - show the thumbnails
			var result = result[1].match(/<img src="([^"]*)" \/>/);
			//GM_log("result5 ="+result);
			if(result != null && result.length>1){
				//GM_log("result6 ="+result[1]);
				makeImageLink(result[1],elm,useButton);
				return;
			}
		}
		
		result = source.match(/class="HoldPhotos">([\s\S]*?)<\/div/m);//sized single image page
		//GM_log("result7 ="+result);
		if(result != null && result.length>1){ //image set page - show the thumbnails
			str = result[1];
			str=str.replace(/href="\//g,'href="http://flickr.com/');//make the relative urls absolute
			str=str.replace(/<a /g,'<a convert=1');//so these links don't get converted upon an action in the thread
			str=str.replace(/<p /g,'<p style="float:left; padding: 5px 5px 5px 5px" ');//so these links don't get converted upon an action in the thread
			appendAfter(elm, str+'<br clear="all">', useButton);
			//GM_log("result8 ="+str);
			return;
		}
									
		
		//ok if we are here, we either have some wacko page, or we hit one of those "You must be signed in to see this content." pages.  Sometime requesting a sized version gets around this
		if(count<1){
			count++;
			url=url+"/sizes/s/";
			//GM_log("re-requesting "+url);
			getPageContent(url, parseFlickr);
		}
	}
	
	
	
	getPageContent(url, parseFlickr);
}

function embedPhotobin(url,elm,useButton){
	//GM_log("Photobin/Easyscreens");
	function parsePhotobin(response){
		var source = response.responseText;
		var result = source.match(/"index.php\?a=random".*>.*<img.*src="([^"]*)".*>.*<\/a>/);
		if(result != null && result.length>=2){
			//GM_log("result ="+result[1]);
			makeImageLink('http://www.easyscreens.info/'+result[1],elm,useButton);
		}
	}
	getPageContent(url, parsePhotobin);
}

function embedImageshack(url,elm,useButton){
	//GM_log("Imageshack");
	function parseImageshack(response){
		var source = response.responseText;
		//GM_log(source);
		var result = source.match(/id='thepic'.*src='([^"]*)'.*title='Click to visit ImageShack/);
		if(result != null && result.length>=2){
			//GM_log("result ="+result[1]);
			makeImageLink(result[1],elm,useButton);
		}
	}
	getPageContent(url, parseImageshack);
}

function embedCrap(url,elm,useButton){
	var data = url.split('=');
	if(data.length==2){
		makeImageLink('http://crap.fi:81/archive/'+data[1]+'.jpg',elm,useButton);
	}
}

function embedPixdaus(url,elm,useButton){
//GM_log("embedPixdaus");
	function parsePixdaus(response){
		//GM_log("parsePixdaus");
		var source = response.responseText;
		var regex = new RegExp(url.replace('?','\\?')+'[^<]*<img[^>]*><br>"([^\"]*)"</a>');//look for url, image and comment in embed copy/paste input field
		var result = source.match(regex);
		//GM_log("result ="+result);
		if(result != null && result.length>=2){
			//GM_log("result ="+result[1]);
			var name = result[1];
			regex = new RegExp('<img src="([^"]*)" alt='+escapeRegexp(name));
			result = source.match(regex);
			//GM_log("result ="+result);
			if(result != null && result.length>=2){
				var href = elm.href.replace("'","%27");	
				var str = '<img src="http://pixdaus.com/'+result[1]+'" alt="'+href+'" title="'+href+'" style=" max-width:640px;max-height:640px;"><br>'+name+'<br>';
				//GM_log(str);
				if(useButton == true){
					appendAfter(elm, str, useButton);
				}else{
					elm.innerHTML = str;
				}
			}
		}else{
			//couldn't find embed imput field - probably no comment - older format
			regex = /<img src="([^"]*)" alt="no description" border='0'>/;
			result = source.match(regex);
			//GM_log("result ="+result);
			if(result != null && result.length>=2){
				makeImageLink('http://pixdaus.com/'+result[1],elm,useButton);
			}else{
				//grab picture (thumbnail) from  blog embed code - should be absolute
				regex = /><img src="([^"]*)"><\/a>'/
				result = source.match(regex);
				//GM_log("result ="+result);
				if(result != null && result.length>=2){
					makeImageLink(result[1],elm,useButton);
				}else{
					//longshot -  grab from orig image in page - probably won't have an absolute path :(
					regex = /<img alt="" src="([^"]*)" ?>/;
					result = source.match(regex);
					//GM_log("result ="+result);
					if(result != null && result.length>=2){
						makeImageLink('http://pixdaus.com/'+result[1],elm,useButton);
					}
				}
			}
		
		}
	}
	getPageContent(url, parsePixdaus);
}

function embedPicasa(url,elm,useButton){

	function paresPicasa(response){
		//GM_log("parsePicasa");
		var source = response.responseText;
		//look for album page
		var result = source.match(/<div class="goog-icon-list[^>]*?>(.*?)<div style="clear: both;/);
		//GM_log(" result = "+result);
		if(result!=null && result.length>1){
			var str ='';
			//GM_log(" results = "+result.length);
			appendAfter(elm, str, useButton);
			return;
		}
		//look for single image page
		if(url.indexOf('#')>0){
			//  /photo#5004534119164864898
			var id = url.substr(url.indexOf('#')+1);
			//GM_log(" Picasa photo #"+id);
			var regex = /"content":\[\{"url":"([^"]*)".*?"description":"([^"]*)".*?"title":"([^"]*)"/
			result=source.match(regex);
			//GM_log(" result3 = "+result);
			if(result!=null && result.length>=4){
				//GM_log(" result3 len = "+result.length);
				var str='<a convert=1 href="'+url+'">';
				str+=result[3]+'<br>';
				str+='<img src="'+result[1].replace(/\\x2F/g,'/')+'" width=600>';
				str+='<br>'+result[2];
				str+='</a>';
				appendAfter(elm, str, useButton);
			}else{
				var regex = /"content":\[\{"url":"([^"]*)"/
				result=source.match(regex);
				//GM_log(" result4 = "+result);
				if(result!=null && result.length>=4){
					var str='<a convert=1 href="'+url+'"><img src="'+result[1].replace(/\\x2F/g,'/')+'" max-width=600></a>';
					appendAfter(elm, str, useButton);
				}
			}
		}
	}
	getPageContent(url, paresPicasa);
}

function embedTwitpic(url,elm,useButton){
	//GM_log("Twitpic");
	function paresTwitpic(response){
		GM_log("parseTwitpic");
		var source = response.responseText;		
		var result = source.match(/class="photo-large" src="([^"]*)" alt="([^"]*)"/);
		//GM_log(" result = "+result);
		if(result!=null && result.length>1){//old?
			var str='<a convert=1 href="'+url+'"><img src="'+result[1]+'" max-width=600>'
			if(result.length>2)
				str+='<br>'+result[2];
			str+='</a><br>';
			//GM_log(" str = "+str);
			appendAfter(elm, str, useButton);
			return;
		}else{
			result = source.match(/id="photo-display" src="([^"]*)"/);
			//GM_log(" result2 = "+result);
			if(result!=null && result.length>1){
				var str='<a convert=1 href="'+url+'"><img src="'+result[1]+'" max-width=600>'
				var result = source.match(/id="view-photo-caption">([^<]*)<"/);
				if(result!=null && result.length>1)
					str+='<br>'+result[1];
				str+='</a><br>';
				//GM_log(" str = "+str);
				appendAfter(elm, str, useButton);
				return;
			}
		}
		
		
	}
	getPageContent(url, paresTwitpic);
}

function embedApina(url,elm,useButton){
	var data = url.split('/');
	//GM_log('Apina = '+data);
	if(data.length>=4){
		makeImageLink('http://images.funnie.biz/'+data[data.length-1]+'.jpg',elm,useButton);//also possibly http://apina.nwpshost.com/3399.gif
	}
}

function embedImgur(url,elm,useButton){
	var data = url.split('/');
	//GM_log('Imgur = '+data);
	if(data.length>=4){
		makeImageLink('http://i.imgur.com/'+data[data.length-1]+'.jpg',elm,useButton);
	}
}

function embedPichars(url,elm,useButton){
	var data = url.split('/');
	//GM_log('Imgur = '+data);
	if(data.length>=4){
		makeImageLink('http://pichars.org/store/'+data[data.length-1],elm,useButton);
	}
}
		
function embedMp3(url,elm,useButton){
	embedAudio(url, elm, useButton, "audio/mpeg");
}
function embedWav(url,elm,useButton){
	embedAudio(url, elm, useButton, "audio/wav");
}
function embedWma(url,elm,useButton){
	embedAudio(url, elm, useButton, "audio/x-ms-wma");
}
function embedOgg(url,elm,useButton){
	embedAudio(url, elm, useButton, "audio/ogg");
}
function embedMid(url,elm,useButton){
	embedAudio(url, elm, useButton, "audio/midi");
}
		
function embedAudio(url,elm,useButton,mime){
	var str = '<object width="280" height="69"><param name="autoplay" value="FALSE"><param name="src" value="'+url+'"><param name="type" value="'+mime+'"><param name="showcontrols" value="TRUE"><param name="cache" value="TRUE"><param name="showcontrols" value="TRUE"><embed src ="'+url+'" autoplay="FALSE" type="'+mime+'" width="280" height="69" controller="TRUE" showstatusbar="TRUE" bgcolor="#404040" cache="TRUE"></embed></object>';
	appendAfter(elm, str, useButton);
}

	
function embedQuicktime(url,elm,useButton){
	var str = '<object width="640" height="496"><param name="src" value="'+elm.href+'"><param name="type" value="video/quicktime"><param name="showcontrols" value="TRUE"><param name="showstatusbar" value="TRUE"><param name="cache" value="TRUE"><param name="autoplay" value="FALSE"><embed src ="'+elm.href+'" type="video/quicktime" width="640" height="496" controller="TRUE" showstatusbar="TURE" bgcolor="#404040" cache="TRUE" autoplay="FALSE"></embed></object>';
	appendAfter(elm, str, useButton);
}

function embedAvi(url,elm,useButton){
	//640x576 - windows media player has 96px high control bar (???)
	embedVideo(url,elm,useButton,"video/x-msvideo",640,576);//"video/msvideo","application/x-troff-msvideo","video/avi"
}
function embedWmv(url,elm,useButton){
	//640x576 - windows media player has 96px high control bar (???)
	embedVideo(url,elm,useButton,"video/x-ms-wmv",640,576);
}
function embedMpeg(url,elm,useButton){
	embedVideo(url,elm,useButton,"video/mpeg",640,576);
}
function embedDivx(url,elm,useButton){
	//this should embed the Divx web player - 16 pixel high control bar
	embedVideo(url,elm,useButton,"video/divx",648,496);
}
function embedMp4(url,elm,useButton){
	embedVideo(url,elm,useButton,"video/mp4",640,576);
}
				
function embedVideo(url,elm,useButton,mime,width,height){				
	var str = '<object width="'+width+'" height="'+height+'"><param name="src" value="'+url+'"><param name="type" value="'+mime+'"><param name="showcontrols" value="TRUE"><param name="showstatusbar" value="TRUE"><param name="cache" value="TRUE"><param name="autoplay" value="FALSE"><embed src ="'+url+'" type="'+mime+'" width="'+width+'" height="'+height+'" controller="TRUE" showstatusbar="TRUE" bgcolor="#404040" cache="TRUE" autoplay="FALSE"></embed></object>';
	appendAfter(elm, str, useButton);
}
	
	
function embedFlash(url,elm,useButton){
	var str = '<div><embed width="640" height="480" type="application/x-shockwave-flash" src="'+url+'" > </embed></div>';
	appendAfter(elm, str, useButton);
}

function embedYtmnd(url,elm,useButton){
	//really wanted the title to show, but there doesn't appear to be a way to get it without cross site scripting.  so...  I'll have to xml request the page
	//var str = '<div><iframe width="640" height="480" src="'+url+'" onload="alert(this.contentDocument.title);this.nextSibling.innerHTML=this.contentDocument.title;"></iframe><div>replace</div><button onclick="this.parentNode.parentNode.removeChild(this.parentNode);">Remove</button></div>';
	//appendAfter(elm, str, useButton);
	function parseYtmnd(response){
		//GM_log("parseYtmnd");
		var source = response.responseText;
		//var result = source.match(/<div id="playerDiv">\n?(.*)>\n?<\/div>/); //haha - this line (the embed tag in this div) is created by javascript, and won't be in our copy of the page 
		var result = source.match(/<title>(.*)<\/title>/i);
		var title = '';
		//GM_log(" result = "+result);
		if(result != null && result.length>=2){
			title = result[1];
		}
		var str = '<div><div style="font-weight: bold;">'+escapeHtml(title)+'</div><iframe width="800" height="600" src="'+url+'"></iframe><button onclick="this.parentNode.parentNode.removeChild(this.parentNode);">Remove</button></div>';
		appendAfter(elm, str, useButton);
	}
	getPageContent(url, parseYtmnd);
}
	
function embedYoutube(url,elm,useButton){
//GM_log('youtube');
	var v;
	var domain;
	var fmt="";
	var fmt2;
	var str;
	if(url.indexOf('fmt=6')>0){ //?? beter than normal
		fmt='&fmt=6';
	}
	if(url.indexOf('fmt=18')>0){ //HQ SD
		fmt='&fmt=18';
	}
	if(url.indexOf('fmt=22')>0){ //720p ??
		fmt='&fmt=22';
	}
	if(fmt.length>1){
		fmt2='&ap=%2526'+escape(fmt.substring(1));
	}
	// Get the domain 
	domain = String(url);
	if (domain.substr(0, 7) == 'http://'){
		domain = domain.substr(7);
	}
	if (domain.indexOf('/') != -1){
		domain = domain.substring(0, domain.indexOf('/'));
	}

	
	if(url.indexOf('youtube.com/v/')>-1){
		v=url.substring(url.indexOf("/v/")+3);
		v = v.split('?');
		v = v[0];
		v = v.split('/');
		v = v[0];
		str = '<object width="640" height="385"><param name="movie" value="http://'+domain+'/v/'+v+fmt+'&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999'+fmt2+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="http://'+domain+'/v/'+v+fmt+'&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999'+fmt2+'" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" width="640" height="385"></embed></object>';

//	}
//*
	}else{
		v=url.substring(url.indexOf("v=")+2);
		v = v.split('&');
		v = v[0];
		str = '<object width="640" height="385"><param name="movie" value="http://'+domain+'/v/'+v+fmt+'&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999'+fmt2+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="http://'+domain+'/v/'+v+fmt+'&fs=1&rel=0&color1=0x3a3a3a&color2=0x999999'+fmt2+'" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" width="640" height="385"></embed></object>';
	}
/*/
	//old - based on provided embed code from youtube page.
	var str = '<object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/'+v+'&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/'+v+'&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>';
	
//new stuff:
/*low:
url
http://www.youtube.com/watch?v=DKw7mu6lzso
embed
<object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/DKw7mu6lzso"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/DKw7mu6lzso" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>
actual
<embed id="movie_player" width="480" height="395" flashvars="sourceid=r&video_id=DKw7mu6lzso&l=229&sk=4Ow26sLrcpxWwNMfA0PnMwU&t=OEgsToPDskJffLGSa2p9l32rxQ8CB1sz&hl=en&plid=AARHlKTU-gFlJzlaAAAAIAAQAAA&sdetail=p%3Awww.shacknews.com/laryn.x&playnext=0" allowfullscreen="true" quality="high" bgcolor="#FFFFFF" name="movie_player" style="" src="/player2.swf" type="application/x-shockwave-flash"/>

high:
url
http://www.youtube.com/watch?v=DKw7mu6lzso&fmt=18
embed
<object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/DKw7mu6lzso"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/DKw7mu6lzso" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>
actual
<embed id="movie_player" width="480" height="395" flashvars="sourceid=r&video_id=DKw7mu6lzso&l=229&sk=4Ow26sLrcpxWwNMfA0PnMwU&ap=%26fmt=18&t=OEgsToPDskK6ih7-SbtmRvcs5Hl6L3a2&hl=en&plid=AARHlKToQuPzwXe3AAAAIAAQAAA&sdetail=p%3Awww.shacknews.com/laryn.x&playnext=0" allowfullscreen="true" quality="high" bgcolor="#FFFFFF" name="movie_player" color1="#3a3a3a" color2="#999999" src="/player2.swf" type="application/x-shockwave-flash"/>

//the below cuts out too much to work :(
	var str = '';
	if(url.indexOf('fmt=18')>0){
		//'high' quality - magic seems to be the ap=%26fmt=18 in the flashvars
		str='<embed width="480" height="395" flashvars="sourceid=r&video_id='+v+'&sk=4Ow26sLrcpxWwNMfA0PnMwU&ap=%26fmt=18&hl=en&playnext=0" allowfullscreen="true" quality="high" bgcolor="#FFFFFF" color1="#3a3a3a" color2="#999999" src="http://youtube.com/player2.swf" type="application/x-shockwave-flash"/>';
	}else{
		//normal low quality
		str='<embed width="480" height="395" flashvars="sourceid=r&video_id='+v+'&sk=4Ow26sLrcpxWwNMfA0PnMwU&hl=en&playnext=0" allowfullscreen="true" quality="high" bgcolor="#FFFFFF" name="movie_player" style="" src="http://youtube.com/player2.swf" type="application/x-shockwave-flash"/>';
	}
*/

	appendAfter(elm, str, useButton);
	return;

//ok, we'll do this the 'hard' way
/*content of page containing player:
<div id="playerDiv">
<embed id="movie_player" width="480" height="395" flashvars="q=funny&sourceid=ys&video_id=XNuFxH8J8uQ&l=600&sk=4Ow26sLrcpxWwNMfA0PnMwU&t=OEgsToPDskJ34bJlftgzysvrn2Id_Nxt&hl=en&plid=AARHlNP3E48f2hMFAAAAAAQ8YAE&playnext=0" allowfullscreen="true" quality="high" bgcolor="#FFFFFF" name="movie_player" style="" src="/player2.swf" type="application/x-shockwave-flash"/>
</div>
*/
	function parseYoutube(response){
		//GM_log("parseYoutube");
		var source = response.responseText;
		//var result = source.match(/<div id="playerDiv">\n?(.*)>\n?<\/div>/); //haha - this line (the embed tag in this div) is created by javascript, and won't be in our copy of the page 
		var result = source.match(/var swfArgs ?= ?{([^}]*)};/);
		//GM_log("results = "+result+" - "+result.length);
		if(result != null && result.length>=2){
			//ok we have all the flash params in a javascript hash defination line, parse into a url like line.  "q": "funny", "sourceid": "ys", "video_id": "XNuFxH8J8uQ", "l": 600, "sk": "4Ow26sLrcpxWwNMfA0PnMwU", "t": "OEgsToPDskJ34bJlftgzysvrn2Id_Nxt", "hl": "en", "plid": "AARHlNP3E48f2hMFAAAAAAQ8YAE"
			var str = result[1].replace(/ (\d+),/,' "$1",').replace(/": ?"/g,"=").replace(/", ?"/g,"&").replace(/"/g,""); //first replace fixes issue where length is sometimes not surrounded by quotes.
//GM_log(" params = "+str);
			str = '<embed width="480" height="395" flashvars="'+str+'" allowfullscreen="true" quality="high" bgcolor="#FFFFFF"  src="http://youtube.com/player2.swf" type="application/x-shockwave-flash" />';
//GM_log(" embed = "+str);			
		
			appendAfter(elm, str, useButton);
		}
	}
	getPageContent(url, parseYoutube);
	//ok the above 'hard way' works, the only problem is that the video autoplays, which we don't want
}
	
function embedStagesix(url,elm,useButton){
//RIP
	var v=url.substring(elm.href.indexOf("video/")+6);
	v = v.split('/');
	v = v[0];
	var str = '<object codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab" height="480" width="640" classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616"><param name="autoplay" value="false"><param name="src" value="http://video.stage6.com/'+v+'/.divx" /><param name="custommode" value="Stage6" /><param name="showpostplaybackad" value="false" /><embed type="video/divx" src="http://video.stage6.com/'+v+'/.divx" pluginspage="http://go.divx.com/plugin/download/" showpostplaybackad="false" custommode="Stage6" autoplay="false" height="480" width="640" /></object>';
	appendAfter(elm, str, useButton);
}
		
function embedLiveleak(url,elm,useButton){
	var v=url.substring(elm.href.indexOf("?i=")+3);
	v = v.split('&');
	v = v[0];
	var str = '<embed src="http://www.liveleak.com/e/'+v+'" type="application/x-shockwave-flash" wmode="transparent" width="570" height="370" bgcolor="#000000" quality="high" allowfullscreen="true" wmode="transparent"></embed>';
	//'<embed type="application/x-shockwave-flash" src="http://www.liveleak.com/player_new.swf" id="ply" name="ply" bgcolor="#000000" quality="high" allowfullscreen="true" wmode="transparent" flashvars="config=http%3A%2F%2Fwww.liveleak.com%2Fflash_config_new.php%3Ffile_embed_tag%3D364a66082394%26width%3D570%26autostart%3Dfalse&amp;plugins=http://www.liveleak.com/d-related.swf&amp;drelated.dxmlpath=http://www.liveleak.com/more_videos.php?token='+v+'&amp;drelated.dposition=center&amp;drelated.dskin=http://www.liveleak.com/grayskin.swf&amp;drelated.dtarget=_self" height="363" width="570"/>';
	//id="swfplayer" width="570" height="370" flashvars="autostart=false&token='+v+'&p=57253&s=1&wmode=transparent" quality="best" bgcolor="#000000" name="swfplayer" style="" src="http://www.liveleak.com/e/'+v+'" type="application/x-shockwave-flash" wmode="transparent"/>';
	appendAfter(elm, str, useButton);
}
	
function embedVideoGoogle(url,elm,useButton){		
	var v = url.substr(url.indexOf('docid=') + 6);
	v = v.split('&');
	v = v[0];
	var str = '<embed style="width:400px; height:326px;" type="application/x-shockwave-flash" src="http://video.google.com/googleplayer.swf?docId='+v+'&hl=en" > </embed>';
	appendAfter(elm, str, useButton);
}
			
function embedCollegehumor(url,elm,useButton){
	var v = url.substr(url.indexOf('video:') + 6);
	v = v.split('/');
	v = v[0];
	var str = '<embed src="http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id='+v+'" quality="best" width="480" height="360" type="application/x-shockwave-flash"></embed>';
	//var str = '<embed src="/moogaloop/moogaloop.jukebox.swf" style="" id="moogaloop" name="moogaloop" quality="best" allowfullscreen="true" wmode="transparent" height="362" width="947" flashvars="clip_id='+v+'&amp;fullscreen=1&amp;autostart=false&amp;cont_play=false&amp;server=www.collegehumor.com" >';
	appendAfter(elm, str, useButton);
}
	
function embedIfilm(url,elm,useButton){	
	var v = url.substr(url.indexOf('/video/') + 7);
	v = v.split('?');
	v = v[0];
	var str = '<embed width="448" height="365" src="http://www.ifilm.com/efp" quality="high" bgcolor="000000" name="efp" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="flvbaseclip='+v+'&"> </embed>';
	appendAfter(elm, str, useButton);
}

function embedMetacafe(url,elm,useButton){		
	var v = url.substr(url.indexOf('watch/') + 6);
	v = v.split('/');
	if(v.length<2) return;
	var t = v[1];
	v = v[0];
	//var str = '<embed src="http://www.metacafe.com/fplayer/'+v+'/'+t+'.swf" width="400" height="300" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>';
	var str = '<embed src="http://www.metacafe.com/fplayer/'+v+'/'+t+'.swf" width="615" height="380" wmode="transparent" type="application/x-shockwave-flash" quality="high"></embed>';
	appendAfter(elm, str, useButton);
}

function embedOneRevver(url,elm,useButton){	
	var v ='';
	if(	url.indexOf('watch/') > -1){
		v = url.substr(url.indexOf('watch/') + 6);
	}else{
		v = url.substr(url.indexOf('video/') + 6);
	}
	v = v.split('/');
	v = v[0];
	var str = '<embed type="application/x-shockwave-flash" src="http://flash.revver.com/player/1.0/player.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" scale="noScale" salign="TL" bgcolor="#ffffff" flashvars="width=480&height=392&mediaId='+v+'&affiliateId=0&javascriptContext=true&skinURL=http://flash.revver.com/player/1.0/skins/Default_Raster.swf&skinImgURL=http://flash.revver.com/player/1.0/skins/night_skin.png&actionBarSkinURL=http://flash.revver.com/player/1.0/skins/DefaultNavBarSkin.swf&resizeVideo=True" wmode="transparent" height="392" width="480"></embed>';
	appendAfter(elm, str, useButton);
}

//this seems broken :(  movie won't load, but space is reserved in webpage
function embedClipstr(url,elm,useButton){	
	var v = url.substr(url.indexOf('/videos/') + 8);
	v = v.split('/');
	v = v[0];
	var str = '<embed type="application/x-shockwave-flash" src="http://www.clipstr.com/player/embed.swf" movie="http://www.clipstr.com/player/embed.swf" width="500" height="385" wmode="transparent" flashvars="file='+v+'"></embed>';
	appendAfter(elm, str, useButton);
}


function embedMyspace(url,elm,useButton){	
	//GM_log("MySpace");
	var pos = url.indexOf('videoid=');
	if(pos==-1)
		pos = url.indexOf('VideoID=')
	var v = url.substr( pos + 8);
	v = v.split('&');
	v = v[0];
	var str = '<embed src="http://lads.myspace.com/videos/vplayer.swf" flashvars="m='+v+'&type=video" type="application/x-shockwave-flash" width="430" height="346"></embed>';
	appendAfter(elm, str, useButton);
}

function embedSuperdeluxe(url,elm,useButton){	
	var v = url.substr(url.indexOf('id=') + 3);
	v = v.split('&');
	v = v[0];
	var str = '<object width="400" height="350"><param name="allowFullScreen" value="true" /><param name="movie" value="http://www.superdeluxe.com/static/swf/share_vidplayer.swf" /><param name="FlashVars" value="id='+v+'" /><embed src="http://www.superdeluxe.com/static/swf/share_vidplayer.swf" FlashVars="id='+v+'" type="application/x-shockwave-flash" width="400" height="350" allowFullScreen="true" ></embed></object>';
	appendAfter(elm, str, useButton);
}

function embedGametrailers(url,elm,useButton){	
	var v = url.substr(url.indexOf('/player/') + 8);
	v = v.split('.');
	v = v[0];
	var str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="480" height="409"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="http://www.gametrailers.com/remote_wrap.php?mid='+v+'"/><param name="quality" value="high" /><embed src="http://www.gametrailers.com/remote_wrap.php?mid='+v+'" swLiveConnect="true" name="gtembed" align="middle" allowScriptAccess="sameDomain" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="480" height="409"></embed></object>';
	appendAfter(elm, str, useButton);
}

function embedGamespot(url,elm,useButton){	
	var v = url.substr(url.indexOf('video/0/') + 8);
	v = v.split('/');
	v = v[0];
	var str = '<embed id="mymovie" width="432" height="355" flashvars="paramsURI=http%3A%2F%2Fwww%2Egamespot%2Ecom%2Fpages%2Fvideo%5Fplayer%2Fproteus%5Fxml%2Ephp%3Fadseg%3D741782%26adgrp%3D11765%26sid%3D'+v+'%26pid%3D939217%26nc%3D1184351152211%26embedded%3D1&showWatermark=0&autoPlay=0" allowfullscreen="true" allowscriptaccess="always" quality="high" name="mymovie" src="http://image.com.com/gamespot/images/cne_flash/production/media_player/proteus/gs/proteus_embed.swf" type="application/x-shockwave-flash"/>';
	appendAfter(elm, str, useButton);
}

function embedGamevideos(url,elm,useButton){	
	var v = url.substr(url.indexOf('video/id/') + 9);
	v = v.split('/');
	v = v[0];
	var str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="420" height="405" id="gamevideos6" align="middle"><param name="quality" value="high"><param name="play" value="true"><param name="loop" value="true"><param name="scale" value="showall"><param name="wmode" value="window"><param name="devicefont" value="false"><param name="bgcolor" value="#000000"><param name="menu" value="true"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="true"><param name="salign" value=""><param name="movie" value="http://www.gamevideos.com:80/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://www.gamevideos.com:80/video/videoListXML%3Fid%3D'+v+'8%26ordinal%3D1185303726427%26adPlay%3Dfalse" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /> <embed src="http://www.gamevideos.com:80/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://www.gamevideos.com:80/video/videoListXML%3Fid%3D'+v+'%26ordinal%3D1185303726427%26adPlay%3Dfalse" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" scale="showall" wmode="window" devicefont="false" id="gamevideos6" bgcolor="#000000" name="gamevideos6" menu="true" allowscriptaccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" align="middle" height="405" width="420"/></object>';
	appendAfter(elm, str, useButton);
}

function embedAdultswim(url,elm,useButton){	
	var v = url.substr(url.indexOf('episodeID=') + 10);
	v = v.split('&');
	v = v[0];
	var str = '<object width="425" height="350" type="application/x-shockwave-flash" data="http://www.adultswim.com/video/vplayer/index.html"><param name="allowFullScreen" value="true" /><param name="movie" value="http://www.adultswim.com/video/vplayer/index.html"/><param name="FlashVars" value="id='+v+'" /><embed src="http://www.adultswim.com/video/vplayer/index.html" type="application/x-shockwave-flash" FlashVars="id='+v+'" allowFullScreen="true" width="425" height="350"></embed></object>';
	appendAfter(elm, str, useButton);
}

function embedVideoMsn(url,elm,useButton){	
	var v = url.substr(url.indexOf('vid=') + 4);
	v = v.split('&');
	v = v[0];
	var str = '<embed src="http://images.video.msn.com/flash/soapbox1_1.swf" quality="high" width="432" height="364" base="http://images.video.msn.com" type="application/x-shockwave-flash" allowFullScreen="true" pluginspage="http://macromedia.com/go/getflashplayer" flashvars="c=v&v='+v+'&ifs=true&fr=msnvideo&mkt=en-US&brand="></embed>';
	appendAfter(elm, str, useButton);
}

function embedFivemin(url,elm,useButton){
	//GM_log("5min");
	var v = url.substr(url.lastIndexOf('-') + 1);
	var str = "<embed src='http://embed.5min.com/"+v+"/' type='application/x-shockwave-flash' width='560' height='450' allowfullscreen='true'></embed>";
	appendAfter(elm, str, useButton);
}

function embedVeoh(url,elm,useButton){
	//GM_log("Veoh");
	var v = url.substr(url.indexOf('/videos/') + 8);
	v = v.split('?');
	v = v[0];
	var str = '<embed src="http://www.veoh.com/videodetails2.swf?permalinkId='+v+'&id=anonymous&player=videodetailsembedded&videoAutoPlay=0" allowFullScreen="true" width="540" height="438" bgcolor="#000000" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';
	appendAfter(elm, str, useButton);
}


function embedVimeo(url,elm,useButton){
	var v = url.substr(url.lastIndexOf('vimeo.com/') + 10);
	if(v==null || v.length==0)
		return; //was not a video link
	v = v.split('?');
	v = v[0];
	if(!v.match(/^\d+$/)){
		//alert('vimeo bad '+url+'   -   '+v);	
		return; //was not a video link
	}
	var str = '<object type="application/x-shockwave-flash" width="400" height="300" data="http://www.vimeo.com/moogaloop.swf?clip_id='+v+'&amp;server=www.vimeo.com&amp;fullscreen=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0"><param name="quality" value="best" /><param name="allowfullscreen" value="true" /><param name="scale" value="showAll" /><param name="movie" value="http://www.vimeo.com/moogaloop.swf?clip_id='+v+'&amp;server=www.vimeo.com&amp;fullscreen=1&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0" /></object>';
	appendAfter(elm, str, useButton);
}


function embedFunnyordie(url, elm, useButton){
	var v = url.substr(url.indexOf('/videos/') + 8);
	v = v.split('?');
	v = v[0];
	if(v!=null && v.length>0){
		v=v.split('/')[0];
	}
	var str = '<embed width="480" height="400" flashvars="key='+v+'" allowfullscreen="true" quality="high" src="http://player.ordienetworks.com/flash/fodplayer.swf" type="application/x-shockwave-flash"></embed></object>';
	appendAfter(elm, str, useButton);
}

function embedWegame(url,elm,useButton){	
	var v = url.substr(url.indexOf('/watch/') + 7);
	v = v.split('/');
	v = v[0];
	//var str = '<embed src="http://www.wegame.com/static/flash/player2.swf" type="application/x-shockwave-flash" wmode="transparent" width="480" height="387" flashvars="tag='+v+'"></embed>';
	var str = '<embed src="http://www.wegame.com/static/flash/player.swf?xmlrequest=http://www.wegame.com/player/video/'+v+'&embedPlayer=true" type="application/x-shockwave-flash" wmode="transparent" allowfullscreen="true" width="640" height="441" autostart="false"></embed>';
	appendAfter(elm, str, useButton);
}

function embed5sf(url,elm,useButton){
	//GM_log("5sf");
	function parse5sf(response){
		//GM_log("parse5sf");
		var source = response.responseText;
		//var result = source.match(/<div id="playerDiv">\n?(.*)>\n?<\/div>/); //haha - this line (the embed tag in this div) is created by javascript, and won't be in our copy of the page 
		var result = source.match(/<title>(.*)<\/title>/i);
		var title = '';
		//GM_log(" result = "+result);
		if(result != null && result.length>=2){
			title = result[1];
		}
		//result = source.match(/<div class="video">([\s\S]*?)<\/div>/i);
		//GM_log(" result = "+result);
		//if(result != null && result.length>=2)
		{
			
			var result2 = source.match(/flashvars: ?"([^&]*)&?[^"]*"/i);
			//GM_log(" result2 = "+result2);
			if(result2 != null && result2.length>=2){
				var str = '<span><br>'+title+'<br><embed height="301" width="500" flashvars="'+result2[1]+'&bufferlength=3" allowfullscreen="true" bgcolor="#ffffff" src="http://s3.amazonaws.com/5sf/files/player.swf"/></span>';
				appendAfter(elm, str, useButton);
			}
			//else{
			//	var str = '<span><br>'+escapeHtml(title)+'<br>'+result[1]+'</span>';
			//	appendAfter(elm, str, useButton);
			//}
		}
	}
	getPageContent(url, parse5sf);
}


function embedBreak(url,elm,useButton){
	
	//this one is different than the above, as the video id isn't embedded into the url.
	//so... we are going to request the page ourselves, and then try to pull the embed tag out of it.
	
	//ok created function the parses the pages source once we get it
	function parseBreak(response){
	
		var source = response.responseText;
//GM_log(source);		
		var embedsrc = '';
		var embedtitle = '';
		var embedwidth = 464;//'425';
		var embedheight = 392;//'350';
		
		//break is really nice, they put the information we need in meta tags right at the top of the page!
		var results = source.match(/name="embed_video_url" content="([^"]*)"/);
		if(results==null || results.length<2)
			return; //couldn't find info to embed video
		embedsrc = results[1];
	
		results = source.match(/name="embed_video_title" content="([^"]*)"/);
		if(results!=null && results.length>=2)
			embedtitle = results[1];
		//results = source.match(/name="embed_video_width" content="([^"]*)"/);  //the width and height listed in the meta tags is smaller than the size you get by clicking the embed link on the page, so I'm ignoring it for now.
		//if(results==null || results.length<2)
		//	embedwidth=results[1];
		//results = source.match(/name="embed_video_height" content="([^"]*)"/);
		//if(results==null || results.length<2)
		//	embedheight=results[1];
			
		var str = embedtitle+'<br><object width="464" height="392"><param name="movie" value="'+embedsrc+'"></param><embed src="'+embedsrc+'" type="application/x-shockwave-flash" width="464" height="392"></embed></object>';
		
//GM_log(str);
		
		appendAfter(elm, str, useButton);

	};
	
	//ok now load the page and have it call this function when it loads
	
	getPageContent(url,parseBreak);
	
}

function embedMegavideo(url, elm, useButton){
	//GM_log("megavideo");
	function parseMegavideo(response){
	
		var source = response.responseText;
//GM_log(source);		
/*
		var embedflv = '';
		var embedtitle = '';
		var embedlength = '';
		var results = source.match(/addVariable\("flv","([^"]*)"\);/);
		if(results==null || results.length<2)
			return; //couldn't find info to embed video
		embedflv = results[1];
		//GM_log("flv="+embedflv);
		results = source.match(/addVariable\("videoname","([^"]*)"\);/);
		if(results!=null && results.length>=2)
			embedtitle = results[1];
		//GM_log("title="+embedtitle);
		results = source.match(/addVariable\("vid_time","([^"]*)"\);/);
		if(results!=null && results.length>=2)
			embedlength = results[1];
		//GM_log("length="+embedlength);
			
		var v = url.split('=')[1];
		//GM_log("v="+v);

		//NOTE: the aff=1 in the flashvars seems responsible for showing the ad upon load.  However, without it, the video autoplays.
		var str = embedtitle+'<br><embed id="flashplayer" width="484" height="418" flashvars="aff=1&waitingtime=1000&flv='+embedflv+'&rel_again=Play again&rel_other=Related videos&videoname='+embedtitle+'&vid_name='+embedtitle+'&vid_time='+embedlength+'&v='+v+'" scale="noscale" allowfullscreen="true" quality="high" bgcolor="#202020" src="http://megavideo.com/mvplayer.swf" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/>';
		appendAfter(elm, str, useButton);
*/

		var v = url.substr(url.indexOf('v=') + 2);
		v = v.split('&');
		v = v[0];
		var title = "";
		var description = "";
		var results = source.match(/flashvars.title ?= ?"([^"]*)"/);
		if(results!=null && results.length>1)
			title = results[1];
		var results = source.match(/flashvars.description ?= ?"([^"]*)"/);
		if(results!=null && results.length>1)
			description = results[1];
		
		var str = '<object data="http://wwwstatic.megavideo.com/mv_player.swf" id="mvplayer" type="application/x-shockwave-flash" height="558" width="992">';
		str+='<param value="noscale" name="scale"><param value="tl" name="salign"><param value="window" name="wmode">';
		str+='<param value="true" name="allowfullscreen"><param value="title='+title+'&amp;description='+description+'&amp;v='+v+'" name="flashvars"></object>';
		appendAfter(elm, str, useButton);
	
	};
	getPageContent(url,parseMegavideo);



}

function embedWimp(url, elm, useButton){
	//GM_log("Wimp");
	function parseMegavideo(response){
	
		var source = response.responseText;
//GM_log(source);		
		var file = '';
		var width = '';
		var height = '';
		var title = '';
		var desc = '';
		var results = source.match(/addVariable\("file","([^"]*)"\);/);
		if(results==null || results.length<2)
			return; //couldn't find info to embed video
		file = results[1];
		//GM_log("flv="+embedflv);
		results = source.match(/addVariable\("width","([^"]*)"\);/);
		if(results!=null && results.length>=2)
			width = results[1];
		//GM_log("title="+embedtitle);
		results = source.match(/addVariable\("height","([^"]*)"\);/);
		if(results!=null && results.length>=2)
			height = results[1];
		//GM_log("length="+embedlength);
		
		results = source.match(/<td align="center" colspan="2">([\s\S]*?)<\/td>/);
		if(results!=null && results.length>=2)
			desc = results[1];
			
		var v = url.split('=')[1];
		//GM_log("v="+v);

		//NOTE: the aff=1 in the flashvars seems responsible for showing the ad upon load.  However, without it, the video autoplays.
		var str = '<br>'+desc+'<br><embed id="flashplayer" width="'+width+'" height="'+height+'" flashvars="width='+width+'&height='+height+'&fullscreen=true&file='+file+'" allowfullscreen="true" quality="high" src="http://wimp.com/mediaplayer.swf" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"/>';
		appendAfter(elm, str, useButton);
	};
	getPageContent(url,parseMegavideo);

}


function addFukungTags(url, elm){
	//GM_log("Fukung tags "+url);
	function parseFukungTags(response){
	
		var source = response.responseText;
//GM_log(source);		

		var results = source.match(/id=\"taglist\"[\s]*>([\s\S]*?)<\/span>/);
		if(results==null || results.length<2)
			return; //couldn't find info to embed video
		var tagshtml = results[1];
//GM_log(tagshtml);			
		tagshtml = tagshtml.split(">");
		for(i=0;i<tagshtml.length;i++){
			tagshtml[i] = tagshtml[i].replace(/^\s+|\s+$/g, '');//trim string
			if(tagshtml[i].charAt(0)=='<'){
				tagshtml[i]="";
			}else{
				tagshtml[i] = tagshtml[i].split("<")[0]; //remove  '</a' from end of string
			}
			
//GM_log(""+i+" = "+tagshtml[i]);			
		}
		tagshtml = tagshtml.join();
		tagshtml = tagshtml.replace(/,/g,"");

		//NOTE: the aff=1 in the flashvars seems responsible for showing the ad upon load.  However, without it, the video autoplays.
		var str = "TAGS:&nbsp;"+tagshtml;
		appendAfter(elm, str, false);
	};
	getPageContent(url,parseFukungTags);

}


function getPageContent(href, callback){

	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		headers: {
			'User-agent': window.navigator.userAgent,
		},
		onload: callback
	});

}


function makePlayButton(playerCode){
	//this method wraps the player code inside a PLAY button, so the object/embed tags aren't actually added to the page until the user clickes the play button
	//this is useful for players that preload the videos (i.e. don't stream) every time the player is displayed (i.e. Quicktime, especially if the video is large, you don't want it downloading everytime you refresh the page.)
	
	//GM_log('ShackChan2 - makePlayButton = '+playerCode);
	
	
	
	var str = '<span title="PLAY!" onclick="this.parentNode.innerHTML=unescape(this.getAttribute(\'code\'));" code=\'<div>';
	str += escape(playerCode);
	str += '</div>\' style=\'width: 9px; height: 15px; margin-left: 3px; cursor: pointer; background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPAgMAAABLpg2eAAAAAXNSR0IArs4c6QAAAAlQTFRFAAAAgG0C/9oElFpbDgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfYAhYWKRB8UT+MAAAAK0lEQVQI12MIYGBgSAHiTCDOcgDiCUC8BIhXAvEqBwi9BCruAFEHUg/UBwBSzwsZWMSLLAAAAABJRU5ErkJggg==\") no-repeat;\'>&nbsp; &nbsp;</span>';
	return str;
}

function appendAfter(elm, content, useButton){
	var node;
	if(useButton == true){
		node = document.createElement("span");
		content = makePlayButton(content);
	}else{
		node = document.createElement("div");
	}
	
	node.innerHTML = content;
				
	if (elm.nextSibling) 
		elm.parentNode.insertBefore(node,elm.nextSibling);
	else elm.parentNode.appendChild(node);
	
	return node;
}


function toid(str){
	return str.replace(/ /g,'_').replace(/\./g,'_').replace(/:/g,'_').replace(/\(/g,'_').replace(/\)/g,'_').replace(/,/g,'_').replace(/\//g,'_');
}


function saveSetting() {
	
	if(typeof GM_setValue == 'undefined'){
		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}
	}
	GM_setValue(this.id, this.checked);
}

function makesettingsbutton(){
	
	if(document.getElementById("ShackChanSettings")!=null) return;
	
	//load settings
	for(i=0;i<embed.length;i++){
		embed[i][1]=GM_getValue("shackchan_enable_"+toid(embed[i][0]),embed[i][1]);
		embed[i][2]=GM_getValue("shackchan_usebutton_"+toid(embed[i][0]),embed[i][2]);
	}
	useButtonNWS = GM_getValue("shackchan_usebuttonNWS",useButtonNWS);

	var buttonstyle = 'width: 20px; height: 20px; background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABgFBMVEUCBQEABQkABwoIBQoEBwICCAwFCAQLBw0GDA8KDAgMDwsOEAwPEQ0SFBETFBIVFhQWGBUZGxgaGyIdHxwfIB4gIR8iJCEjJCIlJi0lJyQmKCUnKCYoKScpKygrLSovMS4zNDI0NjM3OTY9Pzw+QD1AQT9BQkBBQ0FDRUJJSkhKTEpPUE7zKQBRU1BWWFVcWl1cXltfYGhlZFxmZ2VqbGl0dnN5e3h8fYaBf4N7goqAgn98g4uCg4F9hIx+hY2CiZGEjJOOkI2Lk5qNlZyUlpOVl5SbnZmdn5yfoZ6ho6CipKGnpKmpp6ulqq2rqa2sqq6nrK+rraqtr6yysLSytLGxtri0uby7vbq8vru8wcPBw8DFwsfExsPIxcrGyMXIysfGzM7LzsrNz8vP0c7Q0s/T1dLU1tPV19TY2tbZ29fa3Nnc3trd39ze4N3f4d7i5OHl5+Pm6OXn6ebo6ufp6+jr7enu8e3w8u/09/P2+PT4+vf5+/j6/Pn7/fr8//v+//xbJjLjAAAA/klEQVQoz22RPy9EURQH55537FqLYiMkaCgRjcT3/wJC1AqJRCdr/Xne3nfP+alomGbaScYv+IuzUkFFhR/HwhGCbvYO3XwlhOGg0nx+edP76eSzNQcchaPPenZ3fHQ/FloHTt2cmvzh+urgvt9C0ScOi8udIHcPhpPzVFndLnE43OtIlYF9ZLH9vMSRMfstjK9xbDjZgDSDTEUbEpxwSEiLrMErSpyhgpGKqPQwquJsqKaowfAx720c5Thf02x1Pe3tw96js5I9Di+LNxiARlhONcHhUdsKWAOorJ8qTlndgSUFUHY0w1E1p5KbdVIthQwnPLMVDMYCMoTzz49vi7GXzRBWbV0AAAAASUVORK5CYII=");'
	
	var node = document.createElement("div");
	node.setAttribute('onclick','document.getElementById("ShackChanSettings").style.display="block";');
	if(document.location.toString().indexOf("shacknews.com/settings/")==-1){
		node.setAttribute('style','display: inline-block; '+buttonstyle);
		
		var settings = document.getElementById('commentssettings');
		if(settings!=null){
			var setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left; width: 95%');
			var sstr = '<h5>Shack-Chan 2 Settings</h5>';
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
			
			setdiv = document.createElement('div');
			setdiv.setAttribute('style', 'float: left;');
			sstr = 'Click this button for settings: <span id="shackchan2settingsbutton" ></span>';
			setdiv.innerHTML=sstr;
			settings.appendChild(setdiv);
		}
		var elm = document.getElementById('shackchan2settingsbutton');
		if(elm!=null){
			elm.appendChild(node);
		}
	}else{
		document.body.appendChild(node);
		node.setAttribute('style','position: absolute; top: 22px; left: 5px; '+buttonstyle);
	}
	
	node = document.createElement("div");
	node.setAttribute('id','ShackChanSettings');
	node.setAttribute('style','position: absolute; top: 42px; left: 5px; border: 1px solid red; background: black; margin: 2px; padding: 2px; display: none; z-index: 10000;');
	var str;
	str='<table class="ShackChanSettingsTable" style="padding: 2px; margin: 2px;"><tr><th>Embed Type</th><th>Enabled</th><th>Using Play Button</th></tr>';
	for(i=0;i<embed.length;i++){
		str+='<tr ';
		if(embed[i][6]=='image'){
			str+='style="background: #300000"';
		}else if(embed[i][6]=='audio'){
			str+='style="background: #003000"';
		}else if(embed[i][6]=='video'){
			str+='style="background: #000030"';
		}
		str+='><td>'+embed[i][0]+'</td>';
		str+='<td><input id="shackchan_enable_'+toid(embed[i][0])+'" type="checkbox" ';
		if(embed[i][1] == true) str+='checked';
		str+='></td>';
		str+='<td><input id="shackchan_usebutton_'+toid(embed[i][0])+'" type="checkbox" '
		if(embed[i][2] == true) str+='checked';
		str+='></td></tr>';
	}
	str+='<tr><td colspan="3"><center> - - - - - - - - - - - - - - </center></td></tr>';
	str+='<tr><td colspan="2">Always use Play Button for NWS Posts</td>';
	str+='<td><input id="shackchan_usebuttonNWS" type="checkbox" '
	if(useButtonNWS == true) str+='checked';
	str+='></td></tr>';
	str+='</table><button onClick="';
	str+='document.getElementById(\'ShackChanSettings\').style.display=\'none\';';
	str+='">Close</button>';
	node.innerHTML=str;
	
	document.body.appendChild(node);
	
	GM_addStyle('table.ShackChanSettingsTable td{ border: none; padding: 0px;}');
	
	//ok, now add checkbox listeners
	for(i=0;i<embed.length;i++){
		node = document.getElementById('shackchan_enable_'+toid(embed[i][0]));
		if(node != null) node.addEventListener('change', saveSetting, false);
		node = document.getElementById('shackchan_usebutton_'+toid(embed[i][0]));
		if(node != null) node.addEventListener('change', saveSetting, false);
	}
	node = document.getElementById('shackchan_usebuttonNWS');
	if(node != null) node.addEventListener('change', saveSetting, false);

}

function ClickListener(e) { 
//GM_log("click! "+e);
	if(e.target!=null){
		var elm = e.target;
//GM_log("click! target = "+elm);
		if(elm!=null){
//GM_log(" ELM = "+elm.tagName);
			if(elm.tagName=='A'){
				//possible refresh thread click
//GM_log(" href = "+elm.href);
				if(elm.href.indexOf('/frame_laryn.x?root=')>-1){
					runLinkConversion(elm);
				}else if(elm.href.indexOf('/laryn.x?id=')>-1){
					runLinkConversion(elm);
				}
			}else{
				while(elm!=null && elm.tagName!='A'){
					elm=elm.parentNode;
				}
//GM_log(" ELM2 = "+elm+"  -  "+elm.tagName);
				if(elm!=null){
					//possible click on a reply (oneline (collapsed) replies are always a span inside an 'A' tag, but may also have formating <I> or <B> or color spans as well.
					var url = elm.getAttribute('onclick');
					if(url.indexOf("return clickItem")==0){
						runLinkConversion(elm);
					}else if(elm.href.indexOf('/laryn.x?id=')>-1){
						runLinkConversion(elm);
					}
				}
			}
		}
	}
}

function KeyListener(e){
//GM_log("KEY! "+e);
	var key = window.event ? e.keyCode : e.which;
	var keychar = String.fromCharCode(key);
	
	if(keychar=='a' || keychar=='z'){
		runLinkConversion(document.body);
	}
}


function runLinkConversion(elm){
//alert('linkconvert');
	while(elm!=null && elm.id != null && elm.id.indexOf("root_")!=0){
		elm = elm.parentNode;
	}
	eventObj = elm; 
//GM_log(" running conversion on "+elm.tagName+"  id="+elm.id+"  class="+elm.class);

	//ok, we want to run on the element elm.  However, if we hold on to elm, it will be elm as it is now, not elm as it is after the thread update.  so, if elm has an id (which it should as we look for an id atarting with 'root_'), in one second, we just call getElementById with elm's id.
	window.setTimeout(function(){
		if( (!is_chrome) && (unsafeWindow != null) && (unsafeWindow != 'undefined') ){
			eventObj = unsafeWindow.document.getElementById(elm.id);//apparently passing the wrapped object into the XPath query is the same as passing null or document, the whole page is searched.  here we use unsafeWindow to get the actual element, which appears to work.
		}else{
			eventObj = document.getElementById(elm.id);
			//alert('chrome');
		}
		converthtmllinkstoimages();
	}, 1000);
}

function setupReplyConvert(){
								 
//	var elms = document.evaluate('//a[contains(@onclick,"clickItem") and not(@convert)]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//	for(var k=0;k<elms.snapshotLength;k++){
//		var elm = elms.snapshotItem(k);
//		elm.addEventListener('click', function() { eventObj = this.parentNode.parentNode; window.setTimeout(converthtmllinkstoimages, 100);}, false);
//		elm.setAttribute("convert","1");//mark as processed, so it doesn't get processed again
//	}

	
	//window.addEventListener('click', ClickListener, false);
	//window.addEventListener('keypress', KeyListener, false);  //for A / Z navigation
	document.body.addEventListener('click', ClickListener, false);
	document.body.addEventListener('keypress', KeyListener, false);  //for A / Z navigation
	//alert('listeners added');
}


//window.addEventListener( 'load',  function() { window.setTimeout(converthtmllinkstoimages, 100);}, true);
//GM_log('1');
converthtmllinkstoimages();
//GM_log('2');
setupReplyConvert();
//GM_log('3');
makesettingsbutton();
//GM_log('4');



