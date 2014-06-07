// ==UserScript==
// @name       Streamer
// @namespace  http://use.i.E.your.homepage/
// @version    0.37
// @description  adds download links for file from the server
// @match      *stream.sgu.edu/TB/Play*
// @copyright  none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==



// chrome stuff
//chrome.pageAction.show(tabId);

// -------------------Get the manifest.js file and put it into manifestLink---------------------------
// Get the current page HTML
//alert($('video').remove());
// $(document).unbind("load");
// $(document).unbind("keyup");
//$('#PageContent').remove();
var html = document.getElementsByTagName('html')[0];

var text = html.innerHTML;
// create the RegEx string, the brackets separate the revelent part out.
var myRe = new RegExp("src=\"(.+manifest.js)", "i");
var myArray = myRe.exec(text);
// Grab the link from the second array element
var manifestLink = "http://stream.sgu.edu" + myArray[1];
//document.write(myArray[1]);




// ----------------------------Grab the Source of the manifest file -----------------------------
// Note, this function runs asynchronously, so any variables that rely on info from here must be run in the StateChange function below.
xmlhttp=new XMLHttpRequest();
var done = 0; // if the function has been run before or not
// Asynchronous function, all changes must happen in here from now on
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        // do nothing until the data has been loaded
        if (xmlhttp.responseText != null && done != 1)
        {
            //debugger;   // tmep
            
            //alert(xmlhttp.responseText);
            
            // construct a new regEX for the images link
            var myRe1 = new RegExp("TB/FileServer/(.+)/", "i");
            var myArray1 = myRe1.exec(xmlhttp.responseText);
            // this variable will contain the actual link
            
            // *******temp link*********
            var link = "http://stream.sgu.edu/" + myArray1[0];
            
            //construct RegEx for the image number
            var myRe2 = new RegExp("Slides\\[([0-9]+)\\]", "g");
            var myArray3;
            var num;
            do
            {
                myArray3 = myRe2.exec(xmlhttp.responseText);
                
                if (myArray3 != null)
                {
                    num = myArray3[1];
                }
                else
                {
                    break;
                }
            }
            while (myArray3 != null)
            
            //CreateSlide("",
            
            var myReJK = new RegExp("\\,[0-9]+\\,", "g");
            var myArrayJK;
            var timecodes = new Array();
            do
            {
                myArrayJK = myReJK.exec(xmlhttp.responseText);
                
                if (myArrayJK != null)
                {
                    //num = myArrayJK[1];
                    
                     timecodes.push(parseInt(myArrayJK[0].replace(",","")));
                   // document.body.innerHTML += timecodes[0]+"<br />";
                }
                else
                {
                    break;
                }
            }
            while (myArrayJK != null)
    
            //timecodes.reverse;


            // construct regex for audio file
            var myRe4 = new RegExp("Location:\"(.+[mp4])\\?", "i");
            var myArray4 = myRe4.exec(xmlhttp.responseText);
            var audioFile = myArray4[1];
            
       //     debugger;
            

			for (var y = 0; y < 40; y++)
			{
				document.body.innerHTML += "<img/><br />";
			} 
            document.body.innerHTML += "<div style=\"font-weight:bold;font-size:small;display:inline;\" id=\"number\">0/0</div> <div style=\"font-size:small;display:inline;\">Zoom: <a href=\"javascript:void(0)\" id=\"fifty\">50%</a><a href=\"javascript:void(0)\" id=\"hundred\">100%</a></div><img height=768 width=1024 id=\"slide\"/>";
            document.body.innerHTML+="<table id=\"ratetbl\" style=\"width:1024px;border:1px;border-style:solid;\">\
<tr>\
<td ><a href=\"javascript:void(0)\" id=\"prevSlide\"><b><<</b></a></td>\
<td ><a href=\"javascript:void(0)\" id=\"10\">1.0x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"12\">1.2x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"14\">1.4x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"16\">1.6x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"18\">1.8x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"20\">2.0x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"nextSlide\"><b>>></b></a></td>\
</tr>\
<tr>\
<td ><a href=\"javascript:void(0)\" id=\"prevSlide\"><b><<</b></a></td>\
<td ><a href=\"javascript:void(0)\" id=\"22\">2.2x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"24\">2.4x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"26\">2.6x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"28\">2.8x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"30\">3.0x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"32\">3.2x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"nextSlide\"><b>>></b></a></td>\
</td></tr>\
<td ><a href=\"javascript:void(0)\" id=\"prevSlide\"><b><<</b></a></td>\
<td ><a href=\"javascript:void(0)\" id=\"34\">3.4x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"36\">3.6x</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"38\">3.8x</a></td>\
<td colspan=3  ><a href=\"javascript:void(0)\" id=\"40\" >Davey Dave</a></td>\
<td ><a href=\"javascript:void(0)\" id=\"nextSlide\"><b>>></b></a></td></tr>\
</table>";
            if (num < 200)
			{
			
				var myArrayImgJk=new Array();
				var i;
				for (i = 1; i <= 9; i++) 
				{
					//document.body.innerHTML += "<p><img src='" + link + "slide_000" + i + "_1024_768.jpg'></p>";
                    myArrayImgJk[i]=link + "slide_000" + i + "_1024_768.jpg";;
				}
				  
				// this was needed for lectures that have more than 100 slides. There is still a problem with lectures that have
				// less than 10 slides, there will be some extra blank slides at the end.
				if (num > 99)
				{
					for (i = 10; i <= 99; i++) 
					{
						//document.body.innerHTML += "<p><img src='" + link + "slide_00" + i + "_1024_768.jpg'></p>";;
						myArrayImgJk[i]=link + "slide_00" + i + "_1024_768.jpg";;
                    }
					for (i = 100; i <= num; i++) 
					{
						//document.body.innerHTML += "<p><img src='" + link + "slide_0" + i + "_1024_768.jpg'></p>";;
						myArrayImgJk[i]=link + "slide_0" + i + "_1024_768.jpg";;
                    }
				}
				else
				{
					for (i = 10; i <= num; i++) 
					{
						//document.body.innerHTML += "<p><img src='" + link + "slide_00" + i + "_1024_768.jpg'></p>";;
                       myArrayImgJk[i]=link + "slide_00" + i + "_1024_768.jpg";;
					}
				}
			
			}
			else
			{
				document.body.innerHTML += "There are too many images to display. Tell the script creator to fix this.";
			}
          
                            
            

                var i=0;
				myArrayImgJk.splice(0,1);
                var script = document.createElement('script');
                script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
                document.getElementsByTagName('head')[0].appendChild(script);
                script.addEventListener('load', function(){ 
                    document.body.innerHTML += "<audio id=\"audio\" src=\""+audioFile+"\"/ controls >";
                    var audio = document.querySelector('audio'), img = document.querySelector('#slide');
                	crap=document.querySelector('.playerContent');
                    rate=document.querySelector('.rate');
                	crap.style.visibility="hidden";
                    audio.style.width="1024px";
                    img.style.display="block";
                	img.style.zIndex="10000";
                    		document.getElementById("hundred").style.fontWeight="bold";
                    function getI(){
                        		closest=null;
                        	for(k=0;k<timecodes.length;k++){
                                 if (closest == null || timecodes[k]/1000 - audio.currentTime < 0 && k<myArrayImgJk.length ) {
                                    closest = k;                                 
                                 }
                        	}
                        setNumber();
                       return closest;
                    }
                    audio.addEventListener("timeupdate", function() {
						if (audio.currentTime >= timecodes[i]/1000&&i < myArrayImgJk.length&&audio.seeking==false ) {
							img.src=myArrayImgJk[i];
							i++;
                            setNumber();
                            console.log("i'm on it too");
						}
					}	
					, false);
					audio.addEventListener("seeked", function() {
                        if (audio.seeking == false){
							closest=null;
                        	for(k=0;k<timecodes.length;k++){
                                 if (closest == null || timecodes[k]/1000 - Math.floor(audio.currentTime) < 0 && k<myArrayImgJk.length ) {
                                    closest = k;                                 
                                 }
                        	}
							i=closest;
                        console.log(timecodes[i]/1000+"sec img:"+myArrayImgJk[i]);
                           img.src=myArrayImgJk[i];
                            setNumber();
                        	
                        }
                    }	
					, false);
					//poor mans autoplay
                    if (!audio.playing){
						audio.play(); 
                        console.log(timecodes.length+"total times and totalimg:"+myArrayImgJk.length);
                        setNumber();
					}
                  function  setNumber(){
                    document.getElementById("number").innerHTML="Slide "+(i+1)+"/"+myArrayImgJk.length;
                    }
                   document.addEventListener ("keydown", 
                                                  function (e) {
                       if (e.keyCode==32 && audio.paused==false){
                            audio.pause();
                       } else if (e.keyCode==32 && audio.paused){
                           audio.play();}
                         else if (e.keyCode==37){
                           audio.currentTime=audio.currentTime-5;}
                         else if (e.keyCode==39){
                           audio.currentTime=audio.currentTime+5;}
                    }, false);
                    function resetZoom(){
                        document.getElementById("fifty").style.fontWeight="normal";
                        document.getElementById("hundred").style.fontWeight="normal";
                    }
                    function resetWeight() {
						document.getElementById("10").style.fontWeight="normal";
                        document.getElementById("12").style.fontWeight="normal";
                        document.getElementById("14").style.fontWeight="normal";
                        document.getElementById("16").style.fontWeight="normal";
                        document.getElementById("18").style.fontWeight="normal";
                        document.getElementById("20").style.fontWeight="normal";
                        document.getElementById("22").style.fontWeight="normal";
                        document.getElementById("24").style.fontWeight="normal";
                        document.getElementById("26").style.fontWeight="normal";
                        document.getElementById("28").style.fontWeight="normal";
                        document.getElementById("30").style.fontWeight="normal";
                        document.getElementById("32").style.fontWeight="normal";
                        document.getElementById("34").style.fontWeight="normal";
                        document.getElementById("36").style.fontWeight="normal";
                        document.getElementById("38").style.fontWeight="normal";
                        document.getElementById("40").style.fontWeight="normal";
                    }
                  tds=document.getElementsByTagName("td");

                   	for(q=0; q<tds.length; q++){
                        tds[q].style.border="solid 1px";
                        tds[q].style.textAlign="center";
                    }
                    //i suck at javascript :(
                    document.getElementById("prevSlide").addEventListener ("click", function (){
                        if (i>1){ 
                            audio.currentTime=0.1+timecodes[getI()-1]/1000; //img.src=myArrayImgJk[getI()-1];
                            setNumber();
                        }
                    }, false);
                    document.getElementById("nextSlide").addEventListener ("click", function (){
                        if (i<timecodes.length+1){
                            audio.currentTime=0.1+timecodes[getI()+1]/1000; //img.src=myArrayImgJk[getI()+1];
                            setNumber();
                    }
                                                                                               }, false);
                    document.getElementById("fifty").addEventListener ("click", function (){img.height=480;img.width=640;  document.getElementById("ratetbl").style.width="640px";audio.style.width="640px"; resetZoom(); this.style.fontWeight="bold";}, false);
					document.getElementById("hundred").addEventListener ("click", function (){img.height=768;img.width=1024;document.getElementById("ratetbl").style.width="1024px";audio.style.width="1024px"; resetZoom(); this.style.fontWeight="bold";}, false);

                    document.getElementById("10").addEventListener ("click", function (){audio.playbackRate=1.0; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("12").addEventListener ("click", function (){audio.playbackRate=1.2; resetWeight(); this.style.fontWeight="bold";}, false);
                   	document.getElementById("14").addEventListener ("click", function (){audio.playbackRate=1.4; resetWeight(); this.style.fontWeight="bold";}, false);
					document.getElementById("16").addEventListener ("click", function (){audio.playbackRate=1.6; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("18").addEventListener ("click", function (){audio.playbackRate=1.8; resetWeight(); this.style.fontWeight="bold";}, false);
					document.getElementById("20").addEventListener ("click", function (){audio.playbackRate=2.0; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("22").addEventListener ("click", function (){audio.playbackRate=2.2; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("24").addEventListener ("click", function (){audio.playbackRate=2.4; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("26").addEventListener ("click", function (){audio.playbackRate=2.6; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("28").addEventListener ("click", function (){audio.playbackRate=2.8; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("30").addEventListener ("click", function (){audio.playbackRate=3.0; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("32").addEventListener ("click", function (){audio.playbackRate=3.2; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("34").addEventListener ("click", function (){audio.playbackRate=3.4; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("36").addEventListener ("click", function (){audio.playbackRate=3.6; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("38").addEventListener ("click", function (){audio.playbackRate=3.8; resetWeight(); this.style.fontWeight="bold";}, false);
                    document.getElementById("40").addEventListener ("click", function (){audio.playbackRate=4.0; resetWeight(); this.style.fontWeight="bold";}, false);

                }
           , false);                  
            done = 1;
        }
    }
} 
if(document.getElementsByTagName('video')!==null||document.getElementsByTagName('video')!==undefined){
document.getElementsByTagName('video')[0].volume=0;
document.querySelector("video > source").src = "nothing";
document.getElementsByTagName('video')[0].load();
}
// this part runs linearly with the rest of the program. This opens the connection and then keeps going.
// when the data has been downloaded, the StateChange function above will be run asynchronously
xmlhttp.open("GET", manifestLink, true);
xmlhttp.send();
//debugger;   //temp
