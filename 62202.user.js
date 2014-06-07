// ==UserScript==
// @name           WoW UI forums - Lua/macro highlighter
// @namespace      http://userscripts.org/users/117819
// @description    Provides Lua syntax highlighting in [pre], as well as macro highlighting and validating on the official WoW forums.
// @include        http://forums.wow-europe.com/*
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==

// Configuration!

// Style setup.
var Styles = []
// Frame layout
Styles["highlight"] = "font-family: monospace;color: black;border: 1px solid #000;width: 800px; background: lightgray;"
Styles["highlight .lines"] = "text-align: right;padding: 5px;float: left;width: 25px;position:relative;"
Styles["highlight .code"] = "padding: 5px;float: left;width: 755px;overflow: auto;background: white;"
Styles["highlight .hax"] = "clear: both;"
// When text is quoted it is placed in <small> tags, which have white font color == illegible.
Styles["highlight small"] = "color: black;"

// Lua syntax colors
Styles["number"] = "color:orange;"
Styles["string"] = "color:gray;"
Styles["comment"] = "color:green;"
Styles["longstring"] = "background-color:aliceblue;color:black;"

Styles["Instructions"] = "color:blue;"
Styles["StandardLibs"] = "color:purple;"
Styles["CoreFuncs"] = "color:teal;"

// Macro colors
Styles["condition"] = "color:green;"
Styles["fail"] = "color:red;"
Styles["warning"] = "color:orange"
Styles["condSlash"] = "color:blue"
Styles["chatSlash"] = "color:pink"
Styles["chatText"] = "color:lightgreen;"
Styles["unknownSlash"] = "color:teal"
Styles["scriptSlash"] = "color:brown"
Styles["showIcon"] = "color:chocolate"
Styles["operators"] = "color:gold"

// Funcs list, feel free to change.
// Each keywords list should have an entry in the Styles table with the same key.
var Keywords = []

Keywords["Instructions"] = ["and", "break", "do", "else", "elseif", "end", "false", "for", "function", "if", "in", "local", "nil", "not", "or", "repeat", "return", "then", "true", "until", "while"]
Keywords["StandardLibs"] = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "deg", "exp", "floor", "format", "frexp", "gsub", "ldexp", "log", "log10", "max", "min", "mod", "rad", "random", "randomseed", "sin", "sqrt", "strbyte", "strchar", "strfind", "strlen", "strlower", "strrep", "strsub", "strupper", "tan", "string.byte", "string.char", "string.dump", "string.find", "string.len", "string.lower", "string.rep", "string.sub", "string.upper", "string.format", "string.gfind", "string.gsub", "table.concat", "table.foreach", "table.foreachi", "table.getn", "table.sort", "table.insert", "table.remove", "table.setn", "math.abs", "math.acos", "math.asin", "math.atan", "math.atan2", "math.ceil", "math.cos", "math.deg", "math.exp", "math.floor", "math.frexp", "math.ldexp", "math.log", "math.log10", "math.max", "math.min", "math.mod", "math.pi", "math.rad", "math.random", "math.randomseed", "math.sin", "math.sqrt", "math.tan"]
Keywords["CoreFuncs"] = ["_VERSION", "assert", "collectgarbage", "dofile", "error", "gcinfo", "loadfile", "loadstring", "print", "tonumber", "tostring", "type", "unpack", "_ALERT", "_ERRORMESSAGE", "_INPUT", "_PROMPT", "_OUTPUT", "_STDERR", "_STDIN", "_STDOUT", "call", "dostring", "foreach", "foreachi", "getn", "globals", "newtype", "rawget", "rawset", "require", "sort", "tinsert", "tremove", "_G", "getfenv", "getmetatable", "ipairs", "loadlib", "next", "pairs", "pcall", "rawegal", "rawget", "rawset", "require", "setfenv", "setmetatable", "xpcall"]

// Macro keywords
var ConditionalCommands = ["targetexact","targetlastenemy","targetfriend","click","target","use","ma","petattack","stopcasting","targetraid","maintank","equipslot","equipset","maintankoff","concede","focus","a","mainassist","petautocaston","yield","targetlasttarget","targetenemy","eq","assist","spell","cancelform","mainassistoff","clearmainassist","tar","targetfriendplayer","clearma","maoff","mtoff","petstay","clearfocus","castrandom","targetlastfriend","clearmt","targetenemyplayer","userandom","stopattack","equip","cleartarget","stopmacro","targetparty","mt","petdefensive","petpassive","castsequence","usesequence","startattack","forfeit","petautocasttoggle","petfollow","petaggressive","cast","cancelaura","swapactionbar","clearmaintank","changeactionbar","petautocastoff","dismount", "usetalents"]
var ChatCommands = ["bg", "battleground", "e", "emote", "me", "g", "gu", "gi", "guild", "o", "osay", "officer", "p", "party", "raid", "ra", "rsay", "rw", "r", "reply", "s", "say", "w", "whisper", "tell", "send", "t", "y", "yell", "sh", "shout","1","2","3","4","5","6","7","8","9","10"]
var ScriptCommands = ["run", "script"]

// Each slashtype should have an entry in Styles with the same key.
var SlashTypes = {}
SlashTypes["condSlash"] = ConditionalCommands
SlashTypes["chatSlash"] = ChatCommands
SlashTypes["scriptSlash"] = ScriptCommands
SlashTypes["showIcon"] = ["show", "showtooltip"]

var Conditions = ["vehicleui","unithasvehicleui","@", "target", "actionbar", "bar", "bonusbar", "btn", "button", "channeling", "combat", "dead", "equipped", "exists", "flyable", "flying", "form", "group", "harm", "help", "indoors", "mod", "modifier", "mounted", "outdoors", "party", "pet", "raid", "spec", "stance", "stealth", "swimming", "worn", "noactionbar", "nobar", "nobonusbar", "nobtn", "nobutton", "nochanneling", "nocombat", "nodead", "noequipped", "noexists", "noflyable", "noflying", "noform", "nogroup", "noharm", "nohelp", "noindoors", "nomod", "nomodifier", "nomounted", "nooutdoors", "noparty", "nopet", "noraid", "nospec", "nostance", "nostealth", "noswimming", "noworn"]
var ConditionAttributes = {}
ConditionAttributes["bar"] = ["1","2","3","4","5","6"]
ConditionAttributes["actionbar"] = ConditionAttributes["bar"]
ConditionAttributes["btn"] = ["1","2","3","4","5"]
ConditionAttributes["button"] = ConditionAttributes["btn"]
ConditionAttributes["mod"] = ["shift","ctrl","alt","lshift","lctrl","lalt","rshift","rctrl","ralt","selfcast"]
ConditionAttributes["modifier"] = ConditionAttributes["mod"]
ConditionAttributes["form"] = ["0","1","2","3","4","5","6"]
ConditionAttributes["stance"] = ConditionAttributes["form"]
ConditionAttributes["spec"] = ["1","2"]
ConditionAttributes["group"] = ["party","raid"]

ConditionAttributes["worn"] = ["cloth","leather","mail","plate","armor","head","neck","shoulder","back","chest","shirt","tabard","wrist","hands","waist","legs","feet","finger","trinket","weapon","bow","bows","crossbow","crossbows","gun","guns","one-hand","two-hand","two-handed swords","sword","one-handed swords","fishing pole","fishing poles","shield","shields","axe", "one-handed axes","two-handed axes","polearm","polearms","staff","staves","mace","one-handed maces","dagger","daggers","two-handed maces"]
ConditionAttributes["equipped"] = ConditionAttributes["worn"]

ConditionAttributes["target"] = ["player","pet","party","partypet","raid","raidpet","mouseover","focus","none","vehicle","arena","target"]

ConditionAttributes["pet"] = ["bat","bear","bird of prey","boar","carrion bird","cat","chimaera","core hound","crab","crocolisk","devilsaur","doomguard","dragonhawk","felguard","felhunter","ghoul","gorilla","hyena","imp","moth","nether ray","raptor","ravager","remote control","rhino","scorpid","serpent","silithid","spider","spirit beast","sporebat","succubus","tallstrider","turtle","voidwalker","warp stalker","wasp","wind serpent","wolf","worm"]

// Castsequence reset conditions.
var ResetAttributes = ["target","combat","shift","ctrl","alt","lshift","lctrl","lalt","rshift","rctrl","ralt"]

// End config.

// Create the regexes for each Keywords entry.
for (set in Keywords) {
	Keywords[set] = new RegExp("(\\b" + 
		// Join each word and replace magic characters.
		Keywords[set].join("\\b|\\b").replace("([.\\*()\[\]+^$|])", "\\$1") + "\\b)", "g")
}

// Utils
String.prototype.ltrim = function () { return this.replace(/^ */,""); }
String.prototype.rtrim = function () { return this.replace(/ *$/,""); }
String.prototype.trim = function () { return this.ltrim().rtrim(); }

var formatArgs
var formatHelper = function(whole, index) {
	if (formatArgs[0] instanceof Array) {
		return formatArgs[0][index]
	}
	return formatArgs[index]
}
String.prototype.format = function() {
	formatArgs = arguments
	return this.replace(/{(\d+)}/g, formatHelper)
}

Array.prototype.contains = function(needle) {
	for ( var i=0 ; i < this.length ; i++ ) {
		if ( this[i] == needle ) {
			return true
		}
	}
}

// Create classes based on styles in config, and paste them into the head.
var styleFormat = ".{0} { {1} }"
var head = document.getElementsByTagName("head")[0]
var headHTML = head.innerHTML
headHTML += "<style>"
for (var condition in Styles) {
	headHTML += styleFormat.format(condition, Styles[condition])
}
head.innerHTML = headHTML += "</style>"


// Arrays used to temporarily store things in the highlighting process.
var StringCaptures = []
function HandleStrings(pattern, str) {
	StringCaptures[StringCaptures.length] = str
	return "@WOWPRE_VAR@" + (StringCaptures.length-1)
}

var CommentCaptures = []
function HandleComments(match) {
	CommentCaptures[CommentCaptures.length] = match
	return "@WOWPRE_COMMENT@" + (CommentCaptures.length-1)
}

var MacroCaptures = []
function HandleMacros(macro) {
	MacroCaptures[MacroCaptures.length] = macro
	return "@WOWPRE_MACRO@" + (MacroCaptures.length-1)
}

var PreCaptures = []
function HandlePre(whole, pre) {
	PreCaptures[PreCaptures.length] = pre
	return "@WOWPRE_PRE@" + (PreCaptures.length-1)
}

// Replace replacement strings in the text with their original value.
function ReplaceOriginal(whole, type, num) {
	var array
	var style
	switch(type) {
		case "VAR":
			array = StringCaptures
			style = "string"
			break
		case "COMMENT":
			array = CommentCaptures
			style = "comment"
			break
		case "PRE":
			return MakeFrame(HighlightCode(PreCaptures[num]))
		case "MACRO":
			return ParseMacroLine(MacroCaptures[num])
	}
	
	return "<span class=\"" + style + "\">" + array[num] + "</span>"
}

// Returns line number code for the frame making process.
function CreateLineNumbers(code) {
	var output = ""
	for (var i=1 ; i < (code.split(/\<br\>/i).length + 1) ; i++) {
		output = output + i + "<br>"
	}
	
	return output
}

// Magic happens here.
function HighlightCode(code) {
	// Get the macros out of there.
	code = code.replace(/^([\/#][a-zA-Z0-9]+.+)/, HandleMacros)
	code = code.replace(/<br>\s*([\/#][a-zA-Z0-9]+.+)/g, HandleMacros)

	// For lack of a better solution I take out the comments first.
	// The long-uns:
	code = code.replace(/(--\[(=*)\[[\s\S]*?\]\2\])/g, HandleComments)
	
	// And the short ones too:
	code = code.replace(/(--.*)/g, HandleComments)
	
	// And the strings.
	code = code.replace(/((["'])(?:(?=(\\?))\3.)*?\2)/g, HandleStrings)
	
	// Long strings are not replaced because I want code highlighting in there.
	// This makes code snippets for secure templates easier to read.
	code = code.replace(/(\[(=*)\[[\s\S]*?\]\2\])/g, "<span class=longstring>$1</span>")
	
	// Then I replace the keywords.
	for (set in Keywords) {
		code = code.replace(Keywords[set], "<span class=\"" + set + "\">$1</span>")
	}
	
	//And digits.
	code = code.replace(/([^@\w])(\d+(?:[x\.]\d+)?)/g, "$1<span class=number>$2</span>")
	
	// And then replace the replaced strings and comments with the original again.
	// Sue me. ;)
	return code.replace(/@WOWPRE_(.*?)@(\d+)/g, ReplaceOriginal)
}

function MakeFrame(code) {
	// Break out the newlines. Just <br> will do.
	code = code.replace(/\n/g, "")
	
	// Kill leading and trailing <br>s
	code = code.replace(/^(?:\<br\>)*/i, "")
	code = code.replace(/(?:\<br\>)*$/i, "")
	
	// Opera uses \r as well, and places <wbr> at seemingly random places.
	// Me no likey. Eat them!
	if (/Opera/.test(navigator.userAgent)) {
		code = code.replace(/\r/g, "")
		code = code.replace(/<wbr>/ig, "")
	}
	
	/*
		<pre>
			<div class="highlight">
				<div class="lines">
					line numbers
				</div>
				<div class="code">
					codes!
				</div>
				<div class="hax"></div>
			</div>
		</pre>
	*/
	var frameCode = "<pre><div class=highlight><div class=lines>" + CreateLineNumbers(code) + "</div><div class=code>"
	frameCode += code + "</div><div class=hax></div></div></pre>"
	
	return frameCode
}

// Figure out whether or not the target=/@ condition contains a valid unit.
function ParseTargetCondition(target) {
	target = target.trim()
	var unit = (target.search("@") >= 0 ? target.substring(1) : target.substring(7)).trim()
	var isUnitID
	var isName
	
	// Figure out the base unit, removing any added -target.
	var baseUnit
	if ( unit.search("-") > -1 ) {
		baseUnit = unit.replace(/-target/g, "")
		isName = true
	}
	else if ( unit.length > 0 ) {
		baseUnit = unit.replace(/(target)*$/g, "")
		if ( baseUnit == "" ) {
			baseUnit = "target"
		}
	}
	if ( ConditionAttributes["target"].contains(baseUnit.replace(/\d*$/, "")) ) {
		isUnitID = true
	}
	
	var output
	if ( baseUnit.search(/^[\S\D]*/) < 0 ) {
		output = 4
	}
	else if ( !isUnitID && Conditions.contains(baseUnit) ) {
		output = 5
	}
	else if ( !isUnitID ) {
		output = 11
		if ( !isName ) {
			baseUnit = unit
		}
	}
	else {
		output = 0
	}
	
	return [output, baseUnit]
	
}

var AttributeValidator = {}
AttributeValidator["pet"] = function(pet) {
	if (ConditionAttributes["pet"].contains(pet)) {
		return 0
	}
	else {
		return 12
	}
}

// Condition errors.
ConditionErrors = []
ConditionErrors[1] = "No attribute allowed for '{0}'."
ConditionErrors[2] = "Attribute '{1}' not allowed for '{0}'."
ConditionErrors[3] = "Invalid condition '{0}'."
ConditionErrors[4] = "Unit '{1}' is not a valid unit."
ConditionErrors[5] = "Attempt to use macro condition '{1}' in target condition, only valid unitIDs are allowed."

// Warnings
// A warning is used when the macro will work, but might not work as expected.
// Example: Using unitnames in a target= clause. In this case they will have to be in your group for the condition to work.
ConditionErrors[11] = "Unit '{1}' needs to be in your group for this to work."
ConditionErrors[12] = "'{1}' will be interpreted as the name of your pet."

// Check if the condition is valid, ie. it exists, has the appropriate/no attributes, etc.
function ParseCondition(block, condition) {
	// Check each (comma seperated) condition in the condition block.
	var conds = condition.split(",")
	for ( var i=0 ; i < conds.length ; i++ ) {
		// Check if the condition is allowed to have an attribute, and if it's valid.
		// 0: 's all good, anything else is an error as seen in ConditionErrors above.
		var evalCondition
		var SplitCondition = conds[i].split(/[\/:]/)
		var err
		
		// Trim whitespace and cast to lowercase.
		for ( var x=0 ; x < SplitCondition.length ; x++ ) {
			SplitCondition[x] = SplitCondition[x].trim().toLowerCase()
		}
		
		// Check if condition is valid.
		evalCondition = Conditions.contains(SplitCondition[0]) ? 0 : 3
		
		// Handle target= seperately.
		if ( SplitCondition[0].search(/^(@|target=)/) > -1 ) {
			var targetEval = ParseTargetCondition(SplitCondition[0])
			evalCondition = targetEval[0]
			SplitCondition[1] = targetEval[1]
		}
		// Check if attributes for condition are allowed.
		else if ( !evalCondition && SplitCondition[1] ) {
			var baseCondition = SplitCondition[0]
			// no<condition> should be treated as <condition>
			if ( baseCondition.substring(0,2) == "no" ) {
				baseCondition = baseCondition.substring(2)
			}
			
			// Is condition even allowed to have attributes?
			evalCondition = ConditionAttributes[baseCondition] ? 0 : 1
			
			if ( !evalCondition ) {
				// Check allowed attributes.
				for ( var y=1 ; y<SplitCondition.length ; y++ ) {
					if (AttributeValidator[baseCondition]) {
						evalCondition = AttributeValidator[baseCondition](SplitCondition[y])
					}
					else { 
						if (!ConditionAttributes[baseCondition].contains(SplitCondition[y])) {
							evalCondition = 2
							if (err) {
								err += ", '{" + y + "}'"
							}
							else {
								err = "Attribute '{" + y + "}'"
							}
						}
						
						if (err) {
							err += " not allowed for '{0}'."
						}
					}
				}
			}
		}
		else if ( /[^\w:\/]/.test(SplitCondition[0]) ) {
			err = "Invalid character: '" + SplitCondition[0].match(/[^a-zA-Z\d:\/]/)[0] + "'. Only : or / are allowed depending on the condition."
		}
		
		if ( !evalCondition ) {
			conds[i] = "<span class=\"condition\">" + conds[i] + "</span>"
		}
		else if ( evalCondition <= 10 ) {
			// Error.
			conds[i] = "<span title=\"" + (err ? err.format(SplitCondition) : ConditionErrors[evalCondition].format(SplitCondition)) + "\" class=\"fail\">" + conds[i] + "</span>"
		}
		else {
			// Warning.
			conds[i] = "<span title=\"" + (err ? err.format(SplitCondition) : ConditionErrors[evalCondition].format(SplitCondition)) + "\" class=\"warning\">" + conds[i] + "</span>"
		}
	}
	
	return ("<span class='operators'>" + block + "</span>").replace(condition, conds.join(","))
}

// Parse the macro line and output pretty colors.
function ParseMacroLine(line) {
	var slashStart = line.search(/\/|#/)
	var HTML, commands
	
	switch(slashStart)
	{
		case 0:
			HTML = ""
			commands = line
		default:
			HTML = line.substring(0, slashStart)
			commands = line.substring(slashStart)
	}
	
	var match = /^([\/#].+?)(\s+.*|(?:<.+>))*$/.exec(commands)
	if ( match ) {
		var slash = match[1]
		var params = match[2]
		
		var slashCmd = slash.substring(1).toLowerCase()
		
		// Determine type of slash command.
		var slashType
		for ( type in SlashTypes ) {
			if ( SlashTypes[type].contains(slashCmd) ) {
				slashType = type
			}
		}
		
		if ( !slashType ) {
			slashType = "unknownSlash"
		}
		
		if ( slashType == "chatSlash" ) {
			params = ("<span class='chatText' title='No conditions will work on this line, unless you have an addon that enables them.'>{0}</span>").format(params)
		}
		else if ( slashType == "scriptSlash" ) {
			params = HighlightCode(params)
		}
		else if ( slashType != "condSlash" && slashType != "showIcon") {
			if ( /^ *\[(.+?)\]/g.test(params) ) {
				// Conditionals found for slash command that may not allow them.
				params = ("<span class=\"warning\" title=\"{0} is not recognized as a slash command that allows conditionals. This line may not work as you expect.\">{1}</span>").format(slash, params)
			}
		}
		else {
			// Apply conditional Slash color:
			if ( params ) {
				// Parse conditions.
				params = params.replace(/\[(.*?)\]/g, ParseCondition)
			}
		}
		
		// Format the slash command.
		slash = ("<span class=\"{0}\">{1}</span>").format(slashType, slash)
		
		if ( params ) {
			line = line.replace(commands, slash + params)
		}
		else {
			line = line.replace(commands, slash)
		}
	}
	
	return line
}

function CreateMacroBlock(macro) {
	macro = macro.split(/\n|\r/g)
	var numLines = macro.length
	var HTML = ""
	
	for ( var i=0 ; i < numLines ; i++ ) {
		var pos = macro[i].search(/<hr/i)
		if ( pos > -1 ) {
			HTML = macro[i].substring(pos)
			macro[i] = macro[i].substring(0, pos)
		}
		macro[i] = ParseMacroLine(macro[i])
	}
	
	return MakeFrame(macro.join("")) + HTML
}

var MultilineMacroRegex = /^((?:<(?:br|b|i|u)>)*\s*[\/#][a-zA-Z0-9]+.*?[\n\r])+/mgi
var postBody = document.getElementsByClassName("rplol")
for (var i=0 ; i < postBody.length ; i++) {
	var innerHTML = postBody[i].innerHTML.replace(/^\s*/, "")
	
	// Replace PRE blocks.
	innerHTML = innerHTML.replace(/<pre>([\s\S]*?)<\/pre>/gi, HandlePre)
	
	// Find leftover macros.
	innerHTML = innerHTML.replace(MultilineMacroRegex, CreateMacroBlock)
	
	innerHTML = innerHTML.replace(/@WOWPRE_(.*?)@(\d+)/g, ReplaceOriginal)
	
	postBody[i].innerHTML = innerHTML

}

var ad = document.getElementsByClassName("advertise-horz")
for (var i=0 ; i < ad.length ; i++) {
	ad[i].parentNode.style.display = "none"
}

var ad = document.getElementsByClassName("advertise-vert")
for (var i=0 ; i < ad.length ; i++) {
	ad[i].parentNode.style.display = "none"
}