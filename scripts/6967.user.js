// ==UserScript==
// @name          IMDB Top250 User Vote
// @namespace     http://www.cs.chalmers.se/~josefs
// @description   Shows your vote on the top250 list on imdb
// @include       http://imdb.com/chart/top
// ==/UserScript==
// Thanks to Curtis Gibby who wrote the IMDB Vote History script
// I've borrowed some of his code


// This function is borrowed from "IMDB Vote History" 
// Altered so that it show "10" correctly among other things
function check4vote(movieId) {
  var vote_url = 'http://imdb.com/MyRating?' + movieId;
  GM_xmlhttpRequest({
    method: 'GET',
    url: vote_url,
    onload: function(responseDetails) {
	var search_string = 'Your recorded vote is ';
	var match = responseDetails.responseText.search(search_string);
	var recorded_vote = responseDetails.responseText.substr(match + search_string.length,2);
        if (recorded_vote.charAt(1) != "0")
            recorded_vote = recorded_vote.charAt(0);
	if (match != -1) {
		// Already exists
		var span = document.getElementById('vote' + movieId);
		var span_text = document.createTextNode(recorded_vote);
		//span.style.color='green';
		span.replaceChild(span_text, span.firstChild);
	} else {
		// Does not exist
		var span = document.getElementById('vote' + movieId);
	        var span_text = document.createTextNode(' -'); 
		span.style.color='red';
		span.replaceChild(span_text, span.firstChild);
	}
    },
    onerror: function(respDetails) {
      var span = document.getELementById('vote' + movieId);
      var span_text = document.createTextNode("Error");
      span.replaceChild(span_text,span.firstChild);
    }
  });
}

// Adds an extra column where the user's votes are presented
function addVoteColumn() {

  var theTable;
  // What I really wanted here was the xpath "//tbody[count(*)=251]"
  // 251, because it is the top 250 and we also count the heading row
  // Somehow I couldn't get it to work so I use a much cruder way to
  // get to the tbody that I want
  var xpathRes = 
      document.evaluate("//tbody"
                       ,document
                       ,null
                       ,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
                       ,null);
  // I don't like this for loop but it seems the iterateNext method is 
  // not implemented in the XPathResult object
  for( var i = 0; i < xpathRes.snapshotLength; i++)
  {
    theTable = xpathRes.snapshotItem(i);
    var j = theTable.childNodes.length;
    if(j > 100) break;
  }
  tableRows = theTable.childNodes;

  //Create a new column
  headRow = tableRows.item(0);
  //Crude, but it works
  voteHeading = document.createElement("td");
  voteHeading.innerHTML = '<td>' + 
    '<font face="Arial, Helvetica, sans-serif"' +
    'size="-1"><b>Your Vote</b></font></td>';
  headRow.appendChild(voteHeading);

  //Insert votes for all the movies
  for (var i = 1; i < tableRows.length; i++)
  {
    var thisRow = tableRows.item(i);

    // Get movie id
    var cell    = thisRow.childNodes.item(2);
    var fnt     = cell.childNodes.item(0);
    var anchor  = fnt.childNodes.item(0);
    var link    = anchor.attributes.getNamedItem("href");
    var linkStr = link.nodeValue;
    var end     = linkStr.length - 1;
    var start   = linkStr.lastIndexOf("/tt",(end - 1)) + 3;
    var movieId = linkStr.slice(start,end);

    // Insert the vote
    var vote = document.createElement('td');
    var span = document.createElement('span');
    var span_text = document.createTextNode(" (checking your vote)");
    span.appendChild(span_text);
    span.setAttribute("id","vote" + movieId);
    var font = document.createElement('font');
    font.size = -1;
    font.face = "Arial, Helvetica, sans-serif"
    font.appendChild(span);
    vote.appendChild(font);
    thisRow.appendChild(vote);

    //Check the vote
    check4vote(movieId);
  }
}

addVoteColumn();
