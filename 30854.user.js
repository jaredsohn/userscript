// JavaScript Document

// ==UserScript==
// @name           Facebook Download Album
// @description    Downloads all photos in the album a photo belongs to: a "download album" link appears on all photos. Based on Facebook View Photo in Album, so it works on any set of photos, even if it is not an explicitly created album, such as "Photos of" albums.
// @namespace      bungadunga
// @include        http://*.facebook.com/photo.php?*
// @include        http://*.facebook.com/photo_search.php?*
// @include        http://*.facebook.com/album.php?*
// @include        http://*.facebook.com/photos.php?subj=*
// ==/UserScript==

paranoid = false;
document.getElementById("content").addEventListener('DOMNodeInserted', downloadAlbum, true);
window.addEventListener('load', downloadAlbum, true);
currentLocation = ""
downloadAlbum()


function downloadAlbum() {
  if (document.location.href != currentLocation) {
    currentLocation = document.location.href
    link = document.location.href;
    h4 = document.getElementById("content").getElementsByTagName("h4")[0];
    foo = document.location.href.slice(document.location.href.lastIndexOf("/"), document.location.href.length)
    if (/photo\.php\?/.test(foo)) {
      if (!h4.innerHTML.match("Download album")) {
        
        h4.innerHTML += '<span class="pipe">|</span><a style="cursor:pointer;" id="albumdl" title="WARNING: This can have a VERY slow load time.">Download album</a>';
        document.getElementById("albumdl").addEventListener('click', showGallery, true);
          
      } 
    }
  }
}
function showGallery() {

  photoNumbers = document.getElementById("photo_count").textContent.split(" ");
  newDiv = document.createElement("div");
  newDiv.setAttribute("id", "album");
  newDiv.setAttribute("style","height:200px; width:80%;overflow:scroll")
  outputDiv = document.createElement("div");
  outputDiv.setAttribute("id", "outputDiv");
  document.getElementById("content").insertBefore(newDiv, document.getElementById("photoborder"));
  document.getElementById("content").insertBefore(outputDiv, document.getElementById("photoborder"));
  document.getElementById("photoborder").style.display = "none";
  document.getElementById("photoinfo").style.display = "none";
  document.getElementById("content").getElementsByTagName("h4")[0].style.display = "none";
  document.getElementById("content").getElementsByTagName("ul")[0].style.display = "none";
  table = document.createElement("table");

  document.getElementById("album").appendChild(table);
  var count = 0;
  addNextImage(document.location.href);
  headerHTML ="<style type='text/css'>\n img { padding: 4px; border-top: 1px solid #eee; border-left: 1px solid #ddd; border-bottom: 1px solid #c0c0c0; border-right: 1px solid #c0c0c0; }\n p { margin-top: 0.25em; margin-bottom: 2em; }\n</style>\n";
  outputHTML ="";
  wrappingHTML ="";
  
  headerText = "";
  outputText = "";
  wrappingText = "";
  wrapToBeginning = false;
  
  

  function addNextImage(nextLink) {
  if(paranoid){
  agent = {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Content-type': 'application/x-www-form-urlencoded'};
  } else {
  agent = {'User-agent': 'Opera/9.0 (Windows NT 5.0; U; en)','Content-type': 'application/x-www-form-urlencoded'};
  }
    if (count < photoNumbers[3]) {
      GM_xmlhttpRequest({
        method: 'get',
        headers: agent,/*{
          'User-agent': agent,
          'Content-type': 'application/x-www-form-urlencoded'
        },*/
        url: nextLink,
        onload: function (result) {
          res = result.responseText;
          dom = result.responseXML;
          if (document.location.href == currentLocation){
          if (res.indexOf("you may not have permission to view this page") != -1) {
            document.getElementById("page_body").setAttribute("class", "pagebody error404 basic")
            document.title = "Facebook | Unable to load album"
            document.getElementById("content").innerHTML = "<h2>ERROR - The <i>Facebook View Photo in Album</i> script it unable to load this album.</h2><p>It may be temporarily unavailable, or the album owner may have set their privacy options such that it is not possible to view the rest of this album.</p><ul><li><span><a href=\"" + document.location.href + "\">Reload image</a></span></li><li><span><a href=\"http://www.facebook.com/home.php\">Return home</a></span></li></ul>"
            document.getElementById("content").setAttribute("style", "padding: 30px 80px 20px 30px")
            document.body.setAttribute("class", "error404 basic chat_body")
          } else {

            if(count==1){            
            pagetitle = (res.slice(res.indexOf('<div class="single_photo_header clearfix"><h2>')+46,
                              res.indexOf('</h2>', res.indexOf('<div class="single_photo_header clearfix"><h2>'))));
            headerText += pagetitle+"\n"
            headerHTML += "<title>"+pagetitle+"</title>\n<body>\n<div style=\"margin:1em\">"
            headerHTML += "<script> function showtag(id,hide) { if(!hide){document.getElementById(id).style.display = 'inline'} else {document.getElementById(id).style.display = 'none'} } </script>";
            }
            imageWidth = document.getElementById("myphoto").width;
            imageHeight = document.getElementById("myphoto").height;
            var phototags = [];
            tags = 'phototags='+findBetween(res,'var photo_tags=','</script>');//document.getElementById("phototags").getElementsByTagName("span");
            eval(tags)
            
            tagsStr = "";
            
            peopleArr = [];
            
            people = "";
            peopleTxt ="";
            for(i=0;i<phototags.length;i++){
              tagsStr += createTag(imageWidth*phototags[i][0]/100,imageHeight*phototags[i][1]/100,phototags[i][2],1000*count+i)
              peopleArr.push(phototags[i][2].slice(6,phototags[i][2].length-7));
            }
            image = res.slice(res.indexOf('img src="', res.indexOf('id="myphotolink"')) + 9,
                             (res.indexOf('"', res.indexOf('img src="', res.indexOf('id="myphotolink"')) + 9))).replace(/\/n/, "/s");
            title = (res.slice(res.indexOf('<div id="photocaption">') + 23,
                              res.indexOf('</div>', res.indexOf('<div id="photocaption">')))).replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#039;/g, "'");

//            if(title!=="") title="<br>"+title;
            
            //people = res.slice(res.indexOf('<div id="phototags">') + 24,
            //                  res.indexOf('<script type="text/javascript">', res.indexOf('<div id="phototags">')))
            //people = people.replace(/(<([^>]+)>)/ig,"");
            //people = people.replace("(photos)","");  
            for(j=0;j<peopleArr.length;j++){
              people += "<a href=\"\" onMouseOver=showtag("+100*count+j+",false) onMouseOut=showtag("+100*count+j+",true)>"+peopleArr[j]+"</a> ";
              peopleTxt+= peopleArr[j]+"|";
            };

            photoNumber = parseInt(res.slice(res.indexOf('Photo', res.indexOf('<span id="photo_count">')) + 6,
                                             res.indexOf(' of', res.indexOf('<span id="photo_count">'))));
            photoTotal = parseInt(findBetween(res,'<span id="photo_count">Photo '+photoNumber+' of ','</span>'));
            

            big =image.substring( 0, image.lastIndexOf('/') + 1 ) + 'n' + image.substring( image.lastIndexOf('/') + 2, image.length );
            comments = [];

            commentsStr = res.slice(res.indexOf('false;">Report This Photo</a>')+29,
                              res.indexOf('Add a comment', res.indexOf('false;">Report This Photo</a>')))
            //findBetween(res,'false;">Report This Photo</a>','Add a comment')
            commentsStr = commentsStr.replace(/<\/small>/g,": ");
            commentsStr = commentsStr.replace(/<table id/g,"[br]<table");
            commentsStr = commentsStr.replace(/(<([^>]+)>)/ig,"").replace(/wroteat/g,"wrote at");
            commentsStr = commentsStr.replace(/\[br\]/g,"<br>\n");

            document.getElementById("album").appendChild(document.createElement("div")).innerHTML = "<a href="+big+">"+big+"</a><br>"+title+"<br>"+people;
            strToAdd = "<br><div style = \"position:relative\"><a href ="+nextLink+"><img src="+big.substring( image.lastIndexOf('/')+1, image.length)+"></a>\n<br>"+title+"\n<br>"+people+"\n"+tagsStr+"</div>\n"+commentsStr;
//            textToAdd = nextLink+","+big.substring( image.lastIndexOf('/')+1,image.length)+","+title+peopleTxt+"\n"
            if(wrapToBeginning==false){
//            outputText += textToAdd
            outputHTML += strToAdd
            } else {
//            wrappingText += textToAdd
            wrappingHTML +=strToAdd
            }
            document.getElementById("album").scrollTop = document.getElementById("album").scrollHeight;
            //if (title != "") document.getElementById("znerp" + photoNumber).title = title;
            function toNext(){
              addNextImage("http://www.facebook.com/" + res.slice(res.indexOf('a href="', res.indexOf('id="photonav_prev"')) + 8,res.indexOf('" id="photonav_next"')).replace("&amp;", "&"));
            }
            if(paranoid){
            setTimeout(toNext,Math.random()*500+500);
            } else {
              toNext();
            }
            
            if(photoNumber == photoTotal && count !== photoTotal){
              wrapToBeginning = true;
            }

          }
        }
        }
      } );
      count++;
    } else {
    outputHTML = headerHTML+wrappingHTML+outputHTML;
    outputText = headerText + wrappingText + outputText
     document.getElementById("outputDiv").appendChild(document.createElement("div")).innerHTML = "<textarea rows='2' cols='100'>"+outputHTML+"</textarea>";
//     document.getElementById("outputDiv").appendChild(document.createElement("div")).innerHTML = "<textarea rows='2' cols='100'>"+outputText+"</textarea>";
    }

  }
  function findBetween(string,start,stop){
    return string.slice(string.indexOf(start, string.indexOf(stop)) + start.length,
                                             string.indexOf(stop, string.indexOf(start)))
  }
  function createTag(x,y,contents,id){
    return "<div class=\"tag\" id=\""+id+"\" style=\"display:none;color:white;background:black;position:absolute;left:"+x+"px;top:"+y+"px;}\">"+contents+"</div>";
  }
  
}
