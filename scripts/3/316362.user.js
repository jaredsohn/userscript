// ==UserScript==
// @name       UNSC WARFARE Custom Additions (With Red Notices)
// @namespace  http://www.armorwatcher.com/
// @version    1.4
// @description  Customizing UNSC Warfare a bit. Includes changes to the menu spacing, hides the notice bar and adds a scroll to top button.
// @include      http://unscwarfare.com/*
// @include      http://www.unscwarfare.com/*
// @copyright  2012+, Caspar Neervoort (AssaultCommand)
// ==/UserScript==

function addNewCSS(element)
{
    for (var i=0; i<document.styleSheets.length;i++)					//Loop through all CSS files
    {
        try					//Try to insert the CSS rule into existing CSS
        { 
            document.styleSheets[i].insertRule( element, document.styleSheets[i].cssRules.length);
        } 
        catch(err)					//If inserting the CSS rule fails, attempt to add it as a new seperate rule.
        {
            try 
            { 
                var splitRule1 = element.split("{");
                var splitRule2 = splitRule1[1].split("}");
                document.styleSheets[i].addRule( splitRule1[0], splitRule2[0]);
            } catch(err) 
            {}
        }
    }
}


var customCSS = new Array();					//Create array that will contain all CSS changes and additions.
customCSS[0] = 'nav li {margin-right:33px}';  
customCSS[2] = '#back-top { position: fixed; bottom: 30px; margin-left: -150px; }';
customCSS[3] = '#back-top a { width: 108px; display: block; text-align: center; font: 11px/100% Arial, Helvetica, sans-serif; text-transform: uppercase; text-decoration: none; color: #bbb; /* transition */ -webkit-transition: 1s; -moz-transition: 1s; transition: 1s; }';
customCSS[4] = '#back-top a:hover { color: #000; }';
customCSS[5] = '#back-top span { width: 108px; height: 108px; display: block; margin-bottom: 7px; background: #ddd url(up-arrow.png) no-repeat center center; /* rounded corners */ -webkit-border-radius: 15px; -moz-border-radius: 15px; border-radius: 15px; /* transition */ -webkit-transition: 1s; -moz-transition: 1s; transition: 1s; }';
customCSS[6] = '#back-top a:hover span { background-color: #777; }';
customCSS[6] = '#battleStatus {overflow-x: hidden; overflow-y: scroll;}';

customCSS.forEach(addNewCSS);

$(document).ready(function(){
    
    // hide #back-top first
    $("#back-top").hide();
    
    // fade in #back-top
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });
        
        // scroll body to 0px on click
        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});

var newHTML = document.createElement ('span');
newHTML.innerHTML = '<p id="back-top" style="display: block;"><a href="#top"><span style="background: url(http://www.clker.com/cliparts/5/p/c/l/l/U/up-arrow-black-md.png) 50% 50% no-repeat rgba(221, 221, 221, 0); background-size: 70px;"></span>Back to Top</a></p>';
document.getElementById('container').appendChild(newHTML);