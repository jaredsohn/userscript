// ==UserScript==
// @name       RYM Artist Display Bold
// @version    0.1
// @description  Adds a checkbox to the Artist page that can be toggled to display only bolded releases
// @match      http://rateyourmusic.com/artist/*
// @copyright  2012+,
// ==/UserScript==

// album checkbox
if(document.getElementById("Album") != null){
	var albumCb = document.createElement('input');
	albumCb.type = 'checkbox';
	albumCb.style.float='left';
	albumCb.addEventListener('click', albumBold, false);
	var albumDiv = document.createElement( 'div' );
	albumDiv.setAttribute('id','albumDiv');
	albumDiv.appendChild(albumCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	albumDiv.appendChild(label);
	albumDiv.style.float='left';
	albumDiv.style.marginTop='6px';
	albumDiv.style.marginLeft='6px';
	var albumAppear = document.getElementById("Album").nextSibling.parentNode;
	albumAppear.style.width="";
	albumAppear.parentNode.insertBefore(albumDiv, albumAppear.nextSibling);
}

// EP checkbox
if(document.getElementById("EP") != null){
	var epCb = document.createElement('input');
	epCb.type = 'checkbox';
	epCb.style.float='left';
	epCb.addEventListener('click', epBold, false);
	var epDiv = document.createElement( 'div' );
	epDiv.setAttribute('id','epDiv');
	epDiv.appendChild(epCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	epDiv.appendChild(label);
	epDiv.style.float='left';
	epDiv.style.marginTop='6px';
	epDiv.style.marginLeft='6px';
	var epAppear = document.getElementById("EP").nextSibling.parentNode;
	epAppear.style.width="";
	epAppear.parentNode.insertBefore(epDiv, epAppear.nextSibling);
}

// compilation checkbox
if(document.getElementById("Compilation") != null){
	var compCb = document.createElement('input');
	compCb.type = 'checkbox';
	compCb.style.float='left';
	compCb.addEventListener('click', compBold, false);
	var compDiv = document.createElement( 'div' );
	compDiv.setAttribute('id','compDiv');
	compDiv.appendChild(compCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	compDiv.appendChild(label);
	compDiv.style.float='left';
	compDiv.style.marginTop='6px';
	compDiv.style.marginLeft='6px';
	var compAppear = document.getElementById("Compilation").nextSibling.parentNode;
	compAppear.style.width="";
	compAppear.parentNode.insertBefore(compDiv, compAppear.nextSibling);
}

// single checkbox
if(document.getElementById("Single") != null){
	var singleCb = document.createElement('input');
	singleCb.type = 'checkbox';
	singleCb.style.float='left';
	singleCb.addEventListener('click', singleBold, false);
	var singleDiv = document.createElement( 'div' );
	singleDiv.setAttribute('id','singleDiv');
	singleDiv.appendChild(singleCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	singleDiv.appendChild(label);
	singleDiv.style.float='left';
	singleDiv.style.marginTop='6px';
	singleDiv.style.marginLeft='6px';
	var singleAppear = document.getElementById("Single").nextSibling.parentNode;
	singleAppear.style.width="";
	singleAppear.parentNode.insertBefore(singleDiv, singleAppear.nextSibling);
}

// bootleg checkbox
if(document.getElementById("Bootleg / Unauthorized") != null){
	var bootCb = document.createElement('input');
	bootCb.type = 'checkbox';
	bootCb.style.float='left';
	bootCb.addEventListener('click', bootBold, false);
	var bootDiv = document.createElement( 'div' );
	bootDiv.setAttribute('id','bootDiv');
	bootDiv.appendChild(bootCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	bootDiv.appendChild(label);
	bootDiv.style.float='left';
	bootDiv.style.marginTop='6px';
	bootDiv.style.marginLeft='6px';
	var bootAppear = document.getElementById("Bootleg / Unauthorized").nextSibling.parentNode;
	bootAppear.style.width="";
	bootAppear.parentNode.insertBefore(bootDiv, bootAppear.nextSibling);
}

// film checkbox
/*var filmCb = document.createElement('input');
filmCb.type = 'checkbox';
filmCb.style.float='left';
filmCb.addEventListener('click', filmBold, false);
var filmDiv = document.createElement( 'div' );
filmDiv.setAttribute('id','filmDiv');
filmDiv.appendChild(filmCb);
var label = document.createElement('span');
label.id = 'toggle_gfilter_lbl';
label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
label.style.float='left';
filmDiv.appendChild(label);
filmDiv.style.float='left';
filmDiv.style.marginTop='6px';
filmDiv.style.marginLeft='6px';
var filmAppear = document.getElementById("album_disc_f_btn").nextSibling.parentNode;
filmAppear.style.width="";
filmAppear.parentNode.insertBefore(filmDiv, filmAppear.nextSibling);
*/

// vid checkbox
if(document.getElementById("Video") != null){
	var vidCb = document.createElement('input');
	vidCb.type = 'checkbox';
	vidCb.style.float='left';
	vidCb.addEventListener('click', vidBold, false);
	var vidDiv = document.createElement( 'div' );
	vidDiv.setAttribute('id','vidDiv');
	vidDiv.appendChild(vidCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	vidDiv.appendChild(label);
	vidDiv.style.float='left';
	vidDiv.style.marginTop='6px';
	vidDiv.style.marginLeft='6px';
	var vidAppear = document.getElementById("Video").nextSibling.parentNode;
	vidAppear.style.width="";
	vidAppear.parentNode.insertBefore(vidDiv, vidAppear.nextSibling);
}

// trib checkbox
if(document.getElementById("Tribute") != null){
	var tribCb = document.createElement('input');
	tribCb.type = 'checkbox';
	tribCb.style.float='left';
	tribCb.addEventListener('click', tribBold, false);
	var tribDiv = document.createElement( 'div' );
	tribDiv.setAttribute('id','tribDiv');
	tribDiv.appendChild(tribCb);
	var label = document.createElement('span');
	label.id = 'toggle_gfilter_lbl';
	label.innerHTML = '&nbsp-&nbspShow/Hide Bold';
	label.style.float='left';
	tribDiv.appendChild(label);
	tribDiv.style.float='left';
	tribDiv.style.marginTop='6px';
	tribDiv.style.marginLeft='6px';
	var tribAppear = document.getElementById("Tribute").nextSibling.parentNode;
	tribAppear.style.width="";
	tribAppear.parentNode.insertBefore(tribDiv, tribAppear.nextSibling);
}

function albumBold(){
	boldOnly('album_disc_s');
}
/*
function filmBold(){
	boldOnly('album_disc_f');
}
*/
function tribBold(){
	boldOnly('album_disc_t');
}

function bootBold(){
	boldOnly('album_disc_b');
}

function vidBold(){
	boldOnly('album_disc_d');
}

function singleBold(){
	boldOnly('album_disc_i');
}

function compBold(){
	boldOnly('album_disc_c');
}

function epBold(){
	boldOnly('album_disc_e');
}

function boldOnly(section){
  var albums = document.getElementById(section);
  if (albums != null){
     albums = albums.getElementsByTagName('tr');
     var albumList = albums.length;
     parseAlbum(albums, albumList);
  }
}

function parseAlbum(albums, albumList){
  for (var j=2; j<albumList; j++) {
     var albumRow = albums[j];
     var albumCells = albumRow.getElementsByTagName('td');
     var node = albumCells[1].firstChild;
     if (node.nodeName != 'b' && node.nodeName != 'B') {
		 if (albumRow.style.display=="none"){
			 albumRow.style.display="";
		 } else {
			 albumRow.style.display="none";
		 }
     }
  }
}