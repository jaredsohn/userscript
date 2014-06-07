// ==UserScript==
// @name          DexeTroll
// @namespace     http://userscripts.org/scripts/show/59147
// @description   Slim down Fark trolls... admins or otherwise.
// @include       http://*.fark.com/*
// @include       https://*.fark.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @version       1.1
// ==/UserScript==

function nukeComment(entryID) {
    $("#"+entryID).hide();
    $("#"+entryID.replace("ct","ctable")).hide();
    $("#"+entryID.replace("ct","c")).hide();
    $("#"+entryID.replace("ct","c")).prev().hide();
    return;
}

function hideTrollFood(login) {
    var happyface = GM_getValue(login + "_happyface", "").split(",");
    var jerkface = GM_getValue(login + "_jerkface", "").split(",");

    happyface[happyface.length] = login;

    $(".ctext b:first-child a:first-child").each(function() {
         for (var i=0; i < jerkface.length; i++)
             if ($(this).html() == jerkface[i]) {
                 var localID=$(this).parent().parent().attr("id");
                 var localName=$("#"+localID.replace("ct","cu")).html();
                 for (var j=0; j < happyface.length; j++)
                     if (localName == happyface[j]) return;
                 nukeComment(localID);
                 return;
             }
      });
}

function findUser() {
    if ($(".loginTable tbody tr td:first-child input").length > 0) return null;
    var foundString = $(".loginTable tbody tr td:first-child").html();
    if (foundString == null) return null;
    // this regexp screws with slash-star comments
    // but it doesn't work right when I rewrite it?
    return foundString.replace(/.*'(.*)'.*/,'$1');
}

function saveProfile(user) {
    // just noticed this is saving the HTML for TF tags too
    // which is silly, but it's not breaking anything, so I'll leave it alone
    var userList = [];
    $("#tools_fv").parent().next().find("a").each(function() {
      userList[userList.length] = $(this).html();
      });
    GM_setValue(user + "_happyface", userList.join());
    userList = [];
     $("#tools_il").parent().next().find("a").each(function() {
      userList[userList.length] = $(this).html();
      });
    GM_setValue(user + "_jerkface", userList.join());

}

$(document).ready(function() {
	var currentUser = findUser();
	if (currentUser != null) {
      if (document.URL.indexOf("/comments/") != -1) {
         hideTrollFood(currentUser);
         //alert("Trolls banished from thread...");
      } else if (document.URL.indexOf("users/" + currentUser + "/tools") != -1) {
         // reload config
         saveProfile(currentUser);
         //alert("DexeTroll profile for " + currentUser + " saved.");
      }
    }

});
