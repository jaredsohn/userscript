// ==UserScript==
// @name           Switch Gallery actionbar
// @namespace      echo.waw.pl
// @include	  http://www.example.com
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
log = unsafeWindow.console.log;

// injected HTML of actionbar
nextbarHTML = ""+<r><![CDATA[
<style>
a.piNextLink {
	font-size: 2em;
	color: red;
}
</style>
<style>
.actionbar {
	padding: 0.2em; 
	border: 1px solid black; 
	background: gold;
	position: fixed;
};
</style>
<div id="switch_actionbar" class="actionbar" style="top: 0px; left: 0px;">
<select>
	<option />
</select>
</div>
<div id="img_toolbar" class="actionbar" style="bottom: 0px; left: 0px; z-index: 1101;">
	<button rel="delete">delete</button>
	<button rel="searchimg">search by img</button>
	<button rel="search">search</button>
</div>
]]></r>;

$('body').append(nextbarHTML);
$.getJSON('listdir.php?file=download&type=d', function(data) {
	log('albums listing', data);
	var html = '';
	for(index in data) {
		var path = data[index];
		var label = path.replace('download', '');
		html += '<option value="'+path+'">'+label+'</option>';
	}
	$('#switch_actionbar select').html(html);
	$('#switch_actionbar select').val(getUrlVars()['file']);
	$('#switch_actionbar select').change(function() {
		document.location = 'listdir.php?file='+$('#switch_actionbar select').val()+'&type=f';
	});
});

function findImage() {
	img = jQuery('#fancybox-img')[0];
	log('fancybox img', img);
	if(!img) return;
	return $(img).attr('src');
}

$('#img_toolbar button[rel="delete"]').click(function() {
	img = findImage();
	if(img) {
		if(confirm("Delete "+img+"?"))
			window.open("delete.php?file="+encodeURI(img));
	} else {
		alert('error, img = '+img);
	}
});
$('#img_toolbar button[rel="searchimg"]').click(function() {
	img = findImage();
	if(img) {
		window.open("http://www.google.com/searchbyimage?hl=pl&image_url=" + encodeURI(img));
	} else {
		alert('error, img = '+img);
	}
});
$('#img_toolbar button[rel="search"]').click(function() {
	img = findImage();
	if(img) {
		window.open("http://www.google.com/search?q=" + encodeURI(img));
	} else {
		alert('error, img = '+img);
	}
});


//<!-- HELPERS
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}