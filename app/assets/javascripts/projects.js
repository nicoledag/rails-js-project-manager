
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
    $('button#post-data-all-projects').on('click', e => {
      e.preventDefault()
      getAllPosts()
      // hideTableHeader()
    })

    $('button#post-data-open-projects').on('click', e => {
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
           projects.map(project => {
             let newProject = new Project(project)
              // console.log(newProject);
             let postAllHtml = newProject.formatIndex()
                   // console.log(postHtml);
             $('.all-data').append(postAllHtml)
           })
       })
   }

   const getOpenPosts = () => {
     fetch(`/projects.json`)
     .then(res => res.json())
     .then(projects => {
            console.log(projects);

            const sort = projects

            .filter(project => {
              return project.completion_date === null;
            })

            console.log(sort);

            projects.map(project => {
              let newProject = new Project(project)
               // console.log(newProject);

              let postOpenHtml = newProject.formatOpenProjects()
                    // console.log(postOpenHtml);
              $('.open-data').append(postOpenHtml)
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
      let postAllHtml = `
        <tr>
        <td><a href="/projects/${this.id}">${this.name} </a></td>
        <td>${this.description} </td>
        <td>${this.company_name} </td>
        <td>${this.target_completion_date} </td>
        <td>${this.completion_date} </td>
        </tr>
      `
      return postAllHtml
    }

    formatOpenProjects(array) {
      // scope :incomplete, -> { where(completion_date: nil).
      // order(target_completion_date: :asc)}

        function filter(array) {
          let postOpenHtml = array.filter(project => project.completion_date === nil);
          return postOpenHtml
        }


      // `
      //   <tr>
      //   <td><a href="/projects/${this.id}">${this.name} </a></td>
      //   <td>${this.description} </td>
      //   <td>${this.company_name} </td>
      //   <td>${this.target_completion_date} </td>
      //   <td>${this.completion_date} </td>
      //   </tr>
      // `
      // return postOpenHtml

    }

}

  //  Project.prototype.formatDate = function () {
  //    this.sort(function(a,b){
  //     return a.created_at > b.created_at;
  //   })
  // }
  //


  // Project.prototype.sortByCompletedDate = function () {
  //   const completed = Project.filter(function(project) {
  //         project.completion_date !== null
  //         console.log(completed);
  //   });
  //
  // }
