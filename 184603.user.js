// ==UserScript==
// @name       WaniKani Item Annotator
// @version    1.0
// @description  Annoates item on the radical, kanji and vocab pages with their SRS level.
// @require https://domready.googlecode.com/files/domready.js
// @require https://raw.github.com/jeshuam/wanikani-userscripts/master/utility/api.js
// @include http://www.wanikani.com/radical*
// @include http://www.wanikani.com/kanji*
// @include http://www.wanikani.com/vocabulary*
// @include http://www.wanikani.com/account*
// @include https://www.wanikani.com/radical*
// @include https://www.wanikani.com/kanji*
// @include https://www.wanikani.com/vocabulary*
// @include https://www.wanikani.com/account*
// @copyright  2013, Jeshua
// ==/UserScript==

DomReady.ready(function() {
  /**
   * Mapping of SRS --> Object, where the object contains a series
   * of transformation colors. These transformations will be applied
   * via the element.style property, so should have priority.
   */
  var newColors = {
    'apprentice': {
      'background': '#f100a0',
      'border': '#f100a0',
      'gradient_start': '#f0a',
      'gradient_end': '#dd0093'
    },

    'guru': {
      'background': '#882d9e',
      'border': '#882d9e',
      'gradient_start': '#aa38c6',
      'gradient_end': '#882d9e'
    },

    'master': {
      'background': '#294ddb',
      'border': '#294ddb',
      'gradient_start': '#5571e2',
      'gradient_end': '#294ddb'
    },

    'enlighten': {
      'background': '#0093dd',
      'border': '#0093dd',
      'gradient_start': '#0af',
      'gradient_end': '#0093dd'
    },

    'burned': {
      'background': '#434343',
      'border': '#434343',
      'gradient_start': '#555',
      'gradient_end': '#434343'
    }
  };

  /**
   * Main function: actually annotate the elements. Takes as input information from
   * the WK API as a mapping from Japanese Element --> Object. In this case, the
   * object need only contain the SRS level of the element.
   */
  function main(itemMapping, target) {
    // Find all characters on the page.
    var elements = document.querySelectorAll('.character-item');

    for (var i in elements) {
      var element = elements[i];

      // If this isn't actually an element (could happen, who knows), just skip it.
      if (!element.querySelector || !element.style) {
        continue;
      }

      // Get the element containing the japanese information.
      var japaneseElement = element.querySelector('.character');

      // The japanese value to look up in the item mapping is the text of this element.
      var japanese = japaneseElement.textContent;

      // If we happen to be looking at radicals, some of them use pictures instead. It is
      // simpler to use the radical meaning in this case (as there is only one meaning).
      // The meaning is stored in the last list element within the element (for some reason
      // there is a &nbsp; list element first).
      if (target === 'radicals') {
        var radicalLink = element.querySelector('a').getAttribute('href');
        japanese = radicalLink.slice(radicalLink.lastIndexOf('/') + 1);
      }

      // Find the actual japanese SRS information.
      japanese = itemMapping[japanese];

      // If we couldn't find the SRS information for the element, or the element hasn't been unlocked
      // yet, just ignore it.
      if (!japanese.srs) {
        continue;
      }

      // Find the corresponding colors.
      var colors = newColors[japanese.srs];

      // Actually change the properties. This was essentially taken from the elements already on the page.
      element.style['background'] =
          colors.background 
          + ' linear-gradient(to bottom, ' + colors.gradient_start + ', ' + colors.gradient_end + ')';
      element.style['borderColor'] = colors.border;
    }
  }

  // Determine which API call we are going to make.
  var target = 'kanji';
  if (window.location.href.indexOf('vocabulary') >= 0) {
    target = 'vocabulary';
  } else if (window.location.href.indexOf('radicals') >= 0) {
    target = 'radicals';
  }

  // Die if the API key isn't found.
  if (!WaniKaniAPI.getAPIKey) {
    return;
  }

  // Load the API data.
  WaniKaniAPI.load(WaniKaniAPI.apiURL(target), function(xhr) {
    // Parse the response.
    var response = JSON.parse(xhr.response);

    // Build up an item mapping from Kanji --> Information
    var itemMapping = {};

    // Get the actual request information. If the target is vocabulary, for some reason
    // we have to got an additional level into 'request_information.general'. This is
    // probably to account for specialised vocab which will be added later.
    var information = response.requested_information;
    if (target === 'vocabulary') {
      information = information.general;
    }

    for (var i in information) {
      var item = information[i];

      // Extract the character (Kanji) from the item.
      var character = item.character;

      // If we are looking at radicals, use the meaning instead (convert the meaning to
      // the 'user friendly' format).
      if (target === 'radicals') {
        character = item.meaning.toLowerCase();
      }

      // Get the SRS level from the item. The 'user_specific' object will be `null` if the item
      // hasn't been unlocked yet. In this case, just set the SRS level to `null`.
      var srs = null;
      if (item.user_specific) {
        srs = item.user_specific.srs;
      }

      // Build the mapping for this character.
      itemMapping[character] = {
        'srs': srs
      };
    }

    // Actually do stuff with this mapping.
    main(itemMapping, target);
  });
});
