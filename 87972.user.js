// ==UserScript==
// @name           SEextramods
// @version        1.0.0
// @namespace      http://sensibleerection.com/
// @description    Adds extra post mods to comments.
// @include        http://sensibleerection.com/comment.php/*
// @include        http://*.sensibleerection.com/comment.php/*
// ==/UserScript==



(function()
{
	mods = [
	  'no vote',
	  '+1 Good',
		'+1 Insightful',
		'+1 WTF',
		'+1 Interesting',
		'+1 Original',
		'+1 Underrated',
		'+1 Funny',
		'+1 Informative',
		'-1 Wrong Category',
		'-1 Old',
		'-1 Bad',
		'-1 WTF',
		'-1 Troll',
		'-1 Repost',
		'-1 Boring',
		'-1 Overrated',
		'-1 Flamebate',
		'-1 Unworthy Self Link',
		'-1 Bad Pr0n',
		'+1 Hot Pr0n',
		'-1 Illegal Pr0n',
		'+1 Classy Pr0n'
	];
	values = [null, 17, 1, 20, 16, 5, 4, 3, 2, 22, 18, 19, 21, 9, 6, 23, 7, 10, 8,
	          14, 12, 15, 13];

	select = document.getElementById('mod_type_id');
	while(select.childNodes.length >= 1)
		select.removeChild(select.firstChild);
	for(var i = 0; i < mods.length; i++)
	{
		var option = document.createElement('option');
		option.setAttribute('value', values[i]);
		option.appendChild(document.createTextNode(mods[i]));
		select.appendChild(option);
	}
	
}());
