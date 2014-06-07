// ==UserScript==
// @name           YouTube - All Ads Remover
// @namespace      YouTube
// @description    Remove in-video ads and before-video ads from everywhere + Send feedback + Ads on the top main page + .
// @include        htt*://*.youtube.com/*
// @grant		   none
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @icon           http://aux3.iconpedia.net/uploads/520882026785186105.png
// @version        1.4
// @encoding       UTF-8
// ==/UserScript==

wipe_ads = function() {
    var node;
    if (node = document.getElementById("ad_creative_1")) {
        node.parentNode.removeChild(node);
    }
    if (node = document.getElementById("ad_creative_expand_btn_1")) {
        node.parentNode.removeChild(node);
    }
    if (node = document.getElementById("yt-hitchhiker-feedback")) {
        node.parentNode.removeChild(node);
    }
    if (node = document.getElementById("watch-channel-brand-div")) {
        node.parentNode.removeChild(node);
    }
    if (node = document.getElementById("watch-longform-ad")) {
        node.parentNode.removeChild(node);
    }
	/* Opera Try to fix
	if (node = document.getElementById("watch7-video-container")) {
		node.style.background = "";
		node.style.backgroundColor = "rgb(255,255,255);";
		node.style.backgroundImage = "";
		node.className = "";
	}
	*/
    if (node = document.getElementById("watch7-branded-banner")) {
        node.parentNode.removeChild(node);
		document.getElementById("watch7-container").className = document.getElementById("watch7-container").className.replace("watch-branded-banner","").replace("watch-branded","");
    }
	
	
    if (typeof yt !== "undefined") {
        if (typeof yt.getConfig === "function") {
            if (yt.getConfig("ADS_DATA")) {
                yt.getConfig("ADS_DATA").show_instream = false;
                yt.getConfig("ADS_DATA").show_companion = false;
                yt.getConfig("ADS_DATA").show_afc = false;
                yt.getConfig("ADS_DATA").show_afv = false;
                yt.getConfig("ADS_DATA").afv_vars = false;
                yt.getConfig("ADS_DATA").afc_vars = false;
            }
        }
        if (typeof yt.playerConfig !== "undefined") {
            yt.playerConfig.args.csi_page_type = null;
            yt.playerConfig.args.trueview = false;
            yt.playerConfig.args.afv_ad_tag = false;
            yt.playerConfig.args.ad_preroll = 0;
            yt.playerConfig.args.invideo = false;
            yt.playerConfig.args.baseUrl = false;
            yt.playerConfig.args.afv_ad_tag = false;
            yt.playerConfig.args.ad_channel_code_instream = false;
        }
		
        if (typeof yt.setConfig === "function") {
            yt.setConfig({
                BRANDED_BACKGROUND_IMAGE: null,
                BRANDED_BACKGROUND_COLOR: "#FFFFFF"
            });
        }
		
    }
    if (document.getElementById("movie_player") || document.getElementById("movie_player-flash")) {
        var docu = document.getElementById("movie_player-flash") ? document.getElementById("movie_player-flash") : document.getElementById("movie_player");
        var flashVars = docu.getAttribute("flashvars").split("&");
        var splitLoc;
        var name;
        var newflashvars;
        for (var i = 0; i < flashVars.length; i++) {
            name = flashVars[i].substr(0, splitLoc = flashVars[i].indexOf("="));
            var add = name + "=" + flashVars[i].substr(splitLoc + 1);
            if (name.substr(0, 3) == "ad_") {
                var add = name + "=";
            } else if (name == "prefetch_ad_live_stream") {
                var add = name + "=False";
            } else if (name == "baseUrl") {
                var add = name + "=";
            } else if (name == "invideo" || name == "watermark") {
                var add = name + "=False";
            } else if (name == "afv_ad_tag") {
                var add = name + "=False";
            } else if (name == "csi_page_type") {
                var add = name + "=watch7";
            } else if (name == "tpas_ad_type_id") {
                var add = name + "=0";
            } else if (name == "afv_inslate_ad_tag") {
                var add = name + "=";
            } else if (name == "adsense_video_doc_id") {
                var add = name + "=";
            } else if (name == "tpas_video_id") {
                var add = name + "=";
            }
            if (newflashvars) {
                newflashvars += "&" + add;
            } else {
                newflashvars = add;
            }
        }
        docu.setAttribute("flashvars", newflashvars);
        var c = docu.cloneNode(true);
        docu.parentNode.replaceChild(c, docu);
    } 
	else {
        setTimeout(function() {
            wipe_ads();
        }, 500);
    }
};

wipe_ads();