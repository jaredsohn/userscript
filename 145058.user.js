// ==UserScript==
// @id             38
// @name           Gamin endless comments
// @version        1.3
// @namespace      
// @author         Zayka
// @description    Бесконечные комментарии для Gamin.ru
// @updateURL	   http://userscripts.org/scripts/source/145058.user.js
// @downloadURL	   http://userscripts.org/scripts/source/145058.user.js
// @include        gamin.ru/*
// @include        http://gamin.ru/*
// @require		   http://code.jquery.com/jquery-1.8.1.min.js
// @require		   http://gamin.ru/misc/drupal.js?3
// @require		   http://gamin.ru/sites/all/modules/spoiler/spoiler.js?3
// @require		   http://gamin.ru/misc/collapse.js?3
// @run-at         document-end
// ==/UserScript==
function main () {
var loading = false;
var loadingtxt;
var nextpage = 0;
var maxpage = 0;

function cleanWhitespace(node)
{
  for (var i=0; i<node.childNodes.length; i++)
  {
    var child = node.childNodes[i];
    if(child.nodeType == 3 && !/\S/.test(child.nodeValue))
    {
      node.removeChild(child);
      i--;
    }
    if(child.nodeType == 1)
    {
      cleanWhitespace(child);
    }
  }
  return node;
}


box = document.getElementsByClassName('box')[0];
document.getElementById("comments").parentNode.insertBefore(box,document.getElementById("comments"));


var pager = document.getElementsByClassName('pager')[0];
if (!pager){console.log("no pages");return 0;} // расходимся, тут нечего смотреть
cleanWhitespace(pager);
maxpage = pager.childNodes.length-2; 
threadN = (/blog\/[\w]+\/([\d]+)/g).exec(document.documentURI)[1];


pager.parentNode.removeChild(pager);

function MyLittleCallback(msg)
{
	loadingtxt.parentNode.removeChild(loadingtxt);
	newmsg = eval('('+msg+')').content;
	//комментариев</h2>
	//<div class="item-list">
	newmsg = newmsg.substring(newmsg.search(/коммен[\w\W]+<\/h2>/)+("комментариев</h2>").length);
	newmsg = newmsg.substring(0,newmsg.search(/<div class="item-list"/))
	comments = document.getElementById("comments");
	comments.innerHTML+=newmsg;
//комментарий
//комментариев

	//спойлеры
    Drupal.attachBehaviors(document);

  
	loading = false;
}

$(window).scroll(function (){


if ((window.pageYOffset+window.innerHeight+200)>document.documentElement.offsetHeight&&!loading) {
loading = true;

if (nextpage==maxpage) return 0; 
nextpage++;

loadingtxt = document.createTextNode("loading...");
document.getElementById("comments").appendChild(loadingtxt);


$.ajax({
	type:"GET",
	dataType: "text",
	url:"http://gamin.ru/ajax_comments/js_load_thread/"+threadN+"?page="+nextpage,
	success: function (msg){ MyLittleCallback(msg)},
	error: function () {console.log("epic fail")}
});
}

});

}
main();

