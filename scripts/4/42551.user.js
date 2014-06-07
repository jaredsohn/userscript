                                                                     
                                                                     
                                                                     
                                             
// ==UserScript==
// @name           PlayerOfGame
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/showBoxscore.php?gid=*
// ==/UserScript==

// ********************************************************************
// Formula Description
// ********************************************************************

/*
formula: 	pog = m_pts*pts + m_reb*reb + m_ast*ast + m_blk*blk + m_stl*stl - m_to*to - (fga-fgm)*m_missfg - (fta-ftm)*m_missft + dif*m_dif;

pog - player of the game score
pts - points
reb - rebounds
ast - assists
blk - blocked shots
stl - steals
to - turnover
missfg - missed field goal
missft - missed free throws
dif - points differential between both teams (negative for the losing team)

*/

// ********************************************************************
// Multipliers
// ********************************************************************

var m_pts = 1;
var m_reb = 0.8;
var m_ast = 2.2;
var m_blk = 2.5;
var m_stl = 3;
var m_to = 2;
var m_missfg = 0.5;
var m_missft = 0.5;
var m_dif = 0.7;

// ##############################################################################################################################################################
// ##############################################################################################################################################################

// ********************************************************************
// Retrieve Stats
// ********************************************************************

var teams = document.evaluate(
	'//p[@class="registerNow"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var team1 = teams.snapshotItem(0).innerHTML;
var team2 = teams.snapshotItem(1).innerHTML;

var scan = document.evaluate(
	'//td[@width="150"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var player1 = scan.snapshotItem(3).innerHTML;
var player2 = scan.snapshotItem(4).innerHTML;
var player3 = scan.snapshotItem(5).innerHTML;
var player4 = scan.snapshotItem(6).innerHTML;
var player5 = scan.snapshotItem(7).innerHTML;
var player6 = scan.snapshotItem(8).innerHTML;
var player7 = scan.snapshotItem(9).innerHTML;
var player8 = scan.snapshotItem(10).innerHTML;
var player9 = scan.snapshotItem(11).innerHTML;
var player10 = scan.snapshotItem(12).innerHTML;
var player11 = scan.snapshotItem(14).innerHTML;
var player12 = scan.snapshotItem(15).innerHTML;
var player13 = scan.snapshotItem(16).innerHTML;
var player14 = scan.snapshotItem(17).innerHTML;
var player15 = scan.snapshotItem(18).innerHTML;
var player16 = scan.snapshotItem(19).innerHTML;
var player17 = scan.snapshotItem(20).innerHTML;
var player18 = scan.snapshotItem(21).innerHTML;
var player19 = scan.snapshotItem(22).innerHTML;
var player20 = scan.snapshotItem(23).innerHTML;

var scan = document.evaluate(
	'//td[@class="loginBottomText"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

// Player 1
var i = 19;
var player1fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player1fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player1threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player1threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player1ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player1fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player1oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player1dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player1reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player1ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player1stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player1blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player1to = scan.snapshotItem(i + 9).innerHTML * 1;
var player1pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 2
i += 13;
var player2fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player2fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player2threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player2threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player2ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player2fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player2oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player2dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player2reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player2ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player2stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player2blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player2to = scan.snapshotItem(i + 9).innerHTML * 1;
var player2pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 3
i += 13;
var player3fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player3fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player3threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player3threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player3ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player3fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player3oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player3dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player3reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player3ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player3stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player3blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player3to = scan.snapshotItem(i + 9).innerHTML * 1;
var player3pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 4
i += 13;
var player4fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player4fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player4threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player4threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player4ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player4fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player4oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player4dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player4reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player4ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player4stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player4blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player4to = scan.snapshotItem(i + 9).innerHTML * 1;
var player4pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 5
i += 13;
var player5fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player5fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player5threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player5threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player5ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player5fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player5oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player5dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player5reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player5ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player5stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player5blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player5to = scan.snapshotItem(i + 9).innerHTML * 1;
var player5pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 6
i += 13;
var player6fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player6fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player6threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player6threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player6ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player6fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player6oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player6dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player6reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player6ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player6stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player6blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player6to = scan.snapshotItem(i + 9).innerHTML * 1;
var player6pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 7
i += 13;
var player7fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player7fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player7threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player7threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player7ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player7fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player7oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player7dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player7reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player7ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player7stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player7blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player7to = scan.snapshotItem(i + 9).innerHTML * 1;
var player7pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 8
i += 13;
var player8fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player8fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player8threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player8threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player8ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player8fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player8oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player8dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player8reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player8ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player8stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player8blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player8to = scan.snapshotItem(i + 9).innerHTML * 1;
var player8pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 9
i += 13;
var player9fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player9fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player9threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player9threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player9ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player9fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player9oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player9dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player9reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player9ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player9stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player9blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player9to = scan.snapshotItem(i + 9).innerHTML * 1;
var player9pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 10
i += 13;
var player10fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player10fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player10threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player10threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player10ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player10fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player10oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player10dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player10reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player10ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player10stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player10blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player10to = scan.snapshotItem(i + 9).innerHTML * 1;
var player10pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Team 1 Totals
i += 12;
var total1fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var total1fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var total1threem = makes(scan.snapshotItem(i + 1).innerHTML);
var total1threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var total1ftm = makes(scan.snapshotItem(i + 2).innerHTML) * 1;
var total1fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var total1oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var total1dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var total1reb = scan.snapshotItem(i + 5).innerHTML * 1;
var total1ast = scan.snapshotItem(i + 6).innerHTML * 1;
var total1stl = scan.snapshotItem(i + 7).innerHTML * 1;
var total1blk = scan.snapshotItem(i + 8).innerHTML * 1;
var total1to = scan.snapshotItem(i + 9).innerHTML * 1;
var total1pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 11
i += 30;
var player11fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player11fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player11threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player11threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player11ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player11fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player11oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player11dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player11reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player11ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player11stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player11blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player11to = scan.snapshotItem(i + 9).innerHTML * 1;
var player11pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 12
i += 13;
var player12fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player12fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player12threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player12threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player12ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player12fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player12oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player12dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player12reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player12ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player12stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player12blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player12to = scan.snapshotItem(i + 9).innerHTML * 1;
var player12pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 13
i += 13;
var player13fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player13fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player13threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player13threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player13ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player13fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player13oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player13dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player13reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player13ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player13stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player13blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player13to = scan.snapshotItem(i + 9).innerHTML * 1;
var player13pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 14
i += 13;
var player14fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player14fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player14threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player14threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player14ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player14fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player14oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player14dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player14reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player14ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player14stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player14blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player14to = scan.snapshotItem(i + 9).innerHTML * 1;
var player14pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 15
i += 13;
var player15fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player15fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player15threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player15threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player15ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player15fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player15oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player15dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player15reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player15ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player15stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player15blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player15to = scan.snapshotItem(i + 9).innerHTML * 1;
var player15pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 16
i += 13;
var player16fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player16fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player16threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player16threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player16ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player16fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player16oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player16dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player16reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player16ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player16stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player16blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player16to = scan.snapshotItem(i + 9).innerHTML * 1;
var player16pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 17
i += 13;
var player17fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player17fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player17threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player17threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player17ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player17fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player17oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player17dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player17reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player17ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player17stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player17blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player17to = scan.snapshotItem(i + 9).innerHTML * 1;
var player17pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 18
i += 13;
var player18fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player18fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player18threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player18threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player18ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player18fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player18oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player18dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player18reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player18ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player18stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player18blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player18to = scan.snapshotItem(i + 9).innerHTML * 1;
var player18pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 19
i += 13;
var player19fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player19fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player19threem = makes(scan.snapshotItem(i + 1).innerHTML) * 1;
var player19threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player19ftm = makes(scan.snapshotItem(i + 2).innerHTML);
var player19fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player19oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player19dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player19reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player19ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player19stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player19blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player19to = scan.snapshotItem(i + 9).innerHTML * 1;
var player19pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Player 20
i += 13;
var player20fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var player20fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var player20threem = makes(scan.snapshotItem(i + 1).innerHTML);
var player20threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var player20ftm = makes(scan.snapshotItem(i + 2).innerHTML) * 1;
var player20fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var player20oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var player20dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var player20reb = scan.snapshotItem(i + 5).innerHTML * 1;
var player20ast = scan.snapshotItem(i + 6).innerHTML * 1;
var player20stl = scan.snapshotItem(i + 7).innerHTML * 1;
var player20blk = scan.snapshotItem(i + 8).innerHTML * 1;
var player20to = scan.snapshotItem(i + 9).innerHTML * 1;
var player20pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Team 2 Totals
i += 12;
var total2fgm = makes(scan.snapshotItem(i).innerHTML) * 1;
var total2fga = attempts(scan.snapshotItem(i).innerHTML) * 1;
var total2threem = makes(scan.snapshotItem(i + 1).innerHTML);
var total2threea = attempts(scan.snapshotItem(i + 1).innerHTML) * 1;
var total2ftm = makes(scan.snapshotItem(i + 2).innerHTML) * 1;
var total2fta = attempts(scan.snapshotItem(i + 2).innerHTML) * 1;
var total2oreb = scan.snapshotItem(i + 3).innerHTML * 1;
var total2dreb = scan.snapshotItem(i + 4).innerHTML * 1;
var total2reb = scan.snapshotItem(i + 5).innerHTML * 1;
var total2ast = scan.snapshotItem(i + 6).innerHTML * 1;
var total2stl = scan.snapshotItem(i + 7).innerHTML * 1;
var total2blk = scan.snapshotItem(i + 8).innerHTML * 1;
var total2to = scan.snapshotItem(i + 9).innerHTML * 1;
var total2pts = scan.snapshotItem(i + 10).innerHTML * 1;


// Total
var totalfgm = total1fgm + total2fgm;
var totalfga = total1fga + total2fga;
var totalthreem = total1threem + total2threem;
var totalthreea = total1threea + total2threea;
var totalftm = total1ftm + total2ftm;
var totalfta = total1fta + total2fta;
var totaloreb = total1oreb + total2oreb;
var totaldreb = total1dreb + total2dreb;
var totalreb = total1reb + total2reb;
var totalast = total1ast + total2ast;
var totalstl = total1stl + total2stl;
var totalblk = total1blk + total2blk;
var totalto = total1to + total2to;
var totalpts = total1pts + total2pts;
var totaldif1 = (total1pts - total2pts);
var totaldif2 = (total2pts - total1pts);

// ********************************************************************
// Calculate POG Rating
// ********************************************************************

var player1pog = pograting(player1fgm, player1fga, player1threem, player1threea, player1ftm, player1fta, player1oreb, player1dreb, player1reb, player1ast, player1stl, player1blk, player1to, player1pts, totaldif1, player1);
var player2pog = pograting(player2fgm, player2fga, player2threem, player2threea, player2ftm, player2fta, player2oreb, player2dreb, player2reb, player2ast, player2stl, player2blk, player2to, player2pts, totaldif1, player2);
var player3pog = pograting(player3fgm, player3fga, player3threem, player3threea, player3ftm, player3fta, player3oreb, player3dreb, player3reb, player3ast, player3stl, player3blk, player3to, player3pts, totaldif1, player3);
var player4pog = pograting(player4fgm, player4fga, player4threem, player4threea, player4ftm, player4fta, player4oreb, player4dreb, player4reb, player4ast, player4stl, player4blk, player4to, player4pts, totaldif1, player4);
var player5pog = pograting(player5fgm, player5fga, player5threem, player5threea, player5ftm, player5fta, player5oreb, player5dreb, player5reb, player5ast, player5stl, player5blk, player5to, player5pts, totaldif1, player5);
var player6pog = pograting(player6fgm, player6fga, player6threem, player6threea, player6ftm, player6fta, player6oreb, player6dreb, player6reb, player6ast, player6stl, player6blk, player6to, player6pts, totaldif1, player6);
var player7pog = pograting(player7fgm, player7fga, player7threem, player7threea, player7ftm, player7fta, player7oreb, player7dreb, player7reb, player7ast, player7stl, player7blk, player7to, player7pts, totaldif1, player7);
var player8pog = pograting(player8fgm, player8fga, player8threem, player8threea, player8ftm, player8fta, player8oreb, player8dreb, player8reb, player8ast, player8stl, player8blk, player8to, player8pts, totaldif1, player8);
var player9pog = pograting(player9fgm, player9fga, player9threem, player9threea, player9ftm, player9fta, player9oreb, player9dreb, player9reb, player9ast, player9stl, player9blk, player9to, player9pts, totaldif1, player9);
var player10pog = pograting(player10fgm, player10fga, player10threem, player10threea, player10ftm, player10fta, player10oreb, player10dreb, player10reb, player10ast, player10stl, player10blk, player10to, player10pts, totaldif1, player10);
var player11pog = pograting(player11fgm, player11fga, player11threem, player11threea, player11ftm, player11fta, player11oreb, player11dreb, player11reb, player11ast, player11stl, player11blk, player11to, player11pts, totaldif2, player11);
var player12pog = pograting(player12fgm, player12fga, player12threem, player12threea, player12ftm, player12fta, player12oreb, player12dreb, player12reb, player12ast, player12stl, player12blk, player12to, player12pts, totaldif2, player12);
var player13pog = pograting(player13fgm, player13fga, player13threem, player13threea, player13ftm, player13fta, player13oreb, player13dreb, player13reb, player13ast, player13stl, player13blk, player13to, player13pts, totaldif2, player13);
var player14pog = pograting(player14fgm, player14fga, player14threem, player14threea, player14ftm, player14fta, player14oreb, player14dreb, player14reb, player14ast, player14stl, player14blk, player14to, player14pts, totaldif2, player14);
var player15pog = pograting(player15fgm, player15fga, player15threem, player15threea, player15ftm, player15fta, player15oreb, player15dreb, player15reb, player15ast, player15stl, player15blk, player15to, player15pts, totaldif2, player15);
var player16pog = pograting(player16fgm, player16fga, player16threem, player16threea, player16ftm, player16fta, player16oreb, player16dreb, player16reb, player16ast, player16stl, player16blk, player16to, player16pts, totaldif2, player16);
var player17pog = pograting(player17fgm, player17fga, player17threem, player17threea, player17ftm, player17fta, player17oreb, player17dreb, player17reb, player17ast, player17stl, player17blk, player17to, player17pts, totaldif2, player17);
var player18pog = pograting(player18fgm, player18fga, player18threem, player18threea, player18ftm, player18fta, player18oreb, player18dreb, player18reb, player18ast, player18stl, player18blk, player18to, player18pts, totaldif2, player18);
var player19pog = pograting(player19fgm, player19fga, player19threem, player19threea, player19ftm, player19fta, player19oreb, player19dreb, player19reb, player19ast, player19stl, player19blk, player19to, player19pts, totaldif2, player19);
var player20pog = pograting(player20fgm, player20fga, player20threem, player20threea, player20ftm, player20fta, player20oreb, player20dreb, player20reb, player20ast, player20stl, player20blk, player20to, player20pts, totaldif2, player20);


// ********************************************************************
// Calculate Stat Lines
// ********************************************************************

var player1line = statline(player1fgm, player1fga, player1threem, player1threea, player1ftm, player1fta, player1oreb, player1dreb, player1reb, player1ast, player1stl, player1blk, player1to, player1pts, player1pog);
var player2line = statline(player2fgm, player2fga, player2threem, player2threea, player2ftm, player2fta, player2oreb, player2dreb, player2reb, player2ast, player2stl, player2blk, player2to, player2pts, player2pog);
var player3line = statline(player3fgm, player3fga, player3threem, player3threea, player3ftm, player3fta, player3oreb, player3dreb, player3reb, player3ast, player3stl, player3blk, player3to, player3pts, player3pog);
var player4line = statline(player4fgm, player4fga, player4threem, player4threea, player4ftm, player4fta, player4oreb, player4dreb, player4reb, player4ast, player4stl, player4blk, player4to, player4pts, player4pog);
var player5line = statline(player5fgm, player5fga, player5threem, player5threea, player5ftm, player5fta, player5oreb, player5dreb, player5reb, player5ast, player5stl, player5blk, player5to, player5pts, player5pog);
var player6line = statline(player6fgm, player6fga, player6threem, player6threea, player6ftm, player6fta, player6oreb, player6dreb, player6reb, player6ast, player6stl, player6blk, player6to, player6pts, player6pog);
var player7line = statline(player7fgm, player7fga, player7threem, player7threea, player7ftm, player7fta, player7oreb, player7dreb, player7reb, player7ast, player7stl, player7blk, player7to, player7pts, player7pog);
var player8line = statline(player8fgm, player8fga, player8threem, player8threea, player8ftm, player8fta, player8oreb, player8dreb, player8reb, player8ast, player8stl, player8blk, player8to, player8pts, player8pog);
var player9line = statline(player9fgm, player9fga, player9threem, player9threea, player9ftm, player9fta, player9oreb, player9dreb, player9reb, player9ast, player9stl, player9blk, player9to, player9pts, player9pog);
var player10line = statline(player10fgm, player10fga, player10threem, player10threea, player10ftm, player10fta, player10oreb, player10dreb, player10reb, player10ast, player10stl, player10blk, player10to, player10pts, player10pog);
var player11line = statline(player11fgm, player11fga, player11threem, player11threea, player11ftm, player11fta, player11oreb, player11dreb, player11reb, player11ast, player11stl, player11blk, player11to, player11pts, player11pog);
var player12line = statline(player12fgm, player12fga, player12threem, player12threea, player12ftm, player12fta, player12oreb, player12dreb, player12reb, player12ast, player12stl, player12blk, player12to, player12pts, player12pog);
var player13line = statline(player13fgm, player13fga, player13threem, player13threea, player13ftm, player13fta, player13oreb, player13dreb, player13reb, player13ast, player13stl, player13blk, player13to, player13pts, player13pog);
var player14line = statline(player14fgm, player14fga, player14threem, player14threea, player14ftm, player14fta, player14oreb, player14dreb, player14reb, player14ast, player14stl, player14blk, player14to, player14pts, player14pog);
var player15line = statline(player15fgm, player15fga, player15threem, player15threea, player15ftm, player15fta, player15oreb, player15dreb, player15reb, player15ast, player15stl, player15blk, player15to, player15pts, player15pog);
var player16line = statline(player16fgm, player16fga, player16threem, player16threea, player16ftm, player16fta, player16oreb, player16dreb, player16reb, player16ast, player16stl, player16blk, player16to, player16pts, player16pog);
var player17line = statline(player17fgm, player17fga, player17threem, player17threea, player17ftm, player17fta, player17oreb, player17dreb, player17reb, player17ast, player17stl, player17blk, player17to, player17pts, player17pog);
var player18line = statline(player18fgm, player18fga, player18threem, player18threea, player18ftm, player18fta, player18oreb, player18dreb, player18reb, player18ast, player18stl, player18blk, player18to, player18pts, player18pog);
var player19line = statline(player19fgm, player19fga, player19threem, player19threea, player19ftm, player19fta, player19oreb, player19dreb, player19reb, player19ast, player19stl, player19blk, player19to, player19pts, player19pog);
var player20line = statline(player20fgm, player20fga, player20threem, player20threea, player20ftm, player20fta, player20oreb, player20dreb, player20reb, player20ast, player20stl, player20blk, player20to, player20pts, player20pog);


// ********************************************************************
// Determine Highest Score
// ********************************************************************

// Max: Round1
var max1 = Math.max(player1pog,player2pog);
var max2 = Math.max(player3pog,player4pog);
var max3 = Math.max(player5pog,player6pog);
var max4 = Math.max(player7pog,player8pog);
var max5 = Math.max(player9pog,player10pog);
var max6 = Math.max(player11pog,player12pog);
var max7 = Math.max(player13pog,player14pog);
var max8 = Math.max(player15pog,player16pog);
var max9 = Math.max(player17pog,player18pog);
var max10 = Math.max(player19pog,player20pog);

// Round2
var max1 = Math.max(max1,max2);
var max2 = Math.max(max3,max4);
var max3 = Math.max(max5,max6);
var max4 = Math.max(max7,max8);
var max5 = Math.max(max9,max10);

// Round3
var max1 = Math.max(max1,max2);
var max2 = Math.max(max3,max4);

// Round4
var max1 = Math.max(max1,max2);

// Round5
var max1 = Math.max(max1,max5);

var pogdisplay = '<div><p><strong>Player of the Game: </strong>';

if(player1pog == max1)
{
	player1pog = '<strong>' + player1pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player1 + ' of ' + team1 + ' </strong>' + player1line;
}
if(player2pog == max1)
{
	player2pog = '<strong>' + player2pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player2 + ' of ' + team1 + ' </strong>' + player2line;
}
if(player3pog == max1)
{
	player3pog = '<strong>' + player3pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player3 + ' of ' + team1 + ' </strong>' + player3line;
}
if(player4pog == max1)
{
	player4pog = '<strong>' + player4pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player4 + ' of ' + team1 + ' </strong>' + player4line;
}
if(player5pog == max1)
{
	player5pog = '<strong>' + player5pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player5 + ' of ' + team1 + ' </strong>' + player5line;
}
if(player6pog == max1)
{
	player6pog = '<strong>' + player6pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player6 + ' of ' + team1 + ' </strong>' + player6line;
}
if(player7pog == max1)
{
	player7pog = '<strong>' + player7pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player7 + ' of ' + team1 + ' </strong>' + player7line;
}
if(player8pog == max1)
{
	player8pog = '<strong>' + player8pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player8 + ' of ' + team1 + ' </strong>' + player8line;
}
if(player9pog == max1)
{
	player9pog = '<strong>' + player9pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player9 + ' of ' + team1 + ' </strong>' + player9line;
}
if(player10pog == max1)
{
	player10pog = '<strong>' + player10pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player10 + ' of ' + team1 + ' </strong>' + player10line;
}
if(player11pog == max1)
{
	player11pog = '<strong>' + player11pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player11 + ' of ' + team2 + ' </strong>' + player11line;
}
if(player12pog == max1)
{
	player12pog = '<strong>' + player12pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player12 + ' of ' + team2 + ' </strong>' + player12line;
}
if(player13pog == max1)
{
	player13pog = '<strong>' + player13pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player13 + ' of ' + team2 + ' </strong>' + player13line;
}
if(player14pog == max1)
{
	player14pog = '<strong>' + player14pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player14 + ' of ' + team2 + ' </strong>' + player14line;
}
if(player15pog == max1)
{
	player15pog = '<strong>' + player15pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player15 + ' of ' + team2 + ' </strong>' + player15line;
}
if(player16pog == max1)
{
	player16pog = '<strong>' + player16pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player16 + ' of ' + team2 + ' </strong>' + player16line;
}
if(player17pog == max1)
{
	player17pog = '<strong>' + player17pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player17 + ' of ' + team2 + ' </strong>' + player17line;
}
if(player18pog == max1)
{
	player18pog = '<strong>' + player18pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player18 + ' of ' + team2 + ' </strong>' + player18line;
}
if(player19pog == max1)
{
	player19pog = '<strong>' + player19pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player19 + ' of ' + team2 + ' </strong>' + player19line;
}
if(player20pog == max1)
{
	player20pog = '<strong>' + player20pog + '</strong>';
	pogdisplay = pogdisplay + '<strong>' + player20 + ' of ' + team2 + ' </strong>' + player20line;
}

pogdisplay = pogdisplay + '</p></div>';


// ********************************************************************
// Insert Player of the Game
// ********************************************************************

var scan = document.evaluate(
	'//table[@width="100%"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var boxscore = scan.snapshotItem(3);

playerofgame = document.createElement('div');
playerofgame.innerHTML = pogdisplay;
boxscore.parentNode.insertBefore(playerofgame, boxscore.nextSibling);

var pogbutton = document.createElement('button');
pogbutton.innerHTML = '<input type="button" id="pogbutton">POG Scores</input>';
playerofgame.parentNode.insertBefore(pogbutton, playerofgame.nextSibling);
pogbutton.addEventListener('click', function()
{
	pogbutton.parentNode.removeChild(pogbutton);
	var pogtable = document.createElement('div');
	pogtable.innerHTML = '<div><table border="0" cellpadding="3" cellspacing="1" bgcolor="#000000">' +
			'<tr><td colspan="4" bgcolor="#000080" class="tableHeader2">Player of the Game Ratings</td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>' + team1 + '</strong></td>' +
				'<td width="50" bgcolor="#C6C6A8" class="loginBottomText"><strong>Rating</strong></td>' +
				'<td width="150" bgcolor="#C6C6A8" class="loginBottomText"><strong>' + team2 + '</strong></td>' +
				'<td width="50" bgcolor="#C6C6A8" class="loginBottomText"><strong>Rating</strong></td></tr>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player1 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player1pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player11 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player11pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player2 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player2pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player12 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player12pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player3 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player3pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player13 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player13pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player4 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player4pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player14 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player14pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player5 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player5pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player15 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player15pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player6 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player6pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player16 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player16pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player7 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player7pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player17 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player17pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player8 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player8pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player18 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player18pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player9 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player9pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player19 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player19pog + '</td>' +
			'<tr align="left"><td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player10 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player10pog + '</td>' +
				'<td width="150" bgcolor="#F1E7C5" class="loginBottomText">' + player20 + '</td>' +
				'<td bgcolor="#F1E7C5" class="loginBottomText">' + player20pog + '</td>' +
				'</tr></table></div>';
	playerofgame.parentNode.insertBefore(pogtable, playerofgame.nextSibling);
}, false);

// ********************************************************************
// Functions
// ********************************************************************

function makes(x)
{
	x = x.slice(0,x.indexOf(" ")) * 1;
	return x;
}

function attempts(x)
{
	x = x.slice(x.lastIndexOf(" ") + 1) * 1;
	return x;
}

function pograting(fgm, fga, threem, threea, ftm, fta, oreb, dreb, reb, ast, stl, blk, to, pts, dif, name)
{

	var pog = m_pts*pts + m_reb*reb + m_ast*ast + m_blk*blk + m_stl*stl - m_to*to - (fga-fgm)*m_missfg - (fta-ftm)*m_missft + dif*m_dif;
	pog = pog.toPrecision(3);
	
	if(name == '<i>Filler Player</i>')
	{
		pog = -10;
	}
	return pog;
}

function statline(fgm, fga, threem, threea, ftm, fta, oreb, dreb, reb, ast, stl, blk, to, pts, pog)
{
	var counter = 0;
	if(pts == 0)
	{
		var displaypts = "";
	}
	else
	{
		displaypts = pts + ' PTS';
		counter += 1;
	}
	if(reb == 0)
	{
		var displayreb = "";
	}
	else
	{
		displayreb = reb + ' REB';
		counter += 1;
	}
	if(ast == 0)
	{
		var displayast = "";
	}
	else
	{
		displayast = ast + ' AST';
		counter += 1;
	}
	if(stl == 0)
	{
		var displaystl = "";
	}
	else
	{
		displaystl = stl + ' STL';
		counter += 1;
	}
	if(blk == 0)
	{
		var displayblk = "";
	}
	else
	{
		displayblk = blk + ' BLK';
		counter += 1;
	}
	if(to == 0)
	{
		var displayto = '0 TO';
		counter += 1;
	}
	else
	{
		displayto = "";
	}

	var display = "";
	if(displaypts != "")
	{
		display = displaypts;
		if(displayreb != "")
		{
			display = display + ", " + displayreb;
			if(displayast != "")
			{
				display = display + ", " + displayast;
				if(displaystl != "")
				{
					display = display + ", " + displaystl;
					if(displayblk != "")
					{
						display = display + ", " + displayblk;
						if(displayto != "")
						{
							display = display + ", " + displayto;
						}
					}
					else if(displayto != "")
					{
						display = display + ", " + displayto;
					}
				}
				else if(displayblk != "")
				{
					display = display + ", " + displayblk;
					if(displayto != "")
					{
						display = display + ", " + displayto;
					}
				}
				else if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displaystl != "")
			{
				display = display + ", " + displaystl;
				if(displayblk != "")
				{
					display = display + ", " + displayblk;
					if(displayto != "")
					{
						display = display + ", " + displayto;
					}
				}
				else if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayblk != "")
			{
				display = displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayast != "")
		{
			display = display + ", " + displayast;
			if(displaystl != "")
			{
				display = display + ", " + displaystl;
				if(displayblk != "")
				{
					display = display + ", " + displayblk;
					if(displayto != "")
					{
						display = display + ", " + displayto;
					}
				}
				else if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayblk != "")
			{
				display = display + ", " + displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displaystl != "")
		{
			display = display + ", " + displaystl;
			if(displayblk != "")
			{
				display = display + ", " + displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayblk != "")
		{
			display = displayblk;
			if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayto != "")
		{
			display = display + ", " + displayto;
		}
	}
//-------------------------------------------------------------
	else if(displayreb != "")
	{
		display = displayreb;
		if(displayast != "")
		{
			display = display + ", " + displayast;
			if(displaystl != "")
			{
				display = display + ", " + displaystl;
				if(displayblk != "")
				{
					display = display + ", " + displayblk;
					if(displayto != "")
					{
						display = display + ", " + displayto;
					}
				}
				else if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayblk != "")
			{
				display = display + ", " + displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displaystl != "")
		{
			display = display + ", " + displaystl;
			if(displayblk != "")
			{
				display = display + ", " + displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayblk != "")
		{
			display = displayblk;
			if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayto != "")
		{
			display = display + ", " + displayto;
		}
	}
	else if(displayast != "")
	{
		display = displayast;
		if(displaystl != "")
		{
			display = display + ", " + displaystl;
			if(displayblk != "")
			{
				display = display + ", " + displayblk;
				if(displayto != "")
				{
					display = display + ", " + displayto;
				}
			}
			else if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayblk != "")
		{
			display = display + ", " + displayblk;
			if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayto != "")
		{
			display = display + ", " + displayto;
		}
	}
	else if(displaystl != "")
	{
		display = displaystl;
		if(displayblk != "")
		{
			display = display + ", " + displayblk;
			if(displayto != "")
			{
				display = display + ", " + displayto;
			}
		}
		else if(displayto != "")
		{
			display = display + ", " + displayto;
		}
	}
	else if(displayblk != "")
	{
		display = displayblk;
		if(displayto != "")
		{
			display = display + ", " + displayto;
		}
	}
	else if(displayto != "")
	{
		display = displayto;
	}

	display = display; //+", " + pog + " POG";
	var x = ' (' + display + ')';
	return x;
}