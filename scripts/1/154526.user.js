// ==UserScript==
// @name           4chan Sound Player
// @namespace      ms11
// @description    Plays sounds posted on 4chan.  Supports various methods of circumventing the filter.  Based on ms11 version.
// @match          *://boards.4chan.org/*
// @match          *://images.4chan.org/*
// @match          *://archive.foolz.us/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// The sound script has been developed by many people; I do not know who all the authors are.
// This script is based on the version at http://ms11.github.com/4chanSoundPlayer/
// (itself based on Triangle's 4chan Sound Script dev)
// In addition, code has been included from
// https://raw.github.com/devongovett/png.js/ (decoding PNG images)
// https://github.com/dnsev/4cs/ (decoding steganographic data in PNG images)

var chrome = (navigator.userAgent+'').indexOf(' Chrome/') != -1;
var archive = (document.location+'').indexOf('boards.4chan.org') == -1;

function insertAfter(referenceNode, newNode)
{
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function byClass(items, cl)
{
    for (var i = 0; i < items.length; i++)
    {
        if (items[i].classList.contains(cl))
        {
            return items[i];
        }
    }
    return null;
}

function s2ab(text)
{
    var foo = new ArrayBuffer(text.length);
    var bar = new Uint8Array(foo);
    for (var a = 0; a < text.length; a++)
    {
        bar[a] = text.charCodeAt(a);
    }
    return foo;
}

function getPostID(o)
{
    var o = o.getAttribute('id');
    if (!archive)
    {
        o = o.substr(1);
    }
    var ret = Number(o);
    if(!ret){
        ret = Number(o.split('_')[1].substr(1));
    }
    return ret;
}
function create(type, parent, attributes)
{
    var element = document.createElement(type);
    for (var attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}
function sectos(sec) {
    var m = Math.floor(sec/60);
    var s = +(sec-m*60);
    return m+(s<10?":0":":")+s;
}
String.prototype.replaceAll = function(replaceTo,replaceWith) {
    return this.replace(new RegExp(replaceTo,'g'),replaceWith);
};

function get_chrome(url, callback, progressCb, userState)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.responseType = 'arraybuffer';
    if(progressCb)
        xhr.onprogress = function(e){progressCb(e,userState);};
    xhr.onload = function(e) {
        if (this.status == 200) {
            callback(this.response,userState);
        }
    };
    xhr.send();
}

function get_grease(url, callback, progressCb, userState) {
    var arg = {
        method: "GET",
        url: url,
        overrideMimeType: 'text/plain; charset=x-user-defined',
        onload: function(e)
        {
            if (e.status == 200)
            {
                var text = e.responseText;
                var foo = s2ab(text);
                callback(foo,userState);
            }
        }
    };
    if(progressCb)
        arg.onprogress = function(e){progressCb(e,userState);};
    GM_xmlhttpRequest(arg);
}
var xmlhttp = chrome ? get_chrome:get_grease;
function loadAll(file,isUrl,cb) {
    if (cb === undefined) cb = function() {};
    if(isUrl){
        xmlhttp(file,function(data,link) {
            loadAllFromData(data,link,cb);
        },onprogress, file);
    }else{
        for(var i = 0; i < file.length;i++){
            var reader = new FileReader();
            reader.onload = function() {
                loadAllFromData(this.result,"",cb);
            };
            reader.readAsArrayBuffer(file[i]);
        }
    }
}

function loadSplitSounds(arr,cb,userState){
    var data = {links:arr.slice(),sounddata:[]};
    realLoadSplitSounds(data,arr[0].realhref,arr[0].splittag,cb,userState);
}
function realLoadSplitSounds(data,url,tag,cb,userState){
    if(data.links.length < 1){
        var len = 0;
        for(var i = 0; i < data.sounddata.length;i++){
            len += data.sounddata[i].byteLength;
        }
        var raw = new ArrayBuffer(len);
        var rawa = new Uint8Array(raw);
        var offs = 0;
        for(var i = 0; i < data.sounddata.length;i++){
            var sa = new Uint8Array(data.sounddata[i]);
            rawa.set(sa,offs);
            offs+=sa.length;
        }
        showPlayer();
        if(cb)
            cb(userState);
        addMusic({data:raw,tag:tag},tag,url);
    }else{
        xmlhttp(data.links[0].realhref,function(resp){
            findOgg(resp,data.links[0].tag, function(sound) {
                data.sounddata.push(sound.data);
                data.links = data.links.splice(1);
                realLoadSplitSounds(data,url,tag,cb,userState);
            });
        });
    }
}
function rehyperlink(target,second) {
    var list = target.getElementsByClassName('playerLoadAllLink');
    for(var i = 0; i < list.length;i++){
        if(list[i].rehypered) continue;
        list[i].rehypered = true;
        list[i].addEventListener('click',function(e) {
            e.preventDefault();
            e.target.innerHTML = " loading...";
            if(this.splittag){
                var arr = playerSplitImages[this.splittag];
                loadSplitSounds(arr,function(rlink){
                    rlink.innerHTML = " Load all sounds";
                },this);
            }else{
                var a = null;
                if(!archive){
                    var a = e.target.parentNode.parentNode.getElementsByClassName('fileThumb')[0];
                }else{
                    a = byClass(e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a'), 'thread_image_link');
                }
                if(a) {
                    loadAll(a.href,true,function(){e.target.innerHTML = " Load all sounds"},
                        function(pe){
                            e.target.innerHTML = ' loading';
                            if(pe.lengthComputable){
                                e.target.innerHTML += '(' + ~~((pe.loaded/pe.total)*100) + '%)';
                            }
                    });
                }
            }
        });
    }
    var links = target.getElementsByClassName('soundlink');
    if(links.length < 1) {
        if(second) return;
        else
        setTimeout(function() {rehyperlink(target, true); },200);
    }
    var post = target.getElementsByTagName(archive ? 'article':'blockquote')[0];
    var a = null;
    var p = null;
    if (!archive) {
        p = post;
        a = byClass(target.getElementsByTagName('a'), 'fileThumb');
        if (!a) return;
    }else{
        a = byClass(post.getElementsByTagName('a'), 'thread_image_link');
        p = byClass(post.getElementsByTagName('div'), 'text');      
        if (!a || !p) return;
    }
    for(var i = 0;i < links.length;i++){
    
        var link = links[i];

        
        if(link.rehypered) continue;
        link.rehypered = true;
        
        var sp = null;
        if(sp = link.innerHTML.match(/(.*?)\.([0-9].*)/)){

            link.splittag = sp[1];
            link.splitid = sp[2];
            p.splittag = sp[1];
        }

        link.realhref = a.href;
        link.tag = link.innerHTML.replace("[","").replace("]","");
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if(this.splittag){
                var arr = playerSplitImages[this.splittag];
                loadSplitSounds(arr);
            }else{
                this.innerHTML = '[loading]';
                xmlhttp(this.realhref, function(data,rlink) {
                    rlink.innerHTML = '[' + rlink.tag + ']';
                    showPlayer();
                    findOgg(data, rlink.tag, function(sound) {
                        addMusic(sound,rlink.tag,rlink.realhref);
                    });
                },function(e,rlink){
                    rlink.innerHTML = '[loading';
                    if(e.lengthComputable){
                        rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
                    }
                    rlink.innerHTML += ']';
                },this);
            }
        });
    }
}
function hyperlinkone(target) {
    var postname = archive ? 'article':'blockquote';
    if(target.nodeName.toLowerCase() != postname) {
        var elems = target.getElementsByTagName(postname);
        for(var i = 0; i < elems.length; i++) {
            hyperlinkone(elems[i]);
        }
    }else{
        var repeat = true;
        while (repeat) {
            repeat = false;
            var a = null;
            var p = null;
            if (!archive) {
                p = target;
                a = byClass(target.parentNode.getElementsByTagName('a'), 'fileThumb');
                if (!a) continue;
            }else{
                a = byClass(target.getElementsByTagName('a'), 'thread_image_link');
                p = byClass(target.getElementsByTagName('div'), 'text');
                
                if (!a || !p) continue;
            }
            for (var j = 0; j < p.childNodes.length; j++) {
                var match = null;
                var node = p.childNodes[j];
                if (node.nodeType != 3) {
                    if(node.className != "spoiler" && node.className != 'quote') {
                        continue;
                    }else{
                        for(var k = 0; k < node.childNodes.length; k++) {
                            
                            var subnode = node.childNodes[k];
                            if(subnode.nodeType != 3) {continue;}
                            if (!(match = subnode.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
                                continue;
                            }
                            repeat = true;
                            var href = a.href;
                            var code = match[2];
                            var link = document.createElement('a');
                            link.innerHTML = '[' + code + ']';
                            link.className = 'soundlink';
                            //link.href = href;
                            link.href = "#";
                            link.realhref = href;
                            link.tag = code;
                            var sp = null;
                            if(sp = code.match(/(.*?)\.([0-9].*)/)){
                                if(!playerSplitImages.hasOwnProperty(sp[1])){
                                    playerSplitImages[sp[1]] = [];
                                }
                                
                                link.splittag = sp[1];
                                link.splitid = sp[2];
                                playerSplitImages[sp[1]].push(link);
                                p.splittag = sp[1];
                            }
                            
                            
                            addLoadAllLink(p);
                            link.addEventListener('click', function(e) {
                                
                                e.preventDefault();

                                if(link.splittag){
                                    var arr = playerSplitImages[link.splittag];
                                    loadSplitSounds(arr);
                                }else{
                                    this.innerHTML = '[loading]';
                                    xmlhttp(link.realhref, function(data, rlink) {  
                                        rlink.innerHTML = '[' + rlink.tag + ']';
                                        showPlayer();
                                        findOgg(data, rlink.tag, function(sound) {
                                            addMusic(sound,rlink.tag,rlink.realhref);
                                        });
                                    },function(e,rlink){
                                        rlink.innerHTML = '[loading';
                                        if(e.lengthComputable){
                                            rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
                                        }
                                        rlink.innerHTML += ']';
                                    },this);
                                }
                            });
                            subnode.nodeValue = match[1];
                            insertAfter(subnode, link);
                            var text = document.createTextNode(match[3]);
                            insertAfter(link, text);
                        }
                    }
                }else{
                    if (!(match = node.nodeValue.match(/(.*)\[([^\]]+)\](.*)/))) {
                        continue;
                    }
                    repeat = true;
                    
                    
                    var href = a.href;
                    var code = match[2];
                    var link = document.createElement('a');
                    link.innerHTML = '[' + code + ']';
                    link.className = 'soundlink';
    
                    link.href = "#";
                    link.realhref = href;
                    link.tag = code;
                    var sp = null;
                    if(sp = code.match(/(.*?)\.([0-9].*)/)){
                        if(!playerSplitImages.hasOwnProperty(sp[1])){
                            playerSplitImages[sp[1]] = [];
                        }
                        
                        link.splittag = sp[1];
                        link.splitid = sp[2];
                        playerSplitImages[sp[1]].push(link);
                        p.splittag = sp[1];
                    }
                    addLoadAllLink(p);
                    
                    link.addEventListener('click', function(e) {    
                        e.preventDefault();
                        if(link.splittag){
                            var arr = playerSplitImages[link.splittag];
                            loadSplitSounds(arr);
                        }else{
                            this.innerHTML = '[loading]';
                            xmlhttp(this.realhref, function(data, rlink) {
                                rlink.innerHTML = '[' + rlink.tag + ']';
                                showPlayer();
                                findOgg(data, rlink.tag, function(sound) {
                                    addMusic(sound,rlink.tag,rlink.realhref);
                                });
                            },function(e,rlink){
                                rlink.innerHTML = '[loading';
                                if(e.lengthComputable){
                                    rlink.innerHTML += '(' + ~~((e.loaded/e.total)*100) + '%)';
                                }
                                rlink.innerHTML += ']';
                            },this);
                        }
                        
                    });
                    node.nodeValue = match[1];
                    insertAfter(node, link);
                    var text = document.createTextNode(match[3]);
                    insertAfter(link, text);
                }
            }
        }
    }
}


function hyperlink() {
    var posts = archive? 'article':'blockquote';
    posts = document.getElementsByTagName(posts);
    for (var i = 0; i < posts.length; i++) {
        hyperlinkone(posts[i]);
    }
}

function addLoadAllLink(post) {
    if(!post.hasAllLink){
        var to = null;
        if(!archive) {
            var id = getPostID(post);
            
            var pi = document.getElementById('f'+id);
            if(!pi && post.id.indexOf('_') > -1) {
                pi = document.getElementById(post.id.split('_')[0] + '_f'+id);
            }
            to = pi.getElementsByClassName('fileInfo')[0];
        }else{
            var head = post.parentNode.getElementsByTagName('header')[0];
            head = head.getElementsByClassName('post_data')[0];
            to = head.getElementsByClassName('post_controls')[0];
        }
        var loadAllLink = create('a',to, {"href":"#","class":"playerLoadAllLink"});
        loadAllLink.innerHTML = " Load all sounds";
        if(archive){
            loadAllLink.classList.add('btnr');
            loadAllLink.classList.add('parent');
        }
        loadAllLink.splittag = post.splittag;
        loadAllLink.addEventListener('click',function(e) {
            e.preventDefault();
            e.target.innerHTML = " loading";
            if(this.splittag){
                var arr = playerSplitImages[this.splittag];
                loadSplitSounds(arr,function(rlink){
                    rlink.innerHTML = " Load all sounds";
                },this);
            }else{
                var a = null;
                if(!archive){
                    var a = e.target.parentNode.parentNode.getElementsByClassName('fileThumb')[0];
                }else{
                    a = byClass(e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('a'), 'thread_image_link');
                }
                if(a) {
                    loadAll(a.href,true,function(){e.target.innerHTML = " Load all sounds"},
                    function(pe){
                        e.target.innerHTML = ' loading';
                        if(pe.lengthComputable){
                            e.target.innerHTML += '(' + ~~((pe.loaded/pe.total)*100) + '%)';
                        }
                    });
                }
            }
        });
        post.hasAllLink = true;
    }
}

var lastPost = null;    // last post that was hyperlink()ed
var lastHyper = 0;      // unixtime*1000 for last hyperlink()
var isPlayer = false;
var playerDiv = null;
var playerList = null;
var playerTitle = null;
var playerTime = null;
var playerPlayer = null;
var newWindow = null;
var playerCurrentDuration = 0;
var playerMovingListItem = null;
var playerSaveData = null;
var playerSettings = null;
var playerStyle = null;

var playerListItemMenu = null;
var playerVolume = null;
var playerCurrentVolume = null;
var playerSeekbar = null;
var playerSeekbarCurrent = null;

var playerUserStyle = null;
var playerSplitImages = {};
var playerDefault = {right:0,bottom:0,shuffle:0,repeat:0,volume:1,compact:false,userCSS:{}};
var playerSettingsHeader = null;
function fixFFbug() {
    if (!chrome && !playerPlayer.paused) { 
        // Workaround for Firefox bug #583444 [it's fixed in 19]
        try { playerCurrentDuration = playerPlayer.buffered.end(0); }
        catch(ex) { playerCurrentDuration = 0; }
    }
}
function documentMouseDown(e) {
    if(playerListMenu.parentNode) {
        var parent = e.target.parentNode;
        var hide = false;
        do{
            if(parent === playerListMenu) {
                hide = false;
                break;
            }else if(parent === document.body) {
                hide = true;
                break;
            }else{
                parent = parent.parentNode;
            }
        }while( true );
        if(hide){
            playerListMenu.parentNode.removeChild(playerListMenu);
        }
    }
    if(playerListItemMenu.parentNode) {
        var parent = e.target.parentNode;
        var hide = false;
        do{
            if(parent == playerListItemMenu) {
                hide = false;
                break;
            }else if(parent == document.body) {
                hide = true;
                break;
            }else{
                parent = parent.parentNode;
            }
        }while(true);
        if(hide){
            playerListItemMenu.parentNode.removeChild(playerListItemMenu);
        }
    }
    if(e.target == playerTitle || e.target==playerTime || e.target==playerHeader){
        e.preventDefault();
        playerHeader.down = true;
        playerHeader.oldx = e.clientX;
        playerHeader.oldy = e.clientY;
    }else if(e.target == playerSettingsHeader){
        e.preventDefault();
        playerSettingsHeader.down = true;
        playerSettingsHeader.oldx = e.clientX;
        playerSettingsHeader.oldy = e.clientY;
    }else if(e.target == playerCurrentVolume && !playerPlayer.error) {
        e.preventDefault();
        playerCurrentVolume.down = true;
        playerCurrentVolume.oldx = e.clientX;
    }else if(e.target == playerSeekbarCurrent && !playerPlayer.error) {
        e.preventDefault();
        playerSeekbarCurrent.down = true;
        playerSeekbarCurrent.oldx = e.clientX;
    }
}
function documentMouseUp(e) {
    if(playerHeader.down){
        e.preventDefault();
        playerHeader.down = false;
        putInsidePage();
        setConf("right",playerDiv.style.right.replace("px",""));
        setConf("bottom",playerDiv.style.bottom.replace("px",""));
    }
    if(playerSettingsHeader.down) {
        e.preventDefault();
        playerSettingsHeader.down = false;
    }
    if(playerCurrentVolume.down) {
        e.preventDefault();
        playerCurrentVolume.down = false;
        setConf("volume",playerPlayer.volume);
    }
    if(playerSeekbarCurrent.down) {
        e.preventDefault();
        playerSeekbarCurrent.down = false;
        var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));
        var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
        var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
        var n = cl/(max-width);
        if ((chrome?playerPlayer.duration:playerCurrentDuration) !== 0) {
                    playerPlayer.currentTime = (chrome?playerPlayer.duration:playerCurrentDuration) * n;
        }       
    }
}
function documentMouseMove(e) {
    if(e.target == playerHeader || e.target == playerSettingsHeader){
        e.preventDefault();
    }
    if(playerHeader.down) {
        var cr = Number(playerDiv.style.right.replace("px",""));
        var cb = Number(playerDiv.style.bottom.replace("px",""));
        playerDiv.style.right = (cr + playerHeader.oldx - e.clientX) + "px";
        playerDiv.style.bottom = (cb + playerHeader.oldy - e.clientY) + "px";
        playerHeader.oldx = e.clientX;
        playerHeader.oldy = e.clientY;

    }
    if(playerSettingsHeader.down){
        var cr = Number(playerSettings.style.right.replace("px",""));
        var ct = Number(playerSettings.style.top.replace("px",""));
        playerSettings.style.right = (cr + (playerSettingsHeader.oldx - e.clientX)) + "px";
        playerSettings.style.top = (ct - (playerSettingsHeader.oldy - e.clientY)) + "px";
        playerSettingsHeader.oldx = e.clientX;
        playerSettingsHeader.oldy = e.clientY;
    }
    if(playerCurrentVolume.down) {
        var cl = Number(playerCurrentVolume.style.left.replace("px",""));
        var nl = (cl - (playerCurrentVolume.oldx - e.clientX));
        
        var max = Number(window.getComputedStyle(playerVolume).width.replace("px",""));
        var width = Number(window.getComputedStyle(playerCurrentVolume).width.replace("px",""));
        if(nl < 0 || nl > max-width) return;
        playerPlayer.volume = nl/(max-width);
        playerCurrentVolume.style.left = nl + "px";
        playerCurrentVolume.oldx = e.clientX;
    }
    
    if(playerSeekbarCurrent.down) {
        var cl = Number(playerSeekbarCurrent.style.left.replace("px",""));
        var nl = (cl - (playerSeekbarCurrent.oldx - e.clientX));
        
        var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
        var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
        if(nl < 0 || nl > max-width) return;
        playerSeekbarCurrent.style.left = nl + "px";
        playerSeekbarCurrent.oldx = e.clientX;
    }
}

function putInsidePage() {
    if(playerDiv.clientHeight + Number(playerDiv.style.bottom.replace("px","")) > window.innerHeight) {
        playerDiv.style.bottom = (window.innerHeight - playerDiv.clientHeight) + "px";
    }else if(Number(playerDiv.style.bottom.replace("px","")) < 0) {
        playerDiv.style.bottom = "0px";
    }
    if(playerDiv.clientWidth + Number(playerDiv.style.right.replace("px","")) > window.innerWidth) {
        playerDiv.style.right = (window.innerWidth - playerDiv.clientWidth) + "px";
    }else if(Number(playerDiv.style.right.replace("px","")) < 0) {
        playerDiv.style.right = "0px";
    }
}
function setConf(name,value) {
    playerSaveData[name] = value;
    localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
}
function loadConf() {
    playerSaveData = JSON.parse(localStorage.getItem("4chanSP")||'null');
    if(!playerSaveData) {
        playerSaveData = playerDefault;
    }else if(playerSaveData.css) {
        setConf("css",undefined);
        setConf("saveVer",undefined);
    }else if(playerSaveData.userCSS && (playerSaveData.userCSS.length)){
        setConf("userCSS",{});
    }
    if(!playerSaveData.compact){
        setConf("compact",false);
    }
}


function showPlayer() {
    if(!isPlayer) {
        loadConf();
        playerDiv = create('div', undefined, {"id":"playerDiv","class":"playerWindow"});
        playerDiv.style.right = playerSaveData.right+'px';
        playerDiv.style.bottom = playerSaveData.bottom+'px';
        
        
        playerHeader = create('div', playerDiv, {"id": "playerHeader"});
        playerTitle = create('div', playerHeader, {"id": "playerTitle"});
        playerTime = create('div', playerHeader, {"id": "playerTime"});
        playerImageDiv = create('div', playerDiv, {"id": "playerImageDiv"});
        
        playerControls = create('div', playerDiv, {"id": "playerControls"});
        playerVolumeSeekHeader = create('div', playerDiv, {"id": "playerVolumeSeekHeader"});
        playerVolume = create('div', playerVolumeSeekHeader, {"id": "playerVolume"});
        playerCurrentVolume = create('div',playerVolume, {"id": "playerCurrentVolume"});
    
        var scrollfunc = function(e) {
            e.preventDefault();
            var n = Number(playerCurrentVolume.style.left.replace("px",""));
            if(e.detail < 0 || e.wheelDelta > 0) {
                n+=1;
            }else if(e.detail > 0 || e.wheelDelta < 0) {
                n-=1;
            }
            
            
            var max = Number(window.getComputedStyle(playerVolume).width.replace("px",""));
            var width = Number(window.getComputedStyle(playerCurrentVolume).width.replace("px",""));
            
            if(n < 0 || n > max-width)return;
            playerCurrentVolume.style.left = n +"px";
            playerPlayer.volume=n/(max-width);
        };
        
        
        playerVolume.addEventListener("DOMMouseScroll",scrollfunc);
        playerVolume.addEventListener("mousewheel",scrollfunc);
        
        playerSeekbar = create('div', playerVolumeSeekHeader, {"id":"playerSeekbar"});
        playerSeekbarCurrent = create('div', playerSeekbar, {"id":"playerSeekbarCurrent"});
        
        //
        playerList = create('div', playerDiv, {"id":"playerList"});
        playerControls2 = create('div',playerDiv, {"id": "playerControls2"});
        playerList.addEventListener('dragover', function(e){
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            return false;    
        });  
        playerList.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(e.dataTransfer.files.length > 0) {
                loadAll(e.dataTransfer.files,false);
            }else{
                loadAll(e.dataTransfer.getData("text/plain"),true);
            }
        });
        playerControls2.addEventListener('dragover', function(e){
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            return false;    
        });  
        playerControls2.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
            if(e.dataTransfer.files.length > 0) {
                loadAll(e.dataTransfer.files,false);
            }else{
                loadAll(e.dataTransfer.getData("text/plain"),true);
            }
        });
        playerPlayer = create('audio', playerDiv, {"id": "playerPlayer"});
        //playerCurrentVolume.style.left = (playerPlayer.volume*170) + "px";
        playerPlayer.addEventListener('ended', function() {playerPlayPause.innerHTML = ">"; nextMusic(true);});
        playerPlayer.volume = playerSaveData.volume;
        //copy from Triangle's script
        playerPlayer.addEventListener('play', function(e) {
            fixFFbug();
        });
        //end
        fixFFbug();
        playerPlayer.addEventListener('timeupdate', function(e) {
            if(!playerSeekbarCurrent.down){
            if(this.currentTime > 0){
                var max = Number(window.getComputedStyle(playerSeekbar).width.replace("px",""));
                var width = Number(window.getComputedStyle(playerSeekbarCurrent).width.replace("px",""));
                
                var x = (this.currentTime/(chrome?this.duration:playerCurrentDuration)) * (max-width);
                if(x > max-width) {
                    fixFFbug();
                    playerSeekbarCurrent.style.left = "0px";
                    return;
                }
                playerSeekbarCurrent.style.left = x + "px";
                playerTime.innerHTML = sectos(Math.round(this.currentTime)) + "/" + sectos(Math.round(chrome?this.duration:playerCurrentDuration)) || "[unknown]";
            }
            }
        });
        
        playerPlayer.addEventListener('play', function() {playerPlayPause.innerHTML="| |";});
        playerPlayer.addEventListener('pause', function() {playerPlayPause.innerHTML=">";});
        playerRepeat = create('a', playerControls2, {"href": "#"});
        switch(playerSaveData.repeat){
            case 1: playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
            case 2: playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
            case 0: playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
        }
        playerRepeat.addEventListener('click', function(e) {
            e.preventDefault();
            switch(playerSaveData.repeat){
                case 0: setConf("repeat",1); playerRepeat.innerHTML = "[RA]"; playerRepeat.title = "Repeat all"; break;
                case 1: setConf("repeat",2); playerRepeat.innerHTML = "[R1]"; playerRepeat.title = "Repeat one"; break;
                case 2: setConf("repeat",0); playerRepeat.innerHTML = "[RO]"; playerRepeat.title = "Repeat off"; break;
            }
        });
        
        
        playerShuffle = create('a', playerControls2, {"href": "#"});
        playerShuffle.title = playerSaveData.shuffle ? "Shuffle" : "By order";
        playerShuffle.innerHTML = playerSaveData.shuffle ? "[SH]" : "[BO]";
        playerShuffle.addEventListener('click', function(e) {
            e.preventDefault();
            setConf("shuffle",!playerSaveData.shuffle);
            if(playerSaveData.shuffle) {
                playerShuffle.title = "Shuffle";
                playerShuffle.innerHTML = "[SH]";
            }else{
                playerShuffle.title = "By order";
                playerShuffle.innerHTML = "[BO]";
            }
        });
        
        
        playerClose = create('a', playerDiv, {"id":"playerClose","href":"#"});
        playerClose.innerHTML="[X]";
        playerClose.addEventListener('click', function(e) {
            e.preventDefault();
            
            //localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
                    
            document.body.removeChild(playerDiv);
            playerDiv = null;
            isPlayer = false;
        });
        
        
    
        
        playerChangeMode = create('a', playerControls2, {"id": "playerChangeMode", "href": "#"});
        playerChangeMode.innerHTML = "[M]";
        playerChangeMode.title = "Change view";
        playerChangeMode.addEventListener('click', function(e) {e.preventDefault(); swmode();});

        
        
        playerPrev = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
        playerPrev.innerHTML = "|<<";
        playerPrev.addEventListener('click', function(e) {
            e.preventDefault();
            prevMusic();
        });
        playerBackward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
        playerBackward.innerHTML = "<<";
        playerBackward.addEventListener('click', function(e) {
            e.preventDefault();
            playerPlayer.currentTime -= 5;
        }); 
        playerPlayPause = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
        playerPlayPause.innerHTML = ">";
        playerPlayPause.addEventListener('click', function(e) {
            e.preventDefault();
            if(playerPlayer.paused)
                playerPlayer.play();
            else
                playerPlayer.pause();
        });
        playerForward = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
        playerForward.innerHTML = ">>";
        playerForward.addEventListener('click', function(e) {
            e.preventDefault();
            playerPlayer.currentTime += 5;
        }); 
        playerNext = create('a', playerControls, {"href": "#", "class":"playerControlLink"});
        playerNext.innerHTML = ">>|";
        playerNext.addEventListener('click', function(e) {
            e.preventDefault();
            nextMusic(false);
        });
        
        playerStyleSettingsButton = create('a', playerDiv, {"id":"playerStyleSettingsButton","href":"#"});
        playerStyleSettingsButton.innerHTML="[S]";
        playerStyleSettingsButton.addEventListener('click', function(e) {
            e.preventDefault();
            if(playerSettings.style.display == "none")
                playerSettings.style.display = "block";
            else{
                playerSettings.style.display = "none";
                localStorage.setItem('4chanSP', JSON.stringify(playerSaveData));
            }
        });
        playerSettings = create('table', playerDiv, {"id":"playerSettings","class":"playerWindow"});
        playerSettings.style.right = "210px";
        playerSettings.style.top = "0px";
        playerSettings.style.display = "none";
        var tbody = create('tbody', playerSettings);
        var headerrow = create('tr', tbody);
        playerSettingsHeader = create('td', headerrow,{"colspan":2});
        playerSettingsHeader.innerHTML = "4chan Sounds Player Style Settings";
        playerSettingsHeader.style.textAlign="center";
        playerSettingsHeader.style.cursor = "move";

        var data = [{name:"Text color",format:"CSS color value",id:"LinkColor",sets:"#playerCurrentVolume, #playerSeekbarCurrent {background-color:%1} .playerWindow > * > * {color:%1 !important;} .playerWindow > * {color:%1 !important;} .playerWindow a {color:%1 !important;} .playerWindow a:visited {color:%1 !important;}"},
                    {name:"Control hover color",format:"CSS color value",id:"HoverColor",sets:".playerWindow a:hover, .playerListItemTag:hover{color:%1 !important;} #playerCurrentVolume:hover, #playerSeekbarCurrent:hover {background: %1;}"},
                    {name:"Background color",format: "CSS color value",id:"BGColor",sets:".playerWindow {background-color:%1 !important}"},
                    {name:"Playlist size",format:"Width x Height",id:"PlaylistSize",func: function(value) {var data=value.split('x'); data[0]=data[0].trim(); data[1]=data[1].trim(); return '#playerList {'+(data[0]?'width:'+data[0]+'px;':'') + (data[1]?' height:'+data[1]+'px;}':'}');}},
                    {name:"Playlist margins",format:"left,right,top,bottom", id:"PlaylistMargins", func: function(value) {var data=value.split(','); return '#playerList {'+(data[0]?'margin-left:'+data[0]+'px;':'') + (data[1]?'margin-right:'+data[1]+'px;':'') + (data[2]?'margin-top:'+data[2]+'px;':'') + (data[3]?'margin-bottom:'+data[3]+'px;':'')+'}';}},
                    {name:"List item background color", format:"CSS color value", id:"ListItemBGColor",sets:".playerListItem{background-color:%1}"},
                    {name:"Played list item bg color", format:"CSS color value", id:"PlayedListItemBGColor",sets:".playerListItem[playing=true]{background-color:%1}"},
                    {name:"Volume slider width", id:"VolumeSliderWidth", sets:"#playerCurrentVolume{width:%1px}"},
                    {name:"Seekbar slider width", id:"SeekbarCurrentWidth", sets:"#playerSeekbarCurrent{width:%1px}"}];
        for(var i = 0; i < data.length;i++){
            var tr = create('tr',tbody);
            var td = create('td', tr,{"class":"playerSettingLabel"});
            td.innerHTML = data[i].name;
            if(!data[i].sets && !data[i].func) continue;
            if(data[i].format) {
                td.style.cursor = "help";
                td.title = data[i].format;
            }
            td = create('td',tr);
            var input = create('input', td);
            input.classList.add('playerSettingsInput');
            input.id = "playerSettings"+data[i].id;
            input.realid = data[i].id;
            if(playerSaveData.userCSS && playerSaveData.userCSS[input.realid]){
                input.value = playerSaveData.userCSS[input.realid];
            }
            input.sets = data[i].sets;
            input.func = data[i].func;
            input.addEventListener('change',function(){
                updateUserCSS(this);
            });
        }
        
        
        playerListMenu = create('div', null, {"id": "playerListMenu","class":"playerWindow"});
        playerListMenuDelete = create('a', playerListMenu, {"href":"#","class":"playerListItemMenuLink"});
        playerListMenuDelete.innerHTML = "Remove all...";
        playerListMenuDelete.addEventListener('click', function(e) {
            e.preventDefault();
            if(confirm('Are you sure?')){
                var items = playerList.getElementsByTagName('li');
                while(items.length > 0){
                    items[items.length-1].remove();
                }
            }
            playerListMenu.parentNode.removeChild(playerListMenu);
        });
        playerListMenuAddLocal = create('a', playerListMenu, {"class":"playerListItemMenuLink"});
        playerListMenuAddLocal.innerHTML = "Add local files...";
        playerListMenuAddLocalInput = create('input', playerListMenuAddLocal, {"type":"file","id":"playerListMenuAddLocalInput","multiple":"true"});
        playerListMenuAddLocalInput.addEventListener('change', function(e) {
            loadAll(e.target.files,false);
            playerListMenu.parentNode.removeChild(playerListMenu);
        });
        playerList.addEventListener('contextmenu', function(e) {
            if(e.target == playerList){
                e.preventDefault();
                if(playerListMenu.parentNode) playerListMenu.parentNode.removeChild(playerListMenu);
                document.body.appendChild(playerListMenu);
                playerListMenu.style.left = e.clientX + 5 + "px";
                playerListMenu.style.top = e.clientY + 5 + "px";
            }
        });
        
        playerControls2.addEventListener('contextmenu', function(e) {
            if(e.target == playerControls2){
                e.preventDefault();
                if(playerListMenu.parentNode) playerListMenu.parentNode.removeChild(playerListMenu);
                document.body.appendChild(playerListMenu);
                playerListMenu.style.left = e.clientX + 5 + "px";
                playerListMenu.style.top = e.clientY + 5 + "px";
            }
        });
        playerListItemMenu = create('div', null, {"id": "playerListItemMenu","class":"playerWindow"});
        playerListItemMenuDelete = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});

        playerListItemMenuDelete.innerHTML = "Delete";
        playerListItemMenuDelete.addEventListener('click',function(e) {
            e.preventDefault();
            playerListItemMenu.item.remove();
            playerListItemMenu.parentNode.removeChild(playerListItemMenu);
        });

        playerListItemMenuMove = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});
        playerListItemMenuMove.innerHTML = "Move";
        playerListItemMenuMove.addEventListener('click',function(e) {
            e.preventDefault();
            playerListItemMenu.item.move();
            playerListItemMenu.parentNode.removeChild(playerListItemMenu);
        });
        
        playerListItemMenu.save = create('a', playerListItemMenu, {"href":"#","class":"playerListItemMenuLink"});
        playerListItemMenu.save.innerHTML = "Save...";
        playerListItemMenu.save.addEventListener('click',function(e) {
            if(!chrome){
            e.preventDefault();
            window.open(this.href);
            }
        });
        
        
        
        playerHeader.down = false;
        playerSettingsHeader.down = false;
        document.addEventListener('mousedown',documentMouseDown);
        document.addEventListener('mouseup',documentMouseUp);
        document.addEventListener('mousemove',documentMouseMove);
        
        
        isPlayer = true;
        document.body.appendChild(playerDiv);
        addCSS();
        swmode(playerSaveData.compact);
        
    }
}

function swmode(tocompact) {
    if(tocompact === undefined) {
        tocompact = !playerSaveData.compact;
        playerSaveData.compact = !playerSaveData.compact;
    }
    var s = tocompact ? "none" : "block";
    playerImageDiv.style.display = s;
    playerList.style.display = s;
    playerControls2.style.marginTop = tocompact ? "15px" : "0px";
    putInsidePage();
}
function showMoverTargets(show) {
    if(show === undefined) {
        show = true;
    }
    var mvs = document.getElementsByClassName('playerListItemMoveTarget');
    for(var i = 0; i < mvs.length;i++) {
        if(show && mvs[i].parentNode == playerMovingListItem) continue;
        mvs[i].style.display = (show ? "block" : "none");
    }
}

function addMusic(resp,tag,url) {
    data = resp.data;
    var list = playerList;
    var item = create('li',list, {"class":"playerListItem"});
    //item.innerHTML = tag;
    var tagelem = create('span',item,{"class":"playerListItemTag"});
    tagelem.innerHTML = tag;
    tagelem.title = tag;
    if(resp.tag) {
        var realtag = tag.replace(' ','');
        if(resp.tag != realtag && resp.tag != tag){
        tagelem.innerHTML = "(!) " + tag;
        tagelem.title = "'" + tag + "' was not found, playing '" + resp.tag + "' instead.";
        }
    }
    item.move = function() {
        playerMovingListItem = this;
        showMoverTargets(false);
        showMoverTargets();
    };
    item.remove = function() {
        if(this.getAttribute('playing') == "true") {
            playerPlayer.pause();
            playerPlayer.src = "";
            playerImageDiv.innerHTML = "";
            playerTitle.innerHTML = "";
            playerTime.innerHTML = "";
            playerSeekbarCurrent.style.left = "0px";
        }
        (window.webkitURL || window.URL).revokeObjectURL(this.bloburl);
        if (/^blob:/.test(this.img.src)) (window.webkitURL || window.URL).revokeObjectURL(this.img.src);
        this.parentNode.removeChild(this);
    };
    item.addEventListener('contextmenu',function(e) {
        e.preventDefault();
        if(playerListItemMenu.parentNode)
            playerListItemMenu.parentNode.removeChild(playerListItemMenu);

        document.body.appendChild(playerListItemMenu);
        playerListItemMenu.style.left = e.clientX + 5 + "px";
        playerListItemMenu.style.top = e.clientY + 5 + "px";
        playerListItemMenu.item = this;
        playerListItemMenu.save.href = this.bloburl;
        playerListItemMenu.save.setAttribute("download",this.tag + ".ogg");
    });
    var mover = create('div', item, {"class":"playerListItemMoveTarget"});
    mover.style.display = "none";
    var mvl = create('a', mover, {"href":"#"});
    mvl.addEventListener('click',function(e) {
        e.preventDefault();
        var li = e.target.parentNode.parentNode;
        playerMovingListItem.parentNode.removeChild(playerMovingListItem);
        insertAfter(li,playerMovingListItem);
        showMoverTargets(false);
    });
    mvl.innerHTML = "[here]";
    var blob = new Blob([data],{type: 'audio/ogg'});
    item.bloburl = (window.webkitURL || window.URL).createObjectURL(blob);
    item.tag = tag;
    item.img = resp.img || create('img', null, {"id": "playerImage", "src": url});
    item.tagelem = tagelem;
    tagelem.addEventListener('click', function(e) {
        if(e.target.parentNode.bloburl){
            var items = list.getElementsByTagName('li');
            for(var i in items) {
                if(items[i].setAttribute)
                items[i].setAttribute("playing",false);
            }
            e.target.parentNode.setAttribute("playing",true);
            
            playerPlayer.src = e.target.parentNode.bloburl;
            playerTitle.innerHTML = e.target.parentNode.tag;
            playerTitle.title = e.target.parentNode.tag;
            playerPlayer.play();
            playerCurrentVolume.style.left = (playerPlayer.volume * 55)+"px";
            playerImageDiv.innerHTML = "";
            playerImageDiv.appendChild(e.target.parentNode.img);
            
        }
    });
    if(playerPlayer.paused) { tagelem.click(); }
}
    
function prevMusic() {
    var items = playerList.getElementsByTagName('li');
    for(var i = 0; i < items.length;i++)
    {
        if(items[i].getAttribute("playing") == "true")
        {
            if(playerPlayer.currentTime < 3) {
                if(i === 0)
                    items[items.length-1].tagelem.click();
                else
                    items[i-1].tagelem.click();
                return;
            }else{
                items[i].tagelem.click();
                return;
            }
        }
    }
    if(items.length > 0) items[0].tagelem.click();
}

function nextMusic(auto) {
    var items = playerList.getElementsByTagName('li');
    for(var i = 0; i < items.length;i++)
    {
        if(items[i].getAttribute("playing") == "true")
        {
            if(auto && playerSaveData.repeat == 2) {
                items[i].tagelem.click(); return;
            }
            if(playerSaveData.shuffle && items.length > 1) {
                var rnd = Math.floor(Math.random()*items.length);
                while(rnd == i) {
                    rnd = Math.floor(Math.random()*items.length);
                }
                items[rnd].tagelem.click(); return;
            }
            if(i == (items.length - 1)) {
                if(auto && playerSaveData.repeat === 0){ return;}
                items[0].tagelem.click();
            } else {
                items[i+1].tagelem.click();
            }
            return;
        }
    }
    if(items.length > 0) items[0].tagelem.click();
}
function updateUserCSS(input) {
    if(input){
        if(!playerSaveData.userCSS) {
            playerSaveData.userCSS = {};
        }
        playerSaveData.userCSS[input.realid] = input.value;
    }
    if(!playerUserStyle && playerSaveData.userCSS) {
        playerUserStyle = document.createElement('style');
        playerUserStyle.setAttribute('type', 'text/css');
        document.getElementsByTagName('head')[0].appendChild(playerUserStyle);
    }
    if(playerUserStyle){
        playerUserStyle.innerHTML = "";
        var table = document.getElementById('playerSettings');
        var elems = table.getElementsByTagName('input');
        for(var i = 0; i < elems.length;i++){
            if(elems[i].value){
                if(elems[i].sets && playerSaveData.userCSS[elems[i].realid]){
                    var add = (playerSaveData.userCSS.length<1?"":" ")+elems[i].sets.replaceAll('%1',playerSaveData.userCSS[elems[i].realid]);
                    playerUserStyle.innerHTML += add;
                }
                else if(elems[i].func && playerSaveData.userCSS[elems[i].realid]){
                    playerUserStyle.innerHTML += (playerSaveData.userCSS.length<1?"":" ")+ elems[i].func(playerSaveData.userCSS[elems[i].realid]);
                }
            }
        }
    }
}

function addCSS() {
    if(!playerStyle){
    playerStyle = document.createElement('style');
    playerStyle.setAttribute('type', 'text/css');
    playerStyle.innerHTML ='#playerList {margin-top: 15px; width: 180px; height: 200px; overflow: auto; margin-left:10px; margin-right:10px;}'+
            '.playerWindow {font-size: 12px; line-height:15px; color: darkgrey; background: #e7e7e7; position: fixed; z-index: 20;}'+
            '#playerHeader {height: 30px; cursor: move; text-align:center; position: relative; right: 0px; top: 0px;}'+
            '#playerControls {display: block; text-align: center;}'+
            '.playerListItem {cursor:pointer;, padding-top: 1px; list-style: none;}'+
            '.playerListItemMoveTarget {width:180px; height: 10px; font-size: 10px !important; text-align: center; margin-top: -2px;}'+
            '#playerImage {max-height: 120px; max-width: 180px; display: block; margin-left: auto; margin-right: auto;}'+
            '#playerClose {top: 0px; right: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
            '#playerStyleSettingsButton {top: 0px; left: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
            '#playerToggleSet {top: 0px; left: 0px; position: absolute; font-size: 10px; display: block; text-align: right; z-index: 10;}'+
            '#playerChangeMode, .playerListItemDelete, .playerListItemMove {float:right;}'+
            '.playerWindow a {color: darkgray !important; text-decoration: none !important;} .playerWindow a:visited {color: darkgray !important;} .playerWindow a:hover {color: black !important;}'+
            '#playerVolume {padding-top: 7px; height: 14px; width: 60px; display:inline-block;}'+
            '#playerVolumeSeekHeader {margin-left: auto; margin-right:auto; width:180px; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAHCAYAAAChk2fpAAAAAXNSR0IArs4c6QAAAJpJREFUWMPtV0kKACEMq4N/7Bv7SudUKOKCjo5UkpvWrTGGGkQkERExc6BFEJFk18vb2lfatzR25blW53oCmkeei+0fjWl7J/9/cBJPbe6dwJMX1+JrNnbLXTw7FmXmoC8GggXcCxrYBzWLvISwLjsbu8F4IiTiU9Q1EX4pR1ByDHxeAMC1Q7devK2xS/HaLx7oc9OK9+be4NIvFNCOIPRVVS4AAAAASUVORK5CYII="); background-repeat: no-repeat;}'+
            '#playerCurrentVolume {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
            '#playerSeekbar {padding-top: 7px; height: 14px; width: 120px; display:inline-block;}'+
            '#playerSeekbarCurrent {height: 14px; width: 5px; position:relative; display:block; background: darkgrey;}'+
            '#playerCurrentVolume:hover, #playerSeekbarCurrent:hover {background: black;}'+
            '.playerControlLink {margin-left: 2px; margin-right:2px;}'+ 
            '.playerListItemTag:hover {color: black}'+
            '.playerListItemTag {margin-left: 4px; margin-right: 4px; display:block;}'+
            '#playerTitle {width: 160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
            '#playerTime {width:160px; height:15px; overflow:hidden; margin-left:auto; margin-right:auto;}'+
            '#playerSettings {background: #e7e7e7; position: absolute; max-width:none;}'+
            '#playerSettings > tbody {display:block; padding: 0 10px 10px;}'+
            '#playerListMenu, #playerListItemMenu {padding: 2px 3px; position: fixed; background: #e7e7e7;}'+
            '.playerListItemMenuLink {width: 85px; height: 14px; display:block; overflow:hidden; overflow:hidden;}'+
            '#playerListMenuAddLocalInput{-moz-transform: scale(5) translateX(-140%); opacity: 0; width: 100%;}';
    document.getElementsByTagName('head')[0].appendChild(playerStyle);
    }
    updateUserCSS();
}

// General file extraction code
function s2a(text) {
    var a = [];
    for (var i = 0; i < text.length; i++) a.push(text.charCodeAt(i));
    return a;
}

function matches(x, pos, y) {
    if (pos + y.length > x.length) return false;
    for (var i = 0; i < y.length; i++) {
        if (x[pos+i] != y[i]) return false;
    }
    return true;
}

function SoundsArchive(files, imgDefault) {
    this.files = files;
    this.imgs = {};
    this.sounds = [];
    for (var i = 0; i < files.length; i++) {
        var tagImg = files[i].Name.match(/^(.*)\.(gif|jpe?g|png)$/i);
        if (tagImg) {
            var img = blobImage(files[i].Data);
            this.imgDefault = this.imgDefault || img;
            this.imgs[tagImg[1]] = img;
        }
        var tag = files[i].Name.match(/^(.*)\.og[ag]$/i);
        if (tag) {
            this.sounds.push({data: files[i].Data, tag: tag[1]});
        }
    }
    this.imgDefault = this.imgDefault || imgDefault;
}

SoundsArchive.prototype.getImg = function(tags) {
    for (var i = 0; i < tags.length; i++) {
        if (tags[i] in this.imgs) return this.imgs[tags[i]]();
    }
    if (typeof(this.imgDefault) == "function") this.imgDefault = this.imgDefault();
    return this.imgDefault;
}

SoundsArchive.prototype.getSound = function(tag) {
    for (var i = 0; i < this.sounds.length; i++) {
        if (this.sounds[i].tag == tag) {
            this.sounds[i].img = this.getImg([this.sounds[i].tag, tag]);
            return this.sounds[i];
        }
    }
    this.sounds[0].img = this.getImg([this.sounds[0].tag, tag]);
    return this.sounds[0];
}

function blobImage(data, cb) {
    return function() {
        var type = "image/jpeg";
        if (data[0] == 0x47) type = "image/gif";
        if (data[0] == 0x89) type = "image/png";
        var blob = new Blob([data], {type: type});
        var img = new Image();
        img.id = "playerImage";
        img.src = URL.createObjectURL(blob);
        return img;
    };
}

function loadAllFromData(raw, link, cb) {
    findFiles(new Uint8Array(raw), function(sa) {
        if (sa.sounds.length > 0) {
            showPlayer();
            for (var i = 0; i < sa.sounds.length; i++) {
                sa.sounds[i].img = sa.getImg([sa.sounds[i].tag]);
                addMusic(sa.sounds[i], sa.sounds[i].tag, link);
            }
            cb();
        }
    });
}

function findOgg(raw, tag, cb) {
    findFiles(new Uint8Array(raw), function(sa) {
        if (sa.sounds.length > 0) cb(sa.getSound(tag));
    });
}

// Determine type of embedding
function findFiles(data, cb) {
    var data2 = new Uint8Array(data.length);
    var streams = [data, data2];
    var head = [s2a("OggS\0"), s2a("Krni\0"), s2a("moot\0"), s2a("79\x06\x08\0")];
    var startedHead = [];
    for (var k = 0; k < 3; k++) startedHead[head[k][0]] = k;
    var state = unmaskLCG(data.subarray(0, 6), data2); // unmask 6 bytes ahead
    for (var i = 0; i < data.length - 6; i++) {
        for (var m = 0; m < 2; m++) { // search both unmasked and masked data
            var k = startedHead[streams[m][i]];
            if (k != undefined && matches(streams[m], i, head[k])) {
                // Unmask remainder of file
                if (m != 0) {
                    unmaskLCG(data.subarray(i+6), data2.subarray(i+6), state);
                }
                // Krni/moot replacement starting at beginning of 4chan sounds archive
                if (k != 0) {
                    var start = readTag(data, i).pos;
                    if (k == 1) replaceHeader(streams[m], s2a("Krni"), s2a("OggS"), start);
                    if (k == 2) replaceHeader(streams[m], s2a("moot"), s2a("OggS"), start);
                    if (k == 3) replaceHeader(streams[m], s2a("79\x06\x08"), s2a("OggS"), start);
                }
                findFilesClassic(streams[m], cb);
                return;
            }
        }
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        data2[i+6] = data[i+6] ^ mask;
        state += data2[i+6];
    }
    decodePNG(data, function(pixelData) {
        if (!findFilesDnsev(pixelData, cb)) {
            findFilesCornelia(pixelData, cb);
        }
    });
}

function decodePNG(data, cb) {
    var pngMagic = s2a("\x89PNG\r\n\x1A\n");
    if (!matches(data, 0, pngMagic)) return;
    var png = new PNG(data);
    if (png.hasAlphaChannel) {
        // Canvas doesn't always work for images with alpha channel;
        // use Devon Govett's Javascript PNG decoder
        var ctx = document.createElement("canvas").getContext("2d");
        var pixelData = ctx.createImageData(png.width, png.height);
        png.copyToImageData(pixelData, png.decodePixels());
        cb(pixelData);
    } else {
        // Use canvas for images without alpha channel (much faster)
        var img = new Image();
        img.onload = function() {
            var can = document.createElement("canvas");
            can.width = img.width;
            can.height = img.height;
            var ctx = can.getContext("2d");
            ctx.globalCompositeOperation  = "copy";
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(blob);
            var pixelData = ctx.getImageData(0, 0, can.width, can.height);
            cb(pixelData);
        }
        var blob = new Blob([data], {type: "image/png"});
        img.src = URL.createObjectURL(blob);
    }
}

// Krni/moot replacement
function replaceHeader(data, oldh, newh, i) {
    for (; i < data.length - 4; i++) {
        if (data[i] == oldh[0]) {
            var match = true;
            for (var j = 1; j < 4; j++) {
                if (data[i+j] != oldh[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                for (var j = 0; j < 4; j++) {
                    data[i+j] = newh[j];
                }
            }
        }
    }
}

// LCG unmasking
function unmaskLCG(src, dest, state) {
    if (dest == undefined) dest = src;
    if (state == undefined) state = 0;
    for (var i = 0; i < src.length; i++) {
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF;
        var mask = state >>> 24;
        dest[i] = src[i] ^ mask;
        state += dest[i];
    }
    return state;
}

// Find files in 4chan Sounds archive
function readTag(data, pos) {
    var def = {tag: "", pos: pos};
    var skip = s2a(' "\r\n');
    var tagEnd = pos - 1;
    while (tagEnd >= 0 && skip.indexOf(data[tagEnd]) != -1) tagEnd--;
    if (tagEnd < 0 || data[tagEnd] != "]".charCodeAt(0)) return def;
    var tagBegin = tagEnd - 1;
    while (tagBegin >= 0 && data[tagBegin] != "[".charCodeAt(0)) tagBegin--;
    if (tagBegin < 0) return def;
    var tag = "";
    for (var i = tagBegin + 1; i < tagEnd; i++) {
        tag += String.fromCharCode(data[i]);
    }
    return {tag: tag, pos: tagBegin};
}

function endOfPage(data, pos) {
    if (pos + 26 >= data.length) return data.length;
    var nSegments = data[pos+26];
    if (pos + 27 + nSegments > data.length) return data.length;
    var segLength = 0;
    for (var i = 0; i < nSegments; i++) {
        segLength += data[pos+27+i];
    }
    if (pos + 27 + nSegments + segLength > data.length) return data.length;
    return pos + 27 + nSegments + segLength;
}

function findFilesClassic(data, cb) {
    var head = s2a("OggS\0");
    var pages = [];
    for (var i = 0; i < data.length - 6; i++) {
        if (data[i] == head[0]) {
            var match = true;
            for (var j = 1; j < 5; j++) {
                if (data[i+j] != head[j]) {
                    match = false;
                    break;
                }
            }
            if (match) pages.push({start: i, flags: data[i+5]});
        }
    }
    // Lone "OggS\x00\x02" is probably hack to indicate end of data
    if (pages.length > 0 && pages[pages.length - 1].flags == 2) {
        pages.splice(-1);
    }
    var files = [];
    var nTags = 0;
    var j;
    for (var i = 0; i < pages.length; i = j) {
        j = i + 1;
        while (j < pages.length && (pages[j].flags & 2) == 0) j++;
        var tag = readTag(data, pages[i].start).tag;
        if (tag.length > 0) nTags++;
        var endPos = endOfPage(data, pages[j-1].start);
        files.push({Name: tag + ".ogg", Data: data.subarray(pages[i].start, endPos)});
    }
    if (nTags == 0 && files.length > 0) {
        var foot = s2a("4SPF");
        for (var i = pages[pages.length-1].start; i < data.length; i++) {
            if (data[i] == 0x34 && matches(data, i, foot)) {
                var files2 = findFilesFooter(data, i);
                if (files2.length > 0) {
                    cb(new SoundsArchive(files2));
                    return;
                }
            }
        }
    }
    cb(new SoundsArchive(files));
}

function findFilesFooter(data, pos) {
    if (pos - 2 < 0) return [];
    var i = pos - 2 - (data[pos-2] + 0x100*data[pos-1]);
    if (i < 0) return [];
    var files = [];
    while (i < pos - 2) {
        var n = data[i++];
        if (i + n + 8 > pos - 2) return [];
        var tag = "";
        for (var j = 0; j < n; j++) {
            tag += String.fromCharCode(data[i++]);
        }
        var fStart = data[i] + 0x100*data[i+1] + 0x10000*data[i+2] + 0x1000000*data[i+3];
        var fEnd = data[i+4] + 0x100*data[i+5] + 0x10000*data[i+6] + 0x1000000*data[i+7];
        files.push({Name: tag + ".ogg", Data: data.subarray(fStart, fEnd)});
        i += 8;
    }
    return files;
}

// Find files in Cornelia-style archive (7z in 24-bit BMP converted to PNG)
function findFilesCornelia(pixelData, cb) {
    var result7z = extract7z(pixelData);
    if (result7z == null) return;
    var files = [];
    try {
        parse7z(result7z.data, files);
    } catch(e) {
        return;
    }
    var imgDefault = cropCornelia(pixelData, result7z.firstRow);
    cb(new SoundsArchive(files, imgDefault));
}

function cropCornelia(pixelData, firstRow) {
    return function() {
        var can0 = document.createElement("canvas");
        can0.width = pixelData.width;
        can0.height = pixelData.height;
        can0.getContext("2d").putImageData(pixelData, 0, 0);
        var can;
        if (firstRow != 0) {
            can = document.createElement("canvas");
            can.width = can0.width;
            can.height = firstRow;
            can.getContext("2d").drawImage(can0, 0, 0, can0.width, firstRow, 0, 0, can0.width, firstRow);
        } else {
            can = can0;
        }
        can.id = "playerImage";
        return can;
    };
}

function extract7z(pixelData) {
    var data = new BMPdata(pixelData);
    var start = data.indexOf(MAGIC_7Z);
    if (start != -1) {
        var size = 32 + data.readInt(start + 12, 8) + data.readInt(start + 20, 8);
        var data7z = data.slice(start, start + size);
        var firstRow = data.height - 1 - Math.floor((start + size - 1) / data.rowSize);
        return {data: data7z, firstRow: firstRow};
    } else {
        return null;
    }
}

function BMPdata(pixelData) {
    this.data = pixelData.data;
    this.width = pixelData.width;
    this.height = pixelData.height;
    this.rowSize = Math.ceil(pixelData.width * 3 / 4) * 4;
}

BMPdata.prototype.slice = function(istart, iend) {
    var row = this.height - 1 - Math.floor(istart / this.rowSize);
    var col = Math.floor((istart % this.rowSize) / 3);
    var ch = (istart % this.rowSize) % 3;
    var a = new Uint8Array(iend - istart);
    var i = 0;
    while (row >= 0) {
        while (3*col + ch < this.rowSize) {
            a[i++] = (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
            if (i >= iend - istart) return a;
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        col = 0;
        ch = 0;
        row--;
    }
    return a;
}

BMPdata.prototype.indexOf = function(s) {
    var row = this.height - 1;
    var col = 0;
    var ch = 0;
    var x = "";
    var offset = 0;
    while (row >= 0) {
        offset += x.length;
        x = x.substring(x.length - s.length + 1);
        offset -= x.length;
        while (3*col + ch < this.rowSize) {
            x += String.fromCharCode((col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0);
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        var i = x.indexOf(s);
        if (i != -1) return offset + i;
        col = 0;
        ch = 0;
        row--;
    }
    return -1;
}

BMPdata.prototype.readByte = function(pos) {
    var row = this.height - 1 - Math.floor(pos / this.rowSize);
    if (row < 0) throw new Error("end of file");
    var col = Math.floor((pos % this.rowSize) / 3);
    var ch = (pos % this.rowSize) % 3;
    return (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
}

BMPdata.prototype.readInt = function(pos, len) {
    var n = 0;
    var x = 1;
    for (var i = 0; i < len; i++) {
        n += this.readByte(pos + i) * x;
        x *= 256;
    }
    if (n > (1<<30) * (1<<23)) throw new Error("integer overflow");
    return n;
}

// Find files in archive embedded in PNG using least-significant-bits steganography
// See https://github.com/dnsev/4cs

// Glue code
function findFilesDnsev(pixelData, cb) {
    var result = new DataImageReader(new DataImage(pixelData)).unpack();
    if (typeof(result) == "string") return false;
    var files = [];
    for (var i = 0; i < result[0].length; i++) {
        files.push({Name: result[0][i], Data: result[1][i]});
    }
    cb(new SoundsArchive(files));
    return true;
}

function DataImage(pixelData) {
    this.pixels = pixelData.data;
    this.width = pixelData.width;
    this.height = pixelData.height;
}
DataImage.prototype.get_pixel = function(x, y, c) {
    return this.pixels[(x + y * this.width) * 4 + c];
}

// Code from https://github.com/dnsev/4cs
function DataImageReader (image) {
    this.image = image;
    this.bitmask = 0;
    this.value_mask = 0;
    this.pixel_mask = 0xFF;
    this.x = 0;
    this.y = 0;
    this.c = 0;
    this.bit_value = 0;
    this.bit_count = 0;
    this.pixel_pos = 0;
    this.scatter_pos = 0;
    this.scatter_range = 0;
    this.scatter_full_range = 0;
    this.scatter = false;
    this.channels = 0;
    this.hashmasking = false;
    this.hashmask_length = 0;
    this.hashmask_index = 0;
    this.hashmask_value = null;
}
DataImageReader.prototype.unpack = function () {
    try {
        return this.__unpack();
    }
    catch (e) {
        return "Error extracting data; image file likely doesn't contain data";
    }
}
DataImageReader.prototype.__unpack = function () {
    // Init
    this.x = 0;
    this.y = 0;
    this.c = 0;
    this.bit_value = 0;
    this.bit_count = 0;
    this.pixel_pos = 0;
    this.scatter_pos = 0;
    this.scatter_range = 0;
    this.scatter_full_range = 0;
    this.scatter = false;
    this.channels = 3;
    this.hashmasking = false;
    this.hashmask_length = 0;
    this.hashmask_index = 0;
    this.hashmask_value = null;

    // Read bitmask
    this.bitmask = 1 + this.__read_pixel(0x07);
    this.value_mask = (1 << this.bitmask) - 1;
    this.pixel_mask = 0xFF - this.value_mask;

    // Flags
    var flags = this.__read_pixel(0x07);
    // Bit depth
    if ((flags & 4) != 0) this.channels = 4;

    // Exflags
    var metadata = false;
    if ((flags & 1) != 0) {
        // Flags
        var flags2 = this.__data_to_int(this.__extract_data(1));
        // Evaluate
        if ((flags2 & 2) != 0) metadata = true;
        if ((flags2 & 4) != 0) {
            this.__complete_pixel();
            this.__init_hashmask();
        }
    }

    // Scatter
    if ((flags & 2) != 0) {
        // Read
        this.scatter_range = this.__data_to_int(this.__extract_data(4));
        this.__complete_pixel();

        // Enable scatter
        if (this.scatter_range > 0) {
            this.scatter_pos = 0;
            this.scatter_full_range = ((this.image.width * this.image.height * this.channels) - this.pixel_pos - 1);
            this.scatter = true;
        }
    }

    // Metadata
    if (metadata) {
        var meta_length = this.__data_to_int(this.__extract_data(2));
        var meta = this.__extract_data(meta_length);
    }

    // File count
    var file_count = this.__data_to_int(this.__extract_data(2));

    // Filename lengths and file lengths
    var filename_lengths = new Array();
    var file_sizes = new Array();
    var v;
    var total_size = 0;
    var size_limit;
    for (var i = 0; i < file_count; ++i) {
        // Filename length
        v = this.__data_to_int(this.__extract_data(2));
        filename_lengths.push(v);
        total_size += v;
        // File length
        v = this.__data_to_int(this.__extract_data(4));
        file_sizes.push(v);
        total_size += v;

        // Error checking
        size_limit = Math.ceil(((((this.image.width * (this.image.height - this.y) - this.x) * this.channels) - this.c) * this.bitmask) / 8);
        if (total_size > size_limit) {
            throw "Data overflow";
        }
    }

    // Filenames
    var filenames = new Array();
    for (var i = 0; i < file_count; ++i) {
        // Filename
        var fn = this.__data_to_string(this.__extract_data(filename_lengths[i]));
        try {
            fn = decodeURIComponent(escape(fn)); // UTF-8 decode
        } catch(e) {}
        // Add to list
        filenames.push(fn);
    }

    // Sources
    var sources = new Array();
    for (var i = 0; i < file_count; ++i) {
        // Read source
        var src = this.__extract_data(file_sizes[i]);
        sources.push(src);
    }

    // Done
    this.hashmasking = false;
    this.hashmask_value = null;
    return [ filenames , sources ];
}
DataImageReader.prototype.next_pixel_component = function (count) {
    while (count > 0) {
        count -= 1;

        this.c = (this.c + 1) % this.channels;
        if (this.c == 0) {
            this.x = (this.x + 1) % this.image.width;
            if (this.x == 0) {
                this.y = (this.y + 1) % this.image.height;
                if (this.y == 0) {
                    throw "Pixel overflow";
                }
            }
        }
    }
}
DataImageReader.prototype.__extract_data = function (byte_length) {
    var src = new Uint8Array(byte_length);
    var j = 0;
    for (var i = this.bit_count; i < byte_length * 8; i += this.bitmask) {
        this.bit_value = this.bit_value | (this.__read_pixel(this.value_mask) << this.bit_count);
        this.bit_count += this.bitmask;
        while (this.bit_count >= 8) {
            src[j] = (this.bit_value & 0xFF);
            j += 1;
            this.bit_value = this.bit_value >> 8;
            this.bit_count -= 8;
        }
    }
    if (j != byte_length) {
        throw "Length mismatch";
    }
    return src;
}
DataImageReader.prototype.__data_to_int = function (data) {
    var val = 0;
    for (var i = 0; i < data.length; ++i) {
        val = val * 256 + data[i];
    }
    return val;
}
DataImageReader.prototype.__data_to_string = function (data) {
    var val = "";
    for (var i = 0; i < data.length; ++i) {
        val += String.fromCharCode(data[i]);
    }
    return val;
}
DataImageReader.prototype.__read_pixel = function (value_mask) {
    var value = (this.image.get_pixel(this.x, this.y, this.c) & value_mask);
    if (this.hashmasking) {
        value = this.__decode_hashmask(value, this.bitmask);
    }

    if (this.scatter) {
        this.scatter_pos += 1;
        // integer division sure is fun
        var v = ((Math.floor(this.scatter_pos * this.scatter_full_range / this.scatter_range) - Math.floor((this.scatter_pos - 1) * this.scatter_full_range / this.scatter_range)));
        this.pixel_pos += v;
        this.next_pixel_component(v);
    }
    else {
        this.pixel_pos += 1;
        this.next_pixel_component(1);
    }

    return value;
}
DataImageReader.prototype.__complete_pixel = function () {
    if (this.bit_count > 0) {
        this.bit_count = 0;
        this.bit_value = 0;
    }
}
DataImageReader.prototype.__init_hashmask = function () {
    this.hashmasking = true;
    this.hashmask_length = 32 * 8;
    this.hashmask_index = 0;
    this.hashmask_value = new Uint8Array(this.hashmask_length / 8);
    for (var i = 0; i < this.hashmask_length / 8; ++i) {
        this.hashmask_value[i] = (1 << ((i % 8) + 1)) - 1;
    }
    this.__calculate_hashmask();
    this.hashmask_index = 0;
}
DataImageReader.prototype.__calculate_hashmask = function () {
    // Vars
    var x = 0;
    var y = 0;
    var c = 0;
    var w = this.image.width;
    var h = this.image.height;
    var cc = this.channels;

    // First 2 flag pixels
    this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
    if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
    this.__update_hashmask(this.image.get_pixel(x, y, c) >> 3, 5);
    if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;

    // All other pixels
    if (this.bitmask != 8) {
        while (true) {
            // Update
            this.__update_hashmask(this.image.get_pixel(x, y, c) >> this.bitmask, 8 - this.bitmask);
            // Next
            if ((c = (c + 1) % cc) == 0 && (x = (x + 1) % w) == 0 && (y = (y + 1) % h) == 0) return;
        }
    }
}
DataImageReader.prototype.__update_hashmask = function (value, bits) {
    // First 2 flag pixels
    var b;
    while (true) {
        // Number of bits that can be used on this index
        b = 8 - (this.hashmask_index % 8);
        if (bits <= b) {
            // Apply
            this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value) << (this.hashmask_index % 8);
            // Done
            this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
            return;
        }
        else {
            // Partial apply
            this.hashmask_value[Math.floor(this.hashmask_index / 8)] ^= (value & ((1 << b) - 1)) << (this.hashmask_index % 8);
            // Done
            this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
            bits -= b;
            value >>= b;
        }
    }
}
DataImageReader.prototype.__decode_hashmask = function (value, bits) {
    var b;
    var off = 0;
    while (true) {
        b = 8 - (this.hashmask_index % 8);
        if (bits <= b) {
            // Apply
            value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << bits) - 1)) << off;
            // Done
            this.hashmask_index = (this.hashmask_index + bits) % (this.hashmask_length);
            return value;
        }
        else {
            // Partial apply
            value ^= (this.hashmask_value[Math.floor(this.hashmask_index / 8)] & ((1 << b) - 1)) << off;
            // Done
            this.hashmask_index = (this.hashmask_index + b) % (this.hashmask_length);
            bits -= b;
            off += b;
        }
    }
}
// End code from https://github.com/dnsev/4cs

// 7z extraction code
var MAGIC_7Z = "7z\xBC\xAF\x27\x1C";

function parse7z(data, files, headers) {
    if (files == undefined) files = [];
    if (headers == undefined) headers = {};

    var kNames =
        "End Header ArchiveProperties AdditionalStreamsInfo MainStreamsInfo FilesInfo PackInfo UnPackInfo "
        + "SubStreamsInfo Size CRC Folder CodersUnPackSize NumUnPackStream EmptyStream EmptyFile "
        + "Anti Names CTime ATime MTime Attributes Comment EncodedHeader StartPos Dummy";
    kNames = kNames.split(" ");
    var k = {};
    for (var i = 0; i < kNames.length; i++) k[kNames[i]] = i;

    var pos = 0;
    var nBits = 0;
    var bits = 0;

    function ParseError(message) {
        this.name = "ParseError";
        this.message = message;
        this.pos = pos;
    }
    ParseError.prototype = new Error();
    ParseError.prototype.constructor = ParseError;

    function readN(f, n) {
        var x = [];
        for (var i = 0; i < n; i++) x.push(f());
        return x;
    }

    function nextByte() {
        if (pos >= data.length) throw new ParseError("passed end of file");
        return data[pos++];
    }

    function nextBit() {
        if (nBits == 0) {
            bits = nextByte();
            nBits = 8;
        }
        nBits -= 1;
        var b = (bits >> nBits) & 1;
        return b;
    }

    function nextInt(len) {
        var n = 0;
        var x = 1;
        for (var i = 0; i < len; i++) {
            n += nextByte() * x;
            x *= 256;
        }
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextInt7z() {
        var b0 = nextByte();
        var thresh = 128;
        var n = 0;
        var x = 1;
        while (b0 >= thresh && thresh > 0) {
            n += nextByte() * x;
            x *= 256;
            b0 -= thresh;
            thresh >>= 1;
        }
        n += b0 * x;
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextBinString(len) {
        var s = "";
        for (var i = 0; i < len; i++) {
            s += String.fromCharCode(nextByte());
        }
        return s;
    }

    function ArchiveProperties() {
        var x = {};
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var n = nextInt7z();
            x["Property"+ID] = readN(nextByte, n);
        }
    }

    function Digests(NumStreams) {
        var x = [];
        var AllAreDefined = nextByte();
        if (!AllAreDefined) var Defined = readN(nextBit, NumStreams);
        for (var i = 0; i < NumStreams; i++) {
            if (AllAreDefined || Defined[i]) x[i] = nextInt(4);
        }
        return x;
    }

    function PackInfo() {
        var x = [];
        var Pos = 32 + nextInt7z();
        var NumStreams = nextInt7z();
        for (var i = 0; i < NumStreams; i++) x.push({});
        if (NumStreams >= 1) x[0].Start = Pos;

        var ID = nextByte();
        if (ID == k.Size) {
            for (var i = 0; i < NumStreams; i++) {
                x[i].Start = Pos;
                x[i].Size = nextInt7z();
                Pos += x[i].Size;
            }
            ID = nextByte();
        }
        if (ID == k.CRC) {
            for (var i = 0; i < NumStreams; i++) x[i].Digest = nextInt7z();
            ID = nextByte();
        }
        if (ID != 0) throw new ParseError("unexpected block id " + ID);

        return x;
    }

    function Folder() {
        var x = {}

        var NumCoders = nextInt7z();
        x.Coders = [];
        x.NumInStreams = 0;
        x.NumOutStreams = 0;
        for (var i = 0; i < NumCoders; i++) {
            var y = {};
            var b = nextByte();
            var CodecIdSize = b & 0xF;
            var IsComplexCoder = b & 0x10;
            var ThereAreAttributes = b & 0x20;
            var AlternativeMethods = b & 0x80;
            if (AlternativeMethods) throw new ParseError("not supported");
            y.CodecId = nextBinString(CodecIdSize);
            if (IsComplexCoder) {
                y.NumInStreams = nextInt7z();
                y.NumOutStreams = nextInt7z();
            } else {
                y.NumInStreams = 1;
                y.NumOutStreams = 1;
            }
            x.NumInStreams += y.NumInStreams;
            x.NumOutStreams += y.NumOutStreams;
            if (ThereAreAttributes) {
                var PropertiesSize = nextInt7z();
                y.Properties = readN(nextByte, PropertiesSize);
            }
            x.Coders.push(y);
        }

        var NumBindPairs = x.NumOutStreams - 1;
        x.BindInStream = []
        x.BindOutStream = []
        for (var i = 0; i < NumBindPairs; i++) {
            var InIndex = nextInt7z();
            var OutIndex = nextInt7z();
            x.BindInStream[OutIndex] = InIndex;
            x.BindOutStream[InIndex] = OutIndex;
        }
        
        var NumPackStreams = x.NumInStreams - NumBindPairs;
        if (NumPackStreams == 1) {
            for (var i = 0; i < x.NumInStreams; i++) {
                if (x.BindOutStream[i] == undefined) x.PackStreams = [i];
            }
        } else {
            x.PackStreams = readN(nextInt7z, NumPackStreams);
        }

        return x;
    }

    function CodersInfo(Folders) {
        var ID = nextByte();

        if (ID != k.Folder) throw new ParseError("unexpected block id " + ID);
        var NumFolders = nextInt7z();
        var External = nextByte();
        if (External) throw new ParseError("not supported");
        for (var i = 0; i < NumFolders; i++) {
            Folders.push(Folder());
        }
        ID = nextByte();

        if (ID != k.CodersUnPackSize) throw new ParseError("unexpected block id " + ID);
        for (var i = 0; i < NumFolders; i++) {
            Folders[i].OutSizes = readN(nextInt7z, Folders[i].NumOutStreams);
            for (var j = 0; j < Folders[i].NumOutStreams; j++) {
                if (Folders[i].BindInStream[j] == undefined) {
                    Folders[i].UnPackSize = Folders[i].OutSizes[j];
                }
            }
        }
        ID = nextByte();

        if (ID == k.CRC) {
            var UnPackDigests = Digests(NumFolders);
            for (var i = 0; i < NumFolders; i++) {
                if (i in UnPackDigests) Folders[i].UnPackDigest = UnPackDigests[i];
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function SubStreamsInfo(Folders, SubStreams, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.NumUnPackStream) {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = nextInt7z();
            ID = nextByte();
        } else {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = 1;
        }
        for (var i = 0; i < Folders.length; i++) {
            for (var j = 0; j < Folders[i].NumSubStreams; j++) SubStreams.push({});
        }

        if (ID == k.Size) {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams != 0) {
                    var SumSizes = 0;
                    for (var j = 0; j < Folders[i].NumSubStreams - 1; j++) {
                        var n = nextInt7z();
                        SubStreams[iSubStream++].Size = n;
                        SumSizes += n;
                    }
                    SubStreams[iSubStream++].Size = Folders[i].UnPackSize - SumSizes;
                }
            }
            ID = nextByte();
        } else {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1) {
                    SubStreams[iSubStream].Size = Folders[i].UnPackSize;
                }
                iSubStream += Folders[i].NumSubStreams;
            }
        }

        if (ID == k.CRC) {
            var NumUnknownDigests = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (!(Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined)) {
                    NumUnknownDigests += Folders[i].NumSubStreams;
                }
            }
            var UnknownDigests = Digests(NumUnknownDigests);
            var iDigest = 0;
            iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined) {
                    SubStreams[iSubStream++].Digest = Folders[i].UnPackDigest;
                } else {
                    for (var j = 0; j < Folders[i].NumSubStreams; j++) {
                        if (iDigest in UnknownDigests) {
                            SubStreams[iSubStream++].Digest = UnknownDigests[iDigest++];
                        }
                    }
                }
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function StreamsInfo(x, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.PackInfo) {
            x.PackStreams = PackInfo();
            ID = nextByte();
        } else {
            x.PackStreams = [];
        }

        x.Folders = [];
        if (ID == k.UnPackInfo) {
            CodersInfo(x.Folders);
            ID = nextByte();
        }

        x.SubStreams = [];
        if (ID == k.SubStreamsInfo) {
            SubStreamsInfo(x.Folders, x.SubStreams);
            ID = nextByte();
        } else {
            SubStreamsInfo(x.Folders, x.SubStreams, true);
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function FilesInfo() {
        var x = {};
        x.NumFiles = nextInt7z();
        x.Names = [];
        x.EmptyStream = [];
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var PropertySize = nextInt7z();
            if (ID == k.Names && PropertySize > 1) {
                var External = nextByte();
                if (External) throw new ParseError("not supported");
                for (var i = 0; i < x.NumFiles; i++) {
                    var s = "";
                    while (true) {
                        var c = nextInt(2);
                        if (c == 0) break;
                        s += String.fromCharCode(c);
                    }
                    x.Names.push(s);
                }
            } else if (ID == k.EmptyStream) {
                x.EmptyStream = readN(nextBit, x.NumFiles);
            } else {
                x[kNames[ID] || ("Property"+ID)] = readN(nextByte, PropertySize);
            }
        }
    }

    if (nextBinString(6) != MAGIC_7Z) throw new Error ("not a 7z file");
    headers.MajorVersion = nextByte();
    headers.MinorVersion = nextByte();
    headers.StartHeaderCRC = nextInt(4);
    headers.NextHeaderOffset = nextInt(8);
    headers.NextHeaderSize = nextInt(8);
    headers.NextHeaderCRC = nextInt(4);
    headers.FullSize = 32 + headers.NextHeaderOffset + headers.NextHeaderSize;
    headers.SplitArchive = (data.length < headers.FullSize);
    if (headers.SplitArchive) return;

    pos = 32 + headers.NextHeaderOffset;
    var ID = nextByte();
    if (ID == k.EncodedHeader) throw new ParseError("not supported");
    if (ID != k.Header) throw new ParseError("unexpected block id " + ID);

    ID = nextByte();
    if (ID == k.ArchiveProperties) {
        headers.ArchiveProperties = ArchiveProperties();
        ID = nextByte();
    }
    if (ID == k.AdditionalStreamsInfo) {
        headers.AdditionalStreamsInfo = {};
        StreamsInfo(headers.AdditionalStreamsInfo);
        ID = nextByte();
    }
    if (ID == k.MainStreamsInfo) {
        StreamsInfo(headers);
        ID = nextByte();
    } else {
        StreamsInfo(headers, true);
    }
    if (ID == k.FilesInfo) {
        headers.FilesInfo = FilesInfo();
        ID = nextByte();
    }
    if (ID != 0) throw new ParseError("unexpected block id " + ID);

    var iPackStream = 0;
    var iSubStream = 0;
    for (var i = 0; i < headers.Folders.length; i++) {
        if (
            headers.Folders[i].Coders.length == 1
            && headers.Folders[i].Coders[0].CodecId == "\x00"
            && headers.Folders[i].NumInStreams == 1
            && headers.Folders[i].NumOutStreams == 1
        ) {
            var Pos = headers.PackStreams[iPackStream].Start;
            for (var j = 0; j < headers.Folders[i].NumSubStreams; j++) {
                if (Pos != undefined) {
                    headers.SubStreams[iSubStream].Start = Pos;
                    if (headers.SubStreams[iSubStream].Size != undefined) {
                        Pos += headers.SubStreams[iSubStream].Size;
                    } else {
                        Pos = undefined;
                    }
                }
                iSubStream++;
            }
        }
        iPackStream += headers.Folders[i].PackStreams.length;
    }

    if (headers.FilesInfo != undefined) {
        var iSubStream = 0;
        for (var i = 0; i < headers.FilesInfo.NumFiles; i++) {
            files[i] = {};
            files[i].Name = headers.FilesInfo.Names[i];
            files[i].Empty = headers.FilesInfo.EmptyStream[i];
            if (!files[i].Empty) {
                files[i].Start = headers.SubStreams[iSubStream].Start;
                files[i].Size = headers.SubStreams[iSubStream].Size;
                files[i].Digest = headers.SubStreams[iSubStream].Digest;
                if (files[i].Start != undefined && files[i].Size != undefined) {
                    files[i].Data = data.subarray(files[i].Start, files[i].Start + files[i].Size);
                }
                iSubStream++;
            }
        }
    }
}
// end of 7z extraction code

// PNG extraction code from https://github.com/devongovett/png.js/

/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

var FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();

// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
# software and associated documentation files (the "Software"), to deal in the Software 
# without restriction, including without limitation the rights to use, copy, modify, merge, 
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
# to whom the Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or 
# substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {
  var PNG;

  PNG = (function() {
    var APNG_BLEND_OP_OVER, APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_NONE, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;

    PNG.load = function(url, canvas, callback) {
      var xhr,
        _this = this;
      if (typeof canvas === 'function') {
        callback = canvas;
      }
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        var data, png;
        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
        png = new PNG(data);
        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
          png.render(canvas);
        }
        return typeof callback === "function" ? callback(png) : void 0;
      };
      return xhr.send(null);
    };

    APNG_DISPOSE_OP_NONE = 0;

    APNG_DISPOSE_OP_BACKGROUND = 1;

    APNG_DISPOSE_OP_PREVIOUS = 2;

    APNG_BLEND_OP_SOURCE = 0;

    APNG_BLEND_OP_OVER = 1;

    function PNG(data) {
      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
      this.data = data;
      this.pos = 8;
      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.animation = null;
      this.text = {};
      frame = null;
      while (true) {
        chunkSize = this.readUInt32();
        section = ((function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(String.fromCharCode(this.data[this.pos++]));
          }
          return _results;
        }).call(this)).join('');
        switch (section) {
          case 'IHDR':
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;
          case 'acTL':
            this.animation = {
              numFrames: this.readUInt32(),
              numPlays: this.readUInt32() || Infinity,
              frames: []
            };
            break;
          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;
          case 'fcTL':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.pos += 4;
            frame = {
              width: this.readUInt32(),
              height: this.readUInt32(),
              xOffset: this.readUInt32(),
              yOffset: this.readUInt32()
            };
            delayNum = this.readUInt16();
            delayDen = this.readUInt16() || 100;
            frame.delay = 1000 * delayNum / delayDen;
            frame.disposeOp = this.data[this.pos++];
            frame.blendOp = this.data[this.pos++];
            frame.data = [];
            break;
          case 'IDAT':
          case 'fdAT':
            if (section === 'fdAT') {
              this.pos += 4;
              chunkSize -= 4;
            }
            data = (frame != null ? frame.data : void 0) || this.imgData;
            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
              data.push(this.data[this.pos++]);
            }
            break;
          case 'tRNS':
            this.transparency = {};
            switch (this.colorType) {
              case 3:
                this.transparency.indexed = this.read(chunkSize);
                short = 255 - this.transparency.indexed.length;
                if (short > 0) {
                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                    this.transparency.indexed.push(255);
                  }
                }
                break;
              case 0:
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(chunkSize);
            }
            break;
          case 'tEXt':
            text = this.read(chunkSize);
            index = text.indexOf(0);
            key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;
          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.colors = (function() {
              switch (this.colorType) {
                case 0:
                case 3:
                case 4:
                  return 1;
                case 2:
                case 6:
                  return 3;
              }
            }).call(this);
            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;
            this.colorSpace = (function() {
              switch (this.colors) {
                case 1:
                  return 'DeviceGray';
                case 3:
                  return 'DeviceRGB';
              }
            }).call(this);
            this.imgData = new Uint8Array(this.imgData);
            return;
          default:
            this.pos += chunkSize;
        }
        this.pos += 4;
        if (this.pos > this.data.length) {
          throw new Error("Incomplete or corrupt PNG file");
        }
      }
      return;
    }

    PNG.prototype.read = function(bytes) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
        _results.push(this.data[this.pos++]);
      }
      return _results;
    };

    PNG.prototype.readUInt32 = function() {
      var b1, b2, b3, b4;
      b1 = this.data[this.pos++] << 24;
      b2 = this.data[this.pos++] << 16;
      b3 = this.data[this.pos++] << 8;
      b4 = this.data[this.pos++];
      return b1 | b2 | b3 | b4;
    };

    PNG.prototype.readUInt16 = function() {
      var b1, b2;
      b1 = this.data[this.pos++] << 8;
      b2 = this.data[this.pos++];
      return b1 | b2;
    };

    PNG.prototype.decodePixels = function(data) {
      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
      if (data == null) {
        data = this.imgData;
      }
      if (data.length === 0) {
        return new Uint8Array(0);
      }
      data = new FlateStream(data);
      data = data.getBytes();
      pixelBytes = this.pixelBitlength / 8;
      scanlineLength = pixelBytes * this.width;
      pixels = new Uint8Array(scanlineLength * this.height);
      length = data.length;
      row = 0;
      pos = 0;
      c = 0;
      while (pos < length) {
        switch (data[pos++]) {
          case 0:
            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
              pixels[c++] = data[pos++];
            }
            break;
          case 1:
            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;
          case 2:
            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (upper + byte) % 256;
            }
            break;
          case 3:
            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;
          case 4:
            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
              }
              p = left + upper - upperLeft;
              pa = Math.abs(p - left);
              pb = Math.abs(p - upper);
              pc = Math.abs(p - upperLeft);
              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }
              pixels[c++] = (byte + paeth) % 256;
            }
            break;
          default:
            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++;
      }
      return pixels;
    };

    PNG.prototype.decodePalette = function() {
      var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
      palette = this.palette;
      transparency = this.transparency.indexed || [];
      ret = new Uint8Array((transparency.length || 0) + palette.length);
      pos = 0;
      length = palette.length;
      c = 0;
      for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
        ret[pos++] = palette[i];
        ret[pos++] = palette[i + 1];
        ret[pos++] = palette[i + 2];
        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
      }
      return ret;
    };

    PNG.prototype.copyToImageData = function(imageData, pixels) {
      var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
      colors = this.colors;
      palette = null;
      alpha = this.hasAlphaChannel;
      if (this.palette.length) {
        palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
        colors = 4;
        alpha = true;
      }
      data = imageData.data || imageData;
      length = data.length;
      input = palette || pixels;
      i = j = 0;
      if (colors === 1) {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          v = input[k++];
          data[i++] = v;
          data[i++] = v;
          data[i++] = v;
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      } else {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      }
    };

    PNG.prototype.decode = function() {
      var ret;
      ret = new Uint8Array(this.width * this.height * 4);
      this.copyToImageData(ret, this.decodePixels());
      return ret;
    };

    scratchCanvas = document.createElement('canvas');

    scratchCtx = scratchCanvas.getContext('2d');

    makeImage = function(imageData) {
      var img;
      scratchCtx.width = imageData.width;
      scratchCtx.height = imageData.height;
      scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
      scratchCtx.putImageData(imageData, 0, 0);
      img = new Image;
      img.src = scratchCanvas.toDataURL();
      return img;
    };

    PNG.prototype.decodeFrames = function(ctx) {
      var frame, i, imageData, pixels, _i, _len, _ref, _results;
      if (!this.animation) {
        return;
      }
      _ref = this.animation.frames;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        frame = _ref[i];
        imageData = ctx.createImageData(frame.width, frame.height);
        pixels = this.decodePixels(new Uint8Array(frame.data));
        this.copyToImageData(imageData, pixels);
        frame.imageData = imageData;
        _results.push(frame.image = makeImage(imageData));
      }
      return _results;
    };

    PNG.prototype.renderFrame = function(ctx, number) {
      var frame, frames, prev;
      frames = this.animation.frames;
      frame = frames[number];
      prev = frames[number - 1];
      if (number === 0) {
        ctx.clearRect(0, 0, this.width, this.height);
      }
      if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
        ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
      } else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
        ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
      }
      if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
        ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
      }
      return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
    };

    PNG.prototype.animate = function(ctx) {
      var doFrame, frameNumber, frames, numFrames, numPlays, _ref,
        _this = this;
      frameNumber = 0;
      _ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
      return (doFrame = function() {
        var f, frame;
        f = frameNumber++ % numFrames;
        frame = frames[f];
        _this.renderFrame(ctx, f);
        if (numFrames > 1 && frameNumber / numFrames < numPlays) {
          return _this.animation._timeout = setTimeout(doFrame, frame.delay);
        }
      })();
    };

    PNG.prototype.stopAnimation = function() {
      var _ref;
      return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
    };

    PNG.prototype.render = function(canvas) {
      var ctx, data;
      if (canvas._png) {
        canvas._png.stopAnimation();
      }
      canvas._png = this;
      canvas.width = this.width;
      canvas.height = this.height;
      ctx = canvas.getContext("2d");
      if (this.animation) {
        this.decodeFrames(ctx);
        return this.animate(ctx);
      } else {
        data = ctx.createImageData(this.width, this.height);
        this.copyToImageData(data, this.decodePixels());
        return ctx.putImageData(data, 0, 0);
      }
    };

    return PNG;

  })();

  window.PNG = PNG;

}).call(this);

// end of PNG extraction code

hyperlink();
if(!archive){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if(MutationObserver) {
        var postobs = new MutationObserver(function(records) {
            for(var i = 0; i < records.length; i++) {
                var e = records[i];
                if(e.type == "childList"){
                    if(e.addedNodes){
                        for(var j = 0; j < e.addedNodes.length;j++) {
                            var target = e.addedNodes[j];
                            if(target.classList){
                                if(target.classList.contains('inline')) {
                                    rehyperlink(target);
                                }else if(target.classList.contains('postContainer')) {
                                    hyperlinkone(target);
                                }else if(target.classList.contains('backlinkHr')) {
                                    rehyperlink(target.parentNode.parentNode);
                                }
                            }
                        }
                    }
                }
            }
        });
        postobs.observe(document.getElementsByClassName('board')[0],{childList:true,subtree:true,characterData:true});

    }else{
        document.getElementsByClassName('board')[0].addEventListener('DOMNodeInserted', function(e)
        {
            if(!e.target.classList) return;
            if(e.target.classList.contains('inline')){
                rehyperlink(e.target);
            }else if(e.target.classList.contains('postContainer')){
                hyperlinkone(e.target);
            }
        });
    }
    var relNode = document.getElementById('settingsWindowLink').nextSibling;
    var playerShowLink = create('a',null,{'class':"settingsWindowLinkBot"});
    var bracket = document.createTextNode('] [');
    var elem = document.getElementById('navtopright');
    elem.insertBefore(playerShowLink,relNode);
    elem.insertBefore(bracket,playerShowLink);
    playerShowLink.innerHTML = "Show player";
    playerShowLink.href = "#";
    playerShowLink.addEventListener('click',function(e) {
        e.preventDefault();
        showPlayer();
    });

}
