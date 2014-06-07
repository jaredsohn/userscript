// ==UserScript==
// @name           Daily Show Big Flash Video Player
// @namespace      http://fatknowledge.blogspot.com
// @description    Adds a Big Flash Viewer to Daily Show & Colbert Report Video Pages
// @include        http://www.comedycentral.com/shows/the_daily_show/videos/*
// @include        http://www.comedycentral.com/shows/the_colbert_report/videos/*
// ==/UserScript==

//GM_log('Daily Show Big Flash Video Player');	

video_option_nodes = get_video_option_nodes();

//default video to show is the first video option
var default_vid = get_vid_from_onclick(video_option_nodes[0].getAttribute('onClick'));
insert_flash_player(default_vid);

add_change_video_listeners(video_option_nodes);


//////////////////////////
// helper functions
/////////////////////////

//get all the video option nodes (div with class='m1_holder) and store them in an array
function get_video_option_nodes(){
	var iterator = document.evaluate("//div[@class='m1_holder']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
	var nodes = new Array();
	var i =0;
	try {
	  var thisNode = iterator.iterateNext();
	  
	  while (thisNode) {
		//GM_log( thisNode.getAttribute('onClick'));
		nodes[i] = thisNode;
		i++;
		thisNode = iterator.iterateNext();
	  }	

	} catch (e) {
	  GM_log( 'Error: Document tree modified during iteraton ' + e );
	}
	return nodes;
}

//get video id from something that looks like this:
//launchMedia({itemId:'85765',ml_collection:'',ml_context:'show',allowMotherload:'false',ml_gateway:'',ml_comedian:'none',linkType:'video'})
function get_vid_from_onclick(onclick){
	var vid_start = onclick.indexOf("itemId:'")+8;
	var vid_stop = onclick.indexOf('\'',vid_start);
	return onclick.substring(vid_start,vid_stop);
}

//add event listeners to the video option nodes to change the video in the flash viewer when clicked
function add_change_video_listeners(nodes){
	for (x in nodes){
		var vid = get_vid_from_onclick(nodes[x].getAttribute('onClick'));
		nodes[x].setAttribute('id',"vid_"+vid);
		nodes[x].addEventListener('click', change_video_listener, true);
	}
}

//change the video in the flash viewer
function change_video_listener(event) {
//	GM_log("change_video_listener: "+event.currentTarget.id );
	
	// if not a video option node, return (you shouldn't get here since the listener is just on these objects)
	if (event.currentTarget.id.substring(0,4) != 'vid_') return;

	var vid = event.currentTarget.id.substring(4);

	var flash_div = document.getElementById('flash_div');
	var new_flash_div = document.createElement("div");
	new_flash_div.innerHTML = "<embed FlashVars='videoId="+vid+"' src='http://www.comedycentral.com/sitewide/video_player/view/default/swf.jhtml' quality='high' bgcolor='#cccccc' width='340' height='316' name='comedy_central_player' align='middle' allowScriptAccess='always' allownetworking='external' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>";

		//"<embed FlashVars='config=http://www.comedycentral.com/motherload/xml/data_synd.jhtml?vid="+vid+"%26myspace=false' src='http://www.comedycentral.com/motherload/syndicated_player/index.jhtml' quality='high' bgcolor='#006699' width='340' height='325' name='comedy_player' align='middle' allowScriptAccess='always' allownetworking='external' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>";
	new_flash_div.setAttribute('id','flash_div');


	flash_div.parentNode.replaceChild(new_flash_div,flash_div);

	// prevent the default click action
    event.stopPropagation();
    event.preventDefault();
}


//replace the advertisement with a flash player with the video id specified
function insert_flash_player(vid){
	main_div = document.getElementById("ad_300x250");
	advertisement_div = main_div.getElementsByTagName("div")[0]; 

	var flash_div = document.createElement("div");
	flash_div.innerHTML = "<embed FlashVars='videoId="+vid+"' src='http://www.comedycentral.com/sitewide/video_player/view/default/swf.jhtml' quality='high' bgcolor='#cccccc' width='340' height='316' name='comedy_central_player' align='middle' allowScriptAccess='always' allownetworking='external' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>";
		
	//"<embed FlashVars='config=http://www.comedycentral.com/motherload/xml/data_synd.jhtml?vid="+vid+"%26myspace=false' src='http://www.comedycentral.com/motherload/syndicated_player/index.jhtml' quality='high' bgcolor='#006699' width='340' height='325' name='comedy_player' align='middle' allowScriptAccess='always' allownetworking='external' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer'></embed>";
	flash_div.setAttribute('id','flash_div');

	main_div.replaceChild(flash_div, advertisement_div);
}






///////////////////////////////
// Old Code
////////////////////////////////

//var page_url = window.content.location.href;
//get_vid(page_url,video_nodes[0]);

//old version of this func
//create a new onclick function that reloads page with new url that includes the video id to play
function new_onclick_old(nodes, page_url){
	for (x in nodes){
		base_url = get_base_url(page_url);
		start = get_start(page_url);
		var vid = get_vid_from_onclick(nodes[x].getAttribute('onClick'));
		new_url = get_new_url(base_url,vid,start);
		nodes[x].setAttribute('onClick','parent.location="'+new_url+'"');
		
//	    GM_log( nodes[x].getAttribute('onClick'));
	}
}


//remove any arguments on the URL
function get_base_url(page_url){
	if (-1!= page_url.indexOf('?')){
		return page_url.substring(0,page_url.indexOf('?'));
	}
	return page_url;
}

//create the new url to launch the correct video in the flash player and keep you on the right page
function get_new_url(base_url, vid, start){
	new_url = base_url + "?vid="+vid;
	if (start!=0) new_url=new_url+"&start="+start;
	return new_url;
}

//if you are on a secondary page, get the start number
function get_start(text){
	start=0;
	if (-1!= text.indexOf('start=')){
		start_start = text.indexOf('start=')+6;
		start_end = text.indexOf('&',start_start);
		if (start_end==-1) start_end = text.length;
		start = text.substring(start_start,start_end);
	}
	return start;
}

//get the video id of the video to play from URL
//if not there use the id of the first video node
function get_vid(page_url, first_video_node){
	var vid_start = page_url.indexOf('vid=');
	if (vid_start!=-1){
		vid_end = page_url.indexOf('&',vid_start+4);
		if (vid_end==-1) vid_end = page_url.length;
		vid = page_url.substring(vid_start+4,vid_end);
	} else {
		vid= get_vid_from_onclick(first_video_node.getAttribute('onClick'));
	}
	return vid;
}
