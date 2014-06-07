// ==UserScript==
// @name           ZooomrRater InfoWidget
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Rate your own photos
// @include        http://*.zooomr.com/photos/*/*/
// ==/UserScript==
(function() {

var WIDGET_NAMESPACE = 'rating';
var WIDGET_PROPERTY = 'stars';

var $ = unsafeWindow.$;
var infotags = unsafeWindow.infotags;
var _INFO_TAGS = unsafeWindow._INFO_TAGS;
var infotag_widgets_init = unsafeWindow.infotag_widgets_init;
var infotag_widgets_add = unsafeWindow.infotag_widgets_add;
var infotag_widgets_save = unsafeWindow.infotag_widgets_save;
var infotag_widgets_remove = unsafeWindow.infotag_widgets_remove;
var infotag_widgets_edit = unsafeWindow.infotag_widgets_edit;
var infotag_widgets_save_edit = unsafeWindow.infotag_widgets_save_edit;
var ZAPI = unsafeWindow.ZAPI;
var _ZGLOBAL = unsafeWindow._ZGLOBAL;
var global_nsid = unsafeWindow.global_nsid;

var isOwner = _ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid;

var BASE64_STAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIwSURBVDjLlZLNS5RRFMafe9/3vjPOjI1jaKKEVH40tGgRBWEibfoPQoKkVdtoEQQF4T/QqkVtWrSTFrVsF1FgJbWpIAh1k2PNh+PrfL4f95zTQk0HHKkDD/cc7vP8uHCuEhF0q/KnmXNgGR248PZFN4/GISXMC8L89DBPV0Dp4/SsazJjrtfb9/vdxfn/BgjzY5M8Aq8nBya+V3h93vtnQHFxat4kszntJAAAxus1YvnZQV5V/jyTEZarwnwFLGeFZdT0ZFOJdD84qoCDOpQ7grZfRNj020JSEOKvwvxGiF+q0tL0N5PuO+Mk0nC0B0BDsYCCImyzAIktBBloMwKJLSgKYcMAcdhC2KpVlIig+H5qxcv0n0xmj4Gbq+BwC2wtJLbgHUlMEFJwUpMIGpto16u+kJzSACAk+WCzvNbe+AVljkOYIcQQou3TbvdOJo+g4aNdqzaF+PT43HJVA8DQpcVIiPPtaqlEUQzlDELsTpgYwgTAQIjQqlUCtpQfn1spdmxh+PJSQyw9CrbKgM7tvcISQAxlBhC3GuCYXk3cWP25m3M7dk88qbWBRDVApaATOSjPBdXXwYEP5QyCgvjE/kwHgInHtHYBnYA2owhrPiiuw0sOw3EZFEagIB7qChDiYaUcNIoFtP1KxCTPhWiDw7WbXk9vKpnOgsI4exjg6Mbq96YQPxm79uPOvqvbXx4O3KrF6w8osv2df17kr5YXJq7vnw/S0v3k7Ie7xtud/wAaRnP+Cw8iKQAAAABJRU5ErkJggg==";
var BASE64_STAR_GREY = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjAxHK4kRQAAAeRJREFUOE99U7tqYlEUzTSpUk2TKuQjpvY70qTJD+QLUohgI4MOgpVYaNSroBff7/cbHyi+EEKKIUUYZpg0JsNM4Z61DhgmgycXNkfP3Wvttfbe94OIHOmebrf7abfbnVssFlObRAJdtFqtu2az+fRejhYM4EW/3xdGtVq16ki0BI1G4+d0OpXZbCalUulPsVg8PkRykKBer1sHg4HM53NFADWSy+WMgwRo1Emn07mCXwOJa4Cf9+DxeCx4L6PRSCqViqRSqZdEInEXj8fNWCx2HY1Gz47a7fZyMpnIYrGQ9XqtYrVaCe9AKrVaTUAqvV5P/Uc/JJ/PC4jEMIzvygL83rPKZrNRQDYOqgT3qnKhUJBMJkMFipBnOBx+CgaDHxUBLo+R+EDpy+VSyaZvJqOBks1mFYhKeIZCoS3Ap2qH9o1B4gkqfWPnh8OhApfLZSU3nU6roHyAfwUCgbM97s0UUOmGlWmDyRidkp5MJl9t+P1+899pvCFAlVt6pxUqIBmDFkjC0+v1TrUE6Gyf3aYF9oEKCKIa2uFvj8fzqCUwTfMrJ4ClkUgk8ht+b/F88fl8z+i6UuFyuV60BFiOLZZji/l+/n/r3G73tdPp/OFwOHZaAlS9fO/L4zu73X5hs9lev4u/ZIndWopQ9TwAAAAASUVORK5CYII=";
var BASE64_STAR_ORANGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjAxHK4kRQAAAjtJREFUOE99k11IU2EYx9dF0sUuQoJdyExMWayVmKYbpvblGgklBJuRKIIX0YVRFAXJZrrEclkrVy7Lj5ZNCgeV1EVX3RRBLKIYgzGoE4eOp04vjKNRUP+e8w6jxc4OPHDgvL/f8/WeVQAMes/iVHON4ZdhvanneUz3kCbQC+nm9hQFK3SmEOyRZ1zQQgw5+vUkugJx3PGNzbuRmT8E4XLdT2G0tiifJK9Ay6hlzjzq5AJpfDeEkdpoXoE83WyUJpu6qdcoRYLgJQ4/7AC7txdsogFs1g0x2IgP/qrl9OCWVNpni6W91t7UGYvZIE00vVfu7wd73A71SRfUp91QF7qQmXNBub4ZylUr5GvboEy2QQm30rsTYoBk52qQPFXxhbdA/aaVaCvUZz3IzO4Eu70VLFyVhQMWyEMbIPWX8ZDHXBD8dRrMkicqirOCkKNIHKv/JN8hCWXnsJY9uBHySCUkP8G+0ix83g4C1eTxchO/QyuDoUkbadKL7EE7WKQlm51gnn2wFNJAOS+fMn8n2LzC5WxBuFjdJ4VbwObcuaV7SyBdqIc43IDEsbLYv9vIEdCUI/ItF9jUPsjBaig3dkEOOakCG8Q+Cxe8O1LyRldAK3qpTNNG7h7kUxcv7YAwbOely6N7IA414m2n6bO+YMD2UZlp41DqdOUP6jdC/V5JHDUvpU5uguCzI+4pXtYXeK1q6qxFJTDw/62LH17XG3ev/fr6gPG3roBuVkehP0/79sq1xvPCufrvf/EHaLCUlz5Cv98AAAAASUVORK5CYII=";
var _rating = 0;

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.star-rating{ list-style:none; margin: 0px; padding:0px; width:80px; height: 16px; position: relative; background: url("' + BASE64_STAR_GREY + '") top left repeat-x;}');
addGlobalStyle('.star-rating li{ padding:0px; margin:0px; height:16px; width: 16px;        /*\*/ float: left; /* */ }');
addGlobalStyle('.star-rating li a{ display:block; width:16px; height: 16px; line-height:16px; text-decoration: none; text-indent: -9000px; z-index: 20; position: absolute; padding: 0px; overflow:hidden; }');
addGlobalStyle('.star-rating li a:hover{ background: url("' + BASE64_STAR_ORANGE + '") left center; z-index: 2; left: 0px; border:none; }');
addGlobalStyle('.star-rating a.one-star{ left: 0px; }');
addGlobalStyle('.star-rating a.one-star:hover{ width:16px; }');
addGlobalStyle('.star-rating a.two-stars{ left:16px; }');
addGlobalStyle('.star-rating a.two-stars:hover{ width: 32px; }');
addGlobalStyle('.star-rating a.three-stars{ left: 32px; }');
addGlobalStyle('.star-rating a.three-stars:hover{ width: 48px; }');
addGlobalStyle('.star-rating a.four-stars{ left: 48px; }');
addGlobalStyle('.star-rating a.four-stars:hover{ width: 64px; }');
addGlobalStyle('.star-rating a.five-stars{ left: 64px; }');
addGlobalStyle('.star-rating a.five-stars:hover{ width: 80px; }');
addGlobalStyle('.star-rating li.current-rating{ background: url("' + BASE64_STAR + '") left bottom; position: absolute; height: 16px; display: block; text-indent: -9000px; z-index: 1; }');
/* 
	Widget form 
*/
var buildInfowidgetForm = function(rating, isEdit) {
    var content = '';
    var action = (isEdit ? '1' : '0');
    if (_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid) {

		//content += '<form onchange="infotags.' + action + '(\'' + WIDGET_NAMESPACE + '\')" action="javascript:void(0)" id="it_' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_form">';
		content += '<form action="javascript:void(0)" id="it_' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_form">';
		content += '<input type="hidden" id="' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_input" name="' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_input" value="' + rating + '">';
		content += 'Rate this photo: ';
		content += "<ul class='star-rating'>";
		content += '<li><a href="javascript: starClick(1,' + action + ')" id="onestar" title="Rate this 1 star out of 5" class="one-star">1</a></li>';
		content += '<li><a href="javascript: starClick(2,' + action + ')" id="twostar" title="Rate this 2 stars out of 5" class="two-stars">2</a></li>';
		content += '<li><a href="javascript: starClick(3,' + action + ')" id="threestar" title="Rate this 3 stars out of 5" class="three-stars">3</a></li>';
		content += '<li><a href="javascript: starClick(4,' + action + ')" id="fourstar" title="Rate this 4 stars out of 5" class="four-stars">4</a></li>';
		content += '<li><a href="javascript: starClick(5,' + action + ')" id="fivestar" title="Rate this 5 stars out of 5" class="five-stars">5</a></li></ul>';
		
		content += '</form>';
	} else {
		content += '';
	}

    return content;
};

unsafeWindow.starClick = function (rating, isEdit) {
	document.getElementById(WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_input').value = rating;
	
	if (isEdit) {
		infotags.save_edit(WIDGET_NAMESPACE, WIDGET_PROPERTY);
	} else {
		infotags.save(WIDGET_NAMESPACE);
	}
};

/*
	Render widget content
*/
buildWidgetContent = function() {
	var content = '';
	for (i = 1; i <= 5; i++) {
		if (i <= _rating) {
			content += '<img src="' + BASE64_STAR + '">';
		} else {
			content += '<img src="' + BASE64_STAR_GREY + '">';
		}
	}
	displayContent(content);
}

/*
	Helper function to display info
*/
function displayContent(content) {
	var widgetNav = document.getElementById('it_' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_content');
	var widgetContent = document.getElementById('it_' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_content_custom');
	if (widgetContent == undefined) {
		widgetContent = widgetNav.appendChild(document.createElement('div'));
		widgetContent.id = 'it_' + WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_content_custom';
	}
	widgetContent.innerHTML += content;
}

/*
 * event handler when initializing rating tag widget
 */

infotag_widgets_init[WIDGET_NAMESPACE] = function (key, data) {
    var content = ''; //The Master Content of the Widget
    var icon = 'star'; // The name of the icon we want to use
    var title = 'Photo Rating'; // The Title of the InfoWIdget
    if (WIDGET_PROPERTY in data) { 
		content = infotags.build_sub(data[WIDGET_PROPERTY] , '',
                                     { title : data[ WIDGET_PROPERTY].data + ' out of 5 stars', //Title of the Node
                                       canRemove: isOwner, //Can we remove this Node?
                                       canEdit: isOwner // Can we edit this node?
                                     });
		_rating = data[ WIDGET_PROPERTY].data;
		unsafeWindow.setTimeout(buildWidgetContent, 1);
		

    } else { //No data, set defaults
        content = '';
        title = 'Rate this photo';
    }
    var titlebar = {"id" : key, // The InfoTag's class/key (mood)
                   "icon": icon, // The Icon we wish to use
                   "title" : title, // The Title we wish to use
                   'content' : content, // Our Widget's Content
                   'collapsed' : true, // Does this widget start collapsed?
                   'add_allow': !(WIDGET_PROPERTY in data)}; // Don't allow users to add anything if we already have data
    return titlebar;
};

/*
 * event handler when showing
 */
infotag_widgets_add[WIDGET_NAMESPACE] = function (key, add_container) {
    infotags.add_prep( key );
    var rating = '';
    add_container.update(buildInfowidgetForm(rating, !(rating == '')));
};

/*
 * event handler when saving
 */
infotag_widgets_save[WIDGET_NAMESPACE] = function (key, add_container) {
    var rating = $(WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_input').value;
    infotags.saving_prep(key); //show saving icon
    // define update event handler
    var success = function(t) {
        infotags.refresh_node( key );
    };
    ZAPI.callMethodJSON( 'zooomr.photos.addtags', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], tags: WIDGET_NAMESPACE + ':' + WIDGET_PROPERTY + '=' + rating}, {'onSuccess':success});
};

/* 
 * event handler when editing
*/

infotag_widgets_edit[WIDGET_NAMESPACE] = function (key, dict, add_container) {
    infotags.edit_prep( key, dict);
    var rating = '';
    
    if (_INFO_TAGS.rating && _INFO_TAGS.rating[WIDGET_PROPERTY]) {
        rating = _INFO_TAGS.rating[WIDGET_PROPERTY].data;
    } else {
        rating = '';
    }
    add_container.update(buildInfowidgetForm(rating, !(rating == '')));
};

/* 
 * event handler when saving edit
*/
infotag_widgets_save_edit[WIDGET_NAMESPACE] = function (key, dict, add_container) {
    var rating = $(WIDGET_NAMESPACE + '_' + WIDGET_PROPERTY + '_input').value;
    infotags.editing_prep(key, dict);
    var success = function(t) {
      ZAPI.callMethodJSON( 'zooomr.photos.addtags', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], tags:  WIDGET_NAMESPACE + ':' + WIDGET_PROPERTY + '=' + rating}, {'onSuccess': function() { infotags.refresh_node( key ) }});
    };
	ZAPI.callMethodJSON( 'zooomr.photos.removetag', {tag_id: _INFO_TAGS[key][WIDGET_PROPERTY]['id']}, {'onSuccess':success});	
};


//Activate ReInit
if ((_INFO_TAGS.rating && _INFO_TAGS.rating[WIDGET_PROPERTY]) 
	|| isOwner) {
	infotags.init_node(WIDGET_NAMESPACE);
}

 
})();