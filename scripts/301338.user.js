// ==UserScript==
// @name       CS UI Widgets Information
// @namespace  mailto:fprantl@opentext.com
// @version    0.2
// @description  Shows information about a CS UI Widgets authenticated session.
//               It makes a call to the CS REST API using the CS UI Widgets to find
//               out the name of the Personal Volume of the authenticated user which
//               usually includes the user name.  Before you execute it, authenticate
//               the CS UI Widgets on your page, otherwise you get the login dialog.
// @match      *://*/*
// @copyright  (c) 2013 OpenText GmbH
// ==/UserScript==

if (typeof csui !== "undefined") {
  csui.require(["lib/jquery", "util/connector", "model/volume"],
  function($, Connector, VolumeModel) {
    // Declare the place with all CS UI Widgets information, the definition list
    // with entries for every stored authenticated session and a progress indicator.
    var place, list, progress;
    // Adds information about a CS UI Widgets session identified by the CS
    // REST API URL to the definition list
    function addSessionInformation(url, last) {
      // Create a connector object for the REST API URL; the supportPath
      // will not be used in this scenario; just not leave it undefined
      var connector = new Connector({
            connection: { url: url, supportPath: "/img" }
          }),
      // Declare an object referring to the personal volume of the current user
          personalVolume = new VolumeModel(
            { type: 142 }, { connector: connector }
          );
      // Fetch the personal volume information; authentication will be performed
      // on demand and if there is already an authenticated session in the session
      // storage of the web browser, there will be no login prompt.
      personalVolume.fetch({
        success: function() {
          console.log("Personal volume on " + url + ":");
          console.log(personalVolume);
          // Append a new entry to the definition list with the session information
          // containing just the name of the personal volume for now; this name
          // usually contains the user name and serves as a trick how to learn it
          // until there is a REST API request available which provides information
          // about the authenticated user.
          $("<dt>").text("URL: " + url).appendTo(list);
          $("<dd>").text("Personal Volume: " +
            personalVolume.get("name")).appendTo(list);
          if (last) {
            progress.hide();
          }
        },
        error: function(error) {
          // Append the message to the definition list with the session information
          $("<dt>").text("URL: " + url).appendTo(list);
          $("<dd>").text(error.toString()).appendTo(list);
          if (last) {
            progress.hide();
          }
        }
      });
    }
    // Divide the information from the page content above
    $("<hr>").appendTo(document.body);
    // Encapsulate the CS UI Widgets information in a jQuery UI styled element
    place = $("<div>", { "class": "ui-widget" }).appendTo(document.body);
    $("<h3>").text("CS UI Widgets").appendTo(place);
    // Add a button tu refresh the information displayed below
    $("<button>").text("Refresh authentication information")
      .click(function() {
        // Declare the map of stored sessions and the array of CS REST API URLs
        var sessions, urls;
        // Clear previously displayed information in the definition list
        list.empty();
        // The base authentiactor object stores the session in the session storage
        // as a string with a JSON object, where keyas are the CS REST API URLs
        sessions = sessionStorage.getItem("util/authenticator");
        if (!sessions) {
          // Try older version of the authenticastors too.
          sessions = sessionStorage.getItem("util/otcsauthenticator");
        }
        if (sessions) {
          // Parsing the stored string should never fail, but just in case
          try {
            sessions = JSON.parse(sessions);
          } catch(error) {
            console.log("Reading the stored authenticated session failed:");
            console.log(error);
          }
          // Get the REST API URLs and add en entry to the definition list for each one
          urls = Object.keys(sessions);
          progress.show();
          urls.forEach(function(url, index) {
            // Hide the progress indication when processing the last URL; it is not
            // shown and hidden for every URLs, because they are processed in parallel.
            addSessionInformation(url, index == urls.length - 1);
          });
        }
        // If there was an error when parsing the stored sessions or no stored session
        // have been found add an entry to the definition list with a message only
        if (!urls) {
          $("<dt>").text("Reading the stored authenticated session failed.").appendTo(list);
        } else if (!urls.length) {
          $("<dt>").text("No authenticated session has been found.").appendTo(list);
        }
      }).appendTo(place);
    // Add a button to clear all stored authenticated CS UI Widgets sessions
    $("<button>").text("Clear authenticated sessions")
      .click(function() {
        if (confirm("Do you really want to clear all authenticated CS UI Widgets sessions?\n" +
                    "New authentication will be performed on the next page load.")) {
          // Clear the session storage of the base authenticator
          if (sessionStorage.getItem("util/authenticator")) {
            sessionStorage.removeItem("util/authenticator");
          }
          // Clear the displated definition list
          list.empty();
          $("<dt>").text("Authenticated sessions have been cleared.").appendTo(list);
          // You will usually want to reload the page to retry the authentication
          if (confirm("All authenticated CS UI Widgets sessions have been cleared.\n" +
                      "New authentication will be performed on the next page load.\n\n" +
                      "Do you want to reaload this page now?")) {
            window.location.reload();
          }
        }
      }).appendTo(place);
    // Add a button to store a new authenticated CS UI Widgets session
    $("<button>").text("Add authenticated session")
      .click(function() {
        var url = prompt("When authenticating a CS UI Widgets session, you may see " +
                         "a login prompt if the automatic login has not been set up.\n\n" +
                         "CS REST API URL: ");
        if (url) {
          // Getting the information for a new CS REST API URL will trigger the authentication.
          // Either there is SSO or other automated login or the login dialog will be shown.
          progress.show();
          addSessionInformation(url, true);
        }
      }).appendTo(place);
    // Add the definition list to show the stored authenticated session information
    list = $("<dl>", { "class": "ui-widget" }).appendTo(place);
    // Put an initial message to the definition list on the first page load
    $("<dt>").text("Authenticated session information has not been refreshed yet.")
      .appendTo(list);
    // Add a work in progress indicating text; initially hidden
    progress = $("<p>").hide().text("Working...").appendTo(place);
  });
}