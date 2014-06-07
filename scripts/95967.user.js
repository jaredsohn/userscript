// ==UserScript==
// @name Forum Image Tags
// @version 2.0.0
// @namespace Kjoe51689 & Toccata6767
// @description Allows the user to post video, plays, images, and extra emotions using the tags included. This is currently V 2.0 released 02/04/11 if you have any older versions please redownload
// @include http://goallineblitz.com/game/forum_thread.pl?*
// ==/UserScript==

window.setTimeout(function() {
	ImageReplacement();
}, 1000);

function ImageReplacement() {

	//Create array of elements
	var element= getElementsByClass("post_content_inner");

	//Search array and replace the image tags with the html tags
	for (i = 0; i < element.length; i++) {
		var postHTML = element[i].innerHTML;
		
		//----------------------------------------------------
		//Image Updates V. 1.0.0
		//---------------------------------------------------

		//Changes All Image Tags
		while(postHTML.indexOf("[/img]") != -1)
		{
			var beginIndex = postHTML.indexOf("[img]<a href");
			var endIndex = postHTML.indexOf("[/img]</a>");
			var strUrl = postHTML.substring(beginIndex, endIndex+10);
			var strUrlRedux = strUrl.replace("<a href=\"", "");
			endIndex = strUrl.indexOf("[/img]");
			strUrlRedux = strUrlRedux.substring(0, endIndex);
			postHTML = postHTML.replace(strUrl, strUrlRedux);
			postHTML = postHTML.replace("[img]", "<img src = \"");
			postHTML = postHTML.replace("[/img]", "\">");
		}
		

		//----------------------------------------------------
		//Video/Play Updates V. 2.0
		//---------------------------------------------------


		//Changes Video Tags
		while(postHTML.indexOf("[/video]") != -1)
		{
			var beginIndexv = postHTML.indexOf("[video]");
			var endIndexv = postHTML.indexOf("[/video]</a>");
			var strUrlv = postHTML.substring(beginIndexv, endIndexv);
			var strUrlReduxv = strUrlv.replace("<a href=\"", "");
strUrlReduxv = strUrlv.replace("watch?v=","embed/");
alert(strUrlReduxv);
			endIndexv = strUrlv.indexOf("[/video]");
			strUrlReduxv = strUrlReduxv.substring(0, endIndexv-3);
			postHTML = postHTML.replace(strUrlv, strUrlReduxv);
			postHTML = postHTML.replace("[video]", "<iframe width=\"800\" height=\"600\" top=\"200px\" left=\"300px\" src=\"");
			postHTML = postHTML.replace("[/video]", " \" frameborder=\"0\" allowfullscreen></iframe>");
document.write(postHTML);
		}

		//Changes GLB Tags to allow Replays
		while(postHTML.indexOf("[/glb]") != -1)
		{

			var beginIndexg = postHTML.indexOf("[glb]");
			var endIndexg = postHTML.indexOf("[/glb]</a>");
			var strUrlg = postHTML.substring(beginIndexg, endIndexg);
			var strUrlReduxg = strUrlg.replace("<a href=\"", "");
			endIndexg = strUrlg.indexOf("[/glb]");
			strUrlReduxg = strUrlReduxg.substring(0, endIndexg-9);
			var gameIndexg = strUrlReduxg.indexOf("game_id");
			var gameIdg = strUrlReduxg.substring(gameIndexg);
			postHTML = postHTML.replace(strUrlg, strUrlReduxg);
			postHTML = postHTML.replace("[glb]", "<embed width=\"784\" height=\"492\" pluginspage =\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" allowfullscreen=\"false\" allowscriptaccess=\"sameDomain\" name=\"replay\" bgcolor=\"#999999\" swliveconnect=\"true\" loop=\"false\"  quality=\"high\" flashvars=\"" + gameIdg + "\" src=\"http://goallineblitz.com/preload.swf\"> ");
			postHTML = postHTML.replace("[/glb]", "");
                        strUrlReduxg = strUrlReduxg.substring(5);
                        postHTML = postHTML.replace(strUrlReduxg, "");
		}

		
		//----------------------------------------------------
		//Smiley Updates V. 1.5.0
		//---------------------------------------------------


		//Changes Smiley for +1
		while(postHTML.indexOf("[+1]") != -1)
		{
			
			postHTML= postHTML.replace("[+1]", "<img src = \"http://img18.imageshack.us/img18/9347/plus1g.gif\">");
			postHTML[i].innerHTML = postHTML;
		}


		//Changes Smiley for nsfw
		while(postHTML.indexOf("[nsfw]") != -1)
		{
			postHTML= postHTML.replace("[nsfw]", "<img src = \"http://img193.imageshack.us/img193/3281/nsfw.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for bump
		while(postHTML.indexOf("[bump]") != -1)
		{
			postHTML= postHTML.replace("[bump]", "<img src = \"http://img840.imageshack.us/img840/1701/bumpc.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for -1
		while(postHTML.indexOf("[-1]") != -1)
		{
			postHTML= postHTML.replace("[-1]", "<img src = \"http://img96.imageshack.us/img96/9161/minus1.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for combine
		while(postHTML.indexOf("[combine]") != -1)
		{
			postHTML= postHTML.replace("[combine]", "<img src = \"http://img543.imageshack.us/img543/9862/combine.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for addict
		while(postHTML.indexOf("[addict]") != -1)
		{
			postHTML= postHTML.replace("[addict]", "<img src = \"http://img690.imageshack.us/img690/968/addicts.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for heman
		while(postHTML.indexOf("[heman]") != -1)
		{
			postHTML= postHTML.replace("[heman]", "<img src = \"http://img840.imageshack.us/img840/1339/hemanf.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for pwned
		while(postHTML.indexOf("[pwned]") != -1)
		{
			postHTML= postHTML.replace("[pwned]", "<img src = \"http://img189.imageshack.us/img189/1755/pwnedm.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for gtfo
		while(postHTML.indexOf("[gtfo]") != -1)
		{
			postHTML= postHTML.replace("[gtfo]", "<img src = \"http://img809.imageshack.us/img809/5082/gtfo.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for help
		while(postHTML.indexOf("[help]") != -1)
		{
			postHTML= postHTML.replace("[help]", "<img src = \"http://img88.imageshack.us/img88/5947/helpw.gif\">");
			element[i].innerHTML = postHTML;
		}

		//Changes Smiley for worthless
		while(postHTML.indexOf("[worthless]") != -1)
		{
			postHTML= postHTML.replace("[worthless]", "<img src = \"http://img143.imageshack.us/img143/4650/worthless.gif\">");
			element[i].innerHTML = postHTML;
		}


	//Finish adding to the HTML
              element[i].innerHTML = postHTML;
	}
}

//Function created by www.anyexample.com to return elementsbyclass that equal the classes we are using
function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 