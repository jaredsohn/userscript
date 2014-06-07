// ==UserScript==
// @name           english babelfish
// @namespace      babelfish.yahoo.com
// @description    leave only english related options from the select box
// @include        http://babelfish.yahoo.com/*
// @date           2009-02-10
// @version        0.1
// ==/UserScript==

function deleteOption(selectObject,optionRank)
{
    if (selectObject.options.length!=0) { selectObject.options[optionRank]=null }
}

function main() {
	for(var j = 0; j < 2; j++)
	{
		var elmSelect = document.getElementsByName('lp')[j];
		for(var i = 1; i < elmSelect.options.length; i++)
		{
			if(elmSelect.options[i].value.indexOf("en") == -1)
			{
				deleteOption(elmSelect, i);
				i--;
			}
		}
	}
}

main();
