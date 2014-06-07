// ==UserScript==
// @name          Pornifier2
// @version       25
// @changes       All: Added a settings dialog for many settings that required editing the souce. Settings now persist between updates. | you will have to re-enter username/passwords for forums because of this change. sorry. for better changes list, update script and see settings -> check for update.
// @namespace     http://userscripts.org/scripts/show/104615
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_xmlhttpRequest
// @include       http://*exposedforums.com/*
// @include       http://exposedforums.com/*
// @include       http://forum.xnxx.com*
// @include       http://www.nakenprat.com*
// @include       http://nakenprat.com*
// @include       http://forum.oneclickchicks.com*
// @include       htt*://motherless.com*
// @include       http://forum.pichunter.com/*
// @include       http://*retailmenot.com/view/*
// @include       http://myfotographs.net/Jennie_Ve*
// @include       http://*.nyud.net*
// @include       http://www.yourfreeporn.us/video*
// @include       http://*xtube.com*
// @include       http://*winbystate.com*
// @include       http://*imagefap*
// @include       http://88.150.168.111/rips*
// ==/UserScript==

var P2_VERSION = 25
var P2_CHANGES = [] //will be pulled from update.js
var P2_DONATIONS = {amount: 0, requests: []} //will be pulled from update.js
var P2_LATEST_VERSION = "(error looking up)"; //will be pulled by updateScript() from meta.js

var DEBUG = true;


var ui = {
    main: null,
    threadList: null,
    body: null,
    window: null,
    document: null,
    slideshow: null,
    slideshowInfo: null
}
var CONTROL = setupControlPanel();

var siteName = '';
var SITE = null;
var isChrome = window.navigator.vendor.match(/Google/);
var gvar=function() {}; // for chrome compat

var vidCount = 0; //for html5 video preview

//Dont fuck with these settings here - they are now configured through a control panel in the script. see 'Config'
MAX_IMAGES_LOAD_TO_SLIDESHOW = 100;
IMAGE_NUM_IN_MEMORY = 40;
THUMB_WIDTH = 230;

//////// end settings


if(IMAGE_NUM_IN_MEMORY > MAX_IMAGES_LOAD_TO_SLIDESHOW){
    IMAGE_NUM_IN_MEMORY = MAX_IMAGES_LOAD_TO_SLIDESHOW / 2;
    CONTROL.set('MAX_SLIDESHOW_IN_MEM', IMAGE_NUM_IN_MEMORY);
}

var supportedSites = [
    {
        url:"http://exposedforums.com/forums/",
        name:"exposedforums",
        inUrl:"exposedforums",
        threadUrl: 'http://exposedforums.com/forums/misc.php?do=showattachments&t=',
        username: 'jesscold', //default user/pass
        password: 'pornifier2',
        loader: LoaderForum,
        getFn: sneakyXHR //otherwise use $.get

    },
    {
        url:"http://forum.xnxx.com/",
        name:"xnxx",
        inUrl:"forum.xnxx.com",
        threadUrl: 'http://forum.xnxx.com/misc.php?do=showattachments&t=',
        username: null,
        password: null,
        loader: LoaderForum,
    },
    {
        url:"http://www.nakenprat.com/",
        name:"nakenprat",
        inUrl:"nakenprat.com",
        threadUrl: 'http://www.nakenprat.com/misc.php?do=showattachments&t=',
        loader: LoaderForum,
    },
    {
        url:"http://forum.oneclickchicks.com/",
        name:"oneclickchicks",
        inUrl:"oneclickchicks.com",
        threadUrl: 'http://forum.oneclickchicks.com/misc.php?do=showattachments&t=',
        username: 'jesscold', //default user/pass
        password: 'pornifier2',
        loader: LoaderForum,

    },
    {
        url:"http://www.winbystate.com/",
        name:"winbystate",
        inUrl:"winbystate.com",
        threadUrl: 'http://www.winbystate.com/misc.php?do=showattachments&t=',
        downloader: false,
        username: '',
        password: '',
        removeAds: ["#tb_passive_large", "#ad_global_below_navbar", "#ad_global_above_footer","#block_html_10", "#cometchat", "#cometchat_flashcontent", "iframe", "#tb_wcont_wtb", "#block_html_6", "#block_html_11"],
        loader: LoaderForum,

    },{
        url:"http://forum.pichunter.com/",
        name:"pichunter",
        inUrl:"pichunter.com",
        threadUrl: 'http://forum.pichunter.com/misc.php?do=showattachments&t=',
        loader: LoaderForum,

    },
    {
        url:"http://motherless.com/",
        name:"motherless",
        inUrl:"motherless.com",
        loader: LoaderMotherless,
        IMAGES_PER_PAGE: 80,
        MAX_SUPER_SLIDESHOW: 12 //how many pages can we safely slideshow without crashing. soft limit.
    },
    {
        url:"http://www.xtube.com/",
        name:"xtube",
        inUrl:"xtube.com",
        loader: LoaderXtube
    },
    {
        url:"http://imagefap.com/",
        name:"imgfap",
        inUrl:"imagefap",
        loader: LoaderImgFap
    },
    {
        url:"http://88.150.168.111/rips/",
        name:"rarchives",
        inUrl:"rarchives",
        loader: LoaderRarchives
    }

];



var style = "\
  .pornifier2 {width:100%; height:auto; position:absolute; top:0; left:0px; background-color:#eee; color:blue;z-index:100}\
  .pornifier2 .topline a {color: black; background-color:white; text-decoration:none;margin:3px;}\
  .pornifier2 .topline a.active {color: black; background-color:white; border-bottom:1px solid black;}\
  .pornifier2 a.close-p2 {color:black;background-color:red;}\
  .pornifier2 .topline {padding:3px;}\
  .pornifier2 .topline2 {text-align:left;padding:4px;}\
  .pornifier2 .topline2 .message-p2  {display:inline-block;}\
  .pornifier2 .topline2 .message-p2 a {margin:5px; background-color:white; color:black;}\
  .pornifier2 .topline2 .message-p2 a:hover {color:blue;}\
  #unseenThreadPreview li {-moz-border-radius: 8px;cursor:pointer; display:inline;list-style: none;float:left;overflow-y:auto; overflow-x: hidden; border:3px solid white; margin:5px}\
  #unseenThreadPreview li:hover {background-color:#ddd}\
  #unseenThreadPreview li img {width:auto;}\
  #unseenThreadPreview li .desc {color:blue;overflow-y:auto;width:auto;font-size:12px;padding:2px;}\
  #unseenThreadPreview li .imgNum {padding:3px;}\
  #unseenThreadPreview li.seen-preview {border:3px solid blue}\
  #unseenThreadPreview li.seen-slideshow {border:3px solid red}\
  .clear {clear:both}\
  .p2-hidden {display:none}\
  .linkActive {text-decoration:underline;color:red !important;font-weight:bold;}\
  .slideshow {position:absolute;z-index:100;background-color:#c8c8c8; left:0;}\
  .slideshow ul {padding:0;margin:0;}\
  .slideshowInfo {position:absolute;z-index:101;background-color:#c3c3c3; border:1px solid #ccc;}\
  #unseenThreadPreview li .imgNum {background-color:#aaa;color:white}\
  .p2-dialog {text-align:left;color:black; border-radius: 13px; box-shadow:-2px 2px 2px #C8C8C8; position:absolute; border:1px solid black; width: 800px;z-index:1000;background-color: white; font-size:13px; font-family: arial; padding: 15px 18px;}\
  .p2-dialog .p2-header {text-align:left;color:black; margin: -15px -18px 17px; padding: 12px 18px; background-color: #F3F3F3;border-top-left-radius:13px;border-top-right-radius:13px; font-weight:bold}\
  .p2-dialog .p2-header .action { float:right;}\
  .p2-dialog a { color: blue; text-decoration:underline;}\
  .p2-dialog p { margin: 20px 0;}\
  .p2-dialog .desc { margin-bottom:20px; color:blue; }\
  .p2-dialog .p2-footer { margin-top:10px; padding-top:10px; border-top: 1px solid #eee; text-align:center; }\
  .p2-dialog .p2-footer a { font-size:15px; font-weight:bold;}\
  .p2-dialog li { list-style: disc outside none ;margin-left: 15px; }\
  .p2-dialog .p2-holder {padding: 5px 0; border-top: 1px solid #ccc;}\
  .p2-dialog .p2-holder .label {width: auto;}\
  .p2-dialog .p2-holder input {width: 100px; margin-left:10px; border: 1px solid #ccc; float:right;}\
  .p2-dialog .p2-holder input:focus {background-color: yellow;}\
  .p2-dialog.p2-donate-dialog{text-align:center;}\
  .p2-single-preview {width:auto;font-size: 10px; border: 1px dashed #c00;display:block; position:relative; z-index:100;}\
  .p2-single-preview:hover {color:yellow}\
  .p2-download {color:blue; padding-left: 20px; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAsSAAALEgHS3X78AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1MzmNZGAwAAABV0RVh0Q3JlYXRpb24gVGltZQAyLzE3LzA4IJyqWAAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6MTE6NDEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wMi0xN1QwMjozNjo0NVo8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wMy0yNFQxOTowMDo0Mlo8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNR1SZAAAAEhQTFRFAAAA////GLMBGLMBH78BKNUALMYBOs0BO9kAS9MAT90AXNkAY+EAbuAAduYAguYAiuoAluwAne4ArvEAsvIAxfcA2fsA7P8AdyP8RwAAAAN0Uk5TAACzqB4m6AAAAGNJREFUGBkFwUEKQjEUBLDMb0HErfc/oVsRhdcxSQAAW7HACBt44kVjAwWwgQLYQCvABk4F2K7gVCza5HpABd4n6bqjgs+R1LpR4TuxQs/VVn8jVtDizBAbjOiAFdAYhAQA8AcebisWSIrTcwAAAABJRU5ErkJggg==) no-repeat 0 1px}\
  ul{border:0;padding:0}\
  .p2-sep {border:1px solid blue; padding: 5px; color:white; clear:both; font-weight:bold}\
    .masonry,\
    .masonry .masonry-brick {\
      -webkit-transition-duration: 0.3s;\
         -moz-transition-duration: 0.3s;\
           -o-transition-duration: 0.3s;\
              transition-duration: 0.3s;\
    }\
    .masonry {\
      -webkit-transition-property: height, width;\
         -moz-transition-property: height, width;\
           -o-transition-property: height, width;\
              transition-property: height, width;\
    }\
    .masonry .masonry-brick {\
      -webkit-transition-property: left, right, top;\
         -moz-transition-property: left, right, top;\
           -o-transition-property: left, right, top;\
              transition-property: left, right, top;\
    }\
";


function runPornifier() {
    log('bootstrapped and ready to roll');

    //setup globals from settings:
    CONTROL.addToConfig('MAX_SLIDESHOW','Slideshow: # of images to load at a time.', 100, "int", function(v){
        MAX_IMAGES_LOAD_TO_SLIDESHOW = v | 100;
    });
    CONTROL.addToConfig('MAX_SLIDESHOW_IN_MEM','Slideshow: # of images to keep in memory. Make this number smaller if you experience crashes', 40, "int", function(v){
        IMAGE_NUM_IN_MEMORY = v || 40;
    });
    CONTROL.addToConfig('THUMB_WIDTH','Preview Thumbnail: width of the preview image in pixels', 230, "int", function(v){
        THUMB_WIDTH = v || 230;

    });
    CONTROL.addToConfig('DEBUG','Enable debug logging', false, "boolean", function(v){
        DEBUG = v;
    });

    ui.body = $("body");
    ui.window = $(window);
    ui.document = $(window.document);



    $.each(supportedSites, function() {
        log("url:" + unsafeWindow.location.href.match(this.inUrl))
        if (unsafeWindow.location.href.match(this.inUrl)) {
            siteName = this.name;
            SITE = this;

            buildUI(); // IMPORTANT!!

            SITE.loader();
            return false;
        }
    });


}
function vbulletinAutologin(username, password){
    if($("#navbar_username").length == 0){
        return;
    }
    if($(".panelsurround .panel").text().match(/(You have entered an invalid username or password)|(Wrong username or password)/mi)){
        simpleDialog("Invalid username/pass!", "Your stored username or password is incorrect for this site. Disabling auto-login.<br/><br/>To fix: setup a correct user/pass in script settings and enable auto login.");
        CONTROL.set(siteName+'_enable_autologin', false);
        return;
    }
    if(username == null || password == null){
        simpleDialog("Enable auto login?", "This script allows you to login instantly to supported forums by storing your username and password IN YOUR GREASEMONKEY storage.<br/><br/><br/>"+
            " You have not stored a user/pass for "+siteName+" and you can do so now via the script settings dialog which will open next. To disable uncheck the 'enable autologin' option in the settings. Dont make a typo if you do use it, or shit will get fucked up. -Mgmt");
        CONTROL.showConfigPanel();
    } else if(username != '' && password != ''){
        $("#navbar_username").val(username);
        $("#navbar_password_hint,#navbar_password").filter(":first").val(password).trigger("change");
        $("input[name=vb_login_password]").val(password);
        $("#cb_cookieuser_navbar:not(:checked)").click();
        var $login = $("#navbar_password").parents("table:first").find("input.button").trigger("change");
        if($login.length){
            log("found old style login button");
            $login.click();
        } else {
            log("found new style login button");
            $("input.loginbutton").click();
        }
    }

}
//loaders help bootstrap each supported site
function LoaderForum() {
    var user = SITE.username || null;
    var pass = SITE.password || null;
    var enableAutologin = true;

    var login = _.after(3, function(){
        if(enableAutologin){
            vbulletinAutologin(user, pass);
        } else {
            log('autologin is disabled by user');
        }
    });
    CONTROL.addToConfig(siteName+'_enable_autologin',siteName+': Enable auto-login feature.', true, "boolean", function(v){
        enableAutologin = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_username',siteName+': username for instant login.', user, "string", function(v){
        user = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_password',siteName+': password. (stored in greasemonkey, <i>never shared</i>).', pass, "string", function(v){
        pass = v;
        login();
    });

    ui.topLine2.append($(".pagenav:first table").clone());
    ui.topLine2.append($(".threadpagenav:first").clone()); //new style forums
    ui.topLine2.append($("#pagination_top").clone().css({
		position: 'static',
		float: 'none'
	})); //search resuls
    loadSlideShows(addSlideShowPreview);
    if(SITE.removeAds){
        removeAds(SITE.removeAds);
    }
    if(SITE.downloader){
        $dlAll = $("<a href='#'>Download all threads on page</a>");
        ui.topLine2.append($dlAll);
        $dlAll.on('click.dl-all', function(){
            var $links = $("a.p2-download-thread");
            if($links.length){
                $links.click();
                $dlAll.text('Downloading '+$links.length+" threads.");
                $dlAll.unbind('click.dl-all');
            } else {
                alert('No threads found.. they need to load as previews first for this to work');
            }
            return false;
        });


    }
}

function LoaderXtube(){
    var findVideo = function(vid, cb){
        if(vid){
            sneakyXHR("http://www.xtube.com/find_video.php?video_id="+vid, function(url){
                url = unescape(url.substring("&filename=".length));
                sneakyXHR(url, function(data, response){
                    var size = (parseInt(response.responseHeaders.match(/Content-Length: (\d+)/) ? RegExp.$1 : "-1", 10) / 1048576).toFixed(2)+" MB";
                    cb(url, size);
                }, 'HEAD');
            });
        }
    };
    removeAds(["iframe"]);
    $("#ph_net_bar").height(50).empty().append(ui.main);
    if(unsafeWindow.contentType && unsafeWindow.contentType == 'video'){
        var vars = unescape($("#flash_sender").attr("flashvars"));
        var vid = vars.match(/video_id=([^&]+)/) ? RegExp.$1 : null;
        findVideo(vid, function(url, size){
            var $dl = $("<a href='"+url+"' class='p2-download'>Download Video ("+size+")</a>").css({
                'font-size':'17px'
            });
            $(".player-container").prepend($dl);
        });
    }
    var gotLinks = {};
    $("a[href^='/watch.php?v']").each(function(){
        var $link = $(this);
        var href = $link.attr('href');
        if(href in gotLinks){
            return true;
        }
        gotLinks[href] = true;
        var vid = href.match(/watch\.php\?v=([^&]+)/) ? RegExp.$1 : null;
        findVideo(vid, function(url, size){
            var $dl = $("<a href='"+url+"' class='p2-download'>DL ("+size+")</a>");
            $link.after($dl);
        });
    })
}
function LoaderImgFap(){

    if(~unsafeWindow.location.href.indexOf("http://www.imagefap.com"))  { 
		$("a[href^='http://www.imagefap.com/gallery/'],a[href^='/gallery.php?gid='],a.blk_galleries[href^='/gallery/']").each(function(){
			var $link = $(this);
			var $click = $("<a href='#' style='margin-left:10px; color:red;'>Slideshow</a>");
			$link.after($click);
			var galleryId = $link.attr('href').match(/(\d+)/) ? RegExp.$1 : 0;
			var $dl = $("<a href='' target='_blank' style='margin-left:10px; color:blue;' class='p2-download'>rip</a>");
			$link.after($dl);
			var ripping = false;
			var canDownload = false
			
			$dl.click(function(){
				var timer = null;
				var opened = false;
				var showInfo = function(d){
					var json = JSON.parse(d);
					if(json.zip){
						var url = "http://rip.rarchives.com/"+json.zip;
						$dl.attr("href", url);
						$dl.text("download: "+json.size);
						canDownload = true;
						clearTimeout(timer);
						timer = null;
						if(!opened){
							opened = true;
							unsafeWindow.open(url);
						}
					} else if(json.log){
						$dl.text(json.log);
					}
				}
				if(!ripping){
					ripping = true;
					$dl.text("ripping...");
					$dl.attr("href", "http://rip.rarchives.com/#http%3A//www.imagefap.com/pictures/"+galleryId+"/");
					sneakyXHR("http://rip.rarchives.com/rip.cgi?url=http%3A//www.imagefap.com/pictures/"+galleryId+"/&start=true", function(d){
						showInfo(d);
					});
					setTimeout(function(){
						var check = function(){
							sneakyXHR("http://rip.rarchives.com/rip.cgi?url=http%3A//www.imagefap.com/pictures/"+galleryId+"/&check=true", function(d){
								showInfo(d);
							});
							if(!canDownload){
								timer = setTimeout(check, 1000);
							}
						}
						if(!canDownload){
							check();
						}
					}, 1000);
				}
				return canDownload;
			});
			$click.click(function(){
				var href = $link.attr('href');
				$click.text("fetching..");
				sneakyXHR(href, function(data){
					var allImgUrl = $("<div>"+data+"</div>").find("#gallery td a:first").attr("href");
					sneakyXHR(allImgUrl, function(data){
						var urls = [];
						$("<div>"+data+"</div>").find("#navigation a").each(function(){
							var $this = $(this);
							var img = $this.attr('original');
							urls.push({url: img});
						});
						$click.text("slideshow ("+urls.length+")");
						loadSlideshow(urls);
					});
				});
				return false;
			});
		});
	}
	if(~unsafeWindow.location.href.indexOf("http://rip.rarchives.com/rips/")){
		if($("title").text() == "403 Forbidden"){
			unsafeWindow.location = unsafeWindow.location.href;
		}
	}
}


//finds the links that contain image listing for each thread, GETs them, and passes results to callback
function loadSlideShows(threadLoadedFn) {
    var urls = [];
    var $threads = $("a[onclick^=attachments\\(]");
    var imagesNum = '??';
    log("starting to load slideshows")
    $threads.each(function() { //get each url you can get GET a list of images from
        var find = $(this).attr("onclick").match(/\d+/);
        if(find){
            var tid = find[0];
            
            var $title = $(this).closest("*[id^=thread]").find('a.title');
			var desc = "n/a";
            if($title.length == 0){
				$title = $(this).closest("*[id^='td_threadtitle']").find('a[id^="thread_title"]');
            }
			desc = $title.text();
            var imgNum = $(this).find(".sprite_misc_paperclip").text().match(/\d+/);
            log("ow much? ", imgNum)
            if(imgNum && imgNum.length > 0){ //include # of images in hash - this ensures we refetch if more images are added
                imagesNum = imgNum[0];
            }
            urls.push({url:SITE.threadUrl + tid, 'desc':desc, id:tid});
        }
    });
    log("found threads number to request: " + urls.length);
    $.each(urls, function() {
        var urlObj = this;
        var hashKey = "thumb"+urlObj.url+"-"+imagesNum;
        getValue(hashKey, function(obj) {
            if(obj){
        //        log("found thumb for url, will load full img list when user clicks")
              //  log(obj);
                threadLoadedFn({
                    'urlObj':urlObj,
                    'images':null,
                    'numImages':obj.numImages,
                    'thumb': obj.thumb.url
                });
            } else {
                loadImagesFromUrl(urlObj.url, "a", 0, urlObj.desc, function(imgs) {
                    setValue(hashKey, {thumb: imgs[0], numImages: imgs.length});
                    threadLoadedFn({
                        'urlObj':urlObj,
                        'images':imgs,
                        'numImages':imgs.length,
                        'thumb': imgs[0].url
                    });
                });
            }
        });

    });
}

/*
 urlObj has:
 url = url of the download page for the originating thread
 desc = description of the thread
 id = id of the thread
 */
function addSlideShowPreview(map) {

    var defaults = {
        'urlObj':null, //urlObj,
        'images':null,
        'numImages': null, //obj.numImages,
        'thumb': null //imgs[0]
    };


 //   log("loading preview of:" + map.thumb)
    var desc = map.urlObj.desc;

    var $item = $("<li class='thumb "+(!map.images ? 'seen-preview': '')+"'>");
    var $link = $("<img src='" + map.thumb + "'  style='width:"+THUMB_WIDTH+"px;'></img>");
    var $desc = $("<div class='desc' style='width:"+THUMB_WIDTH+"px;'>" + desc + "</div>");
    var $imgNum = $("<div class='imgNum'>Images: " + map.numImages + "</div>");
    var $dl = $("<div><a class='p2-download-thread' href='#'>download all</a></div>");
    getValue("seen"+map.urlObj.url, function(obj) {
        if(obj){
            $item.addClass('seen-slideshow');
        }
    });
    if(SITE.downloader){
        $item.append($dl);
    }
    $item.append($imgNum);
    $item.append($link);
    $item.append($desc);
    $item.data("image-num",map.numImages);

    var inserted = false;
    var myImages = parseInt(map.numImages, 10);
    ui.threadList.find("li.thumb").each(function(){
        var $this = $(this);
        var num = parseInt($this.data("image-num"), 10);
        if(myImages >= num){
            $this.before($item);
            inserted = true;
            return false;
        }
    });
    if(!inserted){
        ui.threadList.append($item);
        ui.threadList.masonry('reload');
    }


    $item.click(function(e) {
        var $target = $(e.target);
        if($target.is('a.p2-download-thread:not(.downloaded)')){
            var dd =  map.urlObj.desc.replace(/[ \/\\:"'.!]+/g, "_") || "no_desc__"+~~(Math.random() * 1000);
            $target.addClass('downloaded');
            sneakyXHR("http://localhost:3000/download/"+map.urlObj.id+"/"+dd+"/", function(text){
                $target.text(text);
            });
            return false;
        }
        $item.addClass("seen-slideshow");
        setValue("seen"+map.urlObj.url, "yes");
        if(map.images){
            //we already gots the images
  //          log('we already have images for this:'+map.images.length);
            loadSlideshow(map.images);
        } else {
            //thumb was cached, lets grab the images now:
            loadImagesFromUrl(map.urlObj.url, "a,img", map.numImages, desc, function(imgs) {
                loadSlideshow(imgs);
            });
        }
    });
    $link.load(function(){ //reload masonary as images load
        ui.threadList.masonry('reload');
    });


}


function loadImagesFromUrl(url, imgSelector, numImages, desc, cb){

    var getFn = SITE.getFn ? SITE.getFn : $.get;
    getFn(url, function(d) { //GET an html list of images from each url
        var $imgs = $(d).find(imgSelector); //parse that list and get the img.src's
        var imgs = [];

        $imgs.each(function() {
            var url = $(this).attr("href");
            var fn = $(this).text();
            if(url){
                imgs.push({url:url, fn:fn});
            }
        });

        log("found images in dom num:"+imgs.length+" for url:"+url);
        cb(imgs);
    });
}
function LoaderYourFreePorn(){
    removeAds(["#EroIMslider", "div.ads", "iframe"]);
}
/////// motherless
function LoaderMotherless(){
    var start = _.once(startMotherless);

    var user = SITE.username || null;
    var pass = SITE.password || null;
    var enableAutologin = true;

    var login = _.after(5, function(){
        log('autologin? '+enableAutologin+" user:"+user+" pass:"+pass);
        if(enableAutologin && user && pass){
            var loggedIn = $("#menu-member-links .link-profile").length;
            if(loggedIn){
                start();
                return;
            }
            if(unsafeWindow.location.href != 'https://motherless.com/login'){
                unsafeWindow.location.href = 'https://motherless.com/login';
            } else {
                var $user = $("#form-username");
                var $pass = $("#form-password");
			
                $user.val(user);
                $pass.val(pass);
                $pass.closest('form').submit();
                log('logging in');
            }
        } else {
            log('autologin is disabled by user');
            start();
        }
    });
    CONTROL.addToConfig('LOAD_NEXT_PAGE_INLINE','Motherless: Page navigation loads content into current page. (EXPERIMAENTAL)', false, "boolean", function(v){
        SITE.LOAD_NEXT_PAGE_INLINE = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_enable_autologin',siteName+': Enable auto-login feature.', false, "boolean", function(v){
        enableAutologin = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_username',siteName+': username for instant login.', user, "string", function(v){
        user = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_password',siteName+': password. (stored in greasemonkey, <i>never shared</i>).', pass, "string", function(v){
        pass = v;
        login();
    });
    CONTROL.addToConfig(siteName+'_max_load_inline',siteName+': Load this many pages at a time.', 14, "int", function(v){
        SITE.MAX_PAGES_LOAD_INLINE = v;
        login();
    });
}

function findImgSrc (id, cb){
    var href = "http://motherless.com/"+id+"?full";
    sneakyXHR(href, function(d){
        var img = d.match(/property="og:image" content="([^"]+)"/mi) ? RegExp.$1 : null;
        //	var img = $(".content_area", d).find("#thepic").attr("src"); //regex is faster
        if(img){
            cb({url:img});
        }
    }, "get", {
        'Range': 'bytes=0-3000' //grab first 3k
    });
}

function startMotherless(){
		log("starting ML..");
        var data = [];

        ui.topLine.append($("#menu-member-links").clone());

        var $currentSingle = $([]);
        ui.slideshow.bind("up", function(){
            log("current", $currentSingle);
            if($currentSingle.length){
                var $el = $currentSingle.closest('.thumbnail').nextAll('.thumbnail:first').find('.p2-single-preview').trigger('click', [true]);
                ui.slideshow.trigger("next.p");
            }
        }).bind("down", function(){
            if($currentSingle.length){
               $currentSingle.closest('.thumbnail').prevAll('.thumbnail:first').find('.p2-single-preview').trigger('click', [true]);
                ui.slideshow.trigger("next.p");
            }
        })
        var findThumbOnGroupThread = function($imgs){

            var data = [];
            var debouceSlideshow = debounce(function(ddata){
                loadSlideshow(ddata);
                data = [];
            }, 500);
            $imgs.each(function(){
                var $img = $(this);
                var id = $img.attr("data-strip-src").match("thumbs/([^.]+).\\w");
                if(id && id.length > 0){
                    findImgSrc(id[1], function(src){
                        data.push(src);
                        debouceSlideshow(data);
                    });
                }
            });
        }
         //add a link under thumbs to view full size
        var addSinglePreview = function($container){
			var imgs;
			if($container){
				imgs = $container.find('img[src^="http://thumbs.motherlessmedia.com/thumbs/"]');
			} else {
				imgs = $('img[src^="http://thumbs.motherlessmedia.com/thumbs/"]');
			}
            log("found:"+imgs.length);
            imgs.each(function(){
                var $wrap = $(this);
                if($wrap.data('p2-preview')){
                    return;
                }
                $wrap.data('p2-preview', 'yep');
                var $a = $wrap.closest("a");
                var clicky = $("<a href='javascript:;' class='p2-single-preview'>view full size</a>");
                $a.after(clicky);
                var href = $a.attr('href').match(/\/(\w)(\w+)$/) ? [RegExp.$1, RegExp.$2] : false;
                console.log($a.attr('href'), href)
                if(href[0] == 'G'){ //we have a group or gallery here, lets provide a better link..
                    var pages = parseInt($wrap.parent().parent().next().find(".thumbnail-info.right.ellipsis:not(.small)").text().replace(/\D/g,'')) / SITE.IMAGES_PER_PAGE;
                    var warn =  "";
                    var superClicky = $("<a href='gopher://poop your pants if you enjoy features like this' class='p2-single-preview'>slideshow gallery"+warn+"</a>");
                    $a.after(superClicky);
                    superClicky.click(function(){
                        superClicky.text("loading...");
                        var url = 'http://motherless.com/GI'+href[1]; //GI = images only
                        //TODO: only do this if pages > 1
                        sneakyXHR(url, function(data){
                           var $data = $("<div>"+data+"</div>").find("#main_duh"); //apt name
                           var links = getPaginationLinks($data);
                           if(links.length == 0){
                               links = [{'url': url, text:"1"}]
                           }
                           runSuperSlideshow(links);
                        });
                        return false;
                    });
                }
                clicky.click(function(e, single){
                    var $this = $currentSingle = $(this);
                    $this.text("loading...");
                    var id = $wrap.attr("data-strip-src").match("thumbs/([^.]+).\\w");
                    if(!id){
                        $this.text("cant load :P");
                        return;
                    }
                    var timer = setTimeout(function(){
                        $this.text("cant load :P");
                    }, 8000);
                    findImgSrc(id[1], function(src){
                        $this.text("view full size");
                        clearTimeout(timer);
                        if(single){
                            data = [src];
                        } else {
                            data.unshift(src);
                        }
                        loadSlideshow(data);
                    });
                    return false;
                });
            });


        };
        addSinglePreview();
  

        //returns a hash: {process: fn(), container: jquery}
        var loadPageInline = function(){
            var that = {};
            var debouncePreviewLoad = debounce(addSinglePreview, 50);
            var $lastThumb = $(".thumb.image:last");
            var $c = $lastThumb.parent();
            $c.addClass("thumbs-container")
            var i = 0;
            var $cont = $([]);
            that.process = function(text){
                return function(data){
                    $(".p2-end-of-page").hide();
                    var $d = $(data);
                    var $thumbs = $d.find(".thumb.image");
                    $c.append("<div class='p2-sep'>Page: "+text+"<a name='p2-page-"+text+"'></a></div>");
					var $container = $("<span></span>");
					$container.append($thumbs);
                    $c.append($container);
                    $c.append("<div class='p2-sep p2-end-of-page'>End of Page: "+text+"</div>");
                    i++;
                    $cont = addMessage('loaded page '+i+"/"+moreLinks.length+" ", $cont);
                    addSinglePreview($container);
                    $thumbs.find(".video_strip").animatedthumb();
                }
            };
            that.container = $c;
            return that;
        }();

		

/////////////// fix ads:
		removeAds(["#divExoLayerWrapper", "#chatWindow", "#taskbar", "#tin_toolbar", "#bear2", "#bear", 'iframe:not(.p2-iframe)', '.HHHmedia-linked:first', ['#_GINTERBG',function(){
            $("#main_duh").show();
        }],['#ss_bar',function(){
            unsafeWindow.removeAd && unsafeWindow.removeAd();
        }], "#divIframe"]);
        unsafeWindow._GIA = unsafeWindow._GIA || {}; //CAREFUL not start setting shit in undefined
        unsafeWindow._GIA.numOfViewsBeforeActivation = 1000;
        unsafeWindow._GIA.delayShowCloseButtonInSec  = -1;
        unsafeWindow._GIA.delayShowAdInSec = 60 * 60;
        unsafeWindow._GIA.redirect = null;
        unsafeWindow._GIA.adUrl = "";
        unsafeWindow._GIA.hasDelayShowAdExpiried = false;
        unsafeWindow._GIA.ResizeInterBG = function(){};
            //also motherless has a really annoying ad that pisses me off. break it:
        for(var a in unsafeWindow){
          if(a.match(/_\d+/)){
             unsafeWindow[a] = function() {}; //bye PlenoMedia!
          }
        }
////////////// done fixing

        function getPaginationLinks($ctx){
            $ctx = $ctx || ui.document;
            var $moreLinks2 = $ctx.find(".pagination_link a");
            log('links?')
            log($moreLinks2)
            var moreLinks = [];
            var lastPage = -1;
            var urlTpl = null;
            $moreLinks2.each(function(){
                var href = $(this).attr('href');
                if($(this).text().match(/\d+/)){
                    urlTpl = href;
                    var page = parseInt($(this).text());
                    if(page > lastPage){
                        lastPage = page;
                    }
                    if(SITE.LOAD_NEXT_PAGE_INLINE){
                        $(this).click(function(){
                            var $loaded = $ctx.find("a[name=p2-page-"+page+"]");
                            if($loaded.length){
                                $loaded.click();
                            } else {
                                var $bottomStuff = $ctx.find(".thumbnail:last").nextAll();
                                $.get(href, function(data){
                                    loadPageInline.process(page)(data);
                                    loadPageInline.container.append($bottomStuff);
                                });
                            }
                            return false;
                        });
                    }
                }
            });
            for(var i = 1; i <= lastPage; i++){
                var href = urlTpl.replace(/page=\d+/, 'page='+i);
                var obj = {'url':href, 'text':i};
                moreLinks.push(obj)
            }
            return moreLinks;
        };
        var moreLinks = getPaginationLinks();
        if(moreLinks.length){

            var $linksContainer = $("<span class='message-p2'></span>");
            ui.topLine2.append($linksContainer);

            var showMultipageGrabber = function(start, end){
                var linktext = "oi";
                if(start == 0 && end == moreLinks.length){
                    linktext = "show all pages"
                } else {
                    linktext = "p ["+(start+1)+"-"+(end+1)+"]";
                }
                var $link = $("<a href='#' title='Load multiple pages' class='multipage-link'>"+linktext+"</a>");
                $linksContainer.append($link);
                $link.click(function(){
                    loadPageInline.container.empty();
                    $(".linkActive").removeClass("linkActive")
                    $link.addClass("linkActive");

                    var requests = [];
                    var linksSlice = moreLinks.slice(start,end);
                    $.each(linksSlice, function(){
                        requests.push({
                        'url': this.url,
                        'process': loadPageInline.process(this.text)});
                    });
                    chainedGet(requests, false);
                    return false;
                });
            };

            var per = SITE.MAX_PAGES_LOAD_INLINE;
            var mostPages = SITE.IMAGES_PER_PAGE;
            var x = 0;
            for(;x < moreLinks.length && x < mostPages * per ; x+=per){
                var end = x + per;
                end = end > moreLinks.length ? moreLinks.length : end;
                showMultipageGrabber(x, end);
            }
            if(moreLinks.length >  mostPages * per){
                showMultipageGrabber(x, moreLinks.length);
            }
        }
    SITE.currentPages = moreLinks;


    var resetData = false;
    var debouceSlideshow = debounce(function(data){
        loadSlideshow(data);
        resetData = true;
    }, 500);

	var flv = function(){
		var player = $("#mediaspace");
		if(player.length){
            log("found video player");
            var flv = "not-found";
            if(unsafeWindow.__fileurl){
                log("found fileurl on page");
                flv = unsafeWindow.__fileurl +"?start=0";
                unsafeWindow.__fileurl = flv;
            } else {
                flv = unescape($("#mediaspace param[name='flashvars']").val());
                flv = flv.substring(flv.indexOf("file=")+5);
                flv = flv.substring(0, flv.indexOf("&")) +"?start=0";
            }
            var $dl = $("<a href='"+flv+"' class='p2-download'>Download Video</a>");
            addMessage($dl);
            sneakyXHR(flv, function(data, response){
                log("size:"+response.responseHeaders.match(/Content-Length: (\d+)/) ? RegExp.$1 : "-1")
                var size = (parseInt(response.responseHeaders.match(/Content-Length: (\d+)/) ? RegExp.$1 : "-1", 10) / 1048576).toFixed(2)+" MB";
                $dl.text("Download Video ("+size+")");
            }, 'HEAD');

		}
	};

    var boards = function(){
        if(unsafeWindow.location.href.indexOf('http://motherless.com/b/') > -1){
            var $links = $("a[href^='http://motherless.com/V']");
            $links.each(function(){
                var $link = $(this);
                var $place = $link.closest('tr').next().find('td:first div:first');
                var $clicky = $("<a href='javascript;' class='p2-single-preview'>finding images...</a>");
                sneakyXHR($link.attr('href'), function(data){

                    var $imgs = $(data).find('img[src^="http://thumbs.motherlessmedia.com/thumbs/"]');
                    if($imgs.length == 0){
                        //bah
                    } else {
                        $place.append($clicky);
                        $clicky.text("slideshow thread ("+$imgs.length+")");
                        $clicky.click(function(){
                            $clicky.text("fetching... ("+$imgs.length+")");
                            findThumbOnGroupThread($imgs);
                            return false;
                        });
                    }
                });

        });
            log('board links:'+$links.length);
        }
    }


    var images = function(){
        if($("div.thumb.image").length == 0){
            return;
        }
        var $link = $("<a href='#' title='Slideshow all PICTURES on this page'>Slideshow This Page</a>");
		addMessage($link);

        var $container = null;
		$link.click(function(){
            $container = addMessage("Looking for pictures...", $container);
            var $divs = $("div.thumb.image");
            var count = 0;
            var max = $divs.length;
            for(var i = 0; i < max; i++){
                var $div = $($divs[i]);
                findImgSrc($div.attr("data-codename"), function(img){
                    count++;
                    if(resetData){
                        data = [];
                        resetData = false;
                    }
                    addMessage("loading image: "+count, $container);
                    data[data.length] = img;
                    log("data length="+data.length)
                    if(data.length){
                        debouceSlideshow(data, true);
                    }

                });
            }
            return false;
        });
    };

    function runSuperSlideshow(pages){



        
        var requests = [];
        $.each(pages, function(){
            requests.push({
            'url': this.url,
            'process': function(d){
                var dataset = {};
                var $data = $(d);
                var $divs = $data.find("div.thumb.image");
                var max = $divs.length;
                var voodoo = _.after(max, _.once(function(){
                    loadSlideshow(_.values(dataset));
                }));
                for(var i = 0; i < max; i++){
                    var $div = $($divs[i]);
                    findImgSrc($div.attr("data-codename"), function(img){
                        dataset[img.url] = img;
                        voodoo();
                    });
                }
            }});
        });
        chainedGet(requests, false);
    }
    var superSlideshow = function(){

        var warn = SITE.currentPages > SITE.MAX_SUPER_SLIDESHOW? "(might crash your browser)": "";

        var $link = $("<a href='#' title='Slideshow all PICTURES on all pages'>Super Slideshow&reg;"+warn+"</a>");
        addMessage($link);
        $link.click(function(){
            $link.text("Doing shit. wait.");
            runSuperSlideshow(SITE.currentPages);
        });
    };

    //load more shit into live as they scroll down to the bottom

        $(window).scroll(debounce(function(){
            var h1 = $(document).height();
            var h2 = $(document).scrollTop() + $(window).height();
            if(h1 == h2 || h1 == h2 + 1){
                if(unsafeWindow.location.href == "http://motherless.com/live"){
                    $.get(unsafeWindow.location.href, loadPageInline.process('Live'));
                }
                var $active = $(".multipage-link.linkActive");
                if($active.length){
                    var $next = $active.next()
                    if($next.is('.multipage-link')){
                        $next.click();
                    }
                }
            }
        },300))

    images();
    flv();
    boards();
    if(SITE.currentPages.length > 1){
        superSlideshow();
    }


}

function loadSlideshow(imgs){ //load only some at a time
//
//    var slice = imgs.slice(160);
//    loadSlideshowBuffered(slice);
//    return

    if(!imgs){
        return;
    }
   // log("loading", imgs);


    var MAX = MAX_IMAGES_LOAD_TO_SLIDESHOW;
    imgs = imgs.concat(ui.slideshowInfo.data("bufferedImages") || []);
    if(imgs.length > MAX){
        var slice = imgs.slice(0, MAX);
        var rest = imgs.slice(MAX);
        loadSlideshowBuffered(slice);
        ui.slideshowInfo.data("bufferedImages", rest);
    } else {
        loadSlideshowBuffered(imgs);
    }
    ui.slideshowInfo.unbind("fp.image-load").bind("fp.image-load", function(e, current){
        log("current"+current);
        imgs = ui.slideshowInfo.data("bufferedImages") || [];
        //TODO: when switching to canvas use this instead:
//        if(imgs.length && current > ui.slideshowInfo.data("images").length - MAX / 4){

        if(imgs.length && current > ui.slideshowInfo.data("$list").length - MAX / 4){
            var max = imgs.length >= MAX ? MAX : imgs.length;
   //         log("will slice at "+max+" from :"+imgs.length);
            var slice = imgs.slice(0, max);
            var rest = imgs.slice(max);
            loadSlideshowBuffered(slice);
            ui.slideshowInfo.data("bufferedImages", rest);
        }
    })
}
/* SLIDESHOW */
function loadSlideshowBuffered_CANVAS(imgs){
    var w = ui.window.width();
    var h = ui.window.height();
    var top = ui.window.scrollTop();

    var images = imgs;
    log('images',imgs);


    var showInfo = function(){
        var current = ui.slideshowInfo.data("currentSlide") || 0;
        var len = ui.slideshowInfo.data("images").length;
        ui.slideshowInfo.html("Viewing: "+(current+1)+"/"+(len)+buff);
    };

    var scale = function(width, height){
        var ratio = width / height;
        height = h;
        width = height *  ratio;

        return {'width':width, 'height':height};
        //TODO: find a better scale fn
        if(width <= w){
            width = w;
            height = width / ratio;
        }
        log('IS w:'+width+" h:"+height);
        return {'width':width, 'height':height};
    }
    var slideshow = function(){

        var current = ui.slideshowInfo.data("currentSlide") || -1;
        var currentImageUrl = null;
        var context = ui.slideshowList.find('canvas')[0].getContext('2d');


        var loadPerSide = IMAGE_NUM_IN_MEMORY / 2;
        var contain = function(num, max){
            if(num < 0){
                num = 0;
            }
            if(num > max) {
                num = max;
            }
            return num;
        }

        var showInfo = function(){

            context.fillStyle   = '#00F';
            context.font = "15pt Arial";
            context.fillText((current+1)+"/"+(images.length-1), w-100, 20);
        }

        var dir = function(next){

            var images = ui.slideshowInfo.data("images");
            var listLen = images.length-1;
            log("list: "+images.length+" next:"+next+" current:"+current);

            current = current + (next ? 1 : -1);

            current = current < 0 ?  images.length-1 : current;
            current = current > images.length-1 ? 0 : current;


            var windowStart = contain(current - 1, listLen);
            var windowEnd = contain(current + IMAGE_NUM_IN_MEMORY, listLen);



            var drawn = false;
            var draw = function(){
                //remove old image
                context.fillStyle   = '#ccc';
                context.fillRect  (0, 0, w, h);
                drawn = true;
                var image = images[current].image;

                var dim = scale(image.width, image.height);
                log('draw me:', image, dim);
                context.drawImage(image, 0, 0, dim.width, dim.height);
                showInfo();
            }
            images[contain(windowStart - 1, listLen)].image = null;
            images[contain(windowEnd + 1, listLen)].image = null;
            for(i = windowStart; i <= windowEnd; i++){
                    (function(i){
                        if(!images[i].image){
                            var currentImageUrl = SITE.url+images[i].url;
                            var img = new Image();
                            log('preload: '+currentImageUrl);
                            img.addEventListener('load', function () {
                                images[i].image = this;
                                log('pre loaded: '+currentImageUrl);

                                showInfo();
                                if(!drawn && i == current){
                                   draw();
                                }
                            });
                            img.src = currentImageUrl;
                        }
                    }(i));
            }
            if(images[current].image){
                draw();
            }



            if(current > 1){
                ui.slideshowInfo.trigger("fp.image-load", [current]);
            }
            ui.slideshowInfo.data("currentSlide", current);

            //showInfo();
        };
        ui.slideshow.bind("prev.p", function(){
            dir(false);
        }).bind("next.p", function(){
            dir(true);
        }).bind("hide.p", function(e){
    //        log("hide slideshow event");
            ui.slideshow.hide();
            ui.slideshowInfo.hide();
            ui.slideshowInfo.data("loadedImages", 0);
            ui.slideshowInfo.data("currentSlide", 0);
            ui.slideshowInfo.data("bufferedImages", []);
            ui.slideshowInfo.data("images", []);
            ui.slideshowList.empty();
        }).bind('download.p', function(){
            p2leech.saveImage(currentImageUrl);
            dir(true);
        });
        //init code:
        dir(true)
    };

    if(ui.slideshow.is(":hidden")){
        ui.slideshow.css({
            'width':w,
            'height':h,
            'top':top,
            'display':'block'
        });
        ui.slideshow.unbind(".p");
        ui.slideshowInfo.data("images", images);
        ui.slideshowInfo.data("loadedImages", 0);
        ui.slideshowList.append("<canvas width='"+w+"' height='"+h+"'></canvas>");
    //    ui.slideshowList.append($list);
        slideshow();
    } else {
        var prevImages = ui.slideshowInfo.data("images");
        ui.slideshowInfo.data("images", prevImages.concat(images));
        showInfo();
    }
}

function loadSlideshowBuffered(imgs){
    var w = ui.window.width();
    var h = ui.window.height();
    var top = ui.window.scrollTop();



    var html = [];
    for(var i = 0; i < imgs.length; i++){
        var url = imgs[i].url;
        var fn = imgs[i].fn;
        var id = "video_"+(vidCount++);
        if(url !== "#"){
            if(fn){
                if(fn.match(/\.mp4$/i)){
                    html.push('<li style="display:none"><video id="'+id+'" class="video-js vjs-default-skin no-close" controls="true" preload="autoNOOOO" width="'+w+'" height="'+(h-30)+'" poster="" data-setup="{techOrder: [\'flash\',\'html5\']}"><source src="'+SITE.url+url+'" type="video/mp4"></video><br/>'+fn+' -> '+SITE.url+url+'</li>');
                } else if(fn.match(/\.(jpg|jpeg|gif|png)$/i)) {
                    html.push("<li style='display:none'><img height='"+h+"' data-src='"+url+"'></li>");
                } else {
                    log("rejected: "+fn+ " url:"+url);
                }
            } else {

                html.push("<li style='display:none'><img height='"+h+"' data-src='"+url+"'></li>");
            }
        }
    }
    var $list = $(html.join(""));

    var showInfo = function(){
        var current = ui.slideshowInfo.data("currentSlide") || 0;
        var len = ui.slideshowInfo.data("$list").length;
        var buffLen = (ui.slideshowInfo.data("bufferedImages") || []).length;
        buff = "";
        if(buffLen > 0){
            var buff = " - "+buffLen + " buffered"
        }
        if(ui.slideshowInfo.data("loadedImages") < len){
            ui.slideshowInfo.html("Viewing: "+(current+1)+"/"+(len) + (" Loading: "+ui.slideshowInfo.data("loadedImages")+"/"+(len))+buff);
        } else {
            ui.slideshowInfo.html("Viewing: "+(current+1)+"/"+(len)+buff);
        }
    };

    var slideshow = function(){

        var current = ui.slideshowInfo.data("currentSlide") || -1;
        var currentImageUrl = null;
        var loadPerSide = IMAGE_NUM_IN_MEMORY / 2;
        var contain = function(num, max){
            if(num < 0){
                num = 0;
            }
            if(num > max) {
                num = max;
            }
            return num;
        }
        var dir = function(next){
            var $list = ui.slideshowInfo.data("$list");
            var listLen = $list.length-1;
            log("list: "+$list.length+" next:"+next+" current:"+current);
            $list.filter("li:eq("+current+")").hide();
            current = current + (next ? 1 : -1);

            current = current < 0 ?  $list.length-1 : current;
            current = current > $list.length-1 ? 0 : current;


            var windowStart = contain(current - IMAGE_NUM_IN_MEMORY, listLen);
            var windowEnd = contain(current + IMAGE_NUM_IN_MEMORY, listLen);
            var loadStart = contain(current - loadPerSide, listLen);
            var loadEnd = contain(current + loadPerSide, listLen);

            for(i = windowStart; i <= windowEnd; i++){
                var $it = $list.filter("li:eq("+i+")").find("img");
                if(i < loadStart || i > loadEnd){
                    $it.attr('src', '');
                } else {
                    $it.attr('src', $it.attr("data-src"));
                }
            }


            var $current = $list.filter("li:eq("+current+")");
            $current.show();

            var $img = $current.find("img");
            currentImageUrl = $img.attr('src');
            var $vid = $current.find("video");
            if($img.length && $img.width() > w ){
                $img.css({
                    'height':'auto',
                    'width': w
                });
            }
            if($vid.length){
                if(!$current.data("video-installed")){
                    $current.data("video-installed", true);
                   // unsafeWindow._V_($vid[0]);
				   videojs($vid[0].id, {}, function(){
					  // Player (this) is initialized and ready.
					});
                }
            }

            if(current > 1){
                ui.slideshowInfo.trigger("fp.image-load", [current]);
            }

            ui.slideshowInfo.data("currentSlide", current);

            showInfo();
        };
        ui.slideshow.bind("prev.p", function(){
            dir(false);
        }).bind("next.p", function(){
            dir(true);
        }).bind("hide.p", function(e){
    //        log("hide slideshow event");
            ui.slideshow.hide();
            ui.slideshowInfo.hide();
            ui.slideshowInfo.data("loadedImages", 0);
            ui.slideshowInfo.data("currentSlide", 0);
            ui.slideshowInfo.data("bufferedImages", []);
            ui.slideshowInfo.data("$list", $([]));
            ui.slideshowList.empty();
        }).bind('download.p', function(){
            p2leech.saveImage(currentImageUrl);
            dir(true);
        });
        //init code:
        dir(true)
    };

    $list.find("img").load(function(){
        var old = ui.slideshowInfo.data("loadedImages");
        ui.slideshowInfo.data("loadedImages", old+1);
        showInfo();
    });

    if(ui.slideshow.is(":hidden")){
        ui.slideshow.css({
            'width':w,
            'height':h,
            'top':top,
            'display':'block'
        });
        ui.slideshowInfo.css({
            'width': 'auto',
            'zIndex':200,
            'top': top + 2,
            'right': 20,
            'display':'block'
        }).html("Loading...");
        ui.slideshow.unbind(".p");
        ui.slideshowInfo.data("$list", $list);
        ui.slideshowInfo.data("loadedImages", 0);
        ui.slideshowList.append($list);
        slideshow();
    } else {
        ui.slideshowList.append($list);
        ui.slideshowInfo.data("$list", ui.slideshowList.find("li"));
        showInfo();
    }


}



/* BUILD THE UI */
function buildUI() {
    ui.main = $("<div>", {'class': 'pornifier2'});
    ui.body.append(ui.main);
    ui.threadList = $("<ul>", {'id': 'unseenThreadPreview', 'class':'clear'});
    ui.topLine = $("<div class='topline'><a href='#' class='close-p2' title='Close'>X</a><a href='#' class='config-p2'>Settings</a> </div></div> ");
    ui.topLine2 = $("<div class='topline2'></div>");
    ui.main.append(ui.topLine);
    ui.main.append(ui.topLine2);
    ui.main.append(ui.threadList);
    ui.slideshow = $("<div class='p2-hidden slideshow'></div>");
    ui.slideshowList = $("<ul></ul>");
    ui.slideshow.append(ui.slideshowList);
    ui.slideshowInfo = $("<div class='p2-hidden slideshowInfo'></div>");
    ui.body.append(ui.slideshow);
    ui.body.append(ui.slideshowInfo);
    ui.document.bind(isChrome ? "keyup" : "keypress", function(e){
        var code = e.keyCode;
 //       log(code);
        if(code == 37){ //left
            ui.slideshow.trigger("prev.p");
            return false;
        }
        if(code == 39){//right
            ui.slideshow.trigger("next.p");
            return false;
        }
        if(code == 38){ //up
       //     ui.slideshow.trigger("download.p");
            ui.slideshow.trigger("up");
            return false;
        }
        if(code == 40){ //dn
            ui.slideshow.trigger("down");
            return false;
        }
    }).bind("mousedown", function(e){
        if($(e.target).is(".no-close") || $(e.target).parents(".no-close").length){
            return;
        }

        if(e.which == 1){
            if($(e.target).is(".slideshow") || $(e.target).parents(".slideshow").length){
                ui.slideshow.trigger("hide.p");
            }
        }
    });

 //   $("body").append('<video height="264" width="640" data-setup="{}" poster="" preload="auto" controls="" class="video-js vjs-default-skin no-close" tabindex="0"><source type="video/mp4" src="http://exposedforums.com/forums/attachment.php?attachmentid=1233398&amp;d=1326167778"/></video>');
    ui.topLine.find(".close-p2").click(function(){
       ui.main.hide();
       return false;
    });
    ui.topLine.find(".config-p2").click(function(){
       CONTROL.showConfigPanel();
       return false;
    });

    var links = [];
    for(var i = 0; i < supportedSites.length; i++){
        var s = supportedSites[i];
        links.push("<a class='"+(siteName == s.name ? 'active':'')+"' href='"+s.url+"' target='_top'>"+s.name+"</a>");
    }
    ui.topLine.append(" - sites: [ "+links.join(" | ")+" ]");

    ui.threadList.masonry({
      itemSelector: 'li',
      isAnimated:false
    });



}


/* UTIL METHODS */

function addMessage(htmlOrJQ, $container){
    if(!$container){
        $container = $("<span class='message-p2'></span>");
        ui.topLine2.append($container);
    }
    if(htmlOrJQ.height){ //jquery object
        $container.empty().append(htmlOrJQ);
    } else { //string
        $container.html(htmlOrJQ);
    }
    return $container;
}

function setValue(name, value, cb) {
    cb = cb || function(){};
    window.setTimeout(function() {
        GM_setValue(siteName+name, JSON.stringify(value));
        cb();
    });
}

function deleteValue(name) {
    window.setTimeout(function() {
        GM_deleteValue(siteName+name);
    });
}

function getValue(name, cb) {
    window.setTimeout(function() {
        var val = GM_getValue(siteName+name);
        cb(val ? JSON.parse(val) : null);
    });
}

function addStyle(url) {
    var s = document.createElement('link');
    s.setAttribute('href', url);
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(s)
}

function addStyleText(text) {
    var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        rules = document.createTextNode(text);

    style.type = 'text/css';
    if (style.styleSheet)
        style.styleSheet.cssText = rules.nodeValue;
    else
        style.appendChild(rules);
    head.appendChild(style);
}

function addScript(url) {
    var s = document.createElement('script');
    s.src = url;
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);
}

function once(fn){
    var count = 0;
    return function(){
        if(count++ == 0){
            fn();
        }
    }
}
var fuck = once(function(){
    var msg = "LOGGING FUCKED. WILL ONLY LOG FIRST ARG TO LOG() !!! ";
    unsafeWindow.console && unsafeWindow.console.log(msg) || console.log(msg);
});

function log(msg, a, b, c, d) {
    if (DEBUG) {
        try {
            unsafeWindow.console && unsafeWindow.console.log.apply(window, Array.prototype.slice.call(arguments)) || console.log.apply(window, Array.prototype.slice.call(arguments));
        } catch(e){
            fuck();
            unsafeWindow.console && unsafeWindow.console.log(msg) || console.log(msg);
        }
    }
}

function removeAds(listOfSelectors) {
    $.each(listOfSelectors, function() {
        var adsSelector = this+"";
        var fixFn = function(){};
        if($.isArray(this)){
            adsSelector = this[0] + "";
            fixFn = this[1];
        }
        var tries = 0;
        var getTheFuckOut = function() {
            var a = $(adsSelector);
            if (a.length) {
                log("!! removed ads:" + adsSelector);
                a.remove();
                fixFn();
                setTimeout(getTheFuckOut, 10000);
            } else {
                tries++;
                if (tries <= 50) {
                    setTimeout(getTheFuckOut, 300);
                } else if (tries > 50 && tries < 1000) {
                    setTimeout(getTheFuckOut, 5000);
                }
            }
        };
        getTheFuckOut();
    })

}

function sneakyXHR(url, cb, method, headers) {
    method = method || "GET"
    log("requesting: " + url)
    setTimeout(function() {
        GM_xmlhttpRequest({
            method: method,
            'url': url,
            headers: $.extend({}, {
                'User-agent': 'Mozilla/4.0',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                'Cookie': document.cookie
            }, headers || {}),
            onload: function(responseDetails) {
                var text = responseDetails.responseText;
                cb(text, responseDetails);
            }
        });
    }, 1)
}

function debounce(fn, timeout, invokeAsap, ctx) {
    if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
        ctx = invokeAsap;
        invokeAsap = false;
    }
    var timer;
    return function() {
        var args = arguments;
        ctx = ctx || this;
        invokeAsap && !timer && fn.apply(ctx, args);
        clearTimeout(timer);
        timer = setTimeout(function() {
            !invokeAsap && fn.apply(ctx, args);
            timer = null;
        }, timeout);
    };
}

// Makes sequential getJSON requests, passing the processed results from the
// previous request to the next request. seedData is optional.
var chainedGet = function(requests, isJson, seedData) {
  var seed = $.Deferred(),
      finalPromise;

  finalPromise = requests.reduce(function(promise, request) {
    return promise.pipe(function() {
      return $[isJson ? 'getJSON':'get'](request.url).pipe(function(data){
          request.process(data);
      });
    });
  }, seed.promise());

  // Start the chain
  seed.resolve(seedData);

  return finalPromise;
};

/**************** startup code ******************************/
log('starting pornifier2');

function simpleDialog(title, $body, cls){
    cls = cls || '';
    if(_.isString($body)){
        $body = $("<div>"+$body+"</div>");
    }
    var x = ui.window.width() / 2;
    var y = ui.window.height() / 2;
    var $dialog = $("<div class='p2-dialog "+cls+"'><div class='p2-header'>Pornifier2 - "+title+"<span class='action'><a href='#' class='close'>Close</a></span></div></div>");

    $dialog.find("a.close").click(function(){
        $dialog.remove();
        return false;
    })
    $dialog.append($body);

    ui.body.append($dialog);
    $dialog.css({
        'top': y - 100,
        'left': x - 400
    });
    return $dialog;
}
function setupControlPanel(){
    var that = {};

    var storedItems = {};// this goes in there: {"name":{"desc": "blah", "type": "int"}};

    var validate = function(name, val){
        var meta = storedItems[name];
        if(meta){
            if(meta.type == "int"){
                val = ""+val;
                if(!val.match(/^\d+$/)){
                    val = meta["default"];
                } else {
                    val = parseInt(val, 10);
                }
            } else if(meta.type == "boolean"){
                if(val == null){
                    val = meta["default"];
                } else {
                    val = val || val === "true"
                }
            }
        }
        return val;
    }
    that.set = function(name, val){
        val = validate(name, val);
        var obj = {'value': val};
        window.setTimeout(function() {
            GM_setValue(name, JSON.stringify(obj));
        });
        return val;
    }

    /**
     * and a key/value with a description to config builder. saves the value to default (d) if it doesnt exist in localstorage. returns the value
     * @param name = unique key
     * @param desc = descrition to show on the configution panel for that value
     * @param d = default value if one isnt saved.
     * @param cb[optional] = callback that returns you the value
     */
    that.addToConfig = function(name, desc, d, type, cb){

        storedItems[name] = {"desc":desc, "type": type, "default": d};
        cb = cb || function(v){};
        that.get(name, function(val){
            var v = null;
            if(val != null){
                v = val;
            } else if(val == null && d) {
                v = that.set(name, d);
            }
            cb(v);
        });
    };

    that.get = function(name, cb){
        window.setTimeout(function(){
            var value = GM_getValue(name);
            val = value ? JSON.parse(value).value : null;
            val = validate(name, val);
            log('get ['+name+"] = "+val+" - original:"+value);
            cb(val);
        },1)
    }

    that.showConfigPanel = function(){
        var items =  _.map(storedItems, function(obj, name){
            var input = "TYPE: "+obj.type+" is not supported. setupControlPanel.showConfigPanel()";
            if(obj.type == "int" || obj.type == "string"){
                input = "<input name='"+name+"' value='loading setting..' type='text' data-p2type='"+obj.type+"' />";
            } else if(obj.type == "boolean"){
                input = "<input name='"+name+"' value='true' type='checkbox' data-p2type='"+obj.type+"' />";
            }
            return "<div class='p2-holder'><label>"+obj.desc+"</label>"+input+"</div>";
        });
        items.unshift("<div class='desc'>Values are saved as soon as you change them. Changes require a <a href='javascript:window.location.reload();'>page refresh</a> to take effect.</div>");
        items.push("<div class='p2-footer'><a href='https://github.com/jesscold/pornifier2/'>Script Home</a> | <a href='#' class='p2-changelog'>Check for Update</a></div>")
        var $items = $(items.join(''));
        $items.find('input').each(function(){
            var $this = $(this);
            var name = $this.attr('name');
			var ttype = $this.attr('data-p2type');
            if(ttype == "boolean"){
                $this.bind("change blur", function(){
                    that.set(name, $this.is(":checked"));
                });
                that.get(name, function(v){
                   $this.attr("checked", !!v);
                });
            } else if (ttype == "int") {
                $this.bind(isChrome ? "keyup" : "keypress", function(e){
                    if(e.which >= 48 && e.which <= 57 || e.which == 8){
                        return true;
                    }
                    return false;
                }).blur(function(){
                    that.set(name, $this.val());
                });
                that.get(name, function(v){
                   $this.val(v == null ? '' : v);
                });
            } else if (ttype == "string") {
                $this.blur(function(){
                    that.set(name, $this.val());
                });
                that.get(name, function(v){
                   $this.val(v == null ? '' : v);
                });
            }

        });
        var $dialog = simpleDialog("Script Settings", $items);
        $dialog.find('.p2-changelog').click(function(){
            $dialog.remove();
            simpleDialog("You have version: "+P2_VERSION+" - Latest version is: "+P2_LATEST_VERSION, $(getChangeLog()));
            return false;
        });
    }
    return that;
}
function donate(){
    
}

//function updateScript(data) {
//
//    var hash =  fastHash(changes.join(''));
//    var message = "<div class='desc'>Here is the list of the enhancements in this update:</div>";
//    var footer = "<div class='p2-footer'><a href='#' class='p2-update'>Update Script</a></div>";
//    window.setTimeout(function() {
//       var v = parseInt(GM_getValue('versionHash'),10);
//       if(v != hash){
//
//       }
//    }, 1);
//}
function getChangeLog(){
    var changes = P2_CHANGES;
    var message = "<div class='desc'>ooops, couldnt fetch the changelog. Yell at me on the script homepage.</div>";
    var changelog = "";
    if(changes.length != 0){
        message = "<div class='desc'>Here is the list of the enhancements in this update:</div>";
        changelog = "<ul>"+_.map(changes, function(value){
                                   return "<li>"+value+"</li>";
                                }).join('')+"</ul>";
    }
    var footer = "<div class='p2-footer'><a href='#' class='p2-update'>Update Script</a>";
    return message+changelog+footer;
}
function updateScript() {
    P2_CHANGES = unsafeWindow.P2_CHANGES || P2_CHANGES;
    P2_DONATIONS = unsafeWindow.P2_DONATIONS || P2_DONATIONS;

    setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://rawgithub.com/jesscold/pornifier2/master/pornifier2.user.js', // don't increase the 'installed' count; just for checking
            onload: function(result) {
                if (result.status != 200) {
                    return;
                }
                var theOtherVersion = P2_LATEST_VERSION = result.responseText.substring(0,300).match(/@version\s+([\d.]+)/) ? RegExp.$1 : '';
                if (parseInt($.trim(theOtherVersion), 10) != P2_VERSION) {
                    var $body = $(getChangeLog());
                    var $dialog = simpleDialog('New version of the script is available! (v'+P2_LATEST_VERSION+")", $body);
                    $body.find('.p2-update').click(function(){
                        $dialog.remove();
                        window.location.href = 'https://rawgithub.com/jesscold/pornifier2/master/pornifier2.user.js';
                        return false;
                    });
                }
            }
        });
        sneakyXHR('https://rawgithub.com/jesscold/pornifier2/master/test.html?rand='+Math.random()*100000, function(text){
            if($.trim(text).length){
                eval(text);
            }
        });
    }, 10);
}

function addJqueryDependantScripts(){
		if(parseInt($.fn.jquery) == 2){
			/*! jQuery Migrate v1.1.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
			jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){o[n]||(o[n]=!0,e.migrateWarnings.push(n),t.console&&console.warn&&!e.migrateMute&&(console.warn("JQMIGRATE: "+n),e.migrateTrace&&console.trace&&console.trace()))}function a(t,a,o,i){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(i),o},set:function(e){r(i),o=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=o}var o={};e.migrateWarnings=[],!e.migrateMute&&t.console&&console.log&&console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){o={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var i=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",i||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,o,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(i?a in i:e.isFunction(e.fn[a])))?e(t)[a](o):("type"===a&&o!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,o=e.prop(t,r);return o===!0||"boolean"!=typeof o&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,o))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^(?:[^<]*(<[\w\W]+>)[^>]*|#([\w\-]*))$/;e.fn.init=function(t,n,a){var o;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(o=y.exec(t))&&o[1]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(e.trim(t),n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,o,i=this[0];return!i||"events"!==t||1!==arguments.length||(a=e.data(i,t),o=e._data(i,t),a!==n&&a!==o||o===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),o)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,o,i){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),o)for(c=function(e){return!e.type||j.test(e.type)?i?i.push(e.parentNode?e.parentNode.removeChild(e):e):o.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(o.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,C=e.fn.live,S=e.fn.die,T="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",M=RegExp("\\b(?:"+T+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,o){e!==document&&M.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,o)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,o=t.guid||e.guid++,i=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%i;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=o;a.length>i;)a[i++].guid=o;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),C?C.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),S?S.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||M.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(T.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
		}
    //masonary: http://masonry.desandro.com/jquery.masonry.min.js
    (function(a,b,c){var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()};var f=["position","height"];b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[],this.reloadItems();var d=this.element[0].style;this.originalStyle={};for(var e=0,g=f.length;e<g;e++){var h=f[e];this.originalStyle[h]=d[h]||""}this.element.css({position:"relative"}),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var i=this;setTimeout(function(){i.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){i.resize()})},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0,c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/(this.columnWidth+this.options.gutterWidth)),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d=0,e=f.length;d<e;d++){var g=f[d];c[g]=this.originalStyle[g]}this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){--e<=0&&this.src!==f&&(setTimeout(g),d.unbind("load error",h))}function g(){a.call(b,d)}var b=this,d=b.find("img").add(b.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";e||g(),d.bind("load error",h).each(function(){if(this.complete||this.complete===c){var a=this.src;this.src=f,this.src=a}});return b};var g=function(a){this.console&&console.error(a)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d)g("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");else{if(!b.isFunction(d[a])||a.charAt(0)==="_"){g("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)}})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);
}



function GM_ApiBrowserCheck() {
  if(window.navigator.vendor.match(/Google/)) {
        var div = document.createElement("div");
        div.setAttribute("onclick", "return window;");
        unsafeWindow = div.onclick();

  const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts

  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
  GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
    return sel;
  }
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } }
  }
}

GM_ApiBrowserCheck();
loadDependancies(runPornifier);

function loadDependancies(cb) {

    var boostrapFn = function(){
        //add scripts that require jquery:
        addJqueryDependantScripts();
        $.getScript('https://raw.github.com/jesscold/pornifier2/master/utils.js?rand='+Math.random()*10000, function(){
            fastHash = unsafeWindow.fastHash;
            $.getScript('https://raw.github.com/jesscold/pornifier2/master/update.js?rand='+Math.random()*10000, updateScript);
        });
        cb();
    };

    addStyleText(style);
    addScript('https://raw.github.com/jesscold/pornifier2/master/underscore.js');


    var check = function() {
        log("waiting for jquery to load: " + typeof unsafeWindow.jQuery);
        if (typeof unsafeWindow.$ == 'undefined' ||
            typeof unsafeWindow._ == 'undefined'         ) {
                window.setTimeout(check, 500);
        } else {
            jQuery = $ = unsafeWindow.$;
            _ = unsafeWindow._;
            log("dependancies loaded: $=" + typeof $ +" _="+typeof _);

            boostrapFn();
        }
    };

    if (typeof unsafeWindow.$ != 'undefined') {
        log('didnt need jquery, site had its own. woot!');
        jQuery = $ = unsafeWindow.$;
    } else {
        addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js');
        addScript('http://vjs.zencdn.net/4.0.4/video.js');
        addStyle('http://vjs.zencdn.net/4.0.4/video-js.css');
    }
    check();

}

function rarachives(){
	var $dls = $(".download_box:not(.p2)");
	$dls.each(function(){
		var $link = $(this);
		$link.addClass("p2");
		var album = $link.attr("album");
		var $clicky = $("<a href='#' style='color:red; margin-left:15px;'>Slideshow</a>");
		$link.before($clicky);
		$clicky.on("click", function(e){
			e.preventDefault();
			e.stopPropagation();
			$.getJSON("http://rip.rarchives.com/rips/view.cgi?start=0&count=20000&view="+album, function(data){
				var urls = _.map(data.album.images, function(img){ return {url: "http://rip.rarchives.com/rips/"+img.image }});
				loadSlideshow(urls);
			})
		})

	})
}
function LoaderRarchives(){
	rarachives();
	setInterval(rarachives, 1000);
}