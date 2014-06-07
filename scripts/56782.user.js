// ==UserScript==
// @name           Mgla
// @namespace      LeproCherdak
// @description    No_no_NO
// @include        *cherdak.leprosorium.ru*
// @include        *leprosorium.ru/my/inbox*
// @include        *leprosorium.ru/comments*
// ==/UserScript==
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
}
(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function noFunc(event,node,user,button,text) {
	alert(button);
	commentIt(event,node,user);
}

function action(){

	if(document.getElementById('comment_textarea')) {
		var locationstr = ''+window.location;
		locationstr = locationstr.replace(/#.*$/gi,'');

		document.getElementById('js-commentsHolder').innerHTML = document.getElementById('js-commentsHolder').innerHTML.replace(new RegExp('target="*_blank"* href\=\"'+locationstr+'\#(.*?)"','ig'),'href="#$1"');
		var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var tabsContent = ' &nbsp; <a class="reply_link" onclick="noFunc(event, this, \'#username#\',#post#,\'нет\'); return false;" href="">нет</a> &nbsp; | &nbsp; '+
		' &nbsp; <a class="reply_link" onclick="noFunc(event, this, \'#username#\',#post#,\'ээ...\'); return false;" href="">ээ</a> &nbsp; | &nbsp; '+
                ' &nbsp; <a class="reply_link" onclick="noFunc(event, this, \'#username#\',#post#,\'неа\'); return false;" href="">неа</a> &nbsp; | &nbsp; '+
		' &nbsp; <a class="reply_link" onclick="noFunc(event, this, \'#username#\',#post#,\'<strong>тепло</strong>\'); return false;" href="">тепло</a> &nbsp; | &nbsp;';
		//' &nbsp; <a class="reply_link" onclick="yesFunc(event, this, \'#username#\',#post#,\'Да!\'); return false;" href="">Да</a> &nbsp; | &nbsp; ';
		
		var formcomm = document.evaluate("//div[@class='bottom_right']", document.getElementById('comments-form'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var formcommdiv=formcomm.snapshotItem(0);
		var buttontabs=document.createElement("span");
		formcommdiv.parentNode.insertBefore(buttontabs, formcommdiv);
		
		var buttons = '<input id="js-post-net" class="image" type="image" onclick="globalFuncNo(\'no\',\'НЕТ\');return false;" alt="НЕТ!" src="http://remizyaka.homeip.net/i/net.gif" style="margin-right:3px;"/>'+
		'<input id="js-post-guljat" class="image" type="image" onclick="globalFuncNo(\'guljat\',\'<i>я пошла детей гулять. гадайте покуда.</i>\'); return false;" alt="ГУЛЯТЬ!" src="http://remizyaka.homeip.net/i/guljat.gif" style="margin-right:3px;"/>'+
		'<input id="js-post-kurit" class="image" type="image" onclick="globalFuncNo(\'kurit\',\'<i>пойду покурю.</i>\'); return false;" alt="КУРИТЬ!" src="http://remizyaka.homeip.net/i/kurit.gif" style="margin-right:3px;"/>'+
		'<input id="js-post-eee" class="image" type="image" onclick="globalFuncNo(\'eee\',\'<strong>ээ...</strong>\'); return false;" alt="ЭЭЭ..." src="http://remizyaka.homeip.net/i/eee.gif" style="margin-right:3px;"/>'+
		'<input id="js-post-spat" class="image" type="image" onclick="globalFuncNo(\'spat\',\'<i>я спать. продолжим завтра. </i>\'); return false;" alt="СПАТЬ!" src="http://remizyaka.homeip.net/i/spat.gif" style="margin-right:3px;"/>';
		buttontabs.innerHTML = buttons;
		for(var idx = 0; idx<posts.snapshotLength; idx++){
			
			var post=posts.snapshotItem(idx);
			var id=post.getAttribute("id");
			var comments = document.evaluate("div[@class='dd']/div[@class='p']/span/a[@class='reply_link']", post, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			if(comments.snapshotLength > 0) {
				comm = comments.snapshotItem(0);
				
				//document.getElementById('allThings').addEventListener("click", function(e){ setActiveTab(this); return false;}, true);
							//tabs.setAttribute("id", "addTabs");
				var re = /return commentIt\(event, this, '(.+)'\);/mi;    
				
				if(re.test(comm.parentNode.innerHTML))	{
					var n1 = RegExp.$1;
					tabs=document.createElement("span");
					comm.setAttribute('id',"main"+id);
					comm.parentNode.insertBefore(tabs, comm);
					tabs.innerHTML = tabsContent.replace(/#username#/gmi,n1).replace(/#post#/gmi,id);
				}
			}
		}
	}
	
}


action();

	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "String.prototype.stripHTML = function(){var matchTag = /<(?:.|\s)*?>/g;return this.replace(matchTag, '');};"+
	"function noFunc(event,node,user,button,text) {commentIt(event,document.getElementById('main'+button),user);document.getElementById('comment_textarea').value = document.getElementById('comment_textarea').value + \"\\n\"+text; document.getElementById('js-post-yarrr').click(); }"+
	"function yesFunc(event,node,user,button,text) {"+
	"if(confirm('Точно?') && !confirm('Может пусть еще помучаются?') && !confirm('А может сначала покурить?'))"+
	"commentIt(event,document.getElementById('main'+button),user);"+
	"var comments = document.evaluate(\"div[@class='dt']\", document.getElementById(button), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);"+
	"comm = comments.snapshotItem(0);"+
	"document.getElementById('comment_textarea').value = '<strong>'+comm.innerHTML.stripHTML()+\"\\nНаписал(а) \"+user+'</strong>' + \"\\n\\n<strong>\"+text+'</strong>'; document.getElementById('js-post-yarrr').click(); }"+
	"function globalFuncNo(button,text) {"+
	"document.getElementById('replyto').value='';"+
	"document.getElementById('comment_textarea').value = text; document.getElementById('js-post-yarrr').click(); return false; }"+
	"";
	
	document.body.appendChild(script);

})();