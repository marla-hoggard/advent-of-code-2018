// Day 1 - Puzzle 1
// @input = array of strings of form "+19" or "-10"
// Returns total after adding or subtracting all entries
const sumFrequency = input => {
	let sum = 0;
	for (var i = 0; i < input.length; i++) {
		const num = Number(input[i].slice(1));
		if (input[i][0] === '-') {
			sum -= num;
		}
		else sum += num;
	}
	return sum;
}

// Day 1 - Puzzle 2
// @input = array of strings of form "+19" or "-10"
// Returns the value of the first repeated frequency(sum)
// The list may repeat if no duplicates are found the first time through
const repeatedFrequency = input => {
	let prev = [0];
	let cur = 0;
	let count = 0;
	while (true) {
		for (var i = 0; i < input.length; i++) {
			const num = Number(input[i].slice(1));
			if (input[i][0] === '-') {
				cur -= num;
			}
			else cur += num;
			if (prev.includes(cur)) {
				return cur;
			}
			else {
				prev.push(cur);
			}
		}
		count++;
		console.log(count);
	}
}

// Day 2 - Puzzle 1
// @input = array of strings
// Returns product of strings with at least one letter that appears exactly twice
// and strings with at least one letter that appears exactly three times
const repeats2times3 = input => {
	let two = 0;
	let three = 0;
	input.forEach(str => {
		if (hasRepeatedLetter(str, 2)) {
			two++;
		}
		if (hasRepeatedLetter(str, 3)) {
			three++;
		}
	})

	return two * three;
}

// Returns true if @string contains at least one letter that appears exactly @num times
const hasRepeatedLetter = (string, num) => {
	let remaining = string;
	while(remaining.length) {
		const last = remaining.length;
		remaining = remaining.replace(new RegExp(remaining[0], 'g'),'');
		const next = remaining.length;
		if (last - next === num) {
			return true;
		}
	}
	return false;
}

// Day 2 - Puzzle 2
// @input = array of strings
// Finds the two strings that are off by one, returns their common substring
const findSimilar = input => {
	for (var i = 0; i < input.length - 1; i++) {
		for (var j = i+1; j < input.length; j++) {
			if (offByOne(input[i], input[j])) {
				return allButDiff(input[i], input[j]);
			}
		}
	}
	return 'nope';
}

// Returns true if str1 and str2 are identical except for one character
const offByOne = (str1, str2) => {
	if (str1.length !== str2.length) {
		return false;
	}
	let diffs = 0;
	str1.split('').forEach((char1, i) => {
		if (char1 !== str2[i]) {
			diffs++;
		}
	});
	return diffs === 1;
}

// str1 and str2 must differ by one character
// Returns the rest of the string without that character
const allButDiff = (str1, str2) => {
	if (!offByOne(str1, str2)) {
		return '';
	}
	for (var i = 0; i < str1.length; i++) {
		if (str1[i] !== str2[i]) {
			return str1.slice(0,i) + str1.slice(i+1);
		}
	}
	return '';
}

// Day 3 - Puzzle 1
// @input = array of claims
// Returns number of claims that overlap with another
const overlap = input => {
	let grid = Array(1000).fill(null).map(val => Array(1000).fill(0));
	let count = 0;
	input.forEach(claim => {
		const pieces = claim.split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];		
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				if (grid[j][i] === 1) {
					count++;
				}
				grid[j][i]++;
			}
		}
	});
	return count;
}

// Day 3 - Puzzle 2
// Finds the id of the claim that doesn't overlap
const overlap2 = input => {
	let grid = Array(1000).fill(null).map(val => Array(1000).fill(0));
	input.forEach(claim => {
		const pieces = claim.split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];	
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				grid[j][i]++;
			}
		}
	});
	for (var c = 0; c < input.length; c++) {
		const pieces = input[c].split(/[\s\:@,x]/);
		const startA = +pieces[3];
		const startB = +pieces[4];
		const lenA = +pieces[6];
		const lenB = +pieces[7];
		let overlaps = false;	
		for (var i = startA; i < startA + lenA; i++) {
			for (var j = startB; j < startB + lenB; j++) {
				if (grid[j][i] > 1) {
					overlaps = true;
				}
			}
		}
		if (!overlaps) {
			return pieces[0];
		}
	}
	return 'nope';
}

// Day 4 - Puzzle 1
const worstGuard = input => {
	input.sort(sortGuardTimes);
	console.log(input);
	let guards = {};
	let currentGuard = '';
	for (var i = 0; i < input.length; i++) {
		const [match, year, month, day, hour, minute, str] = input[i].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
		if (str.startsWith('Guard')) {
			currentGuard = Number(str.split(' ')[1].slice(1));
		}
		else if (str.startsWith('falls')) {
			const awakeMinute = +input[i+1].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/)[5];
			if (!guards[currentGuard]) {
				guards[currentGuard] = Array(60).fill(0);
			}
			for (var s = +minute; s < +awakeMinute; s++) {
				guards[currentGuard][s]++;
			}
			i++;
		}
		else {
			console.log('I messed up');
		}
	}
	console.log(guards);
	let guardMinutes = { ids: [], minutes: [] }
	for (var g in guards) {
		const min = guards[g].reduce((prev, cur) => prev + cur);
		guardMinutes.ids.push(g);
		guardMinutes.minutes.push(min);
	}
	console.log(guardMinutes);
	const guard = guardMinutes.ids[guardMinutes.minutes.indexOf(Math.max(...guardMinutes.minutes))];
	const max = guards[guard].indexOf(Math.max(...guards[guard]));
	console.log(max, guard);
	return max * guard;
}

const sortGuardTimes = (str1, str2) => {
	const [match1, year1, month1, day1, hour1, minute1, string1] = str1.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
	const [match2, year2, month2, day2, hour2, minute2, string2] = str2.match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
	if (+year1 < +year2) {
		return -1;
	}
	if (+year1 > +year2) {
		return 1;
	}
	if (+month1 < +month2) {
		return -1;
	}
	if (+month1 > +month2) {
		return 1;
	}
	if (+day1 < +day2) {
		return -1;
	}
	if (+day1 > +day2) {
		return 1;
	}if (+hour1 < +hour2) {
		return -1;
	}
	if (+hour1 > +hour2) {
		return 1;
	}if (+minute1 < +minute2) {
		return -1;
	}
	if (+minute1 > +minute2) {
		return 1;
	}
	return 0;
}

// Day 4 - Puzzle 2
const worstGuard2 = input => {
	input.sort(sortGuardTimes);
	let guards = {};
	let currentGuard = '';
	for (var i = 0; i < input.length; i++) {
		const [match, year, month, day, hour, minute, str] = input[i].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/);
		if (str.startsWith('Guard')) {
			currentGuard = Number(str.split(' ')[1].slice(1));
		}
		else if (str.startsWith('falls')) {
			const awakeMinute = +input[i+1].match(/\[(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (.*)/)[5];
			if (!guards[currentGuard]) {
				guards[currentGuard] = Array(60).fill(0);
			}
			for (var s = +minute; s < +awakeMinute; s++) {
				guards[currentGuard][s]++;
			}
			i++;
		}
		else {
			console.log('I messed up');
		}
	}
	console.log(guards);
	let guardMaxes = { ids: [], maxes: [] }
	for (var g in guards) {
		const max = Math.max(...guards[g]);
		guardMaxes.ids.push(g);
		guardMaxes.maxes.push(max);
	}
	console.log(guardMaxes);
	const guard = guardMaxes.ids[guardMaxes.maxes.indexOf(Math.max(...guardMaxes.maxes))];
	const max = guards[guard].indexOf(Math.max(...guards[guard]));
	console.log(max, guard);
	return max * guard;
}

// Day 5 - Puzzle 1
// @input = string
// Removes adjacent pairs of the form aA, Zz, etc.
// Returns length of remaining string after all pairs are removed
const removeOpp = input => {
	let i = 0;
	while (i < input.length - 1) {
		if (input[i].toUpperCase() === input[i+1].toUpperCase() && input[i] !== input[i+1]) {
			input = input.slice(0,i) + input.slice(i+2);
			if (i > 0) {
				i--;
			}
		}
		else {
			i++;
		}
	}
	return input.length;
}

// Day 5 - Puzzle 2
// Removes all instances of char, case insensitive, in @input and returns remaining string
const removeUnit = (input, char) => {
	return input.split('').filter(letter => letter.toUpperCase() !== char.toUpperCase()).join('');
}

// Cycles through each letter of the alphabet, removing that letter from input
// Returns the length of the shortest value returned from removeOpp after one letter is removed
const worstLetter = input => {
	const letters = 'qwertyuiopasdfghjklzxcvbnm'.split('');
	const lengths = letters.map(letter => removeOpp(removeUnit(input, letter)));
	return Math.min(...lengths);
}

