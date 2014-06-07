// ==UserScript==
// @name MaxLength
// @namespace omrimon
// @description Max Lenfth
// @include *
// ==/UserScript==

<input type='text' name='element1' value='empty' maxlength=10>
<button onClick="element1.maxLength=30">set max length</button>