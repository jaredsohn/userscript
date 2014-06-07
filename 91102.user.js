//
// CBMTest
// @author  Kristijan Vještica
// @mail    kristijanvjestica@gmail.com
// @version 0.0.0
//
// Copyright 2010, Kristijan Vještica
//
// ==UserScript==
// @name           CBMTest
// @namespace      http://charazay.com/test
// @description    Test script.
// @include        http://charazay.com/*
// @include        http://*.charazay.com/*
// ==/UserScript==

var version = "0.0.0";

playerName();

function playerName() {
	var player = xPathFirstResult("//div[@id='mc']/div[@id='pagetitle']/div[3]//a");
	if (!player) return;

	var nista = document.createElement("td");

var tabela = xPathFirstResult("//div[@id='mc-ls']/table[1]/tbody[1]/tr[1]");
var red = xPathFirstResult("//div[@id='mc-ls']/table[1]/tbody[1]/tr[1]/td[1]");
nista.innerHTML="Advanced Players"

tabela.insertBefore(nista, red);

}

function xPath(xPathExpression, element) {
	if (!element) {
		element = document;
	}
	return document.evaluate(xPathExpression, element, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xPathFirstResult(xPathExpression, element) {
	return xPath(xPathExpression, element).snapshotItem(0);
}