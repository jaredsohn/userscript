// ==UserScript==
// @name IMDB Rating Viewer
// @namespace http://www.imdb.com
// @description While seeing each Actor's moviegraph , see the movie rating too
// @include http://www.imdb.com/name/*
// @grant GM_xmlhttpRequest
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var imdbActorData  = {
    _concurrentAjaxRequests:3 ,
    listOfMatchAndExecutors:[],
    allFilmsAsActorDiv : null,
    loopCounter : 0
}

imdbActorData.allFilmsAsActorDiv = $('#filmo-head-actor').next().find('.filmo-row');

if (imdbActorData.allFilmsAsActorDiv.length == 0) {
    imdbActorData.allFilmsAsActorDiv = $('#filmo-head-actress').next().find('.filmo-row');
}

if (imdbActorData.allFilmsAsActorDiv.length > 0) {
    imdbActorData.allFilmsAsActorDiv.each(function (index, elem) {


        //Now create a JSON object to parse IMDB rating and push it in the html
        var imdbRatingObj = {
            match: "div.star-box-details>strong>span[itemprop='ratingValue']",
            data: $(elem),
            executor: function (jqElem, target) {
                var rating = jqElem.html().trim();
                var htmlToAppend = '<span style="padding:10px;font-family:Calibri;font-size:14px;color:red">IMDB Rating : ' + rating + '/10</span>';
                target.append(htmlToAppend);
            }
        }
        var metaScoreRatingObj = {
            match: "div.star-box-details>a[title*='Metacritic.com']",
            data: $(elem),
            executor: function (jqElem, target) {
                var rating = jqElem.html().trim();
                var htmlToAppend = '<span style="padding:10px;font-family:Calibri;font-size:14px;color:green">Metacritic Rating : ' + rating + '</span>';
                target.append(htmlToAppend);
            }
        }

        var arrayObj = [];
        arrayObj.push(imdbRatingObj);
        arrayObj.push(metaScoreRatingObj);
        imdbActorData.listOfMatchAndExecutors.push(arrayObj);

    });
}

function GetDataFromUrl(url, arrayOfExecutors,mandatoryCallBack,contextData,callIndex) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (response) {
            var htmlText = '';
            if (response != null && response != undefined && response != '') {
                if (hasValue(response.responseText)){
                    htmlText = response.responseText.trim();
                    var jqParsedNodes = $($.parseHTML(htmlText));

                    if (jqParsedNodes.length > 0) {
                        $.each(arrayOfExecutors, function (aIndex, executors) {
                            jqParsedNodes.each(function (bIndex, elem) {
                                var jqElem = $(elem);
                                var parentJqElem = jqElem.clone().wrap('<p>').parent();
                                var htmlContent = parentJqElem.html().trim();
                                var findHref = parentJqElem.find(executors.match);
                                if (findHref.length > 0) {
                                    executors.executor(findHref, executors.data);
                                    return false;
                                }
                            });
                        });

                    }
                    //console.log("XmlHttpOnload:CallIndex : " + callIndex);
                    //console.log("XmlHttpOnload:Calling mandatoryCallBack");
                    mandatoryCallBack(contextData,callIndex);
                }
            }
        }
    });

}

function PopulateRatings(listOfMatchAndExecutors) {
    var localCounter = 0;
    while (localCounter< imdbActorData._concurrentAjaxRequests) {
        var currentData = imdbActorData.listOfMatchAndExecutors[imdbActorData.loopCounter];
        imdbActorData.loopCounter++;
        localCounter++;
        var url = currentData[0].data.find('b>a').attr('href');
        if (hasValue(url)) {
            GetDataInvoker(url, currentData,MandatoryCallBack,imdbActorData,imdbActorData.loopCounter);
           // console.log("PopulateRatings:After GetDataInvoker:Length of Array : " + imdbActorData.listOfMatchAndExecutors.length);
         //   console.log("PopulateRatings:After GetDataInvoker:CallIndex : " + imdbActorData.loopCounter)
        }
    }
}

function GetDataInvoker(url, executeOnResponse,mandatoryCallBack,contextData,loopCounter) {
    GetDataFromUrl(url, executeOnResponse,mandatoryCallBack,contextData,loopCounter);
}


function MandatoryCallBack(contextData,callIndex)
{
    //console.log("MandatoryCallBack:CallIndex : "+contextData.loopCounter);
   // console.log("MandatoryCallBack:ArrayLength : "+contextData.listOfMatchAndExecutors.length);
    if(callIndex % contextData._concurrentAjaxRequests === 0)
    {
        if (contextData.listOfMatchAndExecutors.length > 0) {
            PopulateRatings(contextData.listOfMatchAndExecutors);
        }
    }
}
function hasValue(str) {
    var returnBool = false;
    if (str != undefined && str != null && str != '') {
        returnBool = true;
    }
    return returnBool;
}

if (imdbActorData.listOfMatchAndExecutors.length > 0) {
    PopulateRatings(imdbActorData.listOfMatchAndExecutors);
}