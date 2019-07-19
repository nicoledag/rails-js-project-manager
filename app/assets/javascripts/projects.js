
  $(() => {
      console.log( "ready!" );
      // projectClickHandler()
      listenForClick()
      dateGreeting()
      // nameGreeting()
  })

  // const nameGreeting = () => {
  //      fetch(`/projects.json`)
  //     .then(res => res.json())
  //     .then(projects => {
  //            // console.log(projects);
  //            projects.forEach(project => {
  //            let newProject = new Project(project)
  //            // console.log(newProject);
  //            let postName = newProject.Greeting()
  //            // console.log(postName);
  //            $('#greeting').append(postName)
  //            })
  //        })
  //    }
  //


  const dateGreeting = () => {
    let d = new Date();
    let date = $(".date").innerHTML = "<h3>Today's date is " + d + "</h3>"
    $('.date').append(date)
  }

  function listenForClick() {
    $('button#post-data-all-projects').on('click', e => {
      event.preventDefault()
      getAllProjects()
    })
  }

  function getAllProjects() {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           // console.log(projects);
           projects.map(project => {
             let newProject = new Project(project)
              // console.log(newProject);
             let postHtml = newProject.formatIndex()
             console.log(postHtml);
             $('#table-js').append(postHtml)
           })
       })
   }


  function Project(project) {
    this.name = project.name
    this.description = project.description
    this.target_completion_date = project.target_completion_date
    this.completion_date = project.completion_date
    this.company_name = project.client.company_name
    this.comments = project.comments
    this.username = project.user.username
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

  // Project.prototype.Greeting = function () {
  //   let postName = `
  //     <h2> Welcome ${this.username} </h2>
  //   `
  //   return postName
  // }



  // Project.prototype.sortByCompletedDate = function () {
  //   const completed = Project.filter(function(project) {
  //         project.completion_date !== null
  //         console.log(completed);
  //   });
  //
  // }
