// ==UserScript==
// @name        dptI
// @namespace   4chan
// @description DPT Image Changer
// @include     http://boards.4chan.org/g/res/*
// @version     1.4
// @grant       none
// ==/UserScript==
    
 
var pics = ["http://rbt.asia/boards/g/thumb/0358/34/1375841258384s.jpg", "http://rbt.asia/boards/g/thumb/0303/46/1357103703120s.jpg", "http://rbt.asia/boards/g/thumb/0358/03/1375739720571s.jpg", "http://rbt.asia/boards/g/thumb/0357/54/1375578953405s.jpg","http://rbt.asia/boards/g/thumb/0358/48/1375901084998s.jpg"];
var names = ["Stickman", "Asuka", "Yuki", "The Good One","Misato"];
var fullLinks = ["http://rbt.asia/boards/g/img/0358/34/1375841258384.png","http://rbt.asia/boards/g/img/0303/46/1357103703120.jpg","http://rbt.asia/boards/g/img/0358/03/1375739720571.png","http://rbt.asia/boards/g/img/0358/03/1375742692171.png","http://rbt.asia/boards/g/img/0358/48/1375901084998.png"];
 
    function dpti_init() {
    	/*
        stickman[0]
        asuka[1]
        yuki[2]
        the good one[3]
        Misato[4]
        */

    	
    	var threads = document.getElementsByClassName("thread");
    	
    	//loop through all threads.
    	for (i = 0; i < threads.length; i++){
    		
    		var threadID = threads[i].getAttribute("id").replace("t", "");
    		
    		if (isDpt(threadID)){
    			
    			//change thread image to last user choice or to default
    			changeImage(threadID,getChoice());
    			
    			
    			//initialize the menu
    			var menu = document.createElement("select");
    			menu.setAttribute("style", "padding: 1px;margin: 5px");
    			menu.setAttribute("id", "dptI" + threadID);
    			menu.addEventListener("change",function(){hDPTi(threadID);},false)
    			menu.value = names[3];
			
				//add menu items
    			for (i = 0; i < pics.length; i++) {
    				var e = document.createElement("option");
    				e.value = i
    				e.text = names[i];
    				menu.appendChild(e);
    			}

				//add the menu
    			document.getElementById("pi" + threadID).appendChild(menu);
    			
    		}
    		
    	}
 
    }
	
	function hDPTi(id){	
		changeImage(id, document.getElementById("dptI" + id).value)		
	}
	
	// 'i' is the index of the image.
    function changeImage(threadID, i){		    
		    //Change file name.
		    var fileText = document.getElementById("fT" + threadID).textContent = " (" + names[i] + ".bmp)";

		    
		    var imageAnchor = document.getElementById("f" + threadID).children[1];
		    
		    //Change the thumbnail href.
		    imageAnchor.href = fullLinks[i];
		 
		    var imageElement = imageAnchor.children[0];
    		imageElement.src = pics[i];
   			//fix image aspect ratio
    		imageElement.setAttribute("style","");
   
   			//save choice
   			setCookie("dptic",i,9);
    }
    
    function isDpt(threadID){
    	var r = /Daily\ Programming\ Thread|What\ are\ you working\ on/ig;
    	var subjectText = document.getElementById("pi" + threadID).getElementsByClassName("subject")[0].textContent;
    	var commentText = document.getElementById("m" + threadID).textContent;
   		return(r.test(subjectText + " " + commentText));
    }
  
function getChoice(){	
	if (getCookie("dptic") == ""){
		return 3;
	}else{
		return getCookie("dptic");
	}	
}
  
function getCookie(name) {
    with (document.cookie) {
        var regexp = new RegExp("(^|;\\s+)" + name + "=(.*?)(;|$)");
        var hit = regexp.exec(document.cookie);
        if (hit && hit.length > 2) return decodeURIComponent(hit[2]);
        else return '';
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}
    
        
(function() { Main.init(); dpti_init(); } ).call(this);