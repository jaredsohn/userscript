// ==UserScript==
// @name       Swinglifestyle improvements
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.swinglifestyle.com/profile/memberprofile.cfm*
// @match      http://www.swinglifestyle.com/profile/lookup.cfm*
// @match      http://www.swinglifestyle.com/home/index.cfm
// @match      http://www.swinglifestyle.com/search/searchpost.cfm*
// @match      http://www.swinglifestyle.com/whoson/
// @copyright  2012+, You
// ==/UserScript==

if (document.location.href.indexOf("index.cfm")>0||document.location.href.indexOf("searchpost.cfm")>0||document.location.href.indexOf("whoson")>0) {
    document.body.innerHTML=document.body.innerHTML.replace(/65\.jpg/g,"250.jpg");
}
else {

for (table in document.body.getElementsByTagName("TABLE")) {
    if (document.body.getElementsByTagName("TABLE")[table].width=="650px") document.body.getElementsByTagName("TABLE")[table].width="80%";
}
for (div in document.body.getElementsByTagName("DIV")) {
    if (document.body.getElementsByTagName("DIV")[div].style) {
        if (document.body.getElementsByTagName("DIV")[div].style.width=="650px") document.body.getElementsByTagName("DIV")[div].style.width="80%";
    }
}

profilediv=document.body.getElementsByClassName("profileborder")[0];
profilediv.childNodes[1].childNodes[2].childNodes[1].width="";
profilediv.childNodes[1].childNodes[2].childNodes[3].style.display="none";
profilediv.childNodes[1].childNodes[2].childNodes[5].width="";
profilediv.childNodes[1].childNodes[2].childNodes[5].height="";

try {
firstphoto=profilediv.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[1]; // first photo
firstphoto.src=firstphoto.src.replace("65.jpg","250.jpg");
firstphoto.parentNode.setAttribute("onmouseover","document.textField.src='"+firstphoto.src.replace("250.jpg","slssb.jpg")+"'");
} catch(err) {}

try {
secondphoto=profilediv.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[1];
secondphoto.src=secondphoto.src.replace("65.jpg","250.jpg");
secondphoto.parentNode.setAttribute("onmouseover","document.textField.src='"+secondphoto.src.replace("250.jpg","slssb.jpg")+"'");
}catch(err) {}

try {
thirdphoto=profilediv.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1];
thirdphoto.src=thirdphoto.src.replace("65.jpg","250.jpg");
thirdphoto.parentNode.setAttribute("onmouseover","document.textField.src='"+thirdphoto.src.replace("250.jpg","slssb.jpg")+"'");
}catch(err) {}

try {
fourthphoto=profilediv.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].childNodes[2].childNodes[3].childNodes[1].childNodes[1];
fourthphoto.src=fourthphoto.src.replace("65.jpg","250.jpg");
fourthphoto.parentNode.setAttribute("onmouseover","document.textField.src='"+fourthphoto.src.replace("250.jpg","slssb.jpg")+"'");
}catch(err) {}

try {
fifthphoto=profilediv.childNodes[1].childNodes[2].childNodes[1].childNodes[1].childNodes[1].childNodes[4].childNodes[1].childNodes[1].childNodes[1];
fifthphoto.src=fifthphoto.src.replace("65.jpg","250.jpg");
fifthphoto.parentNode.setAttribute("onmouseover","document.textField.src='"+fifthphoto.src.replace("250.jpg","slssb.jpg")+"'");
}catch(err) {}


document.getElementsByName("textField")[0].src=document.getElementsByName("textField")[0].src.replace("250.jpg","slssb.jpg");
document.getElementsByName("textField")[0].parentNode.height="650px";
document.getElementsByName("textField")[0].parentNode.width="650px";

}

// fix right click blocker
document.oncontextmenu=new Function("return true");