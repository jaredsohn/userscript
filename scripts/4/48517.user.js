//
// 07.05.2009
//

// ==UserScript==
// @name  		Vkontakte Hidden Photo View [beta]
// @namespace 	http://userscripts.org/users/chez
// @description   Opens photos from tagged-page in inline popup
// @include   	*vkontakte.ru/photos.php?act=user&id=*

// ==/UserScript==



function prepareOnclick(owner_id, user_id, photo_id, offset, big_w, big_h) {
	var pos_l = Math.floor((window.innerWidth / 2) - (big_w / 2));
	var pos_t = Math.floor((window.innerHeight / 2) - (big_h / 2));
	
	var onclick = '';
	onclick += 'var zoom = document.createElement(\'div\');';
	onclick += 'zoom.setAttribute(\'id\', \''+ photo_id +'\');';
	onclick += 'zoom.setAttribute(\'style\', \'position:absolute;top:'+ pos_t +'px;left:'+ pos_l +'px;background-color:#dddddd;border:#c0c0c0 1px solid;cursor:pointer;width:'+ (big_w + 60) +'px;height:'+ (big_h + 30) +'px;\');';
	onclick += 'frame = document.createElement(\'iframe\');';
	onclick += 'frame.setAttribute(\'src\', \'http://pda.vkontakte.ru/taggedphotos'+ user_id +'?added=&st='+ offset +'&size=x#'+ owner_id +'_'+ user_id +'_'+ photo_id +'\');';
	onclick += 'frame.setAttribute(\'style\', \"float:left;margin:-40px 0 0 5px;width:'+ (big_w + 20) +'px;height:'+ (big_h + 20) +'px;border:none;cursor:pointer;\");';
	onclick += 'frame.setAttribute(\'scrolling\', \"none\");';
	onclick += 'var close = document.createElement(\'a\');';
	onclick += 'close.setAttribute(\'href\', \'#\');';
	onclick += 'close.setAttribute(\'style\', \'float:right;margin:10px;font-size:20px;color:red;\');';
	onclick += 'close.innerHTML = \'<img src="http://www.ericmmartin.com/simplemodal/img/basic/x.png"/>\';';
	onclick += 'close.setAttribute(\'onclick\', \'document.getElementsByTagName("body")[0].removeChild(document.getElementById("'+ photo_id +'"));return(false);\');';
	onclick += 'zoom.appendChild(close);';
	onclick += 'zoom.appendChild(frame);';
	onclick += 'document.getElementsByTagName(\'body\')[0].appendChild(zoom);';
	onclick += 'zoom.style.top = parseInt(zoom.style.top) + parseInt(window.pageYOffset) +"px";';
	onclick += 'return(false);';
	
	return onclick;
}

function addOnclick(a_obj, img_obj, owner_id, photo_id, stat_obj) {
	if (img_obj.width == 0) {
		setTimeout('addOnclick(a_obj, img_obj, owner_id, user_id)', 100);
		return(false);
	}
	
	if (img_obj.width > img.height) {
		var big_w = Math.floor(max_w * (img_obj.width / min)) + 10;
		var big_h = Math.floor(max_w * (img_obj.width / min) * (img_obj.height / img_obj.width));
	} else if (img_obj.width < img_obj.height) {
		var big_h = max_h + 10;
		var big_w = Math.floor((big_h / min) * img_obj.width);
	} else {
		var big_w = max_h;
		var big_h = max_h;
	}
	
	var onclick = prepareOnclick(owner_id, user_id, photo_id, offset, big_w, big_h);
	
	a_obj.setAttribute('href', '#');
	a_obj.setAttribute('onclick', onclick);
	console.log('Photo '+photo_id+' - ok!');
	a_obj.removeChild(stat_obj);
}

var tmp = window.location.href.split('=');
var user_id = tmp[(tmp.length - 1)];
var user_id = user_id.split('#')[0];

var links = document.getElementsByTagName('a');
var links_size = links.length;
	
var cnt = -1;
var offset = 0;

var max_w = 604;
var max_h = 480;
var min = 130;

for (var i = 0; i < links_size; i++) {
	var tmp = links[i].href.split('act=show');
	if (tmp.length == 2) {
		cnt += 1;
		if (cnt > 0 && ((cnt - offset) == 8 ||(cnt == 8))) offset += 8;
		var tmp1 = tmp[1].split('&');
		var tmp1 = tmp1[1].split('=');
		var tmp1 = tmp1[1].split('_');

		var photo_id = tmp1[1];
		var owner_id = tmp1[0];
		
		var img = links[i].getElementsByTagName('img')[0];
		
		if (links[i].href) {
			var stat_inf = document.createElement('a');
			//stat_inf.setAttribute('id', 'st_'+photo_id);
			stat_inf.innerHTML = 'Not ready';
			links[i].appendChild(stat_inf);
			console.log('addOnclick - ' + (typeof(addOnclick) == 'function' ? 'ready!' : 'failed!'));
			if (typeof(addOnclick) != 'function') {
				document.location.href=document.location.href+"&r="+Math.rand();
			} else {
				addOnclick(links[i], img, owner_id, photo_id, stat_inf);
			}
		}
	}
}