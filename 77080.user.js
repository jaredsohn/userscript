// ==UserScript==
// @name          facebook.com page information
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Adds a "page information" section with some useful stuff in the facebook advert sidebar
// @include       http://*facebook.*/pages/*/*
// ==/UserScript==

// Set up a interval
var facebookPageInformationCheckInterval = window.setInterval(function()
{
    // Get the address
    var address = location.href;
    
    // Check whether we are not on the manage tab
    if (address.indexOf('/pages/manage') == -1)
    {
        // Split the address
        var splittedAddress = address.split('/');

        // Find the page name
        var pageName = splittedAddress[4];

        // Find the page id
        var splittedPageId = splittedAddress[5].split('?');
        var pageId = splittedPageId[0];

        // Get the ads sidebar
        var adsSidebar = document.getElementById('sidebar_ads');
        
        // Check whether the sidebar markup is already loaded
        if (adsSidebar)
        {
            // Get the div container in which we have to insert our markup
            var content = adsSidebar.firstChild.firstChild;

            // Get the "create an advert" headline to fix some design issues
            var originalHeadline = content.firstChild;
            originalHeadline.setAttribute('class', 'adcolumn_header admarket_ad');
            originalHeadline.style.paddingTop = '5px';

            // Create the column header
            var headerColumn = document.createElement('div');
            headerColumn.setAttribute('class', 'adcolumn_header');

            // Create the column header link
            var headerColumnLink = document.createElement('a');
            headerColumnLink.setAttribute('href', 'http://www.facebook.com/?ref=logo#!/pages/manage');    
            var headerColumnLinkText = document.createTextNode('Manage your pages');
            headerColumnLink.appendChild(headerColumnLinkText);

            // Append the column header link
            headerColumn.appendChild(headerColumnLink);
       
            // Create the body
            var contentColumn = document.createElement('div');
            contentColumn.setAttribute('class', 'admarket_ad');

            // Create the body
            var contentColumnChild = document.createElement('div');
            contentColumnChild.setAttribute('class', 'social_ad_advert');

            // Create the create page link
            var createPageLinkContainer = document.createElement('h2');
            createPageLinkContainer.setAttribute('class', 'ad_title'); 
            var createPageLink = document.createElement('a');
            createPageLink.setAttribute('href', 'http://www.facebook.com/pages/create.php');    
            var createPageLinkText = document.createTextNode('Create a new page');
            createPageLink.appendChild(createPageLinkText);
            createPageLinkContainer.appendChild(createPageLink);
            
            // Append the create apge link
            contentColumnChild.appendChild(createPageLinkContainer);
            
            // Create some text
            var contentTextColumn = document.createElement('div');
            contentTextColumn.setAttribute('class', 'social_ad_advert_text');
            var contentTextColumnText = document.createTextNode('The id of the current page is: ' + pageId + '.');
            contentTextColumn.appendChild(contentTextColumnText);
            
            // Append the text
            contentColumnChild.appendChild(contentTextColumn);

            // Create some text
            contentTextColumn = document.createElement('div');
            contentTextColumn.setAttribute('class', 'social_ad_advert_text');
            contentTextColumnText = document.createTextNode('Click the following link to reach the shortest possible link to this page.');
            contentTextColumn.appendChild(contentTextColumnText);

            // Append the text
            contentColumnChild.appendChild(contentTextColumn);
                    
            // Create some text
            contentTextColumn = document.createElement('div');
            contentTextColumn.setAttribute('class', 'social_ad_advert_text');

            // Create the short page link
            var shortestPageLink = document.createElement('a');
            shortestPageLink.setAttribute('href', 'http://www.facebook.com/pages/' + pageName + '/' + pageId);    
            var shortestPageLinkText = document.createTextNode('Short link to this page');
            shortestPageLink.appendChild(shortestPageLinkText);

            // Append the short page link
            contentTextColumn.appendChild(shortestPageLink);

            // Append the text
            contentColumnChild.appendChild(contentTextColumn);
           
            // Append the column content
            contentColumn.appendChild(contentColumnChild);
            content.insertBefore(contentColumn, content.firstChild);

            // Append the header column
            content.insertBefore(headerColumn, content.firstChild);
            
            // Stop the interval after facebook finished loading all the dom
            window.clearInterval(facebookPageInformationCheckInterval);
        }
    }
}, 100);