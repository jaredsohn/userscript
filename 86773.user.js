// ==UserScript==
// @name           ImageFap Direct One Page View
// @version        1.0.4
// @namespace      http://userscripts.org/users/225507
// @homepageURL    http://userscripts.org/scripts/show/86773
// @description    Always go directly to the "One Page" view of a gallery
// @author         GSV Ethics Gradient <ethics.gradient.gsv@gmail.com>
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAAB3RJTUUH2goMFQIqjHf4PwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAARnQU1BAACxjwv8YQUAAAVDSURBVHja7ZhdTJNXGMfLhwMHCAEyC8VRZxcbw7TOOIgSrYRoE414IRmZmGHkwgtjvJgLJjVpE1zIsgsucEKCExNCJJLJBYklQ3EOEjIhwNYtuMEGg2gxsAFBPja27kePO5QW6Ictw8Qnp2+envec5/zP85zzf855FYo1JiH87HZ7AAyFmAOBxxQejFmmpsZWVh6dnPxzbu6fxMTXKdHRr4lXNttkf/+YKE1Nv/T1/eHSdxGg1tZBo/EeTdHHxmYo8y3CQ1NSNmBRmuZvZGS4Wh2n16tVqhh3QEbjvuzst5bESq+MjBT5t6vLVlTU1NjYtzSg8vL2+/f7XUwwSwHRXYA1MvJxVNQ6l3qNJt5LX+p0yuLirGUBFRa+a7H0joxMeR8d4uIOyFmIEZPEEyJY1Ah/4yeDQYPLq6q6lg3Z/v2pNttH7e2PCRNNRWVb21BeXh3K8ePbzp/PsFqfYppozszMUbNxY9QKaOhYW/vDkq8qKjp40n14+NmygJCwsJD0dJVzDfiEAsS9ezdRPLptaGhCumflli5okFBvgiIUpTLaY2MhLDsvW7qLZ0CrLJ4BLbfF/jdAUrwP2YuIZ6aWawjW8WOArVsT2OGUzMw3JV8Ls6WlbdeudfoMyCdaEgIdC6Wh4QNnEC4CJboD8iFkfnhoBTQKR2Jwr/Q8huQS/9YQFAq1igKXOpt99GjUH0DOVnyVgoL6Gze6feoSXB7ygzI8AyIXCkUmhKCKZ0AkWqG8SEIIJKBVFh9CtlYAyZCtFUCrLJ4BydQhz5BBFR+Sq8wDAwPjCkcmWfn8GgBAo6PTZWXfwvHwvcgYPCVT6/VVLp0LCnTXr+cEERCXsiUT3nLChcFk0nMtdKkXFzpnxXtZtIa43cXFRXo7lfBQPOSORuFI4/iV209397CvgIJ1t4+NjRgfn/XdjClY294vNGtSAhaywKAJCXkJmXqVZREPsRLZqzCyXq/mkt/R8WTXriT5FtpMSFjf2NgHd1M4Ymu1iXLb3737K6wDcbC/RM3s7N88IyLCnIfASHv7Y65EUVHrpCkOFGlpbyzwvt0hDQ0/xcWV6HTl0dGf8HQcx0xQn/0/MRiqOzufUAlli5Kf/6V4xVE1MrI4M/MLLMD1ohKalboQLmI00GrLeNbWWukiTXH6XljKaKQIGrW0/IYOFKXyM1xFTVra51brU2GObnfu/Awgu5sASK0uRaFXYuKnKL29v6MAUbapq/uRKeFFoV+9+lB0cZaFkMGteFt8aiFYuJQxYO3KyqNnzjRYLPniq9TExDy7yIsE+f/w4beFjucrKjpu3rQaDBr+4gyjcV9JScvw8DNiQfhwWFtbIc3q63tokJQUg+5u6jmgri6bMCSE+YlbGM/SUgP+vHUrV76V37y4oToDslh68/LS8vO3M3x19XcA0mjiWQmnT+/Ec+QZlldPzwjdmS2Tp4u7qeeAcIbM6qw7OshPk6zrY8e0ZvPXElBz84fuuwPot2+/L3Rcxc4ACjbxB4CYsLhfp6eruF+zEghCa+ugu6nngM6efe/IkRpg6XTKoqKmkpJsZiOPZidOvHPpUjOLKT5+Pcegy5e/EQdt55A5C8MT60OHtuAqFgrnJ7YtOwDHi5CB5tSpnRcufHXlykNxzJKm5vekyWRKTo45cGBzTc33Dx4M4POTJ7dTPzg4ARQxRlbW5unpuZwc7Z49m0BGCLA+NfWX+PwLw4L+4MEtojHrJjd3m8JxIoiJiWCeu3cnq1QbiCk+O3cu/eLFTF7t2KGEAjBFQNhJgDabza9Shyd5Beilk38BjaLw7TTS8RYAAAAASUVORK5CYII=
// @include        http://www.imagefap.com/gallery.php*
// @include        http://www.imagefap.com/usergallery.php*
// @include        http://www.imagefap.com/profile.php*
// @include        http://www.imagefap.com/pics/*
// @include        http://www.imagefap.com/profile/*
// @include        http://www.imagefap.com/organizer/*
// ==/UserScript==

// Change links from:
//   http://www.imagefap.com/gallery/<id>/<name>
// to
//   http://www.imagefap.com/gallery/<id>/<name>&view=2
var LinksOne = document.evaluate("//a[@class='blk_galleries']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Change links from:
//   http://www.imagefap.com/gallery.php?gid=<id>&pgid=
// to
//   http://www.imagefap.com/gallery.php?gid=<id>&view=2
var LinksTwo = document.evaluate("//a[@class='gal_title']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Link format One
for (var i = LinksOne.snapshotLength - 1; i >= 0; i--)
{
	var anchor = LinksOne.snapshotItem(i);

	// Change the link
	if (anchor.href.indexOf('/gallery') > 0)
	{
		anchor.href += "?view=2";
	}
}

// Link format Two
for (i = LinksTwo.snapshotLength - 1; i >= 0; i--)
{
	var anchor = LinksTwo.snapshotItem(i);

	// Change the link
	if (anchor.href.indexOf('/gallery') > 0)
	{
		anchor.href += "&view=2";
	}
}