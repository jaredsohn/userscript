// ==UserScript==
// @name           ReplaceTCAvatar
// @namespace      Chrysalides
// @description    Replace Avatar of Team Cotati
// @include        http://forums.groundspeak.com/GC/*
// ==/UserScript==
// source released to public domain
// image copyright (c) 2009 knowschad

var allImages, thisImage, imgCnt;

allImages = document.evaluate(
    '//img[@src="http://img.geocaching.com/user/avatar/a663d30f-221f-4592-a202-f83bb5cbeb1c.jpg"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

imgCnt = allImages.snapshotLength;

for (var i = 0; i < imgCnt; i++) {
    thisImage = allImages.snapshotItem(i);
    // thisImage.parentNode.removeChild(thisImage);
    thisImage.src = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAgAAZABkAAD%2F7AARRHVja3kAAQAEAAAACgAA%2F%2B4ADkFkb2JlAGTAAAAAAf%2FbAIQAFBAQGRIZJxcXJzImHyYyLiYmJiYuPjU1NTU1PkRBQUFBQUFERERERERERERERERERERERERERERERERERERERAEVGRkgHCAmGBgmNiYgJjZENisrNkREREI1QkRERERERERERERERERERERERERERERERERERERERERERERERERE%2F8AAEQgASwBLAwEiAAIRAQMRAf%2FEAHwAAAEFAQEAAAAAAAAAAAAAAAEAAgMFBgQHAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAUQAAEDAgMFBwQABwAAAAAAAAEAEQIDBCESBTFBURMGYXGBwTJSFJHRIkLhYqIjM2OEEQEBAQADAQEAAAAAAAAAAAAAAREhAhJBE%2F%2FaAAwDAQACEQMRAD8A2aSSSBLi1HUqOn0%2BZWO3ARG0rsKyvV1rOpyascQCYkeaLJtxy1%2Br60n5NOMRxl%2BR8lFS6suon8xCY7mU1lb2lOHJqgSkccY%2Ba6K1rp1MGjlAlL2gk%2FVc%2Fcdfyq903VKWoU81PCQ9UTtC71lelbaVKdaf6%2Bkdq1S3LrlZlwkkklUJJBVd5r1takxczmN0fugtHXDqUreVPlV5AGXpG9xwWZvOp7io8aIFMcdpVL8qVSrGtWeoxcucVc4WXlf073n0sm%2Ff4KeV2GEWAkWjFNoXVhXAEWfgRiqrUr2mSIW7Aj94%2BRXknW2vfe%2FWS1t7S2jb0xGIYnE966F59a67d2svWZx9s8f4rS6d1HRu5ilOJpzOxzgSvX5x8%2B3bq9SSSUGe1%2FWpWYFCj%2FkltPtH3WPMiSScTvT728N5XlXlhmOA7FxyqmJW5wiaQdMY7kozB2p7OqIxFpZpAkcHQEGxDhSenuQkXKgAx2p0ZEFxgU1FUbrQNW%2BdT5VQ%2FwB6G3tHFXi8%2FwCmZH547ivQFn6PJDFwopqWRLMyhEXKtEkSpRggIpyAoMyDttQYlARxRcIJsn2DegudBoXhn8i0jEmOBz4D7rbZ7j2R9D%2Br9%2BHd2qo0WzqWOWBmJwI9rHFaFY9fW%2FPOPI6sJQOWYkDwkhAgYb1vtU3PyP8Ao8lT3GXknN8Nn%2FXN5Yv3LTDOoOybUbMcuz%2BV2%2Fqx%2Bqb9VRIJMjzE0eKSA5imSKEvFaPpnJzA3Izf7M%2FM8H%2FH6KC%2B6ZhV%2BJE14kF%2FwzbWV8gis8Ncv%2F%2FZ";
}
