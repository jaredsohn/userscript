// ==UserScript==
// @name           MSDN in fullscreen
// @namespace      http://userscripts.org/users/74338
// @description    Removes clutter in MSDN pages
// @include        http://msdn.microsoft.com/*
// @include        http://msdn2.microsoft.com/*
// @include        http://technet.microsoft.com/*
// ==/UserScript==

// CHANGELOG
// v1.0.0 (2008.12.06)
//    initial release
// v1.0.1 (2009.03.22)
//    header visibility can now be toggled
//    added patch for the ctrl+t MS bug w/c toggles the splitter panel
//      when a user opens a new tab via ctrl+t keyboard shortcut
// v1.0.2 (2009.03.27)
//    fixed a bug in the header height where it stays at the expanded height after collapsing
// v1.0.3 (2009.12.04)
//    added support to toggle the visibility of toc by pressing 't' in 'scriptfree' view
// v1.0.4 (2009.12.08)
//    updated to adopt to current msdn classic layout
//    fixed toc layout problem after toggle in scriptfree view
// v1.0.5 (2010.01.05)
//    assigned anonymous functions to variables (chrome compatibility)
//    default to classic view when viewkey does not exist
// v1.0.6 (2010.02.01)
//    fixed regex may fail to match viewkey cookie
//    added technet to @include
// v1.0.7 (2010.02.07)
//    assumed `classic` view when `viewkey` cookie is null
// v1.0.8 (2010.04.17)
//    added support for new msdn layout
// v1.0.9 (2010.04.21)
//    updated grip style for hiding navigation

var viewKey = document.cookie.match(/viewkey=([^;]*);?/);

if (viewKey == null || (viewKey[1] == 'classic'))
{
    var collapsibleHeader = document.createElement('div');
    var rheader = document.getElementById('rheader');
    
    if (rheader == null)
    {
        // MSDN as of April 2010
        var searchForm = document.getElementById('SearchForm');
      
        if (searchForm != null)
        {
            var findNavControl =    function(ctrl)
                                    {
                                        if (ctrl.parentNode.className == 'navigation')
                                        {
                                            return ctrl.parentNode;
                                        }
                                        
                                        return findNavControl(ctrl.parentNode);
                                    }
                                    
            var navigation = findNavControl(searchForm);
            
            var toggleHeader = document.createElement('div');

            toggleHeader.style.float = 'right';
            toggleHeader.style.backgroundColor = '#BBBBBB';
            toggleHeader.style.cursor          = 'pointer';
            toggleHeader.style.textAlign       = 'center';
            toggleHeader.style.width           = 5 + 'px';
            toggleHeader.style.height          = navigation.parentNode.offsetHeight + 'px';
            toggleHeader.style.position        = 'absolute';
            toggleHeader.style.marginLeft      = navigation.offsetWidth - 5 + 'px';
            toggleHeader.title = 'Click to toggle header visibility';

            var headerGrip = document.createElement('div');
            headerGrip.style.background = 'transparent url(/global/Images/LibC.gif) no-repeat scroll -178px 0px';
            //headerGrip.style.display    = 'inline-block';
            headerGrip.style.display    = 'block';
            headerGrip.style.height     =  50 + 'px';
            headerGrip.style.width      =  3 + 'px';
            headerGrip.style.marginTop  =  ((document.documentElement.clientHeight / 2) - navigation.offsetTop) + 'px';
            headerGrip.style.position   = 'fixed';
            
            toggleHeader.appendChild(headerGrip);
            navigation.insertBefore(toggleHeader, navigation.childNodes[0]);
            
            navigation.defaultWidth = parseInt(navigation.offsetWidth);
            var toggleNavVisibility =   function()
                                        {
                                            var isDisplayed = parseInt(navigation.style.width) != 5;
                                            if (isDisplayed)
                                            {
                                                navigation.style.width = 5 + 'px';
                                                toggleHeader.style.marginLeft = 0;
                                            }
                                            else
                                            {
                                                navigation.style.width = navigation.defaultWidth + 'px';
                                                toggleHeader.style.marginLeft = navigation.defaultWidth - 5 + 'px';
                                            }
                                            
                                            var now = new Date();
                                            document.cookie = 'toccollapsed=' + (isDisplayed ? 'true' : 'false') + ';path=/;expires=' + (new Date(now.getTime() + 2592000000)).toGMTString();
                                        };
            
            toggleHeader.addEventListener('click', toggleNavVisibility, false);
            
            var collapsedCookie = document.cookie.match(/toccollapsed=([^;]*);?/);
            if (collapsedCookie != null && collapsedCookie.length == 2 && collapsedCookie[1] == 'true')
            {
                toggleNavVisibility();
            }
            return;
        }
    }

    // classic MSDN style
    while(rheader.childNodes.length > 0)
    {
        collapsibleHeader.appendChild(rheader.childNodes[0]);
    }

    rheader.appendChild(collapsibleHeader);

    var toggleHeader = document.createElement('div');

    toggleHeader.style.backgroundColor = '#BBBBBB';
    toggleHeader.style.cursor          = 'pointer';
    toggleHeader.style.textAlign       = 'center';
    toggleHeader.style.width           = 100 + '%';
    toggleHeader.style.height          = 6 + 'px';
    toggleHeader.style.marginTop       = -12 + 'px';
    toggleHeader.title = 'Click to toggle header visibility';

    var headerGrip = document.createElement('div');
    headerGrip.style.background = 'transparent url(/global/Images/LibC.gif) no-repeat scroll -178px 0px';
    headerGrip.style.display    = 'inline-block';
    headerGrip.style.height     =  3 + 'px';
    headerGrip.style.position   = 'relative';
    headerGrip.style.top        = -6 + 'px';
    headerGrip.style.width      =  5 + 'px';

    toggleHeader.appendChild(headerGrip);
    toggleHeader.appendChild(headerGrip.cloneNode(true));
    toggleHeader.appendChild(headerGrip.cloneNode(true));
    toggleHeader.appendChild(headerGrip.cloneNode(true));
    toggleHeader.appendChild(headerGrip.cloneNode(true));
    rheader.appendChild(toggleHeader);

    var mainContent = document.getElementById('contents');

    var contentHeight = 
        { 
            expanded:  (parseInt(window.getComputedStyle(mainContent, null)['top']) + toggleHeader.offsetHeight) + 'px',
            collapsed: (toggleHeader.offsetHeight) + 'px'
        };

    var rheaderDefaultHeight = rheader.offsetHeight;
    var toggleHeaderVisibility = function ()
    {    
        var currentDisplay = window.getComputedStyle(collapsibleHeader, null)['display'];
        var isDisplayed    = currentDisplay == 'block';
        
        collapsibleHeader.style.display = isDisplayed ? 'none' : 'block';
        mainContent.style.top = (isDisplayed ? contentHeight.collapsed : contentHeight.expanded);
        
        rheader.style.height = (isDisplayed ? toggleHeader.offsetHeight : rheaderDefaultHeight) + 'px';
        toggleHeader.style.marginTop = (isDisplayed ? 0 : -12) + 'px';
        
        var now = new Date();
        var expireDate = new Date(now.getTime() + 2592000000);
        document.cookie = 'tohcollapsed=' + (isDisplayed ? 'true' : 'false') + ';path=/;expires=' + expireDate.toGMTString();  
    }

    toggleHeader.addEventListener('click', toggleHeaderVisibility, false);
    var collapsedHeaderCookie = document.cookie.match(/tohcollapsed=([^;]*);?/);

    if (collapsedHeaderCookie == null || collapsedHeaderCookie.length != 2 || collapsedHeaderCookie[1] == 'true')
    {
        toggleHeaderVisibility();
    }

    var collapsedCookie = document.cookie.match(/toccollapsed=([^;]*);?/);
    if (collapsedCookie == null || collapsedCookie.length != 2 || collapsedCookie[1] != 'true')
    {
        var divs = mainContent.getElementsByTagName('div');
        for(var i = 0; i < divs.length; i++)
        {
            if (divs[i].className == 'splitter')
            {            
                var dblclickEvt = document.createEvent('MouseEvents');
                dblclickEvt.initMouseEvent('dblclick', true, true, window, 0, 0, 0, 0, 0, 
                                                    false, false, false, false, 0, null);        
                divs[i].dispatchEvent(dblclickEvt);        
                break;
            }    
        }
    }
}
else if (viewKey[1] == 'loband')
{
    var toc = document.getElementById('toc');
    
    var page = document.getElementById('page');
    var oldPageLeftMargin = parseInt(window.getComputedStyle(page, null)['marginLeft']);
    
    var toggleHeaderVisibility = function() 
    {
        var isHidden = window.getComputedStyle(toc, null)['display'] == 'none';
        
        toc.style.display = isHidden ? 'block' : 'none';
        page.style.marginLeft = (isHidden ? oldPageLeftMargin : 0) + 'px';
    }
    
    document.addEventListener('keypress', 
    function(e)
    { 
        if (e.charCode == 116 && !e.ctrlKey)
        {
            toggleHeaderVisibility();
        }
    }, true);
    
    var collapsedHeaderCookie = document.cookie.match(/tohcollapsed=([^;]*);?/);

    if (collapsedHeaderCookie == null || collapsedHeaderCookie.length != 2 || collapsedHeaderCookie[1] == 'true')
    {
        toggleHeaderVisibility();
    }
}

// patch ctrl+t bug
document.addEventListener('keypress', 
    function(e)
    { 
        if (e.charCode == 116 && e.ctrlKey)
        {
            e.stopPropagation();
        }
    }, true);