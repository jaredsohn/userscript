// ==UserScript==
// @name           RottenFlix v2
// @namespace      lecapitan
// @description    Updates to the original script from Matt Blodgett. Integrates Rotten Tomatoes ratings with Netflix.com.
// @include        http://*.netflix.com/*
// @updateURL      https://userscripts.org/scripts/source/174805.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174805.user.js
// @version        12
// ==/UserScript==

document.rottenFlixObject = 
{
    requests: 0,

    addRatings: function()
    {
        console.log("adding ratings!");
        this.requests = 0;
        
        // Get the movie titles
        var movieTitles = document.getElementsByClassName("title");
        
        for (var i = 0; i < movieTitles.length; i++)
        {
            var dataElement;
            
            // Get data element
            if (this.hasClass(movieTitles[i], "rfWasHere"))
            {
                dataElement = this.getDataElement(movieTitles[i]);
            }
            else
            {
                dataElement = this.createDataElement(movieTitles[i]);
            }
            
            if (dataElement)
            {
                // Still loading
                if (this.hasClass(dataElement, "rfLoading"))
                {
                    this.requests += 1;
                }
                // Load ratings
                else if (!this.hasClass(dataElement, "rfLoaded"))
                {
                    if (this.requests < 5)
                    {
                        // Start the search
                        this.getRatings(movieTitles[i], dataElement);
                        this.requests += 1;
                    }
                }
            }
        }
        
        setTimeout(
            function()
            {
                document.rottenFlixObject.addRatings();
            },
            1000);
    },

    createDataElement: function(element)
    {
        // Mark the title link
        element.className += " rfWasHere";
        
        // Create a container element to hold our custom stuff
        var dataElement = document.createElement("a");
        dataElement.className = "rfData";
        dataElement.style["margin"] = "0 0 0 8px";
        dataElement.style["color"] = "red";
        
        // Append the new node
        if (element.tagName.toLowerCase() == "h2")
        {
            this.insertAfter(element, dataElement);
        }
        else
        {
            element.appendChild(dataElement);
        }
        
        return dataElement;
    },
    
    getDataElement: function(element)
    {
        return element.getElementsByClassName("rfData")[0];
    },
    
    hasClass: function(element, cls)
    {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    },

    insertAfter: function(referenceNode, newNode)
    {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    
    getRtUrl: function(element)
    {
        var title = element.innerHTML.replace(/-/g, " ").replace(/ /g, "+");
        return "http://www.rottentomatoes.com/search/?search=" + title;
    },
    
    getTitle: function(element)
    {
        return element.innerHTML;
    },
    
    getRatings: function(element, dataElement)
    {
        dataElement.innerHTML = "...";
        dataElement.className = "rfData rfLoading";
        // Check the element type
        if (element.tagName.toLowerCase() == "h2") // Movie title
        {
            // Get the year on this page
            var year;
            var yearItems = document.getElementsByClassName("year");
            for (var i = 0; i < yearItems.length; i++)
            {
                year = yearItems[i].innerHTML;
            }
            // Get the movie title                
            var title = element.innerHTML;
            // Get the url
            var rtUrl = this.getRtUrl(element);
            // Get the rotten tomatoes rating
            this.fetchRating(rtUrl, title, year, dataElement);
        }
        else if (element.getElementsByClassName("mdpLink").length > 0) // Movie link
        {
            // Get the year from netflix movie page
            this.fetchYear(element.getElementsByClassName("mdpLink")[0], dataElement);
        }
    },
    
    fetchYear: function(element, dataElement)
    {
        // Get the netflix url
        var nfUrl = element.href;
    
        // Get the rotten tomtoes URL
        var rtUrl = this.getRtUrl(element);
    
        // Make a cross-domain request for this url
        GM_xmlhttpRequest({
            method: 'GET',
            url: nfUrl,
            onload: function(responseDetails)
            {
                // Get the HTML document that we received
                var responseDoc = document.rottenFlixObject.getDom(responseDetails.responseText);

                // Get the year
                var yearItems = responseDoc.getElementsByClassName('year');
                for (var i = 0; i < yearItems.length; i++)
                {
                    year = yearItems[i].innerHTML;
                }

                // Get the movie title                
                var title = element.innerHTML;
                
                // Get the rotten tomatoes rating
                document.rottenFlixObject.fetchRating(rtUrl, title, year, dataElement);
            },
            onerror: function(responseDetails)
            {
                console.log("failure");
            }
        });
    },
    
    fetchRating: function(rtUrl, title, year, dataElement)
    {
        // Send the request to rotten tomatoes
        if (rtUrl && rtUrl != "")
        {
            dataElement.href = rtUrl;
            
            // Make a cross-domain request for this url
            GM_xmlhttpRequest({
                method: "GET",
                url: rtUrl,
                onload: function(responseDetails)
                {
                    // get the HTML document that we received
                    var responseDoc = document.rottenFlixObject.getDom(responseDetails.responseText);
                    
                    // Check for no results
                    if (responseDoc.getElementsByClassName("noresults").length > 0)
                    {
                        dataElement.innerHTML = "no results";
                        // Set the loaded flag
                        dataElement.className = "rfData rfLoaded";
                    }
                    // Check for movie list
                    else if (responseDoc.getElementById("movie_results_ul"))
                    {
                        // Get all list items
                        var movieItems = responseDoc.getElementsByClassName("media_block_content");
                        
                        // Check search results for a full match
                        for (var i = 0; i < movieItems.length; i++)
                        {
                            if (movieItems[i].getElementsByTagName("h3").length <= 0)
                            {
                                continue; // This is some menu element on the page
                            }
                            
                            var parsedTitle;
                            var parsedYear;
                            
                            // Get the title and url
                            var linkList = movieItems[i].getElementsByTagName("a");
                            for (var ii = 0; ii < linkList.length; ii++)
                            {
                                if (linkList[ii].href.indexOf("/m/") >= 0)
                                {
                                    parsedTitle = linkList[ii].innerHTML;
                                    rtUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
                                }
                            }
                            
                            // Get the year
                            var yearList = movieItems[i].getElementsByClassName("movie_year");
                            if (yearList.length > 0)
                            {
                                parsedYear = yearList[0].innerHTML.replace(/ /g, "").replace(/\(/, "").replace(/\)/, "");
                            }
                            
                            // Same year
                            if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, "") && parsedYear == year)
                            {
                                document.rottenFlixObject.fetchRating(rtUrl, title, year, dataElement);
                                return;
                            }
                        }
                        
                        // Check search results for a title match
                        for (var i = 0; i < movieItems.length; i++)
                        {
                            if (movieItems[i].getElementsByTagName("h3").length <= 0)
                            {
                                continue; // This is some menu element on the page
                            }
                            
                            var parsedTitle;
                            
                            // Get the title and url
                            var linkList = movieItems[i].getElementsByTagName("a");
                            for (var ii = 0; ii < linkList.length; ii++)
                            {
                                if (linkList[ii].href.indexOf("m/") >= 0)
                                {
                                    parsedTitle = linkList[ii].innerHTML;
                                    rtUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
                                }
                            }
                            
                            // Similar title
                            if (parsedTitle.toLowerCase().replace(/[^a-z0-9]/g, "") == title.toLowerCase().replace(/[^a-z0-9]/g, ""))
                            {
                                document.rottenFlixObject.fetchRating(rtUrl, title, year, dataElement);
                                return;                                
                            }
                        }
                        
                        // Check search results for a year match
                        for (var i = 0; i < movieItems.length; i++)
                        {
                            if (movieItems[i].getElementsByTagName("h3").length <= 0)
                            {
                                continue; // This is some menu element on the page
                            }
                            
                            var parsedYear;
                            
                            // Get the title and url
                            var linkList = movieItems[i].getElementsByTagName("a");
                            for (var ii = 0; ii < linkList.length; ii++)
                            {
                                if (linkList[ii].href.indexOf("/m/") >= 0)
                                {
                                    rtUrl = "http://www.rottentomatoes.com" + linkList[ii].href;
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
                                document.rottenFlixObject.fetchRating(rtUrl, title, year, dataElement);
                                return;
                            }
                        }
                        
                        dataElement.innerHTML = "..?";
                        // Set the loaded flag
                        dataElement.className = "rfData rfLoaded";
                    }
                    else
                    {
                        dataElement.innerHTML = "..?";
                        // Set the loaded flag
                        dataElement.className = "rfData rfLoaded";
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
                            dataElement.innerHTML += " / " + usersRating[0].innerHTML;
                        }
                        else
                        {
                            usersRating = responseDoc.getElementsByClassName('meter spilled numeric');
                            if (usersRating && usersRating.length > 0)
                            {
                                dataElement.innerHTML += " / " + usersRating[0].innerHTML;
                            }   
                        }
                    }
                },
                onerror: function(responseDetails)
                {
                    console.log("failure");
                }
            });   
        }
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

// check for new movie titles
document.rottenFlixObject.addRatings();
