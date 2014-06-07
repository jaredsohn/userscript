// ==UserScript==
// @name           ADVANsCEne: Filter NDS releases per region.
// @namespace      uri:opaquepink@gmail.com,2007-11:ADVANsCEne
// @description    You can now toggle regions on the NDS Release List. For example you can toggle away all those Japanese releases that you do not understand anyway.
// @include        http://advanscene.com/html/dbndsrel.*
// @include        http://*.advanscene.com/html/dbndsrel.*
// ==/UserScript==
function check(c,d){d=d.replace(/\-/g, "\\-");var f=new RegExp("(^|\\s)"+d+"(\\s|$)");return f.test(c.className);}
var filters={Japan:"j",USA:"u",Europe:"e",Korea:"k",France:"f",Italy:"i",Germany:"g",Spain:"s",Netherlands:"n",Russia:"r",Australia:"l",China:"c"},i='',a=document.createElement('div'),g=["reg","breg","ereg"];

a.appendChild(document.createTextNode('Region filters: '));
for(var filter in filters){
	if(n){a.appendChild(document.createTextNode(', '));}
	else{var n=1;}
	var b=document.createElement('a');
	b.setAttribute('name',filters[filter]);
	b.addEventListener('click',function(){
		var c=document.getElementsByTagName('table')[2];
		var d='no-'+this.getAttribute('name');
		if(check(c,d)){var e=c.className.match(' '+d)?' '+d:d;c.className=c.className.replace(e,'');c.className.replace(/^\s./,'');this.style.textDecoration='none';}
		else{c.className+=c.className?' '+d:d;this.style.textDecoration='line-through';}
	},false);
	b.appendChild(document.createTextNode(filter));
	a.appendChild(b);
	for(var h in g){
		i+='.no-'+filters[filter]+' .'+filters[filter]+g[h]+',';
	}
}

var j=document.createElement('style');
j.setAttribute('type','text/css');
j.innerHTML=i.substring(0,i.length-1)+' {display:none;}';
document.getElementsByTagName('head')[0].appendChild(j);
document.getElementById('rm').appendChild(a);