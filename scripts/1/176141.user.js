// ==UserScript==
// @name        Add menus to Flickr
// @namespace   http://www.quizzz.net/
// @include     /^https?:\/\/.+.flickr.com/.*/
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @description Adds several visible menus to the Flickr interface, so you no longer need to use all the time the user-unfriendly drop-down menus
// @copyright   Jocelyn Flament
// @run-at      document-end
// ==/UserScript==

var texts = {
    "map" : {
        "zh-hk" : "地圖",
   	    "de-de" : "Weltkarte",
        "en-us" : "Map",
        "es-us" : "Mapa",
        "fr-fr" : "Carte",
	    "ko-kr" : "지도",
	    "it-it" : "Cartina",
        "pt-br" : "Mapa",
        "vn-vn" : "Bản đồ",
        "id-id" : "Peta",
        // add more translations here if you need
    },
    "galleries" : {
        "zh-hk" : "博覽館",
   	    "de-de" : "Galerien",
        "en-us" : "Galleries",
        "es-us" : "Expos",
        "fr-fr" : "Expos",
	    "ko-kr" : "갤러리",
	    "it-it" : "Gallerie",
        "pt-br" : "Exposições",
        "vn-vn" : "Phòng trưng bày",
        "id-id" : "Galeri",
        // add more translations here if you need
    },
    "collections" : {
        "zh-hk" : "珍藏集",
   	    "de-de" : "Sammlungen",
        "en-us" : "Collections",
        "es-us" : "Colecciones",
        "fr-fr" : "Classeurs",
	    "ko-kr" : "콜렉션",
	    "it-it" : "Raccolte",
        "pt-br" : "Coleções",
        "vn-vn" : "Bộ sưu tập",
        "id-id" : "Koleksi",
        // add more translations here if you need
    },
    "archives" : {
        "zh-hk" : "資料庫",
   	    "de-de" : "Archiv",
        "en-us" : "Archives",
        "es-us" : "Archivos",
        "fr-fr" : "Archives",
	    "ko-kr" : "전체 사진",
	    "it-it" : "Archivi",
        "pt-br" : "Arquivos",
        "vn-vn" : "Lưu trữ",
        "id-id" : "Arsip",
        // add more translations here if you need
    },
    "tags" : {
        "zh-hk" : "標籤",
   	    "de-de" : "Tags",
        "en-us" : "Tags",
        "es-us" : "Etiquetas",
        "fr-fr" : "Tags",
	    "ko-kr" : "태그",
	    "it-it" : "Tag",
        "pt-br" : "Tags",
        "vn-vn" : "Từ khóa",
        "id-id" : "Tag",
        // add more translations here if you need
    },
    "popular" : {
        "zh-hk" : "熱門",
   	    "de-de" : "Beliebt",
        "en-us" : "Popular",
        "es-us" : "Popular",
        "fr-fr" : "Populaire",
	    "ko-kr" : "인기사진",
	    "it-it" : "Classifica",
        "pt-br" : "Popular",
        "vn-vn" : "Phổ biến",
        "id-id" : "Populer",
        // add more translations here if you need
    },
    "activity" : {
        "zh-hk" : "近期活動",
   	    "de-de" : "Neueste Aktivität",
        "en-us" : "Recent Activity",
        "es-us" : "Actividad reciente",
        "fr-fr" : "Dernière activité",
	    "ko-kr" : "최근 활동",
	    "it-it" : "Attività recente",
        "pt-br" : "Atividade recente",
        "vn-vn" : "Hoạt động gần đây",
        "id-id" : "Aktivitas Terbaru",
        // add more translations here if you need
    },
};

var str = window.location.pathname;
if(str.match('^/photos/[^/]+(/.*)?') || str.match('^/people/[^/]+(/.*)?'))
{
	if(str.match('^/photos/[^/]+(/.*)?'))
		var re = "/photos/([^/]+)";
	else
		var re = "/people/([^/]+)";
	var found = str.match(re);
	var user = found[1];
	
//	var str = $(".gn-link:first-child").attr('href');
//	var logged_user = /\/photos\/([^\/]+)/.exec(str)[1];
	
	function getCookies()
	{
		var c = document.cookie, v = 0, cookies = {};
		if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/))
		{
			c = RegExp.$1;
			v = 1;
		}
		if (v === 0) {
			c.split(/[,;]/).map(function(cookie)
			{
				var parts = cookie.split(/=/, 2),
					name = decodeURIComponent(parts[0].trimLeft()),
					value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
				cookies[name] = value;
			});
		}
		else
		{
			c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1)
			{
				var name = $0,
					value = $1.charAt(0) === '"'
							  ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
							  : $1;
				cookies[name] = value;
			});
		}
		return cookies;
	}
	function getCookie(name)
	{
		return getCookies()[name];
	}
	
	var lang = /([^;]+);.*/.exec(getCookie("localization"))[1];
	
	$("#you-panel .gn-subnav-item:first-child").after('<li class="gn-subnav-item"><a data-track="You-sets" href="/photos/me/collections">'+texts["collections"][lang]+'</a></li>');

	$(".sn-navitem.sn-photostream").after('<li class="sn-navitem sn-collections"><a data-track="YouSubnav-collections" href="/photos/'+user+'/collections/">'+texts["collections"][lang]+'</a></li>');
	$(".sn-navitem.sn-navitem-sets").after('<li class="sn-navitem sn-archives"><a data-track="YouSubnav-archives" href="/photos/'+user+'/archives/">'+texts["archives"][lang]+'</a></li>');
	$(".sn-navitem.sn-navitem-sets").after('<li class="sn-navitem sn-map"><a data-track="YouSubnav-map" href="/photos/'+user+'/map/">'+texts["map"][lang]+'</a></li>');
	$(".sn-navitem.sn-navitem-sets").after('<li class="sn-navitem sn-tags"><a data-track="YouSubnav-tags" href="/photos/'+user+'/tags/">'+texts["tags"][lang]+'</a></li>');

	$(".sn-navitem.sn-navitem-faves").after('<li class="sn-navitem sn-popular"><a data-track="YouSubnav-popular" href="/photos/'+user+'/popular-interesting/">'+texts["popular"][lang]+'</a></li>');
	$(".sn-navitem.sn-navitem-faves").after('<li class="sn-navitem sn-galleries"><a data-track="YouSubnav-galleries" href="/photos/'+user+'/galleries/">'+texts["galleries"][lang]+'</a></li>');
}
