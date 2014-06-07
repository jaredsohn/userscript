// ==UserScript==
// @name           we7 annoying frme zapper
// @namespace      we7
// @description    Zap the advert that covers up what you're currently playing!
// @include        http://www.we7.com/*
// ==/UserScript==

 

//Thanks to mindeye and is YousableTubeFix script for these utility functions
// Shortcut to document.getElementById

function $(id) {
                return document.getElementById(id);
}

 

// Returns a node from its id or a reference to it
function $ref(idRef) {
                return (typeof(idRef) == "string") ? $(idRef) : idRef;
}

 

// Deletes a node from its id or a reference to it
function delNode(targetNode) {
                var iNode = $ref(targetNode);
                if (iNode) return iNode.parentNode.removeChild(iNode);
                return null;
}

 
//The real work is here
delNode( "fck" );
delNode( "northbanner-advert" );