// ==UserScript==
// @name           Kraland forum endless
// @namespace      kraland
// @include        http://www.kraland.org/main.php?page=4;*
// ==/UserScript==

// Une fois sur un topic, apres 90% de la page, la page suivante se charge et s'affiche a la suite des messages existants.


function sprintf(str){
  for(var i=1, max = arguments.length; i<max;i++){
    str=  str.replace(/%d/, arguments[i]);
  } return str;
}

function http_lnk(method,url,data,async_func){
  if(url.substr(0,5)!='http:') url = "http://www.kraland.org/"+url;
  GM_xmlhttpRequest({
    method:"GET",
    url:url,
    overrideMimeType :"text/html; charset=ISO-8859-1",
    onload:function(res){
        if( res.readyState==4 && (/200|404/).test(res.status)) async_func(res.responseText);
    }
  });
}

var inserters = {

	bottom: function(context, element){
		element.appendChild(context);
	}
};


var ExtendedProto = {
  xpath:function(aExpr) {
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(this.ownerDocument == null ?
    this.documentElement : this.ownerDocument.documentElement);
    var result = xpe.evaluate(aExpr, this, nsResolver, 0, null);
    var found = [], res; while (res = result.iterateNext()) found.push($(res));
    return found;
  },

	inject: function(el, where){
		inserters[where || 'bottom'](this, el);
		return this;
	},
	getParent: function(){
		return $(this.parentNode);
	},

  dispose: function(){
    return (this.parentNode) ? this.parentNode.removeChild(this) : this;
 }
};
function $type(a){return typeof(a); }
function $E(a){ return $(content.document.getElementsByTagName(a)[0]); }

function $(a){
    if($type(a)=="string") a = content.document.getElementById(a).wrappedJSObject;
    else if(a.wrappedJSObject) a = a.wrappedJSObject;

    if(!a) return null;

    if(!a.__proto__.__extend){
        a.__proto__.__extend = true;
        for(var tmp in ExtendedProto) 
            a.__proto__[tmp]  = ExtendedProto[tmp];
    } return a;
}




var msg_mask = (/<div.*?post_container(?:.|\s|\S)*?post_foot(?:(?:.|\s|\S)*?<\/div>){2}/g);
var forum_container = $E('body').xpath('//div[@class="forum"]')[0];


var url = document.location.href;
var pages = url.split('?')[1].split('page=')[1].split('&')[0].split(';');
var forum = parseInt(pages[1]), topic = parseInt(pages[2]), page = parseInt(pages[3]) || 1;

if(!topic) return; 

var url_mask  = "main.php?page=4;%d;%d;%d"
forum_container.scroll_ready= true;
var pages_max = parseInt(forum_container.xpath("child::div")[0].textContent.split('|').slice(-1)[0]);



window.addEventListener('scroll', function(){
    if(page == pages_max
        || (!forum_container.scroll_ready)
        || document.body.clientHeight+this.pageYOffset < 0.9 *document.body.scrollHeight) return;

    forum_container.scroll_ready = false; page++;
    var url = sprintf(url_mask, forum, topic, page);
    http_lnk("get", url, '', function(txt){
        var tmp = forum_container.xpath("child::div[last()]")[0].dispose();
        var str;
        while((str=msg_mask.exec(txt))){
            forum_container.innerHTML += str[0];
        }forum_container.scroll_ready = true;
        tmp.inject(forum_container);

    });
},false);