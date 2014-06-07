// ==UserScript==
// @name            Pd Custom Sound
// @namespace       Taki
// @icon            http://static.pardus.at/various/logo/pardus_logo64_cap.png
// @description     if set in the building message/profile, this script plays the sound
// @include         http*://*.pardus.at/building.php
// @include         http*://*.pardus.at/starbase.php
// @include         http*://*.pardus.at/building_message.php*
// @include         http*://*.pardus.at/starbase_message.php*
// @include         http*://*.pardus.at/profile.php*&content=personal*
// @include         http*://*.pardus.at/profile.php*&edit=1*
// @version         1.4
// ==/UserScript==

//
//  HOW TO USE THIS SCRIPT: anywhere in the building message or profile, 
//                 add            [sound]http://yourfile[/sound]           (or https, or file (file is not recommended)).
//  when another user opens the building message screen and has this script installed, the sound will be played for him
//
//  ONLY .wav -files are supported!
//
//  I recommend using [size=0][sound]http://filepath/yourfile.wav[/sound][/size]. 
//  NO ADDITIONAL phpBB TAGS BETWEEN THE [sound][/sound] brackets (doesn't matter if they're outside of them though)
//

// v1.4 - includes profile now (thanks sky night for this idea)
// v1.3 - added header-request to check max filesize of 350kB (about 4 secs, enough IMO)
// v1.2 - added short 'manual' in source
// APPROVED by the devs (11-06-01)
// v1.1 - sound won't get played on the same building twice without having visited another building inbetween. (useful for building attacks)
// v1.0 - with proper formatting ([sound]validURL[/sound]) sound gets played on buliding screens
var editscreen;
var content;

if(window.location.pathname.indexOf("profile.php")>=0){
    if(window.location.pathname.indexOf("=personal")>=0){
        editscreen = false;
    }else if(window.location.pathname.indexOf("edit=1")>=0){
        editscreen = true;
    }
    findAndPlay();
}else{
    var userlocation = document.head.innerHTML.slice(document.head.innerHTML.indexOf("var userloc = ")+14,document.head.innerHTML.indexOf(";",document.head.innerHTML.indexOf("var userloc = ")+14));
    var univ = window.parent.frames[0].location.hostname.split(".")[0];
    editscreen = false;
    if(window.parent.frames[2].location.pathname.indexOf("_message.php")!=-1){ //forces sound to be played each time from the building and starbase message management screen
        GM_setValue(univ+"-lastlocation",-1);
        editscreen = true;
    }
    if(userlocation!=GM_getValue(univ+"-lastlocation",-1)){
        GM_setValue(univ+"-lastlocation",userlocation);
        findAndPlay();
    }
}
function findAndPlay(){
    var otag = document.body.innerHTML.indexOf("[sound]")+7;
    var ctag = document.body.innerHTML.indexOf("[/sound]");
    if(((otag!=6)&&(ctag!=-1))&&(ctag>otag+12)&&(ctag<otag+255)){
        content = document.body.innerHTML.slice(otag,ctag).toLowerCase();
        if(checkContent(content)){
            GM_xmlhttpRequest({
                url: content,
                method: "HEAD",
                onerror: function(error){
                    if(editscreen){
                        alert("\nPlease check the URL of the file!\n\nURL: " + content);
                    }else{
                        GM_log("Error prozessing file, no valid URL provided or file missing?\nURL: " + content);
                    }
                },
                onload: function(response){
                    var fileinfo = response.responseHeaders;
                    var filesize = fileinfo.slice(fileinfo.indexOf("Content-Length: ")+16,fileinfo.indexOf("\n"));
                    if((filesize<=358400)&&(fileinfo.indexOf("Content-Type: audio")!=-1)&&(fileinfo.indexOf("wav\n")!=-1)){
                        var audio = document.createElement("audio");
                        audio.setAttribute("src",content);
                        audio.setAttribute("id","buildingsound");
                        document.body.appendChild(audio);
                        var thisaudio = document.getElementById("buildingsound");
                        thisaudio.play();
                    }else if(editscreen){
                        alert("\nPlease check:\n\n* Correct filepath: (" + content + "\n* Filesize below 350kB\n* Filetype = .wav !");
                    }else if(!editscreen){
                        GM_log("Unproper soundfile detected (path and/or type and/or size)\nPlease check:\n\n* Correct filepath: (" + content + "\n* Filesize below 350kB\n* Filetype = .wav !");
                    }
                }
            });
        }
    }
}

function checkContent(test){ //need a good regex for this. until then, this works.
    if(!(test.indexOf("http://")==0||test.indexOf("https://")==0)){
        return false;
    }
    return true;
}