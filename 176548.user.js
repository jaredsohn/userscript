// Google Old Favicon ['01-'08]
// 2013
// from FalkeXY 2013
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Old Favicon ['01-'08]
// @description   Replaces Googles Favicon with the one from 2001 to 2008 - by FalkeXY
// @include       htt*://*.google.*/*
// @include       htt*://google.*/*
// @exclude	/^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.*.*/
// @exclude     /^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.co.*/
// @version       1.1_2
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5klEQVR4nJ2TS4tbdQBHz30kN5k4yTzR0XQ6jhS12CpKnYL4QNCNlQoFF7YriyCILkq3goruXIh205WCiAhu1IUiAyqlgsHptJmhL2uGYcZpk0wmz5t7b27u/+ciH0DwfICzOsfyTt/R8ROv06GJFxQx6Rb9VI6puEpoMuBO0qTDjBMRWOOk4jabToqCcQHg0ZPX1R/UJUmxH8hoS3UZxZK2+9Lmxq46klqtUFEiqS9pEErtSH8eXpS7Y81jp7JEQH8sQ7Vb5Otva9wq/U6pbNMPZ6m5dQ4d9Hjm2BKvPG5x5H6HnOlihxWYPb0qo1AN9fWbL714tqTpJ37W33WpKmko6Y6kP65JxaMf6+HHzmpvT1JXujLhiYVTJRltKZT0xkfX9cCR86pFktGWBqYpDROFyci0cqurUnldgbpS1FX5oYLY9+Zt+bH0/vkN3f3UZ1q7ESmQFGpHLQUKtalAbSmQ4sFI5KutRFWtHESu27KwXdizxkglizxSTEMSIyePF3u0U/NYQCbxIZND+NgMseNpTC2PnY73CDD8sH4ZFoeYsRpYBivOQWJRSCCfAFYax4DBJiEBiSnXxW7kcwgbtzEFTWFHk9A1KOXTTRmIQU4EGUhs4ZgsWQSqEGX2YXtJizRQnJ5g+8YOkTOAcY+ok2PcsfEzUMNwsVJltR6zVoOV9SzGm6DtXMH27Aw2uxx9MgbnQT48t0bTjrDzwBDGCLi5muHtU5d46bnvOHHsR5aXK8jkyVlzsP/VQJJ0O5QWDl9UYepzLV+TAsUyktRrSEMpiqXL/0iz+9/Tl9+syGhLl2bmZA+y2wifGW+TX39aYm5ml+PPfsWnn1SoDiDJpWk5PXoubDRi6r2reOM+AJlcD2v2rbJunjuEZ0ZvNCPDmXd/4cL3a0TeJKQO4OQHhPW7KNxT5YXnfT448zL3ZbOUF+Zh6eRVqTMq77/oD5JR26Gkfl9/HbhXbuq1d3j6Av+LL/wd/gUZbg2r36kyNAAAAABJRU5ErkJggg==");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 1.1_2	Initial release.