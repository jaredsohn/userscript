// ==UserScript==
// @name           Waffles Top10 Remove Images
// @namespace      Waffles Top10 Remove Images
// @description    Waffles Top10 Remove Images
// @include        https://www.waffles.fm/topten.php?type=4*
// @include        http://www.waffles.fm/topten.php?type=4*
// ==/UserScript==

var icons, images, img, replacement;
icons = ["60s", "70s", "80s", "90s", "Acoustic", "Alternative", "Ambient", "Apps Linux", "Apps Mac", "Apps Win", "Asian", "Audiobook Fiction", "Audiobook Non Fiction", "Avant-Garde", "Bluegrass", 
"Blues", "Breaks", "Classic Rock", "Classical", "Comedy", "Comics", "Components", "Country", "Dance", "Disco", "Dream Pop", "Drum 'n' Bass", "Dubstep", "E-Book Fiction", "E-Book Nonfiction", 
"E-Learning", "Electronic", "Emo", "Experimental", "Folk", "Funk", "Garage", "Goth", "Grime", "Grindcore", "Grunge", "Hardcore", "Hip-Hop/Rap", "House", "IDM", 
"Indie", "Industrial", "J-Music", "Jazz", "Kids", "Latin", "Lounge", "Metal", "Misc", "Musical", "New Wave", "No Wave", "Noise", "Noiserock", "OST", 
"Pop", "Pop-Punk", "Post-Punk", "Post-Rock", "Pre-60s", "Progressive Rock", "Protopunk", "Psychedelic", "Psytrance", "Punk", "R 'n' B", "Reggae", "Remixes", "Rock", "Screamo", 
"Sheet music", "Ska", "Soul", "Synthpop", "Techno", "Trance", "Trip Hop", "UK Garage", "Video Game Music", "World/Ethnic", "Xmas"];

images = document.evaluate(
    '//div/a/img[@alt]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < images.snapshotLength; i++) {
    img = images.snapshotItem(i);
    alt = img.alt;
    for (var j in icons) {
        if (alt == icons[j]) {
            replacement = document.createTextNode(alt);
            img.parentNode.replaceChild(replacement, img);
        }
    }
}

