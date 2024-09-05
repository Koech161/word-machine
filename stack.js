function solution(S) {
    const stack = []; // Initialize an empty stack (array) to store integers.
    const MAX_INT = (1 << 20) - 1; // Define the maximum integer value as 2^20 - 1, which equals 1048575.

    // Split the input string S into an array of operations, separated by spaces.
    const operations = S.split(" ");

    // Iterate over each operation in the operations array.
    for (const op of operations) {
        if (!isNaN(op)) { 
            // If the current operation is a number (not NaN), convert it to an integer and push it onto the stack.
            stack.push(parseInt(op));
        } else if (op === "POP") {
            // If the operation is "POP", check if the stack is empty. stack.isEmpty
            if (stack.length === 0) return -1; // Return -1 if the stack is empty (error case).
            stack.pop(); // Otherwise, remove the top element from the stack.
        } else if (op === "DUP") {
            // If the operation is "DUP", check if the stack is empty.
            if (stack.length === 0) return -1; // Return -1 if the stack is empty (error case).
            stack.push(stack[stack.length - 1]); // Otherwise, duplicate the top element and push it onto the stack.
        } else if (op === "+") {
            // If the operation is "+", check if the stack has fewer than 2 elements.
            if (stack.length < 2) return -1; // Return -1 if there are not enough elements to perform addition.
            const a = stack.pop(); // Pop the top element from the stack.
            const b = stack.pop(); // Pop the next top element from the stack.
            const sum = a + b; // Calculate the sum of the two popped elements.
            if (sum > MAX_INT) return -1; // Return -1 if the sum exceeds the maximum allowed integer.
            stack.push(sum); // Otherwise, push the sum back onto the stack.
        } else if (op === "-") {
            // If the operation is "-", check if the stack has fewer than 2 elements.
            if (stack.length < 2) return -1; // Return -1 if there are not enough elements to perform subtraction.
            const a = stack.pop(); // Pop the top element from the stack.
            const b = stack.pop(); // Pop the next top element from the stack.
            const diff = a - b; // Calculate the difference (a - b) of the two popped elements.
            if (diff < 0) return -1; // Return -1 if the difference is negative (error case).
            stack.push(diff); // Otherwise, push the difference back onto the stack.
        } else {
            // If the operation is not recognized (though the problem states it should be valid), return -1 as an error case.
            return -1;
        }
    }

    // After processing all operations, check if there are any elements left in the stack.
    return stack.length > 0 ? stack[stack.length - 1] : -1; // Return the top element of the stack if it exists, otherwise return -1.
}



console.log(solution("4 5 6 - 7 +")); // Output: 8
console.log(solution("13 DUP 4 POP 5 DUP + DUP + -")); // Output: 7
console.log(solution("5 6 + -")); // Output: -1
console.log(solution("3 DUP 5 - -")); // Output: -1
console.log(solution("1048575 DUP +")); // Output: -1
