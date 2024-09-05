def solution(S):
    stack = []
    max_value = 2**20 - 1  # 20-bit unsigned integer maximum value
    
    try:
        for operation in S.split():
            if operation.isdigit():
                # Convert the operation to an integer and push it onto the stack
                stack.append(int(operation))
            elif operation == "POP":
                # Remove the topmost element from the stack
                stack.pop()
            elif operation == "DUP":
                # Duplicate the topmost element
                stack.append(stack[-1])
            elif operation == "+":
                # Pop the top two elements, add them, and push the result
                if len(stack) < 2:
                    return -1
                a = stack.pop()
                b = stack.pop()
                result = a + b
                if result > max_value:
                    return -1  # Overflow
                stack.append(result)
            elif operation == "-":
                # Pop the top two elements, subtract them, and push the result
                if len(stack) < 2:
                    return -1
                a = stack.pop()
                b = stack.pop()
                result = a - b
                if result < 0:
                    return -1  # Underflow
                stack.append(result)
            else:
                # If an unknown operation is encountered, return -1
                return -1
        
        # After all operations, return the topmost value if the stack is not empty
        return stack[-1] if stack else -1
    
    except IndexError:
        # This exception is raised if the stack is empty and a POP or similar operation is performed
        return -1

# Examples
print(solution("4 5 6 - 7 +"))           # Output: 8
print(solution("13 DUP 4 POP 5 DUP + DUP + -"))  # Output: 7
print(solution("5 6 + -"))              # Output: -1
print(solution("3 DUP 5 - -"))          # Output: -1
print(solution("1048575 DUP +"))        # Output: -1

