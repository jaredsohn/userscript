// ==UserScript==
// @name           CustomResponseGenerator
// @namespace      http://userscripts.org/users/66143
// @description    Generates email responses for an email received in gmail based on the label it is associated with
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

var emailTxtOptions = null;
var checkBoxDiv = null;
var select_from = null;
var msgBox = null;
var gmail = null;
var currentLabel = 'None';
var editReplyForm = null;
var selectedCheckboxes = '';

function addEditForm(checkboxName, checkboxDiv) {
	try {
    editReplyForm.parentNode.removeChild(editReplyForm);
	} catch(e) {}

  // Add the div to hold the form for editing the reply	
  editReplyForm = unsafeWindow.document.createElement('div');
	editReplyForm.style.display = 'block';
	editReplyForm.style.padding = '10px'
	emailTxtOptions.appendChild(editReplyForm);

	// Add Header for the form to indicate which tag is being edited
	var editReplyFormHeader = unsafeWindow.document.createElement('div');
  editReplyFormHeader.style.margin = "10px 0px 3px 0px";
	editReplyFormHeader.style.fontSize = '12px';
	editReplyFormHeader.innerHTML = "Editing Tag: <b>" + checkboxName + "</b>";
	editReplyForm.appendChild(editReplyFormHeader);

	// Add Text Area for the form to edit the reply for the tag
	var editReplyFormTextArea = unsafeWindow.document.createElement('textarea');
  editReplyFormTextArea.style.margin = "3px 0px 3px 0px";
	editReplyFormTextArea.style.width = '600px';
	editReplyFormTextArea.style.height = '200px';
	editReplyFormTextArea.style.fontSize = '12px';
	editReplyFormTextArea.value = unescape(GM_getValue(currentLabel+'_'+checkboxName, ''));
	editReplyForm.appendChild(editReplyFormTextArea);

  // Add a div to hold both the buttons
	var editReplyButtons = unsafeWindow.document.createElement('div');
  editReplyButtons.style.margin = "3px 0px 3px 0px";
	editReplyForm.appendChild(editReplyButtons);
	
	// Add Save button for the form
	var editReplyFormButton = unsafeWindow.document.createElement('input');
	editReplyFormButton.type = 'button';
	editReplyFormButton.style.fontSize = '12px';
	editReplyFormButton.value = "Save";
	editReplyFormButton.onclick = function(){
    GM_setValue(currentLabel+'_'+checkboxName, escape(editReplyFormTextArea.value));
  	try {
      editReplyForm.parentNode.removeChild(editReplyForm);
  	} catch(e) {}
  }
	editReplyButtons.appendChild(editReplyFormButton);

	// Add delete button to delete this one
	var editReplyFormDeleteButton = unsafeWindow.document.createElement('input');
	editReplyFormDeleteButton.type = 'button';
	editReplyFormDeleteButton.style.fontSize = '12px';
	editReplyFormDeleteButton.style.marginLeft = '10px';
	editReplyFormDeleteButton.value = "Delete";
	editReplyFormDeleteButton.onclick = function(){
    var checkboxes = unescape(GM_getValue(currentLabel, '')).split(/,/);
    var checkBoxLabels = '';
    for (x in checkboxes) {
      if (checkboxes[x] != checkboxName) {
        if (checkBoxLabels != '') {
          checkBoxLabels += ',' + checkboxes[x];
        } else {
          checkBoxLabels = checkboxes[x];
        }
      }
    }
    GM_setValue(currentLabel, escape(checkBoxLabels));
    GM_setValue(currentLabel+'_'+checkboxName, escape(''));
  	try {
      checkboxDiv.parentNode.removeChild(checkboxDiv);
  	} catch(e) {}
  	try {
      editReplyForm.parentNode.removeChild(editReplyForm);
  	} catch(e) {}
  }
	editReplyButtons.appendChild(editReplyFormDeleteButton);
}

function addCheckbox(checkboxName) {
  // Add a new div to hold the checkbox and the label
  var newCheckBoxDiv = unsafeWindow.document.createElement('div');
  newCheckBoxDiv.style.margin = "5px 0px 5px 0px";
  checkBoxDiv.appendChild(newCheckBoxDiv);

  // Add the checkbox to the div
  var checkbox = unsafeWindow.document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.onchange = function() {
    // If checkbox was checked, then add the checkbox
    // to the list of checkboxes that are checked
    // else, delete the checkbox from the list of 
    // checkboxes that were checked
    if (checkbox.checked) {
      if (selectedCheckboxes == '') {
        selectedCheckboxes = checkboxName;
      } else {
        selectedCheckboxes += ',' + checkboxName;
      }
    } else {
      var selectedCheckboxesArray = selectedCheckboxes.split(/,/);
      selectedCheckboxes = '';
      for (x in selectedCheckboxesArray) {
        if (selectedCheckboxesArray[x] != checkboxName) {
          if (selectedCheckboxes == '') {
            selectedCheckboxes = selectedCheckboxesArray[x];
          } else {
            selectedCheckboxes += ',' + selectedCheckboxesArray[x];;
          }
        }
      }
    }
  }
  newCheckBoxDiv.appendChild(checkbox);

  // Add the label to the checkbox
  var checkboxLabel = unsafeWindow.document.createElement('label');
  checkboxLabel.innerHTML = checkboxName;
  checkboxLabel.style.marginLeft = "5px";
  checkboxLabel.style.marginRight = "4px";
  checkboxLabel.style.verticalAlign = "top";
  newCheckBoxDiv.appendChild(checkboxLabel);

  // Add an edit label to make changed to the reply for this tag
	var checkboxEditLabel = unsafeWindow.document.createElement('label');
	checkboxEditLabel.style.fontSize = '12px';
	checkboxEditLabel.style.marginLeft = '10px';
	checkboxEditLabel.style.cursor = 'pointer';
	checkboxEditLabel.innerHTML = "(Edit)";
  checkboxEditLabel.style.verticalAlign = "top";
  checkboxEditLabel.onmouseover = function() {
    checkboxEditLabel.style.fontWeight = 'bold';
  }
  checkboxEditLabel.onmouseout = function() {
    checkboxEditLabel.style.fontWeight = 'normal';
  }
	checkboxEditLabel.onclick = function(){
    addEditForm(checkboxName, this.parentNode);
  }
	newCheckBoxDiv.appendChild(checkboxEditLabel);

}

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
  
      function getCurrentLabel() {
        var canvas = window.top.document.getElementById('canvas_frame').contentWindow;
        var avElem = gmail.getActiveViewElement();
        var selectors = canvas.document.evaluate('//span[@class="MgLW8b"]',
                                          avElem,
                                          null,
                                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                          null);

        currentLabel = 'None';
        if (selectors.snapshotLength > 0) {
          for (var j = 0; j <selectors.snapshotLength; j++) {
            if (selectors.snapshotItem(j).innerHTML != "Inbox") {
              currentLabel = selectors.snapshotItem(j).innerHTML;
              break;
            }
          }
        }
      }


      function messageBoxListener() {
        // Get the message box element once iframe has been loaded
        var elems = gmail.getActiveViewElement().getElementsByTagName('iframe');
        if(elems.length > 0) {
          msgBox = elems[0];
          return true;
        } else {
          return false;
        }
      }

      function getToDiv() {
        // Get the message box eleement
        messageBoxListener();

        // Get the textarea element inorder to add custom generator in the mail
        var elems = null;
        try { 
          elems  = gmail.getActiveViewElement().getElementsByTagName('textarea'); 
        } catch(e) {
          elems = Array();	
        }

        for(x in elems) {
          if(elems[x].name == 'to') {
            select_from = elems[x];
            select_from.style.marginBottom = '.5em';
          }
        }
      }

      function createCustomReplyGenerator() {
        try {
          emailTxtOptions.parentNode.removeChild(emailTxtOptions);
        } catch(e) {}

        // Get the To div after which we want to add the reply generator
        getToDiv();

        //TODO: Use XPCNativeWrapper instead of unsafeWindow
        
        // Add the main div
        emailTxtOptions = unsafeWindow.document.createElement('div');
        select_from.parentNode.appendChild(emailTxtOptions);

        // Display the label associated with this email
        var labelDiv = unsafeWindow.document.createElement('label');
        labelDiv.style.margin = '10px 0px 10px 0px';
        labelDiv.innerHTML = 'Label associated with this email: <b>' + currentLabel + '</b>';
        labelDiv.style.fontSize = '12px';
        emailTxtOptions.appendChild(labelDiv);
        
        // Add the div which will hold all the tags
        // Each tag holds Checkbox+Label+EditLabel
        checkBoxDiv = unsafeWindow.document.createElement('div');
        checkBoxDiv.style.fontSize = '12px';
        emailTxtOptions.appendChild(checkBoxDiv);

        // Get the checkboxes associated with this label
        var checkboxes = unescape(GM_getValue(currentLabel, '')).split(/,/);
        for (y in checkboxes) {
          if (checkboxes[y] != '') {
            addCheckbox(checkboxes[y]);
          }
        }

        // Add buttons div
        buttonsDiv = unsafeWindow.document.createElement('div');
   	    buttonsDiv.style.margin = '10px 0 5px 0;';
        emailTxtOptions.appendChild(buttonsDiv);

        // Add the OK Button to add the Custom Reply based
        // on the checkboxes that we checked
        var OKButton = unsafeWindow.document.createElement('input');
        OKButton.type = "button";
   	    OKButton.style.marginLeft= '2px';
        OKButton.value = "OK";
        OKButton.style.fontSize = '12px';
        OKButton.onclick = function() {
          // Copy the custom response in the reply
          // NOTE: Reply will be created based on the order in which 
          // the checkboxes were selected
          var selectedCheckboxesArray = selectedCheckboxes.split(/,/);
          var emailTxt = '';
          for (x in selectedCheckboxesArray) {
          	emailTxt += '<br/>' + unescape(GM_getValue(currentLabel+'_'+selectedCheckboxesArray[x], ''));
          }
          emailTxt = emailTxt.replace(/\n/g, '<br/>');
          msgBox.contentDocument.body.innerHTML = emailTxt;
        }
        buttonsDiv.appendChild(OKButton);
        
        // Add the "Add New Tag" button to add new tags to
        // the current label
        var addButton = unsafeWindow.document.createElement('input');
        addButton.type = "button";
        addButton.value = "Add New Tag";
   	    addButton.style.marginLeft = '10px';
        addButton.style.fontSize = '12px';
        addButton.onclick = function() {
          var newLabel = prompt("Enter a new label name: ", '');
          if ((newLabel != null) && (newLabel != '')) {
            var labelExists = false;
            var checkboxes = unescape(GM_getValue(currentLabel, '')).split(/,/);
            for (y in checkboxes) {
              if (checkboxes[y] == newLabel) {
                labelExists = true;
              }
            }
            if (!labelExists) {
              // Save the new label
              var checkboxLabels = unescape(GM_getValue(currentLabel, ''));
              if (checkboxLabels != '') {
                checkboxLabels += ',' + newLabel;
              } else {
                checkboxLabels = newLabel;
              }
              GM_setValue(currentLabel, escape(checkboxLabels));

              // Add the new label to the screen along with a checkbox
              addCheckbox(newLabel);
            }
          }
        }
        buttonsDiv.appendChild(addButton);
      }

      function waitOnCompose() {
        // wait for compose page to open up before initializing everything
        if(messageBoxListener()) {
          selectedCheckboxes = '';
          createCustomReplyGenerator();
  		  } else {
		      setTimeout(waitOnCompose, 500);
        }
      }
      
      function setViewType() {
        switch (gmail.getActiveViewType()) {
          case 'cv' :
            // Get the label associated with this email
            getCurrentLabel();
            // If in conversation view type, add labels
            waitOnCompose();
            break;
          case 'co' :
            // Get the label associated with this email
            getCurrentLabel();
            // If in compose view type, add labels
            waitOnCompose();
            break;
          case 'ct' :
          case 's' :
          case 'tl' :
          default :
            break;
        }
      }
      gmail.registerViewChangeCallback(setViewType);
      //var labels = gmail.getSystemLabelsElement();
      setViewType();
    });
  }
}
, true);

