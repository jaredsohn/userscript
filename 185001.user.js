// ==UserScript==
// @name       WaniKani Markdown Notes
// @version    1.2
// @description  Allows you to write Markdown in the notes, which will be rendered as HTML when the page loads. 
// @require https://raw.github.com/coreyti/showdown/master/src/showdown.js
// @include http://www.wanikani.com/radical*
// @include http://www.wanikani.com/kanji*
// @include http://www.wanikani.com/vocabulary*
// @include http://www.wanikani.com/review/session*
// @include https://www.wanikani.com/radical*
// @include https://www.wanikani.com/kanji*
// @include https://www.wanikani.com/vocabulary*
// @include https://www.wanikani.com/review/session*
// @copyright  2013, Jeshua
// ==/UserScript==

(function() {
  /**
   * Render the given markdown text.
   */
  function render(text) {
    // Do some custom replacements.
    text = text.replace(/#kan#/g, '<span class="kanji-highlight highlight-kanji" rel="tooltip" data-original-title="Kanji">');
    text = text.replace(/#\/kan#/g, '</span>');

    text = text.replace(/#rad#/g, '<span class="radical-highlight highlight-radical" rel="tooltip" data-original-title="Radical">');
    text = text.replace(/#\/rad#/g, '</span>');

    text = text.replace(/#read#/g, '<span class="reading-highlight highlight-reading" rel="tooltip" data-original-title="Reading">');
    text = text.replace(/#\/read#/g, '</span>');

    text = text.replace(/#voc#/g, '<span class="vocabulary-highlight highlight-vocabulary" rel="tooltip" data-original-title="Vocabulary">');
    text = text.replace(/#\/voc#/g, '</span>');

    // Render the rest as markdown.
    return (new Showdown.converter()).makeHtml(text);
  }

  /**
   * Find all of the tooltips in the given container and tooltipify them.
   */
  function activateTooltips(container) {
    if (container.tooltip) {
      container.find('span[rel="tooltip"]').tooltip();
    }
  }

  /**
   * Setup the given note field with the required callbacks.
   */
  function setupNoteField(note) {
    // Save the markdown and render the content.
    note.data('noteContent', note.html());
    note.html(render(note.html()));
    activateTooltips(note);

    note.click(function(e) {
      if (e.target.tagName.toLowerCase() === 'textarea') {
        return;
      }
      
      // If the target is the div, they are going from display --> edit.
      if (e.target.tagName.toLowerCase() !== 'button') {
        var interval = setInterval(function() {
          // If we can find a textarea, they must have clicked to edit the text field.
          // So, we want to display the markdown content.
          if (note.find('textarea')) {
            clearInterval(interval);
            if (note.data('noteContent') === 'Click to add note') {
              note.find('textarea').val('');
            } else {
              note.find('textarea').val(note.data('noteContent').replace(/<br>/g, '\n'));
            }
          }
        }, 50);
      } 

      // Otherwise, they are going from edit --> display.
      else {
        var interval = setInterval(function() {
          // Keep waiting until there is no text area. Then, save the changed markdown
          // value to the data. Also re-render the note.
          if (note.find('textarea').length === 0) {
            clearInterval(interval);
            note.data('noteContent', note.html());
            note.html(render(note.html()));
            activateTooltips(note);
          }
        }, 50);
      }        
    });
  }

  function main() {
    // Convert the text in the meaning note.
    var noteFields = ['.note-meaning', '.note-reading'];
    $.each(noteFields, function(i, noteSelector) {
      // During reviews, we have to wait for the field to be added to the dom first.
      // Then, we can add a listener to the note selector.
      $('#option-item-info').click(function() {
        var interval = setInterval(function() {
          if ($(noteSelector).length !== 0) {
            clearInterval(interval);
            setupNoteField($(noteSelector));
          }
        }, 50);
      });

      // Setup the note field if it is on the page already.
      setupNoteField($(noteSelector));
    });
  }

  var waitForjStorageInterval = setInterval(function() {
    if ($ && $.jStorage) {
      clearInterval(waitForjStorageInterval);
      $(function() {
        main();  
      })
    }
  }, 50);
})();
