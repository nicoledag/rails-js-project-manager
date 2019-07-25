
  $(() => {
      console.log( "ready!" );
      bindClickHandlers()
      dateGreeting()
  })

  const dateGreeting = () => {
    let d = new Date();
    let date = $("#date").innerHTML = "<h3>Today's date is " + d.toDateString() + "</h3>"
    $('#date').append(date)
  }

  const bindClickHandlers = () => {
    $('button#post-data-all-projects').one('click', e => {
      e.preventDefault()
      getAllProjects()
      // hideTableHeader()
    })

    $('button#post-data-open-projects').one('click', e => {
      e.preventDefault()
      getOpenProjects()
    })

    $('button#post-data-completed-projects').one('click', e => {
      e.preventDefault()
      getCompletedProjects()
    })

  // Event handler to get a project and comment.
      $(document).on('click', ".show_link", function(e) {
        e.preventDefault()
        $('#app-container').html('')
        let id = $(this).attr('data-id')
        fetch(`/projects/${id}.json`)
        .then(res => res.json())
        .then(project => {
          let newProject = new Project(project)
          console.log(newProject);
          let postHtml = newProject.formatShow()
          $('#app-container').append(postHtml)
      })
     })

  }

  // const hideTableHeader = () => {
  //   var x = document.getElementById("table-js");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

  const getAllProjects = () => {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           const allProjects = projects
           .sort(function(a,b){
             let dateA = new Date(a.created_at), dateB = new Date(b.created);
             return dateA - dateB;
           })
           allProjects.map(project => {
             let newProject = new Project(project)
             let postHtml = newProject.formatIndex()
             $('.all-data').append(postHtml)
           })
       })
   }

   const getOpenProjects = () => {
     fetch(`/projects.json`)
     .then(res => res.json())
     .then(projects => {
            const openProjects = projects
            .filter(project => {
              return project.completion_date === null;
            })
            .sort(function(a,b){
              let dateA = new Date(a.target_completion_date), dateB = new Date(b.target_completion_date);
              return dateA - dateB;
            })
            openProjects.map(project => {
              let newProject = new Project(project)
              let postHtml = newProject.formatIndex()
              $('.open-data').append(postHtml)
            })
        })
    }


    const getCompletedProjects = () => {
      fetch(`/projects.json`)
      .then(res => res.json())
      .then(projects => {
             // console.log(projects);
             const completedProjects = projects
             .filter(project => {
               return project.completion_date !== null;
             })
             .sort(function(a,b){
               let dateA = new Date(a.completion_date), dateB = new Date(b.completion_date);
               return dateB - dateA;
             })
             completedProjects.map(project => {
               let newProject = new Project(project)
               let postHtml = newProject.formatIndex()
               $('.completed-data').append(postHtml)
             })
         })
     }



   class Project {
    constructor(project) {
       this.name = project.name
       this.id = project.id
       this.description = project.description
       this.target_completion_date = project.target_completion_date
       this.completion_date = project.completion_date
       this.company_name = project.client.company_name
       this.comments = project.comments
       this.username = project.user.username
       this.created_at = project.created_at
   }


    formatIndex() {
      let postHtml = `
        <tr>
        <td><a href="/projects/${this.id}" data-id="${this.id}" class="show_link">${this.name} </a></td>
        <td>${this.description} </td>
        <td>${this.company_name} </td>
        <td>${this.target_completion_date} </td>
        <td>${this.completion_date} </td>
        </tr>
      `
      return postHtml
    }


    formatShow() {
      let commentContent = this.comments.map(comment => { return ( `${comment.content}` ) })
      let commentCreatedAt = this.comments.map(comment => { return ( `${comment.created_at}` ) })
      let commentId = this.comments.map(comment => { return ( `${comment.id}` ) })

      let postHtml = `
        <h2>Project</h2>
        <table id="table-js" >
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Client Name</th>
            <th>Target Completion Date</th>
            <th>Completion Date</th>
          </tr>
          <tr>
          <td>${this.name}</td>
          <td>${this.description} </td>
          <td>${this.company_name} </td>
          <td>${this.target_completion_date} </td>
          <td>${this.completion_date} </td>
          </tr>
        </table>

        <br>
        <br>
        <br>
        <h2>Project Comments</h2>

        <td><a href="/projects/${this.id}/comments/new" </a>New Comment</td>
        <br>
        <br>

        <table id="table-js" >
          <tr>
            <th>Date Created</th>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          <tr>

          <tr>
          <td>${commentCreatedAt}</td>
          <td>${commentContent} </td>
          <td><a href="/comments/${commentId}/edit" </a>Edit Comment</td>
          <td><a href="/comments/${commentId}/delete" </a>Delete Comment</td>
          </tr>
          </table>
      `
      return postHtml

      // How to delete comment?

    }

  }
