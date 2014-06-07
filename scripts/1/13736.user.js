// ==UserScript==
// @name           PubPals
// @namespace      edu.umich.med.michr
// @include        http://www.ncbi.nlm.nih.gov/sites/entrez?Db=pubmed&Cmd=ShowDetailView&*
// @include        http://www.ncbi.nlm.nih.gov/pubmed/*
// ==/UserScript==
//
// Version 0.2.2
//

function gm_xpath( expression, contextNode )
{
  return document.evaluate( expression, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function createFacebookAnchor( author )
{
  var anchor = document.createElement( "a" )

  anchor.setAttribute( "href", "http://www.facebook.com/srch.php?nm=" + author )
  //anchor.setAttribute( "href", "http://www.facebook.com/login.php?api_key=faa9a235b9506f9136065cdc9c8c2734&v=1.0" )

  anchor.setAttribute( "target", "_blank" )
  anchor.style.marginLeft = "2px"

  var icon = document.createElement( "img" )

  icon.setAttribute( "border", 0 )
  icon.setAttribute( "align", "absmiddle" )
  icon.setAttribute( "src", "http://www.facebook.com/favicon.ico" )

  anchor.appendChild( icon )

  return anchor
}

function createLinkedInAnchor( author, affil )
{
  var affilZip = affil.match( /\d{5}/ )

  var anchor = document.createElement( "a" )

  if ( affilZip == null )
    anchor.setAttribute( "href", "http://www.linkedin.com/ns?search=&name=" + author )
  else
    anchor.setAttribute( "href", "http://www.linkedin.com/search?search=&currentCompany=currentCompany&searchLocationType=I&countryCode=us&postalCode=" + affilZip + "&distance=50&sortCriteria=4&currentTitle=currentTitle&kwname=" + author )

  anchor.setAttribute( "target", "_blank" )
  anchor.style.marginLeft = "5px"

  var icon = document.createElement( "img" )

  icon.setAttribute( "border", 0 )
  icon.setAttribute( "align", "absmiddle" )
  icon.setAttribute( "src", "http://www.linkedin.com/favicon.ico" )

  anchor.appendChild( icon )

  return anchor
}

function createBiomedExpertsAnchor( author )
{
  var anchor = document.createElement( "a" )

  anchor.setAttribute( "href", "http://www.biomedexperts.com/Experts/SearchPerson.aspx?name=" + author )

  anchor.setAttribute( "target", "_blank" )
  anchor.style.marginLeft = "2px"

  var icon = document.createElement( "img" )

  icon.setAttribute( "border", 0 )
  icon.setAttribute( "align", "absmiddle" )
  icon.setAttribute( "src", "http://www.biomedexperts.com/css/img/bme.ico" )

  anchor.appendChild( icon )

  return anchor
}

function insertAnchors()
{
  var links = gm_xpath( "//div[@class=\"authors\"]/a", document )

  var affil = gm_xpath( "//p[@class=\"affiliation\"]", document ).snapshotItem( 0 ).firstChild.nodeValue

  for ( var i = 0; i < links.snapshotLength; i++ )
  {
    var link = links.snapshotItem( i )

    // The author name is in a bold tag within the anchor.
    var author = link.firstChild.firstChild.nodeValue

    // Reverse the order of the first name initials and last name, removing middle initial.
    var lname = author.substring( 0, author.indexOf( ' ' ) )
    author = author.substring( author.indexOf( ' ' ) + 1, author.indexOf( ' ' ) + 2 ) + ' ' + lname

    link.parentNode.insertBefore( createFacebookAnchor( author ), link.nextSibling )
    link.parentNode.insertBefore( createLinkedInAnchor( author, affil ), link.nextSibling )

    // The following isn't working since BiomedExperts' search is a HTML POST, not a GET as it would at first appear to be.

    // Get the author again for re-formatting for BiomedExperts.
    //author = link.firstChild.firstChild.nodeValue

    // Reverse the order of the first name initials and last name, removing middle initial.
    //lname = author.substring( 0, author.indexOf( ' ' ) )
    //author = lname + '+' + author.substring( author.indexOf( ' ' ) + 1, author.indexOf( ' ' ) + 2 )

    //link.parentNode.insertBefore( createBiomedExpertsAnchor( author ), link.nextSibling )
  }
}

window.addEventListener("load", insertAnchors, false);
