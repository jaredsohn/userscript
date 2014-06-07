	

    // ==UserScript==
    // @name       Retard Alert
    // @namespace  http://ecb2.biz
    // @version    0.1
    // @description  You're retarded
    // @match      http://*.se7ensins.com/*
    // @copyright  2014+, Lord of the Lords aka ECB2
    // ==/UserScript==
     
    function censorRetards(){
        var retards = new Array("Droxsico","Skyline xL","Dat Boxer v2","PREMIUM SERVER"); //Add more retards here
        var lostcause = new Array("PREMIUM SERVER","Skyline xL"); //Add more
            var all = document.getElementsByTagName("*");
            var detected = false;
            for (var i=0, max=all.length; i < max; i++) {
            if (all[i].dataset.author != null && lostcause.indexOf(all[i].dataset.author) != -1)
            {
                all[i].style.display = "none";
            }
                    else if (all[i].dataset.author != null && retards.indexOf(all[i].dataset.author) != -1)
                     {
                 
                            all[i].style.backgroundImage = "url(http://i.imgur.com/aMTEjhD.png)";
                 var all2 = all[i].getElementsByClassName("messageInfo");
                 for (var j=0; j < all2.length; j++)
                 {
                    all2[j].style.backgroundImage = "url(http://i.imgur.com/aMTEjhD.png)";  
                 }
                 all2 = all[i].getElementsByClassName("avatarHolder");
                 for (var j=0; j < all2.length; j++)
                 {
                    var imgs = all2[j].getElementsByTagName('img');
                    if (imgs.length > 0)
                        imgs[0].src = "http://i.imgur.com/aMTEjhD.png";
                 }
                 all2 = all[i].getElementsByClassName("avatarContainer");
                 for (var j=0; j < all2.length; j++)
                 {
                    var imgs = all2[j].getElementsByTagName('img');
                    if (imgs.length > 0)
                        imgs[0].src = "http://i.imgur.com/aMTEjhD.png";
                 }
                 var img = all[i].getElementsByTagName('img');
                 if (img.length > 0)
                 {
                    if (retards.indexOf(img[0].alt) != -1)
                        img[0].src = "http://i.imgur.com/aMTEjhD.png";
                 }
                            detected = true;
                     }
            }
            if(detected)
            {
        var audioElement = document.createElement('audio');
        audioElement.autoplay = true;
        audioElement.controls = false;
        audioElement.loop = false;
        audioElement.preload = 'auto';
        audioElement.autobuffer = true;
        var source = document.createElement('source');
        source.type= "audio/mpeg";
        source.src = "http://www.free-ringtones.cc/files/c/1/c1a16fb88bdf398527017410d63b9675.mp3";
        audioElement.appendChild(source);
        audioElement.load();
            document.body.appendChild(audioElement);
            }
    }
    window.onload = censorRetards;

