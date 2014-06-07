// ==UserScript==
// @name           Kraland réponse direct
// @namespace      ki
// @version        1.0
// @description    Ajoute la zone de réponse dans la page de lecture du sujet en cours
// @include        http://www.kraland.org/main.php?page=4;*
// ==/UserScript==

//var url = document.location.href;
//var pages = url.split('?')[1].split('page=')[1].split('&')[0].split(';');
//var forum = parseInt(pages[1]), topic = parseInt(pages[2]), page = parseInt(pages[3]) || 1;


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




var msg_mask = (/<form.*?post_msg(?:.|\s|\S)*?<\/form>/g);
var forum_container = $E('body').xpath('//div[@class="forum"]')[0];


var pages_max = parseInt(forum_container.xpath("child::div")[0].textContent.split('|').slice(-1)[0]);

var add_reponse= function(/*post_voulu, type*/)
{
    var url = document.location.href;
    var pages = url.split('?')[1].split('page=')[1].split('&')[0].split(';');
    var forum = parseInt(pages[1]), topic = parseInt(pages[2]), page = parseInt(pages[3]) || 1;
    
    var reponses = '';
    
    var inputs = document.getElementsByTagName('input');
    for (i=0;i<inputs.length;i++) {
        if (inputs[i].type.match("checkbox") && inputs[i].checked)
        {
            if (inputs[i].id.match(/(\d{7})(3|4)/)) {
            //alert(RegExp.$1); alert(RegExp.$2);
            var url = "main.php?page=4;"+forum+";"+topic+";"+page+";"+RegExp.$1 + "&p0="+RegExp.$2+'';
            http_lnk("get", url, '', function(txt){
                while((/<textarea(.*?)\)\">([.\s\S]*)?<\/textarea>/g).exec(txt)){
                reponses += RegExp.$2 + "\n\n\n";
                } 
              });
            
            }
        }
    }
    
    if(!topic) return; 

    var url = "main.php?page=4;"+forum+";"+topic+";"+page+";"+"0&p0=3";
    
    http_lnk("get", url, '', function(txt){
        var tmp = forum_container.xpath("child::div[last()]")[0].dispose();
        var str;
        while((str=msg_mask.exec(txt))){
            
            forum_container.innerHTML += str[0].replace((/<textarea(.*?)\)\">([.\s\S]*)?<\/textarea>/g),'<textarea name="message" cols="100" rows="12" style="width:98%;height:300px;" onFocus="loadpos(this)" onclick="loadpos(this)" onkeyup="loadpos(this)" onselect="loadpos(this)">'+reponses+'</textarea>');
        } //forum_container.scroll_ready = true;
        
        tmp.inject(forum_container);
        //var textarea = tmp.getElementsByTagName('textarea');
        //alert(textarea.length);
    //alert(reponses);
    });
    
    tmp.inject(forum_container);
}


var link_post = function(ev)
{
    var posts = document.getElementsByClassName("post_foot");
    if (!posts) {alert("Erf"); return 0;}
    
    for (var i=0; i<posts.length; i++)
    {
        var links = posts[i].getElementsByTagName('a');
        
        if (!links) {alert("Erf"); break;}
        for (var j=0; j<links.length; j++)
        {
            if (links[j].href.match(/4;(\d*;\d*;\d*);(\d*)\&p0=(3|4)/))
            {
                //links[j].href = 'javascript:alerte("'+RegExp.$1+'")';
                var check = document.createElement('input');
                check.type = "checkbox";
                check.id = RegExp.$2 + RegExp.$3;
                //check.addEventListener('click', function(e){ add_reponse(RegExp.$2, RegExp.$3, e); }, false);
                posts[i].appendChild(check, posts[i].firstChild);
                
                if (RegExp.$3 = 4) break;
            }
          
        }
    }
    var post_container = document.getElementsByClassName("forum")[0];
    post_container.lastChild.previousSibling.previousSibling.previousSibling.firstChild.firstChild.nextSibling.nextSibling.href='javascript:;';
    post_container.lastChild.previousSibling.previousSibling.previousSibling.firstChild.firstChild.nextSibling.nextSibling.addEventListener('click', function(){ add_reponse(); }, false);
}

window.addEventListener('load', link_post, true) ;

aaus_50581={
i:'50581', // Script id on Userscripts.org
d:1, // Days to wait between update checks
n:'Kraland réponse direct',v:'10',t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',onload:function(x){aaus_50581.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s+(.*)\s*\n/i.exec(x.responseText);this.xn=/\/\/\s*@name\s+(.*)\s*\n/i.exec(x.responseText);if(this.xv&&this.xn[1]==this.n){this.xv=this.xv[1].replace(/\./g, '');this.xn=this.xn[1];}else{if(x.responseText.match('Uh-oh! The page could not be found!')||this.xn[1]!=this.n)GM_setValue('updated', 'off');return false;}if(this.xv>this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv>this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_50581.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50581.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_50581.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_50581.ch();