// ==UserScript==
// @name           Easy Access Functions
// @namespace      LWChris
// @description    JavaScript functions for easier element access
// @include        http://*
// @grant          none
// ==/UserScript==

// Shortcut
var d=document;

// Easy access functions
// Element
function ID     (Val)         { return SID(d,Val); }
function Name   (Val, Num)    { return SName(d, Val, Num); }
function Class  (Val, Num)    { return SClass(d, Val, Num); }
function Tag    (Val, Num)    { return STag(d, Val, Num); }

// Subelement
function SID    (E, Val)      { return E.getElementById(Val);}
function SName  (E, Val, Num) { if (Num) return SLName(E, Val)[Num]; else return SLName(E, Val)[0]; }
function SClass (E, Val, Num) { if (Num) return SLClass(E, Val)[Num]; else return SLClass(E, Val)[0]; }
function STag   (E, Val, Num) { if (Num) return SLTag(E, Val)[Num]; else return SLTag(E, Val)[0]; }

// Null-save subelement
function NID    (E, Val)      { if (E) return SID(E, Val); else return null; }
function NName  (E, Val, Num) { if (E) return SName(E, Val, Num); else return null; }
function NClass (E, Val, Num) { if (E) return SClass(E, Val, Num); else return null; }
function NTag   (E, Val, Num) { if (E) return STag(E, Val, Num); else return null; }

// Element list
function LName   (Val)    { return SLName(d, Val); }
function LClass  (Val)    { return SLClass(d, Val); }
function LTag    (Val)    { return SLTag(d, Val); }

// Subelement list
function SLName  (E, Val) { return E.getElementsByName(Val); }
function SLClass (E, Val) { return E.getElementsByClassName(Val); }
function SLTag   (E, Val) { return E.getElementsByTagName(Val); }

// Null-save subelement list
function NLName  (E, Val) { if (E) return SLName(E, Val); else return null; }
function NLClass (E, Val) { if (E) return SLClass(E, Val); else return null; }
function NLTag   (E, Val) { if (E) return SLTag(E, Val); else return null; }