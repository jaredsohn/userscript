// ==UserScript==
// @name          Facebook - View All Photos
// @version        1.4.1
// @description    Places link to view all photos of a user
// @include        http://*.facebook.com/photo_search.php*
// @include        http://*.facebook.com/#!/profile.php?id=1548331322&sk=photos*
// @include        http://*.facebook.com/#!/profile.php?id=1548331322*
// @include        http://*.facebook.com/media/albums/?id=1548331322*
// @include        http://*.facebook.com/s.php*
// @include        http://*.facebook.com/srch.php*
// @author        Daniel Cooper
// @author        soniiic@gmail.com
// ==/UserScript==


switch( location.pathname ) {
   case "/profile.php":
      photosLink = document.getElementById('action_app_2305272732');
      if (photosLink){
         var pageurl = document.URL;
         photosLink.parentNode.replaceChild(applyprofile(getlink(),1), photosLink);
      }
      else{
         var pageurl = document.URL;
         profileActionDiv = document.getElementById('profileActions');
         profileActionDiv2 = document.createElement("div");
         profileActionDiv2.appendChild(profileActionDiv.childNodes[0]);
         profileActionDiv2.appendChild(applyprofile(getnamelink(),0));
         pActLen = profileActionDiv.childNodes.length;
         for(i = 1; i <= pActLen; i++) {
            profileActionDiv2.appendChild(profileActionDiv.childNodes[0]);
         }
         profileActionDiv2.setAttribute("id", "profileActions");
         profileActionDiv.parentNode.replaceChild(profileActionDiv2, profileActionDiv);
      }
      
      break;
   case "/album.php":
      changePhotoLinksAlbum();
      break;
   case "/s.php":
   case "/srch.php":
      searchResults = document.evaluate('//div[contains(@class, "result clearfix")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      for (i = searchResults.snapshotLength - 1; i >= 0; i--) {
         indivUser = searchResults.snapshotItem(i);
         if (!(indivUser.innerHTML.match(/facebook.com\%2Fprofile\.php/))) {
            try{
               nameTag = indivUser.getElementsByTagName("dd")[0];
               name = nameTag.getElementsByTagName("span")[0].innerHTML;
               nameTag.innerHTML = '<a href="photo_search.php?name='+name.replace(/ /g,"+")+'&view=all"><font color="#983b42">'+name+'</font></a>';
               picTag = indivUser.getElementsByTagName("span")[0];
               picTag.innerHTML = '<a href="photo_search.php?name='+name.replace(/ /g,"+")+'&view=all">'+picTag.innerHTML+'</a>';            
            }
            catch(err){
            }
         }
      }
   default:
      
      var pageurl = document.URL;
      changePhotoLinks();
      if (pageurl.search("name=") != -1) {
         picDiv = document.evaluate('//a[contains(@href, "view=all&name=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
         for (i = picDiv.snapshotLength - 1; i >= 0; i--) {
            indivPic = picDiv.snapshotItem(i);
            indivPic.href = indivPic.href.replace(/name\=[%\w]+\&/,"")
         }
      }
      if (pageurl.search("aid=-1") == -1 && pageurl.search("name=") == -1 && pageurl.search("oid=") == -1 && (pageurl.search("photo_search.php") !== -1 || pageurl.search("subj=") !== -1)) {
         onPhotos(getname(),getlink());
      }
      break;
}

function applyprofile(link,known){
   tagA = document.createElement("a");
   tagA.setAttribute("href", link);
   tagDiv = document.createElement("div");
   tagDiv.setAttribute("class", "holder clearfix");
   tagDiv.setAttribute("onmouseout", "this.className='holder clearfix';");
   tagDivDiv = document.createElement("div");
   tagDivDiv.setAttribute("class", "text");
   if (known){
      tagDivDiv.innerHTML = photosLink.childNodes[0].childNodes[0].innerHTML.replace("View Photos of","View All Photos of");
   }
   else{
      tagDivDiv.innerHTML = "View Some Photos";
   }
   tagDiv.appendChild(tagDivDiv);
   tagA.appendChild(tagDiv);
   return tagA;
}

function getname(){
   if (pageurl.search("&m=1") == -1)
      { pagetitle = document.title.split(" ",5); }
   else
      { pagetitle = document.title.split(" ",7); }
   return pagetitle.slice(pagetitle.lastIndexOf(","));
}

function getnamelink(){
   fullName = document.title.replace(/Facebook \| /,"").replace(/ /g,"+");
   return "photo_search.php?name="+fullName+"&view=all"
}

function getlink(){
   if (pageurl.search("subj=") == -1) {
      fbid = "id=";
      offset = 3;
   }
   else {
      fbid = "subj=";
      offset = 5;
   }
   idextract = pageurl.slice(pageurl.indexOf(fbid) + offset);
   if (idextract.search("&") > -1) {
      idextract = idextract.substring(0, idextract.indexOf("&"));
   }
   return "photo_search.php?id=" + idextract + "&aid=1&auser=1&view=all"; 
}

function onPhotos(firstname, link){
   photoslinks = document.getElementById("content").getElementsByTagName("h4")[0];
   photoslinks.innerHTML += '<span class="pipe">|</span><a href='+link+'>View All Photos of '+firstname+'</a>';
   if (pageurl.search("&aid=1&auser=1&view=all") !== -1) {
      headertitle = document.getElementById("content").getElementsByTagName("h2")[0];
      headertitle.innerHTML = 'All Photos of ' + firstname
   }
}

function changePhotoLinks(){
   photoTags = document.getElementById('phototags');
   if (photoTags) {
      for (i=0;i<photoTags.childNodes.length;i++) {
         if (photoTags.childNodes[i].childNodes[2]) {
            if (photoTags.childNodes[i].childNodes[2].href) {
               if (photoTags.childNodes[i].childNodes[2].href.match(/photo\_search\.php\?id\=/)) {
                  indivLink = photoTags.childNodes[i].childNodes[2];
                  linkarray = indivLink.href.split("&");
                  indivLink.setAttribute("href", linkarray[0] + "&aid=1&auser=1&view=all");
                  photoTags.childNodes[i].childNodes[2].parentNode.replaceChild(indivLink, photoTags.childNodes[i].childNodes[2]);
               }
            }
         }
      }
   }
}

function changePhotoLinksAlbum(){
   var albumTags=document.getElementsByTagName("div");
   for (i=0; i<albumTags.length; i++) {
      if (albumTags[i].className=="album_tags") {
         for (j=0;j<albumTags[i].childNodes.length;j++){
            if (albumTags[i].childNodes[j].href) {
               if (albumTags[i].childNodes[j].href.match(/photo\_search\.php\?id\=/)) {
                  indivLink = albumTags[i].childNodes[j];
                  linkarray = indivLink.href.split("&");
                  indivLink.setAttribute("href", linkarray[0] + "&aid=1&auser=1&view=all");
                  albumTags[i].childNodes[j].parentNode.replaceChild(indivLink, albumTags[i].childNodes[j]);
               }
            }
         }
      }
   }
}