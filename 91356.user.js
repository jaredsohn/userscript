// ==UserScript==
// @name            Invision Forum fixer
// @namespace       InvisionFree
// @description     Removes some annoyances and ads, fixes colors, alternates row color, adds quick-jump buttons.
// @include         http://*.invisionfree.com/*
// @include         http://invisionfree.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

if (window.top != window.self)  //-- Don't run on frames or iframes.
    return;

function Greasemonkey_main ()
{
    //--- Hilight the subforums with new posts (more than that lame-ass pic).
    var newPostIndicators   = $("img[src*='bf_new']").addClass ('HasNewPosts');

    //--- Refactor the page title, to improve tabbed browsing.
    var oldTitle            = document.title;
    document.title          = oldTitle.replace (/(.+)\s+->\s+(.+)/, '$2 -- $1');

    //--- Kill pernicious top and bottom ads.
    $("#ipbwrapper>div[align='center']:first").remove ();
    $("div#ipbwrapper div.tableborder > div.row4 > a > img").parent ().parent ().remove ();
    $("div#ipbwrapper div.tableborder > div:last > a > img").parent ().parent ().remove ();
    //--- And again, on a time delay, since Invision gets tricky with its JS.
    setTimeout (function() { $("div#ipbwrapper div.tableborder > div:last > a > img").parent ().parent ().remove (); }, 800);

    //--- Make pagination stand out more.
    var PagTables           = $("#userlinks ~ table");
    var PagCells            = PagTables.find ("td:first");
    var PagLinks            = PagCells.find ("a");

    if (PagLinks  &&  PagLinks.length > 1)  //-- Ignore "Open Topic Options" link in count.
    {
        PagCells.addClass ("PaginationFix");

        PagLinks. each ( function () {
            //--- If the link is just a number, pad it with spaces.
            var jThis           = $(this);
            var LinkTxt         = jThis.text ();
            if (/^(\s|\d)+$/.test (LinkTxt) )
                jThis.html ('&nbsp;' + LinkTxt + '&nbsp;'); //-- If use text(), nbsp's don't get parsed.
        } );
    }


    /*--- Add "quick links" to main forum sections.
        But, not on admin pages -- titled like, "Invision Power Board Administration Center"
    */
    if (/Invision\s.+\sAdministration/i.test (document.title)  ||  document.title.length < 9)
    {
        //--- Set the drop down size to where we can use it!  (mainly for permision mask settings.)
        $("div.tableborder td.subforum select.dropdown:first").attr ('size', '32');
    }
    else
    {
        var mainForumSections   = $("div.maintitle:not(:hidden)");  //-- "hidden" excludes moderation controls
        if (mainForumSections  &&  mainForumSections.length > 2)    //-- The "Board Statistics" section does not count.
        {
            $("body").prepend ('<div id="MainSectionQuickLinks"><button id="QL_CloseBtn">\u2573</button></div>');

            var LinksPanel      = $("#MainSectionQuickLinks");
            LinksPanel.hover
            (
                function () { $(this).stop (true, false).fadeTo (50, 1); },
                function () { $(this).stop (true, false).fadeTo (900, 0.2); }
            );
            $("#QL_CloseBtn").click (function () { $("#MainSectionQuickLinks").unbind ().hide (); } );

            //--- Alphabetize the links.
            function sortBySectionTitle (sA, sB)
            {
                var SectTitleA  = $(sA).children ('a').text ();
                var SectTitleB  = $(sB).children ('a').text ();

                if      (SectTitleA > SectTitleB)
                    return 1;
                else if (SectTitleA < SectTitleB)
                    return -1;
                else
                    return 0;
            }
            mainForumSections.sort (sortBySectionTitle)

            //--- Add links and target id's. to the page.
            mainForumSections. each ( function (J) {

                this.id         = 'MainsectionId_' + J;
                var SectTitle   = $(this).children ('a').text ();
                SectTitle       = SectTitle.replace (/\s/g, '\xA0');  //-- NB space so links don't wrap

                /*--- Instead of # hyperlinks, use JS scroll (like other buttons) and then backup enough to
                    accomodate the links box.
                */
                LinksPanel.append ('<a href="' + window.location.href + '#' + this.id + '">' + SectTitle + '</a>');
            } );

            //--- Add two special links.
            $("body").prepend ('<span id="MainsectionId_top"></span>');
            $("body").append  ('<span id="MainsectionId_bottom"></span>');

            LinksPanel.prepend ('<a href="' + window.location.href + '#MainsectionId_top">(top)</a>');
            LinksPanel.append ( '<a href="' + window.location.href + '#MainsectionId_bottom">(bottom)</a>');

            //--- Activate all the links, so far.
            LinksPanel.children ('a').click (JumpToSection);

            /*--- Add links for any new posts
                newPostIndicators is a collection of img < a < td <tr
                The link we want is in the last sibling td.  It is the second link.
                We don't need special activation for these links.
            */
            newPostIndicators. each ( function (J) {

                //--- Add preamble on first pass only.
                if (J == 0)
                    LinksPanel.append ( '<br><b>New Posts:</b><br>');

                var NewPostLink = $(this).parent ().parent ().siblings ().last (). children ("a:eq(1)");

                NewPostLink.clone ().addClass ("NewPostLink"). appendTo (LinksPanel);
            } );
        }
    }


    /*---   Add two "quick-jump" buttons at every post, next to the user name.
            These are to allow easy back and forth over long posts.
    */
    var zPostTops           = $("span.normalname");
    var iNumPosts           = zPostTops.length;

    zPostTops.each (function (K) {CreateJumpButtons ($(this), K, iNumPosts);} );

    /*--- Activate the buttons.
    */
    $("button.QuickJmpUpBtn").bind  ('click', {bGoUp: true},  JumpToNextPost);
    $("button.QuickJmpUpBtn2").bind ('click', {bGoUp: true},  JumpToNextPost);
    $("button.QuickJmpDwnBtn").bind ('click', {bGoUp: false}, JumpToNextPost);
}


function CreateJumpButtons (zJnode, K, iNumPosts)
{
    /*--- Add a target id to our anchor span.
    */
    var sIdName             = 'idJumpToNode' + K;
    zJnode.attr ('id', sIdName);

    /*--- Insert the button(s) after our target span.
    */
    if (K > 0)              //-- The top post (K==0) doesn't need a "jump up" button.
    {
        zJnode.after ('<button class="QuickJmpUpBtn" value="' + K + '">&#x25B2;<\/button>');
    }

    if (K < iNumPosts-1)    //-- The bottom post doesn't need a "jump down" button.
    {
        zJnode.after ('<button class="QuickJmpDwnBtn" value="' + K + '">&#x25BC;<\/button>');
    }
    else
    {
        //--- Add a jump-up button at the bottom of the page.
        $("div.activeuserstrip:first").prepend ('<button class="QuickJmpUpBtn2" value="' + (K+1) + '">&#x25B2;<\/button>');
    }
}


function JumpToSection (zEvent)
{
    var sectionID           = this.href.replace (/.+(MainsectionId_.+)/, '$1');
    var iTargetScrollTopVal = $('#' + sectionID).offset ().top;
    iTargetScrollTopVal    -= $("#MainSectionQuickLinks").outerHeight (true); //move out from under box.

    window.scrollTo (0, iTargetScrollTopVal);

    zEvent.preventDefault ();
    zEvent.stopPropagation ();
    return false;
}


function JumpToNextPost (zEvent)
{
    var zClickedNode        = $(zEvent.target);
    var iCurrentPostNum     = parseInt (zClickedNode.attr ('value') );
    var iTargetPostNum      = iCurrentPostNum + 1;

    if (zEvent.data.bGoUp)
        iTargetPostNum      = iCurrentPostNum - 1;


    var sTargetIdName       = '#idJumpToNode' + iTargetPostNum;
    var iTargetScrollTopVal = $(sTargetIdName).parent ().offset ().top;

    window.scrollTo (0, iTargetScrollTopVal);
}


GM_addStyle ( (<><![CDATA[
    .post1
    {
        background-color:   #F0FFF0 !important;
        border-right:       1px solid gray !important;
    }
    .post2
    {
        border-right:       1px solid gray !important;
    }
    .postcolor, #ucpcontent
    {
        font-size:          18px !important;
        line-height:        1.5 !important;
    }
    #QUOTE
    {
        font-size:          18px !important;
        border:             1px dotted #2B3F6E !important;
        background-color:   #EEEEEE !important;
    }
    .textinput
    {
        font-size:          18px !important;
        font-family:        Verdana,Helvetica,Arial,sans-serif !important;
        background:         white !important;
        padding:            1ex !important;
    }
    .pformstrip
    {
        background-color:   wheat;
    }
    .row4
    {
        background-color:   #F4F6E9 !important;
    }
    .QuickJmpDwnBtn, .QuickJmpUpBtn
    {
        background:         #FF9900;
        margin-left:        6px;
        font-size:          9px;
        float:              right;
    }
    .QuickJmpUpBtn2
    {
        background:         #FF9900;
        margin:             0 6px;
        font-size:          9px;
    }
    .QuickJmpDwnBtn:hover, .QuickJmpUpBtn:hover, .QuickJmpUpBtn2:hover
    {
        background:         #FFB13D;
        border:             2px solid red;
        color:              red;
    }
    #google_ads_frame1
    {
        display:            none !important;
    }
    .HasNewPosts
    {
        -moz-border-radius: 20px;
        border:             3px solid red;
    }
    .PaginationFix
    {
        background:         white;
        font-size:          16px;
        padding:            0.4ex 0.6ex;
    }
    .PaginationFix a
    {
        padding:            0;  /*Went with adding spaces instead (crappy layout)*/
    }
    a:hover, #MainSectionQuickLinks a:hover
    {
        color:              red;
    }
    #MainSectionQuickLinks
    {
        background:         gold;
        border:             5px ridge #0000DD;
        font-size:          17px;
        margin:             1ex 0;
        opacity:            0.8;
        padding:            1ex 1em 1em 1em;
        position:           fixed;
        width:              88%;
    }
    #MainSectionQuickLinks a
    {
        margin-right:       2.5ex;
        line-height:        1.5;
        display:            inline-block;
        color:              black;
    }
    #QL_CloseBtn
    {
        padding:            0;
        position:           absolute;
        right:              0;
        top:                0;
    }
    .NewPostLink
    {
        font-weight:        bold;
    }
]]></>).toString () );


Greasemonkey_main ();


/*--- EOF ---*/
