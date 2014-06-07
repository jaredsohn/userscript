// Wonkette.com Favicon User Script
// 2007-04-06
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Wonkette.com Favicon", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wonkette.com Favicon
// @namespace     http://swanky.de/greasemonkey/
// @description   Replaces Wonkette's current favicon with it's swanky previous one.
// @source        http://userscripts.org/scripts/show/8362
// @include       http://www.wonkette.com/*
// @include       http://wonkette.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAxtJREFUOE8BEAPv%2FAH%2Fz3X06%2Fjw9%2B4BBBUA%2Fvf%2B%2FAIFBQb9%2B%2Fb89%2FIB%2FfsHGxkOCASonLE1MyNNqvEL6N0A%2F7xn7rhj5bBa6Lx54rZu4rNt5LVw4q5j4qZe4bJi%2F%2BiMf3NNonE4%2F9lYeIlYLyUUANqJM%2Fq5W%2BmvUOSwYeGxaOCxZuSxbOKrYeiva%2FLOesitbXhtQf%2F6fv%2BoQENEKAAAAABMOx1nUifAjTnlq1rerV3frl%2FisGjmrGXstG3%2F24GrkFPyyWZgRg8AAAAAISIAAAUA%2F%2FGp7efZzrqS5Lx05bts5bJf57lr67Rt%2F8Jy%2F%2FiUj3g9BQAAAAAAREwrQVdAAA0SAP%2F2lP%2F%2F3P%2F%2F3P%2F%2Fyv%2F7oP%2Fhh%2F%2FTeP%2FWb%2F%2FvflVOKSUIAC0WIAA0uNfq5d2JPAAAAQBEJQAAAABLPA1yUhmBeVq5q4n%2B1IRZb0o4Vk4QFQXkgg05eNIAJ5TBq6VfNgYRGA4AADE%2BACCCAAtLACxDUR8AUzcAAAAAHDItlYpwLCcEm2sr%2F%2F%2F%2FEFihMS0jQC4OIyYQAOn%2F7VKs%2FgAvhbf%2B%2F%2F%2Foot%2BRGREMAP%2Fkff%2F%2FwOO%2Fgzw6FG1dKlxbMKaES65%2FSRUSAwCufU6ntKg5gcGqpZOXbjUCAADcs3L%2F3ZD14sD%2F88j%2F9Lfg0a3%2F5ar%2F949cTjIhHw4AVUQeXkIWJyMACwQAMCcF27d6%2F%2FCl79eVz6JT9NqU7dGd%2BdWv%2F9uN6KpaAAAAU2Q6AJFnKP%2FAZv%2F%2Fuv%2F7y%2F%2F%2Fw%2F%2FrnvPQhMWeeHooIXojEc%2BeXPjNkP%2FCdDEIAAAAAFmCVQA7NxpyQBHpjkr%2F1Yf%2F56b%2FzIbsuWjAknOiPDvBk3j15arpvHrRkmLK0MAqNx06Yz8ANzkHM0EHPB0AczQAoWMnu4hH%2BNeN%2F%2FSy%2F%2F%2FG%2FPKy0p5z2JmD%2F%2Fvp%2F%2F%2F%2FcYVZRGFEALjKiVJuVhgxMFJULmxUQJBRQb1yQNmfaMWUYqZnSLZvQtybjf%2Fu35iblP%2F%2F3qHFsABjTGknJ4UgLrA7RpT%2F%2F%2Fz%2F%2F%2F3%2F8OfIjoV0AgCrSQP%2FyEP%2FsjP1wJX60bL%2F%2F%2F9nmYWVL5Hc8IXxTQAAAABJRU5ErkJggg%3D%3D");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 0.0.1	Initial release.