// JavaScript Document

// ==UserScript==
// @name        skripta za promjenu bannera i cijele teme foruma - LJETNA
// @version 	0.214
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


        
function dodajStilove() { 
            
if (document.styleSheets[0].cssRules) {  
                
var oLength = document.styleSheets[0].cssRules.length; 
document.styleSheets[0].insertRule('.page {background:#d9f1f4}', oLength); //e2eaeb
document.styleSheets[0].insertRule('.tfoot {background:#d9f1f4}', oLength);
document.styleSheets[0].insertRule('body {margin-top: 0px}', oLength);
document.styleSheets[0].insertRule('body {background-image: url(http://www.deviantpics.com/images/EDqvC.png)}', oLength);
document.styleSheets[0].insertRule('#brd_outer {border-left: 2px dotted #F1C026}', oLength);
document.styleSheets[0].insertRule('#brd_outer {border-right: 2px dotted #F1C026}', oLength);
//document.styleSheets[0].insertRule('.vbmenu_control {background: cyan}', oLength);
document.styleSheets[0].insertRule('.tcat a:visited, .tcat_avisited {color: #ffffff}', oLength);
document.styleSheets[0].insertRule('.tcat a:link, .tcat_alink {color: #ffffff}', oLength);
//document.styleSheets[0].insertRule('a:visited, body_avisited {color: #ffffff}', oLength);
//document.styleSheets[0].insertRule('a:link, body_alink {color: #ffffff}', oLength)
document.styleSheets[0].insertRule('.thead a:visited, .thead_avisited {color: #ffffff}', oLength); 
document.styleSheets[0].insertRule('.thead a:link, .thead_alink  {color: #ffffff}', oLength); 
document.styleSheets[0].insertRule('.alt2 {background : #eef5f6; border-left: none; border-bottom: 1px solid #4FDCFF; border-top:none; border-right: none}', oLength);
document.styleSheets[0].insertRule('.stuck {background : #D7F4FF; border-left: none; border-bottom: 1px solid #4FDCFF; border-top:none }', oLength);

document.styleSheets[0].insertRule('.vbmenu_popup {color : #0689c0; background : #E3F9FF}', oLength);

document.styleSheets[0].insertRule('.vbmenu_option a:link, .vbmenu_option_alink {color : #0689c0}', oLength);
document.styleSheets[0].insertRule('.vbmenu_option a:visited, .vbmenu_option_avisited {color : #0689c0}', oLength);
document.styleSheets[0].insertRule('.vbmenu_hilite {color : #0689c0}', oLength);
document.styleSheets[0].insertRule('.vbmenu_hilite a:link, .vbmenu_hilite_alink {color : #0689c0}', oLength);
document.styleSheets[0].insertRule('.vbmenu_hilite a:visited, .vbmenu_hilite_avisited {color : #0689c0}', oLength);
document.styleSheets[0].insertRule('.vbmenu_hilite a:hover, .vbmenu_hilite a:active, .vbmenu_hilite_ahover {color : #0689c0}', oLength);


document.styleSheets[0].insertRule('.alt1 {background : #f5fdff; border-bottom: 1px solid #4FDCFF; border-top:none; border-right: none}', oLength);
document.styleSheets[0].insertRule('.tcat {background : #2c5687 url(http://www.deviantpics.com/images/5pfKn.png) repeat-x left bottom; text-shadow : #774e06 -0.1em 0.1em 0.6em ; font-size:13px; padding-left:5px; color:white; font-family:cursive}', oLength);
document.styleSheets[0].insertRule('.tborder.tcat { font-size: 12px; font-weight:bold; text-transform: uppercase; padding : 4px 10px 4px 10px; margin: 1px 4px 0px 3px, text-shadow: #03ABC4 0.05em 0.05em 0.3em; color:#0689c0}', oLength);//background : green url(http://www.deviantpics.com/images/13iLV.png) repeat-x left bottom;

document.styleSheets[0].insertRule('ul.tab_list li.tcat {height: 2.0em; color:white}', oLength);

document.styleSheets[0].insertRule('.thead {background-image: url(http://www.deviantpics.com/images/46eij.png)}', oLength);        
document.styleSheets[0].insertRule('.tborder.thead {background : green url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom; font-size: 13px; font-weight:bold; text-transform: uppercase; margin: 0px 2px 0px 1px, text-shadow: #03ABC4 0.05em 0.05em 0.3em; color:white}', oLength);  

document.styleSheets[0].insertRule('.tborder, .thead {padding : 0 0 0 0 }', oLength);



document.styleSheets[0].insertRule('select {background : #c8edf7 url(http://www.deviantpics.com/images/13iLV.png) repeat-x left bottom; color:#0689c0; border-radius: 3px; border-top: #7fc2de solid 1px; border-left: #7fc2de solid 1px; border-bottom: #7fc2de solid 1px; border-right:#7fc2de solid 1px }', oLength);


document.styleSheets[0].insertRule('.tborder.outer_padding {padding : 0px 0px 0px 0px }', oLength);

/*document.styleSheets[0].insertRule('textarea, .bginput {background : #e3f9ff url(http://www.deviantpics.com/images/rxyNA.png) repeat-x left bottom; color:#0689c0; border-radius: 6px; border-top: #7fc2de solid 1px; border-left: #7fc2de solid 1px; border-bottom: #7fc2de solid 1px; border-right:#7fc2de solid 1px}', oLength);*/
document.styleSheets[0].insertRule('.info {padding : 4px 3px 4px 5px; background : #06d4f3 url(http://www.deviantpics.com/images/8glQB.png) repeat-y right top; color : #0689c0; text-weight : bold; border : 0; margin-bottom : 0; font-size : 11px }', oLength);
infoStil = $('.info');
            


} 
else if (document.styleSheets[0].rules) { 

var newStyle = document.createStyleSheet(); 
newStyle.addRule('.tcat a:visited, .tcat_avisited', 'color: cyan'); 
alert('izgleda da ti je browser specificniji od onih za koje skripta sljaka...')
} 

}; 
        dodajStilove()
        
		function removeElements() {
			// Remove header with logo banner
			
			$('#hdr').remove();
			$('#nav_btm').remove();
			$('#spacerline').remove();
			

            
            //dugacki sa gradijentom:
            //          http://www.deviantpics.com/images/a1g8.png
            // 3 x 3 px jednobojni
            //          http://www.deviantpics.com/images/QRYyL.png
            // 3 x 3 px jednobojni 2
            //          http://www.deviantpics.com/images/EDqvC.png
            


			post_table = $('div[id*="edit"] > table.tcat');
			post_table.each(function() {
				$(this).find('td').eq(0).empty();
				$(this).find('td').eq(2).empty();
			});

            $('.page > div').eq(0).css('padding', '0px 8px 5px 5px');
            
		}

		vbmenu_control = $('.vbmenu_control');
		vbmenu_control.css('background', '#2c5687 url(http://www.deviantpics.com/images/5pfKn.png) repeat-x 0% 100%') 
        
        
		vbmenu_control.find('a').css('color', 'white');
		vbmenu_control.find('a').css('text-shadow', '#774e06 -0.1em -0.1em 0.6em');
		vbmenu_control.find('a').css('font-family', 'cursive');
		vbmenu_control.find('a').css('font-weight', 'bold');
		vbmenu_control.find('a').css('font-size', '13px');
		vbmenu_control.find('a').css('letter-spacing', '0.1ex');
		vbmenu_control.find('a').hover(
            function(){
                $(this).css('text-shadow', '#FAFF7C -0.2em -0.2em 0.8em');
            },
            function(){
                $(this).css('text-shadow', '#774e06 -0.1em -0.1em 0.6em');
            }
        );
		
		$('.tcat strong').css('color', 'white');
		

        function moveNavbar() {
            navbar=$('#list_navbar');
            $('#list_navbar').remove();
                    
            wrapper = $(document.createElement('div'));
            wrapper.css('margin', '0');
            wrapper.css('background','#2c5687 url(http://www.deviantpics.com/images/5pfKn.png) repeat-x left top');
            
            wrapper.css('margin', '0 auto');
            wrapper.css('display', 'block');
            wrapper.css('height', '32px');
            wrapper.css('text-align', 'center');
    
            
            navbar.css('padding', '0');
            navbar.css('margin', 'auto');
            navbar.css('float', 'none');     
            navbar.css('display', 'inline-block');
        
            ul = navbar.find('ul');
            ul.css('display', 'inline-block');
            ul.css('margin', 'auto');
            ul.css('padding', '0');
            ul.css('list-style-type', 'none');
            ul.css('text-align', 'center');
            ul.css('background-color','#000');
    		ul.css('bottom', '0');
    
    
    		li = navbar.find('li');
    		li.css('display','inline');
    		li.css('margin','0 1px 0 3px');

   
    
    		a = navbar.find('a');
    		a.css('border','0');
    		a.css('color','#0689c0');
    		a.css('text-decoration','none');
    		a.css('margin','0');
    		//a.css('letter-spacing', '0.1ex');
    		//a.css('margin','0');
    		
  
 
    		a = navbar.find('.link_n a');
    		a.css('font-size', '13px');
    		//boja pozadine neodabranog gumba u izborniku;
            //narancasta:
            //      http://www.deviantpics.com/images/5pfKn.png
            //plavicasta - 2:
            //      http://www.deviantpics.com/images/13iLV.png
            //plavicasta
            //      http://www.deviantpics.com/images/lgPzV.png
    		a.css('background-image', 'url(http://www.deviantpics.com/images/13iLV.png)');
    		a.css('background-repeat', 'repeat-x');
    		a.css('background-position', '0% 100%');
    		a.css('border', '0');
    		a.css('text-transform', 'uppercase');
    		a.css('text-shadow', 'white -0.1em 0.1em 0.4em');
    		//a.css('margin','0');
    		a.css('padding','7px 15px 8px');
 
    		a.hover(
                function(){
                    $(this).css('background','#97dcfb ');
                    $(this).css('color','white');
                }, 
                function(){
                    $(this).css('background-image', 'url(http://www.deviantpics.com/images/13iLV.png)');
                    $(this).css('background-repeat', 'repeat-x');
                    $(this).css('background-position', '0% 100%');
                    $(this).css('color','#0689c0');
                }
            );
            
   


    
    		a = navbar.find('.link_n_a a');
    		//a.css('border','0');
    		a.css('padding','4px 25px 7px');
    		//a.css('top','1px');
    		a.css('background','#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom');
    		a.css('background-position-y', '90%');
    		a.css('color','white');
    		a.css('text-transform', 'none');
    		a.css('font-variant', 'small-caps');
    		a.css('font-weight', 'bold');
    		a.css('font-size', '14px');
    		a.css('text-shadow', '#03abc4 0.1em 0.1em 0.3em');
    		a.hover(function(){
            $(this).css('background','#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom');
            $(this).css('background-position-y', '90%');
            } );
            //, function(){$(this).css('background', '#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left top');} );

    		wrapper.append(navbar);
    		$('body > table').prepend(wrapper);
		}
		
		
	   function urediGornjiDio(){


            $('.navbar').css('color','#5dccfa');
    		//$('.navbar').css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');
    		$('.navbar').css('font-size','12px');
    		
    		$('.navbar ').find('strong').css('font-size','14px');
    		$('.navbar ').find('strong').css('padding-left','6px');
    		
    		$('table.tborder').attr('cellpadding','4px');
    		$('table.tborder').attr('cellspacing','0px');
    		
    		trazenitBorder = $('table.tborder').eq(0);
    		
    		
    		
    		trazenitBorder.css('background', 'none');
    		trazenitBorder.css('border','0px');
   
    		prviTd = trazenitBorder.find('tr').eq(0).find('td.alt1');
    		//prviTd.css('width' , '500px');
    		
    		
            prviTd.css('border-left','none');
            prviTd.css('border-top','none');
            prviTd.css('border-bottom','none');
    		prviTd.css('background', '#e3f9ff');
    		
    		$(prviTd.find('table').find('tr').eq(0)).css('padding-top','2px');
    		
    		
    		//$(prviTd.find('table').find('tr').eq(0)).find('td').eq(1).remove();
    		$(prviTd.find('table').find('tr').eq(0)).find('td').css('vertical-align','middle');
   
  
            // stilovi navigacije 
    		$(prviTd.find('table').find('tr').eq(0)).find('span').css('color','#5bc6ee');
    		$(prviTd.find('table').find('tr').eq(0)).find('span').find('a').css('color','#5bc6ee');
    		$(prviTd.find('table').find('tr').eq(0)).find('a').css('color','#5bc6ee');
    		
    		$(prviTd.find('table').find('tr').eq(0)).find('span').css('font-weight', 'bold');
    		$(prviTd.find('table').find('tr').eq(0)).find('span').find('a').css('font-weight', 'bold');
    		$(prviTd.find('table').find('tr').eq(0)).find('a').css('font-weight', 'bold');
    		
    		$(prviTd.find('table').find('tr').eq(0)).find('span').css('text-decoration', 'none');
    		$(prviTd.find('table').find('tr').eq(0)).find('span').find('a').css('text-decoration', 'none');
    		$(prviTd.find('table').find('tr').eq(0)).find('a').css('text-decoration', 'none');
    		
    		
    		$(prviTd.find('table').find('tr').eq(1)).css('text-align','center');
    		$(prviTd.find('table').find('tr').eq(1)).css('font-size','13px');
    		
    		//zrcaljena riba
    		//            http://www.deviantpics.com/images/6VmE4.png
    		//riba
    		//            http://www.deviantpics.com/images/qWZDf.png
    		//ruba - manja
    		//            http://www.deviantpics.com/images/JjKY.png
    		//            http://www.deviantpics.com/images/ehMO.png
    		//            http://www.deviantpics.com/images/CBRsl.png
    		//koralj
    		//            http://www.deviantpics.com/images/ThAfP.png
    		slikaDoc = $(prviTd.find('table').find('tr').eq(1).find('td').find('img')); //find('a')
    		slikaDoc.attr('src', 'http://www.deviantpics.com/images/ThAfP.png');
    		
    		slikaDocForumSolo = $(prviTd.find('div').find('a').find('img'));
    		slikaDocForumSolo.attr('src', 'http://www.deviantpics.com/images/ThAfP.png');
    		
            //zvijezdaca
    		//            http://www.deviantpics.com/images/2510.png
    		//natikace - velike
    		//            http://www.deviantpics.com/images/XakTL.png 
    		slikaFold = $(prviTd.find('table').find('tr').eq(0).find('td').find('a').find('img'));
    		slikaFold.attr('src', 'http://www.deviantpics.com/images/2510.png');
    		

    		drugiTd = trazenitBorder.find('tr').eq(0).find('td.alt2');
    		drugiTd.css('border-left','none');
    		drugiTd.css('border-bottom','none');
            drugiTd.css('border-top','none');
            //http://www.deviantpics.com/images/13iLV.png
            //http://www.deviantpics.com/images/lgPzV.png
    		drugiTd.css('background-image','url(http://www.deviantpics.com/images/13iLV.png)');
            drugiTd.css('background-repeat','repeat-x');
            drugiTd.css('background-position', '0% 100%');
            
    		drugiTd.css('vertical-align', 'bottom');
            //drugiTd.css('width','380px');
  

    		drugiTd.find('.smallfont').eq(0).css('font-size','11px');
    		drugiTd.find('.smallfont').eq(0).css('color','#0689c0');
    		drugiTd.find('.smallfont').eq(0).css('padding-bottom','2px');
    		drugiTd.find('.smallfont').eq(0).css('padding-right','10px');
    		//alert('trazim vrijeme');
    		drugiTd.find('.smallfont').eq(0).find('.time').css('color','#0689c0');
    		
    		drugiTd.find('.smallfont').eq(0).find('strong > a').css('color', '#006d9b');
    		drugiTd.find('.smallfont').eq(0).find('strong > a').css('font-size', '12px');
    		drugiTd.find('.smallfont').eq(0).find('strong > a').css('text-decoration', 'none');
    		
    		img=$(document.createElement('img'));
    		img.attr('src', 'http://www.deviantpics.com/images/p4UQ.gif');
    		//http://www.deviantpics.com/images/p4UQ.gif
    		//http://www.deviantpics.com/images/CBRsl.png
    		//http://www.deviantpics.com/images/14vX.gif
    		img.css('padding-left','3px');
    		img.hover(function(){
    		        $(this).attr('src','http://www.deviantpics.com/images/14vX.gif')
    		    }, function(){
                    //$(this).attr('src','http://www.deviantpics.com/images/CBRsl.png')
                });
    		
    		drugiTd.find('.smallfont').eq(0).find('strong > a').append(img);
    		
    		drugiTd.find('.smallfont').eq(0).find('strong > a').attr('title', 'Otvori profil');
    		
    		//var makac = $('[id^="vmoods_menu_classic_72x15"]');
    		var makac2 = document.getElementById("vmoods_menu_classic_72x15");
    		
            if (makac2 !== null){
                     
                smallfont1 = makac2.parentElement;
                
                makac2.parentElement.removeChild(makac2);   
 

                smallfont1.firstElementChild.childNodes[0].data = 'Bok '; 
                smallfont1.firstElementChild.childNodes[2].data = '';
  
                var string1 = smallfont1.childNodes[3];
                var string2 = smallfont1.childNodes[5];
                var string3 = smallfont1.childNodes[6];
                var satnica = smallfont1.childNodes[7];
                var string4 = smallfont1.childNodes[8];
                
                string1.parentNode.removeChild(string1);
                string2.parentNode.removeChild(string2);
                string3.parentNode.removeChild(string3);
                satnica.parentNode.removeChild(satnica);
                string4.parentNode.removeChild(string4);
                //alert('maknut small');
            }

            
    		//document.getElementsByClassName('alt2')[0].getElementsByClassName('smallfont')[0].childNodes[8].data='';
    		
    		drugiTd.find('.smallfont').eq(0).find('div > a').css('font-weight','bold');
    		drugiTd.find('.smallfont').eq(0).find('div > a').css('color','#0689c0');
    		
    		var ikonaIzbornika = document.getElementById('navbar_cybppenh');//.firstElementChild;
    		
    		if (ikonaIzbornika !== null){
    		  ikonaIzbornika.innerHTML = ikonaIzbornika.innerHTML.split('<')[0];
    		}
            
    		$(prviTd.find('table').find('tr').eq(1)).find('td').eq(0).attr('colspan','3');
	
        }
        
        
        function promjeniRedakTablice() {

            $('.middlecontainer div.tborder').css('border','0');
    		$('.middlecontainer div.tborder').css('background','none');
    
            $('.middlecontainer table.tborder').css('background','none');
            $('.middlecontainer table.tborder').css('border','0');
    
            $('.middlecontainer .outer_padding').css('padding','0');
    		$('.middlecontainer .tborder').attr('cellspacing','0');
    		
    
    		
    		//novi postovi - danasnji postovi (zadnje u tablici)
            //$('.middlecontainer .tborder tbody tr:last-child').remove();
            zadnjiRedovi = $('.middlecontainer .tborder tbody tr:last-child > td:first-child');
    
            var zadnjiRedBr = 0;
            while (zadnjiRedBr < zadnjiRedovi.length)
            {
                
                zadnjiRed = zadnjiRedovi[zadnjiRedBr];
    
                if (zadnjiRed.colSpan == 4){
                    zadnjiRed.colSpan = 3;
                    divUzadnjemRedu = $('.middlecontainer .tborder tbody tr:last-child > td:first-child > div').eq(zadnjiRedBr);
                    divUzadnjemRedu.css('background','#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom');
                    divUzadnjemRedu.css('height','20px');
                    //zadnjiRed.css('background','#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom');
                    divUzadnjemRedu.css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');
                    divUzadnjemRedu.find('a').css('color','white');
                    divUzadnjemRedu.find('a').css('font-size','12px');
                    divUzadnjemRedu.find('a').css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');

                    //zadnjiRed.css('background','#06d4f3 url(http://www.deviantpics.com/images/46eij.png) repeat-x left bottom');
                    
                    //makni:
                    //prvi stupac uz teme (sa emotikonom teme)
                    var tablica = $('.middlecontainer .tborder tbody').eq(zadnjiRedBr);
                    
                    //alert("Prvih stupaca: " +($('.middlecontainer .tborder tbody').length));
    
                    tablica.find('.alt1 td:first-child').remove();
                    
                    //naslov tema - info - zadnji post
                    //$('.middlecontainer .tborder tbody .thead').remove();,
    		        //alert($('.middlecontainer .tborder tbody').length);
    		        var prviRed_prvaCelija = tablica.find('tr:first-child > td:first-child');
    
    
    		        prviRed_prvaCelija.remove();
    
                }
                
                zadnjiRedBr ++;  
      
            }

    
            style_row = $('.middlecontainer .tborder tbody td');
    		style_row.css('background','none');
    			
    		style_row.css('border-bottom','1px solid #4fdcff');
    
            //BOJE POZADINE U TABLICAMA S TEMAMA
    		style_alt1 = $('.middlecontainer .tborder tbody > .alt1 > .alt1');
    		//*****
    		//style_alt1.css('background', '#f5fdff');
    		//*****
    
            //*****
    		style_alt2 = $('.middlecontainer .tborder tbody > .alt1 > .alt2');
    		style_alt2.css('background', '#eef5f6');
    		//style_alt2.css('border-left', 'none');
    		//*****
    		
    		$('.page .tborder .alt1Active ').css('background', '#f5fdff');
    		$('.page .tborder .alt1Active ').css('border-bottom','1px solid #4FDCFF');
    		
    		//*****
    		$('.alt1').css('background', '#f5fdff');
    		
    		//$('.alt1').css('border-bottom','1px solid #4FDCFF');
    		//*****
    		//*****
    		$('.alt2').css('background', '#eef5f6')
    		$('.alt2').css('border-left', 'none');
    		//$('.alt2').css('border-bottom','1px solid #4FDCFF');
    		//*****
    		
    		
 
    		
    		stil_quote = $('div [id^=post_message_] div > table td');
    		stil_quote.css('background', '#fff6b6');
    		stil_quote.css('background-image','url(http://www.deviantpics.com/images/Ictv4.png)');
    		stil_quote.css('background-repeat','repeat-y');
    		stil_quote.css('background-position','100% 0%');
    		stil_quote.css('border-right', '2px solid #d8e1e3');
    		stil_quote.css('border-bottom', '2px solid #d8e1e3');
    		stil_quote.css('border-radius', '10px');
    		
    		stil_quote2 = $('tr [title^=Post] div > table td');
    		stil_quote2.css('background', '#fff6b6');
    		stil_quote2.css('background-image','url(http://www.deviantpics.com/images/Ictv4.png)');
    		stil_quote2.css('background-repeat','repeat-y');
    		stil_quote2.css('background-position','100% 0%');
    		stil_quote2.css('border-right', '2px solid #d8e1e3');
    		stil_quote2.css('border-bottom', '2px solid #d8e1e3');
    		stil_quote2.css('border-radius', '10px');
    		
    		
    		

		} 
        
               


		function postaviLogo(){
		
            
            /************************\
            |******* POZADINA *******|
    		\************************/ 
    		logo_wrapper=$(document.createElement('div'));
    		logo_wrapper.css('background', '#ffad33 url(http://www.deviantpics.com/images/A912a.png) repeat-x');


            /************************\
            |****** LIJEVII DIO *****|
    		\************************/    		
    		logo=$(document.createElement('div'));
    		logo.css('display','inline');

    		img=$(document.createElement('img'));
    		img.attr('src', 'http://www.deviantpics.com/images/QCbS.png');
    		logo.append(img);
    		
    		logo_wrapper.append(logo);
    		

    		
    		
    		/************************\
            |******* DESNI DIO ******|
    		\************************/
    		logoRs=$(document.createElement('div'));
            logoRs.css('float','right');
    		//logoRs.css('width','530px');
    
    		img=$(document.createElement('img'));
    		img.attr('src', 'http://www.deviantpics.com/images/0iNAW.png');
    		img.attr('alt', 'hdr_rs');

            logoRs.append(img);
    		logo_wrapper.append(logoRs);
            
            

    		
    		/************************\
            |****** POPUP VELIKI ****|
    		\************************/
    		

            popupDiv=$(document.createElement('div'));
            popupDiv.attr('style','style=" position:absolute;"')
            popupDiv.attr('id','popupDivId')
            
            /*****RIBE******\
    		\***************/
            imgPopup=$(document.createElement('img'));
    		imgPopup.attr('src', 'http://www.deviantpics.com/images/97AYd.png');
    		imgPopup.css('position', 'absolute');
    		imgPopup.css('left', '650px');
    		imgPopup.css('top', '208px');
    		imgPopup.attr('onmouseover'," imgPopup.attr('src', 'http://www.deviantpics.com/images/rzIAj.png');imgPopup.css('left', '460px');imgPopup.css('top', '45px'); ");
    		imgPopup.attr('onmouseout',"imgPopup.attr('src', 'http://www.deviantpics.com/images/97AYd.png'); imgPopup.css('left', '650px'); imgPopup.css('top', '208px');");
    		
    		/****DUPINI****\
    		\***************/
    		imgPopup2=$(document.createElement('img'));
    		imgPopup2.attr('src', 'http://www.deviantpics.com/images/HNvFR.png');
    		imgPopup2.css('position', 'absolute');
    		imgPopup2.css('right', '380px');
    		imgPopup2.css('top', '145px');
    		imgPopup2.attr('onmouseover'," imgPopup2.attr('src', 'http://www.deviantpics.com/images/rOm1i.png');imgPopup2.css('right', '180px');imgPopup2.css('top', '35px');");
    		imgPopup2.attr('onmouseout',"imgPopup2.attr('src', 'http://www.deviantpics.com/images/HNvFR.png'); imgPopup2.css('right', '380px'); imgPopup2.css('top', '145px');");
    		
    		/*****BROD *****\
    		\***************/
    		imgPopup3=$(document.createElement('img'));
    		imgPopup3.attr('src', 'http://www.deviantpics.com/images/3OKsg.png');
    		imgPopup3.css('position', 'absolute');
    		imgPopup3.css('left', '570px');
    		imgPopup3.css('top', '85px');
    		imgPopup3.attr('onmouseover'," imgPopup3.attr('src', 'http://www.deviantpics.com/images/cDEoS.png');imgPopup3.css('left', '400px');imgPopup3.css('top', '5px');");
    		imgPopup3.attr('onmouseout',"imgPopup3.attr('src', 'http://www.deviantpics.com/images/3OKsg.png'); imgPopup3.css('left', '570px'); imgPopup3.css('top', '85px');");
    		
    		/*****OTOK *****\
    		\***************/
    		imgPopup4=$(document.createElement('img'));
    		imgPopup4.attr('src', 'http://www.deviantpics.com/images/StZUg.png');
    		imgPopup4.css('position', 'absolute');
    		imgPopup4.css('left', '58%');
    		imgPopup4.css('top', '134px');
    		imgPopup4.attr('onmouseover'," imgPopup4.attr('src', 'http://www.deviantpics.com/images/KS6O.png');imgPopup4.css('left', '48%');imgPopup4.css('top', '45px');");
    		imgPopup4.attr('onmouseout',"imgPopup4.attr('src', 'http://www.deviantpics.com/images/StZUg.png'); imgPopup4.css('left', '58%'); imgPopup4.css('top', '134px');");
    		
    		/****ADRIANA****\
    		\***************/
    		imgPopup5=$(document.createElement('img'));
    		imgPopup5.attr('src', 'http://www.deviantpics.com/images/aKPEU.png');
    		imgPopup5.css('position', 'absolute');
    		imgPopup5.css('left', '1271px');
    		imgPopup5.css('top', '152px');
    		imgPopup5.attr('onmouseover'," imgPopup5.attr('src', 'http://www.deviantpics.com/images/sU1Mb.png');imgPopup5.css('left', '1190px');imgPopup5.css('top', '20px');");
    		imgPopup5.attr('onmouseout',"imgPopup5.attr('src', 'http://www.deviantpics.com/images/aKPEU.png'); imgPopup5.css('left', '1271px'); imgPopup5.css('top', '152px');");
    		
    		popupDiv.append(imgPopup3)
    		popupDiv.append(imgPopup)
    		popupDiv.append(imgPopup4)
    		popupDiv.append(imgPopup5)
            popupDiv.append(imgPopup2)
            
            
            logo_wrapper.append(popupDiv);
    
    		$('body > table').prepend(logo_wrapper);
    	
        }
        
        
        function postaviManjiLogo(){
		
            
            /************************\
            |******* POZADINA *******|
    		\************************/ 
    		logo_wrapper=$(document.createElement('div'));
    		//http://www.deviantpics.com/images/fbjhI.png
    		//http://www.deviantpics.com/images/Sj7BX.png
    		//http://www.deviantpics.com/images/q0uvF.png
    		
    		//http://www.deviantpics.com/images/F78U2.png
    	
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
        
        
        function ukloniNepotrebneGrafike(){
            redak_s_naslovom = $('table.tcat > tbody > tr ');
            //alert('redaka s naslovom: '+redak_s_naslovom.length);
            redak_s_naslovom.find('td:first-child').find('img').attr('src','http://www.deviantpics.com/images/5pfKn.png');
            //alert(redak_s_naslovom)
            //http://www.deviantpics.com/images/46eij.png
            //redak_s_naslovom.find('td:first-child').find('img').attr('src','http://www.deviantpics.com/images/46eij.png');
            redak_s_naslovom.find('td:first-child').find('img').css('width','25px');
            redak_s_naslovom.find('td:first-child').find('img').css('padding-left','0px');
            redak_s_naslovom.find('td:last-child').remove();
                
        }
        
        
        function changeTitleBar() {
        
        
			title_bar = $('.tcat');
			//*****
			//title_bar.css('background', '#2c5687 url(http://www.deviantpics.com/images/5pfKn.png) repeat-x left bottom');
			//title_bar.css('color', 'white');
			
			//title_bar.css('font-size','13px');
			//title_bar.css('text-shadow', '#774e06 -0.1em 0.1em 0.6em');
            //title_bar.css('padding-left', '5px');
            //*****

			title_bar_right = $('.tcat .smallfont');
			title_bar_right.css('color','white');
			title_bar_right.css('font-size','11px');
			title_bar_right.css('margin','-6px 6px -2px 0px');


			title_bar_select = $('.tcat .smallfont select');
			title_bar_select.css('font','normal 11px Tahoma, Calibri, Verdana, Geneva, sans-serif;');
			title_bar_select.css('border','');
			title_bar_select.css('border','1px solid #CCCCCC');
			//boja ponudjenih izbora u padajucem:
			//title_bar_select.css('color','black');
			
			//boja pozadine padajuceg:
			title_bar_select.css('background','#d9f1f4 none');
			title_bar_select.css('padding','1px');
			title_bar_select.css('outline','0');
			title_bar_select.css('-moz-border-radius','3px');
			title_bar_select.css('-webkit-border-radius','3px');
			title_bar_select.css('border-radius','5px');


			//$('.tcat > a > img').attr('src','http://deviantpics.com/images/EGx6P.gif').css('margin-top','-4px');

			btn_ok = $('.tcat .smallfont input.button');
			btn_ok.css('padding','1px 6px 1px 6px');
			btn_ok.css('margin-top','5px');
			
			//*****
			//naslovni_header = $('table.tcat tr strong > a')
			//naslovni_header.css('color', 'white');
			//*****
			
			//alert(naslovni_header.length)
			//*****
			//$('td.thead  a').css('color', 'white')
			//*****
			
			
            
            
            //$('.tab_list').find('li').css('background', 'red');
            //alert($('.tab_list').find('li').length)
		}
		
		

		
		function postaviSliciceZaCollapse(){
    		
            inner_padding=$('.inner_padding');
    		inner_padding.css('padding-top','3px');
    		inner_padding.css('padding-bottom','8px');
    		
    		var adresaSourcea = 'http://www.deviantpics.com/images/YUgWt.png';
    		//'http://www.deviantpics.com/images/uOT0w.png'
    		//http://www.deviantpics.com/images/3mbgP.png
    		//http://www.deviantpics.com/images/F8tyr.png

    		var adresaHoverSourcea = 'http://www.deviantpics.com/images/GEaCs.png';
    		//http://www.deviantpics.com/images/1qSZm.png
    		//http://www.deviantpics.com/images/7PouF.png
    		//http://www.deviantpics.com/images/kPTBO.png
    		
    		sviKojiSadrzeCollapseIMG=$('img[id^=collapseimg_]');
    		//alert('BROJ KOJI SADRZE COLLAPSEIMG :'+sviKojiSadrzeCollapseIMG.length.toString());
            
            var brojacCollapsedImg = 0;
            while (brojacCollapsedImg < sviKojiSadrzeCollapseIMG.length){
                var zaCollapse = sviKojiSadrzeCollapseIMG[brojacCollapsedImg];
                
                if (zaCollapse !== null){
                  if(zaCollapse.id !='collapseimg_vbcms_table_left')
                  {
    		      zaCollapse.src = adresaSourcea;
                  zaCollapse.title = 'Sakrij/Pokazi'; 
                  zaCollapse.onmouseover = function(){this.src=adresaHoverSourcea;};
                  zaCollapse.onmouseout = function(){this.src=adresaSourcea;};
                  }
                  else
                  //ovo je ikona za skrivanje izbornika, postavi sliku natikace
                  {
                  zaCollapse.src = 'http://www.deviantpics.com/images/4elR8.png';
                  zaCollapse.title = 'Sakrij/pokazi izbornik s lijeve strane'; 
                  }
                }
                brojacCollapsedImg++;
            }

 
		}
		
		function promjeniStilove(){
		
            
		
		
		      
            blokNaslovaPlavi = $('.thead');
            //style_thead = $('.middlecontainer .tborder tbody > .thead > .thead');
    
    		blokNaslovaPlavi.css('background-image','url(http://www.deviantpics.com/images/46eij.png)');
            //blokNaslovaPlavi.css('background','orange');
    		blokNaslovaPlavi.css('color','white');
    		blokNaslovaPlavi.css('text-transform', 'uppercase');
    		//$('.tborder').css('font-weight', 'bold');
    		blokNaslovaPlavi.css('font-size', '12px');
    		blokNaslovaPlavi.css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');
    		
    		//tablica na vrhu
            $('.tborder').css('border','0px');
            //$('.tborder').css('background','none');
            
            //rubovi 2 okvira u headeru
            $('.alt2').css('border-left','none');
            $('.alt2').css('border-top','none');
            
            
            $('.alt1').css('border-left','none');
            $('.alt1').css('border-top','none');
            
            /*
            $('.tborder.tcat').css('background-image','url(http://www.deviantpics.com/images/46eij.png)');
            $('.tborder.tcat').css('color','white');
            $('.tborder.tcat').css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');
            
            $('.tborder.thead').css('background','blue url(http://www.deviantpics.com/images/13iLV.png) repeat-x left bottom');
            $('.tborder.thead').css('color','white');
            $('.tborder.thead').css('text-shadow', '#03abc4 0.05em 0.05em 0.3em');
            */
            
            
    		
    		//*****
    		//t1 = $('table td.tcat > a')
    		//t1.css('color', 'white')
    		
    		//t2 = $('div > div.tborder.outer_padding > div.tcat.inner_padding > a')
    		//t2.css('color', 'white')
            //*****
            
            vbMenu = $('.vbmenu_option');
            
            vbMenuVisited = $('.vbmenu_option a');
            
           
            vbMenu.css('background-image', 'url(http://www.deviantpics.com/images/13iLV.png)');
    		vbMenu.css('background-repeat', 'repeat-x');
    		vbMenu.css('background-position', '0% 100%');
    		
    		vbMenu.css('color', '#0689c0');
    		vbMenu.css('border', '0');

    		
    		
    		vbMenuVisited.css('color', '#0689c0');
    		
            $('.vbmenu_popup').css('background', '#0689c0');
            
            $('table form').eq(-1).css('background', '#d9f1f4');
            
            prazniR = $('table div.page > div > br')
            if ($('div [id^=posts]').length !== 0){var d = 0} 
            else {var d = 1}
            for(d; d < prazniR.length; d++){
                    prazniR[d].parentElement.removeChild(prazniR[d])//.remove();        
            }
            
            //sredi boje modova:
            banda = $('td abbr');
            
            for (var g = 0; g < banda.length; g++){
                innerHtmlBandita = banda[g].children[0].innerHTML;
                //plava
                //innerHtmlBandita = innerHtmlBandita.replace('<font color="#0C52CE"', '<font color="#247ada"')
                //narancasta
                //innerHtmlBandita = innerHtmlBandita.replace('<font color="#EF6200"', '<font color="#e57c00"')
                //bordo
                innerHtmlBandita = innerHtmlBandita.replace('<font color="#BE0C78"', '<font color="#0faddb"')
                //zelena
                innerHtmlBandita = innerHtmlBandita.replace('<font color="#21A026"', '<font color="#00d1ac"')
 
                banda[g].children[0].innerHTML = innerHtmlBandita
            }
            
            //sredi zadnji redak
            //FOOTER
            adresaFootera = 'http://www.deviantpics.com/images/eRwEC.png';
            
            adresaNaVrhIkone ='http://www.deviantpics.com/images/qfDF.png';
            adresaNaVrhHoverIkone = 'http://www.deviantpics.com/images/Csg8n.png';
            
            
            borderVanjski = document.getElementById('brd_outer')
            redakFooter = borderVanjski.children[borderVanjski.children.length-1].firstElementChild.firstElementChild;
 
            
            if (redakFooter.cells.length === 3){

 
 
    		    redakFooter.cells[1].height = '55px';
                //redakFooter.cells[1].style.background = 'url('+adresaFootera+')';
                redakFooter.cells[1].style.background = 'url(http://www.deviantpics.com/images/WAXxt.png)'
                
                //redakFooter.cells[1].appendChild(lijeviDioFooter)
                //alert('aa')
                lijeviTd = redakFooter.cells[0]
                var lijeviGumb = lijeviTd.firstElementChild;
                

                
                lijeviGumb.firstElementChild.width = '250';
                lijeviGumb.firstElementChild.height = '55';
                lijeviGumb.firstElementChild.src = adresaNaVrhIkone;
                
                lijeviGumb.onmouseover = function(){lijeviGumb.firstElementChild.src = adresaNaVrhHoverIkone;};
                lijeviGumb.onmouseout = function(){lijeviGumb.firstElementChild.src = adresaNaVrhIkone;};
                
                
                
                stariImg = redakFooter.cells[1].firstElementChild;
                stariImg.parentElement.removeChild(stariImg);
                
                redakFooter.cells[1].appendChild(lijeviGumb)

                
                lijeviTd.parentElement.removeChild(lijeviTd)

                redakFooter.cells[1].parentElement.removeChild(redakFooter.cells[1])
               
                redakFooter.cells[0].children[0].style.display = 'block';
                redakFooter.cells[0].children[0].style.textAlign = 'center'
                
            }
            
            //Izbornici u profilnoj::

            
            $('#stats_mini').css('padding', '0 0 0 0');
            $('#friends_mini').css('padding', '0 0 0 0');
            $('#albums').css('padding', '0 0 0 0');
            $('#groups').css('padding', '0 0 0 0');
            $('#visitors').css('padding', '0 0 0 0');
            $('#aboutme').css('padding', '0 0 0 0');
            $('.content_block').css('padding','0px 0px 0px 0px');
            $('.content_block .block_row').css('margin','0px 0px 0px 0px');
            $('.content_block .block_footer').css('margin','0px 0px 0px 0px');

        }
        
        
        
        
        
        function srediPostove(){
        
            
            //navigacija:
            var navTraka = $('div.pagenav');
            for (var f = 0; f < navTraka.length; f++) {
                indeksi = navTraka[f].firstElementChild.firstElementChild.firstElementChild;
                if (indeksi.cells[indeksi.cells.length-1].className == 'vbmenu_control'){
                    for (var b = 1; b < indeksi.cells.length-1; b++){
                                
                        var A1 = indeksi.cells[b]
                                

                        A1.style.backgroundImage = 'url(http://www.deviantpics.com/images/13iLV.png)';
                        A1.style.backgroundRepeat = 'repeat-x';
                        A1.style.backgroundPosition = '0% 100%';
                        
                        A1.firstElementChild.style.textShadow = 'white -0.1em 0.1em 0.4em'
                        A1.firstElementChild.style.color = '#0689c0';

                        
                        if (A1.className == 'alt2'){
                           
                           A1.style.borderTop = 'none';
                           A1.style.borderLeft = 'none';
                           A1.style.background = '#5fccfa';
                           A1.firstElementChild.style.color = 'white';
                        }
                    }

                }
                            
            }
            
            
            var gornji_header=$('div.page > div > table > tbody > tr > td.smallfont');

            if (gornji_header.length>1){
                for (var i = 0; i < gornji_header.length; i++){
                    if ((gornji_header[i].nextElementSibling !== null)){
                        gornji_header[i].nextElementSibling.style.backgroundImage = 'url(http://www.deviantpics.com/images/13iLV.png)';
                        gornji_header[i].nextElementSibling.style.backgroundRepeat = 'repeat-x';
                        gornji_header[i].nextElementSibling.style.backgroundPosition = '0% 100%';
                        
                        gornji_header[i].parentElement.parentElement.parentElement.style.marginBottom = '0px';

                        
                    }
                    ///alert(gornji_header[i].nextElementSibling
                }
                gornji_header.css('background-image','url(http://www.deviantpics.com/images/13iLV.png)');
                gornji_header.css('background-repeat','repeat-x');
                gornji_header.css('background-position', '0% 100%');
                
 
                donji_footer = $('tbody > tr > td > div > div.page > div');
                donji_footer.css('padding', '0 10px 0 25px');
            }
            
            
            postoviElem = $('[id$="posts"]');
            
            for (var b = 0; b < postoviElem.length; b++){
                
                postInnHtml = postoviElem[b].innerHTML;
                postInnHtml = postInnHtml.replace(/class="alt2" width="175"/g, 'class="alt2" width="220"' )       
                postoviElem[b].innerHTML =  postInnHtml;
                
            }
            
            
            var postovi = $( '[id^="post"]' );
            
            for (var a = 0; a < postovi.length; a++){
                
                if(postovi[a].id.toString().match('^(post)([0-9])')){
                    edit = postovi[a].parentElement  
                                                                   
                    divZaSreditPad = edit.parentElement;
                    divZaSreditPad.style.padding = '0 10px 0 25px';
                    
                    edit.style.padding = '0';
                    
                    tablicaPrivremena1 = edit.childNodes[edit.childNodes.length - 24];
                    redak = tablicaPrivremena1.firstElementChild.firstElementChild;
                    celija = redak.firstElementChild;   
                    
                    if (!redak.cells[1].firstElementChild.firstElementChild.textContent){
                        celija.height = '10px';
                    }
                    
                    
                    tablicaPrivremena2 = postovi[a];
                    redak2 = tablicaPrivremena2.firstElementChild.firstElementChild;
                    
                    
                    celijaVrijemePostanja = redak2.cells[0];
                    
                    celijaBrPosta = redak2.cells[1];
                    //alert(celijaBrPosta.style.color.toString())
                    //celijaBrPosta.firstElementChild.css('color', 'white');
                    if ((celijaBrPosta.firstElementChild.id).match('^(postcount)([0-9])')) {
                        celijaBrPosta.firstElementChild.style.textDecoration = 'none';
                        
                        tekst = (celijaBrPosta.firstElementChild.firstElementChild);
                        //alert('tekst jebiga');
                        tekst.style.color = 'white';
                        tekst.style.textDecoration = 'none';
                        tekst.style.textShadow = '#03abc4 0.05em 0.05em 0.3em';

                    }
                    
                    
                    redak_glavni = tablicaPrivremena2.firstElementChild.childNodes[2];

                    /* ----
                    var outHtml0= redak_glavni.childNodes[1].outerHTML
                    outHtml0 = outHtml0.replace('width="175"', 'width="220"')
                    redak_glavni.childNodes[1].outerHTML = outHtml0;*/
                    
                    
                    
                    //redak_glavni.childNodes[1].style.width = '220px';
                    redak_glavni.childNodes[1].style.padding = '0 0 0 0';
                    redak_glavni.childNodes[1].style.backgroundImage = 'url(http://www.deviantpics.com/images/8glQB.png)';
                    redak_glavni.childNodes[1].style.backgroundRepeat = 'repeat-y'
                    redak_glavni.childNodes[1].style.backgroundPosition = '100% 0%';
                    redak_glavni.childNodes[1].style.borderBottom = '0';
                    
                    redak_glavni.childNodes[1].childNodes[1].style.textAlign = 'center';
                    redak_glavni.childNodes[1].childNodes[1].style.backgroundImage = 'url(http://www.deviantpics.com/images/5pfKn.png)';
                    redak_glavni.childNodes[1].childNodes[1].style.backgroundRepeat = 'repeat-x';
                    redak_glavni.childNodes[1].childNodes[1].style.backgroundPosition = '0% 100%';
                    redak_glavni.childNodes[1].childNodes[1].style.display = 'table-cell';
                    
                    
                    redak_glavni.childNodes[1].childNodes[1].style.width = '220px';
                    redak_glavni.childNodes[1].childNodes[1].style.height = '35px';
                    redak_glavni.childNodes[1].childNodes[1].style.verticalAlign = 'middle';
                    redak_glavni.childNodes[1].childNodes[1].style.letterSpacing = '0.05ex'
                    
                    
                    //redak_glavni.childNodes[1].style.backgroundColor = '#f5fdff'; //#eef5f6
                    var brElemLijevo = redak_glavni.childNodes[1].childNodes.length;
                    for (var idx = 3; idx < (brElemLijevo - 2); idx = idx+2){

                        var redak = redak_glavni.childNodes[1].childNodes[idx];
                        redak.style.textAlign = 'center';


                        
                    }
                    for (var idx2= 3; idx2 < (brElemLijevo-2); idx2 = idx2 +2){

                        var redak = redak_glavni.childNodes[1].childNodes[idx2];

                        redak.style.color = '#0689c0';
                        redak.style.fontWeight = 'bold';
  
                    }
                    
                    off_on_redak = redak_glavni.childNodes[1].childNodes[brElemLijevo - 2].childNodes[3].firstElementChild;
                    
                    off_on_redak.style.color = '#006d9b';
                    off_on_redak.style.fontSize = '12px';
                    off_on_redak.style.fontWeight = 'bold';
                    
                    nickname = redak_glavni.childNodes[1].childNodes[1].firstElementChild;
                    nickname.style.color = 'white';
                    nickname.style.textShadow = '#fff7cb -0.1em -0.1em 0.7em';
                    nickname.style.fontFamily = 'cursive';
                    nickname.style.textDecoration = 'none';
                    nickname.style.fontSize = '16px';
                    


                    redak_glavni.childNodes[3].style.background = '#f5fdff';
                    redak_glavni.childNodes[3].style.borderBottom = '0';
                    
                    //alert(celijaBrPosta.firstElementChild.id)
                    
                    //alert(celijaVrijemePostanja.innerText);
                    redak_footer = tablicaPrivremena2.firstElementChild.childNodes[4];
                    redak_foot_desno = redak_footer.childNodes[3];
                    redak_foot_desno.style.backgroundImage = 'url(http://www.deviantpics.com/images/13iLV.png)';
                    redak_foot_desno.style.backgroundPosition = '0% 100%';
                    redak_foot_desno.style.backgroundRepeat = 'repeat-x';
                    redak_foot_desno.style.borderBottom = '0';
                    
                    redak_foot_lijevo = redak_footer.childNodes[1];
                    redak_foot_lijevo.style.backgroundImage = 'url(http://www.deviantpics.com/images/13iLV.png)';
                    redak_foot_lijevo.style.backgroundPosition = '0% 100%';
                    redak_foot_lijevo.style.backgroundRepeat = 'repeat-x';
                    redak_foot_lijevo.style.borderBottom = '0';
                    
                    
                    divElemHv = postovi[a].nextElementSibling;
                    divElemGrr = postovi[a].nextElementSibling.nextElementSibling;
                    divElemLol = postovi[a].nextElementSibling.nextElementSibling.nextElementSibling;
                    
                    if (divElemHv.id.match('^post_thanks_box') && (divElemHv.firstElementChild!==null)){
                        divElemHv.firstElementChild.style.padding = '0px 0px 0px 0px';
                        divElemHv.firstElementChild.firstElementChild.setAttribute('cellspacing', '0');
                        divElemHv.firstElementChild.firstElementChild.setAttribute('cellpadding', '4');
                        
                        redHvala = divElemHv.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
                        celijaLijevaHvala = redHvala.cells[0];    
                        celijaLijevaHvala.style.background = '#eef5f6'; 
                        /* ----
                        celijaLijevaHvala.width="220";
                        //celijaLijevaHvala.style.width = '220px';*/
                        
                        redHvala.cells[1].style.background = '#eef5f6';
                        
                    }
                    if ((divElemGrr.id.match('^post_groan_box')) && (divElemGrr.firstElementChild!==null)){
                        divElemGrr.firstElementChild.style.padding = '0';
                        divElemGrr.firstElementChild.firstElementChild.setAttribute('cellspacing', '0');
                        divElemGrr.firstElementChild.firstElementChild.setAttribute('cellpadding', '4');
                        
                        redGrr = divElemGrr.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
                        celijaLijevaGrr = redGrr.cells[0];
                        celijaLijevaGrr.style.background = '#eef5f6';
                        /* ----
                        celijaLijevaGrr.width="220"*/
                        
                        
                        
                        redGrr.cells[1].style.background = '#eef5f6';
                    }
                    if (divElemLol.id.match('^post_lol_box') && (divElemLol.firstElementChild!==null)){
                        divElemLol.firstElementChild.style.padding = '0';
                        divElemLol.firstElementChild.firstElementChild.setAttribute('cellspacing', '0');
                        divElemLol.firstElementChild.firstElementChild.setAttribute('cellpadding', '4');
                        
                        redLol = divElemLol.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
                        celijaLijevaLol = redLol.cells[0];
                        celijaLijevaLol.style.background = '#eef5f6';
                        /* ----
                        celijaLijevaLol.width="220"*/
                        
                        redLol.cells[1].style.background = '#eef5f6';
                    }
                } 
            }
            //alert('Editova'+brojaceditova)
            
            
            //alert(postovi.length);
            //alert('A: '+a.toString()+' \nBroj postova_: '+brojacPostova);  
        }
        
        
        function srediZaReply(){
            

            panelSurround = $('.panelsurround')
            
            panelSurround.css('backgroundColor', '#f5fdff');
            panelSurround.css('border-bottom-left-radius', '25px');
            panelSurround.css('border-bottom-right-radius', '25px');
            panelSurround.css('padding', '10px 10px 10px 25px');
            
            for (var b = 0; b < panelSurround.length; b++ ){
                panelSurround[b].parentElement.parentElement.parentElement.style.background = 'none'
            }
            
            panel = $('.panel');
            
            panel.css('background', '#fff6b6');
    		panel.css('background-image', 'url(http://www.deviantpics.com/images/Ictv4.png)');
    		panel.css('background-repeat', 'repeat-y');
    		panel.css('background-position', 'right top');
    		panel.css('border-right', '2px solid #d8e1e3');
    		panel.css('border-bottom', '2px solid #d8e1e3');
    		panel.css('border-top','0');
    		panel.css('border-left', '0');
    		panel.css('border-radius', '20px');
    		
    		
    		
    		$('.vBulletin_editor').css('border-radius', '12px')
    		$('.vBulletin_editor').css('border-top', '0')
    		$('.vBulletin_editor').css('border-left', '0')
    		$('.vBulletin_editor').css('border-right', '2px solid #d8e1e3')
    		$('.vBulletin_editor').css('border-bottom', '2px solid #d8e1e3')
    		$('.vBulletin_editor').css('background-color', '#d9f1f4')
    		$('.vBulletin_editor').css('background-image', 'url(http://www.deviantpics.com/images/zpVJ.png)')
    		$('.vBulletin_editor').css('background-repeat', 'repeat-y')
    		$('.vBulletin_editor').css('background-position', 'left top')
    		$('.vBulletin_editor').css('border-radius', '12px')
    		$('.vBulletin_editor').css('border-radius', '12px')
    		

    		
    		fieldset = $('fieldset');
    		fieldset.css('border', 'none')//1px solid #7fc2de
    		
    		
    		//textbox1 = document.getElementsByTagName('textarea')
    		
    		
    		$('.bginput').css('border-radius', '6px')
    		$('.bginput').css('background-color', '#e3f9ff')
    		$('.bginput').css('background-image', 'url(http://www.deviantpics.com/images/rxyNA.png)')
    		$('.bginput').css('backgrund-repeat', 'repeat-x')
    		$('.bginput').css('background-position', '0% 100%')
    		$('.bginput').css('border-top', '#7fc2de solid 1px')
    		$('.bginput').css('border-right', '#7fc2de solid 1px')
    		$('.bginput').css('border-bottom', '#7fc2de solid 1px')
    		$('.bginput').css('border-left', '#7fc2de solid 1px')
    		$('.bginput').css('color', '#0689c0')
    		

  
    		//alert($('iframe').length);
    		//textic2 = $('[id$=textarea]')

    		$('iframe').css('border-radius', '15px')
    		
    		$('iframe').css('border-top', '#7fc2de solid 1px')
    		$('iframe').css('border-right', '#7fc2de solid 1px')
    		$('iframe').css('border-bottom', '#7fc2de solid 1px')
    		$('iframe').css('border-left', '#7fc2de solid 1px')
    		
    		$('textarea').css('border-radius', '15px')
    		$('textarea').css('border-top', '#7fc2de solid 1px')
    		$('textarea').css('border-right', '#7fc2de solid 1px')
    		$('textarea').css('border-bottom', '#7fc2de solid 1px')
    		$('textarea').css('border-left', '#7fc2de solid 1px')
    		$('textarea').css('padding-left', '7px')
    		$('textarea').css('padding-top', '5px')
    		
    		/*
    		textic2 = $('[id$=textarea]')
    		textic2.css('display', 'inline')
    		textic2.css('background-color', '#e3f9ff')
    		
    		textic2.css('background-image', 'url(http://www.deviantpics.com/images/rxyNA.png)')
    		textic2.css('backgrund-repeat', 'repeat-x')
    		textic2.css('background-position', '0% 100%')
    		
    		textic2.css('color', '#0689c0')
    		
    		for (var h = 0; h < textbox1.length; h++){
    		    //textbox1[h].style.borderRadius = '20px';
    		    textbox1[h].style.backgroundColor = '#e3f9ff';
                textbox1[h].style.backgroundImage = ' url(http://www.deviantpics.com/images/rxyNA.png)'
                textbox1[h].style.backgroundRepeat = 'repeat-x';
                textbox1[h].style.backgroundPosition = '0% 100%'
                textbox1[h].borderTop = '#7fc2de solid 1px';
                textbox1[h].borderRight = '#7fc2de solid 1px';
                textbox1[h].borderBottom = '#7fc2de solid 1px';
                textbox1[h].borderLeft = '#7fc2de solid 1px';
    		}*/
    		

    		
        }
  
  
        
        function promjenaIkoneGumba4(kljucnaRijec, adresaIkone, adresaHoverIkone){
            var gumb = $( '[src$="' + kljucnaRijec + '"]' );
            for (var a = 0; a < gumb.length; a++){
                gumb[a].src = adresaIkone;
                gumb[a].onmouseover = function(){this.src=adresaHoverIkone;};
                gumb[a].onmouseout = function(){this.src=adresaIkone;}; 

                gumb[a].addEventListener ("click", function () { 
                    
                    
                    editTabl = this.parentElement.parentElement.parentElement.parentElement.parentElement;
                    trazeni = kljucnaRijec.split('/')[1].replace('.gif','');
                    
                    trazeniDiv = $("[id ^= '"+ trazeni +"_box']")[0]
                    
                    if (trazeniDiv.firstElementChild!==null){
                        trazeniDiv.firstElementChild.style.padding = '0px 0px 0px 0px';
                        trazeniDiv.firstElementChild.firstElementChild.setAttribute('cellspacing', '0');
                        trazeniDiv.firstElementChild.firstElementChild.setAttribute('cellpadding', '4');
                        
                        red = trazeniDiv.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
                        celijaLijeva = red.cells[0];    
                        celijaLijeva.style.background = '#eef5f6'; 
                        /* ----
                        celijaLijevaHvala.width="220";
                        //celijaLijevaHvala.style.width = '220px';*/
                        
                        red.cells[1].style.background = '#eef5f6';
                        
                        postoviElem = $('[id$="posts"]');
            
                        /*for (var b = 0; b < postoviElem.length; b++){
                
                            InnHtml = postoviElem[b].innerHTML;
                            InnHtml = InnHtml.replace(/class="alt2" width="175"/g, 'class="alt2" width="220"' )       
                            postoviElem[b].innerHTML =  InnHtml;
                
                        }*/
                        celijaLijeva.width="220";
                        
                    }

                }, false);
            }
        }
        
        function promjenaIkoneGumba3(kljucnaRijec, adresaIkone, adresaHoverIkone){
            var gumb = $( '[src$="' + kljucnaRijec + '"]' );
            for (var a = 0; a < gumb.length; a++){
                gumb[a].src = adresaIkone;
                gumb[a].onmouseover = function(){this.src=adresaHoverIkone;};
                gumb[a].onmouseout = function(){this.src=adresaIkone;};    
            }
        }
        
        function promjenaIkoneGumba2(kljucnaRijec, adresaIkone, adresaHoverIkone){
            var gumb = $( '[src$="' + kljucnaRijec + '"]' );
            for (var a = 0; a < gumb.length; a++){
                gumb[a].src = adresaIkone;
                gumb[a].onmouseover = function(){this.src=adresaHoverIkone;};
                gumb[a].onmouseout = function(){this.src=adresaIkone;};    
                
                gumb[a].onclick = function (F){return mq_click1(this.id.substr(3));}
                
            }
        }
        
        function promjenaIkoneGumba(kljucnaRijec, adresaIkone){
            var gumb = $( '[src$="' + kljucnaRijec + '"]' );
            for (var a = 0; a < gumb.length; a++){
                gumb[a].src = adresaIkone; 
            }
        }
        
        
        function promjeniGumbe(){
        
            //QUOTE
            adresaQuoteIkone = 'http://www.deviantpics.com/images/Xdzgm.png';
            adresaQuoteHoverIkone = 'http://www.deviantpics.com/images/CVNq.png';
            promjenaIkoneGumba3('buttons/quote.gif', adresaQuoteIkone, adresaQuoteHoverIkone);

            //HVALA
            adresaHvalaIkone = 'http://www.deviantpics.com/images/3M1rq.png'; 
            adresaHvalaHoverIkone = 'http://www.deviantpics.com/images/ahcwe.png';
            promjenaIkoneGumba3('/post_thanks.gif', adresaHvalaIkone, adresaHvalaHoverIkone);
            
            //GRRR
            adresaGrrIkone = 'http://www.deviantpics.com/images/MzsN.png'; 
            adresaGrrHoverIkone = 'http://www.deviantpics.com/images/FgqtD.png';
            promjenaIkoneGumba3('/post_groan.gif', adresaGrrIkone, adresaGrrHoverIkone);
           
            //LOL
            adresaLolIkone = 'http://www.deviantpics.com/images/zTMJL.png'; 
            adresaLolHoverIkone = 'http://www.deviantpics.com/images/Df9C3.png';
            promjenaIkoneGumba3('/post_lol.gif', adresaLolIkone, adresaLolHoverIkone);
            
            //QUICK REPLY  
            adresaQuickRepIkone = 'http://www.deviantpics.com/images/wQtuG.png';
            adresaQuickRepHoverIkone = 'http://www.deviantpics.com/images/wM1ae.png';
            promjenaIkoneGumba3('/quickreply.gif',adresaQuickRepIkone, adresaQuickRepHoverIkone);
    
            //MULTIPLE QUOTE      
            adresaMultiQuoteIkone = 'http://www.deviantpics.com/images/CbkRu.png';
            adresaMultiQuoteHoverIkone = 'http://www.deviantpics.com/images/fjz8d.png';
            promjenaIkoneGumba2('/multiquote_off.gif',adresaMultiQuoteIkone, adresaMultiQuoteHoverIkone);
            
            
            //MULTIPLE QUOTE ON
            adresaMultiQuoteOnIkone = 'http://www.deviantpics.com/images/c40ni.png';
            adresaMultiQuoteOnHoverIkone = 'http://www.deviantpics.com/images/PdhR.png';
            promjenaIkoneGumba2('/multiquote_on.gif',adresaMultiQuoteOnIkone, adresaMultiQuoteOnHoverIkone);
            
            
            //POST REPLY  
            adresaReplyIkone='http://www.deviantpics.com/images/QHo0.png';
            adresaReplyHoverIkone='http://www.deviantpics.com/images/3BhXs.png';
            promjenaIkoneGumba3('/reply.gif',adresaReplyIkone, adresaReplyHoverIkone);
   
            // CLOSED
            adresaClosedIkone = 'http://www.deviantpics.com/images/gAQYe.png';
            adresaClosedHoverIkone = 'http://www.deviantpics.com/images/fpv8.png';
            promjenaIkoneGumba3('/threadclosed.gif',adresaClosedIkone, adresaClosedHoverIkone);
                  
            // NEW THREAD
            adresaThreadIkone = 'http://www.deviantpics.com/images/SplUq.png';
            adresaThreadHoverIkone = 'http://www.deviantpics.com/images/zuk0.png';
            promjenaIkoneGumba3('/newthread.gif',adresaThreadIkone, adresaThreadHoverIkone);
            
            // EDIT POST
            adresaEditIkone = 'http://www.deviantpics.com/images/n2uOJ.png';
            adresaEditHoverIkone = 'http://www.deviantpics.com/images/eoCLx.png';
            promjenaIkoneGumba3('/edit.gif',adresaEditIkone, adresaEditHoverIkone);
            
            
            //POST OLD IKONA
            adresaPostOldIkone = 'http://www.deviantpics.com/images/YsMcE.png';
            promjenaIkoneGumba('statusicon/post_old.gif', adresaPostOldIkone);
            //http://www.deviantpics.com/images/YsMcE.png
            //http://www.deviantpics.com/images/4f0ZH.png
            //http://www.deviantpics.com/images/jGUk5.png
            
            //POST NEW IKONA
            adresaPostNewIkone = 'http://www.deviantpics.com/images/jGUk5.png';
            promjenaIkoneGumba('statusicon/post_new.gif', adresaPostNewIkone);
            
            //SEND PM IKONA
            adresaSendPmIkone = 'http://www.deviantpics.com/images/JpNIG.png';
            adresaSendPmHoverIkone = 'http://www.deviantpics.com/images/jbd72.png';
            promjenaIkoneGumba3('buttons/sendpm.gif', adresaSendPmIkone, adresaSendPmHoverIkone);
            
            
            
            

        }

        
        
//>>>>>>>>>>>>>>>>  ZA PROMJENU QUOTE IKONE <<<<<<<<<
function mq_init1(D){
    var C = fetch_cookie("vbulletin_multiquote");
    if(C!== null && C !== ""){
        C = C.split(",")
    }
    else{
        C=new Array()
    }
    var E;
    var A = fetch_tags(D,"img");
    for(var B = 0; B < A.length; B++){
        if(A[B].id && A[B].id.substr(0, 3)=="mq_"){
            E = A[B].id.substr(3);
            A[B].onclick=function(F){
                return mq_click(this.id.substr(3))
            };
            change_mq_image(E,(PHP.in_array(E,C)>-1?true:false))
        }
    }
}
function mq_click1(F){

    var D = fetch_cookie("vbulletin_multiquote");
    var B = new Array();
    var E = false;
    if(D !== null && D !== ""){
        D = D.split(",");
        for(C in D){
            if(!YAHOO.lang.hasOwnProperty(D,C)){
                continue
            }
            if(D[C]==F){
                E=true
            }
            else{
                if(D[C]){
                    B.push(D[C])
                }
            }
        }
    }
    change_mq_image1(F,(E?false:true));
    if(!E){
        B.push(F);
        if(typeof mqlimit !== "undefined" && mqlimit > 0){
            for(var C = 0; C < (B.length - mqlimit); C++){
                var A = B.shift();
                change_mq_image(A, false)
            }
        }
    }
    set_cookie("vbulletin_multiquote", B.join(","));
    return false
}
function change_mq_image1(C,B){
    var A=fetch_object("mq_"+C);
    if(A){
        if(B==true){
            //alert('mijenjam off u on');
            A.src='http://www.deviantpics.com/images/c40ni.png';
            A.onmouseover = function(){this.src= 'http://www.deviantpics.com/images/PdhR.png';};
            A.onmouseout = function(){this.src= 'http://www.deviantpics.com/images/c40ni.png';};
        }
        // off_         http://www.deviantpics.com/images/CbkRu.png
        // off_hover    http://www.deviantpics.com/images/fjz8d.png
        // on_          http://www.deviantpics.com/images/c40ni.png
        // on_hover     http://www.deviantpics.com/images/PdhR.png

        else{
            //alert('mijenjam on u off');
            A.src='http://www.deviantpics.com/images/CbkRu.png';
            A.onmouseover = function(){this.src= 'http://www.deviantpics.com/images/fjz8d.png';};
            A.onmouseout = function(){this.src= 'http://www.deviantpics.com/images/CbkRu.png';};
            
        }
    }
}

mq_init1(fetch_object("posts"));   
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   
        

		removeElements();
        
        moveNavbar();
        
        //postaviLogo();
        postaviManjiLogo();	
        
        changeTitleBar();
        
        promjeniRedakTablice(); 
        urediGornjiDio(); 
 
        ukloniNepotrebneGrafike();
        promjeniStilove();
        
     
		postaviSliciceZaCollapse();
		
		srediPostove();
		
		promjeniGumbe();
		
		srediZaReply();
}
addJQuery(main);