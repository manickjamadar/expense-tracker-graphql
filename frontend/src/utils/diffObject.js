function diffObjects(obj1, obj2) {
    // Initialize an empty object to store the differences
    const diff = {};

    // Get all unique keys from both objects
    const keys = new Set([...Object.keys(obj1)]);

    // Iterate over each key
    keys.forEach(key => {
        // Check if the values are different
        if (obj1[key] !== obj2[key]) {
            // Add the key and the value from the first object to the diff object
            diff[key] = obj1[key];
        }
    });

    return diff;
}
export default diffObjects;