// ==UserScript==
// @name          LeproLivePlusChromeHelper
// @namespace     http://kt.pri.ee/lepra
// @description   Эта фигня нужна для того чтобы LeproLivePlus работал с хромом. НЕ УСТАНАВЛИВАЙТЕ ЕЕ!
// ==/UserScript==

collectText = function(node) {
   if (node.tagName == 'IMG') return '[КАРТИНКА]';
   var r = node.nodeValue ? node.nodeValue : '';
   for (var i in node.childNodes) {
       r = r + ' ' + collectText(node.childNodes[i]);
   }
   return r;
}

Message = function(elPost) {
    this.div = elPost;
    this.text =  collectText(this.div.childNodes[0].childNodes[0]);
    this.dataDiv = this.div.childNodes[0].childNodes[1];
    this.author = this.dataDiv.querySelector("a[href*='users']").innerHTML;
    this.link = this.dataDiv.querySelector("a[href*='comments']").getAttribute("href");
    
    var i = this.link.indexOf('/comments/');
    this.postID = this.link.substr(i+10);
    if (i > 0) {
        i = this.link.indexOf('.leprosorium.ru');
        this.sublepra = this.link.substr(2, i-2);
    }
    else {
        this.sublepra = 'БЛ';
    }
    i = this.postID.indexOf('/');
    if (i >= 0) this.postID = this.postID.substr(0, i);
}

Post = function(postID) {
    this.postID = postID;
    this.div = document.createElement('div');
    this.div.setAttribute("style", "width: 270px; height: 100px; margin: 2px; border: 1px dotted grey; padding: 1%; float: left; overflow: hidden;");
    this.div.innerHTML = '<div style="color: gray; font-size: 9px; width: 100px; height: 100px; margin-right: 2px; float: left; text-align: center;"></div><div style="height: 100px; width: 165px; font-size: 10px; float: left;"></div>';
    this.postDiv = this.div.childNodes[0];
    this.messageDiv = this.div.childNodes[1];
}

PostRegistry = function(maxPosts, noSublepras) {
    this.posts = new Object();
    this.postLRU = new Array();
    this.maxPosts = maxPosts;
    this.noSublepras = noSublepras;
    this.pir = new PostImageRegistry();
}

PostRegistry.prototype.addMessage = function(message) {
    if (message.sublepra != 'БЛ' && this.noSublepras) return;
    if (!this.posts[message.postID]) {
        var p = new Post(message.postID);
        p.postDiv.innerHTML = message.sublepra + ':' + message.postID;
        if (this.postLRU.length == this.maxPosts) {
            var postToDelete = this.postLRU.shift();
            var oldPostDiv = this.posts[postToDelete].div;
            oldPostDiv.parentNode.insertBefore(p.div, oldPostDiv);
            oldPostDiv.parentNode.removeChild(oldPostDiv);
            delete this.posts[postToDelete];
        }
        else {
            var root = document.getElementById('js-liveHolder');
            root.appendChild(p.div);
        }
        this.postLRU.push(p.postID);
        this.posts[p.postID] = p;
        if (message.sublepra == 'БЛ') this.pir.requestImageFor(p.postID, p.postDiv);
    }
    var p = this.posts[message.postID];
    var idx = this.postLRU.indexOf(p.postID);
    this.postLRU.splice(idx, 1);
    this.postLRU.push(p.postID);
    p.messageDiv.innerHTML = "<a style='display: block; float: right;' target='_blank' href='" + message.link + "'>" + message.author + "</a>" +
                             "<div style='margin-top: 15px;'>" + message.text + "</div>";
    new Flash(p.div);
}

PostImageRegistry = function() {
    this.postImages = new Object();
    this.queue = new Array();
    this.requestInProgress = false;
    var self = this;
    this.interval = setInterval(function() { self.processQueue(); }, 3000);
}

PostImageRegistry.prototype.requestImageFor = function(postID, imgDiv) {
    if (!this.postImages[postID]) {
        this.queue.push([postID, imgDiv]);
    }
    else {
        this.setImageFor(postID, imgDiv);
    }
}

PostImageRegistry.prototype.setImageFor = function(postID, imgDiv) {
    if (this.postImages[postID] != 'fail') {
        imgDiv.innerHTML = '';
        imgDiv.appendChild(this.postImages[postID]);
    }
}

PostImageRegistry.prototype.processQueue = function() {
    var self = this;
    var nextTime = new Array();
    while (true) {
        if (this.queue.length == 0) break;
        var r = this.queue.shift();
        if (this.postImages[r[0]]) this.setImageFor(r[0], r[1]);
        else if (!this.postImages[r[0]] && this.requestInProgress) nextTime.push(r);
        else {
            this.requestInProgress = true;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    var d = document.createElement('div');
                    d.innerHTML = this.responseText;
                    d = d.querySelectorAll("div.dt");
                    for (var i = 0; i < d.length; i++) {
                        var pst = d[i];
                        var postID = pst.parentNode.getAttribute("id").substr(1);
                        if (!self.postImages[postID]) {
                            var img = pst.querySelector("img");
                            if (img != null) {
                                img.setAttribute("style", img.height > img.width ? "height: 100%" : "width: 100%");
                                img.removeAttribute("width");
                                img.removeAttribute("height");
                                self.postImages[postID] = img;
                                img.addEventListener('load', function() { 
                                    img.setAttribute("style", img.height > img.width ? "height: 100%" : "width: 100%");
                                }, false);
                            }
                            else {
                                self.postImages[postID] = 'fail';
                            }
                        }
                    }
                    self.setImageFor(r[0], r[1]);
                    self.requestInProgress = false;
                }
            }
            xhr.open("GET", 'http://leprosorium.ru/',true);
            xhr.send();
        }   
    }
    this.queue = nextTime;
}

Flash = function(el) {
    var steps = ['#000', '#333', '#666', '#999', '#ccc', '#FFF'];
    var nextStep = 0;
    var self = this;
    this.step = function() {
        el.style.backgroundColor = steps[nextStep++];
        if (nextStep < steps.length) setTimeout(function() { self.step() }, 50);
    }
    this.step();
}

enableLivePlus = function(panelCount, noSublepras) {
    // Disable http://userscripts.org/scripts/show/81038, if present
    var lepraLiveFilter = document.getElementById('menu');
    if (lepraLiveFilter) lepraLiveFilter.style.display = 'none';

    var root = document.getElementById('js-liveHolder');
    root.innerHTML = '';
    root.setAttribute("style", "position: absolute; width: 99%; left: 1px;");

    var pr = new PostRegistry(panelCount, noSublepras);
    var liveHandler = window.liveHandler;
    
    liveHandler.draw = function (next_button) {
        clearTimeout(liveHandler.drawingInterval);
        var newMessage = liveHandler.messagesArr.shift();
        document.getElementById('js-liveQueueNum').innerHTML = liveHandler.messagesArr.length;
        if (newMessage) {
            var msg = new Message(newMessage);
            pr.addMessage(msg);
        }
        if (!liveHandler.paused) {
            liveHandler.drawingInterval = setInterval(function () {liveHandler.draw()}, liveHandler.drawingIntervalDuration);
        }
    }

    liveHandler.drawAll = function () {
        liveHandler.pauseStupid();
        for (var i = 0; i < liveHandler.messagesArr.length; i++){
            var msg = new Message(liveHandler.messagesArr[i]);
            pr.addMessage(msg);
        }
        document.getElementById('js-liveQueueNum').innerHTML = '0';
        liveHandler.messagesArr = [];
    }
}


addButton = function(onClick) {
    var divTag = document.createElement("div");
    divTag.id = "livePlus_enable";
    divTag.setAttribute("style","font-size:7pt; position:absolute; top:50px; right: 15px; border: 1px solid #909090; width:100px; padding:20px;");
    divTag.innerHTML = '<b>LivePlus</b><br><br>Панелей: <select id="livePlusPanelCount"><option value="9">9</option><option value="12">12</option><option value="16" selected="selected">16</option><option value="20">20</option><option value="24">24</option><option value="30">30</option><option value="36">36</option></select><br>Только БЛ: <input type="checkbox" id="livePlusNoSublepras"><br><br><a id="bEnableLivePlus" href="#" onclick="return false;">Включить</a>';
    document.body.appendChild(divTag);
    divTag.childNodes[divTag.childNodes.length-1].addEventListener('click',
        function() {
            var panels = document.getElementById('livePlusPanelCount');
            var noSublepras = document.getElementById('livePlusNoSublepras');
            document.body.removeChild(divTag);
            onClick(parseInt(panels.value), noSublepras.checked);
        },false);
}


addButton(enableLivePlus);

