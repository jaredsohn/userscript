// Show Attachment Images greasemonkey script
//
// This Greasemonkey script adds a floating button to an issuezilla page, 
// that allows you to see attached images directly among the comments.
//
// Authors: Jiri Kopsa at sun dot com, Josef Holy at sun dot com 
//
// ==UserScript==
// @name          Show issuezilla picture attachments
// @namespace     http://netbeans.org/issues
// @description	  Use this to show picture attachments directly on the issuezilla page. Scans for .png, .jpg, .bmp, .jpeg and .gif.
// @include       http://www.netbeans.org/issues/show_bug.cgi*
// ==/UserScript==
//
// ---------- issuezilla stuff

    function showAttachmentImages() {
        var links = document.getElementsByTagName('A');

        for (var i = 0; i < links.length; i++) {

        var link = links.item(i);
        if ( (link.parentNode.tagName.toUpperCase() == 'PRE') 
              && (
                (endsWith(link.href, '.png')) 
                || (endsWith(link.href, '.jpg'))
                || (endsWith(link.href, '.jpeg'))
                || (endsWith(link.href, '.bmp'))
                || (endsWith(link.href, '.gif'))
                  ) 
         ) {

            link.appendChild(document.createElement('br'));

            var img = document.createElement('img');
            img.src = link.href;
            link.appendChild(img);
          }
        }

        floatingDiv.style.display = "none";
    }

    function endsWith(str, substr) {
        return (str.toLowerCase().indexOf(substr.toLowerCase())==(str.length-substr.length));
    }

// ---------- create the DIV itself

    var floatingDiv = document.createElement('DIV');
    floatingDiv.id = 'floatdiv';
    floatingDiv.style.position = 'absolute';
    floatingDiv.style.width = '150px';
    floatingDiv.style.height = '41px';
    floatingDiv.style.left = '0px';
    floatingDiv.style.top = '0px';
    floatingDiv.style.padding = '2px';
    floatingDiv.style.background = '#FFFFFF';
    floatingDiv.style.border = '2px solid #2266AA';

    var center = document.createElement('CENTER');

    floatingDiv.appendChild(center);

    center.appendChild(document.createTextNode('Issuezilla Toolbar'));
    center.appendChild(document.createElement('BR'));
    
    var buttonShowImages = document.createElement('BUTTON');    
    buttonShowImages.addEventListener('click', showAttachmentImages, true);
    buttonShowImages.appendChild(document.createTextNode('Show Attachments'));
    center.appendChild(buttonShowImages);
    
    document.body.appendChild(floatingDiv);



// ---------- floating menu stuff
/* Script by: www.jtricks.com
 * Version: 20060303
 * Latest version:
 * www.jtricks.com/javascript/navigation/floating.html
 */

var has_inner = typeof(window.innerWidth) == 'number';
var has_element = document.documentElement && document.documentElement.clientWidth;

var fm_id='floatdiv';
var floating_menu =
    document.getElementById
    ? document.getElementById(fm_id)
    : document.all
      ? document.all[fm_id]
      : document.layers[fm_id];

var fm_shift_x, fm_shift_y, fm_next_x, fm_next_y;

function move_menu()
{
    if (document.layers)
    {
        floating_menu.left = fm_next_x;
        floating_menu.top = fm_next_y;
    }
    else
    {
        floating_menu.style.left = fm_next_x + 'px';
        floating_menu.style.top = fm_next_y + 'px';
    }
    
}


function float_menu()
{
    fm_next_y = document.body.clientHeight + document.body.scrollTop - parseInt(floating_menu.style.height) - (window.innerHeight - document.body.clientHeight) - 10;
    fm_next_x = document.body.clientWidth + document.body.scrollLeft - parseInt(floating_menu.style.width) - (window.innerWidth - document.body.clientWidth) - 10;
    move_menu();
    
    window.setTimeout(float_menu, 20);
};


float_menu();

