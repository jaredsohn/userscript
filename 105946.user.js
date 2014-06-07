// ==UserScript==
// @name        Nankai Xuanke
// @namespace   http://jackfengji.appspot.com
// @description Display the left frame in Nankai Xuanke System
// @version     1.3
// @license     Jackfengji
// @include     http://222.30.32.10/stdleft.jsp
// ==/UserScript==


function displayLeft() {
	try {
	    var ddd = document;
	} catch(e) {
	    console.log(e);
        return ;
	}
    var myLayer=new Array();
    var NN = 0;
    var IE = 1;
    var subLeft = 0;
    var VISIBLE = 'visible';
    
    for (var i = 0; i < 12; ++i) {
    	myLayer[i] = ddd.getElementById("MFX" + i).style;
    }

    var MFXmain=new Array();
    for(var i = 0; i<myLayer.length; i++){
        var mainORsub= i % 2;
        MFXmain[i] = mainORsub ? 0:1;
    }
    var myTop=new Array();
    var myLeft=new Array();
    var myHeight=new Array();
    var myWidth=new Array();
    var mySlide=new Array();
    for(i=0; i<myLayer.length; i++){
        if(MFXmain[i]){
            if(i==0){
                myLeft[i]=parseInt(myLayer[i].left);
                myTop[i]=parseInt(myLayer[i].top);
            } else {
                myLeft[i]=myLeft[i-2];
                myTop[i]=myTop[i-2]+myHeight[i-2];
            }
            myHeight[i]=parseInt(myLayer[i].height);
            myWidth[i]=parseInt(myLayer[i].width);
            myLayer[i].left=myLeft[i];
            myLayer[i].top=myTop[i];
            myLayer[i].visibility=VISIBLE;
        }
        if(!MFXmain[i]){
            myTop[i]=myTop[i-1]+myHeight[i-1];
            myLeft[i]=myLeft[i-1];
            myHeight[i]=parseInt(myLayer[i].height);
            myWidth[i]=parseInt(myLayer[i].width);
            myLayer[i].left=myLeft[i]+subLeft;
            myLayer[i].top=myTop[i];
            mySlide[i]=myTop[i]+myHeight[i];
        }
    }
}
displayLeft();