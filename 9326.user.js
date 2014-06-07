// ==UserScript==
// @name           Odeo Inline
// @namespace      http://userscripts.org/users/25394
// @include        http://odeo.com/inbox
// ==/UserScript==

function $(e){return document.getElementById(e);}

(function(){

function delet(){
    var http = new XMLHttpRequest();
    dels=$('remove-form');
    p=''
    for (var i=0;i<dels.length;i++){
        if (dels[i].checked){
            p+='&delete[]='+dels[i].value;
        }
    }
    im=$('delbutton').appendChild(new Image())
    im.src="http://jabasite.ej.am/images/jp.gif"
    im.padding="2px"
    var url = "/audio/remove_from_queue";
    var params = p.substr(1);
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            dels=$('remove-form');
            $('delbutton').removeChild($('delbutton').lastChild)
            for (var i=0;i<dels.length;i++){
                if (dels[i].checked){
                    dels[i].parentNode.parentNode.removeChild(dels[i].parentNode);
                }
            }
        }
    }
    http.send(params);
}
$('remove-form').action=""
dv=document.createElement('span');
dela=$('delete-all');
dv.style.border="1px solid gray"
dv.style.fontSize="14px"
dv.style.backgroundColor="#FFFFCC"
dv.style.padding="0px 6px 0px 6px"
dv.style.cursor="pointer"
dv.innerHTML="Delete Checked";
dv.addEventListener('click',delet,true);
dv.id="delbutton"
dela.parentNode.insertBefore(dv,dela);
dela.parentNode.removeChild(dela);



function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
function findLi(obj){
    no=obj.parentNode
    while (no.tagName!="LI"){
        no=no.parentNode;
    }
    return no;
}
imgs=document.getElementsByTagName('img');
for (var i=0;i<imgs.length;i++){
    img=imgs[i];
    if (img.className=='icon'){
        img.parentNode.href=""
        img.addEventListener('mousedown',
                             function(){
                div=document.body.appendChild(document.createElement('div'));
                div.style.position="absolute";
                [x,y]=findPos(this);
                div.style.left=x+'px';//+this.offsetWidth
                li=findLi(this);
console.log(li,findPos(li)[1],li.offsetHeight/2,50/2,findPos(li)[1]+li.offsetHeight/2-70/2)

                div.style.top=findPos(li)[1]+li.offsetHeight/2-50/2+'px';
                div.style.height="50px"
                div.style.border="2px solid #000000"
                div.style.backgroundColor="#eff6f8"
div.innerHTML='<embed src="http://media.odeo.com/flash/odeo_player.swf?v=3" quality="high" wmode="transparent" bgcolor="#eff6f8" width="490" height="70" name="player" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="type=audio&id='+this.alt+'&auto_play=true" />'
               /* em=document.createElement('embed');
                em.src="http://media.odeo.com/flash/odeo_player.swf?v=3"
                em.wmode="transparent"
                em.quality="high"
                em.bgcolor="#eff6f8"
                em.width="490"
                em.height="70"
                em.name="player"
                em.align="middle" 
                em.allowScriptAccess="always"
                em.type="application/x-shockwave-flash"
                em.pluginspage="http://www.macromedia.com/go/getflashplayer"
                em.flashvars="type=audio&id=1"+img.alt+"&auto_play=true"
                div.appendChild(em);*/
                im=div.appendChild(new Image());
                im.style.cursor="pointer"
                im.src="http://www.columbia.edu/cu/chess/palview4/jpc/x.gif"
                im.addEventListener('click',function(){
                        this.parentNode.parentNode.removeChild(this.parentNode);
                    },false);
                return false;
            },false);
      }
}

})()

//made 5/17/2007
