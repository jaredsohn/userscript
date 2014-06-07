// ==UserScript==
// @name           Helgon.net archive and diff
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Persists all read diary posts at helgon.net in Google Gears (required) and shows diffs when you read an updated version.
// @include        http://www.helgon.net/diary/read.asp*
// @include        http://www.helgon.net/Diary/read.asp*
// @include        http://www.helgon.net/Diary/Read.asp*
// @include        http://www.helgon.net/diary/Read.asp*
// ==/UserScript==

var xpath = {
  diary: {
    title: '//td[@class="subline" and not(a)]',
     date: 'following::td[starts-with(.,"Daterat:")]', // relative to title
     post: 'following::tr[@class="text1"]/td' // relative to date
  }
};

try {
  var google = { gears: { factory: new unsafeWindow.GearsFactory } };
  var db = google.gears.factory.create("beta.database", "1.0");
} catch(e) {
  console.error("Requires Google Gears! Error: "+ e);
  return;
}

function $X(xpath, root) {
  var got = $x(xpath, root);
  return got instanceof Array ? got[0] : got;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x(xpath, root, type) {
  var doc = document, result = [], got, next;
  if (root)
    doc = root.evaluate ? root : root.ownerDocument;
  got = doc.evaluate( xpath, root||doc, null, type, null );
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}


/**
 * Diff by Neil Fraser (LGPL), Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 */

var Diff = (function() {

function Diff() {
  // Number of seconds to map a diff before giving up.  (0 for infinity)
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // The size beyond which the double-ended diff activates.
  // Double-ending is twice as fast, but less accurate.
  this.Diff_DualThreshold = 32;
}

//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {String} text1 Old string to be diffed
 * @param {String} text2 New string to be diffed
 * @param {Boolean} opt_checklines Optional speedup flag.  If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff
 * @return {Array} Array of diff tuples
 */
Diff.prototype.diff_main = function(text1, text2, opt_checklines) {
  // Check for equality (speedup)
  if (text1 == text2) {
    return [[DIFF_EQUAL, text1]];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup)
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup)
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block
  var diffs = this.diff_compute(text1, text2, checklines);

  // Restore the prefix and suffix
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.
 * @param {String} text1 Old string to be diffed
 * @param {String} text2 New string to be diffed
 * @param {Boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff
 * @return {Array} Array of diff tuples
 */
Diff.prototype.diff_compute = function(text1, text2, checklines) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup)
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup)
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup)
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }
  longtext = shorttext = null;  // Garbage collect

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  // Perform a real diff.
  if (checklines && text1.length + text2.length < 250) {
    // Too trivial for the overhead.
    checklines = false;
  }
  var linearray;
  if (checklines) {
    // Scan the text on a line-by-line basis first.
    var a = this.diff_linesToChars(text1, text2);
    text1 = a[0];
    text2 = a[1];
    linearray = a[2];
  }
  diffs = this.diff_map(text1, text2);
  if (!diffs) {
    // No acceptable result.
    diffs = [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }
  if (checklines) {
    // Convert the diff back to original text.
    this.diff_charsToLines(diffs, linearray);
    // Eliminate freak matches (e.g. blank lines)
    this.diff_cleanupSemantic(diffs);

    // Rediff any replacement blocks, this time character-by-character.
    // Add a dummy entry at the end.
    diffs.push([DIFF_EQUAL, '']);
    var pointer = 0;
    var count_delete = 0;
    var count_insert = 0;
    var text_delete = '';
    var text_insert = '';
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          var a = this.diff_main(text_delete, text_insert, false);
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
      }
     pointer++;
    }
    diffs.pop();  // Remove the dummy entry at the end.
  }
  return diffs;
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {String} text1 First string
 * @param {String} text2 Second string
 * @return {Array} Three element Array, containing the encoded text1,
 *     the encoded text2 and the array of unique strings.  The zeroth element
 *     of the array of unique strings is intentionally blank.
 */
Diff.prototype.diff_linesToChars = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {String} text String to encode
   * @return {String} Encoded string
   */
  function diff_linesToCharsMunge(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = 0;
    // Keeping our own length variable is faster then looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge(text1);
  var chars2 = diff_linesToCharsMunge(text2);
  return [chars1, chars2, lineArray];
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {Array} diffs Array of diff tuples
 * @param {Array} lineArray Array of unique strings
 */
Diff.prototype.diff_charsToLines = function(diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};


/**
 * Explore the intersection points between the two texts.
 * @param {String} text1 Old string to be diffed
 * @param {String} text2 New string to be diffed
 * @return {Array | Null} Array of diff tuples or null if no diff available
 */
Diff.prototype.diff_map = function(text1, text2) {
  // Don't run for too long.
  var ms_end = (new Date()).getTime() + this.Diff_Timeout * 1000;
  var max_d = text1.length + text2.length - 1;
  var doubleEnd = this.Diff_DualThreshold * 2 < max_d;
  var v_map1 = [];
  var v_map2 = [];
  var v1 = {};
  var v2 = {};
  v1[1] = 0;
  v2[1] = 0;
  var x, y;
  var footstep;  // Used to track overlapping paths.
  var footsteps = {};
  var done = false;
  // Safari 1.x doesn't have hasOwnProperty
  var hasOwnProperty = !!(footsteps.hasOwnProperty);
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (text1.length + text2.length) % 2;
  for (var d = 0; d < max_d; d++) {
    // Bail out if timeout reached.
    if (this.Diff_Timeout > 0 && (new Date()).getTime() > ms_end) {
      return null;
    }

    // Walk the front path one step.
    v_map1[d] = {};
    for (var k = -d; k <= d; k += 2) {
      if (k == -d || k != d && v1[k - 1] < v1[k + 1]) {
        x = v1[k + 1];
      } else {
        x = v1[k - 1] + 1;
      }
      y = x - k;
      if (doubleEnd) {
        footstep = x + ',' + y;
        if (front && (hasOwnProperty ? footsteps.hasOwnProperty(footstep) :
                      (footsteps[footstep] !== undefined))) {
          done = true;
        }
        if (!front) {
          footsteps[footstep] = d;
        }
      }
      while (!done && x < text1.length && y < text2.length &&
             text1.charAt(x) == text2.charAt(y)) {
        x++;
        y++;
        if (doubleEnd) {
          footstep = x + ',' + y;
          if (front && (hasOwnProperty ? footsteps.hasOwnProperty(footstep) :
              (footsteps[footstep] !== undefined))) {
            done = true;
          }
          if (!front) {
            footsteps[footstep] = d;
          }
        }
      }
      v1[k] = x;
      v_map1[d][x + ',' + y] = true;
      if (x == text1.length && y == text2.length) {
        // Reached the end in single-path mode.
        return this.diff_path1(v_map1, text1, text2);
      } else if (done) {
        // Front path ran over reverse path.
        v_map2 = v_map2.slice(0, footsteps[footstep] + 1);
        var a = this.diff_path1(v_map1, text1.substring(0, x),
                                text2.substring(0, y));
        return a.concat(this.diff_path2(v_map2, text1.substring(x),
                                        text2.substring(y)));
      }
    }

    if (doubleEnd) {
      // Walk the reverse path one step.
      v_map2[d] = {};
      for (var k = -d; k <= d; k += 2) {
        if (k == -d || k != d && v2[k - 1] < v2[k + 1]) {
          x = v2[k + 1];
        } else {
          x = v2[k - 1] + 1;
        }
        y = x - k;
        footstep = (text1.length - x) + ',' + (text2.length - y);
        if (!front && (hasOwnProperty ? footsteps.hasOwnProperty(footstep) :
                       (footsteps[footstep] !== undefined))) {
          done = true;
        }
        if (front) {
          footsteps[footstep] = d;
        }
        while (!done && x < text1.length && y < text2.length &&
               text1.charAt(text1.length - x - 1) ==
               text2.charAt(text2.length - y - 1)) {
          x++;
          y++;
          footstep = (text1.length - x) + ',' + (text2.length - y);
          if (!front && (hasOwnProperty ? footsteps.hasOwnProperty(footstep) :
                         (footsteps[footstep] !== undefined))) {
            done = true;
          }
          if (front) {
            footsteps[footstep] = d;
          }
        }
        v2[k] = x;
        v_map2[d][x + ',' + y] = true;
        if (done) {
          // Reverse path ran over front path.
          v_map1 = v_map1.slice(0, footsteps[footstep] + 1);
          var a = this.diff_path1(v_map1, text1.substring(0, text1.length - x),
                                  text2.substring(0, text2.length - y));
          return a.concat(this.diff_path2(v_map2,
                          text1.substring(text1.length - x),
                          text2.substring(text2.length - y)));
        }
      }
    }
  }
  // Number of diffs equals number of characters, no commonality at all.
  return null;
};


/**
 * Work from the middle back to the start to determine the path.
 * @param {Array} v_map Array of paths.
 * @param {String} text1 Old string fragment to be diffed
 * @param {String} text2 New string fragment to be diffed
 * @return {Array} Array of diff tuples
 */
Diff.prototype.diff_path1 = function(v_map, text1, text2) {
  var path = [];
  var x = text1.length;
  var y = text2.length;
  var last_op = null;
  for (var d = v_map.length - 2; d >= 0; d--) {
    while (1) {
      if (v_map[d].hasOwnProperty ? v_map[d].hasOwnProperty((x - 1) + ',' + y) :
          (v_map[d][(x - 1) + ',' + y] !== undefined)) {
        x--;
        if (last_op === DIFF_DELETE) {
          path[0][1] = text1.charAt(x) + path[0][1];
        } else {
          path.unshift([DIFF_DELETE, text1.charAt(x)]);
        }
        last_op = DIFF_DELETE;
        break;
      } else if (v_map[d].hasOwnProperty ?
                 v_map[d].hasOwnProperty(x + ',' + (y - 1)) :
                 (v_map[d][x + ',' + (y - 1)] !== undefined)) {
        y--;
        if (last_op === DIFF_INSERT) {
          path[0][1] = text2.charAt(y) + path[0][1];
        } else {
          path.unshift([DIFF_INSERT, text2.charAt(y)]);
        }
        last_op = DIFF_INSERT;
        break;
      } else {
        x--;
        y--;
        //if (text1.charAt(x) != text2.charAt(y)) {
        //  throw new Error('No diagonal.  Can\'t happen. (diff_path1)');
        //}
        if (last_op === DIFF_EQUAL) {
          path[0][1] = text1.charAt(x) + path[0][1];
        } else {
          path.unshift([DIFF_EQUAL, text1.charAt(x)]);
        }
        last_op = DIFF_EQUAL;
      }
    }
  }
  return path;
};


/**
 * Work from the middle back to the end to determine the path.
 * @param {Array} v_map Array of paths.
 * @param {String} text1 Old string fragment to be diffed
 * @param {String} text2 New string fragment to be diffed
 * @return {Array} Array of diff tuples
 */
Diff.prototype.diff_path2 = function(v_map, text1, text2) {
  var path = [];
  var pathLength = 0;
  var x = text1.length;
  var y = text2.length;
  var last_op = null;
  for (var d = v_map.length - 2; d >= 0; d--) {
    while (1) {
      if (v_map[d].hasOwnProperty ? v_map[d].hasOwnProperty((x - 1) + ',' + y) :
          (v_map[d][(x - 1) + ',' + y] !== undefined)) {
        x--;
        if (last_op === DIFF_DELETE) {
          path[pathLength - 1][1] += text1.charAt(text1.length - x - 1);
        } else {
          path[pathLength++] = [DIFF_DELETE, text1.charAt(text1.length - x - 1)];
        }
        last_op = DIFF_DELETE;
        break;
      } else if (v_map[d].hasOwnProperty ?
                 v_map[d].hasOwnProperty(x + ',' + (y - 1)) :
                 (v_map[d][x + ',' + (y - 1)] !== undefined)) {
        y--;
        if (last_op === DIFF_INSERT) {
          path[pathLength - 1][1] += text2.charAt(text2.length - y - 1);
        } else {
          path[pathLength++] = [DIFF_INSERT, text2.charAt(text2.length - y - 1)];
        }
        last_op = DIFF_INSERT;
        break;
      } else {
        x--;
        y--;
        //if (text1.charAt(text1.length - x - 1) !=
        //    text2.charAt(text2.length - y - 1)) {
        //  throw new Error('No diagonal.  Can\'t happen. (diff_path2)');
        //}
        if (last_op === DIFF_EQUAL) {
          path[pathLength - 1][1] += text1.charAt(text1.length - x - 1);
        } else {
          path[pathLength++] = [DIFF_EQUAL, text1.charAt(text1.length - x - 1)];
        }
        last_op = DIFF_EQUAL;
      }
    }
  }
  return path;
};


/**
 * Determine the common prefix of two strings
 * @param {String} text1 First string
 * @param {String} text2 Second string
 * @return {Number} The number of characters common to the start of each
 *     string.
 */
Diff.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charCodeAt(0) !== text2.charCodeAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings
 * @param {String} text1 First string
 * @param {String} text2 Second string
 * @return {Number} The number of characters common to the end of each string.
 */
Diff.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charCodeAt(text1.length - 1) !==
                          text2.charCodeAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * @param {String} text1 First string
 * @param {String} text2 Second string
 * @return {Array} Five element Array, containing the prefix of text1, the
 *     suffix of text1, the prefix of text2, the suffix of text2 and the
 *     common middle.  Or null if there was no match.
 */
Diff.prototype.diff_halfMatch = function(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 10 || shorttext.length < 1) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {String} longtext Longer string
   * @param {String} shorttext Shorter string
   * @param {Number} i Start index of quarter length substring within longtext
   * @return {Array|Null} Five element Array, containing the prefix of longtext,
   *     the suffix of longtext, the prefix of shorttext, the suffix of
   *     shorttext and the common middle.  Or null if there was no match.
   */
  function diff_halfMatchI(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                     shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                     shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length >= longtext.length / 2) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {Array} diffs Array of diff tuples
 */
Diff.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  var lastequality = null;  // Always equal to equalities[equalitiesLength-1][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_changes1 = 0;
  // Number of characters that changed after the equality.
  var length_changes2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // equality found
      equalities[equalitiesLength++] = pointer;
      length_changes1 = length_changes2;
      length_changes2 = 0;
      lastequality = diffs[pointer][1];
    } else {  // an insertion or deletion
      length_changes2 += diffs[pointer][1].length;
      if (lastequality !== null && (lastequality.length <= length_changes1) &&
          (lastequality.length <= length_changes2)) {
        // Duplicate record
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength ? equalities[equalitiesLength - 1] : -1;
        length_changes1 = 0;  // Reset the counters.
        length_changes2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {Array} diffs Array of diff tuples
 */
Diff.prototype.diff_cleanupSemanticLossless = function(diffs) {
  /**
   * Given three strings, compute a score representing whether the two internal
   * boundaries fall on word boundaries.
   * Closure, but does not reference any external variables.
   * @param {String} one First string
   * @param {String} two Second string
   * @param {String} three Third string
   * @return {Number} The score.
   */
  function diff_cleanupSemanticScore(one, two, three) {
    var whitespace = /\s/;
    var score = 0;
    if (one.charAt(one.length - 1).match(whitespace) ||
        two.charAt(0).match(whitespace)) {
      score++;
    }
    if (two.charAt(two.length - 1).match(whitespace) ||
        three.charAt(0).match(whitespace)) {
      score++;
    }
    return score;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore(equality1, edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore(equality1, edit, equality2);
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        diffs[pointer - 1][1] = bestEquality1;
        diffs[pointer][1] = bestEdit;
        diffs[pointer + 1][1] = bestEquality2;
      }
    }
    pointer++;
  }
};


/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {Array} diffs Array of diff tuples
 */
Diff.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  var lastequality = '';  // Always equal to equalities[equalitiesLength-1][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // equality found
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastequality = '';
      }
      post_ins = post_del = false;
    } else {  // an insertion or deletion
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastequality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastequality = '';
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality;
          pointer = equalitiesLength ? equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples
 */
Diff.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
    case DIFF_INSERT:
      count_insert++;
      text_insert += diffs[pointer][1];
      pointer++;
      break;
    case DIFF_DELETE:
      count_delete++;
      text_delete += diffs[pointer][1];
      pointer++;
      break;
    case DIFF_EQUAL:
      // Upon reaching an equality, check for prior redundancies.
      if (count_delete !== 0 || count_insert !== 0) {
        if (count_delete !== 0 && count_insert !== 0) {
          // Factor out any common prefixies.
          commonlength = this.diff_commonPrefix(text_insert, text_delete);
          if (commonlength !== 0) {
            if ((pointer - count_delete - count_insert) > 0 &&
                diffs[pointer - count_delete - count_insert - 1][0] ==
                DIFF_EQUAL) {
              diffs[pointer - count_delete - count_insert - 1][1] +=
                  text_insert.substring(0, commonlength);
            } else {
              diffs.splice(0, 0, [DIFF_EQUAL,
                  text_insert.substring(0, commonlength)]);
              pointer++;
            }
            text_insert = text_insert.substring(commonlength);
            text_delete = text_delete.substring(commonlength);
          }
          // Factor out any common suffixies.
          commonlength = this.diff_commonSuffix(text_insert, text_delete);
          if (commonlength !== 0) {
            diffs[pointer][1] = text_insert.substring(text_insert.length -
                commonlength) + diffs[pointer][1];
            text_insert = text_insert.substring(0, text_insert.length -
                commonlength);
            text_delete = text_delete.substring(0, text_delete.length -
                commonlength);
          }
        }
        // Delete the offending records and add the merged ones.
        if (count_delete === 0) {
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert, [DIFF_INSERT, text_insert]);
        } else if (count_insert === 0) {
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert, [DIFF_DELETE, text_delete]);
        } else {
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert, [DIFF_DELETE, text_delete],
                       [DIFF_INSERT, text_insert]);
        }
        pointer = pointer - count_delete - count_insert +
                  (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
      } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
        // Merge this equality with the previous one.
        diffs[pointer - 1][1] += diffs[pointer][1];
        diffs.splice(pointer, 1);
      } else {
        pointer++;
      }
      count_insert = 0;
      count_delete = 0;
      text_delete = '';
      text_insert = '';
      break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length)
          == diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Add an index to each tuple, represents where the tuple is located in text2.
 * e.g. [[DIFF_DELETE, 'h', 0], [DIFF_INSERT, 'c', 0], [DIFF_EQUAL, 'at', 1]]
 * @param {Array} diffs Array of diff tuples
 */
Diff.prototype.diff_addIndex = function(diffs) {
  var i = 0;
  for (var x = 0; x < diffs.length; x++) {
    diffs[x][2] = i;
    if (diffs[x][0] !== DIFF_DELETE) {
      i += diffs[x][1].length;
    }
  }
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {Array} diffs Array of diff tuples
 * @return {String} HTML representation
 */
Diff.prototype.diff_prettyHtml = function(diffs) {
  this.diff_addIndex(diffs);
  var html = [];
  for (var x = 0; x < diffs.length; x++) {
    var m = diffs[x][0]; // Mode (delete, equal, insert)
    var t = diffs[x][1]; // Text of change.
    var i = diffs[x][2]; // Index of change.
    t = t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/\n/g, '&para;<BR>');
    switch (m) {
    case DIFF_INSERT:
      html[x] = '<ins style="background:#E6FFE6;">' + t + '</INS>';
      break;
    case DIFF_DELETE:
      html[x] = '<del style="background:#FFE6E6;">' + t + '</del>';
      break;
    case DIFF_EQUAL:
      html[x] = '<span>' + t + '</span>';
      break;
    }
  }
  return html.join('');
};


return new Diff;

})();


var Helgon = {
  Date: {
    // Lördagen den 25:e juni 2005 kl 02:02
    // 28/5-06 kl 22:10
    // <Idag|Igår|D/M> kl <hh:mm>
    parse: function(date, laterdate) {
      function set(d, to) {
        if (to.Y) {
          var y = parseInt(to.Y, 10);
          if (y < 100)
            y = 2000 + y;
          d.setFullYear(y);
        }
        if (to.M) {
          var m = to.M;
          if (m.length > 3) {
            m = "janfebmaraprmajjunjulaugsepoktnovdec".indexOf(m.slice(1,3))/3;
            if (m < 0)
              throw prompt("Failed to parse month from:", to.M);
          } else
            m = parseInt(m, 10) - 1;
          d.setMonth(m);
        }
        if (to.D) d.setDate(parseInt(to.D, 10));
        if (to.h) d.setHours(parseInt(to.h, 10));
        if (to.m) d.setMinutes(parseInt(to.m, 10));
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
      }
      var text = date.toLowerCase();
      var hhmm = /\s*kl\s+(\d+):(\d+)/.exec( text );
      if (!hhmm)
        throw prompt("Failed to parse time from:", date);
      text = RegExp.leftContext; // shave off time part

      var today = new Date; today.setHours( 0 );
      var yesterday = new Date(today.getTime()-72e5);
      var D, M, Y = today.getFullYear();
      var jan = new Date(Y, 1, 1);

      var dmy4 = /den\s+(\d+)\S*\s+(\S+)\s+(\d+)/.exec( text );
      if (dmy4) {
        date = set(jan, {Y: dmy4[3], M: dmy4[2], D: dmy4[1] });
      } else {
        var dmy2 = /(\d+)\/(\d+)-(\d+)/.exec( text );
        if (dmy2) {
          date = set(jan, {Y: dmy2[3], M: dmy2[2], D: dmy2[1] });
        } else {
          var dm = /(\d+)\/(\d+)/.exec( text );
          if (dm) {
            date = set(today, {M: dm[2], D: dm[1] });
            while (laterdate && (date > laterdate))
              date.setFullYear( date.getFullYear()-1 );
          } else {
            if (text.match(/idag/))
              date = today;
            else if (text.match(/ig\345r/))
              date = yesterday;
            else
              throw prompt("Failed to parse date from:", text);
          }
        }
      }
      return set(date, {h: hhmm[1], m: hhmm[2]});
    }
  }
};

function query(sql) {
  function row2js( rs ) {
    var obj = {};
    if (rs.isValidRow()) {
      var max = rs.fieldCount();
      for (var i = 0; i < max; i++)
        obj[rs.fieldName(i)] = rs.field(i);
      rs.next();
    }
    return obj;
  };

  if (!db) return null;
  var args = [].slice.call(arguments, 1);
  var read = sql.match( /^select/i );
  try {
    //console.info("Query: %x %x", sql, args);
    db.open("helgon");
    if (!read) db.execute("BEGIN").close();
    var rs = db.execute( sql, args );
    if (!rs.isValidRow()) {
      rs.close();
      if (!read) db.execute("COMMIT").close();
      db && db.close();
      return null;
    }
    var got = rs.fieldCount() == 1 ? rs.field(0) : row2js( rs );
    rs.close();
    if (!read) db.execute("COMMIT").close();
    db.close();
    return got;
  } catch(e) {
    console.warn( e.message );
    rs && rs.close && rs.close();
    db && db.close();
  }
}


function update(table, data) {
  var fields = [], q = [], values = [];
  for (var name in data) {
    fields.push( name );
    values.push( data[name] );
    q.push("?");
  }
  values.unshift("INSERT OR REPLACE INTO "+ table +" ("+ fields.join(", ") +")"+
                 " VALUES ("+ q.join(", ") +")");
  return query.apply(this, values);
}

function initDB() {
  query("CREATE TABLE IF NOT EXISTS diary (" +
        "id INTEGER NOT NULL PRIMARY KEY, " +
        "uid INTEGER NOT NULL, " +
        "ctime BLOB NOT NULL, " +
        "mtime BLOB NOT NULL, " +
        "title TEXT NOT NULL, " +
        "body TEXT NOT NULL)");
}

function isodate(d) {
  function pad(n) { return n < 10 ? "0"+n : n; };
  return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join("-") +
    " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function parsePost() {
  var title = $X(xpath.diary.title);
  var date = $X(xpath.diary.date, title);
  var post = $X(xpath.diary.post, date);
  return {
    title: title.textContent,
     date: isodate(Helgon.Date.parse(date.textContent)),
     body: post.innerHTML,
     node: post,
      uid: location.search.match(/[&?]UserID=(\d+)/i)[1],
       id: location.search.match(/[&?]ID=(\d+)/i)[1]
  };
}

function readPost(id) {
  return query("SELECT * FROM diary WHERE id=?", id);
}

function diffDiaryPost() {
  var post = parsePost();
  var data = { id: post.id, uid: post.uid, ctime: post.date, mtime: post.date,
               title:post.title, body: post.body };
  var old = readPost(post.id);
  if (old) {
    if (old.title != post.title)
      $X(xpath.diary.title).textContent += "(var: "+ old.title + ")";
    if (old.body != post.body) {
      var diff = Diff.diff_main(old.body, post.body);
      Diff.diff_cleanupSemantic(diff);
      diff = Diff.diff_prettyHtml(diff);
      post.node.innerHTML = diff.replace(/&lt;br&gt;/g, "<br/>");
    }
    data.ctime = old.ctime;
  }
  update("diary", data);
}

function init() {
  initDB();
  GM_addStyle("ins { text-decoration:none; background:darkgreen !important; }" +
              "del { text-decoration:none; background:darkred !important; }");
  diffDiaryPost();
}

init();
