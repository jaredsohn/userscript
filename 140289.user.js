// ==UserScript==
// @name           KoC Barbarian Attacker
// @version        1.0.1
// @namespace      wwworg
// @homepage       http://userscripts.org/
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/*
// @include        *facebook.com/connect/uiserver.php*
// @include        *facebook.com/*/serverfbml*
// @include        *facebook.com/dialog/feed*
// @include        *facebook.com/dialog/stream.publish*
// @include        *facebook.com/dialog/apprequests*
// @description    Automated Barb Attacker for TR items
// ==/UserScript==


var Version = '1.0.0';

// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_LANGUAGE_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var MAP_DELAY = 1200;

var DEFAULT_ALERT_SOUND_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/RedAlert.mp3';
var SWF_PLAYER_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/alarmplayer.swf';

var URL_CASTLE_BUT = "data:image/png;base64,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";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,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";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

//logit ("+++ STARTUP: "+ document.URL);


var upgradeData = {
  active : false,
  item_upgrade : {},
  item_enhance : {},
  item_repair : [],
  retryInterval : 30,
  enhanceAction : "show",
  enhanceItem : 0,
  enhanceMax  : 1,
  minStones : 100000,
  queuetype : 0,
  upgradetype : 0,
};


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
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:10000, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, alertTR:false, alertTRset:1},
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'30', atime:2 , spamstate:'a'},
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
  DeleteMsg       : false,
  DeleteMsgs0  : false,
  DeleteMsgs1  : false,
  DeleteMsgs2  : false,
  Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
  LastReport   : 0,
  LastCrestReport   : 0,
  MsgInterval  : 1,
  CrestMsgInterval  : 1,
  foodreport   : false,
  crestreport  : true,
  Crest1Count  : 0,                            
  Crest2Count  : 0,                                                                            
  crestRunning   : false,    
  Crestinterval        : 5,        
  ThroneDeleteItems    :    false,
  ThroneDeleteLevel    :    0,
  throneSaveNum    :    10,
  throneDeletedNum : 0,
  RangeSaveModeSetting : 0,
  Opacity : 0.9,
  language : 'en',
  curMarchTab : "transport",
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
  autoPublishGamePopups : false,
  autoPublishPrivacySetting : 80,
  pbupdate : true,
  pbupdatebeta : 0,
  pbNoMoreKabam : false,
  escapeurl : null,
};

var CrestOptions = {
  Running       :     false,
  CrestCity     :     0,
  RoundOne      :     false,
  RoundTwo      :     true,
  lastRoundTwo     :     0,
  X                :    0,
  Y                :    0,
  R1ST            :    0,
  R1MM            :    0,
  R1Scout        :    0,
  R1Pike        :    0,
  R1Sword        :    0,
  R1Arch        :    0,
  R1LC            :    0,
  R1HC            :    0,
  R1SW            :    0,
  R1Ball        :    0,
  R1Ram            :    0,
  R1Cat            :    0,
  R2ST            :    0,
  R2MM            :    0,
  R2Scout        :    0,
  R2Pike        :    0,
  R2Sword        :    0,
  R2Arch        :    0,
  R2LC            :    0,
  R2HC            :    0,
  R2SW            :    0,
  R2Ball        :    0,
  R2Ram            :    0,
  R2Cat            :    0,
};


var CrestData = new Array();

    function CrestFunc (Arr) {
    
        if (Arr == undefined)
            Arr = CrestOptions;

        this.Running         =      true;
          this.CrestCity         =     Arr.CrestCity;
        this.RoundOne         =     Arr.RoundOne;
        this.RoundTwo         =     true;
        this.lastRoundTwo     =     0;
        this.X                 =     Arr.X;
        this.Y                 =     Arr.Y;
        this.R1ST             =     Arr.R1ST;
        this.R1MM             =     Arr.R1MM;
        this.R1Scout         =     Arr.R1Scout;
        this.R1Pike         =     Arr.R1Pike;
        this.R1Sword         =     Arr.R1Sword;
        this.R1Arch         =     Arr.R1Arch;
        this.R1LC             =     Arr.R1LC;
        this.R1HC             =     Arr.R1HC;
        this.R1SW             =     Arr.R1SW;
        this.R1Ball         =     Arr.R1Ball;
        this.R1Ram             =     Arr.R1Ram;
        this.R1Cat             =     Arr.R1Cat;
        this.R2ST             =     Arr.R2ST;
        this.R2MM             =     Arr.R2MM;
        this.R2Scout         =     Arr.R2Scout;
        this.R2Pike         =     Arr.R2Pike;
        this.R2Sword         =     Arr.R2Sword;
        this.R2Arch         =     Arr.R2Arch;
        this.R2LC             =     Arr.R2LC;
        this.R2HC             =     Arr.R2HC;
        this.R2SW             =     Arr.R2SW;
        this.R2Ball         =     Arr.R2Ball;
        this.R2Ram             =     Arr.R2Ram;
        this.R2Cat             =     Arr.R2Cat;
        
    };

var TrainOptions = {
  Running    : false,
  Troops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Threshold  : {1:500,2:500,3:500,4:500,5:500,6:500,7:500,8:500},
  Max        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Gamble     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Workers    : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Item       : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Keep       : {1:{Food:0,Wood:0,Stone:0,Ore:0},
                2:{Food:0,Wood:0,Stone:0,Ore:0},
                3:{Food:0,Wood:0,Stone:0,Ore:0},
                4:{Food:0,Wood:0,Stone:0,Ore:0},
                5:{Food:0,Wood:0,Stone:0,Ore:0},
                6:{Food:0,Wood:0,Stone:0,Ore:0},
                7:{Food:0,Wood:0,Stone:0,Ore:0},
                8:{Food:0,Wood:0,Stone:0,Ore:0}
               },
  Enabled    : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  SelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  Resource   : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  UseIdlePop : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  CraftingRunning : false,
  CraftIntervallMin : 3,
  CraftingActif : {3000:false,3001:false,3002:false,3003:false,3004:false,3005:false,3006:false,3007:false,3008:false,3009:false,3010:false,3011:false},
  CraftingNb : {3000:0,3001:0,3002:0,3003:0,3004:0,3005:0,3006:0,3007:0,3008:0,3009:0,3010:0,3011:0},
};
var FarmOptions = {
    RallyClip: 0,
    Running: false,
    MinMight: 0,
    MaxMight: 999999999,
    Interval: 0,
    SendInterval: 10,
    MaxDistance: 20,
    Inactive:30,
    DeleteReports:false,
    Troops: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0},
    FarmNumber: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0},
    CityEnable: {1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true},
    CityLevel: {0: true,1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true,9: true,10: true,11: true,12: true},
    Diplomacy: {friendly: true,hostile: true,friendlyToThem: true,friendlyToYou: true,neutral:true,unallied:true},
    FarmMarches: [],
    farmMarches: {},
    Attacks:0,
    Checks:0,
};
var ThroneOptions = {
    Active:false,
    Interval:30,
    RepairTime:0,
    Tries:0,
    minStones : 100000,
    Good:0,
    Bad:0,
    Items: [],
    Salvage:{Attack:true,Defense:true,Life:true,Speed:true,Accuracy:true,Range:true,Load:true,MarchSize:true,MarchSpeed:true,CombatSkill:true,IntelligenceSkill:true,PoliticsSkill:true,ResourcefulnessSkill:true,TrainingSpeed:true,ConstructionSpeed:true,ResearchSpeed:true,CraftingSpeed:true,Upkeep:true,ResourceProduction:true,ResourceCap:true,Storehouse:true,Morale:true,ItemDrop:true},
    SalvageQuality:0,
    saveXitems:0,
    thronekeep:1,
};
var AttackOptions = {
  LastReport            : 0,
  MsgEnabled              : true,
  MsgInterval              : 30,
  Method                : "distance",
  SendInterval            : 8,
  MaxDistance           : 40,
  RallyClip                : 0,
  Running               : false,
  BarbsFailedKnight        : 0,
  BarbsFailedRP         : 0,
  BarbsFailedTraffic       : 0,
  BarbsFailedVaria        : 0,
  BarbsFailedBog        : 0,
  BarbsTried            : 0,
  DeleteMsg             : true,
  DeleteMsgs0            : false,
  Foodstatus            : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  MsgLevel                : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
  BarbsDone             : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  BarbNumber            : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Levels                : {1:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},8:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
  Troops                : {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0}},
  MinDistance            : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},
  Distance              : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750},
  Update                : {1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0],8:[0,0]},
  UpdateEnabled         : true,
  UpdateInterval        : 30,
  stopsearch            : 1,
  knightselector        : 0,
  barbMinKnight            : 56,
  barbMaxKnight            : 250,
};

var ResetAll=false;
var deleting=false;

var ChatOptions = {
  latestChats               : [],
  AllowUsersRemoteControl   : [],
  BlacklistUsersRemoteControl: [],
  password                  : '',
  Chatpassenable            : false,
};

var ApothecaryOptions = {
    Active : false,
    goldkeep : 0,
    city : {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]},
};

var CombatOptions = {
    research : [{tch8:0,tch9:0,tch13:0,tch15:0}, //Poison Edge, Metal Alloys, Fletching, Healing Potions
                {tch8:0,tch9:0,tch13:0,tch15:0}],
    knt      : [50,50],
    guardian : [['wood',0],['ore',0]],
    ratio    : [{unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}},
                {unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}}],
}

// Get element by id shortform with parent node option
function $(ID,root) {return (root||document).getElementById(ID);}

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
if (document.URL.search(/kabam.com\/kingdoms-of-camelot\/play/i) >= 0){
  kabamStandAlone ();
  return;
}

if (document.URL.search(/facebook.com/i) >= 0){
    if(document.URL.search(/connect\/uiserver.php/i) >= 0 ||
       document.URL.search(/serverfbml/i) >= 0 ||
       document.URL.search(/dialog\/stream.publish/i) >= 0 ||
       document.URL.search(/dialog\/apprequests/i) >= 0 ||
       document.URL.search(/dialog\/feed/i) >= 0)
        HandlePublishPopup ();
  return;
}
if (document.URL.search(/kingdomsofcamelot.com/i) >= 0){
  kocWideScreen ();
}

function kocWideScreen(){
  function setWideFb (){
    var kocFrame = parent.document.getElementById('kocIframes1');
    if (!kocFrame){
      setTimeout (setWideFb, 1000);
      return;
    }
    kocFrame.style.width = '100%';
    var style = document.createElement('style')
    style.innerHTML = 'body {margin:0; width:100%; !important;}';
    kocFrame.parentNode.appendChild(style);
  }
  kocWatchdog ();
  if (GlobalOptions.pbWideScreen)
        setWideFb();
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

function kabamStandAlone (){
  function setWide (){
    var iFrames = $('game_frame');
    if (!iFrames){
      setTimeout (setWide, 1000);
      return;
    }
    iFrames.style.width = '100%';
    while ( (iFrames=iFrames.parentNode) != null)
      if (iFrames.tagName=='DIV')
        iFrames.style.width = '100%';
  }

  function sendmeaway (){
    var serverID = /s=([0-9]+)/im.exec (document.location.href);
    var sr = /signed_request" value="(.*?)"/im.exec ($("post_form").innerHTML);
    var goto = $("post_form").action+(serverID?"?s="+serverID[1]:'');
    var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxxpbutExplode type=submit value=RELOAD><INPUT type=hidden name=signed_request value="'+ sr[1] +'" /><INPUT type=hidden name=platform_req value=A /></form>';
    var e = document.createElement ('div');
    e.innerHTML = t;
    document.body.appendChild (e);
    setTimeout (function (){document.getElementById('xxxpbutExplode').click();}, 0);
  }
  if (GlobalOptions.pbWideScreen)
    setWide();
  if(GlobalOptions.pbNoMoreKabam)
    sendmeaway();
  }

function HandlePublishPopup() {
    if(GlobalOptions.autoPublishGamePopups){
        // Check the app id (we only want to handle the popup for kingdoms of camelot)
        var FBInputForm = document.getElementById('uiserver_form');
        logit("FBInputForm "+FBInputForm);
        if(FBInputForm){
            var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
            logit("channel_input "+channel_input);
            if(channel_input){
                var current_channel_url = channel_input.value;
                logit("current_channel_url "+current_channel_url);
                if (current_channel_url.match(/(http|https):\/\/(.*?)\.kingdomsofcamelot\.com(.*?)/i)) {
                    var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
                    var privacy_setting = nHtml.FindByXPath(FBInputForm,".//select[@name='audience[0][value]']");
                    logit("publish_button "+publish_button);
                    logit("privacy_setting "+privacy_setting);
                    if(publish_button && privacy_setting){
                        // 80: Everyone
                        // 50: Friends of Friends
                        // 40: Friends Only
                        // 10: Only Me
                        privacy_setting.innerHTML = '<option value="'+ GlobalOptions.autoPublishPrivacySetting +'"></option>';
                        privacy_setting.selectedIndex = 0;
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
var pbButtons = {};
var mainPop;
var pbStartupTimer = null;
var pbPopUpTopClass = 'pbPopTop';
var firefoxVersion = getFirefoxVersion();
var TrainCity = 0;
var CM = unsafeWindow.cm;

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
  //logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  readOptions();
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
    table.pbTabPad tr td { padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .pbStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
    .pbentry {padding: 7px; white-space:nowrap;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
    input.pbDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
    a.ptButton20 {color:#ffff80}\
    table.pbMainTab { empty-cells: show; margin-left: 5px; margin-top: 4px; padding: 1px;  padding-left:5px;}\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 4px 0px 4px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
    table.pbMainTab tr td.spacer {padding: 0px 0px;}\
    table.pbMainTab tr td.notSel { color: #ffffff; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #666666; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td.sel { color: #000000; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #CECECE; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td:hover { color: #191919; font-size: 12px; font-weight:bold; text-shadow: -1px 1px 3px #CECECE; background: -moz-linear-gradient(top, #43cc7e, #20a129)}\
    tr.pbPopTop td { background-color:transparent; border:none; height: 21px; padding:0px;}\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.pbMainPopTop td { background-color:#ded; border:none; height: 42px; width:80%; padding:0px; }\
    tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .pbPopMain  { border:1px solid #000000; -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
    .pbPopup  {border:5px ridge #666; opacity:'+(parseFloat(Options.Opacity)<'0.5'?'0.5':Options.Opacity)+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
    .pbButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* Barb Attack v"+ Version +" Loaded");
  readLanguage();
  readChatOptions(); 
  readCrestData();
  readTrainingOptions();
  readCombatOptions();
  readAttackOptions();
  readFarmOptions();
  readThroneOptions();
  readApothecaryOptions();
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

  mainPop = new pbPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 750,800, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions();
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = '<STYLE>'+ styles +'</style>';
  AddMainTabLink('Barb Attack', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("Barb Attack v"+ Version +" Loaded  (KofC version: "+ anticd.getKOCversion() +")");
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  SpamEvery.init ();
  CollectGold.init();
  FoodAlerts.init();
  ChatPane.init();
  ChatStuff.init();
  DeleteReports.init();
  //DeleteThrone.init();
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
                msg += translate("My city")+' '+Cities.cities[i].name.substring(0,10) + ' (' +
                      Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += translate("is low on food")+". "+translate("Remaining")+': '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') '+translate("Upkeep")+': '+addCommas(usage);
                sendChat ("/a " + msg);
          }
    }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
  },
}









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
      popExp = new pbPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
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



 
 ; 

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
    var t = RefreshEvery;
    t.creatediv();
    if (Options.pbEveryMins < 1)
        Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
    t.target = document.getElementById('comm_tabs');
    if(t.target == null){
        setTimeout(t.creatediv, 2000);
        return;
    }
    t.box = document.createElement('div');
    t.target.appendChild(t.box);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60); 
      t.timer = setTimeout (t.Paint, 1000);
    } else {
        //t.PaintTimer = null;
        t.timer = null;
        t.NextRefresh = 0;
        t.box.innerHTML = '<BR><FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
    }
  },
  
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
     var t = RefreshEvery;
     if(t.timer == null) return;
     now = unixTime();
     //var text = '<FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left < 0){
        Left = 0;
        t.doit();
     }
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': </font><FONT color=red><B>'+ timestr(Left) +'</b></font></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': <B>'+ timestr(Left) +'</b></font></div>';
    
     t.box.innerHTML = text;
     t.timer = setTimeout (t.Paint, 1000);
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
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>'+translate("KOC Power Bot has detected that KOC is not loaded")+'<BR>'+translate("Refreshing in")+' <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="'+translate("Cancel Refresh")+'"><BR><BR></div>';
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


/******************* Language Tab ******************/
Tabs.Language = {
  tabOrder : 800,                    // order to place tab in top bar
  tabLabel : 'UnUsed',            // label to show in main window tabs
  myDiv : null,
   language : {needTranslation:{}},
  link : {"http://koc-power-bot.googlecode.com/svn/trunk/translation/translation_en.js":"en"},
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Language;
    t.myDiv = div;
   var m = "<DIV class=pbStat>"+translate("Language Settings")+"</div><TABLE><TR>\
            <TD>"+translate("Set Language")+" : "+ htmlSelector({en:"en"},Options.language,"id=pblang_type") +"</td>\
            <TD><input id=pblang_update value='"+translate("Save Settings")+"' type=submit DISABLED /><span id=pblang_msg ></span></td></tr>\
            <TR><TD>"+translate("Language files download")+" : "+ htmlSelector(t.link,null,"id=pblang_link") +"</td>\
            <td><input id=pblang_download value='"+translate("Download")+"' type=submit /></td></tr>\
            <TR><TD>"+translate("Show current language array:")+" </td>\
            <TD><input id=pblang_show value='"+translate("Show")+"' type=submit /></td></tr>";
    t.myDiv.innerHTML = m; 
    
    document.getElementById("pblang_type").addEventListener('change', function (){
        if(Options.language != document.getElementById("pblang_type").value)
            document.getElementById("pblang_update").disabled = false;
        else
            document.getElementById("pblang_update").disabled = true;
    },false);
    document.getElementById("pblang_update").addEventListener('click', function (){
        var language = document.getElementById("pblang_type").value;
        var s = GM_getValue ("Language_"+language);
        if (s != null){
            var lang = JSON2.parse (s);
            t.sendMessage("Loaded <b>"+language+"</b> Version <b>"+lang.Version+"</b>");
            Options.language = document.getElementById("pblang_type").value;
        } else {
            t.sendMessage("<span class=boldRed> Language <b>"+language+"</b> not found. Please download language file!</span>");
            document.getElementById("pblang_type").value = Options.language;
        }
    },false);
    document.getElementById("pblang_download").addEventListener('click', function (){
        document.getElementById("pblang_download").disabled = true;
        GM_xmlhttpRequest({
            method: 'GET',
            url: document.getElementById("pblang_link").value,
            onload: function(xpr) {t.updatelanguage(xpr.responseText, document.getElementById("pblang_link").value);},
            onerror: function(xpr) {t.updatelanguage(xpr.responseText, false);}
        });
    },false);
    document.getElementById("pblang_show").addEventListener('click', function(){
        t.showlanguage();
    },false);
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Language;
  },
  
  show : function (){
      
  },
  
  showlanguage : function(){
      var t = Tabs.Language;
      t.poplangshow = new pbPopup('pbShowLanguage', 10, 10, 600, 500, true, function() {t.poplangshow.destroy();});
      t.poplangshow.getTopDiv().innerHTML = '<TD><B>'+translate("Language Array:")+'</td>';
      t.poplangshow.getMainDiv().innerHTML = '<DIV style="max-height:440px;overflow-y:auto"><TABLE style="overflow-y:auto" align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pblang_showarray"></table></div><div id=pblang_status ></div>';
      t.paintlanguagearray();
      t.poplangshow.show(true);
  },
  
  paintlanguagearray : function(){
      var t = Tabs.Language;
      var m = '';
      for (var k in t.language.needTranslation){
          m += "<TR><TD style='max-width:250px;word-wrap:break-word' >"+k.escape_space()+": </td><TD><input id='pblang_"+escape(k)+"' value='"+(t.language.needTranslation[k]==1?'':t.language.needTranslation[k].unescape_space())+"' /></td></tr>";
      }
      for (var k in t.language){
          if(k != "needTranslation")
            m += "<TR><TD style='max-width:250px;word-wrap:break-word' >"+k.escape_space()+": </td><TD>"+t.language[k].escape_space()+"</td></tr>";
      }
      document.getElementById("pblang_showarray").innerHTML = m;
      document.getElementById("pblang_status").innerHTML = "<center><input type=submit id=pblang_statussave value=Save /><input type=submit id=pblang_statusexport value='Export new translation' /></center>";
      document.getElementById("pblang_statussave").addEventListener('click', function(){
        for (var k in t.language.needTranslation){
            var j = document.getElementById("pblang_"+escape(k)).value;
            if(j != '')
                t.language.needTranslation[k] = j;
        }
        saveLanguage();
      },false);
      document.getElementById("pblang_statusexport").addEventListener('click', function(){
          t.export();
      },false);
  },  
  
  export : function(){
      var t = Tabs.Language;
      var pop = new pbPopup('pbExportLanguage', 0, 0, 400, 400, true, function() {this.destroy();});
      var m = "<textarea rows=15 cols=50 >";
       for (var k in t.language.needTranslation){
          if(t.language.needTranslation[k] != 1)
            m += "\""+k+"\":\""+t.language.needTranslation[k]+"\",\n";
      }
      m += "</textarea>";
      pop.getMainDiv().innerHTML = m;
      pop.show(true);
  },
  
  sendMessage : function (msg){
      document.getElementById("pblang_msg").innerHTML = msg;
  },
  
  updatelanguage : function(result, response){
      var t = Tabs.Language;
      if(!response) {
          t.sendMessage("<span class=boldRed>Error loading file. Try again later</span>");
      document.getElementById("pblang_download").disabled = false;
          return;
      }
      var rslt = null;
      try{
        rslt = JSON2.parse(result);
      } catch (e){
        t.sendMessage("<span class=boldRed>Error reading file. Please notify devs</span>");
        logit(inspect(e,7,1));
        document.getElementById("pblang_download").disabled = false;
        return;
      }
      var s = GM_getValue ("Language_"+rslt.curlang);
      if (s != null){
        var lang = JSON2.parse (s);
        for (k in rslt){
            if(lang.needTranslation)
                if(lang.needTranslation[k]) //Remove from array if already translated
                    delete lang.needTranslation[k];
            lang[k] = rslt[k];
        }
      } else {
          var lang = rslt;
      }
      setTimeout (function (){GM_setValue ('Language_'+rslt.curlang, JSON2.stringify(lang));}, 0);
      t.sendMessage("Successfully loaded language file. Please refresh");
      document.getElementById("pblang_download").disabled = false;
  },
}

function readLanguage () {
    var t = Tabs.Language;
    if(!Options.language) return;
    var s = GM_getValue ("Language_"+Options.language);
    if (s != null){
        var lang = JSON2.parse (s);
        for (k in lang){
            t.language[k] = lang[k];
        }
    }
    t.language.curlang = Options.language;
}

function saveLanguage (){
    var t = Tabs.Language;
    setTimeout (function (){GM_setValue ('Language_'+t.language.curlang, JSON2.stringify(t.language));}, 0);
}

function translate (str) {
    var t = Tabs.Language;
    if(t.language[str])
        return t.language[str];
    else {
        if(t.language.needTranslation[str] == undefined)
            t.language.needTranslation[str] = 1;
        else if (t.language.needTranslation[str] != 1)
            return t.language.needTranslation[str];
    }
    return str;    
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
    unsafeWindow.cm.cheatDetector.detect = eval ('function a (){}');
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
      if ((i+1)%9 == 0) m+='</tr><TR>';
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
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
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
  saveLanguage();
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
function CdispCityPicker (id, span, dispName, notify, selbut, disable_list){
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
  for (var i=0; i<Cities.cities.length; i++){
    if(matTypeof(disable_list) == 'array'){
        if(disable_list[i])
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit DISABLED \>';
        else
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
    } else
        m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  }
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
    city.provId = parseInt(Seed.cities[i][4]);
    getTroopDefTrainEstimates('city'+ city.id, city);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function getTroopDefTrainEstimates (cityID, city){
    var b = Seed.buildings[cityID];
    city.numCottages = 0;
    city.numBarracks = 0;
    city.maxBarracks = 0;
    city.totLevelsBarracks = 0;
    city.blacksmithLevel = 0;
    city.stableLevel = 0;
    city.workshopLevel = 0;
    city.wallLevel = 0;
    city.feyLevel = 0;
    for (var j=1; j<33; j++){
        if (b['pos'+j]) {
            var bname = parseInt(b['pos'+j][0]);
            var blvl = parseInt(b['pos'+j][1]);
            switch(bname){
                case 13:
                    city.numBarracks++;
                    city.totLevelsBarracks += parseInt(blvl);
                    if (blvl>city.maxBarracks) city.maxBarracks=blvl;
                    break;
                case 5:
                    city.numCottages++;
                    break;
                case 15:
                    city.blacksmithLevel = blvl;
                    break;
                case 16:
                    city.workshopLevel = blvl;
                    break;
                case 17:
                    city.stableLevel = blvl;
                    break;
                case 19:
                    city.wallLevel = blvl;
                    break;
                case 20:
                    city.feyLevel = blvl;
                    break;
            }
        }
    }

    var now = unixTime();
    city.marshallCombatScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].combatKnightId];
        if (s){
            city.marshallCombatScore = s.combat;
            if (s.combatBoostExpireUnixtime > now)
                city.marshallCombatScore *= 1.25;
        }
    }
    city.foremanBasePoliticsScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].politicsKnightId];
        if (s){
            city.foremanBasePoliticsScore = s.politics;
            if (s.politicsBoostExpireUnixtime > now)
                city.foremanBasePoliticsScore *= 1.25;
        }
    }

    city.loggingLevel = parseInt(Seed.tech["tch2"]);
    city.geometryLevel = parseInt(Seed.tech["tch5"]);
    city.eagleEyesLevel = parseInt(Seed.tech["tch6"]);
    city.poisonedEdgeLevel = parseInt(Seed.tech["tch8"]);
    city.metalAlloysLevel = parseInt(Seed.tech["tch9"]);
    city.featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
    city.alloyHorseshoesLevel = parseInt(Seed.tech["tch12"]);
    city.fletchingLevel = parseInt(Seed.tech["tch13"]);
    city.giantsStrengthLevel = parseInt(Seed.tech["tch16"]);

    var bm = city.numBarracks + 0.1 * (city.totLevelsBarracks - city.numBarracks);
    var mf = city.marshallCombatScore / 200;
    var gf = city.geometryLevel / 10;
    var sf = city.stableLevel / 10;
    var wf = city.workshopLevel / 10;
    var isf = bm * (1 + mf + gf);
    var csf = bm * (1 + mf + gf + sf);
    var ssf = bm * (1 + mf + gf + sf + wf);
    var pf = city.foremanBasePoliticsScore / 200;
    var gsf = city.giantsStrengthLevel / 10;
    var dsf = 1 + pf + gsf;

    
    city.Troop1Time = ((city.maxBarracks > 0)?(50/isf):0);
    city.Troop2Time = city.Troop1Time/2;
    city.Troop3Time = ((city.maxBarracks > 1 && city.eagleEyesLevel > 0)?(100/isf):0);
    city.Troop4Time = ((city.maxBarracks > 1 && city.poisonedEdgeLevel > 0)?(150/isf):0);
    city.Troop5Time = ((city.maxBarracks > 2 && city.blacksmithLevel > 0 && city.metalAlloysLevel > 0)?(225/isf):0);
    city.Troop6Time = ((city.maxBarracks > 3 && city.fletchingLevel > 0)?(350/isf):0);
    city.Troop7Time = ((city.maxBarracks > 4 && city.stableLevel > 0 && city.alloyHorseshoesLevel > 0)?(500/csf):0);
    city.Troop8Time = ((city.maxBarracks > 6 && city.blacksmithLevel > 4 && city.stableLevel > 4 && city.alloyHorseshoesLevel > 4)?(1500/csf):0);
    city.Troop9Time = ((city.maxBarracks > 5 && city.stableLevel > 0 && city.workshopLevel > 2 && city.featherweightPowderLevel > 0)?(1000/ssf):0);
    city.Troop10Time = ((city.maxBarracks > 7 && city.stableLevel > 1 && city.workshopLevel > 4 && city.geometryLevel > 4 && city.fletchingLevel > 5)?(3000/ssf):0);
    city.Troop11Time = ((city.maxBarracks > 8 && city.blacksmithLevel > 4 && city.stableLevel > 2 && city.workshopLevel > 6 && city.metalAlloysLevel > 7 && city.geometryLevel > 6)?(4500/ssf):0);
    city.Troop12Time = ((city.maxBarracks > 9 && city.stableLevel > 1 && city.workshopLevel > 8 && city.geometryLevel > 9 && city.fletchingLevel > 9)?(6000/ssf):0);
    city.Def53Time = ((city.wallLevel > 5 && city.blacksmithLevel > 5 && city.fletchingLevel > 4)?(180/dsf):0);
    city.Def55Time = ((city.wallLevel > 7 && city.blacksmithLevel > 7 && city.fletchingLevel > 6 && city.geometryLevel > 6)?(135/dsf):0);
    city.Def60Time = ((city.wallLevel > 3 && city.blacksmithLevel > 3 && city.poisonedEdgeLevel > 1)?(90/dsf):0);
    city.Def61Time = ((city.wallLevel > 0 && city.metalAlloysLevel > 0)?(30/dsf):0);
    city.Def62Time = ((city.wallLevel > 1 && city.blacksmithLevel > 1 && city.loggingLevel > 1)?(60/dsf):0);
}


function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new pbPopup ('pbretry', 0, 0, 400,225, true);
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
  var delay = 3;
  var show = true;
  var noRetry = noRetry===true?true:false;
  var silentTimer;
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
    var rslt;
    try {
        rslt = JSON2.parse(msg.responseText);
    } catch(e) {
        //alert(unescape(msg.responseText));
        if (retry<2) {
            rslt = {"ok":false,"error_code":9,"errorMsg":"Failed due to invalid json"}
        } else {
            rslt = {"ok":true,"error_code":9,"data":[]};
        }
    }
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
    if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else if (!noRetry && rslt.error_code==9) {
        silentTimer = setTimeout(silentRetry, delay*100);
    } else {
      wasSuccess (rslt);
    }
  }
  
  function silentRetry() {
    clearTimeout(silentTimer);
    myRetry();
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
  if(getMyAlliance()[0] == aid)
    return 'ally';
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

function saveChatOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ChatOptions_'+serverID, JSON2.stringify(ChatOptions));}, 0);
}

function saveTrainOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}

function saveCrestData (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CrestData_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestData));}, 0);
}

function saveCombatOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CombatOptions));}, 0);
}

function saveApothecaryOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ApothecaryOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(ApothecaryOptions));}, 0);
}


function readUpgradeData (){
  var serverID = getServerId();
  s = GM_getValue ('UpgradeData_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          upgradeData[k][kk] = opts[k][kk];
      else
        upgradeData[k] = opts[k];
    }
  }
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

function readChatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ChatOptions_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ChatOptions[k][kk] = opts[k][kk];
      else
        ChatOptions[k] = opts[k];
    }
  }
}

function readApothecaryOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ApothecaryOptions_'+Seed.player['name']+'_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ApothecaryOptions[k][kk] = opts[k][kk];
      else
        ApothecaryOptions[k] = opts[k];
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
function readCrestData (){
  var serverID = getServerId();
  s = GM_getValue ('CrestData_' + Seed.player['name'] + '_' +serverID);

  if (s != null) {
    opts = JSON2.parse (s);

    for (var i = 0; i < opts.length; i++) {
        CrestData[i] = new CrestFunc(opts[i]);
    }

  }


}


function readCombatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
            if (matTypeof(opts[k][kk]) == 'object')
                for (kkk in opts[k][kk])
                  CombatOptions[k][kk][kkk] = opts[k][kk][kkk];
            else
                CombatOptions[k][kk] = opts[k][kk];
      else
        CombatOptions[k] = opts[k];
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

/************* Updater code *************/
// Function for displaying a confirmation message modal popup similar to the default javascript confirm() function
// but with the advantage being that it won't halt all other javascript being executed on the page.
// Original Author: Thomas Chapin (April 6, 2011)
function display_confirm(confirm_msg,ok_function,cancel_function){
    if(!confirm_msg){confirm_msg="";}
    
    var container_div = document.getElementById('modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=10000000;
        
        div=document.createElement('div');
        div.id='modal_js_confirm_contents';
        div.style.zIndex=10000000;
        div.style.backgroundColor='#eee';
        div.style.fontFamily='"lucida grande",tahoma,verdana,arial,sans-serif';
        div.style.fontSize='11px';
        div.style.textAlign='center';
        div.style.color='#333333';
        div.style.border='2px outset #666';
        div.style.padding='10px';
        div.style.position='relative';
        div.style.width='300px';
        div.style.height='100px';
        div.style.margin='300px auto 0px auto';
        div.style.display='block';
        
        container_div.appendChild(div);
        document.body.appendChild(container_div);
        
        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

// The following code is released under public domain.

var AutoUpdater_101052 = {
    id: 101052,
    days: 1,
    name: "KOC Power Bot",
    version: Version,
    beta: GlobalOptions.pbupdatebeta,
    betaUrl : 'http://koc-power-bot.googlecode.com/svn/trunk/KOCpowerBot.user.js',
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
        url: this.beta ? this.betaUrl : 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
        onload: function(xpr) {AutoUpdater_101052.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_101052.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_101052', new Date().getTime()+'');
            AutoUpdater_101052.call(true, true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
                //GM_setValue('updated_101052', 'off');
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        
        if ( updated ) {
                         
            display_confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?',
                // Ok
                function(){
                    try { 
                        location.href = AutoUpdater_101052.beta ? AutoUpdater_101052.betaUrl :  'http://userscripts.org/scripts/source/101052.user.js'; 
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_101052.xversion ) {
                        if(confirm('Do you want to turn off auto updating for this script?')) {
                            //GM_setValue('updated_101052', 'off');
                            GlobalOptions.pbupdate = false;
                            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater_101052.enable();
                            alert('Automatic updates can be re-enabled for this script in the Options tab.');
                        }
                    }
                }
            );
                                      
        } else if (response){
            alert('No updates available for '+this.name);
        }
    },
    check: function(tf) {
        if (!tf){
            this.enable();
        } else {
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_101052', new Date().getTime()+'');
                AutoUpdater_101052.call(true, true)
            });
            if (+this.time > (+GM_getValue('updated_101052', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_101052', this.time+'');
                this.call(false, true);
            }
        }
    }
};
if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined') { // has an updater?
    try {
        AutoUpdater_101052.check(GlobalOptions.pbupdate);
    } catch(e) {
        AutoUpdater_101052.check(GlobalOptions.pbupdate);
    }
}
/********* End updater code *************/

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
  var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  if(document.URL.match(/standalone=1/i)){
    goto = window.location.protocol+'//www.kabam.com/kingdoms-of-camelot/play?s='+serverId;
  }
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
function parseIntCommas (n){
  n = n.split(',');
  n = n.join('');
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
function isNaNCommas (n){
  n = n.split(',');
  n = n.join('');
  return isNaN(n);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;  
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : pbPopup obj
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
function pbPopup (prefix, x, y, width, height, enableDrag, onClose) {
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
  this.div.className = 'pbPopup '+ prefix +'_pbPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'show';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (pbPopUpTopClass==null)
    topClass = 'pbPopupTop '+ prefix +'_pbPopupTop';
  else
    topClass = pbPopUpTopClass +' '+ prefix +'_'+ pbPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% ><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px; -moz-border-radius-topright: 20px;">x</td></tr>\
      </table><TABLE cellspacing=0 width=100% ><TR><TD height=100% valign=top class="pbPopMain '+ prefix +'_pbPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
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

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"','{':'&#123;','}':'&#125;'};
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
String.prototype.escape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = escape(s[i]);
    //return s.join(" ");
    return this.replace(/</ig,"&#60;");
}
String.prototype.unescape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = unescape(s[i]);
    //return s.join(" ");
    return this;
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
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
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
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
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
       if (this.isLoaded)
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
       if (this.isLoaded)
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
   if (this.isLoaded)
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

//koc version-572
//modal_maptile(this,307227,"NewRetard",698,326,"m8","oftheNOOBS",42318533,"90","Darkness",null,14,"city","Normal",12,2136,26654,1550996,"City",false);return false;
function DrawLevelIcons() {
    var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
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
            if(onclickM && onclickM[7]!='"null"') {
                var might=onclickM[8].StripQuotes();
                var alliance=onclickM[16].StripQuotes();
                var dip=getDiplomacy(alliance);
                owner=" "+onclickM[7].StripQuotes();
            }
        }
        var m=lvRe.exec(a.className);
        if(!m) continue;
        var sp=a.getElementsByTagName('span');
        if(sp.length==0) continue;

        if(!idDone) { a.id='levelIcons'; idDone=true; }
        sp[0].style.color='#cc0';
        
        if (alliance == 'null' && onclickM[13]=='"city"') sp[0].style.color='#33CCFF';
        if (dip == 'hostile' && onclickM[13]=='"city"') sp[0].style.color='#FF0000';
        if (onclickM[13]!='"city"' &&  onclickM[7]!='"null"') sp[0].style.color='#FF9900';
        if (onclickM[13]!='"city"' &&  onclickM[6]=='"null"' && onclickM[7]=='"null"' && onclickM[8]=='"null"' && onclickM[9]=='"null"' && onclickM[16]=='"null"' && onclickM[11]=='"null"') sp[0].style.color='#CC0033';
        if (Options.MapShowExtra) {
            if (onclickM && onclickM[7]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1]+owner+'<br />Might:'+addCommas(might);
            else sp[0].innerHTML='&nbsp;'+m[1]+addCommas(owner);
        }
        else {  
            if (onclickM && onclickM[7]!='"null"' ) sp[0].innerHTML='&nbsp;'+m[1];
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

function saveAttackOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AttackOptions_'+serverID, JSON2.stringify(AttackOptions));}, 0);
}

function readAttackOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AttackOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          AttackOptions[k][kk] = opts[k][kk];
      else
        AttackOptions[k] = opts[k];
    }
  }
}

function saveFarmOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('FarmOptions_' + serverID, JSON2.stringify(FarmOptions));
    }, 0);
}

function readFarmOptions() {
    var serverID = getServerId();
    s = GM_getValue('FarmOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object') for (kk in opts[k])
            FarmOptions[k][kk] = opts[k][kk];
            else FarmOptions[k] = opts[k];
        }
    }
}

function saveThroneOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('ThroneOptions_' + serverID, JSON2.stringify(ThroneOptions));
    }, 0);
}

function readThroneOptions() {
    var serverID = getServerId();
    s = GM_getValue('ThroneOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object') for (kk in opts[k])
            ThroneOptions[k][kk] = opts[k][kk];
            else ThroneOptions[k] = opts[k];
        }
    }
}


 
var DeleteReports = {
    deleting : false,
    init : function(){
        var t = DeleteReports;
        setInterval(t.startdeletereports, 2*60*1000);
    },
    
    startdeletereports : function(){
        var t = DeleteReports;
          if(!t.deleting && (Options.DeleteMsg || Options.DeleteMsgs0 || Options.DeleteMsgs1 || Options.DeleteMsgs2)){
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
            t.deleting = false;
            return;
        }
        if(rslt.arReports.length < 1){
        logit("CR stopped arreports < 1");
            t.deleting = false;
            return;
        }
        var reports = rslt.arReports;
        var totalPages = rslt.totalPages;
        if (rslt.totalPages > 30)
        var totalPages = 30;
        var deletes1 = new Array();
        var deletes0 = new Array();
        for(k in reports){
            if(Options.DeleteMsg){
                if((reports[k].marchType==4 || reports[k].marchType==9) && reports[k].side0PlayerId==0 && reports[k].side0TileType > 50)
                    deletes1.push(k.substr(2));
                else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
                    deletes1.push(k.substr(2));
            }
            if (Options.DeleteMsgs0){
                if(reports[k].marchType==1 && !t.isMyself(reports[k].side1PlayerId))
                    deletes0.push(k.substr(2));
            }
            if (Options.DeleteMsgs1){
                if((reports[k].side0TileType <= 50 || reports[k].side0TileType==54)&& reports[k].side0PlayerId==0)
                    deletes1.push(k.substr(2));

            }
            if (Options.DeleteMsgs2){
                for(i in CrestData) {
                    if(reports[k].side0XCoord == CrestData[i].X && reports[k].side0YCoord == CrestData[i].Y && reports[k].marchType==4 && t.isMyself(reports[k].side1PlayerId)) {
                        deletes1.push(k.substr(2));
                    }
                }

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

/*********************************  Cresting Tab ***********************************/
 Tabs.Crest = {
  tabOrder : 70,
  myDiv : null,
  rallypointlevel:null,
  error_code: 0,
  knt:{},

/** window display **/  
  init : function (div){
    var t = Tabs.Crest;
    Options.crestMarchError = 0;

    setInterval(t.sendCrestReport, 1*60*1000);    
    t.timer = setTimeout(function(){ t.Rounds(1,0,0);}, CrestOptions.interval*1000);


    t.myDiv = div;
    var selbut=0;
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED BARB ATTACK FUNCTION</div><TABLE id=pbcrestfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (Options.crestRunning == false) {
           m += '<TD><INPUT id=Cresttoggle type=submit value="Barb = OFF"></td>';
       } else {
           m += '<TD><INPUT id=Cresttoggle type=submit value="Barb = ON"></td>';
       }



    m += '<TD><INPUT id=CrestHelp type=submit value="HELP"></td>';
    m += '<td><INPUT id=showCrestTargets type=submit value="Show Targets"></td>';
    /*m += '<TD><INPUT id=pbsendreport type=checkbox '+ (Options.crestreport?' CHECKED':'') +'\> Send Crest report every ';*/
    m += '<INPUT id=pbsendcrestreportint value='+ Options.CrestMsgInterval +' type=text size=3 \> hours </td>\
          <TD>Attack interval <INPUT type=text size=3 value='+Options.Crestinterval+' id=pbcrest_interval />seconds</tr></table>';
  
    m += '<DIV id=pbOpt class=pbStat>BARB OPTIONS</div><TABLE id=pbcrestopt     width=100% height=0% class=pbTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;">Barb from city: <span id=crestcity></span></div>';
    
    m += '<TABLE class=ptTab><TR><TD>Wild coords: X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value=""></td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value=""></td></tr>';
    m += '<TR><TD><INPUT type=checkbox id=pbcrest_iswild CHECKED /> Is Wild </td></tr></table>';
   

    m += '<TABLE class=ptTab><TR><TD><INPUT type=checkbox id=pbcrest_rnd1 CHECKED /></td><TD>Wave <b>1</b>: </td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.png></td><TD><INPUT id=R1ST type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R1MM type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.png></td><TD><INPUT id=R1Scout type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R1Pike type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R1Sword type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R1Arch type=text size=7 maxlength=6 value=0></td></tr>';
    m += '<tr><td></td><td></td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.png></td><TD><INPUT id=R1LC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.png></td><TD><INPUT id=R1HC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.png></td><TD><INPUT id=R1SW type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R1Ball type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R1Ram type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R1Cat type=text size=7 maxlength=6 value=0></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>';
    
    m += '<TR><TD><INPUT type=checkbox id=pbcrest_rnd2 CHECKED /></td><TD>Wave <b></b>: </td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.png></td><TD><INPUT id=R2ST type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R2MM type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.png></td><TD><INPUT id=R2Scout type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R2Pike type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R2Sword type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R2Arch type=text size=7 maxlength=6 value=0></td></tr>';
    m += '<tr><td></td><td></td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.png></td><TD><INPUT id=R2LC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.png></td><TD><INPUT id=R2HC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.png></td><TD><INPUT id=R2SW type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R2Ball type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R2Ram type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R2Cat type=text size=7 maxlength=6 value=0></td></tr></table>';
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteCrest type=submit value="Add Attack"></div>';
    
    t.myDiv.innerHTML = m;
    
   /* document.getElementById('pbsendreport').addEventListener('change', function(){
        Options.crestreport = document.getElementById('pbsendreport').checked;
        saveOptions();
    }, false);*/
    /*document.getElementById('pbsendcrestreportint').addEventListener('change', function(){
        Options.CrestMsgInterval = parseInt(document.getElementById('pbsendcrestreportint').value);
        saveOptions();
    }, false);*/
    $("pbcrest_interval").addEventListener('change', function(e){
        Options.Crestinterval = parseIntNan(e.target.value);
        saveOptions();
    },false);
    
    for (var i=0;i<Seed.cities.length;i++){
        if (CrestOptions.CrestCity == Seed.cities[i][0]){
            selbut=i;
            break;
        }
    }
        
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
    if (CrestOptions.CrestCity == 0) {
        CrestOptions.CrestCity = t.tcp.city.id
    }

    /*$('pbcrest_iswild').addEventListener('click', function(){
        CrestOptions.isWild = this.checked;
    },false);*/
    $('pbcrest_rnd1').addEventListener('click', function(){
        var checked = (!this.checked);
        CrestOptions.round1 = this.checked;
        $('R1ST').disabled = checked;
        $('R1MM').disabled = checked;
        $('R1Scout').disabled = checked;
        $('R1Pike').disabled = checked;
        $('R1Sword').disabled = checked;
        $('R1Arch').disabled = checked;
        $('R1LC').disabled = checked;
        $('R1HC').disabled = checked;
        $('R1SW').disabled = checked;
        $('R1Ball').disabled = checked;
        $('R1Ram').disabled = checked;
        $('R1Cat').disabled = checked;
    },false); 
    $('pbcrest_rnd2').addEventListener('click', function(){
        var checked = (!this.checked);
        CrestOptions.round2 = this.checked;
        $('R2ST').disabled = checked;
        $('R2MM').disabled = checked;
        $('R2Scout').disabled = checked;
        $('R2Pike').disabled = checked;
        $('R2Sword').disabled = checked;
        $('R2Arch').disabled = checked;
        $('R2LC').disabled = checked;
        $('R2HC').disabled = checked;
        $('R2SW').disabled = checked;
        $('R2Ball').disabled = checked;
        $('R2Ram').disabled = checked;
        $('R2Cat').disabled = checked;
    },false);
      document.getElementById('pbcrestx').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcrestx').value)) document.getElementById('pbcrestx').value='' ;
      }, false);

      document.getElementById('pbcresty').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcresty').value)) document.getElementById('pbcresty').value='' ;
      }, false);

      document.getElementById('R1ST').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1ST').value)) document.getElementById('R1ST').value=0 ;
      }, false);

      document.getElementById('R1MM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1MM').value)) document.getElementById('R1MM').value=0 ;
      }, false);

      document.getElementById('R1Pike').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Pike').value)) document.getElementById('R1Pike').value=0 ;
      }, false);

      document.getElementById('R1Scout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Scout').value)) document.getElementById('R1Scout').value=0 ;
      }, false);

      document.getElementById('R1Sword').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Sword').value)) document.getElementById('R1Sword').value=0 ;
      }, false);

      document.getElementById('R1Arch').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Arch').value)) document.getElementById('R1Arch').value=0 ;
      }, false);

      document.getElementById('R1LC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1LC').value)) document.getElementById('R1LC').value=0 ;
      }, false);

      document.getElementById('R1HC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1HC').value)) document.getElementById('R1HC').value=0 ;
      }, false);

      document.getElementById('R1SW').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1SW').value)) document.getElementById('R1SW').value=0 ;
      }, false);

      document.getElementById('R1Ball').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Ball').value)) document.getElementById('R1Ball').value=0 ;
      }, false);

      document.getElementById('R1Ram').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Ram').value)) document.getElementById('R1Ram').value=0 ;
      }, false);

      document.getElementById('R1Cat').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Cat').value)) document.getElementById('R1Cat').value=0 ;
      }, false); 
       
      document.getElementById('R2ST').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2ST').value)) document.getElementById('R2ST').value=0 ;
      }, false);

      document.getElementById('R2MM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2MM').value)) document.getElementById('R2MM').value=0 ;
      }, false);

      document.getElementById('R2Pike').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Pike').value)) document.getElementById('R2Pike').value=0 ;
      }, false);

      document.getElementById('R2Scout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Scout').value)) document.getElementById('R2Scout').value=0 ;
      }, false);

      document.getElementById('R2Sword').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Sword').value)) document.getElementById('R2Sword').value=0 ;
      }, false);

      document.getElementById('R2Arch').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Arch').value)) document.getElementById('R2Arch').value=0 ;
      }, false);

      document.getElementById('R2LC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2LC').value)) document.getElementById('R2LC').value=0 ;
      }, false);

      document.getElementById('R2HC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2HC').value)) document.getElementById('R2HC').value=0 ;
      }, false);

      document.getElementById('R2SW').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2SW').value)) document.getElementById('R2SW').value=0 ;
      }, false);

      document.getElementById('R2Ball').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Ball').value)) document.getElementById('R2Ball').value=0 ;
      }, false);

      document.getElementById('R2Ram').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Ram').value)) document.getElementById('R2Ram').value=0 ;
      }, false);

      document.getElementById('R2Cat').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Cat').value)) document.getElementById('R2Cat').value=0 ;
      }, false);
         
    document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value;;} , false);
    document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value;} , false);
    document.getElementById('R1ST').addEventListener('change', function(){CrestOptions.R1ST = document.getElementById('R1ST').value;} , false);
    document.getElementById('R1MM').addEventListener('change', function(){CrestOptions.R1MM = document.getElementById('R1MM').value;} , false);
    document.getElementById('R1Scout').addEventListener('change', function(){CrestOptions.R1Scout = document.getElementById('R1Scout').value;} , false);
    document.getElementById('R1Pike').addEventListener('change', function(){CrestOptions.R1Pike = document.getElementById('R1Pike').value;} , false);
    document.getElementById('R1Sword').addEventListener('change', function(){CrestOptions.R1Sword = document.getElementById('R1Sword').value;} , false);
    document.getElementById('R1Arch').addEventListener('change', function(){CrestOptions.R1Arch = document.getElementById('R1Arch').value;} , false);
    document.getElementById('R1LC').addEventListener('change', function(){CrestOptions.R1LC = document.getElementById('R1LC').value;} , false);
    document.getElementById('R1HC').addEventListener('change', function(){CrestOptions.R1HC = document.getElementById('R1HC').value;} , false);
    document.getElementById('R1SW').addEventListener('change', function(){CrestOptions.R1SW = document.getElementById('R1SW').value;} , false);
    document.getElementById('R1Ball').addEventListener('change', function(){CrestOptions.R1Ball = document.getElementById('R1Ball').value;} , false);
    document.getElementById('R1Ram').addEventListener('change', function(){CrestOptions.R1Ram = document.getElementById('R1Ram').value;} , false);
    document.getElementById('R1Cat').addEventListener('change', function(){CrestOptions.R1Cat = document.getElementById('R1Cat').value;} , false);
    document.getElementById('R2ST').addEventListener('change', function(){CrestOptions.R2ST = document.getElementById('R2ST').value;} , false);
    document.getElementById('R2MM').addEventListener('change', function(){CrestOptions.R2MM = document.getElementById('R2MM').value;} , false);
    document.getElementById('R2Scout').addEventListener('change', function(){CrestOptions.R2Scout = document.getElementById('R2Scout').value;} , false);
    document.getElementById('R2Pike').addEventListener('change', function(){CrestOptions.R2Pike = document.getElementById('R2Pike').value;} , false);
    document.getElementById('R2Sword').addEventListener('change', function(){CrestOptions.R2Sword = document.getElementById('R2Sword').value;} , false);
    document.getElementById('R2Arch').addEventListener('change', function(){CrestOptions.R2Arch = document.getElementById('R2Arch').value;} , false);
    document.getElementById('R2LC').addEventListener('change', function(){CrestOptions.R2LC = document.getElementById('R2LC').value;} , false);
    document.getElementById('R2HC').addEventListener('change', function(){CrestOptions.R2HC = document.getElementById('R2HC').value;} , false);
    document.getElementById('R2SW').addEventListener('change', function(){CrestOptions.R2SW = document.getElementById('R2SW').value;} , false);
    document.getElementById('R2Ball').addEventListener('change', function(){CrestOptions.R2Ball = document.getElementById('R2Ball').value;} , false);
    document.getElementById('R2Ram').addEventListener('change', function(){CrestOptions.R2Ram = document.getElementById('R2Ram').value;} , false);
    document.getElementById('R2Cat').addEventListener('change', function(){CrestOptions.R2Cat = document.getElementById('R2Cat').value;} , false);
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
    document.getElementById('pbSaveRouteCrest').addEventListener('click', function(){t.addCrestRoute();}, false);
    document.getElementById('showCrestTargets').addEventListener('click', function(){t.showCrestRoute();}, false);
  },
  
  helpPop : function (){
    var helpText = '<BR>The Barb tab is designed to attack one Barb camp over and over again.<BR>';
    /*helpText += 'It will attack a wild in 2 waves, abandon it and start over.<BR>';
    helpText += 'So make sure u have 1 FREE SLOT in your castle for a wild!<BR>';*/
    helpText += 'Just fill in the coordinates, troops and hit "ON".<BR><BR>';
    helpText += 'Troop numbers (from KOC WIKI):<BR>';
    helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Wilderness">More can be found on Koc Wikia</a>';
    helpText += '<TABLE width=100%><TR><TD>Level</td><TD>Attack</td><TD>Min. Fletching</td></tr>';
    helpText += '<TR><TD></td><TD></td><TD></td><TD></td></tr>';
    helpText += '<TR><TD>1</td><TD>500 archers</td><TD>2+</td></tr>';
    helpText += '<TR><TD>2</td><TD>3K archers</td><TD>3+</td></tr>';
    helpText += '<TR><TD>3</td><TD>4K archers</td><TD>4+</td></tr>';
    helpText += '<TR><TD>4</td><TD>15K archers</td><TD>5+</td></tr>';
    helpText += '<TR><TD>5</td><TD>20K archers</td><TD>6+</td></tr>';
    helpText += '<TR><TD>6</td><TD>40K archers</td><TD>7+</td></tr>';
    helpText += '<TR><TD>7</td><TD>50K archers</td><TD>8+</td></tr>';
    helpText += '<TR><TD>8</td><TD>30K Bal</td><TD>9+</td></tr>';
    helpText += '<TR><TD>9</td><TD>60K Bal</td><TD>10</td></tr>';
    helpText += '<TR><TD>10</td><TD>120K Cat</td><TD>10</td></tr></table>';
    
    var pop = new pbPopup ('giftHelp', 0, 0, 650, 385, true);
    pop.centerMe (mainPop.getMainDiv()); 
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help: Cresting</b></center>';
    pop.show (true);
  },

/** Add crest route **/
    addCrestRoute : function () {
        if(CrestOptions.X == "" || CrestOptions.Y == "") {
            alert("Please enter Coords");
            return;
        }
        
        var t = Tabs.Crest;
        var CrestLength = CrestData.length;
        
        CrestData[CrestLength] = new CrestFunc(CrestOptions);
        saveCrestData();

    },
    
    

/** Show Crest Targets **/
    showCrestRoute : function () {
        var t = Tabs.Crest;
        var popCrestTargets = null;
        t.popCrestTargets = new pbPopup('pbShowCrestTargets', 0, 0, 1100, 485, true, function() {clearTimeout (1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowCrestTargets" id="pbCrestTargets">';       
        t.popCrestTargets.getMainDiv().innerHTML = '</table></div>' + m;
        t.popCrestTargets.getTopDiv().innerHTML = '<TD><CENTER><B>Crest Targets</center></td>';
        t.paintCrestTargets();
        t._addTabHeader();
        t.popCrestTargets.show(true);

    },
    
    

/** add header **/
    _addTabHeader : function () {
        var row = document.getElementById('pbCrestTargets').insertRow(0);
        row.vAlign = 'top';
             row.insertCell(0).innerHTML = "City / Target";
             row.insertCell(1).innerHTML = "Wave #";
             row.insertCell(2).innerHTML = "SupTroop";
             row.insertCell(3).innerHTML = "MM";
             row.insertCell(4).innerHTML = "Scout";
             row.insertCell(5).innerHTML = "Pike";
             row.insertCell(6).innerHTML = "Sword";
             row.insertCell(7).innerHTML = "Arch";
             row.insertCell(8).innerHTML = "LC";
             row.insertCell(9).innerHTML = "HC";
             row.insertCell(10).innerHTML = "SupWagon";
             row.insertCell(11).innerHTML = "Balls";
             row.insertCell(12).innerHTML = "Ram";
             row.insertCell(13).innerHTML = "Cats";
             row.insertCell(14).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
    },
    
    

/** paintCrestTargets **/
    paintCrestTargets : function () {
        t = Tabs.Crest;

        for(var i = 0; i < CrestData.length; i++) {
            t._addTabCrest(i, "Attack: " + CrestData[i].X + "," + CrestData[i].Y, "Wave 2", CrestData[i].R2ST, CrestData[i].R2MM, CrestData[i].R2Scout, CrestData[i].R2Pike, CrestData[i].R2Sword, CrestData[i].R2Arch, CrestData[i].R2LC, CrestData[i].R2HC, CrestData[i].R2SW, CrestData[i].R2Ball, CrestData[i].R2Ram, CrestData[i].R2Cat, " ");
            t._addTabCrest(i, CrestData[i].CrestCity, "Wave 1", CrestData[i].R1ST, CrestData[i].R1MM, CrestData[i].R1Scout, CrestData[i].R1Pike, CrestData[i].R1Sword, CrestData[i].R1Arch, CrestData[i].R1LC, CrestData[i].R1HC, CrestData[i].R1SW, CrestData[i].R1Ball, CrestData[i].R1Ram, CrestData[i].R1Cat, "Delete");
            t._addTabCrest(i, "","","","","","","","","","","","","","","");
        }

    },
    
    

/** Add Tab Crest **/
    _addTabCrest : function (QueID, col0, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13, col14) {
        var t = Tabs.Crest;
        var row = document.getElementById('pbCrestTargets').insertRow(0);

        for (var i = 0; i <= 14; i++) {
            if (i == 14 && col14 == "Delete") {
                row.insertCell(i).innerHTML = "<a id=pbCrestDel_" + QueID + " value=" + i + ">Delete</a>";
                document.getElementById('pbCrestDel_' + QueID).addEventListener('click', function(){t.cancelCrestTarget(QueID);}, false);
            } else if (col14 == "Delete" && i == 0) {
                row.insertCell(i).innerHTML = Cities.byID[col0].name;
            } else {
                row.insertCell(i).innerHTML = eval("col" + i) + "&nbsp; &nbsp;";
            }
        }
        
    },
    
    

/** Cancel Crest Target **/
    cancelCrestTarget : function (QueID) {
         var t = Tabs.Crest;
         var queueId = parseInt(QueID);
         CrestData.splice(queueId, 1);
         saveCrestData();
         t.showCrestRoute();
    },
    
    

    getRallypointLevel: function(cityId){
        var t = Tabs.Crest;
        for (var o in Seed.buildings[cityId]){
            var buildingType = parseInt(Seed.buildings[cityId][o][0]);
            var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
            if (buildingType == 12) 
                t.rallypointlevel=parseInt(buildingLevel);
        }
    },
  
 

    getAtkKnight : function(cityID){
        var t = Tabs.Crest;
        t.knt = new Array();
        for (k in Seed.knights[cityID]){
            if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
                 t.knt.push ({
                     Name:   Seed.knights[cityID][k]["knightName"],
                     Combat:    parseInt(Seed.knights[cityID][k]["combat"]),
                     ID:        Seed.knights[cityID][k]["knightId"],
                 });
             }
        }
        t.knt = t.knt.sort(function sort(a,b) {a = parseInt(a['Combat']);b = parseInt(b['Combat']);return a == b ? 0 : (a > b ? -1 : 1);});
    },
   

   
     sendMarch: function(p,callback,r,retry, CrestDataNum){
        var t = Tabs.Crest;            
        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {    
             method: "post",
             parameters: p,
             loading: true,
             onSuccess: function (transport) {        
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                    var ut = unsafeWindow.unixtime();
                    var unitsarr=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                    var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
                    for(i = 0; i <= unitsarr.length; i++){
                        if(p["u"+i]){
                            unitsarr[i] = p["u"+i];
                        }
                    }

                    var currentcityid = p.cid;
                    unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, p.xcoord, p.ycoord, unitsarr, p.type, p.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                    unsafeWindow.update_seed(rslt.updateSeed)
                
                    if (rslt.updateSeed) {
                        unsafeWindow.update_seed(rslt.updateSeed);
                    }
             
                    GM_log(r);
             
                    if(r==1){
                        Options.Crest1Count++;
                        r = 2;
                    } else {
                        Options.Crest2Count++;
                    }                
            
                    var now = new Date().getTime()/1000.0;
                    now = now.toFixed(0);
                    CrestData[CrestDataNum].lastRoundTwo = now;
                    saveCrestData();
                    setTimeout (function(){callback(r,0,parseInt(CrestDataNum)+1);}, (Math.random()*10*1000)+(5*1000));    
                    return;
                    
                } else {

                    if (rslt.user_action) {
                        new CdialogCancelContinue('<SPAN class=boldRed>CAPTCHA ALERT! You have been sending too many attacks!</span>', null, null, mainPop.getMainDiv);
                        logit('send march captcha');
                        setTimeout (function(){callback(r,retry,CrestDataNum);}, 5*60*1000);
                        return;
                    }
                    setTimeout (function(){callback(r,retry,CrestDataNum);}, 5000);
                    return;
                }
            },
             onFailure: function () {
                setTimeout (function(){callback(r,retry,CrestDataNum);}, 5000);
                return;
             }
          });    
    },
    

    /*
    abandonWilderness: function(tid,x,y,cid,callback,retry, CrestDataNum){
        var t = Tabs.Crest;        
        if (!Options.crestRunning) return;
        
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
              onSuccess:function(transport){
                var rslt=eval("("+transport.responseText+")");
                if (rslt.ok) {
                    t.error_code = 0;    
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
                       } else    {
                        delete Seed.wilderness["city"+cityID]["t"+tileid];
                       }
                } else {
                    if (rslt.error_code != 401) {
                        t.error_code = rslt.error_code;
                       }
                  }                
              },
              onFailure: function () {}
          });
    },
    */
    
    
    Rounds : function (r, retry, CrestDataNum) {
        var t = Tabs.Crest;
        clearTimeout(t.timer);
        //r = (typeof r === 'undefined') ? 0 : r;
        //retry = (typeof retry === 'undefined') ? 0 : retry;
        //CrestDataNum = (typeof CrestDataNum === 'undefined') ? 0 : CrestDataNum;

        if (!Options.crestRunning) return;
        if (CrestData.length == 0)
            return;
        if (CrestDataNum >= CrestData.length)
            CrestDataNum = 0;

        cityID = 'city' + CrestData[CrestDataNum].CrestCity;
        retry++;
        
        if(CrestData[CrestDataNum].isWild){
            for (var k in Seed.wilderness[cityID] ){
                if (Seed.wilderness[cityID][k]['xCoord']==CrestData[CrestDataNum].X && Seed.wilderness[cityID][k]['yCoord']==CrestData[CrestDataNum].Y && t.error_code!=401) {
                    t.abandonWilderness(Seed.wilderness[cityID][k]['tileId'],Seed.wilderness[cityID][k]['xCoord'],Seed.wilderness[cityID][k]['yCoord'],CrestData[CrestDataNum].CrestCity,t.Rounds,retry,CrestDataNum);
                    break;
                }
            }
        }

        switch (retry) {
            case 10:
                setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},30*1000);
                return;
                break;
            case 20:
                setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},30*1000);
                return;
                break;
        }
        
        if (parseInt(Seed.units[cityID]['unt1']) < CrestData[CrestDataNum].R1ST || parseInt(Seed.units[cityID]['unt2']) < CrestData[CrestDataNum].R1MM || parseInt(Seed.units[cityID]['unt3']) < CrestData[CrestDataNum].R1Scout || parseInt(Seed.units[cityID]['unt4']) < CrestData[CrestDataNum].R1Pike || parseInt(Seed.units[cityID]['unt5']) < CrestData[CrestDataNum].R1Sword || parseInt(Seed.units[cityID]['unt6']) < CrestData[CrestDataNum].R1Arch || parseInt(Seed.units[cityID]['unt7']) < CrestData[CrestDataNum].R1LC || parseInt(Seed.units[cityID]['unt8']) < CrestData[CrestDataNum].R1HC || parseInt(Seed.units[cityID]['unt9']) < CrestData[CrestDataNum].R1SW || parseInt(Seed.units[cityID]['unt10']) < CrestData[CrestDataNum].R1Ball || parseInt(Seed.units[cityID]['unt11']) < CrestData[CrestDataNum].R1Ram || parseInt(Seed.units[cityID]['unt12']) < CrestData[CrestDataNum].R1Cat || parseInt(Seed.units[cityID]['unt1']) < CrestData[CrestDataNum].R2ST || parseInt(Seed.units[cityID]['unt2']) < CrestData[CrestDataNum].R2MM || parseInt(Seed.units[cityID]['unt3']) < CrestData[CrestDataNum].R2Scout || parseInt(Seed.units[cityID]['unt4']) < CrestData[CrestDataNum].R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestData[CrestDataNum].R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestData[CrestDataNum].R2Arch || parseInt(Seed.units[cityID]['unt7']) < CrestData[CrestDataNum].R2LC || parseInt(Seed.units[cityID]['unt8']) < CrestData[CrestDataNum].R2HC || parseInt(Seed.units[cityID]['unt9']) < CrestData[CrestDataNum].R2SW || parseInt(Seed.units[cityID]['unt10']) < CrestData[CrestDataNum].R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestData[CrestDataNum].R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestData[CrestDataNum].R2Cat) {
            if (CrestData.length == 1) {
                t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                return;
             } else
                t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
            return;
        }
        

        t.getAtkKnight(cityID);
        slots=0;
        
        for (z in Seed.queue_atkp[cityID]) {
            slots++;
        }
        if  (Seed.queue_atkp[cityID].toSource() == "[]")
            slots=0;
        
        t.getRallypointLevel(cityID);
        switch (t.rallypointlevel) {
            case 12:
                t.rallypointlevel = t.rallypointlevel - 1;
            default:
                if (t.rallypointlevel <= slots) {
                    if (CrestData.length == 1) {
                        t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                    } else {
                        t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
                    }
                    return;
                    break;
                }
        }

       
        if  (t.knt.toSource() == "[]") {
            t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
            return;
        } 
        var kid = t.knt[0].ID;
        if (CrestData[CrestDataNum].R1ST == 0 && CrestData[CrestDataNum].R1MM == 0 && CrestData[CrestDataNum].R1Scout == 0 && CrestData[CrestDataNum].R1Pike == 0 && CrestData[CrestDataNum].R1Sword == 0 && CrestData[CrestDataNum].R1Arch == 0 && CrestData[CrestDataNum].R1LC == 0 && CrestData[CrestDataNum].R1HC == 0 && CrestData[CrestDataNum].R1SW == 0 && CrestData[CrestDataNum].R1Ball == 0 && CrestData[CrestDataNum].R1Ram == 0 && CrestData[CrestDataNum].R1Cat == 0) {
           r=2;
       }else {
            var now = new Date().getTime()/1000.0;
            now = now.toFixed(0);
            if (now > (parseInt(CrestData[CrestDataNum].lastRoundTwo) + 300)) {
                r=1;
            }
        }

        switch(r) {
            case 1:
                if ((t.rallypointlevel-slots) < 2) {
                    t.timer = setTimeout(function(){ t.Rounds(1,retry,CrestDataNum+1);},Options.Crestinterval*1000);
                    return;
                }
                var params         =     unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid        =     CrestData[CrestDataNum].CrestCity;
                params.type        =    4;
                params.kid        =     kid;
                params.xcoord     =     CrestData[CrestDataNum].X;
                params.ycoord     =     CrestData[CrestDataNum].Y;
                if (now < (parseInt(CrestData[CrestDataNum].lastRoundTwo) + 300)) { 
                
                    params.u2     =     (CrestData[CrestDataNum].R1MM / 10);
                    params.u2     =     params.u2.toFixed(0);
                    
                    if (params.u2 < (CrestData[CrestDataNum].R1MM / 10)) 
                        params.u2++;
                } else {
                    params.u2    =     CrestData[CrestDataNum].R1MM;
                }
                params.u1         =     CrestData[CrestDataNum].R1ST;
                params.u2         =     CrestData[CrestDataNum].R1MM;
                params.u3         =     CrestData[CrestDataNum].R1Scout;
                params.u4         =     CrestData[CrestDataNum].R1Pike;
                params.u5         =     CrestData[CrestDataNum].R1Sword;
                params.u6         =     CrestData[CrestDataNum].R1Arch;
                params.u7         =     CrestData[CrestDataNum].R1LC;
                params.u8         =     CrestData[CrestDataNum].R1HC;
                params.u9         =     CrestData[CrestDataNum].R1SW;
                params.u10         =     CrestData[CrestDataNum].R1Ball;
                params.u11         =     CrestData[CrestDataNum].R1Ram;
                params.u12         =     CrestData[CrestDataNum].R1Cat;
                
                t.sendMarch(params,t.Rounds,r,retry, CrestDataNum);
                break;
            default:
                var params         =     unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid        =     CrestData[CrestDataNum].CrestCity;
                params.type        =     4;
                params.kid        =     kid;
                params.xcoord     =     CrestData[CrestDataNum].X;
                params.ycoord     =     CrestData[CrestDataNum].Y;
                params.u1         =     CrestData[CrestDataNum].R2ST;
                params.u2         =     CrestData[CrestDataNum].R2MM;
                params.u3         =     CrestData[CrestDataNum].R2Scout;
                params.u4         =     CrestData[CrestDataNum].R2Pike;
                params.u5         =     CrestData[CrestDataNum].R2Sword;
                params.u6         =     CrestData[CrestDataNum].R2Arch;
                params.u7         =     CrestData[CrestDataNum].R2LC;
                params.u8         =     CrestData[CrestDataNum].R2HC;
                params.u9         =     CrestData[CrestDataNum].R2SW;
                params.u10         =     CrestData[CrestDataNum].R2Ball;
                params.u11         =     CrestData[CrestDataNum].R2Ram;
                params.u12         =     CrestData[CrestDataNum].R2Cat;
                t.sendMarch(params,t.Rounds,r,retry, CrestDataNum);
                break;
        }

    },
    

    
    toggleCrestState: function(obj) {
        var t = Tabs.Crest;
            if (Options.crestRunning == true) {
                Options.crestRunning = false;
                obj.value = "Crest = OFF";
                saveOptions();
            } else {
                Options.crestRunning = true;
                obj.value = "Crest = ON";
                for (crest in Options.Creststatus) {
                    owned = Seed.items['i'+crest];
                    if (owned == undefined) {
                        owned=0;
                    }
                    Options.Creststatus[crest] = owned;
                    Options.Crest1Count = 0;
                    Options.Crest2Count = 0;
                }
                var now = new Date().getTime()/1000.0;
                now = now.toFixed(0);
                Options.LastCrestReport = now;
                saveOptions();
                t.timer = setTimeout(function(){ t.Rounds(1,0,0);}, Options.Crestinterval*1000);
            }
    },
    
    
    

   sendCrestReport: function(){
        if(!Options.crestreport || !CrestOptions.Running) 
            return;
            
        var t = Tabs.Crest;
        var now = new Date().getTime()/1000.0;
        now = now.toFixed(0);
        
        if (now < (parseInt(Options.LastCrestReport)+(Options.CrestMsgInterval*60*60))) 
            return;

        var total = 0;
        var wildtype =     '';

        switch (Options.CrestType) {
            case '10':
                wildtype = unsafeWindow.g_js_strings.commonstr.grassland;
                break;
            case '11': 
                wildtype = unsafeWindow.g_js_strings.commonstr.lake;
                break;
            case '20': 
                wildtype = unsafeWindow.g_js_strings.commonstr.woods;
                break;
            case '30': 
                wildtype = unsafeWindow.g_js_strings.commonstr.hills;
                break;
            case '40': 
                wildtype = unsafeWindow.g_js_strings.commonstr.mountain;
                break;
            case '50': 
                wildtype = unsafeWindow.g_js_strings.commonstr.plain;
                break;
        }
        
        var message = 'Crest Stats: %0A';
        message += '%0A Crests Gained (for '+ Options.CrestMsgInterval +' hour of cresting) on a Level: '+Options.CrestLevel+' '+wildtype+'%0A';

        for (crest in Options.Creststatus) {
            owned = Seed.items['i'+crest];
            if (owned == undefined) 
                owned =    0;
            if ((owned - Options.Creststatus[crest]) > 0) 
                message    +=     '<DIV><B>' + unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A </b></div>';
            else 
                message    +=     unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A';
                
            total += (owned - Options.Creststatus[crest]);
            Options.Creststatus[crest] = owned;
        }
        
        message += '%0A Total Crests gained: '+ total +'%0A';
        message += '%0A Numbers of 1st Wave send: '+ Options.Crest1Count +'%0A';
        message += 'Numbers of 2nd Wave send: '+ Options.Crest2Count +'%0A';

        Options.Crest1Count = 0;
        Options.Crest2Count = 0;

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
                } 
            },
            onFailure: function () {
            },
        });

        saveOptions();
    },  


    hide : function (){
        var t = Tabs.Crest;
    },

    show : function (){
    },
 };
/** End Cresting tab **/



    
    

//
pbStartup ();

