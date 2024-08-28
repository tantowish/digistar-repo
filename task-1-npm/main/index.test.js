const mergeSortedArrays = require('merge-sort-pkg-tantowi');

test('merges two sorted arrays', () => {
    expect(mergeSortedArrays([1, 3, 5], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(mergeSortedArrays([-1, 0, 1], [-2, 2])).toEqual([-2, -1, 0, 1, 2]);
});