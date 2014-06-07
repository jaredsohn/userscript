// ==UserScript==
// @name           D2JSP_AddressBook2Profile
// @description    Adds a "Add User to Address Book" button in user profiles
// @namespace      http://dknightstudios.org/
// @include        http://forums.d2jsp.org/user.php?i=*

// @version        1.0.0
// @require        http://userscripts.org/scripts/source/74144.user.js
// ==/UserScript==

//update checker
try {
	ScriptUpdater.check(101651, "1.0.0");
} catch(e) { };


var commentPopup = unsafeWindow.commentPopup;
var addUser = unsafeWindow.addUser;
var popupHide = unsafeWindow.popupHide;
var dd, name, linkBox, datLink, datLI;
var datBox = document.createElement("fieldset");
datLI = document.createElement("li");
datLI.innerHTML = '<a onClick="commentPopup();">Add to Address Book</a>';

name = document.getElementsByTagName("dl")[0].getElementsByTagName("a")[0].textContent;
//alert(name);

dd = document.getElementsByTagName("dd")[0];
linkBox = getElementsByClassName("bts mL bc1", dd)[0];
//linkBox.style.positon = "relative";
linkBox.insertBefore(datLI, null);

unsafeWindow.commentPopup = function(){
    datBox.setAttribute("style", "position: absolute; display: inline; width: 300px; left: 0px; top: 0px; z-index: 101;");
    
    datBox.innerHTML = '<legend>Add User to Address Book<a class="hs" style="cursor: pointer;" onclick="popupHide();"><img src="images/x.gif"></a></legend>' +
    '<table class="ftbt" style="z-index:100;"><tbody><tr>'+
    '<td style="text-align:right;">Comment:</td>'+
    '<td><input id="datComment" name="addComment"></td></tr>'+
    '</tbody></table>'+
    '<div class="ce foot ab"><input type="button" value="Add User" onClick="addUser();"></div>';
    
    //linkBox.insertBefore(datBox, null);
    document.body.appendChild(datBox);
    datBox.style.left = "123px";
    datBox.style.top = "300px";
    datBox.style.display = "inline";
}

unsafeWindow.popupHide = function(){
    datBox.style.display = "none";
}

unsafeWindow.addUser = function(){
    var datComment, oldURL;
    
    unsafeWindow.oldURL = window.location.href;
    oldURL = unsafeWindow.oldURL;
    datComment = document.getElementById("datComment").value;
    post_to_url("pm.php",
                {c : 13, uN : name, desc: datComment, add:"Add User to Address Book"}
                );
    
    setTimeout("window.location.href = oldURL;", 100);
    
}



function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);    // Not entirely sure if this is necessary
    form.submit();
}