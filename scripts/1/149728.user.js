// ==UserScript==
// @name Mafia Wars | Blacked
// @namespace http://screepts.com
// @version 0.6.6.8
// @description Cleans up around the mafia wars iframe for enjoyable experiance
// @include 	   http://apps.facebook.com/inthemafia/*
// @include 	   https://apps.facebook.com/inthemafia/*
// @match          http://mafiawars.zynga.com/*
// @match          http://www.mafiawars.zynga.com/*
// @match          https://mafiawars.zynga.com/*
// @match          https://www.mafiawars.zynga.com/*
// @include          http://mafiawars.zynga.com/*
// @include          https://www.mafiawars.zynga.com/*
// @match          http://apps.facebook.com/inthemafia/*
// @match          https://apps.facebook.com/inthemafia/*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////////
//          This code was brought to you by todays letters kids 666                         //
//                http://screepts.com     muahahahaha                                       //
//                      if you love it share it!!!                                          //
//          {Don't be evil & remove my header, love it, leave it & share it...}             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
// Copyright(C) 2011 Luke Hardiman, luke@screepts.com    head programmer @ screepts beach   //
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php       //
//////////////////////////////////////////////////////////////////////////////////////////////
//@Description :
javascript: (function () {
console.log("Loaded BlackOut");

var cleanCounter = 0;
var cleanCheck = setInterval(cleanUp,500);
var iframe_check = 0;

function cleanUp(){
console.log("Checking Facebook");
	 if (document.getElementById('mwheader')) {

        console.log("Found MafiaWars");
		clearInterval(cleanCheck);
		mw_cleanup();



	 }else if (document.getElementById('iframe_canvas')) {

		console.log("Found Facebook");
		clearInterval(cleanCheck);
                FBCleanUp()
	 }else{

		
		if (cleanCounter > 1000){
			console.log("BlackOut Stopping Check");
			clearInterval(cleanCheck);
		}


	 }

	cleanCounter++;
}




function FBCleanUp(){



			try{
                            if (document.getElementById('contentCol'))
                                document.getElementById('contentCol').removeChild(document.getElementById('rightCol'));
                                
			}catch(e){}


			try{
                            if (document.getElementById('pagelet_canvas_content')){
                                    document.getElementById('pagelet_canvas_content').style.width = "100%";
                                    document.body.style.backgroundColor = "black";
                                    
                            }
			}catch(e){}


			try{
                            if (document.getElementById('iframe_canvas')){
                                document.getElementById('iframe_canvas').style.height = '3000px';
                                
			}
                        }catch(e){}

			try{
                         //document.getElementById('iframe_canvas').style.
			if (document.getElementById('rightCol')){
                            var ScrareyCreepBox = document.getElementById('rightCol');
                            ScrareyCreepBox.parentNode.removeChild(ScrareyCreepBox);
                            
                        }
			}catch(e){}
			

	
}

function mw_cleanup() {
                //zynga cleanup
				 
                var some_mwiframe = document.getElementById('some_mwiframe');
                if (some_mwiframe !== null) {
                    some_mwiframe.style.margin = '0';
                    some_mwiframe.style.height = '3000px';
                    document.getElementById("background").removeAttribute("style");
                    var div = document.getElementById("mwheader");
                    div.parentNode.removeChild(div);
                    var sideblock = document.getElementById("sideblock");
                    sideblock.parentNode.removeChild(sideblock);
                    document.getElementById("pagecontent").style.margin = '0';
                    return;
                } else {

                    if (iframe_check < 100)
                        setTimeout(function () {
                            mw_cleanup()
                        }, 500)
                }

                iframe_check++;
 }
})()