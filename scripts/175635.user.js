// ==UserScript==
// @name        Netflix Ratings
// @namespace   lecapitan
// @description View various website ratings while in netflix
// @include     http://*.netflix.com/*
// @version     3
// ==/UserScript==

document.netflixRatingsObject = 
{
    load: function()
    {
        // If the page is a movie page
        var mdpOverview = document.getElementById("mdp-overview");
        if (mdpOverview)
        {
            var titleElement = this.getTitleElement(mdpOverview);
            // Get Rotten Tomatoes ratings
            var dataElement = this.getRTMainDataElement(mdpOverview);
            if (titleElement && dataElement)
            {
                // Load ratings
                if (!this.hasClass(dataElement, "nrLoading") && !this.hasClass(dataElement, "nrLoaded"))
                {
                    // Start the search
                    this.getRatings("RottenTomatoes", this.getTitle(titleElement), this.getYear(mdpOverview), dataElement);
                }
            }
            // Get IMDb ratings
            dataElement = this.getIMDbMainDataElement(mdpOverview);
            if (titleElement && dataElement)
            {
                // Load ratings
                if (!this.hasClass(dataElement, "nrLoading") && !this.hasClass(dataElement, "nrLoaded"))
                {
                    // Start the search
                    this.getRatings("IMDb", this.getTitle(titleElement), this.getYear(mdpOverview), dataElement);
                }
            }
            // Get metacritic ratings
            dataElement = this.getmetacriticMainDataElement(mdpOverview);
            if (titleElement && dataElement)
            {
                // Load ratings
                if (!this.hasClass(dataElement, "nrLoading") && !this.hasClass(dataElement, "nrLoaded"))
                {
                    // Start the search
                    this.getRatings("metacritic", this.getTitle(titleElement), this.getYear(mdpOverview), dataElement);
                }
            }
        }
    },
    
    getTitleElement: function(element)
    {
        if (element.id && element.id == "mdp-overview")
        {
            if (element.getElementsByClassName("title").length > 0)
            {
                return element.getElementsByClassName("title")[0];
            }
        }
        return undefined;
    },
    
    getRTMainDataElement: function(element)
    {
        if (element.getElementsByClassName("nrRTMainData").length > 0)
        {
            return element.getElementsByClassName("nrRTMainData")[0];
        }
        else
        {
            if (document.getElementsByTagName("dl").length > 0)
            {
                var dlElement = document.getElementsByTagName("dl")[0];
                var dtElement = document.createElement("dt");
                dtElement.innerHTML = "Rotten Tomatoes: ";
                dlElement.appendChild(dtElement);
                var ddElement = document.createElement("dd");
                var linkElement = document.createElement("a");
                linkElement.className = "nrRTMainData";
                ddElement.appendChild(linkElement);
                dlElement.appendChild(ddElement);
                return linkElement;
            }                
        }
        return undefined;
    },
    
    getIMDbMainDataElement: function(element)
    {
        if (element.id && element.id == "mdp-overview")
        {
            if (element.getElementsByClassName("nrIMDbMainData").length > 0)
            {
                return element.getElementsByClassName("nrIMDbMainData")[0];
            }
            else
            {
                if (document.getElementsByTagName("dl").length > 0)
                {
                    var dlElement = document.getElementsByTagName("dl")[0];
                    var dtElement = document.createElement("dt");
                    dtElement.innerHTML = "IMDb: ";
                    dlElement.appendChild(dtElement);
                    var ddElement = document.createElement("dd");
                    var linkElement = document.createElement("a");
                    linkElement.className = "nrIMDbMainData";
                    ddElement.appendChild(linkElement);
                    dlElement.appendChild(ddElement);
                    return linkElement;
                }                
            }
        }
        return undefined;
    },
    
    getmetacriticMainDataElement: function(element)
    {
        if (element.id && element.id == "mdp-overview")
        {
            if (element.getElementsByClassName("nrmetacriticMainData").length > 0)
            {
                return element.getElementsByClassName("nrmetacriticMainData")[0];
            }
            else
            {
                if (document.getElementsByTagName("dl").length > 0)
                {
                    var dlElement = document.getElementsByTagName("dl")[0];
                    var dtElement = document.createElement("dt");
                    dtElement.innerHTML = "metacritic: ";
                    dlElement.appendChild(dtElement);
                    var ddElement = document.createElement("dd");
                    var linkElement = document.createElement("a");
                    linkElement.className = "nrmetacriticMainData";
                    ddElement.appendChild(linkElement);
                    dlElement.appendChild(ddElement);
                    return linkElement;
                }                
            }
        }
        return undefined;
    },
    
    getRatings: function(type, title, year, dataElement)
    {
        dataElement.innerHTML = "...";
        // Get the rotten tomatoes rating
        if (type == "RottenTomatoes")
        {
            dataElement.className = "nrRTMainData nrLoading";
            this.fetchRating(type, this.getRTUrl(title), title, year, dataElement);
        }
        else if (type == "IMDb")
        {
            dataElement.className = "nrIMDbMainData nrLoading";
            this.fetchRating(type, this.getIMDbUrl(title), title, year, dataElement);
        }
        else if (type == "metacritic")
        {
            dataElement.className = "nrmetacriticMainData nrLoading";
            this.fetchRating(type, this.getmetacriticUrl(title), title, year, dataElement);
        }
    },
    
    getRTUrl: function(title)
    {
        return "http://www.rottentomatoes.com/search/?search=" + title.replace(/-/g, " ").replace(/ /g, "+");
    },
    
    getIMDbUrl: function(title)
    {
        return "http://www.imdb.com/find?q=" + title.replace(/-/g, " ").replace(/ /g, "+").replace(/&amp;/g, "%26") + "&s=all";
    },
    
    getmetacriticUrl: function(title)
    {
        return "http://www.metacritic.com/search/movie/" + title.replace(/-/g, " ").replace(/ /g, "+") + "/results";
    },
    
    fetchRating: function(type, url, title, year, dataElement)
    {
        // Send the request
        if (url && url != "")
        {
            // Set the link
            dataElement.href = url;
            // Make a cross-domain request for this url
            if (type == "RottenTomatoes")
            {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    onload: function(responseDetails)
                    {
                        // Get the HTML document that we received
                        var responseDoc = document.netflixRatingsObject.getDom(responseDetails.responseText);
                        // Parse the response
                        document.netflixRatingsObject.parseRTResponse(responseDoc, title, year, dataElement);
                    },
                    onerror: function(responseDetails)
                    {
                        console.log("failure");
                    }
                });
            }
            else if (type == "IMDb")
            {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    onload: function(responseDetails)
                    {
                        // Get the HTML document that we received
                        var responseDoc = document.netflixRatingsObject.getDom(responseDetails.responseText);
                        // Parse the response
                        document.netflixRatingsObject.parseIMDbResponse(responseDoc, title, year, dataElement);
                    },
                    onerror: function(responseDetails)
                    {
                        console.log("failure");
                    }
                });
            }
            else if (type == "metacritic")
            {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    onload: function(responseDetails)
                    {
                        // Get the HTML document that we received
                        var responseDoc = document.netflixRatingsObject.getDom(responseDetails.responseText);
                        // Parse the response
                        document.netflixRatingsObject.parsemetacriticResponse(responseDoc, title, year, dataElement);
                    },
                    onerror: function(responseDetails)
                    {
                        console.log("failure");
                    }
                });
            }
        }
    },
    
    // -----------------------------------
    // Parsing functions
    // -----------------------------------
    parseRTResponse: function(responseDoc, title, year, dataElement)
    {
        // Check for no results
        if (responseDoc.getElementsByClassName("noresults").length > 0)
        {
            dataElement.innerHTML = "no results";
            // Set the loaded flag
            dataElement.className = "nrRTMainData nrLoaded";
        }
        // Check for search results list
        else if (responseDoc.getElementById("movie_results_ul"))
        {
            // Get all list items
            var movieItems = responseDoc.getElementsByClassName("media_block_content");
            // Check search results for a full match (title and year)
            for (var i = 0; i < movieItems.length; i++)
            {
                if (movieItems[i].getElementsByTagName("h3").length <= 0)
                {
                    continue; // This is some menu element on the page
                }
                var parsedTitle;
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/m/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var yearList = movieItems[i].getElementsByClassName("movie_year");
                if (yearList.length > 0)
                {
                    parsedYear = yearList[0].innerHTML.replace(/ /g, "").replace(/\(/, "").replace(/\)/, "");
                }
                // Check the title and year
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, "") && parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("RottenTomatoes", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a full match, check search results for just a title match
            for (var i = 0; i < movieItems.length; i++)
            {
                if (movieItems[i].getElementsByTagName("h3").length <= 0)
                {
                    continue; // This is some menu element on the page
                }
                var parsedTitle;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("m/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
                    }
                }
                // Similar title
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, ""))
                {
                    document.netflixRatingsObject.fetchRating("RottenTomatoes", newUrl, title, year, dataElement);
                    return;                                
                }
            }
            // Did not find a title match, check search results for just a year match
            for (var i = 0; i < movieItems.length; i++)
            {
                if (movieItems[i].getElementsByTagName("h3").length <= 0)
                {
                    continue; // This is some menu element on the page
                }
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/m/") >= 0)
                    {
                        newUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var yearList = movieItems[i].getElementsByClassName("movie_year");
                if (yearList.length > 0)
                {
                    parsedYear = yearList[0].innerHTML.replace(/ /g, "").replace(/\(/, "").replace(/\)/, "");
                }
                // Same year
                if (parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("RottenTomatoes", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find any matches
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrRTMainData nrLoaded";
        }
        // Got a movie's page
        else
        {
            // Set the element text, if we cannot parse critic or user ratings
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrRTMainData nrLoaded";
            // Get the critics rating
            var criticsRating = responseDoc.getElementById('all-critics-meter');
            if (criticsRating)
            {
                dataElement.innerHTML = criticsRating.innerHTML;
            }
            // Get the users rating
            var usersRating = responseDoc.getElementsByClassName('meter popcorn numeric');
            if (usersRating && usersRating.length > 0)
            {
                dataElement.innerHTML += " | " + usersRating[0].innerHTML;
            }
            else
            {
                usersRating = responseDoc.getElementsByClassName('meter spilled numeric');
                if (usersRating && usersRating.length > 0)
                {
                    dataElement.innerHTML += " | " + usersRating[0].innerHTML;
                }   
            }
        }
    },
    
    parseIMDbResponse: function(responseDoc, title, year, dataElement)
    {
        // Check for no results - IMDb seems to always provide some results...
        if (responseDoc.getElementsByClassName("noresults").length > 0)
        {
            dataElement.innerHTML = "no results";
            // Set the loaded flag
            dataElement.className = "nrIMDbMainData nrLoaded";
        }
        // Check for search results list
        else if (responseDoc.getElementsByClassName("findList").length > 0)
        {
            // Get all list items
            var movieItems = responseDoc.getElementsByClassName("result_text");
            // Check search results for a full match (title and year)
            for (var i = 0; i < movieItems.length; i++)
            {
                var parsedTitle;
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/title/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.imdb.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var yearMatch = movieItems[i].innerHTML.match(/\(([0-9]*)\)/);
                if (yearMatch.length > 0)
                {
                    parsedYear = yearMatch[1];
                }
                // Same title and year
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, "") && parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("IMDb", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a full match, check search results for just a title match
            for (var i = 0; i < movieItems.length; i++)
            {
                var parsedTitle;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/title/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.imdb.com" + linkList[ii].href;
                    }
                }
                // Same title
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, ""))
                {
                    document.netflixRatingsObject.fetchRating("IMDb", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a title match, check search results for just a year match
            for (var i = 0; i < movieItems.length; i++)
            {
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/title/") >= 0)
                    {
                        newUrl = "http://www.imdb.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var yearMatch = movieItems[i].innerHTML.match(/\(([0-9]*)\)/);
                if (yearMatch.length > 0)
                {
                    parsedYear = yearMatch[1];
                }
                // Same year
                if (parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("IMDb", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a match
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrIMDbMainData nrLoaded";
        }
        else
        {
            // Set the element text, if we cannot parse ratings
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrIMDbMainData nrLoaded";
            // Get the IMDb rating
            var elementList = responseDoc.getElementsByClassName("star-box-giga-star");
            if (elementList.length >= 0)
            {
                dataElement.innerHTML = elementList[0].innerHTML;
            }
        }
    },
    
    parsemetacriticResponse: function(responseDoc, title, year, dataElement)
    {
        // Check for no results - IMDb seems to always provide some results...
        if (responseDoc.getElementsByClassName("noresults").length > 0)
        {
            dataElement.innerHTML = "no results";
            // Set the loaded flag
            dataElement.className = "nrmetacriticMainData nrLoaded";
        }
        // Check for search results list
        else if (responseDoc.getElementsByClassName("search_results").length > 0)
        {
            // Get all list items
            var movieItems = responseDoc.getElementsByClassName("result");
            // Check search results for a full match (title and year)
            for (var i = 0; i < movieItems.length; i++)
            {
                // Check the result type
                var resultTypeElements = movieItems[0].getElementsByClassName("result_type");
                if (resultTypeElements.length <= 0 || resultTypeElements[0].childNodes[1].innerHTML != "Movie")
                {
                    continue; // Not a movie result type
                }
                var parsedTitle;
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/movie/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.metacritic.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var releaseDateElements = movieItems[i].getElementsByClassName("release_date");
                if (releaseDateElements.length > 0)
                {
                    var yearMatches = releaseDateElements[0].childNodes[3].innerHTML.match(/[A-Za-z0-9 ]*[,][ ]([0-9][0-9][0-9][0-9])/);
                    if (yearMatches)
                    {
                        parsedYear = yearMatches[1];
                    }
                }
                // Same title and year
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, "") && parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("metacritic", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a full match, check search results for just a title match
            for (var i = 0; i < movieItems.length; i++)
            {
                // Check the result type
                var resultTypeElements = movieItems[0].getElementsByClassName("result_type");
                if (resultTypeElements.length <= 0 || resultTypeElements[0].childNodes[1].innerHTML != "Movie")
                {
                    continue; // Not a movie result type
                }
                var parsedTitle;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/movie/") >= 0)
                    {
                        parsedTitle = linkList[ii].innerHTML;
                        newUrl = "http://www.metacritic.com" + linkList[ii].href;
                    }
                }
                // Same title
                if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, ""))
                {
                    document.netflixRatingsObject.fetchRating("metacritic", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a title match, check search results for just a year match
            for (var i = 0; i < movieItems.length; i++)
            {
                // Check the result type
                var resultTypeElements = movieItems[0].getElementsByClassName("result_type");
                if (resultTypeElements.length <= 0 || resultTypeElements[0].childNodes[1].innerHTML != "Movie")
                {
                    continue; // Not a movie result type
                }
                var parsedYear;
                var newUrl;
                // Get the title and url
                var linkList = movieItems[i].getElementsByTagName("a");
                for (var ii = 0; ii < linkList.length; ii++)
                {
                    if (linkList[ii].href.indexOf("/movie/") >= 0)
                    {
                        newUrl = "http://www.metacritic.com" + linkList[ii].href;
                    }
                }
                // Get the year
                var releaseDateElements = movieItems[i].getElementsByClassName("release_date");
                if (releaseDateElements.length > 0)
                {
                    var yearMatches = releaseDateElements[0].childNodes[3].innerHTML.match(/[A-Za-z0-9 ]*[,][ ]([0-9][0-9][0-9][0-9])/);
                    if (yearMatches)
                    {
                        parsedYear = yearMatches[1];
                    }
                }
                // Same title and year
                if (parsedYear == year)
                {
                    document.netflixRatingsObject.fetchRating("metacritic", newUrl, title, year, dataElement);
                    return;
                }
            }
            // Did not find a match
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrmetacriticMainData nrLoaded";
        }
        else
        {
            // Set the element text, if we cannot parse ratings
            dataElement.innerHTML = "..?";
            // Set the loaded flag
            dataElement.className = "nrmetacriticMainData nrLoaded";
            // Get the metacritic rating
            var criticsRating, usersRating;
            var elementList = responseDoc.getElementsByClassName("score_value");
            if (elementList.length >= 0)
            {
                for (var i = 0; i < elementList.length; i++)
                {
                    if (elementList[i].parentNode.tagName.toLowerCase() == "a" && elementList[i].parentNode.href.indexOf("critic-reviews") >= 0)
                    {
                        criticsRating =  elementList[i].innerHTML;
                    }
                    if (elementList[i].parentNode.tagName.toLowerCase() == "a" && elementList[i].parentNode.href.indexOf("user-reviews") >= 0)
                    {
                        usersRating = elementList[i].innerHTML;
                    }
                }
                if (criticsRating)
                {
                    dataElement.innerHTML = criticsRating;
                }
                if (usersRating)
                {
                    dataElement.innerHTML += " | " + usersRating;
                }
            }
        }
    },
    
    // -----------------------------------
    // Helper functions
    // -----------------------------------
    hasClass: function(element, cls)
    {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },

    insertAfter: function(referenceNode, newNode)
    {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    
    getTitle: function(element)
    {
        return element.innerHTML;
    },
    
    getYear: function(element)
    {
        var year;
        if (element.getElementsByClassName("year"))
        {
            year = element.getElementsByClassName("year")[0].innerHTML;
        }
        return year;
    },
    
    getDom: function(responseHTML)
    {
        var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
        var doc = document.implementation.createDocument('', '', dt);
        var html = doc.createElement('html');
        html.innerHTML = responseHTML;
        doc.appendChild(html);
        return doc;
    }
};

// Inject CSS
var styleElement = document.createElement('style');
styleElement.type = 'text/css';
styleElement.innerHTML =  '#mdp-metadata dl dt { width:25% !important; }';
styleElement.innerHTML += '#mdp-metadata dl dd { width:70% !important; }';
document.head.appendChild(styleElement);

// Load ratings
document.netflixRatingsObject.load();