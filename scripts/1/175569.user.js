// ==UserScript==
// @name No Suggestions, I'm Good
// @author Tommy Smith
// @version 1.0
// @description YouTube's video suggestions are often wildly random and the amount of images makes the page take longer to load. A good video can be ruined by an inappropriate thumbnail or image for a video displayed on the side. Here is a userscript for that.
// @include http*://*.youtube.com/watch?*
// @include http*://youtube.com/watch?*
// ==/UserScript==
if (!document.getElementById("watch-more-related-button")) {
} else {
document.getElementById("watch-more-related-button").innerHTML = "<span class='yt-uix-button-content'>Hide suggestions </span>";
document.getElementById("watch-more-related-button").setAttribute("data-button-action", "");
document.getElementById("watch-more-related-button").setAttribute("onclick", "document.getElementById('watch-related').style.display='none';document.getElementById('watch-show-related-button').style.display='inline-block';");
}
if (!document.getElementById("watch-related")) {
} else {
document.getElementById("watch-related").style.display="none";
document.getElementById("watch-related").parentNode.innerHTML+="<button id='watch-show-related-button' class=' yt-uix-button yt-uix-button-default yt-uix-button-size-default' role='button' onclick='document.getElementById(\"watch-show-related-button\").style.display=\"none\";document.getElementById(\"watch-related\").style.display=\"block\";' type='button'><span class='yt-uix-button-content'>Show suggestions anyways </span></button>";
}