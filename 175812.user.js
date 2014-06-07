// ==UserScript==
// @name        IOI Table Fixer
// @namespace   IOI
// @description Adjusts Height & Width of IOI Tables
// @include    http://btvxmdioisrv.btv.ibm.com/ioi/portal/screen/datamart.EquipmentInfoInquiry/pane/RTD/equipment/*
// @include    http://btvxmdioisrv.btv.ibm.com/ioi/portal/screen/datamart.EquipmentInfoInquiry/equipment/*/pane/RTD
// ==/UserScript==


document.getElementsByTagName("div")[17].style.height="300px";
// in programming, the first index is generally zero

