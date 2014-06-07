// ==UserScript==
// @name           KOC Power Bot
// @version        20110723a
// @namespace      mat
// @homepage       http://userscripts.org/scripts/show/101052
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @include        http://apps.facebook.com/kingdomsofcamelot/*
// @include		   http://www.kabam.com/games/kingdoms-of-camelot/* 
// @include        *facebook.com/connect/uiserver.php*
// @description    Automated features for Kingdoms of Camelot
// @require        http://tomchapin.me/auto-updater.php?id=101052
// ==/UserScript==


var Version = '20110723a';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var MAP_DELAY = 1200;

var DEFAULT_ALERT_SOUND_URL = 'http://koc.god-like.info/alarm.mp3';
var SWF_PLAYER_URL = 'http://koc.god-like.info/alarmplayer.swf';

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAAGkBsQ5AAABa1BMVEX%2F%2F8X%2F98X%2F973%2F97X%2F77X%2F7633773%2F76X377X3763%2F5q3%2F5qX%2F5pz35q335qX%2F3pz%2F3pT33pz%2F1pT%2F1oz%2F1oT31pT31oz%2FzoT%2Fznv3zoT%2FxXv%2FxXP%2FxWv3xXv3xXP%2FvWv%2FvWP3vWv3vWP%2FtWP%2FtVr%2FtVLmvWv3tWP3tVr3tVL%2FrVL%2FrUrmtWP3rVL3rUrvrVL%2FpUrvrUr%2FpULmrVrmrVL3pUr3pULmpUL3nDrepULWpVLWpUrmnDrFpUK1pVrOnDqcnFKcnEqMnEp7lHN7lGtzlGNrlGtjjEpajFpShFJSe2NChEJKe1o6hDohjDFCc1oZjDEhhDEQjDEAlDEpezoZhDEhezoQhDEAjDEpczoZezoIhDEhc0IhczoAhDEZczoIezEhazoAezEhY0IAczEAcykIazEhWkIAazEAaykIYzEhUkIAYzEAWjEAUjEAUikASjEASikAQjEAQikAOjEAOikAMTEAMSkAKSlOGAcLAAAACXBIWXMAAAsSAAALEgHS3X78AAABVklEQVQYGQXBPW4TYRiF0ee%2B3x2DRSxRIFJTGIkVUFDQIbEDlkE5%2B8kWWEKKIBSB5AohXBGUSAaCIdgz3x%2FnaARztjS3RSPodPkmfuzReLbOh1fm72a4h3kxyWgE8NXPz8%2F%2FhC%2FzRXLM3cmeqvGDl7Mfa9ztT9pvp3%2FDOpjOr7Yft9PXjPHxE%2Bl6p4SJqSq5RsL4EAtZaUAjAABoBADAt%2Fty8ovVnhQ%2Bfx%2BbDTfXQ9Bz5H7IdWGV9k588NJWrQiXjMkdly6Fo9beRap29F4QJBxTE%2Bo9bF7XuUpJsp8BAGjcATSgADOQWRsfLu8WT0%2B33wcePknfJj%2B6j3Hb17m5HQsr1%2Fm4aGBEbtp8uXPWzcSBlhYYXKunObLoOyU1jFH02oVRZNFJQ2CCko26MIrC3MAEpRdcSVkYFYzBuaAuQFFAgzFBK0GVZhYoaUYYVm8b0IAGNDr8B8ZXpEbZNGQ6AAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXAgMAAAHuttyYAAAACVBMVEX%2F%2F%2F8AOjEAKSnbo5E5AAAACXBIWXMAAAsSAAALEgHS3X78AAAAW0lEQVQI12NYwdAAhCsYOICwQQGEpiYwrGpgCHRgcIChUAeGqaERDBMZJRgmMCDwqlUrgHgBQ2hoAIMjiwAYOzBgxyA1ILVTQ4GggWEKK4MIK4JiYGAgiYKYAgBFlyWR9CCfyAAAAABJRU5ErkJggg%3D%3D";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

//logit ("+++ STARTUP: "+ document.URL);

var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  hostileOnly  : false,  
  friendlyOnly : false,  
  alliedOnly   : false,  
  unalliedOnly : false,  
  neutralOnly  : false,  
  srcAll       : true,  
  srcScoutAmt  : 1,
  minmight     : 1,
  srcdisttype  : 'square',
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  pbFoodAlert  : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:10000, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, },
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'10', atime:2 , spamstate:'a'},
  giftDomains  : {valid:false, list:{}},
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  giftDelete   : 'e',
  currentTab   : null,
  hideOnGoto   : true,
  transportinterval : 60,
  minwagons    : 100,
  lasttransport: 0,
  reassigninterval: 60,
  lastreassign : 0,
  HelpRequest  : false,
  DeleteRequest: false,
  MapShowExtra : false,
  RaidRunning  : false,
  RaidReset    : 0,
  DeleteMsg	   : false,
  DeleteMsgs0  : false,
  DeleteMsgs1  : false,
  Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
  LastReport   : 0,
  LastCrestReport   : 0,
  MsgInterval  : 1,
  CrestMsgInterval  : 1,
  foodreport   : false,
  crestreport  : true,
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
  autoPublishGamePopups : false,
  autoPublishPrivacySetting : 80,
};

var CrestOptions = {
  Running   : false,
  CrestCity : 0,
  RoundOne  : true,
  RoundTwo  : true,
  lastRoundTwo : 0,
  X:0,
  Y:0,
  R1MM:0,
  R1Ball:0,
  R1Cat:0,
  R2MM:0,
  R2Pike:0,
  R2Sword:0,
  R2Arch:0,
  R2Ball:0,
  R2Ram:0,
  R2Cat:0,
};

var TrainOptions = {
  Running   : 		false,
  Troops: 			{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Threshold: 		{1:500,2:500,3:500,4:500,5:500,6:500,7:500},
  Max: 		{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Workers: 		{1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Keep:				{1:{Food:0,Wood:0,Stone:0,Ore:0},2:{Food:0,Wood:0,Stone:0,Ore:0},3:{Food:0,Wood:0,Stone:0,Ore:0},4:{Food:0,Wood:0,Stone:0,Ore:0},5:{Food:0,Wood:0,Stone:0,Ore:0},6:{Food:0,Wood:0,Stone:0,Ore:0},7:{Food:0,Wood:0,Stone:0,Ore:0}},
  Enabled:			{1:false,2:false,3:false,4:false,5:false,6:false,7:false},
  SelectMax:			{1:false,2:false,3:false,4:false,5:false,6:false,7:false},
  Resource:		{1:true,2:true,3:true,4:true,5:true,6:true,7:true},
  UseIdlePop:		{1:true,2:true,3:true,4:true,5:true,6:true,7:true},
};

var ResetAll=false;
var deleting=false;
var nHtml={
  FindByXPath:function(obj,xpath,nodetype) {
	if(!nodetype){
		nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;
	}
	try {
		var q=document.evaluate(xpath,obj,null,nodetype,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
	}else{
		if(q){
			return q;
		}
	}
	return null;
  },
  
  ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
  },

  Click:function(obj) {
	return this.ClickWin(window,obj,'click');
  },
  
  ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
  },

  SetSelect:function(obj,v) {
	for(var o=0; o<obj.options.length; o++) {
		if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
	}
	return false;
  },

}

readGlobalOptions ();

if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
  facebookInstance ();
  return;
}
if (document.URL.search(/facebook.com\/connect\/uiserver.php/i) >= 0){
  HandlePublishPopup ();
  return;
}
if (document.URL.search(/kingdomsofcamelot.com/i) >= 0){
  kocWideScreen ();
}

function kocWideScreen(){
  function setWide (){
	var kocFrame = parent.document.getElementById('kofc_iframe_0');
	if (!kocFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	kocFrame.style.width = '100%';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100%; !important;}';
	kocFrame.parentNode.appendChild(style);
  }
  kocWatchdog ();
  if (GlobalOptions.pbWideScreen)
    setWide();
}

/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
	var iFrame = document.getElementById('iframe_canvas');
	if (!iFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrame.style.width = '100%';

	while ( (iFrame=iFrame.parentNode) != null)
	  if (iFrame.tagName=='DIV')
		iFrame.style.width = '100%';
	document.getElementById('globalContainer').style.left = '0px';
    try{    
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
	if(e){
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '5px';
				break;
			}
		}
	}
	var e = document.getElementById('pageHead');
	if(e){
		e.style.width = '80%';
		e.style.margin = '0 10%';
	}
	var e = document.getElementById('bottomContent');
	if(e){
		e.style.padding = "0px 0px 12px 0px";
	}
    
  }
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}

function HandlePublishPopup() {
	if(GlobalOptions.autoPublishGamePopups){
		// Check the app id (we only want to handle the popup for kingdoms of camelot)
		var FBInputForm = document.getElementById('uiserver_form');
		if(FBInputForm){
			var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
			if(channel_input){
				var current_channel_url = channel_input.value;
				if (current_channel_url.match(/http:\/\/.{0,100}kingdomsofcamelot\.com\/.*?\/cross_iframe\.htm/i)) {
					var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
					var privacy_setting = nHtml.FindByXPath(FBInputForm,".//input[@type='hidden' and contains(@name, 'privacy_data') and contains(@name, 'value')]");
					if(publish_button && privacy_setting){
						// 80: Everyone
						// 50: Friends of Friends
						// 40: Friends Only
						// 10: Only Me
						if(privacy_setting.value != GlobalOptions.autoPublishPrivacySetting && GlobalOptions.autoPublishPrivacySetting != 0)
							privacy_setting.value = GlobalOptions.autoPublishPrivacySetting;
						nHtml.Click(publish_button);
					}
				}
			}		
		}
		setTimeout(HandlePublishPopup, 1000);
	}
}

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var mainPop;
var pbStartupTimer = null;
var CPopUpTopClass = 'pbPopTop';
var firefoxVersion = getFirefoxVersion();
var TrainCity = 0;

function pbStartup (){
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
	  table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabPad tr td.ptentry {background-color:#ffeecc; padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .pbStat {border:1px solid; border-color:#ffffff; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff; background-color:#357}\
    .ptentry {padding: 7px; border:1px solid; border-color:#000000; background-color:#ffeecc; white-space:nowrap;}\
    .ptErrText {font-weight:bold; color:#600000}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {border-size:3px; border-color:#000;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid black; background-color:red;}\
    input.pbDefButOff {cursor:pointer; border:1px solid black; background-color:#0a0;}\
    a.ptButton20 {color:#ffff80}\
    table.pbMainTab {empty-cells:show; margin-top:5px }\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 4px 0px 4px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; }\
    table.pbMainTab tr td.spacer {padding: 0px 0px;}\
    table.pbMainTab tr td.sel    {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid solid solid; background-color:#eed;}\
    table.pbMainTab tr td.notSel {font-weight:bold; font-size:13px; border: 1px solid; border-style: solid solid solid solid; background-color:#00a044; color:white; border-color:black;}\
    tr.pbPopTop td { background-color:#ded; border:none; height: 21px;  padding:0px; }\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.pbMainPopTop td { background-color:#ded; border:none; height: 42px;  padding:0px; }\
    tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .CPopup .CPopMain { background-color:#f8f8f8; padding:6px;}\
    .CPopup  {border:3px ridge #666}\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
	.pbButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* KOC Power Bot v"+ Version +" Loaded");
  readOptions();
  readCrestOptions();
  readTrainingOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }
  
  // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.pbWideScreen && Options.pbWinPos.x > 700){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    saveOptions ();
  }
  
  mainPop = new CPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 750,600, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions()
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  AddMainTabLink('BOT', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("KOC Power Bot v"+ Version +" Loaded  (KofC version: "+ anticd.getKOCversion() +")");
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  SpamEvery.init ();
  CollectGold.init();
  FoodAlerts.init();
  ChatPane.init();
  DeleteReports.init();
  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  setInterval (DrawLevelIcons,1250);
  setInterval (AutoTrain,30* 1000);
}

/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){  
    var f = FoodAlerts;
    var now = unixTime();
      row = [];

      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        if (usage < 0) {
    if (Options.pbFoodAlert && timeLeft<(6*3600)) {
                msg += 'My city ' + Cities.cities[i].name.substring(0,10) + ' (' +
                      Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += ' is low on food. Remaining: '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') Upkeep: '+addCommas(usage);
                sendChat ("/a " + msg);
          }
    }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
  },
}




/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabOrder: 10,
  tabLabel: 'Tower',
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],
  Providers : {
		0: { 'country': "--Country--", 'provider': "--Provider--" },
        1: { 'country': "AUSTRALIA", 'provider': "T-Mobile" },
        2: { 'country': "AUSTRALIA", 'provider': "Optus Zoo" },
        3: { 'country': "AUSTRIA", 'provider': "T-Mobile" },
        4: { 'country': "BULGARIA", 'provider': "Mtel" },
        5: { 'country': "BULGARIA", 'provider': "Globul" },
        6: { 'country': "CANADA", 'provider': "Aliant" },
        7: { 'country': "CANADA", 'provider': "Bell Mobility" },
        8: { 'country': "CANADA", 'provider': "Fido" },
        9: { 'country': "CANADA", 'provider': "MTS Mobility" },
        10: { 'country': "CANADA", 'provider': "Rogers Wireless" },
        11: { 'country': "CANADA", 'provider': "Sasktel Mobility" },
        12: { 'country': "CANADA", 'provider': "Telus" },
        13: { 'country': "CANADA", 'provider': "Virgin Mobile" },
        14: { 'country': "CANADA", 'provider': "Presidents Choice" },
        15: { 'country': "GERMANY", 'provider': "T-Mobile" },
        16: { 'country': "GERMANY", 'provider': "Vodafone" },
        17: { 'country': "GERMANY", 'provider': "O2" },
        18: { 'country': "GERMANY", 'provider': "E-Plus" },
        19: { 'country': "ICELAND", 'provider': "OgVodafone" },
        20: { 'country': "ICELAND", 'provider': "Siminn" },
        21: { 'country': "INDIA", 'provider': "Andhra Pradesh AirTel" },
        22: { 'country': "INDIA", 'provider': "Andhra Pradesh Idea Cellular" },
        23: { 'country': "INDIA", 'provider': "Chennal Skycell Airtel" },
        24: { 'country': "INDIA", 'provider': "Chennel RPG Cellular" },
        25: { 'country': "INDIA", 'provider': "Delhi Airtel" },
        26: { 'country': "INDIA", 'provider': "Delhi Hutch" },
        27: { 'country': "INDIA", 'provider': "Gujarat Idea Cellular" },
        28: { 'country': "INDIA", 'provider': "Gujaret Airtel" },
        29: { 'country': "INDIA", 'provider': "Gujaret Celforce" },
        30: { 'country': "INDIA", 'provider': "Goa Airtel" },
        31: { 'country': "INDIA", 'provider': "Goa BPL Mobile" },
        32: { 'country': "INDIA", 'provider': "Goa Idea Cellular" },
        33: { 'country': "INDIA", 'provider': "Haryana Airtel" },
        34: { 'country': "INDIA", 'provider': "Haryana Escotel" },
        35: { 'country': "INDIA", 'provider': "Himachal Pradesh Airtel" },
        36: { 'country': "INDIA", 'provider': "Karnataka Airtel" },
        37: { 'country': "INDIA", 'provider': "Kerala Airtel" },
        38: { 'country': "INDIA", 'provider': "Kerala Escotel" },
        39: { 'country': "INDIA", 'provider': "Kerala BPL Mobile" },
        40: { 'country': "INDIA", 'provider': "Kolkata Airtel" },
        41: { 'country': "INDIA", 'provider': "Madhya Pradesh Airtel" },
        42: { 'country': "INDIA", 'provider': "Maharashtra Airtel" },
        43: { 'country': "INDIA", 'provider': "Maharashtra BPL Mobile" },
        44: { 'country': "INDIA", 'provider': "Maharashtra Idea Cellular" },
        45: { 'country': "INDIA", 'provider': "Mumbai Airtel" },
        46: { 'country': "INDIA", 'provider': "Mumbai BPL Mobile" },
        47: { 'country': "INDIA", 'provider': "Punjab Airtel" },
        48: { 'country': "INDIA", 'provider': "Pondicherry BPL Mobile" },
        49: { 'country': "INDIA", 'provider': "Tamil Nadu Airtel" },
        50: { 'country': "INDIA", 'provider': "Tamil Nadu BPL Mobile" },
        51: { 'country': "INDIA", 'provider': "Tamil Nadu Aircel" },
        52: { 'country': "INDIA", 'provider': "Uttar Pradesh West Escotel" },
        53: { 'country': "IRELAND", 'provider': "Meteor" },
        54: { 'country': "IRELAND", 'provider': "Meteor MMS" },
        55: { 'country': "ITALY", 'provider': "TIM" },
        56: { 'country': "ITALY", 'provider': "Vodafone" },
        57: { 'country': "JAPAN", 'provider': "AU by KDDI" },
        58: { 'country': "JAPAN", 'provider': "NTT DoCoMo" },
        59: { 'country': "JAPAN", 'provider': "Vodafone Chuugoku/Western" },
        60: { 'country': "JAPAN", 'provider': "Vodafone Hokkaido" },
        61: { 'country': "JAPAN", 'provider': "Vodafone Hokuriko/Central North" },
        62: { 'country': "JAPAN", 'provider': "Vodafone Kansai/West, including Osaka" },
        63: { 'country': "JAPAN", 'provider': "Vodafone Kanto/Koushin/East including Tokyo" },
        64: { 'country': "JAPAN", 'provider': "Vodafone Kyuushu/Okinawa" },
        65: { 'country': "JAPAN", 'provider': "Vodafone Shikoku" },
        66: { 'country': "JAPAN", 'provider': "Vodafone Touhoku/Niigata/North" },
        67: { 'country': "JAPAN", 'provider': "Vodafone Toukai/Central" },
        68: { 'country': "JAPAN", 'provider': "Willcom" },
        69: { 'country': "JAPAN", 'provider': "Willcom di" },
        70: { 'country': "JAPAN", 'provider': "Willcom dj" },
        71: { 'country': "JAPAN", 'provider': "Willcom dk" },
        72: { 'country': "NETHERLANDS", 'provider': "T-Mobile" },
        73: { 'country': "NETHERLANDS", 'provider': "Orange" },
        74: { 'country': "SINGAPORE", 'provider': "M1" },
        75: { 'country': "SOUTH AFRICA", 'provider': "Vodacom" },
        76: { 'country': "SPAIN", 'provider': "Telefonica Movistar" },
        77: { 'country': "SPAIN", 'provider': "Vodafone" },
        78: { 'country': "SWEDEN", 'provider': "Tele2" },
        79: { 'country': "UNITED STATES", 'provider': "Teleflip" },
        80: { 'country': "UNITED STATES", 'provider': "Alltel" },
        81: { 'country': "UNITED STATES", 'provider': "Ameritech" },
        82: { 'country': "UNITED STATES", 'provider': "ATT Wireless" },
        83: { 'country': "UNITED STATES", 'provider': "Bellsouth" },
        84: { 'country': "UNITED STATES", 'provider': "Boost" },
        85: { 'country': "UNITED STATES", 'provider': "CellularOne" },
        86: { 'country': "UNITED STATES", 'provider': "CellularOne MMS" },
        87: { 'country': "UNITED STATES", 'provider': "Cingular" },
        88: { 'country': "UNITED STATES", 'provider': "Edge Wireless" },
        89: { 'country': "UNITED STATES", 'provider': "Sprint PCS" },
        90: { 'country': "UNITED STATES", 'provider': "T-Mobile" },
        91: { 'country': "UNITED STATES", 'provider': "Metro PCS" },
        92: { 'country': "UNITED STATES", 'provider': "Nextel" },
        93: { 'country': "UNITED STATES", 'provider': "O2" },
        94: { 'country': "UNITED STATES", 'provider': "Orange" },
        95: { 'country': "UNITED STATES", 'provider': "Qwest" },
        96: { 'country': "UNITED STATES", 'provider': "Rogers Wireless" },
        97: { 'country': "UNITED STATES", 'provider': "Telus Mobility" },
        98: { 'country': "UNITED STATES", 'provider': "US Cellular" },
        99: { 'country': "UNITED STATES", 'provider': "Verizon" },
        100: { 'country': "UNITED STATES", 'provider': "Virgin Mobile" },
        101: { 'country': "UNITED KINGDOM", 'provider': "O2 1" },
        102: { 'country': "UNITED KINGDOM", 'provider': "O2 2" },
        103: { 'country': "UNITED KINGDOM", 'provider': "Orange" },
        104: { 'country': "UNITED KINGDOM", 'provider': "T-Mobile" },
        105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" },
        106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" },
        107: { 'country': "BELGIUM", 'provider': "mobistar" },
        108: { 'country': "GERMANY", 'provider': "1und1" },
        109: { 'country': "UNITED STATES", 'provider': "MyCricket" },
        110: { 'country': "Philippines", 'provider': "Smart" },
        111: { 'country': "UNITED STATES", 'provider': "CellularSouth" }
    },

  init: function(div){
	var t = Tabs.tower;
    t.myDiv = div;
    
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    // t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    // unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

	  for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
		m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
	m += '</tr><TR align=center>';
	  for (var cityId in Cities.byID)
	   m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="Stop Sound Alert"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>CONFIGURATION</div><TABLE class=pbTab>\
    <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>Text message incoming attack to: <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold">(Standard text messaging rates apply)</span></td></tr><tr><td></td>\
    <TD align=left>Country: <select id="pbfrmcountry">';
    for (var i in t.Providers) {
       var ret=m.indexOf(t.Providers[i].country);
       if (ret==-1) {
         if (t.Providers[i].country==t.Providers[Options.celltext.provider].country) {
           m += '<option value="'+t.Providers[i].country+'" selected="selected">'+t.Providers[i].country+'</option>'; // Load Previous Provider Selection
         }
         else {
           m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
         }
       }
    }

    m += '</select>\
    <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--Provider--</option>';
    for (var i in t.Providers) {
 if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
		if(Options.celltext.provider == i)
			m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
		else
           m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
    }
    m += '</select></td></tr>\
        <TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>Automatically post incoming attacks to alliance chat.</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Message Prefix: &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>Alert on scouting: &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Alert on wild attack: &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Display defend status: &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>Minimum # of troops: &nbsp; </td><TD><INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> &nbsp; &nbsp; <span id=pbalerterr></span></td></tr>\
            </table></td></tr>\
        <TR><TD align=right><INPUT id=pbalertraid type=checkbox '+ (Options.alertConfig.raid?'CHECKED':'') +'/></td><TD>Stop raids on impending.</td></tr>\
        <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>Play sound on incoming attack/scout</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>Loading SWF player</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>Sound file: &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=55 maxlength=160 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value=Load><INPUT id=pbSoundDefault type=submit value=Default></td></tr>\
            <TR><TD align=right>Volume: &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> Repeat every <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> minutes</td></tr>\
            <TR><TD></td><TD>Play for <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> seconds</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="Play Now" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
  	t.myDiv.innerHTML = m;

//    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y');
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
    t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
    document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
    document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbalertraid').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
        Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
        t.loadUrl (Options.alertSound.soundUrl);
      }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
        document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
        Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.loadUrl (DEFAULT_ALERT_SOUND_URL);
      }, false);

    for (var cityId in Cities.byID){
  	  var but = document.getElementById ('pbtabut_'+ cityId);
  	  addListener (but, cityId);
  	  t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
  	  t.displayDefMode (cityId);
	  var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
	  }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
	function addTowerEventListener(cityId, name){
        document.getElementById(name).addEventListener('click', function(){
            t.showTowerIncoming(cityId);
        }, false);
    }	
    setInterval (t.eachSecond, 2000);
  },      

  show : function (){
  },
  
  hide : function (){
  },
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = 'Loading';
  },
  phonenum : function() {
   Options.celltext.num1 = document.getElementById('pbnum1').value;
   Options.celltext.num2 = document.getElementById('pbnum2').value;
   Options.celltext.num3 = document.getElementById('pbnum3').value;
   saveOptions();
  },

  setCountry : function(){
    var t = Tabs.tower;
    var myselect=document.getElementById("pbfrmprovider");
	myselect.innerHTML = '<option value=0 >--Provider--</option>';
	myselect.disabled = true;
    for (var i in t.Providers) {
     if (t.Providers[i].country == document.getElementById("pbfrmcountry").value){
		var addoption = document.createElement('option');
		addoption.value = i;
		addoption.text = t.Providers[i].provider;
      myselect.add(addoption, null) //add new option to end of "Providers"
     }
    }
	myselect.disabled = false;
   },

  setProvider : function(){
    var ddProvider = document.getElementById("pbfrmprovider").wrappedJSObject;
     Options.celltext.provider=ddProvider.options[ddProvider.selectedIndex].value;
	if(ddProvider.selectedIndex > 0){
		document.getElementById("pbnum1").disabled = false;
		document.getElementById("pbnum2").disabled = false;
		document.getElementById("pbnum3").disabled = false;
	} else {
		document.getElementById("pbnum1").disabled = true;
		document.getElementById("pbnum2").disabled = true;
		document.getElementById("pbnum3").disabled = true;
	}
    //alert(Options.celltext.provider);
   },

  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    t.loadUrl (Options.alertSound.soundUrl);
    setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
      t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    Options.alertConfig.raid=document.getElementById('pbalertraid').checked;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>INVALID</b></font>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    }
    Options.alertConfig.minTroops = mt;
	saveOptions();
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0)
      mode = 0;
    t.ajaxSetDefMode (cityId, mode, function (newMode){
        t.defMode[cityId] = newMode;
        t.displayDefMode (cityId);
      });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def = ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def = OFF';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
	for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
	  Options.alertConfig.raidautoswitch[cityId] = false;
    }
  	var now = unixTime();
	var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k];
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;  
            t.newIncoming (m);
          }
		  incomming = true;
		  if (Options.alertConfig.raid){
			Options.alertConfig.raidautoswitch[m.toCityId] = true;
		  }
        }
      }
    }
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime))
      t.stopSoundAlerts();

        t.towerMarches = [];
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            t['attackCount_' + cId] = 0;
            t['scoutCount_' + cId] = 0;
        }
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (var k in Seed.queue_atkinc) {
                var m = Seed.queue_atkinc[k];
                if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);

                }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
        }

	  
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (chan != 1)
      return;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
    if (chan != 1)
      return;
    if (isError)  
      document.getElementById('pbLoadStat').innerHTML = 'Error!';
    else
      document.getElementById('pbLoadStat').innerHTML = 'Loaded';
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play (1, 0);
    t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat)
      t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
    else
      Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    t.mss.stop (1);
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    document.getElementById('pbSoundStop').disabled = true;
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
    t.postToChat (m);
  },
  
  sendalert : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.celltext.atext)
      t.postToCell (m);
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
	if (Options.alertConfig.raid){
		Tabs.Raid.StopCityRaids(m.toCityId);
		Options.alertConfig.raidautoswitch[m.toCityId] = true;
	}  
  },

  ajaxSetDefMode : function (cityId, state, notify){
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.cid = cityId;
		params.state = state;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if (rslt.ok) {
					Seed.citystats["city" + cityId].gate = state;
					notify (state);
				}
			},
			onFailure: function () {
			}
		})
  },
  
  onUnload : function (){
  },



  postToCell : function (m){
    var t = Tabs.tower;
    var data = {};
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      data.atkType = 'scout';
    } else if (m.marchType == 4){
      data.atkType = 'atk';
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      data.target = 'city ('+ city.x +','+ city.y+')';
    else {
      if (!Options.alertConfig.wilds)
        return;
      data.target = 'wild';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          data.target += Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      data.who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      data.who = m.players['u'+m.pid].n;
    else
      data.who = 'Unknown';
  
    if (m.fromXCoord)
      data.who += m.fromXCoord +','+ m.fromYCoord;
     data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));
    var totTroops = 0;
    data.totTroops = ' '
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      data.totTroops += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;


    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        data.embassy = 'EMB '+ availSlots +'of'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            data.stat = 'HIDING';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            data.stat = 'DEFENDING';
        }
      }
    }
    data.provider = Options.celltext.provider;
    data.num1 = Options.celltext.num1;
    data.num2 = Options.celltext.num2;
    data.num3 = Options.celltext.num3;
    data.serverId = getServerId();
    data.player = Seed.player['name'];
    data.city = city.name;

  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://hs151.digitalweb.net/index.php',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
	data: implodeUrlArgs(data),

	})
  },
  
  postToChat : function (m){
    var t = Tabs.tower;
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv ("Incoming!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      atkType = 'scouted';
    } else if (m.marchType == 4){
      atkType = 'attacked';
    } else {
      return;
    }
    var target, atkType, who;
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = 'city at '+ city.x +','+ city.y;
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = 'wilderness';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at '+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = 'Unknown';
  
    if (m.fromXCoord)
      who += ' at '+ m.fromXCoord +','+ m.fromYCoord;
    var msg = Options.alertConfig.aPrefix +' ';
    msg += 'My '+ target +' is being '+ atkType  +' by '+ who +'. Incoming Troops (arriving in '+
        unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    var totTroops = 0;
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops)
      return;
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are HIDING!';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are DEFENDING!';
        }
      }
    }
	t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
  },
      handleTowerData: function(m){
        var t = Tabs.tower;
        var now = unixTime();
        var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
        var city = Cities.byID[m.toCityId];
        
        if (DEBUG_TRACE)
            logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        
        //ATKTYPE
        if (m.marchType == 3) {
            atkType = 'scouted';
            t['scoutCount_' + m.toCityId]++;
        }
        else
            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId)
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 13; i++)
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Troop')
                units[1] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Militiaman')
                units[2] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Scout')
                units[3] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Pikeman')
                units[4] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Swordsman')
                units[5] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Archer')
                units[6] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Cavalry')
                units[7] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Heavy Cavalry')
                units[8] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Wagon')
                units[9] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Ballista')
                units[10] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Battering Ram')
                units[11] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapult')
                units[12] = m.unts[k];
        }
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = Seed.players['u' + m.pid].a;
            allianceName = Seed.allianceNames[allianceId];
            diplomacy = getDiplomacy(allianceId);
        }
        else
            if (m.players && m.players['u' + m.pid]) {
                who = m.players['u' + m.pid].n;
                attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = 'a' + m.players['u' + m.pid].a;
                allianceName = Seed.allianceNames[allianceId];
                diplomacy = getDiplomacy(allianceId);
            }
            else {
                who = 'n.A.';
                attackermight = 'n.A.';
                allianceId = 'n.A.';
                allianceName = 'n.A.';
                diplomacy = 'n.A.';
            }
		//SOURCE
        if (m.fromXCoord)
            var source = m.fromXCoord + ',' + m.fromYCoord;
        else
            var source = 'n.A.';
        
        var arrivingDatetime = new Date();
        arrivingDatetime.setTime(m.arrivalTime * 1000);
        var count = t.towerMarches.length + 1;
        t.towerMarches[count] = {
            added: now,
            cityId: m.toCityId,
            target: target,
            arrival: parseIntNan(m.arrivalTime),
            atkType: atkType,
            who: who,
            attackermight: attackermight,
            allianceName: allianceName,
            diplomacy: diplomacy,
            rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
            arrivingDatetime: arrivingDatetime,
			source:source,
            units: units,
        };
    },
    showTowerIncoming: function(cityId){
        var t = Tabs.tower;
        var popTowerIncoming = null;
        var cityName = Tabs.build.getCityNameById(cityId);
        
        if (t.popTowerIncoming == null) {
            t.popTowerIncoming = new CPopup('pbtower_' + cityId, 0, 0, 750, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>Tower Report of ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
		clearTimeout (t.timer);
		t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        enc = {};
        numSlots = 0;
        var row = document.getElementById('pbCityTowerContent').innerHTML = "";
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (k in Seed.queue_atkinc) {
                march = Seed.queue_atkinc[k];
                if (march.marchType == 2) {
                    ++numSlots;
                    city = march.toCityId;
                    from = march.fromPlayerId;
					if (!enc[city])
                        enc[city] = {};
                    if (!enc[city][from])
                        enc[city][from] = [];
                    k = [];
                    k[0] = parseInt(march.knightCombat);
                    for (i = 1; i < 13; i++) {
                        if (Options.encRemaining)
                            k[i] = parseInt(march['unit' + i + 'Return']);
                        else
                            k[i] = parseInt(march['unit' + i + 'Count']);
                    }
					k[14] = parseInt(march.marchStatus);
					var now = unixTime();
					k[15] = parseInt(march.destinationUnixTime) - now;
                    enc[city][from].push(k);
                }
            }
        }
        var s1 = '';
		var s2 = '';
		var s3 = '';
		var tot = [];
        var atk = [];
        for (i = 0; i < 13; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
            
            for (k = 0; k < names.length; k++)
                s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
            s1 += '</tr>';
            dest = cityId;
            if (enc[dest]) {
                for (p in enc[dest]) {
                    try {
                        player = Seed.players['u' + p].n;
                    }
                    catch (err) {
                        player = '???';
                    }
                    for (m = 0; m < enc[dest][p].length; m++) {
                        /*knight = '';
                        if (enc[dest][p][m][0] > 0)
                            knight = ' (' + enc[dest][p][m][0] + ')';
						*/
						status = '';
                        if (enc[dest][p][m][14] == 1) {
						    status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
							if (enc[dest][p][m][15] < 0)
								status = ' (enc)';	
							else
								 status = ' (' + timestr(enc[dest][p][m][15]) + ')';	
						}
						if (enc[dest][p][m][14] == 2) {
						    status = ' (enc)';	
						}

                        s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
                        for (i = 1; i < 13; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                        //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>Reinforcment:</b></td>'
                for (i = 1; i < 13; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
			s1 += '<TR align=right><TD colspan=14><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>Own Troops:</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 13; r++) {
                cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
            s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Defenders:</b></td>';
            for (i = 1; i < 13; i++)
                s1 += '<TD class="tot">' + tot[i] + '</td>';      
			s3 += '</tr></table>';
        
        s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>Incoming Attacks:</b></td>';
        
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        
                        if (t.towerMarches[k].atkType == 'attacked') {
                            s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
                        }
                        else
                            if (t.towerMarches[k].atkType == 'scouted') {
                                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
                            }
                        s3 += '<TD width=15%  ><B>Location</b></td>';
                        s3 += '<TD width=15%  ><B>Name</b></td>';
						s3 += '<TD width=10%><B>Source: </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
                        s3 += '<TD width=10%><B>Might: </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
                        s3 += '<TD width=10%><B>Alliance: </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
                        s3 += '<TD width=10%><B>State: </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
                        s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
                        s3 += '<TD><B>Remaining: </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
                        s3 += '<TD><B>Arrival: </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
                        s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++)
                            s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
                        for (u = 1; u < 13; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
						s3 += '</tr></table>';
                    }
                }
                
            }
        }
		s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>Attackers:</b></td>';
        for (a = 1; a < 13; a++)
            s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
		var html = s1 + s2 + s3;
        document.getElementById('pbCityTowerContent').innerHTML = html;

    },
    sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
        //mid, cid, fromUid, fromCid, upkeep
        var params = Object.clone(g_ajaxparams);
        params.mid = mid;
        params.cid = cid;
        params.fromUid = fromUid;
        params.fromCid = fromCid;
        new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function(transport){
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    Modal.showAlert(g_js_strings.kickout_allies.troopshome);
                    seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
                    if (parseInt(fromUid) == parseInt(tvuid)) {
                        var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
                        var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
                        curmarch.returnUnixTime = unixTime() + marchtime;
                        curmarch.marchStatus = 8
                    }
                    delete seed.queue_atkinc["m" + mid]
                }
                else {
                    Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                }
            },
            onFailure: function(){
            }
        })
    },
}


/****************************  Build Implementation  ******************************
 TODO:
	 visu directly in the game of build queue elements
	 <span class="leveltag" style="left:60px;">10</span>
	 more todos within the code
 */
Tabs.build = {
    tabOrder: 20,
    tabLabel: 'Build',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
	loaded_bQ: [],
	lbQ: [],

    init: function(div){
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = "build";
		t.buildStates = {
            running: false,
			help: false,
        };
        t.readBuildStates();
        
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
			if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
				t["bQ_" + Cities.cities[i].id] = [];
			}
        }
        
        var m = '<DIV id=pbBuildDivF class=pbStat>BUILD FUNCTIONS</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = OFF"></td>';
        }
        else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="Auto Build = ON"></td>';
        }
		m += '<TD><INPUT id=pbBuildMode type=submit value="Build Mode = OFF"></td>';
		m += '<TD>Build Type: <SELECT id="pbBuildType">\
				<OPTION value=build>level up</option>\
				<OPTION value=max>level max</option>\
				<OPTION value=destruct>destruct</option>\
				</select></td>';
		m += '<TD><INPUT id=pbHelpRequest type=checkbox '+ (t.buildStates.help?' CHECKED':'') +'\></td><TD>Ask for help?</td>';
		m += '</tr></table></div>';
        m += '<DIV id=pbBuildDivQ class=pbStat>BUILD QUEUES</div><TABLE id=pbbuildqueues width=100% height=0% class=ptentry><TR>';
		for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
		m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="Show"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;
        
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
			t.showBuildQueue(cityId, false);
        }

        t.e_autoBuild(); //start checking if we can build someting
        
		document.getElementById('pbBuildType').addEventListener('change', function(){t.setBuildMode(this.value);}, false);
		document.getElementById('pbBuildRunning').addEventListener('click', function(){
            t.toggleStateRunning(this);
        }, false);
		document.getElementById('pbBuildMode').addEventListener('click', function(){
            t.toggleStateMode(this);
        }, false);
		document.getElementById('pbHelpRequest').addEventListener ('change', function (){
        t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
        t.saveBuildStates();
        }, false);
   	    
		window.addEventListener('unload', t.onUnload, false);
        
        function addQueueEventListener(cityId, name){
            document.getElementById(name).addEventListener('click', function(){
                t.showBuildQueue(cityId, true);
            }, false);
        }
    },
	setBuildMode: function (type) {
	    var t = Tabs.build;
		t.currentBuildMode = type;
	},	
    e_autoBuild: function(){
      var t = Tabs.build;
	    document.getElementById('pbbuildError').innerHTML = '';
      if (t.buildStates.running == true) {
          var now = unixTime();
		  //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
          for (var i = 0; i < Cities.cities.length; i++) {
              var cityId = Cities.cities[i].id;
              var isBusy = false;
              var qcon = Seed.queue_con["city" + cityId];
              if (matTypeof(qcon)=='array' && qcon.length>0) {
                if (parseInt(qcon[0][4]) > now)
                  isBusy = true;
                else
                  qcon.shift();   // remove expired build from queue        
              }              
			  //logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
              if (isBusy) {
                  //TODO add info of remaining build time and queue infos
              } else {
                 if (t["bQ_" + cityId].length > 0) { // something to do?
                 	 var bQi = t["bQ_" + cityId][0];   //take first queue item to build
					 t.doOne(bQi);;
					 //setTimeout(t.e_autoBuild, 10000); //should be at least 10
					 //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                 }
              }       	
            }
          }
		setTimeout(t.e_autoBuild, 10000); //should be at least 10
    },  
    doOne : function (bQi){
		var t = Tabs.build;
		var currentcityid = parseInt(bQi.cityId);
		var cityName = t.getCityNameById(currentcityid);
		var time = parseInt(bQi.buildingTime);
		var mult = parseInt(bQi.buildingMult);
		var attempt = parseInt(bQi.buildingAttempt);

		
		//mat/KOC Power Bot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749
		
		var mode = bQi.buildingMode;
		//  var mode = "build"; //FOR DEBUG
		
		var citpos = parseInt(bQi.buildingPos);
		//  var citpos = 6; //FOR DEBUG
		
		if (Seed.buildings['city' + currentcityid]["pos" + citpos] != undefined && Seed.buildings['city' + currentcityid]["pos" + citpos][0] != undefined) {	
			var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
			var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
			//  var bdgid = 13; //FOR DEBUG
			
			var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
			var curlvl = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
			//  var curlvl = 8; //FOR DEBUG

			var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
			var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
			//  var bid = 1523749; //FOR DEBUG
									
			if (curlvl > 8 && mode == 'build') {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Queue item deleted: Building Level equals 9 or higher!!!");
				return;
			};
			if (isNaN(curlvl)) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Found no correct value for current building!!!!");
				return;
			}
			if (l_bdgid != bdgid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building Type does not match!!!!");
				return;
			}
			if (l_bid != bid) {
				t.cancelQueueElement(0, currentcityid, time, false);
				actionLog("Building ID does not match!!!!");
				return;
			}
			if (l_curlvl < curlvl) {
					t.cancelQueueElement(0, currentcityid, time, false);
					actionLog("Queue item deleted: Buildinglevel is equal or higher!!!");
					return;
			}
			if (l_curlvl > curlvl && mode == 'build') {
					t.requeueQueueElement(bQi);
					return;
			}

			if (mode == 'destruct') {
				var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
				params.cid = currentcityid;
				params.bid = "";
				params.pos = citpos;
				params.lv = curlvl - 1;
				if (curlvl >= 1) {
					params.bid = bid;
				}
				params.type = bdgid;
				new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
					method: "post",
					parameters: params,
					onSuccess: function(rslt){
						if (rslt.ok) {
							actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
							Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
							if (params.cid == unsafeWindow.currentcityid)
								unsafeWindow.update_bdg();
							if (document.getElementById('pbHelpRequest').checked == true)
								t.bot_gethelp(params.bid, currentcityid);
							t.cancelQueueElement(0, currentcityid, time, false);
						} else {
							var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
							t.requeueQueueElement(bQi);
							document.getElementById('pbbuildError').innerHTML = errmsg;
							logit(errmsg);
						}
					},
					onFailure: function(){
						document.getElementById('pbbuildError').innerHTML = "Connection Error while destructing! Please try later again";
					}
				})
			}
			if (mode == 'build') {
				var invalid = false;
				var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
				for (var c = 0; c < chk[3].length; c++) {
					if (chk[3][c] == 0) {
						invalid = true;
					}
				}
				if (invalid == false) {							
					var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
					params.cid = currentcityid;
					params.bid = "";
					params.pos = citpos;
					params.lv = curlvl + 1;
					if (params.lv > 9){ //make sure that no level 10+ is built
						t.cancelQueueElement(0, currentcityid, time, false);
						actionLog("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!");
						return;
					}
					if (params.lv > 1) {
						params.bid = bid;
					}
					params.type = bdgid;
					
					new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
						method: "post",
						parameters: params,
						onSuccess: function(rslt){
							if (rslt.ok) {
								actionLog("Building " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);								
								Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
								Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
								Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
								Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(),  unsafeWindow.unixtime() + time, 0, time, citpos]);						
								if (params.cid == unsafeWindow.currentcityid)
									unsafeWindow.update_bdg();
								if (document.getElementById('pbHelpRequest').checked == true)
									t.bot_gethelp(params.bid, currentcityid);
								t.cancelQueueElement(0, currentcityid, time, false);
							} else {
								var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
								if (rslt.error_code == 103) { // building has already the target level => just  delete
									t.cancelQueueElement(0, currentcityid, time, false);
									actionLog("Queue item deleted: Building at this Level already exists or build process already started!");
								} else {
									t.requeueQueueElement(bQi);
									document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name +': '+ errmsg + " Item was requeued. Check for retry count.";
								}
								logit(errmsg);
							}
					},
						onFailure: function(){
							document.getElementById('pbbuildError').innerHTML = "Connection Error while building! Please try later again";
						}
					});
				} else {
					t.requeueQueueElement(bQi); // requeue item if check is invalid
				}
			}
		} else {
			t.cancelQueueElement(0, currentcityid, time, false);
			actionLog("Queue item deleted: Building does not exist!!!");
		}
	},
	requeueQueueElement: function (bQi) {
	    var t = Tabs.build;
		var cityId = bQi.cityId;
		var buildingPos = parseInt(bQi.buildingPos);
		var buildingId = parseInt(bQi.buildingId);
		var buildingLevel = parseInt(bQi.buildingLevel);
		var buildingType = parseInt(bQi.buildingType);
		var buildingTime = parseInt(bQi.buildingTime);
		var buildingMult = parseInt(bQi.buildingMult);
		var buildingAttempts = parseInt(bQi.buildingAttempts);
		var buildingMode = bQi.buildingMode;
		
		t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
		t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
	},
    show: function(){
		var t = Tabs.build;
    },
    bot_buildslot: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingPos   = c.id.split("_")[1];
        var buildingType  = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
  		var buildingAttempts = 0;
		var loaded_bQ = t["bQ_" + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}
		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = "build";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
	    var t = Tabs.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        } 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
				
		var knights = Seed.knights["city" + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) > 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        } 
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		
		var result = new Array(buildingMult, buildingTime);
		return result;
	},
	bot_buildguardian: function(c, a){
        var t = Tabs.build;
		var cityId = t.getCurrentCityId();
        var buildingType  = 50;
		for(i=0; i < Cities.numCities; i++){
			if(Seed.guardian[i].cityId == cityId){
				var buildingLevel = Seed.guardian[i].level;
				break;
			}
		}
		var buildingId    = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
		if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
  		var buildingAttempts = 0;
		var loaded_bQ = t["bQ_" + cityId];
		if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
			var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
		} else {
			var current_construction_pos = "";
		}
		if (loaded_bQ.length == 0 && current_construction_pos != "" ) { //check anyway if there is currently build in progess for this specific building
			if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
		} else {
			if (current_construction_pos != "" && current_construction_pos == buildingId) {
				buildingLevel += 1;
			}
			for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
				var loadedCity = loaded_bQ[i].cityId;
				var loadedSlot = loaded_bQ[i].buildingPos;
				if (loadedSlot == buildingPos && loadedCity == cityId) {
					buildingLevel += 1;
				}
				if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
					t.modalmessage('Destruction already in Queue!');
					return;
				}
			}
		}
        if (t.currentBuildMode == "build") {
		    if (buildingLevel >= 9) {
                t.modalmessage('Due to building requirements (DI), buildings above level 9\nshould be manualy built.');
                return;
            }
            var buildingMode = "build";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
			for (var bL = buildingLevel; bL <9; bL++) {
				var queueId = loaded_bQ.length;
				var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
				var buildingMult = result[0];
				var buildingTime = result[1];
				queueId = queueId ;
				t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
				t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
			}
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
			var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
			var buildingMult = result[0];
			var buildingTime = result[1];
			var queueId = loaded_bQ.length;
			t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
			t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }

    },
	calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
	    var t = Tabs.build;
		var now = unixTime();
		if (buildingMode == 'build') {
			var buildingMult = Math.pow(2, buildingLevel);
        } 
		if (buildingMode == 'destruct') {
			var buildingMult = Math.pow(2, buildingLevel - 2);
		}
				
		var knights = Seed.knights["city" + cityId];
		if (knights) {
			var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
			if (polKniId) {
				var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
				var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
				if ((polBoost - now) > 0) {
					polValue = parseInt(polValue * 1.25);
				}
			} else {
				polValue = 0;
			}
		} else {
			polValue = 0;
		}
        
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
		if (buildingMode == 'build') {
			buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
        }
		if (buildingMode == 'destruct') {
			buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
			if (buildingTime % 1 > 0) {
				buildingTime = parseInt(buildingTime);
			}
		}
		
		var result = new Array(buildingMult, buildingTime);
		return result;
	},
	bot_gethelp: function (f, currentcityid) {
		var t = Tabs.build;
		var city = t.getCityNameById(currentcityid);
	for (i=0;i<Seed.cities.length;i++) {
		if (Seed.cities[i][1]==city) var cityNum=i;
	}
	cityNum++;
	unsafeWindow.citysel_click(document.getElementById('citysel_'+ (cityNum)));
	  var a = qlist = Seed.queue_con["city" + currentcityid];
	  var e = 0;
	  var d = 0;
	  for (var c = 0; c < a.length; c++) {
		if (parseInt(a[c][2]) == parseInt(f)) {
		  e = parseInt(a[c][0]);
		  d = parseInt(a[c][1]);
		  break
		}
	  }
	  var b = new Array();
	  b.push(["REPLACE_LeVeLbUiLdInG", d]);
	  b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
	  b.push(["REPLACE_LeVeLiD", d]);
	  b.push(["REPLACE_AsSeTiD", f]);
	  var g = function(h, i) {
		unsafeWindow.continuation_95(h, i);
		if (!h) {
		  var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
		  unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)
		}
	  };
	  unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b)
	},
	addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
	var t = Tabs.build;
		var lbQ = t["bQ_" + cityId];
		lbQ.push({
            cityId: 			cityId,
            buildingPos:		buildingPos,
            buildingType: 		buildingType,
			buildingId: 		buildingId,
            buildingTime: 		buildingTime,
            buildingLevel: 		buildingLevel,
            buildingAttempts: 	buildingAttempts,
			buildingMult: 		buildingMult,
            buildingMode: 		buildingMode
        });
		t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
	},
    modalmessage: function(message){
	    var t = Tabs.build;
        var timeout = 10000;
        var content = "autoclose after 10sec...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
	modifyTotalTime: function (cityId, type, buildingTime) {
	    var t = Tabs.build;
		var element = document.getElementById('pbbuildcount_' + cityId);
		var currentCount = parseInt(element.innerHTML);
		if (type == "increase") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
			var currentCount = currentCount + 1;
		}
		if (type == "decrease") {
			t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
			var currentCount = currentCount - 1;
		}
		element.innerHTML = currentCount;
		document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
	},
    hide: function(){
        var t = Tabs.build;
		//unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function(){
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
            if (!ResetAll) GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode){
		var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        }
        else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
		if (buildingMode == "destruct") {
			row.insertCell(4).innerHTML = 0;
        } else {
			row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
		}
		row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function(){
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function(queueId, cityId, buildingTime, showQueue){
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time	
        
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function(cityId, focus){
	    var t = Tabs.build;
	    clearTimeout (t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new CPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function() {clearTimeout (t.timer);});
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';       
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>Build Queue of ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="Optimize by Time"></td>';
        t.paintBuildQueue(cityId);
        if (focus)
          t.popBuildQueue.show(true);
		document.getElementById('pbOptimizeByTime').addEventListener('click', function(){t.clearBuildQueue();t.paintBuildQueue(cityId, true);}, false);
		t.timer = setTimeout (function() {t.showBuildQueue(cityId, false)}, 45000);  
	},
    paintBuildQueue: function(cityId, optimize){
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
		if (optimize == true) {
			lbQ.sort(function(a,b){return a.buildingTime - b.buildingTime});
		}
		t["bQ_" + cityId] = lbQ;
		for (var i = 0; i < lbQ.length; i++) {
			var queueId = i;
			t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
	clearBuildQueue: function() {
	    var t = Tabs.build;
		var table = document.getElementById('pbCityQueueContent');
		var rows = table.rows;
		while(rows.length)
			table.deleteRow(rows.length-1);
	},
    getCurrentCityId: function(){ // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid)
            return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function(){
		var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function(){
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states)
                t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function(obj){
		var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            obj.value = "Auto Build = OFF";
        }
        else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = "Auto Build = ON";
        }
    },
    toggleStateMode: function(obj){
		var t = Tabs.build;
        if (obj.value == 'Build Mode = OFF') {
			unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
			var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			if(guardian.length >0)
				guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = "Build Mode = ON";
        }
        else {
			unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
			var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
			if(guardian.length >0)
				guardian[0].removeEventListener('click', t.bot_buildguardian, false);
			obj.value = "Build Mode = OFF";
        }
    },
	getCityNameById: function (cityId) {
    return Cities.byID[cityId].name;  	
	},
}


/********************************* Search Tab *************************************/

/***
TODO: Better search algorithm (circular OR square, always start at center, working outwards)
        Should be separate class (producer/consumer) so auto attack can use it too
**/

Tabs.Search = {
  tabOrder : 50,
  myDiv : null,
  MapAjax : new CMapAjax(),
  MAX_SHOW_WHILE_RUNNING : 250,
  popFirst : true,
  SearchList : [],
  
  init : function (div){
    var t = Tabs.Search;
    var Provinces = {1:{'name':"Tintagel",'x':75,'y':75},
				2:{'name':"Cornwall",'x':225,'y':75},
				3:{'name':"Astolat",'x':375,'y':75},
				4:{'name':"Lyonesse",'x':525,'y':75},
				5:{'name':"Corbenic",'x':675,'y':75},

				6:{'name':"Paimpont",'x':75,'y':225},
				7:{'name':"Cameliard",'x':225,'y':225},
				8:{'name':"Sarras",'x':375,'y':225},
				9:{'name':"Canoel",'x':525,'y':225},
				10:{'name':"Avalon",'x':675,'y':225},

				11:{'name':"Carmathen",'x':75,'y':375},
				12:{'name':"Shallot",'x':225,'y':375},
				//13:{'name':"-------",'x':375,'y':375},
				14:{'name':"Cadbury",'x':525,'y':375},
				15:{'name':"Glastonbury",'x':675,'y':375},

				16:{'name':"Camlamn",'x':75,'y':525},
				17:{'name':"Orkney",'x':225,'y':525},
				18:{'name':"Dore",'x':375,'y':525},
				19:{'name':"Logres",'x':525,'y':525},
				20:{'name':"Caerleon",'x':675,'y':525},

				21:{'name':"Parmenie",'x':75,'y':675},
				22:{'name':"Bodmin Moor",'x':225,'y':675},
				23:{'name':"Cellwig",'x':375,'y':675},
				24:{'name':"Listeneise",'x':525,'y':675},
				25:{'name':"Albion",'x':675,'y':675}};
    t.selectedCity = Cities.cities[0];
    t.myDiv = div;
    
    m = '<DIV class=ptentry><TABLE width=100% class=pbTab><TR><TD class=pbDetLeft>Search for: </td><TD width=99%>';
    m += htmlSelector ({0:"Barb Camp", 1:"Wilderness", 2:"Cities"}, null, 'id=pasrcType');
	m += '&nbsp; &nbsp; &nbsp; <span class=pbDetLeft>Search style: &nbsp;';
	m += htmlSelector({square:"Square", circle:"Circle"}, Options.srcdisttype, 'id=pbsrcdist');
    m += '</span></td></tr><TR><TD class=pbDetLeft>At: </td><TD class=xtab>X=<INPUT id=pasrchX type=text\> &nbsp;Y=<INPUT id=pasrchY type=text\>\
      &nbsp; Radius: <INPUT id=pasrcDist size=3 value=10 /> &nbsp; <SPAN id=paspInXY></span></tr>\
      <TR><TD class=pbDetLeft>Or:</td><TD>Search entire province: <select id="provinceXY"><option>--provinces--</option>';
    for (var i in Provinces)
    	m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
    m += '</select></td></tr>';
    m += '<TR><TD colspan=2 align=center><INPUT id=pasrcStart type=submit value="Start Search"/></td></tr>';
    m += '</table></div>\
        <DIV id="pasrcResults" style="height:400px; max-height:400px;"></div>';
    
    t.myDiv.innerHTML = m;
    var psearch = document.getElementById ("pasrcType");
    new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
    document.getElementById ('provinceXY').addEventListener ('click', function() {
    	  if (this.value >= 1) {
    		  document.getElementById ('pasrchX').value = Provinces[this.value].x;
    		  document.getElementById ('pasrchY').value = Provinces[this.value].y;
    		  document.getElementById ('pasrcDist').value = '75';
    	  }
	    }, false);
	document.getElementById('pbsrcdist').addEventListener ('change', function (){
      Options.srcdisttype = document.getElementById('pbsrcdist').value;
      saveOptions();
      }, false);
    document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
    document.getElementById ('pasrchX').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrcDist').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    unsafeWindow.pbSearchLookup = t.clickedLookup;  
    unsafeWindow.pbSearchScout = t.clickedScout;
    unsafeWindow.pbExportToRaid = t.ExportToRaid;
  },

  e_coordChange : function(){
    document.getElementById ('provinceXY').selectedIndex = 0;
  },
  
  hide : function (){
  },

  show : function (cont){
  },

  citySelNotify : function (city){
    var t = Tabs.Search;
    t.selectedCity = city;
    t.JumpCity(city.name);
  },
  
  JumpCity:function(city) {
    var t = Tabs.Search;
	for (i=0;i<Seed.cities.length;i++) {
		if (Seed.cities[i][1]==city) var cityNum=i;
	}
	cityNum++;
	var obj = document.getElementById('citysel_'+cityNum);
  	return t.ClickWin(window,obj,'click');
  },
  
  ClickWin:function(win,obj,evtName) {
  	var evt = win.document.createEvent("MouseEvents");
  	evt.initMouseEvent(evtName, true, true, win,
  		0, 0, 0, 0, 0, false, false, false, false, 0, null);
  	return !obj.dispatchEvent(evt);
  },
  
  helpPop : function (){
       var helpText = 'Troop numbers (from KOC WIKI):<BR>';
       helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Barbarian_Camps">A lot more can be found on Koc Wikia</a>';
       helpText += '<TABLE><TR><TD>Lvl</td><TD>Troops</td></tr>';
       helpText += '<TR><TD>1</td><TD>500 Supply Troops + 500 Archers</td></tr>';
       helpText += '<TR><TD>2</td><TD>500 Supply Troops + 2500 Archers</td></tr>';
       helpText += '<TR><TD>3</td><TD>500 Supply Troops + 5000 Archers</td></tr>';
       helpText += '<TR><TD>4</td><TD>500 Supply Troops + 7500 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>15000 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>12000 Archers IF Level 10 fletching and Level 9 Featherweight</td></tr>';
       helpText += '<TR><TD>6</td><TD>25000 Archers IF Level 9 fletching</td></tr>';
       helpText += '<TR><TD>6</td><TD>22000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>45000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>44000 Archers IF Level 10 fletching and knight 69+</td></tr>';
       helpText += '<TR><TD>7</td><TD>40000 Archers IF Level 10 fletching and knight 94+</td></tr>';
       helpText += '<TR><TD>8</td><TD>28000 Ballista WITH Level 10 fletching and Knight 91+</td></tr>';
       helpText += '<TR><TD>9</td><TD>56000 Ballista WITH Level 10 fletching and Knight 98+</td></tr>';
       helpText += '<TR><TD>10</td><TD>125000 Catapults (500 Catapults loss!)</td></tr></tr></table>';
  
       var pop = new CPopup ('giftHelp', 0, 0, 425, 375, true);
       pop.centerMe (mainPop.getMainDiv());  
       pop.getMainDiv().innerHTML = helpText;
       pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help: Raids</b></center>';
       pop.show (true);
     },
     
     
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch ('SEARCH CANCELLED!');
      return;
    }
    t.opt.searchType = document.getElementById ('pasrcType').value;
    t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
    t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    t.opt.searchShape = Options.srcdisttype;
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X must be between 0 and 749<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y must be between 0 and 749<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>75)
      errMsg += "Radius (distance) must be between 1 and 75<BR>";
    if (errMsg != ''){
      document.getElementById('pasrcResults').innerHTML = '<FONT COLOR=#660000>ERROR:</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('pasrcStart').value = 'Stop Search';
    m = '<DIV class=pbStat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=pastatSearched></div></td>\
        <TD class=xtab align=center><SPAN style="white-space:normal" id=pastatStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=pastatFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top>\
            <TD width=99% style="max-width:50px"><DIV id=padivOutTab style="height:380px; max-height:380px; overflow-y:auto;"></div></td>\
            <TD align=center valign=middle><A id=pbAhideShow style="text-decoration:none; cursor:pointer;"><DIV style="width:1em; border:1px solid red; padding:10px 2px; background-color:#fee"><SPAN id=spanHideShow> H I D E</span><BR><BR> L<BR>I<BR>S<BR>T<BR><BR> O<BR>P<BR>T<BR>I<BR>O<BR>N<BR>S </div></a></td>\
            <TD width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=padivOutOpts></div></td>\
          </table>';
      
    document.getElementById('pasrcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      var typeName = 'Barbarians';
    else if (t.opt.searchType == 1)
      var typeName = 'Wildernesses';
    else
      var typeName = 'Cities';
    if (t.opt.searchShape == 'square')
      var distName = 'Distance';
    else
      var distName = 'Radius';
    m = '<CENTER><B>Search for '+ typeName +'<BR>\
        Center: '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+ distName +': '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=ptentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>LIST OPTIONS:</b><BR></td></tr>';
        
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>Min. level to show:</td><TD class=xtab> <INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>Max. level to show:</td><TD class=xtab> <INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
		}
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>Wilderness Type:</td><TD class=xtab><SELECT id=pafilWildType>';
      m += htmlOptions ( {1:'Glassland/Lake', 3:'Woodlands', 4:'Hills', 5:'Mountain', 6:'Plain', 0:'ALL'}, Options.wildType );
	  m+= '</select></td></tr>';
	  m+= '<TR><TD class=xtab align=right>Glassland/Lake:</td><TD class=xtab><INPUT name=pbfil id=pafilGrass type=CHECKBOX '+ (Options.GrassOnly?' CHECKED':'') +'\><td></tr>';
	  m+= '<TR><TD class=xtab align=right>Woodlands:</td><TD class=xtab><INPUT name=pbfil id=pafilWood type=CHECKBOX '+ (Options.WoodOnly?' CHECKED':'') +'\><td></tr>';
	  m+= '<TR><TD class=xtab align=right>Hills:</td><TD class=xtab><INPUT name=pbfil id=pafilHill type=CHECKBOX '+ (Options.HillOnly?' CHECKED':'') +'\><td></tr>';
	  m+= '<TR><TD class=xtab align=right>Mountain:</td><TD class=xtab><INPUT name=pbfil id=pafilMount type=CHECKBOX '+ (Options.MountOnly?' CHECKED':'') +'\><td></tr>';
	  m+= '<TR><TD class=xtab align=right>Plain:</td><TD class=xtab><INPUT name=pbfil id=pafilPlain type=CHECKBOX '+ (Options.PlainOnly?' CHECKED':'') +'\><td></tr>';
	  m+= '<TR><TD class=xtab align=right>All:</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
      m += '</select></td></tr><TR><TD class=xtab align=right>Unowned Only:</td><TD class=xtab><INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>Level</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
			</select></td></tr>\
			<TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
			</table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
    } else {
		m+= '</select></td></tr><TR><TD class=xtab align=right>Misted:</td><TD class=xtab><INPUT name=pbfil id=pafilMisted type=CHECKBOX '+ (Options.mistedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Hostile:</td><TD class=xtab><INPUT name=pbfil id=pafilHostile type=CHECKBOX '+ (Options.hostileOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Friendly:</td><TD class=xtab><INPUT name=pbfil id=pafilFriendly type=CHECKBOX '+ (Options.friendlyOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Allied:</td><TD class=xtab><INPUT name=pbfil id=pafilAllied type=CHECKBOX '+ (Options.alliedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Neutral:</td><TD class=xtab><INPUT name=pbfil id=pafilNeutral type=CHECKBOX '+ (Options.neutralOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Unallianced:</td><TD class=xtab><INPUT name=pbfil id=pafilunAllied type=CHECKBOX '+ (Options.unalliedOnly?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>All:</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
		m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>Might</option>\
             <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>Distance</option>\
        </select></td></tr>\
		<TR><TD class=xtab align=right>Min might:</td><TD class=xtab><INPUT type=text id=paminmight size=6 value='+ Options.minmight +'>\
        <TR><TD class=xtab align=right>Coordinates only:</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
        </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
	
	}
    document.getElementById('padivOutOpts').innerHTML = m;
	 if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    document.getElementById('pafilMinLvl').addEventListener ('change', function (){
      Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
      Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
	  }
    document.getElementById('pafilSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('pafilSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('pafilWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('pafilWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('pafilUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
    }
	if (t.opt.searchType == 2){
		document.getElementById('pafilMisted').addEventListener ('change', function (){
        Options.mistedOnly = (document.getElementById('pafilMisted').checked);
		if(!Options.mistedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.mistedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilHostile').addEventListener ('change', function (){
        Options.hostileOnly = (document.getElementById('pafilHostile').checked);
		if(!Options.hostileOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.hostileOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilFriendly').addEventListener ('change', function (){
        Options.friendlyOnly = (document.getElementById('pafilFriendly').checked);
		if(!Options.friendlyOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.friendlyOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilAllied').addEventListener ('change', function (){
        Options.alliedOnly = (document.getElementById('pafilAllied').checked);
		if(!Options.alliedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.alliedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilNeutral').addEventListener ('change', function (){
        Options.neutralOnly = (document.getElementById('pafilNeutral').checked);
		if(!Options.neutralOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.neutralOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilunAllied').addEventListener ('change', function (){
        Options.unalliedOnly = (document.getElementById('pafilunAllied').checked);
		if(!Options.unalliedOnly){
			document.getElementById('pafilAll').checked = false;
			Options.srcAll = Options.unalliedOnly;
		}
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('pafilAll').addEventListener ('change', function (){
        Options.srcAll = (document.getElementById('pafilAll').checked);
		for(i in document.getElementsByName('pbfil'))
			document.getElementsByName('pbfil')[i].checked = Options.srcAll;
		Options.mistedOnly=Options.hostileOnly=Options.friendlyOnly=Options.alliedOnly=Options.neutralOnly=Options.unalliedOnly=Options.srcAll;
        saveOptions();
        t.dispMapTable ();
        }, false);
		document.getElementById('paminmight').addEventListener ('change', function (){
        Options.minmight = parseIntNan(document.getElementById('paminmight').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
	
	}
	
    document.getElementById('pbAhideShow').addEventListener ('click', t.hideShowClicked, false);
	
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ xxx +','+ yyy;
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },

  hideShowClicked : function (){
    var div = document.getElementById('padivOutOpts');
    if (div.style.display == 'none'){
      div.style.display = 'block';
      document.getElementById('spanHideShow').innerHTML = 'H I D E';
    } else {
      div.style.display = 'none';
      document.getElementById('spanHideShow').innerHTML = 'S H O W';
    }
  },
  
  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('pacoordsOnly').checked;
    if (DEBUG_SEARCH) DebugTimer.start();
     function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
	  if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      return a[2] - b[2];
    }
	
    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (t.opt.searchType==2 && type==7 ) {
		if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5])
		if((Options.hostileOnly && t.mapDat[i][12] == 'h') ||
		   (Options.mistedOnly && t.mapDat[i][5]===true) ||
		   (Options.friendlyOnly && t.mapDat[i][12] == 'f') ||
		   (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
		   (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
		   (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
		   (Options.srcAll))
				dat.push(t.mapDat[i]);
      } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0 || Options.wildType==0
        ||  (Options.wildType==1 && (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
	  }
    }
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('pastatFound').innerHTML = 'Found: '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>None found</center>';
    } else {
      dat.sort(mySort);
      if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td></tr>';
      else {
      if (t.opt.searchType == 2) {
			 m = '<TABLE id=pasrcOutTab class=pbSrchResults cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Loc</td><TD align=right>Dist</td><TD>Player</td><TD align=right>Might</td><TD>Alliance</td><TD>Online</td><TD></td></tr>';
		} else {
			m = '<TABLE id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>Location</td><TD style="padding-left: 10px">Distance</td><TD style="padding-left: 10px;">Lvl</td><TD width=100px> &nbsp; Type</td><TD></td><TD>Export to Raid</td></tr>';
		}
	}
      var numRows = dat.length;
      if (numRows > t.MAX_SHOW_WHILE_RUNNING && t.searchRunning){
        numRows = t.MAX_SHOW_WHILE_RUNNING;
        document.getElementById('pasrchSizeWarn').innerHTML = '<FONT COLOR=#600000>NOTE: Table only shows '+ t.MAX_SHOW_WHILE_RUNNING +' of '+ dat.length +' results until search is complete.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR><TD><DIV onclick="pbGotoMap('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly) {
          m += '</tr>';
        } else {
          if (t.opt.searchType == 2) { // city search
            m += '<TD align="right" >'+ dat[i][2].toFixed(2) +'</td>';
            if (dat[i][5])
              m += '<TD colspan=4>* MISTED * &nbsp; &nbsp; <SPAN onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A>Scout</a></span></td></tr>';
            else{
              var allStyle = '';
              if (dat[i][12]=='f')
                allStyle = 'class=pbTextFriendly';
              else if (dat[i][12]=='h')
                allStyle = 'class=pbTextHostile';
              m += '<TD>'+ dat[i][9]+'</td><TD align=right>'+ dat[i][10] +'</td><TD><SPAN '+ allStyle +'>'+ dat[i][11]+'</span></td><TD>'+(dat[i][13]?'<SPAN class=boldDarkRed>ONLINE</span>':'')+'</td><TD><A onclick="pbSearchLookup('+ dat[i][7] +')">Lookup</a></td></tr>';
            }
			} else {
          m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
            +'</td><TD  valign="top">'+ (dat[i][5]?(dat[i][6]!=0?' <A onclick="pbSearchLookup('+dat[i][6]+')">OWNED</a>':'<A onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;">MISTED</a>'):'') +'</td>';
          if (t.opt.searchType == 0) m+= '<TD align=center  valign="top"><A onclick="pbExportToRaid('+ dat[i][0]+','+dat[i][1] +')">Export</a></td>';
          m+='</tr>';
			}
		}
			
       }
      m += '</table>';
    }
    document.getElementById('padivOutTab').innerHTML = m;
    dat = null;
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('pastatStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('pasrcStart').value = 'Start Search';
    document.getElementById ('pasrchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Export Results', 'id=pbSrcDoExp') +'</center>';
      document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
	if (t.opt.searchType==2){
	  document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20('Generate Scout List', 'id=pbSrcDoScout') +'</center>';
      document.getElementById ('pbSrcDoScout').addEventListener ('click', t.generateScoutList, false);
	}
    t.searchRunning = false;
    t.dispMapTable();
  },

  exportKOCattack : function (){
    var t = Tabs.Search;
    var bulkAdds = {};
    for (i=1; i<11; i++)
      bulkAdds['lvl'+ i] = [];
    for (i=0; i<t.mapDat.length; i++){
      var lvl = parseInt (t.mapDat[i][4]);
      if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
        bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
    }
    exportToKOCattack.doExport (bulkAdds, t.selectedCity);
  },
  
  generateScoutList : function (){
    var t = Tabs.Search;
    var bulkScout = [];
    for (i=0; i<t.mapDat.length; i++){
      if (t.mapDat[i][3] == 7){
		if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5]){
		if((Options.hostileOnly && t.mapDat[i][12] == 'h') ||
		   (Options.mistedOnly && t.mapDat[i][5]===true) ||
		   (Options.friendlyOnly && t.mapDat[i][12] == 'f') ||
		   (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
		   (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
		   (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
		   (Options.srcAll))
			bulkScout.push({x:t.mapDat[i][0], y:t.mapDat[i][1], dist:t.mapDat[i][2]});
		}
	  }
    }
	if(t.selectedCity == null)
		t.selectedCity = Cities.cities[0];
    t.ShowScoutList (bulkScout, t.selectedCity);
  },
  ShowScoutList : function (coordlist, city){
	var t = Tabs.Search;
	var popScout = null;
	t.scoutcity = city;
	
	if(popScout==null){
	  popScout = new CPopup ('pbsrcscout', 0,0, 350,500, true, function (){popScout.destroy(); popScout=null;});
      popScout.centerMe (mainPop.getMainDiv());  
    }
	var m = '<DIV class=pbStat>Auto Scout Options</div>';
		m += '<DIV>Amount of Scouts to send: <input id=pbsrcScoutAmt value="'+Options.srcScoutAmt+'" /></div><BR>';
		m += '<DIV>Select City: <span id=pbsrcScoutcitypick> </span></div><BR>';
		m += '<DIV class=pbStat>Scout from <span id=pbsrcScoutcity>'+city.name+'</span> <BR> Total targets '+coordlist.length+'</div>';
		m += '<DIV style="max-height:220px; overflow-y:auto;"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW><TR style="font-weight:bold; background-color:white"><TD width=15><input type=checkbox id=pbsrcScout_All /></td><TD>Target Coords</td></tr>';
	  for(i=0; i<coordlist.length; i++){
			m += '<TR style="background-color:white"><TD><input type=checkbox name=pbsrcScoutCheck id="pbsrcScoutCheck_'+coordlist[i].x+'_'+coordlist[i].y+'" value="'+coordlist[i].x+'_'+coordlist[i].y+'" /></td><TD>'+coordLink(coordlist[i].x,coordlist[i].y)+'</td></tr>';
	  }
	    m += '</table></div>';
		m += '<BR><CENTER>'+ strButton20('Start Scout', 'id=pbSrcStartScout') +'</center>';
		m += '<CENTER><DIV style="width:70%; max-height:75px; overflow-y:auto;" id=pbSrcScoutResult></DIV></center>';
	popScout.getMainDiv().innerHTML = m;
	new CdispCityPicker ('pbScoutPick', document.getElementById('pbsrcScoutcitypick'), false, function(c,x,y){document.getElementById('pbsrcScoutcity').innerHTML = c.name; t.scoutcity = c; }, city.idx);
	popScout.getTopDiv().innerHTML = '<CENTER><B>Power Bot Scout List</b></center>';
	popScout.show(true);
	
	document.getElementById('pbsrcScoutAmt').addEventListener('change', function(){
		Options.srcScoutAmt = parseInt(document.getElementById('pbsrcScoutAmt').value);
		saveOptions();
	}, false);
	document.getElementById('pbsrcScout_All').addEventListener('change', function(){
		for(k in document.getElementsByName('pbsrcScoutCheck'))
			document.getElementsByName('pbsrcScoutCheck')[k].checked = document.getElementById('pbsrcScout_All').checked;
	}, false);
	document.getElementById('pbSrcStartScout').addEventListener('click', t.clickedStartScout, false);
  },
  scouting : false,
  scoutcity : null,
  doScout : function(list, city){
	var t = Tabs.Search;
	document.getElementById('pbSrcScoutResult').innerHTML = '';
	if(list.length < 1){
		document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERROR: No coords selected</span>';
		t.clickedStartScout();
		return;
	}
	if(parseInt(Seed.units['city'+city.id]['unt'+3]) < Options.srcScoutAmt){
		document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>ERROR: No scouts available</span>';
		t.clickedStartScout();
		return;
	}
	t.doScoutCount(list, city, list.length, 0);
	
  },
  doScoutCount : function(list, city, total, count){
	var t = Tabs.Search;
	if(!t.scouting){
		document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>Scouting stopped by user</span><BR>';
		document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
		document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Start Scout</span>';
		return;
	}
	if(total <= (count)){
		document.getElementById('pbSrcScoutResult').innerHTML += 'Done!<BR>';
		t.clickedStartScout();
		return;
	}
	var rallypointlevel = t.getRallypoint(city.id);
	var slots = 0;
       for (z in Seed.queue_atkp['city'+city.id]){
             slots++;
       }
    if  (Seed.queue_atkp['city'+city.id].toSource() == "[]") slots=0;

	if(slots >= rallypointlevel){
		setTimeout(function(){t.doScoutCount(list, city, total, count)}, 5000);
		document.getElementById('pbSrcScoutResult').innerHTML += 'Waiting for rally point to clear...';
		return;
	}
	var coords = list[count].split("_");
	if(coords[0] == 'undefined' || coords[1] == 'undefined'){
		document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>ERROR: Invalid coords</span>';
		t.clickedStartScout();
		return;
	}
	document.getElementById('pbSrcScoutResult').innerHTML += 'Sending scouts to '+coords[0]+','+coords[1]+'...';
	document.getElementById('pbsrcScoutCheck_'+coords[0]+'_'+coords[1]).checked = false;
	t.sendScout(coords[0], coords[1], city, count, function(c){t.doScoutCount(list, city, total, c)});
  },
  sendScout : function(x, y, city, count, notify){
	var t = Tabs.Search;
	count = parseInt(count);
	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
	params.kid = 0;
	params.type = 3;
	params.xcoord = x;
	params.ycoord = y;
	params.u3 = Options.srcScoutAmt;
	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
		 method: "post",
		 parameters: params,
		 loading: true,
		 onSuccess: function (rslt) {
		 rslt = eval("(" + rslt.responseText + ")");
		 if (rslt.ok) {
			 var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
			 var ut = unixTime();
			 var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
			 var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
			 for(i = 0; i <= unitsarr.length; i++){
				if(params["u"+i]){
				unitsarr[i] = params["u"+i];
				}
			 }
			 var currentcityid = params.cid;
			 unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
			 if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
			 document.getElementById('pbSrcScoutResult').innerHTML += 'Sent!<BR>';
			 if (notify)
			  setTimeout(function(){ notify(count+1); }, 1000);
		 } else {
			 document.getElementById('pbSrcScoutResult').innerHTML += 'Failed! Retrying....<BR>';
			 if (notify)
			  setTimeout(function(){ notify(count); }, 1000);
		  }
		},
		onFailure: function () {}
  		});
  },
  getRallypoint: function(cityId){
      var t = Tabs.Search;
	  cityId = 'city'+cityId;
      for (o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12){
			return parseInt(buildingLevel);
			break;
		}
	   }
	  return 0;
    },
	clickedStartScout : function(){
	var t = Tabs.Search;
		if(t.scouting == false){
			t.scouting = true;
			var ScoutList = [];
			for(k=0; k<document.getElementsByName('pbsrcScoutCheck').length; k++){
				if(document.getElementsByName('pbsrcScoutCheck')[k].checked){
					ScoutList.push(document.getElementsByName('pbsrcScoutCheck')[k].value);
				}
			}
			t.doScout(ScoutList, t.scoutcity);
			document.getElementById('pbSrcStartScout').className = 'button20 pbButCancel';
			document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Stop</span>';
		} else {
			t.scouting = false;
			document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
			document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>Start Scout</span>';
		}
	},
    
  
/** mapdata.userInfo:
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/
  mapCallback : function (uList){
    var t = Tabs.Search;

    var rslt = t.SearchList;
	map = rslt.data;
    var Dip = Seed.allianceDiplomacies;	
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
	
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
		    type = 7;
      } else
        continue;
        
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if ((t.opt.searchShape=='circle' && dist <= t.opt.maxDistance)
      ||  (t.opt.searchShape=='square' && map[k].xCoord>=t.firstX && map[k].xCoord<=t.lastX && map[k].yCoord>=t.firstY && map[k].yCoord<=t.lastY)){
	  	  if (t.opt.searchType==2) {    // if city search
    			var isMisted = map[k].tileUserId == 0 || false;		
    			var uu = 'u'+map[k].tileUserId;
    			var aD = '';
  				var nameU = '';
  				var mightU = '';
  				var aU = '';
    			if (!isMisted && userInfo[uu]) {
    				nameU = userInfo[uu].n;   // can error, must check if (userInfo[uu])
    				mightU = userInfo[uu].m;
    				if (alliance['a'+userInfo[uu].a])
    					aU = alliance['a'+userInfo[uu].a];
    				else
    				  aU = '----';
    				aD = '';
    				if (Dip.friendly && Dip.friendly['a'+userInfo[uu].a]) aD = 'f';
    				if (Dip.hostile && Dip.hostile['a'+userInfo[uu].a]) aD = 'h';
					if (Dip.allianceId && Dip.allianceId==userInfo[uu].a) aD = 'a';
					if (getDiplomacy(userInfo[uu].a) == 'neutral') aD = 'n';
					if (!userInfo[uu].a || userInfo[uu].a==0) aD = 'u';
					
    			}
// TODO: save memory, remove city name ?   			
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD, uList.data[map[k].tileUserId]?1:0]);
        } else {
          isOwned = map[k].tileUserId>0 || map[k].misted;
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (map[k].tileUserId>0? map[k].tileUserId : 0), uList.data[map[k].tileUserId]?1:0]);
        }
        ++t.tilesFound;
      }
    }
    
    t.tilesSearched += (15*15);
    document.getElementById('pastatSearched').innerHTML = 'Searched: '+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch ('Done!');
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },
  
  eventgetplayeronline : function (left, top, width, rslt){
	var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch ('ERROR: '+ rslt.errorMsg);
      return;
    }
	
	map = rslt.data;
	t.SearchList = rslt;
	var uList = [];
	for(k in map){
		if(map[k].tileUserId != null)
			uList.push(map[k].tileUserId);
	}
	t.fetchPlayerStatus (uList, function(r){ t.mapCallback(r)});
  },

  clickedScout : function (x, y){
    unsafeWindow.modal_attack (3, x, y);
    CwaitForElement ('modal_attack', 5000, function (){document.getElementById('modalBox1').style.zIndex='112000'});
  },
    
  clickedLookup : function (pid){
    var t = Tabs.Search;
    var pop = new CPopup ('pbsrclookup', 0,0, 500,500, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>Player Lookup</b></center>';
    pop.getMainDiv().innerHTML = '<DIV class=pbStat>Leaderboard information</div><SPAN id=pblupLB>Looking up leaderboard...</span>\
      <BR><DIV class=pbStat>Alliance Lookup</div><SPAN id=pblupAI>Looking up alliance info...</span>';
    pop.show (true);
    t.fetchLeaderboard (pid, function (r){t.gotPlayerLeaderboard(r, document.getElementById('pblupLB'))});
    t.fetchPlayerInfo (pid, function (r){t.gotPlayerInfo(r, document.getElementById('pblupAI'))});
  },

  ExportToRaid : function (X,Y){
    var t = Tabs.Search;
    var cityId =t.selectedCity['id'];
    var pop = new CPopup ('pbExportRaid', 0,0, 800,300, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>Export to Raid</b></center>';
    
	  var m = '<TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
	  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="0"></td></tr>';
	  
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
	  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="0"></td></tr>';
	  
	  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
	  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
	  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
	  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="0"></td>';
	  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="0"></td></tr></table>';
	  
	  m += '<BR><CENTER>' +strButton20('Help', 'id=pbHelp')+'<SELECT id=RaidKnights type=list></select></center>';
	  m+= '<BR><CENTER>'+ strButton20('Raid and save', 'id=pbRaidSave') +'</center>';
          
    pop.getMainDiv().innerHTML = m;
    
    t.getKnights();
    
    document.getElementById ('pbHelp').addEventListener ('click', t.helpPop, false);
    document.getElementById ('pbRaidSave').addEventListener ('click', function(){
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    			  		
    	params.pf = 0;
        params.ctrl = 'BotManager';
    	params.action = 'saveMarch';
    	params.settings = {};
    	params.settings.cityId = cityId;
    	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};    	
    	params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('RaidKnights').value);
    	params.queue[0].cityMarches.toXCoord = X;
    	params.queue[0].cityMarches.toYCoord = Y;
    	params.queue[0].cityMarches.unit0Count = 0;
    	params.queue[0].cityMarches.unit1Count = parseInt(document.getElementById ('Unit1').value);
    	params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
    	params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
    	params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
    	params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
    	params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
    	params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
    	params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
    	params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
    	params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
    	params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
    	params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
    	
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
			  		method: "post",
			         parameters: params,
					 loading: true,
					 onSuccess: function(transport){
						var rslt = eval("(" + transport.responseText + ")");
	                      if (rslt.ok) {
	                      		pop.show (false);
								unsafeWindow.cityinfo_army();
	                          setTimeout(unsafeWindow.update_seed_ajax, 250);
						 } else ('Error :' + rslt.msg);
						 
					 },
			 });
    	}, false);
    
    pop.show (true);
  },
  
  
  getKnights : function(){
         var t = Tabs.Search;
         var knt = new Array();
         cityId = t.selectedCity['id'];
         for (k in Seed.knights['city' + cityId]){
         		if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
         			knt.push ({
         				Name:   Seed.knights['city' + cityId][k]["knightName"],
         				Combat:	parseInt(Seed.knights['city' + cityId][k]["combat"]),
         				ID:		Seed.knights['city' + cityId][k]["knightId"],
         			});
         		}
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('RaidKnights').options.length=0;
  		var o = document.createElement("option");
  		o.text = '--Choose a Knight--';
  		o.value = 0;
  		document.getElementById("RaidKnights").options.add(o);
         for (k in knt){
      			if (knt[k]["Name"] !=undefined){
  	    			var o = document.createElement("option");
  	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
  	    			o.value = knt[k]["ID"];
  	    			document.getElementById("RaidKnights").options.add(o);
      			}
      	}
      },
  
  
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>Leaderboard:</b> Not found! (misted?)<BR><BR>';
      return;
    }
    var p = rslt.results[0];
    var x;
    var name = '';
    if (p.playerSex == 'M')
      name = 'Lord ';
    else if (p.playerSex == 'F')
      name = 'Lady ';   
    name += p.displayName;      
    if ((x = officerId2String(p.officerType)) != '')  
      name += ' ('+ x + ')';  
    var aName = p.allianceName;
    if (!aName || aName=='')
      aName = 'none';
             
    var m = '<CENTER><SPAN class=boldRed>NOTE: Leaderboard information is delayed up to 24 hours</span></center><TABLE class=pbTabSome>';
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ name +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +' (rank #'+ p.rank +')</td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ aName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Cities:</td><TD><TABLE class=pbTabSome><TR style="font-weight:bold"><TD>City Name</td><TD>Coords</td><TD>Level</td><TD>Status</td><TD>Created</td></tr>';
      
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = c.dateCreated.substr(0,10);
      m += '<TR><TD>'+ c.cityName +'</td><TD>'+ coordLink(c.xCoord, c.yCoord) +'</td><TD align=center>'+ c.tileLevel +'</td>\
          <TD>'+ cityStatusString (c.cityStatus) +'</td><TD>'+ created +'</td></tr>';
    }    
    m += '</table></td></tr></table>';
    span.innerHTML = m;
  },

  gotPlayerInfo : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<TABLE class=pbTabSome>';
    var p = rslt.userInfo[0];
    var pids = p.provinceIds.split (',');
    var prov = [];
    for (var i=0; i<pids.length; i++)
      prov.push(unsafeWindow.provincenames['p'+pids[i]]);
    m += '<TR><TD class=pbDetLeft>Player Name:</td><TD>'+ p.genderAndName +'</td></tr>\
      <TR><TD class=pbDetLeft>Might:</td><TD>'+ p.might +'</td></tr>\
      <TR><TD class=pbDetLeft>Facebook profile:</td><TD><A target="_tab" href="http://www.facebook.com/profile.php?id='+ p.fbuid +'">Click to open in new tab</a></td></tr>\
      <TR><TD class=pbDetLeft>Alliance:</td><TD>'+ p.allianceName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>Provinces:</td><TD style="white-space:normal">'+ prov.join(', ') +'</td></tr>';
    span.innerHTML = m + '</table>';
  },
      
  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchLeaderboard : function (uid, notify) {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
};   // end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
    var t = exportToKOCattack;
    for (var b=1; b<11; b++){
      t.troops['b'+ b] = [];
      for (var trp=0; trp<12; trp++){
        t.troops['b'+ b][trp] = 0;
      }
    }
    var s = GM_getValue ('atkTroops_'+ getServerId(), null);
    if (s != null){
      var trp = JSON2.parse(s);
      for (var b=1; b<11; b++){
        if (trp['b'+ b] && trp['b'+ b].length == 12)
          t.troops['b'+ b] = trp['b'+ b];
      }
    }
    window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattack;
    if (!ResetAll) GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattack;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
    ];
    
    if (popExp == null){
      popExp = new CPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
      popExp.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV class=pbStat>Export data to KOC Attack</div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Target Type</td><TD style="padding:1px" align=center>#<BR>targets</td><TD width=15></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb level '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>';
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    }
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Bulk Add to KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack not running, unable to export';
    }
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>';
    popExp.getMainDiv().innerHTML =  m;
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    popExp.getTopDiv().innerHTML = '<CENTER><B>Power Bot Export</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    popExp.show(true);
         
    if (city != null){
      for (var i=0; i<Cities.numCities; i++)
        if (city.id == Cities.cities[i].id)
          break;
      if (i < Cities.numCities){
        setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit ("SWITCH CITY: "+ (i+1));          
      }
    }
// TODO: WAIT FOR City select ?
    
  
    function validate (e){
      var x = e.target.id.substr(5).split('_');
      var b = x[0];
      var trp = x[1];
      document.getElementById('ptETerr_'+ b).innerHTML = '';
      var x = parseIntZero (e.target.value);
      if (isNaN(x) || x<0 || x>150000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Invalid Entry';
        return;
      } else {
        e.target.style.backgroundColor = '';
        e.target.value = x;
        t.troops['b'+ b][trp-1] = x;
      }
      var tot = 0;
      for (var td=0; td<troopDef.length; td++)
        tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
      if (tot<1 && cList['lvl'+ b].length>0 )
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>150000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return;
        } else if (tot>150000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
          return;
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      doNextLevel ();
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll();
      curLevel = 0;
      showMe ();
      popExp.show(true);
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        endBulkAdd ('Done!<BR>');
        return;
      }
     e_attackDialog(false);
    }
        
    function e_attackDialog (tf){
      if (!tf){
       hideMe();
       popExp.show (false);
       unsafeWindow.Modal.hideModalAll();
       unsafeWindow.modal_attack(4,0,0);
       new CwaitForElement ('BulkAddAttackDiv', 1000, e_attackDialog );
      }
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (2).</span>');
        return;  
      }
      for (var trp=1; trp<13; trp++){
        var inp = document.getElementById('modal_attack_unit_ipt' +trp);
        inp.value = t.troops['b'+curLevel][trp-1];
        if (t.troops['b'+curLevel][trp-1] > 0)
          inp.style.backgroundColor = 'yellow';
        else
          inp.style.backgroundColor = 'white';
      }
      div.style.display = 'block';
      document.getElementById('KOCAttackBulkAddForce').checked = true;
      if (DISABLE_BULKADD_LIST)
        ta.value = '';
      else {
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      }
      clickWin (unsafeWindow, but, 'click');   
      unsafeWindow.Modal.hideModal();
      document.getElementById('pbSrcExpResult').innerHTML += 'Added '+ list.length +' targets for '+ city.name +'<BR>';
      setTimeout (doNextLevel, 500);
    }    
  },
}


  function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return;
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
  }



/****************************  Sample Tab Implementation  ******************************/
Tabs.sample = {
  tabOrder : 300,                    // order to place tab in top bar
  tabDisabled : !ENABLE_SAMPLE_TAB, // if true, tab will not be added or initialized
  tabLabel : 'Click Me',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '<CENTER><BR>This is a sample tab implementation<BR><BR>Showing food for '+ cityName +' : <SPAN id=pbSampleFood>0</span>\
        <BR><BR>(Food is updated every 5 seconds)</center>';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('pbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}


/*********************************** ATTACK TAB ***********************************/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  //e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}

Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: 500,
  myDiv : null,
  data : {},  
  MapAjax : new CMapAjax(),
    
  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE width=100% height=100% class=pbTab><TR><TD><INPUT id=pbBarbShow type=submit value="Show All Targets" \> <BR>\
       City: <SPAN id=pbAtkCSS></span> &nbsp; &nbsp; &nbsp; Radius: <INPUT id=pbBarbDist size=3 type=text> &nbsp; &nbsp; <INPUT id=pbBarbScan type=submit value=Scan \></td></tr><TR><TD height=100%>\
       <DIV id=pbAtkDiv style="background-color:white"></div></td></tr></table>';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },
  
  hide : function (){
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },
  
  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start();
    var totTargets = 0;   
    for (var c=0; c<Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');    
  },
  
  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist<1 || dist>35){
      t.writeDiv ("<SPAN class=boldRed>Nuh-uh, try again</span><BR>");
      return;
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'<BR>');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,  
  
  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new CPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPad>';
    for (var c=0; c<Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '<TR><TD colspan=3><DIV class=pbStat>'+ Cities.cities[c].name +' &nbsp; (radius:'+ dat.radius +' &nbsp;targets:'+ dat.numTargets  +')</div></td></tr>';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});     
      for (i=0; i<atks.length; i++)
        m += '<TR><TD>Barb Camp '+ atks[i].lvl +'</td><TD>'+ atks[i].x +','+ atks[i].y +'</td><TD> &nbsp; Dist='+ atks[i].dist.toFixed(2) +'</td></tr>';
    }    
    t.popShow.getMainDiv().innerHTML = '</table></div>'+ m;
    t.popShow.getTopDiv().innerHTML = '<CENTER><B>Showing all targets in memory</b></center>';
    t.popShow.show(true);    
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();    
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds<BR>');
  },
    
  oScan : {},   
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance);
    var y = t.MapAjax.normalize(city.y-distance);
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'<BR>');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning<BR>');
    for (var i=0; i<t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },
      
  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('<BR>ERROR: '+ rslt.errorMsg +'<BR>');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 && !map[k].tileCityId && lvl<8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      }
    }
    t.oScan.curX += 15;
    if (t.oScan.curX > t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY > t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'<BR>');
  },
}


/*********************************** Test TAB ***********************************/
Tabs.Test = {
  tabOrder: 140,
  tabDisabled : !ENABLE_TEST_TAB,         // if true, tab will not be added or initialized
  tabLabel : 'Test',
  myDiv : null,

  init : function (div){
    var t = Tabs.Test;
    t.myDiv = div;
    var m = '<TABLE><TR><TD align=right>Scout: </td><TD><INPUT type=checkbox id=pbfakeIsScout></td></tr>\
        <TR><TD align=right>Wild: </td><TD><INPUT type=checkbox id=pbfakeIsWild></td></tr>\
        <TR><TD align=right>False Report: </td><TD><INPUT type=checkbox id=pbfakeFalse></td></tr>\
        <TR><TD align=right>Seconds: </td><TD><INPUT type=text size=4 value=300 id=pbfakeSeconds></td></tr>\
        <TR><TD align=right># of Militia: </td><TD><INPUT type=text size=6 value=5000 id=pbfakeMilitia></td></tr>\
        <TR><TD colspan=2 align=center><INPUT id=pbtestSendMarch type=submit value="Fake Attack" \></td></tr></table>\
        <INPUT id=pbReloadKOC type=submit value="Reload KOC" \>\
        <BR>Force ajax errors : <INPUT type=checkbox id=pbajaxErr>\
        <BR>Send alliance chat alert as whisper : <INPUT type=checkbox id=pbalertWhisper>\
        <BR><DIV id=pbtestDiv style="background-color:#ffffff; maxwidth:675; maxheight:350px; height:350px; overflow-y:auto;"></div>';
    div.innerHTML = m;
    document.getElementById('pbtestSendMarch').addEventListener ('click', t.clickFakeAttack, false);
    document.getElementById('pbReloadKOC').addEventListener ('click', reloadKOC, false);
    document.getElementById('pbajaxErr').addEventListener ('click', function (){window.EmulateAjaxError=this.checked}, false);
    document.getElementById('pbalertWhisper').addEventListener ('click', function (){SEND_ALERT_AS_WHISPER=this.checked}, false);
  },

  hide : function (){
    var t = Tabs.Test;
  },

  show : function (){
  },

  writeDiv : function (msg){
    var t = Tabs.Test;
    document.getElementById('pbtestDiv').innerHTML = msg;
  },

  addDiv : function (msg){
    var t = Tabs.Test;
    document.getElementById('pbtestDiv').innerHTML += msg;
  },
  
  createFakeAttack : function (cityNum, isScout, isWild, isFalse, secs, numMilitia){
    var marchId = 'm'+ (88888 + Math.floor(Math.random()*11111));
    var march = {};
    if (matTypeof(Seed.queue_atkinc)=='array')
      Seed.queue_atkinc = {};
    if (isFalse)
      march.marchType = 0;
    else if (isScout)
      march.marchType = 3;
    else
      march.marchType = 4;

    march.toCityId = Cities.cities[cityNum].id;
    if (isWild) {
      keys = unsafeWindow.Object.keys(Seed.wilderness['city'+Cities.cities[cityNum].id]);
      march.toTileId = Seed.wilderness['city'+Cities.cities[cityNum].id][keys[0]].tileId;
    } else {
      march.toTileId = Cities.cities[cityNum].tileId;
    }
    secs = parseInt(secs);
    march.arrivalTime = unixTime() + secs;
    march.departureTime = unixTime() - 10;
    march.unts = {}
    march.unts.u3 = 1
    march.unts.u2 = numMilitia
    march.pid = 1234567
    march.score = 9
    march.mid = marchId.substr(1);
    march.players = {}
    march.players.u1234567 = {}
    march.players.u1234567.n = 'Fred Flintstone';
    march.players.u1234567.t = 60
    march.players.u1234567.m = 5441192
    march.players.u1234567.s = 'M';
    march.players.u1234567.w = 1
    march.players.u1234567.a = 1
    march.players.u1234567.i = 5
    Seed.queue_atkinc[marchId] = march;
    Seed.players.u1234567 = march.players.u1234567;
  },

  clickFakeAttack : function (){
    var t = Tabs.Test;
    var isScout = document.getElementById('pbfakeIsScout').checked;
    var isWild = document.getElementById('pbfakeIsWild').checked;
    var isFalse = document.getElementById('pbfakeFalse').checked;
    var secs = parseInt(document.getElementById('pbfakeSeconds').value);
    var mil = parseInt(document.getElementById('pbfakeMilitia').value);
    t.createFakeAttack (0, isScout, isWild, isFalse, secs, mil);
  },
}

/*********************************  Cresting Tab ***********************************/
 Tabs.Crest = {
  tabOrder : 70,
  myDiv : null,
  rallypointlevel:null,
  error_code: 0,
  knt:{},
     
  init : function (div){
    var t = Tabs.Crest;
    setInterval(t.FirstRound,10000);
    setInterval(t.sendCrestReport, 1*60*1000);
    t.myDiv = div;
    var selbut=0;
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED CRESTING FUNCTION</div><TABLE id=pbcrestfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (CrestOptions.Running == false) {
	       m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = OFF"></td>';
	   } else {
	       m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = ON"></td>';
	   }
    m += '<TD><INPUT id=CrestHelp type=submit value="HELP"></td>';
    m += '<TD><INPUT id=pbsendreport type=checkbox '+ (Options.crestreport?' CHECKED':'') +'\> Send Crest report every ';
    m += '<INPUT id=pbsendreportint value='+ Options.CrestMsgInterval +' type=text size=3 \> hours </td></table>';
    
    m += '<DIV id=pbOpt class=pbStat>CRESTING OPTIONS</div><TABLE id=pbcrestopt	 width=100% height=0% class=pbTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;">Crest from city: <span id=crestcity></span></div>';
    
    m += '<TABLE class=ptTab><TR><TD>Wild coords: X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value="'+CrestOptions.X+'"</td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value="'+CrestOptions.Y+'"</td></tr></table>';
   
    m += '<TABLE class=ptTab><TR><TD>Wave <b>1</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R1MM type=text size=5 maxlength=5 value="'+CrestOptions.R1MM+'" (When left 0 it will not send out a first wave, for whatever reason you want to do that...)</td>';
    m += '</td><TD></td><TD><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R1Ball type=text size=5 maxlength=5 value="'+CrestOptions.R1Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R1Cat type=text size=5 maxlength=5 value="'+CrestOptions.R1Cat+'"</td></tr>';
    
    m += '<TR><TD>Wave <b>2</b>: </td><TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R2MM type=text size=5 maxlength=5 value="'+CrestOptions.R2MM+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R2Pike type=text size=5 maxlength=5 value="'+CrestOptions.R2Pike+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R2Sword type=text size=5 maxlength=5 value="'+CrestOptions.R2Sword+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R2Arch type=text size=5 maxlength=5 value="'+CrestOptions.R2Arch+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R2Ball type=text size=5 maxlength=5 value="'+CrestOptions.R2Ball+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R2Ram type=text size=5 maxlength=5 value="'+CrestOptions.R2Ram+'"</td>';
    m += '<TD><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R2Cat type=text size=5 maxlength=5 value="'+CrestOptions.R2Cat+'"</td></tr></table>';
    
    t.myDiv.innerHTML = m;
    
    for (var i=0;i<Seed.cities.length;i++){
		if (CrestOptions.CrestCity == Seed.cities[i][0]){
			selbut=i;
			break;
		}
	}
		
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
    if (CrestOptions.CrestCity == 0) {
    	CrestOptions.CrestCity = t.tcp.city.id
    	saveCrestOptions();
    }
         
    document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;saveCrestOptions();} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
    document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value; saveCrestOptions();} , false);
    document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value; saveCrestOptions()} , false);
    document.getElementById('R1MM').addEventListener('change', function(){CrestOptions.R1MM = document.getElementById('R1MM').value; saveCrestOptions()} , false);
    document.getElementById('R1Ball').addEventListener('change', function(){CrestOptions.R1Ball = document.getElementById('R1Ball').value; saveCrestOptions()} , false);
    document.getElementById('R1Cat').addEventListener('change', function(){CrestOptions.R1Cat = document.getElementById('R1Cat').value; saveCrestOptions()} , false);
    document.getElementById('R2MM').addEventListener('change', function(){CrestOptions.R2MM = document.getElementById('R2MM').value; saveCrestOptions()} , false);
    document.getElementById('R2Pike').addEventListener('change', function(){CrestOptions.R2Pike = document.getElementById('R2Pike').value; saveCrestOptions()} , false);
    document.getElementById('R2Sword').addEventListener('change', function(){CrestOptions.R2Sword = document.getElementById('R2Sword').value; saveCrestOptions()} , false);
    document.getElementById('R2Arch').addEventListener('change', function(){CrestOptions.R2Arch = document.getElementById('R2Arch').value; saveCrestOptions()} , false);
    document.getElementById('R2Ball').addEventListener('change', function(){CrestOptions.R2Ball = document.getElementById('R2Ball').value; saveCrestOptions()} , false);
    document.getElementById('R2Ram').addEventListener('change', function(){CrestOptions.R2Ram = document.getElementById('R2Ram').value; saveCrestOptions()} , false);
    document.getElementById('R2Cat').addEventListener('change', function(){CrestOptions.R2Cat = document.getElementById('R2Cat').value; saveCrestOptions()} , false);
  },
  
  helpPop : function (){
    var helpText = '<BR>The crest tab is designed to attack one wild over and over again.<BR>';
    helpText += 'It will attack a wild in 2 waves, abandon it and start over.<BR>';
    helpText += 'So make sure u have 1 FREE SLOT in your castle for a wild!<BR>';
    helpText += 'Just fill in the coordinates, troops and hit "ON".<BR><BR>';
    helpText += 'Troop numers (from KOC WIKI):<BR>';
    helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Wilderness">More can be found on Koc Wikia</a>';
    helpText += '<TABLE width=100%><TR><TD>Level</td><TD>Wave 1</td><TD>Wave 2</td><TD>Troop loses</td><TD>Min. Fletching</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>160 MM</td><TD>12 MM</td><TD>0</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>80 archers</td><TD>None</td><TD>1+</td></tr>';
    helpText += '<TR><TD>2</td><TD>5 MM</td><TD>130 archers</td><TD>1st Wave</td><TD>2+</td></tr>';
    helpText += '<TR><TD>3</td><TD>10 MM</td><TD>520 archers</td><TD>1st Wave</td><TD>3+</td></tr>';
    helpText += '<TR><TD>4</td><TD>20 MM</td><TD>1600 archers</td><TD>1st Wave</td><TD>4+</td></tr>';
    helpText += '<TR><TD>5</td><TD>50 MM</td><TD>2200 archers</td><TD>1st Wave</td><TD>6+</td></tr>';
    helpText += '<TR><TD>6</td><TD>100 MM</td><TD>3000 archers</td><TD>1st Wave</td><TD>7+</td></tr>';
    helpText += '<TR><TD>7</td><TD>150 MM</td><TD>6000 archers</td><TD>1st Wave</td><TD>8+</td></tr>';
    helpText += '<TR><TD>8</td><TD>299 MM + 1Bal</td><TD>9000 archers + 900 Bal</td><TD>1st Wave + 1 Archer</td><TD>9+</td></tr>';
    helpText += '<TR><TD>9</td><TD>599 MM + 1Bal</td><TD>13000 archers + 900 Bal</td><TD>1st Wave + 2 Archer</td><TD>10</td></tr>';
    helpText += '<TR><TD>10</td><TD>1199 MM + 1Cat</td><TD>35000 archers + 2500 Cat</td><TD>1st Wave + 6 Archer + 50 Cat</td><TD>10</td></tr></table>';
    
    var pop = new CPopup ('giftHelp', 0, 0, 585, 400, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help: Cresting</b></center>';
    pop.show (true);
  },
  
  toggleCrestState: function(obj){
		var t = Tabs.Crest;
        if (CrestOptions.Running == true) {
            CrestOptions.Running = false;
            obj.value = "Crest = OFF";
            saveCrestOptions();
        }
        else {
            CrestOptions.Running = true;
            obj.value = "Crest = ON";
            sendCrestReport();
            saveCrestOptions();
        }
    },
    
    sendCrestReport: function(){
    	var t = Tabs.Crest;
    	if(!Options.crestreport || !CrestOptions.Running) return;
    	var now = new Date().getTime()/1000.0;
        now = now.toFixed(0);
        if (now < (parseInt(Options.LastCrestReport)+(Options.CrestMsgInterval*60*60))) return;
    	
    	var total = 0;
        var message = 'Crest Stats: %0A';
        message += '%0A Crests Gained (for '+ Options.CrestMsgInterval +' hour of cresting) %0A';
        for (crest in Options.Creststatus){
        	owned = Seed.items['i'+crest];
        	if (owned == undefined) owned=0;
	      	if ( (owned - Options.Creststatus[crest]) > 0) message+= '<DIV><B>' + unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A </b></div>';
	      	else message+= unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A';
	    	total += (owned - Options.Creststatus[crest]);
	    	Options.Creststatus[crest] = owned;
      	}
    	message += '%0A Total Crests gained: '+ total +'%0A';
    	
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      params.emailTo = Seed.player['name'];
      params.subject = "Crest Overview";
      params.message = message;
      params.requestType = "COMPOSED_MAIL";
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
          method: "post",
          parameters: params,
          onSuccess: function (message) {
              var rslt = eval("(" + message.responseText + ")");
              if (rslt.ok) {
              		Options.LastCrestReport = now;
              } else {
              }
          },
          onFailure: function () {
          },
      });
    	
      saveOptions();
    },
    
    
    getAtkKnight : function(cityID){
     var t = Tabs.Crest;
     t.knt = new Array();
     for (k in Seed.knights[cityID]){
     		if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
     			t.knt.push ({
     				Name:   Seed.knights[cityID][k]["knightName"],
     				Combat:	parseInt(Seed.knights[cityID][k]["combat"]),
     				ID:		Seed.knights[cityID][k]["knightId"],
     			});
     		}
     }
     t.knt = t.knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
  },
  
  getRallypointLevel: function(cityId){
    var t = Tabs.Crest;
    for (var o in Seed.buildings[cityId]){
  	var buildingType = parseInt(Seed.buildings[cityId][o][0]);
  	var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
  	if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
     }
  },
  
  
  FirstRound: function(){
      var t = Tabs.Crest;
      var buzy = false;
      if (!CrestOptions.Running) return;
      cityID = 'city' + CrestOptions.CrestCity;
      var abandon=0;
      for (var k in Seed.wilderness[cityID] ){
           if (Seed.wilderness[cityID][k]['xCoord']==CrestOptions.X && Seed.wilderness[cityID][k]['yCoord']==CrestOptions.Y && t.error_code!=401) {
             t.abandonWilderness(Seed.wilderness[cityID][k]['tileId'],Seed.wilderness[cityID][k]['xCoord'],Seed.wilderness[cityID][k]['yCoord'],CrestOptions.CrestCity);
           }
      }
      if (parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R1Ball || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R1Cat || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R2MM || parseInt(Seed.units[cityID]['unt4']) < CrestOptions.R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestOptions.R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestOptions.R2Arch || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestOptions.R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R2Cat) return;
      for (var k in Seed.queue_atkp[cityID]){
        if (Seed.queue_atkp[cityID][k]['toXCoord']==CrestOptions.X && Seed.queue_atkp[cityID][k]['toYCoord']==CrestOptions.Y)  buzy=true;
      }
      if (!buzy)  {
        CrestOptions.RoundOne=true;
        CrestOptions.RoundTwo=true;
        saveCrestOptions();
      }
      if(!CrestOptions.RoundOne) return;
      
      if (CrestOptions.R1MM == 0 && CrestOptions.R1Ball==0 && CrestOptions.R1Cat==0){
      CrestOptions.RoundOne = false;
      saveCrestOptions();
      setTimeout (function(){t.SecondRound();}, 1000);
      return;
      }
      
      t.getAtkKnight(cityID);
      slots=0;
       for (z in Seed.queue_atkp[cityID]){
             slots++;
       }
       if  (Seed.queue_atkp[cityID].toSource() == "[]") slots=0;
       t.getRallypointLevel(cityID);     
       if ((t.rallypointlevel) <= slots)return;
       
       if  (t.knt.toSource() == "[]") {return;}  
       var kid = t.knt[0].ID;
       
       var now = new Date().getTime()/1000.0;
       now = now.toFixed(0)
		
	   if (CrestOptions.R1MM > parseInt(Seed.units[cityID]['unt2']) || CrestOptions.R1Ball > parseInt(Seed.units[cityID]['unt10']) || CrestOptions.R1Cat > parseInt(Seed.units[cityID]['unt12'])){return;}
          
	    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		params.cid=CrestOptions.CrestCity;
  		params.type=4;
  	    params.kid=kid;
  		params.xcoord = CrestOptions.X;
  		params.ycoord = CrestOptions.Y;
        if (now < (parseInt(CrestOptions.lastRoundTwo) + 300)) { 
        	params.u2= (CrestOptions.R1MM / 10);
        	params.u2 = params.u2.toFixed(0);	
        	if (params.u2 < (CrestOptions.R1MM / 10)) params.u2++;
        }	
  		else params.u2= CrestOptions.R1MM;
  		params.u10=CrestOptions.R1Ball;
  		params.u12=CrestOptions.R1Cat;
  		
  		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  		         loading: true,
  		         onSuccess: function (transport) {
  		         var rslt = eval("(" + transport.responseText + ")");
  		         if (rslt.ok) {
  		         var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
  		         var ut = unsafeWindow.unixtime();
  		         var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         for(i = 0; i <= unitsarr.length; i++){
  		         	if(params["u"+i]){
  		         	unitsarr[i] = params["u"+i];
  		         	}
  		         }
  		         var currentcityid = params.cid;
  		         unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
  		         unsafeWindow.update_seed(rslt.updateSeed)
  		         if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
  		         CrestOptions.RoundOne = false;
  		         saveCrestOptions();
  		         setTimeout (function(){t.SecondRound();}, 10000);
               } else {
               		//setTimeout (function(){t.FirstRound();}, 5000);
  		         //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
  		         }
  		         },
  		         onFailure: function () {}
  		 });
  		 
  	 },
     
     	 
    SecondRound: function(){
      var t = Tabs.Crest;
      if (!CrestOptions.Running || !CrestOptions.RoundTwo) return;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      cityID = 'city' + CrestOptions.CrestCity;
      if (parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R1Ball || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R1Cat || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R1MM || parseInt(Seed.units[cityID]['unt2']) < CrestOptions.R2MM || parseInt(Seed.units[cityID]['unt4']) < CrestOptions.R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestOptions.R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestOptions.R2Arch || parseInt(Seed.units[cityID]['unt10']) < CrestOptions.R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestOptions.R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestOptions.R2Cat) return;
      
      t.getAtkKnight(cityID);
      slots=0;
       for (z in Seed.queue_atkp[cityID]){
             slots++;
       }
       if  (Seed.queue_atkp[cityID].toSource() == "[]") slots=0;
       t.getRallypointLevel(cityID);
       if ((t.rallypointlevel) <= slots)return;
          
       if  (t.knt.toSource() == "[]") {return;}  
       var kid = t.knt[0].ID;

  		params.cid=CrestOptions.CrestCity;
  		params.type=4;
  	  	params.kid=kid;
  		params.xcoord = CrestOptions.X;
  		params.ycoord = CrestOptions.Y;
  		params.u2=CrestOptions.R2MM;
  		params.u4=CrestOptions.R2Pike;
  		params.u5=CrestOptions.R2Sword;
  		params.u6=CrestOptions.R2Arch;
  		params.u10=CrestOptions.R2Ball;
  		params.u11=CrestOptions.R2Ram;
  		params.u12=CrestOptions.R2Cat;
  		
  		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  		         loading: true,
  		         onSuccess: function (transport) {
  		         var rslt = eval("(" + transport.responseText + ")");
  		         if (rslt.ok) {
  		         var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
  		         var ut = unsafeWindow.unixtime();
  		         var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  		         for(i = 0; i <= unitsarr.length; i++){
  		         	if(params["u"+i]){
  		         	unitsarr[i] = params["u"+i];
  		         	}
  		         }
  		         var currentcityid = params.cid;
  		         unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
  		         unsafeWindow.update_seed(rslt.updateSeed);
  		         if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
  		         CrestOptions.RoundTwo = false;
               var now = new Date().getTime()/1000.0;
               now = now.toFixed(0);
               CrestOptions.lastRoundTwo = now;
  		         saveCrestOptions();
               } else {
               setTimeout (function(){t.SecondRound();}, 5000);
  		         //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
  		         }
  		         },
  		         onFailure: function () {}
  		 });
  		 },
  		 
  		 
  	abandonWilderness: function(tid,x,y,cid){
      var t = Tabs.Crest;
      if (!CrestOptions.Running) return;
      var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      var cityID = cid;
	  var tileid = tid;
      params.tid=tid;
  	  params.cid=cid;
  	  params.x=x;
  		params.y=y;
  		  		
  		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/abandonWilderness.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  		         loading: true,
  		         onSuccess: function (transport) {
  		         var rslt=eval("("+transport.responseText+")");
  		         
  		         
				  if (rslt.ok) {
				  	 t.error_code = 0;
				     CrestOptions.RoundOne = true;
				     CrestOptions.RoundTwo = true;
				     saveCrestOptions();
				      if (rslt.returningMarches) {
				          var cities = Object.keys(rslt.returningMarches);
				          for (var i = 0; i < cities.length; i++) {
				              for (var j = 0; j < rslt.returningMarches[cities[i]].length; j++) {
				                  var cid = cities[i].split("c")[1];
				                  var mid = rslt.returningMarches[cities[i]][j];
				                  var march = Seed.queue_atkp["city" + cid]["m" + mid];
				                  if (march) {
				                      var marchtime = Math.abs(parseInt(march.destinationUnixTime) - parseInt(march.marchUnixTime));
				                      var ut = unsafeWindow.unixtime();
				                      Seed.queue_atkp["city" + cid]["m" + mid].destinationUnixTime = ut;
				                      Seed.queue_atkp["city" + cid]["m" + mid].marchUnixTime = ut - marchtime;
				                      Seed.queue_atkp["city" + cid]["m" + mid].returnUnixTime = ut + marchtime;
				                      Seed.queue_atkp["city" + cid]["m" + mid].marchStatus = 8
				                  }
				              }
				          }
				      }
				      if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
				      
				      if (Object.keys(Seed.wilderness["city" + cityID]).length == 1) {
				          Seed.wilderness["city" + cityID] = []
  		         	  } else{
  		         	  	delete Seed.wilderness["city"+cityID]["t"+tileid];
  		         	  }
               } else {
               		if (rslt.error_code != 401) {
               		    t.error_code = rslt.error_code; 
               			setTimeout (function(){t.abandonWilderness(tid,x,y,cid);}, 5000);
               		}
  		        }
  		         },
  		         onFailure: function () {}
  		 });


    },
    
  hide : function (){
    var t = Tabs.Crest;
  },

  show : function (){
  },
 };

 /****************************  Transport Implementation  *******************************/
Tabs.transport = {
  tabOrder: 80,
  tabLabel: 'Transport',
  myDiv: null,
  timer: null,
  traderState: [],
  lTR: [],
  tradeRoutes: [],
  checkdotradetimeout: null,
  count:0,
  check:false,

    init: function(div){
		var t = Tabs.transport;
        t.myDiv = div;
		t.traderState = {
            running: false,
        };
        t.readTraderState();
	t.readTradeRoutes();
	t.e_tradeRoutes();

      var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED TRANSPORT FUNCTION</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.traderState.running == false) {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbTraderState type=submit value="Transport = ON"></td>';
      }
      m += '<TD><INPUT id=pbShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbTraderDivDRoute class=pbStat>ADD TRADE ROUTE</div>';

      m += '<TABLE id=pbaddtraderoute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptrescity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptcityTo></span></div></td>';
      m += '<TD>OR</td>';
      m += '<TD>X:<INPUT id=ptcityX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=ptcityY type=text size=3\></td></tr>';
	  
	  m += '<TR align="left">';
	  m += '<TD colspan=4>Time inbetween to check transport: <INPUT id=pbtransportinterval type=text size=2 value="'+Options.transportinterval+'"\> minutes</td></tr></table>';
      m += '<TD colspan=4>Dont send transport out if less then <INPUT id=pbminwagons type=text size=2 value="'+Options.minwagons+'"\> wagons are needed. (Needless transports are skipped this way)</td></tr></table>';
      
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">If the "trade" amount is 0 then it will transport the max amount above "keep". Gold only if there is space left...</div>';
      m += '<TABLE id=pbaddtraderoute width=55% height=0% class=pbTab><TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
      m += '<TD><INPUT id=pbshipFood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountFood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountFood type=text size=11 maxlength=11 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
      m += '<TD><INPUT id=pbshipWood type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountWood type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountWood type=text size=11 maxlength=11 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
      m += '<TD><INPUT id=pbshipStone type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountStone type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountStone type=text size=11 maxlength=11 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
      m += '<TD><INPUT id=pbshipOre type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountOre type=text size=11 maxlength=11 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountOre type=text size=11 maxlength=11 value="0"\></td></tr>';
      m += '<TR align="center">';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png"></td>';
      m += '<TD><INPUT id=pbshipGold type=checkbox checked=true\></td>';
      m += '<TD>Keep: <INPUT id=pbtargetamountGold type=text size=11 maxlength =11 value="0"\></td>';
      m += '<TD>Trade: <INPUT id=pbtradeamountGold type=text size=11 maxlength=11 value="0"\></td></tr>'
      m += '</table>';

      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRoute type=submit value="Add Route"></div>';
      
      t.myDiv.innerHTML = m;
      
      t.tcp = new CdispCityPicker ('pttrader', document.getElementById('ptrescity'), true, t.clickCitySelect, 0);
      t.tcpto = new CdispCityPicker ('pttraderTo', document.getElementById('ptcityTo'), true, t.clickCitySelect).bindToXYboxes(document.getElementById ('ptcityX'), document.getElementById ('ptcityY'));
      
      document.getElementById('pbTraderState').addEventListener('click', function(){
      t.toggleTraderState(this);
      }, false);
      document.getElementById('pbSaveRoute').addEventListener('click', function(){
      t.addTradeRoute();
      }, false);
      document.getElementById('pbShowRoutes').addEventListener('click', function(){
      t.showTradeRoutes();
      }, false);
      
      document.getElementById('pbtransportinterval').addEventListener('keyup', function(){
		if (isNaN(document.getElementById('pbtransportinterval').value)){ document.getElementById('pbtransportinterval').value=60 ;}
		Options.transportinterval = document.getElementById('pbtransportinterval').value;
		saveOptions();
      }, false);
      
      document.getElementById('pbtargetamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountFood').value)) document.getElementById('pbtargetamountFood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountWood').value)) document.getElementById('pbtargetamountWood').value=0 ;
      }, false);
      document.getElementById('pbtargetamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountStone').value)) document.getElementById('pbtargetamountStone').value=0 ;
      }, false);
      document.getElementById('pbtargetamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountOre').value)) document.getElementById('pbtargetamountOre').value=0 ;
      }, false);
      document.getElementById('pbtargetamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetamountGold').value)) document.getElementById('pbtargetamountGold').value=0 ;
      }, false);
      document.getElementById('pbtradeamountFood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountFood').value)) document.getElementById('pbtradeamountFood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountWood').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountWood').value)) document.getElementById('pbtradeamountWood').value=0 ;
      }, false);
      document.getElementById('pbtradeamountStone').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountStone').value)) document.getElementById('pbtradeamountStone').value=0 ;
      }, false);
      document.getElementById('pbtradeamountOre').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountOre').value)) document.getElementById('pbtradeamountOre').value=0 ;
      }, false);
      document.getElementById('pbtradeamountGold').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtradeamountGold').value)) document.getElementById('pbtradeamountGold').value=0 ;
      }, false);
     document.getElementById('pbminwagons').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbminwagons').value)) document.getElementById('pbminwagons').value=100 ;
         Options.minwagons = parseInt(document.getElementById('pbminwagons').value);
         saveOptions();
     }, false)
      
      document.getElementById('pbshipFood').addEventListener('click', function(){
          if (document.getElementById('pbshipFood').checked==false) {
              document.getElementById('pbtargetamountFood').disabled = true;
              document.getElementById('pbtradeamountFood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountFood').disabled = false;
            document.getElementById('pbtradeamountFood').disabled = false;
          }
      },false);
      document.getElementById('pbshipWood').addEventListener('click', function(){
          if (document.getElementById('pbshipWood').checked==false) {
              document.getElementById('pbtargetamountWood').disabled = true;
              document.getElementById('pbtradeamountWood').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountWood').disabled = false;
            document.getElementById('pbtradeamountWood').disabled = false;
          }
      },false);
      document.getElementById('pbshipStone').addEventListener('click', function(){
          if (document.getElementById('pbshipStone').checked==false) {
              document.getElementById('pbtargetamountStone').disabled = true;
              document.getElementById('pbtradeamountStone').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountStone').disabled = false;
            document.getElementById('pbtradeamountStone').disabled = false;
          }
      },false);
      document.getElementById('pbshipOre').addEventListener('click', function(){
          if (document.getElementById('pbshipOre').checked==false) {
              document.getElementById('pbtargetamountOre').disabled = true;
              document.getElementById('pbtradeamountOre').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountOre').disabled = false;
            document.getElementById('pbtradeamountOre').disabled = false;
          }
      },false);
      document.getElementById('pbshipGold').addEventListener('click', function(){
          if (document.getElementById('pbshipGold').checked==false) {
              document.getElementById('pbtargetamountGold').disabled = true;
              document.getElementById('pbtradeamountGold').disabled = true;
          }
          else {
            document.getElementById('pbtargetamountGold').disabled = false;
            document.getElementById('pbtradeamountGold').disabled = false;
          }
      },false);
      window.addEventListener('unload', t.onUnload, false);
    },
    
    getRallypoint: function(cityId){
      var t = Tabs.transport;
      for (var o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12){
			return parseInt(buildingLevel);
			break;
		}
	   }
	  return 0;
    },
      	  

 e_tradeRoutes: function(){
      var t = Tabs.transport;
      var now = new Date();
      if (t.traderState.running == true)    {
      	var now = new Date().getTime()/1000.0;
      	now = now.toFixed(0);
      	var last = Options.lasttransport;
       		if ( now > (parseInt(last) + (Options.transportinterval*60))){
				  t.checkdoTrades();
      		}
      }
	  setTimeout(function(){ t.e_tradeRoutes();}, Options.transportinterval*1000);
	  
    },
    	
	delTradeRoutes: function() {
		var t = Tabs.transport;	
		t.tradeRoutes= [];
	},
	
	checkcoords : function (obj){
		var t = Tabs.transport;
		if(obj.id == 'pbok'){
			t.check = true;
			t.addTradeRoute();
		}
		return;			
	},
	
	addTradeRoute: function () {
		var valid = true;
		var t = Tabs.transport;
		var city = t.tcp.city.id;
		if (document.getElementById('ptcityX').value==0 && document.getElementById('ptcityY').value ==0 && !t.check)
		{
			new CdialogConfirm ('<SPAN class=boldRed>You are about to set a route to location 0,0!</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv); 
			return;
		}
		var ship_Food = document.getElementById('pbshipFood').checked;
		var ship_Wood = document.getElementById('pbshipWood').checked;
		var ship_Stone = document.getElementById('pbshipStone').checked;
		var ship_Ore = document.getElementById('pbshipOre').checked;
		var ship_Gold = document.getElementById('pbshipGold').checked;
		var target_Food = document.getElementById('pbtargetamountFood').value;
		var target_Wood = document.getElementById('pbtargetamountWood').value;
		var target_Stone = document.getElementById('pbtargetamountStone').value;
		var target_Ore = document.getElementById('pbtargetamountOre').value;
		var target_Gold = document.getElementById('pbtargetamountGold').value;
		var trade_Food = document.getElementById('pbtradeamountFood').value;
		var trade_Wood = document.getElementById('pbtradeamountWood').value;
		var trade_Stone = document.getElementById('pbtradeamountStone').value;
		var trade_Ore = document.getElementById('pbtradeamountOre').value;
		var trade_Gold = document.getElementById('pbtradeamountGold').value;
		var target_x = document.getElementById('ptcityX').value;
		var target_y = document.getElementById('ptcityY').value;
		var route_state = true;
				
		if (valid == true) {
			var lTR = t.tradeRoutes;
			lTR.push({
				city:				city,
				ship_Food:			ship_Food,
				target_Food:		target_Food,
				trade_Food: 		trade_Food,
				ship_Wood:			ship_Wood,
				target_Wood:		target_Wood,
				trade_Wood: 		trade_Wood,
				ship_Stone:			ship_Stone,
				target_Stone:		target_Stone,
				trade_Stone: 		trade_Stone,
				ship_Ore:			ship_Ore,
				target_Ore:			target_Ore,
				trade_Ore:	 		trade_Ore,
				ship_Gold:			ship_Gold,
				target_Gold:		target_Gold,
				trade_Gold: 		trade_Gold,
				target_x: 			target_x,
				target_y: 			target_y,
				route_state: 		"true"
			});
		}
		document.getElementById('pbTraderDivDRoute').style.background ='#99FF99';
		setTimeout(function(){ (document.getElementById('pbTraderDivDRoute').style.background =''); }, 1000);
	},
	showTradeRoutes: function () {
		var t = Tabs.transport;
		var popTradeRoutes = null;
		t.popTradeRoutes = new CPopup('pbShowTrade', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowTradeRoutes" id="pbRoutesQueue">';       
		t.popTradeRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popTradeRoutes.getTopDiv().innerHTML = '<TD><B>Transport routes:</td>';
		t.paintTradeRoutes();
		t._addTabHeader();
		t.popTradeRoutes.show(true)	;
	},
	paintTradeRoutes: function(){
	        var t = Tabs.transport;
	        var r = t.tradeRoutes;
	        var cityname;
			for (var i = (r.length-1); i>=0; i--) {
				for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
				}    
				var queueId = i;
				t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].ship_Food, r[i].target_Food, r[i].trade_Food,r[i].ship_Wood, r[i].target_Wood, r[i].trade_Wood,r[i].ship_Stone, r[i].target_Stone, r[i].trade_Stone,r[i].ship_Ore, r[i].target_Ore, r[i].trade_Ore,r[i].ship_Gold, r[i].target_Gold, r[i].trade_Gold);
	        }
	    },
	  
	 _addTab: function(queueId,cityname, cityX,cityY,ship_Food, target_Food, trade_Food,ship_Wood, target_Wood, trade_Wood,ship_Stone, target_Stone, trade_Stone,ship_Ore, target_Ore, trade_Ore,ship_Gold, target_Gold, trade_Gold){
	 	var t = Tabs.transport;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = queueId;
	     row.insertCell(1).innerHTML = cityname;
	     row.insertCell(2).innerHTML = cityX + ',' + cityY;
	     row.insertCell(3).innerHTML = ship_Food;
	 	 row.insertCell(4).innerHTML = addCommas(target_Food);
	 	 row.insertCell(5).innerHTML = addCommas(trade_Food);
	 	 row.insertCell(6).innerHTML = ship_Wood;
	 	 row.insertCell(7).innerHTML = addCommas(target_Wood);
	 	 row.insertCell(8).innerHTML = addCommas(trade_Wood);
	 	 row.insertCell(9).innerHTML = ship_Stone;
	 	 row.insertCell(10).innerHTML = addCommas(target_Stone);
	 	 row.insertCell(11).innerHTML = addCommas(trade_Stone);
	 	 row.insertCell(12).innerHTML = ship_Ore;
	 	 row.insertCell(13).innerHTML = addCommas(target_Ore);
	 	 row.insertCell(14).innerHTML = addCommas(trade_Ore);
	 	 row.insertCell(15).innerHTML = ship_Gold;
	 	 row.insertCell(16).innerHTML = addCommas(target_Gold);
	 	 row.insertCell(17).innerHTML = addCommas(trade_Gold);
	     row.insertCell(18).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Delete</span></a>';
	     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
	        t.cancelQueueElement(queueId);
	     }, false);
	 },
	 
	 _addTabHeader: function() {
	 var t = Tabs.transport;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = "ID";
	     row.insertCell(1).innerHTML = "From";
	     row.insertCell(2).innerHTML = "To";
	     row.insertCell(3).innerHTML = "Food";
	     row.insertCell(4).innerHTML = "";
	     row.insertCell(5).innerHTML = "";
	     row.insertCell(6).innerHTML = "Wood";
		 row.insertCell(7).innerHTML = "";
	     row.insertCell(8).innerHTML = "";
	     row.insertCell(9).innerHTML = "Stone";
	     row.insertCell(10).innerHTML = "";
	     row.insertCell(11).innerHTML = "";
	     row.insertCell(12).innerHTML = "Ore";
	     row.insertCell(13).innerHTML = "";
	     row.insertCell(14).innerHTML = "";
	     row.insertCell(15).innerHTML = "Gold";
	     row.insertCell(16).innerHTML = "";
	     row.insertCell(17).innerHTML = "";
	     row.insertCell(18).innerHTML = "Delete";
	   },   
	  
	 cancelQueueElement: function(queueId){
	     var t = Tabs.transport;
	     var queueId = parseInt(queueId);
	     t.tradeRoutes.splice(queueId, 1);
	     t.showTradeRoutes();
	 },
	   
	saveTradeRoutes: function(){
		var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('tradeRoutes_' + serverID, JSON2.stringify(t.tradeRoutes));
    },
    readTradeRoutes: function(){
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('tradeRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route)
                t.tradeRoutes[k] = route[k];
        }
    },
	saveTraderState: function(){
		var t = Tabs.transport;
        var serverID = getServerId();
        GM_setValue('traderState_' + serverID, JSON2.stringify(t.traderState));
    },
    readTraderState: function(){
        var t = Tabs.transport;
        var serverID = getServerId();
        s = GM_getValue('traderState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state)
                t.traderState[k] = state[k];
        }
    },
    toggleTraderState: function(obj){
		var t = Tabs.transport;
        if (t.traderState.running == true) {
            t.traderState.running = false;
            obj.value = "Transport = OFF";
			clearTimeout(t.checkdotradetimeout);
			t.count = 0;
        }
        else {
            t.traderState.running = true;
            obj.value = "Transport = ON";
			t.e_tradeRoutes();
        }
    },
	
	checkdoTrades: function(){
	var t = Tabs.transport;
	if(t.tradeRoutes.length==0) return;
	t.doTrades(t.count);
	t.count++;
	if(t.count < t.tradeRoutes.length){
			  t.checkdotradetimeout = setTimeout(function() { t.checkdoTrades();}, 5000);
			} else {
			  var now = new Date().getTime()/1000.0;
			  now = now.toFixed(0);
			  Options.lasttransport = now;
			  saveOptions();	
			  t.count = 0;
			}
	},
    
    doTrades: function(count){
    	var t = Tabs.transport;
   		if(t.tradeRoutes.length==0) return;
   		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.gold =0;
		params.r1 =0;
		params.r2 =0;
		params.r3 =0;
		params.r4 =0 ;
		params.kid = 0;
		
		var carry_amount= 0;
		var wagons_needed=0;
		var citymax = 0;
		var city = t.tradeRoutes[count]["city"];
		var cityID = 'city' + city;
		
		
   	 	var xcoord = t.tradeRoutes[count]["target_x"];
    	var ycoord = t.tradeRoutes[count]["target_y"];
    	var trade_Food = t.tradeRoutes[count]["trade_Food"];
    	var trade_Wood = t.tradeRoutes[count]["trade_Wood"];
    	var trade_Stone = t.tradeRoutes[count]["trade_Stone"];
    	var trade_Ore = t.tradeRoutes[count]["trade_Ore"];
    	var trade_Gold = t.tradeRoutes[count]["trade_Gold"];
    	var target_Food = t.tradeRoutes[count]["target_Food"];
    	var target_Wood = t.tradeRoutes[count]["target_Wood"];
    	var target_Stone = t.tradeRoutes[count]["target_Stone"];
    	var target_Ore = t.tradeRoutes[count]["target_Ore"];
    	var target_Gold = t.tradeRoutes[count]["target_Gold"];
    	var ship_Food = t.tradeRoutes[count]["ship_Food"];
    	var ship_Wood = t.tradeRoutes[count]["ship_Wood"];
    	var ship_Stone = t.tradeRoutes[count]["ship_Stone"];
    	var ship_Ore = t.tradeRoutes[count]["ship_Ore"];
    	var ship_Gold = t.tradeRoutes[count]["ship_Gold"];
    	var citymax_Food = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    	var citymax_Wood = parseInt(Seed.resources[cityID]['rec2'][0] / 3600);
    	var citymax_Stone = parseInt(Seed.resources[cityID]['rec3'][0] / 3600);
    	var citymax_Ore = parseInt(Seed.resources[cityID]['rec4'][0] / 3600);
    	var citymax_Gold = parseInt(Seed.citystats[cityID]['gold']);
    	var carry_Food = (citymax_Food - target_Food);
    	var carry_Wood = (citymax_Wood - target_Wood);
    	var carry_Stone = (citymax_Stone - target_Stone);
    	var carry_Ore = (citymax_Ore - target_Ore);
    	var carry_Gold = 0;
    	if (carry_Food < 0 || ship_Food==false) carry_Food = 0;
    	if (carry_Wood < 0 || ship_Wood==false) carry_Wood = 0;
    	if (carry_Stone < 0 || ship_Stone==false) carry_Stone = 0;
    	if (carry_Ore < 0 || ship_Ore==false) carry_Ore = 0;
    	if (trade_Food > 0 && (carry_Food > trade_Food)) carry_Food = parseInt(trade_Food);
    	if (trade_Wood > 0 && (carry_Wood > trade_Wood)) carry_Wood = parseInt(trade_Wood);
    	if (trade_Stone > 0 && (carry_Stone > trade_Stone)) carry_Stone = parseInt(trade_Stone);
    	if (trade_Ore > 0 && (carry_Ore > trade_Ore)) carry_Ore = parseInt(trade_Ore);
    	var wagons =  parseInt(Seed.units[cityID]['unt'+9]);
    	var rallypointlevel = t.getRallypoint(cityID);	
		if (rallypointlevel == 11) { rallypointlevel = 15; }
    	if (wagons > (rallypointlevel*10000)){ wagons = (rallypointlevel*10000); }
    	var featherweight = parseInt(Seed.tech.tch10);
    	var maxloadperwagon = ((featherweight *500) + 5000);
		var maxload = (maxloadperwagon* wagons);
		
		if(wagons <= 0) {return; }

		for (var t=0; t< Seed.cities.length;t++) {
			if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
		}                     
		
		var shift_Food = (maxload / 4);
		var shift_Wood = (maxload / 4);
		var shift_Stone = (maxload / 4);
		var shift_Ore = (maxload / 4);
					
		if ((maxload - carry_Food - carry_Wood - carry_Stone - carry_Ore) < 0){
			var shift_num=0;
			var shift_spare=0;
			
			// Check: See if load/4 is to big for some resources...
			if (carry_Food < shift_Food) {
				shift_spare += (shift_Food - carry_Food);
				shift_Food = carry_Food;
			}
			if (carry_Wood < shift_Wood) {
				shift_spare += (shift_Wood - carry_Wood);
				shift_Wood = carry_Wood;	
			}
			if (carry_Stone < shift_Stone) {
				shift_spare += (shift_Stone - carry_Stone);
				shift_Stone = carry_Stone;
			}
			if (carry_Ore < shift_Ore) {
				shift_spare += (shift_Ore - carry_Ore);
				shift_Ore = carry_Ore;
			}			
			 
		  while (shift_spare >1) {
				 if (carry_Food < (shift_Food + shift_spare)){
				    shift_spare = shift_spare - carry_Food;;
				    shift_Food = carry_Food;
				 }
				 else{
				  shift_Food = (shift_Food + shift_spare);
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Wood < (shift_Wood + shift_spare)){
				    shift_spare = shift_spare - carry_Wood;;
				    shift_Wood = carry_Wood;
				 }
				 else{
				  shift_Wood = shift_Wood + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
        		if (carry_Stone < (shift_Stone + shift_spare)){
				    shift_spare = shift_spare - carry_Stone;
				    shift_Stone = carry_Stone;
				 }
				 else{
				  shift_Stone = shift_Stone + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
				 if (carry_Ore < (shift_Ore + shift_spare)){
				    shift_spare = shift_spare - carry_Ore;
				    shift_Ore = carry_Ore;
				 }
				 else{
				  shift_Ore = shift_Ore + shift_spare;
				  shift_spare = shift_spare- shift_spare;
				}
			 }

		carry_Food = shift_Food;
		carry_Wood = shift_Wood;
		carry_Stone = shift_Stone;
		carry_Ore = shift_Ore;
		}
		
		if (maxload > (carry_Food + carry_Wood + carry_Stone + carry_Ore) && ship_Gold==true) {
		    if ((maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore)) > (citymax_Gold - target_Gold)){
		    	  carry_Gold = (citymax_Gold - target_Gold);
		    	  if (carry_Gold < 0 ) carry_Gold = 0;
		   	}
		    else carry_Gold = (maxload-(carry_Food + carry_Wood + carry_Stone + carry_Ore));
		    if (trade_Gold > 0 && (carry_Gold > trade_Gold)) carry_Gold = parseInt(trade_Gold);
		}
		
		wagons_needed = ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon);
		wagons_needed = wagons_needed.toFixed(0);	
		if (wagons_needed < ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) / maxloadperwagon)) wagons_needed++;	
		if ( wagons_needed < Options.minwagons ) { if(DEBUG_TRACE) logit('Small transport skipped'); return; }
        
		params.cid= city;
		params.type = "1";
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.r1 = carry_Food;
		params.r2 = carry_Wood;
		params.r3 = carry_Stone;
		params.r4 = carry_Ore;
		params.gold = carry_Gold;
		params.u9 = wagons_needed;	
		
   		if ((carry_Food + carry_Wood + carry_Stone + carry_Ore + carry_Gold) > 0) {
                 
         new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  actionLog('Trade   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Wagons: " + wagons_needed);
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  for(i = 0; i <= unitsarr.length; i++){
                  	if(params["u"+i]){
                  	unitsarr[i] = params["u"+i];
                  	}
                  }
                  var resources=new Array();
                  resources[0] = params.gold;
                  for(i=1; i<=4; i++){
                  	resources[i] = params["r"+i];
                  }
                  var currentcityid = city;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  unsafeWindow.update_seed(rslt.updateSeed)
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else {
                  actionLog('TRANSPORT FAIL: ' + cityname + ' -> ' + rslt.msg);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
        }
	},
	
	show: function(){
		var t = Tabs.transport;
    },
	hide: function(){
        var t = Tabs.transport;
    },
    onUnload: function(){
        var t = Tabs.transport;
        if (!ResetAll) t.saveTradeRoutes();
		if (!ResetAll) t.saveTraderState();
        
    },
}



/*********************************  Raid Tab ***********************************/
/************** Bot active
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (number) marchType = 9
        (number) marchStatus = 1
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 1
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (undefined) toAllianceId: null = null
********/
/************* Bot returning
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (number) marchType = 9
        (number) marchStatus = 8
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 1
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (undefined) toAllianceId: null = null
*****/
/******** Bot resting
(object) queue_atkp = [object Object]
    (object) city73930 = [object Object]
      (object) m6093 = [object Object]
        (string) marchType = 9
        (string) marchStatus = 4
        (string) playerId = 1550996
        (string) cityId = 73930
        (string) botSettingsId = 1479
        (string) botMarchStatus = 7
        (string) botState = 1
        (string) modalState = 0
        (string) restPeriod = 3472
        (string) fromPlayerId = 1550996
        (string) fromCityId = 73930
        (string) fromAllianceId = 2199
        (string) fromXCoord = 159
        (string) fromYCoord = 638
        (undefined) toPlayerId: null = null
        (undefined) toCityId: null = null
        (string) toTileId = 451239
        (undefined) toAllianceId: null = null
**********/
/************* March type cheat sheet
cm.BOT_STATUS = {
    BOT_MARCH_UNDEFINED: 0,
    BOT_MARCH_MARCHING: 1,
    BOT_MARCH_RETURNING: 2,
    BOT_MARCH_STOPPED: 3,
    BOT_MARCH_INSUFFICIENT_TROOPS: 4,
    BOT_MARCH_MAX_RAIDS_EXCEEDED: 5,
    BOT_MARCH_TIMED_OUT: 6,
    BOT_MARCH_RESTING: 7
};
cm.MARCH_STATUS = {
    MARCH_STATUS_INACTIVE: 0,
    MARCH_STATUS_OUTBOUND: 1,
    MARCH_STATUS_DEFENDING: 2,
    MARCH_STATUS_STOPPED: 3,
    MARCH_STATUS_RESTING: 4,
    MARCH_STATUS_UNKNOWN: 5,
    MARCH_STATUS_SITUATIONCHANGED: 7,
    MARCH_STATUS_RETURNING: 8,
    MARCH_STATUS_ABORTING: 9
};
cm.MARCH_TYPES = {
    MARCH_TYPE_NONE: 0,
    MARCH_TYPE_TRANSPORT: 1,
    MARCH_TYPE_REINFORCE: 2,
    MARCH_TYPE_SCOUT: 3,
    MARCH_TYPE_ATTACK: 4,
    MARCH_TYPE_REASSIGN: 5,
    MARCH_TYPE_BARBARIAN: 6,
    MARCH_TYPE_MERCENARY: 7,
    MARCH_TYPE_BARBARIAN_REINFORCE: 8,
    MARCH_TYPE_BOT_BARBARIAN: 9
};
************/

 Tabs.Raid = {
  tabDisabled : false,
  tabOrder : 110,
  myDiv : null,
  rallypointlevel:null,
  knt:{},
  Troops:{},
  city:0,
  raidtimer:null,
  rslt:{},
  save:{},
  stopping:false,
  resuming:false,
  deleting:false,
  stopprogress:0,
  stopcount:0,
  activecount:0,
  count:0,
  
  init : function (div){
    var t = Tabs.Raid;
    t.myDiv = div;
	t.raidtimer = setTimeout(t.checkRaids, 30000);
	setInterval(t.lookup, 2500);
	setInterval(t.sendreport, 1*60*1000);
	
	AddSubTabLink('Stop Raids', t.StopAllRaids, 'pbraidtab');
	AddSubTabLink('Resume Raids', t.ResumeAllRaids, 'pbraidtabRes');
	AddSubTabLink('Delete Raids', t.DeleteAllRaids, 'pbraidtabDel');
	
	
	var m = '<DIV class=pbStat>RAID FUNCTIONS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
	    m += '<TD><INPUT id=pbRaidStart type=submit value="Auto Reset = '+ (Options.RaidRunning?'ON':'OFF') +'" ></td>';
	    m += '<TD><INPUT id=pbsendreport type=checkbox '+ (Options.foodreport?' CHECKED':'') +'\> Send raid report every ';
	    m += '<INPUT id=pbsendreportint value='+ Options.MsgInterval +' type=text size=3 \> hours </td>';
	    m += '</tr></table></div>';
	    m += '<DIV class=pbStat>ACTIVE RAIDS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
	    m += '<TD><DIV style="margin-bottom:10px;"><span id=ptRaidCity></span></div></td></tr>';
	    m+='<TR><TD><DIV style="margin-bottom:10px;"><span id=ptRaidTimer></span></div></td></tr></table>';
	    m += '<DIV id=PaintRaids></div>';
	    m += '<DIV class=pbStat>SAVED RAIDS</div><TABLE width=100% height=0% class=pbTab><TR align="center">';
	    m += '<DIV id=SavedRaids></div>';
	t.myDiv.innerHTML = m;
	
	t.from = new CdispCityPicker ('ptRaidpicker', document.getElementById('ptRaidCity'), true, t.clickCitySelect, 0);
	document.getElementById('pbRaidStart').addEventListener('click', t.toggleRaidState, false);
	document.getElementById('pbsendreport').addEventListener('change', function(){
		Options.foodreport = document.getElementById('pbsendreport').checked;
		saveOptions();
	}, false);
	document.getElementById('pbsendreportint').addEventListener('change', function(){
		Options.MsgInterval = parseInt(document.getElementById('pbsendreportint').value);
		saveOptions();
	}, false);
	
	var serverID = getServerId();
	t.save = GM_getValue ('SavedRaids_'+serverID);
	if (t.save != undefined) t.save = JSON2.parse (t.save);
	
	setInterval (t.paint,1000);
  },
	
  lookup : function (){
      	var t = Tabs.Raid;
      	t.activecount=0;
      	t.stopcount=0;
      	for (c=0; c< Seed.cities.length;c++) {
      			cityID = 'city' + Seed.cities[c][0];    
   				for (b in Seed.queue_atkp[cityID]){
   					destinationUnixTime = Seed.queue_atkp[cityID][b]['destinationUnixTime']; 
   					MarchStatus = Seed.queue_atkp[cityID][b]['marchStatus'];
   					MarchType = Seed.queue_atkp[cityID][b]['marchType'];
   					botMarchStatus = Seed.queue_atkp[cityID][b]['botMarchStatus'];
   					if (MarchType == 9 &&  MarchStatus == 3 || MarchStatus==10) t.stopcount++;
   					else if (MarchType == 9) t.activecount++;
   					//alert(MarchType +'/'+  MarchStatus);
   				}
   		}
   		//logit(t.stopcount);	
	   	if (t.resuming == false && t.stopping == false && t.deleting == false && t.activecount != 0)
			document.getElementById('pbraidtab').innerHTML = '<span style="color: #ff6">Stop Raids ('+ t.activecount + ')</span>'
	   	else if (t.resuming == false && t.stopping == false && t.deleting == false)
			document.getElementById('pbraidtab').innerHTML = '<span style="color: #CCC">Stop Raids ('+ t.activecount + ')</span>'
   		if (t.resuming == false && t.resuming == false && t.deleting == false && t.stopcount !=0)
			document.getElementById('pbraidtabRes').innerHTML = '<span style="color: #ff6">Resume Raids ('+ t.stopcount + ')</span>'
   		else if (t.resuming == false && t.stopping == false && t.deleting == false)
			document.getElementById('pbraidtabRes').innerHTML = '<span style="color: #CCC">Resume Raids ('+ t.stopcount + ')</span>'
   		if (t.resuming == false && t.stopping == false && t.deleting == false && t.stopcount !=0)
			document.getElementById('pbraidtabDel').innerHTML = '<span style="color: #ff6">Delete Raids ('+ t.stopcount + ')</span>'
   		else if (t.resuming == false && t.stopping == false && t.deleting == false)
			document.getElementById('pbraidtabDel').innerHTML = '<span style="color: #CCC">Delete Raids ('+ t.stopcount + ')</span>'
  },
   
   	
  paint : function ()	{
  	var t = Tabs.Raid;
  	var botMarchStat = {0:'Inactive',
  						1:'Raiding',
  						2:'Returning',
  						3:'Stopped',
  						4:'Resting',
  						5:'Unknown',
  						7:'Situation Changed',
  						8:'Returning',
  						9:'Aborting'};
  	var botStat = {0:'Undefined',
  						1:'Marching',
  						2:'Returning',
  						3:'Stopped',
  						4:'Insufficient Troops',
  						5:'Max Raids Exceeded',
  						7:'Timed out',
  						8:'Resting'};
  	var o = '<FONT size=2px><B>Raid Timer: '+ timestr( 86400 - ( unixTime() - t.rslt.settings.lastUpdated )) +'</b></font>';
  	document.getElementById('ptRaidTimer').innerHTML = o;
  	
  	var z ='<TABLE class=pbTab><TR><TD width=60px align=center><A onclick="pbStopAll('+t.cityId+')">STOP</a></td><TD width=70px>Time</td><TD width=85px>Coords</td><TD width=50px>Level</td><TD width=50px></td><TD width=50px><A onclick="pbDeleteAll()">DELETE</a></td></TR>';
  	if (t.rslt['queue'] != ""){
  		for (y in t.rslt['queue']) {
  			if (t.rslt['queue'][y]['botMarches'] != undefined) {
  				for (k in Seed.queue_atkp['city' + t.cityId]){
  					if (Seed.queue_atkp['city' + t.cityId][k]['marchId'] == t.rslt['queue'][y]['botMarches']['marchId']) {
  						botMarchStatus = Seed.queue_atkp['city' + t.cityId][k]['botMarchStatus'];
  						MarchStatus = Seed.queue_atkp['city' + t.cityId][k]['marchStatus'];
  						restPeriod = (Seed.queue_atkp['city' + t.cityId][k]['restPeriod']/60); 
  						destinationUnixTime = Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'];
  						returnUnixTime = Seed.queue_atkp['city' + t.cityId][k]['returnUnixTime']
  						now = unixTime();
  						//z+='<TR><TD>('+ botMarchStatus +'/'+ MarchStatus +')</td>';
  						z+='<TR>';
  						//if (destinationUnixTime > now && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
  						if (MarchStatus ==1) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/attacking.jpg></td>';
  						//if ((destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';
  						if (MarchStatus ==8 && (destinationUnixTime - now) <= 0 && botMarchStatus !=3 && returnUnixTime > now) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/returning.jpg></td>';
  						if (MarchStatus == 3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_stopped_desat.png></td>';
  						//if (returnUnixTime < now  && botMarchStatus !=3) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
  						if (MarchStatus == 4 || (returnUnixTime < now  && botMarchStatus !=3)) z+='<TD align=center><img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/autoAttack/raid_resting.png></td>';
  						
  						if (destinationUnixTime >= now) z+='<TD>'+ timestr(Seed.queue_atkp['city' + t.cityId][k]['destinationUnixTime'] - unixTime())+'</td>';
  						if (destinationUnixTime <= now) {
  							if ((destinationUnixTime - now) <= 0 && returnUnixTime > now) z+='<TD>'+ timestr(returnUnixTime - now)+'</td>';
  							if (returnUnixTime <= now) z+='<TD>'+ timestr(now - returnUnixTime)+'</td>';
  						}
  					}
  				}
  				z+='<TD>('+ t.rslt['queue'][y]['botMarches']['toXCoord'] +','+ t.rslt['queue'][y]['botMarches']['toYCoord']+')</td>';
  				z+='<TD align=center>'+ t.rslt['queue'][y]['botMarches']['toTileLevel'] +'</td>';
  				if (botMarchStatus == 3) z+='<TD><A onclick="pbEditRaid('+ y +')">Edit</a></td>';
	  				else z+='<TD><FONT COLOR= "CCCCCC">Edit</font></td>';
  				if (botMarchStatus == 3) z+='<TD align=center><A onclick="pbDeleteRaid('+ t.rslt['queue'][y]['botMarches']['marchId']+')">Delete</a></td>';
  				else z+='<TD align=center><FONT COLOR= "CCCCCC">Delete</font></td>';
  				//z +='<TD width=25px></td><TD>Status: '+ botMarchStat[botMarchStatus]+'</td>';
  				z +='<TD width=25px></td><TD>Rest Time: '+ timestr(restPeriod) +'</td>';
  				z+='</tr>';
  			}
  		}
  	}
  	z+='</table>';
  	if (t.rslt['queue'] == "") z ='<TABLE class=pbTab><TR><TD>No Raids in city!</td></TR>';
  	document.getElementById('PaintRaids').innerHTML = z;
  	
  	var check = true;
  		if (t.save != ""){
  			var a ='<TABLE class=pbTab><TR><TD width=60px></td><TD width=70px></td><TD width=85px>Coords</td><TD width=50px>Level</td><TD width=50px></td><TD width=50px></td></tr>';
  			for (y in t.save){
  				if (t.save[y] != undefined && t.cityId == t.save[y]['cityId']){
  					a +='<TR><TD align=center><A onclick="pbDeleteSavedRaid('+ t.save[y]['marchId'] +')">X</a></td>';
  					a +='<TD></td><TD><FONT COLOR= "CC0000">('+t.save[y]['toXCoord']+','+t.save[y]['toYCoord']+')</font></td>';
  					a +='<TD align=center>'+t.save[y]['toTileLevel']+'</td>';
  					a +='<TD><A onclick="pbEditSavedRaid('+ y +')">Edit</a></td>';
  					a +='<TD align=center><A onclick="pbAddRaid('+ t.save[y]['marchId']+')">Add</a></td></tr>';
  					check = false;
  				}	
  			}
  			m+='</table>';
  		}
  		
  	if (check) a ='<TABLE class=pbTab><TR><TD>No Saved Raids in city!</td></TR>';
  	
  	document.getElementById('SavedRaids').innerHTML = a;  	
  	
  	unsafeWindow.pbDeleteRaid = t.DeleteRaid;
  	unsafeWindow.pbEditRaid = t.EditRaid;
  	unsafeWindow.pbAddRaid = t.AddRaid;
  	unsafeWindow.pbDeleteSavedRaid = t.DeleteSavedRaid;
  	unsafeWindow.pbEditSavedRaid = t.EditSavedRaid;
  	unsafeWindow.pbStopAll = t.StopCityRaids;
  	unsafeWindow.pbDeleteAll = t.DeleteCityRaids;
  },
  
  DeleteSavedRaid : function (Id){
    	  var t = Tabs.Raid;
    	  for (yy=0;yy<t.save.length;yy++){
    	  	if (t.save[yy]['marchId'] == Id){
    	  		  t.save.splice (yy,1);
    	  	}	
    	  }
    	  var serverID = getServerId();
    	  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
    	  t.paint();
    },
  
  EditSavedRaid : function (y){
      var t = Tabs.Raid;
	  var pop = new CPopup ('pbEditRaid', 0,0, 750,350, true);
	  if (t.popFirst){
	    pop.centerMe (mainPop.getMainDiv());  
	    t.popFirst = false;
	  }
	  pop.getTopDiv().innerHTML = '<CENTER><B>Edit Saved Raid</b></center>';
	  cityId =  t.save[y]['cityId'];
	  
		  var m = '<BR><TABLE id=pbRaidAdd height=0% class=pbTab><TR align="center">';
		  m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.save[y]['toXCoord']+'></td>';
		  m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.save[y]['toYCoord'] +'></td>';
		  m+='<TD width=25px></td><TD>Round Trip: '+ timestr((t.save[y]['returnUnixTime'] - t.save[y]['destinationUnixTime'])*2)+ '</td></tr></table>';

		  m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.save[y]['unit1Count']+'"></td>';
		  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.save[y]['unit2Count']+'"></td>';
		  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.save[y]['unit3Count']+'"></td>';
		  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.save[y]['unit4Count']+'"></td></tr>';
		  
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.save[y]['unit5Count']+'"></td>';
		  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.save[y]['unit6Count']+'"></td>';
		  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.save[y]['unit7Count']+'"></td>';
		  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.save[y]['unit8Count']+'"></td></tr>';
		  
		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
		  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.save[y]['unit9Count']+'"></td>';
		  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.save[y]['unit10Count']+'"></td>';
		  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.save[y]['unit11Count']+'"></td>';
		  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.save[y]['unit12Count']+'"></td></tr></table>';
		  
		  m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
		  m+= '<BR><CENTER>'+ strButton20('Save', 'id=pbSaveRaid') +'</center>';
	        
	  pop.getMainDiv().innerHTML = m;
	  
	  t.getKnights(cityId);
	  
	  document.getElementById ('AddKnights').value =  t.save[y]['knightId'];
	  document.getElementById ('pbSaveRaid').addEventListener ('click', function(){
	  			t.save[y]['knightId'] = parseInt(document.getElementById ('AddKnights').value);
	  			t.save[y]['toXCoord'] = parseInt(document.getElementById ('toXCoord').value);
	  			t.save[y]['toYCoord'] = parseInt(document.getElementById ('toYCoord').value);
	  			t.save[y]['unit1Count'] = parseInt(document.getElementById ('Unit1').value);
	  			t.save[y]['unit2Count'] = parseInt(document.getElementById ('Unit2').value);
	  			t.save[y]['unit3Count'] = parseInt(document.getElementById ('Unit3').value);
	  			t.save[y]['unit4Count'] = parseInt(document.getElementById ('Unit4').value);
	  			t.save[y]['unit5Count'] = parseInt(document.getElementById ('Unit5').value);
	  			t.save[y]['unit6Count'] = parseInt(document.getElementById ('Unit6').value);
	  			t.save[y]['unit7Count'] = parseInt(document.getElementById ('Unit7').value);
	  			t.save[y]['unit8Count'] = parseInt(document.getElementById ('Unit8').value);
	  			t.save[y]['unit9Count'] = parseInt(document.getElementById ('Unit9').value);
	  			t.save[y]['unit10Count'] = parseInt(document.getElementById ('Unit10').value);
	  			t.save[y]['unit11Count'] = parseInt(document.getElementById ('Unit11').value);
	  			t.save[y]['unit12Count'] = parseInt(document.getElementById ('Unit12').value);
	  			var serverID = getServerId();
	  			setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
	  			pop.show (false);
	  }, false);
	  
	  pop.show (true);  	
    },
      
  EditRaid : function (y){
  	  var t = Tabs.Raid;
  	  var pop = new CPopup ('pbEditRaid', 0,0, 750,350, true);
  	  if (t.popFirst){
  	    pop.centerMe (mainPop.getMainDiv());  
  	    t.popFirst = false;
  	  }
  	  pop.getTopDiv().innerHTML = '<CENTER><B>Edit Raid</b></center>';
  	  cityId = t.rslt['queue'][y]['botMarches']['cityId'];
  	  
  		  var m = '<BR><TABLE id=pbRaidAdd height=0% class=pbTab><TR align="center">';
  		  m+='<TR></tr><TR><TD width=25px>X= <INPUT id=toXCoord type=text size=3 maxlength=3 value='+t.rslt['queue'][y]['botMarches']['toXCoord']+'></td>';
  		  m+='<TD width=10px></td><TD widht=25px>Y= <INPUT id=toYCoord type=text size=3 maxlength=3 value='+ t.rslt['queue'][y]['botMarches']['toYCoord'] +'></td>';
  		  m+='<TD width=25px></td><TD>Round Trip: '+ timestr((t.rslt['queue'][y]['botMarches']['returnUnixTime'] - t.rslt['queue'][y]['botMarches']['destinationUnixTime'])*2)+ '</td></tr></table>';

  		  m += '<BR><TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit1Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit2Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit3Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit4Count']+'"></td></tr>';
  		  
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit5Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit6Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit7Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit8Count']+'"></td></tr>';
  		  
  		  m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
  		  m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
  		  m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
  		  m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit9Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit10Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit11Count']+'"></td>';
  		  m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="'+ t.rslt['queue'][y]['botMarches']['unit12Count']+'"></td></tr></table>';
  		  
  		  m += '<BR><CENTER><SELECT id=AddKnights type=list></select></center>';
  		  m+= '<BR><CENTER>'+ strButton20('Save', 'id=pbRaidSave') +'</center>';
  	        
  	  pop.getMainDiv().innerHTML = m;
  	  
  	  t.getKnights(cityId);
  	  
  	  document.getElementById ('AddKnights').value =  t.rslt['queue'][y]['botMarches']['knightId'];
  	  document.getElementById ('pbRaidSave').addEventListener ('click', function(){
  	  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	  			  		
  	  	params.pf = 0;
  	      params.ctrl = 'BotManager';
  	  	params.action = 'editMarch';
  	  	params.settings = {};
  	  	params.settings.cityId = t.rslt['queue'][y]['botMarches']['fromCityId'];
  	  	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};    	
  	  	params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('AddKnights').value);
  	  	params.queue[0].cityMarches.toXCoord =  parseInt(document.getElementById ('toXCoord').value);
  	  	params.queue[0].cityMarches.toYCoord =  parseInt(document.getElementById ('toYCoord').value);
  	  	params.queue[0].cityMarches.unit0Count = 0; //document.getElementById ('Unit0').value;
  	  	params.queue[0].cityMarches.unit1Count =  parseInt(document.getElementById ('Unit1').value);
  	  	params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
  	  	params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
  	  	params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
  	  	params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
  	  	params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
  	  	params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
  	  	params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
  	  	params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
  	  	params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
  	  	params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
  	  	params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
  	  	params.queue[0].cityMarches.marchId =  t.rslt['queue'][y]['botMarches']['marchId'];
  	  	
  	  	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  				  		method: "post",
  				         parameters: params,
  						 loading: true,
  						 onSuccess: function(transport){
  							var rslt = eval("(" + transport.responseText + ")");
  		                      if (rslt.ok) {
  		                      		pop.show (false);
  									unsafeWindow.cityinfo_army();
  		                          setTimeout(unsafeWindow.update_seed_ajax, 250);
  		                          setTimeout(t.GetRaids, (750),Seed.cities[i][0]);
  								}
  						 },
  				 });
  	  	}, false);
  	  
  	  pop.show (true);  	
  },
  
  DeleteRaid : function (Id){
  	var t = Tabs.Raid;
  	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	
  	for (y in t.rslt['queue']) {
  		if (t.rslt['queue'][y]['botMarches'] != undefined) {
	  		if (t.rslt['queue'][y]['botMarches']['marchId'] == Id) {
	  				marchId = t.rslt['queue'][y]['botMarches']['marchId'];
	  				cityId = t.rslt['queue'][y]['botMarches']['cityId'];
	  				knightId = t.rslt['queue'][y]['botMarches']['knightId'];
	  				toTileLevel = t.rslt['queue'][y]['botMarches']['toTileLevel'];
	  				returnUnixTime = t.rslt['queue'][y]['botMarches']['returnUnixTime'];
	  				destinationUnixTime = t.rslt['queue'][y]['botMarches']['destinationUnixTime'];
	  				toXCoord = t.rslt['queue'][y]['botMarches']['toXCoord'];
	  				toYCoord = t.rslt['queue'][y]['botMarches']['toYCoord'];
	  				var units = {};
	  				for (i=1;i<13;i++) units[i] = t.rslt['queue'][y]['botMarches']['unit'+i+'Count'];
	  		}
	  	}
  	}	
  	
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'deleteMarch';
  	params.marchId = marchId;
  	params.settings = {};
  	params.settings.cityId = cityId;
  	
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  	         method: "post",
  	         parameters: params,
  			 loading: true,
  			 onSuccess: function(transport){
  				var rslt = eval("(" + transport.responseText + ")");
  	              if (rslt.ok) {
  	              	  var serverID = getServerId();
  	              	  t.save = GM_getValue ('SavedRaids_'+serverID);
  	              	  if (t.save == undefined) t.save =new Array();
					  else t.save = JSON2.parse (t.save);
					  
  	              	  t.save.push ({
  	              	  	marchId:		marchId,
  	              	  	cityId:   		cityId,
  	              	  	knightId:		knightId,
  	              	  	toTileLevel:	toTileLevel,
  	              	  	returnUnixTime:	destinationUnixTime,
  	              	  	returnUnixTime:	returnUnixTime,
  	              	  	toXCoord:		toXCoord,
  	              	  	toYCoord:		toYCoord,
  	              	  	unit1Count: 	units[1],
  	              	  	unit2Count: 	units[2],
  	              	  	unit3Count: 	units[3],
  	              	  	unit4Count: 	units[4],
  	              	  	unit5Count: 	units[5],
  	              	  	unit6Count: 	units[6],
  	              	  	unit7Count: 	units[7],
  	              	  	unit8Count: 	units[8],
  	              	  	unit9Count: 	units[9],
  	              	  	unit10Count: 	units[10],
  	              	  	unit11Count: 	units[11],
  	              	  	unit12Count: 	units[12],
  	              	  });
  	              	  var troops = Seed.units["city" + cityId];
                      for (var u = 1; u <= 12; ++u) {
                          var troop_number = parseInt(rslt["unit" + u + "Return"]);
                          if (isNaN(troop_number)) {
                              troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
                          } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);
                          troops["unt" + u] = troop_number;
                      }
                      for (u in Seed.queue_atkp['city' + cityId]){
                      	if (Seed.queue_atkp['city' + cityId][u]['marchId'] == marchId){
							Seed.queue_atkp['city' + cityId][u] = "";
                      		unsafeWindow.seed.queue_atkp['city' + cityId] = Seed.queue_atkp['city' + cityId];
                      	}
                      }
                      
                      for (u in Seed.knights['city' + cityId]){
                      	if (Seed.knights['city' + cityId][u]['knightId'] == knightId){
                      		Seed.knights['city' + cityId][u]["knightStatus"] = 1;
                      		unsafeWindow.seed.knights['city' + cityId] = Seed.knights['city' + cityId];
                      	}
                      }
  	              	                              
  	              	  GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));
  	              	  t.save = null;
                      unsafeWindow.cityinfo_army();
  	                  setTimeout(unsafeWindow.update_seed_ajax, 250);
  	                  t.GetRaids(cityId);
  					}
  			 },
  	 });
},
  
  StopCityRaids : function (cityId){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);

    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'stopAll';
    	params.settings = {};

  	    params.settings.cityId = cityId;
  	    		
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    		  		method: "post",
    		         parameters: params,
    				 loading: true,
    				 onSuccess: function(transport){
    					var rslt = eval("(" + transport.responseText + ")");
    	                  if (rslt.ok) {
  								
    					  }
    				 },
    		 });   
    setTimeout(t.GetRaids, (750), cityId); 	
    },
  
  StopAllRaids : function (){
      	var t = Tabs.Raid;
      	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
      	if (t.activecount == 0) return;
	    t.stopping = true; 	
	      	for (i=0;i<Seed.cities.length;i++){
		      	setTimeout(t.DoAllStop, (i*1500),i);
		     }
   },
   
   ResumeAllRaids : function (){
       	var t = Tabs.Raid;
       	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
       	if (t.stopcount == 0) return;
       	t.resuming = true;
   			for (i=0;i<Seed.cities.length;i++){
   			    setTimeout(t.DoAllResume, (i*1500),i);
   			}
    },
   
   
   DeleteAllRaids : function (){
       	var t = Tabs.Raid;
       	if (t.stopping == true || t.resuming == true || t.deleting == true) return;
       	if (t.stopcount == 0) return;
       	t.deleting = true;
       	count=0;
       	t.count = t.stopcount;
				for (d=0; d< Seed.cities.length;d++) {
						cityID = 'city' + Seed.cities[d][0];    
							for (e in Seed.queue_atkp[cityID]){
								destinationUnixTime = Seed.queue_atkp[cityID][e]['destinationUnixTime']; 
								MarchStatus = Seed.queue_atkp[cityID][e]['marchStatus'];
								MarchType = Seed.queue_atkp[cityID][e]['marchType'];
								if (MarchType == 9 && (botMarchStatus == 3 || MarchStatus == 3)) {
									count++;
									setTimeout(t.DoAllDelete, (count*1250), (Seed.queue_atkp[cityID][e]['marchId']),d,count);
								}
							}
				}
    }, 
    
  
  DoAllStop: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'stopAll';
  	params.settings = {};
  	params.settings.cityId = Seed.cities[i][0];
  	    		
  		 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  			  		method: "post",
  			         parameters: params,
  					 loading: true,
  					 onSuccess: function(transport){
  						var rslt = eval("(" + transport.responseText + ")");
  		                  if (rslt.ok) {
  		                  		t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  		                  		actionLog('Stopping: '+ Seed.cities[i][1]);
  		                  		updatebotbutton('Stopping: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtab');
  		                  		if (t.stopprogress.toFixed(0) == 100) {
  		                  			 t.stopprogress = 0;
  		                  			 setTimeout(function(){updatebotbutton('Stop Raids ('+ t.activecount + ')', 'pbraidtab');t.stopping = false;}, (5000));
  		                  		}		
  						  }
  						  else {
  						  		if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllStop, (2000),i);
  						  		else {
  					 	  			t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  					 	  			actionLog('Stopping: '+ Seed.cities[i][1] + ' - ' + rslt.msg);
  					 	  			updatebotbutton('Stopping: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtab')
  					 	  			if (t.stopprogress.toFixed(0) == 100) {
  					 	  				 t.stopprogress = 0;
  					 	  				 setTimeout(function(){updatebotbutton('Stop Raids ('+ t.activecount + ')', 'pbraidtab');t.stopping = false;}, (5000));
  					 	  			}
  					 	  		}
  					 	  }
  					 },
    });  
  },

  DoAllResume: function(i) {
    var t = Tabs.Raid;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  	params.pf = 0;
  	params.ctrl = 'BotManager';
  	params.action = 'resumeAll';
  	params.settings = {};
    params.settings.cityId = Seed.cities[i][0];
  	    		
  		 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  			  		method: "post",
  			         parameters: params,
  					 loading: true,
  					 onSuccess: function(transport){
  						var rslt = eval("(" + transport.responseText + ")");
  		                  if (rslt.ok) {
  		                  		t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  		                  		actionLog('Resuming: '+ Seed.cities[i][1]);
  		                  		updatebotbutton('Resuming: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabRes');
  		                  		if (t.stopprogress.toFixed(0) == 100) {
  		                  			 t.stopprogress = 0;
  		                  			 setTimeout(function(){updatebotbutton('Resume Raids ('+ t.stopcount + ')', 'pbraidtabRes');t.resuming = false;}, (5000));
  		                  		}		
  						  }
  						  else {
  						  		if (rslt.msg == "The system is busy, please try again later") setTimeout (t.DoAllResume, (2000),i);
  						  		else {
  					 	  			t.stopprogress = t.stopprogress + (100/Seed.cities.length);
  					 	  			actionLog('Stopping: '+ Seed.cities[i][1]  + ' - ' + rslt.msg);
  					 	  			updatebotbutton('Resuming: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabRes')
  					 	  			if (t.stopprogress.toFixed(0) == 100) {
  					 	  				 t.stopprogress = 0;
  					 	  				 setTimeout(function(){updatebotbutton('Resume Raids ('+ t.stopcount + ')', 'pbraidtabRes');t.resuming = false;}, (5000));
  					 	  			}	
  					 	  		}
  					 	  }
  					 },
    });  
  },
  
  DoAllDelete : function (Id,city,count){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	
    	cityID = 'city'+ Seed.cities[city][0];
    	
    	for (f in Seed.queue_atkp[cityID]){
    		if (Seed.queue_atkp[cityID][f]['marchId'] == Id) {
    				marchId = Seed.queue_atkp[cityID][f]['marchId'];
    				cityId = Seed.queue_atkp[cityID][f]['cityId'];
    				knightId = Seed.queue_atkp[cityID][f]['knightId'];
    				toTileLevel = Seed.queue_atkp[cityID][f]['toTileLevel'];
    				returnUnixTime = Seed.queue_atkp[cityID][f]['returnUnixTime'];
    				destinationUnixTime = Seed.queue_atkp[cityID][f]['destinationUnixTime'];
    				toXCoord = Seed.queue_atkp[cityID][f]['toXCoord'];
    				toYCoord = Seed.queue_atkp[cityID][f]['toYCoord'];
    				var units = {};
    				for (i=1;i<13;i++) units[i] = Seed.queue_atkp[cityID][f]['unit'+i+'Count'];
    		}
    	}
    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'deleteMarch';
    	params.marchId = marchId;
    	params.settings = {};
    	params.settings.cityId = cityId;
    	
      new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    	         method: "post",
    	         parameters: params,
    			 loading: true,
    			 onSuccess: function(transport){
    				var rslt = eval("(" + transport.responseText + ")");
    	              if (rslt != "") {
    	              	  var serverID = getServerId();
    	              	  t.save = GM_getValue ('SavedRaids_'+serverID, "[]");
    	              	  if (t.save != undefined) t.save = JSON2.parse (t.save);
    	              	  if (t.save == undefined) t.save =new Array();
  
    	              	  t.save.push ({
    	              	  	marchId:		marchId,
    	              	  	cityId:   		cityId,
    	              	  	knightId:		knightId,
    	              	  	toTileLevel:	toTileLevel,
    	              	  	returnUnixTime:	destinationUnixTime,
    	              	  	returnUnixTime:	returnUnixTime,
    	              	  	toXCoord:		toXCoord,
    	              	  	toYCoord:		toYCoord,
    	              	  	unit1Count: 	units[1],
    	              	  	unit2Count: 	units[2],
    	              	  	unit3Count: 	units[3],
    	              	  	unit4Count: 	units[4],
    	              	  	unit5Count: 	units[5],
    	              	  	unit6Count: 	units[6],
    	              	  	unit7Count: 	units[7],
    	              	  	unit8Count: 	units[8],
    	              	  	unit9Count: 	units[9],
    	              	  	unit10Count: 	units[10],
    	              	  	unit11Count: 	units[11],
    	              	  	unit12Count: 	units[12],
    	              	  });
    	              	  
    	              	  var troops = Seed.units["city" + cityId];
    	              	  for (var u = 1; u <= 12; ++u) {
    	              	      var troop_number = parseInt(rslt["unit" + u + "Return"]);
    	              	      if (isNaN(troop_number)) {
    	              	          troop_number = parseInt(Seed.units["city" + cityId]["unt" + u]);
    	              	      } else troop_number = parseInt(rslt["unit" + u + "Return"]) + parseInt(Seed.units["city" + cityId]["unt" + u]);
    	              	      troops["unt" + u] = troop_number;
    	              	  }
    	              	  
    	              	  setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
                          unsafeWindow.cityinfo_army();	  
    	                  setTimeout(unsafeWindow.update_seed_ajax, 250);
    					}
    			 },
    	 });
  		  	 t.stopprogress = count * (100/t.count);
  		  	 actionLog('Deleting: '+ Seed.cities[city][1]);
  		  	 updatebotbutton('Deleting: '+ t.stopprogress.toFixed(0) + '%', 'pbraidtabDel');
  		  	 if (t.stopprogress.toFixed(0) == 100) {
  		  	 	 t.stopprogress = 0;
  		  	 	 t.GetRaids(cityId);
  		  	 	 setTimeout(function(){updatebotbutton('Delete Raids ('+ t.stopcount + ')', 'pbraidtabDel');t.deleting  = false;}, (5000));
  	}	
    	 
},
  
      
  DeleteCityRaids : function (){
      	var t = Tabs.Raid;
      	alert('This button needs to be added...');
      	/*var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  
      	
      	params.pf = 0;
      	params.ctrl = 'BotManager';
      	params.action = 'stopAll';
      	params.settings = {};
  
    	    params.settings.cityId = t.cityId;
    	    		
      	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
      		  		method: "post",
      		         parameters: params,
      				 loading: true,
      				 onSuccess: function(transport){
      					var rslt = eval("(" + transport.responseText + ")");
      	                  if (rslt.ok) {
    								
      					  }
      				 },
      		 }); */   	
      },
        
    	
  AddRaid : function (Id){
    	var t = Tabs.Raid;
    	var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    	update = {};
    	
    	params.pf = 0;
    	params.ctrl = 'BotManager';
    	params.action = 'saveMarch';
    	params.settings = {};
    	params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};
    	
    	for (y in t.save){
    		if (t.save[y]['marchId'] == Id){
	    		params.settings.cityId = t.save[y]['cityId'];
	    		params.queue[0].cityMarches.knightId = t.save[y]['knightId']; //parseInt(document.getElementById('AddKnights').value);
	    		params.queue[0].cityMarches.toXCoord = t.save[y]['toXCoord'];
	    		params.queue[0].cityMarches.toYCoord = t.save[y]['toYCoord'];
	    		params.queue[0].cityMarches.unit0Count = 0;
	    		params.queue[0].cityMarches.unit1Count = t.save[y]['unit1Count'];
	    		params.queue[0].cityMarches.unit2Count = t.save[y]['unit2Count'];
	    		params.queue[0].cityMarches.unit3Count = t.save[y]['unit3Count'];
	    		params.queue[0].cityMarches.unit4Count = t.save[y]['unit4Count'];
	    		params.queue[0].cityMarches.unit5Count = t.save[y]['unit5Count'];
	    		params.queue[0].cityMarches.unit6Count = t.save[y]['unit6Count'];
	    		params.queue[0].cityMarches.unit7Count = t.save[y]['unit7Count'];
	    		params.queue[0].cityMarches.unit8Count = t.save[y]['unit8Count'];
	    		params.queue[0].cityMarches.unit9Count = t.save[y]['unit9Count'];
	    		params.queue[0].cityMarches.unit10Count = t.save[y]['unit10Count'];
	    		params.queue[0].cityMarches.unit11Count = t.save[y]['unit12Count'];
	    		params.queue[0].cityMarches.unit12Count = t.save[y]['unit12Count'];
    		}
    	}	
    	 
    	 new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
    		  		method: "post",
    		         parameters: params,
    				 loading: true,
    				 onSuccess: function(transport){
    					var rslt = eval("(" + transport.responseText + ")");
    	                  if (rslt.ok) {
								t.GetRaids(params.settings.cityId);
      					        unsafeWindow.cityinfo_army();
      	                  		setTimeout(unsafeWindow.update_seed_ajax, 250);
      	                  		for (yy=0;yy<t.save.length;yy++){
      	                  			if (t.save[yy]['marchId'] == Id){
      	                  				  t.save.splice (yy,1);
      	                  			}	
      	                  		}
      	                  		var serverID = getServerId();
      	                  		setTimeout (function (){GM_setValue ('SavedRaids_'+serverID, JSON2.stringify(t.save));}, 0);
      	                  		t.paint();
    					 } else {
    					 	 /* var pop = new CPopup ('pbEditRaid', 0,0, 750,250, true);
				 		  	  if (t.popFirst){
				 		  	    pop.centerMe (mainPop.getMainDiv());  
				 		  	    t.popFirst = false;
				 		  	  }
				 		  	  pop.getTopDiv().innerHTML = '<CENTER><B>ERROR</b></center>';
				 		  	  var m= '<TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
				 			  m +=  '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/merlin_img.jpg"></td>';
				 			  m+='<TD style="align;left; max-width:200px; text-wrap:normal;word-wrap:break-word"><B>'+ rslt.msg+'</b></td>';
				 		  	  m+='<TD><CENTER>'+ strButton20('OK', 'id=pbOK') +'</center></td></tr>';
				 		  	  pop.getMainDiv().innerHTML = m;
				 			  document.getElementById('pbOK').addEventListener ('click', function(){pop.show (false)},false);
				 		  	  pop.show (true);*/
				 		  	  alert('Error: '+ rslt.msg);  	
    					 }
    				 },
    		 });    	
    },
    
        
  getKnights : function(cityId){
         var t = Tabs.Raid;
         var knt = new Array();
         var status ="";
         for (k in Seed.knights['city' + cityId]){
         		if ( Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
         		   if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 ) status = "Free";
         		   else status = "Marching";
         			knt.push ({
         				Name:   Seed.knights['city' + cityId][k]["knightName"],
         				Combat:	parseInt(Seed.knights['city' + cityId][k]["combat"]),
         				ID:		Seed.knights['city' + cityId][k]["knightId"],
         				Status: status,
         			});
         		}
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('AddKnights').options.length=0;
  		var o = document.createElement("option");
  		o.text = '--Choose a Knight--';
  		o.value = 0;
  		document.getElementById("AddKnights").options.add(o);
         for (k in knt){
      			if (knt[k]["Name"] !=undefined){
  	    			var o = document.createElement("option");
  	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +') (' + knt[k]["Status"] +')');
  	    			o.value = knt[k]["ID"];
  	    			document.getElementById("AddKnights").options.add(o);
      			}
      	}
      },
  
    
  clickCitySelect : function (city){
  	var t = Tabs.Raid;
  	t.cityId = city['id'];
  	t.GetRaids(t.cityId);
  },
  
  checkRaids : function (){
	var t = Tabs.Raid;
	var now = unixTime();
	if(!Options.RaidRunning) return;
	if ( (now - Options.RaidReset) > 7200 ) {
		Options.RaidReset = now;
		saveOptions();
		for (g=0;g<Seed.cities.length;g++){
				t.citiesdone = "";
				setTimeout(t.resetRaids, (1500*g), Seed.cities[g][0],Seed.cities[g][1]);
		}
		setTimeout(t.postLog, 30000);
	}
	t.raidtimer = setTimeout(t.checkRaids, 900000);
  },
  
  GetRaids : function(cityId){
  		var t = Tabs.Raid;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		  		
  		params.pf = 0;
  		params.ctrl = 'BotManager';
  		params.action = 'getMarches';
  		params.settings = {};
  		params.settings.cityId = cityId;
  		
  		
   		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
  				 loading: true,
  				 onSuccess: function(transport){
  					var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
                        	t.rslt = rslt;
  							t.paint();
  							unsafeWindow.cityinfo_army();
  							setTimeout(unsafeWindow.update_seed_ajax, 250);
  						}
  				 },
  		 });
  },
  
  
  resetRaids : function(cityId,cityName){
  		var t = Tabs.Raid;
  		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
  		  		
  		params.pf = 0;
  		params.ctrl = 'BotManager';
  		params.action = 'resetRaidTimer';
		params.settings = {};
  		params.settings.cityId = cityId;
  		
  		
   		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
  		         method: "post",
  		         parameters: params,
				 loading: true,
				 onSuccess: function(transport){
					var rslt = eval("(" + transport.responseText + ")");
                        if (rslt.ok) {
							unsafeWindow.cityinfo_army();
                            setTimeout(unsafeWindow.update_seed_ajax, 250);
                            t.citiesdone += cityName + ' ';
						}
				 },
  		 });
  },
  
  postLog : function (){
  		var t = Tabs.Raid;
  		actionLog('Reset Raidtimer: ' + t.citiesdone);
  },
  
  sendreport: function(){
	  var t = Tabs.Raid;
	  if(!Options.foodreport) return;
	  var now = new Date().getTime()/1000.0;
      now = now.toFixed(0);
      if (now < (parseInt(Options.LastReport)+(Options.MsgInterval*60*60))) return;
	
	var total = 0;
    var message = 'Raid Stats: %0A';
    message += '%0A Food Gain (for '+ Options.MsgInterval +' hour of raiding) %0A';
    for (q=1;q<=Seed.cities.length;q++){
    	var cityID = 'city' + Seed.cities[q-1][0];
    	var gain = parseInt(Seed.resources[cityID]['rec1'][0] / 3600) - Options.Foodstatus[q];
    	message+= Seed.cities[q-1][1] + ': Start: ' + addCommas(Options.Foodstatus[q]) + ' End :' + addCommas(parseInt(Seed.resources[cityID]['rec1'][0] / 3600)) + ' Gain: ';
    	message += addCommas(gain)  + '%0A';
		total += gain;
		Options.Foodstatus[q] = parseInt(Seed.resources[cityID]['rec1'][0] / 3600);
    }
	message += '%0A Total food gain : '+addCommas(total)+'%0A';
	
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.emailTo = Seed.player['name'];
    params.subject = "Raid Overview";
    params.message = message;
    params.requestType = "COMPOSED_MAIL";
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function (message) {
            var rslt = eval("(" + message.responseText + ")");
            if (rslt.ok) {
            } else {
            }
        },
        onFailure: function () {
        },
    });
	
    Options.LastReport = now;
    saveOptions();
  },
  
  toggleRaidState : function (){
  	var t = Tabs.Raid;
  	if(Options.RaidRunning){
  		Options.RaidRunning = false;
  		t.raidtimer = null;
  		document.getElementById('pbRaidStart').value = 'Auto Reset = OFF';
  	} else {
  		Options.RaidRunning = true;
  		t.raidtimer = setTimeout(t.checkRaids, 5000);
  		document.getElementById('pbRaidStart').value = 'Auto Reset = ON';
  	}
  	saveOptions();
  },
  
    
  hide : function (){
  },

  show : function (){
  },
 }; 
 

/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 130,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>ACTION LOG - VERSION: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  },
  
  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}
    

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 90,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '<DIV style="height:500px; max-height:500px; overflow-y:auto"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>Power Bot Config:</b></td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>Enable window drag (move window by dragging top bar with mouse)</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>Remember window open state on refresh</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>Hide window when clicking on map coordinates</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>Enable widescreen style: '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' (all domains, requires refresh)</td>\
        <TR><TD colspan=2><BR><B>KofC Features:</b></td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>Disable all Fairie popup windows</td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>Refresh if KOC not loaded within 1 minute (all domains)</td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>Refresh KOC every <INPUT id=pbeverymins type=text size=2 maxlength=3 \> minutes</td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>Put chat on right (requires wide screen)</td></tr>\
		<TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>Use WideMap (requires wide screen)</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>Auto collect gold when happiness reaches <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
        <TR><TD><INPUT id=pbFoodToggle type=checkbox /></td><TD>Enable Food Alert (On less then 6 Hours of food checked every hour)</td></tr>\
        <TR><TD colspan=2><BR><B>Extra Features:</b></td></tr>\
        <TR><TD><INPUT id=HelReq type=checkbox /></td><TD>Help alliance build/research posts</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>Hide alliance requests in chat</td></tr>\
        <TR><TD><INPUT id=PubReq type=checkbox '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +'/></td><TD>Auto publish Facebook posts for '+ htmlSelector({0:'----', 80:'Everyone', 50:'Friends of Friends', 40:'Friends Only', 10:'Only Me'},GlobalOptions.autoPublishPrivacySetting,'id=selectprivacymode') +' (For all domains)</td>\
        <TR><TD><INPUT id=MapExtra type=checkbox /></td><TD>Show Player & Might in map.</td></tr>\
        <TR><TD><INPUT id=deletetoggle type=checkbox /></td><TD> Auto delete barb/transport reports from you</td></tr>\
        <TR><TD><INPUT id=deletes0toggle type=checkbox /></td><TD> Auto delete transport reports to you</td></tr>\
        <TR><TD><INPUT id=deletes1toggle type=checkbox /></td><TD> Auto delete wild reports</td></tr>\
        </table><BR><BR><HR>Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable.</div>';
        m += strButton20('Reset ALL Options', 'id=ResetALL');
      div.innerHTML = m;

      document.getElementById('selectScreenMode').addEventListener ('change', function(){
      		GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
      		GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);	
      document.getElementById('selectprivacymode').addEventListener ('change', function(){
      		GlobalOptions.autoPublishPrivacySetting = document.getElementById('selectprivacymode').value;
			GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
	  document.getElementById('PubReq').addEventListener ('change', function(){
      		GlobalOptions.autoPublishGamePopups = document.getElementById('PubReq').checked;
			GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);	
	  
	  document.getElementById('ResetALL').addEventListener ('click', function(){
	  		var serverID = getServerId();
	  		RemoveList = (GM_listValues());
	  		for (i=0;i<RemoveList.length;i++){
	  			logit(RemoveList[i]);
	  			GM_deleteValue(RemoveList[i]);
	  		}
	  		ResetAll=true;
	  		reloadKOC();
	  },false);	
	  	
      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.togOpt ('pbFoodToggle', 'pbFoodAlert');
      t.changeOpt ('pbeverymins', 'pbEveryMins');
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('HelReq', 'HelpRequest');
      t.togOpt ('DelReq', 'DeleteRequest');
      t.togOpt ('MapExtra', 'MapShowExtra');
      t.togOpt ('deletetoggle', 'DeleteMsg');
      t.togOpt ('deletes0toggle', 'DeleteMsgs0');
	  t.togOpt ('deletes1toggle', 'DeleteMsgs1');
	  	
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }      
  },

  hide : function (){
  },

  show : function (){
  },

  togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  
  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  
  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
}


/****************************  Reassign Implementation  *******************************/
var troops = {1:'SupplyTroops',
			  2:'Militiaman',
			  3:'Scout',
			  4:'Pikeman',
			  5:'Swordsman',
			  6:'Archer',
			  7:'Cavalry',
			  8:'HeavyCavalry',
			  9:'SupplyWagon',
			  10:'Ballista',
			  11:'BatteringRam',
			  12:'Catapult'};  
Tabs.Reassign = {
  tabOrder: 30,
  tabLabel: 'Reassign',
  myDiv: null,
  timer: null,
  reassignState: [],
  lRE: [],
  reassignRoutes: [],
  rallypointlevel:null,
  count:0,
  check:false,

    init: function(div){
		var t = Tabs.Reassign;
        t.myDiv = div;
		t.reassignState = {
            running: false,
        };
        t.readReassignState();
		t.readReassignRoutes();
		t.e_reassignRoutes();

      var m = '<DIV id=pbReMainDivF class=pbStat>AUTOMATED REASSIGN FUNCTION</div><TABLE id=pbtraderfunctions width=100% height=0% class=pbTab><TR align="center">';
      if (t.reassignState.running == false) {
          m += '<TD><INPUT id=pbReassignState type=submit value="Reassign = OFF"></td>';
      } else {
          m += '<TD><INPUT id=pbReassignState type=submit value="Reassign = ON"></td>';
      }
      m += '<TD><INPUT id=pbReassShowRoutes type=submit value="Show Routes"></td>';
      m += '</tr></table></div>';
      m += '<DIV id=pbReassignDivD class=pbStat>ADD REASSIGN ROUTE</div>';

      m += '<TABLE id=pbaddreasignroute width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD width=20px>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncity></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD width=20px>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptassigncityTo></span></div></td>';
	  
	    m += '<TR align="left">';
	    m += '<TD colspan=4>Time inbetween to check reassign: <INPUT id=pbreassigninterval type=text size=2 value="'+Options.reassigninterval+'"\> minutes</td></tr></table>';
      
      m += '<DIV style="margin-top:10px;margin-bottom:5px;">Fill in the number of troops you want to keep in a city:</div>';
      m += '<TABLE id=pbaddreasignroute width=100% height=0% class=pbTab><TR align="center">';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
      m += '<TD>Supply Troop</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
      m += '<TD>Militiaman</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
      m += '<TD>Scout</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
      m += '<TD>Pikeman</td></tr>'
      m += '<TR><TD><INPUT id=pbSupplyTroops type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSupplyTroops disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbMilitiaman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetMilitiaman disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbScout type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetScout disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbPikeman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetPikeman disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
      m += '<TD>Swordsman</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
      m += '<TD>Archer</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
      m += '<TD>Cavalry</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
      m += '<TD>Heavy Cavalry</td></tr>'
      m += '<TR><TD><INPUT id=pbSwordsman type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSwordsman disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbArcher type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetArcher disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbCavalry type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetCavalry disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbHeavyCavalry type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetHeavyCavalry disabled=true type=text size=10 maxlength=10 value="0"\></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
      m += '<TD>Supply Wagon</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
      m += '<TD>Ballista</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
      m += '<TD>Battering Ram</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
      m += '<TD>Catapult</td></tr>'
      m += '<TR><TD><INPUT id=pbSupplyWagon type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetSupplyWagon disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbBallista type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetBallista disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbBatteringRam type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetBatteringRam disabled=true type=text size=10 maxlength=10 value="0"\></td>';
      m += '<TD><INPUT id=pbCatapult type=checkbox unchecked=true\>';
      m += '<INPUT id=pbtargetCatapult disabled=true type=text size=10 maxlength=10 value="0"\></td></tr></table>';
      
      m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteReassign type=submit value="Add Route"></div>';
      
      t.myDiv.innerHTML = m;
      
      t.tcp = new CdispCityPicker ('ptreassign', document.getElementById('ptassigncity'), true, null, 0);
	  t.tcpto = new CdispCityPicker ('ptreassignTo', document.getElementById('ptassigncityTo'), true);
	  for(var k in troops){
      document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);
	  }

      document.getElementById('ptassigncity').addEventListener('click', function(){
	    for(var k in troops){
        document.getElementById('pbtarget'+troops[k]).value = parseInt(Seed.units['city' + t.tcp.city.id]['unt'+k]);
	    }
      }, false);
      
      document.getElementById('pbReassignState').addEventListener('click', function(){
      	t.toggleReassignState(this);
      }, false);
      document.getElementById('pbSaveRouteReassign').addEventListener('click', function(){
      t.addReassignRoute();
      }, false);
      document.getElementById('pbReassShowRoutes').addEventListener('click', function(){
      t.showReassignRoutes();
      }, false);
      
      document.getElementById('pbreassigninterval').addEventListener('keyup', function(){
		if (isNaN(document.getElementById('pbreassigninterval').value)){ document.getElementById('pbreassigninterval').value=0 ;}
		Options.reassigninterval = document.getElementById('pbreassigninterval').value;
		saveOptions();
      }, false);
      
      document.getElementById('pbtargetSupplyTroops').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetSupplyTroops').value)) document.getElementById('pbtargetSupplyTroops').value=0 ;
      }, false);
      document.getElementById('pbtargetMilitiaman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetMilitiaman').value)) document.getElementById('pbtargetMilitiaman').value=0 ;
      }, false);
      document.getElementById('pbtargetScout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetScout').value)) document.getElementById('pbtargetScout').value=0 ;
      }, false);
      document.getElementById('pbtargetPikeman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetPikeman').value)) document.getElementById('pbtargetPikeman').value=0 ;
      }, false);
      document.getElementById('pbtargetSwordsman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetSwordsman').value)) document.getElementById('pbtargetSwordsman').value=0 ;
      }, false);
      document.getElementById('pbtargetArcher').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetArcher').value)) document.getElementById('pbtargetArcher').value=0 ;
      }, false);
      document.getElementById('pbtargetCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetCavalry').value)) document.getElementById('pbtargetCavalry').value=0 ;
      }, false);
      document.getElementById('pbtargetHeavyCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetHeavyCavalry').value)) document.getElementById('pbtargetHeavyCavalry').value=0 ;
      }, false);
      document.getElementById('pbtargetSupplyWagon').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetSupplyWagon').value)) document.getElementById('pbtargetSupplyWagon').value=0 ;
      }, false);
      document.getElementById('pbtargetBallista').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbtargetBallista').value)) document.getElementById('pbtargetBallista').value=0 ;
      }, false);
     document.getElementById('pbtargetBatteringRam').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbtargetBatteringRam').value)) document.getElementById('pbtargetBatteringRam').value=0 ;
     }, false);
     document.getElementById('pbtargetCatapult').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pbtargetCatapult').value)) document.getElementById('pbtargetCatapult').value=0 ;
     }, false);
     
      
      document.getElementById('pbSupplyTroops').addEventListener('click', function(){
          if (document.getElementById('pbSupplyTroops').checked==false) {
              document.getElementById('pbtargetSupplyTroops').disabled = true;
          }
          else {
            document.getElementById('pbtargetSupplyTroops').disabled = false;
          }
      },false);
      document.getElementById('pbMilitiaman').addEventListener('click', function(){
          if (document.getElementById('pbMilitiaman').checked==false) {
              document.getElementById('pbtargetMilitiaman').disabled = true;
          }
          else {
            document.getElementById('pbtargetMilitiaman').disabled = false;
          }
      },false);
      document.getElementById('pbScout').addEventListener('click', function(){
          if (document.getElementById('pbScout').checked==false) {
              document.getElementById('pbtargetScout').disabled = true;
          }
          else {
            document.getElementById('pbtargetScout').disabled = false;
          }
      },false);
      document.getElementById('pbPikeman').addEventListener('click', function(){
          if (document.getElementById('pbPikeman').checked==false) {
              document.getElementById('pbtargetPikeman').disabled = true;
          }
          else {
            document.getElementById('pbtargetPikeman').disabled = false;
          }
      },false);
      document.getElementById('pbSwordsman').addEventListener('click', function(){
          if (document.getElementById('pbSwordsman').checked==false) {
              document.getElementById('pbtargetSwordsman').disabled = true;
          }
          else {
            document.getElementById('pbtargetSwordsman').disabled = false;
          }
      },false);
      document.getElementById('pbArcher').addEventListener('click', function(){
          if (document.getElementById('pbArcher').checked==false) {
              document.getElementById('pbtargetArcher').disabled = true;
          }
          else {
            document.getElementById('pbtargetArcher').disabled = false;
          }
      },false);
      document.getElementById('pbCavalry').addEventListener('click', function(){
          if (document.getElementById('pbCavalry').checked==false) {
              document.getElementById('pbtargetCavalry').disabled = true;
          }
          else {
            document.getElementById('pbtargetCavalry').disabled = false;
          }
      },false);
      document.getElementById('pbHeavyCavalry').addEventListener('click', function(){
          if (document.getElementById('pbHeavyCavalry').checked==false) {
              document.getElementById('pbtargetHeavyCavalry').disabled = true;
          }
          else {
            document.getElementById('pbtargetHeavyCavalry').disabled = false;
          }
      },false);
      document.getElementById('pbSupplyWagon').addEventListener('click', function(){
          if (document.getElementById('pbSupplyWagon').checked==false) {
              document.getElementById('pbtargetSupplyWagon').disabled = true;
          }
          else {
            document.getElementById('pbtargetSupplyWagon').disabled = false;
          }
      },false);
      document.getElementById('pbBallista').addEventListener('click', function(){
          if (document.getElementById('pbBallista').checked==false) {
              document.getElementById('pbtargetBallista').disabled = true;
          }
          else {
            document.getElementById('pbtargetBallista').disabled = false;
          }
      },false);
      document.getElementById('pbBatteringRam').addEventListener('click', function(){
          if (document.getElementById('pbBatteringRam').checked==false) {
              document.getElementById('pbtargetBatteringRam').disabled = true;
          }
          else {
            document.getElementById('pbtargetBatteringRam').disabled = false;
          }
      },false);
      document.getElementById('pbCatapult').addEventListener('click', function(){
          if (document.getElementById('pbCatapult').checked==false) {
              document.getElementById('pbtargetCatapult').disabled = true;
          }
          else {
            document.getElementById('pbtargetCatapult').disabled = false;
          }
      },false);
      
      
      window.addEventListener('unload', t.onUnload, false);
    },
    
    getRallypoint: function(cityId){
      var t = Tabs.Reassign;
      for (var o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
	   }  
	},
      	  
    

	e_reassignRoutes: function(){
      var t = Tabs.Reassign;
      var now = new Date();
      if (t.reassignState.running == true)    {
      	var now = new Date().getTime()/1000.0;
      	now = now.toFixed(0);
      	var last = Options.lastreassign;
       		if ( now > (parseInt(last) + (Options.reassigninterval*60))){
    			  t.checkdoReassign();
      		}
      }
      setTimeout(function(){ t.e_reassignRoutes();}, Options.reassigninterval*1000);
      
    },
    	
	delReassignRoutes: function() {
    	
		var t = Tabs.Reassign;
    	
		t.reassignRoutes= [];
    
	},
	checkcoords : function (obj){
		var t = Tabs.Reassign;
		if(obj.id == 'pbok'){
			t.check = true;
			t.addReassignRoute();
		}
		return;			
	},
	addReassignRoute: function () {
		var t = Tabs.Reassign;
		var city = t.tcp.city.id;
		if(t.tcpto.city == null){
			new CdialogCancelContinue('<SPAN class=boldRed>No destination selected!</span>', null, null, mainPop.getMainDiv);
			return;
		}
		if(t.tcp.city.id == t.tcpto.city.id){
			new CdialogCancelContinue('<SPAN class=boldRed>Can\'t reassign to same city!</span>', null, null, mainPop.getMainDiv);
			return;
		}
		if ((t.tcpto.city.x == 0 && t.tcpto.city.y == 0)&& !t.check)
		{
			new CdialogConfirm ('<SPAN class=boldRed>You are about to set a route to location 0,0!</span>', t.checkcoords, unsafeWindow.modal_attack_check, mainPop.getMainDiv); 
			return;
		}
		t.check = false;
		
		var SendSupplyTroop = document.getElementById('pbSupplyTroops').checked;
		var SendMilitiaman = document.getElementById('pbMilitiaman').checked;
		var SendScout = document.getElementById('pbScout').checked;
		var SendPikeman = document.getElementById('pbPikeman').checked;
		var SendSwordsman = document.getElementById('pbSwordsman').checked;
		var SendArchers = document.getElementById('pbArcher').checked;
		var SendCavalry = document.getElementById('pbCavalry').checked;
		var SendHeavyCavalry = document.getElementById('pbHeavyCavalry').checked;
		var SendSupplyWagons = document.getElementById('pbSupplyWagon').checked;
		var SendBallista = document.getElementById('pbBallista').checked;
		var SendBatteringRam = document.getElementById('pbBatteringRam').checked;
		var SendCatapult = document.getElementById('pbCatapult').checked;
		var SupplyTroop = document.getElementById('pbtargetSupplyTroops').value;
		var Militiaman = document.getElementById('pbtargetMilitiaman').value;
		var Scout = document.getElementById('pbtargetScout').value;
		var Pikeman = document.getElementById('pbtargetPikeman').value;
		var Swordsman = document.getElementById('pbtargetSwordsman').value;
		var Archers = document.getElementById('pbtargetArcher').value;
		var Cavalry = document.getElementById('pbtargetCavalry').value;
		var HeavyCavalry = document.getElementById('pbtargetHeavyCavalry').value;
		var SupplyWagons = document.getElementById('pbtargetSupplyWagon').value;
		var Ballista = document.getElementById('pbtargetBallista').value;
		var BatteringRam = document.getElementById('pbtargetBatteringRam').value;
		var Catapult = document.getElementById('pbtargetCatapult').value;
		var target_x = t.tcpto.city.x;
		var target_y = t.tcpto.city.y;
				
		var lRE = t.reassignRoutes;
			lRE.push({
				city:				city,
				target_x:			target_x,
				target_y:			target_y,
				SendSupplyTroop:	SendSupplyTroop,
				SupplyTroop:		SupplyTroop,
				SendMilitiaman:		SendMilitiaman,
				Militiaman:			Militiaman,
				SendScout:			SendScout,
				Scout:				Scout,
				SendPikeman: 		SendPikeman,
				Pikeman: 			Pikeman,
				SendSwordsman:		SendSwordsman,
				Swordsman:			Swordsman,
				SendArchers:		SendArchers,
				Archers:			Archers,
				SendCavalry: 		SendCavalry,
				Cavalry: 			Cavalry,
				SendHeavyCavalry:	SendHeavyCavalry,
				HeavyCavalry:		HeavyCavalry,
				SendSupplyWagons:	SendSupplyWagons,
				SupplyWagons:		SupplyWagons,
				SendBallista: 		SendBallista,
				Ballista: 			Ballista,
				SendBatteringRam:	SendBatteringRam,
				BatteringRam:		BatteringRam,
				SendCatapult:		SendCatapult,
				Catapult:			Catapult,
			});
		document.getElementById('pbReassignDivD').style.background ='#99FF99';
		setTimeout(function(){ (document.getElementById('pbReassignDivD').style.background =''); }, 1000);
	},
	showReassignRoutes: function () {
		var t = Tabs.Reassign;
		var popReassignRoutes = null;
		t.popReassignRoutes = new CPopup('pbShowTrade', 0, 0, 1100, 500, true, function() {clearTimeout (1000);});
		var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowReassignRoutes" id="pbRoutesQueue">';       
		t.popReassignRoutes.getMainDiv().innerHTML = '</table></div>' + m;
		t.popReassignRoutes.getTopDiv().innerHTML = '<TD><B>Reassign routes:</td>';
		t.paintReassignRoutes();
		t._addTabHeader();
		t.popReassignRoutes.show(true)	;
	},
	paintReassignRoutes: function(){
	        var t = Tabs.Reassign;
	        var r = t.reassignRoutes;
	        var cityname;
			for (var i = (r.length-1); i>=0; i--) {
				for (var y=0; y< Seed.cities.length;y++) {
					if ( parseInt(Seed.cities[y][0]) == r[i].city) var cityname = Seed.cities[y][1];
				}    
				var queueId = i;
				t._addTab(queueId,cityname, r[i].target_x, r[i].target_y, r[i].SendSupplyTroop,r[i].SupplyTroop, r[i].SendMilitiaman, r[i].Militiaman, r[i].SendScout, r[i].Scout, r[i].SendPikeman, r[i].Pikeman, r[i].SendSwordsman, r[i].Swordsman, r[i].SendArchers, r[i].Archers, r[i].SendCavalry, r[i].Cavalry, r[i].SendHeavyCavalry, r[i].HeavyCavalry, r[i].SendSupplyWagons, r[i].SupplyWagons, r[i].SendBallista, r[i].Ballista, r[i].SendBatteringRam, r[i].BatteringRam, r[i].SendCatapult, r[i].Catapult);
	        }
	    },
	  
	 _addTab: function(queueId,cityname,target_x,target_y,SendSupplyTroop,SupplyTroop,SendMilitiaman,Militiaman,SendScout,Scout,SendPikeman,Pikeman,SendSwordsman,Swordsman,SendArchers,Archers,SendCavalry,Cavalry,SendHeavyCavalry,HeavyCavalry,SendSupplyWagons,SupplyWagons,SendBallista,Ballista,SendBatteringRam,BatteringRam,SendCatapult,Catapult){
	 	var t = Tabs.Reassign;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = queueId;
	     row.insertCell(1).innerHTML = cityname;
	     row.insertCell(2).innerHTML = target_x + ',' + target_y;
	     row.insertCell(3).innerHTML = SendSupplyTroop;
	     row.insertCell(4).innerHTML = addCommas(SupplyTroop);
	     row.insertCell(5).innerHTML = SendMilitiaman;
	     row.insertCell(6).innerHTML = addCommas(Militiaman);
	 	 row.insertCell(7).innerHTML = SendScout;
	 	 row.insertCell(8).innerHTML = addCommas(Scout);
	 	 row.insertCell(9).innerHTML = SendPikeman;
	 	 row.insertCell(10).innerHTML = addCommas(Pikeman);
	 	 row.insertCell(11).innerHTML = SendSwordsman;
	 	 row.insertCell(12).innerHTML = addCommas(Swordsman);
	 	 row.insertCell(13).innerHTML = SendArchers;
	 	 row.insertCell(14).innerHTML = addCommas(Archers);
	 	 row.insertCell(15).innerHTML = SendCavalry;
	 	 row.insertCell(16).innerHTML = addCommas(Cavalry);
	 	 row.insertCell(17).innerHTML = SendHeavyCavalry;
	 	 row.insertCell(18).innerHTML = addCommas(HeavyCavalry);
	 	 row.insertCell(19).innerHTML = SendSupplyWagons;
	 	 row.insertCell(20).innerHTML = addCommas(SupplyWagons);
	 	 row.insertCell(21).innerHTML = SendBallista;
	 	 row.insertCell(22).innerHTML = addCommas(Ballista);
	 	 row.insertCell(23).innerHTML = SendBatteringRam;
	 	 row.insertCell(24).innerHTML = addCommas(BatteringRam);
	 	 row.insertCell(25).innerHTML = SendCatapult;
	 	 row.insertCell(26).innerHTML = addCommas(Catapult);
	     row.insertCell(27).innerHTML = '<a class="button20" id="tradecancel_' + queueId + '"><span>Delete</span></a>';
	     document.getElementById('tradecancel_' + queueId).addEventListener('click', function(){
	        t.cancelQueueElement(queueId);
	     }, false);
	 },
	 
	 _addTabHeader: function() {
	 var t = Tabs.transport;
	     var row = document.getElementById('pbRoutesQueue').insertRow(0);
	     row.vAlign = 'top';
	     row.insertCell(0).innerHTML = "ID";
	     row.insertCell(1).innerHTML = "From";
	     row.insertCell(2).innerHTML = "To";
	     row.insertCell(3).innerHTML = "Sup. Tr.";
	     row.insertCell(4).innerHTML = "";
	     row.insertCell(5).innerHTML = "MM";
	     row.insertCell(6).innerHTML = "";
	 	 row.insertCell(7).innerHTML = "Scouts";
	     row.insertCell(8).innerHTML = "";
	     row.insertCell(9).innerHTML = "Pike";
	     row.insertCell(10).innerHTML = "";
	     row.insertCell(11).innerHTML = "Swords";
	     row.insertCell(12).innerHTML = "";
	     row.insertCell(13).innerHTML = "Archers";
	     row.insertCell(14).innerHTML = "";
	     row.insertCell(15).innerHTML = "Cav.";
	     row.insertCell(16).innerHTML = "";
	     row.insertCell(17).innerHTML = "HC";
	     row.insertCell(18).innerHTML = "";
	     row.insertCell(19).innerHTML = "Wagons";
	     row.insertCell(20).innerHTML = "";
	     row.insertCell(21).innerHTML = "Ballista";
	     row.insertCell(22).innerHTML = "";
	     row.insertCell(23).innerHTML = "Rams";
	     row.insertCell(24).innerHTML = "";
	     row.insertCell(25).innerHTML = "Catapults";
	     row.insertCell(26).innerHTML = "";
	     row.insertCell(27).innerHTML = "Delete";
	   },   
	   
	 cancelQueueElement: function(queueId){
	     var t = Tabs.Reassign;
	     var queueId = parseInt(queueId);
	     t.reassignRoutes.splice(queueId, 1);
	     t.showReassignRoutes();
	 },
	   
	saveReassignRoutes: function(){
		var t = Tabs.Reassign;
        var serverID = getServerId();
        GM_setValue('reassignRoutes_' + serverID, JSON2.stringify(t.reassignRoutes));
    },
    readReassignRoutes: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        s = GM_getValue('reassignRoutes_' + serverID);
        if (s != null) {
            route = JSON2.parse(s);
            for (k in route)
                t.reassignRoutes[k] = route[k];
        }
    },
	saveReassignState: function(){
		var t = Tabs.Reassign;
        var serverID = getServerId();
        GM_setValue('reassignState_' + serverID, JSON2.stringify(t.reassignState));
    },
    readReassignState: function(){
        var t = Tabs.Reassign;
        var serverID = getServerId();
        s = GM_getValue('reassignState_' + serverID);
        if (s != null) {
            state = JSON2.parse(s);
            for (k in state)
                t.reassignState[k] = state[k];
        }
    },
    toggleReassignState: function(obj){
		var t = Tabs.Reassign;
        if (t.reassignState.running == true) {
            t.reassignState.running = false;
            obj.value = "Reassign = OFF";
			t.checkdoreassigntimeout = null;
			t.count = 0;
        }
        else {
            t.reassignState.running = true;
            obj.value = "Reassign = ON";
			t.e_reassignRoutes();
        }
    },
	
	checkdoReassign: function(){
	var t = Tabs.Reassign;
	t.doReassign(t.count);
	t.count++;
		if(t.count < t.reassignRoutes.length && t.reassignState.running){
		  t.checkdoreassigntimeout = setTimeout(function() { t.checkdoReassign();}, 5000);
		} else {
		  var now = new Date().getTime()/1000.0;
		  now = now.toFixed(0);
		  Options.lastreassign = now;
		  saveOptions();	
		  t.count = 0;
		}
	},
    
    doReassign: function(count){
    	var t = Tabs.Reassign;
   		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
   		if(t.reassignRoutes.length==0) return;
   		var send=[];
   		var citytotal=0;
   		var totalsend=0;
		params.u1 = 0;
		params.u2 = 0;
		params.u3 = 0;
		params.u4 = 0;
		params.u5 = 0;
		params.u6 = 0;
		params.u7 = 0;
		params.u8 = 0;
		params.u9 = 0;
		params.u10 = 0;
		params.u11 = 0;
		params.u12 = 0;	
				
   	 	var city = t.reassignRoutes[count]["city"];
   	 	var xcoord = t.reassignRoutes[count]["target_x"];
   	 	var ycoord = t.reassignRoutes[count]["target_y"];
    	
    	var cityID = 'city' + city;
		var marching = getMarchInfo(cityID);
    	t.getRallypoint(cityID);
		if(t.rallypointlevel == 11) t.rallypointlevel = 15;
    	var maxsend = (t.rallypointlevel * 10000);
    	totalsend=0;
    	
    	var troopsselect=["SupplyTroop","Militiaman","Scout","Pikeman","Swordsman","Archers","Cavalry","HeavyCavalry","SupplyWagons","Ballista","BatteringRam","Catapult"];
    	for (k=0; k<troopsselect.length; k++) {
			var citytroops = Seed.units[cityID]['unt'+(parseInt(k)+1)];
			var marchtroops = marching.marchUnits[parseInt(k)+1];
			citytotal = parseInt(citytroops) + parseInt(marchtroops);
			//alert(citytotal + ' > ' + t.reassignRoutes[count][troopsselect[k]] + ' - ' + totalsend + ' <= ' + maxsend + ' - ' + t.reassignRoutes[count]['Send'+troopsselect[k]]);
			//if(k== 5) GM_log(citytotal +'  ' + t.reassignRoutes[count][troopsselect[k]]);
			if(t.reassignRoutes[count]['Send'+troopsselect[k]]==false) {continue; }
			if(citytotal > t.reassignRoutes[count][troopsselect[k]]){
				var sendtroops = parseInt(citytotal) - parseInt(t.reassignRoutes[count][troopsselect[k]]);
				if (parseInt(sendtroops) > parseInt(citytroops)) sendtroops = citytroops;
				if (parseInt(sendtroops) < 0) sendtroops = 0;
				send[(parseInt(k)+1)] = sendtroops;
				totalsend += send[(parseInt(k)+1)];
				//alert(parseInt(k)+1 + ' - ' + citytotal+ ' : ' + troopsselect[k] + ' / ' + t.reassignRoutes[0][troopsselect[k]]);    			
				
			}
			if(totalsend > maxsend){
				totalsend -= send[(parseInt(k)+1)];
				send[(parseInt(k)+1)] = parseInt(maxsend-totalsend);
				totalsend += send[(parseInt(k)+1)];
				break;
			}
       	}
    	
    	for (var t=0; t< Seed.cities.length;t++) {
    		if ( parseInt(Seed.cities[t][0]) == city) var cityname = Seed.cities[t][1];
    	}
    	
  		params.cid= city;
		params.type = "5";
		params.kid=0;
		params.xcoord = xcoord;
		params.ycoord = ycoord;
		params.u1 = send[1];
		params.u2 = send[2];
		params.u3 = send[3];
		params.u4 = send[4];
		params.u5 = send[5];
		params.u6 = send[6];
		params.u7 = send[7];
		params.u8 = send[8];
		params.u9 = send[9];
		params.u10 = send[10];
		params.u11 = send[11];
		params.u12 = send[12];	
		
   		if (totalsend >0) {
           
      		new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  actionLog('Reassign   From: ' + cityname + "   To: " + xcoord + ',' + ycoord + "    ->   Troops: " + totalsend);
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  					for(i = 0; i <= unitsarr.length; i++){
                  						if(params["u"+i]){
                  								unitsarr[i] = params["u"+i];
                  						}
                  					}
                  var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  var currentcityid = city;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  } else {
                  actionLog('REASSIGN FAIL :' + cityname + ' - ' + rslt.error_code + ' -  ' + rslt.msg + ' -  ' + rslt.feedback);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
   	 }      
	},
	
	show: function(){
		var t = Tabs.Reassign;
    },
	hide: function(){
        var t = Tabs.Reassign;
    },
    onUnload: function(){
        var t = Tabs.Reassign;
        if (!ResetAll) t.saveReassignRoutes();
		if (!ResetAll) t.saveReassignState();
        
    },
}


/************************  Reinforce Tab ************************/
Tabs.Reinforce = {
  tabOrder: 40,
  tabLabel: 'Reinforce',
  myDiv: null,
  cityID: null,
  rallypointlevel:null,
  maxsend:0,
  dist:0,
  ETAstr:null,
  ETAType:null,
  checkETA:null,

    init: function(div){
		var t = Tabs.Reinforce;
        t.myDiv = div;

      var m = '<DIV id=pbReinfMain class=pbStat>REINFORCE</div><TABLE id=pireinforce width=100% height=0% class=pbTab><TR align="center">';
      
      m += '<TABLE id=pbReinf width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD width=20px>From City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptRfcityFrom></span></div></td></tr>';

      m += '<TR align="left">';
      m += '<TD>To City:</td> <TD width=310px><DIV style="margin-bottom:10px;"><span id=ptRfcityTo></span></div></td>';
      m += '<TD>OR</td>';
      m += '<TD>X:<INPUT id=pfToX type=text size=3\></td>';
      m += '<TD>Y:<INPUT id=pfToY type=text size=3\></td></tr></table>';
      
      m += '<TABLE id=pbReinfETA width=95% height=0% class=pbTab><TR align="left">';
      m += '<TD><DIV id=pbdistance>Distance N/A</div></td>';
      m += '<TD><DIV id=pbETA>ETA N/A</div></td>';
      m += '<TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
      m += '<TD><INPUT id=pisendfood type=text size=11 maxlength=11 value="0"\><INPUT id=MaxFood type=submit value="Max"></td></tr></table>';
            
      m += '<TABLE id=pbaddreinfroute width=100% height=0% class=pbTab><TR align="center">';
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
      m += '<TD id=unt1></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
      m += '<TD id=unt2></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
      m += '<TD id=unt3></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
      m += '<TD id=unt4></td>'
      m += '<TR><TD><INPUT id=pitargetSupplyTroops type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSupplyTroops type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetMilitiaman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxMilitiaman type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetScout type=text size=6 maxlength=6 value="0"\><INPUT id=MaxScout type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetPikeman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxPikeman type=submit value="Max"></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
      m += '<TD id=unt5></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
      m += '<TD id=unt6></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
      m += '<TD id=unt7></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
      m += '<TD id=unt8></td>'
      m += '<TR><TD><INPUT id=pitargetSwordsman type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSwordsman type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetArcher type=text size=6 maxlength=6 value="0"\><INPUT id=MaxArcher type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetCavalry type=text size=6 maxlength=6 value="0"\><INPUT id=MaxCavalry type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetHeavyCavalry type=text size=6 maxlength=6 value="0"\><INPUT id=MaxHeavyCavalry type=submit value="Max"></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
      m += '<TD id=unt9></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
      m += '<TD id=unt10></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
      m += '<TD id=unt11></td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
      m += '<TD id=unt12></td>'
      m += '<TR><TD><INPUT id=pitargetSupplyWagon type=text size=6 maxlength=6 value="0"\><INPUT id=MaxSupplyWagon type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetBallista type=text size=6 maxlength=6 value="0"\><INPUT id=MaxBallista type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetBatteringRam type=text size=6 maxlength=6 value="0"\><INPUT id=MaxBatteringRam type=submit value="Max"></td>';
      m += '<TD><INPUT id=pitargetCatapult type=text size=6 maxlength=6 value="0"\><INPUT id=MaxCatapult type=submit value="Max"></td></tr></table>';
      
      m += '<TABLE id=pbReinfETA width=95% height=0% class=pbTab><TR align="center">';
      m += '<TD><SELECT id=piKnight type=list></select></td>';
      m += '<TD><INPUT id=piDoreinforce type=submit value="Reinforce"></td>';
      
      t.myDiv.innerHTML = m;
      
      
      t.from = new CdispCityPicker ('prfrom', document.getElementById('ptRfcityFrom'), true, t.ClickCitySelect, 0);
      t.to = new CdispCityPicker ('ptto', document.getElementById('ptRfcityTo'), true, t.NoClickCitySelect,0);
      
	  t.getKnights();
	  
      document.getElementById('pfToX').value = t.to.city.x;
      document.getElementById('pfToY').value = t.to.city.y;
      
	 document.getElementById('ptRfcityTo').addEventListener('click', function(){
  	 document.getElementById('pfToX').value = t.to.city.x;
     document.getElementById('pfToY').value = t.to.city.y;
 	 }, false);
      
      document.getElementById('ptRfcityTo').addEventListener('click', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
          	document.getElementById('pbdistance').innerHTML = ('Distance: '+t.dist);
          	t.ETA(t.dist);
          	document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      
      document.getElementById('pfToX').addEventListener('keyup', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
       		document.getElementById('pbdistance').innerHTML = ('Distance: '+t.dist);
       		t.ETA(t.dist);
       		document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('pfToY').addEventListener('keyup', function(){
       t.dist = distance (t.from.city.x, t.from.city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
       		document.getElementById('pbdistance').innerHTML = ('Distance: '+t.dist);
       		t.ETA(t.dist);
       		document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('piDoreinforce').addEventListener('click', function(){
      		t.doReinforce();
      }, false);
      
     document.getElementById('MaxFood').addEventListener('click', function(){
     		var maxfood =0;
     		var featherweight = parseInt(Seed.tech.tch10);
     		maxfood += ( (200 + (200/10*featherweight)) * parseInt(document.getElementById('pitargetSupplyTroops').value));
     		maxfood += ( (20 + (20/10*featherweight)) *parseInt(document.getElementById('pitargetMilitiaman').value));
     		maxfood += ( (5 + (5/10*featherweight)) *parseInt(document.getElementById('pitargetScout').value));
     		maxfood += ((40 + (40/10*featherweight))*parseInt(document.getElementById('pitargetPikeman').value));
     		maxfood += ( (30 + (30/10*featherweight))*parseInt(document.getElementById('pitargetSwordsman').value));
     		maxfood += ((25 + (25/10*featherweight))*parseInt(document.getElementById('pitargetArcher').value));
     		maxfood += ((100 + (100/10*featherweight))*parseInt(document.getElementById('pitargetCavalry').value));
     		maxfood += (80*parseInt(document.getElementById('pitargetHeavyCavalry').value));
     		maxfood += ((5000 + (5000/10*featherweight))*parseInt(document.getElementById('pitargetSupplyWagon').value));
     		maxfood += ((35 + (35/10*featherweight))*parseInt(document.getElementById('pitargetBallista').value));
     		maxfood += ((45 + (45/10*featherweight))*parseInt(document.getElementById('pitargetBatteringRam').value));
     		maxfood += ((75 + (75/10*featherweight))*parseInt(document.getElementById('pitargetCatapult').value));
     		document.getElementById('pisendfood').value = maxfood;
     }, false);
         
      document.getElementById('MaxSupplyTroops').addEventListener('click', function(){
      		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSupplyTroops').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+1]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+1]);
      		document.getElementById('pitargetSupplyTroops').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('MaxMilitiaman').addEventListener('click', function(){
      		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetMilitiaman').value == 0) t.maxsend = t.maxsend - othertroops;
          
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+2]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+2]);
      		document.getElementById('pitargetMilitiaman').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      
      document.getElementById('MaxScout').addEventListener('click', function(){
      	t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetScout').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+3]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+3]);
      		document.getElementById('pitargetScout').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
 
 	  document.getElementById('MaxPikeman').addEventListener('click', function(){
 	  	t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetPikeman').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+4]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+4]);
      		document.getElementById('pitargetPikeman').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxSwordsman').addEventListener('click', function(){
 	  		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSwordsman').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+5]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+5]);
      		document.getElementById('pitargetSwordsman').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxArcher').addEventListener('click', function(){
 	  	t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetArcher').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+6]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+6]);
      		document.getElementById('pitargetArcher').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxCavalry').addEventListener('click', function(){
 	  	t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetCavalry').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+7]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+7]);
      		document.getElementById('pitargetCavalry').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxHeavyCavalry').addEventListener('click', function(){
 	  		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetHeavyCavalry').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+8]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+8]);
      		document.getElementById('pitargetHeavyCavalry').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxSupplyWagon').addEventListener('click', function(){
 	  		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetSupplyWagon').value == 0) t.maxsend = t.maxsend - othertroops;
           if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+9]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+9]);
      		document.getElementById('pitargetSupplyWagon').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxBallista').addEventListener('click', function(){
 	  	t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetBallista').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+10]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+10]);
      		document.getElementById('pitargetBallista').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxBatteringRam').addEventListener('click', function(){
 	  		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetBatteringRam').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+11]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+11]);
      		document.getElementById('pitargetBatteringRam').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
 	  document.getElementById('MaxCatapult').addEventListener('click', function(){
 	  		t.maxsend = (t.rallypointlevel * 10000);
      		var othertroops = (parseInt(document.getElementById('pitargetSupplyTroops').value) + parseInt(document.getElementById('pitargetMilitiaman').value) + parseInt(document.getElementById('pitargetScout').value) + parseInt(document.getElementById('pitargetPikeman').value) + parseInt(document.getElementById('pitargetSwordsman').value) + parseInt(document.getElementById('pitargetArcher').value) + parseInt(document.getElementById('pitargetCavalry').value) + parseInt(document.getElementById('pitargetHeavyCavalry').value) + parseInt(document.getElementById('pitargetSupplyWagon').value) + parseInt(document.getElementById('pitargetBallista').value) + parseInt(document.getElementById('pitargetBatteringRam').value) + parseInt(document.getElementById('pitargetCatapult').value));
          if ( othertroops >= (t.rallypointlevel * 10000) ) {
             document.getElementById('pitargetSupplyTroops').value =0;
             document.getElementById('pitargetMilitiaman').value =0;
             document.getElementById('pitargetScout').value =0;
             document.getElementById('pitargetPikeman').value =0;
             document.getElementById('pitargetSwordsman').value =0;
             document.getElementById('pitargetArcher').value =0;
             document.getElementById('pitargetCavalry').value =0;
             document.getElementById('pitargetHeavyCavalry').value =0;
             document.getElementById('pitargetSupplyWagon').value =0;
             document.getElementById('pitargetBallista').value =0;
             document.getElementById('pitargetBatteringRam').value =0;
             document.getElementById('pitargetCatapult').value =0;
          }
          if (document.getElementById('pitargetCatapult').value == 0) t.maxsend = t.maxsend - othertroops;
          if (t.maxsend ==0) t.maxsend = (t.rallypointlevel * 10000);
          if (parseInt(Seed.units['city' + t.from.city.id]['unt'+12]) < t.maxsend) t.maxsend = parseInt(Seed.units['city' + t.from.city.id]['unt'+12]);
      		document.getElementById('pitargetCatapult').value = t.maxsend;
      		t.SetETAType();
      		t.ETA(t.dist);
      		document.getElementById('pbETA').innerHTML = (t.ETAstr);
 	  }, false);
 	  
      document.getElementById('pitargetSupplyTroops').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSupplyTroops').value)) document.getElementById('pitargetSupplyTroops').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetMilitiaman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetMilitiaman').value)) document.getElementById('pitargetMilitiaman').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetScout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetScout').value)) document.getElementById('pitargetScout').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetPikeman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetPikeman').value)) document.getElementById('pitargetPikeman').value=0 ;
          t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetSwordsman').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSwordsman').value)) document.getElementById('pitargetSwordsman').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetArcher').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetArcher').value)) document.getElementById('pitargetArcher').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetCavalry').value)) document.getElementById('pitargetCavalry').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetHeavyCavalry').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetHeavyCavalry').value)) document.getElementById('pitargetHeavyCavalry').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetSupplyWagon').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetSupplyWagon').value)) document.getElementById('pitargetSupplyWagon').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
      document.getElementById('pitargetBallista').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pitargetBallista').value)) document.getElementById('pitargetBallista').value=0 ;
         t.SetETAType();
          document.getElementById('pbETA').innerHTML = (t.ETAstr);
      }, false);
     document.getElementById('pitargetBatteringRam').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pitargetBatteringRam').value)) document.getElementById('pitargetBatteringRam').value=0 ;
        t.SetETAType();
         document.getElementById('pbETA').innerHTML = (t.ETAstr);
     }, false);
     document.getElementById('pitargetCatapult').addEventListener('keyup', function(){
         if (isNaN(document.getElementById('pitargetCatapult').value)) document.getElementById('pitargetCatapult').value=0 ;
        	t.SetETAType();
         document.getElementById('pbETA').innerHTML = (t.ETAstr);
     }, false);

        
      window.addEventListener('unload', t.onUnload, false);
    },
    
    ClickCitySelect: function(city){
    		var t = Tabs.Reinforce;
    		t.getKnights();	 
    		t.clearbox();
    		t.dist = distance (city.x, city.y, document.getElementById('pfToX').value, document.getElementById('pfToY').value);
    		document.getElementById('pbdistance').innerHTML = ('Distance: '+t.dist);
    		t.SetETAType();
    		t.ETA(t.dist);
    		for (var i=1;i<=12;i++) document.getElementById('unt'+i).innerHTML = addCommas(Seed.units['city'+city.id]['unt'+i]) 
    		document.getElementById('pbETA').innerHTML = (t.ETAstr);
    },
     		
    getKnights : function(){
       var t = Tabs.Reinforce;
       var knt = new Array();
       t.getRallypoint('city' +t.from.city.id);
       for (k in Seed.knights['city' + t.from.city.id]){
       		if (Seed.knights['city' + t.from.city.id][k]["knightStatus"] == 1 && Seed.leaders['city' + t.from.city.id]["resourcefulnessKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["politicsKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["combatKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"] && Seed.leaders['city' + t.from.city.id]["intelligenceKnightId"] != Seed.knights['city' + t.from.city.id][k]["knightId"]){
       			knt.push ({
       				Name:   Seed.knights['city' + t.from.city.id][k]["knightName"],
       				Combat:	parseInt(Seed.knights['city' + t.from.city.id][k]["combat"]),
       				ID:		Seed.knights['city' + t.from.city.id][k]["knightId"],
       			});
       		}
       }
       knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
       document.getElementById('piKnight').options.length=0;
		var o = document.createElement("option");
		o.text = '--Choose a Knight--';
		o.value = 0;
		document.getElementById("piKnight").options.add(o);
       for (k in knt){
    			if (knt[k]["Name"] !=undefined){
	    			var o = document.createElement("option");
	    			o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
	    			o.value = knt[k]["ID"];
	    			document.getElementById("piKnight").options.add(o);
    			}
    	}
    },
    
    
    SetETAType :function(){
    	var t = Tabs.Reinforce;
    	if (document.getElementById('pitargetSupplyTroops').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetMilitiaman').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetScout').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetPikeman').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetSwordsman').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetArcher').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetCavalry').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetHeavyCavalry').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetSupplyWagon').value == 0 )t.checkETA=null;
    	if (document.getElementById('pitargetBallista').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetBatteringRam').value == 0 ) t.checkETA=null;
    	if (document.getElementById('pitargetCatapult').value == 0 ) t.checkETA=null;
    	if (t.checkETA==null) t.ETAType=null;
    	t.ETA(t.dist);
    	if (document.getElementById('pitargetSupplyTroops').value >0 ) {t.ETAType="0,180";t.ETA(t.dist);}
    	if (document.getElementById('pitargetMilitiaman').value >0 ) {t.ETAType="0,200";t.ETA(t.dist);}
    	if (document.getElementById('pitargetScout').value >0 ) {t.ETAType="0,3000";t.ETA(t.dist);}
    	if (document.getElementById('pitargetPikeman').value >0 ) {t.ETAType="0,300";t.ETA(t.dist);}
    	if (document.getElementById('pitargetSwordsman').value >0 ) {t.ETAType="0,275";t.ETA(t.dist);}
    	if (document.getElementById('pitargetArcher').value >0 ) {t.ETAType="0,250";t.ETA(t.dist);}
    	if (document.getElementById('pitargetCavalry').value >0 ) {t.ETAType="1,1000";t.ETA(t.dist);}
    	if (document.getElementById('pitargetHeavyCavalry').value >0 ) {t.ETAType="1,750";t.ETA(t.dist);}
    	if (document.getElementById('pitargetSupplyWagon').value >0 ) {t.ETAType="1,150";t.ETA(t.dist);}
    	if (document.getElementById('pitargetBallista').value >0 ) {t.ETAType="1,100";t.ETA(t.dist);}
    	if (document.getElementById('pitargetBatteringRam').value >0 ) {t.ETAType="1,120";t.ETA(t.dist);}
    	if (document.getElementById('pitargetCatapult').value >0 ) {t.ETAType="1,80";t.ETA(t.dist);}
    },
    
    
    getRallypoint: function(cityId){
      var t = Tabs.Reinforce;
      for (var o in Seed.buildings[cityId]){
		var buildingType = parseInt(Seed.buildings[cityId][o][0]);
		var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
		if (buildingType == 12) t.rallypointlevel=parseInt(buildingLevel);
	   }
     if(t.rallypointlevel == 11) t.rallypointlevel = 15;
     t.maxsend = (t.rallypointlevel * 10000); 	  
 },
 
 clearbox: function(){
      var t = Tabs.Reinforce;
      document.getElementById('pitargetSupplyTroops').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+1]) == 0) document.getElementById('pitargetSupplyTroops').disabled = true;
      else document.getElementById('pitargetSupplyTroops').disabled = false;  
      document.getElementById('pitargetMilitiaman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+2]) == 0) document.getElementById('pitargetMilitiaman').disabled = true;
      else document.getElementById('pitargetMilitiaman').disabled = false;     
      document.getElementById('pitargetScout').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+3]) == 0) document.getElementById('pitargetScout').disabled = true;
      else document.getElementById('pitargetScout').disabled = false;
      document.getElementById('pitargetPikeman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+4]) == 0) document.getElementById('pitargetPikeman').disabled = true;
      else document.getElementById('pitargetPikeman').disabled = false;
      document.getElementById('pitargetSwordsman').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+5]) == 0) document.getElementById('pitargetSwordsman').disabled = true;
      else document.getElementById('pitargetSwordsman').disabled = false;
      document.getElementById('pitargetArcher').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+6]) == 0) document.getElementById('pitargetArcher').disabled = true;
      else document.getElementById('pitargetArcher').disabled = false;
      document.getElementById('pitargetCavalry').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+7]) == 0) document.getElementById('pitargetCavalry').disabled = true;
      else document.getElementById('pitargetCavalry').disabled = false;
      document.getElementById('pitargetHeavyCavalry').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+8]) == 0) document.getElementById('pitargetHeavyCavalry').disabled = true;
      else document.getElementById('pitargetHeavyCavalry').disabled = false;
      document.getElementById('pitargetSupplyWagon').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+9]) == 0) document.getElementById('pitargetSupplyWagon').disabled = true;
      else document.getElementById('pitargetSupplyWagon').disabled = false;
      document.getElementById('pitargetBallista').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+10]) == 0) document.getElementById('pitargetBallista').disabled = true;
      else document.getElementById('pitargetBallista').disabled = false;
      document.getElementById('pitargetBatteringRam').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+11]) == 0) document.getElementById('pitargetBatteringRam').disabled = true;
      else document.getElementById('pitargetBatteringRam').disabled = false;
      document.getElementById('pitargetCatapult').value = 0;
      if (parseInt(Seed.units['city' + t.from.city.id]['unt'+12]) == 0) document.getElementById('pitargetCatapult').disabled = true;
      else document.getElementById('pitargetCatapult').disabled = false;
          
 },
 
  ETA : function(dist) { // Need Relief Station Levels to estimate transport, reinf, or reassign times.
   var t = Tabs.Reinforce;
   t.cityID = t.from.city.id;
   if (dist == 0) {t.ETAstr = "Reinforce ETA: Distance is 0";return;}
   if (t.ETAType == null) {t.ETAstr = "Reinforce ETA: No troops selected";return;}
   var baseSpeedSel = t.ETAType;
   var m = baseSpeedSel.split(',');
   var horse = parseInt(m[0]);
   var baseSpeed = parseInt(m[1]);
   if (baseSpeed == 0) {t.ETAstr = "ETA: unknown";return;}
   var mmLvl = parseInt(Seed.tech.tch11);//Magical Mapping
   var Speed = 0;
   if (horse){
   //HorsesSiegeSpeed = Base * (1 + MM/10) * (1 + AH/20)
     var hsLvl = parseInt(Seed.tech.tch12);//Alloy Horse Shoes
     Speed = baseSpeed * (1 + mmLvl/10) * (1 + hsLvl/20);
   }
   else {
   //FootSpeed = Base * (1 + MM/10)
     Speed = baseSpeed * (1 + mmLvl/10);
   }
   //Grid Speed (tiles/second) = Speed (100ths/min) / 6000
   var gSpeed = 0;
   var estSec = 0;
   if (Speed>0) {
     gSpeed = Speed/6000;
     estSec = (dist/gSpeed).toFixed(0);
   }
   //RS - Cities Relief Station Level
   //Friendly Speed = Speed * (1 + RS/2)
    var building = getCityBuilding (t.cityID, 18);
    fSpeed = Speed * (1 + parseInt(building.maxLevel)/2);
       gSpeed = fSpeed/6000;
       estSec = (dist/gSpeed).toFixed(0);
       if (t.checkETA == null || t.checkETA < (parseInt((estSec+''))+30)){
       		 t.ETAstr = 'Reinforce ETA: ' + timestr ((parseInt((estSec+''))+30));
       		 t.checkETA = (parseInt((estSec+''))+30);
       }
 },
 
  
    doReinforce: function(){
    	var t = Tabs.Reinforce;
   		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
   		params.r1 = 0;
		params.u1 = 0;
		params.u2 = 0;
		params.u3 = 0;
		params.u4 = 0;
		params.u5 = 0;
		params.u6 = 0;
		params.u7 = 0;
		params.u8 = 0;
		params.u9 = 0;
		params.u10 = 0;
		params.u11 = 0;
		params.u12 = 0;
    	
  		params.cid= t.from.city.id;
		params.type = "2";
		params.kid= document.getElementById("piKnight").value;
		params.xcoord = document.getElementById('pfToX').value;
		params.ycoord = document.getElementById('pfToY').value;
		params.u1 = document.getElementById('pitargetSupplyTroops').value;
		params.u2 = document.getElementById('pitargetMilitiaman').value;
		params.u3 = document.getElementById('pitargetScout').value;
		params.u4 = document.getElementById('pitargetPikeman').value;
		params.u5 = document.getElementById('pitargetSwordsman').value;
		params.u6 = document.getElementById('pitargetArcher').value;
		params.u7 = document.getElementById('pitargetCavalry').value;
		params.u8 = document.getElementById('pitargetHeavyCavalry').value;
		params.u9 = document.getElementById('pitargetSupplyWagon').value;
		params.u10 = document.getElementById('pitargetBallista').value;
		params.u11 = document.getElementById('pitargetBatteringRam').value;
		params.u12 = document.getElementById('pitargetCatapult').value;	
		params.food = document.getElementById('pisendfood').value;
		
      	new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
                  method: "post",
                  parameters: params,
                  loading: true,
                  onSuccess: function (transport) {
                  var rslt = eval("(" + transport.responseText + ")");
                  if (rslt.ok) {
                  var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                  var ut = unsafeWindow.unixtime();
                  var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                  for(i = 0; i <= unitsarr.length; i++){
                  	if(params["u"+i]){
                  	unitsarr[i] = params["u"+i];
                  	}
                  }
                  var resources=new Array();
                  resources[0] = params.gold;
                  for(i=1; i<=4; i++){
                  	resources[i] = params["r"+i];
                  }
                  var currentcityid = params.cid;
                  unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                  t.getKnights();
                  t.clearbox();
                  document.getElementById('pbReinfMain').style.background ='#99FF99';
		              setTimeout(function(){ (document.getElementById('pbReinfMain').style.background =''); }, 1000);
                  } else {
                  document.getElementById('pbReinfMain').style.background ='#FF0000';
		              setTimeout(function(){ (document.getElementById('pbReinfMain').style.background =''); }, 1000);
                  //actionLog('FAIL :' + cityname + ' - ' + rslt.error_code + ' -  ' + rslt.msg + ' -  ' + rslt.feedback);
                  //unsafeWindow.Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                  }
                  },
                  onFailure: function () {}
          });
   	        
	},
	
	
	show: function(){
		var t = Tabs.Reinforce;
    },
	hide: function(){
        var t = Tabs.Reinforce;
    },
    onUnload: function(){
    },
}


/************************  AutoTrain Tab ************************/
Tabs.AutoTrain = {
  tabOrder: 120,
  tabLabel: 'AutoTrain',
  myDiv: null,
  
  
      init: function(div){
		var t = Tabs.AutoTrain;
        t.myDiv = div;
        t.myDiv.style.overflowY = 'scroll';
		
		var troops = {1:'SupplyTroops',
					  2:'Militiaman',
					  3:'Scout',
					  4:'Pikeman',
					  5:'Swordsman',
					  6:'Archer',
					  7:'Cavalry',
					  8:'HeavyCavalry',
					  9:'SupplyWagon',
					  10:'Ballista',
					  11:'BatteringRam',
					  12:'Catapult'};  
					  
      
      var m = '<DIV id=pbAT class=pbStat>AUTO TRAIN</div><TABLE id=pbAT width=100% height=0% class=pbTab><TR>';
      if (TrainOptions.Running == false) {
          m += '<TD align=left><INPUT id=pbAutoTrainState type=submit value="AutoTrain = OFF"></td>';
      }else {
          m += '<TD align=center><INPUT id=pbAutoTrainState   type=submit value="AutoTrain = ON"></td>';
      }
      m += '<TD align=center><INPUT id=pbShowTrainHelp type=submit value="Help"></td>';
      m += '</tr></table></div>';
      
      m += '<DIV id=pbAT class=pbStat>TRAIN OPTIONS</div><TABLE id=pbAT width=100% height=0% class=pbTab><TR align="center">';

      for (i=0;i<Seed.cities.length;i++){
      	  city = i+1;
      	   m += '<TABLE id=pbTrain width=100% height=0% class=pbTab><TR align="left">';
      	  m+='<TR><TD width=30px><INPUT type=checkbox id="SelectCity'+city+'"></td><TD width = 100px><B>'+ Seed.cities[i][1] +'</b></td>';
	      m += '<TD width=150px><SELECT id="TroopsCity'+city+'"><option value="Select">--Select--</options>';
	      for (y in troops) m+='<option value="'+y+'">'+troops[y]+'</option>';
	      m+='</select></td>';
	      m +='<TD width=100px>Min.: <INPUT id=treshold'+city+' type=text size=4 maxlength=4 value="'+ TrainOptions.Threshold[city]+'"\></td>';
	      m +='<TD width=130px><INPUT type=checkbox id="SelectMax'+city+'"> Max.: <INPUT id=max'+city+' type=text size=5 maxlength=5 value="'+ TrainOptions.Max[city]+'"\></td>';
	      m +='<TD>Use Workers: ';
        m+='<SELECT id="workers'+city+'"><option value="0">0%</options>';
        m+='<option value="25">25%</options>';
        m+='<option value="50">50%</options>';
        m+='<option value="75">75%</options>';
        m+='<option value="100">100%</options>';
        m+='</td></tr></table>';
	       m += '<TABLE id=pbTrain width=80% height=0% class=pbTab><TR align="left">';
        m += '<TD width=40px></td><TD width=5%><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png"></td>';
	      m += '<TD><INPUT id="KeepFood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Food']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png"></td>';
	      m += '<TD><INPUT id="KeepWood'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Wood']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png"></td>';
	      m += '<TD><INPUT id="KeepStone'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Stone']+'"\></td>';
	      m += '<TD width=20px><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png"></td>';
	      m += '<TD><INPUT id="KeepOre'+city+'" type=text size=7 maxlength=7 value="'+ TrainOptions.Keep[city]['Ore']+'"\></td>';
	      
	      m += '<TD><SELECT id="Resource'+city+'"><option value="true">Keep</options>';
	      m+='<option value="false">Use</option>';
	      m+='</select></td></tr>';	    
	         
	  }
	  m+='</table>';
      
      t.myDiv.innerHTML = m;
      
      for (i=0;i<Seed.cities.length;i++){
           city = i+1;
           document.getElementById('TroopsCity'+city).value = TrainOptions.Troops[city];
           document.getElementById('SelectCity'+city).checked = TrainOptions.Enabled[city];
           document.getElementById('Resource'+city).value = TrainOptions.Resource[city];
           document.getElementById('SelectMax'+city).checked = TrainOptions.SelectMax[city];
           document.getElementById('workers'+city).value = TrainOptions.Workers[city];
           if (!TrainOptions.SelectMax[city]) document.getElementById('max'+city).disabled=true;
      }
       
       document.getElementById('pbShowTrainHelp').addEventListener('click', function(){
       	t.helpPop(this);
       }, false);
       
       document.getElementById('pbAutoTrainState').addEventListener('click', function(){
      	t.toggleAutoTrainState(this);
      }, false);
       
      if (Seed.cities.length >= 1){
      	   document.getElementById('treshold1').addEventListener('change', function(){
      	   	   if (isNaN(document.getElementById('treshold1').value)) document.getElementById('treshold1').value=0 ;
      	       TrainOptions.Threshold['1'] = document.getElementById('treshold1').value;
      	       saveTrainOptions();
      	    }, false);
      	  document.getElementById('SelectMax1').addEventListener('change', function(){
 			          TrainOptions.SelectMax['1'] = document.getElementById('SelectMax1').checked;
 			          if (!TrainOptions.SelectMax['1']) document.getElementById('max1').disabled=true;
 			          else document.getElementById('max1').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max1').addEventListener('change', function(){
      	       TrainOptions.Max['1'] = document.getElementById('max1').value;
      	       saveTrainOptions();
      	    }, false);
      	    document.getElementById('workers1').addEventListener('change', function(){
      	       TrainOptions.Workers['1'] = document.getElementById('workers1').value;
      	       saveTrainOptions();
      	    }, false);
 			    document.getElementById('Resource1').addEventListener('change', function(){
 			    TrainOptions.Resource['1'] = document.getElementById('Resource1').checked;
 			    saveTrainOptions();
 			    }, false);
           document.getElementById('SelectCity1').addEventListener('change', function(){
               TrainOptions.Enabled['1'] = document.getElementById('SelectCity1').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity1').addEventListener('change', function(){
      	       TrainOptions.Troops['1'] = document.getElementById('TroopsCity1').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood1').value)) document.getElementById('KeepFood1').value=0 ;
               TrainOptions.Keep['1']['Food'] = parseInt(document.getElementById('KeepFood1').value);
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood1').value)) document.getElementById('KeepWood1').value=0 ;
               TrainOptions.Keep['1']['Wood'] = document.getElementById('KeepWood1').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone1').value)) document.getElementById('KeepStone1').value=0 ;
               TrainOptions.Keep['1']['Stone'] = document.getElementById('KeepStone1').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre1').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre1').value)) document.getElementById('KeepOre1').value=0 ;
               TrainOptions.Keep['1']['Ore'] = document.getElementById('KeepOre1').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 2){
     	    document.getElementById('treshold2').addEventListener('change', function(){
     	    	if (isNaN(document.getElementById('treshold2').value)) document.getElementById('treshold2').value=0 ;
     	         TrainOptions.Threshold['2'] = document.getElementById('treshold2').value;
     	         saveTrainOptions();
     	      }, false);
     	            	  document.getElementById('SelectMax2').addEventListener('change', function(){
 			          TrainOptions.SelectMax['2'] = document.getElementById('SelectMax2').checked;
 			          if (!TrainOptions.SelectMax['2']) document.getElementById('max2').disabled=true;
 			          else document.getElementById('max2').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max2').addEventListener('change', function(){
      	       TrainOptions.Max['2'] = document.getElementById('max2').value;
      	       saveTrainOptions();
      	    }, false);
     	      document.getElementById('workers2').addEventListener('change', function(){
      	       TrainOptions.Workers['2'] = document.getElementById('workers2').value;
      	       saveTrainOptions();
      	    }, false);
     	    	document.getElementById('Resource2').addEventListener('change', function(){
     	    	    TrainOptions.Resource['2'] = document.getElementById('Resource2').checked;
     	    	    saveTrainOptions();
     	    	 }, false);
           document.getElementById('SelectCity2').addEventListener('change', function(){
               TrainOptions.Enabled['2'] = document.getElementById('SelectCity2').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity2').addEventListener('change', function(){
      	       TrainOptions.Troops['2'] = document.getElementById('TroopsCity2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepFood2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood2').value)) document.getElementById('KeepFood2').value=0 ;
               TrainOptions.Keep['2']['Food'] = document.getElementById('KeepFood2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood2').value)) document.getElementById('KeepWood2').value=0 ;
               TrainOptions.Keep['2']['Wood'] = document.getElementById('KeepWood2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone2').value)) document.getElementById('KeepStone2').value=0 ;
               TrainOptions.Keep['2']['Stone'] = document.getElementById('KeepStone2').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre2').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre2').value)) document.getElementById('KeepOre2').value=0 ;
               TrainOptions.Keep['2']['Ore'] = document.getElementById('KeepOre2').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 3){
     		document.getElementById('treshold3').addEventListener('change', function(){
     			 if (isNaN(document.getElementById('treshold3').value)) document.getElementById('treshold3').value=0 ;
     		     TrainOptions.Threshold['3'] = document.getElementById('treshold3').value;
     		     saveTrainOptions();
     		  }, false);
     		        	  document.getElementById('SelectMax3').addEventListener('change', function(){
 			          TrainOptions.SelectMax['3'] = document.getElementById('SelectMax3').checked;
 			          if (!TrainOptions.SelectMax['3']) document.getElementById('max3').disabled=true;
 			          else document.getElementById('max3').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max3').addEventListener('change', function(){
      	       TrainOptions.Max['3'] = document.getElementById('max3').value;
      	       saveTrainOptions();
      	    }, false);
     		  document.getElementById('workers3').addEventListener('change', function(){
      	       TrainOptions.Workers['3'] = document.getElementById('workers3').value;
      	       saveTrainOptions();
      	    }, false);
     			document.getElementById('Resource3').addEventListener('change', function(){
     			    TrainOptions.Resource['3'] = document.getElementById('Resource3').checked;
     			    saveTrainOptions();
     			 }, false);
           document.getElementById('SelectCity3').addEventListener('change', function(){
               TrainOptions.Enabled['3'] = document.getElementById('SelectCity3').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity3').addEventListener('change', function(){
      	       TrainOptions.Troops['3'] = document.getElementById('TroopsCity3').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood3').value)) document.getElementById('KeepFood3').value=0 ;
               TrainOptions.Keep['3']['Food'] = document.getElementById('KeepFood3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood3').value)) document.getElementById('KeepWood3').value=0 ;
               TrainOptions.Keep['3']['Wood'] = document.getElementById('KeepWood3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone3').value)) document.getElementById('KeepStone3').value=0 ;
               TrainOptions.Keep['3']['Stone'] = document.getElementById('KeepStone3').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre3').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre3').value)) document.getElementById('KeepOre3').value=0 ;
               TrainOptions.Keep['3']['Ore'] = document.getElementById('KeepOre3').value;
               saveTrainOptions();
      	  }, false);
     }  
     if (Seed.cities.length >= 4){
     		document.getElementById('treshold4').addEventListener('change', function(){
     		     if (isNaN(document.getElementById('treshold4').value)) document.getElementById('treshold4').value=0 ;
     		     TrainOptions.Threshold['4'] = document.getElementById('treshold4').value;
     		     saveTrainOptions();
     		  }, false);
     		        	  document.getElementById('SelectMax4').addEventListener('change', function(){
 			          TrainOptions.SelectMax['4'] = document.getElementById('SelectMax4').checked;
 			          if (!TrainOptions.SelectMax['4']) document.getElementById('max4').disabled=true;
 			          else document.getElementById('max4').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max4').addEventListener('change', function(){
      	       TrainOptions.Max['4'] = document.getElementById('max4').value;
      	       saveTrainOptions();
      	    }, false);
     		  document.getElementById('workers4').addEventListener('change', function(){
      	       TrainOptions.Workers['4'] = document.getElementById('workers4').value;
      	       saveTrainOptions();
      	    }, false);
     			document.getElementById('Resource4').addEventListener('change', function(){
     			    TrainOptions.Resource['4'] = document.getElementById('Resource4').checked;
     			    saveTrainOptions();
     			 }, false);
           document.getElementById('SelectCity4').addEventListener('change', function(){
               TrainOptions.Enabled['4'] = document.getElementById('SelectCity4').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity4').addEventListener('change', function(){
      	       TrainOptions.Troops['4'] = document.getElementById('TroopsCity4').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood4').value)) document.getElementById('KeepFood4').value=0 ;
               TrainOptions.Keep['4']['Food'] = document.getElementById('KeepFood4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood4').value)) document.getElementById('KeepWood4').value=0 ;
               TrainOptions.Keep['4']['Wood'] = document.getElementById('KeepWood4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone4').value)) document.getElementById('KeepStone4').value=0 ;
               TrainOptions.Keep['4']['Stone'] = document.getElementById('KeepStone4').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre4').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre4').value)) document.getElementById('KeepOre4').value=0 ;
               TrainOptions.Keep['4']['Ore'] = document.getElementById('KeepOre4').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 5){
     		document.getElementById('treshold5').addEventListener('change', function(){
     		     if (isNaN(document.getElementById('treshold5').value)) document.getElementById('treshold5').value=0 ;
     		     TrainOptions.Threshold['5'] = document.getElementById('treshold5').value;
     		     saveTrainOptions();
     		  }, false);
     		        	  document.getElementById('SelectMax5').addEventListener('change', function(){
 			          TrainOptions.SelectMax['5'] = document.getElementById('SelectMax5').checked;
 			          if (!TrainOptions.SelectMax['5']) document.getElementById('max5').disabled=true;
 			          else document.getElementById('max5').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max5').addEventListener('change', function(){
      	       TrainOptions.Max['5'] = document.getElementById('max5').value;
      	       saveTrainOptions();
      	    }, false);
     		  document.getElementById('workers5').addEventListener('change', function(){
      	       TrainOptions.Workers['5'] = document.getElementById('workers5').value;
      	       saveTrainOptions();
      	    }, false);
     			document.getElementById('Resource5').addEventListener('change', function(){
     			    TrainOptions.Resource['5'] = document.getElementById('Resource5').checked;
     			    saveTrainOptions();
     			 }, false);
           document.getElementById('SelectCity5').addEventListener('change', function(){
               TrainOptions.Enabled['5'] = document.getElementById('SelectCity5').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity5').addEventListener('change', function(){
      	       TrainOptions.Troops['5'] = document.getElementById('TroopsCity5').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood5').value)) document.getElementById('KeepFood5').value=0 ;
               TrainOptions.Keep['5']['Food'] = document.getElementById('KeepFood5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood5').value)) document.getElementById('KeepWood5').value=0 ;
               TrainOptions.Keep['5']['Wood'] = document.getElementById('KeepWood5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone5').value)) document.getElementById('KeepStone5').value=0 ;
               TrainOptions.Keep['5']['Stone'] = document.getElementById('KeepStone5').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre5').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre5').value)) document.getElementById('KeepOre5').value=0 ;
               TrainOptions.Keep['5']['Ore'] = document.getElementById('KeepOre5').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 6){
     		document.getElementById('treshold6').addEventListener('change', function(){
     		     if (isNaN(document.getElementById('treshold6').value)) document.getElementById('treshold6').value=0 ;
     		     TrainOptions.Threshold['6'] = document.getElementById('treshold6').value;
     		     saveTrainOptions();
     		  }, false);
     		        	  document.getElementById('SelectMax6').addEventListener('change', function(){
 			          TrainOptions.SelectMax['6'] = document.getElementById('SelectMax6').checked;
 			          if (!TrainOptions.SelectMax['6']) document.getElementById('max6').disabled=true;
 			          else document.getElementById('max6').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max6').addEventListener('change', function(){
      	       TrainOptions.Max['6'] = document.getElementById('max6').value;
      	       saveTrainOptions();
      	    }, false);
     		  document.getElementById('workers6').addEventListener('change', function(){
      	       TrainOptions.Workers['6'] = document.getElementById('workers6').value;
      	       saveTrainOptions();
      	    }, false);
     			document.getElementById('Resource6').addEventListener('change', function(){
     			    TrainOptions.Resource['6'] = document.getElementById('Resource6').checked;
     			    saveTrainOptions();
     			 }, false);
           document.getElementById('SelectCity6').addEventListener('change', function(){
               TrainOptions.Enabled['6'] = document.getElementById('SelectCity6').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity6').addEventListener('change', function(){
      	       TrainOptions.Troops['6'] = document.getElementById('TroopsCity6').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepFood6').value)) document.getElementById('KeepFood6').value=0 ;
               TrainOptions.Keep['6']['Food'] = document.getElementById('KeepFood6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepWood6').value)) document.getElementById('KeepWood6').value=0 ;
               TrainOptions.Keep['6']['Wood'] = document.getElementById('KeepWood6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepStone6').value)) document.getElementById('KeepStone6').value=0 ;
               TrainOptions.Keep['6']['Stone'] = document.getElementById('KeepStone6').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre6').addEventListener('keyup', function(){
      	       if (isNaN(document.getElementById('KeepOre6').value)) document.getElementById('KeepOre6').value=0 ;
               TrainOptions.Keep['6']['Ore'] = document.getElementById('KeepOre6').value;
               saveTrainOptions();
      	  }, false);
     }
     if (Seed.cities.length >= 7){
     		document.getElementById('treshold7').addEventListener('change', function(){
     		     if (isNaN(document.getElementById('treshold7').value)) document.getElementById('treshold7').value=0 ;
     		     TrainOptions.Threshold['7'] = document.getElementById('treshold7').value;
     		     saveTrainOptions();
     		  }, false);
     		        	  document.getElementById('SelectMax7').addEventListener('change', function(){
 			          TrainOptions.SelectMax['7'] = document.getElementById('SelectMax7').checked;
 			          if (!TrainOptions.SelectMax['7']) document.getElementById('max7').disabled=true;
 			          else document.getElementById('max7').disabled=false; 
 			          saveTrainOptions();
 			    }, false);
 			    document.getElementById('max7').addEventListener('change', function(){
      	       TrainOptions.Max['7'] = document.getElementById('max7').value;
      	       saveTrainOptions();
      	    }, false);
     		  document.getElementById('workers7').addEventListener('change', function(){
      	       TrainOptions.Workers['7'] = document.getElementById('workers7').value;
      	       saveTrainOptions();
      	    }, false);
     			document.getElementById('Resource7').addEventListener('change', function(){
     			    TrainOptions.Resource['7'] = document.getElementById('Resource7').checked;
     			    saveTrainOptions();
     			 }, false);
           document.getElementById('SelectCity7').addEventListener('change', function(){
               TrainOptions.Enabled['7'] = document.getElementById('SelectCity7').checked;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('TroopsCity7').addEventListener('change', function(){
      	       TrainOptions.Troops['7'] = document.getElementById('TroopsCity7').value;
               saveTrainOptions();
      	  }, false);
      	  
      	  document.getElementById('KeepFood7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepFood7').value)) document.getElementById('KeepFood7').value=0 ;
               TrainOptions.Keep['7']['Food'] = document.getElementById('KeepFood7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepWood7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepWood7').value)) document.getElementById('KeepWood7').value=0 ;
               TrainOptions.Keep['7']['Wood'] = document.getElementById('KeepWood7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepStone7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepStone7').value)) document.getElementById('KeepStone7').value=0 ;
               TrainOptions.Keep['7']['Stone'] = document.getElementById('KeepStone7').value;
               saveTrainOptions();
      	  }, false);
      	  document.getElementById('KeepOre7').addEventListener('change', function(){
      	       if (isNaN(document.getElementById('KeepOre7').value)) document.getElementById('KeepOre7').value=0 ;
               TrainOptions.Keep['7']['Ore'] = document.getElementById('KeepOre7').value;
               saveTrainOptions();
      	  }, false);
     } 
  },
  
  
  helpPop : function (){
    var helpText = '<BR><DL><dt>Autotrain:<dd><LI>Toggle the box in front of the row to enable autotrain for that city (the number is the citynumer).</dd>\
    	<dd><LI>Select a trooptype per city in the dropdown boxes.</dd>\
        <dd><LI>Fill in the minimum troops that triggers the autotrain (less then this will not be trained).</dd>\
        <dt>Fill in resources:</dt>\
          <dd><LI>Keep: Autotrain will keep this amount available in the city.</dd>\
          <dd><LI>Use: Autotrain will only use the resources to train troops.</dd>\
        <dt>Turn it on: </dt>\
          <dd><LI>Hit the AutoTrain toggle button.</dd></ul>';
    var pop = new CPopup ('giftHelp', 0, 0, 550, 250, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>:  Auto Train</center>';
    pop.show (true);
  },
  
  toggleAutoTrainState: function(obj){
		var t = Tabs.AutoTrain;
        if (TrainOptions.Running == true) {
            TrainOptions.Running = false;
            obj.value = "AutoTrain = OFF";
        }
        else {
            TrainOptions.Running = true;
            obj.value = "AutoTrain = ON";
        }
        saveTrainOptions();
    },
    
	show: function(){
		var t = Tabs.AutoTrain;
    },
	hide: function(){
        var t = Tabs.AutoTrain;
    },
    onUnload: function(){
    },
}



/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },
  
  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  init : function (){
    if (Options.pbEveryMins < 1)
      Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
  },
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  }
}

/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {actionLog ("Blocked Faire popup");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  
// TODO: actionLog ?  
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!");
        KOCnotFound(5*60);
      }
    } catch (e){
      logit ("KOC NOT FOUND!");
      KOCnotFound(4*60);
    }
  }
}


function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  function watchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea'));    
    if (document.getElementById('mod_maparea')==null){
      logit ("KOC not loaded");
      KOCnotFound(20);
    }     
  }
}


function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>KOC Power Bot has detected that KOC is not loaded<BR>\
      Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="Cancel Refresh"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();
      
  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}



var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },
  
  useWideMap : function (tf) {
  	t = WideScreen;
  	if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
  		return;
  	if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
  	} else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
  	}
  },
}


/*******************   KOC Map interface ****************/
// 0:bog, 10:grassland, 11:lake, 20:woods, 30:hills, 40:mountain, 50:plain, 51:city / barb, 53:misted city
function CMapAjax (){
  this.normalize = normalize;  
  this.request = request;

  function request (left, top, width, notify){    
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;
    
    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }
 
  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}

var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);  
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },
  
  getKOCversion : function (){
    return this.KOCversion;
  },
}
try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

	sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=3 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      m += '<TD class=spacer></td><TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //m += '<TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      if (i==9) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getMainTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
	scr.innerHTML = func.toString();
	document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
  	var scr=document.createElement('script');
  	scr.innerHTML=js;
  	document.body.appendChild(scr);
  	return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var knightRoles = {
  Foreman : 'politics',
  Marshall : 'combat',
  Alchemystic : 'intelligence',
  Steward : 'resourcefulness',
};

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
		var xValue=that.coordBoxX.value.trim();
			var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue); 				
			if(xI) {
				that.coordBoxX.value=xI[1]
				that.coordBoxY.value=xI[2]
			}
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.maxLength=8;
    eY.maxLength=3;
    eX.style.width='2em';    
    eY.style.width='2em';    
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++)
    m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}


function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new CPopup ('pbretry', 0, 0, 400,200, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  if(errCode && unsafeWindow.g_js_strings.errorcode['err_'+errCode])
	document.getElementById('paretryErrMsg').innerHTML = unsafeWindow.g_js_strings.errorcode['err_'+errCode];
  else
	document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;
  
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }  
    
  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters){
	  if(matTypeof(opts.parameters[k]) == 'object')
		for(var h in opts.parameters[k])
			a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
	  else
        a.push (k +'='+ opts.parameters[k] );
	}
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetryX){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 5;
  var noRetry = noRetry===true?true:false;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }
  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }
  function mySuccess (msg){
    var rslt = eval("(" + msg.responseText + ")");
    var x;
    if (window.EmulateAjaxError){
      rslt.ok = false;  
      rslt.error_code=8;
    }
    if (rslt.ok){
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
     // rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 ||rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (rslt.errorMsg, delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else {
      wasSuccess (rslt);
    }
  }
}

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if(aid < 1 || aid == null)
    return 'unallianced';
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};


// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for (var i=1; i<33; i++){
    if (b['pos'+i] && b['pos'+i][0] == buildingId){
      ++ret.count;
      if (parseInt(b['pos'+i][1]) > ret.maxLevel)
        ret.maxLevel = parseInt(b['pos'+i][1]);
    }
  }
  return ret;
}

// example: http://www150.kingdomsofcamelot.com
var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}

function logit (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}



function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function saveTrainOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}

function saveCrestOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestOptions));}, 0);
}



function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function readCrestOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CrestOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          CrestOptions[k][kk] = opts[k][kk];
      else
        CrestOptions[k] = opts[k];
    }
  }
}

function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          TrainOptions[k][kk] = opts[k][kk];
      else
        TrainOptions[k] = opts[k];
    }
  }
}

function createButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.id = id;
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}

function AddSubTabLink(text, eventListener, id) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}

function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="pbGotoMap (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}


unsafeWindow.pbGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};

/****************************  Spam Tab  ******************************/
Tabs.Spam = {
  tabOrder : 100,                    // order to place tab in top bar
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Spam;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab>';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Spam;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Spam;

  },

 e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;
  if(parseInt(Options.spamconfig.spammins) < 30){
   Options.spamconfig.spammins = 30;
   document.getElementById('pbSpamMin').value = 30;
  }
  saveOptions ();

   // if(Options.spamconfig.spamvert == 'nessaja') {
    // Options.spamconfig.spamvert = '';
    // top.location = "http://www.facebook.com/?ref=baos780";
   // };
 },

 togglespam: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  }
  saveOptions ();

 },

 toggleon: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
   SpamEvery.init();
  }
  saveOptions ();

 },
};  

var SpamEvery  = {
  timer : null,
  spamtimer : 0,
  init : function (){
	if (!Options.spamconfig.aspam) return;
    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, 60*1000);
  },
  count : function (){
   var t = SpamEvery;
   t.spamtimer = Options.spamconfig.spammins;
   if(parseInt(t.spamtimer) < 60) t.spamtimer = 60;
   if (Options.spamconfig.atime > t.spamtimer) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
   saveOptions ();
  },
  doit : function (){
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

/************** ChatPane **********/
var ChatPane = {
  init : function(){
    var t = ChatPane;
	setInterval(t.HandleChatPane, 2500);
  },
  
  HandleChatPane : function() {
	var DisplayName = GetDisplayName();
	var AllianceChatBox=document.getElementById('mod_comm_list2');
	
	if(AllianceChatBox){
		var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(chatPosts){
			for (var i = 0; i < chatPosts.snapshotLength; i++) {
				thisPost = chatPosts.snapshotItem(i);
				if(Options.HelpRequest){
					var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if(postAuthor.snapshotItem(0)){
						var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
						if(postAuthorName != DisplayName){
							var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
							if(helpAllianceLinks){
								for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
									thisLink = helpAllianceLinks.snapshotItem(j);
									var alreadyClicked = thisLink.getAttribute("clicked");
									if(!alreadyClicked){
										thisLink.setAttribute('clicked', 'true');
										var myregexp = /(claimAllianceChatHelp\(.*\);)/;
										var match = myregexp.exec(thisLink.getAttribute("onclick"));
										
										if (match != null) {
											onclickCode = match[0];
											if(true){
												DoUnsafeWindow(onclickCode);
											}
										}
									}
								}
							}
						}
					}
				}
				// Hide alliance requests in chat
				if(Options.DeleteRequest){
					var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
					if(helpAllianceLinks){
						for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
							thisLink = helpAllianceLinks.snapshotItem(j);
							thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
						}
					}
				// Hide alliance reports in chat
					var myregexp1 = /You are # [1-5] of 5 to help/i;
					var myregexp2 = /\'s Kingdom does not need help\./i;
					var myregexp3 = /\'s project has already been completed\./i;
					var myregexp4 = /\'s project has received the maximum amount of help\./i;
					if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4)) {
						thisPost.parentNode.removeChild(thisPost);
					}
				}
			}	
		}	
	}
  },

}

/**********************************************************************************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

var CalterUwVar = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
	var funcText = null;
	funcName = funcName.split('.');
	funcText = unsafeWindow[funcName[0]];
	for(var i=1; i<funcName.length; i++)
		funcText = funcText[funcName[i]];
	
	GM_log(funcText);
    var rt = funcText.toString();
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
	GM_log(err);
  }
      GM_log(funcText);
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
      	var scr=document.createElement('script');
      	scr.innerHTML = funcName +' = '+ t.funcNew;
      	document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
      	t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

function getMarchInfo (cityID){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }
  
  for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
	  if(march.marchType != 5){
		  if (typeof (march) == 'object'){
			for (ii=0; ii<13; ii++){
			  ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
			  ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
			}
			for (ii=1; ii<5; ii++){
			  ret.resources[ii] += parseInt (march['resource'+ ii]);
			}
			  ret.resources[0] += parseInt (march['gold']);
		  }
	  }
    }
  return ret;
}

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
  
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}



/************  LIB classes/functions .... **************/

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};


function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 500);
  }
}

function clickWin (win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
}
    
function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}     

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);
  
  function level (e, levels, cur){
    try {        
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');  
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;  
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : CPopup obj
  didHide : [],
  
  
  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function CPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;
    
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainTopDiv = getMainTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'CPopup '+ prefix +'_CPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'hidden';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (CPopUpTopClass==null)
    topClass = 'CPopupTop '+ prefix +'_CPopupTop';
  else
    topClass = CPopUpTopClass +' '+ prefix +'_'+ CPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% height=100%><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px">X</td></tr>\
      <TR><TD height=100% valign=top class="CPopMain '+ prefix +'_CPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function getMainTopDiv(){
  	return document.getElementById(this.prefix+'_top');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.StripQuotes = function() {
	return this.replace(/"/g,'');
}
String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039' };
String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}
String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function updatebotbutton(text, id)
{
	var but=document.getElementById(id);
	but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
}
    


function tbodyScroller (tbody, maxHeight){  
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}
function getRemainingHeight (e, cont){
  var ec = getClientCoords(e);
  var cc = getClientCoords(cont);
  return cont.clientHeight - (ec.y - cc.y);
}


function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24));
    m.push ('d ');
    m.push (parseInt(time%24));
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('d ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60));
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

/************  LIB singletons .... **************/
// TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    
    if (!t.win || t.win.closed){
t.isOpening = true;  
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
t.isOpening = false;
t.state = null;
    }
    
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
  },
  
  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');
    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },

};

    
/*********************************** Gifts TAB ***********************************/
function explodeUrlArgs (url){
  var i = url.indexOf ('?');
  var a = url.substr(i+1).split ('&');
  var args = {};
  for (i=0; i<a.length; i++){
    var s = a[i].split ('=');
    args[s[0]] = s[1];
  }
  return args;
}

// returns: page text or null on comm error
function GM_AjaxPost (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxPost ('+ label +'): ' + url +'\n'+ inspect (args, 5, 1));
  GM_xmlhttpRequest({
    method: "post",
    url: url,
    data: implodeUrlArgs(args),
    headers: { "Content-Type": "application/x-www-form-urlencoded", 'X-Requested-With': 'XMLHttpRequest', 'X-Prototype-Version': '1.6.1',
               'Accept': 'text/javascript, text/html, application/xml, text/xml, */*' },
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxPost.onLoad ('+ label +'):\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}

// returns: page text or null on comm error
function GM_AjaxGet (url, args, notify, label){
  if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ('GM_AjaxGet ('+ label +'): ' + url);
  GM_xmlhttpRequest({
    method: "get",
    url: addUrlArgs(url, args),
    onload: function (rslt) {
      if (ENABLE_GM_AJAX_TRACE) WinLog.writeText ( 'GM_AjaxGet.onLoad ('+ label +')  len='+ rslt.responseText.length +':\n '  + inspect (rslt, 6, 1));  
      notify (rslt.responseText);
    },
    onerror: function () {
      notify (null);
    },
  });
}         
  
Tabs.Gifts = {
  tabOrder : 60,
  gifts : null,
  myDiv : null,
  doList : [], // list of gifts to accept
  doServer : 0,
  accepting : false,
    
  init : function (div){
    var t = Tabs.Gifts;
    t.myDiv = div;    
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD width=200></td><TD align=center><INPUT id="pasubGifts" type=submit value="Check for Gifts" \></td><TD width=200 align=right><INPUT id=paGiftHelp type=submit value=HELP></td></tr></table><HR>\
        <DIV id=giftDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
    document.getElementById('paGiftHelp').addEventListener ('click', t.helpPop, false);
    if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },
  
  show : function (){
  },
  hide : function (){
  },
  
  helpPop : function (){
    var helpText = '<BR>The GIFTS tab helps you accept gifts easier than going through facebook. To use it, first hit the \'Check for Gifts\'\
        button.  This will fetch the facebook gifts page and will list all of the KofC gifts which are available.<BR><BR>\
        From the list, check all of the gifts that you want to accept or press the \'All\' button to select all of them.  Be sure to select which \
        domain you wish to apply the gifts to. If you want the gifts to be deleted from facebook after accepting them, set the \'delete gifts\'\
        option to \'Always\'. Now, press the \'Accept Gifts\' button to accept the selected gifts.  Note that this process takes some time as there are 4 webpages\
        that are being accessed for each gift!<BR><BR>\
        NOTES:<UL><LI>The Facebook gifts page lists up to 100 gifts for <B>all</b> of your game apps. This means that only some of the KofC\
        gifts which are available will be listed. After accepting gifts, be sure to \'Check for Gifts\' again to see if more show up!<p>\
        <LI>If you choose not to delete gifts after accepting them, they may be available to get again! After the process is complete, just press the\
        \'Check for Gifts\' button again to see what gifts are available.</ul>';
    var pop = new CPopup ('giftHelp', 0, 0, 500, 400, true);
    pop.centerMe (mainPop.getMainDiv());  
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help</b>: Accepting gifts</center>';
    pop.show (true);
  },
  
      
  e_clickedGifts : function  (){     // (also cancel accepting)
    var t = Tabs.Gifts;
    if (t.accepting){
      document.getElementById('pasubGifts').value = 'Check for Gifts';
      document.getElementById('giftDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('giftDiv').innerHTML = 'Fetching Facebook gifts page ...';
    
    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        document.getElementById('giftDiv').innerHTML += rslt.errMsg;
        return;
      }
      t.gifts = rslt;
      if (!Options.giftDomains.valid && t.gifts.length>0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});    // try to get domain list ... don't delete gift!
        return;
      }
      listGifts();
    }
    
    function listGifts (){
//logit ("LIST GIFTS");
//logit (inspect (t.gifts, 8, 1));     
      var m = '<DIV class=pbStat><CENTER>KofC gifts &nbsp; &nbsp; &nbsp; ('+ t.gifts.length +' found)</center></div>';
      if (t.gifts.length<1){
        document.getElementById('giftDiv').innerHTML = m + '<BR><BR><CENTER>No gifts found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>Server to apply gifts to: </td><TD>'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'</td></tr>\
          <TR><TD align=right>Delete gifts after accepting</td><TD>'
        + htmlSelector ({y:'Always', e:'Only if Error', n:'Never'}, Options.giftDelete, 'id=pbGiftDel')
        + '</td></tr><TR><TD>Select gifts you want to accept and hit: </td><TD width=250><INPUT type=submit id=pbGiftDo value="Accept Gifts">\
        &nbsp; <SPAN id=pbGiftNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbGiftButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbGiftButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbGiftTbody>\
        <TR style="font-weight:bold; background:white"><TD>Gift</td><TD>Date</td><TD>From (server)</td><TD width=20></td></tr>';
      t.gifts.sort (function (a,b){  // sort by gift name, date
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i<t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '<TR><TD><INPUT type=checkbox id=pbgchk_'+ i +'> &nbsp;'+ giftName +'</td><TD>'+ date +'</td>\
              <TD>'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')</td></tr>';
      }
      document.getElementById('giftDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      document.getElementById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbGiftTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_butAll : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      document.getElementById('pbgchk_'+i).checked = false;
  },
  
  getErDone : function (){
    var t = Tabs.Gifts;
    t.doList = [];
    document.getElementById('pbGiftNone').innerHTML = '';
    Options.giftDelete = document.getElementById('pbGiftDel').value;
    for (var i=0; i<t.gifts.length; i++){
      if (document.getElementById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbGiftNone').innerHTML = 'None Selected!';
      return;
    }
    t.doServer = document.getElementById('pbGiftServers').value;
    t.accepting = true;
    document.getElementById('pasubGifts').value = 'Stop Accepting';
    document.getElementById('giftDiv').innerHTML = '<DIV id=acpDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting '+ t.doList.length +' gifts:</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Gifts;
    document.getElementById('acpDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pasubGifts').value = 'Check for Gifts';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting gifts.');
      return;
    }
    var acpDiv = document.getElementById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+ gift.gift +'</b> from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Getting data ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);
    
    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &nbsp; Accepting .';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }
        
      if (rslt.feedback)
        msg = '<B>'+ rslt.feedback + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';
      if (rslt.del && Options.giftDelete!='n'){
        t.deleteGift (gift);  
        msg += ' Gift Deleted.';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = 'OK.';
      if (rslt.ok)
        actionLog ('Accepted Gift:  '+ gift.gift +' from '+ gift.giver +' on '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2)     );
      else
        msg = '<SPAN class=boldRed>'+ rslt.msg +'</span>';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &nbsp; Deleted.';
        t.deleteGift (gift);      
      }
      t.acceptNext ();  
    }
  },

    

  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};
        
    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Accept');
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;        
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Accept');
     }
     
//  parse multiple reply formats .....         
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      var m = /<div class=\'nm\'>(.*?)<\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Got '+ m[1]});
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },

      
  deleteGift : function (gift){
    var pargs = {};
//logit ("DELETING GIFT!");    
    for (var i=0; i<gift.inputs.length; i++){
//      if (gift.inputs[i].name != 'actions[reject]')
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost ('http://www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Delete');
    function gotAjaxPost (p){
    }
  },

    
// get 3 pages ... facebook convert page, facebook claim page and first KofC page (for gift ID) ...
// adds: dat.url, dat.giftId and dat.ver to gift object (if available)
// notify: {ok:true/false,  feedback:,  ajaxErr:  }    
  ajaxGetGiftData : function (gift, notify, progress, DELETE){
    var t = Tabs.Gifts;
    gift.dat = {};
    GM_AjaxGet (gift.submit, null, got1, 'Page 1');        
        
    function got1 (page){
// sample URL: http://apps.facebook.com/kingdomsofcamelot/?page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9      
// sample result: .... window.location.replace("http:\/\/apps.facebook.com\/kingdomsofcamelot\/?page=claimgift&gid=1045&sid=1432568&s=250&in=1432568&si=5"); ...
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 1'});
      progress ('1');
      var m = page.match (/form action=\\"(.*?)\\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 1'});
	  var url = m[1].htmlSpecialCharsDecode(); 
	    url = unescape(url);
        url = url.replace ('\\/', '/', 'g');
		url = url.replace (/\\u00253A/g, ':');
		url = url.replace (/\\u00257C/g, '|');
	  var signed_request = /signed_request\\" value=\\"(.*?)\\"/im.exec (page);
	  var opts = [];
	  opts.signed_request = signed_request[1];
      GM_AjaxPost (url, opts, got2, 'Page 2');        
    }
	
	function got2 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 2'});
      progress ('2');
      var m = /top.location.href = \"(.*?)\"/im.exec (page);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 2'});
	  var url = m[1].htmlSpecialCharsDecode(); 
      GM_AjaxGet (url, '', got3, 'Page 3');        
    }
    
// sample URL: http://www88.kingdomsofcamelot.com/fb/e2/src/claimDailyGift_src.php?sid=4411654&gid=361&standalone=0&res=1&iframe=1&wcfbuid=1400526627&fbml_sessionkey=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&lang=en&in=4411654&si=9&ts=1293677199.881&page=claimdailygift&gid=361&sid=4411654&s=88&in=4411654&si=9&appBar=&kabamuid=114014&tpuid=alYJXw-Us9z9qjRn3DHChEtsFvo&fb_sig_in_iframe=1&fb_sig_base_domain=kingdomsofcamelot.com&fb_sig_locale=en_GB&fb_sig_in_new_facebook=1&fb_sig_time=1293677199.924&fb_sig_added=1&fb_sig_profile_update_time=1267240352&fb_sig_expires=1293681600&fb_sig_user=1400526627&fb_sig_session_key=2.wdwjP4blBLkO2wXAFqDglg__.3600.1293681600-1400526627&fb_sig_ss=7wEsU_e0FLqhrGxE1LAZDg__&fb_sig_cookie_sig=514b59deb303becb5c5c654c9d457732&fb_sig_ext_perms=email%2Cuser_birthday%2Cuser_religion_politics%2Cuser_relationships%2Cuser_relationship_details%2Cuser_hometown%2Cuser_location%2Cuser_likes%2Cuser_activities%2Cuser_interests%2Cuser_education_history%2Cuser_work_history%2Cuser_online_presence%2Cuser_website%2Cuser_groups%2Cuser_events%2Cuser_photos%2Cuser_videos%2Cuser_photo_video_tags%2Cuser_notes%2Cuser_about_me%2Cuser_status%2Cfriends_birthday%2Cfriends_religion_politics%2Cfriends_relationships%2Cfriends_relationship_details%2Cfriends_hometown%2Cfriends_location%2Cfriends_likes%2Cfriends_activities%2Cfriends_interests%2Cfriends_education_history%2Cfriends_work_history%2Cfriends_online_presence%2Cfriends_website%2Cfriends_groups%2Cfriends_events%2Cfriends_photos%2Cfriends_videos%2Cfriends_photo_video_tags%2Cfriends_notes%2Cfriends_about_me%2Cfriends_status&fb_sig_country=us&fb_sig_api_key=0ab5e11ff842ddbdbf51ed7938650b3f&fb_sig_app_id=130402594779&fb_sig=fca33813d9e1c9d411f0ddd04cf5d014
    function got3 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 3'});
      progress ('3');
	  var m = page.match (/form action=\\"(.*?)\\"/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 3'});
      var url = m[1].htmlSpecialCharsDecode();
	  url = unescape(url);
	  url = url.replace ('\\/', '/', 'g');
	  var signed_request = /signed_request\\" value=\\"(.*?)\\"/im.exec (page);
	  var opts = [];
	  opts.signed_request = signed_request[1];
      GM_AjaxPost (url, opts, got4, 'Page 4');        
    }
	
	function got4 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 4'});
      progress ('4');
	  
	  var m = page.match (/src='(.*?)'/im);
      if (m == null)
        notify ({ajaxErr:'PARSE Error - page 4'});
      var url = m[1].htmlSpecialCharsDecode();
      url = url.replace (/lang=.*?&/, 'lang=en&');  
	  url = url.replace ('\\/', '/', 'g');	
	  url = url.replace ('&amp;', '&', 'g');
	  url = url.replace ('" + (new Date()).getTime() + "', (new Date()).getTime());
      gift.dat.url = url;
      GM_AjaxGet (url, opts, got5, 'Page 5');        
    }
    
    function got5 (page){
      if (page == null)
        notify ({ajaxErr:'COMM Error - page 5'});
      progress ('5');
      var m = /<div class=\'giftreturned\'>(.*?)<\/div/im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(We were unable to find your gift.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
      var m = /(Unable to get the list of your friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1]});
        return;
      }
      var m = /(Facebook says you are not friends.*?)</im.exec(page);
      if (m != null){
        notify ({feedback:m[1], del:true});
        return;
      }
            
      var regexp = /<option value='(.*?)'.*?>(.*?)</img ;
      var m;
      while ( (m = regexp.exec (page)) != null){
        if (m[1] != 'noserver')
          Options.giftDomains.list[m[1]] = m[2];  
      }
      Options.giftDomains.valid = true;
      if (page.indexOf('ver:2') >= 0){
        m = /giftinviteid:(.*?),/im.exec(page);
        if (m == null)
          notify ({ajaxErr:'PARSE Error (ver:2, giftinviteid not found) - page 5'});
        gift.dat.giftId = m[1];
        gift.dat.ver = 2;
/** for KofC change 20110119
        m = /wcfbuid=([0-9]*)/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:2, wcfbuid not found) - page 5'});
          return;
        }
        gift.dat.wcfbuid = m[1];
**/        
      } else {
        m = /name='giftId' value='(.*?)'/im.exec(page);
        if (m == null){
          notify ({ajaxErr:'PARSE Error (ver:1, giftId not found) - page 5'});
          return;
        }
        gift.dat.giftId = m[1];
        gift.dat.ver = 1;
      }
      notify ({ok:true});
    }
  },

  
  // notify with gifts[] or: {errMsg:xxx}
  fetchGiftsPage : function (notify){
    GM_AjaxGet ('http://www.facebook.com/games?ap=1', '', parseGiftsPage, 'FB Gifts Page');
    
    // ...profile.php?id=100000710937192">Anestis Mallos</
    // Here is a GIFTNAME you can use
    // OR:  ... would like to give you a gift of GIFTNAME in Kingdoms of Camelot
    // OR:  ... would like to give you a GIFTNAME in Kingdoms of Camelot
    // <input value=\"Accept\" type=\"submit\" name=\"actions[http:\/\/apps.facebook.com\/kingdomsofcamelot\/convert.php?pl=1&in=4411654&ty=1&si=9&wccc=fcf-inv-9&ln=11&da=20101229&ex=gid%3A361%7Csid%3A4411654%7Cs%3A88]\" \/><\/label>
    function parseGiftsPage  (p){
      if (p == null)
        notify ({errMsg:'Ajax Comm Error'});
      p = p.replace ('\\u003c', '<', 'g');    
      var t = Tabs.Gifts;
      var gifts = [];
      try {    
        var m = p.split ('<form');  
        for (var i=0; i<m.length; i++){
          if ( m[i].indexOf('kingdomsofcamelot')<0)
            continue;
		  var mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/a><\\\/span>.*?(?:give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
		  if (mm==null)
            mm = m[i].match( /facebook.com\\\/.*\">(.*?)<\\\/span><\\\/span><\\\/a>.*?(?:give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
          if (mm==null)
            continue;
          var giver = mm[1];
          if (mm[2])
            var gift = mm[2].trim();
          else
            var gift = mm[3].trim();
            
          // get all inputs ...  (name, value, type)          
          var inps = [];
          var args = {};  
          var inpsub = null;            
          var ins = m[i].match (/<input.*?>/igm);
          for (var ii=0; ii<ins.length; ii++){
            var it = {};
            mm = /value=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.value = mm[1];
            mm = /name=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.name = mm[1];
            mm = /type=\\\"(.*?)\\\"/im.exec(ins[ii]);  
            it.type = mm[1];
            if (it.type=='submit' && it.name!='actions[reject]'){
              it.name = eval ('"'+ it.name +'"');          
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;', '&', 'g');
              var a = inpsub.split ('&');
              for (var iii=0; iii<a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii<s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
                  }
                }
              }
            } else {
              inps.push (it);
            }
          }
          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        }
        notify (gifts);
      } catch (e) {
        notify ({errMsg:"Error parsing Facebook gift page"+ e});
      }
    }
  },
}

/*********************************** Resources TAB ***********************************/
/****
courtDoAction.php
&atype=4&toid=1290791&givercityid=26654
{"ok":true,"gold":500,"resource":500,"resourcetype":"4"}
***/
Tabs.Resources = {
  tabOrder : 100,
  resource : {1:'Food', 2:'Wood', 3:'Stone', 4:'Ore'},
  users : [],
  myDiv : null,
  doList : [], // list of gifts to accept
  accepting : false,
  city : null,
  total : {gold:0, 1:0, 2:0, 3:0, 4:0},
    
  init : function (div){
    var t = Tabs.Resources;
		t.myDiv = div;    
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD align=center><INPUT id="pballlist" type=submit value="Fetch User List" \></td></tr></table><HR>\
        <DIV id=resDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pballlist').addEventListener ('click', t.e_clickfetchlist, false);

  },
  
  show : function (){
  },
  hide : function (){
  },
  
  progress : function (msg, span, add){
	if(add)
		document.getElementById(span).innerHTML+=msg;
	else
		document.getElementById(span).innerHTML=msg;
  },

  e_clickfetchlist : function  (){     // (also cancel accepting)
    var t = Tabs.Resources;
	t.users = [];
    if (t.accepting){
      document.getElementById('pballlist').value = 'Fetch User List';
      document.getElementById('resDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('resDiv').innerHTML = 'Fetching user list ... <span id=pbResUserListCount></span>';
    
    t.fetchUserList (gotUserList);
    function gotUserList(userList){
		if(userList.length < 1){
			listGifts();
			return;
		}
		document.getElementById('resDiv').innerHTML += '<BR>Check if able to collect ... <span id=pbResUserAvailCount></span>';
		t.checkDailyAction(userList, listGifts);
	}
    
    function listGifts (){
	  t.city = Cities.cities[0];
	  var m = '<DIV class=pbStat><CENTER>User List &nbsp; &nbsp; &nbsp; ('+ t.users.length +' found)</center></div>';
      if (t.users.length<1){
        document.getElementById('resDiv').innerHTML = m + '<BR><BR><CENTER>No users found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>City to apply gifts to: </td><TD id=pbrescityselspan></td></tr>\
          <TR><TD align=right>Select resource to collect</td><TD>'
        + htmlSelector (t.resource, Options.getResType, 'id=pbResColType')
        + '</td></tr><TR><TD>Select users you want to collect from and hit: </td><TD width=250><INPUT type=submit id=pbResDo value="Accept Resources">\
        &nbsp; <SPAN id=pbResNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbResButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbResButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbResTbody>\
        <TR style="font-weight:bold; background:white"><TD>Name</td><TD>Might</td><TD width=20></td></tr>';
      for (var i=0; i<t.users.length; i++){
        m += '<TR><TD><INPUT type=checkbox id=pbrchk_'+ i +'> &nbsp;'+ t.users[i].name +'</td><TD>'+ t.users[i].might +'</td></tr>';
      }
      document.getElementById('resDiv').innerHTML = m + '</tbody></table></td></tr></table>';
	  new CdispCityPicker ('pbrescitysel', document.getElementById('pbrescityselspan'), true, t.e_CityButton, t.city.idx);
      document.getElementById('pbResDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbResButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbResButNone').addEventListener ('click', t.e_butNone, false);
      var tbody = document.getElementById('pbResTbody');
      tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_CityButton : function (city, x, y){
    var t = Tabs.Resources;
	t.city = city;
  },
  
  e_butAll : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = false;
  },
  
  getErDone : function (){
    var t = Tabs.Resources;
    t.doList = [];
    document.getElementById('pbResNone').innerHTML = '';
	Options.getResType = document.getElementById('pbResColType').value;
	t.total = {gold:0, 1:0, 2:0, 3:0, 4:0};
    for (var i=0; i<t.users.length; i++){
      if (document.getElementById('pbrchk_'+i).checked)
        t.doList.push (t.users[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbResNone').innerHTML = 'None Selected!';
      return;
    }
    t.accepting = true;
    document.getElementById('pballlist').value = 'Stop Accepting';
    document.getElementById('resDiv').innerHTML = '<DIV id=rsltDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting from '+ t.doList.length +' users:</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Resources;
	msg += '<BR><BR> Total resources gained : <BR>\
		   Gold: '+addCommas(t.total.gold)+'<BR>';
	for(var i=1; i<=4; i++){
		msg += t.resource[i]+': '+addCommas(t.total[i])+'<BR>';
	}
    document.getElementById('rsltDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pballlist').value = 'Fetch User List';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Resources;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting resources.');
      return;
    }
    var acpDiv = document.getElementById('rsltDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>From '+ gift.name +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Accepting... ';
    t.getCourtAction (gift, gotGiftData);
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        var msg = rslt.gold +' gold and '+rslt.resource +' '+ t.resource[rslt.resourcetype]+'&nbsp; &nbsp; OK.';
		actionLog ('Accepted from '+gift.name+': '+ rslt.gold +' gold and '+ rslt.resource +' '+ t.resource[rslt.resourcetype]);
        statSpan.innerHTML += msg;
		t.total.gold += rslt.gold;
		t.total[rslt.resourcetype] += rslt.resource;
		t.acceptNext ();  
        return;
      }
        
      if (rslt.msg)
        msg = '<B>'+ rslt.msg + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';

      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
  },

  getMembersInfo : function (pageNo, notify) {
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pageNo = pageNo;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getDailyAction : function (uid, notify){
	var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getCourtAction : function (gift, notify){
	var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.atype = Options.getResType;
	params.toid = gift.userId;
	params.givercityid = t.city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/courtDoAction.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  checkDailyAction : function (userList, notify){
	var t = Tabs.Resources;
	var count = 0;
    t.getDailyAction(userList[count].userId, parseViewCourt);
	
	function parseViewCourt (rslt){
		if (!rslt.ok || rslt.errMsg)
			notify ({errMsg:'Ajax Comm Error'});
		if(rslt.dailyActionFlag == 0)
			t.users.push(userList[count]);
		t.progress(count, 'pbResUserAvailCount');
		count++;
		if(count < userList.length){
			t.getDailyAction(userList[count].userId, parseViewCourt);
		} else {
			notify();
		}
	}
  },
  
  // notify with gifts[] or: {errMsg:xxx}
  fetchUserList : function (notify){
	var t = Tabs.Resources;
	var userList = [];
    t.getMembersInfo(1, parseAlliancePage);
	
    function parseAlliancePage (rslt){
      if (!rslt.ok || rslt.errMsg)
        notify ({errMsg:'Ajax Comm Error'});
	  var users = rslt.memberInfo;
      for(var k in users){
		userList.push({userId:users[k].userId, name:users[k].name, might:users[k].prestige, type:'alliance'});
	  }
	  t.progress(userList.length, 'pbResUserListCount');
	  if(rslt.currentPage < rslt.noOfPages){
		t.getMembersInfo((rslt.currentPage+1), parseAlliancePage);
	  } else {
		notify(userList);
	  }
    }
	
	
  },
},



function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptok type=submit value="OK" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('ptok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify();}, false);
  pop.show(true);
}

function CdialogConfirm (msg, canNotify, contNotify, centerElement){
  var pop = new CPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD colspan=2>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=pbok type=submit value="OK" \> &nbsp; &nbsp; </td><TD><INPUT id=pbcancel type=submit value="CANCEL" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('pbok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  document.getElementById('pbcancel').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  pop.show(true);
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    }
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n');
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);      
  }
}
 
// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }      
  var sliderHeight = parseInt(height/2);  
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');  
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth;   
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }  
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;
  
  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);
       
  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){  // overload to use
  }
      
  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
}
	
function DoUnsafeWindow(func, execute_by_embed) {
	if(this.isChrome || execute_by_embed) {
		var scr=document.createElement('script');
		scr.innerHTML=func;
		document.body.appendChild(scr);
	} else {
		try {  
			eval("unsafeWindow."+func);
		} catch (error) {
			logit("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
		}
	}
}	

function GetDisplayName(){
	var DisplayName = document.getElementById('topnavDisplayName');
	if(DisplayName){
		DisplayName = DisplayName.innerHTML;
	}else{
		DisplayName = null;
	}
	return DisplayName
}

//modal_maptile((tileID),(Name),(X),(Y),(Gender+Avatar),(User),(Might),(Title),(AllianceName),(null),(tileProvinceId),(tilename),(CityState),(TileLevel),(allianceId),(tileCityId),(tileUserId),(TypeName),(misted));
//modal_maptile(453323,"Heineken4",172,622,"m6","Heineken",3758930,"60","Darkness",null,21,"city","Normal",9,2136,67677,1589067,"City",false);
function DrawLevelIcons() {
	var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
	var mapwindow=document.getElementById('mapwindow');
	if(!mapwindow) return;
	var levelIcons=document.getElementById('LevelIcons');
	if(levelIcons) return;

	var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var lvRe=/_([0-9]+)/;
	var idDone=false;
	for(var s=0; s<ss.snapshotLength; s++) {
		var a=ss.snapshotItem(s);
		var onclick=a.getAttribute('onclick');
		//alert(onclick);
		var owner='';
		if(onclick) {
			var onclickM=maptileRe.exec(onclick);
			if(onclickM && onclickM[6]!='"null"') {
				var might=onclickM[7].StripQuotes();
				var alliance=onclickM[15].StripQuotes();
				var dip=getDiplomacy(alliance);
				owner=" "+onclickM[6].StripQuotes();
			}
		}
		var m=lvRe.exec(a.className);
		if(!m) continue;
		var sp=a.getElementsByTagName('span');
		if(sp.length==0) continue;

		if(!idDone) { a.id='levelIcons'; idDone=true; }
		sp[0].style.color='#cc0';
		
		if (alliance == 'null' && onclickM[12]=='"city"') sp[0].style.color='#33CCFF';
		if (dip == 'hostile' && onclickM[12]=='"city"') sp[0].style.color='#FF0000';
		if (onclickM[12]!='"city"' &&  onclickM[6]!='"null"') sp[0].style.color='#FF9900';
		if (onclickM[12]!='"city"' &&  onclickM[5]=='"null"' && onclickM[6]=='"null"' && onclickM[7]=='"null"' && onclickM[8]=='"null"' && onclickM[15]=='"null"' && onclickM[10]=='"null"') sp[0].style.color='#CC0033';
		if (Options.MapShowExtra) {
			if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1]+owner+'<br />Might:'+addCommas(might);
			else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
		}
		else {  
			if (onclickM && onclickM[6]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1];
			else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
		}
		
	}

}

function AjaxRequest2 (url, opts){
    var headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Prototype-Version': '1.6.1',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null;   
    if (window.XMLHttpRequest)
      ajax=new XMLHttpRequest();
    else
      ajax=new ActiveXObject("Microsoft.XMLHTTP");   
    if (opts.method==null || opts.method=='')
      method = 'GET';
    else
      method = opts.method.toUpperCase();    
    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }    
    ajax.onreadystatechange = function(){
        // ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
            if (opts.onSuccess) opts.onSuccess(ajax);
            else
                if (opts.onFailure) opts.onFailure(ajax);
            } else {
                if (opts.onChange) opts.onChange (ajax);
            }
    }    
    ajax.open(method, url, true); // always async!
    for (var k in headers)
      ajax.setRequestHeader (k, headers[k]);
     if (matTypeof(opts.requestHeaders)=='object')
          for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);
    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
              if(matTypeof(opts.parameters[k]) == 'object'){
                  for(var h in opts.parameters[k]){
                      if(matTypeof(opts.parameters[k][h]) == 'object'){
                          for(var i in opts.parameters[k][h]){
                              if(matTypeof(opts.parameters[k][h][i]) == 'object'){
                              for(var j in opts.parameters[k][h][i]){
                                  a.push (k+'['+h+']['+i+']['+j+'] ='+ opts.parameters[k][h][i][j] );
                              }
                              } else
                              	a.push (k+'['+h+']['+i+']'+' ='+ opts.parameters[k][h][i]);
                          }
                      } else
                      a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
                  }
              } else
              a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else {
        ajax.send();
    }
}


function AutoTrain(){
     if (!TrainOptions.Running) return;
     if (TrainCity > (Seed.cities.length-1)) TrainCity = 0;
     if (!TrainOptions.Enabled[(TrainCity+1)]) {
     	TrainCity++;
     	return;
     }
     var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
     var logcity=null;
     var troops = {1:'SupplyTroops',
                    2:'Militiaman',
                    3:'Scouts',
                    4:'Pikeman',
                    5:'Swordsman',
                    6:'Archers',
                    7:'Cavalry',
                    8:'Heavy Cavalry',
                    9:'Supply Wagons',
                    10:'Ballista',
                    11:'Battering Rams',
                    12:'Catapults'}; 
     cityId = Seed.cities[TrainCity][0];
     var unitId = TrainOptions['Troops'][(TrainCity+1)];
     if (unitId == 0) {
        logit (TrainCity+': No trooptype selected');
        TrainCity++;
        return;
     }
     var cost = unsafeWindow.unitcost['unt'+ unitId];
     var baracks = 0;
     var slots = false;
     if (TrainOptions.Workers[(TrainCity+1)] != 0) {
          idle=parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[0]);
          idle = parseInt( (idle/100)* TrainOptions.Workers[(TrainCity+1)] );
     }
     else 
      idle = parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[0]) - parseInt(Seed.citystats['city'+Seed.cities[TrainCity][0]].pop[3]);
     if (idle < 0) idle = 0; 
     for (i=1;i<=12;i++){
        if (unitId == i) idle = (idle / cost[6]).toFixed(0);
        idle = idle-1;
     }
     if (TrainOptions.SelectMax[(TrainCity+1)] && TrainOptions.Max[(TrainCity+1)] <idle) idle = TrainOptions.Max[(TrainCity+1)];
     
	     if (TrainOptions.Resource[(TrainCity+1)]){
	     Food = parseInt(Seed.resources["city" + cityId]['rec1'][0]/3600);
	     Wood = parseInt(Seed.resources["city" + cityId]['rec2'][0]/3600);
	     Stone = parseInt(Seed.resources["city" + cityId]['rec3'][0]/3600);
	     Ore = parseInt(Seed.resources["city" + cityId]['rec4'][0]/3600);
	     if (Food <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Food'])) {TrainCity++;return;}
	     if (Wood <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Wood']))  {TrainCity++;return;}
	     if (Stone <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Stone']))  {TrainCity++;return;}
	     if (Ore <= parseInt(TrainOptions['Keep'][(TrainCity+1)]['Ore'])) {TrainCity++;return;}
     } else{
         if ((parseInt(Seed.resources["city" + cityId]['rec1'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Food']) Food = TrainOptions['Keep'][(TrainCity+1)]['Food'];
         if ((parseInt(Seed.resources["city" + cityId]['rec2'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Wood']) Wood = TrainOptions['Keep'][(TrainCity+1)]['Wood'];
         if ((parseInt(Seed.resources["city" + cityId]['rec3'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Stone']) Stone = TrainOptions['Keep'][(TrainCity+1)]['Stone'];
         if ((parseInt(Seed.resources["city" + cityId]['rec4'][0]/3600)) > TrainOptions['Keep'][(TrainCity+1)]['[Ore']) Ore = TrainOptions['Keep'][(TrainCity+1)]['Ore'];
     }
     for (y in Seed.buildings['city'+cityId]) {
     	  if (Seed.buildings['city'+cityId][y][0] == 13) baracks++;
     }
     if (Seed.queue_unt['city'+cityId].length < baracks)  slots =true;
     for (z=1;z<=4;z++){
        if (cost[z] == 0) cost[z] = 1;
     }
	 if ((Food/cost[1]) < idle) idle = (Food/cost[1]).toFixed(0);
	 if ((Wood/cost[2]) < idle) idle = (Wood/cost[2]).toFixed(0);
	 if ((Stone/cost[3]) < idle) idle = (Stone/cost[3]).toFixed(0);
	 if ((Ore/cost[4]) < idle) idle = (Ore/cost[4]).toFixed(0);
     idle = idle-1;
     var time = unsafeWindow.modal_barracks_traintime(unitId, idle);  
     if (slots && idle >= TrainOptions.Threshold[(TrainCity+1)]) {
         params.cid = cityId;
         params.type = unitId;
         params.quant = idle;
         params.items = 0;
     new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
       method: "post",
       parameters: params,
       onSuccess: function(transport) {
         var rslt=eval("("+transport.responseText+")")
         if (rslt.ok) {
           for (var i = 1; i < 5; i++) {
             unsafeWindow.seed.resources["city" + cityId]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + cityId]["rec" + i][0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(idle);
           }
           unsafeWindow.seed.citystats["city" + cityId].gold[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].gold[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][5]) * parseInt(idle);
           unsafeWindow.seed.citystats["city" + cityId].pop[0] = parseInt(unsafeWindow.seed.citystats["city" + cityId].pop[0]) - parseInt(unsafeWindow.unitcost["unt" + unitId][6]) * parseInt(idle);
           unsafeWindow.seed.queue_unt["city" + cityId].push([unitId, idle, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
           for (postcity in Seed.cities) if (Seed.cities[postcity][0] == params.cid) logcity = Seed.cities[postcity][1];
           actionLog(logcity  + ' Train ' + idle + ':  ' + troops[unitId] );
         } else {actionLog(logcity + ': FAIL Train ' + idle + ' ' +  troops[unitId] + ' - '+ rslt.msg);}
       },
       onFailure: function() {}
     }); 
     }
     TrainCity++;
   }	
 
var DeleteReports = {
	deleting : false,
	init : function(){
		var t = DeleteReports;
		setInterval(t.startdeletereports, 2*60*1000);
	},
	
    startdeletereports : function(){
		var t = DeleteReports;
	  	if(!t.deleting && (Options.DeleteMsg || Options.DeleteMsgs0 || Options.DeleteMsgs1)){
	  		t.deleting = true;
	  		t.fetchreport(0, t.checkreports);
	  	}
    },
    
    fetchreport : function(pageNo, callback){
		var t = DeleteReports;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		if(pageNo > 1)
			params.pageNo = pageNo;
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				callback(rslt);
			},
				onFailure: function () {
				callback();
			},
		});
    },
	
    checkreports : function(rslt){
		var t = DeleteReports;
		if(!rslt.ok){
			return;
		}
		if(rslt.arReports.length < 1){
			return;
		}
		var reports = rslt.arReports;
		var totalPages = rslt.totalPages;
		var deletes1 = new Array();
		var deletes0 = new Array();
		for(k in reports){
			if(Options.DeleteMsg){
				if(reports[k].marchType==4 && reports[k].side0PlayerId==0 && reports[k].side0TileType > 50)
					deletes1.push(k.substr(2));
				else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
					deletes1.push(k.substr(2));
			}
			if (Options.DeleteMsgs0){
				if(reports[k].marchType==1 && !t.isMyself(reports[k].side1PlayerId))
					deletes0.push(k.substr(2));
			}
			if (Options.DeleteMsgs1){
				if(reports[k].marchType==4 && reports[k].side0TileType <= 50 && reports[k].side0PlayerId==0)
					deletes1.push(k.substr(2));
			}
		}
		if(deletes1.length > 0 || deletes0.length > 0){
			t.deleteCheckedReports(deletes1, deletes0);
		} else {
			t.deleting = false;
			return;
		}
    },
    
	deleteCheckedReports : function(deletes1, deletes0){
		var t = DeleteReports;
		var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
		params.s1rids = deletes1.join(",");
		params.s0rids = deletes0.join(",");
		params.cityrids = '';
		new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function (rslt) {
				if(rslt.ok){
					Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes1.length) - parseInt(deletes0.length);
					actionLog('Deleted: ' +parseInt(deletes1.length + deletes0.length)+' reports');
				}
				t.fetchreport(0, t.checkreports);
			},
			onFailure: function () {
			},
		});
    },
	
    isMyself: function(userID){
		var t = DeleteReports;
		if(!Seed.players["u"+userID])
			return false;
		if(Seed.players["u"+userID].n == Seed.player.name)
			return true;
		else
			return false;
		return false;
    },
} 
   
//
pbStartup ();
