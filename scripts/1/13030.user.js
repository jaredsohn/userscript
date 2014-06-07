// ==UserScript==
// @name           MySpace - Unpaged Photos
// @namespace      http://userscripts.org/people/774
// @description    2008/03/19 - Takes paged photos, (1 2 3 4) and displays the complete albums, in a single page. Author: InsaneNinja
// @include        http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID=*
// @exclude        *__EVENTTARGET*
// @exclude        *__EVENTARGUMENT*
// ==/UserScript==

var MAX_PAGE_LIMIT = 10

// This cutoff is for YOU, not myspace.
// Your connection might not load all the images.
// Or they could put 5 megapixel photos as captions (I've seen it)

//////////////////////////////////////////////////
//////     DO NOT EDIT BELOW THIS LINE      //////
//////////////////////////////////////////////////
/*

:: Change Log ::

2008/03/19 - Adjusted again for an html changes. (FF3's new JS commands would make this easier)

2008/02/09 - Unhid page links, for compatibility with other scripts. UNPAGED ONLY WORKS ON PAGE 1.

2008/02/08 - Adjusted for an id change, looks like they're skinning photo pages. (To match home skins?)

2008/01/31 - Added consistent links to each page-section.

2008/01/19 - Adjusted for slight myspace html changes

2007/10/29 - Increased the load limit to 10 pages (was 9).

2007/10/20 - Bug squashed. Pages will display in order.

2007/10/15 - Script Posted

*/


if ($('photo_list') && $('___msPagerState'))
{
	// Strip styles from captions
    $('photo_list').innerHTML = $('photo_list').innerHTML.replace(/<style[^<]+?<\/style>/g,'')

	// Find the page count
    var data= $('___msPagerState').value.split(','), pageT= Math.ceil(data[0]/data[1]), pageD=[]

    if (data[2] == 1 && pageT > 1 && pageT < MAX_PAGE_LIMIT+1)
    {
    ////////////////////////////////////
    // Grab Pages
    //
        for ( var i=2; i<=pageT; i++ )
        {
            pageD[i]= document.createElement('div');  pageD[i].setAttribute('id','pagey_'+i);
            $('photo_list').appendChild(pageD[i]);

            GM_xmlhttpRequest({
            method: 'GET', headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
            url: document.location.href.replace(/\#.*$/,'')
                + '&__EVENTTARGET=ctl00$cpMain$UserViewPictureControl$PagerTop&__EVENTARGUMENT='+i,
            onload: function(responseDetails) {

                var html= responseDetails.responseText.replace(/\t|\r|\n/g,'');
                var pageNum= html.match(/id="___msPagerState" value=\"[0-9]+,[0-9]+,([0-9]),/)[1];

				if ( a=/<div id="photo_list">(.*<\/table>).*?class="pagingContainer">/.exec(html))
                    $('pagey_'+pageNum).innerHTML = '<hr>' + '<a name="page'+pageNum+'"></a>'
                        +'<p>Page '+pageNum+'</p>' + a[1].replace(/<style[^<]+?<\/style>/g,'')
            }});
        }
    //
    //
    ////////////////////////////////////
    // Create Links
    //
        var pgBox = document.createElement('div')
            pgBox.setAttribute('id','pgBox')
            $('wrap').appendChild(pgBox)

        var pgLnk = document.createElement('a');
			pgLnk.setAttribute('name','page1')
			$('main').insertBefore(pgLnk,$('main').firstChild)

		for ( var i=1; i<=pageT; i++ )
        {
            var pgLnk = document.createElement('a'); pgLnk.setAttribute('href','#page'+i)
                pgLnk.appendChild(document.createTextNode(i)); pgBox.appendChild(pgLnk)
        }

        GM_addStyle('#pgBox {background-color: white !important; position:fixed; width:30px; top:40%; left:-5px; padding: 10px; -moz-border-radius: 5px;}'
            +'#pgBox a {display:block; width:100%; border:1px solid lightblue; text-align: center}')
    //
    //
    ////////////////////////////////////

//        GM_addStyle('.pagingContainer {display: none;}') // Hide links?
    }
}

GM_addStyle('div.photo_caption img {max-width: 170px;}')

function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"