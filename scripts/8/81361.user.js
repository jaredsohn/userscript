// ==UserScript==
// @name           ReplaceTCAvatarPink
// @namespace      Chrysalides
// @description    Replace Avatar of Team Cotati
// @include        http://forums.groundspeak.com/GC/*
// ==/UserScript==
// source released to public domain
// image copyright (c) 2010 nymphnsatyr

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
    thisImage.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAAFAAA/+4ADkFkb2JlAGTAAAAAAf/bAIQAEg4ODhAOFRAQFR4UERQeIxoVFRojIhkZGhkZIiceIyEhIx4nJy4wMzAuJz4+QUE+PkFBQUFBQUFBQUFBQUFBQQEUFBQWGRYbFxcbGhYaFhohGh0dGiExISEkISExPi0nJycnLT44OzMzMzs4QUE+PkFBQUFBQUFBQUFBQUFBQUFB/8AAEQgASwBLAwEiAAIRAQMRAf/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A7hJJJJSlldW67h9LAFsvucJbU3n5+C1V5z9Yca+7r91R+k8A1knTbtEIE0LSASaDbu+u2c8/oaWVA8bpeUbC+ul3qNbl1NNZIDnskEecJ6vq/wBOupYCC18DcWOnVVuqdDwsfEc7HO2ysFxDnTuCbxhkOKQe5puqvrbbU8Prdq1zTIKIsL6qMsb0isvEAucWD+TK3U9iKkkkklKSSTEhJS5WD1zEYH15ztWs9tg/ku0BWzZfVXq94HlOq5/rGRdmsGPWwtxyQXWHQ6eITJ1wkMuES4wdhfVrNZiVXMNA2NdJseCdZ4CT8LFtd6dQizIMbiSfmnZ0y4MH6RjxHJGqfCczEz99r/UAaQGMH0S7lzlXiCZU3ZUIkx1rZ6XFx249DKW6hgif4o6r1ZeNb9B4J8OPyo8hW3ON2SV0kkkkLLKyDddcdf0TdGsGm4+JWhc/ZWSOeB8VnCwRPyPxCVXuyYxuWAHv+iJj5p7qfVaRwfH8UVzd0EaEcKQ1GuhTqDLbRvr2ta9kt1h208T5fFVvQZbYXVMLncOtmGlaNzS8bQYaT7x/JRBW0NAGg7AJvCOLiXcRqmsysgBpKdz30uBrcWiCT4aI8NEaKlkv1aJ/OCcs3dvFyG31zw9uj2+BR1hYtpxra3Hi0kWdoBI1+S3UKYuH1V0auWYDfMqi9rdrj+aeVczRLWiYJKz7mOrrc4OJEcc7vKEui/Ft9Vsax4JY4yGkgeYVuR8llYznl5a120uAsDSO30dfuWkx7HDUgHuJRXy3ZRPxS3QYTiJ0US33SfkkhjY7Qxys21wdbW0kCTOquZdpYz2fTPfwWU+m11lcQ8uMe7j8Ekx3dG8AscZH0drdU/2x8Ru12elM+e6fu0TWMYGe5u7xVL0/jEx/Z8EkULGr0eXXa+oelHqA/neHdUgQ8Q4a9wey1lnZX8+fo8dv4oBjhf49Ggcc12+oxsg8tHh5I9fou+iBPgmtj09fEczu+UITvpHwn87lFmPi2gduh0HYJn2AHn5BQ1nv84lDdz/cktQ3OmZT1TuY4Dmdvbtyhu51jn876P4IlP8ASDHlM/S+c/m/BJIpe4WuMMInzVj7HlbY2D+i7eB/P7t33oeHH2/XmNN87f7Md/it5DqsN8Qf/9k=";
}