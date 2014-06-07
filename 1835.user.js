//PVP Archive Bookmarker 3.0 user script
//Verison 3.0
//29/11/2007
//Author: Vectorspace

// ==UserScript==
// @name            PVP Archive Bookmarker
// @version         3.0
// @namespace       http://homepage.ntlworld.com/vectorspace/greasemonkey/
// @description     Version 3. Creates a button visible on pvponline.com comic pages that saves a setting to placemark the current comic viewed. If a placemark is present then creates a button to goto the placemarked comic. Version 3.0 is updated for Nov 2007 PVP website redesign.
// @include         http://www.pvponline.com/*
// @include         http://pvponline.com/*
// ==/UserScript==

(function()
{
//Get stored script preferences
    var markedURL=GM_getValue("markedURL");     //Stored url
    var trueURL=GM_getValue("trueURL");         //Stored url is actual url if true, stored url is previous comic url if false

    var setListener=false;                      //Link event listener flags
    var gotoListener=false;
    var pathname=document.location.pathname;    //Get page path name
    
    document.addEventListener("unload",cleanupListeners,false);     //Add document unload listener to clean up other listeners
    
//Create and style Set Placemark link
    var aSet=document.createElement("a");                                   //Create new a element for set mark link
    aSet.setAttribute("href","javascript:;");                               //Set href
    aSet.setAttribute("id","storeLink");                                    //Set id to storeLink
    aSet.setAttribute("title","Click here to placemark the current comic"); //Set title
    aSet.appendChild(document.createTextNode("Set Placemark"));             //Append 'Set Placemark' text as child node
    aSet.style.display="none;";                                             //Style display none
    aSet.style.fontSize="12px";                                             //Style 12px font size
    aSet.style.color="black;";                                              //Style font colour black
    
//Create br element to add newline between links
    var divider=document.createElement("br");

//Create and style Goto Placemark link
    var aGoto=document.createElement("a");                                          //Create new a element for goto mark link
    aGoto.setAttribute("href","javascript:;");                                      //Set href
    aGoto.setAttribute("id","gotoLink");                                            //Set id to gotoLink
    aGoto.setAttribute("title","Click here to go to the last placemarked comic");   //Set title
    aGoto.appendChild(document.createTextNode("Goto Placemark"));                   //Append 'Goto Placeark' text as child node
    aGoto.style.display="none;";                                                    //Style display none
    aGoto.style.fontSize="12px";                                                    //Style 12px font size
    aGoto.style.color="black;";                                                     //Style font colour black

//Page type flags
    var latest=false;       //Is latest comic
    var first=false;        //Is first comic
    var archive=false;      //Is comic page in archive
    var comicPage=false;    //Is comic page

    var nav=document.getElementById("navbar");                      //Get Navbar element. If found:
    if(nav)
    {
        var imgLinks=nav.getElementsByTagName("img");               //Get all image elements in navbar

        if(imgLinks.length>0)                                       //If at least one found
        {
            comicPage=true;                                         //Then is comic page
            
            if(imgLinks.length>1)
                archive=true;                                       //If more than one found then is archive comic page

            else                                                    //Else if only one found:
            {
                if(imgLinks[0].src.indexOf("yesterday_curl")!=-1)       //If image is yesterday_curl.jpg
                    latest=true;                                        //Then is latest comic

                else if(imgLinks[0].src.indexOf("left_curl.jpg")!=-1)   //Else if image is left_curl.jpg
                {
                    latest=true;                                        //Then is then is archive page and latest comic
                    archive=true;
                }
                else
                {
                    first=true;                                         //Else is first comic and archive page
                    archive=true;
                }
            }

            if(imgLinks.length>1)                                               //If more than one image found in nav
                    imgLinks[imgLinks.length-1].setAttribute("align","left");   //Add align=left to last image in nav

            else if(imgLinks.length==1)                                         //Else if only one found
            {
                //Create spacer image to replace missing next/prev comic link image
                spacer=document.createElement("img");                           //Create img element
                //Set src to be data uri - 1px x 1px png image, same colour as nav bar
                spacer.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4P0MKAARLAbLrRbejAAAAAElFTkSuQmCC";
                spacer.style.height="35px";                                     //Set height and width to match next/prev comic link images
                spacer.style.width="259px";

                if(latest)                                                      //If comic is latest
                {
                    imgLinks[imgLinks.length-1].setAttribute("align","left");   //Add align=left to last image in nav
                    spacer.setAttribute("align","right");                       //Set spacer iamge to align right
                }
                else
                    spacer.setAttribute("align","left");                        //Else set spacer to align left

                nav.appendChild(spacer);                                        //Append spacer image to nav

            }

            nav.appendChild(aSet);                              //Append Set Placemark link to nav
            nav.appendChild(divider);                           //Append divider br element to nav
            nav.appendChild(aGoto);                             //Append Goto Placemark link to nav
            nav.style.textAlign="center"                        //Set nav text align to centre
            nav.style.height="35px"                             //Set nav height to match next/prev comic link images
    
            if(markedURL)                                       //If stored placemark was found
            {
                aGoto=document.getElementById("gotoLink")       //Get goto placemark link
                aGoto.style.display="inline;";                  //Unhide goto placemark link
                aGoto.addEventListener("click",gotoMark,false); //Add onclick event listener to goto link
                gotoListener=true;                              //Set goto mark link event listener flag
            }
            if(comicPage)                                       //If current page is a comic page
            {
                aSet=document.getElementById("storeLink")       //Get placemark link
                aSet.style.display="inline;";                   //Unhide goto placemark link
                aSet.addEventListener("click",setMark,false);   //Add onclick event listener to set mark link
                setListener=true;                               //Set placemark link event listener flag
    
            }
        }
    }

//------------------------------------------------------
//setMark()
//Called by placemark link onclick, marks current comic
//------------------------------------------------------
    function setMark()
    {

        if((latest)&&(!archive))
        {
            markedURL=imgLinks[0].parentNode.href
            trueURL=false
            GM_setValue("markedURL",markedURL);     //Store values in script preferences
            GM_setValue("trueURL",trueURL);
            aGoto.style.display="inline;";
            getURL(0)
        }
        else
        {
            markedURL=document.location.href;
            trueURL=true;
            GM_setValue("markedURL",markedURL);     //Store values in script preferences
            GM_setValue("trueURL",trueURL);
            aGoto.style.display="inline;";
        }

    }

//------------------------------------------------------
//gotoMark()
//Called by goto mark link onclick, goes to marked comic
//------------------------------------------------------
    function gotoMark()
    {
        if(trueURL)                         //If stored URL is true url
            document.location=markedURL;    //Go to stored url
        else
            getURL(1)                       //Else (url is previous comic) load previous comic, extract next comic url, and go to it
            
    }

//------------------------------------------------------
//getURL(load)
//Called by setMark() and gotoMark(), retrieves page of
//stored url using GM_xmlhttpRequest() and extracts next
//comic url, then either stores it as true url (load=0)
//or goes to url (load=1)
//------------------------------------------------------
    function getURL(load)
    {
        var link
        GM_xmlhttpRequest({             //HTTP request the stored url
            method: 'GET',
            url: markedURL,
            onload: function(responseDetails)
            {
            
                var text=responseDetails.responseText;              //Get source of stored url as text

                var navbarId=text.indexOf("id=\"navbar\"");         //Search text for forward button id


                var i1=text.indexOf("<a ",navbarId);                //Get index of first anchor element after navbar
                var i2=text.indexOf(">",i1);                        //Get index of first > after beginning of anchor element
                text=text.substring(i1,i2);                         //Store substring, is raw text of desired html element

                i1=text.indexOf("href=\"");                         //Locate first href=" in string
                i1=text.indexOf("\"",i1)+1;                         //Get index of " plus 1 (index of start of url)
                i2=text.indexOf("\"",i1);                           //Get index of next " (end of url)
                var link=text.substring(i1,i2);                     //Go to to recovered url (url of forward button)

                if(load)                                    //If load is set
                    document.location=link;                 //Load retrieved link

                else                                        //Else store retrieved link:
                {
                    markedURL=link;                         //Set markedURL to retrieved link
                    trueURL=true;                           //Set trueURL to true
                    GM_setValue("markedURL",markedURL);     //Store values in script preferences
                    GM_setValue("trueURL",trueURL);
                }
            }
        });
    }

//------------------------------------------------------
//cleanupListeners()
//Called by document unload, removes event listeners
//------------------------------------------------------
    function cleanupListeners()
    {
        if(gotoListener)                    //If goto link was added to page, remove listener
            document.getElementById(gotoLink).removeEventListener("click",gotoMark,false);
            
        if(setListener)                     //If set link was added to page, remove listener
            aSet.removeEventListener("click",setMark,false);

                                            //Remove document unload listener
        document.removeEventListener("unload",cleanupListeners,false);
    }

}
)();