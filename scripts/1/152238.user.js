// ==UserScript==
// @name           Doodle Or Die More Colors!
// @namespace      http://userscripts.org/users/33432
// @description    Even more colors for Doodle or Die!
// @include        http://www.doodleordie.com/*
// @include        http://doodleordie.com/*
// @version        1.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var dynamicPalette,historyPalette,historyPaletteHint;
var historyColors=JSON.parse(GM_getValue("history","[]"));

var colors=[
	[ "Black", "#000000" ], /* #000000 */
	[ "Black #2", "#111111" ], /* #000000 */
	[ "Jet", "#222222" ], /* #333333 */
	[ "Jet #2", "#333333" ], /* #333333 */
	[ "Davy's grey", "#444444" ], /* #545454 */
	[ "Davy's grey #2", "#555555" ], /* #545454 */
	[ "Dim gray", "#666666" ], /* #686868 */
	[ "Sonic silver", "#777777" ], /* #757575 */
	[ "Gray", "#888888" ], /* #7f7f7f */
	[ "Dark gray", "#999999" ], /* #a8a8a8 */
	[ "Dark gray #2", "#aaaaaa" ], /* #a8a8a8 */
	[ "Gray (X11 gray)", "#bbbbbb" ], /* #bfbfbf */
	[ "Light gray", "#cccccc" ], /* #d3d3d3 */
	[ "Gainsboro", "#dddddd" ], /* #dbdbdb */
	[ "White smoke", "#eeeeee" ], /* #f4f4f4 */
	[ "White", "#ffffff" ], /* #ffffff */
	
	[ "Maroon (HTML/CSS)", "#660000" ], /* #7f0000 */
	[ "Chocolate (traditional)", "#662600" ], /* #7a3f00 */
	[ "Heart Gold", "#664c00" ], /* #7f5b00 */
	[ "Bronze Yellow", "#596600" ], /* #757100 */
	[ "Napier green", "#336600" ], /* #2a7f00 */
	[ "Pakistan green", "#0c6600" ], /* #006600 */
	[ "Skobeloff", "#006619" ], /* #007527 */
	[ "Cadmium green", "#00663f" ], /* #006b3c */
	[ "Teal", "#006566" ], /* #007f7f */
	[ "Dark imperial blue", "#003f66" ], /* #00426b */
	[ "Royal blue (traditional)", "#001966" ], /* #002366 */
	[ "Navy blue", "#0c0066" ], /* #00007f */
	[ "Tyrian purple", "#320066" ], /* #3e0263 */
	[ "Patriarch", "#590066" ], /* #7f007f */
	[ "Patriarch #2", "#66004c" ], /* #7f007f */
	[ "Rosewood", "#660026" ], /* #66002d */
	[ "OU Crimson Red", "#990000" ], /* #990000 */
	[ "Windsor tan", "#993900" ], /* #a64301 */
	[ "Heart Gold #2", "#997200" ], /* #7f5b00 */
	[ "Olive", "#859900" ], /* #7f7f00 */
	[ "Napier green #2", "#4c9900" ], /* #2a7f00 */
	[ "Shamrock green", "#139900" ], /* #009e00 */
	[ "Persian green", "#009926" ], /* #00a82a */
	[ "Green (NCS)", "#00995f" ], /* #009e69 */
	[ "Dark cyan", "#009899" ], /* #008989 */
	[ "Smalt (Dark powder blue)", "#005f99" ], /* #006599 */
	[ "Imperial blue", "#002699" ], /* #002293 */
	[ "Medium Persian blue", "#130099" ], /* #1500a3 */
	[ "Indigo (web)", "#4c0099" ], /* #4d0084 */
	[ "Dark magenta", "#850099" ], /* #890089 */
	[ "Mardi Gras", "#990072" ], /* #890087 */
	[ "Burgundy", "#990039" ], /* #7f001f */
	[ "Boston University Red", "#cc0000" ], /* #cc0000 */
	[ "Burnt orange", "#cc4c00" ], /* #cc5500 */
	[ "Harvest Gold", "#cc9900" ], /* #db9200 */
	[ "Apple green", "#b2cc00" ], /* #8cb700 */
	[ "Sheen Green", "#66cc00" ], /* #8ed600 */
	[ "Shamrock green #2", "#19cc00" ], /* #009e00 */
	[ "Dark pastel green", "#00cc33" ], /* #02be3b */
	[ "Caribbean green", "#00cc7f" ], /* #00cc66 */
	[ "Robin egg blue", "#00cbcc" ], /* #00cbcc */
	[ "True Blue", "#007fcc" ], /* #0073d1 */
	[ "International Klein Blue", "#0032cc" ], /* #002fa8 */
	[ "Medium blue", "#1900cc" ], /* #0000cc */
	[ "Violet (RYB)", "#6500cc" ], /* #5900b1 */
	[ "Purple (Munsell)", "#b200cc" ], /* #9f00c6 */
	[ "Deep magenta", "#cc0098" ], /* #cc00cb */
	[ "Rubine red", "#cc004c" ], /* #d10057 */
	[ "Red", "#ff0000" ], /* #ff0000 */
	[ "Safety orange (blaze orange)", "#ff5f00" ], /* #ff6600 */
	[ "Amber", "#ffbf00" ], /* #ffbf00 */
	[ "Chartreuse (traditional)", "#dfff00" ], /* #ddff00 */
	[ "Chartreuse (web)", "#7fff00" ], /* #7fff00 */
	[ "Neon green", "#1fff00" ], /* #37ff14 */
	[ "Electric green", "#00ff3f" ], /* #00ff00 */
	[ "Aqua", "#00ff9f" ], /* #00ffaa */
	[ "Cyan", "#00feff" ], /* #00feff */
	[ "Capri", "#009fff" ], /* #00bfff */
	[ "Blue (RYB)", "#003fff" ], /* #0144fd */
	[ "Blue", "#1f00ff" ], /* #0000ff */
	[ "Violet (color wheel)", "#7f00ff" ], /* #7f00ff */
	[ "Phlox", "#df00ff" ], /* #dc00ff */
	[ "Shocking pink", "#ff00bf" ], /* #fc0cc0 */
	[ "Folly", "#ff005f" ], /* #ff0050 */
	[ "Pastel red", "#ff6565" ], /* #ff6860 */
	[ "Atomic tangerine", "#ff9f65" ], /* #ff9865 */
	[ "Mustard", "#ffd865" ], /* #feda56 */
	[ "Laser Lemon", "#ebff65" ], /* #feff65 */
	[ "French lime", "#b2ff65" ], /* #9efd3a */
	[ "Screamin' Green", "#79ff65" ], /* #70ff74 */
	[ "Screamin' Green #2", "#65ff8c" ], /* #70ff74 */
	[ "Aquamarine", "#65ffc5" ], /* #7fffd4 */
	[ "Electric blue", "#65feff" ], /* #7ff8ff */
	[ "French sky blue", "#65c5ff" ], /* #75b3fe */
	[ "French sky blue #2", "#658cff" ], /* #75b3fe */
	[ "Han purple", "#7965ff" ], /* #5119fa */
	[ "Heliotrope", "#b265ff" ], /* #de75ff */
	[ "Shocking pink (Crayola)", "#eb65ff" ], /* #ff70fe */
	[ "Fuchsia pink", "#ff65d8" ], /* #ff75e1 */
	[ "Rose pink", "#ff659f" ], /* #ff65b2 */
	[ "Light salmon pink", "#ff9999" ], /* #ff9999 */
	[ "Deep peach", "#ffbf99" ], /* #fecaa3 */
	[ "Peach (Crayola)", "#ffe599" ], /* #fee0a3 */
	[ "Pastel yellow", "#f2ff99" ], /* #fcfc96 */
	[ "Nyanza", "#ccff99" ], /* #e8ffdb */
	[ "Pale green", "#a5ff99" ], /* #97fb97 */
	[ "Mint green", "#99ffb2" ], /* #99ffbb */
	[ "Aquamarine #2", "#99ffd8" ], /* #7fffd4 */
	[ "Celeste (colour)", "#99feff" ], /* #b2ffff */
	[ "Columbia blue", "#99d8ff" ], /* #99dcff */
	[ "French sky blue #3", "#99b2ff" ], /* #75b3fe */
	[ "Lavender blue", "#a599ff" ], /* #ccccfe */
	[ "Mauve", "#cb99ff" ], /* #e0b2ff */
	[ "Rich brilliant lavender", "#f299ff" ], /* #f1a9fe */
	[ "Fuchsia pink #2", "#ff99e5" ], /* #ff75e1 */
	[ "Carnation pink", "#ff99bf" ], /* #ffa8ca */
	[ "Light salmon pink #2", "#ffb2b2" ], /* #ff9999 */
	[ "Deep peach #2", "#ffcfb2" ], /* #fecaa3 */
	[ "Peach puff", "#ffebb2" ], /* #fee7b7 */
	[ "Pastel yellow #2", "#f5ffb2" ], /* #fcfc96 */
	[ "Nyanza #2", "#d8ffb2" ], /* #e8ffdb */
	[ "Pale green #2", "#bcffb2" ], /* #97fb97 */
	[ "Mint green #2", "#b2ffc5" ], /* #99ffbb */
	[ "Aero blue", "#b2ffe2" ], /* #c6ffe3 */
	[ "Celeste (colour) #2", "#b2ffff" ], /* #b2ffff */
	[ "Fresh Air", "#b2e2ff" ], /* #a8e7ff */
	[ "Lavender blue #2", "#b2c5ff" ], /* #ccccfe */
	[ "Lavender blue #3", "#bcb2ff" ], /* #ccccfe */
	[ "Mauve #2", "#d8b2ff" ], /* #e0b2ff */
	[ "Brilliant lavender", "#f5b2ff" ], /* #f3bcff */
	[ "Shampoo", "#ffb2eb" ], /* #ffd1f1 */
	[ "Carnation pink #2", "#ffb2cf" ], /* #ffa8ca */
	[ "Pink lace", "#fecccc" ], /* #ffdddb */
	[ "Unbleached silk", "#fedfcc" ], /* #fedecc */
	[ "Cornsilk", "#fef2cc" ], /* #fff7db */
	[ "Light yellow", "#f8fecc" ], /* #ffffe0 */
	[ "Nyanza #3", "#e5fecc" ], /* #e8ffdb */
	[ "Nyanza #4", "#d2fecc" ], /* #e8ffdb */
	[ "Aero blue #2", "#ccfed8" ], /* #c6ffe3 */
	[ "Aero blue #3", "#ccfeeb" ], /* #c6ffe3 */
	[ "Light cyan", "#ccfefe" ], /* #e0ffff */
	[ "Alice blue", "#ccebfe" ], /* #eff7ff */
	[ "Lavender blue #4", "#ccd8fe" ], /* #ccccfe */
	[ "Lavender blue #5", "#d2ccfe" ], /* #ccccfe */
	[ "Mauve #3", "#e5ccfe" ], /* #e0b2ff */
	[ "Brilliant lavender #2", "#f8ccfe" ], /* #f3bcff */
	[ "Shampoo #2", "#feccf2" ], /* #ffd1f1 */
	[ "Cotton candy", "#feccdf" ], /* #ffbcd9 */
	[ "Pastel pink", "#f2d8d8" ], /* #dea5a5 */
	[ "Almond", "#f2e2d8" ], /* #efddcc */
	[ "Eggshell", "#f2ebd8" ], /* #efe9d6 */
	[ "Beige", "#eff2d8" ], /* #f4f4db */
	[ "Pale spring bud", "#e5f2d8" ], /* #dbebbb */
	[ "Moss green", "#dbf2d8" ], /* #aedfae */
	[ "Moss green #2", "#d8f2df" ], /* #aedfae */
	[ "Celadon", "#d8f2e8" ], /* #ace1db */
	[ "Celadon #2", "#d8f2f2" ], /* #ace1db */
	[ "Beau blue", "#d8e8f2" ], /* #bbd3e6 */
	[ "Powder blue (web)", "#d8dff2" ], /* #b1c3e6 */
	[ "Lavender (web)", "#dbd8f2" ], /* #e7e5f9 */
	[ "Wisteria", "#e5d8f2" ], /* #caa1dc */
	[ "Pale plum", "#efd8f2" ], /* #dda1dd */
	[ "Light orchid", "#f2d8eb" ], /* #e5a8d6 */
	[ "Queen pink", "#f2d8e2" ], /* #e8cdd8 */
	[ "Pastel pink #2", "#ebc5c5" ], /* #dea5a5 */
	[ "Almond #2", "#ebd3c5" ], /* #efddcc */
	[ "Pearl", "#ebe2c5" ], /* #e9dfc7 */
	[ "Pale spring bud #2", "#e7ebc5" ], /* #dbebbb */
	[ "Pale spring bud #3", "#d8ebc5" ], /* #dbebbb */
	[ "Moss green #3", "#caebc5" ], /* #aedfae */
	[ "Moss green #4", "#c5ebcf" ], /* #aedfae */
	[ "Celadon #3", "#c5ebdd" ], /* #ace1db */
	[ "Celadon #4", "#c5ebeb" ], /* #ace1db */
	[ "Beau blue #2", "#c5ddeb" ], /* #bbd3e6 */
	[ "Powder blue (web) #2", "#c5cfeb" ], /* #b1c3e6 */
	[ "Light pastel purple", "#cac5eb" ], /* #b09bd9 */
	[ "Wisteria #2", "#d8c5eb" ], /* #caa1dc */
	[ "Pale plum #2", "#e7c5eb" ], /* #dda1dd */
	[ "Light orchid #2", "#ebc5e2" ], /* #e5a8d6 */
	[ "Pink pearl", "#ebc5d3" ], /* #e6abcf */
	[ "Pastel pink #3", "#e5b2b2" ], /* #dea5a5 */
	[ "Almond #3", "#e5c5b2" ], /* #efddcc */
	[ "Pearl #2", "#e5d8b2" ], /* #e9dfc7 */
	[ "Pale spring bud #4", "#dfe5b2" ], /* #dbebbb */
	[ "Pale spring bud #5", "#cce5b2" ], /* #dbebbb */
	[ "Granny Smith Apple", "#b8e5b2" ], /* #a7e49f */
	[ "Moss green #5", "#b2e5bf" ], /* #aedfae */
	[ "Pale robin egg blue", "#b2e5d2" ], /* #96ddd0 */
	[ "Celadon #5", "#b2e5e5" ], /* #ace1db */
	[ "Beau blue #3", "#b2d2e5" ], /* #bbd3e6 */
	[ "Powder blue (web) #3", "#b2bfe5" ], /* #b1c3e6 */
	[ "Light pastel purple #2", "#b8b2e5" ], /* #b09bd9 */
	[ "Wisteria #3", "#cbb2e5" ], /* #caa1dc */
	[ "Pale plum #3", "#dfb2e5" ], /* #dda1dd */
	[ "Light orchid #3", "#e5b2d8" ], /* #e5a8d6 */
	[ "Pink pearl #2", "#e5b2c5" ], /* #e6abcf */
	[ "New York pink", "#d88c8c" ], /* #d6837f */
	[ "Tumbleweed", "#d8a88c" ], /* #dea986 */
	[ "Tan", "#d8c58c" ], /* #d2b48d */
	[ "Medium spring bud", "#cfd88c" ], /* #c0dc88 */
	[ "Medium spring bud #2", "#b2d88c" ], /* #c0dc88 */
	[ "Granny Smith Apple #2", "#95d88c" ], /* #a7e49f */
	[ "Turquoise green", "#8cd89f" ], /* #9ed5b2 */
	[ "Pearl Aqua", "#8cd8bc" ], /* #87d8c0 */
	[ "Pale robin egg blue #2", "#8cd8d8" ], /* #96ddd0 */
	[ "Dark sky blue", "#8cbcd8" ], /* #8abdd5 */
	[ "Carolina blue", "#8c9fd8" ], /* #97b9dc */
	[ "Soap", "#958cd8" ], /* #8478ce */
	[ "Light pastel purple #3", "#b28cd8" ], /* #b09bd9 */
	[ "Pale plum #4", "#cf8cd8" ], /* #dda1dd */
	[ "Super pink", "#d88cc5" ], /* #cf6ca9 */
	[ "Shimmering Blush", "#d88ca8" ], /* #d98695 */
	[ "Deep chestnut", "#bf3f3f" ], /* #b84b46 */
	[ "Copper red", "#bf6f3f" ], /* #cb6e52 */
	[ "Brass", "#bf9f3f" ], /* #b3a440 */
	[ "Android Green", "#afbf3f" ], /* #a4c539 */
	[ "Green (RYB)", "#7fbf3f" ], /* #65af31 */
	[ "Mantis", "#4fbf3f" ], /* #74c364 */
	[ "Emerald", "#3fbf5f" ], /* #50c778 */
	[ "Mint", "#3fbf8f" ], /* #3eb68a */
	[ "Verdigris", "#3fbfbf" ], /* #42b2ad */
	[ "Tufts Blue", "#3f8fbf" ], /* #4286c1 */
	[ "Violet-blue", "#3f5fbf" ], /* #324ab3 */
	[ "Slate blue", "#4f3fbf" ], /* #695acd */
	[ "Mulberry", "#7f3fbf" ], /* #a54ac4 */
	[ "Mulberry #2", "#af3fbf" ], /* #a54ac4 */
	[ "Fandango", "#bf3f9f" ], /* #b6338b */
	[ "Fuchsia rose", "#bf3f6f" ], /* #c64275 */
	[ "Chestnut", "#993232" ], /* #914435 */
	[ "Chestnut #2", "#995932" ], /* #914435 */
	[ "Metallic Sunburst", "#997f32" ], /* #9d7d38 */
	[ "Android Green #2", "#8c9932" ], /* #a4c539 */
	[ "Sap green", "#669932" ], /* #4f7e2a */
	[ "Celadon Green", "#3f9932" ], /* #2e8432 */
	[ "Celadon Green #2", "#32994c" ], /* #2e8432 */
	[ "Illuminating Emerald", "#329972" ], /* #309177 */
	[ "Verdigris #2", "#329999" ], /* #42b2ad */
	[ "B'dazzled Blue", "#327299" ], /* #2d5894 */
	[ "B'dazzled Blue #2", "#324c99" ], /* #2d5894 */
	[ "Blue (pigment)", "#3f3299" ], /* #323299 */
	[ "Purple Heart", "#653299" ], /* #68359b */
	[ "Purple Heart #2", "#8c3299" ], /* #68359b */
	[ "Fandango #2", "#99327f" ], /* #b6338b */
	[ "Boysenberry", "#993259" ], /* #86315e */
	[ "Tuscan red", "#722626" ], /* #7c3030 */
	[ "Brown-nose", "#724226" ], /* #664223 */
	[ "Antique bronze", "#725f26" ], /* #665e1d */
	[ "Army green", "#697226" ], /* #4c5420 */
	[ "Sap green #2", "#4c7226" ], /* #4f7e2a */
	[ "Celadon Green #3", "#2f7226" ], /* #2e8432 */
	[ "Celadon Green #4", "#267239" ], /* #2e8432 */
	[ "Illuminating Emerald #2", "#267256" ], /* #309177 */
	[ "Illuminating Emerald #3", "#267272" ], /* #309177 */
	[ "Teal blue", "#265672" ], /* #357386 */
	[ "St. Patrick's blue", "#263972" ], /* #23297a */
	[ "St. Patrick's blue #2", "#2f2672" ], /* #23297a */
	[ "Regalia", "#4c2672" ], /* #522d80 */
	[ "Palatinate purple", "#692672" ], /* #4e2766 */
	[ "Byzantium", "#72265f" ], /* #6f2962 */
	[ "Dark raspberry", "#722642" ], /* #872656 */
	[ "Dark sienna", "#4c1919" ], /* #3d1414 */
	[ "Dark brown", "#4c2c19" ], /* #644220 */
	[ "Antique bronze #2", "#4c3f19" ], /* #665e1d */
	[ "Army green #2", "#464c19" ], /* #4c5420 */
	[ "Sap green #3", "#334c19" ], /* #4f7e2a */
	[ "Myrtle", "#1f4c19" ], /* #21421e */
	[ "Cal Poly green", "#194c26" ], /* #1d4d2b */
	[ "Brunswick green", "#194c39" ], /* #1a4b3c */
	[ "MSU Green", "#194c4c" ], /* #17433a */
	[ "Space cadet", "#19394c" ], /* #1d2a52 */
	[ "Space cadet #2", "#19264c" ], /* #1d2a52 */
	[ "Space cadet #3", "#1f194c" ], /* #1d2a52 */
	[ "Palatinate purple #2", "#32194c" ], /* #4e2766 */
	[ "Palatinate purple #3", "#46194c" ], /* #4e2766 */
	[ "Byzantium #2", "#4c193f" ], /* #6f2962 */
	[ "Dark raspberry #2", "#4c192c" ], /* #872656 */
	[ "Old burgundy", "#3f2626" ], /* #422f2d */
	[ "Bistre", "#3f2f26" ], /* #3d2a1e */
	[ "Olive Drab", "#3f3926" ], /* #3c2e1f */
	[ "Rifle green", "#3c3f26" ], /* #404732 */
	[ "Rifle green #2", "#333f26" ], /* #404732 */
	[ "Medium jungle green", "#293f26" ], /* #1c351c */
	[ "Black leather jacket", "#263f2c" ], /* #253629 */
	[ "Dark slate gray", "#263f36" ], /* #2f4f4f */
	[ "Dark slate gray #2", "#263f3f" ], /* #2f4f4f */
	[ "Charcoal", "#26363f" ], /* #35444e */
	[ "Charcoal #2", "#262c3f" ], /* #35444e */
	[ "Cyber Grape", "#29263f" ], /* #57417b */
	[ "Halaya ube", "#32263f" ], /* #553766 */
	[ "Halaya ube #2", "#3c263f" ], /* #553766 */
	[ "Dark byzantium", "#3f2639" ], /* #5b3852 */
	[ "Eggplant", "#3f262f" ], /* #624052 */
	[ "Deep coffee", "#7f4c4c" ], /* #714141 */
	[ "Pastel brown", "#7f5f4c" ], /* #826953 */
	[ "Gold Fusion", "#7f724c" ], /* #83744d */
	[ "Dark tan", "#797f4c" ], /* #8f7f50 */
	[ "Fern green", "#667f4c" ], /* #4f7942 */
	[ "Fern green #2", "#527f4c" ], /* #4f7942 */
	[ "Hunter green", "#4c7f59" ], /* #355e3b */
	[ "Hooker's green", "#4c7f6c" ], /* #48796b */
	[ "Dark electric blue", "#4c7f7f" ], /* #537878 */
	[ "Payne's grey", "#4c6c7f" ], /* #536878 */
	[ "UCLA Blue", "#4c597f" ], /* #546996 */
	[ "Cyber Grape #2", "#524c7f" ], /* #57417b */
	[ "Cyber Grape #3", "#654c7f" ], /* #57417b */
	[ "Mauve taupe", "#794c7f" ], /* #845e91 */
	[ "Razzmic Berry", "#7f4c72" ], /* #8d4d84 */
	[ "Twilight lavender", "#7f4c5f" ], /* #884869 */
	[ "Copper penny", "#b27f7f" ], /* #ad706a */
	[ "Pale taupe", "#b2927f" ], /* #bd987f */
	[ "Khaki (HTML/CSS) (Khaki)", "#b2a57f" ], /* #c3b092 */
	[ "Olivine", "#acb27f" ], /* #b8b673 */
	[ "Asparagus", "#99b27f" ], /* #86a96a */
	[ "Dark sea green", "#85b27f" ], /* #8fbc8f */
	[ "Dark sea green #2", "#7fb28c" ], /* #8fbc8f */
	[ "Cambridge Blue", "#7fb29f" ], /* #a3c1ad */
	[ "Cadet blue", "#7fb2b2" ], /* #5e9ea0 */
	[ "Cadet grey", "#7f9fb2" ], /* #91a3af */
	[ "Cool grey", "#7f8cb2" ], /* #8b91ab */
	[ "Purple mountain majesty", "#857fb2" ], /* #8b77b5 */
	[ "Opera mauve", "#987fb2" ], /* #a384b7 */
	[ "Opera mauve #2", "#ac7fb2" ], /* #a384b7 */
	[ "Pearly purple", "#b27fa5" ], /* #b667a1 */
	[ "English lavender", "#b27f92" ], /* #b48294 */

	[ "Skin #1","#EDE4C8" ],
	[ "Skin #2","#FFDCB1" ],
	[ "Skin #3","#ffd9cc" ],
	[ "Skin #4","#e4cbc0" ],
	[ "Skin #5","#edc6b1" ],
	[ "Skin #6","#E5C8A8" ],
	[ "Skin #7","#e5bda5" ],
	[ "Skin #8","#E4B98E" ],
	[ "Skin #9","#daae95" ],
	[ "Skin #10","#cfab9e" ],
	[ "Skin #11","#cda087" ],
	[ "Skin #12","#c69e85" ],
	[ "Skin #13","#af846d" ],
	[ "Skin #14","#b99179" ],
	[ "Skin #15","#745646" ],
	[ "Skin #16","#7b604f" ],
];

function fmt( number, width, base ){
	number=number.toString(base);
	width-=number.length;
	
	while(width>0){
		number="0"+number;
		width--;
	}
	
	return number;
}
function rgb(red,green,blue){
	return "#"+fmt(Math.floor(red),2,16)+fmt(Math.floor(green),2,16)+fmt(Math.floor(blue),2,16);
}
function hsl(h,s,l){
    var r, g, b;

	if(h<0) h+=1;
	if(h>1) h-=1;
	if(s<0) s=0;
	if(s>1) s=1;
	if(l<0) l=0;
	if(l>1) l=1;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return rgb(r * 255, g * 255, b * 255);
}
function rgbToHsl(str){
	var r = parseInt(str.substring(1,3),16);
	var g = parseInt(str.substring(3,5),16);
	var b = parseInt(str.substring(5,7),16);
	
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function $(path){
	var iter=document.evaluate(path, document, null, XPathResult.ANY_TYPE, null);
	var res=[];
	var elem;
	
	while((elem=iter.iterateNext())){
		res.push(elem);
	}
	
	return res;
}
function $0(path){
	var res=document.getElementById(path);
	if(res) return res;

	res=$(path);
	
	if(res.length==0) return null;

	return res[0];
}

function $$(tag,parent,className,textContent){
	var res=document.createElement(tag);
	
	if(className) res.className=className;
	if(textContent){
		if(res.tagName=="INPUT") res.value=textContent;
		else res.textContent=textContent;
	}
	
	parent.insertBefore(res,null);

	return res;
}

function showDynamicPalette(color){
	if(! dynamicPalette) return;
	
	dynamicPalette.innerHTML='';
	
	var c=rgbToHsl(color);
	var h=c[0];
	var s=c[1];
	var l=c[2];
	
	var minIndex=9999;
	function add(y,x,h1,s1,l1){
		addColor(dynamicPalette,[hsl(h1,s1,l1),hsl(h1,s1,l1)],x==0?26:13,y==0?26:13,onColorClick);
	}

	for(var j=-4;j<5;j++)
		for(var i=-7;i<8;i++)
			add(j,i,h+i*0.01,s,l+j*0.02);

	return false;
}

function saveHistory(){
	historyColors=[];
	
	for(var i in historyPalette.children){
		var elem=historyPalette.children[i];
		if(! elem.getAttribute) continue;
		
		var color=elem.getAttribute("data-color");
		if(! color) continue;
		
		historyColors.push(color);
	}
	
	if(historyColors.length==0){
		historyPalette.insertBefore(historyPaletteHint,null);
	}
	

	GM_setValue("history",JSON.stringify(historyColors));
}

function removeHistoryColor(elem){
	
	if(elem==null)
		historyPalette.innerHTML="";
	else if(elem.parentElement==historyPalette)
		historyPalette.removeChild(elem);
	
	saveHistory();
}

function addHistoryColor(color,ignore){
	if(! historyPalette) return;
	
	if(historyPaletteHint.parentElement==historyPalette)
		historyPalette.removeChild(historyPaletteHint);

	var c=rgbToHsl(color);
	var h=c[0];
	var s=c[1];
	var l=c[2];
	
	addColor(historyPalette,[hsl(h,s,l),hsl(h,s,l)],25.5,32,onColorClick);
	
	if(! ignore)
		saveHistory();
}

function onColorClick(e){
	var color=e.target.getAttribute("data-color");

	if(e.ctrlKey){
		if(e.target.parentElement==historyPalette){
			if(e.stopPropagation) e.stopPropagation();
			if(e.cancelBubble!=null) e.cancelBubble = true;
			removeHistoryColor(e.target);
		} else{
			addHistoryColor(color);
		}
	}
	
	if(e.target.parentElement!=dynamicPalette)
		showDynamicPalette(color);

	return false;
}

function addColor(elem,color,w,h,callback){
	var a=document.createElement("a");
	
	a.className="showme color btn";
	a.href="#drawing";
	
	if(color[0])
		a.title=color[0];
	
	a.style.width=w+"px";
	a.style.height=h+"px";
	a.style.background=color[1];

	a.setAttribute("data-color",color[1]);
	a.setAttribute("data-class","biege");
	
	if(callback)
		a.addEventListener("click",callback,false)
	
	elem.insertBefore(a,null);
	
	return a;
}

function addColors(elem,colors){
	for(i in colors){
		var color=colors[i];
		addColor(elem,colors[i],13,13,onColorClick);
	}
}


var paletteElem;
document.addEventListener("DOMNodeInserted",function(e){
	if(! paletteElem){
		paletteElem=document.getElementById('color-palette');
		if(paletteElem){
			apply();
		}
	}
},false);

function apply(){
	addColors(paletteElem,colors);
	
	$0('/html/body//div[@class="pulp-ui"]').className="pulp-ui pulp-tools";
	
	dynamicPalette=document.createElement("div");
	paletteElem.parentElement.insertBefore(dynamicPalette,paletteElem.nextSibling);
	
	dynamicPalette.id="color-palette-ext";
	dynamicPalette.className="colors normal panel";
	
	showDynamicPalette('#aa4444');
	
	var div=$0('/html/body//div[@class="pulp-package"]').parentElement;
	
	historyPalette=$$("div",div,"colors normal panel");
	historyPalette.id="color-palette-history";
	historyPalette.style.position="relative";

	historyPaletteHint=$$("span",historyPalette,null,"Ctrl-click to add colors to this palette");
	historyPaletteHint.style.textAlign="center";
	historyPaletteHint.style.position="absolute";
	historyPaletteHint.style.width="510px";
	historyPaletteHint.style.top="16px";
	historyPaletteHint.style.color="#aaa";
	
	for(i in historyColors){
		addHistoryColor(historyColors[i],true);
	}
	
	var tools=$$("div",div);
	tools.style.paddingTop="4px";
	
	var buttonClearHistory=$$("input",tools,"xbutton","Clear palette");
	buttonClearHistory.type="button";
	buttonClearHistory.addEventListener("click",function(){removeHistoryColor(null);},false);
}

GM_addStyle((<><![CDATA[
	#color-palette a { display: none; }
	a.showme { display: inline-block !important; }
	#mission-submit { position: static !important; }
	.pulp-ui .pulp-tools { position: relative !important; }
	
	
	.color:first-child { border-top-left-radius: 0px !important; }
	.color:nth-child(7) { border-top-right-radius: 0px !important; }
	.color:nth-child(8) { border-bottom-left-radius: 0px !important; }
	.color:nth-child(16) { border-bottom-left-radius: 0px !important; }

	a.color { -moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box; }
	a.color:hover { border: 2px solid black; }
	a.color.active { border: 2px solid white; }
	
	.colors {
		line-height: 0;
	}
	
	a.color {
		float: none !important;
		line-height: 0px !important;
		line-spacing: 0px !important;
	}

	.xbutton{
	    background-color: white;
		border: medium none;
		border-radius: 5px 5px 5px 5px;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
		color: #929497;
		display: inline-block;
		font-family: inherit;
		font-size: 12px;
		font-weight: 700;
		height: 30px;
		line-height: 30px;
		text-align: left;
		text-transform: uppercase;
	}

	.panel {
		background-color: white;
		border: 5px solid white;
		border-radius: 5px 5px 5px 5px;
	}
	
	#color-palette-history { 
		margin-top: 20px;
		
		width: 510px;
		min-height: 32px;
	}
	
	#color-palette-ext { 
		margin-top: 4px;
		width: 210px;
	}
]]></>).toString());
