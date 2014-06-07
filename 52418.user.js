// ==UserScript==
// @name           anti-wrotart
// @namespace      Anonymous
// @include        *
// ==/UserScript==
//catch links on 'click' or 'before' click
var catch_links='click';


var query={"busy":false,"call":function(){if(this.q.length>0){next=this.q.shift();if(typeof(GM_xmlhttpRequest)!='undefined'){GM_xmlhttpRequest({"url":next[0],"method":next[2]?"POST":"GET","data":next[2]?next[3]:null,"headers":next[2]?{'Content-type':'application/x-www-form-urlencoded'}:{},"onreadystatechange":this.cb});}else{req=typeof(XMLHttpRequest)!='undefined'?new XMLHttpRequest():typeof(ActiveXObject)!='undefined'?new ActiveXObject("MSXML2.XMLHTTP"):(alert('u\'r browser don\'t support XMLHTTP'));req.onreadystatechange=this.cb;req.open(next[2]?"POST":"GET",next[0],true);req.send(next[2]?next[3]:null);}this.call2=next[1];this.busy=true;}else{this.busy=false;}},'q':[],'add':function(uri,call,ispost,post){this.q.push([uri,call,typeof(ispost)!=undefined?ispost:0,typeof(post)!=undefined?post:null]);if(!this.busy)this.call()},'cb':function(req1){if(req1)req=req1;if(req.readyState==4){if(req.status==200)if(query.call2){query.call2(req.responseText)}query.call()}}}
/*****************************************************************************/
//remakes href for link
function remakelink(b){
    var a=b;
    return function(text){
        var anidb=text.match(/<a href = "(http:\/\/anidb\.net\/perl\-bin\/animedb\.pl\?show=anime&aid=\d+)"/);
	if(!anidb)return;
	anidb=anidb[1];
	a.href=anidb;
    }
}
//"redirects" from original world-art link to anidb
function a_onclick(e){
    var original=e.target.href;
    query.add(original,function(text){
        var anidb=text.match(/<a href = "(http:\/\/anidb\.net\/perl\-bin\/animedb\.pl\?show=anime&aid=\d+)"/);
        if(!anidb){
	//did not found match???
            document.location.href=original;
	    return;
	}
        anidb=anidb[1];
	document.location.href=anidb;
    });
    e.preventDefault();
}
function gooh(){
    var as=document.getElementsByTagName('a');
    var i,anidb;
    for(i in as){
	anidb=as[i].href.match(/http:\/\/anidb\.net\/perl\-bin\/animedb\.pl\?show=anime&aid=\d+/);
        if(anidb){
            document.location.href=anidb[0];
        }
    }
}
function init(){
    var loc=document.location.href;
    if(loc.match(/https?:\/\/(?:www\.)?world\-art\.ru\/animation\/animation\.php\?id=\d+/)){
        gooh();
//        return;
    }
    var as=document.getElementsByTagName('a');
    var i;
    for(i in as){
        if(as[i].href.match(/https?:\/\/(?:www\.)?world\-art\.ru\/animation\/animation\.php\?id=\d+/)){
		if(catch_links=='before'){
                //change href for all links
			query.add(as[i].href,remakelink(as[i]));
		}else{
		//or simply redirect from world-art to anidb
			as[i].addEventListener('click',a_onclick,false);
		}
        }
    }
}
init();
