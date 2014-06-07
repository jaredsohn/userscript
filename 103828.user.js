// ==UserScript==
// @name           Remember FreeRainbowTables password
// @namespace      9ce43838-cda4-4702-b787-368e2cc6180f
// @description    Enable autocomplete for login form on FRT
// @include        http://www.freerainbowtables.com/*
// @include        http://freerainbowtables.com/*
// ==/UserScript==

/*
 * Copyright (c) 2011 nulliplex
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so.
 */

"use strict";

function fix_passwd_form() {
    var inputs = document.getElementsByName('password');
    for(var i = 0; i < inputs.length; i++)
    {
        var input = inputs[i];
        input.setAttribute('autocomplete', 'on');
    }

    var inputs = document.getElementsByName('rememberme');
    for(var i = 0; i < inputs.length; i++)
    {
        var input = inputs[i];
        input.setAttribute('checked', 'checked');
    }
}

fix_passwd_form();

