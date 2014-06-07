// ==UserScript==
// @name            share selected image to imgur
// @namespace       http://userscripts.org/users/652
// @description     Share picture from current page on imgur by CTRL-clicking on it
// @version         1.4
// @author          Pirlouwi
// @license         GPL
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/show/429856
// @download       http://userscripts.org/scripts/show/429856
// @include         *
// ==/UserScript==

var done=false;

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function anonymous_send_imgur(e) {       
    var client_id="YOUR_IMGUR_CLIENT_ID";
    var client_key="YOUR_IMGUR_CLIENT_KEY";
    
    var node = e.target;
    
    while (node && node.nodeName != "IMG") node = node.parentNode;
    
    if (node && node.hasAttribute("src")) {      
        var file = getBase64Image(node);
        var fd = new FormData();
        fd.append("image", file);
        fd.append("key", client_key);
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/upload.json");
        xhr.setRequestHeader("Authorization", "Client-ID " + client_id);
        xhr.onload = function() {
            res=JSON.parse(xhr.responseText);
            if (res.status != 200){
                alert(res.data.error);
            } else {
                url = res.data.link;
                window.prompt("Here is the imgur URL:", url);
            }
        }
        xhr.send(fd);           
    }
}

if (done == true) return;
done = true;
$('img').on('click', function(e){
    if (e.ctrlKey)
    {
        if(confirm("Should this picture be published on imgur now?") == true){
            anonymous_send_imgur(e);
        }
    }
})