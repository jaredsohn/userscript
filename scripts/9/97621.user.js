// ==UserScript==
// @name           My New School Graphics
// @namespace      School Vandals Graphics Script
// @description    GIve SV Schools New Graphics
// @include        http://apps.facebook.com/schoolvandals*
// ==/UserScript==


var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_1.jpg")
	{images[x].src = "http://homepage.ntlworld.com/swobbly/school_1.jpg";

}else{

if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_2.jpg")
{images[x].src = "http://homepage.ntlworld.com/swobbly/school_2.jpg";

}else{

if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_3.jpg")
{images[x].src = "http://homepage.ntlworld.com/swobbly/school_3.jpg";

}else{

if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_4.jpg")
{images[x].src = "http://homepage.ntlworld.com/swobbly/school_4.jpg";

}else{

if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_5.jpg")
{images[x].src = "http://homepage.ntlworld.com/swobbly/school_5.jpg";

}else{

if(images[x].src == "http://s3.amazonaws.com/schooled.s3.launch10.com/images/school_12.jpg")
{images[x].src = "http://homepage.ntlworld.com/swobbly/School_20.jpg";
}

}
}	
}
}
}
x=x+1;
}


