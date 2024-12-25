const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Input ke liye setup
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Menu dikhana
console.log("Choose an option:\n1. Read File\n2. Move File\n3. Create File\n4. Create Folder\n5. Exit");

// User input handle karna
rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
        case '1': // Read File
            rl.question("Enter file path to read: ", (readInputPath) => {
                try {
                    const readfile = fs.readFileSync(readInputPath, 'utf8');
                    console.log("File Content:\n", readfile);
                } catch (err) {
                    console.error("Error reading file:", err.message);
                }
                rl.close();
            });
            break;

        case '2': // Move File
            rl.question("Enter source file path: ", (moveInputPath) => {
                rl.question("Enter destination file path: ", (moveInputPath2) => {
                    try {
                        fs.renameSync(moveInputPath, moveInputPath2);
                        console.log("File moved successfully!");
                    } catch (err) {
                        console.error("Error moving file:", err.message);
                    }
                    rl.close();
                });
            });
            break;

        case '3': // Create File
            rl.question("Enter path to create file: ", (createInputPath) => {
                rl.question("Enter content for the file: ", (input) => {
                    try {
                        fs.writeFileSync(createInputPath, input);
                        console.log("File created successfully!");
                    } catch (err) {
                        console.error("Error creating file:", err.message);
                    }
                    rl.close();
                });
            });
            break;

        case '4': // Create Folder
            rl.question("Enter folder name to create: ", (inputFold) => {
                try {
                    if (!fs.existsSync(inputFold)) {
                        fs.mkdirSync(inputFold);
                        console.log("Folder created successfully!");
                    } else {
                        console.log("Folder already exists!");
                    }
                } catch (err) {
                    console.error("Error creating folder:", err.message);
                }
                rl.close();
            });
            break;

        case '5': // Exit
            console.log("Exiting program.");
            rl.close();
            break;

        default: // Invalid choice
            console.log("Invalid choice! Please select between 1-5.");
            rl.close();
    }
});
