const NodeFactory = (data, left, right) => {
    if (!left) left = null;
    if (!right) right = null;
    data = data;
    left = left;
    right = right;
    return { data, left, right }
}

const TreeFactory = (arr) => {
    root = buildTree();
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

function buildTree(arr) {
    if (arr.length === 1) {
        let root = NodeFactory(arr[0]);
        return root;
    };
    if (arr.length < 1 || arr === null) return null;
    
    // Make copy of array, filter out duplicates, & sort
    let copy = [...arr];
    copy = removeDups(copy);
    copy = copy.sort(compareNumbers);
    
    let mid = parseInt((copy.length - 1)/2);
    let rootValue = copy[mid];
    
    let leftArr;
    let rightArr;
    if (copy.slice(0,mid)) {
        leftArr = copy.slice(0,mid);
    } else {
        leftArr = null;
    }
    
    if (copy.slice((mid+1),copy.length)) {
        rightArr = copy.slice((mid+1),copy.length);
    } else {
        rightArr = null;
    }

    let root = NodeFactory(rootValue);
    root.left = buildTree(leftArr);
    root.right = buildTree(rightArr);

    return root;

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