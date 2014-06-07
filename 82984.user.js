// ==UserScript==
// @name          The GM_config Unit Test
// @namespace     sizzlemctwizzle
// @description	  Attempts to test every aspect of GM_config.
// @version       2.2
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// @require       https://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @include       http://userscripts.org/scripts/show/82984
// @include       https://userscripts.org/scripts/show/82984
// ==/UserScript==

var fieldDefs = {
    'name': {
        'section': [GM_config.create('Personal Info About Yourself'), 'We need this info to do stuff'],
        'label': GM_config.create('Name'),
        'type': 'text',
        'default': 'Joe Simmons'
    },
    'birthday': {
        'label': 'Date of Birth',
        'type': 'date',
        'format': 'dd/mm/yyyy'
    },
    'age': {
        'label': 'Age',
        'type': 'unsigned int',
        'default': 19
    },
    'gender': {
        'options': ['Male', 'Female'],
        'label': 'Gender',
        'type': 'radio',
        'default': 'Male'
    },
    'income': {
        'labelPos': 'right',
        'label': 'Income',
        'type': 'float',
        'default': 50000.0
    },
    'status': {
        'label': 'Married',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': false
    },
    'work': {
        'label': 'Job',
        'type': 'select',
        'labelPos': 'below',
        'options': ['Carpenter', 'Truck Driver', 'Porn Star'],
        'default': 'Truck Driver'
    },
    'bunchOtext': {
        'label': 'Bunch of Text',
        'type': 'textarea',
        'default': 'I actually did\'t realize we had this field until recently...'
    },
    'magic': {
        'label': 'Magic Button',
        'type': 'button',
        'click': function() { 
            alert('Magic works!');
        }
    },
    'upperLeft': {
        'section': 'Check some boxes',
        'type': 'checkbox',
        'default': false
    },
    'upperLeftMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'upperRightMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'upperRight': {
        'type': 'checkbox',
        'default': false
    },
    'middleLeft': {
        'section': [],
        'type': 'checkbox',
        'default': false
    },
    'middleLeftMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'middleRightMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'middleRight': {
        'type': 'checkbox',
        'default': false
    },
    'bottomLeft': {
        'section': [],
        'type': 'checkbox',
        'default': false
    },
    'bottomLeftMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'bottomRightMiddle': {
        'type': 'checkbox',
        'default': false
    },
    'bottomRight': {
        'type': 'checkbox',
        'default': false
    },
    'labelLess': {
        'section': GM_config.create('New Section'),
        'type': 'text',
        'default': 'This value is not saved.',
        'save': false
    },
    'alertTextField': {
        'label': 'Alert Text',
        'type': 'button',
        'click': function() { 
            alert(GM_config.fields['labelLess'].toValue());
            GM_config.fields['labelLess'].value = 'Value changed.';
            GM_config.fields['labelLess'].reload();
        }
    },
    'customCSS': {
        'label': 'Enter CSS',
        'type': 'text',
        'save': false,
        'default': ''
    },
    'validCSS': {
        'type': 'hidden',
        'default': '',
    }
};

GM_config.init(
{
  id: 'GM_config',
  title: 'Configurable Options Script', 
  fields: fieldDefs, 
  css: '#GM_config_section_1 .config_var, #GM_config_section_2 .config_var, #GM_config_section_3 .config_var { margin: 5% !important;display: inline !important; }',
  events: 
  {
    open: function(doc) {
      doc.getElementById('GM_config_section_header_1').className = 'field_label';
      var customCSS = GM_config.fields['customCSS'].node;
      var validCSS = GM_config.fields['validCSS'].node;
      customCSS.value = validCSS.value;
      customCSS.addEventListener('change', function () {
        if(/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(customCSS.value))
          validCSS.value = customCSS.value;
      }, false);
    },
    save: function(values) {
      // All the values that aren't saved are passed to this function
      // for (i in values) alert(values[i]);
    }
  },
  'types':
  {
    'date': {
      'default': null,
        toNode: function(configId) {
          var field = this.settings,
              value = this.value,
              id = this.id,
              create = this.create,
              format = (field.format || 'mm/dd/yyyy').split('/'),
              slash = null,
              retNode = create('div', { className: 'config_var',
                id: configId + '_' + id + '_var',
                title: field.title || '' });

          // Save the format array to the field object so
          // it's easier to hack externally
          this.format = format;

          // Create the field lable
          retNode.appendChild(create('label', {
            innerHTML: field.label,
            id: configId + '_' + id + '_field_label',
            for: configId + '_field_' + id,
            className: 'field_label'
          }));

          // Create the inputs for each part of the date
          value = value ? value.split('/') : this['default'];
          for (var i = 0, len = format.length; i < len; ++i) {
            var props = {
              id: configId + '_field_' + id + '_' + format[i],
              type: 'text',
              size: format[i].length,
              value: value ? value[i] : '',
              onkeydown: function(e) {
                var input = e.target;
                if (input.value.length >= input.size)
                  input.value = input.value.substr(0, input.size - 1);
              }
            };
            
            // Jump to the next input once one is complete
            // This saves the user a little work
            if (i < format.length - 1) {
              slash = create(' / ');
              props.onkeyup = function(e) {
                var input = e.target,
                    inputs = input.parentNode.getElementsByTagName('input'),
                    num = 0;

                for (; num < inputs.length && input != inputs[num]; ++num);
                if (input.value.length >= input.size)
                  inputs[num + 1].focus();
              };
            } else slash = null;

            // Actually create and append the input element
            retNode.appendChild(create('input', props));
            if (slash) retNode.appendChild(slash);
          }

          return retNode;
        },
        toValue: function() {
          var rval = null;
          if (this.wrapper) {
            var inputs = this.wrapper.getElementsByTagName('input');
            rval = '';

            // Join the field values together seperated by slashes
            for (var i = 0, len = inputs.length; i < len; ++i) {
              // Don't save values that aren't numbers
              if (isNaN(Number(inputs[i].value))) {
                alert('Date is invalid');
                return null;
              }
              rval += inputs[i].value + (i < len - 1 ? '/' : '');
            }
          }

          // We are just returning a string to be saved
          // If you want to use this value you'll want a Date object
          return rval;
        },
        reset: function() {
          // Empty all the input fields
          if (this.wrapper) {
            var inputs = this.wrapper.getElementsByTagName('input');
            for (var i = 0, len = inputs.length; i < len; ++i)
              inputs[i].value = '';
          }
        }
    }
  }
});

// Retrieve language setting
var lang = GM_config.getValue('lang', 'en');

// Fields in different languages
var langDefs = {
  'en': // Fields in English
  {
    'lang':
    {
      'label': 'Choose Language',
      'type': 'select',
      'options': ['en', 'de'],
      'save': false // This field's value will NOT be saved
    }
  },
  'de': // Fields in German
  {
    'lang':
    {
      'label': 'Sprache wählen',
      'type': 'select',
      'options': ['en', 'de'],
      'save': false // This field's value will NOT be saved
    }
  }
};

// Use field definitions for the stored language
var fields = langDefs[lang];

// The title for the settings panel in different languages
var titles = {
  'en': 'Translations Dialog',
  'de': 'Übersetzungen Dialog'
};
var title = titles[lang];

// Translations for the buttons and reset link
var saveButton = {'en': 'Save', 'de': 'Speichern'};
var closeButton = {'en': 'Close', 'de': 'Schließen'};
var resetLink = {
  'en': 'Reset fields to default values', 
  'de': 'Felder zurücksetzen auf Standardwerte'
};

var gmc_trans = new GM_configStruct(
{
  'id': 'GM_config_trans', // The id used for this instance of GM_config
  'title': title,
  'fields': fields, // Fields object
  'events':
  {
    'init': function() 
    {
      // You must manually set an unsaved value
      this.fields['lang'].value = lang;
    },
    'open': function (doc) {
      // translate the buttons
      var config = this;
      doc.getElementById(config.id + '_saveBtn').textContent = saveButton[lang];
      doc.getElementById(config.id + '_closeBtn').textContent = closeButton[lang];
      doc.getElementById(config.id + '_resetLink').textContent = resetLink[lang];
    },
    'save': function(values) { // All unsaved values are passed to save
      for (i in values) {
        if (i == 'lang' && values[i] != lang) {
          var config = this;
          lang = values[i];

          // Use field definitions for the chosen language
          fields = langDefs[lang];
          config.fields['lang'].value = lang;

          // Use the title for the chose language
          title = titles[lang];

          // Re-initialize GM_config for the language change
          config.init({ 'id': config.id, title: title, 'fields': fields });

          // Refresh the config panel for the new language change
          config.close();
          config.open();

          // Save the chosen language for next time
          config.setValue('lang', lang);
        }
      }
    }
  }
});

GM_config.init(
{
  id: 'GM_config',
  fields:
  {
    'extra': 
    {

      'label': 'Extra Field',

      'type': 'text',
      'default': 'This field was added with a second call to init()'
    },
    'openTrans':
    {
      'label': 'Open Translation Demo',
      'type': 'button',
      'click': function() { 
        GM_config.close();
        gmc_trans.open();
      }
    }
  }
});
GM_config.open();
