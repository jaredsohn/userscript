// ==UserScript==
// @name           Flamebate Scroller by quangntenemy, modified by CaptainDDL for profile pages
// @include        http://forumwarz.com/discussions
// @include        http://forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions
// @include        http://*.forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/profiles
// @include        http://*.forumwarz.com/profiles/*
// ==/UserScript==
$$ = unsafeWindow["window"].$$;

$$(".signature").invoke("setStyle", { maxHeight: "400px", overflow: "auto" });
$$(".body").invoke("setStyle", { display: "block", maxWidth: (screen.width - 280) + "px", maxHeight: (screen.height - 280) + "px", overflow: "auto" });
$$(".subject").invoke("setStyle", { maxWidth: (screen.width - 500) + "px" });
$$("#posts th").invoke("setStyle", { maxWidth: (screen.width - 80) + "px" });
$$(".hiddenTd h4").invoke("setStyle", { display: "block", maxWidth: "170px", maxHeight: "4em", overflow: "auto" });
$$(".datum").invoke("setStyle", { maxHeight: "400px", overflow: "auto" });
$$("#friends").invoke("setStyle", { maxHeight: "400px", overflow: "auto" });