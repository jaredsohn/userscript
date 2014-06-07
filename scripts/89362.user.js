// ==UserScript==
// @name           Bleach Exile
// @namespace      http://manga.bleachexile.com/
// @include        http://manga.bleachexile.com/*.html*
// ==/UserScript==

var modifyTitle = true;
var cacheNextImage = true;
var showCacheMessage = true;
var windowFit = true;

setTimeout(function() {
    
    var mainTD = null;
    var mainAnchor = null;
    var mainImage = null;
    
    var findImage = function() {
        tdList = document.getElementsByClassName('page_image');
        for (var t = 0; t < tdList.length; t++) {
            for (var tc = 0; tc < tdList[t].childNodes.length; tc++) {
                if (tdList[t].childNodes[tc].nodeName.toLowerCase() == 'a') {
                    for (var ac = 0; ac < tdList[t].childNodes[tc].childNodes.length; ac++) {
                        if (tdList[t].childNodes[tc].childNodes[ac].nodeName.toLowerCase() == 'img') {
                            mainImage = tdList[t].childNodes[tc].childNodes[ac];
                            mainAnchor = tdList[t].childNodes[tc];
                            mainTD = tdList[t];
                            return true;
                        }
                    }
                }
                else if (tdList[t].childNodes[tc].nodeName.toLowerCase() == 'img') {
                    mainImage = tdList[t].childNodes[tc];
                    mainTD = tdList[t];
                    return true;
                }
            }
        }
        return false;
    };
    findImage();
    
    if (mainImage) {
        if (mainImage.parentNode.nodeName.toLowerCase() == 'a') {
            mainAnchor = mainImage.parentNode;
            if (mainAnchor.parentNode.nodeName.toLowerCase() == 'td') {
                mainTD = mainAnchor.parentNode;
            }
        }
        else if (mainImage.parentNode.nodeName.toLowerCase() == 'td') {
            mainTD = mainImage.parentNode;
        }
    }
    else {
        return false;
    }
    
    var parameters = new Object();
    
    var location = String(document.location);
    var parameterString = location.substr(location.indexOf('#') + 1);
    var parameterStringList = parameterString.split(';');
    for (var p = 0; p < parameterStringList.length; p++) {
        var param = parameterStringList[p].split('=');
        parameters[param[0]] = param[1];
    }
    
    var setupImage = function(td,a,img) {
        if (!img) {
            console.log('img not found');
            return false;
        }
        if (!td) {
            console.log('td not found');
            return false;
        }
        
        var centerNode = document.createElement('center');
        td.appendChild(centerNode);
        centerNode.id = 'imageCenterNode';
        if (windowFit) {
            centerNode.style.position = 'fixed';
            centerNode.style.top = 0;
            centerNode.style.left = 0;
            centerNode.style.height = '100%';
            centerNode.style.width = '100%';
        }
        
        var addScreenListener = function(imageScreen,imageCenterNode,imageImage) {
            imageScreen.addEventListener('click',function() {
                imageCenterNode.style.position = '';
                imageCenterNode.style.top = '';
                imageCenterNode.style.left = '';
                imageCenterNode.style.height = '';
                imageCenterNode.style.width = '';
                
                imageScreen.style.display = 'none';
                
                imageImage.style.position = '';
                imageImage.style.top = '';
                imageImage.style.height = '';
                imageImage.style.width = '';
                imageImage.style.zIndex = '';
                imageImage.style.borderLeft = '';
                imageImage.style.borderRight = '';
            
                var messageCacheLoading = document.getElementById('messageCacheLoading');
                if (messageCacheLoading) {
                    messageCacheLoading.style.display = 'none';
                }
            },this);
        };
        
        var screen = document.createElement('div');
        centerNode.appendChild(screen);
        
        if (screen.id != 'imageScreen') {
            addScreenListener(screen,centerNode,img);
        }
        
        screen.id = 'imageScreen';
        screen.title = 'Click to return';
        screen.style.position = 'fixed';
        screen.style.top = 0;
        screen.style.left = 0;
        screen.style.height = '100%';
        screen.style.width = '100%';
        screen.style.backgroundColor = 'black';
        screen.style.opacity = .7;
        screen.style.zIndex = 997;
        screen.style.display = (windowFit ? '' : 'none');
        
        if (a) {
            centerNode.appendChild(a);
        }
        else {
            centerNode.appendChild(img);
        }
        
        img.id = 'imageImage';
        if (windowFit) {
            img.style.position = 'relative';
            img.style.top = 0;
            img.style.height = '100%';
            img.style.width = 'auto';
            img.style.zIndex = 999;
            img.style.borderLeft = '5px solid white';
            img.style.borderRight = '5px solid white';
        }
    };
    setupImage(mainTD,mainAnchor,mainImage);
    
    var addButton = function() {
        var pageTable = document.getElementById('page');
        var row = pageTable.insertRow(-1);
        var cell = row.insertCell(-1);
        
        var button = document.createElement('input');
        button.type = 'button';
        cell.appendChild(button);
        button.value = 'Fit Image to Window';
        
        button.addEventListener('click',function() {
            var imageCenterNode = document.getElementById('imageCenterNode');
            imageCenterNode.style.position = 'fixed';
            imageCenterNode.style.top = 0;
            imageCenterNode.style.left = 0;
            imageCenterNode.style.height = '100%';
            imageCenterNode.style.width = '100%';
            
            var imageScreen = document.getElementById('imageScreen');
            imageScreen.style.display = '';
            
            var imageImage = document.getElementById('imageImage');
            imageImage.style.position = 'relative';
            imageImage.style.top = 0;
            imageImage.style.height = '100%';
            imageImage.style.width = 'auto';
            imageImage.style.zIndex = 999;
            imageImage.style.borderLeft = '5px solid white';
            imageImage.style.borderRight = '5px solid white';
            
            var messageCacheLoading = document.getElementById('messageCacheLoading');
            if (messageCacheLoading) {
                if (messageCacheLoading.className.indexOf('messageCacheLoadingRemoved') < 0) {
                    messageCacheLoading.style.display = '';
                }
            }
        },this);
    };
    addButton();
    
    if (modifyTitle) {
        var adjustTitle = function() {
            var title = String(document.title);
            
            var index = title.indexOf('>');
            index = title.indexOf('>',index + 1);
            
            title = title.substr(index+1);
            if (title.charAt(0) == ' ') {
                title = title.substr(1);
            }
            
            document.title = title;
        };
        adjustTitle();
    }
    
    var changeChapter = function(series, chapter,returnLocation) {
        if (!series || !chapter || series == '' || chapter == '') {
            return false;
        }
        var location = '/' + series + '-chapter-' + chapter + '.html';
        if (returnLocation) {
            return location;
        }
        document.location = location;
        return true;
    }
    var changePage = function(series, chapter, page,returnLocation) {
        if (!series || !chapter || !page || series == '' || chapter == '' || page == '') {
            return false;
        }
        var location = '/' + series + '-chapter-' + chapter + '-page-' + page + '.html';
        if (returnLocation) {
            return location;
        }
        document.location = location;
        return true;
    }
    
    var backButton = null;
    var nextButton = null;
    var selectSeries = null;
    var selectChapter = null;
    var selectPage = null;
    
    var findComponents = function() {
        var inputList = document.getElementsByTagName('input');
        for (var n = 0; (n < inputList.length) && (!backButton || !nextButton); n++) {
            if (inputList[n].type.toLowerCase() == 'button') {
                if (inputList[n].name.toLowerCase() == 'back') {
                    backButton = inputList[n];
                }
                else if (inputList[n].name.toLowerCase() == 'next') {
                    nextButton = inputList[n];
                }
            }
        }
        
        var selectList = document.getElementsByTagName('select');
        for (var n = 0; (n < selectList.length) && (!selectSeries || !selectChapter || !selectPage); n++) {
            if (selectList[n].name.toLowerCase() == 'series') {
                selectSeries = selectList[n];
            }
            else if (selectList[n].name.toLowerCase() == 'chapter') {
                selectChapter = selectList[n];
            }
            else if (selectList[n].name.toLowerCase() == 'pages') {
                selectPage = selectList[n];
            }
        }
    };
    findComponents();
    
    var loadingMessage = null;
    var spanLooking = null;
    var spanDot = null;
    var doUpdateDots = false;
    
    var updateDots = function(start) {
        if (start) {
            doUpdateDots = true;
        }
        
        if (doUpdateDots) {
            if (spanDot) {
                switch (spanDot.innerHTML) {
                    case '':
                        spanDot.innerHTML = '.';
                        break;
                    case '.':
                        spanDot.innerHTML = '..';
                        break;
                    case '..':
                        spanDot.innerHTML = '...';
                        break;
                    case '...':
                        spanDot.innerHTML = '';
                        break;
                    default:
                        spanDot.innerHTML = '...';
                }
                
                setTimeout(function() {
                    updateDots();
                },1000);
            }
        }
    }
    
    var showLoadingMessage = function() {
        if (!loadingMessage) {
            loadingMessage = document.createElement('div');
            document.body.appendChild(loadingMessage);
            loadingMessage.id = 'loadingMessage';
            loadingMessage.style.position = 'fixed';
            loadingMessage.style.top = 0;
            loadingMessage.style.left = 0;
            loadingMessage.style.zIndex = 1000;
            loadingMessage.style.padding = '10px';
            loadingMessage.style.width = '220px';
            loadingMessage.style.fontFamily = 'sans-serif';
            loadingMessage.style.backgroundColor = '#A8B5B1';
            loadingMessage.style.border = '6px solid white';
            loadingMessage.style.MozBorderRadius = '6px';
            loadingMessage.style.borderRadius = '6px';
            
            spanLooking = document.createElement('span');
            loadingMessage.appendChild(spanLooking);
            spanLooking.id = 'spanLooking';
            spanLooking.innerHTML = 'Looking up previous page';
            spanLooking.style.color = 'black';
            spanLooking.style.fontWeight = 'bold';
            spanLooking.style.fontFamily = 'inherit';
            
            spanDot = document.createElement('span');
            loadingMessage.appendChild(spanDot);
            spanDot.id = 'spanDot';
            spanDot.innerHTML = '...';
            spanDot.style.color = 'black';
            spanDot.style.fontWeight = 'bold';
            spanDot.style.fontFamily = 'inherit';
        }
        loadingMessage.style.display = '';
        
        updateDots(true);
    };
    
    var hideLoadingMessage = function() {
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
            
            doUpdateDots = false;
        }
    }
    
    var findPreviousChapterLastPage = function(s,c) {
        setTimeout(showLoadingMessage,1);
        
        setTimeout(function() {
            findPreviousChapterLastPageHelper(s,c);
        },5);
    }
    
    var findPreviousChapterLastPageHelper = function(s,c) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var text = xhr.responseText;
                
                var selectStart = text.indexOf('<select name="pages"');
                var selectEnd = text.indexOf('</select>',selectStart);
                
                text = text.substr(selectStart,selectEnd - selectStart);
                
                var findToken = 'value="';
                var valueStart = text.lastIndexOf(findToken) + findToken.length;
                var valueEnd = text.indexOf('"',valueStart);
                
                var lastPage = text.substr(valueStart,valueEnd - valueStart);
                
                if (!changePage(s,c,lastPage)) {
                    console.log('findPreviousChapterLastPage(): Cannot move to previous page');
                }
            }
            if (xhr.readState == 4) {
                hideLoadingMessage();
            }
        }
        xhr.open('GET','/' + s + '-chapter-' + c + '.html',true);
        xhr.send();
    }
    
    var previousPage = function() {
        if (!selectSeries || !selectChapter || !selectPage || !backButton) {
            console.log('previousPage(): Missing component');
            return false;
        }
        
        var s,c,p;
        s = selectSeries.value;
        
        if (backButton.disabled) {
            if (selectChapter.selectedIndex > 0) {
                c = selectChapter.options[selectChapter.selectedIndex - 1].value;
                findPreviousChapterLastPage(s,c);
            }
            else {
                console.log('No previous chapters');
                alert('No previous chapters');
            }
        }
        else {
            c = selectChapter.value;
            p = selectPage.options[selectPage.selectedIndex - 1].value;
            
            return changePage(s,c,p);
            console.log('previousPage(): Cannot move to previous page');
        }
    };
    
    var nextPage = function(returnLocation) {
        if (!selectSeries || !selectChapter || !selectPage || !backButton) {
            console.log('nextPage(): Missing components');
            return false;
        }
        
        var s,c,p;
        s = selectSeries.value;
        
        if (nextButton.disabled) {
            if (selectChapter.options.length > selectChapter.selectedIndex + 1) {
                c = selectChapter.options[selectChapter.selectedIndex + 1].value;
                return changeChapter(s,c,returnLocation);
            }
            else {
                if (returnLocation) {
                    return false;
                }
                console.log('No more chapters');
                alert('No more chapters');
            }
        }
        else {
            c = selectChapter.value;
            p = selectPage.options[selectPage.selectedIndex + 1].value;
            
            return changePage(s,c,p,returnLocation);
        }
    };
    
    var windowClick = function(evt) {
        //Left: 37; Right: 39
        if (evt.keyCode == 37) {
            previousPage();
        }
        else if (evt.keyCode == 39) {
            nextPage();
        }
    };
    window.addEventListener('keyup',windowClick,true);
    
    if (cacheNextImage) {
        var cacheDiv = null;
        var cacheImg = null;
        var messageCacheLoading = null;
        var messageCacheLoadingSpanLooking = null;
        var messageCacheLoadingSpanDot = null;
        var doUpdateCacheDots = false;
        
        var updateCacheDots = function(start) {
            if (start) {
                doUpdateCacheDots = true;
            }
            
            if (doUpdateCacheDots) {
                if (messageCacheLoadingSpanDot) {
                    switch (messageCacheLoadingSpanDot.innerHTML) {
                        case '':
                            messageCacheLoadingSpanDot.innerHTML = '.';
                            break;
                        case '.':
                            messageCacheLoadingSpanDot.innerHTML = '..';
                            break;
                        case '..':
                            messageCacheLoadingSpanDot.innerHTML = '...';
                            break;
                        case '...':
                            messageCacheLoadingSpanDot.innerHTML = '';
                            break;
                        default:
                            messageCacheLoadingSpanDot.innerHTML = '...';
                    }
                    
                    setTimeout(function() {
                        updateCacheDots();
                    },1000);
                }
            }
            else {
                messageCacheLoadingSpanDot.innerHTML = '...Done';
            }
        }
        
        var setupCacheMessages = function() {
            messageCacheLoading = document.createElement('div');
            document.body.appendChild(messageCacheLoading);
            messageCacheLoading.id = 'messageCacheLoading';
            messageCacheLoading.style.position = 'fixed';
            messageCacheLoading.style.top = 0;
            messageCacheLoading.style.right = 0;
            messageCacheLoading.style.zIndex = 998;
            messageCacheLoading.style.padding = '10px';
            messageCacheLoading.style.width = '220px';
            messageCacheLoading.style.fontFamily = 'sans-serif';
            messageCacheLoading.style.backgroundColor = '#A8B5B1';
            messageCacheLoading.style.border = '6px solid white';
            messageCacheLoading.style.MozBorderRadius = '6px';
            messageCacheLoading.style.borderRadius = '6px';
            messageCacheLoading.style.display = 'none';
            
            var removeCacheMessage = function() {
                messageCacheLoading.style.display = 'none';
                messageCacheLoading.className = 'messageCacheLoadingRemoved';
            }
            
            messageCacheLoading.addEventListener('click',function() {
                setTimeout(function() {
                    removeCacheMessage();
                },1);
            },false);
            
            messageCacheLoadingSpanLooking = document.createElement('span');
            messageCacheLoading.appendChild(messageCacheLoadingSpanLooking);
            messageCacheLoadingSpanLooking.id = 'messageCacheLoadingSpanLooking';
            messageCacheLoadingSpanLooking.innerHTML = 'Caching next image';
            messageCacheLoadingSpanLooking.style.color = 'black';
            messageCacheLoadingSpanLooking.style.fontWeight = 'bold';
            messageCacheLoadingSpanLooking.style.fontFamily = 'inherit';
            
            messageCacheLoadingSpanDot = document.createElement('span');
            messageCacheLoading.appendChild(messageCacheLoadingSpanDot);
            messageCacheLoadingSpanDot.id = 'messageCacheLoadingSpanDot';
            messageCacheLoadingSpanDot.innerHTML = '...';
            messageCacheLoadingSpanDot.style.color = 'black';
            messageCacheLoadingSpanDot.style.fontWeight = 'bold';
            messageCacheLoadingSpanDot.style.fontFamily = 'inherit';
        }
        setupCacheMessages();
        
        var showCacheLoading = function() {
            if (showCacheMessage) {
                messageCacheLoading.style.display = '';
                updateCacheDots(true);
            }
        };
        
        var showCacheComplete = function() {
            if (showCacheMessage) {
                doUpdateCacheDots = false;
            }
        };
        
        var checkImageLoaded = function() {
            if (cacheImg.complete) {
                showCacheComplete();
            }
            else {
                cacheImg.addEventListener('load',showCacheComplete,false);
            }
        };
        
        var doCacheAction = function() {
            var next = nextPage(true);
            if (!next) {
                return false;
            }
            
            if (windowFit) {
                showCacheLoading();
            }
            
            cacheDiv = document.createElement('div');
            document.body.appendChild(cacheDiv);
            cacheDiv.id = 'cacheDiv';
            cacheDiv.style.position = 'fixed';
            cacheDiv.style.top = 0;
            cacheDiv.style.left = 0;
            cacheDiv.style.width = '200px';
            cacheDiv.style.height = '200px';
            cacheDiv.style.border = '1px solid white';
            cacheDiv.style.zIndex = 100;
            cacheDiv.style.display = 'none'
            
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var text = xhr.responseText;
                    
                    var startToken = 'bleachexile.com/manga';
                    var endToken = '"';
                    
                    var selectStart = text.indexOf(startToken);
                    var selectEnd = text.indexOf(endToken,selectStart);
                    
                    text = text.substr(selectStart,(selectEnd - selectStart));
                    
                    cacheImg = document.createElement('img');
                    cacheDiv.appendChild(cacheImg);
                    cacheImg.id = 'cacheImg';
                    cacheImg.style.width = '200px';
                    cacheImg.style.height = 'auto';
                    cacheImg.style.display = '';
                    cacheImg.src = text;
                    
                    setTimeout(checkImageLoaded,50);
                }
            }
            xhr.open('GET',next,true);
            xhr.send();
        };
        
        if (mainImage.complete) {
            doCacheAction();
        }
        else {
            mainImage.addEventListener('load',function(evt) {
                doCacheAction();
            },true);
        }
    }
    
    window.focus();
},1);