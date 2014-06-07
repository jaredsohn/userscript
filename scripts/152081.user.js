// ==UserScript==
// @name Botoncito para MrNadie
// @description Agrega un botoncito en youtube
// @namespace http://www.forosfiuba.com.ar
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @author Hache
// @version 1.0
// @date 2012-11-09
// @license MIT License
// @icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAohQTFRFAAAA////xtnk/v//scnYZG1x5fD3+Pj40dHSoLbA1tbXxsrMt7Oxubu85N3a4tvV////+/z85evuztjdz9jd6Ovt/f38////9vr8xtXch6q6U4qkU4qiiKq4z9nd/v38////7fT4oLzKqcDK+fj38/r+or/NqcHM////////xNji1N7j////9/z/i7THjLPE////4u70W5i07fL1zN/p2uftz9/n0N/n3+bqXZu21eDm7OrqkrnKe6zD2eDk8unmx9PZrsfT3d3e3NnYor7KirLExM3R8OTfz8/PmbfFh6/Bu8bM0c3KjHlxysjHs8HIeqa5caK4o7rEt77Cv7u6y8PAwsHAtry/rbrAqrnAr7q/uLy+xMLB//7wOnyZO32cCGSOAmOPAmSQB2SOOHyaJXOWBGGNBVyHBVqFBFyHBWKNH3CUPYKiAGKOA2OOAlqFAk56BFB8A0l2AUh1AliEN36eC2eQPHyZaZSnaZKlVH+YCVN/CFF9UXmTaZCjaZWnPn6aB2WPHXGWkLXFQoqqOn2gLmSKBUt5BlSBLnCUO4OlQYmqIHOYUZGuQImpMH6hob/MP3yYPnWRMGODB1aBBlaBMGiIPnmVPnuXnrzKNIGjNYKkQours83Za5+2a5qxVIejCFWBUX+ca561a5+1sczYM4CjNIKlHnSaVJazAGGNAVeDA1uHAlOAAVuIAWKOUZOyIHWbS5CvCWiSC2iSIXacHXCXH2iPGWSMF1eCHWSMJHWaIHacBWWQPYeoBmaQKnugK3SZLWmPKGSLGlqDLGeNM3icMoGkCmiSLX6iIXecBFyIBFuGBGGMGHGZBmaRAmSPBWaRLH2hSYyqMoCiMX+iRYqpAB5Xh4UJYAAAAF50Uk5TAAAAAAAAAAAAAAAAAAAAAAg1cXx8cjkJJ5vp/f7qqDYBRNTgTCfV4j0FmrUOOefzU3X+mnzEfMV4/qdM8vlkDrXKHEHo8lcBYOjzeQUBR8f4/NJYBRdfn8TFp2wiAZs2PxYAAAABYktHRNeQslo/AAAACXBIWXMAAABIAAAASABGyWs+AAABG0lEQVQY0wEQAe/+AAAAAQEQERITFBUWFwEBAAAAAAECGBkaG15eHB0eHyABAAADBCEiX2BhYmJhY2QjJAUBAAYlJmVhZmdoaGlqYWsnKAcAKSpsbW5vcHFyc3RubXUrLAAtLnZ3eHl6e3x9fn+AgS8wADEygoOEhYaHiImKi4OMjTMANI6PkJGSk5SVlpeYmZqbNQA2nI+dnp+goaGio6Slpqc3ADg5qKlhqqusra6vr7CxsjoAOzyztLW2t7i5uru8tL09PgA/QL6/wMHCw8TFxsfIyUFCAAhDRMqvZsvMzGnNr85FRgkACkdISZvPYdDQYdHSSktMCwAADE1OT1DT1NXWUVJTVA0AAAAADgBVVldYWVpbXF0PAADOQmWndNxHYQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMi0xMS0wOVQxMjo1NTo1My0wMzowMOweSL4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTItMTEtMDlUMTI6NTU6NTAtMDM6MDCsq+qfAAAAAElFTkSuQmCC
// ==/UserScript==

//Basado en http://userscripts.org/scripts/show/25105

(function () {
    var DOWNLOAD_LINK_MESSAGE='Copiar pa\'l foro';
    var DOWNLOAD_TOOLTIP_MESSAGE='Para que MrNadie no pida mas un botoncito para embeber videos en el foro';
    var DOWNLOAD_YOUTUBE_SPAN_ID='download-youtube-video';
    var DOWNLOAD_YOUTUBE_FMT_ID='download-youtube-video-fmt';
    var DOWNLOAD_YOUTUBE_BUTTON_ID='download-youtube-video-button';


    var isExperiment=false; // YouTube's experimental interface
    run();    
    
    function run() {

        // download-youtube-video is a container for the download button
        if (document.getElementById(DOWNLOAD_YOUTUBE_SPAN_ID)) return;

        // obtain video ID, temporary ticket, formats map  
        var videoPlayer=document.getElementById('watch-player');
        if (videoPlayer==null) {
            videoPlayer=document.getElementById('watch7-player');
            isExperiment=true;
        }
        
        // find parent container
        if (isExperiment) {
            var parentElement=document.getElementById('watch7-action-buttons');
            var rightElement=document.getElementById('watch7-sentiment-actions');
        } else {
            var parentElement=document.getElementById('watch-actions');
            var rightElement=document.getElementById('watch-actions-right');
        }
        if (parentElement==null) return;

        // generate download code
        var mainSpan=document.createElement('span');
        var spanButton=document.createElement('span');
        spanButton.setAttribute('class', 'yt-uix-button-content');
        spanButton.appendChild(document.createTextNode(DOWNLOAD_LINK_MESSAGE+' '));
        mainSpan.appendChild(spanButton);
        var imgButton=document.createElement('img');
        //imgButton.setAttribute('class', 'yt-uix-button-arrow');
        imgButton.setAttribute('src', '//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif');
        mainSpan.appendChild(imgButton);

        var buttonElement=document.createElement('button');
        buttonElement.setAttribute('id', DOWNLOAD_YOUTUBE_BUTTON_ID);
        if (isExperiment) {
            buttonElement.setAttribute('class', 'yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-hh-text');
            buttonElement.setAttribute('style', 'margin-left:5px; margin-top:4px;');
        } else {
            buttonElement.setAttribute('class', 'yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-tooltip-reverse');
        }
        buttonElement.setAttribute('data-tooltip-text', DOWNLOAD_TOOLTIP_MESSAGE);  

        //buttonElement.setAttribute('onclick', 'copy_bbcode();');
        buttonElement.onclick = function (){
            var url = document.URL;
            var id = url.match("v=(.*)")[1];

            if(!id)
                alert("Emmm. No se.");
            else
                alert("[video width=640 height=480]http://www.youtube.com/v/" + id + "[/video]");

        }

        buttonElement.setAttribute('type', 'button');
        buttonElement.setAttribute('role', 'button');
        buttonElement.appendChild(mainSpan);
        
        // add the button
        var containerSpan=document.createElement('span');
        containerSpan.setAttribute('id', DOWNLOAD_YOUTUBE_SPAN_ID);
        
        var leftmostButton=document.getElementById('watch-flag') || document.getElementById('watch-transcript') || null;
        if (!isExperiment && leftmostButton && leftmostButton.parentNode==parentElement) {
            containerSpan.appendChild(buttonElement);
            containerSpan.appendChild(document.createTextNode(' '));
            parentElement.insertBefore(containerSpan,leftmostButton);
        } else {
            containerSpan.appendChild(document.createTextNode(' '));
            containerSpan.appendChild(buttonElement);
            parentElement.appendChild(containerSpan);
        }   
        
    }
    
})();
