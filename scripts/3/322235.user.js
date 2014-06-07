// ==UserScript==
// @name          Old Twitter (black)
// @namespace     http://userstyles.org
// @description	  Old style Twitter layout.
// @version       1.4.1
// @author        NeosTest
// @homepage      http://www.neostest.tk/
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.twitter.com/*
// @run-at        document-start
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACdAAAAnQBpZ4gxgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAfLSURBVGiB7VltbF11HX5%2B53%2FPubdr18aWhr0Uw2whQg0sZgPiMFyCUadpsn24FU00k5ihBkVN%2FKB8oNX4QQETQzRhoiH6wUjDiw4lyj4QXsbIaNwGEmcWGGwrjDu29bb3peec%2F%2FP4YW1tu9uub1tDwi%2F55X9ycm%2FO8%2Fyf39v5H5OED7IFKw1gqfYhgZW2zKV%2BoJkZACsUCgYAxWLR2tvbBQADAwMCIC0gMe1SJnFvb68bHh7OmVmzc241gFXe%2B4hkDKCcJMlIFEUjLS0ttUcffdRPA2pmhUIhKBaL9uyzz1ISzyMw40d%2BITsxl5mZbd26NXLOXUbyBgC3A7iWZAfJZkklkm%2BTfA3AE5L2NTQ0FJ9%2B%2BumkUCjY66%2B%2F7pqbm5u89y1mdlkQBK%2Ft3bu3Oo2AmdmOHTuyw8PDH%2FPeu2w2%2B3Z3d%2FfIvffey6WCz%2BfzjU1NTZ0k7wLwVUlZkpCEmauk2Hv%2FSJqmD5nZyTiOc2EYXpam6WcA3C7phSiK7nnppZfOSNIkgf7%2B%2FuCVV15Z65y7H8Bmkt8huW%2Fz5s3DiyVhZtbT09OQpunGIAgelnTNbMCnEJi4%2Fneapi%2Ba2fUkr5W0WtKomW2L43jfoUOHKpI0WYV2797tzOxyAF8E0BkEwW8zmcyn9u%2Ff39Lf37%2BoarVz586M977DzH5G8hqSuJB77yeuuwHsJHkjydUkRfIxksVKpbKqu7s7NDObBBZFUcbMugCsHr%2B1HsCuMAy3DA4Ott56662Z8Qoy790vFovNkgqSbpkP%2BDmc3vtnSL4ax%2FHXoij6McnVAM4RMDNrbGyMJF01A8c6SQ875wptbW0fLRQKufmqkc%2FnXblcXivpbpK2RAIVSTd57%2B%2BTdBeAfyVJkgD4fwg1NTWZmTXVwXK5pAfTNL2%2FWq1uPHjw4Ec2bdoUXkiN9vb2kOTVJNuXCB4km8arFUj%2B3nv%2FfEtLS3VaDoRhmAJ4exY8DsB259xjkr6ybt26zm3btrXceeedYX9%2FfzCTjJlZqVRqMLMbZ8T1vL3Of7z3%2FiGSvxobG3tncHAwBaaU0d7e3qharW5xzu3B3COGN7P9kv5E8gVJJ83szMjISJzP59nX14dCoWCjo6Nr4zjeJWlrnQoz73X8OgHwQBAEvxsbGzt25MiReKJHTR0lfBAEQ5IOm9k1cxBwkm4CcBOAkwD2eO%2F%2FnMvl3tq7d%2B9IPp%2BvViqVsVqt1iipGUC9ErkgApLeJPl4tVo9fvTo0Unw0xQwM9u%2BfXur9%2F7bZvaTOQjUA5NKOua9Py7pDUn%2F9d6flLQDwM3LQOCgmX3p8OHDRyRNGzEmFejr67PBwcFqJpP5K8kvjO%2FweTYLmIykDeP%2BaZITRDlLk1poCJ11ziUAzhttJgm8%2FPLLYS6X%2BwSAFjN7RNKVANbMtuvzBBEsBwFJp7z3Sb0NnewDYRhGaZreQvIpST8ws5MAxibAL0MpXLR779%2FjuYn1PAWCcYAqFoupmb0FIAJwtaTrAWQXUOYumgM4JmmsngKTIRTHcQrgDQA1ALn5Sr6EuJ7vmnrv92ez2drU6jNNAQDo6enx2Wz2PQDPr3TITHVJJ5xz7x09ejSdNQcAoK%2BvT7lc7n3v%2FQMkyysNfIofIHkWQN2RfpKAJHV2dlajKDpE8mGeG19XGjwk7alUKqV6CQzUeSfu7e2NRkdHryD5LZLfJRmuVA4AOG1mn3%2F33XcPSornVGDCBgYGEgDHJf2a5D0kT6zU7qdp%2BmSSJEMA6sY%2FUOdYRZLMLMnn87GZnRgnchvJLZJyl1CBUhAEf8hms6dnC5%2B6BACgUChYsVhsIvkgydYVCqG%2FkXyzWCxOG94uGELjYaQkSUZI%2Fv1CMi%2FTrD%2FTSyR3NTQ0nMIs1WdOAgBE8kyapr%2Fx3l%2FqHJCkX0ZR9J%2BhoaG6zWuqzXoyZ2a2cePGlmw2e7OkXSTXXqJQ%2Boek742MjLwxW%2BWZjwKQpAMHDpTCMHzRe3%2BHpP28%2BL3huKSfrlq16hiAutPnvBWYokSwZcuWxlqttj5N09tIfkPSBp57ybZlVKAi6ZvOuaeGh4fPXih05k1gnIR1d3eHAFolXSXpBklfl3QtSVsGAiWSPwTwl3K5fEoz3rrmslmP1yeOwQFYV1dXxjnXkiTJlQDukFQg2bgcOSDpfQDfB%2FDPhYIHxhWYeipdLBaD5uZmF8dxVKvVGrz3zc65dpI9AO4g2b6MSXwCwN0AnhsdHT29UPCTBDZs2JBbs2bN%2BnK5vMo51yqpg%2BR6AB8n%2BUlJnSSblrFJpQCeAfDzIAheLZVKw4sBDwAZM7PrrrvOxXH8WefcjyRdcRFK49QB7TCA%2B4IgeK5UKg0BqGr8Y8ViLJCk1tbWMTMb8N73SvqjpLPL3ZxIDgH4hXPuy865x0ul0psAKksBD0w%2FFwo6OjqybW1trUmSdEj6HMltJLslRYtU4CSAfSSf9N4fNLN3yuXyGQBzzjeLIjB5wyzo6uoKM5lME4A27%2F3l3vtNJG8cL5vtkhpIZiWFkhKSFZKjks5Kep%2FnRvA9ZvZaEARFMzt7%2BvTpKgC%2F1B2%2FIIEpRAxA0NXVlSGZi%2BO4KYqixjiOc0EQhCQzJJ33nt77xDkXe%2B%2FjNE3HwjCsSSqfOnWqBsBjgV8el4VAHTITjinrVNPM9WKBnobtEjzjotoH%2Fkv9hwRW2v4Hzfz1NBYlTUUAAAAASUVORK5CYII%3D
// ==/UserScript==
(function() {
var css = ".global-nav .container {\n\
        		max-width: 918px !important;\n\
        		/*max-width: 936px !important;*/\n\
            }\n\
            .global-nav {\n\
				height: 39px !important;\n\
            }\n\
            .topbar {\n\
				height: 39px !important;\n\
            }\n\
            #global-actions > li{\n\
				height: 39px !important;\n\
            }\n\
           .global-nav-inner {\n\
                background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_bgs.png') fixed !important;\n\
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), 0 -1px 0 rgba(0, 0, 0, 0.1) inset !important;\n\
                height: 39px !important;\n\
            }\n\
            #global-actions > li > a{\n\
				transition: none !important;\n\
            }\n\
            .bird-topbar-etched{\n\
				transition: none !important;\n\
			}\n\
			.pushing-state .pushstate-spinner{\n\
				background:url('https://abs.twimg.com/a/1391236451/img/t1/spinner-medium.gif') no-repeat 0 0 !important;\n\
				margin-top: 8px !important;\n\
			}\n\
            .nav > li {\n\
                color: #d0d0d0 !important;\n\
            }\n\
            #global-actions > li:hover > a, #global-actions > li.active > a {\n\
                /*background: radial-gradient(ellipse at center,  #4f4f4f 20%,#161616 80%) !important;*/\n\
                background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_bgs.png') #3D3D3D 0px -50px fixed !important;\n\
                height: 39px !important;\n\
                /*46px*/\n\
            }\n\
            #global-actions > li.active > a {\n\
                box-shadow: -1px 2px 10px 3px rgba(0, 0, 0, 0.3) inset !important;\n\
            }\n\
            #global-actions > li > a {\n\
                border-bottom: none !important;\n\
            }\n\
            .tweet .time{\n\
				float: right !important;\n\
            }\n\
            .tweet .time:before{\n\
				content: '' !important;\n\
            }\n\
            \n\
            .global-nav .form-search .search-input {\n\
                background: none repeat scroll 0 0 #CCCCCC !important;\n\
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n\
                color: rgba(48, 48, 48, 0.75) !important;\n\
                font-family: \"Helvetica Neue\",Helvetica,Arial,sans-serif !important;\n\
                /*font-size: 13px !important;*/\n\
                height: 14px !important;\n\
                font-weight: normal !important;\n\
                line-height: 1 !important;\n\
                padding: 5px 10px !important;\n\
                transition: none 0s ease 0s !important;\n\
            }\n\
            .global-nav .search-icon .Icon{\n\
				margin-top: 0px !important;\n\
				color: rgba(78, 78, 78, 0.75) !important;\n\
            }\n\
            \n\
            .global-nav .form-search .search-input.focus {\n\
                background-color: #ddd !important;\n\
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.15) !important;\n\
                color: #333333 !important;\n\
                outline: 0 none !important;\n\
                padding: 5px 10px !important;\n\
                text-shadow: 0 1px 0 #FFFFFF !important;\n\
            }\n\
            \n\
            .global-nav .search-input::-moz-placeholder {\n\
                color: #666666 !important;\n\
            }\n\
            \n\
            .global-nav .search-icon {\n\
                right: -2px !important;\n\
                top: 2px !important;\n\
            }\n\
            .stats a strong {\n\
				font-size: 16px !important;\n\
				font-weight: bold !important;\n\
				color: rgb(41, 47, 51) !important;\n\
            }\n\
            #content-main-heading {\n\
    			color: rgb(41, 47, 51) !important;\n\
			    font-size: 20px !important;\n\
			    font-weight: bold !important\n\
			}\n\
			.wrapper, .wrapper-narrow, .wrapper-permalink {\n\
				background: url(\"https://abs.twimg.com/a/1391236451/img/t1/wash-white-30.png\") repeat scroll 0% 0% transparent !important;\n\
			}\n\
			#global-tweet-dialog .modal-footer {\n\
				background: #EDEDED !important;\n\
			}\n\
			.modal-header {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_bgs.png') 0px 200px !important;\n\
				height: 17px !important;\n\
			}\n\
			.twttr-dialog-header {\n\
				padding: 8px 15px 8px !important;\n\
			}\n\
			.modal-content {\n\
				position: relative;\n\
				background-color: rgb(255, 255, 255);\n\
				border-radius: 6px 6px 6px 6px;\n\
				background-clip: padding-box;\n\
				box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4), 0px 1px 0px rgba(255, 255, 255, 0.5) inset;\n\
			}\n\
			.modal-title {\n\
				font-weight: bold !important;\n\
				color: #CDCDCD !important;\n\
			}\n\
			.home-tweet-box, .dm-tweetbox, .inline-reply-tweetbox{\n\
				background: #EDEDED !important;\n\
			}\n\
			.Icon--home {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') 0px -48px !important;\n\
			}\n\
			#global-nav-home:hover .Icon--home {\n\
				background-position: 0px -78px !important;\n\
			}\n\
			#global-nav-home.active .Icon--home {\n\
				background-position: 0px -108px !important;\n\
			}\n\
			.Icon--notifications {/*.Icon--connect*/\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') -78px -48px !important;\n\
			}\n\
			.people:hover .Icon--notifications {/*.Icon--connect*/\n\
				background-position: -78px -78px !important;\n\
			}\n\
			.people.active .Icon--notifications {/**.Icon--connect*/\n\
				background-position: -78px -108px !important;\n\
			}\n\
			.Icon--discover {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') -39px -48px !important;\n\
			}\n\
			.topics:hover .Icon--discover {\n\
				background-position: -39px -78px !important;\n\
			}\n\
			.topics.active .Icon--discover {\n\
				background-position: -39px -108px !important;\n\
			}\n\
			.Icon--me {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') -120px -48px !important;\n\
			}\n\
			.profile:hover .Icon--me {\n\
				background-position: -120px -78px !important;\n\
			}\n\
			.profile.active .Icon--me {\n\
				background-position: -120px -108px !important;\n\
			}\n\
			.Icon--bird {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') -39px -0px !important;\n\
			}\n\
			.Icon--large.Icon--tweet {\n\
				background: url('https://abs.twimg.com/a/1391236451/img/t1/twitter_web_sprite_icons.png') -198px -47px !important;\n\
			}\n\
			#global-new-tweet-button {\n\
				background-image: linear-gradient(#53ABE6, #1778B6) !important; /*0, 132, 180*/\n\
				opacity: 1 !important;\n\
				padding: 2px 5px 2px 8px !important;\n\
				margin: 0px !important;\n\
				margin-top: 6px !important;\n\
				height: 28px !important;\n\
				/*box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4), 0px 1px 0px rgba(255, 255, 255, 0.5) inset;*/\n\
				box-shadow: -1px -1px 0px #2A2A2A,  0 1px 0px #444444, inset 0px -1px 0px rgba(0, 0, 0, 0.5), inset 0px 1px 1px rgba(189, 189, 189, 0.8);\n\
				border: 1px solid black !important;\n\
			}\n\
			#global-new-tweet-button:hover, #global-new-tweet-button:active {\n\
				border-color: white !important;\n\
				background-color: #1778B6 !important;\n\
				transition: none !important;\n\
			}\n\
			.bird-topbar-etched {\n\
				margin-top: 11px !important;\n\
			}\n\
			.Icon--home:before, .Icon--notifications:before, .Icon--connect:before, .Icon--discover:before, .Icon--me:before, .Icon--bird:before, .Icon--large.Icon--tweet:before {\n\
				content: '' !important;\n\
			}\n\
			.nav > li .Icon.Icon--home, .nav > li .Icon.Icon--notifications, .nav > li .Icon.Icon--connect, .nav > li .Icon.Icon--discover, .nav > li .Icon.Icon--me{\n\
				margin: 8px 0px 0px 10px !important;\n\
			}\n\
			.nav > li > a .text{\n\
				margin-top: 14px !important;\n\
				font-weight: bold !important;\n\
				color: #C8C8C8 !important;\n\
			}\n\
			.nav > li .Icon.Icon--dm{\n\
				margin-top: -8px !important;\n\
			}\n\
			.nav > li .Icon.Icon--cog{\n\
				margin-top: 8px !important;\n\
			}\n\
			.Gallery-content{\n\
				background: #181818 !important;\n\
			}\n\
			.Gallery-media{\n\
				padding: 5px;\n\
			}\n\
			.GalleryTweet{\n\
				background: #181818 !important;\n\
				color: #CDCDCD !important;\n\
				border-top-color: #3D3D3D !important;\n\
			}\n\
			.Gallery .modal-header{\n\
				border-bottom: none !important;\n\
			}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = "b.fn.hover=function(){return}";
document.getElementsByTagName('head')[0].appendChild(script);
