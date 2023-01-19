const NodeFactory = (data) => {
    data = data;
    return { data }
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
    let copy = [...arr];
    copy = removeDups(copy);
    copy = copy.sort(compareNumbers);
    
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