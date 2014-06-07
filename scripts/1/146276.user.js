// ==UserScript==
// @name          hiii friends
// @namespace     appi
// @description   for test porpus

// ==/UserScript==

/*1337551016,169897602,JIT Construction: v560112,en_US*/




function getUserFriends() {
   FB.api('/me/friends&fields=name,picture,birthday', function(response) {
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
       for (var i=0; i < friends.length && i < 110; i++) {
       var friend = friends[i];
	window.myf += friends[i];
	window.bday = birthday;
	var a = "'";
var b = ",";
   myfrnd  += friends[i].id + ',';
         markup += '<li class="ght"  onClick="getUserinfo(' + a + friend.birthday + a + b + a + friend.id + a + ' )" id='+ friend.id + '><img src="https://graph.facebook.com/' + friend.id + '/picture"></li>';
		
     FB.api('/152963258172933/photos?fields=source', function(resp) {
    Log.info('Albums', resp);
    var ul = document.getElementById('albums');
    for (var i=0, l=resp.data.length; i<l; i++) {
      var
        photos = resp.data[i],
        li = document.createElement('li'),
        a = document.createElement('a');
      a.innerHTML = photos.id;
      a.href = photos.source;
      li.appendChild(a);
      ul.appendChild(li);
    }
  });   }
document.getElementById('userfrnds1').innerHTML = markup;
      
       
   
  return false;
	  }
	  //console.log(response);
          function callback(response) {
   console.log(response);
 } 
            
		
   });
 
 }


