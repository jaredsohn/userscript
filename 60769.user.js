// Sum all my loot Main file

this.metadata = new Object();

this.metadata.innerTEXT = <><![CDATA[
// ==UserScript==
// @name			Sum all my loot
// @namespace		SumAML
// @version		1.2.18
// @description		Sum all my loot - Imperion
 
// @include		http://*.imperion.*/*
// @exclude		http://forum.imperion.*/*
// @exclude		http://wiki.imperion.*/*
// @exclude		http://portal.imperion.*/*
// @exclude		http://*.imperion.*/login/*
// @exclude		http://*.imperion.*/supportExternal/*
 
// @copyright		2009 Johnny & Mishu (http://github.com/b01eru84/SumAllMyLoot---Imperion---Script)
// @author			Johnny
// @author			Mishu
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_MainClass.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Utils.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Updater.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_FleetBase.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_ResearchCenter.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Alliance.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Recycle.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_MainScreen.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Market.js
// @require		http://github.com/b01eru84/SumAllMyLoot---Imperion---Script/raw/master/SAML_Reports.js
// ==/UserScript==
]]></>+"";

this.metadata.toArray = metadata.innerTEXT.split('\n');

this.metadata.setting = function (name){
	for (var i=0;i < metadata.toArray.length; i++){
		var myReg = new RegExp('\\b' + name + '\\b');
		if (metadata.toArray[i].match(myReg)){
			return metadata.toArray[i].split('@'+name)[1].trim();
		}
	}
};

/*****************************************************************************
 * Copyright (C) 2009 Johnny & Mishu
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/
