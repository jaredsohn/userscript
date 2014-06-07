// ==UserScript==
// @name           Top Reddit Comments Preview
// @namespace      reddit
// @description    Preview to the top comments on Reddit's homepage
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/*/comments/*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// ==/UserScript==


var nbrComments=2;
var comments="";
var commentlinks=0;

function onloadJSON(response) {
	var jsonText = response.responseText;
	comments = eval("("+jsonText+")");
	var articleID=comments[0].data.children[0].data.id;
	var newhtml="";
	for(var i=0;i<nbrComments;i++){
		if(comments[1].data.children.length>=(i+1)){
		  var bodyhtml=comments[1].data.children[i].data.body_html;
			if(typeof(bodyhtml) != 'undefined'){
				var firstcomment=$("<div/>").html(bodyhtml).text();
				var author=comments[1].data.children[i].data.author;
				var ups=comments[1].data.children[i].data.ups;
				var downs=comments[1].data.children[i].data.downs;
				var pct=100;
				if(downs>0)pct=Math.floor((ups/(ups+downs))*100+.5);
				newhtml+=(i>0?"<hr>":"")+"<b>"+author+"</b> "+pct+"% +"+ups+" -"+downs+"<br>"+firstcomment;
			}
		}
	}
	$("#"+articleID+"preview").html(newhtml);
	hoverReturned=true;
}

function retrieveTopComments(targetelement,articleID){
if($("#"+articleID+"preview").length==0){
$(targetelement).after($("<div id='"+articleID+"preview' >loading...</div>").css({width: '50%', backgroundColor: '#f8f899', '-moz-border-radius':'7px', 'webkit-border-radius':'7px', 'padding':'2px 2px 2px 6px','border': 'solid black 1px'}));
	GM_xmlhttpRequest({
			  method: "GET",
			  url: "http://www.reddit.com/comments/"+articleID+"/.json?limit="+nbrComments,
			  headers: {
			    "Content-Type": "application/x-www-form-urlencoded"
			  },
			  onload: onloadJSON
			});
}else{
$("#"+articleID+"preview").toggle();
}
}

function addTopLinks(){
if($("a.comments").length>commentlinks){
	$("a.comments").each(function(){
			if($(this).parent().find(".toplink").length==0){
				var articleID=$(this).attr('href');
				articleID=articleID.substring(articleID.indexOf("/comments/")+10,articleID.length);
				articleID=articleID.substring(0,articleID.indexOf("/"));
		  	$(this).after($(" <a class='toplink' id='toplink"+articleID+"' href='javascript:void(0);'><font size=1 color=red>top</font></a>").click(
					function(){
					retrieveTopComments($(this),articleID);
					})
				);
			}
	});
	commentlinks=$("a.comments").length;
}

//fix auto-paging
//progressIndicator is used by RES, neverendingreddit
if($("#progressIndicator").length!=0 )
	{
	document.body.addEventListener('DOMNodeInserted', function(event) {
		if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
		addTopLinks();
		}
		}, true);
	}
}


$(document).ready(function(){
	addTopLinks();
});