// @indices = a number or an array of numbers
// Removes the index/indices of @indices from array and returns array
const removeIndex = (array, indices) => {
	if (typeof indices === 'number') {
		return array.slice(0, indices).concat(array.slice(indices+1));
	}
	indices.sort((a,b) => a - b);
	while (indices.length) {
		const remove = indices.shift();
		array = removeIndex(array, remove);
		indices = indices.map(el => el - 1);
	}
	return array;
}

// Returns @array without first instance of @val
const removeVal = (array, val) => {
	const index = array.indexOf(val);
	if (index >= 0) {
		return array.slice(0, index).concat(array.slice(index + 1));
	} 
	return array;
}

const manhattanDistance = ([x1, y1], [x2, y2]) => {
	return Math.abs(x2-x1) + Math.abs(y2-y1);
}