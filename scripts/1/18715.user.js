// ==UserScript==
// @name           Virtual Keyboard
// @description    Adds a virtual keyboard to text fields, password fields and textareas allowing keyboardless input of text and special characters.  Install the script and double-click on one of the form element types above to display the keyboard.
// ==/UserScript==


/* ********************************************************************
 **********************************************************************
 * HTML Virtual Keyboard Interface - Greasemonkey script - v1.4a
 *   Copyright (c) 2007 - GreyWyvern
 *
 *  - Licenced for free distribution under the BSDL
 *          http://www.opensource.org/licenses/bsd-license.php
 *
 * Add a script-driven keyboard interface to text fields, password
 * fields and textareas automatically in Firefox.  Double click any of
 * these types of fields to display the keyboard.
 *
 * See http://www.greywyvern.com/code/js/keyboard.html for examples and
 * usage instructions.
 *
 * Version 1.4a - October 15, 2007
 *   - Keyboard is fully removed from document when hidden
 *
 * Version 1.4 - August 1, 2007
 *   - Simplified layout syntax a bit
 *   - Added version number to lower right of interface
 *   - Various other small bug fixes
 *
 * Version 1.3 - July 30, 2007
 *   - Interaction styling changes (Alt, AltGr, Shift)
 *   - Justified keys - last key expands to fit width
 *   - If no dead keys in layout, dead key checkbox is hidden
 *   - Option to disable dead keys per keyboard
 *   - Added the Number Pad layout
 *   - Pulled all variations of script up to same version number
 *
 * Keyboard credits
 *   - Lithuanian and Russian keyboard layouts added by Ramunas
 *   - German keyboard layout added by QuHno
 *   - French keyboard layout added by Hidden Evil
 *   - Polish Programmers layout assisted by moose
 *   - Turkish keyboard layouts added by offcu
 *   - Dutch and US Int'l keyboard layouts assisted by jerone
 *   - Portuguese keyboard layout added by clisboa
 *
 */
window.addEventListener('load', function() {
  var VKI_link = document.createElement('link');
      VKI_link.setAttribute('rel', "stylesheet");
      VKI_link.setAttribute('type', "text/css");
      VKI_link.setAttribute('href', "data:text/css,#keyboardInputMaster{position:absolute;border:2px groove #dddddd;color:#000000;background-color:#dddddd;text-align:left;z-index:1000000;width:auto;}#keyboardInputMaster thead tr th{text-align:left;padding:2px 5px 2px 4px;background-color:inherit;border:0px none;}#keyboardInputMaster thead tr th select,#keyboardInputMaster thead tr th label{color:#000000;font:normal 11px Arial,sans-serif;}#keyboardInputMaster thead tr td{text-align:right;padding:2px 4px 2px 5px;background-color:inherit;border:0px none;}#keyboardInputMaster thead tr td span{padding:1px 4px;font:bold 11px Arial,sans-serif;border:1px outset #aaaaaa;background-color:#cccccc;cursor:pointer;}#keyboardInputMaster thead tr td span.pressed{border:1px inset #999999;background-color:#bbbbbb;}#keyboardInputMaster tbody tr td{text-align:left;margin:0px;padding:0px 4px 3px 4px;}#keyboardInputMaster tbody tr td div{text-align:center;position:relative;height:0px;}#keyboardInputMaster tbody tr td div#keyboardInputLayout{height:auto;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table{height:20px;white-space:nowrap;width:100%;border-collapse:separate;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table.keyboardInputCenter{width:auto;margin:0px auto;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td{vertical-align:middle;padding:0px 5px 0px 5px;white-space:pre;font:normal 11px 'Lucida Console',monospace;border-top:1px solid #e5e5e5;border-right:1px solid #5d5d5d;border-bottom:1px solid #5d5d5d;border-left:1px solid #e5e5e5;background-color:#eeeeee;cursor:default;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.last{width:99%;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.alive{background-color:#ccccdd;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.target{background-color:#ddddcc;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.hover{border-top:1px solid #d5d5d5;border-right:1px solid #555555;border-bottom:1px solid #555555;border-left:1px solid #d5d5d5;background-color:#cccccc;}#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.pressed,#keyboardInputMaster tbody tr td div#keyboardInputLayout table tbody tr td.dead{border-top:1px solid #555555;border-right:1px solid #d5d5d5;border-bottom:1px solid #d5d5d5;border-left:1px solid #555555;background-color:#cccccc;}#keyboardInputMaster tbody tr td div var{position:absolute;bottom:0px;right:0px;font:bold italic 11px Arial,sans-serif;color:#444444;}.keyboardInputInitiator{margin-left:3px;vertical-align:middle;cursor:pointer;}");

  var VKI_head = VKI_title = 0;
  try {
    if (VKI_head = document.getElementsByTagName('head')[0]) {
      VKI_head.appendChild(VKI_link);
    } else if (VKI_title = document.getElementByTagName('title')[0])
      VKI_title.parentNode.insertBefore(VKI_link, title);
  } catch(e) {}

  if (VKI_head || VKI_title) VKI_buildKeyboardInputs();
}, false);


function VKI_buildKeyboardInputs() {
  var self = this;

  this.VKI_version = "1.4a";
  this.VKI_target = this.VKI_visible = "";
  this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
  this.VKI_deadkeysOn = false;
  this.VKI_kt = "US";  // Default keyboard layout
  this.VKI_range = false;
  this.VKI_keyCenter = 3;


  /* ***** Create keyboards **************************************** */
  this.VKI_layout = new Object();
  this.VKI_layoutDDK = new Object();

  // - Lay out each keyboard in rows of sub-arrays.  Each sub-array
  //   represents one key.
  // 
  // - Each sub-array consists of four slots described as follows:
  //     example: ["a", "A", "\u00e1", "\u00c1"]
  //
  //          a) Normal character
  //          A) Character + Shift or Caps
  //     \u00e1) Character + Alt or AltGr
  //     \u00c1) Character + Shift or Caps + Alt or AltGr
  //
  //   You may include sub-arrays which are fewer than four slots.  In
  //   these cases, the missing slots will be blanked when the
  //   corresponding modifier key (Shift or AltGr) is pressed.
  //
  // - If the second slot of a sub-array matches one of the following
  //   strings:
  //       "Tab", "Caps", "Shift", "Enter", "Bksp", "Alt" OR "AltGr"
  //   then the function of the key will be the following,
  //   respectively:
  //     - Insert a tab
  //     - Toggle Caps Lock (technically a Shift Lock)
  //     - Next entered character will be the shifted character
  //     - Insert a newline (textarea), or close the keyboard
  //     - Delete the previous character
  //     - Next entered character will be the alternate character
  //
  //   The first slot of this sub-array will be the text to display on
  //   the corresponding key.  This allows for easy localisation of key
  //   names.
  //
  // - Layout dead keys (diacritic + letter) should be added as arrays
  //   of two item arrays with hash keys equal to the diacritic.  See
  //   the "this.VKI_deadkey" object below the layout definitions. In
  //   each two item child array, the second item is what the diacritic
  //   would change the first item to.
  //
  // - To disable dead keys for a layout, simply assign true to the
  //   this.VKI_layoutDDK (DDK = disable dead keys) object of the same
  //   name as the layout.  See the Numpad layout below for an example.
  //
  // - Note that any characters beyond the normal ASCII set should be
  //   entered in escaped Unicode format.  (eg \u00a3 = Pound symbol)
  //   You can find Unicode values for characters here:
  //     http://unicode.org/charts/
  //
  // - To remove a keyboard, just delete it, or comment it out of the
  //   source code

  this.VKI_layout.Belgian = [ // Belgian Standard Keyboard
    [["\u00b2", "\u00b3"], ["&", "1", "|"], ["\u00e9", "2", "@"], ['"', "3", "#"], ["'", "4"], ["(", "5"], ["\u00a7", "6", "^"], ["\u00e8", "7"], ["!", "8"], ["\u00e7", "9", "{"], ["\u00e0", "0", "}"], [")", "\u00b0"], ["-", "_"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u005e", "\u00a8", "["], ["$", "*", "]"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%", "\u00b4"], ["\u03bc", "\u00a3", "`"]],
    [["Shift", "Shift"], ["<", ">", "\\"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["=", "+", "~"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Dutch = [ // Dutch Standard Keyboard
    [["@", "\u00a7", "\u00ac"], ["1", "!", "\u00b9"], ["2", '"', "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00bc"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "_", "\u00a3"], ["8", "(", "{"], ["9", ")", "}"], ["0", "'"], ["/", "?", "\\"], ["\u00b0", "~", "\u00b8"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R", "\u00b6"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00a8", "^"], ["*", "|"], ["<", ">"]],
    [["Caps", "Caps"], ["a", "A"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["+", "\u00b1"], ["\u00b4", "\u0060"], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["]", "[", "\u00a6"], ["z", "Z", "\u00ab"], ["x", "X", "\u00bb"], ["c", "C", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":", "\u00b7"], ["-", "="], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Dvorak = [ // Dvorak Keyboard
    [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["[", "{"], ["]", "}"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"],["'", '"'], [",", "<"], [".", ">"], ["p", "P"], ["y", "Y"], ["f", "F"], ["g", "G"], ["c", "C"], ["r", "R"], ["l", "L"], ["/", "?"], ["=", "+"], ["\\", "|"]],
    [["Caps", "Caps"], ["a", "A"], ["o", "O"], ["e", "E"], ["u", "U"], ["i", "I"], ["d", "D"], ["h", "H"], ["t", "T"], ["n", "N"], ["s", "S"], ["-", "_"], ["Enter", "Enter"]],
    [["Shift", "Shift"], [";", ":"], ["q", "Q"], ["j", "J"], ["k", "K"], ["x", "X"], ["b", "B"], ["m", "M"], ["w", "W"], ["v", "V"], ["z", "Z"], ["Shift", "Shift"]],
    [[" ", " "]]
  ];

  this.VKI_layout.French = [ // French Standard Keyboard
    [["\u00b2", "\u00b3"], ["&", "1"], ["\u00e9", "2", "~"], ['"', "3", "#"], ["'", "4", "{"], ["(", "5", "["], ["-", "6", "|"], ["\u00e8", "7", "\u0060"], ["_", "8", "\\"], ["\u00e7", "9", "\u005e"], ["\u00e0", "0", "\u0040"], [")", "\u00b0", "]"], ["=", "+", "}"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["a", "A"], ["z", "Z"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u005e", "\u00a8"], ["$", "\u00a3", "\u00a4"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["q", "Q"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["m", "M"], ["\u00f9", "%"], ["*", "\u03bc"]],
    [["Shift", "Shift"], ["<", ">"], ["w", "W"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], [",", "?"], [";", "."], [":", "/"], ["!", "\u00a7"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.German = [ // German Standard Keyboard
    [["\u005e", "\u00b0"], ["1", "!"], ["2", '"', "\u00b2"], ["3", "\u00a7", "\u00b3"], ["4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["\u00df", "?", "\\"], ["\u00b4", "\u0060"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q", "\u0040"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["z", "Z"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00fc", "\u00dc"], ["+", "*", "~"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f6", "\u00d6"], ["\u00e4", "\u00c4"], ["#", "'"]],
    [["Shift", "Shift"], ["<", ">", "\u00a6"], ["y", "Y"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u00b5"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Greek = [ // Greek Standard Keyboard
    [["`", "~"], ["1", "!"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a3"], ["5", "%", "\u00a7"], ["6", "^", "\u00b6"], ["7", "&"], ["8", "*", "\u00a4"], ["9", "(", "\u00a6"], ["0", ")", "\u00ba"], ["-", "_", "\u00b1"], ["=", "+", "\u00bd"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], [";", ":"], ["\u03c2", "^"], ["\u03b5", "\u0395"], ["\u03c1", "\u03a1"], ["\u03c4", "\u03a4"], ["\u03c5", "\u03a5"], ["\u03b8", "\u0398"], ["\u03b9", "\u0399"], ["\u03bf", "\u039f"], ["\u03c0", "\u03a0"], ["[", "{", "\u201c"], ["]", "}", "\u201d"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["\u03b1", "\u0391"], ["\u03c3", "\u03a3"], ["\u03b4", "\u0394"], ["\u03c6", "\u03a6"], ["\u03b3", "\u0393"], ["\u03b7", "\u0397"], ["\u03be", "\u039e"], ["\u03ba", "\u039a"], ["\u03bb", "\u039b"], ["\u0384", "\u00a8", "\u0385"], ["'", '"'], ["\\", "|", "\u00ac"]],
    [["Shift", "Shift"], ["<", ">"], ["\u03b6", "\u0396"], ["\u03c7", "\u03a7"], ["\u03c8", "\u03a8"], ["\u03c9", "\u03a9"], ["\u03b2", "\u0392"], ["\u03bd", "\u039d"], ["\u03bc", "\u039c"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Lithuanian = [ // Lithuanian Standard Keyboard
    [["`", "~"], ["\u0105", "\u0104"], ["\u010D", "\u010C"], ["\u0119", "\u0118"], ["\u0117", "\u0116"], ["\u012F", "\u012E"], ["\u0161", "\u0160"], ["\u0173", "\u0172"], ["\u016B", "\u016A"], ["\u201E", "("], ["\u201C", ")"], ["-", "_"], ["\u017E", "\u017D"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["\\", "|"]],
    [["Shift", "Shift"], ["\u2013", "\u20AC"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " "]]
  ];

  this.VKI_layout.Norwegian = [ // Norwegian Standard Keyboard
    [["|", "\u00a7"], ["1", "!"], ["2", '"', "@"], ["3", "#", "\u00a3"], ["4", "\u00a4", "$"], ["5", "%"], ["6", "&"], ["7", "/", "{"], ["8", "(", "["], ["9", ")", "]"], ["0", "=", "}"], ["+", "?"], ["\\", "`", "\u00b4"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["\u00e5", "\u00c5"], ["\u00a8", "^", "~"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00f8", "\u00d8"], ["\u00e6", "\u00c6"], ["'", "*"]],
    [["Shift", "Shift"], ["<", ">"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M", "\u03bc", "\u039c"], [",", ";"], [".", ":"], ["-", "_"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Numpad = [ // Number pad
    [["$"], ["\u00a3"], ["\u20ac"], ["\u00a5"], ["/"], ["^"], ["Bksp", "Bksp"]],
    [["."], ["7"], ["8"], ["9"], ["*"], ["<"], ["("], ["["]],
    [["="], ["4"], ["5"], ["6"], ["-"], [">"], [")"], ["]"]],
    [["0"], ["1"], ["2"], ["3"], ["+"], ["Enter", "Enter"]],
    [[" "]]
  ];
  this.VKI_layoutDDK.Numpad = true;

  this.VKI_layout["Polish Prog"] = [ // Polish Programmers Keyboard
    [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u0119", "\u0118"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
    [["Caps", "Caps"], ["a", "A", "\u0105", "\u0104"], ["s", "S", "\u015b", "\u015a"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u0142", "\u0141"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["z", "Z", "\u017c", "\u017b"], ["x", "X", "\u017a", "\u0179"], ["c", "C", "\u0107", "\u0106"], ["v", "V"], ["b", "B"], ["n", "N", "\u0144", "\u0143"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["Alt", "Alt"]]
  ];

  this.VKI_layout.Portuguese = [ // Portuguese Standard Keyboard
    [["`", "\u00ac", "\u00a6"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u00e7", "\u00c7"], [";", ":"], ["'", "@"], ["#", "~"]],
    [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.Russian = [ // Russian Standard Keyboard
    [["\u0451", "\u0401"], ["1", "!"], ["2", '"'], ["3", "\u2116"], ["4", ";"], ["5", "%"], ["6", ":"], ["7", "?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["\u0439", "\u0419"], ["\u0446", "\u0426"], ["\u0443", "\u0423"], ["\u043A", "\u041A"], ["\u0435", "\u0415"], ["\u043D", "\u041D"], ["\u0433", "\u0413"], ["\u0448", "\u0428"], ["\u0449", "\u0429"], ["\u0437", "\u0417"], ["\u0445", "\u0425"], ["\u044A", "\u042A"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["\u0444", "\u0424"], ["\u044B", "\u042B"], ["\u0432", "\u0412"], ["\u0430", "\u0410"], ["\u043F", "\u041F"], ["\u0440", "\u0420"], ["\u043E", "\u041E"], ["\u043B", "\u041B"], ["\u0434", "\u0414"], ["\u0436", "\u0416"], ["\u044D", "\u042D"], ["\\", "/"]],
    [["Shift", "Shift"], ["/", "|"], ["\u044F", "\u042F"], ["\u0447", "\u0427"], ["\u0441", "\u0421"], ["\u043C", "\u041C"], ["\u0438", "\u0418"], ["\u0442", "\u0422"], ["\u044C", "\u042C"], ["\u0431", "\u0411"], ["\u044E", "\u042E"], [".", ","], ["Shift", "Shift"]],
    [[" ", " "]]
  ];

  this.VKI_layout["Turkish-F"] = [ // Turkish F Keyboard Layout
    [['+', "*", "\u00ac"], ["1", "!", "\u00b9", "\u00a1"], ["2", '"', "\u00b2"], ["3", "^", "#", "\u00b3"], ["4", "$", "\u00bc", "\u00a4"], ["5", "%", "\u00bd"], ["6", "&", "\u00be"], ["7", "'", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["/", "?", "\\", "\u00bf"], ["-", "_", "|"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["f", "F", "@"], ["g", "G"], ["\u011f", "\u011e"], ["\u0131", "\u0049", "\u00b6", "\u00ae"], ["o", "O"], ["d", "D", "\u00a5"], ["r", "R"], ["n", "N"], ["h", "H", "\u00f8", "\u00d8"], ["p", "P", "\u00a3"], ["q", "Q", "\u00a8"], ["w", "W", "~"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["u", "U", "\u00e6", "\u00c6"], ["i", "\u0130", "\u00df", "\u00a7"], ["e", "E", "\u20ac"], ["a", "A", " ", "\u00aa"], ["\u00fc", "\u00dc"], ["t", "T"], ["k", "K"], ["m", "M"], ["l", "L"], ["y", "Y", "\u00b4"], ["\u015f", "\u015e"], ["x", "X", "`"]],
    [["Shift", "Shift"], ["<", ">", "|", "\u00a6"], ["j", "J", "\u00ab", "<"], ["\u00f6", "\u00d6", "\u00bb", ">"], ["v", "V", "\u00a2", "\u00a9"], ["c", "C"], ["\u00e7", "\u00c7"], ["z", "Z"], ["s", "S", "\u00b5", "\u00ba"], ["b", "B", "\u00d7"], [".", ":", "\u00f7"], [",", ";", "-"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
  ];

  this.VKI_layout["Turkish-Q"] = [ // Turkish Q Keyboard Layout
    [['"', "\u00e9", "<"], ["1", "!", ">"], ["2", "'", "\u00a3"], ["3", "^", "#"], ["4", "+", "$"], ["5", "%", "\u00bd"], ["6", "&"], ["7", "/", "{"], ["8", "(", '['], ["9", ")", ']'], ["0", "=", "}"], ["*", "?", "\\"], ["-", "_", "|"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q", "@"], ["w", "W"], ["e", "E", "\u20ac"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["\u0131", "\u0049", "\u0069", "\u0130"], ["o", "O"], ["p", "P"], ["\u011f", "\u011e", "\u00a8"], ["\u00fc", "\u00dc", "~"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A", "\u00e6", "\u00c6"], ["s", "S", "\u00df"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], ["\u015f", "\u015e", "\u00b4"], ["\u0069", "\u0130"], [",", ";", "`"]],
    [["Shift", "Shift"], ["<", ">", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], ["\u00f6", "\u00d6"], ["\u00e7", "\u00c7"], [".", ":"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "],  ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.UK = [ // UK Standard Keyboard
    [["`", "\u00ac", "\u00a6"], ["1", "!"], ["2", '"'], ["3", "\u00a3"], ["4", "$", "\u20ac"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P"], ["[", "{"], ["]", "}"], ["Enter", "Enter"]],
    [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", "@"], ["#", "~"]],
    [["Shift", "Shift"], ["\\", "|"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["AltGr", "AltGr"]]
  ];

  this.VKI_layout.US = [ // US Standard Keyboard
    [["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q"], ["w", "W"], ["e", "E"], ["r", "R"], ["t", "T"], ["y", "Y"], ["u", "U"], ["i", "I"], ["o", "O"], ["p", "P"], ["[", "{"], ["]", "}"], ["\\", "|"]],
    [["Caps", "Caps"], ["a", "A"], ["s", "S"], ["d", "D"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L"], [";", ":"], ["'", '"'], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["z", "Z"], ["x", "X"], ["c", "C"], ["v", "V"], ["b", "B"], ["n", "N"], ["m", "M"], [",", "<"], [".", ">"], ["/", "?"], ["Shift", "Shift"]],
    [[" ", " "]]
  ];

  this.VKI_layout["US Int'l"] = [ // US International Keyboard
    [["`", "~"], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"], ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"], ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"], ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
    [["Tab", "Tab"], ["q", "Q", "\u00e4", "\u00c4"], ["w", "W", "\u00e5", "\u00c5"], ["e", "E", "\u00e9", "\u00c9"], ["r", "R", "\u00ae"], ["t", "T", "\u00fe", "\u00de"], ["y", "Y", "\u00fc", "\u00dc"], ["u", "U", "\u00fa", "\u00da"], ["i", "I", "\u00ed", "\u00cd"], ["o", "O", "\u00f3", "\u00d3"], ["p", "P", "\u00f6", "\u00d6"], ["[", "{", "\u00ab"], ["]", "}", "\u00bb"], ["\\", "|", "\u00ac", "\u00a6"]],
    [["Caps", "Caps"], ["a", "A", "\u00e1", "\u00c1"], ["s", "S", "\u00df", "\u00a7"], ["d", "D", "\u00f0", "\u00d0"], ["f", "F"], ["g", "G"], ["h", "H"], ["j", "J"], ["k", "K"], ["l", "L", "\u00f8", "\u00d8"], [";", ":", "\u00b6", "\u00b0"], ["'", '"', "\u00b4", "\u00a8"], ["Enter", "Enter"]],
    [["Shift", "Shift"], ["z", "Z", "\u00e6", "\u00c6"], ["x", "X"], ["c", "C", "\u00a9", "\u00a2"], ["v", "V"], ["b", "B"], ["n", "N", "\u00f1", "\u00d1"], ["m", "M", "\u00b5"], [",", "<", "\u00e7", "\u00c7"], [".", ">"], ["/", "?", "\u00bf"], ["Shift", "Shift"]],
    [[" ", " ", " ", " "], ["Alt", "Alt"]]
  ];


  /* ***** Define Dead Keys **************************************** */
  this.VKI_deadkey = new Object();

  // - Lay out each dead key set in one row of sub-arrays.  The rows
  //   below are wrapped so uppercase letters are below their lowercase
  //   equivalents.
  //
  // - The first letter in each sub-array is the letter pressed after
  //   the diacritic.  The second letter is the letter this key-combo
  //   will generate.
  //
  // - Note that if you have created a new keyboard layout and want it
  //   included in the distributed script, PLEASE TELL ME if you have
  //   added additional dead keys to the ones below.

  this.VKI_deadkey['"'] = this.VKI_deadkey['\u00a8'] = [ // Umlaut / Diaeresis / Greek Dialytika
    ["a", "\u00e4"], ["e", "\u00eb"], ["i", "\u00ef"], ["o", "\u00f6"], ["u", "\u00fc"], ["y", "\u00ff"], ["\u03b9", "\u03ca"], ["\u03c5", "\u03cb"],
    ["A", "\u00c4"], ["E", "\u00cb"], ["I", "\u00cf"], ["O", "\u00d6"], ["U", "\u00dc"], ["Y", "\u0178"], ["\u0399", "\u03aa"], ["\u03a5", "\u03ab"]
  ];
  this.VKI_deadkey['~'] = [ // Tilde
    ["a", "\u00e3"], ["o", "\u00f5"], ["n", "\u00f1"],
    ["A", "\u00c3"], ["O", "\u00d5"], ["N", "\u00d1"]
  ];
  this.VKI_deadkey['^'] = [ // Circumflex
    ["a", "\u00e2"], ["e", "\u00ea"], ["i", "\u00ee"], ["o", "\u00f4"], ["u", "\u00fb"], ["w", "\u0175"], ["y", "\u0177"],
    ["A", "\u00c2"], ["E", "\u00ca"], ["I", "\u00ce"], ["O", "\u00d4"], ["U", "\u00db"], ["W", "\u0174"], ["Y", "\u0176"]
  ];
  this.VKI_deadkey['`'] = [ // Grave
    ["a", "\u00e0"], ["e", "\u00e8"], ["i", "\u00ec"], ["o", "\u00f2"], ["u", "\u00f9"],
    ["A", "\u00c0"], ["E", "\u00c8"], ["I", "\u00cc"], ["O", "\u00d2"], ["U", "\u00d9"]
  ];
  this.VKI_deadkey["'"] = this.VKI_deadkey['\u00b4'] = this.VKI_deadkey['\u0384'] = [ // Acute / Greek Tonos
    ["a", "\u00e1"], ["e", "\u00e9"], ["i", "\u00ed"], ["o", "\u00f3"], ["u", "\u00fa"], ["\u03b1", "\u03ac"], ["\u03b5", "\u03ad"], ["\u03b7", "\u03ae"], ["\u03b9", "\u03af"], ["\u03bf", "\u03cc"], ["\u03c5", "\u03cd"], ["\u03c9", "\u03ce"],
    ["A", "\u00c1"], ["E", "\u00c9"], ["I", "\u00cd"], ["O", "\u00d3"], ["U", "\u00da"], ["\u0391", "\u0386"], ["\u0395", "\u0388"], ["\u0397", "\u0389"], ["\u0399", "\u038a"], ["\u039f", "\u038c"], ["\u03a5", "\u038e"], ["\u03a9", "\u038f"]
  ];
  this.VKI_deadkey["\u0385"] = [ // Greek Dialytika + Tonos
    ["\u03b9", "\u0390"], ["\u03c5", "\u03b0"]
  ];
  this.VKI_deadkey['\u00b0'] = this.VKI_deadkey['\u00ba'] = [ // Ring
    ["a", "\u00e5"],
    ["A", "\u00c5"]
  ];



  /* ***** Find tagged input & textarea elements ******************* */
  var inputElems = [
    document.getElementsByTagName('input'),
    document.getElementsByTagName('textarea'),
  ]
  for (var y = 0, inputCount = 0; y < inputElems.length; y++) {
    if (inputElems[y]) {
      for (var x = 0; x < inputElems[y].length; x++) {
        if ((inputElems[y][x].nodeName == "TEXTAREA" || inputElems[y][x].type == "text" || inputElems[y][x].type == "password")) {
          var keyid = "";
          if (!inputElems[y][x].id) {
            do { keyid = 'keyboardInputInitiator' + inputCount++; } while (document.getElementById(keyid));
          } else keyid = inputElems[y][x].id;
          inputElems[y][x].addEventListener('dblclick', (function(a) { return function() { self.VKI_show(a); }; })(keyid), false);
          inputElems[y][x].id = keyid;
        }
      }
    }
  }


  /* ***** Build the keyboard interface **************************** */
  this.VKI_keyboard = document.createElement('table');
  this.VKI_keyboard.id = "keyboardInputMaster";
  this.VKI_keyboard.cellSpacing = this.VKI_keyboard.cellPadding = this.VKI_keyboard.border = "0";

  var layouts = 0;
  for (ktype in this.VKI_layout) if (typeof this.VKI_layout[ktype] == "object") layouts++;

  var thead = document.createElement('thead');
    var tr = document.createElement('tr');
      var th = document.createElement('th');
        if (layouts > 1) {
          var kblist = document.createElement('select');
            for (ktype in this.VKI_layout) {
              if (typeof this.VKI_layout[ktype] == "object") {
                var opt = document.createElement('option');
                    opt.value = ktype;
                    opt.appendChild(document.createTextNode(ktype));
                  kblist.appendChild(opt);
              }
            }
              kblist.value = this.VKI_kt;
              kblist.addEventListener('change', function() {
                self.VKI_kt = this.value;
                self.VKI_buildKeys();
                self.VKI_position();
              }, false);
          th.appendChild(kblist);
        }

          var label = document.createElement('label');
            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.checked = this.VKI_deadkeysOn;
                checkbox.title = "Toggle dead key input";
                checkbox.addEventListener('click', function() {
                  self.VKI_deadkeysOn = this.checked;
                  this.nextSibling.nodeValue = " Dead keys: " + ((this.checked) ? "On" : "Off");
                  self.VKI_modify("");
                  return true;
                }, false);
              label.appendChild(checkbox);
              label.appendChild(document.createTextNode(" Dead keys: " + ((checkbox.checked) ? "On" : "Off")))
          th.appendChild(label);
        tr.appendChild(th);

      var td = document.createElement('td');
        var clearer = document.createElement('span');
            clearer.id = "keyboardInputClear";
            clearer.appendChild(document.createTextNode("Clear"));
            clearer.title = "Clear this input";
            clearer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
            clearer.addEventListener('mouseup', function() { this.className = ""; }, false);
            clearer.addEventListener('click', function() {
              self.VKI_target.value = "";
              self.VKI_target.focus();
              return false;
            }, false);
          td.appendChild(clearer);

        var closer = document.createElement('span');
            closer.id = "keyboardInputClose";
            closer.appendChild(document.createTextNode('X'));
            closer.title = "Close this window";
            closer.addEventListener('mousedown', function() { this.className = "pressed"; }, false);
            closer.addEventListener('mouseup', function() { this.className = ""; }, false);
            closer.addEventListener('click', function(e) { self.VKI_close(); }, false);
          td.appendChild(closer);

        tr.appendChild(td);
      thead.appendChild(tr);
  this.VKI_keyboard.appendChild(thead);

  var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
      var td = document.createElement('td');
          td.colSpan = "2";
        var div = document.createElement('div');
            div.id = "keyboardInputLayout";
          td.appendChild(div);
        var div = document.createElement('div');
          var ver = document.createElement('var');
              ver.appendChild(document.createTextNode("v" + this.VKI_version));
            div.appendChild(ver);
          td.appendChild(div);
        tr.appendChild(td);
      tbody.appendChild(tr);
  this.VKI_keyboard.appendChild(tbody);      



  /* ***** Functions ************************************************ */
  /* ******************************************************************
   * Build or rebuild the keyboard keys
   *
   */
  this.VKI_buildKeys = function() {
    this.VKI_shift = this.VKI_capslock = this.VKI_alternate = this.VKI_dead = false;
    this.VKI_deadkeysOn = (this.VKI_layoutDDK[this.VKI_kt]) ? false : this.VKI_keyboard.getElementsByTagName('label')[0].getElementsByTagName('input')[0].checked;

    var container = this.VKI_keyboard.tBodies[0].getElementsByTagName('div')[0];
    while (container.firstChild) container.removeChild(container.firstChild);

    for (var x = 0, hasDeadKey = false; x < this.VKI_layout[this.VKI_kt].length; x++) {
      var table = document.createElement('table');
          table.cellSpacing = table.cellPadding = table.border = "0";
      if (this.VKI_layout[this.VKI_kt][x].length <= this.VKI_keyCenter) table.className = "keyboardInputCenter";
        var tbody = document.createElement('tbody');
          var tr = document.createElement('tr');
          for (var y = 0; y < this.VKI_layout[this.VKI_kt][x].length; y++) {
            if (!this.VKI_layoutDDK[this.VKI_kt] && !hasDeadKey)
              for (var z = 0; z < this.VKI_layout[this.VKI_kt][x][y].length; z++)
                if (this.VKI_deadkey[this.VKI_layout[this.VKI_kt][x][y][z]]) hasDeadKey = true;

            var td = document.createElement('td');
                td.appendChild(document.createTextNode(this.VKI_layout[this.VKI_kt][x][y][0]));

              var alive = false;
              if (this.VKI_deadkeysOn) for (key in this.VKI_deadkey) if (key === this.VKI_layout[this.VKI_kt][x][y][0]) alive = true;
                td.className = (alive) ? "alive" : "";
              if (this.VKI_layout[this.VKI_kt][x].length > this.VKI_keyCenter && y == this.VKI_layout[this.VKI_kt][x].length - 1)
                td.className += " last";

              if (this.VKI_layout[this.VKI_kt][x][y][0] == " ")
                td.style.paddingLeft = td.style.paddingRight = "50px";
                td.addEventListener('mouseover', function(e) { if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") this.className += " hover"; }, false);
                td.addEventListener('mouseout', function(e) { if (this.className != "dead") this.className = this.className.replace(/ ?(hover|pressed)/g, ""); }, false);
                td.addEventListener('mousedown', function(e) { if (this.className != "dead" && this.firstChild.nodeValue != "\xa0") this.className += " pressed"; }, false);
                td.addEventListener('mouseup', function(e) { if (this.className != "dead") this.className = this.className.replace(/ ?pressed/g, ""); }, false);
                td.addEventListener('dblclick', function() { return false; }, false);

              switch (this.VKI_layout[this.VKI_kt][x][y][1]) {
                case "Caps":
                case "Shift":
                case "Alt":
                case "AltGr":
                  td.addEventListener('click', (function(type) { return function() { self.VKI_modify(type); return false; }})(this.VKI_layout[this.VKI_kt][x][y][1]), false);
                  break;
                case "Tab":
                  td.addEventListener('click', function() { self.VKI_insert("\t"); return false; }, false);
                  break;
                case "Bksp":
                  td.addEventListener('click', function() {
                    self.VKI_target.focus();
                    if (self.VKI_target.setSelectionRange) {
                      var srt = self.VKI_target.selectionStart;
                      var len = self.VKI_target.selectionEnd;
                      if (srt < len) srt++;
                      self.VKI_target.value = self.VKI_target.value.substr(0, srt - 1) + self.VKI_target.value.substr(len);
                      self.VKI_target.setSelectionRange(srt - 1, srt - 1);
                    } else if (self.VKI_target.createTextRange) {
                      try { self.VKI_range.select(); } catch(e) {}
                      self.VKI_range = document.selection.createRange();
                      if (!self.VKI_range.text.length) self.VKI_range.moveStart('character', -1);
                      self.VKI_range.text = "";
                    } else self.VKI_target.value = self.VKI_target.value.substr(0, self.VKI_target.value.length - 1);
                    if (self.VKI_shift) self.VKI_modify("Shift");
                    if (self.VKI_alternate) self.VKI_modify("AltGr");
                    return true;
                  }, false);
                  break;
                case "Enter":
                  td.addEventListener('click', function() {
                    if (self.VKI_target.nodeName == "TEXTAREA") { self.VKI_insert("\n"); } else self.VKI_close();
                    return true;
                  }, false);
                  break;
                default:
                  td.addEventListener('click', function() {
                    if (self.VKI_deadkeysOn && self.VKI_dead) {
                      if (self.VKI_dead != this.firstChild.nodeValue) {
                        for (key in self.VKI_deadkey) {
                          if (key == self.VKI_dead) {
                            if (this.firstChild.nodeValue != " ") {
                              for (var z = 0, rezzed = false; z < self.VKI_deadkey[key].length; z++) {
                                if (self.VKI_deadkey[key][z][0] == this.firstChild.nodeValue) {
                                  self.VKI_insert(self.VKI_deadkey[key][z][1]);
                                  rezzed = true;
                                  break;
                                }
                              }
                            } else {
                              self.VKI_insert(self.VKI_dead);
                              rezzed = true;
                            }
                            break;
                          }
                        }
                      } else rezzed = true;
                    }
                    self.VKI_dead = false;

                    if (!rezzed && this.firstChild.nodeValue != "\xa0") {
                      if (self.VKI_deadkeysOn) {
                        for (key in self.VKI_deadkey) {
                          if (key == this.firstChild.nodeValue) {
                            self.VKI_dead = key;
                            this.className = "dead";
                            if (self.VKI_shift) self.VKI_modify("Shift");
                            if (self.VKI_alternate) self.VKI_modify("AltGr");
                            break;
                          }
                        }
                        if (!self.VKI_dead) self.VKI_insert(this.firstChild.nodeValue);
                      } else self.VKI_insert(this.firstChild.nodeValue);
                    }

                    self.VKI_modify("");
                    return false;
                  }, false);

                  for (var z = this.VKI_layout[this.VKI_kt][x][y].length; z < 4; z++)
                    this.VKI_layout[this.VKI_kt][x][y][z] = "\xa0";
              }
              tr.appendChild(td);
            tbody.appendChild(tr);
          table.appendChild(tbody);

          for (var z = this.VKI_layout[this.VKI_kt][x][y].length; z < 4; z++)
            this.VKI_layout[this.VKI_kt][x][y][z] = "\xa0";
      }
      container.appendChild(table);
    }
    this.VKI_keyboard.getElementsByTagName('label')[0].style.display = (hasDeadKey) ? "inline" : "none";
  }

  this.VKI_buildKeys();
  this.VKI_keyboard.addEventListener('mousedown', function() { return false; }, false);
  this.VKI_keyboard.addEventListener('click', function() { return true; }, false);


  /* ******************************************************************
   * Controls modifier keys
   *
   */
  this.VKI_modify = function(type) {
    switch (type) {
      case "Alt":
      case "AltGr": this.VKI_alternate = !this.VKI_alternate; break;
      case "Caps": this.VKI_capslock = !this.VKI_capslock; break;
      case "Shift": this.VKI_shift = !this.VKI_shift; break;
    }
    var vchar = 0;
    if (!this.VKI_shift != !this.VKI_capslock) vchar += 1;

    var tables = this.VKI_keyboard.getElementsByTagName('table');
    for (var x = 0; x < tables.length; x++) {
      var tds = tables[x].getElementsByTagName('td');
      for (var y = 0; y < tds.length; y++) {
        var dead = alive = target = false;

        switch (this.VKI_layout[this.VKI_kt][x][y][1]) {
          case "Alt":
          case "AltGr":
            if (this.VKI_alternate) dead = true;
            break;
          case "Shift":
            if (this.VKI_shift) dead = true;
            break;
          case "Caps":
            if (this.VKI_capslock) dead = true;
            break;
          case "Tab": case "Enter": case "Bksp": break;
          default:
            if (type) tds[y].firstChild.nodeValue = this.VKI_layout[this.VKI_kt][x][y][vchar + ((this.VKI_alternate && this.VKI_layout[this.VKI_kt][x][y].length == 4) ? 2 : 0)];
            if (this.VKI_deadkeysOn) {
              var char = tds[y].firstChild.nodeValue;
              if (this.VKI_dead) {
                if (char == this.VKI_dead) dead = true;
                for (var z = 0; z < this.VKI_deadkey[this.VKI_dead].length; z++)
                  if (char == this.VKI_deadkey[this.VKI_dead][z][0]) { target = true; break; }
              }
              for (key in this.VKI_deadkey) if (key === char) { alive = true; break; }
            }
        }

        tds[y].className = (dead) ? "dead" : ((target) ? "target" : ((alive) ? "alive" : ""));
        if (y == tds.length - 1 && tds.length > this.VKI_keyCenter) tds[y].className += " last";
      }
    }
    this.VKI_target.focus();
  }


  /* ******************************************************************
   * Insert text at the cursor
   *
   */
  this.VKI_insert = function(text) {
    this.VKI_target.focus();
    if (this.VKI_target.setSelectionRange) {
      var srt = this.VKI_target.selectionStart;
      var len = this.VKI_target.selectionEnd;
      this.VKI_target.value = this.VKI_target.value.substr(0, srt) + text + this.VKI_target.value.substr(len);
      if (text == "\n" && window.opera) srt++;
      this.VKI_target.setSelectionRange(srt + text.length, srt + text.length);
    } else if (this.VKI_target.createTextRange) {
      try { this.VKI_range.select(); } catch(e) {}
      this.VKI_range = document.selection.createRange();
      this.VKI_range.text = text;
      this.VKI_range.collapse(true);
      this.VKI_range.select();
    } else this.VKI_target.value += text;
    if (this.VKI_shift) this.VKI_modify("Shift");
    if (this.VKI_alternate) this.VKI_modify("AltGr");
    this.VKI_target.focus();
  }


  /* ******************************************************************
   * Show the keyboard interface
   *
   */
  this.VKI_show = function(id) {
    if (this.VKI_target = document.getElementById(id)) {
      if (this.VKI_visible != id) {
        this.VKI_range = "";
        try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}

        var elem = this.VKI_target;
        this.VKI_target.keyboardPosition = "absolute";
        do {
          if (VKI_getStyle(elem, "position") == "fixed") {
            this.VKI_target.keyboardPosition = "fixed";
            break;
          }
        } while (elem = elem.offsetParent);

        this.VKI_keyboard.style.top = this.VKI_keyboard.style.right = this.VKI_keyboard.style.bottom = this.VKI_keyboard.style.left = "auto";
        this.VKI_keyboard.style.position = this.VKI_target.keyboardPosition;
        document.body.appendChild(this.VKI_keyboard);

        this.VKI_visible = this.VKI_target.id;
        this.VKI_position();
        this.VKI_target.focus();
      } else this.VKI_close();
    }
  }


  /* ******************************************************************
   * Position the keyboard
   *
   */
  this.VKI_position = function() {
    if (self.VKI_visible != "") {
      var inputElemPos = VKI_findPos(self.VKI_target);
      self.VKI_keyboard.style.top = inputElemPos[1] - ((self.VKI_target.keyboardPosition == "fixed") ? document.body.scrollTop : 0) + self.VKI_target.offsetHeight + 3 + "px";
      self.VKI_keyboard.style.left = Math.min(VKI_innerDimensions()[0] - self.VKI_keyboard.offsetWidth - 15, inputElemPos[0]) + "px";
    }
  }


  if (window.addEventListener) {
    window.addEventListener('resize', this.VKI_position, false); 
  } else if (window.attachEvent)
    window.attachEvent('onresize', this.VKI_position);


  /* ******************************************************************
   * Close the keyboard interface
   *
   */
  this.VKI_close = function() {
    try { this.VKI_keyboard.parentNode.removeChild(this.VKI_keyboard); } catch (e) {}
    this.VKI_visible = "";
    this.VKI_target.focus();
    this.VKI_target = "";
  }
}

function VKI_findPos(obj) {
  var curleft = curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);    
  return [curleft, curtop];
}

function VKI_innerDimensions() {
  if (self.innerHeight) {
    return [self.innerWidth, self.innerHeight];
  } else if (document.documentElement && document.documentElement.clientHeight) {
    return [document.documentElement.clientWidth, document.documentElement.clientHeight];
  } else if (document.body)
    return [document.body.clientWidth, document.body.clientHeight];
  return [0, 0];
}

function VKI_getStyle(obj, styleProp) {
  if (obj.currentStyle) {
    var y = obj.currentStyle[styleProp];
  } else if (window.getComputedStyle)
    var y = window.getComputedStyle(obj, null)[styleProp];
  return y;
}