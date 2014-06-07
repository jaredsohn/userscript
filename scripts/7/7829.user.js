// Direct Images

// version 1.0.8

// created: 18 Oct 2006

// revised: 06 Jul 2007

// Copyright (c) 2006-2007, neo_ch

// ==UserScript==

// @name           Direct Images

// @namespace      http://userscripts.org/people/13948

// @description    Bypass the individual pages for images hosted by some sites

// @include        *

// ==/UserScript==


// ==SupportedHosts============================================================
// 10pix.com
// FamousQT.com
// Go4Celebrity.com
// HQBeat.com
// ImageHaven.net
// ImageHive.us
// ImageMonk.com
// ImagePal.info
// PaparazziWallpapers.com
// PixHosting.info
// PrestoShare.com
// ShareAvenue.com
// Skins.be
// SuperiorPics.com
// SuperPhotoSpace.com
// SUpload.com
// ============================================================================

// ==ChangeLog=================================================================
// 06 Jul 2007 [1.0.8]: Added FamousQT.com, Go4Celebrity.com
//
// 19 Jun 2007 [1.0.7]: Added ImageMonk.com, ImagePal.info, 
//                      PaparazziWallpapers.com, Skins.be (forum images), 
//                      SuperiorPics.com, SuperPhotoSpace.com
//
//						Removed ImageHosting.gr (hack does not work anymore).
//
// 08 May 2007 [1.0.6]: Added ImageHaven.net, ImageHive.us and SUpload.com
//
// 30 Apr 2007 [1.0.5]: Added PixHosting.info
//
// 24 Apr 2007 [1.0.4]: Added imagehosting.gr
// 
// 08 Mar 2007 [1.0.3]: Added shareavenue.com and prestoshare.com
// 
// 18 Jan 2007 [1.0.2]: Merged 10pix.com and hqbeat.com into the same script
//                      Added skins.be
// ============================================================================



(function() {



	var allLinks = document.getElementsByTagName("a");
	

	for (var i=0; i<allLinks.length; i++) {

		/** 
		 * 10pix.com
		 * imagehive.us
		 * imagemonk.com
		 *
		 * link:  http://www.10pix.com/show.php/18871_alessiamerz79.jpg.html

		 * image: http://www.10pix.com/out.php/i18871_alessiamerz79.jpg
		 */

		if (allLinks[i].href.indexOf('10pix.com/') != -1 || 
			allLinks[i].href.indexOf('imagehive.us/') != -1 ||
			allLinks[i].href.indexOf('imagemonk.com/') != -1) {

			if (allLinks[i].href.indexOf('.jpg.html') != -1) {
				allLinks[i].href = allLinks[i].href.replace('show.php/', 'out.php/i').replace('.jpg.html','.jpg');

			} else if (allLinks[i].href.indexOf('.JPG.html') != -1) {
				allLinks[i].href = allLinks[i].href.replace('show.php/', 'out.php/i').replace('.JPG.html','.jpg');
			}
		} 


		/** 
		 * famousqt.com
		 *
		 * WALLPAPERS
		 * link:  http://famousqt.com/walls.asp?celeb=26&image=36.jpg&size=800&page=1
		 * image: http://famousqt.com/celebs/26/walls/800/36.jpg
		 *
		 * PICTURES

		 * link:  pics.asp?celeb=26&image=73.jpg&page=1
		 * image: http://famousqt.com/celebs/26/pics/prev/73.jpg
		 */

		else if (allLinks[i].href.indexOf('famousqt.com/') != -1) {
			var type = '';			
			if (allLinks[i].href.indexOf('/pics.asp?') != -1) {
				type = 'pics';
			} else if (allLinks[i].href.indexOf('/walls.asp?') != -1) {
				type = 'walls';
			}

			if (type.length > 0) {
				GM_log(allLinks[i].href);
				var index;
				var celeb = 0;
				var image = '';
				var size = -1;
				var elements = new Array();
				elements = ((allLinks[i].href.split('?'))[1]).split('&');

				for (index in elements) {
					var e = elements[index];
					if (e.indexOf('celeb=') != -1) {	
						celeb = parseInt(e.substr(6));
					} else if (e.indexOf('image=') != -1) {
						image = e.substr(6);
					} else if (e.indexOf('size=') != -1) {
						size = parseInt(e.substr(5));
					}
				}


				var newLink = 'http://famousqt.com/celebs/' + celeb + '/'
				if (type == 'pics') {
					newLink = newLink + 'pics/prev/';
				} else { // walls
					newLink = newLink + 'walls/' + size + '/';
				}
				newLink = newLink + image;
				//GM_log(newLink);

				allLinks[i].href = newLink;
			}

		} 


		/** 
		 * go4celebrity.com
		 *
		 * link:  http://www.go4celebrity.com/jennifer-love-hewitt-187.htm
		 * image: http://www.go4celebrity.com/wallpapers/Jennifer-Love-Hewitt/go4-Jennifer-Love-Hewitt-187.jpg
		 */

		else if (allLinks[i].href.indexOf('go4celebrity.com/') != -1) {
			var pageLink = allLinks[i].href.substring(allLinks[i].href.indexOf('go4celebrity.com/') + 17);
			if (pageLink.indexOf('letter-') == -1) {
				var elements = pageLink.split('-');
				var nbr = elements[elements.length-1].replace('.htm', '.jpg');
				if (parseInt(nbr) > 0) {
					var celeb = '';
					for (var index=0; index < elements.length-1; index++) {
						if (elements[index].toLowerCase() == "go4") {
							continue;
						}
						if (celeb.length) {
							celeb += '-';
						}
						celeb += elements[index].substring(0,1).toUpperCase() + elements[index].substring(1);
					}
				
					if (celeb == 'Paris-Hilton') {
						allLinks[i].href = 'http://www.go4celebrity.com/wallpapers/' + celeb + '/go4-' + celeb.toLowerCase() + '-' + nbr;					
					} else {
						allLinks[i].href = 'http://www.go4celebrity.com/wallpapers/' + celeb + '/go4-' + celeb + '-' + nbr;					
					}
					//GM_log('  -> ' + allLinks[i].href);
				}
			}

		} 


		/** 
		 * hqbeat.com
		 *
		 * link:  http://photos.hqbeat.com/viewer.php?id=opt1168398703a.jpg
		 * image: http://photos.hqbeat.com/images/opt1168398703a.jpg

		 */

		else if (allLinks[i].href.indexOf('hqbeat.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('viewer.php?id=', 'images/');

		} 

		/** 
		 * imagehaven.net
		 *
		 * link:  http://www.imagehaven.net/img.php?id=1248251_Anastacia_-_Beach_candids__16_.jpg
		 * image: http://www.imagehaven.net/img/1248251_Anastacia_-_Beach_candids__16_.jpg

		 */

		else if (allLinks[i].href.indexOf('imagehaven.net/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('img.php?id=', 'img/');

		} 

		/** 
		 * imagepal.info
		 *
		 * link:  http://www.imagepal.info/uploads/1/1070_63mp6qxec1.jpg.php
		 * image: http://www.imagepal.info/uploads/1/1070_63mp6qxec1.jpg

		 */

		else if (allLinks[i].href.indexOf('imagepal.info/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('.jpg.php', '.jpg');

		} 


		/** 
		 * paparazziwallpapers.com
		 *
		 * link:  http://www.paparazziwallpapers.com/wallpapers-angelina-jolie-wallpapers-002-1627.html
		 * image: http://www.paparazziwallpapers.com/data/media/2/angelina_jolie_wallpapers_002.jpg
		 * thumb: http://www.paparazziwallpapers.com/data/thumbnails/2/angelina_jolie_wallpapers_002.jpg
		 */

		else if (allLinks[i].href.indexOf('paparazziwallpapers.com/wallpapers') != -1) {

			try {
				var images = allLinks[i].getElementsByTagName('img');
				var thumb = images[0].src;
				allLinks[i].href = thumb.replace('thumbnails', 'media');
			} catch (error) {
				// An error occured, probably there is no thumbnail
			}

		} 

		/** 
		 * pixhosting.info
		 *
		 * link:  http://www.pixhosting.info/view_image/376381125/karolinakurkova01wt9.jpg
		 * image: http://www.pixhosting.info/show_image/376381125/karolinakurkova01wt9.jpg

		 */

		else if (allLinks[i].href.indexOf('pixhosting.info/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('/view_image/', '/show_image/');

		} 

		/** 
		 * prestoshare.com
		 *
		 * link:  http://www.prestoshare.com/viewer.php?id=26071410.jpg
		 * image: http://www.prestoshare.com/images/26071410.jpg

		 */

		else if (allLinks[i].href.indexOf('prestoshare.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('viewer.php?id=', 'images/');

		} 

		/** 
		 * shareavenue.com
		 *
		 * link:  http://img2.shareavenue.com/image.php?file=f70066593f76e4559479bb2ec1ca855dfeb9ed55
		 * image: http://img2.shareavenue.com/getimage.php?file=f70066593f76e4559479bb2ec1ca855dfeb9ed55

		 */

		else if (allLinks[i].href.indexOf('shareavenue.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('image.php?file=', 'getimage.php?file=');

		} 

		/** 
		 * skins.be
		 *
		 * link:  http://www.skins.be/wallpaper/pamela-anderson/25151/1024x768/
		 * image: http://wallpapers.skins.be/pamela-anderson/pamela-anderson-1024x768-25151.jpg

		 */

		else if (allLinks[i].href.indexOf('www.skins.be/wallpaper/') != -1) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('/');
			var celebrity = items[2];
			var n = items[3]
			var size = items[4];

			allLinks[i].href = 'http://wallpapers.skins.be/' + celebrity + '/' + celebrity + '-' + size + '-' + n + '.jpg';

		} 

		/** 
		 * skins.be (forum images)
		 *
		 * link:  http://image.skins.be/9813/digi-s83-kristanna-loken/
		 * image: http://2img.skins.be/9/8/1/3/digi-s83-kristanna-loken.jpg

		 */

		else if (allLinks[i].href.indexOf('image.skins.be/') != -1) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('/');
			var n = items[1]
			var img = items[2];

			n = n.replace(/0/g, '0/');
			n = n.replace(/1/g, '1/')
			n = n.replace(/2/g, '2/');
			n = n.replace(/3/g, '3/');
			n = n.replace(/4/g, '4/');
			n = n.replace(/5/g, '5/');
			n = n.replace(/6/g, '6/');
			n = n.replace(/7/g, '7/');
			n = n.replace(/8/g, '8/');
			n = n.replace(/9/g, '9/');

			allLinks[i].href = 'http://2img.skins.be/' + n + img + '.jpg';

		}

		/** 
		 * SuperiorPics.com
		 *
		 * link:  http://www.superiorpics.com/php/forums.php?img=/wenn_album/lauren_graham_because_i_said_so_premiere/said_so_40_wenn1092322.jpg
		 * image: http://www.superiorpics.com/wenn_album/lauren_graham_because_i_said_so_premiere/said_so_40_wenn1092322.jpg

		 */

		else if (allLinks[i].href.indexOf('superiorpics.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('/php/forums.php?img=', '');

		} 

		/** 
		 * SuperPhotoSpace.com
		 *
		 * link:  http://www.superphotospace.com/view.php?img=z02_4654289c47e08.jpg
		 * image: http://www.superphotospace.com/images/z02_4654289c47e08.jpg

		 */

		else if (allLinks[i].href.indexOf('superphotospace.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('view.php?img=', 'images/');

		} 

		/** 
		 * supload.com
		 *
		 * link:  http://www.supload.com/free/ScarlettCoachellaFestival01.jpg/view/
		 * image: http://www.supload.com/files/default/ScarlettCoachellaFestival01.jpg

		 */

		else if (allLinks[i].href.indexOf('www.supload.com/') != -1) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('/');
			var img = items[2];

			allLinks[i].href = 'http://www.supload.com/files/default/' + img;

		} 
		

	}

	

})();