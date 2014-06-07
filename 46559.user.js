// ==UserScript==

// @name           Sex141 One Click Browser.
// @namespace      scarymonster
// @description    Sex141 Browser. See all the ADs from one page without drill down.
// @include        http://*sex141.com/*

// ==/UserScript==

var IMG_PER_ROW = 3
var DEBUG=false;

// Add jQuery ==========
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
GM_wait();

function GM_wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
		 main();
    }
}
// End Add JQuery ========

function main() {
    $("td.thumb_pic img").each(function(i){ //look for a thumbnail
		//create seperate rows for each columns (td)
		$(this).parents("td:eq(1)").css('border','medium solid #FFBBFF').wrap('<tr></tr>');
		//create & fetch detail url and parse for large images
		var uid = this.src.replace(/.*\.com\//,'').replace(/\/picprofile.*/, '');
		var url = "viewid.php?uid=" + uid; //create url for
		$.get(url, '' , newFunction(this)); //parse the html for images.
    })
	dbg("------DONE---------");
}

function newFunction(_thumb) {
	var thumb = _thumb;
		return function(data){
		$(thumb).removeClass();
		$(thumb).parents().removeClass();
		var detailTable = $(data).find('td.width-max table').removeClass();
		$(detailTable).find('td');
		$(detailTable).wrap('<div style="overflow: hidden; max-width: 400px"></div>');
		$(thumb).before(detailTable);
		//look for big image and add them before thumbnail.
		if (m = data.match(/http:\/\/photo.sex141.com\/\d+\/main\/\d+\.jpg/gi)) {
			for (var i=0; i<m.length; i++) {
				//dbg("match:" + m[i]);
				if(!(i%IMG_PER_ROW)){$(thumb).before("<br/>");}
				$(thumb).before(createImage(m[i])).before(' ');
			}
		}
		$(thumb).remove(); // remove thumbnail in the end.
	}
}

function createImage(url) {
	var img = new Image();
	$(img).attr('src', url).width("480").height("640").bind("load", function(event){
			img = event.target;
			$(img).width(img.naturalWidth).height(img.naturalHeight);
			//dbg("loaded:" + url + "," + img.naturalWidth + "," + img.naturalHeight);
		});
	return img;
}

function dbg(str) {
	if(DEBUG) GM_log(str);
}