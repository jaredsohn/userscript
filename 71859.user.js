// ==UserScript==
// @name           GMail "Send From" Auto Selector
// @namespace      http://www.shaungrady.com
// @author         Shaun Grady
// @description    When composing an email, automatically selects your "From" address based on the email recipient(s).
// @include        https://mail.google.com/mail/*
// @include        https://mail.google.com/a/*
// @include        http://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////
// Licensed under Creative Commons: Attribution-Noncommercial-Share Alike 3.0 //
// http://creativecommons.org/licenses/by-nc-sa/3.0/                          //
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// MODIFY THE SETTINGS OF THIS SCRIPT BELOW                                   //
////////////////////////////////////////////////////////////////////////////////

var addressRules   = [
    // These are the rules that determine what address is chosen. The first value
    // is the address that should be selected if the rule is matched. The second
    // value is the regular expression pattern that is tested against the 'to'
    // recipients. The first rule matched is the rule that is chosen.
    //
    
    // In this example, let's assume you have two email addresses:
    // primary@gmail.com and secondary@gmail.com
    // and you want to use your secondary address every time you write an email to
    // someone @example.com. You would use the following rule:
    ['secondary@gmail.com', /@example.com/i]
    // When creating a second rule, add a comma (,) to the end of the line above. 
];

// If modifySendText is set to true, the 'Send' button text will be changed to
// remind you what email address you will be sending your email from. To disable
// this behavior, set it to 'false'.
var modifySendText = true;
// addressLabels supplements the modifySendText functionality. This allows you
// to specify the label shown on the 'Send' button for each 'From' address. If
// no label is specified for an address, the address itself will be used instead.
var addressLabels  = {
    'secondary@gmail.com'   :'Secondary Address'
};

////////////////////////////////////////////////////////////////////////////////
// DO NOT MODIFY ANYTHING BELOW THIS LINE--Unless you know what you're doing  //
////////////////////////////////////////////////////////////////////////////////

var to, from, send, originalAddress, notice, manualOverride;
var draftPattern = /Draft saved at/i;

document.addEventListener('load',function(){
    var isCanvasFrame = !!document.getElementsByClassName('aao').length;
    if (isCanvasFrame === false) return true;
    // Wait for page to finish loading via AJAX requests, then intialize.
    var timer;
    document.body.addEventListener ("DOMNodeInserted", function(){
        if (timer) clearTimeout(timer);
        timer = setTimeout(initialize, 750);
    }, false);
}, false);

function initialize(){
    var toNodeList = document.getElementsByName('to');
    // If true, we take this to mean the #compose iframe is ready for initialization
    if (toNodeList.length === 1){
        // Check if message is a saved draft
        var draft = document.getElementsByClassName('d2').item(0);
        if (draftPattern.test(draft.innerHTML)){
            manualOverride = true;
        }
        to = toNodeList.item(0);
        if (to.classList.contains('observing')){ return false; }
        to.className += ' observing';
        send                 = document.getElementsByClassName('T-I J-J5-Ji Bq nS T-I-KE L3')[0];
        manualOverride       = false;
        from                 = document.getElementsByName('from')[0];
        originalAddress      = from.value;
        notice               = document.createElement('span');
        notice.style.display = 'none';
        notice.innerHTML     = '<b style="font-size:12px;padding-left:1em" class="qk">Auto selected address.</b> &nbsp; <span class="el" style="font-size:12px" onclick="originalAddress()">Undo change</span>';
        from.parentNode.insertBefore(notice, from.nextSibling);
        setSendButtonText();
        to.  addEventListener('keyup', toObserver,  true);
        to.  addEventListener('blur',  toObserver,  true);
        from.addEventListener('change',fromObserver,true);
    }
};

function toObserver(){
    if (manualOverride){ return false; }
    for (var i=0; i < addressRules.length; i++){
        var address = addressRules[i][0];
        var pattern = addressRules[i][1];
        var matches = pattern.test(to.value);
        if (matches){
            from.value           = address;
            notice.style.display = 'inline';
            setSendButtonText();
            return true;
        }
    };
    from.value           = originalAddress;
    notice.style.display = 'none';
    setSendButtonText();
};

function fromObserver(){
    manualOverride       = true;
    notice.style.display = 'none';
    setSendButtonText();
};

function setSendButtonText(){
    if (!send || modifySendText === false){ return false; }
    var address = addressLabels[from.value] || from.value;
    send.innerHTML = '<b>Send</b> from <b>'+address+'</b>';
}

unsafeWindow.originalAddress = function(){
    from.value = originalAddress;
    fromObserver();
};