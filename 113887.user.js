// ==UserScript==
// @name           hordes essential v2
// @namespace      saison 6
// @include        http://www.hordes.fr/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.action { margin-right: -145px  ! important; } #clock { display: none  ! important; } #backReboot { display: none  ! important; } .citySign { display: none  ! important; } .infoBar {margin-top: -145px  ! important;} .critical {display: none  ! important;} .expertMode {display: none  ! important;} .tutorialBlock {display: none  ! important;} .heroHelp {display: none  ! important;} #heroContainer {display: none  ! important;} #gameBodyLight {margin-top: -150px  ! important;} #mtLabel {display: none  ! important;} .logo {display: none  ! important;} #content {margin-top: -40px  ! important;box-shadow: 1px 0px 10px #000  ! important;background-image: none  ! important;} #contentBg {box-shadow: 1px 0px 10px #000  ! important;height: 1870px ! important;background-position: top left ! important;} #footer {display: none  ! important;} #backRight {background-image: none  ! important;} #backLeft {background-image: none  ! important;} #contentHP {display: none ! important;} div.video2 {display: none ! important;} div.press {display: none ! important;} #fbAd {display: none ! important;} #tid_bar_down {display: none ! important;} div.pegi {display: none ! important;} a.tid_logo.tid_barTip img {display: none ! important;} div.hordeFacts {display: none ! important;} div.footerZonzon {display: none ! important;} a.tid_menuButton.tid_active span {display: none ! important;} td.tid_separator.tid_sep_logo div {display: none ! important;} #ghostHeroAd {display: none ! important;} div.warning {display: none ! important;} div.helpLink {display: none ! important;} p.ambiant {display: none ! important;} div.label {display: none ! important;} div.link a {display: none ! important;} div.tid_goalHelp {display: none ! important;} #ghostHeroChoose {display: none ! important;} div.headerBg {display: none ! important;} ul.linkControl {display: none ! important;} div.tid_forumRules.tid_bg1 {display: none ! important;} div.cityHome h2 {display: none ! important;} div.cityHome em {display: none ! important;} p.text {display: none ! important;} p.book {display: none ! important;} div.footer {display: none ! important;} div.help {display: none ! important;}');