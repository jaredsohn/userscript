// ==UserScript==
// @name        ShoutBlox
// @namespace   gbatemp
// @author      snailface
// @description Ignore shoutbox users on GBAtemp.
// @include     http://gbatemp.net/
// @include     http://gbatemp.net/taigachat/
// @include     http://gbatemp.net/forum/
// @version     1.2
// ==/UserScript==

var names=[
"user1",
"user2",
"user3"
//feel free to add more names above this line, but remember ...
//no comma at end of last name
];

for(var x=0;x<names.length;x++){
    names[x]=names[x].toLowerCase();
    names[x]=names[x].replace(' ','-');
}

var count=[];
for(var b=0;b<names.length;b++){
count[b]=0;
}

var gg=document.getElementById('taigachat_box');
var text = document.createElement('div');
text.style.background='#305D88';
text.style.color='white';
text.style.borderRadius='5px';
text.style.padding='5px';
text.style.margin='10px 0px 0px 0px';
gg.parentNode.appendChild(text);
text.onclick=show;
var toggle=-1;

function ignore(){
    var i,j,blocked=0;
    var posts=document.getElementById('taigachat_box').getElementsByClassName('username');      
    
    for(var b=0;b<names.length;b++){
    count[b]=0;
    }
    for(j=0;j<names.length;j++){
        for(i=0;i<posts.length;i++){
            if(posts[i].href.indexOf(names[j]) > -1){
                
                if(toggle==-1)posts[i].parentNode.style.display='none';
                else
                posts[i].parentNode.style.display='block';
                
                blocked++;
                count[j]++;
            }
        }
    }
  
    if(toggle==-1){
        text.innerHTML='<b>ShoutBlox</b><br>Ignoring '+blocked+' posts';
    }
}

setInterval(function(){
    ignore();
},500);

function show(){

    var t='<b>Members Blocked:</b>';
    toggle=-toggle;
    for(var c=0;c<names.length;c++){
        t+=('<br>'+count[c])+' '+names[c];
    }
    t+='<br><i><b>blocking paused</b></i>';
    text.innerHTML=t;

}