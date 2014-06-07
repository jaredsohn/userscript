// Direct Porn & Gossip
// version 0.1
// recreated: 2013/06/24
// revised: 2013/06/24
// Copyright (c) unknown
// modder: Bubba Dam

// ==UserScript==

// @name		Direct Porn & Gossip v0.1
// @namespace		was http://userscripts.org/scripts/show/54035 in 2009
// @description		Bypass the individual pages for images hosted by some gossip and porn sites. (reuploaded from 2009 script hasnt been seen since wipe but ive kept it now uploaded back on userscripts)
// @include		http://*glam0ur.com*
// @include		http://*hq69.com*
// @include		http://*asredas.com*
// @include		http://*badgirlsblog.com*
// @include		http://*softcandies.com*
// @include		http://*closepics.com*
// @include		http://*babe-envy.com*
// @include		http://*sensualarousalblog.com*
// @include		http://*babeunion.com*
// @include		http://*theomegaproject.org*
// @include		http://*labatidora.net*
// @include		http://*babedirect.com*
// @include		http://*usemycomputer.com*
// @include		http://*cman.net*
// @include		http://*webstersismybitch.com*
// @include		http://*dayom.com*
// @include		http://*dailyniner.com*
// @include		http://*glamdolls.com*
// @include		http://*thisis69.com*
// @include		http://*celebrityhoneys.com*
// @include		http://*celebpunani.com*
// @include		http://*celebrityodor.com*
// @include		http://*idontlikeyouinthatway.com*
// @include		http://*hq-celebrity.com*
// @include		http://*hotbitchesonly.com*
// @include		http://*cavemancircus.com*
// @include		http://*2damnhot.com*
// @include		http://*exp0sed.com*
// @include		http://*coedmagazine.com*
// @include		http://*hollywoodrag.com*
// @include		http://*yeeeah.com*
// @include		http://*theblemish.com*
// @include		http://*chickipedia.com*
// @include		http://*morazzia.com*
// @include		http://*egotastic.com*
// @include		http://*glamzilla.com*
// @include		http://*doubleviking.com*
// @include		http://*modelmayhem.com*
// @include		http://*dailypoa.com*
// @include		http://*cameltap.com*
// @include		http://*cutiecentral.com*
// @include		http://*hiphopvideomodels.net*
// @include		http://*dlisted.com*
// @include		http://*saltymilk.com*
// @include		http://*lazygirls.info*
// @include		http://*dirtyrottenwhore.com*
// @include		http://*redbalcony.com*
// @include		http://*taxidrivermovie.com*
// @include		http://*on205th.com*
// @include		http://*on205thimages.com*
// @include		http://*drunkenstepfather.com*
// @include		http://*popoholic.com*
// @include		http://*dfsmodels.com*
// @include		http://*girlsofdesire.org*
// @include		http://*boobieblog.com*
// @include		http://*hollywoodtuna.com*
// @include		http://*novoporn.com*
// @include		http://*eros-and-grace.net*
// @include		http://*scoreland.com*
// @include		http://*realitykings.com*
// @include		http://*babedump.com*
// @include		http://*bravomamas.com*
// @include		http://*pinkems.com*
// @include		http://*bullz-eye.com*
// @include		http://*silentpix.com*
// @include		http://*alcobuds.com*
// @include		http://*kindgirls.com*
// @include		http://*girlsofdesire.org*
// @include		http://*funberry.com*
// @include		http://*join2babes.com*
// @include		http://*bigboobs.hu*
// @include		http://*uncoached.com*
// @include		http://*meandisis.com*
// @include		http://*thebeergoggler.com*
// @include		http://*thegrumpiest.com*
// @include		http://*hornyoyster.com*
// @include		http://*donchavez.com*
// @include		http://*lettherebeporn.com*
// @include		http://*imdb.com*
// @include		http://*coolios.net*
// @include		http://*bootipedia.com*
// @include		http://*a-tribute-to.com*

// ==/UserScript==


(function() {
	var allLinks = document.getElementsByTagName("a");
	for (var i=0; i<allLinks.length; i++) {
		if ((allLinks[i].href.indexOf('glam0ur.com/') != -1) && (document.location.href.indexOf('gals') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('www.','').replace('glam0ur.com','media.glam0ur.com').replace('.php','.jpg').replace('.html','.jpg');
		}
		else if ((allLinks[i].href.indexOf('hq69.com/galleries/') != -1) && (document.location.href.indexOf('hq69.com/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('index.jpg','index.php');
		}
		else if ((allLinks[i].href.indexOf('asredas.com/image.php') != -1) && (document.location.href.indexOf('asredas.com/gallery') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('photo.php?url=', 'files/page/').replace('image.php?img=', 'media/gals/');
		}
		else if ((allLinks[i].href.indexOf('badgirlsblog.com/') != -1) && (document.location.href.indexOf('albums') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('html', 'jpg');
		}
		else if ((allLinks[i].href.indexOf('softcandies.com/') != -1) && (document.location.href.indexOf('albums') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('html', 'jpg');
		}
		else if (allLinks[i].href.indexOf('closepics.com/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('photo.php?img=', 'media/galleries/');
		}
		else if (allLinks[i].href.indexOf('babe-envy.com/images/') != -1) {
			allLinks[i].href = allLinks[i].href.replace('.html','.jpg');
		}
		else if ((allLinks[i].href.indexOf('sensualarousalblog.com/') != -1) && (document.location.href.indexOf('sensualarousalblog.com/galleries') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('babeunion.com/gallery/') != -1) && (document.location.href.indexOf('babeunion.com/gallery/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('theomegaproject.org/galleries/') != -1) && (document.location.href.indexOf('theomegaproject.org/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('img.theomegaproject.org') != -1) && (document.location.href.indexOf('theomegaproject.org/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.html', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('labatidora.net/') != -1) && (document.location.href.indexOf('gallery.php') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('imagen.php?galeria=', 'galerias/').replace('&pagina_id=','/images/').replace('&idi=ing','.jpg');
		}
		else if ((allLinks[i].href.indexOf('babedirect.com/galleries/') != -1) && (document.location.href.indexOf('babedirect.com/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if (allLinks[i].href.indexOf('usemycomputer.com/show.html') != -1) {
			allLinks[i].href = allLinks[i].href.replace(/usemycomputer\.com\/.*\/indeximages\//, "usemycomputer.com/indeximages/");
		}
		else if (allLinks[i].href.indexOf('http://usemycomputer.com/out/') != -1) {
			allLinks[i].href = allLinks[i].href.replace("http://usemycomputer.com/out/", "");
		}
		else if ((document.location.href.indexOf('cman.net') != -1) && ((allLinks[i].href.indexOf('/celebs/') != -1) || (allLinks[i].href.indexOf('/gals/') != -1) || (allLinks[i].href.indexOf('/models/') != -1))) {
			allLinks[i].href = allLinks[i].href.replace('php','jpg');
		}
		else if ((allLinks[i].href.indexOf('images/') != -1) && (document.location.href.indexOf('webstersismybitch.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && (document.location.href.indexOf('dayom.com/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('index.jpg','index.php').replace('galleries.jpg','galleries.php').replace('livebabes.jpg','livebabes.php').replace('hit.jpg','hit.php').replace('privacy.jpg','privacy.php').replace('legal.jpg','legal.php').replace('terms.jpg','terms.php').replace('2257.jpg','2257.php').replace('form.jpg','form.php').replace('page.jpg','page.php');
		}
/** redirect to the large image html page. Can't make it redirect to the pic */
		else if ((allLinks[i].href.indexOf('which_image=') != -1) && (document.location.href.indexOf('dailyniner.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('image_size=medium','image_size=large');
		}
		else if ((allLinks[i].href.indexOf('glamdolls.com/galleries/') != -1) && (allLinks[i].href.match('nudes')) && (document.location.href.indexOf('glamdolls.com/galleries') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('index.jpg','index.php');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && (document.location.href.indexOf('glamdolls.com/nudes/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('-popup') != -1) && (document.location.href.indexOf('thisis69.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('thisis69.typepad.com','www.thisis69.com').replace('-popup','-pi');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && (allLinks[i].href.search(/[a-z]{2}.*_[0-9]{3}\.php/) != -1) && (document.location.href.indexOf('celebrityhoneys.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && (allLinks[i].href.search(/[a-z]{2}.*_[0-9]{3}\.php/) != -1) && (document.location.href.indexOf('celebpunani.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('galleries/') != -1) && (document.location.href.indexOf('celebrityodor.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('pictures/') != -1) && (allLinks[i].href.match('/[0-9]{8}/')) && (document.location.href.indexOf('idontlikeyouinthatway.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('www.','cdn.').replace('.html','.jpg');
		}
		else if ((allLinks[i].href.indexOf('/photos/') != -1) && (document.location.href.indexOf('hq-celebrity.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('/galleries') != -1) && (document.location.href.indexOf('hotbitchesonly.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('index.jpg','index.php');
		}
		else if ((allLinks[i].href.indexOf('/galleries') != -1) && (document.location.href.indexOf('cavemancircus.com/galleries') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && (allLinks[i].href.indexOf('http') != 1) && (document.location.href.indexOf('2damnhot.com/galleries') != -1) && (document.location.href.indexOf('index.php') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('go.jpg','go.php');
		}
		else if ((allLinks[i].href.indexOf('viewer.php') != -1) && (document.location.href.indexOf('2damnhot.com') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('http://2damnhot.com/galleries/viewer.php?id=','');
		}
		else if ((allLinks[i].href.indexOf('.php') != -1) && ((allLinks[i].href.indexOf('exp0sed.com/celebs/') != -1) || (allLinks[i].href.indexOf('exp0sed.com/paparazzi/') != -1) || (allLinks[i].href.indexOf('exp0sed.com/models/') != -1)) && ((document.location.href.indexOf('exp0sed.com/celebs/') != -1) || (document.location.href.indexOf('exp0sed.com/paparazzi/') != -1) || (document.location.href.indexOf('exp0sed.com/models/') != -1))) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg').replace('index.jpg','index.php');
		}
		else if ((allLinks[i].href.indexOf('coedmagazine.files.wordpress.com') != -1) && (allLinks[i].href.indexOf('?w=') != -1) && (document.location.href.indexOf('coedmagazine.com') != -1)) {
			var plop = allLinks[i].href;
			var zongo = new Array();
			zongo = plop.split('?w=');
			var ok = zongo[0];
			allLinks[i].href = ok;
		}
		else if ((allLinks[i].href.indexOf('/image_full') != -1) && (document.location.href.indexOf('hollywoodrag.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('_medium', '').replace('_thumb', '');
		}
		else if ((allLinks[i].href.indexOf('?attachment_id=') != -1) && (document.location.href.indexOf('yeeeah.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('.thumbnail.', '.');
		}
		else if ((allLinks[i].href.match(/http:\/\/theblemish\.com\/\d{4}\/\d{2}\/.*\/.*[0-9]\//)) && (document.location.href.indexOf('theblemish.com') != -1)) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}			var items = new Array();
			items = fullLink.split('/');
			var racine = items[0];
			var year = items[1];
			var month = items[2];
			var pic = items[4];
			allLinks[i].href = 'http://theblemish.com/images/' + year + '/' + month + '/' + pic + '.jpg';
		}
		else if (((allLinks[i].href.indexOf('jpg.html') != -1) || (allLinks[i].href.indexOf('JPG.html') != -1)) && (document.location.href.indexOf('chickipedia.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			var items = new Array();
			items = thumb.split('_thumb');
			var ok = items[0];
			if (thumb.indexOf('.JPG') != -1) {
				allLinks[i].href = ok + '.JPG';
			}
			else if (thumb.indexOf('.jpg') != -1) {
				allLinks[i].href = ok + '.jpg';
			}
		}
		else if ((allLinks[i].href.indexOf('/galleries/') != -1) && (allLinks[i].href.indexOf('www.morazzia.com') != -1) && (document.location.href.indexOf('morazzia.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/s-', '/').replace('-small-', '-').replace('/thumbs/', '/').replace('tn_', '');
		}
		else if ((allLinks[i].href.indexOf('?path=') != -1) && (document.location.href.indexOf('egotastic.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbs/', '/pictures/');
		}
		else if ((allLinks[i].href.indexOf('item-gallery') != -1) && (document.location.href.indexOf('glamzilla.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbs/', '/orig_');
		}
		else if ((allLinks[i].href.indexOf('photos/') != -1) && (document.location.href.indexOf('doubleviking.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('-t-', '-').replace('-thumb.jpg', '.jpg').replace('-thumb-', '-').replace('-0t-', '-0-').replace('-1t-', '-1-').replace('-2t-', '-2-').replace('-3t-', '-3-').replace('-4t-', '-4-').replace('-5t-', '-5-').replace('-6t-', '-6-').replace('-7t-', '-7-').replace('-8t-', '-8-').replace('-9t-', '-9-');
		}
		else if ((allLinks[i].href.indexOf('pic_id=') != -1) && (document.location.href.indexOf('modelmayhem.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('_m.', '.');
		}
		else if (allLinks[i].href.indexOf('dailypoa.com/imageview.php') != -1) {
			allLinks[i].href = allLinks[i].href.replace('/imageview.php?image=','/images/');
		}
		else if ((allLinks[i].href.indexOf('dpi/') != -1) && (document.location.href.indexOf('dailypoa.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumb', 'image');
		}
		else if ((allLinks[i].href.indexOf('imageview.php?') != -1) && ((document.location.href.indexOf('208.109.122.180') != -1) || (document.location.href.indexOf('cameltap.com') != -1))) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('s2-', '');
		}
		else if ((allLinks[i].href.indexOf('/attachment/') != -1) && (document.location.href.indexOf('cutiecentral.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('-150x150', '');
		}
		else if ((allLinks[i].href.indexOf('.html') != -1) && (document.location.href.indexOf('hiphopvideomodels.net') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbs/tn_', 'images/').replace('thumbs/TN_', 'images/').replace('_-_', ' - ').replace('blackmen2008_', 'blackmen2008/blackmen2008_').replace('blackmen2006_', 'blackmen2006/blackmen2006_').replace('SSX_', 'SSX/SSX_').replace('smooth_', 'smooth/smooth_');
		}
		else if ((allLinks[i].href.indexOf('/images/') != -1) && (document.location.href.indexOf('dlisted.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('photo-thumbnail', 'photo-preview');
		}
		else if ((allLinks[i].href.indexOf('/nggallery/') != -1) && (document.location.href.indexOf('saltymilk.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbs/thumbs_', '');
		}
		else if ((allLinks[i].href.search(/\/[A-Z][a-z]{3}.*\//) != -1) && (document.location.href.indexOf('lazygirls.info') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('.thumb.', '.sized.');
		}
/**
don't work here for example : http://www.dirtyrottenwhore.com/2009/01/09/minka-kelly-is-the-hotness/
cause of <a href="http://dirtyrottenwhore.com/galleries2/2009/1/minka_kelly_looking_hot_in_a_sexy_dress/minka_kelly_looking_hot_in_a_sexy_dress_002.php"></a>
nothing inside de <a></a> tags
can't fix it. need halp.
*/
		else if ((allLinks[i].href.indexOf('dirtyrottenwhore.com/galleries') != -1) && (document.location.href.indexOf('dirtyrottenwhore.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			if (thumb.indexOf('.JPG') != -1) {
				allLinks[i].href = allLinks[i].href.replace('.php','.JPG');
			}
			else if (thumb.indexOf('.jpg') != -1) {
				allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
			}
			else {
				allLinks[i].href = allLinks[i].href;
			}
		}
		else if ((allLinks[i].href.indexOf('dirtyrottenwhore.com/wp-content/') != -1) && (document.location.href.indexOf('dirtyrottenwhore.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			allLinks[i].href = allLinks[i].href.replace('.html','.jpg');
		}
		else if ((allLinks[i].href.indexOf('?img=') != -1) && (document.location.href.indexOf('redbalcony.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('s.jpg', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('gallerypic') != -1) && (document.location.href.indexOf('taxidrivermovie.com/gallery') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumb-', '');
		}
		else if ((allLinks[i].href.indexOf('viewer.php') != -1) && ((allLinks[i].href.indexOf('on205thimages.com') != -1) || (document.location.href.indexOf('on205th.com') != -1))) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('_thumb', '');
		}
		else if (allLinks[i].href.indexOf('drunkenstepfather.com/cms') != -1) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('t-', '');
		}
		else if (((allLinks[i].href.indexOf('photo.php?') != -1) || (allLinks[i].href.indexOf('photo2.php?') != -1)) && (document.location.href.indexOf('popoholic.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/images/', '/bigimages/');
		}
		else if ((allLinks[i].href.indexOf('imagepages/') != -1) && (document.location.href.indexOf('dfsmodels.com/models') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbnails/tn', 'images/');
		}
		else if ((allLinks[i].href.indexOf('o.cgi?') != -1) && (allLinks[i].href.indexOf('u=/galleries') != -1) && (document.location.href.indexOf('girlsofdesire.org') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('_thumb', '');
		}
		else if ((allLinks[i].href.indexOf('boobieblog.com/img') != -1) && (document.location.href.indexOf('boobieblog.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('_small', '');
		}
/**
sometimes don't work. here for example : http://www.hollywoodtuna.com/?p=8737&folder=515
i can't fix it. need halp.
*/
		else if (((allLinks[i].href.indexOf('photo.php?') != -1) || (allLinks[i].href.indexOf('photo2.php?') != -1)) && (document.location.href.indexOf('hollywoodtuna.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('photo2.') != -1) {
				allLinks[i].href = thumb.replace('images/', 'images/bigimages2/').replace('images2/', 'images/bigimages2/').replace('/bigimages/bigimages2/', '/bigimages2/').replace('_tn.jpg', '_big.jpg').replace('_small.jpg', '_big.jpg').replace('_tnx.jpg', '_bigx.jpg').replace('_smallx.jpg', '_bigx.jpg').replace('_tn_', '_big_');
			}
			else {
				allLinks[i].href = thumb.replace('images/', 'images/bigimages/').replace('images2/', 'images2/bigimages2/').replace('images3/', 'images3/bigimages3/').replace('_tn.jpg', '_big.jpg').replace('_small.jpg', '_big.jpg').replace('_tnx.jpg', '_bigx.jpg').replace('_smallx.jpg', '_bigx.jpg').replace('_tn_', '_big_');
			}
		}
		else if ((allLinks[i].href.indexOf('photo_gallery.php?') != -1) && (document.location.href.indexOf('hollywoodtuna.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			if (thumb.indexOf('_sign.gif') != -1) {
				allLinks[i].href = allLinks[i].href;
			}
			else {
				allLinks[i].href = thumb.replace('bolGallery/thumbnail_', '');
			}
		}
		else if ((allLinks[i].href.indexOf('pic_pages/') != -1) && (document.location.href.indexOf('hollywoodtuna.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/images/', '/images/bigimages/').replace('_small', '_big').replace('_tn', '_big');
		}
		else if ((allLinks[i].href.indexOf('action=image') != -1) && (document.location.href.indexOf('novoporn.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/stn_', '/');
		}
		else if ((allLinks[i].href.indexOf('eros-and-grace.net/galleries/') != -1) && (document.location.href.indexOf('eros-and-grace.net/galleries/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/tn_', '/');
		}
		else if ((allLinks[i].href.indexOf('gallys.scoreland.com/pic/') != -1) && (document.location.href.indexOf('gallys.scoreland.com/pics/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/pics_thumbs/', '/pics_contentQODyRf/').replace('_tn.jpg', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('view_picture.htm?') != -1) && (document.location.href.indexOf('realitykings.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('.thumb.jpg', '.jpg');
		}
		else if ((allLinks[i].href.indexOf('/image/') != -1) && (document.location.href.indexOf('babedump.com/galleries/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbs/', '');
		}
		else if ((allLinks[i].href.indexOf('.html') != -1) && (document.location.href.indexOf('bravomamas.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('t.jpg', '.jpg');
		}
		else if (((allLinks[i].href.indexOf('/galleries/') != -1) || (allLinks[i].href.indexOf('/content/') != -1)) && (document.location.href.indexOf('pinkems.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbs/', '');
		}
		else if ((allLinks[i].href.indexOf('image.asp?') != -1) && (document.location.href.indexOf('bullz-eye.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('tn.jpg', '.jpg');
		}
		else if (document.location.href.indexOf('silentpix.com') != -1) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('thumbs/', '');
		}
		else if ((allLinks[i].href.indexOf('alcobuds.com/galleries/') != -1) && (document.location.href.indexOf('alcobuds.com/galleries/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbs/', '/');
		}
		else if ((allLinks[i].href.indexOf('kindgirls.com/photo') != -1) && (document.location.href.indexOf('kindgirls.com/gallery/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbnails/tn', '/');
		}
		else if ((allLinks[i].href.indexOf('&page=') != -1) && (document.location.href.indexOf('girlsofdesire.org/index.php') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/tn_', '/');
		}
		else if ((allLinks[i].href.indexOf('funberry.com/show.php?') != -1) && (document.location.href.indexOf('funberry.com/gallery.php') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/tn_', '/');
		}
		else if ((allLinks[i].href.indexOf('action=image') != -1) && (document.location.href.indexOf('join2babes.com/') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/stn_', '/');
		}
		else if ((allLinks[i].href.indexOf('page=pic') != -1) && (document.location.href.indexOf('bigboobs.hu') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/t_', '/');
		}
		else if ((allLinks[i].href.indexOf('image.php?image=') != -1) && (document.location.href.indexOf('uncoached.com') != -1)) {
			var fullLink = allLinks[i].href;
			var items = new Array();
			items = fullLink.split('image=');
			var ok = items[1];
			allLinks[i].href = ok;
		}
		else if ((allLinks[i].href.indexOf('pics/') != -1) && (document.location.href.indexOf('meandisis.com') != -1)) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}			var items = new Array();
			items = fullLink.split('/');
			var pic = items[3];
			allLinks[i].href = 'http://www.meandisis.com/photos/orig_' + pic;
		}
		else if ((allLinks[i].href.indexOf('?attachment_id=') != -1) && (document.location.href.indexOf('thebeergoggler.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			if (thumb.indexOf('http://') != -1) {
				thumb = thumb.substring(7);
			}
			var items = new Array();
			items = thumb.split('/');
			var year = items[3];
			var month = items[4];
			var pic = items[5];
			var crap = pic.match(/-[0-9].*x[0-9].*\.jpg/);
			pic = pic.replace(crap, '');
			pic = pic.replace('.thumbnail', '').replace('.jpg', '');
			allLinks[i].href = 'http://www.thebeergoggler.com/wp-content/uploads/' + year + '/' + month  + '/' + pic  + '.jpg';
		}
		else if ((allLinks[i].href.indexOf('?MyImage=') != -1) && (document.location.href.indexOf('thegrumpiest.com') != -1)) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('?MyImage=');
			var dawa = items[1];
			var pouet = new Array();
			pouet = dawa.split('&');
			var img = pouet[0];
			if (img.indexOf('thegrumpiest.com') != -1) {
				allLinks[i].href = img;
			}
			else {
				allLinks[i].href = 'http://thegrumpiest.com/wp-content/uploads' + img;
			}
		}
		else if ((allLinks[i].href.indexOf('?image=') != -1) && (document.location.href.indexOf('hornyoyster.com') != -1)) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('image=');
			var dawa = items[1];
			var pouet = new Array();
			pouet = dawa.split('&');
			var img = pouet[0];
			allLinks[i].href = 'http://www.hornyoyster.com/images/' + img;
		}
		else if ((allLinks[i].href.indexOf('?image=') != -1) && (document.location.href.indexOf('donchavez.com') != -1)) {
			var fullLink = allLinks[i].href;
			var items = new Array();
			items = fullLink.split('?image=');
			var ok = items[1];
			allLinks[i].href = ok;
		}
		else if ((allLinks[i].href.indexOf('?Image=') != -1) && (document.location.href.indexOf('donchavez.com') != -1)) {
			var fullLink = allLinks[i].href;
			var items = new Array();
			items = fullLink.split('?Image=');
			var ok = items[1];
			allLinks[i].href = ok;
		}
		else if (allLinks[i].href.indexOf('lettherebeporn.com/trade/partner.php') != -1) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('partid=');
			var newurl = items[1];
			allLinks[i].href = newurl;
		}
		else if ((allLinks[i].href.indexOf('lettherebeporn.com/galleries/') != -1) && (document.location.href.indexOf('lettherebeporn.com/galleries/') != -1)) {
			allLinks[i].href = allLinks[i].href.replace('.php','.jpg');
		}
		else if (((allLinks[i].href.indexOf('mediaindex/thumbnail') != -1) || (allLinks[i].href.indexOf('photos-name/summary') != -1)) && (document.location.href.indexOf('imdb.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			if (thumb.indexOf('http://') != -1) {
				thumb = thumb.substring(7);
			}
			var items = new Array();
			items = thumb.split('_CR');
			var ok = items[0];
			allLinks[i].href = 'http://' + ok + '.jpg';
		}
		else if ((allLinks[i].href.indexOf('?p=') != -1) && (document.location.href.indexOf('galleries.coolios.net') != -1)) {
			var fullLink = allLinks[i].href;
			var pouet = new Array();
			pouet = fullLink.split('?');
			var racine = pouet[0];
			var lnk = pouet[1];
			var items = new Array();
			items = lnk.split('&');
			var n = items[0];
			n = n.replace('p=','');
			if (n < 10) { 
				n = '0' + n; 
				}
			allLinks[i].href = racine + 'images/' + n + '.jpg';
		}
		else if ((allLinks[i].href.indexOf('bootipedia.com') != -1) && (document.location.href.indexOf('bootipedia.com') != -1)) {
			var fullLink = allLinks[i].href;
			if (fullLink.indexOf('http://') != -1) {
				fullLink = fullLink.substring(7);
			}
			var items = new Array();
			items = fullLink.split('/');
			if (items[3] != null) {
				var racine = items[0];
				var girlname = items[1];
				var directory = items[2];
				allLinks[i].href = 'http://' + racine + '/' + girlname + '/' + directory + '/' + directory + '.jpg';
			}
		}
		else if ((allLinks[i].href.indexOf('st/st.php?') != -1) && (document.location.href.indexOf('a-tribute-to.com') != -1)) {
			var fullLink = allLinks[i].href;
			var items = new Array();
			items = fullLink.split('&url=');
			var crap = items[0];
			var ok = items[1];
			ok = ok.replace('/&p=70','/')
			allLinks[i].href = ok;
		}
	}
})();
