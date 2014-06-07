// ==UserScript==
// @name        Gcal Hide Top Navbar
// @namespace   gcalhidetopnav
// @description Hides the top navigation bar to make more room for the calendar. Includes toggle to turn on/off
// @include     *.google.com/calendar/render*
// @version     0.5.1
// @copyright   Boris Joffe 2013 GPL version 3
// ==/UserScript==


function myCode() {
    //saveSearchBar();
    //removeTopStuff();
    toggleOff();
    createToggleButton();
    
    //changeBodyCSS();
    
    function saveSearchBar() {
        var searchBar = $('gbqf').cloneNode(true);
        var tableRow = $('t1').firstChild.firstChild.firstChild.firstChild.rows[0];
        var newCell = tableRow.insertCell();
        newCell.appendChild(searchBar); // search bar doesn't work
    }
    
    function createToggleButton() {
        var btn;
        if ($('toggleBtn') == null) {
            btn = document.createElement('input');
            btn.value = 'Show nav above';
            btn.type = 'submit';
            btn.id = 'toggleBtn';
        } else btn = $('toggleBtn');
        
        btn.addEventListener('click', function() {
            $('onegoogbar').style.display == 'inline' ? toggleOff() : toggleOn();
        }, true);
        
        // insert it
        var tableRow = $('t1').firstChild.firstChild.firstChild.firstChild.rows[0];
        var newCell = tableRow.insertCell();
        newCell.appendChild(btn);
    }
    
    function toggleOn() {
        var topBar = $('onegoogbar');
        var isDisplayed = topBar.style.display == 'none' ? false : true;
        var btn = $('toggleBtn')
        
        topBar.style.display = 'inline';
        btn.value = 'Hide nav above';
        $('mainlogo').style.margin = "0%";
    }
    
    function toggleOff() {
        var topBar = $('onegoogbar');
        var isDisplayed = topBar.style.display == 'none' ? false : true;
        var btn = $('toggleBtn')
        
        topBar.style.display = 'none';
        if (btn != null) btn.value = 'Show nav above';
        $('mainlogo').style.marginTop = "900%";
    }

    function fixBottomWhiteSpace() {
        document.body.height = "100%";
        window.resizeTo(window.screen.availWidth, window.screen.availHeight);
        window.resizeTo(window.outerWidth, window.outerHeight);
    }

    // obsolete - hide but don't remove it
    function removeTopStuff() {
        var theParent = $('onegoogbar').parentNode;
        //$('gbx1').parentNode.removeChild($('gbx1'));
        //$('gbx1').parentNode.removeChild($('gbx1'));
        //$('gbx3').style.visible = 'false';
        //$('gbx3').style.display = 'none';
        //$('gbx3').parentNode.removeChild();
        var nodesToRemove = [ 'onegoogbar' ];
        for (i = 0; i < nodesToRemove.length; i++) {
            var theNode = $(nodesToRemove[i]);
            if (theNode != null) 
                //theParent.removeChild(theNode);
                theNode.style.display = 'none';
        }
    }
    
    function changeBodyCSS() {
        $('calcontent').style.position = 'fixed'; 
        $('calcontent').style.top = '0px';
        $('calcontent').style.zIndex = '100';
        $('calcontent').style.backgroundColor = 'white';
    }
}

function $(id) { return document.getElementById(id); }
window.addEventListener('load', myCode, true);