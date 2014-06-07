// ==UserScript== 
// @name       RYM No Redundants Credits
// @version    0.1 
// @description  Deletes redundant credits from the "Credited on" section
// @match      http://rateyourmusic.com/artist/* 
// @copyright  2013, ejeandel
// ==/UserScript== 
var discog = {};
var text;
var albums;
function parseAlbum(albumType) {
    albums = (document.getElementById(albumType));
    if (albums != null) {
        albums = albums.getElementsByTagName('tr');
        var artistRating = albums.length;		
        for (var j = 2; j < artistRating; j++) {
            albumRow = albums[j];			
            if ((!albumRow.hasAttribute("class"))){
			    text = (albumRow.cells[1].getElementsByTagName('a'))[0].title;
				discog[text] = true;
            }
        }
    }
}

function deleteAlbum(albumType) {
    albums = (document.getElementById(albumType));
    if (albums != null) {
        albums = albums.getElementsByTagName('tr');
        var artistRating = albums.length;		
        for (var j = artistRating - 1; j >=2; j--) {
            albumRow = albums[j];
            if ((!albumRow.hasAttribute("class"))){
			    text = (albumRow.cells[1].getElementsByTagName('a'))[0].title;
				if (text in discog)
				albumRow.parentNode.removeChild(albumRow);
            }
        }
    }
}
parseAlbum('album_disc_s');
parseAlbum('album_disc_i');
parseAlbum('album_disc_e');
parseAlbum('album_disc_c');
deleteAlbum('album_disc_z');
