
  $(() => {
      console.log( "ready!" );
      listenForClick()
      dateGreeting()
  })

  const dateGreeting = () => {
    let d = new Date();
    let date = $("#date").innerHTML = "<h3>Today's date is " + d.toDateString() + "</h3>"
    $('#date').append(date)
  }

  const listenForClick = () => {
    $('button#post-data-all-projects').one('click', e => {
      e.preventDefault()
      getAllPosts()
      // hideTableHeader()
    })

    $('button#post-data-open-projects').one('click', e => {
      e.preventDefault()
      getOpenPosts()
      // hideTableHeader()
    })

    // $('button#hide-data-all-projects').on('click', e => {
    //   e.preventDefault()
    //   $('#table-js').empty();
    // })
  }


  // const hideTableHeader = () => {
  //   var x = document.getElementById("table-js");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // }

  const getAllPosts = () => {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           // console.log(projects);

           const allProjects = projects
           .sort(function(a,b){
             let dateA = new Date(a.created_at), dateB = new Date(b.created);
             return dateA - dateB;
           })
           // console.log(allProjects);

           allProjects.map(project => {
             let newProject = new Project(project)
              // console.log(newProject);
             let postHtml = newProject.formatIndex()
                   // console.log(postHtml);
             $('.all-data').append(postHtml)
           })
       })
   }

   const getOpenPosts = () => {
     fetch(`/projects.json`)
     .then(res => res.json())
     .then(projects => {
            // console.log(projects);
            const openProjects = projects
            .filter(project => {
              return project.completion_date === null;
            })

            .sort(function(a,b){
              let dateA = new Date(a.target_completion_date), dateB = new Date(b.target_completion_date);
              return dateA - dateB;
            })

            // console.log(openProjects);

            openProjects.map(project => {
              let newProject = new Project(project)
               // console.log(newProject);

              let postHtml = newProject.formatIndex()
                    // console.log(postOpenHtml);
              $('.open-data').append(postHtml)
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
        <td><a href="/projects/${this.id}">${this.name} </a></td>
        <td>${this.description} </td>
        <td>${this.company_name} </td>
        <td>${this.target_completion_date} </td>
        <td>${this.completion_date} </td>
        </tr>
      `
      return postHtml
    }
  }
