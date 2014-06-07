// ==UserScript==
// @name           Update Gmail Favicon
// @version        1.0
// @description    Makes gmail icon blue for none @gmail mail
// @author         Jo De Boeck
// @include        http:/mail.google.com/*
// @include        https://mail.google.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
var log = function(message, message2){
    console.log("GMAIL FAVICON", message ,message2);
};
var head = $("head");
var icon = $("<link>");
var offset = {1: 8, 2: 0, 3:0};
var imgdata = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4zoOlZ1QAAAodJREFUOE/Fk0lMk1EUhZ9u3LkwMeIUly5+2aggg+CGhQMGJUJBICKooKJxIEyJ8gyBRIwRq4CCulGCmyYqIAKRFmgFWoUWSlsp8Bc6UP7SUrCttQWOD9iYyJ6bfLtzzz15OY+QDZ8CsZ6WVA/R0notvVerpa09Btos+582uYGW1WvohVIVjb/TRw9ldNOYK32U5D+bQMFzHsW1JuSLeVQ1TsLlcmJ+bg03w7PgxHetHRfLjYi/q8PhLA1C4pUITVOB3Hg8jtyHYyisMSGzbBRJJQZcrjDCIvgQDAZXUenmcbZQj7ibWhzMHERUrgabY7rBpfaCXGLixGID2vrnUPfRjiPZaoRlqRF7dRgq/S8odQsIZxfDGPtFP9CscOFWtREkphNcigLk/H0DYq8NQdLlxMrUSKax7XgfQk4pseu0EnvPqLDjZD92JyjRoXQzxTLyxHqQo+3gRD0giUU6hKYPoqHdsWqwImj4asfWBDk2RTGi5dgp+obekXksLS1hMRjA9SfDINGtzKBrzeBA2iDefRHY7jL8fh+EWQGNMgu2n5NjX3ovpGobFtxO+Hw+LC4GkVe1YvB5zeDEbS32sHivm+wI/PHDZJ3GwLgAfyCIgVE3xqweeH4HoB6fhtVmg8/rZgnUIFEt4JJlzChHgy1xClRLJmCy2DBhdbFLXng8bPEfvF4P9LwN5ikeOZX9IJGfmIEUJDR9ACRWivK3I5h1za12wOFwrIsgCDBbzMh4wKJHfACX1AnCpbIyHOvA0/dDcM7wMJuMmOJH12WSN2DG8pP1hEWPkLA3YAm4FFbHyBaaVCSlj94oaEVdFy1/KVufF1Ja+UpKo7ObKAmXUC65k274XyR/ASa1LtZKPQZmAAAAAElFTkSuQmCC';
icon.attr('type', 'image/x-icon');
icon.attr('rel', 'shortcut icon');
icon.attr('id', 'favicon');

icon.attr('href', imgdata);
//debugger;
var gmail = $("head > meta[name='application-name'][content='Gmail']").length > 0;
var setIcon = function(){
    var head = $("head");
    log('Removing icons');
    log(head.find("link[type='image/x-icon']").remove());
    log(head.find("link[rel='icon']").remove());
    head.append(icon);
    
    var canvas = document.createElement('canvas'),
    ctx,
    img = document.createElement('img'),
    link = document.getElementById('favicon').cloneNode(true),
    mailcount = 0;
    
    var title = $('title');
    if (title.length == 0){
        setTimeout(setIcon, 2000);
        return;
    }
        
    var match = title[0].innerHTML.match(/\((\d+)\)/);
    if (match && match.length > 1){
        mailcount = match[1];
    }
    
    
    if (canvas.getContext) {
      canvas.height = canvas.width = 16; // set the size
      ctx = canvas.getContext('2d');
      img.onload = function () { // once the image has loaded
        ctx.drawImage(this, 0, 0);
        ctx.font = 'bold 8px "helvetica", sans-serif';
        ctx.fillStyle = '#000';
        ctx.fillText(mailcount, offset[mailcount.length], 16);
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
      };
     img.src = imgdata;
    }
    setTimeout(setIcon, 2000);

};

if (!gmail){
    $(document).ready(setIcon);
}
