// ==UserScript==
// @name 	Keep Tube: Download Youtube Videos, Dailymotion, Megavideo, Metacafe, Google, Yahoo, Spike, Myspace, Facebook, Veoh, Break, Current, Redtube videos and more!
// @namespace 	http://userscripts.org/users/47636
// @description Download Youtube Videos (HD/HQ MP4, MP3, FLV, 3GP) and convert them to MP3, Dailymotion (HQ MP4, FLV), Megavideo (HD/HQ FLV) Google (HQ MP4, FLV), Yahoo (HQ MP4, FLV) Break (HQ MP4, FLV), Metacafe, Spike, Myspace, Facebook, Veoh, Current, Redtube and more! Check out http://keep-tube.com/supported-websites.php for more info.
// @version     2.8
// @date 	2012-05-25
// @creator 	webmaster@keep-tube.com
// @include	http://youtube.com/*v=*
// @include	http://www.youtube.com/*v=*
// @include	http://video.google.*docid=*
// @include	http://video.yahoo.*v=*
// @include	http://dailymotion.*video*
// @include	http://www.dailymotion.*video*
// @include	http://metacafe.*watch*
// @include	http://www.metacafe.*watch*
// @include	http://veoh.*videos*
// @include	http://www.veoh.*videos*
// @include	http://vids.myspace.com/*VideoID=*
// @include	http://megavideo.com/*v=*
// @include	http://www.megavideo.com/*v=*
// @include	http://megaporn.com/video/*v=*
// @include	http://www.megaporn.com/video/*v=*
// @include	http://vimeo.com/*
// @include	https://vimeo.com/*
// @include	http://www.vimeo.com/*
// @include	https://www.vimeo.com/*
// @include	http://facebook.com/*video*
// @include	http://www.facebook.com/*video*
// @include	https://facebook.com/*video*
// @include	https://www.facebook.com/*video*
// @include	http://spike.com/*video*
// @include	http://www.spike.com/*video*
// @include	http://current.com/*
// @include	http://www.current.com/*
// @include	http://www.collegehumor.com/video/*
// @include	http://break.com/*
// @include	http://www.break.com/*
// @include	http://www.ireport.com/docs/*
// @include	http://ireport.com/docs/*
// @include	http://www.irannegah.com/Video*
// @include	http://irannegah.com/Video*
// @include	http://redtube.com/*
// @include	http://www.redtube.com/*
// @include	http://youporn.com/*watch*
// @include	http://www.youporn.com/*watch*
// @include	http://youporngay.com/*watch*
// @include	http://www.youporngay.com/*watch*
// @include	http://pornhub.com/*video*
// @include	http://www.pornhub.com/*video*
// @include	http://spankwire.com/*video*
// @include	http://www.spankwire.com/*video*
// @include	http://pornotube.com/*media*
// @include	http://www.pornotube.com/*media*
// @include	http://pornotube.com/*m=*
// @include	http://www.pornotube.com/*m=*
// @include	http://youjizz.com/*videos*
// @include	http://www.youjizz.com/*videos*
// @include	http://jizzhut.com/*videos*
// @include	http://www.jizzhut.com/*videos*
// @include	http://xvideos.com/*video*
// @include	http://www.xvideos.com/*video*
// @include	http://www.keezmovies.com/*
// @include	http://keezmovies.com/*
// @include	http://www.tube8.com/*
// @include	http://tube8.com/*
// @include	http://www.xhamster.com/*
// @include	http://xhamster.com/*
// @exclude	http://www.xhamster.com/
// @exclude	http://xhamster.com/
// @exclude	http://tube8.com/
// @exclude	http://www.tube8.com/
// @exclude	http://keezmovies.com/
// @exclude	http://www.keezmovies.com/
// @exclude	http://break.com/
// @exclude	http://www.break.com/
// @exclude	http://www.facebook.com/
// @exclude	http://facebook.com/
// @exclude	https://www.facebook.com/
// @exclude	*facebook.com/plugins/*
// @exclude	https://facebook.com/
// @exclude	http://current.com/
// @exclude	http://www.collegehumor.com/
// @exclude	http://www.current.com/
// @exclude	http://vimeo.com/
// @exclude	http://www.vimeo.com/
// @exclude	http://redtube.com
// @exclude	http://www.redtube.com/
// @exclude	http://keep-tube.com/*
// @exclude	http://www.keep-tube.com/*
// @exclude	http://*googleads*
// @homepage	http://keep-tube.com
// ==/UserScript==



var local_version = '2.8';

var youtubeTitleLink = 1;	// Replace 1 to 0 in order to hide the download link near the title of youtube videos.

var vars = {};

var keepTubeIcon = 'data:image/gif;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjyb/zQxsf8xLrP/Mi+3/ysnuP8sKLr/LSm7/y0qu/8rKLr/Kye5/zMvuf8yL7X/MC2w/0ZEtf8AAAAAPT2L/yoo3f8qKN3/Kijd/yoo3f8qKN3/Kijd/yoo3f8qKN3/Kijd/yoo3f8qKN3/Kijd/yoo3f8tK9b/aWjP/zMzp/8iItn/////sEFB1f+lpev/5+f6/6Wl6/9qavD/5+f6/+fn+v+lpev/Vlbl/8fG8f/n5/r/5+f6/01M2v84OLz/Jyfg/////7lPT9//8PD7/2Bg6v/n5/r/T0/f/+fn+v9fXun/5+f6/2pq8P/n5/r/UVHn/15e6v9NTN//Pz/L/y4t6P////+5U1Pl//Hx/P9kZO3/5+f7/1NT5f/n5/r/YWDs/+fn+v9qavD/5+f6/7+/8//n5/r/T07m/0JBz/80MvH/////uVpZ7f/09P3/Z2fv/+rq/P9aWe3/5+f6/+fn+v+lpev/YWDt/+fn+v/n5/r/v7/2/1NU7f8/P8T/OTn2/////7lISO3/amrw/11d7v9qavD/SEjt/+fn+v9dXe7/YWHu/zo67P9lZe//mpzz/1Ja7v9nb/P/Pj6u/////8z////v/Pz+/y4u7f86Ou7/Li3t/0pK7f/n5/r/SEjt/ysr7v9AQvD/P0Xw/0RQ8f9ecfX/lqH1/4ODpf9GRvf/Q0Pv/0JC7P9CQuz/PT3u/z097v89Pe7/P0Ds/0FC7v9ESfD/TVjx/15v9P97j/f/l6b7/9rc9/8AAAAAs7PL/7S07/+mpvT/m5v1/5iY9v+YmPb/mZn2/5iY9v+Zmfb/nJ/3/6Wp9v+ztvX/yMrz/9DR4/8AAAAAAJQS/wCUEjEAlBLwAJQSkwCUEv8AlBL+AJQS4gCUElkAlBL+AJQS/gCUEuUAlBJZAJQS6gCUEn4AAAAAAAAAAACUEv8AlBK1AJQS/ACUElkAlBL/AJQSnGrAdETU7dcOAJQS+gCUEpFqwHRA1O3XDgCUEvgAlBKUKqU5KAAAAAAAlBL/AJQS9ACUEpAAAAAAAJQS/wCUEvAGlhjlVLdgOwCUEvkAlBLwBpYY4lS3YDsAlBL/AJQS7ACUEtsZnil/AJQS/wCUEv8AlBKHAAAAAACUEv8AlBLWEZshxn/JiCwAlBL7AJQS0h6gLqh/yYgsAJQS/wCUEjEAlBKoAJQS3ACUEv8AlBK5AJQS7ACUElkAlBL/AJQSpVS3YFKp268dAJQS/wCUEqVUt2BSqduvHQCUEv8AlBIxAJQSkwCUEtwAlBL/AJQSWQCUEv8AlBKTAJQS/wCUEvMAlBLSAJQSWQCUEv8AlBLzAJQS2wCUElkAlBL/AJQS/wCUEv8AlBIxgAGsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBgAGsQQADrEEAAaxBEACsQRAArEEAAKxBAACsQQ==';

var url = encodeURIComponent(document.URL);

var dl_url = 'http://keep-tube.com/?url='+url;



checkForUpdate(false);

if (url.indexOf('megavideo.com')!=-1 || url.indexOf('megaporn.com')!=-1){
//	getMegaVars();
}

addDownloadBox();
if (url.indexOf('youtube.com')!=-1 && youtubeTitleLink){
	addDownloadLink();
}


// Update Checking
function checkForUpdate(a) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	var lastCheck = GM_getValue('lastCheck');

	if (a || !lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://userscripts.org/scripts/source/47636.meta.js',
			onload: function(results) {
			var global_version = results.responseText.match(/version[ ]*([0-9.]+)/i)[1];
				if (global_version.length && global_version != local_version) {
					if (confirm('[ Greasemonkey ] Keep Tube : Version '+ global_version +' is now available. Update?')) {
						GM_openInTab('http://userscripts.org/scripts/show/47636');
					}
				}
				else if (a) {
					alert('[ Greasemonkey ] Keep Tube : No new version found.');
				}
			},
		});
	}
	GM_setValue('lastCheck',today);
}

// Megavideo
function getMegaVars() {
	var scripts = document.getElementsByTagName("script");
	for (var i = 0, len = scripts.length; i < len; i++) {
		var str = scripts[i].innerHTML;
		if (str.match(/\svar flashvars/)) {
			extractVars(str);
			dl_url = dl_url + '&megavars='+ vars.v +'.'+ vars.s +'.'+ vars.un +'.'+ vars.k1 +'.'+ vars.k2 +'.'+ vars.hd_s +'.'+ vars.hd_un +'.'+ vars.hd_k1 +'.'+ vars.hd_k2;
			break;
		}
	}
	function extractVars(str) {
		vars.hd_s=vars.hd_un=vars.hd_k1=vars.hd_k2='';
		vars.v 		= str.match(/flashvars\.v = \"(.*)\";\n/)[1];
		vars.s 		= str.match(/flashvars\.s = \"(.*)\";\n/)[1];
		vars.un 	= str.match(/flashvars\.un = \"(.*)\";\n/)[1];
		vars.k1 	= str.match(/flashvars\.k1 = \"(.*)\";\n/)[1];
		vars.k2 	= str.match(/flashvars\.k2 = \"(.*)\";\n/)[1];
		if (str.indexOf('flashvars.hd_s')!=-1){
			vars.hd_s 	= '' || (str.match(/flashvars\.hd_s = \"(.*)\";\n/)[1]);
			vars.hd_un 	= str.match(/flashvars\.hd_un = \"(.*)\";\n/)[1];
			vars.hd_k1 	= str.match(/flashvars\.hd_k1 = \"(.*)\";\n/)[1];
			vars.hd_k2 	= str.match(/flashvars\.hd_k2 = \"(.*)\";\n/)[1];
		}
	}
}

// Add just a download link
function addDownloadLink(){
    var link =' [ <a href="' + dl_url + '" title="Download with Keep Tube!"><img src="' + keepTubeIcon + '" alt="" valign="middle"/></a> ]';
	var title = document.getElementById("watch-headline-title").innerHTML.replace("</h1>",link+"</h1>");
	document.getElementById("watch-headline-title").innerHTML = title;
}


// Add download box
function addDownloadBox() {


	// Dynamically choose where the box should be
	var loc = GM_getValue("btn_loc");
	console.log(loc);

	var loc_style = '#keepTubeBox {position: fixed; right: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}';

	if(loc == "top_right") {
		loc_style = '#keepTubeBox {position: fixed; right: 5px; top: 5px; z-index: 1000;opacity: 0.8;}';
	}

	if(loc == "top_left") {
		loc_style = '#keepTubeBox {position: fixed; left: 5px; top: 5px; z-index: 1000;opacity: 0.8;}';
	}

	if(loc == "bottom_right") {
		loc_style = '#keepTubeBox {position: fixed; right: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}';
	}

	if(loc == "bottom_left") {
		loc_style = '#keepTubeBox {position: fixed; left: 5px; bottom: 5px; z-index: 1000;opacity: 0.8;}';
	}


	var styles = [
		loc_style,
		'#keepTubeBox a {font-size:11px;font-family:Verdana;font-weight:bold;color:#008C00 !important;text-align:center;outline:none;background-color: #DFF1FD;border:1px solid #B6D9EE;padding:4px;display:block;text-decoration:none;}',
		'#keepTubeBox a:hover {border:1px solid #AE150E;background-color:#CE1A10;color:#FFFFFF !important;text-decoration:none;}',
		'#keepTubeBox img, #keepTubeBox a:hover img {background:none;margin:0px;padding:0px;border:none;vertical-align:middle}'
	];

	GM_addStyle(styles.join("\r\n"));

	// Add the download box
	var downloadBox = document.createElement('div');
	document.body.appendChild(downloadBox);

	// Handle mouse over and mouse out
	downloadBox.addEventListener("mouseover", showPrefBoxAnchor,false);
	downloadBox.addEventListener("mouseout", function() { setTimeout(function() { hidePrefBoxAnchor(); }, 3000) },false);

	downloadBox.id = 'keepTubeBox';
	downloadBox.innerHTML = '<a title="Download" target="_blank" href="' + dl_url + '"><img src="' + keepTubeIcon + '" width="16" height="16" /> Download</a>  ';


	addPrefBoxAnchor();
	hidePrefBoxAnchor();

}

// Preference Button

function addPrefBoxAnchor() {
	var prefBoxAnchor = document.createElement("a");
	prefBoxAnchor.id = "pref_box_anchor";
	prefBoxAnchor.addEventListener("click", showPrefBox, false);
	prefBoxAnchor.innerHTML = "Preference";
	var downloadBox = document.getElementById('keepTubeBox');
	downloadBox.appendChild(prefBoxAnchor);
}


function showPrefBoxAnchor() {
	var element = document.getElementById("pref_box_anchor");
	element.setAttribute("style","visibility: visible");
}

function hidePrefBoxAnchor() {
	var element = document.getElementById("pref_box_anchor");
	element.setAttribute("style","visibility: hidden");
}



// Show the preference box with options

function showPrefBox() {

	var prefBox = document.createElement('div');
	prefBox.id = "pref_box";


	var top_right = document.createElement('a');
	top_right.data = "top_right"
	top_right.addEventListener("click", updatePref,false);
	top_right.innerHTML = "Top Right";
	prefBox.appendChild(top_right);

	var bottom_right = document.createElement('a');
	bottom_right.data = "bottom_right"
	bottom_right.addEventListener("click", updatePref,false);
	bottom_right.innerHTML = "Bottom Right";
	prefBox.appendChild(bottom_right);


	var top_left = document.createElement('a');
	top_left.data = "top_left"
	top_left.addEventListener("click", updatePref,false);
	top_left.innerHTML = "Top Left";
	prefBox.appendChild(top_left);

	var bottom_left = document.createElement('a');
	bottom_left.data = "bottom_left"
	bottom_left.addEventListener("click", updatePref,false);
	bottom_left.innerHTML = "Bottom Left";
	prefBox.appendChild(bottom_left);

	var mainBox = document.getElementById("keepTubeBox");
	mainBox.appendChild(prefBox);


}

// Handle the update
function updatePref() {
	GM_setValue("btn_loc",this.data);
	alert("Location updated!");
	var element = document.getElementById("pref_box");
	element.parentNode.removeChild(element);

}





