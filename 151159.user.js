// ==UserScript== 
// @name       RYM Custom Chart Include All Genres 
// @match      http://rateyourmusic.com/customchart* 
// @copyright  2012+, You 
// ==/UserScript== 
// Place a new button in the screen to toggle genre filtering on and off 

var contentTable = document.getElementById("content"); 
var targetBar = contentTable.getElementsByTagName("div")[4]; 
var newCb = document.createElement('input'); 

function toggleGenreFilter(){ 
   var genres=(document.getElementById("genres")).value; 
   var genre=genres.split(","); 
   for(i=0;i<genre.length;i++){  genre[i] = genre[i].trim(); } 
   var albumList=document.getElementsByClassName("mbgen"); 
   var album=albumList[0].getElementsByTagName("tr"); 
   var matchArray = []; 
   for(i=0;i<album.length;i++){ 
       var albumGenre=((album[i].getElementsByTagName("td")[2]).getElementsByTagName("div")[0]).getElementsByClassName("genre"); 
       var albumArtist=((((album[i].getElementsByTagName("td")[2]).getElementsByTagName("div")[0]).getElementsByTagName("span")[0]).getElementsByTagName("a")[0]).textContent; 
       var albumName=((((album[i].getElementsByTagName("td")[2]).getElementsByTagName("div")[0]).getElementsByTagName("span")[0]).getElementsByTagName("a")[1]).textContent; 
       var matches = 0; 
       for(j=0;j<albumGenre.length;j++){ 
           for(k=0;k<genre.length;k++){ 
               if(genre[k].toUpperCase() == albumGenre[j].textContent.toUpperCase()){     matches++;    } 
           } 
       } 
       if (matches != genre.length){   matchArray[i] = 0;  } 
       else {   matchArray[i] = 1;  } 
   } 
   for(i=0;i<album.length;i++){ 
       if (matchArray[i] == 0){ 
           if (album[i].style.display == "none"){    album[i].style.display = "";   } 
           else {    album[i].style.display = "none";   } 
       } 
   } 
}     

newCb.type = 'checkbox'; 
newCb.style.float='left'; 
newCb.addEventListener('click', toggleGenreFilter, false); 

targetBar.appendChild(newCb); 
var label = document.createElement('span'); 
label.id = 'toggle_gfilter_lbl'; 
label.innerHTML = '&nbsp-&nbspDisplay releases with ALL genres specified.'; 
label.style.float='left'; 
targetBar.appendChild(label);