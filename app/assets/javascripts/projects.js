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
          })




      })
    }

}(window, jQuery));
