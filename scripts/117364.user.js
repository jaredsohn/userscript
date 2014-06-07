// ==UserScript==
// @name campiss
// @namespace http://kwah.org/
// @description campiss is the codename v5 of what was formerly the Neobux 2+ script for Neobux.. The script aims to plugin extra bits of info into Neobux to make your life easier when you're managing referrals or analysing your account.. Once this is a bit more fully formed there'll be more info at kwah.org but for now look out for Neobux 2+ (thread author:kwah) in the Neobux forums =]
// @include http*://www.neobux.com/*
// @icon http://i1227.photobucket.com/albums/ee423/kampiss/Bolivia.png
// ==/UserScript==

var alert_counter = 0;

function modalCheckpoint(arg_context) {
// if (document.location.href === "http://www.neobux.com/c/rl/?ss3=1") {
    arg_context = (arg_context) ? arg_context : "unknown context";
    // alert(alert_counter + ": \n" + arg_context);
    console.info(alert_counter + ": \n" + arg_context);
    if ('undefined' !== typeof GM_log) {
      GM_log(alert_counter + ": \n" + arg_context);
    }
    alert_counter++;
// }
}


/**
* Compatibility functions
*/
if ('undefined' === typeof console) {
  var console = {
    info: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.info(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else {
        if ('object' === typeof arguments[0]) {
          //NOTE: typeof DOM elements === 'object' and fail to be passed to the console correctly
          tmp_msg = JSON.stringify(arguments[0]);
          location.href = "javascript:void(console.info(JSON.parse('" + tmp_msg + "')));";
        } else {
          try {
            tmp_msg = arguments[0].toString();
            location.href = "javascript:void(console.info('" + tmp_msg + "'));";
          } catch (e) {
            location.href = "javascript:void(console.info('cannot convert argument to string'));";
          }
        }
      }
    },
    warn: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.warn(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else {
        if ('object' === typeof arguments[0]) {
          //NOTE: typeof DOM elements === 'object' and fail to be passed to the console correctly
          tmp_msg = JSON.stringify(arguments[0]);
          location.href = "javascript:void(console.warn(JSON.parse('" + tmp_msg + "')));";
        } else {
          try {
            tmp_msg = arguments[0].toString();
            location.href = "javascript:void(console.warn('" + tmp_msg + "'));";
          } catch (e) {
            location.href = "javascript:void(console.warn('cannot convert argument to string'));";
          }
        }
      }
    },
    error: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.error(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else {
        if ('object' === typeof arguments[0]) {
          //NOTE: typeof DOM elements === 'object' and fail to be passed to the console correctly
          tmp_msg = JSON.stringify(arguments[0]);
          location.href = "javascript:void(console.error(JSON.parse('" + tmp_msg + "')));";
        } else {
          try {
            tmp_msg = arguments[0].toString();
            location.href = "javascript:void(console.error('" + tmp_msg + "'));";
          } catch (e) {
            location.href = "javascript:void(console.error('cannot convert argument to string'));";
          }
        }
      }
    },
    debug: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.debug(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else {
        if ('object' === typeof arguments[0]) {
          //NOTE: typeof DOM elements === 'object' and fail to be passed to the console correctly
          tmp_msg = JSON.stringify(arguments[0]);
          location.href = "javascript:void(console.debug(JSON.parse('" + tmp_msg + "')));";
        } else {
          try {
            tmp_msg = arguments[0].toString();
            location.href = "javascript:void(console.debug('" + tmp_msg + "'));";
          } catch (e) {
            location.href = "javascript:void(console.debug('cannot convert argument to string'));";
          }
        }
      }
    },
    log: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.log(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else {
        if ('object' === typeof arguments[0]) {
          //NOTE: typeof DOM elements === 'object' and fail to be passed to the console correctly
          tmp_msg = JSON.stringify(arguments[0]);
          location.href = "javascript:void(console.log(JSON.parse('" + tmp_msg + "')));";
        } else {
          try {
            tmp_msg = arguments[0].toString();
            location.href = "javascript:void(console.log('" + tmp_msg + "'));";
          } catch (e) {
            location.href = "javascript:void(console.log('cannot convert argument to string'));";
          }
        }
      }
    },
    group: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.group(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else if (arguments.length === 1) {
        location.href = "javascript:void(console.group('" + arguments[0].toString() + "'));";
      } else {
        location.href = "javascript:void(console.group());";
      }
    },
    groupEnd: function () {
      if (arguments.length > 1) {
        location.href = "javascript:void(console.groupEnd(JSON.parse('" + JSON.stringify(arguments) + "')));";
      } else if (arguments.length === 1) {
        location.href = "javascript:void(console.groupEnd('" + arguments[0].toString() + "'));";
      } else {
        location.href = "javascript:void(console.groupEnd());";
      }
    }
  };
  console.info('console not defined, now replaced');
}


if ('undefined' === typeof GM_log) {
  function GM_log() {
    console.info(arguments);
    //location.href = "javascript:void(console.info('JSON.parse('"+JSON.stringify(arguments)+"')'));";
  }
}

if ('undefined' === typeof GM_addStyle) {
  function GM_addStyle(arg_css) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
      var style = document.createElement("style");
      style.textContent = arg_css;
      style.type = "text/css";
      head.appendChild(style);
    }
    return style;
  }
}

var preferredStorageOrder_getValue = [
  ('undefined' === typeof GM_getValue) ? null : GM_getValue,
  ('undefined' === typeof localStorage.getItem) ? null : localStorage.getItem
];
var preferredStorageOrder_setValue = [
  ('undefined' === typeof GM_setValue) ? null : GM_setValue,
  ('undefined' === typeof localStorage.setItem) ? null : localStorage.setItem
];

//console.info('preferredStorageOrder_getValue = ', preferredStorageOrder_getValue);
//console.info('preferredStorageOrder_setValue = ', preferredStorageOrder_setValue);

var getValue;
for (var i = 0; i < preferredStorageOrder_getValue.length; i++) {
  if (preferredStorageOrder_getValue[i]) {
    getValue = preferredStorageOrder_getValue[i];
    break;
  }
}
var setValue;
for (var i = 0; i < preferredStorageOrder_setValue.length; i++) {
  if (preferredStorageOrder_setValue[i]) {
    setValue = preferredStorageOrder_setValue[i];
    break;
  }
}

//console.info('getValue.toString = ', getValue.toString);
//console.info('getValue = ', getValue);
//console.info('setValue = ', setValue);

/**
* :Handles stored preferences (eg, referral listings column preferences) and locally cached values (eg, username / number of referrals)
* @param arg_preferenceName The name of the stored value that is stored to / fetched from.
* @param arg_defaultValue The value to return if the value isn't found in storage.
* @param arg_options Indicates the data type that the value will be stored as (where possible) / the data type that the stored value will be returned as. Useful for indicating JSON data. Defaults to string.
**/

function userPreference(arg_preferenceName, arg_defaultValue, arg_options) {
  this.preferenceName = arg_preferenceName.toString();
  if(false === arg_defaultValue) {
    this.defaultValue = false;
  }
  else if (0 === arg_defaultValue) {
    this.defaultValue = arg_defaultValue;
  }
  else if ('null' === typeof arg_defaultValue) {
    this.defaultValue = '{{{null}}}';
  }
  else if ('undefined' === typeof arg_defaultValue) {
    this.defaultValue = '{{{undefined}}}';
  }
  else {
    this.defaultValue = arg_defaultValue || '';
  }
  
  this.options = arg_options || {};

  return this;
}

userPreference.prototype.getValue = function (arg_overridingDefaultValue, arg_overridingOptions) {
  // Where the defaultValue / options have been defined specifically within this getValue, default to using
  // those values rather than the general defaults for the preference
  var defaultValue = ("undefined" !== typeof arg_overridingDefaultValue) ? arg_overridingDefaultValue : this.defaultValue;

  var returnType;
  if ('undefined' !== typeof arg_overridingOptions) {
    if ('undefined' !== typeof arg_overridingOptions['prefType']) {
      returnType = arg_overridingOptions['prefType'];
    }
  } else if ('undefined' !== typeof this.options) {
    if ('undefined' !== typeof this.options.prefType) {
      returnType = this.options['prefType'];
    }
  } else {
    // If the returnType is not set anywhere, set it to be the type of the defaultValue
    returnType = typeof defaultValue;
  }

  // If the defaultValue is still undefined, default to returning a string
  returnType = (!returnType) ? 'string' : returnType;


  if ('null' === typeof getValue(this.preferenceName) || 'undefined' === typeof getValue(this.preferenceName)) {
    //Assume that the value cannot be retrieved
    this.setValue(defaultValue, {
      'prefType': returnType
    });
  }

  var tmp_rawValueFromStorage = getValue(this.preferenceName, defaultValue);

  switch (returnType.toLowerCase()) {
    case 'float':
      return parseFloat(tmp_rawValueFromStorage);

    case 'integer':
      return parseInt(tmp_rawValueFromStorage);

    case 'string':
      //Object.toString() outputs the meaningless [object Object] text
      // NB: It is very highly unlikely that tmp_rawValueFromStorage will ever be an object as it is the raw value obtained from storage
      if (typeof tmp_rawValueFromStorage === 'object') {
        return JSON.stringify(tmp_rawValueFromStorage);
      } else {
        return tmp_rawValueFromStorage.toString();
      }

    case 'boolean':
      //In cases where boolean values are stored as strings:
      if ('true' === tmp_rawValueFromStorage.toString()) {
        return true;
      }
      if ('false' === tmp_rawValueFromStorage.toString()) {
        return false;
      }
      return !!tmp_rawValueFromStorage;

    case 'json':
      //fall-through
    case 'object':
      try {
        return JSON.parse(tmp_rawValueFromStorage);
      } catch (e) {
        errorLog('ERROR! Could not convert the stored value to object, returning supplied default value or an ' + 'empty object if the default value cannot be found.');
        return arg_overridingDefaultValue || {};
      }

    default:
      return tmp_rawValueFromStorage;
  }
}

userPreference.prototype.setValue = function (arg_newValue, arg_overridingOptions) {
  if (arguments.length < 1) {
    throw "Error in userPreference.prototype.setValue!! \n No arguments supplied to set the value";
  }

  var newValue = (null !== typeof arg_newValue) ? arg_newValue : this.defaultValue;

  var returnType;
  if ('undefined' !== typeof arg_overridingOptions) {
    if ('undefined' !== typeof arg_overridingOptions['prefType']) {
      returnType = arg_overridingOptions['prefType'];
    }
  } else if ('undefined' !== typeof this.options) {
    if ('undefined' !== typeof this.options['prefType']) {
      returnType = this.options['prefType'];
    }
  } else {
    // If the returnType is not set anywhere, set it to be the type of the defaultValue
    returnType = typeof newValue;
  }

  if (!setValue) {
    errorLog('ERROR: function: getPref()', 'No preferred storage method for setValue available, cannot store value!\n', 'Returning arg_newValue: ', arg_newValue);
    return arg_newValue;
  }

  var newValue;
  var tmp_value;
  switch (returnType.toLowerCase()) {
    case 'float':
      //GM_setValue cannot store floats - must convert to a string first
      tmp_value = (setValue === GM_setValue) ? newValue.toString() : parseFloat(newValue);
      break;
    case 'integer':
      tmp_value = parseInt(newValue);
      break;
    case 'string':
      tmp_value = newValue.toString();
      break;
    case 'json':
      tmp_value = JSON.stringify(newValue);
      break;
    default:
      tmp_value = newValue;
      break;
  }

  // console.info('tmp_value = ',tmp_value,'typeof tmp_value = ', typeof tmp_value);
  try {
    setValue(this.preferenceName, tmp_value);
  } catch (e) {
    console.info('error setting using setValue');
    console.info('typeof newValue = ', typeof newValue);
    console.info('returnType = ', returnType);

    setValue(this.preferenceName, tmp_value.toString());
  }


  /*Having issues with the localStorage being wiped occasionally [nb: caused by a privacy addon] so storing to GM_log too as a backup*/
  // Also having issues with floats not being able to be stored :S
  if ("undefined" !== typeof GM_setValue) {
    try {
      GM_setValue(this.preferenceName, tmp_value);
    } catch (e) {
      console.info('catch(e) {');
      GM_setValue(this.preferenceName, tmp_value.toString());
    }
  }
  return this.getValue();
}
//userPreference('prefName').getValue('integer', defaultValue);
//userPreference('prefName').setValue('string', value);

modalCheckpoint('a');

var pr = {};

pr['accountCache'] = new userPreference('accountCache', {}, { prefType: 'JSON' });
pr['accountType'] = new userPreference('accountType', {numerical:0, verbose:'unknown'}, { prefType: 'JSON' });
pr['accountTypeCost'] = new userPreference('accountTypeCost', 0, { prefType: 'float' });
pr['adResetTime'] = new userPreference('adResetTime', '', { prefType: 'string' });
pr['AdResetTime_hours'] = new userPreference('AdResetTime_hours', 0, { prefType: 'float' });
pr['AutoDetectTimeOffset'] = new userPreference('AutoDetectTimeOffset', true, { prefType: 'boolean' });
pr['autopayOn'] = new userPreference('autopayOn', false, { prefType: 'boolean' });
pr['columnPrefixes'] = new userPreference('columnPrefixes', {}, { prefType: 'JSON' });
pr['enableAutomaticUpdateChecks'] = new userPreference('enableAutomaticUpdateChecks', true, { prefType: 'boolean' });
pr['flag_textify'] = new userPreference('flag_textify', true, { prefType: 'boolean' });
pr['goldenCost'] = new userPreference('goldenCost', 0, { prefType: 'float' });
pr['goldenPackCost'] = new userPreference('goldenPackCost', 0, { prefType: 'float' });
pr['graphData'] = new userPreference('graphData', {}, { prefType: 'JSON' });
pr['localMidnight'] = new userPreference('localMidnight', '', { prefType: 'string' });
pr['membershipType'] = new userPreference('membershipType', 'unableToFetchNameFromStorage', { prefType: 'string' });
pr['neobuxLanguageCode'] = new userPreference('neobuxLanguageCode', 'EN', { prefType: 'string' });
pr['neoMidnight'] = new userPreference('neoMidnight', '', { prefType: 'string' });
pr['numberOfDirectReferrals'] = new userPreference('numberOfDirectReferrals', 0, { prefType: 'integer' });
pr['numberOfRentedReferrals'] = new userPreference('numberOfRentedReferrals', 0, { prefType: 'integer' });
pr['numeriseDates'] = new userPreference('numeriseDates', {}, { prefType: 'JSON' });
pr['ownAdCountTally'] = new userPreference('ownAdCountTally', {}, { prefType: 'JSON' });
pr['recycleFee'] = new userPreference('recycleFee', 0, { prefType: 'float' });
pr['referrals'] = new userPreference('referrals', {}, { prefType: 'JSON' });
pr['renewalsLength'] = new userPreference('renewalsLength', 90, { prefType: 'integer' });
pr['serverTimeOffset'] = new userPreference('serverTimeOffset', 0, { prefType: 'float' });
pr['setupComplete'] = new userPreference('setupComplete', false, { prefType: 'boolean' });
pr['shortFormatTimer'] = new userPreference('shortFormatTimer', {}, { prefType: 'JSON' });
pr['showColumn'] = new userPreference('showColumn', {}, { prefType: 'JSON' });
pr['showRefClicks'] = new userPreference('showRefClicks', false, { prefType: 'boolean' });
pr['shrinkColumnContents'] = new userPreference('shrinkColumnContents', {}, { prefType: 'JSON' });
pr['statsSidebarPosition'] = new userPreference('statsSidebarPosition', 'right', { prefType: 'string' });
pr['timeOfLastUpdateCheck'] = new userPreference('timeOfLastUpdateCheck', (new Date()).toString(), { prefType: 'string' });
pr['timePeriods'] = new userPreference('timePeriods', {}, { prefType: 'JSON' });
pr['translationStringsNeeded'] = new userPreference('translationStringsNeeded', '', { prefType: 'JSON' });
pr['updateFrequency'] = new userPreference('updateFrequency', 6, { prefType: 'float' });
pr['username'] = new userPreference('username', 'unknownUsername', { prefType: 'string' });



var tl8strings = {
  'EN': {
    " [nb: the second value includes an estimate of your personal clicks]": " [nb: the second value includes an estimate of your personal clicks]",
    " Days <small>(excl. Today)</small>": " Days <small>(excl. Today)</small>",
    " Days <small>(incl. Today)</small>": " Days <small>(incl. Today)</small>",
    " Days Ago": " Days Ago",
    " Days Ago and ": " Days Ago and ",
    " Days Ago Only": " Days Ago Only",
    ", based on the projected values": ", based on the projected values",
    "15 days (The \"Base Rate\")": "15 days (The \"Base Rate\")",
    "150 days (25% discount)": "150 days (25% discount)",
    "240 days (30% discount)": "240 days (30% discount)",
    "30 days (5% discount)": "30 days (5% discount)",
    "60 days (10% discount)": "60 days (10% discount)",
    "90 days (18% discount)": "90 days (18% discount)",
    "Amanhã": "Amanhã",
    "Amount spent on Autopay:": "Amount spent on Autopay:",
    "Amount spent on recycles:": "Amount spent on recycles:",
    "Amount spent on renewing / extending referrals:": "Amount spent on renewing / extending referrals:",
    "Amount spent on renewing:": "Amount spent on renewing:",
    "Amount transferred to your Golden Pack Balance:": "Amount transferred to your Golden Pack Balance:",
    "Amount transferred to your Rental Balance:": "Amount transferred to your Rental Balance:",
    "Aujourd'hui": "Aujourd'hui",
    "Autopay On: ": "Autopay On: ",
    "AutoPay value": "AutoPay value",
    "Autopay": "Autopay",
    "Average Free Recycles: ": "Average Free Recycles: ",
    "Avg. #Recycles: ": "Avg. #Recycles: ",
    "Avg. Clicks: ": "Avg. Clicks: ",
    "Avg. Expense: ": "Avg. Expense: ",
    "Avg. Income: ": "Avg. Income: ",
    "Avg. Renewals (#): ": "Avg. Renewals (#): ",
    "Avg. Transfer: ": "Avg. Transfer: ",
    "Ayer": "Ayer",
    "Blue": "Blue",
    "Close": "Close",
    "Credited clicks": "Credited clicks",
    "Credited Direct Referral Clicks:": "Credited Direct Referral Clicks:",
    "Credited Rented Referral Clicks:": "Credited Rented Referral Clicks:",
    "Demain": "Demain",
    "Details about your expenses for ": "Details about your expenses for ",
    "Details about your income sources for ": "Details about your income sources for ",
    "Direct 'Real' Average": "Direct 'Real' Average",
    "Direct Average": "Direct Average",
    "Direct Clicks": "Direct Clicks",
    "Direct Referrals: ": "Direct Referrals: ",
    "Direct": "Direct",
    "Do you use autopay?": "Do you use autopay?",
    "Eilen": "Eilen",
    "Expenses": "Expenses",
    "Extended:": "Extended:",
    "Extension value": "Extension value",
    "Extensions": "Extensions",
    "Fixed (Micro):": "Fixed (Micro):",
    "Fixed:": "Fixed:",
    "For how long do you usually renew your referrals?": "For how long do you usually renew your referrals?",
    "Gestern": "Gestern",
    "Golden Pack": "Golden Pack",
    "Green": "Green",
    "Gross Income": "Gross Income",
    "Heute": "Heute",
    "Hier": "Hier",
    "Hoje": "Hoje",
    "How many direct referrals do you have?": "How many direct referrals do you have?",
    "How many rented referrals do you have?": "How many rented referrals do you have?",
    "Hoy": "Hoy",
    "Huomenna": "Huomenna",
    "Ideal Avg. Expense ($): ": "Ideal Avg. Expense ($): ",
    "Ideal Avg. Renewals (#): ": "Ideal Avg. Renewals (#): ",
    "Ideal Sum ($): ": "Ideal Sum ($): ",
    "If you aren't sure about any of these, just click save and the script will automatically detect / correct these for you.": "If you aren't sure about any of these, just click save and the script will automatically detect / correct these for you.",
    "Length of Renewals: ": "Length of Renewals: ",
    "Local Time": "Local Time",
    "Mañana": "Mañana",
    "Micro:": "Micro:",
    "Mini:": "Mini:",
    "Morgen": "Morgen",
    "Net Income": "Net Income",
    "Net": "Net",
    "Number of referrals automatically recycled for free:": "Number of referrals automatically recycled for free:",
    "Ontem": "Ontem",
    "Orange": "Orange",
    "Own clicks, Local Time:": "Own clicks, Local Time:",
    "Personal Clicks": "Personal Clicks",
    "Please check that this is what you have entered then click okay to save it or cancel to retry:": "Please check that this is what you have entered then click okay to save it or cancel to retry:",
    "Projected Gross Income": "Projected Gross Income",
    "Projected Income": "Projected Income",
    "Recycle value": "Recycle value",
    "Recycles": "Recycles",
    "Red": "Red",
    "Referrals": "Referrals",
    "Regular:": "Regular:",
    "Rented 'Real' Average": "Rented 'Real' Average",
    "Rented Average": "Rented Average",
    "Rented Clicks": "Rented Clicks",
    "Rented Referrals ": "Rented Referrals ",
    "Rented": "Rented",
    "Save Settings": "Save Settings",
    "Settings saved! The script will run on the next Neobux page that you load.": "Settings saved! The script will run on the next Neobux page that you load.",
    "campiss Script Preferences": "campiss Script Preferences",
    "campiss! Initial Setup": "campiss! Initial Setup",
    "Statistics Summary": "Statistics Summary",
    "Sum: ": "Sum: ",
    "Summary of Income / Projected Income / Expenses / Profit for ": "Summary of Income / Projected Income / Expenses / Profit for ",
    "Summary Totals": "Summary Totals",
    "The last ": "The last ",
    "Time Difference: ": "Time Difference: ",
    "To get the script up and running as quickly as possible you need to supply a few extra details about your account and how you manage it.": "To get the script up and running as quickly as possible you need to supply a few extra details about your account and how you manage it.",
    "Today Only": "Today Only",
    "Today": "Today",
    "Tomorrow": "Tomorrow",
    "Total 'Real' Average": "Total 'Real' Average",
    "Total Average": "Total Average",
    "Total number of referrals due to expire on each date:": "Total number of referrals due to expire on each date:",
    "Total number of referrals": "Total number of referrals",
    "Total": "Total",
    "Totals between ": "Totals between ",
    "Transfer value": "Transfer value",
    "Tänään": "Tänään",
    "What is the time difference between your time and the server's time?": "What is the time difference between your time and the server's time?",
    "White": "White",
    "Yellow": "Yellow",
    "Yesterday Only": "Yesterday Only",
    "Yesterday": "Yesterday",
    "?????": "?????",
    "S?µe?a": "S?µe?a",
    "??e?": "??e?"
  }
};

var tmp_translationStringsNeeded = {};
tmp_translationStringsNeeded = JSON.parse(localStorage.getItem('translationStringsNeeded')) || {};

var tl8_counter = 0;

function tl8(arg_originalString) {
  // console.info('start translation of ', arg_originalString);
  if ('undefined' === typeof tl8strings[pr['neobuxLanguageCode'].getValue()]) {
    tl8strings[pr['neobuxLanguageCode'].getValue()] = {};
  }
  if ('undefined' === typeof tl8strings[pr['neobuxLanguageCode'].getValue()][arg_originalString]) {
    console.group();
    // console.info('Error!\n\nTranslation string for "', arg_originalString, '" not found');
    tmp_translationStringsNeeded[arg_originalString] = arg_originalString;
    pr['translationStringsNeeded'].setValue(tmp_translationStringsNeeded);

    console.info('Record of the translation strings yet to be translated has been updated\n\n missing string = ' + arg_originalString);

    tl8_counter++;
    if (0 > tl8_counter) {
      console.info('arg_originalString = ', arg_originalString);
      console.info('tmp_translationStringsNeeded[arg_originalString] = ', tmp_translationStringsNeeded[arg_originalString]);
      console.info('JSON.stringify(tmp_translationStringsNeeded) = ', JSON.stringify(tmp_translationStringsNeeded));
      console.info(JSON.parse(getValue('translationStringsNeeded')));
    }
    console.groupEnd();
    return (arg_originalString);
  }
  return tl8strings[getValue('neobuxLanguageCode')][arg_originalString];
}

/**
* Logging functions
*/

function debugLog() {
  // addToLoggerBox(arguments);
  if (2 >= arguments.length) {
    console.group('debugLog');
  }
  for (var i = 0; i < arguments.length; i++) {
    console.info(arguments[i]);
    if ('undefined' !== typeof GM_log) {
      GM_log(arguments[i]);
    }
  }
  if (2 >= arguments.length) {
    console.groupEnd('debugLog');
  }
}

function errorLog() {
  addToLoggerBox("ERROR!\n");
  addToLoggerBox(arguments);
  if (2 >= arguments.length) {
    // console.group();
  }
  for (var i = 0; i < arguments.length; i++) {
    console.info(arguments[i]);
    if ('undefined' !== typeof GM_log) {
      GM_log(arguments[i]);
    }
  }
  if (2 >= arguments.length) {
    // console.groupEnd();
  }
}


/**
* Utility functions
*/


/**
* @param arg_input
* @return boolean
*/

function isArray(arg_input) {
  return !!arg_input.constructor.toString().match(/array/i);
}

function docEvaluate(arg_xpath) {
  return document.evaluate(arg_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Append zeros to the _input until the _desiredStringLength is reached
function padZeros(arg_input, arg_desiredStringLength) {
  var currentLength = arg_input.toString().length;
  var output = arg_input;
  for (var i = 0; i < (arg_desiredStringLength - currentLength); i++) {
    output = '0' + output;
  }
  return output;
}

// Function that merges objects, appending the contents of _newObj to the existing object
// * Runs infinitely levels deep
// * Does not completely overwrite the existing object's children, instead only overwrites/adds when it exists in the arg_newObj
function Object_merge(arg_oldObj, arg_newObj) {
  if ('object' !== typeof arg_oldObj) {
    errorLog("ERROR!\nObject_merge(arg_oldObj, arg_newObj)\n\n arg_oldObj is not an Object!", arguments);
    return -1;
  }
  if ('object' !== typeof arg_newObj) {
    errorLog("ERROR!\nObject_merge(arg_oldObj, arg_newObj)\n\n arg_newObj is not an Object!", arguments);
    return -1;
  }

  // Loop through nodes that exist in the new object and add/replace them to the existing/old object
  for (var newVar in arg_newObj) {
    switch (typeof arg_newObj[newVar])
    {
      //If data is a value (boolean/string/number/function) then "update" it to the 'new' value (or add if not present)
      case "boolean":
        //Fall-through
      case "string":
        //Fall-through
      case "number":
        arg_oldObj[newVar] = arg_newObj[newVar];
        break;

      case "function":
        // stop the 'merge' function being copied
        // nb, applies when this function is added to object.prototype
        if ('merge' !== newVar) {
          arg_oldObj[newVar] = arg_newObj[newVar];
        }
        break;

        //Else if the data is an object, it will have sub-items of its own
        // run the merge() function on this object to recurse deeper and merge these sub-items.
      case "object":
        arg_oldObj[newVar] = arg_oldObj[newVar] || {};
        Object_merge(arg_oldObj[newVar], arg_newObj[newVar]);
        break;

      default:
        errorLog('Error! Object_merge(arg_oldObj, arg_newObj);\nCannot detect type of arg_newObj' + newVar + arg_newObj[newVar] + typeof arg_newObj[newVar]);
    }
  }
  return arg_oldObj;
}

/**
* Creates an alert-style pop-up on screen which fades out the rest of the page, creating a page-modal type effect
* Usage:
* var importantMessage = new ModalDialog(string 'idOfDialog', string 'the innerHTML of the dialog');
* followed by:
* importantMessage.show();
* and
* importantMessage.hide();
*
* Depends on:
* GM_addStyle()
*/
function ModalDialog(arg_dialogId) {
  this.create = function (arg_Css, arg_innerHTML) {
    var tmp_cssText;
    var shadowBackdrop;

    tmp_cssText = arg_Css;
    if (null === typeof arg_Css) {
      tmp_cssText = 'background-color: white; margin: 8em auto; padding: 2em; width: 30em;';
    }

    shadowBackdrop = document.getElementById('shadowBackdrop_' + arg_dialogId);
    if (shadowBackdrop) {
      shadowBackdrop.parentNode.removeChild(shadowBackdrop);
    }

    GM_addStyle('#shadowBackdrop_' + arg_dialogId + ' { background-color: black; height: 100%; left: 0; opacity: 0.3; position: fixed; top: 0; width: 100%; z-index: 2; }');

    shadowBackdrop = document.createElement('div');
    shadowBackdrop.id = 'shadowBackdrop_' + arg_dialogId;
    shadowBackdrop.setAttribute('class', "overlay");

    shadowBackdrop.innerHTML = '';

    shadowBackdrop.style.display = 'none';

    document.body.appendChild(shadowBackdrop);


    GM_addStyle('#modalDialogWrapper_' + arg_dialogId + ' { height: 100%; left: 0; position: absolute; top: 0; width: 100%; z-index: 3; }');
    GM_addStyle('#modalDialogElement_' + arg_dialogId + ' { ' + tmp_cssText + ' }');

    var modalDialogWrapper = document.getElementById('modalDialogWrapper_' + arg_dialogId);
    if (modalDialogWrapper) {
      modalDialogWrapper.parentNode.removeChild(modalDialogWrapper);
    }

    modalDialogWrapper = document.createElement('div');
    modalDialogWrapper.id = 'modalDialogWrapper_' + arg_dialogId;
    modalDialogWrapper.style.display = 'none';

    var modalDialogElement = document.createElement('div');
    modalDialogElement.innerHTML = arg_innerHTML;
    modalDialogElement.id = 'modalDialogElement_' + arg_dialogId;

    modalDialogWrapper.appendChild(modalDialogElement);
    document.body.appendChild(modalDialogWrapper);


    this.dialogElement = modalDialogWrapper;

    return modalDialogWrapper;
  };
  this.show = function () {
    document.getElementById('shadowBackdrop_' + arg_dialogId).style.display = '';
    document.getElementById('modalDialogWrapper_' + arg_dialogId).style.display = '';
    return this;
  };
  this.hide = function () {
    document.getElementById('shadowBackdrop_' + arg_dialogId).style.display = 'none';
    document.getElementById('modalDialogWrapper_' + arg_dialogId).style.display = 'none';
    return this;
  };
  return this;
}



/**
* logger box
*/

var loggerBox = new ModalDialog('loggerBox');
loggerBox.create('background-color: white; margin: 3em; padding: 2em; width: 30em; z-index:3;', '' + '<button id="loggerBox_Close" style="float: right;">Close</button>' + '<button id="loggerBox_Clear" style="float: right;">Clear</button>' + '<h4>Debugging Output</h4>' + '<div style="background-color:#e3e3e3; height:40em; overflow: auto;">' + '<ul id="loggerBox_Output">' + '<li>&nbsp;</li>' + '</ul>' + '</div>');

//loggerBox.show();
document.getElementById('loggerBox_Clear').addEventListener('click', function () {
  var tmpLoggerOutput = document.getElementById('loggerBox_Output');
  for (var i = 0, tmp_loggerOutputLength = tmpLoggerOutput.children.length; i < tmp_loggerOutputLength; i++) {
    tmpLoggerOutput.removeChild(tmpLoggerOutput.children[0]);
  }
}, false);

document.getElementById('loggerBox_Close').addEventListener('click', function () {
  loggerBox.hide();
}, false);



function addToLoggerBox(arg_message) {
  var tmp_message = '';
  for (var j = 0; j < arguments.length; j++) {
    switch (typeof arguments[j]) {
    case 'object':
      tmp_message += "\n<br>" + JSON.stringify(arguments[j]).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      break;
    default:
      tmp_message += arguments[j].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      break;
    }
    tmp_message += (j === (arguments.length - 1)) ? '' : '\n<br>';
  }

  var tmpLoggerOutput = document.getElementById('loggerBox_Output');
  var tmp_now = new Date();
  tmpLoggerOutput.innerHTML += "\n<li>" +
      "<small><i>" +
        tmp_now.toTimeString().match(/[0-9]+:[0-9]+:[0-9]+/)[0] + "." + tmp_now.getMilliseconds() +
      " " + tmp_now.toTimeString().match(/[a-z]+\+?\-?[0-9]+/i)[0] +
      "</i></small>: "+
        tmp_message+
      "</li>";
}

/**
* Initial Setup of the script
*/
modalCheckpoint('Initial Setup of the script');

// Depending upon the storage method used, a true value may be stored as boolean or string type so shall test for both
if (("true" !== getValue('setupComplete') && true !== getValue('setupComplete'))) {
  var shadowBackdrop;
  var initialSetupDiv;

  var initialSetupDialog = new ModalDialog('initialSetup');
  initialSetupDialog.create(
      'background-color: white; margin: 8em auto; padding: 2em; width: 30em;',
      '' +
      '<strong>' + tl8('campiss! Initial Setup') + '</strong><br>' +
      '<br>' +
      '<hr>' +
      tl8('To get the script up and running as quickly as possible you need to supply a few extra details about your account and how you manage it.') + "<br>" +
      '<hr>' +
      '<br>' +
      '' + tl8('How many direct referrals do you have?') + ' <input id="initialSetup_directReferrals" size="4" value="0" type="text" /><br>' +
      '' + tl8('How many rented referrals do you have?') + ' <input id="initialSetup_rentedReferrals" size="4" value="0" type="text" /><br>' +
      '' + tl8('Do you use autopay?') + ' <input id="initialSetup_autopay" type="checkbox" /><br>' +
      '<br>' +
      '' + tl8('For how long do you usually renew your referrals?') + ' <select id="initialSetup_normalRenewalLength">' +
      '<option value="15">' + tl8('15 days (The "Base Rate")') + '</option>' +
      '<option value="30" selected="selected">' + tl8('30 days (5% discount)') + '</option>' +
      '<option value="60">' + tl8('60 days (10% discount)') + '</option>' +
      '<option value="90">' + tl8('90 days (18% discount)') + '</option>' +
      '<option value="150">' + tl8('150 days (25% discount)') + '</option>' +
      '<option value="240">' + tl8('240 days (30% discount)') + '</option>' +
      '</select> <br>' +
      '<br>' +
      '' + tl8('What is the time difference between your time and the server\'s time?') + ' <input id="initialSetup_timeDifference" size="4" value="" type="text" /><br>' +
      '<br>' +
      '<small><i>' + tl8("If you aren't sure about any of these, just click save and the script will automatically detect / correct these for you.") + '</i></small>' +
      '<br>' +
      '<input id="initialSetup_save" value="' + tl8('Save Settings') + '" type="button"/>' +
      '<input id="initialSetup_close" value="' + tl8('Close') + '" type="button"/>' +
      ''
      );


  initialSetupDialog.show();


  document.getElementById('initialSetup_save').addEventListener('click', function () {
    var tmp_directRefs = document.getElementById('initialSetup_directReferrals').value.match(/([0-9]+)/) || [, 0];
    var tmp_rentedRefs = document.getElementById('initialSetup_rentedReferrals').value.match(/([0-9]+)/) || [, 0];
    var tmp_autopay = document.getElementById('initialSetup_autopay').checked;
    var tmp_renewalLength = document.getElementById('initialSetup_normalRenewalLength').value;
    var tmp_timeDifference = document.getElementById('initialSetup_timeDifference').value.match(/([+-]?[0-9]+)/) || [, 0];

    if(0 <= tmp_directRefs[1] &&
            0 <= tmp_directRefs[1] &&
            0 <= tmp_renewalLength &&
            (0 <= tmp_timeDifference[1] || 0 >= tmp_timeDifference[1])
        )
    {

      if(confirm(tl8('Please check that this is what you have entered then click okay to save it or cancel to retry:')+'\n\n' +
          tl8('Direct Referrals: ') + tmp_directRefs[1] + '\n' +
          tl8('Rented Referrals ') + tmp_rentedRefs[1]+'\n' +
          tl8('Autopay On: ') + tmp_autopay+'\n' +
          tl8('Length of Renewals: ') + tmp_renewalLength+'\n' +
          tl8('Time Difference: ') + tmp_timeDifference[1])
          )
      {

        pr['numberOfDirectReferrals'].setValue(tmp_directRefs[1]);
        pr['numberOfRentedReferrals'].setValue(tmp_rentedRefs[1]);
        pr['autopayOn'].setValue(tmp_autopay);
        pr['renewalsLength'].setValue(tmp_renewalLength);
        pr['serverTimeOffset'].setValue(tmp_timeDifference[1]);

        pr['setupComplete'].setValue(true);


        alert(tl8('Settings saved! The script will run on the next Neobux page that you load.'));

        initialSetupDialog.hide();

      }
    }
    else {
      alert(tl8('There was an error with what you have entered. Please correct what you have entered and try again:')+'\n\n' +
          tl8('Direct Referrals: ') + tmp_directRefs[1] + '\n' +
          tl8('Rented Referrals ') + tmp_rentedRefs[1] + '\n' +
          tl8('Autopay On: ') + tmp_autopay+'\n' +
          tl8('Length of Renewals: ') + tmp_renewalLength + '\n' +
          tl8('Time Difference: ') + tmp_timeDifference[1]);
    }

  }, false);

  document.getElementById('initialSetup_close').addEventListener('click', function () {
    initialSetupDialog.hide();
  }, false);

}

modalCheckpoint('Initial Setup of the script _ end');

// If the setup hasn't yet been completed, throw an error to quit the execution of the code
if (("true" !== getValue('setupComplete') && true !== getValue('setupComplete'))) {
  throw "Oops, cannot go this far in the script's execution until the initial setup is complete";
}



var dateToday = new Date();
var dateYesterday = new Date();
dateYesterday.setDate(dateToday.getDate() - 1);

// Date strings for the last 90 days and the next 720days
var dates_array = [];
var i = -720;
do {
  var tmpDate = new Date();
  tmpDate.setDate(new Date().getDate() - i);
  dates_array[i] = tmpDate.getFullYear() + '/' + padZeros(tmpDate.getMonth() + 1, 2) + '/' + padZeros(tmpDate.getDate(), 2);
  i++;

} while (90 >= i);

var TODAY_STRING = dates_array[0];
var YESTERDAY_STRING = dates_array[1];
var TOMORROW_STRING = dates_array[-1];


/**
* NEOBUX ACCOUNT DETAILS
*/
var Neobux = {};
Neobux.possibleAccTypes = [
  'Standard',
  'Golden',
  'Emerald',
  'Sapphire',
  'Platinum',
  'Diamond',
  'Ultimate',
  'Pioneer'
];

Neobux.defaultAccountTypeDetails = {
  'Standard': { 'minDaysForAutopay': 20, 'recycleCost': 0.07, 'goldenCost': 0, 'goldenPackCost': 0, 'rentalBandAdjuster': 0},
  'Golden': { 'minDaysForAutopay': 20, 'recycleCost': 0.07, 'goldenCost': 90, 'goldenPackCost': 0, 'rentalBandAdjuster': 0},
  'Emerald': { 'minDaysForAutopay': 20, 'recycleCost': 0.06, 'goldenCost': 90, 'goldenPackCost': 200, 'rentalBandAdjuster': -1},
  'Sapphire': { 'minDaysForAutopay': 18, 'recycleCost': 0.07, 'goldenCost': 90, 'goldenPackCost': 200, 'rentalBandAdjuster': 0},
  'Platinum': { 'minDaysForAutopay': 20, 'recycleCost': 0.06, 'goldenCost': 90, 'goldenPackCost': 400, 'rentalBandAdjuster': -1},
  'Diamond': { 'minDaysForAutopay': 14, 'recycleCost': 0.07, 'goldenCost': 90, 'goldenPackCost': 400, 'rentalBandAdjuster': 0},
  'Ultimate': { 'minDaysForAutopay': 10, 'recycleCost': 0.04, 'goldenCost': 90, 'goldenPackCost': 800, 'rentalBandAdjuster': -3},
  'Pioneer': { 'minDaysForAutopay': 20, 'recycleCost': 0.07, 'goldenCost': 0, 'goldenPackCost': 0, 'rentalBandAdjuster': 0}
};



var rentingRenewing = {};


function createRentalBandDetails(arg_basePrice, arg_autopayDiscount){
  function RENTAL_BAND(arg_minRefs, arg_maxRefs, arg_costOfRent, arg_costOfAutopay) {
    this.minRefs = arg_minRefs;
    this.maxRefs = arg_maxRefs;
    this.costOfRent = arg_costOfRent;
    this.costOfAutopay = arg_costOfAutopay;

    return this;
  }

  var tmp_rentalBands = {}
  for (var i = 0; 8 > i; i++) {
    // Minimum number of referrals for this price band to apply:
    // Maximum number of referrals for this price band to apply:
    // Base cost of initial purchase of a single referral for 30days:
    // Cost of autopay:
    tmp_rentalBands[i] = new RENTAL_BAND(
        ( (i*250) + 1 ), // minRefs: 1, 251, 501, 751, 1001, 1251, 1501, 1751
        ( (i+1) * 250 ), // maxRefs: 250, 500, 750, 1000, 1250, 1500, 1750, 2000
        arg_basePrice + (i*0.01), // costOfRent: $0.20, $0.21, $0.22, $0.23, $0.24, $0.25, $0.26, $0.27
        Math.round(((arg_basePrice + (i*0.01)) / 30) * arg_autopayDiscount * 10000) / 10000 // costOfAutopay: NB: rounded to 4 decimal places
    );
  }
  //The first band includes people who have zero refs (eg, cost to rent)
  tmp_rentalBands[0].minRefs = 0;

  //The final band has no upper limit on the max number of refs
  tmp_rentalBands[7].maxRefs = Infinity;

  return tmp_rentalBands;
}

var tmp_baseBandPrice = 0.20; //The lowest price band starts at $0.20
var autopayDiscount = 0.85; // 15% discount when paying via autopay
var rentalBands = createRentalBandDetails(tmp_baseBandPrice, autopayDiscount);


var bulkRenewalDiscounts = {
  15: 1.00, // 0% discount
  30: 0.95, // 5% discount
  60: 0.90, // 10% discount
  90: 0.82, // 18% discount
  150: 0.75, // 25% discount
  240: 0.70 // 30% discount
};


function getRenewalFees(arg_accountType, arg_numberOfRentedRefs, arg_lengthOfRenewal) {
  var tmp_rentingBand = Math.floor(arg_numberOfRentedRefs / 250) + [arg_accountType].rentalBandAdjuster;
  tmp_rentingBand = (0 < tmp_rentingBand) ? tmp_rentingBand : 0;

  var tmp_rentingCost = ((rentalBands[tmp_rentingBand].costOfRent / 30) * arg_lengthOfRenewal * bulkRenewalDiscounts[arg_lengthOfRenewal]).toFixed(2);

  return tmp_rentingCost;
}

function getAutopayValues(arg_accountType) {
  /*
for(var accountType in Neobux.defaultAccountTypeDetails) {
if(Neobux.defaultAccountTypeDetails.hasOwnProperty(accountType))
{
Neobux.defaultAccountTypeDetails[accountType].referralPrices = {
initialRent: 0,
autopay: 0
};

for(var renewalLength in bulkRenewalDiscounts) {
if(bulkRenewalDiscounts.hasOwnProperty(renewalLength)) {
Neobux.defaultAccountTypeDetails[accountType].referralPrices[renewalLength] = Neobux.defaultAccountTypeDetails[accountType].referralPrices.initialRent * renewalLength * bulkRenewalDiscounts[renewalLength];
}
}
}
}
*/

  // Values taken from the help files (quoted above)
  tmp_autopayValues = {
    'Standard': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1001, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Golden': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1001, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Emerald': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1251, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Sapphire': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 751, 'cost': 0.0065},
      {'minRefs': 1001, 'cost': 0.0070},
      {'minRefs': 1501, 'cost': 0.0075},
      {'minRefs': 1751, 'cost': 0.0080}
    ],
    'Platinum': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1251, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Diamond': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 1001, 'cost': 0.0065},
      {'minRefs': 1251, 'cost': 0.0070},
      {'minRefs': 1751, 'cost': 0.0075}
    ],
    'Ultimate': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 1251, 'cost': 0.0065},
      {'minRefs': 1501, 'cost': 0.0070}
    ]
  };

  return tmp_autopayValues[arg_accountType];
}

//debugLog(Neobux.defaultAccountTypeDetails);

var defaultSettings = {
  columnPrefixes: {
    flag: " | ",
    referralName: "",
    referralSince: "",
    nextPayment: "",
    lastClick: "",
    totalClicks: "",
    average: "",
    clickText: "",
    average1: "",
    average2: "",
    RSA: "",
    SD: "",
    profit: "$"
  },

  shrinkColumnContents: {
    flag: true,
    referralName: true,
    referralSince: true,
    nextPayment: true,
    lastClick: true,
    totalClicks: false,
    average: false,
    clickText: true,
    average1: true,
    average2: true,
    RSA: true,
    SD: true,
    profit: false
  },

  numeriseDates: {
    flag: null,
    referralName: null,
    referralSince: true,
    nextPayment: null,
    lastClick: true,
    totalClicks: null,
    average: null,
    clickText: null,
    average1: null,
    average2: null,
    RSA: null,
    SD: null,
    profit: null
  },

  shortFormatTimer: {
    flag: null,
    referralName: null,
    referralSince: true,
    nextPayment: null,
    lastClick: true,
    totalClicks: null,
    average: null,
    clickText: null,
    average1: null,
    average2: null,
    RSA: null,
    SD: null,
    profit: null
  },

  showColumn: {
    flag: true,
    referralName: true,
    referralSince: true,
    nextPayment: true,
    lastClick: true,
    totalClicks: true,
    average: true,
    clickText: true,
    average1: true,
    average2: true,
    RSA: true,
    SD: true,
    profit: true
  },

  numberOfRefs: {
    "Rented": -1,
    "Direct": -1
  },

  timePeriods: {
    // Time Periods for 'smaller' 10day graphs
    smallGraph: [5, 7, 10],
    // Time Periods for larger 15day graphs
    largeGraph: [5, 10, 15],
    // Time Period for 'recent' section of the Referral statistics sidebar
    recent: 7,
    // Time Period for footer row clicks average
    minigraphs: 5,
    // Time Period for the 'average1' & 'average2' column (previously defined as the A10&A7 column)
    averageCols: [10, 7],
    extensionsGraph: [7, 15, 30, 60, 90]
  }
};

var friendlyNameLookup = {
  'ch_cliques': 'personalClicks',
  'ch_cr': 'rentedClicks',
  'ch_cd': 'directClicks',
  'ch_recycle': 'recycleCost',
  'ch_extensions': 'renewalCost',
  'ch_autopay': 'autopayCost',
  'ch_trrb': 'transfersToRentalBalance',

  'ch_earnings': 'referralEarnings',
  'ch_profit': 'referralProfit',
  'ch_trar': 'automaticRecycles',
  'ch_trpb': 'transferToPackBalance',

  'ch_ext_schedule8': 'extensions_631To720',
  'ch_ext_schedule7': 'extensions_541To630',
  'ch_ext_schedule6': 'extensions_451To540',
  'ch_ext_schedule5': 'extensions_361To450',
  'ch_ext_schedule4': 'extensions_271To360',
  'ch_ext_schedule3': 'extensions_181To270',
  'ch_ext_schedule2': 'extensions_91To180',
  'ch_ext_schedule1': 'extensions_0To90',
  'ch_ext_schedule': 'extensions'
};


var lookup_graphCache = {
  'ch_cliques': 'ownClicks_localTime',
  //Use the local graphs in databars etc
  'ch_cr': 'referralClicks_rented',
  'ch_cd': 'referralClicks_direct',
  'ch_recycle': 'recycleFees',
  'ch_trar': 'automaticRecycles',
  'ch_extensions': 'extensions',
  'ch_autopay': 'autopay',
  'ch_trrb': 'transfersToRentalBalance',
  'ch_trpb': 'transfersToGoldenPackBalance',
  // 'ch_earnings': 'referralEarnings',
  // 'ch_profit': 'referralProfit',
  'ch_ext_schedule8': 'extensionsDue',
  'ch_ext_schedule7': 'extensionsDue',
  'ch_ext_schedule6': 'extensionsDue',
  'ch_ext_schedule5': 'extensionsDue',
  'ch_ext_schedule4': 'extensionsDue',
  'ch_ext_schedule3': 'extensionsDue',
  'ch_ext_schedule2': 'extensionsDue',
  'ch_ext_schedule1': 'extensionsDue',
  'ch_ext_schedule': 'extensionsDue'
};

var graphLengthLookup = {
  'ch_cliques': 10,
  'ch_cr': 10,
  'ch_cd': 10,
  'ch_recycle': 15,
  'ch_extensions': 15,
  'ch_autopay': 15,

  //Transfers
  'ch_trrb': 15,
  'ch_trar': 15,
  'ch_trpb': 15,

  //Ultimate-only
  'ch_earnings': 10,
  'ch_profit': 10,

  //Golden-only
  'ch_ext_schedule8': 90,
  'ch_ext_schedule7': 90,
  'ch_ext_schedule6': 90,
  'ch_ext_schedule5': 90,
  'ch_ext_schedule4': 90,
  'ch_ext_schedule3': 90,
  'ch_ext_schedule2': 90,
  'ch_ext_schedule1': 90
};


modalCheckpoint('var currentPage = new function () {');
var currentPage = new function () {
    function testAgainstUrlParameters(arg_urlVarTests) {
      var tmpUrlVars = document.location.search.substring(1).split('&');
      for (var tmpUrlVarTest in arg_urlVarTests) {
        if (!(0 <= tmpUrlVars.indexOf(arg_urlVarTests[tmpUrlVarTest]))) {
          return false;
        }
      }

      // debugLog('Found the following within the URL:', arg_urlVarTests);
      return true;
    }

    function testAgainstUrlPath(arg_urlTests) {
      var tmpUrlVars = document.location.pathname.substring(1).split('/');

      for (var tmpUrlVarTest in arg_urlTests) {
        if (!(0 <= tmpUrlVars.indexOf(arg_urlTests[tmpUrlVarTest]))) {
          return false;
        }
      }

      // debugLog('Found the following within the URL:', arg_urlTests);
      return true;
    }

    function detectLanguageCode() {
      var tmp_langCodes = {
        'f-us': 'EN', // English
        'f-pt': 'PT', // Portuguese
        'f-es': 'ES', // Spanish
        'f-gr': 'GR', // Greece
        'f-fi': 'FI', // Finnish
        'f-se': 'SE', // Swedish
        'f-de': 'DE', // German
        'f-fr': 'FR', // French
        'f-id': 'ID' // Indonesian
      };

      for (var tmp_langCode in tmp_langCodes) {
        if (tmp_langCodes.hasOwnProperty(tmp_langCode)) {
          if (0 < document.querySelectorAll('.band2').length && document.querySelectorAll('.band2')[0].children[0].children[0].getAttribute('class').match(tmp_langCode)) {
            // debugLog("document.querySelectorAll('.band2')[0].children[0].children[0].getAttribute('class') = " + document.querySelectorAll('.band2')[0].children[0].children[0].getAttribute('class'));
            // debugLog('tmp_langCode = '+tmp_langCode);
            // setPref('neobuxLanguageCode', tmp_langCodes[tmp_langCode], { prefType: 'string' });
            pr['neobuxLanguageCode'].setValue(tmp_langCodes[tmp_langCode]);
          }
        }
      }

      //Return the stored language code, defaulting to EN;
      // return getPref('neobuxLanguageCode', 'EN', { prefType: 'string' });
      return pr['neobuxLanguageCode'].getValue();
    };

    function detectPageCode () {
      if(testAgainstUrlPath(['forum'])) {
        if(testAgainstUrlParameters(['u_x_u=replymsg'])) { return 'viewingForums_replyingToThread'; }
        if(testAgainstUrlParameters(['u_x_u=editmsg'])) { return 'viewingForums_editingMessage'; }
        if(testAgainstUrlParameters(['u_x_u=newtopic'])) { return 'viewingForums_creatingTopic'; }
        if(testAgainstUrlParameters(['u_x_u=newpoll'])) { return 'viewingForums_creatingPoll'; }
        return 'viewingForums';
      }

      if(testAgainstUrlPath(['c']))
      {
        if(testAgainstUrlParameters(['s=i'])) { return 'accSummary'; }
        if(testAgainstUrlPath(['b'])) { return 'banners'; }
        if(testAgainstUrlPath(['d'])) { return 'personalSettings'; }
        if(testAgainstUrlPath(['a'])) {
          if(testAgainstUrlParameters(['s1=pgt'])) { return 'advertisementSettings_purchasingClickPack'; }
          return 'advertisementSettings';
        }

        if(testAgainstUrlPath(['rq'])) { return 'rentalQueueSettings'; }
        if(testAgainstUrlPath(['rs'])) { return 'referralStatistics'; }

        if(testAgainstUrlPath(['rl']))
        {
          if(testAgainstUrlParameters(['ss3=1']))
          {
            if(testAgainstUrlParameters(['ss2=1']))
            {
              if(testAgainstUrlParameters(['ss1=2'])) { return 'referralListings_Direct_name_Desc'; }
              if(testAgainstUrlParameters(['ss1=1'])) { return 'referralListings_Direct_refSince_Asc'; }
              if(testAgainstUrlParameters(['ss1=5'])) { return 'referralListings_Direct_nextPayment_Desc'; }
              if(testAgainstUrlParameters(['ss1=4'])) { return 'referralListings_Direct_lastClick_Asc'; }
              if(testAgainstUrlParameters(['ss1=3'])) { return 'referralListings_Direct_totalClicks_Desc'; }
              if(testAgainstUrlParameters(['ss1=7'])) { return 'referralListings_Direct_clickAverage_Desc'; }
              return 'referralListings_Direct_UNKNOWNSORT';
            }

            if(testAgainstUrlParameters(['ss2=2']))
            {
              if(testAgainstUrlParameters(['ss1=2'])) { return 'referralListings_Direct_name_Asc'; }
              if(testAgainstUrlParameters(['ss1=1'])) { return 'referralListings_Direct_refSince_Desc'; }
              if(testAgainstUrlParameters(['ss1=5'])) { return 'referralListings_Direct_nextPayment_Asc'; }
              if(testAgainstUrlParameters(['ss1=4'])) { return 'referralListings_Direct_lastClick_Desc'; }
              if(testAgainstUrlParameters(['ss1=3'])) { return 'referralListings_Direct_totalClicks_Asc'; }
              if(testAgainstUrlParameters(['ss1=7'])) { return 'referralListings_Direct_clickAverage_Asc'; }
              return 'referralListings_Direct_UNKNOWNSORT';
            }

            return 'referralListings_Direct_DEFAULTSORT';
          }

          if(testAgainstUrlParameters(['ss3=2']))
          {
              /**
* Name &ss1=2 &ss2= (2Asc/1Desc)??
* Ref Since &ss1=1 &ss2= (1Asc/2Desc)
* Next Payment &ss1=5 &ss2= (2Asc/1Desc)
* Last Click &ss1=4 &ss2= (1Asc/2Desc)
* Clicks &ss1=3 &ss2= (2Asc/1Desc)
* Average &ss1=7 &ss2= (2Asc/1Desc)
*
* &ss1 = column to be sorted by
* &ss2 = asc / desc
* &ss3 = direct / rented refs
*
* vars[1] = [2, 2, 1, 'Sort by Referral ID#'];
vars[2] = [1, 1, 2, 'Sort by the total time that the referral has been Owned']; // Does not match existing arrow directions
vars[3] = [5, 2, 1, 'Sort by time until Next Payment is Due'];
vars[4] = [4, 1, 2, "Sort by time since the referral's Last Click"];
vars[5] = [3, 2, 1, 'Sort by Total Number of Clicks'];
vars[6] = [7, 2, 1, 'Sort by Average number of clicks'];
*/

            if(testAgainstUrlParameters(['ss2=1']))
            {
              if(testAgainstUrlParameters(['ss1=2'])) { return 'referralListings_Rented_name_Desc'; }
              if(testAgainstUrlParameters(['ss1=1'])) { return 'referralListings_Rented_refSince_Asc'; }
              if(testAgainstUrlParameters(['ss1=5'])) { return 'referralListings_Rented_nextPayment_Desc'; }
              if(testAgainstUrlParameters(['ss1=4'])) { return 'referralListings_Rented_lastClick_Asc'; }
              if(testAgainstUrlParameters(['ss1=3'])) { return 'referralListings_Rented_totalClicks_Desc'; }
              if(testAgainstUrlParameters(['ss1=7'])) { return 'referralListings_Rented_clickAverage_Desc'; }
              return 'referralListings_Rented_UNKNOWNSORT';
            }

            if(testAgainstUrlParameters(['ss2=2']))
            {
              if(testAgainstUrlParameters(['ss1=2'])) { return 'referralListings_Rented_name_Asc'; }
              if(testAgainstUrlParameters(['ss1=1'])) { return 'referralListings_Rented_refSince_Desc'; }
              if(testAgainstUrlParameters(['ss1=5'])) { return 'referralListings_Rented_nextPayment_Asc'; }
              if(testAgainstUrlParameters(['ss1=4'])) { return 'referralListings_Rented_lastClick_Desc'; }
              if(testAgainstUrlParameters(['ss1=3'])) { return 'referralListings_Rented_totalClicks_Asc'; }
              if(testAgainstUrlParameters(['ss1=7'])) { return 'referralListings_Rented_clickAverage_Asc'; }
              return 'referralListings_Rented_UNKNOWNSORT';
            }

            return 'referralListings_Rented_DEFAULTSORT';
          }
        }
        if(testAgainstUrlPath(['h'])) { return 'historyLogs'; }
        if(testAgainstUrlPath(['ll'])) { return 'loginHistory'; }
        if(testAgainstUrlPath(['rba'])) { return 'rentalBalancePage'; }
        if(testAgainstUrlPath(['gm'])) { return 'goldenMembershipPage'; }
        if(testAgainstUrlPath(['gpa'])) { return 'goldenPackBalancePage'; }

        return 'accSummary';
      }


      if(testAgainstUrlPath(['m', 'v'])) { return 'viewAdvertisementsPage'; }
      if(testAgainstUrlPath(['v']) && testAgainstUrlParameters(['a=l'])) { return 'viewingAdvertisement'; }
      if(testAgainstUrlParameters(['u=p'])) { return 'neobuxFrontPage'; }



      throw 'unrecognisedUrlParameters';
      return 'unrecognisedUrlParameters';
    }

    this.languageCode = detectLanguageCode();
    this.pageCode = detectPageCode();

  };


debugLog('currentPage.pageCode = ', currentPage.pageCode);
modalCheckpoint('function extractNumberOfRefs()');

function extractNumberOfRefs() {
  // If currently viewing the rented/direct ref listings, update the stored values accordingly
  if (currentPage.pageCode.match(/referralListings/)) {
    // Deduce which page is being viewed
    var _pageRefType = null;
    if (0 <= currentPage.pageCode.split('_').indexOf('Rented')) {
      _pageRefType = 'Rented';
    } else {
      _pageRefType = 'Direct';
    }
    // debugLog('_pageRefType = ', _pageRefType);
    var tmp_numberOfRefs = null;
    var noOfRefsString = docEvaluate('//td[@class="f_r"]/descendant::span[@class="f_b"]');

    // Only expecting one result if the user has referrals
    if (1 == noOfRefsString.snapshotLength) {
      modalCheckpoint('extractNumberOfRefs() if(1 == noOfRefsString.snapshotLength)');
      noOfRefsString = noOfRefsString.snapshotItem(0);

      if (noOfRefsString.textContent.match(/\d+/)) {
        tmp_numberOfRefs = parseInt(noOfRefsString.textContent.match(/\d+/), 10);
      } else {
        errorLog('An Error has occured.\n\r 1 == (noOfRefsString.snapshotLength) \n\r !(noOfRefsString.textContent.match(/\d+/))')
      }
    } else {
      modalCheckpoint('extractNumberOfRefs() else');
      /**
* Most likely reason for incorrect snapshotLength is an error in page load or zero refs.
* Will now check for zero refs.
*/
      var zeroRefsXpath = {
        'EN': '//span[contains(text(), "You don\'t have")]',
        'PT': '//span[contains(text(), "Não tem referidos")]'
      };
      var zeroRefsString = docEvaluate(zeroRefsXpath[currentPage.languageCode]);

      // If evidence of zero refs is found, set the number of refs to zero (0)
      tmp_numberOfRefs = (1 == zeroRefsString.snapshotLength) ? 0 : false;
    }

    modalCheckpoint('extractNumberOfRefs() before if(0 <= tmp_numberOfRefs) {');
    // Now store the number of detected referrals if numberOfRefs is not false
    if (0 <= tmp_numberOfRefs) {
      pr['numberOf' + _pageRefType + 'Referrals'].setValue(tmp_numberOfRefs);
    }
    modalCheckpoint('extractNumberOfRefs() after if(0 <= tmp_numberOfRefs) {');
    return tmp_numberOfRefs;
  }
  else if (currentPage.pageCode.match(/accSummary/)) {
    // TODO: Extract number of refs from account summary page
    var tmp_elmAccountInfo = docEvaluate('//td[@class="t_preto_r"]/parent::tr/parent::tbody/descendant::td');

    function displayTextContent(arg_element) {
      return arg_element.textContent.replace(/mk_tt\(.*\)/, '').replace(/[><+=;\s]+/g, '');
    }

    var tmp_currentTd;
    var tmp_nextTd;

    var tmp_accSummaryString_lookupArray = [
      [/since:/i, 'You have been a member since {value}'],
      [/type:/i, 'You are a {value} member'],
      [/expires:/i, 'Your membership expires on {value}'],
      [/rented:/i, 'You have {value} rented referrals'],
      [/direct:/i, 'You have {value} direct referrals'],
      [/you:/i, 'As a member of Neobux you have clicked {value} ads'],
      [/your referrals:/i, 'In total, you have been credited from {value} of your referrals ads'],
      [/main balance:/i, 'Your main balance is {value}'],
      [/rental balance:/i, 'Your golden pack balance is {value}'],
      [/golden pack balance:/i, 'Your golden pack balance is {value}'],
      [/received:/i, 'You have cashed out {value} from Neobux'],
      [/direct purchases:/i, 'You have directly transferred {value} from your account balance back into Neobux'],
      [/exposure clicks:/i, 'You have {value} exposure clicks available for you to show ads with']
    ];

    for (var i = 0; i < tmp_elmAccountInfo.snapshotLength; i++) {
      tmp_currentTd = tmp_elmAccountInfo.snapshotItem(i);
      tmp_nextTd = tmp_elmAccountInfo.snapshotItem(i + 1);

      for (var j = 0; j < tmp_accSummaryString_lookupArray.length; j++) {
        if (tmp_currentTd.textContent.match(tmp_accSummaryString_lookupArray[j][0])) {
          // debugLog(tmp_accSummaryString_lookupArray[j][1].replace(/{value}/, displayTextContent(tmp_nextTd)));
        }
      }
    }
  }

}

extractNumberOfRefs();

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

function getClickValues(arg_accountType) {
  var tmp_clickValues = {
    Standard: {
      Extended: {
        value: 0.015,
        commission: {
          rented: 0.01,
          direct: 0.01
        }
      },
      Standard: {
        value: 0.01,
        commission: {
          rented: 0.005,
          direct: 0.005
        }
      },
      Mini: {
        value: 0.005,
        commission: {
          rented: 0,
          direct: 0
        }
      },
      Micro: {
        value: 0.001,
        commission: {
          rented: 0,
          direct: 0
        }
      },
      Fixed: {
        value: 0.001,
        commission: {
          rented: 0.005,
          direct: 0.0005
        }
      }
    },
    Golden: {
      Extended: {
        value: 0.02,
        commission: {
          rented: 0.02,
          direct: 0.02
        }
      },
      Standard: {
        value: 0.01,
        commission: {
          rented: 0.01,
          direct: 0.01
        }
      },
      Micro: {
        value: 0.001,
        commission: {
          rented: 0,
          direct: 0
        }
      },
      Fixed: {
        value: 0.01,
        commission: {
          rented: 0.01,
          direct: 0.005
        }
      }
    }
  };


// Fixed Micro ads are the same value and commission for standard AND golden members
  tmp_clickValues['Standard'].FixedMicro = {
    value: 0.001,
    commission: {
      rented: 0, //Note that if the ad is purchased for 90days or more, will get comissions - same as fixed
      direct: 0 //Note that if the ad is purchased for 90days or more, will get comissions - same as fixed
    }
  };
  tmp_clickValues['Golden'].FixedMicro = {
    value: 0.001,
    commission: {
      rented: 0, //Note that if the ad is purchased for 90days or more, will get comissions - same as fixed
      direct: 0 //Note that if the ad is purchased for 90days or more, will get comissions - same as fixed
    }
  };

// Mini ads are the same value and commission for standard AND golden members
  tmp_clickValues['Standard'].Mini = {
    value: 0.005,
    commission: {
      rented: 0,
      direct: 0
    }
  };
  tmp_clickValues['Golden'].Mini = {
    value: 0.005,
    commission: {
      rented: 0,
      direct: 0
    }
  };

//Initially set all golden packs to be the same as the Golden values
  tmp_clickValues['Emerald'] = {};
  tmp_clickValues['Sapphire'] = {};
  tmp_clickValues['Platinum'] = {};
  tmp_clickValues['Diamond'] = {};
  tmp_clickValues['Ultimate'] = {};


// The golden-pack prices are all based on the golden values so merge those into these and
// tweak just the parts that are different
  Object_merge(tmp_clickValues['Emerald'], tmp_clickValues['Golden']);
  Object_merge(tmp_clickValues['Sapphire'], tmp_clickValues['Golden']);
  Object_merge(tmp_clickValues['Platinum'], tmp_clickValues['Golden']);
  Object_merge(tmp_clickValues['Diamond'], tmp_clickValues['Golden']);
  Object_merge(tmp_clickValues['Ultimate'], tmp_clickValues['Golden']);



//Now to do the golden-pack-specific settings::
  /*Standard Ads click value*/
  tmp_clickValues['Emerald'].Standard.value = 0.012;
  tmp_clickValues['Sapphire'].Standard.value = 0.012;
  tmp_clickValues['Platinum'].Standard.value = 0.015;
  tmp_clickValues['Diamond'].Standard.value = 0.015;
  tmp_clickValues['Ultimate'].Standard.value = 0.02;


  /*Fixed Ads click value - same as standard ads for golden & golden-pack members*/
  tmp_clickValues['Emerald'].Fixed.value = tmp_clickValues['Emerald'].Standard.value;
  tmp_clickValues['Sapphire'].Fixed.value = tmp_clickValues['Sapphire'].Standard.value;
  tmp_clickValues['Platinum'].Fixed.value = tmp_clickValues['Platinum'].Standard.value;
  tmp_clickValues['Diamond'].Fixed.value = tmp_clickValues['Diamond'].Standard.value;
  tmp_clickValues['Ultimate'].Fixed.value = tmp_clickValues['Ultimate'].Standard.value;

  /*Fixed Ads direct-click value - same as standard ads for golden & golden-pack members
* Except Golden members*/
  tmp_clickValues['Standard'].Fixed.commission.direct = 0.0005;
  tmp_clickValues['Golden'].Fixed.commission.direct = 0.005;
  tmp_clickValues['Emerald'].Fixed.commission.direct = tmp_clickValues['Emerald'].Standard.commission.direct;
  tmp_clickValues['Sapphire'].Fixed.commission.direct = tmp_clickValues['Sapphire'].Standard.commission.direct;
  tmp_clickValues['Platinum'].Fixed.commission.direct = tmp_clickValues['Platinum'].Standard.commission.direct;
  tmp_clickValues['Diamond'].Fixed.commission.direct = tmp_clickValues['Diamond'].Standard.commission.direct;
  tmp_clickValues['Ultimate'].Fixed.commission.direct = tmp_clickValues['Ultimate'].Standard.commission.direct;

  return tmp_clickValues[arg_accountType];
}


modalCheckpoint('var userAccount = new function ()');

/**
* :Object used for holding information about the account that the current user of the script is logged into
*
**/
var userAccount = new function () {
  function getUsername() {
    if (document.getElementById('t_conta')) {
      pr['username'].setValue(document.getElementById('t_conta').textContent);
    }
    var tmp_username = pr['username'].getValue() || 'failedToGetUsername';

    return tmp_username;
  }

  function getMembershipType() {
    var xpath_elmt_accountBadge = '//div[@class="tag"][last()]';
    var elmt_accountBadge = document.evaluate(
        xpath_elmt_accountBadge,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var tmp_membershipType_name = '';
    if (0 < elmt_accountBadge.snapshotLength) {
      var tmp_membershipType_name = elmt_accountBadge.snapshotItem(0).textContent.match(/\w+/);
      pr['membershipType'].setValue(tmp_membershipType_name);
    }
    tmp_membershipType_name = pr['membershipType'].getValue();

    return tmp_membershipType_name;
  }

    /**
* @param arg_accountType Name of the account type with only the first initial uppercase
* @param arg_numberOfRentedReferrals Integer count of how many rented referrals the user has
*/
  function getPerAutoPayFee(arg_accountType, arg_numberOfRentedReferrals) {
    var defaultAutopayValues = getAutopayValues(arg_accountType);

    var totalRentedRefs = (0 <= arg_numberOfRentedReferrals) ? arg_numberOfRentedReferrals : 0;
    var perAutoPayCost = 0;

    var j = defaultAutopayValues.length - 1;
    var currentTest;
    do {
      currentTest = defaultAutopayValues[j];
      if (parseInt(currentTest.minRefs, 10) < parseInt(totalRentedRefs, 10)) {
        perAutoPayCost = currentTest.cost;
      }
    } while ((parseInt(defaultAutopayValues[j--].minRefs, 10) > parseInt(totalRentedRefs, 10)));

    return perAutoPayCost;
  }

    this.membershipType = getMembershipType();
    console.info('Neobux.defaultAccountTypeDetails[this.membershipType]');
    console.info(Neobux.defaultAccountTypeDetails[this.membershipType]);
    pr['goldenCost'].setValue(Neobux.defaultAccountTypeDetails[this.membershipType].goldenCost, { prefType: 'float' });
    pr['goldenPackCost'].setValue(Neobux.defaultAccountTypeDetails[this.membershipType].goldenPackCost, { prefType: 'float' });

    this.override_showUltimateFeatures = false;
    this.clickValues = getClickValues(this.membershipType);
    this.numberOfReferrals = {
      Rented: pr['numberOfRentedReferrals'].getValue(),
      Direct: pr['numberOfDirectReferrals'].getValue()
    };
    this.feesCosts = {
      autopay: getPerAutoPayFee(this.membershipType, this.numberOfReferrals.Rented),
      expiredReferral: 0,
      golden: pr['goldenCost'].getValue(Neobux.defaultAccountTypeDetails[this.membershipType].goldenCost),
      goldenPack: pr['goldenPackCost'].getValue(Neobux.defaultAccountTypeDetails[this.membershipType].goldenPackCost),
      initialRent: 0,
      recycle: pr['recycleFee'].getValue(Neobux.defaultAccountTypeDetails[this.membershipType].recycleCost),
      extensions: {
        15: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 15),
        30: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 30),
        60: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 60),
        90: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 90),
        150: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 150),
        240: getRenewalFees(this.membershipType, this.numberOfReferrals.Rented, 240)
      }
    };
    this.username = getUsername();
    };
modalCheckpoint('var preferences = new function ()');

var preferences = new function () {
    this.preferredExtensionLength = pr['renewalsLength'].getValue();
    }

modalCheckpoint('var currentUser = new function ()');


var currentUser = new function () {
  /**
* @param arg_accountType Name of the account type with only the first initial uppercase
* @param arg_numberOfRentedReferrals Integer count of how many rented referrals the user has
*/
  function getPerAutoPayFee(arg_accountType, arg_numberOfRentedReferrals) {
    var defaultAutopayValues = getAutopayValues(arg_accountType.verbose);

    var totalRentedRefs = (0 <= arg_numberOfRentedReferrals) ? arg_numberOfRentedReferrals : 0;
    var perAutoPayCost = 0;

    var j = defaultAutopayValues.length - 1;
    var currentTest;
    do {
      currentTest = defaultAutopayValues[j];
      if (parseInt(currentTest.minRefs, 10) < parseInt(totalRentedRefs, 10)) {
        perAutoPayCost = currentTest.cost;
      }
    } while ((parseInt(defaultAutopayValues[j--].minRefs, 10) > parseInt(totalRentedRefs, 10)));

    return perAutoPayCost;
  }


  if (document.getElementById('t_conta')) {
    this.username = pr['username'].setValue(document.getElementById('t_conta').textContent);
  }
  else {
    this.username = pr['username'].getValue();
  }

  this.accountType = new function () {
    var accDiv = docEvaluate('//div[@class="tag"][last()]');
    var tmp_accountType;

    // If the accType can be grabbed from the page, cache it
    if (0 < accDiv.snapshotLength) {
      accDiv = accDiv.snapshotItem(0);

      for (var i = 0; i < Neobux.possibleAccTypes.length; i++) {
        if (accDiv.textContent.match(Neobux.possibleAccTypes[i])) {
          tmp_accountType = {
            "numerical": i,
            'verbose': Neobux.possibleAccTypes[i]
          };
          pr['accountType'].setValue(tmp_accountType);
        }
      }
    }

    // If the accountType info was on the page, the stored copy will have been updated
    // (else we'll just be grabbing the cached version)
    tmp_accountType = pr['accountType'].getValue();

    this.numerical = tmp_accountType.numerical;
    this.verbose = tmp_accountType.verbose;

    this.showUltimateFeatures = (6 == tmp_accountType.numerical);
    this.isUltimate = 6 === tmp_accountType.numerical;
    this.isStandard = 0 === tmp_accountType.numerical;

    this.cost = pr['accountTypeCost'].getValue(Neobux.defaultAccountTypeDetails[this.verbose].goldenPackCost);

    return this;
  };

  this.clickValues = getClickValues(this.accountType.verbose);

  console.info('this.clickValues = ',this.clickValues);
  this.ownClickValue = this.clickValues['Fixed'].value;
  this.rentedReferralClickValue = this.clickValues['Fixed'].commission.rented;
  this.directReferralClickValue = this.clickValues['Fixed'].commission.direct;

  this.numberOfRefs = {
    Rented: pr['numberOfRentedReferrals'].getValue(),
    Direct: pr['numberOfDirectReferrals'].getValue()
  };

  this.recycleFee = pr['recycleFee'].getValue(Neobux.defaultAccountTypeDetails[this.accountType.verbose].recycleCost);

  this.autopayFee = getPerAutoPayFee(this.accountType, this.numberOfRefs.Rented);


  this.renewalsLength = pr['renewalsLength'].getValue();
  this.renewalFees = getRenewalFees(this.accountType.verbose, this.numberOfRefs.Rented, this.renewalsLength);

  this.preferences = new function () {
    // this.columnPrefixes = getPref(tmp_prefs[i], defaultSettings['columnPrefixes'], { prefType: 'JSON' });
    // this.numeriseDate = getPref(tmp_prefs[i], defaultSettings['numeriseDate'], { prefType: 'JSON' });
    // this.shortFormatTimer = getPref(tmp_prefs[i], defaultSettings['shortFormatTimer'], { prefType: 'JSON' });
    // this.showColumn = getPref(tmp_prefs[i], defaultSettings['showColumn'], { prefType: 'JSON' });
    // this.shrinkColumnContents = getPref(tmp_prefs[i], defaultSettings['shrinkColumnContents'], { prefType: 'JSON' });
    // this.timePeriods = getPref(tmp_prefs[i], defaultSettings['timePeriods'], { prefType: 'JSON' });

    /**
* Shortcut for above:
*/

      //JSON vars
    var tmp_prefs = ['columnPrefixes', 'numeriseDates', 'shortFormatTimer', 'showColumn', 'shrinkColumnContents', 'timePeriods'];
    for (var i = 0; i < tmp_prefs.length; i++) {
      this[tmp_prefs[i]] = pr[tmp_prefs[i]].getValue(defaultSettings[tmp_prefs[i]], { prefType: 'JSON' });
    }
    //Boolean vars
    this['flag_textify'] = pr['flag_textify'].getValue();
  };
};

modalCheckpoint('function getGraphData()');

function getGraphData() {
  // Decode evalString using the w(i) function from the Neobux page
  function U(arg_a) {
    return arg_a * 10;
  }

  function u0(arg_a) {
    return String.fromCharCode(U(arg_a));
  }

  // function w(_i) {
  function NeobuxDecodeEvalString(arg_input) {
    var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o = "";
    var c1, c2, c3, e1, e2, e3, e4;
    var j = 0;
    arg_input = arg_input.replace(/[^A-Za-z0-9\+\/=]/g, "");
    do {
      e1 = k.indexOf(arg_input.charAt(j++));
      e2 = k.indexOf(arg_input.charAt(j++));
      e3 = k.indexOf(arg_input.charAt(j++));
      e4 = k.indexOf(arg_input.charAt(j++));
      c1 = e1 << 2 | e2 >> 4;
      c2 = (e2 & 15) << 4 | e3 >> 2;
      c3 = (e3 & 3) << 6 | e4;
      o = o + u0(c1 / 10);
      if (64 != e3) {
        o = o + u0(c2 / 10);
      }
      if (64 != e4) {
        o = o + u0(c3 / 10);
      }
    } while (j < arg_input.length);

    return o;
  }


  var xpathResults_graphData = docEvaluate('//script[contains(text(), "eval")]');

  //If not found any graphs, return 'noGraphs'
  if(xpathResults_graphData.snapshotLength === 0) {
    return 'noGraphs';
  }

  //NB: If testing in Firebug, xpathResults_graphData.snapshotLength increases the snapshotLength
  for (var i = 0; i < xpathResults_graphData.snapshotLength; i++) {
    //debugLog(xpathResults_graphData.snapshotItem(i).innerHTML.match(/eval/g).length);
    if (xpathResults_graphData.snapshotItem(i).innerHTML.match(/eval\(w\('/g)) {
      /**
* If only one matching <script> ... </script> tag found, it is the correct one
* Now extract data::
*/

      /**
* First, remove instances of the word 'eval' and then split it up based on
* these rules ::
* eval(w('
* ')); eval(w('
*/
      var evals = xpathResults_graphData.snapshotItem(i).text.replace(/[ ]?eval\(w\('/g, '').split("'));");
    }
  }

  var graphData = new Array();

  // Cycle through each individual eval (ie, graph / graphNumber)
  for (var graphNumber = 0, length = evals.length - 1; graphNumber < length; graphNumber++) {
    // logger('graphNumber = '+graphNumber);
    var evalString = evals[graphNumber];

    // Decode evalString using the w(i) function from the Neobux page
    var decodedEvalString = NeobuxDecodeEvalString(evalString);
    eval(decodedEvalString.replace(');', ']').replace('mk_ch(', 'graphData[' + graphNumber + '] = ['));
  }

  return graphData;
}

//NB: calling this on pages that do not have graphs will cause an error in the script
//console.info(getGraphData());
modalCheckpoint('function createAccountCache()');

function createAccountCache() {
  var tmp_currentDateTime = new Date();
  var tmp_currentDate = tmp_currentDateTime.getFullYear() + '/' + padZeros(tmp_currentDateTime.getMonth() + 1, 2) + '/' + padZeros(tmp_currentDateTime.getDate(), 2);

  var tmp_blankAccountCache = {};
  tmp_blankAccountCache.ownClicks = {};
  tmp_blankAccountCache.graphs = {};
  tmp_blankAccountCache.referrals = {};
  tmp_blankAccountCache.user = {};

  tmp_blankAccountCache.ownClicks[tmp_currentDate] = {
    extended: 0,
    regular: 0,
    mini: 0,
    fixed: 0,
    fixedMicro: 0,
    micro: 0
  };

  tmp_blankAccountCache.graphs[tmp_currentDate] = {
    ownClicks_localTime: 0,
    ownClicks_serverTime: 0,
    referralClicks_rented: 0,
    referralClicks_direct: 0,
    recycleFees: 0,
    automaticRecycles: 0,
    extensions: 0,
    autopay: 0,
    transfersToRentalBalance: 0,
    transfersToGoldenPackBalance: 0,
    extensionsDue: 0
  };

  function createBlankReferral() {
    var tmp_blankReferral = {
      referralType: "",
      referralSince: "2001/01/01 00:01",
      lastSeen: 0,
      goldenGraphClickData: {},
      ultimateClickData: {},
      referralListingsData: {}
    };
    tmp_blankReferral.goldenGraphClickData[tmp_currentDate] = {
      creditedClicks: 0,
      actualClicks: 0
    };
    tmp_blankReferral.ultimateClickData[tmp_currentDate] = {
      creditedClicks: 0
    };
    tmp_blankReferral.referralListingsData[tmp_currentDate] = {
      nextPayment: 0,
      lastClick: 0,
      totalClicks: 0,
      average: 0,
      realAverage: 0
    };
    return tmp_blankReferral;
  }

  tmp_blankAccountCache.user.registrationDate = 0;
  tmp_blankAccountCache.user[tmp_currentDate] = {
    totalClicks: 0,
    goldenMembershipExpirationDate: 0,
    goldenPackMembershipExpirationDate: 0,
    numberOfReferrals: {
      Rented: 0,
      Direct: 0
    },
    seenAdvertisementsTotal: {
      user: 0,
      referrals: 0
    },
    account: {
      accountType: 0,
      mainBalance: 0,
      rentalBalance: 0,
      goldenPackBalance: 0,
      received: 0,
      directPurchases: 0,
      exposureClicks: 0,
      NeoPoints: 0
    }
  }

  var storedAccountCache = pr['accountCache'].getValue(tmp_blankAccountCache);
  var tmp_accountCache = {};

  Object_merge(tmp_accountCache, tmp_blankAccountCache);
  Object_merge(tmp_accountCache, storedAccountCache);

  //console.info(tmp_accountCache);
  return tmp_accountCache;
}

var accountCache = createAccountCache();
modalCheckpoint('function convertRawGraphDataToCacheFormat(arg_rawGraphData, arg_accountCache)');

function convertRawGraphDataToCacheFormat(arg_rawGraphData, arg_accountCache) {
  if(arg_rawGraphData === 'noGraphs') {
    throw "function convertRawGraphDataToCacheFormat(arg_rawGraphData, arg_accountCache) {....\n\n ERROR!!\n\n No graphs on current page";
  }

  var tmp_currentGraph = '';
  var tmp_accountCache = arg_accountCache;

  var GRAPH_ID = 0;
  var DATES = 2;
  var DATA = 5;

  // english | pt | es | greek | FI | SE | DE
  var tl8_today = /today|hoje|hoy|S?µe?a|Tänään|Idag|Heute|Aujourd'hui/i;
  var tl8_yesterday = /yesterday|ontem|ayer|??e?|Eilen|Igår|Gestern|Hier/i;
  var tl8_tomorrow = /tomorrow/i;

  var tmp_currentDate = '';

  for (var tmp_graphData in arg_rawGraphData) {
    if (arg_rawGraphData.hasOwnProperty(tmp_graphData)) {
      tmp_currentGraph = arg_rawGraphData[tmp_graphData];
      switch (tmp_currentGraph[0])
      {
        case 'ch_cliques':
          //Number of clicks done personally, that contribute to TOS#3.7 as reported by the graph
          if (1 === tmp_currentGraph[DATA].length) {
            // Only server time clicks are being shown, thus both
            // server time and local time values are identical
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].ownClicks_localTime = tmp_currentGraph[DATA][0].data[i];
              arg_accountCache.graphs[tmp_currentDate].ownClicks_serverTime = tmp_currentGraph[DATA][0].data[i];
            }
          } else if (2 === tmp_currentGraph[DATA].length) {
            // First one is local time
            // Second one is server time
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].ownClicks_localTime = tmp_currentGraph[DATA][0].data[i];
              arg_accountCache.graphs[tmp_currentDate].ownClicks_serverTime = tmp_currentGraph[DATA][1].data[i];
            }
          }
          break;
        case 'ch_cr':
          //Number of rented referrals' clicks credited to you
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].referralClicks_rented = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_cd':
          //Number of direct referrals' clicks credited to you
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].referralClicks_direct = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_recycle':
          //Amount spent on recycling referrals
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].recycleFees = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_trar':
          //Number of referrals recycled automatically for free
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].automaticRecycles = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_extensions':
          //Amount spent on extending (renewing) referrals
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].extensions = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_autopay':
          //Amount spent on autopay
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].autopay = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_trrb':
          //Transfers to rental balance
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].transfersToRentalBalance = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_trpb':
          //Transfers to rental balance
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].transfersToGoldenPackBalance = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
        case 'ch_ext_schedule8':
          //fall-through
        case 'ch_ext_schedule7':
          //fall-through
        case 'ch_ext_schedule6':
          //fall-through
        case 'ch_ext_schedule5':
          //fall-through
        case 'ch_ext_schedule4':
          //fall-through
        case 'ch_ext_schedule3':
          //fall-through
        case 'ch_ext_schedule2':
          //fall-through
        case 'ch_ext_schedule1':
          //Number of referrals due to expire
          if (1 === tmp_currentGraph[DATA].length) {
            for (var i = 0; i < tmp_currentGraph[DATES].length; i++) {
              tmp_currentDate = tmp_currentGraph[DATES][i].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);

              if (!arg_accountCache.graphs[tmp_currentDate]) {
                arg_accountCache.graphs[tmp_currentDate] = {};
              }
              arg_accountCache.graphs[tmp_currentDate].extensionsDue = tmp_currentGraph[DATA][0].data[i];
            }
          }
          break;
      }
    }
  }
  return tmp_accountCache;
}

var chartData = new function () {
    this.dataGrabbedFromCurrentPage = function () {
      // Decode evalString using the w(i) function from the Neobux page
      function U(arg_a) {
        return arg_a * 10;
      }

      function u0(arg_a) {
        return String.fromCharCode(U(arg_a));
      }

      // function w(_i) {
      function NeobuxDecodeEvalString(arg_input) {
        var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var o = "";
        var c1, c2, c3, e1, e2, e3, e4;
        var j = 0;
        arg_input = arg_input.replace(/[^A-Za-z0-9\+\/=]/g, "");
        do {
          e1 = k.indexOf(arg_input.charAt(j++));
          e2 = k.indexOf(arg_input.charAt(j++));
          e3 = k.indexOf(arg_input.charAt(j++));
          e4 = k.indexOf(arg_input.charAt(j++));
          c1 = e1 << 2 | e2 >> 4;
          c2 = (e2 & 15) << 4 | e3 >> 2;
          c3 = (e3 & 3) << 6 | e4;
          o = o + u0(c1 / 10);
          if (64 != e3) {
            o = o + u0(c2 / 10);
          }
          if (64 != e4) {
            o = o + u0(c3 / 10);
          }
        } while (j < arg_input.length);

        return o;
      }

      var xpathResults_graphData = docEvaluate('//script[contains(text(), "eval")]');
      //NB: If testing in Firebug, xpathResults_graphData.snapshotLength increases the snapshotLength
      for (var i = 0; i < xpathResults_graphData.snapshotLength; i++) {
        //debugLog(xpathResults_graphData.snapshotItem(i).innerHTML.match(/eval/g).length);
        if (xpathResults_graphData.snapshotItem(i).innerHTML.match(/eval\(w\('/g)) {
          /**
* If only one matching <script> ... </script> tag found, it is the correct one
* Now extract data::
*/

          /**
* First, remove instances of the word 'eval' and then split it up based on
* these rules ::
* eval(w('
* ')); eval(w('
*/
          var evals = xpathResults_graphData.snapshotItem(i).text.replace(/[ ]?eval\(w\('/g, '').split("'));");
        }
      }

      var graphData = new Array();

      // Cycle through each individual eval (ie, graph / graphNumber)
      for (var graphNumber = 0, length = evals.length - 1; graphNumber < length; graphNumber++) {
        var evalString = evals[graphNumber];

        // Decode evalString using the w(i) function from the Neobux page
        var decodedEvalString = NeobuxDecodeEvalString(evalString);
        eval(decodedEvalString.replace(');', ']').replace('mk_ch(', 'graphData[' + graphNumber + '] = ['));
      }

      return graphData;
    };

    this.getAccountCache = function () {
      var tmp_storedAccountCache = pr['accountCache'].getValue({}, null);
      if (!tmp_storedAccountCache) {
        throw new Error();
      }
      return tmp_storedAccountCache;
    };


    this.reformatGraphData = function () {
      var tmp_graphData = new Array();
      var tmp_graphDataObject = new Object();
      var tmp_currentGraphFriendlyName;
      var currentDataset;
      var tmp_currentDatasetName;
      var tmp_currentDate;

      // english | pt | es | greek | FI | SE | DE
      var tl8_today = /today|hoje|hoy|S?µe?a|Tänään|Idag|Heute|Aujourd'hui/i;
      var tl8_yesterday = /yesterday|ontem|ayer|??e?|Eilen|Igår|Gestern|Hier/i;
      var tl8_tomorrow = /tomorrow/i;

      var tmp_dataGrabbedFromCurrentPage = this.dataGrabbedFromCurrentPage();

      for (var _i in tmp_dataGrabbedFromCurrentPage) {
        tmp_currentGraphFriendlyName = friendlyNameLookup[tmp_dataGrabbedFromCurrentPage[_i][0]];
        tmp_graphData[tmp_currentGraphFriendlyName] = tmp_dataGrabbedFromCurrentPage[_i];

        currentDataset = tmp_graphData[tmp_currentGraphFriendlyName];

        for (var i = 0; i < currentDataset[5].length; i++) {
          tmp_currentDatasetName = currentDataset[5][i].name;
          tmp_graphDataObject[tmp_currentGraphFriendlyName] = tmp_graphDataObject[tmp_currentGraphFriendlyName] || {};
          tmp_graphDataObject[tmp_currentGraphFriendlyName][tmp_currentDatasetName] = tmp_graphDataObject[tmp_currentGraphFriendlyName][tmp_currentDatasetName] || {};

          for (var j = 0; j < currentDataset[2].length; j++) {
            //If the current date isn't represented as a date, assume that it is a localised version of today/yesterday/tomorrow etc and potentially needs translating
            if (!currentDataset[2][j].match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/)) {
              tl8(currentDataset[2][j]);
            }
            tmp_currentDate = currentDataset[2][j].replace(tl8_today, TODAY_STRING).replace(tl8_yesterday, YESTERDAY_STRING).replace(tl8_tomorrow, TOMORROW_STRING);
            tmp_graphDataObject[tmp_currentGraphFriendlyName][tmp_currentDatasetName][tmp_currentDate] = currentDataset[5][i].data[j];
          }
        }
      }

      pr['graphData'].setValue(Object_merge(this.getAccountCache(), tmp_graphDataObject));
      return pr['graphData'].getValue(Object_merge(this.getAccountCache(), tmp_graphDataObject), {
        prefType: 'JSON'
      });
    };


    this.mergeGraphDataOnPageWithStoredData = function () {

    };

    this.init = function () {
      //TODO: Rearrange the logic of this slightly
      this.reformatGraphData();
    }
    };

modalCheckpoint('function insertLocalServerTime()');

function insertLocalServerTime() {

  function formatTime(arg_time) {
    // Append zeros to the _input until the _desiredStringLength is reached
    function padZeros(arg_input, arg_desiredStringLength) {
      var currentLength = arg_input.toString().length;
      var output = arg_input;
      for (var i = 0; i < (arg_desiredStringLength - currentLength); i++) {
        output = '0' + output;
      }
      return output;
    }

    var tmp_Hours = arg_time.getHours();
    var tmp_Minutes = arg_time.getMinutes();
    var tmp_Seconds = arg_time.getSeconds();

    return padZeros(tmp_Hours, 2) + ':' + padZeros(tmp_Minutes, 2); //+ ":" + padZeros(tmp_Seconds, 2);
  }

  var localMidnight;
  var currentLocalTime;
  var currentServerTime;
  var neoMidnight;
  var adResetTime;
  var AdResetTime_hours;

  var locationToInsertTimeString;

  function setTime(arg_dateTime, arg_time) {
    arg_dateTime.setHours(arg_time[0]);
    arg_dateTime.setMinutes(arg_time[1]);
    arg_dateTime.setSeconds(arg_time[2]);

    return arg_dateTime;
  }

  // Calculate and return the server time formatted correctly
  this.GetServerTimeAndOffsetText = function (arg_serverTimeOffset) {
    var offsetMS = arg_serverTimeOffset * 1000 * 60 * 60;

    currentLocalTime = new Date(dateToday);
    currentServerTime = new Date(currentLocalTime.getTime() + offsetMS);


    localMidnight = setTime(new Date(dateToday), [0, 0, 0]);
    pr['localMidnight'].setValue(localMidnight.toString());

/* If server time is five hours behind (-5), Neobux's midnight will be five hours AFTER local midnight
&& vice versa, thus need to minus the offset
NB, the offset might move the day to tomorrow/yesterday so will need to reset the date to 'today' */
    neoMidnight = new Date(new Date(localMidnight).getTime() - offsetMS);
    neoMidnight = new Date(neoMidnight.setDate(localMidnight.getDate()));
    pr['neoMidnight'].setValue(neoMidnight.toString());


    AdResetTime_hours = pr['AdResetTime_hours'].getValue() * 1000 * 60 * 60;
    adResetTime = new Date(new Date(localMidnight).getTime() + AdResetTime_hours);
    adResetTime = new Date(adResetTime.setDate(localMidnight.getDate()));
    pr['adResetTime'].setValue(adResetTime.toString());


    var timeOffset_text = '';
    if (0 < arg_serverTimeOffset) {
      timeOffset_text = '+' + parseFloat(arg_serverTimeOffset.toFixed(2));
    } else if (0 > arg_serverTimeOffset) {
      timeOffset_text = parseFloat(arg_serverTimeOffset.toFixed(2));
    } else {
      timeOffset_text = '+-' + arg_serverTimeOffset;
    }

    // Return the time in the format HH:MM(:SS optional)
    return formatTime(currentServerTime) + ' (' + timeOffset_text + 'hrs)';

  };

  // Calculate and return the size of the time difference/offset
  this.FetchAndSetTimeOffset = function () {
    // Hunt for the current server time string
    var locationOfTimeString = docEvaluate('//td[@class="f_r"]/span');
    for (var tmp_i = 0; tmp_i < locationOfTimeString.snapshotLength; tmp_i++) {

      // var dateTimeString = '2009/06/07 20:46'; (assuming format yyyy/mm/dd hh:dd )
      var dateTimeString = locationOfTimeString.snapshotItem(tmp_i).textContent.match(/([\d]{4})\/([\d]{2})\/([\d]{2}) ([\d]{2}):([\d]{2})/) || -1;

      if (0 < dateTimeString.length) {
        // NB: parseInt("08") == 0 so must definition of base 10 required
        // CST = Current Server Time
        var tmp_CST = {
          year: parseInt(dateTimeString[1], 10),
          month: parseInt(dateTimeString[2], 10),
          day: parseInt(dateTimeString[3], 10),

          hour: parseInt(dateTimeString[4], 10),
          minute: parseInt(dateTimeString[5], 10)
        };

        var ServerDateTime = new Date(dateToday);
        ServerDateTime.setFullYear(tmp_CST.year, (tmp_CST.month - 1), tmp_CST.day);
        ServerDateTime.setHours(tmp_CST.hour, tmp_CST.minute);

        var ServerTime = ServerDateTime.getTime();
        var LocalTime = dateToday.getTime();
        var one_hour = 1000 * 60 * 60;

        var serverTimeDifference = (ServerTime - LocalTime) / (one_hour);
        serverTimeDifference = Math.floor(serverTimeDifference * 1000) / 1000;

        pr['serverTimeOffset'].setValue(serverTimeDifference);


        var adResetTimeString = locationOfTimeString.snapshotItem(0).textContent;
        adResetTimeString = adResetTimeString.match(/([\d]{2}):([\d]{2})/);

        // ART = Ad Reset Time
        var tmp_ART = {
          hour: parseInt(adResetTimeString[1], 10),
          minute: parseInt(adResetTimeString[2], 10)
        };

        var AdResetTimeDifference = (tmp_ART.hour + (tmp_ART.minute / 60));
        pr['AdResetTime_hours'].setValue(AdResetTimeDifference);

        break;
      }

    }
  };

  this.GetServerTimeOffset = function () {
    /**
* Check whether the page being loaded is the 'View Advertisements' page
* If it is, call this.GetServerTimeOffset() to calculate & store the offset amount [if auto-detecting the offset is enabled]
*/

    // Check whether current page is the "View Advertisements" page
    var CurrentUrl = document.location.href;

    var RegExp_AdPage = /^http[s]?:\/\/www\.neobux\.com\/m\/v\//;
    var IsMatch = RegExp_AdPage.test(CurrentUrl);

    // If it is the ads page AND the script should automatically detect the offset,
    if (IsMatch && pr['AutoDetectTimeOffset'].getValue()) {
      this.FetchAndSetTimeOffset();
    }

    return pr['serverTimeOffset'].getValue();
  };

  this.insertClock = function (arg_timeOffset, arg_adResetOffset) {
    locationToInsertTimeString = document.querySelectorAll('img#logo')[0].parentNode.parentNode;
    if (locationToInsertTimeString) {
      var localTime = formatTime(dateToday);
      var serverTime = (0 <= this.GetServerTimeOffset() || 0 >= this.GetServerTimeOffset()) ? this.GetServerTimeAndOffsetText(this.GetServerTimeOffset()) : 'You must "View Advertisements" for this to show correctly.';

      if (document.getElementById('containerDiv_timer')) {
        //document.getElementById('containerDiv_timer').innerHTML = containerDiv_timer.innerHTML;
      } else {
        locationToInsertTimeString.innerHTML = '<div id="localServerTimeText" style="font-family:mono, monospace; font-size:x-small; margin-bottom:-15px; padding-top:0.7em;">&nbsp; Local time: ' + localTime + ' -- Server time: ' + serverTime + '</div>' + locationToInsertTimeString.innerHTML;
        locationToInsertTimeString.setAttribute('valign', '');
      }

      var containerDiv_timer = document.createElement('div');
      containerDiv_timer.innerHTML = '<div style="width: 750px; height: 450px; display:none; position:absolute; top:100px; left:100px;" id="containerDiv_timer"></div>';

      // Used mostly during testing - if the container div is already present update it rather than add another
      if (document.getElementById('containerDiv_timer')) {
        document.getElementById('containerDiv_timer').innerHTML = containerDiv_timer.innerHTML;
      } else {
        document.body.appendChild(containerDiv_timer);
      }
    }
  };

  this.insertClickGuide = function () {
    if (!adResetTime) {
      return;
    }

    var localMidnightToAdResetTime = (adResetTime - localMidnight) / (1000 * 60 * 60);
    var localMidnightToNeobuxMidnight = (neoMidnight - localMidnight) / (1000 * 60 * 60);

    var _timePeriods = [];
    var localMidnightToFirstEvent;
    var FirstEventToSecondEvent;
    var SecondEventToLocalMidnight;
    var FirstTP;
    var SecondTP;
    var ThirdTP;

/*
* Test the a = (local midnight to ad reset) time & b = (local midnight to neobux midnight) time
* If a < b, the order is 1) local midnight 2) neobux midnight 3) ad resets
* If a > b, the order is 1) local midnight 2) ad resets 3) neobux midnight
* If a == b, the ads reset at the same time as the neobux midnight ticks over,
* .. and the order is 1) local midnight 2) ad reset+neobux midnight

* Based on this logic, decide which order to display the 'chunks' of the clock
*/

    var tmp_displayOrder;
    if(localMidnightToAdResetTime < localMidnightToNeobuxMidnight) { tmp_displayOrder = 1; }
    if(localMidnightToAdResetTime > localMidnightToNeobuxMidnight) { tmp_displayOrder = 2; }
    if(localMidnightToAdResetTime == localMidnightToNeobuxMidnight) { tmp_displayOrder = 3; }

    switch (tmp_displayOrder)
    {
      case 1:
        // debugLog('localMidnightToAdResetTime < localMidnightToNeobuxMidnight');
        localMidnightToFirstEvent = localMidnightToAdResetTime;
        FirstEventToSecondEvent = localMidnightToNeobuxMidnight - localMidnightToAdResetTime;
        SecondEventToLocalMidnight = 24 - (localMidnightToFirstEvent + FirstEventToSecondEvent);

        FirstTP = 'Local Midnight to Ad Reset Time';
        SecondTP = 'Ad Reset Time to Neobux Midnight';
        ThirdTP = 'Neobux Midnight to Local Midnight';

        _timePeriods.push({
          name: FirstTP,
          y: localMidnightToFirstEvent,
          color: '#AA4643'
        });
        _timePeriods.push({
          name: SecondTP,
          y: FirstEventToSecondEvent,
          color: '#4572A7'
        });
        _timePeriods.push({
          name: ThirdTP,
          y: SecondEventToLocalMidnight,
          color: '#AA4643'
        });

        break;
      case 2:

        // debugLog('localMidnightToAdResetTime > localMidnightToNeobuxMidnight');
        localMidnightToFirstEvent = localMidnightToNeobuxMidnight;
        FirstEventToSecondEvent = localMidnightToAdResetTime - localMidnightToNeobuxMidnight;
        SecondEventToLocalMidnight = 24 - (localMidnightToFirstEvent + FirstEventToSecondEvent);

        FirstTP = 'Local Midnight to Neobux Midnight';
        SecondTP = 'Neobux Midnight to Ad Reset Time';
        ThirdTP = 'Ad Reset Time to Local Midnight';

        _timePeriods.push({
          name: FirstTP,
          y: localMidnightToFirstEvent,
          color: '#AA4643'
        });
        _timePeriods.push({
          name: SecondTP,
          y: FirstEventToSecondEvent,
          color: '#4572A7'
        });
        _timePeriods.push({
          name: ThirdTP,
          y: SecondEventToLocalMidnight,
          color: '#AA4643'
        });

        break;
      case 3:

        // debugLog('localMidnightToAdResetTime == localMidnightToNeobuxMidnight');
        localMidnightToFirstEvent = localMidnightToAdResetTime;
        FirstEventToSecondEvent = 24 - (localMidnightToFirstEvent);

        FirstTP = 'Local Midnight to Neobux Midnight And Ad Reset Time';
        SecondTP = 'Neobux Midnight And Ad Reset Time to Local Midnight';

        _timePeriods.push({
          name: FirstTP,
          y: localMidnightToFirstEvent,
          color: '#AA4643'
        });
        _timePeriods.push({
          name: SecondTP,
          y: FirstEventToSecondEvent,
          color: '#4572A7'
        });

        break;

    }

    // debugLog(_timePeriods);
    location.href = "javascript:(" +
    function (_timePeriods, adResetTime, neoMidnight, localMidnight) {

      // Append zeros to the _input until the _desiredStringLength is reached
      function padZeros(arg_input, arg_desiredStringLength) {
        var currentLength = arg_input.toString().length;
        var output = arg_input;
        for (var i = 0; i < (arg_desiredStringLength - currentLength); i++) {
          output = '0' + output;
        }
        return output;
      }

      if ('undefined' === typeof Highcharts) {
        //move container off screen to stop a transparent div blocking clicks on rest of page
        //Also colour it so that if it does cause a problem, it isn't invisible
        //todo: add the event handler before this javascript is called and then remove it here if the timer chart cannot show
        document.getElementById('containerDiv_timer').style.left = '-1000px';
        document.getElementById('containerDiv_timer').style.backgroundColor = 'black';
        debugLog("Cannot show the clicking guide graph because graphs are unavailable on this page. Try the account summary page or referral statistics page.");
      } else {
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'containerDiv_timer',
            margin: [20, 20, 80, 20],
            backgroundColor: '#eeeeee'
          },
          title: {
            text: ''
          },
          plotArea: {
            shadow: null,
            borderWidth: null,
            backgroundColor: null
          },
          tooltip: {
            formatter: function () {
              var _from = padZeros(localMidnight.getHours(), 2) + ':' + padZeros(localMidnight.getMinutes(), 2);
              localMidnight = new Date(localMidnight.setHours(localMidnight.getHours() + Math.floor(this.y), localMidnight.getMinutes() + ((this.y - Math.floor(this.y)) * 60)));
              var _to = padZeros(localMidnight.getHours(), 2) + ':' + padZeros(localMidnight.getMinutes(), 2);

              return '<b>' + this.point.name + '</b>: ' + (Math.floor(this.y * 100) / 100) + 'hours == From: ' + _from + ' To: ' + _to;
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  if (0 === this.x) {
                    localMidnight.setHours(0, 0, 0);
                  }
                  var _from = padZeros(localMidnight.getHours(), 2) + ':' + padZeros(localMidnight.getMinutes(), 2);
                  localMidnight = new Date(localMidnight.setHours(localMidnight.getHours() + Math.floor(this.y), localMidnight.getMinutes() + ((this.y - Math.floor(this.y)) * 60)));
                  var _to = padZeros(localMidnight.getHours(), 2) + ':' + padZeros(localMidnight.getMinutes(), 2);

                  return _from + '-' + _to;
                }
              }
            }
          },
          legend: {
            layout: 'vertical'
          },
          series: [{
            type: 'pie',
            name: 'Time periods',
            data: _timePeriods
          }]
        });

      }
    } + ")(" +
        "JSON.parse('" + JSON.stringify(_timePeriods) + "')," +
        "new Date('" + adResetTime.toString() + "')," +
        "new Date('" + neoMidnight.toString() + "')," +
        "new Date('" + localMidnight.toString() + "')," +
        ")";

    document.getElementById('localServerTimeText').addEventListener('click', function localServerTime_onClick() {
      document.getElementById('containerDiv_timer').style.display = ('none' == document.getElementById('containerDiv_timer').style.display) ? '' : 'none';
    }, false);

  };

  //If the image logo cannot be found, either find an alternate place to insert it
  // or abort insertion.
  if (0 >= document.querySelectorAll('img#logo').length) {
    return;
  }

  this.insertClock(this.GetServerTimeOffset(), pr['AdResetTime_hours'].getValue());
  this.insertClickGuide();
}

modalCheckpoint('for (var graphId in friendlyNameLookup)');

var graphsOnCurrentPage = [];
for (var graphId in friendlyNameLookup) {
  graphsOnCurrentPage.push(graphId);
}


// Used for detection on pages
var langStrings_Neo = {
  'US': {
    'Yesterday': 'Yesterday',
    'Today': 'Today',
    'No clicks yet': 'No clicks yet'
  }
};

// Used for output from the script
var langStrings = {
  'en-GB': {
    'N/A': 'N/A'
  }
};

// tl = Translate to Local
function tl(arg_langString) {
  var tmp_langCode = 'en-GB';
  if (langStrings) {
    if (langStrings[tmp_langCode]) {
      if (langStrings[tmp_langCode][arg_langString]) {
        return langStrings[tmp_langCode][arg_langString];
      } else {
        errorLog('Error! tl(arg_langString)\nLanguage string not found amongst translated strings for ' + tmp_langCode + '. Returning the submitted arg_langString: ' + arg_langString);
        return arg_langString;
      }
    } else {
      errorLog('Error! tl(arg_langString)\nLanguage set not found amongst translations. Returning the submitted arg_langString: ' + arg_langString);
      return arg_langString;
    }
  } else {
    errorLog('Error! tl(arg_langString)\nTranslations object not found. Returning the submitted arg_langString: ' + arg_langString);
    return arg_langString;
  }
}

// ntl = Neobux TransLate to Local
function ntl(arg_langString) {
  var tmp_langCode = document.querySelectorAll('.c0')[0].getAttribute('class').match(/f-([a-z]{2})/)[1].toUpperCase();

  if (langStrings_Neo) {
    if (langStrings_Neo[tmp_langCode]) {
      if (langStrings_Neo[tmp_langCode][arg_langString]) {
        return langStrings_Neo[tmp_langCode][arg_langString];
      } else {
        errorLog('Error! ntl(arg_langString)\nLanguage string not found amongst translated strings for ' + tmp_langCode + '. Returning the submitted arg_langString: ' + arg_langString);
        return arg_langString;
      }
    } else {
      errorLog('Error! ntl(arg_langString)\nLanguage set not found amongst translations. Returning the submitted arg_langString: ' + arg_langString);
      return arg_langString;
    }
  } else {
    errorLog('Error! ntl(arg_langString)\nTranslations object not found. Returning the submitted arg_langString: ' + arg_langString);
    return arg_langString;
  }
}

//
function REFERRAL(arg_refId, arg_referralProperties) {
  // console.info('arg_refId = ', arg_refId);
  var tmp_currentDateString = dates_array[0];

  function createBlankReferral() {
    var tmp_blankReferral = {
      referralType: "U",
      lastSeen: 0,
      referralListingsData: {}
    };

    if ('standard' !== currentUser.accountType.verbose.toLowerCase()) {
      tmp_blankReferral.goldenGraphClickData = {};
      tmp_blankReferral.goldenGraphClickData[tmp_currentDateString] = {
        creditedClicks: 0,
        actualClicks: 0
      };
    }
    if ('ultimate' === currentUser.accountType.verbose.toLowerCase()) {
      tmp_blankReferral.ultimateClickData = {};
      tmp_blankReferral.ultimateClickData[tmp_currentDateString] = {
        creditedClicks: 0
      };
    }
    tmp_blankReferral.referralListingsData[tmp_currentDateString] = {
      nextPayment: 0,
      lastClick: 0,
      totalClicks: 0,
      average: 0,
      realAverage: 0
    };
    return tmp_blankReferral;
  }

  var tmp_CurrentReferral = new createBlankReferral();
  tmp_CurrentReferral.referralListingsData = tmp_CurrentReferral.referralListingsData || {};
  tmp_CurrentReferral.referralListingsData[tmp_currentDateString] = tmp_CurrentReferral.referralListingsData[tmp_currentDateString] || {};

  tmp_CurrentReferral.lastSeen = dateToday.toString();

  var tmp_crToday = tmp_CurrentReferral.referralListingsData[tmp_currentDateString];

  //arg_referralSince, arg_lastClick, arg_totalClicks, arg_average, arg_flagColourId
  tmp_CurrentReferral.refId = arg_refId;
  tmp_CurrentReferral.referralType = arg_referralProperties['referralType'] || 'U';
  tmp_crToday.referralSince_raw = arg_referralProperties['referralSince'] || null;
  tmp_crToday.lastClick_raw = arg_referralProperties['lastClick'] || null;
  tmp_crToday.totalClicks = (0 <= arg_referralProperties['totalClicks']) ? arg_referralProperties['totalClicks'] : null;
  tmp_crToday.clickAverage = (-1 <= arg_referralProperties['clickAverage']) ? arg_referralProperties['clickAverage'] : null;

  // If the given clickAverage is -1, the user hasn't clicked yet, but set it to 0 anyway
  tmp_crToday.clickAverage = (-1 === tmp_crToday.clickAverage) ? 0 : tmp_crToday.clickAverage;

  //Ultimate mini click graph values
  tmp_crToday.ultimateClickValues_raw = ('undefined' !== typeof arg_referralProperties['ultimateClickValues']) ? arg_referralProperties['ultimateClickValues'] : null;

  // console.info("arg_referralProperties = ", arg_referralProperties);
  // console.info("arg_referralProperties['referralType'] = ", arg_referralProperties['referralType']);
  if ('R' === arg_referralProperties['referralType']) {
    //Rented referral properties
    tmp_crToday.flagColour_Id = (0 <= arg_referralProperties['flagColour_Id']) ? arg_referralProperties['flagColour_Id'] : null;
    tmp_crToday.locked = (0 <= arg_referralProperties['locked']) ? !! arg_referralProperties['locked'] : null;
    tmp_crToday.recycleable = (0 <= arg_referralProperties['recycleable']) ? arg_referralProperties['recycleable'] : null;
    tmp_crToday.nextPayment_raw = arg_referralProperties['nextPayment'] || null;
  }
  if ('D' === arg_referralProperties['referralType']) {
    //Direct referral properties
    tmp_crToday.referralType = "D";
    tmp_crToday.cameFrom = arg_referralProperties['cameFrom'] || null;
    tmp_crToday.isSellable = arg_referralProperties['isSellable'] || null;
  }


  // english | pt | es | greek | FI | SE | DE
  var tl8_today = /today|hoje|hoy|S?µe?a|Tänään|Idag|Heute|Aujourd'hui/i;
  var tl8_yesterday = /yesterday|ontem|ayer|??e?|Eilen|Igår|Gestern|Hier/i;
  var tl8_tomorrow = /tomorrow/i;


  function flagIdToColour(arg_flagId) {
    if (arg_flagId === null) {
      return null;
    }
    var flagLookup = {
      0: 'White',
      1: 'Red',
      2: 'Orange',
      3: 'Yellow',
      4: 'Green',
      5: 'Blue'
    };

    if ("undefined" === typeof tl8) {
      return "Unknown_no_tl8";
    }
    return tl8(flagLookup[arg_flagId] || "Unknown");
  }

  function referralSinceToDateObject(arg_referralSinceString) {
    if (arg_referralSinceString === null) {
      return null;
    }
    //'2011/04/25 11:20'
    var tmp_breakdown = arg_referralSinceString.replace(tl8_today, dates_array[0]).replace(tl8_yesterday, dates_array[1]).match(/([0-9]+)\/([0-9]+)\/([0-9]+) ([0-9]+):([0-9]+)/);
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    // NB:: month is zero-indexed thus needs to be reduced by 1
    return new Date(tmp_breakdown[1], tmp_breakdown[2] - 1, tmp_breakdown[3], tmp_breakdown[4], tmp_breakdown[5], 0, 0);
  }

  function lastClickToDateObject(arg_lastClickString) {
    if (arg_lastClickString === null) {
      return null;
    }
    //'Today' or 'Yesterday' or '2011/04/25'
    var tmp_lastClickBreakdown_regex = /([0-9]+)\/([0-9]+)\/([0-9]+)/
    var tmp_breakdown = arg_lastClickString.replace(tl8_today, dates_array[0]).replace(tl8_yesterday, dates_array[1]).match(tmp_lastClickBreakdown_regex);
    // console.info('lastClickToDateObject - arg_lastClickString: ', arg_lastClickString);
    // console.info('lastClickToDateObject - tmp_breakdown: ', tmp_breakdown);
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    // NB:: month is zero-indexed thus needs to be reduced by 1
    return new Date(tmp_breakdown[1], tmp_breakdown[2] - 1, tmp_breakdown[3], 0, 0, 0, 0);
  }


  function nextPaymentToDateObject(arg_nextPaymentString) {
    if (arg_nextPaymentString === null) {
      return null;
    }
    //'171 days and 20:47'
    // NB: .+ is greedy and tries to include any digits in the hours difference, hence whitespace either side
    var tmp_breakdown = arg_nextPaymentString.match(/([0-9]+) .+ ([+-]?[0-9]+):([0-9]+)/);

    var tmp_nextPaymentDifference = (tmp_breakdown[1] * 24 * 60 * 60 * 1000) + //days to milliseconds
    (tmp_breakdown[2] * 60 * 60 * 1000) + //hours to milliseconds
    (tmp_breakdown[3] * 60 * 1000); // minutes to milliseconds
    //Convert the time/date difference to milliseconds, then sum it with the numerical version (hence -0,
    // though any forcing of now to be numerical will work) of the current date/time and convert back to a date
    var tmp_nextPaymentDate = new Date(dateToday - 0 + tmp_nextPaymentDifference);

    return tmp_nextPaymentDate;
  }

  function calculateRealAverage(arg_referralSince, arg_totalClicks) {
    if (arg_referralSince === null) {
      return null;
    }
    var tmp_timeOwned_days = (dateToday - arg_referralSince) / (1000 * 60 * 60 * 24); //Number of days owned
    return (arg_totalClicks / tmp_timeOwned_days).toFixed(5) * 1;
  }


  function dateToDHMObject(arg_date) {
    if (arg_date === null) {
      return null;
    }
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var now = new Date();
    var t_diff = new Date(arg_date) - now;

    var future = (0 < t_diff);
    var remaining_time = (0 < t_diff) ? t_diff : t_diff * -1;

    var diff_days = Math.floor(remaining_time / oneDay);
    remaining_time -= diff_days * oneDay;

    var diff_hours = Math.floor(remaining_time / oneHour);
    remaining_time -= diff_hours * oneHour;

    var diff_mins = Math.floor(remaining_time / oneMinute);
    remaining_time -= diff_mins * oneMinute;

    var diff_secs = Math.floor(remaining_time / oneSecond);
    remaining_time -= diff_secs * oneSecond;

    // debugLog('diff_secs: ', diff_secs, '\nremaining_time: ', remaining_time);
    return {
      days: diff_days,
      hours: diff_hours,
      mins: diff_mins,
      secs: diff_secs
    };
  }

  function dateToDHM(arg_prefix, arg_date, arg_suffix) {
    if (arg_date === null) {
      return null;
    }
    var tmp_dhmObject = dateToDHMObject(this.referralSince);

    return arg_prefix + tmp_dhmObject.days + 'd' + ', ' + tmp_dhmObject.hours + 'h' + ', ' + tmp_dhmObject.mins + 'm' + arg_suffix;
  }

  function dateToDec(arg_prefix, arg_date, arg_suffix) {
    if (arg_date === null) {
      return null;
    }
    var tmp_dhmObject = dateToDHMObject(arg_date);
    var tmp_age = tmp_dhmObject.days;
    tmp_age += tmp_dhmObject.hours / 24;
    tmp_age += tmp_dhmObject.mins / (24 * 60);

    return arg_prefix + tmp_age + arg_suffix;
  }

  function dateToD(arg_date) {
    if (arg_date === null) {
      return null;
    }
    return dateToDHMObject(this.referralSince).days;
  }


  function ultimateClickValuesRaw_toStats(arg_ultimateClickValues_raw) {
    debugLog('arg_ultimateClickValues_raw = ',arg_ultimateClickValues_raw);
    if (arg_ultimateClickValues_raw === null) {
      return null;
    }
    if(arg_ultimateClickValues_raw === undefined) {
      throw "Error! (arg_ultimateClickValues_raw === undefined){}";
    }
    
    var minigraph = {
      'rawClickData': arg_ultimateClickValues_raw,
      'clicks': new Array()
    };

    // NB: If the user account isn't actually ultimate, but is viewing / testing ultimate features, fill in substitute data
    minigraph.rawClickData = currentUser.accountType.isUltimate ? minigraph.rawClickData : [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

    // Now reverse the order of the array so that the most recent days are first ([0] == today, [1] == yesterday)
    minigraph.rawClickData = minigraph.rawClickData.reverse();

    // Copy the click data to a separate array and verify/coerce each value to a number
    for (var i = 0; i < minigraph.rawClickData.length; i++) {
      minigraph.clicks[i] = parseInt(minigraph.rawClickData[i], 10);
    }

    /**
* Compute the mean and variance using a "numerically stable algorithm".
* Based on http://maiaco.com/articles/computingStatsInJS.php
* 30/12/2010 - above link no longer exists, mirror found at
* http://code.google.com/p/ocropodium/source/browse/static/js/stats.js?spec=svnd8375a8cd3f640b35cbbb42d9669411dde9248eb&r=d8375a8cd3f640b35cbbb42d9669411dde9248eb
*
* Also temporarily copied in below:
*/

    var sqsum = 0;
    minigraph.mean = new Array();
    minigraph.sum = new Array();
    minigraph.variance = new Array();
    minigraph.sdev = new Array();

    minigraph.mean[0] = minigraph.clicks[0];
    minigraph.sum[0] = minigraph.clicks[0];
    minigraph.variance[0] = minigraph.clicks[0];
    minigraph.sdev[0] = minigraph.clicks[0];

    for (var i = 1; i < minigraph.clicks.length; ++i) {
      var x = minigraph.clicks[i];
      var delta = x - minigraph.mean[i - 1];
      var sweep = i + 1.0;
      minigraph.mean[i] = minigraph.mean[i - 1] + (delta / sweep);
      sqsum += delta * delta * (i / sweep);

      minigraph.sum[i] = minigraph.mean[i] * (i + 1);
      minigraph.variance[i] = sqsum / (i + 1);
      minigraph.sdev[i] = Math.sqrt(minigraph.variance[i]);
    }

    return minigraph;
  }
  if ('R' === arg_referralProperties['referralType']) {
    tmp_crToday.nextPayment = nextPaymentToDateObject(tmp_crToday.nextPayment_raw).toString();
    tmp_crToday.flagColour = flagIdToColour(tmp_crToday.flagColour_Id);
  }
  tmp_crToday.referralSince = referralSinceToDateObject(tmp_crToday.referralSince_raw).toString();
  tmp_crToday.lastClick = lastClickToDateObject(tmp_crToday.lastClick_raw).toString();
  tmp_crToday.realAverage = calculateRealAverage(tmp_crToday.referralSince, tmp_crToday.totalClicks);
  tmp_crToday.age_DHMObject = dateToDHMObject(tmp_crToday.referralSince);
  tmp_crToday.age_dec = dateToDec('', tmp_crToday.referralSince, '') * 1;

  if ('ultimate' === currentUser.accountType.verbose.toLowerCase()) {
    try {
      tmp_crToday.ultimateClickStats = ultimateClickValuesRaw_toStats(tmp_CurrentReferral.ultimateClickValues_raw);

      for (var i = 0; i < tmp_crToday.ultimateClickStats.clicks.length; i++) {
        tmp_CurrentReferral.ultimateClickData = tmp_CurrentReferral.ultimateClickData || {};
        tmp_CurrentReferral.ultimateClickData[dates_array[i]] = tmp_CurrentReferral.ultimateClickData[dates_array[i]] || {};
        tmp_CurrentReferral.ultimateClickData[dates_array[i]].creditedClicks = tmp_crToday.ultimateClickStats.clicks[i];
      }
    }
    catch(e) {
      GM_log("Error! Something went wrong with the ultimate click stats");
      console.info("Error! Something went wrong with the ultimate click stats");
      debugLog('e', e);
    }
  }

  Object_merge(tmp_CurrentReferral.referralListingsData[tmp_currentDateString], tmp_crToday)
  return tmp_CurrentReferral;
}

modalCheckpoint('var referralListings = new function () ');

var referralListings = new function () {
    function extractReferralDataFromListingsPage() {
      // Grab contents of mtx[] array delivered onto the referral listings page
      var xpathResults_mtx = docEvaluate("//script[contains(.,'mtx=')]");

      if (0 === xpathResults_mtx.snapshotLength) {
        console.info('referrals data not found');
        // throw 'referrals data not found';
        return -1;
      }

      xpathResults_mtx = xpathResults_mtx.snapshotItem(0).textContent;
      var tmp_refData = xpathResults_mtx.match(/mtx=\[(.*?),\];/)[1];

      // Insert this into a JSON
      var tmpObj_currentPageRefData = JSON.parse('{"mtx": [' + tmp_refData.replace(/'/g, '"') + ']}') || -1;


      if (-1 === tmpObj_currentPageRefData) {
        // The data extracted couldn't be parsed into a valid JSON string / object so 'return' out of the function
        errorLog('There was an error extracting the referral listings data.');
        return -1;
      }

      return tmpObj_currentPageRefData;
    }

    function restructureData(arg_referralListingsData) {
      // Data pushed by Neobux is in the following format:
      /**
* m = mtx[i]
*
* m[0] = Row # as shown in the first column
* m[1] = Real name for referral / else 0
* m[2] = Came From (direct) / Referral Since (rented) { (currentRefMTX[2] == '9') ? referrals[z - 1].referralSince : currentRefMTX[2] }
* m[3] = Next Payment (rented) / Referral Since (direct) { (currentRefMTX[2] == '9') ? referrals[z - 1].referralSince : currentRefMTX[2] }
* m[4] = Last Click Date { (currentRefMTX[4] == '9') ? referrals[z - 1].lastClick : (currentRefMTX[4] == 'N') ? 'No clicks yet' : (currentRefMTX[4] == 'O') ? 'Yesterday' : (currentRefMTX[4] == 'H') ? 'Today' : currentRefMTX[4] }
* m[5] = Total Clicks
* m[6] = Overall Average { (currentRefMTX[6] == '-.---' || currentRefMTX[6] == 999) ? '-.---' : currentRefMTX[6] }
* m[7] = Some kind of long ID # / hash / something
* m[8] = Unknown exact purpose 0/1 value used within much of the HTML attributes / function parameters
* m[9] = Value of the checkbox
* m[10] = When colouring by average is disabled, should background be gray (1) or white (0)
* m[11] = *unused
* m[12] = *unused
* m[13] = Can golden graph button be displayed
* m[14] = Minigraph click data (Ultimates only)
* m[15] = Flag id (rented refs only)
* m[16] = Can referral be recycled
* m[17] = Is referral locked (rented refs only)
* m[18] = Can referral be sold (direct refs only)
* m[19] = Anonymous referral ID (is numerical - prefix of R or D is added on for display only)
*
*/

      // Will convert to the following structure:
      /*
*
* referrals = {
* refID: {
* referralType: [ rented | direct ],
* lastSeen: < dateTime >,
* data: {
* <dateTime> : {
* flag: < flag colour >,
* referralSince: < dateTime >,
* lastClick: < date >,
* totalClicks: < number >,
* overallAverage: < decimal >
* },
* <dateTime> : {
* flag: < flag colour >,
* referralSince: < dateTime >,
* lastClick: < date >,
* totalClicks: < number >,
* overallAverage: < decimal >
* }
* }
* },
* // more refs
* };
*
*/

      // NB: How often a new dateTime is created vs. an existing one is updated will need a setting
      // Meanwhile, will create a new one on every page load / running of the script
      var tmp_referrals = {};
      var tmp_currentDateTime = new Date();
      var cr, pr;
      var cr_ID, pr_ID;

      for (var i = 0; i < arg_referralListingsData.length; i++) {

        // Current Referral
        cr = arg_referralListingsData[i];
        cr_ID = ('0' == cr[1]) ? cr[19] : cr[1];
        // Previous Referral
        pr = arg_referralListingsData[i - 1] || arg_referralListingsData[i];
        pr_ID = ('0' == pr[1]) ? pr[19] : pr[1];

        var tmp_objectToPass = {
          lastClick: ('9' == cr[4]) ? tmp_referrals[pr_ID].referralListingsData[dates_array[0]].lastClick_raw : ('N' == cr[4]) ? (('9' == cr[2]) ? tmp_referrals[pr_ID].referralListingsData[dates_array[0]].referralSince_raw : cr[2]) : ('O' == cr[4]) ? dates_array[1] : ('H' == cr[4]) ? dates_array[0] : cr[4],
          totalClicks: cr[5],
          clickAverage: (cr[6] == '-.---' || cr[6] == 999) ? -1 : cr[6]
        };
        if ('ultimate' === currentUser.accountType.verbose.toLowerCase()) {
          tmp_objectToPass.ultimateClickValues = ('0' == cr[14]) ? '0000000000' : cr[14];
        }

        if (currentPage.pageCode.match(/referralListings_Rented/)) {
          tmp_objectToPass.referralType = "R";
          tmp_objectToPass.recycleable = cr[16];
          tmp_objectToPass.referralSince = ('9' == cr[2]) ? tmp_referrals[pr_ID].referralListingsData[dates_array[0]].referralSince_raw : cr[2];
          tmp_objectToPass.nextPayment = ('9' == cr[3]) ? tmp_referrals[pr_ID].referralListingsData[dates_array[0]].nextPayment_raw : cr[3];
          tmp_objectToPass.flagColour_Id = cr[15];
        } else if (currentPage.pageCode.match(/referralListings_Direct/)) {
          tmp_objectToPass.referralType = "D";
          tmp_objectToPass.referralSince = ('9' == cr[3]) ? tmp_referrals[pr_ID].referralListingsData[dates_array[0]].referralSince_raw : cr[3];
          tmp_objectToPass.cameFrom = cr[2];
          tmp_objectToPass.isSellable = cr[18];
          tmp_objectToPass.locked = cr[17];
        } else {
          //Unknown referral type so stop else risk corrupting stored stuff..
          break;
        }

        tmp_referrals[cr_ID] = new REFERRAL(
        cr_ID, tmp_objectToPass);
      }

      // debugLog('restructureData:\n\n', 'tmp_referrals', tmp_referrals);
      return tmp_referrals;
    }


    this.init = function () {
      var storedReferralData = pr['referrals'].getValue();
      var referralData;

      var tmp_referralDataFromListingsPage = {
        mtx: ''
      };
      tmp_referralDataFromListingsPage = extractReferralDataFromListingsPage();

      if (-1 !== tmp_referralDataFromListingsPage) {
        // Restructure the data from the given mtx=[] format into the same structure as our stored info
        var tmp_referralsOnCurrentPage = restructureData(tmp_referralDataFromListingsPage.mtx);

        // Merge the newly fetched data with the stored data
        referralData = Object_merge(storedReferralData, tmp_referralsOnCurrentPage);

        pr['referrals'].setValue(referralData);
      }
    }
    };


function createPreferencesDialog() {
  function PREFERENCE_INPUT_FIELD(arg_inputType, arg_preferenceId, arg_label, arg_values, arg_longDescription, arg_cssStyle_Label, arg_cssStyle_Input) {
    var tmp_container = document.createElement('span');
    tmp_container.id = 'label_' + arg_preferenceId;
    tmp_container.title = arg_longDescription;
    var tmp_innerHTML = '';
    tmp_innerHTML += '<label for="' + arg_preferenceId + '">' + arg_label;

    switch (arg_inputType) {
    case 'text':
      tmp_innerHTML += '<input type="text" value="' + arg_values.toString() + '" id="' + arg_preferenceId + '"/>';
      break;
    }

    tmp_innerHTML += '' + '</label>' + '<br>';

    tmp_container.innerHTML = tmp_innerHTML;
    return tmp_container.innerHTML;

  }

  var preferencesDialogStuff = {
    'username': {
      inputType: 'text',
      preferenceId: 'username',
      label: 'Username: ',
      values: 'kwah',
      longDescription: "Your account's username.",
      cssStyle_Label: '',
      cssStyle_Input: ''
    },
    'rentedReferralsCount': {
      inputType: 'text',
      preferenceId: 'rentedReferralsCount',
      label: 'Rented Refs: ',
      values: 417,
      longDescription: "How many rented referrals you have.",
      cssStyle_Label: '',
      cssStyle_Input: ''
    }
  };

  var tmp_preferencesDialogInnerHtml = ''+
      '<div style="max-height:99%; background-color:pink;">'+
      '<h1>Preferences</h1>'+
      '<br>';

  for (var tmp_prefId in preferencesDialogStuff) {
    tmp_preferencesDialogInnerHtml += ''+
        PREFERENCE_INPUT_FIELD(
            preferencesDialogStuff[tmp_prefId].inputType,
            preferencesDialogStuff[tmp_prefId].preferenceId,
            preferencesDialogStuff[tmp_prefId].label,
            preferencesDialogStuff[tmp_prefId].values,
            preferencesDialogStuff[tmp_prefId].longDescription,
            preferencesDialogStuff[tmp_prefId].cssStyle_Label,
            preferencesDialogStuff[tmp_prefId].cssStyle_Input
            );
  }

  tmp_preferencesDialogInnerHtml += ''+
      ''+
      '</div>' +
      '<div>' +
      '<button id="preferencesDialog_Close">Close</button>' +
      '</div>';


  var preferencesDialog;
  preferencesDialog = new ModalDialog('preferencesDialog');
  preferencesDialog.create('background-color: white; margin: 8em auto; padding: 2em; width: 40em;', tmp_preferencesDialogInnerHtml);

  document.getElementById('preferencesDialog_Close').addEventListener('click', function () {
    preferencesDialog.hide();
  }, false);
}

createPreferencesDialog();


var logo = {
  insert: function () {
    // Inserts the logo for the script into the page

    // the language icon in upper right of page
    var xpathResults_logoLocation = docEvaluate('//ul[@id="menu"]/li[@id="menuli"]/parent::ul/parent::td');

    // If the location to insert the logo cannot be found, exit the function
    if (0 >= xpathResults_logoLocation.snapshotLength) {
      return
    }

    if (1 == xpathResults_logoLocation.snapshotLength) {

      // Container for logo image to allow it to look correct in the page
      if (document.getElementById('campissLogoContainer')) {
        document.getElementById('campissLogoContainer').parentNode.removeChild(document.getElementById('campissLogoContainer'));
      }
      var elmnt_td = document.createElement('td');
      elmnt_td.id = 'campissLogoContainer';

      elmnt_td.style.paddingLeft = '8px';
      elmnt_td.style.paddingRight = '8px';
      elmnt_td.innerHTML = ' &nbsp;|&nbsp; &nbsp;';


      if (document.getElementById('campissLogo')) {
        document.getElementById('campissLogo').parentNode.removeChild(document.getElementById('campissLogo'));
      }

      var elmnt_logoImage = document.createElement('img');
      elmnt_logoImage.id = 'campissLogo';

      elmnt_logoImage.setAttribute('rel', '#scriptPreferences');

      elmnt_logoImage.style.cursor = 'pointer';
      elmnt_logoImage.border = "0";
      elmnt_logoImage.width = '16';
      elmnt_logoImage.alt = tl8('campiss Script Preferences');
      elmnt_logoImage.title = tl8('campiss Script Preferences');
      elmnt_logoImage.src = 'http://kwah.org/neobux/script/images/logo.png';

      elmnt_td.appendChild(elmnt_logoImage);
      xpathResults_logoLocation.snapshotItem(0).parentNode.appendChild(elmnt_td);
    }
  },

  addClickEvent: function (arg_clickFunction) {
    if (document.getElementById('campissLogo')) {
      document.getElementById('campissLogo').addEventListener('click', function () {
        arg_clickFunction();
      }, false);
    }
  },

  init: function () {
    this.insert();

    // this.addClickEvent(preferencesDialog.show);
    this.addClickEvent(loggerBox.show);
  }

};


var insertProfitGraph = function()
{
  var graphData = pr['accountCache'].getValue()['graphs'];
  console.info('graphData = ', graphData);

  var income = [];
  var expenses = [];
  var netIncome = [];
  var netIncome_sum = [];
  var netIncome_avg = [];

  var tmp_index = 0;

  for(var i = 9; i >= 0; i--)
  {
    tmp_index = 9 - i;

    income[tmp_index] = ( 0 +
        graphData[dates_array[i]]['ownClicks_localTime'] * userAccount.clickValues['Fixed'].value +
        graphData[dates_array[i]]['referralClicks_direct'] * userAccount.clickValues['Fixed'].commission.direct +
        graphData[dates_array[i]]['referralClicks_rented'] * userAccount.clickValues['Fixed'].commission.rented
        ).toFixed(3) * 1;


    expenses[tmp_index] = ( 0 - (
        graphData[dates_array[i]]['autopay'] +
            graphData[dates_array[i]]['recycleFees'] +
            graphData[dates_array[i]]['extensions'] +
            graphData[dates_array[i]]['autopay'] +
            ((userAccount.feesCosts.golden + userAccount.feesCosts.goldenPack) / 365)
        )
        ).toFixed(3) * 1;

    netIncome[tmp_index] = ( ( income[tmp_index] + expenses[tmp_index] ).toFixed(3) * 1 );
    if (tmp_index === 0) {
      netIncome_sum[tmp_index] = ( ( 0 + netIncome[tmp_index] ).toFixed(3) * 1 );
    }
    else {
      netIncome_sum[tmp_index] = ( ( netIncome_sum[tmp_index - 1] + netIncome[tmp_index] ).toFixed(3) * 1 );
    }
    netIncome_avg[tmp_index] = ( (netIncome_sum[tmp_index] / (tmp_index + 1) ).toFixed(3) * 1 );

// console.info(
// JSON.stringify({
// income: income[tmp_index],
// expenses: expenses[tmp_index],
// netIncome: netIncome[tmp_index],
// netIncome_sum: netIncome_sum[tmp_index],
// netIncome_avg: netIncome_avg[tmp_index]
// })
// );
  }

// console.info('income = ');
// console.info(JSON.stringify(income));
// console.info('expenses');
// console.info(JSON.stringify(expenses));
// console.info('netIncome');
// console.info(JSON.stringify(netIncome));
// console.info('netIncome_sum');
// console.info(JSON.stringify(netIncome_sum));
// console.info('netIncome_avg');
// console.info(JSON.stringify(netIncome_avg));




  var locationToInsertProfitGraph = docEvaluate('//*[@id="ch_cr"]').snapshotItem(0).parentNode.parentNode.parentNode || document.body;

  // Add a new row (and spacer to keep aestetics constant) to accomodate the profit graph
  var newSpacerRow = document.createElement('tr');
  var newSpacerCol = document.createElement('td');

  newSpacerCol.setAttribute('style','height: 6px; font-size: 6px; padding: 0px;');
  newSpacerCol.setAttribute('colspan',3);
  newSpacerCol.innerHTML = '&nbsp;';

  newSpacerRow.appendChild(newSpacerCol);


  var newRow = document.createElement('tr');
  var newCol = document.createElement('td');
  newCol.align = "center";
  
  newCol.innerHTML = '<div style="color: rgb(112, 112, 112);" class="f_b" >Profit</div>'+
      '<img width="80%" height="2" style="margin-top: 5px;" src="http://www.neobux.com/imagens/n/gr/250.jpg">'+
      '<div style="height: 220px;" id="ch_scriptProfit"></div>';
  newCol.setAttribute('style','border: 1px solid rgb(170, 170, 170); background-color: rgb(255, 255, 255);');
  newCol.setAttribute('colspan', 3);
  newRow.appendChild(newCol);

  // Insert them after the row that contains the recycle graph
  locationToInsertProfitGraph.appendChild(newSpacerRow);
  locationToInsertProfitGraph.appendChild(newRow);

  var graphDatesArray = [];
  var tmp_avgNetIncome = (netIncome_sum[netIncome_sum.length - 1] / netIncome_sum.length).toFixed(3) * 1;
  var tmp_avgNetIncomeArray = [];

  for (var i = 0; i < 10; i++) {
    graphDatesArray[i] = dates_array[i];
    tmp_avgNetIncomeArray.push(tmp_avgNetIncome);
  }
  console.info(JSON.stringify(graphDatesArray));

  location.href = "javascript:(" + function (arg_datesArray, arg_expenses, arg_income, arg_netIncome, arg_netIncome_avg) {
    console.info(arguments);

    mk_ch('ch_scriptProfit', '',
            arg_datesArray.reverse(),
            '<b>$', '</b>',
            [
              {
                name:'Expenses',
                data: arg_expenses,
                type:'area',
                color: '#bA5653',
                fillOpacity: 0.5
              },
              {
                name:'Income',
                data: arg_income,
                type:'area',
                color: '#99b55E',
                fillOpacity: 0.5
              },
              {
                name:'Avg. Net Profit',
                data: arg_netIncome_avg,
                type:'line',
                color: '#75A2D7',
                lineWidth:'1'
              },
              {
                name:'Net Profit',
                data: arg_netIncome,
                type:'line',
                color: '#4572A7',
                lineWidth:'2'
              }
            ],
            0,
            [0,0,0,0],
            null,
            [0,0,0,0]);

  } + ")(" +
      "JSON.parse('"+JSON.stringify(graphDatesArray)+"'), " +
      "JSON.parse('"+JSON.stringify(expenses)+"'), " +
      "JSON.parse('"+JSON.stringify(income)+"'), " +
      "JSON.parse('"+JSON.stringify(netIncome)+"')," +
      "JSON.parse('"+JSON.stringify(tmp_avgNetIncomeArray)+"')" +
      ")";


}



function graphShortCodeToReadableDescription(arg_graphId) {
  var tmp_headerValue = '';
  switch (arg_graphId)
  {
    case 'ch_cliques':
      tmp_headerValue = tl8('Own clicks, Local Time:');
      break;
    case 'ch_cd':
      tmp_headerValue = tl8('Credited Direct Referral Clicks:');
      break;
    case 'ch_cr':
      tmp_headerValue = tl8('Credited Rented Referral Clicks:');
      break;
    case 'ch_recycle':
      tmp_headerValue = tl8('Amount spent on recycles:');
      break;
    case 'ch_extensions':
      tmp_headerValue = tl8('Amount spent on renewing / extending referrals:');
      break;
    case 'ch_autopay':
      tmp_headerValue = tl8('Amount spent on Autopay:');
      break;
    case 'ch_trrb':
      tmp_headerValue = tl8('Amount transferred to your Rental Balance:');
      break;
    case 'ch_earnings':
      tmp_headerValue = tl8('Extension value');
      break;
    case 'ch_profit':
      tmp_headerValue = tl8('Extension value');
      break;
    case 'ch_trar':
      tmp_headerValue = tl8('Number of referrals automatically recycled for free:');
      break;
    case 'ch_trpb':
      tmp_headerValue = tl8('Amount transferred to your Golden Pack Balance:');
      break;
    case 'ch_ext_schedule8':
      //fall through
    case 'ch_ext_schedule7':
      //fall through
    case 'ch_ext_schedule6':
      //fall through
    case 'ch_ext_schedule5':
      //fall through
    case 'ch_ext_schedule4':
      //fall through
    case 'ch_ext_schedule3':
      //fall through
    case 'ch_ext_schedule2':
      //fall through
    case 'ch_ext_schedule1':
      //fall through
    case 'ch_ext_schedule':
      //fall through
      tmp_headerValue = tl8('Total number of referrals due to expire on each date:');
      break;
  }
  return tmp_headerValue;
}


var chartDataBars = new function () {
    var maxDataBarWidth = 0;
    this.graphsOnCurrentPage = [];

    for (var i = 0; i < graphsOnCurrentPage.length; i++) {
      if (document.getElementById(graphsOnCurrentPage[i])) {
        this.graphsOnCurrentPage.push(graphsOnCurrentPage[i]);
      }
    }


    var dataBarIntervals = {
      // 10: [0,1,2,3,4,5,6,7,8,9],
      10: [4,6,9],
      15: [4,9,14],
      // 15: [0,1,2,3,4],
      90: [29,59,89]
    };

    this.getDataBarData = function (arg_graphId) {
      var tmp_graphLength = graphLengthLookup[arg_graphId];
      var tmp_currentDayData;
      var dataBarData = {};
      var tmp_sum = [];
      var tmp_average = [];
      var tmp_maxInterval = 0;
      var tmp_currentDate;
      var tmp_currentValue;


      // The extensions due graphs needs special handling, but for now just exit
      if (friendlyNameLookup[arg_graphId].match(/extensions_([0-9]+)To([0-9]+)/)) {
        return null;
      }

      //Find the max interval so that only the necessary amount of iterations are done/made
      // NB: intervals not necessarily in any particular order
      for (var i = 0; i < dataBarIntervals[tmp_graphLength].length; i++) {
        tmp_maxInterval = (dataBarIntervals[tmp_graphLength][i] > tmp_maxInterval) ? dataBarIntervals[tmp_graphLength][i] : tmp_maxInterval;
      }


      var tmp_decimalPrecision = 10000; //Round to 5 decimal places
      for (var dateIndex = 0; dateIndex <= tmp_maxInterval; dateIndex++) {
        tmp_currentDate = dates_array[dateIndex];

        if (!accountCache.graphs[tmp_currentDate]) {
          //No data at all for date found, flag as such and continue
          errorLog("//No data at all for date found, flag as such and continue");
          continue;
        }
        if ('undefined' === typeof accountCache.graphs[tmp_currentDate][lookup_graphCache[arg_graphId]]
            || null === accountCache.graphs[tmp_currentDate][lookup_graphCache[arg_graphId]]) {
          //No data for selected graph on date found, flag as such and continue
          errorLog("//No data for selected graph on date found, flag as such and continue");
          continue;
        }

        tmp_currentValue = accountCache.graphs[tmp_currentDate][lookup_graphCache[arg_graphId]];
        tmp_sum[dateIndex] = tmp_sum[dateIndex - 1] + tmp_currentValue || tmp_currentValue;
        tmp_average[dateIndex] = tmp_sum[dateIndex] / (dateIndex + 1);

        dataBarData[tmp_currentDate] = {
          'value': Math.round(tmp_currentValue * tmp_decimalPrecision) / tmp_decimalPrecision,
          'sum': Math.round(tmp_sum[dateIndex] * tmp_decimalPrecision) / tmp_decimalPrecision,
          'avg': Math.round(tmp_average[dateIndex] * tmp_decimalPrecision) / tmp_decimalPrecision
        };

        if ('ch_cr' == arg_graphId) {
          dataBarData[tmp_currentDate].avgIncome = Math.round(tmp_average[dateIndex] * userAccount.clickValues['Fixed'].commission.rented * tmp_decimalPrecision) / tmp_decimalPrecision;
        }
        if ('ch_cd' == arg_graphId) {
          dataBarData[tmp_currentDate].avgIncome = Math.round(tmp_average[dateIndex] * userAccount.clickValues['Fixed'].commission.direct * tmp_decimalPrecision) / tmp_decimalPrecision;
        }
        if ('ch_cliques' == arg_graphId) {
          dataBarData[tmp_currentDate].avgIncome = Math.round(tmp_average[dateIndex] * currentUser.ownClickValue * tmp_decimalPrecision) / tmp_decimalPrecision;
        }
        if ('ch_recycle' == arg_graphId) {
          dataBarData[tmp_currentDate].avgRecycles = Math.round(tmp_average[dateIndex] / currentUser.recycleFee * tmp_decimalPrecision) / tmp_decimalPrecision;
        }
        if ('ch_extensions' == arg_graphId) {
          dataBarData[tmp_currentDate].numberOfRenewals_actualAvg = (tmp_average[dateIndex] / currentUser.renewalFees);
          dataBarData[tmp_currentDate].idealNumberOfRenewals_avg = (currentUser.numberOfRefs.Rented / currentUser.renewalsLength);
          dataBarData[tmp_currentDate].idealRenewalsCost_avg = (dataBarData[tmp_currentDate].idealNumberOfRenewals_avg * currentUser.renewalFees);
          dataBarData[tmp_currentDate].idealRenewalsCost_sum = (dateIndex + 1) * (dataBarData[tmp_currentDate].idealNumberOfRenewals_avg * currentUser.renewalFees);
        }
      }
      return dataBarData;
    };

    this.init = function () {
      var graphBarCSS = "" +
          ".dataBarContainer { margin-top:10px; border-collapse:collapse; margin: 10px auto 10px; max-width: 85%; min-width:75%; white-space:nowrap; }" +
          ".dataBarContainer tr { border:1px solid #AAAAAA; }" +
          ".graphBar { color:#444444; clear:both; font-family:verdana; font-size:9px; font-weight:bold; height:14px; padding:1px 2%; vertical-align:middle; }" +
          ".graphBarFirstCell { text-align: left; min-width: 8em;}" +
          ".graphBarSecondCell { text-align: left; }" +
          "";
      GM_addStyle(graphBarCSS);

      var tmp_dataBarText;
      var tmp_dataSet;
      var tmp_dataBarDataToOutput;
      var tmp_graphLength;

      function dataToOutputToDataBar(
        arg_dataSet,
        arg_dataBarIntervals,
        arg_dataBarTitle,
        arg_fieldToShow,
        arg_daysPrefix,
        arg_daysSuffix,
        arg_numberOfFixedDecimalPoints
      ) {
        tmp_dataBarDataToOutput = [];

        try {
          for (var y = arg_dataBarIntervals.length - 1; 0 <= y; y--) {
            tmp_counter = (tmp_dateAdjuster[0] == -1) ? y : 0 - arg_dataBarIntervals[y] - tmp_dateAdjuster[1];
            tmp_dataBarDataToOutput.push(
            arg_daysPrefix + (arg_dataBarIntervals[y] + 1) + arg_daysSuffix + arg_dataSet[dates_array[arg_dataBarIntervals[tmp_counter]]][arg_fieldToShow].toFixed(arg_numberOfFixedDecimalPoints));
          }
          return arg_dataBarTitle + tmp_dataBarDataToOutput.join(' ');
        } catch (e) {
          errorLog('ERROR! \n', e);
          return 'error in calculations';
        }
      }

      function createDataBarRow(arg_graphId, argBarCode, arg_dataBarColumns, arg_customDataBarCss) {

        var elmt_bar = document.createElement("tr");
        elmt_bar.setAttribute("id", arg_graphId + '__' + argBarCode);
        elmt_bar.setAttribute("style", arg_customDataBarCss);

        for (var i = 0; i < arg_dataBarColumns.length; i++) {
          var elmt_col = document.createElement("td");
          elmt_col.setAttribute("class", "graphBar" + ((0 == i) ? " graphBarFirstCell" : "") + ((1 == i) ? " graphBarSecondCell" : ""));
          elmt_col.innerHTML = arg_dataBarColumns[i];
          elmt_bar.appendChild(elmt_col);
        }

        var currentDataBarWidth = elmt_bar.textContent.split('').length;
        maxDataBarWidth = (maxDataBarWidth < currentDataBarWidth) ? currentDataBarWidth : maxDataBarWidth;

        return elmt_bar;
      }


      for (var i = 0; i < this.graphsOnCurrentPage.length; i++) {

        tmp_graphLength = graphLengthLookup[this.graphsOnCurrentPage[i]];
        tmp_dataSet = this.getDataBarData(this.graphsOnCurrentPage[i]);
        var tmp_dateAdjuster = friendlyNameLookup[this.graphsOnCurrentPage[i]].match(/extensions_([0-9]+)To([0-9]+)/) || [-1, 0];

        var tmp_counter = 0;
        var graphBarsContainerId = this.graphsOnCurrentPage[i] + '_containers';

        if (document.getElementById(graphBarsContainerId)) {
          document.getElementById(graphBarsContainerId).parentNode.removeChild(document.getElementById(graphBarsContainerId));
        }


        var chartContainer = document.getElementById(this.graphsOnCurrentPage[i]);

        var graphBarTable = document.createElement("table");
        graphBarTable.setAttribute("id", graphBarsContainerId);
        graphBarTable.setAttribute("class", 'dataBarContainer');

        // Generic DataBars
        switch (this.graphsOnCurrentPage[i])
        {
          case 'ch_cliques':
            // Fall-through
          case 'ch_cd':
            // Fall-through
          case 'ch_cr':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'sum', [tl8('Sum: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'sum', '(', ') ', 0)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Avg. Clicks: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avg', '(', ') ', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avgIncome', [tl8('Avg. Income: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avgIncome', '(', ') $', 3)], ''));
            break;
          case 'ch_extensions':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'sum', [tl8('Sum: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'sum', '(', ') $', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Avg. Expense: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avg', '(', ') $', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avgIncome', [tl8('Avg. Renewals (#): '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'numberOfRenewals_actualAvg', '(', ') ', 2)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avgIncome', [tl8('Ideal Avg. Renewals (#): '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'idealNumberOfRenewals_avg', '(', ') ', 2)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avgIncome', [tl8('Ideal Avg. Expense ($): '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'idealRenewalsCost_avg', '(', ') $', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avgIncome', [tl8('Ideal Sum ($): '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'idealRenewalsCost_sum', '(', ') $', 3)], ''));
            break;
          case 'ch_recycle':
            // Fall-through
          case 'ch_autopay':
            // Fall-through
          case 'ch_trrb':
            // Fall-through
          case 'ch_earnings':
            // Fall-through
          case 'ch_profit':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'sum', [tl8('Sum: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'sum', '(', ') $', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Avg.: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avg', '(', ') $', 3)], ''));
            break;

        }

        // Specific DataBars
        switch (this.graphsOnCurrentPage[i])
        {
          case 'ch_recycle':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Avg. #Recycles: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avgRecycles', '(', ') ', 3)], ''));
            break;
          case 'ch_trpb':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'sum', [tl8('Sum: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'sum', '(', ') $', 3)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Avg. Transfer: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avg', '(', ') $', 3)], ''));
            break;
          case 'ch_trar':
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'sum', [tl8('Sum: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'sum', '(', ') ', 1)], ''));
            graphBarTable.appendChild(
            createDataBarRow(this.graphsOnCurrentPage[i], 'avg', [tl8('Average Free Recycles: '), dataToOutputToDataBar(tmp_dataSet, dataBarIntervals[tmp_graphLength], '', 'avg', '(', ') ', 1)], ''));
            break;
        }
        chartContainer.parentNode.appendChild(graphBarTable);
      }

      GM_addStyle('.dataBarContainer { width:' + (maxDataBarWidth / 1.75) + 'em; }');

      // var dataBarsOnPage = document.body.getElementsBy
      // document.getElementById(this.graphsOnCurrentPage[i]+'_'+i).addEventListener('click', function() { dataBarClickHandler(this.graphsOnCurrentPage[i]+'_'+i); }, false);
    };
    };


var exportTabs = new function () {
    var tmpCurrentGraph, tmp_currentGraphId;

    this.insertStyles = function () {

      var newDialog_Style = "" +
          "#modalContainer {"+
          "background-color: transparent;"+
          "position: absolute;"+
          "width: 100%;"+
          "height: 100%;"+
          "top: 0px;"+
          "left: 0px;"+
          "z-index: 10000;"+
          "background-image: url(tp.png); /* required by MSIE to prevent actions on lower z-index elements */"+

      "#alertBox {" + "position: relative;" + "width: 300px;" + "min-height: 100px;" + "margin-top: 50px;" + "border: 2px solid #000;" + "background-color: #F2F5F6;" + "background-image: url(alert.png);" + "background-repeat: no-repeat;" + "background-position: 20px 30px;" + " }" +

      "#modalContainer > #alertBox {" + "position: fixed;" + " }" +

      "#alertBox h1 {" + "margin: 0;" + "font: bold 0.9em verdana, arial;" + "background-color: #78919B;" + "color: #FFF;" + "border-bottom: 1px solid #000;" + "padding: 2px 0 2px 5px;" + " }" +

      "#alertBox p {" + "font-family: verdana, arial;" + "padding: 10px;" + "margin: 10px;" + "height: auto;" + " }" +

      "#alertBox textarea {" + "font-family: monospace, courier new, verdana, arial;" + "font-size: x-small;" + "margin: 15px;" + "margin-top: 0px;" + "height: auto;" + "width: 85%;" + " }" +

      "#alertBox #closeBtn {" + "display: block;" + "position: relative;" + "margin: 15px auto;" + "padding: 3px;" + "border: 2px solid #000;" + "width: 70px;" + "font: 0.7em verdana, arial;" + "text-transform: uppercase;" + "text-align: center;" + "color: #FFF;" + "background-color: #78919B;" + "text-decoration: none;" + "}";




      var newDialogStyle = document.body.appendChild(document.createElement('style'));
      newDialogStyle.setAttribute('type', 'text/css');
      newDialogStyle.innerHTML = newDialog_Style;



      var tabStyles = '';
      tabStyles += '.exportTab { -moz-border-radius: 0.6em 0.6em 0px 0px; display: inline-block; font-size: xx-small; padding: 0px 7px; margin-right: 7px; text-align: center; cursor: pointer; }';
      tabStyles += '.csvExportTab{ background-color:#ecd; }';
      tabStyles += '.tsvExportTab{ background-color:#edc; }';
      tabStyles += '.xmlExportTab{ background-color:#cde; }';
      tabStyles += '.textExportTab{ background-color:#dce; }';

      GM_addStyle(tabStyles);
    }


    function EXPORT_TAB(arg_exportType, arg_exportTabText, arg_textDescription, arg_textareaContents) {
      var exportTab = document.createElement('div');
      // exportTab.style.cssFloat = 'left';
      // exportTab.style.width = '20px';
      exportTab.className = arg_exportType + 'ExportTab exportTab';
      exportTab.id = arg_exportType + 'ExportTab_' + tmp_currentGraphId;

      exportTab.innerHTML = arg_exportTabText;

      var textareaContents = arg_textareaContents || "not found";
      var textareaContentsReverse = "not found";
      var messageHeader = arg_textDescription || "not found";

      exportTab.addEventListener('click', function exportTabs_onClick(event) {
        // (event.ctrlKey && event.altKey && event.shiftKey)
        var exportTab = new ModalDialog('exportTab_' + arg_exportType);
        exportTab.create(
            'background-color: white; margin: 8em auto; padding: 2em; position: relative; top:' + window.pageYOffset + 'px; width: 17em;',
            '' +
                '<h3>' + 'Exporting to ' + arg_exportTabText + '..' + '</h3>' +
                '<small><i>' + messageHeader + '</i></small><br>' +
                '<textarea style="height: 15em; width: 17em;">' +
                    ((event.ctrlKey && textareaContentsReverse) ? textareaContentsReverse : textareaContents) +
                '</textarea><br>' +
                '<button id="' + arg_exportType + 'ExportTab_okButton">Ok</button>' +
            '');

        document.getElementById(arg_exportType + 'ExportTab_okButton').addEventListener('click', function (event) {
          exportTab.hide();
        }, false);

        exportTab.show();

        // createExportDialog(messageHeader, textareaContents, $1'Exporting to '+arg_exportTabText+'..', 'Close', textareaContentsReverse, event);
      }, false);

      return exportTab;
    }

    function dataToExportFormat(arg_exportFormat, arg_graphId, arg_graphData, arg_numberOfDaysToExport) {
      var tmp_valuesArray = [];
      var tmp_valuesToExportArray = [];
      var exportString = '';
      var maxCount = 10;

      if (arg_numberOfDaysToExport) {
        maxCount = arg_numberOfDaysToExport;
      }

      var tmp_currentDate;

      if (arg_graphId.match(/ch_ext_schedule/i)) {
        var tmp_extensionGraphIndex = arg_graphId.match(/ch_ext_schedule([0-9]+)/i)[1];
        var tmp_extensionScheduleAdjustment_start = (tmp_extensionGraphIndex - 1) * graphLengthLookup[arg_graphId] * -1;
        var tmp_extensionScheduleAdjustment_end = (tmp_extensionGraphIndex - 0) * graphLengthLookup[arg_graphId] * -1;

        for (var dateIndex = tmp_extensionScheduleAdjustment_start; dateIndex > tmp_extensionScheduleAdjustment_end; dateIndex--) {
          tmp_currentDate = dates_array[dateIndex];
          if ('undefined' !== typeof arg_graphData[tmp_currentDate]) {
            tmp_valuesArray.push([tmp_currentDate, arg_graphData[tmp_currentDate][lookup_graphCache[arg_graphId]]]);
          }
        }
      } else {
        for (var dateIndex = 0; dateIndex < maxCount; dateIndex++) {
          tmp_currentDate = dates_array[dateIndex];
          if ('undefined' !== typeof arg_graphData[tmp_currentDate]) {
            tmp_valuesArray.push([tmp_currentDate, arg_graphData[tmp_currentDate][lookup_graphCache[arg_graphId]]]);
          }
        }
      }
      try {
        switch (arg_exportFormat) {
        case 'csv':
          for (var i = 0; i < maxCount; i++) {
            tmp_valuesToExportArray[i] = tmp_valuesArray[i].join(',');
          }
          return tmp_valuesToExportArray.join(',\n');
          break;
        case 'tsv':
          for (var i = 0; i < maxCount; i++) {
            tmp_valuesToExportArray[i] = tmp_valuesArray[i].join("\t");
          }
          return tmp_valuesToExportArray.join("\n");
          break;
        case 'text':
          for (var i = 0; i < maxCount; i++) {
            tmp_valuesToExportArray[i] = tmp_valuesArray[i][1];
          }
          return tmp_valuesToExportArray.join("\n");
          break;
        }
      } catch (e) {
        errorLog("ERROR!\n#" + 'tmp_currentGraphId = ', tmp_currentGraphId, "\n" + "Error details: \n", e);
        return 'Error retrieving data';
      }
    }

    this.init = function () {
      this.insertStyles();
      var tmp_currentDataset = pr['accountCache'].getValue();

      for (var tmpNameOfCurrentGraph in graphsOnCurrentPage) {
        tmp_currentGraphId = graphsOnCurrentPage[tmpNameOfCurrentGraph];
        if (document.getElementById(tmp_currentGraphId)) {
          var referenceNode = document.getElementById(tmp_currentGraphId);
          try {
            //// Add Export Links
            // Create and insert wrapper for export 'tabs'
            var exportTabsWrapper = document.createElement('div');
            exportTabsWrapper.setAttribute('style', 'bottom:-1px; margin-left:17px; margin-top:4px; position:relative; text-align:left;');
            exportTabsWrapper.id = 'exportTabsWrapper_' + tmp_currentGraphId;
            exportTabsWrapper.innerHTML = '&nbsp;';

            referenceNode.parentNode.insertBefore(exportTabsWrapper, referenceNode);

            var exportTabTypes = ['CSV', 'TSV', 'Text'];
            for (var exportTabTypes_index = 0; exportTabTypes_index < exportTabTypes.length; exportTabTypes_index++) {
              var exportTabElement = EXPORT_TAB(
                exportTabTypes[exportTabTypes_index].toLowerCase(),
                exportTabTypes[exportTabTypes_index],
                graphShortCodeToReadableDescription(tmp_currentGraphId),
                dataToExportFormat(
                  exportTabTypes[exportTabTypes_index].toLowerCase(),
                  tmp_currentGraphId,
                  tmp_currentDataset.graphs,
                  graphLengthLookup[tmp_currentGraphId]
                )
              );

              if (document.getElementById(exportTabTypes[exportTabTypes_index].toLowerCase() + 'ExportTab_' + tmp_currentGraphId)) {
                document.getElementById(exportTabTypes[exportTabTypes_index].toLowerCase() + 'ExportTab_' + tmp_currentGraphId).innerHTML = exportTabElement.innerHTML
              } else {
                document.getElementById('exportTabsWrapper_' + tmp_currentGraphId).appendChild(exportTabElement);
              }
            }
          } catch (e) {
            errorLog("ERROR!\nCannot add export tabs.\n\nFull error message:\n\n", e)
          }
        }
      }
    }
    };





// x = id of the container where the graph is to be inserted
// y = title displayed on the graph
// o = x axis categories
// w0 = prefix to x axis value in tooltip
// w = suffix to x axis value in tooltip
// O = array containing x series values and title above the graph
// L = legend enabled [true|false]
// m = y axis plot bands (3-value array or 0)
// mn = y-axis minimum
// p = x-axis plot bands (3-value array or 0)
//function mk_ch(x, y, o, w0, w, O, L, m, mn, p)

function mk_ch(x, y, o, w0, w, O, L, m, mn, p) {
  if (true != xuw) return '';
  if (0 == m) n = [0, 0, 0];
  else n = m;
  if (0 == p) pn = [0, 0, 0, 0];
  else pn = p;
  var s1 = 30,
      s2 = 20,
      s3 = 20,
      s4 = 50;
  if (1 == L) s1 = 20, s3 = 30;
  if ('' == y) s1 = 10;
  if ('x' == mn) {
    mn = -0.2;
    maxout = 4
  } else maxout = null;
  var g = [s1, s2, s3, s4];
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: x,
      defaultSeriesType: 'line',
      margin: g,
      showAxes: 1,
      borderColor: '#4572A7',
      backgroundColor: '#fff',
      borderWidth: 0,
      shadow: 0
    },
    title: {
      text: y,
      style: {
        margin: '10px 0 0 10px',
        textAlign: 'center',
        font: 'normal 12px Verdana, sans-serif'
      }
    },
    xAxis: {
      categories: o,
      labels: {
        enabled: 0
      },
      tickmarkPlacement: "on",
      gridLineWidth: 1,
      lineColor: '#fff',
      tickColor: '#fff',
      gridLineColor: (0 == p) ? '#eee' : '',
      plotBands: [{
        from: 0,
        to: pn[0],
        color: 'rgba(170,170,170, 0.3)'
      }, {
        from: pn[0],
        to: pn[1],
        color: 'rgba(255,101,79, 0.3)'
      }, {
        from: pn[1],
        to: pn[2],
        color: 'rgba(246,189,15, 0.3)'
      }, {
        from: pn[2],
        to: pn[3],
        color: 'rgba(139,186,0, 0.3)'
      }]
    },
    yAxis: {
      title: {
        enabled: 0,
        text: null
      },
      min: mn,
      max: maxout,
      endOnTick: 0,
      startOnTick: 0,
      tickPixelInterval: 20,
      plotLines: [{
        value: 0,
        width: 1,
        color: '#888'
      }],
      plotBands: [{
        from: 0,
        to: n[0],
        color: 'rgba(255,101,79, 0.3)'
      }, {
        from: n[0],
        to: n[1],
        color: 'rgba(246,189,15, 0.3)'
      }, {
        from: n[1],
        to: n[2],
        color: 'rgba(139,186,0, 0.3)'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + w0 + this.y + ' ' + w
      }
    },
    legend: {
      enabled: L,
      layout: 'horizontal',
      symbolWidth: 5,
      style: {
        left: 'auto',
        bottom: '5px',
        right: '5px',
        top: 'auto',
        font: 'normal 12px Verdana, sans-serif'
      }
    },
    plotOptions: {
      line: {
        lineWidth: 2,
        marker: {
          enabled: 1,
          symbol: 'circle',
          radius: 3,
          states: {
            hover: {
              enabled: 1,
              radius: 5
            }
          }
        }
      }
    },
    series: O,
    credits: {
      enabled: 0
    }
  })
}

function mk_ch2(_containerID, _graphTitle, _x_axisCategories, _tooltipPrefix, _tooltipSuffix, _x_ValuesAndTitle, _legendEnabled, _y_axisPlotBands, _y_axisMin, _x_axisPlotBands) {
  var pn;

  if (0 === _y_axisPlotBands) {
    n = [0, 0, 0];
  } else {
    n = _y_axisPlotBands;
  }
  if (0 === _x_axisPlotBands) {
    pn = [0, 0, 0, 0];
  } else {
    pn = _x_axisPlotBands;
  }
  var s1 = 30,
      s2 = 20,
      s3 = 20,
      s4 = 50;
  if (1 == _legendEnabled) {
    s1 = 20, s3 = 30;
  }
  if ("" == _graphTitle) {
    s1 = 10;
  }
  if ("x" == _y_axisMin) {
    _y_axisMin = -0.2;
    maxout = 4;
  } else {
    maxout = null;
  }
  var g = [s1, s2, s3, s4];


  var chart = new(Highcharts.Chart)({
    chart: {
      renderTo: _containerID,
      defaultSeriesType: "line",
      margin: g,
      showAxes: 1,
      borderColor: "#4572A7",
      backgroundColor: "#fff",
      borderWidth: 0,
      shadow: 0
    },
    title: {
      text: _graphTitle,
      style: {
        margin: "10px 0 0 10px",
        textAlign: "center",
        font: "normal 12px Verdana, sans-serif"
      }
    },
    xAxis: {
      categories: _x_axisCategories,
      labels: {
        enabled: 0
      },
      tickmarkPlacement: "on",
      gridLineWidth: 1,
      lineColor: "#fff",
      tickColor: "#fff",
      gridLineColor: 0 === _x_axisPlotBands ? "#eee" : "",
      plotBands: [{
        from: 0,
        to: pn[0],
        color: "rgba(170,170,170, 0.25)"
      }, {
        from: pn[0],
        to: pn[1],
        color: "rgba(255,101,79, 0.25)"
      }, {
        from: pn[1],
        to: pn[2],
        color: "rgba(246,189,15, 0.25)"
      }, {
        from: pn[2],
        to: pn[3],
        color: "rgba(139,186,0, 0.25)"
      }]
    },
    yAxis: {
      title: {
        enabled: 0,
        text: null
      },
      min: _y_axisMin,
      max: maxout,
      endOnTick: 0,
      startOnTick: 0,
      tickPixelInterval: 20,
      plotLines: [{
        value: 0,
        width: 1,
        color: "#888"
      }],
      plotBands: [{
        from: 0,
        to: n[0],
        color: "rgba(255,101,79, 0.25)"
      }, {
        from: n[0],
        to: n[1],
        color: "rgba(246,189,15, 0.25)"
      }, {
        from: n[1],
        to: n[2],
        color: "rgba(139,186,0, 0.25)"
      }]
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + _tooltipPrefix + this.y + " " + _tooltipSuffix;
      }
    },
    legend: {
      enabled: _legendEnabled,
      layout: "horizontal",
      symbolWidth: 5,
      style: {
        left: "auto",
        bottom: "5px",
        right: "5px",
        top: "auto",
        font: "normal 12px Verdana, sans-serif"
      }
    },
    plotOptions: {
      line: {
        lineWidth: 2,
        marker: {
          enabled: 1,
          symbol: "circle",
          radius: 3,
          states: {
            hover: {
              enabled: 1,
              radius: 5
            }
          }
        }
      }
    },
    series: _x_ValuesAndTitle,
    credits: {
      enabled: 0
    }
  });
}


/*

mk_ch2("ch_cliques",
"",
["2010/12/15", "2010/12/16", "2010/12/17", "2010/12/18", "2010/12/19", "2010/12/20", "2010/12/21", "2010/12/22", decodeURIComponent(escape("Yesterday")), decodeURIComponent(escape("Today"))],
"foo",
decodeURIComponent(escape("Clicks")),
[
{
name: decodeURIComponent(escape("Local Time")),
data: [8, 0, 9, 11, 0, 0, 0, 1, 2, 10]
},
{
name: decodeURIComponent(escape("Server Time")),
data: [8, 2, 7, 11, 0, 0, 0, 3, 4, 6]
}
],
1,
[2,4,9],
-1.1,
[3]
); */



var convertRefListingsToUl = function () {

    debugLog(localStorage);

    var referrals = JSON.parse(getValue('referrals'))

    debugLog(referrals);


    function to_ul(obj) {
      // --------v create an <ul> element
      var f, li, ul = document.createElement("ul");

      // --v loop through its children
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          //debugLog(i);
          li = document.createElement("li");
          // if the child has a 'folder' prop on its own, call me again
          if ('object' == typeof obj[i]) {
            li.appendChild(to_ul(obj[i]));
          } else {
            // debugLog(document.createTextNode(i));
            li.appendChild(document.createTextNode(i + ' = ' + obj[i]));
          }
          ul.appendChild(li);
        }
      }

      return ul;
    }


    this.init = function () {
      var tmp_ul = to_ul(referrals);

      debugLog(tmp_ul);

      // document.body.innerHTML = "";
      document.body.appendChild(tmp_ul);
    }
    };


//convertRefListingsToUl.init();

var widenPages = new function () {

    this.referralListings = function () {
      document.body.children[1].style.width = '90%';
      document.body.children[1].style.padding = '0 4em';

      if (document.getElementById('tblprp')) {
        document.getElementById('tblprp').style.maxWidth = '78em';
        document.getElementById('tblprp').style.overflow = 'auto';
      }

      GM_addStyle('.l { white-space: nowrap; } ')
    };

    this.generic = function () {
      document.body.children[0].style.width = '98%';
      document.body.children[0].style.maxWidth = '100em';
      document.body.children[1].style.width = '1100px';
    }
    };



function insertAdCounterBox(arg_dateIndex, arg_adCounts, arg_adCountChange_currentPageview) {
  if ('undefined' === typeof GM_addStyle) {
    function GM_addStyle(arg_css) {
      var head = document.getElementsByTagName("head")[0];
      if (head) {
        var style = document.createElement("style");
        style.textContent = arg_css;
        style.type = "text/css";
        head.appendChild(style);
      }
      return style;
    }
  }

  var elmnt_totalsContainer = document.createElement('div');
  elmnt_totalsContainer.id = 'clickTotalsContainer';
  elmnt_totalsContainer.setAttribute('style', 'position: fixed; bottom: 2em; right: 2em; width: 150px; min-height: 10em; background-color: white; border: 1px solid black; font-size:x-small !important; padding: 1em 1em; opacity: 0.5;');

  elmnt_totalsContainer.setAttribute('onmouseover', 'document.getElementById("clickTotalsContainer").style.opacity = "1"; ');
  elmnt_totalsContainer.setAttribute('onmouseout', 'document.getElementById("clickTotalsContainer").style.opacity = "0.5";');

  GM_addStyle(".adCountIncrementButton { width: 2.5em; text-align:center; font-size: xx-small; }" + ".adCountDecrementButton { width: 2.5em; text-align:center; font-size: xx-small; }" + "#clickTotalsContainer table tr td { font-size:x-small; }");



  // If the date navigated to doesn't currently exist in the adCounts data, create the data object for it
  if (!arg_adCounts[dates_array[arg_dateIndex]]) {
    arg_adCounts[dates_array[arg_dateIndex]] = {};
  }

  // Similarly, check that each of the ad type counts are valid and/or/else reset to zero
  arg_adCounts[dates_array[arg_dateIndex]]['extended'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['extended']) ? arg_adCounts[dates_array[arg_dateIndex]]['extended'] : 0;
  arg_adCounts[dates_array[arg_dateIndex]]['regular'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['regular']) ? arg_adCounts[dates_array[arg_dateIndex]]['regular'] : 0;
  arg_adCounts[dates_array[arg_dateIndex]]['mini'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['mini']) ? arg_adCounts[dates_array[arg_dateIndex]]['mini'] : 0;
  arg_adCounts[dates_array[arg_dateIndex]]['fixed'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['fixed']) ? arg_adCounts[dates_array[arg_dateIndex]]['fixed'] : 0;
  arg_adCounts[dates_array[arg_dateIndex]]['fixedMicro'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['fixedMicro']) ? arg_adCounts[dates_array[arg_dateIndex]]['fixedMicro'] : 0;
  arg_adCounts[dates_array[arg_dateIndex]]['micro'] = (0 <= arg_adCounts[dates_array[arg_dateIndex]]['micro']) ? arg_adCounts[dates_array[arg_dateIndex]]['micro'] : 0;


  // If the date navigated to doesn't currently exist in the arg_adCountChange_currentPageview data, create the data object for it
  if (!arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]) {
    arg_adCountChange_currentPageview[dates_array[arg_dateIndex]] = {};
  }

  //Check that each of the pageview ad counts exist, else assign 0 to it
  //Note: when new dates are navigated to and the above code has to create a record for that date, these sub-objects will not exist
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['extended'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['extended'] || 0;
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['regular'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['regular'] || 0;
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['mini'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['mini'] || 0;
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['fixed'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['fixed'] || 0;
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['fixedMicro'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['fixedMicro'] || 0;
  arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['micro'] = arg_adCountChange_currentPageview[dates_array[arg_dateIndex]]['micro'] || 0;



  var tmp_foo = {
    extended: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['extended']) ? arg_adCounts[dates_array[arg_dateIndex]]['extended'] : 0,
      text: tl8("Extended:"),
      countsToTos37: true,
      value: 0.02
    },
    regular: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['regular']) ? arg_adCounts[dates_array[arg_dateIndex]]['regular'] : 0,
      text: tl8("Regular:"),
      countsToTos37: true,
      value: 0.01
    },
    mini: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['mini']) ? arg_adCounts[dates_array[arg_dateIndex]]['mini'] : 0,
      text: tl8("Mini:"),
      countsToTos37: false,
      value: 0.005
    },
    fixed: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['fixed']) ? arg_adCounts[dates_array[arg_dateIndex]]['fixed'] : 0,
      text: tl8("Fixed:"),
      countsToTos37: true,
      value: 0.01
    },
    fixedMicro: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['fixedMicro']) ? arg_adCounts[dates_array[arg_dateIndex]]['fixedMicro'] : 0,
      text: tl8("Fixed (Micro):"),
      countsToTos37: true,
      value: 0.001
    },
    micro: {
      adCount: (0 <= arg_adCounts[dates_array[arg_dateIndex]]['micro']) ? arg_adCounts[dates_array[arg_dateIndex]]['micro'] : 0,
      text: tl8("Micro:"),
      countsToTos37: false,
      value: 0.001
    }
  };


  var tmp_sumValuesOfClicks = 0 +
      tmp_foo['extended'].adCount * userAccount.clickValues['Extended'].value +
      tmp_foo['regular'].adCount * userAccount.clickValues['Standard'].value +
      tmp_foo['mini'].adCount * userAccount.clickValues['Mini'].value +
      tmp_foo['fixed'].adCount * userAccount.clickValues['Fixed'].value +
      tmp_foo['fixedMicro'].adCount * userAccount.clickValues['FixedMicro'].value +
      tmp_foo['micro'].adCount * userAccount.clickValues['Micro'].value;

  var tmp_totalsContainerHTML = "";

  tmp_totalsContainerHTML += "" +
      "<center><button id='date_decrementButton' class='adCountDecrementButton'>&laquo;</button>" +
      "<span id='date_textCount'>"+dates_array[arg_dateIndex]+"</span>" +
      "<button id='date_incrementButton' class='adCountIncrementButton'>&raquo;</button></center>" +
      "<center>" + "$" + tmp_sumValuesOfClicks.toFixed(3) + "</center>" +
      "<br>" +
      "<table>";

  var tmp_adTypeForClickValue;
  for (var tmp_label in tmp_foo) {
    if (tmp_foo.hasOwnProperty(tmp_label)) {
      tmp_adTypeForClickValue = (tmp_label.slice(0,1).toUpperCase() + tmp_label.slice(1)).replace(/Regular/,'Standard');
// console.info(tmp_adTypeForClickValue);

      tmp_totalsContainerHTML += [
        "<tr><td>"+ tmp_foo[tmp_label].text,
        "<button id='"+tmp_label+"AdCount_incrementButton' class='adCountIncrementButton'>+</button>",
        "<span id='"+tmp_label+"AdCount_textCount' title='$"+(tmp_foo[tmp_label].adCount * userAccount.clickValues[tmp_adTypeForClickValue].value).toFixed(3)+"'>"+tmp_foo[tmp_label].adCount+"</span>",
        "<span style='font-size:xx-small; font-style: italic; font-color: #333333; '>("+((0 <
            arg_adCountChange_currentPageview[dates_array[arg_dateIndex]][tmp_label]) ? "+"+arg_adCountChange_currentPageview[dates_array[arg_dateIndex]][tmp_label]:arg_adCountChange_currentPageview[dates_array[arg_dateIndex]][tmp_label])+")</span>",
        "<button id='"+tmp_label+"AdCount_decrementButton' class='adCountDecrementButton'>-</button>"+"</td></tr>"
      ].join('</td><td>');
    }
  }

  tmp_totalsContainerHTML += "</table>";
  elmnt_totalsContainer.innerHTML = tmp_totalsContainerHTML;

  if (document.getElementById('clickTotalsContainer')) {
    document.getElementById('clickTotalsContainer').parentNode.removeChild(document.getElementById('clickTotalsContainer'));
  }
  document.body.appendChild(elmnt_totalsContainer);




  /* Add handlers for changing the currently selected date */

  // NB: The date index is in reverse order (ie, n days into the past) thus incrementing this index equates to going an increased number of days into the past
  document.getElementById('date_decrementButton').addEventListener('click', function () {
    insertAdCounterBox(arg_dateIndex + 1, arg_adCounts, arg_adCountChange_currentPageview);
  }, false);

  document.getElementById('date_incrementButton').addEventListener('click', function () {
    insertAdCounterBox(arg_dateIndex - 1, arg_adCounts, arg_adCountChange_currentPageview);
  }, false);


  /* Add handlers for changing the ad counts */

  function addIncrementListener(arg_adType, arg_oldAdCounts, arg_tmp_adCountChange_currentPageview) {
    var tmp_adCounts = {};
    Object_merge(tmp_adCounts, arg_oldAdCounts);

    var tmp_adCountChange = {};
    Object_merge(tmp_adCountChange, arg_tmp_adCountChange_currentPageview);

    tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType] = parseInt(tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType]) + 1;
    tmp_adCounts[dates_array[arg_dateIndex]][arg_adType] = parseInt(arg_oldAdCounts[dates_array[arg_dateIndex]][arg_adType]) + 1;

    //If the adcount is less than zero, reset it to 0 (cannot click fewer than zero of any ad-type) and undo the change
    // to the adcount for the current pageview
    if (0 > tmp_adCounts[dates_array[arg_dateIndex]][arg_adType]) {
      tmp_adCounts[dates_array[arg_dateIndex]][arg_adType] = 0;
      tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType] = parseInt(tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType]) - 1;
    }

    document.getElementById(arg_adType + 'AdCount_incrementButton').addEventListener('click', function () {
      insertAdCounterBox(arg_dateIndex, tmp_adCounts, tmp_adCountChange);
      // Workaround for GM access checks/violations - setTimeout creates a closure
      // http://wiki.greasespot.net/Greasemonkey_access_violation
      setTimeout(function () {
        pr['ownAdCountTally'].setValue(tmp_adCounts);
      }, 0);
    }, false);
  }

  function addDecrementListener(arg_adType, arg_oldAdCounts, arg_tmp_adCountChange_currentPageview) {
    var tmp_adCounts = {};
    Object_merge(tmp_adCounts, arg_oldAdCounts);

    var tmp_adCountChange = {};
    Object_merge(tmp_adCountChange, arg_tmp_adCountChange_currentPageview);

    tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType] = parseInt(tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType]) - 1;
    tmp_adCounts[dates_array[arg_dateIndex]][arg_adType] = parseInt(arg_oldAdCounts[dates_array[arg_dateIndex]][arg_adType]) - 1;

    //If the adcount is less than zero, reset it to 0 (cannot click fewer than zero of any ad-type) and undo the change
    // to the adcount for the current pageview
    if (0 > tmp_adCounts[dates_array[arg_dateIndex]][arg_adType]) {
      tmp_adCounts[dates_array[arg_dateIndex]][arg_adType] = 0;
      tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType] = parseInt(tmp_adCountChange[dates_array[arg_dateIndex]][arg_adType]) + 1;
    }

    document.getElementById(arg_adType + 'AdCount_decrementButton').addEventListener('click', function () {
      insertAdCounterBox(arg_dateIndex, tmp_adCounts, tmp_adCountChange);
      // Workaround for GM access checks/violations - setTimeout creates a closure
      // http://wiki.greasespot.net/Greasemonkey_access_violation
      setTimeout(function () {
        pr['ownAdCountTally'].setValue(tmp_adCounts);
      }, 0);
    }, false);
  }

  // Loop through the different ad types and call the function that adds the click events for the increment and decrement buttons
  for (var tmp_label in arg_adCounts[dates_array[arg_dateIndex]]) {
    if (arg_adCounts[dates_array[arg_dateIndex]].hasOwnProperty(tmp_label)) {
      addDecrementListener(tmp_label, arg_adCounts, arg_adCountChange_currentPageview);
      addIncrementListener(tmp_label, arg_adCounts, arg_adCountChange_currentPageview);
    }
  }
}


function addClickStatsToGoldenGraph() {
  function mk_ch_ref(x, o, w0, w, O, L, m, arg_refName) {
    console.info(arguments);
    if (0 == m) {
      n = [0, 0, 0];
    } else {
      n = m;
    }
    var s1 = 20,
        s2 = 20,
        s3 = 20,
        s4 = 50;
    if (1 == L) {
      s3 = 30;
    }
    var g = [s1, s2, s3, s4];
    var chart = new(Highcharts.Chart)({
      chart: {
        renderTo: x,
        defaultSeriesType: "line",
        margin: g,
        showAxes: 1,
        borderWidth: 0,
        shadow: 0
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: o,
        labels: {
          enabled: 0
        },
        tickmarkPlacement: "on",
        gridLineWidth: 1,
        lineColor: "#fff",
        tickColor: "#fff",
        gridLineColor: "#ddd"
      },
      yAxis: {
        title: {
          enabled: 0,
          text: null
        },
        min: -0.1,
        endOnTick: 0,
        startOnTick: 0,
        tickPixelInterval: 20,
        plotLines: [{
          value: 0,
          width: 1,
          color: "#888"
        }]
      },
      tooltip: {
        formatter: function () {
          return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + w0 + this.y + " " + w;
        }
      },
      legend: {
        enabled: L,
        layout: "horizontal",
        symbolWidth: 5,
        style: {
          left: "auto",
          bottom: "5px",
          right: "5px",
          top: "auto",
          font: "normal 12px Verdana, sans-serif"
        }
      },
      plotOptions: {
        line: {
          lineWidth: 2,
          marker: {
            enabled: 1,
            symbol: "circle",
            radius: 3,
            states: {
              hover: {
                enabled: 1,
                radius: 5
              }
            }
          }
        }
      },
      series: O,
      credits: {
        enabled: 0
      }
    });


    /*start extra stuff added to the function*/
    var newElmnt = document.createElement('div');
    // console.info('O[0].data: ', O[0].data);
    var disp_clicks = "Clicks:";
    var disp_sum = "Sums:";
    var disp_avg = "Avgs:";

    var clicks = [];
    var sum = [];
    var avg = [];

    var tmp_referralsData = pr['referrals'].getValue();
    var tmp_refId = arg_refName.match(/\d+/);
    tmp_referralsData[tmp_refId] = tmp_referralsData[tmp_refId] || {};
    tmp_referralsData[tmp_refId].goldenGraphClickData = tmp_referralsData[tmp_refId].goldenGraphClickData || {};

    for (var i = 0; i < O[0].data.length; i++) {
      disp_clicks += ' ' + O[0].data[i];
      clicks[i] = O[0].data[i];
      tmp_referralsData[tmp_refId].goldenGraphClickData[dates_array[i]] = clicks[i];
    }

    for (var i = O[0].data.length - 1; 0 <= i; i--) {
      sum[i] = ('undefined' !== typeof sum[i + 1]) ? clicks[i] + sum[i + 1] : clicks[i];
      avg[i] = (sum[i] / (O[0].data.length - i)).toFixed(1);
    }

    newElmnt.innerHTML = '<table class="refGraphDatabar">' +
        '<tr><td>'+ [
          'Day # '+'</td><td>'+[9,8,7,6,5,4,3,2,1,0].join('</td><td>'),
          'Clicks:'+'</td><td>'+clicks.join('</td><td>'),
          'Sum: '+'</td><td>'+sum.join('</td><td>'),
          'Avg: '+'</td><td>'+avg.join('</td><td>')].join('</td></tr><tr><td>') +
        '</td></tr>' +
        '</table>';

    newElmnt.style.padding = '0 1.5em 1em';

    document.getElementById(x).style.minHeight = '130px';
    document.getElementById(x).style.height = '';
    // document.getElementById(x).style.minWidth = '280px';
    document.getElementById(x).style.width = '280px';
    document.getElementById(x).style.textAlign = 'center';
    document.getElementById(x).appendChild(newElmnt);
  }


  function ved_cht(o, p) {
    out = eval(p);
    var lg = out.length == 3 ? 1 : 0;
    if (out.length == 3) {
      tmp = [{
        name: "Clicks",
        data: out[1]
      }, {
        name: "Credited clicks",
        data: out[2]
      }];
    } else {
      tmp = [{
        name: "Credited clicks",
        data: out[1]
      }];
    }
    d("chtdiv_t").innerHTML = "Click statistics for:&nbsp;<span class=\"f_b\" style=\"font-size:12px;\">" + out[0] + "</span>";
    mk_ch_ref("chtdiv",
        [dates_array[9], dates_array[8], dates_array[7], dates_array[6], dates_array[5], dates_array[4], dates_array[3], dates_array[2], dates_array[1], dates_array[0]],
        "",
        "",
        tmp,
        lg,
        0,
        out[0]);
  }

  GM_addStyle(".refGraphDatabar { border-collapse: collapse; }" +
      ".refGraphDatabar tbody tr td { font-size: x-small; padding:0 1px; border: 1px solid black; }");

  // console.info('mk_ch_ref.toString() : ', mk_ch_ref.toString());
  // var script = document.createElement("script");
  // script.setAttribute('type', 'text/javascript');
  // script.text = ved_cht.toString();
  // document.body.appendChild(script);
  var script = document.createElement("script");
  script.setAttribute('type', 'text/javascript');
  script.text = mk_ch_ref.toString();
  document.body.appendChild(script);

}

var referralListings_columns = new function () {
  var colHeaderIndexes = {
    refID: 1,
    refSince: 2,
    refSince_DHM: 2,
    nextPayment: 3,
    nextPayment_DHM: 3,
    lastClick: 4,
    lastClick_D: 4
  };
  var colIndexes = {
    refID: 3,
    refSince: 4,
    refSince_DHM: 4,
    nextPayment: 5,
    nextPayment_DHM: 5,
    lastClick: 6,
    lastClick_D: 6
  };

  if(currentPage.pageCode.match(/direct/i)) {
    var colHeaderIndexes = {
      refID: 1,
      cameFrom: 2,
      refSince: 3,
      refSince_DHM: 3,
      lastClick: 4,
      lastClick_D: 4
    };
    var colIndexes = {
      refID: 1,
      cameFrom: 2,
      refSince: 3,
      refSince_DHM: 3,
      lastClick: 4,
      lastClick_D: 4
    };
  }

  function addColumn(arg_row, arg_columnText, arg_colId, arg_options) {
    var tmp_newColumn;
    var tmp_customCSS = ( arg_options.hasOwnProperty('customCSS') ) ? arg_options['customCSS'] : '';

    // debugLog(arg_colId);
    var tmp_existingCol = document.getElementById(arg_colId);
    if (tmp_existingCol) {
      tmp_existingCol.parentNode.removeChild(tmp_existingCol);
    }

    /** NB: container needs to be a table otherwise Firefox disposes of the contaning <td>
* due to it not being within a suitable containing element
**/
    var tmp_container = document.createElement('table');
    tmp_container.innerHTML = '' +
        '<tbody><tr><td id="'+arg_colId+'"' +
        ' class="'+arg_row.children[arg_row.children.length - 1].getAttribute('class')+'"' +
        ' style="'+arg_row.children[arg_row.children.length - 1].getAttribute('style') +
        tmp_customCSS+'"' +
        '>' +
        arg_columnText+
        '</td></tr></tbody>';

    tmp_newColumn = tmp_container.children[0].children[0].children[0];
    arg_row.appendChild(tmp_newColumn);
    colCount++;

  }
  
  function appendToColumnContents(arg_row, arg_columnText, arg_colIndex, arg_options) {
    var tmp_customCSS = '';
    tmp_customCSS = arg_options['customCSS'] || '';

    // debugLog(arg_colIndex);

    var tmp_existingCol = arg_row.children[arg_colIndex];
    if (!tmp_existingCol) {
      console.info("Error! appendToColumnContents() - invalid column index. \nArguments:");
      console.info('arg_row.innerText = ', arg_row.innerText);
      console.info(arguments);
      return false;
// throw "Error! appendToColumnContents() - invalid column index. \nArguments:"
    }

    //Add to the end of the column's innerHTML
    tmp_existingCol.innerHTML = tmp_existingCol.innerHTML + '<span style="' + tmp_customCSS + '">' + arg_columnText + '</span>';
    return tmp_existingCol;
  }

  function prependToColumnContents(arg_row, arg_columnText, arg_colIndex, arg_options) {
    var tmp_customCSS = '';
    tmp_customCSS = arg_options['customCSS'] || '';

    // debugLog(arg_colIndex);

    var tmp_existingCol = arg_row.children[arg_colIndex];
    if (!tmp_existingCol) {
      console.info("Error! prependToColumnContents() - invalid column index. \nArguments:");
      console.info(arguments);
      return false;
// throw "Error! prependToColumnContents() - invalid column index. \nArguments:"
    }

    //Add to the beginning of the column's innerHTML
    tmp_existingCol.innerHTML = '<span style="' + tmp_customCSS + '">' + arg_columnText + '</span>' + tmp_existingCol.innerHTML;
    return tmp_existingCol;
  }

  function replaceColumnContents(arg_row, arg_columnText, arg_colIndex, arg_options) {
    var tmp_customCSS = '';
    tmp_customCSS = arg_options['customCSS'] || '';

    // debugLog(arg_colIndex);

    var tmp_existingCol = arg_row.children[arg_colIndex];
    if (!tmp_existingCol) {
      console.info("Error! replaceColumnContents() - invalid column index. \nArguments:");
      console.info(arguments);
      return false;
// throw "Error! replaceColumnContents() - invalid column index. \nArguments:"
    }

    if(
        tmp_existingCol.children.length > 0 &&
        (tmp_existingCol.children[0].tagName.toLowerCase() === 'a' || tmp_existingCol.children[0].nodeName.toLowerCase() === 'a')
        )
    {
      tmp_existingCol = tmp_existingCol.children[0];
    }

    //Replace the column's innerHTML
    tmp_existingCol.innerHTML = '<span style="' + tmp_customCSS + '">' + arg_columnText + '</span>';
    return tmp_existingCol;
  }

  function dateToDHM(arg_date) {
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var now = new Date();

    // debugLog('now: ', now, 'another date: ', arg_date);
    var t_diff = new Date(arg_date) - now;

    var future = (0 < t_diff);
    var remaining_time = (0 < t_diff) ? t_diff : t_diff * -1;

    var diff_days = Math.floor(remaining_time / oneDay);
    remaining_time -= diff_days * oneDay;

    var diff_hrs = Math.floor(remaining_time / oneHour);
    remaining_time -= diff_hrs * oneHour;

    var diff_mins = Math.floor(remaining_time / oneMinute);
    remaining_time -= diff_mins * oneMinute;

    var diff_secs = Math.floor(remaining_time / oneSecond);
    remaining_time -= diff_secs * oneSecond;

    return ''+
        diff_days+'d'+
        ', '+diff_hrs+'h'+
        ', '+diff_mins+'m'+
      // ', '+diff_secs+'s'+
        '';
  }

  function dateToD(arg_date) {
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var now = new Date();
    var t_diff = new Date(arg_date) - now;

    var future = (0 < t_diff);
    var remaining_time = (0 < t_diff) ? t_diff : t_diff * -1;

    var diff_days = Math.floor(remaining_time / oneDay);
    remaining_time -= diff_days * oneDay;

    if (isNaN(diff_days)) {
      return '--';
    }

    return diff_days + 'd';
  }

  function nextPaymentStringToDate(arg_nextPaymentString) {
    arg_nextPaymentString = arg_nextPaymentString.toString();
    // debugLog('nextPaymentStringToDate: \n', 'arg_nextPaymentString : ', arg_nextPaymentString);
    var onesec = 1000;
    var onemin = onesec * 60;
    var onehr = onemin * 60;
    var oneday = onehr * 24;

    /* nb: bugfix - occasionally neobux displafs displays a negative # of hours for the next payment date which breaks the regex */
    // var spliced = arg_nextPaymentString.match(/([0-9]+).*([0-9]{2}):([0-9]{2})/);
    var spliced = arg_nextPaymentString.match(/([0-9]+)[^-]*(-?[0-9]{2}):([0-9]{2})/);
    var tmp_days = spliced[1] * 1;
    var tmp_hours = spliced[2] * 1;
    var tmp_mins = spliced[3] * 1;

    var tmp_date = new Date( (new Date()*1) +
        (tmp_days * oneday) +
        (tmp_hours * onehr) +
        (tmp_mins * onemin) );

    return tmp_date;

  }

  this.editHeaderRow = function () {

  }

  this.mainLoop = function () {
    var loopCounter = 0;
    var tmp_currentID, tmp_income, tmp_value;
    var tmp_dhmOwned;

    var headerCol_idPrefix = 'header_';
    var newCol_idPrefix = ''; // set within the loop

    function COLUMN(arg_colType, arg_colPrefix, arg_colSuffix, arg_colHeaderText, arg_inclMemberType, arg_exclMemberType, arg_customCSS) {
      if(arguments.length !== 7) {
        console.info('arguments:', arguments);
        throw 'ERROR! Not enough arguments to create a COLUMN()';
      }
      
      this.colType = arg_colType;
      this.colPrefix = arg_colPrefix;
// this.colReplacementText = arg_replacementColumnText;
      this.colSuffix = arg_colSuffix;
      this.colHeaderText = arg_colHeaderText;
      this.inclMemberType = arg_inclMemberType;
      this.exclMemberType = arg_exclMemberType;
      this.customCSS = arg_customCSS;
    }

    var tmp_defaultCSS = 'letter-spacing: -1px;';
    var tmp_dhmCSS = 'color: #333; font-size: 90%; font-style: italic;';
    
    var columns = {
      totalIncomeCol: new COLUMN('new', '$', '', '<small>Total Income</small>', [], [], tmp_defaultCSS),
      totalExpensesCol: new COLUMN('new', '$', '', '<small>Total Expenses</small>', [], [], tmp_defaultCSS),
      netIncome: new COLUMN('new', '$', '', '<small>Net Income</small>', [], [], 'letter-spacing: 0px;'),
// clickValues: new COLUMN('new', '', '', '<small>Ultimate Click Values</small>', ['Ultimate'], [], tmp_defaultCSS),
      refSince_DHM: new COLUMN('append', '', '', ' <small>[D/H/M]</small>', [], [], tmp_dhmCSS),
      lastClick_D: new COLUMN('append', '', '', ' <small>[D]</small>', [], [], tmp_dhmCSS)
    };

    if(true === pr['showRefClicks'].getValue()) {
      columns['refClicks'] = new COLUMN('new', '', '', ' <small>Clicks</small>', [], [], 'font-size: 90%; letter-spacing: 0;');
    }

    if (currentPage.pageCode.match(/referralListings_Rented/i)) {
      columns.textifyFlag = new COLUMN('new', '', '', '<small>Flag Colour', [], [], tmp_defaultCSS);
      columns.nextPayment_DHM = new COLUMN('replace', '', '', '<small>D/H/M Next Payment</small>', [], [], '');
    }
    if (currentPage.pageCode.match(/referralListings_Direct/i)) {}

    //Add header row columns
    for (var columnName in columns) {
      if (columns.hasOwnProperty(columnName)) {
        if (columns[columnName].inclMemberType.length > 0) {
          //If membersip type not found on the includes list, continue
          if (columns[columnName].inclMemberType.indexOf(userAccount.membershipType) === -1) {
            continue;
          }
        }
        if (columns[columnName].exclMemberType.length > 0) {
          //If membership type found on the excludes list, continue
          if (columns[columnName].exclMemberType.indexOf(userAccount.membershipType) >= 0) {
            continue;
          }
        }
        console.info('columnName = ',columnName);
        switch (columns[columnName].colType)
        {
          case 'new':
            addColumn(headerRow, columns[columnName].colHeaderText, headerCol_idPrefix + columnName, {});
            break;
          case 'append':
            appendToColumnContents(headerRow, columns[columnName].colHeaderText, colHeaderIndexes[columnName], {});
            break;
          case 'prepend':
            prependToColumnContents(headerRow, columns[columnName].colHeaderText, colHeaderIndexes[columnName], {});
            break;
          case 'replace':
            replaceColumnContents(headerRow, columns[columnName].colHeaderText, colHeaderIndexes[columnName], {});
            break;
        }
      }
    }

    var tmp_colspans = document.querySelectorAll('div#tblprp td[colspan]');
    for (var i = 1; i < tmp_colspans.length - 1; i++) {
      tmp_colspans[i], tmp_colspans[i].setAttribute('colspan', colCount);
    }

    var extensionCostPerDay = userAccount.feesCosts.extensions[preferences.preferredExtensionLength] / preferences.preferredExtensionLength;
    var goldenFeePerDay = currentUser.accountType.cost / 365;
    var goldenFeePerDayPerReferral = goldenFeePerDay / currentUser.numberOfRefs.Rented;

    var costPerReferralPerDay = extensionCostPerDay; // + goldenFeePerDayPerReferral;
    var incomeExpenses = {};

    for (var i = 0; i < referralRows.length; i++) {
      tmp_currentRow = referralRows[i];

      tmp_currentID = tmp_currentRow.children[colIndexes.refID].textContent.match(/[0-9]+/) || tmp_currentRow.children[colIndexes.refID].textContent.match(/[a-z]+/);
      tmp_currentID = tmp_currentID[0];
      tmp_currentID = (tmp_currentID.length > 0) ? tmp_currentID : tmp_currentRow.children[colIndexes.refID].textContent;

      tmp_currentRow.id = tmp_currentID;
      tmp_currentRow.setAttribute('class', tmp_currentRow.getAttribute('class') + ' referralRow');

      incomeExpenses[tmp_currentID] = incomeExpenses[tmp_currentID] || {};

      if (currentPage.pageCode.match(/referralListings_Rented/)) {
        incomeExpenses[tmp_currentID].totalIncome = (tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].totalClicks * userAccount.clickValues['Fixed'].commission.rented).toFixed(3);
        incomeExpenses[tmp_currentID].totalExpenses = (tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].age_dec * costPerReferralPerDay).toFixed(3);
      } else if (currentPage.pageCode.match(/referralListings_Direct/)) {
        incomeExpenses[tmp_currentID].totalIncome = (tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].totalClicks * userAccount.clickValues['Fixed'].commission.direct).toFixed(3);
        incomeExpenses[tmp_currentID].totalExpenses = 0;
      }

      GM_addStyle('.referralRow { letter-spacing: -0.01em; }');

      newCol_idPrefix = tmp_currentID + '_';
      for (var columnName in columns) {
        if (columns.hasOwnProperty(columnName)) {
          if (columns[columnName].inclMemberType.length > 0) {
            //If membersip type not found on the includes list, continue
            if (columns[columnName].inclMemberType.indexOf(userAccount.membershipType) === -1) {
              continue;
            }
          }
          if (columns[columnName].exclMemberType.length > 0) {
            //If membership type found on the excludes list, continue
            if (columns[columnName].exclMemberType.indexOf(userAccount.membershipType) >= 0) {
              continue;
            }
          }
          switch (columnName) {
            case 'totalIncomeCol':
              tmp_value = incomeExpenses[tmp_currentID].totalIncome;
              break;
            case 'totalExpensesCol':
              tmp_value = incomeExpenses[tmp_currentID].totalExpenses;
              break;
            case 'netIncome':
              tmp_value = (incomeExpenses[tmp_currentID].totalIncome - incomeExpenses[tmp_currentID].totalExpenses).toFixed(3);
              if(tmp_value < 0) {
                  tmp_value = '<span style="color: red;">'+tmp_value+'</span>';
                }
                if(tmp_value > 0 && tmp_value < userAccount.feesCosts.recycle) {
                  tmp_value = '<span style="color: blue;">'+tmp_value+'</span>';
                }
                if(tmp_value > userAccount.feesCosts.recycle) {
                  tmp_value = '<span style="color: green;">'+tmp_value+'</span>';
                }
              break;
            case 'clickValues':
              // console.info(tmp_referralsData[tmp_currentID].ultimateClickValues.clicks);
              tmp_value = '<small><i>|';
              // console.info('tmp_referralsData[tmp_currentID] = ', tmp_referralsData[tmp_currentID], JSON.stringify(tmp_referralsData[tmp_currentID]));
              for (var j = 0; j < 10; j++) {
                tmp_value += tmp_referralsData[tmp_currentID].ultimateClickData[dates_array[j]].creditedClicks.toString() + '|';
              }
              tmp_value += '</i></small>';
              // tmp_value = tmp_referralsData[tmp_currentID].ultimateClickValues.clicks.join(', ') || "Error";
              break;
            case 'refSince_DHM':
              tmp_value = dateToDHM(new Date(tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].referralSince));
              break;
            case 'nextPayment_DHM':
              tmp_value = dateToDHM(new Date(tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].nextPayment));
              break;
            case 'lastClick_D':
              tmp_value = dateToD(new Date(tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].lastClick));
              break;
            case 'textifyFlag':
              tmp_value = tmp_referralsData[tmp_currentID].referralListingsData[dates_array[0]].flagColour.split('')[0] || "Unknown".split('')[0] || 'E';
              break;
            case 'refClicks':
              var curRef;
              var curRef_ListingsData;
              var data_totalClicks = [];
              var data_dailyClicks = [];
              var lastValidDateIndex = 0;
              var clicksSinceLastValidDateIndex;

              curRef = tmp_referralsData[tmp_currentID];
              curRef_ListingsData = curRef.referralListingsData;

// console.info('curRef\n',curRef);

              data_totalClicks = [];
              data_dailyClicks = [];


// console.info('loopCounter = ',loopCounter);
                
// loopCounter++;
// if(loopCounter > 3) { throw ""; }

              for(var dateCounter = 9; dateCounter >= 0; dateCounter--) {
                if(curRef_ListingsData[dates_array[dateCounter]]) {
// console.info('dateCounter = ',dateCounter);

                  data_totalClicks.push(curRef_ListingsData[dates_array[dateCounter]].totalClicks);

// console.info('curRef_ListingsData[dates_array[dateCounter]].totalClicks = ',curRef_ListingsData[dates_array[dateCounter]].totalClicks);

                  clicksSinceLastValidDateIndex = (lastValidDateIndex === 0 ) ? curRef_ListingsData[dates_array[dateCounter]].totalClicks : curRef_ListingsData[dates_array[dateCounter]].totalClicks - curRef_ListingsData[dates_array[lastValidDateIndex]].totalClicks;
                  data_dailyClicks.push(clicksSinceLastValidDateIndex);

// console.info('clicksSinceLastValidDateIndex = ',clicksSinceLastValidDateIndex);

                  lastValidDateIndex = dateCounter;
                }
                else {
                  data_totalClicks.push('#');
                  data_dailyClicks.push('#');
                }
              }

// console.info(data_totalClicks);
// console.info(data_dailyClicks);

              tmp_value = data_dailyClicks.join(' | ') || 'Error';
              break;
          }


          switch (columns[columnName].colType) {
            case 'new':
              try {
                addColumn(tmp_currentRow, columns[columnName].colPrefix + tmp_value + columns[columnName].colSuffix, newCol_idPrefix + columnName, { "customCSS": columns[columnName].customCSS });
                addColumn(tmp_currentRow, columns[columnName].colPrefix + tmp_value + columns[columnName].colSuffix, newCol_idPrefix + columnName, { "customCSS": columns[columnName].customCSS });
              } catch (e)
              {
                errorLog('error with new column - ' + columnName + ' ::\n', e);
              }
              break;
            case 'append':
              appendToColumnContents(tmp_currentRow, '[' + tmp_value + columns[columnName].colSuffix + ']', colIndexes[columnName], { "customCSS": columns[columnName].customCSS });
              break;
            case 'prepend':
              prependToColumnContents(tmp_currentRow, '[' + columns[columnName].colPrefix + tmp_value + ']', colIndexes[columnName], { "customCSS": columns[columnName].customCSS });
              break;
            case 'replace':
              replaceColumnContents(tmp_currentRow, columns[columnName].colPrefix + tmp_value + columns[columnName].colSuffix, colIndexes[columnName], { "customCSS": columns[columnName].customCSS });
              break;
          }
        }
      }
    }
  }

  this.init = function (arg_options) {
    var settings = {};
    var headerRow = document.querySelectorAll('div#tblprp table tr[onmouseover]')[0].parentNode.children[0];
    var referralRows = document.querySelectorAll('div#tblprp tr[onmouseover]');
    var tmp_currentRow;

    var colCount = document.querySelectorAll('div#tblprp td[colspan]')[1].getAttribute('colspan');

    var tmp_referralsData = pr['referrals'].getValue();
  }
};


function insertSidebar() {
  // Function which inserts the 'Statistics Sidebar' to the referral statistics page
  modalCheckpoint('inside function insertSidebar() {');

  // Location to insert the sidebar (right hand side)
  var locationToInsertSidebar = {
    right: docEvaluate("//td[@width='729']").snapshotItem(0).parentNode || document.body,
    left: document.body.children[1].children[1].children[0].children[0].children[0] || document.body
  };

  //Functions to quickly decide if info should be shown
  function showInfo(arg_toDisplay, arg_refType) {
    return (0 < currentUser.numberOfRefs[arg_refType]) ? arg_toDisplay : '';
  }
  /*Show if user has rented referrals*/
  function SIRR(arg_toDisplay) {
    return (0 < currentUser.numberOfRefs.Rented) ? arg_toDisplay : '';
  }
  /*Show if user has direct referrals*/
  function SIDR(arg_toDisplay) {
    return (0 < currentUser.numberOfRefs.Direct) ? arg_toDisplay : '';
  }
  /*Show if user has referrals*/
  function SIR(arg_toDisplay) {
    return (0 < currentUser.numberOfRefs.Direct || 0 < currentUser.numberOfRefs.Rented) ? arg_toDisplay : '';
  }


  function outputIfExists(arg_varToOutput, arg_textToDisplayOtherwise) {
    try {
      return arg_varToOutput;
    } catch (e) {
      return arg_textToDisplayOtherwise;
    }
  }

  var sidebarStyle = ""+
      "#sidebarContainer { background-color:#FFFFFF; background-repeat:no-repeat; border:1px solid #AAAAAA; margin-left:5px; padding:0 10px 15px 8px; vertical-align:top; width:182px; }" +
      ".leftSide { position: inline-block; opacity: 1; }" +
      ".rightSide { position: relative; right: 2px; top:0; }" +
      ".sidebarContent { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: x-small !important; }" +
      ".sidebarHeader { display:block; font-size:1.1em; text-align:center; } " +
      ".sidebarDetails { font-size: x-small; margin-left: 5px; } " +
      "h4 { color: #444; margin-top: 10px; margin-bottom:2px } " +
      "h5 { margin-top: 7px; margin-bottom:2px; margin-left:2px; } " +
      "h6 { font-size: xx-small !important; margin-top: 2px; margin-bottom:2px } " +
      ".h5_subHead { margin-top:2px; font-size:xx-small; } " +
      ".bold { font-weight: bold; } " +
      ".grey { color: #aaa; }";

  GM_addStyle(sidebarStyle);


  // Time periods for the statistics sidebar where:
  // 0=today, 1=1day ago, 14=14days ago etc
  // [
  // [starting day, ending day],
  // [next time periods....],
  // [another time period....],
  // [etc..]
  // ]
  var sidebarTimePeriods = [[0,0], [1,1], [0,6], [1,6], [0,9], [1,9]];
  var tmp_dataSet = pr['accountCache'].getValue({});

  var tmp_projectedClickAvg_rented = parseFloat(document.querySelectorAll('span.f_b')[4].textContent);
  var tmp_projectedClickAvg_direct = parseFloat(document.querySelectorAll('span.f_b')[2].textContent);

  var startDay;
  var endDay;
  var sidebarData;
  var currentSidebarTimePeriod;
  var showProjected;

  var tmp_sum = [],
      tmp_currentValue = [],
      tmp_average = [];
  var tmp_currentDate;
  var tmp_foobar;

  var dataIsComplete = {};


  //Remove the existing sidebar from the DOM if it already exists
  if (document.getElementById("sidebarContainer")) {
    document.getElementById("sidebarContainer").parentNode.removeChild(document.getElementById("sidebarContainer"));
  }


  //Create new sidebar
  var sidebarContainer = document.createElement("div");
  sidebarContainer.id = "sidebarContainer";

  var tmp = "";
  tmp += "<span class='sidebarContent'>";
  tmp += "<span class='sidebarHeader'>";
  tmp += "<h4 class='bold'>" + tl8('Statistics Summary') + "</h4>";
  tmp += "<i>" + tl8('Rented') + ": " + currentUser.numberOfRefs.Rented + " / " + tl8('Direct') + ": " + currentUser.numberOfRefs.Direct + "</i><br>";
  tmp += "<i>" + tl8('Total') + ": " + (currentUser.numberOfRefs.Rented + currentUser.numberOfRefs.Direct) + "</i>";
  tmp += " </span>";


  var maxTimePeriod = 0;
  var minTimePeriod = 0;


  /**
* Check for the min and max time period size
* Also create list of timePeriods taht are valid
*/

  var timePeriods = [];
  var startDay, endDay;

  for (var i = 0; i < sidebarTimePeriods.length; i++) {
    currentSidebarTimePeriod = sidebarTimePeriods[i];

    if (2 !== currentSidebarTimePeriod.length) {
      errorLog("ERROR!\n\n", "Sidebar Timeperiods incorrect length (" + currentSidebarTimePeriod.length + ") not 2. Moving onto next time period.");
      continue;
    }
    if (!(0 <= currentSidebarTimePeriod[0]) || !(0 <= currentSidebarTimePeriod[1])) {
      errorLog("ERROR!\n\n", "Sidebar Timeperiod #" + i + " is not numerical. Moving onto next time period.");
      continue;
    }
    if (currentSidebarTimePeriod[0] > currentSidebarTimePeriod[1]) {
      errorLog("Error!\n\n", "Sidebar Timeperiod #" + i + ' is not in the correct order (end day is earlier than the start day). Moving onto next time period');
      continue;
    }

    //Determine which one is the start or end day & fix the order of the time periods if the order is malformed
    if (currentSidebarTimePeriod[0] <= currentSidebarTimePeriod[1]) {
      startDay = currentSidebarTimePeriod[0];
      endDay = currentSidebarTimePeriod[1];
    } else {
      startDay = currentSidebarTimePeriod[1];
      endDay = currentSidebarTimePeriod[0];
    }

    minTimePeriod = (startDay <= minTimePeriod) ? startDay : minTimePeriod;
    maxTimePeriod = (endDay >= maxTimePeriod) ? endDay : maxTimePeriod;

    timePeriods[i] = [startDay, endDay];
  }


  function createLookupList(arg_startDay, arg_endDay) {
    function generateSidebarData (arg_projectedClicks_Rented, arg_projectedClicks_Direct) {

      var sdbr = {};
      sdbr.projectedClicks = {};
      sdbr.projectedClicks['Rented'] = currentUser.numberOfRefs.Rented * arg_projectedClicks_Rented;
      sdbr.projectedClicks['Direct'] = currentUser.numberOfRefs.Direct * arg_projectedClicks_Direct;
      sdbr.projectedClicks['Total'] = sdbr.projectedClicks['Rented'] + sdbr.projectedClicks['Direct'];

      sdbr.projectedIncome = {};
      sdbr.projectedIncome['Rented'] = (sdbr.projectedClicks['Rented'] * userAccount.clickValues['Fixed'].commission.rented);
      sdbr.projectedIncome['Direct'] = (sdbr.projectedClicks['Direct'] * userAccount.clickValues['Fixed'].commission.direct);
      sdbr.projectedIncome['Total'] = (sdbr.projectedIncome['Rented'] + sdbr.projectedIncome['Direct']);

      return sdbr;
    }

    var tmp_sidebarData = generateSidebarData(tmp_projectedClickAvg_rented, tmp_projectedClickAvg_direct);

    
    /**
* Loop through the max ranges of the time periods and create a lookup list of data in this range
*/
    for (var dayCounterIndex = arg_startDay; dayCounterIndex <= arg_endDay; dayCounterIndex++) {

      //Default showing the projected values for the current time period to false and only enable it if required
      showProjected = (0 === dayCounterIndex) ? true: false;
      tmp_currentDate = dates_array[dayCounterIndex];

      //Check whether data is stored for the current date
      if ("undefined" === typeof tmp_dataSet.graphs[tmp_currentDate]) {
        errorLog("Data for this for this date (" + tmp_currentDate + ") is not found.");

        //Dataset for current date is missing, thus mark it as such
        dataIsComplete[tmp_currentDate] = 'missing';
        continue;
      }

      //Loop through the data contained for the current date,
      for (var tmpGraphIndex in lookup_graphCache) {
        if (lookup_graphCache.hasOwnProperty(tmpGraphIndex)) {

          //Skip the sceheduled payments graph
          if (tmpGraphIndex.match(/ch_ext_schedule/i)) {
            continue;
          }
          
          //Check whether data exists for the current graph & date, else continue
          if ("undefined" === typeof tmp_dataSet.graphs[tmp_currentDate][lookup_graphCache[tmpGraphIndex]]) {
            //Data for this specific graph {} is not found for this date {}
            errorLog("Data for this specific graph (" + tmpGraphIndex + " / " + lookup_graphCache[tmpGraphIndex] + ") is not found for this date (" + tmp_currentDate + ").");
            continue;
          }

          //If the sum[] object does not exist, create it
          if (!tmp_sum[lookup_graphCache[tmpGraphIndex]]) {
            tmp_sum[lookup_graphCache[tmpGraphIndex]] = {};
          }
          
          //Calculations
          tmp_currentValue = tmp_dataSet.graphs[tmp_currentDate][lookup_graphCache[tmpGraphIndex]];
          tmp_sum[lookup_graphCache[tmpGraphIndex]][dayCounterIndex] = ("undefined" === typeof tmp_sum[lookup_graphCache[tmpGraphIndex]][dayCounterIndex - 1]) ? tmp_currentValue : tmp_sum[lookup_graphCache[tmpGraphIndex]][dayCounterIndex - 1] + tmp_currentValue;
          tmp_average[dayCounterIndex] = tmp_sum[lookup_graphCache[tmpGraphIndex]][[dayCounterIndex]] / (dayCounterIndex + 1);

          //If the tmp_sidebarData[] object does not exist, create it
          if ("undefined" === typeof tmp_sidebarData[lookup_graphCache[tmpGraphIndex]]) {
            tmp_sidebarData[lookup_graphCache[tmpGraphIndex]] = {};
          }

          //Insert calculated values to the tmp_sidebarData[] object
          tmp_sidebarData[lookup_graphCache[tmpGraphIndex]][tmp_currentDate] = {
            'value': tmp_currentValue,
            'sum': tmp_sum[lookup_graphCache[tmpGraphIndex]][dayCounterIndex],
            'avg': tmp_average[dayCounterIndex]
          };

// console.info(tmpGraphIndex);
          if(showProjected && tmpGraphIndex.match(/ch_cr/)) {
            if(!tmp_sidebarData.projectedClicks) { tmp_sidebarData.projectedClicks = {}; }
            tmp_sidebarData.projectedClicks['Rented'] = tmp_projectedClickAvg_rented * currentUser.numberOfRefs.Rented;
          }
          if(showProjected && tmpGraphIndex.match(/ch_cd/)) {
            if(!tmp_sidebarData.projectedClicks) { tmp_sidebarData.projectedClicks = {}; }
            tmp_sidebarData.projectedClicks['Direct'] = tmp_projectedClickAvg_direct * currentUser.numberOfRefs.Direct;
          }
        }
      }
    }
    return tmp_sidebarData;
  }

  sidebarData = createLookupList(minTimePeriod, maxTimePeriod);

  debugLog('sidebarData = ', sidebarData);

  for (var i=0; i<timePeriods.length; i++) {
    startDay = timePeriods[i][0];
    endDay = timePeriods[i][1];
    
    var header = tl8("Totals between ") + startDay + tl8(" Days Ago and ") + (endDay + 1) + tl8(" Days Ago");

    if (0 == startDay) {
      header = tl8("The last ") + (endDay + 1) + tl8(" Days <small>(incl. Today)</small>");
    }
    if (1 == startDay) {
      header = tl8("The last ") + (endDay + 1) + tl8(" Days <small>(excl. Today)</small>");
    }

    showProjected = false;
    if (startDay == endDay) {
      if (0 == endDay) {
        header = tl8("Today Only");
        showProjected = true;
      } else if (1 == endDay) {
        header = tl8("Yesterday Only");
      } else {
        header = startDay + tl8(" Days Ago Only");
      }
    }
    var numberOfDays = (endDay - startDay) + 1;

    var valueType = (1 === numberOfDays) ? 'value' : 'sum';
    var tmp_income = (sidebarData['referralClicks_rented'][dates_array[endDay]][valueType] * userAccount.clickValues['Fixed'].commission.rented) + (sidebarData['referralClicks_direct'][dates_array[endDay]][valueType] * userAccount.clickValues['Fixed'].commission.direct);
    var tmp_income_inclOwnClicks = tmp_income + (sidebarData['ownClicks_localTime'][dates_array[endDay]][valueType] * currentUser.ownClickValue);
    var tmp_expenses = sidebarData['recycleFees'][dates_array[endDay]][valueType] + sidebarData['extensions'][dates_array[endDay]][valueType] + sidebarData['autopay'][dates_array[endDay]][valueType] + (numberOfDays * currentUser.accountType.cost / 365);


    tmp += "<h5 class='bold grey'>[ " + header + " ]</h5>";
    if (!dataIsComplete) {
      tmp += "<span style='font-colour:pink;'>" + tl8('Incomplete') + "</span><br>";
    }
    tmp += "<span class='bold h5_subHead'>&nbsp; - " + tl8('Net') + " : $" + (tmp_income - tmp_expenses).toFixed(3) + " / $" + (tmp_income_inclOwnClicks - tmp_expenses).toFixed(3) + "</span>";
    tmp += "<hr width= '155px' height='1px' color='#cccccc'/>";

    tmp += "<h6 title='" + tl8('Details about your income sources for ') + header.toLowerCase() + "'> + Income</h6>";
    tmp += "<div class='sidebarDetails'>";
    tmp += "- " + tl8('Personal Clicks') + ": " + sidebarData['ownClicks_localTime'][dates_array[endDay]][valueType] + " / $" + (sidebarData['ownClicks_localTime'][dates_array[endDay]][valueType] * currentUser.ownClickValue).toFixed(3) + "<br>";
    tmp += SIRR("- " + tl8('Rented Clicks') + ": " + sidebarData['referralClicks_rented'][dates_array[endDay]][valueType] + " / $" + (sidebarData['referralClicks_rented'][dates_array[endDay]][valueType] * userAccount.clickValues['Fixed'].commission.rented).toFixed(3) + "<br>");
    tmp += SIDR("- " + tl8('Direct Clicks') + ": " + sidebarData['referralClicks_direct'][dates_array[endDay]][valueType] + " / $" + (sidebarData['referralClicks_direct'][dates_array[endDay]][valueType] * userAccount.clickValues['Fixed'].commission.direct).toFixed(3) + "<br>");
    tmp += "</div>";

    if (showProjected) {
      tmp += "<h6 title='" + tl8('Details about your income sources for ') + header.toLowerCase() + tl8(', based on the projected values') + "'> + " + tl8('Projected Income') + "</h6>";
      tmp += "<div class='sidebarDetails'>";
      tmp += SIRR("- " + tl8('Rented Clicks') + ": " + sidebarData['projectedClicks'].Rented.toFixed(2) + " / $" + (sidebarData['projectedIncome'].Rented).toFixed(3) + "<br>");
      tmp += SIDR("- " + tl8('Direct Clicks') + ": " + sidebarData['projectedClicks'].Direct.toFixed(2) + " / $" + (sidebarData['projectedClicks'].Direct).toFixed(3) + "<br>");
      tmp += "</div>";
    }

    tmp += "<h6 title='" + tl8('Details about your expenses for ') + header.toLowerCase() + "'> + " + tl8('Expenses') + "</h6>";
    tmp += "<div class='sidebarDetails'>";
    tmp += "- " + tl8('Recycles') + ": $" + sidebarData['recycleFees'][dates_array[endDay]][valueType].toFixed(2) + " / " + (sidebarData['recycleFees'][dates_array[endDay]][valueType] / currentUser.recycleFee).toFixed(0) + "<br>";
    tmp += "- " + tl8('Extensions') + ": $" + sidebarData['extensions'][dates_array[endDay]][valueType].toFixed(2) + "<br>";
    tmp += "- " + tl8('Autopay') + ": $" + sidebarData['autopay'][dates_array[endDay]][valueType].toFixed(3) + " / " + (sidebarData['autopay'][dates_array[endDay]][valueType] / currentUser.autopayFee) + "<br>";
    tmp += "- " + tl8('Golden Pack') + ": $" + (numberOfDays * currentUser.accountType['cost'] / 365).toFixed(3) + "<br>";
    tmp += "</div>";

    tmp += "<h6 title='Some statistics for clicks made " + header.toLowerCase() + "'> + Stats</h6>";
    tmp += "<div class='sidebarDetails'>";
    tmp += SIRR("- " + tl8('Rented Average') + ": " + (sidebarData['referralClicks_rented'][dates_array[endDay]][valueType] / (currentUser.numberOfRefs['Rented'] * numberOfDays)).toFixed(3) + "<br>");
    tmp += SIRR("- " + tl8("Rented 'Real' Average") + ": " + "---" + "<br>");
    tmp += SIDR("- " + tl8('Direct Average') + ": " + (sidebarData['referralClicks_direct'][dates_array[endDay]][valueType] / (currentUser.numberOfRefs['Direct'] * numberOfDays)).toFixed(3) + "<br>");
    tmp += SIDR("- " + tl8("Direct 'Real' Average") + ": " + "---" + "<br>");
    tmp += SIRR(SIDR("- " + tl8('Total Average') + ": " + ((sidebarData['referralClicks_rented'][dates_array[endDay]][valueType] + sidebarData['referralClicks_direct'][dates_array[endDay]][valueType]) / ((currentUser.numberOfRefs['Rented'] + currentUser.numberOfRefs['Direct']) * numberOfDays)).toFixed(3) + "<br>"));
    tmp += SIRR(SIDR("- " + tl8("Total 'Real' Average") + ": " + "---" + "<br>"));
    tmp += "</div>";

    tmp += "<h6 title='" + tl8('Summary of Income / Projected Income / Expenses / Profit for ') + header.toLowerCase() + tl8(' [nb: the second value includes an estimate of your personal clicks]') + "'> + " + tl8('Summary Totals') + "</h6>";
    tmp += "<div class='sidebarDetails'>";
    tmp += "- " + tl8('Gross Income') + ": $" + tmp_income.toFixed(3) + " / $" + tmp_income_inclOwnClicks.toFixed(3) + "<br>";
    if (showProjected) {
      tmp += "- " + tl8('Projected Gross Income') + ": $" + (sidebarData['projectedIncome'].Total.toFixed(3)) + "<br>";
    }
    tmp += "- " + tl8('Expenses') + ": $" + (tmp_expenses).toFixed(3) + "<br>";
    tmp += "- " + tl8('Net Income') + ": $" + (tmp_income - tmp_expenses).toFixed(3) + " / $" + (tmp_income_inclOwnClicks - tmp_expenses).toFixed(3) + "<br>";
    if (showProjected) {
      tmp += "- " + tl8('Projected Net Income') + ": $" + (sidebarData['projectedIncome'].Total - tmp_expenses).toFixed(3) + " / $" + (sidebarData['projectedIncome'].Total + (sidebarData['ownClicks_localTime'][dates_array[endDay]][valueType] * currentUser.ownClickValue) - tmp_expenses).toFixed(3) + "<br>";
    }
    tmp += "</div>";

  }

  tmp += "</span>";

  sidebarContainer.innerHTML = tmp;

  // // *** INSERT STATISTICS SUMMARY INTO PAGE *** ////
  var wrapperTD = document.createElement('td');
  wrapperTD.setAttribute('valign', 'top');
  wrapperTD.appendChild(sidebarContainer);

  var statsSidebarPosition = pr['statsSidebarPosition'].getValue();

  if ('right' === statsSidebarPosition) {
    // sidebarContainer.setAttribute('onmouseover', 'document.getElementById("sidebarContainer").style.opacity = "1";');
    // sidebarContainer.setAttribute('onmouseout', 'document.getElementById("sidebarContainer").style.opacity = "0.5";');
  }

  sidebarContainer.setAttribute('class', statsSidebarPosition + 'Side');
  locationToInsertSidebar[statsSidebarPosition].appendChild(wrapperTD);
}



function addSortingArrows(arg_headerRow)
{
  /**
* Adds sort ascending and descending arrows to all columns
*
* TODO: Check which column contains the gold arrow before removing them
* Currently uses the URL to determine which ordering method is in use
*/

  /**
* Name &ss1=2 &ss2= (1Asc/2Desc)??
* Ref Since &ss1=1 &ss2= (1Asc/2Desc) // Opposite to actual arrow directions
* Next Payment &ss1=5 &ss2= (2Asc/1Desc)
* Last Click &ss1=4 &ss2= (2Asc/1Desc) // Opposite to actual arrow directions
* Clicks &ss1=3 &ss2= (2Asc/1Desc)
* Average &ss1=7 &ss2= (2Asc/1Desc)
*
* &ss1 = column to be sorted by
* &ss2 = asc / desc
* &ss3 = direct / rented refs
*
*/

  var vars = new Array();
  // vars[n] = [ss1, ss2, ss3]
  // vars[n] = [colIndex, up, down]
  vars[1] = [2,2,1,'Sort by Referral ID#'];
  vars[2] = [1,1,2,'Sort by the total time that the referral has been Owned']; // Does not match existing arrow directions
  vars[3] = [5,2,1,'Sort by time until Next Payment is Due'];
  vars[4] = [4,1,2,"Sort by time since the referral's Last Click"];
  vars[5] = [3,2,1,'Sort by Total Number of Clicks'];
  vars[6] = [7,2,1,'Sort by Average number of clicks'];


  var blah = new Array();

  for(var i = 1; 7 > i; i++)
  {
    blah [i] = {
      colUrlIndex: vars[i][0],
      up: vars[i][1],
      down: vars[i][2],
      upTitle: vars[i][3] + ', Ascending',
      downTitle: vars[i][3] + ', Descending'
    }
  }

  // Removes existing arrows
  arg_headerRow.innerHTML = arg_headerRow.innerHTML.replace('<img src="http://neobux.cachefly.net/forum/images/up_gold.gif" height="6" width="10">', '');
  arg_headerRow.innerHTML = arg_headerRow.innerHTML.replace('<img src="http://neobux.cachefly.net/forum/images/down_gold.gif" height="6" width="10">', '');

  // Loop through column headers and add custom arrows & links
  for (var x in blah)
  {
    var currentColumn = arg_headerRow.childNodes[x];
    var href = 'http://www.neobux.com/?u=c&s=r&sp=1';
    var imgSrc = '/forum/images/';



    // If the current sorting method is acting upon the current column AND the current sort direction is up,
    // this status should be indicated by the gold arrow in this column header
    // Else, the script should default to the gray arrow
    if (document.location.href.match('&ss1=' + blah[x]['colUrlIndex']) && document.location.href.match('&ss2=' + blah[x]['up'])) {
      href += "&ss1=" + blah[x]['colUrlIndex'] + "&ss2=" + blah[x]['up'] + "&ss3=2";
      imgSrc += 'up_gold.gif';
    }
    else {
      href += "&ss1=" + blah[x]['colUrlIndex'] + "&ss2=" + blah[x]['up'] + "&ss3=2";
      imgSrc += 'up.gif';
    }

    currentColumn.innerHTML += " <a href='" + href + "'><img width='10' height='6' style='border:none; margin-left:2px;' title=\""+blah[x]['upTitle']+"\" src='" + imgSrc + "'></a>";

    /*Reset variables for down arrow*/
    href = 'http://www.neobux.com/?u=c&s=r&sp=1';
    imgSrc = '/forum/images/';

    if (document.location.href.match('&ss1=' + blah[x]['colUrlIndex']) && document.location.href.match('&ss2=' + blah[x]['down'])) {
      href += "&ss1=" + blah[x]['colUrlIndex'] + "&ss2=" + blah[x]['down'] + "&ss3=2";
      imgSrc += 'down_gold.gif';
    }
    else {
      href += "&ss1=" + blah[x]['colUrlIndex'] + "&ss2=" + blah[x]['down'] + "&ss3=2";
      imgSrc += 'down.gif';
    }

    currentColumn.innerHTML += " <a href='" + href + "'><img width='10' height='6' style='border:none; margin-left:-2px;' title=\""+blah[x]['downTitle']+"\" src='" + imgSrc + "'></a>";

  }
}

///
// Start Code that actually tries to run stuff
///

function codeShouldRun(arg_currentPage, arg_allowedPages) {
  return !!arg_allowedPages.indexOf(arg_currentPage);
}

var tmp_iframePages = /viewingAdvertisement|viewingForums_editingMessage|viewingForums_creatingTopic|viewingForums_creatingPoll/i;

if (currentPage.pageCode.match(/referralListings/i)) {
  modalCheckpoint('if (currentPage.pageCode.match(/referralListings/i)) {');

  referralListings.init();

  widenPages.referralListings();

  // var tmp_referral = new REFERRAL(
  // 'R526077263',
  // {
  // referralSince: '2011/04/25 11:20',
  // nextPayment: '171 days and 20:47',
  // lastClick: 'Today',
  // totalClicks: 3,
  // average: 1.500,
  // flagColourId: 0
  // }
  // );
  //
  // console.info(tmp_referral);

  var referrals = {};
  var settings = {};
  var headerRow = document.querySelectorAll('div#tblprp table tr[onmouseover]')[0].parentNode.children[0];
  var referralRows = document.querySelectorAll('div#tblprp tr[onmouseover]');
  var tmp_currentRow;

  var colCount = document.querySelectorAll('div#tblprp td[colspan]')[1].getAttribute('colspan');

  var colIndexes = {}

  if (currentPage.pageCode.match(/referralListings_Rented/i)) {
    colIndexes = {
      refID: 3,
      refSince: 5
    };
  } else {
    colIndexes = {
      refID: 1,
      refSince: 4
    };
  }





  //Remove the existing gold colour arrows
  var upArrows = document.querySelectorAll('td.bgt img[src="http://c.nbx.bz/forum/images/up_gold.gif"]');
  var downArrows = document.querySelectorAll('td.bgt img[src="http://c.nbx.bz/forum/images/down_gold.gif"]');

  for(var i=0; i<upArrows.length; i++) {
    upArrows[i].parentNode.removeChild(upArrows[i]);
  }
  for(var i=0; i<downArrows.length; i++) {
    downArrows[i].parentNode.removeChild(downArrows[i]);
  }

  //Add grey arrows to the column headers that can be clicked to sort the tables,
  // with a golden one to indicate the current sorting direction
  addSortingArrows(headerRow);



  var tmp_referralsData = pr['referrals'].getValue();

  //referralListings_columns.init();
  // referralListings_columns.readReferralData();
  referralListings_columns.mainLoop();

// addClickStatsToGoldenGraph();


}

if (currentPage.pageCode.match(/viewAdvertisementsPage/i)) {
  var adCountData = pr['ownAdCountTally'].getValue();
  insertAdCounterBox(0, adCountData, {});
}


if (currentPage.pageCode.match(/accSummary/i) || currentPage.pageCode.match(/referralStatistics/i)) {
  modalCheckpoint('if (currentPage.pageCode.match(/accSummary/i) || currentPage.pageCode.match(/referralStatistics/i)) {');

  accountCache = convertRawGraphDataToCacheFormat(getGraphData(), accountCache);
  pr['accountCache'].setValue(accountCache);
  chartDataBars.init();


  exportTabs.init();
}




if (currentPage.pageCode.match(/referralStatistics/)) {
  modalCheckpoint('if (currentPage.pageCode.match(/referralStatistics/)) {');

  insertProfitGraph();

  try {
    insertSidebar();
  } catch (e) {
    console.info("ERROR!\n\n insertSidebar(); failed\n\n" + e);
    // alert("ERROR!\n\n insertSidebar(); failed\n\n"+e);
  }
}


if (!currentPage.pageCode.match(tmp_iframePages) && (top === self)) {
  modalCheckpoint('if (!currentPage.pageCode.match(tmp_iframePages) && (top === self)) {');

  try {
    insertLocalServerTime();
  } catch (e) {
    console.info("ERROR!\n\n insertLocalServerTime(); failed\n\n" + e);
    // alert("ERROR!\n\n insertLocalServerTime(); failed\n\n"+e);
  }
  try {
    logo.init();
  } catch (e) {
    console.info("ERROR!\n\n logo.init(); failed\n\n" + e);
    // alert("ERROR!\n\n logo.init(); failed\n\n"+e);
  }
  try {
    widenPages.generic();
  } catch (e) {
    console.info("ERROR!\n\n widenPages.generic(); failed\n\n" + e);
    // alert("ERROR!\n\n widenPages.generic(); failed\n\n"+e);
  }
}



if (0 < tl8_counter) {
  debugLog("NOTE!!\n\n Untranslated strings on this page!!");
  debugLog(pr['translationStringsNeeded'].getValue());
}


var availableModules = [
    'scriptLogo',
    'preferencesBox',
// 'loggerBox',
    'graphExportTabs',
    'graphDatabars',
    'statisticsSidebar',
    'widenPage',
    'adCounterBox',
    'insertRentedReferralColumns',
    'insertDirectReferralColumns',
// 'insertGoldenGraphClickStats', //WARNING: Currently breaks the goldenGraphs
    'localServerTime'
];

var pageModulesToRun = {
  // "pageCode": [Boolean partialMatch, Boolean caseSensetive, Array modulesToRun],
  "viewAdvertisementsPage": [false, true, ['localServerTime', 'scriptLogo',]]
}

function runPageModules(arg_currentPageCode, arg_availablePageModules, arg_pageModulesToBeRun) {
  for(var tmp_page in arg_pageModulesToBeRun) {
    if(arg_pageModulesToBeRun.hasOwnProperty(tmp_page)) {
      ///Loop through all page codes
      var pageName = (arg_pageModulesToBeRun[tmp_page][1]) ? tmp_page : tmp_page.toLowerCase();
      var currentPageCode = (arg_pageModulesToBeRun[tmp_page][1]) ? arg_currentPageCode : arg_currentPageCode.toLowerCase();

      //IF the currentPageCode matches the page name, and not expecting a partial match OR
      // the page name is within the currentPageCode and expecting a partial match
      //THEN do nothing
      //ELSE continue;
      if ( ( (pageName === currentPageCode) && !arg_pageModulesToBeRun[tmp_page][0] ) ||
            ( pageName.match(currentPageCode) && arg_pageModulesToBeRun[tmp_page][0] )
      ) {}
      else {
        continue;
      }

      for (var i = 0; i < arg_pageModulesToBeRun[tmp_page][1].length; i++) {
        //Loop through and run the page modules in arg_pageModulesToBeRun[tmp_page][1]
        var currentlySelectedModuleName = arg_pageModulesToBeRun[tmp_page][1][i];
        if (availableModules.indexOf(currentlySelectedModuleName)) {
          //If the currently selected module is not listed as an available module, log error and continue;
          continue;
        }

        // Code to run each module;
        /**
*
**/
      }
    }
  }
}