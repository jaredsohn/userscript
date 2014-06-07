// ==UserScript==
// @name           del.icio.us Anal Retentive Character Counter
// @description    As-you-type counters for description and notes fields of the posting page and a check for characters that, once encoded, take up extra space and reduce the max character limit.
// @include        http://del.icio.us/*url=*
// ==/UserScript==
   
// This script is for people who like to cram their del.icio.us notes right up to the character limit and rip out 
// their hair in rage and frustration whenever their precious words get chopped off during save. It adds to the 
// posting page straight-up, regular character counters for both the description and notes fields, but it also 
// provides some more sophisticated functionality.

// del.icio.us allows 255 characters in the description and notes fields, but some characters, once encoded, take up 
// more space than regular characters. So even though you may have typed exactly 255 characters in the notes field, 
// when you save your post some chars will get cut off if one or more of those characters requires extra space. By 
// clicking the "check for large chars" link that this script adds to the posting page, you can see which, if any, of 
// your characters are larger than the regular characters, and then go in and remove/replace them if you want. When 
// you click save, the script does a final check to see if your description or notes field is too large and if so, it 
// offers you a chance to cancel the save and edit the fields.

// Also, by default it automatically replaces curly quotes (Unicode code points 8216, 8217, 8220, 8221, which are 
// equivalent to 3 chars when encoded) with straight quotes. (Because I think curly quotes are a waste of valuable 
// space.) You can turn off this option by unchecking the "replace curly quotes" checkbox. Note that the quote 
// replacement, when enabled, takes place anytime you click the "check for large chars" link or the "save" button.

(function() {

  var descId = "description";
  var descLength = 255;
  var notesId = "notes";
  var notesLength = 255;

  // Set up the class that does all the work

  function CharChecker(elementId, elementLimit) {
    this.checkElement = document.getElementById(elementId);
    this.counterElement = document.createElement('span');
    this.resultsElement = document.createElement('div');
    this.limit = elementLimit;
    this.encodedCount = 0;
    this.quotesReplaced = false;
    this.styledText = "";
    this.largeChars = false;
    
    this.counterElement.id = elementId + 'counter';
    this.counterElement.className = 'smaller';
    // insert counter 
    if (elementId == descId) {
      this.checkElement.parentNode.nextSibling.insertBefore(this.counterElement, this.checkElement.parentNode.nextSibling.firstChild.nextSibling);
      this.checkElement.parentNode.nextSibling.style.verticalAlign = 'top';
    }
    else if (elementId == notesId) {
      this.checkElement.parentNode.nextSibling.nextSibling.appendChild(this.counterElement);
      this.checkElement.parentNode.nextSibling.nextSibling.style.verticalAlign = 'top';
    }

    this.resultsElement.id = elementId + 'results';
    this.resultsElement.className = 'verysmall';   
    this.resultsElement.style.backgroundColor = '#dcdcdc';
    this.resultsElement.style.paddingLeft = '2px';
    this.resultsElement.style.paddingRight = '2px';
    this.resultsElement.style.lineHeight = '1.8em';
    // insert results
    if (elementId == descId) {
      this.checkElement.parentNode.insertBefore(this.resultsElement, this.checkElement.parentNode.firstChild.nextSibling);
    }
    else if (elementId == notesId) {        
      this.checkElement.parentNode.insertBefore(this.resultsElement, this.checkElement.parentNode.firstChild.nextSibling.nextSibling);
    }

    // setup counter to respond to keyups
    this.checkElement.addEventListener("keyup", updateLength, true);
  }

  CharChecker.prototype.updateCounter = function() {
    var counter = this.counterElement;
    var element = this.checkElement;  
    counter.innerHTML = element.value.length + '/' + this.limit;
    if (element.value.length > this.limit) {
      counter.style.fontWeight = "bold";
    }
    else {
      counter.style.fontWeight = "normal";
    }
  }

  CharChecker.prototype.doCheck = function() {
    this.encodedCount = 0;
    this.quotesReplaced = false;
    this.styledText = "";
    this.largeChars = false;

    var useStraight = GM_getValue("useStraightQuotes", true);
    var element = this.checkElement;

    for (i = 0; i < element.value.length; i++) {
      // Swap out curly quotes for straight quotes
      if (useStraight) {
        if ((element.value.charCodeAt(i) == 8216) || (element.value.charCodeAt(i) == 8217)) {
          element.value = element.value.substring(0, i) + '\'' + element.value.substring(i+1);
          this.quotesReplaced = true;
        }
        else if ((element.value.charCodeAt(i) == 8220) || (element.value.charCodeAt(i) == 8221)) {
          element.value = element.value.substring(0, i) + '"' + element.value.substring(i+1);
          this.quotesReplaced = true;
        }
      }

      // Once encoded, some chars take up extra space
      if (Math.ceil(encodeURIComponent(element.value.charAt(i)).length / 3) > 1) {
        this.largeChars = true;
        this.styledText = this.styledText + '<span style="border: 1px solid red; margin-left: 1px; margin-right: 1px; padding-left: 3px; padding-right: 3px;">'  + element.value.charAt(i) + '</span>';
      }
      else {
        this.styledText = this.styledText + element.value.charAt(i);
      }
      this.encodedCount = this.encodedCount + Math.ceil(encodeURIComponent(element.value.charAt(i)).length / 3);
    }
  }

  CharChecker.prototype.showLargeChars = function() {
    var checked = this.checkElement;
    var results = this.resultsElement;

    results.innerHTML = '';
    if (this.largeChars) {
      if (this.quotesReplaced) {
        results.innerHTML = '<p>Curly quotes replaced with straight quotes.</p>';
      }
      if (this.overLimit() > 0) {
        results.innerHTML = results.innerHTML + '<p style="font-weight: bold;">' + this.encodedCount + '/' + this.limit + ' encoded characters (' + this.overLimit() + ' too many)</p>';
      }
      else {
        results.innerHTML = results.innerHTML + '<p>' + this.encodedCount + '/' + this.limit + ' encoded characters</p>';
      }
      results.innerHTML = results.innerHTML + '<p>' + this.styledText + '</p>';
    }
    else {
      var other = "";
      if (this.quotesReplaced) {
        results.innerHTML = '<p>Curly quotes replaced with straight quotes. No other large characters detected.</p>';
      }
      else {
        results.innerHTML = '<p>No large characters detected.</p>';
      }
    }

    // recalculate the suggest drop down position
    var suggestpopup = document.getElementById('suggest');
    var tagsfield = document.getElementById('tags');
    suggestpopup.style.top = getYPos(tagsfield) + tagsfield.offsetHeight - 1 + 'px';
  }

  CharChecker.prototype.overLimit = function() {
    return this.encodedCount - this.limit;  
  }


  // Start actually doing stuff 

  var descChecker = new CharChecker(descId, descLength);
  var notesChecker = new CharChecker(notesId, notesLength);
  descChecker.updateCounter();
  notesChecker.updateCounter();

  // Align all label table cells to the top
  GM_addStyle("td.rs {vertical-align: top;}");

  // Add a link that triggers a check for large characters, and a
  // checkbox that specifies whether the check automatically converts
  // curly quotes to straight quotes.
  var checkCharsLink = createCheckCharsLink();
  var replaceQuotesBox = createReplaceQuotesBox();
  var quotesText = document.createElement("span");
  quotesText.innerHTML = "replace curly quotes";
  quotesText.className = 'verysmall';

  var delForm = document.getElementById("delForm");
  var pLink = document.createElement("p");
  pLink.style.marginTop = "10px";
  pLink.appendChild(checkCharsLink);
  pLink.appendChild(replaceQuotesBox);
  pLink.appendChild(quotesText);
  delForm.parentNode.insertBefore(pLink, delForm.nextSibling);

  function createCheckCharsLink() {
    var checkLink = document.createElement("a");
    checkLink.href= "";
    checkLink.innerHTML = "check for large chars";
    checkLink.id = "checkcharslink";

    checkLink.addEventListener("click", function(event) {
      event.stopPropagation();    
      event.preventDefault();
      descChecker.doCheck();
      notesChecker.doCheck();
      descChecker.showLargeChars();
      notesChecker.showLargeChars();
    }, false);

    return checkLink; 
  }

  function createReplaceQuotesBox() {
    var quotesCheckbox = document.createElement("input");
    quotesCheckbox.type= "checkbox";
    quotesCheckbox.id = "replacequotesbox";   
    quotesCheckbox.style.marginLeft = "5px";  
    quotesCheckbox.checked = GM_getValue('useStraightQuotes', true);

    quotesCheckbox.addEventListener("click", function(event) {
      GM_setValue('useStraightQuotes', this.checked);     
    }, false);

    return quotesCheckbox; 
  }

  // Make the save button check to see if chars will get cut off before saving
  var inputElements = delForm.getElementsByTagName("input");
  var submitButton;
  for (var i = 0; i < inputElements.length; i++) {
    if (inputElements[i].type == "submit") {
      submitButton = inputElements[i];
      submitButton.addEventListener("click", function(event) {
        if (countBeforeSave() == false) {
          event.preventDefault();
          descChecker.showLargeChars();  
          notesChecker.showLargeChars(); 
        }
      }, false);
    }
  }

  function countBeforeSave() {
    descChecker.doCheck();
    notesChecker.doCheck();

    var error = "";
    var and = "";
    if (descChecker.overLimit() > 0) {
       error = "description";
       and = " and ";
    }
    if (notesChecker.overLimit() > 0) {
      error = error + and + "notes";
    }
    if (error != "") {
      error = "Your " + error + " will be cut off. Proceed anyway?";
      return confirm(error);
    }
    return true;
  }

  // update a counter (triggered by a keyup)
  function updateLength() {
    if (this.id == descId) {
      descChecker.updateCounter();
    }
    else if (this.id == notesId) {
      notesChecker.updateCounter();
    }
  }

  // get vertical pixel position of an object
  function getYPos(o) {
    var y = 0;
    if (o.offsetParent) {
      while (o.offsetParent) {
        y += o.offsetTop;
        o = o.offsetParent;
      }
    }
    return y;
  }

})();