const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const members = [];
const idArray = [];

//question prompt for employee type 
function questionPrompt(answer) {
    return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
 //question prompt apppears  if user choose manager   
    .then(function (response) {
      if (response.role === "Manager"){
        inquirer.prompt([
            {
               type:"input",
               name : "managerName",
               message :"What is Team manager's name ?",
               validate :(answer)=> {
                 if(answer !== "") {
                  
                   return true ;
                 }
                
                 return "please Enter at list name's Initial" ;
               }
           
             },
//input for managerid           
             {
           
               type:"input",
               name : "managerId",
               message :"What is Team manager's Employee ID ?",
               validate : (answer)=>{
                 if(answer !== ""){
                  
                    if(idArray.includes(answer)){
                       return

                    }
                 idArray.push(answer)
                  return true
                }
                return "please Enter valid numbers of ID"
            }
           },
 //input for managerEmail          
           {

                type:"input",
                name : "managerEmail",
                message :"What is Team manager's E-MAIL address ?",
                validate :answer=>{
                  if(answer !== ""){
                   
                    return true ;
                  }
                 
                  return "please Enter proper E-MAIL ID "
                }
            
             },
//input for managerOffice          
            
             {

                type:"input",
                name : "managerOffice",
                message :"What is Team manager's Office number ?",
                validate :(answer)=>{
                  if(answer !== ""){
                   
                    return true ;
                  }
                 
                  return "please Enter proper Digits  ";
                },
            
                },
      
      
             ])

//input responces
.then(function (managerRes) {

var managerAns = new Manager(
   managerRes.managerName,
   managerRes.managerId,
   managerRes.managerEmail,
   managerRes.managerOffice

);
//input responces pushed to member
members.push(managerAns)
newUser();

});
      
}//if user choose engineer this prompt will appear 
 else if (response.role==="Engineer")  {

  inquirer
  .prompt([

    {
        type:"input",
        name : "engineerName",
        message :"What is Team Engineer's name ?",
        validate :answer=>{
          if(answer !== ""){
           
            return true ;
          }
         
          return "please Enter at list name's Initial"
        }
    
    },
////input for engineerID
    {
        type:"input",
        name : "engineerID",
        message :"What is Team Engineer's work ID ?",
        validate :(answer)=>{
          if(answer !== ""){
           
          if(idArray.includes(answer)){
            return 

          }
            idArray.push(answer);
            return true;

          }
          return "please Enter valid numbers of ID "

        }
      },
 //input for  engineerEmail    
     {
         type:"input",
         name : "engineerEmail",
          message :"What is Team Engineer's E-MAIL ID ?",
          validate :answer=>{
           if(answer !== ""){
         
          return true ;
         }
       
        return "please Enter proper E-MAIL ID "
        }

     },

 //input for engineerGithub     
  {

           type:"input",
           name : "engineerGithub",
          message :"What is Team Engineer's GitHub User name ?",
           validate :answer=>{
           if(answer !== ""){
     
          return true ;
         
        }
   
       return "please Enter proper information  ";
      }

     },

  ])

//input responces
  .then( function (engineerRes){

    var engineerAns = new Engineer(
      engineerRes.engineerName,
      engineerRes.engineerID,
      engineerRes.engineerEmail,
      engineerRes.engineerGithub
    );
   
//input responces pushed to member  
    members.push(engineerAns);
    newUser();
  });


  }//if user choose engineer this prompt will appear 
  else if (response.role=== "Intern"){
    inquirer.prompt([

      {
          type:"input",
          name : "internName",
          message :"What is Team Intern's name ?",
          validate :(answer)=>{
            if(answer !== ""){
             
              return true ;
            }
           
            return "please Enter at list name's Initial";
          }
      
      },
   
  //input for internId
   {

  type:"input",
            name : "internId",
            message :"What is Team Intern's work ID ?",
            validate :answer=>{
              if(answer !== ""){
               
                if(idArray.includes(answer)){
                   return
                }
                idArray.push(answer);
                return true;
              }
             
              return "please Enter valid numbers of ID "
            }
    
       },      
 //input for internEmail
  {

            type:"input",
            name : "internEmail",
            message :"What is Team Engineer's E-MAIL ID ?",
            validate :answer=>{
              if(answer !== ""){
               
                return true ;
              }
             
              return "please Enter proper E-MAIL ID ";
            }
          },   
  //input for  internSchool            
  {

             type:"input",
             name : "internSchool",
             message :"What is Team Intern's School name ?",
            validate :answer=>{
            if(answer !== ""){
     
            return true ;
         }
   
         return "please Enter proper information  "
        }
      },

    ])

//input responces

.then (function (internRes){

   var InternAns = new Intern (

    internRes.internName,
    internRes.internId,
    internRes.internEmail,
    internRes.internSchool

   );
 //input responces pushed to member 
   
   members.push(InternAns);
   newUser()

     })
  }
})
//function for error
.catch(function (err) {
  console.log(err);
});

  }//function for user to choose add members 
           function newUser(){


             inquirer
               .prompt([
              
                {
                  name: "continue",
                  message: "Would you like to add New employee ?",
                  type: "confirm",
             
                },
          
              ])
 //taking response to create HTML file              
    .then(function (confirmRes) {
      confirmRes.continue ? questionPrompt() : generateHTML();
    });
}
    questionPrompt();
  

 //function for  create a new HTML with given responces    
   function generateHTML() {

 
    fs.writeFile(outputPath, render(members), "UTF-8", (err) => {
    

    
      if (err) throw err;
  
    });
 
    console.log(members);

  }