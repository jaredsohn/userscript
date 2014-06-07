// ==UserScript==
// @name            reddit-highlight-OP-comments
// @namespace       ziffusion.com
// @description     Highlights OP comments on Reddit. The colors are configurable through GM menu, or through about:config. Search for "ziffusion.com" and modify values for "fgcolor" and "bgcolor"; "none" means no color.
// @include         http://www.reddit.com/comments/*
// @include         http://www.reddit.com/r/*/comments/*
// @version         0.6
// @changelog       -
// ==/UserScript==

// config

var fgcolor_def = "none";
var bgcolor_def = "#E0E0E0";

var fgcolor = GM_getValue("fgcolor", fgcolor_def);
var bgcolor = GM_getValue("bgcolor", bgcolor_def);
var cfgdone = GM_getValue("cfgdone", 0);

function cfg_save()
{
    GM_setValue("fgcolor", fgcolor);
    GM_setValue("bgcolor", bgcolor);
    GM_setValue("cfgdone", 1);
}

function cfg_dflt()
{
    fgcolor = fgcolor_def;
    bgcolor = bgcolor_def;
    cfg_save();
}

function cfg_fg_none()
{
    fgcolor = "none";
    cfg_save();
}

function cfg_fg_red()
{
    fgcolor = "red";
    cfg_save();
}

function cfg_bg_none()
{
    bgcolor = "none";
    cfg_save();
}

function cfg_bg_yellow()
{
    bgcolor = "#FFFF99";
    cfg_save();
}

function cfg_bg_slate()
{
    bgcolor = "#E0E0E0";
    cfg_save();
}

GM_registerMenuCommand("defaults",  cfg_dflt);
GM_registerMenuCommand("fg none",   cfg_fg_none);
GM_registerMenuCommand("fg red",    cfg_fg_red);
GM_registerMenuCommand("bg none",   cfg_bg_none);
GM_registerMenuCommand("bg yellow", cfg_bg_yellow);
GM_registerMenuCommand("bg slate",  cfg_bg_slate);

if (!cfgdone)
{
    cfg_save();
}

// body

var comments = unsafeWindow.$(".submitter").
               closest("div").
               children(".usertext").
               children(".usertext-body").
               children(".md");

if (fgcolor != "none") comments.css("color", fgcolor);
if (bgcolor != "none") comments.css("background-color", bgcolor);
