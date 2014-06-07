// ==UserScript==
// @name           CNETonAmazon
// @namespace      amazet
// @description    adds reviews from CNET.com to amazon product pages
// @include        http://*.amazon.com/*/dp/*
// @exclude        http://*.amazon.com/s/*
// @exclude        http://*.amazon.com/aan/*
// ==/UserScript==
//

// request data from techproduct search
//

var debugScript = false;
if (debugScript)
    alert(window.location.href);
var productName = '';


// get query param from url
var productRegex = /amazon.com\/([^\/]*)\//;
var query = "";
if (productRegex.test(window.location.href)){
    var m = productRegex.exec(window.location.href);
    query = m[1].replace(/-/g,'%20');
    if (debugScript)
        alert(query);
}

if (query){
    function parseDate(javaDateString) {
        var dateRegex = /([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])/;
        if (dateRegex.test(javaDateString)){
            var m = dateRegex.exec(javaDateString);
            return m[2]+'/' +m[3]+'/'+m[1];
        }else{
            return "";
        }
    }
    function addCnetReviewsData(query) {
        var cnetReview ={};
        cnetReview["query"] = query;
        var murl = "http://developer.api.cnet.com/rest/v1.0/techProductSearch?partKey=zy5bk4z8v5rbx6nd2uqcjdxm&partTag=zy5bk4z8v5rbx6nd2uqcjdxm&query="+query+"&iod=goodBad&criteria=hasGoodBad&limit=1";
        if (debugScript)
            alert(murl);

        GM_xmlhttpRequest({
          method: "GET", 
          url: murl, 
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/atom+xml,application/xml,text/xml',
          },

          onload: function(response)
          {
              var parser = new DOMParser();
              var dom = parser.parseFromString(response.responseText, "application/xml");
              var products = dom.getElementsByTagName('TechProduct');
              for (var i = 0; i < products.length; i++) {
                cnetReview["productName"] = products[i].getElementsByTagName('Name')[0].textContent;
                cnetReview["starRating"] = products[i].getElementsByTagName('EditorsStarRating')[0].textContent;
                cnetReview["reviewURL"] = products[i].getElementsByTagName('ReviewURL')[0].textContent;
                cnetReview["specs"] = products[i].getElementsByTagName('Specs')[0].textContent;
                cnetReview["videoId"] = (products[i].getElementsByTagName('Video')[0] ? products[i].getElementsByTagName('Video')[0].getAttribute('videoId'): '');
                cnetReview["reviewDate"] = parseDate(products[i].getElementsByTagName('ReviewDate')[0].textContent);
                cnetReview["releaseDate"] = parseDate(products[i].getElementsByTagName('ReleaseDate')[0].textContent);
                cnetReview["updatedDate"] = parseDate(products[i].getElementsByTagName('UpdatedDate')[0].textContent);
                cnetReview["isEditorsChoice"] = products[i].getElementsByTagName('EditorsChoice')[0].textContent;
                cnetReview["theGood"] = products[i].getElementsByTagName('Good')[0].textContent;
                cnetReview["theBad"] = products[i].getElementsByTagName('Bad')[0].textContent;
                cnetReview["theBottomLine"] = products[i].getElementsByTagName('BottomLine')[0].textContent;
              }
           if (debugScript)
              if (cnetReview.productName){
                  alert(cnetReview.productName + " with rating " + cnetReview.starRating);
              }else{
                alert('no product returned');
              }
          if (cnetReview.productName){
              insertReviewIntoPage(cnetReview);
          }
          }
        });
    }
    function insertReviewIntoPage(cnetReview){
        // inject into the 3rd table 8th row 
        var xpr = document.evaluate(
        "//form[@id='handleBuy']/table[3]/tbody/tr[8]/td[1]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
        var injectTo = xpr.snapshotItem(0);

        //create the cnet element
        var cnetWrapper = document.createElement('div');
        cnetWrapper.id = 'cnetReview';
        cnetWrapper.className = 'editorsTake amazonInsert';

        // title
        var title = document.createElement('strong');
        title.className = 'insertTitle';
        var logo = document.createElement('img');
        var titleText = document.createElement('span');
        titleText.appendChild(document.createTextNode('on Amazon'));
        logo.src = 'http://i.i.com.com/cnwk.1d/html/hackDay2010/rblogo.png';
        logo.alt = 'cnet on amazon';
        logo.className = 'rbLogoAmazon';
        title.appendChild(logo);
        title.appendChild(titleText);
        cnetWrapper.appendChild(title);

        // section head
        var sectionHead = document.createElement('div');
        sectionHead.className = 'sectionHed';
        var innerHead = document.createElement('div');
        innerHead.className = 'innerHed';
        var headTitle = document.createElement('h3');
        headTitle.appendChild(document.createTextNode("CNET editor's review"));
        var headLink = document.createElement('a');
        headLink.id = 'seeFReviewBar';
        headLink.href = cnetReview.reviewURL;   //CNET API
        headLink.className = 'readMore collapsed';
        var headLinkText = document.createElement('span');
        headLinkText.appendChild(document.createTextNode("View Full Review"));
        headLink.appendChild(headLinkText);
        innerHead.appendChild(headTitle);
        innerHead.appendChild(headLink);
        sectionHead.appendChild(innerHead);
        cnetWrapper.appendChild(sectionHead);

        //editor and review info
        var reviewInfo = document.createElement('div');
        reviewInfo.id = 'edProfile';
        reviewInfo.className = 'edProfile';
        var reviewInner = document.createElement('div');
        reviewInner.className = 'edProfileInner';
        var reviewList = document.createElement('ul');
        var reviewedOn = document.createElement('li');
        reviewedOn.appendChild(document.createTextNode("Reviewed on:"));
        var reviewedOnTime = document.createElement('span');
        reviewedOnTime.className = 'value';
        reviewedOnTime.appendChild(document.createTextNode(cnetReview.reviewDate)); //CNET API
        var updatedOn = document.createElement('li');
        updatedOn.appendChild(document.createTextNode("Updated on:"));
        var updatedOnTime = document.createElement('span');
        updatedOnTime.className = 'value';
        updatedOnTime.appendChild(document.createTextNode(cnetReview.updatedDate)); //CNET API
        var releasedOn = document.createElement('li');
        releasedOn.appendChild(document.createTextNode("Released on:"));
        var releasedOnTime = document.createElement('span');
        releasedOnTime.className = 'value';
        releasedOnTime.appendChild(document.createTextNode(cnetReview.releaseDate)); //CNET API
        var specs = document.createElement('li');
        specs.appendChild(document.createTextNode("Specs:"));
        var specsText = document.createElement('span');
        specsText.className = 'value';
        specsText.appendChild(document.createTextNode(cnetReview.productName + ' ' + cnetReview.specs)); //CNET API
        reviewedOn.appendChild(reviewedOnTime);
        updatedOn.appendChild(updatedOnTime);
        releasedOn.appendChild(releasedOnTime);
        specs.appendChild(specsText);
        reviewList.appendChild(reviewedOn);
        reviewList.appendChild(updatedOn);
        reviewList.appendChild(releasedOn);
        reviewList.appendChild(specs);
        reviewInner.appendChild(reviewList);
        reviewInfo.appendChild(reviewInner);
        cnetWrapper.appendChild(reviewInfo);



        //badgeWrap
        var badgeWrap = document.createElement('div');
        badgeWrap.className = 'badgeWrap';
        var ratingsWrap = document.createElement('div');
        ratingsWrap.className = 'ratings';
        var ratingsList = document.createElement('ul');
        var ratingsOverall = document.createElement('li');
        ratingsOverall.className = 'overall';
        var ratingsText = document.createElement('span');
        ratingsText.appendChild(document.createTextNode("CNET editor's rating"));
        var ratingsStar = document.createElement('a');
        switch (cnetReview.starRating){
        //CNET API
        case "5.0":
           ratingsStar.className = 'edRate5'; 
           break;
        case "4.5":
           ratingsStar.className = 'edRate4h'; 
           break;
        case "4.0":
           ratingsStar.className = 'edRate4'; 
           break;
        case "3.5":
           ratingsStar.className = 'edRate3h'; 
           break;
        case "3.0":
           ratingsStar.className = 'edRate3'; 
           break;
        case "2.5":
           ratingsStar.className = 'edRate2h'; 
           break;
        case "2.0":
           ratingsStar.className = 'edRate2'; 
           break;
        case "1.5":
           ratingsStar.className = 'edRate1h'; 
           break;
        case "1.0":
           ratingsStar.className = 'edRate1'; 
           break;
        case "0.5":
           ratingsStar.className = 'edRate0h'; 
           break;
        case "0.0":
           ratingsStar.className = 'edRate0'; 
           break;
        }

        var ratingsStarSpanWrap = document.createElement('span');
        var ratingsStarSpan = document.createElement('span');
        ratingsStarSpan.class = 'rating';
        ratingsStarSpanWrap.appendChild(ratingsStarSpan);
        ratingsStar.appendChild(ratingsStarSpanWrap);
        ratingsOverall.appendChild(ratingsText);
        ratingsOverall.appendChild(ratingsStar);
        ratingsList.appendChild(ratingsOverall);
        ratingsWrap.appendChild(ratingsList);
        badgeWrap.appendChild(ratingsWrap);
           //editors choice  (CNET API)
        if (cnetReview.isEditorsChoice === 'true'){
            var editorsChoice = document.createElement('a');
            editorsChoice.href = 'http://reviews.cnet.com/editors-choice/';
            var editorsChoiceSpan = document.createElement('span');
            editorsChoiceSpan.className = 'edsChoice';
            editorsChoice.appendChild(editorsChoiceSpan);
            badgeWrap.appendChild(editorsChoice);
        }
        cnetWrapper.appendChild(badgeWrap);


        //good
        var goodWrapper = document.createElement('p');
        var goodTitle = document.createElement('strong');
        goodTitle.appendChild(document.createTextNode("The good: "));
        var goodBody = document.createElement('span');
        goodBody.className = 'summary';
        goodBody.appendChild(document.createTextNode(cnetReview.theGood));  //CNET APi
        goodWrapper.appendChild(goodTitle);
        goodWrapper.appendChild(goodBody);
        cnetWrapper.appendChild(goodWrapper);

        //bad
        var badWrapper = document.createElement('p');
        var badTitle = document.createElement('strong');
        badTitle.appendChild(document.createTextNode("The bad: "));
        var badBody = document.createElement('span');
        badBody.className = 'summary';
        badBody.appendChild(document.createTextNode(cnetReview.theBad));  //CNET APi
        badWrapper.appendChild(badTitle);
        badWrapper.appendChild(badBody);
        cnetWrapper.appendChild(badWrapper);

        //bottom line
        var bottomWrapper = document.createElement('p');
        var bottomTitle = document.createElement('strong');
        bottomTitle.appendChild(document.createTextNode("The bottom line: "));
        var bottomBody = document.createElement('span');
        bottomBody.className = 'summary';
        bottomBody.appendChild(document.createTextNode(cnetReview.theBottomLine));  //CNET APi
        bottomWrapper.appendChild(bottomTitle);
        bottomWrapper.appendChild(bottomBody);
        cnetWrapper.appendChild(bottomWrapper);

        //full review link 
        var fullReview = document.createElement('div');
        fullReview.className = 'reviewSummary';
        var fullReviewP = document.createElement('p');
        var fullReviewLink = document.createElement('a');
        fullReviewLink.href = cnetReview.reviewURL; //CNET API 
        fullReviewLink.appendChild(document.createTextNode("Read the full review at CNET"));  //CNET APi
        fullReviewP.appendChild(fullReviewLink);
        fullReview.appendChild(fullReviewP);

        //cnet video link
        if (cnetReview.videoId){
            var videoP = document.createElement('p');
            var videoReviewLink = document.createElement('a');
            videoReviewLink.href = 'http://cnettv.cnet.com/9742-1_53-'+cnetReview.videoId +'.html'; //CNET API 
            videoReviewLink.appendChild(document.createTextNode("Watch review videos at CNETTV"));  //CNET APi
            videoP.appendChild(videoReviewLink);
            fullReview.appendChild(videoP);
        }

        cnetWrapper.appendChild(fullReview);

        //comments
        var comments = document.createComment("################# CNET REVIEW BE INVADIN' YO SPACE! ########################");

        // css 
        var amazetCss = document.createElement('link');
        amazetCss.setAttribute('rel', 'stylesheet');
        amazetCss.setAttribute('type', 'text/css');
        amazetCss.setAttribute('href', 'http://i.i.com.com/cnwk.1d/html/hackDay2010/amazet.css');
        

        if (injectTo.firstChild){
            injectTo.insertBefore(cnetWrapper, injectTo.firstChild);
            injectTo.insertBefore(amazetCss, injectTo.firstChild);
            injectTo.insertBefore(comments, injectTo.firstChild);
        }else{
            injectTo.appendChild(comments);
            injectTo.appendChild(amazetCss);
            injectTo.appendChild(cnetWrapper);
        }
    }
    addCnetReviewsData(query);
}


