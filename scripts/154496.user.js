// ==UserScript==
// @name       Webtext sentiment analyzer
// @namespace  http://musicmetric.com
// @version    0.1
// @description  Shows you the overall "sentiment score" of the webpage you're visiting, as a little hover, based the website's text content. Uses musicmetric's sentiment analyzer to make the calculation
// @match      http://*/*
// @copyright  2012+, Mar Bartolome
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// EDIT ME: put your music metric api key here
var mmapitoken = "EDIT ME";
retrieveTextContent();
function retrieveTextContent(){
    $.post('http://www.datasciencetoolkit.org/html2text',
       document.getElementsByTagName('body')[0].innerHTML,
          function(data){
        sentimentAnalyze(data.text);
    }, "json"
       );
}
function sentimentAnalyze(text){
    $.post('http://api.semetric.com/sentiment?token='+mmapitoken,
       text,
       function(data){
            displayBox(data.response.score);
        }, "json"
       );
}
// display hover box
function displayBox(sentiment){
    
    sentimentbox = document.createElement("p");
    sentimentbox.style.position = 'fixed';
    sentimentbox.style.bottom = '10px';
    sentimentbox.style.right = '10px';
    sentimentbox.style.padding = '20px';
    sentimentbox.style.backgroundColor = '#C4F296' ;
    sentimentbox.style.opacity = '0.9';
    sentimentbox.id = 'sentimentbox';
    
    //sentiment score
    text = document.createElement("p");
    text.innerHTML = 'Sentiment score: '+sentiment;
    sentimentbox.appendChild(text);
    
    // sentiment gauge
//    gaugediv = document.createElement("div");
//    gaugediv.style.width = "100px";
//    gaugediv.style.height = "50px";
//    gaugediv.style.backgroundColor = '#980000' ; //just to see it
//    gaugebase = document.createElement("img");
//    gaugebase.src = 'http://artist.musicmetric.com/img/sentiment-base.png';
//    gaugebase.style.position = "absolute"; //note: absolute means relative, it would seem...
//    gaugebase.style.width = "100px";
//    gaugediv.appendChild(gaugebase);
//    gaugebar =  document.createElement("img");
//    gaugebar.src = 'http://artist.musicmetric.com/img/sentiment-pointer.png';
//    gaugebar.style.width = "8px";
//    gaugebarcanvas = document.createElement("canvas");
//    ctx = gaugebarcanvas.getContext("2d");
//    ctx.drawImage(gaugebar,0,0);
//    ctx.rotate((Math.pi/180)*45*(sentiment-3));
//    gaugebarcanvas.style.position = "absolute"; 
//    gaugebarcanvas.style.left = "45%";
//    gaugediv.appendChild(gaugebarcanvas);
//    sentimentbox.appendChild(gaugediv);
    
    
    // help text
    closeText = document.createElement("p");
    closeText.innerHTML = '[Click to close]';
    closeText.style.textAlign = 'center';
    closeText.style.fontSize = 'smaller';
    sentimentbox.appendChild(closeText);
    
    //cat
    cat = document.createElement("img");
    cat.src = 'http://s8.postimage.org/i41s3am8h/cat.gif';
    cat.style.display = 'none';
    if (sentiment == 5) {
        cat.style.display = 'inline';
    }
    cat.style.cssFloat = 'right';
    sentimentbox.appendChild(cat);
    
    // onclick closing
    sentimentbox.onclick=closeBox;
        
    //add to body
    body = document.getElementsByTagName('body')[0];
    body.appendChild(sentimentbox);
}

function closeBox(){
    sentimentbox = document.getElementById('sentimentbox');
    sentimentbox.style.display = 'none';
}
