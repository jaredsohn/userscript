
// ==UserScript==
// @name noWhiteBackgroundColor-Opera
// ==/UserScript==
(function (D,W) {
    window.opera.addEventListener("AfterEvent.load",function(e){
    	var oElement=D.all;
    	for(var i=0,j;j=oElement[i];i++){
    		(function(){
    			var bgCH=W.getComputedStyle(j,null).backgroundColor;
    			if(bgCH!="transparent"){
    				var R=0,G=0,B=0;
    				if(bgCH.charAt(0)=="#"){
	    				R=parseInt(bgCH.substring(1,3),16);
	    				G=parseInt(bgCH.substring(3,5),16);
	    				B=parseInt(bgCH.substring(5,7),16);
	    			}
	    			else if(bgCH.charAt(3)=="("){
	    				var RGB=bgCH.slice(4).split(",");
	    				R=parseInt(RGB[0],10);
	    				G=parseInt(RGB[1],10);
	    				B=parseInt(RGB[2],10);
	    			}
	    			else{
	    				console.log(j);
	    			}
	                if (R>=220&&R<=255 && G>=220&&G<=255 && B>=220&&B<=255){
	                    j.style.setProperty('background-color','rgb(204,233,199)','!important');
					}
    			}
    			else if(j==D.body){
    				j.style.setProperty('background-color','rgb(204,233,199)','!important');
    			}
    		})();
    	}
    }, false);
})(window.document,window);
