// ==UserScript==
// @name           Festival Lineups
// @namespace      http://www.songkick.com
// @description    add lineups easily
// @include        http://*.songkick.*/festival_instances/new*
// @include        http://*.songkick.*/festivals/*/id/*/edit*
// ==/UserScript==

var SongkickDOM = {
  artistsFormField : function() {
    return $($('div.form-field')[1]);
  },

  artistTextInputs : function () {
    return $("ul.artists input");
  },

  addMoreButton : function() {
    return $("p.form-footer input[value='Add more…']");
  }
}

var InputParser = {
  init : function (textArea) {
    this._textArea = textArea;
  },

  toArray : function (options) {
    var i,
        array = this._textArea.val().split("\n");

    if (options === undefined) {
      return array;
    } else {
      //iterate over array of lines
      for (i = 0; i < array.length; i = i + 1) {
        //strip numbering
        if (options.stripNumbers) {
          array[i] = array[i].stripNumbers();
        }

        //remove line if blank
        if (array[i].length === 0) {
          array.splice(i, 1);
          i = i - 1;
          continue;
        }
      }
    }
    return array;
  },

  clear : function () {
    this._textArea.val('');
  }
};

var Lineup = {

  init : function () {
    this.injectHTML();
    InputParser.init($('#lineup_paste_area'));
  },

  injectHTML : function () {
    var html        = $('<div id="injected">\
                            <label for="lineup_paste_area">\
                              Paste the artists all up in here\
                            </label>\
                            <ul class="artists"><li>\
                              <textarea id="lineup_paste_area"\
                                        style="width: 235px; height: 150px;" />\
                            </li></ul>\
                            <p class="options">\
                              <input id="append_option" type="radio" name="insertionStrategy" value="append" checked />\
                              <label for="append_option">Append</label> \
                            </p>\
                            <p class="options">\
                              <input id="overwrite_option" type="radio" name="insertionStrategy" value="overwrite" />\
                              <label for="overwrite_option">Overwrite</label> \
                            </p>\
                            <p class="form-footer">\
                            <input id="lineup_submit" class="submit button" type="button"\
                               value="Add artists" />\
                            <input id="done_submit" class="submit button" type="button"\
                                   value="Done" />\
                            </p>\
                         </div>');

    SongkickDOM.artistsFormField().prepend(html);
    $('#lineup_submit').click(this.submitHandler);
    $('#done_submit').click(this.doneHandler);
  },

  submitHandler : function () {
    var userArtists = InputParser.toArray({}),
        inputFields = SongkickDOM.artistTextInputs(),
        insertionStrategy = $("input[name='insertionStrategy']:checked").val(),
        i, takenSpaces = 0, availableSpaces = 0;

    switch (insertionStrategy) {
    case 'append':
      for (i = 0; i < inputFields.length; i = i + 1) {
        if ($(inputFields[i]).val() !== '') {
          takenSpaces += 1;
        }
      }

      availableSpaces = inputFields.length - takenSpaces;
      while (availableSpaces < userArtists.length) {
        SongkickDOM.addMoreButton().trigger('click');
        inputFields = SongkickDOM.artistTextInputs();
        //figure out how many spaces the Add More button added
        availableSpaces += (inputFields.length - (takenSpaces + availableSpaces));
      }

      for (i = 0; i < userArtists.length; i = i + 1) {
        $(inputFields[takenSpaces + i]).val(userArtists[i]);
      }
      break;
    case 'overwrite':
      // Click "Add more" until all the artists will fit
      while (inputFields.length < userArtists.length) {
        SongkickDOM.addMoreButton().trigger('click');
        inputFields = SongkickDOM.artistTextInputs();
      }

      for (i = 0; i < inputFields.length; i = i + 1) {
        if (i < userArtists.length) {
          $(inputFields[i]).val(userArtists[i]);
        } else {
          $(inputFields[i]).val('');
        }
      }
      break;
    }
    InputParser.clear();
  },

  doneHandler : function () {
    $("#injected").html('');
  }
};

/**
* Strips several common forms of numbering & whitespace from the
* front of a string using a regular expression
* examples that would be stripped: 1) #2 3. 4: 5
* @param    string  input_string
* @return   string
*/
String.prototype.stripNumbers = function () {
  return this.replace(/^(\s*[#\d\.:\)]*\s*)/i, '');
};

/**
* Recusively checks for jQuery to be loaded.
*/
function GM_wait() {
  if (typeof unsafeWindow.jQuery === 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    Lineup.init();
  }
}
var GM_start = new GM_wait();
