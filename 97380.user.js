// ==UserScript==
// @name           Show Reddit Hover Text
// @description    Displays text on links and custom subreddit icons (e.g. rage faces) that otherwise only appear with a mouseover. This hover text is written to the right of its link/icon in <code> format.
// @include        http://www.reddit.com/r/*/comments/*
// @include        http://www.reddit.com/user/*
// @version        2011-02-21
// ==/UserScript==


var comments = document.getElementsByClassName( "md" );

for ( var i = 0; i < comments.length; ++i )
{
    // can have multiple paragraphs per comment, each of which can have icons/links
    var thisComment = comments[i].getElementsByTagName( "p" );

    for ( var j = 0; j < thisComment.length; ++j )
    {
        // can have multiple icons/lins per paragraph, each with its own hover text
        var links = thisComment[j].getElementsByTagName( "a" );

        var newComment = thisComment[j].innerHTML;
        var insertIndex = 0;
        var foundHoverText = false;

        for ( var k = 0; k < links.length; ++k )
        {
            insertIndex = newComment.indexOf( "</a>", insertIndex ) + 4;
            
            if ( links[k].hasAttribute( "href" )  &&  links[k].hasAttribute( "title" ) )
            {
                foundHoverText = true;
                newComment = newComment.substring( 0, insertIndex ) + "<code> " + links[k].title + " </code>" + newComment.substring( insertIndex );
            }
        }
        
        if ( foundHoverText )
        {
            thisComment[j].innerHTML = newComment.replace( /<\/?script>/gi, "" );
        }
    }
}
