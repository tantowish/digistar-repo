function mergeSortedArrays(arr1, arr2) {
    return arr1.concat(arr2).sort((a, b) => a - b);
}

module.exports = mergeSortedArrays;