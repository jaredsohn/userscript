//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// ==UserScript==
// @name           	StudiVZ - ImageLinker
// @namespace     http://userscripts.org
// @version        	v0.9a
// @date           	2008-08-06
// @description    Fuegt über jedes Thumbnail in den Fotoalben einen direkten Link zum Vollbild hinzu. // Adds a direct link to every photo in a photo album.
// @author         	IchBins
// @include        	http://*studivz.net/PhotoAlbums/Album/*
// @include 	http://*studivz.net/PhotoAlbums/Tags/*
// @include         	http://*schuelervz.net/PhotoAlbums/Album/*
// @include 	http://*schuelervz.net/PhotoAlbums/Tags/*
// @include         	http://*meinvz.net/PhotoAlbums/Album/*
// @include 	http://*meinvz.net/PhotoAlbums/Tags/*
// ==/UserScript==
//
// Changelog:
// v0.9:	- initial release
// v0.9a:	- added @include http://*studivz.net/PhotoAlbums/Tags/*
//		- added @include http://*schuelervz.net/PhotoAlbums/Tags/*
//		- added @include http://*meinvz.net/PhotoAlbums/Tags/*


var icon = "data:image/png;base64,R0lGODlhEAAQAPenADVpunqi4vf6/XOc3Ojw+vf6/nmi4/H2/Hih4Xaf3tvn9zZruneg4DltvDVqujFgpnqi4eHs+Xmi4TNms3qj4nmi4tnl9+70+7nQ7nuayWmSz9/p+I2q1+Ls+XOd3Xaf3/P3/fL2/D5qrMLV7zdrunmh4Xmh4Nvn+DptvGePzXyl5pm03Y2q1Yyq2ICdzOrw+qjB5zVptjFhqu/0/IOk1TNlsThru/f7/kNzvsnc9PD1/Mzd9azE6maNyWSMykFzv7XM7oOizmyV0058wrvM5a/D4fb6/XWe3miPyniXx3Sd3jBfp5Sv2nym51SAxXCY2L3S8F2HyPP4/eXt+tHg9zFhqTFgqNDf9tHg9jNksO70/H2n5zFgpzdqumWMyWSMyePt+e3y+2mRzZ654brQ7ztoqnqj4zFgqbfO76S84GSMyHOb2nuZyGyRy6O95Pb6/jVpuenw+nmj42+Y1muRyzRntnGb23Ka2X2n6H+p6UJzvEJ0v8HV8qzF63eh4Orx+zJkr9Hf9jJjre7z+2SLyOnx+vj6/jFiq3mh4jNlsjlsul+Eu3Ga2b3R7HWe3TRntcfZ9LzQ7Hae3jJirOvx+26TzEFyvN3o+Njl9tvm97LK7d/p+Ymm0sTY8nKa2jRntDdruTJjrmOLyPb5/cHcvoe/Yfj7/v39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKcALAAAAAAQABAAAAj/ANO0iLKnwQIHAADYQKEIhxoip2hgoWLqxigdL8KMEkBpQyMxRZwEyvPGiKhBf0KYOtDhBIZIen5cwXPggKhCFwSMInApk4QRMRrs2EKAgJc4UgzN2KTAgh8YjxbkaBIhAhgtAkBMaYopgZsJDiCpEPWlB502SAiJWrtmTCIAncwYkEMhAAQEH454sDNgRRYAfAwYCBCAAgIGCZQM8HSHSSgAUCpUkGCXgSRHAxg9mcNiEhwyiEyJHk1aCCcZXdAgKFCqtevWozQEOUMCSIkCpHLrzj0qhQsuoDSZYP3a9SgfGR4M6cODtHNTbJKI4FDJUp1PE2oAEnSoipUlD8osAgoIADs=";

var allThumbs, thisThumb, allImgs, thisImg;

allThumbs = document.evaluate(
    "//div[@class='thumb']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

allImgs = document.evaluate(
    "//img[@alt='Foto']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allThumbs.snapshotLength; i++) {
	thisThumb = allThumbs.snapshotItem(i);
	thisImg = allImgs.snapshotItem(i);

    var thisImgLink = thisImg.getAttribute('src');
    thisImgLink = thisImgLink.replace("-m", "");
	
	var link = '<p align=center><a href="' + thisImgLink + '" >' + '<img src="' + icon + '" border="0" ' + 'style="vertical-align:middle;" />' + '&nbsp;Bild speichern</a></p>';
    thisThumb.innerHTML = link + thisThumb.innerHTML;
}