// ==UserScript==
// @name       Buff Dotabuff
// @namespace  ecmasushi
// @version    4.0
// @description  Shows unused heroes on Dotabuff player summaries
// @grant      none
// @match      http://*.dotabuff.com/*
// @downloadURL  http://userscripts.org/scripts/source/393650.user.js
// @copyright  ecmasushi 2014; MIT License
// ==/UserScript==

/*
 * The MIT License (MIT)
 * Copyright (c) 2014
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/*
 * Change Log
 * ----------
 * 1.1 - Fixed not correctly refreshing used hero lists when it could be out of date
 * 1.2 - Fixed only working on English site (note: cache is separate between subdomains)
 * 2.0 - "Matches Played" column can be clicked to view matches played as hero
 * 2.1 - Fixed "Matches Played" column link not working for non-English sites
 * 2.2 - Unused heroes list now links to hero pages on Dotabuff
 * 3.0 - Added Dota 2 Wiki link on item and hero pages (not thoroughly tested)
 *     - Fixed win/loss hover text for players with wins or losses of 1,000 or more
 * 4.0 - Added (difference, total) for win/loss records in player tooltips
 */

(function () {
	'use strict';
	var overviewPath = /^\/players\/(\d+)\/?$/,
		usedHeroesPath = /^\/players\/(\d+)\/heroes$/,
		getUsedHeroes = ['/players/', null, '/heroes'],
		genericPlayerPath = /^\/players\/(\d+)(\/.*)?$/,
		allHeroesPath = /^\/heroes$/,
		getAllHeroes = '/heroes',
		itemPath = /^\/items\/([^\/]+)$/,
		heroPath = /^\/heroes\/([^\/]+)$/,
		dataVersion = 1,
		cacheLimit = 15, //max number of profiles to cache hero data for
		//console polyfill shouldn't be necessary, but don't want things to crash if a browser doesn't have console.trace
		console = (window.console && window.console.trace && window.console) ||
				{ log: function (msg) {}, trace: function () {} },
		storage = (function () {
			//handles setting up and updating storage if different versions require changes
			var storage = (localStorage.buffdotabuff && JSON.parse(localStorage.buffdotabuff)),
				settings;
			if (!storage || !storage.version || storage.version < dataVersion) {
				settings = (storage && storage.settings) || {};
				storage = { profiles: {}, heroes: null, visited: [], version: dataVersion, settings: settings };
			}
			return storage;
		}()),
		serializeStorage = function () {
			localStorage.buffdotabuff = JSON.stringify(storage);
		},
		updateStorage = function (e) {
			//called when storage gets updated by another tab/window
			if (e.key === 'buffdotabuff') {
				storage = JSON.parse(e.newValue);
			}
		},
		linkableName = (function () {
			var findSpaces = / /g,
				spaceReplace = '-',
				findToRemove = /'/g,
				remove = '';
			return function (name) {
				return name.toLowerCase().replace(findSpaces, spaceReplace).replace(findToRemove, remove);
			};
		}()),
		makeHeroPortrait = (function () {
			var linkStructure = ['http://cdn.dotabuff.net/assets/heroes/', null, '.png'],
				findSpaces = / /g,
				spaceReplace = '-',
				findToRemove = /'/g,
				remove = '';
			return function (name) {
				var img = new Image();
				linkStructure[1] = name.toLowerCase().replace(findSpaces, spaceReplace).replace(findToRemove, remove);
				img.src = linkStructure.join('');
				return img;
			};
		}()),
		getAndProcessPage = (function () {
			var loadError = function () {
				console.log('error loading stats');
				console.trace();
			};
			return function (url, callback, args) {
				var xhr = new XMLHttpRequest();
				xhr.addEventListener('load', function () {
					processPage(xhr.responseXML, url, true);
					callback.apply(null, args);
				}, false);
				xhr.addEventListener('error', loadError, false);
				xhr.open('GET', url);
				xhr.responseType = 'document';
				xhr.send();
			};
		}()),
		getTextContent = function (el) {
			return el.textContent;
		},
		processPlayer = function (doc, id) {
			//processes any player page
			//adds title text to win-loss record at top of page
			var secondaryHeader = doc.getElementById('content-header-secondary'),
				wonElement = secondaryHeader.getElementsByClassName('won')[0],
				won = wonElement.textContent.replace(/,/g, '') | 0,
				lost = secondaryHeader.getElementsByClassName('lost')[0].textContent.replace(/,/g, '') | 0,
				total = won + lost,
				diff = won - lost,
				title = total + ' total',
				visitedIndex = storage.visited.indexOf(id);
			if (diff !== 0) {
				title += '; ' + Math.abs(diff) + (diff > 0 ? ' more ' : ' fewer ') + 'wins than losses';
			}
			wonElement.parentNode.title = title;
			if (visitedIndex !== -1) {
				storage.visited.splice(visitedIndex, 1);
				storage.visited.push(id);
				serializeStorage();
			}
		},
		processOverview = function (doc, id) {
			//processes player overview pages
			//adds unused heroes, retrieving hero information if necessary
			var timeElements = doc.getElementsByTagName('time'),
				lastMatch,
				player_show,
				secondary,
				section,
				header,
				article,
				table,
				thead,
				tbody,
				tr,
				th,
				heroURL,
				iconCell,
				imageContainer,
				imageAnchor,
				icon,
				nameCell,
				nameAnchor,
				i,
				l,
				profile,
				unused,
				usedHeroes,
				heroes,
				hero;

			if (!timeElements.length) {
				//if we don't find any time elements, then they haven't played a match
				return;
			}
			if (!storage.heroes) {
				//if we don't have a list of heroes, retrieve it from Dotabuff
				getAndProcessPage(getAllHeroes, processOverview, [doc, id]);
				return;
			}
			lastMatch = Date.parse(timeElements[0].getAttribute('datetime'));
			if (!storage.profiles[id] || lastMatch > storage.profiles[id].updated) {
				//if we don't have the player's used heroes list, or we haven't checked since their last match, refresh the list
				getUsedHeroes[1] = id;
				getAndProcessPage(getUsedHeroes.join(''), processOverview, [doc, id]);
				return;
			}

			profile = storage.profiles[id];
			usedHeroes = profile.heroes;
			heroes = storage.heroes;
			if (profile.unused === null) {
				//if we haven't computed the unused heroes for the player, do so and cache the result
				unused = heroes.filter(function (hero) {
					return usedHeroes.indexOf(hero) === -1;
				});
				profile.unused = unused;
				serializeStorage();
			} else {
				unused = profile.unused;
			}
			l = unused.length;
			if (l === 0) {
				//if they have no unused heroes, don't add a list
				return;
			}

			if (storage.visited.indexOf(id) === -1) {
				//add this profile to the list of visited profiles
				storage.visited.push(id);
				if (storage.visited.length > cacheLimit) {
					//if we're storing a lot of profiles, delete the one that hasn't been visited in the longest
					delete storage.profiles[storage.visited.shift()];
				}
				serializeStorage();
			}

			//find player-show first
			//just in case they change the website to have another element with the secondary class
			player_show = doc.getElementsByClassName('player-show')[0];
			secondary = player_show.getElementsByClassName('secondary')[0];

			//build the elements we need to make the section
			section = document.createElement('section');
			header = document.createElement('header');
			article = document.createElement('article');
			table = document.createElement('table');
			thead = document.createElement('thead');
			tbody = document.createElement('tbody');

			//establish general structure
			section.appendChild(header);
			section.appendChild(article);
			article.appendChild(table);
			table.appendChild(thead);
			table.appendChild(tbody);

			header.appendChild(document.createTextNode('Unused Heroes'));

			//make table header (just "Hero")
			tr = document.createElement('tr');
			thead.appendChild(tr);
			th = document.createElement('th');
			th.appendChild(document.createTextNode('Hero'));
			th.colspan = '2';
			tr.appendChild(th);

			//build and append the elements for the list of heroes
			for (i = 0; i < l; i++) {
				hero = unused[i];
				heroURL = '/heroes/' + linkableName(hero);

				tr = document.createElement('tr');
				iconCell = document.createElement('td');
				imageContainer = document.createElement('div');
				imageAnchor = document.createElement('a');
				icon = makeHeroPortrait(hero);
				nameCell = document.createElement('td');
				nameAnchor = document.createElement('a');

				imageAnchor.appendChild(icon);
				imageContainer.appendChild(imageAnchor);
				iconCell.appendChild(imageContainer);
				tr.appendChild(iconCell);
				tr.appendChild(nameCell);
				nameCell.appendChild(nameAnchor);
				tbody.appendChild(tr);

				iconCell.className = 'cell-icon';
				imageContainer.className = 'image-container image-container-icon image-container-hero';
				imageAnchor.href = heroURL;
				icon.className = 'image-icon image-hero';
				icon.alt = hero;

				nameAnchor.className = 'hero-link';
				nameAnchor.href = heroURL;

				nameAnchor.appendChild(document.createTextNode(hero));
			}
			secondary.appendChild(section);
		},
		processUsedHeroes = function (doc, id) {
			//processes player hero pages
			//stores list of heroes in localStorage
			var names = doc.getElementsByClassName('hero-link'),
				usedHeroes;
			if (!storage.profiles[id]) {
				storage.profiles[id] = { heroes: null, updated: 0, unused: null };
			}
			usedHeroes = Array.prototype.map.call(names, getTextContent).sort();
			if (storage.profiles[id].heroes === null ||
						storage.profiles[id].heroes.toString() !== usedHeroes.length.toString()) {
				//string comparison isn't a perfect way to see if the hero list changed,
				//but there probably won't be any heroes added with commas in their names
				storage.profiles[id].heroes = usedHeroes;
				storage.profiles[id].unused = null;
			}
			storage.profiles[id].updated = Date.now();
			serializeStorage();
		},
		processAllHeroes = function (doc) {
			//processes heroes page
			//updates cached list of heroes if it's out of date
			var grid = doc.getElementsByClassName('hero-grid')[0],
				names = grid.getElementsByClassName('name'),
				heroes = Array.prototype.map.call(names, getTextContent).sort(),
				i,
				visited,
				profiles;
			if (storage.heroes === null || storage.heroes.toString() !== heroes.toString()) {
				storage.heroes = heroes;
				visited = storage.visited;
				profiles = storage.profiles;
				i = visited.length;
				//if the list of heroes has changed, clear cached unused information
				while (i--) {
					profiles[visited[i]].unused = null;
				}
			}
			serializeStorage();
		},
		matchHistoryPath = ['/players/', null, '/matches?hero=', null],
		findFirstContainer = function (el, tag) {
			var current = el;
			tag = tag.toUpperCase();
			while (current = current.parentNode) {
				if (current.tagName === tag) {
					return current;
				}
			}
			return null;
		},
		addMatchHistoryLinks = function (doc, id) {
			//makes "matches played" cells clickable to view matches
			var links = doc.getElementsByClassName('hero-link'),
				i = links.length,
				j,
				l,
				matchAnchor,
				bar,
				matchesCell,
				name;
			while (i--) {
				//there's probably a more straightforward way to do this
				bar = findFirstContainer(links[i], 'TR').getElementsByClassName('segment-game')[0];
				if (bar) {
					matchesCell = findFirstContainer(bar, 'TD');
					name = links[i].textContent;
					matchAnchor = document.createElement('a');
					matchHistoryPath[1] = id;
					matchHistoryPath[3] = linkableName(name);
					matchAnchor.href = matchHistoryPath.join('');
					matchAnchor.title = 'view match history as ' + name;
					matchAnchor.style.display = 'block';
					matchAnchor.style.height = '100%';
					matchAnchor.style.width = '100%';
					matchAnchor.style.color = 'inherit';
					l = matchesCell.childNodes.length;
					for (j = 0; j < l; j++) {
						matchAnchor.appendChild(matchesCell.firstChild);
					}
					matchesCell.appendChild(matchAnchor);
				}
			}
		},
		getWikiTitle = function (string) {
			return encodeURIComponent(string.replace(/ \d+$/, '').replace(/ /g, '_'));
		},
		gamepediaURL = 'http://dota2.gamepedia.com/',
		processGameObject = function (doc) {
			var primaryHeader = doc.getElementById('content-header-primary'),
				header = primaryHeader.getElementsByTagName('h1')[0],
				small = document.createElement('small'),
				anchor = document.createElement('a'),
				host = location.host.split('.');
			header.appendChild(small);
			small.appendChild(anchor);
			anchor.appendChild(document.createTextNode('Dota 2 Wiki'));
			anchor.style.fontSize = '75%';
			anchor.href = gamepediaURL + getWikiTitle(header.firstChild.textContent);
			if (host.length === 3) {
				//attempts to detect when on a non-English page to send to the right language on Gamepedia
				//not sure how future-proof it is or if it works for every page, but it's probably better than nothing
				anchor.href += '/' + host[0];
			}
		},
		processEvery = function (doc, player) {

		},
		processPage = function (doc, path, readonly) {
			//processes all pages
			//calls the correct function to process a page
			var exec;
			if (!readonly) {
				exec = genericPlayerPath.exec(path);
				if (exec !== null) {
					//on any player page, adds title text to record
					processPlayer(doc, exec[1]);
					addMatchHistoryLinks(doc, exec[1]);
				}
				exec = overviewPath.exec(path);
				if (exec !== null) {
					//on overview page
					processOverview(doc, exec[1]);
					return;
				}
				exec = heroPath.exec(path);
				if (exec !== null) {
					//on hero page
					processGameObject(doc);
				}
				exec = itemPath.exec(path);
				if (exec !== null) {
					//on item page
					processGameObject(doc);
				}
				processEvery(doc, exec && exec[1]);
			}
			exec = usedHeroesPath.exec(path);
			if (exec !== null) {
				processUsedHeroes(doc, exec[1]);
				return;
			}
			exec = allHeroesPath.exec(path);
			if (exec !== null) {
				processAllHeroes(doc, exec[1]);
				return;
			}
		};
	window.addEventListener('storage', updateStorage, false);
	processPage(document, location.pathname);
	(function () {
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || null,
			mutationObserver;
		if (MutationObserver) {
			mutationObserver = new MutationObserver(function (changed) {
				var i = changed.length,
					j,
					node,
					players,
					small,
					record,
					won,
					lost;
				while (i--) {
					j = changed[i].addedNodes.length;
					while (j--) {
						node = changed[i].addedNodes[j];
						if (node.classList && node.classList.contains('tooltip-content-player')) {
							//filter for player tooltips
							record = node.getElementsByClassName('record')[1];
							small = document.createElement('small');
							small.style.fontSize = '75%';
							record.appendChild(document.createTextNode(' '));
							record.appendChild(small);

							won = record.getElementsByClassName('won')[0].textContent.replace(/,/g, '') | 0;
							lost = record.getElementsByClassName('lost')[0].textContent.replace(/,/g, '') | 0;
							small.appendChild(document.createTextNode('(' + (won - lost > 0 ? '+' + (won - lost) : won - lost) + ', ' + (won + lost) + ')'));
						}
					}
				}
			});
			mutationObserver.observe(document.body, {childList: true, subtree: true});
		}
	}());
}());