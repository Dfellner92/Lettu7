const inquirer = require("inquirer");
const axios = require("axios");
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
            type: "list",
            message: "What style badge would you like?",
            name: "badgeStyle",
            choices: [
                "plastic",
                "flat",
                "flat-square",
                "for-the-badge",
                "social"
            ]
        },
        {
            type: "input",
            message: "What do you want the badge logo to say?",
            name: "badgeLogo"
        },
        {
            type: "input",
            message: "What is your Project Title?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Provide detail description",
            name: "projectDescription"
        },
        {
            type: "input",
            message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
            name: "installationProcess"
        },
        {
            type: "input",
            message: "Provide instructions for use.",
            name: "instruction"
        },
        {
            type: "input",
            message: "Provide instructions examples for use.",
            name: "instructionExample"
        },
        {
            type: "input",
            message: "provide License name ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "provide License url ",
            name: "licenseUrl"
        },
        {
            type: "input",
            message: "please enter git hub user names of the contributor if any (If there are mulitple contributor, seperate names with comma and no space! )",
            name: "contributorsGitUserName"
        },
        {
            type: "input",
            message: "Provide examples on how to run tests.",
            name: "tests"
        }
        ]);
        console.log(`starting`);
        console.log(userResponse);
        const gitUsername = userResponse.username;
        const gitBadgeStyle = userResponse.badgeStyle;
        const gitBadgeLogo = userResponse.badgeLogo;
        const projectTitle = userResponse.projectTitle;
        const projectDescription = userResponse.projectDescription;
        const installationProcess = userResponse.installationProcess;
        const instruction = userResponse.instruction;
        const instructionExample = userResponse.instructionExample;
        const licenseName = userResponse.licenseName;
        const licenseUrl = userResponse.licenseUrl;
        const contributorUserNames = userResponse.contributorsGitUserName;
        const tests = userResponse.tests;
            // fetching data from git
            // user
        const gitResponse = await axios.get(`https://api.github.com/users/${gitUsername}`);
        console.log(gitResponse);
        const gitData = gitResponse.data;
        const gitName = gitData.login;
        const gitEmail = gitData.email;
        const gitlocation = gitData.location;
        const gitUrl = gitData.html_url;
        const gitProfileImage = gitData.avatar_url;
            // contributor
        const contributorUserNamesArray = contributorUserNames.split(",");
        console.log(contributorUserNamesArray);
        // const  = listOfContributorsUserNames.
        // contributorsGitUserName
        var resultContributor;
        for (i=0; i<contributorUserNamesArray.length; i++){
            var contributorsGitUserName = contributorUserNamesArray[i]
            const gitResponse2 = await axios.get(`https://api.github.com/users/${contributorsGitUserName}`);
            var gitContribuProfileImage = gitResponse2.data.avatar_url;
            var gitContribuUrl = gitResponse2.data.html_url;
            var gitContribuEmail = gitResponse2.data.email;
            var resultContributor = resultContributor + (`
            \n <img src="${gitContribuProfileImage}" alt="drawing" width="150" display="inline"/> ${contributorsGitUserName}  GitHubLink: ${gitContribuUrl}`);
        }
        var result = (` [
![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)
https://img.shields.io/github/license/dfellner92/Lettu7?logo=${gitBadgeLogo}&style=${gitBadgeStyle}
# ${projectTitle} 
# ${projectDescription}
## Table of Contents
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Author](#Author)
\n* [Tests](#Tests)
## Installation
${installationProcess}
## Instructions
${instruction}
\`\`\`
${instructionExample}
\`\`\`
## License 
This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
## Contributors
${resultContributor}
## Tests
${tests}
## Author 
\n![ProfileImage](${gitProfileImage})
\n**${gitName}**
\nEmail: ${gitEmail}
\nLocation:${gitlocation}
\nGitHub: ${gitUrl}
`)

var writeResult = fs.writeFileSync(path.join(__dirname, 'readMe.md'), result ) 
console.log("file generated....");
    }
main();