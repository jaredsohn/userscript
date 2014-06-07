// ==UserScript==
// @name        LibraryThing custom author roles
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description If you constantly need to add an "Other..." type of role instead of the ones in the pre-approved list, this script will add those other roles automatically to the dropdown
// @include     http*://*librarything.tld/work/*
// @include     http*://*librarything.com/work/*
// @include     http*://*librarything.tld/addnew.php*
// @include     http*://*librarything.com/addnew.php*
// @version     4
// @grant       none
// ==/UserScript==

// Make a comma-separated list of "Other" role types you'd like to be in the dropdown menu by default
var customRolesString = "Ghostwriter, Corporate author, Compiler, Interviewee, Penciller, Letterer, Inker, Colorist, Director, Producer, Actor, Performer";
var suppressRolesString = "";

// If you've made edits to the list of custom or suppressed roles, get those instead
if (localStorage.LTcustomRoles) customRolesString = localStorage.LTcustomRoles;
if (localStorage.LTsuppressRoles) suppressRolesString = localStorage.LTsuppressRoles;

// Make any array of the custom roles, and deal with certain special characters, extra spaces/commas, etc.
var customRoles = makeRolesArray(customRolesString);
var suppressRoles = makeRolesArray(suppressRolesString);
function makeRolesArray(rolesString) {
  if (rolesString == null || rolesString.trim() == "") {
    return [];
  } else {
    rolesArray = rolesString
      .replace(/&/g, "&amp;") // escape ampersands (though LT sometimes chokes on these anyway)
      .replace(/\"/g, "&quot;") // escape double quotes
      .replace(/</g, "&lt;") // escape less thans (though LT sometimes chokes on these anyway)
      .replace(/>/, "&gt;") // escape greater thans
      .trim() // remove exterior leading/trailing spaces
      .split(/\s*,+\s*/); // split with comma delimiter, plus removing leading/trailing spaces on each piece
    return rolesArray;
  }
}

// When focusing (clicking) or arrowing through (keydown) a dropdown menun, add your custom roles to it.
// Had to put it on "body" because the menus in the "Add/edit other authors" of the work page are dynamically added.
jQuery("body").on("focus keydown", "#bookedit_roles select, #bookedit_authorunflip select, .editotherauthorstable select", function(evt) {

  // Don't bother to run the below code if it's already been done for this <select>
  if (!jQuery(this).hasClass("gm-custom-roles-select")) {
    
    // For certain things we need to know whether we're editing our book, or setting authors on the whole work
    var pageType = jQuery(this).closest("#bookedit_roles, #bookedit_authorunflip").length ? "book" : "work";
    
    // Remember the "selected" element, in order to put the selection property back after the sort
    selectedOpt = jQuery(this).children(":selected");
    selected = { val: selectedOpt.attr("value"), text: selectedOpt.text() };

    // Get the existing roles from the <select><option> texts (not value, since some don't reflect the text)
    var existingRoles = jQuery(this).children("option");
    
    // Remove any empty strings from customRoles and suppressRoles
    for ( var i=0; i<customRoles.length; i++ ) {
      if ( customRoles[i] == '') delete customRoles[i];
      // Remove any custom roles that are already in the list
      for ( var j=0; j<existingRoles.length; j++ ) {
        if (customRoles[i] == existingRoles.eq(j).text()) {
          delete customRoles[i];
        }
      } 
    }
    for ( var k=0; k<suppressRoles.length; k++ ) {
      if (suppressRoles[k] == '') delete suppressRoles[k];
    }

    // Move away any that have been added to the suppression list, unless it was "selected"
    var suppressedSelect = jQuery("#gm-suppressed-select");
    if (!suppressedSelect.length) { // Make a hidden select to store away the values of suppressed roles
      suppressedSelect = jQuery('<select id="gm-suppressed-select" class="gm-suppressed-select-empty"></select>');
      suppressedSelect.appendTo("body").hide();
    }
    for ( var l=0; l<suppressRoles.length; l++ ) {
      for ( var m=0; m<existingRoles.length; m++) {
        if (suppressRoles[l] == existingRoles.eq(m).text()) {
          if (suppressedSelect.not(".gm-suppressed-select-empty")) { // Just fill it once until such time that the suppressed roles change
            existingRoles.eq(m).clone().appendTo(suppressedSelect);
          }
          if (!existingRoles.eq(m).is(":selected")) {
            existingRoles.eq(m).remove();
          }
        }
      }
    }
    suppressedSelect.removeClass("gm-suppressed-select-empty");

    // Add <option>s for adding custom roles or suppressing standard ones
    var invalidValue = pageType == "book" ? "" : "-1"; // The value of invalid options depends on their location
    var lineBeforeOther;
    if (pageType == "book") {
      lineBeforeOther = jQuery(this).children("option[value='xxxOTHERxxx']").prev();
    } else {
      lineBeforeOther = jQuery(this).children("option[value='-1']").eq(-2);
    }
    lineBeforeOther.before('<option value="' + invalidValue + '" class="gm-custom-roles-option gm-custom-roles-line">--------------</option>');
    lineBeforeOther.before('<option value="' + invalidValue + '" class="gm-custom-roles-option gm-edit-custom-roles">Add custom roles...</option>');
    lineBeforeOther.before('<option value="' + invalidValue + '" class="gm-custom-roles-option gm-suppress-standard-roles">Suppress standard roles...</option>');

    // Add <option>s for each of the new custom roles
    for ( var n=0; n<customRoles.length; n++ ) {
      if (customRoles[n] !== undefined) {
        jQuery(this).append('<option value="' + customRoles[n] + '" class="gm-custom-roles-option">' + customRoles[n] + '</option>');
      }
    }
    
    // Sort the custom and standard roles alphabetically
    // Thanks to SolutionYogi at http://stackoverflow.com/a/1134983/752122
    var roleOptions = jQuery(this).children("option:eq(1)").nextUntil(".gm-custom-roles-option"); // The ones that were already in the list before "Other ..."
    roleOptions = roleOptions.add(lineBeforeOther.next().nextAll()); // The ones that have been added after "Other ..."
    roleOptions = roleOptions.get().sort(function(a, b) {
      return jQuery(a).text().localeCompare(jQuery(b).text());
    });
    jQuery(this).children("option:eq(1)").after(roleOptions);

    // Set the selected option again after this list has been rearranged
    var options = jQuery(this).children("option");
    var newSelectedIndex = 0;
    for(var o=0; o<options.length; o++) {
      currentOpt = options.eq(o);
      if (currentOpt.attr("value") == selected.val && currentOpt.text() == selected.text) {
        newSelectedIndex = o;
        break;
      }
    }
    jQuery(this).get(0).selectedIndex = newSelectedIndex;

    // Mark this <select> as processed so that we're not running all the above code on each and every focus/keydown
    jQuery(this).addClass("gm-custom-roles-select");

  }

});

// Edit the roles to whatever you want
jQuery("body").on("change", "#bookedit_roles select, #bookedit_authorunflip select, .editotherauthorstable select", function(evt) {
  var selected = jQuery(this).children(":selected");
//  console.log(jQuery(this).children().last().text());
  // Add new custom roles
  if (selected.hasClass("gm-edit-custom-roles") ) {
    var editRoles = prompt("Change which custom roles you would like to be appear in the dropdown (comma-separated)",customRolesString);
    if (editRoles != null) {
      // Store the user's preferred roles in localStorage (and reset customRoles[String] too)
      localStorage.LTcustomRoles = customRolesString = editRoles;
      customRoles = makeRolesArray(editRoles);
      resetSelects(jQuery(this));
    }
  // Or suppress the existing ones
  } else if (selected.hasClass("gm-suppress-standard-roles") ) {
    var editSuppressRoles = prompt("Enter a comma-separated list of the roles you never use, e.g. Afterword, Narrator, etc.",suppressRolesString);
    if (editSuppressRoles != null) {
      // Store the user's suppressed roles in localStorage (and reset suppressRoles[String] too)
      localStorage.LTsuppressRoles = suppressRolesString = editSuppressRoles;
      suppressRoles = makeRolesArray(editSuppressRoles);
      resetSelects(jQuery(this));
    }
  }
});

// Reset the lists that had been previously processed so that they can get any updates ...
function resetSelects(select) {
  select.blur();
  jQuery(".gm-custom-roles-option")
    .not(":selected") // excluding custom <option>s that were already selected (don't want to undo previous work)
    .add(".gm-custom-roles-line, .gm-edit-custom-roles, .gm-suppress-standard-roles") // unless it was "Add/suppress roles ..." (such a selection doesn't need to be preserved)
    .remove();
  jQuery(".gm-custom-roles-select").append(jQuery("#gm-suppressed-select").children().clone());
  jQuery("#gm-suppressed-select").remove();
  jQuery(".gm-custom-roles-select").removeClass("gm-custom-roles-select");
}
