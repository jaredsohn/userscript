// Facebook - Swap "interested in" for "sexual orientation"
//
// ==UserScript==
// @name          Facebook - Swap "interested in" for "sexual orientation"
// @namespace     http://userscripts.org/users/109606
// @description     Replaces the "interested in" section of a friend's info with their sexual orientation
// @include           *.facebook.com*
// ==/UserScript==


function switchOrientation(){

dds = document.getElementById("info_section_info_basic");

if(dds){
ddd = dds.getElementsByTagName("dd");
ddt = dds.getElementsByTagName("dt");

for (i=0; i < ddt.length; i++)
{
  if(ddt[i].innerHTML == "Gender:"){
    gender = ddd[i].innerHTML;
  }
  
  if(ddt[i].innerHTML == "Interested in:"){
  interests = ddd[i].innerHTML.replace("<br>","");
  if(gender && interests){
    if(interests.indexOf("Men") > -1 && interests.indexOf("Women") > -1){  
        orientation = "Bisexual";
        e = i;
    }else if(interests.indexOf("Men") > -1 && interests.indexOf("Women") == -1){  
      if(gender == "Female"){
        orientation = "Straight";
        e = i;
      }else if (gender == "Male"){
        orientation = "Gay";
        e = i;
      }
    }else if(interests.indexOf("Men") == -1 && interests.indexOf("Women") > -1){  
      if(gender == "Male"){
        orientation = "Straight";
        e = i;
      }else if (gender == "Female"){
        orientation = "Lesbian";
        e = i;
      }
    }
  }
  }
}

if(orientation){
 ddt[e].innerHTML = "Orientation:";
 ddd[e].innerHTML = orientation;
}

}

setTimeout(switchOrientation, 0);

}



function getElementsByClassName(tclass,tag){
//class items function scripted entirely by JamesPoel.
var classItems = new Array();

 tags = document.getElementsByTagName(tag);
 for (i=0; i < tags.length; i++)
  {
	if(tags[i].className.indexOf(tclass) > -1){ // && tags[i].className.length == tclass.length){
	classItems.push(tags[i]);
	}
  }

return classItems;

}


switchOrientation();