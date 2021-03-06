# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.  

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Complete
|Day 5| Final Touches and Present | Incomplete

## Project Description

A single page control panel for an art portfolio site that uses jquery to repopulate pages with content pulled from the imagerebs api. It will have four main page categories and two subpage categories. It will have mobile functionality.

## Google Sheet

Include link to your google sheet here.  Here is the sample [Suresh had used in class](https://docs.google.com/spreadsheets/d/1DRhpnHYU-LVnRYKSALXm_xbMCZ3FsTs6Zl-VJ1MU49E/edit#gid=0) 

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe. Do not include the actual image and have it render on the page.  

- [Mobile](https://git.generalassemb.ly/SEIR-629/project-1-portfolio/blob/master/readme-assets/mobile.png)
- [Desktop](https://www.figma.com/file/iEDITM43sRj7voPACBZCYX/Untitled?node-id=5%3A113)

## Time/Priority Matrix 

Include a full list of features that have been [prioritized](https://res.cloudinary.com/doaftkgbv/image/upload/v1583773146/ValueVSComplexity_u2inhx.png) based on the `Time and Priority` Matix.  This involves drawing a a square.  In the middle of the square, on the x axis draw a line.  The most left part of the line should start with 0hrs and the end of the line should include 2hrs.  This line will be used to estimate how much time any one feature will take to complete. 

Now draw a vertical line on the y axis.  The top of this line should have `High` and the bottom `Low`.  This line will be used to assign a priority to to each feature you wish to include in the project.  

Now create a separate list starting with A and assign it one of the features.  Continue to assign each feature a letter.  Once complete add each letter to the matrix assigning based on what your feel it's prioirty is an how long it will take to implement. If any one feature takes longer than 2hrs to complete than break it down into smaller tasks and reassign them a new letter. 

Once complete tally up the time and determine how long the project will take to complete. Now break those features into MVP and PostMVP so you can guarantee you will have a fully functioning project to demo. 

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP (examples)

- Three sections 
- Desktop menu with one catergory capable of dropdown.
- Content filters based on button
- Visually basic layout(mobile and desktop)

#### PostMVP 

- Design research
- Refactor to a visually appealing site
- Bootstrap?
- Contact page

## Functional Components

Based on the initial logic defined in the previous sections try and breakdown the logic further into functional components, and by that we mean functions.  Try and capture what logic would need to be defined if the game was broken down into the following categories.

Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe.

#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Gridding | H | 2hrs | 2hr | 2hr|
| Regular Nav | H | 2hrs | -hr 30mins | -hr 30mins|
| Content placement| H | 4hrs | 2hr | 2hr|
| Working with APIS | H | 6hrs| 6hr 06mins | 8hr 06mins |
| Responsive | H | 5hrs | 1hr | 1hr|
| Total | H | 24hrs| -hrs | 13hrs 36mins |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Gallery View | L | 6hrs | -hr | -hr|
| Add visual complexity| M | 6hrs | -hr | -hr|
| Materialize | H | 4hrs | -hr | -hr|
| Bootstrap | H | 4hrs | 2hr | 2hr|
| Add form | L | 2hrs | 1hr | 1hr|
| Total | H | 22hrs| 2hrs | 2hrs |

## Additional Libraries
 FontAwesome
 Bootstrap
 Jquery

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
let x = window.matchMedia('(max-width: 790px)')

const mediaQ = () => {
    console.log($('body').width())
    if(x.matches){
        $('#media').removeClass('col')
        $('#media').addClass('col-8')
        $('#media2').removeClass('col-9')
        $('#media2').addClass('col-12')
    }
    else{
        $('#media').removeClass('col-8')
        $('#media').addClass('col')
        $('#media2').removeClass('col-12')
        $('#media2').addClass('col-9')
    }
}
mediaQ(x)
x.addListener(mediaQ)
```

## Issues and Resolutions
 
#### SAMPLE.....
**ERROR**: app.js:360 xxx has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.                      
**RESOLUTION**: Had a typo in the bucket name and some privary issues.

**ERROR**: app.js:354 cant GET /sign-s3                      
**RESOLUTION**: I didnt know that I had to make the route for this, I thought it was something Amazon had set up.
