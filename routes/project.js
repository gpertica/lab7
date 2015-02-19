var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  models.Project
  .find({"_id": projectID})
  .sort('-date')
  .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}


/*exports.projectID = function(req,res){
  

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
}
*/ 

/*exports.createProject = function(req,res){
  var newProject = new models.Project({
    "title": "Whatever",
    "date": new Date("February 13, 2015"),
    "summary": "Whatever whatever whatever",
    "image": "https://ericademane.files.wordpress.com/2009/02/8-half_saraghina.jpg"
  })
  */


exports.addProject = function(req, res) {
  var form_data = req.body;
  var model_data = {

    'title': form_data.project_title,
    'date': form_data.date,
    'summary': form_data.summary,
    'image': form_data.image_url

  }
  console.log(form_data);
  var newProject = new models.Project(model_data)

  newProject.save(afterSaving)

  function afterSaving(err){
    res.send('ok');
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}



exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
 
 models.Project.find({"_id": projectID})
 .remove()
 .exec(afterRemoving);

 function afterRemoving(err){
  if(err) {console.log(err); 
  res.send("not deleted");
}
else {res.send("deleted");}
 }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}