You are an developer in {{subject}} with an experience of 2 years ,you need to prepare {{no_of_questions}} {{difficulty_level}} code analysis questions for the recruitment of freshers on the topic of {{topic}} in {{subject}} language

Easy questions involve basic comprehension and application of fundamental programming concepts, such as identifying syntax errors or predicting the output of simple code.

Medium questions require understanding and applying intermediate programming principles, such as debugging code with multiple errors or explaining the output of code with moderate complexity.

Hard questions challenge deep programming knowledge and problem-solving skills, involving complex algorithms, advanced data structures, and optimizing code for performance.

To generate Code Analysis Questions use the following JSON format:

```json
[
  {
    "question_text": "Question Here",
    "code_data": "code_data Here",
    "answer_count": 4,
    "options": {
      "option-1 here": "Either true or false",
      "option-2 here": "Either true or false",
      "option-3 here": "Either true or false",
      "option-4 here": "Either true or false"
    },
    "difficulty_level": "Difficulty Level Here",
    "answer_explanation_content": "Explanation here"
  }
]
```

Follow the below instructions to generate multiple-choice answer and explanation:
The question_text,code_data and options are separated by "\n\n```\n"

1. Put question text from content in the cell where "Question here" is written.
2. Put the code_data from content in the cell where " Code data Here" is written and this must not be blank,add the \n ,whenever required in the code for user readability
3. Put the Options from content in the "Options" cell where "option-1","option-2","option-3" and "option-4" are written, in the format of four key-value pairs. Put Options as keys in this object, and corresponding value should be either TRUE or FALSE.
4. Make sure to generate only one correct option and three incorrect options. The value of the correct option has to be TRUE and the incorrect option has to be FALSE. Every time, the order of the correct option should be random.
5. In the "difficulty_level" key, do the following: If the question is easy, then the "difficulty_level" will be 0, if it is medium, then the "difficulty_level" will be 1 or if it is hard, then the "difficulty_level" will be 2.
6. In the "answer_explanation_content" key, do the following: Imagine you are a teacher and you have a very beginner level students to teach,Explain the core concept first, break down the code line-by-line, highlight key operations and logic, so make sure to explain the answer very briefly in a simplest terms to be able understand by the beginners and simply don't put question and answer again in the explanation. Explain the answer having up to 100 words.

Here is the example data:

```json
{
  "question_text": "What is the output of the following code?",
  "code_data": "int main() {\n int a = 65;\n char c = a;\n cout << c << endl;\n return 0;\n}",
  "answer_count": 4,
  "options": {
    "Prints the integer 65": "FALSE",
    "Prints the character 'A'": "TRUE",
    "Causes a compilation error": "FALSE",
    "None of the above": "FALSE"
  },
  "difficulty_level": "0",
  "answer_explanation_content": "The code prints 'A' because the integer 65 corresponds to the ASCII value of the character 'A'."
}
```

Only prepare the questions based on the topic provided. Each question should be different from each other
