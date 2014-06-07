// ==UserScript==
// @name        Simplify Friend Updates
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Removes duplicate friend updates and condenses them based on the type of update.
// @include     http://www.onverse.com/profile/friends.php
// @grant        none
// @version     1.2
// ==/UserScript==
var sheet = document.createElement('style');
sheet.innerHTML = 'acronym { border-bottom: 1px black dotted; }';
document.body.appendChild(sheet);
function simplify() {
    var all = document.getElementById('moreDropGroup').getElementsByClassName('commentCell');
    for(var i=0; i<all.length; i++) {
        var numPhotos = 0;
        var firPhoto;
        var numVideos = 0;
        var firVideo;
        var numBlogs = 0;
        var firBlog;
        var otherBlogs;
        var numStatuses = 0;
        var firStatus;
        var otherStatuses;
        var numFriends = 0;
        var firFriend;
        var otherFriends;
        var numProfiles = 0;
        var firProfile;
        for(var cur=1; cur<all[i].childNodes.length; cur++) {
            var tmpstr = all[i].childNodes[cur].innerHTML;
            var space = tmpstr.indexOf(' ');
            space = tmpstr.indexOf(' ',space+1);
            space = tmpstr.indexOf(' ',space+1);
            var result = tmpstr.substring(space+1);
            if(result.indexOf(' ') != -1)
                result = result.substring(0, result.indexOf(' '));
            switch(result) {
                case "photos.":
                    numPhotos++;
                    if(numPhotos == 1) {
                        firPhoto = all[i].childNodes[cur];
                    }
                    else {
                        firPhoto.innerHTML = firPhoto.innerHTML.substring(0,firPhoto.innerHTML.indexOf('photos')+6) + ' (' + numPhotos + ').';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
                case "videos.":
                    numVideos++;
                    if(numVideos == 1) {
                        firVideo = all[i].childNodes[cur];
                    }
                    else {
                        firVideo.innerHTML = firVideo.innerHTML.substring(0,firVideo.innerHTML.indexOf('videos')+6) + ' (' + numVideos + ').';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
                case "new":
                    numBlogs++;
                    if(numBlogs == 1) {
                        firBlog = all[i].childNodes[cur];
                    }
                    else {
                        var curBlog = tmpstr.indexOf(' ')+1;
                        curBlog = tmpstr.indexOf(' ', curBlog)+1;
                        curBlog = tmpstr.indexOf(' ', curBlog)+1;
                        curBlog = tmpstr.indexOf(' ', curBlog)+1;
                        curBlog = tmpstr.indexOf(' ', curBlog)+1;
                        curBlog = tmpstr.indexOf(' ', curBlog)+1;
                        curBlog = tmpstr.substring(curBlog, tmpstr.length-1);
                        if(numBlogs == 2) {
                            otherBlogs = curBlog.replace(/"/g, '&quot;').replace('<wbr>', '');
                        }
                        else
                            otherBlogs += '&#10;' + curBlog.replace(/"/g, '&quot;').replace('<wbr>', '');
                        var b;
                        if((b = firBlog.innerHTML.lastIndexOf(' and <acronym title=')) != -1 && numBlogs > 2)
                            firBlog.innerHTML = firBlog.innerHTML.substring(0, b) + ' and <acronym title ="' + otherBlogs + '">' + String(numBlogs-1) + ' others</acronym>.';
                        else
                            firBlog.innerHTML = firBlog.innerHTML.substring(0,firBlog.innerHTML.length-1) + ' and <acronym title="' + otherBlogs + '">1 other</acronym>.';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
                case "status":
                    numStatuses++;
                    if(numStatuses == 1) {
                        firStatus = all[i].childNodes[cur];
                    }
                    else {
                        var curStatus = tmpstr.indexOf(' ')+1;
                        curStatus = tmpstr.indexOf(' ', curStatus)+1;
                        curStatus = tmpstr.indexOf(' ', curStatus)+1;
                        curStatus = tmpstr.indexOf(' ', curStatus)+1;
                        curStatus = tmpstr.indexOf(' ', curStatus)+1;
                        curStatus = tmpstr.substring(curStatus, tmpstr.length-1);
                        if(numStatuses == 2) {
                            otherStatuses = curStatus.replace(/"/g, '&quot;').replace('<wbr>', '');
                        }
                        else
                            otherStatuses += '&#10;' + curStatus.replace(/"/g, '&quot;').replace('<wbr>', '');
                        var b;
                        if((b = firStatus.innerHTML.lastIndexOf(' and <acronym title=')) != -1 && numStatuses > 2)
                            firStatus.innerHTML = firStatus.innerHTML.substring(0, b) + ' and <acronym title ="' + otherStatuses + '">' + String(numStatuses-1) + ' others</acronym>.';
                        else
                            firStatus.innerHTML = firStatus.innerHTML.substring(0,firStatus.innerHTML.length-1) + ' and <acronym title="' + otherStatuses + '">1 other</acronym>.';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
                case "friends":
                    numFriends++;
                    if(numFriends == 1) {
                        firFriend = all[i].childNodes[cur];
                    }
                    else {
                        var curFriend = tmpstr.indexOf(' ')+1;
                        curFriend = tmpstr.indexOf(' ', curFriend)+1;
                        curFriend = tmpstr.indexOf(' ', curFriend)+1;
                        curFriend = tmpstr.indexOf(' ', curFriend)+1;
                        curFriend = tmpstr.indexOf(' ', curFriend)+1;
                        curFriend = tmpstr.substring(curFriend);
                        if(numFriends == 2) {
                            otherFriends = curFriend.replace(/"/g, '&quot;').replace('<wbr>', '');
                        }
                        else
                            otherFriends += '&#10;' + curFriend.replace(/"/g, '&quot;').replace('<wbr>', '');
                        var b;
                        if((b = firFriend.innerHTML.lastIndexOf(' and <acronym title=')) != -1 && numFriends > 2)
                            firFriend.innerHTML = firFriend.innerHTML.substring(0, b) + ' and <acronym title ="' + otherFriends + '">' + String(numFriends-1) + ' others</acronym>.';
                        else
                            firFriend.innerHTML = firFriend.innerHTML + ' and <acronym title="' + otherFriends + '">1 other</acronym>.';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
                case "profile.":
                    numProfiles++;
                    if(numProfiles == 1) {
                        firProfile = all[i].childNodes[cur];
                    }
                    else {
                        firProfile.innerHTML = firProfile.innerHTML.substring(0,firProfile.innerHTML.indexOf('profile')+7) + ' (' + numProfiles + ').';
                        all[i].removeChild(all[i].childNodes[cur]);
                        cur--;
                    }
                    break;
            }
        }
    }
}
document.getElementById('moreDropGroup_ld').addEventListener("DOMAttrModified",function(event){ if(event.newValue == "hidden") simplify(); }, false);