const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require('util');
const puppeteer = require("puppeteer")

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([{
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "checkbox",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "red",
            "blue",
            "green",
            "pink"
        ]
    }])
}


const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};


function generateHTML(data) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <link rel="stylesheet" href="style.css">
    
    <body>
        <div class="main">
            <div class="wrapper">
    
                <div class="photo-header">
                <img src="${data.imgUrl}.png" alt="Profile" height="50" width="50">
                    <h1>Hi I'm ${data.name}, welcome to my page!</h1>
                    <h2>${data.location}</h2>
                </div>
    
                <div class="links-nav">
                    <div class="nav-link">
                    <br>
                    <br>
                    <button target="_blank" onclick="window.location.href = '${data.github}';">Go to Github Page</button>
                    <button target="_blank" onclick="window.location.href = '${data.blog}';">Go to Blog</button>
                    </div>
                    <p>${data.bio}</p>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="card">Number of Public Repos: ${data.repoNum}</div>
                    </div>
                    <div class="col">
                        <div class="card">Currently working at: ${data.company}</div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="card">Number of Followers: ${data.followers}</div>
                    </div>
                    <div class="col">
                        <div class="card">Number of Following: ${data.following}</div>
                    </div>
                </div>
            </div>
            <div class="container">
            <div class="row">
                <div class="col">
                    <div class="card"></div>
                </div>
            </div>
        </div>
        </div>
    </body>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: ${colors[data.color].wrapperBackground};
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: ${colors[data.color].headerBackground};
           color: ${colors[data.color].headerColor};
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid ${colors[data.color].photoBorderColor};
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: ${colors[data.color].headerBackground};
             color: ${colors[data.color].headerColor};
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>`
}

function CreateUser(username, color, repoNum, imgUrl, location, followers, following, company, name, github, blog, bio) {
    this.username = username;
    this.color = color;
    this.repoNum = repoNum;
    this.imgUrl = imgUrl;
    this.location = location;
    this.followers = followers;
    this.following = following;
    this.company = company;
    this.name = name;
    this.github = github;
    this.blog = blog;
    this.bio = bio;
}

async function init() {

    try {
        const answers = await promptUser();
        const queryUrlRepo = `https://api.github.com/users/${answers.username}/repos?per_page=100`;

        async function axiosRepos() {
            try {
                const response = await axios.get(queryUrlRepo);
                const repoNames = response.data.map(function (repo) {
                    return repo.name;
                });
                console.log(`Saved ${repoNames.length} repos`);
                // console.log(response.data)
                return repoNames.length
            } catch (error) {
                console.error(error);
            }
        }
        axiosRepos();
        let axiosResponseRepos = await axiosRepos();

        const queryUrlImg = `https://api.github.com/users/${answers.username}/repos?per_page=100`;

        async function axiosImg() {
            try {
                const response = await axios.get(queryUrlImg);
                console.log(response.data[0].owner.avatar_url)
                const imgTag = (response.data[0].owner.avatar_url)
                return imgTag
            } catch (error) {
                console.error(error);
            }
        }
        axiosImg();
        let axiosResponseImg = await axiosImg();





        const queryUrlProfile = `https://api.github.com/users/${answers.username}`;

        async function axiosProf() {

            try {

                const response = await axios.get(queryUrlProfile);
                const locTag = response.data.location;
                const followersTag = response.data.followers;
                const followingTag = response.data.following;
                const companyTag = response.data.company;
                const name = response.data.name;
                const github = response.data.html_url;
                const blog = response.data.blog;
                const bio = response.data.bio;
                // console.log(response.data)
                const answersArray = [locTag, followersTag, followingTag, companyTag, name, github, blog, bio];

                return answersArray;

            } catch (error) {

                console.error(error);

            }

        }


        axiosProf();

        let answersProf = await axiosProf();

        console.log(answersProf)

        let axiosResponseLoc = answersProf[0];
        let axiosResponseFollowers = answersProf[1];
        let axiosResponseFollowing = answersProf[2];
        let axiosResponseCompany = answersProf[3];
        let axiosResponseName = answersProf[4];
        let axiosResponseGithub = answersProf[5];
        let axiosResponseBlog = answersProf[6];
        let axiosResponseBio = answersProf[7];



        const queryUrlStars = `https://api.github.com/users/${answers.username}/starred`;
        // {/owner}{/repo}

        async function axiosStars() {

            try {

                const response = await axios.get(queryUrlStars);
                // const locTag = response.data.location;
                console.log(response.data)
                // const starsArray = [locTag];

                // return starsArray;

            } catch (error) {

                console.error(error);

            }

        }


        axiosStars();

        let answersStars = await axiosStars();

        console.log(answersStars)
















        const newUser = new CreateUser(
            answers.username,
            answers.color.toString(),
            axiosResponseRepos,
            axiosResponseImg,
            axiosResponseLoc,
            axiosResponseFollowers,
            axiosResponseFollowing,
            axiosResponseCompany,
            axiosResponseName,
            axiosResponseGithub,
            axiosResponseBlog,
            axiosResponseBio
        )
        // console.log(newUser)
        // console.log(answers)

        const indexFile = await generateHTML(newUser)

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(indexFile)
        await page.emulateMedia("screen");
        await page.pdf({
            path: "Page.pdf",
            format: "A4",
            printBackground: true
        });

        await writeFileAsync("github-index.html", indexFile);

        console.log("Successfully wrote to index-github.html");
    } catch (err) {
        console.log(err);
    }
}

init();