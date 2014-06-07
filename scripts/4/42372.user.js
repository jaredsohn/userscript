// ==UserScript==
// @name           Flamebate Scroller
// @include        http://forumwarz.com/discussions
// @include        http://forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions
// @include        http://*.forumwarz.com/discussions/*
// @include        http://forumwarz.com/domination
// @include        http://*.forumwarz.com/domination
// ==/UserScript==
$$ = unsafeWindow["window"].$$;

// Post title
$$("#posts th").invoke("setStyle", { maxWidth: (screen.width - 80) + "px" });
// Post body
$$("div.truncate_body").invoke("setStyle", { maxWidth: (screen.width - 280) + "px" });
$$("div.speech_bubble div.truncate_body").invoke("setStyle", { maxWidth: (screen.width - 80) + "px" });
// Signature
$$("div.truncate_sig").invoke("setStyle", { maxWidth: (screen.width - 280) + "px" });
// Title in listing
$$("td.sub").invoke("setStyle", { maxWidth: (screen.width - 500) + "px" });
$$(".content table td a").invoke("setStyle", { display: "block", maxWidth: "200px", maxHeight: "4em", overflow: "auto" });
// Klan name in post
$$(".hiddenTd h4").invoke("setStyle", { display: "block", maxWidth: "170px", maxHeight: "4em", overflow: "auto" });
// Klan name in dom
$$("div.klan_link").invoke("setStyle", { maxWidth: "170px", maxHeight: "4em", overflow: "auto" });
