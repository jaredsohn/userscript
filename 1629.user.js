// ==UserScript==
// @name      Trope for del.icio.us
// @namespace   http://forestfortrees.edublogs.edu/
// @description   Allows the searching of a deli.icio.us tag on Flickr, Odeo, CiteULike, and Technorati with one click of the mouse.
// @include     http://del.icio.us/*
// ==/UserScript==

//var allDivs, thisDiv, zLink;
if ((!(document.location.href.match(/^http:\/\/del.icio.us\/(login|register|doc|about|rss|logout|settings|post|url|search)/)))&&(document.location.href.match(/^http:\/\/del.icio.us\//))) {

    var parsedUrl = document.location.href.match(/^(http:\/\/del.icio.us\/([^\/]*)([^\/]*))/);
    var delUsername=parsedUrl[2];
	var dunLength = delUsername.length - 2;

	var tagsPattern = "//div[@class='post']/div[@class='meta']/a";

	var tagNodesSnapshot = 
				document.evaluate( tagsPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );			
	for(var i=0; i<tagNodesSnapshot.snapshotLength; i++) {
		var tagNode = tagNodesSnapshot.snapshotItem(i);
		var tagSearchText = tagNode.innerHTML;
		var checkTagSearchText = tagSearchText.substring(0,4);
		if ((checkTagSearchText != "and ") && (tagSearchText != "edit") && (tagSearchText != "delete") && (tagSearchText != "copy")) {

/*			var openTropeLink = document.createElement("a");
			openTropeLink.setAttribute("href", "javascript:window.onTropeActivated('" + selected[i].tagSearchText + "');");
			openTropeLink.setAttribute("title", "open trope search options");
			var icon_img = document.createElement("img");
			icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAACw0lEQVR4nE2SzWtcZRTGf+d9782dr0xmTDRKG4KgpVLRRddKLeJCQRTEhSJUcCXddOE/IYiLupGAO0FFcSO48gOFgq2bREysQ6L9nDSTdpKZuR9z7/u+x0VMmwPP5sB54HnOD1XlUJm+czzTtzXTdzeO7g+1vvbGadVPFnb/fe7DdCsJg8uo4ciIJn1Uv4NwMuPc5xnnn8pudJYm19srbrh4rrcemjdvrbx1b7T3SnAxkQVR1aMeFNn7TbXXeiSzj0FJ2L4UqPZM0u3Sv7c0/Gc97baSlOONPokpie4fjp98XOtPf0bdHqPY6bK7jknaYJpGZiyhFOaTW90/7hZc2/Ysnq5IIh4YaGPpCcLOGbSJ+BGEDD/K0cqhrgARTMh5/pRnsy5k+0L7IX0QoXQXal5Wb6h1CzjB7K7hUkfwDi2naK6EKYQcTIDpGFwG90uciT4ucP4DENWoIsw/goQJjKeEFHwOfgxuBKPrkO9BvCiYv74Xcn3hVMpLZ9QOj5n8Nqbag7jCLM8TzRk0V3wOFqhNwQwgH0DcVST1L36pxr0JFuO3kf4GYRJQE2NiCBpQDeRbyuYqXFm1uLHhxzXojZUI0/1IyM8quhBMA9Oepbq7z/RmdZDXgjRgdAe+/tby6aWI2QSiWMkrwTT46jL+0ZeF5KpIB2k+TNSCkMCkgJ1N2PkNej/Dr39a5lvgIygVTPR/iQ27cqXBNycDrVe9zP0k7Q7JHCQtiDtQ1OD324ZhJUSiKBAEVI5wkPPesqF8hjCuifVEnYha4RAL/V34YSNiEkCMICgBcECU8vpFoTgB5izkkQSH0ZKZjhLXwQ5geQDPLnp6d2KCBkQURBAMkcD5gwcZhBgpAyH1+NRT7kM6gOEEtvYNsVG8CA5QwKMYS/Ka0dkvROsHSM90oN4mqOAqMCL8ctXy98AQ20PyBItgBP4DsLpxMk/kK4kAAAAASUVORK5CYII=");
			icon_img.setAttribute("border", "1");
			icon_img.setAttribute("hspace", "1");
			icon_img.setAttribute("alt", "open trope search options");
			openTropeLink.appendChild(icon_img);*/

			var searchTechnoratiLink = document.createElement("a");
			searchTechnoratiLink.setAttribute("href", "http://www.technorati.com/tag/" + tagSearchText);
			searchTechnoratiLink.setAttribute("title", "Search Technorati for " + tagSearchText);
			var icon_img = document.createElement("img");
			icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QcRAh0YOybr8gAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAABrUlEQVQY042PP2gTcRTHP7/f3fWO1oQcSaNV0Epti4I2g6RgjAjqojgUB+1QHIQ6tIsoSLcuWigupZRQFAQFBwXxD7o4KYqjTkaLpITa0pScjc3Z5C53PQdp6D+Ln+29x+e97xOuXw0e50Z5khujPZzgdvIVmtQpVn/w6PsIHwsvsZx5Ig0xuuNn6T1wk92N7YjJLzeCB1N3UKVKJv2Wg5FjLFSmGfyQZu73LBuJGlEmjr9HvsjfBcDU4+wPHQHgeT6zpQRgVS2eTo8jS84vAAQSKRQAXN9hO8q1ReRqUXIKzNhZAM7vu4ppmFtKTVojPa2DKHsvMQzgByvYXpF0ywVMfSepXeewnBnK7k8C4bJDi5CIpRhK3OOQmUKknhGsbpNC0tdxnSudI/XYds1i2S9hKGFCWgyB+PvaWhGgNdTJ/ZOf0aSxKWZtpcqn4hty5SzqxmHMaMYPPF7nx3k4dYtwQzNNqknFWyJvZ6l4LidaelB1RcPxa3XR9iz63x0lt/QNgPnlwqbLuqIhk/FT65pfF7N16V8k46eR1w5n6Ip28z8oQnKxbYAzey7zBwVZkfap5KGPAAAAAElFTkSuQmCC");
			icon_img.setAttribute("border", "1");
			icon_img.setAttribute("hspace", "1");
			icon_img.setAttribute("alt", "Search Technorati for " + tagSearchText);
			searchTechnoratiLink.appendChild(icon_img);

			var searchFlickrLink = document.createElement("a");
			searchFlickrLink.setAttribute("href", "http://www.flickr.com/photos/tags/" + tagSearchText);
			searchFlickrLink.setAttribute("title", "Search Flickr for " + tagSearchText);
			var icon_img = document.createElement("img");
			icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QMdDBo5jcZZGQAAAMZJREFUOMtj/P///38GCgATA4UArwEbzn9l0K57zCBf9hCnGhZ8mgOnvmBgYGBgkBNiId0FFx7/ZGBgYGBw1uRkuNMuR5oB5WveMmy68I2BgYGB4fnHvww169/hNIARWyzw59xn+PTjH5zPx8HE8HGKInYT/mMBb7/8/Z+5+PV/huQ7/yNmvvj/9svf/7gAVi8IcTPh5dMvHVBkAC8HIwMfBxODIBczXgMYKc8LjK1Qo8ik//////8/Q8t/cmkGSjT/////PwBRndJGs8cdQAAAAABJRU5ErkJggg==");
			icon_img.setAttribute("border", "1");
			icon_img.setAttribute("hspace", "1");
			icon_img.setAttribute("alt", "Search Flickr for " + tagSearchText);
			searchFlickrLink.appendChild(icon_img);

			var searchCiteULikeLink = document.createElement("a");
			searchCiteULikeLink.setAttribute("href", "http://www.citeulike.org/tag/" + tagSearchText);
			searchCiteULikeLink.setAttribute("title", "Search CiteULike for " + tagSearchText);
			var icon_img = document.createElement("img");
			icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAABGElEQVQ4y8WSv44BURTGf/fO3WFKun0H4QUUeqXGC0g8gLeQUWkkCo1aopzwBBoayUai2agUEwoGd+ZsodjImoS1yX7t953fyfmjRER4QfqV4j8BGIDx2DIcWlxXOJ0cej1NLmd+hKfThPX6QqOR+QbM55Z2WwiCDJ6niKIEY9Tdbvu9Zru99cxkoqjXFZ53NbLZ56bSxsDx+PtD6GoVBgNhubSIwGJxYbeLHwYoEZHZzNLvQxhaCgWHVsvh7WOBKZVQWhOHIRwOzD7f6XQiXDcBwPczICmy5bLYKBIRkVMQiHS7d3P//0ipgERrsPa6qPOZRN3/DZMGoFYjaTaJKxUYjRDfT79CGiNerUg2G3SxiJPPPw94RF/Ij6Mlz63sWgAAAABJRU5ErkJggg==");
			icon_img.setAttribute("border", "1");
			icon_img.setAttribute("hspace", "1");
			icon_img.setAttribute("alt", "Search CiteULike for " + tagSearchText);
			searchCiteULikeLink.appendChild(icon_img);

				var searchOdeoLink = document.createElement("a");
				searchOdeoLink.setAttribute("href", "http://www.odeo.com/tag/" + tagSearchText);
				searchOdeoLink.setAttribute("title", "Search Odeo for " + tagSearchText);
				var icon_img = document.createElement("img");
				icon_img.setAttribute("src","data:image/png;base64,"+"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAdVBMVEX/////s9n/rNb/mcz/mcz/jMX+hMH/ebz+drv+crj/Wqz/////9fr/7vb/3+//1uv/0Oj/xOH/vN7/s9n/rNb/mcz/jMX/hcL+hMH/ebz+drv+crj/a7X/ZrL+YrD/Wqz/VKr/Uqj/SqX/RaL/QJ//O53/M5nsA3V6AAAAJ3RSTlMARFVVZmZ3iIiImf/////////////////////////////////////8d95jAAAACXBIWXMAAAsSAAALEgHS3X78AAAAIHRFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyBNWLuRKiQAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDgvMjkvMDVakEFiAAAAmElEQVR4nD2P6xaCIBCEt1SykFQsLCxERd7/EVt2pfkxh/n2sBeApLN1biog67RGUig5lxwtYkF1zv7u0SsE6/axe4ydpI/YD4tKPQapCAiw6G+JasZEZnCJa0moMz4w6Amo/rUEmDA/qW42fC5QxGBlo/XRtAbYx8GscW/z2LzoVy3o17TqhYnBTW98TBUP1f97xRyC5/gD1RcWYoxODPwAAAAASUVORK5CYII=");
				icon_img.setAttribute("border", "1");
				icon_img.setAttribute("hspace", "1");
				icon_img.setAttribute("alt", "Search Odeo for " + tagSearchText);
				searchOdeoLink.appendChild(icon_img);

			tagNode.parentNode.insertBefore(searchTechnoratiLink, tagNode);
			tagNode.parentNode.insertBefore(searchFlickrLink, tagNode);
			tagNode.parentNode.insertBefore(searchCiteULikeLink, tagNode);			
			tagNode.parentNode.insertBefore(searchOdeoLink, tagNode);
		}
	}
}
