// ==UserScript==
// @name        Rightscale Credential Dropdown Chosen
// @namespace   com.carelearning.www
// @description Use Chosen JQuery Plugin to Search and Filter large form selects on Rightscale
// @include     *://*
// @matches     *://*
// @version     1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
var addChosen, addJQuery, addStuff, startChosen;

addStuff = function() {
  var link;
  link = document.createElement("LINK");
  link.rel = "stylesheet";
  link.href = "//cdnjs.cloudflare.com/ajax/libs/chosen/1.0/chosen.min.css";
  link.type = "text/css";
  document.body.insertBefore(link, null);
  return addJQuery(addChosen);
};

addJQuery = function(callback) {
  var script;
  script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener("load", (function() {
    script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
    return addChosen(startChosen);
  }), false);
  return document.body.appendChild(script);
};

addChosen = function(callback) {
  var script;
  script = document.createElement("script");
  script.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/chosen/1.0/chosen.jquery.min.js");
  return document.body.appendChild(script);
};

startChosen = function() {
  return $(document).on('ready', function() {
    return $(document).ajaxComplete(function() {
      return $('.ivs_value_container select').each(function() {
        return $(this).chosen();
      });
    });
  });
};

addStuff();
startChosen();