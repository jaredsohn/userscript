// ==UserScript==
// @name          EWOQ Link PreViewer
// @description   Hover over links and the website will be previewed in an iframe.
// @include       https://www.raterhub.com/evaluation/rater/task/*
// @include       http://www.raterhub.com/evaluation/rater/task/*
// ==/UserScript==

function doIt() {
    if (document.readyState == "complete") {
        var i,
            pageAnchors = document.getElementsByTagName('a'),
            framesOnParentPage = document.getElementsByTagName('iframe'),
            anchors,
            okToModifyMouseMove = (document.onmousemove == null) ? true : false,
            mouseoverTimeOut = null,
            mouseoutTimeOutTimers = [],
            width = .6 * window.innerWidth,
            height = .7 * window.innerHeight,
            offSet = .05 * window.innerWidth,
            goodURL = /evaluation\/url\?q|freebase\.com/i,
            badURL = /\.pdf|profiles\.google|twitter\.com|www\.youtube|\.png|\.gif|\.jpg/i;

        function calcPosition(element) {
            var i;
            anchors = Array.prototype.slice.call(pageAnchors, 0);
            i = framesOnParentPage.length;
            while (i--) {
                var p,
                    childNodes;
                try {
                    childNodes = framesOnParentPage[i].contentDocument.body.childNodes;
                } catch (e) {
                    break;
                }
                p = childNodes.length;
                while (p--) {
                    if (childNodes[p].nodeName == "A" && goodURL.test(childNodes[p].href) && !badURL.test(childNodes[p].href)) {
                        anchors.push([framesOnParentPage[i], childNodes[p]]);
                    }
                }
            }
            i = anchors.length;
            while (i--) {
                var topp = 0,
                    left = 0,
                    self;
                if (Object.prototype.toString.call(anchors[i]) === '[object Array]') {
                    self = anchors[i][0];
                    for (; self.offsetParent; self = self.offsetParent) {
                        left += self.offsetLeft; // needs to be calculated for the right side results
                        topp += self.offsetTop;
                    }
                    anchors[i] = anchors[i][1];
                } else {
                    if (!goodURL.test(anchors[i].href) | badURL.test(anchors[i].href)) {
                        anchors.splice(i, 1);
                        continue;
                    }
                    self = anchors[i];
                    for (; self.offsetParent; self = self.offsetParent) {
                        left += self.offsetLeft; // needs to be calculated for the right side results
                        topp += self.offsetTop;
                    }
                }
                ((left + width) > window.innerWidth) ? left = offSet : left = window.innerWidth - (width + offSet + 20);
                anchors[i].setAttribute("pos", topp + ":" + left);
                if (!/bing\.com|yahoo\.com/i.test(anchors[i].href)) {
                    anchors[i].setAttribute("url", unescape(anchors[i].href.replace(/http.*url\?q=/, '')));
                } else {
                    anchors[i].setAttribute("url", unescape(anchors[i].href));
                }
            }
            if (element) {
                var evObj = document.createEvent('MouseEvents');
                evObj.initEvent('mouseover', true, false);
                element.dispatchEvent(evObj);
            }
        }
        calcPosition();
        i = anchors.length;
        while (i--) {
            anchors[i].addEventListener("mouseover", function (e) {
                mouseoverTimeOut = setTimeout(function (e) {
                    var pos = this.getAttribute('pos').split(":"),
                        topp = Number(pos[0]),
                        left = Number(pos[1]),
                        windowHeight = window.pageYOffset + window.innerHeight;
                    try {
                        if (e.relatedTarget.nodeName == "B" | e.relatedTarget.nodeName == "A") {
                            return;
                        }
                    } catch (e) {}
                    if (topp < 10) {
                        calcPosition(this);
                        return;
                    }
                    topp += 55;
                    while (true) {
                        if ((topp + height) > windowHeight) {
                            topp -= 10;
                        } else {
                            break;
                        }
                    }
                    topp -= 55;
                    div.style.left = left + "px";
                    frame.setAttribute('src', this.getAttribute('url'));
                    div.style.top = topp + "px";
                    div.style.width = width + "px";
                    div.style.height = height + "px";
                    div.style.display = "block";
                    this.style.border = "1px blue solid";
                }.bind(this), 600);
            });
            anchors[i].addEventListener("mouseout", function (e) {
                var relatedTarget = e.relatedTarget;
                if (relatedTarget != null && relatedTarget.parentElement == this) {
                    return;
                };
                if (relatedTarget == null | relatedTarget != this) {
                    clearTimeout(mouseoverTimeOut);
                    mouseoutTimeOutTimers.push(setTimeout(function () {
                        frame.setAttribute('src', "data:text/html;charset=utf-8,Some results don't display properly or at all.");
                        div.style.display = "none";
                        for (var i = 0, z; z = anchors[i]; i++) {
                            z.style.border = "";
                        }
                    }.bind(this), 500));
                }
            });
            anchors[i].addEventListener("click", function (e) {
                clearTimeout(mouseoverTimeOut);
            });
        }
        var div = document.createElement('div');
        div.style.position = "absolute";
        div.style.top = 20 + "px";
        div.style.width = width + "px";
        div.style.height = height + "px";
        div.style.zIndex = "100000";
        div.style.resize = "both";
        div.style.display = "none";
        div.style.overflow = "hidden";
        div.style.border = "1px solid grey";
        div.style.backgroundColor = "white";
        div.style.padding = "10px";
        div.style.paddingTop = "25px";
        div.setAttribute('isMoving', 0);
        div.draggable = "true";
        /*
        div.innerHTML = "<span style = 'font-size:10px; position:absolute; top: 0px; left: 0px; width = 100%'> "+
        				"<span center><a href='#' onclick = \"div.style.top = '10px'; div.style.left = '10px'; "+
                        " div.style.width = (window.innerWidth - 10) + 'px';"+
                        " div.style.height = (window.innerHeight - 10) + 'px';"+
                        "</span>"+
                        "<span style='float:right;'>++Website may not display properly or at all++</span>"+
                        "</span>"; 
        */
        if (okToModifyMouseMove) {
            div.onmousedown = function (evt) {
                var diffX = evt.clientX - div.style.left.replace('px', ''),
                    diffY = evt.clientY - div.style.top.replace('px', ''),
                    height = div.style.height;
                this.setAttribute('isMoving', 1);
                document.onmousemove = function (e) {
                    var X = e.clientX - diffX,
                        Y = e.clientY - diffY;
                    if (div.style.height != height) {
                        document.onmousemove = null;
                        return;
                    }
                    div.style.left = X + 'px';
                    div.style.top = Y + 'px';
                }
            }
            div.onmouseup = function () {
                this.setAttribute('isMoving', 0);
                document.onmousemove = null;
            }
        }
        div.onmouseover = function () {
            var i = mouseoutTimeOutTimers.length;
            while (i--) {
                clearTimeout(mouseoutTimeOutTimers[i]);
            }
            mouseoutTimeOutTimers = [];
        }
        div.onmouseout = function (e) {
            if (e.relatedTarget == null | (e.target == div && e.relatedTarget == frame) | (e.target == frame && e.relatedTarget == div) | this.getAttribute('isMoving') == 1) {
                return;
            }
            for (var i = 0, z; z = anchors[i]; i++) {
                z.style.border = "";
            }
            if (okToModifyMouseMove) {
                document.onmousemove = null;
            }
            frame.setAttribute('src', "data:text/html;charset=utf-8," + "Some results don't display properly or at all.");
            this.style.display = "none";
        }
        var frame = document.createElement('iframe');
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.style.zIndex = "200000";
        frame.style.backgroundColor = "white";
        frame.style.border = "none";
        frame.setAttribute('src', "data:text/html;charset=utf-8," + "Some results don't display properly or at all.");
        if (window.onbeforeunload == null) {
            window.onbeforeunload = function () {
                if (div.style.display == "block") {
                    return "This will end your session";
                }
            }
            //frame.setAttribute('sandbox', 'allow-top-navigation allow-scripts allow-forms allow-same-origin ');
        } else {
            //frame.setAttribute('sandbox', '');
            frame.setAttribute('sandbox', 'allow-top-navigation allow-scripts allow-forms allow-same-origin ');
        }
        div.appendChild(frame);
        document.body.appendChild(div);
        /*
		if ( !sessionStorage.getItem("cached") ){
				
		    i = anchors.length;
		    while (i--) {
						
		        GM_xmlhttpRequest({
		            method: "GET",
		            url: anchors[i].getAttribute('url'),
		            onload: function (response) {}
		        });
								
		}
						
		sessionStorage.setItem("cached", "true");
				
		}
        */
    } else {
        setTimeout(doIt, 1000);
    }
}
if (document.onreadystatechange == null) {
    document.onreadystatechange = doIt;
} else {
    setTimeout(doIt, 5000);
}