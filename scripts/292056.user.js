// ==UserScript==
// @name       Trasmission Download Destination
// @namespace  http://gilesthompson.co.nz/
// @version    0.1
// @description  Allows the saving and loading of multiple download destinations in the Transmission remote web interface
// @match      http://*/transmission/web/
// @copyright  2014, Giles Thompson
// ==/UserScript==

(function() {

  // JAVASCRIPT
  // ====================

  // add some extra functionality to arrays

  var array_contains = function (array, obj) {
    var i = array.length;
    while (i--) {
      if (array[i] === obj) {
        return true;
      }
    }
    return false;
  };

  var array_remove = function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === val) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
  };

  // load saved destinations, if there are any
  var transmission_download_destinations = [];

  if(GM_getValue('transmission_download_destinations') == undefined) {
    // do nothing
  } else {
    transmission_download_destinations = JSON.parse(GM_getValue('transmission_download_destinations'));
  }

  var save_destinations = function () {
    GM_setValue('transmission_download_destinations', JSON.stringify(transmission_download_destinations));
  };

  var destination_select;

  var update_destination_select = function () {
    // clear the guy out
    destination_select.innerHTML = '';
    // add a placeholder option to the select
    var placeholder_option = document.createElement('option');
    placeholder_option.innerHTML = 'Select a saved destination';
    destination_select.appendChild(placeholder_option);
    for (var i = 0; i < transmission_download_destinations.length; i++) {
      var option = document.createElement('option');
      option.innerHTML = transmission_download_destinations[i];
      destination_select.appendChild(option);   
    }
  };

  var init = function () {
    // save the form we are tweaking so that we can add stuff to it
    var form = document.getElementById('torrent_upload_form');

    // create a button for adding the currently entered destination
    var add_destination_button = document.createElement('a');
    add_destination_button.setAttribute('href', '#add_destination');
    add_destination_button.setAttribute('id', 'add_destination_button');
    add_destination_button.innerHTML = 'Add destination';

    // create a select list for choosing from saved destinations
    destination_select = document.createElement('select');
    destination_select.setAttribute('id', 'destination_select');

    var remove_destination_button = document.createElement('a');
    remove_destination_button.setAttribute('href', '#remove_destination');
    remove_destination_button.setAttribute('id', 'remove_destination_button');
    remove_destination_button.innerHTML = 'Remove';

    // convenience assignation
    var destination_field = document.getElementById('add-dialog-folder-input');

    update_destination_select();

    // pop the extra elements into the form
    form.appendChild(add_destination_button);
    form.appendChild(destination_select);
    form.appendChild(remove_destination_button);

    // bind a saving event to the add destination button
    add_destination_button.onclick = function () {
      // load the destination entered currently
      var current_destination = destination_field.value;
      if(array_contains(transmission_download_destinations, current_destination)) {
        // do nothing
      } else {
        transmission_download_destinations.push(current_destination);
        save_destinations();
        update_destination_select();
        destination_select.value = current_destination;
      }
    };

    // bind a deleting event to the remove destination button
    remove_destination_button.onclick = function () {
      // load the destination entered currently
      var current_destination = destination_field.value;
      if(array_contains(transmission_download_destinations, current_destination)) {
        transmission_download_destinations = array_remove(transmission_download_destinations, current_destination);
        save_destinations();
        update_destination_select();
      }
    };

    // bind a change event to the destination select
    destination_select.onchange = function () {
      if(destination_select.value == 'Select a saved destination') {
        // do nothing
      } else {
        // set the value of the detination field to be the selected destination
        destination_field.value = destination_select.value;
        destination_field.setAttribute('value', destination_select.value);
        // trigger change so that remaining space shows up... ok so i can't figure out how to trigger jquery events
      }
    };
  };

  init();

  // CSS style overrides
  // ====================

  GM_addStyle('.dialog_window { width: 480px !important; }');
  GM_addStyle('#add_destination_button { position: absolute !important; right: 0px !important; top: 165px; width: 103px !important; }');
  GM_addStyle('#add-dialog-folder-input { width: 220px !important; margin-bottom: 34px !important }');
  GM_addStyle('#destination_select { position: absolute !important; left: 103px !important; top: 211px !important; width: 232px; }');
  GM_addStyle('#remove_destination_button { width: 103px !important; position: absolute !important; right: 0 !important;top: 199px !important; }');

})();