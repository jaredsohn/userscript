// ==UserScript==
// @name        Links to Images
// @author Sergio Abreu
// @namespace   http://software.sitesbr.net
// @description Transform links of images in the images themselves
// @include     *
// @exclude     *google.com*
// @version     1.4
// @grant       none
// ==/UserScript==

var tt = function(){

var dc, li, im, found=false;
dc=document;
li=dc.links;
im=dc.images;

	function lkstoimgs(doit){
	
		for(var j=0; j<li.length; j++){
		  if(li[j].href.match(/.+\.(jpe?g?|gif|png|bmp|tiff?|wmf|svg)/i)){
		    if( im.length == 0 && !doit){
 		       return true;
		    } 
		    else{
		    	for(var k=0; k<im.length; k++){
			      if(im[k].src == li[j].href){
			         found=true; break;
			      }
			    }
		    }
                if(!doit){
                    if( !found) return true;
                }
                else if(!found && doit){
		       img = document.createElement('img');
		       img.src = li[j].href;
                   if(li[j].parentNode)
		         li[j].parentNode.insertBefore(img, li[j]);
		       else
	               document.body.appendChild(img);
		    }
		    found = false;
		  }
		}
	  return false;
	}  


   function put_lkim_button(){
   
	bt = 	document.createElement('input');
	bt.type="button";
	bt.value="Lk->im";
	bt.id="bt_lkstoimgs";	
	bt.setAttribute("onclick", "lkstoimgs(1)");
	bt.setAttribute("title", "by Sergio Abreu®");
	try{
	if( top.location.href.match(/facebook.com/)){
		bt.setAttribute("style", "padding:0;");	
		document.getElementById('blueBar').appendChild(bt);
	} else {
		bt.setAttribute("style", "padding:0; position:fixed; bottom:0; left:0; z-index:100000");	
		document.body.insertBefore(bt, document.body.firstChild);
	}
	}catch(e){}

   }   
   
  
};

tt += "";	
sc = document.createElement('script');
sc.type = "text/javascript";	
sc.innerHTML = tt.substring( 13, tt.length -2);
document.getElementsByTagName('head')[0].appendChild(sc);

window.addEventListener('load', function(){ if(lkstoimgs(false) || location.href.match(/facebook.com/))put_lkim_button();}, false);