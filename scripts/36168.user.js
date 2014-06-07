// ==UserScript==
// @name           FantasyFootballMatchupRatings
// @namespace      http://football.fantasysports.yahoo.com
// @description    Fantasy Football Matchup Ratings
// @include        http://football.fantasysports.yahoo.com/*
// ==/UserScript==

var gMatchupRatingsURL ;

var gMainTable ;


// Shortcut to document.getElementById
function $( id ) 
{
   return document.getElementById( id ) ;
}


function LoadRatings()
{
   //GM_log( gMatchupRatingsURL ) ;
   
   GM_xmlhttpRequest({
                     method:"GET",
                     url:gMatchupRatingsURL,
                     headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
                     onload:function(response){AddMatchupRatings(response);}
                     }) ;
}


function AddMatchupRatings( response )
{
   var nav, oThreadMenu, doc, div, domList, domList2, theForm ;
   //GM_log( "AddMatchupRatings" ) ;

   doc = document.createElement( "div" ) ;

   doc.innerHTML = response.responseText ;

   ratingList = document.evaluate("//td[@class='player first']",doc,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   
   //GM_log( "Ratings: " +ratingList.snapshotLength ) ;

   domList = document.evaluate("//td[@class='player']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   //GM_log( "Players: " +domList.snapshotLength ) ;
   for( i = 0 ; i < domList.snapshotLength ;  i ++ )
   {
      domItem = domList.snapshotItem( i ) ;
      
      sName = domItem.firstChild.firstChild.innerHTML ;
      
      //GM_log( "[" + i + "] " + sName ) ;
      
      if( sName )
      {
         for( j = 0 ; j < ratingList.snapshotLength ; j ++ )
         {  
            if( sName == ratingList.snapshotItem( j ).firstChild.firstChild.innerHTML ) 
            {
               tdr = ratingList.snapshotItem( j ).nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling ;
               tdr.setAttribute( "style", "text-align:right;border-style: none; padding: 0;" ) ;
               //tdr.setAttribute( "class", "gametime" ) ;
               tdr.firstChild.alt = tdr.nextSibling.nextSibling.innerHTML ;
               
               container = domList.snapshotItem( i ).nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling ;
               
               stuff = container ;
               GM_log( stuff.tagName ) ;
               
               table = document.createElement( "table" ) ;
               table.setAttribute( "width", "100%" ) ;
               table.setAttribute( "style", "border-style: none;" ) ;
               
               tr    = document.createElement( "tr" ) ;
               tdt   = document.createElement( "td" ) ;
               tdt.setAttribute( "class", "gametime" ) ;
               tdt.appendChild( table ) ;
               
               table.appendChild( tr ) ;
               
               container.parentNode.insertBefore( tdt, stuff );
               
               if( stuff )
               {
                  tr.appendChild( stuff ) ;
                  stuff.setAttribute( "class", "gametime2" ) ;
                  stuff.setAttribute( "style", "border-style: none; padding: 0; font-size: 100%;" ) ;
               }
               
               tr.appendChild( tdr ) ;

               j = ratingList.snapshotLength ;
            }
         }
      }
   }
}


gMainTable0 = $( "statTable0" ) ;

if( gMainTable0 )
{
   var sPartURL = window.location.href.match( "http\:\/\/football\.fantasysports\.yahoo\.com\/.+\/[0-9]+\/" ) ;
   
   //GM_log( sPartURL ) ;
   
   gMatchupRatingsURL = sPartURL + "playermatchups?tab=MY" ;
   
   //GM_log( gMatchupRatingsURL ) ;

   LoadRatings() ;
}
