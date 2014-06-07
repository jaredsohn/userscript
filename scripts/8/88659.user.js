// ==UserScript==
// @name        missingpersonsforyammer
// @namespace   http://fluidapp.com
// @description Use your own icons for people too lazy to set their own
// @include     *
// @author      Jim Halberg (jimhalberg@gmail.com)
// ==/UserScript==

var myImagesUris = new Array("http://img.photobucket.com/albums/v490/astine/Cutler.jpg",
"http://c0013527.cdn1.cloudfiles.rackspacecloud.com/x2_324c810",
"http://static.myextralife.com/wp-content/uploads/2008/03/mr-t-is-here.png",
"http://redriverautographs.files.wordpress.com/2009/01/rock-bull-dwayne-the-rock-johnson-775398_1178_1319.jpg",
"http://www.nationalsportsbeat.com/images/logos/nfl/Green_Bay_Packers_Helmet.jpg",
"http://static.tvtropes.org/pmwiki/pub/images/volcano.jpg");
var use = 0;
var assigned = new Array();

(function () {
    setTimeout(updateMissingPersons, 1000);
    window.setInterval(updateMissingPersons, 5000);
})();

function assignImage(userHref, anImg){
    if(use >= myImagesUris.length){
        use = 0;
    }
    anImg.src = myImagesUris[use];
    assigned[userHref] = anImg.src;
    use++;
}

function updateMissingPersons(){
    if (!document.getElementsByClassName){
        alert('UserScript:: "Fluid Badge for Yammer Unread Messages" thinks you should try a different user-agent.'); // yep, no effort to support others
    } 
    else{
        // replace the ones in face-item
        faceItems = document.getElementById('online-now').getElementsByClassName('yj-face-item');
        // alert(faceItems.length);
        for(var j = 0; j < faceItems.length; j++){
            images = faceItems[j].getElementsByClassName('yj-thumb');
            if(images[0].src.match(/.+no_photo.+/)){
                srcToUse = assigned[faceItems[j].getElementsByClassName('yj-face')[0].href];
                if(srcToUse){
                    images[0].src = srcToUse;
                }
                else{
                    assignImage(faceItems[j].getElementsByClassName('yj-face')[0].href, images[0]);
                }
                images[0].height = images[0].width;
            }
        }
        
        // look for those outside of face-item to sync
        need = document.getElementsByClassName('yj-avatar-thumb');
        for(var x = 0; x < need.length; x++){
            if(need[x].src.match(/.+no_photo.+/)){
                srcToUse = assigned[need[x].parentNode.href];
                if(srcToUse){
                  need[x].src = srcToUse;  
                }
                else{
                  assignImage(need[x].parentNode.href, need[x]);
                }
                need[x].width = 50;
                need[x].height = 50;
            }
        }
    }
}