// ==UserScript==
// @name           GLB Offensive Plays
// @namespace      rockitsauce
// @description    You should not be installling this script
// ==/UserScript==

var plays = {
	'Inside HB': [	
		{ 'name': 'HB Blast (I)', 'image': '1.gif', 'data': ['inside_run','I','','','','','','HB','left','RB','FB','TE']  },
		{ 'name': 'HB Slam (I)', 'image': '43.gif', 'data': ['inside_run','I','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'Weak I HB Slam (Weak I)', 'image': '83.gif', 'data': ['inside_run','I Weak','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Dive Strong (Weak I)', 'image': '165.gif', 'data': ['inside_run','I Weak','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Dive Weak (Strong I)', 'image': '107.gif', 'data': ['inside_run','I Strong','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Slam (Strong I)', 'image': '108.gif', 'data': ['inside_run','I Strong','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Blast (Pro Set)', 'image': '152.gif', 'data': ['inside_run','Splitbacks Pro','','','','','','HB','','RB','FB','TE'] },
		{ 'name': 'HB Slam (Single Back)', 'image': '135.gif', 'data': ['inside_run','Singleback Left','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Slam Weak (Single Back)', 'image': '136.gif', 'data': ['inside_run','Singleback Left','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Draw (Shotgun)', 'image': '85.gif', 'data': ['inside_run','Shotgun','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Dive (Shotgun)', 'image': '152.gif', 'data': ['inside_run','Shotgun','','','','','','HB','left','RB','FB','TE'] }
	],
	'Outside HB': [
		{ 'name': 'I Pitch Weak (I)', 'image': '14.gif', 'data': ['outside_run_pitch','I','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Sweep Strong (I)', 'image': '51.gif', 'data': ['outside_run_pitch','I','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'Weak Side Handoff (I)', 'image': '93.gif', 'data': ['outside_run_off_tackle','I','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'Off Tackle (I)', 'image': '92.gif', 'data': ['outside_run_off_tackle','I','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Sweep Weak (Weak I)', 'image': '166.gif', 'data': ['outside_run_pitch','I Weak','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'Power Toss (Weak I)', 'image': '50.gif', 'data': ['outside_run_pitch','I Weak','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Outside Weak (Strong I)', 'image': '113.gif', 'data': ['outside_run_off_tackle','I Strong','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Off Tackle (Strong I)', 'image': '52.gif', 'data': ['outside_run_off_tackle','I Strong','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'Pitch Weak (Strong I)', 'image': '118.gif', 'data': ['outside_run_pitch','I Strong','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Sweep Strong (Strong I)', 'image': '119.gif', 'data': ['outside_run_pitch','I Strong','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Sweep (Pro Set)', 'image': '153.gif', 'data': ['outside_run_pitch','Splitbacks Pro','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Off Tackle (Pro Set)', 'image': '151.gif', 'data': ['outside_run_off_tackle','Splitbacks Pro','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Pitch (Single Back)', 'image': '42.gif', 'data': ['outside_run_pitch','Singleback Left','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Pitch Strong (Single Back)', 'image': '142.gif', 'data': ['outside_run_pitch','Singleback Left','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'Weakside Handoff (Single Back)', 'image': '137.gif', 'data': ['outside_run_off_tackle','Singleback Left','','','','','','HB','left','RB','FB','TE'] },
		{ 'name': 'HB Outside Handoff (Single Back)', 'image': '138.gif', 'data': ['outside_run_off_tackle','Singleback Left','','','','','','HB','right','RB','FB','TE'] },
		{ 'name': 'HB Handoff (Shotgun)', 'image': '86.gif', 'data': ['outside_run_off_tackle','Shotgun','','','','','','HB','left','RB','FB','TE'] }
	],
	'Inside FB': [
		{ 'name': 'FB Dive (I)', 'image': '47.gif', 'data': ['inside_run','I','','','','','','FB','left','RB','FB','TE'] },
		{ 'name': 'FB Dive Strong (I)', 'image': '48.gif', 'data': ['inside_run','I','','','','','','FB','right','RB','FB','TE'] },
		{ 'name': 'FB Weakside Slam (Strong I)', 'image': '109.gif', 'data': ['inside_run','I Strong','','','','','','FB','left','RB','FB','TE'] },
		{ 'name': 'FB Slam (Strong I)', 'image': '110.gif', 'data': ['inside_run','I Strong','','','','','','FB','right','RB','FB','TE'] },
		{ 'name': 'FB Belly (Pro Set)', 'image': '44.gif', 'data': ['inside_run','Splitbacks Pro','','','','','','FB','','RB','FB','TE'] }
	],
	'Outside FB': [
		{ 'name': 'FB Pitch Weak (I)', 'image': '99.gif', 'data': ['outside_run_pitch','I','','','','','','FB','left','HB','FB','TE'] },
		{ 'name': 'FB Pitch Sweep (I)', 'image': '98.gif', 'data': ['outside_run_pitch','I','','','','','','FB','right','HB','FB','TE'] },
		{ 'name': 'FB Outside Weak (I)', 'image': '95.gif', 'data': ['outside_run_off_tackle','I','','','','','','FB','left','HB','FB','TE'] },
		{ 'name': 'FB Outside (I)', 'image': '94.gif', 'data': ['outside_run_off_tackle','I','','','','','','FB,right','HB','FB','TE'] },
		{ 'name': 'FB Weak Across (Strong I)', 'image': '114.gif', 'data': ['outside_run_off_tackle','I Strong','','','','','','FB','left','HB','FB','TE'] },
		{ 'name': 'FB Off Tackle (Strong I)', 'image': '115.gif', 'data': ['outside_run_off_tackle','I Strong','','','','','','FB','right','HB','FB','TE'] },
		{ 'name': 'FB Sweep Weak (Pro Set)', 'image': '154.gif', 'data': ['outside_run_off_tackle','Splitbacks Pro','','','','','','FB','left','HB','FB','TE'] }
	],
	'Inside QB': [
		{ 'name': 'QB Sneak Left (I)', 'image': '90.gif', 'data': ['inside_run','I','','','','','','QB','left','RB','FB','TE'] },
		{ 'name': 'QB Sneak Right (I)', 'image': '91.gif', 'data': ['inside_run','I','','','','','','QB','right','RB','FB','TE'] },
		{ 'name': 'QB Draw Left (Strong I)', 'image': '111.gif', 'data': ['inside_run','I Strong','','','','','','QB','left','RB','FB','TE'] },
		{ 'name': 'QB Draw Right (Strong I)', 'image': '112.gif', 'data': ['inside_run','I Strong','','','','','','QB','right','RB','FB','TE'] },
		{ 'name': 'QB Draw (Shotgun)', 'image': '49.gif', 'data': ['inside_run','Shotgun','','','','','','QB','','RB','FB','TE'] },
		{ 'name': 'QB Draw (Shotgun 5WR)', 'image': '144.gif', 'data': ['inside_run','Shotgun 5WR','','','','','','QB','','RB','FB','TE'] }
	],
	'Outside QB': [
		{ 'name': 'QB Rollout Rush (I)', 'image': '96.gif', 'data': ['run','I','','','','','','QB','right','HB','FB','TE'] },
		{ 'name': 'QB Rollout Weak (I)', 'image': '97.gif', 'data': ['run','I','','','','','','QB','left','HB','FB','TE'] },
		{ 'name': 'QB Rollout Rush (Strong I)', 'image': '116.gif', 'data': ['run','I Strong','','','','','','QB','right','HB','FB','TE'] },
		{ 'name': 'QB Rollout Weak (Strong I)', 'image': '117.gif', 'data': ['run','I Strong','','','','','','QB','left','HB','FB','TE'] },
		{ 'name': 'QB Rollout Rush Strong (Single Back)', 'image': '139.gif', 'data': ['run','Singleback Left','','','','','','QB','right','HB','FB','TE'] },
		{ 'name': 'QB Rollout Rush Weak (Single Back)', 'image': '140.gif', 'data': ['run','Singleback Left','','','','','','QB','left','HB','FB','TE'] },
		{ 'name': 'QB Rollout Rush Strong (Shotgun 5WR)', 'image': '145.gif', 'data': ['run','Shotgun 5WR','','','','','','QB','right','HB','FB','TE'] },
		{ 'name': 'QB Rollout Rush Weak (Shotgun 5WR)', 'image': '146.gif', 'data': ['run','Shotgun 5WR','','','','','','QB','left','HB','FB','TE'] }
	],
	'Short WR': [
		{ 'name': 'FL Hitch (I)', 'image': '23.gif', 'data': ['pass','I','short','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Weak I WR Drag (Weak I)', 'image': '82.gif', 'data': ['pass','I Weak','short','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Quick Hooks (Strong I)', 'image': '22.gif', 'data': ['pass','I Strong','short','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Curls (Pro Set)', 'image': '24.gif', 'data': ['pass','Splitbacks Pro','short','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Z Spot (Single Back)', 'image': '128.gif', 'data': ['pass','Singleback Left','short','WR','0','1','','','','HB','FB','TE'] },
		{ 'name': 'WR Screen (Single Back)', 'image': '134.gif', 'data': ['pass','Singleback Left','short','WR','0','1','','','','HB','FB','TE'] },
		{ 'name': 'Flanker Drag (Single Back)', 'image': '129.gif', 'data': ['pass','Singleback Left','short','WR','0','0','0','','','HB','FB','TE'] },
		{ 'name': 'Quick In (Shotgun)', 'image': '16.gif', 'data': ['pass','Shotgun','short','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Quick Slants (Shotgun 5WR)', 'image': '143.gif', 'data': ['pass','Shotgun 5WR','short','WR','','','','','','HB','FB','TE'] }
	],
	'Short TE': [
		{ 'name': 'TE Quick Hit (I)', 'image': '21.gif', 'data': ['pass','I','short','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Sideline (Weak I)', 'image': '89.gif', 'data': ['pass','I Weak','short','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Short Out (Strong I)', 'image': '122.gif', 'data': ['pass','I Strong','short','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Drag Short (Pro Set)', 'image': '169.gif', 'data': ['pass','Splitbacks Pro','short','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Shallow Cross (Single Back)', 'image': '131.gif', 'data': ['pass','Singleback Left','short','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Drag (Shotgun)', 'image': '17.gif', 'data': ['pass','Shotgun','short','TE','','','','','','HB','FB','TE'] }
	],
	'Short HB': [
		{ 'name': 'FB Cross Screen (Weak I)', 'image': '84.gif', 'data': ['pass','I Weak','short','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'HB Screen Right (Strong I)', 'image': '123.gif', 'data': ['pass','I Strong','short','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'HB Out (Pro Set)', 'image': '148.gif', 'data': ['pass','Splitbacks Pro','short','HB','0','0','1','','','HB','FB','TE'] },
		{ 'name': 'HB Screen Strong (Pro Set)', 'image': '168.gif', 'data': ['pass','Splitbacks Pro','short','HB','1','0','1','','','HB','FB','TE'] },
		{ 'name': 'HB Screen (Single Back)', 'image': '132.gif', 'data': ['pass','Singleback Left','short','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'HB Flat (Shotgun)', 'image': '75.gif', 'data': ['pass','Shotgun','short','HB','1','0','','','','HB','FB','TE'] },
		{ 'name': 'HB Screen (Shotgun)', 'image': '167.gif', 'data': ['pass','Shotgun','short','HB','1','0','','','','HB','FB','TE'] }
	],
	'Short FB': [
		{ 'name': 'Flares (I)', 'image': '19.gif', 'data': ['pass','I','short','FB','','','','','','HB','FB','TE'] },
		{ 'name': 'FB Flare (Strong I)', 'image': '124.gif', 'data': ['pass','I Strong','short','FB','','','','','','HB','FB','TE'] },
		{ 'name': 'FB Texas (Pro Set)', 'image': '149.gif', 'data': ['pass','Splitbacks Pro','short','FB','','','','','','HB','FB','TE'] }
	],
	'Medium WR': [
		{ 'name': 'Pump N Go (I)', 'image': '70.gif', 'data': ['pass','I','medium','WR','0','0','1','','','HB','FB','TE'] },
		{ 'name': 'Hook Outs (I)', 'image': '73.gif', 'data': ['pass','I','medium','WR','0','0','1','','','HB','FB','TE'] },
		{ 'name': 'WR In (Weak I)', 'image': '156.gif', 'data': ['pass','I Weak','medium','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Cross Up (Strong I)', 'image': '87.gif', 'data': ['pass','I Strong','medium','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'SS Pressure (Pro Set)', 'image': '150.gif', 'data': ['pass','Splitbacks Pro','medium','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Curls Left (Single Back)', 'image': '68.gif', 'data': ['pass','Singleback Left','medium','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Double Slant (Shotgun)', 'image': '34.gif', 'data': ['pass','Shotgun','medium','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'WR In (Shotgun 5WR)', 'image': '147.gif', 'data': ['pass','Shotgun 5WR','medium','WR','','','','','','HB','FB','TE'] }
	],
	'Medium TE': [
		{ 'name': 'TE Slant (I)', 'image': '69.gif', 'data': ['pass','I','medium','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Out (Strong I)', 'image': '71.gif', 'data': ['pass','I Strong','medium','TE','','','','','','HB','FB','TE','Goal Line Offense'] },
		{ 'name': 'TE Sail (Pro Set)', 'image': '155.gif', 'data': ['pass','Splitbacks Pro','medium','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Post (Single Back)', 'image': '130.gif', 'data': ['pass','Singleback Left','medium','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'In N Out (Shotgun)', 'image': '72.gif', 'data': ['pass','Shotgun','medium','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'Corner Threat (Shotgun)', 'image': '33.gif', 'data': ['pass','Shotgun','medium','TE','','','','','','HB','FB','TE'] }
	],
	'Medium HB': [
		{ 'name': 'Double Wheel (I)', 'image': '101.gif', 'data': ['pass','I','medium','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'HB Wheel (Single Back)', 'image': '133.gif', 'data': ['pass','Singleback Left','medium','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'Strong Flood (Shotgun)', 'image': '125.gif', 'data': ['pass','Shotgun','medium','HB','','','','','','HB','FB','TE'] }
	],
	'Medium FB': [
		{ 'name': 'FB Out (I)', 'image': '102.gif', 'data': ['pass','I','medium','FB','','','','','','HB','FB','TE'] },
	],
	'Long WR': [
		{ 'name': 'Deep Posts (I)', 'image': '103.gif', 'data': ['pass','I','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Streaks (Weak I)', 'image': '157.gif', 'data': ['pass','I Weak','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'WR Skinny Post (Strong I)', 'image': '163.gif', 'data': ['pass','I Strong','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Post Corner (Pro Set)', 'image': '66.gif', 'data': ['pass','Splitbacks Pro','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Cross Up (Single Back)', 'image': '67.gif', 'data': ['pass','Singleback Left','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Overload (Single Back)', 'image': '74.gif', 'data': ['pass','Singleback Left','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': 'Deep Corner (Shotgun)', 'image': '54.gif', 'data': ['pass','Shotgun','long','WR','0','1','0','','','HB','FB','TE'] },
		{ 'name': 'Slot In N Up (Shotgun)', 'image': '65.gif', 'data': ['pass','Shotgun','long','WR','0','0','0','','','HB','FB','TE'] },
		{ 'name': 'WR Post Corner (Shotgun 5WR)', 'image': '35.gif', 'data': ['pass','Shotgun 5WR','long','WR','','','','','','HB','FB','TE'] },
		{ 'name': '5 Wide Streaks (Shotgun 5WR)', 'image': '88.gif', 'data': ['pass','Shotgun 5WR','long','WR','','','','','','HB','FB','TE'] }
	],
	'Long TE': [
		{ 'name': 'TE Deep Curl (I)', 'image': '104.gif', 'data': ['pass','I','long','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Drive (Single Back)', 'image': '141.gif', 'data': ['pass','Singleback Left','long','TE','','','','','','HB','FB','TE'] },
		{ 'name': 'TE Drive (Shotgun)', 'image': '160.gif', 'data': ['pass','Shotgun','long','TE','','','','','','HB','FB','TE'] }
	],
	'Long HB': [
		{ 'name': 'HB Streak (I)', 'image': '105.gif', 'data': ['pass','I','long','HB','','','','','','HB','FB','TE'] },
		{ 'name': 'HB Fly (Shotgun)', 'image': '53.gif', 'data': ['pass','Shotgun','long','HB','','','','','','HB','FB','TE'] }
	],
	'Long FB': [
		{ 'name': 'FB Streak (I)', 'image': '106.gif', 'data': ['pass','I','long','FB','','','','','','HB','FB','TE'] },
		{ 'name': 'FB Streak (Weak I)', 'image': '158.gif', 'data': ['pass','I Weak','long','FB','','','','','','HB','FB','TE'] },
		{ 'name': 'FB Streak (Strong I)', 'image': '159.gif', 'data': ['pass','I Strong','long','FB','','','','','','HB','FB','TE'] }
	]
};