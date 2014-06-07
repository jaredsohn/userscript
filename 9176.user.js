// ==UserScript==
// @name           EZ resize
// @namespace      http://userscripts.org/users/25394
// @description    resize textareas with ease
// @include        *
// ==/UserScript==

(function(){

var resizing=null;


function findpos(obj) {
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

function mousepos(e){
	var posx = 0;
	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageX || e.pageY) 	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
        return [posx,posy];
}

var originalsize = {};

function mainmove(e){
    if (resizing){
        mpos=mousepos(e)
        pos=findpos(resizing)
        resizing.style.width=(mpos[0]-pos[0])+'px';
        if (resizing.type=="textarea"){
            resizing.style.height=(mpos[1]-pos[1])+'px';
        }
        resizing.blur();
    }
}

document.addEventListener('mouseup',function(){resizing=null;},false)
document.addEventListener('mousemove', mainmove, false)



var txts=document.getElementsByTagName('textarea');

for (var i=0;i<txts.length;i++){
    var text=txts[i];
    originalsize[text] = [text.offsetWidth,text.offseHeight];

    text.addEventListener('mousedown',function(e){
        pos=findpos(this)
        mpos=mousepos(e)
        if (mpos[0]>pos[0]+this.offsetWidth-10){
            if (mpos[1]>pos[1]+this.offsetHeight-10){
                if (e.button==2){
                    this.style.width = originalsize[this][0]+'px';
                    this.style.height = originalsize[this][1]+'px';
                }else{
                resizing=this;
                this.blur();
                }
            }
        }
    },true);

    
    text.addEventListener('mousemove',function(e){
        pos=findpos(this)
        mpos=mousepos(e)
        if (mpos[0]>pos[0]+this.offsetWidth-10){
            if (mpos[1]>pos[1]+this.offsetHeight-10){
                this.blur();
                this.style.cursor="nw-resize";return
            }
        }
        if (!resizing){
            this.style.cursor="auto";
        }
    },true);
}


var imps=document.getElementsByTagName('input');
for (var i=0;i<imps.length;i++){
    input=imps[i];
    originalsize[input] = [input.offsetWidth,input.offseHeight];
    if (input.type=="text" || !input.type){
        input.addEventListener('mousedown',function(e){
            pos=findpos(this)
            mpos=mousepos(e)
            if (mpos[0]>pos[0]+this.offsetWidth-10){
                if (e.button==2){
                    this.style.width = originalsize[this][0]+'px';
                    this.style.height = originalsize[this][1]+'px';
                }else{
                resizing=this;
                this.blur();
                }
            }
        },true);

        input.addEventListener('mousemove',function(e){
            pos=findpos(this)
            mpos=mousepos(e)
            if (mpos[0]>pos[0]+this.offsetWidth-10){
                this.blur();
                this.style.cursor="w-resize";return
            }
            if (!resizing){
                this.style.cursor="auto";
            }
        },true);
        


    
    }
}



})()
