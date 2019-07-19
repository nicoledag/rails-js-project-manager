
  $(() => {
      console.log( "ready!" );
      listenForClick()
      dateGreeting()
  })

  const dateGreeting = () => {
    let d = new Date();
    let date = $(".date").innerHTML = "<h3>Today's date is " + d + "</h3>"
    $('.date').append(date)
  }

  function listenForClick() {
    $('button#post-data-all-projects').on('click', e => {
      event.preventDefault()
      hideButton()
      getAllProjects()
    })
  }

  function hideButton() {
    var x = document.getElementById("table-js");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function getAllProjects() {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           // console.log(projects);
           projects.map(project => {
             let newProject = new Project(project)
              // console.log(newProject);
            // let formatByDate = newProject.formatDate()
             let postHtml = newProject.formatIndex()
             $('#table-js').append(postHtml)
           })
       })
   }

   class Project {
    constructor(project) {
       this.name = project.name
       this.description = project.description
       this.target_completion_date = project.target_completion_date
       this.completion_date = project.completion_date
       this.company_name = project.client.company_name
       this.comments = project.comments
       this.username = project.user.username
       this.created_at = project.created_at
   }
  }

  Project.prototype.formatIndex = function () {
    let postHtml = `
      <tr>
      <td>${this.name} </td>
      <td>${this.description} </td>
      <td>${this.company_name} </td>
      <td>${this.target_completion_date} </td>
      <td>${this.completion_date} </td>
      </tr>
    `
    return postHtml
  }
  //
  // Project.prototype.formatDate = function () {
  //  Project.sort(function(a,b){
  //  return a.created_at > b.created_at;
  //   })
  // }



  // Project.prototype.sortByCompletedDate = function () {
  //   const completed = Project.filter(function(project) {
  //         project.completion_date !== null
  //         console.log(completed);
  //   });
  //
  // }
