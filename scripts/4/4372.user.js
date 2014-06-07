// ==UserScript==
// @name	Universal imagehost redirector
// @namespace	http://determinist.org/greasemonkey
// @description Redirects the viewpage on imagehosts directly to the image where possible. Version 2.0i

// @include			*

// ==/UserScript==

/*
This is a script intended for the majority of imagehosters
out there. Since there are so many, and new ones are popping
up all the time, this script is written with extensibility
in mind.
Currently supports: hidebehind, imagevenue, fapomatic, imageshack,
imagebucks, paintedover, imagefap, supload, imagethrust, imagehigh,
dumparound, directupload, imagebeaver, xxxloading, picturesupload,
imagefly, gloshare, shareapic, slibe, pixhost.eu, goopic, pic2.us,
temppic, celebs.myphotos.cc, puretna.com, uploadem.com, shareavenue, imagehaven,
imageflux.

All imagehosts are stored in an array. Every object in this
array follows this pattern:

{
	url_regex: //, (this is a regex for the url
	id: '', (this is the id of the image to direct to)
	xpath: "", (if the image has no id, use this xpath instead to locate it)
	redirect: true, (this is a boolean. if true, this script will redirect to the url of the image
					If false, the script will blank the page out instead and only show the image.
					The variable 'imagePageStyle' contains the css for this page)
	execute: function (img) {return img}, (this function if defined will be executed with the image
										as argument. This is if you want to manipulate the image in
										some way or execute some other code before redirecting/focusing)
	rewrite: [function or string] 		(the function will take the results of the url_regex and try to make
										a link of it that points directly to the image. this value is optional)
}

Changelog:
2009-11-12
* a lot of imagehosts are not working properly anymore. i'll look into
  this as soon as possible, this is just quick fix for a few hosts.
* add celebsxtreme support

2009-09-29
* added dumppix support

2009-09-26
* fixed imagebam support
* fixed imagevenue support

2009-03-27
* fixed imagehaven support

2008-08-26	2.0j
* Added support for imagehaven.net and imageflux.

2007-12-02	2.0i
* Added support for keepmyfile.com (no rewrite, no redirect), zshare (no rewrite, no redirect). Are imagehosters
getting more clever? also pixup.info (rewrite and redirect) and upload-space.de (redir, no rewrite)
* Updated support for supload

2007-12-02	2.0h
* Fixed code for uploadem (thanks theaulddubliner and Thor)

2007-03-28	2.0g
* Super small change, now uses location.replace(url) instead of location.href = url.
   stops history issues.
* Added support for shareavenue (with rewriting).

2007-03-21	2.0f
* Added redirecting and rewriting for uploadem.com, testing needed though.

2007-03-17	2.0e
* Fixed rewriting for imagefly.info

2007-03-17	2.0d
* Added puretna.com, as per request by goofydave. Rewriting and redirecting supported.

2007-03-15	2.0c
* Fixed rewriting for imageshack.
* added a framework for stats. this is mostly for me to
   see which imagehosts are most important, to see which are in most need of maintaining
* started writing a unittest for imagehosts to make sure they follow the correct pattern
* rewrote some messy code, added some messier code.

2007-01-24	2.0b
* Added celebs.myphotos.cc

2006-10-09	2.0a
* Added Slibe
* Added pixhost.eu, goopic, pic2.us, temppic (thanks xmen9999!)
* Improved rewrite

2006-10-05	2.0
* Added Shareapic
* Now with link rewriting! rewrites links to point directly to the image when possible

2006-09-26	1.0g
* Added imagefly, gloshare
* Updated imagevenue

2006-08-02	1.0f
* Added imagebeaver, xxxloading and picturesupload

2006-07-09	1.0e
* Fix for hidebehind

2006-07-05	1.0d
* Added directuplad

2006-07-03	1.0c
* Added imagehigh

2006-07-01	1.0b
* Added dumparound

2006-06-30 	1.0a
* Added supload

2006-06-30 	1.0
* made it easier to modify style
* added support for imagethrust
* modified function execution code
* public release

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

var imagePageStyle = "body { background-color: white; text-align: center }";

var stats = true;

function $(id) {
	return document.getElementById(id);
}

function xpathOne(query, context) {
	context = context ? context : document;

	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

var imagehosts = [
                  /*
                    site: http://www.dumppix.com/viewer.php?file=osbl9objb3nyxy8ggnpb.jpg
                    th: http://www.dumppix.com/images/osbl9objb3nyxy8ggnpb_thumb.jpg
                    contains
                    http://www.dumppix.com/images/osbl9objb3nyxy8ggnpb.jpg
                  */
	{
		name: 'dumppix',
		url_regex: /^http:\/\/www\.dumppix\.com\/viewer\.php\?file=(.*)/,
		id: 'dispImg',
		redirect: true,
		rewrite: 'http://www.dumppix.com/images/%%1',
	},
	{
		name: 'hidebehind',
		url_regex: /^http:\/\/www\.hidebehind\.com\/.*/,
		xpath: "//img[starts-with(@src, 'http://www.hidebehind.com/img/')]",
		redirect: false,
		execute: function (img) {
			if (img.parentNode.href) {
				img = img.parentNode;
				img.title = "Click to resize";
			}
			return img;
		}
	},
	{
		name: 'imagevenue',
		url_regex: /^http:\/\/img.*\.imagevenue\.com\/(img|view)\.php\?/,
		id: 'thepic',
		redirect: true, //rewriting not possible at this point
                styles: "overlayBg: {display: none ! important; } ajax_load_indicator { display: none ! important; } dtemplate13_border { display: none ! important; } dtemplate13_shadow { display: none ! important; } ",
		// execute: function () { remove($('overlayBg')); } // not really needed, since we redirect
	},
	{
		name: 'fapomatic',
		url_regex: /^http:\/\/(www\.)?fapomatic\.com\/show\.php\?/,
		id: 'subject',
		redirect: false,
	},
	{
		name: 'imageshack',
		url_regex: /^http:\/\/img(.*)\.imageshack\.us\/my\.php\?image=(.*)\.(.*)$/,
		id: 'thepic',
		redirect: true,
		rewrite: function (res, link) {
			var thumb = link.getElementsByTagName('img');
			if (thumb = thumb[0]) {
				//thumb: http://img88.imageshack.us/img88/3912/hotb5sh4.th.jpg
				//image: http://img88.imageshack.us/img88/3912/hotb5sh4.jpg
				//view: http://img88.imageshack.us/my.php?image=hotb5sh4.jpg
				var thumbregex = new RegExp("http:\\/\\/img" + res[1] + "\\.imageshack\\.us\\/img" + res[1] + "\\/(.*)\\/");
				var thumbres = thumbregex.exec(thumb.getAttribute('src'));

				if (thumbres)
					return "http://img" + res[1] + ".imageshack.us/img" + res[1] + "/"  + thumbres[1] + "/" + res[2] + "." + res[3];
			}
			return false;
		}
	},
/*	{
		name: 'imagefucks (bucks). imagebucks have moved to share-a-pic',
		url_regex: /^http:\/\/imagebucks\.com\/content/,
		xpath: "//img[starts-with(@src, 'http://imagebucks.com/images/')]",
		redirect: true,
	}, */
	{
		name: 'paintedover',
		url_regex: /^http:\/\/(www\.)?paintedover\.com\/uploads\/show\.php\?/,
		id: 'subject',
		redirect: false,
	},
	{
		name: 'imagefap ',
		url_regex: /^http:\/\/(www\.)?imagefap\.com\/image\.php\?/,
		xpath: "//img[starts-with(@src, 'http://images.imagefap.com/images')]",
		redirect: true,
	},
	{
		name: 'imagethrust',
		url_regex: /^http:\/\/i.*\.imagethrust\.com\/images\/.*/,
		id: 'picture',
		redirect: true,
	},
	{
	/*
	warning, examples here are NSFW
	http://s2.supload.com/free/Betsy_Russell_Tomboy0001.gif/view/
	or
	http://s2.supload.com/image.php?get=Betsy_Russell_Tomboy0001.gif

	contains
	http://s2.supload.com/files/default/Betsy_Russell_Tomboy0001.gif


	rewrite not possible
	*/
		name: 'supload',
		url_regex: /^http:\/\/(s.*)\.supload\.com\/image\.php\?get=.*/,
		id: 'supimage',
//		rewrite: 'http://%%1.supload.com/files/default/%%2',
		redirect: true
	},
	{
		name: 'supload2',
		url_regex: /^http:\/\/(s.*)\.supload\.com\/free\/(.*?)\/view/,
		id: 'supimage',
//		rewrite: 'http://%%1.supload.com/files/default/%%2',
		redirect: true
	},
	{
		name: 'imagehigh',
		url_regex: /^http:\/\/serv.*\.imagehigh\.com\/view\.php\?id=.*/,
		id: 'thepic',
		redirect: true,
	},
	{
		name: 'directupload.net',
		url_regex: /^http:\/\/www\.directupload\.net\/show\/.*/,
		id: 'Bild',
		redirect: false,
	},
	{
		name: 'imagebeaver',
		url_regex: /http:\/\/www\.imagebeaver\.com\/view\.php\?mode=gallery&g=(.*?)&photo=(.*?)/,
		id: 'thepic',
		redirect: true,
	},
	{
		name: 'xxxloading',
		url_regex: /https?:\/\/(www.)?xxxloading\.com\/image\.php\?file=(.*)$/,
		xpath: "//img[starts-with(@onclick, 'image_mousethingie_zoom(this);')]",
		redirect: true,
	},
	{
		name: 'picturesupload',
		url_regex: /http:\/\/(www.)?picturesupload\.com\/show\.php\/(.*)$/,
		id: 'theimage',
		redirect: true,
	},
	{
		name: 'imagefly',
		url_regex: /http:\/\/([^\.]*)\.imagefly\.info\/v\/([^\/]*)\/([^\/]*)\/(.*?)\.html/,
		//show: http://ifs1.imagefly.info/v/1b/jpg/53_bb22.html
		//show: http://ifs3.imagefly.info/v/85/jpg/Israel%20Girl%2020.html
		//image: http://ifs3.imagefly.info/i/85/Israel%20Girl%2020.jpg
		id: 'pic',
		redirect: true,
		rewrite: "http://%%1.imagefly.info/i/%%2/%%4.%%3"
	},
	{
		name: 'gloshare',
		url_regex: /http:\/\/(www.)?gloshare\.com\/popupimage\.php\?(.*)$/,
		id: 'img1',
		redirect: true,
	},
	{
		name: 'shareapic',
		url_regex: /http:\/\/(www.)?shareapic\.net\/content\.php\?id=([^&]*)(&owner=(.*))?$/,
		rewrite: function (matchResults) {
			var filename = '';
			var id = matchResults[2];
			for (var i = 0; i < 9-id.length; i++) {
				filename += '0';
			}
			var location = 'http://www.shareapic.net/images/' + filename + id + '.jpg';
			return location;
		},
		xpath: "//img[contains(@src, 'http://www.shareapic.net/images')]",
		redirect: true,
	},
	{
		name: 'slibe',
		url_regex: /http:\/\/(www\.)?slibe\.com\/(publicimage|zoom)\/(.*?)_(jpg|gif)/,
		xpath: "id('slika')//img",
		/*rewrite:	function (matchResults) {
			var ext = matchResults[4];
			var id = matchResults[3];
			var location = 'http://www.slibe.com/fullimage/'+id+'.'+ext;
			return location;
		},// doesn't work */
		redirect: true
	},
	{
		name: 'temppic',
		url_regex: /http:\/\/(www\.)?temppic\.com\/img\.php\?([^:]*):(.*)/,
		xpath: "//img[contains(@src, 'temppic.com/upload_picture/')]"
	},
	{
		name: 'pic2.us',
		url_regex: /http:\/\/(www\.)?pic2\.us\/detail\/forex\/(.*)/,
		xpath: "//img[contains(@src, 'pic2.us/pic/')]",
		redirect: true,
		rewrite: 'http://%%1pic2.us/pic/%%2',
	},
	{
		name: 'goopic',
		url_regex: /http:\/\/(www\.)?goopic\.com\/show.php\?id=(.*)/,
		xpath: "//img[contains(@src, 'goopic.com//ia/')]",
		redirect: true
	},
	{
		name: 'pixhost.eu',
		url_regex: /http:\/\/(www\.|)?pixhost\.eu\/avaxhome\/big_show.php\?\/avaxhome\/([^\/]*)\/(.*)/,
		xpath: "//img[starts-with(@src, '/avaxhome/avaxhome/')]",
		rewrite: "http://%%1pixhost.eu/avaxhome/avaxhome/%%2/%%3",
		redirect: true
	},
	{
		name: 'celebs.myphotos.cc',
		url_regex: /http:\/\/celebs\.myphotos\.cc\/hosting2\/public\/pview\/(.*)/,
		xpath: "id('credit')/img",
		rewrite: "http://celebs.myphotos.cc/hosting2/public/%%1",
		redirect: true
	},
	{
		name: 'puretna.com',
		url_regex: /^http:\/\/(www\.)?puretna\.com\/fullpic\.php\?pid=(.*)$/,
		id: 'i',
		rewrite: 'http://pic.puretna.com/tpics/%%2-fs.jpg',
		redirect: true
	},
	{
		//<a href="http://www.uploadem.com/view/11687"><img src="http://i1.uploadem.com/03202007/th/92887CelebutopiaHaydenPanettiere03122549lo.jpg"></a>
		//show: http://www.uploadem.com/view/11687
		//th: http://i1.uploadem.com/03202007/th/92887CelebutopiaHaydenPanettiere03122549lo.jpg
		//image: http://i1.uploadem.com/03202007/92887CelebutopiaHaydenPanettiere03122549lo.jpg
		name: 'uploadem.com',
		url_regex: /^http:\/\/([^.]*\.)?uploadem\.com\/view\.php\?/,
		xpath: "id('myright')//img",
		redirect: true,
		rewrite: function (res, link) {
			var th = link.getElementsByTagName('img');
			if (th = th[0]) {
				var thRegex = new Regex(/^http\/\/(.*?)\.uploadem\.com\/(.*?)\/th\/(.*?)\/(.*)$/);
				var thres;
				if (thres = thRegex.exec(th.getAttribute('src')))
					return "http://" + thres[1] + ".uploadem.com/" + res[2] + "/" + thres[3] + "/" + res[4];
			}
			return false;
		}
	},
	{
		//show: http://img4.shareavenue.com/image.php?file=cc2492f6801f69745fe60d20241fedd5a8da6eac
		//image: http://img4.shareavenue.com/getimage.php?file=cc2492f6801f69745fe60d20241fedd5a8da6eac
		//thumb?
		name: 'shareavenue',
		url_regex: /^http:\/\/img(.*?)\.shareavenue\.com\/image\.php\?file=(.*)$/,
		id: 'img',
		rewrite: 'http://img%%1.shareavenue.com/getimage.php?file=%%2',
		redirect: true
	},
	{
		//show: http://www.keepmyfile.com/image/09f73a2248079
		//img: http://www.keepmyfile.com/dlimage/560731419435f280dce6cc81319e31cc/09f73a2248079/NicoleKidmanBirthdayGirl0001.gif
		name: 'keepmyfile',
		url_regex: /^http:\/\/(www\.)?keepmyfile\.com\/image\/(.*)$/,
		id: 'image',
		redirect: false
	},
	{
	/*
	http://www.zshare.net/image/51920619a83d04/
	redir not possible
	*/
		name: 'zshare',
		url_regex: /^http:\/\/(www\.)?zshare\.net\/image\/(.*)$/,
		xpath: "//img[starts-with(@src, 'http://nyx.zshare.net/download/')]",
		redirect: false
	},
	{
	/*
	http://www.pixup.info/view_image/a8390917/17768_20071130-roselyn-sanchez-01-03.jpg
	contains
	http://www.pixup.info/show_image/a8390917/17768_20071130-roselyn-sanchez-01-03.jpg
	*/
		name: 'pixup',
		url_regex: /^http:\/\/(www\.)?pixup\.info\/view_image\/(.*?)\/(.*)$/,
		xpath: "//img[starts-with(@onclick, 'scaleImg')]",
		redirect: true,
		rewrite: "http://www.pixup.info/show_image/%%2/%%3"
	},
	{
	/*
	http://www.upload-space.de/hosting1/show.php/12133_KateHudson5.jpg.html
	contains
	http://www.upload-space.de/hosting1/out.php/i12133_KateHudson5.jpg
	not hotlinking
	*/
		name: 'upload-space.de',
		url_regex: /^http:\/\/(www\.)?upload-space\.de\/hosting1\/show\.php\/(.*?)\.html$/,
		redirect: true,
		id: "img_obj",
//		rewrite: "http://www.upload-space.de/hosting1/out.php/%%2"
	},
	/*
	http://img19.imagehaven.net/img.php?id=2KFXIAL5FG_73772_Celebutopia-Christina_Aguilera-Nakheel_Introduces_Trump_International_Hotel_and_Tower_Dubai_party-05_122_845lo.jpg
	contains
	http://img19.imagehaven.net/images/d6834d11469918b455afeac48495d106/48b3481d/2KFXIAL5FG_73772_Celebutopia-Christina_Aguilera-Nakheel_Introduces_Trump_International_Hotel_and_Tower_Dubai_party-05_122_845lo.jpg
	*/
	{
		name: 'imagehaven.net',
		url_regex: /^http:\/\/(.*?)\.imagehaven\.net\/img\.php\?id=(.*)$/,
		redirect: true,
		id: 'image',
	        //execute: function () { if ($x("//a[contains(text(),'continue')]")) location.reload() }
	},
	/*
	http://www.imageflux.net/ver.php?v=576989coa-swtcw-sample[(000544)20-14-52].jpg
	contains
	http://www.imageflux.net/uploads/576989coa-swtcw-sample[(000544)20-14-52].jpg
	*/
	{
		name: 'imageflux',
		url_regex: /http:\/\/www\.imageflux\.net\/ver\.php\?v=(.*)$/,
		redirect: true,
		xpath: "//div[@align='center']/a[starts-with(@href, 'http://www.imageflux.net/uploads/')]/img",
		rewrite: "http://www.imageflux.net/uploads/%%1"
	},
	/*
	http://www.imagebam.com/image/1528a930012372/
	contains
	http://www.imageflux.net/uploads/576989coa-swtcw-sample[(000544)20-14-52].jpg

	view image -> download image? (extension needed)
	*/
	{
		name: 'imagebam',
		url_regex: /http:\/\/www\.imagebam\.com\/image\/.*/,
       		redirect: false,
		id: 'the_image'
	},
	{
		name: 'celebsxtreme',
		url_regex: /http:\/\/www\.celebsxtreme\.com\/viewer\.php\?file=(.*)$/,
		redirect: true,
		xpath: "//div[@align='center']//img",
		rewrite: "%%1"
	}
];

/* // finish another time :P

function testImagehosts() {
	var criterias = {
		shouldhave: ['name'],
		xor: ['xpath', 'id'],
		musthave: ['url_regex']
	};

	testCriterias(criterias, imagehosts);
}

function testCriteria(crit, arr) {
	arr.forEach(function (v,i,a) {
		if (crit.shouldhave)
			crit.shouldhave.forEach(function (vv,ii,aa) {
				if (!vv[v])
					GM_log(v + ' should have ' + vv);
			});

		if (crit.xor) {
			var res = 0;
			for (var ii = 0; ii < crit.xor.length; ii++)
				if (vv[crit.xor[ii]])
					res++;
			if (res!=1)
				GM_log(v + ' must only have one of these ' + crit.xor.join(',') );
		}

		if (crit.musthave)
			arr.musthave.forEach(function(vv,ii,aa) {
				if (!vv[v])
					GM_log(v + ' must have ' + vv);
			});

	});
}
*/

//rewrite links
if (stats)
	var statrewrites =deserialize('statrewrites');

if (imagehosts.some(hasRewrite)) {
	var imagehostsWithRewrite = imagehosts.filter(hasRewrite);

	for (var i = 0, link = null; link = document.links[i]; i++) {
		imagehostsWithRewrite.forEach(function (imagehost, ii, aa) {
			var res;
			if (res = link.href.match(imagehost.url_regex)) {

				var typeofrewrite = typeof imagehost.rewrite;

				if (typeofrewrite == 'string') {
					var new_location = imagehost.rewrite;
					var m;
					while (m = new_location.match(/\%%(\d+)/)) {
						var idx = parseInt(m[1],10);
						new_location = new_location.replace(m[0], (res[idx] == undefined ? '' : res[idx]));
					}
				}
				else if (typeofrewrite == 'function') {
					var new_location  = imagehost.rewrite(res, link);
				}
				link.href = (new_location != false ? new_location : link.href);

				if (stats)
					if (!statrewrites[imagehost.name])
						statrewrites[imagehost.name] = 1;
					else
						statrewrites[imagehost.name]++;

			}
		});
	};
}

if (stats)
	serialize('statrewrites', statrewrites);

//redirection / focusing code
var href = location.href;
//check if we're at a imagehost

var imagehost = null;
for (var i = 0; i < imagehosts.length; i++) {
  if (imagehosts[i].url_regex.test(href)) {
    imagehost = imagehosts[i];
    debug(imagehost.name);
    break;
  }
 }

// document.body.addEventListener('load', function () { debug("hej"); }, false);


if (imagehost) {

  if (stats) {
    var statredirs =deserialize('statredirs');
  }

  var img = imagehost.id ? $(imagehost.id) : (imagehost.xpath ? xpathOne(imagehost.xpath) : null);
  debug(img);

  if (!img) {
    debug("could not find img with id " + imagehost.id);
  }

  if (imagehost.styles) {
    GM_addStyle(imagehost.styles);
  }
  
  if (img) {
    if (imagehost.execute) {
      debug("execute");
      var temp = imagehost.execute(img);
      img = temp ? temp : img;
    }

    if (stats) {
      if (!statredirs[imagehost.name])
	statredirs[imagehost.name] = 1;
      else
	statredirs[imagehost.name]++;

      serialize('statredirs', statredirs);
    }
    if (imagehost.redirect) {
      debug("redirect");
      redirect(img);
    }
    else {
      debug("focus");
      focusImage(img);
    }
  }
 }

function debug(str) {
  if (true) console.log(str);
}

/*
 * Standard functions
 */

function deserialize(name) {
	return eval(GM_getValue(name, '({})') );
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

function focusImage(subject) {
	document.body.innerHTML = '';
	GM_addStyle(imagePageStyle);
	document.body.appendChild(subject);
}

function redirect(subject) {
	GM_log('redir');
	location.replace(subject.src);
}

function hasRewrite(imagehost) {
	return (imagehost.rewrite ? true : false);
}

function remove(node) {
  node.parentNode.removeChild(node);
}

function $x(xpath, root) { // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}

function $xs(xpath, root) {
	return $x(xpath, root)[0];
}
