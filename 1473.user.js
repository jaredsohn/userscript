// http://XIXs.com/GreaseMonkey/LJ_Comic_Sniffer.user.js
// version 2005-07-20
// (K) Kriss Daniels ( http://XIXs.com ) All Rites Reversed
//
// -><-
//
// This is a Grease Monkey user script.
//
// http://greasemonkey.mozdev.org/
//
// If you are reading this in firefox and have grease monkey installed
// then you should now be able to select "Install User Script..." from the
// tools menu.
//
// -><-
//
// ==UserScript==
// @name          LJ Comic Sniffer
// @description   Add images to LJ comic syndication feeds that do not contain images. Works with pennyarcadefeed and littlegamersrss
// @include       http://*.livejournal.com/*
// ==/UserScript==


// find all syndication links

var allLinks, thisLink, sublink , clink, clink_href , insert;

var base,substr,year,month,day,num;

allLinks = document.evaluate(	"//p[@class='ljsyndicationlink']",	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

//GM_log('searching');

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

// find usefull information

	clink=thisLink.getElementsByTagName('a')[0];
	if(clink)
	{
		clink_href=clink.href;
	}

// change pennyarcadefeed

	base="http://www.penny-arcade.com/view.php?date=";
	if( clink_href.substring(0,base.length)==base )
	{
		substr=clink_href.substring(base.length,clink_href.length);

		year=substr.substring(0,4);
		month=substr.substring(5,7);
		day=substr.substring(8,10);

		insert = document.createElement('img');
		insert.setAttribute('src','http://www.penny-arcade.com/images/'
						+ year + '/'
						+ year
						+ month
						+ day
						+'l.jpg');
		thisLink.parentNode.insertBefore(insert, thisLink.nextSibling);
	}

// change littlegamersrss

	base="http://www.little-gamers.com/index.php?comicID=";
	if( clink_href.substring(0,base.length)==base )
	{
		num=parseInt(clink_href.substring(base.length,clink_href.length));

// I don't know if its going to be a .jpg or a .gif so add both,
// one will be a duff link but this is simple and it works

		insert = document.createElement('img');
		insert.setAttribute('src','http://www.little-gamers.com/comics/'
					+ ('00000000'.substring(0,8-(num+'').length)) + num
					+ '.jpg');
		thisLink.parentNode.insertBefore(insert, thisLink.nextSibling);

		insert = document.createElement('img');
		insert.setAttribute('src','http://www.little-gamers.com/comics/'
					+ ('00000000'.substring(0,8-(num+'').length)) + num
					+ '.gif');
		thisLink.parentNode.insertBefore(insert, thisLink.nextSibling);
	}
}

