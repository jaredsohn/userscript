// JavaScript Document

// ==UserScript==
// @name        ljetni fer2.net banner
// @version 	0.2
// @include 	http://*.fer2.net/*
// @author      gh0c
// ==/UserScript==


// A function that loads jQuery and calls a callback function when jQuery has finished loading
// Credits: Erik Vold; http://erikvold.com/
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
function main() {


        
		function removeElements() {
			// Remove header with logo banner
			
			$('#hdr').remove();
			$('#nav_btm').remove();
			$('body').css('margin-top' ,'0px');
	
            
		}


        function postaviManjiLogo(){
		
            
            /************************\
            |******* POZADINA *******|
    		\************************/ 
    		logo_wrapper=$(document.createElement('div'));
    	
    		logo_wrapper.css('background', '#ffad33 url(http://www.deviantpics.com/images/pTe6M.png) repeat-x');
            logo_wrapper.css('position', 'relative');

            /************************\
            |****** LIJEVII DIO *****|
    		\************************/    		
    		logo=$(document.createElement('div'));
    		logo.css('display','inline');

    		img=$(document.createElement('img'));
    		img.attr('src', 'http://www.deviantpics.com/images/5Xf6N.png');
    		logo.append(img);
    		
    		logo_wrapper.append(logo);
    		

    		
    		
    		/************************\
            |******* DESNI DIO ******|
    		\************************/
    		logoRs=$(document.createElement('div'));
            logoRs.css('float','right');
    
    		img=$(document.createElement('img'));
    		img.attr('src', 'http://www.deviantpics.com/images/G4Xl.png');

            logoRs.append(img);
    		logo_wrapper.append(logoRs);
            
            

    		
    		/************************\
            |****** POPUP VELIKI ****|
    		\************************/
    		

            popupDiv=$(document.createElement('div'));
            popupDiv.attr('style','style=" position:relative;"')
            popupDiv.attr('id','popupDivId')
            
            /*****RIBE******\
    		\***************/
            imgPopup=$(document.createElement('img'));
    		imgPopup.attr('src', 'http://www.deviantpics.com/images/8Iy0o.png');
    		imgPopup.css('position', 'absolute');
    		imgPopup.css('left', '420px');
    		imgPopup.css('top', '132px');
    		imgPopup.attr('onmouseover'," imgPopup.attr('src', 'http://www.deviantpics.com/images/MgL8e.png');imgPopup.css('left', '290px');imgPopup.css('top', '29px'); ");
    		imgPopup.attr('onmouseout',"imgPopup.attr('src', 'http://www.deviantpics.com/images/8Iy0o.png'); imgPopup.css('left', '420px'); imgPopup.css('top', '132px');");
    		
    		/****DUPINI****\
    		\***************/
    		imgPopup2=$(document.createElement('img'));
    		imgPopup2.attr('src', 'http://www.deviantpics.com/images/bgf4i.png');
    		imgPopup2.css('position', 'absolute');
    		imgPopup2.css('right', '237px');
    		imgPopup2.css('top', '92px');
    		imgPopup2.attr('onmouseover'," imgPopup2.attr('src', 'http://www.deviantpics.com/images/hwy3z.png');imgPopup2.css('right', '108px');imgPopup2.css('top', '29px');");
    		imgPopup2.attr('onmouseout',"imgPopup2.attr('src', 'http://www.deviantpics.com/images/bgf4i.png'); imgPopup2.css('right', '237px'); imgPopup2.css('top', '92px');");
    		
    		/*****BROD *****\
    		\***************/
    		imgPopup3=$(document.createElement('img'));
    		imgPopup3.attr('src', 'http://www.deviantpics.com/images/viAku.png');
    		imgPopup3.css('position', 'absolute');
    		imgPopup3.css('left', '357px');
    		imgPopup3.css('top', '54px');
    		imgPopup3.attr('onmouseover'," imgPopup3.attr('src', 'http://www.deviantpics.com/images/veCR.png');imgPopup3.css('left', '250px');imgPopup3.css('top', '3px');");
    		imgPopup3.attr('onmouseout',"imgPopup3.attr('src', 'http://www.deviantpics.com/images/viAku.png'); imgPopup3.css('left', '357px'); imgPopup3.css('top', '54px');");
    		
    		/*****OTOK *****\
    		\***************/
    		imgPopup4=$(document.createElement('img'));
    		imgPopup4.attr('src', 'http://www.deviantpics.com/images/7AzB9.png');
    		imgPopup4.css('position', 'absolute');
    		imgPopup4.css('left', '58%');
    		imgPopup4.css('top', '85px');
    		imgPopup4.attr('onmouseover'," imgPopup4.attr('src', 'http://www.deviantpics.com/images/RoCzL.png');imgPopup4.css('left', '48%');imgPopup4.css('top', '29px');");
    		imgPopup4.attr('onmouseout',"imgPopup4.attr('src', 'http://www.deviantpics.com/images/7AzB9.png'); imgPopup4.css('left', '58%'); imgPopup4.css('top', '85px');");
    		
    		/****ADRIANA****\
    		\***************/
    		imgPopup5=$(document.createElement('img'));
    		imgPopup5.attr('src', 'http://www.deviantpics.com/images/5GxY7.png');
    		imgPopup5.css('position', 'absolute');
    		imgPopup5.css('float', 'right');
    		imgPopup5.css('right', '140px');
    		imgPopup5.css('top', '93px');
    		imgPopup5.attr('onmouseover'," imgPopup5.attr('src', 'http://www.deviantpics.com/images/tmVA.png');imgPopup5.css('right', '50px');imgPopup5.css('top', '16px');");
    		imgPopup5.attr('onmouseout',"imgPopup5.attr('src', 'http://www.deviantpics.com/images/5GxY7.png'); imgPopup5.css('right', '140px'); imgPopup5.css('top', '93px');");
    		
    		popupDiv.append(imgPopup3)
    		popupDiv.append(imgPopup)
    		popupDiv.append(imgPopup4)
    		popupDiv.append(imgPopup5)
            popupDiv.append(imgPopup2)
            
            
            logo_wrapper.append(popupDiv);
    
    		$('body > table').prepend(logo_wrapper);
    	
        }
        


		removeElements();

        postaviManjiLogo();	

}
addJQuery(main);