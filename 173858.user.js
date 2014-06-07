// ==UserScript==
// @name AutoCheckSteamMarketToSBox
// @description Automatically checks the ToS box when making a purchase on the Steam market
// @author Adam Hellberg (sharparam) <sharparam@sharparam.com>
// @namespace https://github.com/Sharparam/UserScripts
// @downloadURL https://raw.github.com/Sharparam/UserScripts/master/AutoCheckSteamMarketToSBox.user.js
// @license MIT
// @copyright Copyright (c) 2013 by Adam Hellberg
// @include *://steamcommunity.com/market/listings/*
// @version 1.2
// @updateURL https://raw.github.com/Sharparam/UserScripts/master/AutoCheckSteamMarketToSBox.user.js
// ==/UserScript==

/* 
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 by Adam Hellberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function() {
    document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
})();

