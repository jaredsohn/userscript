// ==UserScript==
// @name           dAInspire
// @namespace      //
// @include        http://*.deviantart.com/art/*
// @version       0.0.5
// ==/UserScript==

var dAInspire = "0.0.5";
  
 function getVer()
    {
    GM_xmlhttpRequest(
      {
        method: 'GET',
        url: " http://userscripts.org/scripts/show/97160",
        onload: function(responseDetails) {
        var wholePage = responseDetails.responseText.split("Version:</b>")
        var latestVer = wholePage[1].split("<br />");
        latestVer = latestVer[0];
        latestVer = latestVer.replace("\n", "");
        latestVer = latestVer.replace("\n", "");
        if(latestVer.indexOf(dAInspire) == -1)
        {
        updateAlert(latestVer);
        }
        }
      });
      }
      
      function updateAlert(latestVer)
      {
        var alertBox = document.createElement("div");
        alertBox.className ="alertBox";
        alertBox.innerHTML ='Your current version of dAInspire ('+dAInspire +') is out of date. The latest version ('+latestVer+') is available <a href ="http://userscripts.org/scripts/show/97160"> here!</a>';
        
        var body = document.getElementsByTagName("body");
        
        GM_addStyle(".alertBox{position:fixed; width:100%; bottom:0px; height: 20px; background:-moz-linear-gradient(#405147, #607465) #607465; text-align:center; color:#fff;z-index:999;border-top:1px solid #304036; padding-top:3px;}"+
        ".alertBox a{color: #D0DD20}")
        
        body[0].appendChild(alertBox);
        
        
        }  
  
  
  function getLinks()
      {
            var inspiredBy = document.createElement("div");
        var inspiredBox = document.getElementsByTagName("acronym");
    
        for(var i = 0; i < inspiredBox.length; i++)
        {
          if(inspiredBox[i].getAttribute("title").indexOf("inspired by") != -1)
          {
          
            inspiredBy = inspiredBox[i];
            
            var linkBox = inspiredBy.innerHTML.split("<br>");
            
            
            for(var li = 0; li < linkBox.length; li++)
            {
             if(linkBox[li].indexOf('avatar') != -1)
              {
              linkBox[li] = linkBox[li];
              }
                else{
                
                if(linkBox[li] != null && linkBox[li] != "")
              {
               
                linkBox[li] =  linkBox[li].replace('<a href="', "");
                linkBox[li]=  linkBox[li].replace("</a>", "");
                linkBox[li]=  linkBox[li].replace(/[a-zA-Z0-9]*<\/a>/, "");
                linkBox[li]=  linkBox[li].replace('=', "");
                linkBox[li]=  linkBox[li].replace('<a class="u" href="', '');
                
                var tempBox = linkBox[li].split('">');
                var secondBox = tempBox[1].split(" by ");
                
                linkBox[li] = tempBox[0] + "|" + secondBox[1] +"|"+ tempBox[2];
                }
              }
            }
          i = inspiredBox.length;
        getImages(linkBox);
          }
        }
      
      }
      
      function getImages(linkBox)
      {
        for(var i = 0; i < linkBox.length; i++)
        {
          var testBox = linkBox[i];
    
          var futurePage = linkBox[i].split("|")[0];
          
          
          var futureTitle = linkBox[i].split("|")[2];
        
         if(futurePage != null && futurePage != "" && testBox.indexOf("</a>") == -1)
         {
          GM_xmlhttpRequest(
          {
            method: 'GET',
            url: futurePage,
            onload: function(responseDetails) {
            var nextSplit = ('"if (navigator.cpuClass)return false"');
            var firstWays = responseDetails.responseText.split(nextSplit)[1];
                fetchImage(firstWays); 
  
            }
          });
           } 
          
         else{slamIcon(futurePage);}
          
          }
      }
      
      function fetchImage(nextWays)
      {
  
              var imagetoGet = "";
              var turboSplit = 'src="'
                var wholePage = nextWays.split('src="');
                var imageID = wholePage[0].split('collect_rid="1:')[1];
                imageID = imageID.replace('"', '');
              var imgGot = wholePage[1].split('" width="');
  
              var sizes = imgGot[1].split('height="');
              var width = sizes[0].split('"')[0];
             var height = sizes[1].split('" alt=')[0];
            
    
              imgGot = imgGot[0];
                                     //var linkBox = linkBox;
               
              slamToDom(imgGot, width, height, imageID);
            }
      
      function slamToDom(imgGot, width, height, imageID)
      {
        var heightRatio = (height / 5);
        var widthRatio = width/5;
        var aspectRatio = 2;
        
        
        var img = document.createElement("img");
        img.setAttribute('src', imgGot);
        
        if ((heightRatio *2) >100)
    
                    {
    
                      aspectRatio = (100/heightRatio);
    
                    } 
                    
        img.height =  heightRatio * aspectRatio;
        img.width =  widthRatio* aspectRatio;
        var linkSplit = imgGot.split('/');
        
        var urlELEM = linkSplit[linkSplit.length-1].split("_by_");
        urlELEM[0] = urlELEM[0].replace("_", "-");
        urlELEM[0] = urlELEM[0].replace("__", "-");
        var userName = urlELEM[1].split('-')[0];
  
        var futurePage = 'http://' + userName +'.deviantart.com/art/'+urlELEM[0]+"-" + imageID;
        var title = urlELEM[0] +" by " +userName;
       
       
        var addBox = document.getElementById("inspiredBox" );
        var link = document.createElement("a");
        link.setAttribute("href", futurePage);
          link.innerHTML= '<img src ="'+imgGot+'" height ="'+img.height+'" width="'+img.width+'" title ="'+title +'" />';
        addBox.appendChild(link);
      
      }
     function slamIcon(avatar)
      {
        var icon = avatar;
        var addBox = document.getElementById("inspiredBox");
        var avaSpan = document.createElement("span");
        avaSpan.innerHTML = icon;
        
        addBox.appendChild(avaSpan);
      }
              
              function boxInit()
              {
              var contentBox = document.createElement("div");
              contentBox.className="inspiredOuter";
              contentBox.setAttribute("id", "inspiredOuter");
              contentBox.innerHTML ='<div id="inspiredBox"><h4>This work was inspired by:</h4> </div>';
              var AfterBox = document.getElementById("artist-comments");
              
              AfterBox.appendChild(contentBox);
              }
              
              function hideUgly()
             {
             var inspiredBox = document.getElementsByTagName("acronym");
              var newBox = document.getElementById("inspiredBox");
              for(var i = 0; i < inspiredBox.length; i++)
            {
            if(inspiredBox[i].getAttribute("title").indexOf("inspired by") != -1)
            {
              if(newBox.childNodes != null)
                {
                  inspiredBox[i].style.display="none";
                }
                }
                }
                }
    
            
              getVer();
              boxInit();
              getLinks();
              hideUgly();
              
               GM_addStyle("#inspiredBox img{margin:5px!important;float:left!important;}"+
               "#inspiredOuter{border-top:1px solid #B2C3AF !important; height:200px; position:relative;padding-left:0px; left:-50px;width:100%;padding-right:40px;}"+
              "#inspiredBox{border-top:1px solid #E9EFE8 !important;left:0!important; width:100%!important;padding-top:10px!important;padding-left:40px;}"+
              "#inspiredBox h4{padding-bottom:15px!important;}");