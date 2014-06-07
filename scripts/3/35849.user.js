// ==UserScript==
// @name          Extra Links in Bebees
// @namespace     iwg
// @description   Zeigt extra Links bei Bebees an
// @include       http://*.bebees.com/hive/*
// @include       http://*.bebees.com/map/*
// @include       http://*.bebees.com/colony/*
// @include       http://*.bebees.com/cell/*
// @include       http://*.bebees.com/messaging/*
// @include       http://*.bebees.com/stats/*
// @include       http://*.bebees.com/profile/*
// @include       http://*.bebees.com/hero/*
// @include       http://*.bebees.com/bee/*

// ==/UserScript==

var gm_topLineHeight = '22px';
var gm_topLineColor = '#000000';
var gm_topLineBackground = '#FDC71F';
var gm_topLineFontSize = 'small';
var gm_topLineTextAlign = 'center';

var gm_topLineStyle = 'style="'+
                'height :' + gm_topLineHeight + ';' +
                'background: transparent; ' +     
				'width: 100%;' +
                'color: '+ gm_topLineColor + ';"'


var gm_topLineInnerStyle = 'style="' +
		'margin: 0 auto 0 auto; ' +
                'padding: 3px; ' +
                'position: fixed; ' +
                'width: 100%; ' +
                'z-index: 100; ' +
                'height :' + gm_topLineHeight +
                'border-bottom: 1px solid #000000; ' +
                'margin-bottom: 5px; ' +
                'font-size: ' + gm_topLineFontSize + '; ' +
                'text-align: ' + gm_topLineTextAlign + ';' +
                'background: ' + gm_topLineBackground + '; ' +
				'background: url(data:image/png;base64,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%3D%3D) center no-repeat;' +
                'color: '+ gm_topLineColor + ';"'

var gm_topLine = document.createElement("div");

gm_topLine.innerHTML = '<div '+ gm_topLineStyle + '>' + 
'<div ' + gm_topLineInnerStyle + '>'+ 
        "<a href='/hero/' title='Held' style='color: #000000;'>Helden</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href='/bee/destroyer/' title='Destroyer' style='color: #000000;'>Destroyer</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href='/bee/guard/' title='W&auml;chter' style='color: #000000;'>W&auml;chter</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href='/bee/agent/' title='Spion' style='color: #000000;'>Spion</a>&nbsp;&nbsp;-&nbsp;&nbsp;<a href='/bee/saboteur/' title='Saboteur' style='color: #000000;'>Saboteur</a>" +
        '</div></div>';

document.body.insertBefore(gm_topLine, document.body.firstChild);
