// ==UserScript==
// @name twittara
// @namespace twipsztj
// @description mass follow twitter
javascript:var%50lis%50=%50document.getElementsByTagName('li');for(var%50n%50in%50lis)%50{var%50li%50=%50lis[n];try%50{var%50cl%50=%50li.getAttribute('class');if(cl%50==%50'follow-action')%50{var%50butt%50=%50li.getElementsByTagName('button')[0];butt.click();}%50}%50catch(e)%50{}%50}document.getElementById('friend_adder_message').innerHTML='Followed.';(function(){})();

// ==/UserScript==

