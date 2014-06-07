// ==UserScript==
// @name          invitfriends
// @namespace     appi
// @description   for test porpus

// ==/UserScript==

/*1337551016,169897602,JIT Construction: v560112,en_US*/


function adfrnds(q){  
  
  FB.ui({method: 'apprequests',
     to:q ,
     title: 'My Great Invite',
     message: 'Create an attractive stylish signature',
   }, callback);
   FB.ui({
    method: 'feed',
    name: 'I\'m building a social mobile web app!',
    caption: 'This web app is going to be awesome.',
    description: 'Check out Facebook\'s developer site to start building.',
    link: 'https://developers.facebook.com/mobile',
    picture: 'http://www.facebookmobileweb.com/getting-started/img/facebook_icon_large.png'
  }, 
  function(response) {
    console.log('publishStory response: ', response);
  });
  return false;
 }

 function callback(response) {
   console.log(response);
 }