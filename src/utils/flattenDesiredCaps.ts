type DesiredCapObj = { [key: string]: any };

function flattenDesiredCaps(desiredCaps: any): DesiredCapObj {
	let result: DesiredCapObj = {};

	// loop through the keys in the desired caps obj
	for (let key in desiredCaps) {
		// check the type of the associated value for the key
		// if it's an object, recursively call the function again
		if ((typeof desiredCaps[key]) === 'object') {
			let tempObj = flattenDesiredCaps(desiredCaps[key]);
			for (let tempKey in tempObj) {
				// store the tempObj in the result
				result[key + "." + tempKey] = tempObj[tempKey];
			}
		} else { // store object directly in result
			result[key] = desiredCaps[key];
		}
	}
	return result;
}

export default flattenDesiredCaps;