// ==UserScript== 
// @name           RYM Ignore User
// @description    Replace contents of usersIgnore[] array to change those users' posts to "Ignored" on the RYM message boards
// @match          http://rateyourmusic.com/board_message?* 
// @copyright      2012+, AnniesBoobs
// ==/UserScript== 

var usersIgnore=new Array("user1","user2","user3","user4"); 

posts = document.getElementsByClassName('authorinfo'); 
for (i=0, j=posts.length; j>i; i++){ 
   username = posts[i].getElementsByClassName('usero'); 
   if (username[0] == undefined){ 
       username = posts[i].getElementsByClassName('user'); 
       if (usersIgnore.indexOf(username[0].innerHTML) >= 0){ 
           username[0].innerHTML = 'Ignored'; 
            
           other = username[0].parentNode.parentNode.getElementsByClassName('small')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           other = username[0].parentNode.parentNode.getElementsByClassName('controlbar')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           other = username[0].parentNode.parentNode.getElementsByClassName('controlbar')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           for (x=0, y=3; y>x; x++){ 
               other = username[0].parentNode.parentNode.getElementsByTagName('br')[0]; 
               if (other != undefined){other.parentNode.removeChild(other);} 
           } 
           postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0]; 
           if (postContent != undefined){postContent.parentNode.removeChild(postContent);} 
       } 
   } 
   else{ 
       if (usersIgnore.indexOf(username[0].innerHTML) >= 0){ 
           username[0].innerHTML = 'Ignored'; 
            
           other = username[0].parentNode.parentNode.getElementsByClassName('small')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           other = username[0].parentNode.parentNode.getElementsByClassName('controlbar')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           other = username[0].parentNode.parentNode.getElementsByClassName('controlbar')[0]; 
           if (other != undefined){other.parentNode.removeChild(other);} 
           for (x=0, y=3; y>x; x++){ 
               other = username[0].parentNode.parentNode.getElementsByTagName('br')[0]; 
               if (other != undefined){other.parentNode.removeChild(other);} 
           } 
           postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0]; 
           if (postContent != undefined){postContent.parentNode.removeChild(postContent);} 
       } 
   } 
}