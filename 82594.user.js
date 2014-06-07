// ==UserScript==
// @name           Tumblr Next Prev
// @namespace      *tumblr.com
// @description    Adds next and prev page links on those blogs that decide to exclude these buttons from their templates
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$('body').append('<a class="btn-tnp-prev" style="cursor:pointer; background:#000; display:block; width:100px; height:25px; color:#FFF; position:fixed; top:0px; left:0px; padding-left:5px;">NEWER POSTS</a><a class="btn-tnp-next" style="background:#000; display:block; width:100px; height:25px; color:#FFF; position:fixed; top:0px; left:100px; border-left:solid 2px #FFF; padding-left:5px; cursor:pointer;" >OLDER POSTS</a>');
path = window.location.pathname;
pageIndex = path.indexOf("page/");
if(pageIndex>-1){
	id = parseInt(path.slice(pageIndex+5,pageIndex+6));
} else {
	id = 1;
}
$('.btn-tnp-prev').click(function(){
	if(id>0){
		nextId = id-1;
		window.location='/page/'+nextId;
	} else {
		alert("yo DaWG u cant go <<<back any fuRTHER!");
	}
});

$('.btn-tnp-next').click(function(){
		nextId = id+1;
		window.location='/page/'+nextId;
});