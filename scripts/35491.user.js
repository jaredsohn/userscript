// ==UserScript==
// @name           deviantART sayWhat?
// @author		   Djordje Ungar <artbit@deviantart.com>
// @namespace      artbit.deviantart.com
// @description    Automatic language translator for deviantART comments
// @include        *.deviantart.com/*
// @exclude        chat.deviantart.com/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

(function($) {
	
var SCRIPT_NAME    = "deviantART sayWhat?";
var SCRIPT_VERSION = "0.25";
var SCRIPT_DECRIPTION = "A greaseMonkey script that adds the automatic language translation ability to deviantART comments";

var image_blahblah = "data:image/gif;base64,R0lGODlhMAA8AMZPAC8xLjI6NjpCPj1FQUBIREJKRkBPSkZOSkJRS0lRTUtUUEdWUVBYVFNcV1ZcU1pnYV9rYGJrZmlvZWZzZ2t0b2d2cG91a2l3bG93c3F+c3GBe3OBe3iFeXaGgHuIfXqLhH+MgHuPgoKQhICQin6ShYyPgIeRgI2TiYeViYWVj4KXiYeXkYyXhoWZjImZk4yZjoecjpCbioidj4uclZCdkoufko2el5SejY6fmJOglZagj5Silo+kl5iikZOjnZelmZimmpynlZeoopypnZCtnqGrmp2tp6OunJ2wnJ+vqaKxmKWzpqm3q6e4sa6/uf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/idDcmVhdGVkIHdpdGggR0lNUApBdXRob3I6IERqb3JkamUgVW5nYXIAIfkEAR4AfwAsAAAAADAAPAAAB/6Af4J/I4WGh4iJiouHg4OFPk6Sk5SVlpeYkj6Fj5FNTUyhokwNpaWjqKmqoZ9Om4IjTUmzRrW1CgpHR0U/Obi2wMHCwLNJTSOEOEtDzM1DCkpKukE9NzcsCs7MPyIeHCBA293f2ks4hUlGQuvsCkjvRUXUNDQvJwrsQj4RBAEBBBj08fMHMJ+RJIXU5VunIF6RhkEU0FBgDx87HAoqdKhAYIAQjBQ6UOi40EihIUBSqkzgMF6CBNVuvDyRQOWPFztSJiAA5GZOIAkKqEw5pJCQH0iTwuzBtKkOayxO0ExK1cOACVR/WLWQVYjRrD8S6BhLdixUqQnAciDQIAfVtf4NdnQtBGSH3bsJYsR4mVev3qg07+7IkWFAAxp3CQtwgFhwzkK9ckiWnIAFC76YX5YokWByDhQEGLzwLIKAg9GeJf+ATK81vQMmDsiePbvEAdc0OACQgDvDbtytV4/gUaO48RoITJhAwLx58uXHa5C4ECL69OrRi/MolCJ78efMiYhPjiB6CwgQWhw/n957jRQjEMqYT5++AQMg8ue/X3++igAItFAf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";
var image_blahblah2 = "data:image/gif;base64,R0lGODlhMAA8AOexAENFQkhLPkZMQ05QTUxUQFBWPFRWU1NcV1pcWVpiXlhlWmJkYV5nY2FnXmRoWWhnX2JrZmxsZWlvZWdva2tzTGt1U2t0b3F2W291a3J0cW93YW93c255aHZ5anR+W318dHV+enh+dHuAcH2EboSHeICJhIKLhoKNfIaMgomTjo+Yk5GegJCdko2el5WemaCfl5OjnZ+jk5eooqSpjZ+ppJStpaSqoKmsnJixqZ+vqaiupKiyjpu1oJy0rKuyp6S1rp+3r6S4mKu1sLC2ma+1q6m3q664s6+4s7S4qKO8s6y+i7O5r7K7o7a7nru8pqjAuLa9sq6/ubS/razCtK/Em7u/rrXCo7TEqq7GvrvErLnEsrfFubPIurjIrrbItMTFr8LGtsDGvLTNpMHJsbDNvb/JxMHMusTLwL7NwMjMu7bTsMbOtb3Ssb/ZbsXQvsLRxL3afMvUqMXTx8jSzMzUvMDYvMTVzsvWxMrYy8jgic3autHZwc3csMzbzs3fpM/byM7c0M3imdDik9Lc19Te2NPitdHmndbg28/rhdfi0NfkxNvi19bprdjoutrk397mztfvl9no2+Dm293sq9nupOTo1+Dtud/p5N/szOLtx+Lt2+Ls5+Hxw+bt4uPx0OL0uOXv6ujw2Ojv5Of01Or3wu323ev7uO340u345fX56PH+yvP84/T77/P+1/b+0fj+3/r+7P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/idDcmVhdGVkIHdpdGggR0lNUApBdXRob3I6IERqb3JkamUgVW5nYXIAIfkEAR4A/wAsAAAAADAAPAAACP4A/wn896SgwYMIEypceHDgwIJvREmcSLGixYsYJb4p+BCNpk4g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";
var image_google = "http://www.google.com/uds/css/small-logo.png";

GM_addStyle('a.btnTranslate2, a.btnTranslate { background:url('+image_blahblah2+') 0px 0px no-repeat; display:block; width:48px; height:20px; position:absolute; left:4px; bottom:30px; text-decoration:none !important;} a.btnTranslate:hover { background-position: 0px -20px;} a.btnTranslate2 {background:url('+image_blahblah2+') 0px 0px no-repeat;} a.btnTranslate2:hover {background-position: 0px -20px} .busy {background-position: 0px -40px !important;} .powbygoogle {background: url('+image_google+') right top no-repeat; padding-right:55px; height:15px; font-size:8px; text-align:right;} #artist-comments .powbygoogle {width:45px;} div.ccomment div.ch-ctrl div.ch-ctrl {min-height:100px} #artist-comments a.btnTranslate2 {position: static; bottom: auto; margin-top: 10px}');


translateThis = function(txt,callback) {
 GM_xmlhttpRequest({
   method:"GET",
   url:"http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&langpair=%7Cen&format=html&q="+encodeURIComponent(txt),
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"text/xml",
	 "charset":"UTF-8"
   },
   onload:function(response) {
		if (response['status']==200) callback(response);
   }
 });
}

updateTarget = function($tgt,r,$el) {
	var o = eval('('+decodeURIComponent(r)+')');
	var txt = "<div class='powbygoogle'>powered by </div>"+unescape(o["responseData"]["translatedText"]);
	$tgt.fadeOut(500, function() {$(this).clone().addClass("transclone").html(txt).insertAfter(this).fadeIn(500, function() {setBusy($el,false)})});
}
setBusy = function($el, isbusy) {
	if (isbusy) {
		$el.addClass("busy");
	} else {
		$el.removeClass("busy");
	}
}
translateTarget = function(el) {
	var $el = $(el);
	if ($el.hasClass("busy")) {
		return;
	}
	setBusy($el,true);
	var $tgt = jQuery(el.getAttribute("rel"));
	if ($tgt.length>1) {
		$tgt.eq(1).fadeOut(500,function() {$(this).hide(); $(this).prev().fadeIn(500, function() {setBusy($el,false);}); $(this).remove();});
		$el.attr("title","Translate to English");
	} else {
		translateThis($tgt.html(),function(r) {updateTarget($tgt,r.responseText,$el); });
		$el.attr("title","Show original comment");
	}
}

clickHandler = function(event) { 
	translateTarget.apply(this,[event.target]); 
	event.preventDefault();
	return false;
}
	
$(document).ready(function() {
	var url = window.location.toString();
	var class = "btnTranslate";
	if (url.indexOf("comments.deviantart.com")!=-1 
		|| url.indexOf("forum.deviantart.com")!=-1
		|| url.indexOf("news.deviantart.com")!=-1
		|| url.indexOf("my.deviantart.com/notes")!=-1
		|| url.indexOf("com/art/")!=-1) {
		class = "btnTranslate2";
	}
	var newSayWhatButton = function(query) {
		return $("<a>")
			.attr("title","Translate to Endlish")
			.attr("rel",query)
			.addClass(class +" sayWhat")
	}
	
	var query = ".ccomment .ch-ctrl a.reply";
	$(query).each(function() {
		var $span = $(this).parent();
		var query = "div[gmi-commentid='"+$span.parent().attr("gmi-commentid") +"'] div.text";
		$span.prepend(newSayWhatButton(query));
	});

	query = "#artist-comments div.block";
	newSayWhatButton(query).insertAfter(query);

	query = "#notes div.item div.item-body p";
	$("#notes div.item div.item-body").prepend(newSayWhatButton(query));
	
	$("a.sayWhat").live("click",clickHandler)

})

})(jQuery);
