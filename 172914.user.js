// ==UserScript==
// @name       The Old Reader - Don't Focus Notes Field
// @namespace  https://ssl.uofr.net/~sam/gm_scripts/
// @version    1
// @description  Don't focus the notes field when clicking the share button.
// @match      http://theoldreader.com/*
// @match      http://www.theoldreader.com/*
// @match      https://theoldreader.com/*
// @match      https://wwww.theoldreader.com/*
// ==/UserScript==

$(".btn-share").die("click").live("click",function(){var e,t;return Reader.Contents.loading(!0,{button:this,quiet:!0}),t=$(this).parent().parent(),e=$(this),$.ajaxq("share",{url:e.attr("href"),data:{_method:"put",share:!e.hasClass("shared")},dataType:"json",type:"POST"}).done(function(n){return Reader.Contents.loading(!1),n.shared?(e.find("span").text(I18n.t("feeds.unshare")),t.find(".share-note").removeClass("hidden")):(e.find("span").text(I18n.t("feeds.share")),t.find(".share-note").addClass("hidden"),t.find(".share-note .input").val(""),t.find(".share-note .input").attr("data-old-value",""),t.find(".share-note .btn").text(I18n.t("feeds.attach")),t.find(".note").empty()),n.shared?e.addClass("shared"):e.removeClass("shared")}).fail(function(){return Reader.Contents.loading(!1),Reader.Contents.alert(I18n.t("alerts.common"))}),!1});
