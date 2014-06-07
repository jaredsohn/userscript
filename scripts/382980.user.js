// ==UserScript==
// @name         WRC.com Update Results
// @namespace    WRC.com
// @description  Turns Results pages' header into update link, shows update status
// @include      http://www.wrc.com/en/wrc/results/*
// @version      1.0.0
// ==/UserScript==

/* Custom styles to be added on page */
var styles =  '#datasite > h5 {\n'
            + ' min-height: 14px;\n'
            + ' cursor: pointer;\n'
            + '}\n'
            + '#datasite > h5:after {\n'
            + ' display: inline-block;\n'
            + ' max-height: 13px;\n'
            + ' margin-left: 5px;\n'
            + ' text-decoration: none;\n'
            + ' text-transform: none;\n'
            + ' font-size: smaller;\n'
            + ' color: gray;\n'
            + '}\n'
            + '#datasite > h5:hover:after {\n'
            + ' content: \'Click to update\';\n'
            + '}\n'
            + '#datasite.updating > h5:after {\n'
            + ' content: \'Updating...\';\n'
            + '}\n'
            + '#datasite.updated > h5:after {\n'
            + ' content: \'Updated!\';\n'
            + '}\n';

/* Custom (jQuery) script to be added on page, needs the page to have jQuery already */
var main = function () {
  // Trim header
  function trimHeaderEmptySpaces() {
    $('#datasite > h5').text($('#datasite > h5').text().trim());
  }
  // Trigger change event, which triggers ajax update
  function updateResults() {
    $('select[name="rally_id"]').change();
  }
  // Show update status before ajax
  function beforeAjaxUpdate() {
    trimHeaderEmptySpaces();
    $('#datasite').addClass('updating');
  }
  // Show update status after ajax
  function afterAjaxUpdate() {
    trimHeaderEmptySpaces();
    $('#datasite').removeClass('updating').addClass('updated');
    setTimeout(function () { $('#datasite').removeClass('updated'); }, 3000);
  }

  // Attach events
  try {
    $(document).on('click', '#datasite > h5', updateResults);
    $(document).ajaxStart(beforeAjaxUpdate);
    $(document).ajaxComplete(afterAjaxUpdate);
  } catch (e) {}
};

/* Inject custom styles */
var style = document.createElement('style');
style.type = "text/css";
style.textContent = styles.toString();
document.head.appendChild(style);

/* Inject main script */
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);