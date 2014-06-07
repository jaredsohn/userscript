// ==UserScript==
// @name b92.fm download
// @description download link ce se pojaviti u desnom gornjem cosku u prozoru plejera
// @include http://*b92.fm/_player/flash/B92FMPlayer.php*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

jQuery(document).ready(function (){

// download slicica
const DOWN_IMG = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAtZJ' +
'REFUOI2Nk8trE1EYxc+dO5OZtGao1kdjBd/VtLpSWlTUnYiIQl0ILkRRUSi+KK78B3wtFHys' +
'FXVpKUUFXyA2Rd1UY0hfVnzVJmkzmTozmZu5c+e68IFYEb/Vx8f5zuLHOQQA9p4GiIL/HsmA' +
'G+e/76T9OLB03b712cLb9infBQ8j8FBABBxRwCGDAJKHIEKAiBCKiKBCggdGd/b2xDP1ziXg' +
'ZFs4s33t9mNJs0azKxZcZqESlPBhMoMJdxAxjUAhAA8lfF/CCJXw1cv4MwCgALBkWWYk61W1' +
'xvrkJpUyEkoHEXGh6xECfEGiVoERJ1ApgRop8nmvfq5lQflaLv3D4E0aaGlz06OeaFnekExR' +
'6oOoDLVxQNJPmFlHYCYI4hqRTx/HemoI73h4ORQAoADArlOACSvwJgcPPRnI5Sil0DVA1zka' +
'6uswt54gOZvI572xYceWB1ZGLPgJlG7tBJpb92+w9IZjnqAbC8WPihETTcnZNYRqDJpuwzQZ' +
'MmmOV/14oceVFZYS21KfqmOFjPeRAMCJ23u2NS9a1T3PJKrLLAiUQdWvIJoFaO+h1+ZhqIDj' +
'ShRKET6/leL+XXNX9laxmwLAvMVvRt4FIW1qWL45pnEiZBVC+ojAEIgpMO6AcQKnApSKUnZ1' +
'xc6kktbVXN8PiEN9QGqd3/fBj1YvndO4kgsPXPjgwodbtfHVd1DxJSqelPd6YndpyDseXfkO' +
'kf6EMfDEE4va2IOSMLbPNxNz/cAF4wxlpwTbdcCYlC/6jKHiuNzx+rrn/IL4e0SHHk+xWa1R' +
'L9RZu2tUEfdYBQW7CNvxkP9s2AM5befwzfK733+mNUC3BzL9o/0H81PgjiuRn6yibOlhNhc/' +
'3Lxwsv9PPf3zMNwLrF8zMTjqG5oZT2wamxhDIT/jbEti/HLXmenFmmbwK5mtfhp6Y0qVdcNq' +
'5dPRngtV8TftP+fIxQ1657Vtxr803wDvxWUA2KhHJwAAAABJRU5ErkJggg==';

// http://stackoverflow.com/a/5158301
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
var id_liste =  getParameterByName("playlist_id");
var tip_liste =    getParameterByName("playlist_type");

// broj pesama u plejlisti
var br_pesama = jQuery("sequence", jQuery.ajax({
	type: "POST",
	url: "/_player/playlist.php",
	data: { playlist_id : id_liste , playlist_type : tip_liste },
	async: false,
	dataType: "xml"
}).responseText).length;

jQuery("div.player-right").html("<table id='tabela_pesama'></table>");

// dobavljanje informacija o svakoj pesmi pojedninacno
for (var i = 0; i < br_pesama ; i++) {
    var pesma_xml = jQuery.ajax({
	type: "POST",
	url: "/_player/song.php",
	data: { playlist_id : id_liste , playlist_type : tip_liste , sequence : i },
	async: false,
	dataType: "xml"
    }).responseText;

    pesma = {
        redni_broj: jQuery("sequence", pesma_xml).text(),
        autor: jQuery("artist_name", pesma_xml).text(),
        naslov: jQuery("title", pesma_xml).text(),
        trajanje: jQuery("playtime", pesma_xml).text(),
        adresa: jQuery("url", pesma_xml).text()
    };
    jQuery("table#tabela_pesama").append("<tr><td>"+pesma.redni_broj+"</td><td>"+pesma.naslov+"</td><td>"+pesma.autor+"</td><td>"+pesma.trajanje+"</td><td><a target='_blank' href='"+pesma.adresa+"'><img src='"+DOWN_IMG+"'></img></a></td></tr>");
}


// css...
jQuery("div.player-right").css({
	"overflow": "auto",
	"height": (jQuery(window).height()) + "px"
});

jQuery("table#tabela_pesama").css({
	"font-size": "11px",
	"border-spacing": "1px",
	"border-collapse": "separate",
	"text-align": "center"
});

jQuery("table#tabela_pesama tr td").css({
	"border": "thin outset #044900",
	"padding": "2px 6px",
	"-moz-border-radius": "3px",
	"color": "black" //"#545454"
});

jQuery("table#tabela_pesama tr:odd td").css({
	"background-color": "#FFFFCC"
});

jQuery("table#tabela_pesama tr:even td").css({
	"background-color": "#F1F1BE"
});

//jQuery("table#tabela_pesama tr").hover(
//    function(){jQuery("td", this).css("color", "black");}, 
//    function(){jQuery("td", this).css("color", "#545454");}
//);


	
});


