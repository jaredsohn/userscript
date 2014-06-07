// ==UserScript==
// @name           You're Missing Out
// @description    Get a digest of most installed scripts
// @include        http://userscripts.org/
// @include        http://userscripts.org/?page=*
// ==/UserScript==

var SCRIPT = {
	name: "You're Missing Out",
	namespace: "http://userscripts.org/people/25394",
	description: 'Desplays the top 5 installed scripts on a userscripts.org page',
	source: "http://userscripts.org/scripts/show/8428",
	identifier: "http://userscripts.org/scripts/show/8428.user.js",
	version: "0.2",								// version
	date: (new Date(2007, 4, 28))		// update date
			.valueOf()
};

var number=5;
var biggest=Array()
for (var i=0;i<number;i++){
    biggest[i]=Array(0,0)
}
var content=document.getElementById('content');
var al=content.getElementsByTagName("tr")

for (var i=1;i<al.length;i++){
    tds=al[i].getElementsByTagName('td')
   try{
    num=tds[2]
        .getElementsByTagName('p')[1]
        .innerHTML.split(' ')[0].replace(',','')
   }catch(e){}
    name=tds[1].getElementsByTagName('a')[0]
    numname=Array(parseInt(num),name)
    for (var x=0;x<biggest.length;x++){
        if (numname[0]>biggest[x][0]){
            var tmp=biggest[x]
            biggest[x]=numname
            numname=tmp
        }
    }
}
var ndiv=document.createElement("div")
for (var i=0;i<biggest.length;i++){
    var na=document.createElement('a')
    biggest[i][1].name=biggest[i][1].innerHTML
    na.href="#"+biggest[i][1].innerHTML
    na.innerHTML=biggest[i][1].innerHTML
    ndiv.style.fontSize="10px";
    ndiv.appendChild(document.createTextNode(' '+biggest[i][0]+': '))
    ndiv.appendChild(na)
    ndiv.appendChild(document.createElement('br'))
}
if ((''+document.location).split("page=").length==2){
    page=parseInt((''+document.location).split("page=")[1])}
else{page=1}
if (page>1){
    back=ndiv.appendChild(document.createElement('a'))
    back.appendChild(document.createTextNode("< Back"))
    back.href="http://userscripts.org/?page="+(page-1)
}
ndiv.appendChild(document.createTextNode('  '))
next=ndiv.appendChild(document.createElement('a'))
next.appendChild(document.createTextNode("Next >"))
next.href="http://userscripts.org/?page="+(page+1)

content.insertBefore(ndiv,content.firstChild)