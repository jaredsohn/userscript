// ==UserScript==
// @name        Ultoo Turbo Fast in 2G & 3G By SURAJ 
//@description works on sms.ultoo.com or ultoo.com or ultoo.in with Faster autoplay option
// @namespace  ultoo
// @include     http://*ultoo.*

// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     may 2013
// @author      Harsha
// @updateURL		http://userscripts.org/scripts/source/168118.meta.js
// @downloadURL		http://userscripts.org/scripts/source/168118.user.js
// @icon           http://t2.gstatic.com/images?q=tbn:ANd9GcQ2BYrq5RRPcbW_X2jC4PVwNHFoYT64C0o6XjaBn7um9wPZLgljow
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

/********************Globals*******************/

loc=window.location.href;
host=window.location.hostname;
host="http://"+ host;
zx="?zxcoiesesscd=";

captcha={"iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAiElEQVQ4jWP8//8/AymAiSTVw1TDgTsMjAUMCk3o6hSaGBgL8Npw4A4K++E7vE5yUGFYcArBXXCKId4Mr4YEM4aFSBoO3GFIwK/BQYVBXghqyYJTDA4qCCmcfkgwQ2iAG09Aw8E7DA/eMTx4R5wNCkIM9ioMDlNQjMenAWLJw3foGhhHkzcRAAAjVinmz8Q7dAAAAABJRU5ErkJgggA=":"M","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAqElEQVQ4je2SsRHDIAxFPxmBBZxCM9BaZcbQCBnBQ2QAKs+QErfMoMJZgBVIYRLOjrmL21zU8cVD/58wOWccqdOh2z8K8A0y1qOMMFcEbQPiVu2g6KkqQT8nEB4JcyptAMMFPraBs0VnK8C0fWInNL88BIU4ANXVtAssMeaEScFUFB8RFJ1tTJi0xN0o4hp76AnDvfh5B/MRTA1gCcpUFXFFMf/v/UU9AW4MSUN559blAAAAAElFTkSuQmC=":"W","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAl0lEQVQ4jWP8//8/AymAiSTVw0QDC1bRB+8YGnYwHLjD8PAdg7wQQ4MHQ4IZTO4/Bth/+7984//5J1G49duhXCwa7CcjpCFg/kncGu6//c+Q///+W0xzoAC7pxWESAylB++I1qAgxGCvwrDgFIrgglMMjAV4Q4khH2coMWJNrQfuMDTsYDh4h4GBAT0esGvAAwZh4qO9BgD8gMz5ilhyWwAAAABJRU5ErkJgggA=":"C","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAO0lEQVQ4jWP8//8/AymAiSTVw1TDgTsMjAX4RGjvJBasomiuIqzh/wQE+8AdBscpFDhpEGpgHE3eRAAADjYOsrtX9r4AAAAASUVORK5CYII=":"H","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAArUlEQVQ4je2SsQ3CMBBFvxETeAF7CloYJQNYSjYgZgIk6KHKCqSLW1ghSDEDxCt8GjcOCJwW8as7/XvS/dMJkpijxazp3wV8wOYIUUHvULcZQNFAS3APZ+DuON9Sm6mGkSg5jLHteiqbDHzP8AgfV9ISSsbVfcjL4Ax8gKhQNChWUDJxl6+AD3Am1nULnQLT0CSV5fYSD6Asuz5x3wDDyPWBKKksT9epK/7vnaEn7E+k0Ron5K4AAAAASUVORK5CYII=":"9","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAm0lEQVQ4jWP8//8/AymAiSTVw11DwjIGxgKGA3eI1nDgDkO8GcOCUxgS/7GB+Sf/20/+f//tf4b8//ffokhht2HBKYYEMwYFIQZ7FQxLMI3ff/s/Qz6CLd+IIsuC1XgGBgaFJij34TuohThtYMj/v//2//tvoah+O4ol6Brmn0R3A8Tr+2/j8DSK7QwMDAxQrzfsgHIZR5M3EQAAv1XJgKOGNVkAAAAASUVORK5CYII=":"A","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAxUlEQVQ4jd2SvRGCQBCFPxwroAEMqOFSCemCK8AZS/CsQXNNtAXJwFBbgAAbuBbWQETg/BkCZxxfdLO7b+e9t+eJCEMwGjT9J4SxW6osek9luVgCHxOjVastDoKlLA71OyskWMrm9Oj2Jd0WNyujEBN3Bjz3cNGayqIVUUgU9gU/IQAmJS85lgCJwsRM/LeEBnmJSQHy2QvTyU6mq04lK4T5a9NacSwxKZWtM9ieSVqxPpGU3wm3O2jVCeqDBxc/+Pm+T7gCaSqVfzNBUgwAAAAASUVORK5CYII=":"S","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAjElEQVQ4jWP8//8/AymAiSTVw1TDgTsMjAUoIg5TGBSaGB68g3JZ8Bj24B1DwjIGBgaGB3VEOAmu+kAOXifBVTtMwaIapwaHKQwKQgwH7yCcTkBDgwfDgRyGeDOoPYQ1JJgxMDAwLIiC2kZYAxwcyGE4eIehYQfRGhSEGOZHMTTuYDhwByrCOJq8iQAAIjcpqb59NRcAAAAASUVORK5CYII=":"K","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAoklEQVQ4jWP8//8/AymAiSTVw0QDC6bQgTsMjlMQ3HgzhgVRhDTYqzAcyCHaSQ/eMTio4HQSI2bEKTQxKAgxPHjHwMDA4KCC4h7sNigIMSSYMTyoYziQw/DgHUPCMlTp/3jB/tv/GfJRRNBtePCOoWEHTg9gt0G+8X/99v////+///a//WQoGw6waNh/+7/95P8M+QidyABLKOEHgzDx0V4DACabo5Km4BfOAAAAAElFTkSuQmC=":"5","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAmklEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0GxykoIvYqDAuiGBSEYPz/qGD/7f8M+Sgi8Uv/209GcAk7KcGM4eAdov3w4B3DglMM9iq4/QABjAVQhrwQg4MKw4IoQjb8n8DwfwLD/hwGBgYGBxUkH+N3koMKQ4MHQ+IyhgPE+yHBjCHejKFhB9EaGBgYGjwYDt5B6GEcTd5EAABSqExY7kEylQAAAABJRU5ErkJgggA=":"R","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAArklEQVQ4jd2SwQ2CMBiFXx3BBcoUXDsKDGBSNmjqCgyAF2bgaK+4giToAGWF50FNRahK4kXf7e/rS/u9VpDEEq0W7f7TwGmAKLA7hBXXQRRw3X3mRFVLaPaeJHtPaVm1wZ0JkMxqSsveU5XM6pElYg+XbAEgWcNtPoPOU5wH5OnEmL3S/khomibAvGK4gpomwLwJqJKqDKO0I+7ngGlu/TweCB2ajbYU0w98vu8HLiNbGJel5rWCAAAAAElFTkSuQmC=":"X","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAfUlEQVQ4jWP8//8/AymAiSTVw0QDC6YQYwEWdf8nwFl4wf23/+Ub/9dvR4gQ0GA/+X/8UhQRfH5o2MHAwMCwIArNcTjA/JP/5Rv/33+LLo5dA8TpmKpxarCf/H//bew2Y9EQv/T//JO4XPqf8T9GasUfD1g04AeDMPHRXgMAej0isILd32EAAAAASUVORK5CYII=":"Z","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAbUlEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0GxykoIvYqDAuiGBSEYPz/qGD/7f8M+Sgi8Uv/209GcAk7KcGM4eAdov3w4B3DglMM9iq4/QABjAVQhrwQg4MKw4IoQhr+T8Bp5yCMOMbR5E0EAACtoj873uMHNwAAAABJRU5ErkJgggA=":"P","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAbUlEQVQ4jWP8//8/AymAiSTVI0DDgTsMjAVEa3jwjiFhGSk2NOxgSDAjWsOBOwwP3jE4qBCnAeKYBVHYbcaioWEHQ4MHg4IQdg2MmGkJM2QYGBj+T4CzcIP9t/8z5KMLkhxxWJyEHwyxxEcdDQA/Hkl3FGdzjAAAAABJRU5ErkJgggA=":"4","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAiklEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0GxykoIvYqDAuiGBSEYPz/qGD/7f8M+Sgi9dv/yzf+v/8WyiXspAYPBgcVhoYdpPghwYzhwB1SNDAwMDx8R6IGeZinidKw4BSDgwqUjR6saODBO4YFpxgO3GE4kINXA2MBwiUOKgwHchDxwDiavIkAAKUARnTve8e9AAAAAElFTkSuQmC=":"D","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAh0lEQVQ4jd2RsQ2DQBAEFzcCpbgTN4D0JRiogZzINUD2pNTwATQALQwBSAhzDpAcIC7bvR2ddBsBOjOPU+mbAlmjpNAwbc4wKSmUNauMjm99lpLUprYUh+lH5Kg6gKojzunHbWsAS04OH4hzfNitbAB4fZDjXX/7PwEfkDP8CxZn9PDnC3cAZqCOxZuTrOTLAAAAAElFTkSuQmC=":"Y","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAR0lEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0Gxynoiu7XMSgI4dAAAf8nUM9JFPsBAhgLEOx6D4YGD0IaBtQPJGtgHE3eRAAAv3oPSZ5kO98AAAAASUVORK5CYII=":"F","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAVUlEQVQ4jWP8//8/AymAiSTVI0DDgTsMjAU0tWGoanjwjiFhGSkaFIQYFp5iWHCKgYGB4cAdBnsVDB3/McD8k//lG/8z5P+3n/z//lt0WcbR5E0EAAC3szr3GnEfLwAAAABJRU5ErkJgggA=":"J","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAoklEQVQ4jWP8//8/AymAiSTVw1dDww4GhSYGxgIGhykMB+5gSP9HBfXb/8s3/r//FsFGAyzoxnswNHjgdRO6Cf//////f/7J/wz5/xnyoVYhA0Y8Me0whYGBgeFADhE2QMD+2/8Z8tEF0UMpYRlDww4EV14I3Vp0DQ4qDAtOMTx4x8DAwNCwgyHBDF0DFj807GBYcAqmOYoIDfjB0Eh8VNYAALPepVQHOhV0AAAAAElFTkSuQmC=":"3","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAZElEQVQ4jWP8//8/AymAiSTVw1TDgTsMjAUMC06hixCwIXEZw4N3pDgp3owhYRkpGho8GB68Q3EYAQ0KQgwLorA7DGcoOahgdxi+YF0QhcVhBOJhQRTDQpI0QByGDBhHkzcRAADLfyGnI0jnYwAAAABJRU5ErkJgggA=":"N","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAbUlEQVQ4jWP8//8/AymAiSTVw0QDC6YQYwG6yP8JeDUgSycsY1AQQpPGDfbf/i/fiC6IT4P95P/zT6IL4vT0gTsMD94xJJihi+PT4KCCRRynhgWnsBiPT8PDdxjhg0fDg3cMDAzYNTCOJm8iAABQF3MHfS4OyAAAAABJRU5ErkJgggA=":"7","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAuUlEQVQ4jd2SwQ2CQBREZ40V2AAcqIGr1OEFCjDBCnShBS3Ai7QgN+gDkl0KYFsYL0Sz64ZI4kXntNn5L38m+YIklmi1aPqvAVkjLCEOSC7Qxvb4ptOdQUE1kuT2zPRmuR4gKNh001uNE/nU2gmjDQYDbRCWAJBEuO4+6ND20Ee0e2iDrJrtoEYif8VoOiK3BtwN4cbdFtg/nkhpDFlPfWSNJLJc4b3WrELbYzBIY7e0H5jRzxzfN4EHL1Ws7UK2zWoAAAAASUVORK5CYII=":"6","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAwElEQVQ4jd1SsQ2DMBA8okzAAqbwDG7xHDR4E8IMSR83zEBKUoYZkIAB8AqXAqQo5IlEF+W6P/3p7/4/Iok9OOzq/hPBUWSHgNMNTYcxQMVwBs4giQEA/EA/UZUsavbTUuYVVbmUgiA9s6gFMq9Icp1hCLh3cGZt0hk03Xboxe47M4ZtwRAERsWSIImRavj21Tc78S2sBsS1+gz2svie9zsP9BkAROK3ru5gNZoOVsNn0h22cH2QpDzhC37wW3cLnqBMvDMhEBlMAAAAAElFTkSuQmC=":"Q","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAm0lEQVQ4jWP8//8/AymAiSTVw1pDwjIGxgIGxgIGhykMD94R0pCwjOHBO4b7dQz/JzAoCDEkLCPChgYPBgUhBgYGhgQzhoN3UKRYMFUviEKwD9xhsFdBlf6PG8w/+Z8h///+2yiCODXUb8eiGqeG+KX/5Rv/33+LRQqLhvrtOFX///+f8T9GamUsQA+G/xOQZDE14AdDJvFRUwMApxLR2+jnO1oAAAAASUVORK5CYII=":"2","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAfklEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0GxykIrrwQg4MKQ4MHg4IQTOg/Kth/+z9DPopI/NL/9pMRXMJOSjBjOHiHaD88eMew4BRDvBluP0AAYwEK934dEge/H+6/JdEPCkIk+oGBgWHBKQZ7FaL9AImHBVFIUqPJmwgAAMYXb2G0acbKAAAAAElFTkSuQmC=":"B","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAS0lEQVQ4jWP8//8/AymAiSTVw0QDCxr/wB0GxynoiuLNGBZE4dAAAf8nUM9JFPsBAhgLULj7cxgcVPBqGPx+kBdieFAHkxpN3kQAACIBEUuG3ejmAAAAAElFTkSuQmC=":"E","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAApklEQVQ4jeVRuw3CMBQ8M4IXcIrMQBuzBk0YACnZgGQG3EMDK5COUDIDluIF4hWOxkIyH0UWHVx1p3cn3ekJkkjBLMn9u4HeQhuIGqKGNnA+PjPGMBIVd9cgNyeqNjIkVxKvj+stFiZwJdGvkcnPlUiqluUh1Cu2gT/wfsMwBnm+EdV3G54DmUSRo+kAwHk0Hcr51GjnsTriYqEkdI79ciqQVukvAneHIKPOQru/zwAAAABJRU5ErkJgggA=":"8","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAvUlEQVQ4jd2SsQ2DMBBFP1EmYAEoPAOtky5bhA0YAdggEulDkxlIB228gpGAAWCFnwbJCtiRKCJF+dXp656t+3ceSWzRblP3nwB7q9tPyB5oWgwTAEiBOEIcAQC4UjcyyJlW7MbZqTWDnLcnSVoAWTCtlmatHUA3Eol5ey37DKE/F02L49X4vKxmcP1QayIhyWWsoQ8pUCp3rq6Uzve3lGTBICdJj7Zr7SeUCqUyezgIZCcAsAMf9IPH933gBScl+wdBlOKXAAAAAElFTkSuQmC=":"G","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAYklEQVQ4jWP8//8/AymAiSTVw1TDgTsMjAX4RIaAH0jWoCBElg0P3qGw5ZFMwWKDvQpDww6ongfvGBacYkgwQyhgxEytD94xNOxgOHCH4eE7BnkhhgQzhgYPvBrI8cMw1wAA+WwgoaHBB7sAAAAASUVORK5CYII=":"U","iVBORw0KGgoAAAANSUhEUgAAABAAAAAVCAIAAADAXPmFAAAAmElEQVQ4jWP8//8/AymAiSTVw1SDwxSGhGXoilAE/6OC+Sf/M+SjiNx/+58h///9t1Auug0JZgzyQgwLTiFEFpxisFdhUBDC7YcEM3QNCWZI0v8xALIb9t/+L9+IIovFBgUhhniYJejGY7UBbjCadyGAEVfiU2hicFBhYGBgWBCFIo4z4hLMGBZiuoeBAacNuMAQSHzU1wAAUV+hs30IpXQAAAAASUVORK5CYII=":"V"};

Base64 = {

            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

            encodeBinary: function (input) {
                var output = "";
                var bytebuffer;
                var encodedCharIndexes = new Array(4);
                var inx = 0;
                var paddingBytes = 0;

                while (inx < input.length) {
                    // Fill byte buffer array
                    bytebuffer = new Array(3);
                    for (jnx = 0; jnx < bytebuffer.length; jnx++)
                        if (inx < input.length)
                            bytebuffer[jnx] = input.charCodeAt(inx++) & 0xff; // throw away high-order byte, as documented at: https://developer.mozilla.org/En/Using_XMLHttpRequest#Handling_binary_data
                        else
                            bytebuffer[jnx] = 0;

                    // Get each encoded character, 6 bits at a time
                    // index 1: first 6 bits
                    encodedCharIndexes[0] = bytebuffer[0] >> 2;
                    // index 2: second 6 bits (2 least significant bits from input byte 1 + 4 most significant bits from byte 2)
                    encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
                    // index 3: third 6 bits (4 least significant bits from input byte 2 + 2 most significant bits from byte 3)
                    encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
                    // index 3: forth 6 bits (6 least significant bits from input byte 3)
                    encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

                    // Determine whether padding happened, and adjust accordingly
                    paddingBytes = inx - (input.length - 1);
                    switch (paddingBytes) {
                        case 2:
                            // Set last 2 characters to padding char
                            encodedCharIndexes[3] = 64;
                            encodedCharIndexes[2] = 64;
                            break;
                        case 1:
                            // Set last character to padding char
                            encodedCharIndexes[3] = 64;
                            break;
                        default:
                            break; // No padding - proceed
                    }
                    // Now we will grab each appropriate character out of our keystring
                    // based on our index array and append it to the output string
                    for (jnx = 0; jnx < encodedCharIndexes.length; jnx++)
                        output += this._keyStr.charAt(encodedCharIndexes[jnx]);
                }
                return output;
            }
        };

/********************Functions*******************/

function str() {
    var set="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var txt='';
    for(i=0;i<10;i++){
        txt+=set.charAt(Math.floor(Math.random() * set.length));
    }
    return txt;
}

function getData(){
    http=new XMLHttpRequest();
    http.open("GET","img_single.php",false);
    http.overrideMimeType('text/plain;charset=x-user-defined');
    http.send();
    data=Base64.encodeBinary(http.responseText);
    return data;
}

function redirect(url) {
    url=host+"/"+url+"?zxcoiesesscd=";
    setTimeout("window.location.href=\""+url+"\";",sessionStorage.getItem("delay"));
}

function $(selector){
    if(selector.charAt(0)=="#"){
        return document.getElementById(selector.substr(1));
    }
    else if(selector.charAt(0)=="."){
        return document.getElementsByClassName(selector.substr(1));
    }
    else{
        return document.getElementsByTagName(selector);
    }
}

function remove(element) {
    if (element!=null) {
        element.parentNode.removeChild(element);
    }
}

function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}


function insertPopup(title,ok,cancel) {
    style=document.createElement("style");
    style.innerHTML=hereDoc(function(){/*!
        body { font-family: Tahoma, Geneva, sans-serif;}
        .popupBox {
        	display: block;
        	position:fixed;
        	width: 40%;
        	left: 30%;
        	top:15%;
        	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA1BMVEUAAACnej3aAAAAAXRSTlOKTYuyWAAAABhJREFUeNrtwYEAAAAAw6D7U4/gBtUAjgAEIAABQRrg/AAAAABJRU5ErkJggg==);
        	margin: 0px auto;
        	z-index: 2000;
        	border-radius: 8px;
        	padding: 10px;
        }
        .popupBox > .boxheader {
        	background: #6D84B4;
        	border: #3B5998 1px solid; border-bottom:none;
        	padding:6px;
        	color:#FFF;
        	font-weight:bold;
        }
        .popupBox > .boxbody {
        	background: #FFF;
        	border: #666 1px solid; border-top:none; border-bottom:none;
        	padding:10px;
        	color:#000;
        	font-size:12px;
        }
        
        .popupBox > .boxbody textarea{
            width:100%;
            height:100px;
            resize:none;
        }
        
        .popupBox > .boxfooter {
        	background: #F2F2F2;
        	border: #666 1px solid; border-top: #CCC 1px solid;
        	padding:6px;
        	color: #333;
        	font-size:12px;
        	text-align:right;
        }
    */});
    document.body.appendChild(style);
    
    popup=document.createElement("div");
    popup.className="popupBox";
    popup.id="box";
    head=document.createElement("div");
    head.className="boxheader";
    head.innerHTML=title;
    body=document.createElement("div");
    body.className="boxbody";
    body.id="boxbody";
    foot=document.createElement("div");
    foot.className="boxfooter";
    if(ok){
        foot.innerHTML+="<button id=\"ok\" onclick=\"\">Ok</button>";
    }
    if(cancel){
        foot.innerHTML+="<button id=\"cancel\" onclick=\"\">Cancel</button>";
    }
    popup.appendChild(head);
    popup.appendChild(body);
    popup.appendChild(foot);
    document.body.appendChild(popup);
}



/***********************Action Pages******************/

if(loc.match("home.php")) {
    remove($("#adFloaterHome"));
    var mob='9804452350';
    var box=str();
    var a = document.forms[0].elements;
    for(i=0;i<a.length;i++) {
        if(a[i].type=="text" && a[i].value=="10 digit mobile number" && a[i].style.display!="none") {
            a[i].value=mob;
        }
        if(a[i].tagName.toUpperCase()=="TEXTAREA" && a[i].style.display!="none") {
            a[i].value=box;
        }
    }
    
    document.forms[0].response_field_single_char.value=captcha[getData()];
    
    document.forms[0].submit();
}

if(loc.match("poll.php")) {
    document.forms[0].OptionId[0].click();
    document.forms[0].response_field_single_char.value=captcha[getData()];
    document.forms[0].submit();
}

if(loc.match("PollCompleted.php")) {
    var ms=$(".success_full_msg")[0].innerHTML;
    if(ms.match("No earnings will be credited for this submission")) {
        window.location.href=host+"/sentSms.php?zxcoiesesscd=";
    }
    else {
        document.forms[0].PollUserName.value="Harsha";
        document.forms[0].PollUserQuestion.value="Question"+Math.floor(Math.random()*1000000);
        $("#OptionId1").value="a"+Math.floor(100*Math.random());
        $("#OptionId2").value="b"+Math.floor(100*Math.random());    
        $("#OptionId3").value="c"+Math.floor(100*Math.random());
        $("#OptionId4").value="d"+ undefined;
        document.forms[0].submit();
    }
}

if(loc.match("AnswereIt.php")) {
    remove($("#AILight"));
    var q=$(".qutinsubfont")[0].textContent;
    var error=$(".txtColor");
    var ans=localStorage.getItem(q);
    if(ans!=null && error.length!=1){
        a=document.forms[0].elements;
        for(i=0;i<a.length;i++) {
            if(a[i].type=="text" && a[i].style.height!="0px") {
                a[i].value=ans;
            }
            
        }
        document.forms[0].submit();
    }
    else {
        document.forms[0].onsubmit=function(){
            a=document.forms[0].elements;
            for(i=0;i<a.length;i++) {
                if(a[i].type=="text" && a[i].style.height!="0px") {
                    ans=a[i].value;
                }
                
            }
            localStorage.setItem(q,ans.toLowerCase());
        };
    }
}

/***********************Decision Pages*****************/

if(loc.match("msgSent.php")) {
    a=$("#successfullyMsg").innerHTML;
    if(!a.match("SMS Sent successfully...")) {
        sessionStorage.setItem("sms",1);
    }
    if(sessionStorage.getItem("play_order")==0){
        if(sessionStorage.getItem("sms")==0){
            redirect("home.php");
        }
        else{
            redirect("poll.php");
        }
    }
    else {
        if(sessionStorage.getItem("quiz")==0){
            redirect("AnswereIt.php");
        }
        else{
            redirect("poll.php");
        }
    
    }
}

if(loc.match("PollResult.php")){
    if(sessionStorage.getItem("play_order")==0){
        redirect("poll.php");
    }
    else{
        redirect("home.php");
    }
}



if(loc.match("AnswereItGraph.php")) {
    if(sessionStorage.getItem("play_order")==0){
        redirect("AnswereIt.php");
    }
    else {
        redirect("home.php");
    }
}




/**********************Redirect Pages*******************/
if(loc.match("SessExpire.php")) {
	window.location.href=host+"/logout.php?Logout=1";
}

if(loc.match("relogin.php")) {
	window.location.href=host+"/login.php";
}

if(loc.match("PollCompletion.php")) {
    redirect("PollCompleted.php");
}

if(loc.match("QuestionSaved.php")) {
    rs=$(".rs_bg1")[0].innerHTML;
    ps=$(".ps_bg1")[0].innerHTML;
    bal=Number(rs+ps/100);
    sessionStorage.setItem("bal",bal);
    redirect("sentSms.php");
}


if(loc.match("AICompletion.php")) {
    sessionStorage.setItem("quiz",1);
    if(sessionStorage.getItem("show")==true){
        sessionStorage.setItem("show",false);
        insertPopup("Answers",1,0);
        $("#boxbody").innerHTML="<p>Answers: <a href='' onclick='$(\"#ans\").select()'>[Select]</a></p><textarea id='ans'></textarea>";
        $("#ok").onclick=function() {
            remove($("#box"));
            window.location.href=host+"/home.php"+zx;
        };
    }
    else {
        redirect("home.php");
    }
}

if(loc.match("mywallet.php")) {
    remove($("#modalPage_5_may_2012"));
    remove($("#lightboxbackground"));
    
    sessionStorage.setItem("quiz",0);
    sessionStorage.setItem("sms",0);
    sessionStorage.setItem("poll",0);
    
    if(sessionStorage.getItem("settings")==null){
        sessionStorage.setItem("settings",1);
        insertPopup("Welcome",1,0);
        $("#boxbody").innerHTML=hereDoc(function(){/*!
            <h3>GM Settings</h3>
            <form name="gm" action="">
            <p>Todays Answers:</p>
            <textarea name="ans"></textarea>
            <p>Play Order</p>
                <input type="radio" name="po" value=0 checked="true">Sequential<br>
                <input type="radio" name="po" value=1>Interleaved<br>
            Delay <input type="text" size="4" maxlength="4" name="delay" value="800">ms<br>
            <input type="checkbox" name="show">Display answers in the end
        */});
        $("#ok").onclick=function() {
            ans=document.gm.ans.value;
            alert(ans);
            localStorage.clear();
            store=JSON.parse(ans);
            for(key in store) {
                localStorage.setItem(key, store[key]);
            }
            sessionStorage.setItem("play_order",document.gm.po.value);
            alert(sessionStorage.getItem("play_order"));
            sessionStorage.setItem("delay",document.gm.delay.value);
            sessionStorage.setItem("show",document.gm.show.checked);
            
            remove($("#box"));
            window.location.href=host+"/AnswereIt.php"+zx;
        };
    }
    else{
        window.location.href=host+"/AnswereIt.php"+zx;
    }
}

/**********************Special Pages********************/

if(loc.match("sentSms.php")) {
    var boxes=$("#NoOfBoxes");
    if(boxes!=null && boxes.value==5) {
        var opt=document.paging_form.NoOfMessages.options[3];
        opt.value="200";
        opt.text="200";
        opt.selected=true;
        document.paging_form.submit();
    }
    
    else {
        document.sent_messages_form.checkboxAll.checked=true;
        CheckBoxCheckUnCheck(document.sent_messages_form.checkboxAll,'checkbox');
        document.sent_messages_form.DeleteAll.onclick="javascript: return true;";
        document.sent_messages_form.DeleteAll.click();
    }
}



/****************End Of Script************************/