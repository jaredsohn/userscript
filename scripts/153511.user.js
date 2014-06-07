// ==UserScript==
// @name          trac - estimation points from 1 to 48
// @author        Jakub Zakrzewski
// @namespace     http://interwies.pl
// @description   trac - estimation points from 1 to 48
// @include       /^https?://sselab\.tld/.*$/
// @include       https://www.sselab.tld/*
// @include       /^https?://sselab\.de/.*$/
// @include       /^https?://www.sselab\.de/.*$/
//  @version  0.1
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
//  Notes:
//    * is a wildcard character
//    .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
// etc.)


if (window.top != window.self)  //-- Don't run on frames or iframes.
	return;


jQuery.noConflict();
var start;
start = (function () {
		return {
			run : function (){
				try{
					jQuery("#field-estimation").empty();
					jQuery("#field-estimation").append('<option value=1>1</option>');
					jQuery("#field-estimation").append('<option value=2>2</option>');
					jQuery("#field-estimation").append('<option value=3>3</option>');
					jQuery("#field-estimation").append('<option value=4>4</option>');
					jQuery("#field-estimation").append('<option value=5>5</option>');
					jQuery("#field-estimation").append('<option value=6>6</option>');
					jQuery("#field-estimation").append('<option value=7>7</option>');
					jQuery("#field-estimation").append('<option value=8>8</option>');
					jQuery("#field-estimation").append('<option value=9>9</option>');
					jQuery("#field-estimation").append('<option value=10>10</option>');
					jQuery("#field-estimation").append('<option value=11>11</option>');
					jQuery("#field-estimation").append('<option value=12>12</option>');
					jQuery("#field-estimation").append('<option value=13>13</option>');
					jQuery("#field-estimation").append('<option value=14>14</option>');
					jQuery("#field-estimation").append('<option value=15>15</option>');
					jQuery("#field-estimation").append('<option value=16>16</option>');
					jQuery("#field-estimation").append('<option value=17>17</option>');
					jQuery("#field-estimation").append('<option value=18>18</option>');
					jQuery("#field-estimation").append('<option value=19>19</option>');
					jQuery("#field-estimation").append('<option value=20>20</option>');
					jQuery("#field-estimation").append('<option value=21>21</option>');
					jQuery("#field-estimation").append('<option value=22>22</option>');
					jQuery("#field-estimation").append('<option value=23>23</option>');
					jQuery("#field-estimation").append('<option value=24>24</option>');
					jQuery("#field-estimation").append('<option value=25>25</option>');
					jQuery("#field-estimation").append('<option value=26>26</option>');
					jQuery("#field-estimation").append('<option value=27>27</option>');
					jQuery("#field-estimation").append('<option value=28>28</option>');
					jQuery("#field-estimation").append('<option value=29>29</option>');
					jQuery("#field-estimation").append('<option value=30>30</option>');
					jQuery("#field-estimation").append('<option value=31>31</option>');
					jQuery("#field-estimation").append('<option value=32>32</option>');
					jQuery("#field-estimation").append('<option value=33>33</option>');
					jQuery("#field-estimation").append('<option value=34>34</option>');
					jQuery("#field-estimation").append('<option value=35>35</option>');
					jQuery("#field-estimation").append('<option value=36>36</option>');
					jQuery("#field-estimation").append('<option value=37>37</option>');
					jQuery("#field-estimation").append('<option value=38>38</option>');
					jQuery("#field-estimation").append('<option value=39>39</option>');
					jQuery("#field-estimation").append('<option value=40>40</option>');
					jQuery("#field-estimation").append('<option value=41>41</option>');
					jQuery("#field-estimation").append('<option value=42>42</option>');
					jQuery("#field-estimation").append('<option value=43>43</option>');
					jQuery("#field-estimation").append('<option value=44>44</option>');
					jQuery("#field-estimation").append('<option value=45>45</option>');
					jQuery("#field-estimation").append('<option value=46>46</option>');
					jQuery("#field-estimation").append('<option value=47>47</option>');
					jQuery("#field-estimation").append('<option value=48>48</option>');
				}
				finally{
					//	window.setTimeout(start, 1000, true);  
				}
			}
		}
}());

start.run();

