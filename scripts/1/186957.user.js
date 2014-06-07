// ==UserScript==
// @name       Pinboard Padlock Emoji Fix for Chrome
// @namespace  RobbieLJ
// @version    0.2
// @description  A easy fix for padlock emoji missing in Chrome
// @include     https://pinboard.in/*
// @run-at        document-start
// ==/UserScript==

GM_addStyle("a[title='privacy lock is on'] {\
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAcRJREFUOE/Njs9L22AcxvtfeBH8AzyKeN0QdlUUQQbOq4ooTJEdBIfIoKx0bWgjnfPHmMMuWLV0NaRbW+1hpS1NDdISk6Y9dEboD6VdQ6eXx6S8eKnx7AceeHi+z/vwWp4ngUCgWxRFp6IoF4YM7/f7u8n5aYLBYG+hUKiVSiWk0+m2DF8sFmvGjdTMicfjCUmS4PV6MxRFjbhcrhGGYTKyLCOZTCZI7XFomu7RS+A4ruVwOLpIbDG8kfE8D7fb3UPiTvRiXzgchs/nU0n0gJGdxmKw2+19JOrkeGvSxnpXwTIfNT5MedKRdV20h//9ycMyVi30Yw3Hm5M2Uu8kH11Um8pX/L9icVs5xV0tjrvqH9yWo2hdBtDM70COLHT87gGZm1EbOSe04h5apSP9UVDXT90fQCt8Qz1LQWKnzQfEown1OrWCfzkXmvIXaMoOtPw2mtJnNLJOXKfeQzx8Yz6Q+z6sliOzuNFH6pkPaAjWtur8Gm6Sy6hE55DdHTYfEKgX6t/9cVR+TaN6Mo9a7G1bVf1hOTSFy4PXEKiX5gPcUr+QsA7ibH0IwsYozrfGcL451vZn9BBStlcIvRsQSP1ZYLHcA69+PLD/WUnQAAAAAElFTkSuQmCC); \
            display:-webkit-inline-box; \
            height:16px; \
            width:16px; \
            overflow: hidden; \
            text-indent:200%; \
            white-space:nowrap; \
            vertical-align:text-bottom }"
           );



