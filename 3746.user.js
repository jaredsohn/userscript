// ==UserScript==

// @name           LN Swear Filter v1.1

// @namespace      Karlhockey

// @description    Replaces swears at Longhornnation.com with lovely little hashes.

// @include        http://*.Longhornnation.com/*

// ==/UserScript==




if( window.location.href.match('signin.php') || window.location.href.match('preview.php') || window.location.href.match('editEntry.php') || window.location.href.match('editMe.php') ) {

} else {

var text_st = new Array("<span style='color:red;'>@$^*</span>", "<span style='color:blue;'>%&@$</span>", "<span style='color:purple;'>!#%&</span>", "<span style='color:green;'>#%&@</span>");

var l = text_st.length;

var rnd_no = Math.round((l-1)*Math.random());




input1 = new RegExp('fuck','gi'); 
output1 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input1,output1); 

input2 = new RegExp('shit','gi'); 
output2 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input2,output2);

input3 = new RegExp('crap','gi'); 
output3 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input3,output3); 

input4 = new RegExp('cunt','gi'); 
output4 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input4,output4); 

input5 = new RegExp('bitch','gi'); 
output5 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input5,output5); 

input6 = new RegExp('bastard','gi'); 
output6 = text_st[rnd_no];
document.body.innerHTML = document.body.innerHTML.replace(input6,output6); 

}