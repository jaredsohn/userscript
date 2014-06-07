// ==UserScript==
// @name        VimGolf Caddy
// @namespace   http://udioica.blogspot.com/
// @description Rank VimGolf challenges on main page, mark cheats on challenge pages
// @include     http://vimgolf.com/*
// @include     http://www.vimgolf.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     0.1.1
// ==/UserScript==

// TODO
// functionize the parsing
// add a "More ..." button
// hyperlink the player pages
// do the "other" player pages

var ch_ratings = {
	"5192f96ad8df110002000002": 2, // Words in parens
	"518360f3fa5db2000200001a": 8, // Lookahead and Lookbehind
	"514cd6218705080002000009": 10, // Amazing Π
	"51459ef6b94aa50002000002": 6, // It's a factor
	"513b1dcd2d1ae10002000010": 4, // Sort the VimGolf challenges by popularity
	"51330b88b051320002000044": 12, // CrossTab Shipping
	"51330725b051320002000042": 8, // Extended Customer 2
	"512eda055d6ed80002000025": 6, // Parsing with CSV: Unify lines and result.
	"51299b1c7b4021000200003f": 8, // text wrap entire file to 80 columns
	"5123331bb2bc340002000003": 8, // Fibonacci Triangles
	"511d618c094242000200001a": 8, // 199 Fibonacci Numbers
	"511991607729fb0002000003": 6, // Refactor arguments into object argument
	"51103ad8041832000200003f": 6, // vim = 22 / 7
	"510b1c61e48b7e0002000028": 8, // Chinese Multiplication Table
	"510a052c6db41b0002000028": 8, // LaTeX to XML Math Delimiters
	"51093f4c6db41b0002000003": 6, // Define to require
	"5107179a44d65e0002000048": 4, // Minimalist Limerick
	"5100ce70326e09000200004a": 5, // Saving the hashes(#)
	"50f3c2d55c891f0002000002": 4, // Word frequency alignment
	"50f1b2e316e0bb0002000051": 5, // Circle in a square
	"50ef5caf767623000200004b": 8, // Execute immediate SQL
	"50ee7504c0e3aa0002000040": 4, // Prefixes and suffixes
	"50ed6ac0c0e3aa0002000003": 6, // Coordinates placeholder
	"50ea3ca82bf6290002000040": 7, // XML to JSON
	"50e32889d5e627000200000d": 4, // Change your calendar
	"50d8b2039d73b70002000046": 8, // Greek Letters
	"50d76e775539af000200006f": 6, // Transposition
	"50d62c51162fd30002000052": 4, // REDRUM
	"50d42c56dffb94000200000c": 6, // Enumerate words
	"50d282f0b8dc050002000013": 8, // Fizzbuzz change description
	"50d0d80eaa503f000200001b": 2, // Swap assigned value
	"50d0c33daa503f000200000f": 5, // Groups magic
	"50c501dbd2883d0002000014": 6, // Face Values
	"50c455a3fc2bf70002000043": 9, // Pythagoras who?
	"50c2c246b0544c000200003f": 5, // Block Fun 1
	"50c195c1b85576000200005b": 7, // fib.c cleanup
	"50c18a08b855760002000056": 8, // Left Hand Right Hand Alternating
	"50c13afab855760002000049": 6, // Harder than "abcd > a b c d"
	"50be61aea748a30002000047": 5, // abcd > a b c d
	"50bda7a73645b3000200004b": 5, // lamb had a little Mary
	"50bd009f3645b30002000011": 8, // BIG BRACKET
	"50ba20af5b346c0002000035": 6, // Python: Lots of function arguments
	"50b8c545317f580002000027": 8, // Three checkerboard patterns
	"50b746da523acc0002000018": 7, // Checkerboard case pattern
	"50b5266f448d770002000106": 5, // Readable Rubyhash
	"50b4b5e6448d77000200004d": 5, // Chucking wood
	"50b375efd028d90002000050": 5, // Flip the chessboard
	"50b1d7239aad89000200002d": 6, // Extract text from xml
	"50b1517e9aad890002000004": 6, // Printable ASCII characters
	"50af864132b7ed0002000075": 3, // A simple change
	"50ae009b65b8db0002000047": 4, // Let's play some Ivmgolf
	"50ad2cb165b8db0002000029": 3, // Unwrap the text of an email message
	"50ab5251aeb26e0002000033": 7, // Sort by your own sum
	"50a9cedcf54bf60002000028": 5, // Sort by sum of numbers in a line(?)
	"50a2bdd4f0ea8a0002000055": 7, // Presidential Sorting
	"50a1b172c654360002000033": 7, // Add links to an existing HTML table
	"509beee00871f50002000033": 10, // Reformat text as two-column newspaper article
	"5095b2a565f0210002000060": 10, // VI Fighter
	"508fe9f57acca60002000037": 3, // Stairs Indenting
	"508ecd058f06b6000200003c": 9, // Format a SPIP table
	"5078889ceedfc90002000047": 7, // Python to Ruby
	"507874c3eedfc90002000031": 8, // Ruby < 1.9
	"505cb13a52512d000200002b": 6, // you're stuck on jQuery < 1.7
	"5054bc7dfa0b390002000031": 8, // SFD-ROC: It's all relatively absolute
	"5054bba8fa0b39000200002d": 10, // SFD-ROC: The Nez of Python
	"5054bb26fa0b39000200002b": 4, // SFD-ROC: ROT13 Phonics
	"5054baaafa0b390002000029": 3, // SFD-ROC: vimvimvim
	"5054ba5efa0b390002000026": 5, // SFD-ROC: ASCII Logo Border
	"5054ba0cfa0b390002000023": 4, // SFD-ROC: Pipe Dreams
	"5054b935fa0b390002000020": 6, // SFD-ROC: Tic-Tac-Toe
	"5054b8c6fa0b39000200001e": 5, // SFD-ROC: The Quick Brown Fox
	"5052f7682a8bfe0002000022": 7, // Easy One
	"5052dd5c2a8bfe000200001c": 5, // Enharmonic Equivalents
	"505263e130c82d000200007e": 9, // Circle of Fifths with Flats
	"50525d0730c82d0002000077": 8, // Circle of Fifths with Sharps
	"50522ce330c82d000200006c": 8, // The Grand Staff
	"5051a8ad30c82d0002000043": 8, // Solfege Flats
	"5051a7f630c82d0002000040": 8, // Solfege Sharps
	"50519ca330c82d0002000035": 5, // The name of the game
	"50513cc930c82d000200000a": 7, // Count the random spaces!
	"50503f955cfbf50002000026": 6, // Invisible Fibonacci
	"50502d985cfbf50002000022": 3, // NATO phonetic alphabet
	"504e43017890650002000019": 5, // The Quick Brown Fox Jumps Over The Lazy Vim
	"50406e76badccf000200003b": 8, // maximun and minimun
	"5039216a1eb07a0002000026": 7, // Sierpinski's Triangle
	"5036cda6c42d120002000047": 8, // Hash Formatting
	"5035e5b3838d9e000200006d": 7, // Dehamlizing
	"502f2e628f37220002000031": 7, // Create an alphabet diamond
	"5014b2156318a4000200000b": 7, // Convert regular pandoc footnotes to in-line notes
	"50128129201f450002000027": 6, // Complete the circuit grid!
	"50127eba201f450002000024": 5, // Make the circuit grid!
	"500855e60599d90002000073": 6, // Convert pandoc unordered list to a numbered list
	"50048db8cdc4060002000004": 2, // Vertical Limit
	"4ff83e9749534f000100003f": 9, // run of the mill SQL execute
	"4fe9ab8b5089660001000002": 5, // Shuffle and Sort
	"4fe62f8a8b2f800001000043": 7, // Cleanining up 80 column concatenated text
	"4fe3d2c2f73248000100004b": 5, // Changing URL path in CSS
	"4fe354e8f73248000100002d": 7, // Inconsistent real estate paste
	"4fdb12a383de630001000005": 5, // Aligning function arguments to match a specific coding style
	"4fcd8dc2ff37f20001000020": 6, // Create a pandoc compatible table
	"4fcccb70024f950001000026": 3, // Switch function arguments
	"4fca76aad3a0d4000100007e": 6, // Calculate the table totals
	"4fca701fd3a0d40001000074": 4, // Remove noise from HTTP log
	"4fca29ddd3a0d40001000038": 3, // Remove semicolons after expressions
	"4fc9d767d3a0d4000100000e": 3, // Append semicolon after expressions
	"4fbf8e303be58b0001000024": 6, // Format the output
	"4fb97a9099895e0001000019": 5, // Calculate table total
	"4fa0d2fa2037000001000057": 2, // Exchanging Quotes
	"4fa085222037000001000045": 3, // Reverse and double space
	"4f99b09353e306000100003f": 1, // The meaning
	"4f9840d6cb724b0001000010": 5, // Hi nok!
	"4f6144f46938f20001000061": 6, // un-C-escape string
	"4f438739f5a8d70001000019": 3, // replacing each line of a block selection
	"4f2be242779cbc000100000c": 4, // Ugly spreadsheet copy/paste to CSV
	"4f081a4ef037090001000074": 6, // constructor
	"4f0720c8f037090001000007": 1, // switch variable
	"4f026d9b50582b000100002e": 5, // Replacing some words
	"4ef209ef78702b0001000019": 4, // Make it more readable
	"4ed3d247a745c1000100002a": 5, // remove dupes from array
	"4ea9bc988b36f70001000008": 5, // Sort entries based on date
	"4e9edef5cef4c50001000007": 4, // PHP Array Syntax -> MailChimp Merge Syntax
	"4e7dedb4f447090001000002": 9, // Refactor to Helpers
	"4e5ec5851836e0000100003e": 5, // Alphabetize the directory
	"4e379f2fdfb67a000100002e": 8, // PHP <--> Java class conversion Part 2
	"4e31627b74ab580001000007": 8, // PHP <--> Java class conversion Part 1
	"4de6287b17a57a000100003f": 6, // formatted text to markdown
	"4dddc7c1ed7380000100000d": 6, // Multiplication table.
	"4ddbd92898957e0001000016": 3, // Line Zipper
	"4dd3e19aec9eb6000100000d": 5, // Complete the hex array data (Part II)
	"4dcd7b572c8e510001000005": 3, // Interweave two blocks of text
	"4db2c9272a007d1ee7000015": 6, // Complete the hex array data
	"4db0b1c8e8eb0f564b00001c": 5, // Case preserving word replacement
	"4dab05bff1161c5a78000011": 3, // Sort the cardinal numbers
	"4d841db4c46db57aae00002f": 10, // Make a PHP Template from a static HTML file
	"4d716c76919202611400002b": 3, // Numbering a List
	"4d6f45b938c0aa691b000003": 5, // Recursively Palindrome
	"4d665abd7d73e02a55000009": 6, // Java Array2List
	"4d5110077667ad04c4000018": 10, // CSS to SASS
	"4d4bc8512e218a370300001c": 6, // Remove duplicate items
	"4d4ab047795d626036000034": 3, // imports alignment (python)
	"4d42cde1e6dc010cb7000024": 6, // expand a list comprehension (python)
	"4d3c51f1aabf526ed6000030": 4, // HTML to Haml
	"4d39030bafc67a0f8c000076": 10, // categorize the shopping list
	"4d34af20e747f561b3000081": 4, // Rotating Philosophers Problem
	"4d2fb20e63b08b08b0000075": 8, // Overall Vimgolf Rank
	"4d2f0fe063b08b08b0000019": 8, // Promote that perl 'one-liner' ...
	"4d2c9d06eda6262e4e00007a": 3, // Assignment Alignment
	"4d29ae2107e0177c7e000036": 9, // Before there was Farmville...
	"4d28aef94bcd032f1c0000dc": 8, // The Universal Declaration of Human Rights, Article 1
	"4d287ec54bcd032f1c000075": 8, // Vim manuals written by Bram.
	"4d28637c4bcd032f1c00003d": 5, // Reformat long lines
	"4d26f42298e8d72471000025": 6, // Generate English Alphabets
	"4d2513c10947c63e2600019f": 7, // Here, piggy, piggy...
	"4d2482950947c63e260000b1": 6, // Word Blender
	"4d247aa50947c63e260000a4": 7, // Happy New Year!
	"4d2478e20947c63e2600009c": 5, // Insert a Markdown link
	"4d23054b7f75b01e0700014a": 7, // It'ss tooo coold too typpe todaay
	"4d2302587f75b01e0700013f": 4, // Do you have a big gun?
	"4d22dcfa7f75b01e0700010e": 7, // Getters & Setters: Java
	"4d22bb117f75b01e070000fb": 6, // Cartesian product
	"4d22038df74d0b11490000fb": 7, // Return the cow
	"4d216989f1a3f252f4000364": 8, // Align it, win it.
	"4d2061daf1a3f252f4000087": 7, // Solve the Sokoban
	"4d20618bf1a3f252f4000086": 4, // Reverse a single line
	"4d1ed78425ba287b2a000227": 6, // CSV to JSON
	"4d1ec7a825ba287b2a0001f1": 11, // Make Vim ASCII Art
	"4d1eaf7225ba287b2a00018b": 4, // Generate Fibonacci Numbers
	"4d1e93e825ba287b2a0000ed": 5, // The holy-grail may help
	"4d1e825925ba287b2a0000b7": 9, // fix typos, reformat and refactor an ActiveRecord model.
	"4d1e634e509d6e19d8000081": 4, // Shebangs for all
	"4d1e29fda93ce03311000066": 2, // Ruby 1.9 hashes
	"4d1e037dde2f897c2a000417": 5, // Reverse and count
	"4d1dfe2cde2f897c2a0003e3": 7, // Letters are numbers
	"4d1df910de2f897c2a0003c0": 3, // Almost encrypted
	"4d1db1b8de2f897c2a00014a": 3, // Reverse Simple Deletion
	"4d1da368de2f897c2a000114": 7, // Dumb to smart
	"4d1d0d5e35b40650b8000711": 8, // 82 bottles of beer on the wall
	"4d1cdb0635b40650b8000527": 3, // Make Fancy Header
	"4d1ccfde35b40650b80004ae": 1, // The Cake is a Lie
	"4d1cc35a35b40650b800043a": 1, // Increment, increment, increment....
	"4d1c7ee635b40650b8000203": 8, // Remove Accent off the Letter
	"4d1c6d0535b40650b800017e": 7, // Compile C
	"4d1c5e6035b40650b8000111": 6, // Another Mixed-Up Haiku
	"4d1c27940e3d7832db000010": 6, // Prime Numbers
	"4d1c1a3cf655cd081000000d": 1, // A Simple One
	"4d1bfc7ab2c3e06468000137": 6, // Round Round
	"4d1bfa8fb2c3e06468000127": 6, // Table Reshuffle
	"4d1be79bb2c3e064680000c6": 6, // Fix the Haiku
	"4d1bdde3b2c3e0646800007f": 4, // Indentation
	"4d1ba304c8bb5704eb00012d": 6, // Linear congruential generator
	"4d1b9703c8bb5704eb000081": 4, // Hatsuyume
	"4d1b795a81502541ad00000f": 2, // Context Insensitive completion 1
	"4d1b78e281502541ad000009": 8, // Turn this csv list into queries
	"4d1b76d9c58eaa2a8a000866": 2, // Context insensitive completion 0
	"4d1b4ac3c58eaa2a8a0005c2": 3, // Ruby 1.9 compat
	"4d1b3d57c58eaa2a8a000510": 6, // Sorting paragraphs
	"4d1b1b97c58eaa2a8a0002fc": 5, // Python Hello World! Reformatting
	"4d1ace6c142cca7133000033": 5, // Reformat some Python
	"4d1ac1800a045132c0000011": 5, // Reformat a C golf submission
	"4d1aaf2fb11838287d000036": 3, // Reverse characters in a line
	"4d1aa1d9b8cb34093200039f": 6, // PEP8 Python Wrapping Comments and Code
	"4d1a8bf2b8cb3409320002c4": 2, // Search and Replace 0
	"4d1a87fcb8cb340932000290": 5, // Deleting folded text
	"4d1a7a05b8cb3409320001b4": 7, // Get rid of html tags
	"4d1a790fb8cb3409320001a8": 5, // Reformat most common surnames
	"4d1a71c0b8cb34093200010b": 5, // Remember FizzBuzz?
	"4d1a71b5b8cb340932000109": 5, // Change the content of a string
	"4d1a6ed2b8cb3409320000c9": 5, // Add fold markers to a .c file
	"4d1a6bafb8cb34093200008e": 1, // Wrap the text of an email message to 79 characters
	"4d1a6a8eb8cb34093200007a": 5, // Reconstruct the Sentence
	"4d1a5275a860b74472000110": 2, // Sort and add attributes
	"4d1a522ea860b7447200010b": 6, // Braces or Brackets?
	"4d1a4f2ba860b744720000bf": 6, // Flodder-challenge
	"4d1a4d82a860b7447200008d": 5, // Whitespace, empty lines and tabs
	"4d1a34ccfa85f32065000004": 4, // Simple text editing with Vim
	"4d1a1c36567bac34a9000002": 5 // Reformat/Refactor a Golfer Class
};

var ch = 'Misc cheat';
var rc = 'Nonstandard vimrc';
var ut = 'External utility';
var hr = 'Challenge-specific violation';
var mo = 'Mouse';
var wr = 'Window not 80x25';
var ck = 'Cursor key';
var u8 = 'UTF-8 literal';
var pd = ':perldo';
var hf = 'Help file copy/paste';
var vg = 'Bug in vimgolf';
var vm = 'Vim version dependent';

var cheats = {
	// CrossTab Shipping (no information)
	// Make Vim ASCII Art
	"#4e26f0b69493cb0001000042": ut,
	// VI Fighter (no information)
	// Reformat text as two-column newspaper article (no information)
	// Make a PHP Template from a static HTML file
	"#500b4ebf0e2d670002000003": ck,
	"#4e6ced497328fa0001000004": ck,
	"#4e4938d4b0df2c0001000012": ck,
	"#4d95d621459844762a000003": ck,
	"#4d853bb43a8be56a1c00002a": ck,
	"#4d866958f4a7ab069d000027": ck,
	"#4e3a99b97a8d3c000100000c": ck,
	// categorize the shopping list
	"#50064c1fe2e1e30002000022": ck,
	"#4e63da4980c953000100001e": ck,
	// SFD-ROC: The Nez of Python
	"#50bc73e5fe10560002000004": ck,
	"#507be86bb041630002000007": ck,
	// fix typos, reformat and refactor an ActiveRecord model.
	"#5060fad475b633000200003b": ck,
	// Amazing Π (no information)
	// run of the mill SQL execute
	"#4ffd3ea95fa7360001000017": wr,
	"#5081ecbaea63710002000003": ck,
	// Format a SPIP table
	// Waiting for resolution to vimgolf bug #109
	// text wrap entire file to 80 columns
	"#517f203d9bdfff0002000002": wr,
	"#5135f0ba857c810002000037": wr,
	"#517c5189c81f1c000200000d": wr,
	// Three checkerboard patterns
	"#50c53f2ed2883d000200001a": vm,
	// Ruby < 1.9
	"#50790ef5eedfc90002000087": ck,
	"#50832d5ff188870002000001": ck,
	"#50794c860bd2bd0002000011": ck,
	// Promote that perl 'one-liner' ...
	"#510587b415fd1c000200001a": hf,
	"#4f4a2ba1187ed2000100001e": ck,
	"#4edc7178c52aa40001000034": ck,
	"#4e61c20f4df04e0001000004": ck,
	"#4d8731b6698e1d2d61000017": ch,
	"#4dc6147b0fe2817c1d000008": ch,
	"#4e082871ef087b000100000a": ch,
	"#4d8345e4c46db57aae000019": ch,
	"#4d792ba3753a2048d0000015": ck,
	"#4e368ce3cec4f40001000024": ck,
	"#4d346c74e747f561b3000047": ck,
	"#4d2f397e63b08b08b000002e": ck,
	"#4ddecc7bc841f80001000003": ck,
	"#4e160b1e2e4ca70001000031": ck,
	"#4d2f3c4163b08b08b0000030": ck,
	// Hash Formatting
	"#503acc1c0c44940002000032": ck,
	// Refactor to Helpers
	"#501a189b8b2eda000200000b": ck,
	// Vim manuals written by Bram.
	"#4d877649698e1d2d61000028": ut,
	"#4ed70da4e1180c000100004d": ut,
	"#4d2c8b9aeda6262e4e00006a": ut,
	"#4d2cd7e9eda6262e4e0000ba": ut,
	"#4d2889384bcd032f1c00007f": ut,
	"#4d29bc6607e0177c7e00004b": ut,
	// Before there was Farmville...
	"#4ffe25ff87385f0001000010": ck,
	"#507f46d5f5bdbf0002000024": ck,
	"#4fc0bc673531340001000034": ck,
	"#4e606ca2f9f4c30001000004": ck,
	// Remove Accent off the Letter
	"#4d1c906b35b40650b80002ad": ut,
	"#4d1c915a35b40650b80002b7": ut,
	"#4ed84fea6fc846000100007a": ut,
	// Greek Letters
	"#50d90bb362e7fb0002000001": hf,
	"#50d8d8439d73b70002000058": hf,
	"#5135e05a857c810002000035": ck,
	// Chinese Multiplication Table
	"#51817f880b88800002000024": ch,
	// Fizzbuzz change description
	"#50d2cd61b8dc05000200001d": ck,
	"#50d3675fb8dc05000200003a": ck,
	// Python to Ruby
	"#509a119e1be4090002000002": ck,
	"#508469d1f18887000200001d": ck,
	"#5086a7a312a2c6000200000e": ck,
	// Compile C
	"#4d1c771235b40650b80001b4": ut,
	"#4d1cd2bf35b40650b80004ce": ut,
	"#4d1cffc135b40650b80006a5": ut,
	"#4d1d1eb035b40650b8000799": ut,
	"#4d1d65c1de2f897c2a00003e": ut,
	"#4d24f7d10947c63e26000187": ut,
	"#4d299d2707e0177c7e000024": ut,
	"#4d2a3c2107e0177c7e0000ec": ut,
	"#4d2ff57fa78b7b3c6100000b": ut,
	"#4d8b80eb7667ad69e500002b": ut,
	"#4e26cd029493cb000100003e": ut,
	"#4ed838936fc846000100006d": ut,
	"#4f0fd801e5872c0001000022": ut,
	"#4f28cb2056b6e500010000e3": ut,
	"#4d1cb86835b40650b80003dc": ut,
	"#4d1cbb0935b40650b80003eb": ut,
	"#4d1cbcd035b40650b80003fd": ut,
	"#4d1dd634de2f897c2a00024f": ut,
	"#4d20f83af1a3f252f400027f": ut,
	"#4f3275c1a02ed00001000082": ut,
	"#4d1ceb9f35b40650b80005e2": ut,
	"#4d1dd871de2f897c2a000268": ut,
	"#4d2fd55b63b08b08b000008c": ut,
	"#4d3608724caddf7e63000079": ut,
	"#4e088c1def087b000100000e": ut,
	"#4e0c2e4be12baa000100001e": ut,
	"#4efdc85d03ed66000100000d": ut,
	"#4d1c963235b40650b80002de": ut,
	"#4d1c96e935b40650b80002e2": ut,
	"#4d1ca81735b40650b800035d": ut,
	"#4d1ca83d35b40650b8000360": ut,
	"#4d1cabce35b40650b8000385": ut,
	"#4d1cb5b535b40650b80003c9": ut,
	"#4d1cbf8535b40650b8000419": ut,
	"#4d1cd66f35b40650b80004f8": ut,
	"#4d1ce1f435b40650b8000579": ut,
	"#4d1d0ba435b40650b80006fb": ut,
	"#4d1e34ada93ce033110000e2": ut,
	"#4d1f13e225ba287b2a00026f": ut,
	"#4d1f4c7725ba287b2a0002cd": ut,
	"#4d23b782b835d24cc70000b0": ut,
	"#4d2a4e8d07e0177c7e000108": ut,
	"#4d3e8500f2dbe65468000012": ut,
	"#4d47c731fa85f3174400002b": ut,
	"#4d6aafcdfc718906e9000008": ut,
	"#4da82f18e7f2a8763c000030": ut,
	"#4dcc4fe7b6f79f0001000010": ut,
	"#4f3a1ca25c3be00001000010": ut,
	"#4d1c811435b40650b8000218": ut,
	"#4d1d00f535b40650b80006b3": ut,
	"#4d1deaf4de2f897c2a000349": ut,
	"#4d3e8a7af2dbe65468000015": ut,
	"#4d678ab80164a23292000021": ut,
	"#4e7120e5aaa1c0000100000e": ut,
	"#4f0d944f22d35a0001000029": ut,
	"#4d1cd9e735b40650b8000517": ut,
	"#4d1cf76535b40650b8000641": ut,
	"#4d204998f1a3f252f4000033": ut,
	"#4d2350867f75b01e070001cc": ut,
	"#4d25ad48ffe51219ad00007b": ut,
	"#4d25ccfaffe51219ad0000a5": ut,
	"#4e1b0b348c78d70001000015": ut,
	"#4d1c9c8f35b40650b80002fd": ut,
	"#4d208dd1f1a3f252f4000112": ut,
	"#4dbd8cfa0bb77909f3000006": ut,
	"#4f205cad138ec90001000024": ut,
	"#4d1caa5435b40650b8000374": ut,
	// maximun and minimun
	"#5081eb38ea63710002000001": ck,
	// Count the random spaces!
	// Waiting for resolution to vimgolf bug #109
	// fib.c cleanup
	"#50c856635b67160002000049": vg,
	"#50fb5ebb21b0890002000034": vg,
	// Overall Vimgolf Rank
	"#4dfdecc064c1780001000055": hr,
	"#4ff416621481140001000025": hr,
	// Inconsistent real estate paste
	"#4fe3632ff73248000100003b": ck,
	"#4fe3712ef732480001000040": ck,
	"#50156c8e6318a40002000047": ck,
	"#501571ab6318a40002000049": ck,
	"#502e2afc8f37220002000004": ck,
	"#5081f747ea6371000200000f": ck,
	"#4fe49f4a53537e000100002d": ck,
	// Solve the Sokoban
	"#4d28d6ee4bcd032f1c000116": ut,
	"#4e885edf4bd0aa0001000035": pd,
	"#4eda17cb3067520001000011": ut,
	"#50b79a43523acc000200002e": pd,
	"#4d28d2b24bcd032f1c00010d": ut,
	"#4d46ef8bfa85f31744000002": ut,
	// Cleanining up 80 column concatenated text
	"#4fe642818b2f800001000052": ck,
	"#4fe64eeb8b2f800001000058": ck,
	"#4fe691fb8b2f800001000065": ck,
	"#503966901eb07a0002000065": ck,
	"#504c0b5f59c6130002000010": ck,
	"#507f53c9f5bdbf0002000028": ck,
	// It'ss tooo coold too typpe todaay
	"#4d23298a7f75b01e07000182": wr,
	"#4d23b274b835d24cc70000a2": hf,
	"#4d26bc9c98e8d7247100000b": hf,
	"#4d26ef3b98e8d7247100001f": hf,
	"#4d307242a78b7b3c6100004d": hf,
	"#4e0c392de12baa000100002a": hf,
	"#4edc5619c52aa4000100002c": hf,
	"#4f2a0452a9780f0001000059": hf,
	"#4f3791c98e354a000100002a": hf,
	"#4fe23e8a0d625d0001000013": hf,
	"#4ffd812a5fa7360001000023": hf,
	"#4d239dbfb835d24cc700006f": hf,
	"#4d23bef0b835d24cc70000ce": hf,
	"#4d23c034b835d24cc70000d5": hf,
	"#4d248e2b0947c63e260000cf": hf,
	"#4d268650ffe51219ad000139": hf,
	"#4d28290c4bcd032f1c000017": hf,
	"#4d6e247591a5c57e02000019": hf,
	"#4e4bbd39ec97600001000015": hf,
	"#4eef698c03cf060001000029": hf,
	"#4fbffda03531340001000006": hf,
	"#5037a3712439700002000024": hf,
	"#4d2319df7f75b01e0700016b": hf,
	"#4d2338487f75b01e0700019f": hf,
	"#4d2434e40947c63e2600002d": hf,
	"#4d33752d03b198515a000077": hf,
	"#4d9ed5df28f8351cde000013": hf,
	"#4e66a1b5a675c70001000039": hf,
	"#4e8256aa319954000100000a": hf,
	"#4ec47457754a140001000026": hf,
	"#4f4874dec7939c0001000054": hf,
	"#4d237af9b835d24cc7000021": hf,
	"#4d90077ded389f0302000001": hf,
	// Get rid of html tags
	"#4d1b3da0c58eaa2a8a000518": ut,
	"#4d1ac25d0a045132c0000017": rc,
	// Generate English Alphabets
	"#4d27bbf198e8d724710000ef": wr,
	"#4d2862794bcd032f1c00003a": wr,
	"#4ed73249e1180c0001000062": wr,
	"#500b70960e2d670002000006": hf,
	"#500d756f39a4750002000031": hf,
	"#504f41c325b6980002000058": wr,
	"#4d2734ce98e8d72471000064": hf,
	"#4d27857a98e8d724710000b5": hf,
	"#4d27bab398e8d724710000ee": hf,
	"#4d27f6704bcd032f1c000003": hf,
	"#4d281af64bcd032f1c00000f": hf,
	"#4d281dd94bcd032f1c000012": hf,
	"#4d2839504bcd032f1c000024": hf,
	"#4d2889d94bcd032f1c000080": hf,
	"#4d28d2014bcd032f1c00010b": hf,
	"#4d28fcdf4bcd032f1c00014a": hf,
	"#4d2c9b89eda6262e4e000077": hf,
	"#4d31ce6e388d8d4bdc00002e": hf,
	"#4d32d50803b198515a00001a": hf,
	"#4d32f35303b198515a000031": hf,
	"#4d371fa8ab66837ca00000f5": hf,
	"#4d37a6deab66837ca00001a8": hf,
	"#4d481dbdfa85f3174400003f": hf,
	"#4d6ad00bfc718906e900002e": hf,
	"#4d7e1350bfdce75cd0000014": hf,
	"#4d8779aa698e1d2d6100002d": hf,
	"#4da67968df622a0f08000024": hf,
	"#4db9cf60c49df53559000016": hf,
	"#4dc46bd79a75782758000013": hf,
	"#4dfdfe2964c178000100005c": hf,
	"#4e0377964e9ae40001000028": hf,
	"#4e0c2b04e12baa0001000018": hf,
	"#4e0fcb6fdca6400001000005": hf,
	"#4e57b2f2ed66690001000017": hf,
	"#4edee292f2555e000100004e": hf,
	"#4eef678a03cf060001000023": hf,
	"#4f32eb15a02ed000010000c8": hf,
	"#4f453451d6e3500001000042": hf,
	"#5034b7501071750002000062": hf,
	// Dumb to smart
	"#4d3601924caddf7e63000073": u8,
	// Prime Numbers
	"#4d347f20e747f561b3000061": ut,
	"#4d42686ce6dc010cb700000b": ut,
	"#4ed827da6fc8460001000055": ut,
	// Sierpinski's Triangle
	"#504507639a38d30002000003": wr,
	"#507bda6db041630002000002": wr,
	// Return the cow
	"#4d2230127f75b01e07000028": ut,
	"#4d268886ffe51219ad00013b": ut,
	"#4edae171306752000100004a": ut,
	"#4d222a577f75b01e07000020": ut,
	"#4d486b608c66d27d5400000b": ut,
	"#4d2505d20947c63e26000198": ut,
	"#4e4819dfdd8b980001000010": ut,
	// Turn this csv list into queries
	"#50592d3e93b0e2000200000a": ck,
	// 82 bottles of beer on the wall
	"#4f4a66fd187ed20001000029": ck,
	// Add links to an existing HTML table
	"#518387bcfa5db2000200002e": wr,
	"#50a72b5854febf0002000007": wr,
	"#50aced7265b8db000200000c": wr,
	// Letters are numbers
	"#4d34c030e747f561b30000a4": pd,
	// PEP8 Python Wrapping Comments and Code
	"#5058ea7bcf5d6c00020000c5": wr,
	"#4d1b69b8c58eaa2a8a0007ce": rc,
	"#4d3af5e38150257c5500002d": rc,
	"#4ee85b7373f6cb000100004c": rc,
	"#50d2e8e8b8dc050002000028": rc,
	"#4d1ab8aa809bec3ae7000007": rc,
	"#4d1ac2560a045132c0000016": rc,
	// formatted text to markdown
	"#4e1b53e18c78d7000100001c": wr,
	"#4de64dee17a57a0001000054": wr,
	"#4ee906bbc1e9f10001000030": wr,
	// Fix the Haiku
	"#5059470193b0e2000200001c": ck,
	"#4d289fa24bcd032f1c0000b3": ck,
	"#4f466e661dd4970001000042": ck,
	// Deleting folded text
	"#4d1aa94db11838287d000008": ch,
	"#51008e09326e090002000044": ck,
	"#4fc186c726c699000100001f": ck,
	"#5022745edc9823000200001b": ck,
	"#5058dafecf5d6c00020000b8": ck,
	"#50808e12d2c9480002000012": ck,
	"#50ae654f32b7ed0002000010": ck,
	// Reformat a C golf submission
	"#4f17e66d1bf7490001000024": ut,
	"#4d39852df655cd337d000042": ut,
	"#4d1aea94c58eaa2a8a00007c": ut,
	"#4d1d5e9ade2f897c2a000017": ut,
	"#4d1da274de2f897c2a00010f": ut,
	"#4df5649365775d0001000007": ut,
	"#4ed4f3e150d4140001000033": ut,
	"#4f5b404240d8850001000005": ut,
	"#4d1b6b8cc58eaa2a8a0007e0": rc,
	"#4d1b2056c58eaa2a8a000339": rc,
	"#4d1bbef7c8bb5704eb000230": rc,
	"#4d1b0fedc58eaa2a8a000260": rc,
	"#4d1b2d2dc58eaa2a8a0003f2": rc,
	"#4d1ac6e00a045132c0000038": rc,
	"#4d1b605fc58eaa2a8a0006fd": rc,
	"#4d1ac3120a045132c000001b": ut,
	"#4d1af1c0c58eaa2a8a0000e4": rc,
	"#4d1b5ea3c58eaa2a8a0006dc": rc,
	"#4d1c1012b2c3e06468000193": rc,
	"#4f3ba4aa2e209f0001000015": ck,
	"#4f9d06bb8dccf1000100000f": ck,
	"#503a59240c44940002000008": ck,
	"#5047875b5233a20002000029": ck,
	// Python Hello World! Reformatting
	"#4d1b39b5c58eaa2a8a0004d3": rc,
	"#4d1b403dc58eaa2a8a00053c": rc,
	"#4d1b5e07c58eaa2a8a0006d7": ch,
	"#4d1b4f0ec58eaa2a8a0005f3": rc,
	"#4d1b4f08c58eaa2a8a0005f2": rc,
	"#4d1b6f8ec58eaa2a8a000819": rc,
	"#4d1b6fcfc58eaa2a8a00081e": rc,
	"#4d1b896df823fb739f000002": rc,
	"#5070b96fcd26310002000086": wr,
	"#4d1bad38c8bb5704eb000197": rc,
	"#4e43e7e9a6a77f0001000015": ck,
	"#4ed61bcae1180c000100000a": ck,
	"#4f0864d9f037090001000087": ck,
	"#4f31b458a02ed0000100000c": ck,
	"#4f32b4a1a02ed000010000a5": ck,
	"#4f37e8728e354a000100005c": ck,
	"#4fc1a88526c699000100003c": ck,
	"#5059295fcf5d6c00020000e3": ck,
	// Insert a Markdown link
	"#4d3f500ff2dbe6546800005e": ck,
	"#4d6e667791a5c57e02000022": ck,
	"#4d7805e9919202066b000035": ck,
	"#4d859781f4a7ab069d00000f": ck,
	"#4d88c523cb6e5d738700001d": ck,
	"#4f1647a9a43cd20001000021": ck,
	"#4f3395223d70ce000100002c": ck,
	// Easy One
	"#5052fe042a8bfe0002000023": u8,
	"#50538ffc2a8bfe000200005f": u8,
	"#5053fa83fa0b390002000008": u8,
	"#5055c051f86a4c0002000050": u8,
	"#5056216af86a4c000200006e": u8,
	"#505b1b8846b9e9000200000f": u8,
	"#505f57bc4b32d80002000014": u8,
	"#50660090be3b540002000010": u8,
	"#50b31ae1d028d90002000017": u8,
	"#518e03e896a16a000200001a": u8,
	"#50896eeef898aa000200001c": u8,
	// CSV to JSON
	"#5060fd2275b6330002000041": ck,
	// Calculate the table totals
	"#4fcab87518dede0001000007": ck,
	"#4fcad25018dede000100001b": ck,
	// Reverse and count
	"#4d1fa9f725ba287b2a0003d8": ut,
	"#4d1fcf17183b5e4cb5000036": ut,
	"#4d220130f74d0b11490000f2": ut,
	"#4d226a637f75b01e070000d0": ut,
	"#4d25d0c4ffe51219ad0000ac": ut,
	"#4d8473603a8be56a1c00001e": ut,
	"#4ed8bbb0e9c6eb0001000014": ut,
	"#4f0a875ee2b9a40001000016": ut,
	"#4d1ff454aabf52689d000003": ut,
	"#4d1e29f9a93ce03311000065": ut,
	"#4d429758e6dc010cb700001d": ut,
	"#4e298bc3f61744000100001c": ut,
	"#4d1e257ca93ce03311000030": ut,
	// SFD-ROC: Tic-Tac-Toe
	"#5055a770f86a4c000200002e": ck,
	"#505623b8f86a4c000200006f": ck,
	"#5068e7a55e993d0002000044": ck,
	"#5096922b6b166b0002000018": ck,
	// Complete the hex array data (Part II)
	"#4dd40d5dec9eb6000100001b": wr,
	"#4dd44cf6359cb70001000002": wr,
	"#4ddedba5c841f8000100000c": wr,
	"#4e76a51dfad785000100001b": wr,
	"#4fa6dce2fff2ad0001000047": wr,
	"#518db93996a16a000200000c": wr,
	// Readable Rubyhash
	"#50b6972a4bd2fd0002000099": ck,
	"#50bd36fc3645b3000200003b": ck,
	"#50b595ab4bd2fd0002000035": ck,
	"#50b63ed24bd2fd000200006e": ck,
	// Reverse a single line
	"#4d207d43f1a3f252f40000cd": ut,
	"#4d20ae89f1a3f252f400018b": ut,
	"#4d20f11bf1a3f252f400025c": ut,
	"#4d21055df1a3f252f400029f": ut,
	"#4d2106dbf1a3f252f40002a7": ut,
	"#4d210e19f1a3f252f40002d3": ut,
	"#4d21264af1a3f252f40002fe": ut,
	"#4d21a883f74d0b1149000037": ut,
	"#4d21dc75f74d0b1149000094": ut,
	"#4d21e4d8f74d0b11490000b1": ut,
	"#4d2207def74d0b114900010d": ut,
	"#4d221086f74d0b114900012c": ut,
	"#4d22493a7f75b01e07000061": ut,
	"#4d224c3c7f75b01e0700006d": ut,
	"#4d2256dd7f75b01e070000a0": ut,
	"#4d2265377f75b01e070000c8": ut,
	"#4d2389b5b835d24cc7000043": ut,
	"#4d2448060947c63e2600004a": ut,
	"#4d2469e00947c63e26000080": ut,
	"#4d254d8eb655f33625000002": ut,
	"#4d261b62ffe51219ad0000d3": ut,
	"#4d262283ffe51219ad0000d6": ut,
	"#4d26ebef98e8d7247100001b": ut,
	"#4d2896064bcd032f1c00009e": ut,
	"#4d29d2ce07e0177c7e00006c": ut,
	"#4d2aa5e57a5ec81cab000005": ut,
	"#4d2b52727a5ec81cab00005a": ut,
	"#4d2b75d47a5ec81cab00006f": ut,
	"#4d2b7e387a5ec81cab00007d": ut,
	"#4d2cfa8deda6262e4e0000c9": ut,
	"#4d2d8e5e509d6e103e000015": ut,
	"#4d326bb0388d8d4bdc000097": ut,
	"#4d378a3dab66837ca000018b": ut,
	"#4d37d6d0afc67a0f8c000002": ut,
	"#4d3b65eb8150257c5500005d": ut,
	"#4d3d666fac7c180bda000013": ut,
	"#4d3d9357ac7c180bda00002e": ut,
	"#4d3f7842c58eaa07c0000002": ut,
	"#4d5bdcbe6a0c4439d500001e": ut,
	"#4d6831b10164a2329200003f": ut,
	"#4d6e6e8f91a5c57e0200002d": ut,
	"#4d7a63ef13094f258a00000e": ut,
	"#4d7e1b25bfdce75cd0000020": ut,
	"#4d827e6301d5a311de000030": ut,
	"#4d964674459844762a00000e": ut,
	"#4d9e38e023390d07ae000036": ut,
	"#4dbe41d654ac053854000012": ut,
	"#4dd91d1d76f325000100000b": ut,
	"#4dda0b03267d070001000003": ut,
	"#4de4190358eed4000100000e": ut,
	"#4de5cb3017a57a0001000037": ut,
	"#4def99145ad0b00001000036": ut,
	"#4df3dc27b043fb0001000003": ut,
	"#4dfdfe8864c178000100005d": ut,
	"#4e4155597850320001000033": ut,
	"#4e59f68150e16c000100000d": ut,
	"#4e5eab1c1836e0000100002d": ut,
	"#4e7529948faac00001000019": ut,
	"#4ea2466dd7c2140001000001": ut,
	"#4eda1402306752000100000a": ut,
	"#4ef2584a78702b0001000073": ut,
	"#4ef7ad15b57ad3000100001a": ut,
	"#4f00fc3fd608040001000023": ut,
	"#4f018038d608040001000038": ut,
	"#4f085ccff037090001000080": ut,
	"#4f107465e5872c000100003d": ut,
	"#4f19491c2ab65d000100000b": ut,
	"#4d2080e2f1a3f252f40000d9": ut,
	"#4d20dfdcf1a3f252f4000234": ut,
	"#4d2155c7f1a3f252f4000348": ut,
	"#4d219d60f74d0b1149000029": ut,
	"#4d21d38ef74d0b1149000076": ut,
	"#4d276e9a98e8d72471000093": ut,
	"#4d440741567bac10b2000028": ut,
	// Replacing some words
	"#4f408edd6a707c000100000d": ch,
	"#50580709cf5d6c000200002d": wr,
	// Calculate table total
	"#4fe8352906838d000100003b": mo,
	// Hatsuyume
	"#4d1e3a3feb69a1182d000011": ut,
	"#4d1fba3b25ba287b2a0003fc": ut,
	"#4d204df8f1a3f252f4000041": ut,
	"#4d205007f1a3f252f400004b": ut,
	"#4d2128e9f1a3f252f4000304": ut,
	"#4d25c3f1ffe51219ad000097": ut,
	"#4d28ac724bcd032f1c0000d6": ut,
	"#4d47212ffa85f3174400000e": ut,
	"#4d6939d98c47ab0740000037": ut,
	"#4dfb645d4b61aa000100003e": ut,
	"#4e2401536be89e0001000021": ut,
	"#4e454004e297ba000100000e": ut,
	"#4ed785876fc8460001000027": ut,
	"#4ef7e571b57ad3000100002d": ut,
	"#4f254e223afa670001000012": ut,
	"#4d1e7bb125ba287b2a000083": ut,
	"#4d1fa8f425ba287b2a0003d5": ut,
	// Rotating Philosophers Problem
	"#4d34d838e747f561b30000c7": ck,
	// Indentation
	"#4d1bf073b2c3e064680000f4": rc,
	"#4d1e787025ba287b2a00006a": rc,
	"#4d1bed5db2c3e064680000e9": rc,
	"#4d1c0252b2c3e06468000159": rc,
	"#4d1c0577b2c3e0646800016b": ch,
	"#4d1d96dede2f897c2a0000f3": rc,
	"#4ed7970c6fc8460001000034": rc,
	"#4d1c085db2c3e06468000174": rc,
	// HTML to Haml
	"#4fcaaff8d3a0d400010000a6": ck,
	// replacing each line of a block selection
	"#4f439821f5a8d7000100002f": ck,
	"#4f4399d5f5a8d70001000032": ck,
	"#4f43ef14f5a8d70001000054": ck,
	"#4f4417f1f5a8d7000100005c": ck,
	"#4f4459e9f5a8d70001000068": ck,
	"#4f4466f4f5a8d70001000070": ck,
	"#4f47a592c7939c0001000029": ck,
	"#4f48f96a782c12000100000b": ck,
	"#4f4ab9cb187ed2000100003b": ck,
	"#4f4b993e62e5a2000100001a": ck,
	"#4f51667f1583e10001000008": ck,
	"#4f58fb8ed1debd000100002a": ck,
	"#4f5e244e00b4240001000029": ck,
	"#4f6641b47608ec0001000006": ck,
	"#4f6a656b8052980001000006": ck,
	"#4f772538583e95000100003e": ck,
	"#4f781bdeb28d710001000018": ck,
	"#4f886fda2e4d400001000014": ck,
	"#4f8bf8970e7f4d0001000009": ck,
	"#4f95f7c50fb9e30001000022": ck,
	"#4f9bc7986076500001000018": ck,
	"#4f9fe0ee2037000001000013": ck,
	"#4fa17af7b39b200001000024": ck,
	"#4fa6306c31eff0000100006e": ck,
	"#4fa84d377ada990001000053": ck,
	"#4fab2958e457630001000033": ck,
	"#4faf2d8b5de7f1000100002f": ck,
	"#4fb02eae04a4b90001000016": ck,
	"#4fb08f4a04a4b9000100003c": ck,
	"#4fb5e806962a650001000050": ck,
	"#4fbda6f911c93c0001000010": ck,
	"#4fbfc1743be58b000100004c": ck,
	"#4fcc4609024f950001000018": ck,
	"#4fd714c01cd69b0001000015": ck,
	"#4fea02335089660001000026": ck,
	"#4fee2b31796281000100000b": ck,
	"#4ffde9a587385f000100000f": ck,
	"#4fff329d6dd6530001000018": ck,
	"#500076e3cd0a650002000009": ck,
	"#503aa5220c44940002000022": ck,
	"#507426c3ce8e7e0002000036": ck,
	"#50c64a2a01748e0002000021": ck,
	"#5144eb69fba6c2000200004d": ck,
	"#5161fe7b4d8cb0000200004a": ck,
	"#518070dc0b88800002000005": ck,
	// Numbering a List
	"#4ef7f7fab57ad30001000030": ut,
	"#4f01e4c550582b0001000008": ut,
	"#4f0663ebdf4b9f0001000018": ut,
	"#4f1cc0816e5fec0001000028": ut,
	"#4f43fcf7f5a8d70001000057": ut,
	"#4f487353c7939c0001000050": ut,
	"#4f1026f6e5872c0001000027": ut,
	"#4dba57650fd52d21a200000b": ut,
	"#4ddf6378c841f80001000023": ut,
	"#4e5eb61c1836e0000100003a": ut,
	"#4e6cb2407328fa0001000002": ut,
	"#4ed47f68a745c100010000c1": ut,
	"#4ed591b350d4140001000054": ut,
	"#4ef2560078702b000100006c": ut,
	"#4f0987a4dc91310001000038": ut,
	"#4f36df8cb447f10001000072": ut,
	"#511dafcd094242000200001d": hf,
	"#51805ba09bdfff000200002a": hf,
	"#51973f6d162aa80002000020": hf,
	"#4d9e2b7023390d07ae000031": ut,
	"#4da03e0e7b96337af8000005": ut,
	"#4da4d238ceedba4f33000018": ut,
	"#4da82864e7f2a8763c00002a": ut,
	"#4e210d4ee16e8a0001000012": ut,
	"#4e2306cdfab5fe0001000054": ut,
	"#4e3afbe57a8d3c000100002a": ut,
	"#4e5409ff6d89040001000014": ut,
	"#4e62458d4df04e000100000d": ut,
	"#4e8811064bd0aa0001000027": ut,
	"#4ece3c83b6633c000100002f": ut,
	// PHP Array Syntax -> MailChimp Merge Syntax
	"#4e9f6d29226ed10001000001": ck,
	"#4ed2ecf662e6ad000100002d": ck,
	"#4eda99953067520001000031": ck,
	"#4ee8e69cc1e9f10001000014": ck,
	"#4eedda9b2e4c590001000024": ck,
	"#4eee61eb4fc9e1000100000e": ck,
	"#4ef167416559020001000050": ck,
	"#4ef5f8c0347d08000100001e": ck,
	"#4f2b155ddcbc680001000035": ck,
	"#4f35adffb447f10001000008": ck,
	"#4f4f24884566130001000009": ck,
	"#4fa5828431eff0000100003f": ck,
	"#4fa876bf7ada990001000062": ck,
	"#4fc2c89520553e000100000b": ck,
	"#5031327e562ffc0002000028": ck,
	"#50580c6dcf5d6c000200003c": ck,
	"#4eaba8978b14c00001000008": ck,
	"#4ee36abc31e3560001000003": ck,
	"#4ee74bcc14465900010000b8": ck,
	"#4efaea1425e46f0001000001": ck,
	"#4f01e06150582b0001000003": ck,
	// Reverse characters in a line
	"#4d1ab91df2dbe662a1000005": ut,
	"#4d1ababef2dbe662a100000f": ut,
	"#4d1acda6142cca7133000023": ut,
	"#4d1aeae9c58eaa2a8a000082": ut,
	"#4d1b142bc58eaa2a8a0002a0": ut,
	"#4d1b1adbc58eaa2a8a0002ec": ut,
	"#4d1b3440c58eaa2a8a00046c": ut,
	"#4d1b4749c58eaa2a8a000592": ut,
	"#4d1b6347c58eaa2a8a000747": ut,
	"#4d1b67d0c58eaa2a8a0007b1": ut,
	"#4d1b71bcc58eaa2a8a000834": ut,
	"#4d1b7e5bb698bd7a0d000047": ut,
	"#4d1b96f6c8bb5704eb00007f": ch,
	"#4d1bba47c8bb5704eb000206": ut,
	"#4d1bd4bab2c3e06468000030": ut,
	"#4d1bdb4db2c3e0646800006d": ut,
	"#4d1bfbc8b2c3e06468000130": ut,
	"#4d1c814935b40650b800021b": ut,
	"#4d1c95d635b40650b80002d8": ut,
	"#4d1cba5d35b40650b80003e9": ut,
	"#4d1ceb1c35b40650b80005df": ut,
	"#4d1d0c4f35b40650b8000702": ut,
	"#4d1d38c935b40650b800081d": ut,
	"#4d1d7403de2f897c2a00007f": ut,
	"#4d1e006ade2f897c2a0003fb": ut,
	"#4d1e4d51509d6e19d800000c": ut,
	"#4d1f00de25ba287b2a000259": ut,
	"#4d1fa4f025ba287b2a0003c8": ut,
	"#4d1fcad9183b5e4cb500002a": ut,
	"#4d2042e1f1a3f252f4000029": ut,
	"#4d205203f1a3f252f4000053": ut,
	"#4d20743ef1a3f252f40000b0": ut,
	"#4d20b9b5f1a3f252f40001b2": ut,
	"#4d2205fcf74d0b1149000106": ut,
	"#4d2320ff7f75b01e07000172": ut,
	"#4d25b4a1ffe51219ad000084": ut,
	"#4d27f56f4bcd032f1c000002": ut,
	"#4d289da44bcd032f1c0000b1": ut,
	"#4d28e9e04bcd032f1c000134": ut,
	"#4d297da407e0177c7e000016": ut,
	"#4d2f703563b08b08b0000059": ut,
	"#4d31df9e388d8d4bdc00003b": ut,
	"#4d3412d1e747f561b3000019": ut,
	"#4d359b2f4caddf7e63000028": ut,
	"#4d398b45f655cd337d00004a": ut,
	"#4d3f2e12f2dbe65468000050": ut,
	"#4d464314fa85f314bd000039": ut,
	"#4d4ee0fa05547915fe00001f": ut,
	"#4d68f71d8c47ab0740000028": ut,
	"#4d9459930e25641514000017": ut,
	"#4db2cb562a007d1ee700001e": ut,
	"#4dbe479754ac053854000015": ut,
	"#4dc0e846810d4c0f4600000c": ut,
	"#4df52154b043fb000100002a": ut,
	"#4e0414f3bcb072000100001b": ut,
	"#4e20848fd0b95e000100007c": ut,
	"#4e22b604fab5fe000100001b": ut,
	"#4e362e26cec4f40001000006": ut,
	"#4e40b7397850320001000019": ut,
	"#4e424d922dcfce000100000a": ut,
	"#4e475eacdd8b980001000006": ut,
	"#4e50e68f1635a30001000024": ut,
	"#4e5633c6bb4b960001000011": ut,
	"#4eb1d8c140dd6f0001000022": ut,
	"#4ebfcd9a9818b5000100000b": ut,
	"#4ed4eddd50d414000100002d": ut,
	"#4ef2d16678702b00010000c7": ut,
	"#4f086048f037090001000083": ut,
	"#4f27ec0b56b6e50001000034": ut,
	"#4f301773ac6921000100004f": ut,
	"#4f31f710a02ed0000100004f": ut,
	"#4d1ab880809bec3ae7000005": ut,
	"#4d1ac7670a045132c000003b": ut,
	"#4d1b3696c58eaa2a8a00049b": ut,
	"#4d1b4c8ec58eaa2a8a0005d6": ut,
	"#4d1b6977c58eaa2a8a0007c8": ut,
	"#4d1c5dbb35b40650b800010b": ut,
	"#4d1c9b4735b40650b80002f6": ut,
	"#4d1cb18d35b40650b80003ab": ut,
	"#4d1e506d509d6e19d800001b": ut,
	"#4d1e79ea25ba287b2a000073": ut,
	"#4d217aaaf1a3f252f400037d": ut,
	"#4ea65b06bc559e0001000005": ut,
	"#4eeec14f4fc9e1000100003f": ut,
	"#4d1aba68f2dbe662a100000d": ut,
	"#4d1ac94a449c6d1b90000003": ut,
	"#4d1ad4761d50a22693000013": ut,
	"#4d1b5b03c58eaa2a8a0006a3": ut,
	"#4d1ac36e0a045132c0000020": ut,
	"#4d1ae154c58eaa2a8a000019": ut,
	"#4d1b1bdfc58eaa2a8a0002fe": ut,
	"#4d1b2d9ac58eaa2a8a0003f7": ut,
	"#4d1b36b5c58eaa2a8a00049d": ut,
	"#4d1b3bc6c58eaa2a8a0004f3": ut,
	// Make Fancy Header
	"#4ed85d0c6fc8460001000088": wr,
	"#50594ae093b0e2000200002f": wr,
	// Context insensitive completion 0
	"#4dde367bed73800001000020": ut,
	"#4df96e493375bb000100001a": ut,
	"#4f2f59b7ac69210001000031": ut,
	"#50592c7f93b0e20002000008": ut,
	// Increment, increment, increment....
	"#4d2060e8f1a3f252f4000084": ut,
	"#4d20b5e4f1a3f252f40001a1": ut,
	"#4d213c2af1a3f252f4000324": ut,
	"#4d21a2adf74d0b114900002c": ut,
	"#4d2c5bbbeda6262e4e00003c": ut,
	"#4d390aa5afc67a0f8c00007f": ut,
	"#4d3e83bbf2dbe6546800000f": ut,
	"#4d678b8f0164a23292000027": ut,
	"#4d876177698e1d2d6100001d": ut,
	"#4d8aac8fd300293fd5000020": ut,
	"#4d9edc5f28f8351cde000017": ut,
	"#4da59593ceedba4f33000045": ut,
	"#4dc37345962f37558600000f": ut,
	"#4e281c632dc582000100000f": ut,
	"#4e28ca69f617440001000006": ut,
	"#4e3be31c7003b50001000029": ut,
	"#4e5630e3bb4b960001000010": ut,
	"#4ed850b36fc846000100007c": ut,
	"#4efdcb1b03ed660001000010": ut,
	"#4f2b5ce9dcbc680001000057": ut,
	"#4f2de76171d6870001000049": ut,
	"#4f3a55e65c3be00001000015": ut,
	"#4f4513a5d6e350000100003c": ut,
	// The meaning
	"#50227ef4dc98230002000029": ch,
	// switch variable
	"#4f07239ef03709000100000b": ck,
	// Add fold markers to a .c file
	"#4d1a6f1bb8cb3409320000cf": rc,
	// Braces or Brackets?
	"#4d25602bffe51219ad00001c": ut,
	"#4d25aa70ffe51219ad000071": ut,
	"#4d268e7effe51219ad000145": ut,
	"#4d471c29fa85f3174400000a": ut,
	"#4d70b9ce9192026114000013": ut,
	"#4dd963e576f3250001000022": ut,
	"#4def96915ad0b00001000031": ut,
	"#4e53a84947655b0001000027": ut,
	"#4e9bf645797d04000100000d": ut,
	"#4ed1c811a1c0860001000022": ut,
	"#4ee90667c1e9f1000100002f": ut,
	"#4effa394ebfc7e000100002a": ut,
	"#4f10ff574e4ae6000100000e": ut,
	// Whitespace, empty lines and tabs
	"#4d1b0962c58eaa2a8a000224": rc,
	"#4d1b9b99c8bb5704eb0000c6": rc,
	"#4d1ba355c8bb5704eb000135": rc,
	"#4d1ead0a25ba287b2a000172": rc,
	"#5023da0708cba1000200000f": ck,
	"#50589dfbcf5d6c0002000078": ck,
	"#507caffdb04163000200003c": ck,
	"#5123e1a9b2bc34000200002c": ck,
	"#51514de639cd950002000010": ck,
	"#4d1a5ed9ae752b2b38000037": rc,
	"#4d1b7becb698bd7a0d000022": rc,
	// Reformat/Refactor a Golfer Class
	"#4e56b79ebb4b96000100003c": rc,
	"#5150e65c7d1356000200000d": rc,
	"#4d1a4754a860b74472000004": rc,
	"#4eeb3f8590e55f0001000047": ck,
	"#4ef7645eb57ad30001000009": ck,
	"#4f2ddc8571d687000100002f": ck,
	"#4f2ed7ad71d6870001000083": ck,
	"#4f31a9dea02ed00001000002": ck,
	"#4f41b3166a707c0001000041": ck,
	"#4f453870d6e3500001000043": ck,
	"#4f5f3fbd1b751c0001000013": ck,
	"#4f62916d3bd339000100000d": ck,
	"#4f7f6c2c372c370001000016": ck,
	"#4fa54bcc31eff00001000023": ck,
	"#4fac22e6596d9d000100002b": ck,
	"#4fb5acb5962a650001000024": ck,
	"#4fc10de03531340001000053": ck,
	"#4fd5ddbff8a8d1000100001d": ck,
	"#4fdd1560a571750001000012": ck,
	"#4ff9b0e33c22c9000100003e": ck,
	"#4fffa0c06dd653000100006e": ck,
	"#4fffc5516dd65300010000c5": ck,
	"#501c22ab900d5a000200001f": ck,
	"#50280aadb7d8740002000028": ck,
	"#50289548b7d8740002000098": ck,
	"#5028cff6646dc20002000002": ck,
	"#50290665646dc2000200000f": ck,
	"#50354630838d9e0002000041": ck,
	"#50354c87838d9e0002000047": ck,
	"#503615e0838d9e000200008e": ck,
	"#503727a4c42d120002000087": ck,
	"#50411d0e9f2d100002000024": ck,
	"#5048b7cd4edf480002000027": ck,
	"#5053ab2d2a8bfe0002000078": ck,
	"#50580eb8cf5d6c0002000041": ck,
	"#5058f7a4cf5d6c00020000c9": ck,
	"#5058f7afcf5d6c00020000ca": ck,
	"#5068c4be5e993d0002000034": ck,
	"#506fc6e6cd2631000200000d": ck,
	"#5073510ccb4206000200003b": ck,
	"#50774dd0a7c4e60002000028": ck,
	"#50863ca412a2c6000200000b": ck,
	"#509589d265f0210002000046": ck,
	"#509a8ded1be4090002000033": ck,
	"#50a7359954febf0002000012": ck,
	"#50ab40b0aeb26e0002000026": ck,
	"#50b558084bd2fd0002000010": ck,
	"#50e36fdcd5e627000200003a": ck,
	"#50e8f9998b90ea0002000033": ck,
	"#50ea16b92bf6290002000029": ck,
	"#50f5a5e8c4c2020002000019": ck,
	"#5126189f80fae1000200000a": ck,
	"#51319c765d84a4000200002b": ck,
	"#5141979685be34000200000c": ck,
	"#4d1a575da860b7447200017b": rc,
	"#4d483a4bfa85f31744000052": ck
};

var uid = $("ul#nav li b").text();

var id_to_seconds = function(id) {
	return parseInt(id.match(/[0-9a-f]{8}/), 16);
};

var now = (new Date()).getTime() / 1000;
var per_time = function(id, entries) {
	var age = now - id_to_seconds(id);
	if (age < 1) {age = 1;}
	return (entries + 1) / age;
};

var fdff = {
	//"<fd-35>": "", // removes explanation why stroke count is wrong :(
	//"<fd-55>": "<C-Left>",
	//"<fd-56>": "<C-End>",
	//"<fd-57>": "<C-Home>",
	//"<fd-58>": "<C-End>",
	"<ff-58>": "<C-@>"
};

if (window.location.pathname.match(/^\/challenges\/[0-9a-f]{24}$/)) {
	$("div.clearfix:not([id])").each(function() {
		var id = $(this).find('a').attr('href');
		if (id in cheats) {
			if ($(this).attr("class").match('notice')) { // leaderboard on right
				$(this).append(cheats[id].fontcolor('red'));
			} else { // actual entry
				$(this).find("pre").after(cheats[id].fontcolor("red"));
			}
		}
	});
	$("span[style='color:#990000;font-weight:bold']").each(function() {
		var txt = $(this).text();
		if (txt in fdff) {
			$(this).text(fdff[txt]);
		}
	});
}

if (window.location.pathname == "/") {
	var challenges = [];
	$("div.grid_7:not([id])").each(function(i, container) {
		$(container).find("div").each(function(j, this_div) {
			var obj = {};
			obj.ch_id = $(this_div).find("a").attr("href").slice(12);
			obj.tier = 0;
			if (ch_ratings[obj.ch_id]) {
				obj.tier = ch_ratings[obj.ch_id];
			}
			obj.html = $(this_div).html();
			obj.entries = $(this_div).find("h5").text().match(/\d+/g).pop();
			obj.per_time = per_time(obj.ch_id, obj.entries);
			challenges.push(obj);
			$(this_div).hide();
		});
		challenges.sort(function(a, b) {
			if (a.tier == b.tier) {
				return b.per_time - a.per_time;
			}
			return a.tier - b.tier;
		});
		for (n=0; n<challenges.length; n++) {
			$(container).append(challenges[n].html);
		}
	});
}

if (uid && window.location.pathname == "/"+uid) {
	var done = {};
	$("h5.challenge").each(function() {
		done[$(this).find("a").attr("href").slice(12)] = true;
	});
	var total_done = $("h2:first b").text();
	var challenges = [];
	$.get('/', function(data) {
		$(data).find("div.grid_7:not([id])").each(function(i, container) {
			$(container).find("div").each(function(j, this_div) {
				var obj = {};
				obj.ch_id = $(this_div).find("a").attr("href").slice(12);
				obj.tier = 0;
				if (ch_ratings[obj.ch_id]) {
					obj.tier = ch_ratings[obj.ch_id];
				}
				obj.html = $(this_div).html();
				obj.entries = $(this_div).find("h5").text().match(/\d+/g).pop();
				obj.per_time = per_time(obj.ch_id, obj.entries);
				challenges.push(obj);
			});
			challenges.sort(function(a, b) {
				if (a.tier == b.tier) {
					return b.per_time - a.per_time;
				}
				return a.tier - b.tier;
			});
		});
		var i = (challenges.length - total_done > 5) ? 5 : challenges.length - total_done;
		while (i > 0) {
			var chall = challenges.shift();
			if (!done[chall.ch_id]) {
				i--;
				$("#content h3:first").before(chall.html);
			}
		}
		$("#content .grid_7").prepend("<h3><b>Recommended Challenges</b></h3>");
	});
}

// vim: set ts=2 sw=2 noet:
