// ==UserScript==
// @name	Turbofilm userjs
// @description	Turbofilm tools
// @version 0.6.7
// @author	Longer
// @require	http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @include	http://turbofilm.tv*
// ==/UserScript==
// TODO:
// Парсинг при аджаксе - http://turbofilm.tv/Watch/Fringe/Season2/Episode11

// jQuery cookie plugin
function jcookie(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);

                // Does this cookie string begin with the name we want?
                //if (cookie.substring(0, name.length + 2) == (name + '=')) { // !!!! s/\+1/+2/
				if (cookie.indexOf(name + '=') == 0) {
                    //cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					cookieValue = decodeURIComponent(cookie.substring(cookie.indexOf('=') + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
// =======

(function(){
	window.addEventListener('load', main, true);
})();


function main(){
	$("/span[class=blogpostotext], /span[class=mymespostotext], /div/div/div/div/span[id^=commtext], /div/div/div/div/[class=aboutc]").each(parse);
	/*$("/span[class=blogmenuc]").append("<span class=\"buttonc\">"
		+"<form method=\"get\" action=\"\">"
		+"Поиск: <input type=\"text\" style='font-size: 10px' size=\"20\" name=\"text\"></form></span>")*/
	$(document).click(replyExt);

	var ptitle = $("#posttitle").text();
	if (ptitle)
		ptitle = " / "+ptitle;
	document.title = "Турбофильм! - " + $(".messagestitle, .blogtitle").text() + ptitle;

	$(".sserieslistone").each(serialMark);

	var url = location.href.split("/");
	if ((url[3] == "Series" || url[3] == "Watch") && url[4]){
		jcookie(url[4], url[5].match(/[0-9]+$/), {expires: 365, path: "/"});
	}

	$("#topseries div.content a").each(serialSeason);
}

function parse(index, elem){
	elem.innerHTML = parseUrl(elem.innerHTML);
	elem.innerHTML = bbcode(elem.innerHTML);
	elem.innerHTML = profileUrl(elem.innerHTML);
}

function parseUrl(t){
	t = t.replace(/([^'"]|^)((https?|ftp):\/\/([\w\u0410-\u044F\u0401\u0451.:?#@_=%\/+-~]|(&amp;|&))+\.(jpg|jpeg|gif|png))([^\s\[<)]?)/gi,
			'$1<a href="$2"><img src="$2" width="50%"></a>$7');
	t = t.replace(/([^'"]|^)((https?|ftp):\/\/([\w\u0410-\u044F\u0401\u0451.:?#@_=%\/+-~]|(&amp;|&))+)([^\s\]<)]?)/gi, '$1<a href="$2">$2</a>$6');

	return t;
}

/*
function uniq(arr){
	var obj = new Object();
	var elem;
	for (var i = 0; elem = arr[i]; ++i){
		obj[elem] = 1;
	}
	var res = [];
	for (elem in obj) {res.push(elem)};
	return res;
}
*/

function bbcode(t){
	t = t.replace(/\[(b|s|i|u)\]((\n|.)+?)\[\/\1\]/gi, '<$1>$2</$1>');
	t = t.replace(/\[(irony)\]((\n|.)+?)\[\/\1\]/gi, '<font color="#660000"><i>$2</i></font>');
	t = t.replace(/&amp;/gi, "&");
	return t;
}

function profileUrl(t){
	t = t.replace(/([\s]|^)@([\w\d]+)/gi, "$1<a href=\"http://turbofilm.ru/Users/$2\">$2</a>");
	return t;	
}

function replyExt(e){
	if (e.target.id){
		if (e.target.className == "noreply"){
			var id = e.target.id.substring(5);
			$("div.area").css("background", "transparent");
			$("div.area").css("padding", "0");
			$("div.replytext").css("background", "url(/media/i/comments/addcomarea.png) top left no-repeat");
			$("#rbox"+id).css("width", "450px");
			$("#text"+id).css("width", "92%");
			$("#text"+id).css("height", "100px");
			$("#text"+id).css("margin", "15px");
			$("#text"+id).attr("class", "addcomta");
			$("div.replytext, div.area").css("width", "450px");
			$("div.replytext, div.area").css("height", "160px");
			$("div.replytext").css("margin", "0")
			$("#submit"+id).css("margin", "0 0 0 178px");

			var comm = $(e.target).parent().get(0);
			comm = $(comm).parent().get(0);
			comm = $(comm).parent().get(0);
			$("#text"+id).text("@"+$(".name", comm).text()+", ");
		}
	}
}

function serialMark(index, elem){
	var id = $(".sserieslistonetxtep", elem).text().match(/[0-9]+$/);
	$(elem).append("<span id=\"mark"+id+"\"><a href=\"javascript:setMark("+id+")\">Метка</a></span>")
	visualMark(id, jcookie(id));
}

function setMark(id){
	var val = jcookie(id)?null:1;

	if (val)
		jcookie(id, val, {expires: 365, path: location.pathname});
	else
		jcookie(id, "", {expires: -1, path: location.pathname});
	visualMark(id, val);
}

function visualMark(id, val){
	if (val){
		$("#mark"+id).css("border", "1px solid blue");
	}
	else{
		$("#mark"+id).css("border", "");
	}
}

function serialSeason(index, elem){
	var url = elem.href;
	var i = url.lastIndexOf("/")+1;
	var sname = url.substr(i, url.length-i);
	if (jcookie(sname)){
		elem.href += "/Season" + jcookie(sname);
	}
}

