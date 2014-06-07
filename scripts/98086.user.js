// ==UserScript==
// @name           ETI Archive Quoter
// @description    Adds a 'Quote' button to posts in the archives
// @namespace      pendevin
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        http://archives.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        https://archives.endoftheinter.net/showmessages.php*
// @require        http://code.jquery.com/jquery-2.0.3.js
// @version        2
// ==/UserScript==

//ll breaks without noconflict jquery
this.$ = this.jQuery = jQuery.noConflict(true);

//adds a style to a document and returns the style object *JQUERY
//css is a string, id is an optional string that determines the object's id
function addStyle(css,id){
	//create a style
	var style=$('<style type="text/css">');
	//add the css data to it
	style.html(css);
	if(id){
		//remove any style that has our id
		$('#'+id).remove();
		//give our style the id after removing the other stuff. idk if it matters, but i'm too lazy to find out
		style.attr('id',id);
	}
	//add the style into the head
	$('head').append(style);
	//we're outta here
	return style;
}

//finds the last index of a regular expression value
//takes a string and a regex object
//kinda slow :(
function reLastIndex(string,regex){
	var index=-1;
	//we're going backwards from the end and searching for the first occurrence we find
	for(var i=string.length-1;i>0;i--){
		//once we find it, we're outta here
		if(string.substring(i).search(regex)!=-1){
			index=i;
			break;
		}
	}
	return index;
}

//puts the message body of any quoted-message in its own message div like normal messages for easier styling(hiding)
//livelinks ready *JQUERY
function rearrangeQuotes(container){
	//this is a for loop or something
	$(container).find('.quoted-message').each(function(i,quote){
		quote=$(quote);
		//create message div for quote
		var quoteBody=$('<div class="message">');
		//add everything but the message-top to the message div
		quote.contents().each(function(i2,node){
			node=$(node);
			if(!node.hasClass('message-top')&&!node.hasClass('message')){
				quoteBody.append(node);
			}
		});
		//add the new message div to the quoted-message if it's got anything in it
		if(quoteBody.contents()[0]){
			quote.append(quoteBody);
		}
	});
}

//add in those pesky triggers
function addQuoteLinks(){
	//i'm lazy so rearrange the quotes
	$('#u0_1 .message-container').each(function(i,container){
		rearrangeQuotes(container);
	});

	//make sure this topic is closed
	if(location.hostname=='archives.endoftheinter.net'||$('em').text().match(/This topic has been closed/)){
		$('#u0_1 .message-container>.message-top').each(function(i,top){
			top=$(top);
			//message detail link
			var messageDetail=top.children('[href^="/message.php"]');
			//new quote link
			var link=$('<span class="linky quote">Quote</span>');
			messageDetail.after('&nbsp;|&nbsp;',link);
			//oh look we got quoted
			link.on(
				'click',
				top.next().find('.message:first'),
				function(e){
					postToText(e.data);
				}
			);
		});
	}
}

//takes a post and returns the text required to get it
function postToText(post){
	post=$(post);
	var text=$('<div>'+post.html()+'</div>');

	//get rid of sigs
	//if people fuck with the sig belt, this probably won't work
	var lastIndex=reLastIndex(text.html(),/(<br>|<\/div>)?\n?---\n?<br>/g);
	if(lastIndex!=-1){
		text.html(text.html().substring(0,lastIndex));
	}

	//deal with spoilers
	text.find('.spoiler_closed').each(function(i,spoiler){
		spoiler=$(spoiler);
		//build our spoiler notation
		var pointA=spoiler.find('span>a>b').text();
		var pointB=spoiler.find('.spoiler_on_open').html();
		var spoiled='<spoiler'+(pointA!='<spoiler />'?' caption="'+pointA.slice(1,-3)+'">':'>')+pointB.substring(pointB.indexOf('</a>')+4,pointB.lastIndexOf('<a class="caption"'))+'</spoiler>';
		//replace the old spoiler
		spoiler.replaceWith(spoiled);
	});

	//deal with quotes
	//this guy only hamdles rearranged quotes
	//go in reverse order so it can handle nested quotes
	$(text.find('.quoted-message').get().reverse()).each(function(i,quote){
		quote=$(quote);
		//build our quote notation
		var msgID=quote.attr('msgid');
		//quoted text omitted
		var omitted=(quote.children(':last-child').children(':last-child').text()==('[quoted text omitted]'));
		//quoting empty posts
		var quoteContent=quote.children(':last-child').html()!=undefined?quote.children(':last-child').html():'';
		//remove trailing linebreaks
		quoteContent=quoteContent.replace(/(\n|<br>)+$/g,'');
		var quoted='<quote'+(msgID!=''?' msgid="'+msgID+'"':'')+(!omitted?'>'+quoteContent+'</quote>':' />');
		//replace the old quote
		quote.replaceWith(quoted);
		//if next element is a br, get rid of it
		if(quoted.nextSibling&&quoted.nextSibling.nodeName=='BR'){
			$(quoted).next().remove();
		}
	});

	//deal with images
	//works with all image settings don't worry
	text.find('.imgs').each(function(i,imgs){
		imgs=$(imgs);
		//there's possibly a bunch of images per div
		imgs.children('a').each(function(i2,img){
			img=$(img);
			//stick all the images after the imgs div
			var imged=$('<img src="'+img.attr('imgsrc')+'">');
			imgs.before(imged);
		});
		//get rid of the imgs div and replace with a br
		imgs.replaceWith('<br>');
	});

	//deal with links
	//the selector takes care of youtube video embed
	text.find('a:not([href^="javascript"])').each(function(i,a){
		a=$(a);
		//just need the href to make a link
		a.replaceWith(a.attr('href'));
	});

	//deal with pre tags
	text.find('.pr').each(function(i,pre){
		pre=$(pre);
		//replacing pre tags so easy
		var post=$('<pre>'+pre.html()+'</pre>');
		pre.replaceWith(post);
	});

	//if you have the userpics script, get rid of the userpic
	text.find('.photo-album-image').remove();

	//if you have my youtube embed script or something similar
	text.find('a[href="javascript:void(0);"]').each(function(i,thing){
		thing=$(thing);
		console.log(thing.attr('href'));
	});

	//final clean-up and display
	var alert=text.html();
	//remove trailing newlines
	alert=alert.replace(/(\n|<br>)+$/g,'');
	//add quote thingy and replace brs for newlines
	alert='<quote msgid="'+post.attr('msgid')+'">'+alert+'</quote>\n';
	alert=alert.replace(/<br>\n?/g,'\n');
	//create shadow
	var shadow=$('<div id="AQshadowbox">');
	//create textbox to go on top of shadow
	var light=$('<textarea id="AQtextarea">'+alert+'</textarea>');
	//add these guys to the document
	$('body').append(shadow,light);
	//listen for removal
	shadow.on(
		'click',
		function(e){
			shadow.remove();
			light.remove();
		}
	);
}

//styles
addStyle('\
	#AQshadowbox{\
		position:fixed;\
		top:0px;\
		left:0px;\
		width:100%;\
		height:100%;\
		background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBgaAAIMAAAhQCB69VMmQAAAABJRU5ErkJggg==);\
	}\
	#AQtextarea{\
		position:fixed;\
		top:0px;\
		left:0px;\
		width:70%;\
		height:70%;\
		margin:15%;\
		border:4px solid;\
	}\
','archive-quoter');
addStyle('.linky{cursor:pointer;text-decoration:underline;}','linky');
//initialize
addQuoteLinks();