// ==UserScript==
// @name           theverge.com - One Column Front Page - Expand Articles In Place
// @namespace      aformaevent + DamienUX
// @version        0.1
// @originalScript http://userscripts.org/scripts/show/131687
// @include        http://www.theverge.com/*
// ==/UserScript==

function getY(obj) {
    return (obj.offsetParent ? obj.offsetTop + getY(obj.offsetParent) : obj.y ? obj.y : 0);
}

function getX(obj) {
    return obj.offsetLeft + (obj.offsetParent ? getX(obj.offsetParent) : obj.x ? obj.x : 0);
}

function addCss(cssCode) {
    styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) styleElement.styleSheet.cssText = cssCode;
    else styleElement.appendChild(document.createTextNode(cssCode));
    document.querySelector("head").appendChild(styleElement);
}

function makeCss() {
    addCss('\
#container {border:0px !important;}\
.title {margin-left: 362px !important;}\
article > div:first-child > a {width: 330px !important;}\
.newarticle { border-bottom: 80px solid #FFFFFF; margin: 0 0 11px; padding-right: 12px; min-height: 135px; position: relative;width:auto !important;max-width:1700px; }\
.newtextbox { height:200px; width:auto !important; max-width: 1200px;}\
article .title > a {font-size:50px !important; line-height:40px; text-transform:none !important; padding-left: 0px !important;}\
p {font-size:18px !important}\
article > div:first-child { margin-left: 12px; width: 292px; margin-bottom: -40px }\
article > div:first-child > a { height: 100%; left: 12px; position: absolute; overflow: hidden; width: 292px; display: block; }\
a div img { min-height: 100%; margin-left: -4px; display: block;}\
article .categories { margin-top: 0px; margin-bottom: 0px; position: absolute; top: 11px; left: 15px; }\
.categories  a { margin-left: 0px; padding: 6px 6px 3px; letter-spacing: 1px; margin-right: 3px; font-weight: 800; position: relative; z-index: 1000; }\
article .title { padding-left: 0px; padding-right: 12px; margin-left: 316px; margin-top: 10px; padding-top: 8px; line-height: 29px; }\
.newtextbox { margin-left: 316px; margin-top: -1.4em; margin-bottom: 24px; overflow: hidden; font-size: 13px; max-height: 12.6em; padding-left: 46px; width: 600px; }\
article .newtextbox p { margin-bottom: 0; margin-top: 1.4em; line-height: 1.4em; }\
article .byline { left: 320px; bottom: -13px; position: absolute; margin: 0; }\
article .newheatbox { margin-right: 0px; margin-left: -4px; margin-top: -2px; position: relative; z-index: 15; }\
article .newheat { text-align: center; min-width: 14px; display: block; margin-right: -12px; border-right: 6px solid #FFFFFF; color: #FFFFFF !important; font-size: 12px; font-weight: 800; padding: 2px 6px; }\
article .newflag { border-bottom: 10px solid #FFFFFF; border-left-style: solid; border-left-width: 16px; height: 0; margin: 13px -14px -4px -4px; position: relative; width: 0; z-index: 10; }\
article .newinfobox { margin-left: 17px; font-size: 12px; margin-top: 2px; margin-top: 3px; }\
article .author { margin-right: 3px; padding-right: 7px; margin-bottom: 0px; border-bottom-width: 4px; }\
.newarticle quote { width: 800px; margin: -12px 8px -16px 0; font-size: 26px; line-height: 28px; letter-spacing: 0pt; text-align: right; }\
quote a { margin-bottom: 3px; }\
article .visiblequote { position: absolute; right: 12px; bottom: 0; }\
article .hiddenquote { visibility: hidden; margin-left: 320px; }\
article div iframe { background-color: #F9ECE6; }\
.breaker { margin-top: 0; margin-bottom: 0; border-bottom:6px solid #F4F1EF; border-top: 6px solid #F4F1EF}\
.toggler-tabs li.badge span, #forums li.active{ -moz-transform: rotate(-90deg) translate(30px, -79px); -webkit-transform: rotate(-90deg) translate(30px, -79px); width: 90px;}\
#forums .toggler-tabs li.active { float: left; left: -83px; position: relative; top: 85px; }\
#super {width:80%;}\
#super {margin-left:5%;}\
#super .widget .button { margin-top: 30px; }\
#super .widget ul li{ float: left; margin: 0 8px; padding: 0; width: 188px; }\
#super .widget ul { margin-bottom: 0; margin-top: 0; padding-top: 30px; width: 100%; }\
#super .widget > h3 { -moz-transform: rotate(-90deg) translate(-13px, -50px); -webkit-transform: rotate(-90deg) translate(-13px, -50px); background-size: 180px 100px; float: left; height: 100px; margin-right: -110px; }\
#super .widget > h4 { -moz-transform: rotate(-90deg) translate(9px, -70px); -webkit-transform: rotate(-90deg) translate(9px, -70px); background-size: 180px 100px; float: left; height: 100px; margin-right: -110px; background-repeat: no-repeat;}\
#super .widget .title > a { font-size: 15px; }\
#super .widget { height: 180px; padding: 0; margin: 0; overflow: hidden; }\
#super .break .top-products { min-height: 260px; }\
#super .break .top-products h3 { height: 30px; top: 60px; }\
#super .break .top-products ul { padding-left: 150px; padding-top: 20px; }\
.toggler-tabs { border-bottom-width: 0; float: right; margin-bottom: 0; margin-right: -2px; margin-top: -40px; position: relative; top: 160px; z-index: 100; width: 100%;}\
.toggler-tabs li.active { float: right; }\
#popular-features .popular-feature a, #recent-videos .popular-feature a { width: auto}\
#popular-features .popular-feature, #recent-videos .popular-feature { float: right; width: 222px; }\
#popular-features  h4, #recent-videos h4 { -moz-transform: rotate(-90deg) translate(-12px, -40px); -webkit-transform: rotate(-90deg) translate(-12px, -40px); float: left; margin-right: -80px; }\
.popular-features { overflow: hidden; width: auto; float: none; border-left: none; border-right: none; border-bottom: 6px solid #F1EEEC; border-top: 6px solid #F1EEEC; }\
#super .five-minutes { position: relative; padding-left: 12px }\
#super .five-minutes span { left: -8px; }\
.pagination { height: 32px; padding: 0; }\
.newarticle > .pushbox { bottom: -34px; height: 45px; left: 100%; margin: 0; padding: 0; position: absolute; width: auto; }\
.pushbox div { border-left: 25px solid #DDDDDD; border-bottom: 45px solid #FFFFFF; height: 0; width: 0; position: relative; left: 0; }\
.waiting .pushbox div { border-left-color: #707070; }\
.open .pushbox div { border-left:none; border-right: 25px solid #FFFFFF; border-bottom: 45px solid #DDDDDD; height: 0; width: 0; position: relative; left: 0; }\
.pushbox .heatpush { border-left: 12px solid rgba(0,0,0,0); border-bottom: 19px solid #DDDDDD; height: 0; position: absolute; top: 2px; left: 1px; width: 0; }\
.waiting .pushbox .heatpush { border-left: 12px solid rgba(0,0,0,0); border-bottom-color: #707070; }\
.open .pushbox .heatpush {border-left: none;  border-right: 12px solid #DDDDDD; border-bottom: 19px solid transparent; height: 0; position: absolute; top: 24px; left: 1px; width: 0; }\
.open .newtextbox { max-height: 10000px; margin-bottom: 4px; }\
.open .smallbox { display: none; }\
.big-link {display:none;}\
.open .bigbox { display: block; width: 100%; padding-bottom: 0; }\
.open img { min-height: 1px; }\
.open > div:first-child > a { position: static; }\
.closed .smallbox { display: block; }\
.closed .bigbox { display: none; }\
article a div { height: 100%; }\
article a div div { height: 100%; }\
.open a .shadowbox { height: auto; }\
.newarticle:before { border-bottom: 1px solid #DDDDDD; content: ""; display: block; height: 0; margin-bottom: 10px; width: 1020px; }\
.break { border-top: 1px solid #DDDDDD; }\
.bottom-reviews { position: relative; left: 6px;}\
.bottom-reviews .feature-box { margin-right: 3px; }\
.bottom-reviews .feature-box .shadowbox { margin: 0; }\
.break .bottom-reviews .recent-reviews { background: none repeat scroll 0 0 #FA4B2A; top: 200px; color: #FFFFFF; font-family: ff-din-web-condensed,helvetica,sans-serif; font-size: 15px; font-style: italic; left: -12px; line-height: 1; padding: 5px 20px 2px 15px; position: absolute; text-transform: uppercase; z-index: 20; }\
.break .bottom-reviews .review-wide .recent-reviews { top: 220px; }\
.feature-box .feature-meta {display:none;}\
#read-this-now {display:none;}\
.clearfix {display:none;}\
.m-big-stories {display:none;}\
#header {display:none;}\
.widget {display:none;}\
.popular-features {display:none;}\
.popular-feature-meta {display:none;}\
.bottom-reviews { padding-top: 50%; }\
.bottom-reviews .product-score-box { position: absolute; }\
.bottom-reviews div.review0 { background-image: -moz-linear-gradient(left top , #002F4B, #DC4225); background-image: -webkit-linear-gradient(left top , #002F4B, #DC4225); box-shadow: 0 0 30px 0 #721300 inset; content: ""; height: 246px; left: 0; opacity: 0.5; position: absolute; top: 0; width: 218px; z-index: -1; }\
.bottom-reviews div.review1 { background-image: -moz-linear-gradient(left top , #DC4225, #E0BE00); background-image: -webkit-linear-gradient(left top , #DC4225, #E0BE00); box-shadow: 0 0 30px 0 #721300 inset; content: ""; height: 246px; left: 0; opacity: 0.5; position: absolute; top: 0; width: 218px; z-index: -1; }\
.bottom-reviews div.review2 { background-image: -moz-linear-gradient(left top , #002F4B, #417711); background-image: -webkit-linear-gradient(left top , #002F4B, #417711); box-shadow: 0 0 30px 0 #721300 inset; content: ""; height: 246px; left: 0; opacity: 0.5; position: absolute; top: 0; width: 218px; z-index: -1; }\
.bottom-reviews .review-wide .feature-meta:before { background-image: -moz-linear-gradient(left top , #002F4B, #417711); background-size: 100% 100%; box-shadow: 0 0 30px 0 #222222 inset; content: ""; height: 246px; left: 0; opacity: 0.7; position: absolute; top: 0; width: 660px; z-index: -1; }\
.review-wide p.categories { position: absolute; }\
.bottom-reviews .review-wide a .feature-meta { padding-top: 3%; }\
article .storystream-nav { border: 0 none; margin: 0 0 -2px 0; padding: 0; display: none; }\
.open .storystream-nav { display: block; background: none; }\
.open:after { clear: both; content: "."; display: block; visibility: hidden; }\
.storystream-nav .updatelist li .time { float: none; }\
.storystream-nav h2 { padding: 10px 10px 7px 20px; font-size: 18px; border: 0; margin-top: 10px;}\
.storystream-nav h2 span { margin-bottom: 0; margin-right: 6px; padding-top: 2px; float: left; }\
.storystream-nav h2 span em { line-height: 0; font-size: 20px; }\
.too-big:after { bottom: -22px; color: #999999; content: "article too large"; font-size: 10px; position: absolute; right: 2px; }\
article .bigbox .product-score-box { float: left; margin-right: 52px; margin-top: 30px; margin-bottom: 24px; }\
article .bigbox .reviewquote { font-size: 18px; }\
.open-review .bigbox .quotelist {margin-bottom: 20px; margin-top: 0; padding-top: 20px; }\
.open-review .bigbox .quotelist li { font-weight: 600; font-style: italic; color: #555555; }\
.open-review .review-bottom { margin-left: -350px; width: 996px; }\
.open-review .newtextbox { overflow: visible; }\
.open-review .review-bottom .slegend { margin-right: 22px; width: 400px; margin-top: 12px; }\
.open-review .review-bottom .score-grid { margin-right: 22px; width: 400px; }\
.open-review .review-bottom .bulletcol { margin-left: 12px; text-align: left; width: 255px; }\
.open-review .review-bottom iframe { width: 500px; height: 282px; margin-left: 30px; }\
.open-review .review-footer .bulletcol { float: right; margin-top: 18px; }\
.open-review bigbox .review-footer { margin-left: -350px; width: 966px; }\
.open-review div a .shadowbox { max-height: 300px; }\
.open-review h4 { font-size: 26px; margin-bottom: 2px; }\
.open-review .thermometer { height: 20px; }\
.open-review .thermometer .temperature { height: 20px; }\
.open-review .score-grid li { margin-bottom: 5px; position: relative; height: 22px; clear: none; }\
.open-review .label { position: relative; top: -16px; padding-left: 4px; }\
.open-review .score { position: relative; top: -16px; padding-right: 4px; }\
.open-review .slegend { margin-bottom: 0px; }\
.open-review .slegend li { padding-top: 4px; padding-bottom: 2px; font-size: 13px; }\
#hero { margin-bottom: -1px; }\
.article-body blockquote { background: none repeat scroll 0 0 #DDDDDD; border-left: 5px solid #CCCCCC; margin: 1em; padding: 1em; }\
.article-body blockquote > p:first-child { margin-top: 0; }\
.open-stream-entry .storystream-nav .updatelist li > div { padding-left: 80px; width: 460px; }\
.open-stream-entry .storystream-nav .updatelist li > div > a { color: #5F5F5F; float: none; font-size: 13px ;}\
.open-stream-entry .storystream-nav .updatelist li .time { float: left; width:80px; }\
.open-stream-entry .storystream-nav .updatelist li .comment-count { float: right; }\
');
}

function onScroll() {
    if ((date = new Date()) - lastCall > 300) {
        lastCall = date;
        if (button = document.querySelector('.bottombutton')) {
            if (docHeight - window.scrollY < 4500) {
                button.textContent = 'loading...';
                button.className = ('pagination hub-pagination loading');
                getHTML('http://www.theverge.com/archives/' + nextPage);
                nextPage++;
            }
        }
        time = setTimeout(onScroll, 300);
    }
}

function onClick(event) {
    thisElement = event.target;
    thisArticle = thisElement.parentNode.parentNode;
    if (thisElement.classList.contains('bottombutton')) {
        thisElement.textContent = 'loading...';
        thisElement.className = ('pagination hub-pagination loading');
        getHTML('http://www.theverge.com/archives/' + nextPage);
        nextPage++;
    } else if (thisArticle.classList) {
        if (thisElement.parentNode.classList.contains('pushbox') & !thisArticle.classList.contains('waiting')) {
            if (thisArticle.classList.contains('open')) {
                thisArticle.classList.remove('open');
                thisArticle.classList.add('closed');
            } else if (thisArticle.classList.contains('closed')) {
                thisArticle.classList.remove('closed');
                thisArticle.classList.add('open');
            } else {
                thisArticle.classList.add('waiting');
                articleY = getY(thisArticle);
                tops = 'top: ';
                tops += (getY(thisElement.parentNode) - getY(thisArticle));
                tops += 'px;';
                min = 'min-height: ';
                min += (getY(thisArticle.nextElementSibling) - getY(thisArticle) - 20);
                min += 'px;';
                thisElement.parentNode.setAttribute('style', tops);
                thisArticle.querySelector('a div img').setAttribute('style', min);
                cats = thisArticle.getElementsByClassName('categories')[0].textContent;
                if (cats.indexOf('podcast') != -1 || cats.indexOf('From The Forums') != -1 || cats.indexOf('Editorial') != -1 || cats.indexOf('Feature') != -1 || cats.indexOf('Stream') != -1) {
                    thisArticle.classList.remove('waiting');
                    thisArticle.classList.add('too-big');
                } else get(thisArticle);
            }
        }
    }
}

function expand(thisArticle, html) {
    html = '<div>' + html.substring(html.indexOf('id="super">') + 21, html.indexOf('id="community_analytics"'));
    parser = new DOMParser();
    bigGuy = parser.parseFromString(html, "text/html");
    if (bigGuy === null) {
        bigGuy = document.createElement('div');
        bigGuy.innerHTML = html;
    }
    if (bigGuy.querySelector('.article-entry')) {
        bigBox = document.createElement('div');
        bigBox.className = 'bigbox article-body';
        bigBox.innerHTML = bigGuy.querySelector('.article-body').innerHTML;
        if (gallery = bigBox.querySelector('.gallery-navigation')) {
            gallery.parentNode.removeChild(gallery);
        }
        ps = bigBox.querySelectorAll('p');
        for (k = 0; k < ps.length; k++) {
            nextItem = ps[k];
            nextItem.removeAttribute('style');
            nextItem.className = 'newtext';
        }
        if (ooyala = bigBox.querySelector('.video-post-ooyala')) {
            embed = ooyala.parentNode.querySelector('noscript').innerHTML;
            if (embed.indexOf('embed_src=') != -1) embed = embed.substring(embed.indexOf('embed_src=') + 11);
            embed = embed.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            embed = embed.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            embed = embed.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            embed = embed.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            embed = embed.substring(0, embed.indexOf('</object>') + 9);
            ooyala.innerHTML = embed;
        }
        if (stream = bigGuy.querySelector('.stream-pane')) {
            newStream = document.createElement('div');
            newStream.className = 'pane stream-pane active storystream-nav';
            newStream.appendChild(stream.querySelector('h2'));
            newStream.appendChild(stream.querySelector('.updatelist'));
            thisArticle.firstElementChild.appendChild(newStream);
        }
        thisArticle.querySelector('.newtextbox').appendChild(bigBox);
        thisArticle.classList.remove('waiting');
        thisArticle.classList.add('open');
    } else if (bigGuy.querySelector('.product-review-entry')) {
        thisArticle.classList.add('open-review');
        bigBox = document.createElement('div');
        bigBox.className = 'bigbox';
        quotes = bigGuy.querySelectorAll('quote');
        bigBox.appendChild(document.createElement('ul'));
        bigBox.lastChild.className = 'quotelist';
        for (p = 0; p < quotes.length; p++) {
            bigBox.lastChild.appendChild(document.createElement('li'));
            bigBox.lastChild.lastChild.textContent = quotes[p].textContent;
        }
        if (bigGuy.querySelector('.score-grid')) {
            therms = bigGuy.querySelectorAll('.thermometer');
            for (r = 0; r < therms.length; r++) {
                therms[r].parentNode.insertBefore(therms[r], therms[r].parentNode.firstElementChild);
            }
        }
        scores = document.createElement('div');
        scores.className = 'column';
        scores.appendChild(bigGuy.querySelector('.slegend'));
        scores.appendChild(bigGuy.querySelector('.score-grid'));
        reviewTitle = bigGuy.querySelector('#review-card-title');
        bulletBox = reviewTitle.parentNode;
        bulletBox.removeChild(reviewTitle);
        bulletBox.insertBefore(scores, bulletBox.firstElementChild);
        bulletBox.className = 'column review-bottom entry-product-scorecard';
        bulletBox.removeAttribute('style');
        bigBox.insertBefore(bulletBox.querySelector('.product-score-box'), bigBox.firstElementChild);
        bigBox.appendChild(bulletBox);
        if (bigGuy.querySelector('h2[name="review-video"]')) {
            videoBox = bigGuy.querySelector('h2[name="review-video"]').parentNode.lastElementChild.querySelector('iframe')
            videoBox.removeAttribute('width');
            videoBox.removeAttribute('height');
            footer = document.createElement('div');
            footer.className = 'column review-bottom review-footer entry-product-scorecard';
            footer.appendChild(bulletBox.lastElementChild);
            footer.appendChild(bulletBox.lastElementChild);
            bulletBox.appendChild(videoBox);
            bigBox.appendChild(footer);
        }
        thisArticle.querySelector('.newtextbox').appendChild(bigBox);
        thisArticle.classList.remove('waiting');
        thisArticle.classList.add('open');
    } else if (bigGuy.querySelector('.stream-entry')) {
        thisArticle.classList.add('open-stream-entry');
        bigBox = document.createElement('div');
        bigBox.className = 'bigbox';
        summary = bigGuy.querySelector('#stream_summary')
        bigBox.innerHTML = summary.innerHTML;
        updateCount = thisArticle.querySelector('.update-count').cloneNode(true);
        bigBox.appendChild(updateCount);
        updateBox = document.createElement('div');
        updateBox.className = 'updatebox storystream-nav';        
        updateList = document.createElement('ul');
        updateList.className = 'updatelist';
        updates = bigGuy.querySelectorAll('.stream-update');
        for(u=0; u < updates.length; u++){
            updateList.appendChild(document.createElement('li'));
            updateList.lastElementChild.innerHTML = '<div>' + updates[u].querySelector('.utitle').innerHTML + '</div>';
            updateList.lastElementChild.firstElementChild.innerHTML = updates[u].querySelector('.publish-date').innerHTML.split("on ")[1].split(", ")[0];
            updateList.lastElementChild.firstElementChild.className = 'time';
            if(updates[u].querySelector('.comment-count')) updateList.lastElementChild.insertBefore(updates[u].querySelector('.comment-count'), updateList.lastElementChild.lastElementChild);
        }
        updateBox.appendChild(updateList);        
        bigBox.appendChild(updateBox);
        thisArticle.querySelector('.newtextbox').appendChild(bigBox);
        thisArticle.classList.remove('waiting');
        thisArticle.classList.add('open');    
    } else {
        thisArticle.classList.remove('waiting');
        thisArticle.classList.add('too-big');
    }
}

function get(thisArticle) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", thisArticle.querySelector('a').getAttribute('href'), true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            expand(thisArticle, this.responseText);
        }
    };
}

function makeChunks(lis) {
    newChunks = new Array;
    for (k = 0; k < lis.length; k++) {
        article = lis[k];
        titleHTML = article.querySelector('h3').innerHTML;
        href = article.querySelector('h3 a').href;
        byLine = article.querySelector('.byline');
        auth = byLine.firstElementChild;
        author = auth.textContent.trim();
        authLink = auth.href;
        byLineHTML = byLine.innerHTML;
        date = byLineHTML.slice(byLineHTML.indexOf('</a>') + 8, byLineHTML.indexOf('<em>'));
        heat = 0;
        comments = parseInt(byLineHTML.slice(byLineHTML.indexOf('</em>') + 5, byLineHTML.indexOf(' comments')));
        for (j = 0; j < heats.length; j++) {
            if (comments >= heats[j]) heat = j + 1;
        }
        if (isNaN(comments)) comments = '?';
        if (article.querySelector('.categories').firstElementChild.textContent == 'Article') catsHTML = '';
        else catsHTML = article.querySelector('.categories').innerHTML.trim();
        img = article.querySelector('img');
        alt = img.alt;
        src = img.src;
        quoteHTML = '';
        excerpt = article.querySelector('.excerpt').innerHTML;
        textBoxHTML = '<p>';
        textBoxHTML += excerpt.substring(0, excerpt.indexOf('<a href="')).trim();
        textBoxHTML += '...</p>';
        newChunks.push(createArticle(titleHTML, href, author, authLink, date, catsHTML, alt, src, heat, comments, quoteHTML, textBoxHTML));
    }
    return newChunks;
}

function parseHTML(pageText) {
    pageText = pageText.substring(pageText.indexOf('<ul class="post-list">'), pageText.indexOf('<div class="pagination">'));
    parser = new DOMParser();
    pageDiv = parser.parseFromString(pageText, "text/html");
    if (pageDiv === null) {
        pageDiv = document.createElement('div');
        pageDiv.innerHTML = pageText;
    }
    lis = pageDiv.getElementsByTagName('li');
    newChunks = makeChunks(lis);
    nextButton = hero.lastElementChild;
    nextButton.textContent = 'page ' + (nextPage) + ':';
    nextButton.className = ('pagination hub-pagination pagedevider');
    frag = fillFrag(newChunks);
    bottomButton = nextButton.cloneNode('false');
    bottomButton.textContent = 'Load More articles';
    bottomButton.className = ('pagination hub-pagination bottombutton');
    frag.appendChild(bottomButton);
    hero.appendChild(frag);
    timed = setTimeout(function setHeight() {
        docHeight = document.body.clientHeight;
    }, 50);
    timed = setTimeout(onScroll, 150);
    timed = setTimeout(onScroll, 350);
}

function getHTML(filename) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filename, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parseHTML(this.responseText);
        }
    }
}

function createArticle(titleHTML, href, author, authLink, date, catsHTML, alt, src, heat, comments, quoteHTML, textBoxHTML) {
    artHTML = '<div class="floatL"><a href="';
    artHTML += href;
    artHTML += '"><div class="shadowbox">';
    artHTML += '<img alt="';
    artHTML += alt;
    artHTML += '" src="';
    artHTML += src;
    artHTML += '"></div></a></div><h2 class="title">';
    artHTML += titleHTML;
    artHTML += '</h2><div class="newtextbox"><div class="smallbox">';
    artHTML += textBoxHTML;
    artHTML += '</div></div>';
    if (quoteHTML.length != 0) {
        artHTML += '<quote class="hiddenquote">';
        artHTML += quoteHTML;
        artHTML += '</quote><quote class="visiblequote">';
        artHTML += quoteHTML;
        artHTML += '</quote>';
    }
    artHTML += '<div class="byline newbyline"><div class="floatL newheatbox"><a class="heat';
    artHTML += heat;
    artHTML += ' newheat" href="';
    artHTML += href;
    artHTML += '#comments">';
    artHTML += comments;
    artHTML += '</a></div><div class="heat';
    artHTML += heat;
    artHTML += ' floatL newflag"></div><div class="floatL newinfobox">';
    if (author.length != 0) {
        artHTML += '<a class="author" href="';
        artHTML += authLink;
        artHTML += '">';
        artHTML += author;
        artHTML += '</a>';
    }
    artHTML += date;
    artHTML += '</div></div><a class="pushbox" href="#" onclick="; return false"><div></div><div class="heat';
    artHTML += heat;
    artHTML += ' heatpush"></div></a><p class="categories">';
    artHTML += catsHTML;
    artHTML += '</p>';
    thisArticle = document.createElement('article');
    thisArticle.className = 'newarticle';
    thisArticle.innerHTML = artHTML;
    return thisArticle;
}

function makeNewArticles() {
    newArticles = new Array;
    articles = hero.querySelectorAll('article');
    for (k = 0; k < articles.length; k++) {
        article = articles[k];
        if (!article.classList.contains('feature-box')) {
            article.parentNode.removeChild(article);
            titleBox = article.querySelector('.title');
            titlea = titleBox.firstElementChild.innerHTML;
            if (lastSpace = titlea.lastIndexOf(' ')) {
                titlea = titlea.slice(0, lastSpace) + '&nbsp' + titlea.slice(lastSpace + 1);
                titleBox.firstElementChild.innerHTML = titlea;
            }
            titleHTML = titleBox.innerHTML;
            href = titleBox.firstElementChild.href;
            titleBox.parentNode.removeChild(titleBox);
            byLine = article.querySelector('.byline');
            if (auth = article.querySelector('.author')) {
                author = auth.textContent.trim();
                authLink = auth.href;
                date = auth.parentNode.textContent.replace(author, '').trim();
            } else {
                author = authLink = '';
                date = byLine.firstElementChild.textContent;;
            }
            if (catsBox = article.querySelector('.categories')) {
                catsHTML = catsBox.innerHTML.trim();
                catsBox.parentNode.removeChild(catsBox);
            } else catsHTML = '';
            if (image = article.querySelector('img')) {
                alt = image.alt;
                image.getAttribute('data-original') ? src = image.getAttribute('data-original') : src = image.src;
                shadowBox = article.querySelector('.shadowbox').parentNode;
                shadowBox.parentNode.removeChild(shadowBox);
            } else {
                alt = 'The Verge';
                src = 'http://cdn0.sbnation.com/images/verge/globals/logos/triangle.v269b4e3.gif';
            }
            comments = heat = 0;
            if (commentCount = article.querySelector('.comment-count')) {
                comments = commentCount.textContent.trim();
                for (i = 0; i < heats.length; i++) {
                    if (comments >= heats[i]) heat = i + 1;
                }
            }
            byLine.parentNode.removeChild(byLine);
            if (quote = article.querySelector('quote')) {
                quotea = quote.getElementsByTagName('a')[0].innerHTML;
                if (lastSpace = quotea.lastIndexOf(' ')) quotea = quotea.slice(0, lastSpace) + '&nbsp' + quotea.slice(lastSpace + 1);
                if (lastSpace = quotea.lastIndexOf(' ')) quotea = quotea.slice(0, lastSpace) + '&nbsp' + quotea.slice(lastSpace + 1);
                quote.getElementsByTagName('a')[0].innerHTML = quotea;
                quoteHTML = quote.innerHTML;
                quote.parentNode.removeChild(quote);
            } else quoteHTML = '';
            if (ulist = article.querySelector('.update-list')) ulist.parentNode.removeChild(ulist);
            while (article.querySelectorAll('p').length > 1 && ((article.lastElementChild.textContent.length < 200) || (article.lastElementChild.textContent.length < 350 && article.textContent.length > 750))) {
                article.removeChild(article.lastElementChild);
            }
            textBoxHTML = article.innerHTML;
            newArticles.push(createArticle(titleHTML, href, author, authLink, date, catsHTML, alt, src, heat, comments, quoteHTML, textBoxHTML));
        }
    }
    reviews = hero.getElementsByClassName('storybox bottom-reviews')[0].children;
    for (i = 0; i < reviews.length; i++) {
        thisDiv = document.createElement('div');
        thisDiv.innerHTML = reviews[i].innerHTML;
        thisDiv.className = reviews[i].className;
        reviews[i].parentNode.replaceChild(thisDiv, reviews[i]);
    }
    return newArticles;
}

function getBreaks() {
    newBreaks = new Array;
    breakers = new Array;
    if (forums = document.querySelector('.breaker-forum-list')) {
        forums.parentNode.className = forums.className;
        forums.className = '';
    }
    breakers = hero.querySelectorAll(".breaker");
    breakers = Array.prototype.slice.call(breakers);
    if (hero.querySelector('.washpo-banner')) breakers.push(hero.querySelector('.washpo-banner'));
    if (document.getElementById('read-this-now')) breakers.push(document.getElementById('read-this-now'));
    if (hero.querySelector('.trending-dicussions')) breakers.push(hero.querySelector('.trending-dicussions'));
    if (hero.querySelector('.top-products')) breakers.push(hero.querySelector('.top-products'));
    if (hero.querySelector('.five-minutes')) breakers.push(hero.querySelector('.five-minutes'));
    if (hero.querySelector('.popular-features')) breakers.push(hero.querySelector('.popular-features'));
    if (hero.querySelectorAll('.top-trending-discussion-container')[1]) breakers.push(hero.querySelectorAll('.top-trending-discussion-container')[1]);
    if (hero.querySelectorAll('.top-trending-discussion-container')[2]) breakers.push(hero.querySelectorAll('.top-trending-discussion-container')[2]);
    for (k = 0; k < breakers.length; k++) {
        if (breakers[k].parentNode.classList.contains('module-metadata')) {
            thisBreak = breakers[k].parentNode;
            newBreaks.push(thisBreak);
            thisBreak.parentNode.removeChild(thisBreak);
        } else {
            newBreaks.push(breakers[k]);
            breakers[k].parentNode.removeChild(breakers[k]);
        }
    }
    reviewBox = document.createElement('div');
    reviewBox.className = 'storybox bottom-reviews grid_8 clearfix';
    reviewBox.appendChild(hero.querySelector('.bottom-reviews').parentNode);
    newBreaks.push(reviewBox);
    newBreaks.sort(function () {
        return 0.5 - Math.random()
    });
    (hero.querySelector('.top-trending-discussion-container')) ? newBreaks.unshift(hero.querySelector('.top-trending-discussion-container')) : false;
    return newBreaks;
}

function fillFrag(newChunks) {
    frag = document.createDocumentFragment();
    firstBreak = hero.firstElementChild.nextElementSibling.className;
    for (i = 0; i < newChunks.length; i++) {
        if ((i % 4 == 0 && newBreaks.length > 0 && i > 0) || (i == 0 && firstBreak != 'break') && newBreaks.length != 0) {
            (i == 0) ? nextB = 0 : nextB = Math.floor(Math.random() * newBreaks.length);
            breakDiv = document.createElement('div');
            breakDiv.className = 'break';
            thisBreak = newBreaks[nextB];
            breakDiv.appendChild(thisBreak);
            frag.appendChild(breakDiv);
            newBreaks.splice(nextB, 1);
        }
        frag.appendChild(newChunks[i]);
    }
    return frag;
}

function cleanChunks() {
    chunks = hero.getElementsByClassName('hub-chunk');
    for (k = chunks.length - 1; k >= 0; k--) {
        chunks[k].parentNode.removeChild(chunks[k]);
    }
}

function init() {
    if (typeof (unsafeWindow) != 'undefined') window = unsafeWindow;
    window.lastCall = new Date();
    window.nextPage = 1;
    window.heats = [5, 10, 20, 50, 100, 250, 500, 750, 1000, 1500];
    if (window.hero = document.querySelector('#hero').parentNode) {
        window.container = hero.parentNode;
        makeCss();
        newArticles = makeNewArticles();
        newBreaks = getBreaks();
        cleanChunks();
        frag = fillFrag(newArticles);
        nextButton = hero.querySelector(".pagination");
        nextButton.parentNode.removeChild(nextButton);
        nextButton.textContent = 'Load More Articles';
        nextButton.className = ('pagination hub-pagination bottombutton');
        frag.appendChild(nextButton);
        hero.appendChild(frag);
        window.docHeight = document.body.clientHeight;
        document.addEventListener("click", onClick, false);
        document.addEventListener('scroll', onScroll, false);
        window.addEventListener('load', function onLoad() {
            window.removeEventListener('load', onLoad, false);
            timed = setTimeout(onScroll, 100);
        }, false);
    }
}
init();