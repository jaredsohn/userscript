// ==UserScript==
// @name Change BG color
// ==/UserScript==
// 
// 
// 
// 

(function () {
   
		var myStringArray = ["blogspot","blogger","stackoverflow","google","cari","facebook"];
		
		for (var i = 0; i < myStringArray.length; i++) {
   			
			if( window.location.hostname.indexOf(myStringArray[i]) !== -1){
				
        		document.body.setAttribute("style", "background-color: #EDE79F;");
			//document.body.setAttribute("style", "background-image: url('http://us.123rf.com/450wm/peshkova/peshkova1303/peshkova130300116/18187732-photo-light-and-brick-room.jpg');");
				//document.body.style.backgroundImage="url('D:\0000 PersonalVideoPhoto\20130616 Athens trip\Day 0\DSC_0017.jpg')";
			}
		}		

})();


