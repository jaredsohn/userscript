// ==UserScript==
// @name           FaceFlipper
// @description    Flipps profile pics into a preset picture
// @include        *
// ==/UserScript==

var pic = document.getElementById('profile_pic');
if(pic) {
    var newPic = document.createElement('img');
    newPic.src = 'http://animals.nationalgeographic.com/staticfiles/NGS/Shared/StaticFiles/animals/images/primary/black-spider-monkey.jpg';
    newPic.width = pic.width;
    newPic.height = pic.height;
    pic.parentNode.replaceChild(newPic, pic);
}