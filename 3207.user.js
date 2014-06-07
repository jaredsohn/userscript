// ==UserScript==
// @name          TVdotcomRater
// @description   Replaces the Flash rater with a simpler, non-flash one. Created by Geoff Childs. http://escapedesign.org/projects/tvdotcomrater/.
// @namespace     http://escapedesign.org/projects/tvdotcomrater
// @include       http://www.tv.com/*
// ==/UserScript==

(function() {

    // the stuff we want is stuffed inside an embed tag, so let's find that first
    var embeds = document.getElementsByTagName("embed");
    // TODO assert we have only one embed in the embeds object

    // now we have that, there should be a 'src' attribute
    var srcAttrib = embeds[0].getAttribute("src");

    // the srcAttrib object is a string representing a URL which has the info we want in it.
    // split the URL so we can get some useful stuff in it. Each part is separated by &amp;.
    var attribs = srcAttrib.substring(52).split("&");

    // the first string is bogus, just some URL pap left over. ignore that. the next one is
    // the user rating, which we want.
    // TODO assert we have the right attribute
    var user_rating = attribs[0].split("=")[1];

    // the one after that is the global_rating, pap also. next is the ref_id, which we need.
    // TODO assert we have the right attribute
    var ref_id = attribs[2].split("=")[1];

    // the next is the ref_type_id which goes hand-in-hand with the previous value.
    // TODO assert we have the right attribute
    var ref_type_id = attribs[3].split("=")[1];

// DEBUGGING
/*
    alert(user_rating);
    alert(ref_id);
    alert(ref_type_id);
*/
    // and that's everything we need to get going. Sweet!

    // now we can add a text box with the current user_rating in

    var ratingBox = document.createElement("input");
    ratingBox.type = "text";
    ratingBox.name = "ratingBox";
    ratingBox.id = "ratingBox";
    ratingBox.value = user_rating;
    if(user_rating == "") { ratingBox.setAttribute("style", "background: #dd0000"); }

    function my_keypress_handler(event) {
      // The user has changed the rating so indicate this with a colour change.
      ratingBox.setAttribute("style", "background: #dddd00");

      if(event.which == 13) {

        // the user pressed return, they want to submit their rating.
        event.preventDefault();

        user_rating = document.getElementById("ratingBox").value;

        // We need to form a url like this:
        // http://www.tv.com/index.php?type=22&user_rating=9.5&ref_id=348&ref_type_id=101

        var postRatingURL = "http://www.tv.com/index.php?type=22&user_rating=" + user_rating + "&ref_id=" + ref_id + "&ref_type_id=" + ref_type_id;

        // now we can make the request, asynchronously of course.

        GM_xmlhttpRequest({
          method: 'GET',
          url: postRatingURL,
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
          },
          onload: function(responseDetails) {
              if(responseDetails.responseText == "&done=updated") {
                // change the box to green to let the user know it worked okay
                ratingBox.setAttribute("style", "background: #00dd00");
              } else {
                alert('Request to set user_rating failed. ' + responseDetails.status +
                      ' ' + responseDetails.statusText + '\n\n' +
                      'Response data:\n' + responseDetails.responseText);
              }
          }
        });

      }

    }

    // set up the text box to submit a new rating when they press return
    ratingBox.addEventListener('keypress', my_keypress_handler, true);

    embeds[0].parentNode.appendChild(ratingBox);
    embeds[0].parentNode.removeChild(embeds[0]);

})();
