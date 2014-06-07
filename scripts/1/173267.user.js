// ==UserScript==
// @name           Image Inliner / Imagehost Redirector [modded] 3
// @namespace      http://userscripts.org/users/423291
// @description    Just displays the large version of images from image hosters right in the page on hovering, automatically or on keypress.
// @include        http://*
// @include        file:///*
// @version        26.07.2013
// ==/UserScript==

// For original version see: http://userscripts.org/scripts/show/49757
// Full credits go to the original author: marrr

// modifications:
// - getLinkHref null paramter access check
// - autopager support (by reprocessing the inserted page, so click/hover event handlers are working)
// - "delayed" mode: full image inlining can be toggled by clicking. 
//   In the opposite to "click no preload" there is nothing done for images that are not inlined,
//   e.g. image hoster pages are not downloaded until really needed.
//   Advantage: less traffic/connections wasted, links don't timeout (see imagevenue direct links that become invalid pretty fast)
//   Drawback: slower
// - inlined image size not limited by CSS anymore
// - slightly different border coloring

// modifications for modded 2:
// - nothing! just updated the image host rules :)
// - Based on http://userscripts.org/scripts/show/98732 that is based on http://userscripts.org/scripts/show/49757

// modifications for modded 3:
// - nothing! just updated the image host rules :)
// - Based on http://userscripts.org/scripts/show/119998
//
//TODO:
//Make a test case for each image host.


var MODE = "hover no preload";
var CONSIDERLINKS = false;

// Thanks to downloadthemall.net for some of the following patterns

var imageHosters   = new Array();
var modifiedImages = new Array();

/* The fields of one image hoster declaration could be the following.
 *
 * There are two types of imagehoster-handling, both currently operate on the
 * URL of the link to the full-image page (that is, the X in <a href="X">...</a>).
 * The goal is to find/generate the link to the full image (or some intermediate page).
 *
 * "prefix":
 *    The name of this declaration. Most of the time this is just the imagehoster name.
 *    When you have multiple declarations of one hoster (e.g. for skipping ad-pages),
 *    append some meaningful suffix (e.g. "-ad").
 *
 * "match":
 *    This regular expression should match on the link URLs this imagehoster
 *    definition is designed for.
 *
 * "type":
 *  - redirector:
 *       Applies some basic regular expression replacement on the URL:
 *
 *       "pattern":     the part of the URL to replace with...
 *       "replacement": ...this
 *
 *       Standard javascript regular expression conventions apply.
 *
 *  - resolver:
 *       Downloads the target URL and applies some regular expression on the
 *       HTML code.
 *
 *       "finder":  the regular expression to find the required components of the image URL
 *       "builder": literal strings and placeholders {1},{2},{3}, which compose the final URL
 *
 * "onfail":
 *    The prefix of the imagehoster definition to apply, when parsing with the specified
 *    regular expression failes. One reason can be intermediate ad pages or some temporary
 *    failure of the imagehoster.
 *
 * "recursive":
 *    If this is set to true, the constructed target URL is not interpreted as the final
 *    image source URL but as an URL to another page, which then may contain the image.
 *    This is relevant for deterministic ad-pages like urlcash and linkbucks.
 *
 * "cookieName":
 *    As the current way of retrieving the pages does not activate the cookie system of FireFox,
 *    Image Inliner stores cookies sent by the page under this name in it's own data variables.
 *
 * You can test your regular expressions with RegExBuddy or this page:
 *   http://www.gskinner.com/RegExr/
 */


//////////// OBSOLETE? //////////////////////

addImageHoster({
	"type": "redirector",
	"prefix": "photo.net",
	"match": "^http://(?:[\\w\\d]+\\.)?photo\\.net/photodb/photo",
	"pattern": "^.*id=(\\d+).*$",
	"replacement": "http://gallery.photo.net/photo/$1-lg.jpg"
});

addImageHoster({
	"type": "resolver",
	"prefix": "multipic.de",
	"match": "^http://(?:[\\w\\d]+\\.)?multipic\\.de/image/",
	"finder": "id=\"viewing\".+?href=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "jpghost.pl",
	"match": "^http://(?:[\\w\\d]+\\.)?twitpic\\.com/[a-z0-9]{3,}$",
	"finder": "id=\"media-overlay\"(?:\\r|\\n|.)+?src=\"(.+?)\" alt=",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "instagram.com",
	"match": "^http://(?:[\\w\\d]+\\.)?(instagram.com|instagr.am)/p/",
	"finder": "class=\"photo\" src=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgur.com (simple)",
	"match": "^http://(?:[\\w\\d]+\\.)?imgur\\.com/[a-z0-9]{3,}$",
	"finder": "name=\"twitter:image\" value=\"(.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imgon.net / rapidjoy.com",
	"match": "^http://(?:[\\w\\d]+\\.)?(?:rapidjoy\\.com|imgon\\.net)/pm-",
	"pattern": "pm-(.*?).\\w+?$",
	"replacement": "di-$1.jpg"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imgnook.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imgnook\\.com/[a-z0-9]{3,}$",
	"pattern": "$",
	"replacement": ".jpg"
});

addImageHoster({
	"type": "resolver",
	"prefix": "postimage.org",
	"match": "^http://(?:[\\w\\d]+\\.)postimage\\.org/image",
	"finder": "img src='(.*?)'.*?alt=[\"']",
	"builder": "{1}"
});

addImageHoster({
	"type": "expander",
	"prefix": "imagearn.com galleries",
	"match": "^http://(?:[\\w\\d]+\\.)?imagearn\\.com/+gallery\\.php",
	"finder": "href=\"(image.php\\?id=.+?)\"",
	"generator": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagearn.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagearn\\.com/+image\\.php",
	"finder": "src=\"(http://img\\.imagearn\\.com/imags/[^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "jpghosting.com",
	"match": "^http://(?:[\\w\\d]+\\.)?jpghosting\\.com/showpic\\.php",
	"finder": "src=(\"|')?(.*?\/images\/.*?)\\1?>",
	"builder": "{2}"
});

/////////////////// END OBSOLETE ////////////////////////////

addImageHoster({
	"type": "resolver",
	"prefix": "zshare.net",
	"noFilter": true,
	"match": "^http://(?:[\\w\\d]+\\.)?zshare\\.net/image/",
	"finder": "src=\"(http://(?:[\\w\\d]+\\.)?zshare\\.net/(?:download|get)/.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "uploadhouse.com",
	"match": "^http://(?:[\\w\\d]+\\.)?uploadhouse\\.com/viewfile",
	"finder": "src=\"(.+?)\".+?id=\"dispImg\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "thumbsnap.com",
	"match": "^http://(?:[\\w\\d]+\\.)?thumbsnap\\.com/(?:f/)?[a-z0-9]{3,}$",
	"pattern": "\\.com(/f)?(/.+?)$",
	"replacement": ".com/i$2.jpg"
});

addImageHoster({
	"type": "redirector",
	"prefix": "theimghost.com",
	"match": "^http://(?:[\\w\\d]+\\.)?theimghost\\.com/\\?pm=",
	"pattern": "\\?pm=",
	"replacement": "?di=",
	"generateName": ".jpg"
});

addImageHoster({
	"type": "redirector",
	"prefix": "pixpipeline.com",
	"match": "^http://(?:[\\w\\d]+\\.)?pixpipeline\\.com/dt?/",
	"pattern": "/dt?/",
	"replacement": "/s/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagehousing.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagehousing\\.com/image",
	"finder": "media=(http.*?)'\\s*?,\\s*?'pinterest'",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picstation.net",
	"match": "^http://(.+\\.)?picstation\\.net/show-image",
	"finder": "href='(.+)?' title='Click here to see fullsize original image'",
	"builder": "{1}",
	"static": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "Picasa Web Albums",
	"match": "^https?://picasaweb.google.com/lh/photo/",
	"finder": "thumbnail\":\\[\\{\"url\":\"(.+?/I/.+?)\"",
	"builder": "{1}",
	"decode": true,
	"useDefaultClean": false
});

addImageHoster({
	"type": "resolver",
	"prefix": "pic-upload.de",
	"match": "^http://(?:[\\w\\d]+\\.)?pic-upload\\.de/view-",
	"finder": "class='preview_picture.*?src='(.+?)'",
	"builder": "{1}",
	"gone": "existiert nicht",
	"static": true
});

addImageHoster({
	"type": "redirector",
	"prefix": "imagilive.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagilive\\.com/affiche/",
	"pattern": "/affiche/(.*?).html?$",
	"replacement": "/$1"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagetwist.com",
	"match": "^http://(.+\\.)?imagetwist\\.com/.*?/.*?\\.html?$",
	"finder": "src=\"(.+?)\" class=\"pic\" alt=\"(.+?)\"",
	"builder": "{1}",
	"namer": "{2}",
	"static": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageno.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imageno\\.com/.*pic\\.html$",
	"finder": "name='user_image' src='(.+?)'",
	"builder": "{1}",
	"useServerName": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "pixentral.com",
	"match": "^http://(?:[\\w\\d]+\\.)?pixentral\\.com/show\\.php",
	"finder": "img src=\"(.+?)\" width=",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagegecko.de",
	"match": "^http://(?:[\\w\\d]+\\.)?imagegecko\\.de/index\\.php\\?",
	"finder": "href=\"(h.+?)\".*?rel=\"lytebox",
	"builder": "{1}",
	"static": true
});

addImageHoster({
	"type": "expander",
	"prefix": "imagefap.com gallery",
	"match": "^http://.*imagefap\\.com/(?:gallery|pictures)",
	"finder": "href=\"(.*?/photo/.*?)\"",
	"generator": "{1}"
});

addImageHoster({
	"type": "expander",
	"prefix": "imagecargo.com gallery",
	"match": "^http://(?:[\\w\\d]+\\.)?imagecargo\\.com/view/gallery/",
	"finder": "href='(/view/image/.+?)'",
	"generator": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagecargo.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagecargo\\.com/view/image/",
	"finder": "href='(.+?)'.*?Save Image",
	"builder": "{1}",
	"cleaners": [{"pattern": ".ImageCargo.com._", "replacement": ""}]
});

addImageHoster({
	"type": "redirector",
	"prefix": "hostpicture.eu",
	"match": "^http://(?:[\\w\\d]+\\.)?hostpicture\\.eu/\\?pm=",
	"pattern": "\\?pm=",
	"replacement": "image.php?di=",
	"generateName": ".jpg"
});

addImageHoster({
	"type": "resolver",
	"prefix": "hostmypic.net",
	"match": "^http://(?:[\\w\\d]+\\.)?hostmypic\\.net/show-image.php",
	"finder": "href='(pictures/.+?)'\\stitle='",
	"builder": "{1}",
	"static": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "gallerycloud.net",
	"match": "^http://(?:[\\w\\d]+\\.)?gallerycloud\\.net/img-",
	"finder": "class='centred_resized.*src='(.+?)'",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "freeimagehosting.net",
	"match": "^http://(?:[\\w\\d]+\\.)?freeimagehosting\\.net/[^/]+$",
	"finder": "src=\"(.+?)\".*?title=\"Click",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "fotolog.com",
	"match": "^http://(?:[\\w\\d]+\\.)?fotolog\\.com/.*?/\\d+/$",
	"finder": "property=\"og:image\" content=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "flickcabin.com (simple)",
	"match": "^http://(?:[\\w\\d]+\\.)?flickcabin\\.com/.*/view/",
	"static": true,
	"finder": "or.*?href=\"(.+?)\" class=\"special\".*?Download|id=\"image_container\".*?src=\"(.+?)\"",
	"builder": "{or:1,2}"
});

addImageHoster({
	"type": "expander",
	"prefix": "flickcabin.com (gallery)",
	"match": "^http://(?:[\\w\\d]+\\.)?flickcabin\\.com/.*/viewset/",
	"finder": "addFile\\('.*?', '.*?', '.*?', \\d+, '(.+?)'",
	"generator": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "celebimagehost.com",
	"match": "^http://(?:[\\w\\d]+\\.)?celebimagehost\\.com/i(?!mage/)",
	"pattern": "/i",
	"replacement": "/image/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "beeimg.com",
	"match": "^http://(?:[\\w\\d]+\\.)?beeimg\\.com/view/",
	"static": true,
	"finder": "href=\"(.+?)\" class=\"thumbnail\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "php-imghost generic",
	"match": "^http://(?:[\\w\\d]+\\.)?(imagerise\\.com|busyupload\\.com|urimageupload\\.com|mypicturehost\\.com|image-shed\\.com|photoquake\\.com|imagelist\\.net|storeimgs\\.com)/show\\.php",
	"pattern": "show\\.php/(.+)\\.html?$",
	"replacement": "out.php/i$1",
	"cleaners": [{"pattern": "^i\\d+_", "replacement": ""}]
});

addImageHoster({
	"type": "redirector",
	"prefix": "matrixpictures.net",
	"match": "^http://(?:[\\w\\d]+\\.)?matrixpictures\\.net/view\\.php\\?filename=",
	"pattern": "/view\\.php\\?filename=",
	"replacement": "/images/"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imgdepot.org",
	"match": "^http://(?:[\\w\\d]+\\.)?imgdepot\\.org/show/",
	"pattern": "/show/",
	"replacement": "/images/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagebunk.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagebunk\\.com/image/",
	"finder": "src=\"(.*?)\".+?id=(\"?)img_obj\\2",
	"builder": "{1}",
	"useServerName": true
});

addImageHoster({
	"type": "expander",
	"prefix": "imgbox.com",
	"match": "^http://(?:[\\w\\d.]+\\.)?imgbox\\.com/g/",
	"finder": "href=\"(/[a-z0-9]{4,})\" class=\"gallery_img\"",
	"generator": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgbox.de",
	"match": "^http://(?:[\\w\\d]+\\.)?imgbox\\.de/show/",
	"finder": "class=\"poscenter\"(?:.|\\n|\\r)*?src=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgmouse.com",
	"match": "^http://(?:[\\w\\d.]+\\.)?imgmouse\\.com/share-",
	"finder": "src=(\"|')(.+?)\\1.*?id=\\1iimg\\1",
	"builder": "{2}",
	"useServerName": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgchili.com",
	"match": "^http://(www\\.)?imgchili\\.com/show/.+$",
	"finder": "<img[^>]+?id=\"show_image\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"    
});

addImageHoster({
	"type": "resolver",
	"prefix": "turboimagehost.com",
	"static": true,
	"match": "^http://(?:[\\w\\d]+\\.)?turboimagehost\\.com/[\\d\\w]/[\\d\\w]+/",
	"finder": "img src=\"(.*?)\".*?id=\"imageid",
	"builder": "{1}",
	"gone": "don`t exist on our server"
});

addImageHoster({
	"type": "resolver",
	"prefix": "upzat.com",
	"match": "^http://(?:[\\w\\d]+\\.)?upzat\\.com/viewimg/",
	"finder": "src=\"(.*?/uploads/.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "pics-hosting.com",
	"match": "^http://(?:[\\w\\d]+\\.)?pics-hosting\\.com/viewer\\.php\\?file=",
	"static": true,
	"pattern": "/viewer\\.php\\?file=",
	"replacement": "/files/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "pixterra.com",
	"match": "^http://www\.pixterra\.com/image-(.+?)\.html",
	"static": true,
	"finder": "href=\"(images/pixt-2-.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "iimmgg.com",
	"match": "^http://([^/]+)\\.iimmgg\\.com/image/([a-f0-9]+)",
	"finder": "<img[^>]+id=\"laimagen\"[^>]+src=\"(http://[^/.]+\\.iimmgg\\.com/images/[^\"]+)\"",
	"builder": "{1}",
	"useDefaultClean" : false
});

addImageHoster({
	"type": "expander",
	"prefix": "imageboss.net gallery",
	"match": "^http://(?:[\\w\\d]+\\.)?imageboss\\.net/img\\d+/.+?/$",
	"finder": "href=\"(http://(?:[\\w\\d]+\\.)?imageboss\\.net/view/img\\d.+?)\"",
	"generator": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imageboss.net",
	"match": "^http://(?:[\\w\\d]+\\.)?imageboss\\.net/view/img\\d+",
	"finder": "scaleImg.*?src=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "abload.de",
	"match": "^http://(?:[\\w\\d]+\\.)?abload\\.de/image\\.php",
	"finder": "src=\"([^\"]*?/img/.*?)\"\\s+id=\"(?:image|i_img)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "bilder-space.de",
	"match": "^http://(?:[\\w\\d]+\\.)?bilder-space.de/show_img\\.php",
	"pattern": "_img(.*)original",
	"replacement": "_img_test$1view",
	"generateName": ".jpg"
});

addImageHoster({
	"type": "resolver",
	"prefix": "bildercache.de",
	"match": "^http://(?:[\\w\\d]+\\.)?bildercache\\.de/anzeige",
	"finder": "src=\"(.*?bild/.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "fapomatic.com",
	"match": "^http://(?:[\\w\\d]+\\.)?fapomatic\\.com/show\\.php\\?",
	"finder": "src='(http://.*fapomatic.com/\\d+/[^']+)'",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "paintedover.com",
	"match": "^http://(?:[\\w\\d]+\\.)?paintedover\\.com/uploads/show\\.php\\?",
	"finder": "src=\"(http://.*paintedover.com/uploads/\\d+/[^\"]+)\">",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "fotosupload.com",
	"match": "^http://(?:[\\w\\d]+\\.)?fotosupload\\.com/mostrar\\.php",
	"pattern": "^http://(?:[\\w\\d]+\\.)?fotosupload\\.com/mostrar\\.php\\?imagen=",
	"replacement": "http://www.fotosupload.com/imagenes/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "host-my-pic.com",
	"match": "^http://(?:[\\w\\d]+\\.)?host-my-pic.com/viewpic.aspx",
	"finder": "id=\"imgPic\"\\s+src=\"(.*?)\"",
	"builder": "{1}"
});

addImageHoster({
"type": "resolver",
"prefix": "imagebam.com",
"match": "^http://(?:[\\w\\d]+\\.)?imagebam\\.com/image/",
"finder": "src=\"(.*?)\"\\s+alt=\"loading\"",
"builder": "{1}",
"useServerName": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagebanana.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagebanana\\.com/view/",
	"finder": "<img[^>]+?id=\"(?:img|image)\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagehaven.net",
	"match": "^http://(?:[\\w\\d]+\\.)?imagehaven\\.net/(?:vie(?:w|vv)er|\\w+\/image|img)\\.php",
	"finder": "src=(['\"])(.*?)\\1\\s+id=['\"]image",
	"builder": "{2}",
	"onfail": "imagehaven.net",
	"cookieName": "imagehaven"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageshack.us",
	"match": "^http://.*(?:(?:(?:echo|exs)[.]cx|imageshack[.]us)/(my\\.php|i/|photo/)|yfrog\\.com/[\\w\\d]+$)",
	"finder": "(?:property=\"og:image\"\\s+content=|url_image_path\\s*=\\s*|rel=\"image_src\"\\s+href=)('|\")(.*?)\\1",
	"gone": "id=(\"|')upload_canvas",
	"builder": "{2}",
	"static": true,
	"cleaners": [
{ "pattern": ".(\\.[\\d\\w]+)$", "replacement": "$1" }
]
});

addImageHoster({
	"type": "resolver",
	"prefix": "ImageSocket.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagesocket\\.com/(?:view|photos)/",
	"finder": "\\.attr\\('src', '([^']+)'",
	"builder": "{1}",
	"useDefaultClean" : false,
	"static": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageupper.com",
	"match": "^http://(.+\\.)?imageupper\\.com/i/",
	"finder": "scaleImg\\('img'\\);\"\\s+SRC=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagevenue.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagevenue\\.com/[\\w\\d_-]+\\.php",
	"finder": "onLoad=\".*?\"[\\s\\r\\n\\t]*SRC=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagewaste.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagewaste\\.com/ih/pictures/[\\da-f]{32}",
	"finder": "src\\s*=\\s*('|\")(/ih/pictures/big.*?)\\1",
	"builder": "{2}"
	
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagizmo.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imagizmo\\.com/viewer\\.php",
	"finder": "src=(\"|')(images/.*?)\\1",
	"builder": "{2}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "ipicture.ru",
	"match": "^http://(?:[\\w\\d]+\\.)?ipicture\\.ru/Gallery/Viewfull",
	"finder": "src=('|\")(.*?ipicture\\.ru/uploads/.*?)\\1",
	"builder": "{2}"
});


addImageHoster({
	"type": "resolver",
	"prefix": "picfront.org",
	"match": "^http://(?:[\\w\\d]+\\.)?picfront\\.(de|org)/d/",
	"finder": "id=\"pic_div\"[\\s\\S]+?<script.*?src=\"([^\"]*?)\"",
	"builder": "{1}",
	"recursive": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "picfront.org-js",
	"match": "^http://(?:[\\w\\d]+\\.)?picfront\\.(de|org)/picture/",
	"finder": "src=\"([^\"]+/token/[^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "picsaway.com",
	"match": "^http://(?:[\\w\\d]+\\.)?picsaway\\.com/view/",
	"pattern": "/view/",
	"replacement": "/uploads/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picvalley.net",
	"match": "^http://(?:[\\w\\d]+\\.)?picvalley\\.net/(v|show)\\.php",
	"finder": "id=\"thepic\".*?src=\"(.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "pixmix.us",
	"match": "^http://(?:[\\w\\d]+\\.)?pixmix.us/(?:hq)?viewer\\.php",
	"finder": "id=\"pix\"\\s+src=\"(.*?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "upmyphoto.com",
	"match": "^http://(?:[\\w\\d+]+\\.)?upmyphoto.com/(?:img/)?image(?:\\.php|/)",
	"finder": "src=\"(.+?)\" width=",
	"builder": "{1}",
	"static": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "uppix.info",
	"match": "^http://(www.)?uppix.info/Pics/.*php$",
	"finder": "src='(.+?')'",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picturebang.com",
	"match": "^http://www\\.picturebang\\.com/images/\\d+$",
	"finder": "<img\\s+src=\"([^\"]+)\"[^>]+img_obj",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picturebang.com-2",
	"match": "^http://(www\\.)?picturebang\\.com/show-image\\.php\\?id=",
	"finder": "<img\\s+src=\"([^\"]+)\"[^>]+img_obj",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picturebang.com-3",
	"match": "^http://(www\\.)?picturebang\\.com/showimage/.*\\.html",
	"finder": "<img\\s+src=\"([^\"]+)\"[^>]+img_obj",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagerise.com",
	"match": "^http://www\\.imagerise\\.com/show\\.php/.+\\.html$",
	"finder": "src=\"(http://www\\.imagerise\\.com/out\\.php/[^\"]+)",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "stooorage.com",
	"match": "^http://(?:[\\w\\d]+\\.)?stooorage\\.com/show/",
	"finder": "onclick.*?src=\"(.+?)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imagepix.org",
	"match": "^http://imagepix\\.org/image/.+\\.html$",
	"pattern": "/image/(.*)\\.html",
	"replacement": "/full/$1.jpg"
});

addImageHoster({
	"type": "redirector",
	"prefix": "crownpic.com",
	"match": "^http://(www\\.)?crownpic\\.com/viewer\\.php\\?file=.+$",
	"pattern": "viewer\\.php\\?file=",
	"replacement": "images/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "picturedumper.com",
	"match": "^http://picturedumper.com/picture/\\d+/[^/]+/.+$",
	"finder": "<img\\s+id=\"image\"\\s+src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "bilderspace.de",
	"match": "^http://www.bilderspace.de/bild.php/\\d+,.+$",
	"pattern": "(.+)",
	"replacement": "$1"
});


addImageHoster({
	"type": "resolver",
	"prefix": "directupload.net",
	"match": "^http://(?:[\\w\\d]+\\.)?directupload\\.net/file",
	"finder": "src=\"(.+?)\".*?id=\"showimage\"",
	"builder": "{1}",
	"static": true
});


addImageHoster({
	"type": "redirector",
	"prefix": "imagepremium.com",
	"match": "^http://(www\\.)?imagepremium\\.com/viewer\\.php\\?file=.+$",
	"pattern": "viewer\\.php\\?file=",
	"replacement": "images/"
});

addImageHoster({
	"type": "redirector",
	"prefix": "uploadthepic.com",
	"match": "^http://www\\.uploadthepic\\.com/reg/image\\.php\\?id=.+$",
	"pattern": "image\\.php\\?id=",
	"replacement": "images/"
});

addImageHoster({
	"type": "redirector",
	"prefix": "picszone.us",
	"match": "^http://picszone\\.us/show\\.php/.+\\.html$",
	"pattern": "show\\.php/(.+)\\.html",
	"replacement": "out.php/i$1"
});

addImageHoster({
	"type": "redirector",
	"prefix": "picsbuddy.us",
	"match": "^http://picsbuddy\\.us/show\\.php/.+\\.html$",
	"pattern": "show\\.php/(.+)\\.html",
	"replacement": "out.php/i$1"
});

/*old not tested
addImageHoster({
	"type": "resolver",
	"prefix": "pixhost.org",
	"match": "^http://www\\.pixhost\\.org/show/\\d+/.+$",
	"finder": "<img id=\"show_image\" src=\"([^\"]+)\"",
	"builder": "{1}"
});*/

addImageHoster({
	"type": "resolver",
	"prefix": "pixhost.org",
	"match": "^http://(?:[\\w\\d]+\\.)?pixhost\\.org/show/",
	"finder": "id=\"show_image\"\\s+src=\"(.+?)\"",
	"builder": "{1}",
	"static": true,
	"gone": "exist|??? ???????????"
});

addImageHoster({
	"type": "resolver",
	"prefix": "urlcash.net",
	"match": "^http://(u-.*|go)\\.urlcash\\.net/.*",
	"finder": "linkDestUrl = '([^']+)';",
	"builder": "{1}",
	"recursive": true
});

addImageHoster({
	"type": "redirector",
	"prefix": "anonym.to",
	"match": "^http://anonym\\.to/\\?http://.*",
	"pattern": "http://anonym\\.to/\\?",
	"replacement": "",
	"recursive": true
});

addImageHoster({
	"type": "redirector",
	"prefix": "hostapic.us",
	"match": "^http://hostapic\\.us/show\\.php/\\d+_.*$",
	"pattern": "show\\.php/",
	"replacement": "out.php/i"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgfiles.ru",
	"match": "^http://imgfiles\\.ru/i/\\?.*$",
	"finder": "<img\\s+id\\s*=\\s*\"pic\"[\\s\\S]+?src\\s*=\\s*\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "fotohol.pl",
	"match": "^http://(www\\.)?fotohot\\.pl/show-image\\.php\\?id=.*$",
	"finder": "<img src='([^']+)' border='1'",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "tinypic.com-manual-thumbs",
	"match": "^http://i\\d+\\.tinypic\\.com/.*",
	"pattern": "",
	"replacement": ""
});

addImageHoster({
	"type": "resolver",
	"prefix": "linkbucks.com",
	"match": "^http://(?!www\\.)[A-Za-z0-9]+?\\.(linkbucks\\.com|baberepublic\\.com|blahetc\\.com|linkgalleries\\.net|linkseer\\.net|picturesetc\\.net|placepictures\\.com|qvvo\\.com|realfiles\\.net|seriousfiles\\.com|seriousurls\\.com|thatsprime\\.com|thesefiles\\.com|thesegalleries\\.com|thosegalleries\\.com|tinybucks\\.net|uberpicz\\.com|ubervidz\\.com|ubucks\\.net|ugalleries\\.net|urlpulse\\.net|viraldatabase\\.com|youfap\\.com|zxxo\\.net).*",
	"finder": "(?:<iframe.*?id\\s*=\\s*\"content\".*?src\\s*=\\s*\"([^\"]+)\")|(?:Linkbucks\\.TargetUrl\\s*=\\s*'([^']*)';)",
	"builder": "{1}{2}",
	"recursive": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "linkbucks.com-2",
	"match": "^http://(www\\.)?(linkbucks\\.com|baberepublic\\.com|blahetc\\.com|linkgalleries\\.net|linkseer\\.net|picturesetc\\.net|placepictures\\.com|qvvo\\.com|realfiles\\.net|seriousfiles\\.com|seriousurls\\.com|thatsprime\\.com|thesefiles\\.com|thesegalleries\\.com|thosegalleries\\.com|tinybucks\\.net|uberpicz\\.com|ubervidz\\.com|ubucks\\.net|ugalleries\\.net|urlpulse\\.net|viraldatabase\\.com|youfap\\.com|zxxo\\.net)/link/[A-Za-z0-9]+?/.*",
	"finder": "(?:<iframe.*?id\\s*=\\s*\"content\".*?src\\s*=\\s*\"([^\"]+)\")|(?:Linkbucks\\.TargetUrl\\s*=\\s*'([^']*)';)",
	"builder": "{1}{2}",
	"recursive": true
});

addImageHoster({
	"type": "redirector",
	"prefix": "radikal.ru",
	"match": "^http://radikal\\.ru/F/.*",
	"pattern": "http://radikal\\.ru/F/(.*?)\\.html",
	"replacement": "http://$1"
});

addImageHoster({
	"type": "redirector",
	"prefix": "pixshared.com",
	"match": "^http://(www\\.)?pixshared\\.com/share-.*",
	"pattern": "^(.*)/share-(.*?)\\.html",
	"replacement": "$1/image-$2.jpg"
});


////////////////////////////////////////////////////////////////////////////

addImageHoster({
	"type": "resolver",
	"prefix": "picfoco.com",
	"match": "^http://img\\d+\\.picfoco\\.com/img\\.php\\?id=\\d+(&q=)?$",
	"finder": "window\\.location=\"([^\"]+)\";",
	"builder": "{1}",
	"cookieName": "foco",
	"recursive": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "cocoimage.com / hotlinkimage.com / picfoco",
	"match": "^http://(?:[\\w\\d]+\\.)?(?:cocoimage|hotlinkimage|picfoco)\\.com/\\d+",
	"finder": "id=\"content_img\".*?src=\"(.+?)\"|window.location=\"(.+?)\"",
	"builder": "{or:1,2}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "hotlinkimage.com-redirect",
	"match": "^http://img\\d+\\.hotlinkimage\\.com/img\\.php\\?id=\\d+(&q=)?$",
	"finder": "<a href=\"([^\"]+)\">\\s*If the image",
	"builder": "{1}",
	"recursive": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "hotlinkimage.com-imagepage",
	"match": "^http://img\\d+\\.hotlinkimage\\.com/img\\.php\\?id=\\d+(&q=)?&jump=\\d+",
	"finder": "<img id=\"img\" .*? src=\"([^\"]+)\"",
	"builder": "{1}",
	"onfail": "hotlinkimage.com-redirect"
});

//////////////////////////////////////////////////////////////////////////////////////////

addImageHoster({
	"type": "resolver",
	"prefix": "sharenxs.com-to-redirectpage",
	"match": "^http://(www\\.)?sharenxs\\.com/view/\\?id=[^&#]+$",
	"finder": "<a\\s+href=\"(/view/[^\"]+)\"",
	"builder": "http://sharenxs.com{1}",
	"recursive": true
});

addImageHoster({
	"type": "resolver",
	"prefix": "sharenxs.com-to-imagepage",
	"match": "^http://(www\\.)?sharenxs\\.com/view/\\?id=.*&pjk=",
	"finder": "<img[\\S\\s]+src=\"(http://(cache\.)?sharenxs\\.com/images/[^\"]+)\"",
	"builder": "{1}",
	"onfail": "sharenxs.com-to-redirectpage"
});

addImageHoster({
"type": "resolver",
"ns": "downthemall.net",
"prefix": "imageshost.ru",
"match": "^http://(?:[\\w\\d]+\\.)?imageshost\\.ru/(photo/|links)",
"finder": "id=\"bphoto\".*?href=\"(.+?)\"",
"builder": "{1}",
"static": true
});

//////////////////////////////////////////////////////////////////////////////////////////

addImageHoster({
	"type": "resolver",
	"prefix": "imagefire.net",
	"match": "^http://(www\\.)?imagefire\\.net/view/.+$",
	"finder": "class=\"full\">[\s\S]*?<a[^>]+?href=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "bilderupload.com",
	"match": "^http://(www\\.)?bilderload\\.com/bild/\\d+/.*",
	"pattern": "",
	"replacement": ""
});

addImageHoster({
	"type": "redirector",
	"prefix": "picupload.org",
	"match": "^http://(www\\.)?picupload\\.org/i/.*",
	"pattern": "",
	"replacement": ""
});

addImageHoster({
	"type": "resolver",
	"prefix": "imagehost.org",
	"match": "^http://\\w\\.imagehost\\.org/view/\\d+/.+$",
	"finder": "id=\"content\">[\\s\\S]*?<img[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "3xup.net",
	"match": "^http://(www\\.)?3xup\\.net/show\\.php/",
	"pattern": "show\\.php/",
	"replacement": "out.php/i"
});

addImageHoster({
	"type": "redirector",
	"prefix": "lookpic.com",
	"match": "^http://lookpic.com/d\\d+/",
	"pattern": "\\?up=",
	"replacement": ""
});

addImageHoster({
	"type": "redirector",
	"prefix": "img-up.net",
	"match": "^http://g\\d+\\.img-up\\.net/\\?up=",
	"pattern": "\\?up=",
	"replacement": ""
});

addImageHoster({
	"type": "resolver",
	"prefix": "ibunker.us",
	"match": "^http://(www\\.)?ibunker\\.us/f\\d+\\.",
	"finder": "<img[^>]+?src=\"([^\"]+)\"[^>]+?id=\"picture\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageban.ru/net",
	"match": "^http://(www\\.)?imageban\\.(ru|net)/show/",
	"finder": "<img[^>]+?src=\"([^\"]+)\"[^>]+?id=\"?img_obj\"?",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "skins.be",
	"match": "^http://image\\.skins\\.be/\\d+/",
	"finder": "id=\"image\">[\\s\\S]*?<img[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

/*Old not tested
addImageHoster({
	"type": "resolver",
	"prefix": "pimpandhost.com",
	"match": "^http://(www\\.)?pimpandhost\\.com/image/",
	"finder": "<img[^>]+?id=\"image\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});*/

addImageHoster({
	"type": "resolver",
	"prefix": "pimpandhost.com",
	"match": "^http://(?:image\\.pimpandhost\\.com/.+\\.html|(?:[\\w\\d]+\\.)?pimpandhost\\.com/image/)",
	"finder": "imageSrc\\s+=\\s+'(.+?)'|id=\"image_original\".+?src=&quot;(.+?)&quot;",
	"builder": "{or:1,2}",
	"static": true,
	"gone": "Image was removed"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageshost.ru",
	"match": "^http://(www\\.)?imageshost\\.ru/photo/",
	"finder": "<div[^>]+?id=\"bphoto\"[\\s\\S]+?<img[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "pixroute.com",
	"match": "^http://(www\\.)?pixroute\\.com/.*?/.*?\\..*?\\.",
	"finder": "<img[^>]+?src=\"([^\"]+)\"[^>]+?hoils",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imageporter.com",
	"match": "^http://(?:[\\w\\d]+\\.)?imageporter\\.com/.+?/.+?\\.html$",
	"finder": "HREF=\"javascript:.*?src=\"(.+?)\"",
	"builder": "{1}",
	"static": true
});

addImageHoster({
	"type": "redirector",
	"prefix": "picturefunk.com",
	"match": "^http://www\\.picturefunk\\.com/view/.+$",
	"pattern": "/view/",
	"replacement": "/image/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "fastpic.ru",
	"match": "^http://(www\\.)?fastpic\\.ru/view/.+$",
	"finder": "<img src=\"([^\"]+)\"[^>]+?id=\"image\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "imgavenue.com",
	"match": "^http://(www\\.)?imgavenue\\.com/viewer\\.php\\?file=",
	"pattern": "/viewer\\.php\\?file=",
	"replacement": "/images/"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgdino.com",
	"match": "^http://(www\\.)?imgdino\\.com/viewer\\.php\\?file=",
	"finder": "<img[^>]+?id=\"cursor_lupa\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgtiger.com",
	"match": "^http://(www\\.)?imgtiger\\.com/viewer\\.php\\?file=",
	"finder": "<img[^>]+?id=\"cursor_lupa\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "resolver",
	"prefix": "imgchili.net",
	"match": "^http://(www\\.)?imgchili\\.net/show/.+$",
	"finder": "<img[^>]+?id=\"show_image\"[^>]+?src=\"([^\"]+)\"",
	"builder": "{1}"
});

addImageHoster({
	"type": "redirector",
	"prefix": "DMM",
	"match": "^http://pics.dmm.co.jp/",
	"pattern": "",
	"replacement": ""
});

/* TEMPLATE:
addImageHoster({
	"type": "resolver",
	"prefix": "",
	"match": "^$",
	"finder": "",
	"builder": "{1}"
});
*/

function installMenuCommands()
{
	// don't register commands in frames, else things will become bugged
	if(window.parent == null) return;

	GM_registerMenuCommand("Inline Images",                      function() { processPage("keypress"); },         "i", "control alt", "i");
	GM_registerMenuCommand("Inline Images - Direct Links",       function() { processPage("redirect"); },         "l", "control alt", "l");
	GM_registerMenuCommand("Inline Images - On Hover",           function() { processPage("hover no preload"); });
	GM_registerMenuCommand("Inline Images - On Hover - Preload", function() { processPage("hover"); });
	GM_registerMenuCommand("Inline Images - On Click",           function() { processPage("click no preload"); });
	GM_registerMenuCommand("Inline Images - On Click - Preload", function() { processPage("click"); });

	GM_registerMenuCommand("Inline Images - Set Mode", resetConfiguration, null, null, null);
}

function installImageChecker()
{
	// needs NoScript permissions for the page enabled
	window.setInterval(doImageCheck, 5000);
}

// this should be done with the images "onerror" handler
function doImageCheck()
{
	var minSize = 70;
	var len = modifiedImages.length; // important to cache len here, as it can change below
	
	for(var i = 0; i < len; i++)
	{
		var linkElement = modifiedImages[i];
		if(linkElement == null) continue;

		var imgElement = getAssociatedImage(linkElement);
		if(imgElement == null) continue;

		if(!imgElement.complete) continue;
		
		var fullImgSrc = imgElement.getAttribute("fullImgSrc");
		if(imgElement.src !== fullImgSrc) continue;

		modifiedImages[i] = null;
		if(imgElement.width < minSize || imgElement.height < minSize)
		{
			var retries   = imgElement.getAttribute("retries");
			var orgImgSrc = imgElement.getAttribute("orgImgSrc");
			if(retries > 5)
			{
				GM_log(imgElement.src + " could not be loaded (no more retries).");

				// reset image to thumbnail
				imgElement.src = orgImgSrc;

				imgElement.setAttribute("retries", 0);
			}
			else
			{
				GM_log(imgElement.src + " seems not to be loaded correctly. Trying again...");
				imgElement.src = orgImgSrc;

				processLinkElement(linkElement, "auto");

				imgElement.setAttribute("retries", retries + 1);
			}
		}
		else
		{
			// seems ok, exclude it from checking
			GM_log(imgElement.src + " seems to be ok.");
		}
	}
}


function processPage(mode)
{
	var doc = window.document;

	if(doc.location && getImageHoster(doc.location.href) != null)
	{
		GM_log("Image Inliner - Page is imagehoster itself. Doing nothing.");
		return;
	}

	processDocument(mode, doc);
}

function processDocument(mode, doc)
{
	var allLinks = doc.getElementsByTagName('a');
	
	for each(var linkElement in allLinks)
	{
		processLinkElement(linkElement, mode);
	}
	
}

function getLinkHref(link)
{

	if ( !link.tagName ) return "";
	var orgHref = link.getAttribute("orgHref");
	if(!link.href) return orgHref;
	else           return link.href;
}

function processLinkElement(link, mode)
{
	var href = getLinkHref(link);
//	GM_log("processing link element " + link + " with href " + href);
	if(!href) return;

	var ih = getImageHoster(href);
	if(ih == null) return;

//	GM_log("processing link element " + link + " in mode " + mode + ", image hoster: " + ih);

	var img = getAssociatedImage(link);
	if(img == null || img === undefined)
	{
		if(CONSIDERLINKS) {
			// create image inside the link
			var linkText = link.innerHTML;
			var doc      = link.ownerDocument;
			if(doc == null) return;

			img = doc.createElement("img");
			img.src = "about:logo";
			img.title = linkText;
			img.height = 30;

			// remove old stuff and append 
			link.innerHTML += "<br>";
			link.appendChild(img);
		}
		else
			return;
	}
	
	if ( mode == "delayed" )
	{
		// save and remove link
		link.setAttribute("orgHref", link.href);
		link.removeAttribute("href");
				
				
		// Visualize enabled image inlining
		img.style.border = "solid orange 1px";
				

		// add click handler
		img.addEventListener('click', function(e) { toggleDelayedImg(e, link, href, ih, img, mode); }, false);

		return;
	}
	
	if(ih.parser !== undefined)
	{
		getPage(link, href, ih, img, mode);
		return;
	}
	if(ih.type == "redirector")
	{
		rewriteImageUrl(link, img, ih, mode);
		return;
	}

}


function toggleDelayedImg(e, link, href, ih, img, mode)
{

	if ( link.getAttribute("currentImg") != "full") {

		link.setAttribute("currentImg", "full");
	
		img.style.border = "solid red 1px";
	
		if(ih.parser !== undefined)
		{
			getPage(link, href, ih, img, mode);
			return;
		}
		if(ih.type == "redirector")
		{
			rewriteImageUrl(link, img, ih, mode);
			return;
		}
	} else {
	
		link.setAttribute("currentImg", "org");
		
		img.src = img.getAttribute("orgImgSrc");
		img.style.border = "solid orange 1px";
	
		link.removeAttribute("orgImgSrc");
		link.removeAttribute("fullImgSrc");
	}
	
}



function rewriteImageUrl(link, img, imageHoster, mode)
{
	var href;

	href = getLinkHref(link);

	var newSrc = href.replace(new RegExp(imageHoster.pattern), imageHoster.replacement);
	if(imageHoster.recursive)
	{
		link.href = newSrc;
		processLinkElement(link, mode);
	}
	else
	{
		modifyImage(mode, link, img, newSrc);
	}
}

function getImageHoster(url)
{
	for each(var ih in imageHosters)
	{
		if(url.match(new RegExp(ih.match))) return ih;
	}
	return null;
}

function getImageHosterByPrefix(prefix)
{
	for each(var ih in imageHosters)
	{
		if(prefix == ih.prefix) return ih;
	}
	return null;
}

function addImageHoster(obj)
{
	// if just regexp given, set the regexp parser
	if(obj.parser === undefined && obj.type == "resolver")
		obj.parser = parseByRegExp;

	if(obj.cookieName === undefined)
		obj.cookieName = obj.prefix;

	obj.name = obj.prefix;

	imageHosters.push(obj);
}

function getAssociatedImage(link)
{
	var imgs = link.getElementsByTagName('img');
	if(imgs == null) return null;
	if(imgs.length < 1) return null;
	return imgs[0];
}

function getPage(pageLink, requestUrl, imageHoster, imgElement, mode) {

	var cheaders = new Array();
	var cookieName    = imageHoster.cookieName;
	var cookieVarName = "cookies_" + cookieName;

	// set image inliners cookie header
	var cookies = GM_getValue(cookieVarName, "");
	if(cookies != "")
		cheaders["Cookie"] = cookies;
		
	cheaders["Referer"] = imgElement.orgImgSrc;

	GM_xmlhttpRequest(
	{
		method: "GET",
		url: requestUrl,
		headers: cheaders,
		onload: function(resp) {
			if(resp.status == 200)
			{
				storeResponseCookies(cookieVarName, resp.responseHeaders);
				applyParser(pageLink, requestUrl, resp.responseText, imageHoster, imgElement, mode);
			}
		}
	});
}

function storeResponseCookies(cookieVarName, respHeaders)
{
	// append new cookies to old ones
	var curCookies = GM_getValue(cookieVarName, "");
	var newCookies = "";
	var match;
	var re = /Set-Cookie:\s*([^=]+)=([^;]+);/g;
	while(match = re.exec(respHeaders)) {
		var c = match[1] + "=" + match[2] + ";";
		newCookies += c;
	}

	re = /([^=]+)=([^;]+);/g;
	while(match = re.exec(curCookies)) {
		var cname = match[1] + "=";
		var c = cname + match[2] + ";";
		if(newCookies.indexOf(cname) < 0)
			newCookies += c;
	}

	// store cookies
	GM_setValue(cookieVarName, newCookies);
}

function applyParser(pageLink, requestUrl, html, imageHoster, imgElement, mode)
{
	if(imageHoster.parser === undefined ||
	   imageHoster.parser == null)
	{
		GM_log("imageHoster.parser undefined, this should not happen!");
		return;
	}

	var newSrc = null;
	var tries = 0;
	while(newSrc == null && tries < 10) {
		tries++;
		newSrc = imageHoster.parser(html, imageHoster);
		if(newSrc == null)
		{
			GM_log("could not parse page of " + imageHoster.name);
			GM_log(html);

			// do we have a onfail handler?
			if(imageHoster.onfail == undefined) return;

			GM_log("failing over to " + imageHoster.onfail);
			imageHoster = getImageHosterByPrefix(imageHoster.onfail);
			if(imageHoster == null) return;
		}
	}
	if(newSrc === undefined || newSrc == null || imageHoster == null) return;

	if(imageHoster.imageUrlBase !== undefined)
		newSrc = imageHoster.imageUrlBase + newSrc;

	if(!newSrc.match(/^http:\/\//))
	{
		var baseUrl = getBaseUrl(requestUrl, html);
		if(baseUrl == null)
		{
			GM_log("no base url for request url " + requestUrl + " found");
			return;
		}
		newSrc = baseUrl + newSrc;
	}

	// decode the URL
	if(imageHoster.encodedURL)
	{
		newSrc = newSrc.replace(/&amp;/g, "&");
		newSrc = decodeURI(newSrc);
		GM_log("decoding URI to " + newSrc);
	}

	if(imageHoster.recursive)
	{
		var ih = getImageHoster(newSrc);
		if(ih == null)
		{
			GM_log("missing recursive imagehoster definition from " + imageHoster.name + " to " + newSrc);
			return;
		}
		GM_log("recursing from " + imageHoster.name + " over " + newSrc + " into " + ih.name);

		// keep track of the pages loaded "recursively" to prevent an endless loop
		var recurseDepth = imgElement.getAttribute("recurseDepth");
		if(!recurseDepth) recurseDepth = 0;
		imgElement.setAttribute("recurseDepth", recurseDepth+1);

		if(recurseDepth > 5)
		{
			GM_log("recursion too deep for imagehoster " + imageHoster.name);
			return;
		}

		getPage(pageLink, newSrc, ih, imgElement, mode);
	}
	else
		modifyImage(mode, pageLink, imgElement, newSrc);
}

function modifyImage(mode, linkElement, imgElement, newSrc)
{
	if(imgElement == null) return;
	if(newSrc === undefined || newSrc == "" || !newSrc.match(/^http:\/\/[^\/]+?\/.{5,500}$/))
	{
		GM_log("No valid image url found for image " + imgElement.src);
		return;
	}

	// store some things we might change
	if(!imgElement.getAttribute("orgImgSrc"))
		imgElement.setAttribute("orgImgSrc", imgElement.src);
	imgElement.setAttribute("fullImgSrc", newSrc);

	if(!linkElement.getAttribute("orgHref"))
		linkElement.setAttribute("orgHref", linkElement.href);

	// does this mode need preloading?
	if(mode == "hover" || mode == "click")
	{
		// preload it
		var preloadImg = new Image();
		preloadImg.src = newSrc;
	}

	if(mode == "hover" || mode == "hover no preload")
	{
		// add hover handler
		imgElement.addEventListener('mouseover', function(e) { showFullImg(e.target); }, false);
		imgElement.addEventListener('mouseout', hideFullImg, false);

		// set border
		imgElement.style.border = "solid red 1px";
	}
	else if(mode == "click" || mode == "click no preload" )
	{
		// remove link
		linkElement.removeAttribute("href");

		// add click handler
		imgElement.addEventListener('click', toggleFullImg, false);

		// set border
		imgElement.style.border = "solid red 1px";
	}
	else if (mode == "delayed")
	{
		showFullImg(imgElement);
	}	
	else if(mode == "redirect")
	{
		linkElement.href = newSrc;
	}
	else
	{
		removeTemporaryImageProperties(imgElement);
		imgElement.src = newSrc;
	}

	// we do error handling ourselves
	imgElement.setAttribute("onerror", "");
	modifiedImages.push(linkElement);
}

function removeTemporaryImageProperties(img)
{
	img.removeAttribute("width");
	img.removeAttribute("height");

	// remove image size limits given by css
	img.style.maxWidth = '100%';
	img.style.maxHeight = '999999px';
		
	
	/*img.style.border = "solid red 2px";*/
}

function showFullImg(img)
{
	var fullImgSrc = img.getAttribute("fullImgSrc");

	if(img.src != fullImgSrc)
	{
		removeTemporaryImageProperties(img);
		img.src = fullImgSrc;
	}
}
function hideFullImg(e)
{
//	TODO: this makes problems, because some images change position on hovering
//	e.target.src = e.target.getAttribute("orgImgSrc");
}

function toggleFullImg(e)
{
	var img = e.target;
	var fullImgSrc = img.getAttribute("fullImgSrc");

	if(img.src != fullImgSrc)
	{
		removeTemporaryImageProperties(img);
		img.src = fullImgSrc;
	} else {
	
	    img.style.border = "solid red 1px";
	    img.src = img.getAttribute("orgImgSrc");
	}

}


function getBaseUrl(url, html)
{
	// TODO: consider <base> tag, more sophisticated way
	var matches = url.match(/(http:\/\/[^?]*\/)/);

	if(!matches) return null;
	return matches[1];
}

function resetConfiguration()
{
	GM_setValue("mode", "");
	GM_setValue("considerLinks", "");
	checkConfiguration();
}

function checkConfiguration()
{
	var confMode = GM_getValue("mode", "");
	var confConsiderLinks = GM_getValue("considerLinks", "");
	
	// not yet set, ask user
	while(confMode != "auto" &&
	      confMode != "hover" &&
	      confMode != "hover no preload" &&
	      confMode != "manual" &&
	      confMode != "click" &&
	      confMode != "click no preload" &&
	      confMode != "redirect" &&
		  confMode != "delayed" )
	{
		confMode = prompt(
		   "What mode to you want \"Image Inliner\" to operate in?\n" +
		   "\n" +
		   "redirect: just changes the link to the full image (useful for \"save link as\")\n" +
		   "click no preload: show them fully when clicking on them\n" +
		   "hover no preload: show them fully when hovering over them\n" +
		   "\n" +
		   "auto:     inline images from all known hosters automatically (resource hog)\n" +
		   "hover:    preload images and show them fully when hovering over them\n" +
		   "click:    preload images and show them fully when clicking on them\n" +
		   "\n" +
		   "delayed:  like click no preload, but all activity is delayed until an image is clicked\n" +
		   "\n" +
		   "manual:   inline all images only on keypress (Ctrl+Alt+I) or greasemonkey menu command", "");
	}

	while(confConsiderLinks != "false" &&
	      confConsiderLinks != "true")
	{
		confConsiderLinks = prompt(
			"Should \"Image Inliner\" consider text-only links and show images instead?\n" +
			"This may slow down you browsing a bit more.\n" +
			"\n" +
			"Note that \"Image Inliner\" does NOT follow links in plain text.\n" +
			"Use scripts like \"Linkify Plus\" (http://userscripts.org/scripts/show/1352) to convert text into links.\n" +
			"Make sure the script gets execute BEFORE \"Image Inliner\" by dragging it in the correct order.\n" +
			"\n" +
			"false: don't consider text-links, inline just linked thumbnails\n" +
			"true : follow text-links\n", "");
	}

	GM_setValue("mode", confMode);
	GM_setValue("considerLinks", confConsiderLinks);

	MODE = confMode;
	CONSIDERLINKS = (confConsiderLinks == "true");
}

function undefinedToEmptyString(s)
{
	return s === undefined ? "" : s;
}

function parseByRegExp(html, imageHoster)
{
	if(imageHoster.finder === undefined)
	{
		GM_log("No regexp given for " + imageHoster.name);
		return;
	}
	var regEx = imageHoster.finder;
	var matches = html.match(regEx);
	if(!matches || matches.length < 2)
	{
		GM_log("RegExp parsing failed for " + imageHoster.name);
		return;
	}

	var res = imageHoster.builder;

	// max. 10 placeholders
	for(var i = 1; i < 10; i++)
		res = res.replace("{"+i+"}", undefinedToEmptyString(matches[i]));

	return res;
}

function main()
{
	checkConfiguration();

	installMenuCommands();
	GM_log("Image Inliner - Mode: " + MODE + " on " + document.location.href);
	if(MODE == "auto" ||
	   MODE == "hover" ||
	   MODE == "click" ||
	   MODE == "redirect" ||
	   MODE == "hover no preload" ||
	   MODE == "click no preload" ||
	   MODE == "delayed" )
	{
		processPage(MODE);
				
		window.addEventListener('AutoPagerAfterInsert', function (e) { processDocument(MODE, e.target); }, false);
	}
	installImageChecker();
}


main();