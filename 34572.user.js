// ==UserScript==
// @name           Newgrounds Theme Inspector
// @namespace      themeInspector@snakehole.net
// @description    Grabs the Logo, Header and Background images from Newgrounds and displays in an easy to save format with hints on which parts might be different from the original NG Theme
// @include        *.newgrounds.com/*
// ==/UserScript==

// #mainframe is the next part to do.

var TG_css = 'position:fixed; z-index:9999; border:1px solid black; ' +
          'top:50%; left:50%; width:67em; margin:-15em 0 0 -30em; height:29em; display:none;';
/*document.getElementById("center").style.backgroundImage = "none";
document.getElementById("main").style.backgroundImage = "none";
document.body.style.backgroundImage = "none";*/
var TG_bodyStyle = 'font-family: Arial,Helvetica,sans-serif; color:#d0d0d0;';
var TG_prefHTML = 'data:text/html;charset=utf-8,<!DOCTYPE HTML PUBLIC "-%2F%2FW3C%2F%2FDTD HTML 4.0%2F%2FEN">%0D%0A<html lang%3D"en">%0D%0A <head>%0D%0A  <title>Test<%2Ftitle>%0D%0A  <style type%3D"text%2Fcss">%0D%0A  h1 {font-size%3A18px%3B margin%3A3px auto%3B}%0D%0A  h2 {font-size%3A16px%3B margin%3A3px auto%3B}%0D%0A%0D%0A  select {float%3Aright%3B}%0D%0A  table {margin%3Aauto%3B}%0D%0A  td {min-width%3A200px%3B}%0D%0A  input {margin%3A3px auto%3B}%0D%0A  body {text-align%3Acenter%3Bfont-size%3A12px%3B}%0D%0A  img  {border%3A 1px solid transparent%3B}%0D%0A  img.new  {border%3A 1px solid %23ddd%3B}%0D%0A  <%2Fstyle>%0D%0A%0D%0A <%2Fhead>%0D%0A <body>%0D%0A  <h1>Newgrounds Theme Inspector<%2Fh1>%0D%0A  <table>%0D%0A  <tr>%0D%0A  <td>Header<%2Ftd>%0D%0A  <td>Logo<%2Ftd>%0D%0A  <td>Background %26amp%3B Mainframe<%2Ftd>%0D%0A  <%2Ftr>%0D%0A  <tr>%0D%0A  <td><a id%3D"HeaderLink" target%3D"_top"><img id%3D"HeaderImage" height%3D"87px" width%3D"200px"%2F><%2Fa><%2Ftd>%0D%0A  <td><a id%3D"LogoLink" target%3D"_top"><img id%3D"LogoImage" height%3D"37px" width%3D"200px"%2F><%2Fa><%2Ftd>%0D%0A  <td><a id%3D"BackgroundLink" target%3D"_top"><img id%3D"BackgroundImage" height%3D"87px" width%3D"200px" style%3D"display%3Ainline"%2F><%2Fa>%0D%0A  <a id%3D"MainframeLink" target%3D"_top"><img id%3D"MainframeImage" height%3D"87px" width%3D"10px" style%3D"display%3Ainline"%2F><%2Fa><%2Ftd>%0D%0A  <%2Ftr>%0D%0A  <%2Ftable>%0D%0A  <div><h2>Image Locations%3A<%2Fh2><%2Fdiv>%0D%0A  <div id%3D"locations" style%3D"border%3A1px solid %23000%3Bbackground%3A%233e3e47">%0D%0A%09%09This is where the lines of text will go to send to me.%0D%0A  <%2Fdiv>%0D%0A  <input type%3D"button" value%3D"Close Pop-up" id%3D"GMNGTG_cancel" name%3D"GMNGTG_cancel"%2F>%0D%0A <%2Fbody>%0D%0A<%2Fhtml>';


re = /url\((.*)\)/;

if (document.getElementById("center").style.backgroundImage != "none" && getComputedStyle(document.getElementById("center"),'').getPropertyValue('background-image').match(re) != null){
var siteLogo = getComputedStyle(document.getElementById("center"),'').getPropertyValue('background-image').match(re)[1];
}else{siteLogo = "none";}

if (document.getElementById("main").style.backgroundImage != "none" && getComputedStyle(document.getElementById("main"),'').getPropertyValue('background-image').match(re) != null){
var siteHeader = getComputedStyle(document.getElementById("main"),'').getPropertyValue('background-image').match(re)[1];
}else{siteHeader = "none";}

if (document.body.style.backgroundImage != "none" && getComputedStyle(document.body,'').getPropertyValue('background-image').match(re) != null){
var siteBG = getComputedStyle(document.body,'').getPropertyValue('background-image').match(re)[1];
}else{siteBG = "none";}

if (document.getElementById("mainframe").style.backgroundImage != "none" && getComputedStyle(document.getElementById("mainframe"),'').getPropertyValue('background-image').match(re) !=null){
var siteMainframe = getComputedStyle(document.getElementById("mainframe"),'').getPropertyValue('background-image').match(re)[1];
}else{siteMainframe = "none";}


var TG_iframe = document.createElement('iframe');
TG_iframe.setAttribute('style', TG_css);
TG_iframe.setAttribute('id', 'NGThemeInspector');
document.body.appendChild(TG_iframe);

// The about:blank page becomes a blank(!) canvas to modify
//iframe.src = 'about:blank';

TG_iframe.src = TG_prefHTML;

function TG_openSettings(){
// document.body.appendChild(iframe);
  TG_populate();
  TG_iframe.style.display = "block";
}

function TG_closeSettings(){
  TG_iframe.style.display = "none";
}

TG_iframe.addEventListener("load", function() {
    var TG_doc = TG_iframe.contentDocument;
    TG_doc.body.style.background = '#27272d';
	TG_doc.body.style.cssText += TG_bodyStyle;
	TG_doc.getElementById('GMNGTG_cancel').addEventListener('click', TG_closeSettings, false);  //Add click event listener to Cancel button, calls closeSettings()

	//alert(iframe.innerHTML);
    //iframe.style.width = doc.body.offsetWidth + "px";
    //iframe.style.height = doc.body.offsetHeight + "px";
}, false);


function TG_populate(){
re = /url\((.*)\)/;

if (document.getElementById("center").style.backgroundImage != "none" && getComputedStyle(document.getElementById("center"),'').getPropertyValue('background-image').match(re) != null){
var siteLogo = getComputedStyle(document.getElementById("center"),'').getPropertyValue('background-image').match(re)[1];
}else{siteLogo = "none";}

if (document.getElementById("main").style.backgroundImage != "none" && getComputedStyle(document.getElementById("main"),'').getPropertyValue('background-image').match(re) != null){
var siteHeader = getComputedStyle(document.getElementById("main"),'').getPropertyValue('background-image').match(re)[1];
}else{siteHeader = "none";}

if (document.body.style.backgroundImage != "none" && getComputedStyle(document.body,'').getPropertyValue('background-image').match(re) != null){
var siteBG = getComputedStyle(document.body,'').getPropertyValue('background-image').match(re)[1];
}else{siteBG = "none";}

if (document.getElementById("mainframe").style.backgroundImage != "none" && getComputedStyle(document.getElementById("mainframe"),'').getPropertyValue('background-image').match(re) !=null){
var siteMainframe = getComputedStyle(document.getElementById("mainframe"),'').getPropertyValue('background-image').match(re)[1];
}else{siteMainframe = "none";}




	//	Add hyperlinks
  document.getElementById('NGThemeInspector').contentDocument.getElementById('HeaderLink').href = siteHeader;
  document.getElementById('NGThemeInspector').contentDocument.getElementById('LogoLink').href = siteLogo;
  document.getElementById('NGThemeInspector').contentDocument.getElementById('BackgroundLink').href = siteBG;
  document.getElementById('NGThemeInspector').contentDocument.getElementById('MainframeLink').href = siteMainframe;

  var message = document.getElementById('NGThemeInspector').contentDocument.getElementById('locations');
	//	Set image src and add light gray border if possibly new ( add text inserts into if statements )
  document.getElementById('NGThemeInspector').contentDocument.getElementById('HeaderImage').src = siteHeader;
  if (siteHeader != "http://img.ngfiles.com/headerbg.jpg" && siteHeader != "none")
  {document.getElementById('NGThemeInspector').contentDocument.getElementById('HeaderImage').className="new";
  message.innerHTML = "<strong>Header: " + siteHeader + "</strong>";}else{
  document.getElementById('NGThemeInspector').contentDocument.getElementById('HeaderImage').className=null;
  message.innerHTML = "Header: " + siteHeader;}
  
  message.innerHTML += "<br/>"
  
  document.getElementById('NGThemeInspector').contentDocument.getElementById('LogoImage').src = siteLogo;
  if (siteLogo != "http://img.ngfiles.com/logobg.gif" && siteLogo != "none")
  {document.getElementById('NGThemeInspector').contentDocument.getElementById('LogoImage').className="new";
  message.innerHTML += "<strong>Logo: " + siteLogo + "</strong>";}else{
  document.getElementById('NGThemeInspector').contentDocument.getElementById('LogoImage').className=null;
  message.innerHTML += "Logo: " + siteLogo;}
  
  message.innerHTML += "<br/>";
  
  document.getElementById('NGThemeInspector').contentDocument.getElementById('BackgroundImage').src = siteBG;
  if (siteBG != "http://img.ngfiles.com/bg.gif" && siteBG != "none")
  {document.getElementById('NGThemeInspector').contentDocument.getElementById('BackgroundImage').className="new";
  message.innerHTML += "<strong>Background: " + siteBG + "</strong>";}else{
  document.getElementById('NGThemeInspector').contentDocument.getElementById('BackgroundImage').className=null;
  message.innerHTML += "Background: " + siteBG;}
  message.innerHTML += "<br/>";
  
  document.getElementById('NGThemeInspector').contentDocument.getElementById('MainframeImage').src = siteMainframe;
  if (siteMainframe != "http://img.ngfiles.com/tile.gif" && siteMainframe != "none")
  {document.getElementById('NGThemeInspector').contentDocument.getElementById('MainframeImage').className="new";
  message.innerHTML += "<strong>Mainframe: " + siteMainframe + "</strong>";}else{
  document.getElementById('NGThemeInspector').contentDocument.getElementById('MainframeImage').className=null;
  message.innerHTML += "Mainframe: " + siteMainframe;}
}

//  alert(siteHeader + "\n" + siteLogo + "\n" + siteBG);
GM_registerMenuCommand("Newgrounds Theme Inspector", function() {
  TG_openSettings();
});