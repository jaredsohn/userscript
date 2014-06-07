// ==UserScript==
// @name       Downloader
// @namespace  http://use.i.E.your.homepage/
// @version    0.4
// @description  adds download links for file from the server
// @match      *stream.sgu.edu/TB/Play*
// @copyright  none
// ==/UserScript==



// chrome stuff
//chrome.pageAction.show(tabId);

// -------------------Get the manifest.js file and put it into manifestLink---------------------------
// Get the current page HTML
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
            
            
            
            // construct regex for audio file
            var myRe4 = new RegExp("Location:\"(.+[wmv|mp4])\\?", "i");
            var myArray4 = myRe4.exec(xmlhttp.responseText);
            var audioFile = myArray4[1];
            
            debugger;
            

			for (var y = 0; y < 40; y++)
			{
				document.body.innerHTML += "<br />";
			}
			
			
			document.body.innerHTML += "<a href='" + audioFile + "'>Download Audio File (Right click or control click to save this link)</a><br /><br />";
            
            if (num < 200)
			{
			
			
				var i;
				for (i = 1; i <= 9; i++) 
				{
					document.body.innerHTML += "<p><img src='" + link + "slide_000" + i + "_1024_768.jpg'></p>";
				}
				
				// this was needed for lectures that have more than 100 slides. There is still a problem with lectures that have
				// less than 10 slides, there will be some extra blank slides at the end.
				if (num > 99)
				{
					for (i = 10; i <= 99; i++) 
					{
						document.body.innerHTML += "<p><img src='" + link + "slide_00" + i + "_1024_768.jpg'></p>";;
					}
					for (i = 100; i <= num; i++) 
					{
						document.body.innerHTML += "<p><img src='" + link + "slide_0" + i + "_1024_768.jpg'></p>";;
					}
				}
				else
				{
					for (i = 10; i <= num; i++) 
					{
						document.body.innerHTML += "<p><img src='" + link + "slide_00" + i + "_1024_768.jpg'></p>";;
					}
				}
			
			}
			else
			{
				document.body.innerHTML += "There are too many images to display. Tell the script creator to fix this.";
			}
  
            done = 1;
        }
    }
}
    
// this part runs linearly with the rest of the program. This opens the connection and then keeps going.
// when the data has been downloaded, the StateChange function above will be run asynchronously
xmlhttp.open("GET", manifestLink, true);
xmlhttp.send();
debugger;   //temp
