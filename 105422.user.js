// ==UserScript==
// @name           Show Tinyurls on notes1
// @author         Unknown
// ==/UserScript==
/*
 	
*/
javascript:(function (){

var config_html = '<div>' +
               '<div id="links"></div>' +
               '<iframe id="myframe" width="99%" height="99%"></iframe>"'
              '</div>';

var gifts=new Object();
var postnum=0;
var fdocument;
create_div();

	function create_div() {
		document.getElementsByTagName('body')[0].innerHTML = config_html;
		document.getElementById('myframe').onload=getLinks;
		document.getElementById('myframe').src=document.location.href+'?a=1';
		
		
	}
	
	function getLinks(){
		fdocument=document.getElementById('myframe').contentWindow.document;		
		var posts=fdocument.getElementsByClassName('postbody');
		var i;
		for(i=0;i<posts.length;i++) {
			postnum++;
			parseLinks(posts[i].innerHTML);
		}
		nextPage();
	}
	
	function nextPage(){
		var found=false,i,m,url=document.getElementById('myframe').src;
		var links=fdocument.getElementsByClassName('gensmall')[0].getElementsByTagName('a');
		for(i=0;i<links.length;i++){
			if(links[i].innerHTML=="Next") {
				document.getElementById('myframe').src=links[i].href;
				found=true;
			}
		}
		if (!found) {
			showLinks();
		}
		
	
	
	}

	function parseLinks(post) {
		post=post.replace(/\n/g,"");
		post=post.replace(/\r/g,"");
		lines=post.split('<br>');
		var i;
		var m;
		for(i=0;i<lines.length;i++) {
			if(m=/^([^<:]+):\s*<a[^>]*>([^<]+)</.exec(lines[i])) {
				addLink(m[1],m[2]);				                                                                       	
			}
			else if(m=/^([^\=]+)\s+\=\&gt;\s*<a[^>]*>([^<]+)</.exec(lines[i])) {
				addLink(m[1],m[2]);				                                                                       	
			}
			else if(m=/href\=\"([^\"]+)\".*>([^>]*)</.exec(lines[i])) {
				addLink(m[2],m[1]);				                                                                       	
			}
		}
	}
	function addLink(name,link) {
		name=name.toUpperCase();
		if (name.indexOf('HTTP:')!=-1) { return; }
		if (link.indexOf('profile.php')!=-1) { return; }
		if (!gifts[name]) {
			gifts[name]=new Object();
		}
		if (!gifts[name][link]) {
			gifts[name][link]=postnum;
		}
	}
	
	function showLinks() {
		var name,link, links, html="", overview="",count=0;
		
		for(name in gifts) {
			links="";
			overview+="<a href='#a"+count+"'>"+name+"</a> - ";
			html+="<a name='a"+count+"'><h3>"+name+"</h3></a><textarea cols=60 rows=20 onclick='select();'>";
			for(link in gifts[name]){
				html+=link+"\n";
				links+=gifts[name][link] + ' : '+name+' : <a target="_blank" href="'+link+'">'+link+'</a><br />';
			}
			html+="</textarea><br />"+links+"<br />";		
			count++;			
		}
		document.getElementById('links').innerHTML=overview+html;
	}
})();