// ==UserScript==
// @name           flickr add flickleech link
// @namespace      http://www.tweaksthelimbs.org/greasemonkey
// @description    Adds Flickrleech link to Flickr pages. Should link appropriately on individual user pages, group pages, and tags pages. Last updated 24OCT2007
// @include        http://www.flickr.com/photos/*
// @include        http://www.flickr.com/groups/*
// @include        http://flickr.com/photos/*
// @include        http://flickr.com/groups/*
// ==/UserScript==

document.getElementsByClassName = function(class_name) {
    var docList = this.all || this.getElementsByTagName('*');
    var matchArray = new Array();

    /*Create a regular expression object for class*/
    var re1 = new RegExp("\\b"+class_name+"\\b");

    /*Create regular expression to handle dashes in class name*/
    var re2 = new RegExp("[\S]"+class_name+"|"+class_name+"[\S]");

    for (var i = 0; i < docList.length; i++) {
        if (re1.test(docList[i].className) && !re2.test(docList[i].className) ) {
            matchArray[matchArray.length] = docList[i];
        }
    }
    return matchArray;
}//eof annonymous function


function writeLink(){
	var links;
	var flickrleech;
	var url;
	var r;
	var s;
	
	if(document.getElementsByClassName('Widget')[0]){
		links = document.getElementsByClassName('Widget')[0];	
		flickrleech = getNsidLink('person');
	}
	else if(document.getElementsByClassName('Links')[0]){
		links = document.getElementsByClassName('Links')[0];
		url = document.location.href;
		r = /groups/gi;
		s = url.search(r);
		if(s == -1){
			flickrleech = getNsidLink('person');
		}
		else{
			flickrleech = getNsidLink('group');
		}
	}
	else if(document.getElementsByClassName('SlideShow nowrap')[0]){
		links = document.getElementsByClassName('SlideShow nowrap')[0];
		flickrleech = getTagLink();	
	}	

	var mylink = document.createElement('a');
	mylink.setAttribute('href',flickrleech);
	mylink.innerHTML = 'Flickrleech';
	var spacer = document.createElement('img');
	spacer.setAttribute('src','http://l.yimg.com/www.flickr.com/images/subnavi_dots.gif');
	spacer.setAttribute('width','1');
	spacer.setAttribute('height','11');
	spacer.setAttribute('alt','');
	links.appendChild(spacer);
	links.appendChild(mylink);
}

function getNsidLink(type){
	var nsids = document.getElementsByClassName('menu_item_line_above');
	for(i=0;i<nsids.length;i++){
		if(nsids[i].getAttribute('href') == '/search/'){
			var nsid = nsids[i].getAttribute('onclick').split('\'')[1];
			break;
		}
	}
	if(type=='person'){
		return 'http://www.flickrleech.net/nsid/'+nsid;
	} else{
		return 'http://www.flickrleech.net/group/'+nsid;
	}
}

function getTagLink(){
	var flickrleech;
	var tag = document.location.href.split('\/')[5];
	flickrleech = 'http://www.flickrleech.net/?tags='+tag;
	return flickrleech;
}

writeLink();