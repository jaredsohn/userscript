// ==UserScript==
// @name           Add smilies to replies on userscripts.org
// @namespace      http://www.Tenfold.co.nr
// @description    Add smilies to replies on userscripts.org. The buttons add the selected smilie into the reply text area.
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/forums/*/topics/*
// @version        1.0
// ==/UserScript==

var i, reply, smile, grin, frown, tongue, wink;

reply = document.getElementById("reply");

smile = document.createElement("img");
smile.setAttribute("onClick", "document.getElementById(\"post_body\").value += \"<img src='http://i38.tinypic.com/e9ycsh.png'> \"; document.getElementById(\"post_body\").focus();");
smile.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABOUlEQVR42mL8//8/Azpwc3PDENy1axcjAxYAEEAs2DTu2rUMSN5hYPh/BiJxIRdJDtUggABiALkAhF1dXYHUayA+/v//X2EIfsWAwOcY/v+by/Afou4/XB9AACFpBmr8NxlkCxgja4aLYTEEIIAQXgA5938DA1ADBkAWA7t/BYIPEEAI25GcjM0FcP5JVFcABBAT3HYSAKM4gg0QQExw1tu3WJ2MjY8MAAII6oIGMGXiaYzXZmzyAAEECcSLQNtlGBjOnj3LwCiGz4izEPteIkQAAggRjeeQAgwLAIufhEQlcjQCBBBKSmR4AlT1FBhIjJipFqiZgYEVSJ9HFQcIIEZYXgAl1V2duyGiv7G4HqrZfYUrSnIGCCBG5MwET+/5u1FtfwnRiC0vAAQQI6W5ESCAsBpACgAIMADPNADqggEd1wAAAABJRU5ErkJggg==";

grin = document.createElement("img");
grin.setAttribute("onClick", "document.getElementById(\"post_body\").value += \"<img src='http://i33.tinypic.com/zsspiw.png'> \"; document.getElementById(\"post_body\").focus();");
grin.src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABNElEQVR42mL8//8/Azpwc3PDENy1axcjAxYAEEAs2DTu2rUMSN5hYPh/BiJxIRdJDtUggABiALkAhF1dXYHUayA+/v//X2EIfsWAwOcY/v+by/Afou4/XB9AACFpBmr8NxlTIwFDAAKICeEUoHP/NzAwvH3LwCiG6k84XwbINkSVAwgghO1INoOMQ7YZhX8S1RUAAcQEs52R+S3CMa9QLUHmM5oDsTiCDxBALFidSgIACCCoCxrgtiCHMDoGy59ENQAggCAGXHxLkq3/XyLYAAGEiMZzSAGGBYDFT0KiEjkaAQIIJQwYngBVPQWGBSNmqgU7nRVIn0cVBwggRpjfQEl1V+duiOhvLO6GanZf4YqSnAECiBE5M8HTe/5uDD+DNGLLCwABxEhpbgQIIKwGkAIAAgwACMsZyItWxwsAAAAASUVORK5CYII=";

frown = document.createElement("img");
frown.setAttribute("onClick", "document.getElementById(\"post_body\").value += \"<img src='http://i36.tinypic.com/mim5qq.png'> \"; document.getElementById(\"post_body\").focus();");
frown.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABKElEQVR42mL8//8/Azpwc3PDENy1axcjAxYAEEAs2DTu2rUMSN5hYPh/BiJxIRdJDtUggABiALkAhF1dXYHUayA+/v//X2EIfsWAwOcY/v+by/Afou4/XB9AACFpBmr8NxlkC6pGKAaLYzEEIICYEE45w8DIlMsAVIwVgMQZjYDYEFUcIIAQtiM5Gd0VKPyTqK4ACCAmmO2kAEZxBBsggBBeePsWxbnozscFAAII6oIGBnIBQABBDLj4ljjVv6EueokQAgggRDSeQw00dAwLQJA65GgECCCUlMjwBBJVGH4G2swoBhQ/B8TnUaUAAogRlhdASXVX524Up6IAVohm9xWuKMkZIIAYkTMTPL3n70aNhZcQjdjyAkAAMVKaGwECCKsBpACAAAMA7qX1slT+K0UAAAAASUVORK5CYII=";

tongue = document.createElement("img");
tongue.setAttribute("onClick", "document.getElementById(\"post_body\").value += \"<img src='http://i38.tinypic.com/f5dlwi.png'> \"; document.getElementById(\"post_body\").focus();");
tongue.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABOElEQVR42mL8//8/Azpwc3PDENy1axcjAxYAEEAs2DTu2rUMSN5hYPh/BiJxIRdJDtUggABiALkAhF1dXYHUayA+/v//X2EIfsWAwOcY/v+by/Afou4/XB9AACFpBmr8NxlkCxgja4aLYTEEIIAQXgA5938DA1ADBkAWA7t/BYIPEEAI25GcjM0FcP5JVFcABBAT3HYSAKM4gg0QQExw1tu3WJ2MjY8MAAII6oIGMGXiaYzXZmzyAAEECcSLQNtlGBjOnj3LwCiGz4izEPteIkQAAggRjeeQAgwLBoufhEQlcjQCBBATigVPgKqeAlOkqytq0gbygZoZGFiB8udR3QQQQKgp8RzEBpBNYD4DlD6JOyUCBBAjcmaCp/f83aiWAP3svsIVa6YCCCBGSnMjQABhNYAUABBgAPAoFESjzQVRAAAAAElFTkSuQmCC";

wink = document.createElement("img");
wink.setAttribute("onClick", "document.getElementById(\"post_body\").value += \"<img src='http://i36.tinypic.com/2mypvn8.png'> \"; document.getElementById(\"post_body\").focus();");
wink.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABKElEQVR42mL8//8/Azpwc3PDENy1axcjAxYAEEAs2DTu2rUMSN5hYPh/BiJxIRdJDtUggABiALkAhF1dXYHUayA+/v//X2EIfsWAwOcY/v+by/Afou4/XB9AACFpBmr8NxlkC6pGAoYABBATwilnGBiZchmACnEDGQYGRkNUIYAAQtiO5GR0V4D4cLGTqK4ACCAWmO34ALqrGMURbIAAQnjh7VucGvABgACCGPC/gaBCRjHs4gABBDHg4lvirPsNdeFLhBBAACGi8Rz2AEQROwmJSuRoBAgglJTI8ASo8immc0FiDPeBmBXIPo8qBxBAjLC8AEqquzp3ozgVBUA1u69wRUnOAAHEiJyZ4Ok9fzeqC15CNGLLCwABxEhpbgQIIKwGkAIAAgwAqhv5TmDwvCUAAAAASUVORK5CYII=';

reply.appendChild(smile);
reply.appendChild(grin);
reply.appendChild(frown);
reply.appendChild(tongue);
reply.appendChild(wink);