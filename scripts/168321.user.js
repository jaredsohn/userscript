// ==UserScript==
// @name        Bulk Delete 4stor
// @namespace   somepotato.4stor.bulk
// @description Delete in bulk for 4stor
// @include     http://4stor.com/gallery*
// @version     1
// ==/UserScript==
var deleting=false;
function toggleSelected(tgt){
	if(deleting){ return; }
	tgt=$(tgt);
	if(tgt.attr("bdselected")){
		tgt.removeAttr("bdselected");
		tgt.css("background-color", "#555555");
	}else{
		tgt.attr("bdselected","1");
		tgt.css("background-color", "#7777bb");
	}
}

var pullLeft = $("div.pull-left");
pullLeft.append("Ctrl Click items to toggle their selected status. ");
var selectAll = $(document.createElement("a"));
selectAll.addClass("btn btn-info");
selectAll.html("Invert Selection");

selectAll.click(function(){
	$(".galleryItem").each(function(_, el){ toggleSelected(el) });
});

pullLeft.append(selectAll);



var del = $(document.createElement("a"));
del.addClass("btn btn-info");
del.html("<i class='icon-trash'></i>");

del.click(function(){
	if(confirm("Are you sure?")){
		$('.galleryItem[bdselected="1"]').each(function(){
			var el=$(this);
			$.get(this.childNodes[1].href+"/delete/ajax", function(){
				el.remove();
			});
		});
	}
});

pullLeft.append(del);

$(".galleryItem").click(function(evt){
	if(deleting){ return false; }
	if(evt.ctrlKey){
		toggleSelected(this);
		return false;
	};
});