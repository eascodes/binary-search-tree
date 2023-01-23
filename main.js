const NodeFactory = (data, left, right) => {
    if (!left) left = null;
    if (!right) right = null;
    data = data;
    left = left;
    right = right;
    return { data, left, right }
}

const TreeFactory = (arr) => {
    let sortedArr = arr.sort(compareNumbers);
    let reducedArr = removeDups(sortedArr);
    root = buildTree(reducedArr, 0, reducedArr.length - 1);

    const insert = (value) => {

    }

    return { root, insert }
}

function removeDups(arr) {
    let seen = {};
    let result = [];
    let j = 0;
    for (let i=0; i < arr.length; i++) {
        let item = arr[i];
        if (seen[item] !== 1) {
            seen[item] = 1;
            result[j++] = item;
        }
    }
    return result;
}

function compareNumbers(a, b) {
    return a - b;
  }

function buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let node = NodeFactory(arr[mid]);

    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

