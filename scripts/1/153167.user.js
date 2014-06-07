//-----------------------------------------------------------------------------
// [WoD] Extra Statistics
// Version 1.19, 2010-04-15
// Copyright (c) Fenghou, Tomy
//
// Version 1.2, 2011-09-23
// French adaptation by Dragor Laciturne & Atchoum 
// Add Min & Max numbers by Atchoum
// CopyLeft Atchoum & Dragor Laciturne
//
// Version 1.2.x, 2011-09-23
// Errors corrections in RegExp
//
// Version 1.2.3, 2012-03-08
// Fix explosion attacks
//
// Version 1.2.4, 2012-03-08
// Added Banishment attacks
//
// This script can generate additional statistical data in the dungeon and duel report pages.
// When you entered the details or statistics page of reports, a new button will appear beside
//   the details button. At the details page, the new button is "Extra Stat", which will show
//   the statistics of the current level when you click it. At the statistics page, the new
//   button is "Entire Extra Stat", which will show the statistics of entire dungeon.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// If you want to add a new Stat table, you should create a new sub class of CInfoList,
//   and use CStat::RegInfoList() to register your new info list.
// A detailed example is CILItemDamage.
//-----------------------------------------------------------------------------

// ==UserScript==
// @name		[WoD] Extra Statistics
// @version            1.2.4.1
// @description		Generate additional statistical data in the dungeon and duel report pages
// @include		http*://*.world-of-dungeons.*/wod/spiel/*dungeon/report.php*
// @include		http*://*.world-of-dungeons.*/wod/spiel/tournament/*duell.php*
// @require        http://userscripts.org/scripts/source/113727.user.js?maxage=30&minage=1&method=show
// ==/UserScript==


// COMMON FUNCTIONS ///////////////////////////////////////////////////////////

function $(id) {return document.getElementById(id);}


// Choose contents of the corresponding language
// Contents: {Name1 : [lang1, lang2, ...], Name2 : [lang1, lang2, ...], ...}
// return: Local contents, or null
// It will edit the input contents directly, so the returned object is not necessary
function GetLocalContents(Contents)
	{
	function GetLanguageId()
		{
		var langText = null;
		var allMetas = document.getElementsByTagName("meta");
		for (var i = 0; i < allMetas.length; ++i)
			{
			if (allMetas[i].httpEquiv == "Content-Language")
				{
				langText = allMetas[i].content;
				break;
				}
			}
		if (langText == null)
			return false;

		switch (langText)
			{
			case "en":
				return 0;
			case "cn":
				return 1;
			case "fr":
				return 2;
			case "es":
				return 3;
			default:
				return null;
			}
		}

	var nLangId = GetLanguageId();
	if (nLangId == null)
		return null;

	if (Contents instanceof Object)
		{
		for (var name in Contents)
			Contents[name] = Contents[name][nLangId];
		return Contents;
		}
	else
		return null;
	}


function CompareString(a, b)
	{
	a = a || "";
	b = b || "";
	return a.toLowerCase().localeCompare( b.toLowerCase() );
	}


function CreateElementHTML(Name, Content /* , [AttrName1, AttrValue1], [AttrName2, AttrValue2], ... */)
	{
	var HTML = '<' + Name;

	for (var i = 2; i < arguments.length; ++i)
		HTML += ' ' + arguments[i][0] + '="' + arguments[i][1] + '"';

	HTML += (Content != null && Content != "") ? ('>' + Content + '</' + Name + '>') : (' />');

	return HTML;
	}


function DbgMsg(Text) {if (DEBUG) alert(Text);}


// EXTERN FUNCTIONS ///////////////////////////////////////////////////////////

/**
 * A utility function for defining JavaScript classes.
 *
 * This function expects a single object as its only argument.  It defines
 * a new JavaScript class based on the data in that object and returns the
 * constructor function of the new class.  This function handles the repetitive
 * tasks of defining classes: setting up the prototype object for correct
 * inheritance, copying methods from other types, and so on.
 *
 * The object passed as an argument should have some or all of the
 * following properties:
 *
 *      name: The name of the class being defined.
 *            If specified, this value will be stored in the classname
 *            property of the prototype object.
 *
 *    extend: The constructor of the class to be extended. If omitted,
 *            the Object( ) constructor will be used. This value will
 *            be stored in the superclass property of the prototype object.
 *
 * construct: The constructor function for the class. If omitted, a new
 *            empty function will be used. This value becomes the return
 *            value of the function, and is also stored in the constructor
 *            property of the prototype object.
 *
 *   methods: An object that specifies the instance methods (and other shared
 *            properties) for the class. The properties of this object are
 *            copied into the prototype object of the class. If omitted,
 *            an empty object is used instead. Properties named
 *            "classname", "superclass", and "constructor" are reserved
 *            and should not be used in this object.
 *
 *   statics: An object that specifies the static methods (and other static
 *            properties) for the class. The properties of this object become
 *            properties of the constructor function. If omitted, an empty
 *            object is used instead.
 *
 *   borrows: A constructor function or array of constructor functions.
 *            The instance methods of each of the specified classes are copied
 *            into the prototype object of this new class so that the
 *            new class borrows the methods of each specified class.
 *            Constructors are processed in the order they are specified,
 *            so the methods of a class listed at the end of the array may
 *            overwrite the methods of those specified earlier. Note that
 *            borrowed methods are stored in the prototype object before
 *            the properties of the methods object above. Therefore,
 *            methods specified in the methods object can overwrite borrowed
 *            methods. If this property is not specified, no methods are
 *            borrowed.
 *
 *  provides: A constructor function or array of constructor functions.
 *            After the prototype object is fully initialized, this function
 *            verifies that the prototype includes methods whose names and
 *            number of arguments match the instance methods defined by each
 *            of these classes. No methods are copied; this is simply an
 *            assertion that this class "provides" the functionality of the
 *            specified classes. If the assertion fails, this method will
 *            throw an exception. If no exception is thrown, any
 *            instance of the new class can also be considered (using "duck
 *            typing") to be an instance of these other types.  If this
 *            property is not specified, no such verification is performed.
 **/
function DefineClass(data) {
    // Extract the fields we'll use from the argument object.
    // Set up default values.
    var classname = data.name;
    var superclass = data.extend || Object;
    var constructor = data.construct || function(){};
    var methods = data.methods || {};
    var statics = data.statics || {};
    var borrows;
    var provides;

    // Borrows may be a single constructor or an array of them.
    if (!data.borrows) borrows = [];
    else if (data.borrows instanceof Array) borrows = data.borrows;
    else borrows = [ data.borrows ];

    // Ditto for the provides property.
    if (!data.provides) provides = [];
    else if (data.provides instanceof Array) provides = data.provides;
    else provides = [ data.provides ];

    // Create the object that will become the prototype for our class.
    var proto = new superclass( );

    // Delete any noninherited properties of this new prototype object.
    for(var p in proto)
        if (proto.hasOwnProperty(p)) delete proto[p];

    // Borrow methods from "mixin" classes by copying to our prototype.
    for(var i = 0; i < borrows.length; i++) {
        var c = data.borrows[i];
        borrows[i] = c;
        // Copy method properties from prototype of c to our prototype
        for(var p in c.prototype) {
            if (typeof c.prototype[p] != "function") continue;
            proto[p] = c.prototype[p];
        }
    }
    // Copy instance methods to the prototype object
    // This may overwrite methods of the mixin classes
    for(var p in methods) proto[p] = methods[p];

    // Set up the reserved "constructor", "superclass", and "classname"
    // properties of the prototype.
    proto.constructor = constructor;
    proto.superclass = superclass;
    // classname is set only if a name was actually specified.
    if (classname) proto.classname = classname;

    // Verify that our prototype provides all of the methods it is supposed to.
    for(var i = 0; i < provides.length; i++) {  // for each class
        var c = provides[i];
        for(var p in c.prototype) {   // for each property
            if (typeof c.prototype[p] != "function") continue;  // methods only
            if (p == "constructor" || p == "superclass") continue;
            // Check that we have a method with the same name and that
            // it has the same number of declared arguments.  If so, move on
            if (p in proto &&
                typeof proto[p] == "function" &&
                proto[p].length == c.prototype[p].length) continue;
            // Otherwise, throw an exception
            throw new Error("Class " + classname + " does not provide method "+
                            c.classname + "." + p);
        }
    }

    // Associate the prototype object with the constructor function
    constructor.prototype = proto;

    // Copy static properties to the constructor
    for(var p in statics) constructor[p] = statics[p];

    // Finally, return the constructor function
    return constructor;
}


/**
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 */


/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the |CharacterData| interface (i.e.,
 *             a |Text|, |Comment|, or |CDATASection| node
 * @return     True if all of the text content of |nod| is whitespace,
 *             otherwise false.
 */
function is_all_ws( nod )
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.data));
}


/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the DOM1 |Node| interface.
 * @return     true if the node is:
 *                1) A |Text| node that is all whitespace
 *                2) A |Comment| node
 *             and otherwise false.
 */

function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // A comment node
         ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

/**
 * Version of |previousSibling| that skips nodes that are entirely
 * whitespace or comments.  (Normally |previousSibling| is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest previous sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_before( sib )
{
  while ((sib = sib.previousSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |nextSibling| that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest next sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_after( sib )
{
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |lastChild| that skips nodes that are entirely
 * whitespace or comments.  (Normally |lastChild| is a property
 * of all DOM nodes that gives the last of the nodes contained
 * directly in the reference node.)
 *
 * @param par  The reference node.
 * @return     Either:
 *               1) The last child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function last_child( par )
{
  var res=par.lastChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.previousSibling;
  }
  return null;
}

/**
 * Version of |firstChild| that skips nodes that are entirely
 * whitespace and comments.
 *
 * @param par  The reference node.
 * @return     Either:
 *               1) The first child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function first_child( par )
{
  var res=par.firstChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.nextSibling;
  }
  return null;
}

/**
 * Version of |data| that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space.  (Normally
 * |data| is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
function data_of( txt )
{
  var data = txt.data;
  // Use ECMA-262 Edition 3 String and RegExp features
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data.charAt(0) == " ")
    data = data.substring(1, data.length);
  if (data.charAt(data.length - 1) == " ")
    data = data.substring(0, data.length - 1);
  return data;
}


// CLASSES ////////////////////////////////////////////////////////////////////

// NextNode: the node next to the statistics node when it is created
function CStat(NextNode)
	{
	var NewSection = document.createElement("div");
	NewSection.id = "stat_all";
	this._Node = NextNode.parentNode.insertBefore(NewSection, NextNode);

	this._HTML = '';

	this._gInfoList = [];

	this.nTotalPages = 0;
	this.nReadPages = 0;
	}

CStat.prototype._Write = function(Text) {this._HTML += Text;};

CStat.prototype._Flush = function() {this._Node.innerHTML = this._HTML;};

CStat.prototype.RegInfoList = function(InfoList)
	{
	if (InfoList instanceof CInfoList)
		{
		this._gInfoList.push(InfoList);
		return true;
		}
	return false;
	};

CStat.prototype.SaveInfo = function(Info)
	{
	for (var i = 0; i < this._gInfoList.length; ++i)
		this._gInfoList[i].SaveInfo(Info);
	};

CStat.prototype.Show = function()
	{
	this._Write("<hr />");
	for (var i = 0; i < this._gInfoList.length; ++i)
		this._Write( this._gInfoList[i].Show() );
	this._Write(this._OptionsHTML());
	this._Write("<hr />");
	this._Flush();

	for (var i = 0; i < this._gInfoList.length; ++i)
		this._gInfoList[i].AddEvents();
	this._AddEvents();
	};

CStat.prototype.ShowProgress = function()
	{
	this._Node.innerHTML = '<hr /><h1>' + Local.Text_Loading + ' (' +
		this.nReadPages + '/' + this.nTotalPages + ') ...</h1><hr />';
	};

CStat.prototype._OptionsHTML = function()
	{
	var Str = '<div id="stat_options">' +
		'<div class="stat_header"><span class="stat_title">' + Local.Text_Options + '</span>';
	Str += CreateElementHTML("input", null, ["type", "button"], ["class", "button"],
		["id", "stat_options_default"], ["value", Local.Text_Button_Default]);
	Str += '</div></div>';
	return Str;
	};

CStat.prototype._AddEvents = function()
	{
	function OnDelGMValues()
		{
		try	{
			var ValueList = GM_listValues();
			for (var name in ValueList) {GM_deleteValue(ValueList[name]);}
			alert(Local.Text_DefaultMsg);
			}
		catch (e) {alert("OnDelGMValues(): " + e);}
		}
	$("stat_options_default").addEventListener("click", OnDelGMValues, false);
	};


///////////////////////////////////////////////////////////////////////////////
function CTable(Title, Id, nColumns)
	{
	this._Title = Title;
	this._Id = Id;
	this._nColumns = nColumns;
	this._HeadCellContents = new Array(nColumns);
	this._BodyCellContentTypes = new Array(nColumns);
	this._BodyCellContents = [];
	this._HTML = '';

	this._bShow = GM_getValue(Id, true);
	}

CTable._ContentAttrs = {
		string	: '',
		number	: 'align="right"',
		button	: 'align="center"'};

CTable.prototype.SetHeadCellContents = function(/* Content1, Content2, ... */)
	{
	for (var i = 0; i < this._nColumns; ++i)
		this._HeadCellContents[i] = arguments[i] != null ? arguments[i] : "";
	};

// Type: a string that is the property name of CTable::ContentAttrs
CTable.prototype.SetBodyCellContentTypes = function(/* Type1, Type2, ... */)
	{
	for (var i = 0; i < this._nColumns; ++i)
		this._BodyCellContentTypes[i] =
			arguments[i] != null ? CTable._ContentAttrs[arguments[i]] : "";
	};

CTable.prototype.SetBodyCellContents = function(/* Content1, Content2, ... */)
	{
	var Contents = new Array(this._nColumns);
	for (var i = 0; i < this._nColumns; ++i)
		Contents[i] = arguments[i] != null ? arguments[i] : "";
	this._BodyCellContents.push(Contents);
	};

CTable.prototype.CreateHTML = function()
	{
	this._HTML = '<div id="' + this._Id + '">' +
		'<div class="stat_header"><span class="stat_title clickable">' + this._Title + '</span></div>' +
		'<table class="content_table" ' + (this._bShow ? '' : 'hide="hide"') + '>' +
		'<tr class="content_table_header">';

	for (var i = 0; i < this._nColumns; ++i)
		this._HTML += '<th class="content_table">' + this._HeadCellContents[i] + '</th>';
	this._HTML += '</tr>';
	
	for (var i = 0; i < this._BodyCellContents.length; ++i)
		{
		this._HTML += '<tr class="content_table_row_' + i % 2 + '">';
		for (var j = 0; j < this._nColumns; ++j)
			{
			this._HTML += '<td class="content_table" ' +
				this._BodyCellContentTypes[j] + '>' +
				this._BodyCellContents[i][j] + '</td>';
			}
		this._HTML += '</tr>';
		}
	this._HTML += '</table></div>';

	return this._HTML;
	};

CTable.prototype.GetHTML = function()
	{return this._HTML;};

CTable.prototype.AddEvents = function()
	{
	var Title = $(this._Id).getElementsByTagName("span")[0];
	function Factory(Id) {return function(){CTable.OnClickTitle(Id);};}
	Title.addEventListener("click", Factory(this._Id), false);
	};

CTable.OnClickTitle = function(Id)
	{
	try	{
		var Table = $(Id).getElementsByTagName("table")[0];
		if (Table.hasAttribute("hide"))
			{
			Table.removeAttribute("hide");
			GM_setValue(Id, true);
			}
		else
			{
			Table.setAttribute("hide", "hide");
			GM_setValue(Id, false);
			}
		}
	catch (e) {alert("CTable.OnClickTitle(): " + e);}
	};


///////////////////////////////////////////////////////////////////////////////
function CActiveInfo()
	{
	this.nIniRoll;
	this.nCurrAction;
	this.nTotalActions;
	this.Char		= new CChar();
	this.nCharId;
	this.ActionType		= new CActionType();
	this.Skill		= new CSkill();
	this.nAttackRoll;
	this.nAttackMinRoll;
	this.nAttackMaxRoll;
	this.nSkillMP;
	this.gItem		= new CKeyList();
	}


function CPassiveInfo()
	{
	this.Char		= new CChar();
	this.nCharId;
	this.Skill		= new CSkill();
	this.nDefenceRoll;
	this.nSkillMP;
	this.gItem		= new CKeyList();
	this.HitType		= new CHitType();
	this.bStruckDown;
	this.gDamage		= [];
	this.DamagedItem	= new CItem();
	this.nItemDamage;
	this.nHealedHP;
	this.nHealedMP;
	}


function CNavi(nLevel, nRoom, nRound, nRow)
	{
	this.nLevel		= nLevel;
	this.nRoom		= nRoom;
	this.nRound		= nRound;
	this.nRow		= nRow;
	}


function CActionInfo(Navi)
	{
	this.Navi		= Navi;
	this.Active		= new CActiveInfo();
	this.gPassive		= [];
	}


///////////////////////////////////////////////////////////////////////////////
// Class: Key
// Every key should have two function properties: compareTo() and toString(),
//   and can work without initialization parameters

var CKey = DefineClass({
	methods:
		{
		compareTo: function(that) {return this - that;},
		toString: function() {return "";}
		}
	});


var CKeyList = DefineClass({
	extend: CKey,
	construct: function() {this._gKey = [];},
	methods:
		{
		push: function(Key) {return this._gKey.push(Key);},
		compareTo: function(that)
			{
			var result = this._gKey.length - that._gKey.length;
			if (result !== 0)
				return result;

			var i = 0;
			while (i < this._gKey.length && this._gKey[i].compareTo(that._gKey[i]) === 0)
				++i;
			if (i === this._gKey.length)
				return 0;
			else
				return this._gKey[i].compareTo(that._gKey[i]);
			},
		toString: function() {return this._gKey.join(", ");}
		}
	});


var CChar = DefineClass({
	extend: CKey,
	construct: function(HTMLElement)
		{
		this._Name;
		this._Href;
		this._OnClick;
		this._Class;
		this._nType;

		if (HTMLElement != null)
			{
			this._Name = HTMLElement.firstChild.data;
			this._Href = HTMLElement.getAttribute("href");
			this._OnClick = HTMLElement.getAttribute("onclick");
			this._Class = HTMLElement.className;
			this._nType = CChar._GetCharType(this._Class);
			if (this._nType === null)
				DbgMsg("CChar(): Unknown type: " + this._Class);
			}
		},
	methods:
		{
		GetType: function() {return this._nType;},
		compareTo: function(that)
			{
			var result = this._nType - that._nType;
			if (result !== 0)
				return result;
			return CompareString(this._Name, that._Name);
			},
		toString: function()
			{
			if (this._Name != null)
				return CreateElementHTML("a", this._Name, ["href", this._Href],
					["onclick", this._OnClick], ["class", this._Class]);
			else
				return "";
			}
		},
	statics:
		{
		_GetCharType: function(Class)
			{
			switch (Class)
				{
				case "rep_hero":
				case "rep_myhero":
					return 0;
				case "rep_monster":
				case "rep_myhero_defender":
					return 1;
				default:
					return null;
				}
			}
		}
	});


// In-round actions
var CActionType = DefineClass({
	extend: CKey,
	construct: function(ActionText)
		{
		this._nType;
		this._nKind;

		if (ActionText != null)
			{
			var ret = CActionType._GetActionTypeAndKind(ActionText);
			this._nType = ret[0];
			this._nKind = ret[1];
			}
		},
	methods:
		{
		GetType: function() {return this._nType;},
		GetKind: function() {return this._nKind;},
		compareTo: function(that) {return this._nType - that._nType;},
		toString: function()
			{
			switch (this._nKind)
				{
				case 0:		return Local.TextList_AttackType[this._nType];
				case 1:		return "heal";
				case 2:		return "buff";
				case 3:		return "wait";
				default:	return "unknown";
				}
			}
		},
	statics:
		{
		// return: an array, [0]: _nType, [1]: _nKind
		_GetActionTypeAndKind: function(ActionText)
			{
			switch (ActionText)
				{
				case Local.OrigTextList_ActionType[0]:	// melee
					return [0, 0];
				case Local.OrigTextList_ActionType[1]:	// ranged
					return [1, 0];
				case Local.OrigTextList_ActionType[2]:	// magic
					return [2, 0];
				case Local.OrigTextList_ActionType[3]:	// social
					return [3, 0];
				case Local.OrigTextList_ActionType[4]:	// ambush
					return [4, 0];
				case Local.OrigTextList_ActionType[5]:	// trap
					return [5, 0];
				case Local.OrigTextList_ActionType[6]:	// nature
					return [6, 0];
				case Local.OrigTextList_ActionType[7]:	// disease
					return [7, 0];
				case Local.OrigTextList_ActionType[8]:	// detonate
					return [8, 0];
				case Local.OrigTextList_ActionType[9]:	// disarm trap
					return [9, 0];
				case Local.OrigTextList_ActionType[10]:	// magic projectile
					return [10, 0];
				case Local.OrigTextList_ActionType[11]:	// curse
					return [11, 0];
				case Local.OrigTextList_ActionType[12]:	// scare
					return [12, 0];
				case Local.OrigTextList_ActionType[13]:	// dÃ©sorientation
					return [13, 0];
				case Local.OrigTextList_ActionType[14]:	// orientation
					return [14, 0];
				case Local.OrigTextList_ActionType[15]:	// immobilisation
					return [15, 0];
				case Local.OrigTextList_ActionType[16]:	// banish
					return [16, 0];
				case Local.OrigTextList_ActionType[17]:	// heal
					return [17, 1];
				case Local.OrigTextList_ActionType[18]:	// buff
					return [18, 2];
				case Local.OrigTextList_ActionType[19]:	// summon
					return [19, 2];
				case Local.OrigTextList_ActionType[20]:	// do nothing
					return [20, 3];
				case Local.OrigTextList_ActionType[21]:	// wait
					return [21, 3];
				default:
					return [null, null];
				}
			}
		}
	});


var CSkill = DefineClass({
	extend: CKey,
	construct: function(HTMLElement)
		{
		this._Name;
		this._Href;
		this._OnClick;

		if (HTMLElement != null)
			{
			this._Name = HTMLElement.firstChild.data;
			this._Href = HTMLElement.getAttribute("href");
			this._OnClick = HTMLElement.getAttribute("onclick");
			}
		},
	methods:
		{
		compareTo: function(that) {return CompareString(this._Name, that._Name);},
		toString: function()
			{
			if (this._Name != null)
				return CreateElementHTML("a", this._Name, ["href", this._Href],
					["onclick", this._OnClick]);
			else
				return "";
			}
		}
	});


var CItem = DefineClass({
	extend: CKey,
	construct: function(HTMLElement)
		{
		this._Name;
		this._Href;
		this._OnClick;
		this._Class;

		if (HTMLElement != null)
			{
			this._Name = HTMLElement.firstChild.data;
			this._Href = HTMLElement.getAttribute("href");
			this._OnClick = HTMLElement.getAttribute("onclick");
			this._Class = HTMLElement.className;
			}
		},
	methods:
		{
		compareTo: function(that) {return CompareString(this._Name, that._Name);},
		toString: function()
			{
			if (this._Name != null)
				return CreateElementHTML("a", this._Name, ["href", this._Href],
					["onclick", this._OnClick], ["class", this._Class]);
			else
				return "";
			}
		}
	});


var CHitType = DefineClass({
	extend: CKey,
	construct: function(HitClassText)
		{
		this._nType;

		if (HitClassText != null)
			{
			this._nType = CHitType._GetHitType(HitClassText);
			if (this._nType === null)
				DbgMsg("CHitType(): Unknown type: " + HitClassText);
			}
		},
	methods:
		{
		GetType: function() {return this._nType;},
		compareTo: function(that) {return this._nType - that._nType;},
		toString: function()
			{
			if (this._nType != null)
				return Local.TextList_HitType[this._nType];
			else
				return "";
			}
		},
	statics:
		{
		_GetHitType: function(Class)
			{
			switch (Class)
				{
				case "rep_miss":
					return 0;
				case "rep_hit":
					return 1;
				case "rep_hit_good":
					return 2;
				case "rep_hit_crit":
					return 3;
				default:
					return null;
				}
			}
		}
	});


var CDamage = DefineClass({
	extend: CKey,
	construct: function(HTMLElement)
		{
		this._nBasicDmg;
		this._nActualDmg;
		this._nArmor;
		this._nType;

		if (HTMLElement != null)
			{
			var Str;
			if (HTMLElement.nodeType != 3)
				{
				Str = HTMLElement.getAttribute("onmouseover");
				// \1	basic damage
				var Patt_BasicDamage = Local.Pattern_BasicDamage;
				var result = Patt_BasicDamage.exec(Str);
				if (result == null)
					throw "CDamage() :" + Str;
				this._nBasicDmg = Number(result[1]);
				Str = HTMLElement.firstChild.data;
				}
			else
				Str = HTMLElement.data;

			// \1	actual damage
			// \2	armor
			// \3	damage type
			var Patt_Damage = Local.Pattern_Damage;
			var result = Patt_Damage.exec(Str);
			if (result == null)
				throw "CDamage() :" + Str;
			this._nActualDmg = Number(result[1]);
			this._nArmor = result[2] != null ? Number(result[2]) : 0;
			this._nType = CDamage._GetDamageType(result[3]);

			if (this._nType === null)
				DbgMsg("CDamage(): Unknown type: " + result[3]);
			if (this._nBasicDmg == null)
				this._nBasicDmg = this._nActualDmg + this._nArmor;
			}
		},
	methods:
		{
		GetType:	function() {return this._nType;},
		GetBasicDmg:	function() {return this._nBasicDmg;},
		GetArmor:	function() {return this._nArmor;},
		GetActualDmg:	function() {return this._nActualDmg;},
		IsHPDamage:	function() {return this._nType !== 11;},
		compareTo: function(that) {return this._nBasicDmg - that._nBasicDmg;},
		toString: function()
			{
			if (this._nType != null)
				{
				var Str = String(this._nBasicDmg);
				if (this._nArmor > 0)
					Str += " - " + this._nArmor + " -> " + this._nActualDmg;
				else if (this._nBasicDmg !== this._nActualDmg)
					Str += " -> " + this._nActualDmg;
				Str += " " + Local.OrigTextList_DamageType[this._nType] + " damage";
				return Str;
				}
			else
				return "";
			}
		},
	statics:
		{
		_GetDamageType: function(Text)
			{
			switch (Text)
				{
				case Local.OrigTextList_DamageType[0]:	// crushing
					return 0;
				case Local.OrigTextList_DamageType[1]:	// cutting
					return 1;
				case Local.OrigTextList_DamageType[2]:	// piercing
					return 2;
				case Local.OrigTextList_DamageType[3]:	// fire
					return 3;
				case Local.OrigTextList_DamageType[4]:	// ice
					return 4;
				case Local.OrigTextList_DamageType[5]:	// lightning
					return 5;
				case Local.OrigTextList_DamageType[6]:	// poison
					return 6;
				case Local.OrigTextList_DamageType[7]:	// acid
					return 7;
				case Local.OrigTextList_DamageType[8]:	// psychological
					return 8;
				case Local.OrigTextList_DamageType[9]:	// holy
					return 9;
				case Local.OrigTextList_DamageType[10]:	// disarm trap
					return 10;
				case Local.OrigTextList_DamageType[11]:	// mana
					return 11;
				default:
					return null;
				}
			}
		}
	});


///////////////////////////////////////////////////////////////////////////////
// Class: Value list
// Value list is a special key, it can contains any type of values, including keys

var CValueList = DefineClass({
	extend: CKey,
	construct: function()
		{
		this._gValue = [];
		this._nAvgValue;	// unsure type
		this._nMinValue;
		this._nMaxValue;
		},
	methods:
		{
		GetLength: function() {return this._gValue.length;},
		Calculate: function() {},
		push: function(Value) {return this._gValue.push(Value);},
		compareTo: function(that) {return this._nAvgValue - that._nAvgValue;},
		AvgValueStr: function() {return String(this._nAvgValue);},
		MinValueStr: function() {return String(this._nMinValue);},
		MaxValueStr: function() {return String(this._nMaxValue);},
		toString: function() {return this._gValue.join(", ");}
		}
	});


var CVLNumber = DefineClass({
	extend: CValueList,
	construct: function() {this.superclass();},
	methods:
		{
		Calculate: function()
			{
			var nTotalValue = 0, nMinValue = 999999, nMaxValue = 0;
			for (var i = 0; i < this._gValue.length; ++i) {
				nTotalValue += this._gValue[i];
				nMinValue = this._gValue[i] < nMinValue?this._gValue[i]:nMinValue;
				nMaxValue = this._gValue[i] > nMaxValue?this._gValue[i]:nMaxValue;
			}
			this._nAvgValue = Number((nTotalValue / this._gValue.length).toFixed(2));
			this._nMinValue = nMinValue;
			this._nMaxValue = nMaxValue;
			},
		MinValueStr: function()
			{
			return '<span style="color:#F84400">' + String(this._nMinValue) + '</span>';
			},
		MaxValueStr: function()
			{
			return '<span style="color:#7C3"><b>' + ((this._nMaxValue !== 0) ? String(this._nMaxValue) : '') + '</b></span>';
			}
		}
	});


// value: [Number1, Number2]
var CVLPairNumber = DefineClass({
	extend: CValueList,
	construct: function() {this.superclass();},
	methods:
		{
		Calculate: function()
			{
			var nTotalValue = [0, 0], nMinValue = [999999, 999999], nMaxValue = [0, 0];
			for (var i = 0; i < this._gValue.length; ++i)
				{
				nTotalValue[0] += this._gValue[i][0];
				nTotalValue[1] += this._gValue[i][1];
				nMinValue[0] = this._gValue[i][0] !== null && this._gValue[i][0] < nMinValue[0]?this._gValue[i][0]:nMinValue[0];
				nMinValue[1] = this._gValue[i][1] !== null && this._gValue[i][1] < nMinValue[1]?this._gValue[i][1]:nMinValue[1];
				nMaxValue[0] = this._gValue[i][0] > nMaxValue[0]?this._gValue[i][0]:nMaxValue[0];
				nMaxValue[1] = this._gValue[i][1] > nMaxValue[1]?this._gValue[i][1]:nMaxValue[1];
				}
			this._nAvgValue = new Array(2);
			this._nAvgValue[0] = Number((nTotalValue[0] / this._gValue.length).toFixed(2));
			this._nAvgValue[1] = Number((nTotalValue[1] / this._gValue.length).toFixed(2));
			
			this._nMinValue = [nMinValue[0], nMinValue[1]];
			this._nMaxValue = [nMaxValue[0], nMaxValue[1]];
			},
		compareTo: function(that)
			{
			if (this._nAvgValue[0] !== 0 || that._nAvgValue[0] !== 0)
				return this._nAvgValue[0] - that._nAvgValue[0];
			else
				return this._nAvgValue[1] - that._nAvgValue[1];
			},
		AvgValueStr: function()
			{
			return '<table class="pair_value"><tr><td>' +
				((this._nAvgValue[0] !== 0) ? String(this._nAvgValue[0]) : '') +
				'</td><td>' +
				((this._nAvgValue[1] !== 0) ? String(this._nAvgValue[1]) : '') +
				'</td></tr></table>';
			},
		MinValueStr: function()
			{
			return '<table class="pair_value"><tr><td><span style="color:#F84400">' +
				((this._nMinValue[0] !== 999999) ? String(this._nMinValue[0]) : '') +
				'</span></td><td><span style="color:#7C3"><b>' +
				((this._nMinValue[1] !== 999999) ? String(this._nMinValue[1]) : '') +
				'</b></span></td></tr></table>';
			},
		MaxValueStr: function()
			{
			return '<table class="pair_value"><tr><td><span style="color:#F84400">' +
				((this._nMaxValue[0] !== 0) ? String(this._nMaxValue[0]) : '') +
				'</span></td><td><span style="color:#7C3"><b>' +
				((this._nMaxValue[1] !== 0) ? String(this._nMaxValue[1]) : '') +
				'</b></span></td></tr></table>';
			},
		toString: function()
			{
			var Str = "";
			for (var i = 0; i < this._gValue.length; ++i)
				{
				Str += (this._gValue[i][0] != null) ? this._gValue[i][0] : 0;
				Str += "/";
				Str += (this._gValue[i][1] != null) ? this._gValue[i][1] : 0;
				if (i < this._gValue.length -1)
					Str += ", ";
				}
			return Str;
			}
		}
	});


// value: An Array of CDamage
var CVLDamage = DefineClass({
	extend: CValueList,
	construct: function() {this.superclass();},
	methods:
		{
		Calculate: function()
			{
			var nTotalValue = [0, 0], nMinValue = 9999, nMaxValue = 0;
			for (var i = 0; i < this._gValue.length; ++i)
				{
				var nGetActualDmg_temp = 0;
				for (var j = 0; j < this._gValue[i].length; ++j)
					{
					if (this._gValue[i][j].IsHPDamage())
						{
						nGetActualDmg_temp += this._gValue[i][j].GetActualDmg();
						nTotalValue[0] += this._gValue[i][j].GetBasicDmg();;
						nTotalValue[1] += this._gValue[i][j].GetActualDmg();
						}
					}
				nMinValue = nGetActualDmg_temp < nMinValue?nGetActualDmg_temp:nMinValue;
				nMaxValue = nGetActualDmg_temp > nMaxValue?nGetActualDmg_temp:nMaxValue;
				}
			this._nAvgValue = new Array(2);
			this._nAvgValue[0] = Number((nTotalValue[0] / this._gValue.length).toFixed(2));
			this._nAvgValue[1] = Number((nTotalValue[1] / this._gValue.length).toFixed(2));
			
			this._nMinValue = nMinValue;
			this._nMaxValue = nMaxValue;
			},
		compareTo: function(that) {return this._nAvgValue[1] - that._nAvgValue[1];},
		AvgValueStr: function()
			{
			return '<table class="pair_value"><tr><td>' +
				this._nAvgValue[1] + '</td><td>' +
				this._nAvgValue[0] + '</td></tr></table>';
			},
		MinValueStr: function()
			{
			return '<span style="color:#F84400">' + String(this._nMinValue) + '</span>';
			},
		MaxValueStr: function()
			{
			return '<span style="color:#7C3"><b>' + String(this._nMaxValue) + '</b></span>';
			},
		toString: function()
			{
			var Str = "";
			for (var i = 0; i < this._gValue.length; ++i)
				{
				var nTotalValue = [0, 0];
				for (var j = 0; j < this._gValue[i].length; ++j)
					{
					if (this._gValue[i][j].IsHPDamage())
						{
						nTotalValue[0] += this._gValue[i][j].GetBasicDmg();
						nTotalValue[1] += this._gValue[i][j].GetActualDmg();
						}
					}
				Str += nTotalValue[1] + "/" + nTotalValue[0];
				if (i < this._gValue.length -1)
					Str += ", ";
				}
			return Str;
			}
		}
	});


///////////////////////////////////////////////////////////////////////////////
// Class: Info list

var CInfoList = DefineClass({
	construct: function(nKeys, CValueList)
		{
		this._gInfo		= [];
		this._nKeys		= nKeys;
		this._CValueList	= CValueList;
		this._Table		= null;
		},
	methods:
		{
		_CompareKeys: function(gKeyA, gKeyB)
			{
			for (var i = 0; i < this._nKeys; ++i)
				{
				var result = gKeyA[i].compareTo( gKeyB[i] );
				if (result !== 0)
					return result;
				}
			return 0;
			},
		_SetTableBodyCellContents: function()
			{
			for (var i = 0; i < this._gInfo.length; ++i)
				{
				var gBodyCellContent = [];
				for (var j = 0; j < this._gInfo[i].gKey.length; ++j)
					gBodyCellContent.push( this._gInfo[i].gKey[j] );

				gBodyCellContent.push( this._gInfo[i].ValueList.AvgValueStr(),
					this._gInfo[i].ValueList.MinValueStr(),
					this._gInfo[i].ValueList.MaxValueStr(),
					String(this._gInfo[i].ValueList.GetLength()),
					CreateElementHTML("input", null, ["type", "button"],
						["class", "button"], ["value", Local.Text_Button_Show],
						["onclick", 'alert(&quot;' + this._gInfo[i].ValueList.toString() + '&quot;);']) );

				this._Table.SetBodyCellContents.apply(this._Table, gBodyCellContent);
				}
			},
		SaveInfo: function(Info) {},
		Show: function() {},
		// Call this function when read all data, and before sort and export data
		CalculateValue: function()
			{
			for (var i = 0; i < this._gInfo.length; ++i)
				this._gInfo[i].ValueList.Calculate();
			},
		CreateTable: function(Title, Id, gKeyName)
			{
			// Key1, Key2, ..., AverageValue, Times, ValueList
			this._Table = new CTable(Title, Id, this._nKeys + 5);

			var gHeadCellContent = new Array(this._nKeys + 5);
			for (var i = 0; i < this._nKeys; ++i)
				gHeadCellContent[i] = gKeyName[i];
			gHeadCellContent[this._nKeys] = Local.Text_Table_AvgRoll;
			gHeadCellContent[this._nKeys + 1] = Local.Text_Table_MinRoll;
			gHeadCellContent[this._nKeys + 2] = Local.Text_Table_MaxRoll;
			gHeadCellContent[this._nKeys + 3] = Local.Text_Table_Times;
			gHeadCellContent[this._nKeys + 4] = Local.Text_Table_RollList;
			this._Table.SetHeadCellContents.apply(this._Table, gHeadCellContent);

			var gBodyCellContentType = new Array(this._nKeys + 5);
			for (var i = 0; i < this._nKeys; ++i)
				gBodyCellContentType[i] = "string";
			gBodyCellContentType[this._nKeys] = "number";
			gBodyCellContentType[this._nKeys + 1] = "number";
			gBodyCellContentType[this._nKeys + 2] = "number";
			gBodyCellContentType[this._nKeys + 3] = "number";
			gBodyCellContentType[this._nKeys + 4] = "button";
			this._Table.SetBodyCellContentTypes.apply(this._Table, gBodyCellContentType);

			this._SetTableBodyCellContents();

			return this._Table.CreateHTML();
			},
		// Call this function when edited the info list (for example, re-sorted it)
		ReCreateTableHTML: function()
			{
			this._SetTableBodyCellContents();
			return this._Table.CreateHTML();
			},
		GetTableHTML: function() {return this._Table.GetHTML();},
		AddEvents: function() {if (this._Table != null) this._Table.AddEvents();},
		push: function(gKey, Value)
			{
			for (var i = 0; i < this._gInfo.length; ++i)
				{
				if (this._CompareKeys(this._gInfo[i].gKey, gKey) === 0)
					{
					this._gInfo[i].ValueList.push(Value);
					return this._gInfo.length;
					}
				}

			var ValueList = new this._CValueList();
			ValueList.push(Value);
			return this._gInfo.push(new CInfoList._CInfo(gKey, ValueList));
			},
		sort: function(gSortKeyId)
			{
			function Factory(gId) {return function(A, B){return CInfoList._CompareInfo(A, B, gId);};}
			return this._gInfo.sort(Factory(gSortKeyId));
			}
		},
	statics:
		{
		_CInfo: function(gKey, ValueList)
			{
			this.gKey = gKey;
			this.ValueList = ValueList;
			},
		// SortKeyId: Id of keys, or null
		// The list will be sorted in this way: sort them by the first key, if there are
		//   elements are still equal, then sort them by the second key, and so on.
		// If SortKeyId is null, then sort the list by value
		// If gSortKeyId is null, then sort the list by default order of keys
		_CompareInfo: function(InfoA, InfoB, gSortKeyId)
			{
			if (gSortKeyId == null)
				{
				for (var i = 0; i < InfoA.gKey.length; ++i)
					{
					var result = InfoA.gKey[i].compareTo(InfoB.gKey[i]);
					if (result !== 0) return result;
					}
				return 0;
				}
			else
				{
				for (var i = 0; i < gSortKeyId.length; ++i)
					{
					var KeyId = gSortKeyId[i];
					var result = (KeyId != null) ?
						InfoA.gKey[KeyId].compareTo(InfoB.gKey[KeyId]) :
						InfoA.ValueList.compareTo(InfoB.ValueList);
					if (result !== 0) return result;
					}
				return 0;
				}
			}
		}
	});


///////////////////////////////////////////////////////////////////////////////
// Sub classes of CInfoList
//
// var CIL_ = DefineClass({
//	extend: CInfoList,
//	construct: function(_nKeys, CValueList) {this.superclass(_nKeys, CValueList);},
//	methods:
//		{
//		_SetTableBodyCellContents: function() {},
//		SaveInfo: function(Info) {},
//		Show: function() {},
//		CreateTable: function(Title, Id, gKeyName) {}
//		}
//	});

var CILIni = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.nCurrAction === 1)
				this.push([Info.Active.Char], Info.Active.nIniRoll);
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_Ini, "stat_ini", [Local.Text_Table_Char]);
				}
			return "";
			}
		}
	});


var CILAttackRoll = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 0 && Info.Active.nAttackRoll != null)
				this.push([Info.Active.Char, Info.Active.ActionType, Info.Active.Skill, Info.Active.gItem],
					Info.Active.nAttackRoll, Info.Active.nAttackMinRoll, Info.Active.nAttackMaxRoll);
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable( Local.Text_Table_Attack, "stat_attack",
					[Local.Text_Table_Char, Local.Text_Table_AttackType, Local.Text_Table_Skill, Local.Text_Table_Item]);
				}
			return "";
			}
		}
	});


var CILDefenceRoll = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 0)
				{
				for (var i = 0; i < Info.gPassive.length; ++i)
					{
					if (Info.gPassive[i].nDefenceRoll != null)
						this.push([Info.gPassive[i].Char, Info.Active.ActionType,
							Info.gPassive[i].Skill, Info.gPassive[i].gItem], Info.gPassive[i].nDefenceRoll);
					}
				}
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_Defence, "stat_defence",
					[Local.Text_Table_Char, Local.Text_Table_DefenceType, Local.Text_Table_Skill, Local.Text_Table_Item]);
				}
			return "";
			}
		}
	});


var CILDamage = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 0)
				{
				for (var i = 0; i < Info.gPassive.length; ++i)
					{
					if (Info.gPassive[i].gDamage.length > 0)
						this.push([Info.Active.Char, Info.Active.ActionType, Info.Active.Skill, Info.Active.gItem],
							Info.gPassive[i].gDamage);
					}
				}
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_Damage, "stat_damage",
					[Local.Text_Table_Char, Local.Text_Table_AttackType, Local.Text_Table_Skill, Local.Text_Table_Item]);
				}
			return "";
			}
		}
	});


var CILHeal = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 1)
				{
				for (var i = 0; i < Info.gPassive.length; ++i)
					{
					if (Info.gPassive[i].nHealedHP != null || Info.gPassive[i].nHealedMP != null)
						this.push([Info.Active.Char, Info.Active.Skill, Info.Active.gItem],
							[Info.gPassive[i].nHealedHP, Info.gPassive[i].nHealedMP]);
					}
				}
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_Heal, "stat_heal",
					[Local.Text_Table_Char, Local.Text_Table_Skill, Local.Text_Table_Item]);
				}
			return "";
			}
		}
	});


var CILHealed = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 1)
				{
				for (var i = 0; i < Info.gPassive.length; ++i)
					{
					if (Info.gPassive[i].nHealedHP != null || Info.gPassive[i].nHealedMP != null)
						this.push([Info.gPassive[i].Char],
							[Info.gPassive[i].nHealedHP, Info.gPassive[i].nHealedMP]);
					}
				}
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_Healed, "stat_healed", [Local.Text_Table_Char]);
				}
			return "";
			}
		}
	});


var CILItemDamage = DefineClass({
	extend: CInfoList,
	construct: function(nKeys, CValueList) {this.superclass(nKeys, CValueList);},
	methods:
		{
		_SetTableBodyCellContents: function()
			{
			for (var i = 0; i < this._gInfo.length; ++i)
				{
				var gBodyCellContent = [];
				for (var j = 0; j < this._gInfo[i].gKey.length; ++j)
					gBodyCellContent.push( this._gInfo[i].gKey[j] );

				gBodyCellContent.push( this._gInfo[i].ValueList.AvgValueStr());

				this._Table.SetBodyCellContents.apply(this._Table, gBodyCellContent);
				}
			},
		SaveInfo: function(Info)
			{
			if (Info.Active.ActionType.GetKind() === 0)
				{
				for (var i = 0; i < Info.gPassive.length; ++i)
					{
					if (Info.gPassive[i].nItemDamage != null)
						this.push([Info.gPassive[i].Char, Info.gPassive[i].DamagedItem],
							Info.gPassive[i].nItemDamage);
					}
				}
			},
		Show: function()
			{
			if (this._gInfo.length > 0)
				{
				this.CalculateValue();
				this.sort();
				return this.CreateTable(Local.Text_Table_DamagedItems, "stat_item_damage",
					[Local.Text_Table_Char, Local.Text_Table_Item]);
				}
			return "";
			},
		CreateTable: function(Title, Id, gKeyName)
			{
			// Key1, Key2, ..., nDamage
			this._Table = new CTable(Title, Id, this._nKeys + 1);

			var gHeadCellContent = new Array(this._nKeys + 1);
			for (var i = 0; i < this._nKeys; ++i)
				gHeadCellContent[i] = gKeyName[i];
			gHeadCellContent[this._nKeys] = Local.Text_Table_ItemDamagePoints;
			this._Table.SetHeadCellContents.apply(this._Table, gHeadCellContent);

			var gBodyCellContentType = new Array(this._nKeys + 1);
			for (var i = 0; i < this._nKeys; ++i)
				gBodyCellContentType[i] = "string";
			gBodyCellContentType[this._nKeys] = "number";
			this._Table.SetBodyCellContentTypes.apply(this._Table, gBodyCellContentType);

			this._SetTableBodyCellContents();

			return this._Table.CreateHTML();
			},
		push: function(gKey, Value)
			{
			var ValueList = new this._CValueList();
			ValueList.push(Value);
			return this._gInfo.push(new CInfoList._CInfo(gKey, ValueList));
			}
		}
	});


// FUNCTIONS //////////////////////////////////////////////////////////////////

function CountStat(Document, bLastSubPage)
	{
	// Read the last round only when reading the last sub page
	if (!bLastSubPage) RemoveLastRound(Document);

	var Navi = new CNavi(0, 0, 0, 0);

	var allRows = Document.getElementsByTagName("tr");
	for (var i = 0; i < allRows.length; ++i)
		{
		var Info = new CActionInfo(Navi);

		var IniColumn = first_child(allRows[i]);
		GetIniInfo(IniColumn, Info);
		if (Info.Active.nIniRoll == null)	// not a initiative column
			continue;
		++Info.Navi.nRow;

		var ActiveColumn = node_after(IniColumn);
		GetActiveInfo(ActiveColumn, Info);

		switch (Info.Active.ActionType.GetKind())
			{
			case 0:		// Attack
				{
				var PassiveColumn = node_after(ActiveColumn);
				GetAttackedInfo(PassiveColumn, Info);
				break;
				}
			case 1:		// Heal
			case 2:		// Buff
				{
				var PassiveColumn = node_after(ActiveColumn);
				GetHealedBuffedInfo(PassiveColumn, Info);
				break;
				}
			case 3:		// Wait
			default:	// Unknown
				;
			}
		Stat.SaveInfo(Info);
		}
	}


function RemoveLastRound(Document)
	{
	var allRows = Document.getElementsByTagName("tr");
	for (var i = 0; i < allRows.length; ++i)
		{
		if (allRows[i].className != null &&
			allRows[i].className.indexOf("content_table_row_") === 0)
			{
			var allH1 = allRows[i].getElementsByTagName("h1");
			if (allH1[0] != null &&
				allH1[0].firstChild != null &&
				allH1[0].firstChild.nodeType == 3 &&
				allH1[0].firstChild.data == Local.OrigText_LastRound)
				{
				allRows[i].parentNode.removeChild(allRows[i]);
				break;
				}
			}
		}
	}


// return: true: it's not a initiative column, or it's a initiative column and the format is right
//         false: it's a initiative column but the format is wrong
function GetIniInfo(Node, Info)
	{
	if (Node == null || Node.className != "rep_initiative")
		return true;

	if (Node.innerHTML == "&nbsp;")
		return true;

	// \1	ini
	// \2	current action
	// \3	total actions
	var Patt_Ini = Local.Pattern_Ini;
	var result = Patt_Ini.exec(Node.innerHTML);
	if (result == null)
		{
		DbgMsgAction(Info, "IniInfo: " + Node.innerHTML);
		return false;
		}

	Info.Active.nIniRoll = Number(result[1]);
	Info.Active.nCurrAction = Number(result[2]);
	Info.Active.nTotalActions = Number(result[3]);
	return true;
	}


// return: whether the format is right
function GetActiveInfo(Node, Info)
	{
	if (Node == null)
		{
		DbgMsgAction(Info, "ActiveInfo: null");
		return false;
		}
	var nStartNode = 0;
	var Str = Node.innerHTML;

	// \1	span node
	// \2	npc Id
	var Patt_Char = Local.Pattern_Active_Char;
	var result = Patt_Char.exec(Str);
	if (result == null)
		{
		DbgMsgAction(Info, "ActiveInfo (Char): " + Node.innerHTML);
		return true;
		}
	var CharNode = result[1] != null ? Node.childNodes[nStartNode].childNodes[0] :
		Node.childNodes[nStartNode];
	Info.Active.Char = new CChar(CharNode);
	Info.Active.nCharId = result[2] != null ? Number(result[2]) : null;
	nStartNode += result[1] != null ? 1 : (result[2] != null ? 2 : 1);
	Str = Str.substring(result[0].length);

	// \1	attack
	// \2	heal or buff
	// \3	left parenthesis
	var Patt_Action1 = Local.Pattern_Active_Action1;
	result = Patt_Action1.exec(Str);
	if (result == null)
		{
		// \1	other action
		var Patt_Action2 = Local.Pattern_Active_Action2;
		result = Patt_Action2.exec(Str);
		if (result == null)
			{
			DbgMsgAction(Info, "ActiveInfo (Action2): " + Node.innerHTML);
			return false;
			}
		Info.Active.ActionType = new CActionType(result[1]);
		return true;
		}
	if (result[1] != null)
		{
		Info.Active.ActionType = new CActionType(result[1]);
		if (Info.Active.ActionType.GetKind() !== 0)
			{
			DbgMsgAction(Info, "ActiveInfo (Attack Type): " + result[1]);
			return false;
			}
		nStartNode += 1;
		Str = Str.substring(result[0].length);
		}
	else
		{
		Info.Active.ActionType = new CActionType(result[2]);
		if (Info.Active.ActionType.GetKind() !== 1 && Info.Active.ActionType.GetKind() !== 2)
			{
			DbgMsgAction(Info, "ActiveInfo (Heal/Buff Type): " + result[2]);
			return false;
			}
		Info.Active.Skill = new CSkill(Node.childNodes[nStartNode + 1]);
		if (result[3] == null)
			return true;
		nStartNode += 3;
		Str = Str.substring(result[0].length);
		}

	switch (Info.Active.ActionType.GetKind())
		{
		case 0:	// attack
			{
			// \1	single roll
			// \2	position n
			// \3	multiple roll n
			// \4	MP
			// \5	item list
			var Patt_ActtackDetails = Local.Pattern_Active_AttackDetails;
			result = Patt_ActtackDetails.exec(Str);
			if (result == null)
				{
				DbgMsgAction(Info, "ActiveInfo (ActtackDetails): " + Node.innerHTML);
				return false;
				}
			Info.Active.Skill = new CSkill(Node.childNodes[nStartNode]);
			Info.Active.nAttackRoll = Number(result[1] != null ? result[1] : result[3]);
			Info.Active.nAttackMinRoll = Number(result[1] != null ? result[1] : result[3]);
			Info.Active.nAttackMaxRoll = Number(result[1] != null ? result[1] : result[3]);
			Info.Active.nSkillMP = result[4] != null ? Number(result[4]) : null;
			if (result[5] != null)
				{
				Info.Active.gItem = new CKeyList();
				nStartNode += result[4] != null ? 4 : 2;
				var ItemNode;
				while ((ItemNode = Node.childNodes[nStartNode]) != null)
					{
					Info.Active.gItem.push(new CItem(ItemNode));
					nStartNode += 2;
					}
				}
			return true;
			}
		case 1:	// heal
		case 2:	// buff
			{
			// \1	MP
			// \2	normal item list
			// \3	magical potion
			var Patt_HealBuffDetails = Local.Pattern_Active_HealBuffDetails;
			result = Patt_HealBuffDetails.exec(Str);
			if (result == null)
				{
				DbgMsgAction(Info, "ActiveInfo (HealBuffDetails): " + Node.innerHTML);
				return false;
				}
			Info.Active.nSkillMP = result[1] != null ? Number(result[1]) : null;
			if (result[2] != null)
				{
				Info.Active.gItem = new CKeyList();
				nStartNode += result[1] != null ? 2 : 0;
				var ItemNode;
				while ((ItemNode = Node.childNodes[nStartNode]) != null)
					{
					Info.Active.gItem.push(new CItem(ItemNode));
					nStartNode += 2;
					}
				}
			else if (result[3] != null)
				{
				Info.Active.gItem = new CKeyList();
				nStartNode += result[1] != null ? 2 : 0;
				Info.Active.gItem.push(new CItem(Node.childNodes[nStartNode]));
				// nStartNode: determine by the number of reagents
				}
			return true;
			}
		default:// impossible, the value can only be 0, 1, or 2
			return false;
		}
	}


// return: whether the format is right
function GetAttackedInfo(Node, Info)
	{
	if (Node == null)
		{
		DbgMsgAction(Info, "AttackedInfo: null");
		return false;
		}
	var nStartNode = 0;
	var Str = Node.innerHTML;

	// \1	char span node
	// \2	char Id
	// \3	skill
	// \4	defence roll
	// \5	MP
	// \6	item list
	// \7	hit type
	// \8	struck down
	// \9	damage list
	// \10	item damage
	// \11	next flag
	var Patt_Attacked = Local.Pattern_Passive_Attacked;
	var bEnd = false;
	while (!bEnd)
		{
		var PassiveInfo = new CPassiveInfo();
		var result = Patt_Attacked.exec(Str);
		if (result == null)
			{
			DbgMsgAction(Info, "AttackedInfo: " + Node.innerHTML);
			return true;
			}
		var CharNode = result[1] != null ? Node.childNodes[nStartNode].childNodes[0] :	Node.childNodes[nStartNode];
		PassiveInfo.Char = new CChar(CharNode);
		PassiveInfo.nCharId = result[2] != null ? Number(result[2]) : null;
		nStartNode += result[1] != null ? 1 : (result[2] != null ? 2 : 1);
		if (result[3] != null)
			{
			PassiveInfo.Skill = new CSkill(Node.childNodes[nStartNode +1]);
			nStartNode += 2;
			}
		PassiveInfo.nDefenceRoll = Number(result[4]);
		if (result[5] != null)
			{
			PassiveInfo.nSkillMP = Number(result[5]);
			nStartNode += 2;
			}
		if (result[6] != null)
			{
			PassiveInfo.gItem = new CKeyList();
			nStartNode += 1;
			var ItemNode = Node.childNodes[nStartNode];
			while (ItemNode != null && ItemNode.nodeName == "A")
				{
				PassiveInfo.gItem.push(new CItem(ItemNode));
				nStartNode += 2;
				ItemNode = Node.childNodes[nStartNode];
				}
			}
		else
			nStartNode += 1;
		PassiveInfo.HitType = new CHitType(result[7]);
		PassiveInfo.bStruckDown = (result[8] != null);
		nStartNode += result[8] != null ? 2 : 1;
		if (result[9] != null)
			{
			PassiveInfo.gDamage = [];
			nStartNode += 1;
			var DamageNode = Node.childNodes[nStartNode];
			while (DamageNode != null && (DamageNode.nodeType == 3 ||
				(DamageNode.nodeName == "SPAN" &&
				DamageNode.firstChild != null && DamageNode.firstChild.nodeType == 3)))
				{
				PassiveInfo.gDamage.push(new CDamage(DamageNode));
				nStartNode += 2;
				DamageNode = Node.childNodes[nStartNode];
				}
			nStartNode -= 1;
			}
		if (result[10] != null)
			{
			PassiveInfo.DamagedItem = new CItem(Node.childNodes[nStartNode +1]);
			PassiveInfo.nItemDamage = Number(result[10]);
			nStartNode += 3;
			}
		if (result[11] != null)
			nStartNode += 1;
		else
			bEnd = true;

		Info.gPassive.push(PassiveInfo);
		Str = Str.substring(result[0].length);
		}
	return true;
	}


// return: whether the format is right
function GetHealedBuffedInfo(Node, Info)
	{
	if (Node == null)
		{
		DbgMsgAction(Info, "HealedBuffedInfo: null");
		return false;
		}
	var nStartNode = 0;
	var Str = Node.innerHTML;

	// \1	span node
	// \2	char Id
	// \3	self
	// \4	HP
	// \5	MP
	// \6	next flag
	var Patt_HealedBuffed = Local.Pattern_Passive_Healed_Buffed;
	var bEnd = false;
	while (!bEnd)
		{
		var PassiveInfo = new CPassiveInfo();
		var result = Patt_HealedBuffed.exec(Str);
		if (result == null)
			{
			DbgMsgAction(Info, "HealedBuffedInfo: " + Node.innerHTML);
			return true;
			}
		if (result[3] != null)
			{
			PassiveInfo.Char = Info.Active.Char;
			PassiveInfo.nCharId = Info.Active.nCharId;
			}
		else
			{
			var CharNode = result[1] != null ? Node.childNodes[nStartNode].childNodes[0] :
				Node.childNodes[nStartNode];
			PassiveInfo.Char = new CChar(CharNode);
			PassiveInfo.nCharId = result[2] != null ? Number(result[2]) : null;
			nStartNode += result[1] != null ? 1 : (result[2] != null ? 2 : 1);
			}
		PassiveInfo.nHealedHP = result[4] != null ? Number(result[4]) : null;
		PassiveInfo.nHealedMP = result[5] != null ? Number(result[5]) : null;
		nStartNode += 1;
		if (result[6] != null)
			nStartNode += 1;
		else
			bEnd = true;

		Info.gPassive.push(PassiveInfo);
		Str = Str.substring(result[0].length);
		}
	return true;
	}


function DbgMsgAction(Info, Text)
	{
	if (DEBUG)
		alert("[" + Info.Navi.nLevel + "." + Info.Navi.nRoom + "." +
			Info.Navi.nRound + "." + Info.Navi.nRow + "] " + Text);
	}


// GLOBAL VARIABLES ///////////////////////////////////////////////////////////

var DEBUG = false;

var Contents = {
	OrigText_Button_DungeonDetails	: ["details",
					   "è¯¦ç»†èµ„æ–™",
					   "Rapport",
					   "Detalles"],
	OrigText_Button_DuelDetails	: ["Details",
					   "è¯¦ç»†",
					   "DÃ©tails",
					   "Detalles"],
	OrigText_Button_DungeonStat	: ["statistics",
					   "ç»Ÿè®¡è¡¨",
					   "Statistiques",
					   "Estadística"],
	OrigText_Level			: ["Level",
					   "å±‚æ•°",
					   "Niveau",
					   "Nivel"],
	OrigText_LastRound		: ["Last round:",
					   "æœ€åŽå›žåˆ:",
					   "=Dernier tour=",
					   "Última ronda=],
	OrigTextList_ActionType		: [["attacks", "ranged attacks", "attacks with magic", "socially attacks", "cunningly attacks", "activates on", "works as a force of nature upon", "infected", "casts an explosion at", "deactivated", "magic projectile", "curse", "scare", "bannit", "heals with", "uses", "summons with", "is unable to do anything.", "looks around in boredom and waits."],
					   ["è¿‘æˆ˜æ”»å‡»", "è¿œç¨‹æ”»å‡»", "é­”æ³•æ”»å‡»", "å¿ƒç†æ”»å‡»", "å·è¢­", "è§¦å‘", "åšä¸ºè‡ªç„¶ç¾å®³", "æ•£å¸ƒ", "åˆ¶é€ çˆ†ç‚¸", "è§£é™¤", "é­”æ³•æŠ•å°„", "è¯…å’’", "æå“", "æ²»ç–—", "ä½¿ç”¨", "å¬å”¤", "ä¸èƒ½æ‰§è¡Œä»»ä½•åŠ¨ä½œ.", "æ— èŠçš„æ‰“é‡å››å‘¨ï¼Œç­‰å¾…ç€.", "bannit"],
					   ["frappe avec", "tire avec", "incante", "dÃ©stabilise avec", "s'embusque", "se dÃ©clenche avec", "lance une force de la nature", "infecte", "produit une explosion sur", "dÃ©samorce", "PROJECTILE MAGIC", "MALEDICTION", "terrorise", "dÃ©soriente avec", "cherche une solution avec", "lance", "bannit", "soigne avec", "agit", "invoque avec", "ne peut rien faire.", "s'ennuie et attend la suite."],
					   ["ataca en lucha cuerpo a cuerpo", "ataca en lucha a distancia", "ataca con magia", "ataca socialmente", "ataca astútamente", "efectúa", "efectúa fuerza natural a", "infecta con", "provoca una explosión contra", "intenta desactivar", "magic projectile", "maldice", "asusta", "conjura", "cura con", "usa", "llama mediante", "no puede hacer nada.","mira aburrido en el alrededor y espera."]],
	OrigTextList_DamageType		: [["crushing damage", "cutting damage", "piercing damage", "fire damage", "ice damage", "lightning damage", "poison damage", "acid damage", "psychological damage", "holy damage", "disarm trap", "mana damage"],
					   ["ç²‰ç¢Žä¼¤å®³", "åˆ‡å‰²ä¼¤å®³", "ç©¿åˆºä¼¤å®³", "ç«ç„°ä¼¤å®³", "å¯’å†°ä¼¤å®³", "é—ªç”µä¼¤å®³", "æ¯’ç´ ä¼¤å®³", "é…¸æ€§ä¼¤å®³", "å¿ƒçµä¼¤å®³", "ç¥žåœ£ä¼¤å®³", "é™·é˜±ä¼¤å®³", "æ³•åŠ›ä¼¤å®³"],
					   ["dÃ©gÃ¢ts contondants", "dÃ©gÃ¢ts tranchants", "dÃ©gÃ¢ts perforants", "dÃ©gÃ¢ts de feu", "dÃ©gÃ¢ts de glace", "dÃ©gÃ¢ts Ã©lectriques", "dÃ©gÃ¢ts de poison", "dÃ©gÃ¢ts d'acide", "dÃ©gÃ¢ts psychologiques", "dÃ©gÃ¢ts saints", "dÃ©gÃ¢ts de dÃ©samorÃ§age", "dÃ©gÃ¢ts de mana"],
					   ["Daño de aplastamiento", "Daño cortante", "Daño punzante", "Daño de fuego", "Daño de hielo", "Daño de relámpago", "Daño de veneno", "Daño de ácido", "Daño psicológico", "Daño santo", "Desactivar trampa", "Daño de mana"]],
	Pattern_Ini			: [/^Initiative ([\d]+)<br><span .*?>Action ([\d]+) of ([\d]+)<\/span>$/,
					   /^å…ˆæ”»([\d]+)<br><span .*?>ç¬¬([\d]+) æ­¥è¡ŒåŠ¨\/ å…±([\d]+)æ­¥<\/span>$/,
					   /^Initiative ([\d]+)<br><span .*?>Action ([\d]+) de ([\d]+)<\/span>$/],
					   /^Iniciativa ([\d]+)<br><span .*?>Acción ([\d]+) de ([\d]+)<\/span>$/],
	Pattern_Active_Char		: [/^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?/,
					   /^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?/,
					   /^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?/,
					   /^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?/],
	Pattern_Active_Action1		: [/^\s*(?:([A-Za-z][A-Za-z ]+[A-Za-z]) +\(|([A-Za-z][A-Za-z ]+[A-Za-z]) +<a .*?>.*?<\/a>(?:( \()|$| on $))/,
					   /^\s*(?:([^\u0000-\u007F]+) +\(|([^\u0000-\u007F]+)<a .*?>.*?<\/a>(?:( \()|$|ç»™$))/,
					   /^\s*(?:([A-Za-z][A-Za-z 'Ã©Ã¨ÃªÃ®Ã¯Ã¢Ã Ã´Ã¶Ã»Ã¹]+[A-Za-zÃ©Ã¨Ã ]) +\(|([A-Za-z][A-Za-z 'Ã©Ã¨ÃªÃ®Ã¯Ã¢Ã Ã´Ã¶Ã»Ã¹]+[A-Za-zÃ©Ã¨Ã ]) +<a .*?>.*?<\/a>(?:( \()|$| sur $))/,
					   /^\s*(?:([A-Za-z][A-Za-z ]+[A-Za-z]) +\(|([A-Za-z][A-Za-z ]+[A-Za-z]) +<a .*?>.*?<\/a>(?:( \()|$| on $))/],
	Pattern_Active_Action2		: [/^\s*([\S].*[\S])\s*$/,
					   /^\s*([\S].*[\S])\s*$/,
					   /^\s*([\S].*[\S])\s*$/,
					   /^\s*([\S].*[\S])\s*$/],
	Pattern_Active_AttackDetails	: [/^<a .*?>.*?<\/a>(?:\/([\d]+)|(?:\/([A-Za-z ]+): ([\d]+))+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\)$/,
					   /^<a .*?>.*?<\/a>(?:\/([\d]+)|(?:\/([^\u0000-\u007F]+): ([\d]+))+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\)$/,
					   /^<a .*?>.*?<\/a>(?:\/([\d]+)|(?:\/([A-Za-z 'Ã©Ã¨ÃªÃ®Ã¯Ã¢Ã Ã´Ã¶Ã»Ã¹]+): ([\d]+))+)(?:\/<span .*?>([\d]+) PM<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\)$/,
					   /^<a .*?>.*?<\/a>(?:\/([\d]+)|(?:\/([A-Za-z ]+): ([\d]+))+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\)$/],
	Pattern_Active_HealBuffDetails	: [/^(?:<span .*?>([\d]+) MP<\/span>)?(?:\/)?(?:((<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)|(<a .*?>.*?<\/a>\s+(?:<img .*?>)+))?\)(?: on )?$/,
					   /^(?:<span .*?>([\d]+) MP<\/span>)?(?:\/)?(?:((<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)|(<a .*?>.*?<\/a>\s+(?:<img .*?>)+))?\)(?:ç»™)?$/,
					   /^(?:<span .*?>([\d]+) PM<\/span>)?(?:\/)?(?:((<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)|(<a .*?>.*?<\/a>\s+(?:<img .*?>)+))?\)(?: sur )?$/,
					   /^(?:<span .*?>([\d]+) PM<\/span>)?(?:\/)?(?:((<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)|(<a .*?>.*?<\/a>\s+(?:<img .*?>)+))?\)(?: en )?$/],
	Pattern_Passive_Attacked	: [/^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s*\((<a .*?>.*?<\/a>\/)?([\d]+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\): <span class="([A-Za-z_]+)">[A-Za-z ]+<\/span>( - [A-Za-z ]+)?(<br>(?:<span .*?>)?(?:-)?[\d]+ (?:\[(?:\+|-)[\d]+\] )?[A-Za-z ]+(?:<img .*?><\/span>)?)*(?:<br><a .*?>.*?<\/a> -([\d]+) HP)?(?:(<br>)|$)/,
					   /^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s*\((<a .*?>.*?<\/a>\/)?([\d]+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\): <span class="([A-Za-z_]+)">[^\u0000-\u007F]+<\/span>( - [^\u0000-\u007F]+ *)?(<br>(?:<span .*?>)?(?:-)?[\d]+ (?:\[(?:\+|-)[\d]+\] )?[^\u0000-\u007F]+(?:<img .*?><\/span>)?)*(?:<br><a .*?>.*?<\/a> -([\d]+) HP)?(?:(<br>)|$)/,
					   /^(<span [^>]*>)?<a [^>]*>[^<]*<\/a>\s*(?:<span [^>]*>([\d]+)<\/span>)?\s*(?:<img [^>]*><\/span>)?\s*\((<a [^>]*>[^<]*<\/a>\/)?([\d]+)(?:\/<span .*?>([\d]+) PM<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a [^>]*>[^<]*<\/a>)?\):\s*<span class="([A-Za-z_]+)">[^<]*<\/span>( - [^<]+)?(<br>(?:<span [^>]*>)?(?:-)?[\d]+\s*(?:\[(?:\+|-)[\d]+\]\s*)?[^<]*(?:<img [^>]*><\/span>)?)*(?:<br><a\s*[^>]*>.*<\/a>\s*-([\d]+)\s*PV)?(?:(<br>)|$)/,
					   /^(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s*\((<a .*?>.*?<\/a>\/)?([\d]+)(?:\/<span .*?>([\d]+) MP<\/span>)?(\/(?:<a .*?>.*?<\/a>,)*<a .*?>.*?<\/a>)?\): <span class="([A-Za-z_]+)">[A-Za-z ]+<\/span>( - [A-Za-z ]+)?(<br>(?:<span .*?>)?(?:-)?[\d]+ (?:\[(?:\+|-)[\d]+\] )?[A-Za-z ]+(?:<img .*?><\/span>)?)*(?:<br><a .*?>.*?<\/a> -([\d]+) HP)?(?:(<br>)|$)/],
	Pattern_BasicDamage		: [/causa: <b>([\d]+)<\/b>/,
					   /é€ æˆ: <b>([\d]+)<\/b>/,
					   /cause: <b>([\d]+)<\/b>/,
					   /causa: <b>([\d]+)<\/b>/],
	Pattern_Damage			: [/^((?:-)?[\d]+) (?:\[((?:\+|-)[\d]+)\] )?([A-Za-z][A-Za-z ]+[A-Za-z])$/,
					   /^((?:-)?[\d]+) (?:\[((?:\+|-)[\d]+)\] )?([^\u0000-\u007F]+)$/,
					   /^((?:-)?[\d]+) (?:\[((?:\+|-)[\d]+)\] )?(.*)$/,
					   /^((?:-)?[\d]+) (?:\[((?:\+|-)[\d]+)\] )?([A-Za-z][A-Za-z ]+[A-Za-z])$/],
	Pattern_Passive_Healed_Buffed	: [/^(?:(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s+|(themselves))(?: \+([\d]+) HP)?(?: \+([\d]+) MP)?(?:(<br>)|$)/,
					   /^(?:(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s+|(è‡ªå·±))(?: \+([\d]+) HP)?(?: \+([\d]+) MP)?(?:(<br>)|$)/,
					   /^(?:(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s+|(soi-mÃªme))(?: \+([\d]+) PV)?(?: \+([\d]+) PM)?(?:(<br>)|$)/,
					   /^(?:(<span .*?>)?<a .*?>.*?<\/a>(?:<span .*?>([\d]+)<\/span>)?(?:<img .*?><\/span>)?\s+|(a si mismos))(?: \+([\d]+) PV)?(?: \+([\d]+) PM)?(?:(<br>)|$)/],					   
	Text_Button_ExtraStat		: ["Extra Stat",
					   "é¢å¤–ç»Ÿè®¡",
					   "Statistiques SupplÃ©mentaires",
					   "Estadísticas suplementarias"],
	Text_Button_EntireStat		: ["Entire Extra Stat",
					   "å…¨åŸŽé¢å¤–ç»Ÿè®¡",
					   "Toutes les Statistiques",
					   "Todas las estadísticas"]
	Text_Button_Show		: ["Show",
					   "æ˜¾ç¤º",
					   "Montrer",
					   "Mostrar"],
	Text_Button_Default		: ["Default",
					   "é»˜è®¤",
					   "Reset",
					   "Reset"],
	TextList_AttackType		: [["melee", "ranged", "spell", "social", "ambush", "trap", "nature", "disease", "detonate", "disarm trap", "magic projectile", "curse", "scare"],
					   ["è¿‘æˆ˜", "è¿œç¨‹", "é­”æ³•", "å¿ƒç†", "å·è¢­", "é™·é˜±", "è‡ªç„¶", "ç–¾ç—…", "çˆ†ç ´", "è§£é™¤é™·é˜±", "é­”æ³•æŠ•å°„", "è¯…å’’", "æå“"],
					   ["Combat rapprochÃ©", "Combat Ã  distance", "SortilÃ¨ge", "Social", "Embuscade", "DÃ©clenchement", "Force de la nature", "Maladie", "Explosion", "DÃ©sactivation", "Projectile Magique", "MalÃ©diction", "Effroi", "DÃ©sorientation", "Orientation", "Immobilisation", "Bannissement"],
    				   ["Cuerpo a cuerpo", "A distancia", "Hechizo", "Social", "Emboscada", "Fuerza natural", "Enfermedad", "Explosión", "Proyectil mágico", "Maldición", "Miedo", "Expulsión"]],
	TextList_HitType		: [["failed", "success", "good success", "critical success"],
					   ["é—ªé¿", "æ™®é€š", "é‡å‡»", "è‡´å‘½ä¸€å‡»"],
					   ["Ã©chec", "succÃ¨s", "succÃ¨s complet", "succÃ¨s critique"],
					   ["Fracaso", "Éxito", "Éxito bueno", "Éxito crítico"]],

	Text_Loading			: ["Loading",
					   "è½½å…¥ä¸­",
					   "Chargement",
					   "Cargando"]
	Text_Options			: ["Options:",
					   "é€‰é¡¹:",
					   "Options :",
					   "opciones:"],
	Text_DefaultMsg			: ["All the data this script stored in your machine has been cleared.",
					   "æ­¤è„šæœ¬å‚¨å­˜åœ¨ä½ çš„æœºå™¨ä¸Šçš„æ‰€æœ‰æ•°æ®å·²è¢«æ¸…é™¤ã€‚",
					   "Toutes les donnÃ©es que ce script a enregistrÃ© sur votre ordinateur ont Ã©tÃ© effacÃ©es.",
					   "Todos los datos almacenados por este script en tu equipo han sido eliminados."],
	Text_Table_Ini			: ["Initiative",
					   "å…ˆæ”»æƒ",
					   "Initiative",
					   "Iniciativa"],
	Text_Table_Attack		: ["Attack",
					   "æ”»å‡»éª°",
					   "Attaque",
					   "Ataque"],
	Text_Table_Defence		: ["Defence",
					   "é˜²å¾¡éª°",
					   "Parade",
					   "Parada"],
	Text_Table_Damage		: ["Damage",
					   "ä¼¤å®³",
					   "DÃ©gÃ¢ts",
					   "Daño"],
	Text_Table_Heal			: ["Healing By The Hero",
					   "ç»™äºˆæ²»ç–—",
					   "Soin Par le hÃ©ros",
					   "Curado por el Héroe"],
	Text_Table_Healed		: ["Healing On The Hero",
					   "æŽ¥å—æ²»ç–—",
					   "Soin Sur le hÃ©ros",
					   "Curado al Héroe"],
	Text_Table_DamagedItems		: ["Damaged Items",
					   "ç‰©å“æŸå",
					   "Objets EndomagÃ©s",
					   "objetos dañados"],
	Text_Table_Char			: ["Character",
					   "äººç‰©",
					   "Personnage"
					   "Personaje"],
	Text_Table_AttackType		: ["Attack type",
					   "æ”»å‡»ç±»åž‹",
					   "Type d'attaque",
					   "Tipo de ataque"],
	Text_Table_DefenceType		: ["Defence type",
					   "é˜²å¾¡ç±»åž‹",
					   "Type de dÃ©fense",
					   "Tipo de defensa"],
	Text_Table_Skill		: ["Skill",
					   "æŠ€èƒ½",
					   "CompÃ©tence",
					   "Habilidad"],
	Text_Table_Item			: ["Item",
					   "ç‰©å“",
					   "Objet",
					   "Objeto"],
	Text_Table_AvgRoll		: ["Average roll",
					   "å¹³å‡å€¼",
					   "Jet moyen",
					   "Tirada media"],
    Text_Table_MinRoll		: ["Min roll",
        					   "å¹³å‡å€¼",
        					   "Min",
							   "Mínima"],
    Text_Table_MaxRoll		: ["Max roll",
        					   "å¹³å‡å€¼",
        					   "Max",
							   "Máxima"],
	Text_Table_Times		: ["Times",
					   "æ¬¡æ•°",
					   "Nombre",
					   "Número"],
	Text_Table_RollList		: ["Roll list",
					   "æ•°å€¼åˆ—è¡¨",
					   "Liste des jets",
					   "Lista de tiradas"],
	Text_Table_ItemDamagePoints	: ["Damage Points",
					   "æŸåç‚¹æ•°",
					   "Points de dÃ©gÃ¢ts",
					   "Puntos de daño"]
	};

var Style = "div.stat_header {margin:1em auto 0.5em auto;} " +
	"span.stat_title {margin: auto 1em auto 0em; font-size:20px; font-weight:bold; color:#FFF;} span.clickable {cursor:pointer;} " +
	"table[hide] {display:none;} " +
	"table.pair_value {width:100%;} table.pair_value td {width:50%; min-width:3em; text-align:right; color:#F8A400;} table.pair_value td + td {color:#00CC00;} ";

var Local;
var Stat;

try {Main();} catch(e) {alert("Main(): " + e);}


// FUNCTIONS //////////////////////////////////////////////////////////////////

function Main()
	{
	// Language selection
	//alert("2");
	Local = GetLocalContents(Contents);
	if (Local === null) return;

	// Add CSS
	GM_addStyle(Style);

	// Add buttons
	var KeyButton = AddButtonBesideDisabledButton(
		[Local.OrigText_Button_DungeonDetails, Local.Text_Button_ExtraStat, OnCountStat],
		[Local.OrigText_Button_DungeonStat, Local.Text_Button_EntireStat, OnCountEntireStat],
		[Local.OrigText_Button_DuelDetails, Local.Text_Button_ExtraStat, OnCountStat]);
	if (KeyButton === null) return;

	// Stat initialization
	Stat = new CStat( node_after(KeyButton.parentNode) );
	Stat.RegInfoList(new CILIni(		1, CVLNumber));
	Stat.RegInfoList(new CILAttackRoll(	4, CVLNumber));
	Stat.RegInfoList(new CILDefenceRoll(4, CVLNumber));
	Stat.RegInfoList(new CILDamage(		4, CVLDamage));
	Stat.RegInfoList(new CILHeal(		3, CVLPairNumber));
	Stat.RegInfoList(new CILHealed(		1, CVLPairNumber));
	Stat.RegInfoList(new CILItemDamage(	2, CVLNumber));
	}


// It will only add the first eligible button
// return: the node of the first eligible disabled button, or null if didn't find anyone
function AddButtonBesideDisabledButton(/* [DisabledButtonText, ButtonText, ClickEvent], [...], ... */)
	{
	var allInputs = document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; ++i)
		{
		if (allInputs[i].className == "button_disabled")
			{
			for (var j = 0; j < arguments.length; ++j)
				{
				if (allInputs[i].getAttribute("value") == arguments[j][0])
					{
					AddButton(allInputs[i], arguments[j][1], arguments[j][2]);
					return allInputs[i];
					}
				}
			}
		}
	return null;
	}


// Add a button to the end of the given node's parent node
function AddButton(SiblingNode, Value, OnClick)
	{
	var newButton = document.createElement("input");
	newButton.setAttribute("type", "button");
	newButton.setAttribute("class", "button");
	newButton.setAttribute("value", Value);
	newButton.addEventListener("click", OnClick, false);
	var newBlank = document.createTextNode("            ");
	SiblingNode.parentNode.appendChild(newBlank);
	SiblingNode.parentNode.appendChild(newButton);
	}


function OnCountStat()
	{
	try	{
		if (this.className == "button_disabled")
			return;
		else
			this.className = "button_disabled";

		Stat.nTotalPages = 1;
		ReadPage(document, true);
		}
	catch (e) {alert("OnCountStat(): " + e);}
	}


function OnCountEntireStat()
	{
	try	{
		if (this.className == "button_disabled")
			return;
		else
			this.className = "button_disabled";

		CountEntireStat();
		}
	catch (e) {alert("OnCountEntireStat(): " + e);}
	}


function CountEntireStat()
	{
	var nCurrRepId = GetHiddenInfo(document, "report_id[0]", "");
	var nMaxLevel = Stat.nTotalPages = GetStatPageMaxLevel(document, 1);

	for (var CurrLevel = 1; CurrLevel <= nMaxLevel; ++CurrLevel)
		GetPage(nCurrRepId, CurrLevel, 1, true);

	Stat.ShowProgress();
	}


function GetPage(nRepId, nLevel, nRepPage, bFirstRead)
	{
	var XmlHttp = new XMLHttpRequest();

	XmlHttp.onreadystatechange = function ()
		{
		try	{
			if (XmlHttp.readyState == 4 && XmlHttp.status == 200)
				{
				var Page = document.createElement("div");
				Page.innerHTML = XmlHttp.responseText;
				ReadPage(Page, bFirstRead);
				}
			}
		catch (e) {alert("XMLHttpRequest.onreadystatechange(): " + e);}
		};

	var URL = location.protocol + "//" + location.host + "/wod/spiel/dungeon/report.php" +
		"?cur_rep_id=" + nRepId +
		"&gruppe_id=&current_level=" + nLevel +
		"&REPORT_PAGE=" + nRepPage +
		"&IS_POPUP=1";

	XmlHttp.open("GET", URL, true);
	XmlHttp.send(null);
	}


function ReadPage(Document, bFirstRead)
	{
	var ret = GetRepPageInfo(Document, [1, 1]);
	var nCurrRepPage = ret[0];
	var nMaxRepPage = ret[1];

	if (bFirstRead && nMaxRepPage > 1)
		{
		var nRepId = GetHiddenInfo(Document, "report_id[0]", "");
		var nLevel = GetHiddenInfo(Document, "current_level", 1);

		Stat.nTotalPages += nMaxRepPage -1;
		for (var i = 1; i <= nMaxRepPage; ++i)
			{
			if (i !== nCurrRepPage)
				GetPage(nRepId, nLevel, i, false);
			}
		}

	CountStat(Document, (nCurrRepPage === nMaxRepPage));
	if (++Stat.nReadPages >= Stat.nTotalPages)
		Stat.Show();
	else
		Stat.ShowProgress();
	}


function GetHiddenInfo(Document, InfoName, DefaultValue)
	{
	var allInputs = Document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; ++i)
		{
		if (allInputs[i].getAttribute("type") == "hidden" &&
			allInputs[i].name == InfoName)
			return allInputs[i].value;
		}
	return DefaultValue;
	}


function GetStatPageMaxLevel(Document, DefaultValue)
	{
	var allTds = Document.getElementsByTagName("td");
	for (var i = 0; i < allTds.length; ++i)
		{
		if (first_child(allTds[i].parentNode) != allTds[i])
			continue;
		var LevelNode = first_child(allTds[i]);
		if (LevelNode != null && LevelNode.nodeType == 3 && LevelNode.data == Local.OrigText_Level)
			{
			var Patt_Level = /^(?:<span .*?>)?(?:[\d]+)\/([\d]+)(?:<\/span>)?$/;
			var result = Patt_Level.exec(node_after(allTds[i]).innerHTML);
			if (result == null) return DefaultValue;
			return Number(result[1]);
			}
		}
	return DefaultValue;
	}


// return: an array, [0]: nCurrRepPage, [1]: nMaxRepPage
function GetRepPageInfo(Document, DefaultValue)
	{
	var ret = [DefaultValue[0], DefaultValue[1]];

	var SubPageIndexNode;
	var allInputs = Document.getElementsByTagName("input");
	for (var i = 0; i < allInputs.length; ++i)
		{
		if (allInputs[i].value.indexOf("=1=") !== -1)
			{
			SubPageIndexNode = allInputs[i];
			break;
			}
		}
	if (SubPageIndexNode == null)
		return ret;

	var bIndexEnd = false;
	while (!bIndexEnd)
		{
		var IndexPatt = /=([\d]+)=/;
		var Result = IndexPatt.exec(SubPageIndexNode.value);
		var nCurrIndex = Number(Result[1]);

		if (SubPageIndexNode.className == "paginator_selected clickable")
			ret[0] = nCurrIndex;

		SubPageIndexNode = node_after(node_after(SubPageIndexNode));
		if (SubPageIndexNode == null || SubPageIndexNode.nodeName != "INPUT")
			{
			ret[1] = nCurrIndex;
			bIndexEnd = true;
			}
		}

	return ret;
	}
