// ==UserScript==
// @name          Textarea Backup
// @namespace     http://davidj.googlepages.com/textareabackup2.user.js
// @description   Retains text entered into textareas.
// @include       *
// @exclude       http://mail.google.com
// ==/UserScript==

function SaveTextArea(txta) {
  this.ta = typeof txta == 'string'
          ? document.getElementById(txta)
          : txta;

  this.initial_txt = this.ta.textContent;
  this.committed   = '';

  this.listen();
  this.check_restore();
}


SaveTextArea.prototype = {
  listen: function() {
    var self = this;
    // Save buffer every keystrokes.
    this.ta.addEventListener('keypress', function(e) {
      self.commit(self.ta.value);
    }, true);

    // Save buffer when the textarea loses focus.
    this.ta.addEventListener('blur', function(e) {
      self.commit();
    }, true);

    // Save buffer every second.
    this._stay_tuned();

    // Should be a method really but there'd be more code to get it to work as
    // expected with event handlers so I won't bother.
    var onsubmit = function(e) {
      self.committed = ''; 
      // Don't call commit() as that checks for an empty string.
      GM_setValue( self.key(), self.committed )
    };  

    var theform = this.ta.form;
    // Delete buffer when the form has been submitted.
    theform.addEventListener('submit', onsubmit, true);

    // Keep a copy of the submit method.
    theform.the_actual_submit_method = theform.submit;
    // Catch direct calls to submit() which doesn't trigger the submit event.
    theform.submit = function() {
      onsubmit();
      self.ta.form.the_actual_submit_method();
    };  
  },

  _stay_tuned: function() {
    var self = this;
    setTimeout(function() {
      self.commit();
      self._stay_tuned();
    }, 1000);
  },

  check_restore: function() {
    // Stop here if there's nothing to restore.
    if(!this.is_significant( GM_getValue(this.key()) ))
      return;

    var buff = GM_getValue(this.key(), this.ta.textContent);
    // Only restore buffer if previously saved (i.e form not submitted).
    if(!this.is_significant(buff))
      return;

    if(buff != this.ta.textContent)
      restore_data_count++;
   
  },


  restore: function() {
    // Stop here if there's nothing to restore.
    if(!this.is_significant( GM_getValue(this.key()) ))
      return;

    var buff = GM_getValue(this.key(), this.ta.textContent);
    // Only restore buffer if previously saved (i.e form not submitted).
    if(!this.is_significant(buff))
      return;

    // Check with user before overwriting existing content with backup.
    if(buff != this.ta.textContent && this.is_significant(this.ta.textContent))
      this._confirm_restore(buff);
    else
        this.ta.value = buff;

    this.previous_backup = this.ta.value;
    var self = this;
    GM_registerMenuCommand(
      'Restore previous backup for '+this.ref(),
      function() { self.ta.value = self.previous_backup }
    );
  },

  _confirm_restore: function(buff) {
    var to_restore = GM_getValue(this.key());
    // Keep existing border so it's not lost when highlighting.
    this.old_border = this.ta.style.border;

    var msg = "Existing text detected in '" + this.ref()
            + "', overwrite with this backup?\n\n";
    msg += to_restore.length > 750
         ? to_restore.substring(0, 500) + "\n..."
         : to_restore;

    this.confirming = true;
    this.ta.focus();
    // Highlight the textarea that the confirm message refers to.
    this._highlight_textarea(this.old_border);

    // Let the user see the existing content as Firefox will sometimes
    // maintain the old value.
    this.ta.value = this.ta.textContent;
    if(window.confirm(msg))
      this.ta.value = buff;

    this.confirming = false;
    this.ta.style.border = this.old_border;
  },

  _highlight_textarea: function(border, toggle) {
    var self = this;
    
    setTimeout(function(ta_border, toggle) {
      if(self.confirming) {
        self.ta.style.border = ( toggle ? '3px red solid' : ta_border );
        self._highlight_textarea(ta_border, toggle);
      } else
        self.ta.style.border = this.old_border;
    }, 1000, border, !toggle);

    return this.ta.style.border;
  },

  commit: function() {
    this.committed = this.ta.value;
    // Only save if:
    // a) There's significant text in the <textarea>.
    // b) The text that was there when the page loaded has changed.
    if(this.is_significant(this.committed)
    && this.initial_txt != this.committed)
      GM_setValue( this.key(), this.committed );
  },

  is_significant: function(str) {
    return typeof str == 'string'
        && str.replace(/\s+/g, '').length > 0;
  },

  // Rough'n'ready method which should be nicer.
  key: function() {
    // If there are two textareas and neither of them have a name or id
    // then they will collide, but a textarea without either would be useless.
    return this.ta.baseURI + ';' + this.ref();
  },

  // Attempt to return the most appropriate textarea reference.
  ref: function() {
    return this.ta.id || this.ta.name || '';
  }
};

function makeControlDiv() {
        // Utility function to create outer-most container for the
        // status bar.
        var div = document.createElement("div");
        div.style.background = "#ccccff";
        div.style.border = "2px sold red";
        div.style.borderColor = "red";
        div.style.position = "fixed";
        div.style.bottom = 0;
        div.style.right = 0;
        div.style.padding = "4px 10px 4px 4px";
        return div;
}

function restoreFields() {
  for(var i = 0; i < textareas.length; i++) {
    textareas[i].restore();  
  }
}

function create_restore_button() {
  var button_div = makeControlDiv();

  var abtn = document.createElement("a");
  abtn.style.color = "blue";
  abtn.style.textDecoration = "underline";
  abtn.style.cursor = "pointer";
  abtn.style.fontSize = "50%";
  abtn.innerHTML = "restore " + restore_data_count + " saved fields";
  abtn.addEventListener("click",function(e) { restoreFields(); }, true);
  button_div.appendChild(abtn);  

  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(button_div);

  restore_div = button_div;
}


/////////////////////////////////////////////////////////////////
// MAIN
//

var tas = document.getElementsByTagName('textarea');
var textareas = new Array(tas.length);
var restore_data_count = 0;
var restore_div;

for(var i = 0; i < tas.length; i++) {
    textareas[i] = new SaveTextArea(tas[i]);
}
if (restore_data_count > 0) {
  create_restore_button();
}
