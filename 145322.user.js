// ==UserScript==
// @name       move_IM
// @version    0.1
// @description  enable moving in inn im
// @match      http://*inn.co.il/My/IM/lmf_.aspx*
// ==/UserScript==


do_it=  function() {
	URLscript=document.createTextNode(doAtStart +"\n doAtStart();");
	var Uscript = document.createElement('script');
	Uscript.setAttribute('language','javascript');
	Uscript.setAttribute('id','innedit');
	document.body.appendChild(Uscript);
	document.getElementById('innedit').appendChild(URLscript);
	
	
	};


function doAtStart(){
    dctrl=false;
    dleft=false;
    dright=false;
document.onkeydown=function(e){
 var e=window.event || e;
    //alert(e.keyCode);
if (e.keyCode==17){dctrl=true;if(dleft)toogle(true);if(dright)toogle(false);}
if (e.keyCode==188){dleft=true;if(dctrl)toogle(true);}
if (e.keyCode==190){dright=true;if(dctrl)toogle(false);}
}
document.onkeyup=function(e){
 var e=window.event || e;
if (e.keyCode==17){dctrl=false;}
if (e.keyCode==188){dleft=false;}
if (e.keyCode==190){dright=false;}


}//188 190
    function  toogle(left){
        var newtab=0;
        if (left) {newtab=(Tabs.Tabs[Tabs.Active+1])?Tabs.Active+1:0;}
        else {if(Tabs.Active==0){newtab=Tabs.Tabs.length-1;}else{newtab=Tabs.Active-1;}}
        IMGUI.SetActive(newtab);
    };
    cc=_("editorComposition2");
    cc.contentDocument.onkeydown=document.onkeydown;
    //alert(cc.contentDocument.onkeydown);
cc.contentDocument.onkeyup=document.onkeyup;
cc.contentWindow.toogle=function(left){        parent.toogle(left);
}


   // alert(cc.contentDocument.onkeydown);
}

do_it();


