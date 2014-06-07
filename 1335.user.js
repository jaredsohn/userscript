// Copyright (C) 2005 by Tapsell-Ferrier Limited
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name          natwest-login
// @namespace     http://www.tapsellferrier.co.uk/downloads
// @description   fill in silly "enter first, twelth and fourth" boxes
// @include       https://www.nwolb.com/*
// ==/UserScript==


/*
  Polemical Explanation

  I absolutely HATE banks because they don't employ me to write their
  web applications.  Bank webapps are the worst I've ever
  used. They're so shoddy. And there's no excuse for it. Banks earn so
  much money from me and everyone else that they're customer service
  experience (especially the web one) ought to be tip top. But they
  seem to employ people completly ignorant of web architecture.

  The way banks SHOULD do authentication is with client certificates
  because they would be practically unspoofable - you could maybe
  spoof the DNS and present a different banking front end to the user
  but to what end?. Without passwords it's not going to do you much
  good.

  Instead they choose to do authentication like this. With multiple
  tokens and other rubbish they have dreamt up themselves. Do they
  actually employ someone who considers themselves an expert to come
  up with this crap?

  Fortunately, hackers can fight back with Greasemonkey.

  This asks for your PIN and password and then puts the characters
  that the page is asking for in the correct boxes.

  Amusingly I was told by the Natwest people that the whole reason for
  this page was to stop programs from watching keypresses. It worked,
  they explained, because computers can't understand the words
  "first", "second" or "fifth".

  Well, this program won't work then.

  As I say, idiots.

  This program is only a first step. I hope that I'll be able to make
  an infrastructure that can apply client certificates to bank
  authentication thus solving the problem premanently.
 */
   


// This is a portable function to ask for a password with javascript.
// The continuation_func is a function taking one argument, the value that
// is in the entry box when the user presses OK.
// The continuation_func is only called when the user presses OK.
function gm_prompter(prompt, continuation_func)
{
  if (prompt == null || continuation_func == null)
    // throw an exception?
    return;

  var div = document.getElementById("gm_promptbox");
  var prompt_label = null;
  var ok_button = null;
  var cancel_button = null;
  var input_data = null;
  if (div != null)
    {
      prompt_label = document.getElementById("gm_promptbox_label");
      ok_button = document.getElementById("gm_promptbox_ok");
      cancel_button = document.getElementById("gm_promptbox_cancel");
      input_data = document.getElementById("gm_entry");
    }
  else
    {
      div = document.createElement("div");
      div.id = "gm_promptbox";
      // Set up the form
      div.style.display = "none";
      div.style.position = "fixed";
      div.style.height = "100";
      div.style.width = "400";
      div.style.top = (document.height / 2) - 50;
      div.style.left = (document.width / 2) - 200;
      div.style.textAlign = "center";
      div.style.border = "solid";
      var input_form = div.appendChild(document.createElement("form"));
      var p_label = div.appendChild(document.createElement("label"));
      prompt_label = p_label.appendChild(document.createElement("span"));
      prompt_label.id = "gm_promptbox_label";
      prompt_label.textContent = prompt + ": ";
      input_data = p_label.appendChild(document.createElement("input"));
      input_data.id = "gm_entry";
      input_data.type = "password";
      input_data.accesskey = "P";
      ok_button = p_label.appendChild(document.createElement("button"));
      ok_button.id = "gm_promptbox_ok";
      ok_button.type ="button";
      ok_button.textContent = "OK";
      cancel_button = p_label.appendChild(document.createElement("button"));
      cancel_button.id = "gm_promptbox_cancel";
      cancel_button.type = "button";
      cancel_button.textContent = "Cancel";
      
      // Add it to the document
      document.body.appendChild(div);
    }

  // Set the prompt
  prompt_label.textContent = prompt + ": ";

  // The funcs called by the form
  var ok_handler = function (evt)
    {
      GM_log("gm_prompter OK continuation (" + prompt + ") called");
      div.style.display = "none";
      var value = input_data.value;
      input_data.value = null;
      ok_button.removeEventListener("click", ok_handler, true);
      continuation_func(value);
    };
  ok_button.addEventListener("click", ok_handler, true);

  var cancel_handler = function(evt)
    {
      GM_log("gm_prompter Cancel continuation called");
      input_data.value = null;
      div.style.display="none";
    };
  cancel_button.addEventListener("click", cancel_handler, true);

  // Make it appear
  div.style.display = "block;";
  div.style.background = "#4BBFF9";
}


function nw_picker_v2 ()
{
  var indices = new Array();
  indices["first"] = 1;
  indices["second"] = 2;
  indices["third"] = 3;
  indices["fourth"] = 4;
  indices["fifth"] = 5;
  indices["sixth"] = 6;
  indices["seventh"] = 7;
  indices["eighth"] = 8;
  indices["ninth"] = 9;
  indices["tenth"] = 10;


  function nw_helper(re, data, cont)
  {
    var labels = document.getElementsByTagName("label");
    for (var label_index = 0; label_index < labels.length; label_index++)
      {
        var label = labels.item(label_index);
        var m = re.exec(label.textContent);
        if (m)
          {
            var input = document.getElementsByName(label.getAttribute("for")).item(0);
            // GM_log("the index at: " + m[1] + " will be filled with: " + data[indices[m[1]] - 1]);
            var to_enter = data[indices[m[1]] - 1];
            input.value = to_enter;
          }
      }
    cont();
  }

  // Oh! For a good continuation syntax.
  var pin_re = /Enter the (.*) digit from your PIN/;
  var passwd_re = /Enter the (.*) character from your Password/;

  if (pin_re.exec(document.body.textContent) && passwd_re.exec(document.body.textContent))
    {
      gm_prompter("enter pin",
                  function (pin)
                  { nw_helper(pin_re, pin,
                              function () {gm_prompter("enter password",
                                                       function (passwd)
                                                       { nw_helper(passwd_re, passwd,
                                                                   function ()
                                                                   {
                                                                     document.getElementById("NextButton_button").focus();
                                                                   })})})});
    }
}



// This turns autocomplete off which is useful for some other natwest pages.
if (document.forms)
  {
    if (document.forms.length > 1)
      {
        document.forms[0].setAttribute("autocomplete", "on");
        inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++)
          if (inputs[i].type == "text")
            inputs[i].setAttribute("autocomplete", "on");
      }
  }

// Make it all happen.
window.addEventListener("load", nw_picker_v2, true);

// End
