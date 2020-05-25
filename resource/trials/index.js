const inquirer = require("inquirer");
const fs = require('fs');
const path = require('path');

async function main(){
    const userResponse = await inquirer
        .prompt([
        {
             type: "input",
             message: "What is your GitHub user name?",
             name: "username"
        },
        {
            type: "input",
            message: "What is your Project Title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Please provide a description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "Please provide a guide for installation", 
            name: "installationProcess"
        },
        {
            type: "input",
            message: "Provide instructions examples for use.",
            name: "usage"
        },
        {
            type: "input",
            message: "provide License name ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "Please enter the names of the contributers",
            name: "contributors"
        },
        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        },
        {
            type: "input",
            message: "What are some frequent questions users might have? (and the answers in turn)",
            name: "questions"
        }
        ]);
        console.log(userResponse);
        const userName = userResponse.userName;
        const projectTitle = userResponse.projectTitle;
        const projectDescription = userResponse.projectDescription;
        const installationProcess = userResponse.installationProcess;
        const usage = userResponse.usage;
        const licenseName = userResponse.licenseName;
        const contributors = userResponse.contributors;
        const tests = userResponse.tests;
        const frequentlyAQ = userResponse.questions;
        
        var result = (` 
            [![GitHub version](https://badge.fury.io/gh/dfellner92%2FLettu7.svg)](https://badge.fury.io/gh/dfellner92%2FLettu7)
            ## ${projectTitle}
            # ${userName} 
            # ${projectDescription}
            ## Table of Contents
            \n* [Installation](#Installation)
            \n* [Usage](#Usage)
            \n* [License](#License)
            \n* [Contributors](#Contributors)
            \n* [Tests](#Tests)
            \n* [F.A.Q.](#F.A.Q.)
            ## Installation
            ${installationProcess}
            ## Instructions
            ${usage}
            ## License 
            ${licenseName} 
            ## Contributors
            ${contributors}
            ## Tests
            ${tests}
            ## F.A.Q.
            ${frequentlyAQ}
            `)

    var writeResult = fs.writeFileSync(path.join(__dirname, 'readMe.md'), result ) 
    console.log("file generated....");

};

main();