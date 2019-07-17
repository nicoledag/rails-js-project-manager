(function(global, $) {


  $(() => {
      console.log( "ready!" );
      projectClickHandler()
  })


    const projectClickHandler = () => {
      $('.all_projects').on('click', e => {
        e.preventDefault()  //prevent default from running.
        // hijacks nav link for projects.  On method takes in two arguements the click and event
        // and a callback function you want to run when the event happens.
        // console.log(hello);
        history.pushState(null, null, "projects") //updates url path to /projects.
        fetch(`/projects.json`)
        // fetch makes request to backend.  When you call fetch you get a promise.
        // if resolved it takes in a response.  Call json on the resonse and it will parse the data on the response.
        // then passes to next then call.
          .then(res => res.json())
          .then(projects => {
            // console.log(projects);
            $('#app-container').html('')
            projects.forEach(project => {
              let newProject = new Project(project)
              // console.log(newProject);
              let postHtml = newProject.formatIndex()
              // console.log(postHtml);
              $('#app-container').append(postHtml)
            })
          })
      })
    }

  function Project(project) {
    this.id = project.id
    this.name = project.name
    this.description = project.description
    this.target_completion_date = project.target_completion_date
    this.completion_date = project.completion_date
  }

  Project.prototype.formatIndex = function () {
    let postHtml = `
      <h1>${this.name}</h1>
    `
    return postHtml
  }



}(window, jQuery));
