// CharFix
// version 0.4
//
// History:
//      v0.1 Initial version.
//      v0.2 Speed improvement.
//      v0.3 Fix added for the title of a review page,
//           improved element detection with XPath expression.
//      v0.4 Improved UTF-8 detection. Automatic update checker added.
//
// ==UserScript==
// @name          CharFix for StumbleUpon
// @description   Fixes UTF-8 characters on the blog and review pages
// @include       http://www.stumbleupon.com/*
// @version       0.4
// @author        dirtbagbubble
// ==/UserScript==

/**
 * Component for checking for a new version of this script.
 * Must be instantiated as a new object.
 * 
 * @param scriptId This script's userscripts.org id
 * @param thisVersion This script's current version.
 */
function UpdateChecker(scriptId, thisVersion) {
    this.scriptId = scriptId;
    this.thisVersion = thisVersion;
    // Warning sign from http://www.psdgraphics.com/icons/psd-red-and-yellow-warning-signs/
    this.warningSign = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oDChIOI3QqJL8AAARhSURBVDjLlZVtaJVlGMd/9/M852Vn5+yc7TidkebbtNbUmToxSlCTIExCCURDZZYp4QfRyAyiMPxiaSVkvn3Ioi+RJIUEZmJWZlqUoY45X5Yva7PNnXO2Pa/3ffVhIkED8//l+nN9+HHx57q4FP9DnUfnxt2OM8tj6f4pQSn9bcWwqQeq5hwyIqAU96YLe8YBIPsaM+HJ8kNScETCatHtGQlO5N/r3Fgb516l+1vvePmt+nUp5Iy0zRHTvNTIjbkSXR8byukHFgGYrquDMpzBmi27JgxAj418mBprBW6NEm+UKMdW0lsjdqXtUNbxihy1Dp/fP7o4GMMarPnQOk3hzXzCZMqX49SMpjgUZbnguCgrgmISyddOL5RSi+vWRbQdWHh3cOtHMwGoeKZmrJvMr8fNgeNByleUB5D0FLoLZefIjh23XY4+ln5g4QFa9k2+e8Z/7NiMd6z+oJSaxP/5ESPuPBk5PCGADM/HRIK54p5oMOK+K3Jk+u67RtGyuw6A+pHvz49NmLkgbP8b8YqKhM2jk3MANE7KQiyBBJ0qavsFZjQ9L5/QCND8Yd3g4PGrzvEE2NTP+cDK1OJfOSVWIg06SWV2YLsqMnGQOE6qGu/PLwXyihkvbQN4cPW5/4LP7RgDwOHDdW8xZvGI4qnPxYrbythlIEmqKssByGbKQFIYyrFTWdVzfDOMWzZFDtW+8G+OBXD6Zahbe4mujYylcdVKfeMC0c2TyorlgBhIjMpcGQC5igQoB0UMsdJI1IrffDDFtDUr29cxtG7tJU6tB6t5/zymbR2Yuuq5FZuoaMjf/G4LdnoI2ihAQBuy6QQA6XQcNGgEtI3lZCie3QdWorFm2cIlANPfAYurhweO4etJsxk/f/6tH/ZYBD1oiaODkMj3oVBCJALA6AgKvUjgEYUBkbaJ/G4pNn+lqBy2Ro40jAJQAC2ryNRueHWnztUuvfbFahJphZ2swEmmscrSZKtzkE/DTQ/ySSj0U2jvJvJ6idxewt4SWse4f/ZThG03Np/55tc37BVA066lj1Nd/3bnTx8TdF8W5SQVSiECGCFVabFl6yVmrTxD6a8+npwdo7ejhPY8Ii8kDDT93X0SSxpl59QsqNprbdrTUF7SsllH3fS0fi8CSkca7QYYz8fvc0F6eW3ndQC2fdoOPQWiPpfI9Qk9HxMYbMtSV0+cl9RwX1lW5zbLjsXmpkeMmtn+42cSlEShHHQgRKHG9wK01wc3CuzbkKO60mL7ixko9uG7LoEboENDGERggfFR149flPyo/mcdOxEuUtmQrrO/o31weyIsFaEcULaFZTtc6Q1YMjVO0+wK3KJwuaWE5xkkNJhQiLRBCegArp3q576JIU7kuW1Y1xj/9AxuXbwmyhEFBoUgSrDEILZQNELB10jcUDZckRKFGEHkNlQZJESG1KJ0GKJa9k7MJtPB/vJqWWCp8PZaaSAC0SgMoBHRcNsPVANy5x0ACqUEE9mm0FG+8x9dLyrYdNncpgAAAABJRU5ErkJggg==';
    // Close button from http://www.clker.com/clipart-24890.html
    this.closeButton = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAUCAYAAACTQC2+AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAGYwAABmMBTYgavAAAAAd0SU1FB9oDChInJK4ILvcAAASkSURBVEjHtZVfaBRXFMZ/c++dmd1NNrttJPEvJhQVLNimjYWKvlSovlQEn2qJPihEREpFfLBPfSo+WF8E31sJthRRqVD/tBZsBEFN1tQYCfivRhM2ZpPJ7mR3Z+bO7cMmmxho+9JeODDD+ea7597zfXOs66dOFdszGQdj+F+WZfHE8wK1Kp122sAhisCy5gGLN16YW7j+CWcM2DZROo2KwtCEvs80YAkxmzegNVKI2jMQC4G1aDNjDCKOMQvekbKOM3FMExA1NBgVhSH+1BQztj1fTRTRpBSNLS08z+dpBV5Vq+A48xhjIAhodl0KSrFy6VK8kRGKWmOkrGNkGBI5DioKAvxSiYptgxA1gigiu2IFn/b2kmxu5uulS1GFAqViEVy3XkyjMRQaGvhydBT7yRO+amvDKpWozF1hHCPCkCibRegwpOJ5BL5PWCoR+D56ZoZ8scjHO3bw7YkTfJ9OM+W6KN+nWihQLRRQnsek6/JDUxPfnTzJ5u3buTk4SFCtEpRKda6K56HDEBGGIb7nUSmX6zHj+5QfPeKTly+5cvs2R7q7udLezoRtE4+NEY+NMeE4/NLezpHubq7fucPb/f10JhKUPI9KpVLn8j2PMAxROgyZ8TxCpV5rYrFapXT1KqvGx7kcx3yxbx+nz5xh/eQkAA82buTzPXv49e5d3J4e5LNnjEmJse3XRGXPnkhFYYhlDEKIOgApkVISVir4fX0sCwKuK8XBri5+b2sDKTm4aRO/DQyQOncO5+lTykohEolan+dUGMfExhCFIcr3PPK5HO7KlVhzaplVjIljoulpxK1bpG7f5t7p02zZsgWA/uFhCocPU71/H53Nohoba4UusIDRmurICC3r1qG88XFu5vPY+Tz2Yi8CM0AMrLhxgzat6zkJDPT28iIIMPk8KUAs+j6cjY/Gx1FSCJYDKSkRC/Rv4phQawSQXr+ezgsX6Fizhj+Gh9HAu2vXUh4epn/nTqZyOSLAkfK1U8VaMzNrfCWlJAUkEgmEUvNXViphA8mODt4/f56Nq1fz8/37PNm6lVhr/rx2jR0dHdiXL9O/axf+zZsEWuMkErUWWBZxFIHvI6VEKCFwAFcpHClxlCJhDM1AdvNmOi9dYuPq1VwaGmK8q4tqPk91YoLJzz7jfC7He62tdF68SMu2bWQBJ45rPFLWOAElBEJJSRpIuW4tHIcGpXi+YQPLzp6lc/lyfhocpLJ7NzqXI60UGdtGDw0R7d3Lj319vNPczLKeHnRnJ0nHmedyXdKAkhIlpCQBWK6LkBJjDE4Y0mFZPMzlePjiBWuPHiW4dw+RyeBmMrVGT0+jBwZIHzrEN8ePY4KAD7Rm1LbRrotlWcRakwCElChbCFKzHhKWhbEs4mQSPTLCh8eO8UpK9OPHOM3NpBoa5s2YyRDZNubBA946cIA3bZvJ589RqRSuEFizf3wjBPacGBKuC3NNNAZcF51MMl4s1kZBayupRYrCGJxEArTG9X2mLQu1ZAnOrBCwLIzW4LpIKVFSCCtbLlMdHZ037N9N28XD719wRmvccplICEtNJpPBG/v3IxaY8T+b4kAkJZPJZPAXzkw52AmAg6MAAAAASUVORK5CYII=';

    /**
     * Adds an update notification bar to the top of the current page.
     */
    this.onUpdateAvailable = function(infos) {
        var dummyBar = document.createElement('div');
        var updateBar = document.createElement('div');
        var noti = document.createElement('div');
        var installButton = document.createElement('a');
        var closeButton = document.createElement('img');
        
        noti.innerHTML = '<img style="padding:0px;border:none 0px;margin:0px;background:none;vertical-align:middle" src="' + 
                         this.warningSign + '"> An update is available for <i><a style="font-decoration:underline;color:black" target="_blank" href="' +
                         infos.infoPageUrl + '">' + 
                         infos.scriptName + '</a></i>: ';

        installButton.innerHTML = 'Install version ' + infos.version;
        installButton.style.padding = '2px';
        installButton.style.MozBorderRadius = '5px';
        installButton.style.border = 'solid 1px black';
        installButton.style.backgroundColor = 'white';
        installButton.style.color = 'black';
        installButton.setAttribute('href', infos.url);
        installButton.addEventListener('click', function() {
            document.body.removeChild(dummyBar);
        }, false);
        
        closeButton.setAttribute('src', this.closeButton);
        closeButton.style.cssFloat = 'right';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', function() {
            document.body.removeChild(dummyBar);
        }, false);
        closeButton.style.border = 'none 0px';
        closeButton.style.outline = 'none 0px';
        closeButton.style.margin = '2px';
        closeButton.style.padding = '0px';
       
        dummyBar.appendChild(updateBar);
        updateBar.appendChild(closeButton);
        updateBar.appendChild(noti);
        noti.appendChild(installButton);

        noti.style.margin = '2px';
        dummyBar.style.height = '22px';
        dummyBar.style.margin = '0px';
        dummyBar.style.padding = '0px';
        
        updateBar.style.fontFamily = 'sans-serif';
        updateBar.style.fontWeight = 'bold';
        updateBar.style.color = '#5E4300';
        updateBar.style.fontSize = '12px';
        updateBar.style.margin = '0px';
        updateBar.style.textAlign = 'left';
        updateBar.style.height = '22px';
        updateBar.style.borderBottom = '1px solid black';
        updateBar.style.position = 'fixed';
        updateBar.style.width = '100%';
        updateBar.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAWCAIAAACOpGH9AAAAMUlEQVQImWN4vJqBiZGJnYmRmZ2JkZmDiZGJnYkJxmZmh/I5UOQZmaFiSPqYoGqh+gC0LgKl8uVdXwAAAABJRU5ErkJggg==)';
        updateBar.style.zIndex = '20000';
        updateBar.style.top = '0px';
        updateBar.style.left = '0px';
        
        document.body.insertBefore(dummyBar, document.body.firstChild);
        document.body.marginTop = '22px';
    };
    
    /**
     * Checks for an update on userscripts.org
     * If available, the according event handler this.onUpdateAvailable is called.
     */
    this.checkForUpdate = function() {
        var self = this;
        var infoPageUrl = 'http://userscripts.org/scripts/show/' + this.scriptId;

        GM_xmlhttpRequest({
            method: "GET",
            url: infoPageUrl,
            
            onload: function(response) {
                var currentVersion = (/<div\s+id=["']summary["']>(.|\s)+?<b>\s*Version:\s*<\/b>\s*([^<\n]+)/i).exec(response.responseText)[2];
                var scriptName = (/<h1\s+class=["']title["']>([^<]+)<\/h1>/i).exec(response.responseText)[1];

                if(currentVersion != self.thisVersion) {
                    self.onUpdateAvailable({version : currentVersion, 
                                            url : 'http://userscripts.org/scripts/source/'
                                                  + self.scriptId + '.user.js',
                                            'scriptName' : scriptName,
                                            'infoPageUrl' : infoPageUrl});
                }
            }
        });
    };
    
    /**
     * Starts the automatic update checking routine.
     * Every 10th time this script is executed, an update check will be done.
     */
    this.start = function() {
        var current = GM_getValue('update_counter');
        
        if(!current) {
            current = 0
        }
        
        ++current;
        
        if(current >= 10) {
            this.checkForUpdate();
            current = 0;
        }
        
        GM_setValue('update_counter', current);
    };
}

// Following function is borrowed from http://www.webtoolkit.info/javascript-url-decode-encode.html
function utf8_to_latin(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
            }
            else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
            }
            else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
            }

    }

    return string;
}

function utf8_detect(txt) {
    if(txt) return txt.match(/([\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEF][\x80-\xBF][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF][\x80-\xBF]|[\xF1-\xF7][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xF8[\x88-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|[\xF9-\xFB][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xFC[\x84-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF]|\xFD[\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF][\x80-\xBF])/);
    return false;
}

var updateChecker = new UpdateChecker(70487, '0.4');
updateChecker.start();

var result = document.evaluate('//title|//div[@class="review"]|//h4/a|//h1/a', document, null, XPathResult.ANY_TYPE, null);
// Result must be transferred into an Array before any changes are applied to the DOM tree
var nodes = new Array;

while(element = result.iterateNext()) {
    nodes.push(element);
}

while(element = nodes.pop()) {
    if(utf8_detect(element.innerHTML))
        element.innerHTML = utf8_to_latin(element.innerHTML)
}