const NodeFactory = (data) => {
    data = data;
    left = right = null;
    return { data, left, right }
}

const TreeFactory = (arr) => {
    let sortedArr = arr.sort(compareNumbers);
    let reducedArr = removeDups(sortedArr);
    root = buildTree(reducedArr, 0, reducedArr.length - 1);

    const insertNode = (root, value) => {
        let node = NodeFactory(value);
        if (!root) {
            root = node;
            return;
        }
        let prev = null;
        let current = root;
        while (current) {
            if (current.data > value) {
                prev = current;
                current = current.left;
            } else if (current.data < value) {
                prev = current;
                current = current.right;
            }
        }
        if (prev.data > value) {
            prev.left = node;
        } else {
            prev.right = node;
        }
    }

    const deleteNode = (root, value) => {
        if (root == null) return root;

        if (value < root.data) {
            root.left = deleteNode(root.left, value);
        } else if (value > root.data) {
            root.right = deleteNode(root.right, value);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            root.data = minValue(root.right);
            root.right = deleteNode(root.right, root.data);
        }
        return root;
    }

    function minValue(root) {
        let minVal = root.data;
        while (root.left != null) {
            minVal = root.left.data;
            root = root.left;
        }
        return minVal;
    }

    const find = (root, value) => {
        if (root == null) return root;

        if (value < root.data) {
            return find(root.left, value);
        } else if (value > root.data) {
            return find(root.right, value);
        } else {
            return root;
        }
    }

    const levelOrder = ( root, func ) => {
        
        let result = [];
        let q = [root];
        let node;

        while (q.length >= 1) {
            for (let i=0; i < q.length; i++) {
                node = q.shift();
                if (node) {
                    if (func) {
                        func(node);
                    } else {
                        result.push(node.data);
                    }
                    q.push(node.left);
                    q.push(node.right);
                }
            }
        }
        if (!func) {
            return result;
        }
    }

     const preOrder = ( root, func ) => {
        if (root) {
            if (func) {
                func(root);
                if (root.left) preOrder(root.left, func);
                if (root.right) preOrder(root.right, func);
            } else {
                if (root == null) return;

                let result = [root.data].concat(preOrder(root.left)).concat(preOrder(root.right));
                result = result.filter(function(element) { 
                    return element !== undefined
                });
                
                return result;
            }
        }
     }

     const inOrder = ( root, func ) => {
        if (root) {
            if (func) {
                if (root.left) inOrder(root.left, func);
                func(root);
                if (root.right) inOrder(root.right, func);
            } else {
                if (root == null) return;

                let result = [].concat(inOrder(root.left)).concat(root.data).concat(inOrder(root.right));
                result = result.filter(function(element) { 
                    return element !== undefined
                });
                
                return result;
            }
        }
     }

     const postOrder = ( root, func ) => {
        if (root) {
            if (func) {
                if (root.left) postOrder(root.left, func);
                if (root.right) postOrder(root.right, func);
                func(root);
            } else {
                if (root == null) return;

                let result = [].concat(postOrder(root.left)).concat(postOrder(root.right)).concat(root.data);
                result = result.filter(function(element) { 
                    return element !== undefined
                });
                return result;
            }
        }
     }

     const height = ( root ) => {
        if (root == null) return -1;

        let leftHt = height(root.left);
        let rightHt = height(root.right);

        return Math.max(leftHt, rightHt) + 1;
     }

     const depth = ( root, node ) => {
        if (root == null) return;
        
        let nodeDepth = 0;
        let current = root;
        while (current) {
            if (current.data > node.data) {
                nodeDepth++;
                current = current.left;
            } else if (current.data < node.data) {
                nodeDepth++;
                current = current.right;
            } else if (current.data == node.data) {
                return nodeDepth;
            }
        }

     }

     const isBalanced = ( root ) => {
        if (root == null) return -1;

        let leftHt = height(root.left);
        let rightHt = height(root.right);

        leftHt = leftHt + 1;
        rightHt = rightHt + 1;

        let diff = leftHt - rightHt;

        if (diff > 1 || diff < -1) {
            return false;
        } else {
            isBalanced(root.left);
            isBalanced(root.right);
        }
        return true;
     }

     const rebalance = ( root ) => {
        let arr = inOrder(root);
        return TreeFactory(arr);
     }

    return { root, insertNode, deleteNode, find, levelOrder, preOrder, inOrder, postOrder, height, depth, isBalanced, rebalance }
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

function printMe(node) {
    console.log(`Print! ${node.data}`);
}

  let test = [1,1,9,2,3,8,8,4,5,6,6,7];
  test = TreeFactory(test);