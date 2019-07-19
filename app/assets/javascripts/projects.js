

  $(() => {
      console.log( "ready!" );
      // projectClickHandler()
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
      getAllProjects()
    })
  }

  function getAllProjects() {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           console.log(projects);
           projects.forEach(project => {

           })
       })
   }


    // const projectClickHandler = () => {
    //   $('.all_projects').on('click', e => {
    //     e.preventDefault()  //prevent default from running.
    //     // console.log('hello');
    //
    //     // hijacks nav link for projects.  On method takes in two arguements the click and event
    //     // and a callback function you want to run when the event happens.
    //
    //     history.pushState(null, null, "projects") //updates url path to /projects.
    //     fetch(`/projects.json`)
    //     // fetch makes request to backend.  When you call fetch you get a promise.
    //     // if resolved it takes in a response.  Call json on the resonse and it will parse the data on the response.
    //     // then passes to next then call.
    //       .then(res => res.json())
    //       .then(projects => {
    //         // console.log(projects);
    //         // $('#app-container').html('')
    //         projects.forEach(project => {
    //           let newProject = new Project(project)
    //           console.log(newProject);
    //
    //           let postHtml = newProject.formatIndex()
    //
    //           console.log(postHtml);
    //         $('#table').append(postHtml)
    //
    //         })
    //
    //      })
    //
    //   })
    // }


  function Project(project) {
    this.name = project.name
    this.description = project.description
    this.target_completion_date = project.target_completion_date
    this.completion_date = project.completion_date
    this.company_name = project.client.company_name
    this.comments = project.comments
  }

  Project.prototype.formatIndex = function () {

    let postHtml = `
      <tr>
      <td>${this.name} </td>
      <td>${this.description} </td>
      <td>${this.company_name} </td>
      <td>${this.target_completion_date} </td>
      <td>${this.completion_date} </td>
      <td>${this.comments} </td>

      </tr>
    `
    return postHtml
  }




  // Project.prototype.sortByCompletedDate = function () {
  //   const completed = Project.filter(function(project) {
  //         project.completion_date !== null
  //         console.log(completed);
  //   });
  //
  // }
