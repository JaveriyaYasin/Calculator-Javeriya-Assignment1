#! /usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
// Function to wait for 2 seconds
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
};
// Function to display the welcome message
async function welcome() {
    let rainbowtitle = chalkAnimation.rainbow('Welcome to Calculator');
    await sleep();
    rainbowtitle.stop();
    console.log(` _____________________
  |  _________________  |
  | | JO           0. | |
  | |_________________| |
  |  ___ ___ ___   ___  |
  | | 7 | 8 | 9 | | + | |
  | |___|___|___| |___| |
  | | 4 | 5 | 6 | | - | |
  | |___|___|___| |___| |
  | | 1 | 2 | 3 | | x | |
  | |___|___|___| |___| |
  | | . | 0 | = | | / | |
  | |___|___|___| |___| |
  |_____________________|`);
}
// Main function to ask the user for input and perform calculations
async function startCalculator() {
    await welcome();
    let keepCalculating = true;
    while (keepCalculating) {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "operator",
                message: "Which operation would you like to perform?",
                choices: ["Addition", "Subtraction", "Multiplication", "Division"]
            },
            {
                type: "number",
                name: "num1",
                message: "Enter the first number:"
            },
            {
                type: "number",
                name: "num2",
                message: "Enter the second number:"
            }
        ]);
        let result;
        switch (answers.operator) {
            case "Addition":
                result = answers.num1 + answers.num2;
                break;
            case "Subtraction":
                result = answers.num1 - answers.num2;
                break;
            case "Multiplication":
                result = answers.num1 * answers.num2;
                break;
            case "Division":
                result = answers.num1 / answers.num2;
                break;
        }
        console.log(`${answers.num1} ${answers.operator} ${answers.num2} = ${result}`);
        const { continueCalculating } = await inquirer.prompt([
            {
                type: "confirm",
                name: "continueCalculating",
                message: "Do you want to continue calculating?",
                default: true
            }
        ]);
        keepCalculating = continueCalculating;
    }
}
// Start the calculator
startCalculator().catch((error) => {
    console.error("An error occurred:", error);
});
